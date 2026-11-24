/* ================= jmgpool: MINI-GAME CONTENT POOLS composed from parts (ORDER THIN P1, owner OD 23/11 ~22:50Z; EVCAT §3 P1) =================
   One pool per test type, >= BAL.mgp.min (40) items, each built from parts (hat: theme × omitted line × melody contour; hoa: season × tray;
   banh: dish type × main × two extras; huong: essence triple × target mix; ve: layout × motif set; kim: shape set × layout seed) and drawn
   through the ONE shared cross-life no-repeat memory (jnorep, family `mg:<kind>`, key = item id: last BAL.nr.lives lives, weight BAL.nr.w per life seen).
   Rules, board sizes and difficulty-by-rank stay in the engines (BAL.mgTier*); a pool item only decides WHICH content the board shows.
   API: mgpItems(kind) -> the composed pool · mgpOne(kind,used?,filter?) -> one item drawn through P0 (used = ids already shown this game, pushed on)
        mgpRng(seedString) -> deterministic () => 0..1 · mgpSkin(kind) -> skin id or "" (mgskin:<kind>, today's art when no skin is registered).
   Player-visible words (song lines, dish names) are cổ trang, no digits, no %, per dev/kit/VANPHONG.md. ONE CORE: counts/limits read BAL.mgp (jbal2.js). */
const MGP_C={};
function mgpRng(s){s=String(s);let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}
 let a=(h=Math.imul(h^h>>>16,2246822507)^Math.imul(h^h>>>13,3266489909))^h>>>16;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
/* hat: eight themes × five lục bát lines; a song = one theme with one line left out (5) × three melody contours = 120 songs */
const MGP_HAT={
 "Tây Hồ":["Gió đưa cành trúc la đà","Tiếng chuông Trấn Vũ canh gà Thọ Xương","Mịt mù khói tỏa ngàn sương","Nhịp chày Yên Thái mặt gương Tây Hồ","Sen vừa hé nụ bên bờ"],
 "Xuân":["Xuân về én liệng trước hiên","Đào hồng thắm nụ bên thềm sớm mai","Mưa phùn thấm ướt tóc mây","Cành mai rụng cánh vương đầy lối đi","Nắng non vàng cả mái ngói"],
 "Hạ":["Sen hồng thơm ngát mặt hồ","Ve ngân khúc hạ giữa trưa vắng người","Bóng đa che mát sân đình","Thuyền ai chở nắng ngang dòng sông xanh","Gió nồm thổi mát lầu son"],
 "Thu":["Thu sang lá rụng đầy sân","Cúc vàng khoe sắc bên hàng giậu thưa","Trăng thu soi bóng song đào","Nhạn bay về phía chân mây xa xôi","Hương cốm thoảng ngõ chiều thu"],
 "Đông":["Đông sang gió buốt lầu cao","Lò than ấm áp bên bàn trà thơm","Mai vàng nở rộ trong sương","Tuyết rơi phủ trắng mái hiên thâm cung","Đèn khuya soi bóng thêu hoa"],
 "Trăng":["Đêm rằm trăng tỏ giữa trời","Bóng nga thấp thoáng bên thềm hoa lê","Ngân hà vắt ngang đỉnh trời","Gió đưa tiếng sáo vọng về canh khuya","Vầng trăng soi tỏ lòng ai"],
 "Hội":["Đèn hoa rực rỡ khắp thành","Tiếng trống hội vọng quanh đình sớm hôm","Áo là phấp phới ngoài sân","Pháo hồng nổ rộn khắp vùng xuân tươi","Người đi trảy hội chen chân"],
 "Thuyền":["Thuyền ai neo bến sông trăng","Mái chèo khua nhẹ nước trong lững lờ","Sương giăng mờ mịt bờ đê","Tiếng ca vọng lại bên hồ xa xa","Cánh buồm no gió về xuôi"]};
function mgpGenHat(){const out=[],CT=[[1.05,2.2,3.5,.19,.08,.035],[.9,2,3.2,.19,.085,.03],[1,1.8,3.4,.18,.09,.03]];/* contours never steeper than today's (sum of amplitude × frequency <= .498) */
 for(const th of Object.keys(MGP_HAT)){const L=MGP_HAT[th];for(let o=0;o<L.length;o++)for(let c=0;c<CT.length;c++){const id=`hat-${th}-${o}-${c}`,R=mgpRng(id);
  out.push({id,theme:th,lines:L.filter((_,i)=>i!==o),f:CT[c].slice(0,3),a:CT[c].slice(3),ph:[R()*6,R()*6,R()*6]})}}return out}
