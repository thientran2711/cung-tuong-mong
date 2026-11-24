/* ================= jdh3: DANH HIỆU part 3 — TITLES2 (owner OD 23/11 ~22:45Z Q + ~22:55Z "tiến hành làm luôn"; brief E55, review/titles2) =================
   Expert first (law 8): dev/handover/reports/titles2-expert.md (E54). Reuses jdh (DH_CAT, p.dh, dhObj, dhInc, the Danh hiệu panel) and KIT §82 / §82.1
   (kitTitlePlate with the two tones: sh "t" thiện = gold-white, sh "a" ác = gold-crimson; kit panel / rows only). Every number: BAL.dh.rp / BAL.dh.cp (jbal2).
   PART A «DANH TIẾNG» — reputation titles gán by public opinion. rpSync(p) is the ONE rule for her and every NPC consort (law 1): it reads the person's
     state (stats, rank, kids, bạc, maid, nights) and her DEEDS (p.rep.d, written by the shared two-way hooks: caught / punish / fall / framed / deathSentence /
     econPayWin rumor+accuse / kidDie, and state changes seen by rpSync: lãnh cung, release, a new child, a new scheme). Held → p.dh["rp_<id>"] = {n:1,i:0,at};
     lost → deleted (history in p.rep.h). Never worn (jdh wearOK); while HELD it gives ONE gain and ONE loss (laws 2/3) through the jdh hooks (dhRepB additive,
     dhRepG shares) + caughtOdds (muu / kin). NPC rules run on the co-op host only (npcOK, same as jdh); her seat earns hers; the friend entry shows hers (LOOK dh).
   PART B «CHÍNH TRUYỆN» / «PHỤ TUYẾN» — achievement titles (worn like every jdh title), good (sh t) or bad (sh a) by HOW the line was closed:
     roads (one good + one bad title per road, one step per closed chapter .4–.11), side arcs, j72 việc nhờ kinds, j70 mưu hại roles, j71 lập công families.
   Old saves: p.rep is created on first sync (deeds start empty; the state rules hold at once); nothing else is read that an old save lacks. */
