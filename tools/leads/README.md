# leads generator (v0)

Generate Košice prospect lists from OpenStreetMap Overpass API.

## Usage

```bash
python3 tools/leads/overpass_leads.py --city "Košice" --limit 25 --output leads.csv
```

Defaults to segments:
- dentist
- clinic
- lawyer
- accountant
- real_estate

The script writes deduplicated rows with:
`segment,name,address,city,phone,website,email,source,notes,status`

## Provider interface

The script is intentionally provider-oriented:
- `OverpassProvider` implemented now
- `GooglePlacesProvider` stubbed for v1 drop-in
