# coop-thin-guest AUDIT — where the guest phone still computes, and how to move co-op to a host-authoritative THIN GUEST

Analyst session_01UV1Szm3WZRYzKoRi6wvQZD (opus, read-only, no code change), coordinator MAIN s27. Date 11/17/2026. START_CTX ≈ 3 % of 1M.
Code read: live main **744b80e7** (dev/build/j*.js incl. jcoop*.js, coop/worker/src/*.js). Rules read: CLAUDE.md, START_CORE, START_WORKER,
last OD entry (17/11 01:15Z: option 2, part by part, end state = guest only displays host state), topic/coop.md, reports coop-stable,
review-coop-stable-r1, coop-main-faults, coop-one-world, coop-contest-check, coop-contest-fix, coop-guest-maid, coop-b1b5, names-unique-r1.
Not run live (code reading + static scans). Line numbers = main 744b80e7.

## 0. How co-op works today (one paragraph)
Each phone runs the WHOLE single-player engine on its own copy (global `S` = "me", `rivals` = NPCs + one friend stand-in built by
`buildFriend` jcoopworld.js:59). The Worker (coop/worker/src/index.js) relays messages and, at week end, 3-way-merges the two copies
(`tick` index.js:275 → `merge3` merge.js:16-46: numbers ADD deltas, non-numbers host wins, new ids from the guest kept only under `P`).
"Host-authoritative" today is a patchwork of guards that stop the guest from rolling world things: jcoopone.js guard table (MUTE /
ONLY_ME / PERSON), a mute list (jcoopworld.js:635-636), inline `worldOn()` checks (j3.js:92, j8.js:370, j13.js:27/69), ~15 per-module
`isGuest/npcOK/seatGuest/host()` checks, and a safety net that UNDOES the guest's world rolls after her week (`guestNet` jcoopworld.js:188).
Every new module must remember its guard; every hand-shake (bend/buoi, night rd/go, tn, res/ack, ask, fam, seat copy) is a relay that can be
lost on a reconnect. That is the structural cause of the co-op bug stream.

## 1. EVERY place the guest computes or mutates game state itself
Legend — Kind: W = writes a shared-world fact; P = writes her own person (personal by design today, but must move for "guest only displays");
H = hand-shake/relay state. Bug = a filed bug this place already caused.

### 1a. Life / world build / names
| # | Guest computes | Where | Kind | Bugs it caused |
|---|---|---|---|---|
| G1 | First life: `start()` builds a FULL throwaway world (consorts, Emperor, court, men, servants, names) then `attach()` drops it into the room world | j2.js:2 start; jcoopworld.js:146 attach, :497-498 newLife, :697 start hook; j22.js:5 menInit; srvInit (attach :160) | W+P | coop-stable #2: 10 ghost consorts with temp ids 1001-1010 on every guest rebirth, a mistress the host never had (fix on review/coop-stable, not yet on main); "friend starts as Người lạ" race; cung-nữ guest knows host's servant at start (k61 first-run, coop-stable OPEN) |
| G2 | Rebirth: `nlRun` (Luân hồi card) builds the new life locally, `nlAccept` sends `me` | j52.js:37/53; hooks jcoopworld.js:694-695; jkc.js:105 | P (+W via G1) | same ghost-consort bug; rebuilt friend entry missing/old name after reconnect (coop-stable #4) |
| G3 | New persons she causes (her maid rises, Tiến cử, tuyển nhiều, new girl, kin of a tiểu thư) get guest TEMP ids, become requests the host applies next rebuild | jcoopask.js:38 newRival wrapper, :44 collect | W | coop-guest-maid: maid vanished at merge / never rose (fixed by this request channel; still a 1-week delay + stand-in "ghost") |
| G4 | Names of every person she creates (newRival, servants, kids) picked with her own `Math.random` | j1.js:134 newRival (+ jcoopask temp people) | W | names-unique r1 (not on main): host renamed the friend's maid/eunuchs every week, seats disagreed; residual same-week collision |
| G5 | Reign ending after the Emperor's death runs on BOTH seats (heir → Thái hậu / tuẫn táng from her own heir + rank) | jcoopworld.js:657-666 empWeek (`f.apply`) | P | — (B3; correct only while both seats see the same heir) |

### 1b. Buổi / khắc / places
| # | Guest computes | Where | Kind | Bugs |
|---|---|---|---|---|
| G6 | The buổi step itself: after the server's `buoi`, each seat runs `nextBuoi()` locally (19 modules wrap it: j41 j42 j68 j70 j76 j77 jaudit jclose jexam jfe jgift jkc jmen jpromo jroute jspread jstory jweather) | jcoopworld.js:289 onBuoi, :673 wrapper; j9.js:143 | P+W | #next stuck "Chờ hảo hữu…" at a day buổi (coop-stable OPEN 1, 3/50 runs); `badbuoi` split seats (r7); pendBuoi under open dialogs |
| G7 | NPC buổi acts aimed at HER are rolled on the guest (`pickTarget` filtered to her); the NPC's own cost/gain then merges by number | jcoopworld.js:668-669; j9.js:140 rivalsBuoi | W | — (the NPC's state on the host never knows the act happened until the merge adds it) |
| G8 | `placeWhere` runs on the guest, then is overwritten by the host's `where`; until it arrives #next is locked ("Đợi hảo hữu") | jcoopworld.js:682, :228-233 setWhere, needWhere | W (thrown away) | wait locks; lost `where` after reconnect needs syncRoom |
| G9 | Khắc budget `used`, her place, her buổi clock; jcooptimer forces her own `bend` / the host's night when time runs out | j1.js:64 `used`; jcooptimer.js:132-134 | P+H | coop-timer: stuck buổi, "Đợi hảo hữu trở lại" (OD:L1042) |

### 1c. Week end / month
| # | Guest computes | Where | Kind | Bugs |
|---|---|---|---|---|
| G10 | The whole `endTurn()` + `monthTick()` runs on the guest (46 modules wrap endTurn). Guarded only by: jcoopone MUTE/ONLY_ME/PERSON (jcoopone.js:17-44), mute list jcoopworld.js:635-636, inline worldOn (j3.js:92, j8.js:370, j13.js:27, j13.js:69), module guards (jdh/jdh2 npcOK, jlux, jmline, jpet petNpcs, jpromo, jreign, jseat, jstaff, jsteal, jmort, jpetlife, jvisit) | j3.js:89 / :104; jcoopworld.js:670 | W+P | coop-one-world: NPC bạc ×2 (504→752), NPC Sức/Đức/Sủng ×2, clan power ×2, guest decided the Emperor's mood, NPC illness/death twice as often, two Thái hậu moods, two sets of palace men (all "fixed" by guards + net, i.e. the guest still RUNS the code) |
| G11 | Static scan of the 57 non-co-op modules that wrap endTurn/nextBuoi: only 12 have any co-op guard; **35 touch NPC lists AND roll dice with NO co-op guard** (j24 j27 j29 j30 j31 j41 j42 j52 j61 j68 j70 j71 j72 j77 j83 j92 j95b jage jeitem jemo jexam jface jlost jmen jmood jne jroute jthaiy jtruth jts jtsb jty jveil jweather j32). They are covered ONLY by the after-the-fact `guestNet` unroll | scan in this audit (§6); jcoopworld.js:188-197 | W | coop-main-faults b: the guard blocked her OWN act ("Rương không còn món nào"); every new module = a new hole |
| G12 | Her personal month: stipend, illness, kids growth, pregnancy, maid, servants (srvMonth), lots, shop restock | j3.js:104-107; j8.js:370; j13.js:69; jcoopworld.js:817 srvMonth | P | — (personal by design, but must move for thin guest) |
| G13 | Weather `rollWx` = `pick` (Math.random) on both seats; host wins only at the merge, so all week the guest shows her own weather | j12.js:7 (called j3.js:98) | W | — (silent divergence) |
| G14 | Server 3-way merge adds numeric deltas for EVERY key (W too, except NOADD) | merge.js:23 | W | root of every double count above; one-world plan item "host-wins for W numbers" was replaced by the client net, never done on the server |
| G15 | Write-back: what MY acts did to the friend's stand-in is written into P[friend].S by my `toCanon` (STAT, rl/ro/cev, rank, death, cold, ill) | jcoopworld.js:104-125 | P (of the other seat!) | each seat edits the other's person; races with her own week (rpend acks, re-send end :455) |
| G16 | `toCanon`/`fromCanon`/`deser` rebuild the whole local game from C every week (clamps enums: rank, mood, buổi) | jcoopworld.js:128-145 | W+P | coop-stable r7 (week applied twice → week thrown back to sáng); N1 crash (below) shows up here |

### 1d. Nights / heir / seats
| # | Guest computes | Where | Kind | Bugs |
|---|---|---|---|---|
| G17 | Night gate hand-shake (rd/go/q), `nightEnd`, then her own `endTurn` night; tn (who sleeps with the Emperor) relayed with versions + claims; resolveTonight on her seat | jcoopworld.js:534-556, :558-614; jnight.js:17-44; j8.js:501/506 | H+P | B2: 2 women per night (fixed by host flip); coop-stable #3 night deadlock after a reconnect; night-final #4 still RUNNING (steal dialog over flip) |
| G18 | Her Kỳ nguyệt sự flags relayed so the host's flip can read them; cyHold blocks her end | jcoopworld.js:805-816; jcycle.js:77/164 | H | coop-b1b5-fix (her maid card changed nothing on the host) |
| G19 | Heir: host decides, guest builds its own heir card from the merged string | jcoopworld.js:820-840 | P | B2 heir per client (fixed) |
| G20 | Seat caps: guest re-checks her own promotion against SEATCAP after the merge | jcoopworld.js:616-633 | P | B5 caps blind to the friend (fixed) |

### 1e. Contests / festivals
| # | Guest computes | Where | Kind | Bugs |
|---|---|---|---|---|
| G21 | Tranh ghế: `S.contest` per seat; contestOpen/runRound/contestEnd/contestWeek not host-only on main | j34.js:8/35/43/49 | W | coop-contest-check Q1: two boards, both can crown herself Hoàng hậu |
| G22 | Festival invitations and odds with her own `R(1e6)`; scoring the friend as a simulated NPC | j71.js:147, :381, :415; j82 | W | two boards / double prizes (fix = host board on review/coop-contest-fix-r1, RUNNING, not on main) |

### 1f. Items / acts / relations
| # | Guest computes | Where | Kind | Bugs |
|---|---|---|---|---|
| G23 | Item kinds registered at RUN TIME on one client (handmade, recipe books, gift keys) travel into the shared world | j92.js:99, j97.js:17, jrcp.js:176, jtds.js:51 | W | review-coop-stable N1: host crash `IT[e.k].tg` in npcMonthly j8.js:399 → week 3 stuck for both; 25 files read `IT[x]` unguarded |
| G24 | Her acts on NPCs: odds, detection, costs, text resolved with HER `Math.random`; the NPC side reaches the host only as a numeric merge delta (per-pid rows rl/ro/gp/ep/evm on the NPC) | runAct (14 caller files); jcoopworld.js:113-116 | W | Q2 #4 (both seats hit the same NPC: kill vs survive → host wins, no rule) |
| G25 | Acts between the two players: the ACTOR resolves (`mode do`), sends `res` deltas (fx, flags, pet/items/kids ops); the TARGET applies them to her own S (`resApply`, `famApply`, `petApply`); invites via act/actr; maid-set relays (bribe/briber/nbribe/ev) | jcoopworld.js:316-470, :742-800 | P+H | coop-pets item never reached her; coop-main-faults a (name mask hang on the bribe card); laydo blocked; acks/re-send end |
| G26 | NPC acts on her ITEMS/KIDS/pets on the host turned into ops (b4Wrap/b4Send) that her client replays | jcoopworld.js:842-890 | H | r1 fix 2 (her pet copied, not lost) |
| G27 | Her bag/kids/pets/look pushed to the other seat on pos + `ctm-fam` relay with hash/ask (pos capped 4000 chars) | jcoopworld.js:250-286 | H | r1 fix 1 (LIVE Worker dropped whole pos > 4000 chars) |
| G28 | Knowledge of the friend (j61 stage, forgetFriend on rebirth), name masks rewritten in the DOM | jcoopworld.js:72-76; j61 k61Scrub | P (display) | coop-main-faults a (endless mask loop, page hang) — display, stays client-side |

### 1g. Persistence / reconnect
| # | Guest computes | Where | Kind | Bugs |
|---|---|---|---|---|
| G29 | Her own week between merges lives only in her phone: rolling snapshot (localStorage) + server seat copy (`seat`/`seatd` versions), `CW.restore` on rejoin | jcoopworld.js:712-770, :893-900; index.js:177-199 | P | rejoin-xdev (another device restarted her week, stats lost); seatold/seatresync paths |
| G30 | Lost relays re-sent from the room snapshot: re-bend, re-end, night re-ask `q`, wkIn duplicate-week guard, twin-socket rule | jcoopworld.js:473 wkIn, :512-530 syncRoom; jcoop.js 4001/abandonAt | H | coop-stable #3, #6 (twin socket steals the seat), r7 (week applied twice), ghost "online" seat (#1, Worker) |

**Bottom line of §1:** the guest computes its own buổi, its own week, its own month, its own life creation, its own act outcomes (also on
NPCs and on the host's person), and a guarded-but-still-executed copy of the world. ~30 relays/hand-shakes keep the two copies close.
Of the ~35 co-op bug reports read, every one traces to G1-G30 (two copies + a lost relay, or a guard missed / over-applied).

## 2. Target: host-authoritative thin guest
- **One game, on the host.** The host phone holds world W + BOTH persons as full player states (S_a, S_b) + per-seat UI-free state
  (khắc `used`, buổi, place, pending dialog queue Q, hand of cards). All rules and all dice run there, once. One RNG for the room
  (seeded per room+week and logged, so a bug report can be replayed).
- **Seat context on the host.** The engine is written around globals declared in ONE line, j1.js:64
  (`let S,rivals,used,deck,tab,Q,rid,quiet,popIdx,popMsg`). The host runs the guest's turn inside `withSeat("b", fn)` that swaps the
  per-player globals (S, used, deck, Q, popIdx, popMsg + a registered list of module-level per-player caches) and swaps the two persons'
  places in `rivals` (her person becomes `S`, the host's person becomes the stand-in entry). The existing friend stand-in + `resApply`
  code becomes the bridge (an act on "the friend" = run it, then apply to S_b in context b).
- **Guest = renderer + intent sender.** Guest state = last snapshot (built with today's `fromCanon`, so the screen code is unchanged)
  + pure UI (tab, open panel, animations, chat draft). Engine mutators are blocked on the guest; taps become intents
  `{t:"do", op, args, base:ver}` (op = act, go, buy, use, wear, pick (dialog choice), ready (Sẵn sàng), mg (mini-game score), life (Luân hồi choice)).
- **Dialogs.** Cards for her are built on the host in context b and sent serialized `{id,t,h,opts:[{n,x,fx,dis}]}` (no closures);
  she picks, the host runs `opts[i].go()` in context b. Mini-games: she plays locally (input/skill only) and sends the score; the host clamps and applies.
- **State flow.** Host → server → guest: `snap` (full, versioned) after a rejoin, `delta` (ver+1, changed paths) after every intent / step.
  The Durable Object stores the latest full snapshot = the room's save. A delta with a gap → guest asks for full.
- **Reconnect = full snapshot.** No seat copies, no re-bend/re-end/night re-ask, no merge. The host reconnecting simply resends full.
- **Host offline** = guest frozen (today's freeze rule, now complete: she cannot tap either). Option 3 (server runs the game) stays the
  later cure for that; nothing in this plan blocks it (the host's role is a pure function of state + intents).
- **Display-only stays on each phone:** name masks / fog of knowledge (DOM from her own known-list in the snapshot), animations, sounds,
  kit layout. Owner rule OD:L96 holds by construction: one truth, her knowledge differs.

## 3. Migration order (smallest risk first; each part ships alone, behind a room level flag `C.thin = n`)
Rules for every part: (1) a room switches a part on only when BOTH seats run a build that has it (the build-match hold CW.hold/swreg
already exists); old rooms keep working and upgrade on the host's next open. (2) The part DELETES the guest's old computation for good
(no long-term mix, OD 17/11). (3) Only open bugs on the old path get patched meanwhile; no new co-op feature on old relays once D/F exist.
(4) Test both seats: host Fold 686x880@2.2 + guest iPad 1180x820@2 (coop-e2e roles), then swapped roles; old save + solo untouched.

**Progress meter (new, Part A):** a "guest tripwire" test build — on the guest seat every write to S / rivals / world keys outside
`fromCanon` is logged with its function name. Thin guest = 0 writes in a scripted 4-week co-op run. Each part must lower the count in its
own categories and never raise another; the count is the number to report to sếp.

| Part | What moves to the host | Size (worker sessions, opus) | What breaks if done wrong | Test (both seats) |
|---|---|---|---|---|
| **A. Foundations** (no player-visible change) | room `thin` level + capability check; host `withSeat(seat,fn)` context swap with a registered list of per-player module state; room RNG; server stores host `snap` + `delta` with versions (index.js: new t "snap"/"delta"/"do", relayed to the guest only); guest tripwire build | M (1) | nothing visible (flag off); a missed per-player global would show in B as her data leaking into the host's screen | unit: `withSeat` round trip (ser before == after, both seats); Worker npm test for snap/delta/ver gap; tripwire baseline count recorded |
| **B. Life creation + rebirth on host** (pilot of withSeat) | guest's Luân hồi card = choice only (nlRun already takes `d.seed`), sends `do life`; host runs start/nlRun for her in context b IN the room world (no throwaway world, no attach, real ids, names checked against the one world), sends her new person | M (1) | wrong origin/seed → she gets a different life than the card showed; ids/names clash; a reborn cung nữ without a mistress | reborn guest × every origin (tt, cn, thd, muoi, kc at home): same consorts both seats, 0 temp ids, 0 duplicate names, mistress real, k61 "Hảo hữu" until met; first life of guest; host rebirth unchanged |
| **C. World read-only on the guest** | guest's endTurn/nextBuoi no longer write W at all: W comes only from the host (merged week + a `delta` after each buổi step); her acts on NPCs become explicit NPC ops (same capture as `sendRes`/fsnap, extended to inv/staff/kids) applied by the host; merge takes W from the host only. DELETES: jcoopone guard table, guestNet/unroll, mute list, inline worldOn checks, ~15 module guards, jcoopask temp-id channel for persons she causes (host makes them on her op), weather/lots/men/cm double copies | L (2) | an act of hers on an NPC whose effect the op capture misses is lost (silent); NPC acts aimed at her (G7) must move with it or they vanish | coop-one-world probe in CI (every W path host-only); scripted run of EVERY ACT kind on an NPC from the guest → host world shows the same effect as solo (script over the ACT table, before/after table); tripwire W-writes = 0; coop-e2e, coop-p2, coop-b1 |
| **D. Remote dialogs (cards)** | one path for "a card for her built on the host": serialized card in her Q (part of P_b, so it survives reconnects), `do pick`, host runs the choice in context b. Move the existing bespoke cards onto it: invite (Kết giao / Tặng quà), Mua chuộc, nbribe, heir card, res notes, contest result. DELETES the ctm-p2 bribe/briber/nbribe/ev, act/actr invite relays | M (1) | a choice closure that captured the HOST's person instead of hers (built outside context b) → effect lands on the wrong player; a card lost on reconnect = stuck week | each migrated card kind, guest and host as receiver; reconnect while a card is open (card still there, choice applied once); text in her perspective ("ngươi" = her) |
| **E. Buổi + night on host** (after night-final #4 and coop-contest-fix #2 are on main) | host runs the buổi step and the night for both (rivalsBuoi incl. NPC acts on her, buổi events of the 19 nextBuoi modules in context b, flip/resolveTonight/jnight, her cycle flags read directly). "Sẵn sàng" = `do ready`; host steps when both ready or clock ends. DELETES bend/buoi/badbuoi, pendBuoi, needWhere, night gate rd/go/q, tn relay + versions, cyb relay/cyHold, jcooptimer guest clock (host clock only) | L (2) | her buổi events not shown (cards must go through D); the host's phone slows (two persons' step); a seat that never sends ready blocks — the clock rule must stay | coop-e2e buổi/week sync, coop-night (105 checks), coop-timer, coop-cyc, contest board; perf: host Fold buổi step ≤ 1.5 s; tripwire buổi writes = 0 |
| **F. Her own acts as intents** (split by area, each alone) F1 Hành động acts (runAct) · F2 places/goTo/visits · F3 bag/shop/wear/gifts · F4 pets/garden/kitchen/study · F5 mini-games (score intent) · F6 the rest found by the tripwire | each UI entry point calls an engine function; wrap at the ENGINE function (runAct, goTo, buy, useItem, wear, …), not at the 304 click handlers; on the guest it sends `do`, on the host it runs in context b. Acts between the two become ordinary acts in ONE engine (no res / famApply / petApply / b4 ops / ctm-fam). | XL (4-5, one per F-part) | latency: every tap waits a round trip (~150-400 ms); a missed entry point still mutates locally and is overwritten by the next delta (flicker / "lost" tap) — the tripwire finds it | per F-part: every action of that area from the guest = same result as solo (script + before/after table), tap-to-screen time on Fold over 4G profile, tripwire writes of that area = 0; acts on the friend both directions (steal, gift, harm kid, pet) |
| **G. Week end + her personal month on host** | host runs endTurn/monthTick for both (her stipend, illness, kids, pregnancy, maid, servants, shop restock, lots, reign ending G5); `end`, merge3, `sub-<seat>`, toCanon/fromCanon split, seat copies retire; server keeps the host snapshot only | L (2) | host phone slower at week end (two persons' month; today ~0.8-1.2 s for one); a personal module that keeps state outside S not registered in withSeat leaks between the two | 12-month co-op run both seats: guest stats = solo rules; perf on host Fold; old room upgrade (host takes P_b from the last merged C once); old save + solo untouched |
| **H. Reconnect = full snapshot + cleanup** | reconnect/rejoin from any device = full snapshot; delete wkIn/re-end/re-bend, seat/seatd Worker storage, CW.snap/restore, twin rule keeps only the socket part; PROTOCOL.md rewritten | M (1) | a delta applied on top of a stale snapshot (version check is the guard) | COOP_RECONNECT, sleep/wake, rejoin from another device, reload mid-dialog, host drop + return, coop-twin |

Total ≈ 14-16 worker sessions + one reviewer each (BIG co-op). B and C give most of the bug relief; F is the biggest and is what makes
the guest truly "display only". Do not start E while night-final #4 or coop-contest-fix #2 run (same code); coop-stable #2 fixes stay
useful until H (reconnect paths) and the Worker `bury()` fix stays for good.

Interim (option 1, until each part lands): N1 runtime-IT crash (G23) needs its own small fix now (re-register item kinds from the key on
load + guard the `IT[x]` readers) — it can stop a week for both today, and in the thin model it disappears only at G.

## 4. Risks of the move itself (likelihood · severity · how we see / undo it)
| Risk | Likelihood | Severity | Detect / fix |
|---|---|---|---|
| Host phone locked / app in background → guest cannot do anything (today she can still act inside her buổi) | likely (phones lock) | medium | already a freeze panel; after F it covers taps too. Cure = option 3 later; mitigation: host keeps the screen awake while a friend is online |
| Tap delay on the guest (round trip) | certain, small | small-medium | measure in F (target ≤ 400 ms); show the tap's kit "đang xử lý" state; revert one F-part by the room flag |
| Host phone heavier (two persons per buổi / week) | possible | medium | perf gate in E and G (quickcheck buổi times on host Fold) |
| withSeat misses a per-player cache → the two players' data leak into each other | possible | large | tripwire + a "swap round trip" test in A; each part's flag can be turned off per room |
| Mixed builds in one room | rare | medium | build-match hold already exists (swreg CW.hold) |
| Long migration window with two paths | certain | medium | one part at a time, old path deleted in the same part; old relays frozen (no new features) |

## 5. Plain summary for sếp (Vietnamese)
- Bây giờ: mỗi điện thoại tự chạy nguyên một ván riêng (tự tung xúc xắc, tự qua buổi, qua tuần, tự tạo kiếp mới), rồi mỗi tuần hai bản
  được "ghép" lại. Có khoảng 30 chỗ máy khách tự tính và khoảng 30 đường nhắn qua lại để giữ hai bản giống nhau. Gần như mọi lỗi co-op
  đã gặp (cung phi ma, tên trùng, hai người cùng thị tẩm một đêm, hai bảng thi, kẹt "Chờ hảo hữu", mất tuần khi vào lại) đều từ đây.
- Sau khi chuyển: chỉ máy chủ phòng chạy game. Máy bạn chỉ hiện và gửi "tôi bấm cái này". Vào lại = tải nguyên trạng thái, không ghép.
- Làm theo 8 phần, mỗi phần chạy riêng được, phần nhỏ rủi ro thấp trước: nền móng → kiếp mới do chủ phòng tạo → thế giới chỉ chủ phòng
  tính → hộp thoại gửi từ chủ phòng → buổi và đêm → từng việc bạn bấm → qua tuần → vào lại. Khoảng 14–16 lượt thợ.
- Được: hết cả họ lỗi "hai bản lệch nhau" và lỗi khi rớt mạng (chắc chắn, lợi lớn); thêm tính năng co-op mới không phải nhớ chặn máy khách.
- Rủi ro: (1) máy chủ phòng khóa màn hình thì máy bạn đứng hẳn — dễ xảy ra, mức vừa; đã có bảng báo chờ, sau này máy chủ server sẽ chữa.
  (2) máy bạn bấm chậm hơn chút (khoảng nửa giây trở xuống) — chắc chắn, nhỏ; đo từng phần, tắt phần đó được nếu tệ. (3) máy chủ phòng
  nặng hơn — có thể, vừa; có bài đo tốc độ mỗi phần. (4) lẫn dữ liệu hai người nếu sót — có thể, lớn; có bài thử tự động bắt và mỗi phần
  tắt được theo phòng.
- **Kết luận: Được lớn hơn** — mỗi phần xóa hẳn một họ lỗi đã gặp đi gặp lại; các rủi ro đều đo được và tắt lại được từng phần.

## 6. Scan used for G11 (reproducible)
`for f in $(git grep -l -E "endTurn=function|nextBuoi=function" -- 'dev/build/j*.js' | grep -v jcoop)`: count NPC refs
(`liveRivals|of rivals|rivals.(forEach|filter|map|find)|allServ|allKids|consorts()`), co-op guards (`worldOn|COOPW|npcOK|Guest(|guest(|isGuest|prHostOK|host()`)
and rolls (`R(|roll(|pick(|Math.random`). Result on 744b80e7: 57 modules wrap endTurn/nextBuoi; 12 have a guard; 35 have NPC refs + rolls
and no guard. 213 `Math.random` in 77 game files; only jtrong (room seed) and jexam (seeded) are seat-independent. 304 click handlers,
743 dialog `go:` closures (the intent boundary is wrapped at engine functions, not these).
