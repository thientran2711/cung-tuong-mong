/* Co-op end-to-end: two Playwright browsers in one room against the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-e2e.js [outdir] [workerURL]
   A = Fold portrait 686x880@2.2 (host), B = iPad landscape 1180x820@2 (guest).
   Steps: create room, join by ?room=, play 3 weeks (both end → merged week), B leaves → A frozen ("Đợi bạn trở lại"),
   B comes back → resumes same week, B dies → normal rebirth choice → new person in the SAME world, single-player + old save still load.
   Hooks used (PROTOCOL.md / jcoop.js): window.COOP {code,seat,week,online,ended,frozen,waiting,on}, rivals entry coop:true id 901/902. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const {execSync}=require('child_process');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const ROOT=path.resolve(__dirname,'../..');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;
    /* one view of the co-op hooks, whatever the client module names them */
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const online=c.online||(s.seats?{a:!!(s.seats.a&&s.seats.a.online),b:!!(s.seats.b&&s.seats.b.online)}:{});
      const on=typeof c.on==='boolean'?c.on:(c.active!=null?!!c.active:!!(s.playing||(s.status&&s.status!=='off')));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),online,ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
const shot=async(o,n)=>{await o.p.waitForTimeout(400);const t0=Date.now();const alive=await Promise.race([o.p.evaluate(()=>1),sleep(10000).then(()=>0)]);if(!alive){ok(false,`${n} ${o.name}: page responsive`);return}
  try{await o.p.screenshot({path:`${OUT}/${n}-${o.name}.png`,timeout:120000})}catch(e){ok(false,`${n} ${o.name}: screenshot (${e.message.split('\n')[0]})`);return}
  const ov=await o.p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov,`${n} ${o.name}: no horizontal overflow`)};
const C=o=>o.p.evaluate(()=>__co());
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}}
/* wait for fn while both players read their dialogs (the week's end goes out only once her dialogs are closed) */
async function untilC(o,fn,arg,ms=40000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(fn,arg).catch(()=>false))return true;for(const x of ALL)if(x.p&&!x.p.isClosed())await clear(x);await sleep(300)}return false}
const ALL=[];
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){await el.click();return true}await sleep(250)}return false}
/* close story/news modals of the normal game (never the co-op waiting/freeze panel) */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const c=__co();if(c.frozen||c.waiting)return'coop';
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim()));if(ov){ov.click();return'x'}
  const bk=[...document.querySelectorAll('.kbk-bar button')].find(x=>x.offsetParent!==null&&/^Lui$/.test(x.textContent.trim()));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled])');if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
/* press "Qua buổi"/"Qua đêm" when it is enabled (waits up to 20 s: after the friend's dialogs, the host's NPC places, …) */
async function press(o){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});if(r)return true;await sleep(250)}
  ok(false,o.name+' #next enabled',await o.p.evaluate(()=>[S.buoi||0,S.tuan,S.month,document.getElementById('next').textContent]));return false}
/* one buổi for both (PROTOCOL §9: the buổi advances when both have ended it) */
async function buoiBoth(A,B,shotWait){const k0=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0));await press(A);if(shotWait)await shot(A,shotWait);await press(B);
  for(let t=0;t<80;t++){const a=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0)),b=await B.p.evaluate(()=>__co().week+':'+(S.buoi||0));if(a!==k0&&b!==k0&&a===b)return true;await clear(A);await clear(B);await sleep(250)}
  ok(false,'buổi '+k0+' advanced for both');return false}