(function(){try{
const RB=()=>BAL.dh.rp,CB=()=>BAL.dh.cp;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const mi=()=>{try{return ((S&&S.year)||0)*12+((S&&S.month)||0)}catch(e){return 0}};
const npcOK=()=>!(window.COOPW&&COOPW.on&&COOPW.seat!=="a");
const isP=p=>!!p&&typeof p==="object"&&!p.coop&&(p===S||(typeof rivals==="object"&&rivals.includes(p)));
const canRun=p=>isP(p)&&(p===S||npcOK());
const rk=p=>{try{return typeof rkOf==="function"?rkOf(p):(p.queen?7:p.rank||0)}catch(e){return p.rank||0}};
const live=p=>p===S?!!S&&!S.dead&&!S.out:!!p&&p.alive&&!p.out;
const pool=()=>{try{return [S].concat(rivals||[]).filter(v=>v&&live(v))}catch(e){return []}};
const NUMV=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín","mười"];
const nW=n=>n<=10?NUMV[n]:String(n);
const PH={2:"một nửa",3:"một phần ba",4:"một phần tư",5:"một phần năm",6:"một phần sáu",8:"một phần tám",10:"một phần mười",12:"một phần mười hai"};
const ph=d=>PH[d]||`một phần ${d}`;
const fr=(n,d)=>{if(!(n>0)||!d)return 0;const x=n/d;return Math.floor(x)+(Math.random()<x%1?1:0)};

/* =================== PART A — DANH TIẾNG =================== */
/* id → [name, tone, why (how it was earned), lost when] — player words per VANPHONG (no numbers; thresholds live in BAL.dh.rp.T) */
const RP={
 hien:["Hiền lương thục đức","t","Đức hạnh và Danh tiếng đều rất cao, chưa từng bị lộ mưu","bị lộ mưu, bị kết tội, hoặc Đức hay Danh sa sút"],
 quocsac:["Quốc sắc thiên hương","t","nhan sắc cao nhất hậu cung","có người đẹp hơn, hoặc nhan sắc phai"],
 vinhnhu:["Vịnh nhứ chi tài","t","tài học rất cao, từng đứng đầu hội thơ hay hội câu đối","tài học sa sút"],
 trithu:["Tri thư đạt lễ","t","tài học khá, Đức hạnh tốt, lâu nay không phạm lỗi bị phạt","bị phạt, hoặc Đức sa sút"],
 khoan:["Khoan hậu","t","cung nữ hết lòng trung thành, Đức hạnh tốt","cung nữ sinh lòng khác, hoặc Đức sa sút"],
 cankiem:["Cần kiệm","t","bạc để dành nhiều mà sống có chừng mực","bạc tiêu gần hết, hoặc Đức sa sút"],
 phuctinh:["Phúc tinh","t","con cái đông đủ, lâu nay chưa mất đứa nào","con mất, hoặc con không còn đông đủ"],
 maubang:["Mẫu bằng tử quý","t","con trai được lập làm Thái tử","con không còn ở ngôi Thái tử"],
 nhannhuc:["Nhẫn nhục phụ trọng","t","ra khỏi cấm túc hay lãnh cung mà không làm càn","bị phạt lần nữa, hoặc lâu ngày người ta quên"],
 niebann:["Phượng hoàng niết bàn","t","từng vào lãnh cung, nay lại lên hàng phẩm cao","lại sa sút phẩm vị, hoặc lại vào lãnh cung"],
 trungcan:["Trung can nghĩa đảm","t","nhiều lần tố giác kẻ có tội bằng chứng cứ thật","chính mình bị lộ mưu, hoặc lâu không tố giác ai"],
 phonghoa:["Phong hoa tuyệt đại","t","cả nhan sắc lẫn tài học đều gần tột bậc","nhan sắc hay tài học sa sút"],
 khiem:["Khiêm cung","t","phẩm cao, được sủng, Đức tốt mà không bày mưu hại ai","bày mưu, Đức sa sút, hoặc tụt phẩm"],
 hoathuy:["Hồng nhan họa thủy","a","được sủng nhất hậu cung trong khi Thái hậu không ưa","Sủng giảm, hoặc Thái hậu nguôi lòng"],
 khuynh:["Khuynh quốc khuynh thành","a","nhan sắc tột bậc, đẹp nhất hậu cung","nhan sắc phai, hoặc có người đẹp hơn"],
 docphu:["Độc phụ","a","mưu hạ độc, hại thai bị lộ, hoặc bị kết tội","lâu ngày không thêm tội và Đức hồi lại"],
 vuco:["Vu cổ","a","mưu vu oan bằng bùa ngải bị lộ","lâu ngày không ai nhắc lại"],
 kieu:["Kiêu phi","a","phẩm cao, được sủng mà Đức kém","Đức hồi lại, tụt phẩm, hoặc mất sủng"],
 chuyensung:["Chuyên sủng","a","được thị tẩm liền nhiều đêm trong mấy tháng gần đây","ít được thị tẩm"],
 homi:["Hồ mị hoặc chủ","a","phẩm thấp mà được sủng rất cao","mất sủng, hoặc lên phẩm cao"],
 thatduc:["Thất đức","a","Đức sa sút tột cùng, lại vừa bị phạt hay bị kết tội","Đức hồi lại"],
 tham:["Tham tài","a","bạc chất đầy mà Đức kém","bạc vơi đi, hoặc Đức hồi lại"],
 truongthiet:["Trường thiệt phụ","a","nhiều lần tung tin đồn thành công trong năm","im lặng một thời gian"],
 dophu:["Đố phụ","a","lòng ghen rất nặng, lại vừa bày mưu hại người","lòng ghen nguôi"],
 tuhoa:["Tú hoa chẩm đầu","a","nhan sắc cao mà tài học, Đức hạnh, tâm cơ đều kém","học thêm, sửa Đức, có thêm tâm cơ, hoặc nhan sắc phai"],
 thambat:["Thâm bất khả trắc","a","tâm cơ cực cao, bày nhiều mưu mà chưa từng bị lộ","bị lộ mưu, hoặc tâm cơ sa sút"],
 hamoan:["Hàm oan","a","bị vu oan mà vẫn phải chịu tội","kẻ vu oan bị kết tội, hoặc lâu ngày người ta quên"],
 bacmenh:["Hồng nhan bạc mệnh","a","nhan sắc đẹp mà vừa mất con","sinh được con, hoặc lâu ngày nguôi ngoai"]};
/* the effect words (kinds: see the BAL.dh.rp note) */
const SHL={sung:"Sủng",danh:"Danh",bac:"Bạc thu vào",tren:"Thái hậu, Hoàng hậu quý mến",trung:"Thiện cảm của cung nữ",hau:"Phi tần quý mến"};
const deg=v=>{v=Math.abs(v);const D=RB().deg;return v<=D[0]?"hơn một chút":v<=D[1]?"hơn":"hơn hẳn"};/* the size words of the additive kinds (BAL.dh.rp.deg) */
function fxW(k,v){if(!v)return "";if(SHL[k])return v>0?`${SHL[k]} được thêm ${ph(v)}`:`${SHL[k]} bớt đi ${ph(-v)}`;
 switch(k){case"danhLoss":return `Mất Danh nặng thêm ${ph(v)}`;case"phuc":return v>0?"Phúc khí thêm: việc may rủi dễ thành hơn":"Phúc khí kém: việc may rủi khó thành hơn";
  case"thi":return v>0?"Hội thi: thêm chút tài nghệ":"Hội thi: kém chút tài nghệ";case"suc":return v>0?"Ngủ dậy lại Sức thêm":"Ngủ dậy lại Sức kém hơn";
  case"nghe":return v>0?"Tự học tài nghệ: đôi khi tiến thêm":"Tự học tài nghệ: chậm hơn";case"don":return v>0?`Tin đồn khó lan ${deg(v)}`:`Tin đồn dễ lan ${deg(v)}`;
  case"muu":return v>0?`Mưu hại nhắm vào dễ bị lộ ${deg(v)}`:`Mưu hại nhắm vào dễ thành ${deg(v)}`;case"kin":return v>0?`Mưu tự bày khó bị lộ ${deg(v)}`:`Mưu tự bày dễ bị lộ ${deg(v)}`}return ""}
const rT=id=>(RB().T||{})[id]||{};
const RKEY=id=>"rp_"+id;
/* catalogue entries (DH_CAT, group «Danh tiếng») + their plate tier */
function rpCat(){if(typeof DH_CAT!=="object")return;BAL.dh.T=BAL.dh.T||{};for(const id in RP){const [n,sh,why,lost]=RP[id],t=rT(id);
 DH_CAT[RKEY(id)]={n,g:"dt",sh,rep:1,how:()=>`Người đời gọi vậy vì ${why}. Mất danh này khi ${lost}.`,fx:()=>`Được: ${fxW(t.g[0],t.g[1])} · Mất: ${fxW(t.l[0],t.l[1])}`};
 BAL.dh.T[RKEY(id)]={b:RB().b[sh],n:[1],ch:[]}}}
rpCat();
/* ---- the deed book ---- */
function rep(p){if(!p.rep||typeof p.rep!=="object")p.rep={};const r=p.rep;r.d=r.d||{};r.h=r.h||{};return r}
function deed(p,k){if(!canRun(p))return;const r=rep(p);const L=r.d[k]||(r.d[k]=[]);L.push(mi());if(L.length>RB().mem)L.splice(0,L.length-RB().mem)}
const nIn=(p,k,m)=>{const L=((p.rep||{}).d||{})[k]||[];const t=mi();return L.filter(x=>t-x<m).length};
const ago=(p,k)=>{const L=((p.rep||{}).d||{})[k]||[];return L.length?mi()-L[L.length-1]:1e9};
window.rpDeed=deed;
const held=(p,id)=>!!(p&&p.dh&&p.dh[RKEY(id)]&&p.dh[RKEY(id)].i>=0);
const topOf=(p,k)=>{const L=pool();if(!L.includes(p))return false;const v=p[k]||0;return L.every(x=>x===p||(x[k]||0)<v)};
const kidsLive=p=>(p.kids||[]).filter(k=>k&&k.alive).length;
const isHeirMom=p=>(p.kids||[]).some(k=>k&&k.alive&&k.heir);
const nightsIn=p=>{const r=rep(p),L=r.nm||[];const m=mi()-RB().night;const old=L.find(x=>x[0]>=m)||L[0];return old?Math.max(0,(p.nights||0)-old[1]):0};
const maidL=p=>(p.maid&&p.maid.loyal)||0;
/* ---- the rules: [earn now?, keep while held?] — the same for her and every NPC (law 1) ---- */
const RULE={
 hien:(p,t)=>[(p.duc||0)>=t.duc&&(p.danh||0)>=t.danh&&ago(p,"lo")>=t.clean&&ago(p,"toi")>=t.clean,(p.duc||0)>=t.offDuc&&(p.danh||0)>=t.offDanh&&ago(p,"lo")>0&&ago(p,"toi")>0],
 quocsac:(p,t)=>[(p.sac||0)>=t.sac&&topOf(p,"sac")&&!held(p,"khuynh"),(p.sac||0)>=t.off&&topOf(p,"sac")&&!held(p,"khuynh")],
 vinhnhu:(p,t)=>{const w=((p.dh||{}).w_tho||{}).n||((p.dh||{}).w_doi||{}).n||0;return [(p.tai||0)>=t.tai&&w>0,(p.tai||0)>=t.off]},
 trithu:(p,t)=>[(p.tai||0)>=t.tai&&(p.duc||0)>=t.duc&&ago(p,"phat")>=t.clean,(p.duc||0)>=t.offDuc&&ago(p,"phat")>0],
 khoan:(p,t)=>[maidL(p)>=t.loy&&(p.duc||0)>=t.duc,maidL(p)>=t.offLoy&&(p.duc||0)>=t.offDuc],
 cankiem:(p,t)=>[(p.bac||0)>=t.bac&&(p.duc||0)>=t.duc,(p.bac||0)>=t.offBac&&(p.duc||0)>=t.duc-10],
 phuctinh:(p,t)=>[kidsLive(p)>=t.kids&&ago(p,"con")>=t.clean,kidsLive(p)>=t.kids&&ago(p,"con")>0],
 maubang:(p,t)=>[isHeirMom(p),isHeirMom(p)],
 nhannhuc:(p,t)=>[ago(p,"esc")<t.win&&!p.confined&&!p.out&&ago(p,"lo")>ago(p,"esc"),ago(p,"esc")<t.keep&&ago(p,"phat")>ago(p,"esc")&&!p.confined&&!p.out],
 niebann:(p,t)=>[!!rep(p).cold&&!p.out&&rk(p)>=t.rank,!p.out&&rk(p)>=t.offRank],
 trungcan:(p,t)=>[nIn(p,"to",t.win)>=t.n&&(p.duc||0)>=t.duc&&ago(p,"lo")>=t.win,nIn(p,"to",t.win)>0&&ago(p,"lo")>ago(p,"to")],
 phonghoa:(p,t)=>[(p.sac||0)>=t.sac&&(p.tai||0)>=t.tai,(p.sac||0)>=t.off&&(p.tai||0)>=t.off],
 khiem:(p,t)=>[rk(p)>=t.rank&&(p.sung||0)>=t.sung&&(p.duc||0)>=t.duc&&ago(p,"mu")>=t.clean,rk(p)>=t.rank&&(p.duc||0)>=t.offDuc&&ago(p,"mu")>0],
 hoathuy:(p,t)=>[(p.sung||0)>=t.sung&&topOf(p,"sung")&&(p.th||0)<t.th,(p.sung||0)>=t.offSung&&(p.th||0)<t.offTh],
 khuynh:(p,t)=>[(p.sac||0)>=t.sac&&topOf(p,"sac"),(p.sac||0)>=t.off&&topOf(p,"sac")],
 docphu:(p,t)=>{const a=Math.min(ago(p,"loN"),ago(p,"toi"));return [a<t.win,a<t.win||(p.duc||0)<t.offDuc]},
 vuco:(p,t)=>[ago(p,"vu")<t.win,ago(p,"vu")<t.win],
 kieu:(p,t)=>[rk(p)>=t.rank&&(p.sung||0)>=t.sung&&(p.duc||0)<t.duc,rk(p)>=t.rank&&(p.sung||0)>=t.offSung&&(p.duc||0)<t.offDuc],
 chuyensung:(p,t)=>{const n=nightsIn(p);return [n>=t.nights,n>t.off]},
 homi:(p,t)=>[(p.sung||0)>=t.sung&&rk(p)<=t.rank,(p.sung||0)>=t.offSung&&rk(p)<t.offRank],
 thatduc:(p,t)=>[(p.duc||0)<t.duc&&Math.min(ago(p,"phat"),ago(p,"toi"))<t.win,(p.duc||0)<t.offDuc],
 tham:(p,t)=>[(p.bac||0)>=t.bac&&(p.duc||0)<t.duc,(p.bac||0)>=t.offBac&&(p.duc||0)<t.offDuc],
 truongthiet:(p,t)=>[nIn(p,"don",t.win)>=t.n,ago(p,"don")<t.quiet],
 dophu:(p,t)=>[(p.ghen||0)>=t.ghen&&ago(p,"mu")<t.win,(p.ghen||0)>=t.off],
 tuhoa:(p,t)=>[(p.sac||0)>=t.sac&&(p.tai||0)<t.tai&&(p.duc||0)<t.duc&&(p.tamco||0)<t.tamco,(p.sac||0)>=t.offSac&&(p.tai||0)<t.offTai&&(p.duc||0)<t.offDuc&&(p.tamco||0)<t.offTam],
 thambat:(p,t)=>[(p.tamco||0)>=t.tamco&&nIn(p,"mu",t.win)>=t.n&&ago(p,"lo")>=t.win,(p.tamco||0)>=t.off&&ago(p,"lo")>ago(p,"mu")],
 hamoan:(p,t)=>[ago(p,"oan")<t.win&&!rep(p).clr,ago(p,"oan")<t.keep&&!rep(p).clr],
 bacmenh:(p,t)=>[(p.sac||0)>=t.sac&&ago(p,"con")<t.win&&ago(p,"sinh")>ago(p,"con"),ago(p,"con")<t.win&&ago(p,"sinh")>ago(p,"con")]};
window.RP_RULE=RULE;
function when(){try{return typeof VP==="object"&&VP.date?VP.date(S.month,S.year):""}catch(e){return ""}}
/* state changes the deed book reads (lãnh cung in / out, released, a new child, a new scheme, the nights window) */
function snap(p){const r=rep(p),o=r.s||{};const t=mi();const out=!!p.out,cf=(p.confined||0)>0,nk=(p.kids||[]).length,sc=p.schemes||0;
 if(r.s){if(out&&!o.out)r.cold=1;if((o.out&&!out)||(o.cf&&!cf&&!out))deed(p,"esc");if(nk>o.nk)deed(p,"sinh");if(sc>o.sc)deed(p,"mu")}else if(out)r.cold=1;
 r.s={out,cf,nk,sc};const L=r.nm||(r.nm=[]);if(!L.length||L[L.length-1][0]!==t)L.push([t,p.nights||0]);while(L.length>RB().night+1)L.shift()}
function rpSync(p,quiet){if(!canRun(p))return [];snap(p);const D=p.dh||(p.dh={}),got=[],lost=[];
 for(const id in RP){const f=RULE[id];if(!f)continue;let r;try{r=f(p,rT(id))}catch(e){continue}const k=RKEY(id),h=held(p,id);
  if(!h&&r[0]){D[k]={n:1,i:0,at:[when()]};const H=rep(p).h[id]||(rep(p).h[id]={g:0});H.g++;H.at=mi();got.push(id)}
  else if(h&&!r[1]){delete D[k];const H=rep(p).h[id]||(rep(p).h[id]={g:1});H.out=mi();lost.push(id);if((p===S?S.titleWorn:p.titleWorn)==="dh-"+k){if(p===S)S.titleWorn=null;else p.titleWorn=null}}}
 if(p===S&&!quiet){lost.forEach(id=>{try{log(`Người đời thôi gọi ngươi là «${RP[id][0]}».`)}catch(e){}});got.forEach(rpNotice)}
 return got}
window.rpSync=rpSync;
/* her new reputation title: a kit panel (reward for a good name, info for a bad one) with the plate + Vì sao / Được / Mất / Mất khi */
function rpNotice(id){try{const o=typeof dhObj==="function"&&dhObj(S,RKEY(id));if(!o||typeof kitPanel!=="function")return;const [n,sh,why,lost]=RP[id],t=rT(id);
 log(`Người đời bắt đầu gọi ngươi là «${n}».`);
 kitPanel({kind:sh==="t"?"reward":"info",title:sh==="t"?"Tiếng thơm":"Tiếng xấu",sub:o.when,dh:1,sections:[{h:"",html:`<div class="kt3">${kitTitlePlate(o)}</div>`},
  {h:"",rows:[["Vì sao",esc(why)],["Được",esc(fxW(t.g[0],t.g[1]))],["Mất",esc(fxW(t.l[0],t.l[1]))],["Mất khi",esc(lost)],["Xem lại","Nhiệm vụ › Danh hiệu"]]}],
  opts:[{n:"Đã hiểu",fx:{},x:"danh tiếng do người đời gán, không đeo hay tháo được",go:()=>{}}]})}catch(e){console.error("rp",e)}}
/* the info card of a reputation plate (tap a plate): the same kit info panel, with the words of a gán title (not «Khi đeo») */
(function(){const o0=window.kitTitleOpen;if(typeof o0!=="function")return;window.kitTitleOpen=kitTitleOpen=function(t){try{const id=typeof t==="string"?t:t&&t.id;const m=/^dh-rp_([a-z]+)@?(.*)$/.exec(String(id||""));
  if(m&&RP[m[1]]&&typeof kitModal==="function"){const d=kitTitleDef(id);if(d){const [n,sh,why,lost]=RP[m[1]],x=rT(m[1]);
   kitModal({kind:"info",title:n,sub:sh==="t"?"Danh tiếng · tiếng thơm":"Danh tiếng · tiếng xấu",sections:[{h:"",rows:[["Người đời gọi từ",d.when||"—",""],["Vì sao",why,""],["Được",fxW(x.g[0],x.g[1]),""],["Mất",fxW(x.l[0],x.l[1]),""],["Mất khi",lost,""]]}],btn:"Đã hiểu"});return}}}catch(e){console.error("rp",e)}
  return o0.apply(this,arguments)}})();
/* ---- the effects while held ---- */
function heldIds(p){if(!p||!p.dh||p.coop)return [];const L=[];for(const id in RP)if(p.dh[RKEY(id)]&&p.dh[RKEY(id)].i>=0)L.push(id);return L}
function sumK(p,k){let v=0;for(const id of heldIds(p)){const t=rT(id);if(t.g&&t.g[0]===k)v+=t.g[1];if(t.l&&t.l[0]===k)v+=t.l[1]}return v}
function sharesK(p,k){const L=[];for(const id of heldIds(p)){const t=rT(id);if(t.g&&t.g[0]===k)L.push(t.g[1]);if(t.l&&t.l[0]===k)L.push(t.l[1])}return L}
const ADD=new Set(["phuc","thi","suc","nghe","don"]);
window.dhRepB=function(p,t){try{return ADD.has(t)?sumK(p,t):0}catch(e){return 0}};
const GK={sung:"sung",danh:"danh",bac:"bac",th:"tren",hh:"tren",maid:"trung",hau:"hau"};
/* the extra of ONE gain v of stat k for person p (stochastic rounding like jdh fr): Σ ± v/|d|; a Danh loss: Σ v/d heavier */
window.dhRepG=function(p,k,v){try{if(!isP(p)||!v)return 0;let x=0;
 if(v>0){const t=GK[k];if(!t)return 0;let f=0;for(const d of sharesK(p,t))f+=1/d;if(!f)return 0;const a=v*Math.abs(f);x=(f>0?1:-1)*(Math.floor(a)+(Math.random()<a%1?1:0));if(x<0)x=Math.max(x,-v)}
 else if(k==="danh"){let f=0;for(const d of sharesK(p,"danhLoss"))f+=1/d;if(!f)return 0;x=-fr(-v,1/f)}return x}catch(e){return 0}};
/* muu (the eyes on the TARGET) and kin (the DOER's cover): the ONE caught chance (j8 caughtOdds; caught / jagharm / jpoison / j63 / j83 read it) */
(function(){if(typeof caughtOdds!=="function")return;const c0=caughtOdds;caughtOdds=function(a,t,ps){const r=c0.apply(this,arguments);try{const d=sumK(t,"muu")-sumK(a,"kin");if(d)return oddsCl(r+d)}catch(e){}return r}})();
/* ---- the deed hooks (two-way: a and t are her or any NPC) ---- */
let EXC=null;/* the doers caught during one j70 exec70 (Part B mưu hại roles) */
(function(){if(typeof caught!=="function")return;const c0=caught;caught=function(a,t,ps,desc){const r=c0.apply(this,arguments);try{if(r&&a){deed(a,"lo");if(ps)deed(a,"loN");if(/bùa ngải/.test(String(desc||"")))deed(a,"vu");if(EXC)EXC.add(a)}}catch(e){console.error("rp",e)}return r}})();
(function(){if(typeof punish!=="function")return;const f0=punish;punish=function(p,why,sev){const r=f0.apply(this,arguments);try{const q=typeof p==="string"?S:p,w=typeof p==="string"?p:why;deed(q,"phat");if(/vu oan/.test(String(w||"")))deed(q,"vu")}catch(e){}return r}})();
function convicted(p){deed(p,"toi");try{const kp=typeof key==="function"?key(p):null;for(const v of [S].concat(rivals||[]))if(v&&v!==p&&kp!=null&&String(v.framedBy)===String(kp)&&canRun(v)){rep(v).clr=mi();cpGive(v,"mh_minh")}}catch(e){}}
(function(){if(typeof fall!=="function")return;const f0=fall;fall=function(p,why){const r=f0.apply(this,arguments);try{convicted(p)}catch(e){}return r}})();
(function(){if(typeof deathSentence!=="function")return;const f0=deathSentence;deathSentence=function(p,why){const r=f0.apply(this,arguments);try{const q=typeof p==="string"?S:p,w=typeof p==="string"?p:why;convicted(q);if(/độc|mưu hại|thai/.test(String(w||"")))deed(q,"loN")}catch(e){}return r}})();
(function(){if(typeof framed!=="function")return;const f0=framed;framed=function(p,why){const r=f0.apply(this,arguments);try{deed(p,"oan");if(p&&p.rep)delete p.rep.clr}catch(e){}return r}})();
(function(){if(typeof econPayWin!=="function")return;const f0=econPayWin;econPayWin=function(a,k,t){const r=f0.apply(this,arguments);try{if(k==="rumor")deed(a,"don");else if(k==="accuse"){deed(a,"to");cpGive(a,"mh_vach")}}catch(e){}return r}})();
(function(){if(typeof kidDie!=="function")return;const f0=kidDie;kidDie=function(k){let mom=null;try{mom=[S].concat(rivals||[]).find(v=>v&&(v.kids||[]).includes(k))}catch(e){}const r=f0.apply(this,arguments);try{if(mom)deed(mom,"con")}catch(e){}return r}})();
/* ---- sync points: her every turn (like jdh dhSync), NPCs monthly on the host ---- */
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){rpSync(S);cpMisc(S)}}catch(e){console.error("rp",e)}return r}})();
(function(){if(typeof rivalsMonth!=="function")return;const f0=rivalsMonth;rivalsMonth=function(){const r=f0.apply(this,arguments);try{if(npcOK())for(const v of rivals)if(v&&v.alive&&!v.coop)rpSync(v,true)}catch(e){console.error("rp",e)}return r}})();
/* the NPC list (consort card, j15 rvCard → relLines): what people call her — plain kit text line, never a plate (KIT §82: no plate in lists / cards) */
(function(){if(typeof relLines!=="function")return;const r0=relLines;relLines=function(v){const L=r0.apply(this,arguments);try{if(v&&v!==S){const N=Object.keys(RP).filter(id=>v.dh&&v.dh[RKEY(id)]&&v.dh[RKEY(id)].i>=0).map(id=>`«${RP[id][0]}»`);
  if(N.length&&Array.isArray(L))L.push(`<span class="rlab">Người đời gọi:</span> ${N.join(" · ")}`)}}catch(e){}return L}})();

