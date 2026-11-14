# Cung Tường Mộng: ONE UI KIT (single source of truth)

Owner rule 11/14: every image, frame, button, bar, card, tab, backdrop and other visual element comes from this kit.
No worker hand-draws a new style, a one-off frame, a custom button or a private CSS look. Reviewers check every
`review/<topic>` branch against this file with screenshots at 1510x2000, 904x2316, 1024x768, 390x844.
Anything not listed here, or listed but drawn differently, is a FAIL.

Code lives in `dev/build/` (modules concatenated by `assemble.py`; later modules wrap earlier ones).
Kit core: `j15` (person card, pager, buttons), `j17` (effect lines), `j19` (act card, odds chip, frame, result card),
`j21` (relations, fbar), `jkit` (one act-card size + ⓘ full card), `jtin` (sbar), `j60` (portrait kit), CSS in `p1.html`.

---

## 1. Colours

### 1.1 Theme tokens (`p1.html :root`)
| token | value | use |
|---|---|---|
| `--bg` | `#f5ecdc` | page |
| `--panel` / `--panel2` | `#fffaf0` / `#f6ead6` | cards / options |
| `--ink` | `#2a1a12` | text |
| `--dim` | `#6b5643` | secondary text, neutral effects, labels |
| `--gold` | `#8f5f0c` | titles, active tab, frame label |
| `--line` | `#d2b071` | borders of buttons, options, chips |
| `--good` | `#2d7a52` | GAIN (green) |
| `--bad` / `--red` | `#c23b22` | COST / risk (red) |
| `--jade` `--peony` | `#5fa58c` `#e48aa4` | accents |
| `--sa2` `--sa3` | per season | seasonal UI theme (set by the season code, never by hand) |

### 1.2 Gain / cost colours (every act, option, result)
- gain: `.ef.g` = `--good`, bold; cost/loss: `.ef.r` = `--bad`, bold; neutral: `.ef.n` = `--dim`, normal weight.
- risks are on their own red line labelled `kèm` (`.kl` label + `.ef.r`), never mixed into the gain line.
- result toast deltas use the same `.ef g/r` spans (`resultShow`).

### 1.3 ONE rank palette (harem) = global `RCOL` (j1; j59 sets the owner's values at load)
Used by: frame gems/badges, brocade grounds, the round-avatar ring, the player's stage halo, rank chips.
Read it live: `RCOL[rank]`, or `KIT_RANK_COL[rank]` / `KIT_RANK_COL.cold` / `kitRankCol(rank|'cold')` (j60, a live view of RCOL; it never copies it).

| rank | name | colour | gem (`img/kit/gem-N`) | brocade (`img/kit/bg-consort-N`) | frame (`frame-consort-N`) |
|---|---|---|---|---|---|
| 0 | Đáp ứng | `#8a7a6a` nâu xám | smoky brown-grey topaz, brass bezel | brown-grey taupe silk, jasmine | carved wood stained brown-grey, brass caps, plum blossom |
| 1 | Thường tại | `#7aa07a` xanh lục | jade, brass bezel | celadon green, plum blossom | dark green lacquer wood, silver/jade inlay, orchid |
| 2 | Quý nhân | `#6a8aa0` xanh lam | aquamarine, silver bezel | sky blue, orchid | silver filigree, seed pearls, chrysanthemum, small tassel |
| 3 | Tần | `#d48fa6` hồng phấn | rose quartz, silver-gold bezel | rose pink, orchid | silver + pale gold, lotus, jade insets, pearl drop |
| 4 | Phi | `#a07ab0` tím | amethyst, silver bezel, pearls | lavender, chrysanthemum | gold filigree, peonies, coral beads |
| 5 | Quý phi | `#c06a6a` đỏ | ruby, gold bezel | crimson, peony + clouds (gold thread) | gold, red enamel, rubies, red tassel |
| 6 | Hoàng quý phi | `#d98a3a` cam | amber, gold bezel with phoenix wings | amber gold, phoenix feathers | gold, twin phoenixes, amber, pearls, jade disc |
| 7 | Hoàng hậu | `#f0d070` vàng | imperial gold + ruby heart, phoenix crown | imperial bright yellow-gold, phoenix + peony (no red) | all-gold phoenix crest, yellow-gold enamel, gold gems, white jade bi, gold tassel (Quý phi keeps the red frame) |
| cold | Lãnh cung | `#cfd3d8` | (none) | `bg-cold` pale grey worn silk, withered plum | `frame-cold` weathered grey wood |

