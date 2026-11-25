
const fs=require('fs');global.__KP=global.__KP||{n:0,seen:new Set()};const KP=global.__KP;
async function captureKpopts(page,log){
 try{const d=await page.evaluate(()=>{const b=document.querySelector('.kpopts');if(!b)return null;const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
  const dlg=document.querySelector('.dlg');const m=document.getElementById('modal');const opts=[...b.querySelectorAll('.kopt')].filter(e=>e.getBoundingClientRect().width>5);
  const frameBottom=dlg?dlg.getBoundingClientRect().bottom:null;const bad=opts.filter(e=>{const r=e.getBoundingClientRect();return (r.top+r.height/2)>frameBottom-3});
  const title=((document.querySelector('.dlg h2,.dlg .ttl,.dlg .kpt,.dlg [class*=title]')||{}).innerText||'').slice(0,80);
  return JSON.stringify({title,bad:bad.length,frameBottom,dlgClass:dlg&&dlg.className,dlgStyle:dlg&&dlg.getAttribute('style'),modalClass:m&&m.className,ksz:[...document.querySelectorAll('[class*=ksz]')].map(e=>e.className.slice(0,60)),rects:{dlg:R(dlg),modal:R(m),opts:R(document.querySelector('.opts')),kpopts:R(b),k3right:R(document.querySelector('.k3right')),mb:R(document.getElementById('mb')),body:R(document.querySelector('.k3body'))},kpoptsScroll:[b.scrollTop,b.scrollHeight,b.clientHeight],cards:opts.map(e=>R(e)),vp:[innerWidth,innerHeight]})});
  if(!d)return;const o=JSON.parse(d);const key=o.title+'|'+o.bad;if(!o.bad||KP.seen.has(key)||KP.n>=6)return;KP.seen.add(key);KP.n++;
  const dir='/home/user/wt/h4/dev/handover/robot/m4/kpopts/'+String(KP.n).padStart(2,'0')+'/';fs.mkdirSync(dir,{recursive:true});
  const sv=await page.evaluate(()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).filter(k=>/hclh/i.test(k)).map(k=>[k,localStorage.getItem(k)]))));
  const hud=await page.evaluate(()=>(document.querySelector('.me')||{}).innerText+' | '+(document.querySelector('.k3time')||{}).innerText);
  let sha='';try{sha=require('child_process').execSync('git -C /home/user/cung-tuong-mong rev-parse --short HEAD').toString().trim()}catch(e){}
  fs.writeFileSync(dir+'dump.json',JSON.stringify({buoi:(global.__S||{}).buoi,hud:hud.replace(/\s+/g,' '),build:sha,at:new Date().toISOString(),dump:o},null,1));fs.writeFileSync(dir+'save.json',sv);await page.screenshot({path:dir+'shot.png'});
  fs.appendFileSync('/home/user/wt/m4/out/notes.txt','KPOPTS-CAPTURE '+dir+' title='+o.title+' bad='+o.bad+'\n');log('KPOPTS-CAPTURE '+dir+' title='+o.title+' bad='+o.bad+' (send_message KK26 session_01V1ZZH4SPGe7wyGEj1X8j3Y)')}catch(e){log('kpopts capture err '+String(e).slice(0,100))}}