/* =================== PART B — CHÍNH TRUYỆN / PHỤ TUYẾN =================== */
/* OLD SAVES ONLY (before FIX r1): road → [good, bad], one pair per road stepped per chapter; kept so an old save keeps its title; the per-chapter names are DH3N (jdh3n.js) */
const ROADT={tt_co:["Con cờ giữ nước","Con cờ đổi phe"],tt_oan:["Rửa tiếng gia môn","Đổ oan cho người"],tt_tranh:["Nối lại một nhà","Chia phủ tranh quyền"],tt_mat:["Giữ trọn mật ước","Bội ước Trung cung"],
 dtq_bien:["Hậu phương giữ vững","Bán tin biên ải"],dtq_vu:["Giải oan thư phản","Mượn thư hại người"],dtq_binh:["Trao trả binh phù","Mưu đoạt binh phù"],dtq_huynh:["Đón huynh về nước","Bỏ huynh đất giặc"],
 muoi_tuoc:["Tước sạch không mua","Bạc đổi tước quan"],muoi_lau:["Bến sạch thuyền ngay","Thuyền lậu nuôi riêng"],muoi_doi:["Thóc chẩn tới dân","Đục khoét thóc chẩn"],muoi_no:["Trả sạch nợ cung","Quỵt nợ trong cung"],
 cn_chu:["Nghĩa cũ chủ tớ","Quay lưng chủ cũ"],cn_tinh:["Chén trà dứt tình","Tình riêng vụng trộm"],cn_ban:["Giữ lời tri kỷ","Bội nghĩa tri kỷ"],cn_than:["Nhận lại cội nguồn","Chối bỏ cội nguồn"],
 ch_co:["Cô cháu đồng lòng","Lợi dụng cô mẫu"],ch_benh:["Thuốc thang tận hiếu","Bên giường mưu lợi"],ch_ho:["Hai cháu hòa thuận","Hãm hại em họ"],ch_bi:["Chôn kín chuyện xưa","Bán bí mật xưa"],
 thd_tho:["Tài nữ thật tài","Mượn bút thành danh"],thd_sach:["Giữ bản thảo cha","Bản thảo đổi vinh"],thd_tro:["Trường thi công bằng","Bán đề khoa cử"],thd_hoc:["Tôn sư trọng đạo","Phụ nghĩa thầy trò"],
 td_an:["Rửa oan gia môn","Lật án trả thù"],td_ke:["Vén màn tìm kẻ","Diệt khẩu sau màn"],td_song:["Đoàn tụ cốt nhục","Bỏ mặc máu mủ"],td_tha:["Cởi oán buông thù","Trả thù đến cùng"],
 cnv_chu:["Giữ kín miệng bình","Nắm thóp chủ nhân"],cnv_ban:["Tình nghĩa đồng hương","Đạp bạn đồng hương"],cnv_mat:["Dứt ánh mắt xưa","Ánh mắt lén lút"],cnv_ma:["Trò ngoan ma ma","Qua mặt ma ma"],
 nc_gian:["Trung với Đại Hy","Mật thám cố quốc"],nc_su:["Cầu nối hai nước","Đưa tin cố quốc"],nc_tuc:["Hòa hai dòng máu","Chối bỏ cố hương"],nc_vuong:["Giữ yên hai cõi","Mưu ngai cố quốc"],
 bd_san:["Vi trường thượng võ","Mưu hiểm vi trường"],bd_soi:["Giữ ngai chính thống","Dựng ngai bù nhìn"],bd_tuyet:["Che chở người nạn","Đuổi người lánh nạn"],bd_hen:["Giữ lời thề lửa","Phụ lời thề lửa"],
 pt_hai:["Đón thuyền đồng hương","Bỏ thuyền ngoài khơi"],pt_su:["Quốc thư vẹn lễ","Quốc thư hai lòng"],pt_tang:["Tiễn thầy qua bể","Giữ thầy làm tin"],pt_dang:["Hồi môn trọn vẹn","Cướp thuyền hồi môn"],
 bd_hoa:["Giữ vẹn hòa ước","Xé bỏ hòa ước"],bd_ngua:["Ngựa tốt về triều","Buôn ngựa cho giặc"],bd_tuc:["Giữ nếp thảo nguyên","Bỏ nếp quê nhà"],bd_hoang:["Khả hãn chính vị","Đoạt ngai Khả hãn"]};
