# J4 ORIGIN FRAMES (AP01) - index

PRIORITY #1 CHECK: `git grep` origin/main (assets.json, dev/) for kpo/origin-frame keys found NONE; jpres.js:59 `KPO_ART={}` is empty; KIT.md:3921 says the rule is a PLACEHOLDER until ART REQUEST A1 lands. GAP_LIST_v4.md:69 AP01 = no owner. review/presentation-wiring-r1 is not fetched here (not resolvable), skipped; GAP_LIST says it is wiring only. Nothing exists, so 9 prompts written.
A53: no Magnific; these are ChatGPT prompts only, nothing drawn, no credits used.
How to use: new ChatGPT chat, attach the style reference `dev/handover/prompts_L2095/refs/mau_net_ve.jpg` (branch claude/cung-tuong-mong-handover-hj0h8w), paste ONE .txt, ask for ONE image. No identity refs (no person in any frame).
Generator: `dev/art/prompts/J4/gen_J4.py` (reads KPO colours from jpres.js, origin ids from j60.js:23, names from j1.js:19).

| code | key | prompt file | refs | target | read at | note |
|---|---|---|---|---|---|---|
| AJ4-KPOTT-01 | KPO_ART.tt (proposed `img/kit/kpo-tt.webp`) | J4/kpo-tt.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Con gái Tể tướng, #c9952a |
| AJ4-KPODTQ-02 | KPO_ART.dtq (proposed `img/kit/kpo-dtq.webp`) | J4/kpo-dtq.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Con gái Đại tướng quân, #a8321f |
| AJ4-KPOMUOI-03 | KPO_ART.muoi (proposed `img/kit/kpo-muoi.webp`) | J4/kpo-muoi.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Con gái nhà buôn muối, #6f95a8 |
| AJ4-KPOCN-04 | KPO_ART.cn (proposed `img/kit/kpo-cn.webp`) | J4/kpo-cn.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Cung nữ được sủng hạnh, #c4708a |
| AJ4-KPONC-05 | KPO_ART.nc (proposed `img/kit/kpo-nc.webp`) | J4/kpo-nc.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Công chúa hòa thân, #3f8a74 |
| AJ4-KPOTD-06 | KPO_ART.td (proposed `img/kit/kpo-td.webp`) | J4/kpo-td.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Con gái tội thần, #6d6779; DARK |
| AJ4-KPOCH-07 | KPO_ART.ch (proposed `img/kit/kpo-ch.webp`) | J4/kpo-ch.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Cháu gái Thái hậu, #b8742f |
| AJ4-KPOTHD-08 | KPO_ART.thd (proposed `img/kit/kpo-thd.webp`) | J4/kpo-thd.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Con gái thầy đồ nghèo, #6c8a4f |
| AJ4-KPOSRV-09 | KPO_ART.srv (proposed `img/kit/kpo-srv.webp`) | J4/kpo-srv.txt | none | 768x1024 PNG, transparent centre, then webp | jpres.js:59/82 | Cung nữ (đường hầu), #5a9a86 |

What a frame is (from code): `jpres.js:82` sets `dlg.dataset.kpresArt = KPO_ART[origin]` and the placeholder double rule (jpres.js:60 CSS, `:not([data-kpres-art])`) is dropped when it exists. Only the attribute is set on main; the CSS that paints the url is in the wiring branch, so the art is assumed to be a border overlay with an empty centre (the card keeps its own content).

## Skipped (already exists)
None.

## Open questions for the owner/C
1. Nine = the 8 ORIGINS (j60.js:23) + maid start. The code keys the maid as `srv` (jpres.js:82, KPO.srv) and also lists `cnv` (same colour): which key does KPO_ART use? Written as `srv`.
2. Branch `bd` (Ba Tư/Bắc Địch hòa thân, jorigins.js:9) sets origin.k="bd" but KPO has no `bd` key: it falls back to srv jade and no frame. Needs its own colour+frame, or map bd to nc.
3. Frame url/size not defined anywhere on main (no CSS consumer): confirm 768x1024 border overlay (stretchable edges) or 9-slice; I proposed `img/kit/kpo-<k>.webp`.
4. Prompts ask for plain white centre/outside (owner removes it later, A53), as ChatGPT cannot output alpha reliably.

## Checks
`python3 dev/art/prompts/check_prompts.py dev/art/prompts/J4` -> checked 9 files, 0 FAIL. check_store.py (outfit gate) n/a; keep_check n/a (all new). Note: S_NOTEXT (no frame, no border) is deliberately replaced by an own no-text line, since the picture IS a frame.
