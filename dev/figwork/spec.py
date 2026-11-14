import json, sys
STYLE = ("Whole figure in frame from top of head to the feet, with clear empty margin above the head and below the feet, centred, nothing cropped. "
 "Plain light parchment background, nothing else, no scenery, no floor. Soft even light. "
 "Refined Chinese court illustration in gufeng (co phong) watercolour style, soft ink lines, delicate washes, warm palace palette. "
 "No text, no lettering, no signature, no border.")
FACE_F = ("fair porcelain skin, slim and elegant, serene gentle neutral expression, soft calm eyes, lips closed or the faintest smile, "
 "face clearly visible and not bowed")
TIERS = {
 1:"very plain simple silk robe with no embroidery and a plain narrow sash, hair in a simple low bun with a single plain wooden hairpin, no other jewellery",
 2:"plain soft silk robe with a narrow plain border, neat bun with two simple silver hairpins",
 3:"patterned silk robe with small woven floral motifs, layered chignon with fresh flower hairpins and small silk flowers",
 4:"fine silk robe with delicate embroidered flowers on collar and sleeves, elegant chignon with a few small gold hairpins and a small gold comb",
 5:"rich brocade robe woven with gold-thread patterns and wide embroidered sleeves, high chignon with an ornate gold hairpiece and dangling gold tassels",
 6:"luxurious heavy brocade robe densely embroidered in gold with a pearl-trimmed collar and an outer cape, tall chignon crowned by a large gold floral headdress with pearl strands and jewels",
 7:"near-imperial apricot-yellow brocade robe embroidered with small phoenix motifs, gold collar plate and pearl strings, grand chignon with a gold headdress bearing small phoenixes and ruby and pearl drops",
 8:"empress's ceremonial robe in bright imperial yellow and crimson embroidered with large golden phoenixes and clouds, layered gold collar, jewelled phoenix crown with kingfisher-blue inlay and dangling pearl strands",
}
TIERNAME = {1:"Dap ung",2:"Thuong tai",3:"Quy nhan",4:"Tan",5:"Phi",6:"Quy phi",7:"Hoang quy phi",8:"Hoang hau"}
TCOL = {"kieungao":"deep crimson and peacock blue","numi":"soft pastel pink and pale blue","hienlanh":"warm peach and cream","dangi":"rose and plum","thamvong":"bold red with gold accents","thanhnha":"cool celadon and ink blue"}
TRAITS = {
 "kieungao":"standing tall with chin slightly raised, holding an ornate round silk fan lowered at her side",
 "numi":"hands folded demurely at her waist, gaze slightly lowered yet face fully visible",
 "hienlanh":"gentle relaxed stance, holding a small embroidery hoop in both hands",
 "dangi":"body half-turned in a graceful turn looking toward the viewer, a folding fan held close to her chest below the chin",
 "thamvong":"standing upright and composed, holding a carved jade token in one hand",
 "thanhnha":"neutral elegant stance, holding a thread-bound book",
}
AGES = {
 "a18":"a young woman about 22, youthful yet clearly a grown adult with refined mature features and adult proportions, not childlike",
 "a26":"a woman about 30, mature and poised",
 "a36":"a dignified woman about 40 with a few faint fine lines at the eyes, black hair with no grey",
}
CFACES = ["oval face, almond eyes","soft round face, gentle doe eyes","heart-shaped face, long lashes","slender face, phoenix eyes",
 "oval face, clear bright eyes","delicate face, willow-leaf brows","soft face, gently curved brows","refined face, large calm eyes"]
LCOL = {"look1":"soft lavender","look2":"rose pink","look3":"pale celadon green","look4":"warm peach"}
LOOKS = {
 "look1":"elegant oval face with defined cheekbones, almond eyes of natural size, straight dark brows, small straight nose, a tiny beauty mark under her left eye, long black hair",
 "look2":"heart-shaped face, round gentle eyes, softly arched brows, full rosy lips, a soft side-swept fringe on the right",
 "look3":"slender long face, slightly upturned phoenix eyes, high cheekbones, fine thin brows, hair parted in the centre",
 "look4":"graceful softly rounded oval face with a defined chin, clear bright eyes of natural size, gentle straight brows, a light wispy fringe across the forehead, a small red mark (huadian) between her brows",
}
J = {}
def add(name, prompt, **tags):
    J[name] = dict(prompt=prompt + " " + STYLE, **tags)
