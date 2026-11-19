# NF3 report + HANDOVER (art worker; Foreman C ROOT-53 → ROOT-54)

depth 6 · START_CTX ≈3 % · rolled over at 34 % (rule: START+25 %, ceiling 60 %). The COORDINATOR (ROOT-54) opens the successor.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.

## Done (all pushed, all gens in dev/art/gen_ledger.jsonl)
- New face types (owner Lượt 629–657): builder dev/art/face-common/make_nf3.py (TYPES / TYPES_B / TYPES_C), texts TYPES_v4.md, prompts sNN.v4*.FULL.txt.
  USED: Kiêu kỳ (s01 v4b, cut lJtMINbgv9), Lạnh lùng (s02 v4, ksenWJ916B), Quyến rũ (s03 v4c, hu2ynp3vqL). NOT USED: Anh khí, Thư hương, Yêu kiều.
  LOOK_GROUPS.md: 3 new groups (0 members) + status; old Tươi tắn/Dịu dàng/Trong trẻo/Đoan trang UNDECIDED; Sắc sảo, Tinh nghịch kept.
- c05 redraw (c05.v3b, cut MBJxg6WDCm); c06 redraw with ivory skirt + upright pin (c06.v3c, cut jUo08nILD0). c04 HOLD.
- Sheets: dev/handover/review-sheets/new-faces-v4/ (nf3_4kieu, nf3_sua_640, nf3_s05_s06, nf3_s03_s04_sua, nf3_c05_c06, nf3_c06_nga, nf3_doantrang_faces, nf3_lanhlung_vs_doantrang).
- D14 cleanup was done and then REVERTED on owner order (Lượt 655; revert 32732cc47). Face texts stay as designed; the rule is only: never ADD makeup sentences.
- Credits: 1,932 (new types/c05/c06) + 270 (Sắc sảo test) = 2,202.

## LAST TASK (ROOT-54, owner on Thái hậu m05 v624 "Sắc sảo face looks baby") — DONE, waiting for verdict
- Audit + face block: dev/art/face-common/SAC_SAO_v1.md. Only m29 and m35 actually read as sắc sảo; m05, m11, m47 are baby; m17, m23, m41 are soft. m11's Expression is not even the sắc sảo line.
- Test: make_sacsao_test.py → v624s/m05_thaihau_a36_{A,B}.prompt.txt. Sheet: v624s/m05_sacsao_test.jpg.
  A = new face block + same refs (KLpSlnEkqp + TdwDfOyVNR), gen UPvesgNwny: only slightly sharper; the 16-year-old identity ref still pulls toward a round, young face.
  B = new face block, no identity ref, gen jUo0kjFLD0: clearly sharp and adult, but looks older and more photo-real, and loses her identity.
  Not cut out (tests only).
- Next if the owner wants sắc sảo: rewrite the face lines of m05/m11/m17/m23/m41/m47 with the block (keep identity marks), redraw their thiếu nữ refs (new B8 refs), then redo the Thái hậu. Needs an owner GO (A1: new design).
