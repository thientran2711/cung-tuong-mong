/* ================= jselx: NHẬP CUNG SELECTION — RULES CORE (SELSCENE-2, review/selection-scene) =================
   Owner rows (verbatim in dev/OWNER_DECISIONS.md, handover branch): 23/11 ~22:05Z..~23:47Z, 24/11 ~05:35Z (U2/U3/U4), ~05:40Z (ban hoa = the life
   ends, no outside road), ~05:50Z (every tú nữ scored by the SAME formula as her); brief dev/handover/briefs/M112-selection-scene.md ADD.6/18/19/22/23.
   PURE RULES (no display): the scene layer (KIT §93 + KK16 dialogue parts) calls these. Every number = BAL.selx (ONE CORE, law 4).
   - selxScore(p, marks): ONE score for her AND every tú nữ (law 1): base + Sắc/Đức/Tài + the three test marks (0..10: mini, dd, hx) + luck ±noise.
   - selxResult(place): {kept, step}: outside the top BAL.selx.yard.kept of the contest = BAN HOA; kept → step −1 / 0 / +1 by her PLACE (BAL.selx.placeStep).
   - selxRank(p, step, sac): her entry rank = origin rank + step, clamped [0, cap]; cap Tần (BAL.selx.cap); hòa thân roads cap Phi and their +1 needs
     Sắc ≥ BAL.selx.hoaThanSac (ADD.19), else the same rank.
   - selxNpcMarks(v, tests): a tú nữ's own marks: her art level at the mini-game, her nết vs the asking royal's value for đối đáp / hành xử.
   - selxGirls(): the other BAL.selx.yard.n − 1 tú nữ of this life (real people, law 6b; newRival + drawFace, own standing BAL.selx.npcRank).
   - selxContest(girls, herMarks): THE CONTEST (OD 24/11 ~06:15Z): every tú nữ AND her scored by the one formula on the same 3 tests, ranked; the top
     BAL.selx.yard.kept kept, the rest ban hoa — her included (not in the top = ban hoa = the life ends). Only the 3 tests count (OD ~06:20Z).
   - selxBanHoa(): HER ban hoa = the life ends (over, alive), short epilogue line by her origin, then a new life (existing over flow).
   - selxIntake(): tú nữ per intake (also j27 tuyenTu). selxRoomPlan(girls): lodging rooms of BAL.selx.room.perRoom, beds of perBed.
   New lives only (S.selx2); old saves untouched. */
const SELX_V=1;
function selxW(){return BAL.selx.w}
function selxBase(p){const W=selxW();p=p||S;return (W.base||0)+(W.sac||0)*(+p.sac||0)+(W.duc||0)*(+p.duc||0)+(W.tai||0)*(+p.tai||0)}
/* marks: {mini, dd, hx} each 0..10 (a missing test counts as the middle mark 5); luck: false = no noise (for the odds/preview and tests) */
function selxScore(p,m,luck){const W=selxW();m=m||{};const MK=BAL.selx.mark;const mk=k=>m[k]==null?MK.mid:Math.max(MK.lo,Math.min(MK.hi,+m[k]||0));/* law 4 (RV-SELX13 8): the mark scale from BAL */const n=BAL.selx.noise||0;
 return selxBase(p)+W.mini*mk("mini")+W.dd*mk("dd")+W.hx*mk("hx")+(W.imp||0)*mk("imp")/* first impression (SELSCENE-5, OD ~08:55Z): the royals' look, the same default for all */+(luck===false||!n?0:R(2*n+1)-n)}
function selxResult(place){const B=BAL.selx;if(!(place>=1&&place<=B.yard.kept))return{kept:false,step:null};return{kept:true,step:B.placeStep[place-1]}}
function selxHoaThan(k){return (BAL.selx.hoaThan||[]).includes(k||(S&&S.origin&&S.origin.k))}
function selxRank(p,step,o){o=o||{};const k=o.k||(S&&S.origin&&S.origin.k);const r0=o.r0!=null?o.r0:((S&&S.origin&&S.origin.r)||0);const ht=selxHoaThan(k);
 const cap=ht?BAL.selx.hoaThanCap:BAL.selx.cap;let st=step;if(ht&&st>0&&(+((p||S).sac)||0)<BAL.selx.hoaThanSac)st=0;/* ADD.19: the +1 of a princess needs «vua thấy đẹp» */
 return Math.max(0,Math.min(Math.max(cap,r0),r0+st))}/* an origin already above the cap keeps its rank (never pushed down by the cap) */
