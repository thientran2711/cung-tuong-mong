/* bang-words scan (ORDER MAIN CHÍNH 88 04:46Z; law 6b real world, law 11 whole group): every foreign-princess land branch reads only its own
   land's words. Lands: nc = Cao Ly (Goryeo), bd = Bắc Địch (steppe, legacy lives on BD_OLD premises), bt = Ba Tư (Sasanian Persia, new bd lives).
   For each land the page builds a life of that land, walks EVERY road chapter that land can play (ARC67 premise of its origin + its .5–.11
   chapters), keeps every hồi whose opening filter can be true for that land (both rdK signs, every rdPrev), fills its text through fill67
   (land tokens {land} {pv} {mh} {canh} {laq} {nden} …) and flags any word from ANOTHER land's list.
   usage: node dev/test/bang-words/scan.js [url] [--list]   → exit 1 when a hit remains */
const {chromium}=require('playwright');const path=require('path');
const W={
 steppe:/thảo nguyên|Khả hãn|Khả đôn|Phụ hãn|sữa ngựa|sữa dê|trà sữa|lều nỉ|lều da|trướng vàng|du mục|đèn bơ|chăn nuôi cừu/i,
 korea:/rong biển|nhân sâm|tía tô|Nhiên Đăng|Khai Kinh|giấy Cao Ly|họ Phác|lão Phác|kim chi/i,
 persia:/lửa thánh|Hỏa giáo|sa mạc|lạc đà|Vương trung vương|Hoàng đế Ba Tư|Ba Tư/i,
 korea2:/Cao Ly/i,steppe2:/Bắc Địch/i};
