/* E-GAIN4B SCAN (law 3 / KIT 6 rows, law 11 whole family) — review/e-gain4 FAIL items 2 + 3, read as the kit shows them:
   WORD     — a receiver's willingness word (rcvWord: BAL.road.hp.word «Sẵn lòng / Miễn cưỡng / Không ưa / …») printed in a Được / Thành row
              (a word about HER answer is not a gain; its kit place is the Ghi chú note)                                         (fix item 2)
   TOILNOTE — a consort's dress-verdict GAIN (jtoil toilGainP, carried on the option's «kemG»: «nàng ta chuộng giản dị: quý ta +», «bớt ghen») shown in Ghi chú (row or its «!»)
              or in a Mất / Bại / Kèm row instead of Được / Thành                                                                (fix item 3)
   TOILMISS — a pop-up card of a consort met in person whose run carries the verdict (its own x, or a talk member of its door) and that shows it
              nowhere in Được / Thành
   Every surface (Hành sự deck, every tab panel, home + every place, every person's pop-up) × the cards' first level, and the dialog each
   pop-up card opens (door / tier cards). The verdict is world-drawn (her look × the consort's nết), so the scan stubs it ON for every
   consort met (toilRival → the praise, BAL.toil.praisePlain), the way e-gain4-unit (c) does; NOSTUB=1 reads the drawn world only.
   usage: node dev/test/e-gain4b-scan.js <url> [out.json] [WxH@dpr] [scenarios=dau,toi,cao,con,hau,hh] → exit 1 on any WORD / TOILNOTE / TOILMISS
   or page error. No rolls are made. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,OUT,SZ,SC]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.slice(src.indexOf('String.raw`')+11,src.indexOf('})();`;')+5);
const PROBE=String.raw`
AA.R4=(b)=>{const T=e=>(e&&e.textContent||"").replace(/\s+/g," ").trim();const r={name:T(b.querySelector(".kan"))||T(b).slice(0,60),dis:b.disabled||b.classList.contains("kdis"),rows:{}};
 for(const k of ["duoc","thanh","mat","bai","kem","note"]){const L=[...b.querySelectorAll(".kr-"+k+" .krv")];if(!L.length)continue;r.rows[k]=[].concat(...L.map(e=>{const P=[...e.querySelectorAll(".ef")];return P.length?P.map(T):[T(e)]}))}
 const bang=[...b.querySelectorAll("[data-kfx]")].map(x=>x.dataset.kfx||"");if(bang.length)r.rows.bang=bang;return r};
AA.scan4=async(s,dt)=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const fresh=()=>{AA.restore();S.turn=(S.turn||0)+dt;AA.show(s)};fresh();await sl(30);
 const P=s.pop!=null&&S.visit&&S.visit.people[s.pop];const who=P?(P.name||P.kind)+"/"+P.kind:"";const top=AA.btns(s);const out=[];
 /* which pop-up card carries the verdict: its own x, or (a door / tier / one-tap) the x of a TALK member (jtoil wraps the talk options; in-person acts carry none) */
 const PL=h=>String(h==null?"":h).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim(),VG=t=>/: quý ta \+|bớt ghen/.test(PL(t)),EXP={};
 if(P&&P.kind==="rival"&&P.ref){let A=[];try{A=talkOpts(P)}catch(e){}for(const a of A){if(!a)continue;const XG=o=>VG(o.x)||VG(o.kemG)/* E-GAIN4C: the verdict gain rides on «kemG» (jtoil, LIVE ACT-MOVE-6 carrier) */;let c=XG(a);try{const r=a.door&&DOOR.byK(a.door);if(r&&!c&&window.ONE&&ONE.members){const {L}=ONE.members(doorPP(P,s.pop,r.k),r);c=L.some(m=>m&&m.a&&XG(m.a))}}catch(e){}EXP[PL(a.n)]=c}}
 for(let j=0;j<top.length;j++){const b0=top[j];if(b0.closest(".tdseg")||b0.closest("[data-knav]"))continue;const c=AA.R4(b0);const met=Object.entries(EXP).some(([n,v])=>v&&c.name.startsWith(n));out.push(Object.assign(c,{who,met,lvl:0}));
  if(s.pop==null||c.dis)continue;fresh();await sl(20);const b=AA.btns(s)[j];if(!b)continue;AA.force=null;try{b.click()}catch(e){}await sl(20);try{render()}catch(e){}
  const m=document.getElementById("modal");if(m&&!m.hidden){for(const o of m.querySelectorAll(".opts button.ka, .opts button.opt")){const r=AA.R4(o);if(/^(✕|Thôi|Lui)/.test(r.name))continue;out.push(Object.assign(r,{who,met:false,lvl:1,parent:c.name}))}}
  AA.hide()}
 return out};`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);await p.evaluate(PROBE);
 const WORDS=await p.evaluate(()=>Object.values((BAL.road&&BAL.road.hp&&BAL.road.hp.word)||{}));
 if(!process.env.NOSTUB)await p.evaluate(()=>{window.toilOn=()=>true;window.toilRival=(v,d)=>d?null:{txt:"nàng ta chuộng giản dị: quý ta +"+BAL.toil.praisePlain,aff:BAL.toil.praisePlain,g:0}});
 const ALL=[];const DT=(process.env.DRAWS||'0').split(',').map(Number);
 for(const sc of (SC||'dau,toi,cao,con,hau,hh').split(',')){await p.evaluate(n=>AA.scen(n),sc);const SF=await p.evaluate(()=>AA.surfaces());
  for(const dt of DT)for(const sf of SF){let subs=[sf];if(sf.place){const n=await p.evaluate(s=>{AA.restore();AA.show(s);return S.visit&&S.visit.people?S.visit.people.length:0},sf);subs=[];for(let i=0;i<n;i++)subs.push(Object.assign({},sf,{pop:i}))}
   else if(dt)continue;
   for(const s2 of subs){const r=await p.evaluate(([s,d])=>AA.scan4(s,d),[s2,dt]);r.forEach(x=>{x.sc=sc;x.sf=s2.id;x.dt=dt;ALL.push(x)})}}
  console.error(sc+' done, cards '+ALL.length)}
 const isW=t=>WORDS.some(w=>t===w||t.endsWith(': '+w)||new RegExp('(^|[,·] )'+w+'($|[,·])').test(t));const isG=t=>/: quý ta \+|bớt ghen/.test(t);
 const key=x=>(x.parent?x.parent+' › ':'')+x.name;const B={WORD:{},TOILNOTE:{},TOILMISS:{}};const add=(k,x,d)=>{const K=key(x)+(d?'  «'+d.slice(0,110)+'»':'');(B[k][K]=B[k][K]||new Set()).add(x.sc+':'+x.sf+(x.who?' '+x.who:'')+' d'+x.dt)};
 let nW=0,nG=0;
 for(const x of ALL){const R=x.rows;const G=[...(R.duoc||[]),...(R.thanh||[])];
  for(const t of G)if(isW(t))add('WORD',x,'Được/Thành: '+t);
  for(const t of [...(R.note||[]),...(R.bang||[])])if(WORDS.some(w=>t.includes(w)))nW++;
  for(const k of ['note','bang','mat','bai','kem'])for(const t of (R[k]||[]))if(isG(t))add('TOILNOTE',x,k+': '+t);
  if(G.some(isG))nG++;
  if(x.met&&!x.dis&&x.lvl===0&&Object.keys(R).length&&!G.some(isG)&&!Object.values(R).flat().some(isG))add('TOILMISS',x,Object.keys(R).join('+'))}
 const res={};for(const k in B)res[k]=Object.fromEntries(Object.entries(B[k]).map(([a,s])=>[a,[...s].slice(0,6)]));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({res,perr,n:ALL.length,wordInNote:nW,gainInDuoc:nG,all:process.env.ALL?ALL:undefined},null,1));
 const nb=k=>Object.keys(B[k]).length;console.log('cards '+ALL.length+' | WORD '+nb('WORD')+' | TOILNOTE '+nb('TOILNOTE')+' | TOILMISS '+nb('TOILMISS')+' | (word shown in Ghi chú '+nW+', verdict in Được '+nG+') | page errors '+perr.length);
 for(const k of ['WORD','TOILNOTE','TOILMISS'])for(const a of Object.keys(B[k]).sort())console.log('  '+k+': '+a+'  ['+[...B[k][a]].slice(0,2).join(', ')+']');
 await b.close();process.exit(nb('WORD')||nb('TOILNOTE')||nb('TOILMISS')||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
