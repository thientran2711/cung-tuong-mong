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
  const B0=JSON.parse(JSON.stringify(B));const eyes0=window.eyes,tell0=window.npcTell,net0=window.netIs;
  /* fix r1: «seen» = a real witness only (svtSeen); forcing it = her informants (eyes) at a sure roll; not seen = no witness of any kind */
  const force=(rf,lk,sn,g)=>{B.npcGreet.min=B.npcGreet.max=g?100:0/* d-followups-1: an NPC greets first only when asked (g) */;B.ref.min=B.ref.max=rf?100:0;B.leak.base=lk?999:-999;for(const k of ['near','eyeB','talk','tell'])B.seen[k]=sn?999:-999;window.eyes=sn?()=>5:()=>0;Math.random=()=>.01};
  const unforce=()=>{Object.assign(B.npcGreet,B0.npcGreet);Object.assign(B.ref,B0.ref);Object.assign(B.leak,B0.leak);Object.assign(B.seen,B0.seen);window.eyes=eyes0;window.npcTell=tell0;window.netIs=net0;Math.random=R0};
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
  // (5b) fix r1 law 6: the WITNESS rule — no witness → never known; each real source alone → known, and the line names the «kẻ»
  window.knAt=(id)=>'p_'+id;unforce();window.eyes=()=>0;window.netIs=()=>false;Math.random=()=>0;const tw=tinOf(su),aw=aff(u,v);let nw=0;
  for(let i=0;i<20;i++){su.svtK=null;svTouch(v,su,'talk');if(tinOf(su)!==tw)nw++}ok(nw===0&&Math.round(aff(u,v))===Math.round(aw),'no witness (not there, no eyes, no talkative servant, nobody tells) → never known, even at the luckiest roll ('+nw+'/20)');
  const h0=Object.assign({},SVT.stat.how||{});const hw=k=>((SVT.stat.how||{})[k]||0)-(h0[k]||0);
  window.knAt=()=>'same';su.svtK=null;svTouch(v,su,'talk');ok(hw('near')===1,'source 1: the master stands right there → known');window.knAt=(id)=>'p_'+id;
  window.eyes=()=>3;su.svtK=null;svTouch(v,su,'talk');ok(hw('eyes')===1,'source 2: her informants (eyes) → known');window.eyes=()=>0;
  if(u.staff.length<2){const x=mkServ('maid');u.staff.push(x);try{OWN_C.set(x,u)}catch(e){}}window.netIs=(x,k)=>k==='talk'&&x!==su;su.svtK=null;svTouch(v,su,'talk');ok(hw('talk')===1,'source 3: a talkative servant of her household → known');window.netIs=()=>false;
  const wv=liveRivals(true).find(x=>x!==v&&x!==u);window.npcTell=(about,o)=>o&&o.to===S&&about===v?{who:wv,to:S,why:'x'}:null;mine.svtK=null;r=svTouch(v,mine,'talk');ok(hw('tell')===1&&r.includes(wv.name),'source 4: a witness who chooses to tell her — the line names her: '+r.slice(0,90));
  unforce();
  // (5c) fix r1 law 11 + law 1: servant ↔ servant ACROSS houses (jagstaff peers, her cung-nữ road) — the greeting, both masters may come to know
  ok(/svtPeer/.test(String(AS_DO.chat))&&/svtPeer/.test(String(AS_DO.gift))&&/svtPeer/.test(String(AS_DO.ask)),'NPC servants\' Đồng liêu chat / gift / ask reach svtPeer');
  ok([...document.scripts].some(s=>/k==="chat"[^\n]*svtPeer\(S,s,"chat",ok\)[^\n]*\n[^\n]*k==="gift"[^\n]*svtPeer/.test(s.textContent)),'her cung-nữ road srvStaffAct reaches svtPeer');
  window.knAt=(id)=>'p_'+id;force(0,0,1);sv.svtK=null;su.svtK=null;const p1=tinOf(sv),p2=tinOf(su),p3=aff(v,u),p4=aff(v,su),p5=aff(u,v);svtPeer(su,sv,'chat',true);
  ok(tinOf(sv)===Math.max(0,p1-B.tin.chat)&&tinOf(su)===Math.max(0,p2-B.tin.chat),'a cross-house chat seen: both masters trust their servant less ('+p1+'→'+tinOf(sv)+', '+p2+'→'+tinOf(su)+')');
  ok(Math.round(aff(v,u))===Math.max(-100,Math.round(p3-B.rel.chat))&&Math.round(aff(v,su))<Math.round(p4),'… and the master likes the other house + its servant less');
  sv.svtK=null;const p6=tinOf(sv);svtPeer(su,sv,'chat',false);ok(tinOf(sv)===p6,'the colleague turned her cold (no engagement) → no trust effect');
  sv.svtK=null;const p7=tinOf(sv);AS_DO.gift(su,u,{t:sv},true);ok(tinOf(sv)===Math.max(0,p7-B.tin.gift),'jagstaff «Biếu quà» on another house\'s servant: her master may come to know');
  window.knAt=()=>'same';S.svtG=null;const o7=oan(v,su);force(0,0,0);svtPeer(su,sv,'gift',false);ok(oan(v,su)>o7,'a servant who skips greeting the master standing there → bất kính (oán '+o7+'→'+oan(v,su)+')');
  // d-followups-1 item 2 (law 1): an NPC servant greets the other master first (its nết, inside its own tick: svtPeer) → no bất kính; skips → bất kính (the ONE svtEtq)
  S.svtG=null;const o8=oan(v,su);force(0,0,0,1);svtPeer(su,sv,'gift',false);ok(oan(v,su)===o8&&svtGreeted(su,v),'an NPC servant who greets the master standing there first → no bất kính (odds by nết, e.g. '+svtNpcGreetO(su)+')');
  S.svtG=null;force(0,0,0,0);const o9=oan(v,su),k9=SVT.stat.npcSkip||0;svtPeer(su,sv,'gift',false);ok(oan(v,su)>o9&&(SVT.stat.npcSkip||0)>k9,'… one who skips it → bất kính, the same rule as hers');
  S.svtG=null;force(0,0,0,0);AS_DO.greet(su,u,{t:v},true);const o10=oan(v,su);svtPeer(su,sv,'gift',false);ok(svtGreeted(su,v)&&oan(v,su)===o10,'jagstaff «greet» (the mirror of her «Hành lễ thỉnh an») is the greeting of this buổi');
  ok(B0.npcGreet&&B0.npcGreet.min<B0.npcGreet.max&&B0.npcGreet.base>B0.npcGreet.min,'NPC greeting odds from BAL.svt.npcGreet (law 4)');
  // d-followups-1 item 4 (law 7 wording): the after-line names the one who CAME, never «ngươi / X tìm gặp Y» when Y came to X
  window.knAt=(id)=>'p_'+id;force(0,0,1);mine.svtK=null;su.svtK=null;const rA=svtPeer(su,mine,'chat',true);
  ok(new RegExp(su.name+'[^.]*bắt chuyện với '+mine.name).test(rA)&&new RegExp(su.name+' tìm gặp '+mine.name).test(rA)&&!new RegExp(mine.name+'[^.;]*tìm gặp '+su.name).test(rA),'another house\'s servant came to HER servant: both lines say '+su.name+' came: '+rA.replace(/<[^>]*>/g,'').slice(0,260));
  mine.svtK=null;sv.svtK=null;const rB=svtPeer(mine,sv,'chat',true);
  ok(new RegExp(mine.name+'[^.]*tìm gặp '+sv.name).test(rB)&&new RegExp(mine.name+' lén sang bắt chuyện với '+sv.name).test(rB)&&!new RegExp(sv.name+'[^.]*bắt chuyện với '+mine.name).test(rB),'HER servant went to another house: both lines say '+mine.name+' went: '+rB.replace(/<[^>]*>/g,'').slice(0,260));
  {const fr=sv;fr.svtK=null;const r3=svTouch(S,fr,'friend',undefined,fr);ok(!/ngươi tìm gặp/.test(r3)&&(!r3||new RegExp(fr.name+' tìm gặp ngươi').test(r3)),'a friend of another house came to HER (j42 srvFriendTip): «'+fr.name+' tìm gặp ngươi», never «ngươi tìm gặp»: '+r3.replace(/<[^>]*>/g,'').slice(0,160))}
  unforce();window.knAt=knAt0;
  // bất kính size (fix r1 trim): one ungreeted talk with a higher master's servant stays inside the single-slight band
  ok(Math.round(B.greet.oan*B.greet.up*2.1)<=BAL.svt.greet.oan*3,'bất kính worst case ≈ '+Math.round(B.greet.oan*B.greet.up*2.1)+' oán (was 25)');
  // (6) bất kính
  window.knAt=()=>'nhv';S.svtG=null;const ob=oan(v,S);sv.svtK=null;force(1,0,0);r=svTalk(S,sv);ok(oan(v,S)>ob&&/bất kính/.test(r),'master right there, not greeted → bất kính (oán '+ob+'→'+oan(v,S)+')');
  greetName(S,v);const ob2=oan(v,S);force(1,0,0);svTalk(S,sv);ok(oan(v,S)===ob2,'after greeting her: no bất kính');
  S.svtG=null;sv.svtK=null;{const h=topicOpts(v).find(a=>a.n==='Hỏi han sức khỏe');if(h&&h.run)h.run();else chatMark(v)}const obT=oan(v,S);force(1,0,0);svTalk(S,sv);ok(svtGreeted(S,v)&&oan(v,S)===obT,'review r2: she talked with the master first this buổi («Hỏi han sức khỏe») → greeted, no bất kính (OD ~07:58Z)');
  S.svtG=null;const ob3=oan(v,S);sv.svtK=null;force(0,0,1);svTouch(S,sv,'bribe');ok(oan(v,S)===ob3,'covert act (Mua chuộc) skips the greeting');
  unforce();window.eyes=()=>3;ok(svtSeenO(S,v,'bribe')<svtSeenO(S,v,'talk'),'covert acts are seen less ('+svtSeenO(S,v,'bribe')+' < '+svtSeenO(S,v,'talk')+')');window.eyes=eyes0;
  // law 1 bất kính toward her
  S.svtG=null;const om=oan(S,v);mine.svtK=null;force(1,0,0);r=svTalk(v,mine);ok(oan(S,v)>om&&/bất kính/.test(r),'an NPC skips greeting her → her oán rises, told after');
  S.svtG=null;mine.svtK=null;force(1,0,0,1);const om2=oan(S,v);r=svTalk(v,mine);ok(oan(S,v)===om2&&!/bất kính/.test(r)&&svtGreeted(v,S),'d-followups-1: an NPC mistress who greets her first (greetName) → no bất kính, like her own greeting');
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
  // (11) fix r1 her cung-nữ road (law 1 two-way): she greets / is seen like anyone; NPCs and their servants «Hỏi chuyện» HER
  Q.length=0;srvInit();Q.length=0;const M=srvM();ok(isSrv()&&!!M,'cung-nữ life');const x=allServ().find(y=>ownerOf(y)&&ownerOf(y)!==M&&!sameHouse(ownerOf(y),M));ok(!!x,'a colleague of another house');
  if(x){const O=ownerOf(x);S.srv.af[x.sid]=60;
   window.knAt=()=>'same';S.svtG=null;const oa=oan(O,S);force(0,0,0);srvStaffAct('gift',x);ok(oan(O,S)>oa&&/bất kính/.test(S.logs[0]||''),'cung nữ gives to another house\'s maid with that master right there, ungreeted → bất kính: '+(S.logs[0]||'').replace(/<[^>]*>/g,'').slice(0,120));
   {S.svtG=null;x.svtK=null;let g=null;try{g=srvTalk({sk:O.queen?'hh':'rv',ref:{id:O.id}}).find(a=>a.n==='Hành lễ thỉnh an')}catch(e){}const u0=used,b0=S.bac;if(g)g.run();S.bac=Math.max(S.bac||0,999);const ob=oan(O,S),nl=(S.logs||[]).length;force(0,0,0);const did=srvStaffAct('gift',x);
    ok(!!g&&did&&(S.logs||[]).length>nl&&svtGreeted(S,O)&&oan(O,S)===ob&&!/bất kính/.test(S.logs[0]||''),'d-followups-1: cung nữ greets that master first («Hành lễ thỉnh an») → no bất kính (the same greeting as an NPC servant\'s): '+(S.logs[0]||'').replace(/<[^>]*>/g,'').slice(0,100));used=u0;S.bac=b0/* the next checks keep their khắc and bạc */}
   window.knAt=(id)=>'p_'+id;force(0,0,1);x.svtK=null;S.svtK=null;const tx=tinOf(x),ts=S.tin;srvStaffAct('chat',x);ok(tinOf(x)<tx&&S.tin<ts,'her chat seen: the colleague\'s master AND her own master trust less ('+tx+'→'+tinOf(x)+', Chủ tin '+ts+'→'+S.tin+')');
   ok(noNum((S.logs[0]||'').replace(/<[^>]*>/g,'').replace(/^T\d+\/\d+/,'').replace(/ — [^—]*→ ta:.*$/,'')),'her log line in words: '+(S.logs[0]||'').replace(/<[^>]*>/g,'').slice(0,160));
   const asker=(O.staff||[]).find(y=>y!==x)||x;const d=mkP('svtAsk',{s:asker.sid});ok(!!d&&d.o.length===2&&!d.o.some(o=>/[0-9%]/.test(o.n+o.x)),'«Hỏi chuyện» reaches HER: one kit dilemma, two options in words');
   if(d){asker.svtK=null;S.svtK=null;const t1=S.tin,i1=(S.srv.intel||[]).length;force(0,0,1);d.o[0].go();ok(S.tin<t1&&(S.srv.intel||[]).length===i1+1,'she talks: she learns news; her master may come to know → Chủ tin '+t1+'→'+S.tin);
    S.svtK=null;const t2=S.tin;d.o[1].go();ok(S.tin===t2,'she refuses → nothing changes')}
   unforce();Q.length=0;const pt0=window.pickTarget;const oT=B.npc.talk;B.npc.talk=100;window.pickTarget=()=>M;Math.random=()=>0;try{svtMonth()}finally{B.npc.talk=oT;window.pickTarget=pt0;Math.random=R0}
   ok(Q.some(q=>q&&q.pid==='svtAsk'),'svtMonth: an NPC (or her servant) goes for HER on the cung-nữ road ('+Q.length+' queued)');Q.length=0}
  window.knAt=knAt0;unforce();
  return out});
 let f=0;for(const [c,m] of R){if(process.env.V)console.log(c?'ok  ':'FAIL',m);else if(!c){f++;console.log('FAIL',m)}if(!c&&process.env.V)f++}
 if(errs.length){f++;console.log('FAIL page errors',errs.slice(0,5))}
 console.log(`${R.length+1-f}/${R.length+1} ok`);console.log(f?'FAIL':'PASS: servant-trust');await b.close();process.exit(f?1:0)})();