/* side arcs (o "*", "st", "tm", "eg") → [good, bad] */
const ARCT={s_than:["Nhận đúng người thân","Nhận bừa thân thích"],s_thu:["Trả thư đúng chủ","Mật thư làm bẫy"],s_hoa:["Cứu người trong lửa","Đổ lửa cho người"],s_su:["Tiếp sứ vẹn lễ","Mưu lợi với sứ"],
 s_dich:["Ở lại mùa dịch","Bỏ cung tránh dịch"],s_tinh:["Giữ lòng trong sạch","Tình riêng ngoài cung"],s_thay:["Trọng lời lão nhân","Phụ lòng lão nhân"],s_ban:["Hóa thù làm bạn","Thù càng thêm sâu"],
 st_the:["Thế lực chính danh","Kết bè lũng đoạn"],st_con:["Mẹ hiền dạy con","Ép con theo ý"],st_dong:["Đông cung chính vị","Mưu ngôi Thái tử"],
 tm96a:["Từ biệt người xưa","Lưu luyến người xưa"],tm96b:["Vàng không sợ lửa","Lửa thiêu tình cũ"],tm96c:["Dứt tình chọn cung","Bỏ cung theo tình"],
 noi14:["Hương hỏa nối dòng","Mượn con nối dõi"],hau14:["Phượng tọa chính danh","Đạp người lên ngôi"],ke14:["Dạy con nên vua","Buông rèm sau ngai"]};
