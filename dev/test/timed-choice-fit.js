/* TIMED CHOICE FIT (kit-size-10, KIT §32.5c + §69; night-final KIT REQUEST "clock chip off screen on Fold").
   Opens the event dialog (figure column + picture band + question + countdown chip + option cards) in several variants at the owner's devices and checks:
   (1) the dialog text (.kpmain: question + the §69 clock chip) sits ABOVE the option list, never in a row below it;
   (2) the clock chip is fully inside the screen and inside the dialog frame WITHOUT scrolling;
   (3) nothing throws. Shots: <outdir>/timed-<variant>-<size>.png (LOOK at them).
   usage: node dev/test/timed-choice-fit.js <url> <outdir> [WxH,...]   default 755x1000,412x1058,1180x820,390x844 */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(SIZES||'755x1000,412x1058,1180x820,390x844').split(',');if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;const rows=[];
 for(const sz of VPS){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,#krottip{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)try{nlNew()}catch(e){}start();return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
  const V=['sample','two','nochip'];
  for(const v of V){
   await p.evaluate(v=>{Q.length=0;document.getElementById('modal').hidden=true;
    const nop=()=>{},clk=()=>`<p class="nfcd">${kitCoopClock({left:30000,len:30000})}</p>`;
    if(v==='sample'){kitPopSample('timed');return}
    const o=[{n:"Tranh sủng",fx:{},x:"Khá chắc · thành: Hoàng thượng sang cung ngươi · hỏng: Sủng -3",go:nop},{n:"Chặn ngự giá",fx:{},x:"Tùy duyên · thành: Hoàng thượng sang cung ngươi · hỏng: Sủng -5",go:nop},{n:"Thôi",fx:{},go:nop}];
    Q.push({t:"Kính sự phòng",h:`<p>Tối nay thẻ bài của Quý phi được lật. Ngươi có ra tay giành đêm nay không?</p>${v==='nochip'?'':clk()}`,opts:v==='two'?o.slice(0,2):o,who:pEunCourt("ksp"),pid:"nfch"});showModal()},v);
   await sleep(1500);
   const r=await p.evaluate(()=>{const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return{l:r.left,t:r.top,r:r.right,b:r.bottom}};
    const M=document.getElementById('modal'),d=M.querySelector('.dlg'),mb=document.getElementById('mb');
    return{open:!M.hidden,dlg:R(d),mb:R(mb),main:R(mb.querySelector('.kpmain')),opts:R(mb.querySelector('.opts')),chip:R(mb.querySelector('.kchips.kctm')),vw:innerWidth,vh:innerHeight,banner:!!d.classList.contains('kdpbanner'),all:!!d.classList.contains('kdpall'),per:d.classList.contains('kdper')}});
   const why=[];if(!r.open||!r.main||!r.opts)why.push('dialog parts missing');else{
    if(r.main.t>=r.opts.t-1)why.push(`question block (top ${Math.round(r.main.t)}) is not above the options (top ${Math.round(r.opts.t)})`);
    if(v!=='nochip'){if(!r.chip)why.push('no clock chip');else{
     if(r.chip.b>r.vh||r.chip.t<0||r.chip.r>r.vw||r.chip.l<0)why.push(`chip off screen (y ${Math.round(r.chip.t)}–${Math.round(r.chip.b)} of ${r.vh})`);
     if(r.chip.b>r.mb.b+1||r.chip.t<r.mb.t-1)why.push(`chip outside the dialog body without scrolling (y ${Math.round(r.chip.t)}–${Math.round(r.chip.b)}, body ${Math.round(r.mb.t)}–${Math.round(r.mb.b)})`);
     if(r.chip.b>r.opts.t+1)why.push('chip below the top of the options')}}}
   if(errs.length)why.push('page errors: '+errs.join(' | '));
   if(OUT)await p.screenshot({path:`${OUT}/timed-${v}-${sz}.png`});
   rows.push(`${why.length?'FAIL':'ok  '} ${sz} ${v.padEnd(6)} banner:${r.banner?1:0} kdpall:${r.all?1:0} chip:${r.chip?Math.round(r.chip.t)+'-'+Math.round(r.chip.b):'-'} opts-top:${r.opts?Math.round(r.opts.t):'-'} ${why.join('; ')}`);if(why.length)bad++;
   await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});await sleep(300)}
  await ctx.close()}
 await b.close();console.log(rows.join('\n'));console.log(bad?`TIMED-CHOICE-FIT FAIL · ${bad} case(s)`:`TIMED-CHOICE-FIT OK · ${rows.length} cases`);process.exit(bad?1:0)})();
