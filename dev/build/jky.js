/* ================= jky: KỲ NGỘ THƯỜNG NGÀY — rare fortune encounters on ordinary days (owner OD 19/11 ~03:30Z, ~03:25Z; design dev/design/KYNGO.md) =================
   ★ 18 LAWS (dev/rules/START_CORE.md). Numbers: BAL.kyngo (jbalky.js) only. Wraps only (goTo, act, nextBuoi, pastHTML, lifeSave); loaded last.
   ONE GATE: a person (her or any consort) is at a place this buổi (a Dư đồ walk, or a Hành sự act done at that place — MAIN 19/11 09:00Z Q1) and
     one encounter has a REAL person there now (the j95 location record S.roster / its views S.where, S.menW) and a REAL object or fact (the jil
     ledger, jlost cases, j70 plots, pets): nothing is conjured, a piece only MOVES (law 6). Stats / rank pick WHICH encounter, never WHETHER.
   ROLL (hidden, like j97): min(pMax, p0 + step·miss) (+ festival / weather bonus); miss ≥ pity → sure; a hit resets miss, cooldown cd[band] tuần.
     One roll per person per buổi; once per life per encounter.
   TWO-WAY (law 1): consorts roll on their own planned place (host only), with the same table, values (mindPick), pity and ledger; she can be the
     WHO of theirs (an NPC finds HER lost piece / returns HER pet). News: newsAdd; anything touching her: a §42.2 kitNotice.
   UI: PEND event (pid "kyngo") → kitEventDp (§50) in 28.6 cost mode, odds words only (law 7); plain encounters = read card (✕).
   Sổ luân hồi: localStorage "ctm-kyngo" (memory only), one block under j97's; life line "Kỳ ngộ: …".
   Co-op: NPC rolls host only; a guest's encounters that would move a world piece are skipped (item-ledger-solo, owner 17/11 02:05Z). Old saves: lazy.
   ===================================================================================================================================== */
