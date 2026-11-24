# E67 — PARKING #10 HƯƠNG RIÊNG (signature scent) — report
PRIORITY #1 CHECK ('hương riêng|mùi hương|scent'): OD 0 (owner row = PARKING_LOT #10, 20/11 ~06:35Z; build OD 24/11 ~05:20Z) | ledger 0 | claims 1 (this seat) | main 15 hits, all reused: j8 TAINT/taintItem/inspect (xa on tuithom/huongtram), jinv scent wear slot (Túi thơm), j70 poison2 route «Trộn hương độc vào lò trầm», j1 LIKES/LIKEN + discover, jdis Emperor dislikes, jagknow taiMatRaw, j1 ghenUp | review/* 0 (review/huong-cue* = mini-game cue words, unrelated) | archive 0.
Branch `review/scent` · sha **de29c737** (from origin/main 68799300). Worker E67 = session_01DgYSWoizfjLqnTfD3oCWz3.

## Step 1 — expert notes (law 8, short)
- **History.** Qing/Ming palaces burned incense all day (trầm/agarwood, đàn hương/sandalwood, long diên/ambergris) in censers kept by named maids; consorts wore 香囊 sachets and smoked their robes (熏衣) — a woman's scent was personal and recognisable; a scent lingering on the Emperor's robe told the household where he had been. The palace censer-keeper and sachet makers were real offices, so incense was bought, issued, gifted and accounted for (fits law 6c: a scent = goods that are used up). Forbidden/feared: musk (麝香, believed to cause miscarriage), safflower (hồng hoa), "mê hương" sleep incense; poisoning through incense or gifts was a classic charge (Ming/Qing court cases are mostly about food/medicine; incense poisoning is mainly dramatic, plausible as slow harm: dizziness, sleeplessness).
- **Dramas.** Chân Hoàn truyện: Hoan nghi hương (歡宜香, gifted by the Emperor, secretly musk → infertility), the musk-laden bracelet/sachet; Diên Hi công lược: incense in bedding, sachets as tokens; in both, servants who tend the censer are the weak point (bribed maid).
- **What fits (and only the owner's idea, no new systems):** (1) each person has a signature scent held in a real box of incense; (2) the Emperor likes one, may dislike one; (3) a scent on the dragon robe tells others who he visited — and can mislead when two share it; (4) a bought servant taints the target's own incense. Musk-miscarriage stays the existing TAINT.xa (unchanged).

## Step 2 — build (module dev/build/jscent.js, after jdis; numbers BAL.scent at the end of jbal2.js; one button line + one fact line in jinv.js)
| Mechanic | How (reused part) | Laws |
|---|---|---|
| Real scent | 4 boxes `hg_tram/lan/que/mai` («Hộp hương …», kd Hương liệu, equal price BAL.scent.pr, in SHOP_ALL, sellable, giftable, used up 1/month). p.sc + p.scOff (no box = scent fades). | 6c, 4 |
| Her pick | Item panel kit pbtn «Xông làm hương riêng» / «Thôi xông» (kinvOpen) → burns one box now; fact line «Ta đang xông … làm hương riêng». | 9 |
| NPC scent | Inherited: seeded once per life (ctxHash, like jdis) + BAL.scent.npcStock boxes from home; restocks by buying (bạc); a consort with Ghen ≥ copy.ghen may copy HER scent (frames her). | 1, 6b |
| Equal value | each scent = one stat per month (Đức 1 / Sắc 1 / Sức 5 / Danh 1, the huongtram ratio), same price. | 2 |
| Emperor taste | LIKES.scent/LIKEN «Hương» → his card row (kit rows, shot), discover(), seeded S.emp.likes.scent (old saves filled in normAll/night/discover). Dislike = jdis pool «scent:hương X» (one source). Night (j8 `night(p)`, her AND NPCs): liked = Sủng +like.sung but louder tell; disliked = Sủng dis.sung but quieter tell. She learns by the night (kitKnow / disLearn). | 1, 2, 3 |
| Tell | Morning after a night: each other consort and she smell it with odds base + eye·eyes + tai mắt + rank·visited (law 5) ± like/dis; she BELIEVES it was a wearer of that scent (pick among sharers → can be wrong). NPC observer: Ghen to her (ghenUp) / thiện cảm −rel to another. She: «Tai mắt báo: … long bào … vương hương lan; xem ra đêm qua ngài ở chỗ …» (names masked when unknown), plus lines when others smelled her / were misled to her. | 6a, 5 |
| Poison | TAINT.doc «tẩm hương độc» on every box (existing Tẩm / gift / inspect / evidence flow); j70 poison2 new route «Mua chuộc cung nữ coi lò hương» (acc tsv, bạc on success) + the existing «Trộn hương độc vào lò trầm» now also taint the target's own box when they land (NPC→her, her→NPC, NPC→NPC). Burning a tainted box = Sức doc.suc + line; the taint is a real deed (schemes) so «Kiểm tra đồ» finds it and gives evidence. | 1, 6a |

## Tests
- `node dev/test/scent.test.js dev/index.html 3` → **PASS** (T1 objects, T2 pick button + effect, T3 month burn/fade/NPC restock, T4 seeded NPC scent, T5 liked/disliked for her AND an NPC, T6 tell / frame / rank odds / like-dis order, T7 poison both ways + inspect evidence + j70 route both ways, T8 old save).
- `bash dev/tools/quickcheck.sh` (ad8f…+test build 98c3f97f) → **QUICKCHECK PASS** · open 1596 ms · old save ok · core gates PASS · perf render 251/247, tab 423/389, buổi 2552/1908, tasks 24/21 (within gate).
- `node dev/test/role-parity.test.js` ×2 on de29c737 → **ALL PASS ×2** (10/10 each).
- co-op e2e: not run — jscent touches no co-op code (NPC month part gated by worldOn like jtc).
- Shots (host mode, CDN on, 0 page errors; looked at all): Fold 755x1000@2 + iPad 1180x820@2 — box panel (pick card: ĐƯỢC Sắc +1 mỗi tháng · KÈM đốt một hộp… người khác ngửi ra), panel after pick («Thôi xông» + fact line), Emperor card with row «Hương». CDN upload refused (no R2 credentials in this container) → shots in dev/handover/shots/scent/ on the handover branch (delete after verdict).

## Scan table (law 11 — the incense family)
| Place that burns/poisons incense | Before | After |
|---|---|---|
| j70 poison2 «Trộn hương độc vào lò trầm» | generic poison act only | + taints the target's own scent box (real object, trail) |
| j70 poison2 new «Mua chuộc cung nữ coi lò hương» | — | route (two-way, tsv) |
| j8 TAINT list (gift/self taint) | xa/bua on sachets | + doc on all 4 boxes |
| jinv item panel | no scent pick | kit pbtn pick/stop + fact |
| Emperor likes rows (j15/jhc) | Hoa/Nhạc/Món/Y phục/Son phấn/Dung nhan | + Hương |

## FOR MAIN
- FOR MAIN (art → Foreman C): item icons for `hg_tram`, `hg_lan`, `hg_que`, `hg_mai` («Hộp hương trầm/lan/quế/mai», four lidded incense boxes, one per scent; kit item art). Until then the panel shows the generic scene fallback (shot).
- No KIT request: every display uses existing kit parts (pbtn action card, kitFacts, Emperor kit rows, log/kitKnow).
