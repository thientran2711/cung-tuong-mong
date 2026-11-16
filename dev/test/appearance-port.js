/* review/appearance-port: face-condition overlays (ill, poison, slap, rash) + penalty, on the current figure system.
   usage: node dev/test/appearance-port.js <page url> <W>x<H>@dpr [outdir] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=(SZ||'1180x820@1').split('@');const [W,H]=WH.split('x').map(Number);
if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),serviceWorkers:'block',reducedMotion:'reduce',hasTouch:W<1100,isMobile:W<1100});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const bad=[];p.on('response',r=>{if(r.status()>=400&&/img\//.test(r.url()))bad.push(r.status()+' '+r.url().slice(-60))});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.evaluate(()=>{window.KP=(q,s)=>{const f=kitFace(q);return s==='lg'?pframe(f):mdH(f,s||'')}});/* jbook.js redefines kitPortrait() as an orientation check, so build the portrait from kitFace/pframe/mdH */await p.waitForTimeout(5000);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});
 const tag=SZ.replace(/[@x]/g,'_');const R={size:SZ,steps:[]};
 const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/ap-${n}-${tag}.jpg`,type:'jpeg',quality:70})};
 const st=()=>p.evaluate(()=>{const f=[...document.querySelectorAll('.kfx>*,.kfxf>*')].map(e=>e.className.baseVal||e.className).filter(Boolean);return {sac:effSac(S),layers:f,ovx:document.documentElement.scrollWidth>innerWidth+2}});
 R.base=await st();
 /* 1 rash (her), each level */
 for(const sev of [1,2,3]){const r=await p.evaluate(async sev=>{S.rash=null;rashGive(S,sev,'thử');render();await new Promise(r=>setTimeout(r,800));return{sac:effSac(S),chip:rshOf(S).chip}},sev);R.steps.push(['rash',sev,r,(await st()).layers.join(',')]);if(sev===3)await shot('rash3')}
 /* veil works for a rash */
 R.veil=await p.evaluate(()=>{const k=vlKey(Math.min(8,wdPOf(S)),0);S.inv=S.inv||[];S.inv.push({k,src:'cu'});const ix=S.inv.length-1;const n=vlWear(S,ix);render();return{worn:n,need:vlNeed(S),sac:effSac(S),lost:rshOf(S).lost,veiled:rshOf(S).veiled}});
 await p.waitForTimeout(600);R.veil.layers=(await st()).layers.join(',');await shot('rash-veil');
 await p.evaluate(()=>{vlOff(S);S.rash=null;render()});
 /* 2 ill / poison / slap / penalty */
 const base=await p.evaluate(()=>effSac(S));
 for(const [k,fn] of [['ill',()=>{S.sick=2}],['poison',()=>{pzGive(S,2,'thử',null)}],['slap',()=>{slapGive(S,rivals[0],'thử')}],['pen',()=>{penGive(S,'truong','thử')}]]){
  await p.evaluate(fn=>{S.sick=0;S.pz=null;S.slap=null;S.pen=null;S.rash=null;new Function('return '+fn)()();render()},fn.toString());await p.waitForTimeout(900);const s=await st();R.steps.push([k,{d:base-s.sac},s.layers.join(','),s.ovx]);await shot(k)}
 /* a consort with a rash: layer in her card, chip only if known */
 R.npc=await p.evaluate(async()=>{const v=liveRivals(true)[0];S.sick=0;S.pz=null;S.slap=null;S.pen=null;rashGive(v,2,'thử');v.pz=null;tab='rv';PG.rv=rivals.indexOf(v);render();await new Promise(r=>setTimeout(r,1200));return{name:v.name,known:KIT_RASH.on(v),layers:[...document.querySelectorAll('.kfx>*,.kfxf>*')].map(e=>e.className.baseVal||e.className).join(',')}});await shot('npc');
 /* weekly passes: healing + cards, no errors */
 R.week=await p.evaluate(async()=>{S.rash=null;rashGive(S,3,'thử');pzGive(S,2,'thử',null);slapGive(S,rivals[0],'');penGive(S,'quy','');for(let i=0;i<6;i++){try{if(typeof nextWeek==='function')nextWeek();else endTurn()}catch(e){return 'ERR '+e.message}}return{rash:!!S.rash,pz:!!S.pz,slap:!!S.slap,pen:!!S.pen,wk:wk()}});
 /* acts exist for NPC logic */
 R.acts=await p.evaluate(()=>['tat','phatquy','rash','poison'].map(k=>!!ACT[k]));
 /* 3 EVERYONE (review/facefx-all): one person lookup, one state, the same rules for every person; the only exception: no tát / phạt on Hoàng thượng and Thái hậu */
 R.all=await p.evaluate(async()=>{const F=KIT_FACEFX,o={ok:[],bad:[]};const chk=(n,v)=>(v?o.ok:o.bad).push(n);
  S.met=S.met||{};const rs=rivals.find(v=>(v.staff||[]).length);const ka=allKids().find(a=>!a[1])||allKids()[0]||[];const kid=ka[0];if(ka[1])S.met[ka[1].id]=1;
  const who={S,rival:rivals[0],emp:S.emp,th:S.thO||F.person('Thái hậu'),maid:S.maid,staff:(S.staff||[])[0],rstaff:rs&&rs.staff[0],ty:S.court&&S.court.ty,man:(S.men||[])[0],kid};
  /* lookup: object, face object, id, name, place record */
  for(const k in who){const q=who[k];if(!q)continue;chk('person.obj.'+k,F.person(q)===q);try{chk('person.face.'+k,F.person(kitFace(q))===q)}catch(e){chk('person.face.'+k,false)}}
  chk('person.id',F.person(rivals[0].id)===rivals[0]);chk('person.name.S',F.person(S.name)===S);chk('person.name.rival',F.person('<b>'+rivals[0].name+'</b>')===rivals[0]);
  chk('person.name.staff',F.person(who.staff.name).name===who.staff.name);chk('person.kind.emp',F.person({kind:'emp'})===S.emp);chk('person.kind.th',F.person({kind:'th'})===S.thO);chk('person.kind.maid',F.person({kind:'maid'})===S.maid);
  chk('person.sv',F.person('sv:'+who.staff.sid)===who.staff);chk('everyone>40',F.everyone().length>40);
  /* one state, same rules: each condition on each person */
  const reset=q=>{q.sick=0;q.pz=null;q.slap=null;q.pen=null;q.rash=null};
  const matrix={};for(const k in who){const q=who[k];if(!q)continue;reset(q);if(q===S)S.dead=false;
   pzGive(q,2,'thử',null);slapGive(q,rivals[0],'thử');penGive(q,'quy','thử');rashGive(q,2,'thử');
   const ids=[];F.each(q,(d)=>ids.push(d.id));matrix[k]=ids.join(',');
   const nohit=k==='emp'||k==='th';chk('state.poison.'+k,ids.includes('doc'));chk('state.rash.'+k,ids.includes('rash'));
   chk('state.slap.'+k,nohit?!ids.includes('tat'):ids.includes('tat'));chk('state.pen.'+k,nohit?!ids.includes('phat'):ids.includes('phat'));reset(q)}
  o.matrix=matrix;
  /* illness: Hoàng thượng (long thể), Thái hậu (S.thIll), a servant, a child (hp) */
  S.emp.ill={k:'longthe',st:2,known:true};S.thIll={k:'phonghan',st:2,known:true};who.staff.ill={k:'phonghan',st:1,known:true};if(kid){kid.hp=30}
  for(const k of ['emp','th','staff','kid']){const q=who[k];if(!q)continue;const ids=[];F.each(q,d=>ids.push(d.id));chk('state.ill.'+k,ids.includes('ill'))}
  S.emp.ill=null;S.thIll=null;who.staff.ill=null;if(kid)kid.hp=90;
  /* seen: one rule — a servant of a cung she has not met stays unseen */
  const ow=rs?F.owner(rs.staff[0]):null;chk('owner.rstaff',ow===rs);chk('seen.same-as-owner',!rs||F.seen(rs.staff[0])===(kitIsKnown(rs.staff[0])&&(typeof knows!=='function'||!!knows(rs))));chk('seen.hers',F.seen(who.staff)&&F.seen(S.emp)&&F.seen(S.maid));
  /* pcard chip on a servant, a child, Hoàng thượng, Thái hậu (api = state) */
  const kk0=window.kitKnown;window.kitKnown=()=>true;const k0=k61St;k61St=()=>3;const chips={};const pc=(k,q,f,nm,rk)=>{try{const h=pcard({f,name:nm,rank:rk});chips[k]=h}catch(e){chips[k]='ERR '+e.message}};
  pzGive(who.staff,1,'thử',null);who.staff.pz.dx=1;pc('staff',who.staff,pServ(who.staff),who.staff.name,'Thái giám');chk('pcard.staff.chip',/tím tái/.test(chips.staff));
  F.api.ill(S.emp,'longthe',2);pc('emp',S.emp,pEmp(),'Hoàng thượng','Hoàng thượng');chk('pcard.emp.chip',/Long thể bất an/.test(chips.emp));F.api.cure(S.emp);
  F.api.ill(F.person('Thái hậu'),'phonghan',2);pc('th',S.thO,pTH(),'Thái hậu','Thái hậu');chk('pcard.th.chip',/Phong hàn/.test(chips.th));F.api.cure(S.thO);
  if(kid){rashGive(kid,1,'thử');pc('kid',kid,kidFace(kid),kid.name,'Hoàng tử');chk('pcard.kid.chip',/Nổi mẩn/.test(chips.kid));reset(kid)}
  reset(who.staff);k61St=k0;
  /* causes: Phạt a servant, epidemic reaches servants, monthly illness / servant harm run without error and use the same states */
  const s0=S.staff[0];S.bac=999;try{servAct('phat',s0.sid)}catch(e){chk('servAct',false)}chk('cause.phat.pen',!!(s0.pen&&s0.pen.until>wk()));reset(s0);
  const rv=rs||rivals[0];rv.staff=rv.staff||[];if(!rv.staff.length&&typeof fillStaff==='function')fillStaff(rv,false);const m=Math.random;Math.random=()=>0;try{catchIll(rv,'daumua')}finally{Math.random=m}
  chk('cause.epidemic.staff',(rv.staff||[]).some(s=>s.ill&&s.ill.k==='daumua'));(rv.staff||[]).forEach(s=>s.ill=null);
  let ill=0,harm=0;for(let i=0;i<150;i++){try{illMonth();fxServMonth()}catch(e){chk('monthly.noerr',false);break}}
  const all=F.everyone();ill=all.filter(q=>q.ill&&!['consort','player','emp'].includes(F.kind(q))).length;harm=all.filter(q=>q.pz||q.slap||q.rash).length;o.monthly={ill,harm,n:all.length};
  chk('cause.servant.ill-or-harm',ill+harm>0);
  /* a picture of someone with no fit rows plugs in when rows exist (emperor / eunuch / child): same layer, no per-kind code */
  const fit={};for(const k of ['emp','staff','kid']){const q=who[k];if(!q)continue;const f=kitFile(k==='kid'?(kidFigSrc(q,'por')||''):((/src="([^"]*)"/.exec(KP(q,'sm'))||[])[1])||'');if(!f){fit[k]=['none',null];continue}const base=Object.keys(KIT_VEIL.fit).find(x=>x.startsWith('por-consort'));if(f&&!KIT_VEIL.fit[f]){KIT_VEIL.fit[f]=KIT_VEIL.fit[base];KIT_SCAR.fit[f]=KIT_SCAR.fit[base]}
   reset(q);pzGive(q,2,'thử',null);const h=kitFxLayers(q,f);fit[k]=[f,/kff-doc/.test(h)];chk('layer.fitrows.'+k,/kff-doc/.test(h));reset(q)}
  window.kitKnown=kk0;o.fit=fit;return o});
 R.errs=errs;R.bad=bad;console.log(JSON.stringify(R));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
