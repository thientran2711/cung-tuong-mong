/* ACT-MERGE J1 (talk side) — the door engine jdoor.js on the built page.
   For every person met on Dư đồ (AA.scen dau/cao/hh/con × 4 buổi × every place, the act-audit harness):
     1 no door member is shown as a bare button when its door has ≥ 2 members (one feature = one button);
     2 every raw option is reachable: talkOpts(p)[-1-j] === the raw option j (same object identity by name + order);
     3 a door tap costs 0 khắc and opens the «door» choice card listing exactly its members (+ Thôi), each with its own line;
     4 picking a member runs it through talk(): khắc spent = the member's talkK, ONCE; the person is marked talked (S.visit.tk);
     5 a door with every member locked is locked with the first member's reason (the stranger gate: only Chào hỏi is free);
     6 kept acts (ĐỂ RIÊNG: Thỉnh an, Xin Hoàng hậu che chở, Xin son phấn, Xin ân điển, Dâng …, Đút lót lật thẻ, Hỏi sở thích, Hòa giải, Tâm sự, Hỏi chuyện,
       Giao việc phòng bị, Tiến cử, Xem người, the man's road steps, the chest acts, Thái hậu's four, the thái y's three) are still plain buttons;
     7 0 page errors.
   usage: node dev/test/act-merge-j1.test.js [url]   (default: the built index.html) — exit 1 on any failure */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');
