/* jroute reachability: every «Lối riêng» ending is reached by playing its real cards / dialogs in order (odds forced to pass or fail,
   so this proves the chain is wired, not how likely it is — dev/measure/routes.js measures odds).
   usage: node dev/measure/routes_reach.js   (needs zz-test.html at the repo root). Prints one line per ending: ok / FAIL + the steps taken. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const ROOT=path.resolve(__dirname,'../..');const MT={html:'text/html',js:'text/javascript',json:'application/json'};
const CASES={
 /* tư tình → đêm riêng → lời hứa → theo hắn ra cổng */
 tc_cung:`const m=man('thị vệ');card('tt0'+m.id);card('tt1');m.tinh=80;card('tt2');card('tt2');card('tt3');pick(/Cùng y tính đường trốn/);S.buoi=B4L;card('tcgo_theo')`,
 /* trốn cung: đủ bước, tháng chạp, lẫn vào đoàn cung nữ */
 tc_dan:`card('tc0');card('tc_guard');S.maid.loyal=90;card('tc_maid');card('tc_home');card('tc_route');card('tc_pass');card('tc_cloth');S.month=12;card('tcgo_doan')`,
 tc_lien:`card('tc0');S.maid.loyal=90;card('tc_maid');card('tc_pass');card('tc_cloth');S.month=12;card('tcgo_doan')`,
 tc_bat:`card('tc0');S.maid.loyal=90;card('tc_maid');card('tc_pass');card('tc_cloth');S.month=12;card('tcgo_doan',false)`,
 /* rời cung hợp lệ */
 hl_tu:`S.turn=30;S.th=60;S.duc=70;card('hl_plead');card('hl_tu')`,
 hl_hon:`const m=man('vương gia');m.tinh=60;S.rank=1;S.nightLog=[];card('hl_hon')`,
 hl_que:`S.turn=30;S.rank=1;S.sung=10;card('hl_que')`,
 hl_phe:`S.out=true;card('hl_phe')`,
 /* ẩn dật 3 năm */
 ad_an:`card('ad0');S.rt.ad.since=S.turn-36;S.duc=70;rtMonth();pick(/Khép kiếp này/)`,
 /* nghiệm thân: con của người ấy, bỏ phèn → máu vẫn hòa */
 tt_hoa:`const k=kid(true);rtNgSet(k,'emp',false);card('ng_alum');S.rt.ng.mg=1;S.rt.ng.held=1;rtPush('rtNg',{});pick(/Bằng lòng/)`,
 /* kẻ tố nhỏ dầu, tai mắt dò ra → tố ngược */
 ng_vach:`const k=kid(false);const v=liveRivals(true).find(x=>!x.queen);rtNgSet(k,v.id,true);card('ng_spy');S.rt.ng.held=1;rtPush('rtNg',{});pick(/Tố ngược/)`,
 /* bị vu oan: dầu, không dò, nghiệm lại bị bác */
 ng_oan:`const k=kid(false);const v=liveRivals(true).find(x=>!x.queen);rtNgSet(k,v.id,true);S.rt.ng.held=1;rtPush('rtNg',{});pick(/Bằng lòng/);R=false;pick(/nghiệm lại/)`,
 /* con của người ấy, không chuẩn bị → bại lộ */
 tt_lo:`const k=kid(true);rtNgSet(k,'emp',false);S.rt.ng.held=1;rtPush('rtNg',{});pick(/Bằng lòng/);pick(/Kêu oan/)`,
 /* ngươi vu oan con phi tần khác */
 ng_vu:`const v=liveRivals(true).find(x=>!x.queen);const k=mkKid('m',4);v.kids=(v.kids||[]).concat([k]);evA(S,v,3);rtS().open=1;card('ngn_'+v.id);pick(/nhỏ dầu/)`,
 /* một đời giấu kín: con của người ấy, không ai biết, hết kiếp */
 tt_kin:`kid(true);over('Hết kiếp','thử','Hết kiếp',true)`};
(async()=>{const b=await chromium.launch();const out=[];
 for(const [id,code] of Object.entries(CASES)){const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:MT[f.split('.').pop()]||'application/octet-stream'})});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.on('console',m=>{if(m.type()==='error'&&!/ERR_FAILED/.test(m.text()))errs.push(m.text().slice(0,200))});
  await p.goto('http://game.local/zz-test.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  const r=await p.evaluate(([id,code])=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__bot={};window.__rtAct=1;window.__forceOrigin='tt';window.__kpNoWarn=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const steps=[];let R=true;const r0=roll;roll=o=>o<=0?false:o>=100?true:R;
   const card=(cid,ok=true)=>{window.__rtGo=1;const T=rtS();T.open=1;T.dn={};const a=rtCards().find(x=>x.rtId===cid);if(!a){steps.push('✗ '+cid+' [có: '+rtCards().map(x=>x.rtId).join(',')+'; tt '+JSON.stringify(S.rt.tt)+']');throw new Error('no card '+cid)}if(a.lock){steps.push('✗ '+cid+' (khóa: '+a.rtNeed.filter(x=>!x.ok).map(x=>x.t).join('; ')+')');throw new Error('locked '+cid)}steps.push(cid);if(ok)a.go();else a.fail();for(let k=0;k<5&&Q.length&&!Q[0].pid;k++)Q.shift()};
   const pick=re=>{let i=-1,qi=Q.findIndex(q=>q.opts&&(i=q.opts.findIndex(o=>re.test(o.n)))>=0);if(qi<0){steps.push('✗ '+re);throw new Error('no option '+re)}Q.splice(0,qi);steps.push('→ '+Q[0].opts[i].n);chooseM(i)};
   const man=rw=>{menInit();let m=S.men.find(x=>x.rw===rw&&x.alive);if(!m)throw new Error('no man '+rw);m.seen='x';m.tinh=Math.max(m.tinh||0,30);S.maid&&(S.maid.loyal=Math.max(S.maid.loyal,75));S.menW=S.menW||{};S.menW[m.id]='vuon';S.buoi=B4L;loyal();return m};
   const loyal=()=>{if(!S.maid)S.maid=newMaid(MAIDS[0],90);S.maid.loyal=90;S.maid.tin=90;if(!watcher())throw new Error('no servant')};const kid=tf=>{const k=mkKid('m',5);if(tf){menInit();k.tf=S.men[0].id}S.kids.push(k);return k};
   try{S.turn=14;S.sung=12;loyal();eval(code)}catch(e){steps.push('ERR '+e.message)}roll=r0;
   const bk=rtBook();return{ok:!!bk[id.split(':').pop()],ends:Object.keys(bk),steps,fate:S.fate||'',dead:!!S.dead}},[id,code]);
  out.push({id,...r,errs});console.log(`${r.ok?'ok  ':'FAIL'} ${id.padEnd(8)} ${r.steps.join(' · ')}${r.ok?'':' | ends '+r.ends.join(',')}${errs.length?' | ERR '+errs[0]:''}`);await ctx.close()}
 console.log(`${out.filter(x=>x.ok).length}/${out.length} endings reached`);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
