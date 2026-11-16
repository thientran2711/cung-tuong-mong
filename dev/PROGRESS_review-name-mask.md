# PROGRESS review/name-mask (worker, Foreman D s3/s4)
Base: origin/review/reign-road-fix-r1 @90c5b9e5 (+ origin/main 18fb8252, already merged there).
Task: finish the "stranger's raw name / '???' reaches the player" family (Residue of review-reign-road-fix-r1).

## What changed (before -> after)
| # | file:line | before | after |
|---|-----------|--------|-------|
| 1 | j61.js (log wrapper, beside k61Announce, ~l.241) | every log()/Nhật ký/toast/result sentence naming a consort printed the raw name when a title did not precede it, or the DOM mask turned it into "Tần ???" (166 `log(\`..${x.name}..\`)` sites: j21:76, j27:26, j8:67-75, j20, j24, j42, j70, j71, j77, jclose, jpal:40-41, jmen, jpet …) | the ONE kit mask (k61Scrub, plain mode) runs on every log string at write time: "Hà Thục Lan sang cung ngươi thăm hỏi." -> "Một vị Quý phi chưa quen biết sang cung ngươi thăm hỏi." Announcements (K61ANN) first, so thánh chỉ / tấn phong still name people |
| 2 | j61.js k61Mask(e,before,plain) | only "<tước> ???" | new `plain` mode: "một vị <tước> chưa quen biết" (no literal "???"); DOM kit chip (kitName) unchanged |
| 3 | j61.js k61Scrub capital rule | name after a tag (`<span class="r">Name`) not capitalised | tag-only prefix counts as sentence start |
| 4 | j61.js k61Table cache | new consort (tuyển tú, maid promoted by j8:296) missing from the mask table up to 1.5 s -> raw name in the log line | cache also keyed on rivals.length |
| 5 | j61.js K61ANN | "phong Đáp ứng <name>" (maid raised to consort) not an announcement | `phong <Rank> ` is a public announcement (name becomes known) |
| 6 | j78.js:13 j78who | unmet -> "<tước> ???" (reign-road-fix-r1) | "một vị <tước> chưa quen biết" via k61Mask(p,"",true) |
| 7 | j27.js:32 palName("r"+id) | "thiên điện của <raw name>" everywhere palName is used (map, palace spots, visit result, j27:26 log) | "thiên điện của " + j78who(h) -> masked for strangers |
| 8 | j27.js:33 palFn | "cung <Tần> <raw name>" | "cung " + j78who(h) |
| 9 | j27.js:44 places().d | "Chủ vị <Tần> <raw name>" | "Chủ vị " + j78who(hd) |
| 10 | j63.js:195 kaResultRows | one row per stranger: "Quý phi ???: ghét ngươi hơn", "Tần ???: quý ngươi hơn" … | ONE aggregate row per direction: "3 vị chưa quen biết: quý ngươi hơn" / "2 vị chưa quen biết: ghét ngươi hơn" (same wording kitNameList uses); named people keep per-person rows |
Already masked by r1 (kitNameList): Triều cục rows, thiên điện lists, ứng viên, quà, tư tình, sổ thị tẩm — untouched.
KIT: no new kit part, no custom chip/row (reuses k61Mask/k61Scrub/j78who/kitNameList). KIT REQUEST: none.

## Tests (all one at a time, final build)
- dev/test/name-mask-scan.js (NEW): static (log wrapped; no "???" literal in log/result/palace code), live bot >=24 months (every log line checked at write time for raw unmet names / "???"), result rows (aggregate), palace names. 755x1000 PASS (31 months), 1180x820 see report.
- reign.js 755x1000 + 1180x820 PASS; panel-size.js 59 cases, 0 xOut/nofit/btnOut at 755x1000@2 and 1180x820@2.
- dev/test/name-mask-shot.js (NEW): screenshots of Sổ ghi + result toast looked at: no raw names, no "???".
- Test-script lessons: names shared with a maid / guard ("Hải Đường", "Hà Lăng Vân") are not a leak; the scan ignores 2-word variants inside another person's name.

## Residue / notes
- Masking is baked at log time (like j78who): after she later meets the person the old line keeps "một vị … chưa quen biết".
- Non-consort people (maid, guard, staff) are not masked: they have no stranger state in k61PortEnt.
