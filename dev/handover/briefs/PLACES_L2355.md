# PLACES1 — redraw ALL game places + Từ Ninh (owner L2355) — worker of Foreman C ROOT-C2
PRIORITY #1 CHECK: OD 0 (prio1.sh 'nơi chốn place scene Dưỡng Tâm') | main none | review/* none | claims none; inventory = dev/handover/reports/PR13-rooms.md §E/§F + ROOT-C2 STATUS line ~05:20Z (L2351). Live old pictures: CDN img/<place>-<season>-<buổi>.webp, review copies img/_review/place-mass/<place>-ha-sang.webp.

## Owner words (verbatim)
- L800 (19/11): the ~35 live PLACE pictures are ALL dropped ("tất cả bỏ hết") and redrawn in the new style; swap each when approved.
- L2293: "Không, vẫn cứ giữ phong cách cũ của mình đang làm bây giờ trong game á, đừng có đổi gì hết, tôi đâu có ý kiến cò gì." → OLD in-game style.
- L2296: "Không không có gửi xôi cái prompt để bên ChatGPT, bạn tự làm bên mặt đi, thiệt đi, khổ ghê á." → WE draw on Magnific.
- L2300: "Làm luôn một loạt các cái phòng còn lại luôn đi … cứ làm hết … rồi gửi cho tôi" → no approval stops.
- L2306: "Cứ vẽ được 5 hình nào cứ gửi tôi liên tục…" → send every 5 at once.
- L2303: furniture follows the room / against the walls, never mid-floor.
- L2315: every picture shown with in-game people at true size/position (Fold PORTRAIT 755x1000 live crop + iPad 1180x820).
- L2319: best floor = M2300-05 / M2300-03 (floor band 12.5–18.5 %).
- L2323/L14: frontal pictures only.
- L2324/L2325: HEAVY faults are redone automatically without asking; mild glitches accepted.
- L2333: composites always start from the CLEAN background.
- L2355 (22/11): "Ok, rồi tiếp tục vẽ tiếp thôi, hình nào còn thiếu thì vẽ tiếp thôi. Vẽ lại toàn bộ các nơi chốn của game mà. Cho nên thiếu thì cứ vẽ thôi. …"
- Rule L28: draw normally + 'rất nhẹ' grade after (room_vivid.py — note: it had a SyntaxError line 9 per ROOMPF1; fix if you use it, else skip grade and say so).

## Job (17 pictures, ONE base hạ-sáng each, one try; ~135 cr each ≈ 2 300 cr)
B1 Dưỡng Tâm điện (duong-tam-dien), Ngự thư phòng (ngu-thu-phong), Thái y viện (thai-y-vien), Lãnh cung (lanh-cung, plain/poor), Nội vụ phủ (nvp)
B2 Kính sự phòng (kinh-su-phong), Tẩm cung đêm (tam-cung-dem), Thượng thư phòng (thuong-thu-phong), Phòng cung nữ (phong-cung-nu), Cung nhân (cung-nhan)
B3 Tân giả khố (tan-gia-kho), A ca sở (a-ca-so), Đông cung (dong-cung), Phi tần cung (phi-tan-cung), Ngự hoa viên (ngu-hoa-vien, garden)
B4 Từ Ninh cung (Thái hậu): bedroom (tu-ninh-cung-ngu) + reception (tu-ninh-cung) — Thái hậu = above HH luxury, deeper royal yellow (B22), dignified elder taste.
First LOOK at the live old picture of each place (what it is for, its key props) so the new one keeps the place's function. Season×buổi variants come LATER (not now).

## Method (reuse, do not invent)
- Start file: read dev/art/START_ART_WORKER.md first. Do not read big files whole (wc -c, grep, sed -n).
- Prompt base = the room recipe used for M2300 (dev/art/place-rank/prompts_roompf1_M2300.py/.json: C9 common block, refs, gpt-2-6 2k 2688x1386, folder ba4aecfe-efce-47e2-b53f-30d292091886). Write prompts_places_L2355.py/.json the same way with a per-place part; codes M2355-01..17 (A56; add to MA_HINH.json). room_gate + keep_check (A38, .keep sidecars) + check_store (A19) before every gen.
- Gen on Magnific yourself (images_generate). If YOUR permission check refuses gens, tell me at once (I generate).
- Wire like roompf1_wire.py → img/_review/place-rank/places/<key>-ha-sang.webp (CDN, cdn_sync). Do NOT overwrite live img/<place>-* (swap after her OK).
- People sheet per 5: reuse dev/art/place-rank/people_pr13/make_sheet_l29.py (left Fold 755 portrait | right iPad), captions in Vietnamese with code. LOOK at every picture full size + sheet before sending.
- Send each finished batch to me: session_01D3E3NbRKVda1eN4trg7rnx (ROOT-C2) by send_message: sheet URLs + codes + Magnific ids + floor % + sha. Report file dev/handover/reports/PLACES1.md (append per batch).
- Credits: stop line 60 000 balance.

ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
NO HOURLY SCHEDULED TASKS (owner 20/11): never create one.
(As a WORKER: you do not open your own successor — write the handover in your report and tell ROOT-C2.)
