# mk13.py t8|t7 cXX [noage]  -> head-grid prompt (new TINY t7/t8 mark on all 4 + a51 ageing on bottom-right)
# mk13.py age                  -> a51-only ageing prompt for a grid of four different women (keep marks)
# owner 11/14: t7/t8 = size approved on Part C (C_t78_pilot_m08/m33): t7 same design ~half size inside the brow gap;
#   t8 small symmetric c26-style gold phoenix around her tiny motif, narrower than the brow gap, NO blue on skin.
import sys,re
R='/home/user/cung-tuong-mong/.claude/worktrees/agent-a878b9d4ac20deacb/dev/figwork/HUADIAN.md'
HD={m.group(1):(m.group(2).strip(),m.group(3).strip()) for m in re.finditer(r'^\| (c\d\d) \| ([^|]+)\|([^|]+)\|',open(R).read(),re.M)}
AGEW=("a dignified mature beauty, soft smile lines at the outer corners of the eyes, faint lines from nose to mouth, slightly fuller mature cheeks; "
      "keep her own hair colour exactly (warm soft dark brown with its painted highlights, NOT flat jet-black, NOT grey; at most a few subtle silver strands); "
      "keep the same painting style, skin tone, colour grade, contrast and soft lighting as the rest of the image; still beautiful and serene")
SIZE=("TINY and delicate, about the size of a lentil: its whole height about half the length of one eye, clearly narrower than the gap between the inner ends of the eyebrows; "
      "centred on the lower forehead just above that gap, well clear of the brows and the hairline; ")
if sys.argv[1] in ('t8','t7'):
    t=sys.argv[1]; c=sys.argv[2]; mo,col=HD[c]; mo=re.sub(r'^(a |an |the )?(tiny |small )?','',mo); noage=len(sys.argv)>3
    if t=='t8':
        orn=(f"a tiny, symmetrical, upright stylised phoenix in thin gold leaf painted flat on the skin, seen from the front, its two slender wings lifted evenly to either side and its tail tapering straight down, "
             f"holding her own tiny {col} {mo} centred at its top; all gold with only that tiny {col} accent: NO blue, NO green, no other colours. ")
    else:
        orn=(f"a tiny {mo} of paper-thin gold leaf laid flat on the skin, filled with glossy cinnabar-red enamel, with fine gold filigree lines, two minute flat gold curls hugging it "
             "and one very tiny ruby-red glint at its centre; completely flat, no raised gems, no pearls, no beads. ")
    p=("Edit this image. It is a 2x2 grid of four close-up portraits of the same woman at four ages (top-left youngest, bottom-right oldest). "
       "Keep everything exactly identical: faces, identity, expressions, eyes, eyebrows, hair, crown and hair ornaments, earrings, clothing, colours, lighting, framing and the grid layout. "
       +("The ONLY change:" if noage else "Change only two things. (1)")+
       " On EACH of the four faces: completely remove the current ornament on the forehead (restore clean smooth skin there) and paint a new one in its place: "
       +orn+SIZE+
       "crisp, elegant and jewel-like, clearly a painted ornament, never a scar or birthmark; no frame. Exactly the same ornament and size on all four faces. ")
    if not noage: p+="(2) The bottom-right woman only must clearly look about 48 years old: the same face and identity, "+AGEW+". The other three keep their ages exactly. "
    print(p+"No moles. No text.")
elif sys.argv[1]=='t78':
    # 4x2 grid: top row t7 a18..a51, bottom row t8 a18..a51; age8: also age bottom-right (default yes)
    c=sys.argv[2]; mo,col=HD[c]; mo=re.sub(r'^(a |an |the )?(tiny |small )?','',mo); age8=len(sys.argv)<4
    p=("Edit this image. It is a grid of eight close-up portraits of the same woman, 4 columns by 2 rows: in each row her ages go from youngest (left) to oldest (right); "
       "the top row wears her rank-7 crown, the bottom row her rank-8 empress crown. Keep everything exactly identical: faces, identity, expressions, eyes, eyebrows, hair, crowns and hair ornaments, earrings, clothing, colours, lighting, framing and the grid layout. "
       "Change only these things. (1) On EACH face: completely remove the current ornament on the forehead (restore clean smooth skin there) and paint a new one in its place. "
       f"TOP ROW (all four faces, identical): a tiny {mo} of paper-thin gold leaf laid flat on the skin, filled with glossy cinnabar-red enamel, with fine gold filigree lines, two minute flat gold curls hugging it and one very tiny ruby-red glint at its centre; completely flat, no raised gems, no pearls, no beads. "
       f"BOTTOM ROW (all four faces, identical): a tiny, symmetrical, upright stylised phoenix in thin gold leaf painted flat on the skin, seen from the front, its two slender wings lifted evenly to either side and its tail tapering straight down, holding her own tiny {col} {mo} centred at its top; all gold with only that tiny {col} accent: NO blue, NO green, no other colours. "
       "Both ornaments: "+SIZE+"crisp, elegant and jewel-like, clearly a painted ornament, never a scar or birthmark; no frame. "
       "(2) The rightmost woman of the top row"+(" and the rightmost woman of the bottom row" if age8 else "")+" must clearly look about 48 years old: the same face and identity, "+AGEW+". All other faces keep their ages exactly. No moles. No text.")
    print(p)
else:
    print("Edit this image. It is a 2x2 grid of four close-up portraits of four different women. Keep everything exactly identical: each woman's identity, face shape, expression, eyes, eyebrows, the ornament painted on her forehead, hair, crown and hair ornaments, earrings, clothing, colours, lighting, framing and the grid layout. "
          "The ONLY change: each of the four women must clearly look about 48 years old: the same face and identity, "+AGEW+". Keep every forehead ornament exactly as it is. No moles. No text.")
