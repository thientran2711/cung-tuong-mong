# YARD — waiting-yard drama seeds (SELW-YARD; brief M112 ADDENDUM 4/5/10; owner OD 23/11 ~22:20Z + ~22:40Z)
PRIORITY #1 CHECK ('drama sân chờ'): OD 23/11 ~22:20Z/~22:40Z | main none (no yard code yet; nết: BAL.net F/M jbal2.js:923, TRAITS j1.js:45, jnet.js; j61 npcKnows) | review/* none | claims SELW-YARD (this file).
Status: IN PROGRESS. Writer session session_01Rc5AsKtskVo6wA385KED1J. HANDOVER (if rolled over): continue after the last `### Y` id in this file; keep the SAME format; push in batches of ~15.
FORMAT NOTE: HIST-TUYENTU §8 was not pushed when batch 1 was written; this format follows the shape of §7 and is PROVISIONAL — reconcile with §8 once it lands (field names are English, all in-game text Vietnamese cổ trang, no %, no typed numbers).

## 0. How to read an entry (machine-readable; one `### Y<nn> <slug>` block per seed)
```
### Y<nn> <slug>
tag: K|D|K/D  (K = real-history pressure/type, D = palace drama; plausible staging, not proof)
tone: funny|petty|tense|cruel|sad|tender   weight: s|m|l   bar: easy|mid|hard
```
- `weight` = ONE tier for the whole seed. Every stance gain and loss is worth that tier: BAL.yard.fx.s / BAL.yard.fx.m / BAL.yard.fx.l (law 4: no number typed here). Because all four stances use the same tier, and each stance has exactly 2 gains + 2 losses, the four stances are equal value (law 2) and none is cost-only or gain-only (law 3).
- `bar` = how strict the role fit is (easy seeds are picked when the real roster has no good bully/victim; never force a bully — HIST-TUYENTU §7 generator rule).
- `roles:` role letters. B = bully/aggressor, V = victim/target, W = witness/bystander pool (acts by nết, §7.0 table; seed lines below give the seed-specific wording), I = instigator (whispers/steals/bribes), H = helper, M = ma ma (narrator, not a tú nữ), E = tiểu thái giám (a real roster eunuch), P = the player. `[a,b|c,d]` = nết fit (any of group 1 AND any of group 2; groups separated by |). Nết names exactly as BAL.net female pool: Tính tình = Ân cần, Lạnh lùng, Nóng nảy, Điềm tĩnh, Nhiều chuyện, Kín đáo, Kiêu ngạo, Khiêm nhường · Lòng dạ = Thật thà, Xảo quyệt, Thanh liêm, Ham lợi, Rộng lượng, Thù dai, Trọng nghĩa, Thực dụng · Chí hướng = Tham vọng, An phận, Ham học, Ham vui, Mê tín, Thực tế, Vì gia tộc, Vì mình.
- `birth:` Mãn = Mãn kỳ (great banner), Hán = Hán quân kỳ, Bao = Bao-y / Nội vụ phủ family, hi / lo = father's office high / low, any. Rich vs poor = hi vs lo.
- `her:` which role P can be in this seed. `bystander` always; `victim` = two-way (law 1): the same cast can do it TO her (then use `as_victim:` + the generic victim stances in §0.2).
- `place:` where in the yard the scene stands (yard PANS; scene placed at a landmark).
- `obj:` the real object (law 6c): `id | who owns it at start | where it is during the scene | where it goes after (traceable)`. `none` = no object.
- `setup:` the narrated opening (ma ma voice, ngôi thứ ba). Placeholders {B} {V} {W} {I} {H} {E} are filled with the real NPCs' names if the girl's NAME is known to P, else with «một tú nữ» + face (Addendum 5).
- `react:` seed-specific wording for bystanders by nết (the ACT comes from §7.0 table: defend / join / mediate / silent / fetch-ma-ma / watch). Only the lines that colour this seed are given.
- Four stances (one line each): `<stance>: "button text" => "result text" | G: <2 gains> | L: <2 losses>`. Stance ids: bênh (defend), hùa (join), hoà giải (mediate), đứng ngoài (stay out).
- `carry:` outcomes that persist (real NPCs, law 6b): known face/name per Addendum 5 (j61 npcKnows; face after the scene, name only if the girl's nết + rank/birth give it), marks on the real NPCs.
- `ma:` the ma ma's closing line (1–2 sentences, names no outcome in numbers).
- Optional: `as_victim:` setup variant when P is V; `note:` writer note for the builder / reviewer.

### 0.1 Effect tokens (the only vocabulary in G/L; each resolves via BAL.yard.* — SELSCENE adds the keys)
`aff(X,+|-)` thiện cảm of X toward P moves by BAL.yard.fx.<weight> · `friend(X)` friend mark (BAL.yard.friend) · `grudge(X)` oán mark (BAL.yard.grudge) · `nghia` P gains the «nghĩa» mark in the ma ma's memory (BAL.yard.nghia) · `maMa(+|-)` the ma ma's esteem moves (BAL.yard.maMa; a brawler/liar is remembered) · `clock(+|-)` the visible chat countdown is kept / eaten by BAL.yard.clock · `face(X)` a face learned (j61 stage 1; name only per Addendum 5) · `noCredit` neither side marks P as friend (BAL.yard.noCredit = mediation is not thanked in full) · `royals(-)` the story reaches the royals' ears (feeds the tests' thiện cảm via BAL.yard.royal) · `rumour(P)` P is named in a rumour she can later answer (law 6a). X ∈ {B,V,W,I,H,E,M}. W = every bystander who saw (each by her own nết).
### 0.2 Generic victim stances (when `her: victim` and P is V; same tier/equal-count rule; wording from the seed's `as_victim`)
cãi lại (= bênh) G: aff(W,+), nghia | L: grudge(B), maMa(-) · nhún nhường (= hùa) G: aff(B,+), clock(+) | L: aff(W,-), rumour(P) · xin giảng hoà (= hoà giải) G: aff(B,+), aff(W,+) | L: clock(-), noCredit · nhịn im (= đứng ngoài) G: maMa(+), clock(+) | L: aff(B,-), aff(W,-).
### 0.3 Cast picking (builder, restating HIST-TUYENTU §7 generator): pick the seed by the life seed minus the player's seen-list (cycle restarts when used up); fill B/V/I from the real roster by `roles` nết fit + birth + thiện cảm; if the best fit is poor choose a seed with `bar: easy`. Never kill or maim; slaps, torn dresses, lost things only.

