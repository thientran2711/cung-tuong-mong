# review/cardflip-smooth: measures (16/11)
Harness: `dev/measure/cardflip-frames.js <url> <WxH> <tag> <cpuRate>` (Playwright, CPU throttle x4, DPR 2, `cfDemo(14,3,"me")`, Chrome trace summed by `cardflip-trace.py`).
CAVEAT: the sandbox load average was 40-60 on 4 cores and the GPU is SwiftShader, so wall-clock frame times (rAF deltas) were 1-4 s for BOTH builds and say nothing.
The numbers below are CPU/event counts of the scene, which do not depend on load. A real iPad check is still needed for p50/p95.

| 1180x820, x4 throttle, same scene | before | after |
|---|---|---|
| Decode Image events during the scene (plates re-decoded mid-flip) | 99-116 (1.5 s CPU) | 1-4 (4-60 ms) |
| Layout passes / CPU (layout thrash: read-write-read per card) | 168-186 / 1.0-1.1 s | 16-37 / 8-240 ms |
| RasterTask events | 917-921 | 293-389 |
| Style recalc CPU | 3.8-6.0 s | 0.5-1.5 s |
| Script (FunctionCall) CPU | 6.4 s | 0.3-0.9 s |
Causes found (code reading + trace): `mask-image` on the animated plate box, two full-plate `mix-blend-mode:soft-light` overlays over moving cards, no `decode()`
before the scene, `getBoundingClientRect` read/write/read per card (arrange + carry), the turned card re-parented mid-flip (childList mutation for ~12 body-wide
MutationObservers), different filter-function lists per card state, permanent `will-change`.
