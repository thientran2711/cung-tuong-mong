/* D27 extra toilette reaction buttons (review/toil-react, dev/build/jtoilr.js): Ghi hận / Mách Hoàng hậu / Tặng lại / Hỏi bí quyết on the jtoil reaction dialogs.
   usage: node dev/test/toil-react.js <url> <WxH@dpr> <shotdir> [oldsave.json]   (exit 1 on a failed check) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,VP,DIR,OLD]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;
fs.mkdirSync(DIR,{recursive:true});const fails=[];const chk=(c,msg)=>{if(!c)fails.push(msg)};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(60000);const out={vp:VP};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,.kmov.kcf').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:30000});
  const ok=await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out&&qOn()&&S.rank<7&&rivals.some(v=>!v.queen&&!v.out));if(ok)break}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.bac=2000;S.toilette={day:toilWk()*10,wk:toilWk(),score:30,makeup:true,style:'plain',dv:'giandi',F:0,occ:['thuong'],look:null};deal();render();
  window.V=rivals.find(v=>!v.queen&&!v.out);window.react=(k,n,over)=>{const v=V;Q.length=0;toilReact(Object.assign({k,who:pv(v),host:v,v,n,name:v.name,line:'thử',ctx:{mk:'moc',dress:'giandi'}},over||{}))}});
 const names=()=>p.evaluate(()=>(Q[0]?Q[0].opts:[]).map(o=>o.n));const pick=n=>p.evaluate(n=>{const i=Q[0].opts.findIndex(o=>o.n===n);if(i<0)return false;chooseM(i);return true},n);
 const modalOk=async(t)=>{await p.waitForTimeout(500);/* an item-gain card (kit §64) from the test's own S.inv push may sit on top: take it */for(let i=0;i<3;i++){const c=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(e=>/^Nhận$/.test(e.textContent.trim())&&e.offsetParent&&!e.closest('#modal'));if(b){b.click();return true}return false});if(!c)break;await p.waitForTimeout(500)}const r=await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return{open:false};const d=M.querySelector('.dlg')||M;const r=d.getBoundingClientRect();
   const bad=[...M.querySelectorAll('.opt,[data-m]')].filter(e=>e.scrollWidth>e.clientWidth+2).length;const mr=M.getBoundingClientRect(),top=document.elementFromPoint(mr.left+mr.width/2,mr.top+mr.height/2);return{open:true,onTop:!!(top&&M.contains(top)),btns:M.querySelectorAll('[data-m]').length,w:Math.round(r.width),h:Math.round(r.height),bad,hs:document.documentElement.scrollWidth>innerWidth+1}});
  chk(r.open,t+': modal open');chk(r.onTop,t+': modal is on top');chk(!r.hs,t+': horizontal overflow');chk(!r.bad,t+': truncated option');out['modal_'+t]=r;await p.screenshot({path:`${DIR}/toilr-${tag}-${t}.jpg`,quality:60})};
 /* 1. a slight from a consort whose face is better than hers: Ghi hận · Mách · Hỏi bí quyết next to the old three */
 await p.evaluate(()=>{window.np0=toilNpc;toilNpc=()=>({makeup:true,score:95,dv:'hopdip',npc:1});react('rival-jealous',-2)});await p.waitForTimeout(300);
 out.bad=await names();for(const n of['Xin lỗi','Cười trừ','Đáp lại','Ghi hận','Mách Hoàng hậu','Hỏi bí quyết'])chk(out.bad.includes(n),'bad has '+n);chk(!out.bad.some(n=>/^Tặng lại/.test(n)),'bad has no Tặng lại');
 await modalOk('bad');
 /* Ghi hận */
 const g0=await p.evaluate(()=>({oan:oan(S,V),duc:S.duc,ro:S.ro[V.id]||0}));await pick('Ghi hận');await p.waitForTimeout(200);
 const g1=await p.evaluate(()=>({oan:oan(S,V),duc:S.duc,g:!!toilGrudgeOf(V)}));out.grudge={g0,g1};chk(g1.oan>g0.oan,'Ghi hận raises her Oán');chk(g1.duc<=g0.duc,'Ghi hận Đức');chk(g1.g,'grudge stored');
 /* Mách Hoàng hậu: win and fail */
 for(const win of[true,false]){await p.evaluate(()=>{react('rival-jealous',-2)});await p.waitForTimeout(250);const a=await p.evaluate(()=>({danh:S.danh,duc:S.duc,hh:S.hh,o:oan(V,S)}));
  await p.evaluate(w=>{window.r0=roll;roll=()=>w},win);await pick('Mách Hoàng hậu');await p.evaluate(()=>{roll=window.r0});const c=await p.evaluate(()=>({danh:S.danh,duc:S.duc,hh:S.hh,o:oan(V,S)}));out['tell_'+win]={a,c};
  if(win){chk(c.danh>=a.danh&&c.hh>a.hh&&c.o>a.o,'Mách win')}else{chk(c.danh<=a.danh&&c.duc<=a.duc&&c.hh<a.hh&&c.o>a.o,'Mách fail looks petty')}}
 /* Hỏi bí quyết: regard cost, tip */
 for(const win of[false,true]){await p.evaluate(()=>{S.toilTip=null;react('rival-jealous',-1)});await p.waitForTimeout(250);const a=await p.evaluate(()=>aff(V,S));
  await p.evaluate(w=>{window.r0=roll;roll=()=>w},win);await pick('Hỏi bí quyết');await p.evaluate(()=>{roll=window.r0});
  const c=await p.evaluate(()=>({a:aff(V,S),tip:toilTipOn(),sk:toilSkill()}));out['ask_'+win]={a,c:c.a,tip:c.tip};chk(c.a<a,'Hỏi bí quyết costs regard');chk(c.tip===win,'tip iff success');if(win)chk(c.sk.tip,'toilSkill carries the tip')}
 await p.evaluate(()=>{S.toilTip=null;toilNpc=np0;S.toilette.score=99;react('rival-jealous',-1)});await p.waitForTimeout(250);
 chk(!await p.evaluate(()=>Q[0].opts.some(o=>o.n==='Hỏi bí quyết')),'no Hỏi bí quyết when her face is as good');
 /* 2. praise from a consort: Tặng lại with bạc and with an item of the same worth */
 await p.evaluate(()=>{const c=toilGiveCost();let best=null;const sv=k=>Math.floor(IT[k].pr*BAL.sellPct/100);for(const k in IT){const it=IT[k];if(it&&it.pr>0&&!it.sl&&!it.keep&&!it.nt&&!it.il&&!econNo(S,{k})&&(!best||Math.abs(sv(k)-c)<Math.abs(sv(best)-c)))best=k}S.inv=(S.inv||[]).filter(e=>!(e&&e.k===best));S.inv.push({k:best});window.IK=best;react('rival-praise',1)});await p.waitForTimeout(300);
 out.good=await names();chk(out.good.includes('Tặng lại'),'praise has Tặng lại (bạc)');chk(out.good.some(n=>/^Tặng lại: /.test(n)),'praise has Tặng lại with an item');chk(!out.good.includes('Ghi hận')&&!out.good.includes('Mách Hoàng hậu'),'praise has no grudge/tell');
 await modalOk('good');
 const t0=await p.evaluate(()=>({bac:S.bac,a:aff(V,S),n:S.inv.length,c:toilGiveCost()}));await pick('Tặng lại');const t1=await p.evaluate(()=>({bac:S.bac,a:aff(V,S),n:S.inv.length}));out.giveBac={t0,t1};chk(t1.bac===t0.bac-t0.c,'bạc paid');chk(t1.a>t0.a,'Tặng lại raises regard');
 await p.evaluate(()=>{react('rival-praise',1)});await p.waitForTimeout(250);const u0=await p.evaluate(()=>({bac:S.bac,a:aff(V,S),n:S.inv.length}));
 await p.evaluate(()=>{const i=Q[0].opts.findIndex(o=>/^Tặng lại: /.test(o.n));chooseM(i)});const u1=await p.evaluate(()=>({bac:S.bac,a:aff(V,S),n:S.inv.length}));out.giveItem={u0,u1};chk(u1.n===u0.n-1&&u1.bac===u0.bac&&u1.a>u0.a,'item paid, regard up');
 /* 3. Thái hậu praise: Tặng lại; Hoàng thượng: none of the four */
 await p.evaluate(()=>{Q.length=0;toilReact({k:'th-praise',who:pTH(),host:'th',n:2,name:'Thái hậu',line:'thử',ctx:{mk:'dep',dress:'hopdip'}})});await p.waitForTimeout(300);out.th=await names();chk(out.th.includes('Tặng lại'),'Thái hậu praise has Tặng lại');
 await p.evaluate(()=>{Q.length=0;toilReact({k:'emp-dislike',who:pEmp(),host:'emp',n:-1,name:'Sủng',line:'thử',ctx:{mk:'moc',dress:'giandi'}})});await p.waitForTimeout(300);out.emp=await names();chk(!out.emp.some(n=>['Ghi hận','Mách Hoàng hậu','Hỏi bí quyết'].includes(n)||/^Tặng lại/.test(n)),'emperor: none');
 /* 4. grudge book helps the next tell; old save loads without the new fields */
 out.grudgeTell=await p.evaluate(()=>{const v=V;S.toilGrudge=null;const o0=toilRxOpts({k:'rival-jealous',host:v,v,n:-2,name:v.name}).find(o=>o.n==='Mách Hoàng hậu').odds;toilGrudgeAdd(v,v.name);const o1=toilRxOpts({k:'rival-jealous',host:v,v,n:-2,name:v.name}).find(o=>o.n==='Mách Hoàng hậu').odds;return{o0,o1}});chk(out.grudgeTell.o1>out.grudgeTell.o0,'grudge raises Mách odds');
 if(OLD){const txt=fs.readFileSync(OLD,'utf8');out.old=await p.evaluate(t=>{try{quiet=true;deser(JSON.parse(t));quiet=false;Q.length=0;return{ok:!!S,g:toilGrudgeOf('th'),tip:toilTipOn(),sk:toilSkill().sk}}catch(e){return'err '+e.message}},txt);chk(out.old&&out.old.ok,'old save loads')}
 chk(!errs.length,'page errors: '+errs.join('|'));out.fails=fails;out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
