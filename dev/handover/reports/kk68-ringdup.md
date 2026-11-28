# KK68 — review/kk68-ringdup (base review/lc35-ui 22afefb4) — ONE ROW PER PERSON on a ring act result (MAIN 186 order 28/11 ~06:35Z) — RV READY
PRIORITY #1 CHECK: OD 24/11 ~21:57Z (result popup: each change = ONE short line per person) | main LIVE 5ad52416 | review/* lc35-ui 22afefb4; j63 kaResultRows already skips "hh" for the queen's person row (j63.js:339) = the rule reused | claims KK68
KIT CHECK: reuses the kit result rows of kitRingItem (kriPane / kriDiffRows, KIT §104 item ring) and the j63 one-person rule; no CSS, no new part.
BUG (iPad + Fold, ring «Tặng quà» to the queen): ĐƯỢC «Hoàng hậu → ta: thiện cảm +6 · Lữ Mạn Nhu → ta: thiện cảm +6» = one change twice.
ROOT: kriDiffRows lists every changed j1 NAMES stat — S.hh is NAMES «Hoàng hậu → ta: thiện cảm» (S.th = «Thái hậu → ta») — AND the receiver's aff line; when the receiver IS
the queen / Thái hậu both are the same thiện cảm. FIX (jkring-item.js): kriSame(v) = {"hh" if v is queenP(), "th" if v is emoByKey("th")}; with a receiver line those keys are not
printed as stat rows (their delta stands in if aff did not move) → ONE row named by the receiver. No receiver (self acts: 5 other callers pass v=null) → unchanged.
FAMILY (law 11): every builder that prints NAMES stat rows (j1 NAMES users: j2 j65 j68 j71 j82 j92 jcooptimer jcoopworld jecon jemoact jkc2 jlogsync jmgskin jstatfx jkring-item)
— only kriDiffRows also prints a person «→ ta» row; j63 kaResultRows already merges the queen (v===queenP() → skip "hh"). Others print no person row.
TEST (new) node dev/test/kri-one-row.js <root> — real kriSnap → affAdd → kriDiffRows, receivers queen / Thái hậu / consort / none:
| receiver | before (22afefb4) | after |
|---|---|---|
| queen | FAIL 2 rows «Hoàng hậu → ta +8 · <tên> → ta +8» | ok 1 row «<tên> → ta +6» |
| Thái hậu | ok 1 | ok 1 |
| consort | ok 1 | ok 1 |
| none (self act, S.hh alone) | ok 1 «Hoàng hậu → ta» | ok 1 |
Real ring (kit-std-scan ringres harness from review/kk68-tagwrap, run against this build): Fold + iPad ĐƯỢC = «Lữ Mạn Nhu → ta: thiện cảm +6» (one row).
Built: dev/site/build_site.sh (index.html, sw.js; assets.json unchanged). No regex lookbehind added.
NOTES for MAIN (not changed): (a) the receiver row uses the bare name («Lữ Mạn Nhu») while the card title says «Hoàng hậu Lữ Mạn Nhu» — KIT §7 asks rival names with
their rank title; (b) the same card's Ghi chú says «thiện cảm +4» then «Vì sao … +6» (gift log line vs the personality total) — two numbers for one change.