async function weekBoth(A,B,w){for(let k=0;k<3;k++)await buoiBoth(A,B,w===0&&k===0?'06-waiting-friend':null)}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[686,880,2.2]),B=await mk(b,'ipad',[1180,820,2]);ALL.push(A,B);
 /* 1 host makes a room */
 await A.page();await A.p.goto(BASE);await A.p.waitForTimeout(3000);await shot(A,'01-title');
 ok(await tapText(A,/^Chơi cùng bạn/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);await shot(A,'02-coop-menu');
 ok(await tapText(A,/^Mời bạn/),'A taps Mời bạn');
 ok(await until(A,()=>__co().code&&__co().seat==='a'),'A has a room code, seat a');
 const code=(await C(A)).code;console.log('room',code);await clear(A);await shot(A,'03-invite-waiting');
 const w0=await A.p.evaluate(()=>!!(__co().frozen));ok(w0,'A waits for the friend (frozen before join)');
 /* 2 guest joins by link */
 await B.page();await B.p.goto(BASE+'?room='+code);await B.p.waitForTimeout(3000);await shot(B,'04-join');
 await tapText(B,/^Vào phòng/,4000);
 ok(await until(B,()=>__co().seat==='b'&&__co().online&&__co().online.a&&__co().online.b&&!__co().frozen,null,40000),'B joined seat b, both online');
 ok(await until(A,()=>!__co().frozen,null,20000),'A unfrozen when B is in');
 {const t0=Date.now();while(Date.now()-t0<60000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>__co().world),c=await B.p.evaluate(()=>__co().world);if(a&&c)break;await sleep(500)}}
 ok(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world),'both players are in the shared world');await clear(A);await clear(B);
 const same=async tag=>{const a=await A.p.evaluate(()=>({era:S.emp.era,d:[S.year,S.month,S.tuan],me:S.name,fr:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join()}));
   const c=await B.p.evaluate(()=>({era:S.emp.era,d:[S.year,S.month,S.tuan],me:S.name,fr:((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name,R:rivals.filter(v=>!v.coop).map(v=>v.id+v.name).join()}));
   ok(a.era===c.era&&a.R===c.R,tag+': same Emperor and same consorts',[a.era,c.era]);ok(String(a.d)===String(c.d),tag+': same date',[a.d,c.d]);
   ok(a.fr===c.me&&c.fr===a.me,tag+': each sees the other as a person',[a.me,a.fr,c.me,c.fr]);return[a,c]};
 await same('start');
 for(const o of [A,B]){const r=await o.p.evaluate(()=>{const f=(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null);if(!f)return{ok:false,why:'no friend'};
   const unk=k61St(f)===0;/* known for a reason any NPC would be: reigning Hoàng hậu, her own mistress, or in the same palace */
   const why=f.queen?'Hoàng hậu':(S.srv&&!S.srv.risen&&S.srv.mid===f.id)?'chủ nhân':(f.id!=null&&together(S,f))?'cùng chỗ':(f.id==null&&(S.staff||[]).includes(f))?'kẻ hầu của ngươi':'';
   return{ok:unk||!!why,unk,why,st:k61St(f),srv:!!(S.srv&&!S.srv.risen),fsrv:f.id==null}});
  ok(r.ok,o.name+': friend starts as Người lạ (unknown, like any NPC)'+(r.unk?'':' — known: '+r.why),r.ok?undefined:r)}await shot(A,'05-world');await shot(B,'05-world');
 /* 3 three weeks */
 for(let w=0;w<3;w++){const wk=(await C(A)).week;
  await weekBoth(A,B,w);
  for(const o of [A,B]){const r=await untilC(o,x=>__co().week===x+1,wk,40000);ok(r,`week ${w+1}: ${o.name} advanced`,r?undefined:await o.p.evaluate(()=>[__co(),COOPW.sent,COOPW.pend,S.buoi]))}
  await clear(A);await clear(B);await same('after week '+(w+1))}
 await shot(A,'07-after3');await shot(B,'07-after3');
 /* 4 B leaves → A freezes; B returns */
 await B.p.close();
 ok(await until(A,()=>__co().frozen,null,60000),'A frozen when B left');await shot(A,'08-frozen');
 ok(await A.p.evaluate(()=>document.getElementById('next').disabled||!!__co().frozen),'A cannot advance while frozen');
 const wkF=(await C(A)).week;
 await B.page();await B.p.goto(BASE+'?room='+code);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,3000);
 ok(await until(B,x=>__co().seat==='b'&&__co().week===x&&!__co().frozen,wkF,40000),'B back in same seat and week');
 ok(await until(A,()=>!__co().frozen,null,20000),'A resumes');await clear(A);await clear(B);await same('after rejoin');await shot(B,'09-rejoined');
 /* 5 B dies → normal rebirth choice → new person in the same world */
 const before=await B.p.evaluate(()=>({n:S.name,era:S.emp.era}));
 await B.p.evaluate(()=>die('Thử: trúng gió'));await B.p.waitForTimeout(600);await shot(B,'10-death');
 for(let i=0;i<12;i++){const st=await B.p.evaluate(()=>S&&!S.dead&&S.name);if(st&&st!==before.n)break;
  const m=await B.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal:not([hidden]) button:not([disabled]), #title:not([hidden]) button:not([disabled]), .kroul button:not([disabled]), [data-coop-reborn]')].filter(x=>x.offsetParent!==null);
    const pref=b.find(x=>/Đầu thai|Luân hồi|Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Nhập cung|Lật|Chọn/.test(x.textContent))||b[0];if(pref){const t=pref.textContent.trim();pref.click();return t}return''});
  if(i===1)await shot(B,'11-rebirth-choice');await B.p.waitForTimeout(900)}
 const after=await B.p.evaluate(()=>({n:S.name,dead:S.dead,era:S.emp.era}));
 ok(!after.dead&&after.n!==before.n&&after.era===before.era,'B reborn as a new person in the same world',[before,after]);
 {let seen=false;const t0=Date.now();while(Date.now()-t0<40000){await clear(A);await clear(B);seen=await A.p.evaluate(n=>!!(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop))&&(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null).name===n,after.n);if(seen)break;await sleep(700)}
  ok(seen,'A sees the reborn friend by her new name',await A.p.evaluate(()=>((rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null)||{}).name));}
 {const r=await A.p.evaluate(()=>{const f=(rivals.find(v=>v.coop)||rivals.flatMap(v=>v.staff||[]).find(x=>x.coop)||null);return{ok:!!f&&k61St(f)===0,srv:f&&f.id==null,st:f&&k61St(f),here:f&&f.id!=null&&whereOf(f),me:S.place,tr:COOPW.tr.slice(-12)}});
  ok(r.ok,'reborn friend is a stranger again (Người lạ)',r.ok?undefined:r)}
 await clear(A);await clear(B);await shot(A,'12-reborn-seen');await shot(B,'12-reborn');
 /* 6 one more week after rebirth */
 {const wk=(await C(A)).week;await weekBoth(A,B,1);ok(await untilC(B,x=>__co().week===x+1,wk,40000),'week after rebirth advances');}
 /* 7 single player untouched + old save loads */
 const oldHtml=execSync('git -C '+JSON.stringify(ROOT)+' show origin/main:index.html',{maxBuffer:64e6}).toString();
 const D=await mk(b,'solo',[686,880,2.2]);await D.ctx.route(BASE+'old.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:oldHtml.replace(/navigator\.serviceWorker\.register/g,'(()=>Promise.reject())')}));
 await D.page();await D.p.goto(BASE+'old.html');await D.p.waitForTimeout(3500);
 await D.p.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;localStorage.setItem(SK(2),JSON.stringify(ser()));localStorage.setItem('hclh-slot','2')});const oldName=await D.p.evaluate(()=>S.name);
 await D.p.goto(BASE);await D.p.waitForTimeout(3500);await shot(D,'13-title-solo');
 ok(await tapText(D,/^Chơi một mình/),'solo: Chơi một mình');await D.p.waitForTimeout(800);
 /* Chơi một mình = Tiếp tục the last sổ (old save) when there is one */
 if(!await D.p.evaluate(()=>typeof S!=='undefined'&&!!S&&!!S.name))await tapText(D,/^Tiếp tục kiếp này/,4000);await D.p.waitForTimeout(1500);
 const ld=await D.p.evaluate(()=>({n:typeof S!=='undefined'&&S&&S.name,coop:!!__co().on,fr:typeof rivals!=='undefined'&&(rivals||[]).some(v=>v.coop)}));ok(ld.n===oldName&&!ld.coop&&!ld.fr,'solo: old save loads, no co-op',ld);
 await clear(D);await shot(D,'14-solo-game');
 for(const o of [A,B,D])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
