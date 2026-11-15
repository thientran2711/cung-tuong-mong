# PROGRESS: review/act-pics2 (act pictures, dialog banners, system-line meanings)

Base the next session on **review/act-pics2**. It holds tools and logs only. The images and img/ACTS.json are outside the sparse checkout and are never committed: they reach the game through `python3 dev/site/cdn_sync.py <files>`, run by the coordinator from this worktree.

Pictures live only in the worktree's img/ until they are synced. A fresh session starts with none of them. To recreate any picture, re-fetch it from Magnific: call `creations_get` with the id logged in gens2.txt or gens_dlg.txt, then pipe "KEY ID URL" into fetchb.py or fetchd.py.

## Rules (owner)
- Model: Magnific gpt-2-6 only, 1k. folderReference ba4aecfe-efce-47e2-b53f-30d292091886.
- References:
  - Style refs: cplQijT0eP (day), s7o88xTl8e (night).
  - Approved Thỉnh an picture lJ8tmHqgv9, passed as an "image" reference for the curtsy pose and the outfit.
- Faces:
  - Everyone is beautiful with a serene face: no sly look, glare, smirk, tears, open-mouth laugh, or hand at the face.
  - No moles.
  - The small forehead flower mark (huadian) goes only on consorts and the Empress.
- No Chinese characters or text anywhere.
- Women greet with the vạn phúc curtsy: standing upright, hands at the RIGHT side of the waist, knees slightly bent, head lowered. Never a forward bow.
- Clothes: Han/Ming cross-collar robes with wide sleeves and loose skirts. Never qipao, never a Qing collar, never Qing hats.
- The Emperor wears a small gold crown on his topknot.
- Men never in pink or purple.
- Check the hands in every picture.
- One act = one meaning = one picture. Category/group pictures are never used as a stand-in.
- A week-book line with no meaning (key "-") shows NO thumbnail.

## Done (all pushed on review/act-pics2)
- Earlier batches: commits abee42376, 14736b977, d4ce54103.
- dca6f7ba7: Tự học/Tự luyện split per art, plus ma ma and Tự rèn pictures per virtue. Patch: dev/figwork/acts/ACTS_tuhoc_patch.json.
- e12974961 and 5f86830f9: dialog banners. 24 of 121 are drawn as img/ev-<key>.webp (640x480). Tools: dprompt.py, fetchd.py, dsheet.py.
- 9699060bc: person-card acts. 17 new pictures, plus patch dev/figwork/acts/ACTS_personcard_patch.json (sent to the coordinator).
- 72c3974af: 10 toilette reaction banners img/ev-toil-*.webp. af1b405dac02b4807 has wired jtoil art to them.
- This WIP commit:
  - meanings.py now has a "Tổng lược system lines" block (about 80 rules, before the `tu-dung` catch-all).
  - It covers 181 of the 186 main log first-sentences that used to be unmatched. The scratchpad check script a6w_unmatched.py now reports 5 unmatched, all placeholders.
  - 24 system-line pictures are drawn, see "Drawn, NOT yet uploaded" below.

## Drawn, NOT yet uploaded (cdn_sync pending)
Run from the worktree:
```
python3 dev/site/cdn_sync.py img/act-ngu-mot-dem.webp img/act-do-hong-bo.webp img/act-xac-lao-vuong.webp img/act-ghi-ten-du-thi.webp img/act-dung-chot.webp img/act-doat-giai.webp img/act-hang-nhi-ba.webp img/act-nguoi-khac-doat-giai.webp img/act-bat-dau-bay-muu.webp img/act-dem-cung-khac.webp img/act-giu-kin-co-thai.webp img/act-duong-xa.webp img/act-chai-chuot-gian-di.webp img/act-chai-chuot-long-lay.webp img/act-chai-chuot-vua-van.webp img/act-noi-vu-dua-y-phuc.webp img/act-thay-y-phuc.webp img/act-thao-trang-suc.webp img/act-deo-trang-suc.webp img/act-thieu-le-y-phuc.webp img/act-ht-de-mat-y-phuc.webp img/act-deo-mang-che.webp
```
- The last 8 in that list (from thay-y-phuc on), plus the redraws of xac-lao-vuong and giu-kin-co-thai, have NOT been self-checked on a contact sheet. Check them with: `python3 dev/figwork/acts/bigsheet.py OUT.jpg 4 <keys>`.
- Also pending upload, since the coordinator has not confirmed them:
  - the 17 person-card pictures and the 10 ev-toil banners (commands in the messages sent to the coordinator);
  - the 8 dialog banners from 5f86830f9: ev-e68-thmama, ev-j71f-thanhtho-1, ev-q72-mat-tram2, ev-q72-off-con, ev-e68-droughtprayer, ev-e68-heatstroke, ev-e68-letterhome, ev-e68-spoiledfood.

## Generations queued but not yet fetched
These ids are logged in dev/figwork/acts/pending2.txt. Call creations_get, then fetchb.py:
- xin-mang-che If6RSXltvE
- thao-mang-che s7otcjRl8e
- vet-thuong-lanh gOIhTghSXO
- lanh-con-seo 4RuH86S9Aa
- sai-theo-doi tCiZwftmZJ
- theo-doi-duoc SytvM4ZUb8
- theo-doi-trang LwBIcypswO
- theo-doi-bi-bat EbzW9x1uuO

## LEFT (exact)
1. **System-line pictures still to draw** (owner request: Tổng lược "Việc của ta" lines must not repeat the room picture). There are 48 keys, minus the 8 queued above.
   - Recompute the list: `python3 <scratch>/sys_need.py`, or diff the keys in the meanings.py system block against img/ and gens.txt.
   - Keys, from ke-la-vao-phong on: ke-la-vao-phong thay-dong-tinh do-hoi-gia-the len-mua-ngoai-cung ban-ra-ngoai chuyen-lo-ra cam-do chuoc-do dat-noi-vu giau-trong-ruong tu-tay-ket bay-o-yen-tiec minh-oan nhan-loi-tra-do kham-phong ngu-tu ngu-tu-tim-lai giau-ngu-tu ban-hon-con cuoi-chinh-phi doi-cung quoc-tang de-bat-nguoi-hau nhan-nguoi-chay-viec giao-viec co-viec-nho nhan-loi-nho nho-tra-an cung-duong-dau-den khan-cha-me moi-uong-tra du-tiec-nguoi-khac thang-bac thua-bac thang-cuoc thua-cuoc le-duoc-khen hanh-le-bi-che tiec-duoc-khen tiec-truc-trac
   - The Vietnamese scene for each key is in meanings.py.