const ADV=[/^Tuân chỉ/,/^Đã hiểu/,/^Tiếp ▸/,/^Tiếp theo$/,/^Tiếp$/,/^Tiếp tục$/,/^Đã rõ/,/^Hiểu rồi/,/^Xong/,/^Đồng ý/,/^Nhận/,/^Được$/,/^Ghi nhớ/,/^Đóng$/,/^Thôi$/,/^Vào cung/,/^Bỏ qua/,/^Tạ ơn/];
let ODDS=null;const S=global.__S||(global.__S={key:'',used:new Set(),tabTried:0,scrolls:0,buoi:0,noprog:0,noNext:0,nextTaps:0});
const CAT_PRI={'Nghỉ ngơi':2,'Y dược':3,'Học tập':4,'Lễ nghi':5,'Giao thiệp':6,'Mưu kế':99,'Lối riêng':99};
module.exports=async function(cs,{EXIT,page,log}){
 await captureKpopts(page,log);
 if(!ODDS)ODDS=await page.evaluate(()=>typeof KIT_ODDS!=='undefined'?KIT_ODDS.map(String):[]).catch(()=>[]);
 const ok=cs.filter(c=>!/kpopts/.test(c.cls)&&!EXIT.test(c.txt)&&!/^Xem đầy đủ/.test(c.txt));
 if(!ok.length&&cs.length)return {wait:1500};
 const rank=c=>{let r=-1;ODDS.forEach((w,i)=>{if(c.txt.toLowerCase().includes(w.toLowerCase()))r=Math.max(r,i)});return r};
 /* modal option cards: highest odds (cautious) */
 const opts=ok.filter(c=>(c.txt.match(/TỐN/g)||[]).length===1&&/ĐƯỢC/.test(c.txt)&&c.w>150&&!/kpopts|kdis/.test(c.cls));
 const mainScreen=ok.some(c=>c.id==='menu')&&(ok.some(c=>c.id==='next')||ok.some(c=>c.txt==='Về phòng')||ok.some(c=>c.txt==='Hành sự'&&c.cy>900))&&!ok.some(c=>/kopt|kfoc/.test(c.cls))&&!ok.some(c=>c.txt==='✕'&&c.cy<880);
 if(!mainScreen){
  const ready=ok.find(c=>/^Sẵn sàng/.test(c.txt));
  if(ready){const skip=ok.find(c=>/^Bỏ qua/.test(c.txt));if(S.mgDecided!==ready.cx+','+ready.cy+S.buoi){S.mgDecided=ready.cx+','+ready.cy+S.buoi;S.mgSkip=Math.random()<.1;log('MG intro: '+(S.mgSkip?'SKIP (10%)':'PLAY'))}return (S.mgSkip&&skip)?skip:ready}
  for(const re of ADV.filter(r=>!/Bỏ qua/.test(String(r)))){const c=ok.find(c=>re.test(c.txt)&&!/TỐN/.test(c.txt));if(c)return c}
  {const kb=cs.find(c=>/kpopts/.test(c.cls));if(!opts.length&&kb){S.kscr=(S.kscr||0)+1;await page.mouse.move(kb.cx,Math.min(880,Math.max(840,kb.cy)));await page.mouse.wheel(0,S.kscr%8<4?200:-400);return {wait:400}}}
  if(opts.length){S.tc=S.tc||{};const kk=c=>S.buoi+'|'+c.txt.slice(0,50);
   const sc=c=>rank(c)*10-(S.tc[kk(c)]||0)*25+(/^Đi một mình/.test(c.txt)?5:0)+(/^Lên đường/.test(c.txt)?3:0);
   let best=opts[0],bs=sc(best);for(const c of opts){const s2=sc(c);if(s2>bs){best=c;bs=s2}}S.tc[kk(best)]=(S.tc[kk(best)]||0)+1;
   if(best.cy>2000||best.cy<-2000){const box=cs.find(c=>/kpopts/.test(c.cls));const bx=box?box.cx:494,by=Math.min(900,Math.max(150,box?box.cy:870));await page.mouse.move(bx,Math.min(by,880));await page.mouse.wheel(0,best.cy>905?160:-160);return {wait:350}}{const fb=await page.evaluate(()=>{const d=document.querySelector('.dlg');return d?d.getBoundingClientRect().bottom:880}).catch(()=>880);const top=best.cy-best.h/2;
   if(top>fb-30){const bx=best.cx,by=Math.min(fb-40,Math.max(200,best.cy));await page.mouse.move(bx,Math.min(by,fb-40));await page.mouse.wheel(0,160);return {wait:350}}
   const y=Math.min(Math.round(fb-14),Math.round(top+Math.min(best.h*.6,90)));return Object.assign({},best,{cx:Math.round(best.cx+10),cy:y})}}
  {const b=ok.find(c=>/^Bỏ qua/.test(c.txt));if(b)return b}
  const real=ok.filter(c=>!/kpopts|kodm|kobang|kdis|kitem/.test(c.cls)&&c.txt&&c.txt!=='✕'&&!/^!$/.test(c.txt));
  if(real.length===1)return real[0];
  const x=ok.find(c=>c.txt==='✕');if(x)return x;
  if(!real.length){log('BLIND TAP (cinematic/tap-to-open)');return {cx:378,cy:500,txt:'blind-centre'}}
  return null}
 /* ---- main screen ---- */
 const hud=await page.evaluate(()=>{const t=s=>(document.querySelector(s)||{}).innerText||'';return {when:t('.k3time')+'|'+t('.me').replace(/\s+/g,' ').slice(-60)}});
 if(hud.when!==S.key){S.key=hud.when;S.used=new Set();S.tabTried=0;S.scrolls=0;S.noprog=0;S.buoi++;S.nextTaps=0;log('BUOI',S.buoi,hud.when)}
 const cards=ok.filter(c=>/\bcard\b/.test(c.cls)&&/kcard/.test(c.cls));
 const next=ok.find(c=>c.id==='next');
 const dumpHeld=async()=>{try{const d=await page.evaluate(()=>{const v=s=>{try{const e=document.querySelector(s);return e?(getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().width>0):false}catch(x){return null}};let nl=null;try{nl=typeof NLP!=='undefined'?String(NLP).slice(0,60):'undef'}catch(e){}let cb=null;try{cb=typeof cfBusy==='function'?cfBusy():'nofn'}catch(e){cb='err'}return JSON.stringify({when:document.querySelector('.k3time').innerText,Q:Q.map(m=>String(m.t||m.k||'').slice(0,50)),DQ:{want:DQ.want,t:DQ.t,mt:DQ.mt,newsHold:DQ.newsHold,stat:DQ.stat,bz:DQ.bz},nfX:(typeof S!=='undefined'&&S)?S.nfX:null,NLP:nl,cfBusy:cb,dawn:v('#dawn.on'),ov:v('#ov'),kmov:v('.kmov'),kpodov:v('#kpodov'),kroul:v('.kroul'),modal:v('#modal')})}).catch(e=>'dump err '+e);const k0=await page.evaluate(()=>JSON.stringify({kmHeld:DQ.stat.kmHeld,cfdbg:(window.__cfdbg===undefined?'undef':String(JSON.stringify(window.__cfdbg)).slice(0,300)),nfx:S.nfX&&S.nfX.st}));await page.waitForTimeout(2000);const k1=await page.evaluate(()=>JSON.stringify({kmHeld:DQ.stat.kmHeld,cfdbg:(window.__cfdbg===undefined?'undef':String(JSON.stringify(window.__cfdbg)).slice(0,300)),nfx:S.nfX&&S.nfX.st,cfBusy:cfBusy()}));require('fs').appendFileSync('/home/user/wt/m4/out/notes.txt','HELD-DUMP2 before='+k0+' after2s='+k1+'\n');
 require('fs').appendFileSync('/home/user/wt/m4/out/notes.txt','HELD-DUMP '+new Date().toISOString()+' '+d+'\n');log('HELD-DUMP '+d.slice(0,400))}catch(e){}};
 const nextOrUnstick=()=>{if(!next)return {wait:1200};S.nextTaps=(S.nextTaps||0)+1;if(S.nextTaps===3){dumpHeld()}if(S.nextTaps===3)log('BUG SANG-BUOI-HELD «Sang buổi» tapped 3x with no day change: day-queue holds unshown cards (Q.length>0, modal hidden); unstick = tap another tab (Dư đồ) which pops the card');if(S.nextTaps>=3&&S.nextTaps%2===1){const t=ok.find(c=>c.txt==='Dư đồ');if(t)return t}return next};
 const room=ok.find(c=>c.txt==='Về phòng');
 if(!next&&room)return room;
 if(!next&&S.noNext++>20){S.noNext=0;log('BUG-CAND main screen without enabled Sang buổi and no Về phòng')}
 if(!cards.length){
  if(S.tabTried++<1){const t=ok.find(c=>c.txt==='Hành sự');if(t)return t}
  if(!next){S.tabTried=0;return {wait:1200}}
  return nextOrUnstick()}
 const left=(cards[0].txt.match(/còn (\d+)/)||[])[1];
 if(left!=null&&+left<=0)return nextOrUnstick();
 /* acceptable: not used, no exit, not Mưu kế/Lối riêng, odds >= 'Có cơ' or none and without KÈM risk */
 const bac=await page.evaluate(()=>{const m=((document.querySelector('.kstg-res')||{}).innerText||'').match(/Bạc\s*(\d+)/);return m?+m[1]:999}).catch(()=>999);
 const cat=c=>{const m=Object.keys(CAT_PRI).find(k=>c.txt.startsWith(k));return m?CAT_PRI[m]:7};
 const good=cards.filter(c=>!S.used.has(c.txt)&&!/Giả bệnh|Cáo bệnh/.test(c.txt)&&cat(c)<99&&(rank(c)<0||rank(c)>=4)&&!(/Bạc -(\d+)/.test(c.txt)&&(bac-(+c.txt.match(/Bạc -(\d+)/)[1])<60))).sort((a,b)=>cat(a)-cat(b));
 if(good.length){const c=good[0];S.used.add(c.txt);return c}
 if(S.scrolls++<5)return {scroll:420};
 return nextOrUnstick()}
