/* review/luxury (D17): luxury flow recorder (load after inpage5.js; works on builds with or without jlux).
   Per life: Danh/Đức/Thái hậu change from the dress verdict at formal moments (aaThieuLeApply), from the monthly luxury law (luxMonth, her only),
   from Hội phối đồ (tsDressHold); verdict counts; edicts; months with tiếng xa hoa; contest places; NPC mean Đức/Danh at life end. */
(function(){
let A={};const z=()=>({apN:0,apDanh:0,apDuc:0,apTh:0,mDanh:0,mDuc:0,mTh:0,cN:0,cPlace:[],cDanh:0,cDuc:0,mon:0,sDanh:0,sDuc:0,sBac:0,v:{},edict:0,xahoa:0,luxSc:[],ratio:[]});A=z();
const snap=()=>({d:S.danh,u:S.duc,t:S.th});const add=(b,kd,ku,kt)=>{A[kd]+=S.danh-b.d;A[ku]+=S.duc-b.u;if(kt)A[kt]+=S.th-b.t};
const R=window.__res;const p0=R.push;R.push=function(r){try{if(r&&!r.lux){let npc={};try{const L=liveRivals(true);npc={duc:+(L.reduce((s,v)=>s+(v.duc||0),0)/Math.max(1,L.length)).toFixed(1),danh:+(L.reduce((s,v)=>s+(v.danh||0),0)/Math.max(1,L.length)).toFixed(1),xahoa:L.filter(v=>(v.luxRep|0)>=6).length}}catch(e){}
 r.lux=Object.assign({},A,{npc})}}catch(e){}A=z();return p0.apply(this,arguments)};
if(typeof aaThieuLeApply==="function"){const f0=aaThieuLeApply;aaThieuLeApply=function(host){const b=snap();let v="";try{const L=leAttire(S,"",host);v=L.toil&&L.toil.lux?L.toil.lux.v:L.toil&&L.toil.dress||L.state}catch(e){}const r=f0.apply(this,arguments);
 if(S.danh!==b.d||S.duc!==b.u||S.th!==b.t){A.apN++;A.v[v]=(A.v[v]||0)+1}add(b,"apDanh","apDuc","apTh");return r}}
if(typeof luxMonth==="function"){const m0=luxMonth;luxMonth=function(p){if(p!==S)return m0.apply(this,arguments);const b=snap();const r=m0.apply(this,arguments);add(b,"mDanh","mDuc","mTh");
 try{A.mon++;A.sDanh+=S.danh;A.sDuc+=S.duc;A.sBac+=S.bac;const x=luxOf(S);A.luxSc.push(x.sc);A.ratio.push(+(x.sc/x.bud).toFixed(2));if((S.luxRep|0)>=6)A.xahoa++;if(S.luxEdict&&S.luxEdict.at===S.turn)A.edict++}catch(e){}return r}}
if(typeof tsDressHold==="function"){const h0=tsDressHold;tsDressHold=function(){const b=snap();const r=h0.apply(this,arguments);add(b,"cDanh","cDuc");return r}}
const l0=log;log=function(t){try{const m=/Hội phối đồ \([^)]*\): ngươi đứng thứ (\d+)\/(\d+)/.exec(String(t));if(m){A.cN++;A.cPlace.push(+m[1]+"/"+m[2])}}catch(e){}return l0.apply(this,arguments)};
})();
