/* nrask-m-shots (Q1c, from Q1a's nrask-shots): REAL help-hồi cards of the MEN (jnrask_m.js) — the offer card (PEND.q72o modal, kit j72
   card) and the Việc nhờ tab with the accepted quest (kit option buttons pbtn) — asked by a man of S.men (thần / bản vương) and by a court
   eunuch (nô tài), his rival as {B} (nrMenRival, as nrMenOffer casts it), on Fold 755x1000@2 and iPad 1180x820@2
   (dev/test/lib/device.js, HOST mode, built root index.html). Checks: card visible, no horizontal overflow, no raw slot «{», no page errors.
   usage: bash dev/site/build_site.sh && node dev/test/nrask-m-shots.js <outdir> [id:i:men|court …]   — shots stay OUTSIDE the repo; look at every one. */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const D=require('./lib/device');const fs=require('fs');
const OUT=process.argv[2]||'/tmp/nrask-m-shots';fs.mkdirSync(OUT,{recursive:true});let bad=0;
const PICK=(process.argv.slice(3).length?process.argv.slice(3):['gd_tl_9:1:men','tq_an_7:1:court']).map(s=>{const [id,i,who]=s.split(':');return{id,i:+i||0,who:who||'peer'}});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();
 for(const dev of ['fold','ipadAir']){const dd=D.DEVICES[dev];const tag=dd.w+'x'+dd.h;
  const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2,reducedMotion:'reduce'});await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href)&&!/\.(webp|png|jpg|jpeg)(\?|$)/.test(u.href),r=>r.abort());
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(pg,srv.url);await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
  await g.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:30000}).catch(()=>{});
  await g.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById("title").hidden=true;window.__forceOrigin="dtq";start()});
  const clear=async()=>{await g.evaluate(()=>{['kroul','kroulw','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());
   for(const e of [...document.body.children]){if(e.id==='modal'||e.id==='title'||e.querySelector('#tabs'))continue;const cs=getComputedStyle(e),r=e.getBoundingClientRect();if(cs.position==='fixed'&&cs.display!=='none'&&r.width*r.height>=innerWidth*innerHeight*.8)e.remove()}
   for(let j=0;j<20&&Q.length;j++)closeModal();Q.length=0;$("modal").hidden=true})};
  await pg.waitForTimeout(7000);await clear();
  const check=async n=>{const o=await g.evaluate(()=>document.documentElement.scrollWidth-innerWidth);if(o>0){bad++;console.log(`FAIL ${tag} ${n}: horizontal overflow ${o}px`)}
   const raw=await g.evaluate(()=>/\{(me|Me|call|Call|he|B)\}/.test(document.body.innerText));if(raw){bad++;console.log(`FAIL ${tag} ${n}: raw slot on screen`)}};
  for(const P of PICK){await clear();
   /* the asker: a man of the men list (nrMenL) of that template's kind — S.men for men, S.court for court eunuchs — his rival as nrMenOffer casts it */
   const txt=await g.evaluate(P=>{const m=P.id.match(/^(.+)_(\d+)$/);const R=NRM[m[1]];let L=nrMenL().filter(e=>e.a&&e.k===R.k);
    if(!L.length&&P.who==='men'){const role=Object.keys(NRMR).find(r=>NRMR[r]===R.k);const o=(S.men||[]).find(x=>x.alive!==false&&x.id!=='m96');if(o&&role){o.role=role;L=nrMenL().filter(e=>e.a&&e.k===R.k)}}
    const e=L[0];if(!e)return 'NO ASKER of kind '+R.k;e.p.nr=Object.assign(e.p.nr||{},{r:m[1],n:+m[2],t:0,x:0,hs:1,l:(e.p.nr&&e.p.nr.l)||[]});
    const riv=nrMenRival(e);let bk=null,bi=null;if(e.g==='men'&&riv){bk='man';bi=riv.id}else if(e.g==='off'&&riv){bk='off';bi=riv}else if(e.g==='court'&&riv&&riv!==S){bk=riv.queen?'hh':'rv';bi=riv.id}
    const x=q72Make(T72I['nr_'+[].concat(NRASK[P.id])[P.i].k],q72A(e.a[0],e.a[1]));if(!x)return 'NO QUEST';x.bk=bk;x.bi=bi;x.p={nr:m[1],nn:+m[2],av:P.i};window.__x=x;
    const d=mkP("q72o",{x,how:""});if(!d)return 'NO DIALOG';const c={t:"Việc nhờ",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp};window.__card=c;Q.unshift(c);showModal();return plain(d.t)},P);
   await pg.waitForTimeout(900);await g.evaluate(()=>{const c=window.__card;if(c&&(Q[0]!==c||$("modal").hidden)){const i=Q.indexOf(c);if(i>0)Q.splice(i,1);if(Q[0]!==c)Q.unshift(c);showModal()}});await pg.waitForTimeout(400);
   const vis=await g.evaluate(()=>!$("modal").hidden&&$("modal").getBoundingClientRect().height>0);if(!vis){bad++;console.log(`FAIL ${tag} ${P.id}: offer card not shown`)}
   await check(P.id+' offer');await pg.screenshot({path:`${OUT}/${tag}-${P.id}-${P.who}-offer.jpg`,type:'jpeg',quality:72});console.log(`${tag} ${P.id} offer: ${String(txt).replace(/\s+/g,' ').slice(0,260)}`);
   /* accept → the Việc nhờ tab with the quest card and its two ask options */
   await clear();const t2=await g.evaluate(()=>{const q=q72();const x=window.__x;if(!q.a.includes(x)){x.t0=wk();x.dl=wk()+6;q.a.push(x)}
    const bt=document.querySelector('#tabs [data-tab="q72"]');if(bt)bt.click();return bt?'tab':'NO TAB'});
   await pg.waitForTimeout(900);
   const opt=await g.evaluate(()=>{const X=q72X(window.__x);return X.T.s[0].ch.slice(0,2).map(o=>plain(q72Txt(o.n,X)))});
   const seen=await g.evaluate(o=>{const B=document.body.innerText.replace(/nàng ta/g,'nàng');const X=q72X(window.__x);const bn=X&&X.B&&X.B.n;/* a rival the player has not met is veiled on screen (name-veil «??? »): check the words around his name */return o.every(t=>(bn?t.split(bn):[t]).every(z=>B.includes(z.replace(/nàng ta/g,'nàng').trim())))},opt);/* j84 writes «nàng ta» on screen */if(!seen){bad++;console.log(`FAIL ${tag} ${P.id}: ask options not on the Việc nhờ tab (${t2})`)}
   await g.evaluate(o=>{const el=[...document.querySelectorAll('button,.pbtn')].find(e=>e.innerText&&e.innerText.includes(o[0]));if(el)el.scrollIntoView({block:'center'})},opt);await pg.waitForTimeout(300);
   await check(P.id+' tab');await pg.screenshot({path:`${OUT}/${tag}-${P.id}-${P.who}-tab.jpg`,type:'jpeg',quality:72});console.log(`${tag} ${P.id} tab options: ${opt.join(' / ')}`);
   await g.evaluate(()=>{const q=q72();q.a.length=0;q.ch.length=0})}
  if(errs.length){bad++;console.log(`FAIL ${tag}: page errors: ${errs.slice(0,3).join(' | ')}`)}await ctx.close()}
 await b.close();srv.close();console.log(bad?`SHOTS FAIL ${bad}`:'SHOTS OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