2. **ACTS patch for the system lines** (not made yet). Build ACTS_sysline_patch.json in the same format as ACTS_personcard_patch.json, holding the system-block log rules, for the coordinator to merge into main's img/ACTS.json. Or rebuild the whole file from HEAD:
   `python3 dev/figwork/acts/build_acts.py <(git show HEAD:img/ACTS.json) img/ACTS.json` (write the HEAD file to a temp path first).
3. **Code change for a467, not yet sent.** The cause is main j87 kbkArt/kbkEvId: its default branch returns "j24:co-nguoi-den" for ctx "me", so every Tổng lược line gets the same room picture. Fix:
   - try the ACTS.json log rules (the act picture) first;
   - a rule key of "-" or no match must give NO art (or a small neutral category icon), never evArtOf("default");
   - the same applies to jk2b kitEvArt's fallback.
4. **Dialog banners:** 97 of 121 left. Run `python3 dev/figwork/acts/dprompt.py 8`, generate at 4:3, then fetchd.py and dsheet.py. Wiring the keys is for a467.
5. **Remaining act pictures:** about 240. See `python3 dev/figwork/acts/prompts2.py --todo 8`; the pending2.txt ids are excluded.
6. **Redo chu-nho-on** (the maid has an open-mouth smile). Logged in redo2.txt.
7. **Final steps:**
   - rebuild img/ACTS.json from the HEAD original, then cdn_sync it (or send patches);
   - Playwright Tuần lục check at 755x1000@2, 1000x755@2 and 1180x820@2: 0 shared meanings, 0 broken images, 0 page errors;
   - update ACT_PIC_ALL.md.
8. Rerun kit-fig2's check after ACTS lands: `node dev/test/act-compact.js <build url> <outdir> <tag>`. Its "miss" field must be empty.

## Known issues
- In a few pictures the Empress looks older than she should: to-toi-that, xin-hh-giang, hac-sai-pham. The owner may ask for redraws.
- In some curtsy pictures the woman looks slightly mid-step rather than standing upright.
- The scratchpad is shared and gets cleaned, so the contact sheets may be gone. Rebuild them with bigsheet.py or dsheet.py.
- The worktree guard rejects complex shell lines. Use single plain commands, or Python scripts written to a file.

## Tests
- `python3 dev/figwork/acts/meanings_check.py`: rule sanity.
- `<scratch>/a6w_unmatched.py`: main log lines with no rule. It needs origin/main modules, extracted by a6w_getmain.py and a6w_inv.js.
- The Playwright Tuần lục check (see LEFT 7).

## Session 15/11 PM (after the disk incident) — read this first
Worktree note: sparse checkout without dev/shots, dev/owner-shots and img/ (only manifests pulled). Pull a manifest with `python3 dev/site/cdn_sync.py --pull`; images are read from the CDN (`dev/figwork/acts/cdnsheet.py OUT.jpg COLS key...` builds a sheet straight from the CDN). Main was merged in (5e9d4a29b); main has no img/ in git.

DONE
- All gens2 pictures (incl. the 24 system-line ones, 17 person-card ones, toilette banners) were already on the CDN; nothing was lost.
- The 8 queued generations in pending2.txt (veil/scar/spy scenes) were NOT used: they show full people and fail the 16:50Z rule. Their keys (xin-mang-che, thao-mang-che, vet-thuong-lanh, lanh-con-seo, sai-theo-doi, theo-doi-duoc, theo-doi-trang, theo-doi-bi-bat) still need hands-only pictures.
- **16:50Z audit (action pictures = hands/objects only):** every picture used by ACTS.json `acts`/`prefix` was checked on contact sheets. The older batch (gens.txt, 92) is hands-only except cho-muon; the newer batch (gens2, 125) showed full people except day-con-xuong-ho and rut-the. **124 redrawn** hands-only (scenes: dev/figwork/acts/hscenes.txt, prompts: hprompt.py, fetch: hfetch.py, ids: hgens.txt), each checked on a sheet; redos logged in redo2.txt. On the CDN as `img/act-<key>-h.webp` (new names, the CDN caches by name for 7 days).
- **ACTS patch:** dev/figwork/acts/ACTS_hands_patch.json (163 acts + 8 prefix + 129 log rules -> `<key>-h`). Apply to the CURRENT CDN manifest with `python3 dev/figwork/acts/hpatch.py img/ACTS.json PATCH.json OUT.json` (pull first), then cdn_sync OUT as img/ACTS.json. APPLIED 15/11 by me after the coordinator approved: fresh pull, patched, every key re-checked against _index (498 distinct keys, 0 missing), pushed. Before: 0 '-h' keys. After: 124 '-h' keys, used by 163 acts, 8 prefixes and 129 log rules. Totals unchanged: 300 acts, 10 prefixes, 510 log rules. Verified: all 498 picture keys referenced by the patched manifest exist on the CDN.
- **Tuần lục title** (owner 17:14Z + redo): dev/figwork/title/. Horizontal v1-v4, vertical d1-d4 (letters stacked, fits the cover label slot), b1-b4 (two word blocks). Sheets: title-tuanluc-sheet.jpg, title-tuanluc-vertical-sheet.jpg. Waiting for the owner's pick; wiring = draw the PNG inside .kbk-label in j87 coverH.

LEFT (unchanged from the list above unless noted)
1. System-line pictures (48 keys, LEFT 1 above) + the 8 veil/scar/spy keys: draw them HANDS-ONLY too if they are action lines (16:50Z); story/event lines may show people.
2. ACTS sysline patch (LEFT 2), code fix a467 (LEFT 3).
3. Dialog banners: 97/121 left (LEFT 4) — these are event pictures, people allowed.
4. Remaining act pictures ~240 (LEFT 5) — draw with hprompt.py style (hands only).
5. Đoan ngọ dragon-boat banner; side-story NPC figures + portraits (incl. Phế phi họ Lý) — not started.
6. Playwright Tuần lục check after the patch lands (LEFT 7/8).

- dev/site/cdn_sync.py --pull was broken for everyone: the CDN Worker returns 403 when there is no User-Agent, and urllib sends none. Fixed by adding a User-Agent to the download request.

