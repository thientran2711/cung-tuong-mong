/* review/temper-perception (seat T2b) — runb.js INP2 module: NPC rate check of the motive gate's MOOD term (law 1, BAL.tp.moodM).
   Counts, for NPC doers only (a !== S), every motiveOK call on a hostile kind: passed / blocked, and the passes that needed the mood term
   (the same call with BAL.tp.moodM = 0 fails), plus NPC gây sự deeds (provoke / humil / vent) reaching the onlooker rule (tpDeed).
   Arms: as built (moodM 10) vs XJS='BAL.tp.moodM=0'. Result in <out>.ext.json → tpm.
   usage: SEED=1 INP2=intpmood.js node dev/measure/runb.js sens 3 /tmp/on.json ; SEED=1 INP2=intpmood.js XJS='BAL.tp.moodM=0' node dev/measure/runb.js sens 3 /tmp/off.json */
(function(){const C=window.__tpm={calls:0,pass:0,block:0,byMood:0,deeds:0,byKind:{}};
 const H=new Set(["provoke","vent","humil","rumor","spy","trip","frame","plant","block","bribe","accuse","steal","poison"]);
 const m0=window.motiveOK;window.motiveOK=motiveOK=function(a,t,kind){const g=m0.apply(this,arguments);try{if(a!==S&&H.has(kind)){C.calls++;const K=C.byKind[kind]=C.byKind[kind]||[0,0];K[0]++;
   if(g.ok){C.pass++;K[1]++;if(BAL.tp.moodM&&tpMoodM(a)>0){const M=BAL.tp.moodM;BAL.tp.moodM=0;let g2;try{g2=m0.apply(this,arguments)}finally{BAL.tp.moodM=M}if(!g2.ok)C.byMood++}}else C.block++}}catch(e){}return g};
 const d0=window.tpDeed;window.tpDeed=tpDeed=function(X,d){try{if(X!==S&&/^(provoke|humil|vent)$/.test(d))C.deeds++}catch(e){}return d0.apply(this,arguments)};
 const B=window.__bot;if(B){const e0=B.extra;B.extra=function(){const r=e0?e0.apply(this,arguments):{};return Object.assign(r||{},{tpm:C,moodM:BAL.tp.moodM})}}})();
