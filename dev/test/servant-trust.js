/* review/servant-trust test: every act toward ANOTHER person's servant has a relationship effect (jsvt.js, BAL.svt; owner OD 24/11 ~08:12Z real,
   ~07:58Z etiquette, ~08:08Z no pre-warning). usage: python3 dev/build/assemble.py && node dev/test/servant-trust.js [index.html]
   Checks: (1) BAL.svt tables; (2) refusal odds follow lòng / Chủ tin / nết; (3) a refusal changes nothing; (4) she talks to an NPC's servant:
   the master's Chủ tin in that servant and thiện cảm toward her drop, a real secret slips (chứng cứ), no secret → no chứng cứ; (5) law 1: an NPC
   talks to HER servant → her Chủ tin + her thiện cảm toward the NPC drop, she is told AFTER; NPC ↔ NPC the same numbers; (6) bất kính: master at
   the same place and not greeted → oán; after greetName → none; covert acts skip the greeting; (7) the whole family is wired (bribeServ / threatServ /
   tmTake wrapped, j70 / j24 / j42 / jagknow / jky / jtsb / j10 friend call svTouch); (8) a low Chủ tin has a real effect (NPC returns her to Nội
   vụ phủ; bestSent skips); (9) her button «Hỏi chuyện» on another house's servant (card + staff list) runs svTalk, words only (no digit, no %);
   (10) old save without the new fields loads, 8 weeks played without a page error. */