## Coordinator order 15/11 (after the patch was applied)
(1) Phế phi họ Lý + side-story NPCs without art — DONE for the map:
- Cause: the cold-palace stand-in {kind:"fallen"} has no ref, so figRoles() returned [] and she had no figure and no portrait (an empty frame).
- Fix: dev/build/jly.js, loaded right after j88 (added to the module list in assemble.py). She is one persistent person (S.lyF, saved with the game), role consort, tier cold, age 34. f88Wear lets her wear the cold dress, so the existing cold-palace art is used: plain undyed robe, wooden hairpin, no jewellery, no forehead mark. Her talk-panel portrait (pFaceOf) matches. In my run she got fig/por-consort-c06-tcold-a26.
- Audit: dev/test/npc-art-audit.js visits every place in two game states (early game, and a fallen rival) and lists every token without a figure. Before the fix: 1 of 37 tokens had none (Phế phi họ Lý). After: 49 of 49 have one.
- Side-story speakers in dialogs: the code scan found no bare NPC objects without art. Unknown strangers (j61, jht) show the silhouette on purpose.
- Edge case, not fixed: h54Face (prince-consort suitors and the Bắc Địch prince) takes FIGIX.man identities. There are only 11 of them, so with many suitors plus S.men they can run out, and those faces would then show initials. Drawing more "man" identities would fix it.
- (2) The 8 veil/scar/spy keys are DONE as hands-only pictures, on the CDN under plain names act-<key>.webp (the names meanings.py expects; they were never on the CDN before). They still have to be wired into ACTS.json together with the system-line patch.
- (3) Festivals, part 1, DONE:
  - Each of the 14 festivals now has its own event picture, img/ev-fest-<k>.webp (3:4), and EVENTS.json maps fest:<k> to a new category fest-<k>. Before, 10 festivals shared 5 season groups and vulan, vantho, thanhtho and lapbat had no picture.
  - Each festival also has a 4:3 dialog banner, img/ev-fest-<k>-b.webp, shown as headArt on the festival dialogs, keeping the Emperor portrait. Wired in j31 (FESTEV push) and j71 (fDay7 wrapper), which also set evId "fest:<k>". This includes the Đoan ngọ banner.
  - Files: dev/figwork/fest/ (fscenes.txt, fbanner_prompts.txt, ffetch.py, fgens.txt).
  - Still to do: map-fest pictures for thanhtho, vulan, vantho, lapbat.
- (3) Festivals, part 2, DONE:
  - Map pictures added for vulan (night), vantho, thanhtho and lapbat (morning): img/map-fest-<k>-<buoi>.webp, edited from the season map with that map as the image reference.
  - Shift against the season map, measured on a 4x3 tile grid: within 2 px everywhere, so the hotspots are unchanged (dev/figwork/fest/mapfetch.py).
  - thanhtho was redrawn once: the first version decorated the east compound, but Từ Ninh cung (tn) is the west compound with the lotus pond.
  - Wired through `files` in the FEST table (j31 for vulan, vantho, lapbat; j71 for thanhtho) and in map-hotspots.json (14 festivals now).
  - Checked with dev/test/fest-art.js: all 14 festivals resolve to their own map picture where one exists, and fDay7 dialogs carry the banner and evId "fest:<k>". No page errors.
- (4) Dialog banners:
  - pending_dlg.txt was stale: all 34 entries were already on the CDN as ev-<key>.webp. They are now recorded in gens_dlg.txt and pending_dlg.txt is empty.
  - New batch of 8 drawn and on the CDN: e68-springallergy, e68-stormnight, evpick, giftpick, j70thr, j71f-thanhtho-2, j71f-vantho-1, j71x-sac.
  - e68-stormnight and giftpick were redrawn because an unrequested Emperor appeared; for scenes with no Emperor, add "NO Emperor, nobody in yellow".
  - **89 banners left** (python3 dev/figwork/acts/dprompt.py N lists them; fetch with fetchd.py; PREV=<scratchpad>/prev).

## Coordinator order 15/11 (b), after 7cce4420d (that commit is reviewed as its own code batch)
(a) System-line ACTS patch: APPLIED LIVE.
- Tool: dev/figwork/acts/syspatch.py. Output: ACTS_sysline_patch.json.
- Block: 77 rules in the meanings.py "Tổng lược system lines" block.
  - 37 added. Their keys are on the CDN, or "-" (1 rule).
  - 40 held because no picture exists yet; those lines keep their old behaviour. The held keys are listed in the patch file.
- The rules go at the END of the log. All 510 live rules come before the block in meanings.py, and the only rule after it (tu-dung) is not live.
- Before: 300 acts, 10 prefixes, 510 log rules, 498 distinct keys. After: 300 / 10 / 547 / 529. 0 keys missing on the CDN; the first 510 rules are unchanged.
- The 8 veil/scar/spy keys are wired.
- Note: 23 of the 36 newly referenced pictures (earlier gens2 system-line batch) show full figures. They are book event/result lines, which may show people, so I kept them. Coordinator decides whether to redraw any as hands-only.
- Also: live ACTS.json has 510 of meanings.py's 837 rules. About 250 other act-pics2 meaning rules have never been merged; that is outside this patch.
(b) More "man" identities: DONE, live.
- Finding: suitors and the Bắc Địch prince use jht's private ctFace, which reads img/FIGURES-congtu.json (congtu-1..10, a18 + a26 only), never the men pool. With more than 10 live suitors, the rest fell back to initials.
- New: quytu-1..9 (young noblemen; scholar, noble, martial, merchant and hunter looks) and bacdich-1 (northern steppe prince, fur-trimmed robe, no Qing hat).
  - Each has the 4 age bands a18, a26, a36 and a51 (figure + portrait), drawn as one gpt-2-6 lineup of 4 ages, background removed, cut by dev/figwork/menpool2/proc.py, portraits by porcrop.py.
  - Colours: no pink or purple. 80 files, plus FIGURES-congtu.json (20 identities, 60 entries), on the CDN; every entry checked.
- Code: dev/build/jct2.js (after jht in assemble.py) wraps window.h54Face. The Bắc Địch prince always gets bacdich-1, and ordinary suitors only take it if every other face is live.
- Test: dev/test/suitor-faces.js, 18 known suitors. 0 without a portrait, 0 duplicate faces, the prince gets por-man-bacdich-1, no page errors.
  - Unmet suitors still show the "unknown" silhouette (jht stranger rule, unchanged).

