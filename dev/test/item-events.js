/* KIT §64 items in events (owner 15/11 ~18:10Z, review/item-events).
   usage: node dev/test/sw-serve.js <port> <repo root>  (another shell);  node dev/test/item-events.js http://127.0.0.1:<port>/ <outdir> [WxH,WxH…] [save.json]
   Per size: opens real event dialogs that carry an item (gift in: giftin; a poisoned / plain dish: pgin; goods events e68 + econ STIP_EV;
   story text dialogs with a letter / token / dish / jade) and checks:
     - the item frame (kitItem md, grade class kigN = kitItemInfo grade) is in the dialog: on the banner or at the top of the text column,
       inside the dialog box, not covering the options;
     - every option of the dialog got its act (data-kia) as the engine says;
     - choosing: keep → one REAL new entry of that item in S.inv, no second reveal (kitGain / kitReward) for it, the flight runs
       (IEV.log) and ends ≤ 1.6 s; back / give / burn / tear / smash / pour / well / bury / use → the act runs, nothing added;
       a tap during the animation finishes it at once (#kievcatch gone, no .kievfx left);
     - no page error, no horizontal overflow, options still in cost mode (.kb rows).
   Exit 1 on a miss. Old save (optional 4th arg): loads, opens a gift dialog, same checks. */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');const [,,BASE,OUT,SZ,SAVE]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const SIZES=(SZ||'755x1000,1000x755,1180x820,1366x1024,844x390').split(',');
