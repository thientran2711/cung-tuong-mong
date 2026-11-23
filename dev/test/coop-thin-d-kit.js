/* part D r1 test helpers (coop-thin-d.js + coop-thin-d-probe.js):
   cardShot  — a REAL dialog shot of the card in front: what sits above the modal (Luân hồi, season card "Chạm để bỏ qua", Thánh chỉ, reward,
               chest) is hidden for the shot only (never tapped: a tap could start what it offers) and shown again after; the shot is taken at
               Fold 755x1000 AND iPad 1180x820 (viewport restored after). Shots go to $SHOTS (outside git) only.
   sameDom   — guest: the stand-in of the card in front (thin) renders exactly like the native card: for a pid card the native card is rebuilt
               from pid + pp in her own context; for a note (no pid) the same data without the `thin` mark. DOM tags + classes + data-* are
               compared, text is not (names may differ). Returns {ok, pid, diff}. */
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const hideOver=p=>p.evaluate(()=>{const M=document.getElementById('modal');const zM=+getComputedStyle(M).zIndex||0;let n=0;
 for(const el of [...document.body.children]){if(el===M||el.contains(M))continue;const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||el.hidden)continue;
  if(!/fixed|absolute/.test(cs.position)||(+cs.zIndex||0)<=zM)continue;const r=el.getBoundingClientRect();if(r.width<200||r.height<200)continue;el.dataset.shotHid=el.style.visibility||'-';el.style.visibility='hidden';n++}return n});
const showOver=p=>p.evaluate(()=>{for(const el of document.querySelectorAll('[data-shot-hid]')){el.style.visibility=el.dataset.shotHid==='-'?'':el.dataset.shotHid;delete el.dataset.shotHid}});
async function cardShot(o,name,swap){if(!process.env.SHOTS)return;const vp=o.p.viewportSize();
 for(const [w,h,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){try{await o.p.setViewportSize({width:w,height:h});await sleep(600);
  /* a showModal right after a resize renders the option block twice (kit, pre-existing: found by D r1, reported); a second one settles it */
  for(let k=0;k<3;k++){await o.p.evaluate(()=>{try{showModal()}catch(e){}});await sleep(600);if(await o.p.evaluate(()=>document.querySelectorAll('#modal .opts').length<=1))break}
  await hideOver(o.p);
  await o.p.screenshot({path:process.env.SHOTS+'/'+name+'-'+o.name+'-'+tag+(swap?'-swap':'')+'.png'})}catch(e){console.log('shot',name,String(e).slice(0,120))}finally{await showOver(o.p).catch(()=>{})}}
 await o.p.setViewportSize(vp);await o.p.evaluate(()=>{try{showModal()}catch(e){}})}
/* measured-size outcomes (kit size pass: viewport, text length, picture load timing) are not the card's look: left out of the signature.
   Affordability (kdis + data-kneed "thiếu … bạc") is state, not look: the stand-in carries the host's check on her STORED person (what the host
   will accept at pick time), the rebuilt one checks her live person; the two differ until part G (her week still runs on her phone). */
/* review/coop-driver-fails (LIVE thin-d 7 kit-copy reds): data-kfsp (jfigseal KFS_ID), data-kav (KIT_AV.P) and data-kfp (kfpGet) are per-render
   registry handles (a counter that names the person behind a picture / fact row), not look: every render takes the next number, so two
   renders of the SAME card never match on them (the «noise» rows). Left out of the signature; the person they point to is the card's data. */
const SIZEK=/^(kszf|ksz\d|kszlive|k3rows|k3grid|k3g\d|kpshort|k3odd|k3long|kdis|kasq)$/;
async function sameDom(o){const sig=()=>o.p.evaluate(K=>{const R=new RegExp(K);const M=document.getElementById('modal');const L=[];for(const e of M.querySelectorAll('*')){
  const d=[...e.attributes].filter(a=>/^(class|data-(?!m$|kzoom|kopic|subj|shot|ksz|lay|kbs|kneed|kapic|kfsp$|kav$|kfp$)|role)/.test(a.name)).map(a=>a.name==='class'?'class='+a.value.split(/\s+/).filter(c=>c&&!R.test(c)).sort().join('.'):a.name+'='+a.value).sort().join(' ');L.push(e.tagName+' '+d)}return L},SIZEK.source);
 const st=await o.p.evaluate(()=>{const m=Q[0];if(!m||!m.thin)return {err:'no thin card in front'};window.__sdM=m;const J=x=>JSON.parse(JSON.stringify(x));
  const A=J(m);let B;if(m.pid){const x=mkP(m.pid,m.pp||{});if(!x)return {pid:m.pid,skip:1};B={t:m.t,h:x.t,opts:J(x.o),who:x.who,pid:x.pid,pp:x.pp,cls:x.cls,must:1}}else{B=J(m);delete B.thin}
  window.__sdA=A;window.__sdB=B;
  /* while comparing, the host view is held back: gSync would put the real card back into her queue when B (no thin mark) is in front,
     and a longer queue renders a notice in its compact form (that was the only "difference" left) */
  if(!window.__sdEmit){window.__sdEmit=COOP.emit;COOP.emit=function(t){if(t==='thinview')return;return window.__sdEmit.apply(this,arguments)}}
  return {pid:m.pid||null,t:m.t,n:Q.length}});
 if(st.err)return {ok:false,why:st.err};if(st.skip){await o.p.evaluate(()=>{if(window.__sdEmit){COOP.emit=window.__sdEmit;window.__sdEmit=null}});return {ok:true,pid:st.pid,skip:'native card not buildable on her phone'}}
 const show=async k=>{await o.p.evaluate(k=>{Q[0]=JSON.parse(JSON.stringify(window[k]));showModal()},k);await sleep(600);return sig()};
 /* each is shown twice in a row (A A B B) and the second renders are compared: a first render can still be waiting on its picture
    (fig vs one), and the kit's layout also depends on what was shown just before (same history for both this way) */
 let a,b,a2,b2;try{a=await show('__sdA');a2=await show('__sdA');b=await show('__sdB');b2=await show('__sdB')}finally{await o.p.evaluate(()=>{Q[0]=window.__sdM;if(window.__sdEmit){COOP.emit=window.__sdEmit;window.__sdEmit=null}showModal()})}
 const cmp=(x,y)=>{const d=[];for(let i=0;i<Math.max(x.length,y.length)&&d.length<4;i++)if(x[i]!==y[i])d.push([x[i],y[i]]);return d};
 const diff=cmp(a2,b2),noise=cmp(a,a2);const r={ok:!diff.length,pid:st.pid||st.t,n:a.length,diff,noise:noise.length?noise:undefined};
 if(diff.length)r.data=await o.p.evaluate(()=>[JSON.stringify(window.__sdA).slice(0,700),JSON.stringify(window.__sdB).slice(0,700)]);return r}
module.exports={cardShot,sameDom};
