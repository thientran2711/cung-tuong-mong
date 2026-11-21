#!/usr/bin/env python3
"""KP09 body-fit overlay prompts. Key list is READ from dev/build/jlooks.js (LK_HAIR / LK_CLOTH, level labels) and jbody.js (BAL.body.cloth zone map);
assets.json decides what is skipped. Subject paragraphs are hand-written per picture (data below)."""
import os, re, sys, json
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from _lib import *
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
J = open(os.path.join(ROOT, "dev/build/jlooks.js"), encoding="utf-8").read()
B = open(os.path.join(ROOT, "dev/build/jbody.js"), encoding="utf-8").read()
HAIR = re.findall(r'"(\w+)"', re.search(r"LK_HAIR=\[([^\]]*)\]", J).group(1))
CLOTH = re.findall(r'"(\w+)"', re.search(r"LK_CLOTH=\[([^\]]*)\]", J).group(1))
ZONE = dict(re.findall(r'(\w+):"(\w+)"', re.search(r"cloth:\{([^}]*)\}", B).group(1)))
have = {f[0] for f in json.load(open(os.path.join(ROOT, "assets.json")))["files"]}
OUT = os.path.join(HERE, "KP09")
# size per zone (px): overlay is stretched to the measured zone box (jbody.js:70 style = left/top/width/height %), so the picture matches the zone aspect
SIZE = {"hair": (768, 512), "chest": (768, 480), "waist": (768, 288), "hem": (768, 256)}
SPR = ("OVERLAY SPRITE: paint ONLY the marks, isolated on a plain solid chroma-free pure white background, soft clean edge, nothing else in the picture "
       "(no person, no head, no body, no cloth, no hair-pin carrier, no hand, no furniture, no ground, no shadow under it). The marks are a separate decal that the game lays over a "
       "person picture later, so they must read on their own and fade softly towards the edges of the canvas without touching them.")
NOPERSON = "There is NO person and NO figure anywhere in this picture."
MOOD = "Mood N2: plain everyday mishap, light and clear, a quiet untidy feeling, not gloomy and not comic."
HAIRC = "The strands are the blue-black of palace-lady hair (deep blue-black with a thin cool highlight), so they sit invisibly on dark hair."
P = {}
P[("toc", 1)] = (f"Subject: loose hair strands only, the first sign of a ruffled hairdo. About a dozen fine blue-black hairs have slipped out of an unseen bun and float and curl in gentle S-curves, a few crossing, most in a loose fan rising from the lower-left corner towards the upper-right; two or three very short flyaway wisps sit apart. {HAIRC} Light painterly strands, sparse and airy, lots of empty white between them.",
    "Composition: wide landscape canvas 768x512, the fan of strands occupies the middle two thirds, thin at the tips.")
P[("toc", 2)] = (f"Subject: a ruffled hairdo with a tilted hairpin. A thicker tangle of blue-black hair, two loose locks sagging from the left and one lock whipping across the top, about twenty strands, some knotted into a small snarl in the centre. Through the tangle runs ONE slim gold-and-jade hairpin slipped far off its place, lying slanted at about 25 degrees, its tassel tangled in the hair. {HAIRC}",
    "Composition: landscape 768x512, the snarl low and slightly right of centre, the slanted pin crossing it, loose ends trailing off to both sides.")
P[("toc", 3)] = (f"Subject: hair completely come undone. A big wild spray of long blue-black strands bursting outward in every direction, heavy loose locks falling down both sides and a wind-tossed cloud on top, dozens of hairs, some thick locks tangled together; a small broken hair comb tumbles out at the lower-right with its teeth showing, and ONE hairpin of gold and jade is falling out near the bottom edge with a tiny trail of stray hairs. {HAIRC}",
    "Composition: landscape 768x512, the spray fills the canvas widely but fades and thins before every edge, strongest mass at the top, falling pin low right.")
