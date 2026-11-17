/* ================= jagacts3: AG-ALL-2e — PARITY: the NPC side of the player buttons that had none (owner OD 17/11 ~15:25Z (3): "làm toàn bộ tất cả các cái nút") =================
   Audit: dev/handover/reports/ag-all-parity.md (section "2e before → after"). Core: jagday agReg / agRunReg; utility agcU (needs × odds × traits, mindPick inside the
   day plan, never always-best). ONE FUNCTION: every card below is built ONCE by P3C.<k>(p) — her deck / talk card calls P3C.<k>(S) (j2, j78), an NPC consort's
   option cx3:<k> runs P3C.<k>(v) through p3Run (cost → odds odA → gain / loss → the card's own go). Shared acts that already took a person are called as they are:
   useItem / sellItem (j8), treat (j13), courtGive (j10), charityFx (j85, now takes p), servDo (j10, split out of servAct), restLatEmo (jrest), wkMake (j83).
   Khắc: each option carries the player's khắc of that card (cardCost) as kc, so agKhC / agSpan charge it like hers.
   Maid group: asOpts (jagstaff) now also offers the SRVA rows that were registered but never offered: Theo hầu chủ (follow), Cắt đứt (cut); Việc chủ sai = the 2c errands (jagknow).
   Numbers: BAL.ag.par3 (jbal2 end). Off: BAL.ag.par3.on = 0 → no cx3 option (the player's cards stay the same). HOST ONLY like every agReg provider.
   ===================================================================================================================== */
const AG3={stat:{opt:0,land:0,by:{}}};
function p3On(){try{return !!(agOn()&&BAL.ag.par3&&BAL.ag.par3.on)}catch(e){return false}}
function p3Nm(p){return p===S?"ngươi":p&&p.name||""}
function p3Ap(p,x){if(!x||!Object.keys(x).length)return;if(p===S)apply(x);else ap(p,x)}
/* every other consort's jealousy rises when someone dances before the whole harem (her card: ghenAll; an NPC dancer: the others, her included in ghen of NPCs only) */
function p3GhenAll(p,n){if(p===S)return ghenAll(n);const d=ghenN(n);liveRivals(true).forEach(v=>{if(v!==p)v.ghen=cl((v.ghen||0)+d,0,100)})}
/* ---------------- the player cards, built once ---------------- */
const P3C={
 dance:p=>{const X=BAL.ag.par3.dance;return{n:"Múa trong yến tiệc",t:"Cả hậu cung nhìn vào.",c:{...X.c},o:odA(p,X.o+(p.sac||0)/X.sacD*(p===S&&has("mesac")?X.mesac:1)+((p.arts&&p.arts.vu)||0)*X.vu),
  w:{...X.w},l:{...X.l},x:`phi tần ghen +${ghenN(BAL.ghen.dance)}`,go:()=>p3GhenAll(p,BAL.ghen.dance)}},
 eyes:p=>{const X=BAL.ag.par3.eyes;return{n:"Cài tai mắt",t:"Mua chuộc cung nữ các cung khác.",c:{...X.c},o:odA(p,X.o),w:{...X.w},l:{...X.l}}},
 anthai:p=>{const X=BAL.ag.par3.anthai;const x="tháng này nguy cơ sảy thai giảm một nửa";
  return ((p.arts&&p.arts.y)||0)>=X.self.y?{n:"Tự bào chế thuốc an thai",t:p===S?"Ngươi tự sắc thuốc, không ai nhúng tay được.":"Tự sắc thuốc an thai.",c:{...X.self.c},o:100,w:{},x,go:()=>{p.anthai=1}}
   :{n:"An thai",t:"Nằm nghỉ, uống thuốc an thai.",c:{...X.buy.c},o:100,w:{...X.buy.w},x,go:()=>{p.anthai=1}}},
 /* Kể tội {X} with the Thái hậu: odds from her evidence on X (evG) and her Thái hậu regard; X loses the teller's liking, one piece of evidence, Sủng */
 tell:(p,t)=>{const X=BAL.ag.par3.tell;if(!t)return{n:"Kể tội một phi tần",lock:true,t:"cần chứng cứ",o:0,w:{...X.w},x:"nàng bị phạt",l:{...X.l}};
  return{n:`Kể tội ${t.name}`,lock:false,t:"cần chứng cứ",o:odA(p,X.o+evG(p,t)*X.ev+(p.th||0)/X.thD),w:{...X.w},x:"nàng bị phạt",l:{...X.l},
   go:()=>{if(p===S){t.rel-=X.rel;t.ev--}else{affAdd(t,p,-X.rel);evA(p,t,-BAL.ag.ev.one)}t.sung=cl((t.sung||0)-X.sung,0,100);
    const who=typeof j78Who==="function"?j78Who(t):t.name;if(p===S)log(`${who} bị Thái hậu quở trách, mất sủng.`);return `${p.name} kể tội ${t.name} với Thái hậu; ${t.name} bị quở trách, mất sủng`}}},
 treat:p=>({n:"Xin chữa bệnh",c:{...BAL.ag.par3.treat.c},o:100,x:illName(p),run:()=>treat(p,"ty")})};
