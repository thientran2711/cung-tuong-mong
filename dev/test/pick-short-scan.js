/* PICK-SHORT SCAN (K-PICK-SHORT, KK63 ruling (a) 27/11 23:45Z; law 10 + law 11): every §28.13i pick grid in a picture frame, Fold 755x1000 +
   iPad 1180x820, on F's s7 save (chest cut to 5 and the full chest) and the y05 save. A case PASSES when the option box shows ONE whole row of
   tiles + the §23 pager (+ the sticky confirm) with nothing over a tile, OR the card shows no big scene picture (.kpsubj.kpiart / .kdlgart
   band) and nothing covers a tile; AND nothing paints over the sticky confirm / pager (K-PICK-TOP: elementFromPoint, first view,
   box scrolled half / end, page 2). LIVE has no pager (all tiles in one scroller): there «row + pager» = one whole row in view.
   usage: python3 dev/build/assemble.py && node dev/test/pick-short-scan.js <built root> [--y05 <save.json>] > out.json
          node dev/test/pick-short-scan.js --cmp before.json after.json      (before / after table, exit 1 on any FAIL in after)
   The family (every dialog with item options, jgpick kipOn): giftpick «Tặng quà», giftto emp / th «Dâng quà», plantpick «Cài đồ», tsgiftpick
   it / wk / both «Biếu quà làm lành», wkgive (a handmade work, when the save has one). giftpick / plantpick are built with ptOn() off (on s7
   no servant can be sent, so the by-hand lists would hold no item; same stub on both trees). Opened once the event-art manifest answers. */
const fs=require('fs'),path=require('path');
if(process.argv[2]==='--cmp'){const B=JSON.parse(fs.readFileSync(process.argv[3])),A=JSON.parse(fs.readFileSync(process.argv[4]));let bad=0,n=0;
 console.log('| device | save | picker | before (LIVE) | after (branch) |\n|---|---|---|---|---|');
 const f=r=>!r?'—':r.none?'no list':r.err?'ERR '+r.err.slice(0,60):`${r.pass?'PASS':'FAIL'} box ${r.box} / need ${r.need}${r.pic?' · big pic':' · no pic'}${r.step?' · stepped':''}${r.short?' · kipshort':''}${r.over?' · over '+r.over:''}${r.paint?' · PAINT OVER '+r.paint:''} · row ${r.row}`;
 for(const a of A){const b=B.find(x=>x.dv===a.dv&&x.save===a.save&&x.n===a.n);if(!a.none){n++;if(!a.pass||a.err)bad++}console.log(`| ${a.dv} | ${a.save} | ${a.n} | ${f(b)} | ${f(a)} |`)}
 console.log(bad?`pick-short-scan FAIL ${bad}/${n}`:`pick-short-scan PASS ${n}/${n}`);process.exit(bad?1:0)}
