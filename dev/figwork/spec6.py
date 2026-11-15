# spec6.py (art7, owner rules 11/14): (1) NO moles / beauty marks on any face; (2) huadian forehead ornament per consort (HUADIAN table,
# same motif for life, plain at low tiers, gold/cinnabar at high tiers, none in the cold palace). Idempotent. Run after spec5.py.
import json,re
J=json.load(open("jobs.json")); F=json.load(open("consorts_feat.json"))
REPL=[("a tiny beauty mark under her left eye","long soft lashes"),
 ("a small beauty mark above the right corner of her lips","a softly defined cupid's-bow upper lip"),
 ("a small mole on her right cheekbone","softly rounded cheekbones"),
 ("a small red huadian mark between her brows","gently arched brows"),
 ("face with a small beauty mark on the cheek","face with soft smooth cheeks"),
 ("a small mole on his cheek","smooth clear cheeks"),
 ("a small red mark (huadian) between her brows","gently arched brows")]
# cid: (motif, low-tier colour)
HD={"c01":("a five-petal plum blossom","soft rose pink"),"c02":("a single slim teardrop","pale coral"),
"c03":("a tiny five-dot plum blossom","cinnabar red"),"c04":("a small lotus bud","soft pink"),"c05":("a slim crescent moon","rose red"),
"c06":("a small flame-shaped mark","vermilion"),"c07":("a four-petal begonia","peach pink"),"c08":("a tiny peach blossom","soft pink"),
"c09":("two tiny stacked drops","rose red"),"c10":("a curling orchid leaf","soft coral"),"c11":("a three-dot trefoil","cinnabar red"),
"c12":("a tiny butterfly","rose pink"),"c13":("a small auspicious cloud scroll","coral red"),"c14":("a tiny chrysanthemum","soft orange-red"),
"c15":("a slim vertical willow leaf","rose red"),"c16":("a six-petal snowflake flower","pale pink"),"c17":("a tiny red-bean heart","rose red"),
"c18":("a small lozenge diamond","coral red"),"c19":("a small open lotus flower","cinnabar red"),"c20":("a tiny camellia","soft pink"),
"c21":("a three-pointed leaf","vermilion"),"c22":("a pair of bamboo leaves","soft coral"),"c23":("four tiny osmanthus dots in a cluster","rose red"),
"c24":("a small ginkgo leaf","coral red"),"c25":("a tiny swallow","rose pink"),"c26":("a crescent with a dot above it","rose red"),
"c27":("a small flaming pearl","vermilion"),"c28":("a single round pearl dot","soft pink"),"c29":("a tiny phoenix tail-feather","rose red"),
"c30":("a small wave crest","coral red"),"c31":("a tiny narcissus flower","soft coral"),"c32":("a small peony blossom","cinnabar red")}
# 8 ranks = 8 distinct huadian levels (owner 11/14: never merge levels). Same SMALL size at every rank (like c03 t1's cinnabar flower).
HL={1:"the simplest form: a single plain {col} dot or one simple painted stroke hinting at {mot}, flat paint, no detail",
2:"{mot} painted in {col} with a clear recognisable shape, flat paint, no outline, no gold",
3:"{mot} finely painted in {col} with added detail: a tiny contrasting centre (stamen) and fine petal veins or inner lines, still no gold",
4:"{mot} painted in {col} with every edge outlined in a thin line of shimmering gold, the first touch of gold",
5:"{mot} cut from thin gold leaf, layered with {col} paint inside the gold shape, gold and colour together",
6:"{mot} of paper-thin gold leaf pressed flat on the skin with {col} paint inside, and ONE TINY flat pearly dot at its centre (flush with the skin, not a raised bead); compact",
7:"Imperial Noble Consort level: {mot} of paper-thin gold leaf laid FLAT on the skin like make-up, filled with vivid glossy cinnabar-red enamel paint, intricate fine gold filigree tracery inside it and two tiny flat gold curls hugging it, ONE very tiny ruby-red glint at its centre; completely flat, NO raised gems, NO pearls, NO beads, NO metal setting, compact",
8:"Empress level, the most splendid of all: a slender stylised phoenix of paper-thin gold leaf laid flat on the skin, body and tail curving in a compact S-shape around a small vivid cinnabar-red {mot}, feathers inlaid with brilliant kingfisher blue, fine gold outlines; flat and delicate, no round frame, no ring of pearls, nothing dangling"}
# owner 11/14 (latest, art8): raised/jewelled styles must stay SMALL, flat painted gold-leaf styles (t7, t8) may be a touch larger; t8 = 85% of the aeb6c1b sample; t7 flat redo
# owner 11/14 (later): size grows a LITTLE per rank, ~+5% each: t1 = c03 t1 cinnabar flower size, t8 ~1.4x t1; never big
HS={1:"tiny, fingertip-sized (like a classic small red flower mark between the brows)",2:"tiny, fingertip-sized",
3:"small, fingertip-sized, a hair larger than the lowest ranks",4:"small, a touch larger than the lowest ranks",
5:"small, slightly larger than the lowest ranks",6:"small, slightly larger than the lowest ranks",
7:"compact, a little larger than the lower ranks (about one quarter larger than the smallest), slightly smaller than the Empress mark",
8:"the largest of all ranks yet still compact (about one fifth to one quarter larger than the smallest; a flat painted mark may be a touch larger than a jewelled one), sitting neatly between the brows"}
def hdesc(t,mot,col):
    return HL[t].format(mot=mot,col=col)+"; size: "+HS[t]+"; it grows only a little with rank, NEVER big, never covering more than a small part of the forehead, never touching or spreading onto the brows or cheeks"