/* OLD SAVES ONLY (before FIX r1): j72 việc nhờ kinds (KIND72) → [good, bad]; the per-chain names are DH3N.vn */
const VNT={craft:["Tìm vật trả người","Tráo vật lừa người"],social:["Giao thiệp chu toàn","Đưa chuyện hai lòng"],inv:["Soi rõ trắng đen","Kết án qua loa"],pro:["Che chở kẻ yếu","Bỏ mặc người cầu"],
 love:["Se duyên lành","Ép duyên lấy lợi"],trade:["Có vay có trả","Ơn đổi lấy lợi"],risk:["Liều mình vì nghĩa","Liều lĩnh lộ chuyện"],court:["Góp sức việc triều","Lộ tay việc triều"],fam:["Chu toàn việc nhà","Bỏ bê việc nhà"]};
/* j70 mưu hại roles (FIX r1, E56r FAIL 3): the target / schemer names are PER METHOD GROUP (never a poison word for a non-poison case);
   MG70 = method (M70 key, p.m) → group; MHG = group → [what she escaped (target), how it was done (schemer), thoat, lo, nap]. Expert pattern:
   target «cách chống đỡ + kết cục», schemer «cách ra tay + kết cục». The exposer / the framed-then-cleared / the warner are method-free. */
const MG70={poison:"doc",poison2:"doc",musk:"doc",kpoison:"doc",frame:"vu",kframe:"vu",plant:"vu",joint:"vu",rumor:"don",accuse:"don",block:"pha",bribe:"pha",ksab:"pha",huydung:"than",pond:"than",pushp:"than",catswap:"than"};
const MHG={doc:["mưu hạ độc, hại thai","mưu hạ độc, hại thai","Thoát chén thuốc độc","Lộ tay hạ độc","Hạ độc không dấu"],
 vu:["mưu vu oan, cài tang vật","mưu vu oan, cài tang vật","Thoát vòng vu cáo","Vu cáo bại lộ","Ngậm máu phun người"],
 don:["lời đồn bẩn, lời tố gian","chuyện tung tin, tố gian","Lời đồn tự tan","Tung tin bại lộ","Tung tin giấu mặt"],
 pha:["mưu rút thẻ bài, mua người hay phá việc học","mưu rút thẻ bài, mua người hay phá việc học","Vượt qua ngáng trở","Ngáng chân bại lộ","Ngáng chân trong tối"],
 than:["mưu hủy dung, đẩy xuống hồ hay tráo hài nhi","mưu hủy dung, đẩy xuống hồ hay tráo hài nhi","Thoát hiểm gang tấc","Hại người lộ mặt","Ra tay trong tối"]};
