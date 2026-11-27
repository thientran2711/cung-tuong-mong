/* CAL-P2C — identity offset + rolling hand b (owner OD 20/11 ~07:35Z + ~07:55Z + ~08:00Z; jmgid.js). node dev/test/cal-p2c.js [index.html] [old-build.html]
   1 BAL: BAL.orig.id knobs; BAL.orig.doan never names an art of that identity's own BAL.orig.art row (every origin × road + "")
   2 classes: sở trường = an art of her identity row, sở đoản = BAL.orig.doan, else bình thường (player and NPC read the same table)
   3 hand b: never played = prior 7.5 (any player); the owner's device seeds her Thử tay first tries (cal.k b × n rounds); noSeed kinds start from the prior
   4 offset = target − b: owner examples (b 9 → +0 / −1.5 / −3 · b 5 → +4 / +2.5 / +1), gap share 0
   5 every real play: result = clamp(graded + offset), her b learns the play brought back to a matching board; many plays at x → b → x; Thử tay / raw = no change
   6 a real game through kg82Play (playArt): the result carries the identity row (kit rows, no %), S.mgB saved; Thử tay path (raw) learns nothing
   7 skip / odds: her skip = median on her board + her class shift; an NPC's play moves by the same class shift (law 1)
   8 old save: a save with no S.mgB (this build + the old build) loads, plays, gets a store; ser → deser keeps S.mgB
   9 co-op: S.mgB is a personal key (not in jcoopworld W_KEYS) → each seat by its OWN b; two players with different hands get different offsets for the same kind
   10 no page errors */