P[("tocam", 1)] = ("Subject: damp hair, just a little moisture. A soft glossy sheen over a fan of blue-black hair: about eight slightly clumped locks, each with a cool thin white highlight line and a few tiny clear water beads (six or so) sitting on them; strands lie smooth and slightly stuck together, no dripping yet. Cool blue-grey highlights, deep blue-black body so it sits invisibly on dark hair.",
    "Composition: landscape 768x512, locks curve in a shallow arc from the upper left to the right edge, droplets scattered along the upper arc.")
P[("tocam", 2)] = ("Subject: wet hair. Heavy dark blue-black locks clinging together in about six thick glistening ropes, each with a bright wet highlight stripe, and a handful of larger clear water drops (around ten) hanging from the lower tips with one drop mid-fall, a few droplets sparkling on the surface. A thin damp wisp curls stuck at one end. Cool blue-grey light.",
    "Composition: landscape 768x512, ropes hang from top to lower middle like strands pulled down by weight, tips ending in drops near the bottom third.")
P[("tocam", 3)] = ("Subject: soaked, plastered hair. Very dark, nearly flat blue-black hair mass slicked into long heavy strands that stick in a dense wet sheet with deep glossy highlights, thin streams of water running down the strands and joining into bigger drops at the lower edge, a few bedraggled stray strands stuck to the left, plenty of droplets. Cold blue-grey highlights, soaked and limp.",
    "Composition: landscape 768x512, the wet sheet spreads across the upper two thirds with long runnels descending, a fringe of drops along the bottom, fading softly.")
P[("vuong", 1)] = ("Subject: a few petals and leaves caught in the hair. FIVE items only: two pale-pink peach-blossom petals, one small maple leaf (red-orange), one tiny green willow leaf and one more petal, each slightly curled, scattered in a loose diagonal, none overlapping, each painted with a thin soft darker rim and gentle veins. Light spring-autumn mix, fresh and delicate.",
    "Composition: landscape 768x512, items sit along a loose diagonal from upper left to lower right with big gaps between them.")
P[("vuong", 2)] = ("Subject: more petals and leaves clinging. EIGHT to nine items in clustered groups: a clump of three peach-blossom petals with a small branchlet twig of two buds, two maple leaves of different sizes, two green leaves, one white plum petal, tiny stamen dots. A couple overlap, a couple are mid-flutter at a tilt, painted with soft veins and rims. Warm pinks, orange-red and fresh greens.",
    "Composition: landscape 768x512, one dense cluster in the upper-left third and a smaller cluster at the right, a few single items between them.")
P[("vuong", 3)] = ("Subject: a hair full of blossom and leaf drift. FOURTEEN or so items: many pale-pink and white petals, three maple leaves from crimson to gold, small green leaves, a tiny dry twig, a few thin snow-like white flakes sprinkled among them. They sit in a thick wreath-like band along the middle of the canvas with several petals falling loose at the lower corners, overlapping naturally, soft veins and rims. Lively warm and fresh palette.",
    "Composition: landscape 768x512, a wide uneven band across the middle, thicker towards the centre-left, falling pieces below it.")
C = {}
C[("uot", 1)] = ("Subject: a first damp patch on a hem. A thin scalloped band of water-darkened cloth stain: pale blue-grey translucent dampness with a darker wet edge line, a few small round splash blots above it and three tiny drip streaks hanging below. Only a gentle damp, not soaked.",
    "Composition: wide strip 768x256, the band runs horizontally across the lower half with its wavy upper edge fading softly upward.")
C[("uot", 2)] = ("Subject: a clearly wet lower robe. A large rippling soaked area, deep blue-grey translucent water stain with darker saturated lower part, water-line ripples stacked like thin contour lines, a dozen splash dots around it and about six drip streaks running down, a few droplets with highlights. Wet and heavy.",
    "Composition: strip 768x256, the soaked mass covers the lower two thirds as an uneven band, drips of different length along the bottom.")
C[("uot", 3)] = ("Subject: a robe soaked right through. A very deep blue-grey translucent water stain spreading almost across the whole canvas, thick dark wet core with lighter spreading rings, many long drips and runnels, pooled drop-beads and bright wet highlights, splash spray at the left and right ends. Saturated and heavy but still see-through at the thin edges.",
    "Composition: strip 768x256, a full-width soaked mass with drips streaming from the whole lower edge, fading softly at the top and the ends.")
