#!/usr/bin/env python3
"""Vietnamese captions WITH accents for seal keys (owner: every preview / frame-sheet caption shows the Vietnamese name, never bare keys).
caption('th-act-vui') -> 'Hành động · Vui' ; caption('th-an') -> 'Ẩn – chưa rõ tâm trạng'. Unknown key -> the key itself."""
VI = {"an": "Ẩn – chưa rõ tâm trạng", "binh": "Bình thường", "buon": "Buồn", "chan": "Chán", "choang": "Choáng",
      "chuyentam": "Chuyên tâm", "dau": "Đau lòng", "dau2": "Đau lòng (vẽ lại)", "ghen": "Ghen", "gian": "Giận", "hanghai": "Hăng hái",
      "hon": "Hờn", "hothen": "Hổ thẹn", "hungkhoi": "Hưng khởi", "khochiu": "Khó chịu", "lo": "Lo", "muu": "Mưu", "so": "Sợ",
      "tinhnghich": "Tinh nghịch", "tinhtu": "Tình tứ", "tutin": "Tự tin", "vui": "Vui"}
WHO = {"th": "Thái hậu", "hh": "Hoàng hậu", "bg": "Bé gái"}
def caption(name, who=False):
    pre, _, k = name.partition("-")
    if not k: pre, k = "", name
    act = k.startswith("act-")
    base = k[4:] if act else k
    if base not in VI: return name
    c = ("Hành động · " if act else "") + VI[base]
    return (WHO.get(pre, pre) + " · " + c) if who and pre in WHO else c
if __name__ == "__main__":
    import sys
    for a in sys.argv[1:]: print(a, "->", caption(a, True))
