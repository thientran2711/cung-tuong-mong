/* ================= ONE GROUP, ONE RULEBOOK =================
   The player (S) and every rival are consorts under the same formulas. Every act is one function act(actor, target). */
function key(p){return p===S?"me":p.id}
function byKey(k){return k==="me"?S:k==="emp"||k==="th"||k==null?null:RV(k)}
function NM(p){return p===S?"ngươi":p.name}
function NMc(p){return p===S?"Ngươi":p.name}
function rkOf(p){return p===S?S.rank:(p.queen?7:p.rank)}
function rkName(p){const r=rkOf(p);const n=r>=7?"Hoàng hậu":RANKS[r].n;return typeof kitHieuJoin==="function"?kitHieuJoin(n,p):n}
function consorts(){const L=[S].concat(liveRivals(true));for(const p of L){if(!p.maid)p.maid=p===S?newMaid(pick(MAIDS),45):{name:pick(MAIDS),loyal:50};if(!p.staff)p.staff=[]}return L}
function others(p){return consorts().filter(x=>x!==p)}
function kidsOf(p){return (p.kids||[]).filter(k=>k.alive)}
function sonsOf(p){return kidsOf(p).filter(k=>k.sex==="m")}
function queenP(){return S.rank>=7?S:(qOn()?rivals[0]:null)}
function malOf(p){return p===S?Math.max(0,70-S.duc):p.malice}
function wk(){return S.turn*3+S.tuan}
function ap(p,o){if(p===S)return apply(o);for(const k in o){const v=o[k];if(!v)continue;if(k==="maid"){p.maid.loyal=cl(p.maid.loyal+v,0,100);continue}p[k]=(p[k]||0)+v}
 for(const k of ["sung","danh","suc","sac","tai","tamco","duc","ghen","an"])if(p[k]!=null)p[k]=cl(p[k],0,100);p.th=cl(p.th||0,-100,100);p.hh=cl(p.hh||0,-100,100);p.bac=Math.max(0,p.bac||0);p.mat=cl(p.mat||0,0,10)}
function dieIf(p,why){if(p!==S&&p.alive&&p.suc<=0){p.alive=false;if(p.queen)p.queen=false;return `<span class="r">${p.name} ${why}.</span> `}return""}
/* a rival's full stat block: the same fields the player's formulas read */
function rstats(v,rank){rank=rank==null?(v.queen?7:v.rank):rank;
 const d=(k,x)=>{if(v[k]==null)v[k]=x};
 d("age",18+R(8));d("sac",40+R(55));d("tai",30+R(50));d("tamco",Math.round((v.malice||40)/3)+R(20));d("duc",Math.max(5,65-Math.round((v.malice||40)/2))+R(15));
 d("mat",R(3));d("danh",8+rank*8);d("bac",40+rank*20);d("suc",80);d("arts",{cam:R(3),ky:R(2),thi:R(3),hoa:R(2),vu:R(3),y:R(2)});d("artp",{cam:0,ky:0,thi:0,hoa:0,vu:0,y:0});
 d("maid",{name:pick(MAIDS),loyal:50+R(31)});d("preg",0);d("hidden",false);d("fake",0);d("anthai",0);d("doctor",0);d("confined",0);d("shield",0);d("tablet",0);d("block",0);
 d("lastPromo",0);d("inv",[]);d("evm",{});d("rl",{});d("ro",{});d("oan",0);d("an",0);d("nightLog",[]);d("th",R(20)-5);d("hh",R(20)-5);d("schemes",0);d("hieu","");d("dress",null);d("asthma",R(7)===0);d("pray",0);d("fert",0);d("thu",0);
 return v}
function normAll(){const d=(k,x)=>{if(S[k]==null)S[k]=x};
 d("inv",[]);d("evm",{});d("rl",{});d("ro",{});d("chat",{});d("an",0);d("nightLog",[]);d("hieu","");d("block",0);d("dress",null);d("asthma",false);d("shop",[]);d("seen",{});d("ghen",0);
 rivals.forEach(v=>rstats(v));if(!S.shop.length)restock();if(typeof staffInit==="function")staffInit();if(typeof ageInit==="function")ageInit();if(!S.where)placeWhere()}
/* relations (symmetric), evidence (who holds proof against whom) */
function evG(h,t){if(!h||!t)return 0;return h===S?(t.ev||0):((h.evm||{})[key(t)]||0)}
/* TRUE EVIDENCE (owner 15/11, jtruth.js): a gain is capped by the real wrongs the target did (deedCap); returns the change actually made */
function evA(h,t,n){if(!h||!t||h===t)return 0;const g=evG(h,t);let d=n;if(n>0){const cap=typeof deedCap==="function"?deedCap(t):1e9;d=Math.max(0,Math.min(n,cap-g))}else d=Math.max(n,-g);
 if(h===/*evok: evA itself*/S)t.ev=Math.max(0,(t.ev||0)+d);else{h.evm=h.evm||{};const k=key(t);h.evm[k]=Math.max(0,(h.evm[k]||0)+d)}if(n>0&&d<n&&typeof evMiss==="function")evMiss(h,t,n-d);return d}
/* the shared formulas */
function od(b){return odA(S,b)}
function effSac(p){return cl(p.sac+wearBonus(p).sac,0,130)}
function conceiveCh(p=S){return cl(Math.round(lotB(p,"Con cái")+10+p.sung/4+effSac(p)/8+(p.pray?15:0)+(p.fert?20:0)-(p.age>28?(p.age-28)*3:0)),2,85)}
function nightCh(p=S){if(p.preg||p.block||p.confined||p.out)return 0;const m=has("mesac")?2:1;
  let c=4+p.sung/4+effSac(p)/12*m+p.arts.vu*2*m+p.arts.y*1.5+(p.tablet?20:0)+mm()/2+(rkOf(p)>=7?5:0)+(typeof tqAf==="function"?tqAf(p)/10:0);
  c+=lotB(p,"Sủng")/2+((p.staff||[]).some(s=>s.role==="eunuch"&&srk(s)>=3)?4:0);c*=illNightF(p);if(has("chamchinh"))c*=.6;if(has("datinh"))c*=1.2;if(illOf(S.emp))c*=.6;return cl(Math.round(c/1.4),c>0?1:0,70)}
function oSee(t=S,p){return cl(Math.round(15+t.mat*9+t.tamco/4+(t.maid&&t.maid.loyal>=70?10:0)+(p?(t.doctor?25:0)+(t.arts.y>=2?20:0):0)),5,95)}
function oSpy(a=S){return odA(a,45+a.mat*6+a.tai/10+a.tamco/5-(DG()?6:0))}
function oAlly(a,t){return odA(a,60-malOf(t)/3+(rel(a,t)>0?15:0)+a.danh/10)}
function oFrame(a=S){return odA(a,30+a.mat*5+(a.thu||0)*10+a.tamco/5+(DG()?4:0))}
function oPoison(a=S){return odA(a,25+a.mat*5+(a.thu||0)*10+a.tamco/5-(DG()?6:0))}
function oKSab(a=S){return odA(a,55+a.tamco/5+a.mat*3-(DG()?6:0))}
function oKPoison(a=S){return odA(a,20+a.mat*5+a.tamco/5-(DG()?6:0))}
function oKFrame(a=S){return odA(a,25+a.mat*5+a.tamco/5+(DG()?4:0))}
/* the sitting Empress is shielded: 3 proofs and a harder hearing, for every accuser alike */
function accNeed(t){return rkOf(t)>=7?4:2}
/* only a consort of Tần rank or above may bring a charge against the Empress */
function accOK(a,t){return evG(a,t)>=accNeed(t)&&(rkOf(t)<7||rkOf(a)>=3)}
function oAccuse(a,t){return odA(a,40-(rkOf(t)>=7?30:0)+evG(a,t)*15+a.danh/10+a.tai/10+(DG()?5:0)+5*(facN(a)-1))}
function oBribe(a,t){return odA(a,40+a.tamco/3-t.maid.loyal/3)}
function stealFit(a){const st=a===S?(S.staff||[]):(a.staff||[]);return (has("mesac")?effSac(a)/10:0)+(has("trongtai")?(a.tai||0)/10:0)+(has("datinh")?4:0)-(has("lanhlung")?4:0)+(st.some(s=>s.tr==="lanh")?6:0)+((a===S?S.maid:a.maid)&&(a===S?S.maid:a.maid).loyal>=70?3:0)}
function oSteal(a,m){return m==="road"?odA(a,30+effSac(a)/5+((a.arts&&a.arts.vu)||0)*5+stealFit(a)+mm()):odA(a,34+a.sung/3+effSac(a)/10+stealFit(a)+mm())}
function oRumor(a){return odA(a,50+a.tamco/4+a.mat*3)}
function oBlock(a){return odA(a,50+a.tamco/5+a.mat*3)}
function oPlant(a,t){return odA(a,40+a.tamco/3+a.mat*3-t.maid.loyal/4)}
function oVP(a){return odA(a,55+a.danh/5)}
/* punishment by standing: the same for every consort */
function punish(p,why,sev){if(typeof p==="string"){sev=why;why=p;p=S}
  if(sev>=2&&rkOf(p)>0&&roll(has("nongnay")?100:has("nhantu")?25:50)){if(p===S)S.rank--;else if(p.queen){p.queen=false;p.rank=6}else p.rank--;log(`<span class="r">${NMc(p)} bị giáng xuống ${rkName(p)} vì ${why}.</span>`);return}
  const m=has("nongnay")?3:has("nhantu")?1:2;p.confined=Math.max(p.confined||0,m);log(`<span class="r">${NMc(p)} bị cấm túc ${m} tháng vì ${why}.</span>`)}
function deathSentence(p,why){if(typeof p==="string"){why=p;p=S}
  if(S.turn<12&&!p.mercy){p.mercy=1;ap(p,{danh:-10,sung:-10});if(rkOf(p)>0){if(p===S)S.rank--;else if(p.queen){p.queen=false;p.rank=6}else p.rank--}p.confined=Math.max(p.confined||0,3);log(`<span class="r">${p===S?"Ngươi":p.name}: ${why.replace(/^Bị /,"suýt bị ")}. Niệm tình mới vào cung, Hoàng thượng tha tội chết: giáng một bậc, cấm túc 3 tháng, Danh -10, Sủng -10. Lần sau sẽ không tha.</span>`);return}
  if(p===S){if(has("nhantu")&&roll(30))return cold(`${why}. Hoàng thượng nhân từ tha tội chết, đày ngươi vào lãnh cung`);return die(why)}
  if(has("nhantu")&&roll(30)){p.out=true;if(p.queen)p.queen=false;log(`<span class="r">${p.name}: ${why}. Hoàng thượng nhân từ, đày vào lãnh cung.</span>`);return}
  p.alive=false;if(p.queen)p.queen=false;log(`<span class="r">${p.name} bị ban chết: ${why}.</span>`)}
/* a proven crime (accusation with evidence) */
function fall(p,why){if(p===S){if(ACTX.a&&ACTX.a!==S)S.framedBy=key(ACTX.a);if(S.rank>=5||R(2)){cold(`Ngươi ${why}`);return}S.rank=Math.max(0,S.rank-2);apply({sung:-15});log(`<span class="r">Ngươi ${why}, bị giáng xuống ${RANKS[S.rank].n}.</span>`);return}
 if(ACTX.a&&ACTX.a!==p)p.coldBy=key(ACTX.a);if(p.queen||p.rank>=5){p.out=true;p.queen=false;log(`<span class="g">${p.name} ${why}, bị phế vào lãnh cung.</span>`)}
 else if(R(2)){p.out=true;log(`<span class="g">${p.name} ${why}, bị đày vào lãnh cung.</span>`)}
 else{p.rank=Math.max(0,p.rank-2);p.sung=cl(p.sung-15,0,100);log(`<span class="g">${p.name} ${why}, bị giáng xuống ${RANKS[p.rank].n}.</span>`)}}
/* a fabricated charge that sticks */
function framed(p,why){if(ACTX.a&&ACTX.a!==p)p.framedBy=key(ACTX.a);const d=Math.round(12*(DG()?1.3:1));ap(p,{danh:-d,sung:-10});punish(p,why,2);return d}
/* the target's people notice first: same detection for everyone */
function caught(a,t,ps,desc){if(!roll(cl(oSee(t,ps)-4*(facN(a)-1),5,95)))return"";evA(t,a,2);relAdd(a,t,-10);
 if(t===S)return `${ps&&(S.doctor||S.arts.y>=2)?"Ngươi nhận ra điều lạ":"Tai mắt báo"}: ${a.name} định ${desc}. Ngươi chặn kịp và nắm 2 chứng cứ. `;
 return `Người của ${t.name} phát giác ${NM(a)} định ${desc}; ${t.name} nắm 2 chứng cứ của ${NM(a)}. `}
function judgeName(t){return t.queen||t===S&&S.rank>=7?"Hoàng thượng":queenP()&&queenP()!==t?(queenP()===S?"ngươi (Hoàng hậu)":"Hoàng hậu"):"Hoàng thượng"}

