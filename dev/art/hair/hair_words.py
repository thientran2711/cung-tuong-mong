#!/usr/bin/env python3
"""Builder helper (HAIR1): hair_words(pid, tier, season, age) -> the HAIRSTYLE sentence from HAIR_TABLE_builder.json.
tier = 1..8 (or 't1'..'t8'); season = xuan/ha/thu/dong (owner L1631: each season its own style); age = 18/26/36/51/65 (F11: 36+ uses the hair-up form at t1-t3).
CLI: python3 dev/art/hair/hair_words.py s62 3 thu 26"""
import json, os, sys
_T = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "HAIR_TABLE_builder.json"), encoding="utf-8"))

def hair_words(pid, tier, season, age=18):
    t = tier if str(tier).startswith("t") else f"t{int(tier)}"
    row = _T[pid][t][season]
    return row["en_a36"] if int(age) >= 36 else row["en_a18"]

def hair_code(pid, tier, season):
    t = tier if str(tier).startswith("t") else f"t{int(tier)}"
    return _T[pid][t][season]["code"]

if __name__ == "__main__":
    pid, tier, season = sys.argv[1], sys.argv[2], sys.argv[3]; age = sys.argv[4] if len(sys.argv) > 4 else 18
    print(hair_code(pid, tier, season)); print(hair_words(pid, tier, season, age))
