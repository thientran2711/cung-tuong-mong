# B26FAB4 addendum — PALAUDIT fixes (owner Lượt 1419 in #8 chat), from Foreman C #9
Do AFTER items 1–7 of b26fab4-L1404.md. Source: dev/handover/reports/PALAUDIT1.md (a/c tables). 0 gens. A39: start from old text, change only the named words.
- a1: HOLD (owner L1422: replace hard-coded kingfisher-blue thread with a per-person PHOENIX PLUMAGE palette — wording comes from #9 after owner approval).
- a2: build_all.py secondary() FAMILY_CONTRAST swaps B20 light secondaries (30 people) → use the B20 secondary as written.
- a3: c06 old coral red/ivory (ORIG1/DATA rows) → B20 colours.
- c2: Nữ đế wine-crimson / black 2nd colour stays allowed, BUT every Nữ đế prompt MUST ALSO carry the person's own MAIN colour clearly.
- c3: --season dong must use the person's B20 ĐÔNG palette (not root colours); G26 'keep every prompt, only add fur' stays for everything else. Update the rule text (rule.py) for G26/B20 accordingly.
- c4: spring/autumn samples with winter colours = wrong; they only count as skins (no builder change; note it). c5: 'bright blush' / 'bright blush pink' both OK (no change).
Proof: count cells changed per item, keep_check --all PASS, check_store on 3 samples, bad-word grep 0. Report numbers in reports/B26FAB4.md and send_message to Foreman C #9 session_01D3E3NZXhAofYrqBeAVwLCF.
ROLLOVER: at START_CTX % + 25 % of the window (ceiling 60 %) write your handover in your report and tell #9; #9 cannot open successors (depth limit) — say so in the report.
