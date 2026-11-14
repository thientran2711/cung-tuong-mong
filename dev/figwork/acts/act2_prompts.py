# Act art 2 (review/act-art2, owner 11/14): every act picture must TELL the act at a glance; symbolic people allowed
# (backs, 3/4 back views, distant figures, hands). python3 act2_prompts.py KEY -> prompt. Style ref: bright = Ngự hoa viên
# scene cplQijT0eP, dark = tẩm cung đêm iGq8UJy3uK (one ref, type style). gpt-2-6, 3:4, 1k; fetch2.py crops to 384x506.
import sys
PEOPLE=(" People are shown from behind, in 3/4 back view, or small in the distance; any visible face is small, serene, gentle and beautiful,"
 " fair porcelain skin, soft round-almond eyes (never slanted or narrow), no moles, clearly adult; everyone richly dressed;"
 " men never wear pink or purple; the Emperor only in imperial yellow. Calm natural poses, no flying sleeves, sashes or ribbons.")
TAIL=" No text, letters, characters, seals, border or signature."
BR=("Portrait 3:4 game card illustration: {s}. One clear story moment readable at thumbnail size, softly blurred palace background."
 " Semi-realistic painterly guofeng court illustration, near-3D realistic rendering with soft natural light and fine detail, matching the reference;"
 " warm vermilion, gold, jade and soft pink palette, rich luxurious detail.")
DK=("Portrait 3:4 game card illustration, deep night, low-key lighting: {s}. One clear story moment readable at thumbnail size."
 " Over 60% of the frame in deep indigo and plum shadow; the only light is {l}. Semi-realistic painterly guofeng court illustration,"
 " near-3D realistic rendering with fine detail, matching the reference; muted jewel tones, ominous yet elegant and beautiful, clear, not murky.")