/* ---------- the acts: act(actor, target) ---------- */
const ACT={};
function A(k,n,o){o.k=k;o.n=n;ACT[k]=o}
A("spy","Dò la",{c:{bac:-15},ok:(a,t)=>a.bac>=15,o:(a)=>oSpy(a),f:(a,t)=>{ap(a,{bac:-15});if(roll(oSpy(a))){ap(a,{tamco:2});return spyFind(a,t)}relAdd(a,t,-8);return `${NMc(a)} dò la ${NM(t)}: <span class="r">bị phát hiện</span>. `}});
A("ally","Kết giao",{c:{bac:-30},ok:(a,t)=>a.bac>=30,o:(a,t)=>oAlly(a,t),f:(a,t)=>{ap(a,{bac:-30});if(roll(oAlly(a,t))){relAdd(a,t,25);if(t!==S)t.ghen=cl(t.ghen-10,0,100);return `${NMc(a)} kết giao với ${NM(t)}: <span class="g">thành</span>. `}relAdd(a,t,-5);return `${NMc(a)} kết giao với ${NM(t)}: bị lạnh nhạt. `}});
A("rumor","Tung tin đồn",{c:{},ok:()=>true,o:a=>oRumor(a),x:"Danh nàng -8",f:(a,t)=>{const c=caught(a,t,false,"tung tin đồn bẩn");if(c)return c;if(roll(oRumor(a))){ap(t,{danh:-8});return `<span class="r">Khắp cung đồn ${NM(t)} tư thông.</span> Danh ${NM(t)} -8. `}evA(t,a,1);relAdd(a,t,-5);return `Lời đồn ${NM(a)} tung ra về ${NM(t)} không ai tin. `}});
A("frame","Vu oan",{c:{duc:-5},ok:()=>true,o:a=>oFrame(a),x:"lộ: Danh -15",f:(a,t)=>{a.schemes=(a.schemes||0)+1;ap(a,{duc:-5});const c=caught(a,t,false,"vu cho "+NM(t)+" dùng bùa ngải");if(c)return c;
  if(roll(oFrame(a))){const d=framed(t,"bị vu dùng bùa ngải");if(d<0)return `<span class="r">Trong tẩm cung ngươi tìm thấy hình nhân bùa ngải.</span> `;if(!d)return `Trong tẩm cung ${NM(t)} tìm thấy hình nhân bùa ngải. ${FRAME_LAST}`;ap(a,{danh:3,tamco:2});return `<span class="r">Trong tẩm cung ${NM(t)} tìm thấy hình nhân bùa ngải.</span> Danh ${NM(t)} -${d} · Sủng -10. `}
  ap(a,{danh:-15,sung:-8});relAdd(a,t,-30);evA(t,a,1);punish(a,"vu oan phi tần",2);return `<span class="r">${NMc(a)} vu oan ${NM(t)} bị lộ.</span> `}});
A("poison","Hạ độc",{c:{duc:-10},ok:()=>true,o:a=>oPoison(a),x:"lộ: ban chết",f:(a,t)=>{a.schemes=(a.schemes||0)+1;ap(a,{duc:-10});const c=caught(a,t,true,"bỏ độc vào điểm tâm của "+NM(t));if(c)return c;
  if(roll(oPoison(a))){const strong=takeItem(a,"hacdinh");if(useAnti(t)){ap(t,{suc:-10});return `${NMc(t)} trúng độc, may có thuốc giải trong rương. Sức -10. `}
   const d=strong?120:35+R(30);if(t===S){apply({suc:-d});return `<span class="r">Ngươi trúng độc, nôn ra máu.</span> Sức -${d}. `}ap(t,{suc:-d});return dieIf(t,"chết sau một bát yến sào")||`<span class="r">${t.name} trúng độc, thập tử nhất sinh.</span> `}
  const r=`<span class="r">Thuốc độc nhắm vào ${NM(t)} bị phát hiện, tra ra người của ${NM(a)}.</span> `;deathSentence(a,`Bị ban rượu độc vì mưu hại ${NM(t)}`);return r}});
A("accuse","Tố giác",{c:{},ok:(a,t)=>accOK(a,t),o:(a,t)=>oAccuse(a,t),x:"cần 2 chứng cứ (Hoàng hậu: 4 chứng cứ và phẩm Tần trở lên; tố hụt Hoàng hậu là phạm thượng)",f:(a,t)=>{const o=oAccuse(a,t);evA(a,t,-99);
  if(roll(o)){const r=`${NMc(a)} tố giác ${NM(t)} trước ${judgeName(t)}: <span class="${t===S?"r":"g"}">thành</span>. `;ap(a,{danh:6});if(roll(BAL.tw.accBestow))bestow(a,"accuse");if(rkOf(t)>=7)a.seatBan=S.turn+12;fall(t,"bị tố giác, chứng cứ rành rành");return r}
  ap(a,{danh:-8});relAdd(a,t,-20);if(rkOf(t)>=7)punish(a,"tố hụt Hoàng hậu, phạm thượng",2);return `${NMc(a)} tố giác ${NM(t)} không thành; chứng cứ bị hủy. `}});
A("bribe","Mua chuộc cung nữ",{c:{bac:-40},ok:(a,t)=>a.bac>=40,o:(a,t)=>oBribe(a,t),f:(a,t)=>{ap(a,{bac:-40});
  if(roll(oBribe(a,t))){if(t.schemes>0){/*evok: schemes>0*/evA(a,t,2);return `Cung nữ ${t.maid.name} của ${NM(t)} bị ${NM(a)} mua chuộc, khai ra mưu kế của chủ: ${NM(a)} nắm 2 chứng cứ. `}const g=Math.min(30,t.bac);ap(t,{bac:-g});ap(a,{bac:g});t.maid.loyal=cl(t.maid.loyal-10,0,100);return `Cung nữ ${t.maid.name} của ${NM(t)} bị ${NM(a)} mua chuộc, lấy trộm ${g} lượng. `}
  t.maid.loyal=cl(t.maid.loyal+5,0,100);evA(t,a,1);return `Cung nữ ${t.maid.name} từ chối bạc của ${NM(a)} và báo cho chủ. `}});
A("block","Rút thẻ bài",{c:{bac:-40},ok:(a,t)=>a.bac>=40&&!t.block,o:a=>oBlock(a),x:"2 tuần nàng không được lật thẻ",f:(a,t)=>{ap(a,{bac:-40});const c=caught(a,t,false,"đút lót Kính sự phòng rút thẻ bài của "+NM(t));if(c)return c;
  if(roll(oBlock(a))){t.block=2;return `${NMc(a)} đút lót Kính sự phòng: thẻ bài của ${NM(t)} bị giấu đi hai tuần. `}evA(t,a,1);return `Tổng quản Kính sự phòng nhận bạc của ${NM(a)} rồi đem chuyện kể với ${NM(t)}. `}});
A("musk","Bỏ xạ hương",{c:{bac:-30,duc:-8},ok:(a,t)=>a.bac>=30&&t.preg&&!t.hidden,o:()=>null,x:"nàng sảy thai",f:(a,t)=>{ap(a,{bac:-30,duc:-8});a.schemes=(a.schemes||0)+1;const c=caught(a,t,true,"bỏ xạ hương vào thuốc an thai của "+NM(t));if(c)return c;
  if(t.fake){t.preg=0;t.fake=0;evA(t,a,1);return `${NMc(a)} sai người bỏ xạ hương vào thuốc của ${NM(t)}; ${NM(t)} nhân đó giả sảy thai, thoát khỏi vở kịch. `}
  t.preg=0;t.hidden=false;ap(t,{suc:-25});return `<span class="r">${NMc(t)} sảy thai.</span> Thái y nói trong thuốc có xạ hương. Sức -25. `}});
A("catswap","Mua chuộc bà đỡ",{c:{bac:-50,duc:-10},ok:(a,t)=>a.bac>=50&&t.preg>=6&&!t.hidden&&!t.catplot,o:()=>null,x:"tráo hài nhi khi nàng sinh",f:(a,t)=>{ap(a,{bac:-50,duc:-10});a.schemes=(a.schemes||0)+1;t.catplot=key(a);return `${NMc(a)} cài bà đỡ vào cung ${NM(t)}, chờ ngày nàng lâm bồn. `}});
A("ksab","Phá việc học",{c:{duc:-3},kid:1,ok:(a,t)=>!!tKid(t),o:a=>oKSab(a),f:(a,t)=>{const k=tKid(t);a.schemes=(a.schemes||0)+1;ap(a,{duc:-3});const c=caught(a,t,false,`phá việc học của ${k.name}`);if(c)return c;
  if(roll(oKSab(a))){k.tal=cl(k.tal-15,0,100);ap(a,{tamco:2});return `${NMc(a)} mua chuộc thầy dạy, ${k.name} học hành sa sút. Tài -15. `}ap(a,{danh:-10});relAdd(a,t,-20);punish(a,"phá việc học của hoàng tự",2);return `<span class="r">Mưu phá việc học của ${k.name} bị lộ.</span> `}});
A("kpoison","Hạ độc con nàng",{c:{duc:-20},kid:1,ok:(a,t)=>!!tKid(t),o:a=>oKPoison(a),x:"lộ: ban chết",f:(a,t)=>{const k=tKid(t);a.schemes=(a.schemes||0)+1;ap(a,{duc:-20});const c=caught(a,t,true,`bỏ độc vào cháo của ${k.name}`);if(c)return c;
  if(roll(oKPoison(a))){const d=50+R(40);k.hp-=t.doctor?Math.round(d/2):d;return k.hp<=0?kidDie(k,"trúng độc mà chết",t===S):`<span class="r">${k.name} trúng độc, thập tử nhất sinh.</span> Sức khỏe còn ${k.hp}. `}
  const r=`<span class="r">Bát chè độc dâng ${k.name} bị thử ra, tra đến người của ${NM(a)}.</span> `;deathSentence(a,`Bị ban chết vì đầu độc ${k.name}`);return r}});
A("pond","Đẩy con nàng xuống hồ",{c:{duc:-15},kid:1,ok:(a,t)=>kidsOf(t).some(k=>k.age>=2),o:a=>oKSab(a),f:(a,t)=>{const k=pick(kidsOf(t).filter(k=>k.age>=2));a.schemes=(a.schemes||0)+1;ap(a,{duc:-15});const c=caught(a,t,true,`đẩy ${k.name} xuống hồ sen`);if(c)return c;
  if(roll(oKSab(a))){if(roll(45))return kidDie(k,"chết đuối ở hồ sen",t===S);k.hp=Math.max(1,k.hp-30);return `<span class="r">${k.name} bị đẩy xuống hồ sen, may được vớt lên.</span> Sức khỏe còn ${k.hp}. `}
  ap(a,{danh:-10});punish(a,"mưu hại hoàng tự",2);return `<span class="r">Kẻ định đẩy ${k.name} xuống hồ bị bắt, khai ra ${NM(a)}.</span> `}});
A("kframe","Vu con nàng trù ẻo",{c:{duc:-15},kid:1,ok:(a,t)=>sonsOf(t).some(k=>k.age>=6),o:a=>oKFrame(a),x:"lộ: ban chết",f:(a,t)=>{const k=sonsOf(t).filter(k=>k.age>=6).sort((x,y)=>(+y.heir)-(+x.heir))[0];a.schemes=(a.schemes||0)+1;ap(a,{duc:-15});const c=caught(a,t,false,`chôn hình nhân trù ẻo trong phòng ${k.name}`);if(c)return c;
  if(roll(oKFrame(a))){k.fond=cl(k.fond-35,0,100);ap(t,{danh:-10});let r=`<span class="r">Trong phòng ${k.name} đào được hình nhân trù ẻo Hoàng thượng.</span> Hoàng thượng thương nó -35. `;if(k.heir){k.heir=false;S.heir=null;r+=`${k.name} bị phế ngôi Thái tử. `}punish(t,"con trai bị tố trù ẻo",2);ap(a,{tamco:2});return r}
  const r=`<span class="r">Hình nhân trù ẻo bị lần ra gốc gác: người của ${NM(a)}.</span> `;deathSentence(a,`Bị ban chết vì vu ${k.name} trù ẻo thánh thượng`);return r}});
A("takeaway","Xin bế con nàng về nuôi",{c:{},kid:1,ok:(a,t)=>rkOf(a)>rkOf(t)&&rkOf(t)<4&&kidsOf(t).some(k=>k.age<6),o:a=>odA(a,40+a.sung/3+rkOf(a)*4),x:"chỉ người phẩm cao hơn",f:(a,t)=>{const k=pick(kidsOf(t).filter(k=>k.age<6));
  if(!roll(odA(a,40+a.sung/3+rkOf(a)*4))){relAdd(a,t,-10);return `${NMc(a)} xin bế ${k.name} về nuôi; Hoàng thượng chưa chuẩn. `}
  t.kids.splice(t.kids.indexOf(k),1);a.kids.push(k);if(k.heir&&S.heir)S.heir.v=a===S?null:a;relAdd(a,t,-30);
  return `<span class="${t===S?"r":"g"}">${a===S?"Ngươi":(a.queen?"Hoàng hậu":a.name)} được chuẩn bế ${k.name} về nuôi, vì phẩm vị ${NM(t)} còn thấp.</span> `}});
