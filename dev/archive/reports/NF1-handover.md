# NF1 handover (worker rollover by context) — 2026-11-19 ~19:45Z

depth 3 · START_CTX ≈3 % · now 38 % of the 1M window (over START_CTX+25 %) → worker rule: handover here, COORDINATOR (Foreman C ROOT-52, session_01PEhRbwJ53CiD7ZimiAMPdm) opens the successor.

## Open job (owner GO, Lượt 607, relayed by ROOT-52)
Draw the new faces c07–c32 (26 thiếu nữ gens). NOT started — 0 gens of this job made.
- Prompt = file text VERBATIM: dev/art/face-common/cNN.v3.FULL.txt (COMMON_v3 + own line; princess tone PTONE + princess fabric sentence; built by make_c_v3.py — never type by hand, re-run `python3 dev/art/face-common/make_c_v3.py` only if lines must change).
- Settings EXACTLY as c01–c06: Magnific images_generate mode `gpt-2-6`, width 1024 height 2304, resolution `2k`, seed 7172, references [{"type":"image","identifier":"eIyOFEidqL"}] (M09, the ONLY ref), NO transparentBackground → images_remove_background on the gen → cut id.
- Gate first (owner/ROOT-52 wording "gate first"): check ART_RULES (A16/A19 check_store if it covers thiếu nữ lines; the c01–c06 sample ran without a store gate because thiếu nữ lines are COMMON_v3 + own line).
- Ledger: append one line per gen to dev/art/gen_ledger.jsonl. Helper used for c01–c06 (copy it): fields ts, kind "SAMPLE"/"OWNER-GO", credits 138, who, note "... thiếu nữ COMMON_v3 NEW consort; remove_bg <cut>", refs [M09], gen_id, cut_id, prompt_file, settings "gpt-2-6 1024x2304 2k seed 7172, no transparentBackground". Ledger is append-only: on merge conflicts keep both sides.
- Look at EVERY result (creations_read) full size: eyes open, mouth closed/no teeth, clean forehead, one held item, black hair loose/half-up, no round neckline, NO GREY anywhere (B19), colours = the line's main/secondary. Redo only real faults (A9: max 6 fails).
- Then one contact sheet c01–c32 (c01–c06 cuts for comparison: WDgq62mcXe, KLpAf5Hkqp, EbY9IHJuuO, xSBYH1yjfW, cpSb2GQ0eP, 1ldzqzMr4r) at dev/handover/review-sheets/new-faces-c/ (e.g. ncv3_all.jpg), labels id + look; push; send path + credits to ROOT-52.
- Credits ~138 per person → ~3.6k for 26.

## Done so far (all pushed, branch claude/cung-tuong-mong-handover-hj0h8w; local work branch nf1-work pushes to it)
- 32 new lines c01–c32 + INDEX_c_v3.md; sample c01–c06 drawn (sheet new-faces-c/ncv3_sample.jpg), kept by owner.
- c07–c32 colours: B18 → Lượt 586 light → Lượt 590 tone → B19 no grey → Lượt 592 princess tone (current, PTONE). Item colours adjusted for B16.
- c_rank_colours.json (rank colours c01–c32; c01–c06 rank data only).
- m01–m52 colours FINAL (owner Lượt 603): m_colours_proposed.json (+ make_m_colours_proposed.py); BW4 wires MAID_ROWS.

## Open owner notes (not decided)
- c07–c32 lines carry the princess gauze sentence while COMMON_v3 says "real cloth … no sheer floating scarf" — watch the gens.
- c02 drawn sample has a silvery-grey skirt/bow (B19) — owner's call whether to redraw.

## Takeover prompt must copy verbatim
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
