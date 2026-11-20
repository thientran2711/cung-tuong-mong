/* kc-roads-cn-nc-fix item 3: her own family at home is never shown as strangers. For each home road in the game data (tiểu thư tt dtq muoi thd ch td,
   cnv, nc; bd with KIN_BD=1 once its origin data is in — review/origins-r1): new life → "Ở nhà" → for every living family member: kitEmotion known (mood, no "?" badge), nature known (trKnown), the Gia tộc person
   card has no "chưa rõ" / "chưa gặp" / "???" / "Người lạ", and the Gia tộc pager strip names are not masked. Then (cnv, nc) after entering the palace
   nothing is asserted about the family (they are outside: the old rule applies again). usage: node kin-known.js <url> [WxH@dpr] */
const {chromium}=require('playwright');const URL=process.argv[2];const sz=process.argv[3]||'755x1000@2';const [wh,d]=sz.split('@');const [W,H]=wh.split('x').map(Number);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const out=[];let bad=0;
 for(const o of ['tt','dtq','muoi','thd','ch','td','cnv','nc'].concat(process.env.KIN_BD?['bd']:[])){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,serviceWorkers:'block'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3000);
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  await p.evaluate(og=>{for(let i=0;i<400&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}},o);await sleep(500);await skip();
  const R={o,fail:[]};const F=m=>R.fail.push(m);
  R.path=await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(!b)return false;b.click();return true});await sleep(700);
  if(!R.path){F('no home road');}else{
   await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(1200);
   for(let i=0;i<8;i++){const n=await p.evaluate(()=>{if(Q.length){Q.length=0;try{$("modal").hidden=true}catch(e){}return 1}return 0});if(!n)break;await sleep(300)}
   const r=await p.evaluate(()=>{const T=[];if(!isKc())return{err:'not home'};tab="rv";render();
    const strip=document.getElementById('panel').innerText;
    for(const m of S.kc.fam.filter(m=>m.alive)){const e=kitEmotion(m);const tk=trKnown(m);const div=document.createElement('div');div.innerHTML=kcFamCard(m);const t=div.innerText;
     const mood=typeof pcfMood==='function'?pcfMood(m):'';const taste=typeof pcfTaste==='function'?pcfTaste(m):'';const md=document.createElement('div');md.innerHTML=mood+taste;
     T.push({t:m.t,known:!!(e&&e.known),mood:e&&e.name,nature:tk.join('/'),card:/chưa rõ|chưa gặp|\?\?\?|Người lạ/.test(t)?t.match(/.{0,30}(chưa rõ|chưa gặp|\?\?\?|Người lạ).{0,20}/)[0]:'',pop:/chưa rõ|chưa gặp/.test(md.innerText)?md.innerText.slice(0,80):'',k61:typeof k61St==='function'?k61St(m):null})}
    return{T,strip:/\?\?\?|Người lạ/.test(strip)?strip.match(/.{0,30}(\?\?\?|Người lạ).{0,10}/)[0]:''}});
   R.kin=r;if(r.err)F(r.err);else{if(r.strip)F('pager strip masked: '+r.strip);for(const x of r.T){if(!x.known)F(x.t+': mood unknown');if(!x.nature)F(x.t+': nature unknown');if(x.card)F(x.t+': card "'+x.card+'"');if(x.pop)F(x.t+': popup "'+x.pop+'"')}}
   await p.screenshot({path:`/home/user/wt/kcfix/.tmp/kin-${o}-${wh}.jpg`,type:'jpeg',quality:55}).catch(()=>{})}
  if(errs.length)F('errors '+errs.join(' | '));if(R.fail.length)bad++;out.push(R);await c.close()}
 console.log(JSON.stringify(out.map(r=>({o:r.o,fail:r.fail,kin:r.kin&&r.kin.T&&r.kin.T.map(x=>`${x.t}:${x.known?x.mood:'?'}/${x.nature||'?'}`).join(' ')})),null,1));console.log(bad?`FAIL ${bad}/${out.length}`:`PASS ${out.length}/${out.length}`);await b.close();process.exit(bad?1:0)})();