A("vp","Tố vượt phẩm",{c:{},ok:(a,t)=>vpItems(t).length>0,o:a=>oVP(a),x:"nàng mặc đồ quá phẩm vị",f:(a,t)=>vpAccuse(a,t)});
A("plant","Cài đồ vào rương",{c:{},ok:(a,t)=>a.inv.some(e=>!e.h),o:(a,t)=>oPlant(a,t),x:"chọn món đồ",npcOnly:0,f:(a,t,ix)=>plantItem(a,t,ix)});
A("steal","Tranh sủng",{c:{}/* cost = BAL.steal.cost via jsteal getter */,ok:(a,t)=>tonightOf()===t,o:a=>oSteal(a),f:(a,t)=>stealNight(a,t,"feign")});
A("road","Chặn ngự giá",{c:{}/* cost = BAL.steal.cost via jsteal getter */,ok:(a,t)=>tonightOf()===t,o:a=>oSteal(a,"road"),f:(a,t)=>stealNight(a,t,"road")});
A("gift","Tặng quà",{c:{},ok:(a,t)=>a.inv.some(e=>!e.h),o:()=>null,f:(a,t,ix)=>giveTo(a,t,ix)});
function stealWin(a,t,mode){relAdd(a,t,-BAL.steal.rel);if(t!==S)t.ghen=cl(t.ghen+BAL.steal.ghen,0,100);if(a===S){S.tonight="me";nightScene()}else S.tonight=a;
 return `${NMc(a)} ${mode==="road"?"chặn ngự giá giữa đường":"sai người báo đau tim"}, Hoàng thượng sang cung ${NM(a)} thay vì ${NM(t)}. `}
function tKid(t){const L=kidsOf(t).filter(k=>k.age>=3||k.heir);return L.sort((a,b)=>((+b.heir)-(+a.heir))||((b.sex==="m")-(a.sex==="m"))||(b.fond-a.fond))[0]||null}
function targetKid(v){return tKid(v)}
function tonightOf(){return S.tonight==="me"?S:S.tonight||null}
function stealCost(mode){const c=BAL.steal.cost[mode==="road"?"road":"feign"],r={};for(const k in c)r[k]=-c[k];return r}
function stealNight(a,t,mode){ap(a,stealCost(mode));const o=oSteal(a,mode);
 if(roll(o))return stealWin(a,t,mode);
 ap(a,{sung:-BAL.steal.failSung});return `${NMc(a)} định giành đêm của ${NM(t)} nhưng Hoàng thượng không động lòng. Sủng -${BAL.steal.failSung}. `}

/* ---------- judging by standing ---------- */
function judge(q,p){const n=evG(q,p),r=`${q===S?"Ngươi, ngôi Hoàng hậu,":"Hoàng hậu "+q.name} xét tội ${NM(p)} theo ${n} chứng cứ. `;evA(q,p,-99);relAdd(q,p,-10);punish(p,"bị Hoàng hậu xử tội",n>=3?2:1);return r}
function vpItems(p){const r=rkOf(p);const L=(p.inv||[]).filter(e=>e.w&&IT[e.k]&&IT[e.k].rk>r);if(p.dress&&p.dress.until>S.turn&&IT[p.dress.k].rk>r)L.push({k:p.dress.k,dress:1});return L}
function vpAccuse(a,t){const L=vpItems(t);if(!L.length)return"";const n=L.map(e=>IT[e.k].n).join(", ");
 if(roll(oVP(a))){t.inv=t.inv.filter(e=>!(e.w&&IT[e.k].rk>rkOf(t)));if(L.some(e=>e.dress))t.dress=null;ap(t,{danh:-8});punish(t,"vượt phẩm",1);relAdd(a,t,-10);return `${NMc(a)} tố ${NM(t)} vượt phẩm (${n}): <span class="${t===S?"r":"g"}">thành</span>. Đồ bị tịch thu, Danh -8. `}
 ap(a,{danh:-3});relAdd(a,t,-10);return `${NMc(a)} tố ${NM(t)} vượt phẩm, ${judgeName(t)} bỏ qua. `}

/* ================= ITEMS ================= */
const IT={
 tramngoc:{n:"Trâm ngọc bích",kd:"Trang sức",d:"Cài tóc: Sắc +2",pr:30,rk:0,sl:"hair",w:{sac:2},tg:["hh","rv"]},
 boodieu:{n:"Bộ diêu vàng",kd:"Trang sức",d:"Cài tóc: Sắc +5, Danh +2 · từ bậc Phi",pr:90,rk:4,sl:"hair",w:{sac:5,danh:2},tg:["hh","rv"]},
 tramphuong:{n:"Trâm phượng cửu vĩ",kd:"Trang sức",d:"Cài tóc: Sắc +8, Danh +4 · chỉ Hoàng hậu",pr:200,rk:7,sl:"hair",w:{sac:8,danh:4},tg:["rv"]},
 vongngoc:{n:"Vòng ngọc Hòa Điền",kd:"Trang sức",d:"Đeo tay: Sắc +2, Danh +1",pr:50,rk:0,sl:"wrist",w:{sac:2,danh:1},tg:["th","hh","rv"]},
 vongvang:{n:"Vòng vàng chạm phượng",kd:"Trang sức",d:"Đeo tay: Sắc +4, Danh +3 · từ Quý phi",pr:120,rk:5,sl:"wrist",w:{sac:4,danh:3},tg:["rv"]},
 sonphan:{n:"Son phấn Dương Châu",kd:"Trang sức",d:"Dùng: Sắc +2",pr:20,use:{sac:2},tg:["rv"]},
 luahang:{n:"Lụa Hàng Châu",kd:"Vải vóc",d:"May áo: Sắc +3 trong 3 tháng",pr:30,rk:0,dr:3,tg:["th","rv"]},
 gamto:{n:"Gấm Tô Châu",kd:"Vải vóc",d:"May áo: Sắc +6 trong 3 tháng · từ Quý phi",pr:80,rk:5,dr:6,tg:["th","hh","rv"]},
 gamvang:{n:"Gấm minh hoàng",kd:"Vải vóc",d:"Áo vàng: Sắc +9 trong 3 tháng · chỉ Hoàng hậu",pr:160,rk:7,dr:9,tg:[]},
 nhansam:{n:"Nhân sâm trăm năm",kd:"Thuốc bổ",d:"Dùng: Sức +25; có thai thì an thai",pr:60,use:{suc:25},ant:1,tg:["th"]},
 yensao:{n:"Yến sào",kd:"Thuốc bổ",d:"Dùng: Sức +15, Sắc +1",pr:35,use:{suc:15,sac:1},tg:["th","rv"]},
 agiao:{n:"A giao",kd:"Thuốc bổ",d:"Dùng: Sức +10; 2 tháng dễ thụ thai",pr:40,use:{suc:10},fert:2,tg:["rv"]},
 giaidoc:{n:"Thuốc giải độc",kd:"Thuốc",d:"Để trong rương: cứu một lần trúng độc",pr:70,anti:1,tg:[]},
 thuocanthai:{n:"Thuốc an thai",kd:"Thuốc",d:"Dùng khi có thai: nguy cơ sảy giảm nửa",pr:25,ant:1,tg:["rv"]},
 huongtram:{n:"Hương trầm",kd:"Hương liệu",d:"Dùng: Đức +1, Sức +5",pr:20,use:{duc:1,suc:5},tg:["th","emp"]},
 tuithom:{n:"Túi thơm thêu",kd:"Hương liệu",d:"Dùng: Sức +3",pr:15,use:{suc:3},tg:["rv","hh"]},
 xahuong:{n:"Xạ hương",kd:"Hương liệu",d:"Trộn vào túi thơm, hương trầm: hại thai",pr:50,mat:"xa",tg:[]},
 hacdinh:{n:"Hạc đỉnh hồng",kd:"Độc dược",d:"Hạ độc chắc chết · bị khám ra là có tội",pr:120,il:1,tg:[]},
 botngua:{n:"Bột ngứa",kd:"Độc dược",d:"Dùng với phi tần: nàng Danh -5 · bị khám ra là có tội",pr:30,il:1,tg:[]},
 tranhco:{n:"Tranh cổ",kd:"Lễ vật",d:"Tặng Hoàng thượng, Thái hậu: rất hợp ý",pr:90,gv:10,tg:["emp","th"]},
 nghien:{n:"Nghiên mực Đoan Khê",kd:"Lễ vật",d:"Tặng Hoàng thượng: hợp ý",pr:60,gv:8,tg:["emp"]},
 dancoc:{n:"Đàn cổ Tiêu Vĩ",kd:"Lễ vật",d:"Tặng Hoàng thượng, phi tần mê nhạc",pr:100,gv:12,tg:["emp","rv"]},
 demgam:{n:"Đệm gấm",kd:"Lễ vật",d:"Tặng: êm ấm, ai cũng nhận",pr:20,gv:4,tg:["th","rv","hh"]},
 ngocboi:{n:"Ngọc bội ngự ban",kd:"Kỷ vật",d:"Còn giữ: Sủng không dưới 15 · mất là đại họa",pr:0,keep:1,tg:[]},
 sacphong:{n:"Sắc phong",kd:"Kỷ vật",d:"Chiếu sắc phong hiệu của Hoàng thượng · không bán, không tặng · mất là bị trách",pr:0,keep:1,nt:1,tg:[]},
 ngocan:{n:"Ngọc ấn",kd:"Kỷ vật",d:"Ấn ngọc khắc hiệu được ban · không bán, không tặng · mất là bị trách",pr:0,keep:1,nt:1,tg:[]},
 thunha:{n:"Thư nhà",kd:"Thư từ",d:"Đọc: Sức +10, Đức +2",pr:0,use:{suc:10,duc:2},tg:[]},
 chungcu:{n:"Tập chứng cứ",kd:"Thư từ",d:"Dùng với một phi tần: chứng cứ +2",pr:0,evi:2,tg:[]}};
/* hidden taints on innocent items (two-way scheme tools) */
const TAINT={xa:{n:"trộn xạ hương",on:["tuithom","huongtram"],need:"xahuong",c:0,hurt:"hại thai"},
 bua:{n:"giấu bùa chú",on:["tuithom","demgam"],c:30,il:1,hurt:"người giữ hao sức; khám ra là tội bùa ngải"},
 chi:{n:"pha chì",on:["sonphan"],c:20,hurt:"Sắc, Sức người dùng giảm dần"},
 meo:{n:"nhồi lông mèo",on:["demgam"],c:5,hurt:"người suyễn hao sức"},
 gia:{n:"khắc dấu 'ngự ban' giả",on:["vongngoc","tramngoc"],c:50,il:1,hurt:"khám ra là tội khi quân"},
 trom:{n:"thành ngọc bội ngự dụng bị trộm",on:["ngocboi","vongngoc"],c:80,il:1,hurt:"khám ra là tội trộm"}};
const SHOP_ALL=["tramngoc","vongngoc","sonphan","luahang","gamto","nhansam","yensao","agiao","giaidoc","thuocanthai","huongtram","tuithom","tranhco","nghien","dancoc","demgam","boodieu","vongvang"];
function restock(){const L=shuf(SHOP_ALL.slice()).slice(0,6);if(roll(45))L.push(pick(["xahuong","hacdinh","botngua"]));S.shop=L}
const ITIMG={tramphuong:"tram-phuong",vongngoc:"vong-ngoc",boodieu:"bo-dieu",gamto:"gam-to-chau",luahang:"lua-hang-chau",nhansam:"nhan-sam",yensao:"yen-sao",agiao:"a-giao",giaidoc:"thuoc-giai",thuocanthai:"thuoc-an-thai",huongtram:"huong-tram",xahuong:"xa-huong",hacdinh:"hac-dinh-hong",botngua:"bot-ngua",tranhco:"tranh-co",nghien:"nghien-muc",dancoc:"dan-co",ngocboi:"ngoc-boi-ban",thunha:"thu-nha",tuithom:"tui-thom",sonphan:"phan-son",chungcu:"hinh-nhan"};
function iic(k,s){return ITIMG[k]?ic("item-"+ITIMG[k],s||22):""}
function iname(e){const it=IT[e.k];return it?it.n:e.k}
function takeItem(p,k){const i=p.inv.findIndex(e=>e.k===k&&!e.h);if(i<0)return false;p.inv.splice(i,1);return true}
function useAnti(p){return takeItem(p,"giaidoc")}
function wearBonus(p){const b={sac:0,danh:0};if(!p||!p.inv)return b;const r=rkOf(p);
 for(const e of p.inv)if(e.w&&IT[e.k]&&IT[e.k].w){const m=IT[e.k].rk>r?1.5:1;for(const s in IT[e.k].w)b[s]+=Math.round(IT[e.k].w[s]*m)}
 if(p.dress&&p.dress.until>S.turn){const it=IT[p.dress.k];b.sac+=Math.round(it.dr*(it.rk>r?1.5:1))}return b}
