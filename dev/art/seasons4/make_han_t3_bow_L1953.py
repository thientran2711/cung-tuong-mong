# HAN6, owner L1953 (via Foreman C #27): Quý nhân t3 gOmr7RDSXO has no bow on the sash -> add a bow at the CENTRE front (G60).
# Base = s62_t3_HAN_COLLAR_L1928.txt (collar approved L1953). ONLY change: the sash words. Nothing else touched.
OLD = "a wide ivory white silk girdle edged with small pearls, no pendants"
NEW = "a wide ivory white silk girdle edged with small pearls, tied in a neat bow at the CENTRE front of the waist, the two bow loops and ends lying flat, no pendants"
src = open("s62_t3_HAN_COLLAR_L1928.txt", encoding="utf-8").read()
assert src.count(OLD) == 1
out = src.replace(OLD, NEW)
open("s62_t3_HAN_BOW_L1953.txt", "w", encoding="utf-8").write(out)
open("s62_t3_HAN_BOW_L1953.txt.keep", "w", encoding="utf-8").write(
    "base: dev/art/seasons4/s62_t3_HAN_COLLAR_L1928.txt\n"
    "allow: edged with small pearls, no pendants   # owner L1953 (via Foreman C #27): t3 add a bow on the sash at the centre front (G60)\n")
print(len(out))
