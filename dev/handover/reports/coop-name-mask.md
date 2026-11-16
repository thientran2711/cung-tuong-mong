# coop-name-mask — co-op friend shown as "Tần ???" on the host (worker, branch review/coop-name-mask)

Base: origin/main e433c65c. Code commit: 661c989b (j61.js, jcoopchat.js, site rebuilt). START_CTX ~4 % of the window (own estimate).

## Cause (two separate things)
1. Chat "Thư từ" (jcoopchat.js): the panel already opted out of the j61 mask (data-k61skip), but jaudit.js kitRankNamePaint (KIT rank+name painter, owner 15/11 "phẩm và tên đi chung") rewrote the bare friend name inside the bubble into kitName(p) = "<rank> ???" because the friend (a rivals entry, coop:true) is an unmet consort. Reproduced with a page script (stack: kitRankNamePaint -> replaceChild).
2. Everywhere else the friend followed j61 like any NPC ("Người lạ" until met, OD:L165) because k61Named(e) = stage>=2 || k61Pub(e).

## Fix
- j61.js k61Pub(e): `if(e.coop)return true` — the co-op friend is a real player whose name the room shows from the lobby on: always named. ONE switch: every name mask reads k61Named / kitKnownName / k61Scrub / k61Table / j78who / kitName, so the whole group follows.
- jcoopchat.js: data-krn-skip added beside data-k61skip on the panel root and the list (chat shows the real player names as typed).
- NOT changed: face. isKnown61 / met61 still decide the face (grey silhouette until she meets the friend's character), so OD:L165 "no face until met" still holds. **Foreman question:** OD:L165 (14/11 04:00Z) also says "no name until met"; this change overrides only the NAME part (as asked: partner always met). If the owner wants the friend fully met (face too), met61 would need `e.coop` too — one-line change, not done without a ruling.

## Whole-group table (co-op partner name, host side; before -> after)
| place | before | after |
|---|---|---|
| Thư từ chat bubbles (jcoopchat) | "Tần ???" (kitRankNamePaint) | real name |
| Thư từ header "Truyền tin cùng X" | masked via j61/painter | real name |
| log / news lines, Nhật ký (log wrapper k61Scrub) | "Phi ???" | "Phi <name>" |
| person card / pcard / pframe (k61Named) | "Người lạ"/??? | name shown |
| stage tag + pager (j61 renderStage/pager) | "???"/"Người lạ" | name (face silhouette until met) |
| rank list / Hậu cung (kitName, kitKnownName) | "<tước> ???" | "<tước> <name>" |
| notices, wait/rejoin panels (jcooptimer line 245 k61Named) | name hidden | name shown |
| invite/rejoin (jcooplobby peerWord) | uses lobby name (not masked) | unchanged |
Real unmet NPCs: unchanged. Page check (repro): friend named true, another unmet consort still "Phi ???", news line "Tin: Quý phi <friend> gặp Phi ???".

## Tests
- name-mask-scan.js (12 months): PASS 0 hits. name-mask-dom-scan.js (30 steps, 755x1000): 0 hits, no page errors. name-mask-oldsave.js: PASS (met person shows name, strangers masked, 0 page errors).
- coop-chat.js on local wrangler dev of coop/worker (coop/worker/.wrangler NOT committed): 46/47. The one miss = the known early "both players are in the shared world" wait (same as coop-chat-r1 reviewer + d-golive). Local harness only: the chat-icon click is blocked by main's card-flip scene (.kcf), so I ran an uncommitted copy that clicks via script; harness itself unchanged in the branch.
- coop-e2e.js: against the local worker 7 ok then the room code never appears (local harness issue, not game); against the production Worker 57/59: the two misses = "A frozen when B left" + "A cannot advance while frozen" = the known live-Worker flake listed in d-golive (59/60, 57/59 earlier). Old save loads in it (single-player + old save step passed).
- Shots looked at: host 755x1000@2 05-two-lines-A (frame Thư từ, own line + friend line "Phùng Kiều Nguyệt", real name) and guest 1180x820@2 04-open-friend-B (header "Truyền tin cùng Đoan Mộc Vân Thường", real name). The guest stage shows no "???" besides the unmet Hoàng hậu silhouette (unchanged). Shots deleted (disk); not committed.
- Tier: SMALL (2 source lines + 1 attribute).
