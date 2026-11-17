PRIORITY #1 CHECK ('trait pool|PERS|P_TR|trung|tham|nhát|lanh|chuyện|Hiểm độc|Xảo quyệt'): OD 2 (L1562 rename, L1563 pool) | ledger 0 | claims 5 (none a trait-pool worker) | main: PERS j28.js, P_TR jtrong.js:51, STR j10.js:2 servant nết, MTR j22.js:3 men, TDTR j55.js:5 court heads, ETRAITS j1.js (kept), TH_ARCH jtrong.js (kept) | review/*: review/trait-rename 27886326 (Foreman B, Hiểm độc→Xảo quyệt, unreviewed) → REUSED as base, not redone; review/personality(-r1) already on main (jtrong trọng engine) → reused.

# REPORT — review/trait-pool (ONE TRAIT POOL: 3 nết per person, 24 + 2 nết, balance law)
Worker: opus, session_011xDdVQM2jyGVY8RsCxbtvX, for Foreman C. Branch `review/trait-pool` = review/trait-rename (main 6c4f21c3 + rename) + this work.
**Coordination:** B's rename branch was already pushed (05:39Z) → this branch is built ON it. Review/merge trait-rename first (or both together); no duplicate rename here. Line written in FOREMAN_C_STATUS QUESTIONS.

## What changed (one system for everyone except the Emperor and Thái hậu)
- **THE trait table = `BAL.net`** (dev/build/jbal2.js end; one core). Groups tt TÍNH TÌNH / ld LÒNG DẠ / ch CHÍ HƯỚNG, 8 nết each in 4 symmetric pairs; a person holds exactly one per group (`p.net=[tt,ld,ch]`), so nết of one group exclude each other.
  FEMALE pool (consorts, maids, ma ma, female kin/NPCs, the player) and MALE pool (men, guards, eunuchs, physicians, court heads, father/brothers) — same formulas, 24 of 26 rows shared.
- **Engine `dev/build/jnet.js`** (assembled after jtrong.js): `netOf(p)` / `traitsOf(p)` (one lookup per person) and `BAL.net.T[t]` (one per nết); API for the next jobs: `hasT, netQ, netIs, nq, qv, tv, netRx, netTxt, netTip, netRow`. Draw = deterministic hash of the person key (same as trọng) → co-op seats and reloads agree.
- **Merged into the pool:** consort 2-nết sets (TRAITS + TRAIT2), servant-only trung/tham/nhát/lanh/chuyện (now qualities `q` of pool nết: loyal/greed/timid/sharp/talk — confess risk, bribe odds/cost, theft, gossip, clue finding read e.g. `nq(s,"timid",20)`), player subset P_TR (removed), men MTR (phong lưu/đa tình/trung hậu/tham vọng/cẩn trọng), court heads TDTR (Cương trực/Tham lam/Cẩn trọng/Trung hậu/Tham vọng), kin `tr`. Kept: ETRAITS (Emperor), TH_ARCH archetypes (their behaviour nết now point at pool names). TRAITS stays only as the figure LOOK key (FIGURES.json tags via TRK; faces never show personality).
- **Whole family (LUẬT SỬA CẢ NHÓM)**: every old read rewritten — dev/tools/netmig.py (388 sites, 64 files) + manual sites (j55, jkc, j29, jst14, jtoil, jwhy, j24 rule text). Scan `python3 dev/test/net-scan.py [ref]`:

| old-read class | before (trait-rename) | after (this branch) |
|---|---|---|
| X.trait==="…" / !== field compares | 60 | 0 |
| servant X.tr==="trung/tham/nhat/lanh/chuyen" | 94 | 0 |
| TABLE[X.trait] / TABLE[X.tr] lookups | 24 | 0 |
| /…/.test(X.trait) regex on the field | 13 | 0 |
| [..].includes(X.trait) | 6 | 0 |
| ${X.trait} / STR[s.tr] shown to the player | 21 | 0 |
| removed nết word as a code string | 203 | 10 (= old-word map BAL.net.old, TRAIT_OLD, Emperor labels — allowed) |
| player-only P_TR / S.pTr | 7 | 2 (a comment + the delete in migration) |
| pool API calls | 69 | 340 |

