/* KK63 K-SRV-OWNFIG scan (RV-177 FAIL-1 on nhv-areas; law 11): the servant-path entry for the Emperor / Thái y ({kind:"srv",sk:"emp"|"ty"}, j95 j95ledObj,
   j42 srvVisitOf) must get HIS OWN picture from every kit person→picture function, the same as the real person ({kind:"emp"} / {kind:"ty"}).
   usage: node dev/test/kit-srv-ownfig-scan.js <built root> [fold]   (exit 1 when a function gives the srv shape the grey stand-in / nothing while the real person has art) */
const {chromium}=require('playwright');const D=require('./lib/device');
/* own boot (dsprobe aborts the image CDN, which empties the figure manifest FIGS) */
async function boot(ROOT,dev){const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,dev,{reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const g=await D.openHost(p,srv.url);await p.waitForTimeout(6000);await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true});return {g,errs,close:async()=>{await b.close();srv.close()}}}const [,,ROOT,DEV]=process.argv;
(async()=>{const T=await boot(ROOT,DEV||'fold');const g=T.g;
 const r=await g.evaluate(()=>{for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
  const src=x=>{if(!x)return"";if(typeof x==="string")return x;return x.src||(x.ini?"(initial "+x.ini+")":"")||x.img||x.fig||(x.getAttribute&&x.getAttribute("src"))||JSON.stringify(x).slice(0,80)};
  const F={figFor:p=>figFor(p),kitFigOf:p=>kitFigOf(p),kitFace:p=>kitFace(p),kitPortrait:p=>{const m=String(kitPortrait(p,{size:"lg"})).match(/src="([^"]*)"/);return m?m[1]:"(no img)"},kitStageFig:p=>{const m=String(kitStageFig(p)).match(/src="([^"]*)"/);return m?m[1]:"(no img)"},kitGameFig:p=>typeof kitGameFig==="function"?kitGameFig(p):"n/a",dfFig:p=>typeof dfFig==="function"?dfFig(p):"n/a"};
  const E={emp:[{kind:"srv",sk:"emp",name:"Hoàng thượng"},{kind:"emp"}],ty:[{kind:"srv",sk:"ty",name:"Thái y"},{kind:"ty",name:"Thái y",id:"ty"}]};const out=[];
  for(const [k,[sp,real]] of Object.entries(E))for(const [fn,f] of Object.entries(F)){let a="",b="";try{a=src(f(sp))}catch(e){a="ERR "+e.message.slice(0,40)}try{b=src(f(real))}catch(e){b="ERR "+e.message.slice(0,40)}
   const nm=s=>String(s).replace(/^.*\/(img\/)?/,"");out.push({k,fn,srv:nm(a),real:nm(b),bad:!!b&&!/unknown-fig|ERR|n\/a/.test(b)&&(a!==b)})}
  return {srv:isSrv(),out}});
 r.out.forEach(x=>console.log((x.bad?"FAIL":"ok  ").padEnd(5),x.k.padEnd(4),x.fn.padEnd(12),"srv-shape:",x.srv.slice(0,60).padEnd(40),"real:",x.real.slice(0,60)));
 const bad=r.out.filter(x=>x.bad).length;console.log(`SRV-OWNFIG ${bad?"FAIL "+bad:"PASS"} (servant game ${r.srv}, pageerrors ${T.errs.length})`);await T.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
