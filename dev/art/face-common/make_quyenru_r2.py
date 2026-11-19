"""Quyến rũ round 2 (owner Lượt 712): s33 s35 s36 s38 — change ONLY the allure/expression wording.
Base = the NF4 prompt file (s35/s38: v5b, the NSFW-safe one). Writes sNN.v5r2.FULL.txt."""
import pathlib, sys
D = pathlib.Path(__file__).parent
BASE = {"s33": "s33.v5", "s35": "s35.v5b", "s36": "s36.v5", "s38": "s38.v5b"}
OLD_COMMON = "eyes fully open and bright (never half-closed, sleepy or hooded)"
NEW_COMMON = "eyes open and bright (never closed, never sleepy)"
OLD_FACE = "fully open, the gaze lingering and inviting"
NEW_FACE = "the gaze lingering, captivating and inviting"
EXPR_TAIL = "a knowing half-smile with the full lips closed, one corner lifted more than the other, eyes fully open, never a stretched grin."
NEW_EXPR = ("Expression: an ALLURING, captivating look: the head tilted to one side and the chin lowered a little, "
            "a languid half-lidded gaze straight at the viewer from under long lashes (the upper lids lowered a little, "
            "the eyes still open, both irises fully visible and aligned), one brow faintly raised, a knowing sly slight smile "
            "with the full lips closed, one lip corner lifted more than the other, a confident teasing charm; "
            "never a wide-eyed innocent look, never a sweet broad smile, never a stretched grin.")
for sid, base in BASE.items():
    t = (D / f"{base}.FULL.txt").read_text()
    i = t.index("Expression:"); j = t.index(EXPR_TAIL, i) + len(EXPR_TAIL)
    t = t[:i] + NEW_EXPR + t[j:]
    for a, b in ((OLD_COMMON, NEW_COMMON), (OLD_FACE, NEW_FACE)):
        assert t.count(a) == 1, (sid, a); t = t.replace(a, b)
    (D / f"{sid}.v5r2.FULL.txt").write_text(t)
    print(sid, len(t))