B={ # key: scene (bright)
 "an-thai":"a pregnant young consort in soft pink silk seen in 3/4 back view, seated by a window, one hand resting gently on her slightly rounded belly, watching a clay medicine pot simmer on a small charcoal stove beside a tray of herbs and red dates",
 "bong-con":"a consort in rose and gold silk seen in 3/4 back view gently receiving a swaddled baby in red embroidered cloth from another consort's arms, the two standing in a sunlit palace hall, a carved cradle nearby",
 "buon-ban-len":"at a small half-open side gate in a red palace wall, a palace maid in fine embroidered silk, seen from behind, hands a bundle of folded silk rolls through the gap to another maid who passes back a small pouch of silver, both glancing aside, quiet back lane",
 "chon-nguoi":"a consort in rich silk seated on a veranda chair, seen from behind, looking over a neat row of palace maids and young eunuchs standing in line in the sunny courtyard below, all small and distant, an older head eunuch in navy presenting them",
 "danh-co":"a go board on a low table in a garden pavilion; on one side a lady's slender hand in pink silk sleeve placing a white stone, on the other side a man's hand in an imperial yellow dragon-embroidered sleeve holding a black stone; teacups, blossoms",
 "day-con-hoc":"a consort in jade-green silk seen in 3/4 back view sitting at a rosewood desk, gently guiding the small hand of a little child (seen from behind, about six years old, in red silk) holding a brush over paper, books and ink stone, window light",
 "gia-benh":"a consort lying languidly in a canopy bed behind half-drawn gauze curtains, a damp cloth on her forehead, seen at a distance; outside the curtain a court physician in dark teal robe kneels with a medicine box while a maid waits with a bowl; on the dressing table nearby an open jar of white face powder and a mirror",
 "hoc-le":"in a bright palace hall a young palace maid in fine embroidered silk, seen in 3/4 back view, kneels and holds up a tea tray with both hands, while a dignified beautiful older court lady (mama) in dark teal brocade stands beside her, gently correcting her elbow with a folding fan",
 "lam-tho":"a consort in pale gold silk seen in 3/4 back view writing a poem with a brush on a long silk scroll, columns of abstract illegible ink strokes, a vase with a plum branch and a moon window behind",
 "liec-mat":"by a lotus pond a consort in pink silk seen in 3/4 back view lowers her round silk fan and glances across the water toward a handsome young man in a dark teal robe standing far away on a stone bridge, petals on the water",
 "nghi-tay":"a young palace maid in fine embroidered silk sitting on a low stool behind a tall stack of wooden wash tubs and baskets of laundry, seen in 3/4 back view, resting with a cup of tea in both hands, sunlight in a back courtyard",
 "thi-tham":"two consorts seen from behind sitting close together on a carved stone bench under a willow in the imperial garden, one leaning to whisper a secret behind her raised hand to the other, a tea set beside them",
 "thinh-an":"early morning in a grand hall: a consort seen from behind kneels on a cushion and bows with hands raised at her brow before a dignified beautiful older lady, the Empress Dowager in dark gold and black brocade, seated small and distant on a raised dais; soft morning light through doors",
 "thu-toi":"a consort in plain pale silk seen from behind kneeling alone on the stone steps before a great golden-roofed hall, her hairpins and earrings removed and laid on the ground before her, overcast pale sky",
 "ve-tranh":"a consort's hand holding a fine brush, painting a portrait of a dignified elderly lady with silver hair in gold brocade on a silk scroll on a desk, paint dishes, the portrait face serene and kind",
 "tranh-sung":"evening in a lamplit consort's chamber: a consort seen in 3/4 back view reclining weakly on a carved daybed with one hand on her chest, while her maid hurries out of the open door into the blue dusk holding a lantern toward a distant golden palace",
 "hau-tra-dem":"evening in a lamplit palace hall: a young maid in fine silk seen from behind carries a tray with a teapot and cups toward a low table where the Emperor in imperial yellow and a consort in rose silk sit small in the distance, warm candlelight, deep blue night outside the windows",
}
D={ # key: (scene, light) dark
 "cai-do":("in a dark consort's bedchamber, a figure in a deep plum cloak seen from behind kneels at an open clothes chest and slips a glinting gold hairpin and a jade token under the folded silks","one small candle on the floor"),
 "cai-tai-mat":("behind a red palace pillar a lady in dark silk, seen from behind, presses a silver ingot into the open hands of a palace maid who bows her head","a dim lantern down the corridor"),
 "day-ho":("at the edge of a lotus pond at night, a consort in pale silk stands at a low stone railing, seen from behind, while a shadowy cloaked figure creeps up behind her with hands reaching toward her back, dark water and lotus leaves below","the full moon reflected in the water"),
 "gia-mang-thai":("a consort seen from behind standing before a bronze mirror at night while her maid ties a small round silk cushion under her robe at the waist to fake a pregnant belly","one candle beside the mirror"),
 "ha-doc":("a lady's slender hand in a dark plum sleeve tipping fine white powder from a tiny porcelain vial into a bowl of soup on a lacquer tray","one candle"),
 "hen-gap":("in the moonlit imperial garden two small figures meet secretly beside a rockery and a willow: a consort in pale silk and a tall man in a dark blue robe, seen from a distance, a lantern set down on the path","moonlight and a small lantern"),
 "len-vao":("a figure in a dark hooded cloak, seen from behind, slipping through a half-open vermilion palace door into a dark corridor","a thin strip of moonlight through the door"),
 "mua-chuoc-ba-do":("beside an empty carved cradle, a lady's hand in rich dark silk presses silver ingots into the weathered but graceful hands of an older midwife in dark teal, faces out of frame","one candle on a side table"),
 "ngang-chan":("in a dim palace corridor two consorts walk past each other, seen from behind; one quietly slides her embroidered shoe out from under her hem into the path of the other","a dim lantern"),
 "to-giac":("in a dim great hall a consort seen from behind kneels and holds up a sealed letter of evidence with both hands toward the Emperor in imperial yellow seated small and distant on the throne","a pair of tall candles by the throne"),
 "tung-tin":("at dusk two palace maids seen from behind whisper behind a red pillar, one cupping her hand at the other's ear, while further down the corridor other maids turn their heads","a lantern at the end of the corridor"),
 "xa-huong":("a lady's hand in a dark sleeve slipping a small dark musk pod into an embroidered incense sachet hanging by a consort's bed","one candle and an incense burner"),
}
def P(k):
    if k in B: return BR.format(s=B[k])+PEOPLE+TAIL
    s,l=D[k]; return DK.format(s=s,l=l)+PEOPLE+TAIL
if __name__=="__main__":
    for k in sys.argv[1:] or list(B)+list(D): print(k,'||',P(k))