(function(){
const KB=()=>BAL.kyngo;
const KY={stat:{elig:0,roll:0,hit:0,npcHit:{},npcB:{},buo:{},lastB:-1,ids:{}},errs:[]};window.KY=KY;
function kerr(w,e){try{KY.errs.push(w+": "+(e&&e.message||e));if(KY.errs.length>30)KY.errs.shift();console.error("jky",w,e)}catch(x){}}
const coop=()=>{try{return !!(window.COOPW&&COOPW.on)}catch(e){return false}};
const guest=()=>{try{return coop()&&COOPW.seat!=="a"}catch(e){return false}};
const bk=()=>wk()*B4N+(S.buoi||0);
const kz=p=>{let z=p.ky;if(!z||typeof z!=="object")z=p.ky={m:0,cd:-1,seen:{},got:[],last:-1};z.seen=z.seen||{};z.got=z.got||[];return z};
function band(p){try{if(p===S&&typeof isSrv==="function"&&isSrv())return 0}catch(e){}const r=p.queen?7:(p.rank|0),T=KB().bandR;return r>=T[1]?3:r>=T[0]?2:1}
const nm=p=>p===S?"ngươi":(p&&p.name)||"vị ấy";
/* ---------- WHO is really here: the ONE location record (j95), else its views ---------- */
function placeOfId(id,home){try{const R=S.roster;if(R&&R.P&&R.P[id]&&typeof j95kh==="function"){const e=R.P[id][j95kh()];if(e)return e[0]}}catch(e){}return home||null}
function kyPpl(k){const L=[];const W=S.where||{};
 for(const v of liveRivals(true))if(!v.confined&&placeOfId("v"+v.id,W[v.id])===k)L.push({kind:"rv",ref:v});
 if(S.emp&&placeOfId("emp",W.emp)===k)L.push({kind:"emp"});
 if(!S.thDead&&placeOfId("th","tn")===k)L.push({kind:"th"});
 for(const m of S.men||[])if(m&&m.alive!==false&&placeOfId(m.id,(S.menW||{})[m.id])===k)L.push({kind:"man",ref:m});
 const C=S.court||{},post={tq:["thu","dtd"],ksp:["ksp"],ped:["nvp","ksp"],ty:["tyv"]};
 for(const c in post)if(C[c]&&C[c].name&&post[c].includes(k))L.push({kind:"court",c,ref:C[c]});
 try{if(k==="lc"&&typeof lyAlive==="function"&&lyAlive())L.push({kind:"ly",ref:lyAlive()})}catch(e){}
 try{for(const id of ["gt","tn"]){const st=typeof elderBy==="function"?elderBy(id):null;if(st&&st.alive!==false&&(id==="gt"?["nvp","tn"]:["tn"]).includes(k))L.push({kind:"el",eid:id,ref:st})}}catch(e){}
 /* servants and children go where their mistress is (the record seats them in her household) */
 for(const x of L.slice())if(x.kind==="rv"){const v=x.ref;for(const s of v.staff||[])if(s&&s.alive!==false)L.push({kind:"sv",ref:s,own:v});for(const kd of v.kids||[])if(kd&&kd.alive&&(kd.age|0)<=KB().kidAge)L.push({kind:"kid",ref:kd,own:v})}
 return L}
/* she is a WHO for the NPCs where she walked this buổi */
function meHere(k){const a=S.kyAt;return !!(a&&a.b===bk()&&a.k&&a.k[k])}
function face(w){try{if(!w)return null;if(w.kind==="rv")return w.ref===S?pMe():pv(w.ref);if(w.kind==="emp")return pEmp();if(w.kind==="th")return pTH();if(w.kind==="man")return pMan(w.ref);
 if(w.kind==="court")return w.c==="ty"?pDoc():pEunCourt(w.c);if(w.kind==="el"||w.kind==="sv")return pServ(w.ref);if(w.kind==="kid")return kidFace(w.ref);if(w.kind==="maid")return pMaid();if(w.kind==="own"&&!w.hide&&w.ref)return w.ref===S?pMe():pv(w.ref)}catch(e){kerr("face",e)}return null}
function wName(w){if(!w)return"";if(w.kind==="emp")return"Hoàng thượng";if(w.kind==="th")return"Thái hậu";return (w.ref&&w.ref.name)||""}
/* ---------- REAL objects / facts ---------- */
const loCases=()=>{try{return typeof loL==="function"?loL():[]}catch(e){return[]}};
function lostHere(F,own){return loCases().find(c=>c&&c.st==="lost"&&c.e&&(own?c.own===key(F):c.own!==key(F))&&loP(c.own)&&loAlive(loP(c.own)))||null}
function deadPiece(){try{const I=ilS();return I.box.find(x=>x&&x.at==="nvp"&&x.why==="dead"&&x.e&&IT[x.e.k]&&!(itm(x.e.k).nt))||null}catch(e){return null}}
function plots(){try{return (typeof j70==="function"&&j70()&&j70().pl)||[]}catch(e){return[]}}
function plotBy(F){for(const p of plots())if(p&&p.st==="prep"&&p.a!==key(F)){const a=p.a==="me"?S:RV(p.a);if(a&&(a===S||a.alive))return {p,a}}return null}
function plotOn(F){for(const p of plots())if(p&&p.st==="prep"&&p.t===key(F)&&!(F===S&&p.kn)){const a=p.a==="me"?S:RV(p.a);if(a&&a!==F&&(a===S||a.alive))return {p,a}}return null}
function rareNvp(){try{const r=typeof adRare==="function"?adRare():null;return r&&r.k&&!r.sold&&IT[r.k]?r:null}catch(e){return null}}
const fest=()=>{try{return festToday()}catch(e){return null}};
const sev=()=>{try{return wxSev()}catch(e){return 0}};
const winter=()=>{try{return SEASON[S.month-1]==="Đông"}catch(e){return false}};
const night=()=>(S.buoi||0)===B4L;
const first=(L,f)=>L.find(f)||null;
/* ---------- the encounters: where, who (from the people here), what, the words (Vietnamese = player text, VANPHONG cổ trang) ---------- */
const OUT=["vuon","lc","nvp","tn","kn"];
const DEF={
 ma_phe:{pl:["lc"],who:(F,L)=>first(L,w=>w.kind==="ly"),
  t:c=>`<p>Gió lùa qua bức tường đổ của Trường Môn viện, mang theo một mùi hương lạ. ${c.wn} ngồi bên khung cửa mục, tay vẫn đang trộn mấy vị hương liệu cũ. Thấy ngươi, bà khẽ cười: “Năm xưa cả Lục cung đều xin bổn cung một túi hương. Ngươi có muốn học không?”</p>`,
  n:["Ngồi lại học nghề điều hương","Ngồi lại nghe chuyện cũ"]},
 ma_giao:{pl:["nvp","tn"],when:()=>(S.buoi||0)<=1,who:(F,L)=>first(L,w=>w.kind==="el"&&w.eid==="gt"),
  t:c=>`<p>Trên bàn của ${c.wn} có cuốn sổ tay đã ố vàng, chép tay từng lối thêu, lối vẽ, lối nấu mà bà gom góp mấy chục năm dạy tú nữ. Bà gập sổ lại, nhìn ngươi rất lâu.</p>`,
  n:["Xin ma ma cho chép một lối","Xin ma ma chỉ dạy tận tay"]},
 ma_nhac:{pl:["vuon"],when:()=>(S.buoi||0)>=2,who:(F,L)=>first(L,w=>w.kind==="man"&&w.ref.role==="Nhạc sư"),
  t:c=>`<p>Trăng lên sau hòn non bộ, có tiếng đàn ai gảy rất khẽ. Là ${c.wn}, ngồi một mình bên hồ. Thấy ngươi, y vội đứng dậy hành lễ, rồi nói nhỏ: “Khúc này cả cung chẳng còn ai đàn được nữa.”</p>`,
  n:["Ngồi lại nghe y dạy đàn","Xin bệ hạ cho y vào cung dạy"]},
 ma_hoa:{pl:["vuon","tn"],when:()=>(S.buoi||0)<B4L,who:(F,L)=>first(L,w=>w.kind==="man"&&w.ref.role==="Họa sư"),
  t:c=>`<p>${c.wn} đang dựng giá vẽ bên hàng liễu, ngẩng lên bắt gặp ngươi rồi dừng bút. Y nói người trong cung vẽ đã nhiều, nhưng hiếm ai đứng yên được như ngươi lúc này.</p>`,
  n:["Nhờ y nói tốt trước bệ hạ","Xin y chỉ cách đặt bút"]},
 ma_ty:{pl:["tyv"],who:(F,L)=>first(L,w=>w.kind==="court"&&w.c==="ty"),
  t:c=>`<p>Đêm khuya Thái y viện chỉ còn một ngọn đèn. ${c.wn} vẫn ngồi đọc mấy cuốn y thư cũ, thấy ngươi bèn mời ngồi và bắt mạch: “Bệnh cũ trong người, lão phu có một phương thuốc gia truyền.”</p>`,
  n:["Xin thái y chữa dứt","Xin học phương thuốc"]},
 ma_co:{pl:["thu","dtd"],who:(F,L)=>L.some(w=>w.kind==="emp")?null:first(L,w=>w.kind==="court"&&w.c==="tq"),
  t:c=>`<p>Hoàng thượng chưa về, ${c.wn} ngồi một mình trước bàn cờ dở ván. Ông chỉ quân trắng: “Ván này đánh từ đời tiên đế, chưa ai giải được. Nương nương có muốn thử?”</p>`,
  n:["Đánh hết ván cờ","Nhường ông một nước"]},
 ma_lao:{pl:["tn"],who:(F,L)=>{const O=L.filter(w=>w.kind==="rv"&&w.ref!==F&&(w.ref.age|0)>=BAL.ageBand[2]);O.sort((a,b)=>(b.ref.age|0)-(a.ref.age|0));return O[0]||null},
  t:c=>`<p>Bên hiên Phật đường, ${c.wn}, người đã hầu từ tiên triều, đang bày một ván cờ. Bà vẫy ngươi lại: “Ngồi đây. Bổn cung kể ngươi nghe cung này ngày trước.”</p>`,
  n:["Xin bà chỉ giáo nước cờ","Hầu bà nói chuyện cũ"]},
 vat_lac:{pl:["*"],who:(F,L,X)=>X.lc?{kind:"own",ref:loP(X.lc.own)}:null,what:F=>{const c=lostHere(F,false);return c?{lc:c}:null},
  t:c=>`<p>Bên lối đi có vật gì lấp lánh trong cỏ. Ngươi cúi nhặt lên: là <b>${loNm(c.X.lc.k)}</b>, chính là món ${c.wn} báo mất hôm trước.</p>${loTag(c.X.lc.e)}`,
  n:["Mang trả tận tay","Giữ lại"]},
 vat_minh:{pl:["*","home"],who:(F,L)=>({kind:"maid"}),what:F=>{const c=lostHere(F,true);return c?{lc:c}:null},
  t:c=>`<p>Cung nữ chạy lại, hai tay dâng lên một món đồ: <b>${loNm(c.X.lc.k)}</b> của ngươi, tìm thấy dưới gốc cây bên lối. Gần đó còn vương một dấu vết của kẻ đã lấy.</p>${loTag(c.X.lc.e)}`},
 vat_cu:{pl:["nvp"],who:(F,L)=>first(L,w=>w.kind==="court"&&w.c==="ped"),what:()=>{const x=deadPiece();return x?{box:x}:null},
  t:c=>`<p>${c.wn} lén đưa ngươi vào kho sau Nội vụ phủ. Trong hộp gỗ là <b>${itm(c.X.box.e.k).n}</b>, di vật của người đã khuất, chờ ngày đem bán ra ngoài.</p>`,
  n:["Xin chuộc lại","Xin dâng Thái hậu thay người đã khuất"]},
 vat_thu:{pl:["*"],who:(F,L)=>{const o=first(L,w=>w.kind==="rv"&&w.ref!==F&&(w.ref.pets||[]).length);if(o)return o;return null},
  t:c=>`<p>Một con vật nhỏ lạc chủ, chạy lẫn vào bụi hoa. Ngươi ôm nó về tận tay ${c.wn}, nàng ta mừng rỡ cảm tạ mãi.</p>`},
 vat_chung:{pl:["*"],when:()=>(S.buoi||0)>=2,who:(F,L,X)=>X.pl?{kind:"rv",ref:X.pl.a}:null,what:F=>{const q=plotBy(F);return q?{pl:q}:null},
  t:c=>`<p>Trong chậu lan bên tường có một mảnh thư gấp nhỏ. Nét chữ của ${c.wn}, viết về một việc nàng ta đang sắp đặt.</p>`,
  n:["Giữ làm chứng cứ","Lặng lẽ trả lại nàng ta"]},
 vat_ngu:{pl:["nvp"],when:()=>(S.buoi||0)===0,who:(F,L)=>first(L,w=>w.kind==="court"&&w.c==="ped"),what:()=>{const r=rareNvp();return r?{rr:r}:null},
  t:c=>`<p>${c.wn} khom lưng: “Món quý tuần này còn chưa bày ra, nô tài để dành cho nương nương xem trước.” Đó là <b>${itm(c.X.rr.k).n}</b>.</p>`,
  n:["Nhận về dùng","Tiến lên Thái hậu"]},
 de_mua:{pl:["vuon"],when:()=>sev()>=1,who:(F,L)=>first(L,w=>w.kind==="emp"),
  t:c=>`<p>Mưa đổ xuống bất chợt. Dưới mái đình chỉ có ngươi và Hoàng thượng. Ngài cởi áo choàng khoác lên vai ngươi.</p>`,
  n:["Theo ngài về điện tránh mưa","Xin ngài giữ long thể"]},
 de_but:{pl:["thu","dtd","vuon"],when:()=>(S.buoi||0)>=1,who:(F,L)=>first(L,w=>w.kind==="emp"),
  t:c=>`<p>Hoàng thượng phê xong tấu chương, còn hứng, bèn trải giấy viết chữ. Ngài gọi ngươi lại gần.</p>`,
  n:["Xin ngài chỉ cho một nét chữ","Mài mực hầu bút"]},
 de_den:{pl:["vuon","dtd","tn","kn"],when:()=>{const f=fest();return !!(f&&["nguyentieu","trungthu","thattich"].includes(f.k)&&night())},who:(F,L)=>first(L,w=>w.kind==="emp"),
  t:c=>`<p>Đèn hoa đăng thắp kín mặt hồ. Hoàng thượng quay sang ngươi: “Đêm nay trẫm cho nàng một điều ước.”</p>`,
  n:["Xin ân điển cho gia tộc","Xin ngài ở lại đêm nay"]},
 de_su:{pl:["thu"],who:(F,L)=>first(L,w=>w.kind==="man"&&w.ref.role==="Sứ thần"),
  t:c=>`<p>${c.wn} đi ngang qua, dừng lại hỏi ngươi một câu về lễ nghi Đại Hy, như muốn thử người trong cung.</p>`,
  n:["Đáp khiêm cung","Đối lại một câu thơ"]},
 th_kinh:{pl:["tn"],when:()=>(S.buoi||0)<B4L,who:(F,L)=>first(L,w=>w.kind==="th"),
  t:c=>`<p>Sớm tinh mơ, Phật đường chỉ có Thái hậu quỳ tụng kinh. Ma ma hầu kinh hôm nay ốm, người tự lật trang, mắt đã mỏi.</p>`,
  n:["Ở lại chép kinh cùng người","Xin người dạy lễ nghi"]},
 th_tham:{pl:["home"],when:()=>{const f=fest();return !!(f&&f.k==="trungthu")},who:(F,L,X)=>X.pl?{kind:"own",ref:X.pl.a,hide:1}:null,what:F=>{const q=plotOn(F);return q?{pl:q}:null},
  t:c=>`<p>Cung nữ dâng lên một chiếc bánh trung thu, bẻ ra thấy mẩu giấy nhỏ: có người báo cho ngươi biết một mưu đang nhắm vào ngươi.</p>`},
 th_chi:{pl:["tn","nvp","home"],when:()=>{const f=fest();return !!(f&&f.k==="doanngo")},who:(F,L)=>first(L,w=>(w.kind==="el"||w.kind==="sv")&&(w.ref.age|0)>=BAL.ageBand[2]&&w.ref.role!=="eunuch"),
  t:c=>`<p>Tết Đoan ngọ, ${c.wn} giữ ngươi lại, dặn từng vị lá ngải, rễ xương bồ phòng dịch mùa hạ, như dặn con cháu trong nhà.</p>`},
 th_sao:{pl:["vuon"],when:()=>{const f=fest();return !!(f&&f.k==="thattich"&&night())},who:(F,L)=>first(L,w=>w.kind==="rv"&&w.ref!==F&&band(w.ref)===band(F)),
  t:c=>`<p>Đêm Thất tịch, ${c.wn} cũng một mình ngắm sao bên hồ. Hai người cùng ngẩng nhìn Ngân Hà.</p>`,
  n:["Kết làm tri kỷ","Cùng đối thơ dưới sao"]},
 sv_den:{pl:["*"],who:(F,L)=>first(L,w=>w.kind==="sv"&&w.own!==F&&w.ref.role!=="eunuch"&&w.ref.spyFor!==key(F)),
  t:c=>`<p>Một chiếc đèn lồng đứt dây rơi xuống. Ngươi kịp kéo ${c.wn}, cung nữ của ${nm(c.W.own)}, tránh sang một bên. Nàng ta run rẩy quỳ tạ ơn cứu mạng.</p>`,
  n:["Giữ nàng ta làm tai mắt","Đưa nàng ta về tận cung chủ"]},
 sv_tuyet:{pl:["vuon","lc","tn","kn","nvp"],when:()=>night()&&winter(),who:(F,L)=>first(L,w=>w.kind==="sv"&&w.ref.role==="eunuch"),
  t:c=>`<p>Đêm tuyết, ${c.wn} đang gác cổng, nhường ngươi chỗ trú bên lò than của mình, còn đun cho ngươi bát nước gừng.</p>`},
 sv_co:{pl:["tn","nvp"],when:()=>(S.buoi||0)===0,who:(F,L)=>first(L,w=>w.kind==="el"&&w.eid==="tn"),
  t:c=>`<p>${c.wn} đứng nhìn ngươi làm việc hồi lâu, rồi gọi ngươi lại: “Tay chân nhanh nhẹn, biết giữ quy củ. Ngươi muốn gì?”</p>`,
  n:["Xin cô cô dạy quy củ","Xin về hầu Đức Thọ cung"]},
 sv_tre:{pl:["*"],who:(F,L)=>first(L,w=>w.kind==="kid"&&w.own!==F),
  t:c=>`<p>${c.wn} mải đuổi bướm lạc khỏi nhũ mẫu, khóc thút thít sau hòn non bộ. Ngươi dỗ dành rồi dắt về tận tay ${nm(c.W.own)}.</p>`}
};
const COOPSKIP={vat_lac:1,vat_cu:1,vat_ngu:1,vat_chung:1,sv_den:1};
/* ---------- eligibility (the ONE gate) ---------- */
function elig(F,k){const B=KB();if(!B||!B.on)return[];const z=kz(F),b=band(F),out=[];let L;try{L=kyPpl(k).filter(w=>w.ref!==F)}catch(e){kerr("ppl",e);return out}
 if(F!==S&&meHere(k)){L.push({kind:"rv",ref:S});/* her household walks with her, like an NPC's (kyPpl) */for(const s of S.staff||[])if(s&&s.alive!==false)L.push({kind:"sv",ref:s,own:S});for(const kd of S.kids||[])if(kd&&kd.alive&&(kd.age|0)<=KB().kidAge)L.push({kind:"kid",ref:kd,own:S})}
 for(const id in DEF){const D=DEF[id],E=B.E[id];if(!E||z.seen[id]!=null||!String(E.b).includes(String(b)))continue;if(F===S&&guest()&&COOPSKIP[id])continue;
  if(F!==S&&(id==="sv_co"||id==="ma_giao"&&b===0))continue;
  if(!(D.pl.includes(k)||(k!=="home"&&D.pl.includes("*"))))continue;try{if(D.when&&!D.when(F))continue;const X=D.what?D.what(F):{};if(!X)continue;const W=D.who(F,L,X);if(!W||(W.ref&&W.ref===F))continue;
   const c={id,D,E,W,X,k,F,b};/* F5: never a card whose every option asks more Bạc than she holds (both buttons disabled, no ✕); same for NPCs */if(E.o&&!E.o.some((O,i)=>optBac(c,i)<=(F.bac||0)))continue;out.push(c)}catch(e){kerr("elig "+id,e)}}
 return out}
function chance(F,list){const B=KB(),z=kz(F);let p=Math.min(B.pMax,B.p0+B.step*z.m);const f=fest();if(f)p+=B.festP;if(sev()>=1)p+=B.wxP;return z.m>=B.pity?100:p}
function pickE(list){const B=KB();const f=fest();const O=list.map(x=>[x,Math.max(.01,(x.E.w||1)*((B.pw||{})[x.k]||1)*(x.D.when&&f?B.fest:1)*(x.id==="de_mua"||x.id==="sv_tuyet"?B.wx:1))]);
 let s=0;for(const o of O)s+=o[1];let r=Math.random()*s;for(const o of O){r-=o[1];if(r<=0)return o[0]}return O[O.length-1][0]}
/* her place this buổi, then the roll */
function kyArrive(F,k,src){try{if(!S||S.dead||!k||!KB()||!KB().on)return;if(F===S){const b=bk();if(!S.kyAt||S.kyAt.b!==b)S.kyAt={b,k:{}};S.kyAt.k[k]=1;if(S.out)return}
 const z=kz(F),b=bk();if(z.last===b)return;if(wk()<z.cd)return;const list=elig(F,k);if(!list.length)return;z.last=b;
 if(F===S){KY.stat.elig++;KY.stat.lastB=b}const p=chance(F,list);if(F===S)KY.stat.roll++;
 if(p<100&&!(Math.random()*100<p)){z.m++;return}
 z.m=0;z.cd=wk()+KB().cd[band(F)];const c=pickE(list);z.seen[c.id]=wk();z.got.push(c.id);
 if(F===S){KY.stat.hit++;KY.stat.ids[c.id]=(KY.stat.ids[c.id]||0)+1;fireMe(c)}else{KY.stat.npcHit[band(F)]=(KY.stat.npcHit[band(F)]||0)+1;fireNpc(c)}}catch(e){kerr("arrive",e)}}
KY.arrive=kyArrive;KY.band=band;KY.elig=elig;KY.DEF=DEF;
/* ---------- numbers of an option (BAL × V[band]) ---------- */
function sc(o,b){const V=KB().V[b]||1,r={};for(const k in o||{})r[k]=Math.round(o[k]*V);return r}
function seenOd(c){const B=KB();let o=B.seenOd-(B.hard[c.b]||0);if(c.E.o&&c.oi!=null&&c.E.o[c.oi].seenW==="thi")o+=Math.round(((c.F.arts||{}).thi||0)*B.thiOd);return oddsCl(o)}
function gm(c){try{return c.X.lc?(KB().gm[loGrade(c.X.lc.e)]||1):1}catch(e){return 1}}
function buyPr(c){try{if(c.X.box)return Math.round(ilVal(c.X.box.e)*KB().cuPr/100);if(c.X.rr)return Math.round((itm(c.X.rr.k).pr||0)*KB().nguPr/100)}catch(e){}return 0}
KY.buyPr=buyPr;
/* the Bạc an option asks (its cost × V + a buy price): the card disables it when she holds less (j3) */
function optBac(c,i){const O=c.E.o[i];let n=sc(O.c||{},c.b).bac||0;if(O.buy||O.s==="item"&&(c.X.box||c.X.rr)){const pr=buyPr(c);if(pr&&!(c.X.box&&i===1))n+=pr}return n}
KY.optBac=optBac;
const ART_N=k=>{try{const a=ARTS.find(x=>x.k===k);return a?a.n:k}catch(e){return k}};
/* the third person who grudges her for it: a consort present, else the WHO's own mistress */
function third(c){try{const L=kyPpl(c.k).filter(w=>w.kind==="rv"&&w.ref!==c.F&&w.ref!==(c.W&&c.W.ref));if(L.length)return L[0].ref;if(c.W&&c.W.own&&c.W.own!==c.F)return c.W.own;const q=liveRivals(true).filter(v=>v!==c.F).sort((a,b)=>oan(b,c.F)-oan(a,c.F));return q[0]||null}catch(e){return null}}
function relTo(F,W,n){if(!W||!n)return;const r=W.ref;try{if(W.kind==="th"){ap(F,{th:n});return}if(W.kind==="emp"){ap(F,{sung:Math.round(n/KB().relSung)});return}
 if(r&&(r===S||rivals.includes(r))){relAdd(F,r,n);return}
 if(r&&typeof r.af==="number"){if(F===S)r.af=cl(r.af+n,-100,100);return}
 if(r){r.af=r.af&&typeof r.af==="object"?r.af:{};const kk=F===S?"me":(F.id!=null?F.id:"x");r.af[kk]=cl((r.af[kk]||0)+n,-100,100);if(F===S&&W.kind==="sv")r.loyal=cl((r.loyal==null?KB().relLoyal:r.loyal)+Math.round(n/KB().relLoyK),0,100)}}catch(e){kerr("rel",e)}}
/* F4: gains in kit class g, costs in class r (the kit uses the class when the words are neutral, j63 kaSent); the option line names no piece
   («món đồ / di vật / món quý», the piece is named in the card text + kitItemTag): kaSent reads MEANING first, so a name holding «giáng» flipped a gain to TỐN (KIT REQUEST) */
const gW=t=>`<span class="g">${t}</span>`,rW=t=>`<span class="r">${t}</span>`;
function costText(C){const L=[];if(C.kh)L.push(`${C.kh} khắc`);if(C.suc)L.push(rW(`Sức -${C.suc}`));if(C.bac)L.push(rW(`Bạc -${C.bac}`));if(C.danh)L.push(rW(`Danh -${C.danh}`));return L.join(", ")}
/* run one option for finder F (her or an NPC): costs, gains, the special, the risk roll; returns the result words */
function runOpt(c,i){const F=c.F,E=c.E,O=E.o?E.o[i]:E.plain,G=sc(O.g,c.b),C=sc(O.c||{},c.b),g=gm(c),out=[];c.oi=i;
 if(C.kh&&F===S)spend(C.kh);
 if(F!==S){const x={};if(C.suc)x.suc=-C.suc;if(C.bac)x.bac=-C.bac;ap(F,x)}
 if(C.danh)ap(F,{danh:-C.danh});
 if(C.oan){const t=third(c);if(t){oanAdd(t,F,C.oan);out.push(`${nm(t)} để bụng oán ${nm(F)}`)}}
 if(C.relM&&F===S){try{S.tin=cl((S.tin||0)-C.relM,0,100);out.push(`chủ nhân tin ngươi -${C.relM}`)}catch(e){}}
 if(C.seen){if(!roll(seenOd(c))){ap(F,{danh:-KB().seenDanh});out.push(`có người trông thấy, Danh -${KB().seenDanh}`)}}
 const st={};for(const k of ["danh","sung","duc","tamco","th"])if(G[k])st[k]=Math.round(G[k]*(k==="danh"?g:1));if(G.sucR)st.suc=Math.round(KB().sucRest*G.sucR/(KB().V[c.b]||1));
 if(Object.keys(st).length)ap(F,st);
 {const NM={danh:"Danh",sung:"Sủng",duc:"Đức",tamco:"Tâm cơ",th:"Thái hậu thiện cảm",suc:"Sức"};for(const k in st)out.push(`${NM[k]} +${st[k]}`);if(C.suc)out.push(`Sức -${C.suc}`);if(C.bac)out.push(`Bạc -${C.bac}`)}
 if(G.rel&&c.W&&c.W.kind!=="th"&&c.W.kind!=="emp")out.push(`${wName(c.W)||"người ấy"} thiện cảm +${Math.round(G.rel*g)}`);
 if(G.rel)relTo(F,c.W,Math.round(G.rel*g));
 const ak=O.a||null;if(G.art&&ak){try{addArtP(F,ak,G.art);out.push(`${ART_N(ak)} tiến bộ ${G.art} phần`)}catch(e){kerr("art",e)}}
 if(O.s)try{const r=SPEC[O.s](c,O);if(r)out.push(r)}catch(e){kerr("spec "+O.s,e)}
 else if(O.buy)try{const r=SPEC.item(c,O);if(r)out.push(r)}catch(e){kerr("buy",e)}
 return out.join("; ")}
/* r4b (E30c, law 6c — the reviewer's P1): a lost case found here (lostHere: st "lost", the piece only in the case) goes home through jlost's ONE
   return with the case's mark (lo). Before, the case's bare object (no lo) was passed: lostReturn took its «case gone» branch, wrote a «dead» copy to
   the ledger box (owner unknown → her), the owner never got it and the case stayed open — the next Kỳ ngộ wrote another (coop-dresscode-scan: 2–3 copies). */
function kyLc(L){/* the dialog was built earlier: a case closed (or held by someone) meanwhile moves nothing */const c=L&&typeof loGet==="function"?loGet(L.id):L;return c&&c.st==="lost"&&c.e?Object.assign({},c.e,{lo:c.id}):null}
/* ---------- specials: every piece only moves (jil / jlost), every fact is a real one ---------- */
const SPEC=KY.SPEC={
 ret:(c,O)=>SPEC.item(c,O),
 give:(c,O)=>SPEC.item(c,O),
 item:(c,O)=>{const F=c.F;
  if(c.X.lc){const L=c.X.lc,o=loP(L.own);if(c.oi===0){const x=kyLc(L);if(!x)return"";lostReturn(x,"kyngo");return `${loNm(L.k)} về lại tay ${nm(o)}`}
   const x=Object.assign({},L.e,{lo:L.id,gh:L.own,by:key(F)});delete x.from;delete x.giver;F.inv=F.inv||[];F.inv.push(x);L.keep=1;L.by=key(F);L.st="held";L.at=key(F);
   try{ilLog(L.e,"lo"+L.id,key(F),"kyngo: giữ lại")}catch(e){}return `${loNm(L.k)} nằm trong rương ${nm(F)}`}
  if(c.X.box){const x=c.X.box;if(c.oi===1){ilTake(x,F,"kyngo");const i=F.inv.indexOf(x.e);if(i>=0)F.inv.splice(i,1);ilGone(F,x.e,"th");return `${itm(x.e.k).n} dâng lên Đức Thọ cung`}
   const pr=buyPr(c);if(F!==S){if((F.bac||0)<pr)return"";ap(F,{bac:-pr})}ilTake(x,F,"kyngo: chuộc di vật");return `${itm(x.e.k).n} vào rương`}
  if(c.X.rr){const r=c.X.rr,pr=buyPr(c);if(F!==S){if((F.bac||0)<pr)return"";ap(F,{bac:-pr})}r.sold=1;const e={k:r.k,from:"nvp",own:key(F),d:S.turn};F.inv=F.inv||[];F.inv.push(e);
   try{ilUid(e);ilLog(e,"nvp",key(F),"kyngo: Nội vụ phủ")}catch(x){}
   if(c.oi===1){F.inv.splice(F.inv.indexOf(e),1);ilGone(F,e,"th");return `${itm(r.k).n} dâng lên Đức Thọ cung`}return `${itm(r.k).n} vào rương`}
  return""},
 loi:c=>{const F=c.F;if(F!==S||typeof rcpKnown!=="function"){addArtP(F,KB().loiK,KB().loiArt);return `${ART_N(KB().loiK)} tiến bộ ${KB().loiArt} phần`}const K=rcpKnown();
  for(const kind in RCP_ST){const L=RCP_ST[kind].find(s=>!(K[kind]||[]).includes(s[0]));if(L){(K[kind]=K[kind]||[]).push(L[0]);try{if(typeof kitLearn==="function")kitLearn({t:`Học được lối «${L[1]}»`})}catch(e){}return `học được lối «${L[1]}»`}}
  addArtP(F,KB().loiK,KB().loiArt);return `${ART_N(KB().loiK)} tiến bộ ${KB().loiArt} phần`},
 kn:c=>{const F=c.F;if(c.X.pl){const P=c.X.pl;if(F===S)P.p.kn=1;try{evA(F,P.a,KB().evStep)}catch(e){}return F===S?`ngươi biết ${nm(P.a)} đang bày mưu nhắm vào ngươi`:""}
  return""},
 intel:c=>{const F=c.F;const L=liveRivals(true).filter(v=>v!==F&&(c.W&&c.W.ref)!==v);const v=L.sort((a,b)=>oan(b,F)-oan(a,F))[0];if(!v)return"";
  if(F===S){const f=intelLearn(v,KB().intelN,{by:wName(c.W),how:"Kỳ ngộ"});return `biết thêm chuyện của ${v.name}${f?": "+String(f).replace(/<[^>]+>/g,""):""}`}evA(F,v,KB().evStep);return""},
 ev:c=>{const F=c.F;if(c.X.pl){const n=evA(F,c.X.pl.a,KB().evStep);return `chứng cứ về ${nm(c.X.pl.a)} +${n||KB().evStep}`}
  if(c.X.lc){const L=c.X.lc;const x=kyLc(L);if(x)lostReturn(x,"kyngo");L.cev=(L.cev||0)+KB().evStep;return x?`${loNm(L.k)} về lại rương, thêm một manh mối`:"thêm một manh mối"}return""},
 spy:c=>{const s=c.W.ref;s.spyFor=key(c.F);return `${s.name} thành tai mắt của ${nm(c.F)} trong cung ${nm(c.W.own)}`},
 cure:c=>{const F=c.F;const i=typeof illOf==="function"?illOf(F):null;if(i){F.ill=null;return "bệnh cũ dứt hẳn"}ap(F,{suc:Math.round(KB().sucRest)});return `bồi bổ, Sức +${Math.round(KB().sucRest)}`},
 rk:c=>{try{if(S.srv&&!S.srv.risen){const old=S.srv.rk||0;S.srv.rk=Math.max(old,Math.min(BAL.srvRk.nq,old+KB().rkStep));if(S.srv.rk>old)return `được thăng ${SRK.maid[S.srv.rk]}`}}catch(e){}return""}
};
/* ---------- her card ---------- */
function optX(c,i){const O=c.E.o[i],C=sc(O.c||{},c.b),L=[];if(O.buy||O.s==="item"&&(c.X.box||c.X.rr)){const pr=buyPr(c);if(pr&&!(c.X.box&&i===1))C.bac=(C.bac||0)+pr}if(O.od&&C.seen)L.push(word(seenOd(Object.assign({},c,{oi:i}))));const t=costText(C);if(t)L.push("tốn: "+t);
 const G=sc(O.g,c.b),W=[];if(G.danh)W.push(`Danh +${G.danh}`);if(G.sung)W.push(sgStat(G.sung));if(G.th)W.push(`Thái hậu thiện cảm +${G.th}`);if(G.duc)W.push(`Đức +${G.duc}`);if(G.tamco)W.push(`Tâm cơ +${G.tamco}`);if(G.rel)W.push(`thiện cảm +${G.rel}`);if(G.art&&O.a)W.push(`${ART_N(O.a)} tiến bộ ${G.art} phần`);
 const sw=specW(c,O,i);if(sw)W.push(sw);for(let j=0;j<W.length;j++)W[j]=gW(W[j]);
 if(W.length)L.push("thành: "+W.join(", "));return L.join(" · ")}
/* the gain words of a special (an option whose gain is a piece / a fact, never "không") */
function specW(c,O,i){const s=O.s||(O.buy?"item":"");if(!s)return"";try{
 if(s==="item"||s==="ret"||s==="give"){if(c.X.lc)return i===0?"món đồ về lại tay chủ":"món đồ vào rương ngươi";
  if(c.X.box)return i===1?"di vật dâng lên Đức Thọ cung":"di vật vào rương ngươi";
  if(c.X.rr)return i===1?"món quý dâng lên Đức Thọ cung":"món quý vào rương ngươi"}
 return {loi:"học được một lối mới",kn:"biết trước một mưu nhắm vào ngươi",intel:"biết thêm một chuyện kín",ev:"thêm một chứng cứ",spy:"thêm một tai mắt",cure:"dứt bệnh cũ",rk:"lên một bậc"}[s]||""}catch(e){return""}}
function ctx(c){c.wn=wName(c.W);return c}
function fireMe(c){ctx(c);const D=c.D;KY.cur=c;const title="Kỳ ngộ";
 if(!c.E.o){const r=runOpt(c,0);const h=D.t(c)+`<p class="past">${r}.</p>`;Q.unshift({t:title,h,who:face(c.W),evId:"kyngo:"+c.id,ky:1});log(`Kỳ ngộ: ${String(D.t(c)).replace(/<[^>]+>/g,"").slice(0,80)}… ${r}.`);meet(c);return}
 const opts=c.E.o.map((O,i)=>{const C=sc(O.c||{},c.b);const fx={};if(C.suc)fx.suc=-C.suc;if(C.bac)fx.bac=-C.bac;
  if(O.buy||O.s==="item"&&(c.X.box||c.X.rr)){const pr=buyPr(c);if(pr&&!(c.X.box&&i===1))fx.bac=(fx.bac||0)-pr}
  return{n:D.n[i],fx,x:optX(c,i),ev:1,go:()=>{const r=runOpt(c,i);log(`Kỳ ngộ «${D.n[i]}»: ${r||"xong"}.`);Q.unshift({t:title,h:`<p>${r||"Việc đã xong."}</p>`,who:face(c.W),evId:"kyngo:"+c.id,ky:1});meet(c,D.n[i])}}});
 Q.unshift({t:title,h:D.t(c),opts,who:face(c.W),pid:"kyngo",pp:{id:c.id},evId:"kyngo:"+c.id,ky:1,ev:1})}
/* a save made with a kỳ ngộ card open: the card is not rebuilt (its people may have moved); the encounter stays used */
PEND.kyngo=()=>null;
/* ---------- NPC side: same options, mindPick by value ---------- */
function optVal(E,i,b){const B=KB(),O=E.o?E.o[i]:E.plain;let v=0;const G=O.g||{},C=O.c||{};for(const k in G)v+=G[k]*(k==="sucR"?B.sucRest:1)*(B.vw[k]||0);if(O.s)v+=B.sv[O.s]||0;for(const k in C)v-=C[k]*(B.vw[k]||0);return v*(B.V[b]||1)}
KY.optVal=optVal;
function fireNpc(c){ctx(c);const F=c.F;let i=0;try{if(c.E.o){const P=c.E.o.map((O,j)=>[j,Math.max(1,optVal(c.E,j,c.b))]);const j=mindPick(P,F);i=j==null?0:j}}catch(e){}
 const r=runOpt(c,i);const touchMe=(c.W&&c.W.ref===S)||(c.X.lc&&c.X.lc.own==="me")||(c.W&&c.W.own===S);
 try{const txt=`Nghe nói ${F.name} gặp kỳ ngộ${c.W&&c.W.ref&&!c.W.hide?` với ${wName(c.W)===S.name?"ngươi":wName(c.W)}`:""}${r?": "+r:""}.`;newsAdd(F,"ky",txt,touchMe);if(touchMe&&typeof kitNotice==="function")kitNotice({line:txt})}catch(e){kerr("news",e)}}
/* ---------- Sổ luân hồi (memory only) ---------- */
function book(){try{return JSON.parse(localStorage.getItem("ctm-kyngo")||"{}")||{}}catch(e){return{}}}
function meet(c,opt){try{const b=book();const e=b[c.id]||{n:0};e.n++;if(!e.first)e.first={who:S.name,o:S.origin&&S.origin.n,y:S.year};b[c.id]=e;localStorage.setItem("ctm-kyngo",JSON.stringify(b))}catch(e){}}
const TITLE={ma_phe:"Hương cũ Trường Môn",ma_giao:"Sổ tay giáo tập",ma_nhac:"Khúc đàn đêm vườn ngự",ma_hoa:"Họa sư bên hàng liễu",ma_ty:"Phương thuốc gia truyền",ma_co:"Ván cờ tiên đế",ma_lao:"Hiên Phật đường",vat_lac:"Ngọc rơi trên lối",vat_minh:"Của mình tìm lại",vat_cu:"Di vật người đã khuất",vat_thu:"Con vật lạc chủ",vat_chung:"Lá thư trong chậu lan",vat_ngu:"Món quý để dành",de_mua:"Chung áo dưới mưa",de_but:"Nét ngự bút",de_den:"Điều ước hoa đăng",de_su:"Câu hỏi của sứ thần",th_kinh:"Sớm mai Phật đường",th_tham:"Bánh trung thu có thư",th_chi:"Lời dặn Đoan ngọ",th_sao:"Đêm Thất tịch",sv_den:"Đèn rơi cứu người",sv_tuyet:"Đêm tuyết người gác cổng",sv_co:"Cô cô để mắt",sv_tre:"Hoàng tử lạc đường"};
KY.TITLE=TITLE;
/* E42 (law 6c, jlost one owner change): «Giữ lại» keeps the piece through jlost's ONE keep road (loKeepBy): only while the case still holds it
   (st "lost"); a card answered after the piece moved on (found / returned / held) moves nothing. Before: an own copy pushed with no check (2–7 copies
   with the «dead» box copies; lost-one-home-scan / coop-lost-scan). «Mang trả» / «Của mình tìm lại» go through lostReturn (jlost finds the case). */
{const it0=SPEC.item;SPEC.item=function(c,O){if(c&&c.X&&c.X.lc&&c.oi!==0&&typeof loKeepBy==="function"){const L=c.X.lc,F=c.F;return loKeepBy(L,F,"kyngo: giữ lại")?`${loNm(L.k)} nằm trong rương ${nm(F)}`:""}return it0.apply(this,arguments)}}
function bookHTML(){const b=book();const ids=Object.keys(b).filter(id=>DEF[id]);const y=Object.keys(DEF).length;
 const rows=[["Kỳ ngộ đã gặp",`<b>${ids.length}/${y}</b> kỳ ngộ đã gặp`,ids.length?"g":""]].concat(ids.map(id=>[`✧ ${TITLE[id]}`,`${b[id].n>1?`${b[id].n} lần · `:""}${b[id].first?`lần đầu: ${b[id].first.who||""}${b[id].first.o?", "+b[id].first.o:""}`:""}`]));
 rows.push(["Ghi chú","Sổ chỉ để nhớ: kỳ ngộ không mang lợi thế nào sang kiếp sau."]);
 return `<h3>Kỳ ngộ</h3>`+(typeof rows67==="function"?rows67(rows):"")}
KY.book=book;KY.bookHTML=bookHTML;
/* ---------- wiring (wraps only) ---------- */
const PLACE_ACT=[[/Thái hậu|Đức Thọ/,"tn"],[/Hoàng hậu|Càn Ninh/,"kn"],[/Kính sự phòng/,"ksp"],[/Thái y/,"tyv"],[/Nội vụ phủ/,"nvp"],[/Ngự hoa viên|dạo vườn/,"vuon"],[/Lãnh cung|Trường Môn/,"lc"]];
function actPlace(n){n=String(n||"");for(const [re,k] of PLACE_ACT)if(re.test(n))return k;return null}
KY.actPlace=actPlace;
function popNow(){try{if(Q.length&&Q[0]&&Q[0].ky&&typeof showModal==="function")showModal()}catch(e){}}
if(typeof goTo==="function"){const g0=goTo;goTo=window.goTo=function(k){const p0=S&&S.place;const r=g0.apply(this,arguments);try{if(S&&S.place===k&&k!=="home"&&p0!==k){kyArrive(S,k,"walk");popNow()}}catch(e){kerr("goTo",e)}return r}}
if(typeof srvGoTo==="function"){const s0=srvGoTo;srvGoTo=window.srvGoTo=function(k){const p0=S&&S.place;const r=s0.apply(this,arguments);try{if(S&&S.place&&S.place!=="home"&&S.place!==p0){kyArrive(S,S.place,"walk");popNow()}}catch(e){kerr("srvGoTo",e)}return r}}
if(typeof act==="function"){const a0=act;act=window.act=function(i){const a=typeof deck!=="undefined"&&deck?deck[i]:null;const was=a&&a.done;const r=a0.apply(this,arguments);try{if(a&&!was&&a.done){const k=actPlace(a.n);if(k){kyArrive(S,k,"act");popNow()}}}catch(e){kerr("act",e)}return r}}
function npcPass(){try{if(!S||S.dead||!KB()||!KB().on)return;if(typeof worldOn==="function"&&!worldOn())return;const W=S.where||{};
 for(const v of liveRivals(true)){if(v.confined||v.coop)continue;const bd=band(v);KY.stat.npcB[bd]=(KY.stat.npcB[bd]||0)+1;const k=placeOfId("v"+v.id,W[v.id]);if(k)kyArrive(v,k,"npc")}}catch(e){kerr("npc",e)}}
KY.npcPass=npcPass;
if(typeof nextBuoi==="function"){const n0=nextBuoi;nextBuoi=window.nextBuoi=function(){/* F2: the NPC pass runs at the END of this buổi (roster + her walk still on it), so she can be their WHO */try{if(S)npcPass()}catch(e){kerr("buoi",e)}return n0.apply(this,arguments)}}
if(typeof pastHTML==="function"){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{return h+bookHTML()}catch(e){return h}}}
if(typeof lifeSave==="function"){const l0=lifeSave;lifeSave=function(fate){try{const L=(S&&S.ky&&S.ky.got)||[];if(L.length)fate=`${fate} · Kỳ ngộ: ${L.map(id=>TITLE[id]||id).join(", ")}`}catch(e){}return l0.call(this,fate)}}
/* bot / test stat: what happened to her this buổi */
KY.stat.reset=()=>{KY.stat.elig=0;KY.stat.roll=0;KY.stat.hit=0;KY.stat.npcHit={};KY.stat.npcB={};KY.stat.ids={};KY._e=0;KY._h=0};
KY.stat.buoi=()=>{const r={elig:KY.stat.elig>KY._e,hit:KY.stat.hit>KY._h,id:KY.cur&&KY.cur.id};KY._e=KY.stat.elig;KY._h=KY.stat.hit;return r};
KY.stat.npc=()=>({hit:Object.assign({},KY.stat.npcHit),buoi:Object.assign({},KY.stat.npcB)});
})();
