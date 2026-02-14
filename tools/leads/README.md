# Lead generator (Košice v0)

Uses OpenStreetMap Overpass API to fetch business leads by segment and exports `leads.csv`.

## Usage

```bash
node tools/leads/leads-overpass.mjs "Košice" "dentist,clinic,lawyer,accountant,real_estate"
```

## Output columns
- `segment`
- `name`
- `address`
- `city`
- `phone`
- `website`
- `email`
- `source`
- `notes`
- `status`

## Notes
- Overpass coverage depends on OSM data quality.
- This tool is provider-ready: keep this script as v0 and add a Google Places adapter later.
