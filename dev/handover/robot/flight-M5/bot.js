/* M5 real-tap solo life driver. Actions ONLY via touchscreen.tap after elementFromPoint hit-check. State is read-only. */
const {chromium,serve}=require('./lib');const fs=require('fs');
const SEED=+process.env.SEED||105;const OUT=process.env.OUT||'/home/user/wt/m5-run/out';fs.mkdirSync(OUT,{recursive:true});fs.mkdirSync(OUT+'/shots',{recursive:true});
const LOG=OUT+'/life.log',ISS=OUT+'/issues.log';
const T0=Date.now();const ts=()=>((Date.now()-T0)/60000).toFixed(1)+'m';
const log=(...a)=>{const s=ts()+' '+a.join(' ');fs.appendFileSync(LOG,s+'\n');if(process.env.V)console.log(s)};
const issue=(k,...a)=>{const s=ts()+' ['+k+'] '+a.join(' ');fs.appendFileSync(ISS,s+'\n');console.log('ISSUE',s)};
let a=SEED;const rnd=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const pick=x=>x[Math.floor(rnd()*x.length)];
const EXIT=/xu[ấa]t gia|xu[ấa]t cung|t[ựu] ph[ếe]|xin ph[ếe]|b[ỏo] cu[ộo]c|t[ựu] v[ẫa]n|t[ựu] tận|treo c[ổo]|u[ốo]ng đ[ộo]c|nh[ảa]y gi[ếe]ng|nh[ảa]y h[ồo]|ly khai|trốn khỏi cung|bắt đầu kiếp mới|kiếp mới|thoát|rời cung|quy ẩn|cạo đầu|đi tu/i;
const NEVER=/^(☰|menu)$|thiết lập|bảng vàng|sổ luân hồi|cùng hảo hữu|giữ sổ|nối sổ|âm hiệu|ám hiệu|xóa|reset|đặt lại/i;
async function snap(p){return p.evaluate(()=>{const W=innerWidth,H=innerHeight;
 const mgp=(()=>{try{return typeof KG82!=='undefined'&&KG82?KG82.phase:null}catch(e){return null}})();const gs=(()=>{try{return typeof S!=='undefined'&&S?{turn:S.turn,tuan:S.tuan,buoi:S.buoi,rank:S.rank,dead:!!S.dead,place:S.place,age:S.age,suc:S.suc,bac:S.bac,sung:S.sung,mg:!!S.mg,q:typeof Q!=='undefined'?Q.length:-1,o:S.origin&&S.origin.k,name:S.name,preg:!!S.preg,out:!!S.out}:null}catch(e){return {err:String(e)}}})();
 const els=[...document.querySelectorAll('button,[data-a],[onclick],.kbtn,.pct,a,[role=button],.tab,[data-k],[data-t]')];
 const out=[];for(const e of els){const r=e.getBoundingClientRect();if(r.width<4||r.height<4)continue;const s=getComputedStyle(e);if(s.visibility==='hidden'||s.display==='none'||+s.opacity<.05||e.disabled||e.getAttribute('aria-disabled')==='true'||/(^|\s)(dis|disabled|locked)(\s|$)/.test(e.className+''))continue;
  if(r.bottom<=0||r.top>=H||r.right<=0||r.left>=W)continue;let x=Math.round(r.left+r.width/2),y=Math.round(r.top+r.height/2);let h=document.elementFromPoint(x,y);
  const pop=h=>h&&h.closest&&h.closest('.kpop,#kpop,.kodm,.oc,.kobang,#kpinfo,[class*=kpinfo]');let alt=false;
  if(h&&e.contains(h)&&pop(h)&&!pop(e)){window.__centreHit=(window.__centreHit||0)+1;for(const [fx,fy] of [[.5,.25],[.3,.3],[.2,.5],[.2,.25],[.8,.25],[.4,.6]]){const x2=Math.round(r.left+r.width*fx),y2=Math.round(r.top+r.height*fy);const h2=document.elementFromPoint(x2,y2);if(h2&&e.contains(h2)&&!pop(h2)){x=x2;y=y2;h=h2;alt=true;break}}}
  const ok=!!h&&(h===e||e.contains(h))&&!(pop(h)&&!pop(e));let cov='';if(!ok&&h){cov=(h.tagName+'#'+h.id+'.'+(h.className+'').slice(0,30))}
  let top=e;while(top&&top.parentElement&&top.parentElement!==document.body)top=top.parentElement;
  out.push({l:Math.round(r.left),tp:Math.round(r.top),hh:Math.round(r.height),t:(e.textContent||'').trim().replace(/\s+/g,' ').slice(0,60),id:e.id,cls:(e.className+'').slice(0,30),x,y,ok,cov,top:top?(top.id||top.className+'').slice(0,20):'',w:Math.round(r.width),dis:/dis/.test(e.className+'')});}
 let ctr=document.elementFromPoint(W/2,H/2);while(ctr&&ctr.parentElement&&ctr.parentElement!==document.body)ctr=ctr.parentElement;
 const cr=ctr?ctr.getBoundingClientRect():null;return {mgp,gs,els:out,cxy:cr?[Math.round(Math.min(Math.max(cr.left+cr.width/2,5),W-5)),Math.round(Math.min(Math.max(cr.top+cr.height/2,5),H-5))]:[W/2,H/2],ctr:ctr?(ctr.id||ctr.className+'').slice(0,20):'',txt:(document.body.innerText||'').slice(0,0)}})}

