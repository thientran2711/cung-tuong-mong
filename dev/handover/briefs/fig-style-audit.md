# fig-style-audit (Foreman C ROOT-10, 17/11 ~20:45Z) — sonnet art worker
PRIORITY #1 CHECK ('style audit'/'style-audit'): OD 0 | ledger 0 | claims 1 (event-art-style = event pictures, not figures) | main 0 | review/* 0

Read first: CLAUDE.md, dev/rules/START_CORE.md + START_WORKER.md + START_ART.md, dev/rules/topic/art-costumes.md (handover branch claude/cung-tuong-mong-handover-hj0h8w; sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock).

OWNER (verbatim, 17/11 ~21:12Z): "Đúng rồi, cái hình mẫu này tức là một cái hình mẫu này thôi là ok. Cái hình mẫu này cái vải cũng đẹp. Đó, lấy cái hình mẫu này làm cái vải cũng được. Đó, mọi thứ đều rất là đẹp mà tự nhiên lại đi mỗi thợ lấy một cái hình mẫu khác nhau là làm sao?"
OWNER (verbatim, ~21:15Z): "Bây giờ cần phải coi lại bất kỳ một cái hình nào mà vẽ, nói chung là coi lại đi, lấy cái hình mẫu này nếu mà không đúng thì phải vẽ lại hết."
OWNER (~21:00Z): "...trang phục ở cái bộ cung nữ bạn vẽ rất là thước tha mềm mại, nhưng mà cái trang phục ở cái bậc mà ở C01 á, bạn vẽ là cái nét này là cái nét manga anime đó, tức là cái nét mà vẽ trên cái tranh, cái tờ giấy."

OWNER (verbatim, 17/11 ~21:20Z): "Không, bạn người nhắm mắt nha, những người nào nhắm mắt rồi không là phải bạn lại hết." → every figure with CLOSED EYES = REDRAW (separate column in the table: key list of closed-eye figures, every family, every age; example seen: fig-consort-c14-t4-a18).

THE ONE REFERENCE: https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-maid-m09-a18.webp (rendering, skin, fabric: matte textured soft silk, natural shading, light line, realistic painterly).

TASK (audit only, NO generation, NO uploads to live paths):
1. From the CDN index (img/_index.json) list every FIGURE family: fig-consort-* (t1..t8, ty1..ty8, tm, kc, tcold, poor...) × age a18/a26/a36/a51, fig-maid-* (base, t, ty, tm, kc...), mama, eunuch, men, player, foreign... Count keys per family (fig + hd twin).
2. Per family × age, LOOK at >= 3 hd images (different persons/tiers) next to the reference at the same height on grey. Classify: MATCH (same rendering/fabric/skin) / DRIFT (flat, manga/anime line, glossy, heavy outline, sheer-layer night look, odd skin) — one-line reason. LOOK at every image you judge; no guessing from metadata.
3. Write dev/handover/reports/fig-style-audit.md: table family | age | keys | verdict | reason | example key; total keys to redraw; cost at ~85 cr/gen (gpt-2-6 + 3 cr cutout).
4. For each DRIFT family put 1 single example (hd file as is) + the ref into img/_review/fig-style-audit/ via the repo's cdn_sync (review path only) and list URLs in the report.
5. Message Foreman C ROOT-10 session_011xDdVReyG8hSRH5URJJdVX "AUDIT DONE <sha>" with the short table. Push the report on the handover branch (commit, then cherry-pick onto fresh FETCH_HEAD; never rebase the shallow branch).

Note: painted hoa điền marks on foreheads are being removed by another worker — NOT a style fault, ignore them.

ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
