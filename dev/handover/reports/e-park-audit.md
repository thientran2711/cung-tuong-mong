# E-PARK-AUDIT — every row of dev/PARKING_LOT.md vs LIVE main 22afefb4 (28/11) + review/* + CLAIMS/STATUS

PRIORITY #1 CHECK: OD 'Thách đấu'/'Cùng chơi' 4-6, 'Thái thượng hoàng' 1-3, 'che chở' 2-3, 'hương riêng' 0, 'dress code' 1 | main = LIVE 22afefb4 (grep per row below) | review/* e-pack-c ff373f76 / e-pack-c-lrm 45ec719a (rows 9, 10), temper-* (row 13), title-plate-art 634344fd (title art) | claims: E93/E93r (e-pack-c), D temper lines; no worker on rows 12, 14, 15, 11c, 26/11 bullets. Tool: `sh dev/tools/prio1.sh` run per keyword (23 keyword sets; summary lines in /tmp scratch, not committed). Built on the earlier audits reports/parking-audit.md (E63, 24/11), parking-verify.md (E66), parking-rows.md (E93) and re-verified every «BUILT» proof against 22afefb4 today. Audit only: no game code, PARKING_LOT.md untouched. Worker: E-PARK-AUDIT (sonnet), child of Foreman E C10. START_CTX ~5 % (own estimate).

Reading done in full: dev/rules/START_CORE.md (18 laws) + START_WORKER.md; brief E-PARK-AUDIT.md. Note: the brief's `checkout -f --detach` was refused by the sandbox classifier, so I used an own detached worktree at the handover tip instead (same result, nothing forced).

Legend: BUILT-LIVE · PARTLY · IN FLIGHT · BLOCKED · OTHER OWNER. «NOT BUILT» alone = nothing found AND nothing stops it (none left, see end).