---
### Y01 chen-tra-do
tag: D (Như Ý/Diên Hi household spite) + K (poor girls wore borrowed clothes)   tone: cruel   weight: m   bar: mid
roles: B=[Kiêu ngạo,Nóng nảy|Thù dai,Vì gia tộc] V=[Khiêm nhường,Kín đáo,An phận] E=tiểu thái giám đưa trà, W=pool
birth: B=hi V=lo   her: bystander|victim   place: bậc thềm trước sảnh
obj: xiêm lụa mượn của V | mẹ V gom tiền may cho V | dính vết trà trên người V | cung nữ mang đi giặt ở Tân Giả khố, trả lại V sau buổi tuyển (truy được)
setup: "Tiểu thái giám bưng khay trà đi ngang; {B} «vô ý» xô khuỷu tay, chén trà đổ ướt cả tà xiêm của {V}. Chưa đến giờ vào sảnh, mà xiêm áo đã loang một mảng."
as_victim: "Tiểu thái giám bưng khay trà đi ngang; {B} «vô ý» xô khuỷu tay, chén trà đổ ướt cả tà xiêm của ngươi."
react: Ân cần → "Muội đừng sợ, tỷ có khăn đây." · Nhiều chuyện → rón rén chạy đi tìm ma ma · Kiêu ngạo → khẽ cười che miệng, nhìn {B} tỏ ý tán thưởng · Kín đáo → cúi đầu, lát sau lặng lẽ đưa khăn
bênh: "Ta chỉ thẳng {B}: «Tỷ cố ý, ta thấy rõ.»" => "{B} tái mặt, {V} mắt đỏ hoe nhìn ngươi biết ơn; tiếng cãi lọt đến tai ma ma." | G: aff(V,+), nghia | L: grudge(B), maMa(-)
hùa: "Ta cười nhạt theo {B}: «Xiêm áo vụng giữ thì hỏng thôi.»" => "{B} liếc ngươi như đồng bọn; {V} cúi đầu, không nhìn ngươi nữa." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta nhường khăn choàng cho {V}, nhẹ lời với {B}: «Việc nhỏ, đừng làm ồn.»" => "Hai bên lặng đi; {V} khoác khăn, {B} hậm hực nhưng thôi không nói." | G: aff(V,+), aff(B,+) | L: clock(-), noCredit
đứng ngoài: "Ta lùi một bước, quay sang chuyện trò với tú nữ khác." => "Ngươi kịp hỏi han thêm một người; {V} nhìn theo ngươi một thoáng rồi cúi đầu." | G: clock(+), face(W) | L: aff(V,-), aff(B,-)
carry: face(B), face(V) · V keeps a stained dress into the hall (visible in the line-up, no number) · grudge/friend marks above
ma: "Xiêm áo có thể thay, lòng người một lần dơ khó rửa."

### Y02 cay-tram-mat
tag: D (Chân Hoàn-type theft)   tone: tense   weight: m   bar: mid
roles: B=[Ham lợi,Xảo quyệt|Vì mình,Tham vọng] V=[Thật thà,Thanh liêm|Khiêm nhường,An phận] H=[Điềm tĩnh]
birth: B=any V=lo   her: bystander|victim   place: dưới gốc hòe cạnh bồn hoa
obj: cây trâm ngọc của mẹ V | V cài trên tóc | rơi tuột, B nhặt giấu vào ống tay áo | nếu ai soát, trâm nằm trong tay áo B; nếu không ai soát, B đem bán nhờ thái giám sau buổi tuyển và trâm ra ngoài cung (truy được qua E)
setup: "Cây trâm ngọc mẹ để lại cho {V} bỗng không còn trên tóc. {V} cúi lục khắp chân tường, mặt cắt không còn giọt máu; {B} đứng bên, tay áo khẽ thu về."
as_victim: "Cây trâm ngọc mẹ để lại bỗng không còn trên tóc ngươi. {B} đứng cạnh, tay áo khẽ thu về."
react: Thanh liêm → «Trâm nặng thế, rơi phải có tiếng.» · Điềm tĩnh → đề nghị mọi người cùng nhìn quanh chân · Nhiều chuyện → thì thầm «ai ngờ là người nhà quan» · Xảo quyệt → quay mặt, coi như không thấy
bênh: "Ta nói thẳng: «Mời {B} cho soát tay áo.»" => "{B} giận đỏ mặt, song tay áo phải mở; chuyện ầm lên khiến ma ma lại gần." | G: aff(V,+), nghia | L: grudge(B), maMa(-)
hùa: "Ta nói đỡ cho {B}: «Của rơi thì tìm chỗ khác, đừng vu cho người.»" => "{B} mỉm cười biết ơn; {V} nhìn ngươi, ánh mắt lạnh đi." | G: aff(B,+), friend(B) | L: grudge(V), rumour(P)
hoà giải: "Ta rủ mọi người cùng tìm một lượt quanh bồn hoa, không nhắc tên ai." => "Cả bọn cúi lục cỏ; {B} lúng túng, {V} thấy ngươi giúp thật lòng." | G: aff(V,+), aff(B,+) | L: clock(-), noCredit
đứng ngoài: "Ta không xen, tiếp tục trò chuyện với tú nữ bên cạnh." => "Ngươi có thêm một lời quen biết; sau lưng, {V} thở dài." | G: clock(+), face(W) | L: aff(V,-), maMa(-)
carry: face(V), face(B) · trâm's location is real: B's sleeve (or sold via E) — later content can reference it
ma: "Của đã mất, tìm được hay không, trời cho ta nhìn rõ ai."

