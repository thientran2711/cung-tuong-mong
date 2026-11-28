/* review/rank-pace: the exam window in CO-OP (Foreman D gate (4)), run inside each seat's page by coop-e2e.js when COOP_EXAM=1 (once, both seats).
   On this seat: open her window (kỳ held open, conditions met), the kit card «Thi ngay / Để sau» must come up on THIS seat only, «Để sau» keeps the
   Hành sự card, then «Thi ngay» (exam auto, as one who plays at her own level) sits the exam for HER; the friend's entry (rivals coop) keeps her rank.
   Returns {seat, card, later, sat, frRank0, frRank1, err}. Read-only for the world apart from her own exam (a probe of her life). */
module.exports=function RANKPACE_COOP_PROBE(){try{
 if(typeof exTick!=='function'||typeof S==='undefined'||!S||!window.COOPW||!COOPW.on)return{skip:1};
 const fr=rivals.find(v=>v&&v.coop)||rivals.flatMap(v=>v&&v.staff||[]).find(x=>x&&x.coop);const frRank0=fr?fr.rank:null;
 const k0=window.pbKyAt;window.pbKyAt=()=>"newyear";Q.length=0;used=0;S.sung=Math.max(S.sung,90);S.danh=Math.max(S.danh,90);S.duc=Math.max(S.duc,90);S.th=60;S.hh=60;S.lastPromo=-99;S.confined=0;S.suc=90;S.ex=null;
 exTick();if(!S.ex||S.ex.w1==null)return{noWindow:1,seat:COOPW.seat,rank:S.rank,out:!!S.out,srv:typeof isSrv==='function'&&isSrv(),on:exOn(),rows:promoReqP(S).filter(x=>!x[0]).map(x=>x[1]).slice(0,4)};const m=Q.find(x=>x&&x.exAsk);const card=m?m.opts.map(o=>o.n).join('/'):null;
 let later=null;if(m){chooseM(m.opts.findIndex(o=>o.n==="Để sau"));later=deck.some(a=>a&&a.exam===1)&&!Q.some(x=>x&&x.exAsk)}
 S.ex.rem=null;S.ex.w0=null;const W=S.ex.w1;const wk0=wk;wk=()=>W;exTick();wk=wk0;const m2=Q.find(x=>x&&x.exAsk);let sat=false;
 if(m2){window.__exAuto=1;BAL.ex.__bar=BAL.ex.bar.slice();chooseM(m2.opts.findIndex(o=>o.n==="Thi ngay"));sat=!!(S.ex&&(S.ex.n||S.ex.pass));window.__exAuto=0}
 window.pbKyAt=k0;Q.length=0;try{showModal()}catch(e){}
 return{seat:COOPW.seat,card,later,reminder:!!m2,sat,frRank0,frRank1:fr?fr.rank:null}}catch(e){return{err:String(e&&e.message||e)}}};
