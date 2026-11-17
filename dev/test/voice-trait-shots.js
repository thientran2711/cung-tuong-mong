/* REAL voice cards (PEND dialogs wrapped as deserQ does: {t, h:d.t, opts:d.o, who}) (review voice-trait-r1): opens the real cards directly (gmCard greet, toilReact → toilFlush reaction panel, PEND.q72o quest offer,
   PEND.cyrep Kính sự phòng ask) for speakers of different Tính tình, on Fold 755x1000 and iPad 1180x820 (dev/test/lib/device.js, built root index.html).
   (a stranger greet card with one reply — e.g. a Kiêu ngạo higher-rank who does not give her name — closes itself in this harness; its text is checked by voice-trait.js)
   usage: bash dev/site/build_site.sh && node dev/test/voice-trait-shots.js <outdir>   — shots stay OUTSIDE the repo; look at every one. */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const OUT=process.argv[2]||'/tmp/vt-shots';fs.mkdirSync(OUT,{recursive:true});let bad=0;
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();
 for(const dev of ['fold','ipadAir']){const dd=D.DEVICES[dev];const tag=dd.w+'x'+dd.h;
  const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2,reducedMotion:'reduce'});await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href)&&!/\.(webp|png|jpg|jpeg)(\?|$)/.test(u.href),r=>r.abort());
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(pg,srv.url);await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
  await g.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:30000}).catch(()=>{});
  await g.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  const clear=async()=>{await g.evaluate(()=>{['kroul','kroulw','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());
   for(const e of [...document.body.children]){if(e.id==='modal'||e.id==='title'||e.querySelector('#tabs'))continue;const cs=getComputedStyle(e),r=e.getBoundingClientRect();if(cs.position==='fixed'&&cs.display!=='none'&&r.width*r.height>=innerWidth*innerHeight*.8)e.remove()}
   for(let j=0;j<20&&Q.length;j++)closeModal();Q.length=0;$("modal").hidden=true})};
  await pg.waitForTimeout(7000);await clear();
  const shot=async(n,fn,arg)=>{await clear();await g.evaluate(()=>{window.__card0=null});const txt=await g.evaluate(fn,arg);await g.evaluate(()=>{window.__card=window.__card0||Q[0];window.__card0=null});await pg.waitForTimeout(900);
   /* a timer of the first day may queue its own event in front: put the card back on top */
   await g.evaluate(()=>{const c=window.__card;if(c&&(Q[0]!==c||$("modal").hidden)){const i=Q.indexOf(c);if(i>0)Q.splice(i,1);if(Q[0]!==c)Q.unshift(c);showModal()}});await pg.waitForTimeout(400);
   const vis=await g.evaluate(()=>!$("modal").hidden&&$("modal").getBoundingClientRect().height>0);
   const o=await g.evaluate(()=>document.documentElement.scrollWidth-innerWidth);if(o>0){bad++;console.log(`FAIL ${tag} ${n}: horizontal overflow ${o}px`)}
   if(!vis){if(/^greet/.test(n)){console.log(`WARN ${tag} ${n}: greet card dropped (the approaching NPC is not in this room: the game drops her card) — text: ${String(txt).replace(/<[^>]+>/g,' ').slice(0,120)}`);return}bad++;const dbg=await g.evaluate(()=>({hidden:$("modal").hidden,disp:getComputedStyle($("modal")).display,q:Q.length,same:Q[0]===window.__card,cls:$("modal").className,dead:!!S.dead}));console.log(`FAIL ${tag} ${n}: card not visible ${JSON.stringify(dbg)} (${String(txt).slice(0,80)})`)}
   await pg.screenshot({path:`${OUT}/${tag}-${n}.jpg`,type:'jpeg',quality:70});console.log(`${tag} ${n}: ${String(txt).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,230)}`)};
  const rv=i=>`(()=>{const L=rivals.filter(x=>!x.queen&&x.alive&&!x.out);return L[${i}]||L[0]})()`;
  const setT=(t,i=0)=>`const v=${rv(i)};v.net=[${JSON.stringify(t)},v.net&&v.net[1],v.net&&v.net[2]].filter(Boolean);S.vmem={};`;
    await shot('toil-th-scold-kieungao',new Function(`S.thTrait="Kiêu ngạo";S.vmem={};toilReact({k:"th-scold",host:"th",n:-2,line:"Thái hậu → ngươi: thiện cảm -2",ctx:{mk:"moc",dress:"giandi"}});toilFlush();return Q[0]?Q[0].h:"NO PANEL"`));
  await shot('toil-rival-jealous-nongnay',new Function(`${setT("Nóng nảy")}toilReact({k:"rival-jealous",host:v,v:1,name:v.name,n:-2,line:"ghen +2",ctx:{mk:"dep",dress:"photruong"}});toilFlush();return Q[0]?Q[0].h:"NO PANEL"`));
  await shot('quest-offer-kieungao',new Function(`${setT("Kiêu ngạo")}v.tai=30;const A=q72A("rv",v.id);const x=q72Make(T72I["rv_tho"],A,null);if(!x)return "NO QUEST";const d=mkP("q72o",{x,how:""});if(!d)return "NO DIALOG";const m={t:"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls};window.__card0=m;Q.unshift(m);showModal();return d.t`));
  await shot('kinhsu-ask-maid-nhieuchuyen',new Function(`try{S.maid.net=["Nhiều chuyện",S.maid.net&&S.maid.net[1],S.maid.net&&S.maid.net[2]].filter(Boolean)}catch(e){}S.vmem={};try{const b0=cyBase(S);S.tuan=b0.t}catch(e){}const d=mkP("cyrep",{});if(!d)return "NO DIALOG (cycle off)";const m={t:"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls};window.__card0=m;Q.unshift(m);showModal();return d.t`));
  await shot('staff-kn-khiemnhuong',new Function(`S.vmem={};const tx=kLine("staff:kn:hi",kTP("staff:kn:hi"),{sp:{srv:"f"},ls:S,t:"Khiêm nhường"});Q.unshift({t:"Nội vụ phủ",h:"<p>"+tx+"</p>",who:typeof pMaid==="function"?pMaid():null});showModal();return tx`));
  await shot("greet-ancan",new Function(`S.vmem={};let m=null;for(const v of rivals.filter(x=>!x.queen&&x.alive&&!x.out)){v.net=["Ân cần",v.net&&v.net[1],v.net&&v.net[2]].filter(Boolean);const c=gmCard(v);if(c&&c.opts&&c.opts.length>1){m=c;break}}if(!m)return "NO CARD";window.__card0=m;Q.unshift(m);showModal();return m.h`));
  if(errs.length){bad++;console.log(`FAIL ${tag}: page errors: ${errs.slice(0,3).join(' | ')}`)}await ctx.close()}
 await b.close();srv.close();console.log(bad?`SHOTS FAIL ${bad}`:'SHOTS OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
