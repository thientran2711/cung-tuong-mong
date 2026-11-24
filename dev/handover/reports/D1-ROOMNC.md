# D1-ROOMNC — rooms redrawn with windows WITHOUT curtains (owner order 24/11 ~00:29Z, brief dev/handover/briefs/D1-rooms-nc.md)
PRIORITY #1 CHECK ('curtain rèm'): OD 0 | claims 0 | main 0 | review/* 0 → reused L30 + common_blocks/window_L30.txt + C9 STY fix (PLACES4 §2), rank_rooms.json (C8-RANKROOM).
depth 2 (limit 8). START_CTX ~0 % (get_session reads 0; estimate ~3 %). Status: ROLLED OVER at ~27 % context (START ~3 % + 25 %). Trial OK, ROOT-D1 GO 24/11 ~00:41Z; batch 1 LOOKED + on page; batch 2 GENERATED + uploaded, NOT LOOKED. See HANDOVER below.
depth 2 (limit 8). START_CTX ~0 % (get_session reads 0; estimate ~3 %). Status: TRIAL OF 3 DONE — WAITING for the owner's go.

## Method (her words: "run lại cái prompt cũ, rồi ghi là sửa là cái cửa sổ không rèm")
Builder dev/art/place-rank/prompts_roomnc_D1.py (branch review/rooms-nc @b0b0f0c). Original prompt of each picture = the builder JSON that made
img/_review/place-rank/pr13/<base>-ha-sang.webp (phối: prompts_pr13.json, ledger L2325 s7Ip71Yl8e; Phi: prompts_roompf1_M2294.json M2294-13/14,
ROOMPF1 wire checked prompt==json). Every one of the 65 bases mapped to its source JSON (table in the builder SRC; tan/room30 rooms have 2 sources → PICK per batch after a ledger check).
A17 diff = ONLY: (a) window-curtain words cut ("the sheer window curtains tied back," / ", the window curtains" in the colour sentence);
generic "silks, curtains and cushions" → bedroom "silks, bed curtains and cushions" / reception "silks and cushions"; (b) STY "furniture, curtains and objects" →
"furniture, carved lattice windows and objects"; (c) + window_L30.txt block + "Windows have NO curtains, NO drapes, NO hanging fabric at any window."
Bed curtains and the doorway curtain stay (L30). Same refs as the original (style refs + wall-model guide + tone strip; never the old picture), gpt-2-6 2k 2688x1386, folder ba4aecfe…, text-to-image, no edit, no pixel fix.
Gates: room_gate PASS ×3, keep_check --sidecar PASS ×3 (roomnc/<base>.txt.keep, base = roomnc/base/<base>.txt verbatim original). check_store: no room scope (as ROOMPF1) → room_gate is the room store gate.

