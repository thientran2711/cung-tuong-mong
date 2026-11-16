# PROGRESS lag-play-2 (worker, opened by MAIN s21, now reporting to MAIN s22 = session_01UV1SzjhT28XQmRt2EHNffg; base review/lag-play @ 7200e7d2)
START_CTX ~6 % (estimate). Branch review/lag-play-2. Report: dev/handover/reports/lag-play-2.md.

## Task (owner first priority: no lag, single + co-op)
1. render() chain cost per buổi / tab -> split reads/writes, skip unchanged layers, render only visible tab. Goal tap p95 <= 200 ms @ CPU 4x (Fold 755x1000, iPad 1180x820).
2. co-op {t:"seat"} 37-47 KB every >= 3 s -> deltas, server-authoritative, resync path.
3. slow listener / DOM node leak (play-leak.js).
4. first Pixi load inside the first tap -> preload at idle after start.

## Done
- (2) jcoop send(): gzip above 8 KB (Worker already gunzips any binary frame) + ONE ordered send queue. jcoopworld seatPush: {t:"seatd"}
  delta (changed parts only) when the server lists caps ["seatd"]; seatresync -> full copy. Worker: seatd handler + caps in room reply;
  seat.test.mjs +7 checks (ALL OK). PROTOCOL.md updated. Live Worker NOT deployed (coordinator decision); staging worker for tests.
- (4) j11 pxPreload(): kitPixi + stage layer + FX overlay app at idle ~2.5 s after a life is in play.

- (1) render chain repeat work cut: j65 nrDOM once per render + fixTitles next frame; jlag2 kaNorm1 memo + __rendN/__rdep; j57 tabsFit
  memo; jk4 kitHdFit not mid-render; jpane observer per frame; j79/jaudit rank painters cheaper. Tab tap script −23 %, layout −20 %.
- Dropped: tab-only stage/HUD skip (DOM differs, see report).
- Tests: worker tests OK; coop-e2e 59/59; play-perf PASS fold + iPad.
## Next (successor) — see report HANDOVER: staging Worker + coop-lag, leak, Sang buổi, structural render plan.
SẴN SÀNG KIỂM: see last commit of the branch (report).