/* the asking royal's reaction to an answer: "+" / "−" / "" from the option's reacts map and the royal's nết keys this life */
function selxReact(opt,keys){let r="";for(const k of keys||[]){const v=opt&&opt.reacts&&opt.reacts[k];if(v==="+")return"+";if(v==="−"||v==="-")r="−"}return r}
function selxFav(react){const F=BAL.selx.fav;return react==="+"?F.plus:react==="−"?F.minus:0}
function selxMiniFav(mark){for(const [t,f] of BAL.selx.fav.mini)if(mark>=t)return f;return 0}
/* answer mark of a test from the reaction (the same for her and for a girl): + = hit, − = miss, none = middle */
function selxMark(react){const M=BAL.selx.npcMatch;return react==="+"?M.hit:react==="−"?M.miss:M.none}
/* a tú nữ's own marks (law 1: the same tests, her own skill and nết): mini = her art level mark; dd/hx = how her nết's way of answering fits the royal */
function selxNpcMarks(v,t){t=t||{};const lv=(()=>{try{return t.art&&typeof kg82LvFor==="function"?kg82LvFor(v,t.art):0}catch(e){return 0}})();
 const NM=BAL.selx.npcMini;const MK=BAL.selx.mark;const mini=Math.max(MK.lo,Math.min(MK.hi,Math.round(NM.base+lv*NM.lv+R(2*NM.r+1)-NM.r)));/* law 4: numbers from BAL */const pickBy=(e,rf)=>{if(!e||!e.options)return"";const net=(()=>{try{return netOf(v)||[]}catch(x){return[]}})().join(" ");
  const ST={khiem:/Khiêm nhường|Kín đáo|An phận|Điềm tĩnh/,manh:/Kiêu ngạo|Nóng nảy|Tham vọng/,dido:/Nhiều chuyện|Ham vui|Xảo quyệt/,that:/Thật thà|Thanh liêm|Trọng nghĩa/,
   giuyen:/Điềm tĩnh|Kín đáo|Lạnh lùng/,tuxu:/Nóng nảy|Ân cần|Rộng lượng/,caunguoi:/Khiêm nhường|An phận/,nhan:/Thật thà|Thanh liêm/};
  const kn=rf&&e.__k&&(v.__kn||{})[e.__k]>=1?e.options.find(x=>rf(x)==="+"):null;/* SELSCENE-5: she asked the ma ma (law 1, the same road as her) */
  const o=kn||e.options.find(x=>ST[x.stance]&&ST[x.stance].test(net))||e.options[R(e.options.length)];return rf?rf(o):selxReact(o,t.keys)};/* rf = the asking royal's reaction (jselxday selxReactR, the same for her) */
 return{mini,dd:selxMark(pickBy(t.dd,t.rdd)),hx:selxMark(pickBy(t.hx,t.rhx))}}
/* the other tú nữ of this life: real people (law 6b), drawn like the mid-game tuyển tú (j27) — own standing + face + age from BAL */
function selxWt(L){const t=L.reduce((a,x)=>a+x[1],0);let r=R(t);for(const x of L){if((r-=x[1])<0)return x[0]}return L[0][0]}
function selxGirls(n){const B=BAL.selx;n=n==null?B.yard.n-1:n;const L=[];for(let i=0;i<n;i++){const r0=selxWt(B.npcRank);const v=newRival(r0);try{Object.assign(v,drawFace())}catch(e){}
  v.age=B.npcAge[0]+R(B.npcAge[1]);v.tuNu=1;v.r0=r0;L.push(v)}return L}
