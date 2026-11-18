# REVIEW men-forbidden — VERDICT: PASS 94a93759 (review/men-forbidden-r6 94a93759, FF of live main 9393889d)
Reviewer session_01UV1Szh3jq9brqAHDsVQitM (opened by MAIN s42; result sent to MAIN s43 session_01UV1Szine3C2fgBgQ8qCx5w).
START_CTX ~12 %; no rollover needed.
PRIORITY #1 CHECK ('men-forbidden|menLawful|menMinW|cấm địa'): OD:L168 + OD:L1795 (18/11 ~02:20Z) read verbatim | main jmen.js menZone/menSched/menMinW/menCard (law existed, reused) | review/men-forbidden 13286b4 | claims MAIN s41 SziLuyr (worker), this review row filled.

## Branch
- worker 13286b4 (jmen.js menLawful + S.minF; MEN_PLAN; dev/test/men-forbidden.js) — code read in full; one ONE-rule gate, no new UI, no kit part, no new player number (BAL untouched), wording cổ trang.
- r6 7090b019 (reviewer fix, below), then main merged 4 times as it moved (each time only generated index.html/sw.js conflicted → rebuilt by assemble.py + build_site.sh): 0d98a2bb (f8276cdb greet-stranger) · 8f27d7be (95d5f767 cloth-xoc/result-reason/smudge) · 640809f9 (e24d5838 staff-cap) · bd8547f2 (0527f921 cloth-tea, jcloth.js only) · 94a93759 (9393889d life-preload: quickcheck PASS, men-forbidden test bad [], coop-e2e 63/63 x2).
- Gates per sha: quickcheck PASS on all 5 (13286b4, 0d98a2bb, 8f27d7be, 640809f9, bd8547f2); dev/test/men-forbidden.js bad [] on all; old-save test r6 PASS on 0d98a2bb + 8f27d7be; coop-e2e 63/63 x3 on 13286b4, 0d98a2bb, 8f27d7be; on 640809f9 1 of 3 runs 63/63, two flaky runs unrelated to men (socket close 1006 loop at join; host held by an 'Điềm báo' omen card in week 3) — bd8547f2 adds only jcloth.js from main, coop not rerun.

## Reviewer fix (old saves) — found by my own old-save test
A save made on live main at a festival buổi still holds S.minW officials "vuon" and the j95 record ("q:<house>" rows at vuon) for the rest of that buổi.
On 13286b4 such a save loaded with TWO officials standing in Ngự hoa viên at buổi tối (stage people [min Thượng Quan Văn Uyên, min Bạch Thừa Chí]) — the owner's exact bug.
Fix: jmen.js `menLoadFix()` on deser (runs before j95c restages): official rows / S.minW entries in the hậu cung → cleared (buổi 1–2 of a festival: moved to S.minF, banquet in the outer court);
prince/envoy with the removed reason "fest" in the hậu cung → cleared from S.menW/S.menWhy and the record. Strays, summons, orders, visits untouched.
| old save (made on live main, Hội Phượng) | 13286b4 | r6 |
|---|---|---|
| buổi tối: S.minW after load | {Lễ bộ: vuon, Tể tướng: vuon} | {} |
| buổi tối: men/officials on Ngự hoa viên stage | 2 officials | 0 |
| buổi trưa: S.minF after load | — | Tể tướng (outer court) |
| page errors | 0 | 0 |

## Checks (brief items)
1. No man in an inner-court place outside menLawful — my own scan (scratch, not committed): 72 tuần x 4 buổi (2 years, all 14 festivals, Hội Phượng 24 buổi, tối incl.), every hc place goTo'd every buổi, origins ch + thd (two new games each), schedule + stage + S.minW:
   | scan (0d98a2bb unless noted) | buổi | bad | lawful kept |
   |---|---|---|---|
   | origin ch (13286b4 build) | 288 | 0 | thái y summons 56, nhạc/họa sư order 48, vương gia @tn visit 24 |
   | origin thd | 288 | 0 | thái y summons 61, nhạc/họa sư order 48, vương gia @tn visit 24 |
   | officials in hc / consorts in nt | 576 | 0 / 0 | officials at Ngự thư phòng sáng; banquet official → S.minF 64 per run |
   Worker test dev/test/men-forbidden.js on 0d98a2bb: checked 288, stage 130, bad [], stray at vườn/tối → card fires, 0 page errors.
2. Consorts in the outer court: 0 in every scan.
3. Festival content: festivals run from j31 FESTEV (independent of men); no code reads the removed "fest" reason; the banquet official lives on in S.minF (64 festival buổi per 2 years) and is told by the eunuch on the Ngoại triều card. Nothing lost.
4. greet-stranger untouched: branch diff vs main touches only jmen.js, MEN_PLAN.md, dev/test/men-forbidden.js (+ generated); greet-stranger r6 merged in from main and its gates ride in quickcheck/coop.
5. quickcheck on 0d98a2bb: PASS (core gates incl. one-core-guard, rules-one-source, kit-conform, coop one-world; time-spill; open; old save from live; perf new/live render 207/190, buổi 957/1018 ms).
   coop-e2e x3: 3/3 runs 63/63 passed on 0d98a2bb (13286b4: 3/3 runs 63/63 before the main merge).
   old save with a man in the garden: see table above (r6 PASS both buổi).
6. Shots (host mode, Hội Phượng, Ngự hoa viên; looked at all 4; no overflow, no errors): tối = Hoàng thượng + a maid only; trưa = consorts only, no outside man.
   https://ctm-img.victoria-tntt.workers.dev/img/_review/men-forbidden-r6/vuon-toi-phoenix-755x1000.png
   https://ctm-img.victoria-tntt.workers.dev/img/_review/men-forbidden-r6/vuon-toi-phoenix-1180x820.png
   https://ctm-img.victoria-tntt.workers.dev/img/_review/men-forbidden-r6/vuon-trua-phoenix-755x1000.png
   https://ctm-img.victoria-tntt.workers.dev/img/_review/men-forbidden-r6/vuon-trua-phoenix-1180x820.png
   Wipe after merge: python3 dev/site/cdn_sync.py --wipe-review men-forbidden-r6 (worker folder men-forbidden too).

## Follow-up (not blocking, for MAIN to route)
- j96 love story, origin "ch" (Vương gia biểu ca, haunts ["vuon","tn"]): when the j95 record has him nowhere, rosterWhere/loc96 brings him to haunts[0] = Ngự hoa viên with reason "go" ("lặng lẽ đến"), outside menSched/menLawful. It is her own lover's secret visit (story-intended risk, lộRisk), so not a plain greet-stranger; but if the owner wants it strictly under the ONE rule, route it as a stray (menWhy "stray") or send him to tn. Not seen in the scans (story not active there).
- Pre-existing, game-wide, not this branch: option cost text source strings "Chắc chắn · tốn: N khắc" (67 in index.html) — the kit renders them; left as is.
