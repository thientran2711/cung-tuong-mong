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