# E emperor
EMP_AGE = {"a18":"a young man about 21, clean-shaven","a26":"a mature man about 30 with a faint, neatly trimmed thin moustache, a more mature face than a youth","a36":"a man about 38 with a neatly trimmed moustache and a short refined beard along the chin","a51":"a distinguished mature man about 52, a neatly trimmed short full beard and moustache, faint lines at the eyes, a few elegant silver strands at the temples, still very handsome and refined"}
EMP_LOOK = ("the most handsome man in the palace, a striking romantic-lead face: sharp refined jawline, straight noble nose, clear bright eyes with a warm gentle gaze toward the viewer, "
 "flawless fair porcelain skin, well-groomed glossy black hair, tall with broad but elegant shoulders, serene composed expression, lips closed, no harshness")
for a,d in EMP_AGE.items():
    add(f"fig-emperor-{a}-1", f"Full-body standing figure of a Chinese emperor, {d}, {EMP_LOOK}, wearing a formal bright imperial yellow dragon robe finely embroidered with golden dragons, clouds and sea waves, jade and gold belt, hair under a small ornate gold crown, hands relaxed at his sides, three-quarter view.", role="emperor", ageBand=a, variant=1)
    add(f"fig-emperor-{a}-2", f"Full-body standing figure of a Chinese emperor, {d}, {EMP_LOOK}, wearing an informal golden-yellow silk robe with finely embroidered round dragon medallions and a dark red inner collar, hair in a topknot held by an ornate gold crown and pin, one hand holding a closed folding fan, frontal view.", role="emperor", ageBand=a, variant=2)
TH = ["about 50","about 58","about 65 with a few fine lines and a little grey at the temples"]
THC = ["deep golden-brown brocade robe embroidered with phoenixes, ornate gold and jade headdress","dark plum brocade robe with gold phoenix roundels, a stately gold headdress with pearls","dark teal brocade robe with gold phoenix embroidery, a dignified gold and pearl headdress, holding prayer beads"]
for i in range(3):
    add(f"fig-thaihau-{i+1}", f"Full-body standing figure of a dignified, gentle Chinese empress dowager, a woman {TH[i]}, {FACE_F}, wearing a {THC[i]}, hands folded at her waist, three-quarter view.", role="thaihau", ageBand=["a50","a58","a65"][i], variant=i+1)
OFF = [("about 30, clean-shaven","crimson official robe with an embroidered rank badge on the chest","a30"),("about 40 with a short moustache","deep blue official robe with an embroidered rank badge","a40"),("about 50 with a neat beard","dark green official robe with an embroidered rank badge, holding an ivory court tablet","a50"),("about 62 with a long neat grey beard and fine lines","purple official robe with an embroidered crane badge, holding an ivory court tablet","a62")]
for i,(d,c,a) in enumerate(OFF):
    add(f"fig-official-{i+1}", f"Full-body standing figure of a Chinese imperial court official, a man {d}, {FACE_F}, wearing a {c}, black winged gauze hat, black boots, standing respectfully, three-quarter view.", role="official", ageBand=a, variant=i+1)
for a,d in [("a30","about 30, clean-shaven"),("a55","about 55 with a neat greying beard and fine lines")]:
    add(f"fig-physician-{a}", f"Full-body standing figure of a Chinese imperial physician (thai y), a man {d}, {FACE_F}, wearing a plain dark teal scholar's robe with a soft black cap, carrying a small wooden medicine box, three-quarter view.", role="physician", ageBand=a)
# B players
for lk,f in LOOKS.items():
    for t in range(1,9):
        for a,ad in AGES.items():
            add(f"fig-player-{lk}-t{t}-{a}", f"Full-body standing figure of the heroine, a beautiful Chinese palace lady, {ad}, {f}, {FACE_F}, wearing a {TIERS[t]}{(", in her signature colour "+LCOL[lk]) if t<=6 else ""}, graceful standing pose with hands lightly together at her waist, three-quarter view.", role="player", look=lk, tier=t, ageBand=a)
        pass
    for a,ad in AGES.items():
        add(f"fig-player-{lk}-lanhcung-{a}", f"Full-body standing figure of the heroine, a beautiful Chinese palace lady in the cold palace, {ad}, {f}, {FACE_F}, calm and composed, wearing a worn faded plain grey-blue cotton robe patched at the hem, hair in a simple low bun tied with a cloth strip, no ornaments, hands lightly together, three-quarter view.", role="player", look=lk, tier="lanhcung", ageBand=a)
# A consorts
i=0
for t in range(1,9):
    for tr,td in TRAITS.items():
        for a,ad in AGES.items():
            col = (f"colours muted and simple as her low rank allows ({TCOL[tr]} tones)" if t<=2 else f"colours {TCOL[tr]}" if t<=6 else f"robe colour set by her rank, with {TCOL[tr]} only as small accents")
            add(f"fig-consort-t{t}-{tr}-{a}", f"Full-body standing figure of a beautiful Chinese imperial consort, {ad}, {CFACES[i%len(CFACES)]}, {FACE_F}, wearing a {TIERS[t]}, {col}, {td}, three-quarter view.", role="consort", tier=t, trait=tr, ageBand=a)
            i+=1
