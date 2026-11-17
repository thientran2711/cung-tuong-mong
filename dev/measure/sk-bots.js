/* review/suc-khoe: the D57 bot (review/preg-rate-r1 dev/measure/preg-bots.js) + health / pregnancy counters (miscarriage, preterm, overdue, mother deaths in childbirth, lệch sổ tests, Sức max by age).
   Original header: review/preg-rate (D57): births / palace children / NPC heir pressure with the real WEEKLY loop (endTurn: flip → nights → rivalsTurn → monthTick).
   usage: node dev/measure/preg-bots.js <page.html> <lives> <years> [out.json]   |   node dev/measure/preg-bots.js --merge a.json b.json …
   env SUNG (default 25) = her Sủng floor (60 = a favoured player); env SEED0 (default 5000) — the same seeds for a before/after pair; env BALJ='{"conc":.5}' merges into BAL (BALC='{"peak":2}' into BAL.cyc.fert).
   The player is a "sensible" bot (Sủng ≥ 25, Danh ≥ 15, Sức ≥ 60, Đức ≥ 55, bạc ≥ 80, rank ≥ 2; dialogs cleared; a flipped night of hers = night(S)).
   Prints per year: NPC births / NPC consort-years, her births, nights per consort, conception per night (NPC / her, by cycle phase),
   palace children alive after 5 and 10 years, NPC sons alive, lives where an NPC son is the named heir (S.heir with a mother). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,LS,YS,OUT]=process.argv;const LIVES=+LS||10,YEARS=+YS||10,CH=+process.env.CHUNK||5;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{if(PAGE==="--merge"){const L=[],E=[];for(const f of process.argv.slice(3)){const d=JSON.parse(fs.readFileSync(f,'utf8'));L.push(...d.lives);E.push(...d.errs)}return report(L,E)}
 const b=await chromium.launch({args:['--js-flags=--max-old-space-size=900','--disable-gpu']});const lives=[];const errs=[];
 for(let done=0;done<LIVES;done+=CH){
  const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${(+process.env.SEED0||5000)+done*7919};`+SEEDRNG+`window.__sung=${+process.env.SUNG||25};window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(1800000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(process.env.BALJ)await p.evaluate(`Object.assign(BAL,${process.env.BALJ})`);
  if(process.env.BALC)await p.evaluate(`BAL.cyc.fert=Object.assign(BAL.cyc.fert||{},${process.env.BALC})`);
  const part=await p.evaluate(([n,Y])=>{const out=[];try{document.getElementById('title').hidden=true}catch(e){}window.__nlInner=1;
   const r0=window.render;window.render=function(){};
   const tally={};const T=(k,v=1)=>tally[k]=(tally[k]||0)+v;
   const ph=q=>{try{if(typeof cyBase!=="function")return"-";const t=cyBase(q).t;return ["cyc","peak","low"][((S.tuan-t)%3+3)%3]}catch(e){return"-"}};
   const ng0=night;night=function(q){q=q||S;if(!q.preg){const me=q===S?"me":"npc";T(me+"N");T(me+"N_"+ph(q));const c=conceiveCh(q);T(me+"C",c);T(me+"C_"+ph(q),c);
     const r=ng0.apply(this,arguments);if(q.preg){T(me+"P");T(me+"P_"+ph(q))}return r}return ng0.apply(this,arguments)};
   const isMe=q=>q===S?"me":"npc";
   const pm0=pregMonthP;pregMonthP=function(q){if(!q||!q.preg||q.fake)return pm0.apply(this,arguments);const w=isMe(q),m0=q.misN||0,c=q.preg,al=q===S?!S.dead:q.alive!==false;const r=pm0.apply(this,arguments);
     if((q.misN||0)>m0){T(w+"Mis");T(w+"Mis_m"+c)}const dead=q===S?S.dead:q.alive===false;if(al&&dead&&!q.preg)T(w+"PregDie");return r};
   const bp0=birthP;birthP=function(q,fake){if(fake||!q)return bp0.apply(this,arguments);const w=isMe(q),h0=q.hardN||0,s0=q.stillN||0;const r=bp0.apply(this,arguments);T(w+"Birth");
     if((q.hardN||0)>h0)T(w+"Hard");if((q.stillN||0)>s0)T(w+"Still");if(q===S?S.dead:q.alive===false)T(w+"MomDie");return r};
   const conc0=window.__khN;
   if(!window.__ow){window.__ow=1;const o0=window.over;window.over=function(a,b,c){window.__why=String(c||b||a).slice(0,80);return o0.apply(this,arguments)}}
   for(let l=0;l<n;l++){for(const k in tally)delete tally[k];window.__khN={};window.__rtN={};window.__why='';try{localStorage.clear()}catch(e){}
    for(let i=0;i<60;i++){start();if(!(typeof isSrv==="function"&&isSrv()))break}Q.length=0;S.mg=0;
    const seen=new Set(allKids().map(([k])=>k));const yr=[];let cy=0;const perY=()=>({npcB:0,meB:0,cons:0});yr.push(perY());let snap5=null;
    const snap=()=>{const ks=allKids().filter(([k])=>k.alive);return{kids:ks.length,me:ks.filter(([k,v])=>!v).length,npcSons:ks.filter(([k,v])=>v&&k.sex==="m").length,
      heirNpc:!!(S.heir&&S.heir.v),heirMe:!!(S.heir&&!S.heir.v&&S.heir.k),cons:liveRivals(true).length}};
    for(let w=0;w<Y*36&&!S.dead;w++){
     S.sung=Math.max(S.sung,+(window.__sung||25));S.danh=Math.max(S.danh,15);S.suc=Math.max(S.suc,Math.min(60,typeof sucCap==="function"?sucCap(S):100));S.duc=Math.max(S.duc,55);S.bac=Math.max(S.bac,80);S.rank=Math.max(S.rank,2);
     /* main 17/11: jfe.js holds flip() until buổi tối (S.buoi ≥ B4L), not inside endTurn, so a bot that calls endTurn directly must flip itself */
     if(!S.tonight&&typeof flip==="function"){const bb=S.buoi;S.buoi=Math.max(S.buoi||0,typeof B4L==="number"?B4L:2);try{flip()}catch(e){}S.buoi=bb;Q.length=0}
     if(S.tonight==="me"){S.tonight=null;try{night(S)}catch(e){}}
     Q.length=0;S.mg=0;const y=Math.floor((S.turn||0)/12);
     try{endTurn()}catch(e){out.push({err:String(e).slice(0,160)});break}Q.length=0;S.mg=0;
     while(yr.length<=Math.floor((S.turn||0)/12))yr.push(perY());
     if(S.tuan===0)yr[y].cons+=liveRivals(true).length/12;
     allKids().forEach(([k,v])=>{if(!seen.has(k)){seen.add(k);if(v)yr[y].npcB++;else yr[y].meB++}});
     if(S.tuan===0&&typeof sucCap==="function"){const b=S.age<30?"a<30":S.age<40?"a30":S.age<50?"a40":"a50+";T("capN_"+b);T("cap_"+b,sucCap(S));T("suc_"+b,S.suc)}
     if(w===5*36-1)snap5=snap()}
    const ag=[];out.push({why:S.dead?window.__why:'',years:Math.floor((S.turn||0)/12),dead:!!S.dead,yr:yr.slice(0,Y),s5:snap5,s10:snap(),tally:Object.assign({},tally),kh:Object.assign({},window.__khN||{}),rt:Object.assign({},window.__rtN||{}),
     me:{age:S.age,kh:typeof khOf==="function"?khOf(S):100,cap:typeof sucCap==="function"?sucCap(S):100,kids:S.kids.length},npc:liveRivals(true).map(v=>[v.age,typeof khOf==="function"?khOf(v):100,typeof sucCap==="function"?sucCap(v):100,v.suc,(v.kids||[]).length])})}
   window.render=r0;return out},[Math.min(CH,LIVES-done),YEARS]);
  lives.push(...part);await ctx.close();console.error("lives",lives.length)}
 await b.close();if(OUT)fs.writeFileSync(OUT,JSON.stringify({lives,errs:errs.slice(0,10)}));report(lives,errs)})().catch(e=>{console.error(e);process.exit(1)});