/* run one card for an NPC: the player's runOpt order (cost, odds, gain or loss, then go / run) */
function p3Run(v,C,why){if(!C||C.lock)return"";if(!agcCan(v,C.c))return"";agcPay(v,C.c);const o=C.o==null?100:C.o;const ok=o>=100||roll(o);p3Ap(v,ok?C.w:C.l);let r="";
 try{if(ok&&C.go)r=C.go()||"";if(C.run)r=C.run()||r}catch(e){agdErr("par3:"+why,e)}AG3.stat.land++;AG3.stat.by[why]=(AG3.stat.by[why]||0)+1;
 return r?String(r).replace(/<[^>]+>/g,"").replace(/\.\s*$/,""):`${v.name} ${C.n.charAt(0).toLowerCase()+C.n.slice(1)}${ok?"":" nhưng không thành"}`}
function p3Kc(C){try{return Math.max(1,cardCost(C))}catch(e){return 1}}
/* the player's button each cx3 deed is (dev/test/ag-all.test.js okK, dev/test/ag-par3.js) */
const AGC3BTN={dance:"Múa trong yến tiệc",eyes:"Cài tai mắt",anthai:"An thai",tell:"Kể tội",treat:"Xin chữa bệnh",restLat:"Nghỉ ngơi một lát",charity:"Phát bạc cứu giúp cung nhân nghèo",
 use:"Dùng",sell:"Bán",tyGift:"Biếu",work:"Tự học",staffThuong:"Thưởng",staffPhat:"Phạt",staffHoi:"Hỏi chuyện",staffDoi:"Đổi người",staffChe:"Che chở"};
const AGC3ACT={dance:"múa trong yến tiệc",eyes:"cài tai mắt",anthai:"uống thuốc an thai",tell:"sang Từ Ninh cung kể tội",treat:"đến Thái y viện xin chữa bệnh",restLat:"nghỉ ngơi một lát",
 charity:"phát bạc cứu giúp cung nhân nghèo",use:"dùng một món đồ",sell:"bán bớt đồ",tyGift:"biếu quà thái y",work:"tự tay làm một tác phẩm",staffThuong:"thưởng kẻ hầu",staffPhat:"phạt kẻ hầu",
 staffHoi:"hỏi chuyện kẻ hầu",staffDoi:"trả kẻ hầu về Nội vụ phủ",staffChe:"che chở kẻ hầu"};
function p3O(v,k,C,N,g,tag,at,t){if(!C||C.lock||!agcCan(v,C.c))return null;const u=agcU(v,N,C.o==null?100:C.o,g,C.c||{},tag);if(!(u>0))return null;AG3.stat.opt++;
 return{k:"cx3:"+k,t:t||null,u,tag,act:AGC3ACT[k],kc:p3Kc(C),at:at||((kh,vv)=>palaceOf(vv||v))}}
/* her own staff: the one this deed is for (re-picked at run time by the same rule, so a save between plan and deed needs no servant id) */
function p3Staff(v,a){const P=BAL.ag.par3.staff;const L=(v.staff||[]).filter(s=>s&&!s.out&&s.loyal!=null);if(!L.length)return null;
 const f={thuong:s=>s.loyal<P.thuong.below,phat:s=>s.loyal<P.phat.below,doi:s=>s.loyal<P.doi.below,che:s=>s.trouble===wk(),hoi:s=>Object.keys(s.af||{}).some(x=>s.af[x]>=P.hoi.af)}[a];
 const C=L.filter(f);if(!C.length)return null;return C.slice().sort((x,y)=>a==="hoi"||a==="che"?y.loyal-x.loyal:x.loyal-y.loyal)[0]}
function p3Inv(v,f){const I=v.inv||[];let best=-1,bv=-1e9;for(let i=0;i<I.length;i++){const e=I[i],it=e&&IT[e.k];if(!it||e.h)continue;const s=f(e,it);if(s!=null&&s>bv){bv=s;best=i}}return best}
function p3UseIx(v){const X=BAL.ag.par3.use;return p3Inv(v,(e,it)=>{if(!it.use&&!it.ant&&!it.fert)return null;if(it.dr||it.sl||it.evi||it.anti||it.keep||it.mat||it.gv||it.il||e.k==="botngua")return null;
 if(it.ant)return v.preg&&!v.anthai?2:null;if(it.fert)return !v.preg&&!v.fert?1:null;return it.use.suc&&(v.suc||0)<X.sucBelow?it.use.suc:null})}