## Session 15/11 late (coordinator order: 5 steps)
Notes: `cdn_sync.py --pull` does NOT refresh img/_index.json reliably (stale local copy); verify keys against the live index fetched with `curl -A ctm https://ctm-img.victoria-tntt.workers.dev/img/_index.json`. Checker: tmp-free copy in dev/figwork/acts/verify_acts.py (BEFORE AFTER INDEX).
### Step 1 DONE: 23 full-figure system-line pictures classified (16:50Z rule)
- ACTION (she does it) -> redrawn hands-only as act-<key>-h.webp (12): ghi-ten-du-thi, bat-dau-bay-muu, ngu-mot-dem, giu-kin-co-thai, chai-chuot-gian-di, chai-chuot-long-lay, chai-chuot-vua-van, thay-y-phuc, thao-trang-suc, deo-trang-suc, deo-mang-che, tu-choi (tu-choi also serves the acts "Từ chối / Khéo từ chối / Từ chối khéo", it showed two women).
- EVENT/RESULT (kept, people allowed) (12): dung-chot, doat-giai, hang-nhi-ba, nguoi-khac-doat-giai, do-hong-bo, xac-lao-vuong, thi-tam, dem-cung-khac, noi-vu-dua-y-phuc, thieu-le-y-phuc, ht-de-mat-y-phuc, tan-phong (+ duong-xa landscape).
- Already hands-only: xin-xam, bao-tin-co-thai, to-giac.
- Live ACTS.json patched with hpatch.py (now skips hgens 'plain name' lines): 3 acts + 13 log rules -> -h; counts unchanged 300/10/547; 0 keys missing in the live index. Patch record: ACTS_hands_patch2.json.
- Flag for coordinator: doat-giai and nguoi-khac-doat-giai show the Emperor handing the prize (scene text names him); kept.
### Coordinator add-on DONE: "Khảo hạch tấn phong" (review/promo-exam jexam.js card n:"Khảo hạch tấn phong")
- Hands-only exam desk picture (brush, inkstone, sealed scroll, embroidery hoop, guqin corner) on the CDN as img/act-khao-hach-tan-phong.webp (plain name; hgens id 1lpoY9Sr4r).
- Live ACTS.json acts["Khảo hạch tấn phong"] = "khao-hach-tan-phong" (acts 300 -> 301; key verified in the live _index, 0 missing).
### Step 2 DONE (data only, live): meanings.py rules merged into live ACTS.json
- Tool: dev/figwork/acts/mergepatch.py LIVE.json INDEX.json PATCH.json OUT.json CORPUS.txt (meanings.py order; live rules keep key + relative order, asserted).
- Corpus guard: corpus.py builds first sentences from inv_ast.js (static inventory of every log/ret/option template, 1477 lines; tmp copy of inv_ast.js needs B=<worktree>/dev/build/ and the module list taken from the `js=` line). A new rule that would take a line away from a live picture rule is held ("heldSteals").
- Before: acts 301, prefix 10, log 547, 529 distinct keys. After: 301 / 10 / 554 / 529. 0 keys missing in the live _index.
- Added 7: six "-" rules (origins, item names, wardrobe buttons, stat deltas, Bổng lộc/Đợi/Mặc kệ, plot-fragment lines) + xac-lao-vuong's "^Xác lão Vương". Corpus effect: 38 lines None -> "-" (no thumbnail), 0 lines lose a picture.
- Held 277 rules (picture not on the CDN): keys in merge_held_keys.txt (this IS the remaining-picture queue, see step 5). Held 6 "-" rules that would steal picture lines (e.g. "Núp sau hòn giả sơn ..." would lose nghe-lom-gia-son): listed under heldSteals in ACTS_merge_patch.json; the meanings.py rules need narrowing before they can go live.
- Rerun after new pictures land: same command; it adds whatever is now on the CDN.
- Note: dev/test/act-pics.js is stale against current main (start() not defined) — not used.
### Step 3 DONE (code, commit f0512cdce + test ab8e03206): a467 Tổng lược fallback
- Main (ad94afe4e) already had: ACTS log rule first, "-" -> no picture, no "Có người đến" default except on the Emperor's / Thái hậu's pages, kitEvArt without the j89 default.
- Remaining gap fixed in j87 kbkCands: on ctx "me" (Việc của ngươi) a line with no ACTS rule no longer takes an event-group (KBK_EVRE) or act-category (act-cat-*) stand-in; only a picture made for the line (log rule / its place / its act name), else none.
- Test dev/test/a467-me-art.js <url> <corpus.txt>: 1477 corpus lines. Old path: 649 own, 186 event-group, 500 act-category (10 "Có người đến"), 142 none. New "me": 649 own, 0 stand-ins, 828 none. 0 page errors.
- Shots dev/test/a467-book-shots.js <url> <outdir> at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844: no overflow, 0 broken images, 0 page errors; the visitor line has no picture, her wardrobe/refusal lines pick deo-trang-suc-h / thao-trang-suc-h / tu-choi-h.
- Test page note: dev/index.html is a fragment without <meta charset>; serve a wrapped copy (tmp/site/index.html) or the root build, never dev/ raw (Invalid token in Chromium).
- Main merged in (b5? see git log: "Merge origin/main into review/act-pics2"), assemble.py keeps jct2 after jht.
### Step 4 DONE: dialog banners (89 -> 0 left)
- 16 drawn, checked on sheets, on the CDN: j71x-tai nc1 news-tin-trong-cung night2 q72-doi-thuoc q72-don-ta q72-hh-trungthu q72-loi-thoi q72-maid-tet q72-mat-tram q72-ns-doi q72-th-aodong q72-th-mai q72-th-thanhminh q72-th-trungcuu q72-tv-mua (ids in gens_dlg.txt).
- Prompts: dprompt.py template + "NO Emperor, nobody in yellow" for scenes without him; envoy in nc1 wears a hood (no fur hat).
- Session 15/11 night: the last 73 drawn, every one checked on 4-column sheets, all on the CDN as img/ev-KEY.webp (ids in gens_dlg.txt; local copies deleted). dprompt.py now adds the NO-Emperor line itself and drops the Emperor sentence for those scenes. One redraw: q72-qua-tet (Emperor's hand at his chin -> hands on the table).
- Pipeline helpers: trxurl.py KEY=ID.. (reads the finished url from the session transcript, TRX=<.jsonl>), dgo.sh KEY=ID.. (fetch + sheet $PREV/sheet.jpg), dgo.sh --push KEY.. (CDN + delete local). hgo.sh is the same for act pictures (-h).
### Step 5 STARTED: remaining act pictures (hands-only, -h names)
- Queue = `python3 dev/figwork/acts/prompts2.py --todo 400` (284 before this batch) = the held keys of mergepatch. Write an English hands-only scene per key in hscenes.txt (Vietnamese scene in meanings.py), `hprompt.py 8`, generate gpt-2-6 3:4 with the style ref it names, `hfetch.py`, sheet-check, cdn_sync, then rerun mergepatch.py (with tmp corpus) to wire them live.
- Batch 1 (8) on the CDN and wired live: van-dong-do-dau chai-chuot-nhan-sac nghi-lay-suc o-yen-nghi tinh-duong ngu-som o-cung-giu-am ban-thuong. Live ACTS: log 554 -> 562, keys 529 -> 537, 0 missing, corpus: 0 picture lines lost (1 line None -> ban-thuong-h). 276 left.
- Batch 2 (20, session 15/11 night) on the CDN and wired live: an-cu-duoc-lat an-thuong ban ban-hon-con ban-len ban-ra-ngoai banh-trung-thu bao-cho bat-gap-trao-anh-mat bat-thuoc-bi-do bay-ke-phan-gian bay-o-yen-tiec benh-chua-giam bi-ban-chet bi-bat-buon-lau bi-bat-mang-thu-lanh-cung bi-bat-tra-khao bi-cam-tuc bi-day-xuong-ho bi-giang. Live ACTS: log 562 -> 582, keys 537 -> 557, 0 missing in the live _index; corpus (1489 lines, rebuilt from current dev/build): 0 lost, 41 None -> picture. Patch record ACTS_merge_patch6.json. merge_held_keys.txt regenerated from it: 249 keys left (this is the queue).
- Wiring recipe (each batch): `mkdir -p tmp/wire; cd tmp/wire`; corpus once: copy inv_ast.js with B=<worktree>/dev/build/ and the module list from the `js=` line of assemble.py, `node inv_ast.js inv.json; python3 ../../dev/figwork/acts/corpus.py inv.json corpus.txt`; then `curl -A ctm .../img/ACTS.json?t=..` -> live.json, same for _index.json; `mergepatch.py live.json index.json patch.json out.json corpus.txt`; `verify_acts.py live.json out.json index.json` (0 missing) + `corpus_diff.py live.json out.json corpus.txt` (0 lost); `cdn_sync.py --pull img/ACTS.json` (must equal live.json), cp out.json img/ACTS.json, `cdn_sync.py img/ACTS.json`, re-curl and cmp.
- Batch 3 (23) on the CDN and wired live: dung-sau-hau-chu day-le-nghi cau-xin-quan-su quan-su-gat-dau bi-quan-su-bat-gap cui-dau-nhan-loi khoc-xin-tha cai-lai vang-lenh mat-bao-hh mat-bao-cho len-bao-tin thanh-minh dut-bac-rut-loi cui-dau-thua-ten viec-khong-thanh nang-so-viec-nguy doan-ra-do-minh nhan-toi-thay de-nang-chiu-don lam-ngo mua-lay dua-com-ao. Live ACTS log 582 -> 605, keys 557 -> 580, 0 missing, corpus 0 lost (4 gained). Record ACTS_merge_patch7.json. Queue (merge_held_keys.txt) 225 left; "scene:rv" is a runtime room picture key, never drawn, excluded from the queue.
- wire.sh N does the whole wiring recipe with the two approval checks (stops before upload if a key is missing or a corpus line loses its picture). Keys/ids of queued gens go in hpending.txt ("KEY ID"); `hgo.sh $(awk 'NF==2{print $1"="$2}' hpending.txt)` fetches them all.
- Batch 4 (24) on the CDN and wired live: li-xi nau-chao-phat nau-che-mung chep-kinh theu-khan-ban-lc trai-gioi le-tru-ta rinh-bat-gia-ma ke-gia-ma goi-banh-u tui-ngai cuoc-thuyen-rong thuyen-ve-nhat theo-len-nui ruou-cuc tha-den-cau-sieu cung-phi-tan-oan muon-le-do-hoi muon-dip-do-tin theo-hau-le-te dang-ngoc-nhu-y le-mon dang-cau-doi giai-cau-do-den. Record ACTS_merge_patch8.json. Live ACTS log 605 -> 629, keys 580 -> 604, 0 missing, corpus 0 lost. Queue 201 left.
- Batch 5 (24) on the CDN and wired live: dao-den tha-den-cau-con tao-mo lam-banh-cho-con don-giao-thua viet-cau-doi thu-mui-ten cuoc-thien-xa hoi-phuong sai-di-do-la nho-do-tin do-la-duoc nghe-len-duoc nap-nghe-bi-bat len-cai ke-len-cai-bi-bat tim-thay-hinh-nhan vu-oan-bi-lo dao-duoc-hinh-nhan-trieu hinh-nhan-lan-goc khap-cung-don loi-don-khong-ai-tin loi-don-phung-phi ly-gian-khong-tin. before acts 301 prefix 10 log 629 distinct keys 604;after  acts 301 prefix 10 log 653 distinct keys 628; 0 missing, 0 corpus lines lost. Record ACTS_merge_patch9.json. Queue 177 left.
- Batch 6 (24) on the CDN and wired live: ngam-doc-dan trung-doc trung-doc-thuoc-giai thuoc-doc-bi-phat-hien hoang-hau-bang-ha-tra cai-ba-do pha-hoc-lo to-giac-truoc-hh to-giac-truoc-ht to-giac-truoc to-giac-khong-thanh to-loi-voi-chu to-khong-tin ke-toi hh-nghe-giang hh-gat-loi hh-bac-chung-cu trinh-len-ht so-lo-chuoc-chung-cu khong-chiu-dua-bac giu-chung-cu ghi-nho-chung-cu cat-giu-con-tin chung-cu-bi-huy. before acts 301 prefix 10 log 653 distinct keys 628;after  acts 301 prefix 10 log 673 distinct keys 648; 0 missing, 0 corpus lines lost. Record ACTS_merge_patch10.json. Queue 153 left.
- Batch 7 (24) on the CDN and wired live: hop-muu hop-muu-lo bi-phat-giac-dinh tu-thong-ban-chet dut-bac-bit-mieng diet-khau thai-giam-chet-duoi dut-bac-dap-don tim-ke-tung-tin de-loi-don-lan khiem-nhuong-choi-tu bo-bac-chuoc bo-mac tra-bac-thay diet-ke-tong-tien de-ong-tu-lo mua-chuoc-khtg mua-chuoc-ccti can-rang-chiu dung-ra-noi-do do-them-dau im-lang quy-xin-tha-cho-nang dung-xem. before acts 301 prefix 10 log 673 distinct keys 648;after  acts 301 prefix 10 log 696 distinct keys 671; 0 missing, 0 corpus lines lost. Record ACTS_merge_patch11.json. Queue 129 left.
- Batch 8 (24) on the CDN and wired live: them-loi-buoc-toi len-gui-bac-nha khong-can-du quay-lung-bo-di truy-ngu-thien doi-nguoi-nau khoc-ke-ht dot-ngay-lan-dau keu-oan nho-th-dung-ra day-toi-cung-nu xin-ht-tra-xet thu-long mat-tau theo-cha-muu cam-quan-vay-cung hh-bi-phe vien-co-thoai-thac bo-bac-lo-lot vang-menh trung-co-quoc giau-ong tim-chung-cu-cha dieu-tra-an-cu. before acts 301 prefix 10 log 696 distinct keys 671;after  acts 301 prefix 10 log 720 distinct keys 695; 0 missing, 0 corpus lines lost. Record ACTS_merge_patch12.json. Queue 105 left.
- Batch 9 (22) on the CDN and wired live: tim-chung-cu-minh-oan hoi-chuyen-cu dang-thu-ht nho-dua-thu-keu-oan lat-an-tien-de cam-co chuoc-lai may-ao tam-doc nghiem-doc thai-y-phat-hien thai-y-khong-thay-la kiem-tra-ruong kiem-tra-ruong-sach tich-thu-co-co tich-thu-vo-co hh-ban-cho duoc-ban hh-thuong-hien-thuc tro-ve-lanh-cung-nuoi tha-toi-chet vao-lanh-cung. before acts 301 prefix 10 log 720 distinct keys 695;after  acts 301 prefix 10 log 742 distinct keys 717; 0 missing, 0 corpus lines lost. Record ACTS_merge_patch13.json. Queue 83 left. Redraw queued: xu-tram (first draw showed an unrelated hand exchange), tau-xin-nguoi-cua-cha (open scroll looked like script).
- Batch 10 (26, incl. redraws xu-tram + tau-xin-nguoi-cua-cha) on the CDN and wired live: xu-tram tau-xin-nguoi-cua-cha roi-lanh-cung dem-dong-lanh-cung duoc-an-xa-ve-cung thai-hau-quo-trach vuong-gia-quo-trach cach-chuc-bien-ai thai-hau-bang-ha nhan-sac-phai gai-ngua-yen-tiec dich-dau-mua nhiem-benh tu-boc-thuoc hau-benh-ca-thang gui-le-van-an gui-bac-chua-benh xin-an-ve-tham viet-thu-hoi-han bo-yen-thuc-ben-con moi-thai-y-du-yen lao-vao-cuu chi-huy-dap-lua tra-ke-phong-hoa giup-mot-tay dung-ra-can. before acts 301 prefix 10 log 742 distinct keys 717;after  acts 301 prefix 10 log 768 distinct keys 743; 0 missing, 0 corpus lines lost. Record ACTS_merge_patch14.json. Queue 57 left.
- Batch 11 (23) on the CDN and wired live: dung-ve-phia mach-hh mach gop-bac-giau-the tuyen-tu tau-tuyen-it tau-tuyen-nhieu vao-cung-phong dau-ba-quan so-hac-can-chinh quy-xin-tha xin-th-do-loi cau-xin nho-nguoi-ben-ngoai nho-cau-xin nho-minh-oan dang-bac-n cat-bong-de-dang ke-la-vao-phong thay-dong-tinh do-hoi-gia-the len-mua-ngoai-cung chuyen-lo-ra. before acts 301 prefix 10 log 768 distinct keys 743;after  acts 301 prefix 10 log 791 distinct keys 766; 0 missing, 0 corpus lines lost. Record ACTS_merge_patch15.json. Queue 34 left. Redraw queued: so-khen (open memorial looked like script).
- Batch 12 (33, incl. redraw so-khen) on the CDN and wired live: so-khen cam-do chuoc-do dat-noi-vu giau-trong-ruong tu-tay-ket minh-oan kham-phong ngu-tu ngu-tu-tim-lai giau-ngu-tu cuoi-chinh-phi doi-cung quoc-tang de-bat-nguoi-hau nhan-nguoi-chay-viec giao-viec co-viec-nho nhan-loi-nho nho-tra-an cung-duong-dau-den khan-cha-me moi-uong-tra du-tiec-nguoi-khac thang-bac thua-bac thang-cuoc thua-cuoc le-duoc-khen hanh-le-bi-che tiec-duoc-khen tiec-truc-trac tu-dung. before acts 301 prefix 10 log 791 distinct keys 766;after  acts 301 prefix 10 log 824 distinct keys 799; 0 missing, 0 corpus lines lost. Record ACTS_merge_patch16.json. Queue 1 left. Redraw queued: nhan-loi-tra-do (first draw came out as a two-panel split = grouped image).
- Batch 13 (1, redraw nhan-loi-tra-do) on the CDN and wired live: log 824 -> 825, keys 799 -> 800, 0 missing, 0 lost. Record ACTS_merge_patch17.json. **Step 5 DONE: merge_held_keys.txt is empty (0 left).** Still held by design: the runtime key scene:rv and the 6 "-" heldSteals rules from step 2 (meanings.py regexes need narrowing first).
- Session total (15/11 night): 73 dialog banners + 263 hands-only act pictures (keys 537 -> 800, log 562 -> 825), every one looked at on sheets; redraws: q72-qua-tet (banner), xu-tram, tau-xin-nguoi-cua-cha, so-khen (script-like paper), nhan-loi-tra-do (split panel).
### Step 6 STARTED: story pictures (coordinator add-on, audit = review/event-balance dev/review/story-deadlines.md)
- Wiring is data-only: j89.js stArtOf(arc,beat,ending) reads EVENTS.json stories[arc].files[beat|"bia"|"ket-x"] (fallback own file -> bia -> efb/fb ev-category -> evArtOf). No code needed; tm96a/b/c (ARC67 ids in j96.js) were missing from stories, swire.sh adds them ({title,o:"tm",fb:"tu-tinh",efb:{},files}).
- Pictures are drawn ONE per generation (no 2x2 grids: "never group images"), gpt-2-6 3:4 1k, style ref cplQijT0eP day / s7o88xTl8e night, people allowed, NO Emperor line when he is absent, no Qing hats/collars. Tools in dev/figwork/stories: bia_scenes.txt (arc|night|English scene), bprompt.py ARC.. (prompt), sfetch.py < "ARC ID URL [KEY]" (crop 3:4 -> img/st-<arc>-<key>.webp 768x1024, log gens_single.txt), ssheet.py (sheet), swire.sh arc[:key].. (cdn_sync pictures, pull-check + edit + push live EVENTS.json, re-curl LIVE-OK, 0 missing in live _index, delete local copies).
- Covers DONE: all 42 arcs now have a bia (39 coverless arcs in the live EVENTS.json incl. td_an and dtq_huynh + new tm96a/b/c), every one checked on sheets, live, 0 missing. One redraw: cnv_chu (maid's hand beside her face -> hands folded at the waist).
- Next: the chapter beats without their own picture (305 of 365 in the audit). Same tools: add "arc|night|scene" lines keyed arc:beat (extend bprompt.py to read beat keys), sfetch "ARC ID URL BEAT", swire.sh arc:beat.
- Held "-" rules narrowed in meanings.py (coordinator 15/11): N|X|XX dropped from the UI-word rule; "^Cưới khi con tròn" removed / "(?!Cưới khi)" on the age rule; "^Thánh chỉ:(?! tấn phong)"; reaction rule skips "kết giao", "bị Hoàng thượng lạnh nhạt", ": bị lạnh nhạt"; "bị xét tội" skips "trình chứng cứ"; tryst/letter rule skips "Núp sau hòn giả sơn". All 6 live via wire.sh 18 (ACTS_merge_patch18.json): log 825 -> 831, keys 800, 0 missing, corpus 0 lost (64 lines None -> marker/picture). Still held: 5 picture rules (to-giac-truoc-hh/ht/-, to-giac-khong-thanh, tu-thong-ban-chet) that would take lines from an earlier picture rule; they need rule order changes, not regex narrowing.
- Chapter beats STARTED (coordinator approved drawing them all): the audit table (review/event-balance dev/review/story-deadlines.md, "Banners missing") parses to 295 arc:beat keys (copied to dev/figwork/stories/beats_audit.txt; the audit's "305" heading counts differently). 64 drawn, checked on 8-column sheets, live and wired, 0 missing: dtq_huynh c3 t1 x1; td_an, td_ke, td_song, td_tha (all 7 each); muoi_lau, muoi_doi, muoi_no (all 7 each); cn_chu (7); cn_tinh s1 s2 c1 c2 c3. **231 left.**
- Beat pipeline: write "arc:beat|night|English scene" in beat_scenes.txt (scene from stories.json B[beat].t; tm96 beats from j96.js ARC67.tm96a/b/c), compact prompt = bprompt2.py arc:beat (adds the Emperor sentence only when "Emperor" is in the scene, else NO Emperor), generate gpt-2-6 3:4 1k with the style ref it names, log "arc:beat ID" in spending.txt, `sgo.sh` (fetch + crop + 8-col sheet $PREV/ss.jpg), look, then `swire.sh arc:beat ...` (upload, live EVENTS.json files[beat], LIVE-OK, 0 missing, local copies deleted). Scenes already written but not drawn: cn_tinh t1 x1, cn_ban (7), cn_than (7).
- Beats batch A (16, session 15/11 late-night): cn_tinh t1 x1, cn_ban (7), cn_than (7) drawn, checked on sheet, live + wired, 0 missing. 80 of 295 done, 215 left. Scenes written, generating: nc_gian, nc_su, nc_tuc, nc_vuong (ids of in-flight gens in tmp/pend*.txt).
- Beats batch B (16): nc_gian (7), nc_su (7), nc_tuc s1 s2 live + wired, 0 missing. 96 of 295 done, 199 left.
- Beats batch C (16): nc_tuc c1-x1, nc_vuong (7), ch_co s1-c2 live + wired, 0 missing. 112 of 295 done, 183 left.
- Beats batch D (16): ch_co c3-x1, ch_benh (7), ch_ho s1-t1 live + wired, 0 missing. 128 of 295 done, 167 left.
- Beats batch E (16): ch_ho x1, ch_bi (7), thd_tho (7), thd_sach s1 live + wired, 0 missing. 144 of 295 done, 151 left. Scenes written (not all drawn yet): thd_sach..thd_hoc, cnv_chu, cnv_ban, cnv_mat, cnv_ma.
- Beats batch F (16): thd_sach s2-x1, thd_tro (7), thd_hoc s1 s2 c1 live + wired, 0 missing. 160 of 295 done, 135 left. Queued gens (ids in spending.txt, fetch with sgo.sh): thd_hoc c2-x1, cnv_chu (7), cnv_ban s1-c3.
- Beats batch G (16): thd_hoc c2-x1, cnv_chu (7), cnv_ban s1-c3 live + wired, 0 missing. 176 of 295 done, 119 left. Queued (ids in spending.txt): cnv_ban t1 x1, cnv_mat (7), cnv_ma (7). Scenes written, not drawn: s_than, s_thu, s_hoa, s_su.
- Beats batch H (16): cnv_ban t1 x1, cnv_mat (7), cnv_ma (7) live + wired, 0 missing. **192 of 295 done, 103 left.**
- RESUME (exact, session 15/11 late-night stopped for context): left = s_than s_thu s_hoa s_su (28, scenes ALREADY in beat_scenes.txt, not drawn), s_dich s_tinh s_thay s_ban st_the st_con st_dong (49, write scenes from stories.json B[beat].t), tm96a a1-a6, tm96b b1l b1h b1d b2a b2b b3a b3b b4 b5 b6, tm96c c1n c1o c1t c2 c3a c3b c4a c4b c5 c6 (26, scenes from j96.js ARC67.tm96a/b/c; swire.sh creates the tm96 arc entries). Recompute: python3 over beats_audit.txt minus gens_single.txt. spending.txt is empty (nothing in flight). Loop per 16: write scenes -> gpt-2-6 3:4 1k, style ref cplQijT0eP day / s7o88xTl8e night, folder ba4aecfe..., compact prompt (see bprompt2.py; Emperor sentence only when the scene has him, else 'NO Emperor, nobody in yellow') -> append 'arc:beat ID' to spending.txt -> creations_wait -> TRX=<session transcript dir> PREV=tmp/prev bash sgo.sh -> look at $PREV/ss.jpg -> swire.sh keys (timeout >= 6 min) -> commit/push.
- Note: several accepted pictures have maids/consorts in pale cream-yellow (not imperial yellow) in no-Emperor scenes (e.g. nc_tuc c2, ch_benh s1, cnv_chu t1); flag for the reviewer if pale yellow should count as 'yellow'.
- NOT started: the 5 held picture rules (to-giac-truoc-hh, to-giac-truoc-ht, to-giac-truoc, to-giac-khong-thanh, tu-thong-ban-chet) -> fix by rule ORDER in meanings.py, then wire.sh with the mergepatch corpus check (0 lines lose a picture).
- Beats batches I-M (session 15/11 evening, 103 drawn + 4 redraws): s_than, s_thu, s_hoa, s_su, s_dich, s_tinh, s_thay, s_ban, st_the, st_con, st_dong, tm96a (6), tm96b (10), tm96c (10). Scenes for s_dich..st_dong written from stories.json B[beat].t, tm96 scenes from j96.js ARC67 B[beat].t (beat_scenes.txt). Every picture looked at on 8-col sheets; redraws: s_tinh:s1 (consort in noticeable yellow), s_ban:s2 (hand beside face), st_the:x1 (consort in yellow, no-Emperor scene), st_con:x1 (child in yellow robe). Scene softenings: "frowning"->"watching gravely", "stern Empress"->"composed", "sly glance"->"knowing look". tm96a/b/c arc entries already existed in the live EVENTS.json (from the covers), swire.sh only added files.
- **Step 6 beats DONE: 295 of 295 audit beats wired in the live EVENTS.json; 433 story files in total, 0 missing in the live _index.** spending.txt empty; local copies deleted.
- Accepted with pale cream/pale yellow on women in no-Emperor scenes (coordinator: acceptable): s_than:s1, s_thay:s2, s_dich:c2 (maid), tm96c:c3b, st_the:t1.
### Held picture rules DONE (rule ORDER, 15/11 evening)
- meanings.py: to-giac-truoc-hh / -ht / to-giac-truoc / to-giac-khong-thanh moved to right after the live ("to-giac", "^Ngươi tố giác") rule; tu-thong-ban-chet moved to right after the live "bị ban chết" (bi-ban-chet-h) rule. They no longer take lines from those picture rules; they now serve the lines no earlier rule matches.
- wire.sh 19 (ACTS_merge_patch19.json): log 831 -> 836, keys 800 -> 805, 0 missing on the CDN, corpus 1489 lines: 0 lost, 7 gained (None -> to-giac-khong-thanh-h x6: "X tố giác Y không thành", "X tố Y nhưng không đủ chứng"; None -> tu-thong-ban-chet-h: "Chuyện tư tình bại lộ."). heldSteals now empty; only the runtime key scene:rv stays held (by design). LIVE-OK.
- Note: "Ngươi tố giác ... trước Hoàng hậu/Hoàng thượng" and "... tư thông bị phát giác, bị ban chết" keep their old pictures (to-giac, bi-ban-chet-h) because the approval rule forbids picture->other picture changes. If the coordinator wants the specific pictures on those lines, that is a deliberate picture swap needing an explicit OK (move the 5 rules back above and allow the swap in corpus_diff).
- SUPERSEDED (coordinator approved the picture swap, 15/11): meanings.py restored to the original order (the 5 specific rules ABOVE "^Ngươi tố giác" and "bị ban chết"). Live ACTS log reordered with dev/figwork/acts/swap_order.py (keys unchanged, 836 rules, only order; fails on any change outside the allowed old->new pairs). Corpus: exactly 6 lines moved, 0 not allowed, 0 to none: "Lan Tần tư thông bị phát giác, bị ban chết." bi-ban-chet-h -> tu-thong-ban-chet-h; "Ngươi tố giác Lan Tần/ngươi không thành; chứng cứ bị hủy." to-giac -> to-giac-khong-thanh-h (x2); "Ngươi tố giác ngươi trước Hoàng hậu: thành." -> to-giac-truoc-hh-h; "... trước Hoàng thượng: thành." -> to-giac-truoc-ht-h; "... trước ngươi (Hoàng hậu): thành." -> to-giac-truoc-h. 0 missing on the CDN, mergepatch stable on the result (adds 0, order assert passes), LIVE-OK. Full live file kept as ACTS_swap_patch20.json.
### Act-picture audit (coordinator 15/11 evening, owner rule: no visible face; DARK = scheming/negative, LIGHT = normal) - LIST SENT, WAITING FOR GO
- 805 act keys (live ACTS.json log + acts + prefix) downloaded to tmp/audit/<key>.webp; 14 labelled 10x6 contact sheets (tmp/asheet.py -> tmp/sheets/sNN.jpg), every sheet looked at; face indices per sheet in tmp/faces_idx.txt; luminance + meaning in tmp/audit_meta.json.
- Result in dev/figwork/acts/audit_1115.txt: FACE 288 (all are old full-figure pictures; 0 of the -h hands-only ones), NEGATIVE-but-light 121 (39 also FACE), NORMAL-but-dark 22 (10 also FACE), night-by-nature normal acts 18 (proposed keep), UNION 382 to redraw. Over the ~60 limit -> list sent to the coordinator, nothing drawn yet.
- Resume after GO: write a faceless scene per key (hands/feet/back view/silhouette; dark bg for negative keys, light for normal), generate gpt-2-6 3:4 with the act style refs (hprompt.py pipeline), save as img/act-<base>-h.webp (new -h names keep the old file), then point the live rules at the new keys (hpatch.py-style key rename in ACTS.json log/acts/prefix), corpus_diff must show only the renamed keys changing, 0 to none.
### Act-picture REDRAW (coordinator approved all, 15/11 evening) - IN PROGRESS, 92 of 380 live (batch 1 done; batch 2 keys 61-92 live; scenes for keys 93-120 (gian-la-loi .. ke-nho-chuyen-cung) ALREADY in rscenes.txt, not drawn; hpending.txt empty). Audit counts after 92: FACE 288->196, negative-light 121->105, normal-dark 22->18 (python over audit_1115.txt sections vs rdone.txt). Resume: draw 93-120 with `python3 rprompt.py $(grep -v '^#' redraw_order.txt | sed -n '93,120p' | awk '{print $1}')`, sheet, rwire.sh, then write scenes 121+ (Vietnamese scene in tmp/audit_meta.json key->scene/lines). Normal-tone scenes must not say night (rprompt adds daylight style); dem-cung-khac was redrawn as golden evening
- Coordinator: redraw all (faces first, then light mismatches), keep the 18 night-by-nature normal acts, tags fixed to normal: minh-oan-h, quy-xin-tha*, nhan-loi-vao-phe, cao-benh-cho-con, cao-benh-dem-h, so-thi-tam. Queue recomputed: 380 keys = FACE 288 + negative-light 116 + normal-dark 24 (union 380), in order in dev/figwork/acts/redraw_order.txt (KEY TONE GROUP). Batches of 60; report counts per batch; final before/after table.
- Magnific balance 15/11 18:45Z: 1,452,183 credits (380 x 40 = ~15k): enough.
- Pipeline (dev/figwork/acts): write "KEY|dark|English scene" lines in rscenes.txt (NO face: hands/feet/back view/silhouette; dark=1 for negative keys) -> `python3 rprompt.py KEY..` prints "FKEY|styleRef|prompt" (style If6wqwdtvE day / fHA471qCDY night) -> gpt-2-6 3:4 1k, folder ba4aecfe..., append "FKEY ID" to hpending.txt -> creations_wait -> `TRX=/root/.claude/projects/-home-user-cung-tuong-mong PREV=$PWD/tmp/prev bash dev/figwork/acts/hgo.sh $(awk 'NF==2{print $1"="$2}' dev/figwork/acts/hpending.txt)` (fetch to img/act-FKEY-h.webp + sheet $PREV/hsheet.jpg) -> LOOK -> `bash dev/figwork/acts/rwire.sh OLDKEY..` (timeout >= 10 min: upload, rswap.py repoint K -> K-h / B-h -> B-r-h with corpus check, LIVE-OK, logs rdone.txt) -> commit/push.
- Batch 1 (keys 1-60) LIVE-OK 15/11 19:25Z: keys 9-60 corpus 123 lines changed old->new, 0 bad; 1 redraw (bi-bat-gap-luc-ruong: first draw had hands on a bare chest). Earlier (12 lines, 0 bad): an-mac-gian-di ban-dung ban-dung-hh ban-dung-ta ban-ga ban-thien-ha ban-tho-van ba-do-bi-bat (rdone.txt). Next: write scenes for keys 61+ (rdone.txt = what is live; resume = first key of redraw_order.txt not in rdone.txt) (Vietnamese meaning: meanings.py scene column / tmp/audit_meta.json).
