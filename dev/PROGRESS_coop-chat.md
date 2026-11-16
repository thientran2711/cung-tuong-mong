# PROGRESS · coop-chat (branch review/coop-chat, from origin/main 4f5e5f3b3)

Owner 16/11: in co-op her room shows a chat icon on the LEFT of the room scene; tap = chat frame "Thư từ"; unread badge + shake/glow + soft sound.

## Done
- Worker `coop/worker/src/index.js` (v coop-2, DEPLOYED 16/11): `chat` message, last 50 per room in DO storage key `chat`, 300 chars, control/bidi chars stripped,
  frame <= 2.4 KB (`toolarge`), 350 ms per seat (`slow`), broadcast to both seats incl. sender, `room.chat` = history. PROTOCOL §10.
  Security test `node coop/worker/test/chat.test.mjs` (live): room-scoped, no cross-room read, third player refused, 50 cap, cut at 300, size/rate limits: ALL OK.
- Client `dev/build/jcoopchat.js` (assemble after jcooptimer): KIT §80 kitChatBtn / kitChatPanel / kitChatList / kitChatBubble, sample on the kit page.
  Art `img/kit/ico-chat.webp` (gpt-2-6, 128 px, 8 KB, on the CDN; looked at). Sound = kitSfx("notice"). Fx = §68 glowburst + glow-gold; Gọn / reduced motion = still glow.
- KIT.md §80, KIT_NUMBERS (76 final), KIT_REQUESTS row, PROTOCOL §10.
- Test `dev/test/coop-chat.js` (two clients, live Worker).

## Notes
- Icon only on the room stage (S.place home); away from the room a new line gives a kitLine "Có thư từ hảo hữu" + sound.
- Built site (index.html / sw.js / assets.json) NOT rebuilt here: coordinator rebuilds once at the end (assets.json needs img/kit/ico-chat.webp, already on the CDN).

## Tests (16/11, live Worker)
- `node coop/worker/test/chat.test.mjs` ALL OK; `ws.test.mjs` (regression) ALL OK.
- `node dev/test/coop-chat.js`: 47/47 at A755x1000+B1180x820, A1180x820+B844x390, A844x390+B755x1000 (A motion on, B reduced motion). Screens looked at.
  A page crash ("Target crashed") happens sometimes under machine load (load avg ~70) before any chat step; a rerun passes.
- j61 (stranger-name scrubber) now skips `[data-k61skip]` so chat shows real names; chat panel/list carry it.
- Rail: kitStageRail (KIT §77) not on main yet; jcoopchat mounts via kitStageRail.add when present, else own left button.
