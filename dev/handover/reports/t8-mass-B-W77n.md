# t8-mass-B W77n (c10 a18, a26 done) — rollover handover (18/11 ~19:50Z)
Foreman C = session_011xDdVS7JY8KJW8hzKtoquL. Rules/method = predecessor dev/handover/reports/t8-mass-B-W77e.md (same tools, copied to t8-mass-B-W77n-tools/; paths inside scripts are scratchpad-local, edit).
## Done (READY sent, CDN md5 verified, no black fill)
- c10 a18: 6 gens (1 each, no regens). c10 a26: 6 gens (1 each, no regens). Files img/_review/t8-reprompt/c10_aXX_t{7,8}_v{0,1,2}.png + c10_aXX_t7t8_sheet.jpg. Looked at all: yellow dominant on t8, larger yellow parts on t7, phoenix dominant, sleeves soft, closed lips.
## Not done
c10 a36, a51; c11 a18/a26/a36/a51 (c11 t1 refs must be uploaded: a18 img/_review/consort-tiers/c11/b10/c11_a18_t1_v0.png, a26 .../b10-a26/c11_a26_t1_v0.png, a36 .../b10-a36/..., a51 live img/hd/fig-consort-c11-t1-a51.webp). c10 refs: a36 9ZH6ZybNYZ, a51 kserskU16B (+ m09 eIyOFEidqL).
## Notes
- Builder tip used: handover 9b901c5 (a18 text "about 22", a26 "about 30" = a18 prompt with only that sentence swapped (verified), a36 "about 42", a51 "about 51 and her face must clearly read..."). Rebuild prompts with build.py --age at your tip; for a36/a51 zoom faces with tools/faces.py.
- Workflow: 3 gens at once -> creations_wait -> dl.py sheet -> look -> images_remove_background (param creationId, folderReference) -> fin.py -> push.sh. ~50k tokens per person-age incl. typing prompts.
