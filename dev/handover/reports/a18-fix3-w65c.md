# a18 fix-3 (W65c, 18/11) — D4b teeth + D3e strict items + t7 v1/v2 C2 re-tone (t8 FROZEN, skipped)
Plan per person: dev/handover/reports/a18-fix3-tools/plan.json (file -> fixes; t8 omitted = queued; c03 = list only). Tools: finish.sh (download rest, sheet, cdn_sync + md5, old kept as *_prev_a18scan2.png), get.py (fetch gens), faces.py (mouth crops), plan.py.
Gen recipe: refs [file image, m09 eIyOFEidqL style, (t7 retone: C2 t7 colour image gOtse5USXO)], prompt "copy EXACTLY ... change ONLY <mouth | item (ONE item from 3f of that rank, contrasting, below chin) | yellow parts+gold to C2>"; 1024x2304 2k transparent gpt-2-6 folder ba4aecfe.
| person | gens | what | sheet |
|---|---|---|---|
| c01 | 6 | t6 ruyi, t7 censer + C2 | .../c01/b10/c01_a18_b10_sheet.jpg |
| c02 | 4 | t7 jewel casket + C2 (v2 2 gens: 2nd item removed) | c02 |
| c04 | 6 | t1v1 mouth, t6 jade-gold fan, t7 C2 | c04 |
| c05 | 9 | t2 mouth, t6 hand mirror, t7 kingfisher fan + C2 | c05 |
| c06 | 6 | t6 jade incense box, t7 lotus incense box + C2 | c06 |
QUEUED (t8 freeze): c01 t8 soft fan, c12 t8 v0-2 teeth, c14 t8 basket, c15 t8 branch, c16 t8 check, all t8 soft/old yellow.

## HANDOVER (W65c -> successor)
Done + READY sent: c01 c02 c04 c05 c06 (31 gens). NEXT: c07, then c08..c32 in order (c03 skipped; c13 t4 already done by W65, plan.json lists only its t6 teeth... check). Per person: `python3 -c "import json;print(json.load(open('plan.json'))['c07'])"` gives the files to regen (t8 excluded). Setup that is ephemeral: /home/user/wt/w65c-work (all/, tools/), /home/user/wt/w65c-root (cdn_sync.py + manifest_guard.py from origin/main) — recreate from tools/. Flow per person: creations_upload_image each CDN file (folder ba4aecfe...), images_generate gpt-2-6 1024x2304 2k transparent (refs: file image + m09 eIyOFEidqL style [+ C2 t7 colour image gOtse5USXO for t7 v1/v2 re-tone]), creations_wait, get.py cNN name=url..., look at new.jpg (+faces.py mouth crops for teeth fixes), ./finish.sh cNN, READY to Foreman C.
Item picks used so far (spread neighbours): t6 white-jade ruyi (c01), jade-gold round fan (c04), gold-and-pearl hand mirror (c05), carved jade incense box (c06); t7 gilded hand censer (c01), gold-filigree jewel casket (c02), kingfisher-feather folding fan (c05), gold lotus incense box (c06). Next unused t6: jewelled box, white-jade vase, pearl silk folding fan, coral branch on gold stand, pearl lantern, jade pendant; t7: imperial round fan gold filigree, gold hand mirror, gold-mounted jade vase with peonies, gold flower basket, gold-and-coral bead string, gold-filigree lantern. Empty hands (c14 t4, c27 t3, c28 t3, c29 t3): one item from 3f of that rank (t3/t4 list). Lessons: prompt "remove X" explicitly when the old fig has a 2nd item hanging (c02 t7 v2 phoenix disc at hip); t7 v1/v2 prompt adds "crown same design and size, not wider".
Rulings applied: plain gilded lantern/painted fan at t6 -> t6 item; phoenix fan at t7 -> t7 item. Soft list untouched.


## UPDATE 17:40Z (feedback from ROOT-28/29; foreman is now ROOT-29 = session_011xDdVS7JY8KJW8hzKtoquL — send READYs there)
- c01 PASS, c04 PASS (t7 yellow front panel at the limit: keep it narrow), c05 PASS.
- PENDING REDO c02 t7 v1 + v2 (2 gens): t7 v2 main = rose/mauve = same family as v0 pink -> recolour v2 to a different family; v1+v2 yellow inner robe fills the whole front and reads as MAIN -> own colour MAIN, yellow only as parts (borders, sash, collar, narrow inner panel) like C2 t7 reference.
- SELF-CHECK c06 t7 v1/v2: yellow skirt/inner robe is wide (fills the front) -> likely FAIL the same way; look and redo if so. Apply the check to every t7 from now (prompt: "main robe colour stays the MAIN colour; yellow ONLY on collar, borders, sash and a narrow inner panel").
- Standing: t8 FREEZE; 8 different colours per row, max one pale neutral per row; one 3f item per rank; closed-lip smile; re-read FIGURE_GATE + consort-B10 before every person.
