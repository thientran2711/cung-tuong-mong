/* review/suc-khoe: extra per-life counters for runb.js (env INP2=insk.js): her pregnancies and how they end (miscarriage by cause, preterm, overdue, births,
   death in childbirth), lệch sổ / blood tests (ng_set, ng_oan, NPC twin), her Sức and Sức max (weekly mean, by age band), NPC Sức / ceiling. Attached as x.sk. */
(function(){const Z=()=>({preg:0,mis:0,misC:0,births:0,momDie:0,pre:0,od:0,wk:0,suc:0,cap:0,band:{},npcSuc:0,npcCap:0,npcN:0,kh:{},rt:{}});window.__sk=Z();window.__khN={};window.__rtN={};
 const R0=window.__res;const p0=R0.push;R0.push=function(x){try{const s=window.__sk;s.kh=Object.assign({},window.__khN||{});s.rt=Object.assign({},window.__rtN||{});x.sk=s}catch(e){}window.__sk=Z();window.__khN={};window.__rtN={};return p0.apply(this,arguments)};
 const pm=pregMonthP;pregMonthP=function(p){if(p!==S||!S.preg||S.fake)return pm.apply(this,arguments);const s=window.__sk,m0=S.misN||0,c=S.preg;if(c===1)s.preg++;const r=pm.apply(this,arguments);
  if((S.misN||0)>m0){s.mis++;if(/đi lại|mưa gió|lao lực|suy kiệt/.test(String(r)))s.misC++}if(/sinh non/.test(String(r)))s.pre++;if(/chưa trở dạ/.test(String(r)))s.od++;return r};
 const bp=birthP;birthP=function(p,fake){const r=bp.apply(this,arguments);try{if(p===S&&!fake){window.__sk.births++;if(S.dead)window.__sk.momDie++}}catch(e){}return r};
 const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead&&typeof sucCap==="function"){const s=window.__sk;s.wk++;s.suc+=S.suc;const c=sucCap(S);s.cap+=c;const b=S.age<30?"<30":S.age<40?"30s":S.age<50?"40s":"50+";const B=s.band[b]=s.band[b]||[0,0,0];B[0]++;B[1]+=c;B[2]+=S.suc;
   if(S.tuan===0)for(const v of liveRivals(true)){s.npcN++;s.npcSuc+=v.suc||0;s.npcCap+=sucCap(v)}}}catch(e){}return r};
})();
