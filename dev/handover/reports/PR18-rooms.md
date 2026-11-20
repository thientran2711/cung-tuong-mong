# PR18 — art worker (successor of PR17). depth 6, START_CTX ~5 % (estimate; get_session used_tokens reads 0; window 1 000 000) → roll line ~30 %, ceiling 60 %. Coordinator = Foreman C ROOT-62 session_01PEhRbv1mzNGajBinerKiRq.

## JOB 1 — owner L867 pastel Magnific test (s46–s61)
Prompts: dev/art/face-common/pastel_L867/sNN.pastel.FULL.txt, made by make_pastel_prompts.py (hex map in pastel_hexes.json).
- Base = the prompt of each original gen (s51–s61: current sNN file = Magnific stored prompt; s46/s49/s50: L770 changed the codes in the file AFTER the gen → restored the DRAWN pair from s_root_colours.json root_drawn).
- A17 diff: ONLY the two robe hexes (robe_pastel.py flat-hex form: w = 1, g from the hex; k from the prompt hexes) + a 'deep ' colour word dropped where the lighter hex would fight it (s46 deep blue-violet → blue-violet, s50 deep raspberry → raspberry). s46–s50 files predate the B25 master sentences → master_common.apply + D9 (same as face_gate.final), no other change.
- Gate: every check PASS except B20 ROOT HEX (fails BY DESIGN: any lowered hex is 'not her root pair'). Asked ROOT-62 for the B20 ruling before any gen.
- Cost exact (simulate_cost): 16 × (135 gen + 3 cut-out) = 2 208 cr. Balance 91 606 at 01:5xZ.
| s | MAIN before → pastel | SEC before → pastel |
|---|---|---|
| s46 k=0.55 | cool aquamarine #86CDB9 → #A6DACA | deep blue-violet #5D5894 → #76709E |
| s47 k=0.55 | periwinkle #949BD8 → #B9BDEC | mint #9ACBB7 → #B3D8C8 |
| s48 k=0.55 | soft blush pink #DF9FA8 → #EDBCC2 | aqua celadon #8BC6BE → #ABD6CF |
| s49 k=0.55 | soft burgundy rose #C37986 → #E3A9B1 | pine teal #388581 → #82B7B4 |
| s50 k=0.6 | clear ice blue #A6C9E4 → #B9D4E9 | deep raspberry #A55D7A → #CA8FA5 |
| s51 k=0.55 | cool lilac #CCB0E5 → #DAC5ED | soft pine teal #62AEA9 → #95CBC7 |
| s52 k=0.61 | sky blue #98C8D7 → #AFD4DF | soft coral #D38A7B → #E8AB9F |
| s53 k=0.55 | soft lavender #A893CE → #C8B7E5 | pale mint green #B0DDD0 → #BFE0D6 |
| s54 k=0.55 | carnation pink #E4A1B7 → #EFBCCC | soft sea blue #75A7C3 → #A2C6DB |
| s55 k=0.6 | pink lilac #CEA1BF → #DEBAD2 | soft jade green #9EB28F → #B8C8AC |
| s56 k=0.55 | apricot #D6A585 → #E7C0A8 | lavender violet #A991CA → #C9B6E2 |
| s57 k=0.55 | soft orchid purple #BA8CC4 → #D6B3DD | warm beige cream #E8D3B8 → #E7D7C3 |
| s58 k=0.55 | soft rust red #D28B79 → #EAB2A3 | pale mint green #B0DDD0 → #BFE0D6 |
| s59 k=0.64 | soft apricot #DEAF9B → #E7C0B0 | soft moonlight blue #A4BCD8 → #B8CBE1 |
| s60 k=0.55 | coral pink #D9998C → #EBB9AF | soft sea blue #649AB8 → #9ABFD7 |
| s61 k=0.55 | persimmon #D2906C → #EAB599 | ivory #EDDCC6 → #E9DDCC |
- B20 EXEMPTION (ROOT-62 01:30Z): "B20 OK — for these 16 L867 pastel TEST gens only (owner's explicit order to draw with the lowered codes = the exemption; they replace no game art)". GATE NOTE: every pastel prompt = all checks PASS except B20 ROOT HEX (exempted); ledger lines carry "gate":"PASS except B20 (L867 exemption ROOT-62)".

