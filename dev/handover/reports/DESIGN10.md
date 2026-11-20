# DESIGN10 — Hán t4–t8: horizontal inner top + collar from the SHOULDERS (owner Lượt 1398, Foreman C #7)
depth 7 · START_CTX ≈ 4 % (get_session used_tokens read 0; own estimate) · Opus, prompt editing, 0 credits, NO gens.

## What I did
New prompts dev/art/seasons4/s62_t{4..8}_HAN_BAC_vai.txt (+ .keep), built by dev/art/seasons4/make_han_vai_L1398.py from the PRE-open bases (A39): t4 _gon2, t5 _gon, t6/t7/t8 _gon3. Only collar words were swapped:
1. The old wide-V / nested-V / "never a horizontal inner top" / bare-neck collar text was replaced by one block: "COLLAR FROM THE SHOULDERS: a real opaque pink inner top with a straight HORIZONTAL neckline across the upper chest, edged by <band>, covers the whole chest; the (plum outer) crossed collar(s) START AT THE SHOULDERS / begin at the OUTER shoulder points, never at the neck, and cross LOW at the sash, framing it; neck and collarbones visible above it; no cleavage, no sheer chest layer".
   Band: t4/t5 a flat gold-embroidered plum band · t6 a flat royal golden yellow band (replaces the old "yellow inner collar nested in the V", so t6 keeps the same amount of yellow) · t7/t8 a broad flat royal yellow pearl-edged band (like the current-outfit HQP layered neckline the owner loves).
2. Rank bands / signature pieces now run "along the (outer) collar edges" instead of "along the V / wide V": t4 three bands + pearl net along the two outer collar edges, shoulders → sash ("never on the inner top's neckline" replaces "never a horizontal band across the chest"); t5 two collar bands; t6 four bands + small flat yunjian; t7 five / t8 six bands; t6–t8 cloud collar still ONLY on the shoulders/upper back, ends slope down along the collar edges, "no fringe across the chest" kept.
3. "her neck, collarbones and the wide V neckline are fully visible, never covered by …" removed (neck/collarbones are now stated in the block). "nothing at the throat" and t7/t8 pearl strands from the V point kept.
Everything else (fabrics, jewels, crowns, colours, swatch lines, Image-2 sentences, captions) is byte-identical to the base. No boilerplate trimmed.

## Gates
Length (chars): t4 9928 · t5 9993 · t6 9914 · t7 9997 · t8 10000 (≤ 10 000).
check_store --scope tpN --age a18 (run from repo root) FAIL set = base: t4 M07 S12 S13 · t5 M07 S12 · t6 B12 M07 S07 S12 · t7 B12 S07 · t8 B12 S07.
A38: keep_check --sidecar PASS ×5; --all: 65 sidecars PASS.
Pics looked at: t4_open, t7_open (bare chest / sheer layer confirmed); t5/t6/t8 skipped to save image reads — the brief's fault list was enough.

