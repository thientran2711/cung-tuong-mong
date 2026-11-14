# Cung Tường Mộng: ONE UI KIT (single source of truth)

Owner rule 11/14: every image, frame, button, bar, card, tab, backdrop and other visual element comes from this kit.
No worker hand-draws a new style, a one-off frame, a custom button or a private CSS look. Reviewers check every
`review/<topic>` branch against this file with screenshots at the owner's devices (CSS px @ device scale): Fold portrait 755x1000@2 and iPad landscape 1180x820@2 + 1366x1024@2 FIRST, then 412x1058@2, 390x844@3, 1024x768@2.
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
- Never shrink text to fit: text wraps; no truncation (`…`, line-clamp) anywhere, act cards included (see 6: cards grow, rows of cards share one height, the panel scrolls).

---

## 3. Components (existing kit functions; use these, never new markup)

| piece | function / class | rules |
|---|---|---|
| effect token | `eff(t)`, `effList(tokens,def)` → `.ef g/r/n` | colours of 1.2 |
| odds chip | `oddsChip(word)` → `.oc .oc0..oc7` | ladder Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc; never %, never "Chắc chắn" (sure acts show no word) |
| any price line | `kitParse('word · tốn: … · thành: … · hỏng: … · kèm: …')` | used by `optLine`, `dilLine`, `actLine`, `kitFix`; returns the labelled rows of section 6 (j63) |
| act card | `cardH(a,i)` → `button.card.kcard.ka` | the ACT CARD frame of section 6 (j63): title + odds chip, description, rows Cần / Tốn / Được / Mất / Kèm / Ghi chú |
| option (dialogs) | `button.opt` + `<small>` through `kitParse` → `.ka` | same ACT CARD frame (section 6) |
| button with price | `pbtn(attrs,name,line,why)` → `.ka` | same ACT CARD frame (section 6); conditions = Cần row |
| plain button | `.btn` | `#fffaf0`, `1px --line`, radius 6, min-height 40 |
| tabs inside a person card | `pcard({groups})` → `.pctabs .pct` (+ count `<i>`), active `.pct.on` = gold fill | groups for rivals come from `RVGRP` (Giao thiệp / Hại nhỏ / Hại nặng / Sát hại) |
| main tabs | `#tabs [data-tab]` (Hành động, Bản đồ, Phi tần, Quan hệ, Phe phái, Kẻ hầu, Con cái, Rương đồ, Tài nghệ, Tuyến truyện, Nhật ký) | servant-start uses `SRVTABS` |
| person card | `pcard({f,name,rank,status,ghen,lines,chips,note,groups,empty,close})` → `.pc` | portrait (kit frame) left, info under it, actions right; one card at a time with `pager(key,items,mk)` face strip |
| labelled bar | `ghenBar(n)`, `fbar(v,lo,hi,good)`, `sbar(label,v,cls)` | always label + number beside the bar |
| chip | `chip(text,cls)` → `.chip` (`.hot` red, `.ok` green) | |
| modal / dialog / panel | `kitPanel(spec)` / `kitModal(spec)` (j79) → `.dlg.kpanel` | section 8. Legacy `Q.push({t,h,opts,who})` is converted automatically; `pframeArt(placeArt)` / random room art is never shown |
| facts | `kitFacts(facts)` (j79) | section 9: one fact per row, never a joined string |
| intel / evidence / threat | `kitIntel(list)` `kitEvidence(e)` `kitThreat(t)` (j79) | section 10 |
| odds meter | `kitOdds(word|number)`; `oddsChip(w)` now draws it (j79) | section 11: the ONE 7-step scale (acts, HUD chances, risks) |
| glossary | `kitGloss(term)`, `KIT_GLOSS` (j79) | section 12 |
| mini-game frame | `kitGameFrame` `kitGameSet` `kitGameResult` (j79) | section 13 |
| scene panel | `kitPanel({scene:true,…})`, `kitTiles(list)` (j79) | section 14 (identity card, opening story, title screen) |
| result card | `resultShow(title,before,ok)` → `#rtoast.karesult` | section 7 (j63) |
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

### 4.2 Small avatar = `mdH(face,"xs|sm|big")` → `.md.kit.kmini` (kit 2: NO round avatars anywhere)
The SAME role/rank frame as the tall portrait, cropped to its body (canvas x 37–513, y 140–770, ratio 476:630): `.kmb` brocade at the opening,
the portrait, `.kmf` frame on top (`--kfr`). Widths: xs 22 px, sm 32 px, default 52 px, big 72–84 px; height follows the ratio. Every caller
(header, Hoàng thượng box, fact rows, pager, act-card titles, summaries) gets it through `mdH`; nobody draws a circle.

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
  j61 (người lạ) stages: `kitKnown(p)` = face seen (stage ≥1), `kitKnownName(p)` = name known (stage ≥2, or a public figure: Hoàng thượng,
  Thái hậu, the reigning Hoàng hậu). Named but face not seen yet: grey silhouette in the stone frame, but the NAME stays everywhere
  (`pcard` name + rank line, face strip, stage tag, `kitName`, podium) and the frame label (`.klab`, round-avatar title) is the title
  (tước), never "Người lạ". Only stage 0 reads "Người lạ" (card, strip, frame label, stage tag, podium) or "<tước> ???" (`kitName` in
  lists, logs, the rank board). Stage 1 (face seen, no name): real portrait, name "???".
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

---

## 6. ACT CARD (j63) — one frame for every act, option and priced button

Applies to: act cards (Hành động, servant road), person-card act groups (`.pcb`: consort, child, servant, court houses…),
dialog options (`.opt` / `.opts`), priced buttons (`pbtn`, `.btn`, `.rbtn`: court, festival, shop…). Built ONLY through
`kitParse()` (string → rows) and the frame `kaNorm()` (j63), which rebuilds every such button into the markup below
(a MutationObserver runs it after any render; `kitFix()` also calls it). Nobody writes this markup by hand.

```
button.ka [.kdis when disabled]
  span.kat                      title row
    span.kan                    action name (+ inline round avatar .md.xs, never on its own line, never over the title)
    span.kodds                  odds chip .oc (ladder colour) on the right; "Quẻ: dễ/khó hơn…" under it (green/red)
  span.klead                    act description (act cards only), dim, wraps, never clamped
  small.kb                      grid: label column (fixed 3.4rem; 3.3rem under 600px) | values
    span.kr.kr-why  > .krl "Cần"     .krv > .kwhy ✗ unmet (red) … .kwhy.kok ✓ met (green)   (first row)
    span.kr.kr-ton  > .krl "Tốn"     .krv > .ef.t time "2 khắc" (dark ink) · .ef.r resources (red)
    span.kr.kr-duoc > .krl "Được"    .krv > .ef.g (green)
    span.kr.kr-mat  > .krl "Mất"     .krv > .ef.r (red; outcome if it fails; old "hỏng" maps here)
    span.kr.kr-kem  > .krl "Kèm"     .krv > .ef.r (red; side risks: jealousy, exposure, Đức warning, "có thể bị phát giác")
    span.kr.kr-note > .krl "Ghi chú" .krv > .ef.n (dim, small; "(mỗi mùa dạy một lần)", "(chỉ buổi tối)", conditions)
  values in one row are separated by .ksep "·"
```

Rules
- Rows always in this order; an empty row is left out. Labels are Vietnamese title case `Cần / Tốn / Được / Mất / Kèm / Ghi chú`,
  shown small-caps in `#8a7350`. The old inline `TỐN / THÀNH / HỎNG / KÈM` labels are gone.
- A value goes to its row by meaning (`kaRows`): a gain is always green and in Được; a cost/loss is always red (Tốn, Mất, Kèm).
  Sentiment uses `kcls` (j19 + j25): `+N` is a gain unless it is hostile (`ghen +`, `oán ngươi +`); harm to a rival ("nàng … -N") is a gain.
  Exceptions: a failure that still gives something ("đêm nhạt, Sủng +3") stays in Mất but its `+N` is green; "không mất gì" is neutral.
  Time (`N khắc`, `1-2 khắc`) is in Tốn in dark ink, never red. "không" disappears when a row has a real value.
  Sign wins: a value whose only number is negative (`lòng -5`, `kẻ hầu khác dễ lơ là (lòng -1)`) is a loss → red, never in Được
  (except harm to a rival, "nàng … -N", and less hostility, "oán -N"). Losses that come with a SURE act or option go to Tốn when they
  are her resources (Bạc, Sức, Sủng, Danh, Đức…) and to Mất otherwise (e.g. option "Phạt vì làm vỡ chén ngọc" → Được: kẻ hầu khác giữ
  kỷ cương (lòng +1) · Mất: lòng -5); a ROLLED act's side loss on success goes to Kèm (Mất is kept for the failure outcome).
  Trailing "(…)" notes split off into Ghi chú.
- Odds: ladder word only (Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc), never %; sure acts show no chip.
- Cần row: every condition with its live status, unmet first (✗ red, saying what is missing), then met (✓ green):
  khắc `2 khắc (còn N)` (used+c ≤ 4), `Sức ≥20 (có N)` for acts over 1 khắc (`can`), `Bạc N (có M)`, buổi `Buổi tối (đang buổi sáng)`,
  "chưa làm trong buổi này", lãnh cung / còn sống / cấm túc (CRIME), and the act's own requirement from `ok()` + `ACT[k].x` / `LACK[k]`
  with evidence counts `(có N)` from `evG`. Producers: `cardH` and `rvGroups` wrappers put the list on the button as `data-kneed`;
  any other disabled button turns its reason (`.kwhy`/`guessWhy`) into a ✗ item. A requirement that `ok()` checks but no text names
  shows "điều kiện riêng của việc này chưa có" (to be named by the act owner).
