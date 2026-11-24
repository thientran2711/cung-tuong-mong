/* review/titles2 — LAW 11 scan (whole family) + Part C clash scan. usage: node dev/test/titles2-scan.js <page URL> [out.md]
   FIX r1 (E58, E56r FAIL 1–5): lists EVERY line the game can close and the title it gives:
   - every main-road CHAPTER (every rdDef .5–.11 of every road + the road's premise arc .4): its own good / bad key cp_<road>_<n>_t|a + names;
   - every side arc (ARC67 o:* / st / tm / eg): ca_<arc>_t|a;
   - every j72 việc nhờ CHAIN template (T72I, T7 id): vn_<tid>_t|a;
   - every j70 mưu hại method (M70) → its method group → target / schemer names (a poison word only in the poison group), + the method-free exposer / cleared / warner;
   - every j71 lập công family, and every option of it (static read of dev/build/j71.js): good merit (bonusDo7 / cpm7) · bad way (cpm7 "<fam>_a" / hush money) ·
     decline (BAL.cv.rest) · plain (a lighter good deed, no title; listed in PLAIN below with the reason);
   - every how text of the family (no digits / %, no «lần chương», «… một lần» only after a verb phrase).
   Clash: every new title name vs every other DH_CAT name (jdh, jkcg Khuê các, jge Thiên mệnh), j8 TITLES hiệu, ARC67 arc / chapter names (exact, or one name inside the
   other for titles; exact for story names), and every new name vs every other new name (exact). Exit 1 when a line has no title, a clash, a duplicate or a bad how text. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUTF]=process.argv;
/* lập công options that give no title on purpose (a lighter good deed, neither the merit nor a bad way); every other option must be good / bad / decline */
const PLAIN={"thbenh:Hỏi thăm cho phải phép":"a courtesy visit, no merit and no harm","conbenh:Giao cho nhũ mẫu":"the usual palace care of a child (cost: the child's fondness)",
 "tomuu:Giữ chứng cứ, chờ thời":"she keeps the proof for later (no deed yet)","tamtang:Dâng tơ lụa của cung mình":"a gift to the rite, not the rite itself",
 "tamtang:Theo hầu hái dâu, cho tằm ăn":"follows the rite in the back row (no merit recorded)","soke:(Tâu Thái hậu / Hoàng thượng cho người soát)":"hands the audit to others",
"cuuhoang:Hô thị vệ, sai người chạy gọi":"calls the guards: a quick good act, no merit recorded (no bonus7)",
 "thbenh:Tìm thuốc quý dâng bà":"a lighter good deed, no merit recorded (no bonus7)","thbenh:Chép kinh cầu an":"a lighter good deed, no merit recorded (no bonus7)",
 "chepkinh:Chép một quyển":"one volume only: a lighter good deed, no merit recorded","hoahoan:Mở kho cung mình giúp người bị nạn":"a lighter good deed (silver), no merit recorded",
 "dichbenh:Bỏ bạc mua thuốc":"a lighter good deed (silver), no merit recorded"};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({serviceWorkers:'block'})).newPage();
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof cpKeyOf==='function'&&typeof ARC67==='object'&&typeof MF7==='object');await new Promise(r=>setTimeout(r,1500));
 const R=await p.evaluate(()=>{const T2=TITLES2,C=DH_CAT;const rows=[],miss=[],hows=[];const pair=K=>K&&C[K+"_t"]&&C[K+"_a"]?`${C[K+"_t"].n} / ${C[K+"_a"].n}`:null;
  const addHow=k=>{try{hows.push([k,C[k].how(1),C[k].how(3)])}catch(e){hows.push([k,"ERR "+e.message,""])}};
  /* main roads: every chapter + the premise */
  const roads={};for(const k in ARC67){const d=ARC67[k];if(d.o==="rd")(roads[d.road]=roads[d.road]||[]).push(k)}
  for(const r in roads){for(const k of [r].concat(roads[r].sort((a,b)=>ARC67[a].rn-ARC67[b].rn))){const K=cpKeyOf(k),n=k===r?4:ARC67[k].rn,P=K?pair(K[0]):null;
   rows.push(["chapter",`${r}.${n}`,`«${String(ARC67[k].t||"").replace(/\|/g,"/")}»`,K?K[0]+"_t|a":"—",P||"— (no title)"]);if(!P)miss.push("chapter "+k);else{addHow(K[0]+"_t");addHow(K[0]+"_a")}}}
  for(const k in ARC67){const d=ARC67[k];if(d.o==="rd"||(typeof ROAD14==="object"&&ROAD14[k]))continue;const K=cpKeyOf(k),P=K?pair(K[0]):null;
   rows.push(["arc",k,`o:${d.o} «${d.t||""}»`,K?K[0]+"_t|a":"—",P||"— (no title)"]);if(!P)miss.push("arc "+k);else{addHow(K[0]+"_t");addHow(K[0]+"_a")}}
  for(const t in T72I){const K="vn_"+t,P=pair(K);rows.push(["việc nhờ",t,`${KIND72[T72I[t].kind]||T72I[t].kind} · «${typeof T72I[t].t==="string"?T72I[t].t:"(lời người nhờ)"}»`,K+"_t|a",P||"—"]);if(!P)miss.push("vn "+t);else{addHow(K+"_t");addHow(K+"_a")}}
  const M=typeof M70==="object"?M70:{};for(const m in M){const g=T2.MG70[m];const ks=g?["thoat","lo","nap"].map(r=>`mh_${g}_${r}`):[];const ok=g&&ks.every(k=>C[k]);
   const poison=ok&&g!=="doc"&&ks.some(k=>/độc/.test(C[k].n+" "+C[k].how(1)));rows.push(["mưu hại",m,`${(M[m]&&M[m].n)||m} → group ${g||"—"}`,ks.join(" / ")||"—",ok?ks.map(k=>C[k].n).join(" · "):"—"]);
   if(!ok)miss.push("mh "+m);if(poison)miss.push("mh poison word outside the poison group: "+m)}
  for(const k of Object.keys(T2.MHT))addHow(k);for(const k of ["mh_vach","mh_minh","mh_bao"])rows.push(["mưu hại","(any)",k==="mh_vach"?"the exposer":k==="mh_minh"?"framed, the framer convicted later":"her warning to the target",k,C[k]?C[k].n:"—"]);
  for(const k in MF7){const ok=!!C["lc_"+k];rows.push(["lập công",k,MF7[k].t,"lc_"+k,ok?C["lc_"+k].n:"—"]);if(!ok)miss.push("lc "+k);else addHow("lc_"+k)}
  for(const k in T2.LCA){const key=k==="thamo"?"lc_brb":`lc_${k}_a`;rows.push(["lập công (bad way)",k,`«${T2.LCA[k][0]}»`,key,C[key]?C[key].n:"—"]);if(!C[key])miss.push("lc bad "+k);else addHow(key)}
  /* clashes */
  const mine=Object.keys(C).filter(k=>/^(rp|cp|ca|vn|mh|lc)_/.test(k));const nm=s=>String(s||"").toLowerCase().normalize("NFC").trim();
  const others=Object.keys(C).filter(k=>!mine.includes(k)).map(k=>["DH_CAT "+k,C[k].n]).concat((typeof TITLES==="object"&&Array.isArray(TITLES)?TITLES:[]).map(t=>["j8 hiệu",typeof t==="string"?t:t.n||t[0]]))
   .concat(Object.keys(ARC67).map(k=>["arc "+k,ARC67[k].t]));
  /* titles (DH_CAT, j8 hiệu): exact or one inside the other; story names (arc / chapter): exact only — a title reuses its own chapter words on purpose (Part B pattern) */
  const clash=[];for(const k of mine){const a=nm(C[k].n);for(const [w,o] of others){const b2=nm(o);if(!b2)continue;const arc=/^arc /.test(w);if(a===b2||(!arc&&((b2.length>4&&a.includes(b2))||(a.length>6&&b2.includes(a)))))clash.push([C[k].n,w,o])}}
  const seen={},dup=[];for(const k of mine){const a=nm(C[k].n);if(seen[a])dup.push([C[k].n,k,seen[a]]);else seen[a]=k}
  const long=mine.filter(k=>C[k].n.trim().split(/\s+/).length>4).map(k=>k+" «"+C[k].n+"»");
  const badHow=hows.filter(([k,a,b])=>/[0-9%]|ERR|lần chương|chương đường|\(mưu hại\)|«[^»]*» (một|hai|ba) lần|Lập công «|undefined|\{/.test(a+" "+b)).map(x=>x.join(" ⟶ "));
  const rep=Object.keys(T2.RP).map(id=>[id,T2.RP[id][1]==="t"?"good":"bad"]);
  return {rows,miss,clash,dup,long,badHow,hows:hows.length,rep,mine:mine.length,old:mine.filter(k=>C[k].old).length}});
 /* lập công options (static: dev/build/j71.js; every CH7 of every MF family) */
 const src=fs.readFileSync(__dirname+'/../build/j71.js','utf8');const fams=[...src.matchAll(/^MF\("(\w+)"/gm)].map(m=>[m[1],m.index]);const opt=[];
 fams.forEach(([f,i],j)=>{const end=j+1<fams.length?fams[j+1][1]:src.indexOf("\nfunction",i+10);const blk=src.slice(i,end>i?end:i+20000);
  for(const m of blk.matchAll(/CH7\(([`"])(.*?)\1|CH7\((S\.thDead\?[^,]*),/g)){const name=m[2]||"(Tâu Thái hậu / Hoàng thượng cho người soát)";const at=m.index+m[0].length;let d=0,k=blk.indexOf("{",at),e=k;for(;e<blk.length;e++){if(blk[e]==="{")d++;else if(blk[e]==="}"){d--;if(!d)break}}
   const s=blk.slice(k,e+1);const cls=/cpm7\("\w+_a"\)|brb=/.test(s)?"bad way → bad title":/bonus7\(|cpm7\("\w+"\)/.test(s)?"merit → good title":/BAL\.cv\.rest/.test(s)?"decline (title-free)":PLAIN[`${f}:${name}`]?"plain: "+PLAIN[`${f}:${name}`]:"UNCLASSIFIED";
   opt.push([f,name.replace(/\$\{[^}]*\}/g,"‹…›"),cls]);if(cls==="UNCLASSIFIED")R.miss.push(`lc option ${f}: ${name}`)}});
 const md=[`# TITLES2 scan (law 11 + Part C) — ${new Date().toISOString().slice(0,16)}Z`,`New title keys: ${R.mine} (${R.old} kept for old saves only, never given now). Reputation: ${R.rep.filter(x=>x[1]==="good").length} good + ${R.rep.filter(x=>x[1]==="bad").length} bad. How texts checked: ${R.hows}.`,"",
  "| kind | line | its words | key | title good / bad |","|---|---|---|---|---|",...R.rows.map(r=>`| ${r.join(" | ")} |`),"",
  "## j71 lập công — every option","| family | option | class |","|---|---|---|",...opt.map(r=>`| ${r.join(" | ")} |`),"",
  `Missing: ${R.miss.length?R.miss.join(", "):"none"}`,`Duplicates (new vs new): ${R.dup.length?R.dup.map(d=>d.join(" ~ ")).join(", "):"none"}`,`Over 4 words: ${R.long.length?R.long.join(", "):"none"}`,`Bad how texts: ${R.badHow.length?R.badHow.join(" ; "):"none"}`,"",
  "## Clash scan","| new title | vs | name |","|---|---|---|",...(R.clash.length?R.clash.map(c=>`| ${c.join(" | ")} |`):["| (none) | | |"])].join("\n");
 if(OUTF)fs.writeFileSync(OUTF,md);console.log(md.split("\n").slice(0,3).join("\n"));
 const fail=R.miss.length+R.clash.length+R.dup.length+R.long.length+R.badHow.length;
 console.log(`rows ${R.rows.length} · lc options ${opt.length} · missing ${R.miss.length} · clashes ${R.clash.length} · dups ${R.dup.length} · long ${R.long.length} · bad how ${R.badHow.length}`);
 for(const x of [R.miss,R.clash.map(c=>c.join(" ~ ")),R.dup.map(c=>c.join(" ~ ")),R.long,R.badHow])if(x.length)console.log(x.slice(0,30).join("\n"));
 await b.close();process.exit(fail?1:0)})();
