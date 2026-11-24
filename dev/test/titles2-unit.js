/* review/titles2 (owner OD 23/11 ~22:45Z + ~22:55Z; brief E55): TITLES2 unit — jdh3.js over jdh + KIT §82 / §82.1.
   usage: node dev/test/titles2-unit.js <page URL> [outdir]
   Cases (each FAILS on LIVE main, which has no jdh3): A1 catalogue (≥12 good + ≥12 bad reputation titles, each a BAL row with ONE gain + ONE loss, names unique in
   DH_CAT, ≤ 4 words, no digit / % in player words) · A2 earn + lose by the rule (state rules and deed rules through the real two-way hooks: caught, punish,
   framed + the framer convicted, econPayWin rumor / accuse, kidDie) · A3 NPC: the SAME rule gives / takes it, the consort card line shows it · A4 effects while
   held (share of a gain more / less, heavier Danh loss, caughtOdds muu / kin, additive dhB) · A5 never worn · B1 road chapter good + bad (end67, lean), NPC road
   (nrEnd) · B2 side arc · B3 j72 việc nhờ ok / fail · B4 j70 mưu hại roles · B5 j71 lập công + hush money · C old save (no rep / dh) loads, syncs, panel opens ·
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
  /* B1 road chapter */
  S.dh={};const A={a:'tt_co_5',__rp0:{lt:(geS()||{}).lt||0,d:S.duc}};try{end67(A,'win')}catch(e){F.push('end67 threw '+e.message)}ck(S.dh.cp_tt_co_t&&S.dh.cp_tt_co_t.i>=0,'B1 road chapter closed straight → good road title');
  const A2={a:'tt_co_6',__rp0:{lt:(geS()||{}).lt||0,d:S.duc+20}};try{end67(A2,Object.keys(ARC67.tt_co_6.E)[0])}catch(e){F.push('end67 threw '+e.message)}ck(S.dh.cp_tt_co_a&&S.dh.cp_tt_co_a.i>=0,'B1 chapter closed with Đức lost → bad road title');
  for(let n=7;n<=9;n++){try{end67({a:'tt_co_'+n,__rp0:{lt:(geS()||{}).lt||0,d:S.duc}},'win')}catch(e){}}ck(dhObj(S,'cp_tt_co_t').tier>BAL.dh.cp.road.b,'B1 more chapters → same name, higher tier');
  const o=dhObj(S,'cp_tt_co_a');ck(o&&o.sh==='a'&&/kdh-shA/.test(kitTitlePlate(o)),'B1 bad title draws the ác tone plate');
  clr(v);v.dh={};try{nrEnd(ARC67.tt_oan_5,1,undefined,v)}catch(e){F.push('nrEnd threw '+e.message)}ck(v.dh.cp_tt_oan_t&&v.dh.cp_tt_oan_t.i>=0,'B1 NPC road chapter (nrEnd) → her road title');
  /* B2 side arc */
  S.dh={};try{end67({a:'s_hoa',__rp0:{lt:(geS()||{}).lt||0,d:S.duc}},Object.keys(ARC67.s_hoa.E)[0])}catch(e){F.push('end67 s_hoa threw '+e.message)}ck(Object.keys(S.dh).some(k=>/^ca_s_hoa_[ta]$/.test(k)),'B2 side arc title');
  /* B3 j72 */
  S.dh={};const q=q72();const x1={tid:'rv_con_om',id:999001};q.a.push(x1);try{q72End(x1,'ok')}catch(e){}ck(S.dh.vn_pro_t&&S.dh.vn_pro_t.i>=0,'B3 việc nhờ ok → good');
  const x2={tid:'rv_con_om',id:999002};q.a.push(x2);try{q72End(x2,'fail')}catch(e){}ck(S.dh.vn_pro_a&&S.dh.vn_pro_a.i>=0,'B3 việc nhờ fail → bad');
  /* B4 j70 */
  S.dh={};v.dh={};abandon70({a:v.id,t:'me',m:'poison',id:'t1',kt:[]},'exposed');ck(S.dh.mh_vach&&S.dh.mh_vach.i>=0,'B4 exposer → Vạch rõ gian tay');ck(v.dh.mh_lo&&v.dh.mh_lo.i>=0,'B4 exposed schemer → Bàn tay lộ dấu');
  S.dh={};duc70(S,2,'báo tin cứu người');ck(S.dh.mh_bao&&S.dh.mh_bao.i>=0,'B4 warning → Báo tin cứu người');
  /* B5 j71 */
  S.dh={};bonusDo7({},'cứu giá');ck(S.dh.lc_cuuhoang&&S.dh.lc_cuuhoang.i>=0,'B5 merit → Công cứu giá');cpMerit7('hoagiai');ck(S.dh.lc_hoagiai&&S.dh.lc_hoagiai.i>=0,'B5 hoagiai mark');
  j7s().brb=S.turn;T2.cpMisc(S);ck(S.dh.lc_brb&&S.dh.lc_brb.i>=0,'B5 hush money → bad');
  ck(Object.keys(MF7).every(k=>DH_CAT['lc_'+k]),'B5 every MF7 family has its title');
  /* C old save */
  try{const j=JSON.parse(JSON.stringify(S));delete j.rep;delete j.dh;S=j;rpSync(S,true);dhSync(S,true);dhPanel();ck(true,'C old save (no rep / dh) syncs and the panel opens')}catch(e){F.push('C old save threw '+e.message)}
  try{const m=document.getElementById('modal');if(m)m.hidden=true;Q.length=0}catch(e){}
  /* D co-op */
  const cw=window.COOPW;window.COOPW={on:true,seat:'b'};clr(S);const w=liveRivals(true).filter(x=>!x.queen)[1];w.dh={};w.rep={};w.duc=90;w.danh=85;rpSync(w,true);ck(!has(w,'hien'),'D guest seat: NPC rules do not run');
  S.duc=90;S.danh=85;rpSync(S,true);ck(has(S,'hien'),'D her own seat earns hers');window.COOPW=cw;
  const fe={coop:1,dh:{rp_hoathuy:{n:1,i:0}},sung:50};ck(dhRepG(fe,'sung',10)===0&&dhRepB(fe,'phuc')===0,'D a friend entry (p.coop) gets no effect');
  return {F,OK}});
 R.fail.push(...out.F);R.ok.push(...out.OK);
 /* E UI */
 const ui=await p.evaluate(()=>{const F=[];try{S.dh=S.dh||{};S.dh.rp_hoathuy={n:1,i:0,at:['']};S.dh.rp_hien={n:1,i:0,at:['']};S.dh.cp_tt_co_t=S.dh.cp_tt_co_t||{n:1,i:0,at:['']};dhPanel()}catch(e){F.push('dhPanel threw '+e.message)}
  const m=document.querySelector('#modal:not([hidden])');const t=m?m.textContent:'';if(!/Danh tiếng/.test(t))F.push('panel: no «Danh tiếng» group');if(!/Chính truyện/.test(t))F.push('panel: no «Chính truyện» group');
  if(!m||!m.querySelector('.kdh.kdh-shA')||!m.querySelector('.kdh.kdh-shT'))F.push('panel: two-tone plates missing');
  if(/Đeo «Hồng nhan họa thủy»/.test(t))F.push('panel offers to wear a reputation title');return F});
 R.fail.push(...ui);if(OUT)await p.screenshot({path:`${OUT}/titles2-panel.jpg`,type:'jpeg',quality:70});
 const card=await p.evaluate(()=>{document.getElementById('modal').hidden=true;Q.length=0;kitTitleOpen('dh-rp_hoathuy@me');return new Promise(r=>setTimeout(()=>{const m=document.querySelector('#modal:not([hidden])');r(m?m.textContent:'')},400))});
 if(!/Mất khi/.test(card)||/Khi đeo/.test(card))R.fail.push('reputation info card wording: '+card.slice(0,120));else R.ok.push('E info card');
 if(R.errs.length)R.fail.push('page errors: '+R.errs.slice(0,3).join(' | '));
 console.log(R.ok.map(x=>'ok   '+x).join('\n'));console.log(R.fail.map(x=>'FAIL '+x).join('\n'));
 console.log(`TITLES2-UNIT ${R.fail.length?'FAIL':'PASS'} · ok ${R.ok.length} · fail ${R.fail.length}`);await b.close();process.exit(R.fail.length?1:0)})();