### Y03 che-xuat-than
tag: K (banner/Bao-y class divide) + D (An Lăng Dung)   tone: cruel   weight: l   bar: mid
roles: B=[Kiêu ngạo|Vì gia tộc,Tham vọng] V=[Khiêm nhường,Kín đáo|Vì mình,An phận] H=[Trọng nghĩa,Rộng lượng] W=pool
birth: B=Mãn,hi V=Bao,lo   her: bystander|victim   place: hàng đầu, sát cửa sảnh
obj: tấm thẻ gỗ ghi họ của V | V đeo cài nút áo | B hất bằng quạt, rơi xuống đất | thái giám đứng gác nhặt, trả V sau (truy được)
setup: "{B} liếc tấm thẻ gỗ trên áo {V}, cười khẽ: «Nội vụ phủ bao-y cũng đòi đứng cùng hàng với ta?» Cả hàng nín thở."
as_victim: "{B} liếc tấm thẻ gỗ trên áo ngươi, cười khẽ: «Nội vụ phủ bao-y cũng đòi đứng cùng hàng với ta?»"
react: Trọng nghĩa → bước lên đứng cạnh {V} · Kiêu ngạo → cười phụ họa, khoe thẻ của mình · Khiêm nhường → cúi mặt, bàn tay siết chặt vạt áo · Điềm tĩnh → «Chốn này chỉ xét phúc tướng, chẳng xét giường nào sinh ra.»
bênh: "Ta bước lên: «Thứ bậc cha mẹ cho, tỷ chê ai được?»" => "{B} cứng họng; {V} ngẩng lên, mắt sáng; cả hàng nhìn ngươi." | G: aff(V,+), nghia | L: grudge(B), royals(-)
hùa: "Ta khẽ cười: «Nói vậy cũng có lý, mỗi người một phận.»" => "{B} gật đầu hài lòng; {V} ngước nhìn ngươi, rồi cúi xuống lặng lẽ." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta nhắc: «Nhà ai cũng có tổ, vào sảnh cùng hầu một người.»" => "Không khí chùng xuống; {B} phẩy tay bỏ đi, {V} gật đầu cảm kích nhưng ngượng." | G: aff(V,+), aff(B,+) | L: clock(-), noCredit
đứng ngoài: "Ta nhìn thẳng phía trước như không nghe thấy." => "Ngươi tránh được ánh mắt của ma ma; {V} cúi đầu rất thấp." | G: maMa(+), clock(+) | L: aff(V,-), aff(B,-)
carry: face(B), face(V) · (name of B: only if her nết/birth give it, per Addendum 5; high-born proud B does not) · V's plaque stays visible
ma: "Thứ bậc do cha mẹ cho, đức hạnh là ta tự lập."

### Y04 tat-tai
tag: D (Hạ Đông Xuân tát An Lăng Dung, Chân Hoàn truyện)   tone: cruel   weight: l   bar: hard
roles: B=[Nóng nảy,Kiêu ngạo|Thù dai,Vì mình] V=[Kín đáo,Khiêm nhường|An phận,Thật thà] W=pool
birth: B=hi V=any   her: bystander|victim   place: góc khuất sau bình phong hoa
obj: none (vết đỏ trên má V là thật; V phải vào sảnh với vết đỏ nhạt dần)
setup: "Giọng {V} nhỏ như muỗi, {B} bực mình quát: «Nói to lên, ngươi định cho ai nghe?» Tiếng «bốp» vang lên sau bình phong. Má {V} đỏ bừng."
as_victim: "Giọng ngươi nhỏ như muỗi, {B} bực mình quát: «Nói to lên!» Một cái tát vang lên sau bình phong."
react: Nóng nảy → xắn tay áo, đứng chắn trước {V} (hoặc hừ lạnh đứng về {B} tùy ý thích) · Nhiều chuyện → chạy đi báo ma ma · Lạnh lùng → nhìn, không nói, nhớ rõ từng người · Thanh liêm → «Chốn này không được động tay.»
bênh: "Ta nắm cổ tay {B}: «Đủ rồi. Đây là cung cấm.»" => "{B} giật tay ra, hừ lạnh; {V} ôm má run run, nhìn ngươi cảm kích." | G: aff(V,+), nghia | L: grudge(B), maMa(-)
hùa: "Ta khẽ nói: «Tiếng nhỏ thế nào hầu bề trên được.»" => "{B} liếc ngươi tán thưởng; {V} nước mắt chảy dài, không dám nhìn ai." | G: aff(B,+), friend(B) | L: grudge(V), royals(-)
hoà giải: "Ta kéo {V} ra, đưa khăn lạnh: «Giữ yên, mọi người đang nhìn.»" => "{B} hậm hực quay đi; {V} áp khăn lên má, lí nhí cảm ơn." | G: aff(V,+), aff(B,+) | L: clock(-), noCredit
đứng ngoài: "Ta quay mặt đi, giả như không nghe thấy gì." => "Chuyện lắng xuống nhanh; trong lòng ngươi có thứ gì nặng xuống." | G: maMa(+), clock(+) | L: aff(V,-), aff(W,-)
carry: face(B), face(V) · V's red cheek visible at the line-up (staging only) · grudge/friend per stance · maMa mark: ma ma remembers who raised a hand
ma: "Chốn này không cho động tay; ai đánh, ai nhịn, ta đều nhớ."