const {chromium}=require('playwright');const path=require('path');const A=process.argv[2]||'index.html',OLD=process.argv[3]||'';
const U=x=>/^(https?|file):/.test(x)?x:'file://'+path.resolve(x);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,700):''))};
(async()=>{const b=await chromium.launch();const errs=[];
 const boot=async u=>{const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();await require('./lib/veil').guard(p);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(U(u),{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);return p};
 const fresh=`(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0})()`;
 let oldSave=null;
 if(OLD){const q=await boot(OLD);await q.evaluate(fresh);oldSave=await q.evaluate(()=>{for(let i=0;i<4;i++){Q.length=0;used=0;try{nextBuoi()}catch(e){}}Q.length=0;return JSON.stringify(ser())});await q.context().close()}
 const p=await boot(A);await p.evaluate(fresh);
 const r=await p.evaluate(async(oldSave)=>{const o={};const I=BAL.orig.id,AR=BAL.orig.art,D=BAL.orig.doan;
  /* 1 */
  o.knobs=['on','tgt','trAt','prior','pw','a','age','seedW','noSeed','gap','npc','lo','hi'].every(k=>k in I)&&I.tgt.tr===9&&I.tgt[""]===7.5&&I.tgt.doan===6&&I.prior===7.5&&I.pw===3&&I.a===.2&&I.gap===0;
  o.clash=[];o.roads=0;for(const og in AR)for(const rd in AR[og]){o.roads++;const L=(D[og]&&(D[og][rd]||D[og][""]))||[];if(!L.length)o.clash.push(og+'/'+rd+':none');L.forEach(a=>{if(AR[og][rd][a])o.clash.push(og+'/'+rd+':'+a)})}
  /* 2 */
  const P=(og,rd)=>({name:'X'+og+rd,id:777,nr:{o:og,r:rd}});
  o.cls={co_ttco:mgIdClass(P('tt','tt_co'),'co'),dan_ttco:mgIdClass(P('tt','tt_co'),'dan'),mua_ttco:mgIdClass(P('tt','tt_co'),'mua'),hoa_ttco:mgIdClass(P('tt','tt_co'),'hoa'),
   theu_nctuc:mgIdClass(P('nc','nc_tuc'),'theu'),tho_nctuc:mgIdClass(P('nc','nc_tuc'),'tho'),srv:mgIdClass({name:'s',org:'x'},'co'),none:mgIdClass({name:'n'},'co')};
  const keep={o:S.origin,st:S.st&&S.st.f14&&S.st.f14.road};
  /* 3 */
  delete S.mgB;localStorage.removeItem('ctm-owner-cal');o.b0=mgIdB('co',S);o.bNew=mgIdB('mua',S);
  localStorage.setItem('ctm-owner-cal','1');const ck=BAL.ag.mg2.cal.k;o.calCo=ck.co;o.bSeed=Math.round(mgIdB('co',S)*1000)/1000;o.bSeedX=Math.round((3*7.5+ck.co.n*ck.co.b)/(3+ck.co.n)*1000)/1000;
  o.bNoSeed=mgIdB('dauho',S);localStorage.removeItem('ctm-owner-cal');
  /* 4 (examples: a fresh store per kind set to b) */
  const setB=(k,b)=>{S.mgB=S.mgB||{};S.mgB[k]={s:b*10,w:10,n:5}};const Q=(og,rd)=>{S.origin=originByKey(og)||{k:og};S.st=S.st||{};S.st.f14=S.st.f14||{};S.st.f14.road=rd};
  Q('tt','tt_co');setB('co',9);setB('mua',9);setB('ve',9);const r9={tr:mgIdOff('co',S),bt:mgIdOff('ve',S),doan:mgIdOff('mua',S)};
  o.clsS={co:mgIdClass(S,'co'),ve:mgIdClass(S,'ve'),mua:mgIdClass(S,'mua')};
  setB('co',5);setB('mua',5);setB('ve',5);const r5={tr:mgIdOff('co',S),bt:mgIdOff('ve',S),doan:mgIdOff('mua',S)};o.r9=r9;o.r5=r5;
  /* 5 */
  delete S.mgB;KG82.tier=mgTier('co',{occ:'hoc',lv:0,d:0});KG82.tier.d=0;const g1=mgIdRes('co',5);o.res1={g:5,r:g1,want:Math.min(10,Math.round(5+9-7.5)),n:S.mgB.co.n,b:mgIdB('co',S)};
  o.note=KG82.idNote;o.row=mgIdRow(KG82.idNote);
  KG82.tier=mgTier('co',{occ:'hoc',lv:0,d:2});const sh=mgMedD(2)-mgMedD(0);const nb0=S.mgB.co.s;mgIdRes('co',5);o.learnD={x:Math.round((S.mgB.co.s-nb0*(1-I.a))*100)/100,want:Math.round(Math.min(10,5-sh)*100)/100};
  KG82.tier=mgTier('co',{occ:'hoc',lv:0,d:0});KG82.tier.d=0;for(let i=0;i<40;i++)mgIdRes('co',4);o.bLong=Math.round(mgIdB('co',S)*100)/100;o.offLong=Math.round(mgIdOff('co',S)*100)/100;o.resLong=mgIdRes('co',4);
  const s0=JSON.stringify(S.mgB);o.raw=mgIdRes('co',4,{raw:1})===4&&JSON.stringify(S.mgB)===s0;
  o.clamp=(setB('co',2),mgIdRes('co',10));
  /* 6 a real play through kg82Play with a stub engine that ends at once */
  delete S.mgB;const e0=KG82_ENG[KG82_KIND.co.e];KG82_ENG[KG82_KIND.co.e]=(box,env)=>{setTimeout(()=>env.end(6),30);return()=>{}};
  let got=null;playArt({art:'co',onDone:x=>{got=x}});await new Promise(r=>setTimeout(r,300));const go=document.getElementById('kg82go');if(go)go.click();
  await new Promise(r=>{let n=0;const t=()=>{const rs=document.getElementById('kg82box-res');if((rs&&!rs.hidden&&rs.textContent)||++n>60)r();else setTimeout(t,100)};t()});
  const rs=document.getElementById('kg82box-res');o.play={txt:(rs&&rs.textContent||'').slice(0,300),n:S.mgB&&S.mgB.co&&S.mgB.co.n,kit:!!(rs&&rs.querySelector('.krow, .kr, [class*="krow"]'))};
  o.play.hasRow=/Sở trường|Sở đoản|Thân phận/.test(o.play.txt);o.play.pct=/%/.test(o.play.txt);const ok2=document.getElementById('kg82ok');if(ok2)ok2.click();
  /* Thử tay path: kg82Play(..,{raw:1}) */
  const sB=JSON.stringify(S.mgB);let rr=null;kg82Open({art:'Thử tay',title:'t'});kg82Play('co',x=>{rr=x},{raw:1});await new Promise(r=>{let n=0;const t=()=>{if(rr!=null||++n>60)r();else setTimeout(t,100)};t()});
  o.cal={r:rr,want:mgGrade(6,'co'),same:JSON.stringify(S.mgB)===sB};try{kg82Close()}catch(e){}KG82_ENG[KG82_KIND.co.e]=e0;
  /* 7 */
  Q('tt','tt_co');const t0=mgTier('co',{occ:'hoi',lv:0});o.skip={co:mgSkipRaw(t0),want:Math.round(mgMedD(t0.d)+9-7.5),noKind:mgSkipRaw({d:t0.d})};
  const n1=P('tt','tt_co'),n2=P('tt','tt_co');const avg=(k,p,on)=>{I.npc=on;let s=0;for(let i=0;i<4000;i++)s+=mgNpcRaw(k,p,{d:0});return s/4000};
  o.npc={tr:Math.round((avg('co',n1,1)-avg('co',n1,0))*100)/100,doan:Math.round((avg('mua',n2,1)-avg('mua',n2,0))*100)/100,bt:Math.round((avg('ve',n2,1)-avg('ve',n2,0))*100)/100};I.npc=1;
  /* 8 */
  delete S.mgB;const sv=JSON.stringify(ser());deser(JSON.parse(sv));o.old={no:S.mgB===undefined};KG82.tier=null;o.old.r=mgIdRes('co',6);o.old.has=!!(S.mgB&&S.mgB.co);
  const sv2=JSON.stringify(ser());deser(JSON.parse(sv2));o.old.kept=!!(S.mgB&&S.mgB.co&&S.mgB.co.n===1);
  if(oldSave){try{deser(JSON.parse(oldSave));o.mainOld={no:S.mgB===undefined,r:mgIdRes('co',6),has:!!(S.mgB&&S.mgB.co)};for(let i=0;i<3;i++){Q.length=0;used=0;nextBuoi()}Q.length=0;o.mainOld.play=true}catch(e){o.mainOld={err:e.message}}}
  /* 9 */
  
  const A1={origin:S.origin,st:S.st,mgB:{co:{s:90,w:10,n:9}}},A2={origin:S.origin,st:S.st,mgB:{co:{s:50,w:10,n:9}}};const S0=S;
  S=A1;const off1=mgIdOff('co',S),c1=mgIdClass(S,'co');S=A2;const off2=mgIdOff('co',S);S=S0;const tg=BAL.orig.id.tgt[c1];o.coop={off1:Math.round(off1*100)/100,off2:Math.round(off2*100)/100,want1:tg-9,want2:tg-5};
  return o},oldSave);
 r.world=/\"mgB\"/.test((require('fs').readFileSync(path.join(__dirname,'../build/jcoopworld.js'),'utf8').match(/const W_KEYS=\[[^\]]*\]/)||['"mgB"'])[0]);console.log(JSON.stringify(r));
 ok(r.knobs&&r.clash.length===0&&r.roads>=40,'1 BAL.orig.id knobs; BAL.orig.doan never names an art of the identity row ('+r.roads+' rows)',{clash:r.clash});
 ok(r.cls.co_ttco==='tr'&&r.cls.dan_ttco==='tr'&&r.cls.mua_ttco==='doan'&&r.cls.hoa_ttco===''&&r.cls.theu_nctuc==='tr'&&r.cls.tho_nctuc==='doan'&&r.cls.srv===''&&r.cls.none==='','2 identity classes per kind from BAL.orig.art / BAL.orig.doan',r.cls);
 ok(r.b0===7.5&&r.bNew===7.5&&r.bSeed===r.bSeedX&&r.bNoSeed===7.5,'3 never played = 7.5; owner device seeds her Thử tay (worth n plays); noSeed (broken board) = prior',{b0:r.b0,seed:r.bSeed,want:r.bSeedX,noSeed:r.bNoSeed});
 const near=(a,b)=>Math.abs(a-b)<1e-9;
 ok(r.clsS.co==='tr'&&r.clsS.ve===''&&r.clsS.mua==='doan'&&near(r.r9.tr,0)&&near(r.r9.bt,-1.5)&&near(r.r9.doan,-3)&&near(r.r5.tr,4)&&near(r.r5.bt,2.5)&&near(r.r5.doan,1),'4 offset = target − b (owner examples b 9 / b 5)',{r9:r.r9,r5:r.r5});
 ok(r.res1.r===r.res1.want&&r.res1.n===1&&r.note&&r.note.cls==='tr'&&/Sở trường/.test(r.row)&&!/%/.test(r.row),'5 result = clamp(graded + offset); b learns; kit row',{res1:r.res1,row:r.row.replace(/<[^>]+>/g,' ')});
 ok(Math.abs(r.learnD.x-r.learnD.want)<.01,'5 a play on a harder board is brought back to a matching board before it joins b',r.learnD);
 ok(Math.abs(r.bLong-4)<.05&&Math.abs(r.offLong-5)<.05&&r.resLong===9&&r.raw&&r.clamp===10,'5 many plays at 4 → b ≈ 4, sở trường lifts to 9; raw path untouched; clamp 10',{b:r.bLong,off:r.offLong,res:r.resLong,clamp:r.clamp});
 ok(r.play.n===1&&r.play.hasRow&&!r.play.pct&&r.cal.r===r.cal.want&&r.cal.same,'6 a real play (kg82Play): identity row on the result, b saved; Thử tay raw learns nothing',{play:r.play,cal:r.cal});
 ok(r.skip.co===r.skip.want&&Math.abs(r.npc.tr-1.5)<.15&&Math.abs(r.npc.doan+1.5)<.15&&Math.abs(r.npc.bt)<.05,'7 skip = her class level on her board; NPC play shifts by the same class shift (law 1)',{skip:r.skip,npc:r.npc});
 ok(r.old.no&&r.old.has&&r.old.kept&&(!OLD||(r.mainOld&&r.mainOld.no&&r.mainOld.has&&r.mainOld.play)),'8 old save (no S.mgB'+(OLD?', also from the old build':'')+') loads, plays, gets a store; ser → deser keeps it',{old:r.old,mainOld:r.mainOld});
 ok(r.world===false&&r.coop.off1!==r.coop.off2&&near(r.coop.off1,r.coop.want1)&&near(r.coop.off2,r.coop.want2),'9 co-op: S.mgB is personal (not a world key) → each player by her OWN b',{world:r.world,coop:r.coop});
 ok(errs.length===0,'10 no page errors',errs.slice(0,5));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:'ALL PASS ('+res.length+')');process.exit(n?1:0)})();