/* THE CONTEST: the same 3 tests and the same formula for everyone (law 1); ties: higher Sắc first. Returns the ranked list [{v, sc, marks, place, kept, step}] */
function selxContest(girls,her){const B=BAL.selx;const L=(girls||[]).map(v=>{const marks=v.__marks||Object.assign(selxNpcMarks(v,her&&her.t||{}),v.__impMk!=null?{imp:v.__impMk}:{});return{v,marks,sc:v.__sc!=null?v.__sc:Math.round(selxScore(v,marks))}});
 if(her)L.push({v:S,marks:her.marks||{},sc:her.sc!=null?her.sc:Math.round(selxScore(S,her.marks||{}))});
 L.sort((a,b)=>b.sc-a.sc||(+b.v.sac||0)-(+a.v.sac||0));L.forEach((x,i)=>{x.place=i+1;const r=selxResult(i+1);x.kept=r.kept;x.step=r.step});return L}
/* RV-SELX13 5 (law 6b, LIVE j27 tuyenTu rule): the palace takes a girl only while roomFor("consort") (the one room rule); a kept girl beyond the free rooms is
   not kept (ban hoa), so no girl is ever announced (podium, «Ban hương nang», «Tin sắc phong», phân cung) who does not enter. selxRoomsFree(max) counts
   the free rooms with the one rule (placeholders pushed for the count only, removed at once). Her own place is never touched (she already lives). */
function selxRoomsFree(max){if(typeof roomFor!=="function")return max;let n=0;const P=[];try{while(n<max&&roomFor("consort")){const d={alive:true,__ph:1};P.push(d);rivals.push(d);n++}}finally{for(const d of P){const i=rivals.indexOf(d);if(i>=0)rivals.splice(i,1)}}return n}
function selxRoomCap(L){let F=selxRoomsFree(BAL.selx.yard.kept);for(const x of L){if(x.v===S||!x.kept)continue;if(F>0){F--;continue}x.kept=false;x.step=null;x.noRoom=1}return L}
/* the hương nang (RV-SELX13 10, law 6c): a real item (BAL.selx.huong) in the kept girl's chest, her included — once */
function selxHuong(p){try{p.inv=p.inv||[];if(!p.inv.some(e=>e&&e.from==="selx"))p.inv.push({k:BAL.selx.huong,from:"selx"})}catch(e){}}
function selxIntake(){const I=BAL.selx.intake;return I.min+R(I.max-I.min+1)}
/* lodging plan: rooms of perRoom girls (her room first), beds of perBed (OD 24/11 ~05:35Z: 1 room, 2 beds, 2 girls per bed) */
function selxRoomPlan(girls){const P=BAL.selx.room,L=[S,...(girls||[]).filter(v=>v!==S)],rooms=[];for(let i=0;i<L.length;i+=P.perRoom){const g=L.slice(i,i+P.perRoom);const beds=[];for(let j=0;j<g.length;j+=P.perBed)beds.push(g.slice(j,j+P.perBed));const V=(BAL.selx.lodge&&BAL.selx.lodge.so)||[];const vi=V[rooms.length];rooms.push({girls:g,beds,so:vi?vi[0]:"",soN:vi?vi[1]:""})}return rooms}
/* ban hoa epilogue by origin (VANPHONG: cổ trang, no numbers); the life ends alive outside the palace — no outside road (OD 24/11 ~05:40Z) */
const SELX_EPI={tt:"Ngươi về lại phủ Tể tướng. Cha ngươi gả ngươi cho con nhà quan văn; ngươi sống yên ổn, chỉ thỉnh thoảng nhìn về phía cung thành.",
 td:"Ngươi về lại nhà tướng. Mấy năm sau ngươi theo chồng ra biên ải, không bao giờ trở lại kinh thành.",
 cn:"Ngươi trở về nhà, nghề trà của gia đình vẫn đợi. Tiếng đồn ngươi từng được gọi vào cung theo ngươi cả đời.",
 thd:"Ngươi về quê, mở một lớp dạy chữ cho con gái trong vùng. Cung cấm chỉ còn là một giấc mộng xa.",
 muoi:"Ngươi về lại phường muối. Năm tháng mặn chát trôi qua, ngươi gả cho người cùng xóm.",
 dtq:"Ngươi về lại nhà. Cha mẹ thở dài, rồi cũng sắp xếp cho ngươi một mối thân sự tầm thường.",
 ch:"Ngươi về lại nhà. Người ta bàn tán ít lâu, rồi quên.",
 nc:"Đoàn sứ đưa ngươi về cố quốc. Ngươi sống nốt đời trong cung điện quê nhà, không ai nhắc đến Đại Hy nữa.",
 bd:"Ngươi theo đoàn sứ về thảo nguyên. Gió bắc thổi tan dần ký ức về cung thành.",
 pf:"Thuyền đưa ngươi về Phù Tang. Ngươi sống lặng lẽ bên bờ biển quê nhà.",
 _:"Ngươi bị ban hoa, rời cung về nhà. Kiếp này trôi qua ngoài cung cấm, bình lặng và xa xôi."};
