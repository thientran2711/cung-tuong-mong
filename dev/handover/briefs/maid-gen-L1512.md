# GEN1 brief — Magnific gens: 4 maid ranks (owner L1512, 20/11)
Read dev/art/START_ART_WORKER.md first. Do not read big files whole.
Owner verbatim (L1512): "Tam đẳng ok, run magnific tam, nhị nhất, chưởng sự"
JOB: 4 Magnific gens, ONE try each, prompt text used EXACTLY as in the file (drop only the first bracketed "[ChatGPT: …]" header line + blank line, which is for ChatGPT only):
1. tam đẳng  = dev/art/maid7/gpt/tamdang_gpt.txt
2. nhị đẳng  = dev/art/maid7/test5_nhi.txt (owner duyệt L1352 text, unchanged)
3. nhất đẳng = dev/art/maid7/gpt/nhat_gpt_v3.txt
4. chưởng sự = dev/art/maid7/gpt/chuongsu_gpt_v3.txt
Engine = the round-1 maid set: Magnific GPT 2.6 (gpt-2-6), seed 7172, ONE reference = m18 face creation s7IPw0Ll8e, tall portrait ~1024x2304 (same as earlier maid tests; see dev/handover/reports/MAIDP2.md lines ~21–31).
Before gens: magnific_start; simulate_cost for the 4 and write the total in your report. Gate A19: python3 dev/art/check_store.py <prompt> — known pre-existing fails S01/S32 (scope mismatch for servant files) are OK; any OTHER fail → stop and tell Foreman C before generating.
After: creations_wait, LOOK at each picture (creations_read) — note faults only, NO redraw (A20). Download each to dev/art/maid7/gen_L1512/<rank>.webp, make ONE side-by-side sheet dev/art/maid7/gen_L1512/sheet_L1512.webp (4 in a row, small Vietnamese label each: Tam đẳng, Nhị đẳng, Nhất đẳng, Chưởng sự). Report dev/handover/reports/GEN1.md (creation ids, webUrl, cost, faults). Push (pull --rebase first) to claude/cung-tuong-mong-handover-hj0h8w. Tell Foreman C #11 (session_01D3E3NbE9HePpcjX4M7PhSe) by send_message with paths.
No scheduled tasks. Never words '3D'/'semi-realistic' in any new text.

ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
