/* review/temper-perception (seat T2c) — counters for the NPC mood-term rate check (law 1), injected after boot, NO taps.
   Counts NPC doers only (a !== S): every motiveOK call on a hostile kind (calls / pass / block), the passes owed to the mood term
   (same call with BAL.tp.moodM = 0 fails; branch only), NPC gây sự deeds reaching tpDeed (branch only). Lives in S.__tpm so a resumed life keeps counting.
   window.__tpmArm: 'main' | 'on' (moodM as built) | 'off' (BAL.tp.moodM=0). Runs on main too (no BAL.tp / tpDeed there). */
(function(){if(window.__tpmOn)return;window.__tpmOn=1;const ARM=window.__tpmArm||'on';
 const H=new Set(["provoke","vent","humil","rumor","spy","trip","frame","plant","block","bribe","accuse","steal","poison"]);
 const hasTp=()=>{try{return !!(BAL&&BAL.tp)}catch(e){return false}};
 if(ARM==='off'&&hasTp())BAL.tp.moodM=0;
 const C0=()=>({calls:0,pass:0,block:0,byMood:0,deeds:0,byKind:{},arm:ARM});
 const cc=()=>{try{if(!S||typeof S!=='object')return null;return S.__tpm||(S.__tpm=C0())}catch(e){return null}};
 const m0=window.motiveOK;if(typeof m0==='function'){window.motiveOK=motiveOK=function(a,t,kind){const g=m0.apply(this,arguments);try{const C=cc();if(C&&a!==S&&H.has(kind)){C.calls++;const K=C.byKind[kind]=C.byKind[kind]||[0,0,0];K[0]++;
   if(g.ok){C.pass++;K[1]++;if(hasTp()&&BAL.tp.moodM&&typeof tpMoodM==='function'&&tpMoodM(a)>0){const M=BAL.tp.moodM;BAL.tp.moodM=0;let g2;try{g2=m0.apply(this,arguments)}finally{BAL.tp.moodM=M}if(!g2.ok){C.byMood++;K[2]++}}}else C.block++}}catch(e){}return g}}
 const d0=window.tpDeed;if(typeof d0==='function')window.tpDeed=tpDeed=function(X,d){try{const C=cc();if(C&&X!==S&&/^(provoke|humil|vent)$/.test(d))C.deeds++}catch(e){}return d0.apply(this,arguments)};
 window.__tpmGet=()=>{const C=cc();return C?JSON.parse(JSON.stringify(C)):null}})();
