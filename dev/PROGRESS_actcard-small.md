# PROGRESS review/actcard-small (C40, owner override 16/11)
Owner: keep BOTH act-card forms; big Hành sự card unchanged; ONLY the small card's picture becomes a portrait rectangle 3:4 (was a square).
Superseded: review/actcard-one (not built). Option cards (review/opt-pics, `.kopt`) are not touched.

## Changes (dev/build/jk4.js, KIT §43 / new §43.1)
- Small card (`button.ka.kart` inside `@container kpane`, i.e. person-card acts, `.kpanec` skill-card acts / Việc nhờ / Nợ ân): picture 84x112 (72x96 under 420 px), 3:4, cover-cropped. Was 84x84 / 72x72.
- Tap the picture -> `kitActZoom(b)`: big picture + title + full description + Cần/Tốn/Được rows (+ "Vì sao <bậc>?" when the card has odds). Tap anywhere closes.
- Cards WITHOUT an odds label get a small "!" mark in the title row (`.kainfo`), opening the same detail. The odds label keeps opening the why popover (jwhy, unchanged).
- Equal card sizes per grid: small cards already stack one per row in kpane (full width, same width); no big/small mix in Tài nghệ (kpanec). No change needed.
- Not touched: big Hành sự deck card (`--kaw/--kah` 3:4 in j79/jk2b), option cards (opt-pics: `kitPicZoom` there is separate; `.kopt` excluded here, so when both merge only `kopt` uses its own zoom).

## Scan (LUẬT SỬA CẢ NHÓM)
Every small-card form shares the ONE CSS block in jk4 (`.pc>.pcr`, `.kpanec`); grep of other 84/72 px square act thumbnails: none (jk2b `.ksart-thumb` is skill/chapter/empty cards, not act cards, left as is).
Before: thumb 84x84 / 72x72 (ratio 1.00). After: 84x112 / 96 (ratio 0.75), test asserts every visible small act card ratio 0.75.

## Test
`node dev/test/actcard-small.js <url> <outdir> [sizes]` (ratio, "!" on no-odds cards, zoom opens/closes, no overflow, no page errors). Also existing `dev/test/act-compact.js`.

## Review r1 (reviewer)
- Merged origin/main; generated files rebuilt. kitActZoom was a private overlay (#kazoom + own CSS) -> now `kitModal({kind:"info"})` (KIT §8 frame) with the act picture in `kitArtFrame`; KIT.md §43.1 + kit page sample §43.1 added.
- dev/test/actcard-small.js: uses the kit modal, skips zero-size cards, `CTM_CURL_CDN=1` loads real CDN art through curl. act-compact.js header/ratio updated (portrait).
- Tested 755x1000, 1000x755, 1366x1024, 844x390, 412x1058, 390x844 (rotate prompt shows): ratio 0.75, zoom shows real art, no page errors, no h-overflow. Tài nghệ cards all 347x114. "!" tap opens the kit panel (seen on Tài nghệ).
- Note: tapping the odds label of an act with no "why" text falls through to the act itself (pre-existing jwhy behaviour).
