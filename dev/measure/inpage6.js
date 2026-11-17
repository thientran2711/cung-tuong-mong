(function(){
try{if(window.__balO)Object.assign(BAL,window.__balO)}catch(e){}
try{if(window.__j70O)Object.assign(J70CFG,window.__j70O)}catch(e){}
try{if(window.__fairO)Object.assign(window.FAIRN,window.__fairO)}catch(e){}
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
window.__res=[];window.__lifeB=0;{const nb0=nextBuoi;nextBuoi=function(){window.__lifeB++;return nb0.apply(this,arguments)}}window.__logc={};window.__bad=[];window.__saveFail=[];window.__idle=0;window.__buoi=0;const ORIG=['tt','dtq','muoi','cn','nc','td','ch','thd'];const _start=start;start=function(){window.__oi=(window.__oi||0)+1;window.__forceOrigin=window.__origO||ORIG[window.__oi%8];return _start()};window.__iter=0;window.__lifeIter=0;window.__maxRank=0;window.__hhTurn=null;window.__turnActs=0;window.__sucTrace=[];window.__lastT="";window.__acts={};
popNum=()=>{};curtain=()=>{};fx=()=>{};save=()=>{};
renderHUD=()=>{};renderStage=()=>{};renderPanel=()=>{};
render=function(){if(!S)return;if(Q.length&&$("modal").hidden)showModal()};
const strip=x=>String(x).replace(/<[^>]+>/g,'');
const _over=over;
over=function(h,t,fate){try{(S.logs||[]).forEach(x=>{const k=strip(x).replace(/\d+/g,'#').split(/[.:;]/)[0].split(' ').slice(-6).join(' ');window.__logc[k]=(window.__logc[k]||0)+1});window.__res.push({ex:JSON.parse(JSON.stringify(window.__exN||{})),pl:S.persLog||{},fired:S.firedN||0,nr:liveRivals(true).length,un:S.stat?S.stat.un:0,ac:S.stat?S.stat.act:0,step:S.st.step,sdone:S.st.done,stag:S.st.tag,origin:S.origin.k,rank:S.rank,maxRank:Math.max(window.__maxRank,S.rank),turns:S.turn,years:+(S.turn/12).toFixed(2),age:S.age,title:h,fate:strip(fate),text:strip(t).slice(0,200),sung:S.sung,danh:S.danh,duc:S.duc,bac:S.bac,suc:S.suc,kids:S.kids.length,sons:S.kids.filter(k=>k.sex==="m").length,iters:window.__lifeIter,hhTurn:window.__hhTurn,hhWk:window.__hhWk,hhB:window.__hhB,wk:S.turn*3+S.tuan,lb:window.__lifeB,trysts:(S.men||[]).reduce((a,m)=>a+(m.trysts||0),0),logs:S.logs.slice(0,4).map(strip),sucTrace:window.__sucTrace.slice(-5),acts:window.__acts})}catch(e){window.__res.push({ex:JSON.parse(JSON.stringify(window.__exN||{})),err:String(e)})}
  window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__hhWk=null;window.__hhB=null;window.__lifeB=0;window.__sucTrace=[];window.__acts={};return _over(h,t,fate)};
const RNG=n=>Math.floor(Math.random()*n),rpick=a=>a[RNG(a.length)];
function note(k,d){window.__acts[k]=(window.__acts[k]||0)+1;(window.__ring=window.__ring||[]).push(k+':'+(d||'')+'@'+S.place+'/'+used);if(window.__ring.length>8)window.__ring.shift()}
function rvBtns(i){const ck=S.turn+'_'+S.tuan+'_'+(S.buoi||0)+'_'+used+'_'+S.suc+'_'+S.bac+'_'+rivals.length+'_'+i+'_'+(rivals[i]&&rivals[i].id);window.__rvc=window.__rvc||{};if(window.__rvc.k!==S.turn+'_'+S.tuan)window.__rvc={k:S.turn+'_'+S.tuan};if(window.__rvc[ck])return window.__rvc[ck];return window.__rvc[ck]=rvBtns0(i)}
function rvBtns0(i){const v=rivals[i];const d=document.createElement('div');d.innerHTML=rvButtons(v,i);return [...d.querySelectorAll('button[data-r]')].filter(b=>!b.disabled).map(b=>b.dataset.a)}
function modalStep(sens){
  {const k=q('#kg82ok');const ovOn=q('#ov')&&!q('#ov').hidden;/* kit-close (KIT 32.10) hides the result's close-only button behind ✕: press it while the result shows */if(k&&(k.offsetParent!==null||(k.isConnected&&ovOn))){k.click();return true}const sk=q('#kg82skip');if(sk&&sk.offsetParent!==null){sk.click();return true}}
  if(!q('#ov').hidden){const ok=q('#mgok')||q('#kg92ok');if(ok){ok.click();return true}const sk=q('#mgskip');if(sk&&!sk.hidden){sk.click();return true}return true}
  if(Q.length){
    const m=Q[0];
    if(m.opts&&m.opts.length){
      const okIdx=m.opts.map((c,i)=>[c,i]).filter(([c])=>!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));
      if(!okIdx.length){closeModal();return true}
      let pickI;
      if(!sens)pickI=rpick(okIdx)[1];
      else{let best=-1e9;pickI=okIdx[0][1];okIdx.forEach(([o,i])=>{const f=o.fx||{};let v=(f.sung||0)*1.5+(f.danh||0)*1.2+(f.hh||0)*.4+(f.th||0)*.4+(f.maid||0)*.1+(f.suc||0)*.2+(f.tamco||0)*.3+(f.bac||0)*.04;
        if((f.duc||0)<0)v+=(f.duc||0)*6;else v+=(f.duc||0)*1.5;if(o.x&&/chứng cứ/.test(o.x))v+=2;if(o.x&&/nhân chứng|rửa oan|lật án|phong tước|giữ được/.test(o.x))v+=4;if(/tú nữ/.test(o.n))v-=.5;if(o.x&&/được phong/.test(o.x))v+=20;if(o.x&&/kết thúc kiếp này/.test(o.x))v-=20;if(o.x&&/Hoàng thượng để ý \+/.test(o.x))v+=3;if(o.x&&/bị giết|đánh chết|dìm|mất mạng/.test(o.x))v-=12;v+=(f.tin||0)*.15+(f.nt||0)*.5;/* diff-remeasure (16/11): a sensible player reads what the card shows: the side costs after "kèm:" / "hỏng:" count at half weight, and the risk label (OD:L477) */{const km=String(o.x||"").split(/kèm:|hỏng:/).slice(1).join(" ");const W={"Sủng":1.5,"Danh":1.2,"Đức":1.5};km.replace(/(Sủng|Danh|Đức) -(\d+)/g,(m,k,n)=>{v-=W[k]*(+n)*.5;return m});if(o.risk==="liều")v-=1;else if(o.risk==="có rủi ro")v-=.3}v+=Math.random()*.01;if(v>best){best=v;pickI=i}})}
      note("dilemma");chooseM(pickI);return true}
    /* diff-remeasure: kit pick dialogs (tuduc-sub "Học X: làm gì?" / "… dùng vật liệu gì?", KIT shop grid): a player taps the first item she can make */
    if(m.kit&&m.kit.pick&&!window.__noPick){try{showModal()}catch(e){}const b=[...document.querySelectorAll('#ov [data-kwrgo],[data-kwrgo]')].find(x=>!x.disabled&&x.offsetParent!==null);if(b){note("pick");b.click();return true}}
    try{if(window.__xModal&&window.__xModal(m))return true}catch(e){}/* danh-p1 intn.js: work picker (no opts) */
    closeModal();return true}
  return false}
function cardOK(a){return !a.done&&!S.dead&&canPay(a)&&!a.lock&&(typeof j76win==='function'?j76win(a,()=>can(cardCost(a))):can(cardCost(a)))&&!(a.b!=null&&(S.buoi||0)!==a.b)}
function placeOK(p){return p.k!=="home"&&S.place!==p.k&&!S.confined&&!S.out&&can(travel(S.place,p.k)+1)&&(typeof accessOf!=="function"||accessOf(S,p.k).ok)}
function talkCands(){const out=[];if(!S.visit||S.visit.talked===true)return out;const tk=S.visit.tk||{};
  curPeople().forEach((p,pi)=>{if(tk[pi])return;talkOpts(p).forEach((a,oi)=>{if(!canPay(a)||a.lock)return;const c=a.act?2:1;if(!can(c))return;out.push({p,pi,a,oi})})});return out}
function lessonCands(){return ARTS.filter(a=>S.arts[a.k]<5&&S.bac>=(typeof tchFee==="function"?tchFee(a.k):5+S.arts[a.k]*5)&&can(2)&&!S.mg)}
function fire(f){f()}
// ---- RANDOM
function randomStep(){
  const cand=[];
  deck.forEach((a,i)=>{if(cardOK(a))cand.push(()=>{note("card",a.n);act(i)})});
  if(!window.__hsOnly){/* danh-balance: Hành-sự-only random player */
  places().forEach(p=>{if(placeOK(p))cand.push(()=>{note("go");goTo(p.k)})});
  rivals.forEach((v,i)=>{if(v.alive&&!v.out&&can(2))rvBtns(i).forEach(k=>cand.push(()=>{note("scheme_"+k);doAct(i,k)}))});
  lessonCands().forEach(a=>cand.push(()=>{note("lesson");lesson(a.k)}));
  if(S.bac>=60&&!S.master)cand.push(()=>{note("master");hireMaster()});
  talkCands().forEach(t=>cand.push(()=>{note("talk",t.a.n);popIdx=t.pi;talk(t.oi)}));
  }
  if(!cand.length||window.__turnActs>=40){window.__buoi++;if(!cand.length&&used<=1)window.__idle++;window.__turnActs=0;nextBuoi();return}
  window.__turnActs++;{const tk=S.turn+'_'+S.tuan+'_'+(S.buoi||0)+'_'+used;if(window.__rtk!==tk){window.__rtk=tk;window.__rn=0}if(++window.__rn>30){window.__rn=0;window.__buoi++;nextBuoi();return}}rpick(cand)()}
// ---- SENSIBLE
function needs(){const nx=S.rank<7?RANKS[S.rank+1]:{s:70,d:70};return{ws:1+Math.max(0,nx.s-S.sung)/12,wd:1+Math.max(0,nx.d-S.danh)/8}}
const BAD=/Mật báo chuyện|Giả mang thai|Gửi mật thư|Theo cha mưu đại sự|Diệt khẩu|Trung với cố quốc|Khiêu khích|Trút giận|Cài đồ|giấu|xạ hương|độc|Đẩy con nàng xuống hồ|Đẩy nàng xuống hồ sen|Đẩy xuống hồ sen|Ngáng chân/i;
function valW(w,N){w=w||{};return (w.nt||0)*.6+(w.tin||0)*.25+(w.sung?sg(w.sung):0)*N.ws+(w.danh||0)*N.wd+(w.th||0)*.3+(w.hh||0)*.25+(w.duc||0)*(S.duc<45?1.2:.4)+(w.maid||0)*.1+(w.mat||0)*.8+(w.tamco||0)*.3+(w.tai||0)*.2+(w.sac||0)*.5+(w.bac||0)*(S.bac<60?.08:.03)+(w.suc||0)*(S.suc<50?.3:.05)}
function costW(c){c=c||{};return (c.suc||0)*(S.suc<50?.35:.08)+(c.bac||0)*(S.bac<60?.09:.035)+(c.duc?c.duc*3:0)+(c.sung||0)+(c.danh||0)}
function scoreAct(a,N,cost){
  if(BAD.test(a.n))return -1e9;
  if(S.suc+((a.c&&a.c.suc)||0)<20&&a.n!=="Nghỉ ngơi dưỡng sức")return -1e9;
  if(a.c&&a.c.duc<0&&S.duc<50)return -1e9;
  if(a.j67&&!window.__noStory)return 6; /* a sensible player opens the next Mệnh truyện beat when it is ready */
  const lb=(typeof lotB==="function"?lotB(S,a.dom):0);const o=a.o==null?1:cl((a.o==null?100:a.o)+lb,5,100)/100;
  let v=o*valW(a.w,N)+(1-o)*valW(a.l,N)-costW(a.c);
  if(a.x){if(/chứng cứ/.test(a.x))v+=1.5;if(/Hoàng thượng thương/.test(a.x))v+=1;if(/dễ có thai/.test(a.x))v+=(S.preg?0:1.5);if(/thị tẩm/.test(a.x))v+=3*o;if(/nguy cơ sảy thai/.test(a.x))v+=3}
  try{const SA=STORY[S.origin.k];if(SA&&SA.acts&&SA.acts().some(x=>x.n===a.n))v+=6}catch(e){}
  if(a.n==="Báo tin có thai")v+=50;if(a.toil)v+=6;/* balance-pass: a sensible player makes up each morning (jtoil: else "Thái hậu chê dung nhan", Đức/Danh) */
  if(/An thai|Tự bào chế thuốc an thai/.test(a.n)&&!S.anthai)v+=40;
  if(a.n==="Nghỉ ngơi dưỡng sức"&&S.suc<35)v+=60;
  if(a.n==="Tranh sủng")v+=2;
  if(/Dạy dỗ|thỉnh an Hoàng thượng|Chữa bệnh cho con/.test(a.n))v+=2;
  if(/Cầu tự/.test(a.n)&&!S.preg&&S.sung>=30)v+=2;
  return v/Math.sqrt(cost)}
function talkScore(t,N){const{p,a}=t;
  if(BAD.test(a.n)||a.open)return -1e9;
  if(S.suc+((a.c&&a.c.suc)||0)<20)return -1e9;
  const o=a.o==null?1:cl(a.o,5,100)/100;
  let v=o*valW(a.w,N)+(1-o)*valW(a.l,N)-costW(a.c);
  if(a.x){if(/chứng cứ/.test(a.x))v+=o*2.5;if(/biết thêm|biết ngài thích|có thể biết/.test(a.x))v+=1.2;if(/dễ phát hiện/.test(a.x))v+=1;if(/dễ có thai/.test(a.x))v+=1.5;if(/che chở/.test(a.x))v+=1}
  if(a.run&&!a.w)v+=0.4;
  if(p.kind==="emp")v+=1;
  if(window.__aff&&p.kind==="man"){if(/Liếc mắt|Trao khăn/.test(a.n))v+=6;if(/Hẹn gặp riêng/.test(a.n))v+=40;if(/Cắt đứt/.test(a.n))v=-1e9}
  return v/Math.sqrt(a.act?2:1)}
function sensibleStep(){
  /* jexam: a sensible player sits the promotion exam as soon as the window opens (played at her own level: window.__exAuto) */
  {const ei=deck.findIndex(a=>a&&a.exam&&cardOK(a));if(ei>=0){note("exam");act(ei);return}}
  /* affair road: assume she has already earned the trust (Chủ tin 60) of any servant whose Lòng is 60+, so a tryst can be guarded; everything else as in the game */
  if(window.__aff)for(const x of (S.staff||[]).concat(S.maid?[S.maid]:[]))if((x.loyal||0)>=60&&tinOf(x)<60)x.tin=60;
  const N=needs();
  // accuse
  const HS=!!window.__hsOnly;/* danh-balance: Hành-sự-only player (indanh.js) */
  if(!HS&&can(2)){const accs=[];rivals.forEach((v,i)=>{if(v.alive&&!v.out&&rvBtns(i).includes("accuse")){const o=ACT.accuse.o?ACT.accuse.o(S,v):70;accs.push({v,i,o})}});
    accs.sort((a,b)=>(b.v.queen-a.v.queen)||b.v.rank-a.v.rank);
    if(accs.length&&accs[0].o>=60){note("accuse");doAct(accs[0].i,"accuse");return}}
  const opts=[];
  if(!HS&&qOn()&&S.rank>=5&&can(2)&&S.bac>=20&&rvBtns(0).includes("spy")){const o=ACT.spy.o?ACT.spy.o(S,rivals[0]):50;if(o>=40)opts.push({s:3.6,f:()=>{note("spyQueen");doAct(0,"spy")}})}
  /* diff-remeasure: the one charity act (act-dedupe moved it to Tài nghệ Tứ đức, once a month) — a sensible player uses it */
  try{const C=BAL.charity;if(!HS&&C&&typeof charity==="function"&&!S.srv&&!S.out&&S.charM!==S.turn&&can(C.khac||1)&&S.bac>=C.bac+20)opts.push({L:"charity",s:3.2,f:()=>{note("charity");charity()}})}catch(e){}
  deck.forEach((a,i)=>{if(!cardOK(a))return;const c=cardCost(a);opts.push({L:"c"+a.n,s:scoreAct(a,N,c),f:()=>{note("card",a.n);act(i)}})});
  if(!HS)talkCands().forEach(t=>{const s=talkScore(t,N);opts.push({L:"t"+t.pi+t.a.n,s,f:()=>{note("talk",t.a.n);popIdx=t.pi;talk(t.oi)}})});
  const L=lessonCands().filter(a=>S.suc>=45&&S.bac>=(typeof tchFee==="function"?tchFee(a.k):5+S.arts[a.k]*5)+20).sort((a,b)=>S.arts[a.k]-S.arts[b.k]);
  if(!HS&&L.length){const x=L[0];opts.push({s:2.0+(S.sung>=40?.5:0)-(S.suc<55?1.5:0),f:()=>{note("lesson");if(S.bac>=150&&!S.master)hireMaster();lesson(x.k)}})}
  /* diff-remeasure: free self-study in the Tài nghệ tab (act-dedupe w1 moved the Hành sự "Tự học X" card there); off with window.__noSelf */
  if(!HS&&!window.__noSelf&&typeof lessonMode==="function"&&!S.mg&&can(2)&&S.suc>=60){const A=ARTS.filter(a=>S.arts[a.k]<5).sort((a,b)=>S.arts[a.k]-S.arts[b.k]);if(A.length)opts.push({L:"self",s:1.3-(S.suc<70?.5:0),f:()=>{note("selfStudy");lessonMode(A[0].k,"self")}})}
  /* diff-remeasure: free Tứ đức self-study (Tài nghệ tab, j85 lessonVir "self"; exam rows read two virtues, BAL.ex.wVir); off with window.__noSelf */
  if(!HS&&!window.__noSelf&&typeof lessonVir==="function"&&typeof VIR!=="undefined"&&S.vir&&!S.mg&&can(2)&&S.suc>=60){const V=VIR.filter(v=>(S.vir[v.k]||0)<5).sort((a,b)=>(S.vir[a.k]||0)-(S.vir[b.k]||0));if(V.length)opts.push({L:"vself",s:1.1-(S.suc<70?.5:0),f:()=>{note("virStudy");lessonVir(V[0].k,"self")}})}
  const sea=SEASON[S.month-1];const W=S.where||{};
  const pls=[];
  const place=(k,s)=>{const p=places().find(x=>x.k===k);if(p&&placeOK(p))pls.push({k,s:s/Math.sqrt(travel(S.place,k)||1)})};
  // emperor: visit where he is (ranks by sung); garden preferred
  if(W.emp&&["vuon","thu","dtd"].includes(W.emp)&&(W.emp!=="dtd"||S.sung>=50)&&(W.emp!=="thu"||S.sung>=40||Math.random()<.3))place(W.emp,3.2*N.ws+(W.emp==="vuon"?1:0));
  else place("vuon",(sea==="Xuân"||sea==="Thu"?.45:.2)*3.5*N.ws+.3);
  if(!S.thDead&&(W.th||"tn")==="tn")place("tn",S.th<40?2.5:1.0);
  if(qOn())place("kn",S.hh<20?2.2:.7);
  if(!S.preg&&S.sung<35)place("ksp",.8);
  if(S.arts.y<2)place("tyv",.6);
  if(window.__aff)for(const id in (S.menW||{})){place(S.menW[id],2.5)}
  if(!HS)pls.forEach(p=>opts.push({L:"g"+p.k,s:p.s,f:()=>{note("go",p.k);goTo(p.k)}}));
  try{if(window.__xOpts)for(const o of window.__xOpts(N))opts.push(o)}catch(e){}/* danh-p1 intn.js: Tài nghệ options */
  const tk=S.turn+'_'+S.tuan+'_'+(S.buoi||0)+'_'+used+'_'+S.place;if(window.__btk!==tk){window.__btk=tk;window.__ban={}}
  const op2=opts.filter(o=>!o.L||(window.__ban[o.L]||0)<3);op2.sort((a,b)=>b.s-a.s);
  if(op2.length&&op2[0].s>0.35){if(op2[0].L)window.__ban[op2[0].L]=(window.__ban[op2[0].L]||0)+1;op2[0].f();return}
  window.__buoi++;if(used<=1)window.__idle++;nextBuoi()}
window.__bot={step:(mode,n)=>{
  for(let i=0;i<n;i++){if(window.__vtPump)window.__vtPump(5);/* run_rep.js virtual clock (vclock.js): game timers advance 5 ms per bot step */window.__iter++;window.__lifeIter++;
    if(S&&!S.dead){window.__maxRank=Math.max(window.__maxRank,S.rank);if(S.rank>=7&&window.__hhTurn==null){window.__hhTurn=S.turn;window.__hhWk=S.turn*3+S.tuan;window.__hhB=window.__lifeB}const t=S.turn+"_"+S.tuan;if(window.__lastT!==t){window.__lastT=t;window.__sucTrace.push(S.suc)}}
    {const tk=S?S.turn+'_'+S.tuan+'_'+(S.buoi||0)+'_'+used:'';if(tk!==window.__stk){window.__stk=tk;window.__stn=0}else window.__stn++}
    if(window.__lifeIter>60000||window.__stn>400){window.__res.push({ex:JSON.parse(JSON.stringify(window.__exN||{})),origin:S.origin.k,rank:S.rank,maxRank:window.__maxRank,turns:S.turn,years:+(S.turn/12).toFixed(2),title:"TIMEOUT",fate:"TIMEOUT",stuck:window.__stn>400,ring:(window.__ring||[]).slice(),acts:window.__acts,state:JSON.stringify({used,Q:Q.length,mg:!!S.mg,buoi:S.buoi,place:S.place,out:S.out,q0:Q[0]&&{t:strip(Q[0].t||Q[0].title||"").slice(0,160),opts:(Q[0].opts||[]).map(o=>o.n+"|"+JSON.stringify(o.fx||{}))},modalHidden:q("#modal").hidden,ov:q("#ov").hidden?"":strip(q("#ov").innerHTML).slice(0,200),logs:(S.logs||[]).slice(0,3).map(strip)})});window.__maxRank=0;window.__lifeIter=0;window.__stn=0;window.__acts={};start();continue}
    if(window.__hhStop&&S&&!S.dead&&S.rank>=7){window.__res.push({ex:JSON.parse(JSON.stringify(window.__exN||{})),origin:S.origin.k,rank:S.rank,maxRank:7,turns:S.turn,years:+(S.turn/12).toFixed(2),title:"HH",fate:"HH-STOP",hhTurn:window.__hhTurn,hhWk:window.__hhWk,hhB:window.__hhB,wk:S.turn*3+S.tuan,kids:S.kids.length,fired:S.firedN||0,trysts:(S.men||[]).reduce((a,m)=>a+(m.trysts||0),0),acts:window.__acts});window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__hhWk=null;window.__acts={};Q=[];start();continue}
    if(S&&S.dead&&!Q.length){start();continue}
    if(S&&!S.dead){for(const k of ['sung','danh','bac','suc','duc','sac','tai','tamco','th','hh','mat','an'])if(typeof S[k]!=='number'||isNaN(S[k])||(k!=='th'&&k!=='hh'&&S[k]<0)||S[k]>(k==='bac'?1e6:100))window.__bad.push(k+'='+S[k]+' '+S.origin.k);
      if(window.__iter%400===0&&!Q.length&&!S.mg){try{const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;deal()}catch(e){window.__saveFail.push(String(e.message).slice(0,80))}}}
    try{if(modalStep(mode==="sens"))continue;
    if(S.dead)continue;
    if(mode==="rand")randomStep();else sensibleStep()}catch(e){window.__res.push({ex:JSON.parse(JSON.stringify(window.__exN||{})),origin:S.origin.k,rank:S.rank,maxRank:Math.max(window.__maxRank,S.rank),turns:S.turn,years:+(S.turn/12).toFixed(2),title:"CRASH",fate:"CRASH: "+String(e.message).slice(0,80)+" @"+(String(e.stack).split("\n")[1]||"").trim().slice(0,60),hhTurn:window.__hhTurn});window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__sucTrace=[];window.__acts={};Q=[];try{start()}catch(e2){}}}
  return window.__res.length},extra:()=>({logc:window.__logc,bad:window.__bad.slice(0,30),badN:window.__bad.length,saveFail:window.__saveFail.slice(0,10),idle:window.__idle,buoi:window.__buoi})};
})();
/* sensible bot uses the j70 "Phòng bị" orders like a real player: a taster while pregnant, a guard on the palace, a record-keeper when there are hands (once a tuần; orders cost silver monthly as for anyone) */
(function(){if(typeof ords70!=="function")return;let lastK="";const st0=window.__bot.step;window.__bot.step=function(mode,n){try{if(mode==="sens"&&!window.__noGuard&&S&&!S.dead&&!S.srv){const k=S.turn+"_"+S.tuan;if(k!==lastK){lastK=k;const L=ords70();
  const free=[S.maid?"maid":null].concat((S.staff||[]).map(s=>s.sid)).filter(x=>x!=null&&!ordOf70(x)&&sv70(x)&&!traitor70(sv70(x)));
  const has=t=>L.some(o=>o.k===t);const want=[];if(S.preg&&!has("thudoc"))want.push("thudoc");if(!has("canh"))want.push("canh");if(!has("giuchung")&&(S.bac||0)>=40)want.push("giuchung");
  free.sort((a,b)=>(sv70(b).loyal||0)-(sv70(a).loyal||0));for(const t of want){const sid=free.shift();if(sid==null)break;if(ORD70[t].bac&&(S.bac||0)<ORD70[t].bac*3)continue;L.push({k:t,sid,since:wk()});(window.__guard=window.__guard||{})[t]=(window.__guard[t]||0)+1}}}}catch(e){}return st0.apply(this,arguments)}})();

window.__exAuto=1;