## Trial (3 gens × 135 = 405 cr)
| id | room | gen | look (full size) | structure |
|---|---|---|---|---|
| ph32 | Khải Tường Phi tiếp khách | 0ewUbsgTfW | window curtains GONE, rich | same: 2 walls, windows right wall, daybed left, vase doorway right, chair pair at window |
| ph33 | Khải Tường Phi phòng ngủ | aFzGOp3fSh | window curtains GONE (bed curtains kept), rich | same: 3 walls, windows left wall, bed right half, vase doorway left, dressing table left |
| ph30 | Khải Tường Đông phối tiếp khách | gOhmTGiSXO | right-wall windows clean; ONE sheer white curtain still hangs on the LEFT wall behind the cabinet under a small high lattice window (the old picture has it too) → partial | same: 3 walls, chairs+scroll left, hex partition vase doorway centre, guqin table right |
Page: https://ctm-img.victoria-tntt.workers.dev/img/_review/rooms-nc.html?v=1 (OLD | NEW, whole pictures, tap = full original). Files img/_review/rooms-nc/<base>.webp (q88, not in git).
Not wired into the game (C8-RANKROOM wires after the owner's pick).

## Next (after the go)
Rest of the 57 drape rooms + LOOK ph19 26 59 + LOOK 20 places, batches of ~10, LOOK each, message ROOT-D1 after each batch. Open question for the owner: ph30-type left-wall leftover — accept, or add a room-specific sentence ("the left side wall has no curtain")? (A18: only if she says so.)

## Batch 1 (ROOT-D1 GO ~00:41Z: "add a room-specific line … redo ph30 once … batches of ~10 … LOOK each … one redo max per room, then list it")
10 gens 1 350 cr, prompt==file verified (creations_get). Ids: ph30 redo gOhmdifSXO, canh-phuc-cung-dong-phoi yiQumn7PW9, canh-phuc-cung-tay-phoi bxDMnJP5Y2, canh-phuc-cung-tay-phoi-ngu YMglkmhWeC, chung-tu-cung-dong-phoi ovi6J6t829, chung-tu-cung-phi CqYn3YSEEy, chung-tu-cung-phi-ngu SyvhXahUb8, chung-tu-cung-quyphi p8PySXPehw, chung-tu-cung-quyphi-ngu lJmtd74gv9, chung-tu-cung-tay-phoi 5jpDWjNKxe.
LOOK: window fabric gone in all 10; structure same except ph07 doorway fully in right half (= its original prompt), ph30 scroll → horizontal painting. Page ?v=2 (12 rooms).
LOOKs: ph19 joins (sheer curtain right window); ph26 clean; ph59 bed-alcove curtains only → not redrawn; places: only nvp joins; tu-ninh-cung-r5 amber = shrine hanging (L2391) kept.

## Batch 2 — GENERATED, uploaded to img/_review/rooms-nc/<key>.webp, NOT LOOKED, NOT on the page
1 350 cr, prompt==file verified. chung-tu-cung-tay-phoi-ngu lJmtdeWgv9, dien-huy-cung-dong-phoi 6A5bEuCiJO, dien-huy-cung-dong-phoi-ngu Bh6NJySoQR, dien-huy-cung-phi SyvhBIBUb8, dien-huy-cung-phi-ngu 8a3iy6fIrU, dien-huy-cung-quyphi N2bqEM26D9, dien-huy-cung-tay-phoi rgBXM6Dxtc, dien-huy-cung-tay-phoi-ngu jU8opRtLD0, ham-an-cung-dong-phoi CqYnZUvEEy, ham-an-cung-dong-phoi-ngu ksdeT3016B.
Credits so far: 3 105 (23 gens).

## HANDOVER (for the successor the COORDINATOR opens; worker does not open it)
depth 2 now; successor = child of ROOT-D1. Branch review/rooms-nc @2ed90a7 (git fetch origin review/rooms-nc). Everything is in dev/art/place-rank/roomnc/:
- prompts_roomnc_D1.py (builder: SRC/PICK sources, RX cuts, EXTRA room-specific lines, `python3 dev/art/place-rank/prompts_roomnc_D1.py <keys>` rebuilds + room_gate), <key>.txt prompts + .keep sidecars (keep_check PASS ×61), base/ = verbatim originals, prompts_roomnc.json (prompt + refs).
- batches.json = the 6 batches (57 gens: B1 done, B2 generated); state.json = page rows (id,key,label,gen,look,structure,v); page.py state.json <v> writes img/_review/rooms-nc.html; upload: cdn_sync.py img/_review/rooms-nc, then PUT the html with ctype text/html (cdn_sync gives octet-stream; see snippet in this session: c.req('PUT', c.API+'/objects/'+c.keyurl(k), data=…, ctype='text/html; charset=utf-8')).
- sheet.py / pairs.py: contact sheets (old pictures: curl https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/pr13/<key>-ha-sang.webp into old/; new: the CDN rooms-nc/<key>.webp or nc/new_<key>.png).
NEXT: (1) LOOK batch 2 old|new (pairs.py) → add rows to state.json → page ?v=3 → message ROOT-D1. (2) Batches 3–6: before each, LOOK the old pictures (sheet.py) for curtains in odd spots → add EXTRA lines (batch 3 lines already in: ham-an-cung-tay-phoi, ham-an-cung-phi-ngu, khai-tuong-cung-tan) → rebuild + keep_check → gen (sonnet helper agent with the same brief: verbatim .txt, json refs, gpt-2-6 2k 2688x1386, folder ba4aecfe-efce-47e2-b53f-30d292091886, creations_get dump to verify) → LOOK → page → message. One redo max per room, then list it. Do NOT wire into the game.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.

## D1-ROOMNC-2 (successor, depth 2, START_CTX ~3 %) — ALL BATCHES DONE, page ?v=5
Foreman: ROOT-D2 session_01D3E3NXZ5xb4cXfp8zUWaMA (batch 2, 3+4 LOOKED → PASS). Branch review/rooms-nc @fca0bad.
Page https://ctm-img.victoria-tntt.workers.dev/img/_review/rooms-nc.html?v=5 — 59 rooms (58 frontal rank rooms + nvp), OLD | NEW whole pictures, sorted by id.
Gen params (verified): gpt-2-6, width 2688 height 1386, resolution 2k, refs from prompts_roomnc.json, folder ba4aecfe…, 135 cr. (aspectRatio 2:1 gives 2048×1024; width 1536/768 gives 1536×768 at 80 cr — both WRONG, 430 cr lost.)
LOOK method: old|new pairs + side-wall crops (left/right 520 px) of every picture; leftover = fabric on rings on a side wall behind a shelf/cabinet → room-specific line ("No fabric hangs anywhere on the <side> side wall…") → ONE redo.
Redos (each once, all now clean): ph13, ph21, ph28, ph35, ph43, ph61. Pre-emptive lines from old pictures: ph39 48 51 53 54 55 57 63 65 (+ batch-3 lines).
Drifts (owner judges; ROOT-D2: no redo): ph07 doorway right half; ph15 doorway inward; ph16 right chair pair gone; ph17 guqin gone; ph23 chairs bigger/forward + footstool; ph29 right arch → robe rack; ph30 scroll → horizontal painting; ph35 lattice window behind bed; ph36 doorway reads like a shelf niche; ph44 arched curtained doorway → round moon gate; ph48 + ph64 doorway curtain gone; ph52 doorway moved centre-right with blind, curio wall gone; ph56 doorway bamboo blind; ph60 doorway moved right, shelf between; ph61 screen added.
NOT redrawn: ph02 06 18 27 37 (curtain-free), ph26 (clean), ph59 (bed-alcove curtains only), the 29 'gỡ rèm' EDIT rooms (brief: only if owner says), other 19 places (only nvp had window curtains; tu-ninh-cung-r5 amber = shrine hanging, kept).
Credits: predecessor 3 105; this session 6 235 (430 wasted on size + 2×135 ph13/21 + 41×135); TOTAL 9 340.
Not wired into the game. Images img/_review/rooms-nc/<key>.webp on the CDN (not in git); state.json + ids.json + page.py in dev/art/place-rank/roomnc/.
