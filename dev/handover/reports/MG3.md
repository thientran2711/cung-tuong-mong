START_CTX ≈ 3 % of the 1M window (get_session reads 0 → own estimate), depth 2 (child of ROOT-58 session_01PEhRbuLwt3mGKRm2EJUf5s); roll line ≈ 28 %, ceiling 60 %.

# MG3 — builders/gate worker of Foreman C ROOT-58

## Job 1 — Lượt 781 redraw of the 13 near-3D pictures (ONE try each, no retries)
Prompts = MG2's files unchanged (`python3 dev/art/mg2_redraw.py` 13/13 PASS). Gate per file: `check_store.py <f> --scope nude|tp8 --age aNN`:
Nữ đế 10/10 PASS; Thái hậu a36 PASS; Thái hậu a51/a65 only `FAIL S33` = the documented build_all gate_th exemption (her 18/11 elder colour text) → PASS.
Thái hậu a36: NO C5 elder clause added (ROOT-58 correction, owner Lượt 818: elder wording only at 51 and 65) — sent exactly as MG2 made it.
Settings = the stored originals: gpt-2-6, 1024x2304, 2k, no seed, no transparentBackground, folder ba4aecfe, parchment then images_remove_background (B9).
Refs = same as the originals (identity/style ref + royal swatch TdwDfOyVNR); a51/a65 third ref (D15 "her 36-year-old picture") = her NEW a36 cut (the old a36 was the near-3D one).

| person | age | gen | cut |
|---|---|---|---|
| Nữ đế m05 | a18 a26 a36 a51 a65 | ov6JEqp829 6AbCY1PiJO eIPSv3EdqL vQANKBWa47 iG5E0Pr3uK | Xm9wCzQBfo 0eUx86WTfW lJte9QOgv9 jUoM4FdLD0 SyhX3kyUb8 |
| Nữ đế m29 | a18 a26 a36 a51 a65 | iG5EcdG3uK 1ld07i9r4r 6AbCWXQiJO DoOlvTFpcl rgXTOkExtc | 79f8RktJAL xSBVOu9jfW 4RFvzx59Aa iG5ET7b3uK Xm9wu0qBfo |
| Thái hậu m05 | a36 a65 | 0eUx8gNTfW 3zKuVskREY | rgXTysqxtc BhN7FtEoQR |

FAILED (not drawn): **Thái hậu a51** — Magnific refused the call: prompt 10 229 characters > the 10 000 limit (file m05_thaihau_a51.L781.prompt.txt). No credits spent, not retried, prompt not edited (A17). Needs a decision: which sentence to drop (e.g. the a51 elder bridge has two colour sentences) — owner / ROOT-58.
Credits: 12 gens × 135 + 12 cuts × 3 = 1 656.
Looked at every result (sheets + face crops): all soft painted, not 3D; mouths closed, no teeth, eyes open, bare forehead under the bead fringe. Note: Nữ đế m05 a65 has rather detailed eye/forehead wrinkles (style lock says "no detailed wrinkles") — note only, no redraw.
Sheets (OLD row top, NEW bottom) on the CDN, not in git: https://ctm-img.victoria-tntt.workers.dev/img/_review/mg3-l781/sheet_m05_nude.jpg · …/sheet_m29_nude.jpg · …/sheet_m05_thaihau.jpg; NEW cuts as …/<person>_<state>_<age>-NEW-<cut>.webp. Tool: dev/art/mg3_sheet_oldnew.py. Ledger: 13 lines kind REDRAW-L781 (owner_ok "Lượt 781"; the a51 line has gen_id null).
Gate gap found: check_store does not check prompt length; gen tool hard limit = 10 000 chars → added as a check in job 2.

## Job 2 — L784 items 6–8 (gates; all proofs: `mg2_l784_proof.py` 0 misbehaved, `mg3_proof.py` 0 misbehaved, `mg1_gate_proof.py` 0, `check_store --self` 38 sentences / 20 banned / 0 problems)
| rule | check id | where | scope | proof |
|---|---|---|---|---|
| 6 B20 root hex | B20 ROOT HEX + B20 DEEP COLOUR | check_store.root_hex_fails / DEEP_COLOUR_RX; pid from face_gate.final(v, key) or `--pid sNN` | face | mg2_l784_proof row 6: GOOD s46 PASS; old #5D5894, extra #123456, 'deep blue-violet' → FAIL |
| (new) gen-tool limit | LEN | check_text: > 10 000 chars | every scope | mg2_l784_proof row LEN |
| 7 B24 rank hex | B24 RANK HEX / DEAD HEX | check_store.b24_fails | trieuN | mg3_proof rows 7 |
| 8 Lượt 777 guard | LEDGER GUARD | dev/art/ledger_guard.py (+ nude-B/log.py, NEW_CHARACTER_TEMPLATE §3b) | every gen | manual: m05 a36 nude FAIL / with --owner-ok PASS / new person PASS |
Root pairs: s-ids from face-common/s_root_colours.json, others from palettes_season.json (season with root:true). Existing face files: 102 of 192 *.FULL.txt now FAIL (old v3/v5 faces with no or pre-B20 hex; s40–s45.v5 carry old hexes) → a re-make of those faces must first take her root pair.
B24 findings (no edits by me): build.py TRIEU table still has dead codes: t4 #5FA8A6, t6 #4F86A8 (kingfisher), t7 #E3A25B (= t6 colour after the 728 swap; B24 t7 = #D46A64), t8 #C65A4C trim → `--trieu 4/6/7` FAIL B24 until the builder takes B24 hexes (owner allows it: "COLOUR CHANGES = PROMPT ONLY, apply in builders"). Game UI `RCOL` (dev/build/all43.js) is still the old j1 palette (B24 says dead) → UI worker.
Ledger audit (`ledger_guard.py --audit --since 2026-11-19T00:00:00Z`): 18 redraw lines without owner_ok (NDX m05 rounds 21:14–21:52Z) — info only (before the guard existed).
**LEN finding:** `build_all.py --check --age a51` now = 236 FAIL LEN (store a51 prompts 10 002–11 154 chars; a18 = 0 FAIL). They would be refused by Magnific exactly like Thái hậu a51. Needs a decision (shorten what? owner) before any a51/a65 mass.