function buy(p,k){const it=IT[k];if(!it||p.bac<it.pr)return false;ap(p,{bac:-it.pr});p.inv.push({k});return true}
function wear(p,ix){const e=p.inv[ix],it=e&&IT[e.k];if(!it||!it.sl||e.h)return;const on=!e.w;p.inv.forEach(x=>{if(IT[x.k]&&IT[x.k].sl===it.sl)x.w=0});e.w=on?1:0}
function useItem(p,ix,tgt){const e=p.inv[ix],it=e&&IT[e.k];if(!it||e.h)return"";let r="";
 if(it.dr){p.inv.splice(ix,1);p.dress={k:e.k,until:S.turn+3};return `${NMc(p)} may áo mới bằng ${it.n}${it.rk>rkOf(p)?" (vượt phẩm!)":""}. `}
 if(it.sl){wear(p,ix);return""}
 if(it.evi){const t=tgt;if(!t)return"";/* a dossier only holds what she really did (jtruth) */if(typeof evRoom==="function"&&!evRoom(p,t))return `Tập chứng cứ không có gì về ${t.name}: nàng chưa từng làm điều sai trái. `;p.inv.splice(ix,1);const n=evA(p,t,it.evi);return `${NMc(p)} giữ tập chứng cứ về ${t.name}: chứng cứ +${n}. `}
 if(e.k==="botngua"){if(!tgt)return"";p.inv.splice(ix,1);const c=caught(p,tgt,false,"rắc bột ngứa vào áo "+tgt.name);if(c)return c;ap(tgt,{danh:-5});return `${tgt.name} gãi ngứa giữa yến tiệc, mất hết thể diện. Danh -5. `}
 if(it.anti||it.keep||it.mat||it.gv||it.il)return"";
 p.inv.splice(ix,1);if(it.use)ap(p,it.use);if(it.ant&&p.preg)p.anthai=1;if(it.fert)p.fert=Math.max(p.fert||0,it.fert);
 if(e.t)taintHit(p,e,true);
 return `${NMc(p)} dùng ${it.n}. ${fmt(it.use)}${it.ant&&p.preg?" · an thai":""}`}
function sellItem(p,ix){const e=p.inv[ix],it=e&&IT[e.k];if(!it||e.h)return"";p.inv.splice(ix,1);const g=Math.floor(it.pr/2);ap(p,{bac:g});return `${NMc(p)} bán ${it.n}: Bạc +${g}. `}
function taintItem(p,ix,tk){const e=p.inv[ix],T=TAINT[tk];if(!e||!T||!T.on.includes(e.k)||e.t)return"";if(T.need&&!takeItem(p,T.need))return"";
 const e2=p.inv.find(x=>x===e);if(!e2)return"";if(T.c)ap(p,{bac:-T.c,duc:-3});else ap(p,{duc:-3});e2.t=tk;e2.by=key(p);p.schemes=(p.schemes||0)+1;return `${NMc(p)} lén ${T.n} vào ${iname(e2)}. `}
/* receiving: people's tastes */
function giftVal(it,r){const base=it.gv||Math.round(it.pr/12)+2;/* items without a tg list (jeitem home pieces) like no one (title-sys2 fix: the gift bag threw) */if(!Array.isArray(it.tg))it=Object.assign({},it,{tg:[]});const like=r==="emp"?(it.tg.includes("emp")||((it.k==="nghien"||it.k==="dancoc")&&(has("trongtai")||has("chamchinh")))):r==="th"?it.tg.includes("th"):r&&r.queen?it.tg.includes("hh"):it.tg.includes("rv");return like?base:Math.round(base/3)}
function giveTo(a,r,ix){const e=a.inv[ix];if(!e||e.h)return"";window.__giftTaint=e.t?1:0;const it=IT[e.k];a.inv.splice(ix,1);e.w=0;const g=giftVal(Object.assign({k:e.k},it),r);
 if(r==="emp"){ap(a,{sung:Math.max(1,Math.round(g/2))});if(e.t==="gia"||e.t==="trom"){ap(a,{sung:-20});punish(a,"dâng đồ ngự dụng giả mạo",2)}return `${NMc(a)} dâng ${it.n} lên Hoàng thượng. Sủng +${Math.max(1,Math.round(g/2))}. `}
 if(r==="th"){ap(a,{th:g});return `${NMc(a)} dâng ${it.n} lên Thái hậu. Thái hậu +${g}. `}
 relAdd(a,r,g+3);if(r.queen||(r===S&&S.rank>=7))ap(a,{hh:g});
 const ent={k:e.k,from:key(a)};if(e.t){ent.t=e.t;ent.by=e.by}
 if(r===S){pushDil(mkP("giftin",{f:key(a),e:ent}),"Quà tặng");return `${a.name} sai người mang ${it.n} sang tặng ngươi. `}
 r.inv.push(ent);if(e.t&&roll(oSee(r,true))){r.inv.pop();/*evok: tainted gift (taint = scheme)*/evA(r,a,2);relAdd(a,r,-25);return `${r.name} nhận ${it.n} của ${NM(a)} nhưng người của nàng phát hiện đồ có vấn đề: nàng nắm 2 chứng cứ. `}
 if(IT[e.k].sl&&IT[e.k].rk>rkOf(r)&&(r.trait==="Kiêu ngạo"||r.trait==="Tham vọng"||roll(25)))wear(r,r.inv.length-1);
 return `${NMc(a)} tặng ${it.n} cho ${r.name}: thiện cảm +${g+3}. `}
function plantItem(a,t,ix){const e=a.inv[ix];if(!e||e.h)return"";a.inv.splice(ix,1);e.w=0;a.schemes=(a.schemes||0)+1;
 if(!roll(oPlant(a,t))){/*evok: plant act (runAct deed)*/evA(t,a,2);relAdd(a,t,-20);return `<span class="r">Kẻ lẻn vào cung ${NM(t)} cài ${iname(e)} bị bắt, khai ra ${NM(a)}.</span> ${NMc(t)} nắm 2 chứng cứ. `}
 t.inv.push({k:e.k,t:e.t,by:key(a),h:1});return `${NMc(a)} lén cài ${iname(e)}${e.t?" ("+TAINT[e.t].n+")":""} vào rương ${NM(t)}. `}
/* a taint working on its holder */
function taintHit(p,e,used){const t=e.t;if(!t)return"";let r="";
 if(t==="xa"&&p.preg&&!p.fake&&(used||roll(35))){p.preg=0;p.hidden=false;ap(p,{suc:-20});r=`<span class="r">${NMc(p)} động thai, sảy mất đứa bé.</span> `}
 if(t==="chi")ap(p,{sac:-1,suc:-3});if(t==="meo")ap(p,{suc:p.asthma?-8:-1});if(t==="bua")ap(p,{suc:-3});return r}
function itemMonth(p){let r="";for(const e of p.inv.slice())if(e.t)r+=taintHit(p,e,false);
 if(p.inv.some(e=>e.k==="ngocboi"&&!e.t&&!e.h)&&p.sung<15)p.sung=15;
 if(p===S&&p.inv.some(e=>e.t&&e.by!=="me")&&roll(oSee(S,true)/5))r+=`Ngươi thấy trong người khó chịu từ khi nhận quà; nên kiểm tra đồ. `;
 return p===S?r:(r?"":"")}
/* inspection: same detection for everyone */
function inspect(p){const found=[];const sees=oSee(p,true);
 for(const e of p.inv.slice()){if(!(e.t||e.h))continue;if(e.by===key(p)&&!e.h)continue;if(!roll(sees))continue;
  p.inv.splice(p.inv.indexOf(e),1);const by=byKey(e.by);let s=`${iname(e)}${e.t?" ("+TAINT[e.t].n+")":""}${e.h?" lạ, không rõ ai cài":""}`;
  if(by&&by!==p&&roll(40+p.mat*6)){/*evok: tainted by (scheme)*/evA(p,by,2);s+=`: dấu vết dẫn về ${NM(by)} (chứng cứ +2)`}found.push(s)}
 return found}
/* palace search: illegal things found are crimes, unless the trail leads to whoever planted them */
function search(p){const bad=p.inv.filter(e=>(IT[e.k]&&IT[e.k].il)||(e.t&&TAINT[e.t].il));if(!bad.length)return"";const e=bad[0];p.inv.splice(p.inv.indexOf(e),1);
 const by=byKey(e.by),what=`${iname(e)}${e.t?" ("+TAINT[e.t].n+")":""}`;
 if(by&&by!==p&&roll(35+p.mat*5)){punish(by,"cài tang vật vu oan",2);evA(p,by,2);return `Cung Chính ti khám cung ${NM(p)}, tìm thấy ${what}; tra ra do ${NM(by)} cài vào. `}
 if(e.t==="bua"){/* the planter is the framer (jtruth defence; reviewer r1: ACTX.a was empty in the month search) */const A0=ACTX.a;ACTX.a=by&&by!==p?by:A0;let d;try{d=framed(p,"tàng trữ bùa chú")}finally{ACTX.a=A0}if(d<0)return `<span class="r">Khám cung ngươi tìm thấy ${what}.</span> `;if(!d)return `Khám cung ${NM(p)} tìm thấy ${what}. ${FRAME_LAST}`;return `<span class="r">Khám cung ${NM(p)} tìm thấy ${what}.</span> Danh -${d}. `}
if(e.by&&e.by!==key(p))p.framedBy=e.by;
 if(e.t==="trom"){fall(p,"bị khám ra giấu ngọc bội ngự dụng");return `Khám cung ${NM(p)} tìm thấy ${what}. `}
 ap(p,{danh:-10});punish(p,e.t==="gia"?"tội khi quân":"tàng trữ độc vật",2);return `<span class="r">Khám cung ${NM(p)} tìm thấy ${what}.</span> Danh -10. `}
/* bestowals */
const TITLES=["Thục","Hiền","Đức","Thuần","Uyển","Trinh","Gia","Ý","Tĩnh","Huệ"];
const BEST={night:["tramngoc","vongngoc","luahang","yensao","sonphan","huongtram"],contest:["dancoc","gamto","vongngoc","tranhco"],son:["ngocboi","nhansam","vongvang","gamto"],promo:["boodieu","gamto","vongvang","tranhco"],accuse:["vongngoc","nghien","luahang"],story:["tranhco","vongngoc","nhansam","chungcu"],birthday:["dancoc","tramngoc","gamto"]};
const BWHY={night:"sau đêm thị tẩm",contest:"vì tài nghệ hơn người",son:"mừng hoàng tử ra đời",promo:"nhân dịp tấn phong",accuse:"vì tố giác kẻ gian",story:"",birthday:"nhân tiết Vạn thọ"};
function bestow(p,why){if(!p||p.dead||(p!==S&&!p.alive))return;let L=BEST[why]||BEST.night;L=L.filter(k=>!IT[k].rk||IT[k].rk<=rkOf(p)||why==="son");const k=pick(L.length?L:["tramngoc"]);p.inv.push({k,from:"emp"});
 /* hiệu (title-sys2): granted by the ONE threshold rule dhHieuOK / dhHieuGrant (jdh2, BAL.dh.hieu), no roll; book + seal come with it */
 let tt="";if(["son","promo","contest"].includes(why)&&typeof dhHieuOK==="function"&&dhHieuOK(p).ok)tt=dhHieuGrant(p,why,{quiet:1});
 if(p===S){Q.push({t:"Thánh thượng ban thưởng",who:pEmp(),h:`<p style="text-align:center">${iic(k,48)}</p><p>Thái giám tuyên khẩu dụ ${BWHY[why]||""}: ban cho ngươi <b>${IT[k].n}</b>.</p><p class="past">${IT[k].d}</p>${tt?`<p>Lại ban hiệu <b>${tt}</b>, gọi là ${tt} ${RANKS[Math.min(6,S.rank)].n.toLowerCase()}, kèm Sắc phong và Ngọc ấn. Danh +${BAL.dh.hieu.danhG}.</p>`:""}`});log(`Được ban ${IT[k].n}${tt?`, ban hiệu ${tt}`:""}.`)}
 else log(`${p.name} được Hoàng thượng ban ${IT[k].n}${tt?`, ban hiệu ${tt}`:""}.`)}

/* ================= NIGHTS ================= */
function nightScene(){S.tonight="me";pushFront(mkP("prep"),"Chuẩn bị thị tẩm")}
function pushFront(d,title){if(!d)return;Q.unshift({t:title||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls})}
function night(p=S){if(p.preg)return;if(roll(conceiveCh(p))){p.preg=1;p.pregWk=wk();if(p===S){S.hidden=true;log(`<span class="g">Thái y bắt mạch: ngươi đã có thai.</span> Ngươi được giấu thai đến hết tháng thứ 3, hoặc báo tin để được sủng ái.`)}else{p.hidden=p.tamco>=40;if(!p.hidden)ap(p,{sung:6,th:5})}}}
function giuBlocked(p){return rkOf(p)<=1&&(p.th<0||(has("hieuthao")&&p.th<10))&&roll(30)}
PEND.ksp=()=>({who:pEmp(),t:"<p>Tối nay Hoàng thượng lật thẻ bài của ngươi.</p>",o:[{n:"Tắm gội chờ giá",fx:{},x:"chuẩn bị thị tẩm",go:nightScene},
 {n:`Tiến cử ${S.maid.name} hầu thay`,fx:{},x:`${roomFor("consort")?`nàng được phong ${RANKS[0].n}: ${chanceW(30)}, rồi ${S.maid.loyal>=60?"vẫn là người của ngươi":"trở mặt với ngươi"}`:"không còn ghế để phong: nàng hầu một đêm rồi ra cung"} · kèm: mất ${S.maid.name}, cung nữ mới lòng 45`,go:()=>{log(sendMaid(S))}},
 {n:"Cáo bệnh",fx:{sung:-2},x:"nhường đêm; Ân tình -2",go:()=>{S.an=cl(S.an-2,0,100);S.tonight=null}}]});