/* pf = Phù Tang (E40r review: the 3rd hòa thân land, landed after this scan was written); rong biển / tía tô are true for Phù Tang too, so the korea list is not used for pf */
W.japan=/Thiên hoàng|Nại Lương|đền Thần|Nan Ba/i;
const BAD={nc:["steppe","persia","steppe2","japan"],bd:["korea","persia","korea2","japan"],bt:["steppe","korea","korea2","japan"],pf:["steppe","persia","steppe2"]};
(async()=>{const url=process.argv[2]&&!/^--/.test(process.argv[2])?process.argv[2]:'file://'+path.join(__dirname,'../../index.html');
 const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(url);await p.waitForFunction(()=>typeof start==='function'&&typeof fill67==='function'&&typeof NCL==='object',null,{timeout:120000});await p.waitForTimeout(1000);
 const R=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  let g=0;while(g++<80){start();if(S.origin&&(S.origin.k==='nc'||S.origin.k==='bd'))break}
  const out={};const K0=rdK,P0=rdPrev;const all=Object.keys(ARC67);
  const prem=k=>all.filter(id=>ARC67[id].o===k);
  const lands={nc:{k:'nc',ps:prem('nc')},bd:{k:'bd',ps:BD_OLD.slice()},bt:{k:'bd',ps:prem('bd').filter(id=>!BD_OLD.includes(id))},pf:{k:'pf',ps:prem('pf')}};
  for(const L in lands){const D=lands[L];S.origin.k=D.k;out[L]={arcs:0,beats:0,txt:[]};
   for(const p0 of D.ps){S.st.f14=S.st.f14||{};S.st.f14.road=p0;const ids=[p0].concat(all.filter(id=>id.indexOf(p0+'_')===0));
    for(const id of ids){const a=ARC67[id];if(!a)continue;out[L].arcs++;let A;try{A=newThread67(id,'x')}catch(e){continue}
     const seen=new Set();const add=(tag,s)=>{if(typeof s==='function'){try{s=s(A)}catch(e){return}}if(typeof s!=='string'||!s)return;let x;try{x=fill67(s,A)}catch(e){return}x=String(x).replace(/<[^>]*>/g,'');if(!seen.has(x)){seen.add(x);out[L].txt.push(id+'.'+tag+'\t'+x)}};
     {const t0=a.t;if(typeof t0==='string'&&/\{\w+\}/.test(t0))out[L].txt.push(id+'.title(raw read)\t'+t0)}add('t',a.t);add('g',a.g);add('sj',a.sj);
     for(const bk in (a.B||{})){const bd=a.B[bk];let ok=!bd.if;
      if(bd.if)for(const k of [1,-1])for(const pv of ['','win2','win','mid','lose']){window.rdK=()=>k;window.rdPrev=()=>pv;try{if(bd.if(A))ok=true}catch(e){}}
      window.rdK=K0;window.rdPrev=P0;if(!ok)continue;out[L].beats++;
      add(bk+'.h',bd.h);add(bk+'.t',bd.t);let O=bd.o;if(typeof O==='function'){try{O=O(A)}catch(e){O=[]}}
      for(const o of (O||[]))if(o&&typeof o==='object')for(const k of ['n','rt','rf','wx','lx','j67'])add(bk+'.'+k,o[k])}}
    /* the road's grand endings (GE_DATA / GE_CAT): every shown string; option-name lists (pull/push/lean) are match keys, not text */
    let A2;try{A2=newThread67(p0,'x')}catch(e){A2={}}const seen2=new Set();
    const walk=(o,tag)=>{if(typeof o==='string'){let x;if(/^D\.e\[\d+\]\.(t|a|ft|ht|ha)$/.test(tag)&&/\{\w+\}/.test(o)){if(typeof geF!=='function'){out[L].txt.push(p0+'.GE.'+tag+'\t(raw on screen) '+o);return}o=geF(o)}try{x=fill67(o,A2)}catch(e){return}x=String(x).replace(/<[^>]*>/g,'');if(!seen2.has(x)){seen2.add(x);out[L].txt.push(p0+'.GE.'+tag+'\t'+x)}return}
     if(Array.isArray(o)){o.forEach((v,i)=>walk(v,tag+'['+i+']'));return}if(o&&typeof o==='object')for(const k in o){if(/^(pull|push|lean|p|m|close|doom|cond)$/.test(k))continue;walk(o[k],tag+'.'+k)}};
    try{if(typeof GE_DATA==='object'&&GE_DATA[p0])walk(GE_DATA[p0],'D');if(typeof GE_CAT==='object'&&GE_CAT[p0])walk(GE_CAT[p0],'C')}catch(e){}}
   /* the home phase of that land (jkc2 KC2LAND + its place lines, read through the bdTxt getters with this land's premise set) */
   S.st.f14.road=D.ps[0];const br=D.k==='bd'?'bd':'nc';const walkH=(o,tag,d)=>{if(d>4)return;if(typeof o==='string'){out[L].txt.push('home.'+tag+'\t'+o);return}if(Array.isArray(o)){o.forEach((v,i)=>walkH(v,tag+'['+i+']',d+1));return}if(o&&typeof o==='object')for(const k in o)walkH(o[k],tag+'.'+k,d+1)};
   try{if(typeof KC2LAND==='object')walkH(KC2LAND[br],'KC2LAND',0);const pre=br==='bd'?'nb_':'nn_';for(const k in KCPL)if(k.indexOf(pre)===0)walkH(KCPL[k],k,0)}catch(e){}}
  return out});
 let hits=0;const list=process.argv.includes('--list');const rows=[];
 for(const L in R){const bad=BAD[L];let n=0;for(const line of R[L].txt){if(/\{\w+\}/.test(line.split('\t')[1]||'')){n++;if(list)console.log(`${L}\traw-token\t${line.slice(0,200)}`)}for(const w of bad){const m=line.match(W[w]);if(m){n++;if(list)console.log(`${L}\t${w}\t«${m[0]}»\t${line.slice(0,220)}`)}}}hits+=n;rows.push(`${L}\tarcs ${R[L].arcs}\thồi ${R[L].beats}\tstrings ${R[L].txt.length}\twrong-land hits ${n}`)}
 console.log(rows.join('\n'));if(errs.length)console.log('page errors',errs.slice(0,3));console.log(hits||errs.length?'FAIL':'PASS');await b.close();process.exit(hits||errs.length?1:0)})();
