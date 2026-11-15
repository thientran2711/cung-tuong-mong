# Trung y prompts (gpt-2-6 edit, 4k, 2:1). Reference = ref/<role>-<id>.png: the CURRENT CDN t1 figures (huadian-shrunk, mole-free)
# composed on parchment by ty.py refs. 8 tiers = the 8 consort ranks; colour = that rank's RCOL colour (KIT §1.3) as pale soft silk
# (owner 15/11: Đáp ứng ivory). python3 prompts.py <1..8>
PRE=("Edit the reference image. Keep EXACTLY the same four women: the same faces, facial features, ages, skin, eyes, lips, the same TINY huadian "
"between the brows exactly as small and as faint as in the reference (do NOT enlarge, redraw or embellish it), the same head positions, body positions, "
"height, scale and placement in the frame, the same rendering style (semi-realistic painterly guofeng, near-3D, soft natural light), "
"a plain light parchment background. Serene gentle faces, soft warm round-almond eyes, flawless skin with NO moles and NO beauty marks. "
"Change ONLY the clothes, hair ornaments and held objects: all four now wear a TRUNG Y, the inner garment / sleeping clothes of an ancient Chinese palace lady: "
"a soft silk inner robe with a modest crossed collar closed high at the neck, long full-length sleeves to the wrists, a long silk skirt to the ankles, "
"a thin silk tie at the waist, no outer robe, no sash ribbons, no crown. ")
POST=(" Modest, plain, dignified and elegant, fully covered, opaque silk (not sheer, not see-through), loose and decent, nothing revealing. "
"Hair: a simple low loose bun with long hair partly falling down the back, at most ONE small plain hairpin, no flowers. "
"Hands empty or gently holding the sleeve; calm standing poses, feet together. Every figure complete head to feet, clear empty space between the four figures. "
"Clearly a lady who is not yet dressed in her court robes. No text, no labels.")
G={
1:"COLOUR: soft warm IVORY silk (all garments ivory). Trim: none, completely plain; a plain silver hairpin.",
2:"COLOUR: PALE soft celadon GREEN silk, a light whisper of green (all garments pale green). Trim: only a thin self-colour piping on the collar edge; a plain silver hairpin.",
3:"COLOUR: PALE soft sky BLUE silk, a light whisper of blue (all garments pale blue). Trim: a narrow tone-on-tone pale blue embroidered band of tiny orchids on the collar edge only; a plain silver hairpin.",
4:"COLOUR: PALE soft rose PINK silk, blush pink (all garments pale pink). Trim: a narrow tone-on-tone pink embroidered band of small lotus on the collar edge and the cuffs; a silver hairpin with one small pearl.",
5:"COLOUR: PALE soft LAVENDER silk, a light whisper of lilac (all garments pale lavender). Trim: a narrow tone-on-tone lavender embroidered band of small chrysanthemums on the collar edge and the cuffs, finely stitched; a silver hairpin with one small pearl.",
6:"COLOUR: PALE soft ROSE RED silk, a light dusty rose-red (all garments pale rose red, never deep crimson). Trim: a tone-on-tone rose embroidered band of small peonies and clouds on the collar edge, the cuffs and the hem, finely stitched; a small gold hairpin.",
7:"COLOUR: PALE soft AMBER / apricot ORANGE silk, a light warm amber (all garments pale amber). Trim: a fine tone-on-tone amber embroidered band of small phoenix feathers on the collar edge, the cuffs and the hem, with a few delicate pale gold threads; a small gold hairpin.",
8:"COLOUR: PALE soft imperial GOLD / light yellow silk (all garments pale yellow-gold). Trim: ONLY the collar edge, the cuffs and the hem carry a clearly visible band (about two fingers wide) of DEEPER GOLD embroidered phoenix-and-cloud pattern; the body of the robe stays plain smooth pale yellow silk (no wide embroidered front panel, no all-over pattern); a small plain gold hairpin. The finest silk of all, yet still simple and restful like sleeping clothes."}
def prompt(g): return PRE+G[g]+POST
if __name__=="__main__":
    import sys; print(prompt(int(sys.argv[1])))