function p3SellIx(v){return p3Inv(v,(e,it)=>(it.pr>0&&!it.sl&&!it.evi&&!it.keep&&!e.wk&&!e.t&&!(v.wear&&Object.values(v.wear).includes(e)))?-it.pr:null)}
/* ---------------- the consort provider ---------------- */
agReg("consort","par3",(v,N,need)=>{const O=[];if(!p3On()||v===S||v.out||v.confined||!v.alive)return O;const X=BAL.ag.par3;const P=x=>x&&O.push(x);const nd=(g)=>!need||g[need]!=null;
 try{
  if(nd(X.dance.g))P(p3O(v,"dance",P3C.dance(v),N,X.dance.g,"art"));
  if(nd(X.eyes.g)&&(v.mat||0)<X.eyes.max)P(p3O(v,"eyes",P3C.eyes(v),N,X.eyes.g,"scheme"));
  if(v.preg&&!v.fake&&!v.anthai&&nd(X.anthai.g))P(p3O(v,"anthai",P3C.anthai(v),N,X.anthai.g,"self"));
  if(!S.thDead&&nd(X.tell.g)){const L=others(v).filter(t=>t&&t!==S&&t!==v&&t.alive&&!t.out&&!t.queen&&evG(v,t)>0&&agSpite(v,t)>0);
   if(L.length){const t=mindPickBy(L,x=>agSpite(v,x),v);P(p3O(v,"tell",P3C.tell(v,t),N,X.tell.g,"punish",()=>"tn",t))}}
  if(illOf(v)&&nd(X.treat.g))P(p3O(v,"treat",P3C.treat(v),N,X.treat.g,"self",()=>"tyv"));
  if((v.suc||0)<X.restLat.sucBelow&&nd(X.restLat.g))P(p3O(v,"restLat",{n:"Nghỉ ngơi một lát",c:{},o:100,k:BAL.restLatK,w:{suc:BAL.restLatSuc}},N,X.restLat.g,"self"));
  if(v.charM!==S.turn&&nd(X.charity.g)){const C=BAL.charity;P(p3O(v,"charity",{n:"Phát bạc cứu giúp cung nhân nghèo",c:{bac:-C.bac},o:100,k:C.khac},N,X.charity.g,"help"))}
  if(nd(X.use.g)&&p3UseIx(v)>=0)P(p3O(v,"use",{n:"Dùng",c:{},o:100},N,X.use.g,"self"));
  if((need==="bac"||!need)&&(v.bac||0)<X.sell.bacBelow&&p3SellIx(v)>=0)P(p3O(v,"sell",{n:"Bán",c:{},o:100},N,X.sell.g,"self"));
  if(nd(X.tyGift.g)&&S.court&&S.court.ty&&(v.bac||0)>=BAL.court.gift.bac&&others(v).some(t=>t&&t!==v&&agSpite(v,t)>0))P(p3O(v,"tyGift",{n:"Biếu",c:{bac:-BAL.court.gift.bac},o:100},N,X.tyGift.g,"bribe"));
  if(nd(X.work.g)&&typeof wkMake==="function"){const a=p3WorkArt(v);if(a)P(p3O(v,"work",{n:"Tự học",c:{},o:100,k:2},N,X.work.g,"art"))}
  const S3=X.staff;for(const a of ["thuong","phat","doi","che","hoi"]){const g=a==="hoi"?S3.gHoi:S3.g;if(!nd(g))continue;const s=p3Staff(v,a);if(!s)continue;
   const c=a==="thuong"?{bac:-S3.thuong.bac}:a==="che"?{danh:-S3.che.danh}:{};const k="staff"+a.charAt(0).toUpperCase()+a.slice(1);P(p3O(v,k,{n:AGC3BTN[k],c,o:100,k:a==="hoi"?2:1},N,g,"staff"))}
 }catch(e){agdErr("par3",e)}return O});
