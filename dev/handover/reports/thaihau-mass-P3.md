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

## P3b (successor of P3, c10-c16) — PAUSED 18/11 ~22:27Z
PRIORITY #1 CHECK ('thai hau mass'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0. START_CTX ~12 %, at pause ~35 %.
Made under the OLD rule (ONE ref = own live t1, --nostyle; a51 and a65 both used her a51 ref), 3 gens per person, no regens, all passed my checks (face visible, stiff shoulder piece + round collar, age right, one item, lips closed, no forehead mark, not back-turned). CDN: https://ctm-img.victoria-tntt.workers.dev/img/_review/thaihau/<cNN>_<age>_thaihau_v0.png and <cNN>_thaihau_sheet.jpg
| person | gens | item | note |
|---|---|---|---|
| c10 | 3 | gold phoenix seal box | a36 young, a51 silver streaks, a65 much silver |
| c11 | 3 | kingfisher-pearl phoenix folding fan | lilac mix; fan sits near the chest, face clear |
| c12 | 3 | gold phoenix palace lantern | mint-green mix; lantern gold close to robe gold, acceptable |
| c13 | 3 queued, NOT used | scroll | discard (old refs; not bg-removed, not uploaded) |
**Invalid under the new rule (two refs: own t1 + m09 eIyOFEidqL style, no --nostyle): c10-c12 must be redone after the owner OK + ROOT-32 GO.** Credits spent: 9 gens + 9 bg-removes + 3 discarded c13 gens.
Ref ids uploaded (folder ba4aecfe...): c11 a36 TdwpnhUVNR, a51 gOm7LxTSXO; c12 a36 xSBlkk7jfW, a51 vQAEtmRa47; c13 a36 If3amultvE, a51 xSBgLJHjfW (c10: u5WqobwQLD / Lw8SFwvswO from P3).
Method notes: prompt per person = build.py output with only face line, colour word, item and hands line changing; a51/a65 differ only in the age clause (+ darker-colour sentence). Gen with width 1024 height 2304 resolution 2k mode gpt-2-6; cdn_sync lives on origin/main (copy dev/site/cdn_sync.py + manifest_guard.py into the worktree, then delete). Sheet script: 3 cutouts at 420 px on parchment (236,224,200).
NEXT (after GO): redo c10..c16 with refs = [own t1 of that age (a65 -> a51), style m09 eIyOFEidqL], command without --nostyle.

### P3b FINAL (18/11 ~22:40Z, owner via ROOT-31: "Thái hậu ok rồi, thôi đừng có vẽ vời gì nữa hết")
STOPPED for good: no more gens, no redo. c10, c11, c12 (a36|a51|a65 v0 + sheets on CDN img/_review/thaihau/) are kept as is. c13 discarded (never uploaded). The "redo with 2 refs" NEXT line above is cancelled. c14-c16 never started.
