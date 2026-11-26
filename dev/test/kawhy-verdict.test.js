/* KAWHY-VERDICT test (law 11, OD 26/11; MAIN 157 order): the «vì sao» of a result row matches the card's verdict.
   1 real taps: person card → «Bày mưu» → «Ra tay ngay: vu oan», the sent servant caught and confessing (the owner's card): THÀNH → no row of hers
     gives «… bị bắt, khai ra chủ» as its cause; BẠI card keeps its rows; shots Fold 755x1000 + iPad 1180x820
   2 scan: every ACT deed she can do on a consort × THÀNH / BẠI × confess roll on / off × sent / present (runAct + resultShow with the verdict):
     no reason telling a failure on THÀNH, none telling a success on BẠI (table)
   3 synthetic: kaResultRows(before,title,ok) on hand-written log lines (fail lead on THÀNH dropped, win lead on BẠI dropped, kwside clause never a
     cause, a lead with no verdict kept, a glued «(sai X đi) Danh a → b» split)
   usage: node dev/test/kawhy-verdict.test.js [index.html] [shots dir] */

const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const A=process.argv.slice(2);const jI=A.indexOf('--json');const JOUT=jI>=0?A.splice(jI,2)[1]:null;const SCAN=A.includes('--scan-only');const P=A.filter(x=>!x.startsWith('--'));
const URL='file://'+path.resolve(P[0]||'index.html');const OUT=P[1]||'/tmp/kawhy';fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,700):''))};
async function boot(b,vp,seed){const p=await b.newPage(Object.assign({viewport:vp,deviceScaleFactor:1},process.env.OBVID?{recordVideo:{dir:process.env.OBVID,size:vp}}:{}));const errs=[];p.on('pageerror',e=>errs.push(e.message));p.errs=errs;
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate((seed)=>{let s=seed*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
  localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;quiet=false;Q.length=0;try{deal()}catch(e){}render()},seed);
 await p.waitForTimeout(800);return p}
