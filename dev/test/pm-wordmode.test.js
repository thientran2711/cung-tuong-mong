/* PM WORD-MODE test (review E22r r2 fix A, law 11 whole family): EVERY pm option text (her invite / challenge cards RCVK pmPlay / pmDuel, the friend's
   card pmCoopCard, the pickers PEND.pmPick / pmStake, the popup rows pmRows via talkOpts, the Hậu cung buttons pmBtns) through the kit word mode
   (jk2b kitHint at her default level + the rendered card): (a) a proper noun (place, person, item) never changes the card's words — masking every
   name gives the same words; (b) her accept card for a far asker shows the walk as a plain «N khắc» in TỐN; (c) no «không» cost.
   usage: node dev/test/pm-wordmode.test.js [dev/index.html] → exit 1 on FAIL */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;window.kitNotice=undefined;window.ptOn=()=>false;
  const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const far=V.filter(x=>!together(S,x));const rows=[];
  const PL=[...new Set([].concat(places().map(z=>z.n),liveRivals(true).map(v=>{try{return placeName(whereOf(v))}catch(e){return""}}),liveRivals(true).map(v=>v.name),[].concat(...liveRivals(true).map(v=>(v.inv||[]).map(e=>{try{return ilNm(e)}catch(x){return""}}))),Object.values(IT).map(z=>z.n)).filter(z=>z&&z.length>2))];
  const plain=t=>{let s=String(t||"");for(const n of PL.sort((a,b)=>b.length-a.length))s=s.split(n).join("Xx");return s};
  const vis=()=>{const M=document.getElementById('modal');return M?Object.fromEntries([...M.querySelectorAll('.opt')].map(b=>{const g=s=>[...b.querySelectorAll(s)].map(e=>e.textContent.trim()).join(' | ');return[b.dataset.m,{n:(b.querySelector('.kan,.kat b,b')||{}).textContent||"",ton:g('.kr-ton .krv'),hint:g('.kr-hint .krv'),all:b.textContent.replace(/\s+/g,' ').trim()}]})):{}};
  const one=(src,o,m)=>{let h0="",h1="";try{h0=kitHint(o,m).hint;h1=kitHint(Object.assign({},o,{x:plain(o.x)}),m).hint}catch(e){h0="ERR "+e.message}return{src,n:o.n,x:o.x,hint:h0,same:plain(h0)===h1,hintPlain:h1}};
  const card=(src,fn)=>{Q.length=0;try{fn()}catch(e){rows.push({src,err:e.message});return}const q=Q[0];if(!q){rows.push({src,err:"no card"});return}
   try{showModal()}catch(e){}const D=vis();q.opts.forEach((o,i)=>{const z=one(src,o,q);z.dom=D[i]||null;rows.push(z)});Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}};
  /* E22h fix 2: deterministic — the scan ALWAYS holds an asker who is NOT her bề trên (the decline row then carries only «hai bên quý nhau -N»)
     and one who IS (the «… là bề trên, quý ngươi thêm -N» part); before this the six far askers were random and (c) passed or failed by draw */
  const rkx=p=>p===S?S.rank:(p.queen?7:(p.rank||0));let lo=far.find(v=>rkx(v)<=rkx(S)),hi=far.find(v=>rkx(v)>rkx(S));
  if(!lo){lo=far.find(v=>v!==hi&&!v.queen);if(lo)lo.rank=Math.max(0,S.rank||0)}if(!hi){hi=far.find(v=>v!==lo);if(hi)hi.rank=(S.rank||0)+1}
  const FAR=[...new Set([lo,hi].filter(Boolean).concat(far))].slice(0,6);window.__pmwm={lo:lo?lo.name:null,hi:hi?hi.name:null};
  for(const v of FAR){S.bac=Math.max(S.bac,300);v.bac=Math.max(v.bac||0,300);v.suc=90;
   card("rcv pmPlay "+v.name+" @"+placeName(whereOf(v)),()=>rcvAsk("pmPlay",v,S,pmX(v,S,"play")));
   for(const s of ["bac","danh","item"])card("rcv pmDuel/"+s+" "+v.name,()=>rcvAsk("pmDuel",v,S,pmX(v,S,"duel",{s})));
   card("pmPick play "+v.name,()=>pushDil(mkP("pmPick",{v:v.id,a:"play"}),"x"));card("pmPick duel "+v.name,()=>pushDil(mkP("pmPick",{v:v.id,a:"duel"}),"x"));
   try{for(const o of talkOpts({kind:"rival",ref:v}).filter(o=>o.pm))rows.push(one("talkOpts "+v.name,o,null))}catch(e){rows.push({src:"talkOpts",err:e.message})}
   try{const pb=pbtn,cap=[];pbtn=function(a,n,x){cap.push({n,x});return pb.apply(this,arguments)};try{pmBtns(v)}finally{pbtn=pb}for(const o of cap)rows.push(one("pmBtns "+v.name,o,null))}catch(e){rows.push({src:"pmBtns",err:e.message})}
   try{const ar=pmArts(S,v)[0];if(ar)card("pmStake "+v.name,()=>pushDil(mkP("pmStake",{v:v.id,kind:ar.kind}),"x"))}catch(e){}}
  {const t=V[0];const f=Object.assign({},t,{id:9901,coop:true,name:"Hảo hữu",rl:{},ro:{},inv:[],bac:300,danh:50});rivals.push(f);
   for(const [k,a] of [["pmplay","play"],["pmduel","duel"]])try{const x=pmCoopX(k,pmX(f,S,a,{s:"bac"}));const c=pmCoopCard(f,k,x);for(const o of (c&&c.o)||[])rows.push(one("pmCoopCard "+k,o,null))}catch(e){rows.push({src:"pmCoopCard "+k,err:e.message})}
   rivals.splice(rivals.indexOf(f),1)}
  return{rows,far:far.length,pair:window.__pmwm}});
 await b.close();const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
 const rs=r.rows.filter(z=>!z.err),er=r.rows.filter(z=>z.err);const src=k=>rs.filter(z=>z.src.startsWith(k)).length;
 ok(!errs.length&&!er.length,'no page error, every card built',{errs:errs.slice(0,3),er:er.slice(0,3)});
 ok(r.pair&&r.pair.lo&&r.pair.hi,'the scan holds both an asker who is not her bề trên and one who is (deterministic (c))',r.pair);
 ok(r.far>0&&["rcv pmPlay","rcv pmDuel","pmPick","pmStake","talkOpts","pmBtns","pmCoopCard"].every(k=>src(k)>0),'every pm option family scanned',Object.fromEntries(["rcv pmPlay","rcv pmDuel","pmPick","pmStake","talkOpts","pmBtns","pmCoopCard"].map(k=>[k,src(k)])));
 const bad=rs.filter(z=>!z.same);ok(!bad.length,'(a) a place / person / item name never changes the card words',bad.slice(0,4).map(z=>[z.src,z.n,z.hint,z.hintPlain]));
 const acc=rs.filter(z=>/^rcv /.test(z.src)&&/^Nhận lời/.test(z.n));const noK=acc.filter(z=>!/Tốn[^Đ]*\d+ khắc/.test((z.dom||{}).all||""));
 ok(acc.length>0&&!noK.length,'(b) her accept card shows the walk as «N khắc» in TỐN',{n:acc.length,miss:noK.slice(0,3).map(z=>[z.src,(z.dom||{}).all])});
 const kh=rs.filter(z=>/tốn: không/.test(z.x||"")||/Tốn\s*không/.test((z.dom||{}).all||""));ok(!kh.length,'(c) no «không» cost segment',kh.slice(0,3).map(z=>[z.src,z.x]));
 console.log(res.every(Boolean)?'PM WORD-MODE: ALL PASS':'PM WORD-MODE: FAIL');process.exit(res.every(Boolean)?0:1)})();
