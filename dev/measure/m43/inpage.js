(function(){
window.__m={harm:0,harmMe:0,byK:{},months:0,lives:0,pl:{},errs:[],wit:{}};
const HARM=new Set(BANDS.slice(1).flatMap(x=>x[2]).concat(["lygian","tocao","xinhh","slowpoison","expose"]));
popNum=()=>{};curtain=()=>{};fx=()=>{};save=()=>{};renderHUD=()=>{};renderStage=()=>{};renderPanel=()=>{};
render=function(){};
if(typeof mindLog==="function"){const ml=mindLog;mindLog=function(v,k){ml.apply(this,arguments);try{const b=witOf(v)>=60?'hi':witOf(v)>=30?'mid':'lo';const D=__m.wit[b]=__m.wit[b]||{};D[k]=(D[k]||0)+1}catch(e){}}};
const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{if(a&&a!==S&&HARM.has(k)&&r){__m.harm++;if(t===S)__m.harmMe++;__m.byK[k]=(__m.byK[k]||0)+1}}catch(e){}return r};
function addPL(){const P=S.persLog||{};for(const t in P){const D=__m.pl[t]=__m.pl[t]||{};for(const k in P[t])D[k]=(D[k]||0)+P[t][k]}
 const m=S.mind||{};const D=__m.pl.__all=__m.pl.__all||{};for(const k in m)D[k]=(D[k]||0)+m[k];S.persLog={};S.mind={}}
let lastM=null;
window.__run=function(months){let guard=0;
 while(__m.months<months&&guard<400000){guard++;
  try{
   const mk=S?S.year*12+S.month:0;if(lastM!==null&&mk!==lastM&&!S.dead)__m.months++;lastM=mk;
   const ov=document.querySelector('#ov');if(ov&&!ov.hidden){const ok=document.querySelector('#mgok');if(ok){ok.click();continue}const sk=document.querySelector('#mgskip');if(sk&&!sk.hidden){sk.click();continue}S.mg=null;ov.hidden=true;continue}
   if(Q.length){const m=Q[0];if(m.opts&&m.opts.length){const ok=m.opts.map((c,i)=>i).filter(i=>!(m.opts[i].fx&&m.opts[i].fx.bac&&S.bac+m.opts[i].fx.bac<0));if(ok.length){const n=Q.length;chooseM(ok[Math.floor(Math.random()*ok.length)]);if(Q.length===n&&Q[0]===m)Q.shift();continue}}Q.shift();continue}
   if(S.dead){addPL();__m.lives++;lastM=null;start();continue}
   if(S.mg){S.mg=null;continue}
   if(window.__ply&&Math.random()<.35&&can(2)){const L=[];rivals.forEach((v,i)=>{if(!v.alive||v.out)return;const d=document.createElement('div');d.innerHTML=rvButtons(v,i);[...d.querySelectorAll('button[data-r]')].filter(b=>!b.disabled).forEach(b=>L.push([i,b.dataset.a]))});if(L.length){const [i,k]=L[Math.floor(Math.random()*L.length)];const u=used;doAct(i,k);if(used!==u||Q.length)continue}}
   nextBuoi();
  }catch(e){__m.errs.push(String(e.message).slice(0,120));Q=[];if(__m.errs.length>50)break}}
 addPL();return __m};
})();
