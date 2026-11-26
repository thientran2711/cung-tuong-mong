/* W8 NB2 result-card scan (LAW 11 whole family): every result card (kit resultShow → kaLastResult) must list under Được / Mất / Kèm
   every real change of the tap. Reuses dev/test/act-audit.js (its LIB + loop: every act button, every dialog option, win + lose) and
   widens its snapshot to the families the card did not read: every servant's thiện cảm (af.me) + trung thành (loyal) incl. the named
   elders (jstaff) and the Thái hậu household, the court (S.court af.me), familiarity (S.known levels), the bag (S.inv by id).
   Also taps the elder buttons (Biếu / Hỏi chuyện) and court buttons directly.
   usage: node rc-scan.js <url> <out.jsonl> [scen,...]   then: python3 rc-sum.py <out.jsonl> */
const fs=require('fs'),path=require('path');const AAJ=path.join(__dirname,'../../../test/act-audit.js');
const src=fs.readFileSync(AAJ,'utf8');const LIB=src.slice(src.indexOf('const LIB=String.raw`')+21,src.indexOf('`;\n(async'));
const {chromium}=require('playwright');const [,,URL,OUT,SC]=process.argv;
const EXT=String.raw`
(function(){const s0=AA.snap;AA.snap=()=>{const o=s0();
 const nm=st=>(st.call?st.call+" · ":"")+st.name;
 const L=[];try{L.push(...allServ())}catch(e){}try{if(S.thO&&S.thO.staff)L.push(...S.thO.staff)}catch(e){}
 for(const st of L){if(!st)continue;const k="srv."+(st.sid||st.name);o[k+".af|"+nm(st)]=(st.af&&st.af.me)||0;if(typeof st.loyal==="number")o[k+".loyal|"+nm(st)]=st.loyal}
 for(const k in (S.court||{})){const c=S.court[k];if(c&&c.af)o["court."+k+".af|"+c.name]=c.af.me||0}
 try{const K=S.known||{};for(const k in K)o["kn."+k]=+K[k]||0}catch(e){}
 /* W9: evidence held AGAINST her by each consort (evG(v,S)) */ try{for(const v of rivals)o["rv."+v.name+".evon"]=evG(v,S)}catch(e){}
 const I={};for(const it of (S.inv||[])){const id=typeof it==="string"?it:(it&&(it.id||it.k||it.n))||"?";I[id]=(I[id]||0)+1}for(const id in I)o["inv."+id]=I[id];
 return o}})();
AA.extra=()=>{const L=[];try{for(const st of elders())for(const a of ["bieu","hoi"])L.push({kind:"elder",a,id:st.eid,name:st.call})}catch(e){}
 for(const k in (S.court||{}))for(const a of ["thuong"])L.push({kind:"court",a,id:k,name:S.court[k].name});return L};
AA.runX=async(x)=>{AA.restore();AA.hide();render();window.kaLastResult=null;const e0=AA.errs.length;const pre=AA.snap();
 try{if(x.kind==="elder"){const b=document.createElement("button");b.dataset.elder=x.a;b.dataset.eid=x.id;document.body.appendChild(b);b.click();b.remove()}else courtAct(x.a,x.id)}catch(e){AA.errs.push("x "+e.message)}
 await new Promise(r=>setTimeout(r,60));const post=AA.snap();const t=document.getElementById("rtoast");
 return{card:{name:x.kind+":"+x.a+" "+x.name},pre,d:AA.diff(pre,post),res:{kres:window.kaLastResult?JSON.parse(JSON.stringify(window.kaLastResult)):null,toast:t&&t.classList.contains("on")?t.innerText.replace(/\s+/g," ").slice(0,400):""},errs:AA.errs.slice(e0)}};
`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,isMobile:true,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);await p.evaluate(EXT);const out=fs.createWriteStream(OUT,{flags:'w'});const W=o=>out.write(JSON.stringify(o)+"\n");
 for(const sc of (SC||'dau,hau,cao').split(',')){await p.evaluate(n=>AA.scen(n),sc);
  for(const x of await p.evaluate(()=>AA.extra())){const r=await p.evaluate(x=>AA.runX(x),x);W({sc,sf:"x:"+x.kind,run:"x",...r})}
  if(process.env.RC_ONLY_X)continue;const SF=await p.evaluate(()=>AA.surfaces());console.error(sc,SF.length);
  for(const sf of SF){let subs=[sf];if(sf.place){const n=await p.evaluate(s=>{AA.restore();AA.show(s);return S.visit&&S.visit.people?S.visit.people.length:0},sf);subs=[];for(let i=0;i<n;i++)subs.push(Object.assign({},sf,{pop:i,id:sf.id+"#"+i}))}
   for(const s2 of subs){const cards=await p.evaluate(s=>{AA.restore();AA.show(s);return AA.btns(s).map(AA.rowsOf)},s2);
    for(let j=0;j<cards.length;j++){const c=cards[j];if(c.dis)continue;
     for(const f of [true,false]){const r=await p.evaluate(([s,jj,ff])=>AA.run(s,jj,ff),[s2,j,f]);W({sc,sf:s2.id,j,run:f?"win":"lose",...r});
      const M=r.res&&r.res.modal&&r.res.modal.opts;
      if(f&&M&&M.length&&M.length<=14)for(let k=0;k<M.length;k++){if(M[k].dis)continue;for(const f2 of [true,false]){const r2=await p.evaluate(([s,jj,ff,kk])=>AA.run(s,jj,ff,kk),[s2,j,f2,k]);W({sc,sf:s2.id,j,k,run:f2?"win":"lose",...r2})}}
      if(!c.odds)break}}}}}
 W({pageErrors:perr});out.end();await b.close()})().catch(e=>{console.error(e);process.exit(1)});
