SẴN SÀNG KIỂM 793cd37
# kc-roads-cn-nc report (branch review/kc-roads-cn-nc)

Task (main s11, opus): a PRE-PALACE home road for "Cung nữ tuyển vào cung" and "Công chúa hòa thân" (every country branch), the td pattern
(review/kc-lore): home life → sending event as a kit event card → selection (rank = ceiling only, earned) → today's palace road unchanged.
Owner rules applied: OD:L1244, L1250, L1251, L1252, L1253, L478; co-op OD:L1288 (16/11 08:45Z, replaces L1263). Base: review/kc-lore + origin/main.


## ROUND 3 (owner OD:L1288 via main s12/s13) — current state, read this first
1. **Co-op: free choice, same time point, no forced link.** Removed everything of the old co-op rule (L1263): the card that followed the friend,
   the closed "Vào cung ngay", the entry barrier S.kc.gate / "Chờ hảo hữu", the waiting life for an origin without a home road. Both players
   get "Vào cung ngay / Chờ" on their identity cards at the room start; each chooses freely; time runs the same; one can live at home while the
   other lives in the palace. **One calendar point for every home road**: the cnv / nc / bd roads now end at the tiểu thư tuyển tú month
   (kc2Due = Sơ tuyển month of year KC.ty, ≈ 22–25 months, was 10), chapters at months 4 / 10 / 16 as jkc, weekly events with cool-downs
   (KC2CD) so a two-year road does not repeat one event monthly. Two friends who both wait reach their selection in the same month, by the
   calendar alone. Test coop-together.js (cnv home + nc "Vào cung ngay", live Worker): see the table below.
2. **"Chờ" worth the palace years.** BAL.kcv (one core table in jkc2): what the home years carry into the palace, EARNED (×0.8 / ×1 / ×1.2 by
   the selection result), in the home road's own currencies: Danh, the Emperor's curiosity for a new face (Sủng, consorts only), Tư chất
   (each of Sắc/Tài/Tâm cơ/Đức), true knowledge of the harem (people known), tài nghệ, bạc, and for a cung nữ the first mistress's trust
   (Chủ tin). Shown on a kit card "Hành trang những năm ở nhà" after "Nhập cung"; the identity cards say it. Applies to ALL nine home roads
   (the six tiểu thư roads through a kcEnter wrapper: kc {dn 35, Sủng 28, st 8, kn 6, art 1}; nc/bd {dn 40, Sủng 30, st 12, kn 6, art 2, bạc 20};
   cnv {dn 70, st 15, kn 12, art 1, bạc 40, Chủ tin 45}).
   **Method (dev/measure/kc2val.js, kc2val-sum.py)**: two arms per origin on this build, pictures off. CUNG = new life, "Vào cung ngay" through
   the selection card, then the inpage6 SENSIBLE palace bot for exactly the months the home road lasts. NHA = the home road (jkc: inkc.js
   sensible policy; cnv/nc: a sensible home policy in kc2val.js: rest when tired, train khéo tay / lễ nghi / tài nghệ, keep the elders, pay
   debts, avoid life-ending options) to the palace entry. Both snapshotted at that same calendar point. Value V = rank value (RANKS s+d; a cung
   nữ: servant rank ×15 + Chủ tin/2) + Sủng + Danh + (Sắc+Tài+Tâm cơ+Đức)/2 + tài nghệ levels ×4 + Bạc/10 + harem people known ×3.
   4 lives per arm per origin (palace arm reused, unchanged by the carry). Results (V, mean of lives alive at the point):
   | origin | palace arm | home arm BEFORE | home arm AFTER (BAL.kcv) | gap after |
   |---|---|---|---|---|
   | cnv | 355 | 170 | 340 | −15 |
   | nc | 413 | 276 | 405 | −8 |
   | tt | 425 | 311 | 386 | −39 |
   | muoi | 360 | 290 | 327 | −33 |
   | thd | 366 | 280 | 367 | +1 |
   | ch | 348 | 306 | 402 | +54 |
   Mean gap after ≈ −7 (before ≈ −106); the palace arm's own spread is ±60 per life, so the remaining gaps are inside the noise of 4 lives.
   Not in V: a tiểu thư road can end outside the palace (marriage / death, about 1 life in 4 here) — those lives get their own ending
   (Phúc duyên per OUTSIDE_PLAN §10); bd measured only in the scratch merge earlier (same kind and table as nc).
   Superseded: the old "Danh ≤ 30, Sủng 8+rank×5" entry carry of OUTSIDE_PLAN §9 is now plus this carry (the old route test line
   "Danh carry-over ≤ 30" in dev/test/kc-lore/route-td.js and kc-roads/route.js is updated to ≤ 30 + carry).
