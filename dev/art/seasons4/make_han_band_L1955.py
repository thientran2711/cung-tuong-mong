# HAN6, owner L1955 (via Foreman C #27): make the OUTER collar band DEEPER so the 3 bands separate. Band colour words only.
# t1/t2 base = L1928 files (approved L1953); t3 base = s62_t3_HAN_BOW_L1953.txt (L1928 + centre bow).
OLD = "outer deep peach-blossom pink embroidered in gold"
NEW = "outer deep dusky rose pink, clearly darker than the robe, embroidered in gold"
for t, base, out_name in ((1, "s62_t1_HAN_COLLAR_L1928.txt", "s62_t1_HAN_COLLAR_L1955.txt"),
                          (2, "s62_t2_HAN_COLLAR_L1928.txt", "s62_t2_HAN_COLLAR_L1955.txt"),
                          (3, "s62_t3_HAN_BOW_L1953.txt", "s62_t3_HAN_BOW_L1955.txt")):
    src = open(base, encoding="utf-8").read()
    assert src.count(OLD) == 1
    out = src.replace(OLD, NEW)
    open(out_name, "w", encoding="utf-8").write(out)
    open(out_name + ".keep", "w", encoding="utf-8").write(
        f"base: dev/art/seasons4/{base}\n"
        "allow: outer deep peach-blossom pink embroidered in gold   # owner L1955 (via Foreman C #27): outer collar band deeper so the 3 bands separate\n")
    print(out_name, len(out))
