# suc-khoe-fix — fixes for review r1 (dev/handover/reports/review-suc-khoe-r1.md)

Worker session_01DgYSWmv4sq7YAmDVGXa2JD (opus), coordinator FOREMAN D s7. START_CTX ≈ 3 % (own estimate; get_session read 0).
Branch **review/suc-khoe-fix**, from review/suc-khoe-r1 @ 41716164 (reviewer's F1 + F3 fixes kept). Site (root index.html / sw.js) not rebuilt; the coordinator rebuilds on merge.

## Finding → fix
| # | sev | fix | where |
|---|---|---|---|
| F1, F3 | — | Kept as the reviewer fixed them (r1 41716164). | — |
| F2 | BLOCKING | The ceiling now shows on touch, built only from parts the kit already has: (1) the HUD Sức cell reads **"Sức N/M"**. `hudFmt(k,v)` is ONE hook that every writer of that cell calls: renderHUD j6, hudTween j11 and k3Hud jk3; jkh makes it return "N/M" for Sức. (2) The Sức help panel (kit LUẬT) gets a "Ngươi đang có" section with kit rows: Sức · Sức tối đa · Sức khỏe in words (thái y scale + "thân thể hao tổn sau sinh nở…"). This goes through a generic `HXNOW[key]()` row provider in the j79 HUD-help converter. (3) Person cards via a `pcard` wrapper (same pattern as j70): hers gets "Sức tối đa: M" (the kit popup turns it into a chip next to Tuổi) and a "Thân thể hao tổn sau …" line. Every consort's card gets the words line; for NPCs only births count as a cause, because poison is not public. The Hậu cung consort card rebuilds its info row after pcard, so the words are added in front of its stats there, the same way as j24's danger word. No new CSS and no new part. No ceiling mark on the bar (it would need a KIT REQUEST, and the owner did not ask for one). | j6, j11, jk3, j79, jkh |
| F4 | BLOCKING | ONE CORE: **BAL.ngh** is the single blood-test block, read by jroute AND jkh. It holds alum, oil, frame, death %, the backlash Sủng/Danh/oán/punish level (the same for her and for NPC accusers), the chứng cứ she needs, and the Tai mắt thresholds. jroute now has the shared `rtNgNpcRes` (an NPC mother's test) and `rtNgOil` (an accuser's oil); `rtNgNpcAuto`, `PEND.rtNgNpc`, `rtNgSet`, `rtNgEst` and `rtNgLose` all read BAL.ngh. **khNgNpc calls rtNgNpcRes + rtNgOil** and no longer holds a copy. Other numbers moved into BAL: khMotive → `BAL.preT.mot`; the preterm low-Sức band → `preT.lowSucAt`; the khRecOff windows → `preT.recSlack/recMin/recMax` + `TUAN.length`; the miscarriage Sức loss and low-Sức band → `pgRisk.misSuc/lowSucAt/lowSuc`. The base pregnancy month **j8 pregMonthP reads the same pgRisk keys** (before, it held its own typed 30 / 8 / −20), and the text prints the key. One change: an NPC accuser was punished at level 2 and she was at level 1; now both use `accPun` 1 (two-way law). | jbal2, jroute, jkh, j8 |
| F5 | BLOCKING | A 'lệch sổ' birth is now a **true fact in the mother's ledger**. The jtruth `deedSync` is wrapped by `khDeed`: weight `BAL.preT.lsW` 3 (= accEv), for her and for every NPC. A clean mother can therefore be taken all the way to the blood test (owner Q3). The fact leaves the ledger once the test has been held (`tfOk`) or the child is past `ageMax`; any proof still held then turns into rumour through jtruth's existing sweep. Test: a clean mother has cap 3, the accuser reaches 3 and khWorld opens rtNgSet on her child; after the test cap = 0. | jkh, jbal2 |
| F6 | normal | Art: the kit placeholder stays for now (ART NEEDED below). Tab: **KIT REQUEST filed**. No kit category fits medicine, and the whole medicine group is scattered today (Giao thiệp / Học tập / Buôn bán / Hại người). Request: an act category `y-duoc` "Y dược". Its art `img/act-cat-y-duoc.webp` is already on the CDN, but no kit entry uses it. Logged in dev/kit/KIT_REQUESTS.md; coordinator told 16/11. I stopped that part (no private category). | KIT_REQUESTS.md |
| F7 | normal | Two-way: (a) when an NPC has a lệch-sổ birth, she gets the same `evi` chứng cứ (khLech → evA(S,m)); (b) her card "Tâu xin nghiệm thân …" has a kit need row "chứng cứ về X (có n/accEv)", the same bar NPC accusers need, and it is locked below it (shot). The existing affair card rtNgNpcCards now reads `BAL.ngh.needEv` instead of a typed 2. | jkh, jroute |
| F8 | minor | Spec 4.3 names j68e:104 → done. A thuốc bổ / bồi bổ choice in any event or dialog (j68e "Để thái y kê thuốc bổ", j42 "Xin thuốc bổ") calls the same `khTonic` as the deck cards, through a chooseM wrapper; a choice she cannot pay for does not count. | jkh |
| F9 | minor | recDefend: at her birth the thái y mạch án month (`S.pregDisc`, written when the thái y found the pregnancy; S.thy exists) is stored as `k.thyRec`. "Nghiệm lại" gets +recDefend only for a real lệch-sổ child (`dateOff`, not an affair child) AND with that record. Thái y verdict per spec 4.6: Sức khỏe < `BAL.kh.thyBad` 50 or ill → Có bệnh; < thyLo 80 → Hơi yếu; a bribed physician softens it one step (`thyVerdict`, exposed for the test). | jkh, jroute, jthaiy, jbal2 |
| F10 | minor | One word, one meaning. The gloss "Sức" no longer starts with "Sức khỏe": it now reads "Sức lực để làm việc trong ngày … Sức tối đa do Sức khỏe định." New gloss "Sức khỏe" = the lasting body, which sets Sức max. Children's "Sức khỏe" (k.hp) means the same thing (body health), so it is kept. The quẻ / deck domain "Sức khỏe" (health acts) also keeps its meaning. The "Sức khỏe định mức…" HX append and the hover-only title were removed. | j79, jkh |

## Number scan (F4, LUẬT SỬA CẢ NHÓM)
Every numeric literal left in jkh.js (regex scan) is one of: 0/1 counters or flags; pregnancy months 7/8/9/10/11 (the 10-month term of j8's own structure, not a tunable); 100, the top of the 0–100 stat scale. Typed blood-test numbers before → after:
| number | before | after |
|---|---|---|
| alum Tâm cơ 55 / 25 % | jroute ×2 + jkh copy | BAL.ngh.alumTc / alumP |
| oil Tâm cơ 60 / 35 % | jroute + BAL.preT copy | BAL.ngh.oilTc / oilP (rtNgOil); rtNgEst reads oilP/100 |
| frame thiện cảm −30 / oil 40 % | jroute | BAL.ngh.frameAff / frameOil |
| death 50 % | jroute ×3 + jkh | BAL.ngh.die |
| backlash Sủng −10 Danh −8 oán 40, punish 1 vs 2 | jroute (her) + jkh (NPC, punish 2) | BAL.ngh.accSung / accDanh / accOan / accPun (both sides) |
| Tai mắt 2 / 4 (hear of / learn of oil) | jroute + jkh | BAL.ngh.seeMat / oilMat |
| her chứng cứ need 2 | jroute | BAL.ngh.needEv |
| motive 1 / 0 / −30 / 45 | jkh | BAL.preT.mot |
| low Sức 30, +8, Sức −20 at miscarriage | j8 + jkh | BAL.pgRisk.lowSucAt / lowSuc / misSuc (+ preT.lowSucAt) |

## Tests (one at a time, build = this branch)
| suite | result |
|---|---|
| dev/test/suc-khoe.js (1180x820), extended with a check per finding (F2 HUD N/M, help rows, her card / consort card lines; F5 clean mother → cap 3 → evidence 3 → blood test, cap 0 after; F7 she gets chứng cứ + card locked below accEv, open at it; F8 event tonic; F9 thyRec + verdicts Khỏe mạnh / Có bệnh / Hơi yếu (bribed); F4 khNgNpc calls rtNgNpcRes) | PASS (f: []) |
| dev/test/mortality.js 240 2 | ok, no page errors |
| dev/test/cycle.js (sizes 1180 / 1366 / 844 OK) | the only FAIL is "390x844@3 NO rotate prompt", **identical on the base 41716164** (pre-existing) |
| dev/test/routes.js 755x1000@2 + 1180x820@2 (zz-test.html charset wrapper, not committed) | no page errors, no overflow, no cut text (16/16) |
| old save: a save made on the r1 build (40 weeks, age 44) → loaded on this build, 6 more weeks | no page errors; khScar/cap kept, every NPC initialised, HUD "90/90", help rows OK. A save with no kh fields is covered by suc-khoe.js §8 |
| **coop-e2e.js** (LIVE Worker, Fold host + iPad guest + solo), with a NEW check: NPC Sức khỏe / Sức tối đa / scars on the guest = the host's (owner CO-OP FIRST OD:L1447) | **60/60, no page errors** (3rd run). Runs 1–2: 59/59 before the check was added, then 59/60 and 58/60. The fails were in the friend-known / freeze-on-leave steps, a different step each time (live-Worker timing); none touch this branch, and the health check passed in every run |
| one-world probe | review/coop-one-world is not on main (checked origin/main): not applicable |

Co-op (CO-OP FIRST): every jkh NPC health / pregnancy / lệch-sổ / drug roll runs on the host only (`khGuest()` skips it on the guest, like jmort). The guest receives the NPC objects whole in the host's world blob (W.R = ser() rivals), so khScar / khTmp / khSw and everything computed from them (Sức tối đa, the words lines, thái y words) are the host's numbers. The new coop-e2e check proves guest = host. Her own health is her local saved state (spec 4.7), and the same functions apply to it. No new sync channel.

## D57 bot (dev/measure/sk-bots.js, BALJ conc .5, SEED0 5000, Sủng ≥ 25, 40 lives × 10 years, the reviewer's seeds)
Two runs per arm. **The bot is not deterministic even with the same seeds** (the base arm gave 17 then 25 deaths of hers), so differences inside the run-to-run spread are noise.
| arm | run | NPC births | consort-years | births / consort-year | NPC mother died in childbirth (per 100 births) | NPC miscarried / 100 pregnancies | her births / her childbirth deaths | her deaths before year 10 | ng_set / ng_oan per life | lệch facts → tests (mixed / innocent lost / guilty caught) |
|---|---|---|---|---|---|---|---|---|---|---|
| base r1 41716164 | 1 | 665 | ≈ 3636 | 0.158 | 53 (8.0) | 19.0 | 25 / 4 | 17 | 1.00 / 0.05 | 80 → 39 (34 / 2 / 3) |
| base r1 41716164 | 2 | 540 | ≈ 3185 | 0.148 | 33 (6.1) | 22.0 | 22 / 5 | 25 | 0.82 / 0.03 | 66 → 33 (32 / 1 / 0) |
| **fix** | 1 | 503 | ≈ 3146 | 0.139 | 35 (7.0) | 20.1 | 21 / 6 | 25 | 0.72 / 0.07 | 53 → 29 (23 / 3 / 2) |
| **fix** | 2 | 500 | ≈ 3019 | 0.151 | 26 (5.2) | 20.0 | 22 / 5 | 27 | 0.93 / 0.07 | 68 → 36 (27 / 3 / 5) |
- Births per consort-year: 0.139–0.151 (fix) vs 0.148–0.158 (base), the same within noise. Nothing in this branch touches conception. BAL.conc not retuned.
- Mother deaths in childbirth: the same formula (jmort untouched); 5–7 per 100 NPC births on both arms.
- Her death causes (new `why` field in sk-bots), fix run 2 vs base run 2: lao phổi 9 vs 10, khó sinh 5 vs 5, xuất gia 5 vs 2, sốt rét 2 vs 2, trúng độc 2 vs 0, kiết lỵ 1 vs 0, Emperor's death 1 vs 4, tuổi trời 2 vs 2. **No death of hers came from a blood test** in any run. The gap in her deaths is run noise (the base itself went from 17 to 25).
- ng_set / ng_oan per life: 0.72–0.93 / 0.07 (fix) vs 0.82–1.00 / 0.03–0.05 (base). The bot player never rigs or defends the bowl, so "innocent lost" = an NPC accuser oiled the bowl: 3 per 40 lives.
- Health: her Sức max < 30 y ≈ 97.7–98.3; NPC 30–40 y health ≈ 92, cap ≈ 95.

## Shots (scratch only, not in git; I looked at every one) — 755x1000@2 and 1180x820@2
- HUD: "Sức 60/80" fits the kit cell on both devices (also "80/100" / "100/100" at 20 years).
- Sức help: LUẬT panel, "Ngươi đang có" kit rows Sức 60 · Sức tối đa 80 · Sức khỏe "Hơi yếu · thân thể hao tổn sau sinh nở".
- Her card: chips "Tuổi 46 · Sức tối đa 80" + line "Thân thể hao tổn sau sinh nở" (1180); on 755 the same rows sit below the items.
- Consort card (Hậu cung): "Thân thể hao tổn sau sinh nở" in the info row.
- Her lệch card on a Hoàng hậu's child: kit Cần row "✗ chứng cứ về … (có 2/3)", locked.
- Her demand dialog "Tâu xin nghiệm thân": the Mất row prints the BAL.ngh backlash "(Sủng -10, Danh -8)".

## ART NEEDED (Foreman C draws; kit placeholder until then)
- `img/act-uong-thuoc-thuc-sinh.webp` — act card art for "Uống thuốc thúc sinh" (a woman in late pregnancy, a physician's bowl of dark decoction, night, discreet). Same size/format as the other act-* art (act card square slot, as act-an-thai.webp); add ACTS.json key "Uống thuốc thúc sinh" → "uong-thuoc-thuc-sinh".
- Category art for the requested `y-duoc` group already exists (act-cat-y-duoc.webp).

## Open / notes
- KIT REQUEST y-duoc (F6, the tab) — waiting on the kit keeper; the card's tab changes by itself once the category regex exists.
- Side effect to know: a lệch-sổ fact is chứng cứ, so while it stands (child ≤ ageMax, not tested) other evidence users (j70 accuse) can also use it, just as with the existing pregMismatch fact.
- Pre-existing, not from this branch: cycle.js "390x844@3 NO rotate prompt" fails identically on the base 41716164.

SẴN SÀNG KIỂM da50857db4bb14947762d7ddfc8d556409a7ec2e
