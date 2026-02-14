#!/usr/bin/env python3
"""Tiny generator: converts BRIEF.md into a codex pack scaffold."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    brief = ROOT / "BRIEF.md"
    if not brief.exists():
        print("BRIEF.md not found")
        return 1

    marker = "Vyplň len tieto body"
    text = brief.read_text(encoding="utf-8")
    status = "template" if marker in text else "filled"

    out = ROOT / "docs" / "GENERATOR_STATUS.json"
    out.write_text(json.dumps({"brief_status": status}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {out.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
