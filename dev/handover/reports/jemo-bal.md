# jemo-bal — report (Foreman D #16 order 21/11 ~15:23Z)

## JEMO-BAL r1 — PREP (map only, no code) · 21/11 ~15:30Z · depth 8 · START_CTX ~4 % (rollover line 29 %, ceiling 60 %)
PRIORITY #1 CHECK: OD law 4 (OD:L1267) + MAIN 92 «jemo typed numbers → BAL after the bundle» | main jemo.js:16–41/66–150, jemoact.js:110–552 (outside BAL.ea), jevb.js:23–101, j8.js:116/138/141/145–148, j34.js:14/19/23 | review/* review/law4-typed-rv 0bd71d29 (helpers sgStat/sgOf/balDec + dev/test/law4-typed.js), review/sg-card-rv 625b7601 | claims none (first)
Status: STANDBY — waiting for «GO jemo-bal» (after the balance bundle + law4-typed are LIVE). If no GO by 18:00Z I ask Foreman D whether to build from LIVE (owner deadline 20:00Z).
Mapped on review/law4-typed-rv 0bd71d29 (= main 468835a7 + law4-typed + sg-card-rv). Line numbers are from that tree.

### Plan (when GO comes)
Branch review/jemo-bal from newest origin/main (deepen). Every typed number below → a BAL key with the SAME value; tables (EMO_EV/TR/DECAY/DK/BRAKE)
move whole into BAL.feel (jfeel.js `Object.assign(BAL,{feel:{…}})` block, NOT a new BAL.feel elsewhere — jfeel's assign would overwrite it) and the jemo
constants become `{}` filled at jfeel load (same pattern emo-balance used for EMO_W/OD/LOY); scalars read lazily (functions run after load).
jemoact → BAL.ea (already its own block in jemoact.js:25–83). jevb → the BAL.ctx*/moodEv* row (jevb.js:17). j8 → BAL.eff.j8. j34 → BAL.eff.j34.
Shown == applied: printed numbers use the same key; her Sủng via sgStat/sgOf (jemoact 467/468 already sgStat). Proof = before/after applied-value table
(identical) + extend dev/test/law4-typed.js with these sites → 0.

### MAP — typed numbers applied (A) or shown (S)
**jemo.js (applied only; feelings are shown in words, no number printed)**
| line | what | typed | proposed key |
|---|---|---|---|
| 16–19 | EMO_EV event → [feeling, strength] 24 rows (night row already BAL.feel.ev) | 60,55,30,20,20,18,35,70,95,25,50,85,30,35,55,15,30,40,25,30,90,50,35,40 | BAL.feel.ev (all rows) |
| 21–38 | EMO_TR trait × strength (rows jfeel does not override) | 1.4,1.5,1.2,1.3,.6,… ~70 values | BAL.feel.tr (all rows) |
| 40 | EMO_DECAY per tuần | vui 9 · buon 6 · gian 8 · so 9 · ghen 6 · lo 6 | BAL.feel.decay |
| 41 | EMO_DK trait decay × | .4,1.6,1.6,.7,.8,.8,.6,.8 | BAL.feel.dk |
| 49 | EMO_NIGHT (all 1, inert) | 1 | BAL.feel.night.her (or drop: v3 note says inert) |
| 66,69,70,91 | feeling floor (below = no feeling) | 15 | BAL.feel.floor |
| 69 | same feeling adds | ×.5 | BAL.feel.stack |
| 79 | Emperor/Thái hậu legacy bar sync | v ≥ 40 | BAL.feel.legSync |
| 84,85 | legacy bar → feeling strength / clear below | 50 / <50 | BAL.feel.legV |
| 91 | decay fallback | 6 | BAL.feel.decayDef |
| 97 | death: friend / foe | aff ≥ 30 · oán ≥ 30 or aff ≤ −20 | BAL.feel.wk.{friend,foeOan,foeAff} |
| 99 | rank up: friend / rival | aff ≥ 40 · aff < 25 | BAL.feel.wk.{upFriend,upRival} |
| 100,101 | fall / lãnh cung: foe glad | oán ≥ 25 or aff ≤ −25 | BAL.feel.wk.{downOan,downAff} |
| 103 | other's child: envy | aff < 25 | BAL.feel.wk.kidAff |
| 105 | night: Emperor fond after | lastNightS ≥ 6 · hot rival aff < 10, ×.6 | BAL.feel.wk.{fondN,nightAff,nightK} |
| 106 | neglect | Sủng drop ≥ 6 | BAL.feel.wk.neglect |
| 107 | ill | Sức < 30 | BAL.feel.wk.ill |
| 110 | servant Lòng up/down | ±5 | BAL.feel.wk.loyD |
| 111,113 | mistress mood felt by servants/maid | v ≥ 40 | BAL.feel.wk.mistress |
| 112 | servant fears angry mistress | 30 | BAL.feel.wk.fearV |
| 116 / 118 / 119 | child / official / man glad-for-a-reason strength | 30 / 30 / 25 | BAL.feel.wk.{kidV,offV,manV} |
| 121 | Emperor: birth / lost heir | 55 / 75 | BAL.feel.emp.{born,lost} |
| 123 | oán hook: min, scale | n ≥ 5, cl(n/10,.6,1.6) | BAL.feel.hook.{oanMin,div,lo,hi} |
| 124 | kindness hook: min, scale | n ≥ 8, same scale | BAL.feel.hook.affMin |
| 126 | punish → Emperor angry | 35 | BAL.feel.emp.punish |
| 132 | EMO_BRAKE hi/mid/fHi/fMid/fLo/fBad/soft{7 traits} | 70,40,0,.5,1,1.5,15,8,8,5,−10,−5,−5 | BAL.feel.brake |
| 133 | emoDuc default | 50 | BAL.feel.brake.ducDef |
| 135 | severe grudge keeps half | oán ≥ 60 → .5 | BAL.feel.brake.{grudge,grudgeF} |
| 137 | harm wish fully braked | .9 | BAL.feel.brake.zero |
| 145,147 | tablet: buon+nhantu 1.05 · Emperor angry at her ×(1−.5·v/100) · grief seeks gentle ×1.08 | 1.05,.5,1.08 (E.v ≥ 15 = floor) | BAL.feel.night.{nhantu,angry,gentle} |
| 150 | servant Lòng per month divisor | /60 | BAL.feel.loyDiv |
| 168–171 | motive gate | v ≥ 50 (anger motive), ≥ 60 (fear/joy/grief), feelLv ≥ 3, aff > −30 | BAL.feel.mot.{anger,strong,lv,aff} |
Not game numbers (left): EMOX cache 600, CSS sizes 216–222, clamp 0/100.

**jemoact.js (outside BAL.ea; numbers printed in result lines read BAL.ea except the ×2 / ÷2 multipliers)**
| line | what | typed | A/S | proposed key |
|---|---|---|---|---|
| 124 | her maids considered | 4 | A | BAL.ea.maidN |
| 135,136,486,498 | feeling floor (dup of jemo) | 15 | A | BAL.feel.floor |
| 486 | decay fallback (dup) | 6 | A | BAL.feel.decayDef |
| 228–271 | reaction weights by temper (R_ table, ~45 values) | 2,1.5,.5,1.2,3,.6,2.5,.8,.3 | A | BAL.ea.rw.<k> {hot,even,timid,…} |
| 292 | rival: aff weighs ½ vs oán, min grudge | /2, > 10 | A | BAL.ea.rival.{affK,min} |
| 295,382 | victim / quarrel weight base | 101 | A | BAL.ea.victimBase |
| 296 | she has no superior from rank | rank ≥ 7 | A | BAL.ea.supRank (or the Hậu rank key in BAL) |
| 301 | default vent | 10 | A | BAL.ea.ventDef |
| 329,347 | NPC boast / Emperor favour: oán half | F.ghen/2, ext.oan/2 | A | BAL.ea.half (.5) |
| 330 | tea party guests | 2 | A | BAL.ea.fx.tiec.n |
| 339,341 | Emperor mood → phiền | level 2 (legacy code) | A | state code, keep (note) |
| 354,359,361,370 | half of N.* (ceil n/2) | /2 | A+S | BAL.ea.half |
| 360 | ohoi double | ×2 | A+S | BAL.ea.npc.x2 |
| 451–473 | NPC extreme mood = 2 × the outburst number | 2× N.m.loy, N.o.af, N.q.pow, N.k.hp, N.k.fond, N.e.sung, N.t.th | A+S (same expr) | BAL.ea.npc.extK (2) |
| 426,525,552 | mood band index ±2 / ≥1 | band index | A | structural (BAL.mood.band) — keep, note |
Not game numbers: clamps ±100/1..100, −999 sentinel, eaStamp ×10, name words 3/−2, index T[3].

**jevb.js (emotion writers + context odds; row BAL.ctx* exists at jevb.js:17)**
| line | what | typed | proposed key |
|---|---|---|---|
| 22 | taste steps | [−1,−.5,0,.5,1] | BAL.ctxSteps |
| 30 | sure option relation × (1+t/2) | /2 | BAL.ctxSureK (.5) |
| 34 | arc event taste weight | ×.6 | BAL.ctxArcK |
| 35 | extra odds per scene point | ×7 | BAL.ctxSc |
| 39 | cause list length | 6 (+ why 90 chars = text) | BAL.moodKeepN |
| 41 | floor (dup) | 15 | BAL.feel.floor |
| 95 | higher-rank witness | +20 | BAL.evb.rankUp |
| 97 | consort resent: dO ≥ 3 or da ≤ −6 → gian min(70, 25+2·x) | 3,−6,70,25,2 | BAL.evb.{oanMin,affMin,gCap,gBase,gK} |
| 98 | consort glad: da ≥ 6 → vui min(60, 20+2·da) | 6,60,20,2 | BAL.evb.{affUp,vCap,vBase,vK} |
| 100,101 | her mood after event: ≥ 2 → min(80, base+2·n) | 2,80,2 | BAL.evb.{min,cap,k} |

**j8.js (law4-typed follow-ups; card c + rule ap typed twice)**
| line | what | typed | A/S | key |
|---|---|---|---|---|
| 116 | frame Đức cost (c + ap) | −5 | A+S(card c) | BAL.eff.j8.frameCost (getter) |
| 138 | catswap Đức cost (c + ap) | −10 | A+S | catswapCost |
| 141 | kpoison Đức cost (c + ap) | −20 | A+S | kpoisonCost |
| 147 | kframe Đức cost (c + ap) | −15 | A+S | kframeCost |
| 148 | kframe win: mother Danh −10 (NOT printed by AOUT kframe → shown ≠ applied) + doer Tâm cơ +2 | −10, 2 | A | kframeDanh, kframeTam + print in AOUT kframe |
| 145 | pond drown odds | roll(45) | A | pondDrown (odds stay words) |
| 118/125/146/148 | punish severity | 2 | A | punish sev keys (check BAL.punish first) |
| 236 | shop restock extra (not this family) | roll(45), 6 | A | out of scope, note |

**j34.js (law4-typed follow-ups; not printed)**
| line | what | typed | key |
|---|---|---|---|
| 14 | tScore: art ×1.6 · mini ×1.5 · R(4) ×1.2 · cap 10 · Sức default 60, < 40 → −2 | 1.6,1.5,4,1.2,10,60,40,2 | BAL.eff.j34.{gW,miniW,rN,rW,cap,sucDef,sucLow,sucPen} |
| 19 | dScore: virtue hit 6 / miss 3 · Đức/25 · Tâm cơ/30 | 6,3,25,30 | BAL.eff.j34.{dHit,dMiss,dDuc,dTam} |
| 23 | fScore phe: min(4, 1+n/2) | 4,1,2 | BAL.eff.j34.{pheMax,pheBase,pheDiv} |

**Out of scope (noted):** jemoseal.js motion timing = kit UI data (KIT_EMOSEAL, KIT §38.4), not game numbers. jemocause.js: no numbers.

### Open points for Foreman D (decide at GO)
1. Scope: jevb emotion writers (97/98/100/101) are in the "jemo family" (FOR MAIN 90 named jevb.js:98) — included above; say if you want them out.
2. j8 kframe win: the mother's Danh −10 is applied but not printed on the AOUT card → I would print it (shown == applied); a text change only.
3. Size: ~200 values. Tables move whole (no value change); the scan gets one row per typed site. ETA ~2.5–3 h build + gates after GO.
