# t8-mass-B W77q — rollover handover (18/11 ~20:00Z)
Foreman C = session_011xDdVS7JY8KJW8hzKtoquL (reach with mcp__claude-code-remote__send_message, NOT SendMessage). Rules/method = W77n handover (t8-mass-B-W77n.md) + this one. Tools in t8-mass-B-W77q-tools/ (push.sh S path = scratchpad, needs $S/root = sparse worktree of origin/main with dev/site + img/_review/t8-reprompt; edit paths).
## Done (READY sent)
- c10 a18, a26 (W77n); c10 a36 (W77q): 6 gens + 1 regen (t8 v1: remove_background gave black hem, deterministic -> regen the gen, not the cut).
## Not done
c10 a51; c11 a18, a26, a36, a51.
## Refs (all uploaded, folder ba4aecfe...)
c10: a36 9ZH6ZybNYZ, a51 kserskU16B. c11 t1: a18 O6EPIo9ynm, a26 rgXj0T9xtc, a36 CqnuiZYEEy, a51 4RFNhjw9Aa (PNG from live webp). m09 style eIyOFEidqL. Refs per gen = [image own t1, style m09] only.
## Method that works
- Prompts: `python3 build.py cNN v0|v1|v2 --age aXX` (t8) and `... --t7 --age aXX` (t7); build.py from handover branch tip d2714ff. Prompts must be typed verbatim into images_generate (mode gpt-2-6, width 1024 height 2304, resolution 2k, count 1); print v0 once, for v1/v2 grep "robe of ...," and "COLOUR RULE.*" (t8: v1 drops "mixed with soft peach" + changes COLOUR RULE; t7: v1/v2 swap robe colour word + COLOUR RULE).
- 3 gens -> creations_wait -> tools/dl.py (raw sheet, look) -> images_remove_background (creationIdentifier, folderReference) x3 -> fin.py (black-fill check + sheet) -> push.sh -> send_message READY.
- Reviewed c10 a36: yellow dominant on t8, larger yellow on t7, closed lips, soft sleeves, face reads ~40.
