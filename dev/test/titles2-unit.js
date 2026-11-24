/* review/titles2 (owner OD 23/11 ~22:45Z + ~22:55Z; brief E55): TITLES2 unit — jdh3.js over jdh + KIT §82 / §82.1.
   usage: node dev/test/titles2-unit.js <page URL> [outdir]
   Cases (each FAILS on LIVE main, which has no jdh3): A1 catalogue (≥12 good + ≥12 bad reputation titles, each a BAL row with ONE gain + ONE loss, names unique in
   DH_CAT, ≤ 4 words, no digit / % in player words) · A2 earn + lose by the rule (state rules and deed rules through the real two-way hooks: caught, punish,
   framed + the framer convicted, econPayWin rumor / accuse, kidDie) · A3 NPC: the SAME rule gives / takes it, the consort card line shows it · A4 effects while
   held (share of a gain more / less, heavier Danh loss, caughtOdds muu / kin, additive dhB) · A5 never worn · B1 road chapter good + bad (end67, lean), NPC road
   (nrEnd) · B2 side arc · B3 j72 việc nhờ ok / fail · B4 j70 mưu hại roles · B5 j71 lập công + hush money · F1–F5 = FIX r1 (E56r FAIL 1–5: a title per road CHAPTER + premise, NPC nrEnd the same; per j72 CHAIN; mưu hại names per METHOD GROUP; every bad lập công way; how texts) · C old save (no rep / dh) loads, syncs, panel opens ·
   D co-op: NPC rules only on the host seat, a friend entry (p.coop) gets no effect, her seat still earns · E UI: Danh hiệu panel lists the held titles in their
   groups with the two-tone plates, the reputation info card says «Mất khi», 0 page errors. Exit 1 on any failure. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={errs:[],fail:[],ok:[]};
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>R.errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function'&&typeof dhSync==='function');await sleep(2000);
 const fresh=o=>p.evaluate(o=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__forceOrigin=o||'tt';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render();
  try{kmReset()}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},o);
 await fresh('tt');await sleep(500);
 const out=await p.evaluate(()=>{const F=[],OK=[],ck=(c,m)=>{if(c)OK.push(m);else F.push(m)};const T2=window.TITLES2;
  if(!T2||typeof rpSync!=='function'){F.push('no jdh3 (TITLES2 / rpSync)');return {F,OK}}
  const C=DH_CAT,RB=BAL.dh.rp;const rp=Object.keys(T2.RP);const good=rp.filter(i=>T2.RP[i][1]==='t'),bad=rp.filter(i=>T2.RP[i][1]==='a');
  /* A1 catalogue */
  ck(good.length>=12&&bad.length>=12,`A1 ≥12 good + ≥12 bad (${good.length}/${bad.length})`);
  ck(rp.every(i=>RB.T[i]&&RB.T[i].g&&RB.T[i].l&&T2.fxW(RB.T[i].g[0],RB.T[i].g[1])&&T2.fxW(RB.T[i].l[0],RB.T[i].l[1])),'A1 every reputation title: BAL row, one gain + one loss with words');
  ck(rp.every(i=>RB.T[i].g[1]>0&&RB.T[i].l[1]<0||RB.T[i].l[0]==='danhLoss'),'A1 gain is a gain, loss is a loss');
  const names=Object.keys(C).map(k=>C[k].n);const dup=names.filter((n,i)=>names.indexOf(n)!==i);ck(!dup.length,'A1 names unique in DH_CAT '+dup.join(','));
  const nk=Object.keys(C).filter(k=>/^(rp|cp|ca|vn|mh|lc)_/.test(k));ck(nk.every(k=>C[k].n.trim().split(/\s+/).length<=4),'A1 ≤ 4 words');
  ck(nk.every(k=>BAL.dh.T[k]),'A1 every new key has its BAL.dh.T row');
  const words=nk.map(k=>C[k].n+' '+(C[k].rep?C[k].how()+' '+C[k].fx():C[k].how(1)+' '+C[k].how(3))).join(' ');ck(!/[0-9%]/.test(words),'A1 no digits / % in player words');
  ck(nk.every(k=>C[k].sh==='t'||C[k].sh==='a'),'A1 every new title has a tone (KIT §82.1)');
  /* A2 earn + lose (state) */
  const clr=p=>{p.dh={};p.rep={};p.sac=50;p.tai=50;p.duc=50;p.danh=50;p.sung=30;p.tamco=30;p.th=10;p.hh=10;p.bac=60;p.ghen=0;p.confined=0;p.out=0;p.schemes=0;rpSync(p,true)};
  const has=(p,i)=>!!(p.dh&&p.dh['rp_'+i]&&p.dh['rp_'+i].i>=0);
  clr(S);S.duc=90;S.danh=85;rpSync(S,true);ck(has(S,'hien'),'A2 hien earned');S.duc=60;rpSync(S,true);ck(!has(S,'hien'),'A2 hien lost when Đức falls');
  clr(S);for(const v of rivals)v.sung=Math.min(v.sung||0,50);S.sung=95;S.th=-30;rpSync(S,true);ck(has(S,'hoathuy'),'A2 hoathuy earned (Sủng top + Thái hậu cold)');
  S.th=40;rpSync(S,true);ck(!has(S,'hoathuy'),'A2 hoathuy lost when Thái hậu warms');
  /* A2 deeds through the real hooks */
  clr(S);const v=liveRivals(true).filter(x=>!x.queen)[0];clr(v);
  const co=caughtOdds;caughtOdds=()=>100;const r1=caught(S,v,true,'bỏ độc vào điểm tâm');caughtOdds=co;ck(!!r1,'A2 caught fired');rpSync(S,true);ck(has(S,'docphu'),'A2 docphu by a caught poison (caught hook)');
  S.year+=3;S.duc=60;rpSync(S,true);ck(!has(S,'docphu'),'A2 docphu lost after the quiet years + Đức back');
  clr(S);ACTX.a=v;window.__truthAuto=1;/* the charge sticks (jtruth: her defence lost) */const fd=framed(S,'bị vu dùng bùa ngải');window.__truthAuto=0;ACTX.a=null;rpSync(S,true);ck(has(S,'hamoan'),'A2 hamoan by framed');
  S.framedBy=key(v);fall(v,'bị tố giác, chứng cứ rành rành');rpSync(S,true);ck(!has(S,'hamoan'),'A2 hamoan lost when the framer is convicted');ck(!!(S.dh.mh_minh&&S.dh.mh_minh.i>=0),'B4 mh_minh (framed and cleared)');
  v.out=false;v.alive=true;
  clr(S);for(let i=0;i<3;i++)econPayWin(S,'rumor',v,0);rpSync(S,true);ck(has(S,'truongthiet'),'A2 truongthiet by three rumours (econPayWin)');
  S.year+=1;rpSync(S,true);ck(!has(S,'truongthiet'),'A2 truongthiet lost after silence');
  /* A3 NPC same rule + consort card line */
  clr(v);v.duc=90;v.danh=85;rpSync(v,true);ck(has(v,'hien'),'A3 NPC earns hien by the same rule');
  const ln=relLines(v).join(' ');ck(/Người đời gọi:.*Hiền lương thục đức/.test(ln),'A3 consort card line shows it');v.duc=40;rpSync(v,true);ck(!has(v,'hien'),'A3 NPC loses it by the same rule');
  /* A4 effects while held */
  clr(S);S.dh.rp_hoathuy={n:1,i:0,at:['']};let up=0,dn=0;for(let i=0;i<200;i++){up+=dhRepG(S,'sung',6);dn+=dhRepG(S,'th',8)}ck(up>150&&up<260&&dn<-300&&dn>-500,`A4 shares (sung ${up}, tren ${dn})`);
  clr(S);S.dh.rp_tham={n:1,i:0,at:['']};let dl=0;for(let i=0;i<200;i++)dl+=dhRepG(S,'danh',-4);ck(dl<-300&&dl>-500,'A4 heavier Danh loss '+dl);
  clr(S);clr(v);const o0=caughtOdds(v,S,false);S.dh.rp_docphu={n:1,i:0,at:['']};const o1=caughtOdds(v,S,false);ck(o1>o0||o0>=95,`A4 muu: schemes at her caught more (${o0}→${o1})`);
  delete S.dh.rp_docphu;S.dh.rp_thatduc={n:1,i:0,at:['']};const o2=caughtOdds(S,v,false),o3=(delete S.dh.rp_thatduc,caughtOdds(S,v,false));ck(o2<o3||o3<=5,`A4 kin: her schemes caught less (${o3}→${o2})`);
  clr(S);S.dh.rp_phuctinh={n:1,i:0,at:['']};ck(dhRepB(S,'phuc')===RB.T.phuctinh.g[1]&&dhRepB(S,'don')===RB.T.phuctinh.l[1],'A4 additive kinds reach the jdh hooks');
  /* A5 never worn */
  clr(S);S.duc=90;S.danh=85;rpSync(S,true);S.titleWorn=null;dhWear(S,'rp_hien');ck(!S.titleWorn,'A5 a reputation title cannot be worn');
  /* B1 road chapter (FIX r1 = E56r FAIL 1: EACH chapter its own good + bad name, once) */
  S.dh={};const A={a:'tt_co_5',__rp0:{lt:(geS()||{}).lt||0,d:S.duc}};try{end67(A,'win')}catch(e){F.push('end67 threw '+e.message)}ck(S.dh.cp_tt_co_5_t&&S.dh.cp_tt_co_5_t.i>=0,'B1 chapter tt_co.5 closed straight → its own good title');
  const A2={a:'tt_co_6',__rp0:{lt:(geS()||{}).lt||0,d:S.duc+20}};try{end67(A2,Object.keys(ARC67.tt_co_6.E)[0])}catch(e){F.push('end67 threw '+e.message)}ck(S.dh.cp_tt_co_6_a&&S.dh.cp_tt_co_6_a.i>=0,'B1 chapter tt_co.6 closed with Đức fallen → its own bad title');
  try{end67({a:'tt_co_7',__rp0:{lt:(geS()||{}).lt||0,d:S.duc}},'win')}catch(e){}
  const n5=C.cp_tt_co_5_t&&C.cp_tt_co_5_t.n,n7=C.cp_tt_co_7_t&&C.cp_tt_co_7_t.n;ck(S.dh.cp_tt_co_7_t&&n5&&n7&&n5!==n7,`F1 two chapters of one road → two different names («${n5}» / «${n7}»)`);
  ck(BAL.dh.cp.ch&&BAL.dh.cp.ch.n.length===1&&BAL.dh.T.cp_tt_co_5_t&&BAL.dh.T.cp_tt_co_5_t.n.length===1,'F1 a chapter title is given once (BAL.dh.cp.ch n:[1])');
  try{end67({a:'tt_co',__rp0:{lt:(geS()||{}).lt||0,d:S.duc}},Object.keys(ARC67.tt_co.E)[0])}catch(e){F.push('end67 premise threw '+e.message)}ck(Object.keys(S.dh).some(k=>/^cp_tt_co_4_[ta]$/.test(k)),'F1 the road premise (.4) gives its own title');
  {const roads={};for(const k in ARC67){const d=ARC67[k];if(d.o==='rd')(roads[d.road]=roads[d.road]||[]).push(k)}const bad=[];let n=0;
   for(const r in roads){for(const k of roads[r].concat([r])){const K=cpKeyOf(k);n++;if(!K||!C[K[0]+'_t']||!C[K[0]+'_a']||C[K[0]+'_t'].n===C[K[0]+'_a'].n)bad.push(k)}}
   const nm=Object.keys(C).filter(k=>/^cp_.+_\d+_[ta]$/.test(k)).map(k=>C[k].n);ck(!bad.length&&n>=380&&new Set(nm).size===nm.length,`F1 every rdDef chapter + premise (${n}) has its own distinct good + bad pair ${bad.slice(0,5).join(',')}`)}
  ck(!!C.cp_tt_co_5_t&&!!C.cp_tt_co_4_a&&!/chương đường|lần chương/.test(C.cp_tt_co_5_t.how(1)+C.cp_tt_co_4_a.how(1))&&/^Khép lại chương «Môn sinh của cha» trên đường «/.test(C.cp_tt_co_5_t.how(1)),'F5 chapter how text: «Khép lại chương «…» trên đường «…»»');
  const o=dhObj(S,'cp_tt_co_6_a');ck(o&&o.sh==='a'&&/kdh-shA/.test(kitTitlePlate(o)),'B1 bad title draws the ác tone plate');
  clr(v);v.dh={};try{nrEnd(ARC67.tt_oan_5,1,undefined,v)}catch(e){F.push('nrEnd threw '+e.message)}ck(v.dh.cp_tt_oan_5_t&&v.dh.cp_tt_oan_5_t.i>=0,'B1 NPC road chapter (nrEnd) → the same per-chapter title');
  try{nrEnd(ARC67.tt_oan,-1,undefined,v)}catch(e){F.push('nrEnd premise threw '+e.message)}ck(v.dh.cp_tt_oan_4_a&&v.dh.cp_tt_oan_4_a.i>=0,'F1 NPC road premise (nrEnd .4, lost) → its own bad title');
  /* B2 side arc */
  S.dh={};try{end67({a:'s_hoa',__rp0:{lt:(geS()||{}).lt||0,d:S.duc}},Object.keys(ARC67.s_hoa.E)[0])}catch(e){F.push('end67 s_hoa threw '+e.message)}ck(Object.keys(S.dh).some(k=>/^ca_s_hoa_[ta]$/.test(k)),'B2 side arc title');
  /* B3 j72 */
  S.dh={};const q=q72();const x1={tid:'rv_con_om',id:999001};q.a.push(x1);try{q72End(x1,'ok')}catch(e){}ck(S.dh.vn_rv_con_om_t&&S.dh.vn_rv_con_om_t.i>=0,'B3 việc nhờ ok → good (per chain)');
  const x2={tid:'rv_con_om',id:999002};q.a.push(x2);try{q72End(x2,'fail')}catch(e){}ck(S.dh.vn_rv_con_om_a&&S.dh.vn_rv_con_om_a.i>=0,'B3 việc nhờ fail → bad (per chain)');
  const x3={tid:'canh_thai',id:999003};q.a.push(x3);try{q72End(x3,'ok')}catch(e){}ck(S.dh.vn_canh_thai_t&&C.vn_canh_thai_t.n!==C.vn_rv_con_om_t.n,'F2 two chains of one kind (pro) → two different titles');
  ck(Object.keys(T72I).every(k=>C[`vn_${k}_t`]&&C[`vn_${k}_a`]&&BAL.dh.T[`vn_${k}_t`].n.length===1),`F2 every T7 chain (${Object.keys(T72I).length}) has its own pair, once`);
  /* F6 (E62, E61r FAIL r2): every COMPOSED việc nhờ seed (j72c "c:<id>", J72SEEDS) has its own good + bad pair from its seed field dh, given once by q72End */
  {const L=(typeof J72SEEDS!=='undefined'&&Array.isArray(J72SEEDS))?J72SEEDS:[];const bad=L.filter(sd=>{const t='c:'+sd.id;return !T72I[t]||!C[`vn_${t}_t`]||!C[`vn_${t}_a`]||C[`vn_${t}_t`].n===C[`vn_${t}_a`].n||sd.dh.split('/')[0].trim()!==C[`vn_${t}_t`].n});
   ck(L.length>=256&&!bad.length,`F6 every composed seed (${L.length}) has its own pair from its dh field ${bad.slice(0,5).map(s=>s.id).join(',')}`);
   const t='c:'+(L[0]&&L[0].id);S.dh={};const y1={tid:t,id:999101};q.a.push(y1);try{q72End(y1,'ok')}catch(e){F.push('q72End c: threw '+e.message)}
   const y2={tid:t,id:999102};q.a.push(y2);try{q72End(y2,'bad')}catch(e){}
   ck(S.dh[`vn_${t}_t`]&&S.dh[`vn_${t}_t`].i>=0&&S.dh[`vn_${t}_a`]&&S.dh[`vn_${t}_a`].i>=0,'F6 a composed chain: ok → its good title, bad (bại lộ) → its bad title');
   const h=C[`vn_${t}_t`]?C[`vn_${t}_t`].how(1):'';ck(h&&!/[{}]/.test(h)&&/^Việc nhờ «/.test(h),`F6 composed chain how text names the seed, no placeholder («${h}»)`)}
  /* CT (ORDER MAIN 117, OD 24/11 ~07:45Z): read-only chapterTitle(S) → «Chương N — <name>» = the goal line's chapter (milestone / ARC67 road chapter); "" with no story */
  {const st=S.st,k0={ms:st&&st.ms,M:st&&st.M},g=(st&&st.ms&&MS67[st.ms.id])?`Chương ${st.ch.n} — ${MS67[st.ms.id].t()}`:null;const c1=typeof chapterTitle==='function'?chapterTitle(S):'';
   ck(typeof chapterTitle==='function'&&(!g||c1===g)&&/^Chương \d+ — \S/.test(c1),`CT milestone chapter («${c1}»)`);
   st.ms=null;st.M={a:'tt_co_5',chap:3,act:{}};const c2=chapterTitle(S);ck(c2===`Chương 3 — ${String(ARC67.tt_co_5.t).trim()}`&&!/[{}<]/.test(c2),`CT road chapter (rdDef tt_co_5, «${c2}»)`);
   st.M=null;ck(chapterTitle(S)===''&&chapterTitle({})==='','CT no open chapter → ""');Object.assign(st,{ms:k0.ms,M:k0.M})}
  /* B4 j70 */
  S.dh={};v.dh={};abandon70({a:v.id,t:'me',m:'poison',id:'t1',kt:[]},'exposed');ck(S.dh.mh_vach&&S.dh.mh_vach.i>=0,'B4 exposer → Vạch rõ gian tay');ck(v.dh.mh_doc_lo&&v.dh.mh_doc_lo.i>=0,'B4 exposed schemer → Bàn tay lộ dấu');
  v.dh={};abandon70({a:v.id,t:'me',m:'rumor',id:'t2',kt:[]},'exposed');ck(v.dh.mh_don_lo&&!/độc/.test(C.mh_don_lo.n),'F3 exposed rumour → a rumour name, never a poison word');
  {const G=T2.MG70||{},bad=[];for(const m in M70){const g=G[m];if(!g){bad.push(m+':none');continue}for(const r of ['thoat','lo','nap']){const k=`mh_${g}_${r}`;if(!C[k]||(g!=='doc'&&/độc/.test(C[k].n+C[k].how(1))))bad.push(m+':'+k)}}
   ck(!bad.length,`F3 every M70 method (${Object.keys(M70).length}) → its group names; «độc» only in the poison group ${bad.join(',')}`)}
  S.dh={};try{frameExpose(v,S,'')}catch(e){}ck(S.dh.mh_vu_thoat&&!/độc/.test(C.mh_vu_thoat.n),'F3 a frame broken at once → «'+(C.mh_vu_thoat||{}).n+'» (group vu)');
  S.dh={};duc70(S,2,'báo tin cứu người');ck(S.dh.mh_bao&&S.dh.mh_bao.i>=0,'B4 warning → Báo tin cứu người');
  /* B5 j71 */
  S.dh={};bonusDo7({},'cứu giá');ck(S.dh.lc_cuuhoang&&S.dh.lc_cuuhoang.i>=0,'B5 merit → Công cứu giá');cpMerit7('hoagiai');ck(S.dh.lc_hoagiai&&S.dh.lc_hoagiai.i>=0,'B5 hoagiai mark');
  j7s().brb=S.turn;T2.cpMisc(S);ck(S.dh.lc_brb&&S.dh.lc_brb.i>=0,'B5 hush money → bad');
  ck(Object.keys(MF7).every(k=>DH_CAT['lc_'+k]),'B5 every MF7 family has its title');
  S.dh={};for(const k of ['cuuhoang','chepkinh','hoagiai','hoahoan','dichbenh'])cpMerit7(k+'_a');ck(['cuuhoang','chepkinh','hoagiai','hoahoan','dichbenh'].every(k=>S.dh[`lc_${k}_a`]&&C[`lc_${k}_a`].sh==='a'),'F4 every bad lập công way → its bad title');
  const hw=['cp_tt_co_t','vn_inv_t','mh_vach','mh_doc_thoat','lc_cuute','lc_brb','lc_chepkinh_a'].map(k=>C[k]?C[k].how(3):'MISSING '+k).join(' | ');ck(!/MISSING|\(mưu hại\)|lần chương|chương đường|«[^»]*» một lần|Lập công «/.test(hw)&&!!C.lc_cuute&&/ba lần$/.test(C.lc_cuute.how(3)),'F5 counted how texts read naturally: '+hw.slice(0,160));
  /* C old save */
  try{const j=JSON.parse(JSON.stringify(S));delete j.rep;delete j.dh;S=j;rpSync(S,true);dhSync(S,true);dhPanel();ck(true,'C old save (no rep / dh) syncs and the panel opens')}catch(e){F.push('C old save threw '+e.message)}
  try{const m=document.getElementById('modal');if(m)m.hidden=true;Q.length=0}catch(e){}
  /* C2 a save from before FIX r1 (the per-road / per-kind / any-method keys) keeps its titles and the panel opens with them */
  try{const a=[''];S.dh=Object.assign(S.dh||{},{cp_tt_co_t:{n:4,i:1,at:a},vn_pro_a:{n:1,i:0,at:a},mh_lo:{n:1,i:0,at:a}});dhSync(S,true);dhPanel();const m=document.querySelector('#modal:not([hidden])');const tx=m?m.textContent:'';
   ck(/Con cờ giữ nước/.test(tx)&&/Bỏ mặc người cầu/.test(tx)&&/Bàn tay lộ dấu/.test(tx)&&!!C.cp_tt_co_t.old&&!/[0-9]/.test(C.cp_tt_co_t.how(4)),'C2 old-save titles (per road / per kind / any method) still listed, never given now');m&&(m.hidden=true);Q.length=0;
   ['cp_tt_co_t','vn_pro_a','mh_lo'].forEach(k=>delete S.dh[k])}catch(e){F.push('C2 threw '+e.message)}
  /* D co-op */
  const cw=window.COOPW;window.COOPW={on:true,seat:'b'};clr(S);const w=liveRivals(true).filter(x=>!x.queen)[1];w.dh={};w.rep={};w.duc=90;w.danh=85;rpSync(w,true);ck(!has(w,'hien'),'D guest seat: NPC rules do not run');
  S.duc=90;S.danh=85;rpSync(S,true);ck(has(S,'hien'),'D her own seat earns hers');window.COOPW=cw;
  const fe={coop:1,dh:{rp_hoathuy:{n:1,i:0}},sung:50};ck(dhRepG(fe,'sung',10)===0&&dhRepB(fe,'phuc')===0,'D a friend entry (p.coop) gets no effect');
  return {F,OK}});
 R.fail.push(...out.F);R.ok.push(...out.OK);
 /* F4 (static, j71.js): every bad way of a lập công family carries its mark cpm7("<fam>_a") (or the hush-money brb); pure declines stay title-free */
 {const src=fs.readFileSync(__dirname+'/../build/j71.js','utf8');const need={cuuhoang:/CH7\("Hoảng sợ đứng nhìn"[^\n]*cpm7\("cuuhoang_a"\)/,chepkinh:/CH7\("Nhờ cung nữ chép thay"[^\n]*cpm7\("chepkinh_a"\)/,
  hoagiai:/CH7\(`Bênh \$\{A\.n\}`[^\n]*cpm7\("hoagiai_a"\)[\s\S]{0,40}CH7\(`Bênh \$\{B\.n\}`[^\n]*cpm7\("hoagiai_a"\)/,hoahoan:/CH7\("Đóng cửa cung giữ mình"[^\n]*cpm7\("hoahoan_a"\)/,dichbenh:/CH7\("Đóng cửa cung tránh dịch"[^\n]*cpm7\("dichbenh_a"\)/};
  const miss=Object.keys(need).filter(k=>!need[k].test(src));if(miss.length)R.fail.push('F4 j71 bad-way options without their mark: '+miss.join(','));else R.ok.push('F4 j71: every bad-way option marked (cpm7 <fam>_a)')}
 /* E UI */
 const ui=await p.evaluate(()=>{const F=[];try{S.dh=S.dh||{};S.dh.rp_hoathuy={n:1,i:0,at:['']};S.dh.rp_hien={n:1,i:0,at:['']};S.dh.cp_tt_co_5_t=S.dh.cp_tt_co_5_t||{n:1,i:0,at:['']};dhPanel()}catch(e){F.push('dhPanel threw '+e.message)}
  const m=document.querySelector('#modal:not([hidden])');const t=m?m.textContent:'';if(!/Danh tiếng/.test(t))F.push('panel: no «Danh tiếng» group');if(!/Chính truyện/.test(t))F.push('panel: no «Chính truyện» group');
  if(!m||!m.querySelector('.kdh.kdh-shA')||!m.querySelector('.kdh.kdh-shT'))F.push('panel: two-tone plates missing');
  if(/Đeo «Hồng nhan họa thủy»/.test(t))F.push('panel offers to wear a reputation title');return F});
 R.fail.push(...ui);if(OUT)await p.screenshot({path:`${OUT}/titles2-panel.jpg`,type:'jpeg',quality:70});
 const card=await p.evaluate(()=>{document.getElementById('modal').hidden=true;Q.length=0;kitTitleOpen('dh-rp_hoathuy@me');return new Promise(r=>setTimeout(()=>{const m=document.querySelector('#modal:not([hidden])');r(m?m.textContent:'')},400))});
 if(!/Mất khi/.test(card)||/Khi đeo/.test(card))R.fail.push('reputation info card wording: '+card.slice(0,120));else R.ok.push('E info card');
 if(R.errs.length)R.fail.push('page errors: '+R.errs.slice(0,3).join(' | '));
 console.log(R.ok.map(x=>'ok   '+x).join('\n'));console.log(R.fail.map(x=>'FAIL '+x).join('\n'));
 console.log(`TITLES2-UNIT ${R.fail.length?'FAIL':'PASS'} · ok ${R.ok.length} · fail ${R.fail.length}`);await b.close();process.exit(R.fail.length?1:0)})();
