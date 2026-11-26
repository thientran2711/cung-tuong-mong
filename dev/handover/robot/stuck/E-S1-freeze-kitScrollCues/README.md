E-S1 fold speed seed 608519237 (thd/thd_tho, E-S1-R1-speed-1-608519237), fresh life on robot-realtap 08a4ff8b: the page freezes at buổi 303–305 with the renderer at 3.8 GB although the save is small (~700 k chars). Two freezes in a row (crash at buổi 303, resume → freeze again at buổi 305):
 FREEZE STACK buổi 303 renderer 3835 MB: scan @:9252:85 < (anon) @:9254:113
 FREEZE STACK buổi 305 renderer 3822 MB: kitScrollCues @:81275:2 < MutationObserver.observe.childList @:81277:213
i.e. the main thread spins in the game's kitScrollCues (a MutationObserver on childList) → a DOM-mutation loop / storm (the observer's callback mutates the observed list). Different from the earlier long-save freeze (kitNoUnkDom, handover 7e9a1c3b).
GAME BUILD printed by the harness at page load; github.io sw ≥ c039fbea2394. Replay: gunzip ckpt-buoi300.json.gz to <out>/E-S1-R1-speed-1-608519237.ckpt.json and run: node dev/test/robot-rt.js <LIVE> <out> dev=fold origin=thd road=thd_tho bot=bold seed=608519237 life=E-S1-R1-speed-1-608519237 resume=1
The life is PARKED (STUCK-gamebug perf) with its ckpt.
Runner: session_01DgYSWpfx9EuQ7nBDWNiLL4 (E-S1).
