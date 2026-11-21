# START — art worker (Cung Tường Mộng) — read ONLY this + your brief first (≤ 10 KB, CLEAN1 Lượt 810)
Repo thientran2711/cung-tuong-mong, branch claude/cung-tuong-mong-handover-hj0h8w. `git pull --rebase` before every push; retry on reject; never force-push.

**READ FIRST: dev/art/DESIGN_BIBLE.md** (owner L2276 — index of all shared rules, common blocks, per-person data, approved core, unapproved new direction, lessons).

## 0. Do not read big files whole
Every start read costs the owner credits. Use `wc -c` first, then `head`, `grep -n`, `sed -n A,Bp`. Never cat/Read ART_RULES.md, FIGURE_GATE.md, FOREMAN_C_STATUS.md, OWNER_DECISIONS.md, gen_ledger.jsonl or any report dir whole.

## 1. Rules: ask the rule book, not the owner
- `python3 dev/art/rule.py find <words…>` — VN or EN, accents optional (e.g. `find tay áo`, `find góc đứng`, `find gate`). Do this for every topic in your brief before you build a prompt.
- Rule IDs you will meet most: A18 (LAW #0: change a prompt only for what the OWNER raised), A17 (diff vs last approved prompt), A19 (store gate), A20/A21 (ask before any redraw), A22 (self-measure), B9 B12 B20 G5 L14 L21 D17 F14 E1.
- You do not change rules; if the owner gives a new rule, tell your foreman (`rule.py set/add` is the foreman's).

## 2. Before EVERY gen
1. Build the prompt from the store / builder named in your brief; change ONLY what the owner asked (A17) and list the diff in your report.
2. Run the gate: `python3 dev/art/check_store.py <prompt> <args>` (A19). FAIL = no gen.
   **A38 KEEP CHECK (owner Lượt 1274): every prompt you make by EDITING another prompt needs a sidecar `<prompt>.keep` (`base: <file>` + one `allow: <phrase>  # owner Lượt …` per phrase the owner asked to change) and must PASS `python3 dev/art/keep_check.py --sidecar <prompt>`. Never cut outfit/embroidery/jewellery/hair words to fit 10 000 — trim only boilerplate, and list it as allow lines.**
   **G72 BATCH GATE (owner L2039): before ANY run with 2+ persons, `python3 dev/art/check_store.py --batch <all prompt files of the run>` must PASS (each person her OWN item/angle/face; no shared ANGLE/Pose across persons). Never copy one person's prompt to another.**
3. One sample first, owner verdict before more (A1/A2); mass runs one person at a time.

## 3. No redraw without the owner's yes
NO redraw / regen / retry / fix gen of ANY picture — even a 1-gen small fix — without the owner's explicit yes (A20/A21, Lượt 777: ~500–600k credits were burned). Faults you notice = a note / RECOMMENDED-REDRAW list via your foreman (L21), never a silent gen. Only "duyệt" approves (A7).

## 4. Look at every picture before sending
Open every result full size yourself (face, eyes, teeth, hands, sleeves, colours, background) before it goes anywhere (A11, A22). Send finished pictures right away (A6) to your foreman / the chat as your brief says, with SendUserFile (display render), never links; every caption starts "Lượt N" (A5). Keep image reads few — each costs a lot.

## 5. Report file
Write dev/handover/reports/<YOUR-ID>.md (short): what you did, gens used + ids, gate results, prompt diffs, open questions, commit hash. Push it, then send_message your foreman with a 3–6 line summary + hash. Your handover (when you roll over) goes in this same file.

## 6. Rollover + lineage (copied verbatim from TAKEOVER_FOREMAN_C_ROOT58.md)
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
As a worker: you do NOT open your own successor — write the handover in your report file and tell your coordinator; the COORDINATOR opens it.

## 7. Where things are
Rules dev/art/ART_RULES.md (+ _HISTORY, _CONFLICTS) · owner verbatim + history dev/art/FIGURE_GATE.md (grep) · gate dev/art/check_store.py · gen ledger dev/art/gen_ledger.jsonl (grep) · approved sentences dev/art/APPROVED_SENTENCES.md · new character recipe dev/art/NEW_CHARACTER_TEMPLATE.md · old worker reports dev/archive/reports/.
