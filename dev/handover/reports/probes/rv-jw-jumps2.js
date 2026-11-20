// far-jump + deed probe. node jumps.js <index.html> <seedFrom> <seedTo> <buoi>
const {chromium}=require('playwright');const path=require('path');
const [,,F,s0='1',s1='5',NB='16']=process.argv;const URL='file://'+path.resolve(F);
(async()=>{const b=await chromium.launch();const tot={};
for(let seed=+s0;seed<=+s1;seed++){const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,120)));
 await p.addInitScript(sd=>{let a=sd*2654435761>>>0;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},seed);
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const o=await p.evaluate(NB=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}window.__bot=1;Q.length=0;S.confined=0;
  window.__ws=[];{const f=agWalkShort;window.agWalkShort=agWalkShort=function(R,id,kh,kc,at,d,cur){const r=f.apply(this,arguments);try{const c=cur==null?(R.kh!=null?R.kh:agKh()):cur;const row=R.P[id];if(kh===c&&kh>0&&row[kh-1]&&row[kh-1][0]&&row[kh-1][0]!==at){const t=travel(row[kh-1][0],at,walkWho(id));if(t>=2)__ws.push(id+" kh"+kh+" from "+row[kh-1][0]+"/"+row[kh-1][1]+" nowrow "+(row[kh]&&row[kh][0]+"/"+row[kh][1])+" to "+at+" short="+r)}}catch(e){}return r}}const W=typeof walkWho==="function"?walkWho:()=>null;const o={far:0,deed:0,deedOther:0,follow:0,errand:0,ngoai:0,other:0,plainExtra:0,L:[],land0:AG.stat.land};const real=k=>k!=null&&k!=="ngoai"&&!(typeof J95OUT_!=="undefined"&&k===J95OUT_);
  for(let s=0;s<NB;s++){Q.length=0;S.mg=0;for(let u=0;u<4;u++){used=u;try{j95sync()}catch(e){}try{if(typeof agLaterRun==="function")agLaterRun()}catch(e){}}
   const R=S.roster;if(R&&R.P)for(const id in R.P){if(id==="me")continue;const row=R.P[id];if(!Array.isArray(row))continue;
    for(let j=1;j<row.length;j++){const x=row[j];if(!x||x[0]==null||x[1]==="go"||x[1]==="ag_tell"||(x[1]==="follow"&&x[2]==="me"))continue;let q=j-1,g=0;while(q>=0&&row[q]&&row[q][0]===x[0]&&(row[q][1]==="go"||row[q][1]==="ag_tell")){g++;q--}
     if(q<0||!row[q]||row[q][0]==null||row[q][0]===x[0])continue;const y=row[q];
     if(!real(x[0])||!real(y[0])){o.ngoai++;continue}
     const t=travel(y[0],x[0],W(id)),tp=travel(y[0],x[0]);
     if(tp>=2&&g<tp-1&&!(t>=2&&g<t-1)){o.plainExtra++;if(o.L.length<40)o.L.push("PLAIN "+id+" t="+t+" tp="+tp+" g="+g+" "+row.map(e=>e[0]+"/"+e[1]).join("|"))}
     if(t<2)continue;o.far++;if(g>=t-1)continue;
     const A=/^ag_/.test(x[1]),B=/^ag_/.test(y[1]);let c=A&&B?"deed":A||B?"deedOther":(x[1]==="follow"||y[1]==="follow")?"follow":(x[1]==="errand"||y[1]==="errand")?"errand":"other";
     o[c]++;if(o.L.length<40)o.L.push(c+" b"+s+" "+id+" t="+t+" g="+g+" "+row.map(e=>e[0]+"/"+e[1]+"/"+(e[3]||"").slice(0,25)).join(" | "))}}
   try{nextBuoi()}catch(e){}}
  o.land=AG.stat.land-o.land0;o.L=o.L.concat(__ws.slice(0,15));o.ws=__ws.length;o.drop=AG.stat.drop||0;o.walkDrop=(AGD.stat&&AGD.stat.walkDrop)||0;o.na=Object.values(AG.na||{}).reduce((a,b)=>a+b,0);o.jerr=(typeof JWALK!=="undefined"?JWALK.errs.length:0);o.lead=(typeof JWALK!=="undefined"&&JWALK.stat.lead)||0;o.miss=(typeof JWALK!=="undefined"&&JWALK.stat.miss)||0;return o},+NB);
 o.pageErr=errs.length;const L=o.L;delete o.L;console.log("seed",seed,JSON.stringify(o));L.forEach(l=>console.log("   ",l.slice(0,420)));
 for(const k in o)tot[k]=(tot[k]||0)+o[k];await p.close()}
console.log("TOTAL",JSON.stringify(tot));await b.close()})();
