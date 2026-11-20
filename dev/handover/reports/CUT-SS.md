# CUT-SS report (worker for Foreman C ROOT) — depth: worker; START_CTX ~8 %
Owner orders: "M18 hoàng [quý phi] sửa lại, mắt bị lé." + transparent full-HD cut-outs of the Sắc sảo group.

## JOB 1 — m18 t7 Hoàng quý phi a18 redraw (owner GO, 1 try)
- Prompt: dev/art/rank8-t78/m18_t7_eyes.txt = m18_t7.txt + ONE added sentence (A17 diff): the owner EYES sentence was MISSING, added before "Everyone beautiful at every age." (verbatim as in rank8-old4/m29_t7_eyes.txt): "EYES (owner): both eyes level and symmetrical, both pupils looking straight at the viewer with a natural, matching gaze, never cross-eyed, never squinting, never one eye looking elsewhere; the same face as image 1." Nothing else changed.
- Gate: check_store --scope tp7 --age a18 --refs s7IPw0Ll8e,TdwDfOyVNR → STORE PASS / APPROVED PASS (8879 chars).
- Gen: gpt-2-6 1024x2304 2k seed 7173, refs s7IPw0Ll8e (m18 cut, same as T78-B) + TdwDfOyVNR → **SyhuHMnUb8** (135 cr), replaces 8aiNc5wIrU.
- Looked full size: both eyes level, both pupils centred on the viewer — NOT lé. Mouth closed, no teeth, no earrings, no forehead mark, 3/4 right, sleeves to floor, fan in both hands.
- Files: dev/handover/review-sheets/rank8-t78/m18_t7_a18_v2.webp, m18_t7_OLD_NEW.jpg (OLD | NEW, big labels).

## JOB 2 — 16 transparent cut-outs, Sắc sảo (16 × 3 cr = 48 cr)
images_remove_background on each RANK8 gen id; full res 1024x2304 RGBA, no rescale; dev/art/rank8-t78/cut/<id>_t7.png / _t8.png:
m09_t7 m09_t8 s07_t7 s07_t8 s08_t7 s08_t8 s09_t7 s09_t8 s39_t7 s39_t8 s40_t7 s40_t8 s41_t7 s41_t8 s42_t7 s42_t8.
Checked composited on #18181C: clean hair/crown/tassel edges, no parchment halo; corners alpha 0; light-edge pixels 0.6–3.2 % of the soft edge (fine hair strands only).
Ledger: 1 × RANK8 + 16 × RANK8-CUT (cut ids in gen_ledger.jsonl).

Credits total: 135 + 48 = 183.
