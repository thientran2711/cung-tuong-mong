# T78-MASS — t7 Hoàng quý phi + t8 Hoàng hậu, age a18, the new faces (owner standing order 20/11, see TAKEOVER_FOREMAN_C_NEWACCT.md ">>> START HERE")
Coordinator: Foreman C ROOT (new account) session_01D3E3NWtCdQC92tFLkd25H5. Owner is ASLEEP: never ask her anything.
Owner verbatim (job): "Vẽ Hoàng Quý Phi và Hoàng Hậu thôi." + "Tao vừa mở ra là mày vẽ hàng loạt bên đó, đừng có hỏi tao."

## People (the 90 = OWNER_GROUPS_L686 groups DD/ĐT/SS/KK/LL/QR)
Drawn tonight = 68: m02 m04 m05 m08 m09 m10 m14 m16 m18 m20 m22 m28 + s07–s61 + s63.
SKIP: s62 s64 s65 m29 m19 (have t7/t8), Kho, princesses, ALL c-ids (unclear under A33 → morning list).

## Method (same as RANK8-C, commit c51c37e / fbb5797; read dev/handover/reports/RANK8-C.md §2–§4)
- Prompt: `python3 dev/art/store-all/build_all.py <id> 7` and `... <id> 8` (a18, current builder: G20 INNER_EMB, G23 legs, G18 cancelled). Save to dev/art/rank8-t78/<id>_t7.txt / _t8.txt.
- Gate before EVERY gen (A19): `python3 dev/art/check_store.py <file> <id> --t7 v0 --spec5pose` (t7) / `<file> <id> v0 --spec5pose` (t8), as RANK8-A did for s62; plus `<file> --scope tp7|tp8 --age a18` → both PASS, ≤10 000 chars. A FAIL: do not gen, note it.
- Gen: Magnific images_generate mode gpt-2-6, 1024x2304, resolution 2k, seed 7172; refs = [face cut id of the person from dev/art/face-common/FACE_MAP_L703.json ("cut"), TdwDfOyVNR (royal yellow swatch)]. ONE try per picture.
- SPEED: fire ALL your gens at once (parallel), then wait for them together (creations_wait).
- Before firing: mcp Magnific account_balance. If balance − (your gens × 140) < 52 000 → fire only what fits above 52 000, stop, report.
- Ledger: append one line per gen to dev/art/gen_ledger.jsonl, kind "RANK8", same fields as the RANK8-C lines (ts, who, cmd, prompt_file, settings, refs, store_check, gen_id, credits).
- LOOK at every picture full size (creations_read). Visible defect (eyes crossed, teeth, extra hand, earrings, pet, fruit, broken crown, wrong colours…) → NOTE it in your report; NO redraw, NO cut-out tonight.
- Download each picture to dev/handover/review-sheets/rank8-t78/<id>_t7_a18.webp / _t8_a18.webp.
- Sheet per person: dev/handover/review-sheets/rank8-t78/<id>_t7t8_sheet.jpg = "t7 | t8" side by side, BIG labels on the image (A27): id + Vietnamese name if the data has one + group (OWNER_GROUPS_L686) + rank name (Hoàng quý phi / Hoàng hậu). LOOK at the sheet.
- Push to claude/cung-tuong-mong-handover-hj0h8w (git pull --rebase before push; conflict in gen_ledger.jsonl → keep both sides).
- Report: dev/handover/reports/T78-<letter>.md (table id | t | gen | gate | defect note; credits; balance after). Then send_message to the coordinator: "T78-<letter> DONE: n gens, cr, defects: …".
- Do not read big files whole. No side work.