| # (as in PARKING_LOT) | idea | class | proof (file:line on LIVE 22afefb4 / branch / OD) | what is missing / who |
|---|---|---|---|---|
| 1 | thuốc thúc sinh | BUILT-LIVE | jagacts3.js:210-214 `P3C.drug` «Uống thuốc thúc sinh»; jkh.js:12; jbal2.js:827,1541 BAL.preT.drug | — |
| 2 | live AI narrator | BLOCKED | no runtime LLM call on main; OD:L1436 (owner chose written pools first = built, palace-voice); OD ~L2396 24/11 «cái vấn đề cái API cho AI ngày mai làm»; FOREMAN_E_STATUS L9-10 | needs HER provider key (`request_credential`, MAIN's job) + cost cap + server proxy; then B-AI (opus). Not E's to start |
| 3 (first) | poetic hall names | BUILT-LIVE | jhall.js; CLAIMS LIVE 2c5dd554 | — |
| 3 (second, «3b») | Tranh sủng / Chặn ngự giá mini-game | BUILT-LIVE | jsmg.js:4; jbal2.js:650 BAL.steal.mg; jmgt.js:160 | — |
| 4 | makeup tone in Hội phối đồ + per-person liked tone | BUILT-LIVE | jmkt.js:41,57 (hidden tones, mktR); jtoil toilReact path reused; tests makeup-theme / makeup-lux | — |
| note 17/11 | online multiplayer + leaderboard anti-cheat | PARTLY | jrank.js «Bảng vinh danh»; rank/worker score.js check() + board.js server re-check LIVE; forged.test.mjs only in review/e-pack-c (parking-rank-r3m 73bb9781, PASS) | test lands with e-pack-c; shared world for many (cách 3) = owner pick, not asked |
| 5 | phấn son theo lệ (monthly allotment) | BUILT-LIVE | jallot.js; CLAIMS LIVE 98f9f0f1; reports/monthly-allotment.md | — |
| 6 | bubble talk | BUILT-LIVE | jchat.js:2,13 (kitSay), jbal2.js BAL.chat; jact.js:131 head marker | demo-video re-shoot only, not a feature gap |
| 7 | minister agents | BUILT-LIVE | jagmin.js:1; j55.js:107; CLAIMS LIVE f3114755 | — |
| note 18/11 | lip-teeth (no tint on teeth inside the lip) | BLOCKED | OD 2394-2395 «cái phần môi răng là vẫn cứ để như vậy … đừng có hỏi nữa»; jtoil.js:1011 only a gloss comment | owner parked + «don't ask» (law 16/17): never build, never re-ask |
| note 19/11 | mood-seal sets per person group | PARTLY | jemoseal.js roleSet/setThree (code takes a set prefix per role); OD:L2331/2342 groups; only th-act- set drawn; c3-seals 7082b569 (Foreman C, in LC) | art = Foreman C; E wiring = one roleSet line per set after paint |
| 8 | person mini-game acts Cùng chơi / Thách đấu | BUILT-LIVE | jpma.js (pmDuel, pmVsUI), jbal2.js:1942 BAL.pm, jbal2.js:2000 kitGameVs, jgamevs.js:8; jcoopworld.js:491-508 co-op ask pmplay/pmduel | — |
| 9 | Khoảnh khắc chân dung | IN FLIGHT | NOT on LIVE (no jmoment.js in 22afefb4); review/moment-r3m a9a3323f PASS inside review/e-pack-c ff373f76 (PASS E93r) → e-pack-c-lrm 45ec719a, MAIN_STATUS L356 «fresh rules table to LC30» | land (LC30 / Foreman-E-independent). Open: KIT_REQUESTS «moment album» + «!» overlay rows; art per consort = Foreman C. Check LC30 result before assuming live |
| 10 | Hương riêng | IN FLIGHT | NOT on LIVE (no jscent.js); review/scent-r3m 99517ded PASS inside e-pack-c ff373f76 / e-pack-c-lrm 45ec719a | land with e-pack-c. Gap: 4 item pictures hg_tram/lan/que/mai blank → Foreman C art (E93r note 1) |
| 11 | season + colour dress code | BUILT-LIVE | jdc.js:1-326, jbal2.js:2009 BAL.dc; reports/dresscode*.md; kitColDot | — |
| 11b | borrow = accessory layers | BUILT-LIVE (superseded by 11c, borrow of trâm live) | jdc.js:18 BORROW (dcBorrow/dcReturn, two-way) | trâm layer on the figure = art |
| 11c | masked code recolour of robe (keep skin/face) | BLOCKED | jbal2.js:2018 `kyOn` = 0 (taboo robe off until recolour exists) | needs Foreman C robe masks + 2 figures × 3 colours sample → owner LOOKS → then E flips kyOn + wires (opus). Art first |
| 21/11 title art (listed twice) | every danh hiệu gets its own Magnific plaque | BLOCKED | OD 21/11 ~04:14Z «PARKED until she says»; j59.js:48 kitTitlePlate = text plate; branches review/title-plate-art 634344fd, kit-titleplate exist (UI plate, not per-title art — scope unchecked) | owner parked: do nothing until she says |
| 12 (listed twice) | animated portrait frames (tassel/dragons move, one whole picture) | BLOCKED | grep frameAnim/tassel swing on main = 0; OD 21/11 ~18:55Z + 19:30Z (L2188-2191); FOREMAN_C_STATUS L159 | needs Foreman C animated frame art + KIT frame-animation slot (KIT REQUEST), then sonnet wiring. NB: WORKLIST «row 12» (leave-palace ladder) is a different item (moved to B by MAIN 187) |
| 13 | temper-driven play | PARTLY (OTHER OWNER D) | outburst layer on LIVE: jbal2.js:1965 TEMPER-OUTBURST, jemoact.js; tests dead-card.js, emotion-acts-2.js; perception/g4/coop-fix on review/temper-perception-rv c56c1856, temper-coop-fix 73358b4d, temper-g4; CLAIMS L311-335, L407 (D re-merge + land lead) | Foreman D owns (OD 25/11 ~08:05Z). Not E |
| 14 | sủng phi được che chở + RARE ENDING «Thái thượng hoàng nhường ngôi» | BLOCKED | OD 2468 (idea), OD ~25/11 07:55Z + 08:10Z «mấy cái tính năng mới ngừng đi, để khi nào tôi đi vacation về … cái mới thì để dành»; main: only servant «Che chở» (j10.js:113) and the ruler's own abdication ending j99succ.js:141 (c_abd, a different road) | owner parked until vacation return (no lift found in OD tail). Law 8 history expert first when picked. Do NOT build |
| 15 | Nhân vật kỳ ngộ (owner's face, new role each life) | BLOCKED | OD 25/11 ~07:30Z/07:45Z/08:10Z «nhân vật kỳ ngộ … để dành»; main no special NPC (jky.js/jkyc.js are the generic Kỳ ngộ); face art exists D roster n01/n02 | owner parked until vacation return. Do NOT build |
| 26/11 (a) | Dưỡng Tú viện as a real place state | BUILT-LIVE | jmapz.js:24-27 MAPZ_DTV; jbal2.js:696,704 `lodge`; jact.js:112 place-dtv; art C3-DTV (Foreman C) | robots only hit a HARNESS gate there (F), not a game gap |
| 26/11 (b) | Cha định hôn | PARTLY (OTHER OWNER) | jkc.js:351,445 `dinhhon` card; jbal2.js:1098 BAL `dinh`; E-S3 robot ruling 27/11 05:12Z: all 3 options end the life = exit as the only choice | exit marks = row 42 batch 5 (MAIN 188 → suggest Foreman F; owners OB-NGOAICUNG / D-SELX-FAIR). Not E now |
| 26/11 (c) | gifts to family | PARTLY (OTHER OWNER D) | j55.js:206 «Biếu quà nhà ngoại»; jkcg.js:86 family→her gift path; WORKLIST_OPEN row 10 «Gifts / likes / dislikes two-way» = Foreman D open | palace→her-own-family gift not proven; collides with D row 10 → same worker, never split (OD:L1229/L1237) |
| 26/11 (d) | thôn nữ village Dư đồ (today shows gentry map) | BLOCKED | jkc2.js:79 KC2W.dan words (Nhà tranh, Thôn quê) exist; no village map in jmap*.js/jmapz.js | needs Foreman C village map picture first (art), then wiring M |
| 26/11 ~09:55Z | E67 art (robe masks, animated frame, title plaque) + c16 t2-a18 grey cheek repaint | BLOCKED | PARKING_LOT line; OD 24/11 ~08:30Z character art paused | Foreman C when art resumes |
| 26/11 ~21:40Z | phản tọa · «hại chết hoàng tự» flag · deny-then-proven road | BLOCKED | main grep = 0 hits; line says «NOT asked by sếp … Build only if sếp asks» | owner has not asked (freeze + «đừng tách nhỏ») |

## TALLY (28 table rows; «E67 art + c16 repaint» counted as one)
built 11 (1, 3, 3b, 4, 5, 6, 7, 8, 11, 11b, 26a) / partly 5 (leaderboard, mood-seal, 13, 26b, 26c) / in flight 2 (9, 10 = e-pack-c) / blocked 10 (2, lip-teeth, 11c, title art, 12, 14, 15, 26d, E67+c16, PUNISH-TIER) / not built (nothing stops it) 0. 11+5+2+10 = 28.

## E CAN BUILD NOW (no art, no pending owner choice) — recommended order
**None is clean to start today.** Every row with real missing code is blocked by art (11c, 12, 26d, mood-seal, scent pictures), by an owner pick/key (2, 14, 15, title art, lip-teeth, PUNISH-TIER) or belongs to another foreman (13 → D, 26b → row 42 batch 5 / F). Honest short list of what E may do, in order:
1. **Land e-pack-c (rows 9 + 10 + rank forged test)** — not a build: ask MAIN/LC30 for the result of e-pack-c-lrm 45ec719a; if it did not land, E re-merges on the new LIVE (E93 recipe, review/e-pack-c). Size S (re-merge), BIG-tier review already PASSed (E93r). Touches jbal2.js (BAL.scent), jinv.js, jscent.js, jthaiy.js, jmoment.js, assemble.py, KIT_REQUESTS.md. Law 8 done.
2. **26/11 (c) gifts to family** — only AFTER a 30-min check with Foreman D: if D row 10 does not cover palace→her-family gifts, E builds it with D row 10 as ONE worker (never split small, OD:L1229/L1237). Size M, SMALL review tier unless it touches BAL.gift (then BIG). Files/keys: j55.js (Biếu quà nhà ngoại), jkcg.js, BAL.gift / BAL.house. Law 8: yes (history expert: what a consort could send home, Qing rules) — expert first.
3. **mood-seal sets wiring** — one roleSet line per set in jemoseal.js, SMALL, but only when Foreman C announces a painted set (c3-seals).
4. After art lands: 11c wiring (flip `BAL.dc.kyOn`, opus, BIG, jdc.js + jbal2.js:2018) · 26d village map wiring (M, kit map part + jmapz.js, needs C picture) · row 12 frame animation slot (sonnet, M, KIT REQUEST first).

## ASKS FOR MAIN (one line each, nothing for the owner that she already ruled)
- Rows 14, 15 stay parked per OD 25/11 ~07:55Z–08:10Z; if she is back and lifts the freeze she says so — law 17: do not re-ask.
- Row 2: key via `request_credential` is MAIN's step.
- Foreman C art queue (no owner ruling needed): 11c robe masks + sample, animated frame art (row 12), village map (26d), 4 scent item pictures hg_*, mood-seal sets.
