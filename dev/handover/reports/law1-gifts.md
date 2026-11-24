# Report — LAW-1 SCAN likes / dislikes / gifts (worker LAW1-GIFTS for Foreman D ROOT)
PRIORITY #1 CHECK: OD 24/11 ~07:55Z point (e) (order) | ledger 0 | claims 0 | main: giveTo j8.js:265, jmind.js giveTo hook (a===S only), jdis.js giveTo hook (a===S only), jagacts.js cx:gift (first piece), jrcv rcvGiftIn (receiver choice, already two-way OD 18/11 ~21:15Z), dev/tools/role-parity-scan.js (acts, not tastes) | review/*: gift-chest, gift-pick, gift-ui, pcard-dislikes, poison-gift, d19-gift-work — all already on main (their files jgift/jgpick/jdis/jpoison are in main's build); reused, nothing rebuilt | none running.

Branch `review/law1-gifts` from origin/main 68799300. SSK: review/law1-gifts 0a5fc0af0ce8cc6bacddc4de0d5dccf24cffecbe

## What was one-way (law 1) and what changed
Every like / dislike effect of a gift fired ONLY when SHE was the giver (`a===S` gates in the jmind and jdis giveTo hooks). An NPC giving the Emperor, Thái hậu, a consort or her got no like bonus, no dislike penalty, no refusal, and never learnt anyone's tastes; NPCs had no knowledge of tastes at all (she learns by gift, talk, spying and sees it in the gift dialog); her receiving a liked / disliked piece moved only her mood, a consort receiving one moved only regard. Two consort gifts to her were pieces made from nothing (law 6c): the friend's visit (j24.js:26) and the guests' rite gifts (jts.js:268); as a guest at an NPC rite she could send only bạc, never a piece, and NPC rites had no guest gifts.

Fixes (same functions both ways, numbers from BAL only — BAL.mind.like, BAL.dis.aff / sung / refuse / refAff / refSung / talk, BAL.mind.herMood; no new numbers):
- `jmind.js` **giftTaste(a, r, e)** — ONE taste rule for any giver (her, a consort, "emp"/"th" bestowal) and any receiver (her included): regard of the receiver toward the giver ±, the receiver's mood (vui / buồn; consorts' dislike mood too), the giver learns the taste. The giveTo hook calls it; her old texts kept.
- `jmind.js` NPC taste record **a.gk[mindKey(receiver)] = {l,d}** (saved with the person, old saves start empty) + `giftLearn`, `giftKnLikes`, `giftKnDis`; filled by a gift's result, by talk (chatMark: the consort learns hers by the same roll BAL.dis.talk) and by spying (`giftSpyLearn` on a successful cx2:maidSpy, jagacts3.js).
- `jmind.js` **giftPickIx(a, t)** — the NPC picks the piece by what it knows (no known dislike, a known like first), as her dialog shows her known dislikes (jdis giftEval hook); used by the agent `cx:gift` runner (jagacts.js) and the rite gifts.
- `jdis.js` giveTo hook: dislike penalty / refusal (piece stays in the giver's chest) / learning for every giver (her penalty text unchanged; NPC lines name the giver).
- Bestowals meet the receiver's tastes (mood + the giver's record): Emperor gifts j8.js night gift, jration.js cống phẩm (her + consort branches), Thái hậu gifts j8.js + jagacts.js th:gift.
- Law 6c: `giftHand(a, r, buy)` — a visit gift is a REAL piece from the giver's chest, or one she buys at Nội vụ phủ with her own bạc; none → the visit is a chat (j24.js). Rite gifts `tsLeGifts(G, host)` (jts.js) — guests send real pieces through giveTo (her choice card when she is host; rcvGiftIn for an NPC host); NPC rites get guest gifts too; as a guest she has a new kit option «Gửi quà mừng» (tsOpt, opens the existing gift picker PEND.giftpick).

## Gates
- scan `node dev/tools/law1-gift-scan.js dev/index.html`: **0 one-way** (before on origin/main: 23); 48 sites, 0 unclassified; 0 page errors.
- `node dev/test/law1-gifts.js`: PASS (scan 0; refused piece stays with the giver; accepted piece moves once; NPC→her piece waits in her card; no piece from nothing; old save without v.gk loads and a gift makes the record; NPC never hands a known-disliked piece).
- one-core-guard ×3: PASS ×3 (`{"inlineNow":3547,"baseline":3592,"fails":0}`).
- coop-e2e: 142/142 passed.
- quickcheck: QUICKCHECK PASS · 740 s · old save ok · core gates PASS · perf new/live render 307/304 ms, tab 593/509 ms, buổi 1990/3387 ms
- old tests touched: npcmind-check (old main save → branch): exit 0. pcard-dislikes: the same 6 card-row FAILs on origin/main as on the branch (pre-existing card-layout drift, not this work); its data / learning / gift checks pass.
- Kit: no new UI part; the one new option is a kit tsOpt in the existing rite panel. Wording cổ trang, no %.

