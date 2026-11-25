/* live-servants.test (brief live-servants; owner OD 18/11 ~19:30Z = OD L1901 points 2 + 3). Seeded bot lives (same harness as ag2perf-*).
   T1 NPC mistresses pick their entourage (two-way, owner OD 18/11 ~19:45Z (4)): every consort / Hoàng hậu / Thái hậu sent out takes exactly her
      day's pick (S.entN, made once at her first outing by her own reasons) ∩ who is free; at least one when anyone is free; the pick holds for a
      second outing the same day; the reason says she chose ("… chọn … theo hầu").
   T2 close-one-busy: her close maid busy (a deed) → she keeps her deed, the pick names "không rảnh"; free → the close maid goes.
   T3 THE PLAYER'S PICKER: her first departure from her palace opens ONE card (kit option rows): every one of her people listed, the absent /
      asleep / busy greyed with the reason (kitOff) and not pickable; "Lên đường" greyed until someone is picked; after a pick the followers = the
      picked ∩ free, the others keep their own day ("ở lại trông cung"); "Đi một mình" = nobody follows; the card does not come back that day
      (no adding once out); followers walking with her are her party (not shadows).
   T6 WITNESSES + GOSSIP: a thing that happens at a place is known only by the servants standing there (her companions), not by those at home; servants
      who meet in a talking act pass it on (hop + 1, "from" = the teller); an NPC mistress's companions see her day, her people at home do not.
   T7 REST RHYTHM: per servant and day one rest turn (BAL.slv.rest), bedtime from BAL.slv.sleepFrom (+ sleepJit), exactly BAL.slv.night watcher(s)
      per household rotating day by day, last night's watcher sleeps in; the record shows "nghỉ theo lượt" and "ngủ" rows with their reasons.
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
   for(let k=0;k<4&&!S.dead;k++){try{j95sync(false,true)}catch(e){}if(i%2===0&&(k===0||k===2)){try{save()}catch(e){}out.push((window.slotGet?slotGet("hclh-save-v2-4"):localStorage.getItem("hclh-save-v2-4")))}const kh=j95kh();try{spend(1)}catch(e){}if(j95kh()===kh)break}
   try{nextBuoi()}catch(e){}Q.length=0;return out},i);saves.push(...sv.filter(Boolean))}
 const r=await p.evaluate(()=>{const bad=[],note=[];const R=S.roster;if(!R)return{bad:["no record"]};
  const busy=x=>j95sBusy(x);
  const oidOf=o=>o===S?"me":o==="th"?"th":"v"+o.id;
  const house=(o,ppl)=>ppl.filter(q=>(q.kind==="mm"||q.kind==="st")&&q.ref===o||o==="th"&&q.kind==="el"&&q.ref&&!q.ref.eid&&q.home==="tn").map(q=>q.id);
  /* send mistress o to place k for the whole buổi, re-run the pass from khắc 0, return {n,free,mem,rows} */
  const trial=(o,k,pre)=>{const oid=oidOf(o);const op=R.P[oid];if(!op)return null;const keep=op.map(x=>x.slice());const ppl=j95ppl(R);const H=house(o,ppl);const save={};for(const id of H)save[id]=R.P[id].map(x=>x.slice());
   for(let i=0;i<4;i++)op[i]=[k,"walk",null,"thử: đi ra ngoài"];if(pre)pre(H);J95S.last=null;j95sPass(R,0,ppl);
   const fol=H.filter(id=>{const x=R.P[id][0];return x&&x[1]==="follow"&&x[2]===oid});const freeNot=H.filter(id=>!fol.includes(id)&&!busy(R.P[id][0]));
   const res={n:fol.length,free:fol.length+freeNot.length,H,fol,rows:H.map(id=>[id,R.P[id][0].slice()])};
   for(let i=0;i<4;i++)op[i]=keep[i];for(const id of H)R.P[id]=save[id];J95S.last=null;return res};
  /* T1: NPC picks */
  const M=liveRivals(true).filter(v=>v.alive&&!v.out);if(!S.thDead)M.push("th");let t1=0;const dist={};
  for(const o of M){const oid=oidOf(o);const t=trial(o,"dtd");if(!t||!t.H.length)continue;t1++;const P=S.entN&&S.entN.P[oid];
   if(!P){if(t.fol.length)bad.push(`T1 ${o.name||o}: followers without a stored pick`);dist["none free"]=(dist["none free"]||0)+1;continue}
   const want=t.H.filter(id=>P.ids.includes(id)&&!busy(t.rows.find(r=>r[0]===id)[1])||t.fol.includes(id));
   for(const id of t.fol)if(!P.ids.includes(id))bad.push(`T1 ${o.name||o}: ${id} follows but was not picked`);
   for(const id of P.ids)if(!t.fol.includes(id)){const x=t.rows.find(r=>r[0]===id)[1];if(x[1]==="stay")bad.push(`T1 ${o.name||o}: picked ${id} free but stays`)}
   for(const [id,x] of t.rows)if(x[1]==="follow"&&!/chọn .*theo hầu/.test(x[3]))bad.push("T1 reason: "+x[3]);
   const t2=trial(o,"vuon");if(t2&&JSON.stringify(t2.fol.slice().sort())!==JSON.stringify(t.fol.slice().sort())&&t2.free===t.free)bad.push(`T1 ${o.name||o}: second outing changed the pick ${t.fol} → ${t2.fol}`);
   dist[t.fol.length+"/"+t.H.length]=(dist[t.fol.length+"/"+t.H.length]||0)+1}
  note.push(`T1 NPC trials ${t1}, followers/household ${JSON.stringify(dist)}`);
  /* T2: a consort with a close maid and at least one servant */
  const v=liveRivals(true).filter(x=>x.alive&&!x.out&&x.maid&&(x.staff||[]).length>=1).sort((a,b)=>(b.staff||[]).length-(a.staff||[]).length)[0];
  if(v){const mm="mm:"+v.id;/* jtc (review/thancan, owner OD 20/11 ~15:55Z): the close one is the maid her master CHOSE; this test makes the personal maid her thân cận */v.thc="m:"+v.maid.name;delete S.entN.P["v"+v.id];const t=trial(v,"dtd",H=>{if(R.P[mm])for(let i=0;i<4;i++)R.P[mm][i]=["tyv","ag_thu",null,"việc riêng của nàng"]});
   if(!t)bad.push("T2 no trial");else{if(t.fol.includes(mm))bad.push("T2 busy close maid still follows");const fb=t.rows.filter(([id,x])=>x[1]==="follow");
    if(t.free>0&&!fb.length)bad.push("T2 nobody follows when the close maid is busy");for(const [id,x] of fb)if(!/cung nữ thân cận .*không rảnh/.test(x[3]))bad.push("T2 fallback reason: "+x[3]);
    const rm=t.rows.find(([id])=>id===mm);if(rm&&rm[1][1]!=="ag_thu")bad.push("T2 the busy close maid lost her deed: "+rm[1][1])}
   delete S.entN.P["v"+v.id];const t2=trial(v,"dtd",H=>{if(R.P[mm])for(let i=0;i<4;i++)R.P[mm][i]=[palaceOf(v),"serve","v"+v.id,"hầu chủ"]});
   if(t2){const rm=t2.rows.find(([id])=>id===mm);/* her own day may have her asleep / on her rest turn / out at khắc 0 (j95s rows replace the forced one): then she is not free */
    if(rm&&rm[1][1]!=="follow"&&!["sleep","shift","nightw","errand","visit"].includes(rm[1][1])&&!/^ag_/.test(rm[1][1]))bad.push("T2 free close maid does not go first: "+rm[1].join(" | "));if(rm&&rm[1][1]!=="follow")note.push("T2b close maid not free in her own day: "+rm[1][1])}}
  else note.push("T2 skipped: no consort with a close maid + servants");
  /* T3: the player's picker (3 servants + close maid) */
  S.rank=Math.max(S.rank,5);/* jtc: the close one = her chosen thân cận (none at the start of a life); the test makes her personal maid it */S.thc="m:"+S.maid.name;S.staff=S.staff||[];while(S.staff.length<3)S.staff.push(mkServ(S.staff.length%2?"eunuch":"maid"));try{j95sync(false,false)}catch(e){}
  {const kh=j95kh();const ids=["mm:me"].concat(S.staff.map(s=>"s"+s.sid));const keep={};for(const id of ids)if(R.P[id])keep[id]=R.P[id].map(x=>x.slice());
   const opm=R.P.me.map(x=>x.slice());const pl0=S.place;S.place="home";for(let i=0;i<4;i++)R.P.me[i]=["home","rest",null,"ở cung"];
   /* her people: the close maid free, s0 free, s1 out on an errand, s2 asleep */
   const st=S.staff.map(s=>"s"+s.sid);R.P["mm:me"][kh]=["home","serve","me","hầu"];R.P[st[0]][kh]=["home","clean","me","quét"];R.P[st[1]][kh]=["tyv","errand",null,"đi lấy thuốc"];R.P[st[2]][kh]=["home","sleep",null,"ngủ"];
   delete S.ent;Q.length=0;const need=j95sEntNeed("vuon");if(!need)bad.push("T3 first departure does not ask");
   const asked=j95sEntAsk("vuon");const m=Q[0];
   if(!asked||!m||!m.entp)bad.push("T3 no picker card");else{const O=m.opts;const byId=id=>O.find(c=>c.entId===id);
    for(const id of ids)if(!byId(id))bad.push("T3 picker misses "+id);
    if(byId(st[1])&&!byId(st[1]).off)bad.push("T3 the absent one is pickable");if(byId(st[2])&&!byId(st[2]).off)bad.push("T3 the sleeping one is pickable");
    if(byId(st[1])&&!/Thái y viện/.test(byId(st[1]).off.why))bad.push("T3 grey reason: "+JSON.stringify(byId(st[1]).off));
    if(byId(st[0]).off||byId("mm:me").off)bad.push("T3 a free one is greyed");if(!byId("mm:me").sel)bad.push("T3 close maid not preselected");
    /* pick: close maid off, s0 on, and try the greyed s1 (refused by the card) */
    byId("mm:me").sel=false;byId(st[0]).sel=true;byId(st[1]).sel=true;j95sEntX(O);const g=O.find(c=>c.entGo);if(g.off)bad.push("T3 Lên đường greyed with a pick");
    byId(st[0]).sel=false;byId(st[1]).sel=true;j95sEntX(O);if(!g.off)bad.push("T3 Lên đường open with only a greyed pick");byId(st[0]).sel=true;j95sEntX(O);
    Q.length=0;const go=g.go;const g0=goTo;goTo=k=>{S.place=k};try{go()}finally{goTo=g0}/* the walk itself is goTo's (gates, khắc); here: the day's pick is stored */
    if(!S.ent||S.ent.d!==j95sDay())bad.push("T3 no day pick stored: "+JSON.stringify(S.ent));else{if(S.ent.ids.includes(st[1]))bad.push("T3 greyed one stored");if(!S.ent.ids.includes(st[0])||S.ent.ids.includes("mm:me"))bad.push("T3 stored pick "+S.ent.ids)}
    S.ent=S.ent||{d:j95sDay(),ids:[st[0]],at:"vuon"};Q.length=0;S.place="home";if(j95sEntNeed("vuon"))bad.push("T3 the picker comes back the same day");
    /* followers = picked ∩ free */
    const tp=trial(S,"vuon",H=>{R.P[st[1]][0]=["tyv","errand",null,"đi lấy thuốc"];R.P[st[2]][0]=["home","sleep",null,"ngủ"];R.P["mm:me"][0]=["home","serve","me","hầu"];R.P[st[0]][0]=["home","clean","me","quét"]});
    if(tp){for(const id of tp.fol)if(!S.ent.ids.includes(id))bad.push("T3 unpicked "+id+" follows");for(const id of S.ent.ids)if(!tp.fol.includes(id)&&tp.rows.find(r=>r[0]===id)[1][1]==="stay")bad.push("T3 picked "+id+" free but stays");
     const mmRow=tp.rows.find(r=>r[0]==="mm:me");if(mmRow&&mmRow[1][1]==="follow")bad.push("T3 unpicked close maid follows");
     if(mmRow&&!/ở lại trông cung|quét|hầu|nghỉ|ăn|dùng/.test(mmRow[1][3]))note.push("T3 close maid left behind: "+mmRow[1].join(" | "))}
    /* walking alone */
    S.ent={d:j95sDay(),ids:[],at:"vuon"};const ta=trial(S,"vuon");if(ta&&ta.fol.length)bad.push("T3 'Đi một mình' still has followers "+ta.fol);
    S.ent={d:j95sDay(),ids:[st[0]],at:"vuon"};
    /* the real goTo opens the card on a new day (S.ent of yesterday) */
    S.ent={d:j95sDay()-1,ids:[],at:"vuon"};Q.length=0;S.place="home";try{goTo("vuon")}catch(e){}if(!(Q[0]&&Q[0].entp)&&S.place==="home")note.push("T3 goTo: no card (gate / khắc)");else if(Q[0]&&Q[0].entp&&S.place!=="home")bad.push("T3 she left before choosing");
    Q.length=0;S.ent={d:j95sDay(),ids:[st[0]],at:"vuon"}}
   /* party: a follower walking with her at her place is not a shadow */
   {const op=R.P.me,pl=S.place;const ppl=j95ppl(R);const H=house(S,ppl);const save={};for(const id of H)save[id]=R.P[id].map(x=>x.slice());
    S.place="vuon";for(let i=0;i<4;i++)op[i]=["vuon","here",null,"thử"];J95S.last=null;j95sPass(R,0,ppl);const f=H.find(id=>R.P[id][kh][1]==="follow");
    if(!f)note.push("T3 party: nobody followed (pick busy)");if(f&&!j95party(f,"vuon"))bad.push("T3 follower not in her party");if(f&&j95vis(f,"vuon"))bad.push("T3 follower counted as a shadow");for(const id of H)R.P[id]=save[id]}
   S.place=pl0;for(let i=0;i<4;i++)R.P.me[i]=opm[i];for(const id in keep)R.P[id]=keep[id];J95S.last=null}
  /* T6: witnesses + gossip */
  {const kh=j95kh();const st=S.staff.map(s=>"s"+s.sid);const keep={};for(const id of ["me","mm:me"].concat(st))keep[id]=R.P[id].map(x=>x.slice());
   R.P.me[kh]=["vuon","here",null,"thử"];R.P[st[0]][kh]=["vuon","follow","me","theo hầu"];R.P["mm:me"][kh]=["home","stay","me","ở lại trông cung"];R.P[st[1]][kh]=["home","eat",null,"ăn"];
   const n=knwSee("vuon",kh,"Thử Nhân đang thử","v0","t6");const Z=S.knw;const iid=Object.keys(Z.I).pop();
   if(!n||!Z.K[st[0]]||!Z.K[st[0]][iid]||Z.K[st[0]][iid][0]!=="saw")bad.push("T6 the companion did not see it");
   if(Z.K["mm:me"]&&Z.K["mm:me"][iid])bad.push("T6 the maid at home saw it");if(!Z.K.me||!Z.K.me[iid])bad.push("T6 she herself (there) not marked as knowing");
   /* back home: the companion and the close maid eat together → the close maid hears it (p forced to 100 for the test) */
   R.P[st[0]][kh]=["home","eat",null,"ăn"];R.P["mm:me"][kh]=["home","eat",null,"ăn"];const p0=BAL.slv.gos.p;BAL.slv.gos.p=1000;Z.gk=null;const g=knwGossip();BAL.slv.gos.p=p0;
   const h=Z.K["mm:me"]&&Z.K["mm:me"][iid];if(!h||h[0]==="saw"||!(h[1]>=1))bad.push("T6 gossip did not pass from the companion: "+JSON.stringify(h)+" g="+g);
   /* NPC side: her companion sees her deed, her people at home do not */
   const v2=liveRivals(true).find(x=>x.alive&&!x.out&&x.maid&&(x.staff||[]).length);if(v2){const a="mm:"+v2.id,b2="s"+v2.staff[0].sid;const ka=R.P[a].map(x=>x.slice()),kb=R.P[b2].map(x=>x.slice()),kv=R.P["v"+v2.id].map(x=>x.slice());
    R.P["v"+v2.id][kh]=["tyv","here",null,"thử"];R.P[a][kh]=["tyv","follow","v"+v2.id,"theo hầu"];R.P[b2][kh]=[palaceOf(v2),"clean","v"+v2.id,"quét"];knwSee("tyv",kh,`${v2.name} thử`,"v"+v2.id,"t6b");const i2=Object.keys(Z.I).pop();
    if(!(Z.K[a]&&Z.K[a][i2]))bad.push("T6 NPC companion did not see her day");if(Z.K[b2]&&Z.K[b2][i2])bad.push("T6 NPC servant at home saw her day");
    R.P[a]=ka;R.P[b2]=kb;R.P["v"+v2.id]=kv}
   for(const id in keep)R.P[id]=keep[id];note.push(`T6 knowledge items ${Object.keys(Z.I).length}, knowers ${Object.keys(Z.K).length}`)}
  /* T7: rest rhythm */
  {const B=BAL.slv;const ppl=j95ppl(R);const Hs=new Map();for(const q of ppl){if(q.kind!=="mm"&&q.kind!=="st")continue;const o=q.ref;if(!o)continue;if(!Hs.has(o))Hs.set(o,[]);Hs.get(o).push(q)}let nh=0;
   for(const [o,hh] of Hs){const Y=hh.map((q,ix)=>j95sRhythm({id:q.id},ix,hh.length));nh++;const w=Y.filter(y=>y.watch).length;if(w!==Math.min(B.night,hh.length))bad.push(`T7 household of ${o.name||"ngươi"}: ${w} watchers`);
    if(hh.length>B.night&&Y.filter(y=>y.slept).length!==B.night)bad.push(`T7 household of ${o.name||"ngươi"}: last night's watcher not sleeping in`);
    for(const y of Y){if(!(B.rest.buoi[y.c]>0))bad.push("T7 rest turn in a slot with weight 0");if(y.len<B.rest.len[0]||y.len>B.rest.len[1])bad.push("T7 rest length "+y.len);if(y.sl<B.sleepFrom||y.sl>B.sleepFrom+B.sleepJit)bad.push("T7 bedtime "+y.sl)}}
   const acts=new Set();for(const key in (S.rlog||{e:{}}).e){const E=S.rlog.e[key];E.ids.forEach((id,i)=>{if(!/^s\d+$|^mm:/.test(id))return;const s=E.s[i];for(let kk=0;kk<s.length/8;kk++)acts.add(E.D.A[parseInt(s.slice(kk*8+2,kk*8+4),36)])})}
   for(const a of [ACT95.sleep,ACT95.shift])if(!acts.has(a))bad.push("T7 no '"+a+"' row in the log ("+[...acts].join(",")+")");note.push(`T7 households ${nh}`)}
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
 const last=path.join(TMP,`s${seed}-last.json`);const se=await p.evaluate(()=>{try{quiet=false;localStorage.setItem(SK(SLOT),JSON.stringify(ser()));return""}catch(e){return String(e&&e.message||e)}});if(se)fails.push(`life ${seed}: last save failed: ${se}`);fs.writeFileSync(last,await p.evaluate(()=>(window.slotGet?slotGet("hclh-save-v2-4"):localStorage.getItem("hclh-save-v2-4"))));
 const w=cp.spawnSync('node',[ROSTER,last,'--who','cung nữ của ta'],{encoding:'utf8'});
 if(w.status!==0||!/now: .+, khắc \d of buổi .+ \(week \d+\), doing .+, because .+/.test(w.stdout)||!/timeline/.test(w.stdout))fails.push(`life ${seed}: --who "cung nữ của ta" answer: ${w.stdout.slice(0,300)} ${w.stderr.slice(0,200)}`);
 const wj=cp.spawnSync('node',[ROSTER,last,'--who','mm:me','--json','--all'],{encoding:'utf8'});let J=null;try{J=JSON.parse(wj.stdout)}catch(e){}
 if(!J||!J.length||!J[0].now||!J[0].now.why||!(J[0].timeline||[]).length)fails.push(`life ${seed}: --who mm:me --json: ${wj.stdout.slice(0,200)}`);
 const wm=cp.spawnSync('node',[ROSTER,last,'--who','me','--json'],{encoding:'utf8'});let JM=null;try{JM=JSON.parse(wm.stdout)}catch(e){}
 if(!JM||!JM[0]||!/^picked |^went alone/.test(JM[0].entourage||''))fails.push(`life ${seed}: --who me: no entourage line: ${JSON.stringify(JM&&JM[0]&&JM[0].entourage)} ent=${await p.evaluate(()=>JSON.stringify([S.ent,wk()]))} save=${(()=>{try{const d=JSON.parse(fs.readFileSync(last,"utf8"));return JSON.stringify([d.S.ent,d.S.turn,d.S.tuan])}catch(e){return e.message}})()}`);
 const ws=cp.spawnSync('node',[ROSTER,last,'--who','người hầu của ta','--json'],{encoding:'utf8'});let JS=null;try{JS=JSON.parse(ws.stdout)}catch(e){}
 if(!JS||!JS.some(o=>(o.knows||[]).length))fails.push(`life ${seed}: --who người hầu của ta: nobody knows anything (T6 items)`);
 if(!JS||!JS.some(o=>(o.rhythm||[]).length))notes.push(`life ${seed}: no rest/sleep row today yet for her people`);
 if(seed===1){const t=cp.spawnSync('node',[ROSTER,last,'--who','người hầu của ta'],{encoding:'utf8'}).stdout.split('\n').filter(l=>/rest \/ sleep|knows|saw it|heard from|entourage/.test(l)).slice(0,6);notes.push("who extras:\n"+t.join('\n'))}
 if(seed===1)notes.push("who sample:\n"+w.stdout.split('\n').slice(0,6).join('\n'));
 await p.close()}
await b.close();fs.rmSync(TMP,{recursive:true,force:true});
for(const n of notes)console.log(n);for(const f of fails)console.log("FAIL "+f);console.log(fails.length?"FAIL":"PASS");process.exit(fails.length?1:0)})();
