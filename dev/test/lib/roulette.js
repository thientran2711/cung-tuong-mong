/* Shared test helper: get past the first-run screens of a fresh new game like a player does.
   1) new-game roulette overlay (#kroul / #kroulw): tap "Bỏ qua" (.krskip)
   2) first-run download screen (#kload): tap "Vào cung ngay" ([data-kl=go]) when it is offered (it is offered
      when the pictures cannot be downloaded, e.g. offline sandbox)
   Usage:
     const {dismissRoulette,autoDismissRoulette}=require('./lib/roulette');
     await autoDismissRoulette(ctx);   // once per context/page, before page.goto: keeps tapping those buttons in the background
     await dismissRoulette(page);      // right after start(): wait for the overlays, tap, wait until they are gone
   The loading placeholder #kroulw has no button: it is waited out (the roulette replaces it). */
const BUSY=()=>!!(document.getElementById('kroul')||document.getElementById('kroulw')||document.querySelector('#kload:not(.out)'));
async function dismissRoulette(page,opt){
  const o=Object.assign({wait:4000,max:45000},opt||{});
  const t0=Date.now();let tapped=false,quietSince=0;
  while(Date.now()-t0<o.max){
    const busy=await page.evaluate(BUSY);
    if(!busy){if(!quietSince)quietSince=Date.now();if(Date.now()-quietSince>(tapped?500:o.wait))break;await page.waitForTimeout(100);continue}
    quietSince=0;
    for(const sel of ['#kroul .krskip','#kload [data-kl="go"]']){
      const b=page.locator(sel);
      if(await b.count()&&await b.first().isVisible()){try{await b.first().tap({timeout:2000})}catch(e){try{await b.first().click({timeout:2000})}catch(e2){}}tapped=true}
    }
    await page.waitForTimeout(100);
  }
  return tapped;
}
/* background auto-tap (the long-standing test convention), for scripts that call start() many times */
async function autoDismissRoulette(target){
  await target.addInitScript(()=>{
    /* a fresh browser profile = first-run: the game starts a ~1 GB picture download (#kload). Tests must not download it:
       the bulk requests (marked ctmload / x-ctm-load) fail like an offline phone, the screen then offers "Vào cung ngay"
       and the tap below enters the game, exactly the player path. */
    const f0=window.fetch;window.fetch=function(u,o){try{const url=String(u&&u.url||u);const h=o&&o.headers;
      if(/ctmload=1/.test(url)||(h&&(h['x-ctm-load']||(h.get&&h.get('x-ctm-load')))))return Promise.reject(new TypeError('test: first-run download blocked'))}catch(e){}return f0.apply(this,arguments)};
    setInterval(()=>{document.querySelectorAll('.krskip,#kload [data-kl="go"]').forEach(b=>b.click())},300)});
}
/* contest / mini-game result: a podium (#kpodov, tap its "Tiếp") may sit over the result card, and the card has no visible
   "Đã hiểu" button: a player closes it with the kit ✕ (.kit-x[data-kitx=ov]), which presses #kg82ok for them. */
/* reward moments (.kmov, e.g. the chest #kmrew): a player taps the chest to open it, then "Nhận" ([data-km-close]) */
async function clearMoments(page){
  for(let i=0;i<10&&await page.locator('.kmov').count();i++){
    const t=page.locator('.kmov [data-km-close]');
    if(await t.count()&&await t.first().isVisible())await t.first().tap({timeout:3000}).catch(()=>{});
    else await page.locator('.kmov').last().tap({timeout:3000,position:{x:200,y:300}}).catch(()=>{});
    await page.waitForTimeout(700);
  }
}
async function closeResult(page){
  for(let i=0;i<12;i++){
    await clearMoments(page);
    if(!await page.locator('#kpodov').count())break;
    const n=page.locator('.kpod-next').first();
    if(await n.count()&&await n.isVisible())await n.tap({timeout:5000}).catch(()=>{});else await page.locator('.kpod-stage').first().tap({timeout:3000}).catch(()=>{});
    await page.waitForTimeout(700);
  }
  await clearMoments(page);
  const x=page.locator('#kg82 .kit-x[data-kitx="ov"],#kg82 .kit-x[data-kitx="kgback"]');
  await x.first().waitFor({state:'visible',timeout:8000}).catch(()=>{});
  if(await x.count()&&await x.first().isVisible())await x.first().tap({timeout:8000});
  else await page.evaluate(()=>{const o=document.getElementById('kg82ok');if(o)o.click()});
}
/* the new-life popups a player taps through (identity card "Nhận thân phận", "Nhập cung", "Mệnh truyện"…): tap the primary button by its text */
async function passNewLifePopups(page,opt){
  const o=Object.assign({max:40,pri:['Nhận thân phận','Vào cung ngay','Đã hiểu','Tiếp','Đóng','Lui']},opt||{});
  await dismissRoulette(page);
  for(let i=0;i<o.max;i++){
    const st=await page.evaluate(()=>({q:Q.length,m:!document.getElementById('modal').hidden}));
    if(!st.q&&!st.m)break;
    /* KIT 81 scenes (flip card, edict, bloom...) end with ONE kit button .kmend outside #modal */
    const km=page.locator('.kmend:visible').first();
    if(await km.count()){await km.tap({timeout:3000}).catch(()=>{});await page.waitForTimeout(700);continue}
    const bt=await page.locator('#modal button').all();let hit=null;
    for(const t of o.pri){for(const x of bt){if(!(await x.isVisible()))continue;if((((await x.textContent())||'').trim()).startsWith(t)){hit=x;break}}if(hit)break}
    if(!hit)for(const x of bt){if(await x.isVisible()&&/mclose|kit-x/.test((await x.getAttribute('class'))||(await x.getAttribute('id'))||'')){hit=x;break}}
    if(hit)await hit.tap({timeout:3000}).catch(()=>{});
    await page.waitForTimeout(700);
  }
}
module.exports={passNewLifePopups,dismissRoulette,autoDismissRoulette,closeResult,clearMoments};