- **Bug fixed in the family:** persF multiplied harmGate from 0 → the "kind nết never harms until wronged" gate never worked; now max (Ân cần 60). Dead weight keys (pushed, dirty, sell, black, blame, leave: no act reads them) folded into real acts (pushed → follow) or into qualities.
- **First trọng follows the Lòng dạ nết** (Thật thà Tín, Xảo quyệt Trí, Thanh liêm Liêm, Ham lợi Cần, Rộng lượng Nhân, Thù dai Sỉ, Trọng nghĩa Nghĩa, Thực dụng Kiệm); trọng 2 (1 of 13) stays; old saves keep their 2nd virtue.
- **Names never pre-judge a villain** (OD 05:35Z): Xảo quyệt harm weights softened (feign/spy/ally high, poison ×1.5 not ×3); harm is spread over Thù dai, Nóng nảy, Kiêu ngạo, Tham vọng, Vì mình by their own logic; danger offsets small (+5 … −8).
- **Old saves:** every person's old 1–2 nết map into their groups (BAL.net.old), missing groups drawn; known-nết lists (S.trK) and Thái hậu thTrait mapped; S.pTr dropped (her 3 nết come from the pool by name hash, so both co-op seats agree). The save carries p.net after load.
- UI: no new part. The same kit chip line (trLine "Tính nết" → kitPcGrid) shows up to 3 known nết, each with a tooltip "Được … · Mất …" (netTip); the danger rule card prints the offsets from BAL.net; VANPHONG lists the nết words.

## History / drama expert check for the male pool (OD:L1327)
- Ming/Qing court men are judged on two axes the women's list already covers: honesty vs scheming (Thật thà↔Xảo quyệt) and clean vs greedy (Thanh liêm↔Ham lợi — the 清官/贪官 axis of every court drama; eunuch greed, bribes and gambling were chronic, Qing house rules banned eunuch gambling and money-lending again and again) → shared.
- Eunuchs were the palace's information brokers (Nhiều chuyện↔Kín đáo fits them as well as maids); many kept adopted sons/nephews and sent money home (Vì gia tộc↔Vì mình fits); officials and physicians are scholars (Ham học↔Ham vui); Mê tín↔Thực tế is universal in the period → all shared.
- The one sex-specific axis: for consorts pride of rank (Kiêu ngạo↔Khiêm nhường) is the drama staple; for men the staple is the upright remonstrating minister vs the flatterer / sycophantic eunuch (cương trực 忠直 vs xu nịnh 谄媚: Hải Thụy vs Nghiêm Tung/Hòa Thân archetypes, the "trung thần / nịnh thần" pairing of Chinese and Vietnamese court plays). → MALE pair 4 of Tính tình = **Cương trực ↔ Xu nịnh**; everything else shared. An old female-only nết met on a man maps Kiêu ngạo→Cương trực, Khiêm nhường→Xu nịnh (BAL.net.toM).
- Proposal only (names may still change): if sếp wants the men's list closer to the women's, swap pair 4 back to Kiêu ngạo↔Khiêm nhường — one line in BAL.net.M.

## The ONE trait table (BAL.net; gain + cost per nết, both wired to existing acts)
Acts = SOC/ACT menu keys (help, visit, warn, mediate, provoke, humiliate, flaunt, spy, test, check, ally, drop, steal, bribeksp, follow, feign, apologise, serveTH, gossip, pray, rumor, frame, poison, plant, musk, catswap, pushp, kframe, kpoison, accuse, bribe, block, trip). Every `w` key is a real act (checked in the built game: 0 unused). q = qualities read by servant/agent sites: loyal (che chủ j29/j70, confess −, bribe −), greed (bribeServ cheaper + odds, theft, sell, bad events j68h/j72), timid (confess +, will not betray), sharp (spy/clue, sentPen, plant odds, tell chance), talk (news, Hỏi chuyện, leaks vlLeak/sellRisk), hide (tell chance j43/j70 −8×q), study (npcStudy j85 ×(1+.25q)). fade = memory fade [good,bad] (BAL.mem.fadeT; smaller keeps longer).

