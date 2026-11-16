# cardflip-videos — card-flip recordings on live build

Build: origin/main 0c23da403c72f4cac987b4364ff74847d824738f (includes cardflip-smooth 53ee5b81a5).
Viewport 755x1000 (Fold portrait), DPR 1, Playwright recordVideo, headless Chromium (swiftshader), served locally. H.264 MP4, no audio.
Driven by the existing hook `cfDemo(14,3,who)` (14 cards, 3 barred). Game code untouched.

- cardflip-me.mp4 (11.7 s, 1.1 MB): her night. cfDemo(14,3,'me'). Tray -> barred cards pulled -> arranged -> dragon-sleeve hand picks -> her card lifts to centre -> flash -> TH_I TAM seal -> result strip "Dem nay ta duoc thi tam". Portrait is her real face. Looks smooth, nothing broken.
- cardflip-other.mp4 (8.8 s, 0.8 MB): another consort's night. cfDemo(14,3,5). Same beats; result strip "Toi nay: Tan Mo Dung Mi Trang duoc chon hau dem nay". Scene auto-closes and returns to the game at the end.

Notes
- In the "other" clip the picked card shows the grey "unknown" silhouette (frame-unknown/unknown-f art) while the result strip already shows the NAME. This is the j61 knowledge rule in a fresh test game (consort's face not yet seen, name known), not an animation fault. If the owner wants to see a known face, a save where that consort is fully known is needed.
- Clips are trimmed to start ~0.6 s before the flip (first frame = game screen) and end right after the result. Software GL in the container; real-device fps still unmeasured (open item from cardflip-smooth).
- No page errors in either run.
