# PR17 — rooms worker (successor of PR16). depth 4, START_CTX ~5 % (estimate; get_session context_usage reads 0) → roll line ~30 %, ceiling 60 %. Coordinator = Foreman C ROOT-61 session_01PEhRbxPG7XXXVSg4KgDLkW (successor of ROOT-60).

## JOB 1 — owner Lượt 840 PASTEL robe redo (0 gens, 0 credits)
Owner: "Quyết định hạ màu áo" BUT s61 orange went BROWN in PR16's test → "hạ màu tức là vẫn giữ tông màu đó nhưng cho nó pastel hơn … chứ không phải đổi sắc màu".
Why PR16 browned: a,b × k with L kept → orange/red at the same lightness with less chroma = tan/brown.
Tool NEW dev/art/place-rank/stage_exact/robe_pastel.py (mask + skin guard = robe_lower.py; only the colour step changed).
### FORMULA (P2 season palette: reuse exactly)
CIELAB, per pixel; w = robe mask weight ∈ [0,1] (robe_lower.py: rows below the collar ramp 15→21 % of the figure box, minus own-face-skin guard, alpha > 0):
```
k  = max(0.55, min(1, 14 / MAIN C, 20 / SEC C))      MAIN/SEC from robe_colour.py (same k as PR16)
kc = sqrt(k)                                          chroma factor   (k 0.55 → kc 0.74)
t  = 1.2 · (1 − k)                                    lightness lift  (k 0.55 → t 0.54)
g  = clip((C_px − 4)/12, 0, 1) · clip((L_px − 35)/15, 0, 1)   only coloured, not-dark pixels lift (dark hair over the robe, ink lines, whites stay)
a' = a · (1 − w·(1 − kc))      b' = b · (1 − w·(1 − kc))      → hue angle atan2(b, a) unchanged
L' = L + max(0, 88 − L) · t · g · w                           → only lighter, toward L 88; never darker
```
For a flat palette hex (no mask): w = 1, g from the hex itself. Hue check in Oklab: s61 SEC #BE755D 38.9° → #D79B89 ~39°; s58 #C98073 30.7° → ~31°; s60 #E79B96 23.6° → ~24°.
Tried first: kc = k, t = 0.9(1 − k) and t = 1.26 → s61 read pinkish and the long hair over the robe turned grey (no dark guard) → added g's L term + kc = sqrt(k).
### Numbers (robe_colour.py; cluster labels can swap after recolour, e.g. s58 SEC = the green sleeves after)
```
s46 k=0.60 t=0.48 | MAIN #ACBEBA L75 C6 -> #AFBDBB L75 C5 | SEC #6F649B L45 C33 -> #8077A2 L52 C25
s47 k=0.93 t=0.08 | MAIN #B3C1B8 L76 C7 -> #B4C2B9 L77 C6 | SEC #9192B8 L61 C21 -> #9697BC L63 C20
s48 k=0.63 t=0.45 | MAIN #D49C9D L69 C22 -> #E4B7B8 L78 C17 | SEC #E2B6B5 L78 C17 -> #B1BBB4 L75 C5
s49 k=0.71 t=0.34 | MAIN #66787A L49 C7 -> #707F81 L52 C5 | SEC #B5727C L55 C28 -> #CA8E97 L65 C24
s50 k=0.59 t=0.49 | MAIN #B7B8C4 L75 C6 -> #D595A6 L68 C26 | SEC #B6687F L53 C33 -> #A36B7A L51 C24
s51 k=0.79 t=0.25 | MAIN #BFA4BE L70 C17 -> #C9B1C9 L75 C15 | SEC #D9BEBF L79 C10 -> #99ACAD L69 C6
s52 k=0.81 t=0.23 | MAIN #AEC3CD L77 C9 -> #B2C5CF L78 C8 | SEC #D9A193 L71 C24 -> #DFAB9E L74 C22
s53 k=0.67 t=0.39 | MAIN #C1A2C2 L70 C20 -> #CEB4CE L76 C17 | SEC #B0B0A6 L72 C5 -> #B3B4AC L73 C4
s54 k=0.57 t=0.51 | MAIN #E5A8B0 L74 C24 -> #EBB8BF L79 C19 | SEC #D28F98 L66 C27 -> #B5B9C1 L75 C4
s55 k=0.97 t=0.04 | MAIN #B4A38F L68 C13 -> #B6A591 L68 C12 | SEC #CC99A3 L68 C20 -> #CB99A2 L68 C20
s56 k=0.63 t=0.44 | MAIN #C89FBC L70 C22 -> #D1B1CB L75 C18 | SEC #E1AD9E L75 C22 -> #E9B8A9 L78 C21
s57 k=0.65 t=0.42 | MAIN #C395AD L66 C21 -> #D5B0C3 L75 C17 | SEC #D8B5A5 L76 C16 -> #E1C2B2 L80 C14
s58 k=0.55 t=0.54 | MAIN #C98073 L61 C32 -> #E3A69B L73 C25 | SEC #B36A5D L52 C34 -> (green sleeves now SEC)
s59 k=0.60 t=0.48 | MAIN #E5AF9F L76 C23 -> #EDC2B3 L81 C18 | SEC #D29989 L68 C25 -> #E4B5A8 L77 C19
s60 k=0.55 t=0.54 | MAIN #E79B96 L71 C31 -> #EFB0AB L77 C25 | SEC #D07F7A L61 C34 -> #F0C0BA L82 C18
s61 k=0.55 t=0.54 | MAIN #EDD1BC L85 C15 -> #EBB29C L77 C26 (orange became the biggest cluster) | SEC #BE755D L56 C36 -> #D79B89 L69 C27
```
Sheets (TOP gốc | BOTTOM pastel, tag line 3 "pastel", same rooms/groups as nf817/nf824), CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr17/nf840/ :
nf840-thua-minh-cung-tay-phoi-ngu.jpg (s46–49) · nf840-thua-minh-cung-tay-phoi.jpg (s50–53) · nf840-canh-phuc-cung-dong-phoi-ngu.jpg (s54–57) · nf840-canh-phuc-cung-dong-phoi.jpg (s58–61) · nf840-canh-phuc-cung-tay-phoi-ngu.jpg (s46 s51 s56 s61). Pastel cut-outs sNN-pastel.webp same folder (review only, not in the game; originals untouched).
MY LOOK (s58–61 sheet full size + s58/s60/s61 cut-outs before/after): s61 = soft peach-orange (not brown), s58 = soft coral-rose, s60 = soft pink; faces, skin, hair same; still clearly coloured, lighter overall. Trade-off: chroma ends ~25 (PR16's ~18): lightness carries the softness now.

## JOB 2 — L22 two-bed template (before any bedroom gen)
Owner-OK two-bed rooms with one bed LEFT + one RIGHT (L835 "rooms 11–15 all OK"; room 3 = L816 NOT OK; room 8 = recommended-redraw, no OK; rooms 17/21 not OK'd yet):
- room 13 Chung Tú tây phối bedroom aFG6jdzfSh (first made from owner L816 "frontal 2-bed layout"; 2-wall, windows LEFT M2X 8aiwqQTIrU; left bed just right of the window strip, right bed at the right edge, dressing table + panel + doorway centre) ← RECOMMENDED template
- room 15 Hàm An đông phối bedroom WDg1hlscXe (same composition, quatrefoil doorway centre)
Both look alike; neither has the left bed touching the left edge (window strip + small furniture there). → asked ROOT-61 which the owner means. HOLD all bedrooms until named.

## JOB 2 — batch 5 rooms (receptions not on hold)
| # | room | gen | layout | pair | floor_c | faults (list only, no redraw without owner yes) | tags sheet |
|---|---|---|---|---|---|---|---|
| 24 | Vĩnh Hòa đông phối reception | 8aiORuSIrU | 3-wall, windows RIGHT (cpS5YIl0eP); official's-hat chair pair + tea table in the LEFT third under a camellia/oriole scroll; gourd doorway in a lozenge lattice CENTRE; curio shelf right third; guqin on a low table left wall; bamboo-root flower stand + birdcage at the windows + NEW CARD_VH + FR | ĐĐ all cream-ivory | 17.3 | flowers read as pink peonies more than camellias; doorway = round-topped arch, gourd shape weak; nothing large over tag 1 | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-vinh-hoa-cung-dong-phoi.jpg |
A17: new room on the DH_DONG_REC frame; new CARD_VH; only layout sentences, occupants, card and colour differ. Gates: builder GATE PASS + room_gate.py PASS. Credits after: ~93 200.
Room 23 = Vĩnh Hòa đông phối BEDROOM (2w left) HOLD until ROOT-61 names the L22 template.

## A27 labels (ROOT-61 01:03Z): labelled copies, same CDN folders, suffix -lbl
nf840-<room>-lbl.jpg ×5 (header per half: GỐC/PASTEL — palace · đông/tây phối · phòng ngủ/khách · occupants' ranks; under each figure: GROUP big + "thiếu nữ · sNN"; s46–50 Lạnh lùng, s51–55 Kiêu kỳ, s56–61 Quyến rũ from OWNER_GROUPS_L686.json; small numbers kept). Room 24: pr13-ipad-tags-vinh-hoa-cung-dong-phoi-lbl.jpg. Every later sheet gets the same header (A27).
Batch 5 labelled (A27, 2-line 64 px header: "Phòng NN — palace" / "side hall · room type · occupants' ranks"): pr13-ipad-tags-{dien-huy-cung-dong-phoi, dien-huy-cung-tay-phoi-ngu, dien-huy-cung-tay-phoi, vinh-hoa-cung-dong-phoi}-lbl.jpg (CDN img/_review/place-rank/pr13/). ROOT-61 01:08Z: owner says rooms 13/15 are NOT the template she meant; candidates 1/3/5 sent to her (ROOT-61 guess room 3 Lw8MjWZswO). Bedrooms HOLD.
| 23 | Vĩnh Hòa đông phối bedroom | s7IpCwkl8e | TEMPLATE D (image 3 = Lw8MjWZswO, TPL_D replaces GUIDE_S): 3-wall, windows RIGHT; beds against the LEFT and RIGHT side walls; gourd doorway in a lozenge lattice + shared dressing table + 2 stools centre; clothes rack by the left bed + CARD_VH + BEDH4 + BEDW + FG | ĐĐ all cream-ivory | 18.6 | layout matches D; basket + small box bottom-left over tag 1 (recurring); flowers read as peonies; right bed half hidden behind figure 4 | https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-vinh-hoa-cung-dong-phoi-ngu-lbl.jpg |
L22 TEMPLATES (owner via ROOT-61 01:12Z, verbatim "Mẫu D và E ok, thay đổi qua lại"): D = room 3 Lw8MjWZswO, E = room 5 u5WZqYHQLD; alternate per new two-bed room: 23 = D → NEXT two-bed room = E (TE in prompts_pr13.py; write TPL_E: two alcove beds in a carved back-wall partition with a moon gate between, 3-wall windows LEFT like room 5; NB owner L815 'no alcove beds' is overridden for E by this verdict — confirm wording with ROOT-61 if the gate/rules object). BEDH4 says 'never beds set into a wall alcove' → drop BEDH4's alcove clause for E rooms.

## BATCH 6 (ROOT-62 GO 01:16Z) — 5 rooms × 135 = 675 cr; all gates PASS; LOOKED all 5; labels A27 (-lbl)
ROOT-62 (a): template-E rooms KEEP the alcove beds of room 5 (owner L24 'Mẫu D và E ok' approves E as drawn) → BEDH4E (BEDH4 minus 'never beds set into a wall alcove'); BEDH4's no-alcove clause stays for D rooms only. (b) new-room fixes: TAGZONE (bottom eighth bare floor), BEDSHOW (D beds deep along side walls), CAMELLIA (true camellias, not peonies). All in prompts_pr13.py.
| # | room | gen | template / layout | pair | floor_c | faults (list only) |
|---|---|---|---|---|---|---|
| 25 | Vĩnh Hòa tây phối bedroom | Cqn3pRBEEy | E (u5WZqYHQLD): alcove beds in a jichimu partition, gourd doorway centre, 3w windows left | ĐT cur cream / fab green | 12.1 | beds partly behind figures 2/4 (E layout); tag strip clear; camellias OK |
| 26 | Vĩnh Hòa tây phối reception | rgXTaMExtc | 2w windows left (M2X); bookcase + desk left, chair pair + camellia panel right, gourd doorway right end | ĐT | 15.6 | panel flowers still a bit peony-like; tag strip clear |
| 27 | Trường Xuân đông phối bedroom | 0eUxN0lTfW | D (Lw8MjWZswO) + BEDSHOW; vase doorway + dressing table centre | TQ cur green / fab blue | 14.7 | left bed partly behind figure 1; tag strip clear |
| 28 | Trường Xuân đông phối reception | MBJsRepDCm | 3w windows right (M3); chair pair before kingfisher screen left half; vase doorway right end | TQ | 15.2 | tall curio cabinet at the left edge; tag strip clear |
| 29 | Trường Xuân tây phối bedroom | yiumrNXPW9 | E (u5WZqYHQLD): alcove beds in a zitan partition, doorway centre, 3w windows left | ĐQ cur blue / fab cream | 10.8 | doorway an arch, not vase-shaped; beds partly behind figures 2/3; tag strip clear |
Sheets: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/pr13-ipad-tags-<key>-lbl.jpg. NEXT two-bed room = D (alternation D23 E25 D27 E29 → D). Pairs used now: ĐĐ 4, ĐT 6, TQ 6, ĐQ 5, TT 4, QQ 4.

## HANDOVER → next worker (PR18): PR17 rolls over at context 28.6 % (get_session used_tokens 285 560 / 1 000 000; START_CTX ~5 %, roll line ~30 %). depth 4. Coordinator = Foreman C ROOT-62 session_01PEhRbv1mzNGajBinerKiRq; the coordinator opens PR18.
STATE: L840 pastel sheets + formula DONE (robe_pastel.py; labelled nf840-*-lbl.jpg; ROOT-61 LOOKED OK). Batch 5 (rooms 20–24) + batch 6 (25–29) drawn, labelled, sent; owner verdicts come via ROOT-62. 0 redraws pending (none without owner yes).
TEMPLATES (owner L24 'Mẫu D và E ok, thay đổi qua lại'): every NEW two-bed (phối) bedroom alternates D = room 3 Lw8MjWZswO (image 3; TPL_D + BEDH4 + BEDW + BEDSHOW; 3w windows RIGHT; beds against the left/right side walls, doorway + dressing table centre) and E = room 5 u5WZqYHQLD (image 3; TPL_E + BEDH4E + BEDW; 3w windows LEFT; alcove beds in a back-wall partition, doorway centre). Used: 23 D, 25 E, 27 D, 29 E → NEXT two-bed = D. Every new room also gets TAGZONE (+ CAMELLIA in Vĩnh Hòa). All constants in prompts_pr13.py (block "PR17 batch 6").
LABELS (A27): every sheet gets the 2-line 64 px header ("Phòng NN — palace (mẫu D/E)" / "side hall · room type · occupants' ranks"); code = the python snippet in this report's batch-6 commit (header 170 px band on top of the ipad_tags sheet → <key>-lbl.jpg).
NEXT (order): Trường Xuân TÂY phối reception (pair ĐQ as room 29, CARD_TX; receptions alternate 24 3wR, 26 2wL, 28 3wR → 30 = 2w left, M2X) → Tần → Phi → Quý phi chính điện rooms of the 7 palaces (single-bed rooms: no L22 template; check rule.py find Tần / L1 before building) → Từ Ninh → TX Tần/Phi/QP → ~35 live place scenes. Pairs used (rooms 1–29): ĐĐ 4, ĐT 6, ĐQ 5, TQ 6, TT 4, QQ 4 → prefer TT/QQ/ĐĐ next for phối.
METHOD: as PR16 handover (add block before "# GATE" in prompts_pr13.py → python3 prompts_pr13.py → dump the prompt to a file → room_gate.py FILE → balance ≥ 60 000 → images_generate gpt-2-6 2k 2688×1386 folder ba4aecfe… refs gOmYI7iSXO, EbYJzsMuuO, image 3 → creations_wait → creations_register_download → curl → webp q88 img/_review/place-rank/pr13/<key>-ha-sang.webp → measure_floor.py → stage_exact/ipad_tags.py ROOM OUT FIGDIR (figs c06/c30 t1 a18 + m19/m39 from the CDN) → A27 -lbl → LOOK → cdn_sync.py → ledger (append-only; on rebase conflict drop marker lines, keep both) → report → commit, pull --rebase, push → send_message ROOT-62).
GIT NOTE: the local branch here is pr17-work (the remote was force-updated before PR17 started; reset was blocked) → push with `git push origin HEAD:claude/cung-tuong-mong-handover-hj0h8w`. A fresh session just uses the branch normally.
Credits ~92 100 at 01:31Z.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
(As a worker: at your roll line write the handover in your report and tell your coordinator; the coordinator opens your successor.)

## HANDOVER ADDENDUM (ROOT-62 01:17Z / 01:23Z) — PR18 JOB 1 FIRST, BEFORE any room: OWNER PASTEL MAGNIFIC TEST
Owner verbatim (~01:16Z, her yes): "867 vẽ ảnh thử qua magnififc với mã màu đã hạ cho những người này để so sánh cho chính xác". PR17 did NOT start it (0 gens).
Job: DRAW real test pictures in Magnific of the 16 thiếu nữ s46–s61 with the lowered PASTEL colour codes (keep hue, only softer: 'giữ tông màu… pastel hơn, không đổi sắc màu'), same face / pose / style as the originals. check_store.py + all gates before each gen (A19/A24). Cost 16 × 135 ≈ 2 160 cr → tell ROOT-62 the exact cost first, then go. One sample first if ROOT-62 wants (A1).
How (A17: change ONLY the colour words/hexes): original builders + prompts + settings per figure (all: gpt-2-6 1024x2304 2k, no transparentBackground, ref image eIyOFEidqL, then images_remove_background as before (B9)):
| s | prompt file | builder | seed | gen | cut |
|---|---|---|---|---|---|
| s46–s50 | dev/art/face-common/sNN.v5.FULL.txt | make_lanhlung_L761.py | 7172 | s46 w4aBpaU7EI · s47 hu24OP4vqL · s48 YMlKqk5WeC · s49 DoOsxgJpcl · s50 jUoVcelLD0 | cpS1KEv0eP · 1ldcY3kr4r · jUoV0AQLD0 · Tdwx1H7VNR · u5WRiP4QLD |
| s51–s55 | s51.v5b, s52.v5, s53.v5, s54.v5b, s55.v5 (.FULL.txt) | make_kieuky_L761.py | 7172 | p8ylzjyehw · 1ldchRar4r · tCRyW98mZJ · w4aB1Xp7EI · Xm9UADGBfo | YMlKiMSWeC · lJtpQC3gv9 · w4aBbFH7EI · tCRyDEwmZJ · WDgk4PIcXe |
| s56–s61 | sNN.v5.FULL.txt | make_quyenru_L761.py | 7172 (s60: 7173) | 3zKEOiVREY · kseWQNS16B · 9ZHvwpkNYZ · dt4S0zyXSL · lJtpxtNgv9 · gOme1k6SXO | rgX0qMZxtc · VX7jnlVMMU · yiutSarPW9 · JNC8lvIOq4 · lJtpjSYgv9 · SyhdxtJUb8 |
Colour codes: grep the robe hexes in each sNN prompt and map each through the robe_pastel.py FORMULA (flat-hex form: w = 1, g from the hex) — dev/art/place-rank/stage_exact/robe_pastel.py (docstring) + this report's FORMULA block. Measured before→after MAIN/SEC per figure are in the JOB 1 table above (cluster labels can swap, use the formula on the prompt's own hexes, not the cluster table). Skin/face/hair words untouched.
Output: per room the SAME 5 sheets as nf840 (same rooms/groups: thua-minh-cung-tay-phoi-ngu s46–49 · thua-minh-cung-tay-phoi s50–53 · canh-phuc-cung-dong-phoi-ngu s54–57 · canh-phuc-cung-dong-phoi s58–61 · canh-phuc-cung-tay-phoi-ngu s46 s51 s56 s61), THREE rows: GỐC | PASTEL số (digital, img/_review/place-rank/pr17/nf840/sNN-pastel.webp) | PASTEL VẼ (Magnific), A27 big labels (header per row + group · thiếu nữ sNN under each figure; code = the nf840 -lbl composer: nf_tags.py per row + 96 px header + 124 px label band). Originals cut-outs: Magnific creations above (creations_get → url). LOOK full size, push, send ROOT-62 paths + fault list.
THEN rooms: queue as in the HANDOVER above (room 30 Trường Xuân tây reception …).
