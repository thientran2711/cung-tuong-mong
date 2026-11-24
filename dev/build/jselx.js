/* ================= jselx: NHẬP CUNG SELECTION — RULES CORE (SELSCENE-2, review/selection-scene) =================
   Owner rows (verbatim in dev/OWNER_DECISIONS.md, handover branch): 23/11 ~22:05Z..~23:47Z, 24/11 ~05:35Z (U2/U3/U4), ~05:40Z (ban hoa = the life
   ends, no outside road), ~05:50Z (every tú nữ scored by the SAME formula as her); brief dev/handover/briefs/M112-selection-scene.md ADD.6/18/19/22/23.
   PURE RULES (no display): the scene layer (KIT §93 + KK16 dialogue parts) calls these. Every number = BAL.selx (ONE CORE, law 4).
   - selxScore(p, marks): ONE score for her AND every tú nữ (law 1): base + Sắc/Đức/Tài + the three test marks (0..10: mini, dd, hx) + luck ±noise.
   - selxResult(sc): {kept, step}: below BAL.selx.ban = BAN HOA; else step −1 / 0 / +1 by BAL.selx.cut.
   - selxRank(p, step, sac): her entry rank = origin rank + step, clamped [0, cap]; cap Tần (BAL.selx.cap); hòa thân roads cap Phi and their +1 needs
     Sắc ≥ BAL.selx.hoaThanSac (ADD.19), else the same rank.
   - selxNpcMarks(v, tests): a tú nữ's own marks: her art level at the mini-game, her nết vs the asking royal's value for đối đáp / hành xử.
   - selxCeremony(girls, herScore): scores every girl, keeps the top BAL.selx.yard.kept (her included when kept), the rest ban hoa.
   - selxBanHoa(): HER ban hoa = the life ends (over, alive), short epilogue line by her origin, then a new life (existing over flow).
   - selxIntake(): tú nữ per intake (also j27 tuyenTu). selxRoomPlan(girls): lodging rooms of BAL.selx.room.perRoom, beds of perBed.
   New lives only (S.selx2); old saves untouched. */
const SELX_V=1;
function selxW(){return BAL.selx.w}
function selxBase(p){const W=selxW();p=p||S;return (W.base||0)+(W.sac||0)*(+p.sac||0)+(W.duc||0)*(+p.duc||0)+(W.tai||0)*(+p.tai||0)}
/* marks: {mini, dd, hx} each 0..10 (a missing test counts as the middle mark 5); luck: false = no noise (for the odds/preview and tests) */
function selxScore(p,m,luck){const W=selxW();m=m||{};const mk=k=>m[k]==null?5:Math.max(0,Math.min(10,+m[k]||0));const n=BAL.selx.noise||0;
 return selxBase(p)+W.mini*mk("mini")+W.dd*mk("dd")+W.hx*mk("hx")+(luck===false||!n?0:R(2*n+1)-n)}
function selxResult(sc){const C=BAL.selx.cut;if(sc<BAL.selx.ban)return{kept:false,step:null};return{kept:true,step:sc>=C[1]?1:sc>=C[0]?0:-1}}
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
 const mini=Math.max(0,Math.min(10,Math.round(3+lv*1.4+R(3)-1)));const pickBy=e=>{if(!e||!e.options)return"";const net=(()=>{try{return netOf(v)||[]}catch(x){return[]}})().join(" ");
  const ST={khiem:/Khiêm nhường|Kín đáo|An phận|Điềm tĩnh/,manh:/Kiêu ngạo|Nóng nảy|Tham vọng/,dido:/Nhiều chuyện|Ham vui|Xảo quyệt/,that:/Thật thà|Thanh liêm|Trọng nghĩa/,
   giuyen:/Điềm tĩnh|Kín đáo|Lạnh lùng/,tuxu:/Nóng nảy|Ân cần|Rộng lượng/,caunguoi:/Khiêm nhường|An phận/,nhan:/Thật thà|Thanh liêm/};
  const o=e.options.find(x=>ST[x.stance]&&ST[x.stance].test(net))||e.options[R(e.options.length)];return selxReact(o,t.keys)};
 return{mini,dd:selxMark(pickBy(t.dd)),hx:selxMark(pickBy(t.hx))}}
/* the ceremony: every girl scored by the one formula; the top BAL.selx.yard.kept are kept (her included by her own score), the rest ban hoa */
function selxCeremony(girls,her){const L=(girls||[]).map(v=>({v,sc:v.__sc!=null?v.__sc:selxScore(v,v.__marks||{})}));if(her)L.push({v:S,sc:her.sc});
 const keptN=BAL.selx.yard.kept;const herRes=her?selxResult(her.sc):null;
 const others=L.filter(x=>x.v!==S).sort((a,b)=>b.sc-a.sc);const room=keptN-(herRes&&herRes.kept?1:0);
 others.forEach((x,i)=>{x.kept=i<room&&x.sc>=BAL.selx.ban});if(her){const me=L.find(x=>x.v===S);me.kept=herRes.kept}return L}
function selxIntake(){const I=BAL.selx.intake;return I.min+R(I.max-I.min+1)}
/* lodging plan: rooms of perRoom girls (her room first), beds of perBed (OD 24/11 ~05:35Z: 1 room, 2 beds, 2 girls per bed) */
function selxRoomPlan(girls){const P=BAL.selx.room,L=[S,...(girls||[]).filter(v=>v!==S)],rooms=[];for(let i=0;i<L.length;i+=P.perRoom){const g=L.slice(i,i+P.perRoom);const beds=[];for(let j=0;j<g.length;j+=P.perBed)beds.push(g.slice(j,j+P.perBed));rooms.push({girls:g,beds})}return rooms}
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
try{window.selxScore=selxScore;window.selxResult=selxResult;window.selxRank=selxRank;window.selxCeremony=selxCeremony;window.selxBanHoa=selxBanHoa;window.selxRoomPlan=selxRoomPlan;window.selxIntake=selxIntake}catch(e){}
