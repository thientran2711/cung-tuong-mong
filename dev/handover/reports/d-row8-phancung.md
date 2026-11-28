# D-ROW8-PHANCUNG — phân cung by thiện cảm + palace distance (worker session_01964izFnFeMdZcSVq3NPGAx, Foreman D ROOT)
START_CTX ≈ 6 % (own estimate). Branch review/d-row8-phancung **7b97ff97** (base review/lr-rules-r2 a96564ad = FF from LIVE 22afefb4).

PRIORITY #1 CHECK: OD L2350 (24/11 ~09:20Z «… mình được chia cái cung nào nó sẽ bắt đầu phụ thuộc ở cái điểm thiện cảm của hoàng thượng, hoàng hậu và thái hậu …») + palace distance OD 24/11 ~08:15Z/~08:45Z | main 22afefb4: jpdist / jpromob ABSENT (git grep palDist / phanCungEdict = 0) | review/* palace-distance-rv 7cc392fb PASS → d-stack-lr3 cb398c07 (DELTA PASS) → promo-stack-lr4 7fc09b65 (ROUND 8 PASS) → rank-pace-rv2 bbe3d757 → **review/lr-rules-r2 a96564ad** (staged to land, same jpdist/jpromob blobs) | claims D-ROW8 only.
KIT CHECK: reuses the Q modal panel + kitRows of jpromob pcPanel (no new part; one more text line in «Vì sao»).

## STEP 0 — map (what row 8 asks vs what exists)
| ask (owner words) | where built | LIVE? |
|---|---|---|
| a «phân cung» scene after the edict and after every promotion that changes lodging | jpromob phanCungEdict + pcPanel + palFix wrapper (later moves) | NO — in lr-rules-r2 (staged) |
| Hoàng thượng's thiện cảm → nearer / better palace | pcStand (bcDanh + bcNear) × Sủng in pcHostPick; Tần+ own palace bcGrantIx by Sủng | NO — lr-rules-r2 |
| Hoàng hậu's → kind or harsh host | pcKind × S.hh / v.hh | NO — lr-rules-r2 |
| Thái hậu's → host she favours | pcAlign × th | NO — lr-rules-r2 |
| palace distance matters (tablet, visits, night Sủng, far-visit bonus, Ban cung «ngự giá» word) | jpdist BAL.palDist + jbancung | NO — lr-rules-r2 |
| same rule for her, NPCs, co-op (friend never moved) | jpal palFix → pickHost → pcHostPick; LR4 co-op guards + seat-stable tie-break | NO — lr-rules-r2 |
Verdict: row 8 is BUILT and PASSED; it reaches LIVE when lr-rules-r2 lands. Built here only the GAPS.

## Family scan (every housing site, dev/build on lr-rules-r2)
| site | before | after |
|---|---|---|
| jpal palFix pickHost (start of life, promotion, demotion, lãnh cung return, NPC, cap trim re-house) | pcHostPick: HT/HH/TH | + host↔girl thiện cảm (pcMut) |
| jpal palFix «spread» (empty chủ vị takes the newest girl of a full house) | **random pick(E)** | pcHostPick over the empty houses (same rule) |
| jpal Tần+ own palace (bcGrantIx) | by Sủng over standing / nearness | unchanged (HT favour = the owner's word for palaces) |
| jpal lone lower consort, no host free (free()) | first free palace | unchanged — proposal P-A below |
| j95c cap trim / jpromob phanCungEdict / j9 assignHouses (→ palFix) | funnel into palFix | covered |
| jkcco «Về ở cung hảo hữu» (co-op player's own choice) | player choice | n/a |
| jcoop* resHead resets | reset then palFix | covered |

## Changes (7b97ff97)
- jpromob: pcMut(p,h) = (aff both ways − oán both ways)/2 / BAL.promoR.pc.span.c, in [−1,1]; pcParts/pcScore add C = wC × pcMut. Why line (only when the liking really pulled her there, same pattern as the HH/TH lines): «<chủ vị> quý ngươi, xin cho ngươi về ở chung» (NPC: «… quý <tên>, xin cho nàng về ở chung»).
- jbal2 BAL.promoR.pc: wC .5 (under the royals' 1 each and the load .6 per co-resident: royals decide, Nội vụ phủ spreads first), span.c 40 (law 4).
- jpal spread step: the empty house is picked by pcHostPick for the girl who moves.
- tests: dev/test/d-row8-phancung.js (new), dev/test/d-row8-shots.js (new). index.html rebuilt; **sw.js NOT rebuilt** (build_site needs the CDN _index.json, blocked from this box by the proxy) → lander rebuilds generated files as usual.
- Old save: no new save field (checked in the test).

## GATES
| gate | result |
|---|---|
| d-row8-phancung (new) | 8/8 PASS: pcMut both ways; her liked host wins with neutral royals; NPC parity; one core (wC 0 → no pull, wC on → moves); royals still lead (HH dislike beats mild host liking); why line shown == applied in the real panel (m.t «Phân cung»); spread rule; no new save field |
| promo-build | PASS (exit 0, errors none) |
| kit-promo-hook | PASS |
| palace-distance | 25/27 — the SAME 2 FAIL on bare base lr-rules-r2 a96564ad («far visit Danh +6 vs near +2», her + NPC) = pre-existing, not this branch (FYI: stat-pace / Danh path on the stack; owner of jpdist should look) |
| coop-house-clash | PASS |
| help-housemate | ALL PASS |
| undef-scan | PASS (372 names) |
| quickcheck | NOT RUN to the end: build step fails here (assets.py / sw.js need the CDN, proxy 403) — environment, not code |
| coop-ban-cung / coop-e2e (soft) | NOT RUN: the co-op worker host is unreachable from this box (proxy) |
| Fold 755x1000 + iPad 1180x820 shots | **NOT DONE**: on this base the opening-day scene bubble («Thái giám … lưu bài tử, ban hương nang!») sits over the Q panel; the EXISTING dev/test/promo-build-shots.js shows the same (its phan-cung shot = bubble, not the panel), and my dismiss tries gave blank frames. The panel's text is asserted in the test above; the panel is the unchanged kit Q modal + kitRows. Needs a reviewer/merger with a working shot path (or fix promo-build-shots on lr-rules-r2). |

## PROPOSALS for D / MAIN (balance; not asked to sếp)
- P-A: a lone lower consort with no free host takes the FIRST free palace (free()); could follow HT favour (bcNear) too. Small; recommend YES later, not needed for row 8.
- P-B: wC .5 is ours; tune by robot if host-liking moves too few / too many girls.

## HANDOVER
Worktrees /home/user/wt/r8 (branch), /home/user/wt/r8base (bare base, delete), logs /home/user/wt/r8-out.
