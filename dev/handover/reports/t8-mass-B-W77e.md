# t8-mass-B W77e (c09, c10, c11 x a18/a26/a36/a51; t7+t8 v0/v1/v2) — rollover handover (18/11 ~19:45Z real)
PRIORITY #1 CHECK: brief t8-mass-B.md UPDATE + owner 19:55Z (4 ages) | builder dev/art/t8-prompt-B build.py --age (tip >= 73ac4f46, NEW a36/a51 age text from 252c25f5) | Foreman C = session_011xDdVS7JY8KJW8hzKtoquL.
## Done (all READY sent to Foreman C, CDN md5 verified)
- c09 a18, a26 (old=new age text), a36 + a51 REDONE with the new age text (first a36/a51 batch used the old text -> Foreman C FAIL on a51 faces ~25). 36 gens total, 1 each, no regens, no black-fill cut-outs.
  Files img/_review/t8-reprompt/c09_aXX_t{7,8}_v{0,1,2}.png + c09_aXX_t7t8_sheet.jpg (XX = 18,26,36,51). Output is 1024x2304 (Magnific returns this at "2k"), same as W77/W64.
## Not done
c10 (all 4 ages), c11 (all 4 ages). c10 t1 refs already uploaded to Magnific (ids below) and prompts built.
## Method (works; ~25k tokens per person-age)
1. refs per age = that person's own t1: a18 `img/_review/consort-tiers/<c>/b10/<c>_a18_t1_v0.png`; a26 `.../<c>/b10-a26/<c>_a26_t1_v0.png`; a36 `.../<c>/b10-a36/<c>_a36_t1_v0.png`; a51 has NO b10 t1 -> live `img/hd/fig-consort-<c>-t1-a51.webp`. Upload with creations_upload_image (folder ba4aecfe-efce-47e2-b53f-30d292091886) + m09 style eIyOFEidqL.
   Magnific ids: c09 a18 N2HNxP96D9, a26 KLDKIKpkqp, a36 p8OpRBzehw, a51(hd) s78sEidl8e. c10 a18 lJtSJ5Fgv9, a26 jUosUK3LD0, a36 9ZH6ZybNYZ, a51(hd) kserskU16B. c11: upload again.
2. prompts: `python3 build.py <c> v0|v1|v2 --age aXX` (t8), `build.py <c> --t7 [v1|v2] --age aXX` (t7). ALWAYS rebuild from the CURRENT handover tip (a36/a51 text changed). Golden: `build.py c06 v0 --golden | cmp - golden/pB_c06.txt`.
3. images_generate gpt-2-6 1024x2304 resolution 2k, no seed, 6 in one message; creations_wait; tools/dl.py makes a review sheet (body+face crops), tools/faces.py a 2x3 face zoom (USE at a36/a51: fine lines, fuller face, a few silver strands).
4. images_remove_background each (3 cr) -> tools/fin.py <c> <aXX> t8v0=url ... (downloads cuts, black-fill check, 6-col sheet) -> tools/push.sh <c> <aXX> (cdn_sync from scratch root with dev/site/cdn_sync.py + manifest_guard.py from origin/main; md5 check vs CDN). Paths inside the scripts are my scratchpad: edit.
5. send_message (claude-code-remote) to Foreman C: "READY t8-B+t7 <c> <aXX> sheet <url> gens=N".
Order: finish each person all 4 ages before the next (c10 then c11).
