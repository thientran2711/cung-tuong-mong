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
def hstyle(t,col):
    if t<=2: r=f"simply painted in {col}, understated"
    elif t<=4: r=f"finely painted in {col} with delicate detail"
    elif t<=6: r=f"painted in {col} finely outlined in thin gold, more intricate detail"
    else: r="precious materials: fine gold leaf and cinnabar red with one tiny seed pearl, the most intricate fine detail"
    return r+"; the SAME small size at every rank (richer only in material and detail, NEVER larger), never covering the forehead, never spreading onto the brows or cheeks"
NOMOLE="No moles, no beauty marks, no spots on the face (even if the identity reference shows one), smooth clear skin."
for k,v in list(F.items()):
    for a,b in REPL: v=v.replace(a,b)
    F[k]=v
json.dump(F,open("consorts_feat.json","w"),indent=0)
for k,j in J.items():
    p=j['prompt']
    for a,b in REPL: p=p.replace(a,b)
    p=re.sub(r' HUADIAN: [^.]*\.','',p); p=p.replace(' '+NOMOLE,'')
    m=re.match(r'N-(c\d\d)-t(\w+)$',k)
    if m and m.group(1) in HD:
        mot,col=HD[m.group(1)]; t=m.group(2)
        if t=='cold': hd=" HUADIAN: NO huadian forehead ornament in the cold palace, bare clean forehead."
        else: hd=f" HUADIAN: on her forehead between the brows a small, delicate, refined huadian ornament, elegant, not large: her signature motif {mot}, {hstyle(int(t),col)}; the SAME huadian on all four figures."
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
L=["# Hoa điền (huadian) — bảng kiểu cho phi tần c01–c32 (art7, luật sếp 11/14)","",
"Mỗi người một kiểu riêng, giữ suốt đời (mọi bậc, mọi tuổi). Bậc t1–t2: rất nhỏ, vẽ màu nhạt thanh nhã; t3–t4: nhỏ, nét kỹ hơn; t5–t6: viền vàng mảnh;",
"t7–t8: cùng hoạ tiết bằng vàng lá + son đỏ, điểm một hạt ngọc trai nhỏ, nét kỹ nhất. LUẬT: luôn NHỎ, sang, tinh tế; bậc cao sang hơn bằng chất liệu và nét, KHÔNG to hơn;",
"không bao giờ che trán, không lan xuống mày/má. Chỉ phi tần có hoa điền (không cung nữ, ma ma...). Lãnh cung (tcold): KHÔNG hoa điền.",
"Prompt mẫu: \"a small, delicate, refined huadian ornament, elegant, not large: her signature motif <hoạ tiết>, <màu/chất liệu theo bậc>; the SAME small size at every rank\".",
"Không nốt ruồi, không beauty mark trên mặt (mọi spec). Prompt: spec6.py (khối 'HUADIAN:'), chạy sau spec5.py.",
"Ghi chú: các lineup t1 cũ c03, c11, c19, c32 đã có chấm son đỏ giữa mày (giữ màu son đỏ cho bốn người này).","",
"| ID | Hoạ tiết | Màu bậc thấp |","|---|---|---|"]
for c in sorted(HD): L.append(f"| {c} | {HD[c][0]} | {HD[c][1]} |")
open("HUADIAN.md","w").write("\n".join(L)+"\n")
print("ok")
