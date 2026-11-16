/* review/rank-colour — LUẬT SỬA CẢ NHÓM runtime scan for owner 15/11 (session 8): "Phẩm bậc trong mấy ô chọn này chưa theo màu phẩm, màu phẩm
   xuất hiện mới nơi có tên và phẩm của người." Every place a person's rank / role title stands right before that person's name must show the
   title in its rank tone (KIT 48.1 kitRankTone; 48.3 kitRankPaint / kitName).
   Surfaces visited (each scanned on screen, every VISIBLE "title name" pair counted):
     spy      the reported picker "Sai <maid> đi dò la" (spyPick)
     talk:*   every person on the stage at every place (home, every consort palace, Đức Thọ, Càn Ninh, Ngự hoa viên, Thái y viện, Kính sự
              phòng, Lãnh cung …): every act of talkOpts that opens a picker (a.open) → its dialog
     tab:*    every panel tab (act, go, rv × each consort page, rel, staff, court, kid, fac, art, story, inv, log)
     play     N tuần of bot play (random choices): every dialog the game shows (events, results, toasts, popups) + the log tab after
   Per pair: OK = the title's computed colour is its rank tone (or the kit's lightened tone on a night panel / painting: title inside a kit
   title element .kti .krt .knr-r .j59t .pcrk); PLAIN = the title is in the text's ink.
   usage: NODE_PATH=$(npm root -g) node dev/test/rank-colour.js <url> <out.json> [WxH] [tuan=6] [shotdir]
   compare: node dev/test/rank-colour.js before … ; node … after … ; python3 dev/test/rank-colour.py before.json after.json */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SZ='755x1000',TN='6',SHOT='']=process.argv;
