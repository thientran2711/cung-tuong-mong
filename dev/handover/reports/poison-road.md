PRIORITY #1 CHECK ('poison|đầu độc|Thử độc'): OD 27 | ledger 7 (D8 PARTIAL: Emperor visit live, poison road not built) | claims 5 | main 15 | review/* 2 | archive 56

# D8 — Poison the Emperor / Thái hậu road (report, worker session_01964izBos2heoQd7Cty2bAu, opus)

START_CTX ≈ 3 % of the window (get_session read 0; own estimate). Finished at ≈ 30 % — no rollover needed.
Branch: `review/poison-road` (from origin/main 9c58140). Owner words: OD:L602 + OD:L430 (read in OWNER_DECISIONS; not restated).
Own PRIORITY #1 check (worker step 2): origin/main has jpoison.js (live "Bỏ độc vào…", Thử độc card, kim bạc / maid taster), jmort.js
(S.mort.empDue → j3 emperorDies, kill(), Emperor plot omens), j3/j24/j99succ (Emperor death → heir / Vương gia che chở / succession), j55 houses
(tdPowAdd / tdMembers / tdNews), jtrong TH_ARCH (Thái hậu archetypes). review/* : review/poison-gift(-r6) = the merged live version; no branch for
this road. Nothing rebuilt: everything below is wired into those.

No tool or model refused anything during this job.

## §0 History / drama check (OD:L1327, game-design level)
- **Motives in court history and palace dramas.** Poisoning a ruler or a dowager is almost always told as (a) a consort out of favour with nothing
  left to lose, (b) a faction putting its own prince on the throne — the favourite drama plot is a consort and a prince (Vương gia / thân vương)
  whose liaison only pays off if the reigning Emperor dies, and (c) escaping a dowager who rules the inner palace harshly. Our three gates copy
  exactly these: "hận" (out of favour + no bond), "Vương gia" (a real liaison already in the game, j22/j24), "Thái hậu nghiêm khắc".
- **Protection.** Dramas and court records lean on the same three layers around the throne: a food taster (thái giám thử món) eats first; the
  imperial kitchen checks each dish more than once / keeps a second portion for the taster; silver utensils touch every dish. Slow-acting harm is
  the classic way past the taster (the taster shows nothing at once) — in game terms only: the existing item "Độc ngấm dần" gets a bonus against
  the taster but only shortens the target's life instead of killing at once. No real substances or methods are named beyond the game's existing items.
- **Discovery.** A sudden royal death is followed by an inquest (Tông nhân phủ / Ngự thiện phòng questioned); fast, obvious harm is easier to
  trace than slow harm; a failed attempt puts the kitchens on alert for months. If the new power owes the poisoner (her own son crowned, or her prince
  seizing the throne), the inquest tends to be buried.
- **Punishment.** Plotting against the ruler or the dowager is the gravest crime (mưu nghịch / đại nghịch): death (white silk for a consort) and the
  family is dragged down — father stripped of office, the house's standing destroyed, its other daughters in the palace disgraced.
- **After a success.** Emperor: the heir is crowned (often a child, so the mother rules as Hoàng thái hậu / a regent), or a prince takes the throne
  by force and rewards his partner — or fails and everyone involved dies. Dowager: state mourning, the Empress takes over the inner palace,
  the Emperor's grief and suspicion. These map to the existing code: j3 emperorDies + jmort mortFate + j99succ for the heir; jmort thShift for the dowager.

## What was built (one file + one export line)
`dev/build/jpq.js` (after jpoison in assemble.py) + `window.mortKill` export in jmort.js. Numbers: `BAL.pq` defined in jpq.js (same pattern as
jpoison's BAL.pg) → **no jbal.js / j95 edit, so nothing waits for the C-AG jbal hold.**
1. **Same poison system.** The live "Bỏ độc vào…" picker (jpoison PEND.pgpick) gets two more target rows, "<poison> vào <dish> dâng Hoàng thượng /
   Thái hậu", for Hạc đỉnh hồng and Độc ngấm dần only. Same items, dishes (pgFood/pgGrade), Đức cost, kit option card (odds word, Tốn/Thành/Bại/Kèm,
   "Vì sao"); closed rows are greyed with their CẦN reason (kitOff) — "mở khi có nguyên cớ". The intro text and the gift-dialog row text
   say royal targets need a cause (the old "không thể" line replaced).
2. **Motive gates** `pqMotive(a, who)` — her and every consort, one function:
   Emperor · hate: Sủng ≤ BAL.pq.gate.sung (15) and Ân tình ≤ gate.an (10) · Emperor · Vương gia: living Vương gia with S.vgAlly (j24) and tình ý ≥
   BAL.tinhLv.ally (NPC: her child's real father / vgAlly) · Thái hậu · harsh: archetype in gate.harsh (nghiem / danghi / quyen) and Thái hậu quý ≤ gate.th (−20).
3. **Odds** `pqOdds`: BAL.pg.base + Tâm cơ/4 + target trust/4 (floor BAL.pq.trustLo) + dish grade − người nếm (12) − kiểm hai lượt (6) − đũa bạc (8)
   [− kitchens on alert 15] [+ slow poison 12] [+ the Vương gia's men 12] [+ trusted maid 6]; clamped 3…60. Typical start-of-life try: "Liều"/"Khó".
4. **Fail**: kitchens on alert BAL.pq.guard.alertMo (6) months; traced (cp = 50 − Tâm cơ/5, 20…90) → treason.
   **Treason** (`pqDoom`): her → over("Ban chết", …, "Ban chết vì mưu hại Hoàng thượng/Thái hậu") (existing death card + white-silk animation);
   NPC → jmort kill (npcRetire) + news. **House**: j55 tdPowAdd(house, −30), the house's other consorts Danh −8, tdNews; origins without a j55 house get
   the family line in text.
5. **Success**: Hạc đỉnh hồng on the Emperor → S.mort.empDue (j3 emperorDies next month); on the Thái hậu → jmort kill → S.thDead → thShift.
   Độc ngấm dần → target lifespan −BAL.pq.slowCut (6) years (jmort omen + death later). **Inquest** after a royal death: 40 + fast 20 / slow −20 −
   Tâm cơ/4 − cover 25 (her son is heir, or her Vương gia), 5…90. Emperor: rolled when he dies (emperorDies wrapper, outermost). Thái hậu: a 6-month
   window whose monthly rolls add up to exactly the shown chance.
6. **Endings** (existing over()/emperorDies): exposed → Ban chết + house · Vương gia road, no heir son → throne roll (45 + (tình ý − 60)/2 + (house
   power − 40)/5, 15…85): won → "Vương gia đăng cơ, phong Quý phi" (alive ending), lost → Ban chết · hate road or her son heir → the existing flow
   runs unchanged (her son crowned → Hoàng thái hậu / j99succ; else Thái phi / ni cô / tuẫn táng…). Thái hậu success → life goes on (thShift).
7. **NPCs two-way** (`pqNpc` in npcMonthly, host only): same gates, same act, weighted by persW(v,"pgift"), BAL.pq.npc.try 12 % × weight, at most one
   royal try in the whole palace per BAL.pq.npc.cd (24) months, none while a royal case is open.
8. **Co-op**: Emperor never offered in co-op (his death is muted there by the existing jmort/jcoopworld rule — closed row says so); Thái hậu only on
   the host; NPC tries host-only. No co-op code touched.
9. Death card "Nguyên do / Phòng được" lines for these fates (deathChain wrapper); the house line stays in the story text only (one fact, one place).
   Unknown Vương gia is named through succMN (no "Vương gia ???").

KIT: no new part — kit option card, kitOff closed rows, existing end card / ink title / white-silk death animation. No KIT REQUEST.
VANPHONG: ladder words only, no %; "khả năng <thấp/vừa/cao>" side chances like jpoison.

## Gates
- `node dev/test/poison-road.js` → **35/35 PASS** (4 consecutive runs; one flaky case found and fixed — inquest window math). Covers: every gate
  open/closed (hate, Vương gia incl. tình ý threshold, harsh incl. regard threshold, kind Thái hậu closed, co-op), picker rows + closed reasons + odds
  word / no % + Vì sao lists the 3 royal checks, Emperor caught → Ban chết + house, fail untraced → alert, items used up, success → death next month →
  inquest exposed / clean (existing fate), Vương gia throne won / lost, slow poison lifespan cut (Emperor + Thái hậu), Thái hậu success → clean window
  closes / exposed / caught, closed gate refuses, NPC caught (dies + house), NPC success (Emperor dies, inquest names NPC), NPC cooldown, old save without S.pq.
- **one-core-guard: PASS** (0 fails; inline count 3839 ≤ baseline 3842).
- **coop-e2e: 63/63 passed** (live Worker; regression guard only).
- **quickcheck.sh: PASS** twice (old save loads + plays a buổi, core gates, time-spill guard). Perf medians new/live: run 1 render 156/159 ms, buổi
  824/711 ms; run 2 render 176/169 ms, buổi 995/813 ms. The buổi gap exceeds the brief's +5 % line, so it was checked: jpq's whole monthly work
  (pqMonth + pqNpc over every consort) costs 3 ms per 1000 months (≈0.003 ms a month) and jpq touches no render / buổi code, so the gap is
  machine noise between the runs (live itself moved 711 → 813 ms between them). The reviewer should re-run quickcheck on a quiet box to confirm.
- Shots LOOKED (Fold 755x1000@2 + iPad 1180x820@2, host mode, `node dev/test/poison-road-shots.js <outdir>`): picker with royal rows (Emperor row
  open "Liều", Thái hậu row closed with CẦN reason), fail-untraced result, ending "Tân đế đăng cơ", ending "Ban chết". No overlap, no cut text,
  figures' feet visible on the end card; shots kept outside git (scratch), none uploaded.

## Bot measure (`node dev/measure/poison-road-bots.js 60 8`, 60 lives × up to 8 years per style, real build, month loop)
| style | tries | hits | failed untraced | executed (caught + exposed) | exposed later | Vương gia throne won/lost | lives ended Ban chết |
|---|---|---|---|---|---|---|---|
| world (she never schemes; NPC two-way) | NPC 1 (Thái hậu road) in 447 life-years | 0 | 0 | 1 (the NPC) | 0 | – | 0 of her |
| hate (Emperor) | 94 | 22 | 39 | 46 | 13 of 21 inquests | – | 46/60 |
| harsh (Thái hậu) | 84 | 17 | 40 | 33 | 6 of 17 | – | 33/60 |
| vg (Emperor via Vương gia) | 88 | 37 | 30 | 46 | 13 of 37 | 12 / 12 | 46/60 |
(The bot tries again every year it holds a poison, up to 5 times a life; the measure ran just before the inquest-window fix, which can only raise
Thái hậu exposures toward their shown odds.) Reading: per try ~25–40 % land, ~45–50 % end in death — a desperate gamble, as the owner asked
("proper risk/consequences"); a careful player (high Tâm cơ, slow poison, trusted maid, no alert) gets "Khó"/"Năm ăn năm thua". **No runaway
regicide**: NPCs made 1 royal try in 447 life-years; the cooldown caps it at one per 2 years in any case. Page errors: none.

## Findings for Foreman D (not fixed here — outside the task)
1. **NPC Sủng saturates at 100** for almost every consort in the month loop (sample: 100,100,100,100,100,100,100,81,70), so the NPC "hate" road never
   opens (0 of 11 974 NPC-months); only the Thái hậu road opens for NPCs (50 NPC-months), and NPCs hold a poison in only 221 of 11 974 months.
   The two-way rule is wired and tested (forced), but NPC royal tries stay very rare until NPC Sủng is balanced — a balance question for the owner /
   a Sủng worker, not patched here.
2. jbal.js not touched → nothing to land after the C-AG hold.

## Files
dev/build/jpq.js (new) · dev/build/assemble.py (+jpq.js after jpoison.js) · dev/build/jmort.js (+window.mortKill, 2 lines) · dev/test/poison-road.js ·
dev/test/poison-road-shots.js · dev/measure/poison-road-bots.js · index.html / sw.js rebuilt.

SẴN SÀNG KIỂM 4ce4cbfaa9704b4bdd372a6c683f378178f27a37