| group | nết (pair) | pool | tend | GAIN (usable) | COST | wired to (act weights × / qualities / fields) |
|---|---|---|---|---|---|---|
| Tính tình | **Ân cần** ↔ Lạnh lùng | F+M | hay thăm hỏi, giúp đỡ, can ngăn | dễ kết thân; hay giúp, hay báo tin cho người mình quý | mềm lòng: dễ bị bạn mạnh xui làm, quà mọn cũng làm nàng nể | help×2.2 visit×2.2 warn×1.8 mediate×2 apologise×1.8 provoke×0.35 humiliate×0.25 poison×0.35 kpoison×0.35 frame×0.45 plant×0.45 musk×0.35 pushp×0.35 follow×1.6 · q: loyal+0.3 talk+0.2 · dang -8, mal -15, slight 0.8, forgive 1.4, trust 1.2, gift 1.2, harmGate 60 · fade 0.8/1.4 |
| Tính tình | **Lạnh lùng** ↔ Ân cần | F+M | ít nói, khó gần; đã quý thì quý lâu | đã thân thì bền: khó bỏ đồng minh, khó bị mua, ít lộ chuyện | khó lấy lòng: quà và lời ngọt nhẹ ký, chậm tin người | help×0.6 visit×0.5 mediate×0.6 gossip×0.5 rumor×0.7 drop×0.35 ally×0.8 · q: loyal+0.5 talk-0.4 hide+0.5 · mal 4, slight 1, forgive 0.8, trust 0.6, gift 0.6 · fade 0.6/1 |
| Tính tình | **Nóng nảy** ↔ Điềm tĩnh | F+M | dễ nổi giận, nói thẳng mặt; giận mau, nguôi mau | không giấu mưu: ý đồ dễ đoán, giận mau nguôi | dễ gây sự, dễ bị khích, ghen ra mặt | provoke×2.2 humiliate×1.5 trip×1.4 warn×1.3 feign×0.3 plant×0.6 frame×0.7 follow×1.3 · q: hide-0.8 talk+0.3 · dang 3, mal 8, slight 1.5, forgive 1.4, ghen 1.3 · fade 1/1.4 |
| Tính tình | **Điềm tĩnh** ↔ Nóng nảy | F+M | bình thản, nhẫn được; khó bị khích | khó bị khích hay bị xui; hay can ngăn | nhẫn nại chờ thời: ý đồ khó thấy, hận ngầm lâu | provoke×0.4 humiliate×0.5 trip×0.6 mediate×1.6 feign×1.3 follow×0.5 · q: hide+0.8 timid-0.5 · dang -2, mal -3, slight 0.7, forgive 1, ghen 0.8 · fade 1/0.8 |
| Tính tình | **Nhiều chuyện** ↔ Kín đáo | F+M | buôn chuyện, tin gì cũng lan | mang nhiều tin về: tai mắt, chuyện các cung | chuyện của chủ, của bạn cũng lan ra ngoài | rumor×2 gossip×3 spy×1.3 · q: talk+1 |
| Tính tình | **Kín đáo** ↔ Nhiều chuyện | F+M | giữ kín chuyện, để ý người quanh mình | giữ kín bí mật; dễ nhận ra tai mắt cài vào | ít khi kể tin cho ai; chậm tin người | gossip×0.4 rumor×0.5 spy×1.8 check×1.8 test×1.5 · q: talk-0.7 hide+0.6 sharp+0.4 · trust 0.8 |
| Tính tình | **Kiêu ngạo** ↔ Khiêm nhường | F | khoe ân sủng, hạ nhục người dưới, không chịu xin lỗi | trọng thể diện: lễ hậu, quà lớn được đáp mạnh; khó bị ép hay bị xui | quà mọn chẳng thèm nhìn; hay khiêu khích, hạ nhục | steal×1.4 provoke×2.4 humiliate×2.4 flaunt×2.4 rumor×1.3 trip×1.3 help×0.6 mediate×0.4 apologise×0.15 follow×0.4 · q: timid-0.5 · mal 12, slight 1.5, forgive 0.7, gift 0.6, lavish 60 · fade 1.2/0.7 |
| Tính tình | **Khiêm nhường** ↔ Kiêu ngạo | F | nhún nhường, tránh va chạm, theo người cầm đầu | dễ hòa, dễ xin lỗi; không dám phản chủ | theo người mạnh, dễ bị xui làm; bị ép thì khai | steal×0.5 follow×4.4 apologise×2 help×1.2 provoke×0.3 humiliate×0.2 flaunt×0.3 poison×0.4 frame×0.5 · q: timid+1 · dang -4, mal -10, slight 0.8, forgive 1.3, trust 1.1, gift 1.1 |
| Tính tình | **Cương trực** ↔ Xu nịnh | M | thẳng lưng, nói thẳng điều sai trái | không mua được để nói dối; lời chứng đáng tin, hay báo việc sai | thẳng miệng mích lòng người trên; không nhận việc mờ ám | feign×0.2 plant×0.4 frame×0.5 warn×1.8 provoke×1.3 accuse×1.4 · q: loyal+0.4 greed-0.6 timid-0.5 · mal -2, slight 1.2, gift 0.8 |
| Tính tình | **Xu nịnh** ↔ Cương trực | M | lựa lời ngọt, bám người có thế | dễ lấy lòng bằng lời ngọt, quà cáp; ngươi lên thì hắn theo | người sa cơ là bỏ; bên mạnh hơn mua là đổi phe, bị ép thì khai | ally×2 serveTH×1.6 follow×2.52 drop×2 flaunt×1.2 · q: greed+0.4 timid+0.6 · mal 5, gift 1.4, riseGift 1.6 |
| Lòng dạ | **Thật thà** ↔ Xảo quyệt | F+M | nói thật, ghét mưu ngầm | đáng tin: lời nàng báo là thật, không làm việc ám muội | dễ lỡ lời lộ bí mật; dễ tin người | feign×0.2 plant×0.4 frame×0.5 warn×1.5 rumor×0.7 · q: talk+0.3 timid+0.4 greed-0.3 · dang -3, mal -8, trust 1.2 · trọng 1 = Tín |
| Lòng dạ | **Xảo quyệt** ↔ Thật thà | F+M | tính trước tính sau, ngoài mặt thân thiện | đồng minh sắc trong mưu kế; tai mắt giỏi, dò tin giỏi | có lợi hơn là trở mặt; nhẫn nại giăng bẫy kẻ cản đường | feign×2.5 plant×1.8 frame×1.8 kframe×1.8 spy×1.6 poison×1.5 kpoison×1.5 musk×1.5 catswap×1.5 pushp×1.3 ally×1.5 drop×1.6 warn×0.6 help×0.8 mediate×0.5 · q: sharp+0.6 hide+0.5 · dang 5, mal 25, forgive 0.8, trust 0.8 · fade 1.3/0.6 · trọng 1 = Trí |
| Lòng dạ | **Thanh liêm** ↔ Ham lợi | F+M | không tham của, không nhận quà riêng | không bán tin, không ăn cắp; lời chứng không mua được | bạc không mua được nàng; quà hậu nàng chê | bribe×0.2 bribeksp×0.2 flaunt×0.6 steal×0.2 · q: greed-1 · mal -5, gift 0.7 · trọng 1 = Liêm |
| Lòng dạ | **Ham lợi** ↔ Thanh liêm | F+M | mê bạc vàng, việc gì cũng tính lời lỗ | mua được bằng bạc (tin tức, giúp việc) và giá rẻ hơn; quà nào cũng ấm lòng | bán tin cho người trả cao hơn; ăn cắp vặt | bribe×1.6 steal×2 flaunt×1.2 · q: greed+1 · mal 5, gift 1.6 · trọng 1 = Cần |
| Lòng dạ | **Rộng lượng** ↔ Thù dai | F+M | dễ bỏ qua, hay làm hòa | oán mau nguôi, làm hòa được | ơn cũng mau quên; dễ bị người lợi dụng | help×1.4 mediate×1.6 provoke×0.6 follow×1.4 · q: loyal+0.2 · dang -6, mal -12, slight 0.7, forgive 1.8 · fade 1.4/1.8 · trọng 1 = Nhân |
| Lòng dạ | **Thù dai** ↔ Rộng lượng | F+M | nhớ oán rất lâu, nhớ ơn cũng lâu | không quên ơn: người từng giúp nàng được nàng giúp lại lâu dài | không quên oán: kẻ làm nàng mất mặt bị nhớ mãi | provoke×1.2 drop×0.4 · q: loyal+0.3 · dang 4, mal 12, slight 1.4, forgive 0.3, trust 0.9, gift 0.9 · fade 0.5/0.3 · trọng 1 = Sỉ |
| Lòng dạ | **Trọng nghĩa** ↔ Thực dụng | F+M | giữ lời, không bỏ bạn lúc hoạn nạn | che chắn cho chủ, cho bạn; giữ lời hứa, khó bị mua | không làm việc thất đức cho ai, còn quỳ can; theo nghĩa chứ không theo lợi | steal×0.6 help×1.6 warn×1.8 drop×0.1 · q: loyal+1 · dang -3, mal -8, trust 1.2 · fade 0.6/1 · trọng 1 = Nghĩa |
| Lòng dạ | **Thực dụng** ↔ Trọng nghĩa | F+M | khéo lấy lòng người trên, theo lợi | dễ kết minh khi đôi bên cùng có lợi; ngươi lên thì nàng xích lại | đồng minh sa cơ là bỏ; lợi lớn hơn thì đổi phe | ally×2 drop×2.2 serveTH×1.4 bribe×1.2 help×0.8 · q: greed+0.3 sharp+0.3 · mal 5, gift 1.2, riseGift 1.6 · trọng 1 = Kiệm |
| Chí hướng | **Tham vọng** ↔ An phận | F+M | bám người mạnh, cướp đêm thị tẩm, muốn trèo cao | lanh lợi, bám người đang lên: ngươi lên thì nàng theo | tranh đêm thị tẩm, đút lót Kính sự phòng; muốn trèo cao, bỏ kẻ sa cơ | ally×2 steal×2.2 bribeksp×2.2 drop×1.8 block×1.8 accuse×1.4 bribe×1.3 · q: sharp+1 · mal 12, ghen 1.2, riseGift 2 · fade 1.4/1 |
| Chí hướng | **An phận** ↔ Tham vọng | F+M | không tranh sủng, yên với phận mình | không tranh đêm, ít ghen; ở lâu, không bỏ chủ | ít chịu liều vì người khác; khó kéo vào phe | steal×0.4 bribeksp×0.3 block×0.4 accuse×0.5 ally×0.7 help×0.8 follow×1.3 · q: timid+0.5 loyal+0.3 · dang -3, mal -8, ghen 0.7 |
| Chí hướng | **Ham học** ↔ Ham vui | F+M | chăm đèn sách, tài nghệ | học nhanh, lanh trí: dò ra manh mối | ít giao du, ít đến thăm; khó kết thân bằng yến tiệc | visit×0.7 gossip×0.6 ally×0.85 pray×0.7 · q: sharp+0.8 study+1 |
| Chí hướng | **Ham vui** ↔ Ham học | F+M | thích yến tiệc, trò vui, chuyện phong tình | dễ kết thân: quà nhỏ, cuộc vui là đủ | lơ là việc, hay sơ suất; tình ý thay đổi | visit×1.5 gossip×1.5 rumor×1.2 pray×0.6 · q: talk+0.5 study-0.5 greed+0.3 · gift 1.3 |
| Chí hướng | **Mê tín** ↔ Thực tế | F+M | tin điềm báo, sợ bùa ngải | hay lên chùa cầu khấn, soát quà kỹ vì sợ bùa ngải: quà có độc khó lọt | lo cúng bái hơn giao du: ít đến thăm, ít giúp, ít kết minh | check×1.5 pray×3 follow×1.2 help×0.8 visit×0.8 ally×0.8 |
| Chí hướng | **Thực tế** ↔ Mê tín | F+M | chỉ tin điều tận mắt thấy | soát việc kỹ, thử lòng người: quà có độc, kẻ gian khó qua mắt | chậm tin người; lời ngọt và quà cáp nhẹ ký | pray×0.3 check×1.3 test×1.2 · q: sharp+0.2 · trust 0.9, gift 0.9 |
| Chí hướng | **Vì gia tộc** ↔ Vì mình | F+M | kính bề trên, giữ nề nếp, lo cho nhà | kính Thái hậu, giữ nề nếp; giữ lời vì danh nhà | nhà bảo gì nghe nấy, có khi bỏ bạn vì nhà | serveTH×2.2 ally×1.2 provoke×0.7 follow×1.3 drop×1.3 · q: loyal+0.3 · dang -2, mal -3, trust 1.1 |
| Chí hướng | **Vì mình** ↔ Vì gia tộc | F+M | lo cho mình trước hết | dễ mua bằng lợi riêng; phe phái khó kéo | không hy sinh cho ai; lúc nguy là bỏ | steal×1.4 block×1.4 drop×1.6 help×0.7 warn×0.7 accuse×1.2 follow×0.3 · q: greed+0.5 · mal 8, gift 1.2 |

