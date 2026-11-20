# pets.py — PETS (owner 20/11, rule F17; FRUITPET1). Single source for build.py age_item() and the check_store gate.
# Owner verbatim (Lượt 1059): "Ok, vậy thì tôi duyệt cái thú cưng theo như cái khuyến nghị của bạn. Hoàng hậu, thái hậu là tôi nghĩ là chắc là bỏ hẳn
# thú cưng đi. Hoàng quý phi cũng bỏ hẳn thú cưng luôn. Nhưng mà quý phi thì vẫn có thể tương tác với mấy cái con vật được, mấy cái con nhỏ nhỏ được.
# Và theo độ tuổi nữa. Từ độ tuổi 36 trở lên á, là không có tương tác với thú cưng nữa. Sẽ cầm đồ vật. Tức là chỉ có 18-26 là mới có tương tác với thú cưng thôi."
# + Lượt 1057: "Thú cưng tôi không có muốn để bên cạnh là bởi vì tôi đang hiện tại có trong game cái option là nuôi thú cưng, cho nên là những cái con thú cưng
# này nó đã đứng ở bên cạnh nhân vật của tôi rồi." -> the animal is only IN CONTACT (held / perched on hand, wrist or finger), never beside her.
# Rules: ages a18 + a26 only; ranks kc (thiếu nữ / khuê các), t1–t6 only (none at t7 HQP, t8 HH, Thái hậu, triều phục, Nữ đế, ages 36+);
# >= 3 different people per (rank x age); no animal twice inside one rank (both ages together); the pet REPLACES that person's held item
# at that rank+age (E5: one item; the item colour sentence B16 stays, the animal's colour differs from both robe colours).
# People = the drawn persons m01–m52 (dev/art/KC_REFS.json), a person has at most ONE pet per age.
AGES = ["a18", "a26"]
RANKS = ["kc", "t1", "t2", "t3", "t4", "t5", "t6"]
# (en item text used after "holding", hand key, vn)
A = {
 "rabbit":   ("a small white rabbit cradled gently in her arms", "two", "thỏ trắng nhỏ ôm trong tay"),
 "kitten":   ("a little tabby kitten cradled against her chest", "two", "mèo con mướp ôm trước ngực"),
 "sparrow":  ("a little brown sparrow perched on her raised fingertip", "one", "chim sẻ đậu trên đầu ngón tay"),
 "bfly":     ("a small butterfly resting on her fingertip", "one", "bướm đậu trên đầu ngón tay"),
 "dove":     ("a small white dove perched on her hand", "one", "bồ câu trắng nhỏ đậu trên tay"),
 "canary":   ("a little yellow canary perched on her finger", "one", "chim hoàng yến đậu trên ngón tay"),
 "puppy":    ("a small fluffy white puppy held in her arms", "two", "chó con lông trắng ôm trong tay"),
 "lovebird": ("a pair of tiny lovebirds perched on her hand", "one", "đôi chim yến phụng đậu trên tay"),
 "parrot":   ("a small green parrot perched on her wrist", "one", "vẹt xanh nhỏ đậu trên cổ tay"),
 "nightingale": ("a little nightingale perched on her wrist", "one", "chim họa mi đậu trên cổ tay"),
 "cat":      ("a small white cat held gently in her arms", "two", "mèo trắng nhỏ bế nhẹ trong tay"),
 "bfly_hand": ("a butterfly resting on the back of her hand", "one", "bướm đậu trên mu bàn tay"),
 "oriole":   ("a little golden oriole perched on her finger", "one", "chim hoàng anh đậu trên ngón tay"),
 "dove_w":   ("a small white dove perched on her wrist", "one", "bồ câu trắng đậu trên cổ tay"),
 "songbird": ("a small songbird perched on her lightly raised finger", "one", "chim nhỏ đậu trên ngón tay khẽ nâng"),
 "whiteeye": ("a tiny white-eye bird perched on her lightly raised finger", "one", "chim vành khuyên đậu trên ngón tay khẽ nâng"),
 "kingfisher": ("a tiny kingfisher perched on her lightly raised finger", "one", "chim bói cá nhỏ đậu trên ngón tay khẽ nâng"),
 "swallow":  ("a little swallow perched on her lightly raised finger", "one", "chim én nhỏ đậu trên ngón tay khẽ nâng"),
}
# species key (no repeat of the SPECIES inside one rank: dove and dove_w are one species, butterflies are one species)
SPECIES = {k: {"bfly_hand": "bfly", "dove_w": "dove"}.get(k, k) for k in A}
POOL = {  # per rank: 6 animals = a18 three + a26 three (owner Lượt 1057 groups: low hold; Tần/Phi calmer, wrist/lap; Quý phi small bird on a raised finger / butterfly on the hand)
 "kc": ["rabbit", "sparrow", "bfly", "kitten", "dove", "canary"],
 "t1": ["kitten", "bfly", "dove", "rabbit", "sparrow", "lovebird"],
 "t2": ["sparrow", "rabbit", "canary", "bfly", "puppy", "kitten"],
 "t3": ["bfly", "kitten", "lovebird", "sparrow", "rabbit", "puppy"],
 "t4": ["parrot", "cat", "bfly_hand", "nightingale", "oriole", "dove_w"],
 "t5": ["nightingale", "bfly_hand", "cat", "parrot", "dove_w", "oriole"],
 "t6": ["songbird", "bfly_hand", "whiteeye", "kingfisher", "swallow", "canary"],
}
M = ["m%02d" % n for n in range(1, 53)]
def table():
    """-> {(rank, age): [(person, animal_key)] }  a18: m01–m21, a26: m27–m47 (a person at most one pet per age)."""
    out = {}
    for ri, r in enumerate(RANKS):
        for ai, a in enumerate(AGES):
            base = ai * 26 + ri * 3
            out[(r, a)] = [(M[base + j], POOL[r][ai * 3 + j]) for j in range(3)]
    return out
