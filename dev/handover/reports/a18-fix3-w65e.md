# a18 fix-3 (W65e, 18/11) — successor of W65d; t1-t6 ONLY (no t7/t8), STOPPED by Foreman C
PRIORITY #1 CHECK: continued W65d (OD 3 | ledger 3 | claims W65d | main 0 | review/* 0). depth: see session. Tools: dev/handover/reports/a18-fix3-tools (now incl. cur.py, sheet.py, mouth.py head-crop checker, finish.sh with curl retry).
| person | gens | what |
|---|---|---|
| c09 | 6 | t3 v0-2 closed-lip; t6 v0-2 peony sprig -> pearl-embroidered silk folding fan, jade ribs |
| c10 | 3 | t6 book -> white-jade ruyi, red tassel |
| c11 | 3 | t6 loose branch -> pearl-tasselled silk lantern, jade top |
| c12 | 8 | t3 v0-2 closed-lip (v2 needed 3 gens: 2 showed teeth); t6 branch -> gold-mounted white-jade pendant on red cord |
| c13 | 6 | t4 closed-lip + branch -> sandalwood folding fan (t4 item); t6 closed-lip + fan lowered off the face |
| c15 | 3 | t6 branch -> pearl ivory folding fan, jade ribs; v1/v2 closed-lip |
| c16 | 3 | t6 lotus -> white-jade incense box |
| c17 | 3 | t6 branch -> jade-and-gold round fan (silk face jade green / ivory) |
| c18 | 13 | closed-lip t2 v0-2, t3 v1-2, t4 v1-2, t5 v0-2; t6 branch -> white-jade vase with gold mounts |
READY sent to Foreman C for each. Total gens 48 (+1 extra for c12). Lessons: "lips pressed together, no gap, no teeth" wording works better than "closed-lip smile" alone; check mouth with tools/mouth.py (head crop from alpha bbox); alpha coverage ~0.55-0.64 OK.
## HANDOVER (W65e -> successor, only if Foreman C resumes)
STOPPED at Foreman C's order (owner prefers the new full re-prompt of t1-t6; old-set fixes may be wasted). NEXT = c19 (t2 v0-2 + t3 v0-2 teeth, t6 v0-2 item), then c20..c32 (c14 and t6 of c03/c24 skipped). plan.json lists files per person; t7/t8 excluded.
Next unused t6 items: coral branch on gold stand (needs contrast with robe), pearl lantern/jade pendant/etc already used once each; spread neighbours.
Flow per person: python3 tools/cur.py cNN; upload each file with creations_upload_image; images_generate gpt-2-6 1024x2304 2k transparent, refs [file, style eIyOFEidqL], prompt "Copy EXACTLY ... change ONLY <mouth | item>" + embroidery + fabric-drape sentence; creations_wait; tools/get.py; look new.jpg + tools/mouth.py; tools/finish.sh cNN; READY to Foreman C. Setup is ephemeral (/home/user/wt/w65c-work, w65c-root with cdn_sync.py + manifest_guard.py from origin/main).
