#!/usr/bin/env python3
"""HAIR1 (Foreman C #15, owner order 21/11 'mỗi một bậc là mỗi một kiểu tóc khác nhau'): build the hairstyle table.

Source of truth = the CATALOGUE below. Output:
  dev/art/hair/HAIR_TABLE.json          full table (catalogue + per person x 8 ranks, VN + EN)
  dev/art/hair/HAIR_TABLE_builder.json  flat {pid: {t1..t8: {code, en_a18, en_a36}}} for builders
Run: python3 dev/art/hair/make_hair_table.py   then   python3 dev/art/hair/check_hair_table.py

DESIGN
- A style = SHAPE (10 per rank, rank-specific: no shape is reused in another rank) x POSITION/SIDES (3) x WRAP (3) = 90 per rank,
  i.e. exactly one distinct style per consort per rank (roster = 90 = palettes_season_L1583.json, 86 + s62-s65).
- t1-t3 (F1): only the TOP part is gathered (the bun), most hair hangs loose; a 4th axis LOOSE PART (3) = (S+P+W) mod 3.
  At a36/a51/a65 (F11: hair UP for everyone) the loose part is replaced by 'the rest gathered into a neat low knot at the nape'.
- t4-t8 (F1/G12): all hair up; POSITION axis = the side hair framing the face (visible from the front, also under t7/t8 crowns).
- Person i (roster sorted c,m,s) gets cell (i*K[t] + O[t]) mod 90 at rank t: a bijection per rank -> no duplicate inside a rank;
  shapes are rank-disjoint -> 8 different styles per person.
- Hairpins/flower/crown words (F2 F5 F13 G39 t7/t8 crowns) are NOT touched: this sentence only names the hairstyle.
- No Qing words (F14), no animal words (PET gate), no flower-shaped buns (F13 one flower only), no 'crown' at t1-t6.
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
PAL = os.path.join(ROOT, "dev/art/face-common/palettes_season_L1583.json")

RANK_VI = {1: "Đáp ứng", 2: "Thường tại", 3: "Quý nhân", 4: "Tần", 5: "Phi", 6: "Quý phi", 7: "Hoàng quý phi", 8: "Hoàng hậu"}

# ---- SHAPES: (code, VN name, EN words). 10 per rank, all different across ranks. ----
SHAPES = {
 1: [  # Đáp ứng: small, simple top buns (half-up)
  ("A01", "Búi tròn nhỏ (tiểu viên kế)", "a small neat round bun"),
  ("A02", "Búi ốc nhỏ (tiểu loa kế)", "a small spiral bun coiled like a seashell"),
  ("A03", "Một vòng tóc nhỏ (đơn hoàn)", "a single small smooth hair loop"),
  ("A04", "Búi nút thắt (kết kế)", "a small bun tied like a simple soft knot"),
  ("A05", "Búi giọt nước", "a small teardrop-shaped bun"),
  ("A06", "Búi cuộn dẹt", "a small flat coil lying close to the head"),
  ("A07", "Hai bím nhỏ gom thành búi", "two thin braids from her temples joined into one small bun"),
  ("A08", "Búi cuộn chữ S", "a small S-shaped coil"),
  ("A09", "Búi nơ nhỏ (hai vòng tí hon)", "a tiny bow-shaped bun of two very small loops"),
  ("A10", "Búi cuốn dọc", "a small upright rolled bun"),
 ],
 2: [  # Thường tại: medium half-up buns, a little fuller
  ("B01", "Song nha kế (hai búi tròn đôi)", "two small round buns side by side"),
  ("B02", "Song hoàn (hai vòng tóc)", "two smooth hair loops side by side"),
  ("B03", "Thùy hoàn (hai vòng rủ hai bên)", "two soft loops hanging at both sides of her head"),
  ("B04", "Búi trái tim (hai thùy cong)", "a heart-shaped bun of two curved lobes"),
  ("B05", "Một vòng tóc đứng cao", "one tall upright hair loop"),
  ("B06", "Tam kế (ba búi nhỏ thành hàng)", "three small buns in a row"),
  ("B07", "Thập tự kế (hai vòng bắt chéo)", "a cross-shaped bun of two crossed loops"),
  ("B08", "Búi bím cuộn tròn", "a round bun coiled from one braid"),
  ("B09", "Búi nguyên bảo nhỏ", "a small ingot-shaped bun raised at both ends"),
  ("B10", "Búi hai tầng nhỏ", "a small two-tier bun, one small coil on top of another"),
 ],
 3: [  # Quý nhân: fuller half-up buns, still most hair loose (F1)
  ("C01", "Song hoàn vọng tiên (hai vòng lớn)", "two larger round loops rising like soft rings"),
  ("C02", "Bách hợp kế (nhiều vòng gấp)", "several smooth folded loops gathered together"),
  ("C03", "Tùy vân kế (búi mây cuộn)", "a cloud-like bun of soft curved swirls"),
  ("C04", "Linh xà kế (dải xoắn uốn lượn)", "one long twisted coil curving in a soft wave"),
  ("C05", "Đọa mã kế (búi ngả một bên)", "a soft bun drooping gracefully to one side"),
  ("C06", "Phi tiên kế nhỏ (ba vòng đứng)", "three small upright loops"),
  ("C07", "Bán phiên kế (búi lật nửa)", "a half-flipped bun folded forward"),
  ("C08", "Song loa kế lớn (hai búi ốc)", "two larger spiral buns"),
  ("C09", "Búi kép ngang (hai cuộn nằm)", "a wide bun of two rolls lying side by side"),
  ("C10", "Một vòng lớn ôm ngang đầu", "one large loop lying across the top of her head"),
 ],
 4: [  # Tần: all up, first full up-dos
  ("D01", "Cao kế tròn", "a tall round chignon"),
  ("D02", "Song kế cao (hai búi cao)", "two tall buns side by side"),
  ("D03", "Hai vòng đứng cao", "two tall upright loops"),
  ("D04", "Búi nguyên bảo cao", "a tall ingot-shaped chignon raised at both ends"),
  ("D05", "Loa kế cao (búi ốc cao)", "a tall spiral chignon"),
  ("D06", "Búi ba tầng nhỏ", "a chignon of three small stacked coils"),
  ("D07", "Phản oản kế (búi gập ngược)", "a chignon folded back on itself"),
  ("D08", "Ba tiêu kế (búi lá dài)", "a tall smooth leaf-shaped chignon"),
  ("D09", "Đọa mã kế cao (búi cao ngả)", "a high chignon leaning softly to one side"),
  ("D10", "Búi bím lớn", "a large chignon coiled from one thick braid"),
 ],
 5: [  # Phi: taller, more elaborate
  ("E01", "Lăng vân kế (búi vút mây)", "a tall chignon swept upward like rising clouds"),
  ("E02", "Vọng tiên kế (hai vòng cao)", "two tall rings rising high"),
  ("E03", "Hai thùy vút lên", "two smooth lobes swept upward and outward"),
  ("E04", "Bàn hoàn kế (búi quấn vòng)", "a chignon coiled round and round in rings"),
  ("E05", "Đồng tâm kế (vòng lồng vòng)", "a concentric chignon of rings within rings"),
  ("E06", "Bách hợp kế cao", "a tall chignon of many folded loops"),
  ("E07", "Song đao bán phiên (hai thùy dẹt)", "two tall flat folded lobes side by side"),
  ("E08", "Búi đầy nhiều lớp cuộn", "a full, wide rounded chignon of layered rolls"),
  ("E09", "Thập tự kế cao", "a tall cross-shaped chignon of two crossed loops"),
  ("E10", "Hai dải xoắn vút cao", "two twisted coils rising together"),
 ],
 6: [  # Quý phi: grandest without crown (big gold headdress sits on it)
  ("F01", "Nga kế (búi cao vút)", "a very tall lofty chignon"),
  ("F02", "Tam hoàn cao (ba vòng cao)", "three tall rings rising high"),
  ("F03", "Phi tiên kế lớn", "tall upswept loops reaching high"),
  ("F04", "Song loa cao lớn", "two big tall spiral buns"),
  ("F05", "Búi trăng khuyết rộng", "a wide crescent-shaped chignon"),
  ("F06", "Búi bốn tầng", "a tall four-tier chignon"),
  ("F07", "Vân kế lớn (mây cuộn lớn)", "a big chignon of large cloud swirls"),
  ("F08", "Bán phiên kế lớn", "a large half-flipped upright lobe"),
  ("F09", "Một vòng tròn lớn đứng", "one large upright ring chignon"),
  ("F10", "Búi kép trước sau", "a double chignon, one bun in front of another"),
 ],
 7: [  # Hoàng quý phi: chignon under the phoenix crown (crown words unchanged)
  ("G01", "Búi cao đơn dưới mũ", "a tall single chignon"),
  ("G02", "Hai vòng nhô sau mũ", "a chignon with two rings rising behind the headdress"),
  ("G03", "Ba cuộn nhỏ sau mũ", "a chignon with three small coils at the back"),
  ("G04", "Búi xòe rộng phía sau", "a wide chignon spreading out behind"),
  ("G05", "Búi có vòng bím ở chân", "a chignon ringed at its base by a braid"),
  ("G06", "Búi cao ngả ra sau", "a high chignon tilted backward"),
  ("G07", "Búi tròn kèm cuộn hai bên", "a rounded chignon with a small coil on each side"),
  ("G08", "Búi tầng bậc", "a stepped tiered chignon"),
  ("G09", "Búi mây cuộn", "a chignon of cloud swirls"),
  ("G10", "Búi xoắn thừng lớn", "a chignon of large twisted strands"),
 ],
 8: [  # Hoàng hậu: chignon under the nine-phoenix crown
  ("H01", "Búi đại cao kế", "a grand very tall chignon"),
  ("H02", "Búi rộng ngang vai mũ", "a wide chignon as broad as the headdress"),
  ("H03", "Búi đôi vòng lớn sau mũ", "a chignon with two large rings at the back"),
  ("H04", "Búi vòng đồng tâm lớn", "a large concentric ring chignon"),
  ("H05", "Búi cuộn xòe nửa vòng phía sau", "a chignon of rolls spreading in a half-circle behind"),
  ("H06", "Búi đầy tròn thấp phía sau", "a full round chignon set low behind the headdress"),
  ("H07", "Búi ba tầng lớn", "a grand three-tier chignon"),
  ("H08", "Búi hai thùy lớn hai bên", "a chignon with two large smooth lobes at both sides"),
  ("H09", "Búi bím đôi quấn", "a chignon wound from two braids"),
  ("H10", "Búi cuộn sóng lớn", "a chignon of large wave-like rolls"),
 ],
}

# POSITION (t1-t3 = where the bun sits; t4-t8 = side hair framing the face)
POS_LOW = [("đỉnh đầu", "on the top of her head"),
           ("sau đầu, cao", "high at the back of her head"),
           ("sau đầu, ngang tai", "at the back of her head at ear level")]
POS_UP = [("mai gọn sát", "the side hair sleek and close to the head"),
          ("mai phồng nhẹ", "the side hair softly puffed, framing her face"),
          ("mai vén cao lộ tai", "the side hair swept up showing her ears")]
WRAP = [("trơn mượt", "smooth and glossy"),
        ("quấn bím quanh chân", "wrapped at its base with a thin braid"),
        ("xoắn thừng", "made of softly twisted rope-like strands")]
LOOSE = [("xõa thẳng sau lưng", "the rest of her hair hanging straight and loose down her back"),
         ("xõa + 2 lọn trước vai", "the rest of her hair loose down her back, with two long locks falling in front of her shoulders"),
         ("xõa + 1 bím nhỏ trong tóc", "the rest of her hair loose down her back, with one thin braid among the loose hair")]
NAPE_A36 = ("búi gọn ở gáy (tuổi 36+)", "the rest of her hair gathered into a neat low knot at the nape, nothing hanging loose")

K = {1: 7, 2: 11, 3: 13, 4: 17, 5: 19, 6: 23, 7: 29, 8: 31}
O = {1: 0, 2: 5, 3: 17, 4: 29, 5: 41, 6: 53, 7: 61, 8: 73}
GROUP_ORDER = ["Dịu dàng", "Kiêu kỳ", "Lạnh lùng", "Quyến rũ", "Sắc sảo", "Đoan trang"]


def roster():
    p = json.load(open(PAL, encoding="utf-8"))
    ids = sorted(k for k in p if k[:1] in "cms" and k[1:].isdigit())
    return ids, {k: p[k].get("group", "") for k in ids}


def style(t, cell):
    s, r = divmod(cell, 9)
    pos, w = divmod(r, 3)
    code, svi, sen = SHAPES[t][s]
    if t <= 3:
        pvi, pen = POS_LOW[pos]
        lvi, len_ = LOOSE[(s + pos + w) % 3]
        wvi, wen = WRAP[w]
        full = f"{code}-P{pos}-W{w}-L{(s + pos + w) % 3}"
        vi = f"{svi} · {pvi} · {wvi} · {lvi}"
        a18 = (f"HAIRSTYLE (her own at this rank): only the top part of her hair is gathered into {sen}, {pen}, {wen}; {len_}.")
        a36 = (f"HAIRSTYLE (her own at this rank): the top part of her hair is gathered into {sen}, {pen}, {wen}; {NAPE_A36[1]}.")
        return dict(code=full, shape=code, vi=vi, vi_short=[svi, f"{pvi} · {wvi}", lvi], en_a18=a18, en_a36=a36)
    pvi, pen = POS_UP[pos]
    wvi, wen = WRAP[w]
    full = f"{code}-P{pos}-W{w}"
    under = " beneath the headdress" if t >= 7 else ""
    en = f"HAIRSTYLE (her own at this rank): all her hair swept up into {sen}{under}, {wen}, {pen}."
    return dict(code=full, shape=code, vi=f"{svi} · {wvi} · {pvi}", vi_short=[svi, wvi, pvi], en_a18=en, en_a36=en)


def main():
    ids, grp = roster()
    assert len(ids) == 90, len(ids)
    people = {}
    for i, pid in enumerate(ids):
        people[pid] = {"group": grp[pid], **{f"t{t}": style(t, (i * K[t] + O[t]) % 90) for t in range(1, 9)}}
    table = {
        "_note": "HAIR1 hairstyle table (owner order 21/11 via Foreman C #15). PROPOSAL — owner verdict pending. "
                 "One style per person per rank; no duplicate inside a rank; 8 different styles per person. "
                 "Proof: python3 dev/art/hair/check_hair_table.py. Builder form: HAIR_TABLE_builder.json / hair_words.py.",
        "status": "PROPOSAL — owner verdict pending",
        "roster": "palettes_season_L1583.json (90 = 86 consorts + s62–s65)",
        "rules_respected": ["F1 t1–t3 loose/half-up, t4–t8 all up", "F11 a36/a51/a65 hair up (t1–t3 loose part -> nape knot)",
                            "F14 no Qing headdress words", "F2/F5/F13/G39 flower + hairpin words untouched (this is only the hairstyle)",
                            "t7/t8 crown words untouched (style = chignon beneath the headdress)", "no flower-shaped buns (F13)",
                            "no animal words (PET gate)"],
        "axes": {"shape": {f"t{t}": [list(x) for x in SHAPES[t]] for t in SHAPES},
                 "position_t1_t3": POS_LOW, "sides_t4_t8": POS_UP, "wrap": WRAP, "loose_t1_t3_a18_a26": LOOSE,
                 "t1_t3_a36_plus": list(NAPE_A36)},
        "assign": {"formula": "cell = (i*K[t] + O[t]) mod 90; shape,rest = divmod(cell,9); pos,wrap = divmod(rest,3); loose = (shape+pos+wrap) mod 3",
                   "K": K, "O": O, "i": "index in sorted roster ids"},
        "group_order": GROUP_ORDER,
        "people": people,
    }
    json.dump(table, open(os.path.join(HERE, "HAIR_TABLE.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    flat = {pid: {t: {"code": v[t]["code"], "en_a18": v[t]["en_a18"], "en_a36": v[t]["en_a36"]} for t in v if t.startswith("t")}
            for pid, v in people.items()}
    json.dump(flat, open(os.path.join(HERE, "HAIR_TABLE_builder.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("wrote HAIR_TABLE.json + HAIR_TABLE_builder.json for", len(people), "people")


if __name__ == "__main__":
    main()