function selxEpi(k){return SELX_EPI[k]||SELX_EPI._}
function selxBanHoa(){if(!S||S.dead)return"";const k=S.origin&&S.origin.k;S.selx2=Object.assign(S.selx2||{},{ban:1});
 return over("Ban hoa",selxEpi(k),"Bị ban hoa, xuất cung",true)}
/* ---------- WIRING (SELSCENE-3): the direct road «Vào cung ngay» (jkc2 kc2SelDo) for NEW lives (S.selx2; old saves keep the S.selx ceiling path) ----------
   Until the scene layer lands (yard / hall / three tests), the one mini-game of the selection is the «mini» mark and đối đáp / hành xử count as the
   middle mark (selxScore default). Result: ban hoa → the life ends (selxBanHoa); kept → origin rank −1 / 0 / +1, cap Tần / hòa thân cap Phi (selxRank).
   X.tier = step + 1 keeps jentry entFx (BAL.entry.fx gain / loss) and the j67 / joi readers working; X.why is the reason in words (VANPHONG, no numbers). */
/* a new life on the new rule: the direct road (S.selx2) or a kd home road (S.kc.selx2); the tiểu thư Điện tuyển road (jkc kcDien) is not wired yet */
function selxNew(){return !!(S&&(S.selx2||(S.kc&&S.kc.selx2)))}
/* the highest rank this life can be given (for the «Cao nhất kỳ này» tile): origin +1 with the Sắc the hòa thân +1 needs, clamped by the cap */
function selxTop(){return selxRank({sac:BAL.selx.hoaThanSac},1)}
const SELX_SELW="buổi hôm nay định ngươi được phong cao hơn, đúng bậc, hay thấp hơn một bậc";
/* every other tú nữ's own result (law 1): kept → her own origin standing ±1 (cap Tần) and she enters the palace as a real consort; ban hoa → she goes home,
   kept as a record of a real person (law 6b: name, face, house — never vanishes) */
function selxNpcOut(L){const Z=S.selx2;Z.out=Z.out||[];for(const x of L){if(x.v===S||x.v.__done)continue;x.v.__done=1;
  if(x.kept){x.v.rank=selxRank(x.v,x.step,{k:"_",r0:x.v.r0});selxHuong(x.v);rivals.push(x.v);try{palFix()}catch(e){}}/* RV-SELX13 5 (law 6b): selxRoomCap already kept only the girls the palace can take */
  else Z.out.push({id:x.v.id,name:x.v.name,face:x.v.face,hue:x.v.hue,sc:x.sc,ban:1})}Z.girls=[]}
/* DAY 1 (OD 24/11 ~07:05Z): the other tú nữ exist from the start of the selection — the same girls she lodges with, meets in the yard and competes with;
   rooms in BAL.selx.lodge (Dưỡng Tú viện, one sở per room, OD ~08:20Z) by selxRoomPlan; stored as ids so a save holds one copy of each girl */
