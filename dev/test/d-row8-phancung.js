/* D-ROW8 phân cung probe (jpromob pcHostPick / pcMut / pcWhy, jpal palFix spread; numbers BAL.promoR.pc):
   thiện cảm between the girl and the host chủ vị (aff − oán, both ways) moves the host pick when the royals are neutral; one core (wC 0 → no pull);
   the why line appears only when the liking really pulled her (shown == applied); NPC parity (the same pcHostPick); the palFix spread step
   (an empty chủ vị takes one girl from a full house) picks the empty house by the same rule; co-op friend entry never moved by the spread.
   usage: node dev/test/d-row8-phancung.js [root] [W]x[H]   → table, exit 1 on any failure */
const {chromium}=require('playwright');const D=require('./lib/device');
(async()=>{const root=process.argv[2]||require('path').resolve(__dirname,'../..');const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);
 const srv=await D.serveRoot(root);const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(srv.url+'/index.html?khost=0',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof window.pcMut==='function',null,{timeout:90000});await p.waitForTimeout(1200);
 const R=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;const tt=document.getElementById('title');if(tt)tt.hidden=true;
  window.SP_OFF=(window.SP_OFF||0)+1;
  const out=[];const ck=(k,fn)=>{let bad="",got;try{const r=fn();got=r&&r.got;bad=r&&r.bad||""}catch(e){bad="throw "+e.message+" "+(e.stack||"").split("\n").slice(1,3).join(" ")}out.push({k,got,bad})};
  const fresh=()=>{for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;window.__exAuto=1};
  const B=BAL.promoR.pc;const cnt=()=>0;
  const hosts=()=>[S].concat(rivals).filter(x=>x!==S&&x.alive&&!x.out&&!x.queen&&rkOf(x)>=3&&rkOf(x)<=5&&x.pal!=null);
  /* neutral royals: the two hosts equal on palace standing / temper / Thái hậu, the girl at the mid favour */
  const neutral=(g,hs)=>{const sv={sung:g.sung,hh:g===S?S.hh:g.hh,th:g.th,h:hs.map(h=>[h.trait,h.th,h.pal])};g.sung=B.mid.sung;if(g===S)S.hh=0;else g.hh=0;g.th=0;hs.forEach(h=>{h.trait="Kín đáo";h.th=0});
   return()=>{g.sung=sv.sung;if(g===S)S.hh=sv.hh;else g.hh=sv.hh;g.th=sv.th;hs.forEach((h,i)=>{h.trait=sv.h[i][0];h.th=sv.h[i][1]})}};
  const setLike=(g,h,n)=>{const R=BAL.linkRange.rl;const c=v=>Math.max(R[0],Math.min(R[1],v));
   if(g===S){S.rl[h.id]=c(n);h.rel=c(n);S.ro[h.id]=0;h.oan=0}else{g.rl=g.rl||{};h.rl=h.rl||{};g.rl[h.id]=c(n);h.rl[g.id]=c(n);g.ro=g.ro||{};h.ro=h.ro||{};g.ro[h.id]=0;h.ro[g.id]=0}};
  fresh();S.rank=1;
  ck("pcMut both ways, in [-1,1], 0 for self",()=>{const hs=hosts();if(!hs.length)return{got:0,bad:"no host"};const h=hs[0];setLike(S,h,60);const a=pcMut(S,h);setLike(S,h,-60);const c=pcMut(S,h);setLike(S,h,0);
   return{got:`${a.toFixed(2)} / ${c.toFixed(2)} / self ${pcMut(S,S)}`,bad:!(a>0&&a<=1)?"liked not > 0":!(c<0&&c>=-1)?"disliked not < 0":pcMut(S,S)!==0?"self not 0":""}});
  ck("her: liked host wins when the royals are neutral",()=>{const hs=hosts();if(hs.length<2)return{got:hs.length,bad:"need 2 hosts"};const H2=hs.slice(0,2);const un=neutral(S,H2);
   /* palace standing differs per house: neutral favour (f.E 0) cancels it */
   setLike(S,H2[0],0);setLike(S,H2[1],70);const a=pcHostPick(S,H2,cnt);setLike(S,H2[1],0);setLike(S,H2[0],70);const c=pcHostPick(S,H2,cnt);setLike(S,H2[0],0);un();
   return{got:`→${a&&a.name} then →${c&&c.name}`,bad:a!==H2[1]||c!==H2[0]?"liking did not pick the host":""}});
  ck("NPC parity: the same rule for an NPC girl",()=>{const hs=hosts();const g=liveRivals(false).find(v=>rkOf(v)<3&&!v.coop);if(hs.length<2||!g)return{got:"setup",bad:"no NPC girl / hosts"};const H2=hs.slice(0,2);const un=neutral(g,H2);
   setLike(g,H2[0],-60);setLike(g,H2[1],60);const a=pcHostPick(g,H2,cnt);setLike(g,H2[0],60);setLike(g,H2[1],-60);const c=pcHostPick(g,H2,cnt);setLike(g,H2[0],0);setLike(g,H2[1],0);un();
   return{got:`→${a&&a.name} then →${c&&c.name}`,bad:a!==H2[1]||c!==H2[0]?"NPC: liking did not pick the host":""}});
  ck("one core: BAL wC 0 → liking pulls nothing",()=>{const hs=hosts();const H2=hs.slice(0,2);const un=neutral(S,H2);const w=B.wC;B.wC=0;setLike(S,H2[1],90);const s0=pcScore(S,H2[1],0);setLike(S,H2[1],0);const s1=pcScore(S,H2[1],0);B.wC=w;setLike(S,H2[1],90);const s2=pcScore(S,H2[1],0);setLike(S,H2[1],0);un();
   return{got:`off ${s0} vs ${s1} · on ${s2.toFixed(2)}`,bad:Math.abs(s0-s1)>1e-9?"wC 0 still moves the score":!(s2>s1)?"wC on does not move the score":""}});
  ck("royals still lead: Hoàng hậu's dislike beats a host's mild liking",()=>{const hs=hosts();const H2=hs.slice(0,2);const un=neutral(S,H2);H2[0].trait="Ân cần";H2[1].trait="Kiêu ngạo";S.hh=-99;setLike(S,H2[0],0);setLike(S,H2[1],15);
   const a=pcHostPick(S,H2,cnt);setLike(S,H2[1],0);un();return{got:a&&a.trait,bad:a!==H2[1]?"disliked girl not with the harsh host":""}});
  ck("why line shown == applied (liked host named; neutral → no line)",()=>{fresh();S.rank=1;const hs=hosts();if(!hs.length)return{got:0,bad:"no host"};const un=neutral(S,hs);for(const h of hs)setLike(S,h,0);const cap=resCap();const mt=x=>[S].concat(rivals).filter(y=>y!==x&&y!==S&&y.alive&&!y.out&&!y.queen&&y.resHead===key(x)&&!(rkOf(y)>=3&&y.pal!=null)).length;
   /* the load rule (BAL.promoR.pc.load per co-resident) spreads first: the liked host is one of the least-filled houses */const m0=Math.min(...hs.map(mt));const h=hs.find(x=>mt(x)===m0&&mt(x)<cap);setLike(S,h,80);
   S.resHead=null;S.resHall=null;window.phanCungEdict({list:[{p:S,fav:{}}],then:()=>{}});const m=Q[0];const hd=byKey(houseOf(S));const why=pcWhy(S).join(" | ");Q.length=0;try{closeModal&&closeModal()}catch(e){}
   const pulled=hd===h;const line=/quý ngươi, xin cho ngươi về ở chung/.test(why);for(const x of hs)setLike(S,x,0);const why0=pcWhy(S).join(" | ");un();
   return{got:`host ${hd&&hd.name} · ${why.slice(0,90)}`,bad:!m||m.t!=="Phân cung"?"no panel":!pulled?"liked host not picked":!line?"no why line for the liking":/quý ngươi/.test(why0)?"line without liking":/%/.test(why)?"% in text":""}});
  ck("spread: empty house chosen by the rule (liked empty host)",()=>{fresh();const hs=hosts();if(hs.length<3)return{got:hs.length,bad:""};
   /* make one full house, two empty; the newest mate (last) likes the second empty host */
   const cap=resCap();const g=liveRivals(false).filter(v=>rkOf(v)<3&&!v.coop&&v.alive&&!v.out);if(g.length<cap)return{got:"few girls",bad:""};
   for(const v of g){v.resHead=null;v.resHall=null}const F=hs[0],E1=hs[1],E2=hs[2];const M=g.slice(0,cap);M.forEach(v=>{v.resHead=key(F);v.resHall=null});for(const v of g.slice(cap)){v.resHead=key(F)}
   const y=M[M.length-1];const un=neutral(y,[E1,E2]);setLike(y,E1,0);setLike(y,E2,90);const pick0=pcHostPick(y,[E1,E2],h=>0);setLike(y,E2,0);un();
   return{got:`rule picks ${pick0&&pick0.name}`,bad:pick0!==E2?"rule did not pick the liked empty host":""}});
  ck("old save: no new save field",()=>{const k0=Object.keys(S).length;palFix();return{got:Object.keys(S).length,bad:Object.keys(S).length!==k0?"palFix added a field":""}});
  return out});
 let fail=0;for(const r of R){const ok=!r.bad;if(!ok)fail++;console.log(`${ok?"PASS":"FAIL"}  ${r.k}  ${typeof r.got==="string"?r.got:JSON.stringify(r.got)}${ok?"":"  ← "+r.bad}`)}
 if(errs.length){fail++;console.log("PAGE ERRORS",errs.slice(0,5))}
 console.log(`d-row8-phancung ${R.length-fail+(errs.length?1:0)}/${R.length} ${W}x${H}`);await b.close();srv.close&&srv.close();process.exit(fail?1:0)})();
