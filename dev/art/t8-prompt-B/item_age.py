# item_age.py — FIGURE_GATE 3e + 3f (owner 19/11 ~00:45Z): ONE table, cell = (AGE x RANK/STATUS) -> 10 items;
# luxury rises with rank inside every age; every person holds a DIFFERENT item at each of her ages.
# Single source for build.py (pick_item) and for dev/art/item-rank-age.md (python3 item_age.py md > ...).
# Rules kept: one item, never a cup/bowl/teapot; t6/t7/t8 items reserved (ruyi t6+, gilded censer t7+, phoenix/imperial
# scroll/seal box t8 only); nhà nghèo = wood/bamboo/clay/hemp/plain cloth; khuê các = no gold/jade-gold/court censer;
# Nữ đế = dragons only, never phoenix; Thái hậu = devout dignity, below Hoàng hậu glitter.
TIERS=["ngheo","kc","t1","t2","t3","t4","t5","t6","t7","t8","thaihau","nude","nc","bd"]
TIER_NAME={"ngheo":"Nhà nghèo","kc":"Khuê các","t1":"t1 Đáp ứng","t2":"t2 Thường tại","t3":"t3 Quý nhân","t4":"t4 Tần","t5":"t5 Phi",
"t6":"t6 Quý phi","t7":"t7 Hoàng quý phi","t8":"t8 Hoàng hậu","thaihau":"Thái hậu","nude":"Nữ đế","nc":"Công chúa Nam Chiêu","bd":"Công chúa Bắc Địch"}
AGES=["a18","a26","a36","a51","a65"]
# ages each status is drawn at (thiếu nữ = before the palace -> young only; Thái hậu 36+)
TIER_AGES={t:AGES for t in TIERS}; TIER_AGES.update({"ngheo":["a18","a26"],"kc":["a18","a26"],"thaihau":["a36","a51","a65"]})
_K=lambda *v: dict(zip(TIERS,v))
# one row per KIND of item, one entry per tier (None = that kind does not exist at that tier)
KIND={
"roundfan":_K("plain bamboo-leaf fan","silk-covered round fan with a wooden handle","plain silk round fan with a bamboo handle","silk round fan with a lacquered handle and a small tassel","embroidered silk round fan with a silk tassel","round fan with a carved jade handle and a jade tassel","round fan with a gold-inlaid handle and a gem tassel","round fan with a carved jade-and-gold handle and pearls","imperial round fan with a gold filigree frame and gems","imperial phoenix-embroidered round fan with a gold-and-jade handle and pearl tassels","ivory-handled silk round fan with a quiet cloud pattern","gold dragon-framed round fan","batik-edged silk round fan with a silver handle","horsehair whisk-fan with a silver-mounted horn handle"),
"foldfan":_K(None,"painted paper folding fan","plain paper folding fan","painted paper folding fan with a silk tassel","painted silk folding fan with bone ribs","sandalwood folding fan with carved ribs","ivory folding fan with gold leaf","pearl-embroidered silk folding fan with jade ribs","kingfisher-feather folding fan with gold ribs","kingfisher-and-pearl phoenix folding fan with gold ribs","dark sandalwood folding fan with a calligraphy leaf","yellow-silk folding fan with gold dragon ribs","painted bamboo-ribbed folding fan","painted leather folding fan"),
"flower":_K("branch of plum blossoms picked from the roadside","sprig of peony or plum blossoms","sprig of fresh plum blossoms","small porcelain vase with a flower sprig","small celadon vase with a flower sprig","small white-jade vase with blossoms","cloisonné enamel vase with flowers","white-jade vase with gold mounts and flowers","gold-mounted jade vase with peonies",None,None,None,"branch of red camellia","branch of dried steppe flowers tied with red cord"),
"basket":_K("small woven bamboo basket with a few wild flowers","small woven flower basket lined with silk","small woven bamboo flower basket","small lacquered flower basket","small silver-wire flower basket","silver flower basket with jade beads","gilded silver flower basket",None,"gold flower basket set with gems",None,None,None,"silver-chased flower basket with camellias",None),
"lantern":_K("small paper lantern on a bamboo stick","small silk lantern on a bamboo stick","small silk lantern on a short bamboo stick","silk-covered lantern with a tassel","embroidered silk palace lantern","gauze palace lantern with a jade pendant","silver-gilt palace lantern with pearl tassels","pearl-tasselled silk lantern with a jade top","gold-filigree palace lantern with gem tassels","gold phoenix palace lantern with pearl tassels",None,"gold dragon palace lantern with yellow silk tassels","silver-framed paper lantern painted with camellias","felt-and-silver lantern with coral tassels"),
"flute":_K("plain bamboo flute","bamboo flute","small bamboo flute","bamboo flute with a silk tassel","purple-bamboo flute with a silver mouthpiece","jade-ended flute with a jade tassel","gold-banded bamboo flute with a gem tassel",None,None,None,None,None,"silver-banded bamboo flute","small ornamented silver whistle-flute on a cord"),
"sachet":_K("plain cloth bundle tied with a knot","small painted-silk sachet with a cord","simple embroidered cloth sachet","embroidered silk sachet with a tassel","brocade sachet with a jade bead","brocade sachet with a jade toggle and tassel","gold-thread brocade sachet with a pearl tassel",None,None,None,"embroidered silk prayer-bead pouch",None,"embroidered silk pouch with silver threads","embroidered silk bag with coral beads"),
"hoop":_K("wooden spindle with a little spun thread","small embroidery hoop with a half-finished silk flower","small embroidery hoop with silk","embroidery hoop with a fine silk scene","sandalwood embroidery hoop with a silk landscape","jade-rimmed embroidery hoop with a silk peony",None,None,None,None,None,None,None,None),
"tassel":_K("skein of hemp thread held in the hand",None,"plain glass-bead tassel held in the hand","jade-bead tassel ornament held in the hand","agate-bead tassel ornament held in the hand","jade disc pendant on a silk cord held in the hand","coral-and-pearl bead tassel ornament held in the hand","gold-mounted jade pendant on a silk cord","gold-and-coral bead string held as a hand ornament",None,None,"gold-mounted jade dragon-ring pendant on a yellow cord","silver-wire butterfly ornament held on a silk cord","turquoise-and-coral bead string held in the hand"),
"book":_K(None,"thread-bound book","thread-bound book","poetry book with a silk cover","silver-mounted thread-bound book","silver-mounted book box","gold-mounted embroidered silk book",None,None,"imperial book bound in gold-thread silk","thread-bound sutra book with a gold-brocade cover","imperial book bound in yellow silk with gold dragon clasps","silver-mounted thread-bound book","small felt-bound book"),
"scroll":_K(None,"rolled calligraphy sheet tied with silk cord","rolled poem sheet tied with a silk cord","rolled poem scroll with plain wooden rollers","painted scroll with wooden rollers","scroll with jade rollers","painted scroll with gold fittings","painted silk scroll with white-jade rollers","calligraphy scroll with gold-filigree rollers","gold-mounted imperial scroll","scroll of calligraphy on yellow silk","imperial edict scroll on yellow silk with gold rollers","painted silk scroll with silver rollers","painted leather scroll on a carved bone rod"),
"mirror":_K("small wooden comb in a plain cloth","small bronze hand mirror in a cloth case","small bronze hand mirror","bronze hand mirror with a silk tassel","silver hand mirror","silver-and-enamel hand mirror","gold-and-jade hand mirror","gold-and-pearl hand mirror","gold hand mirror set with gems","phoenix-headed gold hand mirror with pearls","hand mirror in a bronze-and-jade frame","gold dragon-handled hand mirror","carved silver hand mirror","carved bone hand mirror with a turquoise rim"),
"smallbox":_K("small clay pot of orchid sprout","small wooden box with a carved lid","small lacquered comb box","small lacquered comb box with a silver clasp","small red-lacquered box","lacquered jewel box","gilded lacquer box","jewelled box","gold-filigree jewel casket set with gems","gold lidded jewel casket with a phoenix and pearls","carved sandalwood box","gold dragon jewel casket set with pearls","small carved sandalwood box with silver fittings","small fur-trimmed leather pouch"),
"incense":_K("bunch of fresh herbs tied with straw",None,"small plain wooden incense box","small lacquered wooden incense box","small red-lacquered incense box","small celadon incense box","gilded lacquer incense box","carved jade incense box","gold lotus-shaped incense box","gold phoenix-shaped incense ball","small gilded bronze hand censer","small gilded dragon censer","silver incense box with camellia chasing","silver incense box with turquoise inlay"),
"beads":_K("string of plain wooden prayer beads","string of rosewood prayer beads","string of sandalwood beads","string of sandalwood beads with a silk tassel","string of agate prayer beads","string of jade prayer beads","string of coral prayer beads with a gold tassel","string of white-jade prayer beads with a pearl tassel","string of gold-capped coral prayer beads","string of pearl-and-jade prayer beads with a gold tassel","string of sandalwood prayer beads","string of imperial jade prayer beads with a yellow tassel","string of silver-capped wooden beads","string of turquoise prayer beads"),
"warmer":_K("small plain brass hand warmer wrapped in cloth","small brass hand warmer with a cloth cover","small brass hand warmer","small brass hand warmer with an embroidered cover","small engraved bronze hand warmer","small cloisonné hand warmer","small gilded hand warmer","small gold-and-jade hand warmer","small gold-filigree hand warmer","small gold phoenix hand warmer","small gilded hand warmer in a brocade cover","small gold dragon hand warmer","small silver hand warmer","small silver hand warmer in a fur cover"),
"ruyi":_K(None,None,None,None,None,None,None,"white-jade ruyi (như ý)","gold-and-jade ruyi","gold ruyi set with gems","small white-jade ruyi","gold-and-jade ruyi with a dragon",None,"white-jade ruyi with a turquoise bead"),
"censer":_K(None,None,None,None,None,None,None,None,"gilded hand censer","gold phoenix seal box",None,"imperial jade seal (ngọc tỷ) on a yellow silk cord",None,None),
"staff":_K(None,None,None,None,None,None,None,None,None,None,"jade-headed dragon-head staff (long-đầu quải trượng)","jade tablet (hốt) edged in gold","small silver hand bell with a tassel",None),
"sceptre":_K(None,None,None,None,None,None,None,None,None,None,None,"gold dragon-headed sceptre",None,None),
}
# each AGE its own pool of kinds, suited to the age (young lively -> elder devout/calm); 10 used per cell, the rest fill gaps
AGE_KINDS={
"a18":["roundfan","flower","lantern","flute","sachet","hoop","basket","foldfan","tassel","mirror","book","smallbox","beads","sceptre","censer","scroll","ruyi","incense","warmer"],
"a26":["foldfan","book","roundfan","flower","smallbox","lantern","tassel","scroll","mirror","sachet","basket","flute","hoop","ruyi","censer","sceptre","scroll","ruyi","incense","warmer"],
"a36":["scroll","smallbox","flower","mirror","incense","book","tassel","foldfan","roundfan","ruyi","censer","sceptre","lantern","sachet","hoop","staff","lantern","sachet","hoop","basket","flute"],
"a51":["beads","book","incense","scroll","mirror","foldfan","tassel","smallbox","warmer","ruyi","censer","staff","sceptre","roundfan","flower","lantern","sachet","hoop","basket","flute"],
"a65":["beads","book","warmer","incense","ruyi","scroll","smallbox","tassel","foldfan","staff","censer","sceptre","mirror","roundfan","flower","lantern","sachet","hoop","basket","flute"],
}
def cell(age,tier):
    out=[]
    for k in AGE_KINDS[age]:
        v=KIND[k].get(tier)
        if v and v not in out: out.append(v)
        if len(out)==10: break
    return out
