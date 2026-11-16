const {chromium}=require('playwright');const fs=require('fs');
const URL=process.argv[2],OUT=process.argv[3],PID=process.argv[4]||'consort:c23',RANK=+(process.argv[5]||2);
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,hasTouch:true,isMobile:true,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const reqs=[];p.on('response',r=>{const u=r.url();if(/consort-c23|consort-c24|player-look/.test(u))reqs.push(r.status()+' '+u.split('/').slice(-2).join('/'))});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
 await p.addStyleTag({content:'#kroul{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.th=Math.max(S.th||0,40);S.sung=Math.max(S.sung,65);render()});
 await sleep(800);
 // hau cung: give a rival the swapped style
 const info=await p.evaluate(([pid,rank])=>{const R0=liveRivals(true).filter(v=>!v.queen);R0.slice(0,4).forEach(v=>S.met[v.id]=1);const v=R0[0];v.fid=pid;v.rank=rank;v.out=false;v.age=Math.max(v.age||30,30);try{kn()}catch(e){}try{for(const x of rivals){S.met[x.id]=1;k61Meet(x,"gặp",3)}}catch(e){}return {id:v.id,name:v.name,fid:v.fid,age:v.age,rank:v.rank,tier:figTierOf(v)}},[PID,RANK]);
 console.log(JSON.stringify(info));
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.body.classList.remove('kbk-open');tab='rv';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}});
 await sleep(3500);await p.waitForFunction(()=>[...document.querySelectorAll('#panel img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});
 await p.screenshot({path:OUT+'/hc-list.png'});
 // person panel: click the rival tile
 const clicked=await p.evaluate(()=>{const nm=liveRivals(true).filter(v=>!v.queen)[0].name;const b=[...document.querySelectorAll('#panel *')].filter(e=>e.children.length<=3&&(e.textContent||'').trim()===nm.split(' ').slice(-2).join(' ')&&e.offsetParent);if(b.length){b[b.length-1].click();return nm+' '+b.length}return 'none '+nm});
 await sleep(3000);await p.screenshot({path:OUT+'/hc-person.png'});
 const srcs=await p.evaluate(()=>[...document.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').slice(-2).join('/')).filter(s=>/consort-c2|player/.test(s)));
 // stage: modal with the rival on stage
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.body.classList.remove('kbk-open');tab='court';try{render()}catch(e){}const R0=liveRivals(true).filter(v=>!v.queen);const v=R0[0];Q.push({t:'Có người đến',stage:[v],who:pv(v),h:'<p>'+v.name+' ghé qua rồi về.</p>',opts:[{n:'Tiếp',fx:{},x:'thân +3',go:()=>{}},{n:'Từ chối',fx:{},x:'thân -3',go:()=>{}}]});Q.forEach(m=>m.must=1);showModal()});
 await sleep(3500);await p.screenshot({path:OUT+'/stage.png'});
 const srcs2=await p.evaluate(()=>[...document.querySelectorAll('img')].map(i=>(i.currentSrc||i.src).split('/').slice(-2).join('/')).filter(s=>/consort-c2|player|\/fig-|\/hd/.test(s)));
 console.log(JSON.stringify({clicked,srcs,srcs2,errs,reqs:reqs.slice(0,20)}));
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
