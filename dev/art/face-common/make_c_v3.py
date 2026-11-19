#!/usr/bin/env python3
"""NF1 (Lượt 562, K17): 32 NEW consort thiếu nữ lines c01–c32 = COMMON_v3 verbatim + own {PERSON} line (m-line format)
+ B15 two-colour sentence copied verbatim (only the two colour names are slots). Writes cNN.v3.FULL.txt + INDEX_c_v3.md.
Run: python3 dev/art/face-common/make_c_v3.py  (from repo root or anywhere)."""
import os
D=os.path.dirname(os.path.abspath(__file__))
COMMON=open(os.path.join(D,'COMMON_v3.txt')).read().strip()
LOOKS=["Tươi tắn","Dịu dàng","Trong trẻo","Đoan trang","Sắc sảo","Tinh nghịch"]
EXPR={  # copied from the m lines of each look group
"Tươi tắn":"Bright lively eyes, a light cheerful closed-lip smile, lips softly together, eyes fully open, never a stretched grin.",
"Dịu dàng":"Soft warm eyes, a tender small closed-lip smile, lips softly together, eyes fully open, never a stretched grin.",
"Trong trẻo":"Clear wide innocent eyes, a sweet pure faint closed-lip smile, fresh and very youthful, eyes fully open, never a stretched grin.",
"Đoan trang":"A calm composed gaze, a refined faint closed-lip smile, upright graceful bearing, eyes fully open, never a stretched grin.",
"Sắc sảo":"A striking clear bright gaze, elegantly defined features, a subtle poised closed-lip smile, eyes fully open, never a stretched grin.",
"Tinh nghịch":"Sparkling merry eyes, a small playful closed-lip smile, head tilted slightly, eyes fully open, never a stretched grin."}
B15="TWO-COLOUR RULE: the whole outfit uses EXACTLY TWO colours that clearly interact: the MAIN colour {m} and the SECONDARY colour {s}, the secondary clearly visible in large areas (inner robe or skirt, wide borders, sash, cuffs, linings), never a single flat colour all over; gold or silver only as thin accents, never a third colour."
ANG={"FF":"body fully frontal, facing the viewer.","SL":"body turned slightly to the left (about 15 degrees), face toward the viewer.",
"SR":"body turned slightly to the right (about 15 degrees), face toward the viewer.","TL":"body turned three-quarters to the left, face toward the viewer.",
"TR":"body turned three-quarters to the right, face toward the viewer.","ST":"coming straight toward the viewer, body facing front."}
ANGN={"FF":"fully frontal","SL":"slight left (15°)","SR":"slight right (15°)","TL":"three-quarter left","TR":"three-quarter right","ST":"straight toward viewer"}
# game palette row (build.py DATA cNN[0] = jobs.json palette) and the colours used; * = changed (metal/yellow in game row, B15 + no-yellow)
# (id, age, face, shape, eyes, lips, hair, outfit-before-colour-sentence, main, secondary, game_row, pose, angle, item, item_short)
R=[
("c01",16,"a WIDE short oval face with full rounded cheeks and a softly squared little chin, bright wide-set almond eyes with gently lifted outer corners, fully open and bright, soft straight brows a little thick at the start, a short straight nose with a rounded tip, medium lips with a fuller lower lip and softly upturned corners","wide short oval, squared little chin","wide-set almond, lifted corners","fuller lower lip, upturned corners",
 "half-up: one thin plait running along the hairline from the left temple round to the back, tied there with a rose-red ribbon, one small pearl hairpin, the rest long and loose",
 "a cross-collar ruqun of rose-red silk satin with a soft sheen and a pale jade-green floor-length skirt of plain silk, small embroidered peonies at the collar and hem, a pale jade-green silk sash with a small white jade pendant, long sleeves","rose red","pale jade green","rose red and gold",
 "walking forward mid-step, a small woven bamboo cricket cage in natural pale straw colour held up by its loop in one hand at chest height, the other sleeve swinging","a small woven bamboo cricket cage in natural pale straw colour","bamboo cricket cage (straw)"),
("c02",17,"a soft PEAR-SHAPED oval face, a little narrower at the temples and softly full at the lower cheeks, with a gentle rounded chin, large deep-set round eyes with softly drooping outer corners and long lashes, fully open and bright, thin gently curved willow-leaf brows, a delicate narrow nose, a small soft mouth with a full rounded upper lip","soft pear-shaped oval","deep-set large round, drooping corners","small, full upper lip",
 "fully loose and long, the front locks twisted into two thin ropes and joined at the back of the head with a small silvery-grey silk bow, one small silver hairpin",
 "a light open beizi of sapphire-blue silk satin with a soft sheen over a cross-collar silvery-grey inner top and a silvery-grey floor-length skirt of plain silk, small embroidered magpies and plum twigs along the front edges, a silvery-grey silk sash with a small lapis bead pendant, long sleeves","sapphire blue","silvery grey","sapphire blue and silver",
 "mid-step, cradling a sprig of pink peach blossom in the crook of one arm at her chest, head tilted gently, the other hand lightly touching the petals","a sprig of pink peach blossom","peach blossom sprig (pink)"),
("c03",15,"a small SOFT-SQUARE face with a gently rounded jaw and a high clear forehead, very large wide-set round-almond eyes with big bright irises, short soft feathered brows, a tiny snub nose, a small petal-shaped mouth with a full lower lip","small soft-square, high forehead","very large wide-set round-almond","petal-shaped, full lower lip",
 "half-up: the top hair gathered into one small round bun at the crown wrapped with a cream ribbon, the rest long and loose with short wispy side locks",
 "a cross-collar ruqun of emerald-green plain silk with a high-waisted cream floor-length skirt of cotton-silk tied just above the waist, small embroidered clover and tiny white flowers at the hem, a cream silk sash with a small green jade bead, long sleeves","emerald green","cream","emerald green and cream",
 "walking forward lightly, a small posy of purple wild violets tied with a thread held in both hands at her chest, sleeves swaying","a small posy of purple wild violets","posy of wild violets (purple)"),
("c04",18,"a long OVAL face with a high smooth forehead, a straight elegant jaw and a gently pointed chin, calm medium almond eyes with clear double lids, fully open and bright, long level straight brows, a straight high-bridged nose, medium lips with a crisp even outline","long oval, high forehead, straight jaw","medium almond, clear double lids","medium, crisp even outline",
 "fully loose and very long, the front locks tucked behind the ears, a long lavender ribbon tied at the back of the head, one small silver comb at the crown",
 "a cross-collar ruqun of royal-purple silk crepe with a lavender floor-length skirt of plain silk, small embroidered orchids at the collar and cuffs, a lavender silk sash with a small amethyst pendant, long sleeves","royal purple","lavender","royal purple and lavender",
 "standing composed with her weight on one leg, a rolled painting scroll with pale jade-green roller ends and a jade-green cord held in both hands at her waist","a rolled painting scroll with pale jade-green roller ends","painting scroll (jade-green ends)"),
("c05",18,"a slim DIAMOND face with sculpted high cheekbones and a narrow defined chin, large long almond eyes with crisp lifted outer corners, fully open and bright, bold softly angled brows, a slim straight nose with a fine tip, full lips with a sharply defined cupid's bow","slim diamond, sculpted cheekbones","large long almond, crisp lifted corners","full, sharp cupid's bow",
 "loose and long, parted in the centre, the top section twisted back on both sides and fastened at the back with a dusty-rose silk bow, one small gold hairpin",
 "a cross-collar ruqun of peacock-teal silk satin with a soft sheen and a dusty-rose floor-length skirt of plain silk, small embroidered peacock feathers at the hem, a dusty-rose silk sash with a small teal jade pendant, long sleeves","peacock teal","dusty rose","peacock teal and gold",
 "walking mid-step, a white crane-feather fan with a white bone handle held up in one hand at shoulder height below the chin, the other sleeve flowing","a white crane-feather fan","crane-feather fan (white)"),
("c06",16,"a SHORT HEART face with round apple cheeks and a small pointed chin, big bright round eyes with slightly upturned outer corners, fully open and bright, short arched lively brows, a small upturned nose, a small wide mouth with a thin upper lip and a plump lower lip, corners curling up","short heart, apple cheeks","big round, slightly upturned","small wide, plump lower lip",
 "half-up: a small high ponytail at the crown tied with a vermilion ribbon whose long ends flutter, the rest loose behind",
 "a short cross-collar jacket of vermilion silk satin over a long ivory pleated floor-length skirt of plain silk, small embroidered goldfish at the jacket hem and cuffs, an ivory silk sash with a small red-cord knot, long sleeves","vermilion","ivory","vermilion and ivory",
 "stepping forward lightly onto her toes, a small sky-blue glazed clay bird whistle held up between her fingers near her shoulder, the other hand swinging","a small sky-blue glazed clay bird whistle","clay bird whistle (sky blue)"),
("c07",17,"a gentle SQUARE-OVAL face with a softly rounded jawline and smooth cheeks, large clear almond eyes with a slight upward lift, fully open and bright, soft straight brows, a small straight nose, a medium mouth with softly full even lips","square-oval, smooth cheeks","large clear almond, slight lift","medium, even full",
 "half-up: the top hair braided into a thin fishtail plait down the back of the head tied with a pale pink ribbon, the rest long and loose",
 "a cross-collar ruqun of lavender silk satin with a soft sheen and a pale pink floor-length skirt of plain silk, small embroidered morning glories at the collar and hem, a pale pink silk sash with a small rose quartz pendant, long sleeves","lavender","pale pink","lavender and pale pink",
 "walking forward mid-step, a sprig of white magnolia buds raised beside her shoulder in one hand, the other sleeve floating out","a sprig of white magnolia buds","magnolia bud sprig (white)"),
("c08",16,"a small ROUND-HEART face with soft full cheeks tapering to a tiny rounded chin, large gentle round eyes with slightly lowered outer corners and long lashes, fully open and bright, softly arched thin brows, a small rounded nose, a small rosy mouth with a plump lower lip and a faint dimple at the left corner","small round-heart","large gentle round, lowered corners","small rosy, plump lower lip, left dimple",
 "fully loose and long, a thin pale green ribbon tied around the head under the hair with a small bow above the right ear, one small pearl hairpin",
 "a cross-collar ruqun of cherry-blossom pink silk satin with a soft sheen and a pale green floor-length skirt of plain silk, small embroidered cherry blossoms at the collar and cuffs, a pale green silk sash with a small white jade pendant, long sleeves","cherry-blossom pink","pale green","cherry-blossom pink and pale green",
 "mid-step, holding a small sky-blue embroidered silk drawstring pouch by its cord in both hands at her waist, head tilted gently","a small sky-blue embroidered silk drawstring pouch","silk drawstring pouch (sky blue)"),
("c09",15,"a ROUND-OVAL baby face with a smooth broad forehead and soft cheeks, very large clear doe eyes set wide apart, fully open and bright, faint thin straight brows, a short small nose with a soft round tip, a small full mouth shaped like a little bow","round-oval baby face, broad forehead","very large wide-set doe","small full bow",
 "half-up: two small soft twists from the temples tied together at the back with a white ribbon, the rest long and loose with soft side locks",
 "a cross-collar ruqun of powder-blue plain silk with a high-waisted white floor-length skirt of cotton-silk tied just above the waist, small embroidered swallows at the hem, a white silk sash with a small blue glass bead, long sleeves","powder blue","white","powder blue and white",
 "walking lightly forward, a small coral-red paper lantern shaped like a fish hanging from a short bamboo stick held in one hand at her side, glancing at it fondly","a small coral-red paper lantern shaped like a fish","fish paper lantern (coral red)"),
("c10",18,"a refined LONG HEART face with a high forehead, a smooth tapered jaw and a small neat chin, medium-large almond eyes with long straight lower lids, fully open and bright, softly arched medium brows, a straight slim nose, a small mouth with thin even lips","long heart, high forehead","medium-large almond, straight lower lids","small, thin even",
 "fully loose and long, the hair from the temples drawn back and held by one plain carved cream-white jade comb at the back of the head, a thin peach ribbon below it",
 "a cross-collar ruqun of peach silk crepe with a cream floor-length skirt of plain silk, small embroidered lotus leaves at the collar and cuffs, a cream silk sash with a small carnelian pendant, long sleeves","peach","cream","peach and cream",
 "standing gracefully with her weight on one leg, a thin poetry album with an indigo-blue silk cover held against her chest with both hands","a thin poetry album with an indigo-blue silk cover","poetry album (indigo cover)"),
("c11",17,"an ELEGANT OVAL face with a slightly angular jaw and defined cheekbones, large bright almond eyes with sharp clean outer corners and dark lashes, fully open, straight slightly lifted brows, a narrow straight nose, wide medium lips with defined edges","elegant oval, angular jaw","large bright almond, sharp clean corners","wide medium, defined edges",
 "loose and long, one side swept behind the ear and pinned with a small silver plum-blossom hairpin, a thin lilac ribbon braided into a narrow plait on the other side",
 "a light open beizi of lilac silk satin with a soft sheen over a cross-collar silvery-grey inner top and a silvery-grey floor-length skirt of plain silk, small embroidered cranes in flight along the front edges, a silvery-grey silk sash with a small amethyst pendant, long sleeves","lilac","silvery grey","lilac and silver",
 "walking forward with poise, a round fan of deep green silk with a bamboo handle held half-raised in one hand below the chin, the other hand at her sash","a round fan of deep green silk with a bamboo handle","round fan (deep green)"),
("c12",15,"a plump SHORT ROUND face with high round cheeks and a tiny pointed chin, wide bright round eyes with lifted outer corners, fully open, short thick slightly angled brows, a small snub nose, a small mouth with a little curled upper lip","plump short round, tiny pointed chin","wide bright round, lifted corners","small, curled upper lip",
 "half-up: two small braids from the temples looped up and tied at the back of the crown with mint-green ribbons with long tails, the rest loose",
 "a cross-collar ruqun of mint-green plain silk with a high-waisted white floor-length skirt of cotton-silk, small embroidered dragonflies at the hem, a white silk sash with a small green jade bead, long sleeves","mint green","white","mint green and white",
 "skipping lightly forward on one foot, waving a coral-red paper butterfly on a thin bamboo stick at shoulder height, skirt swinging","a coral-red paper butterfly on a thin bamboo stick","paper butterfly on stick (coral red)"),
("c13",17,"a bright ROUNDED OVAL face with full soft cheeks and a softly rounded chin, large sparkling almond eyes with a lively upward tilt at the outer corners, fully open, thick softly arched brows, a short straight nose, a wide soft mouth with full even lips","rounded oval, full cheeks","large sparkling almond, upward tilt","wide soft, full even",
 "half-up: the top hair twisted on both sides into a small heart-shaped knot at the back tied with a cream ribbon, the rest long and loose",
 "a cross-collar ruqun of apricot silk satin with a soft sheen and a cream floor-length skirt of plain silk, small embroidered pomegranate blossoms at the collar and hem, a cream silk sash with a small carnelian bead, long sleeves","apricot","cream","apricot and cream",
 "walking forward mid-step, a small bunch of blue cornflowers held at her chest in one hand, the other sleeve flowing","a small bunch of blue cornflowers","cornflower bunch (blue)"),
("c14",17,"a soft LONG OVAL face with gentle full cheeks and a long rounded chin, large tender almond eyes with softly drooping outer corners, fully open and bright, thin long lightly curved brows, a long delicate nose, a small soft mouth with a gentle cupid's bow","soft long oval, long rounded chin","large tender almond, drooping corners","small soft, gentle cupid's bow",
 "fully loose and very long, a thin blue-violet ribbon tied in a small bow behind the left ear, one small pearl hairpin above it",
 "a cross-collar ruqun of warm ivory-cream silk satin with a soft sheen and a blue-violet floor-length skirt of plain silk, small embroidered chrysanthemums at the collar and cuffs, a blue-violet silk sash with a small white jade pendant, long sleeves","warm ivory cream","blue-violet","soft butter yellow and white",
 "mid-step, holding a sprig of red nandina berries gently in both hands at her waist, head tilted gently","a sprig of red nandina berries","nandina berry sprig (red)"),
("c15",16,"a small OVAL face with soft round cheeks and a short gentle chin, very large round eyes with high clear lids and big irises, fully open, softly rounded thin brows, a tiny straight nose, a small rosy mouth with a full round lower lip","small oval, short chin","very large round, high clear lids","small rosy, round lower lip",
 "half-up: a small soft braid circling from the right temple to the back, tied with an ivory ribbon, one small pearl hairpin, the rest loose",
 "a cross-collar ruqun of coral-pink plain silk with a high-waisted ivory floor-length skirt of cotton-silk, small embroidered peach blossoms at the hem, an ivory silk sash with a small rose quartz bead, long sleeves","coral pink","ivory","coral pink and ivory",
 "walking forward lightly, a single large green lotus leaf on a long stem held by its stem in one hand like a little parasol above her shoulder, never covering her face","a single large green lotus leaf on a long stem","lotus leaf parasol (green)"),
("c16",18,"a balanced WIDE OVAL face with a smooth rounded jaw and a softly squared chin, calm wide-set almond eyes, fully open and bright, long gently arched brows, a straight refined nose, a medium mouth with a soft defined upper lip","wide oval, softly squared chin","calm wide-set almond","medium, defined upper lip",
 "loose and long, the top section smoothly gathered into a small flat twist at the back held by a cream-white jade hairpin pointing upward, the rest falling straight",
 "a light open beizi of sage-green linen-silk over a cross-collar cream inner top and a cream floor-length skirt of plain silk, small embroidered bamboo leaves along the front edges, a cream silk sash with a small jade disc pendant, long sleeves","sage green","cream","sage green and cream",
 "standing composed with her weight on one leg, a slim rose-red lacquered brush case held in both hands at her waist","a slim rose-red lacquered brush case","brush case (rose-red lacquer)"),
("c17",18,"a striking HEART face with defined high cheekbones and a slim tapering jaw, large bright upturned almond eyes with dark lashes, fully open, crisp straight brows with a slight peak, a fine straight nose, full lips with a deep clear cupid's bow","striking heart, high cheekbones","large upturned almond","full, deep cupid's bow",
 "loose and long, a deep-teal ribbon tied around a small half-up section at the crown, its ends falling over one shoulder, one small silver hairpin",
 "a cross-collar ruqun of blush-pink silk satin with a soft sheen and a deep-teal floor-length skirt of plain silk, small embroidered lotus flowers at the collar and hem, a deep-teal silk sash with a small pearl pendant, long sleeves","blush pink","deep teal","blush pink and pale gold",
 "walking with poise mid-step, a white silk folding fan painted with ink bamboo held half-open in one hand at chest height, the other hand at her sash","a white silk folding fan painted with ink bamboo","folding fan (white, ink bamboo)"),
("c18",16,"a cute OVAL face with round full cheeks and a small pointed chin, large bright round eyes with lifted outer corners and a lively sparkle, fully open, short rounded brows, a small upturned nose, a small mouth with both corners turned up","cute oval, round full cheeks","large bright round, lifted corners","small, corners up",
 "half-up: the top hair braided into one plait that is pinned up in a loop at the back of the crown with a lilac ribbon, the rest loose",
 "a cross-collar ruqun of magenta-rose silk satin with a soft sheen and a lilac floor-length skirt of plain silk, small embroidered butterflies at the cuffs and hem, a lilac silk sash with a small amethyst bead, long sleeves","magenta rose","lilac","magenta rose and lilac",
 "stepping forward playfully, a small jade-green bamboo-dragonfly toy pinched by its stick in one hand at shoulder height, the other hand behind her back","a small jade-green bamboo-dragonfly toy","bamboo-dragonfly toy (jade green)"),
("c19",17,"a bright SOFT-DIAMOND face with full cheeks and a softly rounded chin, large almond eyes with lifted outer corners and a lively look, fully open, natural thick straight brows, a short neat nose, a medium mouth with full even lips and upturned corners","soft diamond, full cheeks","large almond, lifted corners","medium full, upturned corners",
 "half-up: three small twists along the crown joined at the back with a pink ribbon, one small pearl flower hairpin, the rest long and loose",
 "a cross-collar ruqun of plum silk satin with a soft sheen and a pink floor-length skirt of plain silk, small embroidered plum blossoms at the collar and hem, a pink silk sash with a small white jade pendant, long sleeves","plum","pink","plum and pink",
 "walking forward mid-step, a short pale green bamboo flute held in one hand at her side and swung lightly, the other sleeve flowing","a short pale green bamboo flute","bamboo flute (pale green)"),
("c20",17,"a soft ROUND-OVAL face with gently full cheeks, a small soft chin and a faint dimple in the right cheek, large tender almond-round eyes with long lashes and softly lowered outer corners, fully open, light long curved brows, a small straight nose, a small soft heart-shaped mouth","soft round-oval, right dimple","large tender almond-round, lowered corners","small heart-shaped",
 "fully loose and long, the front locks braided into two thin plaits tied together at the back of the head with a celadon ribbon, one small silver flower hairpin",
 "a cross-collar ruqun of lotus-pink silk satin with a soft sheen and a celadon floor-length skirt of plain silk, small embroidered lotus leaves at the hem, a celadon silk sash with a small jade pendant, long sleeves","lotus pink","celadon","lotus pink and celadon",
 "mid-step, holding a deep-blue morning glory sprig lightly in one hand near her chest, the other hand lifting her sleeve","a deep-blue morning glory sprig","morning glory sprig (deep blue)"),
("c21",15,"a small HEART-ROUND face with a broad smooth forehead, plump cheeks and a narrow little chin, large clear almond eyes with a slight downward tilt at the outer corners giving an innocent look, fully open, soft faint arched brows, a delicate small straight nose, small full lips with a soft bow","small heart-round, broad forehead","large clear almond, slight down-tilt","small full, soft bow",
 "half-up: the top hair in one small soft loop at the back wrapped with a blush-pink ribbon, the rest loose and straight to the waist",
 "a cross-collar ruqun of ruby-red plain silk with a high-waisted blush-pink floor-length skirt of cotton-silk, small embroidered little chrysanthemums at the hem, a blush-pink silk sash with a small pearl bead, long sleeves","ruby","blush pink","ruby and blush pink",
 "walking lightly forward, a sprig of white jasmine held in both hands at her chest, glancing softly at it","a sprig of white jasmine","jasmine sprig (white)"),
("c22",18,"a graceful slender DIAMOND-OVAL face with soft high cheekbones and a neat tapered chin, medium almond eyes with calm level lids, fully open and bright, long straight brows with a soft tail, a straight nose with a fine bridge, a small mouth with a softly full lower lip","slender diamond-oval","medium almond, calm level lids","small, soft full lower lip",
 "fully loose and long, a thin pink ribbon tied across the back of the head, one small white jade hairpin at the crown pointing backward",
 "a cross-collar ruqun of orchid-purple silk crepe with a pink floor-length skirt of plain silk, small embroidered lilies at the collar and cuffs, a pink silk sash with a small amethyst pendant, long sleeves","orchid purple","pink","orchid purple and pink",
 "standing upright and graceful with her weight on one leg, a closed folding fan with pale jade-green silk leaves and a bamboo frame held in both hands at her waist","a closed folding fan with pale jade-green silk leaves","closed folding fan (pale jade)"),
("c23",18,"a refined LONG face with high defined cheekbones, a firm narrow jaw and a pointed chin, large bright phoenix-almond eyes with long sweeping lashes, fully open, strong elegantly arched brows, a high straight nose, full lips with crisp defined edges","refined long, firm narrow jaw","large phoenix-almond, sweeping lashes","full, crisp edges",
 "loose and long, swept to one side over the right shoulder, the left side pinned back with a jade-green ribbon and one small gold comb",
 "a cross-collar ruqun of crimson silk satin with a soft sheen and a jade-green floor-length skirt of plain silk, small embroidered pomegranates at the collar and hem, a jade-green silk sash with a small white jade pendant, long sleeves","crimson","jade green","crimson and gold",
 "walking with poise, a white silk round fan painted with an ink orchid held in one hand at her collarbone below the chin, the other hand holding her sleeve","a white silk round fan painted with an ink orchid","round fan (white, ink orchid)"),
("c24",16,"a lively SOFT-ANGULAR face with a gently squared jaw and round cheekbones, large almond eyes with mischievous lifted outer corners, fully open, short straight brows with a lifted end, a small straight nose with an upturned tip, a wide mouth with thin soft lips curling up at the corners","soft-angular, squared jaw","large almond, lifted corners","wide, thin soft",
 "loose and long with two thin braids at the temples, each tied at the end with a small ivory ribbon and a tiny pearl bead",
 "a short cross-collar jacket of scarlet silk satin over a long ivory pleated floor-length skirt of plain silk, small embroidered rabbits at the cuffs and jacket hem, an ivory silk sash with a small red-cord knot, long sleeves","scarlet","ivory","scarlet and ivory",
 "stepping forward, a small spinning top of pale green painted wood held up between her fingers at chest height to show it, the other hand on her hip","a small spinning top of pale green painted wood","spinning top (pale green)"),
("c25",16,"a fresh SHORT OVAL face with plump cheeks and a softly rounded chin, large round-almond eyes with a bright upward lift, fully open, thick soft natural brows, a small rounded nose, a medium mouth with a full upper lip and upturned corners","short oval, plump cheeks","large round-almond, upward lift","medium, full upper lip",
 "fully loose and long, the ends softly wavy, a deep-teal ribbon braided into a single thin plait at the right temple",
 "a cross-collar ruqun of deep cherry-red silk satin with a soft sheen and a deep-teal floor-length skirt of plain silk, small embroidered pine sprigs at the collar and hem, a deep-teal silk sash with a small pearl pendant, long sleeves","deep cherry red","deep teal","deep cherry red and black-gold",
 "walking forward mid-step, a single white camellia on a short twig raised at her chest in one hand, the other sleeve flowing","a single white camellia on a short twig","camellia twig (white)"),
("c26",17,"a gentle LONG ROUND face with smooth full cheeks and a soft long chin, large dreamy round eyes with softly drooping outer corners and long lashes, fully open, light thin curved brows, a slender small nose, a small mouth with a plump rosy lower lip","long round, soft long chin","large dreamy round, drooping corners","small, plump rosy lower lip",
 "fully loose and long, a celadon ribbon woven loosely through the hair at the back, one small silver hairpin with a small pearl",
 "a cross-collar ruqun of burgundy silk satin with a soft sheen and a celadon floor-length skirt of plain silk, small embroidered magnolias at the collar and cuffs, a celadon silk sash with a small jade pendant, long sleeves","burgundy","celadon","burgundy and gold",
 "mid-step, holding a white lotus bud on a long stem lightly in both hands at her waist, head tilted gently","a white lotus bud on a long stem","lotus bud (white)"),
("c27",15,"a fresh small LONG-OVAL face with soft rounded cheeks and a gentle little chin, large bright round eyes with clear double lids, fully open, soft straight short brows, a small straight nose with a soft tip, a small mouth with a full rosy lower lip","small long-oval","large bright round, clear double lids","small, full rosy lower lip",
 "fully loose and long, a small cream ribbon tied to a thin lock at each side of the face",
 "a cross-collar ruqun of cinnabar-red plain silk with a high-waisted cream floor-length skirt of cotton-silk, small embroidered swallows at the hem, a cream silk sash with a small carnelian bead, long sleeves","cinnabar","cream","cinnabar and cream",
 "walking forward lightly, a bunch of sky-blue forget-me-nots held at her chest with both hands, glancing softly at them","a bunch of sky-blue forget-me-nots","forget-me-not bunch (sky blue)"),
("c28",18,"a serene softly ROUNDED SQUARE face with a smooth jaw and a short gentle chin, calm large almond eyes with straight upper lids, fully open and bright, long thin level brows, a delicate straight nose, a small mouth with neat thin lips","rounded square, short chin","calm large almond, straight upper lids","small, neat thin",
 "loose and long, the top hair smoothly drawn back under a celadon silk ribbon tied in a flat knot at the back, one small white jade hairpin pointing upward",
 "a light open beizi of celadon silk crepe over a cross-collar white inner top and a white floor-length skirt of plain silk, small embroidered water ripples and carp along the front edges, a white silk sash with a small celadon jade pendant, long sleeves","celadon","white","celadon and white",
 "standing upright with her weight on one leg, a rose-red pomegranate blossom sprig held at her chest in one hand, the other hand resting at her sash","a rose-red pomegranate blossom sprig","pomegranate blossom sprig (rose red)"),
("c29",18,"a bold OVAL face with defined angular cheekbones, a firm straight jaw and a defined chin, large bright almond eyes with crisp clear lids and lifted corners, fully open, strong straight brows with a clean arch near the tail, a straight high nose, wide full lips with sharp edges","bold oval, angular cheekbones","large bright almond, crisp lids","wide full, sharp edges",
 "loose and very straight to the waist, parted at the side, a pale grey silk ribbon and one small silver crescent hairpin above the left temple",
 "a cross-collar ruqun of ink-blue silk satin with a soft sheen and a pale grey floor-length skirt of plain silk, small embroidered plum blossoms in snow at the collar and hem, a pale grey silk sash with a small white jade pendant, long sleeves","ink blue","pale grey","ink blue and pale grey",
 "walking with poise mid-step, a closed coral-red folding fan held in one hand and tapped against her other palm at waist height","a closed coral-red folding fan","folding fan (coral red)"),
("c30",16,"a pert ROUND-DIAMOND face with soft cheeks and a small pointed chin, large bright almond-round eyes with a playful upward flick at the outer corners, fully open, short slightly arched brows, a small turned-up nose, a small mouth with a plump upper lip","pert round-diamond","large almond-round, upward flick","small, plump upper lip",
 "half-up: a short braided ponytail high at the back of the crown tied with a white ribbon, the rest loose",
 "a short cross-collar jacket of moonlight-blue silk satin over a long white pleated floor-length skirt of plain silk, small embroidered kittens at the cuffs and jacket hem, a white silk sash with a small blue glass bead, long sleeves","moonlight blue","white","moonlight blue and white",
 "turning lightly mid-step, a little orange-red paper fox mask on a short stick swinging low at her side in one hand, the other hand raised in a little wave","a little orange-red paper fox mask on a short stick","paper fox mask on stick (orange-red), held low"),
("c31",17,"a bright SOFT OVAL face with high round cheeks and a gently pointed chin, large clear eyes with a lively lift at the outer corners and a slight natural double lid, fully open, gently arched medium brows, a straight small nose, a medium mouth with full soft lips and lifted corners","soft oval, high round cheeks","large clear, lively lift","medium full soft, lifted corners",
 "half-up: the top hair gathered in a small twist on the right side of the crown held by a small silvery-grey silk flower, the rest long and loose over the left shoulder",
 "a cross-collar ruqun of pale jade silk satin with a soft sheen and a silvery-grey floor-length skirt of plain silk, small embroidered willow leaves and orioles at the collar and hem, a silvery-grey silk sash with a small white jade pendant, long sleeves","pale jade","silvery grey","pale jade and silver",
 "walking forward mid-step, a sprig of pink cherry blossom held up at shoulder height in one hand, the other sleeve swinging","a sprig of pink cherry blossom","cherry blossom sprig (pink)"),
("c32",17,"a gentle WIDE OVAL face with soft full cheeks and a rounded chin, large warm round eyes with softly lowered outer corners and long lashes, fully open, soft low curved brows, a small rounded nose, a small full mouth with a soft bow","gentle wide oval, rounded chin","large warm round, lowered corners","small full, soft bow",
 "fully loose and long, a soft grey-blue ribbon tied in a low loose bow at the nape, one small pearl comb above the right ear",
 "a cross-collar ruqun of ivory silk satin with a soft sheen and a soft grey-blue floor-length skirt of plain silk, small embroidered narcissus at the collar and cuffs, a soft grey-blue silk sash with a small pearl pendant, long sleeves","ivory","soft grey-blue","ivory and soft grey-blue",
 "mid-step, holding a pink China rose with a short stem in both hands at her chest, head tilted gently","a pink China rose","China rose (pink)"),
]

