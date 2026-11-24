# E69 — PARKING #9 KHOẢNH KHẮC CHÂN DUNG (collectible painted moments) — rules/data on review/moment
SẴN SÀNG KIỂM moment 5a504f92 (rules/data; album UI waits KIT READY «moment album»; art waits Foreman C).
PRIORITY #1 CHECK ('khoảnh khắc chân dung' / 'keepsake' / 'portrait moment'): OD 0 | ledger 0 | claims 0 (E69 row added) | main 0 for the feature (keepsake hits = jpetlife petkv, jdh2 title items — reused as patterns) | review/* 0 (hc-portrait / map-portrait / portrait-kit = portrait FRAMES, unrelated).
REUSED (git grep origin/main): j22 MROLES «Họa sư» (a real NPC man, haunts vuon / tn, S.menW where he stands each buổi) · j31 FEST + festToday · j1 SEASON / jtime4 buổi · j2 places/goTo · j9 placeWhere (S.where, NPC places) · j8 promoteP (one promotion for her + NPCs), giveTo, IT/ITIMG · jil ilLog/ilWhere (one item ledger) · jlost loOk (theft) · jshelf BAL.shelf.it (display) · jkrev kitItemInfo (bag tile picture) · j28 figFor "por" (portrait) · j3 Q dialog + act-card options (odds word by c.p) · jcol pastHTML + rows67 (Sổ luân hồi gallery rows).
Owner words: dev/PARKING_LOT.md row 9 (20/11 ~06:35Z) «Khoảnh khắc chân dung mà, cái này khá là hay. Đưa vào trong bãi đổ.»; build order OD 24/11 ~05:20Z «cứ lôi ra làm tiếp».