function p3WorkArt(v){let b=null,l=0;for(const a in WDEF){const x=(v.arts&&v.arts[a])||0;if(x>l){l=x;b=a}}return b}
/* ---------------- what each deed does (the same functions as her buttons) ---------------- */
agRunReg("cx3:dance",v=>p3Run(v,P3C.dance(v),"dance"));
agRunReg("cx3:eyes",v=>p3Run(v,P3C.eyes(v),"eyes"));
agRunReg("cx3:anthai",v=>v.preg&&!v.fake?p3Run(v,P3C.anthai(v),"anthai"):"");
agRunReg("cx3:tell",(v,t)=>t&&!S.thDead&&evG(v,t)>0?p3Run(v,P3C.tell(v,t),"tell"):"");
agRunReg("cx3:treat",v=>illOf(v)?p3Run(v,P3C.treat(v),"treat"):"");
agRunReg("cx3:restLat",v=>{ap(v,{suc:BAL.restLatSuc});restLatEmo(v);return p3Res("restLat",`${v.name} nghỉ ngơi một lát`)});
agRunReg("cx3:charity",v=>{const C=BAL.charity;if(v.charM===S.turn||(v.bac||0)<C.bac)return"";charityFx(v);return p3Res("charity",`${v.name} phát bạc cứu giúp cung nhân nghèo`)});
agRunReg("cx3:use",v=>{const i=p3UseIx(v);if(i<0)return"";return p3Res("use",String(useItem(v,i)||"").replace(/<[^>]+>/g,"").trim())});
agRunReg("cx3:sell",v=>{const i=p3SellIx(v);if(i<0)return"";return p3Res("sell",String(sellItem(v,i)||"").trim())});
agRunReg("cx3:tyGift",v=>p3Res("tyGift",String(courtGive(v,"ty")||"").replace(/<[^>]+>/g,"").trim()));
agRunReg("cx3:work",v=>{const a=p3WorkArt(v);if(!a)return"";const kind=WDEF[a];let raw;try{raw=wkNpcRaw(v,kind)}catch(e){raw=0}const e=wkMake(v,kind,0,raw);(v.inv=v.inv||[]).push(e);
 return p3Res("work",`${v.name} tự tay làm ${e.wk&&e.wk.n||"một tác phẩm"}`)});
for(const a of ["thuong","phat","doi","che","hoi"]){const k="staff"+a.charAt(0).toUpperCase()+a.slice(1);agRunReg("cx3:"+k,v=>{const s=p3Staff(v,a);return s?p3Res(k,servDo(v,a,s)):""})}
function p3Res(k,txt){AG3.stat.land++;AG3.stat.by[k]=(AG3.stat.by[k]||0)+1;return txt||""}
/* ---------------- maid / eunuch: the SRVA rows registered but never offered (jagstaff asOpts) ---------------- */
(function(){if(typeof asOpts!=="function")return;const a0=asOpts;asOpts=function(s,N){const L=a0.apply(this,arguments);try{if(!p3On()||!s)return L;const m=ownerOf(s);if(!m)return L;
  N=N||asNeeds(s);const X=x=>{if(x){x.u=asU(N,x)*asB().uMul;if(x.u>0)L.push(x)}};const home=asMisHome(m);
  if(!home)X(asOpt(s,"follow",100,{at:srvWhere(m)}));                       /* Theo hầu chủ: her master is out — she follows (Chủ tin +) */
  /* (Việc chủ sai = the 2c errands listen / scout / watch, jagknow knStaffOpts — already offered) */
  /* Cắt đứt: she ends it when the risk of being caught is high; its worth = the Chủ tin she would lose if caught (asRisk × caughtTin), the run = the player's card (SRVA.cut) */
  if(s.role==="maid"&&s.manLove&&asRisk(s)>=BAL.ag.par3.cutRisk)X(asOpt(s,"cut",100,{w:{tin:asRisk(s)/100*asB().caughtTin}}));
 }catch(e){agdErr("par3:asOpts",e)}return L}})();
if(typeof AS_DO==="object"&&!AS_DO.cut)AS_DO.cut=(s)=>{s.manLove=null;return""};
/* ---------------- lãnh cung: an NPC inside chooses among HER cards (j14 coldActsOf), once a month (coldMonth; was a flat roll 3 % / 5 %) ---------------- */
function p3Free(v,why){const X=BAL.ag.par3.cold;v.out=false;v.rank=0;v.lastPromo=S.turn;v.coldEv=0;v.oan=cl((v.oan||0)+X.oanFree,0,100);if(v.coldBy!=null){const b=byKey(v.coldBy);if(b)oanAdd(v,b,BAL.eff.j14.coldMonth)}
 v.p3Freed=why;return `${v.name} được tha khỏi lãnh cung (${why}), phục vị ${RANKS[0].n}`}
function p3Nun(v){v.alive=false;v.nun=1;return `${v.name} cạo tóc xuất gia, rời lãnh cung`}
function p3Cold(v){const X=BAL.ag.par3.cold;let N;try{N=agNeeds(v)}catch(e){N={}}const L=coldActsOf(v).filter(C=>!C.lock&&agcCan(v,C.c));const best=Math.max(0,...L.filter(C=>/được tha|phục vị|nhớ chuyện cũ/.test(C.x||"")).map(C=>C.o||0));
 const W=[];for(const C of L){const free=/được tha|phục vị|nhớ chuyện cũ|chứng cứ \+1/.test(C.x||"");let u;
  if(C.n==="Xuất gia")u=(v.suc||0)<X.nunSuc&&best<X.nunO?agcU(v,N,100,{rest:BAL.ag.unit},{},"self"):0;
  else if(free)u=agcU(v,N,C.o==null?100:C.o,X.gFree,C.c||{},"self");
  else{const g={};for(const k in C.w||{})g[k==="suc"?"rest":k]=(C.w[k]||0)*(X.gStay[k==="suc"?"rest":k]||0);u=agcU(v,N,C.o==null?100:C.o,g,C.c||{},"self")}
  if(u>0)W.push([C,u])}
 if(!W.length)return"";const C=mindPick(W,v);if(!C)return"";const r=p3Run(v,C,"cold:"+C.n);const seen=(S.mat||0)>=BAL.mline.seeMat||!!v.p3Freed;v.p3Freed=null;return seen&&r?r+". ":""}