## Bot re-measure (sens bot, runpers.js, 2×2400 s each side, same box at the same time; node dev/measure/netsum.js)
persLog counts an act once per nết of the doer → divided by 2 (before) / 3 (after).

| build | lives (ended) | HH reached | avg maxRank | avg years (ended) | harm acts / life | harm acts / year | rude acts / life | kind acts / life | crash |
|---|---|---|---|---|---|---|---|---|---|
| before (main+rename) | 35 (15) | 0 | 2.80 | 5.3 | 73.5 | 13.93 | 147.7 | 70.9 | 0 |
| after (trait-pool) | 39 (14) | 0 | 2.36 | 3.8 | 54.7 | 14.32 | 97.4 | 45.7 | 0 |

- Harm per year unchanged (13.9 → 14.3); deaths by poison 2 → 1; no page errors, no crash. Fewer rude/kind acts per life follow the shorter ended lives in this small sample (more "Tuổi trời đã tận"; TIMEOUT lives excluded). HH 0 on both sides in this run (box load; the D7 report saw 6/28 with longer caps) — the HH gate itself is untouched. Balance pass C7 may re-measure with longer caps.

## Tests
- node dev/test/trait-pool.js <base.html> → 18/18 (old save from the base build: 2-nết consorts map into groups, servant trung→Trọng nghĩa, nhat→Khiêm nhường/Xu nịnh, men male pool, first trọng = Lòng dạ virtue, deterministic, save carries p.net; new life: every row tend+gain+cost+pair, no female-only nết on men, spread over the pool, malice range; bot run no crash, 0 page errors).
- coop-e2e 60/60 (live worker). trait-rename-oldsave 9/9. python3 dev/test/net-scan.py (table above).
- trong-check.js stops at showSelf → "WAGE is not defined" on the BASE build too (pre-existing harness issue, not this branch); its migration part runs.
- Not done by me: person-card screenshots with 3 known nết at the 6 sizes (same kitPcGrid chip line as before, only longer text) → reviewer please check Fold 755x1000 + iPad 1180x820.

## Notes for the next jobs (NOT this job) — API kept to one lookup
- SHOW-WHY-A-NUMBER: per factor read BAL.net.T[t] (gift/trust/slight/forgive…) + netTip(t) for the named line; generic when !trKnown.
- Greeting name rule: hasT(p,"Kiêu ngạo")/hasT(p,"Lạnh lùng") (men Cương trực) → no name; Ân cần/Khiêm nhường → name.
- AG-MEET: persW over the 3 nết (SOC visit/help/provoke…), netQ for qualities.
- Voice by Tính tình: traitsOf(p)[0] is always the Tính tình nết.

SẴN SÀNG KIỂM da4ac6e37 (branch review/trait-pool, base review/trait-rename 27886326)