function report(L,errs){const ok=L.filter(l=>l.yr);const n=ok.length;const f=x=>x.toFixed(2);
 const Y=Math.max(...ok.map(l=>l.yr.length));const rows=[];
 for(let y=0;y<Y;y++){let nb=0,mb=0,cy=0,k=0;for(const l of ok){const r=l.yr[y];if(!r)continue;k++;nb+=r.npcB;mb+=r.meB;cy+=r.cons}
  rows.push({year:y+1,lives:k,"NPC births":f(nb/k),"NPC consorts":f(cy/k),"births/NPC consort":cy?f(nb/cy):"-","her births":f(mb/k)})}
 console.table(rows);
 const t={};ok.forEach(l=>{for(const k in l.tally)t[k]=(t[k]||0)+l.tally[k]});
 const pr=w=>`${w}: nights ${t[w+"N"]||0} · mean chance ${t[w+"N"]?f((t[w+"C"]||0)/t[w+"N"]):"-"} · conceived ${t[w+"P"]||0} (${t[w+"N"]?(100*(t[w+"P"]||0)/t[w+"N"]).toFixed(1):"-"}/100 nights)`+
  ["peak","low","cyc"].map(h=>` | ${h}: n ${t[w+"N_"+h]||0} ch ${t[w+"N_"+h]?f((t[w+"C_"+h]||0)/t[w+"N_"+h]):"-"} p ${t[w+"P_"+h]||0}`).join("");
 console.log(pr("npc"));console.log(pr("me"));
 for(const k of ["s5","s10"]){const S=ok.filter(l=>l[k]).map(l=>l[k]);if(!S.length)continue;const m=a=>f(S.reduce((x,s)=>x+s[a],0)/S.length);
  console.log(`${k==="s5"?"after 5 years":"after 10 years"} (${S.length} lives): palace children alive ${m("kids")} (hers ${m("me")}) · NPC sons alive ${m("npcSons")} · consorts ${m("cons")} · heir is an NPC son in ${S.filter(s=>s.heirNpc).length} · her son in ${S.filter(s=>s.heirMe).length}`)}
 const g=k=>t[k]||0;for(const w of ["npc","me"])console.log(`${w}: births ${g(w+"Birth")} · hard ${g(w+"Hard")} · stillbirths ${g(w+"Still")} · mother died in childbirth ${g(w+"MomDie")} (${g(w+"Birth")?(100*g(w+"MomDie")/g(w+"Birth")).toFixed(1):"-"}/100 births) · miscarriages ${g(w+"Mis")} by month ${[1,2,3,4,5,6,7,8,9].map(m=>g(w+"Mis_m"+m)).join("/")} · conceived ${g(w+"P")} → miscarried ${g(w+"P")?(100*g(w+"Mis")/g(w+"P")).toFixed(1):"-"}/100`);
 const KH={},RT={};ok.forEach(l=>{for(const k in l.kh||{})KH[k]=(KH[k]||0)+l.kh[k];for(const k in l.rt||{})RT[k]=(RT[k]||0)+l.rt[k]});console.log("jkh counters (sum)",JSON.stringify(KH));console.log("route counters (sum)",JSON.stringify(RT),"per life ng_set",((RT.ng_set||0)/n).toFixed(2),"ng_oan",((RT.ng_oan||0)/n).toFixed(2));
 console.log("her Sức max by age band (weekly mean):",["a<30","a30","a40","a50+"].map(b=>`${b} cap ${t["capN_"+b]?f(t["cap_"+b]/t["capN_"+b]):"-"} Sức ${t["capN_"+b]?f(t["suc_"+b]/t["capN_"+b]):"-"} (${t["capN_"+b]||0} wk)`).join(" | "));
 const N=[];ok.forEach(l=>(l.npc||[]).forEach(x=>N.push(x)));const band=(lo,hi)=>{const a=N.filter(x=>x[0]>=lo&&x[0]<hi);return a.length?`${lo}-${hi}: n ${a.length} kh ${f(a.reduce((s,x)=>s+x[1],0)/a.length)} cap ${f(a.reduce((s,x)=>s+x[2],0)/a.length)} Sức ${f(a.reduce((s,x)=>s+x[3],0)/a.length)}`:""};
 console.log("NPC consorts at the end:",[[15,30],[30,40],[40,50],[50,90]].map(([a,b])=>band(a,b)).filter(Boolean).join(" | "));
 console.log("lives",n,"her death before the end",ok.filter(l=>l.dead).length,"errors",L.filter(l=>l.err).map(l=>l.err).slice(0,3),errs.slice(0,3))}
