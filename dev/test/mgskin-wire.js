/* mgskin-wire (THIN lane MGSKIN-WIRE, review/mgskin-wire; KIT §MG-SKIN) — node dev/test/mgskin-wire.js [index.html] [outdir]
   Every painted seasonal skin of Foreman F (img/mg/<board>-<id>.webp, ids xuan ha thu dong) is registered ONCE (dev/build/jmgskin.js, through kitMgSkinAdd) — checks, on Fold 755x1000 + iPad 1180x820:
   (a) all 39 KG82_KIND kinds list 5 skins (default + xuan/ha/thu/dong, palettes dao/ngoc/kim/mac, names non-empty, no «%»); kinh / may follow «ve» (KG82_BOARDOF);
   (b) every skin of every kind resolves to a painted file that is on the CDN index (img/mg/<board>-<id>.webp) for the board the kind plays (both Thử tay contexts), hoadien through its chai-bg;
   (c) an unpainted skin id falls back to today's art (img/kit/mg-<n>.webp); duho / den (jts.js resolver) resolve tsduho-<id> / tsden-<id> and fall back to the event painting;
   (d) the pick goes through the shared no-repeat memory (mgskin:<kind>:<skin>): five draws on a fresh memory show default + the four skins once each;
   (e) real frames (Thử tay → Sẵn sàng) with a skin on ≥ 8 boards (incl. duho, den, kinh, may, a DOM board): data-mgskin set, the board really loaded the skinned file (canvas: KG82_IMG[<n>@<id>] complete; DOM: .kgbox-bg url), no page errors;
   (f) the default (no skin) frame is today's art.
   Shots (scratch, never in git): <outdir>/<dev>-<kind>-<skin>.png */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs'),https=require('https');