(async()=>{const b=await chromium.launch();let fails=[];const rows=[];
for(const sz of SIZES){const [W,H]=sz.split('x').map(Number);const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__nlInner=1});
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&window.kitItemFx&&window.ievOf,null,{timeout:0});await p.waitForTimeout(2000);
 await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(async save=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;
  let oldOk=null;if(save){try{localStorage.setItem(SK(3),save);const d=loadSlot(3);SLOT=3;quiet=true;deser(d);quiet=false;deal();oldOk=!!S}catch(e){quiet=false;oldOk='ERR '+e.message}window.__old=oldOk}if(!save&&(typeof S==='undefined'||!S||S.dead||isSrv()))for(let i=0;i<200;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
  if(save){try{showModal();window.__oldTag=!!document.querySelector('#modal:not([hidden]) .kiev .kitem')}catch(e){window.__oldTag='ERR '+e.message}}
  Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());render()},SAVE?fs.readFileSync(SAVE,'utf8'):null);
 if(SAVE){const o=await p.evaluate(()=>({old:window.__old,tag:window.__oldTag}));rows.push([sz,'old save','','',JSON.stringify(o),o.old===true&&o.tag===true?'ok':'FAIL']);if(!(o.old===true&&o.tag===true))fails.push(`${sz} old save: ${JSON.stringify(o)}`)}
 await p.waitForTimeout(800);
 /* the cases: build a dialog, show it */
 const CASES=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.out);const L=[];
  L.push({id:'giftin-keep',mk:`pushDil(mkP("giftin",{f:key(RV(${v.id})),e:{k:"vongngoc",from:key(RV(${v.id}))}}),"Quà tặng")`,pick:'Nhận',want:'keep',k:'vongngoc'});
  L.push({id:'giftin-back',mk:`pushDil(mkP("giftin",{f:key(RV(${v.id})),e:{k:"tramngoc",from:key(RV(${v.id}))}}),"Quà tặng")`,pick:'Trả lại',want:'back',k:'tramngoc'});
  /* r1: "Đem đến Thái y viện" = probe (the outcome decides keep / give away; never flies to the giver) */
  L.push({id:'giftin-probe',mk:`pushDil(mkP("giftin",{f:key(RV(${v.id})),e:{k:"ngocboi",from:key(RV(${v.id}))}}),"Quà tặng")`,pick:'Đem đến',want:'probe',k:'ngocboi',toFig:false});
  L.push({id:'pgin-back',mk:`pushDil(mkP("pgin",{f:key(RV(${v.id})),dn:"Yến sào",pk:null,o:0,e:{k:"yensao",from:key(RV(${v.id}))}}),"Quà tặng")`,pick:'Trả lại',want:'back',k:'yensao'});
  L.push({id:'pgin-keep',mk:`pushDil(mkP("pgin",{f:key(RV(${v.id})),dn:"Yến sào",pk:null,o:0,e:{k:"yensao",from:key(RV(${v.id}))}}),"Quà tặng")`,pick:'Nhận ngay',want:'keep',k:'yensao'});
  L.push({id:'tsbBul-give',mk:`S.inv.push({k:"tramngoc"});pushDil(mkP("tsbBul",{a:${v.id},k:"doi",ix:S.inv.length-1,n:1}),"Bị làm khó")`,pick:'Giao',want:'give',k:'tramngoc'});
  /* a real E68 goods event (econ STIP_EV) */
  try{for(const [id,re,k] of STIP_EV){const s=E68I[id];if(!s)continue;let pp=null;try{pp=s.pp?s.pp():{}}catch(e){}if(!pp)continue;const V=s.v||[""];const vi=V.findIndex(t=>re.test(t));if(vi<0)continue;pp.vi=vi;
    L.push({id:'e68-'+id,mk:`pushDil(mkP("e68${id}",${JSON.stringify(pp)}),"Có người đến")`,pick:0,want:'keep',k});if(L.length>=6)break}}catch(e){}
  const story=(t,h,o,pick,want,k)=>L.push({id:'story-'+want,mk:`Q.push({t:${JSON.stringify(t)},who:pMaid(),h:${JSON.stringify(h)},opts:${JSON.stringify(o.map(n=>({n,fx:{}})))}})`,pick,want,k});
  story("Bức thư không ký tên","<p>Một bức thư lạ đến tay ngươi, kẹp trong hộp điểm tâm. Nét chữ quen: người ấy hỏi ngươi có ổn không.</p>",["Đốt thư, không hồi âm","Giữ lại bức thư"],0,'burn','thu');
  story("Bức thư không ký tên","<p>Một bức thư lạ đến tay ngươi. Nét chữ quen.</p>",["Xé thư, vứt đi","Giữ lại bức thư"],1,'keep','thu');
  story("Mật thư","<p>Cung nữ dâng lên một phong mật thư niêm sáp đỏ, nhặt được dưới gốc mai.</p>",["Xé nát mật thư","Trình lên Hoàng hậu"],0,'tear','matthu');
  story("Tín vật cũ","<p>Người nhà gửi vào một tín vật của người xưa.</p>",["Chôn tín vật dưới gốc lê","Gửi trả tín vật"],0,'bury','tinvat');
  story("Chén thuốc lạ","<p>Có kẻ mang đến một chén thuốc, nói là Thái y viện sắc cho ngươi.</p>",["Đổ đi","Uống"],0,'pour','chenthuoc');
  story("Khăn tay","<p>Ngươi nhặt được một chiếc khăn tay thêu mai bên giếng.</p>",["Ném xuống giếng","Cất đi"],0,'well','khantay');
  story("Chiếc vòng","<p>Có người lén đặt chiếc vòng ngọc lên bàn ngươi.</p>",["Đập vỡ chiếc vòng","Nhận lấy"],0,'smash','vongngoc');
  story("Bát canh","<p>Ngự thiện phòng mang sang một bát canh hầm.</p>",["Uống ngay","Đem cho cung nữ"],0,'use','batcanh');
  story("Lệnh bài","<p>Thị vệ trao cho ngươi một lệnh bài ra vào cửa cung.</p>",["Dâng lại cho Hoàng thượng","Giữ lấy"],0,'give','lenhbai');
  /* r1: give flies to the person shown only when the option names that person */
  L.push({id:'story-give-other',mk:`Q.push({t:"Bát canh",who:pMaid(),h:"<p>Ngự thiện phòng mang sang một bát canh hầm.</p>",opts:[{n:"Đem cho Hoàng hậu",fx:{}},{n:"Uống ngay",fx:{}}]})`,pick:0,want:'give',k:'batcanh',toFig:false});
  try{const mn=S.maid&&S.maid.name;if(mn)L.push({id:'story-give-named',mk:`Q.push({t:"Bát canh",who:pMaid(),h:"<p>Ngự thiện phòng mang sang một bát canh hầm.</p>",opts:[{n:${JSON.stringify("Đưa cho "+mn)},fx:{}},{n:"Uống ngay",fx:{}}]})`,pick:0,want:'give',k:'batcanh',toFig:true})}catch(e){}
  return L});
 let n=0;
 for(const C of CASES){const r=await p.evaluate(async C=>{const wait=t=>new Promise(o=>setTimeout(o,t));Q.length=0;document.querySelectorAll('.kmov,#kmrew').forEach(e=>e.remove());try{kmBusy=false;KMQ.length=0}catch(e){}
   S.inv=(S.inv||[]).filter(e=>e&&e.k!==C.k);render();await wait(100);eval(C.mk);showModal();await wait(500);
   const M=document.getElementById('modal');if(!M||M.hidden)return{err:'no dialog'};const dlg=M.querySelector('.dlg').getBoundingClientRect();
   const tag=M.querySelector('.kiev .kitem');const tr=tag?tag.getBoundingClientRect():null;const R=ievOf(Q[0]);
   const B=[...M.querySelectorAll('.opts [data-m]')];const opts=B.map(b=>({m:b.dataset.m,n:(b.querySelector('.kan')||b).textContent.trim(),a:b.dataset.kia||'',cost:!!b.querySelector('.kb')}));
   const ob=B.map(b=>b.getBoundingClientRect());const cover=tr&&ob.some(o=>o.width&&tr.left<o.right&&tr.right>o.left&&tr.top<o.bottom&&tr.bottom>o.top);
   const inside=tr&&tr.left>=dlg.left-1&&tr.right<=dlg.right+1&&tr.top>=dlg.top-1&&tr.bottom<=dlg.bottom+1;const bn=tag&&tag.closest('.kiev-ban')?tag.closest('.ksart').getBoundingClientRect():null;const inBan=!bn||tr.left>=bn.left-1&&tr.right<=bn.right+1&&tr.top>=bn.top-1&&tr.bottom<=bn.bottom+1;
   const gcls=tag?([...tag.classList].find(x=>/^kig\d$/.test(x))||''):'';const over=document.documentElement.scrollWidth>innerWidth+1;
   return{tag:!!tag,where:tag?(tag.closest('.kiev').classList.contains('kiev-ban')?'banner':'text'):'',gcls,want:R?'kig'+R.I.grade:'',name:R?R.I.name:'',inside,inBan,cover,opts,over,box:[Math.round(tr?tr.width:0)]}},C);
  if(r.err){if(C.id.startsWith('e68-'))rows.push([sz,C.id,'','','(variant did not build: skipped)','']);else fails.push(`${sz} ${C.id}: ${r.err}`);continue}
  await p.evaluate(async()=>{for(let i=0;i<40;i++){const L=[...document.querySelectorAll('#modal img')];if(L.every(x=>x.complete))break;await new Promise(o=>setTimeout(o,200))}});
  if(n<3||C.id.startsWith('story-burn')||C.id==='giftin-keep')await p.screenshot({path:`${OUT}/${sz}-${C.id}.jpg`,type:'jpeg',quality:55});
  /* choose: the option button's own click (the shared machine is slow: the animation is sampled by pausing it, not by wall time) */
  const ix=typeof C.pick==='number'?C.pick:r.opts.findIndex(o=>o.n.startsWith(C.pick));
  if(ix<0){fails.push(`${sz} ${C.id}: option ${C.pick} not found (${r.opts.map(o=>o.n).join(' | ')})`);continue}
  const act=r.opts[ix].a;const shotMid=C.id==='story-burn'||C.id==='story-well'||C.id==='story-tear';
  const mid=await p.evaluate(({m,shot})=>{const g0={g:(KFX.gains||[]).length,rw:KFX.rewards||0};window.__g0=g0;const b=document.querySelector(`#modal .opts [data-m="${m}"]`);b.click();
   const L=document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.kievfx,.kievring,.kievmound'));
   const n=document.querySelectorAll('.kievfx').length;if(shot)L.forEach(a=>{try{const d=a.effect.getComputedTiming().duration;a.pause();a.currentTime=d*.45}catch(e){}});return{n,anims:L.length,catcher:!!document.getElementById('kievcatch')}},{m:r.opts[ix].m,shot:shotMid});
  if(shotMid)await p.screenshot({path:`${OUT}/${sz}-${C.id}-mid.jpg`,type:'jpeg',quality:55});
  let skipOk=true;if(C.id==='story-tear')skipOk=await p.evaluate(async()=>{kitItemFxSkip();kitItemFx('burn',kitItemInfo('thu'),{from:{left:200,top:200,width:72,height:72}});const c=document.getElementById('kievcatch');if(!c)return false;c.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));await new Promise(o=>setTimeout(o,50));return !document.getElementById('kievcatch')&&!document.querySelector('.kievfx')});
  await p.evaluate(()=>{document.getAnimations().forEach(a=>{try{if(a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.kievfx,.kievring,.kievmound'))a.finish()}catch(e){}})});await p.waitForTimeout(400);
  const after=await p.evaluate(({k})=>{const g0=window.__g0;return{left:document.querySelectorAll('.kievfx,#kievcatch').length,last:IEV.last,gains:(KFX.gains||[]).length-g0.g,rw:(KFX.rewards||0)-g0.rw,got:S.inv.filter(e=>e&&e.k===k).length}},{k:C.k});
  const bad=[];if(!r.tag)bad.push('no item frame');if(r.gcls!==r.want)bad.push(`grade ${r.gcls}≠${r.want}`);if(!r.inside)bad.push('frame outside dialog');if(!r.inBan)bad.push('frame sticks out of the banner (r1)');if(r.cover)bad.push('frame covers options');
  if(act!==C.want)bad.push(`act ${act}≠${C.want}`);if(C.want==='probe'&&!(after.last&&['keep','give'].includes(after.last.act)))bad.push('probe → '+JSON.stringify(after.last));
  if(C.toFig!==undefined&&after.last&&after.last.to!==C.toFig)bad.push(`give target ${after.last.to}≠${C.toFig}`);if(!mid.n||!mid.anims||!mid.catcher)bad.push('no animation '+JSON.stringify(mid));if(after.left)bad.push('animation left over');if(!skipOk)bad.push('tap did not skip');
  if(C.want==='keep'&&after.got!==1)bad.push(`keep: ${after.got} entries of ${C.k}`);if(C.want==='keep'&&(after.gains>0||after.rw>0))bad.push('second reveal');
  if(C.want!=='keep'&&C.want!=='probe'&&after.got>0&&!C.id.startsWith('pgin'))bad.push('item added on '+C.want);if(r.over)bad.push('h-overflow');if(r.opts.some(o=>!o.cost))bad.push('option not in cost mode');
  rows.push([sz,C.id,r.name,r.where,r.opts.map(o=>`${o.n}→${o.a||'—'}`).join(' · '),bad.join('; ')||'ok']);if(bad.length)fails.push(`${sz} ${C.id}: ${bad.join('; ')}`);n++;
  await p.evaluate(()=>{Q.length=0;showModal();document.querySelectorAll('.kmov,#kmrew').forEach(e=>e.remove())})}
 if(errs.length)fails.push(`${sz}: page errors ${errs.slice(0,3).join(' | ')}`);
 /* the kit page sample */
 await c.close()}
for(const r of rows)console.log(r.join(' | '));
console.log(fails.length?'FAIL\n'+fails.join('\n'):'PASS');await b.close();process.exit(fails.length?1:0)})();