## Stage 2 — owner Lượt 1399 (sent by C #7 at 20:03Z, added to this job): khúc cư (quju) by rank
- t5 Phi: the long spiral is now a SHORT wrap exactly like the Tần: "its front panel wraps across ONCE to the side and ends in a smooth, softly curved hem edge (a short simple wrap exactly like the Tần's, never a long spiral, never petal panels, never swallowtail points)"; border "along the whole curved wrap edge and hem"; caption "Khúc cư vạt ngắn, hai lớp áo cổ từ vai".
- t6 Quý phi: the straight-hem zhiju (trực cư) is replaced: "THREE visible robes, the middle one a LONG-wrap quju (khúc cư), its front panel wound SEVERAL times in a long spiral round the body to the floor"; "the spiral wrap edges under the open outer robe"; RANK BLOCK "the long spiral quju wrap"; caption "Khúc cư vạt dài gấm ba lớp + vân kiên". Open-front outer robe kept.
- t7 HQP: "the light clear warm plum long-spiral quju (khúc cư)" replaces "zhiju"; layers on top unchanged. Also fixed a leftover nested-V phrase: "a wide inner collar nested in the V" became "a wide yellow inner-top band" (same amount of yellow).
- t8 HH: "the light clear warm plum longest-spiral quju (khúc cư)" replaces "zhiju".
- To fit 10 000 characters I shortened MY OWN new text (dropped "straight", "framing it", "START AT THE SHOULDERS: their edges" for t6, "flat" in the t7/t8 band, "collar" in the t7/t8 band count, cloud collar "along the collars" t7/t8) and, in t5 only, cut the duplicate sleeve sentence "The wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like." (same trim DESIGN9 made; the FABRIC sentence keeps the meaning; listed as an allow line).
- Final length (chars): t4 9907 · t5 9948 · t6 9953 · t7 9973 · t8 9998.
- Gate: dev/art/check_store.py at HEAD does NOT run again (IndentationError line 760: the bad merge DESIGN8 reported is back — duplicate doan_cuts_made lines 759/760 + 1016/1017, two defs in master_common.py 82/86). I did NOT edit it (tools are the foreman's). I ran the unchanged ae15a00 version (the only difference from HEAD is those duplicate lines) in a temporary worktree: FAIL set = base for all 5. keep_check --sidecar PASS ×5, --all 65 PASS.

## Word diff (Counter, base vs final _vai, collar + hem stages) — only collar / hem words + the t5 boilerplate dup
t4 lost: BOTH V×4 WIDE a×2 across and are as band broad but chest collarbones collars covered crossing edge×2 following fully×2 her×2 high horizontal×2 in inside lapels layered low meet modestly narrow near neck never×3 of×2 open or out×2 robes showing×2 sloping straight sweep the×4 tight to toward wide×3
t4 added: AT COLLAR FROM HORIZONTAL LOW OUTER SHOULDERS STARTS THE×2 above along at×2 begin cleavage covers cross edged edges×2 flat from gold-embroidered its layer neckline no×2 on opaque outer×2 plum points real sash×2 sheer shoulder top's two upper whole with
t5 lost: BOTH The V×4 WIDE and×2 are around as bands board-like body broad but collarbones collars covered creases crossing curved-hem down edge floor fold following fully×2 hang her×2 high in×2 inside lapels layered low meet modestly narrow natural naturally near neck of×2 open or out×2 own reaching robe robes rộng showing×2 sleeves spiral stiff sweep the×7 their tight to toward under waist weight wide×5 wound đoạn
t5 added: AT COLLAR FROM HORIZONTAL LOW ONCE OUTER SHOULDERS STARTS THE×2 Tần's a×2 above across×2 along at×2 band begin chest×2 cleavage covers cross curved edged edges×3 ends exactly floor-length gold-embroidered it its layer like long ngắn no×2 opaque outer×2 panels petal plum points×2 real sash sheer short shoulder side simple smooth softly swallowtail top two từ upper vai vạt whole wrap wraps
t6 lost: ALL ALSO Phi's Trực V×7 WIDE are broad cloud collar×3 covered crossed-collar deep down edge×2 every fully hems×2 her in inner inside×2 is×2 lapels level like lines meet near nested×3 of×2 only open reach robe robes sash shows so stepped×2 straight straight-hem the three×3 trực very whose wide×2 zhiju
t6 added: COLLAR FROM HORIZONTAL Khúc LONG-wrap OUTER SEVERAL THE above across at×2 band×2 begin body chest×2 cleavage covers cross dài edged edges×2 edging flat front its khúc layer long×2 middle neck no×2 one opaque outer panel points quju×2 real round royal sheer shoulder spiral×3 times top×2 under upper vạt whole with wound wrap×2 yellow
t7 lost: ALSO Phi's V×7 WIDE all are collar×4 covered crossed-collar deep down edge every fully her in×2 inner inside is×2 lapels like lines meet near nested×3 of only open reach robe×2 sash shoulders shows so the×5 to×2 very whose wide zhiju
t7 added: COLLAR FROM HORIZONTAL OUTER THE above across at×3 band×2 begin chest×2 cleavage collars covers cross crossed cư edged inner-top khúc layer long-spiral neck no×2 opaque pearl-edged pink points quju real royal sheer shoulder top upper whole with yellow×2
t8 lost: ALSO Phi's V×6 WIDE are collar×3 covered crossed-collar deep down edge every fully her in inside is×2 lapels like lines meet near nested×2 of only open reach robe×2 sash shoulders shows so the×4 to×2 very whose wide zhiju
t8 added: COLLAR FROM HORIZONTAL OUTER THE above across at×3 band begin chest×2 cleavage collars×2 covers cross crossed cư edged khúc layer longest-spiral neck no×2 opaque pearl-edged pink points quju real royal sheer shoulder top upper whole with yellow

## Open
- Ready for a 1-sample gen when the owner says yes (A20/A21). Suggested first sample: t4 Tần (worst in the _open run).
- If the model still makes the inner top look like bare skin, next lever = name the inner top's colour as "bright blush pink silk" (currently "pink").