3. Kept from round 2: "Vào cung ngay" through the selection (exam hook window.kcEntryExam; fixed: the hook was called with S.kc.kd on the
   direct road where S.kc does not exist), bd = dependency on review/origins-r1.
4. Round 3 tests (this build): route.js cnv + nc at 755x1000@2 and 1180x820@2 PASS (selection + "Hành trang" card looked at, both sizes);
   direct.js 9/9 origins PASS; coop-together.js cnv (home) + nc ("Vào cung ngay") live Worker 26/26 (both roads open on B's card, same date,
   A home / B palace, A's end month = tiểu thư tuyển tú month, A enters alone, B then sees her); kc-lore route-td.js tt ×2 and td PASS.
   One earlier tt run flagged "Mạnh thái y ???" in the Gia tộc tab (a stranger-name label of j61 inside the tiểu thư family pager); it did
   not come back in 3 reruns and is not from this branch's code (likely the j96 thanh-mai man with a thái y role) — flagged for the jkc owner.

## KEY NAME NOTE (please check)
The brief says `cn "Cung nữ tuyển vào cung"`. In the code the keys are the other way round: **cnv** = "Cung nữ tuyển vào cung" (j42, servant
start, commoner, Nội vụ phủ draft) and **cn** = "Cung nữ được sủng hạnh" (j1, starts as a consort, used to serve tea at Càn Thanh, so she has
lived in the palace for years). The road was built for the origin the OWNER named ("Cung nữ tuyển vào cung" = key cnv: poor family, the maid
order reaches the village), which is exactly the content the brief describes. cn (được sủng hạnh) keeps no home road, as OD:L1251 says for the
already-in-palace maid. If main meant otherwise, the data moves by changing one line (KC2K).

## What was built (dev/build/jkc2.js, assembled right after jkc.js; site rebuilt)
Data on the jkc machinery (tabs, map, deck cards, PEND kcE dialogs, Gia tộc pager + pcard, Mệnh truyện skill cards, hud, top-bar chip,
goal strip): new games only (S.kc.v 3, S.kc.kd "dan" | "nc"); every older save is untouched (no S.kc.kd).
- **cnv (dan, "Ở quê chờ lệnh tuyển")**: a village, ~10 months. People: Phụ thân, Mẫu thân, Huynh trưởng, **Xuân Đào** (the same girl j67
  cnv_ban names), Lý trưởng (creditor, writes the draft list), Bà Tư (old palace maid, teaches lễ nghi, tells of Lưu ma ma / Tân Giả khố).
  Numbers: Tiếng trong xóm (kgt), Nợ nhà (kap, grows monthly; 100 → creditor), Khéo tay 0–5, Lễ nghi 0–5. Places: Nhà tranh, Ruộng nhà,
  Bến sông | Đình làng, Chợ huyện, Chùa làng, Nhà bà Tư. 16 cards, 8 weekly events (mother ill, flood, tax, lý trưởng's son, merchant, brother
  gambling, rich man's concubine offer, creditor), 3 hồi "Lệnh tuyển cung nữ" (name on the list / bribe it off; the an gia money; the night
  before with Xuân Đào). Sending card "Ngày tuyển cung nữ" (origin painting) → choose Khéo tay (j91 kim) / Vấn lễ (le quiz) / wait → result.
  Placement = the cung nữ "rank": good → maid of a palace head (Tần+), fair → maid of a low consort, poor → Tân Giả khố 4 weeks first
  (j42 srvInit, unchanged servant road after). Xuân Đào enters in the same draft as ONE real maid of another palace, known to her (OD:L1247).
  If her name was bribed off the list: "Ở lại quê nhà" (life ends) or go anyway (−3 at the selection).
- **nc / bd (nc, "Ở cố quốc chờ hòa ước")**: her home court, ~10 months. People: Phụ vương / Phụ hãn, Mẫu hậu / Khả đôn, Hoàng huynh (nc) or
  Trưởng huynh + Nhị huynh (bd, as jorigins bd_hoang), Hoàng thúc (nc, as j67 nc_vuong), Vương muội / Muội muội, Sứ thần Đại Hy (from hồi 1).
  Numbers: Hòa ước (kgt), Phe chủ chiến (kap), Hồi môn (khm), Lễ nghi Đại Hy 0–5. Places per country (Tẩm điện, Chính điện, Vương uyển,
  Chùa Sùng Thánh, Dịch quán, Chợ, Bờ hồ Nhĩ Hải | Trướng, Kim trướng, Bãi ngựa, Miếu thần núi, Doanh trại sứ, Chợ phiên, Thảo nguyên).
  17 cards, 7 events (festival, sister's bid, father ill, treaty clause, assassin, uncle's banquet, war faction), 3 hồi "Hòa ước" (meeting the
  envoy; who goes — she may push the sister and stay home = life ends; the secret order (nc, j4/j67 nc_gian) / the 300 horses + oath (bd)).
  Sending card "Hòa ước ký xong" (origin procession painting) → "Lễ ra mắt": dance (j82 mua) / Vấn lễ / let the envoy speak → rank.
- **Selection (OD:L1250)**: a real mini-game round of the existing engine (playArt, the same as Phúc tuyển) + home numbers (Sắc, Đức/Tài,
  Khéo tay or Lễ nghi learned at home, Tiếng/Hòa ước, Lý trưởng's or the envoy's favour, Thái hậu dislike, rumour). Score ≥55 → the ceiling
  (nc Tần, bd Quý nhân, cnv a palace head's maid); ≥40 → one step lower; else two steps lower. Hook for a dedicated selection mini-game:
  `window.kcEntryExam(kind, done)` (TODO comment in kc2Play). "Vào cung ngay" still gives the origin rank directly (today's rule, not in scope:
  see question 2).
- **No fixed best answer (OD:L1253, L478)**: odds read this life's random natures (lý trưởng Tham lam/Cương trực/Ba phải/Đa nghi takes a gift
  differently; father Nóng nảy turns a complaint into debt; sister Tham vọng/Kiêu ngạo vs Nhu mì; Phụ vương Cương trực/Tham vọng/Cẩn trọng),
  how they feel about her (af), her numbers and earlier choices (kim, le, meOk, sx favour). Every bạc card has a twin of equal weight
  (Sức + khắc or a favour; BALANCE rule 15/11 20:30Z).
- **kitName fix (whole group)**: at home the caption over HER figure in every dialog said "Đáp ứng" (RANKS[S.rank]) on all home roads
  (tiểu thư too). Now her home word (Tiểu thư / Thôn nữ / Công chúa), one wrapper on kitName.
- CO-OP: see ROUND 3 (the L1263 forced joint entry was removed).

## Tests (all on this branch's build; shots looked at)
| test | sizes | result |
|---|---|---|
| dev/test/kc-roads/route.js --origin=cnv: card → home → 8 tabs → ~3 months random play → sending → selection (Vấn lễ / skip) → palace maid → 4 buổi → save/reload | 755x1000@2, 1180x820@2 | PASS, 0 page errors, no overflow / cut text / ??? |
| same, --origin=nc | 755x1000@2, 1180x820@2 | PASS (ranks seen Thường tại … Tần) |
| same, --origin=bd (scratch merge with review/origins-r1, NOT pushed) | 755x1000@2, 1180x820@2 | PASS |
| dev/test/kc-roads/coop-together.js (round 3 rule OD:L1288) | Fold 755x1000 + iPad 1180x820 | see ROUND 3 item 4 |
| dev/test/kc-lore/route-td.js --origin=tt (regression) | 755x1000@2 | PASS |
| dev/test/outside/oldsave.js (main save → this build; home save reload) | 755x1000 | PASS, 0 errors |

## Lore scan (dev/test/kc-roads/scan.js) — before / after
Before = main: these origins had no home road, so nothing at home could contradict the palace. After:
| origin | palace fact (source) | home road | ok |
|---|---|---|---|
| cnv | Xuân Đào, same village, same draft (j67 cnv_ban) | Xuân Đào in the village; exactly 1 palace maid named Xuân Đào, known to her (a palace maid who drew that name is renamed at start) | yes |
| cnv | commoner, Nội vụ phủ draft (j42 line, ORIGIN_LORE) | Thôn nữ, draft at huyện đường → Cung nữ / Tân Giả khố | yes |
| cnv | Lưu ma ma of Nội vụ phủ (j67 cnv_ma) | Bà Tư names her | yes |
| cnv | age (j42 srvInit 18–20) | 18 at home → same age kept at entry (srvInit's random age undone) | yes |
| nc | father alive, sends secret orders, dies later (j4 goal, nc_gian, nc_vuong) | Phụ vương alive at entry; illness at home always recovers; she may refuse the spy role, he still wants it | yes |
| nc | Hoàng huynh leads envoys; Hoàng huynh vs Hoàng thúc (nc_su, nc_vuong) | both exist, both alive | yes |
| bd | two elder brothers fight (bd_hoang) | Trưởng huynh + Nhị huynh | yes |
| bd | 300 horses dowry (bd_ngua s1); 10-year treaty (origin line) | hồi 3 always says 300 horses; treaty clause says 10 years | yes |
| nc, bd | rank = ceiling only (OD:L1250) | middle result → one step under the ceiling | yes |

## ART LIST (SAMPLE requests for main — nothing generated here; placeholders in use)
Places (16:9 scenes, morning/evening if the set has them):
1. cnv: Nhà tranh (three-room thatched hut, loom, hearth) · Ruộng nhà (rice field behind bamboo) · Bến sông (village landing, girls washing) ·
   Đình làng · Chợ huyện · Chùa làng (small village pagoda) · Nhà bà Tư (old woman's hut). Now: origin-wide-thd / muoi, ngu-hoa-vien, duong-tam-dien.
2. nc: Tẩm điện (Nam Chiếu princess chamber) · Chính điện Nam Chiếu · Vương uyển (camellia garden) · Chùa Sùng Thánh (three white pagodas by
   the lake) · Dịch quán sứ Đại Hy · Chợ kinh đô · Bờ hồ Nhĩ Hải. Now: Đại Hy palace scenes + origin-wide-nc.
3. bd: Trướng (felt tent interior) · Kim trướng · Bãi ngựa · Miếu thần núi (stone cairn, cloth strips) · Doanh trại sứ Đại Hy · Chợ phiên ·
   Thảo nguyên. Now: Đại Hy scenes + origin-wide-bd.
People (ART COMPLETENESS: all 4 age bands each):
4. cnv: peasant father, peasant mother, peasant elder brother, Lý trưởng (village head), Bà Tư (old ex-palace maid), Xuân Đào (village dress;
   in the palace she uses her servant figure). Now: official/mama/man/consort pool faces (the father wears a court robe: wrong, placeholder).
5. nc: Phụ vương, Mẫu hậu, Hoàng huynh, Hoàng thúc, Vương muội in Nam Chiếu dress; bd: Khả hãn, Khả đôn, two brothers, sister in steppe
   dress; Sứ thần Đại Hy (Đại Hy official is fine).
6. Her own home dress: tier "ngheo" exists for some faces (cnv uses it); a Nam Chiếu dress tier and a Bắc Địch dress tier for her (today the
   khuê các "kc" tier). Sample first, then the per-face set (Foreman C mass production).
Event pictures (KIT §50.1: only a picture that means the event; these show none today):
7. Xuân Đào crying at the river · cloth merchant · brother gambling · selection at huyện đường (today: origin-wide-cnv palace gate) ·
   Lễ hội đuốc (nc) / Hội đua ngựa (bd) · the sister's bid to the envoy · the uncle's banquet · hồi 2/3 talks with the father.
8. Entry animation per origin (OD:L1244) — not built here (no kit part for it yet; see question 3).

## Round 2 (main s12 answers, 16/11)
1. cnv confirmed.
2. **"Vào cung ngay" goes through the selection too** (every origin): after "Nhận thân phận" a "Tuyển chọn" card comes BEFORE "Nhập cung":
   one round (window.kcEntryExam hook for Foreman D's exam mini-game, else playArt: the origin's art — cnv khéo tay, nc/bd múa, others their
   best art — or Vấn lễ, or wait = 5/10) + Sắc/Đức/Tài + art level + Thái hậu attitude → ceiling / −1 / −2. The "Nhập cung" card is rewritten
   with the real rank ("kỳ tuyển chọn: khá …; thân phận cho tới Quý nhân"). cnv: placement (palace head's maid / low consort / Tân Giả khố first),
   the srvInit card rewritten. Ceiling Đáp ứng (muoi, thd, td) → no card (nothing to lose). j67 chapter 1 "promoted one step" now counts from
   the rank she really enters with (all entries, tiểu thư roads too: S.st.ms.r0). New lives only (S.selx). Test dev/test/kc-roads/direct.js:
   all 9 origins PASS, 0 errors.
3. Entry animation: hook left (kcHook("enter",…) at every entry), Foreman D builds it.
4. (removed in round 3: no waiting for the friend, OD:L1288)
5. bd: DEPENDENCY on review/origins-r1 (jorigins.js: the bd origin). jkc2 carries all bd data and wakes when that branch merges; not merged
   here (it is another reviewed scope). Tested in a local scratch merge only.

Round 2 tests: direct.js 9/9 origins PASS; coop-together cnv+cn 36/36 (cn waits, both enter the same week), cnv+nc 37/37; route.js nc 755+1180
PASS, cnv 1180 PASS and 755 PASS on rerun (the first 755 run ended the life at home by a random "Ở lại quê nhà" choice after the name was
bribed off the list: a legal ending, the test then saw the next life); kc-lore route td regression PASS.

## Questions / limits for main (round 1, kept)

1. cn vs cnv key naming (top of this report).
2. "Vào cung ngay" still enters at the origin rank directly; OD:L1250 says every origin earns its rank at a selection. Should the direct
   road get a selection too (out of this task's scope)?
3. KIT REQUEST (not blocking): an entry animation part (OD:L1244) for every origin; none exists in KIT.md that I could reuse.
4. Co-op edge: if the friend is at home and my rolled origin has NO home road (cn "Cung nữ được sủng hạnh"), I still enter at once (the rule
   cannot hold without a home road for cn). Same if both press "Nhận thân phận" in the same instant with different roads.
5. bd lives on review/origins-r1 (not on main): jkc2 carries its data; it was tested in a local scratch merge only.

## HANDOVER (worker rollover, context 67 % > 60 % ceiling, 16/11 08:42Z)
For the next worker who takes Foreman D's FAIL list on this branch:
- Worktree pattern: `git worktree add /home/user/wt/<name> -B review/kc-roads-cn-nc origin/review/kc-roads-cn-nc` (sparse as PREAMBLE). Code: dev/build/jkc2.js only
  (+ one line in assemble.py, after jkc.js). Rebuild: `bash dev/site/build_site.sh`; commit index.html/sw.js/assets.json with it.
- Map of jkc2.js: KC2K kinds (dan=cnv, nc=nc/bd) → places/words → kc2Init → cards (kc2CardsDan / kc2CardsNc) → kc2Week (KC2CD cool-downs) /
  kc2Month (chapters 4/10/16, sending at S.kc.due = kc2Due()) → KCE events d_* / n_* → selection kc2Exam/kc2Play (hook window.kcEntryExam) →
  kc2Enter → kc2EnterSrv / kc2EnterNc → kc2Carry (BAL.kcv) → panels (kcFamHTML, kcMapHTML, hud …) → "Vào cung ngay" selection (PEND.kc2Sel,
  kc2SelDo, nlAccept wrapper) → kc2R0 (j67 chapter-1 base rank).
- Tests: dev/test/kc-roads/route.js (--origin=cnv|nc|bd), direct.js, coop-together.js (live Worker, --a/--b), scan.js; dev/test/kc-lore/route-td.js
  (tt/td regression). Balance: dev/measure/kc2val.js <n> <origins> <out> [arms] + kc2val-sum.py (palace arm files kc2val-a/b.json, home arm a3/b3).
  bd needs a local scratch merge of origin/review/origins-r1 (assemble order: … 'jkc.js', 'jorigins.js', 'jkc2.js'); never push that merge.
- Open: art list (above), entry animation (Foreman D), bd dependency, the tt "Mạnh thái y ???" flag.