async function playMG(p,log,issue,shot){
 const G=()=>{let s=0;for(let i=0;i<6;i++)s+=rnd();return (s-3)/Math.sqrt(.5)};
 const BOT={rt:70,px:.018,think:450,slip:.06,aim:35};
 const t0=Date.now();let acts=0,lastAct=Date.now();let hold=null;
 const peek=()=>p.evaluate(()=>{try{const q=KG82.peek();if(!q)return {ph:KG82.phase,q:null};const r=document.getElementById('kg82box').getBoundingClientRect();return {ph:KG82.phase,q,sc:Math.min(r.width,r.height),box:[r.left,r.top,r.width,r.height]}}catch(e){return {ph:'x',err:String(e)}}});
 const rect=sel=>p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},sel);
 const dragReal=async(D)=>{await p.mouse.move(D[0][0],D[0][1]);await p.mouse.down();for(let i=1;i<D.length;i++){const n=Math.max(1,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/14));for(let k=1;k<=n;k++){await p.mouse.move(D[i-1][0]+(D[i][0]-D[i-1][0])*k/n,D[i-1][1]+(D[i][1]-D[i-1][1])*k/n);await p.waitForTimeout(8)}}await p.mouse.up()};
 let kind='?';try{kind=await p.evaluate(()=>KG82.kind||KG82.k||'?')}catch(e){}
 log('MINIGAME start kind',kind);
 while(true){
  const st=await peek();if(st.ph!=='play')break;
  if(Date.now()-t0>12*60e3){issue('MG-TIMEOUT','mini-game '+kind+' still in play after 12min');break}
  const q=st.q;if(!q){await p.waitForTimeout(30);continue}
  const sc=st.sc||600,s=sc*BOT.px;
  try{
  if(q.at!=null){await p.waitForTimeout(Math.max(0,q.at+G()*BOT.aim));const st2=await peek();if(st2.ph!=='play')break;const q2=st2.q||q;await p.touchscreen.tap(q2.x,q2.y);acts++}
  else if(q.hold!==undefined){const want=q.hold;let x=q.x,y=q.y;if(q.hsel){const c=await rect(q.hsel);if(c){x=c[0];y=c[1]}}
    if(hold&&(!want||hold.k!==(q.hsel||'x'+Math.round((x||0)/60)))){await p.mouse.up();hold=null}
    if(want&&!hold&&x!=null){await p.waitForTimeout(Math.abs(G())*BOT.rt);await p.mouse.move(x,y);await p.mouse.down();hold={k:q.hsel||'x'+Math.round((x||0)/60)};acts++}
    await p.waitForTimeout(30);if(!q.drag&&!q.sel)continue}
  else if(Math.random()<BOT.slip&&st.box){await p.touchscreen.tap(st.box[0]+rnd()*st.box[2],st.box[1]+rnd()*st.box[3]);acts++;await p.waitForTimeout(BOT.think*(.5+rnd()))}
  else if(q.drag){const sa=q.aim!=null?q.aim:1;const D=q.drag.map(([x,y],i)=>[x+(i?G()*s*.8:G()*s*.4)*sa,y+(i?G()*s*.8:G()*s*.4)*sa]);await p.waitForTimeout((q.thinkMs||BOT.think)*(q.think>0?q.think:1)*(.6+.8*rnd()));await dragReal(D);acts++}
  else if(q.sel){const c=await rect(q.sel);if(c){await p.waitForTimeout(BOT.think*(.6+.8*rnd()));await p.touchscreen.tap(c[0],c[1]);acts++}else await p.waitForTimeout(100)}
  else if(q.x!=null){await p.waitForTimeout(((q.thinkMs||BOT.think)*(q.think>0?q.think:1))*(.6+.8*rnd()));await p.touchscreen.tap(q.x+G()*s,q.y+G()*s);acts++}
  else await p.waitForTimeout(50);
  }catch(e){log('MG act err',e.message);await p.waitForTimeout(100)}
 }
 if(hold){try{await p.mouse.up()}catch(e){}}
 log('MINIGAME end kind',kind,'acts',acts,'secs',((Date.now()-t0)/1000).toFixed(0));
 return acts}