### Y05 hoi-lo-thai-giam
tag: K (eunuch/ma ma bribery reported)   tone: tense   weight: m   bar: mid
roles: B=[Ham lợi,Tham vọng|Vì gia tộc,Xảo quyệt] W=[Thanh liêm,Thật thà] E=thái giám dẫn hàng I=[Nhiều chuyện]
birth: B=hi,Mãn   her: bystander (witness)   place: cạnh cổng hông
obj: túi gấm đựng thỏi bạc | B giấu trong tay áo | trao cho E | E bỏ vào tay áo; nếu bị phát hiện, E trả lại và bị ma ma ghi tên; nếu không, E xếp B đứng ngay đầu hàng (truy được)
setup: "Ngươi thấy {B} nhét một túi gấm nặng trĩu vào tay {E}, nói nhỏ: «Xin công công xếp ta đứng trước.» {E} liếc quanh, tay áo khép lại."
react: Thanh liêm → «Việc này trái lệ.» · Nhiều chuyện → mắt sáng lên, đã định đi mách · Ham lợi → bắt chước, tìm xem mình còn gì để dâng · Điềm tĩnh → chỉ khẽ lắc đầu
bênh: "Ta cất tiếng với {E}: «Công công, lệ không cho thế.»" => "{E} đỏ mặt trả lại túi; {B} nhìn ngươi bằng ánh mắt thù hận." | G: nghia, maMa(+) | L: grudge(B), aff(E,-)
hùa: "Ta mỉm cười: «Công công, ta cũng có chút lòng thành.»" => "{E} gật đầu hài lòng; {B} coi ngươi là cùng một giuộc." | G: aff(B,+), aff(E,+) | L: maMa(-), rumour(P)
hoà giải: "Ta nói riêng với {B}: «Bạc nên giữ cho buổi sau, ở đây nhiều mắt.»" => "{B} thu túi về, ngượng ngập; {E} thở nhẹ một hơi." | G: aff(B,+), aff(E,+) | L: clock(-), noCredit
đứng ngoài: "Ta coi như không thấy, tiếp tục chuyện trò." => "Ngươi vẫn giữ được nhịp chuyện với những tú nữ khác." | G: clock(+), face(W) | L: maMa(-), aff(W,-)
carry: face(B), face(E) · the purse exists and is traceable (E's sleeve or back in B's hands)
ma: "Bạc mua được chỗ đứng, không mua được cái nhìn của bề trên."

### Y06 giau-tuoi-giau-tat
tag: K (concealing age/defect was an offence; certified illness excused)   tone: sad   weight: l   bar: hard
roles: B=[Xảo quyệt,Vì gia tộc|Thực dụng] (người giấu) W=[Thanh liêm,Thật thà] H=any
birth: any   her: bystander   place: góc tường râm
obj: đôi giày đế dày độn thêm | B mang để che chân khập khiễng | W trông thấy khi giày xô lệch | B đem cất vào bọc vải sau khi qua cổng (truy được)
setup: "{B} bước lệch một nhịp, vội chỉnh lại gót giày; ngươi và {W} cùng thấy chân nàng khập khiễng nhẹ. Nàng nhìn ngươi, môi mím lại: «Xin đừng nói với ai.»"
react: Thanh liêm → «Giấu bề trên là tội.» · Ân cần → muốn che chở · Nhiều chuyện → đã sáng mắt, tính đem chuyện đi · Trọng nghĩa → «Nàng cũng đáng sống.»
bênh: "Ta giữ kín cho {B} và đỡ nàng bước đi vững." => "{B} rớm nước mắt, nắm tay ngươi; thái giám gác chỉ thấy hai tỷ muội dìu nhau." | G: aff(B,+), friend(B) | L: royals(-), maMa(-)
hùa: "Ta khẽ báo với ma ma, lời lẽ ôn hòa." => "Ma ma gật đầu ghi nhận; {B} ngoảnh lại nhìn ngươi, mắt đầy oán." | G: maMa(+), aff(M,+) | L: grudge(B), aff(W,-)
hoà giải: "Ta khuyên {B} tự nói với ma ma trước khi vào sảnh." => "{B} do dự rồi đi; ma ma tha cho một lần vì thành thật." | G: aff(B,+), maMa(+) | L: clock(-), noCredit
đứng ngoài: "Ta không đáp, chỉ nhìn đi chỗ khác." => "Ngươi không dây vào; {B} thất vọng, lặng lẽ cúi đầu." | G: clock(+), face(W) | L: aff(B,-), aff(W,-)
carry: face(B) · B's defect is real (a limp) and stays known to P only if P saw it; name per nết rule
ma: "Khuyết điểm có thể giấu một buổi, giấu không nổi một đời."
note: H/stances: «bênh» here = shield (G/L fixed above: it is not cost-free; the royals may later learn she shielded).

