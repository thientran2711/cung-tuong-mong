# ROBOT AUDIT D — nc line (Foreman D) vs owner rules 25/11

PRIORITY #1 CHECK: OD 25/11 ~05:10Z/05:15Z/05:20Z/05:40Z/05:45Z/05:58Z | main/handover dev/measure/robot-audit.js (F 60a6ae02), E patch not needed | review/* robot-realtap harness (reruns) | claims: this seat (session_01D3E3NZM1yXd1hK7K488mpj).

AUDIT D total 110 valid 48 invalid 62 (cap 35 / timeout+stuck 16 / harness-error 2 / exit 9 / jsclick-ignored, per OD 25/11 ~05:58Z)

Method: F robot-audit.js over every D file (nc-*.md, nc-B-tuc/, nc-B-vuong/, ncA/(+su1,su2), round-nc-20261124/); JSON is authoritative, .md life tables used only where no JSON exists (nc-20261123-2126, -2308); duplicates of the same life across md/json dropped (70). VALID = death / game-imposed ending, no bot-chosen exit, not cap/timeout/stuck; JS-click harness NOT a reason (owner ~05:58Z: machine clicks that played a true end count). Old robot10-nc files: none other than these.

## Counts by road

| road | lives | valid | invalid |
|---|---|---|---|
| nc_gian | 29 | 16 | 13 |
| nc_su | 29 | 9 | 20 |
| nc_tuc | 26 | 7 | 19 |
| nc_vuong | 26 | 16 | 10 |

## All lives

