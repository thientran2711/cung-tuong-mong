# video161 — VIDEO-161 (look-only; nothing pushed to main)
PRIORITY #1 CHECK: reused review/kit-stage-r2 ec2f7c43 (kitHand + kitPick, tests dev/test/kit-hand.js + kit-pick.js), ring4 + motion4 mock mp4s on CDN.
CDN: https://ctm-img.victoria-tntt.workers.dev/img/_review/video161/ — 8 mp4, h264 yuv420p, 22–25 s, 1.2–3.2 MB each, Fold 755x1000 + iPad 1180x820; 3 frames per video looked at, no black/cut UI.
1-banbai-{fold,ipad}.mp4 — REAL BUILD ec2f7c43: real frame «Tân quân lập uy Ch.2» deals the hand, real touch taps: lift card, lift other, ✕ put back, lift, ✓ choose, result scene (sped 1.3x).
2-thego-{fold,ipad}.mp4 — REAL BUILD ec2f7c43: kitPick opened by test code (kitPick.open, NOT yet wired to a real person screen) on the stage figure; drop+sway, real taps: lift, other, ✕, lift, ✓ (sped 1.4x / 1.55x).
3-vong-{fold,ipad}.mp4 — MOCK (ring4 _review/ring4 vid/*-1x.mp4, sped 2x from 48 s): map → khu → groups → people → buttons.
4-baovat-{fold,ipad}.mp4 — MOCK (motion4 m2-*-1x.mp4, scaled down): mẫu 2 Vòng bảo vật gift pick.
Recorder: Playwright recordVideo script (scratch, not committed). Caveat: 2-thego ✓ result scene short; 3-vong tua nhanh.
