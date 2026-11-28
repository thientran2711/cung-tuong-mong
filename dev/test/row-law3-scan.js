/* ROW-LAW3-SCAN (E-GAIN4 (b)(c)(d), law 3 + VANPHONG, law 11 whole family): every act card the player sees — Hành sự deck cards, every pop-up card
   (people at home and in every place) and every row of the dialog each opens (door / tier cards) — over 3 draws (S.turn +0/+1/+2: the one-tap
   pick and the talk topics are seeded per buổi), read as the kit shows it (rows Tốn / Được / Mất / Kèm / Ghi chú, door grid Thành / Bại).
   FAIL kinds:  DASH  — a tier summary prints «—» for a locked tier (must say why, cổ trang words)          (item b)
                PLUS  — a Mất / Bại / Kèm row carries a GAIN piece (green .ef.g, or «+N» on her side)    (item c; KIT 6 exception kept: a FAILURE
                        consolation «đêm nhạt, Sủng +3» that only comes when the roll fails is allowed and listed apart as CONSOL)
                NODUOC— an enabled card / row with no Được (no gain shown) — law 3 «no option cost-only»   (item d)
   Rows: Được = .kr-duoc / .kr-thanh (+ door grid Được / Thành); loss rows = .kr-mat / .kr-bai / .kr-kem (+ grid Bại / Mất / Kèm).
   Reuses the act-audit LIB (states dau/toi/cao/con/hau/hh). No rolls are made.
   usage: node dev/test/row-law3-scan.js <url> [out.json] [WxH@dpr] [scenarios] → exit 1 on any DASH / PLUS / NODUOC or page error.
   Mutant hooks MUTANT=b (jone summary «—») / MUTANT=c (jtoil verdict back on Bại) depend on the drawn world reaching such a card; the fixed
   cases that must exit 1 under each mutant are dev/test/e-gain4-unit.js. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,OUT,SZ,SC]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.slice(src.indexOf('String.raw`')+11,src.indexOf('})();`;')+5);
const PROBE=String.raw`
AA.R3=(b)=>{const T=e=>(e&&e.textContent||"").replace(/\s+/g," ").trim();const r={name:T(b.querySelector(".kan"))||T(b).slice(0,60),dis:b.disabled||b.classList.contains("kdis"),rows:{},g:{}};
 for(const k of ["why","ton","duoc","thanh","mat","bai","kem","note"]){const e=b.querySelector(".kr-"+k+" .krv");if(!e)continue;const P=[...e.querySelectorAll(".ef,.kitem")];r.rows[k]=P.length?P.map(x=>({t:T(x),g:x.classList.contains("g"),r:x.classList.contains("r")})):[{t:T(e),g:false}]}
 b.querySelectorAll(".kgrid > .kl").forEach(l=>{const n=T(l),v=l.nextElementSibling;if(!v)return;const P=[...v.querySelectorAll(".ef")];r.g[n]=P.length?P.map(x=>({t:T(x),g:x.classList.contains("g")})):[{t:T(v),g:false}]});
 const sm=b.querySelector("p, small:not(.kb)");r.sum=sm?T(sm):"";return r};
AA.scan3=async(s,dt)=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const fresh=()=>{AA.restore();S.turn=(S.turn||0)+dt;AA.show(s)};fresh();await sl(40);
 const P=s.pop!=null&&S.visit&&S.visit.people[s.pop];const who=P?(P.name||P.kind)+"/"+P.kind:"";const top=AA.btns(s);const out=[];
 for(let j=0;j<top.length;j++){const b0=top[j];if(b0.closest(".tdseg")||b0.closest("[data-knav]"))continue;const c=AA.R3(b0);out.push(Object.assign(c,{who,lvl:0,sum:c.sum||((b0.querySelector("p")||{}).textContent||"")}));if(c.dis)continue;
  fresh();await sl(30);const b=AA.btns(s)[j];if(!b)continue;AA.force=null;const n0=Q.length;try{b.click()}catch(e){}await sl(20);try{render()}catch(e){}
  const m=document.getElementById("modal");if(m&&!m.hidden){const title=(document.getElementById("mt")||{}).innerText||"";
   for(const o of m.querySelectorAll(".opts button.ka, .opts button.opt")){const r=AA.R3(o);if(/^(✕|Thôi|Lui)/.test(r.name))continue;out.push(Object.assign(r,{who,lvl:1,parent:c.name,title:title.slice(0,80)}))}}
  AA.hide()}
 return out};`;
const isGainTxt=t=>/\+\s*\d|\+$|\+\s*\(/.test(t)&&!/(ghen|oán|nghi|giận|ghét)[^·]*\+/i.test(t);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);await p.evaluate(PROBE);
 if(process.env.MUTANT==='b')await p.evaluate(()=>{if(window.ONE)ONE.lockW=()=>"—"});
 /* E-GAIN4C: (c) is proven by a SOURCE mutant (jtoil verdict back on «risk», the pre-ACT-MOVE-6 line), no env mutant */
 const ALL=[];const DT=(process.env.DRAWS||'0,1,2').split(',').map(Number);
 for(const sc of (SC||'dau,toi,cao,con,hau,hh').split(',')){await p.evaluate(n=>AA.scen(n),sc);const SF=await p.evaluate(()=>AA.surfaces().filter(s=>s.tab==="act"));
  for(const dt of DT)for(const sf of SF){let subs=[sf];if(sf.place){const n=await p.evaluate(s=>{AA.restore();AA.show(s);return S.visit&&S.visit.people?S.visit.people.length:0},sf);subs=[];for(let i=0;i<n;i++)subs.push(Object.assign({},sf,{pop:i}))}
   else if(dt)continue;
   for(const s2 of subs){const r=await p.evaluate(([s,d])=>AA.scan3(s,d),[s2,dt]);r.forEach(x=>{x.sc=sc;x.sf=s2.id;x.dt=dt;ALL.push(x)})}}
  console.error(sc+' done, cards '+ALL.length)}
 const key=x=>(x.parent?x.parent+' › ':'')+x.name;const B={DASH:{},PLUS:{},CONSOL:{},NODUOC:{}};const add=(k,x,d)=>{const K=key(x)+(d?'  «'+d+'»':'');(B[k][K]=B[k][K]||new Set()).add(x.sc+':'+x.sf+(x.who?' '+x.who:'')+' d'+x.dt)};
 for(const x of ALL){const txt=[x.sum,...Object.values(x.rows).flat().map(y=>y.t)].join(' · ');
  const dm=/(?:^|·\s)(nhẹ|vừa|nặng):?\s*—/.exec(x.sum||'');if(dm)add('DASH',x,x.sum.slice(0,90));
  for(const [rk,lab] of [['mat','Mất'],['bai','Bại'],['kem','Kèm']])for(const y of (x.rows[rk]||[]))if(y.g||isGainTxt(y.t))add(/^(đêm nhạt|nhạt)/.test(y.t)?'CONSOL':'PLUS',x,lab+': '+y.t);
  for(const [gk,L] of Object.entries(x.g))if(/^(Bại|Mất|Kèm)$/.test(gk))for(const y of L)if(y.g||isGainTxt(y.t))add('PLUS',x,gk+': '+y.t);
  if(!x.dis){const d=[...(x.rows.duoc||[]),...(x.rows.thanh||[]),...(x.g['Được']||[]),...(x.g['Thành']||[])].filter(y=>y.t&&!y.r&&!/^(không|—|-)$/i.test(y.t));/* a Được / Thành piece drawn red (kcls: a loss) is no gain */
   const hasRows=Object.keys(x.rows).length||Object.keys(x.g).length;if(hasRows&&!d.length)add('NODUOC',x,Object.keys(x.rows).concat(Object.keys(x.g)).join('+'))}}
 const res={};for(const k in B)res[k]=Object.fromEntries(Object.entries(B[k]).map(([a,s])=>[a,[...s].slice(0,6)]));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({res,perr,n:ALL.length,all:process.env.ALL?ALL:undefined},null,1));
 const nb=k=>Object.keys(B[k]).length;console.log('cards '+ALL.length+' | DASH '+nb('DASH')+' | PLUS '+nb('PLUS')+' | NODUOC '+nb('NODUOC')+' | CONSOL (kit exception, listed) '+nb('CONSOL')+' | page errors '+perr.length);
 for(const k of ['DASH','PLUS','NODUOC','CONSOL'])for(const a of Object.keys(B[k]).sort())console.log('  '+k+': '+a+'  ['+[...B[k][a]].slice(0,2).join(', ')+']');
 await b.close();process.exit(nb('DASH')||nb('PLUS')||nb('NODUOC')||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