## Job 3 — L800 F14 (no Qing headdress words)
check_store banned entry id F14, scope any, even negated (regex: liangbatou, qitou, two-wing board, flat/black-board headdress, flag-style/banner headdress, Qing, Manchu). mg3_proof F14 rows PASS.
Already-drawn pictures whose prompt had the words (list only, no redraw):
- SEAL group seals, WHO sentence "of the Qing-style inner palace": grp_gian_prompts.py bg / bt / mm / cn / nt / nl (A, B, out, loop, back), grp_set_prompts.py mm (vui, buồn, sợ, ăn, bình, ghen, lo, mưu, tự tin, hăng hái: A+B — WHO imported from grp_gian), sg4_prompts.py ht / htg / tg / tv. ≈ 68 ledger gens 23:35Z–00:15Z (kinds SEAL-GROUP-*). Sent to ROOT-58 at once.
- Negated mentions (no Qing look asked, but the words now FAIL): emperor-B/golden pB_e1–e4 (+_ref2) "NO Qing feathered hat", emperor-B/build.py, t8-prompt-B/build_npc.py "not a Qing hat" / "no Qing hats or collars" → those builders must drop the words before their next gen.
- No figure prompt in the ledger (prompt_file) had the words.

## Job 4 — L806 angle audit (E1)
`python3 dev/art/store-all/angle_audit.py` (reads build_all.plan(age), the angles the store really writes) — full tables: dev/handover/reports/MG3_angle_audit.md. Every age: 87 people × 8 ranks; ALL 14 angles used (44–56 uses each at a18); 8 distinct angles per person; per rank 3–9 people per angle (ideal 6.2); left 256 / right 261 / frontal 179 at a18 (other ages the same ±5) → G1–G4 PASS. Gate added: check_store E1 = an "ANGLE: …;" sentence must be one of the 14 (or the triều _TA_* words); on-disk old prompts carry 16× the dead "walking STRAIGHT TOWARD the viewer" and others (all in reports/ archives, not in builders). Drawn-prompt corpus on disk: index 12 never drawn yet, 8 only 5× (just which pictures were drawn so far, the plan is even).

## HANDOVER (MG3 → successor) — context ≈ 27 % (START 3 % + 25 % reached)
Rollover lines (copy verbatim):
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
Coordinator now = ROOT-59 session_01PEhRbxKh3jLw4atknQREnq. NO gens.
TODO for MG4:
1. **SEAL GATE** (owner, via ROOT-58, verbatim: "Bây giờ làm một cái cổng riêng cho cái ấn đi. Không có làm cái cổng chung với nhân vật, nó không nó bị confused."): a SEPARATE file (e.g. dev/art/emo-anim/seal_gate.py), seal rules only: F14 words (copy the regex from check_store BANNED id F14), ≤ 10 000 chars, seal-specific checks for keyframe A/B AND video-clip (out/loop/back) prompts; wire it into EVERY seal builder/script (emo-anim/groups/*_prompts.py, kf.py, th_prompts.py, grp_set_prompts.py, sg2/sg4, emo-anim prompts) so FAIL = no gen. check_store stays the figure gate (do not add seal rules to it). Seal rules to collect: `python3 dev/art/rule.py find ấn` / `find seal`, dev/art/emo-anim/prompts.md, groups/th-gian.md. First FAIL target: the "Qing-style inner palace" WHO sentences (job 3 list).
2. Decisions to relay (owner/ROOT): Thái hậu a51 prompt 10 229 chars (which sentence to cut); 236 store a51 prompts > 10 000; build.py TRIEU B24 hexes (t4/t6/t7/t8); game RCOL (UI).
Tools: dev/art/mg3_sheet_oldnew.py (OLD|NEW sheet), ledger_guard.py, store-all/angle_audit.py, mg3_proof.py.
