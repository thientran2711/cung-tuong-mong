#!/usr/bin/env python3
"""D1-KP23RD: 52 KP23 redraw prompts = ONE shared STYLE block + CAMERA block + cast lines + scene.
Owner orders: KP23_OWNER_L2411_verbatim.md (faces allowed, one fixed style, emperor never seated back-turned)
+ 23/11 ~19:10Z (main character close, not far) + 24/11 ~00:20Z (GO). Style anchor = owner's PHI-COLD-* (Magnific ba4aecfe, L2397).
Run: python3 build_prompts.py  -> prompts.json + txt/<key>.txt"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import master_common
H = os.path.dirname(os.path.abspath(__file__))

STYLE = ("STYLE (identical for every picture of this set): from the reference picture take ONLY the drawing style, never its costume or colours; every costume is the one written in CAST. delicate hand-painted 2D guofeng anime illustration, soft painterly watercolour look, "
 "clean refined linework, soft airy washes, gentle diffuse light, realistic fabric behaviour and natural anatomy; the same drawing style, brushwork, "
 "palette treatment and figure proportions in every picture. Muted elegant palette: ivory, soft rose, celadon, mist blue, warm wood and restrained gold accents. "
 "Faces: refined beautiful East Asian faces in the same painterly anime style, clear fair porcelain skin, eyes open and clearly drawn, "
 "mouths closed with lips together even when smiling, talking or crying, absolutely no teeth visible. Every ear of every person is bare and plain, nothing hanging from the ears. No chrysanthemum flowers anywhere (mourning flowers are white lilies and white peonies). Natural graceful adult proportions about seven heads tall, never chibi, never a tiny head. "
 "Ancient Chinese-inspired imperial palace (not Japanese); hair ornaments are only hairpins, flowers and small crowns; rich, well-kept, elegant settings, never shabby or poor. "
 "NOT photorealistic, NOT 3D, NOT a photo.")
CAMERA = ("CAMERA (identical for every picture of this set): portrait 3:4 story illustration. The MAIN CHARACTER is CLOSE to the viewer in a medium shot "
 "(from the waist or thighs up, never a full-body long shot); she fills a large part of the frame and her FACE is clearly visible in front or three-quarter view, "
 "expressive, showing the feeling of the moment. Every other important person is also close and readable, face and gesture visible; nobody important is seen from behind; "
 "no tiny distant figures, no silhouettes, no shadows behind screens, no faces hidden by sleeves, fans or curtains. The setting stays a soft, slightly blurred background behind the people.")
# MASTER (B25) sentences verbatim, except M03 (full-body, plain background), M09 (legs/feet) and M12 (exactly one held item):
# those three contradict the owner's scene order 23/11 ~19:10Z (main character close, medium shot, a real scene with props).
MS = master_common.sentences(); MI = master_common.ids()
SKIP = {"M03", "M09", "M12"}
MASTER = " ".join(t for i, t in zip(MI, MS) if i not in SKIP)
EXTRA = "NOTHING on the forehead (no hoa điền, no dot, no mark, nothing). Bare earlobes, no earrings."
NEG = "NO text, NO letters, NO writing, NO caption, NO signature, NO watermark, NO border frame."

CAST = {
 "phi": "SHE (the main character) = a young adult imperial consort, beautiful, elegant up-do with gold hairpins and a few fresh flowers (each hair flower a bloom only, no leaves), flowing layered silk court robe in soft rose-pink and ivory with fine gold embroidery and a light ivory phi bạch silk scarf over her arms (her OWN costume written here; never the blue costume of the reference picture).",
 "emp": "THE EMPEROR = a handsome young-adult man in a warm royal-yellow dragon robe with wide sleeves (black only as a thin accent), a small gold crown on his topknot; if he sits on the throne he FACES THE VIEWER, never turned away.",
 "hh": "THE EMPRESS = a beautiful adult woman in a royal gold and deep red brocade robe with phoenix embroidery and a gold phoenix crown, dignified.",
 "th": "THE EMPRESS DOWAGER = a beautiful dignified older lady of about fifty, silver-streaked hair in a stately up-do, deep antique-gold royal robe, calm wise face.",
 "maid": "THE PALACE MAID = a young woman in a simple neat soft-green silk maid robe with a pale sash, hair in two neat buns with small ribbons.",
 "eun": "THE EUNUCH = a beardless man in a dark indigo-blue palace robe and small black cap.",
 "guard": "THE GUARDS = palace guards in light lamellar armour with helmets.",
 "doc": "THE IMPERIAL PHYSICIAN = a middle-aged man with a short neat beard in a muted teal official robe and black official hat.",
}
CAST.update({
 "mama": "THE HEAD MATRON (ma ma) = a stern middle-aged woman in a neat brown palace robe, hair in a tidy bun.",
 "prince": "THE PRINCE (vương gia) = a handsome adult man in a royal-yellow prince's robe with wide sleeves and a small gold crown on his topknot.",
 "child": "THE CHILD = her small child of about five, sweet round face, in a little embroidered silk robe.",
 "midwife": "THE MIDWIFE = a kind capable woman of about forty in a plain neat indigo robe, carrying a wooden medicine chest.",
 "tutor": "THE TUTOR = a middle-aged scholar in a plain blue-green scholar's robe and soft black cap.",
 "pri": "SHE (the main character) = a foreign princess from a southern kingdom, beautiful young adult, in an elegant silk robe of her homeland with silver ornaments in her hair.",
 "cook": "THE COOK = a stout imperial cook in a white apron over a brown robe.",
 "rider": "THE OFFICIAL = a dignified middle-aged military official in a dark travelling robe and wide-brimmed hat.",
 "plain": "SHE (the main character) = a young adult deposed consort in a plain undyed pale robe, hair simply pinned with one wooden hairpin, still beautiful.",
})
# key: (main, [cast], scene)
S = {
"bao-cho": ("phi",["phi"],"In a covered palace corridor, she leans close to another consort and whispers a secret, one hand pointing discreetly off to the side; both faces close and visible, hers serious and urgent, the other consort surprised and listening."),
"bat-gap-trao-anh-mat": ("maid",["maid","phi","guard"],"MAIN CHARACTER here = the palace maid, in the foreground close, peeking from behind a half-drawn gauze curtain with wide startled eyes; behind her, in the middle ground and still clearly visible, a consort and a young guard exchange a lingering glance. The maid's face is the centre of the picture."),
"bi-bat-mang-thu-lanh-cung": ("maid",["maid","guard"],"At the gate of the cold palace, a guard grabs a folded letter out of the palace maid's hand; she is close to the viewer, frightened, reaching after the letter; the guard's stern face beside her."),
"bi-bat-tra-khao": ("maid",["maid","eun"],"In a dim storeroom lit by one lantern, the palace maid sits with her wrists tied in front of her, close to the viewer, pale and frightened but holding firm; a eunuch beside her raises the lantern toward her face and questions her sternly. No blood, no injury."),
"bi-cam-tuc": ("phi",["phi"],"Confinement: she sits alone by a window inside her palace room, close to the viewer, lonely and pensive, hands folded in her lap; through the window behind her a shut palace gate and a guard standing watch are softly visible."),
"bi-phat-giac-dinh": ("maid",["maid"],"Close-up moment: the palace maid catches the wrist of another maid who is slipping a powder packet over a teacup, holding up the evidence; the maid's face is resolute and alert, the other woman's face shocked and guilty, both close."),
"cam-quan-vay-cung": ("phi",["phi","guard"],"Night: she stands at the inner doorway of her palace, close to the viewer, alarmed and holding her robe at her chest; behind her across the courtyard, imperial guards in iron armour with lanterns surround the gate, their faces readable in the lantern light."),
"cau-xin": ("phi",["phi","eun"],"At the gate of the cold palace, the deposed consort in a plain pale robe kneels close to the viewer, hands pressed together pleading, eyes full of hope and sorrow; a eunuch stands beside the gate looking down at her, hesitant."),
"cau-xin-quan-su": ("maid",["maid"],"The palace maid bows her head low and pleads, close to the viewer, anxious face lifted; in front of her stands a stern older head matron (ma ma) in a brown robe, holding a rattan cane, frowning."),
"giai-cau-do-den": ("phi",["phi"],"Lantern Festival night: she stands close to the viewer under a row of red and gold lanterns hanging with plain paper riddle slips (blank paper, no writing), one hand lifting a slip, smiling thoughtfully as she solves it; warm lantern glow on her face."),
"giao-viec": ("phi",["phi","maid"],"In her chamber, she hands a folded letter to her trusted palace maid and gives quiet instructions, her face earnest and calculating; the maid bows her head slightly, receiving the letter with both hands, attentive. Both close."),
"hh-ban-cho": ("hh",["hh","phi"],"In the Empress's hall, the Empress graciously hands a lacquered gift box to the consort, who bows her head to receive it with both hands; the Empress's face is gracious and composed, the consort's grateful; both close and facing the viewer three-quarter."),
"hh-gat-loi": ("hh",["hh","eun"],"The Empress, seated on her carved chair close to the viewer, waves one hand dismissively with a cool, displeased face; an official eunuch with lowered head backs away with his head lowered."),
"hh-nghe-giang": ("hh",["hh","emp"],"In the audience hall the Empress stands close to the viewer holding a memorial scroll, speaking earnestly to the Emperor; the Emperor, seated on the throne behind her and facing the viewer, listens with a serious face."),
"hh-thuong-hien-thuc": ("hh",["hh","phi"],"The Empress hands an embroidered silver pouch to the consort, who curtsies in a graceful vạn phúc greeting; the Empress smiles approvingly; both faces close and clear."),
"ke-len-cai-bi-bat": ("eun",["eun","guard"],"Night at a side gate: a guard seizes a young junior eunuch by the arm as he tries to sneak out carrying an empty wooden chest; the young eunuch is close to the viewer, terrified, the guard stern. No weapons drawn."),
"keu-oan": ("phi",["phi","eun"],"Before a palace hall, she kneels close to the viewer, head raised, crying out her innocence with a pained, determined face, one hand on her chest; beside her a eunuch is led forward holding the gift box in question."),
"khoc-ke-ht": ("phi",["phi","emp"],"In a warm chamber she leans against the Emperor's shoulder, close to the viewer, telling him her grievances, a sad wronged face with glistening eyes; the Emperor, seated beside her, looks down at her tenderly. Both faces clearly visible."),
"khoc-xin-tha": ("maid",["maid"],"The palace maid kneels close to the viewer with hands clasped together, begging for mercy, a frightened tearful face lifted upward toward someone just outside the frame."),
"nho-th-dung-ra": ("phi",["phi","th","hh"],"The Empress Dowager places a protective hand on the consort's shoulder, standing beside her, facing the Empress; the consort is close to the viewer, relieved and grateful; the Empress, across from them, looks displeased. All three faces visible."),
"quay-lung-bo-di": ("phi",["phi"],"She walks away from the gate of the cold palace toward the viewer, close, turning her face slightly back over her shoulder with a cold, decided expression; the shabby gate and a pleading figure remain soft in the background."),
"quoc-tang": ("phi",["phi"],"State mourning: the palace hung with white silk; she stands close to the viewer in white mourning robes with one small white silk flower in her hair (bloom only, no leaves), head slightly bowed, solemn and sorrowful; behind her other consorts in white stand before a memorial altar with candles."),
"quy-xin-tha": ("emp",["emp"],"In the throne hall the Emperor sits on the throne FACING THE VIEWER, stern and judging; in the foreground, close, a guilty official in court robes kneels with his forehead near the floor begging for pardon, his face visible in profile, fearful."),
"sai-di-do-la": ("phi",["phi","eun"],"She gives secret instructions to a young junior eunuch, pointing toward another palace, her face sharp and focused; the eunuch bows his head, listening. Both close."),
"so-hac-can-chinh": ("emp",["emp"],"In the court hall the Emperor sits on the throne FACING THE VIEWER, reading a memorial with a grave frown; in front of him, close in the foreground, a censor in official robes kneels and raises another memorial with both hands, face earnest."),
"tau-tuyen-nhieu": ("phi",["phi","emp"],"She smiles and speaks to the Emperor, close to the viewer, gesturing toward a row of young selection maidens in pink in the background; the Emperor, seated beside her facing the viewer, looks amused."),
"tha-toi-chet": ("emp",["emp"],"The Emperor, seated on the throne FACING THE VIEWER, waves his hand in a gesture of mercy; close in the foreground a pardoned prisoner in a plain robe kowtows, relieved, face visible in profile."),
"thai-hau-bang-ha": ("phi",["phi","emp"],"The Empress Dowager's death: a hall hung with white; the Emperor and the consort kneel side by side in white mourning robes before a memorial altar, close to the viewer, faces sorrowful and bowed slightly so both faces are still visible."),
"thai-y-phat-hien": ("doc",["doc","phi"],"The imperial physician holds up a silver hairpin that has turned black beside a bowl of food, pointing out the sign of poison, face grave; the consort beside him is close, shocked, a hand at her chest."),
"thanh-minh": ("maid",["maid"],"The palace maid kneels upright, back straight, close to the viewer, face determined, pointing firmly toward her accuser just outside the frame, defending her innocence."),
"theo-hau-le-te": ("phi",["phi","emp"],"Ceremonial sacrifice before the Imperial Ancestral Temple: the consort walks close behind the Emperor in a solemn procession; both are close to the viewer and turned three-quarter toward us, faces solemn; banners and incense smoke behind."),
"theo-len-nui": ("phi",["phi","emp"],"Autumn mountain outing: the Emperor and the consort climb stone steps among red maple leaves, close to the viewer, she lifts her skirt slightly and smiles as he offers his hand; both faces visible."),
"thu-mui-ten": ("phi",["phi","emp"],"At the hunting grounds she draws a bow and arrow, aiming at a target, close to the viewer, face focused and confident, in an elegant riding robe; the Emperor stands behind her shoulder watching with an impressed smile."),
"tim-ke-tung-tin": ("phi",["phi","maid"],"At night she holds a lantern and questions a row of palace maids standing in line, close to the viewer, face sharp and searching; the nearest maid looks nervous."),
"to-giac-khong-thanh": ("hh",["hh","phi"],"The Empress, seated close to the viewer, coolly pushes a piece of evidence aside on the table with a dismissive face; the accuser, a consort kneeling beside the table, bows her head in dismay."),
"to-giac-truoc": ("phi",["phi","th"],"The consort kneels and presents evidence on a tray before the Empress Dowager, close to the viewer, face earnest and resolute; the Empress Dowager, seated, examines it with a stern thoughtful face."),
"to-giac-truoc-ht": ("phi",["phi","emp"],"In the hall the consort kneels close to the viewer and raises a folded Chinese paper memorial of evidence (plain folded paper, no wax seal) with both hands toward the Emperor; the Emperor, seated on the throne FACING THE VIEWER, leans forward, attentive and grave."),
"to-khong-tin": ("phi",["phi","maid"],"The consort shakes her head with a reproachful, disbelieving face, close to the viewer; her palace maid kneels before her trying to report something, face anxious."),
"trung-doc": ("doc",["doc","phi","maid"],"In a bedchamber, the poisoned consort lies pale on the bed, eyes half closed but face visible; the imperial physician kneels close at the bedside taking her pulse with a grave face; a palace maid behind clutches her hands in panic. No blood."),
"trung-doc-thuoc-giai": ("maid",["maid","phi"],"The palace maid takes a small antidote bottle from an opened chest and supports her pale mistress, helping her drink; both close to the viewer, the maid's face anxious and determined, the consort weak but conscious."),
"truy-ngu-thien": ("phi",["phi"],"In the imperial kitchen among stoves and pots, the consort stands close to the viewer interrogating, face stern; an imperial cook in a white apron kneels before her confessing, face frightened."),
"tuyen-tu": ("th",["th","hh"],"Consort selection: the Empress Dowager and the Empress sit side by side close to the viewer, studying the candidates with judging faces; in the middle ground a row of young maidens in pink robes stand in the palace courtyard, faces visible."),
"van-dong-do-dau": ("phi",["phi"],"In the reception room of a noble mansion, the consort, close to the viewer, warmly presents a gift box to a richly dressed noble lady, both smiling politely, faces visible."),
"vang-lenh": ("maid",["maid","phi"],"The palace maid bows her head to receive an order, close to the viewer, earnest; her mistress beside her points and gives the command with a firm face."),
"vang-menh": ("phi",["phi","th"],"The consort bows her head obediently before the Empress Dowager, close to the viewer, face respectful and composed; the Empress Dowager, seated, gives her instructions."),
"vao-cung-phong": ("phi",["phi","hh"],"A newly entered consort in a fresh pink robe curtsies in a graceful vạn phúc greeting to receive her title, close to the viewer, face shy and happy; the Empress, seated, smiles graciously."),
"vien-co-thoai-thac": ("phi",["phi"],"The consort bows her head slightly while making an excuse, close to the viewer, one hand raised in a gentle gesture of difficulty, polite apologetic smile, eyes evasive."),
"viet-thu-hoi-han": ("phi",["phi"],"By a lattice window she writes a letter home with a brush, close to the viewer, face soft and longing; ink stone and paper on the desk, plum blossoms outside."),
"vu-oan-bi-lo": ("hh",["hh"],"The Empress holds up a cloth voodoo doll with a cold, severe face, close to the viewer; the guilty accuser kneels before her with head lowered, face pale."),
"xin-an-ve-tham": ("phi",["phi","hh"],"The consort kneels close to the viewer, hands joined, asking the Empress for permission to visit her family, face hopeful; the Empress, seated, considers kindly."),
"xin-ht-tra-xet": ("phi",["phi","emp","guard"],"In the hall the consort kneels close to the viewer, asking the Emperor to investigate, face determined; the Emperor, seated on the throne FACING THE VIEWER, listens gravely; guards stand on both sides."),
"xin-th-do-loi": ("phi",["phi","th"],"The consort kneels at the feet of the Empress Dowager, who holds her hand kindly; both close to the viewer, the consort's face tearful and pleading, the Empress Dowager's compassionate."),
}

S2 = {
"an-cu-duoc-lat": ("phi",["phi","eun"],"Before her family ancestral altar with incense smoke, a eunuch reads aloud a golden imperial edict scroll (blank, no writing visible); she kneels close to the viewer, face lifted, tears of relief and joy in her eyes as her old case is overturned."),
"ban-hon-con": ("phi",["phi","eun"],"A eunuch reads an imperial marriage edict (scroll, no visible writing); she stands close to the viewer beside her grown daughter of about eighteen in a pink robe, both bowing their heads respectfully, the mother clearly older (a graceful woman of about forty, visibly a generation older than her daughter), her face raised enough to show she is proud and moved."),
"bi-bat-buon-lau": ("maid",["maid","guard"],"At a palace gate a guard holds up a bundle of smuggled silk; the palace maid stands close to the viewer with head bowed, face pale and frightened, eyes darting up to the guard."),
"bi-day-xuong-ho": ("phi",["phi","eun","maid"],"At the edge of a lotus pond, a eunuch and palace maids pull her out of the water onto the stone bank; she is close to the viewer, soaked hair and robe clinging, coughing slightly, face shocked and pale; maids anxious beside her."),
"bi-giang": ("phi",["phi","eun"],"A eunuch reads a demotion edict; she stands close to the viewer, sadly removing a gold hairpin from her hair and laying it on a tray he holds, face composed but hurt."),
"bi-quan-su-bat-gap": ("maid",["maid","mama"],"Behind a stack of wooden washbasins, the palace maid sitting to rest jumps up startled, close to the viewer; the head matron stands over her, hands on hips, frowning."),
"bo-bac-chuoc": ("phi",["phi","eun","maid"],"At the gate of the palace punishment office, she hands a pouch of silver to a eunuch official, close to the viewer, face determined; beside her a released palace maid in rumpled clothes looks at her with grateful tears."),
"bo-mac": ("phi",["phi"],"She closes a lattice window with one hand, close to the viewer, turning her face away from what is outside with a cold, hurt expression."),
"cach-chuc-bien-ai": ("rider",["rider"],"A dismissed official in a wide-brimmed hat, close to the viewer, mounts his horse at the frontier pass gate, looking back toward the capital with a bitter, resigned face; dusty frontier wall behind."),
"cai-ba-do": ("midwife",["midwife","maid"],"The middle-aged midwife carrying her wooden chest steps through the gate of the pregnant consort's palace, close to the viewer, face calm and capable; a palace maid greets and guides her in."),
"cat-giu-con-tin": ("phi",["phi"],"At her dressing table she places a folded love letter into a small locked jewellery box, close to the viewer, face secretive and tender, glancing aside to check no one is watching."),
"chai-chuot-nhan-sac": ("phi",["phi","maid"],"Before a bronze mirror, the palace maid combs her mistress's long hair with a jade comb; the consort sits close to the viewer, face serene and beautiful, her reflection in the mirror; the maid smiles behind her, face visible."),
"chep-kinh": ("plain",["plain"],"In the cold palace by a small oil lamp, she copies sutras with a brush, close to the viewer, face calm and sorrowful; paper on the desk with blurred illegible strokes, no readable characters."),
"chi-huy-dap-lua": ("phi",["phi","eun"],"At night, she stands close to the viewer pointing and commanding, face urgent and brave; behind her eunuchs and maids carry water buckets toward a palace roof with orange fire glow."),
"chung-cu-bi-huy": ("eun",["eun"],"A eunuch stands close to the viewer watching a bundle of documents burn in a bronze brazier, firelight on his face, sly and satisfied."),
"gai-ngua-yen-tiec": ("phi",["phi"],"At a banquet she rises from her seat, close to the viewer, pulling her sleeve down over her wrist with an uncomfortable, embarrassed face; guests at the tables behind glance at her."),
"giau-trong-ruong": ("maid",["maid"],"The palace maid kneels at an open clothes chest, close to the viewer, secretly pushing a small wrapped bundle under the folded robes, glancing nervously back toward the door."),
"gui-bac-chua-benh": ("maid",["maid"],"The palace maid wraps silver pieces in a handkerchief to send home for her sick mother, close to the viewer, face worried and tender, eyes moist."),
"hau-benh-ca-thang": ("phi",["phi","th"],"She sits at the bedside of the ill Empress Dowager, close to the viewer, feeding her medicine with a porcelain spoon, face gentle and attentive; the Empress Dowager, propped on pillows, looks at her gratefully."),
"hop-muu-lo": ("hh",["hh","phi"],"The Empress, seated close to the viewer, looks down coldly at a tray of evidence; three consorts kneel before her in three-quarter view, faces frightened and pale."),
"ke-la-vao-phong": ("maid",["maid"],"Night: the palace maid hides behind a pillar, close to the viewer, hand over her chest, wide alarmed eyes, watching a man in a dark robe (face visible in the lantern light) sneak open the door of her mistress's room."),
"ke-toi": ("phi",["phi","th"],"She speaks to the Empress Dowager, close to the viewer, listing someone's wrongdoings with an earnest, indignant face; the Empress Dowager, seated, listens with a stern frown."),
"khong-chiu-dua-bac": ("phi",["phi"],"She tears a threatening letter in two, close to the viewer, face defiant and angry, refusing to pay."),
"kiem-tra-ruong": ("maid",["maid","phi"],"The palace maid lifts a strange object (a small cloth packet) from the bottom of a clothes chest, close to the viewer, face puzzled and alarmed; her mistress beside her stares at it suspiciously."),
"lam-ngo": ("phi",["phi"],"She walks along a garden path holding a round silk fan, close to the viewer, face cool and composed, eyes deliberately straight ahead, ignoring a quarrel happening softly in the background."),
"lao-vao-cuu": ("phi",["phi","maid"],"She supports a coughing palace maid out of a smoky burning hall, both close to the viewer and facing us, soot on their sleeves, her face brave and determined, the maid's face weak and grateful. No injuries."),
"loi-don-khong-ai-tin": ("maid",["maid"],"A palace maid who spread a rumour stands alone, close to the viewer, embarrassed and flustered; behind her two other maids shake their heads, laughing, and walk off sideways, faces visible."),
"mach": ("phi",["phi"],"She whispers to another consort behind a raised hand, close to the viewer, about the scheme of a third person, face knowing and serious; the other consort listens, eyes widening."),
"mach-hh": ("phi",["phi","hh"],"She whispers to the Empress, close to the viewer, pointing discreetly at two consorts quarrelling in the background; the Empress listens with a raised eyebrow."),
"nho-tra-an": ("phi",["phi","maid"],"She sits in her chamber, close to the viewer, face warm and gracious; a former palace maid she once helped bows her head and curtsies before her, promising to repay the kindness, face sincere."),
"o-yen-nghi": ("phi",["phi"],"New Year: she sits beside a brazier in her warm chamber reading a book, close to the viewer, face peaceful and content; red couplet banners by the door outside (plain red, no writing)."),
"pha-hoc-lo": ("tutor",["tutor","eun"],"At a back door, the tutor accepts a pouch of silver from a eunuch, close to the viewer, face guilty and greedy; a schoolbook falls from his sleeve."),
"quy-xin-tha-cho-nang": ("phi",["phi","hh"],"She kneels before the Empress, close to the viewer, hands joined, pleading for another consort being punished, face anxious and sincere; the Empress, seated, considers coldly."),
"tha-den-cau-con": ("phi",["phi"],"At a lake at dusk, she kneels close to the viewer and gently sets a red paper lantern on the water, praying for a child, face hopeful and tender, lantern light on her face."),
"tha-den-cau-sieu": ("phi",["phi"],"On a river bank at night during the Vu Lan festival, she releases a lotus-shaped lantern onto the water, close to the viewer, face sorrowful and prayerful, soft candlelight."),
"thai-hau-quo-trach": ("th",["th","phi"],"The Empress Dowager, seated close to the viewer, scolds sternly with a severe face, one hand raised; the consort kneels before her with head bowed, face ashamed, still visible."),
"thai-y-khong-thay-la": ("doc",["doc","phi"],"The imperial physician shakes his head and hands back an open box with an object, close to the viewer, face calm and reassuring; the consort receives it, relieved but doubtful."),
"them-loi-buoc-toi": ("phi",["phi","hh"],"She points and adds accusations before the Empress, close to the viewer, face sharp and cold; the Empress, seated, listens; an accused woman kneels in the middle ground, face pale."),
"theo-cha-muu": ("phi",["phi"],"By a candle, she reads a secret letter from her father, close to the viewer, then holds its corner to the flame, face grave and resolved."),
"theu-khan-ban-lc": ("plain",["plain"],"In the cold palace by a lattice window, she embroiders a handkerchief, close to the viewer, face quiet and patient, soft daylight on her face."),
"tich-thu-co-co": ("phi",["phi","eun"],"The Empress's eunuch takes away her jewellery box, close to the viewer; she stands watching, face suppressing anger and humiliation."),
"tich-thu-vo-co": ("maid",["maid","eun"],"A eunuch wrenches a jewellery box from the palace maid's hands; she is close to the viewer, holding on, face indignant and frightened."),
"tim-chung-cu-cha": ("phi",["phi"],"In an archive of shelves and old document boxes, she searches through old files, close to the viewer, holding up a yellowed letter from her father, face intent and hopeful."),
"tim-chung-cu-minh-oan": ("plain",["plain"],"In the cold palace she kneels at an old chest searching through handwritten letters, close to the viewer, face determined and hopeful."),
"tim-thay-hinh-nhan": ("eun",["eun","phi","maid"],"A eunuch pulls a cloth voodoo doll from under a bed, close to the viewer, face triumphant; the consort and maids beside him recoil in shock, faces visible."),
"to-giac-truoc-hh": ("phi",["phi","hh"],"She kneels close to the viewer presenting evidence on a tray to the Empress, who sits on her phoenix chair close behind, leaning forward, face attentive and stern."),
"to-loi-voi-chu": ("maid",["maid","phi"],"The palace maid reports to her mistress, close to the viewer, pointing toward another maid dozing in the corner, face eager; the mistress looks over with a raised eyebrow."),
"tra-ke-phong-hoa": ("eun",["eun"],"A eunuch investigator crouches close to the viewer, holding a lantern over a scorched oil stain on a wooden floor, face sharp and suspicious, turned three-quarter toward us."),
"trai-gioi": ("phi",["phi"],"She kneels in white robes before an altar with an incense burner, praying for rain, close to the viewer, eyes closed gently in devotion, face serene, cloudy sky behind."),
"trinh-len-ht": ("phi",["phi","emp"],"She kneels close to the viewer and raises a folded Chinese paper memorial (plain folded paper, no wax seal) with both hands toward the Emperor; the Emperor, seated on the throne FACING THE VIEWER, reaches for it with a serious face."),
"trung-co-quoc": ("pri",["pri"],"She stands at a window looking south, close to the viewer, holding a jade pendant from her homeland, face homesick and wistful, turned three-quarter toward us."),
"tui-ngai": ("phi",["phi","child"],"Dragon Boat Festival: she kneels close to the viewer, tying a festive five-colour silk cord around her small child's wrist, a sprig of mugwort on the table beside them, face loving; the child smiles up at her."),
"vao-lanh-cung": ("plain",["plain","eun"],"At the old gate of the cold palace, she steps in carrying a small cloth bundle, close to the viewer, face numb and sorrowful; a eunuch holds the creaking gate open."),
"vuong-gia-quo-trach": ("emp",["emp","prince"],"The Emperor, standing close to the viewer in a courtyard, rebukes a prince who bows his head before him; the Emperor's face stern and angry, the prince's chastened, both visible."),
"khap-cung-don": ("maid",["maid"],"In a palace corridor, palace maids huddle together whispering, close to the viewer, faces curious and gossipy, glancing sideways toward another palace."),
}
U = json.load(open(os.path.join(H, "unticked.json")))
SW = json.load(open(os.path.join(H, "sweep.json")))
SWK = [k for k, v in SW.items() if v.get("verdict") in ("FAR", "BLUR", "BACK")]
assert sorted(SWK) == sorted(S2), set(SWK) ^ set(S2)
OLD = {k: "act-" + k + "-h.webp" for k in U}; OLD.update({k: SW[k]["pic"] for k in SWK})
S.update(S2)
assert not set(U) & set(SWK)
out = {"style_block": STYLE, "camera_block": CAMERA, "negative_block": NEG, "cast": CAST, "settings": "Magnific gpt-2-6, 2k, aspect 3:4, folder KP23-redraw-L2424", "prompts": {}}
os.makedirs(os.path.join(H, "txt"), exist_ok=True)
for k in U + SWK:
    main, cast, scene = S[k]
    castlines = " ".join(CAST[c] for c in cast)
    p = f"{MASTER}\n{EXTRA}\n{STYLE}\n{CAMERA}\nCAST: {castlines}\nSCENE ({k}): {scene}\n{NEG}"
    out["prompts"][k] = {"group": "unticked52" if k in U else "sweep55", "old": OLD[k], "main": main, "cast": cast, "scene": scene, "prompt": p}
    open(os.path.join(H, "txt", k + ".txt"), "w").write(p)
json.dump(out, open(os.path.join(H, "prompts.json"), "w"), ensure_ascii=False, indent=1)
print(len(out["prompts"]), "prompts; max chars", max(len(v["prompt"]) for v in out["prompts"].values()))
