/* jevb checks: (1) context odds differ across lives / moods for the same option; (2) an event choice moves her mood with a cause, the mood
   seal opens the cause box (kit panel); (3) "trả lại quà ngươi tặng" only with a real gift, which comes back; borrow asks only for owned things.
   usage: NODE_PATH=$(npm root -g) node dev/test/event-context.js <url> [WxH] [shot.png] */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const [,,URL,VP,SHOT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 const ok=[];const chk=(n,c)=>ok.push([n,!!c]);
 const r=await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;$('modal').hidden=true;const out={};
  const v=liveRivals(false)[0];const ans="Thề thốt minh oan";const L=[];for(let s=1;s<=12;s++){S.ctxSeed=s;L.push(ctxOdds(v,ans))}out.lives=L;
  S.ctxSeed=5;v.emo=null;const a=ctxOdds(v,ans);emoSet(v,'gian',70,'test');const g=ctxOdds(v,ans);out.mood=[a,g];
  /* (3) doubtVisit */
  const s=E68I.doubtVisit;v.inv=(v.inv||[]).filter(e=>e.from!=="me");out.noGift=s.vf({a0:v.id});v.inv.push({k:'tramngoc',from:'me'});out.gift=s.vf({a0:v.id});
  const d=mkP('e68doubtVisit',{a0:v.id,vi:2});out.txt=d&&d.t;const n0=S.inv.filter(e=>e.k==='tramngoc').length;Q.push({t:'x',h:d.t,opts:d.o,who:d.who,pid:'e68doubtVisit',pp:{a0:v.id,vi:2}});chooseM(2);
  out.back=S.inv.filter(e=>e.k==='tramngoc').length-n0;out.vinv=v.inv.filter(e=>e.from==='me').length;
  const bd=E68I.borrowDress;S.inv=S.inv.filter(e=>!(IT[e.k]&&(IT[e.k].kd==='Y phục'||IT[e.k].kd==='Trâm cài'||IT[e.k].sl==='hair'))&&e.k!=='dancoc');S.arts.cam=0;out.borrowNone=bd.vf({a0:v.id});
  /* (2) mood from an event choice */
  Q.length=0;S.emo=null;S.emoH=[];const before=S.sung;const dd={t:'Việc thử',h:'<p>thử</p>',opts:[{n:'Dâng trà',fx:{sung:6,danh:4}}],pid:'e68test',pp:{}};Q.push(dd);chooseM(0);
  out.me=S.emo&&{k:S.emo.k,why:S.emo.why};out.causes=emoCauses(S).length;return out});
 chk('context odds differ between lives',new Set(r.lives).size>=3);chk('angry person = harder',r.mood[1]<r.mood[0]);
 chk('no gift given → no "trả quà" variant',!r.noGift.includes(2));chk('gift given → variant allowed',r.gift.includes(2));chk('names the real gift',/Trâm ngọc bích ngươi tặng/.test(r.txt||''));
 chk('the gift really comes back',r.back===1&&r.vinv===0);chk('borrow: nothing owned → only the maid variant',JSON.stringify(r.borrowNone)==='[3]');
 chk('event result moves her mood with a cause',r.me&&r.me.k==='vui'&&/Dâng trà/.test(r.me.why)&&r.causes>=1);
 /* the box from her seal */
 await p.evaluate(()=>{Q.length=0;$('modal').hidden=true;render()});await p.waitForTimeout(600);
 const box=await p.evaluate(()=>{const s=document.querySelector('img.kemo[data-emo="me"]');if(!s)return{seal:false};s.click();const m=Q[0];return{seal:true,t:m&&(m.t||m.title),h:(document.querySelector('#modal')||{}).innerText||''}});
 chk('her mood seal opens the cause box',box.seal&&/Tâm trạng/.test(box.t||box.h)&&/Dâng trà/.test(box.h));
 if(SHOT)await p.screenshot({path:SHOT});
 console.log(JSON.stringify({r,box:{seal:box.seal,t:box.t,h:(box.h||'').slice(0,300)},checks:ok,errs},null,1));await b.close();process.exit(ok.every(x=>x[1])&&!errs.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
