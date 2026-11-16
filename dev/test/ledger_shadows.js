/* PEOPLE LEDGER audit (owner core law 16/11 13:40Z/13:50Z): on Dư đồ each place shows its own count of shadows and the counts ADD UP to the
   record (S.roster) — no extra, no missing, nobody counted twice. N random moments of real play (walks / new buổi), at each moment:
   - shown[k] = the map's "N bóng người" for every place spot; total shown
   - record now (current khắc): every person inside the palace (place != ngoai), except her, grouped by place and kind
   - hidden: in the record at a map place but not in that place's shadows; extra: shadows with nobody in the record there now;
     twice: one person counted at two places; offmap: record places with no spot on the map
   usage: node dev/test/ledger_shadows.js <page URL> [moments] [WxH] [origin]  → JSON summary */
const {chromium}=require('playwright');const [,,URL,NM,SZ,ORIG]=process.argv;const N=+NM||30;const [W,H]=(SZ||'1180x820').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForTimeout(2500);
 await p.evaluate(o=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;if(o)window.__forceOrigin=o;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()},ORIG||'');
 const rep=[];const agg={hidden:{},extra:{},twice:0,offmap:{},moments:0,sumShown:0,sumRec:0,bad:0};
 for(let i=0;i<N;i++){
  await p.evaluate(()=>{const clear=()=>{const ov=document.getElementById('ov');for(let j=0;j<5&&ov&&!ov.hidden;j++){const bs=ov.querySelectorAll('button');if(!bs.length)break;bs[bs.length-1].click()}let n=0;while(Q.length&&n++<30){const m=Q[0];if(m.opts&&m.opts.length){try{chooseM(m.opts.length-1)}catch(e){Q.shift()}}else{try{closeModal()}catch(e){Q.shift()}}}};clear();
   const r=Math.random();if(r<.4){try{nextBuoi()}catch(e){}}else{const L=places().map(x=>x.k).filter(k=>k!==S.place&&accessOf(S,k).ok);if(L.length)try{goTo(L[Math.floor(Math.random()*L.length)])}catch(e){}}clear();tab="go";render()});
  await p.waitForTimeout(400);
  const m=await p.evaluate(()=>{if(S.dead)return{dead:1};tab="go";render();const shown={};const NM=[];try{for(const x of places()){let n=x.k;try{n=accName(x.k)}catch(e){}NM.push([String(n),x.k])}}catch(e){}NM.sort((x,y)=>y[0].length-x[0].length);
   /* every spot on the map: buttons carry data-go; closed spots (div .off) are matched by their name */
   for(const el of document.querySelectorAll('#panel .mspot, [data-go]')){let k=el.dataset.go||el.dataset.ak;if(!k){const t=el.textContent.replace(/^\d+/,'').trim();const f=NM.find(z=>t.indexOf(z[0])===0);if(!f)continue;k=f[1]}if(k.indexOf('kpm:')===0||k in shown)continue;const s=el.querySelector('.msil,.mmeta');shown[k]=s?(+((s.getAttribute('aria-label')||s.textContent).match(/(\d+)\s*bóng/)||[0,0])[1]):0}
   const R=S.roster;if(!R||R.key!==j95key())return{norec:1};const kh=j95kh();const rec={},kind={};const who=R.who||{};
   const kd=id=>id==="emp"?"emp":id==="th"?"th":id[0]==="v"?"consort":id.indexOf("mm:")===0?(id==="mm:me"?"her maid":"consort maid"):id[0]==="s"?"servant":id.indexOf("c:")===0?id:id[0]==="m"?"man":id[0]==="q"?"official":id[0]==="k"?(id.indexOf("k:me:")===0?"her child":"child"):"other";
   const LK=typeof j95lk==="function"?j95lk:(x=>x);const HERE=LK(S.place);/* the maid road: her "home" = her mistress's palace */
   for(const id in R.P){const k=LK(R.P[id][kh][0]);if(!k||k===J95OUT_||id==="me"||(id==="mm:me"&&k===S.place&&k!=="home"))continue;/* her party is not a shadow */(rec[k]=rec[k]||[]).push(id);kind[id]=kd(id)}
   const vis={};/* who the map counts at each place (its own rule: arrival khắc, j95vis) */for(const k in shown){vis[k]=[];const ka=typeof j95arrKh==="function"?j95arrKh(k):kh;for(const id in R.P){if(LK(R.P[id][ka][0])===k&&j95vis(id,R.P[id][ka][0]))vis[k].push(id)}}
   const out={place:HERE,kh,shown,tot:0,rec:0,hidden:[],extra:[],twice:[],offmap:[]};const seen={};
   for(const k in shown){out.tot+=shown[k];for(const id of vis[k]){if(seen[id])out.twice.push(id+"@"+seen[id]+"+"+k);seen[id]=k}}
   for(const k in rec){out.rec+=rec[k].length;if(!(k in shown)&&k!==HERE){for(const id of rec[k])out.offmap.push(k+":"+kind[id]);continue}
    if(shown[k]!==rec[k].length)out.diff=(out.diff||[]).concat(k+" hiện "+shown[k]+" sổ "+rec[k].length);
    for(const id of rec[k])if(!(vis[k]||[]).includes(id))out.hidden.push(k+":"+kind[id]+":"+((who[id]||[])[0]||id))}
   for(const k in shown){const now=rec[k]||[];const ex=(vis[k]||[]).filter(id=>!now.includes(id));for(const id of ex)out.extra.push(k+":"+kind[id]+" (đến khắc khác)");if(shown[k]!==(vis[k]||[]).length)out.extra.push(k+": hiện "+shown[k]+" ≠ đếm "+(vis[k]||[]).length)}
   /* the stage at her place = the record there now */try{if(S.visit&&S.visit.k===S.place){const st=kitHereCount();const rh=(rec[HERE]||[]).length;
     /* the stage title's number ("Ở đây còn N người") = the people standing there (a hall of a palace counts its own hall) */
     const tm=document.querySelector('#sc-t .rmsg');const mt=tm&&/Ở đây (?:có|còn) (\d+) người/.exec(tm.textContent);const hall=typeof kpmHall==="function"&&kpmHall()&&!kpmHall().place;
     if(mt&&+mt[1]!==(hall?curPeople().length:st))out.title=(out.title||[]).concat(S.place+" tiêu đề "+mt[1]+" sân khấu "+st);if(st!==rh)out.stage=S.place+" sân khấu "+st+" sổ "+rh+" ["+S.visit.people.map(p=>p.kind).join(",")+"]"}}catch(e){out.stage="lỗi "+e.message}
   return out});
  if(m.dead||m.norec){rep.push(m);if(m.dead)break;continue}
  agg.moments++;agg.sumShown+=m.tot;agg.sumRec+=m.rec;if(m.hidden.length||m.extra.length||m.twice.length||m.offmap.length||m.diff||m.stage||m.title)agg.bad++;if(m.title)agg.title=(agg.title||[]).concat(m.title).slice(0,8);if(m.stage)agg.stage=(agg.stage||[]).concat(m.stage).slice(0,12);
  for(const h of m.hidden){const k=h.split(':').slice(0,2).join(':');agg.hidden[k]=(agg.hidden[k]||0)+1}
  for(const h of m.extra){agg.extra[h.replace(/\d+/g,'#')]=(agg.extra[h.replace(/\d+/g,'#')]||0)+1}agg.twice+=m.twice.length;for(const h of m.offmap)agg.offmap[h]=(agg.offmap[h]||0)+1;
  rep.push({i,place:m.place,kh:m.kh,diff:m.diff,tot:m.tot,rec:m.rec,h:m.hidden.length,x:m.extra.length,t:m.twice.length,o:m.offmap.length})}
 console.log(JSON.stringify({agg,pageErrors:errs.length,errs:errs.slice(0,4),moments:rep},null,0));await b.close()})();
