/* two ways to rest (jrest, owner 11/15): the card shows what the act really does.
   Dưỡng sức: only buổi tối, uses every khắc left (≥ BAL.restDsMinK), Sức +BAL.restDsSuc, a tonic from the chest or Bạc BAL.restDsBac.
   Một lát: any buổi, BAL.restLatK khắc, Sức +BAL.restLatSuc, free, eases a bad mood by BAL.restLatEmo.
   usage: node dev/test/rest-cards.js <url> */
const {chromium}=require('./lib/pw-roulette');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});/* wait for the loader (jload) to hand over, else start() can run before the game is ready and S stays undefined */
 for(let n=0;n<600;n++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await p.waitForTimeout(1000)}
 await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<12;i++){start();if(!isSrv())break}Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;tab="act";const out={};
  const txt=i=>{const el=document.querySelector(`.card[data-i="${i}"]`);return el?{dis:el.disabled,t:el.innerText.replace(/\s+/g," ").slice(0,320)}:null};
  const dsCard=()=>{let i=deck.findIndex(a=>a.rest==="ds");if(i<0){const a=pool().find(a=>a.rest==="ds");deck.push(a);i=deck.length-1}return i};
  const latI=()=>deck.findIndex(a=>a.rest==="lat");
  const close=()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const t=document.getElementById('rtoast');if(t)t.classList.remove('on')};
  /* morning: Dưỡng sức closed, Một lát open */
  S.buoi=0;used=0;S.suc=40;S.bac=100;S.inv=S.inv.filter(e=>!(IT[e.k]&&IT[e.k].kd==="Thuốc bổ"));let i=dsCard();render();out.dsMorning=txt(i);
  let j=latI();out.latMorning=txt(j);
  /* Một lát with a bad mood */
  S.emo={k:"buon",v:40,why:"test",w:emoW()};render();j=latI();out.latSad=txt(j);const s0=S.suc,u0=used,b0=S.bac;act(j);close();
  out.latDone={suc:S.suc-s0,khac:used-u0,bac:S.bac-b0,emo:S.emo&&S.emo.v};
  /* evening, no tonic: Bạc */
  deck.forEach(a=>a.done=0);S.buoi=restDsB();used=1;S.suc=40;S.bac=100;render();i=dsCard();out.dsEveBac=txt(i);let s1=S.suc,b1=S.bac;act(i);close();out.dsBacDone={suc:S.suc-s1,bac:S.bac-b1,used};
  /* evening, with a tonic: the tonic, no Bạc */
  deck.forEach(a=>a.done=0);used=0;S.suc=40;S.bac=100;S.inv.push({k:"agiao"});S.inv.push({k:"nhansam"});render();i=dsCard();out.dsEveTonic=txt(i);s1=S.suc;b1=S.bac;const n0=S.inv.length;act(i);close();
  out.dsTonicDone={suc:S.suc-s1,bac:S.bac-b1,used,inv:S.inv.length-n0,left:S.inv.filter(e=>IT[e.k]&&IT[e.k].kd==="Thuốc bổ").map(e=>e.k)};
  /* evening, only 1 khắc left: not enough */
  deck.forEach(a=>a.done=0);used=3;render();i=dsCard();out.dsLate=txt(i);
  /* evening, poor and no tonic */
  used=0;S.bac=3;S.inv=S.inv.filter(e=>!(IT[e.k]&&IT[e.k].kd==="Thuốc bổ"));render();i=dsCard();out.dsPoor=txt(i);
  return out});
 const ok=r.dsMorning&&r.dsMorning.dis&&r.latMorning&&!r.latMorning.dis&&/bớt Buồn/.test(r.latSad.t)
  &&r.latDone.suc===6&&r.latDone.khac===1&&r.latDone.bac===0&&r.latDone.emo===32
  &&r.dsBacDone.suc===20&&r.dsBacDone.bac===-8&&r.dsBacDone.used===4&&/Bạc/.test(r.dsEveBac.t)&&/3 khắc/.test(r.dsEveBac.t)&&/hết buổi tối/.test(r.dsEveBac.t)&&!/Bạc -8.*Bạc -8/.test(r.dsEveBac.t)
  &&r.dsTonicDone.suc===20&&r.dsTonicDone.bac===0&&r.dsTonicDone.used===4&&r.dsTonicDone.inv===-1&&r.dsTonicDone.left.join()==="nhansam"&&/Tốn[^Đ]*1 A giao trong rương[^Đ]*Được/.test(r.dsEveTonic.t)&&!/Được[^]*A giao/.test(r.dsEveTonic.t)&&!/Tốn[^Đ]*không/.test(r.dsEveTonic.t)
  &&r.dsLate.dis&&r.dsPoor.dis;
 console.log(JSON.stringify({ok,r,errs},null,1));await b.close();process.exit(ok&&!errs.length?0:1)})();