### L867 result + credits (exact)
Gens (gpt-2-6 1024×2304 2k, ref eIyOFEidqL, folder ba4aecfe…): s46–s60 = 15 × 135 = 2 025 cr (s57 first try failed NSFW false flag → refunded, retry seed 7173; s60 seed 7173 as the original; the s60 call was interrupted but RAN = lJtesu7gv9). Cut-outs s46–s56 + s58 = 12 × 3 = 36 cr. TOTAL L867 = 2 061 cr. Balance 91 606 → 89 539 (pool shared; 6 cr other). Ids: dev/art/face-common/pastel_L867/gens.json. s61 never drawn.
Sheets (CDN img/_review/place-rank/pr18/): nf867-thua-minh-cung-tay-phoi-ngu-lbl.jpg (s46–49), nf867-thua-minh-cung-tay-phoi-lbl.jpg (s50–53) [room bg, 3 rows]; owner order ~01:50Z: nf867-tam-cung-{a,b,c}-lbl.jpg (s46–49, s50–53, s54–56 on the live tẩm cung hạ sáng background, rows GỐC | PASTEL SỐ | PASTEL VẼ), composer sheet_bg.py.
Faults (list only): s48 pink a bit candy; s49 rose still deep; s50 raspberry mid-saturated; s51 lilac brighter + smile warm; s52 skirt-hem coral border dropped; s56 apricot more orange; s58 rust skirt deeper. General: drawn pastel lighter than GỐC but pinks/oranges stay more saturated than PASTEL SỐ (master 'medium saturation, never pastel-washed' sentence).
OWNER DECISION L26 (ROOT-62 01:52Z, verbatim "Tôi quyết định là giữ lại cái bản màu gốc, bởi vì khi mà mình đặt vô cái nền sáng của mình đó, cái nền mà tẩm cung của mình mà với cái ánh sáng trắng á, nó lại rất là hợp."): robe pastel CANCELLED; robes keep ORIGINAL colours. No more pastel gens.
NEXT (HELD until the owner's go via ROOT-62): room 30 sample per L25 (hạ sáng light/base, textiles = rank colour, white-light sentence, no brown-wood/warm-floor words) — sheet room 28 old | room 30 new + hạ sáng ref.
- owner ~02:00Z: same composites on the live Ngự hoa viên hạ sáng bg: nf867-nhv-{a,b,c}-lbl.jpg (c = s54 s55 s56 s58), 0 cr.
- Coordinator now Foreman C ROOT-63 session_01PEhRbvZfdPoYPcwQjYD5EG (child of ROOT-62, verified 01:57Z).
- L25 update (ROOT-63 01:58Z, owner ~01:57Z 'Giữ bảng màu gốc, đồng thời lấy thêm ánh sáng của ngự hoa viên làm mẫu'): room 30 sample LIGHT refs = tam-cung-dem-ha-sang.webp + ngu-hoa-vien-ha-sang.webp (light only). Still HELD.

## Owner job (ROOT-63 ~02:00Z, 0 cr): công chúa + nhân vật theo màu công chúa on live Ngự hoa viên hạ sáng
- Sheet 1 cc-nhv-1-lbl.jpg: 3 công chúa Cao Ly V2 cut-outs xSByOSyjfW (t4) / yiuGA83PW9 (t5) / cpS8oJg0eP (t6), all present; deep rose #C9708A + jade green #79A98F (pair used ONLY in princess prompts).
- Sheet 2 cc-nhv-2-lbl.jpg: 6 LIVE figures (CDN img/fig-consort-*-a26.webp, B15 two-colour sentence, own colours): c06 t1 Đáp ứng · c01 t2 Thường tại · c30 t3 Quý nhân · c10 t4 Tần · c20 t5 Phi · c15 t6 Quý phi. Note: these live pictures still hold a teacup (older set).
- Composer dev/art/face-common/pastel_L867/sheet_row.py.
- CORRECTION (owner "công chúa 3 nước"): cc3-nhv-1-lbl.jpg = Ba Tư t4 mEZbHB7hJQ (#5B6CA6 + #EFE6D2) · Cao Ly t4 xSByOSyjfW (#C9708A + #79A98F) · Phù Tang t4 mEZbq2FhJQ (#9C88BC + #B8556A), night-1119 store set. Sheet 2: no other character uses any princess pair (grep prompts/palettes/ledger) → reported, nothing composited.
- owner add-on 'so sánh với màu bảng gốc': cc3-nhv-cmp-lbl.jpg = row CÔNG CHÚA 3 nước (swatches) + 3 rows thiếu nữ s46–56,s58 in MÀU GỐC (drawn root pair) with swatches gốc vs nearest princess pair (hue); no princess-colour versions exist (said on sheet).
- owner "bộ màu đậm hơn, đã vẽ": set = palettes_season.json root_drawn (Lượt 763 drawn pairs; softened to current bảng gốc by L769/770 codes-only, 70 people). deep-nhv-lbl.jpg = 12 thiếu nữ s07 s09 s10 s11 s14 s15 s18 s19 s22 s24 s28 s31 (latest ledger cut-outs) on live Ngự hoa viên hạ sáng with swatches BỘ ĐẬM vs BẢNG GỐC. 0 cr.
- APPROVED PALETTE (owner "bảng tôi duyệt"): palettes_season.json @86f1eb337 (Lượt 752, 19/11 22:40Z; fetched with --shallow-since). Covers only m/c/nc, NO thiếu nữ. For all 31 m/c roots: approved == root_drawn; current file differs for 28/31 (softened L769/770 + root seasons moved). approved-nhv-lbl.jpg = 12 live m/c pictures (m04 m10 m14 m28 m29 m18 c14 c32 c04 c11 c16 c27) on Ngự hoa viên with swatches ĐÃ DUYỆT vs HIỆN TẠI; live pictures barely show the deep secondaries (noted). cc3-nhv-cmp redo with approved swatches impossible for s46–s58 (not in the approved palette).
- 4-girl sheets: dam-duyet-nhv-lbl.jpg (s07 s28 ĐẬM | s47 s56 DUYỆT, superseded) → owner-corrected dam-moi-nhv-lbl.jpg (ÁO MÀU ĐẬM s07 s28 | BẢNG MÀU MỚI (DUYỆT) s47 s53, drawn codes = current s_root_colours). 0 cr.
- dam-moi-nhv-{2,3,4}-lbl.jpg: ĐẬM s09 s14|MỚI s48 s51 · ĐẬM s18 s22|MỚI s52 s54 · ĐẬM s24 s31|MỚI s55 s58 (subtitle overlap fixed, re-uploaded). 0 cr.
- L27 (ROOT-63 02:20Z, owner 'Giữ lại bảng áo đậm màu'): deep robe set (root_drawn) kept; nothing to redraw. Room 30 still HELD.
- Coordinator now Foreman C ROOT-64 session_01PEhRbvtRVfXrisTmcUTUJ9 (child of ROOT-63, verified 02:24Z).

## HANDOVER → next worker (PR19): PR18 at context ~25–28 % (estimate; START_CTX ~5 %, roll line ~30 %). depth 6. Coordinator = Foreman C ROOT-64 session_01PEhRbvtRVfXrisTmcUTUJ9; the coordinator opens PR19.
STATE: idle, 0 gens running, 0 redraws pending. L867 pastel test CLOSED (L26 keep original colours; 2 061 cr). L27 deep robe set (root_drawn) kept. Credits 89 539 at 01:52Z (shared pool).
NEXT (HELD until the owner's go via ROOT-64): ROOM 30 SAMPLE = Trường Xuân TÂY phối reception (pair ĐQ like room 29, CARD_TX; receptions alternate → 2w windows LEFT, M2X), ONE gen (~135 cr) per L25: LIGHT refs = img/tam-cung-dem-ha-sang.webp + img/ngu-hoa-vien-ha-sang.webp (light/base only: pale grey polished stone floor, light neutral walls, little dark wood, fresh daylight); all textiles/accents = the occupants' RANK colour (B24/L1), NOT the ref's pink gauze / ivory screens / rose brocade; MANDATORY sentence 'bright neutral white daylight, clean white light, no warm golden or amber cast, lanterns unlit'; drop 'warm polished wooden floorboards', chestnut/walnut/rosewood, warm/golden/lantern-glow words (prompts_pr13.py). `python3 dev/art/rule.py find L25`. Sheet: room 28 OLD | room 30 NEW + small hạ sáng ref in a corner, A27 labels big. Say cost, LOOK, send. No more rooms until she OKs it. Method for rooms = PR17 HANDOVER (METHOD line) in dev/handover/reports/PR17-rooms.md.
TOOLS made here (dev/art/face-common/pastel_L867/): sheet_row.py (any cut-outs on any bg, rows of ≤4, A27 labels + swatch rows), sheet_bg.py (GỐC|PASTEL SỐ|PASTEL VẼ rows), sheet3.py. Magnific cut-out URLs: creations_wait on the cut id (compact) instead of creations_get (huge prompt dump).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
(As a worker: at your roll line write the handover in your report and tell your coordinator; the coordinator opens your successor.)

## ROOM 30 SAMPLE (owner GO ~02:39Z via ROOT-64) — 135 cr, gen 8aiywnbIrU
Builder dev/art/place-rank/prompts_pr18_room30.py (imports prompts_pr13; own small L25 variant of room9). A17 diff vs PR17 method: C9_STYLE 'same natural warm light' → 'same natural light'; C9_END LIGHT → L25 white-light sentence verbatim + images 4/5 = light refs (tẩm cung hạ sáng 5jDWGSRKxe, Ngự hoa viên hạ sáng bxMYASU5Y2, uploaded from the CDN); FLOOR 'warm polished wooden floorboards' → 'a pale grey polished stone floor'; + BASE sentence (light neutral walls, wood only on frames/pillars/furniture). Pair ĐQ (curtains soft blue #7E9CCB, fabrics cream-ivory #EAE3D0), 2w windows LEFT (M2X), own layout: zitan luohan daybed before a kingfisher magnolia screen (right half), vase doorway in openwork partition (left half), armchair pair on the left window wall. Room gate PASS. floor_c 19.0 %.
Sheet: img/_review/place-rank/pr18/room30-vs-28-lbl.jpg (room 28 OLD | room 30 NEW, live figures + tags, light refs inset). Room: img/_review/place-rank/pr13/truong-xuan-cung-tay-phoi-ha-sang.webp.
LOOK / faults (list only): armchair pair is a fairly large piece at the left edge (C9 says small objects only near the left); lanterns read unlit-ish ivory (OK); wood still dark zitan on furniture/partition as CARD_TX requires; overall bright, white, rank colours readable.
HANDOVER UPDATE (02:50Z): room 30 sample DONE (8aiywnbIrU, 135 cr, sheet pr18/room30-vs-28-lbl.jpg); builder prompts_pr18_room30.py = the L25 template for next rooms (copy its STYLE/END/BASE/room_l25 + 5 refs). NEXT for PR19: wait for the owner's verdict on room 30; if OK → continue the queue (Tần → Phi → Quý phi chính điện rooms…) with the L25 builder, batches of 5.