### Y07 tranh-cho-dung
tag: K (banner/father's rank order)   tone: petty   weight: s   bar: easy
roles: B=[Kiêu ngạo,Nóng nảy|Tham vọng] V=[Điềm tĩnh,Khiêm nhường] W=pool
birth: B=hi V=any   her: bystander|victim   place: giữa sân, trước mốc xếp hàng
obj: tấm biển tre đánh số thứ tự hàng | thái giám đặt trên đất | B đá lệch sang một bên | thái giám xếp lại; vị trí thật theo bảng tên (truy được)
setup: "{B} nghển cổ nhìn tấm biển xếp hàng, bực tức: «Cha ta là Tam phẩm, sao lại phải đứng sau {V}?» Nàng lấn từng bước một sang trước."
react: Điềm tĩnh → mỉm cười lùi nửa bước · Nhiều chuyện → «Có người sắp bị mắng rồi đây» · Ân cần → đứng giữa hai người · Kín đáo → giả như nhìn sân gạch
bênh: "Ta nói với {B}: «Chỗ xếp theo biển, ai đứng sai cũng bị ghi.»" => "{B} ngượng, lui về chỗ cũ; {V} gật nhẹ cảm tạ." | G: aff(V,+), nghia | L: grudge(B), clock(-)
hùa: "Ta xích sang cho {B} thêm chỗ, cười lấy lòng." => "{B} khoái chí vỗ tay áo ngươi; {V} liếc ngươi rồi thôi." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta đề nghị đổi chỗ cho {B} đứng bên góc, đẹp mắt hơn." => "{B} cân nhắc rồi chấp nhận; {V} nhẹ nhõm." | G: aff(B,+), aff(V,+) | L: clock(-), noCredit
đứng ngoài: "Ta giữ chỗ của mình, không dịch chân." => "Ngươi đứng yên; hai người kia cãi qua cãi lại, tai ngươi nghe hết." | G: clock(+), face(W) | L: aff(V,-), aff(B,-)
carry: face(B), face(V)
ma: "Đứng trước hay đứng sau, bề trên đều thấy cả."

### Y08 lam-xau-de-khoi-vao-cung
tag: K/D (folk anecdote: girls avoided the palace)   tone: sad   weight: m   bar: mid
roles: B=[Vì gia tộc,Thực dụng] (chị/em họ ép) V=[Vì mình,An phận,Ham vui] (cô gái không muốn vào cung) W=pool
birth: any   her: bystander   place: sau bồn đá, gần vòi nước
obj: nắm tro bếp trong khăn tay | V mang từ nhà | V bôi lên má | B giật khăn quăng xuống bồn nước; khăn trôi theo mương thoát nước (truy được: mắc ở lưới chắn cuối mương)
setup: "{V} lén bôi tro lên má, nhăn mặt cho xấu đi. {B} bắt gặp, xô tới: «Em điên rồi sao? Cả nhà chỉ trông vào em!» Hai chị em giằng co bên bồn nước."
react: Ham vui → cười khúc khích, cổ vũ cô bé · Trọng nghĩa → đứng về phía {V} · Thực dụng → «Xấu thật thì ma ma nhìn thấy ngay» · Nhiều chuyện → cười hóng chuyện
bênh: "Ta giúp {V} lau tro, nói nhỏ: «Muội đừng bôi nữa, xin khéo cách khác.»" => "{V} nắm tay ngươi nghẹn ngào; {B} quay đi khóc." | G: aff(V,+), friend(V) | L: grudge(B), maMa(-)
hùa: "Ta phụ {B} giữ {V} lại, lau mặt cho nàng." => "{V} gỡ tay ngươi ra, mắt đỏ nhìn ngươi; {B} gật đầu cảm ơn." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta nói với cả hai: «Đã đến đây, để bề trên chọn ai ở ai về.»" => "Hai chị em lặng đi; {V} lau mặt, {B} đứng thở dài." | G: aff(V,+), aff(B,+) | L: clock(-), noCredit
đứng ngoài: "Ta lặng lẽ tránh sang chỗ khác, không nhìn." => "Ngươi nghe thêm vài câu chuyện bên ngoài; sau lưng có tiếng nức nở." | G: clock(+), face(W) | L: aff(V,-), aff(B,-)
carry: face(V), face(B) · V may later be the girl sent home (real roster outcome, law 6b)
ma: "Muốn đi hay muốn ở là tâm người; mặt chỉ là cái cớ."

### Y09 khoe-cua-khoe-tho
tag: D (Diên Hi, Chân Hoàn)   tone: funny   weight: s   bar: easy
roles: B=[Kiêu ngạo,Nhiều chuyện|Ham vui,Vì mình] V=[Khiêm nhường,Kín đáo|An phận] W=[Thực tế,Điềm tĩnh]
birth: B=hi V=lo   her: bystander|victim   place: dưới mái hiên, gần chậu lan
obj: chiếc vòng vàng khảm lục bảo của B | B đeo cổ tay | B khoe, vô tình kẹp vào cánh tay áo V làm rách một đường chỉ | vòng vẫn nằm tay B; đường chỉ rách V khâu tạm bằng chiếc kim mượn (truy được)
setup: "{B} xoay xoay chiếc vòng vàng khảm ngọc, giọng ngân dài: «Của nhà ta đấy, nhà nào có được thế?» Đoạn quay sang {V}: «Muội đeo gì nhỉ?»"
as_victim: "{B} xoay xoay chiếc vòng vàng khảm ngọc, quay sang ngươi: «Muội đeo gì nhỉ?»"
react: Thực tế → «Vàng đeo không bằng cái đầu» · Kín đáo → che tay áo · Nhiều chuyện → đã bắt đầu bàn tán · Ham vui → cười rộ
bênh: "Ta đáp thay {V}: «Nét mặt tỷ ấy đã đủ làm trang sức.»" => "Cả nhóm bật cười; {B} đỏ mặt; {V} nhìn ngươi biết ơn." | G: aff(V,+), nghia | L: grudge(B), clock(-)
hùa: "Ta xuýt xoa ngắm vòng: «Quý quá, cho ta xem với.»" => "{B} đắc ý, đưa vòng ngươi ngắm; {V} thu tay vào ống áo." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta khen cả hai: «Vòng đẹp, khăn tay cũng khéo.»" => "{B} gật gù; {V} nhoẻn miệng, lúng túng." | G: aff(B,+), aff(V,+) | L: clock(-), noCredit
đứng ngoài: "Ta nhìn bồn lan, coi như không nghe." => "Ngươi tranh thủ trò chuyện với người đứng cạnh." | G: clock(+), face(W) | L: aff(V,-), aff(B,-)
carry: face(B), face(V)
ma: "Vàng ngọc trên người, chẳng bằng nét mặt khi gặp việc."

### Y10 noi-xau-sau-lung
tag: K (pre-selection scandal) + D (Như Ý)   tone: tense   weight: m   bar: mid
roles: I=[Nhiều chuyện,Thù dai|Vì mình,Xảo quyệt] V=[Kín đáo,Khiêm nhường|An phận,Thật thà] H=[Ân cần,Rộng lượng] W=pool
birth: V=any (the rumour is about father/mother)   her: bystander|victim   place: giữa đám tú nữ tụm năm tụm ba
obj: none (tin đồn; không có bằng chứng — law 6a: nàng bị vu được, biện minh có thể hỏng)
setup: "{I} ghé tai mấy tú nữ, giọng nhỏ mà rõ: «Cha {V} vừa bị cách chức đấy, mẹ nàng lại chỉ là thiếp.» Ánh mắt cả nhóm quay sang {V}."
as_victim: "{I} ghé tai mấy tú nữ, giọng nhỏ mà rõ, và mắt cả nhóm quay sang ngươi."
react: Ân cần → đến bên {V}, nắm tay · Nhiều chuyện → thêm mắm thêm muối · Thực tế → «Chưa chứng cớ thì ai nói gì cũng được» · Kiêu ngạo → «Ra là vậy», xa lánh
bênh: "Ta nói to: «Lời không bằng chứng, nói ra là vu.»" => "Tiếng xì xào ngừng lại; {I} đỏ mặt; {V} bật khóc." | G: aff(V,+), nghia | L: grudge(I), rumour(P)
hùa: "Ta chêm vào một câu cho vui: «Nhà ai chẳng có chuyện.»" => "{I} khoái trá; {V} cắn môi, mắt trào lệ." | G: aff(I,+), friend(I) | L: grudge(V), aff(W,-)
hoà giải: "Ta bảo {I}: «Chưa rõ thì đừng nói, lỡ bị ma ma nghe.»" => "{I} nhún vai bỏ đi; {V} lí nhí cảm ơn." | G: aff(V,+), aff(I,+) | L: clock(-), noCredit
đứng ngoài: "Ta giả như đang nhìn gạch lát sân." => "Ngươi không bị lôi vào chuyện; {V} thấy ngươi đứng yên, cúi đầu." | G: clock(+), maMa(+) | L: aff(V,-), aff(W,-)
carry: face(I), face(V) · the rumour is a real piece of gossip the roster may carry on (law 6b/6a)
ma: "Lời đồn gió thổi, ai tin ai nghe đều tự chịu."

### Y11 xo-vao-nhau-nga
tag: D (Diên Hi action scene)   tone: tense   weight: m   bar: easy
roles: B=[Nóng nảy|Ham vui,Thực tế] (có thể vô ý) V=[Thật thà,Khiêm nhường] H=[Rộng lượng,Ân cần] W=pool
birth: any   her: bystander|victim   place: bậc thềm đá, đông người chen lên
obj: vạt xiêm của V | V mặc | bị rách một đường lớn khi xô | cung nữ khâu tạm bằng kim chỉ ma ma đưa (truy được)
setup: "Cả đám tú nữ chen lên bậc thềm, {B} xô mạnh, {V} loạng choạng ngã, xiêm rách một đường dài. Không ai chắc {B} có cố ý hay không."
as_victim: "Cả đám chen lên bậc thềm, {B} xô mạnh, ngươi loạng choạng ngã, xiêm rách một đường dài."
react: Rộng lượng → vội đỡ {V} dậy · Nóng nảy → quát: «Ai xô đấy?» · Điềm tĩnh → «Đông người, khó tránh» · Kiêu ngạo → liếc xiêm rách, che miệng cười
bênh: "Ta đỡ {V} dậy, trách {B}: «Tỷ xô như thế còn chối được sao?»" => "{B} cãi: «Ta vô ý!» Hai bên căng thẳng, ma ma bước tới." | G: aff(V,+), nghia | L: grudge(B), maMa(-)
hùa: "Ta đỡ lời cho {B}: «Vô ý thôi, ai chẳng có lúc.»" => "{B} thở phào; {V} nhìn ngươi như bị bỏ rơi." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta xin ma ma cây kim chỉ, tự tay khâu tạm cho {V}." => "{V} mím môi cảm kích; {B} đứng ngượng ngập." | G: aff(V,+), aff(B,+) | L: clock(-), noCredit
đứng ngoài: "Ta lùi sang một bên cho khỏi bị xô." => "Ngươi không mắc vào; có người lườm ngươi vì đứng nhìn." | G: clock(+), face(W) | L: aff(V,-), aff(W,-)
carry: face(B), face(V)
ma: "Vô ý cũng là lỗi, cố ý lại là tội."

### Y12 thu-cu-hai-ky
tag: K (banner rivalries) + D (Như Ý/Diên Hi family politics)   tone: tense   weight: l   bar: hard
roles: B=[Vì gia tộc,Thù dai|Kiêu ngạo] (hai bên đều là B) V=[Vì gia tộc,Thù dai|Kiêu ngạo] (kỳ đối địch) H=[Điềm tĩnh,Thanh liêm] W=pool by banner
birth: B=Mãn,hi V=Hán,hi   her: bystander (side by P's banner)   place: giữa sân, hai hàng đối diện
obj: tấm thẻ gỗ của {V} | B' đeo | B giật xuống, ném xuống gạch | E nhặt lại, đưa trả B' (truy được)
setup: "{B} nhìn thẻ gỗ của {V}, nhếch môi: «Hán quân kỳ cũng đòi sánh với Mãn kỳ nhà ta?» {V} đáp lạnh: «Nhà ngươi có khi nào quên ơn giúp đỡ của nhà ta?» Hai hàng xôn xao."
react: Vì gia tộc → đứng về phía banner mình, tuyệt đối · Điềm tĩnh → lên tiếng xoa dịu · Thanh liêm → «Bề trên đang đợi.» · Nhiều chuyện → mắt sáng như vừa được nghe tuồng
bênh: "Ta bước ra giữa hai hàng: «Chuyện hai kỳ để cha anh lo, đây là nơi tuyển tú.»" => "Phía ngươi nhướn mày, phía kia lườm; ma ma sầm mặt." | G: aff(V,+), nghia | L: grudge(B), maMa(-)
hùa: "Ta phụ họa với kỳ mình: «Chuyện cũ nhà họ, ai quên được.»" => "Phía ngươi đồng thanh; phía kia căm giận." | G: aff(B,+), friend(B) | L: grudge(V), royals(-)
hoà giải: "Ta thưa với cả hai: «Hai nhà đều là bề tôi một chủ, đừng để người ngoài cười.»" => "Cả hai hừ nhẹ rồi lui; những người đứng quanh gật gù." | G: aff(B,+), aff(V,+) | L: clock(-), noCredit
đứng ngoài: "Ta lùi hẳn ra ngoài vòng, không bên nào." => "Ngươi không bị gọi tên; song có kẻ nhớ rằng ngươi đứng ngoài." | G: clock(+), face(W) | L: aff(B,-), aff(V,-)
carry: face(B), face(V) · P's banner decides the side (a banner thiện cảm shift applies to the side's W)
ma: "Thù nhà không nên mang vào chỗ này."

### Y13 lac-mot-chiec-giay
tag: D   tone: funny   weight: s   bar: easy
roles: B=[Ham vui,Nhiều chuyện|Kiêu ngạo] V=[Khiêm nhường,Thật thà] H=[Ân cần,Rộng lượng]
birth: any   her: bystander|victim   place: cạnh bờ ao sen
obj: chiếc giày thêu của V | V đi | B giấu sau lưng cột hành lang; hoặc ném xuống bờ ao | cung nữ vớt lên, giặt phơi, trả lại V (truy được; V đi một chân tất trắng)
setup: "{V} đang xỏ giày thì chiếc thêu hoa biến mất. Nàng nhìn quanh hốt hoảng. Xa xa, {B} che miệng cười, tay giấu sau lưng."
as_victim: "Ngươi đang xỏ giày thì chiếc thêu hoa biến mất. {B} che miệng cười, tay giấu sau lưng."
react: Ham vui → cười phá lên · Ân cần → cúi tìm giúp · Nhiều chuyện → «Cô ấy sắp bị bắt lỗi giày rồi» · Kiêu ngạo → quay mặt khỏi trò dớ dẩn
bênh: "Ta bắt {B}: «Đưa giày đây, giờ còn trò đùa sao?»" => "{B} bĩu môi trả giày; {V} xỏ vội, mắt rơm rớm." | G: aff(V,+), nghia | L: grudge(B), clock(-)
hùa: "Ta cười theo: «Chiếc giày chạy đi đâu rồi nhỉ?»" => "{B} khoái chí; {V} nhìn ngươi, mắt tối lại." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta nháy {B} bằng một nụ cười: «Đùa đủ rồi, trả đi kẻo muộn.»" => "{B} cười xòa trả giày; {V} thở phào." | G: aff(B,+), aff(V,+) | L: clock(-), noCredit
đứng ngoài: "Ta mải nhìn hoa sen." => "Ngươi nghe được tiếng cười bên ao; {V} lặng lẽ cúi tìm một mình." | G: clock(+), face(W) | L: aff(V,-), aff(B,-)
carry: face(B), face(V)
ma: "Chuyện cười không nên đặt trên nỗi mất mặt của người khác."

### Y14 phan-chim-roi
tag: D   tone: funny   weight: s   bar: easy
roles: V=[Điềm tĩnh,Khiêm nhường,Thực tế] W=pool
birth: any   her: bystander|victim   place: dưới tán cây hòe
obj: tà xiêm của V | V mặc | bị vấy bẩn do chim | cung nữ đưa nước và khăn, V lau sạch phần lớn (truy được: khăn đem giặt ở Tân Giả khố)
setup: "Một chú chim lượn ngang qua, để lại dấu ngay trên vai {V}. Cả đám nín cười. {V} cứng đờ, hai má đỏ ửng."
as_victim: "Một chú chim lượn ngang qua, để lại dấu ngay trên vai ngươi. Cả đám nín cười."
react: Ham vui → cười không giữ được · Ân cần → rút khăn lau giúp · Nhiều chuyện → «Điềm lành hay điềm gở?» · Điềm tĩnh → «Chim cũng biết chọn người»
bênh: "Ta nói to: «Chim biết chọn người phúc, có gì đáng cười?»" => "Cả nhóm ngớ ra rồi gật gù; {V} bật cười biết ơn." | G: aff(V,+), nghia | L: aff(W,-), clock(-)
hùa: "Ta cười cùng cả nhóm: «Xui thật đấy.»" => "Không khí rộn rã; {V} gượng cười, ánh mắt chùng xuống." | G: aff(W,+), friend(W) | L: grudge(V), maMa(-)
hoà giải: "Ta rút khăn lau giúp {V}, buông lời đùa nhẹ." => "{V} cười, nhẹ nhõm; cả nhóm cười theo." | G: aff(V,+), aff(W,+) | L: clock(-), noCredit
đứng ngoài: "Ta giữ nét mặt bình thản." => "Ngươi không tham gia; có kẻ cho ngươi lạnh nhạt." | G: clock(+), maMa(+) | L: aff(V,-), aff(W,-)
carry: face(V)
ma: "Điềm lành hay điềm gở, đều do lòng người tự gán."

### Y15 bung-reo
tag: D   tone: funny   weight: s   bar: easy
roles: V=[Thật thà,Khiêm nhường|Ham vui] B=[Kiêu ngạo,Nhiều chuyện] H=[Ân cần,Rộng lượng]
birth: any   her: bystander|victim   place: hàng chờ, dưới hiên
obj: gói bánh ngọt mang từ nhà | H giấu trong ống tay áo | H lén chia cho V một miếng | vụn bánh rơi dưới bậc, bị kiến bò (truy được, thái giám quét đi)
setup: "Bụng {V} réo lên một tiếng dài giữa lúc cả sân yên lặng. {B} bật cười thành tiếng. {V} gục mặt, tai đỏ đến tận gáy."
as_victim: "Bụng ngươi réo lên một tiếng dài giữa lúc cả sân yên lặng. {B} bật cười thành tiếng."
react: Ân cần → lén dúi bánh · Ham vui → suýt cười, giữ lại · Nhiều chuyện → «Lát nữa vào sảnh réo nữa thì chết» · Kiêu ngạo → quay đi, tỏ vẻ khinh
bênh: "Ta nhìn {B}: «Ai chẳng có lúc đói, cười thế không phải phép.»" => "{B} ngượng nín cười; {V} cúi đầu cảm kích." | G: aff(V,+), nghia | L: grudge(B), clock(-)
hùa: "Ta khúc khích cười: «Chắc nàng nhớ bữa sáng lắm.»" => "{B} cười ngặt nghẽo; {V} đỏ mặt, cắn môi." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta dúi một miếng bánh cho {V}, giả như đang nhờ giữ hộ." => "{V} nuốt vội, mắt cười biết ơn." | G: aff(V,+), friend(V) | L: clock(-), noCredit
đứng ngoài: "Ta giả như không nghe." => "Ngươi tiếp tục chuyện trò; {V} khép nép lùi ra." | G: clock(+), face(W) | L: aff(V,-), aff(B,-)
carry: face(V)
ma: "Bụng đói chẳng đáng cười, đáng cười là người biết đói mà không biết thương."

### Y16 hop-banh-giau
tag: K/D (food was not allowed in the yard)   tone: petty   weight: m   bar: mid
roles: B=[Nhiều chuyện,Thực dụng|Vì mình,Ham lợi] V=[Thật thà,Khiêm nhường|An phận,Ham vui] W=pool
birth: B=any V=lo   her: bystander|victim   place: góc hành lang khuất ma ma
obj: hộp bánh hạt sen mẹ V gói cho | V giấu trong túi tay áo | B nhìn thấy, đòi chia nếu không sẽ mách | nếu bị mách, ma ma thu hộp, giữ ở phòng thẳng nghiệp, trả cho gia nhân tại cổng (truy được)
setup: "{V} lén bẻ miếng bánh hạt sen mẹ gói, thì {B} đã nhìn thấy. Nàng hạ giọng: «Chia cho ta một nửa, nếu không ta mách ma ma.»"
as_victim: "Ngươi lén bẻ miếng bánh mẹ gói, thì {B} đã nhìn thấy: «Chia cho ta một nửa, nếu không ta mách ma ma.»"
react: Thực dụng → «Chia cho nàng cho xong chuyện» · Nhiều chuyện → rình ma ma đi qua · Thanh liêm → «Lệ cấm ăn trong sân» · Ân cần → đưa tay che hộp
bênh: "Ta nói với {B}: «Muốn mách thì mách, nhưng ta cũng thấy tỷ đòi chia chác.»" => "{B} nghẹn lời; {V} lúng túng cất bánh." | G: aff(V,+), nghia | L: grudge(B), maMa(-)
hùa: "Ta bảo {V}: «Chia cho nàng đi, kẻo mất cả hộp.»" => "{V} miễn cưỡng chia; {B} cười đắc ý." | G: aff(B,+), friend(B) | L: grudge(V), aff(W,-)
hoà giải: "Ta đề nghị: «Cất bánh đi, hết buổi chia nhau.»" => "Hai bên đành gật đầu; {V} nhẹ nhõm." | G: aff(V,+), aff(B,+) | L: clock(-), noCredit
đứng ngoài: "Ta lặng thinh nhìn ra sân." => "Ngươi tránh được rắc rối; {V} nhìn ngươi như muốn nhờ cậy." | G: clock(+), maMa(+) | L: aff(V,-), aff(B,-)
carry: face(V), face(B)
ma: "Miếng bánh có thể chia, tấm lòng thì không nên đem ra mặc cả."