NOMOLE="Her face has NO mole and NO beauty mark: any small dark dot on the identity reference face must NOT be drawn; flawless smooth clear skin on every figure."
for k,v in list(F.items()):
    for a,b in REPL: v=v.replace(a,b)
    F[k]=v
json.dump(F,open("consorts_feat.json","w"),indent=0)
for k,j in J.items():
    p=j['prompt']
    for a,b in REPL: p=p.replace(a,b)
    p=re.sub(r' HUADIAN: [^.]*\.','',p); p=p.replace(' '+NOMOLE,'').replace(' No moles, no beauty marks, no spots on the face (even if the identity reference shows one), smooth clear skin.','')
    m=re.match(r'N-(c\d\d)-t(\w+)$',k)
    if m and m.group(1) in HD:
        mot,col=HD[m.group(1)]; t=m.group(2)
        if t=='cold': hd=" HUADIAN: NO huadian forehead ornament in the cold palace, bare clean forehead."
        else: hd=f" HUADIAN: on her forehead between the brows a small, delicate, refined huadian ornament, elegant, not large: {hdesc(int(t),mot,col)}; the SAME huadian on all four figures."
        p=p.replace(" Eyes soft, warm",hd+" Eyes soft, warm",1) if " Eyes soft, warm" in p else p.replace(" No text",hd+" No text",1)
    if "Everyone beautiful at every age." in p: p=p.replace("Everyone beautiful at every age.","Everyone beautiful at every age. "+NOMOLE,1)
    else: p=p.replace(" No text"," "+NOMOLE+" No text",1)
    j['prompt']=p
for j in J.values():
    for kk in list(j):
        if kk.startswith('prompt') and kk!='prompt' and isinstance(j[kk],str):
            for a,b in REPL: j[kk]=j[kk].replace(a,b)
