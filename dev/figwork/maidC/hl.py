HL={1:"the simplest form: a single plain {col} dot or one simple painted stroke hinting at {mot}, flat paint, no detail",
2:"{mot} painted in {col} with a clear recognisable shape, flat paint, no outline, no gold",
3:"{mot} finely painted in {col} with added detail: a tiny contrasting centre (stamen) and fine petal veins or inner lines, still no gold",
4:"{mot} painted in {col} with every edge outlined in a thin line of shimmering gold, the first touch of gold",
5:"{mot} cut from thin gold leaf, layered with {col} paint inside the gold shape, gold and colour together",
6:"{mot} of gold leaf with {col} inlay and ONE tiny seed pearl at its centre",
7:"Imperial Noble Consort level: {mot} as an exquisite symmetrical gold FILIGREE ornament (fine openwork gold wire), set with tiny seed pearls and ONE small red gemstone at its centre, splendid and jewel-like yet small",
8:"Empress level, the most beautiful of all: a tiny gold FILIGREE phoenix with spread wings (or a peony) cradling {mot} at its heart, inlaid with brilliant kingfisher-blue enamel and tiny seed pearls, unmistakably the Mother of the realm, yet still small"}
# owner 11/14 (later): size grows a LITTLE per rank, ~+5% each: t1 = c03 t1 cinnabar flower size, t8 ~1.4x t1; never big
HS={1:"tiny, fingertip-sized (like a classic small red flower mark between the brows)",2:"tiny, fingertip-sized",
3:"small, fingertip-sized, a hair larger than the lowest ranks",4:"small, a touch larger than the lowest ranks",
5:"small, slightly larger than the lowest ranks",6:"small, slightly larger than the lowest ranks",
7:"compact, a little larger than the lower ranks (about one third larger than the smallest)",
8:"the largest of all ranks yet still compact (about two fifths larger than the smallest), sitting neatly between the brows"}
def hdesc(t,mot,col):
    return HL[t].format(mot=mot,col=col)+"; size: "+HS[t]+"; it grows only a little with rank, NEVER big, never covering more than a small part of the forehead, never touching or spreading onto the brows or cheeks"
