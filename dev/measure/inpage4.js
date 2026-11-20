(function(){
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
window.__res=[];window.__logc={};window.__bad=[];window.__saveFail=[];window.__idle=0;window.__buoi=0;const ORIG=['tt','dtq','muoi','cn','nc','td','ch','thd'];const _start=start;start=function(){window.__oi=(window.__oi||0)+1;window.__forceOrigin=ORIG[window.__oi%8];return _start()};window.__iter=0;window.__lifeIter=0;window.__maxRank=0;window.__hhTurn=null;window.__turnActs=0;window.__sucTrace=[];window.__lastT="";window.__acts={};
popNum=()=>{};curtain=()=>{};fx=()=>{};save=()=>{};
renderHUD=()=>{};renderStage=()=>{};renderPanel=()=>{};
render=function(){if(!S)return;if(Q.length&&$("modal").hidden)showModal()};
const strip=x=>String(x).replace(/<[^>]+>/g,'');
const _over=over;
over=function(h,t,fate){try{(S.logs||[]).forEach(x=>{const k=strip(x).replace(/\d+/g,'#').split(/[.:;]/)[0].split(' ').slice(-6).join(' ');window.__logc[k]=(window.__logc[k]||0)+1});window.__res.push({pl:S.persLog||{},fired:S.firedN||0,nr:liveRivals(true).length,un:S.stat?S.stat.un:0,ac:S.stat?S.stat.act:0,step:S.st.step,sdone:S.st.done,stag:S.st.tag,origin:S.origin.k,rank:S.rank,maxRank:Math.max(window.__maxRank,S.rank),turns:S.turn,years:+(S.turn/12).toFixed(2),age:S.age,title:h,fate:strip(fate),text:strip(t).slice(0,200),sung:S.sung,danh:S.danh,duc:S.duc,bac:S.bac,suc:S.suc,kids:S.kids.length,sons:S.kids.filter(k=>k.sex==="m").length,iters:window.__lifeIter,hhTurn:window.__hhTurn,logs:S.logs.slice(0,4).map(strip),sucTrace:window.__sucTrace.slice(-5),acts:window.__acts})}catch(e){window.__res.push({err:String(e)})}
  window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__sucTrace=[];window.__acts={};return _over(h,t,fate)};
const RNG=n=>Math.floor(Math.random()*n),rpick=a=>a[RNG(a.length)];
function note(k){window.__acts[k]=(window.__acts[k]||0)+1}
function rvBtns(i){const v=rivals[i];const d=document.createElement('div');d.innerHTML=rvButtons(v,i);return [...d.querySelectorAll('button[data-r]')].filter(b=>!b.disabled).map(b=>b.dataset.a)}
function modalStep(sens){
  if(!q('#ov').hidden){/* j82 mini-games (current main): skip / close */{const k=q('#kg82skip')||q('#ov .kg82act button:not(#kg82go)')||q('#kg82ok')||q('#ov button.kbtn');if(k){k.click();return true}}const ok=q('#mgok');if(ok){ok.click();return true}const sk=q('#mgskip');if(sk&&!sk.hidden){sk.click();return true}return true}
  if(Q.length){
    const m=Q[0];
    if(m.opts&&m.opts.length){
      const okIdx=m.opts.map((c,i)=>[c,i]).filter(([c])=>!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)&&!c.off&&!(typeof c.lk==='function'&&(()=>{try{return c.lk()}catch(e){return false}})())&&!(c.need&&c.need.some&&c.need.some(n=>n&&n.ok===false))&&!(typeof eaLockWhy==='function'&&(()=>{try{return eaLockWhy(c,m)}catch(e){return false}})()));/* review/origin-bd-branch: a locked option (off / lk / need / mood lock) is never picked — chooseM refuses it and the bot stuck in TIMEOUT */
      if(!okIdx.length){closeModal();return true}
      let pickI;
      if(!sens)pickI=rpick(okIdx)[1];
      else{let best=-1e9;pickI=okIdx[0][1];okIdx.forEach(([o,i])=>{const f=o.fx||{};let v=(f.sung||0)*1.5+(f.danh||0)*1.2+(f.hh||0)*.4+(f.th||0)*.4+(f.maid||0)*.1+(f.suc||0)*.2+(f.tamco||0)*.3+(f.bac||0)*.04;
        if((f.duc||0)<0)v+=(f.duc||0)*6;else v+=(f.duc||0)*1.5;if(o.x&&/chứng cứ/.test(o.x))v+=2;if(o.x&&/nhân chứng|rửa oan|lật án|phong tước|giữ được/.test(o.x))v+=4;if(/tú nữ/.test(o.n))v-=.5;v+=Math.random()*.01;if(v>best){best=v;pickI=i}})}
      note("dilemma");chooseM(pickI);if(Q[0]===m){for(const [,i] of okIdx){if(i===pickI)continue;chooseM(i);if(Q[0]!==m)break}if(Q[0]===m)Q.shift()}/* still refused: another option, else drop the card */return true}
    closeModal();return true}
  return false}
function cardOK(a){return !a.done&&!S.dead&&canPay(a)&&!a.lock&&can(cardCost(a))&&!(a.b!=null&&(S.buoi||0)!==a.b)}
function placeOK(p){return p.k!=="home"&&S.place!==p.k&&!S.confined&&!S.out&&can(travel(S.place,p.k)+1)&&(typeof accessOf!=="function"||accessOf(S,p.k).ok)}
function talkCands(){const out=[];if(!S.visit||S.visit.talked===true)return out;const tk=S.visit.tk||{};
  curPeople().forEach((p,pi)=>{if(tk[pi])return;talkOpts(p).forEach((a,oi)=>{if(!canPay(a)||a.lock)return;const c=a.act?2:1;if(!can(c))return;out.push({p,pi,a,oi})})});return out}
function lessonCands(){return ARTS.filter(a=>S.arts[a.k]<5&&S.bac>=5+S.arts[a.k]*5&&can(2)&&!S.mg)}
function fire(f){f()}
// ---- RANDOM
function randomStep(){
  const cand=[];
  deck.forEach((a,i)=>{if(cardOK(a))cand.push(()=>{note("card");act(i)})});
  places().forEach(p=>{if(placeOK(p))cand.push(()=>{note("go");goTo(p.k)})});
  rivals.forEach((v,i)=>{if(v.alive&&!v.out&&can(2))rvBtns(i).forEach(k=>cand.push(()=>{note("scheme_"+k);doAct(i,k)}))});
  lessonCands().forEach(a=>cand.push(()=>{note("lesson");lesson(a.k)}));
  if(S.bac>=60&&!S.master)cand.push(()=>{note("master");hireMaster()});
  talkCands().forEach(t=>cand.push(()=>{note("talk");popIdx=t.pi;talk(t.oi)}));
  if(!cand.length||window.__turnActs>=40){window.__buoi++;if(!cand.length&&used<=1)window.__idle++;window.__turnActs=0;nextBuoi();return}
  window.__turnActs++;rpick(cand)()}
// ---- SENSIBLE
function needs(){const nx=S.rank<7?RANKS[S.rank+1]:{s:70,d:70};return{ws:1+Math.max(0,nx.s-S.sung)/12,wd:1+Math.max(0,nx.d-S.danh)/8}}
const BAD=/Giả mang thai|Gửi mật thư|Theo cha mưu đại sự|Diệt khẩu|Trung với cố quốc|Khiêu khích|Trút giận|Cài đồ|giấu|xạ hương|độc|Đẩy con nàng xuống hồ|Đẩy nàng xuống hồ sen|Ngáng chân/i;
function valW(w,N){w=w||{};return (w.sung?sg(w.sung):0)*N.ws+(w.danh||0)*N.wd+(w.th||0)*.3+(w.hh||0)*.25+(w.duc||0)*(S.duc<45?1.2:.4)+(w.maid||0)*.1+(w.mat||0)*.8+(w.tamco||0)*.3+(w.tai||0)*.2+(w.sac||0)*.5+(w.bac||0)*(S.bac<60?.08:.03)+(w.suc||0)*(S.suc<50?.3:.05)}
function costW(c){c=c||{};return (c.suc||0)*(S.suc<50?.35:.08)+(c.bac||0)*(S.bac<60?.09:.035)+(c.duc?c.duc*3:0)+(c.sung||0)+(c.danh||0)}
function scoreAct(a,N,cost){
  if(BAD.test(a.n))return -1e9;
  if(S.suc+((a.c&&a.c.suc)||0)<20&&a.n!=="Nghỉ ngơi dưỡng sức")return -1e9;
  if(a.c&&a.c.duc<0&&S.duc<50)return -1e9;
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
  return v/Math.sqrt(a.act?2:1)}
function sensibleStep(){
  /* balance-pass: sit the promotion exam when its window opens, played at her own level (as inpage6; jexam window.__exAuto) */
  window.__exAuto=1;{const ei=deck.findIndex(a=>a&&a.exam&&cardOK(a));if(ei>=0){note("exam");act(ei);return}}
  const N=needs();
  // accuse
  if(can(2)){const accs=[];rivals.forEach((v,i)=>{if(v.alive&&!v.out&&rvBtns(i).includes("accuse")){const o=ACT.accuse.o?ACT.accuse.o(S,v):70;accs.push({v,i,o})}});
    accs.sort((a,b)=>(b.v.queen-a.v.queen)||b.v.rank-a.v.rank);
    if(accs.length&&accs[0].o>=60){note("accuse");doAct(accs[0].i,"accuse");return}}
  const opts=[];
  if(qOn()&&S.rank>=5&&can(2)&&S.bac>=20&&rvBtns(0).includes("spy")){const o=ACT.spy.o?ACT.spy.o(S,rivals[0]):50;if(o>=40)opts.push({s:3.6,f:()=>{note("spyQueen");doAct(0,"spy")}})}
  /* a card that changes nothing is not tried again in the same buổi */{const bk=S.turn+"_"+S.tuan+"_"+S.buoi;window.__cdf=window.__cdf||{};deck.forEach((a,i)=>{if(!cardOK(a)||window.__cdf[a.n]===bk)return;const c=cardCost(a);opts.push({s:scoreAct(a,N,c),f:()=>{note("card");const u0=used,q0=Q.length,s0=S.suc,b0=S.bac;act(i);if(used===u0&&Q.length===q0&&S.suc===s0&&S.bac===b0&&!S.mg)window.__cdf[a.n]=bk}})})}
  talkCands().forEach(t=>{const s=talkScore(t,N);opts.push({s,f:()=>{note("talk");popIdx=t.pi;talk(t.oi)}})});
  const L=lessonCands().filter(a=>S.suc>=45&&S.bac>=5+S.arts[a.k]*5+20).sort((a,b)=>S.arts[a.k]-S.arts[b.k]);
  if(L.length){const x=L[0];opts.push({s:2.0+(S.sung>=40?.5:0)-(S.suc<55?1.5:0),f:()=>{note("lesson");if(S.bac>=150&&!S.master)hireMaster();lesson(x.k)}})}
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
  /* a place goTo refuses is not tried again in the same buổi (else the bot loops) */{const bk=S.turn+"_"+S.tuan+"_"+S.buoi;window.__gof=window.__gof||{};pls.forEach(p=>{if(window.__gof[p.k]===bk)return;opts.push({s:p.s,f:()=>{note("go");const was=S.place;goTo(p.k);if(S.place===was&&!Q.length)window.__gof[p.k]=bk}})})}
  opts.sort((a,b)=>b.s-a.s);
  if(opts.length&&opts[0].s>0.35){opts[0].f();return}
  window.__buoi++;if(used<=1)window.__idle++;nextBuoi()}
window.__bot={step:(mode,n)=>{
  for(let i=0;i<n;i++){window.__iter++;window.__lifeIter++;
    if(S&&!S.dead){window.__maxRank=Math.max(window.__maxRank,S.rank);if(S.rank>=7&&window.__hhTurn==null)window.__hhTurn=S.turn;const t=S.turn+"_"+S.tuan;if(window.__lastT!==t){window.__lastT=t;window.__sucTrace.push(S.suc)}}
    if(window.__lifeIter>60000){window.__res.push({origin:S.origin.k,rank:S.rank,maxRank:window.__maxRank,turns:S.turn,years:+(S.turn/12).toFixed(2),title:"TIMEOUT",fate:"TIMEOUT",state:JSON.stringify({used,Q:Q.length,mg:!!S.mg,buoi:S.buoi,place:S.place,out:S.out})});window.__maxRank=0;window.__lifeIter=0;start();continue}
    if(S&&S.dead&&!Q.length){start();continue}
    if(S&&!S.dead){for(const k of ['sung','danh','bac','suc','duc','sac','tai','tamco','th','hh','mat','an'])if(typeof S[k]!=='number'||isNaN(S[k])||(k!=='th'&&k!=='hh'&&S[k]<0)||S[k]>(k==='bac'?1e6:100))window.__bad.push(k+'='+S[k]+' '+S.origin.k);
      if(window.__iter%400===0&&!Q.length&&!S.mg){try{const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;deal()}catch(e){window.__saveFail.push(String(e.message).slice(0,80))}}}
    try{if(modalStep(mode==="sens"))continue;
    if(S.dead)continue;
    if(mode==="rand")randomStep();else sensibleStep()}catch(e){window.__res.push({origin:S.origin.k,rank:S.rank,maxRank:Math.max(window.__maxRank,S.rank),turns:S.turn,years:+(S.turn/12).toFixed(2),title:"CRASH",fate:"CRASH: "+String(e.message).slice(0,80)+" @"+(String(e.stack).split("\n")[1]||"").trim().slice(0,60),hhTurn:window.__hhTurn});window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__sucTrace=[];window.__acts={};Q=[];try{start()}catch(e2){}}}
  return window.__res.length},extra:()=>({logc:window.__logc,bad:window.__bad.slice(0,30),badN:window.__bad.length,saveFail:window.__saveFail.slice(0,10),idle:window.__idle,buoi:window.__buoi})};
})();
