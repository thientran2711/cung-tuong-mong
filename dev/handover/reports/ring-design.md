# RING-DESIGN report — «VÒNG NGƯỜI» (owner 24/11 ~07:32Z + ~07:35Z)
Worker: RING-DESIGN, MAIN CHÍNH 119. START_CTX ≈ 4 % of window (estimate). Design only, nothing built into the game.
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 (only review/selection-scene scenes, reused as context, not edited).
READY: https://ctm-img.victoria-tntt.workers.dev/img/_review/ring/ring.html (page) · mock source on branch review/ring-design (dev/review/ring/ring-mock.html).
Media on CDN img/_review/ring/: shots/both-<A|B|C>-<idle|turned|alert|open>.jpg (Fold+iPad together, law 12), shots/<opt>-<fold|ipad>-<state>.webp (@2: 1510x2000 / 2360x1640), vid/ring-<opt>-<fold|ipad>.mp4 + -2x.mp4.
Art: existing CDN art only (fig-consort-c01..c11-t1-a18, fig-player-look1-t1-a18, kc-sanh bg). No new art.

## Common ring (new kit part «ring», KK18 later)
12 figures on an oval; angle table 0/42/72/98/128/155/180 deg per step so neighbours are not buried; front = scale 1, lit + glow; others smaller (0.45–0.8) and dimmed; swipe turns, tap lit = interact, tap side = ring turns her to front. Name plate (§93 kitNameTag sketch) only for the front girl; «Ta» tag on the player; mini face dots row (§59 stand-in xs portrait) shows front + trouble pair. Reused kit parts: §59 stand-in portrait, §93 scene/focus shot + kitNameTag + kitDlgBox + kitBareOpts (4 stances Bênh vực/Hùa theo/Hòa giải/Đứng ngoài from yard.md), §95 dialogue spotlight, j93 kitAlarm family look; chip/khắc pips from the shared status row. NEW sketched parts to request in KIT_REQUESTS: ring layout, ấn báo «Có chuyện» (seal), dây tơ đỏ, notice pill, inset window. No digits, no %.

## A — Dây tơ đỏ + ấn báo
Pair glows red-orange, red thread links their heads, seal «Có chuyện» above; if behind others, a pill under the HUD (two mini faces + arrow toward them) and two red face dots. Tap pill/seal/dot: ring auto-turns so the pair stands side by side lit, dialogue box opens.
Pros: no interruption, shows who and where, little text, works while swiping, 3 small parts. Cons: Fold: back girls are small and partly hidden, glow only partly visible, depends on pill + dots; needs her to notice.
## B — Khung nhìn trộm
Ring pauses and dims, gold inset slides in with both girls waist-up (§93 focus shot), «Có chuyện» + close; tap → enlarges into the dialogue; close → back to ring, pair keeps glow.
Pros: expressions visible at once, cannot be missed. Cons: covers most of the ring on Fold, interrupts, annoying if frequent. iPad has room.
## C — Hai nàng bước ra giữa
Ring pauses/dims, pair steps out to the front with ripple + red rim and argues as a pair; the girl she was with fades back into the ring; dialogue box.
Pros: most cinematic, cannot be missed, no new marker. Cons: forced attention, pulls her away mid-chat; on Fold the pair overlaps near neighbours (busy); iPad best.

## RECOMMENDATION
A as base (non-intrusive: thread + seal + pill + dots), tap result = ring turns pair to front (A open state, close to C). Use B inset only for big dramas; small ones only seal. Dots row in all.
Foreman note: needs KK18 parts above, no code written. ~Design 100 % / game 0 % built.

