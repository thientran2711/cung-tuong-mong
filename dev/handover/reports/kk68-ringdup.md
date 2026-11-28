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

## r2 — MAIN 186 ruling 28/11 ~06:44Z: (a) rank title + name, (b) one change = one number
(a) jkring-item who = rkName(V) + " " + V.name (kitKnownName rule kept; not for S) → ĐƯỢC «Hoàng hậu Lữ Mạn Nhu → ta: thiện cảm +6», same as the title and Ghi chú.
(b) ROOT: the gift log line printed the REQUESTED amount (j8 giveTo «thiện cảm +${gr}»), but affAdd is wrapped by trust trait (j28), titles (jdh), feelings (jfeel), mood (jmood)
and stat pace, which rescale a rise; and for the queen ap(a,{hh:g}) moves the same thiện cảm (S.hh setter hhSet). Traced on the ring gift: relAdd +5 (asked 4) + hhSet +1 = +6 real,
line said +4. FIX: core helper affGot(x,y,fn) (j9, beside relAdd) = the real change of x's liking for y while fn runs; the lines written AFTER the change print it:
| line | before | after |
|---|---|---|
| j8 giveTo «Ta tặng … cho <X>: thiện cảm …» (queen gift, ring) | +4 (Vì sao +6, row +6) | +6 = row = Vì sao (Fold + iPad) |
| j83 handmade work gift «… tự tay làm: thiện cảm …» | +${ev.rel} asked | real (relAdd + S.hh) |
| jemoact NPC party «A, B thiện cảm +F.aff» | one asked number for all guests | each guest's real rise |
SCAN (dev scratch relscan: «thiện cảm …${X}» printed after relAdd/affAdd(…, X)): jemoact:442 (fixed), jration:166 (a NEGATIVE amount — the wrappers rescale rises only → real, left);
j8 / j83 found by eye (their relAdd sits in keepGain). Option-card previews (planned «Được: thiện cảm +N» before the act, ~380 lines) are a different question, not touched.
Checks: kri-one-row PASS 4/4; webkit hook 30 0 parse hits; ring harness Fold + iPad 0 page errors.
