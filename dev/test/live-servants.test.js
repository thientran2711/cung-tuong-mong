/* live-servants.test (brief live-servants; owner OD 18/11 ~19:30Z = OD L1901 points 2 + 3). Seeded bot lives (same harness as ag2perf-*).
   T1 retinue size by rank: every mistress (consorts, Hoàng hậu, Thái hậu, the player) sent to Dưỡng Hòa điện (occ 1) and Ngự hoa viên takes
      exactly min(free people, ceil(BAL.slv.ret[rank] × BAL.slv.occ[place])) — never more than the rank allows, never all when more are free.
   T2 close-one-busy fallback: her close maid busy (a deed) → she stays on her deed, others go, reason "cung nữ thân cận … bận …, nên … chọn …";
      close maid free → she goes ("cung nữ thân cận theo hầu").
   T3 the player's maids live by the SAME rule (two-way): at home her close maid's day has several kinds of khắc; when she goes out, a retinue by
      her rank follows, the others stay ("ở lại trông cung"), followers walking with her are her party (not shadows); close maid busy → fallback.
   T4 no filler reason ("", "phận sự trong cung", "phận sự") anywhere in the record of these buổi (current + log), any NPC.
   T5 dev/tools/roster.js on saves of 3 lives × several khắc: self-check exit 0; --who "cung nữ của ta" answers now/khắc/buổi/doing/because +
      a timeline; --who mm:me --json parses.
   usage: python3 dev/build/assemble.py && node dev/test/live-servants.test.js dev/index.html [lives=3]   → PASS / FAIL (exit 0 / 1) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process'),os=require('os');
const [,,F,L0]=process.argv;const LIVES=+L0||3;const ROSTER=path.join(__dirname,'..','tools','roster.js');
const TMP=fs.mkdtempSync(path.join(os.tmpdir(),'ls-test-'));
(async()=>{const b=await chromium.launch();const fails=[];const notes=[];
for(let seed=1;seed<=LIVES;seed++){const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
 await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},seed);
 await p.goto('file://'+path.resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
  window.render=render=function(){};window.showModal=showModal=function(){};});
 const saves=[];
 /* play a few buổi; save at khắc 1 and 3 of some of them (T5 self-check on real saves) */
 for(let i=0;i<6;i++){const sv=await p.evaluate(i=>{const out=[];Q.length=0;S.mg=0;try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}
   for(let k=0;k<4&&!S.dead;k++){try{j95sync(false,true)}catch(e){}if(i%2===0&&(k===0||k===2)){try{save()}catch(e){}out.push(localStorage.getItem("hclh-save-v2-4"))}const kh=j95kh();try{spend(1)}catch(e){}if(j95kh()===kh)break}
   try{nextBuoi()}catch(e){}Q.length=0;return out},i);saves.push(...sv.filter(Boolean))}
 const r=await p.evaluate(()=>{const bad=[],note=[];const R=S.roster;if(!R)return{bad:["no record"]};
  const occ=k=>{const O=BAL.slv.occ;return O[k]!=null?O[k]:O._};
  const busy=x=>j95sBusy(x);
  const oidOf=o=>o===S?"me":o==="th"?"th":"v"+o.id;
  const rk=o=>o==="th"?"th":(o===S?S.rank:(o.queen?7:o.rank));
  const max=o=>o==="th"?BAL.slv.retTh:BAL.slv.ret[Math.max(0,Math.min(7,rk(o)))];
  const house=(o,ppl)=>ppl.filter(q=>(q.kind==="mm"||q.kind==="st")&&q.ref===o||o==="th"&&q.kind==="el"&&q.ref&&!q.ref.eid&&q.home==="tn").map(q=>q.id);
  /* send mistress o to place k for the whole buổi, re-run the pass from khắc 0, return {n,free,mem,rows} */
  const trial=(o,k,pre)=>{const oid=oidOf(o);const op=R.P[oid];if(!op)return null;const keep=op.map(x=>x.slice());const ppl=j95ppl(R);const H=house(o,ppl);const save={};for(const id of H)save[id]=R.P[id].map(x=>x.slice());
   for(let i=0;i<4;i++)op[i]=[k,"walk",null,"thử: đi ra ngoài"];if(pre)pre(H);J95S.last=null;j95sPass(R,0,ppl);
   const fol=H.filter(id=>{const x=R.P[id][0];return x&&x[1]==="follow"&&x[2]===oid});const freeNot=H.filter(id=>!fol.includes(id)&&!busy(R.P[id][0]));
   const res={n:fol.length,free:fol.length+freeNot.length,H,fol,rows:H.map(id=>[id,R.P[id][0].slice()])};
   for(let i=0;i<4;i++)op[i]=keep[i];for(const id of H)R.P[id]=save[id];J95S.last=null;return res};
  /* T1 */
  const M=[S].concat(liveRivals(true).filter(v=>v.alive&&!v.out));if(!S.thDead)M.push("th");let t1=0;
  for(const o of M){for(const k of ["dtd","vuon"]){const t=trial(o,k);if(!t||!t.H.length)continue;t1++;const want=Math.min(t.free,Math.max(1,Math.ceil(max(o)*occ(k))));
    if(t.n!==want)bad.push(`T1 ${o==="th"?"Thái hậu":o.name} rank ${rk(o)} → ${k}: ${t.n} followers, want ${want} (free ${t.free}, household ${t.H.length})`);
    if(t.n>max(o))bad.push(`T1 over the rank: ${o.name||o} ${t.n} > ${max(o)}`)}}
  note.push(`T1 trials ${t1}`);
  /* T2: a consort with a close maid and at least one servant */
  const v=liveRivals(true).filter(x=>x.alive&&!x.out&&x.maid&&(x.staff||[]).length>=1).sort((a,b)=>(b.staff||[]).length-(a.staff||[]).length)[0];
  if(v){const mm="mm:"+v.id;const t=trial(v,"dtd",H=>{if(R.P[mm])for(let i=0;i<4;i++)R.P[mm][i]=["tyv","ag_thu",null,"việc riêng của nàng"]});
   if(!t)bad.push("T2 no trial");else{if(t.fol.includes(mm))bad.push("T2 busy close maid still follows");const fb=t.rows.filter(([id,x])=>x[1]==="follow");
    if(t.free>0&&!fb.length)bad.push("T2 nobody follows when the close maid is busy");for(const [id,x] of fb)if(!/cung nữ thân cận .*bận.*nên .* chọn .* theo hầu/.test(x[3]))bad.push("T2 fallback reason: "+x[3]);
    const rm=t.rows.find(([id])=>id===mm);if(rm&&rm[1][1]!=="ag_thu")bad.push("T2 the busy close maid lost her deed: "+rm[1][1])}
   const t2=trial(v,"dtd",H=>{if(R.P[mm])for(let i=0;i<4;i++)R.P[mm][i]=[palaceOf(v),"serve","v"+v.id,"hầu chủ"]});
   if(t2){const rm=t2.rows.find(([id])=>id===mm);if(!rm||rm[1][1]!=="follow"||!/cung nữ thân cận theo hầu/.test(rm[1][3]))bad.push("T2 free close maid does not go first: "+(rm?rm[1].join(" | "):"none"))}}
  else note.push("T2 skipped: no consort with a close maid + servants");
  /* T3: the player at Quý phi with 3 servants */
  S.rank=Math.max(S.rank,5);S.staff=S.staff||[];while(S.staff.length<3)S.staff.push(mkServ(S.staff.length%2?"eunuch":"maid"));try{j95sync(false,false)}catch(e){}
  const tp=trial(S,"vuon");if(!tp||!tp.H.length)bad.push("T3 no household for the player");else{const want=Math.min(tp.free,Math.max(1,Math.ceil(max(S)*occ("vuon"))));
   if(tp.n!==want)bad.push(`T3 player retinue ${tp.n}, want ${want}`);if(tp.n>=tp.H.length)bad.push("T3 the whole household follows her");
   for(const [id,x] of tp.rows)if(x[1]!=="follow"&&(!x[3]||/^phận sự/.test(x[3])||x[1]==="follow"))bad.push("T3 one left behind has no own reason: "+id+" "+x.join(" | "))}
  const tb=trial(S,"vuon",H=>{for(let i=0;i<4;i++)R.P["mm:me"][i]=["ksp","ag_thu",null,"việc riêng"]});
  if(tb){if(tb.fol.includes("mm:me"))bad.push("T3 busy close maid follows the player");if(tb.free>0&&!tb.rows.some(([id,x])=>x[1]==="follow"&&/cung nữ thân cận .*bận/.test(x[3])))bad.push("T3 no fallback for the player")}
  /* T3 party: a follower walking with her at her place is not a shadow */
  {const op=R.P.me,kh=j95kh(),keep=op.map(x=>x.slice()),pl=S.place;const ppl=j95ppl(R);const H=house(S,ppl);const save={};for(const id of H)save[id]=R.P[id].map(x=>x.slice());
   S.place="vuon";for(let i=0;i<4;i++)op[i]=["vuon","here",null,"thử"];J95S.last=null;j95sPass(R,0,ppl);const f=H.find(id=>R.P[id][kh][1]==="follow");
   if(f&&!j95party(f,"vuon"))bad.push("T3 follower not in her party");if(f&&j95vis(f,"vuon"))bad.push("T3 follower counted as a shadow");S.place=pl;for(let i=0;i<4;i++)op[i]=keep[i];for(const id of H)R.P[id]=save[id];J95S.last=null}
  /* T4: no filler reason, current record + log */
  const FILL=new Set(["","phận sự trong cung","phận sự"]);let nf=0,nr=0;const ex=[];
  for(const id in R.P){if(id==="me")continue;for(const x of R.P[id]){if(!x||!x[0]||x[0]==="ngoai")continue;nr++;if(FILL.has(String(x[3]||"").trim())){nf++;if(ex.length<4)ex.push(id+": "+x.join(" | "))}}}
  for(const key in (S.rlog||{e:{}}).e){const E=S.rlog.e[key];E.ids.forEach((id,i)=>{if(id==="me")return;const s=E.s[i];for(let kk=0;kk<s.length/8;kk++){const q=s.slice(kk*8,kk*8+8);const g=j=>parseInt(q.slice(j*2,j*2+2),36);const P=E.D.P[g(0)],W=E.D.W[g(3)];if(!P||P==="ngoai")continue;nr++;if(FILL.has(String(W||"").trim())){nf++;if(ex.length<4)ex.push(key+" "+id+": "+P+" | "+E.D.A[g(1)]+" | "+W)}}})}
  if(nf)bad.push(`T4 ${nf} filler reasons of ${nr} rows: ${ex.join(" ; ")}`);note.push(`T4 rows ${nr}`);
  /* T3 home day: the close maid's own day over this buổi + the log has several kinds of khắc */
  const acts=new Set();for(const key in (S.rlog||{e:{}}).e){const E=S.rlog.e[key];const i=E.ids.indexOf("mm:me");if(i<0)continue;const s=E.s[i];for(let kk=0;kk<s.length/8;kk++)acts.add(E.D.A[parseInt(s.slice(kk*8+2,kk*8+4),36)])}
  if(acts.size<3)bad.push("T3 her close maid's day has "+acts.size+" kinds of khắc: "+[...acts].join(", "));note.push("T3 close maid acts: "+[...acts].join(", "));
  return{bad,note,errs:(window.__j95s&&__j95s().errs)||[]}});
 for(const x of r.bad||[])fails.push(`life ${seed}: ${x}`);for(const x of r.errs||[])fails.push(`life ${seed}: j95s error ${x}`);notes.push(`life ${seed}: ${(r.note||[]).join(" · ")}`);
 for(const e of errs.slice(0,3))fails.push(`life ${seed}: page error ${e}`);
 /* T5 */
 saves.forEach((sv,i)=>{const f=path.join(TMP,`s${seed}-${i}.json`);fs.writeFileSync(f,sv);const x=cp.spawnSync('node',[ROSTER,f],{encoding:'utf8'});if(x.status!==0)fails.push(`life ${seed} save ${i}: roster.js exit ${x.status}: ${(x.stdout||'').split('\n').filter(l=>/LỖI| - /.test(l)).slice(0,4).join(' / ')}${x.stderr?' '+x.stderr.slice(0,200):''}`)});
 notes.push(`life ${seed}: roster.js self-check on ${saves.length} saves`);
 const last=path.join(TMP,`s${seed}-last.json`);await p.evaluate(()=>{try{save()}catch(e){}});fs.writeFileSync(last,await p.evaluate(()=>localStorage.getItem("hclh-save-v2-4")));
 const w=cp.spawnSync('node',[ROSTER,last,'--who','cung nữ của ta'],{encoding:'utf8'});
 if(w.status!==0||!/now: .+, khắc \d of buổi .+ \(week \d+\), doing .+, because .+/.test(w.stdout)||!/timeline/.test(w.stdout))fails.push(`life ${seed}: --who "cung nữ của ta" answer: ${w.stdout.slice(0,300)} ${w.stderr.slice(0,200)}`);
 const wj=cp.spawnSync('node',[ROSTER,last,'--who','mm:me','--json','--all'],{encoding:'utf8'});let J=null;try{J=JSON.parse(wj.stdout)}catch(e){}
 if(!J||!J.length||!J[0].now||!J[0].now.why||!(J[0].timeline||[]).length)fails.push(`life ${seed}: --who mm:me --json: ${wj.stdout.slice(0,200)}`);
 if(seed===1)notes.push("who sample:\n"+w.stdout.split('\n').slice(0,6).join('\n'));
 await p.close()}
await b.close();fs.rmSync(TMP,{recursive:true,force:true});
for(const n of notes)console.log(n);for(const f of fails)console.log("FAIL "+f);console.log(fails.length?"FAIL":"PASS");process.exit(fails.length?1:0)})();
