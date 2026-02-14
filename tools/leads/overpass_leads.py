#!/usr/bin/env python3
"""Generate business leads via Overpass API for selected segments and city."""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import Iterable

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
DEFAULT_SEGMENTS = ["dentist", "clinic", "lawyer", "accountant", "real_estate"]

SEGMENT_QUERIES = {
    "dentist": 'node["amenity"="dentist"](area.searchArea);way["amenity"="dentist"](area.searchArea);relation["amenity"="dentist"](area.searchArea);',
    "clinic": 'node["amenity"="clinic"](area.searchArea);way["amenity"="clinic"](area.searchArea);relation["amenity"="clinic"](area.searchArea);',
    "lawyer": 'node["office"="lawyer"](area.searchArea);way["office"="lawyer"](area.searchArea);relation["office"="lawyer"](area.searchArea);',
    "accountant": 'node["office"="accountant"](area.searchArea);way["office"="accountant"](area.searchArea);relation["office"="accountant"](area.searchArea);',
    "real_estate": 'node["office"="estate_agent"](area.searchArea);way["office"="estate_agent"](area.searchArea);relation["office"="estate_agent"](area.searchArea);',
}

EMAIL_RE = re.compile(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", re.IGNORECASE)


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


class OverpassProvider:
    source = "osm"

    def fetch(self, city: str, segment: str) -> list[dict]:
        if segment not in SEGMENT_QUERIES:
            raise ValueError(f"Unsupported segment: {segment}")

        query = f"""
[out:json][timeout:60];
area["name"="{city}"]->.searchArea;
(
  {SEGMENT_QUERIES[segment]}
);
out center tags;
""".strip()

        payload = urllib.parse.urlencode({"data": query}).encode("utf-8")
        request = urllib.request.Request(OVERPASS_URL, data=payload, method="POST")

        with urllib.request.urlopen(request, timeout=90) as response:
            return json.load(response).get("elements", [])


class GooglePlacesProvider:
    source = "google"

    def fetch(self, city: str, segment: str) -> list[dict]:
        raise NotImplementedError("Google Places provider not implemented yet")


def compose_address(tags: dict) -> str:
    parts = [
        tags.get("addr:street", ""),
        tags.get("addr:housenumber", ""),
        tags.get("addr:postcode", ""),
        tags.get("addr:city", ""),
    ]
    return " ".join(part for part in parts if part).strip()


def derive_email(tags: dict) -> str:
    if tags.get("email"):
        return tags["email"].strip()
    if tags.get("contact:email"):
        return tags["contact:email"].strip()
    website = tags.get("website", "")
    candidate = EMAIL_RE.search(website)
    return candidate.group(0) if candidate else ""


def dedupe(leads: Iterable[Lead]) -> list[Lead]:
    seen: set[tuple[str, str, str]] = set()
    result: list[Lead] = []
    for lead in leads:
        key = (lead.segment, lead.name.lower(), lead.address.lower())
        if key in seen:
            continue
        seen.add(key)
        result.append(lead)
    return result


def collect_leads(provider: OverpassProvider, city: str, segments: list[str], limit: int) -> list[Lead]:
    all_leads: list[Lead] = []
    for segment in segments:
        rows = provider.fetch(city=city, segment=segment)
        count = 0
        for row in rows:
            tags = row.get("tags", {})
            name = tags.get("name", "").strip()
            if not name:
                continue
            all_leads.append(
                Lead(
                    segment=segment,
                    name=name,
                    address=compose_address(tags),
                    city=tags.get("addr:city", city),
                    phone=tags.get("phone") or tags.get("contact:phone") or "",
                    website=tags.get("website") or tags.get("contact:website") or "",
                    email=derive_email(tags),
                    source=provider.source,
                    notes=f"Personalize using website/services for {name}",
                )
            )
            count += 1
            if count >= limit:
                break
    return dedupe(all_leads)


def write_csv(path: str, leads: list[Lead]) -> None:
    with open(path, "w", newline="", encoding="utf-8") as fp:
        writer = csv.DictWriter(
            fp,
            fieldnames=[
                "segment",
                "name",
                "address",
                "city",
                "phone",
                "website",
                "email",
                "source",
                "notes",
                "status",
            ],
        )
        writer.writeheader()
        for lead in leads:
            writer.writerow(lead.__dict__)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate leads CSV from Overpass API")
    parser.add_argument("--city", default="Košice")
    parser.add_argument("--segments", nargs="*", default=DEFAULT_SEGMENTS)
    parser.add_argument("--limit", type=int, default=25, help="max rows per segment")
    parser.add_argument("--output", default="leads.csv")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    provider = OverpassProvider()

    try:
        leads = collect_leads(provider, city=args.city, segments=args.segments, limit=args.limit)
        write_csv(args.output, leads)
    except Exception as exc:  # noqa: BLE001
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(f"Generated {len(leads)} leads into {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