/* ledger labels */
try{for(const k in AGC3ACT)ACT95["ag_cx3:"+k]=AGC3ACT[k]}catch(e){}
Object.assign(window,{p3Cold,p3Free,p3Nun,AG3,P3C,AGC3BTN,AGC3ACT,p3On,p3Run,servDo});
/* ================= 2e part 3 (AG-ALL-2e2): talk / social, household, faction, pregnancy, toilette, maid dilemmas ================= */
/* ---------------- talk topics: ONE builder P3T.<k>(speaker, listener) — her talk (j9 topicOpts) and an NPC↔NPC talk (cx3:talk*) ----------------
   the same chat repeated in a month gives less: the pair count lives on S.chat when she is one of the two (as before), else on the speaker (reset monthly) */
function p3ChatBox(p,v){if(p===S||v===S){S.chat=S.chat||{};return[S.chat,p===S?v.id:p.id]}if(p.chatM!==S.turn){p.chat={};p.chatM=S.turn}return[p.chat,v.id]}
function p3ChatF(p,v){const [b,k]=p3ChatBox(p,v);return 1/(1+(b[k]||0))}
function p3ChatMark(p,v){const [b,k]=p3ChatBox(p,v);b[k]=(b[k]||0)+1}
function p3Who(x){return x===S?"ngươi":x.name}
const P3T={
 health:(p,v)=>{const T=BAL.talk,f=p3ChatF(p,v),n=Math.max(1,Math.round(T.health*f));return{n:"Hỏi han sức khỏe",o:100,x:`nàng quý ngươi +${n}`,
  run:()=>{affAdd(v,p,n);p3ChatMark(p,v);return p===S?`${v.name} cảm động. Nàng quý ngươi +${n}.`:`${p.name} hỏi han sức khỏe ${p3Who(v)}; ${p3Who(v)} quý ${p.name} +${n}`}}},
 praise:(p,v)=>{const T=BAL.talk,f=p3ChatF(p,v),n=Math.max(1,Math.round(nv(v,"praise")*f)),o=talkPraiseO(p);return{n:"Khen tài nghệ nàng",o,x:`nàng quý ngươi +${n}`,
  run:()=>{p3ChatMark(p,v);if(roll(o)){affAdd(v,p,n);return p===S?`${v.name} tươi cười. Nàng quý ngươi +${n}.`:`${p.name} khen tài nghệ ${p3Who(v)}; ${p3Who(v)} quý ${p.name} +${n}`}
   affAdd(v,p,-T.praiseFail);return p===S?`${v.name} cho là ngươi giả lả. Nàng quý ngươi -${T.praiseFail}.`:`${p.name} khen tài nghệ ${p3Who(v)}, bị cho là giả lả`}}},
 gossip:(p,v,third)=>{const T=BAL.talk,G=T.gossip,f=p3ChatF(p,v),n=Math.max(1,Math.round(G.hit*f));return{n:`Bàn tán về ${third.name}`,o:100,
  x:aff(v,third)<0?`nàng ghét người này, hợp chuyện: nàng quý ngươi +${n}`:`kèm: nàng quý ngươi -${G.miss} · nàng có thể mách lại`,
  run:()=>{p3ChatMark(p,v);if(aff(v,third)<0){affAdd(v,p,n);oanAdd(v,third,G.oan);return p===S?`Hai người to nhỏ chuyện ${third.name}. Nàng quý ngươi +${n}.`:`${p.name} và ${p3Who(v)} to nhỏ chuyện ${p3Who(third)}`}
   affAdd(v,p,-G.miss);if(roll(G.tell)){oanAdd(third,p,G.tellOan);return p===S?`${v.name} đem lời ngươi kể lại với ${third.name}. ${third.name} oán ngươi +${G.tellOan}.`:`${p3Who(v)} đem lời ${p.name} bàn tán kể lại với ${p3Who(third)}`}
   return p===S?`${v.name} lảng sang chuyện khác. Nàng quý ngươi -${G.miss}.`:`${p.name} bàn tán về ${p3Who(third)}, ${p3Who(v)} lảng sang chuyện khác`}}},
 secret:(p,v)=>{const T=BAL.talk,f=p3ChatF(p,v),n=Math.max(1,Math.round(T.secret*f));return{n:"Chia sẻ bí mật",o:100,x:`nàng quý ngươi +${n}${v.malice>50?" · nàng có thể nắm thóp ngươi":""}`,
  run:()=>{p3ChatMark(p,v);affAdd(v,p,n);if(v.malice>50&&roll(50)){evA(v,p,BAL.ag.ev.one);return p===S?`${v.name} lắng nghe chăm chú, ghi nhớ từng lời. Nàng quý ngươi +${n}.`:`${p.name} chia sẻ bí mật với ${p3Who(v)}; ${p3Who(v)} ghi nhớ từng lời`}
   return p===S?`${v.name} cũng kể chuyện riêng. Nàng quý ngươi +${n}.`:`${p.name} và ${p3Who(v)} kể chuyện riêng cho nhau`}}}};