_T = None
def pet(person, tier, age):
    """-> (en item, hand key) when this person holds a pet at this tier + age, else None."""
    global _T
    if _T is None: _T = {(r, a, p): k for (r, a), L in table().items() for p, k in L}
    k = _T.get((tier, age, person))
    return (A[k][0], A[k][1]) if k else None
# two old spec5 poses (build.py SPEC5_POSES "numi") carry an animal; where pets are not allowed (t7+, Thái hậu, Nữ đế, triều phục, states, ages 36+)
# ONLY their animal words change (same pose pick, same gesture, so no other prompt moves): FRUITPET1, owner Lượt 1059.
DEPET = [("gazing sideways at a small butterfly resting on her raised finger", "gazing sideways at her lightly raised hand"),
         ("gazing at a small butterfly resting on her raised finger", "gazing at her lightly raised hand"),
         ("a small songbird perched on her raised finger, feeding it", "one hand raised gracefully at shoulder height, fingers softly curved")]
def depet(text):
    for a, b in DEPET: text = text.replace(a, b)
    return text
def check():
    bad = []; T = table()
    for (r, a), L in T.items():
        if r not in RANKS or a not in AGES: bad.append(f"PET-RANKAGE {r} {a}")
        if len({p for p, _ in L}) < 3: bad.append(f"PET-COUNT {r} {a} {len(L)} (< 3)")
    for r in RANKS:
        sp = [SPECIES[k] for a in AGES for _, k in T[(r, a)]]
        if len(sp) != len(set(sp)): bad.append(f"PET-REPEAT {r} {sp}")
    for a in AGES:
        ps = [p for r in RANKS for p, _ in T[(r, a)]]
        if len(ps) != len(set(ps)): bad.append(f"PET-PERSON-TWICE {a}")
    for k, (en, hk, vn) in A.items():
        if any(w in en for w in ("beside", "at her feet", "next to her", "by her side")): bad.append(f"PET-BESIDE {k}")
    return bad
