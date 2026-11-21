#!/usr/bin/env python3
"""M2179-01 = M2174-04 (Tần), -02 = M2174-05 (Phi), -03 = M2178-01 (Quý phi) + owner L2179 hem just touching the floor, no trail;
+ owner L2180 Phi vân kiên about as long as the Tần's, never shorter (Tần wording matched). THUROOT5, words only, A54/A55."""
import pathlib
R = pathlib.Path(__file__).resolve().parents[4]; P = R / "dev/handover/prompts_L2095"; D = pathlib.Path(__file__).parent
HEM = "floor-length robe, the hem just touching the floor all round, no train, no trail behind her, nothing pooling or extending behind her, only slipper toe tips peeking under the front hem,"
J = {
 1: ("M2174-04_s62_t4_thu.txt", "M2179-01_s62_t4_thu.txt", "M2174-04", [
     ("floor-length robe, its hem just brushing the floor with a very short soft trail behind her (the shortest trail of all: Tần least, then Phi, Quý phi, Hoàng quý phi, Hoàng hậu longest), only slipper toe tips peeking under the front hem,", HEM),
     ("ending AT the shoulder points (a little longer than the Quý nhân's, shorter than the Phi's (",
      "its lobes reaching the shoulder points and just over them (a little longer than the Quý nhân's, about as long as the Phi's (")]),
 2: ("M2174-05_s62_t5_thu.txt", "M2179-02_s62_t5_thu.txt", "M2174-05", [
     ("floor-length robe, its hem brushing the floor with a short soft trail behind her, a little longer than the Tần's, clearly shorter than the Quý phi's, only slipper toe tips peeking under the front hem,", HEM),
     ("ending JUST past the shoulder points at the very top of the upper arms (a little longer than the Tần's (",
      "its lobes reaching the shoulder points and just over them (about as long as the Tần's, never shorter (")]),
 3: ("M2178-01_s62_t6_thu.txt", "M2179-03_s62_t6_thu.txt", "M2178-01", [
     ("floor-length robe, reaching the floor and pooling softly with a soft trail behind her, longer than the Phi's, only slipper toe tips peeking under the front hem,", HEM)]),
}
for n, (base, out, oc, reps) in J.items():
    s = (P / base).read_text()
    for o, w in reps:
        assert s.count(o) == 1, (n, o[:60], s.count(o)); s = s.replace(o, w, 1)
    s = s.replace(f'"{oc}"', f'"M2179-0{n}"'); assert s.rstrip().endswith(f'"M2179-0{n}"')
    assert "trail behind her," not in s.replace("no trail behind her,", "")
    (D / out).write_text(s); (P / out).write_text(s)
    (D / (out + ".keep")).write_text(f"base: dev/handover/prompts_L2095/{base}\n" + "".join(f"allow: {o}  # owner L2179/L2180 via ROOT-B4\n" for o, _ in reps))
    print(out, len(s))
