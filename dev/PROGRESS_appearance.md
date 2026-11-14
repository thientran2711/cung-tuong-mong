# PROGRESS — review/appearance (dung mạo theo tình trạng + nét mặt)

Base: origin/review/items-earned (jrash/jveil). Owner 11/14 01:15Z approved 8 appearance conditions; coordinator CUT scope to save credits:
build ONLY (1) ốm yếu, (2) trúng độc, (3) bị tát + phạt quỳ/trượng. Glow (dưỡng nhan), tóc bạc sớm, đậu mùa = postponed (no art) —
they plug into the shared registry later. Owner then asked for EXPRESSIONS in code (kitFaceExpr).

## Done
- KIT_RASH.ready=true (owner approved rash) — 3ae3ddbc, also pushed to review/items-earned. Rash now one entry in the registry.
- dev/build/jface.js — kitFaceFx registry (KIT.md 28.8b), entries ill / doc / tat / phat / expr; one hook each on kitFxLayers, effSac, pcard.
  * ốm yếu: state from j13 p.ill (not docman/longthe) lvl = stage, p.sick (độc dần) lvl 2, Sức < 25 lvl 1. Sắc −2/−4/−6. Seen: illKnown/knows.
    Cure = existing illness cures (Truyền thái y / Tự bốc thuốc / Tĩnh dưỡng). CSS pallor + landmark eye/lip tints. ready=false.
  * trúng độc: p.pz {sev,until,by,dx,nt} from Hạ độc (j8 ACT.poison, j83 dish uses it) and Hạ độc dần (j30), plus docman illness.
    Sắc −4/−7; weekly wear-off (NPC 35 %/tuần faster or Y≥2); her card "Trúng độc" every 3 tuần: thái y giải độc (Bạc 40, chance of
    Chứng cứ on the poisoner), thuốc giải in chest (consumed, item must be owned), tự sắc thuốc (odds by Y thuật), nằm nghỉ.
    Observant (Mắt ≥3, Y ≥2 or thái y tâm phúc) sees the chip on others and may get 1 Chứng cứ on the poisoner. ready=false.
  * bị tát: p.slap 2–3 tuần, Sắc −3 (veil cover applies), chip; img/fx-slap.png on the scar-fit cheek box (APPROVED, ready=true).
    Causes: act "Tát" (Hại nhỏ, same place, higher rank, Đức −2, target oán, Sủng −4 risk if target is a favourite) for her and NPCs (mindMenu),
    maid path cnvScold "Cãi lại".
  * phạt quỳ / trượng: p.pen 1–2 tuần, chip "đi chậm"; her walks cost +1 khắc (travel wrap); NPCs scheme half as often.
    Causes: act "Phạt quỳ" (Hoàng hậu or 3 ranks above, Sức −8), maid path (Cãi lại, Từ chối lệnh, bị đánh trượng).
- dev/build/jexpr.js — kitFaceExpr (KIT.md 28.8c): img/face-lm.json landmarks (dev/figwork/facelm.py + facelm_pack.py + facelm_check.py,
  mediapipe; 5313/5314 found), canvas warp patch: buồn / giận / đau / khóc (+ code-drawn tear), eye/lip tints on landmarks.
  expr entry (z5) mixes from conditions + p.expr (faceExpr: her child dies → khóc 3 tuần; who slaps/punishes → giận 1 tuần). ready=false.
- Fix: jk2b .kfxf boxes on room-stage figures now copy the figure transform (all face layers were half a figure off to the right).
- Pilot sheets: dev/shots/appearance-pilot/pilot-*.jpg (v1), pilot2-c05-t2-a18.jpg, pilot2-c18-t2-a26.jpg (v2 with expressions).
  Tools: scratchpad app/pilot (p2.html, shot2.js, sheet2.py, fx2.css), served over http (canvas needs same origin).

## Open
- ill + doc APPROVED → ready=true (be27e8ac). Expressions: pilot 3 sheets (pilot3-*.jpg, with a real in-game-size row) await approval → then set expr ready=true in jface.js.
- Event stage / identity card full-body figures: not on this branch; when they land they must call kitFxLayers(p,file) into a .kfx/.kfxf box.
- Safari: backdrop-filter pallor inside a stacking context may degrade to tint only (tints/lips/eyes still show). Not testable here.
- Postponed entries (glow, grey strands, smallpox marks) — add with KIT_FACEFX.add when the owner wants them.

## Tests (scratchpad ap/t1.js, t3.js; server ap/srv.py on 47211 serves dev/index.html as /t.html, items/old_index.html as /old.html)
- 686x880@2.2 and 1180x820@2: old save (old build) loads and plays; new game; ill/doc/tat Sắc effects, poison card options, Tát act, pen travel +1;
  layers in DOM (kexpr, kff, kslap); stage figure layer aligned after the transform fix; no page errors, no horizontal overflow.
- Pre-existing (not this branch's code): two 404 requests for "[object Object]" when Hậu cung opens (happens with every face fx off too).
- The machine is short of memory when other workers run browsers: Playwright pages can crash; rerun with --disable-dev-shm-usage.
- jexpr patch: 2x supersample + blob URLs (4x/data: URLs used too much memory).
