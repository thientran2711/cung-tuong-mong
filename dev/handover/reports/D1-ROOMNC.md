# D1-ROOMNC — rooms redrawn with windows WITHOUT curtains (owner order 24/11 ~00:29Z, brief dev/handover/briefs/D1-rooms-nc.md)
PRIORITY #1 CHECK ('curtain rèm'): OD 0 | claims 0 | main 0 | review/* 0 → reused L30 + common_blocks/window_L30.txt + C9 STY fix (PLACES4 §2), rank_rooms.json (C8-RANKROOM).
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
