/* ILLNESS-CURE r5 family scan (law 1 + law 11, Foreman E E-ILL-RATE): every NPC group that falls ill through jface fxIllMonth
   (cung nữ · thái giám · ma ma · thái y · thị vệ · quan · hoàng tử / công chúa · children of NPC mothers) — does a cure road reach it, which road,
   and the month cure odds at nặng (Lao phổi, 600 trials, the real fxIllMonth); plus the CHILD rows: a child of an NPC mother, no road taken,
   death within 36 months by the kidsMonth rule (young / old, 1500 trials). Works on a build before r5 (every probe is guarded).
   node dev/tools/npc-ill-road-scan.js <dir with index.html> [out.md] */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const DIR=path.resolve(process.argv[2]||'.');const OUTF=process.argv[3];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(DIR,'index.html'));await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
  const log0=window.log;window.log=()=>{};const out={g:[],kid:[]};const by={};
  for(const x of KIT_FACEFX.everyone()){if(!x||x===S||!KIT_FACEFX.live(x))continue;const k=KIT_FACEFX.kind(x);if(["emp","thaihau","consort","player","cold"].includes(k))continue;
   if(k==="kid"){const v=KIT_FACEFX.owner(x);if(!v||v===S)continue}(by[k]=by[k]||[]).push(x)}
  const N=600;
  for(const k of Object.keys(by).sort()){const x=by[k][0];const keep={ill:x.ill,hp:x.hp,alive:x.alive,suc:x.suc,bac:x.bac};const v=k==="kid"?KIT_FACEFX.owner(x):null;const vk=v?{bac:v.bac,suc:v.suc,sung:v.sung}:null;
   const own=typeof ownerOf==="function"?ownerOf(x):null;const st=own&&own.staff?own.staff.slice():null;let cured=0;const n0=window.IC&&IC.staff||0;const w0=JSON.stringify(window.IC&&IC.staffW||{});
   for(let t=0;t<N;t++){x.ill={k:"lao",st:2,known:false};x.alive=true;if(typeof x.hp==="number")x.hp=60;if(typeof x.suc==="number")x.suc=80;if(v){v.bac=200;v.suc=80;v.sung=30}fxIllMonth(x);if(!illOf(x))cured++;if(own&&st)own.staff=st.slice()}
   const W=JSON.parse(JSON.stringify(window.IC&&IC.staffW||{})),W0=JSON.parse(w0),ways=Object.keys(W).filter(w=>(W[w]||0)>(W0[w]||0)).map(w=>w+" "+((W[w]||0)-(W0[w]||0)));
   out.g.push({k,road:(window.IC&&IC.staff||0)-n0,ways:ways.join(", ")||"—",cure:Math.round(100*cured/N)});Object.assign(x,keep);if(v)Object.assign(v,vk)}
  /* child rows: an NPC mother's child, no road, 36 months of kidsMonth */
  const v=(rivals||[]).find(r=>r.alive!==false);const ks0=v.kids;const st0=S.storms,tu0=S.turn;S.storms=0;const kd0=window.kidDie;window.kidDie=(k)=>{k.alive=false;return""};
  for(const [lbl,age] of [["young (under 3)",1],["old (3+)",6]]){let dead=0,struck=0;const T=1500;for(let t=0;t<T;t++){const k={name:"Tiểu Ngọc",sex:"f",age,hp:100,alive:true};v.kids=[k];let hit=false;
    for(let m=0;m<36&&k.alive;m++){const h0=k.hp;S.turn+=12;/* a month passes (kIll.t is the turn she fell ill) */kidsMonth();if(k.hp<h0-10||k.kIll)hit=true}if(hit)struck++;if(!k.alive)dead++}
   out.kid.push({lbl,dead:(100*dead/T).toFixed(1),struck:(100*struck/T).toFixed(1),perStrike:struck?(100*dead/struck).toFixed(1):"—"})}
  v.kids=ks0;S.storms=st0;S.turn=tu0;window.kidDie=kd0;window.log=log0;
  out.bal={npc:BAL.illCure?BAL.illCure.npc:"(none)",kidIll:BAL.kidIll?JSON.stringify({worse:BAL.kidIll.worse,heal:BAL.kidIll.heal,well:BAL.kidIll.well}):"(none)"};return out});
 let md=`#### NPC groups through jface fxIllMonth (Lao phổi · nặng, ${600} months each)\n| group | road taken (of 600) | which road | cured that month |\n|---|---|---|---|\n`;
 for(const g of R.g)md+=`| ${g.k} | ${g.road} | ${g.ways} | ${g.cure} % |\n`;
 md+=`\n#### Child of an NPC mother, no road, 36 months (kidsMonth, 1500 lives each; BAL ${R.bal.kidIll})\n| child | struck | died | died per struck child |\n|---|---|---|---|\n`;
 for(const k of R.kid)md+=`| ${k.lbl} | ${k.struck} % | ${k.dead} % | ${k.perStrike} % |\n`;
 md+=`\npage errors: ${errs.length}\n`;console.log(md);if(OUTF)fs.writeFileSync(OUTF,md);await b.close()})();