const URL0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';if(OUT)fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const get=u=>new Promise((rs,rj)=>https.get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>rs(d))}).on('error',rj));
const SEA=['xuan','ha','thu','dong'];const SHOT=['dan','duho','den','kinh','may','tat','tho','thu_tam','ne','huong'];
(async()=>{const idx=JSON.parse(await get('https://ctm-img.victoria-tntt.workers.dev/img/_index.json'));const KEYS=idx.files.map(f=>String(f[0]));
 const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kg82Open==='function'&&typeof mgCalRun==='function'&&typeof kitMgSkinAdd==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(keys=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
   KIT_CDNHAVE=new Set(keys);setInterval(()=>{const k=document.getElementById('kmrew');if(k)k.remove()},100)},KEYS);
  /* (a)(b)(c) registry + resolver, every kind */
  const A=await p.evaluate(()=>{const o={kinds:0,bad:[],noFile:[],pal:[]};const PAL={xuan:'dao',ha:'ngoc',thu:'kim',dong:'mac'};
   for(const k of Object.keys(KG82_KIND)){o.kinds++;const L=kitMgSkinList(k);const ids=L.map(s=>s.id).join(',');if(ids!==',xuan,ha,thu,dong')o.bad.push(k+':'+ids);
    for(const s of L.slice(1)){if(!s.name||/%/.test(s.name))o.bad.push(k+'/'+s.id+':name');if(PAL[s.id]!==s.pal)o.pal.push(k+'/'+s.id)}
    for(const c of ['','hoc']){KG82.ctx=c;const bg=kg82BgName(k);const spr=(KG82_SPR[k]||[]).filter(n=>/-bg$/.test(n));
     for(const s of L.slice(1)){const f=[bg].concat(spr).map(n=>kg82SkinSrc(n,s.id).replace(/^.*?(?=img\/)/,'')).filter(u=>/^img\/mg\//.test(u));if(!f.length)o.noFile.push(k+'/'+c+'/'+s.id)}}KG82.ctx=''}
   const cut=u=>u.replace(/^.*?(?=img\/)/,'');o.fallback=cut(kg82SkinSrc('dan-bg','zzz'));o.fallbackSpr=cut(kg82SkinSrc('dan-blossom','zzz'));o.def=cut(kg82SkinSrc('dan-bg',''));
   o.duho=cut(kg82SkinSrc('tsduho-bg','ha'));o.den=cut(kg82SkinSrc('tsden-bg','dong'));o.kinhList=kitMgSkinList('kinh').length;o.mayList=kitMgSkinList('may').length;
   KG82.skin={id:'zzz',name:'',pal:'son'};const i=kg82Img('tsduho-bg');o.duhoFallback=i.src.replace(/^.*?(?=img\/)/,'');KG82.skin={id:'',name:'',pal:'son'};
   return o});
  ok(A.kinds===39,`${tag} (a) 39 kinds`,A.kinds);ok(!A.bad.length,`${tag} (a) every kind lists default + xuan/ha/thu/dong, names set, no %`,A.bad);ok(!A.pal.length,`${tag} (a) palettes dao/ngoc/kim/mac`,A.pal);
  ok(A.kinhList===5&&A.mayList===5,`${tag} (a) kinh / may follow «ve» (5 each)`,[A.kinhList,A.mayList]);
  ok(!A.noFile.length,`${tag} (b) every skin of every kind has a painted file on the CDN index (both contexts)`,A.noFile);
  ok(A.fallback===A.def&&A.def==='img/kit/mg-dan-bg.webp'&&A.fallbackSpr==='img/kit/mg-dan-blossom.webp',`${tag} (c) unpainted skin id = today's art`,[A.fallback,A.fallbackSpr]);
  ok(/img\/mg\/tsduho-ha\.webp$/.test(A.duho)&&/img\/mg\/tsden-dong\.webp$/.test(A.den),`${tag} (c) duho / den resolve tsduho-<id> / tsden-<id>`,[A.duho,A.den]);
  ok(/img\/ev-le-ha\.webp$/.test(A.duhoFallback),`${tag} (c) duho with an unpainted skin keeps the event painting`,A.duhoFallback);
  /* every painted file the table can reach is on the index (independent of the page: names from the page, keys from the CDN) */
  const FILES=await p.evaluate(()=>{const s=new Set();for(const k of Object.keys(KG82_KIND)){for(const c of ['','hoc']){KG82.ctx=c;const bg=kg82BgName(k);for(const x of kitMgSkinList(k).slice(1))for(const n of [bg].concat(KG82_SPR[k]||[])){const u=kg82SkinSrc(n,x.id).replace(/^.*?(?=img\/)/,'');if(/^img\/mg\//.test(u))s.add(u)}}KG82.ctx=''}return[...s]});
  const miss=FILES.filter(f=>!KEYS.includes(f));ok(FILES.length>100&&!miss.length,`${tag} (b) ${FILES.length} skinned files reachable, all on the CDN index`,miss);
  /* (d) memory */
  const D=await p.evaluate(()=>{const o={};for(const k of ['dan','duho','kinh']){localStorage.removeItem('x');const seen=[];for(let i=0;i<5;i++){const s=mgpSkin(k);seen.push(s||'default')}o[k]={seen,uniq:new Set(seen).size,mem:['xuan','ha','thu','dong'].map(s=>typeof nrNow==='function'?!!nrNow('mgskin:'+k,s):null)}}return o});
  for(const k in D)ok(D[k].uniq===5,`${tag} (d) ${k}: 5 draws = default + 4 skins once each (fresh-first memory)`,D[k].seen);
  ok(D.dan.mem.every(Boolean),`${tag} (d) draws are written to the memory (mgskin:dan:<skin>)`,D.dan.mem);
  /* (e)(f) real frames */
  for(const [i,k] of SHOT.entries()){const sk=SEA[i%4];
   const E=await p.evaluate(async([k,sk])=>{const sleep=t=>new Promise(r=>setTimeout(r,t));try{kg82Close()}catch(e){}KG82.preSkin=sk;mgCalRun(k);await sleep(900);const d=document.getElementById('kg82');
    const btn=[...document.querySelectorAll('#kg82 button')].find(b=>/Sẵn sàng/.test(b.textContent));if(btn)btn.click();await sleep(2200);
    const skinned=()=>KG82_IMG?Object.keys(KG82_IMG).filter(x=>x.endsWith('@'+sk)&&KG82_IMG[x].complete&&KG82_IMG[x].naturalWidth>0&&/img\/mg\//.test(KG82_IMG[x].src)):[];
    /* the skinned picture comes over the network (≈200 KB each, slow behind a proxy / a busy LIVE): wait for it, ≤ 15 s, instead of a fixed 2.2 s; never-loads still FAILs */
    for(let t=0;t<60&&!skinned().length&&!document.querySelector('#kg82 .kgbox-bg');t++)await sleep(250);
    const n=skinned();
    const bgDom=[...document.querySelectorAll('#kg82 .kgbox-bg,#kg82 [style*="img/mg/"]')].map(e=>e.getAttribute('style')||'').filter(s=>s.indexOf('img/mg/')>=0&&s.indexOf('-'+sk+'.webp')>=0);
    return{skin:KG82.skin.id,ds:d&&d.dataset.mgskin,pal:d&&d.dataset.mgpal,imgs:n,dom:bgDom.length,over:d?d.scrollWidth>d.clientWidth+2:null}},[k,sk]);
    ok(E.skin===sk&&E.ds===sk,`${tag} (e) ${k} opens with skin ${sk}`,[E.skin,E.ds,E.pal]);
    ok(E.imgs.length>0||E.dom>0,`${tag} (e) ${k} really loaded the skinned picture (${sk})`,{canvas:E.imgs.map(x=>x.slice(0,40)),dom:E.dom});
    if(OUT)await p.screenshot({path:`${OUT}/${tag}-${k}-${sk}.png`});
    await p.evaluate(()=>{try{kg82Close()}catch(e){}})}
  const F2=await p.evaluate(()=>{try{kg82Close()}catch(e){}kg82Open({art:'Đàn',title:'Thử',how:'x',kind:'dan',skin:''});const d=document.getElementById('kg82');const r={id:KG82.skin.id,pal:d.dataset.mgpal,sk:d.dataset.mgskin||''};kg82Close();return r});
  ok(F2.id===''&&F2.pal==='son'&&F2.sk==='',`${tag} (f) default frame = today's art + son buttons`,F2);
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,3));await p.context().close()}
 await b.close();const bad=res.filter(x=>!x).length;console.log(bad?`FAIL ${bad}/${res.length}`:`ALL PASS ${res.length}`);process.exit(bad?1:0)})();