PEND.prep=()=>{const wb=wearBonus(S),vp=vpItems(S).length>0,b=bestArt();return{who:pMe(),t:"<p>Kính sự phòng đã báo tin. Còn hai canh giờ trước khi kiệu đến.</p>",o:[
 {n:"Tắm cánh hoa, xông hương",fx:{bac:-10},x:"đêm nay được ưa hơn",go:()=>pushFront(mkP("night1",{q:2,vp:0}),"Đêm thị tẩm")},
 {n:"Điểm trang lộng lẫy",fx:{},x:`trang sức đang đeo: Sắc +${wb.sac}${vp?` · kèm: đồ vượt phẩm bị Hoàng thượng thu, Danh -4: ${chanceW(40)}`:""}`,go:()=>pushFront(mkP("night1",{q:1+Math.round(wb.sac/3),vp:vp?1:0}),"Đêm thị tẩm")},
 {n:`Tập trước ${b.n}`,fx:{suc:-5},x:`bậc ${b.l}`,go:()=>pushFront(mkP("night1",{q:1+b.l,vp:0}),"Đêm thị tẩm")},
 {n:"Để mộc, tự nhiên",fx:{},go:()=>pushFront(mkP("night1",{q:1,vp:0}),"Đêm thị tẩm")}]}};
PEND.night1=p=>{const E=S.emp,mood=[1,0,-1,-2][E.mood],go=b=>()=>{let s=p.q+b+mood+R(3),ex="";
  if(p.vp&&roll(40)){const n=vpItems(S).map(e=>IT[e.k].n).join(", ");S.inv=S.inv.filter(e=>!(e.w&&IT[e.k].rk>S.rank));if(vpItems(S).length)S.dress=null;apply({danh:-4});s-=2;ex=`Hoàng thượng nhíu mày nhìn ${n}: “Phẩm vị gì mà dám dùng thứ này?” Đồ bị thu lại. Danh -4.`;log(ex)}
  pushFront(mkP("night2",{s,ex}),"Đêm thị tẩm")};
 return{who:pEmp(),t:`<p>Canh một, thái giám Kính sự phòng cởi xiêm ngoài, cuộn ngươi trong tấm chăn gấm thêu phượng, khiêng vào Dưỡng Hòa điện theo lệ cũ.</p><p>Màn vàng rủ thấp. Hoàng thượng đặt quyển sách xuống${E.mood>=2?", vẻ mệt mỏi":""}, nhìn ngươi.</p>`,o:[
 {n:"Bàn thơ văn, cầm kỳ",fx:{},od:(has("trongtai")?3:S.tai>=60?1:0),x:nx(has("trongtai")?3:S.tai>=60?1:0,has("trongtai")?"ngài trọng tài, rất hợp":""),go:go(has("trongtai")?3:S.tai>=60?1:0)},
 {n:"Bàn chuyện thiên hạ",fx:{},od:(has("chamchinh")?3:-1),x:nx(has("chamchinh")?3:-1,has("chamchinh")?"ngài chăm chính sự, rất hợp":"ngài không thích phi tần bàn việc nước"),go:go(has("chamchinh")?3:-1)},
 {n:"Rót rượu, nũng nịu",fx:{},od:(has("datinh")||has("mesac")?3:has("lanhlung")?-1:0),x:nx(has("datinh")||has("mesac")?3:has("lanhlung")?-1:0,has("datinh")||has("mesac")?"ngài đa tình, rất hợp":has("lanhlung")?"ngài lạnh lùng, dễ chán":""),go:go(has("datinh")||has("mesac")?3:has("lanhlung")?-1:0)},
 {n:"Lặng lẽ xoa vai, nghe ngài kể",fx:{},od:(E.mood>=2?2:1),x:nx(E.mood>=2?2:1,E.mood>=2?"ngài đang phiền, rất hợp":"an toàn"),go:go(E.mood>=2?2:1)}]}};
/* the night talk's line: how well it suits him -> ladder word; the night is graded, never empty */
function nx(b,note){const m=[1,0,-1,-2][S.emp.mood];const v=b+m;const w=v>=3?"Rất chắc":v>=2?"Chắc":v>=1?"Khá chắc":v>=0?"Năm ăn năm thua":"Khó";return `${w} · thành: đêm vui, Sủng +5, Ân tình +5 · hỏng: đêm nhạt, Sủng +3, Ân tình +2${note?" · "+note:""}${vpItems(S).length?` · kèm: đồ vượt phẩm bị thu, Danh -4 (nếu đang đeo): ${chanceW(40)}`:""}`}
function nightFx(s){S.tablet=0;S.nights++;S.nightLog.push(wk());const g=3+Math.max(0,Math.round(s/2));apply({sung:g});S.an=cl(S.an+2+Math.max(0,s),0,100);ghenAll(8);
 if(giuBlocked(S))pushFront(mkP("giu"),"Giữ hay không giữ");else night(S);
 if(roll(10+s*4))bestow(S,"night");log(`Thị tẩm. Sủng +${g} · Ân tình +${2+Math.max(0,s)}.`)}
PEND.night2=p=>{const s=p.s,v=liveRivals(false).slice().sort((a,b)=>a.rel-b.rel)[0],son=mySons()[0],o1=od(30+S.an/2+s*4),o2=od(30+S.an/2+s*3-(DG()?10:0)),o3=od(40+S.an/2+s*3);
 const txt=s>=6?"Ngài khẽ cười, kéo ngươi lại gần. Tấm rèm thêu uyên ương buông xuống; ngọn nến đỏ chập chờn rồi lụi, chỉ còn tiếng mưa xuân trên mái ngói.":s>=3?"Hương trầm vấn vít. Ngài nắm tay ngươi rất lâu, rồi màn the khép lại.":"Ngài có vẻ xa cách. Đêm trôi qua lặng lẽ sau tấm màn vàng.";
 const go=f=>()=>{nightFx(s);f()};
 const O=[{n:"Xin ân cho gia đình",fx:{},x:`${word(o1)} · thành: Danh +5, Bạc +40 · hỏng: Sủng -3`,go:go(()=>apply(roll(o1)?{danh:5,bac:40}:{sung:-3}))},
  {n:"Xin tha cho cung nữ bị phạt",fx:{},x:"Đức +3, Ân tình +1",go:go(()=>{apply({duc:3});S.an=cl(S.an+1,0,100)})}];
 if(v)O.push({n:`Thì thầm nói xấu ${v.name}`,fx:{},x:`${word(o2)} · thành: nàng Sủng -10${DG()?" · hỏng: ngài đa nghi, quay ra nghi ngươi":""}`,go:go(()=>{if(roll(o2)){v.sung=cl(v.sung-10,0,100);relAdd(S,v,-5)}else if(DG())apply({sung:-6,danh:-3});else apply({sung:-2})})});
 if(son)O.push({n:`Xin cho ${son.name}`,fx:{},x:`${word(o3)} · thành: ngài thương con +10`,go:go(()=>{if(roll(o3))son.fond=cl(son.fond+10,0,100);else S.an=cl(S.an-2,0,100)})});
 O.push({n:"Im lặng, tựa vai ngài",fx:{},x:"Ân tình +2",go:go(()=>{S.an=cl(S.an+2,0,100)})});
 return{cls:"night",who:pEmp(),t:`${p.ex?`<p class="past">${p.ex}</p>`:""}<p>${txt}</p><p class="past">Gối đầu, nửa đêm. Ngươi muốn nói gì?</p>`,o:O}};
PEND.giu=()=>{const o1=od(45+S.tamco/3),o2=od(30+S.an/2);return{who:pTH(),t:"<p>Sáng sớm, tổng quản Kính sự phòng quỳ ngoài điện hỏi theo lệ: “Giữ hay không giữ?”</p><p>Lời Thái hậu truyền xuống: phẩm vị thấp, không được giữ long thai.</p>",o:[
 {n:"Cúi đầu tuân lệnh",fx:{th:5},x:"lần này không thể có thai"},
 {n:"Đút bạc xin giữ",fx:{bac:-40},x:`${word(o1)} · thành: được giữ long thai (nếu có) · hỏng: Thái hậu -10`,go:()=>{if(roll(o1))night(S);else apply({th:-10})}},
 {n:"Cầu xin Hoàng thượng",fx:{},x:`${word(o2)} · thành: được giữ long thai (nếu có) · hỏng: Sủng -3`,go:()=>{if(roll(o2))night(S);else apply({sung:-3})}}]}};
/* a rival's night: same formula, no modal */
function rivalNight(v){v.nights++;v.nightLog.push(wk());const q=Math.round(effSac(v)/20+Math.max(...Object.values(v.arts))+R(4)-1);ap(v,{sung:2+Math.round(q/2),an:2+Math.max(0,q)});v.pg=cl(v.pg+6,0,100);v.tablet=0;
 let r=`Đêm qua thẻ bài của ${v.name} được lật. `;
 if(giuBlocked(v)){if(v.bac>=40&&roll(odA(v,45+v.tamco/3))){ap(v,{bac:-40});night(v)}}else night(v);
 if(v.rel<-20&&roll(20)){const o=odA(v,30+v.an/2);if(roll(o)){apply({sung:-4});if(S.mat>=2)r+=`Tai mắt nghe được: gối đầu, ${v.name} nói xấu ngươi. Sủng -4. `}else if(DG()){ap(v,{sung:-6});}}
 if(roll(3)){r+=sendMaid(v)}
 if(roll(8))bestow(v,"night");return r}
function sendMaid(a){const m=a.maid;const rise=roll(30);a.maid=a===S?newMaid(pick(MAIDS.filter(x=>x!==m.name)),45):{name:pick(MAIDS.filter(x=>x!==m.name)),loyal:45};if(a===S)S.tonight=null;
 if(rise&&roomFor("consort")){const n=newRival(0);Object.assign(n,drawFace());n.name=freshName();n.rel=0;relAdd(a,n,m.loyal>=60?30:-25);rivals.push(n);return `Cung nữ ${m.name} của ${NM(a)} hầu thay, được sủng hạnh, phong ${RANKS[0].n} ${n.name}${m.loyal>=60?" và vẫn nhớ ơn chủ cũ":" và trở mặt với chủ cũ"}. `}
 return `Cung nữ ${m.name} của ${NM(a)} hầu thay một đêm rồi được thả ra cung với chút bạc. `}
function anMonth(p){const recent=(p.nightLog||[]).filter(w=>wk()-w<=3).length;p.an=cl((p.an||0)-Math.max(1,4-recent*2),0,100)}

/* ================= THE MONTH FOR EVERY CONSORT ================= */
function pregMonthP(p){if(!p.preg)return"";p.preg++;const me=p===S;
 if(p.fake){const noRec=!(p.nightLog||[]).some(w=>(p.pregWk||0)-w>=0&&(p.pregWk||0)-w<=6);
  if(roll((p.doctor?1.5:3)+(noRec?4:0))){const why=noRec?"Sổ Kính sự phòng không ghi đêm thị tẩm nào trước khi có 'thai', giả mang thai bị lật tẩy, tội khi quân":"Giả mang thai bị thái y khác bắt mạch phát hiện, tội khi quân";if(me){deathSentence(why);return""}deathSentence(p,why);return `${p.name} giả mang thai bị lật tẩy. `}
  if(p.preg>=10){p.preg=0;p.fake=0;if(roll(odA(p,30+p.tamco/2+p.mat*4)))return (me?"Đêm “lâm bồn”, bà đỡ lén đưa vào một hài nhi từ ngoài cung. ":"")+birthP(p,true);if(me){deathSentence("Tráo con bị bắt quả tang, tội khi quân");return""}deathSentence(p,"Tráo con bị bắt quả tang, tội khi quân");return""}
  return""}
 let ev="";if(p.preg===4&&p.hidden){p.hidden=false;if(me)ghenAll(6);ev+=me?"Bụng đã lộ, cả cung biết ngươi có thai. ":`${p.name} có thai đã lộ. `}
 if(p.preg<10){let risk=(p.preg<=3||p.preg>=7?6:2)*(typeof BAL==="object"&&BAL.mort&&BAL.mort.on?BAL.mort.birth.misX:1)+(p.suc<30?8:0);if(p.anthai)risk/=2;
  if(roll(risk)){p.preg=0;p.hidden=false;ap(p,{suc:-20});p.misN=(p.misN||0)+1;ev+=me?`<span class="r">Ngươi động thai, sảy mất đứa bé.</span> Sức -20. `:`${p.name} động thai, sảy mất đứa bé. `}return ev}
 p.preg=0;p.hidden=false;return ev+birthP(p,false)}
