/* KC ROADS lore scan (LUẬT SỬA CẢ NHÓM, review/kc-roads-cn-nc): for cnv / nc / bd, start the home road, read the home facts, then pass the
   selection (kc2Enter) and read every palace-side text that speaks of her past (j1/j42/jorigins origin line, ORIGIN_LORE, STORY goal, the
   j67 arcs of that origin, j72 family letters) and check they agree with the home road. usage: node scan.js <site url> [origins,comma] [out.json] */
const {chromium}=require('playwright');const fs=require('fs');
const URL=process.argv[2],ORGS=(process.argv[3]||'cnv,nc').split(','),OUT=process.argv[4]||'';const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const rows=[];
 for(const o of ORGS){const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});
  const p=await c.newPage();p.setDefaultTimeout(90000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);await skip();
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  const has=await p.evaluate(og=>{for(let i=0;i<400&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}return S.origin.k===og},o);
  if(!has){rows.push({o,skipped:'origin not in this build'});await c.close();continue}
  await sleep(600);await skip();
  await p.evaluate(()=>{document.querySelector('#modal [data-kcp="nha"]').click()});await sleep(700);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>{document.querySelector('#modal button[data-nl="ok"]').click()});await sleep(1500);
  const R=await p.evaluate(og=>{const g=r=>S.kc.fam.find(m=>m.r===r);const E={o:og,n:S.origin.n,line:S.origin.t,kd:S.kc&&S.kc.kd};
   E.home={title:kcTitle(),word:pMe().rw,fam:S.kc.fam.map(m=>`${m.t}: ${m.name}`),age:S.age};
   const arcs=Object.keys(ARC67).filter(k=>k.startsWith(og+'_')).map(k=>ARC67[k].t+': '+ARC67[k].g);
   E.palace={lore:(window.originLore&&originLore(og))||null,goal:STORY[og]&&STORY[og].goal,arcs};
   /* through the gate with a middle result */
   S.kc.ex={art:'',play:1};kc2Enter(5);E.gate={Q:Q.map(m=>m.t),rank:S.rank,srv:!!(S.srv&&!S.srv.risen),srvT:typeof srvTitle==='function'?srvTitle():'',age:S.age,tier:S.kc.ex.tier};
   const C=[];const ok=(fact,src,home,pass)=>C.push({fact,src,home,pass:!!pass});
   if(og==='cnv'){const xs=[];try{allServ().forEach(s=>{if(s.name==='Xuân Đào')xs.push(s.sid)})}catch(e){}
    ok('Xuân Đào, cô gái cùng quê vào cung một đợt','j67 cnv_ban',`home: ${g('xd')?'Xuân Đào in the village':'none'}; palace: ${xs.length} maid(s) named Xuân Đào${S.kc.xdSid!=null?' (known to her)':''}`,g('xd')&&xs.length===1);
    ok('Con nhà thường dân, qua kỳ tuyển cung nữ của Nội vụ phủ','j42 origin line',`home: ${E.home.title}; gate: ${E.gate.srvT}`,/Thôn nữ/.test(E.home.title)&&E.gate.srv);
    ok('Lưu ma ma, Nội vụ phủ','j67 cnv_ma','bà Tư names Lưu ma ma (card "Nghe bà Tư kể chuyện trong cung")',true);
    ok('age at entry','j42 srvInit (18+R(3))',`home 18 → palace ${E.gate.age}`,E.gate.age===E.home.age)}
   else{const dad=g('cha'),bros=S.kc.fam.filter(m=>/^huynh/.test(m.r)),th=g('thuc');
    ok('father alive at entry (sends orders / falls ill / dies later in the palace arcs)',og==='nc'?'j4 goal, j67 nc_gian / nc_vuong':'j67 bd_hoa c2',`${dad.t} ${dad.name}: ${dad.alive?'alive':'dead'}`,dad.alive);
    if(og==='nc'){ok('Hoàng huynh leads the envoy; Hoàng huynh vs Hoàng thúc fight for the throne','j67 nc_su, nc_vuong',`${bros.map(m=>m.t).join(', ')}; ${th?th.t:'no uncle'}`,bros.length===1&&bros[0].t==='Hoàng huynh'&&th);
     ok('father wants her as eyes and ears','j4 goal "Phụ vương … muốn ngươi làm tai mắt"','home hồi 3: he asks; she accepts or refuses (he still wants it)',true)}
    else{ok('two elder brothers fight for the throne','jorigins bd_hoang',bros.map(m=>m.t).join(', '),bros.length===2);
     ok('300 horses as dowry','jorigins bd_ngua s1','home hồi 3 text: "Ba trăm con ngựa sẽ theo con làm hồi môn" (always)',true);
     ok('hòa ước mười năm','jorigins origin line','home "Điều khoản hòa ước": giữ yên biên ải mười năm',true)}
    ok('rank = ceiling only, earned at Lễ ra mắt','OD:L1250',`ceiling ${RANKS[S.origin.r].n}, middle result → ${RANKS[S.rank].n}`,S.rank<=S.origin.r)}
   E.checks=C;return E},o);
  R.errs=errs.slice(0,5);rows.push(R);await c.close()}
 await b.close();const j=JSON.stringify(rows,null,1);if(OUT)fs.writeFileSync(OUT,j);else console.log(j)})().catch(e=>{console.error(e);process.exit(1)});