# B18 (owner Lượt 583 via ROOT-51): c07–c32 colours = softer name + hex + the store medium-tone sentence (t8-prompt-B/build.py LOW_TONE, verbatim
# except its trailing "; " → "."). c01–c06 = the 6 drawn samples, KEPT unchanged (owner). hex: (o) = ORIG1 measured robe hex of her game t1 figure, else chosen medium tone.
LOW_TONE="all colours at ONE medium tone level, the same as the soft coral-red and brick-red robes of the game: medium saturation, medium lightness, neither too fresh nor too dark, never rực, never glaring, never neon, never pastel-washed, never dusty, grey, muddy or black."
NEW={"c07":(("soft lavender","#B8A6CC"),("soft pale pink","#E6C4C4")),
"c08":(("soft cherry-blossom pink","#F0B9BB"),("pale sage green","#A9B596")),
"c09":(("soft powder blue","#9DB4CC"),("soft white","#EEEAE4")),
"c10":(("soft peach","#F2C6A5"),("cream","#F3E2CC")),
"c11":(("soft lilac","#BBA5C8"),("silvery grey","#B3ADB4")),
"c12":(("soft mint green","#A8C8B4"),("soft white","#EEEAE4")),
"c13":(("apricot peach","#EBA98E"),("cream","#F0E2CC")),
"c14":(("warm ivory cream","#EEDFC8"),("muted blue-violet","#8A86B8")),
"c15":(("soft coral pink","#E0A398"),("ivory","#F0E8DA")),
"c16":(("muted sage green","#9CA283"),("cream","#E6DCC0")),
"c17":(("blush pink","#E5B3AA"),("muted deep teal","#4F7F7C")),
"c18":(("soft mauve rose","#BF868F"),("soft lilac-pink","#D9B5C5")),
"c19":(("soft plum","#8E5D78"),("soft pink","#E3B9B0")),
"c20":(("soft lotus pink","#E9B5AE"),("soft celadon","#A9C2AE")),
"c21":(("soft rose red","#C9746C"),("blush pink","#E8B5AC")),
"c22":(("soft orchid purple","#A98AB0"),("soft pink","#EBC7D0")),
"c23":(("muted crimson red","#B04F4C"),("soft jade green","#7FA88F")),
"c24":(("soft coral red","#D97B60"),("pale blush cream","#F3D1B1")),
"c25":(("muted cherry red","#A84A52"),("muted deep teal","#4C7A80")),
"c26":(("soft burgundy","#8A4A55"),("soft celadon","#A9C2AE")),
"c27":(("terracotta coral red","#C27362"),("pale cream blush","#EBCFBE")),
"c28":(("soft celadon","#A3BFAA"),("soft white","#EEEAE4")),
"c29":(("soft ink blue","#4E5F7E"),("pale grey","#C8C8CA")),
"c30":(("soft moonlight blue","#A9BCD3"),("soft white","#EEEAE4")),
"c31":(("pale jade","#B4CDBE"),("silvery grey","#B3ADB4")),
"c32":(("ivory","#EEDCCE"),("soft grey-blue","#A9B5C4"))}
ORIGHEX={"c08","c10","c13","c15","c16","c18","c20","c21","c24","c27","c32"}
OLDCOL={}