- Disabled (`.kdis`): grey ground `#eee7da`, grey title, chip greyed; the Cần row (from `.kwhy` / `cardWhy` / `guessWhy` / `data-kneed`) replaces
  the rows that cannot apply (Mất and Kèm hidden; Tốn and Được stay so she sees what it would give). Never opacity below 1 on the text.
- Frame: `#fffaf0`, `1px var(--line)`, radius 8, title row with a `#e6d3ac` hairline under it; hover border `--gold`.
- Size: cards sit in CSS grids with `grid-auto-rows:1fr` → every card in a grid has the same height (the tallest one's), the
  same width; text wraps inside its row; nothing is clamped or cut (no `…`, no line-clamp, no ⓘ needed); the panel scrolls.
  Columns — act cards `.cards`: 3 at ≥1200px, 2 at 600–1199px, 1 under 600px. `.pcb` / `.rbtn`: auto-fill min 230/260px, 1 under 600px.
  Dialog `.opts`: auto-fill min 250px (1 column in the dialog), 1 under 600px.
- CSS is scoped to `button.ka`, `.kb`, `.kr*`, and to `.cards/.pcb/.opts/.rbtn:has(> button.ka)`; other kit parts are untouched.
- A gain that rounds to 0 is never shown as a gain: "Sắc +0" becomes "Sắc không đổi" in Ghi chú.
- Not converted on purpose: the tiny map hotspot chips (`.mspot .acb`, j41) stay chips so the map is not covered; their odds use `oddsChip`.

---

## 7. RESULT CARD (j63) — after every act and choice

`resultShow(title, before, ok)` (called by `wrapR`, options, servant/child/court acts) → `#rtoast.rtoast.karesult`:

```
[seal THÀNH (green) | HỎNG (red)]  act name                  title row, hairline under it
One short sentence of what happened, from the log of this act, rival names with their rank title ("Hoàng hậu Liễu Họa Mi").
Được  Sủng 8→17 (+9) · Ân tình 0→5 (+5) · Thái hậu: quý ngươi hơn (0→8, +8)                 green
Mất   Đức 30→26 (−4) · Hoàng hậu Liễu Họa Mi: ghét ngươi hơn (thiện cảm −15), ghen +25, oán +20   red, person name in ink
                                                     Xem đầy đủ ở Nhật ký   (link: opens the Nhật ký tab)
```
- Seal follows the outcome FOR HER, not the branch that fired: THÀNH (green) when things went her way; HỎNG (red) when the act
  failed; BẤT LỢI (red) when the net result is a loss (no gain and a real loss beyond Sức/Bạc, or the log says she was blamed/
  punished/exposed), e.g. petition "Trình lên Hoàng thượng… trách ngươi gây chuyện", Danh 52→44 → BẤT LỢI. Never THÀNH on a loss.
- Values are the REAL changes (snapshot before → now), never the option preview: no ranges, no "có thể", no repeated price line.
- One group per person; the two-way relation is ONE plain phrase (her feeling toward you; yours only if hers did not move);
  "Hoàng hậu với ngươi" merges into the queen's group. Lines with "→" lists, "thành:/kèm:" previews are never used as the sentence;
  a sentence that only repeats the act name is dropped.
- Rows are arrays: one fact per line (`.kitem`), never joined sentences; also exposed as `window.kaLastResult {title, ok, sentence, rows:[{k,label,items[]}]}`.
- Same `.kb` row grid and colours as the act card; no change at all → Ghi chú "không đổi chỉ số". Stays 9 s; tap closes.



---

## 8. PANEL KIT (j79) — ONE frame for every modal, panel and pop-up

Applies to EVERY `#modal` item (rules/help ⓘ, HUD help, "Tin trong cung", "Tai mắt báo tin", dilemmas/event choices, rewards,
Bổng lộc / Ân thưởng / Quẻ, Tranh ghế rounds, results, night, pregnancy, death/ending, Lãnh cung, Nội vụ phủ, Tuyển tú…),
the week summary (dawn) and the lesson overlay (`#ov .mg`). The person card modal (`.modal.pcm`) keeps `pcard` (section 3).

```
.dlg.kpanel[data-kind]
  .kph            sticky header: brocade band (img/kit/bg-default) + seal + title (+ sub line: date/when)
    b.kpseal.kp-<kind>   LUẬT rule · ĐIỀU info · TIN news · BÁO notice · VIỆC choice · KẾT QUẢ result · ĐÊM night · KIẾP end
                         MẬT BÁO intel · CẢNH GIÁC threat · CHỨNG CỨ evidence · BAN THƯỞNG reward · TUẦN week · TÀI NGHỆ game
    .kptitle / small.kpsub
  #mb > .kpb[.kphas]
    .kpsubj       ONLY when the panel is about a person: pframe (3:4 kit portrait) + rank-titled name. Never a room/place picture.
    .kpmain       blocks: .kpsec (h4.kpst label + content) · .kfacts · .kb rows · .ktiers · .kchips · .kpnote
  .opts.kpopts    options = ACT CARD frame (section 6)
  #mr > .kbtn     the ONE button (lacquer red, gold ring); `.kbtn.alt` = quiet secondary
```

API (data only, never markup):
```js
kitModal({kind:"news", title:"Tin trong cung", sub:when(),
  facts:[{who:v, text:"được lật thẻ bài đêm qua", chips:[["Sủng",3]]}, "Tháng này: Được mùa khắp nơi. Kho lúa +12."],
  sections:[{h:"Thang 4 mức", tiers:[{k:"30–59", n:"hại nhỏ", d:"Tung tin đồn, Dò la", c:"r"}]},
            {h:"Cách tính", rows:[["Nguy hiểm","Ghen, Oán hoặc ghét: lấy số cao nhất","t"]]}],
  opts:[{n:"…", fx:{…}, x:"Khá chắc · thành: … · hỏng: …"}],   // same option objects as Q items
  subject:person, btn:"Đã rõ", onClose:fn})                     // kitPanel(spec) queues without showing
```
Rules
- Header always: seal + title; the date/when goes to the sub line, never into the body.
- Picture only if it depicts the subject (the person speaking/affected via `subject`/`who`, or a specific item). `evArt()` room art,
  `--dart` backdrops and `pframeArt` are not drawn in panels.
- Body is structured: facts, rows, tiers, chips. No paragraph with several facts (section 9). Legacy `h` HTML is converted:
  first short `p.past` → sub line; prose → one fact per sentence; `p.past` with " · " lists → neutral chips; tables/rows keep the kit look.
- Deltas inside text become chips: green = gain for her, red = loss (sentiment via `kcls`: ghen +, oán + are red).
- One button style (`.kbtn`). Width 560 px (620 ≥1200 px), full width under 600 px; scrolls inside, header stays.
- Night (`.modal.night`) and end (`.modal.end`) keep their mood colours, same structure.

## 9. FACTS, ROWS, CHIPS, PEOPLE (j79)
- `kitFacts(facts,{group})`: `facts` = array of strings (split into sentences) or objects `{who, text, chips:[[label,n]], why, when, kind:"me"|"person"|"world"}`.
  Row = small face (or a gold dot for court/world facts) + the fact, the first mention of each person drawn as **rank title + name in rank colour**
  (`kitName`; the title is never doubled). With 4+ facts of 2+ kinds rows are grouped: **Ngươi / Người trong cung / Triều đình · thiên hạ**
  ("Tháng này: …" lines go to the last group, prefix dropped). Never pass a joined string of several facts from new code.
- `kitName(p)` · `kitTitle(p)` · `kitPersonLine(p,{sub,chips})` · `kitFaceH(p,size)`.
- `kitChip(label, n)` delta chip (sign + colour by meaning) · `kitChip(text,"ok"|"no"|"g"|"r"|"n")` status chip (✓ / ✗) · `kitChips(list)`.
- `kitRows([[label, value|[values], cls]])` = the act-card `.kb` grid (labels small caps `--k-lab`). `kitTiers([...])` ladders (rule panels).
- `kitTiles([[label,value]])` small stat tiles, 4 per row (scene panels).
- Tokens (j79 `:root`): `--k-hair #e6d3ac` hairlines · `--k-lab #8a7350` labels · `--k-card #fffaf0` · `--k-card2 #f6ead6` · `--k-seal #9a2c1c` · `--k-rad 8px`. The act card (j63) uses the same values.

## 10. INTEL LIST · EVIDENCE CARD · THREAT CARD (j79)
- `kitIntel([{about:person, fact:"html", src:person|"tai mắt", week:"Tháng 3 · Năm 1 · Thượng tuần"}])`: face + name + fact, small "Nguồn: … · when" line.
- `kitEvidence({what, against:person, proves, how, when, strength, acts:[{n, odds, ton, duoc, mat, kem}]})`: header (face, what, against whom),
  rows Chứng minh / Có được, then the actions it enables as ACT CARDS (gain/cost rows, odds meter).
- `kitThreat({who, how, sure:"Khá chắc", when, defs:[{n, odds, ton, duoc, mat, kem}]})`: red-tinted card; who (face + rank title, or "Kẻ chưa rõ mặt"),
  how, how sure (odds meter), when, then "Cách đỡ" defence options as ACT CARDS.

## 11. ODDS METER (j79) — the ONE chance scale
`kitOdds(word|percent)` → `.kodm`: 7 segments filled to the level, coloured red → amber → green, plus the word.
Ladder: Liều < Khó < Năm ăn năm thua < Khá chắc < Chắc < Rất chắc < Nắm chắc (`word()` thresholds 31/46/56/66/81/91). Tap → popover with the whole
ladder, current step highlighted (never a modal). `oddsChip()` draws it, so every act card / option uses it; the HUD chances (Có thai, Lật thẻ) use it;
`chanceLvl()` (old Rất thấp…Rất cao) now returns the ladder word. Never %, never "Chắc chắn" (sure acts show nothing). 0 → "Không có".
Death risks on scheme buttons are computed from the real formula (poison / kpoison / pond) and shown as "nàng chết: <word>".

## 12. GLOSSARY (j79)
`KIT_GLOSS` holds the plain meaning of every game term; `kitGloss(term)` draws it with a dotted underline, tap = popover. Delta chips and tiles
apply it automatically; HUD help (`HX`) reads the same text. Terms: Sủng, Danh, Đức, Sắc, Tài, Tâm cơ, Tai mắt, Ân tình, Sức, Bạc, Chủ tin, Lòng,
Ghen, Oán, Thù, Thiện cảm, Chứng cứ, Nguy hiểm, Quẻ / Quẻ tuần, Phục vị, khắc, Thị tẩm, Lật thẻ, Lãnh cung, Cấm túc, Bổng lộc, Ân thưởng,
Tranh ghế, Tuyển tú, Thế lực, Công lao, Kính sự phòng, Nội vụ phủ, Tân Giả khố, Thai, Cơ hội, Phúc duyên. A new term gets an entry here first.

## 13. MINI-GAME FRAME (j79) — for j82 and the lesson games
```js
box.innerHTML = kitGameFrame({art:"Cầm", title:"Tấu khúc", how:"Chạm đúng dây khi nốt chạm vạch đỏ.",
                              hud:[["score","Phần",0],["time","Thời gian","30 giây"]], id:"kgbox"});
kitGameSet("score", 12);                       // update a HUD cell
document.getElementById("kgbox-res").hidden=false;
document.getElementById("kgbox-res").innerHTML = kitGameResult({
  parts:[["Phần chơi 7/10","+21"],["Cầm bậc 3","+27"],["Tài 62","+19"],["Chuẩn bị","+8"]], total:75, place:"Nhì", of:4,
  rivals:[{who:v, score:80, sub:"tài nghệ 45 + chuẩn bị 8 + màn thi 27"},{who:S, score:75}],
  gains:[["Sủng",3]], losses:[["Sức",-10]]});
```
Header seal TÀI NGHỆ; "Cách chơi" line; HUD cells (`.kgc`); game box `.kgbox`; result rows (true numbers; "Phần chơi", never "điểm"), standings "Bảng định thứ" with face + rank title (the score `.kgrow>b` never wraps), Được/Mất chips.
In-game pieces keep the existing lesson-game classes (`.lanes`, `.lbtns`, `.simon`, `.memo`, `.goban`, `.mgopts`, p1.html) which are part of the kit;
game buttons use `.kgbtn` (or `.btn` inside `.kgbox`), `.on` = selected. The lesson overlay `#ov .mg` wears the same frame.

## 14. SCENE PANEL (j79) — identity card, opening story, title screen
- Compact translucent kit frame (`rgba(255,250,240,.90)` + blur) to one side in landscape (max 440 px / 44vw, vertically centred, right) and in the
  lower part in portrait; the background art stays visible. Fits ONE screen, no scrolling, buttons always visible (tested at the 4 sizes).
- Identity card ("Thân phận kiếp này"): portrait beside the text; name with rank title once; origin and age once; story sentence; stats as `kitTiles`
  (4 per row); one note line; the two choices side by side (ACT CARD frame). Header sub line: Phúc duyên.
- Any panel can ask for it with `kitPanel({scene:true, …})`.

## 6.1 ACT ART SLOT (j79, kit 2)
Every act card (`button.ka.kcard`) has its illustration on the LEFT in the SAME rectangular portrait frame and size as the consort card
(`kitArtFrame(src,label,cls,col)` → `.pcp.kit.kartf`, her own rank frame + brocade; box `--kaw`×`--kah` = 150×226 px, 120×177 px under 600 px);
art is 3:4, 384x506 (the frame's photo window). Rows on the right. Cards: one column on the Fold (min 440 px per card), 2–3 on wide screens.
Category colour (owner 11/14): the brocade is tinted, the photo window gets a coloured ring, a ribbon under the window names the category
(also `title` on hover), and the card has a 4 px left edge in the same colour. Legend (`KIT_CAT`):
| key | name | colour |
|---|---|---|
| giao-thiep | Giao thiệp | `#c4607a` |
| hau-ha | Hầu hạ | `#3f8f8c` |
| le-nghi | Lễ nghi | `#b8901c` |
| hoc-tap | Học tập · Tài nghệ | `#3f62a8` |
| ban-thuong | Ban thưởng | `#d98a1c` |
| trung-phat | Trừng phạt | `#5a3a2a` |
| muu-ke | Mưu kế | `#5a3f8f` |
| hai-nguoi | Hại người | `#7a0f14` (blood red) |
| nghi-ngoi | Nghỉ ngơi | `#5f9a5f` |
| buon-ban | Buôn bán | `#a8692a` |
| di-lai | Đi lại | `#7d8456` |
| cham-con | Chăm con | `#e08a6a` |
| trieu-chinh | Triều chính | `#22405f` |
Older text below (square slot) is replaced by this. Image = `img/act-<key>.webp` where `img/ACTS.json` `acts` maps the card title (or its slug)
to `<key>`; otherwise `img/act-cat-<category>.webp` when listed in `ACTS.json` `have`; otherwise the brocade tile with the category word.
Categories (`kitActCat(name)`): hau-ha Hầu hạ · hoc-tap Học tập · giao-thiep Giao thiệp · muu-ke Mưu kế · hai-nguoi Hại người · nghi-ngoi Nghỉ ngơi ·
buon-ban Buôn bán · le-nghi Lễ nghi · di-lai Đi lại. Art: square, painterly, same style anchor as portraits, ≤ 60 KB webp.
Grid rows: every card in a row has the row's height (fitted to content, `grid-auto-rows:auto` + stretch), no empty space from a taller row.

## 15. STAGE OVERLAYS (j79) — nothing on the stage covers a figure
- The status chips (`#hud2`) live in the header as its second row (`.hud2.khud`): collapsed = Buổi/khắc + Quẻ; expanded (▾) = every chip wraps
  in the header, which grows while the stage shrinks. Never an overlay on the stage.
- The date shows ONCE (header line), in the wording guide's words; the duplicate date chip is hidden. Every "T3/1" text anywhere (logs, news,
  intel, summaries, old saves) is rewritten on screen to "Tháng ba · thượng tuần · năm thứ nhất" (`kitDate(m,y,tuan,buoi,full)`; uses `VP.date`
  from j84 when present).
- The place title on the stage is the NAME only; the place description line is dropped for every place (a visit message stays, wrapped).
- No truncation: header name/date, Hoàng thượng box, stage name tags, face labels wrap (no ellipsis, no line-clamp).
- Test: Pixi figure bounds vs every `.stop` overlay rectangle must not intersect (stage.js in the kit owner's scratchpad; numbers in the report).

## 16. INTEL + EVIDENCE PANELS (j79 over j78 data)
- Person card: "Chứng cứ N ›" chip → `kitEvidencePanel(v)`: subject portrait, every piece as an evidence card (what it proves, how, when), then
  "Dùng chứng cứ" acts (`evidenceActs(v)`) as ACT CARDS (closed ones show the reason in Cần); tap runs `evidenceDo`.
- "Đã biết: N tin ›" chip → `kitIntelPanel(v)`: `kitIntel` rows from `intelOf(v)` (+ old `S.notes`), one fact per row with source and when;
  a fact that is no longer true carries a "nay đã khác" chip. The old one-line "Đã biết: a · b" is gone.

## 17. WORDING
Player-visible text follows dev/kit/VANPHONG.md (j84): the single confirm button reads "Đã hiểu", close reads "Lui"; dates as in section 15;
no %, no "điểm/chỉ số", no English. Kit row labels (Cần / Tốn / Được / Mất / Kèm / Ghi chú) and tab names are read from the live UI; the kit never
hard-codes tab labels.

## 18. KIT REVIEW: review/act-cards (j63) — ADOPTED
j63 (act card + result card, final head 1388289) is part of the kit: same tokens as the panels (`--k-hair`, `--k-lab`, `--k-card`), Cần row first
(drawn by j79 as ✓/✗ status chips), rows Cần / Tốn / Được / Mất / Kèm / Ghi chú, the odds chip is the 7-step meter, no clamping.
Kit-owner additions on top (j79): act art slot (6.1); per-row equal heights fitted to content; columns follow the real grid width (max 3, min 280 px);
"; " in a price line splits two values; Sức rule in Cần follows `SUC_FLOOR` (j80); scheme ok() conditions all have words (`LACK`); death risks as
ladder words from the real formulas; "có thể gặp người" → real words.


## 19. KIT 2 (kit owner #2, owner feedback 11/14)
- INFO ART: every rule / info / help panel (`data-kind` rule|info) shows a representative picture in the same frame (`.kpsubj.kpiart`) left of the
  structured body. `img/info-<key>.webp` (384x506) when listed in `img/INFO.json {"have":[keys]}`; else act-category art; else tinted brocade + topic word.
  Keys (`KIT_INFO`, title regex → key): nguy-hiem, ra-vao, que, bong-loc, an-thuong, sac, tai, tam-co, duc, tai-mat, thai-hau, hoang-hau, long, an-tinh,
  khac, lich, thai, lat-the, lanh-cung, cam-tuc, tranh-ghe, tuyen-tu, noi-vu, tan-gia-kho, phe-phai, chung-cu, suc, bac, phuc-duyen, tin.
  HUD help panels use the rule layout: "Là gì" row + "Ngươi đang có" (the live chip / meter).
- IDENTITY CARD ("Thân phận kiếp này"): her FULL-BODY figure (`figFor(S)`, `img.kidfig2`) stands on the origin background; the panel sits beside her
  (landscape and wide portrait: figure left, panel right, ≤54–58 vw) or under her (portrait < 600 px: figure above, height = space above the panel).
  Panel: name with rank title, origin · age, story line, tiles 2 per row, note, the two choices. Hooks kept for j86: `.kpid` (gets `.kpidf` when the
  figure shows; its portrait is hidden then) and `.kpnote`. A stale result toast is dismissed on every scene panel.
- STATUS (`#hud2`): expanded = columns by purpose (`.khg > .khc`): Tư chất (Sắc, Tài, Tâm cơ, Đức, Tai mắt) · Nhân tâm (Thái hậu, Hoàng hậu, Lòng) ·
  Ân sủng (Thai, Lật thẻ, Ân tình, Ân thưởng) · Thời gian (buổi/khắc, Quẻ, Bổng lộc) · Tình trạng (anything else); 4 columns, 2 under 600 px.
  Collapsed = Buổi/khắc + Quẻ in the header, and a Tư chất block (`#kstat`) on the stage top-left (or top-right) ONLY when it covers no figure —
  measured against `kitFigRects()` (her `#mefig`, every `#tokens .tok img.figimg`, using the opaque art box from j59 when known) on every render.
- STAGE NAME TAGS: one line, never cut (`white-space:nowrap`, no max-width), smaller under 600 px, so they never stack over a child's figure.
- SELECTION OUTLINE: `.ksel` = 3 px `--k-sel-ring #a8740c` outline + 7 px `--k-sel #fff3c4` halo + soft glow (face picker, picked options).
- WORDING: no "có thể" in previews/results — every chance is a ladder word from the real formula (`word(n)`), every effect its true delta
  (AOUT death/miscarriage/heir lines are computed for the card's target: `kitTgt()`).

- STATUS SHEET (kit 2): the expanded status is a SHEET laid over the lower panel (`#hud2 .khg`, fixed, placed from `#panel`'s box, header "Tư chất ·
  trạng thái" + "Thu lại"); the stage never shrinks or gets covered when it opens. Collapsed by default.

## 20. TAB GROUPS + SUB-TABS (kit 2, owner 11/14: 8 bottom tabs)
- Bar: Hành sự · Dư đồ · **Hậu cung** (Phi tần · Giao tình · Phe phái) · Cung nhân · Hoàng tự · Tư trang · Tài nghệ · **Mệnh truyện** (Mệnh truyện ·
  Việc nhờ · Sổ ghi). The game's tab keys stay (`rv rel fac story nho|quest|req log`); hidden member buttons stay in the DOM so `[data-tab="log"]`
  links keep working. Group table `KG`; a module adding a tab to a group adds its key there.
- SUB-TABS = the ONE segmented control `.ksub > .ksubb(.on)` (sticky at the panel top); labels are read from the live tab buttons (j84 wording).
  The last sub-tab per group is remembered (`localStorage hclh-kg-<group>`). Servant mode keeps its own tabs (no grouping). `tabsFit` (j57) stays
  the bar rule: one font size, 8 columns (2 rows of 4 under 700 px).
- Person-card group tabs show "làm được / tổng": `Hại nặng 2/5` (title: "làm được 2 trên 5 việc").

## 21. SKILL CARD (kit 2) — Tài nghệ and Tứ đức
`kitSkillCard({kind:"art"|"vir", k, name, level, max, prog:[cur,need], desc, levels:[text per level], acts:[pbtn…], note})`:
picture LEFT in the shared portrait frame (`img/art-<k>.webp` / `img/vir-<k>.webp` when listed in `img/INFO.json` have as "art-cam", "vir-cong"…;
else act-category art), info RIGHT (name, "Bậc l/max", progress bar with numbers, one row per level: ✓ đã có · bậc kế · chưa mở), act buttons BELOW
(act-card frame). Every art and every Tứ đức course uses it; the arts tab (`artTabHTML`) is built with it. Keys: art cam ky thi hoa vu y theu nau ·
vir cong dung ngon hanh. No ranges: lesson progress is "the parts scored in the lesson game" (self-study 6 in 10).

## 22. PERSON STATS (kit 2)
Every consort card shows the player's stat set as kit tiles under the portrait (`kitPersonStats(v)`): Sủng · Đức · Danh · Sắc · Tài · Tâm cơ; unknown
values read "chưa rõ". Reveal hook: `window.kitStatKnown(v,key) -> true|false|null` (j61/j85 Đức stages, intel); `kitStatReveal(v,key)` records a
reveal in `S.kstat`. Defaults: Sủng from the Kính sự phòng book (`S.kf`), Danh public, Sắc once met, Đức via `ducKnown(v)` when present.
**Danh is public** (j61, kit review 11/14): Danh = tiếng tăm trong cung, what the whole palace says about a person, so it is the one number
shown even for a stranger (stage 0 "Người lạ"); every other tile reads "chưa rõ" until the matching reveal.

## 23. PORTRAIT PICKER (kit 2)
`kitPicker({id, title, items:[{k, face, label}], cur, filters:[[key,label]], filter, rows:2, note, onPick(k), onFilter(key)})`: small rectangular
kit frames (no tassels), whole rows only in pages (‹ ›, "trang 2/4 · 32 dung mạo"; no inner scroll, no half row), selection = gold ring +
✓ badge on a pale-gold tile (`.ksel`), radio semantics, arrow keys + Enter/Space. Filter tabs = sub-tab look. j86 (face pick on the identity
card) uses it with `facePool(filter)` (84 faces, filters Phi tần / Cung nữ) when present, else the 32 consort faces; the standing figure follows.

## 24. VEIL OVERLAY (kit 2, for j70 scars)
`scarOf(p).veil` → the veil is drawn over the face in every tall portrait (`.kin > img.kveil`, over the portrait image box), every small frame
(`.kmini > img.kveil`) and on the stage figure (`.tok > img.kveilf`, at the head of the figure's opaque box from j59: 4–15 % of body height,
middle 40 % of its width). Assets: `window.KIT_VEIL = {por, fig}` (empty until review/wardrobe delivers the pearl-string veil; the old
img/veil*.png is rejected). Status chips such as "Hủy dung (vừa) · còn N tuần" use `kitChip(text,"no")` / `chip(text,"hot")` only.

## 25. DILEMMA OPTIONS WITHOUT RISK DATA (kit 2)
`dilLine` derives the rows from the option's own outcome code: each `roll(N)`-guarded `apply/ap(S,…)/die` → "<effect>: <ladder word>"
(gain → Được, loss → Kèm), unguarded `apply` → certain; a `roll(expr)` that can be evaluated gives the main odds word. "Khó lường" is gone.

## 26. HONOUR PODIUM · BỤC VINH DANH (j90, kit owner, owner 11/14) — screen 1 of every ranking result
Applies to EVERY ranking board of the game ("một lời phàn nàn là cả nhóm"): every contest that plays the j82 mini-game (`startContest`: j71 hội thi,
festivals, tranh tài…), Tranh ghế result (j34), hoàng tự khảo thí (j53 `.ktlist`), công chúa dâng nghệ (j54 `.h54list`), and any new ranking
(tuyển tú with a ranking, thi tài…) through the API below. Two screens: **screen 1 = the podium alone**, full screen, only the winners;
"Tiếp" → **screen 2 = the existing score board / result panel, unchanged** (`kitGameResult`, kit panel). The podium is never mixed into the board.

```
#kpodov (fixed, z 9000) > .kpod[.kpod-win when she is Nhất]
  .kpod-hd > .kph   seal VINH DANH (gold) + contest title + sub
  .kpod-stage       backdrop img/kit/podium-bg.webp (red drapes, gold clouds, no people). NO rays / halo behind anyone (owner 11/14: "giống hào quang")
    .kpod-col.kpod-p2 | .kpod-p1 | .kpod-p3      DOM order Nhì (left) · Nhất (centre, highest) · Tam (right)
      .kpod-fig     FULL-BODY figure (fig-*.webp for her dress tier and age via figFor; kids via kidFigSrc); stranger = img/kit/unknown-fig-f|m|k
                    (kitKnown false → name "Người lạ"); no figure art → the kit's tall 3:4 frame (`kitPortrait(p,{size:"lg"})`). Never a round avatar.
                    Per place a soft STAGE LIGHT (`--kl` colour): .kpod-beam = soft spotlight falling from above onto the person (in front, screen blend, faint),
                    .kpod-pool = oval pool of light at the feet on the step, .kpod-motes = a few small floating motes. Nhất warm gold, Nhì soft silver-white,
                    Tam pale copper-rose; higher place = a little brighter; all subtle. Her own column: a little brighter + "Ngươi" tag ("Con ngươi" for her child).
      .kpod-step    lacquered dais block (img/kit/podium-step.webp, border-image), Nhất step highest, Nhì middle, Tam lowest (heights fitted to content)
        .kpod-medal img/kit/medal-1|2|3.webp (gold / silver / bronze cloud medallion with tassels) + word Nhất / Nhì / Tam
        .kpod-plq   cream kit plaque: rank title + name (kitName, rank colour), sub (e.g. "Xuất sắc"), score "N phần", prize (kitChip or text, green)
  .kpod-ft          her place when she is not in the top three ("Ngươi đứng thứ 5 trong 5 người · 18 phần") + the ONE kit button "Tiếp" (.kbtn)
  .kpod-fx          confetti layer
```
Motion (CSS + Web Animations, transform/opacity only): Tam rises at 0.3 s, Nhì 1.0 s, Nhất 1.8 s (step grows, figure drops in, its light fades in).
The celebration FOLLOWS HER, whatever her place: paper + petals in her place colours (Nhất red-gold + plum petals, Nhì silver-white, Tam copper-pink) burst
from HER figure when her column appears and fall over HER step, then a light petal fall over her step; at Nhất a little stronger (second burst, longer fall).
Outside the top three: only the place lights, no confetti. Tap anywhere (not the button) = skip to the final state; Enter/Esc = skip, then Tiếp.
`prefers-reduced-motion: reduce` → final state at once, no motes, no confetti.
Layout: figures sized by the free height (`--kfh`, Nhất 100 %, others 84 %), never cover the plaques; plaques wrap text (no truncation), no horizontal
scroll; tested 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2 (shots dev/shots/podium/).

API (data only):
```js
kitPodiumShow([{who:person, score:75 /* or "8.5 phần" */, place:1, prize:[["Sủng",8],["Danh",3]] /* or "Phong Tần" */, sub:"Xuất sắc"}, …],
              {title:"Hội Thượng nguyên", sub:"Môn Thơ", next:"Tiếp", onNext:fn});   // ≥ 2 entrants, else nothing shown
kitPodium(list,o)            // HTML only (no overlay)
kitPodiumTag(qItem,list,o)   // a Q item shows the podium first, then its panel (non-enumerable: never saved)
kitFigOf(person)             // full-body src (figure, kid figure, or stranger silhouette)
```
Art: Magnific gpt-2-6, 1 style ref (face-consort-01), folder ba4aecfe…; no faces. medal-1..3 (240 px, keyed), podium-step (512x384), podium-bg (1344x752).

## 27. WEEK REPORT FLIP-BOOK (j87) — `kitBook({pages,onClose})`
The week summary (dawn) is an old ledger she turns page by page. j87 replaces the j79 week panel; "Vào ngày mới" on the closing page
(button id `dawn-go`) closes the book and the day goes on as before. "Lui" in the bar closes it at any page.

Pages (data only; kitBook never takes markup for structure):
```js
kitBook({head:"Sổ tuần · Tháng tư · thượng tuần · năm thứ nhất", host:el, onClose:fn, pages:[
  {kind:"cover",  title:"Sổ tuần", sub:"<date>", note:"Hạ · nắng gắt"},
  {kind:"text",   title:"Tổng lược", sub:"…", blocks:[{h:"Quẻ tuần"},{rows:[[l,v,cls]]},{chips:[["Sủng",3]]},{facts:[…]},"html"]},
  {kind:"person", who:v, chips:[["Thiện cảm",5]], rows:[["Hiện nay",[…]]], blocks:[{facts:[…]}]},
  {kind:"end",    title:"Tuần này đến đây là hết.", seal:["HẾT","TUẦN"], note:"Sổ ghi 12 việc, 4 người.", btn:"Vào ngày mới"}]})
// → {next(), prev(), go(n), close(), cur, max, mode, relayout()}
```
- Blocks use the kit pieces only: `{h}` section label (`h4.kpst`), `{rows}` = `kitRows`, `{chips}` = `kitChips`, `{facts}` = `kitFacts` (one block per
  fact so a page can split between rows). A heading never ends a page.
- Week content (`wkBookPages()` from the saved log since `S.wkSnap`): cover → **Tổng lược** (date, tiết, Quẻ tuần rows, her deltas as chips,
  rank/children, Bổng lộc row "Đã lĩnh …" or "Kỳ tới: còn N tuần", "Sổ này ghi" = names with faces, "Việc của ngươi" facts) → **one page per person**
  (Hoàng thượng first, Thái hậu, then by number of facts): large kit portrait `pframe` (3:4 frame with tassel), rank title + name, this week's
  delta chips (Thiện cảm / Ghen / Oán from the per-person snapshot `S.wkSnap.pp`; Sủng on the Emperor's page), "Hiện nay" row, facts →
  **Triều đình · thiên hạ** → closing page. Sentences without a name follow the previous sentence of the same log line; repeated lines show once
  with a "N lần" chip.
- Fit: pages never scroll. Each page is filled in an off-screen measure page of the real size; what does not fit continues on the next page
  with the title + "tiếp theo". Re-paginated on resize/rotation (keeps the current page).
- Layout: two-page spread when the viewport is ≥ 900 px wide and landscape (iPad 1180x820, 1366x1024), the closed cover centred; one page at a
  time otherwise (Fold 755x1000, phones). Person page: portrait column `--por` beside name/chips/facts; under 440 px page width facts run full
  width below the portrait. Font scales with the page (`--fs` 13–17 px).
- Turning: drag/swipe follows the finger with a 3D turn (`perspective() rotateY`, shading on both faces, cast shadow on the page beneath);
  release past ~40 % or a flick completes, else it falls back. Tap the right/left page edge, the ‹ › buttons, ←/→/PageUp/PageDown, Esc = Lui.
  `prefers-reduced-motion` (or Cảnh động off): cross-fade instead of the turn. Soft paper sound with the Tiếng động slider.
- Art: `img/book-cover.webp` (indigo thread-bound cover, title label strip: the title is written in it, word per line), `book-right.webp`
  (right/single pages, stitches on the inner left edge), `book-left.webp` (left pages of a spread, stitches on the inner right edge),
  `book-end.webp` (closing page; the HẾT TUẦN seal is placed in its seal box). The art is stretched to the page; content sits inside the red
  double border. Without the art: CSS paper with a red double rule and a CSS cloth cover (same layout).
- Event art (j89 `evArtOf`): every fact row of the week (Việc của ngươi, person pages, Triều đình · thiên hạ) carries a small 3:4 print of its
  event on the right (`.kbk-ev > .kfacts + img.kbk-evart`, 3×4 em, cream mat, thin red line, slight tilt). The sentence picks the event id
  (`kbkEvId(text, ctx)`: thị tẩm → sys:thi-tam, có thai → sys:co-thai, đầu độc → plot:poison, tin đồn → plot:rumor, Được mùa → qs:mua, sứ thần →
  qs:cong …); a sentence with no match takes its page's context (world → triều chính, Hoàng thượng → sys:mood-vui/gian, Thái hậu → thỉnh an,
  others → có người đến chơi). No manifest yet → no print (the row stays as before).
- "Hiện nay" row: each "label number" pair never breaks inside (`.kbk-pair` nowrap; pairs wrap as wholes). Page < 440 px: the row moves under the
  portrait (first block of the full-width flow).
- While the book is open nothing covers it: the floating result card (`#rtoast`) is dismissed when the book opens and hidden while it is open.
- Re-measured when the web fonts finish loading (no early page break from fallback-font metrics).
- Book art is published from the 768x1024 originals (no blur at @2/@3).
- Wording (VANPHONG): Sổ tuần, Tổng lược, Bìa sổ, Trang N / M, tiếp theo, Tuần này đến đây là hết., seal HẾT TUẦN, Lui, Vào ngày mới.

## 28. KIT 2b (kit owner #3, owner feedback 11/14) — `dev/build/jk2b.js`, loaded just before j84
### 28.1 PERSON CARD PORTRAIT CELL (one cell for everyone)
- Every `.pc` (consort, servant, child, court, men…) draws its portrait in ONE cell: the whole frame canvas from its top edge down to the end of
  the band (canvas x 0–550, y 0–795, aspect 550:795). The crest room above the photo window is always kept (Hoàng hậu's phoenix, the Emperor's
  dragon, Thái hậu's phoenix show whole; low ranks simply show brocade-free headroom). The pendant/tassel is not drawn in the card.
- Cell width `--kpcw` is the same for every card on a screen (`clamp(150px,34vw,230px)`; ≥1000 px `clamp(170px,17vw,230px)`), so the photo window
  (384x506 canvas units) has the same size for every rank and role. Nobody sets another size.
- Layout: portrait floats left; name, rank title, ghen line, stat tiles and the info rows sit beside it; act groups run full width below.
  The Fold (755x1000) shows portrait + name + rank + the first info rows without scrolling; the card scrolls as one block (`.pc` overflow).
### 28.0 ONE FRAME FUNCTION (owner 11/14 B) — `pcPort(face)` everywhere
- Every portrait frame — person card, dialog subject, act-art frame, small frames in face strips (Bảng phẩm vị, pager), header, Hoàng thượng
  box, chips, facts, podium, week book, strips — is the SAME `pcPort` cell (j60 layers on the 550x1037 canvas). `mdH(face,size)` calls pcPort
  and shows the same cell at a smaller width (`span.md.kit.kfc`, xs 26 px · sm 38 · default 60 · big 84; aspect 550:795). No other frame
  markup exists (the old cropped `.kmini` body frame is gone). A change to the frame shows at every size.
- Cell = canvas x 0–550, y 0–795: crest room on top, photo window, band; the pendant/tassel below is drawn only where the full canvas shows.
- Portrait cut (C1): the por picture is 1.14x the window, raised 5 % of its height and clipped to the window (head near the top edge, the
  person larger); old `face-*` art and the grey silhouette keep the plain window.
- Crests (C2): every rank and role has its own crest on the top bar, `img/kit/crest-<key>.webp` (gpt-2-6, one style reference = the approved
  Hoàng hậu frame; sheets in Magnific folder ba4aecfe…): consort-0 plum sprig (wood) · consort-1 orchid (green lacquer) · consort-2 silver lotus
  · consort-3 clouds + pink lotus · consort-4 small luan + chrysanthemums · consort-5 luan + red peony · consort-6 small phoenix + amber ·
  ONE top ornament per frame, never two: the small motif painted at the top centre of consort-0..5 and unknown frames was removed from the
  frame picture (corners kept) and the crest stands on the bar; frames whose painted top is already a full crest keep it and get no extra crest
  (Hoàng hậu phoenix, Hoàng thượng dragon, Thái hậu, Thái tử, HQP twin phoenixes, guard tiger, prince qilin, princess phoenix + peach, royal python,
  official crane, physician bamboo, man jade disc, cold plum, head eunuch cloud). maid-0..4: a flower/bell spray standing ON the silk bow painted on
  the maid frame (jasmine + jade bead → jade plum → silver plum + silver bell → silver plum + jade bells → gold plum + pearls); ma ma 0..4: silk
  bows on the cartouche; eunuch 0..2: jade ring above the whisk. Width grows with rank (300→432 canvas units for consorts), base on the top bar (y 172).
  Data: `KIT_CREST` {ar, base, w, key(frameUrl), html(frameUrl)}; a new role adds its crest here.

### 28.2 STAGE SCALE — owner is j59 (main) since the main merge; jk2b's scaler is retired (section 16 of jk2b). j59's height cap raised to 90 % of the stage (owner A). Text below kept for history.
- `kitStageScale()` after every `renderStage` + resize: every adult figure (her `#mefig`, every `#tokens .tok.fig img.figimg`) gets the SAME height
  `--kfig` (all fig-*.webp are cut head-to-hem on 900 px); children keep their j73 age ratio of that height. Feet on the floor line `--kfb` (26.3).
- Height (owner A): the figures fill the stage — feet on the floor band near the bottom (KIT_FLOOR feet line 90 % of the way from the floor
  top to the picture bottom), head ~2.5 % under the top edge; room under the feet for the name tags.
- Nobody is cut at the stage edges: a last check (`kitStageEdge`) shifts the group inside a 6 px margin, else shrinks everyone once more.
- Crowded row: neighbours may overlap by 20 % (36 % for a crowd) of a figure's width (a group, sleeves overlap); beyond that everyone shrinks by ONE common factor.
  When she is on stage with others she stands at the left and the row takes the rest of the width.
- Name tags hang under the feet (absolute, one line, never cut). When neighbours would touch, tags drop to 2 or 3 staggered lines and the
  floor band grows to fit them.
### 28.3 STAGE FLOOR
`KIT_FLOOR[picture] = floorTop` (fraction of the room picture where the floor starts); the crop keeps the floor; `--kfb` feet bottom, `--kfh` room
for the figure. Phone portrait: stage 40 % of the screen on scene tabs, 24 % on card tabs (Hậu cung, Cung nhân, Hoàng tự) so the card has room.
### 28.4 TRONG CUNG BLOCK (Hoàng thượng · Thái hậu · Hoàng hậu)
- `kitCourtHTML(cls)` → `.kcourt`: per person a row = small kit frame (`mdH xs`) + name + "Tâm trạng <word>" + "Với ngươi <word>" (green/red/neutral
  `.ef`), "chưa rõ" when unknown. Tap a row = that person's card (Hoàng thượng `showEmp`, Thái hậu → Giao tình on her, Hoàng hậu → Hậu cung on her).
- Header chips (owner E): Thái hậu and Hoàng hậu chips (`#kcchips .kcchip`: mini frame, title, mood) beside the Hoàng thượng box on wide screens
  (≥1000 px), at the right end of the status row on the Fold and phones. Tap = card.
- The full table is a "Trong cung" column in the status sheet (`#hud2 .khg`). Nothing of it is on the stage; the Tư chất block also left the
  stage (it is in the sheet: "▾ Tư chất").
- Hooks (data only): `window.kitCourtMood(who)` → text|[text,"g"|"r"]|null, `window.kitCourtKnown(who)` → bool (who = emp|th|hh). Default: the
  Emperor's mood is public (MOODS), Thái hậu / Hoàng hậu moods "chưa rõ" until a module says; attitudes from Sủng / `S.th` / `S.hh` (`affW`).
### 28.5 "COVERS NO FIGURE" = the painted silhouette
`kitFigRects()` (j79, replaced in jk2b) returns per figure 24 horizontal bands with the opaque extent of the art (alpha mask read once per picture),
so stage blocks may stand beside a head or between figures, never over the painted body. Used by #kstat, #kcourt and every later stage overlay.
### 28.6 OPTION MODE "cost" (hidden outcomes for EVENT choices)
- Event choices (weekly events j68, Mệnh truyện chapters j67, side events, dilemmas) show ONLY the cost: the Tốn row with Sức / khắc / Bạc
  (`.ka.khideout`); no Được / Mất / Kèm / Ghi chú rows and no odds meter. No cost → "Tốn: không". Conditions (Cần row) stay.
- The result card (section 7) is unchanged and shows the true numbers after the choice.
- ON BY DEFAULT for event choices at the shared builders (`kitIsEventChoice`): every item made by `pushDil` / `pushFront` / `mkP` (it carries
  `pid`/`pp`: j68 weekly events, j67 chapters, side events, j70 dilemmas, j96/j97 story lines, any later module) and every kit choice panel
  (`kit.kind:"choice"`). Opt-out `showOut:true` is for non-event panels only.
- Use (data only): `Q.push({…, hideOut:true, opts:[…]})` / `kitModal({…, hideOut:true})` hides every option; `{n, fx, x, hideOut:true}` one option;
  any other priced button: `data-khide="1"`. Normal act cards, person-card acts and shop buttons never use it.

### 28.7 PERSON CARD: portrait and bars always in view (owner D)
- Left column = portrait cell, name, rank title, the BARS (`.kpbars`: Ghen, Ngươi với nàng · thiện cảm, Oán, Nàng với ngươi, Sủng).
  Right column (`.pcr`) = facts (`.kpfacts`: stat tiles, age, nature, chips) → act-group tabs (`.pctabs`) → act cards (`.pcb`).
- Screens ≥600 px (Fold, iPad): two columns; the left column is sticky (own scroll if taller than the card) while the right one scrolls, so the
  bars stay visible next to the buttons; facts, act tabs and act cards sit in the right column beside the portrait for EVERY card (consort,
  servant, child, court).
- Phones (<600 px): portrait left with name, rank and bars beside it; facts, tabs and act cards below. When the portrait scrolls out, a slim
  sticky strip (`.kpstrip`: small frame, name, rank, the same bars) stays at the top of the card.
- After an act the bars run from the old value to the new one (0.6 s, `KIT_BARW` remembers the last width per person and bar; none with
  prefers-reduced-motion). j93 kit-motion may replace the easing, not the markup.

### 28.8 VEIL + SCAR LAYERS (review/wardrobe j92)
- Layer order everywhere: portrait < scar strokes (`img.kscar`) < veil (`img.kveil2`) < frame. Placed per picture from `KIT_SCAR.fit` /
  `KIT_VEIL.fit` (`style(file,tier)`); the por-* boxes were re-derived from the fig-* boxes through the porcrop geometry (the por pictures were
  re-cut after the fit was measured). No fit data → nothing drawn (never a guessed place).
- Tall frame and small frame: `.kfxc` (clip = photo window) > `.kfx` (box of the por picture, same 1.14x cut as the portrait); stage figures:
  `.kfxf` box laid over the figure image (idle animation off on that figure).
- Scar only when the player knows (`KIT_SCAR.on`: herself or j70 `knows(p)`, or `p.scar.known`); a veil is public; never on the grey silhouette.
### 28.9 DELTA CHIPS + WORDING
- `kpChipify` (jk2b): a delta chip takes the whole short clause before the number (up to 6 words, stops at punctuation): "nhà Hộ bộ thế lực −2";
  linking words in front (và, được, mất, khiến, nên…) stay outside the chip.
- Contest tables are titled "Bảng định thứ" (any old "BẢNG ĐIỂM / Bảng điểm" is rewritten on screen by VP).
### 28.10 EVENT + STORY ART (j89 evArtOf / stArtOf)
- Event choices, news panels ("Tin trong cung"), story/chapter cards: the picture goes in the kit art frame (`kitArtFrame`, `.kpsubj.kpiart.kpev`)
  left of the body, unless the panel is about a person (then the person's portrait, section 8).
- Picture (data only, first match): `item.art` · `item.stArt:[arc,beat,ending]` → stArtOf · `item.evId` → evArtOf(id, week) · `item.pid` (+`pp.id`)
  → evArtOf("<pid>:<id>") · news → evArtOf("news:<title>") · default category. Label = `evArtTitle`.
- The result card right after an event choice shows the same picture small on its left (`#rtoast.kevres > .kpevr`).
- Merged review/event-art dd2f253 (96 st-* story pictures, EVENTS.json stories, j89 stArtOf).
### 28.11 IDENTITY CARD + REINCARNATION BACKGROUND (owner item 6)
- The origin picture (`img/bg-origin-<k>.webp`) is no longer the backdrop: it sits in the kit art frame `.kpidart` (kitArtFrame) — landscape:
  frame left, facts right; portrait/Fold: frame on top, facts below. Her full-body figure still stands on the background.
- One shared background for every reincarnation screen: `img/bg-reborn-p.webp` (portrait 1200x1602) / `img/bg-reborn-l.webp` (landscape 1920x1080),
  gpt-2-6, no people (moon with the wheel of rebirth, jade bridge, lotus lanterns).
### 28.12 kitRoulette (owner item 6b) — origin wheel at a new game and at rebirth
`kitRoulette({items:[{k,src,name,rare}], target, toEl, done})`: overlay on the reincarnation background; grid of origin tiles (art frame, name,
rarity chip from j69 weights: Rất hiếm / Hiếm / Thường gặp); a gold light runs tile to tile with ease-out timing and a soft `sfx-tap` tick, stops on the
pre-rolled origin (j52 seed + j69 weights; the wheel never decides), the tile flashes gold, flies to the card's art frame while the card slides in
(landscape from the right, portrait from below). ≈4.5 s, tap skips, prefers-reduced-motion = card at once. Hooked on `nlCard` (start() → nlBegin →
nlCard, used by "Bắt đầu kiếp mới" and the rebirth after death), once per rolled life. Test hook: `window.__kroulHold` / `__kroulGo()`.
### 28.13 kitItem — ONE item tile (KIT READY)
`kitItem({src, name, grade:0..4, qty, label:[text,"ok"|"no"|"n"], on, empty, size:"sm"|"md"|"lg", data, tip})` → `.kitem` (52 / 72 / 104 px).
Simple frame (not the portrait frame): square box, 2 px border + radial ground in the grade colour (`KIT_GRADE`): Thường `#9a8a78` · Tinh phẩm
`#3f8f6a` · Trân phẩm `#3f62a8` · Tuyệt phẩm `#7a4fa0` · Ngự tứ `#b8901c` gold with a red inner ring and a small red "御" seal. Under the box:
name (wraps, never cut), grade word, optional status chip; `qty>1` → "×N" badge; `on` → "Đang mặc" band; `empty` → dashed empty slot.
Picture: `kitItemSrc(k, fallback)` = `itemArt(k)` (j98, review/item-art) → `WD_ITEMS[k].icon` (wd-*) → fallback. Use it for every item anywhere:
chest, Tư trang, wardrobe slots, reward chests, peddler, works, reward panels. Nobody draws another item box.
### 28.14 WARDROBE K1 + K2 (review/wardrobe j92)
- K1 `kitWearSlots(p,{size})`: two kitItem tiles (Trâm cài · Y phục, empty = "Chưa cài" / "Thường phục") right under the portrait on EVERY person
  card (player, consorts, maids, ma ma, Thái hậu…), and on Tư trang. The outfit status chip (Đúng phẩm / Vượt phẩm / Quá giản dị / Phạm tang) shows
  only when the player knows it (`wdSlots().label`). Tap: her own → Tư trang on that slot; someone else → item panel (name, grade, giver, status if
  known, where the "Hặc ăn mặc sai phẩm" act is). Replaces j92's temporary "Trâm: … / Y phục: …" chips.
- K2 Rương đồ (Tư trang, `wdInvHTML` rebuilt with kit parts): "Đang mặc" (K1 md + status chip + collection line) with act cards Tháo / Tự chọn đồ /
  Chải chuốt; "Rương đồ" with sub-tabs Trâm cài N · Y phục N (`.ksub`), a grid of kitItem lg; tap an item → its facts + act cards Mặc / Tặng /
  Bán lén / Cầm cố (Ngự tứ: disabled with the reason); "Đang cầm cố" tiles with Chuộc lại. All acts are j92's (`data-wd`), priced as act cards.
### 28.15 PERSON CARD after review FAIL 5b81408
- Screens 600–999 px portrait (Fold) on card tabs: stage 22 % of the screen. Left sticky column order: name, rank, BARS, portrait, wear slots, facts;
  right column: act tabs + act cards. Fold 755x1000 without scrolling: name y≈585, bars 630–733, first act card 679–793 (measured).
- `.kpstrip` (small frame, name, rank, bars) turns on below 1000 px whenever the bars are out of view.
### 28.16 kitName: no doubled title
`kitTitle` returns no title when the name already starts with it or with any role word (`KIT_ROLEPRE`: Thái y, thái giám, tổng quản, quan, thị vệ, vương gia, nhạc sư, công tử, ma ma, cô cô…).

## 29. SETTING CONTROLS · SLIDER / TOGGLE / TEXT BOX (jkitctl, kit review 11/14) — KIT READY: slider/toggle/input
Every setting control of the game uses these three (no browser-default range, checkbox or monospace text box anywhere). First user: Thiết lập
(title screen; ☰ in the game opens the same screen, so it is also the in-game Thiết lập). Each keeps a real `<input>`/`<textarea>` with the given id,
so handlers (`oninput`, `onchange`, `.value`, `.checked`) stay as they are.
```js
kitSlider({id:"o-mus", label:"Nhạc", value:.5, min:0, max:1, step:.05, sub})          // label · track · number 0–100
kitToggle({id:"o-vib", label:"Rung", on:true, sub, yes:"Có", no:"Không"})             // label · state word · switch
kitInput({id:"x-in", label:"Dán bản chép", value, placeholder, rows:4, readonly, sub}) // label above · paper box
kitInputize(textareaOrInput, label)   // turns an existing box (older module markup) into the kit text box with its label
```
```
label.kctl.kslider  > span.kctl-l (+small sub) + span.kctl-c > input.kslr[type=range] + output.kctl-v
label.kctl.ktoggle  > span.kctl-l (+small sub) + span.kctl-c > b.ktg-w + input.ktg[role=switch] + span.ktg-t > i
label.kctl.kinp     > span.kctl-l + textarea.kinput | input.kinput
```
- Row: label left (`.88rem` 600, sub `.74rem` --dim), control right, hairline `--k-hair` between rows, row ≥ 44 px; the whole row is the tap target.
- Slider: 40 px tall hit area; 10 px track in `--line` with the filled part lacquer red → amber (`#b0402c → #c98a2a`), the rest `--k-card2`;
  knob 28 px gold ring with a lacquer-red centre (the seal colours); the number (0–100, `--gold`, bold) always beside the track. Fill and number
  follow the finger (document `input` listener, `--v`).
- Toggle: switch 52×32 (knob 24): off = `--k-card2` track + cream knob; on = lacquer-red track (`.kbtn` gradient, gold inner ring) + gold knob.
  State word left of the switch (default Có / Không; Tiếng uses Mở tiếng / Im tiếng), red when on. Keyboard focus = the kit selection ring.
- Text box: `--k-card` paper, `1px --line`, radius `--k-rad`, body font `.85rem` (never monospace), min-height 40 px, focus = `--k-sel` halo;
  read-only boxes `--k-card2`. Buttons next to it are `.kbtn` / `.kbtn.alt`; a picked choice button gets `.ksel`.
- Thiết lập: ONE switch "Tiếng" (replaces the old "Mở tiếng" button + "Im tiếng" box: on = sound on and not muted), sliders Nhạc · Tiếng động ·
  Giọng, switches Rung · Cảnh động; grid of 2 columns when the panel is ≥ 480 px, else one. Chép sổ / Nạp sổ: kit text boxes + `.kbtn`.
- `prefers-reduced-motion`: no knob animation. Tested 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2 (dev/shots/title-screen/).

Chọn sổ (j74): one kit section per sổ: `h4.kpst` "Sổ một/hai/ba" + `kitRows` (Kiếp = rank title + name, Ngày = `kitDate`; empty: Kiếp "Chưa ghi")
+ `.kbtn` "Tiếp tục kiếp này" / `.kbtn.alt` "Kiếp mới" (asks "Chắc chắn?" once). The list is redrawn on every visit, so a half-confirmed
"Chắc chắn?" never survives leaving the screen; the Nạp sổ paste box closes when Thiết lập is left.

---

## CHUYỂN ĐỘNG (kit motion, j93) — game feel

Owner 11/14: "game chưa ra cảm giác game". Every celebrated or feared moment uses ONE of these pieces; no worker animates on their own.
Code `dev/build/j93.js` (after j86, before j84). Art `img/kit/mo-*.webp` (Magnific gpt-2-6, 1 style ref face-consort-01, folder ba4aecfe…, transparent).

### Rules (all pieces)
- NO fan rays / halo / conic-gradient light anywhere (owner 11/14: "giống hào quang"). Light = soft radial glow from inside the object.
- Duration 0.3–2 s per piece; transform / opacity / clip-path only (smooth on Fold 755x1000@2 and iPad 1180x820@2).
- Tap anywhere skips to the final frame; a second tap closes. Long pieces show "Chạm để bỏ qua" / "Chạm để đóng".
- `prefers-reduced-motion: reduce` or the "Cảnh động" switch off (`OPT.fxon=false`) = final frame at once, no travel (`kmReduced()`).
- Big moments go through ONE queue `kmPush(fn(done))`: one at a time, waiting while the week panel (#dawn), the podium (#kpodov) or the roulette is open. Death clears the queue.
- Overlays auto-close (except the reward, which waits for "Nhận"); nothing is blocked for longer than the moment.
- Bot runs (`window.__bot`) and `quiet` code paths never animate. Loading a save never animates (the first render only takes a snapshot).

### Pieces
| # | moment | API | trigger (wired) | look |
|---|---|---|---|---|
| 1 | thị tẩm | `kitFlipTablet(p,{me})` · `kitFlipNote(p)` | wraps `flip()` (week start, after the week panel) | ONLY when the tablet is HERS: full piece — 5 green tablets `mo-tablet-back`; the middle one lifts and flips in 3D (rotateY) to `mo-tablet-front` with rank + name (one word per line); gold glow + sparks; result chip with the face, "Thẻ bài của ngươi được lật". The title "Hoàng thượng lật thẻ bài" sits above the lift height (padding on `.kmtabs`, title on its own layer). Someone else's tablet: NO overlay — `kitFlipNote` shows one short line `.kmnote` (kit chip with face: "Tối nay Hoàng thượng lật thẻ <bậc> <tên>") under the top bar, `pointer-events:none`, fades after ~2.8 s, never asks for a tap. |
| 2 | quẻ tuần | `kitXamPlay(el,lot)` / `kitXamHTML(lot)` | wraps `dawn()` (Quẻ tuần section) and every modal holding the old `.xam` (Gieo lại, Phật đường, the HUD chip) | `mo-xam-tube` shakes (0.9 s), `mo-xam-stick` jumps out and lands (0.7 s), the lot word pops (green good / red bad / ink neutral); the section rows fade in after. In the week panel it starts after the calendar. |
| 3 | kết quả | `kitResultFx(card)` | wraps `resultShow` (j63 result card `#rtoast.karesult`) | seal `mo-seal-thanh` (chữ Việt "THÀNH") or `mo-seal-bai` ("BẠI") stamps on the card's corner (scale 2.6→1, card thumps); each changed stat floats up as a pill (green +, red −); every 0–100 stat row gets a thin bar `.kmbar` running from the old to the new value (green up / red down). Existing `.seal` word (THÀNH/HỎNG/BẤT LỢI) stays. |
| 4 | thăng phẩm, tấn phong | `kitEdict({who,from,to})` | state diff after `render()`: `S.rank` up (also cung nữ → Đáp ứng when `S.srv.risen`) | closed edict `mo-edict-closed` → unrolls (clip-path) to `mo-edict-open` with "Thánh chỉ · Tấn phong X làm <bậc>" (Hoàng hậu: "Lập … làm Hoàng hậu"); the kit portrait (mdH big) changes from the old rank frame/brocade to the new one under a light sweep; chips old → new (new chip in `RCOL[rank]`, pops with sparks). j11's "Tấn phong" stamp is replaced (sound and haptics kept). |
| 4b | giáng phẩm, lãnh cung | `kitGloom({title,sub})` | state diff: `S.rank` down, or `S.out` newly set | screen darkens (radial vignette), 14 dry leaves `mo-leaf-dry` fall and sway, grey caption. |
| 5 | qua buổi | `kitDayShift()` | wraps `buoiShift()` (#curtain) | sky band slides in (b0 morning gold, b1 afternoon amber, b2 night indigo) + an incense stick `mo-incense` beside the buổi label, ember burning down, two smoke wisps. |
| 5b | qua tuần | `kitCalendar(el,{from,to,…})` | wraps `dawn()` | calendar `mo-calendar` in the middle: last week's page flips up (rotateX) revealing the new week (Thượng/Trung/Hạ tuần · tháng · năm), then the week panel rises (1.35 s; tap skips). |
| 6 | có thai, sinh con | `kitBloom({title,sub})` | state diff: `S.preg` newly set; `S.kids` grew | peony `mo-peony` blooms (scale + turn), warm glow, 12 petals `mo-petal-peach` burst out; caption "Có tin vui" / "Hạ sinh hoàng tử|công chúa". |
| 6b | chết | `kitInk({title})` | wraps `over()` | two ink blots `mo-ink` spread over the screen, caption "<title> · Mở Sổ luân hồi", then the Kiếp này panel underneath. |
| 7 | ban thưởng, quà | `kitReward({kind,title,from,items:[{n,d,img,tier}],bac})` | wraps `bestow()` (every ân thưởng: night → tray, contest/promo/story/accuse/birthday/nurse/dau → chest, son/sinhthan → golden chest); state diff: new chest entries with `from` (Thái hậu/Hoàng hậu → tray, a consort → gift box) | `kind`: `tray` (mâm sơn son phủ khăn gấm `mo-tray` → `mo-tray-open`), `chest` (rương gỗ chạm vàng `mo-chest`), `royal` (rương rồng phượng vàng `mo-chestg`, Ngự tứ), `gift` (hộp gấm `mo-giftbox`). Closed box floats and glows, "Chạm để mở" + who gives. Tap: rattle, lid opens (open art), a soft warm light glows from INSIDE the box (`.kmlight`: radial-gradient, centred on the box mouth per kind via `--gx/--gy`, breathes gently by opacity/scale; centring uses the separate `translate` property so animation never moves it), items leap out in an arc one by one (rarest last), silver coins `mo-coin-silver` bounce out when there is silver; then the list (grade tag · name · use) + "Nhận". Tap during the flight = all at once. |
| 7b | mua đồ | `kitFlyItem(k)` | state diff: new chest entry without `from` | the item icon flies to the Tư trang tab, which glows. |
| 8 | panels, buttons | CSS | `.dlg`, `.dlg.kpanel`, `#kpop` open with `kmIn` (rise 14 px + scale .96→1, 0.28 s); result card rises; every button / option / act card / chip presses down (translateY 1px, scale .975) on touch | |
| + | nguy hiểm | `kitAlarm()` | wraps `showModal` for threat dialogs (pid items outside the safe list, same list as j11's heartbeat) | red inner edge pulses twice (0.8 s each). |
| 9 | thời tiết | `kitWxChip()` / `kitWxEffects(w)` | after every `render()` | chip `.hc.kmwx` in the status row (after Quẻ tuần) with the painted icon `mo-wx-<k>` and the weather name; tap = `kpPop` with the weather's REAL effects read from the code (j3 endTurn, j80 sleepRegen, j9 placeWhere/travel, j8 contests, j12 rollWx). |
| 9b | hạt thời tiết | wraps j11 `mkPart` | same PIXI mechanism (no new rules): rain streaks darker blue-grey and longer, snow/petals/leaves 1.5–1.7× larger, leaves in autumn colours, mist denser; inside her palace (`home`) at 60 % so it reads as "through the window". |

Grade colours (items, rewards): Thường `#9aa3a8`, Tinh phẩm `#5fa58c`, Trân phẩm `#4f74a8`, Tuyệt phẩm `#9a5ab8`, Ngự tứ `#e0a526` (stronger glow). Until the wardrobe grades exist, `kmTierOf(k)` reads the item price (≥150 Tuyệt, ≥80 Trân, ≥40 Tinh) and every item of a golden chest is Ngự tứ.

Art list (`img/kit/`): mo-tablet-back, mo-tablet-front, mo-xam-tube, mo-xam-stick, mo-seal-thanh, mo-seal-bai, mo-edict-closed, mo-edict-open, mo-leaf-dry, mo-leaf-maple, mo-petal-peach, mo-petal-plum, mo-peony, mo-ink, mo-incense, mo-calendar, mo-tray(-open), mo-chest(-open), mo-chestg(-open), mo-giftbox(-open), mo-ingot-silver, mo-ingot-gold, mo-coin-silver, mo-coin-gold, mo-wx-{hoadao,muaphun,suongsom,troiquang,nanggat,vekeu,giong,domdom,laphong,nangvang,gioheomay,trangram,tuyetnhe,tuyetday,suonggia,maino}.
Not done here (other owners): kitRoulette (thân phận, review/kit-2b) and the honour podium (j90, section 26); the motion queue waits for them (`#kpodov`, roulette).