const card=p=>p.evaluate(()=>{const R=window.kaLastResult;const t=document.getElementById('rtoast');return R?{title:R.title,seal:R.seal,sen:R.sentence,rows:R.rows.map(r=>r.label+': '+r.items.join(' | ')),on:!!(t&&t.classList.contains('on'))}:null});
(async()=>{const b=await chromium.launch();const DEV=[['fold',{width:755,height:1000}],['ipad',{width:1180,height:820}]];
 const FAILR=/bị bắt|phát giác|bị lộ|không thành|chặn kịp|từ chối|thoái thác|thất bại|hỏng|khai ra/i;
const vuTap=async(p,mode,shot)=>{/* Vu oan by real taps: the person-card deed → «Bày mưu» → «Ra tay ngay: vu oan» (→ road card «Làm như thường» if any) */
  const pre=await p.evaluate((mode)=>{Q.length=0;try{closeModal()}catch(e){}window.kaLastResult=null;S.confined=0;S.bac=Math.max(S.bac,500);S.suc=Math.max(S.suc,80);S.tamco=Math.max(S.tamco||0,50);used=0;
   const v=liveRivals(false).filter(v=>!sameHouse(S,v)&&ACT.frame.ok(S,v)&&!v.confined)[0];if(!v)return null;try{const K=k61S();if(K)K[kOf61(v)]=3}catch(e){}
   if(!window.__vuR0){window.__vuR0=window.roll;window.roll=function(n){if(window.__vuMode){const st=String(new Error().stack);return window.__vuMode==='ok'?!/\b(caught|framed)\b/.test(st):true}return window.__vuR0.apply(this,arguments)}}
   window.__vuMode=mode;const pt0=ptHarmSend;window.__vuPt=pt0;ptHarmSend=()=>false;try{DQ.user=1}catch(e){}doAct(rivals.indexOf(v),'frame');showModal();return {v:v.name,id:v.id,sung:v.sung,danh:v.danh,rank:v.rank,q:Q.map(m=>m.t)}},mode);
  if(!pre)return null;const steps=[];
  for(let g=0;g<3;g++){await p.waitForTimeout(500);await p.evaluate(()=>{document.querySelectorAll('#klife').forEach(e=>{e.hidden=true;e.style.display='none'});document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove());if(Q.length&&document.getElementById('modal').hidden)showModal()});let o=p.locator('#modal:not([hidden]) .opt',{hasText:'Ra tay ngay'}).first();if(!(await o.count()))o=p.locator('#modal:not([hidden]) .opt',{hasText:'Làm như thường'}).first();if(!(await o.count()))break;steps.push((await o.innerText()).split('\n')[0].slice(0,30));await o.click({timeout:8000})}
  await p.waitForTimeout(900);await p.evaluate(()=>{document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove())});if(shot)await p.screenshot({path:shot});
  const c=await card(p);const post=await p.evaluate((id)=>{window.__vuMode=null;ptHarmSend=window.__vuPt;const v=RV(id);const lg=S.logs.slice(0,3).map(plain).join(' ‖ ');Q.length=0;try{closeModal()}catch(e){}return {sung:v.sung,danh:v.danh,rank:v.rank,confined:v.confined||0,lg}},pre.id);
  return {pre,post,steps,card:c}};

 for(const [dn,vp] of DEV)for(const m of ['ok','lo']){const p=await boot(b,vp,3);const r=await vuTap(p,m,path.join(OUT,`${dn}-vuoan-${m}.png`));const c=r&&r.card;
  ok(c&&c.on,`${dn} Vu oan via Bày mưu (${m}): the card is shown`,c);
  const conf=r&&/khai ra chủ/.test(r.post.lg);ok(m!=='ok'||conf,`${dn} ${m}: the confess roll fired (the owner's case)`,r&&r.post.lg.slice(0,300));
  const why=(c&&c.rows||[]).filter(x=>/^(Được|Mất)/.test(x)).join(' | ');
  if(m==='ok')ok(c&&/Danh \+/.test(why)&&!FAILR.test(why),`${dn} ok: «Được» rows carry no failure reason`,why);
  else ok(c&&/Mất/.test(why),`${dn} lo: «Mất» rows shown`,why);
  ok(!p.errs.length,`${dn} ${m}: no page errors`,p.errs.slice(0,3));await p.close()}
 {const p=await boot(b,{width:1180,height:820},5);
 const r=await p.evaluate(()=>{const WINR=/thành công|đắc thủ|được việc|việc thành|mưu thành|như ý|tìm thấy/i;const FAIL=/bị bắt|phát giác|bị lộ|không thành|chặn kịp|từ chối|thoái thác|thất bại|hỏng|khai ra/i;const OKW=/^(thành|tìm thấy|được)/i;
 const R0=window.roll,O0=window.stf2Ord,C0=window.caught,A0=window.aRoll;const out=[];
 function fresh(seed){let s=seed*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;quiet=false;Q.length=0;try{deal()}catch(e){}}
 const KS=Object.keys(ACT).filter(k=>!['plant','gift'].includes(k));
 for(const k of KS)for(const via of ['act','choice'])for(const far of [1,0])for(const mode of ['ok','fail'])for(const conf of [1,0]){if(!far&&conf)continue;if(via==='choice'&&!far)continue;
  try{fresh(11);const v=liveRivals(false).find(v=>!sameHouse(S,v)&&(far?!together(S,v):true));if(!v){out.push({k,skip:'no v'});continue}
   if(!far){S.place=whereOf(v);try{v.place=S.place}catch(e){} }
   if(!far&&!together(S,v)){out.push({k,far,skip:'not together'});continue}
   S.suc=90;S.bac=900;S.tamco=Math.max(S.tamco||0,80);let forced=0;if(!ACT[k].ok(S,v)){try{evA(S,v,8);S.rank=Math.max(S.rank,6);v.preg=v.preg||1;S.bac=2000}catch(e){}if(!ACT[k].ok(S,v))forced=1}/* a gated deed (pregnancy, child, pet, rank …) is still run: its sentences are what the scan reads */
   const cr=far?confessRisk(bestSent(S)):-1;window.stf2Ord=()=>'obey';window.caught=(...a)=>mode==='ok'?'':C0(...a);window.aRoll=()=>mode==='ok';window.roll=n=>conf&&n===cr;
   const bf=rsnap();const s0=S.logSeq||0;let t='';try{t=runAct(S,v,k)}finally{window.roll=R0;window.stf2Ord=O0;window.caught=C0;window.aRoll=A0}if(t)log(t);if(via==='choice')logChoice({t:'Bày mưu'},{n:'Ra tay ngay: '+String(ACT[k].n).toLowerCase()},bf,s0);/* a deed run from a dialog option (Bày mưu, event options): its lines are folded into one choice line (j3 logChoice) */
   window.kaLastResult=null;resultShow(ACT[k].n,bf,mode==='ok');const RR=window.kaLastResult;
   const why=[];if(RR)for(const row of RR.rows)for(const it of row.items){const m=it.match(/ · (.+)$/);if(m)why.push(row.label+': '+it)}
   const bad=why.filter(w=>{const rs=w.split(' · ').pop();return mode==='ok'?FAIL.test(rs):WINR.test(rs)});
   out.push({k,via,far,mode,conf,forced,seal:RR&&RR.seal,why,bad,t:t.replace(/<[^>]+>/g,'').slice(0,160)})}catch(e){out.push({k,far,mode,conf,err:String(e).slice(0,120)})}}
 return out});

  const ran=r.filter(x=>x.why);const bad=ran.filter(x=>x.bad&&x.bad.length);
  console.log('| act | via | sent | verdict | confess | reasons on the card |');console.log('|---|---|---|---|---|---|');for(const x of ran.filter(x=>x.why.length))console.log(`| ${x.k} | ${x.via} | ${x.far?'sent':'present'} | ${x.mode==='ok'?'THÀNH':'BẠI'} | ${x.conf?'yes':'no'} | ${x.why.join(' ; ')||'—'} |`);
  ok(ran.length>=450,'scan: cases run',{ran:ran.length,acts:[...new Set(ran.map(x=>x.k))].length,forced:ran.filter(x=>x.forced).length,errors:r.filter(x=>x.err).map(x=>x.k+':'+x.err).slice(0,8),skipped:r.length-ran.length});
  ok(!bad.length,'scan: no reason against the verdict',bad.slice(0,6));
  /* 3 synthetic */
  const sy=await p.evaluate(()=>{const R=[];const run=(lines,ok)=>{const bf=rsnap();S.danh=(S.danh||0)+3;for(const l of lines)log(l);const [G,B]=kaResultRows(bf,'Thử',ok);return G.concat(B).map(kaPlain).join(' | ')};
   R.push(['fail lead on THÀNH dropped',!/bị bắt/.test(run([`Người của nàng bị bắt khi đưa thư: Danh +3.`],true))]);
   R.push(['fail lead kept with no verdict',/bị bắt/.test(run([`Người của nàng bị bắt khi đưa thư: Danh +3.`],null))]);
   R.push(['win lead on BẠI dropped',!/thành công/.test(run([`Mưu kế thành công vang dội: Danh +3.`],false))]);
   R.push(['kwside clause never a cause',!/ra mặt/.test(run([`<span class="kwside">Kẻ hầu ra mặt thay chủ: Danh +3.</span>`],null))]);
   R.push(['glued (sai X đi) summary split',!/khai ra/.test(run([`Kẻ được ngươi sai đi bị bắt, khai ra chủ: X nắm thêm 1 chứng cứ. (sai người đi) Danh 8 → 11.`],null))]);
   R.push(['a real lead still given',/yến tiệc/.test(run([`Được khen ở yến tiệc: Danh +3.`],true))]);return R});
  for(const [n,v] of sy)ok(v,'synthetic: '+n);
  ok(!p.errs.length,'scan: no page errors',p.errs.slice(0,3));await p.close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`KAWHY-VERDICT FAIL ${f}/${res.length}`:`KAWHY-VERDICT PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
