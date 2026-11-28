/* review/kit-subtabs-overflow (K-Q2-1): scan EVERY kitSubTabs bar (.ktsub) x device in HOST mode (the real player view).
   usage: node dev/test/subtabs-overflow.js <outdir> [device,...] [noshots]   (device names: dev/test/lib/device.js; default fold,ipadAir,ipadPro,pixel,iphone14)
   Per case: tabs count, bar width, overflow y/n (scrollWidth>clientWidth), overlap y/n (the ⓘ slot touches a tab, or a tab is clipped by the bar),
   rows (wrapped lines). The Mệnh truyện bar is also scanned with a SIMULATED 6th tab «Phụ tuyến» (Q2 review/questline-q2).
   Exit 1 when any bar overflows sideways or overlaps. Prints a markdown table. */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');const D=require('./lib/device');
const [,,OUT,DEVS,NOSHOT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const devices=(DEVS&&DEVS!=='-'?DEVS:'fold,ipadAir,ipadPro,pixel,iphone14').split(',');
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const rows=[];let bad=0;
 for(const dev of devices){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const g=await D.openHost(p,srv.url);await sleep(2500);
  await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
   for(let i=0;i<60;i++){try{start()}catch(e){}if(S.ps&&S.reign&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   const st=document.createElement('style');st.textContent='#kroul,#kroulw,#kboot,#kbootw,#kload,#klife,.kmov{display:none!important}';document.head.appendChild(st)});
  await sleep(800);
  const scan=()=>g.evaluate(()=>[...document.querySelectorAll('.ktsub')].filter(e=>e.offsetParent).map(bar=>{const R=e=>e.getBoundingClientRect();const br=R(bar);
    const tabs=[...bar.querySelectorAll('.pct')];const info=bar.querySelector('.pctinfo');const ir=info?R(info):null;
    const clipped=tabs.filter(t=>{const r=R(t);return r.right>br.right+1||r.left<br.left-1}).length;
    const ovl=ir?tabs.filter(t=>{const r=R(t);return r.right>ir.left+1&&r.left<ir.right-1&&r.bottom>ir.top+1&&r.top<ir.bottom-1}).length:0;
    const tops=new Set(tabs.concat(info?[info]:[]).map(t=>Math.round(R(t).top)));const ws=tabs.map(t=>Math.round(R(t).width));
    return{key:bar.dataset.ktsub,tabs:tabs.length,barW:Math.round(br.width),sw:bar.scrollWidth,cw:bar.clientWidth,over:bar.scrollWidth>bar.clientWidth+1||clipped>0,overlap:ovl>0,info:!!info,rows:tops.size,h:Math.round(br.height),
     inView:br.left>=-1&&br.right<=innerWidth+1,hPage:document.documentElement.scrollWidth>innerWidth+1,minW:Math.min(...ws),maxW:Math.max(...ws)}}));
  const rec=async(label,setup,shotName)=>{await g.evaluate(setup);await sleep(1200);const r=await scan();if(!r.length){rows.push({dev,label,none:1});return}
   for(const x of r){rows.push(Object.assign({dev,label},x));if(x.over||x.overlap||x.hPage)bad++}
   if(!NOSHOT&&shotName){await p.screenshot({path:`${OUT}/${shotName}-${dev}.jpg`,type:'jpeg',quality:80})}};
  /* 1 Tài nghệ  2 Mệnh truyện (5 tabs with reign)  3 same + simulated 6th «Phụ tuyến»  4 Việc nhờ  5 Giao tình › Ân oán pickers  6 kit sample page */
  await rec('Tài nghệ',()=>{window.__sim=0;tab='art';KTSUB.art='duc';render()},'art');
  await rec('Mệnh truyện (palace start, 5 tabs)',()=>{window.__sim=0;tab='story';KTSUB.story='rg';render()},'story5');
  await rec('Mệnh truyện + 6th «Phụ tuyến» (simulated)',()=>{if(!window.__k0){window.__k0=kitSubTabs;kitSubTabs=function(key,list,info){if(key==='story'&&window.__sim&&!list.some(x=>x.k==='q2'))list=list.concat([{k:'q2',label:'Phụ tuyến',n:''}]);return window.__k0.call(this,key,list,info)}}window.__sim=1;tab='story';KTSUB.story='rg';render()},'story6');
  await rec('Việc nhờ',()=>{window.__sim=0;tab='q72';render()},'q72');
  await rec('Giao tình › Ân oán',()=>{window.__sim=0;tab='rel';render();try{const b=[...document.querySelectorAll('#panel [data-rtab],#panel .pct')].find(x=>/Ân oán/.test(x.textContent));b&&b.click()}catch(e){}},'rel');
  await rec('Kit sample page §33.40',()=>{window.__sim=0;try{kitSamplePage()}catch(e){}},null);
  if(errs.length)console.log(dev,'page errors',errs);await ctx.close()}
 await b.close();srv.close();
 console.log('| device | case | key | tabs | bar px | overflow | overlap | rows | tab w min-max |\n|---|---|---|---|---|---|---|---|---|');
 for(const r of rows)console.log(r.none?`| ${r.dev} | ${r.label} | — | no kitSubTabs bar here | | | | | |`:`| ${r.dev} | ${r.label} | ${r.key} | ${r.tabs} | ${r.barW} | ${r.over?'**Y**':'n'} (${r.sw}/${r.cw}) | ${r.overlap?'**Y**':'n'} | ${r.rows} | ${r.minW}-${r.maxW} |`);
 console.log(bad?`FAIL ${bad} bar(s) overflow/overlap`:'PASS no overflow, no overlap');process.exit(bad?1:0)})();