## STEP 1 — EXPERT (law 8, short)
History (Qing court, the model the game's palace follows):
- Court painters worked in the 如意馆 Như ý quán workshop inside the palace (Castiglione / Lang Shining, Jin Tingbiao, Ding Guanpeng…). They painted only on imperial order; a consort could not hire one privately — a bribe to a painter is the classic scandal (Mao Yanshou and Wang Zhaojun, already a road in j68e «Bỏ bạc nhờ vẽ cho đẹp»).
- 行乐图 hành lạc đồ = "leisure portraits": the Emperor, consorts and children shown in a season scene — Yongzheng's 十二月行乐图 (one festival / season per month), 雍正妃行乐图 / 胤禛美人图 (twelve beauties: by the plum in snow, with a fan by water, chrysanthemums in autumn, reading by a window…), Qianlong's 岁朝行乐图 (New Year), 元宵行乐图 (lantern festival). This gives our list: season scenes in the garden + festival scenes.
- 朝服像 triều phục tượng: the formal investiture portrait in court robes, painted when a consort received her rank (the Qianlong consorts' scroll 心写治平 shows them by rank) → our «Ngày nhận sắc phong» event moment.
- Portraits were kept, given and lost: given to family as a token (j72sd fam-006 already cites the custom), kept in palace stores, sometimes taken or destroyed after a fall from favour → a real item that can be given, shown, stolen (law 6c).
Drama / game patterns:
- Dramas (Diên Hi công lược, Như Ý truyện) use the painter sitting as a favour scene: whoever the Emperor lets be painted is seen as favoured; rivals bribe the painter or spoil the sitting.
- Games: collectible "moment cards" (gacha card sets, Love-and-Producer memories, Genshin namecards) work when (a) each card is tied to a time/place you must BE at, (b) sets are visible with empty slots and hints, (c) rare, never pay-to-win. Our fit: no shop, no gacha — the painter must really be there, a sitting costs khắc, once per moment a year.
Fit to the game: seasons = SEASON (4), place = vuon (Ngự hoa viên, where his work orders take him), festivals = existing FEST keys (newyear, nguyentieu, doanngo, thattich, trungthu, trungcuu), event = promotion.

## STEP 2 — RULES + DATA (review/moment)
Code: dev/build/jmoment.js (assembled after jshelf.js). ONE table BAL.mo (law 4).
| moment | trigger | place / buổi |
|---|---|---|
| Dạo bước dưới hoa đào | Xuân | vuon · sáng/trưa/chiều |
| Hồ sen đêm trăng | Hạ | vuon · tối |
| Hóng mát bên thủy tạ | Hạ | vuon · trưa/chiều |
| Thưởng cúc trời thu | Thu | vuon · sáng/trưa/chiều |
| Dưới tuyết mai | Đông | vuon · sáng/trưa/chiều |
| Đón xuân ngày Tết | FEST newyear | vuon · sáng |
| Cầm lồng đèn Thượng Nguyên | FEST nguyentieu | vuon · tối |
| Xem đua thuyền Đoan ngọ | FEST doanngo | vuon · sáng |
| Xâu kim đêm Thất tịch | FEST thattich | vuon · tối |
| Ngắm trăng Trung thu | FEST trungthu | vuon · tối |
| Lên cao ngày Trùng cửu | FEST trungcuu | vuon · sáng |
| Ngày nhận sắc phong | event: promotion (promoteP) | — |
How it is earned (rare, gain-only, costs khắc — law 3):
- The Họa sư (a real living man, law 6b) must stand there: S.menW[painter] === place, i.e. where the men's fixed schedule (jmen menSched, consort road) really puts him — his Nội vụ phủ work orders send him to Ngự hoa viên on some tuần (other tuần to a consort's palace). A festival tuần adds ONE lawful work order (menLawful 'order') at the feast at the moment's buổi, wrapped into menSched, so the man is visibly there for everyone (her and NPCs). No painter alive / banned → no moments. (Found while testing: in the live game j22's random walk is replaced by jmen, and he never goes to Đức Thọ cung → the planned tn moment was dropped: 12 moments.)
- She may also be offered at the start of a buổi when she already stands where he paints (placeWhere wrap; she is there first).
- She arrives (goTo) → ONE kit dialog «Họa sư đang vẽ» with two equal roads (law 2) + leave: «Ngồi cho họa sư vẽ» (tốn 1 khắc, odds) · «Lót tay họa sư» (bạc by rank BAL.mo.bribe, odds + BAL.mo.bribeB, rumour risk BAL.mo.rumor → Danh −1) · «Thôi, để dịp khác». Odds word from the ladder (c.p, law 7, no %).
- moOdds = base + (Sắc − bar[rank])·sacK + (Tài − bar[rank])·taiK + empB when Hoàng thượng is there. bar rises with rank 40→68 (law 5). Table (Sắc 60, Tài 50): rank 0..7 → 68 64 60 56 52 48 44 40.
- Win: the portrait item + Danh +1 (+ Sủng +1 when Hoàng thượng was there), reward card (kit kind reward, rows67). Fail: «dáng hôm nay chưa ra hồn», khắc / bạc spent.
- Once per moment a year per person; at most BAL.mo.capY = 2 a year; one sitter per painter per buổi (S.moBusy: an NPC who sat first keeps him busy — she reads «… đang vẽ cho …»).
- Promotion: BAL.mo.promoP = 35 chance of «Ngày nhận sắc phong» (gain-only), her and NPCs, one wrap of promoteP.
Real object (law 6c): entry {k:"chandung", mo, of, ofN, y, by, src} in the chest; S.moIu[ledger id] keeps what the piece is, because j8 giveTo / gift paths copy only {k, from, iu} — moFix restores moment/sitter/year/painter on every read (found by the test: a given painting turned into a plain «Tranh chân dung»); IT.chandung (kd Kỷ vật → bag tab Lễ vật, pr 120, gv 8, tg emp); ilLog on grant; giveTo works (NPC may return it — still traced; to Hoàng thượng → box emp); jlost loOk = true (can be stolen); BAL.shelf.it.chandung (group Thư họa, kit grade 2) = displayable on Đa bảo các.
NPCs (law 1): at every buổi (placeWhere wrap) each NPC consort standing where the painter is, with a moment open, chooses to sit (BAL.mo.npcSit 60) and rolls the SAME moOdds; host only in co-op. Log line when she has tai mắt or is there.
UI: kit only. Dialog = Q + act cards; bag = the existing kitInvGrid, each painting its own tile (kinvGroups/kinvItems wrap: no ×N stack, picture + name + grade Trân phẩm); item reveal/panel = kitItemInfo wrap (picture moPic, name «Tranh «…» · <name>», sub «Tranh chân dung · chưa vẽ cảnh» while no art); gallery = Sổ luân hồi section «Khoảnh khắc chân dung» (rows67: Đã có n / 12, one row per moment with year + painter or «chưa có · <when>»).
KIT REQUEST «moment album» filed in dev/kit/KIT_REQUESTS.md (review/moment e6c71f13): card-album grid part. That UI piece is STOPPED until KIT READY (BAL.mo.album = 0).
«chưa vẽ» guard: moPic(e) = BAL.mo.art[moment] → else the sitter's portrait snapshot e.src (figFor por at the time of painting) → else her live portrait → else the kit painting tranhco. Test proves no blank.