function p3Third(p,v){return liveRivals(true).filter(x=>x!==v&&x!==p).sort((a,b)=>aff(v,a)-aff(v,b))[0]||null}
Object.assign(AGC3BTN,{talkHealth:"Hỏi han sức khỏe",talkPraise:"Khen tài nghệ nàng",talkGossip:"Bàn tán về",talkSecret:"Chia sẻ bí mật",invoke:"Nhắc lại ân xưa"});
Object.assign(AGC3ACT,{talkHealth:"sang hỏi han sức khỏe",talkPraise:"sang khen tài nghệ",talkGossip:"ghé tai bàn tán",talkSecret:"sang chia sẻ chuyện riêng",invoke:"nhắc lại ân xưa"});
/* her listener-side options are the same cards: the NPC speaker p picks one listener (friend first) and one topic; target is where the listener is (agAt) */
agReg("consort","par3talk",(v,N,need)=>{const O=[];if(!p3On()||v===S||v.out||v.confined||!v.alive)return O;const X=BAL.ag.par3.talk;if(need&&need!=="ally"&&need!=="spite")return O;
 try{const L=others(v).filter(x=>x&&x!==S&&x!==v&&x.alive!==false&&!x.out);if(!L.length)return O;
  const t=mindPickBy(L,x=>BAL.mind.pick.ag.base+Math.max(0,aff(v,x)),v);if(!t)return O;const at=(kh,vv,tt)=>agAt(tt||t,kh);
  const add=(k,C,g)=>{const x=p3O(v,k,C,N,g,"social",at,t);if(x)O.push(x)};
  add("talkHealth",P3T.health(v,t),X.health);add("talkPraise",P3T.praise(v,t),X.praise);add("talkSecret",P3T.secret(v,t),X.secret);
  const th=p3Third(v,t);if(th){const C=P3T.gossip(v,t,th);if(aff(t,th)<0)add("talkGossip",C,X.gossip)}/* she sees "nàng ghét người này" on the card; the NPC weighs the same line */
  const m=typeof memTop==="function"&&memTop(t,v,1);if(m&&m.g>=BAL.mem.invokeMin)add("invoke",{n:"Nhắc lại ân xưa",o:100},X.invoke);
 }catch(e){agdErr("par3talk",e)}return O});
for(const k of ["health","praise","secret"]){const K="talk"+k.charAt(0).toUpperCase()+k.slice(1);agRunReg("cx3:"+K,(v,t)=>t&&t.alive!==false?p3Res(K,P3T[k](v,t).run()):"")}
agRunReg("cx3:talkGossip",(v,t)=>{if(!t)return"";const th=p3Third(v,t);return th?p3Res("talkGossip",P3T.gossip(v,t,th).run()):""});
agRunReg("cx3:invoke",(v,t)=>t?p3Res("invoke",memInvoke(t,v)):"");
Object.assign(window,{P3T,p3ChatF,p3ChatMark});
/* ---------------- household: the same functions as her Cung nhân tab (j8 itemTest, j14 recommend / searchMaids, j29 hireTake, j10 threatServ, staffTam) ---------------- */
function staffTam(m,s){s.loyal=cl((s.loyal||0)+BAL.eff.jhouse.loyalRun,0,100);return m===S?`${s.name} được ngươi hỏi han: lòng ${balSg(BAL.eff.jhouse.loyalRun)}.`:`${m.name} tâm sự với ${s.name}`}
/* Nội vụ phủ hands a candidate over (her hireCard choice / an NPC's pick); paid = her option already took the bạc */
function hireTake(m,role,s,paid){const P=npool()[role];const i=P.indexOf(s);if(i>=0)P.splice(i,1);if(!paid)ap(m,{bac:-BAL.ag.par3.hire.bac});(m.staff=m.staff||[]).push(s);return m===S?"":`${m.name} nhận ${s.name} từ Nội vụ phủ`}
function p3HireRole(v){if((v.bac||0)<BAL.ag.par3.hire.bac)return null;const [cm,ce]=capOf(v);const n=r=>(v.staff||[]).filter(s=>s.role===r&&!s.out).length;
 let P;try{P=npool()}catch(e){return null}if(n("maid")<cm&&(P.maid||[]).length)return"maid";if(n("eunuch")<ce&&(P.eunuch||[]).length)return"eunuch";return null}
