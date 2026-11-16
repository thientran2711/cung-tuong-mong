# PROGRESS review/palace-start (opus, session 8)

Owner 16/11: "only princes in the palace" + "game starts right after the Emperor's accession; few children" + amendment
(coordinator, owner): about 4 SMALL children (1–4) at start, mixed, no đích tử; NPC births near normal; first-born not decisive;
side road (Emperor / Thái hậu / quyền thần) = hook only (D5). New games only.

## Cause of "only princes"
`newRival()` (j1) gave every rank ≥3 consort (incl. the Hoàng hậu) a 1/3 chance of a SON aged 1–4 (`mkKid("m",…)`), never a
daughter. Births (`birthP`, j8) were always 50/50, but NPC births are rare (BAL.conc .25 → ~0.4 births per palace-year), so the
palace the player saw was the start sons only. Fresh-game measure (old build, 60 games): mean 1.88 kids, 113 sons / 0 daughters,
Hoàng hậu had a son (đích tử) in 15/60 games, >2 kids in 15/60.

## Changes (all NEW games only: flag `S.ps`; old saves keep their data and old rules)
- j1 `newRival`: nobody arrives with a child (also fixes a new Hoàng hậu brought in mid-game arriving with a 1–4 year-old son).
- j1 `psSeedKids()` (called in j2 `start`): 3–5 children (BAL.ps.kidN weights 30/50/20), ages 1–4, each 50/50, at least one of
  each sex; a son's mother rank 1–5 and never the Hoàng hậu; daughters may be the Hoàng hậu's; ≤2 per mother, ≥2 years apart.
- j1 `mkEmp`: Emperor 19–25, `reignY:1`; j2: young harem of 10 (was 12: one Phi and one Quý nhân fewer), ages 18–22 (+2 queen/Phi+).
- j1 `psOpenText()` in the Nhập cung modal + j52 identity card "Hoàng thượng … mới đăng cơ": just enthroned, niên hiệu năm đầu,
  court weak (Thái hậu + đại thần phụ chính), harem young, children count, Đông cung empty.
- j2 `S.reign={y0,power:BAL.ps.power0,ch:0,side:null}` = hook for the Emperor side story and her side road (D5, not built).
- jbal `BAL.ps` (all numbers) + NPC conception × `npcConc[y]` (.9 in year 1, then 1).
- j51 heir weight: first-born bonus `BAL.ps.truongW` 8 (old saves 25); heir reason text in new games = "xét hiền tài: Tài, mẹ là
  <rank>, được ngài thương …(, lại là con trưởng)"; Emperor dies without heir → highest weight (old saves: eldest).
- Family text fix: j70 kframe routes said "hoàng tử" for a target child that can now be a princess → "hoàng tự".
- jcoopworld world load clamp `S.buoi` 0..2 → 0..3.

## Measure
`node dev/measure/palstart.js <page> init N` / `bot <seeds> 36`; analysis numbers are in the worker report.

## Numbers (dev/measure/palstart.js)
- Fresh games (init): old build 60 games: mean 1.88 kids, 113 sons / 0 daughters, Hoàng hậu son 15/60, max age 4.
  New build 60 games: 3 kids 17, 4 kids 35, 5 kids 8 (mean 3.85), 114 sons / 117 daughters, Hoàng hậu son 0/60, max age 4, no heir.
- Bot (inpage6 "sens", 36 months): old build 4 seeds: births 5 (0.42 per palace-year; second old run 12 in 4 seeds), events (modals)
  9.5 / 11.0 / 12.2 per year; new build 6 seeds: births 10 (0.56 per palace-year; 5 sons / 5 daughters; mothers npc 9, player 1),
  first prince born after the start: player 1, NPC 2, none 3; alive children end of y1/y2/y3 3.7 / 4.0 / 4.5; events 10.8 / 13.7 / 11.3
  per year; 0 deaths, 0 page errors.
- UI: Hoàng tự > Trong cung at 755x1000 and 1180x820 lists princes and princesses by mother, princess card (kit pcard) fine.
  Child art: 24 prince + 24 princess identities × bands 4/9/14/20 (+26/36/51) on the CDN, plus face-prince/princess-* 4 × 4: nothing missing.

## Not done / hooks
- Side road (Emperor / Thái hậu / quyền thần) and the Emperor side story: hook only, `S.reign.side` / `S.reign.ch` / `S.reign.power`
  (too big for this task: needs its own chapter/event set — D5).

## Review r1 (session 8 reviewer, branch review/palace-start-r1 = palace-start 3ac727833 + origin/main 2afdafc39)
Fixes made by the reviewer:
1. j53 `ktHeirInstall` kvW wrapper: for children whose talent is not yet shown (<6) it returned a hard-coded first-born bonus 25, so the
   palace-start `truongW` 8 never applied to small children (display order / Emperor dies early). Now uses the same `S.ps?BAL.ps.truongW:25`.
2. j51 heir reason for new games ("xét hiền tài: Tài N, mẹ là …") did not match the j53 rewrite regex, so it showed the raw old `tal`
   number (also for a rival's son, whose talent must stay a rumour word). Now "theo lệ lập hiền: Tài N, được ngài thương N; mẹ là <rank>
   (, lại là con trưởng)" so j53 swaps in Văn/Đức/Võ (her son) or "tiếng học hành <word>" (rival's son).
3. psSeedKids: mothers aged 18 had a 4-year-old (birth at 14; 288 of ~1180 seeded children had a mother under 17 at birth), and a
   19-year-old Emperor had a 4-year-old. New `BAL.ps.momAge` 17: a seeded child's mother (and the Emperor) is at least 17 at its birth.
4. Opening text: "niên hiệu X mới là năm đầu" → "nay mới là X năm thứ nhất" (VANPHONG year wording). Stale j2 comment "0–2" → "3–5";
   jbal NPC comment put back on its line. palstart.js takes env SEED0 for a different seed set.
Measures (after fixes): init 300 new games: 3/4/5 kids 80/159/61, 572 sons / 609 daughters, every game ≥1 of each sex, Hoàng hậu son 0,
max age 4, no heir, mother age at birth ≥17, Emperor 19–25 (mostly 21+). Bot SEED0=55555 8 seeds × 36 months: 7 lived, 1 bot death at
turn 2; NPC births 9 in 21 palace-years (0.43/yr; 6 sons 3 daughters; one Hoàng hậu son in year 2), events 7–14 per year, 0 page errors.
Old save (main build, 12 consorts, 3 princes) loads in the new build: no S.ps/S.reign, first-born weight still 25, 6 months tick + tabs
render, 0 errors. UI: Hoàng tự tabs at 1000x755, 1366x1024@2, 844x390, 755x1000@2: no overflow/cut text, princesses listed with princes
(Trong cung); Nhập cung text at 1000x755, 1366x1024, 844x390, 390x844 (rotate prompt) fine.
