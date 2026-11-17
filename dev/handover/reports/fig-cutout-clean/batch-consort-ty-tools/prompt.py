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
SHEET=len(sys.argv)>3 and sys.argv[3]=="sheet"
if SHEET: ident="Image 1 is a reference sheet of the OLD design (several near-identical figures of one outfit). Redraw it as ONE full-body figure with exactly this outfit, colours, embroidery trims, hairstyle and hairpins; do not change or add to the design (no extra layers, no streamer). Face, porcelain skin and painterly finish like images 2-5."
FLOW=len(sys.argv)>3 and sys.argv[3]=="flow"
if FLOW: ident="Image 1 is the OLD design of this consort (same outfit colours and hairstyle family). Redraw it as ONE full-body figure in the same colours but as a flowing consort robe: WIDE soft flowing sleeves, open crossed hanfu collar (no stand collar, no fitted bodice), long layered flowing front, a few consort hairpins with a flower. Face, porcelain skin and painterly finish like images 2-5."
if SHEET and age!="a18": ident="Image 1 is a reference sheet of the OLD design (near-identical figures of one outfit). Redraw it as ONE full-body figure with exactly this outfit, colours, embroidery trims, hairstyle and hairpins, the woman now "+A[age]+"; she is the same woman as image 2 (her new 18-year-old reference); face beauty, porcelain skin and painterly finish like images 3-6. Do not change or add to the design."
rich=len(sys.argv)>3 and sys.argv[3]=="rich"
RICH=" Rank rule: this consort must NOT look like a maid: clearly richer than a plain maid uniform, with ornate hairpins/small headdress, an embroidered outer layer, richer fabric and jewellery (same colour family as image 1)." if rich else ""
R2={"t1":" Rank Dap ung (lowest consort): her OWN outfit and colours from image 1 as a lighter simpler robe, plus ONE visible light outer layer (short jacket or sheer shawl) and a flower hairpiece with 2-3 pins; clearly not a maid uniform. Keep the hairstyle of image 1, vary only the pin/flower arrangement.","t2":" Rank Thuong tai: her OWN gown and colours from image 1 plus one embroidered outer robe or shawl, 2-3 pins and a modest headdress; no heavy brocade, no tall crown. Keep the hairstyle of image 1.","t3":" Rank Quy nhan: her OWN gown and colours from image 1, richer: embroidered outer robe, fuller hair ornaments and jewellery, but far below an empress or high consort, no tall crown. Keep the hairstyle of image 1."}
if SHEET or FLOW: RICH=""
elif len(sys.argv)>3 and sys.argv[3] in R2: RICH=R2[sys.argv[3]]
if len(sys.argv)>4: RICH+=" "+sys.argv[4]
print("Semi-realistic painterly guofeng portrait, near-3D soft light, fine detail. "+ident+" Beautiful face, soft round-almond warm eyes, serene faint smile, frontal or slightly angled toward viewer, never back-turned. Natural adult proportions (head 1/7.5 of height). Lively hands, five fingers: "+g+". She holds a prop in her hand(s) (fan/lantern/handkerchief/cup/flower/scroll); both hands visibly busy or one holding the prop. TINY flower-shaped huadian on forehead (1/12 face width; no teardrop, no dot). NO long trailing train or fish-tail; hem ends at the feet, both shoes visible, all inside canvas with margin. FULLY TRANSPARENT BACKGROUND, real alpha, no checkerboard, no ground shadow."+RICH)
