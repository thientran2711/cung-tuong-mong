# s128 room 9FVJ guest (Fold 755x1000) page freeze, u4 7959f1b5 build b0cf6e61f03b, harness #17 (U1d)
- guest renderer (pid 2933, chrome-headless-shell) wedged at buổi 73 (00:53:56Z); page.evaluate > 15 s from then on, never recovered; reload (stage 1) and page.close (stage 2) did not return.
- main thread 90 % CPU (R state, NOT waiting), anonymous memory 2.3 GB (buổi 71, JS heap only ~123 MB) -> 3.9 GB -> 7.7 GB at 01:11Z, growing ~0.3 GB/min = native/alloc loop, not JS heap.
- CDP Debugger.pause timed out (no JS frame reachable) x several; Runtime.evaluate (localStorage) timed out; heap usage "TO".
- gdb samples of the main thread: no symbols, RIP different each sample (0x559aaf734a94, 0x559ab7d806fd) = running code, not blocked.
- host seat (iPad) then waits on #coopfz 15 min (host-stuck-1-*). The 2 other renderers (77/78 MB) are idle blank tabs.
- Prior owner note: both earlier freezes (Q4XY, KJ2Z) were also on a guest-ish seat; this one = Fold seat as GUEST (host iPad), room code 9FVJ.