const URL=process.argv[2]||'file://'+path.join(ROOT,'index.html');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},hasTouch:true,isMobile:true,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);
 const R={fail:[],kinds:{},doors:{},runs:0,cards:0};
 for(const sc of ['dau','cao','hh','con'])for(let bu=0;bu<4;bu++){
  const r=await p.evaluate(([sc,bu])=>{const F=[],K={},D={};let runs=0,cards=0;
   const KEEP=/^(Thỉnh an|Xin Hoàng hậu che chở|Xin son phấn|Xin ân điển|Dâng |Đút lót lật thẻ|Hỏi sở thích Hoàng thượng|Hòa giải|Tâm sự|Hỏi chuyện|Giao việc phòng bị|Tiến cử|Xem người|Chào hỏi đúng lễ|Liếc mắt|Trao khăn|Hẹn gặp riêng|Cắt đứt|Cài đồ vào rương|Lục rương|Lấy trộm son phấn|Xin Thái hậu đỡ lời|Kể tội|Xin bắt mạch|Bài thuốc dễ thụ thai|Mời làm thái y tâm phúc|Trò chuyện với cung nữ)/;
   const DFON=BAL.df.on;AA.scen(sc);for(const sf of AA.surfaces()){BAL.df.on=DFON;if(!sf.place)continue;try{AA.restore(1+bu);S.buoi=bu;used=0;AA.show(sf)}catch(e){continue}
    const ppl=curPeople();ppl.forEach((q,i)=>{const kind=q.kind+(q.ref&&q.ref.queen?"(HH)":"");let A,raw;try{A=talkOpts(q);raw=doorRaw(q)}catch(e){F.push(`${kind}: talkOpts threw ${e.message}`);return}
     K[kind]=K[kind]||{seen:0,before:0,after:0};K[kind].seen++;K[kind].before=Math.max(K[kind].before,raw.length);K[kind].after=Math.max(K[kind].after,A.length);
     /* 2 raw keys */raw.forEach((a,j)=>{const x=A[-1-j];if(!x||x.n!==a.n)F.push(`${kind}: raw key ${-1-j} is not «${a&&a.n}»`)});
     /* 1 no bare member of a ≥2 door */const cnt={};raw.forEach(a=>{const d=a&&!a.k61&&DOOR.of(a.n,q.kind);if(d)cnt[d.k]=(cnt[d.k]||0)+1});
     A.forEach(a=>{const d=a&&!a.door&&!a.k61&&DOOR.of(a.n,q.kind);if(d&&cnt[d.k]>=2)F.push(`${kind}: «${a.n}» shown bare beside door ${d.n}`)});
     /* 6 kept acts stay buttons */raw.forEach(a=>{if(a&&KEEP.test(String(a.n))&&!A.some(x=>x===a||x.n===a.n))F.push(`${kind}: kept act «${a.n}» folded`)});
     /* 5 lock */A.filter(a=>a&&a.door).forEach(d=>{const M=raw.filter(a=>a&&!a.k61&&DOOR.of(a.n,q.kind)&&DOOR.of(a.n,q.kind).k===d.door);D[d.n]=D[d.n]||{members:new Set(),kinds:new Set()};M.forEach(a=>D[d.n].members.add(String(a.n).replace(/^Bàn tán về .+$/,"Bàn tán về <người>").replace(/^Phô tài: .+$/,"Phô tài: <môn>")));D[d.n].kinds.add(kind);
      const allL=M.every(a=>a.lock);if(allL!==!!d.lock)F.push(`${kind}: door ${d.n} lock ${!!d.lock} but members all-locked ${allL}`)})});
    /* 3 + 4: open the first free door of the first person who has one, pick its first free member */
    const i=ppl.findIndex(q=>{try{return talkOpts(q).some(a=>a&&a.door&&!a.lock)}catch(e){return false}});if(i<0)continue;
    const q=ppl[i];try{if(DF.F){const o=DF.F;DF.F=null;DF.p=null;DF.tk=null;o.destroy()}}catch(e){}/* the pop-up path (BAL.df.on 0 = the old pop-up; the person view path = act-merge-j1-tap.js) */const dfOn0=BAL.df.on;BAL.df.on=0;popIdx=i;S.visit.tk={};S.visit.talked=false;Q.length=0;const A=talkOpts(q);const di=A.findIndex(a=>a&&a.door&&!a.lock);const d=A[di];
    const u0=used,b0=S.bac;talk(di);if(used!==u0)F.push(`${q.kind}: door ${d.n} spent khắc ${used-u0}`);
    const m=Q[0];if(!m||m.pid!=="door"){F.push(`${q.kind}: door ${d.n} opened no door card (Q ${Q.length} ${m&&m.pid})`);Q.length=0;continue}cards++;
    const raw=doorRaw(q);const mem=raw.map((a,j)=>[a,j]).filter(([a])=>a&&!a.k61&&DOOR.of(a.n,q.kind)&&DOOR.of(a.n,q.kind).k===d.door);
    const rows=m.opts.filter(o=>o.n!=="Thôi");if(rows.length!==mem.length||rows.some((o,k)=>o.n!==mem[k][0].n))F.push(`${q.kind}: card rows ${rows.map(o=>o.n)} ≠ members ${mem.map(x=>x[0].n)}`);
    const k=m.opts.findIndex(o=>o.n!=="Thôi"&&!o.off&&!mem[m.opts.indexOf(o)][0].open);if(k<0){Q.length=0;continue}
    const a=mem[k][0];const tc=talkK(a);const u1=used;const pre=JSON.stringify({can:can(tc),pay:canPay(a),lock:a.lock,vis:!!S.visit,q:Q.length,used});const seen=[];const dp=doorPick;doorPick=function(pp,j,n){seen.push(['dp',doorIdx(pp),j,n,popIdx]);return dp.apply(this,arguments)};const tk0=talk;talk=function(oi){seen.push(['talk',oi,Q.length,S.visit&&S.visit.talked,JSON.stringify(S.visit&&S.visit.tk)]);return tk0.apply(this,arguments)};try{chooseM(k)}catch(e){F.push(`${q.kind}: pick «${a.n}» threw ${e.message}`)}finally{doorPick=dp;talk=tk0;BAL.df.on=dfOn0}runs++;
    if(used-u1!==tc&&!(a.pk))F.push(`${q.kind}: «${a.n}» spent ${used-u1} khắc, card says ${tc} (Q ${Q.length} ${Q.map(m=>m.pid||m.t).join('/')} popIdx ${popIdx} tk ${JSON.stringify(S.visit.tk)} talked ${S.visit.talked} dead ${S.dead} p ${popIdx!=null&&curPeople()[popIdx]&&curPeople()[popIdx].kind} rawk ${JSON.stringify(mem[k][1])} now ${(talkOpts(curPeople()[popIdx])[-1-mem[k][1]]||{}).n} pre ${pre} postQ ${Q.length} seen ${JSON.stringify(seen)} log ${(S.logs||[]).slice(0,2).join('|').slice(0,200)})`);
    if(!(S.visit.tk||{})[i]&&S.visit.talked!==true&&!a.pk)F.push(`${q.kind}: «${a.n}» did not mark the person talked`);AA.hide()}
   BAL.df.on=DFON;return {F,K,D:Object.fromEntries(Object.entries(D).map(([n,x])=>[n,{members:[...x.members],kinds:[...x.kinds]}])),runs,cards}},[sc,bu]);
  R.fail.push(...r.F.map(x=>`${sc}/${bu}: ${x}`));R.runs+=r.runs;R.cards+=r.cards;
  for(const k in r.K){const x=R.kinds[k]=R.kinds[k]||{seen:0,before:0,after:0};x.seen+=r.K[k].seen;x.before=Math.max(x.before,r.K[k].before);x.after=Math.max(x.after,r.K[k].after)}
  for(const n in r.D){const x=R.doors[n]=R.doors[n]||{members:new Set(),kinds:new Set()};r.D[n].members.forEach(m=>x.members.add(m));r.D[n].kinds.forEach(m=>x.kinds.add(m))}}
 console.log("ACT-MERGE J1 on",URL);
 console.log("\nperson kind | seen | most options BEFORE (raw) | AFTER (doors)");for(const k in R.kinds)console.log(`  ${k} | ${R.kinds[k].seen} | ${R.kinds[k].before} | ${R.kinds[k].after}`);
 console.log("\ndoor | kinds | members met");for(const n in R.doors)console.log(`  ${n} | ${[...R.doors[n].kinds].join(",")} | ${[...R.doors[n].members].join(" · ")}`);
 console.log(`\ndoor cards opened ${R.cards} · members run ${R.runs} · page errors ${perr.length}`);perr.slice(0,5).forEach(e=>console.log("  perr",e));
 const uniq=[...new Set(R.fail)];console.log(`FAIL ${uniq.length}`);uniq.slice(0,40).forEach(x=>console.log("  ✗",x));
 await b.close();process.exit(uniq.length||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
