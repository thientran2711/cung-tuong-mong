/* KIT §58 month calendar (review/month-calendar): desk calendar on her room's stage + kitMonthCal in the kit modal.
   Per size: desk button present at home, >=44 px, inside the stage, overlapping no name tag / side card / title / figure body (60 % width);
   opens the calendar; every month tab renders (12), no horizontal overflow, no clipped text in the calendar; a festival square opens the kit
   popover inside the viewport; only FEST festivals are marked (and Thánh thọ hides once Thái hậu is gone); lãnh cung shows the plain desk
   calendar. 390x844 = rotate prompt only (portrait phone).
   usage: node dev/test/month-cal.js <index.html> [outdir] [WxH@dpr ...] */
const {chromium}=require('playwright');const fs=require('fs');
const a=process.argv.slice(2);const IDX=a[0];const OUT=a[1]&&!/^\d+x/.test(a[1])?a[1]:null;
let SIZES=a.filter(x=>/^\d+x\d+@/.test(x));if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3','390x844@3'];
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';const html=fs.readFileSync(IDX,'utf8');
(async()=>{const b=await chromium.launch();const R={};const errs=[];let bad=0;
 for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route(u=>u.href.split('?')[0]===LIVE||u.href.split('?')[0]===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  await ctx.route(/\.(mp3|ogg)$/,r=>r.fulfill({status:404,body:''}));
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));
  const narrow=W<H&&W<500;await p.goto(LIVE+(narrow?'?khost=1':''),{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
  if(narrow){await p.waitForTimeout(4000);const rot=await p.evaluate(()=>{const f=document.getElementById('krotf');if(!f)return false;const t=getComputedStyle(f).transform;const m=t.match(/matrix\(([^)]+)\)/);if(!m)return false;const v=m[1].split(',').map(Number);return Math.abs(v[0])<0.01&&Math.abs(v[1])>0.01});R[SZ]=rot?'ok rotate prompt':'NO rotate prompt';if(!rot)bad++;
   if(OUT)await p.screenshot({path:`${OUT}/mcal-${SZ}.jpg`,type:'jpeg',quality:60});await ctx.close();continue}
  await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
  await p.waitForTimeout(2500);
  const m=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));['kroul','kroulw','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;document.getElementById('modal').hidden=true;
   /* the room desk calendar is retired (jrail: one place = the rail); the entry is the rail's Lịch tháng button */
   const bt=[...document.querySelectorAll('.krail button,.krail [role=button],.krail .kitem')].find(e=>/Lịch tháng/.test((e.getAttribute('aria-label')||'')+e.title+e.textContent))||document.querySelector('.krail button');const desk=!!document.getElementById('kmcdesk');if(desk)f.push('retired desk calendar is back');if(!bt){f.push('no rail Lịch tháng button');return{f}}
   bt.click();await sleep(900);const M=document.getElementById('modal');if(M.hidden||!M.querySelector('.kmc')){f.push('calendar did not open');return{f}}
   /* owner 21/11 mark #42: a normal phone month view = header with two arrows (+ swipe), NO wall of month chips, equal square day cells */
   window.__go=async(o)=>{const M=document.getElementById('modal');for(let k=0;k<30;k++){const c=+M.querySelector('.kmc').dataset.kmc;if(c===o)return;const b=M.querySelector(`.kmc-ar[data-kmcm="${c+(o>c?1:-1)}"]`);if(!b||b.disabled)return;b.click();await new Promise(r=>setTimeout(r,40))}};
   const tabs=M.querySelectorAll('.kmc-ar').length;if(tabs!==2)f.push('arrows '+tabs);if(M.querySelector('.pct,.kcattabs,.kmc-tabs'))f.push('month chip row still there');
   {const ar=[...M.querySelectorAll('.kmc-ar')].map(e=>e.getBoundingClientRect());if(ar.some(r=>r.width<43||r.height<43))f.push('arrow under 44px');
    const hd=M.querySelector('.kmc-head');if(!/^Tháng .+ · năm thứ/.test(hd.textContent))f.push('head text '+hd.textContent);
    const sq=[...M.querySelectorAll('.kmc-d')].map(e=>e.getBoundingClientRect());const w0=sq[0].width;if(sq.some(r=>Math.abs(r.width-r.height)>1.5||Math.abs(r.width-w0)>1.5))f.push('day cells not equal squares '+Math.round(w0)+'x'+Math.round(sq[0].height));
    const rows=new Set(sq.map(r=>Math.round(r.top)));const wide=M.querySelector('.kmc').getBoundingClientRect().width>=470;if(rows.size!==(wide?3:6))f.push('day rows '+rows.size+(wide?' (wide: 10 per tuần)':' (narrow: 5 per row)'));if(w0<40)f.push('day cell too small '+w0);
    /* swipe: left = next month, right = back */
    const mk=(x)=>new Touch({identifier:1,target:M.querySelector('.kmc-grid'),clientX:x,clientY:300});const g=()=>M.querySelector('.kmc-grid');const fire=(a,b)=>{const t0=mk(a),t1=mk(b);g().dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[t0],changedTouches:[t0]}));g().dispatchEvent(new TouchEvent('touchend',{bubbles:true,touches:[],changedTouches:[t1]}))};
    fire(300,100);await sleep(80);if(+M.querySelector('.kmc').dataset.kmc!==1)f.push('swipe left did not go to next month');fire(100,300);await sleep(80);if(+M.querySelector('.kmc').dataset.kmc!==0)f.push('swipe right did not go back');
    const l=M.querySelector('.kmc-ar[data-kmcm="-1"]');l.click();await sleep(80);if(+M.querySelector('.kmc').dataset.kmc!==-1)f.push('arrow back to last month failed');if(!M.querySelector('.kmc-ar[data-kmcm="-2"]').disabled)f.push('arrow not disabled before last month');await __go(0)}
   const clip=[];let marked=0;const keys=new Set();
   for(let o=0;o<12;o++){await __go(o);await sleep(120);const c=M.querySelector('.kmc');
    c.querySelectorAll('.kmc-fn,.kmc-n,.kmc-tl span,.kmc-head,.kp,.kmc-lk,.pct').forEach(e=>{if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='auto')clip.push(o+':'+e.textContent.slice(0,16))});
    c.querySelectorAll('.kmc-d.f').forEach(e=>{marked++;keys.add(e.dataset.kmcf)});
    if(c.scrollWidth>c.clientWidth+1)f.push('calendar h-overflow month '+o)}
   if(clip.length)f.push('clipped '+clip.slice(0,6).join('|'));
   const notFest=[...keys].filter(k=>!(k in FEST));if(notFest.length)f.push('not FEST: '+notFest);
   /* back to month 0, tap the first festival square of the year */
   let o1=0;for(let o=0;o<12;o++){await __go(o);await sleep(80);if(M.querySelector('.kmc-d.f')){o1=o;break}}
   const sq=M.querySelector('.kmc-d.f');sq.click();await sleep(250);const pp=document.getElementById('kpop');
   if(!pp||pp.hidden)f.push('no popover');else{const q=pp.getBoundingClientRect();if(q.left<0||q.right>innerWidth||q.top<0||q.bottom>innerHeight)f.push('popover off screen')}
   const pop=pp?pp.innerText.split('\n').slice(0,3).join(' / '):'';
   const sw=document.documentElement.scrollWidth-innerWidth;if(sw>1)f.push('page h-overflow '+sw);
   const dl=M.querySelector('.dlg').getBoundingClientRect();if(dl.right>innerWidth+1||dl.left<-1)f.push('dialog off screen');
   window.__o1=o1;return{f,desk,tabs,marked,keys:[...keys].sort().join(','),pop,ov:Math.round(ov)}});
  if(m.f&&m.f.length)console.log(SZ,JSON.stringify(m.f));
  if(OUT){await p.screenshot({path:`${OUT}/mcal-${SZ}-pop.jpg`,type:'jpeg',quality:60})}
  /* §58.3+ (review/cal-plus): day box, sổ hẹn + reminders, forecast = next roll, known entries, hooks, quẻ chip */
  const m3=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));const pp=document.getElementById('kpop');if(pp)pp.hidden=true;
   const M=document.getElementById('modal');const q=s=>M.querySelector(s);
   await __go(0);await sleep(200);const btns=M.querySelectorAll('.kmc-grid button.kmc-d').length;if(btns!==30)f.push('day buttons '+btns);
   if(!q('.kmc-row.on .kmc-que'))f.push('no quẻ chip on this tuần');
   const n=mcNow();const o=n.t<2?0:1,d=n.t<2?(n.t+1)*10+3:3;await __go(o);await sleep(150);q(`.kmc-d[data-kmcd="${d}"]`).click();await sleep(400);
   const box=q('.kmc-day');if(!box)f.push('no day box');else{const c=q('.kmc');if(c.scrollWidth>c.clientWidth+1)f.push('day box h-overflow');
    box.querySelectorAll('.kpkb,.kmc-sub,.kbtn,.kctl-l').forEach(e=>{if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='auto')f.push('day box clipped '+e.textContent.slice(0,14))});
    const i=q('#kmc-note');if(!i)f.push('no note box');else{i.value='Thử hẹn lịch';q('[data-kmcsave]').click();await sleep(300);
     if(!(S.calNotes||[]).some(x=>x.txt==='Thử hẹn lịch'))f.push('note not saved');if(!/Thử hẹn lịch/.test(q('.kmc').innerText))f.push('note not shown')}}
   /* past tuần log: the current day box shows "sổ đã ghi" */
   await __go(0);await sleep(150);q(`.kmc-d[data-kmcd="${n.t*10+1}"]`).click();await sleep(300);if(!/sổ đã ghi/.test(q('.kmc-day').innerText))f.push('no log in day box');
   /* known entries + hooks */
   const has=(k)=>{for(let x=-1;x<12;x++){const E=mcExtra(x);for(const dd in E)if(E[dd].some(e=>e.k===k))return true}return false};
   S.preg=3;S.pregUnk=0;S.fake=0;if(!has('due'))f.push('no due month');S.preg=0;
   S.ex={to:(S.rank||0)+1,w0:wk()+1,w1:wk()+4};if(!has('exam'))f.push('no exam');S.ex=null;
   S.kids=S.kids||[];const kk=mkKid('m',8);kk.name='Hoàng tử Thử';S.kids.push(kk);if(!has('kid'))f.push('no kid birthday');if(!has('kexam'))f.push('no child test');S.kids.pop();
   window.thaiyNextVisit=()=>wk()+2;if(!has('thaiy'))f.push('thaiy hook unused');delete window.thaiyNextVisit;
   window.cycleDaysOf=()=>[4,5,6];const h=kitMonthCal({o:0});if((h.match(/kmc-d[^"]* cy/g)||[]).length!==3)f.push('cycle days not marked');delete window.cycleDaysOf;
   if(!has('bong')&&!isSrv())f.push('no stipend day');
   /* co-op: the friend's days (her blob in the canonical world) + the share switch in the day box */
   const cw0=window.COOPW;window.COOPW={on:true,seat:'a',base:{P:{b:{name:'Hảo hữu Thử',S:{name:'Hảo hữu Thử',bmonth:mcNow().m,preg:5,calNotes:[{w:wk()+1,d:1,txt:'Hẹn chung',share:1}]}}}}};
   const fr=[];for(let x=0;x<12;x++){const E=mcExtra(x);for(const dd in E)E[dd].forEach(e=>{if(e.k==='friend')fr.push(e.txt)})}
   if(!fr.some(t=>/Sinh thần Hảo hữu Thử/.test(t)))f.push('co-op: no friend birthday');if(!fr.some(t=>/lâm bồn/.test(t)))f.push('co-op: no friend due month');if(!fr.some(t=>/Hẹn chung/.test(t)))f.push('co-op: no shared note');
   if(!/kmc-share/.test(kitMonthCal({o:0,sel:mcNow().t*10+1})))f.push('co-op: no share switch');window.COOPW=cw0;
   kitModalClose&&kitModalClose();Q.length=0;M.hidden=true;
   /* forecast + reminders across two real tuần */
   S.staff=S.staff||[];if(!S.staff.length)S.staff.push({sid:9901,name:'Lão Thử',role:'eunuch',fc:0,fk:0,face:0,hue:0,age:52,tr:'trung',loyal:60,spyFor:null,lover:null,af:{},kn:1,imp:'',org:''});else S.staff[0].age=52;
   S.calNotes=[{id:99,w:wk()+2,d:1,txt:'Hẹn hai tuần'}];const fc=mcWxNext();if(!fc)f.push('no forecast');
   const seen=[];for(let i=0;i<2;i++){Q.length=0;M.hidden=true;S.mg=0;const before=wk();try{endTurn()}catch(e){f.push('endTurn '+e.message)}
    if(i===0&&fc&&S.wx&&(S.wx.b||S.wx.n)!==fc[0])f.push(`forecast ${fc[0]} but ${S.wx.b||S.wx.n}`);
    seen.push(Q.filter(m=>m.t==='Sổ hẹn').map(m=>JSON.stringify(m.kit&&m.kit.rows||'')).join('|'))}
   if(!/Tuần sau/.test(seen[0]))f.push('no reminder the tuần before');if(!/Tuần này/.test(seen[1]))f.push('no reminder on the tuần');
   if(!(S.logs||[]).some(x=>/Sổ hẹn: Hẹn hai tuần/.test(x)))f.push('reminder not in log');
   Q.length=0;M.hidden=true;{const dw=document.getElementById('dawn');if(dw){dw.hidden=true;dw.innerHTML='';document.body.classList.remove('kbk-open')}}render();kitMonthCalOpen();await sleep(600);const n2=mcNow();const sq=document.querySelector(`#modal .kmc-d[data-kmcd="${n2.t*10+2}"]`);if(sq)sq.click();await sleep(500);return{f}});
  if(OUT){await p.screenshot({path:`${OUT}/mcal-${SZ}-day.jpg`,type:'jpeg',quality:60})}
  const m2=await p.evaluate(async()=>{const f=[];const sleep=t=>new Promise(r=>setTimeout(r,t));const pp=document.getElementById('kpop');if(pp)pp.hidden=true;
   await __go(0);await sleep(300);const on=document.querySelector('#modal .kmc-row.on .kmc-now');if(!on)f.push('no Tuần này');
   /* Thánh thọ hides after Thái hậu dies */
   S.thDead=1;const has=(()=>{for(let o=0;o<12;o++){const h=kitMonthCal({o});if(/data-kmcf="thanhtho"/.test(h))return true}return false})();if(has)f.push('thanhtho shown after Thái hậu died');S.thDead=0;
   const has2=(()=>{for(let o=0;o<12;o++){if(/data-kmcf="thanhtho"/.test(kitMonthCal({o})))return true}return false})();if(!has2)f.push('thanhtho missing');
   kitModalClose&&kitModalClose();Q.length=0;document.getElementById('modal').hidden=true;
   const bt=true,cp=S.place;
   return{f,cold:!!bt,cp}});
  if(OUT){await p.screenshot({path:`${OUT}/mcal-${SZ}-cold.jpg`,type:'jpeg',quality:60})}
  const F=[...(m.f||[]),...(m3.f||[]),...(m2.f||[])];bad+=F.length;R[SZ]=F.length?F:`ok rail entry · ${m.marked} festival squares (${m.keys}) · pop "${m.pop}"`;await ctx.close()}
 console.log(JSON.stringify({bad,R,errs},null,1));await b.close();process.exit(bad||errs.length?1:0)})();