(`RCOL` values on main before j59: index 1 is still the old `#a8946a`; the frame/gem/brocade art already follows the table above.)

### 1.4 Servant rank palettes (owner 11/14)
- maids `MRCOL` = `["#9aa3a8","#5fa39a","#4f74a8","#a0584a","#6a5a8e"]` (thô sử, cung nữ, đại cung nữ, chưởng sự cô cô, nữ quan)
- eunuchs `ERCOL` = `["#8f9a8a","#5f8a6a","#3f6a8a","#7a4a3a"]` (tiểu thái giám, thái giám, thủ lĩnh, tổng quản)
- j60 reads a global `MRCOL` / `ERCOL` when one exists, else its fallback `window.KIT_MRCOL` / `KIT_ERCOL` (same values); `kitServCol(role,rank)`.
- used for: servant token badge `img/kit/tok-mN.webp` / `tok-eN.webp` (enamelled plum-blossom token tinted with the palette), a 22 % tint over the servant brocade, the round-avatar ring.

### 1.5 Role colours (non-harem) keep the existing `f.col` of each face constructor (emperor `#f0d070`, Thái hậu `#c9a0e0`, eunuch `#8a8aa0`, official/men `#6a8aa0`, physician `#8fc38a`, kids `#d9b25f` heir / `#c98aa0`).

---

## 2. Type sizes
- body font `--body` "Be Vietnam Pro"; display/titles `--display` "Noto Serif".
- act card text `--kfs`: `.76rem` (phone) / `.8rem` / `.875rem` (wide); `.kl` labels `.66rem` uppercase; chips `.75rem` (`.68rem` phone);
  buttons `.8rem`; frame label `.pfrw` `.7rem` gold 600; "Người lạ" label `.klab` `.72rem`.
- Never shrink text to fit: text wraps; no truncation (`…`) on names, labels, prices. The only clamp is the act card body, whose ⓘ opens the full card (jkit).

---

## 3. Components (existing kit functions; use these, never new markup)

| piece | function / class | rules |
|---|---|---|
| effect token | `eff(t)`, `effList(tokens,def)` → `.ef g/r/n` | colours of 1.2 |
| odds chip | `oddsChip(word)` → `.oc .oc0..oc7` | ladder Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc; never %, never "Chắc chắn" (sure acts show no word) |
| any price line | `kitParse('word · tốn: … · thành: … · hỏng: … · kèm: …')` | used by `optLine`, `dilLine`, `actLine`, `kitFix` |
| act card | `cardH(a,i)` → `button.card.kcard` | title, khắc pips, text, odds chip, rows Tốn / Thành / Kèm / Hỏng; ONE height `--kh` (232/250/268 px) for every card (jkit); ⓘ opens full card; disabled says why (`.kwhy`, `cardWhy`) |
| option (dialogs) | `button.opt` + `<small>` through `kitParse` | `--panel2`, `1px --line`, radius 6, min-height 42 |
| button with price | `pbtn(attrs,name,line,why)` | name + `<small>` price/gain/loss; disabled reason first |
| plain button | `.btn` | `#fffaf0`, `1px --line`, radius 6, min-height 40 |
| tabs inside a person card | `pcard({groups})` → `.pctabs .pct` (+ count `<i>`), active `.pct.on` = gold fill | groups for rivals come from `RVGRP` (Giao thiệp / Hại nhỏ / Hại nặng / Sát hại) |
| main tabs | `#tabs [data-tab]` (Hành động, Bản đồ, Phi tần, Quan hệ, Phe phái, Kẻ hầu, Con cái, Rương đồ, Tài nghệ, Tuyến truyện, Nhật ký) | servant-start uses `SRVTABS` |
| person card | `pcard({f,name,rank,status,ghen,lines,chips,note,groups,empty,close})` → `.pc` | portrait (kit frame) left, info under it, actions right; one card at a time with `pager(key,items,mk)` face strip |
| labelled bar | `ghenBar(n)`, `fbar(v,lo,hi,good)`, `sbar(label,v,cls)` | always label + number beside the bar |
| chip | `chip(text,cls)` → `.chip` (`.hot` red, `.ok` green) | |
| modal / dialog | `Q.unshift({t,h,opts}); showModal()` → `.modal .dlg`; speaker = `pframe(face)` or `pframeArt(placeArt)` | `.modal.pcm` for person cards, `.modal.night` for nights |
| result card | `resultShow(title,before,ok)` → `#rtoast` seal THÀNH/HỎNG + coloured deltas + why | after every act/choice (`wrapR`) |
| status row | `renderHud2()` → `#hud2 .hc` | collapsible; every number labelled |