const MHT={mh_vach:["Vạch rõ gian tay","t",x=>`Tố giác kẻ mưu hại thành công ${tms(x)}`],mh_minh:["Minh oan sau án","t",x=>`Được rửa oan khi kẻ vu oan bị kết tội ${tms(x)}`],
 mh_bao:["Báo tin cứu người","t",x=>`Báo trước cho người sắp bị hại ${tms(x)}`]};
for(const g in MHG){const [w1,w2,n1,n2,n3]=MHG[g];MHT[`mh_${g}_thoat`]=[n1,"t",x=>`Thoát được ${w1} nhắm vào mình ${tms(x)}`];
 MHT[`mh_${g}_lo`]=[n2,"a",x=>`Bày ${w2} mà bị lộ ${tms(x)}`];MHT[`mh_${g}_nap`]=[n3,"a",x=>`Bày ${w2} mà không ai hay ${tms(x)}`]}
/* old saves only (before FIX r1 these three went to every method; kept so an old save keeps what it earned; never given now) */
const MHOLD={mh_thoat:["Thoát lưới độc","t","Thoát được mưu hại nhắm vào mình"],mh_lo:["Bàn tay lộ dấu","a","Bày mưu hại người mà bị lộ"],mh_nap:["Người nấp sau rèm","a","Bày mưu hại người mà không ai hay"]};
const mhG=p=>{try{return MG70[p&&p.m]||null}catch(e){return null}};
/* j71 lập công families (MF7) → name; LCW = the deed words of each family (how text «Lập công ‹w›»); LCA = the bad ways (FIX r1, E56r FAIL 4: every bad way, like s_dich) */
const LCT={cuute:"Công cứu tế",cuuhoang:"Công cứu giá",thbenh:"Công hầu bệnh",conbenh:"Công trông trẻ bệnh",tomuu:"Công vạch mưu",suthan:"Công tiếp sứ",thamo:"Công trừ tham ô",
 tiencu:"Công tiến hiền",chepkinh:"Công chép kinh",soke:"Công soát sổ",hoagiai:"Công hòa giải",tamtang:"Công lễ Thân tằm",hoahoan:"Công cứu nạn cung",dichbenh:"Công chặn dịch"};
const LCWHY={"cứu tế":"cuute","cứu giá":"cuuhoang","hầu bệnh Thái hậu":"thbenh","vạch mưu":"tomuu","tiếp sứ":"suthan","bắt kẻ tham ô":"thamo","tiến cử hiền tài":"tiencu",
 "chép kinh":"chepkinh","soát sổ sách":"soke","lễ Thân tằm":"tamtang","cứu nạn trong cung":"hoahoan","chặn dịch":"dichbenh"};
const LCW=Object.assign({conbenh:"trông con bệnh",hoagiai:"hòa giải"},...Object.keys(LCWHY).map(w=>({[LCWHY[w]]:w})));
/* key = family, the option it marks (j71 cpm7("<fam>_a")), name, how */
const LCA={cuuhoang:["Hoảng sợ đứng nhìn","Bỏ mặc thánh giá","Đứng nhìn khi thánh giá gặp nạn"],chepkinh:["Nhờ cung nữ chép thay","Công mượn tay người","Nhờ người chép kinh thay mà nhận công"],
 hoagiai:["Bênh ‹A› / Bênh ‹B›","Thiên vị một bên","Được nhờ hòa giải mà bênh một bên"],hoahoan:["Đóng cửa cung giữ mình","Đóng cửa ngồi nhìn","Đóng cửa cung giữ mình khi trong cung gặp nạn"],
 dichbenh:["Đóng cửa cung tránh dịch","Bỏ mặc cung nhân","Đóng cửa cung tránh dịch, bỏ mặc cung nhân"],thamo:["Nhận bạc bịt miệng","Bạc lấp miệng gian","Nhận bạc bịt miệng kẻ tham ô"]};
const tms=n=>n===1?"một lần":n<=10?`${nW(n)} lần`:"nhiều lần";
const nCh=n=>n<=10?nW(n):"nhiều";
const plainT=s=>{try{return String(typeof plain==="function"?plain(String(s||"")):s||"").replace(/\{[^}]*\}/g,"người ấy").replace(/\s*\(\d+\/\d+\)/g,"").replace(/\d+\s*bạc/g,"bạc").trim()}catch(e){return String(s||"")}};
const arcName=k=>{try{return plainT((ARC67[k]&&ARC67[k].t)||k)}catch(e){return k}};
const KIND=k=>{try{return (typeof KIND72==="object"&&KIND72[k]&&(KIND72[k].n||KIND72[k]))||k}catch(e){return k}};
/* the jnroad NPC-road asks (T7 nr_*: their heading is spoken, so the how text names the deed) */
const NRV={nr_emp:"Nói giúp trước mặt Hoàng thượng",nr_th:"Đỡ lời trước Thái hậu",nr_hh:"Đỡ lời trước Hoàng hậu",nr_thu:"Đưa lá thư kín đến tay người nhà",
 nr_do:"Dò xem kẻ kia đang tính gì",nr_y:"Mời thái y chữa bệnh kín",nr_che:"Che chở người cùng đường",nr_bac:"Giúp bạc lúc túng gấp"};
