# HANDOVER: coordinator session 6 -> session 7 (15/11 ~20:40Z)

Read first: CLAUDE.md, AGENTS.md, dev/OWNER_DECISIONS.md (bottom = newest), dev/handover/HANDOVER_1115_PM.md (running log of session 6), dev/handover/WORKER_BRIEF.md, /home/user/wt/PREAMBLE.txt + REVIEWER.txt if the machine is the same (copies of both are in this folder: PREAMBLE.txt, REVIEWER.txt).

## Role
Main coordinator of Cung Tường Mộng. Address owner "sếp", self "em", reply in Vietnamese, short; end each report with "~X% xong / ~Y% chơi được" (now ~96% / ~90%). Coordinate only: spawn workers/reviewers (keep ≤12 live: CPU load 50–60), fast-forward main on reviewer PASS (no asking), run cdn_sync for workers, record EVERY owner message in dev/OWNER_DECISIONS.md the same turn (commit + push docs branch). Hourly watch only (create your own hourly trigger; session 6's trigger is deleted). All repo work files in ENGLISH; player text Vietnamese. ChatGPT only when owner says "đoạn audit tuần này" / "đoạn điều phối tuần này" (see CLAUDE.md).

## Live
main = 64e91f1ae (player-dress). Fast-forward recipe:
S=<sha>; M=$(git ls-remote origin main|cut -f1); flock fetch.lock git fetch --depth=30 origin $S; git merge-base --is-ancestor $M $S && flock fetch.lock git push origin $S:refs/heads/main

## KIT section registry
On main §39–§56 (see PREAMBLE). Reserved: §52 fix-float relation table (+§52.1 kitImgSync), §57 kitNumDelta, §58 month-calendar, §59 placeholder-pics, §60 mk-colour, §61 fig-bg, §62 night-end, §63 recipes. Book title used §27.1.

## Workers still running in session 6 (their reports arrive in session 6; session 6 forwards them to you)
| Topic | Branch | State |
|---|---|---|
| reviewer ts-a + bot | review/ts-a | running |
| reviewer small-bugs-2 | review/small-bugs-2 | running |
| reviewer book-title | review/book-title @ e7769dc32 | running (PASS → ff main) |
| sfx | review/sfx | running |
| balance-pass (+ new bạc-equivalence scan) | review/balance-pass | running |
| item-events (item icon in dialogs, fly to Tư trang / burn) | review/item-events | running |
| place-colour (all rooms + lãnh cung stage background) | review/place-colour | running |
| rank-title (glowing rank line above names) | review/rank-title | running |
| month-calendar (desk calendar icon on room picture → 3×10 grid, fixed festivals only) | review/month-calendar | running |
| placeholder-pics (4 placeholder pictures + missing list) | review/placeholder-pics | running |
| por-scale (portrait face scale per group; sample first) | review/por-scale | running |
| mk-colour (makeup colour picks on her picture; sample approved by coordinator, sent to owner) | review/mk-colour | running |
| night-end (night mood pictures + seasonal dawn; sample sent) | review/night-end | running, wiring |
| recipes (learn/buy recipes, repeat fatigue, tastes, allergies, sub-styles per art, cheap teacher, bạc-equivalence) | review/recipes | running |
| fix-float r8 (co-op night desync from r7 FAIL) | review/fix-float(-r8) | running |
| act-picture redraw 380 (no faces, dark/light by tone) | review/act-pics2 | running, 8/380 live |
| art-complete (age×rank completeness: A 272 + eunuchs 360 + grown kids 144 approved; mamas via code) | review/art-complete @ 8028d57f6 | running |
Done, waiting owner: fig-bg sample (review/fig-bg 21eb452d3; A scroll / B moon window / C silk wash, rec C) — on her pick spawn step 2 (§61).

## New work to start (owner, not yet assigned)
1. Story quest progress label: show "Chương N · Hồi M" next to "bước 2/4" for every story line (e.g. 9 tuyến báo thù cho nhà) — whole class.
2. Thái y: owner was offered (1) monthly routine pulse visit, (2) "Mời thái y bắt mạch" anytime (finds illness, slow poison, musk), (4) bribed physician lies. Pregnancy already found 3–6 weeks later by thái y (j75). Waiting her pick.
3. Phế phi họ Lý side story (backstory, secret/evidence vs common enemy) — offered, waiting her yes.
4. Extra toilette reaction buttons (Ghi hận / Mách Hoàng hậu / Tặng lại / Hỏi bí quyết) — offered, waiting.
5. Night ideas 1–4 (morning gossip after nights etc.) — offered, waiting.
Queue (small, from HANDOVER_1115_PM): download-size (129 MB first load), fig-export-1100, rank-ui, toast over dialog at 844, k3 state row wrap kit rule, "thân ±N" → "thiện cảm" wording sweep, palace labels clipped above face strip, Bổng lộc legacy table, name/time overlap 1000x755, goodsGive empty "from" line, item names capitalised mid-sentence, 390x844 subtitle wrapping, 844x390 book cover hint overlaps TUẦN seal.

## Open owner questions
Huadian size 10/9/8% (rec 10%); son's birth exam vs direct promotion; servant/mama road exams; doat-giai pictures with Emperor keep/drop; Ngự tứ pet life-save stage; pet label "No" vs "Đói"; co-op pet actions; Ân tình header icon; fig-bg A/B/C; art-complete: old-save player looks (128) and promoted old-love men (56) draw or not.

## Machine notes
Main checkout shallow; workers use sparse worktrees in /home/user/wt/<name>; fetch --depth=30 under flock /home/user/wt/fetch.lock; never clone. Packs ~8 GB → repack when load drops (nice, pack.threads=1, --window=0). Own http server per worker, kill by PID only. Magnific balance ~1.45M credits.

## ACCOUNT MOVE (owner 15/11 ~22:10Z)
Account usage ~98%: the project moves to another account (new container). Everything needed must be on GitHub or the CDN.
- Reference images that lived only on local disk are now in dev/handover/refs/ (owner markups: pets, fig-bg, rosy; samples: night-end, por-scale, rank-title, mk-colour, calendar, pets, handmade works, fig-bg, placeholders, Ân sủng ref, rank-title ref).
- Session 6 agent log: dev/handover/AGENTS_SESSION6.txt.
- NOT saved (too big, rollback only): /home/user/wt/porscale-orig/ (150 MB originals of 3317 re-cropped portraits). The re-crop is live; to roll back one would need the old CDN versions (not kept).
- Running workers were told to commit+push WIP and write PROGRESS resume notes: balance-pass (review/balance-pass), fix-float r8 (→ review/fix-float-r8), mk-colour (review/mk-colour), reviewer small-bugs-2 (review/small-bugs-2-r6). Check each branch's PROGRESS file before re-spawning on the new account.
- New account setup: re-create Cloudflare CDN access (api.cloudflare.com connector) for cdn_sync, Magnific connector (folder ba4aecfe-efce-47e2-b53f-30d292091886 must be reachable — it belongs to the old Magnific account; if not shared, art jobs need a new folder and STYLE refs re-uploaded), GitHub access to thientran2711/cung-tuong-mong.
