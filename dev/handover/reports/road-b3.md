# road-b3 — Foreman B helper B3 (thd + cnv full roads .5–.11, endgame ch12–14)
START_CTX ~6 % of a 1M window (session_01N1tNP3uKUEBnyjuk4bnC7X). Rollover at ~31 %, ceiling 60 %.
Branch `review/road-b3` (off review/road-map @ 240c68a7). Worktree /home/user/wt/b3.

## Status (WIP)
- (b) ENDGAME built + tested: dev/build/jend14.js, BAL.road.end (jbal2.js), test dev/test/road-end.js (27/27).
- (a) thd + cnv roads: being written (4 writer subagents, one fragment per road in dev/build/rdfrag/, concatenated by rdfrag/cat.sh
  into dev/build/jrd_thd.js / jrd_cnv.js).

## ROAD_MAP §8.4 decision (cnv len14 vs 8-chapter road)
DECISION: cnv keeps the 8-chapter road (.4–.11) like every origin; ms:len14 «Từ kẻ hầu thành tiểu chủ» is no longer a middle chapter.
The rise happens INSIDE the roads: every cnv road has a real path that raises «Hoàng thượng để ý» (S.nt; the game's own rise rule
BAL.ntRise then offers the rise) and cnv_mat .8 «Đêm đầu» can raise her at once (srvRise) when S.nt >= BAL.ntRise.at. Every cnv chapter
reads right in both states (maid openings / consort openings). If she is STILL a maid when the road ends, chapter 12 is len14 (jend14 eg12),
so the 14 numbers stay and chapters 13–14 (consort chapters) open once she is raised.
REASON: (1) one frame for all 9 origins (4 + 8 + 3), no cnv special-case in jroad.js; (2) a separate len14 chapter would push a road
chapter out of 4–11 (len14 does not fit an 8-chapter road, map §8.4); (3) the rise belongs to the story (cnv_mat is the rise road, the
other three give it as a reward of a real deed) instead of a waiting chapter; (4) a maid who is never raised still gets her whole road.

## Endgame (b) — what was built (jend14.js, loaded after the road files)
Reused (LUẬT ƯU TIÊN SỐ 1): st_dong / st_con (j67 ch12, unchanged), MS67.len14 (jst14), lập hậu rules (j8/j34 seatW), exGrace (jexam),
setHeir (j1) / e67heir (j67) / succession j51/j99succ (unchanged), S.fert / S.pray (j8 conceiveCh), S.shield.
- New lives on this build get S.st.f14.eg = 1; their plan's `ms:hau` / `ms:ke` become `st:hau14` / `st:ke14`, and `end:12` is resolved when
  chapter 12 opens: still a maid → ms:len14 · a son → st_dong · a child → st_con · no child → noi14. Older f14 saves: unchanged (tested).
- noi14 «Người nối dõi» (ch12x, childless): thái y, cầu tự, a motherless princess, Hoàng thượng's visit, choose a road (đức / an ally
  mother of a prince = real relation / keep trying), climax before the Thái hậu. Real effects: S.fert / S.pray months, th, Danh, relation.
- hau14 «Tranh ngôi Trung cung» (ch13): openings by state (already Hoàng hậu: unseat attempt or "lục cung chờ xem"; Hoàng hậu ill; seat
  vacant), the rival = her strongest seat rival (seatW), sớ lập hậu, thánh ý. Win = one REAL step: below the Phi seats an ân thi at once
  (exGrace), at the top seat Thái hậu + Danh weight for the lập hậu choice (BAL.road.end.hauTh/hauDanh), as Hoàng hậu che chở months.
  The seat itself is still decided by the game's lập hậu rules.
- ke14 «Mẫu nghi thiên hạ» (ch14): son is Thái tử (guard him) / son not yet (win the court) / no son (mother of the lục cung); rival = the
  mother of the competing prince (real relation/oán). Win: no Thái tử yet and her son dear enough (fond >= keFond) → setHeir; else e67heir.
- Every option has a gain and a loss; numbers of chapter level in BAL.road.end; kit only (j67 cards).
- Open question (not built, would be a new system): real adoption of a motherless child (no adoption data on main) — noi14 keeps it as
  care with real Thái hậu/Đức effects only.

## Tests
- road-end.js (build 5907684 WIP, 755x1000): tt childless → noi14/hau14/ke14; thd son → st_dong; muoi daughter → st_con; cnv still a maid →
  len14; ch already Hoàng hậu + son → st_dong + hau14 «giữ ngôi»; cnv raised childless → noi14; frame closes at 14; old f14 plan kept;
  0 page errors: 27/27.
