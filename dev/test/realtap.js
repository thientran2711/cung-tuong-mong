/* realtap.js — tap like a REAL PERSON (owner 25/11 ~05:10Z: "Giống như là người bấm thật chứ không phải là máy bấm").
   LOCAL COPY with the ROLE A contract (dev/test/realtap.js on review/robot-realtap replaces it once pushed).
   tap(page, target, opts) — target = Playwright Locator | CSS selector | ElementHandle
     1. scroll the element into view (block centre, like a finger-scroll; no JS click)
     2. take the element's on-screen centre (clipped to the viewport)
     3. document.elementFromPoint(x,y) must be the element itself or one of its descendants
     4. tap at that point: page.touchscreen.tap when the context has touch, else page.mouse.click
   covered / off-screen / zero-size / hidden → logs «DEAD BUTTON» {screen,label,why,cover,shot} and returns false (nothing is tapped).
   opts: {screen:'name', label:'text', shot:'/path.jpg' (taken only on a dead button), log:fn, wait:ms after the tap (default 250)}
   Returns true when the tap was delivered. Never calls .click()/dispatchEvent/game functions. */
async function hitInfo(page,h){
  return h.evaluate(el=>{
    const r=el.getBoundingClientRect();const W=innerWidth,H=innerHeight;
    const lab=(el.getAttribute('aria-label')||el.textContent||el.title||'').replace(/\s+/g,' ').trim().slice(0,60);
    const cs=getComputedStyle(el);
    if(!el.isConnected)return{ok:false,why:'detached',lab};
    if(r.width<1||r.height<1||cs.visibility==='hidden'||cs.display==='none')return{ok:false,why:'zero-size/hidden',lab};
    const x0=Math.max(r.left,0),x1=Math.min(r.right,W),y0=Math.max(r.top,0),y1=Math.min(r.bottom,H);
    if(x1-x0<1||y1-y0<1)return{ok:false,why:'off-screen',lab,rect:[r.left|0,r.top|0,r.width|0,r.height|0]};
    const x=(x0+x1)/2,y=(y0+y1)/2;const t=document.elementFromPoint(x,y);
    const desc=e=>e?(e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,3).join('.'):'')):'none';
    if(t&&(t===el||el.contains(t)))return{ok:true,x,y,lab};
    /* a covering layer: also say whether ANY point of the button is free (partly covered) */
    let free=0;for(const fx of [.15,.5,.85])for(const fy of [.2,.5,.8]){const px=x0+(x1-x0)*fx,py=y0+(y1-y0)*fy,q=document.elementFromPoint(px,py);if(q&&(q===el||el.contains(q)))free++}
    return{ok:false,why:free?'centre covered ('+free+'/9 points free)':'covered',cover:desc(t),coverText:t?(t.textContent||'').replace(/\s+/g,' ').trim().slice(0,40):'',x,y,lab}});
}
async function tap(page,target,opts={}){
  let h=target;
  if(typeof target==='string')h=await page.$(target);
  else if(target&&typeof target.elementHandle==='function')h=await target.elementHandle({timeout:2000}).catch(()=>null);
  const log=opts.log||(m=>console.log(m));
  if(!h){log('DEAD BUTTON '+JSON.stringify({screen:opts.screen||'',label:opts.label||String(target),why:'not found'}));return false}
  /* finger-scroll: bring the button into view, also inside scrolling panels (scrollIntoView walks every scroll container) */
  await h.evaluate(el=>{const r=el.getBoundingClientRect();let clipped=r.top<0||r.bottom>innerHeight||r.left<0||r.right>innerWidth;
   for(let a=el.parentElement;a&&!clipped;a=a.parentElement){const cs=getComputedStyle(a);if(/(auto|scroll)/.test(cs.overflowY+cs.overflowX)){const q=a.getBoundingClientRect();if(r.top<q.top||r.bottom>q.bottom||r.left<q.left||r.right>q.right)clipped=true}}
   if(clipped)el.scrollIntoView({block:'center',inline:'nearest'})}).catch(()=>{});
  await page.waitForTimeout(60);
  const hi=await hitInfo(page,h).catch(e=>({ok:false,why:'eval: '+e.message.slice(0,60)}));
  if(!hi.ok){
    if(opts.shot)await page.screenshot({path:opts.shot,type:'jpeg',quality:60}).catch(()=>{});
    const rec={screen:opts.screen||'',label:opts.label||hi.lab||'',why:hi.why,cover:hi.cover||'',coverText:hi.coverText||'',shot:opts.shot||''};
    log('DEAD BUTTON '+JSON.stringify(rec));tap.last=rec;return false}
  const touch=await page.evaluate(()=>matchMedia('(pointer:coarse)').matches||'ontouchstart' in window).catch(()=>false);
  if(touch&&page.touchscreen)await page.touchscreen.tap(hi.x,hi.y);else await page.mouse.click(hi.x,hi.y);
  tap.last={ok:true,x:hi.x,y:hi.y,label:hi.lab};
  await page.waitForTimeout(opts.wait==null?250:opts.wait);return true}
module.exports={tap,hitInfo};
