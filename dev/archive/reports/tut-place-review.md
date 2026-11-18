# tut-place review (reviewer) - PASS; READY sha 2e9615fb on review/tut-place-ready (= c82e567c + origin/main de239eca merged, site rebuilt, tour 755+1180 and podium re-run green)
Contains current origin/main 0ce59361 (fast-forwardable). Changes vs main outside dev/test: dev/build/jtut.js place() only, rebuilt index.html + sw.js.
Serial runs, cdn-overlay-serve, Playwright, no page errors:
- tutorial tour,skip: 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2 all fails 0.
- tutorial replay,old,bot: 755x1000@2 x2 green; 1180x820@2 x1 green, x1 red (replay).
- step "thu" at 755x1000: card 560x700 (same frame), hole 737x135, overlap 0 (screenshot seen: card below the lit card, not covering it). Only "tutrang" (non-tap, whole page) has overlap, by design.
- kit-conform: 1180x820 CONFORMS 89 floats none; 755x1000 CONFORMS 90, float "kloadchip" (main's jload.js download chip, not jtut) is the only reason for exit 1.
- podium, inv-grade, minigames-j71 at 755x1000@2 PASS. Earlier (on test-drift-roulette r1): toilette, mk-e2e, minigames PASS at 755x1000@2.
Known flake, NOT from this branch (jtut.js diff touches place() only): tutorial replay mode, "Xem lại lời dặn" from the title menu: replay flag set but menu modal "Cung Tường Mộng" stays open (busy), tour does not start (1 in ~4 runs, seen at 755 and 1180). Code in jtut.js l.401-404 (click handler closes the menu through [data-tgo=cont]). Possible real-player bug; separate ticket.
Not run: 1000x755, 390x844 (worker ran them green on a42c972c), 39 mass-switched tests (syntax only).