const vnName=t=>{try{const T=typeof T72I==="object"&&T72I[t];const s=T&&(typeof T.t==="function"?"":T.t);return s?plainT(s).replace(/\{A\}/g,"người nhờ").replace(/\{B\}/g,"người kia"):(NRV[t]||t)}catch(e){return t}};
/* DH3N (jdh3n.js) → ROADC[road][n] = [good, bad] for n = BAL.road.first − 1 (the premise .4) … BAL.road.last (.11); VNC[tid] = [good, bad] */
const ROADC={},VNC={};
try{for(const r in DH3N.cp)DH3N.cp[r].split(";").forEach((x,i)=>{(ROADC[r]=ROADC[r]||{})[i+4]=x.split("/").map(s=>s.trim())});for(const t in DH3N.vn)VNC[t]=DH3N.vn[t].split("/").map(s=>s.trim())}catch(e){console.error("jdh3n",e)}
/* E62 (E61r FAIL r2): every COMPOSED việc nhờ seed (j72c, T7 id "c:<seed id>") carries its own pair in the seed itself (field dh "good/bad", J72SEEDS);
   j72seeds_validate.py and titles2-scan.js fail any seed without one, so a new seed can never ship title-less */
try{if(typeof J72SEEDS!=="undefined"&&Array.isArray(J72SEEDS))for(const sd of J72SEEDS)if(sd&&sd.id&&typeof sd.dh==="string"){const P=sd.dh.split("/").map(s=>s.trim());if(P.length===2&&P[0]&&P[1])VNC["c:"+sd.id]=P}}catch(e){console.error("jdh3 seeds",e)}
const SIDE=i=>i?"bằng thủ đoạn, phụ người hay trái lẽ":"mà giữ được nghĩa với người, lẽ với đời";
const chName=(r,n)=>{try{return n===4?arcName(r):plainT(ARC67[ROAD14[r][n]].t)}catch(e){return ""}};
function cpCat(){if(typeof DH_CAT!=="object")return;const T=BAL.dh.T=BAL.dh.T||{},C=CB();
 const put=(key,n,g,sh,how,c,old)=>{DH_CAT[key]={n,g,sh,how};if(old)DH_CAT[key].old=1;T[key]={b:c.b,n:c.n,ch:sh==="t"?c.chT:c.chA}};
 /* (1) EACH main-road chapter: .4 premise + .5–.11, a good and a bad name of its own, once at that chapter's close */
 for(const r in ROADC)for(const n in ROADC[r])ROADC[r][n].forEach((nm,i)=>put(`cp_${r}_${n}_${i?"a":"t"}`,nm,"cp",i?"a":"t",
  ()=>+n===4?`Khép lại hồi mở đầu đường «${arcName(r)}» ${SIDE(i)}`:`Khép lại chương «${chName(r,+n)}» trên đường «${arcName(r)}» ${SIDE(i)}`,C.ch));
 /* old saves only: the whole-road pair given before FIX r1 (never given now) */
 for(const r in ROADT)ROADT[r].forEach((nm,i)=>put(`cp_${r}_${i?"a":"t"}`,nm,"cp",i?"a":"t",x=>`Khép lại ${nCh(x)} chương trên đường «${arcName(r)}» ${SIDE(i)}`,C.road,1));
 for(const a in ARCT)ARCT[a].forEach((nm,i)=>put(`ca_${a}_${i?"a":"t"}`,nm,"pt",i?"a":"t",()=>`Khép lại chuyện «${arcName(a)}» ${SIDE(i)}`,C.arc));
 /* (2) EACH j72 việc nhờ chain (T7 template), once */
 for(const t in VNC)VNC[t].forEach((nm,i)=>put(`vn_${t}_${i?"a":"t"}`,nm,"pt",i?"a":"t",()=>`Việc nhờ «${vnName(t)}»: ${i?"bỏ dở, lỡ hẹn hay để bại lộ":"làm xong, trọn lời đã nhận"}`,C.vn));
 for(const k in VNT)VNT[k].forEach((nm,i)=>put(`vn_${k}_${i?"a":"t"}`,nm,"pt",i?"a":"t",x=>i?`Bỏ dở hay để bại lộ việc nhờ loại «${KIND(k)}» ${tms(x)}`:`Làm xong việc nhờ loại «${KIND(k)}» ${tms(x)}`,C.vnK,1));
 /* (3) mưu hại per method group */
 for(const k in MHT){const [n,sh,h]=MHT[k];put(k,n,"pt",sh,h,C.mh)}
 for(const k in MHOLD){const [n,sh,h]=MHOLD[k];put(k,n,"pt",sh,x=>`${h} ${tms(x)}`,C.mh,1)}
 /* (4) lập công: every good family + every bad way */
 for(const k in LCT)put(`lc_${k}`,LCT[k],"pt","t",x=>`Lập công ${LCW[k]||k} ${tms(x)}`,C.lc);
 for(const k in LCA){const [,n,h]=LCA[k];put(k==="thamo"?"lc_brb":`lc_${k}_a`,n,"pt","a",x=>`${h} ${tms(x)}`,C.lc)}}
cpCat();
/* the ONE give: her or an NPC (host), a counted step of a jdh title (dhInc: notice, auto-wear for NPCs) */
function cpGive(p,key){try{if(!canRun(p)||!DH_CAT[key]||typeof dhInc!=="function")return;dhInc(p,key)}catch(e){console.error("cp",e)}}
window.cpGive=cpGive;
/* the side of a closed chapter (BAL.dh.cp.lean): her option lean during it + her Đức change; 0 → the ending's sign */
function sideOf(A,E){const L=CB().lean;let sc=0;try{const s=typeof geS==="function"?geS():null,z=A.__rp0;if(z){sc=((s?s.lt:0)-(z.lt||0))*L.lt+((S.duc||0)-(z.d||0))*L.duc}}catch(e){}
 if(sc>0)return "t";if(sc<0)return "a";return (E&&E.k<0)?"a":"t"}
(function(){if(typeof res67!=="function")return;const r0=res67;res67=function(tk){try{const A=th67(tk);if(A&&!A.__rp0){const s=typeof geS==="function"?geS():null;A.__rp0={lt:s?s.lt:0,d:S.duc||0}}}catch(e){}return r0.apply(this,arguments)}})();
/* the title key of a closed ARC67 arc: a road chapter → cp_<road>_<n> (n = its rn; the road's premise arc = BAL.road.first − 1), a side arc → ca_<arc> */
function cpKeyOf(a){const d=ARC67[a];if(!d)return null;const prem=typeof ROAD14==="object"&&ROAD14[a]&&d.o!=="rd";const road=d.o==="rd"?d.road:prem?a:null;
 if(road){const n=prem?BAL.road.first-1:d.rn;return ROADC[road]&&ROADC[road][n]?[`cp_${road}_${n}`]:null}if(ARCT[a])return ["ca_"+a];return null}