/* childbirth risk: 1 base, +3 if Sức<40, +0.5 per year over 30; physician -2, Y thuật 2+ -1.5, an thai -1; floor 0.5 */
function birthRisk(p){return cl(1+(p.suc<40?3:0)+Math.max(0,(p.age||20)-30)*.5-(p.doctor?2:0)-(p.arts&&p.arts.y>=2?1.5:0)-(p.anthai?1:0),.5,60)}
function birthP(p,fake){const me=p===S;
 if(!fake&&roll(birthRisk(p))){if(me){die("Khó sinh, băng huyết mà chết");return""}p.alive=false;if(p.queen)p.queen=false;return `<span class="r">${p.name} khó sinh, băng huyết mà chết.</span> `}
 let ev="";
 if(!fake){let plot=p.catplot?byKey(p.catplot):null;p.catplot=null;
  if(!plot){const bad=others(p).filter(x=>x!==S&&rel(x,p)<-20&&(x.malice>50||(p===S&&x.ghen>=60)));if(bad.length&&roll(15))plot=pick(bad)}
  if(plot&&(plot===S||plot.alive)){if(roll(oSee(p,true))){evA(p,plot,2);relAdd(plot,p,-10);ev+=me?`Bà đỡ do ${plot.name} cài vào định tráo hài nhi bằng một con mèo lột da. Người của ngươi bắt quả tang: thêm 2 chứng cứ. `:`Bà đỡ do ${NM(plot)} cài vào cung ${p.name} bị bắt quả tang. `}
   else{ap(p,{danh:-10,sung:-10});punish(p,"bị đồn sinh ra yêu vật",2);return ev+(me?`<span class="r">Ngươi tỉnh lại thì bên cạnh là một con mèo chết lột da. Cả cung đồn ngươi sinh ra yêu vật.</span> Danh -10 · Sủng -10. Đứa trẻ không rõ tung tích. `:`<span class="r">${p.name} lâm bồn, bên cạnh chỉ có một con mèo chết lột da; cả cung đồn nàng sinh yêu vật.</span> `)}}}
 const n=!fake&&roll(4)?2:1;if(n===2)ev+=me?`<b class="g">Song thai!</b> `:`${p.name} sinh đôi. `;let up=false;
 for(let i=0;i<n;i++){const k=mkKid(R(2)?"m":"f",0);p.kids.push(k);
  if(k.sex==="m"){ev+=me?`<b class="g">Ngươi sinh hạ ${k.name}.</b> `:`${p.name} sinh hạ ${k.name}. `;if(me)ghenAll(15);if(!up&&rkOf(p)<6){up=true;if(typeof promoReward==="function")ev+=promoReward(p,p.kids.filter(x=>x.sex==="m").length===1?"son1":"son");else{if(me)S.rank++;else p.rank++;p.lastPromo=S.turn;ev+=`${me?"Được":p.name+" được"} tấn phong ${rkName(p)}. `}}ap(p,{sung:10,danh:10,th:15});S.emp.mood=0;p.bonusPay=(p.bonusPay||0)+20;if(roll(50))bestow(p,"son")}
  else{ev+=me?`Ngươi sinh hạ ${k.name}. `:`${p.name} sinh hạ ${k.name}. `;if(me)ghenAll(8);if(!up&&rkOf(p)<6&&typeof promoReward==="function"&&!(n===2&&i===0)){up=true;ev+=promoReward(p,"dau")}ap(p,{sung:5,danh:4});p.bonusPay=(p.bonusPay||0)+10;if(roll(50))bestow(p,"dau")}}
 return ev}
/* months between decrees grow with rank: 3 up to Tần, then 5, 7, 9 */
function promoGap(r){return r<3?3:3+(r-2)*2}
function promoReqP(p){if(rkOf(p)>=7)return[];const r=rkOf(p),nx=RANKS[r+1],L=[];const me=p===S,qq=queenP();
 if(p.out)return[[false,"Đang ở lãnh cung"]];L.push([p.sung>=nx.s,`Sủng ${p.sung} (cần ${nx.s})`],[p.danh>=nx.d,`Danh ${p.danh} (cần ${nx.d})`],[S.turn-p.lastPromo>=promoGap(r),`Cách lần sắc phong trước ${S.turn-p.lastPromo} tháng (cần ${promoGap(r)})`]);
 const qBlock=qq&&qq!==p;
 if(qBlock&&r+1>=2&&r+1<7)L.push([p.hh>BAL.qBlockHh||p.th>=BAL.qBlockTh,`Hoàng hậu không chặn (Hoàng hậu ${p.hh}, cần trên ${BAL.qBlockHh}; hoặc Thái hậu ${BAL.qBlockTh})`]);
 if(has("hieuthao"))L.push([p.th>=0,`Hoàng thượng hiếu thảo: Thái hậu không được ghét ${me?"ngươi":"nàng"} (Thái hậu quý ${me?"ngươi":"nàng"} ${p.th}, cần từ 0)`]);
 if(r+1===7){const N=hhNeed(p),tn=N.th,nd=N.duc,sn=N.sons;L.push([S.turn>=(p.seatBan||0),p.seatBan>S.turn?`Vừa tố Hoàng hậu, bị nghi tranh ngôi (còn ${p.seatBan-S.turn} tháng)`:"Không bị nghi tranh ngôi"],[!qq,"Ngôi Hoàng hậu bỏ trống"],[p.th>=tn,sn?`Có hoàng tử: Thái hậu quý ${me?"ngươi":"nàng"} ${p.th} (cần ${tn})`:`Chưa có hoàng tử: Thái hậu phải hết lòng, quý ${me?"ngươi":"nàng"} ${p.th} (cần ${tn})`],[p.duc>=nd,`Đức ${p.duc} (cần ${nd}${N.heir?", mẹ Thái tử":""})`])}
 else if(r+1>=5)L.push([p.hh>BAL.hiOppHh||p.th>=BAL.hiOppTh||!qBlock||(facOf(p)&&facStr(facOf(p))>=BAL.hiOppFac),`Hoàng hậu không phản đối, hoặc Thái hậu ${BAL.hiOppTh}, hoặc phe mạnh (thế lực ${BAL.hiOppFac})`]);
 if(p.confined)L.push([false,`Đang cấm túc (${p.confined} tháng)`]);return L}
function promoReq(){return promoReqP(S)}
/* the vacant seat is contested: every eligible consort (Quý phi and above) weighs in by favour, Thái hậu, sons and name */
/* the seat weighs sons, the clan behind her, Thái hậu, name, rank (same for everyone) */
function seatW(p){const dad=p.dad||40;return 30+Math.min(3,sonsOf(p).length)*15+Math.max(0,p.th||0)/5+(p.danh||0)/6+dad/2+(rkOf(p)>=6?10:0)}
function seatRivals(p){const L=liveRivals(false).filter(v=>v!==p&&v.rank>=5&&!v.confined&&!v.out);if(p!==S&&S.rank>=5&&!S.confined&&!S.out&&promoReqP(S).every(x=>x[0]||/Cách lần/.test(x[1])))L.push(S);return L}
function promoteP(p){if(rkOf(p)>=7||!promoReqP(p).every(x=>x[0]))return"";const me=p===S;p.lastPromo=S.turn;
 if(rkOf(p)===6)return"";
 if(false){const R2=seatRivals(p);if(R2.length){const tot=R2.reduce((s,v)=>s+seatW(v),seatW(p));if(!roll(100*seatW(p)/tot)){const w=R2.sort((a,b)=>seatW(b)-seatW(a))[0];if(S.rank>=7)return"";if(w===S){S.rank=7;S.justCrowned=1;S.lastPromo=S.turn;ghenAll(10);if(qOn())rivals[0].queen=false;return `<b class="g">Thánh chỉ: lập ${S.name} làm Hoàng hậu, chủ trì lục cung.</b> `}w.rank=6;w.queen=true;rivals.splice(rivals.indexOf(w),1);rivals.unshift(w);return `<b>Thánh chỉ: lập ${w.name} làm Hoàng hậu</b>${me?"; ngươi lỡ ngôi trung cung":""}. `}}}
 if(me){S.rank++;ghenAll(10);fx("gold");if(roll(35))bestow(S,"promo");if(S.rank===7){if(qOn())rivals[0].queen=false;return `<b class="g">Thánh chỉ: lập ${S.name} làm Hoàng hậu, chủ trì lục cung.</b> `}return `<b class="g">Thánh chỉ: tấn phong ${S.name} làm ${RANKS[S.rank].n}.</b> `}
 if(p.rank+1>=7){if(S.rank>=7)return"";p.rank=6;p.queen=true;const i=rivals.indexOf(p);rivals.splice(i,1);rivals.unshift(p);return `<b>Thánh chỉ: lập ${p.name} làm Hoàng hậu.</b> `}
 p.rank++;if(roll(35))bestow(p,"promo");return `${p.name} được tấn phong ${RANKS[p.rank].n}. `}
function promote(){return promoteP(S)}
function birth(fake){return birthP(S,fake)}
function pregMonth(){return pregMonthP(S)}
function maidMonthP(p){if(!p.maid)p.maid=p===S?newMaid(pick(MAIDS),45):{name:pick(MAIDS),loyal:50};const m=p.maid;m.loyal=cl(m.loyal-1,0,100);if(m.loyal>=45||!roll(15))return"";const pool=others(p);if(!pool.length)return"";
 const pr=x=>Math.round(-BAL.tw.maid.bac*econSchemeMul(x,p));/* two-way law: buying a maid costs the player's price (Mua người trong cung nàng, Dùng bạc, same rank/guard multiplier); an NPC who cannot pay does not buy */const a=pool.filter(x=>(x.bac||0)>=pr(x)).sort((x,y)=>rel(x,p)-rel(y,p))[0];if(!a)return"";ap(a,{bac:-pr(a)});const me=p===S;let ev;
 if(p.schemes>0){ap(p,{danh:-10});evA(a,p,2);relAdd(a,p,-10);ev=me?`<span class="r">${m.name} bị ${a.name} mua chuộc, đem chuyện ngươi bày mưu hại người kể ra ngoài.</span> Danh -10. `:`Cung nữ của ${p.name} bị ${NM(a)} mua chuộc, khai ra mưu kế của chủ. `;punish(p,"bị cung nữ tố giác mưu kế",2)}
 else{const g=Math.min(30,p.bac);ap(p,{bac:-g});ap(a,{bac:g});ev=me?`<span class="r">${m.name} bị ${a.name} mua chuộc, lấy trộm hộp trang sức của ngươi rồi bỏ trốn.</span> Bạc -30. `:`Cung nữ của ${p.name} bị ${NM(a)} mua chuộc, trộm bạc bỏ trốn. `}
 if(me){S.maid=newMaid(pick(MAIDS.filter(x=>x!==m.name)),BAL.cmaid.newLoy);return ev+`Nội vụ phủ đưa cung nữ ${S.maid.name} đến hầu thay (thiện cảm ${S.maid.loyal}). `}
 p.maid={name:pick(MAIDS),loyal:40};return S.mat>=3?ev:""}
function maidMonth(){return maidMonthP(S)}
function kidsMonth(){let ev="";const moms=[[S,S.kids]].concat(worldOn()?rivals.map(v=>[v,v.kids]):[]);/* NPC kids: host only */
 for(const [p,ks] of moms)for(const k of ks)if(k.alive){k.hp=Math.min(100,k.hp+4);
  if(roll((k.age<3?3:1.5)*(1+(S.storms||0)*.5))){let d=30+R(40);const doc=p===S?S.doctor:(p.alive&&!p.out&&p.doctor);if(doc)d=Math.round(d/2);k.hp-=d;const sk=pick(["lên đậu mùa","sốt cao co giật","mắc kiết lỵ","nhiễm phong hàn nặng"]);
   if(p===S)ev+=k.hp<=0?kidDie(k,`${sk} rồi không qua khỏi`,true):`<span class="r">${k.name} ${sk}.</span> Sức khỏe còn ${k.hp}. `;else if(k.hp<=0)ev+=kidDie(k,`${sk} rồi không qua khỏi`,false)}}
 return ev}
/* rival AI: the same acts as the player, picked by want */
function pickTarget(v){const L=others(v);if(!L.length)return null;const w=L.map(t=>1+hostility(v,t));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}return L[i]}
function npcAct(v,t){const O=[];const add=(k,w)=>{const a=ACT[k];if(a&&a.ok(v,t)&&w>0)O.push([k,w])};const hi=(t===S?v.ghen:hostility(v,t))>=60;
 if(rel(v,t)<0)add("accuse",6);add("vp",rel(v,t)<0?3:0);add("musk",hi?6:3);add("catswap",hi?3:1);
 for(const k of ["kpoison","pond","kframe","ksab"])add(k,hi?2:1);add("takeaway",2);
 if(ACT.pushp)add("pushp",1);if(ACT.trip)add("trip",2);add("frame",1);add("poison",1);add("rumor",2);add("spy",2);add("bribe",1);add("block",t.nightLog&&t.nightLog.length?1:0);
 if(v.inv.some(e=>e.t||IT[e.k].il))add("plant",3);
 if(!O.length)return"";const w=O.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}const k=O[i][0];
 if(k==="plant")return runAct(v,t,"plant",v.inv.findIndex(e=>e.t||IT[e.k].il));return runAct(v,t,k)}
/* what her spies see between two other people (owner 11/15 16:55Z "why is a hairpin gift evidence?"): only a MISDEED is evidence
   (poison, musk, charms, framing, bribes, planting, rumours, a tainted gift…); a plain gift, a visit, a quarrel is news only.
   Evidence gets its own line from j78 with its source ("nguồn: tai mắt của ngươi thấy tận mắt"); nothing is glued to the next event. */
