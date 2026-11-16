# python3 scenes.py -> "KIND|KEY|styleRef|prompt" for review/placeholder-pics3 (same prompt recipe as act-pics2 hprompt.py / dprompt.py)
DAY,NIGHT='If6wqwdtvE','fHA471qCDY'; EDAY,ENIGHT='cplQijT0eP','s7o88xTl8e'
HEAD="Portrait 3:4 game card illustration: {s}. One clear centred focal subject, softly blurred palace background, readable at thumbnail size. Gufeng watercolour court illustration like the reference: soft ink lines, delicate washes, "
BR="warm vermilion, gold, jade and soft pink, gentle light, rich luxurious detail."
DK="night scene with deep indigo and plum shadows, low warm lantern or candle glow, muted jewel tones, ominous yet beautiful, rich luxurious detail."
TAIL=(" Show as few people as possible: only hands, forearms and wide Han/Ming sleeves, or a corner of a robe hem; NO faces, no heads, no full figures. "
 "Hands graceful and anatomically correct with five fingers, no fused or extra fingers. Men's sleeves never pink or purple; imperial yellow never appears; ladies' sleeves are pink, jade green, red, ivory or blue, never yellow or gold-yellow. "
 "No skulls, no blood. No text, letters, Chinese characters, seals, border or signature; papers and books are blank or show only abstract lines.")
S=[ # kind key dark scene
('opt','opt-hoa-giai',0,"two ladies' hands in pink and jade sleeves each taking one half of a snow-white pastry that a third hand has just broken in two on a gilded plate, two small tea cups side by side, peaceful settling of a quarrel"),
('opt','opt-ran-day',0,"a lady's hand in a deep red sleeve resting a slim polished wooden ruler on an open blank book of palace rules, another hand's finger pointing at a line, solemn and gentle, lacquered table, incense"),
('opt','opt-xu-nghieng',0,"a small brass balance scale on a lacquered table, one pan lower than the other, a lady's hand in an ivory sleeve gently placing a jade weight on the lower pan, two embroidered handkerchiefs lying in the pans"),
('opt','opt-phan-gian',1,"a sealed letter slipped halfway out of a wide sleeve, a small pouch of silver being pushed back across a dark lacquered table by one hand while the other hand hides the letter under the sleeve, candlelight, double game"),
('opt','opt-than-can',0,"one lady's hand in a jade-green sleeve pinning a jade hairpin and a small jade token into another hand's palm, a promotion to a trusted close servant, soft warm light, silk cushion"),
('opt','opt-tin-gia',1,"a hand holding a folded blank note over a candle flame with the other hand's fingers testing it, a small lantern, a teacup, a test of loyalty with false news, quiet suspense, dark lacquered table"),
('opt','opt-tin-thuong',0,"a lady's hand giving a small red silk purse and two silver ingots into another open hand in trust, a warm reassuring gesture, tea set on the table, soft light"),
('opt','opt-tra-xem',1,"a hand holding a paper lantern low over a palace corridor floor lit to show faint footprints and a scattering of pale ash, another hand lifting a curtain edge, searching for who did it, night"),
('opt','opt-thue-tho-theu',0,"an embroidery frame with a half-finished peony pattern, a hired seamstress's hands with a needle and coloured silk threads in a simple workshop corner, a lady's hand laying a few silver coins beside the frame"),
('act','bo-phan-la-h',1,"a hand tipping a pinch of strange pale powder from a small folded paper into an open powder and rouge box on a dressing table beside a bronze mirror, secretive, candlelight"),
('act','moi-thai-y-bat-mach-h',0,"a physician's hand with three fingers resting on a consort's wrist laid on a small silk wrist cushion, bedside in her chamber, bed curtain tied back, a steaming medicine bowl, quiet and careful"),
('act','sang-thai-y-vien-h',0,"inside the Imperial Hospital: a physician's hand with three fingers on a visiting consort's wrist on a silk cushion, rows of small wooden herb drawers and a brass medicine grinder behind, bright day"),
('act','tat-h',1,"a lady's raised open palm in a wide red sleeve swinging sideways in motion, a hairpin and a jade bangle flying loose, the blurred back of another lady's shoulder turned away, a stern moment in a dim palace hall"),
('ev','q72-dong-tam',0,"a night of the Qixi festival: a lady's hands in wide sleeves tying a red heart-shaped knot from two red silk cords on a lacquer tray, a small lantern, a bright river of stars in the sky above a palace garden, no people shown beyond the hands"),
('ev','q72-dt-hen',1,"dusk at the small back gate of a palace compound, the door ajar with a warm slit of lantern light, a hanging lantern, a hand holding a silk handkerchief reaching out, a farewell moment, no faces, willow branches"),
('ev','q72-dt-thu',0,"an embroidered perfume sachet with a pink lotus pattern and a tassel passed from one hand to another across a carved window of a palace corridor, soft spring light, no faces"),
]
EVT=("Landscape 4:3 banner illustration for a Chinese imperial harem drama game dialog. Scene: {sc}. Composition: wide landscape, key action in the central horizontal band, nothing important at the top or bottom edges. "
 "Semi-realistic painterly guofeng court illustration, near-3D soft light, matching the reference style. Hands anatomically correct with five fingers, no fused hands. Han/Ming cross-collar hanfu with wide sleeves, never qipao or Qing. No blood. No text, letters, Chinese characters, plaques, seals or signature anywhere.")
if __name__=='__main__':
    for kd,k,d,s in S:
        if kd=='ev': print(f"{kd}|{k}|{ENIGHT if d else EDAY}|"+EVT.format(sc=s))
        else: print(f"{kd}|{k}|{NIGHT if d else DAY}|"+HEAD.format(s=s)+(DK if d else BR)+TAIL)
