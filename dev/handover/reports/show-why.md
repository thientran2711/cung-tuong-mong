PRIORITY #1 CHECK ('SHOW-WHY|show why a number|showWhy'): OD 1 (OD tail 17/11 05:45Z) | ledger 0 | claims 5 (C STATUS, this order) | main 2 (jnet.js netTip + header hooks from trait-pool) | review/* 0. Reused: jnet traitsOf/netTip/hasT/netIs, j28 persF/trKnown, jtrong trongMul/trongHit/trongKnown/trGreet/trThDeed, jmood mbAffK, j63 result card .kb rows, j79 kitGloss/kpPop.

# show-why — SẴN SÀNG KIỂM 94ac121d (branch review/show-why, from main 9fdc1199)
Worker session_011xDdVNGZYsTXYyDqCqjnQg (successor of session_011xDdVQM2jyGVY8RsCxbtvX, which rolled over before starting). START_CTX ~3 % of the 1M window; ended ~22 %. No rollover needed.

## What was done
1. SHOW WHY A NUMBER (owner OD 17/11 05:45Z) — new module `dev/build/jwhyn.js` (last in assemble.py):
   - Measures every change of a person's feeling toward her (affAdd / oanAdd, outermost wrapper: before → after = the APPLIED number) and,
     with the SAME functions the rules use, lists the factors that moved it: nết (PERS = BAL.net.T columns trust / slight / gift / lavish /
     riseGift), trọng (trongMul / trongHit: NPC deeds TR_DEED, topic talk, greetings, Thái hậu deeds), mood (her mood board mbAffK; host /
     her emotion in greetings), repetition (talks via S.chat, greetings, Thái hậu deeds), saturation (cap), rank (Thái hậu greeting),
     night (Sủng after thị tẩm: her preparation, his mood, how the night went).
   - NAMED when known (trKnown / trongKnown / Thái hậu archetype met): "Hoàng hậu X: tính Ân cần, Trọng nghĩa, trọng Nhân: hợp ý, đã chuyện
     trò 1 lần: nói thêm được ít dần → thiện cảm +3"; GENERIC when not: "… : theo tính nết và điều nàng trọng → thiện cảm +6"; a person not
     met yet ("người chưa quen") is never described by nết/trọng.
   - Result card: one more row of the kit .kb grid, label "Vì sao" (same markup as the existing "Ghi chú" row, placed before Kèm), also in
     kaLastResult.rows {k:"vi"}. Sổ ghi: the line that names the person gets the same sentence (`<span class="past kwl">Vì sao: …</span>`),
     never an unrelated line. Her own stats are said in words ("Sủng thêm 6") so the jlogsync replay never counts them twice.
   - Whole family: talk/topic, gifts, greetings (Thái hậu / Hoàng hậu), Thái hậu deeds, every NPC act toward her (social deeds, harm acts,
     reactions — all pass affAdd/oanAdd), nights. A number with no factor ≠ 1 gets no why (nothing to explain).
2. ONE CORE follow-up (review-trait-pool-r1): every nết-keyed number in code → BAL. Scan `python3 dev/tools/net-inline-scan.py`:
   before 90 inline sites (26 nq literals, 59 hasT/netIs/netRx ternary chains, 5 sentPen ifs) in 24 files → after 0.
   `BAL.net.k` (+14 quality sizes: spySharp, bribeGreed, confTimid, firmLoyal, lean…) and `BAL.net.n` (36 nết-keyed tables; keys tested in
   order = the old a?x:b?y:z chains, "_" = default) read by `nv(p,key)` in jnet.js. Places that showed the same chance twice now share one
   key (askTalk j10+j15, bribeCost j29+jsgame, spyFind j42:205+267, betrayFind j42:206+118, misJealTin ×3, kcPowder ×2, agentLeak
   j92+jveil). Values unchanged.
3. Tooltip on touch: the 3 native `title` tooltips (j28 trLine nết, jtrong her nết, jtrong trongLine virtues) + the person-card "Tính nết"
   row (jpcf, had no tip at all) now use the kit glossary term kitGloss (KIT §12: dotted underline, tap = kpPop). KIT_GLOSS gets the 24
   nết (netTip = Được … Mất …) and 13 virtues (VIRT_GL) as data.
4. KIT: no new display part built. KIT REQUEST (register only) in dev/kit/KIT_REQUESTS.md for the kit keeper: register the result-card
   "Vì sao" row in KIT.md §7 + the kit sample page.

## Tests (built site index.html unless said)
- `node dev/test/show-why.js index.html <main index.html>` → 16/16 ok: generic vs named, shown = applied, Sổ ghi tail, kit row present,
  no factor → no why, greeting card + Sổ ghi, gift, talk repetition, night (Sủng in words), nết tap popover = gain+cost with no title,
  BAL.net.n names only real nết/qualities, OLD SAVE from main 9fdc1199 loads + plays + shows the why, no page errors.
- log-sync audit (dev/test/log-sync.js, 6 steps, seed 12345): main misses 8 / stale 14 → branch misses 5 / stale 8, errs 0.
- trait-pool.js: 17/20 on branch = 17/20 main-vs-main (its 3 fails need a pre-trait-pool base build; not a regression).
- net-inline-scan.py → 0.
- Screenshots, CDN review folder img/_review/show-why/: fold-result.png + ipad-result.png (result card with the VÌ SAO row, number = the
  Được number), fold-netpop.png + ipad-netpop.png (tap a nết → gain/cost popover). No horizontal overflow, no page errors.
  Verdict giver wipes: `python3 dev/site/cdn_sync.py --wipe-review show-why`.

## Notes for reviewer / owner (exposed by the why line; NOT changed — balance owners decide)
- A strict Thái hậu (nghiêm khắc / quyền uy) can give a NEGATIVE thỉnh an result (−1…−4) even when her trọng Lễ is pleased, when the
  player's rank is low: now visible ("tính nghiêm khắc, trọng Lễ: hợp ý, phẩm vị ngươi còn thấp → thiện cảm −4"). Existing trGreet formula.
- Servant-road header line "chủ Khiêm nhường, Thanh liêm, Tham vọng" is plain summary text (not a kit row); left as is.