const SEEN_BAD=kRx("(?<![\\p{L}])(độc|xạ hương|bùa|hình nhân|vu oan|vu cáo|vu khống|hối lộ|đút lót|cài|lén|tráo|ám hại|hãm hại|làm hại|hại|tung tin|tin đồn|đồn|xô ngã|đẩy|giấu|trộm|giả mạo|tư thông|âm mưu|mưu|kết bè|nói xấu|xúi|phá|cắt xén|bôi nhọ|ám toán|cướp|bán đứng|uy hiếp|tống tiền|bỏ thuốc|ngáng|gièm|chèn ép|bắt nạt|đe dọa|dọa|khai man|phao tin|làm nhục|tố giác|cáo giác|bị lộ|bị bắt|đồ có vấn đề)(?![\\p{L}])","iu");
function seenBad(txt){return SEEN_BAD.test(String(txt||"").replace(/<[^>]+>/g,""))||(/tặng|dâng/.test(String(txt||""))&&!!window.__giftTaint)}
function seenNPC(v,t,txt){const bad=seenBad(txt);window.__giftTaint=0;if(!txt)return"";if(t===S||v===S)return txt;if(roll(15+S.mat*6)){if(!bad)return `Tai mắt thấy: ${txt}`;evA(S,v,1);return""}return""}
function npcMonthly(v){let ev="";const cost=k=>5+v.arts[k]*5;
 if(roll(30)){const k=pick(Object.keys(v.arts));if(v.arts[k]<5&&(v.bac>=cost(k)||v.suc>=40)){if(v.bac>=cost(k)){ap(v,{bac:-cost(k),suc:-10});v.artp[k]+=1+R(3)}else{ap(v,{suc:-15});v.artp[k]+=1};while(v.arts[k]<5&&v.artp[k]>=v.arts[k]+2){v.artp[k]-=v.arts[k]+2;v.arts[k]++}}}
 if(roll(25)&&S.shop.length){const k=pick(S.shop);if(IT[k]&&v.bac>=IT[k].pr+20&&(!IT[k].il||v.malice>60))buy(v,k)}
 if(v.malice>60&&roll(8)&&v.bac>=45&&!v.inv.some(e=>e.t)){buy(v,"tuithom");taintItem(v,v.inv.length-1,v.inv.some(e=>e.k==="xahuong")?"xa":"bua")}
 npcCourt(v);if(roll(15)){const i=v.inv.findIndex(e=>IT[e.k].gv&&!e.t);if(i>=0)giveTo(v,roll(50)?"emp":"th",i)}
 if(roll(30)&&roll(odA(v,55+v.sung/5+mm())))ap(v,{sung:3});
 if(!S.thDead&&roll(25))twDo(v,null,"thTH");
 if(qOn()&&!v.queen&&roll(20))twDo(v,queenP(),"thHH");
 if(roll(10)){const fr=others(v).filter(t=>rel(v,t)>10&&(t===S||t.alive));if(fr.length&&v.bac>=30){const t=pick(fr);const s=ACT.ally.f(v,t);if(t===S)ev+=s}}
 if(roll(10)&&v.inv.some(e=>!e.h&&(IT[e.k].tg||[]).includes("rv"))){const t=pick(others(v));const i=v.inv.findIndex(e=>!e.h&&(IT[e.k].tg||[]).includes("rv"));if(rel(v,t)>0||t===S&&v.rel>5)ev+=seenNPC(v,t,giveTo(v,t,i))}
 v.inv.forEach((e,i)=>{const it=IT[e.k];if(it.sl&&!e.w&&!e.h&&(it.rk<=rkOf(v)||v.trait==="Kiêu ngạo"))wear(v,i)});
 const ui=v.inv.findIndex(e=>!e.h&&IT[e.k].use&&!e.t&&(v.suc<60||(IT[e.k].ant&&v.preg)));if(ui>=0)useItem(v,ui);
 const ci=v.inv.findIndex(e=>!e.h&&IT[e.k].dr&&IT[e.k].rk<=rkOf(v));if(ci>=0&&!(v.dress&&v.dress.until>S.turn))useItem(v,ci);
 if(roll(20))inspect(v);if(!v.fakeIll&&!illOf(v)&&v.tamco>=45&&roll(3))twDo(v,null,"fakeIll");
 if(!v.preg&&!sonsOf(v).length&&v.tamco>=50&&roll(2))twDo(v,null,"fakePreg");
 if(v.preg&&v.hidden&&v.preg>=2&&v.tamco<55&&roll(50))twDo(v,null,"announce");
 return ev}
function rivalsTurn(){const live=liveRivals(true);let ev="";
 for(const v of live){if(!v.alive||v.out)continue;v.sung=cl(v.sung+R(3)-1,0,100);if(v.block)v.block--;
  if(S.sung>v.sung-10&&!v.queen&&roll(33))v.rel-=1;if(v.queen&&S.rank>=4&&roll(50))v.rel-=1;
  if(S.sac>75)v.ghen=cl(v.ghen+1,0,100);v.ghen=cl(v.ghen-(v.rel>20?3:1),0,100);v.pg=Math.max(0,v.pg-1);
  if(v.queen){const g=others(v).find(p=>evG(v,p)>=2&&rel(v,p)<0);if(g&&roll(35)){ev+=seenNPC(v,g,judge(v,g));if(S.dead)return ev;continue}}
  const t=pickTarget(v);if(!t)continue;
  let want=((v.malice/100)*(rel(v,t)<0?1:.25)+hostility(v,t)/200)*(rkOf(t)>=rkOf(v)-1||(t===S&&v.ghen>=60)?1:.4);if(t.shield)want*=.5;
  if(Math.random()<want*.04){ev+=seenNPC(v,t,npcAct(v,t));if(S.dead)return ev}}
 if(S.block)S.block--;
 const q=rivals[0];if(qOn()&&R(480)===0){q.alive=false;q.queen=false;ev+=`Hoàng hậu ${q.name} băng hà vì bệnh. Ngôi trung cung bỏ trống. `}
if(queenP())S.vacSince=null;
 /* a vacant seat is filled by the Emperor's choice after 3 months of mourning: each week (1 in 8) he weighs every eligible consort, her included (Hoàng quý phi meeting the conditions), by favour, Thái hậu, sons and name */
 if(!queenP()&&S.vacSince==null)S.vacSince=S.turn;
 if(!window.__noOldSeat&&!queenP()&&S.turn-S.vacSince>=3&&roll(12)){const C=liveRivals(false).filter(v=>v.rank>=5&&!v.confined&&!v.out&&S.turn>=(v.seatBan||0));if(S.rank===6&&!S.out&&promoReqP(S).every(x=>x[0]||/Cách lần|bỏ trống/.test(x[1])))C.push(S);
  /* if the seat stays empty 18 months, the Emperor may raise a daughter of a great house from outside (weight 100) */
  if(S.vacSince==null)S.vacSince=S.turn;const OUT={outsider:1};if(roomFor("consort")&&S.turn-S.vacSince>=18)C.push(OUT);const wt=p=>p===OUT?100:seatW(p);
  if(C.length){const tot=C.reduce((s,p)=>s+wt(p),0);let r=Math.random()*tot,w=C[0];for(const p of C){r-=wt(p);if(r<=0){w=p;break}}
   if(w===OUT){const n=newRival(7,true);Object.assign(n,drawFace());n.rank=6;n.queen=true;n.dad=80;rivals.unshift(n);ev+=`<b>Thánh chỉ: rước ${n.name}, con gái danh môn, vào cung lập làm Hoàng hậu.</b>${C.includes(S)?" Ngươi lỡ ngôi trung cung.":""} `}else
   if(w===S){S.rank=7;S.justCrowned=1;S.lastPromo=S.turn;ghenAll(10);ev+=`<b class="g">Thánh chỉ: lập ${S.name} làm Hoàng hậu, chủ trì lục cung.</b> `}else{w.rank=6;w.queen=true;rivals.splice(rivals.indexOf(w),1);rivals.unshift(w);ev+=`<b>Thánh chỉ: lập ${w.name} làm Hoàng hậu, chủ trì lục cung.</b>${C.includes(S)?" Ngươi lỡ ngôi trung cung.":""} `}}}
 if(liveRivals(true).length<4&&R(12)===0&&roomFor("consort")){const n=newRival(R(3));Object.assign(n,drawFace());rivals.push(n);ev+=`Đợt tuyển tú mới: ${n.name} vào cung, phong ${RANKS[n.rank].n}. `}
 return ev}
function rivalsMonth(){let ev="";
 for(const v of liveRivals(true)){if((S.storms||0)&&roll(4*S.storms)){ap(v,{suc:-15});}if(v.confined)v.confined--;if(v.shield)v.shield--;if(v.pray)v.pray--;if(v.fert)v.fert--;v.anthai=0;
  itemMonth(v);ev+=seenNPC(v,v,"")||"";const pm=pregMonthP(v);if(pm)ev+=pm;if(!v.alive||v.out)continue;anMonth(v);ev+=npcMonthly(v);ev+=maidMonthP(v);
  if(v.duc>=60)v.th=cl(v.th+1,-100,100);else if(v.duc<20)v.th=cl(v.th-1,-100,100);ev+=promoteP(v)}
 /* Thái hậu and the Empress reward or punish, by the same rule for every consort */
 const qq=queenP();
 for(const p of consorts()){if(p!==S&&(!p.alive||p.out))continue;
  if(!S.thDead&&p.th>=60&&roll(8)){const k=pick(["nhansam","yensao","vongngoc","huongtram"]);p.inv.push({k,from:"th"});if(p===S)Q.push({t:"Thái hậu ban thưởng",who:pTH(),h:`<p>Đức Thọ cung sai người mang đến <b>${IT[k].n}</b>.</p><p class="past">${IT[k].d}</p>`});else log(`Thái hậu ban ${IT[k].n} cho ${p.name}.`)}
  if(qq&&qq!==S&&qq!==p&&p.hh<=-40&&roll(10)){const i=p.inv.findIndex(e=>IT[e.k].kd==="Trang sức"&&!e.h);if(i>=0){const n=iname(p.inv[i]);/* two-way: the same act as hers (empAct conf): unfounded = Danh/Thái hậu cost, relation and regard fall */if(evG(qq,p)<1&&!vpItems(p).length)ap(qq,BAL.tw.confNo);relAdd(qq,p,-BAL.tw.g.conf[0]);p.hh-=BAL.tw.g.conf[1];p.inv.splice(i,1);ev+=p===S?`<span class="r">Hoàng hậu sai người tịch thu ${n} của ngươi, trách ngươi xa xỉ.</span> `:"";if(p!==S)log(`Hoàng hậu tịch thu ${n} của ${p.name}.`)}}
  if(qq&&qq!==S&&qq!==p&&p.hh>=50&&roll(6)&&(qq.bac||0)>=-BAL.tw.reward.bac){/* two-way: the same Ban thưởng as hers (empAct reward): her bạc, relation +20, regard +10, Danh +3 */ap(qq,BAL.tw.reward);relAdd(qq,p,BAL.tw.g.reward[0]);p.hh+=BAL.tw.g.reward[1];ap(p,{danh:BAL.tw.g.reward[2]});if(p===S)ev+=`Hoàng hậu ${qq.name} ban thưởng cho ngươi. Danh +${BAL.tw.g.reward[2]}. `}
  if(roll(4)){const s=search(p);if(s)ev+=p===S||S.mat>=2?s:""}}
 return ev}
function festival(title,k,lbl){const C=consorts();if(C.length<2)return"";const art=p=>k==="sac"?artW2(p,"vu")*6:(artW2(p,"cam")+artW2(p,"thi"))*3;
 const sc=C.map(p=>(k==="sac"?effSac(p):p[k])+art(p)+R(wet()?40:30)+(wet()&&k==="sac"?-artW2(p,"vu")*3:0));const wi=sc.indexOf(Math.max(...sc)),w=C[wi];
 ap(w,{sung:8,danh:3});if(roll(50))bestow(w,"contest");
 if(w===S){ghenAll(8);return `<span class="g">${title}: ${lbl} của ngươi át cả hậu cung, Hoàng thượng ban thưởng.</span> Sủng +8 · Danh +3. `}
 apply({danh:-2});return `<span class="r">${title}: ${w.name} chiếm hết phong quang, ngươi lu mờ.</span> Danh -2. `}
function artW2(p,k){const l=p.arts[k];return l*(((["cam","ky","thi","hoa"].includes(k)&&has("trongtai"))||(k==="vu"&&has("mesac")))?2:1)}

/* ================= PLAYER-SIDE UI for acts and items ================= */
function wk2(){return 0}
function doAct(i,k){const v=rivals[i],a=ACT[k];if(!v||!a||!can(2)||S.dead||Q.length||!v.alive||v.out||!a.ok(S,v))return;
 if(k==="plant"||k==="gift"){pushDil(mkP(k==="plant"?"plantpick":"giftpick",{v:v.id}),k==="plant"?"Cài đồ vào rương":"Tặng quà");render();return}
 spend(2);const r=runAct(S,v,k);if(r)log(r);render()}
