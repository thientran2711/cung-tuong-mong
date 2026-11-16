# pet-lifespan — worker report (opus BAL, for MAIN s21)

SẴN SÀNG KIỂM fe766e6a — branch review/pet-lifespan (off origin/main 2e9615fb-era HEAD at start). Not pushed to main.
Scope: owner OD 16/11 18:15Z idea + 18:50Z approval (pets get a lifespan like people; divine Ngự tứ pets mortal, shield simply goes, no compensation). Mirror of OD:L1143; numbers in BAL (OD:L1267); NPC pets same rule (OD:L1386).

## What was built
- New module dev/build/jpetlife.js (assembled right after jpetcare.js). Only edit to existing code: jpetcare.js petcOpen sub/stage caption read petcStageN(P) (2 spots), assemble.py list. jpet.js untouched (coop-pets branch touches jpet/jpetcare; no overlap with its hunks).
- BAL.pet.life (one core): wY 36 weeks/year (wk() = turn*3+tuan), dice per group {mean,sd,lo,hi,old,careMax} years, grp species→group for all 22 species, careOk 70 / careAff 50 / careP 25 / careLapse 40, oldDecay 1.4, floorW 4, giaArt 0 switch.
  Groups: thu (cats, dogs, rabbit, lynx) 12±3 [6–20], Già 9, care +1 max · chim 15±4 [7–25], Già 11, +1 · ca 18±5 [8–30], Già 13, +1 · hac (crane) 30±7 [18–45], Già 22, +2 · linh (tier-3 spirit beasts) 28±7 [15–45], Già 21, +2 · than (Bạch lộc, Kỳ lân, Thanh long) 40±10 [22–70], Già 30, +3.
- Lifespan rolled once per pet (lazy: first week / its card / load), conditioned above present age; old saves without P.at get the youngest age their stage allows and ≥ floorW weeks left.
- Già: label over the growth stage ("Già (Linh thú)"), keeps its effect, tires faster (No/Sạch/Vui fall ×1.4). Becoming old = one quiet kit notice card. Pet card: "Lớn: Già (…)" + new "Tuổi" row (years + weeks) in the same kit table (KIT §51).
- Care: per pet-year, good care (Khí lực ≥ careOk, Tình cảm ≥ careAff) careP % for +1 year, hard ceiling dice.careMax; lapse (Khí lực < careLapse) takes one back. Neglect deaths (jpetcare) unchanged.
- Death by fate: her pet → kit notice card "Tiễn biệt …" (rare event, big frame allowed per OD 16/11 17:25Z), pet picture, grave under the plum tree, keepsake item IT.petkv "Túi kỷ vật (<pet>)" (Kỷ vật, keep: never sold/given, no effect; picture reuses kit painting item-tuithom). NPC: log line + keepsake in the NPC chest.
- No punishment: old-age death clears src before petLose, so the Thái hậu −8 gift rule never fires on old age (stays for neglect/harm/loss); hac/kylan "Mất" text now says "(chết già thì không)". Ngự tứ dies → petRescuer() = −1, nothing given back.
- Co-op: her pets roll locally; NPC pets die on host only (seat a); guest mirrors.

## Tests (all PASS, no page errors)
- Unit/sim: node dev/measure/pet-life-sim.js 4000 → dev/review/pet-lifespan/sim-table.md (ranges within lo..hi+careMax, ceiling held, conditioned roll). E.g. alive after 30 yrs (ordinary/good care): small beasts 0/0 %, crane 44/57 %, spirit beasts ~34/44 %, divine 81/88 %.
- Bot on the real game: RUNS=16 node dev/test/pet-life-bot.js <url> 755x1000@1 <out> bot --bot → dev/review/pet-lifespan/bot-table.md (her pets good vs ordinary care + an NPC consort's pets, one kiếp = 30 yrs of petWeek). careCeilingBroken 0, Thái hậu changed on old-age death 0, youngest death never below dice.lo, keepsakes given to her and NPC.
- Old save (dev/test/mk-oldsave-pets.js on origin/main build, one pet with P.at removed): loads, both get a lifespan (13–15 y), none dies in 6 weeks.
- Co-op: guest keeps an NPC pet past its end, host removes it.
- Perf smoke: petWeek 0.004 ms on vs 0.003 ms off (22 pets).
- Shots (dev/review/pet-lifespan/*.jpg): Fold 755x1000@2 + iPad 1180x820@2 — Già pet card, Già care screen, "đã già" card, farewell card; audit: no overflow / ellipsis / broken images.

## KIT REQUEST (art → Foreman C via main; nothing blocks the feature)
1. Optional Già pictures img/pet-<key>-gia.webp + img/pet512/pet-<key>-gia.webp for the 22 species (greyer muzzle/plumage, same pose family). Code ready behind BAL.pet.life.giaArt=0; set 1 when on CDN. Until then Già shows its growth-stage picture.
2. Optional dedicated keepsake painting (item-petkv); today ITIMG.petkv reuses item-tuithom.

## Notes for main / reviewer
- Seen in the care-screen shots (both devices): an act-card picture (tea cup, pink frame) overlapping the four bars at the top of "Chăm …". petcBody is untouched by this branch, so it is not from jpetlife; not checked on main — please route to the act-pics / pet-care owner (whole group: every pbtn with a picture inside a kit dialog).
- review/coop-pets (15/11, not merged) adds petNpcs(); jpetlife already uses it when present. review/stage-pets not found on origin at start.
- START_CTX ≈ 5 % (1M window); finished at ≈ 15 %. No rollover needed.
