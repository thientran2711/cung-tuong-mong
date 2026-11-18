#!/usr/bin/env python3 -I
"""scale-room: saved "Phong co gian" rows -> fig-ht.json rows + scale note.
input: JSON list of db docs {file, headTop, scale, dy, by, at} (ArtifactData list of collection "figs"; docs may be wrapped as {"data":{...}}).
out:   <out>/fig-ht-rows.json  { "<file>": headTop }   (same unit as img/fig-ht.json: 1/4000 of picture height; merge into the table, file name = key)
       <out>/scale-note.md     per file: headTop, scale (extra size she wanted on top of the head-top normalisation), dy (lift, in body heights; + = lower), who/when
usage: rows_to_ht.py rows.json outdir"""
import sys, os, json
rows = json.load(open(sys.argv[1])); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
rows = [r.get("data", r) if isinstance(r, dict) else r for r in (rows.get("docs", rows) if isinstance(rows, dict) else rows)]
rows = sorted((r for r in rows if r.get("file")), key=lambda r: r.get("at", ""))
ht, notes = {}, ["| file | headTop | scale | dy | by | at |", "|---|---|---|---|---|---|"]
for r in rows:
    ht[r["file"]] = int(round(r["headTop"]))
    notes.append("| %s | %d | %.3f | %.3f | %s | %s |" % (r["file"], ht[r["file"]], r.get("scale", 1), r.get("dy", 0), r.get("by", ""), r.get("at", "")))
json.dump(ht, open(os.path.join(out, "fig-ht-rows.json"), "w"), indent=0, sort_keys=True)
open(os.path.join(out, "scale-note.md"), "w").write("\n".join(notes) + "\n\nscale != 1 or dy != 0 means she wanted that figure taller/shorter or shifted beyond the head-top rule: apply as a per-file size/offset factor if Foreman C agrees.\n")
print(len(ht), "rows ->", out)
