# F3 — Quyến rũ s43 s44 s45 (new base pictures) — BLOCKED at the store gate, 0 gens
START_CTX ≈4 % of 1M (estimate; get_session read 0) · depth 7 (limit 8) · worker of ROOT-63 (session_01PEhRbvZfdPoYPcwQjYD5EG)

## Built
- dev/art/face-common/make_quyenru_s43_45.py = make_quyenru_L761.py copied unchanged (Quyến rũ T7 face + r2 expression + V5B + EYES_STRAIGHT + strong mouth + FG.final master block); only the person rows and ROOTS differ.
- Colours = root_drawn (owner L27 "Giữ lại bảng áo đậm màu", ROOT-63 message): s43 soft sapphire blue #385A9F + pale lemon cream #EAE5CD; s44 soft burnt sienna #A6593F + sage grey #9EB39E; s45 soft aubergine purple #7C4587 + pale gold #DACEA9.
- Each keeps her own hair, outfit, item, angle from make_sacsao_L737.py (s43 SL scroll, s44 TR pomegranate, s45 SR sachet). Beauty mark = approved Quyến rũ wording (below outer corner of her own LEFT eye) — D17 OK.
- DIFF vs approved Quyến rũ s56–s61 (A17): only per-person rows. Face swaps carry her own trait softly: s43 "short, nearly straight, softly curved brows" + "softly sculpted cheeks"; s44 "soft DIAMOND-OVAL face, widest at the gently high cheekbones," + "softly full lips with a clear curved bow"; s45 "soft TEARDROP-OVAL face" + "very large … almond eyes" + "a straight nose with a gently arched bridge". Pose verbs in Quyến rũ wording ("standing with her weight on one leg and her head softly tilted" / "walking slowly and gracefully mid-step … the other sleeve trailing"); s43 "as if checking a record" dropped (Sắc sảo flavour, eyes would go down to the scroll).
- Draft prompts (gate run with the root_drawn pair swapped in, nothing else): dev/handover/reports/F3-drafts/s4N.qr.DRAFT.txt (~6.1k chars each).

## Gate (check_store --scope face via FG.final) — FAIL, so NO gens
1. B20 ROOT HEX (all 3): check_store.root_pair() reads s_root_colours.json main_hex = the SOFT codes (#81A0D9/#D18C74/#B98BC3), so the L27 deep root_drawn hexes FAIL. The gate needs updating for L27 (foreman's job, I do not change the gate). With root_drawn swapped in: s43 PASS, s45 PASS.
2. B19 NO GREY (s44): "sage grey" is her root sec colour, but B19 fails grey outfit colours. Her approved Sắc sảo prompt s44.v5.FULL.txt fails the same check today. Owner/foreman choice: allow sage grey for s44 (her drawn colour) or rename (e.g. "sage green") — rename = colour change, needs the owner.
3. Note (not a gate fail): the FG.final master COLOUR RULE says "medium-light tone … never heavy" while L27 deep hexes (#385A9F, #A6593F, #7C4587) are medium-dark. May pull the robes lighter. Unchanged (LAW #0).

## Credits: 0 used. Commit: see git log ("F3 …").

## Update (ROOT-64; owner "Thôi đại đi, có người màu này màu kia" = keep each deep root as is)
- check_store.root_pair(): a person with root_drawn on her root season → the gate requires root_drawn (L27); else as before. Regression over all face-common/sNN.v5.FULL.txt: the same 9 files fail B20 before and after (s15 s18 s20 s27 s28 s31 s33 s37 s38, old-code prompts that already failed) → no new fails.
- make_quyenru_s43_45.py: a gate fail on one person no longer stops the others (no PASS = no file; exit non-zero at the end).
- Gate: s43.qr.FULL.txt PASS · s45.qr.FULL.txt PASS · s44 FAIL B19 NO GREY (sage grey) → waiting on the owner. READY, 0 gens.

## Gens (GO ROOT-64; owner "Xám là bỏ hết" → s44 waits for a non-grey sec from P3)
- s43 gen hu2Ng4AvqL → cut lJtdYwigv9 · s45 gen s7IezvGl8e → cut cpSxQta0eP. gpt-2-6 1024x2304 2k seed 7172, ref eIyOFEidqL, folder ba4aecfe. 1 try each. Credits 2×135 + 2×3 = 276.
- Sheet: dev/handover/review-sheets/new-faces-v4/quyenru_s43_45_F3.jpg (make_sheet_quyenru_s43_45.py): per person OLD | NEW + face zoom + root_drawn swatches, big labels (A27), s44 NEW = empty slot with a note, benchmarks s16 s33 s34.
- (superseded) owner OK Lượt 950 → FACE_CUTS / FACE_MAP / face crops switched for s43 + s45, group Quyến rũ; ledger OWNER-OK line.
- Looked (face zoom, full figure on the sheet): eyes level, irises aligned, lips closed, no teeth, item held (s43 scroll in both hands, s45 sachet at chest), both root colours clear, no forehead mark, beauty mark under her LEFT eye (right side of the picture) on both (D17 OK).
- Faults (not fixed, L777):
  1. NEW looks very close to OLD (same seed + ref + same hair/outfit/pose): same body, robe, folds; the change is mostly in the face (head tilt, half-lidded gaze, one-corner sly smile, beauty mark). The owner may find the move too subtle.
  2. s43 NEW: a small drop earring (not in the prompt).
  3. s45 OLD (Sắc sảo, already approved) already shows a dark dot under her eye, so the beauty mark doesn't set NEW apart from OLD.
  4. s43 blue reads lighter/softer than #385A9F (the master "medium-light" sentence), close to the OLD picture.
- NOTE: ROOT-64 sent HOLD at 02:26:59Z (owner "Khoan, phải phân loại màu theo mùa đã"). It reached F3 only at 02:30Z, after the s43/s45 gens (~02:27–02:28Z) had run on the earlier GO. Told the foreman. Now HOLDING all (s44 too) until a new GO. If the season sort changes their colours, s43/s45 can be dropped (not in FACE_CUTS).

## s44 (ROOT-64 GO, P3 sec pick)
- Colour: P3 wrote s44.thu root sec "sage green" #94B594 in palettes_season_deep.json (commit 1ee0287; root_drawn there keeps sage grey). check_store.root_pair reads palettes_season_deep.json for s44 ONLY (DEEP_ROOT_IDS = {"s44"}); the builder takes s44's pair from the same file. Gate PASS.
- gen kse0GTu16B → cut DoOgxICpcl, 1 try, 138 cr (F3 total 414). Sheet rebuilt with s44 OLD | NEW (status line under each NEW: s43/s45 "chủ OK Lượt 950", s44 "chờ chủ xem").
- Looked: eyes level, lips closed, no teeth, pomegranate held, sienna + sage green clear, beauty mark under her LEFT eye (right side of picture), no forehead mark.
- Faults (not fixed): red drop earrings (not in prompt); NEW again very close to OLD (same body/robe), the change is the face + greener skirt.
- FACE_CUTS/FACE_MAP for s44 NOT switched (waiting for owner OK).
- Owner OK Lượt 961 → s44 FACE_CUTS/FACE_MAP/crop switched to DoOgxICpcl, ledger OWNER-OK. F3 done, idle. Total 414 credits.