const {chromium}=require('playwright');const path=require('path');
const GAME=process.argv[2]||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];
 page.on('pageerror',e=>errs.push(String(e.message).slice(0,160)));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|Fetch API cannot load/.test(m.text()))errs.push('console: '+m.text().slice(0,160))});
 await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await page.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await page.waitForTimeout(400);await page.evaluate(()=>localStorage.clear());
 await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(400);await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 const R=await page.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);const B=BAL.svt;const R0=Math.random;
  const B0=JSON.parse(JSON.stringify(B));const force=(rf,lk,sn)=>{B.ref.min=B.ref.max=rf?100:0;B.leak.base=lk?999:-999;B.seen.base=sn?999:-999;Math.random=()=>.01};const unforce=()=>{Object.assign(B.ref,B0.ref);Object.assign(B.leak,B0.leak);Object.assign(B.seen,B0.seen);Math.random=R0};
  const noNum=t=>!/[0-9%]/.test(String(t).replace(/<[^>]*>/g,''));
  // (1) tables
  for(const k of ['ref','seen','tin','rel','leak','greet','npc'])ok(B[k]&&typeof B[k]==='object','BAL.svt.'+k);
  for(const k of ['talk','bribe','threat','tm','plot','friend'])ok(B.tin[k]>0&&B.rel[k]>0,'tin/rel per kind: '+k);
  const V=liveRivals(true).filter(v=>v.staff&&v.staff.length);ok(V.length>=2,'two NPC households with servants ('+V.length+')');
  const v=V[0],u=V[1];const sv=v.staff[0],su=u.staff[0];if(!S.staff.length){const m=mkServ('maid');S.staff.push(m);try{OWN_C.set(m,S)}catch(e){}}const mine=S.staff[0];ok(!!mine,'she has a servant');
  // (2) refusal odds
  const s0={sid:-1,role:'maid',loyal:90,tin:80,trait:null,traits:[]};const s1=Object.assign({},s0,{loyal:10,tin:20});
  ok(svtRefO(s0)>svtRefO(s1),'loyal + trusted servant refuses more ('+svtRefO(s0)+' > '+svtRefO(s1)+')');
  ok(svtRefO(s0)<=B.ref.max&&svtRefO(s1)>=B.ref.min,'refusal odds inside [min,max]');
  // (3) refusal: nothing changes
  const knAt0=window.knAt;window.knAt=(id,kh)=>id==='me'?'home':'away'+id;/* not at the same place: no etiquette */
  let t0=tinOf(sv),a0=aff(v,S),e0=evG(S,v),o0=oan(v,S);force(1,0,0);let r=svTalk(S,sv);
  ok(tinOf(sv)===t0&&aff(v,S)===a0&&evG(S,v)===e0&&oan(v,S)===o0,'refused: no change at all');ok(/không dám/.test(r)&&noNum(r),'refusal told in words: '+r.slice(0,80));
  // (4) she talks: seen + leak
  v.ev=0;v.schemes=(v.schemes||0)+2;try{deedAdd(v,'mlbeat',u,1,'thử')}catch(e){}sv.svtL=0;sv.svtK=null;force(0,1,1);r=svTalk(S,sv);
  ok(tinOf(sv)===Math.max(0,t0-B.tin.talk),'her talk seen: '+v.name+' trusts '+sv.name+' less ('+t0+'→'+tinOf(sv)+')');
  ok(Math.round(aff(v,S))===Math.max(-100,Math.round(a0-B.rel.talk)),'… and likes her less');ok(evG(S,v)>e0,'a real secret slipped: chứng cứ +');
  ok(noNum(r.replace(/chứng cứ \+?-?\d+/gi,'')),'after-line in words (only the chứng cứ tag carries the kit number)');
  // no secret → no chứng cứ (law 6a)
  sv.svtK=null;v.affair=null;sv.svtL=v.schemes;sv.svtD=v.dw||0;const e1=evG(S,v);force(0,1,1);svTalk(S,sv);ok(evG(S,v)===e1,'no real secret → no chứng cứ');
  // once per asker / servant / kind / buổi
  const t1=tinOf(sv);force(0,1,1);svTalk(S,sv);ok(tinOf(sv)===t1,'same buổi, same servant: the effect lands once');
  // (5) law 1: an NPC talks to HER servant
  const tm=tinOf(mine),am=aff(S,v);mine.svtK=null;force(0,0,1);r=svTalk(v,mine);
  ok(tinOf(mine)===Math.max(0,tm-B.tin.talk),'NPC talks to her servant: her Chủ tin drops');ok(Math.round(aff(S,v))===Math.max(-100,Math.round(am-B.rel.talk)),'… her thiện cảm toward that NPC drops');
  ok(/bắt đầu nghi/.test(r)&&noNum(r),'she is told after, in words: '+r.slice(0,90));
  // NPC ↔ NPC
  const tu=tinOf(su),au=aff(u,v);su.svtK=null;force(0,0,1);svTalk(v,su);ok(tinOf(su)===Math.max(0,tu-B.tin.talk)&&Math.round(aff(u,v))===Math.max(-100,Math.round(au-B.rel.talk)),'NPC ↔ NPC: same effect');
  // not seen: nothing for the master
  const t2=tinOf(su);su.svtK=null;const vv=liveRivals(true).find(x=>x!==u&&x!==v);if(vv){force(0,0,0);svTalk(vv,su);ok(tinOf(su)===t2,'not seen: master knows nothing')}
  // (6) bất kính
  window.knAt=()=>'nhv';S.svtG=null;const ob=oan(v,S);sv.svtK=null;force(1,0,0);r=svTalk(S,sv);ok(oan(v,S)>ob&&/bất kính/.test(r),'master right there, not greeted → bất kính (oán '+ob+'→'+oan(v,S)+')');
  greetName(S,v);const ob2=oan(v,S);force(1,0,0);svTalk(S,sv);ok(oan(v,S)===ob2,'after greeting her: no bất kính');
  S.svtG=null;const ob3=oan(v,S);sv.svtK=null;force(0,0,1);svTouch(S,sv,'bribe');ok(oan(v,S)===ob3,'covert act (Mua chuộc) skips the greeting');
  unforce();ok(svtSeenO(S,v,'bribe')<svtSeenO(S,v,'talk'),'covert acts are seen less');
  // law 1 bất kính toward her
  S.svtG=null;const om=oan(S,v);mine.svtK=null;force(1,0,0);r=svTalk(v,mine);ok(oan(S,v)>om&&/bất kính/.test(r),'an NPC skips greeting her → her oán rises, told after');
  window.knAt=knAt0;
  // (7) whole family wired
  ok(/svTouch/.test(String(bribeServ))&&/svTouch/.test(String(threatServ))&&/svTouch/.test(String(tmTake)),'bribeServ / threatServ / tmTake reach svTouch');
  ok(/svTouch/.test(String(servMonth))||/svtMonth/.test(String(servMonth)),'servMonth wrapped (NPC talks, returns)');
  // wrapper: a bribe that lands → effect once
  const s3=u.staff[1]||su;s3.spyFor=null;s3.svtK=null;const c0=SVT.stat.touch.bribe||0;const f0=svtWrap(function(a,s){s.spyFor=key(a);return 'x'},'bribe');force(0,0,1);f0(v,s3);ok((SVT.stat.touch.bribe||0)===c0+1,'a bribe that lands calls svTouch once');
  const f1=svtWrap(function(a,s){return 'refused'},'bribe');s3.spyFor=null;s3.svtK=null;f1(v,s3);ok((SVT.stat.touch.bribe||0)===c0+1,'a refused bribe changes nothing');
  // (8) real effect
  for(const x of allServ())if(tinOf(x)<B.tin.out)x.tin=50;const p=u,low=p.staff[p.staff.length-1];low.tin=0;low.spyFor=null;const n0=p.staff.length;const oR=B.tin.outRoll,oN=B.npc.talk;B.tin.outRoll=100;B.npc.talk=0;Math.random=()=>0;svtMonth();B.tin.outRoll=oR;B.npc.talk=oN;
  for(const x of allServ())if(x!==low&&tinOf(x)<B.tin.out)x.tin=50;ok(!p.staff.includes(low)&&p.staff.length===n0-1,'NPC master returns the servant she no longer trusts to Nội vụ phủ');
  const run0=S.runner;S.runner=null;mine.tin=0;const bs=bestSent(S);ok(bs!==mine,'['+(bs&&bs.name)+' tin '+(bs&&tinOf(bs))+' n'+S.staff.length+'] her own suspected servant is not sent on secret errands (unless she names the runner herself)');mine.tin=60;S.runner=run0;
  unforce();
  // (9) her buttons
  ok(/data-sv="hoi2"/.test(staffHTML()),'staff list: «Hỏi chuyện» on another house\'s servant');
  const q0=Q.splice(0);const used0=used;const before=S.logs.length;servAct('hoi2',sv.sid);Q.push(...q0);ok(used===used0+BAL.svt.k,'«Hỏi chuyện» costs BAL.svt.k khắc (used '+used0+'→'+used+' can2 '+can(2)+' dead '+S.dead+' owner '+(ownerOf(sv)&&ownerOf(sv).name)+')');ok(S.logs.length>before,'a line is logged after');
  ok(noNum(S.logs[0].replace(/<[^>]*>/g,'').replace(/^T\d+\/\d+/,'').replace(/ — [^—]*→ ta:.*$/,'')/* the kit relation read-out (after the act) */.replace(/chứng cứ \+?-?\d+/gi,'')),'her log line has no number / %: '+S.logs[0].replace(/<[^>]*>/g,'').slice(0,300));
  // (10) old save
  const d=JSON.parse(JSON.stringify(ser()));delete d.svtG;quiet=true;deser(d);quiet=false;ok(!!S&&typeof svTalk==='function','old save without svtG loads');
  for(let i=0;i<8;i++){try{endTurn()}catch(e){ok(false,'endTurn '+i+': '+e.message);break}}ok(true,'8 weeks played');
  return out});
 let f=0;for(const [c,m] of R){if(!c){f++;console.log('FAIL',m)}}
 if(errs.length){f++;console.log('FAIL page errors',errs.slice(0,5))}
 console.log(`${R.length+1-f}/${R.length+1} ok`);console.log(f?'FAIL':'PASS: servant-trust');await b.close();process.exit(f?1:0)})();