def kind_of(item):
    for k,row in KIND.items():
        if item in row.values(): return k
def pick_item(c,age,tier):
    """Person cNN at age: rotate by person index; never the same KIND at two of her ages (owner 3f)."""
    n=int(c[1:]) if c[1:].isdigit() else sum(map(ord,c))
    used=set()
    for a in AGES:
        if a not in TIER_AGES[tier]: continue
        L=cell(a,tier); i=(n-1)%len(L)
        for j in range(len(L)):
            it=L[(i+j)%len(L)]
            if kind_of(it) not in used: break
        used.add(kind_of(it))
        if a==age: return it
    raise KeyError((c,age,tier))
if __name__=="__main__":
    import sys
    if sys.argv[1:2]==["md"]:
        print("# Held items by AGE x RANK/STATUS (FIGURE_GATE 3e + 3f; generated by dev/art/t8-prompt-B/item_age.py md — edit the .py, never this file)\n")
        print("Rules: one item; never a cup/bowl/teapot; luxury rises with rank inside every age; t6/t7/t8 items reserved to that rank; Nữ đế dragons only; each person holds a DIFFERENT kind of item at each of her ages (builder pick_item).\n")
        for a in AGES:
            print(f"## {a}\n\n| Rank / status | 10 items |\n|---|---|")
            for t in TIERS:
                if a in TIER_AGES[t]: print(f"| {TIER_NAME[t]} | "+" · ".join(f"{i+1} {x}" for i,x in enumerate(cell(a,t)))+" |")
            print()
    elif sys.argv[1:2]==["check"]:
        bad=0
        for a in AGES:
            for t in TIERS:
                if a in TIER_AGES[t]:
                    n=len(cell(a,t))
                    if n<10: print("SHORT",a,t,n); bad+=1
        for t in TIERS:
            for c in range(1,33):
                ks=[kind_of(pick_item(f"c{c:02d}",a,t)) for a in TIER_AGES[t]]
                if len(set(ks))!=len(ks): print("REPEAT",t,c,ks); bad+=1
        print("bad",bad)