function selxDay1(){const Z=S.selx2;if(!Z||Z.girls&&Z.girls.length)return;Z.girls=selxGirls();Z.rooms=selxRoomPlan(Z.girls).map(r=>({so:r.so,ids:r.girls.map(v=>v===S?"me":v.id),beds:r.beds.map(b=>b.map(v=>v===S?"me":v.id))}))}
/* the visible ranking, like the hội thi results: the kit podium (j90 kitPodiumShow), score in «phần», kept / ban hoa under each name */
function selxPodShow(L){if(typeof kitPodiumShow!=="function"||window.__bot||typeof document==="undefined")return null;
 return kitPodiumShow(L.map(x=>({who:x.v,place:x.place,score:`${x.sc} phần`,sub:x.kept?"ban hương nang":"ban hoa",you:x.v===S?"Ngươi":undefined})),{title:"Điện tuyển",sub:`Giữ ${typeof selxNumW==="function"?selxNumW(BAL.selx.yard.kept):BAL.selx.yard.kept} người điểm cao nhất`,next:"Tiếp",unknown:v=>!(typeof selxMet==="function"?selxMet(v):true)/* KIT 26.4 (kit-batch2 1ba60626, MAIN 117 Q5): NAMED is not MET — a girl not greeted stands as the grey silhouette with her name, no cuMeet */})}
const SELX_WHY={up:"Được ban hương nang; được phong cao hơn thân phận",eq:"Được ban hương nang; được phong đúng thân phận",dn:"Được ban hương nang, nhưng phong thấp hơn thân phận một bậc"};
function selxSelDo(raw){if(S.selx2&&S.selx2.days&&typeof selxMiniDone==="function")return selxMiniDone(raw);/* SELSCENE-4: the 3 days — the mini-game is Hoàng thượng's test of DAY 2 (jselxday) */const X=S.selx;const Z=S.selx2=S.selx2||{v:SELX_V};const t={art:X.art||(()=>{try{return entKind(entBest())}catch(e){return""}})()};/* a skipped round: everyone on her own best board kind, the same board for all */
 const girls=Z.girls&&Z.girls.length?Z.girls:(Z.girls=selxGirls());const L=selxRoomCap(selxContest(girls,{marks:{mini:raw},t}));const me=L.find(x=>x.v===S);
 const res={kept:me.kept,step:me.step};const sc=me.sc;X.sc=sc;X.kept=res.kept;X.step=res.step;X.place=me.place;
 Z.pod=L.map(x=>({id:x.v===S?"me":x.v.id,sc:x.sc,place:x.place,kept:x.kept}));selxNpcOut(L);try{selxPodShow(L)}catch(e){console.error("selx pod",e)}
 if(!res.kept){X.tier=0;X.fx=1;X.why="Bị ban hoa";log("Tuyển chọn: bị ban hoa, xuất cung.");try{kcSnapReset()}catch(e){}selxBanHoa();return}
 selxHuong(S);X.tier=res.step+1;const r0=(S.origin&&S.origin.r)||0;const rank=selxRank(S,res.step);const was=S.rank;S.rank=rank;
 if(rank<was)S.sung=Math.max(0,(S.sung||0)-(was-rank)*BAL.entry.stepSung);S.lastPromo=S.turn;try{palFix()}catch(e){}try{kc2R0()}catch(e){}
 X.why=rank>r0?SELX_WHY.up:rank<r0?SELX_WHY.dn:SELX_WHY.eq;
 const c=Q.find(m=>m.t==="Nhập cung");if(c){const h0=String(c.h),nw=`${RANKS[rank].n} (kỳ tuyển chọn: ${KC2SW[X.tier]})`;
  c.h=h0.includes(`phong <b>${RANKS[was].n}</b>`)?h0.replace(`phong <b>${RANKS[was].n}</b>`,`phong <b>${nw}</b>`):h0.replace(new RegExp(`(Phong[\\s\\S]*?>)${RANKS[was].n}(<)`),`$1${nw}$2`);
  try{if(typeof oiPut==="function")oiPut(c,X.why)}catch(e){}}
 log(`Tuyển chọn (${KC2SW[X.tier]}): phong ${RANKS[rank].n}.`);try{kcSnapReset()}catch(e){}deal()}
try{window.selxSelDo=selxSelDo;window.selxScore=selxScore;window.selxResult=selxResult;window.selxRank=selxRank;window.selxContest=selxContest;window.selxGirls=selxGirls;window.selxBanHoa=selxBanHoa;window.selxRoomPlan=selxRoomPlan;window.selxIntake=selxIntake}catch(e){}