---

## 4. PORTRAIT KIT (j60)

Every person shown anywhere (cards, dialogs, lists, chips, scene tags, identity card, small avatars) is drawn by
`pcPort` (tall) or `mdH` (round). j60 wraps both, so every caller gets the kit automatically.

### 4.1 Tall portrait = `pcPort(f,col,status)` / `pframe(f)`
**Frame canvas (every frame, one single picture): 550 x 1037 px, shared by all frames.** Every frame's portrait OPENING is identical: 384 x 506 px with its top-left at (83, 214) (measured on every asset: all within ±1–2 px, the ma ma frame's carved band has see-through gaps). Above it there is room for crests (the Emperor's rising dragon is the tallest), at the sides for side dragons/halberds, and below for the frame's own hanging pendant and tassel (ngọc bội + tua rua). Nothing of a frame may leave this canvas; the whole picture will later be animated as one (the tassel is the part that moves).
**Size is set by the opening, never by the ornaments.** The `.pcp.kit` box is 480 canvas units wide and as tall as the canvas (aspect 480/1037); the stage `.kin` is scaled by `min(box width / 480, box height / 1037)` and centred, so in any one box every frame has exactly the same opening size and position; side ornaments may reach a little past the box edges, crest and tassel are inside its height. Layers, in % of the 550 x 1037 canvas (generated by `geo_apply.py` from the shared geometry):
1. `.kbg` brocade ground `img/kit/bg-<role>[-<rank>].webp` (servants: + palette tint), the opening + 2.4 px;
2. the portrait `.kpor` (`por-*`, or initials when missing): the live por framing the owner chose (whole head, face large, cut below the chest), `object-fit:cover` anchored at the top, starting 9 % of the opening lower (from 9 % of the opening below its top to its bottom) so crests never cover hair ornaments and the brocade shows as headroom. Old opaque `face-*` art (children) fills the opening with a soft oval vignette;
3. `.kfr` the frame picture, full canvas;
4. `.kgem` rank gem / servant token / unknown token at the band's bottom-right corner: at the band's bottom-right corner;
5. `.kemb` (player only) her origin (thân phận) as a small gold-and-white-jade medallion in the same style as the gem, beside it on the left: just left of the gem; tooltip and alt text = "Xuất thân: <origin name>";
6. `.klab` "Người lạ" (unknown only), above the opening's bottom edge; `.pcs` status stays on top.
The old rank grounds `.rk-*`, the gold border and the `rank-*.webp` corner icon are not drawn under the kit.

### 4.1b Pendants and tassels (part of each frame picture)
| frame | pendant (ngọc bội) | tassel |
|---|---|---|
| consort-0 Đáp ứng | small carved wooden bead | brown-grey silk |
| consort-1 Thường tại | small round green jade bead | soft green |
| consort-2 Quý nhân | silver-capped aquamarine bead | light blue |
| consort-3 Tần | rose-quartz flower | powder pink |
| consort-4 Phi | amethyst in silver filigree | lavender |
| consort-5 Quý phi | ruby and gold peony | crimson |
| consort-6 Hoàng quý phi | amber and gold phoenix wing, pearls | orange-gold |
| consort-7 Hoàng hậu | large white jade bi disc with gold phoenix, pearl strings | long golden yellow |
| emp | the richest: large imperial yellow dragon jade bi set in gold with rubies and pearl strings, big gold knot | long double imperial yellow tassel |
| thaihau | very rich: white-and-lavender jade phoenix around a shou medallion, antique gold, amethysts, pearl strings | long double tassel, deep plum and gold |
| heir | gold-capped jade with small dragon | apricot yellow |
| prince | green jade qilin | deep blue |
| princess | pale pink jade peach blossom, pearl | soft pink |
| official | square dark-green jade seal | teal |
| physician | lacquered medicine gourd, jade bead | sage green |
| man | round white jade disc | charcoal black |
| royal | navy-and-gold python jade | navy and gold |
| guard | bronze tiger tally | dark crimson |
| cold | cracked pale grey jade | faded grey |
| unknown | grey stone disc with mist | soft grey |
| eunuch-0..3 | jade bead → silver cap → silver + knot → gold-capped jade pendant | ERCOL `#8f9a8a` `#5f8a6a` `#3f6a8a` `#7a4a3a` |
| maid-0..4 / mama-0..4 | plain jade bead → jade flower → silver flower → silver plum blossom → gold plum blossom with pearl | MRCOL `#9aa3a8` `#5fa39a` `#4f74a8` `#a0584a` `#6a5a8e` |
Men's pendants and tassels are never pink or purple. Small round avatars (`mdH`) have no tassel.

### 4.2 Round avatar = `mdH(face,"xs|sm|big")` → `.md.kit`
Simplified frame: brocade ground of the same role/rank, ring = rank/role colour (`--kc`), outer rim = role metal (`--km`).

### 4.3 Roles, frames, grounds, badges
| role (`personRoleRank(p).role`) | who | frame | ground | badge |
|---|---|---|---|---|
| `player` | her (consort road), by rank 0–7 | the SAME `frame-consort-N` as any consort of her rank (on the stage she is marked by her rank-colour halo) | `bg-consort-N` | `gem-N` + origin medallion `origin-<k>` beside it (tt dtq muoi cn nc td ch thd) |
| `consort` | the 12+ phi tần, by rank (Hoàng hậu = 7) | `frame-consort-N` | `bg-consort-N` | `gem-N` |
| `cold` | anyone in lãnh cung (her too) | `frame-cold` | `bg-cold` | – |
| `emp` | Hoàng thượng | `frame-emp`: the MOST splendid frame of the game (rising five-clawed dragon crest with flaming pearl, dragons climbing both sides, imperial yellow enamel, rubies, pearls); Hoàng hậu's is second | `bg-emp` | – |
| `thaihau` | Thái hậu | `frame-thaihau`: second only to the Emperor, above the Hoàng hậu (grand phoenix over a gold-and-jade shou roundel, pine and clouds, deep plum enamel with gold shou medallions, amethysts and pearl strings) | `bg-thaihau` | – |
| `heir` | Thái tử (`k.heir`) | `frame-heir` (grander than Hoàng tử: young gold dragon crest with flaming pearl, small dragons at the upper corners, apricot-yellow enamel, pearls) | `bg-heir` | – |
| `prince` / `princess` | Hoàng tử / Công chúa | `frame-prince` (qilin) / `frame-princess` (peach blossom) | `bg-prince` / `bg-princess` | – |
| `maid` | cung nữ (and her, servant start), rank 0–4 | `frame-maid-N` (same frame, rank tassel) | `bg-maid` + MRCOL tint | `tok-mN` |
| `mama` | maid aged 36+ or `old` | `frame-mama-N` | `bg-mama` + MRCOL tint | `tok-mN` |
| `eunuch` | thái giám, rank 0–3 (court eunuchs: tq = 3, others 2) | `frame-eunuch-0..2`, rank 3 `frame-eunuch-3` (gold head-eunuch frame) | `bg-eunuch` / `bg-eunuch-3` + ERCOL tint | `tok-eN` |
| `official` | quyền thần / quan (j55 clans) | `frame-official` (crane) | `bg-official` | – |
| `physician` | thái y | `frame-physician` (bamboo, gourd) | `bg-physician` | – |
| `man` | nhạc sư, họa sư, sứ thần, công tử | `frame-man` (walnut + charcoal enamel, jade disc) | `bg-man` charcoal ink, silver clouds | – |
| `royal` | vương gia | `frame-royal` (python, navy + gold) | `bg-royal` navy, gold python | – |
| `guard` | thị vệ | `frame-guard` (steel + bronze, halberds, tiger) | `bg-guard` bronze-brown, armour scales, tiger roundels | – |
| `unknown` | anyone `kitKnown(p)===false` | `frame-unknown` (grey stone) | `bg-unknown` + silhouette `unknown-f/m/k` | `tok-unknown` |
| `other` | face with no known person | `frame-man` | `bg-default` | – |

Stage strangers: full-body grey silhouettes `img/kit/unknown-fig-f|m|k.webp` (900 px tall, transparent, child padded to adult height).

### 4.4 API (j60)
- `personRoleRank(p)` → `{role, rank, origin, sex, kid}` for any person object (S, consorts, kids, S.emp, S.thO, S.maid, servants, S.court members, S.men, clan officials, công tử, place records `{kind,ref}`).
- `kitDecor(faceOrPerson)` → frame/bg/badge/emblem URLs, colours, `known`, `label`.
- `kitFace(p)` → face object through the game's own constructors; `kitPortrait(p,{size:"lg"|"big"|"sm"|"xs"})` → HTML (lg = tall frame).
- `kitKnown(p)` → boolean, default `true`. Hook for the "who is known" worker: override with `window.kitKnown = p => …`. When false: silhouette + "Người lạ" in tall frames, round avatars, `pframe` label, `pcard` name, scene tags and stage figure.
- `KIT_RANK_COL[r]` / `kitRankCol(r)`: rank colour (live RCOL; `'cold'` = `#cfd3d8`). `kitServCol(role,r)`: servant palette.
- Face constructors are wrapped to carry `__kp` (person) and `__kr` (role/rank): `pv pMe pEmp pTH pMaid pDoc pServ0 pServ kidFace0 kidFace pEunCourt pMan pMin h54Face pMsg`. A new constructor must return the person via the same wrapper (add one line in j60), never its own frame.

### 4.5 Art rules for kit assets
- Magnific `gpt-2-6` only, at most 1 style reference (face-consort-01), folder ba4aecfe-efce-47e2-b53f-30d292091886; painterly semi-realistic guofeng, soft light.
- Frames: rectangular 3:4, transparent centre, ornaments close to the band; drawn on chroma green and keyed locally; normalised to the shared 550x1037 canvas (crest headroom, fixed opening, own pendant + tassel inside); < 150 KB each.
- Brocade: tone-on-tone, low contrast, soft centre glow, 360x480 webp.
- Men's frames/grounds: never pink or purple; man / royal / guard must stay distinguishable at a glance (charcoal / navy-gold / bronze).
- Never reuse a frame of another role; a new role gets its own frame + ground pair added to this table first.

---

## 5. Layout rules (all screens)
- No horizontal page scroll at any of the four sizes; no truncated text; act cards one size; the scene is not covered (slim ribbon, collapsible status); map full screen.
- Every name has its face (portrait kit); every bar labelled; disabled buttons say why.
