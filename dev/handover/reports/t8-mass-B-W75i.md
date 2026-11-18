# t8-mass-B W75i — report + HANDOVER (rolled over at start+25%)
Task: redo c28 a36/a51 (new age text), then c29 a36/a51, c30 a18/a26/a36/a51. t7+t8 x v0/v1/v2, Magnific gpt-2-6 2k, folder ba4aecfe-efce-47e2-b53f-30d292091886.
## DONE (all gens=6 each, READY sent to Foreman C, sheets on CDN img/_review/t8-reprompt/cNN_aXX_sheet.jpg, files cNN_aXX_t{7,8}_v{0,1,2}.png)
c28 a36, c28 a51 (OVERWRITTEN with new age text), c29 a36, c29 a51.
## TODO: c30 a18, a26, a36, a51 (t1 refs NOT uploaded yet: upload live fig-consort-c30-t1-aXX.webp; a18 = _review/consort-tiers/c30/b10/c30_a18_t1_v0.png)
Existing uploads (folder ba4aecfe): c28 a36=1ldxW2Vr4r, c28 a51=rgXjcz0xtc, c29 a36=p8ydHzoehw, c29 a51=0eUVC25TfW. Style ref {style,eIyOFEidqL}.
## Method notes
- Prompt = `python3 build.py cNN vK [--t7] --age aXX` from handover branch (tip>=252c25f5) — verified: across ages only the age sentence differs; I pasted it unchanged.
- Magnific: images_generate width 1024 height 2304 resolution 2k count 1 mode gpt-2-6; 3 in flight; images_remove_background each; creations_wait.
- Look: tools/w75c/rawsheet.py (one contact sheet) ; finish: tools/w75c/fin2.py (edit S path + needs $S/cdnroot/dev/site/{cdn_sync.py,manifest_guard.py,manifest-floor.json} from origin/main). Send READY with mcp__claude-code-remote__send_message to session_011xDdVS7JY8KJW8hzKtoquL.
- Observed: a36/a51 faces now read clearly older (fuller, fine lines, few grey strands); a51 reads ~48-52 — fine. Yellow dominant on t8, larger yellow parts on t7.
## LATE NOTE (Foreman C, owner 21:35Z)
build.py AGE_TXT a36/a51 changed again on handover branch (c6bc9510): a36 must look YOUNG for her age, a51 visibly older but aging beautifully. Pull before any a36/a51 gen (c30). Already-made sheets (c28/c29 a36/a51 above) stay as they are.
