# minister-agents — PARKING LOT #7 (JOB 4, root63-cag20-jobs.md) — worker session_01Rc5AsHjti1YnXbSGeocwni (C-AG #20)
PRIORITY #1 CHECK ('minister memorial'): OD 4 (PL#7 only) | main: j55 five house heads S.trieu.H (named, nết via jnet) + tdSoMonth weighted pick; anonymous "ngự sử" in ccStep / tdLeak / cc memorial; j7 ev("minister") "Thượng thư Hộ bộ" unnamed | review/*: review/npc-purpose (NOT live) rewrites tdSoMonth selection to stake picks (jagwhyg2b; C-AG answer (c) parked the minister agent → PL#7) | claims: this row only. Reused: agOn/agCap/agErr (jagent), mindPick (jmind), jnet nết, j55 acts (tdGift, ccRisk, tdImpeach…), j61 people registry. No second agent system.
depth 8 · START_CTX ≈ 4 % (estimate; context_usage read 0).

## What (branch review/minister-agents @ 0d3f2b0b, contains LIVE fd6118cd (merged 19/11 ~04:50Z: assemble.py union jfigx + jagmin, site rebuilt; minister-agents 11/11 ×2, one-core PASS, QUICKCHECK PASS render 214/235 tab 436/431 buổi 1216/1101 ms))
- Law 8 history expert first: head of the censorate = **Tả đô ngự sử, Đô sát viện** (Ming 1382 / Qing, rank of a thượng thư; Nguyễn court too). Not Ngự sử đại phu / trung thừa (Han–Song). Phong văn tấu sự (memorial on hearsay) is historical → a memorial may prove false. Junior giám sát ngự sử stay unnamed in authored story roads.
- New dev/build/jagmin.js (after jagemp): **one new living official**, the censor S.trieu.ns (lazy, old saves get him; unique name vs every person of k61All; ages yearly; regard fades; in the j61 people registry kind "off"; faces in use).
- **Goals from nết** (BAL.ag.min.gT): Tham vọng→quyen, Vì gia tộc→nha, Vì mình→loi, Trọng nghĩa/Thật thà/Cương trực→liem, else le (censor default liem). Goal chip "Chí: …" on every official's Triều đình card.
- **Monthly memorial = agent choice** (tdSoMonth wrapped, j55 effects unchanged): each official lists the memorials the court state allows HIM (j55 gates: praise of a friendly house, lập đích for the queen's house, impeachment of a feuding house's consort's father, tuyển tú for his strong house, can-chính = the censor); weight = fit[goal][kind] × stake; he picks his own by mindPick (slip only among his own goal-valid memorials); standing (pow) weighs whose reaches the throne; TD.so still gates reaching it. Speaker/target reach j55 via window.MINP (tdImpPick, tuyển tú house, can-chính consort).
- Every memorial names speaker + goal, e.g. "Sớ hặc can chính: Tả đô ngự sử Âu Dương Lăng Vân (giữ phép nước, ghét kẻ tham nhũng) tâu …". Regard spares: impeachment stake × (1 − af/100). An official whose inquiry found a father clean waits BAL.ag.min.imp.keep (12) months.
- **Two-way (law 1)**: she courts the censor by the same gift deed (kit card + tdActBtn → tdAct gift); worried NPC consorts (cc>0) court him by the same tdGift monthly (chance × her can-chính risk). His regard lowers can-chính risk: ccRisk × (1 − afW·af/100); previews read the same ccRisk (one core).
- Numbers: BAL.ag.min (jbal2). One gate each: j55 tdDichOpen(), tdBusy() (copies removed). Off: BAL.ag.min.on=0 / BAL.ag.on=0 / __agOff → old j55 path.

## Group scan (law 11): anonymous officials in court memorial lines (grep ngự sử / triều thần / bá quan / đại thần / quan tham over dev/build/j*.js)
| place | before | after |
|---|---|---|
| j55 ccStep (can chính caught) | "Ngự sử dâng sớ hặc X" | "Tả đô ngự sử <name> dâng sớ hặc X" (+ news) |
| j55 tdLeak success | "Ngự sử dâng chứng cứ" | "Tả đô ngự sử <name> dâng chứng cứ" |
| j55 memorial cc (both outcomes + news) | "ngự sử tâu" | named censor + goal |
| j55 memorial praise | "triều thần dâng sớ ca ngợi" | named friendly official + goal |
| j55 dich / tuyển tú / hặc tội | office + name | + goal words; their news lines now carry the name (were office only) |
| j55 moodMonth "tham" | "Quan tham bị phát giác…" | "Tả đô ngự sử <name> phát giác quan tham…" |
| j7 ev minister | "Thượng thư Hộ bộ xin tăng thuế muối" | living Hộ bộ thượng thư by name (minOff) |
| j67 road card c1 | "Có đại thần dâng sớ: trưng thu thóc" | token {hobo} = living Hộ bộ thượng thư |
| j61 K61ANN | only "sớ hặc tội" announced names | every "sớ hặc / khen / xin" announces speaker + target (name mask) |
| KEPT | authored road scenes (jrd_tt, jrd_dtq: "Một vị Ngự sử già", "Ngự sử đài", Tam ty), crowds ("triều thần đều nói"), j3 old mood list (j55 overrides) | junior censors / institutions / crowds, not memorials of the court system (expert: juniors may stay unnamed) |

## Tests (on 822f17c4)
- NEW dev/test/minister-agents.js 11/11 PASS (×9 runs after the steadiness fix): every memorial names a living S.trieu official + goal; goal = nết table; censor regard lowers risk by afW; her gift button + NPC gift; clean-father memory; off switch; old save without ns; Triều đình card; 0 page errors over 36 months.
- one-core-guard PASS (inline 3987 < baseline 4212); agemp_check 20/20.
- QUICKCHECK PASS (core gates PASS, old save ok; perf new/live render 225/209, tab 430/447, buổi 1304/944 ms — buổi varies between runs (earlier run 1246/1186); jagmin runs monthly only).
- Shots Fold 755x1000@2 + iPad 1180x820@2 (looked): https://ctm-img.victoria-tntt.workers.dev/img/_review/minister-agents/{fold-court,fold-news,ipad-court,ipad-news}.webp — wipe after verdict.

## Notes for reviewer / lander
- review/npc-purpose (not live) changes the same tdSoMonth selection lines + tdMonth NPC acts: whoever lands second keeps jagmin's wrapper (it calls tdSoMonth(force); both versions honour force) with npc-purpose's npwPick as the agents-off path; in cc / tuyen / imp picks keep the MINP check before npwPick.
- KIT: censor card = the same .rival.tdh card + tdActBtn + chip + sbar as the five heads; no new CSS.
