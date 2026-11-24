/* review/titles2 — LAW 11 scan (whole family) + Part C clash scan. usage: node dev/test/titles2-scan.js <page URL> [out.md]
   Lists EVERY story line kind the game has and the title it closes with (or why none): every ARC67 key (road chapters .5–.11 by road, the road premise .4,
   side arcs), every j72 việc nhờ kind, every j70 mưu hại method (all close through exec70 / abandon70 / the accuse win / a conviction / jtruth frameExpose),
   every j71 lập công family. Clash: every new title name vs every other DH_CAT name (jdh, jkcg Khuê các, jge Thiên mệnh), j8 TITLES hiệu, ARC67 arc / chapter
   names (exact, or one name inside the other). Exit 1 when a line kind has no title or a clash is found. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUTF]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({serviceWorkers:'block'})).newPage();
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof cpKeyOf==='function'&&typeof ARC67==='object'&&typeof MF7==='object');await new Promise(r=>setTimeout(r,1500));
 const R=await p.evaluate(()=>{const T2=TITLES2,C=DH_CAT;const rows=[],miss=[];
  const roads={};for(const k in ARC67){const d=ARC67[k];const K=cpKeyOf(k);if(d.o==="rd"){(roads[d.road]=roads[d.road]||{n:[],K})}}
  for(const r in roads){const L=Object.keys(ARC67).filter(k=>ARC67[k].road===r).map(k=>ARC67[k].rn).sort((a,b)=>a-b);const K=cpKeyOf(r);
   rows.push(["road",r,`.4 + ${L.length} chapters (.${L[0]}–.${L[L.length-1]})`,K?`${C[K[0]+"_t"].n} / ${C[K[0]+"_a"].n}`:"—"]);if(!K)miss.push("road "+r)}
  for(const k in ARC67){const d=ARC67[k];if(d.o==="rd")continue;if(typeof ROAD14==="object"&&ROAD14[k])continue;const K=cpKeyOf(k);
   rows.push(["arc",k,`o:${d.o} «${d.t||""}»`,K?`${C[K[0]+"_t"].n} / ${C[K[0]+"_a"].n}`:"— (no title)"]);if(!K)miss.push("arc "+k)}
  for(const k in KIND72){const ok=C[`vn_${k}_t`]&&C[`vn_${k}_a`];rows.push(["việc nhờ",k,KIND72[k],ok?`${C[`vn_${k}_t`].n} / ${C[`vn_${k}_a`].n}`:"—"]);if(!ok)miss.push("vn "+k)}
  const M=typeof M70==="object"?M70:{};for(const k in M){rows.push(["mưu hại",k,(M[k]&&M[k].n)||k,"exec70 / abandon70 / accuse / conviction / frameExpose → "+Object.keys(T2.MHT).map(x=>C[x].n).join(", ")])}
  for(const k in MF7){const ok=!!C["lc_"+k];rows.push(["lập công",k,MF7[k].t,ok?C["lc_"+k].n:"—"]);if(!ok)miss.push("lc "+k)}
  rows.push(["lập công","brb","Nhận bạc bịt miệng (thamo)",C.lc_brb.n]);
  /* clashes */
  const mine=Object.keys(C).filter(k=>/^(rp|cp|ca|vn|mh|lc)_/.test(k));const nm=s=>String(s||"").toLowerCase().normalize("NFC").trim();
  const others=Object.keys(C).filter(k=>!mine.includes(k)).map(k=>["DH_CAT "+k,C[k].n]).concat((typeof TITLES==="object"&&Array.isArray(TITLES)?TITLES:[]).map(t=>["j8 hiệu",typeof t==="string"?t:t.n||t[0]]))
   .concat(Object.keys(ARC67).map(k=>["arc "+k,ARC67[k].t]));
  /* titles (DH_CAT, j8 hiệu): exact or one inside the other; story names (arc / chapter): exact only — a road title reuses its own road words on purpose (Part B pattern) */
  const clash=[];for(const k of mine){const a=nm(C[k].n);for(const [w,o] of others){const b2=nm(o);if(!b2)continue;const arc=/^arc /.test(w);if(a===b2||(!arc&&((b2.length>4&&a.includes(b2))||(a.length>6&&b2.includes(a)))))clash.push([C[k].n,w,o])}}
  const rep=Object.keys(T2.RP).map(id=>[id,T2.RP[id][0],T2.RP[id][1]==="t"?"good":"bad"]);
  return {rows,miss,clash,rep,mine:mine.length}});
 const md=[`# TITLES2 scan (law 11 + Part C) — ${new Date().toISOString().slice(0,16)}Z`,`New title keys: ${R.mine}. Reputation: ${R.rep.filter(x=>x[2]==="good").length} good + ${R.rep.filter(x=>x[2]==="bad").length} bad.`,"",
  "| kind | key | line | title(s) good / bad |","|---|---|---|---|",...R.rows.map(r=>`| ${r.join(" | ")} |`),"",`Missing: ${R.miss.length?R.miss.join(", "):"none"}`,"",
  "## Clash scan","| new title | vs | name |","|---|---|---|",...(R.clash.length?R.clash.map(c=>`| ${c.join(" | ")} |`):["| (none) | | |"])].join("\n");
 if(OUTF)fs.writeFileSync(OUTF,md);console.log(md.split("\n").slice(0,3).join("\n"));console.log(`rows ${R.rows.length} · missing ${R.miss.length} · clashes ${R.clash.length}`);if(R.miss.length)console.log("MISSING "+R.miss.join(", "));if(R.clash.length)console.log(R.clash.map(c=>c.join(" ~ ")).join("\n"));
 await b.close();process.exit(R.miss.length||R.clash.length?1:0)})();
