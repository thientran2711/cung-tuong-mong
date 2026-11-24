# D1-KP23RD — redraw the 52 unticked KP23 event pictures (worker of Foreman C ROOT-D1)
depth 2 · START_CTX ~3 % (estimate; get_session read 0) · session_01D3E3NXcWpjZec1ydJ3btYV
PRIORITY #1 CHECK: brief's check (OD 0 | ledger 0 | claims 0 | main 0 | review/* 0) + review/kp23-redraw already held D1-KP23SWEEP (sweep.json, 55 FAR/BLUR/BACK of the 142 kept) → rebased on it, untouched.

## Status: PILOT DONE — WAITING for ROOT-D1 go before the other 48
- Branch review/kp23-redraw @ ec3f4a5: dev/art/kp23-redraw/ (build_prompts.py → prompts.json + txt/<key>.txt, 52 prompts; make_webp.py; gen_page.py + page.tpl.html; done.json).
- Page: https://ctm-img.victoria-tntt.workers.dev/img/_review/kp23-redraw.html (old live act-<key>-h | new, whole pictures, tap = original 1536x2024; tick Giữ / Vẽ lại; button copies `KP23RD PICK: giu=… ve-lai=…`). LOOK Playwright Fold 755x1000 + iPad 1180x820: 8/8 images, no h-scroll, 0 errors.
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

## Next (after go): 48 in batches of ~10, LOOK each, redo a bad one once, add to page, message ROOT-D1 per batch. Not wired into the game.
