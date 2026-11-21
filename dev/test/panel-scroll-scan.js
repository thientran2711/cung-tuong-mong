/* review/empty-states part 2 (owner 21/11 ~02:24Z "Đứng yên một cái khung hình khi mà không có thông tin dư"): NO tab panel may scroll when its content fits.
   usage: node dev/test/panel-scroll-scan.js <outdir> [device,...] [-|keys]   default fold,ipadAir
   For every tab / sub-tab key (fresh start + forced-empty kids): #panel scrollHeight vs clientHeight, and the extent of its real content (last child bottom).
   FAIL = scrollHeight > clientHeight+1 while the last child's bottom fits inside clientHeight (a pure spacer / padding scroll). Exit 1 on any FAIL. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const [,,OUT,DEVS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const devices=(DEVS&&DEVS!=='-'?DEVS:'fold,ipadAir').split(',');const sleep=t=>new Promise(r=>setTimeout(r,t));
const NOK='for(const v of rivals)v.kids=[];S.kids=[];';
const CASES=[['fac','S.facs=[];tab="fac";window.__tdV="hc"'],['men','tab="men"'],['kid-empty',NOK+'tab="kid"'],['kvo-empty',NOK+'tab="kvo"'],['kin-empty',NOK+'tab="kin"'],['hon-empty',NOK+'tab="hon"'],['qt-empty',NOK+'tab="qt"'],
 ['kid','tab="kid"'],['kvo','tab="kvo"'],['kin','tab="kin"'],['hon','tab="hon"'],['qt','tab="qt"'],['court','tab="court"'],['rv','tab="rv"'],['staff','tab="staff"'],['rel','tab="rel"'],['fac-td','tab="fac";window.__tdV="td"'],
 ['inv-tui','tab="inv";KINV_SUB="tui"'],['inv-thu','tab="inv";KINV_SUB="thu"'],['inv-viec','tab="inv";KINV_SUB="viec"'],['art','tab="art"'],['story','tab="story"'],['q72','tab="q72"'],['log','tab="log"'],['go','tab="go"'],['act','tab="act"']];
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;const rows=[];
 for(const dev of devices){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();p.setDefaultTimeout(120000);
  const g=await D.openHost(p,srv.url);await sleep(2500);
  await g.evaluate(x=>{window.__inj=x;const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
   for(let i=0;i<60;i++){try{start()}catch(e){}if(S.ps&&S.reign&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;if(window.__inj)document.head.insertAdjacentHTML('beforeend','<style>'+window.__inj+'</style>');
   const st=document.createElement('style');st.textContent='#kroul,#kroulw,#kboot,#kbootw,#kload,#klife,.kmov{display:none!important}';document.head.appendChild(st)},process.env.SCAN_INJECT_CSS||'');
  await sleep(800);
  for(const [k,s] of CASES){let err='';try{await g.evaluate(new Function(s+';render()'))}catch(e){err=String(e.message).slice(0,60)}await sleep(700);
   const r=await g.evaluate(()=>{const P=document.getElementById('panel');const pr=P.getBoundingClientRect();let lb=0;for(const c of P.children){if(c.offsetParent===null&&getComputedStyle(c).position!=='fixed')continue;const r=c.getBoundingClientRect();if(r.height)lb=Math.max(lb,r.bottom)}
    let ovl=0;const vis=e=>{const r=e.getBoundingClientRect();return r.height>2&&r.width>2&&getComputedStyle(e).position!=='absolute'&&getComputedStyle(e).position!=='fixed'&&getComputedStyle(e).visibility!=='hidden'};
    const walk=(el,d)=>{if(el.matches('.pcl,.pcp,.kwear,.kin,.pcname,.kitart,.kartf2'))return;const ks=[...el.children].filter(vis);for(let i=1;i<ks.length;i++){const a=ks[i-1].getBoundingClientRect(),b=ks[i].getBoundingClientRect();const col=getComputedStyle(el).flexDirection!=='row'&&getComputedStyle(el).display!=='grid'&&getComputedStyle(el).display!=='inline-flex';if(col&&b.top<a.bottom-2&&b.left<a.right-2&&b.right>a.left+2)ovl++}if(el!==P&&getComputedStyle(el).overflowY==='visible'){const pr=el.getBoundingClientRect();for(const k of ks){if(k.getBoundingClientRect().bottom>pr.bottom+2)ovl++}}if(d<4)ks.forEach(k=>walk(k,d+1))};walk(P,0);
    const cs=getComputedStyle(P);const kids=[...P.children].filter(c=>c.getBoundingClientRect().height).map(c=>c.className.toString().slice(0,18));
    return{ovl,sh:P.scrollHeight,ch:P.clientHeight,over:cs.overflowY,pb:cs.paddingBottom,mb:Math.round(pr.bottom-lb),last:kids.slice(-2).join('|')}});
   const diff=r.sh-r.ch;const fail=(diff>1&&r.mb>=0)||r.ovl>0;if(fail)bad++;rows.push({dev,k,...r,diff,fail,err})}
  await ctx.close()}
 await b.close();srv.close();
 console.log('| dev | view | scrollH | clientH | diff | overflow-y | pad-bottom | gap under last child | last children | overlaps | verdict |\n|---|---|---|---|---|---|---|---|---|---|---|');
 for(const r of rows)console.log(`| ${r.dev} | ${r.k} | ${r.sh} | ${r.ch} | ${r.diff} | ${r.over} | ${r.pb} | ${r.mb} | ${r.last} | ${r.ovl} | ${r.fail?'**FAIL scrolls with spare room**':(r.diff>1?'scrolls (content longer)':'ok')}${r.err?' ERR '+r.err:''} |`);
 console.log(bad?`FAIL ${bad} panel(s) scroll although the content fits`:'PASS');process.exit(bad?1:0)})();
