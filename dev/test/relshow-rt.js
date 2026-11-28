/* relshow-rt (review/net-ghen, law 11 «shown == applied»): in a fresh life, for EVERY consort and several amounts,
   (1) the shared preview pvOan / pvQuy (jaudit §5, the one function every wired text prints) brackets what oanAdd / affAdd REALLY apply
       (the j28 nết wrappers); when she knows all of the holder's nết the preview is ONE number and must equal the applied one;
   (2) the ghen rule: ghenUp caused by another consort raises no jealousy of HER and gives oán toward that consort × BAL.oanCool.ghen.npc (promo-stack-lr4: LIVE pace-all key);
       ghenCool is the one cooling rule for an NPC holder and for her own v.pg;
   (3) the wired text builders render without an error (j78out, evidenceActs, apHostOpts, talkOpts per consort).
   usage: node dev/test/relshow-rt.js [index.html]   exit 1 on any miss */
const {chromium}=require('playwright');const path=require('path');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+path.resolve(GAME),{waitUntil:'domcontentloaded'});await p.waitForTimeout(600);await p.evaluate(()=>localStorage.clear());
 await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(600);await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>{const out={rows:[],miss:[],txt:[],ghen:[]};const num=s=>{const m=String(s).match(/([+-]\d+)(?: đến ([+-]\d+))?\s*$/);return m?[+m[1],m[2]?+m[2]:+m[1]]:null};
  const L=liveRivals(true);
  for(const v of L){for(const n of [3,8,12,25]){
    // oán: snapshot, apply, restore
    const o0=v.oan||0;const sh=num(pvOan(v,n));oanAdd(v,S,n);const got=(v.oan||0)-o0;v.oan=o0;
    const capped=o0+got>=BAL.linkRange.ro[1];const ok=sh&&(capped||(got>=sh[0]&&got<=sh[1]));out.rows.push(["oan",v.name,n,sh&&sh.join("..")||"?",got,ok?"ok":"MISS"]);if(!ok)out.miss.push(`oán ${v.name} n=${n} shown ${sh} applied ${got}`);
    const a0=v.rel||0;const sq=num(pvQuy(v,n));affAdd(v,S,n);const ga=(v.rel||0)-a0;v.rel=a0;
    const cap2=a0+ga>=BAL.linkRange.rl[1];const ok2=sq&&(cap2||(ga>=sq[0]&&ga<=sq[1]));out.rows.push(["aff",v.name,n,sq&&sq.join("..")||"?",ga,ok2?"ok":"MISS"]);if(!ok2)out.miss.push(`thiện cảm ${v.name} n=${n} shown ${sq} applied ${ga}`)}}
  // (2) ghen rule
  if(L.length>=2){const [v,w]=L;const g0=v.ghen||0,o0=oan(v,w);const d=ghenUp(v,10,"thử",w);const g1=v.ghen||0,o1=oan(v,w);
   out.ghen.push(`NPC-caused: ghen of her ${g0}→${g1} (want same), oán ${v.name}→${w.name} ${o0}→${o1} (want +${Math.round(Math.max(1,Math.round(10*BAL.oanCool.ghen.npc))*persF(v,"slight",1))})`);
   if(g1!==g0||d!==0)out.miss.push("ghenUp by an NPC still raised her ghen");if(o1-o0!==Math.round(Math.max(1,Math.round(10*BAL.oanCool.ghen.npc))*persF(v,"slight",1))&&o0+10<BAL.linkRange.ro[1])out.miss.push(`ghen→oán ${o1-o0}`);
   const h0=v.ghen||0;ghenUp(v,5,"thử",S);if((v.ghen||0)!==Math.min(100,h0+5))out.miss.push("ghenUp by her did not raise");
   const c60=ghenCool(v,60,false),s60=ghenCool(S,60,false);out.ghen.push(`ghenCool 60 → NPC ${c60} · her ${s60}`);if(!(c60<60&&s60<60))out.miss.push("ghenCool")}
  // (3) text builders
  for(const v of L.slice(0,6)){for(const [nm,f] of [["j78out",()=>["uyhiep","banphe","tieuhuy"].map(k=>j78out(k,S,v)).flat().join(" | ")],["evidenceActs",()=>JSON.stringify(evidenceActs(v)).slice(0,400)],["apHostOpts",()=>apHostOpts(v).map(o=>o.x).join(" | ")],["talkOpts",()=>talkOpts(v).map(o=>o.n+": "+(o.x||"")).join(" | ")]]){
    try{const t=f();if(/undefined|NaN/.test(t))out.miss.push(`${nm} ${v.name}: undefined/NaN`);if(v===L[0])out.txt.push(`${nm}: ${t.slice(0,300)}`)}catch(e){out.miss.push(`${nm} ${v.name}: ${e.message}`)}}}
  return out});
 const byK={};for(const x of r.rows){const k=x[0];byK[k]=byK[k]||[0,0];byK[k][x[5]==="ok"?0:1]++}
 console.log(`| kind | ok | miss |\n|---|---|---|`);for(const k in byK)console.log(`| ${k} | ${byK[k][0]} | ${byK[k][1]} |`);
 console.log(r.ghen.join("\n"));console.log(r.txt.join("\n"));if(r.miss.length)console.log("MISS:\n"+r.miss.slice(0,30).join("\n"));if(errs.length)console.log("page errors:",errs.slice(0,5));
 await b.close();const bad=r.miss.length||errs.length;console.log(bad?"FAIL":"PASS: relshow-rt");process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