/* hoa: four seasons × six look-alike orders × twenty-one pairs of other flowers = 504 trays */
function mgpGenHoa(){const out=[],NS=4,NL=3,NO=7,PR=[];for(let a=0;a<NO;a++)for(let b=a+1;b<NO;b++)PR.push([a,b]);
 const ROT=[[0,1,2],[1,2,0],[2,0,1],[0,2,1],[2,1,0],[1,0,2]];
 for(let si=0;si<NS;si++)for(let t=0;t<ROT.length*PR.length;t++)out.push({id:`hoa-${si}-${t}`,si,like:ROT[t%ROT.length],oth:PR[Math.floor(t/ROT.length)]});return out}
/* banh: dish type × main × two extras (only ingredients that have a painting on the CDN; fire zone 2 big / 1 middle / 0 small, as K91_RC) */
function mgpGenBanh(){const out=[],seen=new Set(),lc=s=>s.charAt(0).toLowerCase()+s.slice(1);
 const add=(nm,st)=>{const n=st.map(x=>x[0]);if(new Set(n).size!==n.length)return;const id="banh-"+n.join("|");if(seen.has(id))return;seen.add(id);out.push({id,nm,steps:st})};
 add("Chè hạt sen long nhãn",[["Nước giếng",2],["Hạt sen",1],["Long nhãn",0],["Đường phèn",0]]);add("Gà ác tần thuốc bắc",[["Gà ác",2],["Thuốc bắc",1],["Táo đỏ",1],["Kỷ tử",0]]);
 add("Cháo yến sào",[["Gạo tám",2],["Nước dùng",1],["Yến sào",0],["Đường phèn",0]]);add("Canh hạt sen hầm xương",[["Xương ống",2],["Hạt sen",1],["Củ sen",1],["Hành ngò",0]]);
 const SW=["Hạt sen","Long nhãn","Táo đỏ","Kỷ tử","Củ sen"];
 for(const m of SW)for(const a of ["Long nhãn","Đường phèn","Kỷ tử","Táo đỏ"])for(const b of ["Đường phèn","Kỷ tử"])add(`Chè ${lc(m)} ${lc(a)}${b===a?"":" "+lc(b)}`,[["Nước giếng",2],[m,1],[a,0],[b,0]]);
 for(const m of ["Yến sào","Hạt sen","Gà ác","Kỷ tử","Táo đỏ"])for(const f of ["Đường phèn","Hành ngò","Kỷ tử"])add(`Cháo ${lc(m)} ${lc(f)}`,[["Gạo tám",2],["Nước dùng",1],[m,0],[f,0]]);
 for(const m of ["Hạt sen","Củ sen","Táo đỏ"])for(const s of ["Củ sen","Hạt sen","Táo đỏ","Thuốc bắc"])for(const f of ["Hành ngò","Kỷ tử"])add(`Canh ${lc(m)} ${lc(s)} hầm xương`,[["Xương ống",2],[m,1],[s,1],[f,0]]);
 for(const m of ["Thuốc bắc","Hạt sen","Củ sen"])for(const s of ["Táo đỏ","Kỷ tử","Long nhãn"])for(const f of ["Kỷ tử","Hành ngò","Đường phèn"])add(`Gà ác tần ${lc(m)} ${lc(s)}`,[["Gà ác",2],[m,1],[s,1],[f,0]]);
 return out}
/* huong: three essences (colour apart) × a target mix (three weights 1..6, spread >= 2) */
const MGP_ES=[[122,74,42],[236,230,170],[200,80,30],[224,122,154],[79,176,160],[176,136,80],[160,120,200]];
function mgpGenHuong(){const out=[],TV=[[1,3,5],[5,2,3],[2,5,1],[4,1,5],[3,6,1],[6,2,4],[2,4,6],[6,3,1],[1,4,2],[3,1,5],[5,5,2],[4,6,2]],D=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
 for(let a=0;a<7;a++)for(let b=a+1;b<7;b++)for(let c=b+1;c<7;c++){const E=[a,b,c];if(!(D(MGP_ES[a],MGP_ES[b])>90&&D(MGP_ES[a],MGP_ES[c])>90&&D(MGP_ES[b],MGP_ES[c])>90))continue;
  for(let t=0;t<TV.length;t++)out.push({id:`huong-${a}${b}${c}-${t}`,E,tv:TV[t]})}return out}