## Before / after (law 11)
| row (who→whom · effect) | before (origin/main 68799300) | after (branch) |
|---|---|---|
| GIVER her vs npc → emp · liked piece: regard toward the giver | SAME | SAME |
| GIVER her vs npc → emp · liked piece: the giver learns the like | N/A | N/A |
| GIVER her vs npc → emp · liked piece: receiver mood | N/A | N/A |
| GIVER her vs npc → emp · disliked piece: regard toward the giver | GAP | SAME |
| GIVER her vs npc → emp · disliked piece: the giver learns the dislike | GAP | SAME |
| GIVER her vs npc → emp · disliked piece: receiver mood | N/A | N/A |
| GIVER her vs npc → emp · disliked piece may be refused | GAP | SAME |
| GIVER her vs npc → th · liked piece: regard toward the giver | GAP | SAME |
| GIVER her vs npc → th · liked piece: the giver learns the like | GAP | SAME |
| GIVER her vs npc → th · liked piece: receiver mood | N/A | N/A |
| GIVER her vs npc → th · disliked piece: regard toward the giver | SAME | SAME |
| GIVER her vs npc → th · disliked piece: the giver learns the dislike | GAP | SAME |
| GIVER her vs npc → th · disliked piece: receiver mood | N/A | N/A |
| GIVER her vs npc → th · disliked piece may be refused | GAP | SAME |
| GIVER her vs npc → consort · liked piece: regard toward the giver | GAP | SAME |
| GIVER her vs npc → consort · liked piece: the giver learns the like | GAP | SAME |
| GIVER her vs npc → consort · liked piece: receiver mood | N/A | SAME |
| GIVER her vs npc → consort · disliked piece: regard toward the giver | SAME | SAME |
| GIVER her vs npc → consort · disliked piece: the giver learns the dislike | GAP | SAME |
| GIVER her vs npc → consort · disliked piece: receiver mood | N/A | SAME |
| GIVER her vs npc → consort · disliked piece may be refused | GAP | SAME |
| DIRECTION her→consort vs consort→her · liked piece: regard toward the giver | GAP | SAME |
| DIRECTION her→consort vs consort→her · liked piece: the giver learns the like | GAP | SAME |
| DIRECTION her→consort vs consort→her · liked piece: receiver mood | GAP | SAME |
| DIRECTION her→consort vs consort→her · disliked piece: regard toward the giver | GAP | SAME |
| DIRECTION her→consort vs consort→her · disliked piece: the giver learns the dislike | GAP | SAME |
| DIRECTION her→consort vs consort→her · disliked piece: receiver mood | GAP | SAME |
| DIRECTION her→consort vs consort→her · the receiver may refuse | SAME | SAME |
| BESTOW emp→her vs emp→consort · liked piece: receiver mood | N/A | SAME |
| BESTOW emp→her vs emp→consort · disliked piece: receiver mood | N/A | SAME |
| BESTOW th→her vs th→consort · liked piece: receiver mood | N/A | SAME |
| BESTOW th→her vs th→consort · disliked piece: receiver mood | N/A | SAME |
| DIRECTION her→emp (gift) vs emp→her (bestowal) · a piece moves | SAME | SAME |
| KNOW by talk · her learns the consort's taste vs the consort learns hers | GAP | SAME |
| KNOW by spying · her spying vs an NPC's spying brings a taste | GAP | SAME |
| PICK by knowledge · her dialog shows a known dislike vs the NPC avoids it | GAP | SAME |
| RITE guest→host · a real piece from the guest's chest (law 6c): her rite vs an NPC's rite | N/A | SAME |
| RITE guest gift · consort guest→her vs her as guest→consort host | GAP | SAME |
| OBJECT a consort's gift to her is a real piece from her chest (law 6c), as hers is | GAP | SAME |

**one-way rows + unclassified sites: before 23 (22 rows + 1 site: j24.js:26 conjured visit gift; jts.js:268 conjured rite gift counted in the OBJECT row) → after 0.**

### Every gift / taste path (static part, after)