## ART ORDER — for Foreman C (do not draw here)
- What: one painted SCENE per moment (11 scenes + 1 investiture), the consort in the scene, as a hanging-scroll painting card 3:4 (≤ 250 KB webp, CDN img/moment-<key>.webp). The sitter's face must show clearly (no back view, no tiny figure in a big landscape), so the painting must match the sitter's own look: draw it per consort FIGURE GROUP (figFor trait looks: hienlanh, kieungao, danghi, thamvong, numi, hiemdoc + heroine) = 7 looks × 12 moments = 84 pictures; first wave = heroine × 12 (she sees her own first), then the 6 consort looks.
- Prompt notes (dev/art/STYLE_ANCHOR.md, start with its prompt prefix unchanged but replace «plain light parchment background» with the scene): serene face, soft round-almond eyes, fair porcelain skin, calm standing or seated pose, hands busy with the prop (lantern, fan, needle and thread, chrysanthemum sprig, plum branch, wine cup), no flying sleeves; huadian on consorts only; rank-readable robes; adults 18+, age band of the figure; no moles; scene per row of the table above (Dưới tuyết mai: snow on red plum, fur-lined cape; Hồ sen đêm trăng: moon over lotus pond, water pavilion railing; Thượng Nguyên: lotus lantern under rows of lanterns; Thất tịch: starry sky, five-colour thread; Trung thu: full moon, mooncake table; Trùng cửu: rockery, dogwood sprig, chrysanthemum wine; Đoan ngọ: dragon boats, mugwort sachet; Tết: red couplets at the palace gate; sắc phong: formal court robe and crown of her rank, seated frontal 朝服像).
- Magnific gpt-2-6 only, folder ba4aecfe-efce-47e2-b53f-30d292091886, look at every image. When an image is approved: put its CDN path in BAL.mo.art[<moment key>] (per look later: "<key>|<look>").

## TESTS (review/moment 85c62894 code; head 5a504f92 = + KIT_REQUESTS doc only)
- dev/test/moment.test.js PASS (×6 runs, both NPC-gift paths: accepted and returned): table 12/12 triggers ok, no number/% in names; odds by rank (Sắc 60, Tài 50) 68 64 60 56 52 48 44 40 (law 5); her vs NPC same numbers → same odds (68/68, law 1); she earns «Dưới tuyết mai» at the painter's place (dialog 3 options, odds word Rất vững, item in chest, ledger line, ilWhere me, reward card); painter busy → no 2nd sitting that buổi; jlost loOk true; shelf entry; give to NPC → traced (v.id or back to me), identity kept (moment/sitter); give to Hoàng thượng → ledger "emp", Sủng +3; «chưa vẽ» guard: 4 pictures never blank (snapshot / live portrait / tranhco); NPC at the painter's place collects the same item (traced); once per moment a year + capY; festival work order: Thượng Nguyên tối → painter at vuon (why order), sáng → his normal order (a consort palace), moment closed at the wrong buổi; promotion portrait her + NPC; bag tiles one per painting (qty 1, picture, Tranh «…» · name, Trân phẩm); Sổ luân hồi rows; old save (no moY / moBusy) no error.
- quickcheck 85c62894: QUICKCHECK PASS · open 1398 ms · old save ok · core gates PASS · perf new/live render 222/229, tab 392/400, buổi 1998/1149 (inside the gate; box busy), tasks>200ms 23/23. (First run e6c71f13: all gates PASS, only "NOT BUILT" → built index.html/sw.js now committed; assets.json kept = LIVE.)
- role-parity.test.js ×2: PASS / PASS (no new gap; promotion parity rows ok).
- Shots (host mode, @2, LOOKED at all): Fold 755x1000 + iPad 1180x820 — 1 painter card (kit dialog, painter figure, 3 act cards with odds word and Tốn/Được), 2 reward (kit item reveal shows the sitter's portrait = guard, «Tranh «Dưới tuyết mai» · <name>», Trân phẩm, «Tranh chân dung · chưa vẽ cảnh»), 3 Tư trang › Lễ vật bag (the painting is its own tile with the portrait). CDN upload refused (no R2 key in this container) → dev/handover/shots/moment/*.webp on the handover branch (delete with the verdict). Note: the dialog's top picture is the kit's generic event art (evArt), not a painting scene — fine until the ART ORDER lands.
- Law-11 scan (whole family = every place an item entry is copied/read): giveTo (j8 + wraps) → identity restored by ledger id (moFix); kitItemInfo (reveal/panel), kinvItems (bag tile), iname (every text), moBookHTML (gallery), shelf (BAL.shelf.it) — before: given piece = plain «Tranh chân dung», bag = one ×N tile «Thường» with the scroll icon; after: every place shows «Tranh «moment» · sitter», portrait, Trân phẩm.

## FOR MAIN / FOREMAN E
- FOR MAIN: KIT REQUEST «moment album» (KIT_REQUESTS.md on review/moment) → kit keeper; worker swaps the Sổ luân hồi rows for the album when KIT READY.
- FOR MAIN: ART ORDER above → Foreman C.
- FOR MAIN: one wording check for VANPHONG keeper: the bag/reveal sub line «Tranh chân dung · chưa vẽ cảnh» is the visible «chưa vẽ» guard asked in the brief (until the art lands).

## HANDOVER
Nothing left open on my side except: album UI (waits KIT READY «moment album»), art (Foreman C), then set BAL.mo.album = 1 / BAL.mo.art keys. START_CTX ~3 %, ended well under the rollover line.
