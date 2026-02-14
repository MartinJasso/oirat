#!/usr/bin/env node
import { writeFileSync } from "node:fs";

const city = process.argv[2] ?? "Košice";
const segments = (process.argv[3] ?? "dentist,clinic,lawyer,accountant,real_estate")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const SEGMENT_QUERIES = {
  dentist: 'node["healthcare"="dentist"]',
  clinic: 'node["amenity"="clinic"]',
  lawyer: 'node["office"="lawyer"]',
  accountant: 'node["office"="accountant"]',
  real_estate: 'node["office"="estate_agent"]'
};

function csvEscape(value = "") {
  const text = String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

async function fetchSegment(segment) {
  const selector = SEGMENT_QUERIES[segment];
  if (!selector) return [];

  const query = `[out:json][timeout:25];area["name"="${city}"]->.searchArea;(${selector}(area.searchArea););out center tags;`;
  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query
  });

  if (!response.ok) throw new Error(`Overpass failed for ${segment}: ${response.status}`);
  const data = await response.json();

  return (data.elements ?? []).map((el) => ({
    segment,
    name: el.tags?.name ?? "",
    address: [el.tags?.["addr:street"], el.tags?.["addr:housenumber"]].filter(Boolean).join(" "),
    city: el.tags?.["addr:city"] ?? city,
    phone: el.tags?.phone ?? "",
    website: el.tags?.website ?? "",
    email: el.tags?.email ?? "",
    source: "osm",
    notes: "",
    status: "new"
  }));
}

async function run() {
  const rows = [];
  for (const segment of segments) {
    const leads = await fetchSegment(segment);
    rows.push(...leads);
  }

  const header = ["segment", "name", "address", "city", "phone", "website", "email", "source", "notes", "status"];
  const lines = [header.map(csvEscape).join(",")];

  for (const row of rows) {
    lines.push(header.map((key) => csvEscape(row[key] ?? "")).join(","));
  }

  writeFileSync("tools/leads/leads.csv", lines.join("\n"));
  console.log(`Saved ${rows.length} leads to tools/leads/leads.csv`);
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
