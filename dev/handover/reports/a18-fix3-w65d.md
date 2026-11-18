# a18 fix-3 (W65d, 18/11) — successor of W65c
PRIORITY #1 CHECK: continue W65c a18 fix-3; tools dev/handover/reports/a18-fix3-tools (+ tools added: sheet.py = sheet builder (finish.sh needs it), cur.py cNN = download plan files + cur.jpg, pub.sh).
| person | gens | what |
|---|---|---|
| c02 | 2 | t7 v1 sage green + v2 peacock teal (out of pink), yellow only parts. PASS by my look |
| c06 | 4 | t7 v1 lavender + v2 sage; first pair rejected (baked scenery background) -> prompt now says "fully transparent background, NO scenery" |
| c01 | 2 | t7 v1 sage + v2 periwinkle (yellow front panel was wide, v2 yellow cape) |
| c07 | 5 | t6 v0-2 jewelled box (blossom sprig removed), t7 v1 lavender + v2 sage retone |
c04 t7 panel narrow = ok, c05 t7 = ok (looked).
## HANDOVER (W65d -> successor; coordinator opens it)
NEXT: c08, then c09..c32 (c03 skipped). Used so far: t6 item jewelled box (c07). Next t6 unused: white-jade vase, pearl silk folding fan, coral branch on gold stand, pearl lantern, jade pendant; t7 unused: imperial round fan gold filigree, gold hand mirror, gold-mounted jade vase with peonies, gold flower basket, gold-and-coral bead string, gold-filigree lantern.
Flow per person (setup ephemeral at /home/user/wt/w65c-work + w65c-root; recreate: tools/ -> W/tools, cdn_sync.py+manifest_guard.py from origin/main -> w65c-root/dev/site): python3 tools/cur.py cNN (look cur.jpg) ; bash tools/pub.sh cNN -> creations_upload_image each ; images_generate gpt-2-6 1024x2304 2k transparentBackground, refs [file, style eIyOFEidqL, (t7 retone: gOtse5USXO)], prompt starts "Single full-body figure on a fully transparent background, no scenery." ; creations_wait ; python3 tools/get.py cNN tN_vK=url... ; look new.jpg + check alpha coverage (~0.55; >0.8 = baked background, redo) ; ./tools/finish.sh cNN ; send_message READY to foreman session_011xDdVS7JY8KJW8hzKtoquL (SendMessage tool does not reach it; mcp__claude-code-remote__send_message does).
Re-read FIGURE_GATE + consort-B10 before every person (owner verbatim in brief).
