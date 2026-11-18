/* review/residence-qp-alone old save (owner 18/11 "Quý phi đâu có ở chung"; ORDER ROOT-58): a save of the OLD build where a Quý phi has
   co-residents loads in this build: they move to a Tần / Phi house with a free seat (or a free palace if every seat is taken), each with one
   news line carrying the reason ("Theo lệ, Quý phi … ở riêng …") and one act in the people ledger (S.roster.acts k res_move); nobody is
   lost, ranks are unchanged, the Quý phi / Hoàng quý phi / Hoàng hậu hold nobody, every Tần / Phi room holds ≤ BAL.res.side, and the game
   plays on (3 turns, no page error). usage: node dev/test/residence-qp-oldsave.js <oldUrl> <newUrl>; exit 1 on fail */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});
const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:755,height:1000}});await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(600000);
const boot=async u=>{await p.goto(u);for(let i=0;i<400;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await p.waitForTimeout(300)}};
await boot(process.argv[2]);
const a=await p.evaluate(()=>{localStorage.clear();SLOT=3;window.__nlInner=1;window.__forceOrigin='tt';start();window.__nlInner=0;Q.length=0;quiet=true;
 const live=x=>x===S?!S.out&&!S.dead:x.alive&&!x.out;
 let qp=rivals.find(v=>live(v)&&!v.queen&&v.rank===5&&v.pal!=null);if(!qp)return{err:'no Quý phi in the old game'};
 /* the old build lets a Quý phi take 2: make sure she holds two NPCs (one per hall) */
 const low=rivals.filter(v=>live(v)&&!v.queen&&v.rank<3&&v.resHead!==key(qp));for(const v of rivals)if(v.resHead===key(qp)&&live(v)&&rivals.filter(x=>x.resHead===key(qp)&&live(x)).length>1){v.resHead=null}let n=rivals.filter(v=>v.resHead===key(qp)&&live(v)).length;
 /* the player too (below Tần, housed like an NPC): she shares the Quý phi's house as well */
 if(S.rank<3){S.resHead=key(qp);S.resHall=null;n++}
 for(const y of low){if(n>=2)break;y.resHead=key(qp);y.resHall=null;if(y.palLone){y.pal=null;y.palLone=0}n++}/* no palFix here: the old build's spread could move one away; 2 = the old build's cap */
 const meIn=S.resHead===key(qp);
 const M=rivals.filter(v=>live(v)&&v.resHead===key(qp)).map(v=>({id:v.id,name:v.name,rank:v.rank}));quiet=false;try{NLP=false}catch(e){}save();
 const ls={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);ls[k]=localStorage.getItem(k)}
 return{qp:{id:qp.id,name:qp.name},M,meIn,ranks:rivals.map(v=>v.queen?'Q':v.rank).join(''),n:rivals.length,ls}});
if(a.err){console.log(a.err);console.log('RESIDENCE-QP-OLDSAVE FAIL');process.exitCode=1;await b.close();return}
const ls=a.ls;delete a.ls;
await boot(process.argv[3]);
const r=await p.evaluate(([ls,A])=>{localStorage.clear();for(const k in ls)localStorage.setItem(k,ls[k]);
 const F=[];const ok=(c,m)=>{if(!c)F.push(m)};
 try{showTitle()}catch(e){}const bt=document.querySelector('#title [data-load="3"]');let how;
 if(bt){bt.click();how='button'}else{const d=loadSlot(3);if(!d)return{F:['no save'],how:'none'};SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;try{deal();render()}catch(e){}how='deser'}
 const live=x=>x===S?!S.out&&!S.dead:x.alive&&!x.out;const qp=RV(A.qp.id);
 ok(rivals.length===A.n,'consort count '+rivals.length+' != '+A.n);ok(rivals.map(v=>v.queen?'Q':v.rank).join('')===A.ranks,'ranks changed');
 const mates=h=>[S].concat(rivals).filter(y=>y!==h&&live(y)&&y.resHead===key(h)&&!(rkOf(y)>=3&&y.pal!=null));
 ok(mates(qp).length===0,'Quý phi still holds '+mates(qp).length);
 for(const h of [S].concat(rivals)){if(!live(h))continue;if(h.queen||rkOf(h)>=5)ok(mates(h).length===0,`${h.name} rank ${rkOf(h)} holds ${mates(h).length}`);
  if(palHostOK(h)){ok(mates(h).length<=resCap(h),`${h.name} over cap`);const c={};for(const y of mates(h)){const pt=residenceOf(y).part;c[pt]=(c[pt]||0)+1}for(const k in c)ok(c[k]<=resSide(h),`${h.name} room ${k}=${c[k]}`)}}
 const logs=(S.logs||[]).map(x=>String(x).replace(/<[^>]+>/g,''));const acts=(S.roster&&S.roster.acts)||[];
 const moved=A.M.map(m=>{const v=RV(m.id);const rr=residenceOf(v);ok(!!rr.part&&rr.head!==qp,m.name+' not re-housed');
  const la=acts.find(x=>x.k==='res_move'&&x.id===ledgerId(v));
  return{name:m.name,to:resRoomName(rr),ledger:la?la.why:null}});
 const line=logs.find(x=>/Theo lệ/.test(x))||null;
 /* one reason line per move (names may read 'một vị … chưa quen biết' when she has not met them: the name mask) */
 ok(logs.filter(x=>/Theo lệ/.test(x)&&/dời sang/.test(x)).length>=A.M.length,'reason lines '+logs.filter(x=>/Theo lệ/.test(x)).length+' < '+A.M.length);
 if(A.meIn){ok(S.resHead!==key(qp),'she still lives under the Quý phi');ok(logs.some(x=>/Theo lệ/.test(x)&&/ngươi dời sang/.test(x)),'no reason line for her');}
 const her=resRoomName(residenceOf(S));
 quiet=true;for(let i=0;i<3;i++){Q.length=0;S.mg=null;try{endTurn()}catch(e){F.push('turn '+e.message);break}}quiet=false;ok(mates(qp).length===0,'Quý phi refilled after 3 turns');
 return{F,how,moved,her,line,ledgerActs:acts.filter(x=>x.k==='res_move').length}},[ls,a]);
const ok=!r.F.length&&!errs.length;console.log(JSON.stringify({old:a,new:r,errs:errs.slice(0,4)}));for(const f of r.F||[])console.log('FAIL',f);
console.log(ok?'RESIDENCE-QP-OLDSAVE PASS':'RESIDENCE-QP-OLDSAVE FAIL');process.exitCode=ok?0:1;await b.close()})();