| round (file) | life | end | valid? | why |
|---|---|---|---|---|
| nc-20261123-2126.md | nc-nc_gian-skilled-1 | Hồng nhan bạc mệnh [death: Kẻ thù còn sống: Chung Anh Ninh, Lục Mạn Ch | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-20261123-2126.md | nc-nc_su-random-1 | TIMEOUT [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2126.md | nc-nc_tuc-greedy-1 | HARNESS [no ending] | INVALID | harness error (no life) |
| nc-20261123-2126.md | nc-nc_vuong-cautious-1 | Hồng nhan bạc mệnh [death: Kẻ thù còn sống: Phương Ý Hoan, Thẩm Mạn Ch | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-20261123-2126.md | nc-nc_gian-schemer-1 | Hồng nhan bạc mệnh [death: Kẻ thù còn sống: Sử Hàm Hương, Doãn Thanh U | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-20261123-2126.md | nc-nc_su-lover-1 | HARNESS [no ending] | INVALID | harness error (no life) |
| nc-20261123-2126.md | nc-nc_tuc-scholar-1 | Hồng nhan bạc mệnh [death: Kẻ thù còn sống: Ôn Vân Tịch, Trương Tâm Du | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-20261123-2126.md | nc-nc_vuong-rebel-1 | CAP [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2126.md | nc-nc_gian-lazy-1 | TIMEOUT [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2126.md | nc-nc_su-speed-1 | TIMEOUT [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2308.md | nc-nc_gian-skilled-1 | Hồng nhan bạc mệnh [death: Hoàng thượng niên hiệu Chính Đức băng hà, t | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-20261123-2308.md | nc-nc_su-random-1 | TIMEOUT [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2308.md | nc-nc_tuc-greedy-1 | CAP [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2308.md | nc-nc_vuong-cautious-1 | Hồng nhan bạc mệnh [death: Tuổi trời đã tận, trọng bệnh không qua khỏi | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-20261123-2308.md | nc-nc_gian-schemer-1 | Hồng nhan bạc mệnh [death: Kiết lỵ nguy kịch, không qua khỏi] | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-20261123-2308.md | nc-nc_su-lover-1 | CAP [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2308.md | nc-nc_tuc-scholar-1 | CAP [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2308.md | nc-nc_vuong-rebel-1 | Hồng nhan bạc mệnh [death: Giả mang thai bị thái y khác bắt mạch phát  | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-20261123-2308.md | nc-nc_gian-lazy-1 | TIMEOUT [no ending] | INVALID | wall cap (no ending) |
| nc-20261123-2308.md | nc-nc_su-speed-1 | TIMEOUT [no ending] | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-skilled-1 seed 1103809447 | CAP (age 31 y14) | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-skilled-2 seed 3241370198 | CAP (age 32 y14) | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-random-1 seed 4180392236 | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-random-2 seed 3192899969 | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-greedy-2 seed 382041330 | Hồng nhan bạc mệnh — Năm 11, Hoàng thượng niên hiệu Vĩnh An băng hà, t (age 28 y11) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-greedy-1 seed 2020792563 | CAP (age 34 y15) | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-cautious-1 seed 2140731578 | Mẫu hậu Hoàng thái hậu (age 37 y20) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-cautious-2 seed 3758694459 | CAP (age 32 y15) | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-schemer-2 seed 1727482985 | Hồng nhan bạc mệnh — Lao phổi nguy kịch, không qua khỏi (age 21 y2) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-schemer-1 seed 3251859060 | Lãnh cung — Phát điên trong lãnh cung (age 27 y9) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-lover-1 seed 1379876621 | CAP (age 32 y15) | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-lover-2 seed 2367368888 | CAP (age 31 y14) | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-scholar-1 seed 4239854445 | CAP (age 30 y12) | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-rebel-1 seed 1234469163 | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước  (age 25 y6) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-scholar-2 seed 3059023128 | CAP (age 33 y14) | INVALID | wall cap (no ending) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-rebel-2 seed 1743253162 | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước  (age 21 y4) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-lazy-2 seed 3336481980 | TIMEOUT (age 18 y1) | INVALID | stuck / timeout (abandoned) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-speed-1 seed 3376192488 | TIMEOUT (age 19 y1) | INVALID | stuck / timeout (abandoned) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-speed-2 seed 2388700221 | Xuất gia (age 19 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| nc-B-tuc/nc-20261124-0057.json | nc-nc_tuc-lazy-1 seed 2348989713 | TIMEOUT (age 18 y1) | INVALID | stuck / timeout (abandoned) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-skilled-1 seed 3126901994 | CAP (age 32 y14) | INVALID | wall cap (no ending) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-skilled-2 seed 2618117995 | CAP (age 31 y14) | INVALID | wall cap (no ending) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-random-1 seed 4202423543 | Xuất gia (age 21 y2) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-random-2 seed 2045016998 | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-greedy-1 seed 680057964 | Hồng nhan bạc mệnh — Khó sinh, băng huyết mà chết (age 28 y9) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-greedy-2 seed 3987532993 | Lãnh cung — Phát điên trong lãnh cung (age 28 y11) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-cautious-1 seed 1270482857 | Hồng nhan bạc mệnh — Năm 14, Hoàng thượng niên hiệu Thiên Hựu băng hà, (age 31 y14) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-cautious-2 seed 2794858932 | CAP (age 33 y15) | INVALID | wall cap (no ending) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-schemer-1 seed 3031605 | Hồng nhan bạc mệnh — Lao phổi nguy kịch, không qua khỏi (age 20 y3) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-schemer-2 seed 990523872 | Hồng nhan bạc mệnh — Bị ban chết vì đầu độc Công chúa Thục Gia (age 24 y7) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-lover-1 seed 2738757676 | CAP (age 31 y14) | INVALID | wall cap (no ending) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-lover-2 seed 1751265409 | Hồng nhan bạc mệnh — Trúng độc, không qua khỏi (age 33 y14) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-scholar-1 seed 3018727368 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ  (age 26 y8) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-rebel-1 seed 454280370 | Hồng nhan bạc mệnh — Giả mang thai bị thái y khác bắt mạch phát hiện,  (age 20 y2) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-rebel-2 seed 2093031603 | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước  (age 22 y3) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-scholar-2 seed 2031235101 | Mẫu hậu Hoàng thái hậu (age 35 y18) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-lazy-2 seed 2286715043 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ  (age 20 y2) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-lazy-1 seed 668752162 | TIMEOUT (age 18 y1) | INVALID | stuck / timeout (abandoned) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-speed-1 seed 2920246405 | TIMEOUT (age 18 y1) | INVALID | stuck / timeout (abandoned) |
| nc-B-vuong/nc-20261124-0354.json | nc-nc_vuong-speed-2 seed 3907738672 | TIMEOUT (age 18 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/nc-20261124-0057.json | nc-nc_gian-skilled-2 seed 1110561575 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ  (age 27 y8) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-random-1 seed 3737971003 | TIMEOUT (age 20 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/nc-20261124-0057.json | nc-nc_gian-random-2 seed 2120008122 | Hồng nhan bạc mệnh — Bị ban chết vì đầu độc Công chúa Hòa Duyệt (age 20 y1) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-skilled-1 seed 3248122326 | Hồng nhan bạc mệnh — Năm 11, Hoàng thượng niên hiệu Khang Định băng hà (age 28 y11) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-greedy-1 seed 3414306896 | CAP (age 32 y13) | INVALID | wall cap (no ending) |
| ncA/nc-20261124-0057.json | nc-nc_gian-greedy-2 seed 2426814629 | CAP (age 31 y13) | INVALID | wall cap (no ending) |
| ncA/nc-20261124-0057.json | nc-nc_gian-cautious-2 seed 3065996664 | Hồng nhan bạc mệnh — Khó sinh, băng huyết mà chết (age 26 y7) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-cautious-1 seed 2078504397 | CAP (age 30 y13) | INVALID | wall cap (no ending) |
| ncA/nc-20261124-0057.json | nc-nc_gian-schemer-2 seed 3781810644 | Hồng nhan bạc mệnh — Bị ban chết vì vu Hoàng tử Vĩnh Bích trù ẻo thánh (age 21 y4) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-schemer-1 seed 110002505 | Hồng nhan bạc mệnh — Bị ban chết vì vu Hoàng tử Vĩnh Kỳ trù ẻo thánh t (age 31 y12) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-lover-1 seed 1241369544 | CAP (age 32 y13) | INVALID | wall cap (no ending) |
| ncA/nc-20261124-0057.json | nc-nc_gian-lover-2 seed 253877277 | CAP (age 29 y11) | INVALID | wall cap (no ending) |
| ncA/nc-20261124-0057.json | nc-nc_gian-scholar-2 seed 3839821545 | Hồng nhan bạc mệnh — Năm 4, Hoàng thượng niên hiệu Cảnh Hòa băng hà, t (age 21 y4) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-rebel-1 seed 2986273990 | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước  (age 20 y2) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-rebel-2 seed 869501591 | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước  (age 22 y4) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/nc-20261124-0057.json | nc-nc_gian-lazy-1 seed 2270595614 | TIMEOUT (age 20 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/nc-20261124-0057.json | nc-nc_gian-scholar-1 seed 1069230324 | CAP (age 31 y12) | INVALID | wall cap (no ending) |
| ncA/nc-20261124-0057.json | nc-nc_gian-speed-1 seed 3268533737 | TIMEOUT (age 18 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/nc-20261124-0057.json | nc-nc_gian-lazy-2 seed 3891118351 | Xuất gia — Xuất gia làm ni cô (age 22 y4) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| ncA/nc-20261124-0057.json | nc-nc_gian-speed-2 seed 497942516 | TIMEOUT (age 18 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-skilled-1 seed 2983290377 | CAP (age 30 y12) | INVALID | wall cap (no ending) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-skilled-2 seed 2360131220 | Xuất gia — Xuất gia làm ni cô (age 30 y13) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-random-1 seed 3857262870 | TIMEOUT (age 19 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-random-2 seed 1719702119 | Hồng nhan bạc mệnh — Bị ban chết vì đầu độc Hoàng tử Vĩnh Diễm (age 19 y2) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-greedy-2 seed 1395688604 | Thái phi — Thành Thái phi (age 30 y11) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-greedy-1 seed 428984689 | CAP (age 31 y13) | INVALID | wall cap (no ending) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-cautious-1 seed 3483776388 | Xuất gia — Xuất gia làm ni cô (age 30 y13) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-cautious-2 seed 1959400313 | CAP (age 33 y14) | INVALID | wall cap (no ending) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-schemer-2 seed 1129972699 | Lãnh cung — Phát điên trong lãnh cung (age 26 y7) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su1/nc-20261124-0329.json | nc-nc_su-schemer-1 seed 1638756698 | Hồng nhan bạc mệnh — Bị ban chết vì vu Hoàng tử Vĩnh Mẫn trù ẻo thánh  (age 26 y7) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-lover-1 seed 3411297707 | Hồng nhan bạc mệnh — Bị ban chết vì tư thông với Thị vệ Vân Trường Kha (age 25 y8) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-lover-2 seed 3920081706 | Hồng nhan bạc mệnh — Bị ban chết vì tư thông với Thị vệ Ôn Thủ Chuyết (age 26 y8) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-scholar-1 seed 247413007 | Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ  (age 21 y2) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-rebel-1 seed 3105988605 | Hồng nhan bạc mệnh — Giả mang thai bị thái y khác bắt mạch phát hiện,  (age 23 y5) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-rebel-2 seed 4093480872 | Hồng nhan bạc mệnh — Khó sinh, băng huyết mà chết (age 20 y3) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-lazy-1 seed 375028379 | TIMEOUT (age 20 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-scholar-2 seed 2921857566 | CAP (age 32 y13) | INVALID | wall cap (no ending) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-speed-1 seed 1086252990 | TIMEOUT (age 18 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-speed-2 seed 559343663 | TIMEOUT (age 20 y1) | INVALID | stuck / timeout (abandoned) |
| ncA/su2/nc-20261124-0533.json | nc-nc_su-lazy-2 seed 883812378 | TIMEOUT (age 20 y1) | INVALID | stuck / timeout (abandoned) |
| round-nc-20261124/nc-20261123-2316-lives1-5.json | nc-nc_su-random-1 seed 3857262870 | Xuất gia (age 18 y1) | INVALID | bot-chosen exit road «Xuất gia» (no proof it was the only option) |
| round-nc-20261124/nc-20261123-2316-lives1-5.json | nc-nc_gian-skilled-1 seed 3248122326 | Thái phi — Thành Thái phi (age 24 y7) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| round-nc-20261124/nc-20261123-2316-lives1-5.json | nc-nc_tuc-greedy-1 seed 2020792563 | CAP (age 34 y15) | INVALID | wall cap (no ending) |
| round-nc-20261124/nc-20261123-2316-lives1-5.json | nc-nc_gian-schemer-1 seed 110002505 | Hồng nhan bạc mệnh — Bị ban chết vì vu Hoàng tử Vĩnh Bích trù ẻo thánh (age 20 y3) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| round-nc-20261124/nc-20261123-2316-lives1-5.json | nc-nc_vuong-cautious-1 seed 1270482857 | Hồng nhan bạc mệnh — Năm 14, Hoàng thượng niên hiệu Thiên Hựu băng hà, (age 33 y14) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| round-nc-20261124/part2-nc-20261124-0007.json | nc-nc_su-lover-1 seed 3411297707 | CAP (age 27 y10) | INVALID | wall cap (no ending) |
| round-nc-20261124/part2-nc-20261124-0007.json | nc-nc_su-speed-1 seed 1086252990 | TIMEOUT (age 20 y1) | INVALID | stuck / timeout (abandoned) |
| round-nc-20261124/part2b-nc-20261124-0007.json | nc-nc_tuc-scholar-1 seed 4239854445 | CAP (age 33 y14) | INVALID | wall cap (no ending) |
| round-nc-20261124/part2c-nc-20261124-0039.json | nc-nc_vuong-rebel-1 seed 454280370 | Hồng nhan bạc mệnh — Sổ Kính sự phòng không ghi đêm thị tẩm nào trước  (age 23 y4) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |
| round-nc-20261124/part2d-nc-20261124-0039.json | nc-nc_gian-lazy-1 seed 2270595614 | Hồng nhan bạc mệnh — Năm 12, Hoàng thượng niên hiệu Gia Thịnh băng hà, (age 31 y12) | VALID | death/imposed end; JS-click accepted (OD ~05:58Z) |

## RERUN LIST (INVALID → one life each, real-tap harness, no cap, no exit)

| # | life id | road | bot | seed | was |
|---|---|---|---|---|---|
| 1 | nc-nc_su-random-1 | nc_su | random |  | TIMEOUT [no ending] |
| 2 | nc-nc_tuc-greedy-1 | nc_tuc | greedy |  | HARNESS [no ending] |
| 3 | nc-nc_su-lover-1 | nc_su | lover |  | HARNESS [no ending] |
| 4 | nc-nc_vuong-rebel-1 | nc_vuong | rebel |  | CAP [no ending] |
| 5 | nc-nc_gian-lazy-1 | nc_gian | lazy |  | TIMEOUT [no ending] |
| 6 | nc-nc_su-speed-1 | nc_su | speed |  | TIMEOUT [no ending] |
| 7 | nc-nc_su-random-1 | nc_su | random |  | TIMEOUT [no ending] |
| 8 | nc-nc_tuc-greedy-1 | nc_tuc | greedy |  | CAP [no ending] |
| 9 | nc-nc_su-lover-1 | nc_su | lover |  | CAP [no ending] |
| 10 | nc-nc_tuc-scholar-1 | nc_tuc | scholar |  | CAP [no ending] |
| 11 | nc-nc_gian-lazy-1 | nc_gian | lazy |  | TIMEOUT [no ending] |
| 12 | nc-nc_su-speed-1 | nc_su | speed |  | TIMEOUT [no ending] |
| 13 | nc-nc_tuc-skilled-1 | nc_tuc | skilled | 1103809447 | CAP |
| 14 | nc-nc_tuc-skilled-2 | nc_tuc | skilled | 3241370198 | CAP |
| 15 | nc-nc_tuc-random-1 | nc_tuc | random | 4180392236 | Xuất gia |
| 16 | nc-nc_tuc-random-2 | nc_tuc | random | 3192899969 | Xuất gia |
| 17 | nc-nc_tuc-greedy-1 | nc_tuc | greedy | 2020792563 | CAP |
| 18 | nc-nc_tuc-cautious-2 | nc_tuc | cautious | 3758694459 | CAP |
| 19 | nc-nc_tuc-lover-1 | nc_tuc | lover | 1379876621 | CAP |
| 20 | nc-nc_tuc-lover-2 | nc_tuc | lover | 2367368888 | CAP |
| 21 | nc-nc_tuc-scholar-1 | nc_tuc | scholar | 4239854445 | CAP |
| 22 | nc-nc_tuc-scholar-2 | nc_tuc | scholar | 3059023128 | CAP |
| 23 | nc-nc_tuc-lazy-2 | nc_tuc | lazy | 3336481980 | TIMEOUT |
| 24 | nc-nc_tuc-speed-1 | nc_tuc | speed | 3376192488 | TIMEOUT |
| 25 | nc-nc_tuc-speed-2 | nc_tuc | speed | 2388700221 | Xuất gia |
| 26 | nc-nc_tuc-lazy-1 | nc_tuc | lazy | 2348989713 | TIMEOUT |
| 27 | nc-nc_vuong-skilled-1 | nc_vuong | skilled | 3126901994 | CAP |
| 28 | nc-nc_vuong-skilled-2 | nc_vuong | skilled | 2618117995 | CAP |
| 29 | nc-nc_vuong-random-1 | nc_vuong | random | 4202423543 | Xuất gia |
| 30 | nc-nc_vuong-random-2 | nc_vuong | random | 2045016998 | Xuất gia |
| 31 | nc-nc_vuong-cautious-2 | nc_vuong | cautious | 2794858932 | CAP |
| 32 | nc-nc_vuong-lover-1 | nc_vuong | lover | 2738757676 | CAP |
| 33 | nc-nc_vuong-lazy-1 | nc_vuong | lazy | 668752162 | TIMEOUT |
| 34 | nc-nc_vuong-speed-1 | nc_vuong | speed | 2920246405 | TIMEOUT |
| 35 | nc-nc_vuong-speed-2 | nc_vuong | speed | 3907738672 | TIMEOUT |
| 36 | nc-nc_gian-random-1 | nc_gian | random | 3737971003 | TIMEOUT |
| 37 | nc-nc_gian-greedy-1 | nc_gian | greedy | 3414306896 | CAP |
| 38 | nc-nc_gian-greedy-2 | nc_gian | greedy | 2426814629 | CAP |
| 39 | nc-nc_gian-cautious-1 | nc_gian | cautious | 2078504397 | CAP |
| 40 | nc-nc_gian-lover-1 | nc_gian | lover | 1241369544 | CAP |
| 41 | nc-nc_gian-lover-2 | nc_gian | lover | 253877277 | CAP |
| 42 | nc-nc_gian-lazy-1 | nc_gian | lazy | 2270595614 | TIMEOUT |
| 43 | nc-nc_gian-scholar-1 | nc_gian | scholar | 1069230324 | CAP |
| 44 | nc-nc_gian-speed-1 | nc_gian | speed | 3268533737 | TIMEOUT |
| 45 | nc-nc_gian-lazy-2 | nc_gian | lazy | 3891118351 | Xuất gia — Xuất gia làm ni cô |
| 46 | nc-nc_gian-speed-2 | nc_gian | speed | 497942516 | TIMEOUT |
| 47 | nc-nc_su-skilled-1 | nc_su | skilled | 2983290377 | CAP |
| 48 | nc-nc_su-skilled-2 | nc_su | skilled | 2360131220 | Xuất gia — Xuất gia làm ni cô |
| 49 | nc-nc_su-random-1 | nc_su | random | 3857262870 | TIMEOUT |
| 50 | nc-nc_su-greedy-1 | nc_su | greedy | 428984689 | CAP |
| 51 | nc-nc_su-cautious-1 | nc_su | cautious | 3483776388 | Xuất gia — Xuất gia làm ni cô |
| 52 | nc-nc_su-cautious-2 | nc_su | cautious | 1959400313 | CAP |
| 53 | nc-nc_su-lazy-1 | nc_su | lazy | 375028379 | TIMEOUT |
| 54 | nc-nc_su-scholar-2 | nc_su | scholar | 2921857566 | CAP |
| 55 | nc-nc_su-speed-1 | nc_su | speed | 1086252990 | TIMEOUT |
| 56 | nc-nc_su-speed-2 | nc_su | speed | 559343663 | TIMEOUT |
| 57 | nc-nc_su-lazy-2 | nc_su | lazy | 883812378 | TIMEOUT |
| 58 | nc-nc_su-random-1 | nc_su | random | 3857262870 | Xuất gia |
| 59 | nc-nc_tuc-greedy-1 | nc_tuc | greedy | 2020792563 | CAP |
| 60 | nc-nc_su-lover-1 | nc_su | lover | 3411297707 | CAP |
| 61 | nc-nc_su-speed-1 | nc_su | speed | 1086252990 | TIMEOUT |
| 62 | nc-nc_tuc-scholar-1 | nc_tuc | scholar | 4239854445 | CAP |