function p3TestIx(v){return p3Inv(v,(e,it)=>e.from&&e.from!==key(v)&&e.from!=="emp"&&e.from!=="th"&&!e.tested?1:null)}
function p3ThreatT(v){const K=v.knowDT||[];if(!K.length)return null;const L=allServ().filter(s=>s.lover&&K.includes(s.sid)&&!s.spyFor&&ownerOf(s)&&ownerOf(s)!==v&&ownerOf(s)!==S&&agSpite(v,ownerOf(s))>0);
 return L.length?mindPickBy(L,s=>agSpite(v,ownerOf(s)),v):null}
Object.assign(AGC3BTN,{test:"Nghiệm độc",hire:"Thêm cung nữ",staffTam:"Tâm sự",staffUp:"Tiến cử",search:"Chưởng sự tra xét cung nữ",threat:"Dọa tố"});
Object.assign(AGC3ACT,{test:"đem quà được tặng đi nghiệm độc",hire:"xin Nội vụ phủ thêm người",staffTam:"tâm sự với kẻ hầu",staffUp:"tiến cử kẻ hầu",search:"cho chưởng sự tra xét cung nữ",threat:"dọa tố chuyện đối thực"});
agReg("consort","par3house",(v,N,need)=>{const O=[];if(!p3On()||v===S||v.out||!v.alive)return O;const X=BAL.ag.par3,H=X.house;const nd=g=>!need||g[need]!=null;const P=x=>x&&O.push(x);
 try{if(nd(X.test.g)&&(v.bac||0)>=X.test.bac&&p3TestIx(v)>=0)P(p3O(v,"test",{n:"Nghiệm độc",c:{bac:-X.test.bac},o:100},N,X.test.g,"self",()=>"tyv"));
  if(nd(X.hire.g)&&p3HireRole(v))P(p3O(v,"hire",{n:"Thêm cung nữ",c:{bac:-X.hire.bac},o:100},N,X.hire.g,"staff"));
  const st=(v.staff||[]).filter(s=>s&&!s.out);
  if(nd(H.gTam)&&st.some(s=>(s.loyal||0)<H.tamBelow))P(p3O(v,"staffTam",{n:"Tâm sự",c:{},o:100},N,H.gTam,"staff"));
  if(nd(H.gUp)&&(v.bac||0)>=BAL.house.upBac&&st.some(s=>(s.loyal||0)>=H.upLoyal))P(p3O(v,"staffUp",{n:"Tiến cử",c:{bac:-BAL.house.upBac,danh:-BAL.house.upDanh},o:100},N,H.gUp,"staff"));
  if(nd(H.gSearch)&&v.p3SearchM!==S.turn&&st.some(s=>s.role==="maid"&&srk(s)>=3))P(p3O(v,"search",{n:"Tra xét",c:{},o:100,k:2},N,H.gSearch,"staff"));
  if(nd(H.gThreat)){const s=p3ThreatT(v);if(s)P(p3O(v,"threat",{n:"Dọa tố",c:{},o:100},N,H.gThreat,"scheme",(kh)=>agAt(ownerOf(s),kh),ownerOf(s)))}
 }catch(e){agdErr("par3house",e)}return O});
