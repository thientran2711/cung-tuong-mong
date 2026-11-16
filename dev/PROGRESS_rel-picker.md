# PROGRESS rel-picker (C29) - Giao tinh relation pickers compact (owner screenshot 15/11)
Kit part: KIT 49.2c (CSS in jhc.js `kit-hc`, strip fit in j79.js kitStripFit, label via kitNameRank). No private chips.
- Each picker = one flex row: label + group chips + face strip beside them (strip basis 300px), else under; no band, small faces.
- Strip faces labelled with kitNameRank: rank in its rank colour over the short name (OWNER_DECISIONS ~793); Ta keeps kmy glow.
- pager arrows and N/M appear only when faces overflow (kitStripFit .kpall) - applies to EVERY pager strip in the game (family).
- Family scan: the only relation/person picker of this kind is hcRelHTML (Ân oán X / Y); other pager() users share kitStripFit.
## Before/after (px, picker height; pair-card top; Ân oán tab, fresh game)
| viewport | picker X before->after | picker Y before->after | pair card top before->after |
|---|---|---|---|
| 755x1000 | 146 -> 81 | 146 -> 70 | 557 -> 420 |
| 1000x755 | 163 -> 100 | 163 -> 89 | 581 -> 401 |
| 1180x820 | 163 -> 100 | 163 -> 89 | 534 -> 401 |
| 1366x1024 | 163 -> 100 | 163 -> 89 | 534 -> 401 |
| 844x390 | shot script stuck on Luan hoi screen (new-game flow), not measured; CSS is width-driven |
No page errors, no horizontal overflow at the 4 measured viewports.
Open: the Y strip shows arrows (1/2) when only ~1 face fits beside the chips at 300px basis.
