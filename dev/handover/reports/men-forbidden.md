# OWNER BUG men-forbidden — SẴN SÀNG KIỂM 13286b4 (review/men-forbidden, base origin/main 62a6846f)
Worker session_01UV1SziLuyrJEqfUqguNP1W (was CHECK garden-night; see reports/garden-night-check.md for the history notes).
PRIORITY #1 CHECK ('dự yến'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 · law exists: OD:L168 + jmen.js (menZone, menCard 'Báo thị vệ / Báo Cung Chính ti / …') + MEN_PLAN.md — reused, nothing new built.

## Root cause
The law and the card existed; the SCHEDULE broke it. jmen `menSched` / `menMinW` put men in the hậu cung (Ngự hoa viên) with reason "fest",
which is neither a stray (no card) nor a lawful exception:
- menMinW: one official (j55 house, e.g. Đại tướng quân) at `vuon` for EVERY buổi > 0 of a festival day, incl. tối → stood alone, greetable (kind "min").
- menSched: Vương gia and Sứ thần at `vuon` on festival days (by day).
- Hội Phượng (`phoenix`) has t:[0,1,2] = the whole month 6, so this ran for 3 tuần.
j95 registry (j95.js:124), stage (jmen goTo wrapper), countAt read the same S.menW / S.minW, so one fix covers all of them.

## Fix (dev/build/jmen.js only, + MEN_PLAN.md)
- ONE rule `menLawful(m,k,why)`: in zone "hc" only summons (thái y), order (craftsman), visit at tn (prince → Thái hậu), stray. menSched drops anything else.
- Vương gia / Sứ thần: festival presence in Ngự hoa viên removed (prince keeps his visit to Thái hậu; envoy keeps the morning audience at thu).
- Festival banquet official → outer court: `S.minF` (on no stage, no map count); only buổi > 0 and < tối; the Ngoại triều card's "Hỏi thái giám tin ngoại triều" tells it ("dự yến lễ tết ở ngoại triều"); its morning line now prints placeName("thu").
- Strays untouched: they still fire menCard (Báo thị vệ · Báo Cung Chính ti · Làm như không thấy · Giấu giúp · Núp nghe lén).
- Women direction: no consort ever scheduled in the outer court ("nt") — checked by the scan (0 before, 0 after). Greeting code not touched (greet-stranger worker).

## Scan (dev/test/men-forbidden.js: 72 tuần x 4 buổi, schedule + stage goTo + forced stray at vuon/tối)
| row | before | after |
|---|---|---|
| official @hc:vuon (incl. tối) | 96 BAD | 0 |
| vương gia @vuon why=fest | 96 BAD | 0 |
| sứ thần @vuon why=fest | 90 BAD | 0 |
| stage shows official in hc | 10 BAD | 0 |
| stage vương gia / sứ thần @vuon | 12+12 BAD | 0 |
| total bad | 316 | 0 |
| lawful kept: thái y summons / nhạc sư, họa sư order / vương gia @tn visit / officials @thu sáng | yes | yes |
| consort in outer court | 0 | 0 |
| stray at vuon tối → card | — | fires |

## Tests
- node dev/test/men-forbidden.js → bad [] , page errors 0
- node dev/test/stage-caption.js → n 29, bad []
- node dev/test/ledger_hours.js 40 → bad {}, pageErrors 0
- dev/tools/quickcheck.sh does not exist on this base → not run.

## Shots (host mode, Hội Phượng, buổi tối, Ngự hoa viên: night painting, no outside man)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/men-forbidden/vuon-toi-phoenix-1180x820.png
- https://ctm-img.victoria-tntt.workers.dev/img/_review/men-forbidden/vuon-toi-phoenix-755x1000.png (the new-game chest overlay hides part of the Fold shot; stage list verified by the scan)
Delete img/_review/men-forbidden/ after the verdict.