# ---- KIDS (owner verbatim Lượt 1076, ROOT-68 relay 20/11 ~07:20Z: "Cung nữ nhà nghèo, nữ đế là không ôm thú cưng, công chúa trẻ con thì có ôm thú cưng." ; FRUITPET2)
# Công chúa kid-f01–f24 at every drawn age (a4 a9 a14 a20; figwork/kids/kjobs.json lineups) + trẻ con = Hoàng tử kid-p01–p24 at the CHILD ages a4 a9 a14
# (kid-p a20 = a grown man, not a child -> no pet). Same rules as above: in contact only, the pet REPLACES the held item (build_npc.kid()),
# >= 3 children per group x age, no species twice inside one group (all its ages together), a child at most one pet; small child-suitable animals.
# Maids (tm*, ma ma), nhà nghèo / lãnh cung, Nữ đế: NO pets (owner, same quote) -> not in RANKS / KID_AGES, gate PET_SCOPES excludes them.
KID_AGES = {"kf": ["a4", "a9", "a14", "a20"], "kp": ["a4", "a9", "a14"]}
# (en clause with {p} = her/his, vn)
KA = {
 "k_rabbit":   ("hugging a small white rabbit in {p} arms", "ôm thỏ trắng nhỏ trong tay"),
 "k_chick":    ("a fluffy yellow chick cupped gently in {p} small hands", "chú gà con vàng nâng trong hai bàn tay"),
 "k_kitten":   ("hugging a little tabby kitten against {p} chest", "ôm mèo con mướp trước ngực"),
 "k_bfly":     ("a small butterfly resting on {p} raised fingertip", "bướm đậu trên đầu ngón tay"),
 "k_puppy":    ("hugging a small fluffy white puppy in {p} arms", "ôm chó con lông trắng trong tay"),
 "k_dove":     ("a small white dove perched on {p} hand", "bồ câu trắng nhỏ đậu trên tay"),
 "k_canary":   ("a little yellow canary perched on {p} finger", "chim hoàng yến đậu trên ngón tay"),
 "k_turtle":   ("a tiny turtle resting on {p} open palm", "rùa con trên lòng bàn tay"),
 "k_whiteeye": ("a tiny white-eye bird perched on {p} lightly raised finger", "chim vành khuyên đậu trên ngón tay khẽ nâng"),
 "k_lovebird": ("a pair of tiny lovebirds perched on {p} hand", "đôi chim yến phụng đậu trên tay"),
 "k_oriole":   ("a little golden oriole perched on {p} finger", "chim hoàng anh đậu trên ngón tay"),
 "k_parrot":   ("a small green parrot perched on {p} wrist", "vẹt xanh nhỏ đậu trên cổ tay"),
 "k_duckling": ("a fluffy yellow duckling cupped gently in {p} small hands", "vịt con vàng nâng trong hai bàn tay"),
 "k_sparrow":  ("a little brown sparrow perched on {p} raised fingertip", "chim sẻ đậu trên đầu ngón tay"),
 "k_myna":     ("a small black myna bird perched on {p} wrist", "chim sáo đen nhỏ đậu trên cổ tay"),
}
KSPECIES = {k: k for k in KA}   # every key is its own species (kitten = the only cat, one dove, one butterfly per group)
# group -> age -> [(child, animal)]; animal colour chosen against the child's palette (build_npc FP/PP: no white pet on a white robe, no yellow on yellow)
KIDS = {
 "kf": {"a4":  [("f01", "k_rabbit"), ("f02", "k_chick"), ("f03", "k_kitten")],
        "a9":  [("f04", "k_bfly"), ("f05", "k_puppy"), ("f06", "k_dove")],
        "a14": [("f07", "k_canary"), ("f08", "k_turtle"), ("f09", "k_whiteeye")],
        "a20": [("f10", "k_lovebird"), ("f11", "k_oriole"), ("f12", "k_parrot")]},
 "kp": {"a4":  [("p01", "k_puppy"), ("p02", "k_duckling"), ("p03", "k_rabbit")],
        "a9":  [("p04", "k_sparrow"), ("p05", "k_turtle"), ("p06", "k_kitten")],
        "a14": [("p07", "k_myna"), ("p08", "k_canary"), ("p09", "k_dove")]},
}
def kid_pet(jid, age):
    """jid 'f01' / 'p07' -> en pet clause (replaces the held-item clause of build_npc.kid) or None."""
    g = "kf" if jid[0] == "f" else "kp"
    for c, k in KIDS[g].get(age, []):
        if c == jid: return KA[k][0].format(p="her" if g == "kf" else "his")
    return None
def kid_check():
    bad = []
    for g, ages in KIDS.items():
        if list(ages) != KID_AGES[g]: bad.append(f"KIDPET-AGES {g} {list(ages)}")
        sp = []
        for a, L in ages.items():
            if len({c for c, _ in L}) < 3: bad.append(f"KIDPET-COUNT {g} {a}")
            sp += [KSPECIES[k] for _, k in L]
        if len(sp) != len(set(sp)): bad.append(f"KIDPET-REPEAT {g} {sp}")
        ch = [c for L in ages.values() for c, _ in L]
        if len(ch) != len(set(ch)): bad.append(f"KIDPET-CHILD-TWICE {g}")
    for k, (en, vn) in KA.items():
        if any(w in en for w in ("beside", "at her feet", "at his feet", "next to", "by her side", "by his side")): bad.append(f"KIDPET-BESIDE {k}")
    return bad
_check_ranks = check
def check(): return _check_ranks() + kid_check()
if __name__ == "__main__":
    import sys
    if sys.argv[1:2] == ["check"]: b = check(); print("\n".join(b)); print("bad", len(b)); sys.exit(1 if b else 0)
    print("| Bậc | Tuổi | Người → thú cưng (tiếp xúc) |\n|---|---|---|")
    for (r, a), L in table().items(): print(f"| {r} | {a} | " + " · ".join(f"{p} → {A[k][2]}" for p, k in L) + " |")
    for g, ages in KIDS.items():
        for a, L in ages.items(): print(f"| {'Công chúa kid-f' if g == 'kf' else 'Hoàng tử kid-p'} | {a} | " + " · ".join(f"{g[1]}{c[1:]} → {KA[k][1]}" for c, k in L) + " |")
