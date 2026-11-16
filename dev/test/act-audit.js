/* ACT AUDIT (owner 11/14 + 11/15 05:40Z): every button that does something must do what its card says.
   For every act button the player can tap (Hành sự, Hậu cung person cards, Cung nhân, Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện,
   Dư đồ places and the people met there, and the options of the dialogs those open) in several states (đầu game, phẩm cao, có con,
   có kẻ hầu, sáng/tối), from ONE saved state each time (ser/deser, seeded Math.random), with every roll forced to succeed and then to
   fail: snapshot before → tap → after, then compare
     (a) Tốn/Được/Mất/Kèm numbers on the card with the real change (right direction, right person, right size),
     (b) HIDDEN effects: real changes the card does not mention,
     (c) the result card says what happened (never "không đổi gì" when something changed; its numbers = the real ones),
     (d) a disabled button names its reason,
     (e) 0 page errors.
   usage: node dev/test/act-audit.js <url of the build> <out.jsonl> [W]x[H]@dpr [scenario,…]
   Prints one JSON line per button run to <out.jsonl>; dev/test/act-audit-sum.py turns it into the ACT_AUDIT.md tables. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,OUT,SZ,SC]=process.argv;const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);
const T0=Date.now(),lg=m=>console.error('['+Math.round((Date.now()-T0)/1000)+'s] '+m);
const LIB=String.raw`
window.AA={};
(function(){
let seed=1;const rng=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const R0=Math.random;Math.random=()=>rng();AA.reseed=s=>{seed=s};
const roll0=roll;AA.force=null;roll=function(o){return AA.force==null?roll0(o):(o>0&&AA.force)};
const T=e=>(e&&e.innerText||"").replace(/\s+/g," ").trim();
AA.hide=()=>{const m=document.getElementById("modal");if(m)m.hidden=true;Q.length=0;const t=document.getElementById("rtoast");if(t){t.classList.remove("on");t.innerHTML=""}};
/* ---- state snapshot: every number a card may promise ---- */
const SK=["sung","danh","suc","bac","duc","sac","tai","tamco","mat","an","th","hh","tin","rank","preg","confined","out","ev"];
AA.snap=()=>{const o={};for(const k of SK)if(typeof S[k]==="number")o["S."+k]=S[k];if(S.maid)o["maid.loyal"]=S.maid.loyal;
 o["S.inv"]=(S.inv||[]).length;o["S.dead"]=S.dead?1:0;o["S.lot"]=S.lot?S.lot.lv:0;
 (S.staff||[]).forEach(s=>{o["staff."+s.name+".loyal"]=s.loyal;if(typeof s.tin==="number")o["staff."+s.name+".tin"]=s.tin});
 (S.kids||[]).forEach(k=>{for(const f of ["hp","tal","fond","alive"])if(k[f]!=null)o["kid."+k.name+"."+f]=+k[f]});
 for(const k in (S.arts||{}))if(typeof S.arts[k]==="number")o["art."+k]=S.arts[k];
 for(const v of rivals){const n=(v.queen?"HH ":"")+v.name;o["rv."+n+".aff"]=aff(v,S);o["rv."+n+".myaff"]=aff(S,v);o["rv."+n+".oan"]=oan(v,S);o["rv."+n+".ghen"]=v.ghen||0;
  o["rv."+n+".sung"]=v.sung;o["rv."+n+".danh"]=v.danh;o["rv."+n+".ev"]=v.ev||0;o["rv."+n+".alive"]=v.alive?1:0;o["rv."+n+".out"]=v.out?1:0;o["rv."+n+".rank"]=v.rank;o["rv."+n+".suc"]=v.suc}
 o["emp.mood"]=S.emp?S.emp.mood:0;o["used"]=used;o["S.turn"]=S.turn;o["S.buoi"]=S.buoi||0;o["logs"]=S.logSeq||0;return o};
AA.diff=(a,b)=>{const d={};for(const k of new Set(Object.keys(a).concat(Object.keys(b))))if(a[k]!==b[k]&&!(a[k]==null&&b[k]===0))d[k]=[a[k],b[k]];return d};
/* ---- one saved state; every run starts from it ---- */
AA.save=()=>{AA.base={j:JSON.stringify(ser()),PG:JSON.parse(JSON.stringify(PG||{})),place:S.place,visit:null}};
AA.restore=(s0)=>{AA.force=null;AA.hide();const d=JSON.parse(AA.base.j);quiet=true;deser(d);used=d.used||0;AA.reseed(s0||7);try{deal()}catch(e){}quiet=false;S.visit=null;S.place="home";popIdx=null;popMsg="";
 for(const k in PG)delete PG[k];Object.assign(PG,AA.base.PG);AA.reseed((s0||7)+1)};
