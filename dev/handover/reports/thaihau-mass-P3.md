# thaihau-mass P3 (c09-c16), Thai hau a36/a51/a65 v0
Prompt: `build.py cNN --state thaihau --age aNN --nostyle` (>= 4e1fca5d/tip 1904204), ONE ref = own live t1 of that age (a65 uses a51 ref), Magnific gpt-2-6 1024x2304 2k, folder ba4aecfe..., then images_remove_background. No --spec5pose.
Output: img/_review/thaihau/<cNN>_<age>_thaihau_v0.png + <cNN>_thaihau_sheet.jpg (CDN, https://ctm-img.victoria-tntt.workers.dev/img/_review/thaihau/...).

| person | gens | pass |
|---|---|---|
| c09 | 3 (nostyle, redo; 3 earlier style-B gens discarded/overwritten) | a36 young face, a51 silver streaks, a65 much silver; stiff shoulder piece + round collar; one gold phoenix lantern, both hands, calm; face visible, lips closed, no forehead mark. Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/thaihau/c09_thaihau_sheet.jpg |

## Handover (P3 rolled over at c09)
- NEXT: c10 (then c11..c16; c13 a51 also redo, one ref). Style-B c10 gens (ids 1ldLCdWr4r, yiuNjFhPW9, vQAEpYOa47) were NOT used/uploaded; discard.
- Method: per person build 3 prompts into a scratch dir (`build.py cNN --state thaihau --age a36|a51|a65 --nostyle`); a51/a65 differ from a36 only in the age clause. Upload refs via creations_upload_image of https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-cNN-t1-a36.webp and -a51.webp (name face-cNN-t1-aNN.png, folder ba4aecfe-...). Known ref ids: c09 a36 jUogCYJLD0, a51 lJtwQTegv9; c10 a36 u5WqobwQLD, a51 Lw8SFwvswO (a65 CDN image does not exist -> a51 ref).
- After bg-remove, download cutouts, make sheet (a36|a51|a65 on parchment, 1260 px) and `python3 dev/site/cdn_sync.py <files>` from a sparse worktree of origin/main containing dev/site/cdn_sync.py + manifest_guard.py.
- Check every image at <=600 px: face, stiff shoulder piece + collar, age, one item, no cup, closed lips, eyes open, no forehead mark, not back-turned.
