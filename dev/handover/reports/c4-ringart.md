# C4-RINGART — act pictures for the faction ring plaques (worker of Foreman C ROOT 4)
depth 1 · START_CTX ~4 % (estimate; get_session read 0) · session_01PEhRbtWZ3sD3nbQtNSs3sP · brief dev/handover/briefs/c4-ring-art.md
PRIORITY #1 CHECK: brief's check (OD §104.2 | main jkring.js:372-374 FA_LAB, ACTS.json no entry | review/* none | claims none) + CDN _index.json: 1580 act pictures scanned for phe/minh/ten/xem/moi/duoi… → 4 of 5 plaques REUSE an existing picture (looked at 16 candidates on 2 contact sheets).

## Result
| plaque (jkring) | picture | how |
|---|---|---|
| «Lập phe» (lap) | act-ket-minh-h — two hands clasped over a censer, a pact | reuse |
| «Mời vào phe» (moi) | act-nhan-loi-vao-phe-h — a cup of tea offered into the faction | reuse |
| «Gạch tên» (gach) | act-gach-ten-h — **NEW**: red-sleeved hand striking one line of a faction roster scroll, candle + jade box, night | 1 gen |
| «Hợp mưu» (hop) | act-hop-muu — already existed; only the short plaque label had no entry | reuse |
| «Xem» (every ring's see-plaque) | act-xem-nguoi-h — hand raising a list of names before a row of folded hands | reuse |

- Sheet (Foreman LOOK): https://ctm-img.victoria-tntt.workers.dev/img/_review/c4-ringart/sheet.webp (+ the 5 pictures in the same folder). New picture live: https://ctm-img.victoria-tntt.workers.dev/img/act-gach-ten-h.webp (HTTP 200).
- Gen: Magnific gpt-2-6, 3:4, 1k, folder ba4aecfe…, ref fHA471qCDY (night Hành sự ref), id **u5TgsUgQLD**, **80 cr** (one try, no redo). Cropped 384x506 q82 by dev/figwork/acts/hfetch.py; logged in hgens.txt.
- Prompt = dev/figwork/acts/hprompt.py form UNCHANGED (approved hands-only Hành sự form, same as the 4 neighbours) + one scene line in hscenes.txt (`gach-ten|1|…`).
- LOOK (full size 768x1024): one hand, thumb + four fingers on the brush, attached to the sleeve; one firm stroke through a single roster line, other lines untouched; no face, no text (abstract lines + flower marks only); dark mood (candle, moon) like act-hop-muu. structure: new picture, no old one to compare.
- GATE EXCEPTION (Foreman C ROOT 4, 19:34Z + 19:38Z): check_store.py --scope any FAILS only the MASTER figure lines M01, M02, NOEAR, M03–M14, S34 — figure-sheet rules (full body, face visible, style-ref skin, earlobes) that cannot apply to a hands-only act card (OD:L544 / N1: no face on act pictures). Exception granted by the foreman; no figure sentences added. Every other check PASS (length 1212 < 10 000, no F14 words). keep_check: n/a (new scene line, not an edit of a stored prompt).

## ACTS.json mapping — branch review/c4-ring-art (from main bd47c753, data-only)
Commits df13c233 (mapping + live sync) and 53195071 («Gạch tên»).
- Cause of the wrong picture: log rule #91 `^Mời (?!làm|sư|thái y|…)` → hoc-voi-thay-con-h (teacher) caught every «Mời …» including the faction ones.
- Fix: acts «Lập phe», «Mời vào phe», «Gạch tên», «Hợp mưu» + slug key `xem` (exact only — a plain «Xem» key would have taken ~50 other «Xem …» labels through the longer-name rule; caught by the scan, fixed); new log rule `^[Mm]ời (.+ )?vào phe` → nhan-loi-vao-phe-h placed BEFORE rule #91.
- Also synced the git copy with the LIVE ACTS.json (it had 5 live-only acts: Hắt nước, Hắt trà, Quạt mực, Nhờ thái giám tìm thú nuôi, Hối lộ Kính sự phòng, and «Trò chuyện với cung nữ» = tro-chuyen-cung-nu live vs "-" in git) — live wins, so a push of this file loses nothing. manifest_guard PASS.
- Scan (law 11): every string literal in dev/build/j*.js starting Xem/Lập phe/Hợp mưu/Mời/mời/Gạch (464) + every label containing «phe» (229) through the real kitActArt in the built page, before vs after. ONLY these change:

| label | before | after |
|---|---|---|
| Lập phe / Lập phe cùng / Lập phe cùng ai | placeholder | ket-minh-h |
| Mời vào phe / mời vào phe / Mời người vào phe | hoc-voi-thay-con-h (teacher) | nhan-loi-vao-phe-h |
| Gạch tên / Gạch tên ai / Gạch tên <name> | placeholder | gach-ten-h |
| Gạch tên khỏi danh sách đuổi | placeholder | gach-ten-h (a name struck off a list — same act) |
| Hợp mưu | placeholder | hop-muu |
| Xem | placeholder | xem-nguoi-h |

- Left as is (not faction plaques / notes for the foreman): rule #91 still gives the teacher picture to every other «Mời <someone> …» choice (~70 strings: «Mời thái y…», «Mời {v} cùng góp…», «Mời Lan» in the hidden facHTML button) — a separate family, not touched without an order. «Xin vào phe» → act-xin-vao-bi-tu-choi (lady at a gate, faces visible) — works, but its name says «refused».
- NOT pushed live: img/ACTS.json on the CDN is unchanged; after reviewer PASS: `cp dev/art/manifests/ACTS.json img/ACTS.json && python3 dev/site/cdn_sync.py img/ACTS.json`. jkring not wired (KK61's job).
- Build + quickcheck (`bash dev/tools/quickcheck.sh` @53195071, 1444 s): build OK (fresh build = committed index.html, no NOT BUILT), open 2105 ms, old save loads + plays a buổi, 0 page errors. Verdict FAIL on two points that cannot come from this branch (it changes no file the build reads — the game loads img/ACTS.json from the CDN): (1) core gate G4 94-q-softlock «view parked by a tab change → card shows on court» (iPad), UI logic of main bd47c753; (2) perf longTaskMaxMs 3501 vs live 2131 (limit 3410) on an identical build = machine noise (other medians: render 307/263, tab 497/477, buổi 2048/1707). Flag for the reviewer / main: q-softlock fails on main as it stands.

## Credits: 80 cr total (1 gen).

## DONE 27/11 ~23:45Z (RV-176 PASS, LIVE 5fb13d60 = lc32-ui3 incl. c4-ring-art 53195071)
- CDN img/ACTS.json: checked, byte-identical to main dev/art/manifests/ACTS.json (already pushed at the go-live) → no re-push needed. It holds «Lập phe»→ket-minh-h, «Mời vào phe»→nhan-loi-vao-phe-h, «Gạch tên»→gach-ten-h, «Hợp mưu»→hop-muu, `xem`→xem-nguoi-h + log rule `^[Mm]ời (.+ )?vào phe`. `manifest_guard.py --live-check` PASS.
- img/_review/c4-ringart wiped (6 objects; sheet → 404). img/act-gach-ten-h.webp stays live (200).
- Plaque wiring = KK63 (not this worker). Work complete.