const [W,H]=SZ.split('x').map(Number);const sleep=t=>new Promise(r=>setTimeout(r,t));
const TITLES="Hoàng quý phi|Hoàng hậu|Quý phi|Quý nhân|Thường tại|Đáp ứng|Phế phi|Phi|Tần|Thái tử|Hoàng tử|Công chúa|Thái y|Thị vệ|Ma ma|Chưởng sự cô cô|Cô cô|[Cc]ung nữ thân tín|[Cc]ung nữ thô sử|[Đđ]ại cung nữ|[Cc]ung nữ|[Tt]iểu thái giám|[Tt]ổng quản thái giám|[Tt]ổng quản|[Tt]hái giám|[Nn]ữ quan|[Nn]hũ mẫu|[Nn]hạc sư|[Hh]ọa sư|[Tt]ể tướng|[Tt]hượng thư|[Tt]hị lang|[Tt]ướng quân|[Cc]ông tử";
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function',null,{timeout:180000});await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await sleep(1500);
 /* the opening roulette / "Luân hồi" wait covers the screen: let it finish, then take it away so shots show the dialogs */
 await sleep(8500);await p.evaluate(()=>{document.querySelectorAll('#kroulw,.kroul').forEach(e=>e.remove());try{Q.length=0;showModal()}catch(e){}});
 await p.evaluate(T=>{window.__RC={rows:[],T};
  const rgb=c=>{const d=document.createElement('i');d.style.color=c;document.body.appendChild(d);const v=getComputedStyle(d).color;d.remove();return window.__C(v)};
  const C=v=>{const n=(String(v).match(/[\d.]+/g)||[]).map(Number);return /^color\(/.test(v)?n.slice(0,3).map(x=>x*255):n.slice(0,3)};window.__C=C;const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
  window.__rcScan=function(surface){const people=(typeof kpPeople==='function'?kpPeople():[]);if(!people.length)return 0;
   const names=people.map(x=>x[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');const re=new RegExp(`(?<![\\p{L}])(?:(${T})\\s*(${names})|(${names}) \\((${T})(?=[,;)·]))(?![\\p{L}])`,'gu');
   /* visible text nodes in DOM order, joined */
   const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const e=n.parentElement;if(!e||/^(SCRIPT|STYLE|TEXTAREA|TITLE|OPTION)$/.test(e.tagName))return 2;
    if(e.checkVisibility&&!e.checkVisibility({opacityProperty:true,visibilityProperty:true}))return 2;const r=e.getBoundingClientRect();if(!r.width||!r.height)return 2;return 1}});
   const N=[];let s='';while(tw.nextNode()){const n=tw.currentNode;N.push([s.length,n]);s+=n.nodeValue}
   const at=i=>{let lo=0,hi=N.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(N[m][0]<=i)lo=m;else hi=m-1}return N[lo]};
   let k=0;let m;re.lastIndex=0;while((m=re.exec(s))){if(m[3]){const ti=m.index+m[3].length+2;m=Object.assign([m[0],m[4],m[3]],{index:ti});m[0]=m[1]+' '+m[2]}const [o,n]=at(m.index);const e=n.parentElement;const cs=getComputedStyle(e);const got=C(cs.color);
    const tone=typeof kitRankTone==='function'?kitRankTone(m[1]):'';const want=tone?rgb(tone):[0,0,0];const kitEl=!!e.closest('.kti,.krt,.knr-r,.j59t,.pcrk,.kpstrip small');
    const nameEl=(()=>{const [o2,n2]=at(m.index+m[0].length-1);return n2.parentElement})();const ink=C(getComputedStyle(nameEl).color);
    const ok=dist(got,want)<36||(kitEl&&(e.closest('.modal.night,.stage,.kesov,.krs')!=null)&&dist(got,ink)>30);
    window.__RC.rows.push({surface,title:m[1],name:m[2],ok,kitEl,got:got.map(Math.round).join(','),want:want.map(Math.round).join(','),ctx:s.slice(Math.max(0,m.index-30),m.index+m[0].length+20).replace(/\s+/g,' '),
     where:(e.closest('[id]')||{}).id||'',cls:(e.className&&typeof e.className==='string'?e.className:'')+' < '+((e.parentElement&&typeof e.parentElement.className==='string')?e.parentElement.className:'')});k++}
   return k};
 },TITLES);
 const scan=async(sf)=>{await sleep(120);return p.evaluate(sf=>window.__rcScan(sf),sf)};
 const clearQ=()=>p.evaluate(()=>{try{Q.length=0;showModal()}catch(e){}});
 let shotN=0;const shot=async(nm)=>{if(!SHOT||shotN>=8)return;fs.mkdirSync(SHOT,{recursive:true});shotN++;await p.screenshot({path:`${SHOT}/${nm}-${SZ}.jpg`,type:'jpeg',quality:60})};
 /* make every consort known (names shown), so name+rank pairs exist everywhere */
 await p.evaluate(()=>{try{S.met=S.met||{};rivals.forEach(v=>{S.met[v.id]=S.met[v.id]||1;try{if(typeof k61Meet==='function')k61Meet(v,'gặp',3)}catch(e){}})}catch(e){}});
 /* 1. the reported picker */
 await p.evaluate(()=>{try{Q.length=0;spyPick(0)}catch(e){console.log('spy',e.message)}});await sleep(600);await scan('spy');await shot('spy');await clearQ();
 /* 2. every place, every person, every act that opens a picker */
 const places=await p.evaluate(()=>['home',...places().map(x=>x.k)]);
 for(const k of places){await p.evaluate(k=>{try{Q.length=0;S.dead=0;S.out=0;S.confined=0;if(k==='home'){S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};render()}else{goTo(k)}}catch(e){}try{Q.length=0;showModal()}catch(e){}},k);await sleep(250);
  await scan('place:'+k);
  const n=await p.evaluate(()=>curPeople().length);
  for(let i=0;i<n;i++){const A=await p.evaluate(i=>{try{const pp=curPeople()[i];return talkOpts(pp).map((a,j)=>a&&a.open?j:-1).filter(j=>j>=0)}catch(e){return[]}},i);
   for(const j of A){await p.evaluate(([i,j])=>{try{Q.length=0;popIdx=i;const a=talkOpts(curPeople()[i])[j];S.inv=S.inv&&S.inv.length?S.inv:S.inv;a.open()}catch(e){}try{showModal()}catch(e){}},[i,j]);await sleep(250);
    const hit=await scan(`talk:${k}:${i}:${j}`);if(hit&&k!=='home')await shot(`talk-${k}-${i}-${j}`);await clearQ()}}}
 /* log lines naming people with their rank (as the game writes them) */
 await p.evaluate(()=>{try{rivals.slice(0,8).forEach(v=>log(`${v.queen?'Hoàng hậu':RANKS[v.rank].n} ${v.name} được ban thưởng.`));if(S.maid)log(`Cung nữ thân tín ${S.maid.name} nghe lén được chuyện trong cung.`)}catch(e){}});
 /* 3. every panel tab */
 const tabs=['act','go','rv','rel','staff','court','kid','fac','art','story','inv','men','log'];
 for(const t of tabs){await p.evaluate(t=>{try{Q.length=0;showModal();tab=t;render()}catch(e){}},t);await sleep(700);await scan('tab:'+t);
  if(t==='rv'){const nr=await p.evaluate(()=>rivals.length);for(let i=1;i<nr;i++){await p.evaluate(i=>{try{PG.rv=i;renderPanel()}catch(e){}},i);await sleep(300);await scan('tab:rv:'+i)}}}
 /* 4. bot play: every dialog shown is scanned before it is answered */
 const T=+TN;await p.evaluate(()=>{window.__rcN=0});
 for(let t=0;t<T;t++){for(let g=0;g<40;g++){const st=await p.evaluate(()=>({q:Q.length,dead:!!S.dead,tu:S.turn}));if(st.dead)break;
   if(st.q){await sleep(150);await scan('play:dlg');await p.evaluate(()=>{const m=Q[0];try{if(m.opts&&m.opts.length){const ok=m.opts.map((o,i)=>i).filter(i=>!m.opts[i].lock);chooseM(ok.length?ok[Math.floor(Math.random()*ok.length)]:0)}else closeModal()}catch(e){Q.shift();try{showModal()}catch(e){}}});continue}
   const moved=await p.evaluate(()=>{const n=document.getElementById('next');if(n&&!n.disabled){n.click();return 1}try{endTurn()}catch(e){}return 0});await sleep(300);if(!moved)break}
  await scan('play:stage');}
 await p.evaluate(()=>{try{Q.length=0;showModal();tab='log';render()}catch(e){}});await sleep(800);await scan('play:log');await shot('log');
 const R=await p.evaluate(()=>window.__RC.rows);
 fs.writeFileSync(OUT,JSON.stringify({url:URL,size:SZ,errs,rows:R},null,0));
 const ok=R.filter(r=>r.ok).length;console.log(`${SZ} pairs ${R.length} ok ${ok} plain ${R.length-ok} errors ${errs.length}`);
 const bad={};R.filter(r=>!r.ok).forEach(r=>{const k=r.surface.replace(/:\d+/g,'')+' | '+r.cls.slice(0,60);bad[k]=(bad[k]||0)+1});console.log(JSON.stringify(bad,null,1).slice(0,3000));
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