const A=process.argv.slice(2),arg=(k,d)=>{const i=A.indexOf(k);return i>=0?A[i+1]:d};
const ROOT=path.resolve(A[0]);const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const cp=require('child_process'),zlib=require('zlib');
const S7=JSON.parse(zlib.gunzipSync(cp.execSync('git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz',{cwd:__dirname,maxBuffer:1<<28})).toString());
const Y05=fs.existsSync(arg('--y05',''))?fs.readFileSync(arg('--y05'),'utf8'):cp.execSync('git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/fixtures/save-growth/y05-ncBtuc-035.json',{cwd:__dirname,maxBuffer:1<<28}).toString();
const PK=[['Tặng quà','giftpick','v'],['Dâng quà (vua)','giftto','emp'],['Dâng quà (Thái hậu)','giftto','th'],['Cài đồ','plantpick','v'],['Biếu quà · đồ','tsgiftpick','vit'],['Biếu quà · tác phẩm','tsgiftpick','vwk'],['Biếu quà · cả hai','tsgiftpick','vall'],['Dâng tác phẩm','wkgive','wk']];
const SAVES=[['s7 chest 5',5],['s7 chest full',0],['y05',-1]];const ONLY=(process.env.PSS_ONLY||'').split('|');/* PSS_ONLY='755x1000|s7 chest 5|Tặng quà' = one case (any part empty = all) */const on=(i,v)=>!ONLY[i]||ONLY[i]===v;
(async()=>{const b=await chromium.launch();const out=[];for(const [vw,vh] of [[755,1000],[1180,820]]){const dv=vw+'x'+vh;if(!on(0,dv))continue;
 for(const [sv,N] of SAVES){if(!on(1,sv))continue;const ctx=await b.newContext({viewport:{width:vw,height:vh},reducedMotion:'reduce'});await serve(ctx,ROOT);await ctx.addInitScript(()=>{window.__kriOff=1});
  const p=await ctx.newPage();try{await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:300000});await p.waitForFunction(()=>typeof deser==='function'&&window.COOPW,null,{timeout:300000});
  await p.addStyleTag({content:'#klife{display:none!important}'});
  if(process.env.PSS_NOSTEP)await p.evaluate(()=>{window.__kon=kitOptNeed;window.kitOptNeed=()=>0});/* diagnostics: the frame the branch would draw WITHOUT the K-PICK-SHORT step */
  await p.evaluate(([s7,y5,N])=>{try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}let d;if(N>=0){for(const k in s7)localStorage.setItem(k,s7[k]);d=loadSlot(1);SLOT=1}else{localStorage.setItem(SK(3),y5);SLOT=3;d=loadSlot(3)}
   quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;while(Q.length)Q.shift();try{deal();if(S.mg)S.mg=null;S.tutTour=1;coachOff&&coachOff()}catch(e){}try{render()}catch(e){}if(N>0)S.inv=S.inv.slice(0,N)},[S7,Y05,N]);
  await p.waitForFunction(()=>{try{return !!kitEvArt(Object.assign({kind:'choice'},mkP('giftto',{t:'emp'})))}catch(e){return false}},null,{timeout:90000,polling:1000}).catch(()=>{});
  for(const [n,pid,kind] of PK){if(!on(2,n))continue;const r=await p.evaluate(async([n,pid,kind])=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const v=liveRivals(true).filter(x=>x.alive!==false&&!x.out)[0];
    while(Q.length)Q.shift();try{closeModal()}catch(e){}let it=null;const po=typeof ptOn==='function'?ptOn:null;
    try{if(po)ptOn=()=>false;if(kind==='wk'){const ix=S.inv.findIndex(e=>e&&e.wk);if(ix<0)return{none:1};it=mkP('wkgive',{ix})}
     else it=mkP(pid,kind==='emp'?{t:'emp'}:kind==='th'?{t:'th'}:kind==='vit'?{v:v.id,k:'it'}:kind==='vwk'?{v:v.id,k:'wk'}:kind==='vall'?{v:v.id}:{v:v.id})}catch(e){return{err:String(e)}}finally{if(po)ptOn=po}
    if(!it||!(it.o||it.opts||[]).some(o=>o&&o.ik!=null))return{none:1};pushDil(it,n);{const j=Q.indexOf(it);if(j>0){Q.splice(j,1);Q.unshift(it)}}showModal();await w(4500);
    const M=document.getElementById('modal'),d=M.querySelector('.dlg'),o=M.querySelector('#mb>.opts')||M.querySelector('.opts');if(!o)return{err:'no .opts'};
    const R=e=>e.getBoundingClientRect(),vis=e=>e&&e.offsetParent&&R(e).height>2&&R(e).width>2;
    const scOf=o=>{let s=o;while(s&&s!==M){const cs=getComputedStyle(s);if(/(auto|scroll)/.test(cs.overflowY)&&s.scrollHeight>s.clientHeight+2)return s;s=s.parentElement}return o};const sc=scOf(o);
    const t=[...M.querySelectorAll('.kipc')];if(!t.length)return{err:'no tiles'};
    if(sc!==o&&!o.contains(sc)){sc.scrollTop+=Math.max(0,R(M.querySelector('.kipg')).top-R(sc).top-4);await w(300)}/* a whole column scrolls (kdpall): read it as she sees it once she scrolled the grid up */
    const ob=R(sc),top=Math.max(ob.top,0),bot=Math.min(ob.top+sc.clientHeight,innerHeight);const t0=Math.round(R(t[0]).top),row=t.filter(x=>Math.abs(Math.round(R(x).top)-t0)<3);
    const pg=M.querySelector('.kipw>.kippg'),go=M.querySelector('.kipw>.kipgo');const ins=e=>{const r=R(e);return r.top>=top-1&&r.bottom<=bot+1};
    const ovl=(a,b)=>{const x=R(a),y=R(b);return x.bottom>y.top+1&&x.top<y.bottom-1&&x.right>y.left+1&&x.left<y.right-1};
    const cov=[pg,go].filter(e=>e&&vis(e)&&getComputedStyle(e).position==='sticky');const over=row.filter(x=>cov.some(c=>ovl(x,c))).length;/* the sticky pager / confirm over a tile of the row in view */
    const rowIn=row.every(ins),pgIn=!pg||ins(pg),goIn=!go||!vis(go)||getComputedStyle(go).position!=='sticky'||ins(go);
    const pic=[...M.querySelectorAll('#mb>.kdlgart:not(.kesband),#mb>.kpb>.kpsubj.kpiart,.k3right>.k3ev')].some(vis);
    const need=Math.round(R(row[0]).height+(pg?R(pg).height:0)+(go&&cov.includes(go)?R(go).height:0));
    /* K-PICK-TOP (rv R6 FAIL 2, law 11): NOTHING paints over the sticky confirm / pager. Every element of the box that overlaps one of them (inside the
       part of the box she sees) is hit-tested at the middle of the overlap: elementFromPoint must give the confirm / pager (or its child), never that
       element (pointer-events forced on for the test: a pointer-events:none chip still paints). Read on the first view (a chosen tile's detail card + its grade chip under «Dâng»), with the box scrolled half way and to the end
       (tiles / chips pass under them), and on page 2 */
    const rowTxt=`${row.filter(ins).length}/${row.length}`;
    const paint=async()=>{const bad=[];const pe=document.createElement('style');pe.textContent='#modal .opts *{pointer-events:auto!important}';document.head.appendChild(pe);/* a chip with pointer-events:none is still PAINTED over the button: hit-test what she sees */try{const o2=M.querySelector('#mb>.opts')||M.querySelector('.opts'),sc2=o2?scOf(o2):sc,C=R(sc2),cT=Math.max(0,C.top),cB=Math.min(innerHeight,C.top+sc2.clientHeight);
      for(const e of [M.querySelector('.kipw>.kipgo'),M.querySelector('.kipw>.kippg')]){if(!e||!vis(e)||getComputedStyle(e).position!=='sticky')continue;const r=R(e);
       for(const x of M.querySelectorAll('.opts *')){if(e.contains(x)||x.contains(e)||x.closest('.kscue')||!x.getClientRects().length)continue;const a=R(x);
        const t=Math.max(a.top,r.top,cT),b=Math.min(a.bottom,r.bottom,cB),l=Math.max(a.left,r.left,0),rr=Math.min(a.right,r.right,innerWidth);if(b-t<2||rr-l<2)continue;
        const h=document.elementFromPoint((l+rr)/2,(t+b)/2);if(h&&(h===x||x.contains(h))&&!e.contains(h))bad.push((e.classList.contains('kipgo')?'go':'pg')+':'+(String(x.className||x.tagName).split(' ')[0]||x.tagName)+(sc.scrollTop>s0+2?'@scrolled':''))}}}finally{pe.remove()}return bad};
    const s0=sc.scrollTop;const P=[...await paint()];for(const k of [.5,1]){sc.scrollTop=s0+(sc.scrollHeight-sc.clientHeight-s0)*k;await w(250);P.push(...await paint())}sc.scrollTop=s0;await w(200);
    {const nx=M.querySelector('.kipw>.kippg [data-kippg="1"]:not([disabled])');if(nx){nx.click();await w(900);if(M.querySelector('.kipw'))P.push(...(await paint()).map(x=>'p2 '+x))}}
    const paintOver=[...new Set(P)].join(',');
    const pass=over===0&&!paintOver&&((rowIn&&pgIn&&goIn)||!pic);
    const dbg=window.__kon?(()=>{const o3=M.querySelector('#mb>.opts')||o,w3=o3.querySelector(':scope>.kipw'),g3=w3&&w3.querySelector('.kipg');return{kon:window.__kon(o3),oc:o3.clientHeight,gt:g3?Math.round(R(g3).top-R(o3).top):null,tile:Math.round(R(t[0]).height),pg:pg?Math.round(R(pg).height):0,go:go?Math.round(R(go).height):0,pb:getComputedStyle(o3).paddingBottom}})():undefined;
    return{pass,paint:paintOver||0,dbg,box:Math.round(bot-top),need,pic,row:rowTxt,over,step:d.classList.contains('kdnopic'),short:!!M.querySelector('.kipw.kipshort'),
     frame:[...d.classList].filter(c=>!/^(kfit|kv\d|kpanel|kipdlg|kpsc)$/.test(c)).sort().join(' ')}},[n,pid,kind]).catch(e=>({err:String(e)}));
   out.push(Object.assign({dv,save:sv,n},r));console.error(dv,sv,n,JSON.stringify(r))}}catch(e){console.error('ERR',dv,sv,String(e));out.push({dv,save:sv,n:'*',err:String(e)})}finally{await ctx.close()}}}
 await b.close();console.log(JSON.stringify(out))})();
