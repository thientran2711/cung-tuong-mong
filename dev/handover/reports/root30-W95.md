# root30 W95 — JOB C (t1–t6 style B, a18) c01–c04
PRIORITY #1 CHECK: OD 0 | main 0 | review/* low-ranks-B-W79 (builder, reused) | claims Foreman C ROOT-30. Prompts = build.py output verbatim; golden + test_low_all OK before first gen.
Refs: t1–t5 = face-cNN-t1.png (own a18 t1 v0) + style kspkwKx16B; t6 + swatch TdwDfOyVNR. Gate re-read before every person (FIGURE_GATE, consort-B10). Mouth checked at crop; teeth => regen same prompt.

| figure | gens | pass | note |
|---|---|---|---|
| c01 t1 v0/v1/v2 | 1/1/1 | yes | |
| c01 t2 v0/v1/v2 | 1/2/1 | yes | v1 first gen showed teeth |
| c01 t3 v0/v1/v2 | 1/2/1 | yes | v1 teeth; builder gives v1/v2 near-identical peach family |
| c01 t4 v0/v1/v2 | 1/2/2 | yes | v1,v2 teeth |
| c01 t5 v0/v1/v2 | 1/1/1 | yes | |
| c01 t6 v0/v1/v2 | 1/1/1 | yes | yellow clearly visible (prompt frozen) |
Total c01: 22 gens. Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/c01/c01_a18_low_sheet.jpg (row0 live, rows1-3 v0/v1/v2). Files img/_review/low-B/c01/c01_a18_t<N>_v<k>.png (md5 checked).
Known: colour families of v1/v2 at t3 (both peach) come from LOWV rows, not editable by painter.

## HANDOVER (W95 rolled over after c01 done, c02 t2 in progress; Foreman C to open successor)
Tools (copy of my scratch): dev/handover/reports/root30-W95-tools/{dl.py,mouth.py,sheet.py}. dl.py cNN sheetname dest=url... downloads + contact sheet; mouth.py out.jpg files... = face crops to check closed lips (teeth => regen same prompt); sheet.py cNN = final sheet (row0 live a18) + black-fill scan. CDN push: sparse worktree of origin/main incl dev/site/cdn_sync.py + manifest_guard.py, copy to img/_review/low-B/<cNN>/, `CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py img/_review/low-B/<cNN>`.
Magnific: uploaded face refs (this account): c01 BhNIRZVoQR, c02 P3QNw6I42C (c03/c04 not uploaded yet: upload https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png as face-<cNN>-t1.png). Style kspkwKx16B, swatch TdwDfOyVNR work (used for c01 t6).
c02 state (all passed look + mouth check, 1 gen each so far): t1 v0/v1/v2 done, cutouts downloaded (scratch). t2 v0/v1/v2 raw gens passed: Syh7siRUb8 / u5WHfswQLD / jUol16ELD0; images_remove_background queued: 6AbR9k5iJO / hu2ftncvqL / ksex58F16B (get URLs with creations_wait, name out/c02_a18_t2_v<k>.png). NEXT: t3 (build.py c02 --low 3 v0|v1|v2 --age a18), t4, t5, t6 (+swatch), sheet, CDN, READY c02; then c03, c04. Gen counts c02 so far: t1 3, t2 3.
Tip: each prompt must be pasted verbatim from `python3 build.py cNN --low N vK --age a18`; cap 3 gens in flight.

## STOPPED (Foreman C order 21:09Z, owner: stop painters on ranks 1-3)
Last file: c02_a18_t2 bg-remove queued only (not downloaded/uploaded). No new gens after the order. All c01 and c02 v1/v2 cells were made BEFORE LOWV fix 5df887f7 => list for redo: c01 t1-t6 v1/v2 (12 cells, already on CDN img/_review/low-B/c01), c02 t1,t2 v1/v2 (4 cells, raw only, not uploaded). v0 cells stay (c01 t1-t6 v0 on CDN; c02 t1,t2 v0 in scratch).