# r2 (REAL GAME, kit parts) — READY https://ctm-img.victoria-tntt.workers.dev/img/_review/ring/ring-r2.html
PRIORITY #1 CHECK: OD 07:42–09:15Z rows read | main j6 renderStage + j59 j59lay/j59chips (the live place-people view) | review/* none for rings (review/motion-design has an item ring; one shared kitRing suggested) | claims none.
Why r2: r1 (hand-drawn chrome, dark veil, drawn oval, round avatars) FAILED law 9 / owner rulings 08:55–09:15Z. r2 runs INSIDE the built game (dev/test/lib/device.js host mode, Fold + iPad): real HUD, stage, rail, tabs; chips = kitChip, plaques = kitNameTag/j59tagHTML, strangers = .figimg.j59sil, scene = kitScene + Sc.fig + kitDlgBox + kitBareOpts. No drawn oval, no dark overlay on the background (figures only brighter/softer).
Sections: Phòng riêng (4/6, today vs row vs ring) · G vòng nhóm (Ngự Hoa Viên 18 people, 9 groups, followers behind master, no pre-warning etiquette, NPC auto-turn + zoom + §95) · S wide scene (honest breaks) · R person ring for CHOICE screens.
RECOMMEND: G for crowded places; R for choice screens; S only with a wide painted background that has a continuous floor; room: one screen, Fold row up to 4 / ring from 5, iPad row up to 6.
Replaces in live game: j59 fixed slots (Fold 2 / iPad 4) + «+n»/«‹» page chips (j59chips/j59go/j59swipe); keeps popCard, kitHereCount, rail.
KIT REQUESTS (filed below in dev/kit/KIT_REQUESTS.md): kring layout part; stage option sheet; figure alert glow; directional notice chip; collapsible Ân sủng column in crowd mode; head-count over all pages.
Kit parts that darken a whole screen (report only): kitScene veil rgba(20,12,8,.45)+blur (§93, used by §95), kitGloom vignette, kitInk blots, #modal backdrop.
Law 8: palace-drama/etiquette check on the page (from memory, K/D tagged; needs an expert to confirm).
Open points: stranger silhouettes drawn by kit only for stage 0; real life seeds in this run had few people so the «hôm nay» room frame shows few; iPad videos show the real spread layout (stage left + panel right).
Code: review/ring-design dev/review/ring/r2. ~Design 100 % / playable 0 %.

## REVIEW ring5 (small kit reviewer SEAT 1, 25/11) — review/kit-ring5 f44c657d440ac20f870294b7445c032916571dca (= e60c3a9c RING-DESIGN-5 + doc fix f44c657d) — KIT OK
PRIORITY #1 CHECK: brief b-kit-0145-batch.md | MAIN 131 «mock only, not wired».
Laws: 9 (kit parts only), 10/11/12 (Fold+iPad), 14 (KIT §98.19 written in place), 4 (no new number).
(1) NOT WIRED: git grep kitPick / kitDim in dev/build outside jkpick.js = 0 call sites (kitDim only a comment in jbal2); KIT.md §98 STATUS line «STAGED, NOT WIRED» present; only reachable from the console. Note: the same branch also carries LIVE changes that are not mock: jplst railW (place title vs rail chip), jrail §98.4/§98.19c stale-slot clearing, j59 .j59sil opacity .92→1 + .ksil class, kitFocus.btn export, BAL.kdim — all tested below.
(2) Tests (bare head = merged head, merge-base is main 502c48c9): kit-pick.js no args + 755x1000,1180x820: ALL PASS (incl. tabs1row, liftsmall, title scan 4 titles × count 117); 412x1058 ALL PASS; 390x844 FAIL «plaque outside the stage 1» + liftsmall a1-a5 (2-line small line / a5 leaves the stage) — secondary device, KIT §98 already lists 390x844 with 6 acts in one group as known; not blocking (law 12 = Fold+iPad). kit-rail-stale.js 755x1000 + 1180x820 ALL PASS (rail stale 0).
(3) Non-vacuous: previous round review/kit-woodskin 02e4c520: kit-pick.js FAIL Fold (tabs1row 3 rows, liftsmall 2 lines) + iPad (tabs1row 2/3 rows, liftsmall); kit-rail-stale FAIL on 02e4c520 AND on origin/main (stale slot kept left 600px / right 20px / flex row). main has no kitPick (kit-pick.js hangs/terminates).
(4) Built files: build_site.sh on head → git status clean (index.html + sw.js identical).
(5) Quickcheck ALONE --runs 5: QUICKCHECK PASS 385 s, open 2075 ms, old save ok, render 299/282, tab 495/516, buổi 1792/1475, tasks>200ms 26/26, core gates PASS.
(6) Shots Fold 755x1000 + iPad 1180x820 (pick-lift, title) looked 3×: plaques wood skin, lifted plaque small line on ONE line, place title wraps clear of the rail chip, nothing over faces/right column.
(7) Law 11: title/rail changes are in the one jplst/jrail code path for every place stage (title scan 4 titles); stand-in opacity is the one .j59sil class.
VERDICT: KIT OK.
