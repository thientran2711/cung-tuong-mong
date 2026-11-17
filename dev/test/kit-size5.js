/* kit-size5.js — PHASE 2 live frame check (kit-size, KIT §84 "live"): opens real game dialogs of every KP_SEAL kind in #modal and measures
   the live v3 frame (kitFrameLive3): size picked, frame box vs viewport, cut text (scrollWidth/Height > client), empty px under the info,
   figure gaps, buttons grid, "Đã hiểu" button present, page errors.  Optional shots to an outdir OUTSIDE the repo.
   usage: node dev/test/kit-size5.js <url> <WxH[,WxH]> [outdir] [cases=all]   (outdir '-' = no shots) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SIZES='755x1000,1180x820',OUT='-',ONLY='']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const CASES={
 info:()=>kitModal({kind:"info",title:"Điều ngắn",facts:["Một câu ngắn."]}),
 'info-person':()=>kitModal({kind:"info",title:"Một người",subject:liveRivals(true)[0],facts:["Nàng ấy được Hoàng thượng để mắt mấy hôm nay."]}),
 rule:()=>kitModal({kind:"rule",title:"Luật nhỏ",sections:[{h:"Thang",tiers:[{k:"1–3",n:"nhỏ",d:"một",c:"g"},{k:"4–6",n:"vừa",d:"hai",c:"y"}]}]}),
 news:()=>{Q.push({t:"Tin trong cung",h:"<p>Một tin ngắn trong cung sáng nay.</p>"});showModal()},
 'news-person':()=>{Q.push({t:"Tin trong cung",who:liveRivals(true)[0],h:"<p>Một tin ngắn.</p>"});showModal()},
 notice:()=>{Q.push({t:"Một báo",h:"<p>Ngắn.</p>"});showModal()},
 'notice-long':()=>{Q.push({t:"Nội vụ phủ báo",h:"<p>"+"Lệ bạc tháng này đã phát về các cung. Ai thiếu thì lên Nội vụ phủ trình. ".repeat(6)+"</p>"});showModal()},
 result:()=>{Q.push({t:"Kết quả: thử",h:"<p>Thành công.</p>"});showModal()},
 night:()=>{Q.push({t:"Đêm",cls:"night",h:"<p>Đêm xuống.</p>"});showModal()},
 choice:()=>{Q.push({t:"Việc khó",h:"<p>Chọn.</p>",opts:[{n:"Một",fx:{}},{n:"Hai",fx:{}}]});showModal()},
 'choice-5':()=>{const v=liveRivals(true)[0];Q.push({t:"Việc khó",who:v,h:"<p>Nàng đến cửa cung, xin gặp. Ngươi tính sao?</p>",opts:[{n:"Mời vào dùng trà",fx:{}},{n:"Nói đang bận",fx:{}},{n:"Sai người đưa quà",fx:{}},{n:"Thưa do Hoàng thượng định",fx:{}},{n:"Bỏ qua",fx:{}}]});showModal()},
 'headart-notice':()=>{Q.push({t:"Hỏa hoạn",h:"<p>Lửa bén.</p>",headArt:{src:"img/ev-hoa-hoan.webp",label:"Hỏa hoạn"}});showModal()},
 'headart-choice':()=>{Q.push({t:"Điềm lạ quanh cung",h:"<p>Có điềm lạ.</p>",headArt:{src:"img/ev-chuyen-la.webp",label:"Điềm lạ"},opts:[{n:"Xem",fx:{}},{n:"Bỏ qua",fx:{}}]});showModal()},
 intel:()=>kitIntelPanel(liveRivals(true)[0]),
 evidence:()=>kitEvidencePanel(liveRivals(true)[0]),
 reward:()=>kitModal({kind:"reward",title:"Hoàng thượng ban thưởng",facts:["Ban một xấp gấm Tô Châu."]}),
 week:()=>kitModal({kind:"week",title:"Tuần lục",facts:["Một tuần yên ả."]}),
 threat:()=>kitModal({kind:"threat",title:"Cảnh giác",subject:liveRivals(true)[0],facts:["Có kẻ dòm ngó cung ngươi."]}),
 person:()=>kitModal({kind:"person",title:"Một người",subject:liveRivals(true)[0],facts:["Xuất thân thế gia."]}),
 end:()=>kitModal({kind:"end",title:"Một kiếp",facts:["Đời ngươi khép lại."]}),
};
(async()=>{const b=await chromium.launch();const ALL={};let bad=0;
 for(const sz of SIZES.split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.kitKnown=()=>true;window.isKnown61=()=>true;tab='act';render()});await sleep(1200);
  const R={};
  for(const [name,fn] of Object.entries(CASES)){if(ONLY&&!ONLY.split(',').includes(name))continue;
   try{await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await p.evaluate(fn)}catch(e){errs.push(name+': '+String(e.message).slice(0,120))}
   await sleep(1200);await p.waitForFunction(()=>[...document.querySelectorAll('#modal img')].every(i=>i.complete),null,{timeout:12000}).catch(()=>{});await sleep(500);
   const r=await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return{v:'MISSING'};const d=M.querySelector('.dlg');const q=d.getBoundingClientRect();
    const cut=[];d.querySelectorAll('.kptitle,.kpsub,.kt3 *,.kfacts *,.kb *,.opt *,.kszbt').forEach(e=>{if(!e.getClientRects().length)return;const cs=getComputedStyle(e);if((cs.overflow!=='visible'||cs.textOverflow==='ellipsis')&&(e.scrollWidth>e.clientWidth+1))cut.push((e.className||e.tagName)+':'+e.textContent.trim().slice(0,30))});
    const R3=d.querySelector('.k3right'),L=d.querySelector('.k3body>.kszfig,.k3body>.k3mpor,.k3body>.k3mpic');let empty=null,gap=null,scroll=null;
    if(R3){const K=[...R3.children].filter(c=>c.getClientRects().length),rb=Math.max(...K.map(c=>c.getBoundingClientRect().bottom)),rt=Math.min(...K.map(c=>c.getBoundingClientRect().top)),q3=R3.getBoundingClientRect();empty=Math.round(q3.bottom-rb);if(d.dataset.pres==='one')empty=Math.abs(Math.round((q3.bottom-rb)-(rt-q3.top)))/* S: info centred beside the picture → top gap = bottom gap */;scroll=R3.scrollHeight>R3.clientHeight+2}
    if(L){const lr=L.getBoundingClientRect(),br=d.querySelector('.k3body').getBoundingClientRect();gap=[Math.round(lr.top-br.top),Math.round(br.bottom-lr.bottom)]}
    const hx=[...d.querySelectorAll('button')].filter(x=>x.getClientRects().length&&/Đã hiểu|Đã rõ/.test(x.textContent)).length;
    const o=d.querySelector('.k3btns');
    return{ksz:d.dataset.ksz||'-',pres:d.dataset.pres||'-',kind:d.dataset.kind,seal:(d.querySelector('.kpseal')||{}).textContent,box:[Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)],
     over:q.left<-1||q.right>innerWidth+1||q.top<-1||q.bottom>innerHeight+1,hscroll:document.documentElement.scrollWidth>innerWidth+1,cut,empty,gap,scroll,daHieu:hx,
     cols:o?getComputedStyle(o).gridTemplateColumns.split(' ').length:0,who:((d.querySelector('.kt3')||{}).textContent||'').trim().slice(0,40)}});
   R[name]=r;if(r.over||r.hscroll||(r.cut&&r.cut.length)||r.daHieu||r.v)bad++;
   if(OUT!=='-'){fs.mkdirSync(OUT,{recursive:true});await p.screenshot({path:`${OUT}/${sz}-${name}.jpg`,type:'jpeg',quality:70}).catch(()=>{})}
   console.log(sz,name,JSON.stringify(r))}
  ALL[sz]={R,errs};console.log(sz,'errors',JSON.stringify(errs));await ctx.close()}
 await b.close();if(OUT!=='-')fs.writeFileSync(OUT+'/kit-size5.json',JSON.stringify(ALL,null,1));process.exit(bad?1:0)})();
