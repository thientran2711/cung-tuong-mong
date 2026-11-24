/* ORDER THIN P6 no-repeat measure (pure node, same draw rule as the engines): node dev/test/p6-measure.js [runs] [windows/kiếp] [plots/kiếp]
   6 lives × 1 kiếp; % of draws in lives 2–6 that repeat an item met in an earlier life (the shared memory keeps this life + 5 past).
   WORLD: before = the kind's own card is the only content (item = kind); after = one composed scene per window, drawn fresh-first among the seeds
   of that kind that fit (jworldc: not met this life, nrFresh over past lives, ×nr.w per past life), counted per scene id.
   ROUTES: before = pickRoute70 over the 51 hand-written routes of the method (uniform); after = old + composed, fresh-first (j70c pickRoute70).
   Seed counts are read from the built data (dev/build/jwsd.js, j70sd.js) or the writer files. */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');
const RUNS=+process.argv[2]||200,NW=+process.argv[3]||14,NP=+process.argv[4]||16,LIVES=6;
function rows(glob,ty){const d=process.env.THIN_DIR||path.join(ROOT,'dev/handover/content/thin');let L=[];
 try{for(const f of fs.readdirSync(d))if(f.startsWith(glob))L=L.concat(fs.readFileSync(path.join(d,f),'utf8').split('\n').filter(l=>l.trim().startsWith('{')).map(l=>{try{return JSON.parse(l)}catch(e){return null}}).filter(r=>r&&r.type===ty))}catch(e){}
 if(!L.length){try{const t=fs.readFileSync(path.join(ROOT,'dev/build',ty==='wc'?'jwsd.js':'j70sd.js'),'utf8');L=t.split('\n').filter(l=>l.startsWith('{')).map(l=>JSON.parse(l.replace(/,$/,'')))}catch(e){}}return L}
const W=rows('wseeds','wc'),J=rows('j70seeds','route');
const KINDS=["tang","away","tuyen","hoa","dis","dich","su","tho","sao","xa","day","lap","hau","thb","thi","vuong","ret","trung","vuco","cam","trom","phong","hon","ngoai","phat","benh","tinh"];
/* old routes per method (j70.js) */
const src=fs.readFileSync(path.join(ROOT,'dev/build/j70.js'),'utf8');const OLD={};
for(const mm of src.matchAll(/(?:^ |M70\.)([a-z0-9]+)(?::|=)\{k:"[a-z0-9]+",band:\d,n:"[^"]*",opp:\[[^\]]*\],R:\[(.*?)\]\}/gsm))OLD[mm[1]]=[...mm[2].matchAll(/\{id:"([^"]*)"/g)].map(x=>x[1]);
const METH=Object.keys(OLD);
const pick=L=>L[Math.floor(Math.random()*L.length)];
function wpick(L,w){const T=L.reduce((a,x)=>a+w(x),0);let s=Math.random()*T;for(const x of L){s-=w(x);if(s<=0)return x}return L[L.length-1]}
function sim(draw){let rep=0,n=0;for(let r=0;r<RUNS;r++){const past=[];for(let life=0;life<LIVES;life++){const now=new Set();const seenPast=k=>past.filter(s=>s.has(k)).length;
  const got=draw(now,seenPast);for(const k of got){if(life>0){n++;if(seenPast(k)>0)rep++}now.add(k)}past.unshift(now);if(past.length>LIVES-1)past.pop()}}return n?Math.round(rep*100/n):0}
const pct=(f)=>f+' %';
/* WORLD */
const byK={};for(const s of W)(byK[s.k]=byK[s.k]||[]).push(s.id);
const wBefore=sim((now)=>{const o=[];for(let i=0;i<NW;i++)o.push(pick(KINDS));return o});
const wAfter=sim((now,seenPast)=>{const o=[];for(let i=0;i<NW;i++){const k=pick(KINDS);const P=(byK[k]||[]).filter(id=>!now.has(id)&&!o.includes(id));if(!P.length){o.push(k);continue}
  const F=P.filter(id=>!seenPast(id));const L=F.length?F:P;o.push(wpick(L,id=>Math.pow(.5,seenPast(id))))}return o});
/* ROUTES */
const byM={};for(const s of J)(byM[s.m]=byM[s.m]||[]).push(s.id);
const rBefore=sim(()=>{const o=[];for(let i=0;i<NP;i++){const m=pick(METH);o.push(m+':'+pick(OLD[m]))}return o});
const rAfter=sim((now,seenPast)=>{const o=[];for(let i=0;i<NP;i++){const m=pick(METH);const R=OLD[m].concat(byM[m]||[]).map(id=>m+':'+id);const F=R.filter(k=>!seenPast(k));o.push(pick(F.length?F:R))}return o});
console.log(`P6 no-repeat measure: ${RUNS} runs × ${LIVES} lives; ${NW} world windows and ${NP} j70 plots per kiếp; seeds read: ${W.length} world (${Object.keys(byK).length} kinds), ${J.length} routes (${Object.keys(byM).length} methods); old routes ${Object.values(OLD).reduce((a,L)=>a+L.length,0)}`);
console.log(`| Pool | before | after (P6, fresh-first) |\n|---|---|---|\n| world window content (item = kind card / composed scene) | ${pct(wBefore)} | ${pct(wAfter)} |\n| j70 route (method:route) | ${pct(rBefore)} | ${pct(rAfter)} |`);
