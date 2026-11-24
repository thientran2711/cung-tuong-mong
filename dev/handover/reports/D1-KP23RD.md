# D1-KP23RD — redraw the 52 unticked KP23 event pictures (worker of Foreman C ROOT-D1)
depth 2 · START_CTX ~3 % (estimate; get_session read 0) · session_01D3E3NXcWpjZec1ydJ3btYV
PRIORITY #1 CHECK: brief's check (OD 0 | ledger 0 | claims 0 | main 0 | review/* 0) + review/kp23-redraw already held D1-KP23SWEEP (sweep.json, 55 FAR/BLUR/BACK of the 142 kept) → rebased on it, untouched.

## Status: PILOT DONE — WAITING for ROOT-D1 go before the other 48
- Branch review/kp23-redraw @ ec3f4a5: dev/art/kp23-redraw/ (build_prompts.py → prompts.json + txt/<key>.txt, 52 prompts; make_webp.py; gen_page.py + page.tpl.html; done.json).
- Page: https://ctm-img.victoria-tntt.workers.dev/img/_review/kp23-redraw.html?v=1 (old live act-<key>-h | new, whole pictures, tap = original 1536x2024; tick Giữ / Vẽ lại; button copies `KP23RD PICK: giu=… ve-lai=…`). LOOK Playwright Fold 755x1000 + iPad 1180x820: 8/8 images, no h-scroll, 0 errors.
- Files: img/_review/kp23-redraw/<key>.webp (768x1012 = game ratio 384:506) + <key>-orig.webp.

## Style lock (one block for all 52)
Every prompt = MASTER_COMMON (B25) sentences verbatim + forehead S34 + NOEAR + one STYLE block (owner PHI-COLD wording: delicate hand-painted 2D guofeng anime, soft painterly watercolour, clean refined linework) + one CAMERA block (main character close, medium shot waist/thigh up, face visible + expressive, nobody important from behind, no tiny/silhouette figures; emperor on throne faces the viewer) + fixed CAST lines (consort, Emperor royal yellow, Empress gold/red phoenix, Thái hậu deep antique gold, maid, eunuch, guard, physician) + scene. Style reference image on every gen = owner's PHI-COLD-SPRING-OLDBASE-AIFABRIC-01 (VXJxowRMMU), drawing + skin only.
Gate: check_store.py --scope any → all 52 PASS except M03 (full-body + plain parchment background), M09 (legs/feet), M12 (exactly one held item): these three contradict the owner's order 23/11 ~19:10Z (close medium-shot scenes with props) → left out on purpose. FOREMAN: confirm this exception (or tell me otherwise) with the go. keep_check: n/a (new prompts, not edits of a stored prompt).

## Pilot (4 × 135 = 540 cr, Magnific gpt-2-6 2k 3:4, folder KP23-redraw-L2424 under ba4aecfe)
| key | gen | LOOK |
|---|---|---|
| to-giac-truoc-ht | SyvhTYVUb8 | close, both faces, Emperor on throne faces viewer. FAULT: small earring on her ear; Western wax-seal envelope. |
| hh-ban-cho | IfR3gLYtvE | close, both faces. FAULT: small dot on the Empress's forehead. |
| bi-bat-tra-khao | JNECpMgOq4 | OK (maid close, eunuch with lantern, both faces). |
| theo-len-nui | rgBXGGwxtc | OK (autumn steps, Emperor offers hand, both faces). |
structure: new compositions (old ones were faceless close-ups of hands/objects); scene elements of each label kept.
Observation: the consort copies the reference's blue PHI-COLD costume in all 3 consort pictures (same outfit = consistent heroine, but it is her experimental not-approved costume). If unwanted: drop the reference and keep text only, or add "her own robe colours, not the reference costume".
Not redone (pilot = look + report). Proposed fixes for the batch run: add "a plain folded paper letter, no wax seal" where letters appear; NOEAR/forehead already in the prompt — re-gen once only the 2 faulty ones after go.

## Scope add (ROOT-D1 00:29Z, owner 24/11 ~00:20Z): +55 sweep keys (FAR/BLUR/BACK, sweep.json) → prompts.json now 107 (52 unticked + 55 sweep, no overlap; field group/old per key). Gate: all 107 PASS except M03/M09/M12. tui-ngai: G59 bans sachet words → scene = five-colour festival cord on the child's wrist + mugwort sprig (owner rule wins over the label). Page: no-cache meta, images ?v=<n>, old picture per row from prompts.json "old" (sweep rows = the picture the sweep judged). Gate scripts run from the handover tree (kp23-swap base lacks check_store.py/master_common.py).
## Next (after go): 48 in batches of ~10, LOOK each, redo a bad one once, add to page, message ROOT-D1 per batch. Not wired into the game.

