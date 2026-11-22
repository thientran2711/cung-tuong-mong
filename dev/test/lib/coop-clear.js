/* coop-clear — THE one shared "a player taps it away" step of every co-op test bot's clear() (LAW 11, owner OD:L52/L474;
   rv coop-host-lag-r3, MAIN CHÍNH 103 order 22/11 02:50Z). Before: the same taps were pasted into ~60 bots in 3 versions
   (night-balance-bundle [data-km-close], coop-thin-g-f1 jfocus/jdfv, coop-host-lag-r2-r2) → every merge of two lanes conflicted.
   Now each bot's clear() calls  require('./lib/coop-clear.js').first(o, <its own page step>)  and only its own extra steps stay inline.
   Order (a player always meets them on top of the game first):
     1. the Luân hồi roulette of a new life: «Bỏ qua» (#kroul .krskip)                                   (night-balance-bundle / coop-thin-g-f1)
     2. a manual kit scene (night-end «Nhận» #kneov, reward box, person reveal): its own close [data-km-close]
        — skipped while window.__noclose is set (cn-force probe keeps the scene open on purpose)          (rv night-balance-bundle 735606d8)
     3. a jfocus dialogue line «Tiếp ▸» (.kfoc-next, e.g. cnvScold on a cung nữ)                          (coop-thin-g-f1 30e12013)
     4. a jdfv encounter: an NPC's card plays in the jfocus scene (Q[0].dfSeen, centre modal hidden): pick a choice «m<k>» (.kfoc-b)
                                                                                                          (coop-thin-g-f1 c40d175b; OPEN A of coop-host-lag-r2)
     5. the steal mini-game window kg82 (jsmg, night bundle): «Thôi, không chơi» #kg82skip / the result frame's kit ✕ — was pasted in coop-e2e,
        cn-force, coop-night only; the other bots sat on its intro for ever (x.st "mg": pool-face / room-faces / emo-seat / guest-names r3)
   tap(o)  → 'x' when it tapped something, '' otherwise (page closed / navigating = '').
   first(o, fn [, arg]) → 'x' after a tap, else the bot's own step o.p.evaluate(fn, arg).
   Count: window.__kfocN = taps of 3 + 4 (coop-room-faces prints it). */
const TAP=()=>{const vis=x=>!!x&&x.offsetParent!==null&&!x.disabled;
 const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
 if(!window.__noclose){const kc=[...document.querySelectorAll('.kmov [data-km-close]')].find(x=>vis(x)&&x.getClientRects().length);if(kc){kc.click();return'x'}}
 const kf=[...document.querySelectorAll('.kfoc-next')].find(x=>x.offsetParent!==null);if(kf){window.__kfocN=(window.__kfocN||0)+1;kf.click();return'x'}
 const q=typeof Q!=='undefined'&&Q[0];const kb=q&&q.dfSeen?[...document.querySelectorAll('.kfoc-b:not(.kfoc-off)')].find(x=>x.offsetParent!==null&&/^m\d+$/.test(x.dataset.id||'')):null;
 if(kb){window.__kfocN=(window.__kfocN||0)+1;kb.click();return'x'}
 /* 5. the steal mini-game window (jsmg herGame after «Tranh sủng» / «Chặn ngự giá», kg82): «Thôi, không chơi» on its intro, the result frame's kit ✕
    — never under a full-screen scene (a player touches the scene first) */
 if(![...document.querySelectorAll('.kmov')].some(x=>!x.classList.contains('km-out')&&getComputedStyle(x).display!=='none'&&getComputedStyle(x).visibility!=='hidden')){const kg=[...document.querySelectorAll('#kg82skip')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('[hidden]'))||(typeof KG82!=='undefined'&&KG82.phase==='result'?[...document.querySelectorAll('#ov .kit-x[data-kitx=kgback],#ov .kit-x[data-kitx=ov]')].find(x=>x.offsetParent!==null):null);if(kg){kg.click();return'x'}}
 return''};
async function tap(o){try{return await o.p.evaluate(TAP)}catch(e){return''}}
async function first(o,fn,arg){if(await tap(o)==='x')return'x';return arg===undefined?o.p.evaluate(fn):o.p.evaluate(fn,arg)}
/* SCR — a stuck seat's screen + night relay, for any bot's failure dump: o.p.evaluate(SCR) (modal title / buttons, visible scenes and
   overlays with their buttons, S.mg, the jnf night word nfDebug + S.nfLast, coop-e2e's day / relay traces when that bot installed them) */
const SCR=()=>{const V=x=>!!x&&x.offsetParent!==null;const bt=r=>[...r.querySelectorAll('button')].filter(V).map(x=>(x.id||x.className||'').toString().slice(0,24)+':'+x.textContent.trim().slice(0,20)+(x.disabled?'(off)':'')).slice(0,12);
 const m=document.getElementById('modal');let nf=null;try{nf=typeof nfDebug==='function'?nfDebug():null;if(nf)nf.last=S.nfLast?{d:S.nfLast.d,fin:S.nfLast.fin,ph:S.nfLast.ph}:null}catch(e){}
 return{day:typeof wk==='function'?wk():null,modal:m&&!m.hidden?{t:((document.getElementById('mt')||{}).textContent||'').slice(0,60),b:bt(m)}:null,
  ov:[...document.querySelectorAll('.kmov,#ov,#kg82,.kcf,#kroul,#kneov,.kfoc')].filter(x=>V(x)||getComputedStyle(x).display!=='none'&&x.getClientRects().length).map(x=>({k:(x.id||x.className).toString().slice(0,40),b:bt(x)})).slice(0,8),
  mg:typeof S!=='undefined'&&S&&S.mg?Object.keys(S.mg).slice(0,6):null,nf,ntr:window.__nfTr||null,dtr:window.__dayTr||null}};
module.exports={TAP,tap,first,SCR};
