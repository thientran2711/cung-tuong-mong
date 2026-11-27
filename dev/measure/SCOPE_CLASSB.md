# SCOPE_CLASSB — LAW 11 strict pass on scope-scan class B (27/11, SX-SCOPE-FIX follow-up)

Tool: `node dev/measure/scope-scan.js --strict` (exit 1 on a NEW unexplained class-B name); whitelist with reasons: `dev/measure/scope-classb.json`.
Class B = a name the assembled script reads that no scope in that module declares (cross-module globals). 194 names, 1610 reads.

## Result
| Verdict | Names |
|---|---|
| Provided at game runtime (checked in the browser after boot + new life: typeof = function/object) | 186 |
| Undefined at runtime | 8 (all 8 below) |
| Real unguarded read that can throw for a player | **0** |

## The 8 names undefined at runtime (none can throw: each read is guarded)
| Name | Where | Guard | Effect | Verdict |
|---|---|---|---|---|
| PLACES | j79:953 | try{} + fallback | place label falls back to the key | harmless |
| J59BB | j79:1234, 1544 | `window.J59BB&&` | default box used | harmless |
| KIT_EXPR | jface:32 | `window.KIT_EXPR&&` | no expression fx | harmless |
| PCOL, mkPart | j93:293-295 | `typeof` return | weather-particle tweak is dead code | harmless, dead |
| lgr | jkcg:82,85 | try{} | kc «thư nhà»/«quà nhà» ledger line silently skipped (jdh2's `lgr` is module-local) | no throw; DESIGN CALL: export or drop |
| kitTabStick | jinv:75 | try{} | refit call is a silent no-op (jk3's resize handler still works) | no throw; DESIGN CALL |
| knownList | jnsieve:212-214 | `typeof` guard | whole nsSieve known-list reorder is dead (jhc's `knownList` is module-local; only `window.kitKnownList` exists) | no throw; DESIGN CALL — exporting it would switch the reorder ON |

No game code changed here: exporting any of the three DESIGN-CALL names changes visible behaviour (feature freeze, law 18; law 16).

## Dead `typeof` guards (names the code probes with `typeof X==="function|object"` that do not exist at runtime)
Lines with `typeof X` are excluded from the scan (a guard can never throw), but a guard on a name that never exists means a feature is silently off. Checked in the browser; names (module-local helper words removed):
`sendPos ntTake j59unkSrc errIcon whoOf wdInvHTML ventMe staffOf questBusy nowW motiveOk motiveGate mkPart kyArrive knownList kitVacantFace kitGoalStrip kitDoableFirst kgfShut kgfLab kaEfTag k3ShowPlace k3CatTabs j59title j59known isDh inCycle errOpen eaGrpK PCOL`
Several are likely local variables or genuinely optional hooks; the three above that matter (lgr, kitTabStick, knownList) are listed in the table. The rest are listed for MAIN; none throws.

## Other class-B notes
- `caches` is the browser CacheStorage (jload, in try/async paths); absent only on non-secure origins (file://).
- 186 names are provided by `window.X=`, `Object.assign(window,{…})` (jmem, jnotice …) or a top-level declaration in another module/script (dev/site/*.js).
