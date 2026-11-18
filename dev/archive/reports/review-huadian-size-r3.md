# review/huadian-size-r3 (independent art reviewer) — huadian-size-r2 @ 4011dc151
**FAIL** — r3 branch (scripts/notes only, descends from current origin/main): `review/huadian-size-r3` @ 1aed2877e887529c420aaeb337d6e55b36efd0c7. No art was changed or uploaded; every fix below needs the worker pipeline (donor flower via runswap/hswap + fig/hd/tn twins).

## What I checked
1. LIVE CDN: downloaded 2821 por files (84 styles x t1–t8 + tcold x a18/a26/a36/a51 + player-look4). Built 44 forehead sheets (8 styles x 9 tiers per sheet, 4 ages) and looked at every one; 5x zooms on ~40 suspect files. Measured mark width/face width on 2673 por: median 0.0846 (target 0.085), p10 0.075, p90 0.093 — the batch size is right. tcold: no mark on any consort (maids have no tcold). Tiers are distinct; t8 gold phoenix is intact on every style/age (m28-t8, c08-t8 included). No brow or hair damage found except c28-t6-a36 (below). Player-look4 exists on the CDN only as t1 (all ages) + t3-a18 — nothing else to check. No grape/berry cluster of the old kind is left, BUT see 1–3 (round-bead motifs).
2. Leftovers: m22-t6 (pendant bead + light rectangle) CONFIRMED all 4 ages; c23 t5/t6 a51 and c09 t6 a26 are CLEAN (small flower, no tail); faint marks m12 t2/t5, m22 t2/t3, m24, c28 t4/t5, c20 t3/t4 are present but very pale (low contrast, not failing, list below as WATCH).
3. Twins: 30 sampled (14 swapped styles + others, all four ages): fig and hd forehead = por forehead (template match 0.99–1.00, same flower); sharpness lap-var fig/por ≈ 0.45–0.5 only because fig is the 0.6x-scaled face, hd ≥ por. tn thumbs: too small to judge, no wrong mark seen. (Only 14/28 sampled files have a tn twin on the CDN.)
4. Browser 755x1000@2 (dev/test/hd-swapped-style-browser.js): a rival with style c23 (t3, a26) in Hậu cung (Phi tần → person panel) and on the stage ("Có người đến"): the small red flower shows, no errors; CDN served por/fig/hd c23-t3-a26 200.

## FAIL list (exact files; every item = por-*, fig-*, hd/fig-*, tn/fig-* where they exist)
1. Solid round disc/bead as huadian (orange or grey-brown dot, reads as a bead/mole, not a flower): `por-consort-c14-t4-a{18,26,36,51}`, `por-consort-c14-t5-a{18,26,36,51}`.
2. Ring / bead-cluster motifs (objects, same family as the grape cluster): `por-maid-m48-t5-a{18,26,36,51}` (orange ring/coin), `por-maid-m14-t6-a{18,26,36,51}` (ring with cross + pendant), `por-maid-m34-t7-a{18,26,36,51}` (four dark-red round beads in a cluster), `por-consort-c28-t6-a{18,26,51}` (ring of six beads).
3. Damaged: `por-consort-c28-t6-a36` (dark grey eye-shaped blob, no flower).
4. Light rectangle beside/below the mark + pendant triangle with bead: `por-maid-m22-t6-a{18,26,36,51}` (+ fig/hd twins).
5. Stray specks/dots and a grey smudge around the mark: `por-consort-c25-t4-a{26,36,51}`, `por-consort-c25-t5-a{26,36,51}`, `por-consort-c25-t6-a36` (c25-t6 only seen on the sheet, not zoomed).
6. Oversized (≈0.12–0.13 of face width, 1.5x the others) AND drop-shaped: `por-consort-c28-t2-a{18,26,36,51}` (big pink/red petal drop), `por-consort-c02-t2-a{18,26,36,51}` (large diamond/drop), `por-consort-c02-t5-a{18,26,36,51}` (ornate gold drop, ~0.11). Not on the "deliberately untouched" list — worker must shrink to 0.085 (and see owner question below).
7. Small pendant bead dots under the flower (minor, same family as 2): `por-maid-m45-t1-a18`, `por-maid-m47-t3/t6-a18` (and other ages), `por-consort-c18-t6-a51`, `por-maid-m43-t5-a18`. Remove the dot.

## Listed only (owner question pending, NOT failed): crescent/flame/drop/blade/gem shapes
c05 + c26 crescent (all tiers, all ages); c06 + m06 flame (all tiers); c15 blade (t1,t2,t4,t5,t7 + others); c29-t1; c09-t1 blade; plus shapes the worker did not list: c02-t4/t6 (drop/ring), c04-t6 purple gem, c18-t6 + c29-t7 red gem diamond, m33-t4/t5 and m49-t2/t3 flame-like. Owner should say whether "gem/pendant" counts as an object.
## WATCH (faint, not failing)
m12-t2/t5, m22-t2/t3, m24-t1/t2/t3, c28-t4/t5, c20-t3/t4, m36/m50 low tiers: very pale; visible at 2x only.
## Tooling note
log_por.jsonl has ~300 lines with two JSON objects on one line (json.loads per line breaks the old r1_* scripts); r3_* scripts use raw_decode. opencv 5.x has no haar cascade (face.py breaks) — twins script stubs it.
