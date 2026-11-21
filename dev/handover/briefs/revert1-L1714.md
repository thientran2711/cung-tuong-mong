# REVERT1 — owner L1714 per-row decisions on the 24 STEP0 changes (Opus, prompt writing, 0 gens). Report: dev/handover/reports/REVERT1.md
Read dev/art/START_ART_WORKER.md first, then dev/handover/reports/STEP0.md (the 24 rows, files, gen ids) and the sheets dev/handover/review-sheets/step0_L1706/. Do not read big files whole.
BASE = the OLD prompts the 20/11 sets were drawn from (STEP0.md says which: s62 Set A t4 SyhIap2Ub8 · t5 xSBe8KVjfW · t6 1ldDonjr4r · t7 nVsxSZNYQD · t8 KLpVBAXkqp, same sentences as m19/m29/s65). Owner L1714: "mọi thứ đều quay về cái prompt trước" — what the old prompt says stays, what it does not say is not added; EXCEPT the KEEP rows below.
OWNER L1714 DECISIONS (row numbers = STEP0 sheet):
1 fabric Tần+Phi → REVERT (old 'thin, light, flowing silk and gauze' sentence).
2 fabric Quý phi → REVERT.
3 collar → TEST FIRST (see below).
4 outer robe held in at waist → REVERT: say about the outer robe exactly what the old prompt said (if it said nothing, say nothing).
5 ladder embroidery → REVERT (old prompt; "cái prompt cũ đang rất là đẹp rồi").
6 KEEP (body embroidery flowers never over borders/vạt/sleeve/hem bands).
7+8+9 SIGNATURE PIECES (owner verbatim: "đưa cái cổ ... bên trái hình trước của câu số 7 ... qua cho bên Quý Phi ... cái áo choàng của hình số 8 hình trước là đưa qua cho Phi. Đó, vậy thôi."): Quý phi t6 gets the OLD Phi collar = the cloud collar/vân kiên in row-7 TRƯỚC picture xSBe8KVjfW, worded as in the OLD Phi prompt; Phi t5 gets the OLD Quý phi cape = the cape/shawl in row-8 TRƯỚC picture 1ldDonjr4r, worded as in the OLD Quý phi prompt. Drop G46 'Phi = Tần capelet + shoulder layer' (row 9).
10 KEEP Phi short pearl strand across the chest (G49).
11 Tần capelet → REVERT to the OLD capelet words.
12 KEEP no necklaces (A41).
13 KEEP: phoenix feathers in the person's own colours (no peacock blue); otherwise old prompt (HQP just has its phoenix).
14 HQP collar → REVERT to old.
15 KEEP: Hoàng hậu has NO floor-length mantle in daily wear ("nhìn nó cồng kềnh lắm"). BUT the TRIỀU PHỤC (court dress) of the Hoàng hậu KEEPS its cloak — do not touch triều phục files.
16 Hoàng hậu → REVERT: YELLOW is the dominant colour again (as old).
17 Hoàng hậu → REVERT to old (phoenix/vân kiên/shape as old).
18 sash → REVERT to the old sash words; KEEP ONLY one thing: the jade pendant (ngọc bội) is never covered.
19 KEEP no earrings, nothing hanging at the ears.
20 hair flowers + embroidered flowers → follow the NEWEST per-tier flower table (find it: rule.py find hoa bậc / F2 latest).
21 colours → the NEW season palette (PAL4 is building palettes_season_L1709.json; until the owner approves it, keep today's s62 thu colours olive #9FB577 + lilac; leave a one-line COLOUR slot easy to swap).
22 KEEP only shoe tips under the hem.
23 KEEP the new angles/poses/held items (no vase ever).
24 free: cut repeated sentences to fit ≤ 10 000 chars as long as the meaning of the old prompt stays the same.
ORDER OF WORK:
A) FIRST (owner is waiting, angry it was not done): TẦN t4 COLLAR TEST prompt = the reverted Tần t4 (all rows above applied) + the SQUARE collar of the Quý nhân t3 pictures of m19/m29 (take those prompts' collar words: dev/art/rank8-m19/m19_t3.txt, rank8-old4/m29_t3.txt), combined like today's layered look (inner robe square collar + the capelet/outer piece open at the front, never hiding the collar) — purpose: see if the outfit turns thick/bulky. File dev/art/thu_comoi/s62_t4_THU_revert_sqtest_L1714.txt + .keep; keep_check + check_store; commit by path; send_message Foreman C IMMEDIATELY with the path (Foreman draws it, 55 cr).
B) Then t5–t8 reverted files (s62_t{5..8}_THU_revert_L1714.txt + .keep), and t4 without the square collar (old crossed collar) as the fallback. Per file: list of diff sentences vs the old prompt with the row number that justifies each. No drawing.
Repo rules: branch claude/cung-tuong-mong-handover-hj0h8w; fetch --depth=50 under flock /home/user/wt/fetch.lock; pull --rebase before push; stage BY PATH ONLY (never add -A / commit -a; glue watch: palettes_season_L1583.json, four_season_L1583.py, thu_comoi t4/t5 COMOIk/j, room_vivid.py). A38: every edited prompt has <file>.keep; python3 dev/art/keep_check.py --all. Report to Foreman C ROOT#19 session_01D3E3NZ15RAVg7oTWDzSyYe by send_message. Files in English.

ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
NO HOURLY SCHEDULED TASKS (owner 20/11): never create one.
