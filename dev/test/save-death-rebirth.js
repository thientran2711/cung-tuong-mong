/* save-death-rebirth (BIG rv save-unseen-lists rv5; MAIN 152 04:55Z, robot M5b LIVE f009e1a6: after death the next relaunch loaded the PRE-death save):
   a life plays, she dies (die()), then a TRUE reload at each moment of the death → rebirth path: (a) the death card on screen, (b) after «Chuyển kiếp»
   the new life's identity card open, (c) 4 s after «Nhận thân phận». Never may the title offer the dead life alive again (no rollback past a death);
   (b) must bring the SAME new-life card back, (c) the new life. usage: node dev/test/save-death-rebirth.js [index.html] [fold,ipadAir] → exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path');
const [,,PAGE='index.html',DEVS='fold,ipadAir']=process.argv;
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);const seedInit=eval(SBR.match(/const seedInit=(seed=>\{[\s\S]*?\}\};)\n/)[1].replace(/;$/,''));
(async()=>{const root=path.resolve(__dirname,'../..');const http=require('http');
 const srv=http.createServer((q,r)=>{fs.readFile(path.join(root,decodeURIComponent(q.url.split('?')[0])),(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':'text/html'});r.end(b)})}).listen(0);
 const url=`http://127.0.0.1:${srv.address().port}/${PAGE}`;const b=await chromium.launch();let bad=0;
 for(const dev of DEVS.split(','))for(const at of ['a','b','c']){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.addInitScript(seedInit,7);await ctx.route(/\.(webp|png|jpg|mp3|mp4|webm)(\?|$)/,r=>r.abort());
  const p=await ctx.newPage();p.setDefaultTimeout(300000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,120)));
  const open=async()=>{await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1200);await p.evaluate(H);await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}})};
  await open();
  const old=await p.evaluate(async()=>{__sbr.newLife();for(let i=0;i<4;i++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();await __sbr.after(k)}await __sbr.settle();return{name:S.name,key:__sbr.key()}});
  await p.evaluate(()=>die('Bệnh nặng không qua khỏi'));await p.waitForTimeout(800);let card=null;
  if(at!=='a'){for(let i=0;i<80;i++){const st=await p.evaluate(()=>{if(typeof NLP!=='undefined'&&NLP&&Q.some(m=>m.nl))return 'card';if(Q.length){const m=Q[0];const o=m.opts||[];const j=o.findIndex(x=>/kiếp mới|luân hồi|đầu thai|chuyển kiếp/i.test(String(x.n||'')));try{if(o.length)chooseM(j<0?0:j);else closeModal()}catch(e){Q.shift()}return 'q'}
    const bt=[...document.querySelectorAll('#modal button,#title button')].find(x=>x.offsetParent&&/kiếp mới|luân hồi|bắt đầu|chuyển kiếp/i.test(x.textContent));if(bt){bt.click();return 'b'}return 'none'});if(st==='card')break;await p.waitForTimeout(300)}
   card=await p.evaluate(()=>({name:S.name,seed:NLP&&NLP.seed}));
   if(at==='c'){await p.evaluate(()=>{const b=document.querySelector('button[data-nl="ok"]');if(b&&b.offsetParent)b.click();else nlAccept(false)});await p.waitForTimeout(4000);card.after=await p.evaluate(()=>__sbr.key())}}
  await p.reload({waitUntil:'domcontentloaded'});await open();
  const t=await p.evaluate(()=>{const s=document.getElementById('slots');const bt=s.querySelector('button[data-load="1"]');return{cont:!!bt,slot:(s.querySelector('.slot')||{}).innerText||''}});
  let back=null;if(t.cont){await p.evaluate(()=>document.querySelector('#slots button[data-load="1"]').click());await p.waitForTimeout(2500);back=await p.evaluate(()=>({name:S.name,dead:!!S.dead,key:__sbr.key(),nl:!!(typeof NLP!=='undefined'&&NLP),seed:typeof NLP!=='undefined'&&NLP?NLP.seed:null}))}
  const deadAlive=back&&back.name===old.name&&!back.dead;
  let pass=!deadAlive&&!pe.length;if(at==='b')pass=pass&&back&&back.name===card.name&&back.nl&&back.seed===card.seed;if(at==='c')pass=pass&&back&&back.name===card.name&&!back.nl&&back.key===card.after;
  if(!pass)bad++;console.log(pass?'PASS':'FAIL',dev,'reload at',{a:'death card',b:'new-life identity card',c:'4 s after Nhận thân phận'}[at],'· old',old.name,old.key,'· new',card?card.name:'-','· title',t.cont?'«Tiếp tục» → '+JSON.stringify(back):'no Tiếp tục: '+t.slot.replace(/\s+/g,' ').slice(0,50),deadAlive?'· DEAD LIFE BACK ALIVE (pre-death save)':'',pe.length?'· pageerror '+pe[0]:'');await ctx.close()}
 await b.close();srv.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