/* ve: six layouts (the three masters' scrolls and their mirror images) × forty motif sets (far = núi khách / hạc, middle = núi chủ / tùng / hạc, near = thuyền / tùng) */
function mgpGenVe(){const out=[],LAY=[[[.30,.46],[.74,.28],[.62,.80],[.12,.74],[.88,.58],[.50,.22]],[[.22,.26],[.62,.42],[.26,.78],[.78,.82],[.84,.18],[.46,.84]],[[.74,.38],[.26,.24],[.44,.58],[.16,.76],[.62,.84],[.92,.62]]];
 const far=["sonkhach","hac"],mid=["sonchu","tung","hac"],near=["thuyen","tung"],ROLE=v=>v<.36?far:v<.66?mid:near;
 for(let l=0;l<6;l++){const S=LAY[l%3].map(([u,v])=>[l<3?u:+(1-u).toFixed(2),v]);
  for(let k=0;k<40;k++){const m=S.map(([u,v],i)=>{const R=ROLE(v);return[R[(k+i*(1+(k>>1)))%R.length],u,v]});
   /* the first motifs (a game shows 3–4 of them) must hold two kinds at least */
   if(new Set(m.slice(0,3).map(x=>x[0])).size<2){const R=ROLE(m[1][2]),a=R.find(t=>t!==m[0][0]);if(a)m[1][0]=a}
   out.push({id:`ve-${l}-${k}`,m})}}return out}
/* kim: a fold set × a layout seed (hole places are drawn from the seed: the same item = the same paper) */
function mgpGenKim(){const out=[],SH=[["moon","tri"],["moon","drop"],["tri","drop"],["moon","tri","drop"]];/* never a single shape: the board keeps its choice */
 for(let s=0;s<SH.length;s++)for(let q=0;q<80;q++)out.push({id:`kim-${s}-${q}`,sh:SH[s],seed:`kim${s}-${q}`});return out}
/* tho: every calligraphy glyph (jnwp NW_GLYPH, the one table) × six brush manners (upright · narrow · leaning right · leaning left · slight lean · narrow lean); a manner only reshapes the unit square, strokes and order stay */
function mgpGenTho(){const out=[],G=typeof NW_GLYPH!=="undefined"?NW_GLYPH:null;if(!G)return out;const MAN=[[1,0],[.88,0],[1,.08],[.9,-.08],[.94,.04],[.84,-.05]],cl=v=>Math.max(.06,Math.min(.94,+v.toFixed(3)));
 for(const n of Object.keys(G))for(const [nm,S] of G[n])for(let m=0;m<MAN.length;m++){const [k,sk]=MAN[m];out.push({id:`tho-${n}-${nm}-${m}`,n:+n,g:[nm,S.map(st=>st.map(([x,y])=>[cl(.5+(x-.5)*k+sk*(.5-y)),y]))]})}return out}
/* le: object set (N of the eight altar pieces, jnwq NWQ_LE) × a layout of the sample table (three per N) */
const MGP_LAYLE={3:[[[.5,.28],[.24,.72],[.76,.72]],[[.24,.28],[.76,.28],[.5,.72]],[[.5,.5],[.2,.3],[.8,.7]]],
 4:[[[.24,.28],[.76,.28],[.24,.72],[.76,.72]],[[.5,.2],[.22,.5],[.78,.5],[.5,.8]],[[.2,.3],[.5,.24],[.8,.3],[.5,.74]]],
 5:[[[.17,.28],[.5,.22],[.83,.28],[.33,.74],[.67,.74]],[[.2,.26],[.8,.26],[.5,.5],[.2,.76],[.8,.76]],[[.5,.2],[.2,.46],[.8,.46],[.33,.76],[.67,.76]]]};
