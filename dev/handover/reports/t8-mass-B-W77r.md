# t8-mass-B W77r — rollover handover (18/11)
Foreman C = session_011xDdVS7JY8KJW8hzKtoquL (mcp__claude-code-remote__send_message). Method/rules = W77q handover + this. Tools in t8-mass-B-W77r-tools/ (push.sh fixed: out in $S/w/out, S = scratchpad, $S/root = sparse worktree of origin/main with dev/site + img/_review/t8-reprompt; dl.py/fin.py run from $S/w). Prompts from build.py (handover branch claude/cung-tuong-mong-handover-hj0h8w, dev/art/t8-prompt-B) `--age aXX`, t7 via `--t7`.
## Done (READY sent)
c10 a18, a26, a36 (W77n/W77q); c10 a51 (W77r, 6 gens, no regens needed).
## Not done
c11 a18, a26, a36, a51 (6 gens each). c11 t1 refs: a18 O6EPIo9ynm, a26 rgXj0T9xtc, a36 CqnuiZYEEy, a51 4RFNhjw9Aa; m09 style eIyOFEidqL; folder ba4aecfe-efce-47e2-b53f-30d292091886.
## Tips
- Typing the ~5k-char prompt per gen is the context cost (~35k tokens per age). Print v0 once per age/kind, for v1/v2 only grep "robe of ...," and "COLOUR RULE.*"; t7 outfit text sits between "Outfit (rank-7" and "COLOUR RULE".
- images_generate: mode gpt-2-6, 1024x2304, 2k, count 1, refs [own t1, m09]. wait -> remove_background x3 (folderReference) -> wait -> fin.py (black-fill check + sheet) -> push.sh -> READY.
