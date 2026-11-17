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
