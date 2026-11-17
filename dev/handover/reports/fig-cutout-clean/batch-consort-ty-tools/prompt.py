#!/usr/bin/env python3
# prompt.py GESTURE_INDEX [AGE] -> short (<=110 words) generation prompt. AGE a18|a26|a36|a51
import sys
G=["holding a folded fan","holding a flower branch","fingertips adjusting a hairpin, other hand with a silk handkerchief","holding a rolled scroll","one hand lifting the wide sleeve","holding a small lantern","both hands holding a small teacup","holding a jade pendant between two fingers","hand resting on the other forearm, small folded fan"]
g=G[int(sys.argv[1])%len(G)]; age=sys.argv[2] if len(sys.argv)>2 else "a18"
A={"a26":"about 28 years old","a36":"about 40 years old, mature dignified","a51":"about 54 years old, dignified older beauty, faint fine lines, silver hints"}
if age=="a18":
    ident="Redraw image 1 as the same full-body figure: same hair, hairpins, outfit colours and embroidery. Face, porcelain skin and painterly finish like images 2-5."
else:
    ident="Redraw image 1 (same outfit, hair, "+A[age]+") as the same woman as image 2 (her new 18-year-old reference); face beauty, porcelain skin and finish like images 3-6."
print("Semi-realistic painterly guofeng portrait, near-3D soft light, fine detail. "+ident+" Beautiful face, soft round-almond warm eyes, serene faint smile, frontal or slightly angled toward viewer, never back-turned. Natural adult proportions (head 1/7.5 of height). Lively hands, five fingers: "+g+". TINY flower-shaped huadian on forehead (1/12 face width; no teardrop, no dot). NO long trailing train or fish-tail; hem ends at the feet, both shoes visible, all inside canvas with margin. FULLY TRANSPARENT BACKGROUND, real alpha, no checkerboard, no ground shadow.")
