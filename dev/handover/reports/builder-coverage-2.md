# builder-coverage-2 — W107b (successor of W107, Foreman C ROOT-36), FIGURE_GATE rule 0(g)

PRIORITY #1 CHECK: OD rule 0(a–g) + rule 6 (FIGURE_GATE) | handover branch: build.py / emperor-B / coverage.py (W107), no NPC/men/kids builder | main: old prompt sources only (dev/figwork/spec.py, spec3.py, jobs.json, congtu/, menpool2/, artcomplete/ct_spec.py, kids/kspec.py) | review/* none checked beyond names | claims: N5c session_01PEhRbuZQUopcF5bN8FixL2 (build.py K3/--log/--verify/ty/cold/tm/m01–m52) — build.py NOT touched by W107b.

## Done
- **71211f9** `dev/art/t8-prompt-B/build_npc.py` — NEW rule-0 builder (separate file; build.py and emperor-B untouched → their outputs byte-identical).
  - Imports PRE / END / AGE_TXT / IDENT from build.py, men AGE_TXT from emperor-B; men identity sentence = emperor-B sentence (asserted present); K3 line = build.py build_trieu sentence (asserted present), her→him for men/boys.
  - Every identity/outfit/pose/prop word copied from an old source, cited in the code per table:
    NPC Thái hậu h1–h3 = dev/figwork/spec.py:52-55 · eunuchs u01–u30 (base robe) = dev/figwork/spec3.py:32-39 · officials o1–o6 = dev/figwork/jobs.json S-official-1/2/3 · physicians p1–p2 = jobs.json S-physician-1 · thị vệ 1–2, thái y 1, vương gia 1–2, nhạc sư 1, họa sư 1, sứ thần 1–2 = jobs.json S-men-1..5 (r# → live id in spec.py:83-90 RM order — my mapping, please confirm) · quý tử 1–9 + Bắc Địch prince = origin/main dev/figwork/menpool2/spec.py:13-25 · công tử 1–10 = origin/main congtu/spec.py:7-18 (a18/a26) + artcomplete/ct_spec.py:5-11 (a36/a51) · children kid-p/f 01–24 a4/a9/a14/a20 = origin/main kids/kspec.py:9-73 (same rotation + OVR).
  - Children a4/a9/a14 use build.py PRE with its two adult clauses ("clearly adult", "romantic-lead looks") replaced by kspec.py:6 "beautiful, sweet, handsome looks at every age" (adult PRE on a 4-year-old would be wrong) — ROOT-36 please confirm.
  - `--refs` (A0 list: style3_girls Xm9tPkMBfo + own live figure FACE ONLY), `--log F` (appends {gen_id, cmd, prompt, refs}), `--verify F` (re-runs every build_npc cmd, FAIL on 1-char diff), `--list`. Exit 3 = HELD / NO SOURCE (cannot be painted, rule 0(e)). To be swapped for N5c's shared --log/--verify once it lands (asked N5c for the API; no reply yet).
- coverage.py: new section for every build_npc group (in-process); NOBUILDER now only the legacy player looks. BUILDER_COVERAGE.md regenerated: 540 red cells (the NPC groups now RUN, so their red shows the real gaps instead of one NOCMD).

## RED left (my scope)
1. HELD for the owner (not filled): men a65 age text (all adult men + Emperor); men pose table + men item table (POSE/ITEM red on every men/NPC/kid cell); foreign princesses per-person faces + rank states.
2. HELD conflict (rule: men never pink/purple, old prompt says purple): official-o4 ("a purple official robe"), man-vuonggia-2 ("a deep purple brocade robe … four-clawed python"). Builder refuses them (exit 3) — owner/ROOT-36 pick the colour.
3. NO SOURCE (no old prompt found on main/handover; never invented): eunuch ranks r0–r3 (u01–u30 × 4 = 360 live figures), physician-p3, man-thive-3/4, man-huynh-1/2 (huynh_jobs.json has no prompt text), tm96 lover, steward-tgk1, tutor-ttp1, Phế phi Lý fallen-ly1, kids a26/a36/a51. If a review/* branch holds those gens' prompts, give me the branch and I copy them.
4. Mama k01–k08: not here — owner (FIGURE_GATE WHO): mama = older cung nữ → N5c's tm3/tm4 a36+ mode.
5. NPC Thái hậu h1–h3: pose "hands folded at her waist" for all ages (no spec5 for NPCs) → POSE/POSE=/ITEM red.
6. Emperor-B: K3 line her→him NOT yet applied — waiting for N5c's answer whether they still edit emperor-B (asked 1st thing; no reply).

## HANDOVER (W107b rollover, context ceiling)
- Next: (a) N5c reply → if N5c does not edit emperor-B, add `K3` (build_npc.K3["m"] text) to emperor-B build() before `return s+END`, guard: every other emperor output byte-identical except the added sentence; regen coverage. (b) When N5c lands --log/--verify in build.py, replace build_npc's own `--log/--verify` with an import of theirs (same ledger dev/art/gen_ledger.jsonl). (c) Fill HELD/NOSRC cells only from owner answers (ROOT-36 forwards) or a found old source.
- Method: worktree /home/user/wt/w107b (branch w107b-local → push HEAD:claude/cung-tuong-mong-handover-hj0h8w, fetch under flock); `python3 dev/art/t8-prompt-B/build_npc.py --list`; `python3 dev/art/coverage.py` (~1.7 min) after each block.