C[("tra", 1)] = ("Subject: a small spilled-tea stain. ONE round-ish tea blot about a quarter of the canvas, warm amber-brown with a darker ring edge (the tea-ring effect) and lighter watery middle, three tiny satellite drops beside it. Transparent-looking watercolour pigment.",
    "Composition: landscape 768x480, the blot sits left of centre, the satellite drops to its right.")
C[("tra", 2)] = ("Subject: a bigger tea splash. A main amber-brown stain with dark ring edge and a diagonal splash tail flicked toward the upper right, plus about eight droplets of various size and a second smaller blot below; a faint tea-leaf fleck or two inside the stain. Watery watercolour pigment.",
    "Composition: landscape 768x480, the main stain upper centre, its splash fanning diagonally, small blot lower left.")
C[("tra", 3)] = ("Subject: a whole cup of tea soaked into the front. A broad irregular amber-to-deep-brown stain spreading wide with several overlapping tide-rings, a pool of darker brown in the middle, many drips running downward in uneven runnels, a dozen splash dots, two or three wet tea leaves stuck at the edge. Transparent watercolour pigment, soft fade at the margins.",
    "Composition: landscape 768x480, the mass fills the centre and spreads to about 85 per cent of the width, drips falling toward the bottom.")
C[("bun", 1)] = ("Subject: a few mud splashes on the hem. A band of small spattered mud flecks, warm earth brown, the biggest about a thumb-size blot, dozens of tiny dots thrown upward in a rough fan, dried matte with a lighter dusty edge.",
    "Composition: strip 768x256, spatter hugs the bottom edge and thins upward as a fading fan, cluster slightly right of centre.")
C[("bun", 2)] = ("Subject: a muddy hem. A thick ragged band of wet brown mud along the bottom with clotted bumps, upward splash streaks, four larger blots, many small flecks, a darker wet core and lighter dried rim, a couple of tiny pebble crumbs.",
    "Composition: strip 768x256, the band is thick at the left and right ends and thinner in the middle, splashes thrown upward.")
C[("bun", 3)] = ("Subject: a hem plastered in mud. A heavy continuous ragged crust of dark brown mud over the whole lower half, glossy wet in places and cracked dry in others, big drip-tongues hanging at the bottom, many hard flung splashes up the strip, little clods and a few grass stems stuck in it.",
    "Composition: strip 768x256, the crust covers the lower two thirds edge to edge, with splash spray reaching the top at the left and the right.")
C[("xoc", 1)] = ("Subject: a slightly rumpled sash line. A few soft crease marks only, painted as light and shadow on a neutral mid-grey transparent-looking fold pattern: about five short diagonal fold lines each with a pale ridge and a thin shadow side, converging a little toward the centre. Neutral grey so the game can tint it to any robe colour.",
    "Composition: wide strip 768x288, folds in a loose X-shaped crowd at the centre, thinning at both ends.")
C[("xoc", 2)] = ("Subject: a clearly crumpled, untidy waist. About ten crossing neutral-grey fold lines, some bunched into a gather of three parallel ridges at the left, a twisted pinch with radiating tension wrinkles at the centre, pale ridge plus soft shadow on each; neutral grey so the game can tint it.",
    "Composition: strip 768x288, a pinch point at centre-left with wrinkle rays, the gathers at the left and a long slanting fold at the right.")
C[("xoc", 3)] = ("Subject: a robe thoroughly dishevelled. Dense chaotic neutral-grey crushed folds filling the strip: deep crossing creases, a big twisted knot pulled to one side with radiating tension lines, a sagging loose gape at the right where the cloth lifts with a deep shadow, many small crinkles; pale ridge plus soft shadow, neutral grey so the game can tint it.",
    "Composition: strip 768x288, the knot sits right of centre, creases radiate across the whole width and fade at the top and bottom edges.")