function mgpGenLe(){const out=[],O=typeof NWQ_LE!=="undefined"?NWQ_LE:[];if(!O.length)return out;
 for(const N of [3,4,5])for(let l=0;l<MGP_LAYLE[N].length;l++){const comb=(st,k)=>k===0?[[]]:O.slice(st).flatMap((x,i)=>comb(st+i+1,k-1).map(r=>[x].concat(r)));
  comb(0,N).forEach((set,i)=>{const r=(i+l)%N;out.push({id:`le-${N}-${l}-${i}`,n:N,lay:MGP_LAYLE[N][l],objs:set.slice(r).concat(set.slice(0,r))})})}return out}
/* td_cong: slot (the three pieces of a game, band count by slot as today) × petal count × palette (ten dark/light pairs) */
const MGP_PAL=[[[150,28,58],[255,214,224]],[[128,18,40],[255,206,206]],[[150,78,8],[255,234,170]],[[18,92,110],[200,238,240]],[[84,40,120],[226,210,246]],[[38,102,58],[212,238,208]],[[30,50,110],[208,218,246]],[[170,70,20],[255,222,190]],[[150,28,36],[255,208,196]],[[120,96,12],[250,238,176]]];
function mgpGenTdCong(){const out=[];for(let sl=0;sl<3;sl++)for(const pet of [5,6,7,8,9,10])MGP_PAL.forEach((p,i)=>out.push({id:`tdc-${sl}-${pet}-${i}`,slot:sl,pet,dk:p[0],lt:p[1]}));return out}
const MGP_GEN={hat:mgpGenHat,hoa:mgpGenHoa,banh:mgpGenBanh,huong:mgpGenHuong,ve:mgpGenVe,kim:mgpGenKim,tho:mgpGenTho,le:mgpGenLe,td_cong:mgpGenTdCong};
function mgpItems(kind){if(MGP_C[kind])return MGP_C[kind];const L=MGP_GEN[kind]?MGP_GEN[kind]():[];if(L.length)MGP_C[kind]=L;return L}
function mgpOne(kind,used,filt){let L=mgpItems(kind);if(!L.length)return null;if(filt){const f=L.filter(filt);if(f.length)L=f}
 if(used&&used.length){const f=L.filter(x=>used.indexOf(x.id)<0);if(f.length)L=f}
 const F0=typeof nrFresh==="function"?nrFresh("mg:"+kind,L,x=>x.id):L,F1=typeof nrNow==="function"?F0.filter(x=>!nrNow("mg:"+kind,x.id)):F0,F=F1.length?F1:F0;/* fresh-first (reports/thin.md «## API» advice): items no past life saw and not yet shown this life; the weights of nrDraw take over when none is left */
 const it=(typeof nrDraw==="function"?nrDraw("mg:"+kind,F,x=>x.id):null)||F[Math.floor(Math.random()*F.length)];if(used&&it)used.push(it.id);return it}
/* skins (mgskin:<kind>:<skin>): the painted skins per kind arrive from Foreman C («FOR MAIN 113 MGSKIN <kind> keys») as plain ids in MGP_SKIN; no skin = "" = today's art */
const MGP_SKIN={};
/* ORDER THIN P1b (skin lane, kit part MG-SKIN review/kit-mgskin): the choice = today's art ("default") + every skin registered for the kind (kitMgSkinAdd) + ids listed in MGP_SKIN; fresh-first through the memory; "" = today's art */
function mgpSkin(kind){const reg=typeof kitMgSkinList==="function"?kitMgSkinList(kind).map(s=>s.id).filter(Boolean):[],L=(MGP_SKIN[kind]||[]).concat(reg.filter(x=>(MGP_SKIN[kind]||[]).indexOf(x)<0));if(!L.length)return"";
 try{const A=["default"].concat(L),F0=typeof nrFresh==="function"?nrFresh("mgskin:"+kind,A):A,F1=typeof nrNow==="function"?F0.filter(x=>!nrNow("mgskin:"+kind,x)):F0,F=F1.length?F1:F0,/* same two-step fresh-first as mgpOne: not seen by a past life, and not yet shown this life; the weights of nrDraw take over when none is left */
  p=typeof nrDraw==="function"?nrDraw("mgskin:"+kind,F):F[0];return p&&p!=="default"?p:""}catch(e){return""}}
Object.assign(window,{mgpItems,mgpOne,mgpRng,mgpSkin,MGP_SKIN});
