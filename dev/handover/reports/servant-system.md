# review/servant-system — sha b897bcf2cd (base 4f5e5f3b3) (relayed by session 8)
## A — LIVE BUG FIX, SẴN SÀNG KIỂM (main chat): commits 1053dacc7d + ea4987edbe
- Her whole household (maids + eunuchs) now stands on her room stage (jhouse.js; homePeople adds S.staff; KIT 33.7 slots, "+N" pages; head count includes them). Tapping one = kit person card with 10 acts (eunuchs too). Family fixes: the trusted maid gets Giao việc phòng bị; the maid's "Sai đi dò la" now really costs 2 khắc ("Thôi" = 0); the lãnh cung servant stands on that stage. house-stage.js PASS at 1180/755/844.
- For the reviewer: stage acts cost khắc (1–2), while the same management acts in the Cung nhân tab cost none — judge whether that is acceptable. At 844x390 the card's act list is cut at the panel edge (as for the maid's card) → pcard-actrow-r1 may already fix it.
## C — active NPC maid line (owner-approved), NEW and unreviewed → Foreman D reviewer
- jmline.js + BAL.mline: any rank can catch the Emperor's eye (thô sử .1%/mo … nữ quan 1.2%, ×master Sủng, ×3 while seeking), seeking/punish/use, maids harm each other, consorts target other palaces' maids. The consort cap holds. Off switch window.__mloff.
## B — audit + proposal H1–H9 (owner must approve before code)
- H1 trusted/NPC personal maids are outside staff (never rise, can't be bribed) · H2 planted spy arrives silently, over cap · H3 grudge betrayal is told to her at once · H4 servants have no own rumour/poison acts · H5 her maid seeking → a card · H6 NPC palaces/servant road hide servants · H7 gifts/events skip her eunuchs · H8 servant road: align the eye roll + "xin chuyển cung" · H9 ~60% of eye hits wasted when no slot.
- Owner question: should her own servant road (j42:199, rk≥2 1.2+nt/25%) use the same eye table?
