/* review/balance-core: night-choice odds on the real consort population (her + NPCs, weekly loop). usage: node dev/test/balance-night.js <index.html> [lives] [years] [js override] */
const {chromium}=require('playwright');const path=require('path');
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const [,,PAGE,LS,YS,BJ]=process.argv;const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755}});
await ctx.addInitScript(`window.__seed=${+process.env.SEED||5100};`+SEEDRNG+`window.__bot=1;window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
const p=await ctx.newPage();p.setDefaultTimeout(1800000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
if(BJ)await p.evaluate(BJ);
const r=await p.evaluate(([n,Y])=>{window.render=function(){};if(typeof cyAsk==="function")cyAsk=function(){return false};
 const N=8;/* value of a night in Sủng units (Sủng +3..8, Ân tình, a chance of a child) */const val=o=>{let x=0;for(const k in o){const v=o[k];x+=k==="hh"?v/3:v}return x};
 const M=BAL.steal.m;const out={n:0,road:0,feign:0,thoi:0,od:{feign:[],road:[],keep:[]},kind:{fav:0,dis:0,neu:0,none:0},byArt:{fav:[0,0],dis:[0,0],neu:[0,0]}};
 for(let l=0;l<n;l++){try{localStorage.clear()}catch(e){}for(let i=0;i<60;i++){start();if(!(typeof isSrv==="function"&&isSrv()))break}Q.length=0;S.mg=0;
  for(let w=0;w<Y*36&&!S.dead;w++){if(S.tonight==="me"){S.tonight=null;try{night(S)}catch(e){}}Q.length=0;S.mg=0;try{endTurn()}catch(e){break}Q.length=0;S.mg=0;
   if(w%4)continue;const P=[S].concat(liveRivals(true));for(const a of P){if(!a||a.sac==null)continue;out.n++;
    const pf=oSteal(a,"feign"),pr=oSteal(a,"road"),pk=oKeep(a);out.od.feign.push(pf);out.od.road.push(pr);out.od.keep.push(pk);
    const lf=val(M.feign.lose)-(M.feign.hh?M.feign.hh/3:0),lr=val(M.road.lose)-(M.road.hh?M.road.hh/3:0);
    const ef=pf/100*(N+val(M.feign.win)-(M.feign.hh||0)/3)+(1-pf/100)*val(M.feign.lose),er=pr/100*(N+val(M.road.win)-(M.road.hh||0)/3)+(1-pr/100)*val(M.road.lose);
    if(Math.max(ef,er)<=0)out.thoi++;else if(er>ef)out.road++;else out.feign++;
    const ba=stBestArt(a),ea=empArt();const kd=!ba?"none":!ea?"neu":ba.k===ea.f?"fav":ba.k===ea.d?"dis":"neu";out.kind[kd]++;if(kd!=="none"){out.byArt[kd][0]++;if(er>ef)out.byArt[kd][1]++}}}}
 const q=a=>{a.sort((x,y)=>x-y);return [a[Math.floor(a.length*.1)],a[Math.floor(a.length*.5)],a[Math.floor(a.length*.9)]]};
 return{n:out.n,share:{feign:+(out.feign/out.n).toFixed(2),road:+(out.road/out.n).toFixed(2),thoi:+(out.thoi/out.n).toFixed(2)},odds10_50_90:{feign:q(out.od.feign),road:q(out.od.road),keep:q(out.od.keep)},words:{feign:word(q(out.od.feign)[1]),road:word(q(out.od.road)[1]),keep:word(q(out.od.keep)[1])},artKind:out.kind,roadShareByArt:Object.fromEntries(Object.entries(out.byArt).map(([k,v])=>[k,v[0]?+(v[1]/v[0]).toFixed(2):null]))}},[+LS||4,+YS||2]);
console.log(JSON.stringify(r));console.log('errors',errs.length,errs.slice(0,3).join(' | '));await b.close()})();
