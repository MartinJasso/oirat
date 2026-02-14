#!/usr/bin/env python3
import argparse
import csv
import json
import re
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import Iterable

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")

SEGMENT_TAGS = {
    "dentist": ["amenity=dentist", "healthcare=dentist"],
    "clinic": ["amenity=clinic", "healthcare=clinic"],
    "lawyer": ["office=lawyer"],
    "accountant": ["office=accountant"],
    "real_estate": ["office=estate_agent"]
}

@dataclass
class Lead:
    segment: str
    name: str
    address: str
    city: str
    phone: str
    website: str
    email: str
    source: str
    notes: str
    status: str = "new"

class LeadProvider:
    def fetch(self, city: str, segment: str) -> Iterable[Lead]:
        raise NotImplementedError

class OverpassLeadProvider(LeadProvider):
    def fetch(self, city: str, segment: str) -> Iterable[Lead]:
        tags = SEGMENT_TAGS.get(segment, [])
        if not tags:
            return []

        filters = "".join([f"node[{tag}](area.searchArea);way[{tag}](area.searchArea);relation[{tag}](area.searchArea);" for tag in tags])
        query = f"""
[out:json][timeout:25];
area["name"="{city}"]->.searchArea;
(
{filters}
);
out center tags;
"""

        data = urllib.parse.urlencode({"data": query}).encode("utf-8")
        request = urllib.request.Request(OVERPASS_URL, data=data)
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                payload = json.loads(response.read().decode("utf-8"))
        except Exception:
            return []

        leads: list[Lead] = []
        for element in payload.get("elements", []):
            tags = element.get("tags", {})
            website = tags.get("website", "")
            email = tags.get("email", "")

            if website and not email:
                email = self.extract_email(website)

            leads.append(
                Lead(
                    segment=segment,
                    name=tags.get("name", "Unknown"),
                    address=tags.get("addr:street", ""),
                    city=tags.get("addr:city", city),
                    phone=tags.get("phone", ""),
                    website=website,
                    email=email,
                    source="osm",
                    notes="",
                )
            )
        return leads

    def extract_email(self, website: str) -> str:
        try:
            if not website.startswith("http"):
                website = f"https://{website}"
            with urllib.request.urlopen(website, timeout=10) as response:
                html = response.read().decode("utf-8", errors="ignore")
            match = EMAIL_RE.search(html)
            return match.group(0) if match else ""
        except Exception:
            return ""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate lead CSV for Košice segments.")
    parser.add_argument("--city", default="Košice")
    parser.add_argument("--segments", default="dentist,clinic,lawyer,accountant,real_estate")
    parser.add_argument("--out", default="leads.csv")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    provider: LeadProvider = OverpassLeadProvider()
    segments = [segment.strip() for segment in args.segments.split(",") if segment.strip()]

    rows: list[Lead] = []
    for segment in segments:
        rows.extend(provider.fetch(args.city, segment))

    with open(args.out, "w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(["segment", "name", "address", "city", "phone", "website", "email", "source", "notes", "status"])
        for row in rows:
            writer.writerow([row.segment, row.name, row.address, row.city, row.phone, row.website, row.email, row.source, row.notes, row.status])

    print(f"Generated {len(rows)} leads -> {args.out}")


if __name__ == "__main__":
    main()
