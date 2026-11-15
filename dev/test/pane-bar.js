/* kit pane rule (jpane, KIT §45): on every tab pane, the bar (sub-tabs + first filter row) sits flush at the top of the pane, directly
   under the header, and stays there while the list scrolls; nothing shows above it, the list is cut off at its bottom edge, and the
   pane ends at the bottom nav. Measured at rest and after scrolling, ±1 px.
   usage: node dev/test/pane-bar.js <url> [<W>x<H>@dpr ...] [--shots <dir>] */
const {chromium}=require('playwright');const args=process.argv.slice(2);const URL=args[0];
const si=args.indexOf('--shots');const SHOTS=si>0?args[si+1]:null;
let SIZES=args.slice(1).filter((a,i)=>/^\d+x\d+@/.test(a));if(!SIZES.length)SIZES=['755x1000@2','1180x820@2','412x1058@2','1000x755@2','844x390@3'];
(async()=>{const b=await chromium.launch();const ALL={};let bad=0;const errs=[];
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));p.setDefaultTimeout(0);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.inv=S.inv||[];for(const k of Object.keys(IT).slice(0,40))S.inv.push({k});render()});
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent).map(b=>b.dataset.tab));
  const R={};
  for(const t of tabs){await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);b.click();const P=document.getElementById('panel');if(!P.getBoundingClientRect().height)b.click()},t);await p.waitForTimeout(450);
   const m=async()=>p.evaluate(()=>{const P=document.getElementById('panel');const pr=P.getBoundingClientRect();if(!pr.height)return{hidden:1};const cs=getComputedStyle(P);const bt=parseFloat(cs.borderTopWidth),bb=parseFloat(cs.borderBottomWidth);
    const bar=P.querySelector(':scope > .kpbar');const hd=document.querySelector('header.hud');const nav=document.querySelector('nav.bar')||document.getElementById('tabs');
    const o={sh:P.scrollHeight,ch:P.clientHeight,st:Math.round(P.scrollTop),navGap:nav?Math.round(nav.getBoundingClientRect().top-pr.bottom):null,hdGap:hd?Math.round(pr.top-hd.getBoundingClientRect().bottom):null};
    const stray=[...P.querySelectorAll('.ksub,.kcattabs')].filter(e=>e.offsetParent&&!e.closest('.kpbar')&&!e.closest('.pc,.kpc,.dlg,#popw')).map(e=>e.className);if(stray.length)o.stray=stray;
    if(!bar)return o;const br=bar.getBoundingClientRect();o.bar=[Math.round(br.top),Math.round(br.bottom)];o.barTopOff=Math.round((br.top-(pr.top+bt))*10)/10;
    o.barW=Math.round(br.width-(pr.width-parseFloat(cs.borderLeftWidth)-parseFloat(cs.borderRightWidth)-(P.offsetWidth-P.clientWidth-parseFloat(cs.borderLeftWidth)-parseFloat(cs.borderRightWidth))));
    const bs=getComputedStyle(bar);o.opaque=/rgb\(/.test(bs.backgroundColor)||/rgba\([^)]*,\s*1\)/.test(bs.backgroundColor);o.shadow=bs.boxShadow!=='none';
    /* what is drawn just above and just below the bar's bottom edge, at 3 x positions */
    const xs=[br.left+12,br.left+br.width/2,br.right-14];o.above=[];o.edge=[];
    for(const x of xs){for(let y=Math.ceil(pr.top+bt);y<br.top-0.5;y++){const e=document.elementFromPoint(x,y);if(e&&P.contains(e)&&!bar.contains(e)&&e!==P)o.above.push(y)}
     const e2=document.elementFromPoint(x,br.bottom-1);if(e2&&P.contains(e2)&&!bar.contains(e2)&&e2!==bar)o.edge.push((e2.className||e2.tagName)+'')}
    return o});
   const rest=await m();await p.evaluate(()=>{const P=document.getElementById('panel');P.scrollTop=Math.min(500,P.scrollHeight)});await p.waitForTimeout(250);const scr=await m();
   const fail=[];if(!rest.hidden){
    if(rest.stray)fail.push('bar row outside the pane bar: '+rest.stray.join());
    if(rest.bar){if(Math.abs(rest.barTopOff)>1)fail.push('bar not flush at rest '+rest.barTopOff);if(scr.bar&&Math.abs(scr.bar[0]-rest.bar[0])>1)fail.push(`bar moved on scroll ${rest.bar[0]}→${scr.bar[0]}`);
     if(scr.above&&scr.above.length)fail.push('content above bar at y '+scr.above.slice(0,3));if(scr.edge&&scr.edge.length)fail.push('content over the bar edge '+scr.edge[0]);if(!rest.opaque)fail.push('bar not opaque');if(rest.shadow)fail.push('bar shadow');if(Math.abs(rest.barW)>1)fail.push('bar not full width '+rest.barW)}
    if(rest.navGap!=null&&(rest.navGap<0||rest.navGap>12))fail.push('pane does not end at the nav: gap '+rest.navGap)}
   if(fail.length)bad+=fail.length;R[t]={rest,scr:scr&&{bar:scr.bar,st:scr.st,above:(scr.above||[]).length},fail};
   if(SHOTS&&(t==='act'||t==='inv'||t==='court'))await p.screenshot({path:`${SHOTS}/pane-${t}-${SZ}.jpg`,type:'jpeg',quality:70})}
  ALL[SZ]=R;await ctx.close()}
 const sum={};for(const [sz,R] of Object.entries(ALL))sum[sz]=Object.fromEntries(Object.entries(R).map(([t,v])=>[t,v.rest.hidden?'hidden':v.fail.length?v.fail:`ok${v.rest.bar?` bar ${v.rest.bar[1]-v.rest.bar[0]}px, hdGap ${v.rest.hdGap}, navGap ${v.rest.navGap}`:` (no bar) navGap ${v.rest.navGap}`}`]));
 console.log(JSON.stringify({bad,sum,errs},null,1));await b.close();process.exit(bad||errs.length?1:0)})();