/* ---- surfaces: how to make a group of buttons visible ---- */
const panelBtns=()=>[...document.querySelectorAll("#panel button.ka, #panel .pcb button, #panel .rbtn button, #panel button.card")];
const popBtns=()=>[...document.querySelectorAll("#popw button.opt, #popw .opts button, #popw button.ka")].filter(b=>!/^✕/.test(T(b)));
AA.surfaces=()=>{const L=[{id:"act",tab:"act"}];
 rivals.forEach((v,i)=>{if(v.alive&&(i<3||v.queen))L.push({id:"rv:"+((v.queen?"HH ":"")+v.name),tab:"rv",pg:["rv",i]})});
 const nS=(S.staff||[]).length+1;for(let i=0;i<Math.min(nS,4);i++)L.push({id:"staff:"+i,tab:"staff",pg:["staff",i]});
 const nK=(S.kids||[]).length;for(let i=0;i<Math.min(nK,2);i++)L.push({id:"kid:"+i,tab:"kid",pg:["kid",i]});if(!nK)L.push({id:"kid",tab:"kid"});
 for(const t of ["inv","art","story","rel","fac"])L.push({id:t,tab:t});
 L.push({id:"home",tab:"act",place:"home"});
 try{for(const p of places()){L.push({id:"place:"+p.k,tab:"act",place:p.k})}}catch(e){}
 return L};
AA.show=(sf)=>{tab=sf.tab;if(sf.pg)PG[sf.pg[0]]=sf.pg[1];if(sf.place){try{if(sf.place==="home")goTo("home");else{const w=S.where||{};goTo(sf.place)}}catch(e){}}AA.hide();render();if(sf.pop!=null){popIdx=sf.pop;render()}};
AA.btns=(sf)=>{if(sf.pop!=null)return popBtns();if(sf.place)return[];return panelBtns()};
/* card rows as the kit shows them */
const rowsOf=b=>{const r={};for(const k of ["why","ton","duoc","mat","kem","note"]){const e=b.querySelector(".kr-"+k+" .krv");if(e)r[k]=[...e.querySelectorAll(".ef,.kwhy,.kitem")].map(T).filter(Boolean);if(e&&(!r[k]||!r[k].length))r[k]=[T(e)]}
 const od=b.querySelector(".kodm");r.odds=od?(od.getAttribute("title")||T(od)).replace(/ —.*$/,""):"";r.name=T(b.querySelector(".kan"))||T(b).slice(0,60);r.dis=b.disabled||b.classList.contains("kdis");r.text=T(b).slice(0,400);r.kneed=b.dataset.kneed||"";return r};
AA.rowsOf=rowsOf;
const resultNow=()=>{const t=document.getElementById("rtoast");const m=document.getElementById("modal");const lr=window.kaLastResult||null;
 return{toast:t&&t.classList.contains("on")?T(t).slice(0,500):"",kres:lr?JSON.parse(JSON.stringify(lr)):null,modal:m&&!m.hidden?{title:T(document.getElementById("mt")),opts:[...m.querySelectorAll(".opts button, .opt")].map(b=>rowsOf(b))}:null,
  pop:popIdx!=null?T(document.getElementById("popw")).slice(0,300):"",popMsg:String(popMsg||"").replace(/<[^>]+>/g,"")}};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* tap button j of surface sf (and option k of the dialog it opens), with every roll forced to f (true/false/null) */
AA.run=async(sf,j,f,k)=>{AA.restore();AA.show(sf);let B=AA.btns(sf);let b=B[j];if(!b)return{err:"no button"};const card=rowsOf(b);
 window.kaLastResult=null;const e0=AA.errs.length;let pre=null,post=null;
 if(k!=null){AA.force=null;b.click();await sleep(30);render();const m=document.getElementById("modal");const O=m&&!m.hidden?[...m.querySelectorAll(".opts button, .opt")]:[];const o=O[k];if(!o)return{err:"no option",card};
  const oc=rowsOf(o);{const t=document.getElementById("rtoast");if(t){t.classList.remove("on");t.innerHTML=""}}popMsg="";pre=AA.snap();window.kaLastResult=null;AA.force=f;try{o.click()}catch(e){AA.errs.push("click "+e.message)}await sleep(60);AA.force=null;post=AA.snap();const res=resultNow();
  return{card:oc,parent:card.name,pre,d:AA.diff(pre,post),res,errs:AA.errs.slice(e0)}}
 pre=AA.snap();AA.force=f;try{b.click()}catch(e){AA.errs.push("click "+e.message)}await sleep(60);AA.force=null;post=AA.snap();const res=resultNow();
 return{card,pre,d:AA.diff(pre,post),res,errs:AA.errs.slice(e0)}};
