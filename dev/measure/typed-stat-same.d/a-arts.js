function gAx(R,T,J){/* typed-stat-bal GROUP A (j85 / j23 / j83): rule numbers read from the live game objects + the texts as shown; runs on LIVE and the new build alike */
 const ev=(0,eval),E=(n,f)=>{try{return f()}catch(e){return 'ERR '+String(e).slice(0,80)}};
 const S0=ev('typeof S==="undefined"?undefined:S');const keep={};for(const n of ['kitModal','kgDefer','roll']){keep[n]=ev(n);window['__tsaKeep_'+n]=keep[n]}window.__tsaS0=S0;
 const MR=Math.random;let sd=12345;Math.random=()=>{sd=(sd+0x6D2B79F5)|0;let t=Math.imul(sd^sd>>>15,1|sd);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};/* seeded: both builds play the same game */
 try{
 /* static tables, as read */
 T['A.ARTFX']=J(ARTFX);T['A.VIRFX']=J(VIRFX);T['A.ARTS.u']=J(ARTS.map(a=>a.u));T['A.WILL']=J(WILL);T['A.IT.botngua']=IT.botngua&&IT.botngua.d;
 R['A.VIRB']=J(VIRB);R['A.ARTB85']=J(ARTB85);
 R['A.duc']=J([0,10,20,30,40,50,60,70,80,90,100].map(d=>{const p={duc:d};return[ducOdds(p),ducShield(p),ducDanger(p),ducBetray(p)]}));
 R['A.dungSac']=J([0,1,2,3,4,5].map(l=>E('',()=>virtueBonus({vir:{dung:l},virp:{dung:0},arts:{},artp:{}},"dung").sac)));
 /* a fresh game: her level-ups (j2 + j23 + j85 addArt), an NPC's (j85 addArtP), the Tứ đức (j85 addVir) */
 ev('start()');try{ev('quiet=1')}catch(e){}const Q0=Q.splice(0);/* the opening cards wait: every act below needs an empty queue */
 const st=()=>({tamco:S.tamco,th:S.th,hh:S.hh,sac:S.sac,tai:S.tai,danh:S.danh,duc:S.duc,suc:S.suc,bac:S.bac,an:S.an});
 const dif=(a,b)=>{const o={};for(const k in a)if(a[k]!==b[k])o[k]=b[k]-a[k];return o};
 const big=p=>{if(p===S){S.dead=false;S.out=false}p.tamco=10;p.th=0;p.hh=0;p.sac=20;p.tai=20;p.danh=10;p.duc=40;p.suc=60;p.bac=500;p.an=10};
 const her={};for(const a of ARTS){big(S);S.arts[a.k]=0;S.artp[a.k]=0;const b=st();E('',()=>addArt(a.k,500));her[a.k]=[S.arts[a.k],dif(b,st())]}R['A.addArt']=J(her);
 const v=(typeof rivals!=="undefined"?rivals:[]).find(x=>x&&x.alive&&!x.out);if(v){vNorm(v);const npc={};const sv=p=>({tamco:p.tamco,th:p.th,sac:p.sac,tai:p.tai,danh:p.danh});
  for(const a of ARTS){big(v);v.arts[a.k]=0;v.artp[a.k]=0;const b=sv(v);E('',()=>addArtP(v,a.k,500));npc[a.k]=[v.arts[a.k],dif(b,sv(v))]}R['A.addArtP']=J(npc)}
 const vir={};for(const x of VIR){big(S);S.vir[x.k]=0;S.virp[x.k]=0;const b=st();E('',()=>addVir(S,x.k,500));const d=dif(b,st());delete d.hh;/* Hoàng hậu regard also moves by chance on a Đức deed (run to run on one build); VIRB.hanh.hh is in A.VIRB */vir[x.k]=[S.vir[x.k],d]}R['A.addVir']=J(vir);
 /* monthly: j23 artMonth (Cầm Sức) and j85 v85Month (her row only) */
 big(S);for(const a of ARTS)S.arts[a.k]=0;S.arts.cam=1;{const b=st();E('',()=>artMonth());R['A.artMonth']=J(dif(b,st()))}
 const mon={};for(const [nm,L,d,h] of [["lo",{theu:3,nau:3,thi:2,hoa:2},70,3],["hi",{theu:5,nau:5,thi:5,hoa:5},90,0],["bad",{nau:2,hoa:4},10,0]]){
  for(const a of ARTS)S.arts[a.k]=0;Object.assign(S.arts,L);for(const x of VIR)S.vir[x.k]=0;S.vir.hanh=h;big(S);S.duc=d;S.suc=40;S.th=0;S.hh=0;S.turn=Math.ceil((S.turn||1)/3)*3;
  const ms=(S.maid&&S.maid.loyal!=null)?S.maid.loyal=50:null;const b=st();E('',()=>v85Month());mon[nm]=[dif(b,st()),S.maid&&ms!=null?S.maid.loyal-50:null]}R['A.v85Month']=J(mon);
 /* j23 art lesson cost (lessonMode → kgDefer charge), the j83 bậc-5 practice charge */
 const les={};ev('kgDefer=function(c){window.__tsaC=c}');S.mg=null;S.thDead=0;S.buoi=0;big(S);S.th=60;
 for(const m of ["self","th"]){window.__tsaC=null;S.arts.thi=1;E('',()=>{ev('wkPend={kind:"tho",mat:0}');lessonMode("thi",m)});les[m]=J(window.__tsaC);ev('wkPend=null');S.mg=null}
 R['A.lessonMode']=J(les);
 /* đồ cấm caught (j83 illBuy): Danh / Đức */
 ev('roll=function(){return false}');const ib={};for(const r of ["thaiy","cho"]){big(S);const b=st();E('',()=>illBuy(S,r,"hacdinh",null,1));ib[r]=dif(b,st())}R['A.illBuy']=J(ib);ev('roll=window.__tsaKeep_roll');
 /* texts: the Tài nghệ tab, rule cards, Đức panel, danger card, j83 works / đồ cấm */
 for(const n of ['kitModal'])ev(n+'=function(o){window.__tsaK=o}');
 big(S);S.duc=55;S.arts.nau=5;S.arts.y=2;S.vir.hanh=2;
 T['A.artTab']=E('',()=>artTabHTML());T['A.wkTab']=E('',()=>wkTabHTML());T['A.illFail']=E('',()=>IROUTE.thaiy.fail(S)+' | '+IROUTE.cho.fail(S));
 for(const k of ["duc"].concat(VIR.map(x=>x.k),ARTS.map(a=>a.k))){window.__tsaK=null;E('',()=>v85Table(k));T['A.v85Table.'+k]=JSON.parse(JSON.stringify(J(window.__tsaK)).replace(/Sủng(\s|\u00a0)[+-]\d+/g,'Sủng ±n'))}/* the deck Sủng (LIVE token, scaled by this game's Emperor) varies run to run */
 T['A.band']=E('',()=>bandCard());
 for(const r of ["thaiy","cho"]){const n=Q.length;E('',()=>illAsk(r));T['A.illAsk.'+r]=J(Q.slice(n).map(q=>(q.opts||[]).map(o=>o.x)));Q.splice(n)}
 {const e={k:"wk",wk:{kind:"mon",n:"Canh",ti:2,bn:"ngươi",q:60,mat:0}};S.inv.push(e,{k:"hacdinh"});T['A.wkgive']=E('',()=>((PEND.wkgive({ix:S.inv.indexOf(e)})||{}).o||[]).map(o=>o.kgift||o.x||'').filter(x=>/Hạc đỉnh/.test(x)))/* the j83 poison line (jgift owns this card now) */}
 Q.splice(0);Q.push(...Q0);S.inv.push({k:"wk",wk:{kind:"mon",n:"Canh",ti:2,bn:"ngươi",q:60,mat:0}});T['A.wkCards']=E('',()=>wkCardsHTML());
 }finally{Math.random=MR;for(const n in keep)ev(n+'=window.__tsaKeep_'+n);try{ev('S=window.__tsaS0')}catch(e){}}
}
