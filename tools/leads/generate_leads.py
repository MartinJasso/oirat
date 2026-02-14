#!/usr/bin/env python3
"""Generate local business leads from OpenStreetMap Overpass API.

Example:
  python tools/leads/generate_leads.py --city "Košice" --segments dentist clinic lawyer accountant real_estate --limit 25 --output leads.csv
"""

from __future__ import annotations

import argparse
import csv
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable
from urllib.parse import urlencode
from urllib.request import urlopen

OVERPASS_URL = "https://overpass-api.de/api/interpreter"


SEGMENT_QUERIES = {
    "dentist": ['node["amenity"="dentist"]', 'way["amenity"="dentist"]', 'relation["amenity"="dentist"]'],
    "clinic": ['node["amenity"="clinic"]', 'way["amenity"="clinic"]', 'relation["amenity"="clinic"]'],
    "lawyer": ['node["office"="lawyer"]', 'way["office"="lawyer"]', 'relation["office"="lawyer"]'],
    "accountant": ['node["office"="accountant"]', 'way["office"="accountant"]', 'relation["office"="accountant"]'],
    "real_estate": ['node["office"="estate_agent"]', 'way["office"="estate_agent"]', 'relation["office"="estate_agent"]'],
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


def build_overpass_query(city: str, segment: str, limit: int) -> str:
    selectors = SEGMENT_QUERIES[segment]
    area = f'area["name"="{city}"]->.searchArea;'
    blocks = "\n".join([f"{selector}(area.searchArea);" for selector in selectors])
    return f"""
[out:json][timeout:60];
{area}
(
{blocks}
);
out tags center {limit};
"""


def fetch_overpass(query: str) -> dict:
    payload = urlencode({"data": query})
    with urlopen(f"{OVERPASS_URL}?{payload}") as response:
        return json.loads(response.read().decode("utf-8"))


def parse_address(tags: dict) -> str:
    parts = [
        tags.get("addr:street", "").strip(),
        tags.get("addr:housenumber", "").strip(),
    ]
    return " ".join([p for p in parts if p]).strip()


def to_leads(city: str, segment: str, data: dict) -> Iterable[Lead]:
    for item in data.get("elements", []):
        tags = item.get("tags", {})
        name = tags.get("name", "").strip()
        if not name:
            continue
        website = tags.get("website", "").strip() or tags.get("contact:website", "").strip()
        email = tags.get("email", "").strip() or tags.get("contact:email", "").strip()
        phone = tags.get("phone", "").strip() or tags.get("contact:phone", "").strip()
        yield Lead(
            segment=segment,
            name=name,
            address=parse_address(tags),
            city=city,
            phone=phone,
            website=website,
            email=email,
            source="osm",
            notes=f"{segment} v {city}",
        )


def dedupe(leads: Iterable[Lead]) -> list[Lead]:
    seen: set[tuple[str, str]] = set()
    unique: list[Lead] = []
    for lead in leads:
        key = (lead.name.lower(), lead.address.lower())
        if key in seen:
            continue
        seen.add(key)
        unique.append(lead)
    return unique


def write_csv(path: Path, leads: list[Lead]) -> None:
    fieldnames = [
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
    ]
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for lead in leads:
            writer.writerow(lead.__dict__)


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate leads CSV from OSM Overpass")
    parser.add_argument("--city", required=True)
    parser.add_argument("--segments", nargs="+", required=True, choices=sorted(SEGMENT_QUERIES.keys()))
    parser.add_argument("--limit", type=int, default=25, help="per-segment target")
    parser.add_argument("--output", default="leads.csv")
    args = parser.parse_args()

    all_leads: list[Lead] = []
    for segment in args.segments:
        query = build_overpass_query(args.city, segment, args.limit)
        data = fetch_overpass(query)
        segment_leads = list(to_leads(args.city, segment, data))[: args.limit]
        all_leads.extend(segment_leads)

    unique = dedupe(all_leads)
    write_csv(Path(args.output), unique)
    print(f"Wrote {len(unique)} leads to {args.output}")


if __name__ == "__main__":
    main()
