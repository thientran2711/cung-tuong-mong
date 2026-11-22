/* dump night-choice states of the real consort population (her + NPCs) from the real weekly game loop */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const [,,PAGE,LS,YS,OUT]=process.argv;const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755}});
await ctx.addInitScript(`window.__seed=${+process.env.SEED||5100};`+SEEDRNG+`window.__bot=1;window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
const p=await ctx.newPage();p.setDefaultTimeout(3600000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(([n,Y])=>{window.render=function(){};if(typeof cyAsk==="function")cyAsk=function(){return false};const D=[];
 const artRaw=a=>{const bb=stBestArt(a);if(!bb)return{v:0,kd:"none"};const ea=empArt(),A=BAL.steal.art;const f=ea?(bb.k===ea.f?A.fav:bb.k===ea.d?-A.dis:A.neu):A.neu;
   return{v:BAL.art.odds[bb.l]*f,kd:!ea?"neu":bb.k===ea.f?"fav":bb.k===ea.d?"dis":"neu",l:bb.l,fv:BAL.art.odds[bb.l]*A.fav,dv:-BAL.art.odds[bb.l]*A.dis,know:eaKnows(a)}};
 for(let l=0;l<n;l++){try{localStorage.clear()}catch(e){}for(let i=0;i<60;i++){start();if(!(typeof isSrv==="function"&&isSrv()))break}Q.length=0;S.mg=0;
  for(let w=0;w<Y*36&&!S.dead;w++){if(S.tonight==="me"){S.tonight=null;try{night(S)}catch(e){}}Q.length=0;S.mg=0;try{endTurn()}catch(e){break}Q.length=0;S.mg=0;
   if(w%4)continue;const P=[S].concat(liveRivals(true));for(const a of P){if(!a||a.sac==null)continue;const ar=artRaw(a);
    D.push({me:a===S?1:0,l,w,sung:a.sung||0,sac:effSac(a),suc:a.suc||0,duc:typeof ducOf==="function"?ducOf(a):(a.duc||0),rk:rkOf(a),fit:stealFit(a),mm:mm(),pen:(a.suc<30?-15:0),art:ar.v,kd:ar.kd,al:ar.l||0,know:ar.know?1:0,
     of:oSteal(a,"feign"),or:oSteal(a,"road"),ok:oKeep(a)})}}}
 return D},[+LS||3,+YS||2]);
fs.writeFileSync(OUT,JSON.stringify(r));console.log('states',r.length,'errors',errs.length,errs.slice(0,3).join(' | '));await b.close()})();