## Progress 24/11 ~01:05Z — 45/107 done, page https://ctm-img.victoria-tntt.workers.dev/img/_review/kp23-redraw.html?v=4 (branch review/kp23-redraw @ cfb3d0c)
- GO from ROOT-D1 (00:40Z): exemption M03/M09/M12 OK (figure-sheet rules, not scenes: full-body + plain background, legs/feet, exactly one held item — contradict the owner's close-scene order); ref VXJxowRMMU = STYLE only, heroine costume by TEXT (rose-pink + ivory); to-giac-truoc-ht regen done (folded paper, no seal, no earrings); hh-ban-cho kept (forehead dot = hoa điền).
- Prompt changes since pilot (all in build_prompts.py, gate 0 new fails): consort costume rose-pink text + "never the blue costume of the reference"; STYLE: "take ONLY the drawing style, never its costume"; lips closed even when smiling/talking/crying; "Every ear of every person is bare and plain" (gate allows no other earring wording); no chrysanthemum (mourning = white lilies/peonies); letters = folded Chinese paper, no wax seal.
- Redos used: to-giac-truoc-ht (pilot), sai-di-do-la, tau-tuyen-nhieu, thai-hau-bang-ha (once each). tau-tuyen-nhieu still smiles open with a thin teeth line → flagged on the page, not redone again.
- Gens: 52 × 135 ≈ 7.0k cr (4 pilot + 1 regen + 44 + 3 redos). Ids per key in dev/art/kp23-redraw/done.json.
## HANDOVER (context roll, START 3 % → ~28 %)
How to continue (successor = new worker opened by ROOT-D2):
1. git fetch origin review/kp23-redraw && git checkout review/kp23-redraw. Gate scripts are NOT on this base: run them from a handover-branch worktree: PYTHONPATH=<ho>/dev/art python3 build_prompts.py; cd <ho> && python3 dev/art/check_store.py <txt> --scope any (only M03/M09/M12 may fail).
2. Gens: in-session Sonnet sub-agents (Agent tool, model sonnet), 5 keys each, 2 in parallel per batch of 10, prompt = "Read dev/art/kp23-redraw/GEN_WORKER.md and follow it exactly for these keys: …". GEN_WORKER.md has the exact settings (gpt-2-6 2k 3:4, folder d06c0d09-6b77-49b7-9b61-6c5057ca21ed, ref VXJxowRMMU). NOTE the scratchpad path in GEN_WORKER.md step 4 is this session's; the successor must change it to its own scratchpad.
3. LOOK: make 2-per-row sheets of img/_review/kp23-redraw/<key>.webp (768x1012) and crop faces from <key>-orig.webp (ears, mouth, forehead, chrysanthemum). Redo a bad one once.
4. Record: python3 add_done.py <batch> key=genid[:note] …; then ./publish.sh "<msg>" (page + CDN + commit/push; prints link ?v=n). Message ROOT-D2 (session_01D3E3NXZ5xb4cXfp8zUWaMA) after each batch: keys, redos, credits, link.
Remaining 62 keys: vao-cung-phong vien-co-thoai-thac viet-thu-hoi-han vu-oan-bi-lo xin-an-ve-tham xin-ht-tra-xet xin-th-do-loi an-cu-duoc-lat ban-hon-con bi-bat-buon-lau bi-day-xuong-ho bi-giang bi-quan-su-bat-gap bo-bac-chuoc bo-mac cach-chuc-bien-ai cai-ba-do cat-giu-con-tin chai-chuot-nhan-sac chep-kinh chi-huy-dap-lua chung-cu-bi-huy gai-ngua-yen-tiec giau-trong-ruong gui-bac-chua-benh hau-benh-ca-thang hop-muu-lo ke-la-vao-phong ke-toi khong-chiu-dua-bac kiem-tra-ruong lam-ngo lao-vao-cuu loi-don-khong-ai-tin mach mach-hh nho-tra-an o-yen-nghi pha-hoc-lo quy-xin-tha-cho-nang tha-den-cau-con tha-den-cau-sieu thai-hau-quo-trach thai-y-khong-thay-la them-loi-buoc-toi theo-cha-muu theu-khan-ban-lc tich-thu-co-co tich-thu-vo-co tim-chung-cu-cha tim-chung-cu-minh-oan tim-thay-hinh-nhan to-giac-truoc-hh to-loi-voi-chu tra-ke-phong-hoa trai-gioi trinh-len-ht trung-co-quoc tui-ngai vao-lanh-cung vuong-gia-quo-trach khap-cung-don