json.dump(J,open("jobs.json","w"),indent=0)
# HUADIAN.md
L=["# Hoa điền (huadian) — bảng kiểu cho phi tần c01–c32 (art7, luật sếp 11/14)","","Xem thêm dev/figwork/HUADIAN_C.md: kiểu của 52 cung nữ lên phi tần (thợ Part C), phải khác hết 32 kiểu dưới đây.","",
"Mỗi người một hoạ tiết riêng, giữ suốt đời (mọi bậc, mọi tuổi); bậc càng cao càng sang nhờ chất liệu, độ cầu kỳ, số chi tiết (8 nấc dưới đây).",
"LUẬT CỠ (sếp nới, 11/14): t1 = cỡ hoa son c03 t1; mỗi bậc to thêm khoảng 5%; t8 (phượng/mẫu đơn Hoàng hậu) to nhất ≈ 1.4 lần t1. Không bao giờ to đùng; nằm gọn giữa hai mày; bậc cao sang hơn chủ yếu nhờ chất liệu, độ cầu kỳ, số chi tiết;",
"không bao giờ che trán, không lan xuống mày/má. Chỉ phi tần có hoa điền (không cung nữ, ma ma...). Lãnh cung (tcold): KHÔNG hoa điền.",
"Prompt: spec6.py HL[t] (chất liệu, 8 câu) + HS[t] (cỡ, 8 câu).",
"LUẬT CỠ MỚI NHẤT (sếp, 11/14 art8): kiểu ĐÍNH NGỌC NỔI KHỐI thì phải NHỎ GỌN (sếp chê t7 cũ có hạt ngọc nổi là \"xấu, ghê, to quá\"); kiểu VẼ/DÁT PHẲNG trên da như t8 thì được to hơn một chút. t8 = 85% cỡ mẫu aeb6c1b (≈1.2 lần t1); t7 dát phẳng, nhỏ hơn t8 một chút. Không dùng hạt ngọc nổi ở bất kỳ bậc nào; ngọc trai t6 và hồng ngọc t7 chỉ là một điểm nhỏ xíu phẳng sát da.",
"Không nốt ruồi, không beauty mark trên mặt (mọi spec). Prompt: spec6.py (khối 'HUADIAN:'), chạy sau spec5.py.",
"Ghi chú: các lineup t1 cũ c03, c11, c19, c32 đã có chấm son đỏ giữa mày (giữ màu son đỏ cho bốn người này).","",
"Kích thước gốc (t1): cỡ hoa son giữa mày của c03 t1 (img/por-consort-c03-t1-a18.webp), rõ trên chân dung; các bậc trên to dần ~5%/bậc tới ≈1.4 lần ở t8; không lan sang chân mày, không phủ quá nửa trán. Áp dụng cho cả HUADIAN_C.md (thợ Part C).","",
"## 8 nấc theo bậc (mỗi bậc một nấc riêng, KHÔNG gộp; cỡ to dần nhẹ, t8 ≈ 1.2 lần t1)",
"- t1: một chấm hoặc nét son đơn gợi hình hoạ tiết, không chi tiết.",
"- t2: hoạ tiết vẽ son, hình rõ ràng, không viền, không vàng.",
"- t3: son nét kỹ, thêm nhụy (tâm khác màu) và gân/nét trong; chưa có vàng.",
"- t4: son viền nhũ vàng mảnh (lần đầu có vàng).",
"- t5: hoạ tiết cắt bằng vàng lá, lồng son bên trong.",
"- t6: vàng lá dát phẳng + son, gọn hơn; giữa có MỘT điểm ngọc trai NHỎ XÍU phẳng sát da (không phải hạt nổi).",
"- t7 (Hoàng quý phi): DÁT PHẲNG như t8: vàng lá mỏng + men son đỏ tươi, hoa (hoạ tiết riêng) có nét filigree vàng mảnh trên cánh, hai cuộn vàng nhỏ ôm hai bên, MỘT điểm hồng ngọc nhỏ xíu ở tâm; KHÔNG hạt ngọc nổi, không vòng trai; cỡ hơi nhỏ hơn t8.",
"- t8 (Hoàng hậu): phượng cách điệu MẢNH bằng vàng lá mỏng sát da, thân và đuôi uốn chữ S ôm hoa son nhỏ (hoạ tiết riêng), khảm thuý lam; không khung tròn, không vòng trai; cỡ ≈1.2 lần t1 (85% mẫu cũ). Mọi hoa điền là son VẼ trên da / vàng lá dát mỏng, không phải trâm cài hay huy hiệu.",
"Mẫu (sếp duyệt t1–t5; t6 thu gọn, t7 dát phẳng làm lại, t8 thu 85% — art8, chờ sếp xem): dev/figwork/sheets/huadian_c03_face_t1..t8.jpg (toàn mặt), huadian_c03_face_all.jpg, huadian_c03_t1..t8.jpg (cận). Tất cả là gpt-2-6 edit, không ghép bằng code.","",
"| ID | Hoạ tiết riêng (giữ suốt đời) | Màu son bậc thấp | Tranh t1 hiện có |","|---|---|---|---|"]
T1={"c03":"có: chấm son đỏ dạng hoa nhỏ","c11":"có: chấm son đỏ dạng hoa nhỏ","c19":"có: chấm son đỏ dạng hoa nhỏ","c32":"có: chấm son đỏ dạng hoa nhỏ"}
for c in sorted(HD):
    m,col=HD[c]
    L.append(f"| {c} | {m} | {col} | {T1.get(c,'chưa có (thêm khi sửa)')} |")
open("HUADIAN.md","w").write("\n".join(L)+"\n")
print("ok")