C[("khoi", 1)] = ("Subject: a light veil of kitchen smoke on the chest. A soft grey-brown translucent haze with thin curling wisps, a faint soot-dusted grain, two small darker soot smudges; almost see-through, drifting upward in loose wavy tendrils.",
    "Composition: landscape 768x480, the haze gathers in the lower middle and its wisps climb toward the upper right.")
C[("khoi", 2)] = ("Subject: a smoky, soot-grimed front. A medium-density charcoal-grey translucent smoke stain with swirling curls, a mottled soot grain, four darker smears like wiped fingers and a few tiny ember-burn flecks; cloth looks dulled by smoke.",
    "Composition: landscape 768x480, smoke billows as a wide arch over the centre with the heaviest soot on the left.")
C[("khoi", 3)] = ("Subject: a robe thoroughly steeped in smoke. A heavy, dense charcoal and warm-brown translucent smog blanket covering most of the canvas, thick rolling curls, strong black soot patches with soft edges, long streaks of ash dust, a couple of scorched brown spots with tiny orange-red glow dots at the rim; fully see-through only at the very edges.",
    "Composition: landscape 768x480, the dense blanket fills the canvas, the thickest soot low right, the curls fading at the top.")
C[("moc", 1)] = ("Subject: a snagged thread on a robe edge. ONE pulled loop of pale silk thread about a hand long, lifted from the cloth in a small arc with three tiny puckering wrinkles radiating from the snag point, and a few fine fibre ends; an almost-invisible hint of the cloth's rumple around it. Pale cream silk colour with a thin shadow.",
    "Composition: strip 768x256, the snag sits left of centre with the thread loop rising and a tail dangling to the right.")
C[("moc", 2)] = ("Subject: a torn-open stitch line. A short ragged rip about a third of the width, the cut edge frayed with pale loose threads standing out in a brush-like fringe, the opening a thin dark sliver, several pulled loops and puckers beside it, two loose thread tails hanging down.",
    "Composition: strip 768x256, the rip runs on a shallow diagonal from the left third to the centre with the fringed threads sprouting both sides.")
C[("moc", 3)] = ("Subject: a robe edge ripped wide. A long ragged tear across most of the width with a deep dark gap and uneven jagged teeth, heavily frayed edges with a thick fringe of loose pale silk threads, a curled flap of cloth folded back at one end, pulled stitches and puckers along the rest, several long threads dangling.",
    "Composition: strip 768x256, the tear zigzags from the left to the right end, widest at the centre, flap folded at the right.")
rows = []; skipped = []; n = 0
for kind, ids, DATA in (("hair", HAIR, P), ("cloth", CLOTH, C)):
    for id_ in ids:
        for lv in (1, 2, 3):
            key = f"fx-{kind}-{id_}-{lv}"
            png = key + ".png"
            if "img/" + png in have or "img/" + key + ".webp" in have:
                skipped.append(key); continue
            zone = "hair" if kind == "hair" else ZONE[id_]
            w, h = SIZE[zone]
            subj, comp = DATA[(id_, lv)]
            n += 1; code = f"AJKP09-{id_.upper()}{lv}-{n:02d}"
            lab = re.search(rf'{id_}:\["","([^"]*)","([^"]*)","([^"]*)"\]', J).group(lv)
            parts = [S_STYLE, S_TAKE, f"This is level {lv} of 3 of the game look '{lab}' (file img/{png}); a higher level is clearly heavier than the lower ones.", subj, NOPERSON,
                     SPR, comp + f" Target size {w}x{h} px (the game stretches it onto the '{zone}' zone of a figure), transparent PNG after the owner removes the white.", MOOD, S_COLOUR, S_NOTEXT]
            write_prompt(OUT, key, parts, code)
            ln = [i + 1 for i, l in enumerate(open(os.path.join(ROOT, 'dev/build/jbody.js'), encoding='utf-8')) if ('fx-hair-${id}' in l if kind == 'hair' else 'fx-cloth-${id}' in l)][0]
            rows.append((code, f"img/{png}", key + ".txt", f"{w}x{h} transparent PNG", f"dev/build/jbody.js:{ln}", f"zone {zone}; look '{lab}'"))
save_codes("KP09"); print(len(rows), "written", len(skipped), "skipped")