AA.errs=[];window.addEventListener("error",e=>AA.errs.push(String(e.message).slice(0,200)));
/* ---- scenarios ---- */
AA.fresh=()=>{try{localStorage.clear()}catch(e){}document.getElementById("title").hidden=true;AA.reseed(11);for(let i=0;i<8;i++){start();if(!isSrv())break}AA.hide();S.buoi=0;used=0;
 if(S.suc<60)S.suc=80;if(S.bac<200)S.bac=200;render()};
AA.scen=(n)=>{AA.fresh();
 /* every state but "dau": she already knows everyone (names, faces), so the person acts are open */
 if(n!=="dau"){try{k61Know(rivals.filter(v=>v.alive),"",true,3)}catch(e){}try{kn();for(const v of rivals)S.met[v.id]=wk()}catch(e){}}
 if(n==="toi"){S.buoi=BUOI.length-1;used=0}
 if(n==="cao"){S.rank=5;S.sung=65;S.danh=60;S.th=55;S.tamco=55;S.mat=3;S.duc=60;try{fillStaff(S,true)}catch(e){}}
 if(n==="con"){try{const k=mkKid("m",4);S.kids.push(k);const k2=mkKid("f",2);S.kids.push(k2)}catch(e){AA.errs.push("mkKid "+e.message)}S.preg=0}
 if(n==="hau"){try{S.rank=Math.max(S.rank,3);fillStaff(S,true)}catch(e){}}
 if(n==="hh"){S.rank=7;const q=rivals.find(v=>v.queen);if(q){q.queen=false;q.rank=6}S.sung=70;S.danh=70;try{fillStaff(S,true)}catch(e){}}
 used=0;S.buoi=n==="toi"?BUOI.length-1:0;render();AA.save()};
})();`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 lg('load');await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);lg('lib');const out=fs.createWriteStream(OUT,{flags:'a'});
 const SCN=(SC||'dau,toi,cao,con,hau,hh').split(',');
 for(const sc of SCN){await p.evaluate(n=>AA.scen(n),sc);const SF=await p.evaluate(()=>AA.surfaces());lg(sc+': '+SF.length+' surfaces');
  for(const sf of SF){
   /* stage people at a place become their own surfaces */
   let subs=[sf];if(sf.place){const n=await p.evaluate(s=>{AA.restore();AA.show(s);return S.visit&&S.visit.people?S.visit.people.length:0},sf);subs=[];for(let i=0;i<n;i++)subs.push(Object.assign({},sf,{pop:i,id:sf.id+"#"+i}))}
   for(const s2 of subs){
    const cards=await p.evaluate(s=>{AA.restore();AA.show(s);const P=s.pop!=null&&S.visit&&S.visit.people[s.pop];return{who:P?(P.name||P.kind):"",c:AA.btns(s).map(AA.rowsOf)}},s2);
    for(let j=0;j<cards.c.length;j++){const c=cards.c[j];
     if(c.dis){out.write(JSON.stringify({sc,sf:s2.id,who:cards.who,j,run:"dis",card:c})+"\n");continue}
     for(const f of [true,false]){
      const r=await p.evaluate(([s,jj,ff])=>AA.run(s,jj,ff),[s2,j,f]);out.write(JSON.stringify({sc,sf:s2.id,who:cards.who,j,run:f?"win":"lose",...r})+"\n");
      const M=r.res&&r.res.modal&&r.res.modal.opts;
      if(f&&M&&M.length&&M.length<=14){
       for(let k=0;k<M.length;k++){
        if(M[k].dis){out.write(JSON.stringify({sc,sf:s2.id,who:cards.who,j,k,run:"dis",card:M[k],parent:c.name})+"\n");continue}
        for(const f2 of [true,false]){const r2=await p.evaluate(([s,jj,ff,kk])=>AA.run(s,jj,ff,kk),[s2,j,f2,k]);out.write(JSON.stringify({sc,sf:s2.id,who:cards.who,j,k,run:f2?"win":"lose",...r2})+"\n")}
       }
      }
      if(!c.odds)break; /* a sure act: one run is enough */
     }
    }
    lg(sc+' '+s2.id+' '+cards.c.length);
   }
  }
 }
 out.write(JSON.stringify({pageErrors:perr})+"\n");out.end();lg('done errs='+perr.length);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