window.cpKeyOf=cpKeyOf;
(function(){if(typeof end67!=="function")return;const e0=end67;end67=function(A,k,ign){const r=e0.apply(this,arguments);try{if(A&&!ign&&S&&!S.dead){const K=cpKeyOf(A.a);if(K){const a=ARC67[A.a],E=a&&a.E&&(a.E[k]||a.E[Object.keys(a.E)[0]]);cpGive(S,`${K[0]}_${sideOf(A,E)}`)}}}catch(e){console.error("cp",e)}return r}})();
/* NPC off-screen road chapters (jnroad nrEnd(A, k, he, who); A = the ARC67 chapter object, or the road's premise arc for .4): the SAME per-chapter keys;
   the ending's sign, 0 → Đức */
let AK=null;const arcKey=A=>{if(!AK){AK=new Map();for(const k in ARC67)AK.set(ARC67[k],k)}return AK.get(A)};
(function(){if(typeof nrEnd!=="function")return;const n0=nrEnd;nrEnd=function(A,k,he,who){const r=n0.apply(this,arguments);try{if(who&&who!==S&&isP(who)&&A){const K=cpKeyOf(arcKey(A));
 if(K&&/^cp_/.test(K[0])){const g=k>0?"t":k<0?"a":((who.duc||0)>=CB().npcDuc?"t":"a");cpGive(who,`${K[0]}_${g}`)}}}catch(e){console.error("cp",e)}return r}})();
/* j72 việc nhờ: ok = good, fail (late / dropped) or bad (bại lộ) = bad; per chain template (T7 id), once each */
(function(){if(typeof q72End!=="function")return;const q0=q72End;q72End=function(x,res){const r=q0.apply(this,arguments);
 try{const tid=x&&x.tid;if(tid&&VNC[tid]&&S&&!S.dead){if(res==="ok")cpGive(S,`vn_${tid}_t`);else if(res==="fail"||res==="bad")cpGive(S,`vn_${tid}_a`)}}catch(e){console.error("cp",e)}return r}})();
/* j70 mưu hại: who did what in the case (her and NPCs, two-way) */
(function(){if(typeof exec70!=="function")return;const x0=exec70;exec70=function(p){const prev=EXC;EXC=new Set();let r;try{r=x0.apply(this,arguments)}finally{const seen=EXC;EXC=prev;
 try{const a=typeof pa70==="function"?pa70(p):null,t=typeof pt70==="function"?pt70(p):null;if(p&&p.end==="done"&&a&&t){
  const g=mhG(p);if(g){if(p.foil||p.trap)cpGive(t,`mh_${g}_thoat`);if(p.trap||seen.has(a))cpGive(a,`mh_${g}_lo`);else if(!p.foil)cpGive(a,`mh_${g}_nap`)}}}catch(e){console.error("cp",e)}}return r}})();
(function(){if(typeof abandon70!=="function")return;const a0=abandon70;abandon70=function(p,why){const r=a0.apply(this,arguments);try{if(why==="exposed"){cpGive(S,"mh_vach");const a=typeof pa70==="function"?pa70(p):null,g=mhG(p);if(a&&a!==S&&g)cpGive(a,`mh_${g}_lo`)}}catch(e){}return r}})();
/* a frame she (or any target) broke at once (jtruth frameExpose(framer, target, how): «minh oan được») = the target who defended well (group vu); jtruth loads after jdh3 */
setTimeout(()=>{try{if(typeof frameExpose!=="function"||frameExpose.__cp)return;const f0=frameExpose;frameExpose=function(a,p){const r=f0.apply(this,arguments);try{cpGive(p,"mh_vu_thoat");deed(a,"lo");cpGive(a,"mh_vu_lo");convicted(a)}catch(e){}return r};frameExpose.__cp=1}catch(e){}},0);
/* her warning to an NPC's target (j70 optsNpc70: duc70(S, …, "báo tin cứu người")) */
(function(){if(typeof duc70!=="function")return;const d0=duc70;duc70=function(p,n,why){const r=d0.apply(this,arguments);try{if(/báo tin cứu người/.test(String(why||"")))cpGive(p,"mh_bao")}catch(e){}return r}})();
/* j71 lập công: every granted merit (bonusDo7 why → family); conbenh / hoagiai close on their own «ok» (window.cpMerit7, j71); NPC merits (MF7[k].npc) */
(function(){if(typeof bonusDo7!=="function")return;const b0=bonusDo7;bonusDo7=function(o,why){const r=b0.apply(this,arguments);try{const k=LCWHY[String(why||"")];if(k)cpGive(S,"lc_"+k)}catch(e){}return r}})();
/* j71 cpm7(k): a merit closed on its own «ok» (conbenh / hoagiai), or k = "<fam>_a" = one of the bad ways LCA (the option is marked in j71.js) */
window.cpMerit7=k=>{try{const m=/^(\w+)_a$/.exec(String(k));if(m){if(LCA[m[1]]&&m[1]!=="thamo")cpGive(S,`lc_${m[1]}_a`)}else if(LCT[k])cpGive(S,"lc_"+k)}catch(e){}};
(function(){try{if(typeof MF7!=="object")return;for(const k in MF7){const f=MF7[k];if(!f||typeof f.npc!=="function"||f.npc.__cp)continue;const n0=f.npc;f.npc=function(v){const s=n0.apply(this,arguments);try{if(s&&v&&LCT[k])cpGive(v,"lc_"+k)}catch(e){}return s};f.npc.__cp=1}}catch(e){console.error("cp",e)}})();
/* the hush money (thamo «Nhận bạc bịt miệng» sets S.j71.brb = the turn): seen on her next turn end */
function cpMisc(p){try{if(p!==S)return;const j=S.j71;const r=rep(S);if(j&&j.brb!=null&&r.brb!==j.brb){r.brb=j.brb;cpGive(S,"lc_brb")}}catch(e){}}
/* tests / scan */
/* ORDER MAIN 117 (05:15Z; OD 24/11 ~07:45Z, DAY TITLE CARD): READ-ONLY hook for KK16's day card on the j79 dawn panel — her CURRENT main-story chapter as
   «Chương N — <name>», from the SAME source as the goal line (j67 d("goal"): S.st.ch / S.st.M = the open ARC67 chapter (rdDef road chapters included) /
   S.st.ms = a milestone chapter); no typed text, nothing written. "" when no chapter is open (old v1 story, before the first chapter, co-op friend entry). */
function chapterTitle(p){try{p=p||S;if(!p||p!==S||!p.st||!p.st.v2||!p.st.ch)return "";const st=p.st;let n,t;
 if(st.ms&&typeof MS67==="object"&&MS67[st.ms.id]){n=st.ch.n;t=MS67[st.ms.id].t()}
 else if(st.M&&ARC67[st.M.a]){n=st.M.chap||1;const a=ARC67[st.M.a];t=typeof fill67==="function"?fill67(a.t,st.M):a.t}else return "";
 t=plainT(t);return t&&n?`Chương ${n} — ${t}`:""}catch(e){return ""}}
window.chapterTitle=chapterTitle;
window.TITLES2={RP,ROADT,ROADC,ARCT,VNT,VNC,MHT,MHOLD,MG70,MHG,LCT,LCWHY,LCW,LCA,fxW,heldIds,sumK,deed,snap,sideOf,cpMisc,arcKey,chName,vnName};
}catch(e){console.error("jdh3",e)}})();
