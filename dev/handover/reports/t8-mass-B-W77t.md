# t8-mass-B W77t — rollover handover (18/11)
Foreman C = session_011xDdVS7JY8KJW8hzKtoquL, send via mcp__claude-code-remote__send_message (session_id=...; SendMessage tool does NOT reach it). Rules/method = W77r handover (t8-mass-B-W77r.md) + this.
## Done (READY sent)
c11 a18, c11 a26 (6 gens each, no regens; uploaded img/_review/t8-reprompt/c11_aXX_*). 
## Not done
c11 a36, c11 a51 (6 gens each: t8 + t7 × v0/v1/v2).
Refs: a36 own t1 CqnuiZYEEy; a51 = live img/hd/fig-consort-c11-t1-a51.webp as PNG (handover W77r lists 4RFNhjw9Aa; task text says use live webp -> compare/upload via creations_upload_image of CDN URL https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-c11-t1-a51.webp); m09 style eIyOFEidqL; folder ba4aecfe-efce-47e2-b53f-30d292091886.
## Method that worked (cheap)
- Prompts: `python3 build.py c11 v0|v1|v2 --age a36 [--t7]` (build.py from handover branch dev/art/t8-prompt-B). ONLY difference between ages = the "about NN ..." age phrase (+ a36 "never a girl's face", a51 silver strands + "still graceful and lovely"); print one prompt per age, type it for each gen. v1/v2 differ from v0 only in the outfit "robe of X silk" + COLOUR RULE: diff with `diff <(tr '.;' '\n\n' <a) <(tr '.;' '\n\n' <b)`.
- images_generate gpt-2-6, width 1024 height 2304, resolution 2k, count 1, refs [own t1, m09]. 4 in flight; then remove_background (folderReference) → fin.py cNN aXX t8v0=url ... (black-fill check + sheet) → look at sheet → push.sh cNN aXX → READY.
- push.sh: S must be your scratchpad; needs $S/root = git worktree of origin/main (has dev/site/cdn_sync.py). Tools in t8-mass-B-W77t-tools/ (S path fixed by sed).
- Colours per variant (same at every age): t8 v0 own pink-grey+yellow, v1 yellow main+lilac accent, v2 yellow+leaf green; t7 v0 pink-grey main, v1 leaf green, v2 sky blue (yellow larger parts on all).
