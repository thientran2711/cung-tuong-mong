/* roadhp-unit (QUESTLINE Q3): the helper engine in the real build. For tagged options of several helper roles: (a) the card shows the
   willingness word in its Gợi ý hint (BAL.road.hp.word) and no odds; (b) each of the 4 answers is reachable and does what the rule says —
   full: the option's own odds · half: odds − BAL.road.hp.half (sure → 100 − half) · no: cost noC, the hồi stays open with that option gone ·
   sab: the option fails, Đức − sab.duc; (c) every number comes from BAL.road.hp (the test changes BAL and sees the change); (d) an untagged
   option rolls its odds unchanged; (e) __hpoff / co-op guest → today's roll; (f) an open hồi saved without hpNo resolves.
   usage: node dev/test/roadhp-unit.js <url> */
const {chromium}=require('playwright');const URL=process.argv[2]||'http://127.0.0.1:8731/index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof rdHpWho==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{const out=[],fail=[];const ok=(c,m)=>{out.push((c?'ok  ':'FAIL ')+m);if(!c)fail.push(m)};
  quiet=true;start();quiet=false;Q.length=0;const H=BAL.road.hp,H0=JSON.parse(JSON.stringify(H));
  const rec=[];const roll0=roll;roll=x=>{rec.push(x);return true};
  /* a thread on arc id at beat bk, its dialog built; returns {A,tk,opts,i} for the option with raw index ri */
  const open=(id,bk,ri)=>{S.st.X=S.st.X||[];const A=newThread67(id,'t');A.seq=['s','c','t','x'];S.st.X.push(A);A.nb=bk;Q.length=0;fireBeat67(A);const tk=thKey67(A);
   const d=Q[Q.length-1];if(!d)throw Error('no dialog for '+id+':'+bk+' ok='+beatOk67(A,bk)+' cur='+A.cur+' q='+Q.length);const bb=beatDef67(A,bk);const O=opts67(A,bb);const i=O.indexOf(bb.o[ri]);return {A,tk,d,i,bb,O}};
  const force=(role,k)=>{H.w[role]=[0,0,0,0];H.w[role][k]=100;H.tr={};H.aff=[0,0,0,0];H.rdRiv=0;H.owe=0;H.tcSab=0};
  const reset=()=>{Object.assign(H,JSON.parse(JSON.stringify(H0)))};
  /* one open-able tagged option per role (the beat must be playable in this life and the option shown) */
  const CASES=[];const tryOpen=(id,bk,ri)=>{try{S.st.X=S.st.X||[];const A=newThread67(id,'t');S.st.X.push(A);A.nb=bk;Q.length=0;if(!beatOk67(A,bk))return false;fireBeat67(A);const bb=beatDef67(A,bk);return !!Q.length&&opts67(A,bb).includes(bb.o[ri])}catch(e){return false}};
  for(const role of ['th','bro','off','dad','eun','go','fam','srv','emp']){for(const [k,t] of Object.entries(RDHP)){if(t.hp!==role)continue;const [id,bk,ri]=k.split(':');if(tryOpen(id,bk,+ri)){CASES.push([id,bk,+ri,role]);break}}}
  ok(CASES.length>=6,'open-able cases: '+CASES.map(c=>c[3]+'='+c.slice(0,3).join(':')).join(' '));
  for(const [id,bk,ri,role] of CASES){const key=id+':'+bk+':'+ri;ok(RDHP[key]&&RDHP[key].hp===role,`tag ${key} = ${role}`);
   /* (a) the word */
   let X=open(id,bk,ri);const ro=X.d&&X.d.opts&&X.d.opts[X.i];ok(!!(ro&&typeof ro.hint==='function'),`${key}: card option has the helper hint`);
   if(ro){const h=ro.hint(1);const W=Object.values(H.word);ok(W.some(w=>h.includes(': '+w)),`${key}: hint starts with a willingness word: «${h}»`);ok(!/%|\d/.test(h),`${key}: no number in the hint`)}
   const sure=!(X.bb.o[ri].o!=null);
   /* (b) the 4 answers */
   for(let k=0;k<4;k++){reset();force(role,k);X=open(id,bk,ri);const od=X.d.pp.o[X.i];rec.length=0;const s0={suc:S.suc,duc:S.duc};const L0=S.logSeq||0;
    res67(X.tk,bk,X.i,od);const A=X.A;
    if(k===0){ok(A.cur!==bk&&(sure?rec.length===0:rec[0]===od),`${key} full: own odds (${sure?'sure':od}) → rolled ${rec.join(',')||'none'}`)}
    if(k===1){const want=sure?100-H.half:Math.max(H.min,od-H.half);ok(A.cur!==bk&&rec[0]===want,`${key} half: odds ${od} → ${want} (rolled ${rec.join(',')})`)}
    if(k===2){const left=opts67(A,X.bb);ok(A.cur===bk&&!left.includes(X.bb.o[ri])&&left.length===X.O.length-1,`${key} no: hồi stays open, option gone (${X.O.length}→${left.length})`);
     ok(S.suc===Math.max(0,s0.suc+(H.noC.suc||0))||S.suc===s0.suc+(H.noC.suc||0),`${key} no: cost noC Sức ${s0.suc}→${S.suc}`);
     /* the next pick of another option resolves the hồi and clears hpNo */
     const d2=Q[Q.length-1];const j=0;res67(X.tk,bk,j,d2.pp.o[j]);ok(A.cur!==bk&&!A.hpNo,`${key} no: another option then closes the hồi, hpNo cleared`)}
    if(k===3){ok(A.cur!==bk&&S.duc===Math.max(0,s0.duc-H.sab.duc)||S.duc===s0.duc-H.sab.duc,`${key} sab: fails, Đức ${s0.duc}→${S.duc}`);ok(rec.length===0||rec[0]===0,`${key} sab: forced failure (odds 0)`)}}
   /* (c) BAL only: change half and see it */
   if(!sure){reset();force(role,1);H.half=33;X=open(id,bk,ri);const od=X.d.pp.o[X.i];rec.length=0;res67(X.tk,bk,X.i,od);ok(rec[0]===Math.max(H.min,od-33),`${key}: BAL.road.hp.half=33 read (${od}→${rec[0]})`)}}
  /* (d) untagged option unchanged: the first option of the same hồi with no tag */
  reset();{const [id,bk,ri]=CASES[0];const X=open(id,bk,ri);const j=X.O.findIndex(o=>!RDHP[id+':'+bk+':'+X.bb.o.indexOf(o)]);const od=X.d.pp.o[j];rec.length=0;res67(X.tk,bk,j,od);
   ok(j>=0&&!X.d.opts[j].hint&&(od>=100?rec.length===0:rec[0]===od),`untagged option «${X.O[j]&&X.O[j].n}» rolls its own odds (${od} → ${rec.join(',')||'sure'})`)}
  /* (e) switched off / co-op guest */
  for(const [nm,on,off] of [['__hpoff',()=>{window.__hpoff=1},()=>{delete window.__hpoff}],['co-op guest',()=>{window.COOPW={on:1,seat:'b'}},()=>{delete window.COOPW}]]){reset();force(CASES[0][3],3);on();
   const X=open(CASES[0][0],CASES[0][1],CASES[0][2]);const ro=X.d.opts[X.i];const od=X.d.pp.o[X.i];rec.length=0;const d0=S.duc;res67(X.tk,CASES[0][1],X.i,od);
   ok(!ro.hint&&rec[0]===od&&S.duc===d0,`${nm}: no word, today's roll (${od})`);off()}
  /* (f) an open hồi from an old save (no hpNo, dialog already queued) */
  reset();{const [id,bk,ri]=CASES[0];const X=open(id,bk,ri);delete X.A.hpNo;const od=X.d.pp.o[X.i];res67(X.tk,bk,X.i,od);ok(X.A.cur!==bk||!!X.A.hpNo,`old open hồi (no hpNo) resolves`)}
  /* (g) a missing person / name (review E9r item 3): mis / man / v / foe / n1 with nobody → the go set (lines, weights, word Không rõ) */
  reset();for(const hp of ['mis','man','v','v2','foe','n1']){const A={a:'tt_co',act:{},f:{},n1:'',n2:''};const sv0=S.foe;if(hp==='foe')S.foe='';let P;try{P=rdHpWho(A,hp)}finally{S.foe=sv0}
   if(hp==='man'&&P.p)continue;/* man67 always finds a man when S.men has one */const w=rdHpW(A,P),L=rdHpLine(A,P,0);
   ok(P.type==='go'&&rdHpWord(P,w)===H.word.unk&&!/[{}]/.test(L)&&rdHpLab(P)==='Người được nhờ',`empty ${hp} → go: «${rdHpLab(P)}: ${rdHpWord(P,w)}» «${L}»`)}
  /* (h) every role renders with a speaker (no raw {xung}) — off was the gap (review E9r item 1) */
  reset();for(const hp of Object.keys(H.w)){const A={a:'tt_co',act:{},f:{},n1:'Lý Tường',n2:''};const P=rdHpWho(A,hp);const L=[0,1,2,3].map(k=>rdHpLine(A,P,k)).join(' | ');ok(!/[{}]/.test(L),`${hp} renders: ${L.slice(0,90)}`)}
  /* draws reachable with the shipped numbers: a cold Kiêu ngạo consort vs a warm Ân cần one */
  reset();const P0={role:'v',type:'rv',p:null,net:[],aff:0,tc:60,known:true,dk:null};
  const cold=rdHpW(null,Object.assign({},P0,{net:['Kiêu ngạo','Thù dai'],aff:-40})),warm=rdHpW(null,Object.assign({},P0,{net:['Ân cần','Trọng nghĩa'],aff:40}));
  const sh=w=>w.map(x=>Math.round(x*100/w.reduce((a,y)=>a+y,0)));ok(sh(cold)[3]>sh(warm)[3]+20,`cold Kiêu ngạo sab ${sh(cold)[3]} vs warm Ân cần ${sh(warm)[3]} (shares full/half/no/sab cold ${sh(cold)} warm ${sh(warm)})`);
  roll=roll0;return {out,fail}});
 r.out.forEach(x=>console.log(x));if(errs.length)console.log('page errors:',errs.slice(0,5));
 console.log(r.fail.length||errs.length?`ROADHP-UNIT FAIL (${r.fail.length})`:'ROADHP-UNIT PASS');await b.close();process.exit(r.fail.length||errs.length?1:0)})();