# C maids
MT = {"trung":"steady upright stance holding a lacquer tray with a teapot and cups","tham":"neutral standing pose, hands relaxed at her sides","nhat":"slightly shy posture, shoulders softly drawn in, hands clasped before her","lanh":"alert attentive posture, head up, eyes attentive","chuyen":"neutral standing pose, hands tucked into her sleeves"}
MC = {"trung":"light green","tham":"peach","nhat":"pale pink","lanh":"pale blue","chuyen":"lilac"}
MA = {"a18":"a young woman about 20, clearly adult","a26":"a woman about 30"}
for tr,td in MT.items():
    for a,ad in MA.items():
        add(f"fig-maid-{tr}-{a}", f"Full-body standing figure of a Chinese palace maid (cung nu), {ad}, {FACE_F}, wearing a simple {MC[tr]} palace maid's robe and skirt with a plain sash, hair in a neat double bun with a ribbon, {td}, three-quarter view.", role="maid", trait=tr, ageBand=a)
MM = [("about 45","dark brown","a45"),("about 50","deep olive green","a50"),("about 55 with a little grey at the temples","indigo blue","a55"),("about 60 with greying hair and fine lines","muted plum","a60")]
for i,(d,c,a) in enumerate(MM):
    add(f"fig-mama-{i+1}", f"Full-body standing figure of a senior Chinese palace matron (mama), a gentle dignified woman {d}, {FACE_F}, wearing a plain {c} long robe with a simple dark sash, hair in a neat bun with one plain pin, hands folded at her waist, three-quarter view.", role="mama", ageBand=a, variant=i+1)
# D eunuchs
ET = {"trung":"respectful steady stance, holding a horsetail whisk in the crook of his arm","tham":"neutral standing pose, hands relaxed at his sides","nhat":"slightly reserved posture, hands clasped before him","lanh":"alert attentive posture, head up","chuyen":"neutral standing pose, hands tucked into his sleeves"}
EC = {"trung":"dark blue","tham":"dark green","nhat":"slate grey-blue","lanh":"deep teal","chuyen":"brown"}
EA = {"a18":"a young man about 20","a26":"a man about 30","a41":"a man about 42 with faint lines","a56":"a man about 56 with fine lines"}
for tr,td in ET.items():
    for a,ad in EA.items():
        add(f"fig-eunuch-{tr}-{a}", f"Full-body standing figure of a dignified Chinese palace eunuch, {ad}, beardless, {FACE_F}, wearing a {EC[tr]} round-collar palace robe with a belt and a black gauze hat, black boots, {td}, three-quarter view. Dignified, not a caricature.", role="eunuch", trait=tr, ageBand=a)
# F romance men
RM = {
 "thive":["a palace guard (thi ve) about 25, wearing lacquered dark armour over a red robe, a sword at his hip","a palace guard captain about 30, wearing steel lamellar armour with a dark blue robe and a helmet held under his arm"],
 "thaiy":["a young imperial physician about 26, in a pale blue scholar's robe and soft black cap, holding a small medicine box","a young imperial physician about 30, in a light grey-green robe, holding a rolled herbal scroll"],
 "vuonggia":["a prince, the emperor's younger brother, about 25, in a white and silver brocade robe with a jade crown","a prince about 32 in a deep purple brocade robe embroidered with a four-clawed python, a gold crown"],
 "nhacsu":["a court musician about 26 in a soft white and pale blue robe, holding a bamboo flute","a court musician about 32 in an ink-blue robe, cradling a guqin"],
 "hoasu":["a court painter about 27 in a light beige scholar's robe, holding a brush and a rolled painting","a court painter about 34 in a dark grey-green robe, holding a hanging scroll"],
 "suthan":["a foreign envoy from a northern steppe kingdom, about 30, in a fur-trimmed deep red robe and a fur hat","a foreign envoy from a western kingdom, about 35, in a turquoise and gold embroidered caftan with a turban-like headwrap"],
}
for r,ls in RM.items():
    for i,d in enumerate(ls):
        add(f"fig-romance-{r}-{i+1}", f"Full-body standing figure of a handsome man, {d}, {FACE_F}, tall and slim, adult, standing calmly, three-quarter view.", role="romance", trait=r, variant=i+1)
if __name__=="__main__":
    json.dump(J, open("/tmp/claude-0/-home-user-phuong-lenh/1e222f2f-177f-54ad-8b97-a62a9b124c31/scratchpad/figwork/spec.json","w"), indent=1)
    from collections import Counter
    print(len(J), Counter(v['role'] for v in J.values()))
