# PROGRESS small-bugs-4 (D47) — branch review/small-bugs-4, from origin/main a523531da

Six small faults (OWNER_LEDGER D47). Each was checked on origin/main + origin/review/* first (LUẬT ƯU TIÊN SỐ 1), then the WHOLE class scanned.
Static scan: `python3 dev/test/sb4-scan.py` (before: 16 hits, after: 0). Browser: `node dev/test/small-bugs-4.js <page url> <WxH@dpr> [shot dir]`
(page = doctype + charset + dev/index.html from `python3 dev/build/assemble.py`).

## Per bug

| # | Fault | Status | What changed (class) | Before → after |
|---|-------|--------|----------------------|----------------|
| 1 | jaudit "Vì sao" at Thỉnh an in trung y said "mất Danh/Đức" | FIXED | `aaThieuLeWhy(host)` (jaudit) builds the line from `leAttire().delta`: trung y → "Đang mặc trung y trước bề trên: thiếu lễ, <host> phật ý (không đổi cơ may; Danh/Đức đã tính theo lệ mặc trung y ra khỏi tẩm cung)"; frugal host pleased → "Y phục giản dị hợp ý …"; under-rank dress → names only the Danh/Đức really lost. jtoil's filter keeps the toilette reasons single. Class: Thái hậu / Hoàng hậu / Hoàng thượng cards (3 hosts) | hard-coded "mất Danh/Đức" on 3 hosts → 0, text read from the real verdict |
| 2 | "Phi ???" (stranger) in greet + arc tab Mục tiêu | FIXED | (a) greet: bowing to a host face to face (Bái kiến at the gate `accEtqGo`, and after arriving `cbGreetGo`) now reveals her FACE (`k61Meet(h,"",1)`, j61 rule: greeting = face, not name); before, the host stayed a grey "Người lạ" silhouette after being bowed to. Name stays "???" (rule kept). (b) arc: `arcReveal67` inside `fill67`: a goal/step text that names the arc's people ({v},{v2},{foe}) makes them known by name (stage 2, silent) — the Mục tiêu row said "Ta phát hiện Quý nhân ??? lén vay bạc…" about the very woman the chapter found out. Class: both greeting paths; every `fill67` caller (log, chapter card, Chương tab, step dialogs) | greet: face grey → face known; arc: 4/4 sampled arcs "???" → real name |
| 3 | VANPHONG "theo lòng nàng" ambiguity | FIXED | jts "Bỏ qua" hint: "<tên cung nữ> chọn giúp (có hợp ý hay không tùy thiện cảm của <tên> với ngươi: <odds word>)". Scan class `theo lòng (nàng|ngươi|người|chủ)`: this was the only one. Two rows added to VANPHONG (cung nữ làm hộ; Đang mặc in sentences) | 1 hit → 0 |
| 4 | One kit sample page (?kit vs #kit) | ALREADY DONE on origin/main | Only `#kit` (jkitpage.js `kitSamplePage`, one `KIT_SAMPLES`, 37 samples) exists; the opt-render `?kit`/`kitSample()` page was dropped (KIT.md §28.6 note). No branch among the 60 newest origin/review/* defines `function kitSample(`. **Canonical page = #kit (jkitpage.js, KIT §47).** Scan + browser check keep it at one | 1 → 1 (nothing to do); test asserts it |
| 5 | "Đang cài" leftover | FIXED | Worn-label class "Đang mặc" (OD 16/11 08:00Z, VANPHONG): `jgift.js` other-person item card, `jwdinv.js` bag label (`onText`) + "Ngươi đang cài/mặc" sentence, `jinv.js` "Ngươi đang đeo/dùng", `j8.js` card "· đang đeo" and the "Đang đeo: Sắc +…" header (+ jveil's matching anchor), `jtsb.js` "(ngươi đang đeo)", `jmark.js` emblem bag label "Đang dùng". The j84 FULL row that rewrites old saves is kept. Kept on purpose: emblem sentences/tooltip "đang dùng" (switch with Dùng), "trang sức đang đeo" prose in act text (an action, not a label). KIT.md line 1106 text updated | 10 hits → 0 (`wear` scan) |
| 6 | Servant-road header Đức "!" | ALREADY DONE on origin/main | jk3 `k3Hud` guards the lập-Hoàng-hậu warning with `!(window.kitRoad&&kitRoad())` (kitRoad = "srv" / "cold"). Verified live: `.kstw` absent on the servant road and in lãnh cung, nothing past the right edge, at every viewport below. Warn is set only in jk3 (scan `srvwarn`) | 0 → 0; regression test added |

## Tests (dev/test/small-bugs-4.js, one Chromium at a time, box CPU-starved)
Run on the final build (own http server, one Chromium at a time): 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@3 —
all six: checks why / wear / greet / arc / skip / srv (servant road + lãnh cung) / kit = 0 problems, 0 page errors, kit page = 1 page with 37 samples,
exit 0. (At 390x844 the design canvas is the rotated 1180x820 frame; the same checks pass.) Baseline probe on the unfixed build reproduced:
arc goal "Quý nhân ???", greeting leaving the host grey, "mất Danh/Đức" line (static), "Đang cài" (static).

## KIT REQUEST (not built here — ONE KIT KEEPER)
- KR-1 `kitRelDelta` (result card "Được" rows, `rtoast`): for a person the player only knows at stage < 2 or without numbers (j61: "no traits, bars or numbers" until identified) the row prints her real before→after thiện cảm ("Quý phi ???: có thiện cảm với ta hơn (8→1, +2)"). Kit part should print only the change sign (or "chưa rõ") when `kitKnownName(p)` is false, like `kitRelRows` already does ("a stranger shows no numbers", jkrel.js:30). Not fixed here: kit part.

## Notes for the coordinator
- `dev/index.html` is generated (not committed); site files (index.html/sw.js at repo root) are NOT rebuilt in this branch — run `bash dev/site/build_site.sh` after merging with main (needs CDN reachability).
- Owner question left alone: emblem sentences keep "đang dùng" (the emblem is switched with Dùng); only its bag label became "Đang mặc".