async function main(){const sv=await serve();
 const PROF=process.env.PROFILE||'/home/user/wt/m5-run/profile';const FLAG=PROF+'-life.flag';
 const ctx=await chromium.launchPersistentContext(PROF,{viewport:{width:755,height:1000},hasTouch:true,deviceScaleFactor:1});
 if(process.env.LSIMPORT&&!fs.existsSync(FLAG)){const D=JSON.parse(fs.readFileSync(process.env.LSIMPORT,'utf8')).ls;await ctx.addInitScript((d)=>{try{if(!localStorage.getItem('__m5imp')){for(const k in d)localStorage.setItem(k,d[k]);localStorage.setItem('__m5imp','1')}}catch(e){}},D);fs.writeFileSync(FLAG,'1');log('LSIMPORT: save restored from handover dump (setup only)')}
 if(fs.existsSync(FLAG)){global.__reloading=1;global.__rlTry=0;global.__started=1;global.__pre='(restart)';log('RESUME: profile has a life; continuing it via title')}
 await ctx.addInitScript((seed)=>{let a=seed;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},SEED);
 let p=ctx.pages()[0]||await ctx.newPage();const errs=[];const hook=pg=>{pg.on('pageerror',e=>{const m=e.message+' '+(e.stack||'').split('\n').slice(1,2).join('');errs.push(m);issue('ERROR',m)});pg.on('dialog',d=>{log('DIALOG',d.message());d.dismiss().catch(()=>{})})};hook(p);
 await p.goto('http://127.0.0.1:'+(process.env.PORT||8765)+'/',{waitUntil:'domcontentloaded'});
 let tap=0,lastSig='',lastProg=Date.now(),lastYear=-1,reloads=0,shotN=0,deadSeen={},buoiN=0,lastBuoiSig='',stuckN=0,lastStuckLog=0;
 const shot=async(tag)=>{const f=OUT+'/shots/'+String(++shotN).padStart(4,'0')+'-'+tag.replace(/[^\w]+/g,'_').slice(0,30)+'.png';await p.screenshot({path:f}).catch(()=>{});return f};
 const doTap=async(e,why)=>{tap++;
  {/* repeated tap on the same button without effect: try other points of the button (a person taps the title, not the middle), then the dimmed backdrop (closes a popover) */
   const k0=e.t+'@'+e.x+','+e.y;global.__r2=global.__r2||{};global.__r2[k0]=(global.__r2[k0]||0)+1;const n=global.__r2[k0];
   if(n>=2&&e.w>=150&&e.l!=null){const P=[[.3,.25],[.15,.5],[.5,.15],[.8,.25],[.3,.8]];const q=P[(n-2)%P.length];e={...e,x:Math.round(e.l+e.w*q[0]),y:Math.round(e.tp+e.hh*q[1])};log('ALT-POINT',JSON.stringify(e.t.slice(0,25)),'->',e.x+','+e.y)}
   if(n>=6&&n%3===0){log('ESCALATE backdrop tap');await p.touchscreen.tap(378,225);await p.waitForTimeout(500)}
   if(tap%50===0)global.__r2={}}
{const k=e.t+'@'+e.x+','+e.y;global.__rep=global.__rep||{};global.__rep[k]=(global.__rep[k]||0)+1;if(!e.t||global.__rep[k]>=4){/* same button over and over without leaving: ban it for a while, shoot once */if(global.__rep[k]===4){const f=await shot('loop');global.__ldump=global.__ldump||0;global.__lastLoopAt=Date.now();log('LOOP',JSON.stringify(e.t),'@'+e.x+','+e.y,f)}global.__ban=global.__ban||{};if(global.__rep[k]>=4)global.__ban[k]=Date.now()+25e3}if(tap%40===0)global.__rep={}}
  if(tap%100===0){const f=await shot('t'+tap);log('SHOT',f)}log('TAP',JSON.stringify(e.t),'@'+e.x+','+e.y,why||'');await p.touchscreen.tap(e.x,e.y);await p.waitForTimeout(+process.env.WAIT||700)};
 const dead=new Set();
 while(true){
  let s;try{s=await snap(p)}catch(e){log('snap fail',e.message);await p.waitForTimeout(1000);continue}
  const g=s.gs;
  if(s.mgp==='play'){await playMG(p,log,issue,shot);lastProg=Date.now();continue}
  if(g&&g.err)log('gs err',g.err);
  const sig=g?JSON.stringify([g.turn,g.tuan,g.buoi,g.bac,g.sung,g.suc,g.danh,g.rank,g.dead,g.q]):'nolife'+s.ctr;
  if(sig!==lastSig){lastSig=sig;lastProg=Date.now();global.__sc=0}
  if(g&&!g.dead){const yr=Math.floor(g.turn/12);if(lastYear<0)lastYear=yr;if(!global.__flag){global.__flag=1;fs.writeFileSync(FLAG,'1')}}
  if(g){const bs=g.turn+'_'+g.tuan+'_'+g.buoi;if(bs!==lastBuoiSig){lastBuoiSig=bs;buoiN++;global.__act=0;global.__bud=1+Math.floor(rnd()*3);if(buoiN%20===0){const f=await shot('buoi'+buoiN);log('REVIEWSHOT',f)}if(buoiN%25===0)log('STATE',JSON.stringify(g),'buoi#',buoiN,'taps',tap)}}
  if(g&&g.dead&&!deadSeen[g.turn+g.name]){deadSeen[g.turn+g.name]=1;log('DEAD STATE',JSON.stringify(g));await shot('dead')}
  if(Date.now()-(global.__lsd||0)>15*60e3&&g&&!global.__reloading){global.__lsd=Date.now();try{const d=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o});fs.writeFileSync(OUT+'/ls-dump.json',JSON.stringify({at:new Date().toISOString(),state:g,ls:d}));log('LSDUMP',JSON.stringify(d).length,'bytes')}catch(e){log('LSDUMP fail',e.message)}}
  /* hourly progress */
  if(Date.now()-(global.__h||T0)>3600e3){global.__h=Date.now();const l=ts()+' PROGRESS '+JSON.stringify(g)+' buoi#'+buoiN+' taps '+tap;fs.appendFileSync(OUT+'/progress.log',l+'\n')}
  /* stuck */
  const idle=(Date.now()-lastProg)/60000;
  if(idle>=15&&Date.now()-lastStuckLog>15*60e3){lastStuckLog=Date.now();stuckN++;const f=await shot('stuck');issue('STUCK','no progress '+idle.toFixed(0)+'min state '+JSON.stringify(g)+' shot '+f+' els '+JSON.stringify(s.els.filter(e=>e.ok).map(e=>e.t)));}
  if(idle>=8&&!global.__reloading&&g&&Date.now()-(global.__lastUnstick||0)>8*60e3){global.__lastUnstick=Date.now();const f=await shot('softlock');issue('SOFTLOCK','no state progress '+idle.toFixed(0)+'min ctr='+s.ctr+' state '+JSON.stringify(g)+' ok-els '+JSON.stringify(s.els.filter(e=>e.ok).map(e=>e.t.slice(0,30)))+' shot '+f+' -> unstick by TRUE RELOAD');
    global.__pre=JSON.stringify([g.turn,g.tuan,g.buoi,g.rank,g.age,g.bac,g.sung,g.suc,g.danh]);global.__reloading=1;global.__rlTry=0;lastProg=Date.now();try{await p.reload({waitUntil:'domcontentloaded'})}catch(e){issue('RELOAD-FAIL',e.message)}continue}
  const okE=s.els.filter(e=>e.ok);global.__seen=global.__seen||{};if(s.ctr&&!global.__seen[s.ctr]){global.__seen[s.ctr]=1;const f=await shot('new_'+s.ctr);log('NEWSCREEN',s.ctr,f)}
  /* dead buttons: only report buttons on the same top layer as the screen centre that are covered */
  {const seen={};for(const e of s.els){if(e.ok||!e.cov||e.top!==s.ctr||!e.t||e.w<30)continue;if(/^(IMG|SPAN|P)#/.test(e.cov)||/kpop|dlg|modal|kpinfo|krailb|krb|past|kdscroll|kpopr|opts|km-gate|ov\b/.test(e.cov))continue;const k=e.t+'|'+e.cov;seen[k]=1;global.__dc=global.__dc||{};global.__dc[k]=(global.__dc[k]||0)+1;if(global.__dc[k]===6){const f=await shot('dead');issue('DEAD BUTTON','screen '+s.ctr+' label '+JSON.stringify(e.t)+' covered by '+e.cov+' (6 consecutive snaps) shot '+f)}}for(const k in global.__dc)if(!seen[k])delete global.__dc[k]}
  if(okE.length){global.__noOk=0}
  if(!okE.length&&g&&!global.__reloading){global.__noOk=global.__noOk||Date.now();if(Date.now()-global.__noOk>90e3&&Date.now()-(global.__lastUnstick||0)>120e3){global.__lastUnstick=Date.now();global.__noOk=0;const f=await shot('softlock');issue('SOFTLOCK','no tappable element for 90s ctr='+s.ctr+' state '+JSON.stringify(g)+' shot '+f+' -> unstick by TRUE RELOAD');global.__pre=JSON.stringify([g.turn,g.tuan,g.buoi,g.rank,g.age,g.bac,g.sung,g.suc,g.danh]);global.__reloading=1;global.__rlTry=0;lastProg=Date.now();try{await p.reload({waitUntil:'domcontentloaded'})}catch(e){issue('RELOAD-FAIL',e.message)}continue}}
  if(!okE.length){if(Date.now()-(global.__w||0)>30000){global.__w=Date.now();log('WAIT nothing tappable; els',s.els.length,'ctr',s.ctr,JSON.stringify(g))}global.__nw=(global.__nw||0)+1;if(global.__nw>=4&&s.ctr&&!/^kload$/.test(s.ctr)&&g){log('FALLBACK tap on info layer',s.ctr);global.__nw=0;await doTap({t:'(info layer '+s.ctr+')',x:s.cxy[0],y:s.cxy[1]},'dismiss');continue}await p.waitForTimeout(1000);continue}
  global.__nw=0;/* decide */
  /* TRUE RELOAD once per in-game year, at a calm moment (game layer, no mini-game, no queued card) */
  if(g&&!g.dead&&!global.__reloading){const yr=Math.floor(g.turn/12);if(lastYear<0)lastYear=yr;
    if((yr>lastYear||(process.env.RELTEST&&buoiN>=+process.env.RELTEST&&reloads===0))&&s.ctr==='game'&&s.mgp!=='play'&&g.q===0&&!g.mg){global.__pre=JSON.stringify([g.turn,g.tuan,g.buoi,g.rank,g.age,g.bac,g.sung,g.suc,g.danh]);global.__preg=g;lastYear=yr;reloads++;
      log('RELOAD #'+reloads+' (year '+yr+') before',global.__pre);await shot('prereload');await p.waitForTimeout(1500);global.__reloading=1;global.__rlTry=0;
      try{await p.reload({waitUntil:'domcontentloaded'})}catch(e){issue('RELOAD-FAIL',e.message)}continue}}
  if(global.__reloading&&!g){/* title after true reload: continue the saved life, never start a new one */
    global.__rlTry=(global.__rlTry||0)+1;
    const t1=okE.find(e=>/^Chơi một mình/.test(e.t));const slotOpen=okE.some(e=>/Giữ sổ/.test(e.t));
    if(slotOpen){const cont=okE.find(e=>/^(Chơi tiếp|Tiếp tục|Vào|Nối|Tiếp)\b/.test(e.t)&&!/Nối sổ/.test(e.t));
      log('RELOAD slot buttons',JSON.stringify(okE.map(e=>e.t)));
      if(cont){await doTap(cont,'reload-continue');continue}
      if(global.__rlTry>12){const f=await shot('nosave');issue('SAVE-LOST','after true reload the slot offers no continue button: '+JSON.stringify(okE.map(e=>e.t))+' shot '+f);global.__reloading=0;global.__rlTry=0;continue}await p.waitForTimeout(800);continue}
    if(t1){await doTap(t1,'reload-title');continue}await p.waitForTimeout(800);continue}
  if(global.__reloading&&g){const post=JSON.stringify([g.turn,g.tuan,g.buoi,g.rank,g.age,g.bac,g.sung,g.suc,g.danh]);log('RELOAD done; after',post);if(post!==global.__pre&&global.__pre!=='(restart)')issue('SAVE-DRIFT','true reload #'+reloads+': before '+global.__pre+' after '+post);global.__reloading=0}
  if(!g||g.dead){/* title flow: start / continue a life with real taps */
    const t1=okE.find(e=>/^Chơi một mình/.test(e.t));const t2=okE.find(e=>/^Bắt đầu kiếp mới/.test(e.t)||/^(Tiếp|Chơi tiếp|Vào)/.test(e.t));
    if(!g&&!global.__reloading&&!global.__started&&t2&&okE.some(e=>/Giữ sổ/.test(e.t))){global.__started=1;await doTap(g?t2:(okE.find(e=>/^Chơi tiếp|^Tiếp/.test(e.t))||t2),'title-slot');continue}
    if(!g&&!global.__started&&t1){await doTap(t1,'title');continue}
  }
  if(global.__ldump>=0&&global.__ldump<3&&global.__lastLoopAt&&Date.now()-global.__lastLoopAt<5000){global.__ldump++;global.__lastLoopAt=0;fs.writeFileSync(OUT+'/loopdump-'+global.__ldump+'.json',JSON.stringify({ctr:s.ctr,g,els:s.els},null,0));await shot('loopdump'+global.__ldump)}
  global.__ban=global.__ban||{};const key=e=>e.t+'@'+e.x+','+e.y;
  const INFO=/^(!|\?|Rất vững|Vững|Có cơ|Tùy duyên|Khó lường|Hiểm|Mong manh|Rất thấp|Thấp|Vừa|Khá chắc|Chắc|Rất chắc|Nắm chắc|Liều|Khó|Năm ăn năm thua|Gợi ý|Hướng dẫn)$/;
  let cand=okE.filter(e=>!INFO.test(e.t)&&!NEVER.test(e.t)&&!EXIT.test(e.t)&&!((global.__ban[key(e)]||0)>Date.now()));
  if(s.ctr==='game'){const ct=cand.filter(e=>e.t);if(ct.length)cand=ct}
  const exitHit=okE.filter(e=>EXIT.test(e.t));
  if(!cand.length){if(exitHit.length){log('EXIT-ONLY (real ending per OD 05:40Z, not a bug)'+JSON.stringify(exitHit.map(e=>e.t)));await shot('exitonly');await doTap(exitHit[0],'FORCED-exit-only')}else{await p.waitForTimeout(1000)}continue}
  if(process.env.V==='2')log('CAND',JSON.stringify(cand.map(e=>e.t+'@'+e.top)));
  /* random profile: prefer modal/dialog/option buttons; if only main-screen UI, mix */
  const candT=cand.filter(e=>e.t);const cand0=cand;
  if(s.ctr!=='game'&&s.mgp!=='play'&&s.els.some(e=>/^Kéo xuống/.test(e.t))&&cand.every(e=>!e.t||/^(✕|×|x|Đóng|Kéo xuống)$/i.test(e.t))&&(global.__sc||0)<6){global.__sc=(global.__sc||0)+1;log('SCRL dialog has «Kéo xuống» hint; wheel-scroll',global.__sc);await p.mouse.move(378,650);await p.mouse.wheel(0,350);await p.waitForTimeout(600);continue}
  const closers=cand.filter(e=>/^(✕|×|x|Đóng|Xong|Tiếp|Tiếp tục|OK|Ok|Được|Đã rõ|Hiểu)$/i.test(e.t));
  let nonClose=cand.filter(e=>!closers.includes(e));if(s.ctr!=='game'&&s.mgp!=='play'){const tx=nonClose.filter(e=>e.t);if(tx.length)nonClose=tx;else if(closers.length)nonClose=[]}
  let c;
  const nextB=cand.find(e=>/Sang buổi/.test(e.t));
  if(process.env.PROBE&&s.ctr==='game'&&g){global.__pn=(global.__pn||0)+1;if(global.__pn===3){const h=okE.find(e=>e.t==='Hành sự');if(h){await doTap(h,'probe');await p.waitForTimeout(2000);const s2=await snap(p);fs.writeFileSync(OUT+'/probe2.json',JSON.stringify(s2.els.filter(e=>e.ok)))}fs.writeFileSync(OUT+'/probe.json',JSON.stringify(s.els.filter(e=>e.ok),null,0));await shot('probe');console.log('PROBE DONE');process.exit(0)}}
  {const ready=cand.find(e=>/^Sẵn sàng/.test(e.t));const skip=cand.find(e=>/^Bỏ qua/.test(e.t));if(ready){if(skip&&rnd()<.1){log('MG skip (10% rule)');await doTap(skip,'mg-skip');continue}await doTap(ready,'mg-ready');continue}}
  {const PRI=cand.find(e=>/^(Nhận|Tiếp theo|Tiếp\b|Tạ ơn|Xong|Đồng ý|Đã rõ|Vào cung|Vào điện|Nhận thân phận)/.test(e.t));if(PRI&&rnd()<.92){await doTap(PRI,'priority');continue}}
  const nx=cand.find(e=>/^Sang (buổi|ngày)/.test(e.t));
  if(s.ctr==='game'){const TABN=/^(Hành sự|Dư đồ|Hậu cung|Giao tình|Hoàng tự|Tư trang|Tài nghệ|Mệnh truyện)$/;
    const cards=nonClose.filter(e=>e.w>=150&&e.y>245&&e.y<925&&e.t&&!TABN.test(e.t)&&!/^Tâm trạng/.test(e.t));
    const prog=cand.find(e=>/^Tiếp\b/.test(e.t)||/^(Tạ ơn|Đã rõ|Xong|Hiểu rồi|Được)$/.test(e.t));
    const inAct=okE.some(e=>/^Về phòng/.test(e.t));const hs=okE.find(e=>e.t==='Hành sự');
    const chips=nonClose.filter(e=>e.y>170&&e.y<205&&e.t);
    if(prog&&rnd()<.9)c=prog;
    else if((global.__act||0)>=(global.__bud||2)&&nx)c=nx;
    else if(!inAct&&hs&&rnd()<.7)c=hs;
    else if(cards.length&&rnd()<.85){c=pick(cards);global.__act=(global.__act||0)+1}
    else if(chips.length&&rnd()<.15)c=pick(chips);
    else if(nx)c=nx;
    else if(closers.length)c=pick(closers);
    else if(inAct){log('DBG game-inAct no card/nx: ok=',okE.length,'cand=',cand.length,'cards=',cards.length,'nx=',!!nx,JSON.stringify(okE.filter(e=>e.y>200&&e.y<930).map(e=>[e.t.slice(0,25),e.w,e.y])).slice(0,600));c=okE.find(e=>/^Về phòng/.test(e.t))||pick(cand)}
    else{const f=nonClose.filter(e=>e.t&&e.y>175);c=f.length?pick(f):pick(cand.filter(e=>e.t).length?cand.filter(e=>e.t):cand)}}
  else if(nonClose.length&&rnd()<.8)c=pick(nonClose);else if(closers.length)c=pick(closers);else c=pick(cand);
  await doTap(c,'');
 }
}
main().catch(e=>{console.error(e);process.exit(1)});