| path (who→whom) | site |
|---|---|
| GIVE rv→S in a visit (a real piece, giftHand) | dev/build/j24.js:26 |
| GIVE any→any (base: item moves, relAdd) | dev/build/j8.js:265 |
| RECEIVE her: the choice card from giveTo | dev/build/j8.js:270 |
| BESTOW emp→S/rv | dev/build/j8.js:307 |
| BESTOW th→S/rv | dev/build/j8.js:493 |
| GIVE her→emp/th/rv (gift picker) | dev/build/j8.js:518 |
| RECEIVE her: choice card (take / return / test) | dev/build/j8.js:530 |
| RECEIVE her: the choice card from giveTo | dev/build/j83.js:106 |
| RECEIVE her: choice-card wrappers (work / food / carrier time) | dev/build/j83.js:206 |
| GIVE rv→emp/th/S/rv (agent choice) | dev/build/jagacts.js:44 |
| GIVE rv→emp/th/S/rv (agent choice) | dev/build/jagacts.js:45 |
| GIVE rv→emp/th/S/rv (agent cx:gift) | dev/build/jagacts.js:48 |
| BESTOW th→S/rv | dev/build/jagacts.js:112 |
| LEARN by NPC spying | dev/build/jagacts3.js:328 |
| GIVE co-op friend→S (a seat's real item; the friend gives back the same way) | dev/build/jcoopthin.js:402 |
| GIVE co-op friend→S (a seat's real item; the friend gives back the same way) | dev/build/jcoopworld.js:804 |
| LEARN a taste | dev/build/jdis.js:43 |
| TASTE dislike hit (jdis) | dev/build/jdis.js:51 |
| LEARN by her spying (lk / dis facts) | dev/build/jdis.js:61 |
| LEARN by talk | dev/build/jdis.js:63 |
| TASTE dislike penalty / refusal on giveTo | dev/build/jdis.js:65 |
| LEARN a taste | dev/build/jdis.js:82 |
| LEARN by talk | dev/build/jdis.js:87 |
| LEARN by her spying (lk / dis facts) | dev/build/jdis.js:88 |
| PICK her: the dialog shows known dislikes | dev/build/jdis.js:90 |
| GIVE her→emp/th/rv/maid (gift dialog) | dev/build/jgift.js:15 |
| LEARN a taste | dev/build/jmind.js:88 |
| LEARN a taste | dev/build/jmind.js:90 |
| LEARN a taste | dev/build/jmind.js:137 |
| PICK npc: the piece by what she knows | dev/build/jmind.js:141 |
| TASTE like bonus / dislike penalty / mood on giveTo | dev/build/jmind.js:155 |
| LEARN by talk | dev/build/jmind.js:169 |
| GIVE any→any handed over in a visit (a real piece) | dev/build/jmind.js:174 |
| LEARN by talk | dev/build/jmind.js:179 |
| RECEIVE her: choice-card wrappers (work / food / carrier time) | dev/build/jpoison.js:104 |
| RECEIVE her: choice-card wrappers (work / food / carrier time) | dev/build/jptime.js:441 |
| BESTOW emp→S/rv | dev/build/jration.js:187 |
| BESTOW emp→S (cống phẩm) | dev/build/jration.js:187 |
| GIVE rv→S (a friend's copied sheet; S→rv: the sheet is a giftable item) | dev/build/jrcp.js:311 |
| BESTOW th→S (a sutra / embroidery copy; th→rv: an NPC knows a sub-style by her level, rcpNpcKnows) | dev/build/jrcp.js:313 |
| RECEIVE npc: the same choice (rcvGiftIn) | dev/build/jrcv.js:64 |
| GIVE any→rv (Biếu quà làm lành, giveTo) | dev/build/jts.js:181 |
| GIVE any→rv (Biếu quà làm lành, giveTo) | dev/build/jts.js:189 |
| GIVE any→rv (Biếu quà làm lành, giveTo) | dev/build/jts.js:213 |
| GIVE rv→rv (Biếu quà làm lành, NPC side) | dev/build/jts.js:217 |
| GIVE guest→host at a rite (Lễ tấn phong) | dev/build/jts.js:288 |
| BESTOW th→S/rv | dev/build/jts.js:303 |
| GIVE rv→S/rv (a friend's veil, giveTo) | dev/build/jveil.js:208 |

## Notes for the reviewer
- N/A rows = neither side has it, the same for every giver: the Emperor's likes are item tags (giftVal) for every giver (her and NPCs, row SAME on regard); the Emperor / Thái hậu have no gift mood; gifts do not teach anyone the Emperor's likes (his «Hỏi sở thích» does).
- A gift TO her is refused by her own choice card (PEND.giftin «Trả lại quà»), a gift to an NPC by rcvGiftIn + the dislike roll — paired as SAME.
- Bestowals (Emperor / Thái hậu) come from the treasury as before (traceable from:"emp"/"th"); only consort gifts were pieces from nothing.
- Repro: `node dev/tools/law1-gift-scan.js dev/index.html --md out.md`; before: `LAW1_BUILD=<main tree>/dev/build node dev/tools/law1-gift-scan.js <main tree>/dev/index.html`.
