# item-ladder-8ranks — the owner's 3f table in use (N8b, Lượt 434 + correction Lượt 438)

Owner (Lượt 438): "Cái bảng mỗi bậc cầm một món riêng, đã có cái bảng đó rồi mà, tôi đã lập cái bảng đó rồi." = FIGURE_GATE rule 3f FIXED ITEM LIST PER RANK (10 items per rank, t1 Đáp ứng … t8 Hoàng hậu, approved 18/11 ~17:15Z).
Rule now in build_all.py (`_install_ladder`, replaces my invented version): for each person and age, rank tN takes ONE item VERBATIM from the 3f list of rank tN (build.py L3F[1..6], ITEMS7 = t7, ITEMS = t8; identical to the FIGURE_GATE list apart from the tail words 'held in the hand'). Nothing is invented; an item listed at one rank is never used at another, so the 8 ranks hold 8 different items. Rotation: list index = (person number − 1) + 3 × (age step a18=0, a26=1, a36=2, a51=3, a65=4), mod 10 → neighbours differ and every age of one person gets its own item (3f EVERY AGE ITS OWN ITEM). 3c (item contrasts with the robe: 'in a contrasting colour, not the robe colour') and 3e (value = rank) stay in the store text. Nữ đế and the other states (H lists) are untouched.

## The 3f lists in use (index 0..9)

**t1**: 0. a plain silk round fan with a bamboo handle | 1. an embroidered silk handkerchief | 2. a small woven bamboo flower basket | 3. a sprig of fresh plum blossoms | 4. a plain paper folding fan | 5. a thread-bound book | 6. a small embroidery hoop with silk | 7. a small bamboo flute | 8. a small silk lantern on a short bamboo stick | 9. a simple embroidered cloth sachet

**t2**: 0. a silk round fan with a lacquered handle and a small tassel | 1. an embroidered silk sachet with a tassel | 2. a painted paper folding fan | 3. a poetry book with a silk cover | 4. a small porcelain vase with a flower sprig | 5. an embroidery hoop with a fine silk scene | 6. a jade-bead tassel ornament | 7. a silk-covered lantern with a tassel | 8. a small lacquered comb box | 9. a bamboo flute with a silk tassel

**t3**: 0. an embroidered silk round fan with a silk tassel | 1. a small red-lacquered box | 2. a painted scroll with wooden rollers | 3. a painted silk folding fan with bone ribs | 4. a small celadon vase with a flower sprig | 5. a silver hand mirror | 6. an embroidered silk palace lantern | 7. a silver-mounted thread-bound book | 8. a carved peach-wood comb in a silk case | 9. a small silver-wire flower basket

**t4**: 0. a round fan with a carved jade handle and jade tassel | 1. a sandalwood folding fan with carved ribs | 2. a lacquered jewel box | 3. a scroll with jade rollers | 4. a jade disc pendant on a silk cord | 5. a silver-and-enamel hand mirror | 6. a small cloisonné vase with flowers | 7. a gauze palace lantern with a jade pendant | 8. a silver-mounted book box | 9. a small white-jade vase with blossoms

**t5**: 0. a round fan with a gold-inlaid handle and gem tassel | 1. a gilded lacquer box | 2. a painted scroll with gold fittings | 3. an ivory folding fan with gold leaf | 4. a cloisonné enamel vase with flowers | 5. a gold-and-jade hand mirror | 6. a gilded silver flower basket | 7. a silver-gilt palace lantern with pearl tassels | 8. a coral-and-pearl bead tassel ornament | 9. a gold-mounted embroidered silk book

**t6**: 0. a white-jade ruyi | 1. a jewelled box | 2. a round fan with a carved jade-and-gold handle and pearls | 3. a gold-and-pearl hand mirror | 4. a white-jade vase with gold mounts and flowers | 5. a pearl-embroidered silk folding fan with jade ribs | 6. a carved jade incense box | 7. a small coral branch on a gold stand | 8. a pearl-tasselled silk lantern with a jade top | 9. a gold-mounted jade pendant on a silk cord

**t7**: 0. a gilded hand censer | 1. an imperial round fan with a gold filigree frame and gems | 2. a gold-filigree jewel casket set with gems | 3. a kingfisher-feather folding fan with gold ribs | 4. a gold lotus-shaped incense box | 5. a gold hand mirror set with gems | 6. a gold-mounted jade vase with peonies | 7. a gold-filigree palace lantern with gem tassels | 8. a gold flower basket set with gems | 9. a gold-and-coral bead string held as a hand ornament

**t8**: 0. a gold ruyi set with gems | 1. an imperial phoenix-embroidered round fan with a gold-and-jade handle and pearl tassels | 2. a gold-mounted imperial scroll | 3. a gold phoenix seal box | 4. a phoenix-headed gold hand mirror with pearls | 5. a gold phoenix-shaped incense ball | 6. a kingfisher-and-pearl phoenix folding fan with gold ribs | 7. a gold lidded jewel casket with a phoenix and pearls | 8. an imperial book bound in gold-thread silk | 9. a gold phoenix palace lantern with pearl tassels

## Three example people (a18)

**c06** (index 5 at a18):
- t1: a thread-bound book
- t2: an embroidery hoop with a fine silk scene
- t3: a silver hand mirror
- t4: a silver-and-enamel hand mirror
- t5: a gold-and-jade hand mirror
- t6: a pearl-embroidered silk folding fan with jade ribs
- t7: a gold hand mirror set with gems
- t8: a gold phoenix-shaped incense ball

**m07** (index 6 at a18):
- t1: a small embroidery hoop with silk
- t2: a jade-bead tassel ornament
- t3: an embroidered silk palace lantern
- t4: a small cloisonné vase with flowers
- t5: a gilded silver flower basket
- t6: a carved jade incense box
- t7: a gold-mounted jade vase with peonies
- t8: a kingfisher-and-pearl phoenix folding fan with gold ribs

**m29** (index 8 at a18):
- t1: a small silk lantern on a short bamboo stick
- t2: a small lacquered comb box
- t3: a carved peach-wood comb in a silk case
- t4: a silver-mounted book box
- t5: a coral-and-pearl bead tassel ornament
- t6: a pearl-tasselled silk lantern with a jade top
- t7: a gold flower basket set with gems
- t8: an imperial book bound in gold-thread silk

Same person at other ages, e.g. m07 t1: a18 = a small embroidery hoop with silk; a26 = a simple embroidered cloth sachet; a36 = a small woven bamboo flower basket; a51 = a thread-bound book; a65 = a small silk lantern on a short bamboo stick