CHANGED={"c01","c02","c05","c11","c14","c17","c23","c25","c26","c31"}
pre,post=COMMON.split('{PERSON}')
out=[]
for i,(cid,age,face,shape,eyes,lips,hair,outfit,m,s,game,pose,item,itemshort) in enumerate(R):
    n=i+1; look=LOOKS[(n-1)%6]; ak=["FF","SL","SR","TL","TR","ST"][(n-1+(n-1)//6)%6]
    OLDCOL[cid]=(m,s)
    mw,sw=m,s
    if cid in NEW:
        (mn,mh),(sn,sh)=NEW[cid]
        o2=outfit
        for old,new in ((m,mn),(s,sn)):
            if old==new: continue
            w=old.split(' '); cands=[old.replace(' ','-'),' '.join(w[:-1])+'-'+w[-1] if len(w)>1 else old,old]
            hit=next((c for c in cands if c in o2),None)
            if not hit: raise SystemExit(f"colour word not found {cid} {old}")
            nw=new.split(' ')
            o2=o2.replace(hit,(' '.join(nw[:-1])+'-'+nw[-1] if len(nw)>1 else new) if '-' in hit else new)
        outfit=o2; m,s=mn,sn; mw,sw=f"{mn} like {mh}",f"{sn} like {sh}"
    tone=(" Colour tone: "+LOW_TONE) if cid in NEW else ""
    person=(f"A young unmarried noble girl from a scholar's family (thiếu nữ khuê các), about {age}. Her face: {face}. Expression: {EXPR[look]} "
            f"Hair: glossy pure BLACK (never brown), {hair}. Outfit: {outfit}; her signature colour family {m} and {s}. {B15.format(m=mw,s=sw)}{tone} "
            f"Pose: {pose}, {ANG[ak]}")
    if item not in pose: print('WARN item text not in pose',cid)
    full=pre+person+post
    open(os.path.join(D,f'{cid}.v3.FULL.txt'),'w').write(full)
    out.append(f"| {cid} | {look} | {age} | {shape} | {eyes} | {lips} | {ANGN[ak]} | {itemshort} | {mw} + {sw} | {game}{' *' if cid in CHANGED else ''} |")
hdr=("# c01–c32 NEW consort thiếu nữ v3 {PERSON} lines — index (NF1, owner Lượt 562, rule K17)\n\n"
"Old c01–c32 pictures = ARCHIVED, never a reference. Recipe = set B: COMMON_v3.txt VERBATIM with {PERSON} replaced (cNN.v3.FULL.txt), gpt-2-6 1024x2304 2k seed 7172, ONE ref M09 eIyOFEidqL, no transparentBackground, parchment bg → images_remove_background.\n"
"Look = LOOKS[(n-1)%6] (LOOK_GROUPS.md); expression sentence copied from the m lines of that group. Angle = 6 angles rotated (no near-profile, E2). Hair = loose or half-up (F1), glossy black (D3). Outfit cross-collar/beizi (G16 no round neck) + B15 two-colour sentence verbatim (only colour names are slots). Held item colour differs from both outfit colours (B16).\n"
"Built by `python3 dev/art/face-common/make_c_v3.py` (never typed by hand).\n\n"
"Colours: main + secondary = the game palette row (t8-prompt-B/build.py DATA cNN[0] = jobs.json palette). `*` = changed because the game row's second colour is a metal (gold / pale gold / black-gold / silver) or the main is yellow — B15 allows gold/silver only as thin accents and 'no yellow'; replacement taken from the contrast table of dev/handover/reports/phibach-colours.md (silver → silvery grey cloth). NOTE for the owner: these 10 rows need her OK (A18).\n\n"
"| id | look | age | face shape | eyes | lips | angle | item | outfit colours (main + secondary) | game palette row |\n|---|---|---|---|---|---|---|---|---|---|\n")
open(os.path.join(D,'INDEX_c_v3.md'),'w').write(hdr+"\n".join(out)+"\n")
print("wrote",len(out))
tab=["| id | old (Lượt 562) | new (B18, Lượt 583) |","|---|---|---|"]+[f"| {c} | {OLDCOL[c][0]} + {OLDCOL[c][1]} | {NEW[c][0][0]} {NEW[c][0][1]}{' (o)' if c in ORIGHEX else ''} + {NEW[c][1][0]} {NEW[c][1][1]} |" for c in NEW]
open(os.path.join(D,'INDEX_c_v3.md'),'a').write("\n## B18 neutral-tone colours c07–c32 (owner Lượt 583; c01–c06 drawn samples kept as they are)\nEvery colour = name + hex + the store medium-tone sentence (build.py LOW_TONE). (o) = hex measured from her game t1 robe (build.py ORIG1).\n\n"+"\n".join(tab)+"\n")