function empAct(i,k){const v=rivals[i];if(!v||S.rank<7||!can(2)||S.dead||Q.length)return;let r="";if(k==="cutpay"){spend(2);v.cutPay=1;v.cutBy="Hoàng hậu";relAdd(S,v,-15);log(`Ngươi sai Nội vụ phủ khất bổng lộc của ${v.name} tháng tới.`);render();return}
 if(k==="judge"){if(evG(S,v)<2)return;r=judge(S,v)}
 else if(k==="conf"){const j=v.inv.findIndex(e=>IT[e.k].kd==="Trang sức"&&!e.h);if(j<0)return;if(evG(S,v)<1&&!vpItems(v).length){apply(BAL.tw.confNo);log(`Tịch thu vô cớ: Danh ${BAL.tw.confNo.danh}, Thái hậu ${BAL.tw.confNo.th}.`)}const n=iname(v.inv[j]);v.inv.splice(j,1);relAdd(S,v,-BAL.tw.g.conf[0]);v.hh-=BAL.tw.g.conf[1];r=`Ngươi tịch thu ${n} của ${v.name}.`}
 else if(k==="reward"){if(S.bac<-BAL.tw.reward.bac)return;apply(BAL.tw.reward);relAdd(S,v,BAL.tw.g.reward[0]);v.hh+=BAL.tw.g.reward[1];ap(v,{danh:BAL.tw.g.reward[2]});r=`Ngươi ban thưởng cho ${v.name}.`}
 else if(k==="pardon"){if(!v.confined&&!v.out)return;if(v.out){v.out=false;v.rank=0}v.confined=0;relAdd(S,v,30);apply({duc:2});r=`Ngươi ân xá cho ${v.name}.`}
 else return;spend(2);log(r);render()}
function giftTargets(){const L=[["emp","Hoàng thượng"]];if(!S.thDead)L.push(["th","Thái hậu"]);liveRivals(true).forEach(v=>L.push([v.id,(v.queen?"Hoàng hậu ":"")+v.name]));return L}
PEND.giftpick=p=>{const e=S.inv[p.ix!=null?p.ix:-1];const L=p.v!=null?[[p.v,(RV(p.v)||{}).name]]:giftTargets();
 if(p.v!=null){const items=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h);return{t:"<p>Chọn món đồ để tặng.</p>",o:items.map(([e,i])=>({n:iname(e)+(e.t?" (đã tẩm)":""),ik:i,fx:{},x:IT[e.k].d,go:()=>{spend(2);log(giveTo(S,RV(p.v),i))}})).concat([{n:"Thôi",fx:{}}])}}
 if(!e)return null;return{t:`<p>Tặng <b>${iname(e)}</b> cho ai?</p>`,o:L.map(([id,n])=>({n,fx:{},x:id==="emp"||id==="th"?(e.t?"không thể dâng đồ đã tẩm":giftVal(Object.assign({k:e.k},IT[e.k]),id)>=8?"rất hợp ý":""):"",go:()=>{if((id==="emp"||id==="th")&&e.t)return;spend(2);log(giveTo(S,id==="emp"||id==="th"?id:RV(id),p.ix))}})).concat([{n:"Thôi",fx:{}}])}};
PEND.plantpick=p=>{const v=RV(p.v);if(!v)return null;const items=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h);
 return{who:pv(v),t:`<p>Sai người lẻn vào cung ${v.name}, cài món gì vào rương nàng?</p><p class="past">${word(oPlant(S,v))} · hỏng: bị bắt, nàng nắm 2 chứng cứ</p>`,o:items.map(([e,i])=>({n:iname(e)+(e.t?" ("+TAINT[e.t].n+")":""),ik:i,fx:{},x:IT[e.k].il||(e.t&&TAINT[e.t].il)?"khám ra là có tội":IT[e.k].rk>rkOf(v)?"vượt phẩm của nàng":"",go:()=>{spend(2);if(p.here){ACTX={a:S,pen:-15};try{log(plantItem(S,v,i)+" (tại cung nàng)")}finally{ACTX={a:null,pen:0}}}else log(runAct(S,v,"plant",i))}})).concat([{n:"Thôi",fx:{}}])}};
PEND.taintpick=p=>{const e=S.inv[p.ix];if(!e)return null;const L=Object.entries(TAINT).filter(([k,T])=>T.on.includes(e.k)&&(!T.need||S.inv.some(x=>x.k===T.need&&!x.h)));
 return{t:`<p>Lén làm gì với <b>${iname(e)}</b>?</p>`,o:L.map(([k,T])=>({n:T.n[0].toUpperCase()+T.n.slice(1),fx:T.c?{bac:-T.c,duc:-3}:{duc:-3},x:T.hurt+(T.need?" · tốn "+IT[T.need].n:""),go:()=>log(taintItem(S,p.ix,k))})).concat([{n:"Thôi",fx:{}}])}};
PEND.evpick=p=>({t:"<p>Tập chứng cứ này nói về ai?</p>",o:liveRivals(true).map(v=>({kgt:v,n:v.name,fx:{},go:()=>log(useItem(S,p.ix,v))})).concat([{n:"Thôi",fx:{}}])});
PEND.itarget=p=>({t:`<p>Dùng ${IT[p.k].n} với ai?</p>`,o:liveRivals(true).map(v=>({kgt:v,n:v.name,fx:{},go:()=>{spend(2);log(useItem(S,p.ix,v))}})).concat([{n:"Thôi",fx:{}}])});
PEND.shop=()=>({who:pEunCourt("ped"),t:"<p>Thái giám Nội vụ phủ bưng vào một khay đồ mua từ ngoài cung, dâng lên cho nương nương chọn: “Đồ mới mang vào, xin nương nương xem qua.”</p>",o:S.shop.map(k=>({n:iic(k,20)+IT[k].n,fx:{bac:-IT[k].pr},x:`${IT[k].kd} · ${IT[k].d}`,go:()=>{S.inv.push({k});log(`Mua ${IT[k].n}.`)}})).concat([{n:"Thôi",fx:{}}])});
PEND.giftin=p=>{const f=byKey(p.f),e=p.e;if(!f)return null;const it=IT[e.k],hi=rkOf(f)>S.rank;
 return{who:pv(f),t:`<p>${f.name} sai người mang <b>${it.n}</b> sang tặng ngươi.</p><p class="past">${it.d}</p>`,o:[
 {n:"Nhận",fx:{},x:"cất vào rương",go:()=>S.inv.push(Object.assign({},e))},
 {n:"Trả lại quà",fx:{},x:hi?"nàng phẩm cao hơn, sẽ phật ý":"nàng hơi phật ý",go:()=>{relAdd(S,f,hi?-12:-4);if(f.queen)apply({hh:-8})}},
 {n:"Đem đến Thái y viện xét nghiệm",fx:{bac:-10},x:`${word(cl(oSee(S,true)+25,5,95))} · thành: nếu đồ bị tẩm sẽ biết, ai gửi · hỏng: không thấy gì`,go:()=>{if(e.t&&roll(cl(oSee(S,true)+25,5,95))){evA(S,f,2);log(`Thái y phát hiện ${it.n} của ${f.name} ${TAINT[e.t].n}. Chứng cứ ${f.name} +2.`)}else{S.inv.push(Object.assign({},e));relAdd(S,f,-3);log(`Thái y không thấy gì lạ ở ${it.n}.`)}}}]}};
function itemAct(a,ix){const e=S.inv[ix];if(!e||S.dead||Q.length)return;const it=IT[e.k];
 if(a==="use"){if(it.evi){pushDil(mkP("evpick",{ix}),"Tập chứng cứ");render();return}if(e.k==="botngua"){if(!can(2))return;pushDil(mkP("itarget",{ix,k:e.k}),it.n);render();return}const r=useItem(S,ix);if(r)log(r)}
 else if(a==="wear")wear(S,ix);
 else if(a==="gift"){if(!can(2))return;pushDil(mkP("giftpick",{ix}),"Tặng quà")}
 else if(a==="sell"){const r=sellItem(S,ix);if(r)log(r)}
 else if(a==="taint")pushDil(mkP("taintpick",{ix}),"Tẩm đồ");
 else if(a==="test"){if(S.bac<10)return;apply({bac:-10});if(e.t&&e.by!=="me"&&roll(cl(oSee(S,true)+25,5,95))){S.inv.splice(ix,1);const by=byKey(e.by);if(by)/*evok: tainted by (scheme)*/evA(S,by,2);log(`Thái y phát hiện ${it.n} ${TAINT[e.t].n}${by?`; dấu vết dẫn về ${NM(by)} (chứng cứ +2)`:""}.`)}else log(`Thái y xét ${it.n}: không thấy gì lạ.`)}
 render()}
function invAct(a){if(S.dead||Q.length)return;
 if(a==="shop"){pushDil(mkP("shop"),"Nhờ thái giám mua đồ");render();return}
 if(a==="inspect"){if(!can(2))return;spend(2);const f=inspect(S);log(f.length?`Kiểm tra rương đồ, tìm thấy: ${f.join("; ")}.`:"Kiểm tra rương đồ: không thấy gì lạ.");if(f.length)Q.push({t:"Kiểm tra đồ",h:`<p>${f.join("<br>")}</p>`});render()}}
function invHTML(){const wb=wearBonus(S),vp=vpItems(S);const vis=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h);
 const groups=[];for(const [e,i] of vis){const g=groups.find(x=>x.k===e.k&&!!x.t===!!(e.by==="me"&&e.t)&&!x.w&&!e.w);if(g)g.n++;else groups.push({k:e.k,t:e.by==="me"?e.t:null,w:e.w,i,n:1,ext:e.t&&e.by!=="me",from:e.from})}
 const dress=S.dress&&S.dress.until>S.turn?`${IT[S.dress.k].n} (đến tháng ${S.dress.until-S.turn} nữa)`:"không";
 let h=`<div class="ph"><span>Đang mặc: Sắc +${wb.sac}${wb.danh?`, Danh +${wb.danh}`:""} · áo mới: ${dress}${vp.length?` · <span class="r">vượt phẩm!</span>`:""}</span><span>Bạc ${S.bac}</span></div>
 <div class="rbtn" style="margin-bottom:6px"><button data-inv="shop">Nhờ thái giám mua đồ<small>thành: xem hàng, mua đồ từ ngoài cung qua thái giám Nội vụ phủ</small></button><button data-inv="inspect" ${!can(2)?"disabled":""}>Kiểm tra đồ<small>${word(oSee(S,true))} · tốn: 2 khắc · thành: tìm ra đồ bị tẩm độc hay bị cài · hỏng: không thấy gì</small></button></div>`;
 if(!groups.length)return h+`<p class="past">Rương trống. Nhờ thái giám mua đồ, hoặc chờ được ban thưởng.</p>`;
 h+=`<div class="cards">`+groups.map(g=>{const it=IT[g.k],i=g.i;const B=[];
  if(it.sl)B.push(`<button data-it="wear" data-ix="${i}">${g.w?"Tháo":"Đeo"}<small>${it.rk>S.rank?"vượt phẩm":"hợp phẩm"}</small></button>`);
  if(it.dr)B.push(`<button data-it="use" data-ix="${i}">May áo<small>${it.rk>S.rank?"vượt phẩm":"3 tháng"}</small></button>`);
  if(it.use||it.evi||g.k==="botngua")B.push(`<button data-it="use" data-ix="${i}">Dùng<small>${g.k==="botngua"?"tốn 2 khắc":fmt(it.use)||"chọn người"}</small></button>`);
  if(g.k!=="ngocboi"||g.t)B.push(`<button data-it="gift" data-ix="${i}" ${!can(2)?"disabled":""}>Tặng<small>tốn 2 khắc</small></button>`);
  if(it.pr)B.push(`<button data-it="sell" data-ix="${i}">Bán<small>Bạc +${Math.floor(it.pr/2)}</small></button>`);
  if(Object.values(TAINT).some(T=>T.on.includes(g.k))&&!g.t)B.push(`<button data-it="taint" data-ix="${i}">Tẩm<small>mưu kế</small></button>`);
  if(g.from&&g.from!=="me"&&g.from!=="emp"&&g.from!=="th")B.push(`<button data-it="test" data-ix="${i}" ${S.bac<10?"disabled":""}>Xét nghiệm<small>Bạc -10</small></button>`);
  return `<div class="card"><h4>${iic(g.k)}${it.n}${g.n>1?` ×${g.n}`:""}${g.w?" · Đang mặc":""}</h4><p>${it.kd} · ${it.d}${g.t?` · <span class="r">đã ${TAINT[g.t].n}</span>`:""}${it.rk?` · bậc ${RANKS[Math.min(7,it.rk)].n}`:""}</p><div class="rbtn">${B.join("")}</div></div>`}).join("")+`</div>`;return h}
/* the tablet: every consort weighted by the same night formula; others may steal it by the same act (the try is chosen in jsteal.js) */
function flip(){S.tonight=null;if(S.dead)return;if(!roll(has("chamchinh")?65:90))return;
 const C=consorts().filter(p=>nightCh(p)>0);if(!C.length)return;const w=C.map(p=>nightCh(p));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}let t=C[i];
 if(t===S)S.tonight="me";else S.tonight=t;
 /* NPC night stealing: agent choice by self-interest, personality, mood and relation (jsteal.js, owner 16/11 14:10Z/14:45Z, OD:L1386); the old hostility ≥ 50 + flat roll is gone */
 if(t===S)pushDil(mkP("ksp"),"Kính sự phòng báo tin")}
function resolveTonight(){const t=S.tonight;S.tonight=null;if(!t||t==="me"||!t.alive||t.out)return"";return rivalNight(t)}
