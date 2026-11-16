# PROGRESS b-answers-art (Foreman C worker, branch review/b-answers-art, base origin/main bad941b4)

Models: Magnific gpt-2-6 only, folder ba4aecfe-efce-47e2-b53f-30d292091886, no rosy-skin pass. Images on the CDN (img/...), not in git.

## (1) Cắm hoa board + podium variants — SAMPLE (stop here until the owner OKs)
| picture | CDN key | creation id | credits | ref |
|---|---|---|---|---|
| board WITH 5 flower vases (same table/cloth/courtyard) | img/kit/mg-hoa-bg-flowers.webp (1024²) | jUXjWdTLD0 | 40 | mg-hoa-bg.webp |
| podium hall, spring (peach/peony garlands) | img/kit/podium-bg2-spring.webp (1344x756) | lJ8lThRgv9 | 40 | podium-bg2.webp |
| podium hall, autumn (chrysanthemum pots, maple) | img/kit/podium-bg2-autumn.webp | O6fOXbpynm | 40 | podium-bg2.webp |
Sheet: dev/art/b-answers/SAMPLE_hoa_podium.jpg (old board | new board / podium spring | podium autumn, podium shown in the real kitPodium at 1180x820).
NOT wired. Design note for main: the playable minigame (j91 k91Arrange) draws its own stems on mg-hoa-bg, so a board with vases baked in suits the contest RESULT / display view, not the playable canvas; kind/season selection (hoa, thơ, vẽ... x season) = KIT_BD.podium entry in jbd.js (kit keeper) — after her OK I wire a per-kind/season key there and paint the rest.
## (2) Full-body figures (4 age bands each, por + fig, FIGURES-others.json format)
| person | role / identity | files | creation id |
|---|---|---|---|
| Phế phi họ Lý (plain linen, no jewellery, cold palace) | fallen / ly1 | fig+por a18 a26 a36 a51 | xSdxMZTjfW (40 cr) |
| Quản sự Tân Giả khố (grey-teal embroidered, keys/ledger) | steward / tgk1 | same | nVjnkuZYQD (40) |
| Thầy dạy Thượng thư phòng (blue/navy/ivory scholar) | tutor / ttp1 | same | gOIgXDaSXO (40) |
Background removal: images_remove_background (3 cr each), cut into 4 columns, fig 900 px tall, por 384x512 head+shoulders crop. Manifest entries appended to img/FIGURES-others.json (pushed to CDN with cdn_sync). hd: sources are 1344x752 sheets, each figure ~900 px, same as maid/mama sheets (no separate hd/ file; face-sharp pipeline can upscale later).
Wiring (dev/build/jly.js, existing figWho/figRoles/pFaceOf hooks, no new kit part): Lý stand-in uses role fallen once FIGIX.fallen exists (else old cold consort art); the two fixture NPCs of jplx (kind npc, no sid) become persistent S.npcFix people with roles steward/tutor. Old saves: Lý's saved consort fid is dropped once so she takes the new face.
Verified (dev/test/b-answers-art.js, 755x1000 + 1180x820, 0 page errors): Lý in Trường Môn viện, Quản sự in Tân Giả khố, Thầy dạy in Thượng thư phòng.
## (3) 'Sáng hôm sau' banner
img/ev-morning-after-b.webp (1024x768, 4:3 like ev-fest-*-b), creation s7osXRNl8e, 40 cr. Slot lives only on review/emperor-visit (dev/build/jvisit.js:81, Q.push {t:"Sáng hôm sau",...}) — NOT on main. One-line wiring when that branch lands: add headArt:{src:"img/ev-morning-after-b.webp",label:"Sáng hôm sau"} to that Q item (shown in test as kitModal headArt, 755x1000 OK). Note: picture has light snow + blossom (late winter/early spring); season-neutral variants are a follow-up if wanted.
Credits total: 7 generations x 40 + 3 background removals x 3 = 289.
