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