agRunReg("cx3:test",v=>{const i=p3TestIx(v);return i<0?"":p3Res("test",itemTest(v,i))});
agRunReg("cx3:hire",v=>{const r=p3HireRole(v);if(!r)return"";const P=npool()[r];const s=mindPickBy(P,()=>1,v);return s?p3Res("hire",hireTake(v,r,s)):""});
agRunReg("cx3:staffTam",v=>{const L=(v.staff||[]).filter(s=>s&&!s.out&&(s.loyal||0)<BAL.ag.par3.house.tamBelow);if(!L.length)return"";const s=L.sort((a,b)=>(a.loyal||0)-(b.loyal||0))[0];return p3Res("staffTam",staffTam(v,s))});
agRunReg("cx3:staffUp",v=>{const L=(v.staff||[]).filter(s=>s&&!s.out&&(s.loyal||0)>=BAL.ag.par3.house.upLoyal);if(!L.length)return"";const s=L.sort((a,b)=>(b.loyal||0)-(a.loyal||0))[0];return p3Res("staffUp",recommend(s.sid,v))});
agRunReg("cx3:search",v=>{v.p3SearchM=S.turn;return p3Res("search",searchMaids(v))});
agRunReg("cx3:threat",v=>{const s=p3ThreatT(v);return s?p3Res("threat",String(threatServ(v,s)||"").trim()):""});
Object.assign(window,{itemTest,hireTake,staffTam,recommend,searchMaids});
/* ---------------- phe phái: Lập phe cùng · Xin vào phe · Rời phe · Bán đứng · Ly gián (j10 facAct for her = found / askJoin / leaveFac / sellOut / divide; the same for an NPC) ---------------- */
function p3FacOn(){return p3On()&&!!BAL.ag.par3.fac}
function p3FacFr(v){const F=BAL.ag.par3.fac;return others(v).filter(x=>x&&x!==S&&x.alive&&!x.out&&!facOf(x)&&!sameHouse(v,x)&&(aff(v,x)>=F.frAff||clanOf(v)===clanOf(x)&&aff(v,x)>=F.clanAff||consorts().some(e=>e!==v&&e!==x&&oan(v,e)>=F.sharedOan&&oan(x,e)>=F.sharedOan)))}
function p3FacJoin(v){const F=BAL.ag.par3.fac;return (S.facs||[]).filter(f=>{const l=facLeader(f);return l&&l!==S&&aff(v,l)>=F.clanAff})}
function p3FacFoe(v){const F=BAL.ag.par3.fac;const mine=facOf(v);return (S.facs||[]).filter(f=>f!==mine&&facMembers(f).filter(x=>x!==v).length>=2&&facMembers(f).reduce((s,m)=>s+agSpite(v,m),0)/facMembers(f).length>=F.foeOan)}
Object.assign(AGC3BTN,{facFound:"Lập phe cùng",facJoin:"Xin vào phe",facLeave:"Rời phe",facSell:"Bán đứng",facDiv:"Ly gián"});
Object.assign(AGC3ACT,{facFound:"rủ người lập phe",facJoin:"xin vào phe",facLeave:"rời phe",facSell:"bán đứng phe mình",facDiv:"ly gián một phe"});
agReg("consort","par3fac",(v,N,need)=>{const O=[];if(!p3FacOn()||v===S||v.out||!v.alive||v.p3FacM===S.turn)return O;const F=BAL.ag.par3.fac;const nd=g=>!need||g[need]!=null;const P=x=>x&&O.push(x);
 try{const f=facOf(v);const k={n:"",c:{},o:100,k:F.k};
  if(!f){if(nd(F.gFound)){const L=p3FacFr(v);if(L.length){const x=mindPickBy(L,y=>BAL.mind.pick.j10fr.base+Math.max(0,aff(v,y)),v);if(x)P(p3O(v,"facFound",k,N,F.gFound,"social",(kh)=>agAt(x,kh),x))}}
   if(nd(F.gJoin)){const L=p3FacJoin(v);if(L.length){const g=mindPickBy(L,f2=>BAL.mind.pick.j10fr.base+Math.max(0,aff(v,facLeader(f2))),v);const l=facLeader(g);
    P(p3O(v,"facJoin",{n:"Xin vào phe",c:{},o:odA(v,30+aff(l,v)/2+(clanOf(v)===clanOf(l)?15:0)+rkOf(v)*3),k:F.k},N,F.gJoin,"social",(kh)=>agAt(l,kh),l))}}}
  else{const l=facLeader(f);if(l&&l!==v&&aff(v,l)<0){if(nd(F.gLeave))P(p3O(v,"facLeave",{n:"Rời phe",c:{},o:100,k:0},N,F.gLeave,"self"));
    if(nd(F.gSell)&&queenP()&&queenP()!==v)P(p3O(v,"facSell",k,N,F.gSell,"scheme",(kh)=>agAt(queenP(),kh),queenP()))}}
  if(nd(F.gDiv)){const L=p3FacFoe(v);if(L.length){const g=mindPickBy(L,f2=>facMembers(f2).reduce((s,m)=>s+agSpite(v,m),0),v);P(p3O(v,"facDiv",{n:"Ly gián",c:{},o:odA(v,40+(v.tamco||0)/3),k:F.k},N,F.gDiv,"scheme",null,facLeader(g)))}}
 }catch(e){agdErr("par3fac",e)}return O});
function p3FacRes(v,k,r){v.p3FacM=S.turn;r=String(r||"").trim();if(r&&typeof seenNPC==="function"){const s=seenNPC(v,v,r);if(s)try{log(s)}catch(e){}}return p3Res(k,r)}
agRunReg("cx3:facFound",(v,t)=>t&&!facOf(v)&&!facOf(t)?p3FacRes(v,"facFound",found(v,t)):"");
agRunReg("cx3:facJoin",(v,l)=>{const g=l&&facOf(l);return g&&!facOf(v)?p3FacRes(v,"facJoin",askJoin(v,g)):""});
agRunReg("cx3:facLeave",v=>facOf(v)?p3FacRes(v,"facLeave",leaveFac(v)):"");
agRunReg("cx3:facSell",v=>facOf(v)?p3FacRes(v,"facSell",sellOut(v)):"");
agRunReg("cx3:facDiv",(v,l)=>{const g=l&&facOf(l);return g&&g!==facOf(v)?p3FacRes(v,"facDiv",divide(v,g)):""});
Object.assign(window,{p3FacOn});
