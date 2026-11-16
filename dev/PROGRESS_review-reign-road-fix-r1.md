# review/reign-road-fix-r1 (reviewer, sonnet UI)
Base: review/reign-road-fix 9f4e8bf9 + merge of origin/main 18fb8252 (index.html/sw.js conflicts resolved by rebuild).
Reviewer fixes (small): jwhy.js whyPal (unmet owner of a thiên điện no longer printed as "thiên điện của <raw name>" in spy target/factor lines and picker);
j78.js j78who (unmet consort -> "<tước> ???" via k61Mask instead of the raw name in act/"rv" lines such as "Đáp ứng X thiện cảm +8").
Tests: reign.js 755x1000 / 1180x820 / 1366x1024 / 390x844 PASS; panel-size.js 4 viewports 0 errors (390 btnOut plantpick = pre-existing, gone after rebuild at 755/1180);
opt-overflow-scan 4 viewports 204 cards 0 overflow; unmet-names-scan: raw-name leaks gone for act + rv panes (see report for residue).
