# HAN6, owner L1928 (via Foreman C #26): t1-t3 collar bands melt (middle = innermost = ivory white, outer = robe pink).
# ONLY change: the band colour words inside the frozen BANDS line (G62 allows per-rank colour names).
# robe peach-blossom pink -> outer DEEP peach-blossom pink, middle PALE BLUSH PINK, innermost ivory white
# (= same dark->mid->white step as approved t5: plum -> bright blush pink -> ivory white). Nothing else touched.
OLD = "(outer peach-blossom pink embroidered in gold, middle ivory white, innermost ivory white)"
NEW = "(outer deep peach-blossom pink embroidered in gold, middle pale blush pink, innermost ivory white)"
for t in (1, 2, 3):
    src = open(f"s62_t{t}_HAN_COLLAR_L1915.txt", encoding="utf-8").read()
    assert src.count(OLD) == 1
    out = src.replace(OLD, NEW)
    if t == 2:  # fit 10 000: eyes boilerplate dup (same meaning as "never cross-eyed, never wall-eyed")
        TRIM = ", never looking in two directions"
        assert out.count(TRIM) == 1; out = out.replace(TRIM, "")
    open(f"s62_t{t}_HAN_COLLAR_L1928.txt", "w", encoding="utf-8").write(out)
    open(f"s62_t{t}_HAN_COLLAR_L1928.txt.keep", "w", encoding="utf-8").write(
        f"base: dev/art/seasons4/s62_t{t}_HAN_COLLAR_L1915.txt\n"
        "allow: outer peach-blossom pink embroidered in gold, middle ivory white   # owner L1928 (via Foreman C #26): t1-t3 collar bands melt into the pink robe; middle = innermost white -> band colour words only\n" + ("allow: never looking in two directions   # L1928 fit 10 000, eyes boilerplate dup\n" if t == 2 else ""))
    print(t, len(out))
