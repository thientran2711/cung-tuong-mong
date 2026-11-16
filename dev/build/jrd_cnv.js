/* ================= jrd_cnv: the four full roads of «Cung nữ tuyển vào cung» (cnv, servant start), chapters .5–.11 (ROAD_MAP.md §4.9) =================
   Pattern = jrd_tt.js. ROAD_MAP §8.4 decision (B3): the road stays 8 chapters; the rise to tiểu chủ happens INSIDE the roads (each road has a
   real path that raises «Hoàng thượng để ý», the game's own rise rule BAL.ntRise then offers the rise; cnv_mat .8 may raise her at once), so
   ms:len14 is no longer a middle chapter. Every chapter reads right whether she is still a maid or already raised (S.srv.risen); if she is
   still a maid when the road ends, chapter 12 is «Từ kẻ hầu thành tiểu chủ» (jend14.js). */

/* ---------- who holds the inner palace (review road-b3-r1 items 3/5) ----------
   "hh" = a Hoàng hậu sits (qOn), "th" = the seat is empty and the Thái hậu speaks for it, "emp" = both are gone: the Emperor's own word
   (through Nội vụ phủ / Thận hình ty). CNV_QK = the favour stat behind that voice: hh, th, or the Emperor's eye («Hoàng thượng để ý» while
   she serves — Sủng is 0 for a maid — and Sủng once raised). Odds that read this favour use CNV_QV, never S.hh directly. */
const CNV_QM=()=>{let q=true;try{q=qOn()}catch(e){}return q?"hh":S.thDead?"emp":"th"};
const CNV_QN=()=>({hh:"Hoàng hậu",th:"Thái hậu",emp:"Hoàng thượng"})[CNV_QM()];
const CNV_QON=()=>CNV_QM()!=="emp";/* a woman still holds the inner palace (beats where she acts in person) */
const CNV_QK=()=>{const m=CNV_QM();return m==="hh"?"hh":m==="th"?"th":(typeof isSrv==="function"&&isSrv()?"nt":"sung")};
const CNV_QV=()=>S[CNV_QK()]||0;

/* ---------- the road's mistress {mis} (review road-b3-r1 item 6) ----------
   {mis} is the woman the road is about, cast ONCE: S.st.f14.act.mis (saved with the life). j42 srvReassign gives a maid a new S.srv.mid when
   her mistress dies, and srvM keeps a dead mistress after the rise, so S.srv.mid is never read for the road once act.mis is set. Old saves
   without act.mis fall back to srvM() (the mistress of the moment, as before). A gone mistress (dead, or sent to the cold palace) is told
   once (log + the chapter's first card, like rdCast) and never acts again: chapters that need her (cnv_chu, cnv_mat .5–.9, cnv_ban .9)
   cast false (jst14 puts a shared chapter in the slot; jroad tells the origin ending from the last road chapter that ran); the others guard
   her options with if:CNV_MOK and switch her texts with CNV_MT. */
function CNV_MID(){try{const K=S.st&&S.st.f14&&S.st.f14.act;if(K&&K.mis!=null)return K.mis}catch(e){}const m=srvMis67();return m?m.id:null}
function CNV_MIS(){const id=CNV_MID();if(id==null)return null;try{return RV(id)||null}catch(e){return null}}
function CNV_MOK(){const m=CNV_MIS();return !!(m&&m.alive&&!m.out)}
/* she is still the woman this maid serves (Chủ tin belongs to the mistress of the moment) */
function CNV_MCUR(){return CNV_MOK()&&typeof isSrv==="function"&&isSrv()&&S.srv.mid===CNV_MID()}
/* text switch: living mistress / gone mistress */
const CNV_MT=(a,b)=>()=>CNV_MOK()?(typeof a==="function"?a():a):(typeof b==="function"?b():b);
/* the road's first need of her: keep her id once; tell once when she is gone; need=1 → the chapter cannot run without her */
function CNV_MC(A,need){try{const f=S.st&&S.st.f14;if(f){const K=f.act||(f.act={});if(K.mis==null){const m=srvMis67();if(m)K.mis=m.id}
  if(K.mis!=null)A.act.mis=K.mis;const m=CNV_MIS();
  if(m&&!(m.alive&&!m.out)&&f.misT!==m.id){f.misT=m.id;const L=`${m.name} ${m.alive?"đã bị đưa vào lãnh cung":"nay đã khuất"}, ${need?"chuyện của nàng khép lại tại đây":"việc còn lại ngươi tự gánh"}.`;
   (A.rc=A.rc||[]).push(L);try{log(`<i>${L}</i>`)}catch(e){}}}}catch(e){}
 return !need||CNV_MOK()}
/* relation with the road's mistress (real both ways, OD:L1247); Chủ tin only while she is the mistress this maid serves */
function CNV_REL(n){try{const m=CNV_MIS();if(m&&m.alive){relAdd(S,m,n);if(n<0&&typeof oanAdd==="function")oanAdd(m,S,-n)}
 if(CNV_MCUR())S.tin=Math.max(0,Math.min(100,(S.tin||0)+n))}catch(e){}return""}
/* {mis} and the speaker "mis" of a cnv road chapter read the road's mistress (never the silently reassigned one); a gone mistress has no
   portrait. The .4 premise thread keeps her id the moment the road starts, so a death between .4 and .5 is not a silent recast. */
(function(){const cnvA=A=>{try{const a=A&&ARC67[A.a];return !!(a&&a.o==="rd"&&/^cnv_/.test(a.road||""))}catch(e){return false}};
 if(typeof TOK67==="object"&&TOK67){const t0=TOK67.mis;TOK67.mis=function(A){if(cnvA(A)){const m=CNV_MIS();return m?m.name:"chủ nhân"}return t0.apply(this,arguments)}}
 if(typeof who67==="function"){const w0=who67;who67=function(w,A){if(w==="mis"&&cnvA(A)){const m=CNV_MIS();try{return m&&m.alive&&!m.out?pv(m):null}catch(e){return null}}return w0.apply(this,arguments)}}
 if(typeof newThread67==="function"){const n0=newThread67;newThread67=function(id){const A=n0.apply(this,arguments);
  try{const f=S.st&&S.st.f14;if(A&&f&&f.rd===id&&/^cnv_/.test(id)&&rdOn()){const K=f.act||(f.act={});if(K.mis==null){const m=srvMis67();if(m)K.mis=m.id}}}catch(e){}return A}}})();

/* ---------- Empty Hoàng hậu seat / both gone (CNV_QFIX, shared by the four cnv roads, called once per road) ----------
   qOn() false: every text of the road that names the Hoàng hậu / Càn Ninh cung / Trung cung reads the Thái hậu / Đức Thọ cung, Hoàng hậu
   favour (hh) becomes Thái hậu favour (th), and the speaker portrait follows. When the Thái hậu is dead too (S.thDead) the same texts read
   the Emperor (Dưỡng Tâm điện, «Trẫm»), hh becomes his favour (CNV_QK) and the speaker is the Emperor: nobody dead ever speaks. Texts that
   need the exact wording of a mode are functions of CNV_QM and use none of the trigger words outside the "hh" mode.
   Getters keep strings as strings (arcReveal67 and rare-path matching still see text). */
function CNV_QFIX(road){
 const W=/Hoàng hậu|Càn Ninh cung|Trung cung/,qn=()=>CNV_QM()==="hh";
 const sub=s=>{if(typeof s!=="string"||!W.test(s))return s;if(CNV_QM()==="emp")return s.replace(/“Bổn cung/g,"“Trẫm").replace(/cung Hoàng hậu/g,"Dưỡng Tâm điện").replace(/Càn Ninh cung/g,"Dưỡng Tâm điện").replace(/Trung cung/g,"Hoàng thượng").replace(/Hoàng hậu/g,"Hoàng thượng");
  return s.replace(/“Bổn cung/g,"“Ai gia").replace(/Càn Ninh cung/g,"Đức Thọ cung").replace(/Trung cung/g,"Thái hậu").replace(/Hoàng hậu/g,"Thái hậu")};
 const map=o=>{const k2=CNV_QM()==="th"?"th":CNV_QK();const r={};for(const k in o){const j=k==="hh"?k2:k;r[j]=(r[j]||0)+o[k]}return r};
 const fix=(ob,keys)=>{if(!ob)return;for(const k of keys){if(!Object.prototype.hasOwnProperty.call(ob,k))continue;const v=ob[k];
  if(k==="w"&&typeof v==="string"){if(v==="hh")Object.defineProperty(ob,k,{get:()=>({hh:"hh",th:"th",emp:"emp"})[CNV_QM()],enumerable:true,configurable:true});continue}
  if(typeof v==="string"){if(W.test(v))Object.defineProperty(ob,k,{get:()=>qn()?v:sub(v),enumerable:true,configurable:true})}
  else if(typeof v==="function"){if(k!=="n")ob[k]=function(A){const s=v.apply(this,arguments);return qn()?s:sub(s)}}
  else if(v&&typeof v==="object"&&"hh" in v){Object.defineProperty(ob,k,{get:()=>qn()?v:map(v),enumerable:true,configurable:true})}}};
 for(const id in ARC67){const a=ARC67[id];if(!a||a.road!==road)continue;fix(a,["g","t","w"]);
  for(const bk in a.B||{}){const b=a.B[bk];fix(b,["t","h","l","w"]);if(Array.isArray(b.o))for(const o of b.o)fix(o,["n","rt","rf","lx","wx","c","w","l"])}
  for(const ek in a.E||{})fix(a.E[ek],["t","tag","fx","w"])}
 for(const r of (typeof RD97L!=="undefined"?RD97L:[]))if(r&&String(r.a).indexOf(road+"_")===0)fix(r,["t","tag","ti","n","fx","w"])}

/* ---------- cnv_chu · Bí mật của chủ nhân ---------- */
/* BAL.road keys needed: none (deadlines are worded in the story: "trước khi trời sáng", "trước rằm").
   Story (one secret in layers): the musk {mis} hid left Thái y viện under the name of {v}'s palace; Ôn thái y (story-only NPC) warned {mis}
   in the letter she burned; {mis} stole the packet on its way to the kitchen of a pregnant consort (the good deed she never told, because
   telling means confessing how she lost her own child to the same musk). Half of it leaks (.8), the Trung cung asks (.9), Thận hình ty
   questions (.10), the Emperor decides (.11).
   Servant start (ROAD_MAP §8.4): every chapter reads right whether she is still a maid (isSrv) or already raised (S.srv.risen; {mis} is then
   her former mistress). Maid-only effects (tin, nt, e67merit) only through need:["srv"] options or CHU_MIS / CHU_NT.
   {mis} = the road's mistress, kept once in S.st.f14.act.mis (CNV_MC, _hd_cnv.js): the whole road is her secret, so every chapter needs her
   alive (cast false when she is dead or in the cold palace; the loss is told once). Who asks for the inner palace: CNV_QN (Hoàng hậu,
   the Thái hậu for an empty seat, the Emperor himself when both are gone); verdicts on a consort are the Emperor's (road-history). */
const CHU_R=()=>!!(S.srv&&S.srv.risen);
const CHU_T=(a,b)=>A=>{const x=CHU_R()?b:a;return typeof x==="function"?x(A):x};/* text: maid wording / consort wording */
const CHU_Q=()=>CNV_QN();/* who holds the inner palace: Hoàng hậu / Thái hậu / Hoàng thượng (_hd_cnv.js) */
/* {mis} relation, real both ways (OD:L1247); as a maid also Chủ tin */
function CHU_MIS(n){return CNV_REL(n)}
/* the Emperor's eye: Hoàng thượng để ý while a maid (BAL.ntRise then offers the rise), Sủng once raised */
function CHU_NT(n){try{if(typeof isSrv==="function"&&isSrv()){S.nt=Math.max(0,Math.min(100,(S.nt||0)+n));return `Hoàng thượng để ý +${n}.`}apply({sung:Math.round(n/3)});return `Sủng +${Math.round(n/3)}.`}catch(e){return""}}
const CHU_E=()=>CHU_R()?S.sung:S.nt;/* odds term for options that reach the Emperor */

rdDef("cnv_chu",5,{t:"Gói thuốc",w:"doc",sj:"gói thuốc của {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:"Gói xạ hương {mis} giấu vẫn nằm đó. Ở Thái y viện, mỗi lạng xạ hương xuất kho đều ghi tên cung nhận. Biết gói thuốc từ đâu ra là biết bí mật này nặng đến đâu.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chìa khóa rương thuốc",w:"mis",if:()=>rdPrev()==="win",t:CHU_T("Từ đêm ấy {mis} coi ngươi là tâm phúc. Nàng giao ngươi giữ chìa khóa rương thuốc, dặn: “Gói giấy dầu ở đáy rương, không ai được đụng, kể cả ngươi.”","Ngươi đã rời cung {mis}, nhưng nàng vẫn coi ngươi là người duy nhất biết chuyện. Nàng sai người lén đưa sang chìa khóa rương thuốc: “Giữ hộ ta. Cung ta không còn ai đáng tin.”"),o:[
  {n:"Giữ chìa khóa, không mở rương",c:{danh:-2},w:{duc:2},wx:"{mis} thêm tin ngươi",lx:"người ta bảo ngươi giữ của mà không biết của gì, tiếng ngươi sút",go:()=>CHU_MIS(4),rt:"Ngươi đeo chìa khóa vào cổ, chưa từng tra vào ổ."},
  {n:"Mở rương xem gói giấy dầu",c:{},o:()=>45+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"biết gói thuốc ghi tên cung nào",l:{danh:-1},lx:"{mis} thấy dấu niêm bị động, giận ngươi; tiếng ngươi sút",go:(A,ok)=>{if(!ok)CHU_MIS(-6)},rt:"Giấy dầu có dấu đỏ của Thái y viện, ghi «xuất cho cung {v}».",rf:"Dấu niêm rách một góc. Hôm sau {mis} nhìn ngươi khác hẳn."},
  {n:"Xin {mis} cho biết thật",c:{suc:-2},o:()=>40+S.duc/4,w:{tamco:1},sc:1,wx:"nghe từ chính miệng nàng",l:{},lx:"{mis} cho là ngươi tò mò, bớt tin ngươi; ngươi mệt mà không được gì",go:(A,ok)=>CHU_MIS(ok?5:-4),rt:"{mis} chỉ nói: “Thứ này không phải của ta. Ta giữ nó để nó không đến tay người khác.”",rf:"{mis} lạnh giọng: “Giữ chìa khóa là đủ.”"}]},
 s2:{h:"Kẻ đã nói",w:"mis",if:()=>rdPrev()==="win2",t:CHU_T("Ngươi đã trình chuyện lên trên, nhưng không đủ chứng cứ để động đến {mis}. Nội vụ phủ trả ngươi về hầu nàng như cũ, và nàng biết chính ngươi đã nói.","Ngươi đã trình chuyện lên trên. Nay ngươi là tiểu chủ, còn {mis}, chủ cũ của ngươi, gặp ngươi ở đâu cũng quay mặt đi."),o:[
  {n:"Quỳ xin {mis} tha lỗi",c:{suc:-3},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"{mis} nguôi một phần",l:{danh:-1},lx:"quỳ đến rã gối vẫn bị cho là kẻ hai lòng, {mis} bớt tin, tiếng ngươi sút",go:(A,ok)=>CHU_MIS(ok?6:-3),rt:"{mis} im rất lâu rồi nói: “Ngươi nói vì ngươi sợ. Ta hiểu sợ là gì.”",rf:"{mis} bước qua, không nhìn."},
  {n:"Lặng lẽ tìm thêm chứng cứ",c:{bac:-15},o:()=>45+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"có manh mối về gói thuốc",l:{},lx:"{mis} biết ngươi dò, nàng giận; bạc bỏ ra mất trắng",go:(A,ok)=>{if(!ok)CHU_MIS(-5)},rt:"Một y đồng nói gói xạ hương ấy xuất kho dưới tên cung {v}.",rf:CHU_T("{mis} bắt gặp ngươi lục rương.","{mis} biết ngươi cho người dò quanh cung nàng.")},
  {n:"Báo tiếp lên trên mỗi điều thấy",c:{duc:-2},w:{hh:4},f:"tell",wx:"Trung cung nhớ ngươi",lx:"{mis} coi ngươi là kẻ phản; lòng ngươi áy náy",go:()=>CHU_MIS(-8),rt:"Ngươi gửi thêm một lời qua người của Trung cung."}]},
 s3:{h:"Mẩu giấy trong gối",w:"me",if:()=>rdPrev()!=="win"&&rdPrev()!=="win2",t:"Ngươi đã tránh xa chuyện ấy. Nhưng tối qua có ai nhét vào gối ngươi một mẩu giấy: «Xạ hương ở cung {mis} là của ai, ngươi biết.»",o:[
  {n:"Đốt mẩu giấy",c:{danh:-2},w:{duc:2},wx:"không để lại dấu",lx:"kẻ viết vẫn rình, người ta bảo ngươi nhát, tiếng ngươi sút",rt:"Ngươi đốt mẩu giấy trong lò, chờ tro nguội mới ngủ."},
  {n:"Đem mẩu giấy đến {mis}",c:{suc:-2},o:()=>40+S.duc/4,w:{tamco:1},sc:1,wx:"{mis} biết ngươi đứng về phía nàng",l:{},lx:"{mis} nghi chính ngươi viết, bớt tin ngươi",go:(A,ok)=>CHU_MIS(ok?8:-5),rt:"{mis} đọc, tay run: “Có kẻ biết rồi.”",rf:"{mis} nhìn nét chữ rồi nhìn ngươi."},
  {n:"Lần ra kẻ nhét giấy",c:{bac:-15},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"biết ai đang rình",l:{danh:-1},lx:"kẻ ấy biết ngươi dò, đồn ngươi lắm chuyện, tiếng ngươi sút; bạc mất trắng",rt:"Nét chữ là của một cung nữ áo xanh, người hay qua lại cung {v}.",rf:"Không ai nhận."}]},
 c1:{h:"Sổ xuất kho Thái y viện",w:"doc",t:"Mỗi lạng xạ hương ra khỏi Thái y viện đều phải ghi sổ. Một y đồng nói có thể cho ngươi xem, nếu có bạc, và phải trước khi sổ tháng này nộp lên viện phán.",o:[
  {n:"Đưa bạc xem sổ",c:{bac:-30},o:()=>50+S.mat*4,w:{mat:1},sc:1,f:"know",wx:"thấy tận mắt tên cung nhận thuốc",l:{danh:-2},lx:"y đồng khai ra ngươi, tiếng ngươi sút; bạc mất trắng",rt:"Sổ ghi: ba lạng xạ hương xuất cho cung {v}; người ký nhận thay là Ôn thái y.",rf:"Viện phán bắt gặp y đồng, hắn khai có người trong cung hỏi sổ."},
  {n:"Hỏi khéo một thái y quen",c:{suc:-2},o:()=>40+S.tai/4,w:{tamco:1},sc:1,wx:"biết chuyện mà không để dấu",l:{danh:-1},lx:"thái y lảng đi, còn ngươi bị nhớ mặt là kẻ dò hỏi, tiếng sút",rt:"Thái y thở dài: “Hỏi Ôn thái y. Ông ấy ký sổ tháng ấy.”",rf:"Thái y nói không nhớ."},
  {n:"Thôi, không dò nữa",c:{danh:-2},w:{duc:2},wx:"không dính vào Thái y viện",lx:"manh mối nguội dần, người ta bảo ngươi nhát, tiếng ngươi sút",rt:"Ngươi quay về, không hỏi ai."}]},
 c2:{h:"{v} hỏi sổ thuốc",w:"v",need:["v"],t:"{v} sai người đến Thái y viện hỏi: tháng trước có ai tra sổ xạ hương không. Nàng đang tìm gói thuốc thất lạc.",o:[
  {n:"Xóa dấu chân mình",c:{bac:-20},w:{mat:1},wx:"không ai biết ngươi đã đến viện",lx:"tốn bạc mua miệng, y đồng vẫn nhớ mặt",rt:"Y đồng nhận bạc, quên luôn ngày ngươi đến."},
  {n:"Để mặc {v} dò",c:{danh:-2},w:{duc:1},wx:"không phải làm gì thêm",lx:"{v} để mắt đến cung {mis}, thêm oán; người ta bảo ngươi đứng nhìn, tiếng sút",go:A=>{rdOan(A,"v",4)},rt:"Người của {v} đi một vòng, ghi chép rồi về."},
  {n:"Thả tin giả cho {v}",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{v} đi tìm sai chỗ",l:{danh:-2},lx:"{v} biết có người giở trò, oán nặng hơn; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?6:8)},rt:"{v} cho lục cả kho hương của Ngự thiện phòng.",rf:"{v} cười nhạt: “Kẻ nào bày trò này, ta sẽ biết.”"}]},
 t1:{h:"Ôn thái y",w:"doc",t:"Ngươi gặp Ôn thái y ở hành lang Thái y viện. Ông già run tay, nói khẽ: “Bức thư {mis} đốt là của ta. Ta xin ngươi đừng hỏi nữa.”",o:[
  {n:"Hứa giữ kín cho ông",c:{danh:-2},w:{duc:3},f:"doc",wx:"Ôn thái y nợ ngươi một lần",lx:"điều ông biết vẫn khóa trong miệng ông; người ta bảo ngươi bao che, tiếng sút",rt:"Ông cúi đầu cảm ơn, đi rất nhanh."},
  {n:"Ép ông nói hết",c:{suc:-3},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"know",wx:"biết thêm nửa câu chuyện",l:{duc:-3},lx:"ông sợ, xin cáo bệnh; lòng ngươi cắn rứt vì ép một ông già",rt:"Ông nói: gói thuốc ra khỏi viện dưới tên cung {v}, nhưng đến tay {mis} bằng đường khác. Ông chỉ dám nói đến đó.",rf:"Ông ôm ngực, gọi người đỡ về."},
  {n:"Báo {mis} rằng ông đã nói",c:{duc:-2},w:{tamco:1},wx:"{mis} biết ngươi không giấu nàng",lx:"Ôn thái y không còn tin ngươi; lòng ngươi áy náy vì phụ lời ông",go:()=>CHU_MIS(5),rt:"{mis} gật đầu: “Ông ấy là người tốt. Đừng làm khó ông.”"}]},
 x1:{h:"Gói thuốc trong tay ai",w:"mis",t:"Giờ ngươi biết gói xạ hương ra khỏi Thái y viện dưới tên cung {v}. Đem điều ấy về đâu?",o:[
  {n:"Nói với {mis} điều ngươi biết",c:{suc:-4},o:A=>35+(A.f.know?10:0)+S.duc/6,e:["win","lose"],rt:"{mis} nắm tay ngươi: “Vậy ngươi đã hiểu vì sao ta giấu.”",rf:"{mis} tái mặt: “Ai cho ngươi đi dò?”"},
  {n:"Giữ trong lòng, chép lại một bản",c:{suc:-2},w:{mat:1},e:"mid",lx:"thức khuya chép rồi khâu giấu, ngươi mệt rã; một mình gánh chuyện, vụ chỉ dừng ở giữa chừng",rt:"Ngươi chép tên cung {v} vào mảnh lụa, khâu vào lót áo."},
  {n:"Lén cho {v} biết có người đã biết",c:{duc:-3},o:()=>40+S.tamco/3,w:{tamco:2},wx:"{v} thôi dò, không biết ai đã báo",e:["mid","lose"],go:A=>{rdOan(A,"v",6)},lx:"{v} thêm oán; lòng ngươi áy náy vì đi đêm với kẻ thù của chủ",rt:"{v} thôi sai người dò hỏi, nhưng nhìn ngươi như nhìn cây gai.",rf:"{v} lần ra chính ngươi gửi lời."}]}},
 E:{win:{k:1,tag:"Người cùng giữ bí mật",w:"mis",t:"{mis} kể ngươi nghe nửa câu chuyện: gói xạ hương ấy nàng lấy được từ tay người khác, không phải để dùng. Nửa kia nàng chưa nói, nhưng từ nay ngươi là người duy nhất nàng nói cùng.",fx:{tamco:2,danh:2},go:()=>{CHU_MIS(10);return e67merit(4)}},
  mid:{k:0,tag:"Biết mà im",t:"Ngươi biết gói thuốc từ đâu ra. Chưa ai biết ngươi biết.",fx:{mat:1}},
  lose:{k:-1,tag:"{mis} nghi ngươi",w:"mis",t:"{mis} cho là ngươi dò chuyện để bán. Từ nay nàng khóa rương, đổi chỗ giấu, và không gọi ngươi vào phòng trong nữa.",fx:{danh:-2},go:()=>CHU_MIS(-10)}}});

rdDef("cnv_chu",6,{t:"Kẻ dò hỏi",w:"v",sj:"kẻ dò hỏi chuyện cung {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:"Cung {v} đã biết mất một gói xạ hương. Người của nàng bắt đầu dò khắp nơi: ai trực đêm ấy, ai dọn phòng, ai biết gì. Giữ miệng mình, và miệng người quanh mình.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cung nữ áo xanh",w:"maid",if:RDW(1),t:CHU_T("Từ khi {mis} kể ngươi nửa câu chuyện, nàng hay gọi ngươi vào nói riêng. Cũng từ đó, một cung nữ áo xanh của cung {v} sáng nào cũng ngồi cạnh ngươi ở giếng nước.","Từ khi {mis} kể ngươi nửa câu chuyện, nàng hay sai người mời ngươi sang uống trà. Cũng từ đó, một cung nữ áo xanh xin vào hầu cung ngươi, nói là Nội vụ phủ phân xuống."),o:[
  {n:"Làm như không biết, nói chuyện vặt",c:{duc:-2},w:{tamco:1},wx:"nàng không moi được gì",lx:"nàng vẫn ngồi đó mỗi ngày; ngươi áy náy vì phải giả vờ",rt:"Ngươi kể chuyện quê, chuyện may áo, chuyện mưa."},
  {n:"Hỏi ngược lại nàng",c:{suc:-2},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"own",wx:"biết nàng là người của ai",l:{danh:-1},lx:"nàng biết ngươi đề phòng, đi đồn ngươi khó gần, tiếng sút",rt:"Nàng lỡ miệng nhắc tên cung {v}.",rf:"Nàng cười, đổi chuyện."},
  {n:"Báo {mis} có kẻ rình",c:{danh:-2},w:{duc:1},wx:"{mis} thêm tin ngươi",lx:"cả cung căng như dây đàn, người ta bảo ngươi đa nghi, tiếng sút",go:()=>CHU_MIS(5),rt:"{mis} gật đầu: “Để nó rình. Ta biết rồi.”"}]},
 s2:{h:"Nén bạc ở giếng nước",w:"maid",if:RDW(0),t:CHU_T("{mis} giữ ngươi ở xa. Một sáng ở giếng nước, cung nữ áo xanh của cung {v} dúi vào tay ngươi một nén bạc: “Kể ta nghe đêm ấy chủ ngươi đốt gì.”","{v} tự mời ngươi sang uống trà, rót cho ngươi chén đầu, hỏi như vô tình: “Muội từng hầu {mis}, hẳn biết nàng hay mất ngủ vì chuyện gì?”"),o:[
  {n:"Nhận bạc, kể chuyện vô hại",c:{duc:-3},w:{bac:20},wx:"có bạc, họ tưởng ngươi đã ngả",lx:"một lần nhận là có lần sau, lòng ngươi áy náy",rt:"Ngươi kể {mis} hay đau đầu, hay đốt trầm."},
  {n:"Từ chối thẳng",c:{danh:-2},w:{duc:2},wx:"giữ được mình",lx:"cung {v} ghi tên ngươi, thêm oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",4)},rt:"Ngươi đặt lại nén bạc, đứng dậy."},
  {n:"Giả nhận, quay về báo {mis}",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"own",wx:"{mis} biết ngươi một lòng",l:{danh:-2},lx:"bị nghi là kẻ hai mang, {mis} bớt tin, tiếng ngươi sút",go:(A,ok)=>CHU_MIS(ok?8:-4),rt:"{mis} nghe xong, lần đầu mỉm cười với ngươi.",rf:"Có người thấy ngươi nhận bạc, chạy đi kể trước."}]},
 c1:{h:"Đôi hoa tai bạc",w:"maid",t:CHU_T("Một cung nữ cùng phòng có thêm đôi hoa tai bạc mới. Nàng tránh mắt ngươi.","Một cung nữ trong cung ngươi có thêm đôi hoa tai bạc mới. Nàng tránh mắt ngươi."),o:[
  {n:"Hỏi thẳng nàng",c:{},o:()=>40+S.duc/4,w:{mat:1},sc:1,wx:"nàng khai đã bán tin gì",l:{danh:-2},lx:"nàng chạy đi mách, tiếng ngươi sút",rt:CHU_T("Nàng khóc: chỉ kể giờ ngươi trực đêm.","Nàng khóc: chỉ kể giờ ngươi đi ngủ, giờ ngươi đi thỉnh an."),rf:"Nàng chối, rồi xin đổi chỗ."},
  {n:"Theo xem nàng gặp ai",c:{suc:-3},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"own",wx:"biết đường tin đi",l:{danh:-1},lx:"bị nàng phát hiện, đi đồn ngươi rình người, tiếng sút; ngươi mệt rã",rt:"Nàng đưa tin cho cung nữ áo xanh ở sau giả sơn.",rf:"Nàng ngoái lại, thấy ngươi."},
  {n:"Cho nàng bạc gấp đôi để quay về",c:{bac:-30},w:{duc:1},wx:"đường rò thành của ngươi",lx:"tốn bạc, nàng có thể ăn hai đầu",rt:"Nàng nhận bạc, dập đầu."}]},
 c2:{h:"{v} ra mặt",w:"v",need:["v"],t:"{v} chặn ngươi ở cửa ngự hoa viên: “Thứ gì của cung ta, sớm muộn cũng về cung ta. Ngươi nên nghĩ cho mình.”",o:[
  {n:"Cúi đầu, không đáp",c:{danh:-2},w:{duc:2},wx:"không để lọt một lời",lx:"{v} cho là ngươi sợ, người trong cung coi thường, tiếng sút",rt:"{v} phẩy tay áo bỏ đi."},
  {n:"Đáp cứng: không biết gì",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"{v} biết ngươi không dễ dọa",l:{danh:-2},lx:"{v} nổi giận, oán nặng hơn; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?5:8)},rt:"{v} nhìn ngươi một lúc, rồi cười: “Được.”",rf:"{v} tát ngươi trước mặt người qua lại."},
  {n:"Hỏi {v} muốn đổi gì",c:{duc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"biết {v} sợ điều gì",l:{},lx:"{v} nghĩ ngươi bán được rồi trở mặt; lòng ngươi áy náy vì đã mặc cả",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} buột miệng: “Chỉ cần gói giấy dầu, không cần gì khác.”",rf:"{v} không đáp, chỉ nhớ mặt ngươi."}]},
 t1:{h:"Ai đứng sau cung nữ áo xanh",w:"eun",t:"Ngươi lần ra: tin cung nữ áo xanh gom được đều qua tay một thái giám dưới quyền {eun} trước khi đến cung {v}. Nghĩa là Nội vụ phủ cũng đã nghe.",o:[
  {n:"Mua chuộc thái giám ấy",c:{bac:-40},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"tin đi qua tay hắn sẽ bị lọc",l:{danh:-2},lx:"hắn ăn bạc rồi báo lên, tiếng ngươi sút; bạc mất trắng",rt:"Hắn nhận bạc, hứa “chép sai vài chữ”.",rf:"Hắn nhận bạc, rồi báo lại {eun}."},
  {n:"Báo {mis} đề phòng Nội vụ phủ",c:{duc:-2},w:{tamco:1},wx:"{mis} kịp đổi chỗ giấu",lx:"Nội vụ phủ thấy cung {mis} giữ kẽ; lòng ngươi áy náy vì đã nghi oan người",go:()=>CHU_MIS(4),rt:"{mis} dời gói thuốc ra khỏi rương ngay đêm ấy."},
  {n:"Để yên, giả như chưa biết",c:{danh:-2},w:{duc:1},wx:"không đánh động ai",lx:"đường tin vẫn chảy, người ta cười cung ngươi hở, tiếng sút",rt:"Ngươi im lặng quan sát."}]},
 x1:{h:"Bắt kẻ dò hỏi",w:"maid",t:"Đêm nay cung nữ áo xanh hẹn gặp người mua tin ở góc sân sau. Bắt tận tay, cho nàng mang tin giả về, hay để yên?",o:[
  {n:"Bắt tận tay kẻ dò hỏi",c:{suc:-5},o:A=>40+S.mat*4,e:["win","lose"],rt:"Cung nữ áo xanh bị bắt cùng mẩu giấy ghi giờ trực của cả cung.",rf:"Nàng chạy thoát, chỉ còn lời ngươi nói."},
  {n:"Cho nàng mang tin giả về",c:{bac:-15},lx:"tốn bạc mua người dựng tin giả; kẻ dò hỏi vẫn ở lại trong cung, vụ chỉ dừng ở giữa",o:A=>40+(A.f.own?15:0)+S.tamco/4,e:["win","mid"],rt:"Cung {v} tin rằng gói thuốc đã bị đốt.",rf:"Tin giả bị nghi, nhưng nàng không moi thêm được gì."},
  {n:"Để yên, khép kín cửa",c:{danh:-2},w:{duc:2},e:"mid",lx:"kẻ dò hỏi vẫn ở đó, vụ chỉ dừng ở giữa",rt:"Ngươi khóa cửa sân sau, đi ngủ sớm."}]}},
 E:{win:{k:1,tag:"Kẻ dò hỏi bị bắt",w:"mis",t:"Người của {v} bị bắt hoặc bị lừa. {mis} biết, trong lúc cả cung chao đảo, ngươi là người đứng giữ cửa.",fx:{danh:4},go:A=>{rdOan(A,"v",8);CHU_MIS(8);return e67merit(4)}},
  mid:{k:0,tag:"Cửa đã khép",t:"Tin không lọt thêm, nhưng kẻ dò hỏi vẫn còn đó, và {v} vẫn chưa thôi tìm.",fx:{mat:1}},
  lose:{k:-1,tag:"Tin đã lọt",w:"v",t:"{v} biết đêm ấy ai trực ở cung {mis}. Từ nay ánh mắt nàng dừng trên ngươi mỗi khi gặp.",fx:{danh:-3},go:A=>{rdOan(A,"v",6)}}}});

rdDef("cnv_chu",7,{t:"Chủ thử lòng",w:"mis",sj:"phép thử của {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:"{mis} không tin ai trọn vẹn, kể cả ngươi. Nàng bày một phép thử: cho ngươi biết một điều, rồi xem điều ấy có lọt ra ngoài không.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Đứa con năm ngoái",w:"mis",if:RDW(1),t:CHU_T("Sau vụ cung nữ áo xanh, {mis} gọi ngươi vào, đóng cửa, kể: “Năm ngoái ta mất một đứa con. Trong lò hương phòng ta có xạ hương.” Nàng dừng ở đó, nhìn ngươi.","Sau vụ cung nữ áo xanh, {mis} sang tận cung ngươi, cho người hầu lui hết, kể: “Năm ngoái ta mất một đứa con. Trong lò hương phòng ta có xạ hương.” Nàng dừng ở đó, nhìn ngươi."),o:[
  {n:"Hỏi ai đã làm",c:{},o:()=>40+S.duc/4,w:{mat:1},sc:1,wx:"nghe tên kẻ hại nàng",l:{danh:-2},lx:"{mis} cho là ngươi hỏi nhiều, bớt tin; tiếng ngươi sút",go:(A,ok)=>{if(!ok)CHU_MIS(-3)},rt:"{mis} không nói tên, chỉ nhìn về phía cung {v}.",rf:"{mis} quay mặt đi."},
  {n:"Quỳ xuống nghe, không hỏi",c:{danh:-2},w:{duc:2},f:"loyal",wx:"{mis} thấy ngươi biết giữ",lx:"chỉ biết được nửa chuyện, người ta bảo ngươi cam chịu, tiếng sút",go:()=>CHU_MIS(5),rt:"{mis} đặt tay lên vai ngươi rất lâu."},
  {n:"Khuyên nàng tâu lên",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,wx:"{mis} nghĩ đến lẽ phải",l:{},lx:"{mis} giận ngươi ngây thơ, bớt tin; ngươi mệt mà vô ích",go:(A,ok)=>CHU_MIS(ok?3:-5),rt:"{mis} lắc đầu: “Chưa đủ chứng. Nói ra là ta chết trước.”",rf:"{mis} cười buồn: “Ngươi chưa biết trong cung này lời nói rẻ đến đâu.”"}]},
 s2:{h:"Lời đồn về ngươi",w:"mis",if:RDW(0),t:"{mis} gọi ngươi đến, giọng lạnh: “Có người nói ngươi đã kể chuyện đêm ấy. Ta muốn nghe từ miệng ngươi.”",o:[
  {n:"Thề chưa nói với ai",c:{},o:()=>40+S.duc/4,w:{duc:1},sc:1,f:"loyal",wx:"{mis} tạm tin",l:{danh:-2},lx:"{mis} không tin lời thề, bớt tin ngươi; tiếng ngươi sút",go:(A,ok)=>CHU_MIS(ok?5:-4),rt:"{mis} gật đầu: “Ta sẽ xem.”",rf:"{mis} cười nhạt: “Ai cũng thề.”"},
  {n:"Kể thật mình từng bị dò",c:{duc:-2},w:{tamco:1},wx:"{mis} biết ai đang nhắm vào nàng",lx:"{mis} biết ngươi từng giấu nàng; lòng ngươi áy náy",go:()=>CHU_MIS(2),rt:"{mis} nghe hết, im lặng."},
  {n:"Im lặng chịu trách",c:{suc:-3},w:{duc:2},wx:"không thêm lời nào để bị bắt bẻ",lx:"{mis} cho là ngươi có tật, bớt tin; ngươi mệt rã người",go:()=>CHU_MIS(-3),rt:"Ngươi cúi đầu suốt buổi."}]},
 c1:{h:"Lời đồn giả",w:"mis",t:"Hôm sau cả cung xôn xao: «{mis} giấu thư tình trong rương». Hôm qua, chỉ có ngươi nghe {mis} nhắc đến cái rương. Hoặc đó là phép thử.",o:[
  {n:"Đi tìm gốc lời đồn",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"chứng minh không phải ngươi",l:{danh:-1},lx:"càng dò càng bị nghi, tiếng ngươi sút; ngươi mệt rã",rt:"Lời đồn bắt đầu từ chính một cung nữ {mis} vừa dặn riêng.",rf:"Không ai nhận đã nói trước."},
  {n:"Đến thưa với {mis}: không phải ngươi",c:{},o:()=>40+S.duc/4,w:{duc:1},sc:1,f:"loyal",wx:"{mis} thấy ngươi thẳng",l:{danh:-2},lx:"tự đến là tự nhận nghi, {mis} bớt tin, tiếng sút",go:(A,ok)=>CHU_MIS(ok?5:-3),rt:"{mis} cười: “Ta biết. Ta chỉ xem ngươi có đến không.”",rf:"{mis} chỉ nói: “Lui ra.”"},
  {n:"Im lặng, để thời gian nói",c:{duc:-2},w:{tamco:1},wx:"không tự đưa mình vào bẫy",lx:"lời đồn sống thêm vài ngày, lòng ngươi nặng trĩu",rt:"Ngươi sống như mọi ngày."}]},
 c2:{h:"Hộp gấm niêm phong",w:"mis",need:["srv"],t:"{mis} đưa ngươi một hộp gấm niêm phong: “Đem đến chỗ Ôn thái y, trước giờ Thái y viện đóng cửa. Không được mở.”",o:[
  {n:"Đem đi, không mở",c:{suc:-2},w:{duc:2},f:"loyal",wx:"qua phép thử",lx:"không biết mình mang gì, ngươi mệt rã vì chạy việc",go:()=>CHU_MIS(6),rt:"Ôn thái y nhận hộp, mở ra: chỉ là một gói trà. Ông cười: “Nàng thử ngươi đấy.”"},
  {n:"Lén mở xem",c:{},o:()=>45+S.tamco/4,w:{mat:1},sc:1,wx:"biết hộp chỉ là phép thử",l:{danh:-2},lx:"dấu niêm không còn như cũ, {mis} giận; tiếng ngươi sút",go:(A,ok)=>{if(!ok)CHU_MIS(-8)},rt:"Trong hộp chỉ có trà. Ngươi niêm lại khéo đến mức không ai nhận ra.",rf:"Niêm bị lệch, Ôn thái y nhìn thấy."},
  {n:"Hỏi vì sao phải giấu",c:{},o:()=>35+S.duc/4,w:{tamco:1},sc:1,wx:"{mis} nói thật một phần",l:{duc:-2},lx:"{mis} cho là ngươi cãi, bớt tin; lòng ngươi áy náy",go:(A,ok)=>CHU_MIS(ok?3:-4),rt:"{mis} nói: “Vì ta muốn biết ngươi có hỏi không. Ngươi đã hỏi.”",rf:"{mis} giật lại hộp, sai người khác."}]},
 /* raised twin of c2 (review road-b3-r1 item 4): a tiểu chủ is not sent on errands; {mis} asks her to send someone she trusts */
 c3:{h:"Hộp gấm niêm phong",w:"mis",need:["nsrv"],t:"{mis} sai người mang sang cung ngươi một hộp gấm niêm phong, kèm lời nhắn: “Nhờ muội cho người thân tín đem đến chỗ Ôn thái y, trước giờ Thái y viện đóng cửa. Đừng mở.”",o:[
  {n:"Sai người thân tín đem đi, dặn không mở",c:{bac:-10},w:{duc:2},f:"loyal",wx:"qua phép thử",lx:"tốn bạc thưởng người đi; không biết mình gửi gì",go:()=>CHU_MIS(6),rt:"Ôn thái y nhận hộp, mở ra: chỉ là một gói trà. Ông nhắn về: “Nàng ấy thử tiểu chủ đấy.”"},
  {n:"Lén mở xem trước khi giao",c:{},o:()=>45+S.tamco/4,w:{mat:1},sc:1,wx:"biết hộp chỉ là phép thử",l:{danh:-2},lx:"dấu niêm không còn như cũ, {mis} giận; tiếng ngươi sút",go:(A,ok)=>{if(!ok)CHU_MIS(-8)},rt:"Trong hộp chỉ có trà. Ngươi niêm lại khéo đến mức không ai nhận ra.",rf:"Niêm bị lệch, Ôn thái y nhìn thấy."},
  {n:"Sang hỏi {mis} vì sao phải giấu",c:{suc:-2},o:()=>35+S.duc/4,w:{tamco:1},sc:1,wx:"{mis} nói thật một phần",l:{duc:-2},lx:"đi lại mệt rã; {mis} cho là ngươi cãi, bớt tin, lòng ngươi áy náy",go:(A,ok)=>CHU_MIS(ok?3:-4),rt:"{mis} nói: “Vì ta muốn biết muội có hỏi không. Muội đã hỏi.”",rf:"{mis} lấy lại hộp, sai người khác."}]},
 t1:{h:"Lý do của phép thử",w:"mis",t:"{mis} thú nhận: những việc nguy nàng từng sai ngươi đều là phép thử. “Ta chưa từng định hại ai. Ta chỉ cần biết ai sẽ làm khi được sai.”",o:[
  {n:"Giận vì bị thử",c:{duc:-2},w:{tamco:2},wx:"{mis} biết ngươi không phải con rối",lx:"chủ tớ xa thêm một bước, {mis} bớt tin; lòng ngươi áy náy",go:()=>CHU_MIS(-4),rt:"Ngươi đáp: “Lòng người không phải để thử.”"},
  {n:"Hiểu cho nàng",c:{danh:-2},w:{duc:3},f:"loyal",wx:"{mis} nhẹ lòng",lx:"chấp nhận còn bị thử, người ta bảo ngươi dễ bảo, tiếng sút",go:()=>CHU_MIS(6),rt:"{mis} thở dài: “Ở đây, không thử thì chết.”"},
  {n:"Hỏi gói thuốc thật ra để làm gì",c:{suc:-2},o:()=>40+S.duc/4,w:{mat:1},sc:1,f:"know",wx:"biết gói thuốc là chứng cứ",l:{duc:-1},lx:"{mis} đóng lòng lại, ngươi áy náy vì đã hỏi",rt:"{mis} nói: “Nó là thứ đã giết con ta. Ta giữ để có ngày đặt nó trước mặt kẻ đã làm.”",rf:"{mis} nói: “Chưa đến lúc.”"}]},
 x1:{h:"Phép thử cuối",w:"mis",t:CHU_T("{mis} để gói xạ hương trên bàn rồi ra ngoài. Cửa không khóa. Ngoài sân, người của cung {v} đang đi qua.","{mis} mời ngươi sang uống trà, rồi để gói xạ hương trên bàn và ra ngoài. Cửa không khóa. Ngoài sân, người của cung {v} đang đi qua."),o:[
  {n:"Ngồi canh gói thuốc đến khi {mis} về",c:{suc:-4},o:A=>45+(A.f.loyal?10:0),e:["win","mid"],rt:"{mis} về, thấy ngươi vẫn ngồi đó, mắt đỏ vì thức.",rf:"Ngươi thiếp đi lúc gần sáng. Gói thuốc còn đó, nhưng {mis} thấy ngươi ngủ."},
  {n:"Cất gói thuốc vào chỗ kín",c:{},lx:"tay ngươi chạm vào gói thuốc",o:A=>40+S.tamco/4,e:["win","lose"],rt:"{mis} về, không thấy gói thuốc, nhìn ngươi. Ngươi chỉ chỗ. Nàng gật đầu: “Ngươi nghĩ trước ta một bước.”",rf:"{mis} về, không thấy gói thuốc, cho là ngươi định lấy."},
  {n:"Đem trả gói thuốc cho Thái y viện",c:{duc:-1},o:()=>40+S.duc/5,e:["mid","lose"],go:()=>CHU_MIS(-6),rt:"Thái y viện nhận lại, không hỏi. {mis} mất chứng cứ nhưng không mất mạng.",rf:"Viện phán giữ gói thuốc lại, ghi tên cung {mis}."}]}},
 E:{win:{k:1,tag:"Qua phép thử",w:"mis",t:"{mis} kể hết: xạ hương đã giết đứa con của nàng năm ngoái, và gói này là chứng cứ duy nhất nàng có. Từ nay nàng không thử ngươi nữa.",fx:{danh:2,tamco:1},go:()=>{CHU_MIS(12);return e67merit(5)}},
  mid:{k:0,tag:"Nửa tin nửa ngờ",t:"{mis} tin ngươi giữ được miệng, nhưng chưa tin ngươi giữ được việc.",fx:{duc:1}},
  lose:{k:-1,tag:"Trượt phép thử",w:"mis",t:CHU_T("{mis} cho là ngươi rắp tâm lấy gói thuốc. Nàng chuyển ngươi ra xa, và đổi người giữ chìa khóa.","{mis} cho là ngươi rắp tâm lấy gói thuốc. Nàng đóng cửa cung với ngươi, và đổi chỗ giấu gói thuốc."),fx:{danh:-2},go:()=>CHU_MIS(-12)}}});

rdDef("cnv_chu",8,{t:"Bí mật lộ một nửa",w:"eun",sj:"lời đồn về xạ hương ở cung {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:"Lời đồn đến tai Trung cung: «cung {mis} có xạ hương». Chỉ một nửa sự thật lọt ra, nửa tệ nhất. Trước khi trời sáng, Nội vụ phủ sẽ khám cung theo ý chỉ Trung cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tin báo nửa đêm",w:"eun",if:RDW(1),t:()=>`{mis} đã tin ngươi trọn. Nửa đêm, một tiểu thái giám chạy đến báo: sáng mai Nội vụ phủ khám cung {mis}, ${({hh:S.thDead?"có ý chỉ Hoàng hậu, Hoàng thượng chuẩn":"có ý chỉ Hoàng hậu, Thái hậu chuẩn",th:"theo lệnh Thái hậu",emp:"theo khẩu dụ Hoàng thượng"})[CNV_QM()]}. Gói thuốc vẫn ở chỗ cũ.`,o:[
  {n:"Mang gói thuốc ra khỏi cung",c:{suc:-3},o:()=>40+S.mat*5,w:{tamco:2},sc:1,f:"hide",wx:"gói thuốc không còn ở cung {mis}",l:{danh:-3},lx:"bị bắt đang mang xạ hương, tiếng ngươi sút nặng",rt:CHU_T("Ngươi giấu gói thuốc trong giỏ đồ giặt, đưa ra khỏi cung trước canh tư.","Ngươi bọc gói thuốc trong hộp bánh lễ, sai người thân tín mang ra khỏi cung {mis} trước canh tư."),rf:CHU_T("Thị vệ gác cửa nhìn giỏ đồ rất lâu, nhớ mặt ngươi.","Thị vệ gác cửa mở hộp bánh lễ ra xem, nhớ mặt người của ngươi.")},
  {n:"Giấu vào chỗ không ai khám",c:{},o:()=>45+S.tamco/4,w:{mat:1},sc:1,f:"hide",wx:"gói thuốc vẫn trong tầm tay",l:{danh:-2},lx:"chỗ giấu bị lộ, tiếng ngươi sút",rt:CHU_T("Ngươi nhét gói thuốc vào ruột chiếc gối thêu của {mis}.","Ngươi bảo {mis} khâu gói thuốc vào ruột chiếc gối thêu nàng vẫn gối."),rf:"Chỗ giấu ngươi chọn, Nội vụ phủ nào cũng biết."},
  {n:"Khuyên {mis} tự đem nộp trước",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"clean",wx:"không còn gì để bị khám ra",l:{danh:-2},lx:"{mis} cho là ngươi bỏ nàng, bớt tin; tiếng ngươi sút",go:(A,ok)=>CHU_MIS(ok?2:-6),rt:"{mis} nghĩ rất lâu: “Nếu nộp, ta phải nói nó từ đâu.”",rf:"{mis} hất tay ngươi ra."}]},
 s2:{h:"Ánh mắt cả cung",w:"mis",if:RDW(0),t:"Cả cung đồn có kẻ từng hầu cung {mis} đã khai chuyện xạ hương. Mọi ánh mắt đổ về ngươi, và sáng mai Nội vụ phủ khám cung.",o:[
  {n:"Đến gặp {mis} trước khi ai khác",c:{suc:-2},o:()=>40+S.duc/4,w:{duc:1},sc:1,wx:"{mis} nghe ngươi trước",l:{},lx:"{mis} đã tin lời đồn, bớt tin ngươi; ngươi mệt mà vô ích",go:(A,ok)=>CHU_MIS(ok?6:-4),rt:"{mis} nghe xong, nói: “Không phải ngươi. Ta biết là ai.”",rf:"{mis} không cho ngươi vào."},
  {n:"Tìm ra kẻ thật sự đã nói",c:{bac:-20},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"know",wx:"biết lời đồn đi từ cung {v}",l:{danh:-1},lx:"tốn bạc mà không ra, kẻ ấy biết ngươi dò, tiếng sút",rt:"Lời đồn đi ra từ cung {v}, qua miệng cung nữ áo xanh.",rf:"Ai cũng nói nghe người khác kể."},
  {n:"Xin nghỉ ốm tránh mặt",c:{danh:-2},w:{suc:3},wx:"tránh được bão miệng",lx:"vắng mặt là có tật, tiếng ngươi sút",rt:"Ngươi nằm trong phòng, nghe tiếng bàn tán ngoài sân."}]},
 c1:{h:"Đoàn khám cung",w:"eun",t:CHU_T("Thái giám của {eun} lục từng rương. Một người dừng lại trước chỗ ngươi ngủ.","Đoàn khám cung đến cả cung ngươi, vì ngươi từng là người cung {mis}. Một thái giám của {eun} dừng lại trước rương áo của ngươi."),o:[
  {n:"Đứng yên cho khám",c:{danh:-2},w:{duc:2},wx:"không có gì phải giấu",lx:"đồ riêng bị lật tung trước mặt mọi người, tiếng ngươi sút",rt:"Hắn lật hết, không thấy gì."},
  {n:"Dúi bạc cho thái giám",c:{bac:-30},o:()=>50+S.mat*3,w:{tamco:1},sc:1,wx:"hắn khám qua loa",l:{danh:-2},lx:"hắn báo có người đút lót, tiếng ngươi sút; bạc mất trắng",rt:"Hắn khám qua loa rồi đi.",rf:"Hắn cầm bạc, ghi luôn vào sổ: «có người lo lót»."},
  {n:"Hỏi có lệnh bằng giấy chưa",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"đoàn khám phải giữ phép",l:{danh:-2},lx:"bị cho là chống lệnh, tiếng ngươi sút",rt:"Hắn lúng túng, chỉ khám lướt.",rf:"Hắn đọc lệnh to cho cả sân nghe."}]},
 c2:{h:"{v} châm dầu",w:"v",need:["v"],t:()=>`{v} đến thỉnh an ${CHU_Q()}, buột miệng: “Nghe nói người trực đêm ở cung {mis} biết hết.”`,o:[
  {n:"Xin vào thỉnh an cùng lúc, đối mặt",c:{suc:-3},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"lời {v} bị chặn ngay",l:{danh:-2},lx:"bị cho là hỗn, tiếng ngươi sút; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?8:5)},rt:"Ngươi thưa đúng một câu, {v} không đáp được.",rf:"Ngươi bị cho lui ra ngoài cửa."},
  {n:"Nhờ người nói đỡ",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"có người đỡ lời",l:{danh:-1},lx:"người nói đỡ cũng bị nghi, đồn ngược về ngươi, tiếng sút; bạc mất trắng",rt:"Một nữ quan cũ nói: người trực đêm đâu biết gì.",rf:"Không ai dám mở miệng."},
  {n:"Để mặc {v} nói",c:{danh:-2},w:{duc:1},wx:"không bị kéo vào cãi",lx:"lời {v} ở lại trong tai Trung cung, {v} thêm oán; tiếng ngươi sút",go:A=>{rdOan(A,"v",3)},rt:"Ngươi không làm gì."}]},
 t1:{h:"Trung cung cho gọi",w:"hh",t:"Hoàng hậu cho gọi ngươi riêng: “Bổn cung chỉ hỏi một câu: xạ hương trong cung {mis} là để hại ai?”",o:[
  {n:"Thưa: không để hại ai",c:{},o:()=>40+CNV_QV()/4,w:{hh:3},sc:1,wx:"Hoàng hậu ngờ có ẩn tình",l:{hh:-3},lx:"Hoàng hậu cho là ngươi bao che, không vui",rt:"Hoàng hậu nhìn ngươi rất lâu: “Vậy là để giữ.”",rf:"Hoàng hậu nói: “Ai giấu xạ hương cũng nói thế.”"},
  {n:"Thưa: không biết",c:{hh:-2},w:{tamco:1},wx:"không lộ thêm một chữ",lx:"Hoàng hậu không vui",rt:"Hoàng hậu cho lui."},
  {n:"Xin Hoàng hậu cho thêm thời gian",c:{suc:-2},o:()=>35+S.duc/4,w:{hh:2},sc:1,wx:"có thời gian tìm chứng",l:{hh:-2},lx:"bị cho là trì hoãn, Hoàng hậu không vui; ngươi mệt rã",rt:"Hoàng hậu cho ba ngày.",rf:"Hoàng hậu nói: “Trời sáng là khám.”"}]},
 x1:{h:"Trời sáng",w:"eun",t:"Đoàn khám cung đến rương cuối cùng. Gói thuốc ở đâu, chỉ ngươi và {mis} biết.",o:[
  {n:"Đánh lạc hướng đoàn khám",c:{suc:-5},o:A=>40+(A.f.hide?10:0)+S.tamco/5,e:["win","lose"],rt:"Đoàn khám về tay không.",rf:"Gói thuốc lộ ra giữa sân."},
  {n:"Để {mis} tự nộp, nói rõ gốc gác",c:{},lx:"{mis} phải kể nỗi đau của mình, ngươi bị kéo vào tội",o:A=>40+(A.f.clean?10:0)+S.duc/5,e:["mid","lose"],rt:()=>`${CHU_Q()} nghe nửa đầu câu chuyện, cho {mis} thời gian.`,rf:"Không ai tin nửa sau câu chuyện."},
  {n:"Nhận gói thuốc là của mình",c:{danh:-4},w:{duc:3},e:"take",lx:"ngươi mang tiếng giữ xạ hương, tiếng sút nặng",rt:"Ngươi bước ra, quỳ xuống: “Gói ấy là của người này.”"}]}},
 E:{win:{k:1,tag:"Đoàn khám về tay không",w:"mis",t:"Nội vụ phủ không tìm thấy gì. Lời đồn chết dần. {mis} biết đêm ấy ai đã cứu nàng.",fx:{danh:3},go:A=>{rdOan(A,"v",6);CHU_MIS(10);return e67merit(4)}},
  mid:{k:0,tag:"Nửa sự thật trước Trung cung",t:"Trung cung biết có gói thuốc, biết nó ra từ cung {v}, nhưng chưa biết vì sao nó ở cung {mis}.",fx:{mat:1}},
  take:{k:0,tag:"Gánh thay chủ",w:"mis",t:CHU_T("Ngươi nhận gói thuốc là của mình, bị phạt quỳ ba ngày ở sân Nội vụ phủ. {mis} đứng sau bình phong nhìn, không nói gì, nhưng đêm ấy sai người mang thuốc xuống cho ngươi.","Ngươi nhận gói thuốc là của mình. Nội vụ phủ tâu lên, Hoàng thượng phê cấm túc ngươi một tháng. {mis} sai người lén mang trà sang, kèm một chữ: «Nợ»."),fx:{danh:-2,duc:2},go:()=>CHU_MIS(15)},
  lose:{k:-1,tag:"Gói thuốc bị tìm ra",w:"eun",t:"Gói xạ hương lộ ra giữa sân. Nội vụ phủ tâu lên, Hoàng thượng truyền cấm túc {mis} chờ tra, còn ngươi bị giữ lại để hỏi.",fx:{danh:-4,suc:-5},go:()=>CHU_MIS(-6)}}});

rdDef("cnv_chu",9,{t:"Giữ hay nói",w:"hh",sj:"lời khai về {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:"Trung cung đòi một lời khai. Nói thật thì {mis} lộ cả điều nàng giấu lẫn điều nàng chịu; giữ kín thì ngươi gánh. Ôn thái y là người duy nhất có thể nói thay ngươi, và ông đang muốn đi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Gọi lúc canh hai",w:"hh",if:RDW(1),t:()=>`Đoàn khám cung về tay không, nhưng ${CHU_Q()} không bỏ. Lúc canh hai, người của Trung cung đến gọi ngươi đi, chỉ một mình.`,o:[
  {n:"Đi ngay, không báo {mis}",c:{danh:-2},w:{duc:1},wx:"không ai nói ngươi thông đồng",lx:"{mis} biết ngươi đi một mình, bớt tin; tiếng ngươi sút",go:()=>CHU_MIS(-2),rt:"Ngươi khoác áo, theo đèn lồng đi."},
  {n:"Nhắn {mis} một lời trước khi đi",c:{suc:-2},o:()=>45+S.mat*4,w:{tamco:1},sc:1,wx:"{mis} biết ngươi đi đâu",l:{danh:-1},lx:"người nhắn bị bắt gặp, đồn ngươi thông đồng, tiếng sút; ngươi mệt rã",go:(A,ok)=>{if(ok)CHU_MIS(4)},rt:"{mis} nhắn lại: “Nói gì cũng được, đừng nói về đứa con.”",rf:"Người của Trung cung thấy ngươi dừng lại thì thầm."},
  {n:"Xin đến vào sáng mai",c:{},o:()=>35+S.danh/4,w:{suc:2},sc:1,wx:"có một đêm nghĩ",l:{hh:-3},lx:"Trung cung phật ý, không vui",rt:"Người của Trung cung đồng ý.",rf:"Họ đứng chờ ở cửa, không đi."}]},
 s2:{h:"Lời nhắn của {mis}",w:"mis",if:RDW(0),t:"{mis} bị giữ trong cung, không ai được ra vào. Nàng nhờ người nhắn ngươi: “Nếu bị hỏi, cứ nói thật về cung {v}. Đừng nói về ta.”",o:[
  {n:"Nhận lời, làm như nàng dặn",c:{danh:-2},w:{duc:1},f:"loyal",wx:"{mis} yên lòng",lx:"chỉ nói được nửa sự thật, người ta nghi ngươi giấu, tiếng sút",go:()=>CHU_MIS(4),rt:"Ngươi gật đầu với người đưa tin."},
  {n:"Nhắn lại: phải nói cả hai",c:{},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"{mis} nghĩ lại",l:{danh:-2},lx:"{mis} cho là ngươi đã ngả, bớt tin; tiếng ngươi sút",go:(A,ok)=>CHU_MIS(ok?2:-5),rt:"{mis} nhắn: “Vậy thì nói, nhưng chờ Ôn thái y.”",rf:"{mis} không nhắn lại nữa."},
  {n:"Tìm cách vào gặp nàng",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"nghe tận miệng nàng",l:{danh:-2},lx:"bị bắt vì vào nơi cấm, tiếng ngươi sút; bạc mất trắng",rt:"Ngươi vào được nửa canh giờ.",rf:"Thị vệ giữ ngươi ở cửa."}]},
 c1:{h:"Ôn thái y muốn đi",w:"doc",t:"Ôn thái y xin cáo bệnh về quê, đi trước rằm. Nếu ông đi, không ai còn nói được gói thuốc ra khỏi viện thế nào.",o:[
  {n:"Đến xin ông ở lại",c:{suc:-3},o:A=>40+(A.f.doc?10:0)+S.duc/4,w:{duc:2},sc:1,f:"doc",wx:"ông ở lại thêm ít ngày",l:{duc:-1},lx:"ông sợ, vẫn đi; lòng ngươi áy náy vì giữ không nổi ông",rt:"Ông thở dài: “Thêm mười ngày. Không hơn.”",rf:"Ông đã thu xếp hòm xiểng."},
  {n:"Xin ông viết lời khai trước khi đi",c:{bac:-20},o:()=>45+S.tamco/4,w:{mat:1},sc:1,f:"know",wx:"có lời khai trên giấy",l:{danh:-1},lx:"ông không dám ký tên, đồn ra ngươi ép ông, tiếng sút; bạc mất trắng",rt:"Ông viết, ký, đóng dấu riêng.",rf:"Ông viết nhưng không ký."},
  {n:"Để ông đi",c:{danh:-2},w:{duc:2},wx:"ông giữ được mạng",lx:"mất người làm chứng, người ta bảo ngươi bỏ người tốt, tiếng sút",rt:"Ngươi tiễn ông đến cửa Tây."}]},
 c2:{h:"Hộp trâm của {v}",w:"v",need:["v"],t:"{v} gửi ngươi một hộp trâm vàng: “Chuyện ở cung {mis} chẳng liên quan đến cung ta, phải không?”",o:[
  {n:"Nhận hộp trâm",c:{duc:-3},w:{bac:40},wx:"{v} tưởng ngươi đã im",lx:"cầm của {v} là mắc nợ {v}, lòng ngươi áy náy",go:A=>{rdRel(A,"v",5)},rt:"Ngươi cất hộp trâm dưới đáy rương."},
  {n:"Trả nguyên hộp",c:{danh:-2},w:{duc:2},wx:"tay sạch",lx:"{v} biết ngươi không mua được, thêm oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",6)},rt:"Hộp trâm về lại cung {v}, niêm còn nguyên."},
  {n:"Nhận rồi trình lên Trung cung",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"{v} lộ ý mua chuộc",l:{danh:-2},lx:"bị cho là tham rồi đổ vạ, tiếng ngươi sút; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"Trung cung giữ hộp trâm làm chứng.",rf:"{v} nói đó là quà thưởng, không có ý gì."}]},
 t1:{h:"Điều {mis} chưa nói",w:"mis",t:"{mis} kể nốt: gói xạ hương ấy nàng lấy trộm từ tay người của cung {v}, trên đường đến bếp một phi tần đang mang thai. Nàng đốt thư Ôn thái y để giữ mạng ông. Nàng không nói ra, vì nói ra là phải kể mình đã mất con thế nào.",o:[
  {n:"Khuyên nàng nói hết",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"clean",wx:"{mis} chịu nói",l:{},lx:"{mis} sợ, bớt tin ngươi; ngươi mệt mà vô ích",go:(A,ok)=>CHU_MIS(ok?4:-3),rt:"{mis} gật đầu: “Nếu ngươi đứng cạnh ta.”",rf:"{mis} lắc đầu, khóc."},
  {n:"Hứa giữ đến cùng",c:{danh:-2},w:{duc:1},f:"loyal",wx:"{mis} tin ngươi trọn",lx:"việc thiện của nàng sẽ không ai biết, người ta nghi ngươi bao che, tiếng sút",go:()=>CHU_MIS(8),rt:"{mis} nắm tay ngươi, không nói gì."},
  {n:"Hỏi phi tần mang thai năm ấy là ai",c:{},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"save",wx:"có thêm một người làm chứng",l:{danh:-2},lx:"{mis} sợ kéo người khác vào, trách ngươi; tiếng ngươi sút",rt:"Nàng là một phi tần ở Tây cung; đứa trẻ năm ấy nay đã biết đi.",rf:"{mis} không nói."}]},
 x1:{h:"Lời khai",w:"hh",t:()=>`Đêm ấy ${CHU_Q()} hỏi lần cuối. Ngươi nói gì, {mis} sống theo lời ấy.`,o:[
  {n:"Giữ kín, thưa không biết gì",c:{suc:-4},o:A=>40+(A.f.loyal?15:0),e:["win","lose"],rt:()=>({hh:"Không có lời khai, Trung cung không có gì để tâu lên Hoàng thượng.",th:"Không có lời khai, Thái hậu không có gì để nói với Hoàng thượng.",emp:"Không có lời khai, Hoàng thượng không có cớ gì để xử {mis}."})[CNV_QM()],rf:"Trung cung không tin ngươi, cho người canh giữ."},
  {n:"Kể hết, cả điều tốt lẫn điều xấu",c:{tamco:-2},lx:"điều {mis} giấu không còn là của nàng, lá bài trong tay ngươi cũng mất; vụ chỉ dừng ở giữa",o:A=>35+(A.f.know?10:0)+(A.f.save?10:0)+S.duc/5,e:["win","mid"],rt:"Trung cung nghe đến chuyện phi tần mang thai thì đặt chén trà xuống.",rf:"Trung cung nghe hết, nhưng chưa tin nửa sau."},
  {n:"Khai {mis} giấu xạ hương, không nói vì sao",c:{duc:-4},w:{hh:6},e:"tell",lx:"{mis} sẽ không tha; lòng ngươi cắn rứt vì khai chủ",rt:"Ngươi khai đúng một nửa. Nửa kia ngươi giữ cho mình."}]}},
 E:{win:{k:1,tag:"Bí mật còn trong tay ngươi",w:"mis",t:"Lời khai của ngươi giữ {mis} đứng vững qua đêm ấy. Trung cung biết có ẩn tình, và biết ngươi là người nắm nó.",fx:{danh:3,tamco:1},go:()=>CHU_MIS(10)},
  mid:{k:0,tag:"Sự thật nằm trên bàn Trung cung",t:()=>({hh:"Cả câu chuyện đã được kể. Trung cung chưa tin hết, nên chưa tâu lên xin xử ai.",th:"Cả câu chuyện đã được kể. Thái hậu chưa tin hết, nên chưa bảo Hoàng thượng xử ai.",emp:"Cả câu chuyện đã được kể. Hoàng thượng chưa tin hết, nên chưa xử ai."})[CNV_QM()],fx:{duc:3}},
  tell:{k:0,tag:"Đứng về phía Trung cung",w:"hh",t:"Ngươi khai nửa xấu của sự thật. Trung cung nhớ ngươi là người biết điều. {mis} nhớ ngươi là người đã bán nàng.",fx:{danh:2},go:()=>CHU_MIS(-15)},
  lose:{k:-1,tag:"Lời khai bị nghi",t:()=>({hh:"Trung cung cho là ngươi và {mis} thông đồng, tâu lên; Hoàng thượng truyền canh giữ cả hai, chờ Thận hình ty.",th:"Thái hậu cho là ngươi và {mis} thông đồng, nói với Hoàng thượng; ngài truyền canh giữ cả hai, chờ Thận hình ty.",emp:"Hoàng thượng cho là ngươi và {mis} thông đồng, truyền canh giữ cả hai, chờ Thận hình ty."})[CNV_QM()],fx:{danh:-4},go:()=>CHU_MIS(3)}}});

rdDef("cnv_chu",10,{t:"Đêm tra hỏi",w:"eun",sj:"đêm tra hỏi ở Thận hình ty",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:CHU_T("Vụ xạ hương được giao cho Thận hình ty. Đêm nay mọi người từng hầu cung {mis} bị gọi đi hỏi, từng người một. {eun} ngồi ghế trên, người của {v} đứng sau bình phong.","Vụ xạ hương được giao cho Thận hình ty. Đêm nay mọi người từng hầu cung {mis} bị gọi đi hỏi, từng người một. Ngươi đã được phong, Thận hình ty không được hỏi ngươi tận mặt, chỉ được gửi câu hỏi đến cung ngươi; nhưng tỳ nữ của ngươi thì bị gọi đi."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Roi của Thận hình ty",w:"eun",if:RDW(1),t:CHU_T("Lời ngươi đã giữ được {mis} qua một đêm. Nhưng {v} xin giao vụ cho Thận hình ty, nơi lời khai được lấy bằng roi. Tên ngươi là tên thứ ba trong danh sách.","Lời ngươi đã giữ được {mis} qua một đêm. Nhưng {v} xin giao vụ cho Thận hình ty. Ngươi nay là tiểu chủ, Thận hình ty không được hỏi ngươi tận mặt. {eun} sai người mang câu hỏi đến cung ngươi, đứng ngoài cửa chờ lời đáp, còn tỳ nữ thân cận của ngươi bị gọi đi hỏi thay."),o:[
  {n:"Sai người dò xem ai bị hỏi trước",if:CHU_R,c:{suc:-2},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"biết lời khai của người khác",l:{danh:-1},lx:"người ngươi sai bị đuổi về, cả Thận hình ty biết cung ngươi dò, tiếng ngươi sút",rt:"Tỳ nữ ngươi sai đi về kể: cung nữ áo xanh đã khai trước.",rf:"Người ngươi sai bị thị vệ đuổi về giữa đường."},
  {n:"Đến sớm, xem ai bị hỏi trước",if:()=>!CHU_R(),c:{suc:-2},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"biết lời khai của người khác",l:{danh:-1},lx:"bị đuổi ra, cả Thận hình ty biết ngươi dò, tiếng ngươi sút",rt:"Ngươi nghe được cung nữ áo xanh đã khai trước.",rf:"Thị vệ đóng cửa trước mặt ngươi."},
  {n:"Lo bạc cho người canh",c:{bac:-30},w:{suc:2},wx:"được ngồi chờ chỗ ấm",lx:"bạc trong hộp vơi đi một khoản",rt:CHU_T("Người canh mang cho ngươi chén nước nóng.","Người canh nhận bạc, hứa không làm khó tỳ nữ của ngươi. Đêm ấy ngươi chợp mắt được.")},
  {n:"Không lo lót gì",c:{danh:-2},w:{duc:2},wx:"không ai bắt được lỗi",lx:"chẳng ai nể, người ta bảo ngươi không biết điều, tiếng ngươi sút",rt:CHU_T("Ngươi ngồi chờ trong lạnh đến canh ba.","Ngươi ngồi chờ tin đến canh ba.")}]},
 s2:{h:"Gọi tên đầu tiên",w:"eun",if:RDW(0),t:CHU_T("Từ sau lời khai đêm trước, ai cũng tránh ngươi. Đêm nay Thận hình ty gọi tên ngươi đầu tiên.","Từ sau lời khai đêm trước, ai cũng tránh ngươi. Đêm nay câu hỏi đầu tiên của Thận hình ty được mang đến cung ngươi, và tỳ nữ thân cận của ngươi bị gọi đi hỏi trước."),o:[
  {n:"Đáp ngay, giữ bình tĩnh",c:{suc:-3},w:{duc:2},wx:"không để lộ sợ hãi",lx:"đáp trước là bị soi kỹ nhất, ngươi kiệt sức",rt:CHU_T("Ngươi bước vào, quỳ xuống, chờ.","Ngươi đáp từng câu qua người mang lời, không chậm một khắc.")},
  {n:"Xin {mis} gửi người làm chứng",c:{},o:()=>35+S.duc/4,w:{tamco:1},sc:1,wx:"có người làm chứng cho ngươi",l:{duc:-2},lx:"{mis} không dám, ngươi thấy mình bị bỏ, lòng nặng trĩu",go:(A,ok)=>{if(ok)CHU_MIS(3)},rt:CHU_T("{mis} gửi một ma ma già đi theo.","{mis} gửi một ma ma già đến đứng nghe cùng."),rf:"{mis} im lặng."},
  {n:"Dúi bạc để được hỏi sau",c:{bac:-40},o:()=>50+S.mat*3,w:{mat:1},sc:1,wx:"biết người khác khai gì trước",l:{danh:-2},lx:"bị ghi là lo lót, tiếng ngươi sút; bạc mất trắng",rt:"Tên ngươi bị dời xuống cuối.",rf:"Thái giám nhận bạc rồi vẫn gọi ngươi."}]},
 c1:{h:"Cung nữ áo xanh khai",w:"maid",t:"Cung nữ áo xanh của cung {v} khai: đêm ấy nàng thấy ngươi cầm gói thuốc đi về phía bếp một phi tần khác.",o:[
  {n:"Bác lời nàng bằng giờ trực",c:{},o:()=>40+S.mat*5,w:{danh:2},sc:1,wx:"lời khai của nàng sai giờ",l:{danh:-3},lx:"giờ trực bị sửa, ngươi thành kẻ nói dối, tiếng sút nặng",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Sổ trực ghi giờ ấy ngươi đang ở phòng {mis}.",rf:"Trang sổ trực đêm ấy đã bị xé."},
  {n:"Hỏi nàng ai dạy nói",c:{suc:-3},o:()=>35+S.tamco/3,w:{tamco:2},sc:1,wx:"nàng run, khai sai thêm",l:{danh:-2},lx:"bị cho là ép nhân chứng, tiếng ngươi sút",rt:"Nàng nhìn về phía bình phong, nơi người của {v} đứng.",rf:CHU_T("Nàng khóc to, {eun} quát ngươi im.","Nàng khóc to, {eun} xin ngươi thôi hỏi.")},
  {n:"Im lặng, chờ người khác bác",c:{danh:-2},w:{duc:1},wx:"không tự làm rối",lx:"lời nàng ở lại trong hồ sơ, tiếng ngươi sút",rt:"Ngươi chỉ cúi đầu."}]},
 c2:{h:"Ôn thái y bị giữ",w:"doc",t:"Ôn thái y bị giữ ở Thận hình ty. Ông già yếu, không chịu nổi roi.",o:[
  {n:"Lo bạc cho ông bớt roi",c:{bac:-40},w:{duc:3},wx:"ông còn sức để khai",lx:"bạc trong hộp vơi đi một khoản",rt:"Người coi ngục nhận bạc, cho ông nằm chỗ khô."},
  {n:"Xin {eun} cho gặp ông",c:{suc:-2},o:()=>40+S.danh/4,w:{mat:1},sc:1,f:"know",wx:"nghe ông dặn lời cuối",l:{danh:-2},lx:"bị nghi thông cung, tiếng ngươi sút",rt:CHU_T("Ông thì thầm: “Lời khai của ta ở chỗ {mis}. Ta đã viết từ năm ngoái.”","Người ngươi sai vào gặp ông mang về lời dặn: “Lời khai của ta ở chỗ {mis}. Ta đã viết từ năm ngoái.”"),rf:"{eun} lắc đầu."},
  {n:"Mặc ông tự khai",c:{duc:-2},w:{tamco:1},wx:"không dính tay",lx:"ông có thể khai sai vì sợ, lòng ngươi cắn rứt",rt:"Ngươi không đến."}]},
 t1:{h:"{eun} ra giá",w:"eun",t:"{eun} nói khẽ: “Vụ này lên đến Hoàng thượng là có người mất đầu. Ta khép được nó, nếu có người nhận một tội nhỏ: giữ thuốc không báo.”",o:[
  {n:"Nhận tội nhỏ thay chủ",c:{danh:-3},w:{duc:2},f:"loyal",wx:"{mis} thoát",lx:"tên ngươi vào sổ tội, tiếng ngươi sút",go:()=>CHU_MIS(8),rt:"{eun} gật đầu, ghi một dòng."},
  {n:"Không nhận, đòi xét đến cùng",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"clean",wx:"{eun} không dám ép",l:{danh:-1},lx:"{eun} ghi nhớ ngươi, đồn ngươi cứng đầu, tiếng sút",rt:"{eun} cười: “Gan đấy.”",rf:"{eun} nói: “Vậy thì cứ hỏi tiếp.”"},
  {n:"Đưa bạc cho y khép vụ",c:{bac:-60},o:()=>45+S.mat*3,w:{tamco:1},sc:1,wx:"vụ được khép êm",l:{danh:-3},lx:"y lấy bạc mà không khép, tiếng ngươi sút; bạc mất trắng",rt:"{eun} cất bạc, gật đầu.",rf:"{eun} cất bạc, rồi vẫn hỏi tiếp."}]},
 x1:{h:"Đối chứng",w:"eun",t:()=>CHU_R()?`Canh tư, {eun} mang lời khai của cung nữ áo xanh đến cung ngươi, đứng ngoài cửa hỏi từng câu, có người của {v} và người của ${CHU_Q()} đứng nghe. Lời ngươi đáp đêm nay sẽ vào hồ sơ.`:`Canh tư, {eun} cho ngươi đứng đối mặt cung nữ áo xanh, trước người của {v} và người của ${CHU_Q()}.`,o:[
  {n:"Đưa sổ xuất kho và lời Ôn thái y",c:{suc:-4},o:A=>35+(A.f.know?10:0)+S.mat*4,e:["win","lose"],rt:"Sổ ghi tên cung {v}. Cung nữ áo xanh quỳ sụp.",rf:"Lời Ôn thái y không có dấu, {eun} gạt đi."},
  {n:"Giữ một lời: không biết",c:{},lx:"cung {v} không bị đụng đến, vụ chỉ treo lại",o:A=>45+S.tamco/5,e:["mid","lose"],rt:"Không ai bẻ được lời ngươi. Vụ treo lại.",rf:"Cung nữ áo xanh khai thêm, ngươi không có gì để bác."},
  {n:"Xin dâng chuyện lên Hoàng thượng",c:{danh:-3},lx:"đem chuyện hậu cung lên ngự án, người ta bảo ngươi làm to chuyện, tiếng sút; hỏng thì vụ chỉ treo lại",o:A=>35+CHU_E()/4+S.danh/6,e:["win","mid"],go:(A,ok)=>ok?CHU_NT(9):"",rt:"Hoàng thượng nghe chuyện, cho đòi hồ sơ lên ngự án.",rf:"Lời xin bị giữ lại ở Nội vụ phủ."}]}},
 E:{win:{k:1,tag:"Lời khai lật ngược",w:"eun",t:"Mũi tra hỏi quay về cung {v}. Cung nữ áo xanh khai ra ai đã sai nàng. {mis} được nới cấm túc.",fx:{danh:4},go:A=>{rdOan(A,"v",10);CHU_MIS(8);return e67merit(5)}},
  mid:{k:0,tag:"Vụ án treo lại",t:"Không ai bị kết tội, không ai được rửa. Hồ sơ nằm trên bàn {eun}, chờ một tay đẩy.",fx:{tamco:1}},
  lose:{k:-1,tag:"{mis} bị kết tội giữ xạ hương",w:"mis",t:"Thận hình ty tâu lên, Hoàng thượng phê: {mis} có tội giữ xạ hương không báo, cấm túc chờ xét. Ngươi bị ghi tên là người biết mà không nói.",fx:{danh:-4},go:()=>CHU_MIS(-4)}}});

rdDef("cnv_chu",11,{t:"Dao hai lưỡi",w:"mis",sj:"bí mật của {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:"Vụ xạ hương đi đến hồi cuối. Bí mật của {mis} sẽ thành ơn hay thành tội, và ngươi đứng ở đâu khi nó ngã xuống. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Trước khi trời sáng",w:"mis",if:RDW(1),t:CHU_T("Thận hình ty đã quay mũi về cung {v}. {mis} được nới cấm túc, đến tìm ngươi ở phòng kẻ hầu lúc trời chưa sáng: “Ngày mai Hoàng thượng hỏi. Ta muốn ngươi đứng cạnh ta.”","Thận hình ty đã quay mũi về cung {v}. {mis} được nới cấm túc, đến cung ngươi lúc trời chưa sáng: “Ngày mai Hoàng thượng hỏi. Ta muốn muội đứng cạnh ta.”"),o:[
  {n:"Nhận lời đứng cạnh nàng",c:{danh:-2},w:{duc:2},f:"loyal",wx:"{mis} vững lòng",lx:"buộc mình vào số phận nàng, người ta xì xào, tiếng sút",go:()=>CHU_MIS(6),rt:"{mis} siết tay ngươi."},
  {n:"Xin đứng riêng, nói riêng",c:{duc:-2},w:{tamco:2},f:"self",wx:"giữ đường lui cho mình",lx:"{mis} buồn, bớt tin; lòng ngươi áy náy",go:()=>CHU_MIS(-3),rt:"{mis} gật đầu chậm: “Ừ. Ngươi cũng phải sống.”"},
  {n:"Hỏi nàng muốn nói đến đâu",c:{suc:-2},o:()=>40+S.duc/4,w:{mat:1},sc:1,wx:"biết nàng dám nói hết",l:{duc:-1},lx:"nàng còn do dự, trách ngươi ép; lòng ngươi áy náy",rt:"{mis} nói: “Đến đứa con. Hết.”",rf:"{mis} nói: “Ta chưa biết.”"}]},
 s2:{h:"Cây trâm gãy",w:"mis",if:RDW(0),t:"{mis} vẫn bị giam lỏng. Nàng nhờ người mang đến cho ngươi một cây trâm gãy đôi: “Còn một việc ta chỉ nhờ được ngươi.”",o:[
  {n:"Nhận trâm, nghe việc",c:{danh:-2},w:{duc:2},f:"loyal",wx:"{mis} còn tin ngươi",lx:"nhận là phải làm, dính thêm vào vụ án, tiếng sút",go:()=>CHU_MIS(5),rt:"Việc ấy là tìm người mẹ năm xưa ở Tây cung."},
  {n:"Gửi trả trâm",c:{duc:-2},w:{tamco:1},f:"self",wx:"rút chân khỏi vụ án",lx:"{mis} chỉ còn một mình, bớt tin ngươi; lòng ngươi áy náy",go:()=>CHU_MIS(-6),rt:"Ngươi gói trâm lại, gửi trả."},
  {n:"Đến tận nơi gặp nàng",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"nghe tận miệng nàng",l:{danh:-2},lx:"bị bắt vì vào nơi cấm, tiếng ngươi sút; bạc mất trắng",rt:"{mis} gầy rộc, nhưng mắt vẫn sáng.",rf:"Thị vệ giữ ngươi lại ở cửa."}]},
 c1:{h:"Người mẹ ở Tây cung",w:"me",t:"Phi tần ở Tây cung năm ấy nay đã có một đứa con biết đi. Nàng chưa từng biết có gói xạ hương trên đường đến bếp mình.",o:[
  {n:"Xin nàng làm chứng",c:{suc:-3},o:()=>35+S.danh/4,w:{danh:2},sc:1,f:"good",wx:"có người được cứu đứng ra",l:{danh:-1},lx:"nàng sợ, đóng cửa, đồn ngươi kéo người vào vụ án, tiếng sút",rt:"Nàng ôm con, nói: “Ta sẽ đến.”",rf:"Nàng sai người đóng cổng."},
  {n:"Kể cho nàng biết ai đã cứu con nàng",c:{danh:-2},w:{duc:3},f:"good",wx:"nàng mang ơn {mis}",lx:"thêm một người biết chuyện, lời ra tiếng vào, tiếng sút",rt:"Nàng khóc, gửi tặng {mis} một chiếc khóa vàng."},
  {n:"Không kéo nàng vào",c:{danh:-2},w:{duc:1},wx:"mẹ con nàng được yên",lx:"mất một nhân chứng, người ta bảo ngươi bỏ cuộc, tiếng sút",rt:"Ngươi đứng nhìn đứa trẻ chơi trong sân, rồi đi."}]},
 c2:{h:"{v} cầu hòa",w:"v",need:["v"],t:"{v} sai người đến: “Dừng ở đây. Cung ta sẽ không bao giờ đụng đến ngươi nữa.”",o:[
  {n:"Nhận lời giảng hòa",c:{duc:-2},w:{suc:3},wx:"một kẻ thù bớt đi",lx:"cái chết của đứa trẻ năm ấy không ai trả, lòng ngươi cắn rứt; mắc nợ {v}",go:A=>{rdRel(A,"v",10)},rt:"{v} gửi thêm một hộp trà."},
  {n:"Từ chối, giữ đường cũ",c:{danh:-2},w:{duc:2},wx:"không bán sự thật",lx:"{v} dốc hết sức chống lại, thêm oán; tiếng ngươi sút",go:A=>{rdOan(A,"v",8)},rt:"Ngươi để người đưa tin đứng chờ ở cửa đến tối."},
  {n:"Giả nhận để {v} lơi tay",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{v} không chuẩn bị gì cho ngày mai",l:{danh:-2},lx:"{v} biết bị lừa, oán nặng; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{v} tin, cho người canh về nghỉ.",rf:"{v} cười: “Ngươi tưởng ta ngốc?”"}]},
 t1:{h:"Câu hỏi của {mis}",w:"mis",t:"{mis} hỏi: “Nếu chỉ một người được đứng dậy sau chuyện này, ngươi muốn là ai?”",o:[
  {n:"Đáp: là chủ nhân",c:{danh:-2},w:{duc:2},f:"loyal",wx:"{mis} nhớ suốt đời",lx:"đặt mình xuống dưới, tiếng ngươi sút",go:()=>CHU_MIS(6),rt:"{mis} quay đi lau mắt."},
  {n:"Đáp: là cả hai",c:{duc:-2},w:{tamco:1},f:"both",wx:"{mis} thấy ngươi không bỏ ai",lx:"đòi cả hai là có thể mất cả hai, lòng ngươi bất an",go:()=>CHU_MIS(3),rt:"{mis} cười: “Tham thật.”"},
  {n:"Đáp: là chính mình",c:{duc:-2},w:{tamco:2},f:"self",wx:"nói thật lòng",lx:"{mis} lạnh đi, bớt tin; lòng ngươi áy náy",go:()=>CHU_MIS(-5),rt:"{mis} gật đầu: “Ít nhất ngươi không nói dối.”"}]},
 x1:{h:"Trước ngự án",w:"emp",t:"Hồ sơ vụ xạ hương lên đến ngự án. Sau buổi chầu, Hoàng thượng cho gọi {mis} và ngươi đến Ngự thư phòng. Phán xử là việc của ngài; điều ngươi có là lời mình nói.",o:[
  {n:"Nói hết, xin công cho {mis}",c:{suc:-5},o:A=>35+(A.f.loyal?10:0)+(A.f.good?10:0)+S.duc/6,e:["win","both"],rt:"Hoàng thượng nghe đến đứa trẻ ở Tây cung thì đứng dậy.",rf:"Hoàng thượng nghe, nhưng không có chứng, ngài chỉ thở dài."},
  {n:"Nói phần mình, để {mis} tự gánh phần nàng",c:{},lx:"{mis} đứng một mình, chủ tớ cùng lùi một bước",o:A=>40+(A.f.self?10:0)+S.tamco/5+CHU_E()/6,e:["rise","both"],rt:"Hoàng thượng nhớ ngươi là người nói thật đầu tiên.",rf:"Lời ngươi lẫn vào lời mọi người."},
  {n:"Xin Hoàng thượng khép vụ, không truy",c:{},w:{duc:3},e:"both",lx:"không ai được rửa tiếng, cả hai cùng lùi một bước",rt:"Hoàng thượng phẩy tay: “Khép.”"}]}},
 E:{win:{k:1,tag:"Tâm phúc trọn đời của {mis}",w:"mis",t:"Hoàng thượng biết gói xạ hương năm ấy đã cứu một long thai. {mis} được rửa tiếng, cung {v} bị phạt cấm túc. Từ nay {mis} gọi ngươi là người nhà, và đi đâu cũng nhắc tên ngươi trước mặt Hoàng thượng.",fx:{danh:8,duc:3},go:A=>{rdOan(A,"v",12);CHU_MIS(25);const r=CHU_NT(15);return [r,e67merit(8)].filter(Boolean).join(" ")}},
  rise:{k:0,tag:"{mis} ngã, ngươi đứng lên",w:"emp",t:"{mis} bị phạt bổng một năm vì giữ xạ hương không báo. Hoàng thượng nhớ ngươi là người nói thật trước mặt ngài. Ngươi bước lên, còn {mis} ở lại phía sau, nhìn theo.",fx:{danh:5},go:()=>{CHU_MIS(-20);return CHU_NT(18)}},
  both:{k:-1,tag:"Chủ tớ cùng lùi một bước",t:"Vụ án khép lại, không ai được rửa tiếng. {mis} bị phạt bổng, ngươi bị Hoàng thượng ghi một lỗi nhỏ. Hai người lặng lẽ sống tiếp, mỗi người mang một nửa bí mật.",fx:{danh:-4},go:()=>CHU_MIS(5)}}});
RD97L.push({a:"cnv_chu_11",tag:"Việc thiện trong bóng tối",w:"emp",p:.12,n:"Xin Hoàng thượng cho gọi người mẹ ở Tây cung đến",c:{suc:-4},
 path:["Kể cho nàng biết ai đã cứu con nàng","Xin nàng làm chứng","Đáp: là cả hai","Đáp: là chủ nhân","Từ chối, giữ đường cũ","Nhận lời đứng cạnh nàng","Nhận trâm, nghe việc"],np:2,bad:["Đáp: là chính mình","Nhận lời giảng hòa","Gửi trả trâm"],sc:2,x:[()=>S.duc>=40,"Đức từ 40"],
 t:"Người mẹ ở Tây cung bế con quỳ trong Ngự thư phòng: “Nếu không có nàng ấy, đứa trẻ này đã không được sinh ra.” Hoàng thượng lặng đi rất lâu. Ngài ban cho {mis} một chữ «Nhân» viết tay, và khi {mis} xin chia công, ngài cho gọi cả ngươi lên nhận thưởng. Từ đó trong cung ai cũng biết: hai người đã giữ một việc thiện suốt bao năm mà không đòi ai trả.",
 fx:{danh:12,duc:4},go:A=>{CHU_MIS(30);try{rdOan(A,"v",12)}catch(e){}return CHU_NT(20)},rw:"nt_dongchau",ti:"Người giữ việc thiện"});
CNV_QFIX("cnv_chu");

/* ---------- cnv_ban · Chị em đồng hương ---------- */
/* BAL.road keys needed: none (deadlines are worded in the story: "trước phiên chợ rằm", "trước khi trời sáng", "trước Tết").
   Story: the jade bracelet Xuân Đào was accused of stealing went out of the palace through thái giám Phúc An (story-only NPC, the cart
   eunuch at the back gate of Nội vụ phủ); Thu Cúc ({mis}'s favourite maid, already in the .4 arc) owed him gambling silver, and {v}'s palace
   paid her debt in exchange for goods and for a scapegoat. Xuân Đào once saw the bracelet in the hands of {v}'s maid, so {v} wants her gone
   (second frame .7). Testimony (.8), {mis} judges (.9), the ledger reaches {eun} (.10), the finale decides Xuân Đào's fate (.11).
   Servant start (ROAD_MAP §8.4): every chapter reads right whether she is still a maid (isSrv) or already raised (S.srv.risen; {mis} is then
   her former mistress). Maid-only effects (tin, nt, e67merit, e67srvUp) only through need:["srv"] options or BAN_MIS / BAN_NT.
   {mis} = the road's mistress, kept once in S.st.f14.act.mis (CNV_MC, _hd_cnv.js). This road is Xuân Đào's, so it runs on when {mis} dies:
   only .9 (she judges) needs her alive; elsewhere her options carry if:CNV_MOK and her texts switch with CNV_MT. */
const BAN_R=()=>!!(S.srv&&S.srv.risen);
const BAN_T=(a,b)=>A=>{const x=BAN_R()?b:a;return typeof x==="function"?x(A):x};/* text: maid wording / consort wording */
function BAN_MIS(n){return CNV_REL(n)}
function BAN_NT(n){try{if(typeof isSrv==="function"&&isSrv()){S.nt=Math.max(0,Math.min(100,(S.nt||0)+n));return `Hoàng thượng để ý +${n}.`}apply({sung:Math.round(n/3)});return `Sủng +${Math.round(n/3)}.`}catch(e){return""}}
const BAN_E=()=>BAN_R()?S.sung:S.nt;/* odds term for options that reach the Emperor */

rdDef("cnv_ban",5,{t:"Chiếc vòng ngọc",w:"maid",sj:"chiếc vòng ngọc thật",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Vụ Xuân Đào khép lại, nhưng chiếc vòng ngọc thật chưa về chỗ cũ. Nó đi đâu, qua tay ai, ai được lợi: lần theo nó là lần ra kẻ đứng sau Thu Cúc.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Vòng ngọc giả",w:"maid",if:()=>rdPrev()==="win",t:BAN_T("Xuân Đào được tha. Nhưng thợ ngọc của Nội vụ phủ xem chiếc vòng tìm thấy trong đồ Thu Cúc, lắc đầu: ngọc nhuộm, vòng giả. Vòng thật đã ra khỏi cung.","Xuân Đào được tha, chạy sang tận cửa cung ngươi khóc. Nhưng thợ ngọc của Nội vụ phủ nói chiếc vòng tìm thấy trong đồ Thu Cúc là vòng giả. Vòng thật đã ra khỏi cung."),o:[
  {n:"Xin xem chiếc vòng giả",c:{suc:-2},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"clue",wx:"biết vòng giả làm ở đâu",l:{danh:-1},lx:"thợ ngọc không cho, đi đồn ngươi tọc mạch, tiếng sút; ngươi mệt mà vô ích",rt:"Lòng vòng có dấu khắc của một tiệm ngọc ngoài phố Đông.",rf:"Thợ ngọc cất vòng vào hộp, khóa lại."},
  {n:"Hỏi Xuân Đào đã thấy gì",c:{danh:-2},w:{duc:1},wx:"Xuân Đào kể hết với ngươi",lx:"nàng sợ, nói lộn xộn, người ta bảo ngươi khơi chuyện cũ, tiếng sút",rt:"Xuân Đào nhớ Thu Cúc hay ra cửa sau Nội vụ phủ lúc chạng vạng."},
  {n:"Để Nội vụ phủ tự tra",c:{danh:-2},w:{suc:2},wx:"không phải dính thêm",lx:"Nội vụ phủ tra chậm như rùa, người ta bảo ngươi bỏ tỷ muội, tiếng sút",rt:"Ngươi quay về, bụng không yên."}]},
 s2:{h:"Tỷ muội ở cung khác",w:"maid",if:()=>rdPrev()==="mid",t:CNV_MT("Xuân Đào đã bị đổi sang cung khác. Chiếc vòng chưa tìm thấy, còn Thu Cúc vẫn đứng hầu bên {mis} như chưa có gì.","Xuân Đào đã bị đổi sang cung khác. Chiếc vòng chưa tìm thấy, còn Thu Cúc vẫn ung dung như chưa có gì."),o:[
  {n:"Gửi bánh, hỏi thăm Xuân Đào",c:{bac:-5},w:{duc:2},wx:"nàng biết ngươi chưa quên",lx:"tốn bạc, người đưa bánh nhiều chuyện",rt:"Xuân Đào gửi lại một chiếc khăn thêu hoa đào quê nhà."},
  {n:"Để mắt đến Thu Cúc",c:{suc:-2},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"clue",wx:"biết Thu Cúc đi đâu buổi tối",l:{danh:-1},lx:"Thu Cúc biết bị rình, đi đồn ngươi thù vặt, tiếng sút; ngươi mệt rã",rt:"Thu Cúc ra cửa sau Nội vụ phủ, tay ôm một bọc nhỏ.",rf:"Thu Cúc quay lại, cười với ngươi."},
  {n:"Quên chuyện cũ cho yên",c:{danh:-2},w:{suc:2},wx:"lòng nhẹ",lx:"tiếng xấu của Xuân Đào vẫn còn, người ta bảo ngươi bỏ tỷ muội, tiếng sút",rt:"Ngươi tự nhủ: chuyện đã qua."}]},
 s3:{h:"Phòng chứa củi",w:"maid",if:()=>rdPrev()!=="win"&&rdPrev()!=="mid",t:"Ngươi bị phạt quỳ, Thu Cúc đắc ý. Xuân Đào bị nhốt ở phòng chứa củi chờ xét lại. Muốn cứu nàng, phải tìm ra chiếc vòng thật trước khi Nội vụ phủ xét lần hai.",o:[
  {n:"Lén mang cơm cho Xuân Đào",c:{suc:-3},w:{duc:3},wx:"nàng còn sức chờ",lx:"ngày việc đêm lén đi, ngươi mệt rã; bị bắt gặp là thêm tội",rt:"Xuân Đào ăn vội, nắm tay ngươi: “Tỷ đừng bỏ muội.”"},
  {n:"Dò xem Thu Cúc giấu gì",c:{bac:-10},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"clue",wx:"có manh mối",l:{danh:-2},lx:"lại bị cho là vu cáo, tiếng ngươi sút; bạc mất trắng",rt:"Thu Cúc có một tờ biên nhận cầm đồ giấu trong hộp kim chỉ.",rf:"Thu Cúc la lên, cả phòng xúm lại."},
  {n:"Xin {mis} cho xét lại sớm",if:CNV_MOK,c:{},o:()=>35+S.duc/4,w:{duc:1},sc:1,wx:"vụ án được xét sớm",l:{danh:-2},lx:"{mis} chán nghe chuyện này, bớt tin ngươi; tiếng sút",go:(A,ok)=>{if(!ok)BAN_MIS(-4)},rt:"{mis} hứa xét lại sau rằm.",rf:"{mis} phẩy tay."}]},
 c1:{h:"Thái giám cửa sau",w:"me",t:"Một cung nữ giặt áo kể: Thu Cúc hay gặp thái giám Phúc An, kẻ coi xe chở đồ giặt ra ngoài cung qua cửa sau Nội vụ phủ.",o:[
  {n:"Rình Phúc An",c:{suc:-3},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"fence",wx:"thấy hắn giấu đồ dưới đáy xe",l:{danh:-1},lx:"hắn đổi giờ chở, biết có người rình, đồn ngươi lắm chuyện, tiếng sút; ngươi mệt rã",rt:"Dưới chồng áo bẩn có một bọc lụa, bên trong có ánh ngọc.",rf:"Hôm ấy xe đi sớm, ngươi đến muộn."},
  {n:"Đưa bạc hỏi Phúc An",c:{bac:-20},o:()=>40+S.tamco/3,w:{tamco:1},sc:1,wx:"hắn hé ra một chút",l:{danh:-1},lx:"hắn báo lại cho người của hắn, ngươi bị nhớ mặt, tiếng sút; bạc mất trắng",rt:"Phúc An cười: “Đồ ta chở là đồ có người gửi. Ta không hỏi ai.”",rf:"Hắn nhận bạc, nói không biết gì."},
  {n:"Báo cho {eun} biết",c:{suc:-3},w:{danh:1},wx:"việc đến tai người có quyền",lx:"chạy việc đến rã người; Phúc An là người của Nội vụ phủ, tin đến tai hắn trước",rt:"Người của {eun} ghi lại, bảo ngươi về chờ."}]},
 c2:{h:"Tiệm cầm đồ phố Đông",w:"maid",t:"Người nhà Xuân Đào ở kinh thành nhắn vào: ở tiệm cầm đồ phố Đông có một chiếc vòng ngọc y hệt. Phải chuộc trước phiên chợ rằm, kẻo tiệm bán đi.",o:[
  {n:"Gửi bạc chuộc vòng",c:{bac:-60},w:{mat:1},f:"ring",wx:"vòng thật về tay ngươi",lx:"tốn một khoản bạc lớn, tiệm biết có người trong cung tìm",rt:"Người nhà Xuân Đào chuộc được vòng, lén gửi vào trong giỏ rau."},
  {n:"Nhờ người chép sổ tiệm",c:{bac:-20},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"ledger",wx:"biết ai đem vòng đến cầm",l:{duc:-1},lx:"chủ tiệm nghi, giấu sổ, bạc mất trắng; ngươi áy náy vì xui người làm bậy",rt:"Sổ ghi: người cầm là một thái giám mặt rỗ, xưng tên Phúc An.",rf:"Chủ tiệm đóng cửa sớm."},
  {n:"Không động, sợ lộ",c:{danh:-2},w:{duc:1},wx:"không để lại dấu ngoài cung",lx:"vòng có thể bị bán mất, người ta bảo ngươi nhát, tiếng sút",rt:"Ngươi nhắn người nhà Xuân Đào chờ thêm."}]},
 t1:{h:"Phúc An nói",w:"me",t:"Ngươi chặn được Phúc An ở cửa sau. Hắn tái mặt: “Ta chỉ chở. Đồ là của cung {v} gửi đi bán. Thu Cúc chỉ là đứa giao.”",o:[
  {n:"Bắt hắn viết lời khai",c:{suc:-3},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"wit",wx:"có lời khai trên giấy",l:{danh:-1},lx:"hắn chạy, lời khai mất, tiếng ngươi sút; ngươi mệt rã",rt:"Phúc An run tay viết, điểm chỉ.",rf:"Hắn giật tờ giấy, chạy mất."},
  {n:"Tha hắn, đổi lấy tin sau này",c:{bac:-10},w:{mat:1},wx:"có tai mắt ở cửa sau",lx:"tốn bạc nuôi tin, hắn vẫn chở đồ cho cung {v}",rt:"Phúc An cúi rạp: “Có gì ta báo.”"},
  {n:"Giải hắn lên {eun}",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"việc vào sổ Nội vụ phủ",l:{danh:-1},lx:"{eun} bao che người của mình, ghi ngươi là kẻ lắm chuyện, tiếng sút",rt:"{eun} cho giữ Phúc An lại hỏi.",rf:"{eun} thả hắn sau một tuần trà."}]},
 x1:{h:"Vòng ngọc về đâu",w:"mis",t:"Ngươi đã biết vòng thật ra khỏi cung qua tay Phúc An. Đem điều ấy đến đâu trước?",o:[
  {n:"Đem tang vật đến {mis}",if:CNV_MOK,c:{suc:-4},o:A=>35+(A.f.ring?15:0)+(A.f.wit?10:0),e:["win","lose"],rt:"{mis} cầm vòng thật, nhìn sang Thu Cúc rất lâu.",rf:"{mis} hỏi: “Bằng gì ngươi nói đây là vòng của ta?”"},
  {n:"Đem tang vật đối chất với Thu Cúc",if:()=>!CNV_MOK(),c:{suc:-4},o:A=>35+(A.f.ring?15:0)+(A.f.wit?10:0),e:["win","lose"],rt:"Thu Cúc nhìn vòng thật, tái mặt, quỳ xuống trước mặt cả phòng.",rf:"Thu Cúc cười: “Bằng gì ngươi nói đây là vòng ấy?”"},
  {n:"Giữ tang vật, chờ bắt kẻ lớn hơn",c:{danh:-2},w:{tamco:2},e:"mid",lx:"Xuân Đào còn mang tiếng thêm ít lâu, người ta bảo ngươi bỏ tỷ muội, tiếng sút; vụ chỉ dừng ở giữa",rt:"Ngươi giấu mọi thứ dưới đáy rương."},
  {n:"Báo Nội vụ phủ xử theo phép",c:{bac:-10},o:()=>45+S.danh/5,w:{danh:2},wx:"vụ vào sổ Nội vụ phủ, tên ngươi là người trình",lx:"Nội vụ phủ có người của Phúc An, bạc lo lót mất trắng, vụ chỉ dừng ở giữa hoặc hỏng",e:["mid","lose"],rt:"Nội vụ phủ ghi nhận, hứa tra.",rf:"Hồ sơ biến mất khỏi bàn Nội vụ phủ."}]}},
 E:{win:{k:1,tag:"Vòng thật về chỗ cũ",w:"mis",t:CNV_MT("{mis} nhận lại vòng thật. Xuân Đào sạch tiếng hẳn, còn Thu Cúc bị phạt quỳ nửa ngày. Nhưng ai cũng biết Thu Cúc không đủ gan làm một mình.","Vòng thật về lại kho Nội vụ phủ. Xuân Đào sạch tiếng hẳn, còn Thu Cúc bị phạt quỳ nửa ngày. Nhưng ai cũng biết Thu Cúc không đủ gan làm một mình."),fx:{danh:4},go:()=>{BAN_MIS(8);return e67merit(4)}},
  mid:{k:0,tag:"Tang vật trong tay ngươi",t:"Ngươi giữ chứng cứ, chưa nói với ai. Kẻ đứng sau chưa biết ngươi đã biết.",fx:{tamco:1}},
  lose:{k:-1,tag:"Tang vật mất dấu",t:CNV_MT("Phúc An đốt sổ, vòng ngọc biến mất lần nữa. {mis} cho là ngươi cứ gây chuyện vì tỷ muội.","Phúc An đốt sổ, vòng ngọc biến mất lần nữa. Nội vụ phủ cho là ngươi cứ gây chuyện vì tỷ muội."),fx:{danh:-3},go:()=>BAN_MIS(-6)}}});

rdDef("cnv_ban",6,{t:"Kẻ vu",w:"v",sj:"kẻ đứng sau Thu Cúc",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Thu Cúc không đủ gan một mình vu người. Có kẻ đã hứa che cho nàng. Đường bạc từ cửa sau Nội vụ phủ dẫn về cung {v}.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lời Thu Cúc",w:"maid",if:RDW(1),t:"Thu Cúc bị phạt quỳ. Lúc ngươi đi ngang, nàng ngẩng lên: “Ngươi tưởng ta làm một mình sao? Ngươi chưa biết mình đắc tội ai đâu.”",o:[
  {n:"Đến gặp Thu Cúc lúc nàng bị phạt",c:{suc:-2},o:()=>40+S.duc/4,w:{mat:1},sc:1,wx:"nàng hé ra một cái tên",l:{danh:-1},lx:"nàng chửi ngươi to tiếng trước mọi người, tiếng sút; ngươi mệt rã",rt:"Thu Cúc nói khẽ: “Cung {v}. Giờ thì ngươi vui chưa?”",rf:"Thu Cúc nhổ nước bọt xuống chân ngươi."},
  {n:"Hỏi {mis} Thu Cúc từng qua lại cung nào",if:CNV_MOK,c:{},o:()=>40+S.danh/4,w:{tamco:1},sc:1,wx:"{mis} nhớ ra vài chuyện",l:{duc:-2},lx:"{mis} không muốn nghĩ xấu người cũ, bớt tin ngươi; ngươi áy náy vì nghi người",go:(A,ok)=>{if(!ok)BAN_MIS(-3)},rt:"{mis} nhớ Thu Cúc hay xin đi đưa lễ sang cung {v}.",rf:"{mis} nói: “Đừng moi móc nữa.”"},
  {n:"Để Thu Cúc tự chịu",c:{danh:-2},w:{duc:1},wx:"không thêm oán",lx:"kẻ đứng sau còn trong bóng tối, người ta bảo ngươi đứng nhìn, tiếng sút",rt:"Ngươi đi qua, không nhìn."}]},
 s2:{h:"Bọc nhỏ mỗi tối",w:"maid",if:RDW(0),t:CNV_MT("Thu Cúc vẫn được {mis} sai việc như cũ. Mỗi tối nàng mang một bọc nhỏ ra cửa sau, quay về tay không.","Cung {mis} vắng chủ, Thu Cúc được Nội vụ phủ giữ lại coi đồ cũ. Mỗi tối nàng mang một bọc nhỏ ra cửa sau, quay về tay không."),o:[
  {n:"Theo Thu Cúc",c:{suc:-3},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"fence",wx:"thấy nàng giao bọc cho ai",l:{danh:-1},lx:"bị nàng phát hiện, đi đồn ngươi rình người, tiếng sút; ngươi mệt rã",rt:"Nàng giao bọc cho Phúc An; Phúc An đưa lại một gói bạc có dấu cung {v}.",rf:"Thu Cúc rẽ vào nhà xí, ngươi mất dấu."},
  {n:"Lén mở bọc",c:{},o:()=>40+S.tamco/4,w:{mat:1},sc:1,wx:"biết nàng mang gì ra",l:{danh:-2},lx:"bị bắt quả tang lục đồ người khác, tiếng ngươi sút",rt:"Trong bọc là đôi bông tai của {mis}.",rf:"Thu Cúc bắt gặp, la toáng lên."},
  {n:"Mách {mis}",if:CNV_MOK,c:{},o:()=>35+S.danh/4,w:{danh:1},sc:1,wx:"{mis} để ý Thu Cúc",l:{danh:-2},lx:"{mis} cho là ngươi thù vặt, bớt tin; tiếng sút",go:(A,ok)=>BAN_MIS(ok?4:-4),rt:"{mis} cho người đếm lại hộp trang sức.",rf:"{mis} mắng ngươi nhiều chuyện."}]},
 c1:{h:"Điều Xuân Đào đã thấy",w:"maid",t:"Xuân Đào nhớ lại: trước hôm bị vu, nàng mang lụa đến cung {v} và thấy Phúc An dúi chiếc vòng ngọc vào tay cung nữ thân cận của {v}.",o:[
  {n:"Bảo Xuân Đào kể lại trước người làm chứng",c:{suc:-2},o:()=>45+S.duc/5,w:{mat:1},sc:1,f:"wit",wx:"lời Xuân Đào có người nghe",l:{danh:-1},lx:"tin lọt đến cung {v}, {v} để bụng; ngươi mệt mà vô ích",rt:"Một ma ma già nghe hết, gật đầu nhận sẽ nhớ.",rf:"Người làm chứng đi kể khắp nơi."},
  {n:"Dặn Xuân Đào quên đi để giữ mạng",c:{danh:-2},w:{duc:2},wx:"Xuân Đào an toàn hơn",lx:"mất một nhân chứng, người ta bảo ngươi bịt miệng tỷ muội, tiếng sút",rt:"Xuân Đào gật đầu, mắt vẫn sợ."},
  {n:"Đem chuyện này hỏi khéo {v}",need:["v"],c:{suc:-2},o:()=>35+S.tamco/3,w:{tamco:2},sc:1,wx:"xem {v} phản ứng",l:{danh:-2},lx:"{v} biết Xuân Đào đã thấy, oán nặng hơn; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?4:8)},rt:"{v} đánh rơi chén trà.",rf:"{v} cười: “Ai thấy gì, cứ nói ra.”"}]},
 c2:{h:"{v} ban ơn",w:"v",need:["v"],t:"{v} cho người mang đến cho Xuân Đào một bộ áo mới, kèm lời nhắn: “Cung ta thiếu người khâu vá. Muốn sang không?”",o:[
  {n:"Khuyên Xuân Đào nhận để dò bên trong",c:{},o:()=>40+S.tamco/3,w:{mat:2},sc:1,f:"inside",wx:"có người ở trong cung {v}",l:{duc:-2},lx:"Xuân Đào vào hang cọp, lòng ngươi cắn rứt",rt:"Xuân Đào sang cung {v}, mỗi tuần lén gửi ngươi một mẩu tin.",rf:"Xuân Đào bị giữ ở phòng giặt, không ra được."},
  {n:"Bảo Xuân Đào từ chối",c:{danh:-2},w:{duc:2},wx:"Xuân Đào ở chỗ an toàn",lx:"{v} phật ý, thêm oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",4)},rt:"Xuân Đào gửi trả bộ áo."},
  {n:"Tự đến cảm ơn {v} thay Xuân Đào",c:{bac:-20},o:()=>40+S.danh/4,w:{tamco:1},sc:1,wx:"{v} tưởng hai chị em đã yên phận",l:{},lx:"{v} nhìn thấu, sinh ghét; quà biếu mất trắng",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} nhận lễ, nói Xuân Đào có phúc.",rf:"{v} nói: “Ta không cần người đến cảm ơn thay.”"}]},
 t1:{h:"Sổ nợ của Thu Cúc",w:"me",t:"Ngươi biết được: Thu Cúc nợ Phúc An một món bạc lớn vì đánh bạc ở cửa sau. Người trả nợ thay nàng là cung {v}, đổi lại nàng phải làm theo lệnh.",o:[
  {n:"Trả nợ cho Thu Cúc để kéo nàng về",c:{bac:-50},o:()=>45+S.duc/5,w:{tamco:2},sc:1,f:"turn",wx:"Thu Cúc thoát khỏi tay cung {v}",l:{duc:-1},lx:"Thu Cúc nhận bạc mà không đổi lòng, ngươi áy náy vì đã mua người; bạc mất trắng",rt:"Thu Cúc cầm bạc, khóc: “Sao ngươi lại giúp ta?”",rf:"Thu Cúc cầm bạc, quay đi không nói."},
  {n:"Nói chuyện nợ với {mis}",if:CNV_MOK,c:{suc:-3},w:{danh:1},wx:"{mis} biết Thu Cúc bị nắm thóp",lx:"chạy việc đến rã người; Thu Cúc biết ngươi mách, thù ngươi thêm",go:()=>BAN_MIS(4),rt:"{mis} lặng người: “Tám năm. Vậy mà ta không biết.”"},
  {n:"Giữ làm lá bài",c:{duc:-2},w:{tamco:2},wx:"cầm được điểm yếu của Thu Cúc",lx:"chưa ai được cứu, lòng ngươi áy náy vì giữ bí mật làm vốn",rt:"Ngươi ghi số nợ vào sổ riêng."}]},
 x1:{h:"Đêm Thu Cúc đến cung {v}",w:"v",t:"Đêm nay Thu Cúc lẻn đến cung {v} lần cuối, mang theo bạc. Chặn đường nàng, theo đến tận cửa, hay để nàng đi?",o:[
  {n:"Chặn Thu Cúc giữa đường, ép nàng khai",c:{suc:-4},o:A=>40+(A.f.turn?10:0)+S.tamco/5,e:["win","lose"],rt:"Thu Cúc quỳ xuống: “Là {v} sai. Ta khai.”",rf:"Thu Cúc la lên. Thị vệ cung {v} chạy ra."},
  {n:"Theo đến cửa cung {v}, nhìn tận mắt",c:{bac:-20},o:A=>35+S.mat*5+(A.f.fence?10:0),lx:"bạc lo đường mất trắng, thấy mà chưa bắt được, vụ chỉ dừng ở giữa",e:["win","mid"],rt:"Ngươi thấy cung nữ của {v} nhận bạc, và cả {v} đứng sau song cửa.",rf:"Cửa đóng trước khi ngươi kịp nhìn."},
  {n:"Để nàng đi, ghi lại giờ giấc",c:{danh:-2},w:{mat:1},e:"mid",lx:"cung {v} chưa bị chạm đến, vụ chỉ dừng ở giữa",rt:"Ngươi ghi: canh hai, cửa Tây, mang bọc lụa."}]}},
 E:{win:{k:1,tag:"Lộ mặt kẻ đứng sau",w:"v",t:"Kẻ hứa che Thu Cúc là {v}. Ngươi biết, và {v} biết ngươi biết. Từ nay giữa ngươi và cung {v} là thù thật.",fx:{danh:3,mat:1},go:A=>{rdOan(A,"v",10);rdRel(A,"v",-10)}},
  mid:{k:0,tag:"Biết mà chưa có chứng",t:"Ngươi biết đường đi của chiếc vòng và của bạc. Nhưng biết thì chưa đủ để ai bị xử.",fx:{tamco:1}},
  lose:{k:-1,tag:"Bị {v} phát hiện",w:"v",t:"Người của {v} thấy ngươi rình. Từ đêm ấy, cung {v} tìm cách dập cả ngươi lẫn Xuân Đào.",fx:{danh:-3},go:A=>{rdOan(A,"v",8)}}}});

rdDef("cnv_ban",7,{t:"Xuân Đào bị phạt",w:"maid",sj:"mạng của Xuân Đào",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Cung {v} ra tay trước: Xuân Đào bị vu lần thứ hai, bị đánh rồi đày xuống Tân Giả khố. Vết thương làm mủ, nàng sốt li bì. Phải có thuốc trước khi trời sáng.",
 p:[["s1","s2"],["c1","c2"],["t1","t2"],["x1"]],
 B:{s1:{h:"Chiếc trâm trong gối",w:"maid",if:RDW(1),t:BAN_T("Ngươi vừa lộ mặt cung {v} thì sáng hôm sau Xuân Đào bị bắt: trong gối nàng có chiếc trâm vàng của cung {v}. Nàng bị đánh hai mươi trượng.","Ngươi vừa lộ mặt cung {v} thì sáng hôm sau Xuân Đào bị bắt: trong gối nàng có chiếc trâm vàng của cung {v}. Ngươi nay là tiểu chủ, không thể chạy xuống sân Nội vụ phủ như xưa; mỗi bước của ngươi đều có người nhìn."),o:[
  {n:"Chạy đến xin tha trước khi đánh",need:["srv"],c:{suc:-3},o:()=>35+S.danh/4,w:{duc:2},sc:1,wx:"Xuân Đào bớt roi",l:{danh:-2},lx:"bị cho là đồng bọn, tiếng ngươi sút",rt:"Roi giảm còn mười.",rf:"Ngươi bị đẩy ra khỏi sân."},
  {n:"Sai người xuống sân Nội vụ phủ xin tha",need:["nsrv"],c:{bac:-20},o:()=>35+S.danh/4,w:{duc:2},sc:1,wx:"Xuân Đào bớt roi",l:{danh:-2},lx:"cả lục cung biết ngươi bênh kẻ chịu phạt, tiếng sút; bạc lo lót mất trắng",rt:"Roi giảm còn mười.",rf:"Người của ngươi bị đuổi ra khỏi sân."},
  {n:"Ghi lại kẻ nào đã gài trâm",c:{},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"clue",wx:"biết ai vào phòng Xuân Đào",l:{danh:-2},lx:"không ai nhận, người ta bảo ngươi vu vạ, tiếng sút",rt:"Cung nữ thân cận của {v} vào phòng ấy lúc mọi người đi giặt.",rf:"Ai cũng nói không thấy."},
  {n:"Giữ bình tĩnh, lo đường thuốc",c:{duc:-2},w:{tamco:1},f:"med",wx:"có thời gian chuẩn bị thuốc",lx:"Xuân Đào chịu đủ roi, lòng ngươi cắn rứt",rt:"Ngươi chạy đi tìm người quen ở Thái y viện."}]},
 s2:{h:"Đòn thứ hai",w:"maid",if:RDW(0),t:"Ngươi còn chưa có chứng cứ thì Xuân Đào đã bị vu lần nữa: mất một cuộn lụa của cung {v}, và cuộn lụa được tìm thấy dưới giường nàng. Nàng bị đánh, đày xuống Tân Giả khố.",o:[
  {n:"Lo bạc đút lót người coi Tân Giả khố",c:{bac:-30},w:{duc:1},wx:"Xuân Đào được nằm chỗ khô",lx:"bạc trong hộp vơi đi một khoản",rt:"Người coi nhận bạc, cho nàng nằm gần bếp."},
  {n:"Tìm người làm chứng nàng vô tội",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"wit",wx:"có người thấy kẻ gài lụa",l:{danh:-1},lx:"không ai dám, còn đồn ngươi xúi người, tiếng sút; ngươi mệt rã",rt:"Một tiểu thái giám thấy người của cung {v} ôm lụa vào phòng.",rf:"Ai cũng lắc đầu."},
  {n:"Khóc một đêm rồi đi làm",c:{danh:-2},w:{suc:2},wx:"giữ được sức",lx:"Xuân Đào một mình chịu, người ta bảo ngươi bạc tình, tiếng sút",rt:BAN_T("Sáng ra ngươi rửa mặt, cầm chổi.","Sáng ra ngươi rửa mặt, đi thỉnh an như thường.")}]},
 c1:{h:"Thuốc ở Thái y viện",w:"doc",t:"Thái y viện không cấp thuốc cho kẻ chịu phạt ở Tân Giả khố nếu không có lệnh.",o:[
  {n:"Mua thuốc ngoài cung qua cửa sau",c:{bac:-40},o:()=>45+S.mat*4,w:{duc:2},sc:1,f:"med",wx:"có thuốc trước đêm",l:{danh:-2},lx:"Phúc An biết ngươi cần gì, đồn ra, tiếng sút; bạc mất trắng",rt:"Thuốc đến tay ngươi trước giờ khóa cửa.",rf:"Gói thuốc bị đánh tráo bằng lá khô."},
  {n:"Xin thuốc dưới tên mình",c:{suc:-2},w:{duc:1},f:"med",wx:"có thuốc ngay",lx:"chạy đi chạy lại đến rã người; Thái y viện ghi tên ngươi vào sổ",rt:BAN_T("Ngươi giả đau lưng, lĩnh được một thang thuốc.","Ngươi cho người lĩnh thuốc về cung, nói là cho mình.")},
  {n:"Tự sắc lá thuốc theo cách quê nhà",c:{suc:-3},o:()=>40+S.tai/4,w:{tai:1},sc:1,f:"med",wx:"không ai biết",l:{suc:-2},lx:"lá thuốc không đủ mạnh, ngươi thức trắng đến kiệt sức",rt:"Lá trầu, lá ngải, giã nhỏ đắp vết thương. Mủ rút dần.",rf:"Vết thương vẫn sưng đỏ."}]},
 c2:{h:"Ma ma coi Tân Giả khố",w:"me",t:"Ma ma coi Tân Giả khố là người cũ của cung {v}. Bà bắt Xuân Đào giặt nước lạnh dù đang sốt.",o:[
  {n:"Đút lót ma ma",c:{bac:-30},o:()=>50+S.mat*3,w:{duc:1},sc:1,wx:"Xuân Đào được nghỉ",l:{danh:-1},lx:"ma ma ăn bạc rồi báo cung {v}, người ta bảo ngươi lo lót, tiếng sút; bạc mất trắng",rt:"Ma ma cất bạc, cho Xuân Đào nằm.",rf:"Ma ma cất bạc, rồi bắt giặt thêm."},
  {n:"Làm thay phần việc của Xuân Đào",need:["srv"],c:{suc:-6,tin:-3},w:{duc:3},wx:"Xuân Đào được nằm nghỉ",lx:"làm hai phần việc đến kiệt sức; việc của mình bỏ dở, Chủ tin sút",rt:"Ngươi giặt đến nửa đêm, hai tay tím tái."},
  {n:"Sai người của mình xuống giúp",need:["nsrv"],c:{bac:-20},w:{duc:2},wx:"Xuân Đào có người đỡ",lx:"tốn bạc nuôi người; cả cung biết ngươi bênh một kẻ chịu phạt",rt:"Người của ngươi xuống giặt thay, ma ma không dám nói."},
  {n:"Tố ma ma lên Nội vụ phủ",c:{suc:-2},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"ma ma bị nhắc",l:{danh:-1},lx:"cung {v} biết ngươi còn đó, thêm oán; hỏng thì người ta bảo ngươi tố bừa, tiếng sút",go:A=>{rdOan(A,"v",3)},rt:"Nội vụ phủ nhắc ma ma theo đúng phép.",rf:"Nội vụ phủ gạt đi."}]},
 t1:{h:"Đêm sốt",w:"maid",need:["srv"],t:"Đêm ấy Xuân Đào mê sảng, gọi tên mẹ và tên làng. Nàng nắm tay ngươi: “Tỷ, muội thấy rồi. Thấy chiếc vòng trong tay người ấy.”",o:[
  {n:"Ở lại canh đến sáng",c:{suc:-6},w:{duc:4},f:"stay",wx:"nàng không một mình",lx:"thức trắng đến kiệt sức",rt:"Gần sáng, nàng ngủ được."},
  {n:"Ghi lại lời nàng nói",c:{bac:-10},w:{mat:1},f:"wit",wx:"có lời kể của nhân chứng",lx:"tốn bạc mua giấy mực, đèn dầu; ghi lời người mê sảng, ai tin",rt:"Ngươi ghi từng chữ vào mặt trong vạt áo."},
  {n:"Mời thái y lén đến",c:{bac:-40},o:()=>45+S.mat*4,w:{duc:2},sc:1,f:"med",wx:"có thái y xem bệnh",l:{danh:-2},lx:"thái y bị bắt gặp, tiếng ngươi sút; bạc mất trắng",rt:"Thái y chích mủ, để lại thuốc.",rf:"Thái y bị gác cổng chặn lại."}]},
 /* raised twin of t1 (review road-b3-r1 item 4): a tiểu chủ does not spend the night at Tân Giả khố; she sends someone, or goes down once */
 t2:{h:"Đêm sốt",w:"maid",need:["nsrv"],t:"Đêm ấy người ngươi gửi xuống Tân Giả khố chạy về báo: Xuân Đào mê sảng, gọi tên mẹ và tên làng, nắm tay người ấy mà nói: “Tỷ ơi, muội thấy rồi. Thấy chiếc vòng trong tay người ấy.”",o:[
  {n:"Lén xuống Tân Giả khố ngồi cạnh nàng",c:{suc:-4,danh:-1},w:{duc:4},f:"stay",wx:"nàng không một mình",lx:"tiểu chủ đêm xuống Tân Giả khố, người ta xì xào, tiếng sút; thức đến kiệt sức",rt:"Gần sáng, nàng ngủ được, tay vẫn nắm vạt áo ngươi."},
  {n:"Sai người ghi lại lời nàng nói",c:{bac:-10},w:{mat:1},f:"wit",wx:"có lời kể của nhân chứng",lx:"tốn bạc giấy mực, thưởng người đi; ghi lời người mê sảng, ai tin",rt:"Người của ngươi chép từng chữ, mang về trước canh năm."},
  {n:"Mời thái y lén đến",c:{bac:-40},o:()=>45+S.mat*4,w:{duc:2},sc:1,f:"med",wx:"có thái y xem bệnh",l:{danh:-2},lx:"thái y bị bắt gặp, tiếng ngươi sút; bạc mất trắng",rt:"Thái y chích mủ, để lại thuốc.",rf:"Thái y bị gác cổng chặn lại."}]},
 x1:{h:"Trước khi trời sáng",w:"maid",t:"Cơn sốt lên đến đỉnh. Phải cứu Xuân Đào trước khi trời sáng.",o:[
  {n:"Cho nàng uống thuốc đã có",c:{bac:-10},lx:"thuốc không hợp thì nguy",o:A=>40+(A.f.med?20:0),e:["win","lose"],rt:"Mồ hôi vã ra, cơn sốt lui.",rf:"Thuốc không đủ, nàng lịm đi."},
  {n:"Xin đưa nàng ra khỏi Tân Giả khố chữa bệnh",c:{suc:-4},lx:"quỳ xin đến rã người; hỏng thì nợ Nội vụ phủ một ân, vụ chỉ dừng ở giữa",o:A=>35+S.danh/5+(BAN_R()?S.sung/5:(S.tin||0)/5),e:["win","mid"],rt:"Nội vụ phủ cho nàng về phòng bệnh.",rf:"Nội vụ phủ chỉ cho nàng nằm chỗ ấm hơn."},
  {n:"Quỳ chặn kiệu Hoàng thượng xin cứu tỷ muội",need:["srv"],c:{suc:-3},o:A=>30+S.nt/3,w:{nt:12},l:{tin:-10},lx:"chủ giận vì kẻ hầu dám chặn kiệu, Chủ tin sút",e:["win","lose"],rt:"Hoàng thượng dừng kiệu, nhìn ngươi, sai thái y đi theo.",rf:"Thị vệ kéo ngươi ra khỏi đường kiệu."},
  {n:"Xin Hoàng thượng cho thái y xuống Tân Giả khố",need:["nsrv"],c:{sung:-2},o:A=>35+S.sung/3,w:{sung:2},l:{sung:-2},lx:"xin ơn cho kẻ chịu phạt là tiêu một phần ân sủng; hỏng thì ngài cho là ngươi lo chuyện kẻ hầu, Sủng sút thêm",e:["win","mid"],rt:"Hoàng thượng gật đầu, sai thái y đi ngay.",rf:"Hoàng thượng nói: “Việc ấy để Nội vụ phủ lo.”"}]}},
 E:{win:{k:1,tag:"Xuân Đào qua cơn nguy",w:"maid",t:"Sáng ra Xuân Đào mở mắt, gọi tên ngươi. Nàng nói: “Muội sống rồi, muội sẽ nói hết.”",fx:{duc:4},go:()=>e67merit(4)},
  mid:{k:0,tag:"Xuân Đào sống, nhưng yếu",t:"Xuân Đào qua được, nhưng gầy như que củi, còn phải ở lại Tân Giả khố.",fx:{duc:2}},
  lose:{k:-1,tag:"Xuân Đào sợ đến câm lặng",w:"maid",t:"Xuân Đào qua được cơn sốt, nhưng sợ đến mức không dám nhận mình đã thấy gì. Cung {v} đã đạt được điều nó muốn.",fx:{danh:-2},go:A=>{rdOan(A,"v",4)}}}});

rdDef("cnv_ban",8,{t:"Lời làm chứng",w:"mis",sj:"phiên làm chứng vụ vòng ngọc",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:BAN_T("Nội vụ phủ mở lại vụ chiếc vòng. Cần một người dám đứng ra nói về những gì đã thấy ở cửa sau. Ngươi là người biết nhiều nhất, và cũng mất nhiều nhất nếu lời mình bị bác.","Nội vụ phủ mở lại vụ chiếc vòng. Cần một người dám nói về những gì đã thấy ở cửa sau. Ngươi nay là tiểu chủ, không đứng giữa sân phủ được: lời chứng của ngươi phải viết thành tờ, đóng dấu cung, để thái giám cung ngươi mang đến đọc. Ngươi biết nhiều nhất, và cũng mất nhiều nhất nếu lời mình bị bác."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Xuân Đào muốn nói",w:"maid",if:RDW(1),t:"Xuân Đào còn yếu, nhưng nắm tay ngươi: “Muội muốn đứng ra. Tỷ đứng cạnh muội nhé.”",o:[
  {n:"Hứa đứng cạnh nàng",c:{danh:-2},w:{duc:2},f:"wit",wx:"Xuân Đào có gan nói",lx:"buộc mình vào phiên chứng, người ta xì xào, tiếng sút",rt:"Xuân Đào gật đầu, mắt sáng lên."},
  {n:"Dặn nàng chỉ nói điều tận mắt thấy",c:{},o:()=>45+S.tamco/4,w:{tamco:1},sc:1,wx:"lời nàng khó bị bắt bẻ",l:{duc:-2},lx:"nàng rối, quên nửa, lòng ngươi áy náy vì ép nàng tập",rt:"Hai chị em tập đi tập lại từng câu.",rf:"Nàng càng tập càng rối."},
  {n:"Khuyên nàng để ngươi nói thay",c:{suc:-3},w:{danh:1},wx:"Xuân Đào được nghỉ",lx:"gánh thêm việc đến rã người; lời ngươi bị coi là lời bênh tỷ muội",rt:"Xuân Đào thở phào."}]},
 s2:{h:"Xuân Đào không dám",w:"maid",if:RDW(0),t:"Xuân Đào trốn mặt mọi người. Khi ngươi nhắc đến phiên chứng, nàng khóc: “Muội không dám. Lần sau họ giết muội mất.”",o:[
  {n:"Ôm nàng, không ép",c:{danh:-2},w:{duc:3},wx:"nàng biết ngươi thương",lx:"mất lời của nhân chứng chính, người ta bảo ngươi mềm lòng, tiếng sút",rt:"Nàng khóc đến ngủ thiếp."},
  {n:"Hứa bảo vệ nàng đến cùng",c:{suc:-2},o:()=>40+S.duc/4,w:{mat:1},sc:1,f:"wit",wx:"nàng chịu nói",l:{duc:-1},lx:"nàng hứa rồi lại sợ, ngươi áy náy vì đã hứa suông; ngươi mệt rã",rt:"Nàng lau nước mắt: “Vì tỷ.”",rf:"Nàng gật đầu, nhưng hôm sau trốn đi."},
  {n:"Tìm nhân chứng khác",c:{bac:-20},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"có người khác thay Xuân Đào",l:{bac:-10},lx:"người ấy nhận bạc rồi cáo ốm, đòi thêm bạc",rt:"Cung nữ giặt áo năm trước nhận sẽ nói.",rf:"Người ấy nhận bạc rồi cáo ốm."}]},
 c1:{h:"Phúc An đổi lời",w:"me",t:"Phúc An được ai đó lo lót, nay chối hết: hắn chưa từng chở vòng ngọc, chưa từng biết Thu Cúc.",o:[
  {n:"Đưa ra lời khai hắn đã viết",c:{},o:A=>35+(A.f.wit?15:0)+S.mat*4,w:{danh:2},sc:1,wx:"hắn cứng họng",l:{danh:-2},lx:"lời khai bị nói là ép viết, tiếng ngươi sút",rt:"Dấu điểm chỉ của hắn còn đỏ trên giấy.",rf:"Hắn nói bị ép, Nội vụ phủ gạt tờ giấy."},
  {n:"Dọa hắn bằng sổ cầm đồ",c:{bac:-20},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"hắn sợ, khai lại",l:{danh:-1},lx:"hắn báo cung {v}, đồn ngươi dọa người, tiếng sút; bạc mất trắng",rt:"Phúc An tái mặt, xin khai lại.",rf:"Hắn cười: “Sổ ấy ai chứng?”"},
  {n:"Bỏ hắn, chỉ dựa vào người khác",c:{danh:-2},w:{duc:1},wx:"không dây với kẻ trở mặt",lx:"mất một mắt xích, người ta bảo ngươi thiếu chứng, tiếng sút",rt:"Ngươi gạch tên hắn khỏi danh sách."}]},
 c2:{h:"Kiệu Hoàng thượng đi ngang",w:"emp",t:BAN_T("Phiên hỏi đang ở sân Nội vụ phủ thì kiệu Hoàng thượng đi ngang. Ngài cho dừng, hỏi chuyện gì mà đông người.","Phiên hỏi đang ở sân Nội vụ phủ. Ngươi thỉnh an về, đi ngang cổng phủ thì gặp kiệu Hoàng thượng. Ngài cho dừng, hỏi trong ấy chuyện gì mà đông người."),o:[
  {n:"Ngẩng đầu thưa rõ từng lời",need:["srv"],c:{},o:()=>40+S.nt/4,w:{nt:10},sc:1,wx:"Hoàng thượng nhớ mặt kẻ hầu dám nói",l:{tin:-6},lx:"chủ cho là ngươi lấn, Chủ tin sút",rt:"Hoàng thượng nghe hết, hỏi tên ngươi.",rf:"Tổng quản quát ngươi im."},
  {n:"Xin Hoàng thượng dừng kiệu nghe một lời",need:["nsrv"],c:{},o:()=>35+S.sung/4,w:{sung:3},sc:1,wx:"Hoàng thượng để tâm đến vụ án",l:{sung:-4},lx:"bị cho là lấy chuyện nhỏ làm phiền, Sủng sút",rt:"Hoàng thượng nghe, dặn Nội vụ phủ xử cho minh bạch.",rf:"Hoàng thượng nói: “Việc của Nội vụ phủ.”"},
  {n:"Cúi đầu, để phiên hỏi đi đúng phép",c:{danh:-2},w:{duc:2},wx:"không ai trách được",lx:"lỡ một dịp, người ta bảo ngươi nhát, tiếng sút",rt:"Kiệu đi qua. Phiên hỏi tiếp tục."}]},
 t1:{h:"{mis} hỏi riêng",w:"mis",if:CNV_MOK,t:"{mis} gọi ngươi vào trước phiên: “Ngươi làm chứng thì Thu Cúc chết. Nó theo ta tám năm.”",o:[
  {n:"Thưa: chỉ nói điều đã thấy",c:{danh:-2},w:{duc:3},f:"wit",wx:"giữ được lẽ thẳng",lx:"{mis} buồn, bớt tin; người trong cung chê ngươi cứng, tiếng sút",go:()=>BAN_MIS(-3),rt:"{mis} gật đầu: “Ừ. Ngươi cứ nói.”"},
  {n:"Hứa không nhắc tên Thu Cúc",c:{duc:-2},w:{tamco:1},wx:"{mis} cảm kích",lx:"lời chứng hở một chỗ, lòng ngươi áy náy",go:()=>BAN_MIS(5),rt:"{mis} nắm tay ngươi: “Ta nhớ.”"},
  {n:"Xin {mis} tự xử Thu Cúc trước phiên",c:{suc:-2},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"{mis} giữ thể diện",l:{},lx:"{mis} cho là ngươi dạy nàng, bớt tin; ngươi mệt mà vô ích",go:(A,ok)=>BAN_MIS(ok?4:-5),rt:"{mis} cho gọi Thu Cúc vào phòng riêng.",rf:"{mis} quay mặt: “Ngươi lui ra.”"}]},
 x1:{h:"Phiên làm chứng",w:"mis",t:BAN_T("Cả sân Nội vụ phủ đứng nghe. Người của cung {v} đứng ở hàng đầu.","Thái giám cung ngươi cầm tờ chứng đóng dấu bước ra giữa sân Nội vụ phủ. Người của cung {v} đứng ở hàng đầu. Viết gì vào tờ ấy là việc của ngươi."),o:[
  {n:"Làm chứng, kể hết",c:{suc:-4},o:A=>35+(A.f.wit?15:0),lx:"bị bác là thành kẻ vu cáo lần hai",e:["win","lose"],rt:"Từng lời ngươi khớp với sổ cầm đồ và lời Xuân Đào.",rf:"Người của cung {v} có lời khai khác, khớp hơn."},
  {n:"Chỉ làm chứng về Phúc An",c:{},o:A=>40+S.tamco/5,w:{danh:2},wx:"Phúc An bị kết tội nhờ lời ngươi",lx:"cung {v} không bị nhắc, hỏng thì lời ngươi bị bác",e:["mid","lose"],rt:"Phúc An bị kết tội chở đồ ra ngoài.",rf:"Lời ngươi bị nói là không đủ."},
  {n:"Để Xuân Đào tự nói",c:{danh:-2},w:{duc:2},e:"mid",lx:"lời của một cung nữ chịu phạt nhẹ cân, người ta bảo ngươi đẩy tỷ muội ra trước, tiếng sút; vụ chỉ dừng ở giữa",rt:"Xuân Đào nói run run, nhưng nói hết."}]}},
 E:{win:{k:1,tag:"Lời chứng đứng vững",w:"mis",t:"Nội vụ phủ ghi lời ngươi làm chứng. Phúc An bị giam, Thu Cúc bị gọi tên. Cả cung biết người cùng quê với Xuân Đào không phải người dễ bỏ tỷ muội.",fx:{danh:5},go:A=>{rdOan(A,"v",6);return e67merit(5)}},
  mid:{k:0,tag:"Nửa lời chứng",t:"Phúc An bị xử, nhưng Thu Cúc và cung {v} vẫn đứng ngoài.",fx:{danh:1}},
  lose:{k:-1,tag:"Lời chứng bị bác",t:BAN_T("Lời ngươi bị bác. Ngươi bị phạt quỳ vì vu cáo lần hai, chủ không còn tin ngươi như trước.","Lời ngươi bị bác. Nội vụ phủ tâu lên, Hoàng thượng phê phạt bổng ngươi vì vu cáo; cả lục cung xì xào."),fx:{danh:-4,suc:-4},go:A=>{BAN_MIS(-8);rdOan(A,"v",4)}}}});

rdDef("cnv_ban",9,{t:"Chủ phân xử",w:"mis",sj:"lời phân xử của {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"])},
 g:"Thu Cúc theo {mis} tám năm. Xuân Đào là người cùng quê với ngươi. Chứng cứ nằm trên bàn, và {mis} phải chọn. Lời ngươi có thể làm nàng nghiêng về một bên.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bàn phân xử",w:"mis",if:RDW(1),t:BAN_T("Sau phiên làm chứng, Nội vụ phủ trả vụ Thu Cúc về cho {mis} tự xử, vì Thu Cúc là người cung nàng. {mis} cho gọi ngươi đứng hầu bên bàn.","Sau phiên làm chứng, Nội vụ phủ trả vụ Thu Cúc về cho {mis} tự xử. Ngươi nay là tiểu chủ, được {mis} mời sang ngồi nghe, vì ngươi từng là người cung nàng."),o:[
  {n:"Đứng hầu, không nói",need:["srv"],c:{danh:-2},w:{duc:2},wx:"{mis} thấy ngươi biết phận",lx:"không góp được lời, người ta bảo ngươi câm, tiếng sút",go:()=>BAN_MIS(3),rt:"Ngươi đứng sau {mis} suốt buổi."},
  {n:"Ngồi nghe, không nói",need:["nsrv"],c:{danh:-2},w:{duc:2},wx:"{mis} thấy ngươi giữ lễ",lx:"không góp được lời, người ta bảo ngươi câm, tiếng sút",go:()=>BAN_MIS(3),rt:"Ngươi ngồi nghe suốt buổi, không chen một lời."},
  {n:"Xin được trình bày trước",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"{mis} nghe ngươi trước",l:{danh:-1},lx:"bị cho là lấn lời, tiếng ngươi sút; ngươi mệt mà vô ích",rt:"{mis} gật đầu cho ngươi nói.",rf:"{mis} nói: “Chờ đến lượt.”"},
  {n:"Đưa Xuân Đào đến cùng",c:{danh:-2},w:{duc:1},f:"wit",wx:"Xuân Đào có mặt khi bị xử thay",lx:"Xuân Đào phải nhìn Thu Cúc, người ta bảo ngươi làm to chuyện, tiếng sút",rt:"Xuân Đào đứng nép sau lưng ngươi."}]},
 s2:{h:"Chủ không muốn xử",w:"mis",if:RDW(0),t:"Vụ án dở dang. {mis} không muốn xử, cứ hẹn lần hẹn lữa. Trong lúc ấy Thu Cúc vẫn hầu trà cho nàng mỗi sáng.",o:[
  {n:"Xin {mis} xử cho dứt",c:{},o:()=>35+S.duc/4,w:{duc:1},sc:1,wx:"{mis} đặt ngày xử",l:{danh:-2},lx:"{mis} khó chịu, bớt tin; tiếng sút",go:(A,ok)=>BAN_MIS(ok?2:-4),rt:"{mis} thở dài: “Mười lăm này.”",rf:"{mis} nói: “Ngươi giục ta?”"},
  {n:"Đưa thêm chứng cứ cho {mis}",c:{bac:-20},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"{mis} không thể làm ngơ",l:{danh:-1},lx:"chứng cứ bị Thu Cúc giành trước, đồn ngươi bịa, tiếng sút; bạc mất trắng",rt:"{mis} đọc tờ sổ cầm đồ, mặt tái.",rf:"Thu Cúc nói tờ sổ là giả."},
  {n:"Chờ thêm",c:{danh:-2},w:{suc:2},wx:"không bị coi là ép chủ",lx:"Thu Cúc có thời gian lo liệu, người ta bảo ngươi nhát, tiếng sút",rt:"Ngươi chờ."}]},
 c1:{h:"Thu Cúc quỳ",w:"me",t:"Thu Cúc quỳ trước {mis}, khóc kể món nợ ở cửa sau, kể cung {v} ép nàng thế nào. Nàng xin tha một mạng.",o:[
  {n:"Xin {mis} tha Thu Cúc một mạng",c:{danh:-2},w:{duc:3},f:"mercy",wx:"Thu Cúc nợ ngươi một ân",lx:"Xuân Đào chịu oan không ai đền, người ta bảo ngươi mềm, tiếng sút",rt:"Thu Cúc ngẩng lên nhìn ngươi, không tin nổi."},
  {n:"Nhắc {mis} Xuân Đào đã chịu những gì",c:{},o:()=>40+S.duc/4,w:{danh:2},sc:1,wx:"{mis} nhìn Xuân Đào",l:{danh:-2},lx:"{mis} cho là ngươi thiên vị, tiếng sút",rt:"{mis} nhìn những vết roi trên tay Xuân Đào, im lặng.",rf:"{mis} nói: “Ta biết. Không cần nhắc.”"},
  {n:"Im lặng",c:{duc:-2},w:{tamco:1},wx:"không để ai bắt lỗi",lx:"mất lượt nói, lòng ngươi áy náy",rt:"Ngươi đứng yên."}]},
 c2:{h:"{v} gửi lời",w:"v",need:["v"],t:"{v} sai người đến nói với {mis}: “Chuyện trong cung ai nấy tự xử. Đừng để lan sang cung khác.”",o:[
  {n:"Nói với {mis}: {v} đang sợ",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{mis} thấy rõ ai đứng sau",l:{duc:-2},lx:"{mis} sợ thay vì giận, lòng ngươi áy náy vì đã dọa chủ; {v} vẫn thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?6:3)},rt:"{mis} đặt chén trà xuống: “Sợ thì phải có lý do.”",rf:"{mis} nói: “Cung ta không đủ sức đối đầu.”"},
  {n:"Tránh nhắc đến {v}",c:{danh:-2},w:{duc:1},wx:"vụ án nhỏ lại",lx:"{v} thoát, người ta bảo ngươi sợ cung {v}, tiếng sút",rt:"Ngươi chỉ nói về Thu Cúc."},
  {n:"Tự đến cung {v} đáp lời",c:{suc:-3},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"{v} biết ngươi không lùi",l:{danh:-2},lx:"vượt phận, tiếng ngươi sút; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?8:6)},rt:"Ngươi nói đúng một câu rồi lui. {v} không đáp được.",rf:"{v} cho người đuổi ngươi ra."}]},
 t1:{h:"Cái giá của công bằng",w:"mis",t:"{mis} hỏi ngươi: “Nếu ta xử đúng, cung {v} sẽ thù cung ta. Ngươi gánh được cùng ta không?”",o:[
  {n:"Thưa: xin gánh cùng",c:{suc:-2},w:{duc:2},f:"bond",wx:"{mis} thấy có người đứng cạnh",lx:"buộc mình vào thù của nàng, lo nghĩ đến rã người",go:()=>BAN_MIS(6),rt:"{mis} gật đầu chậm."},
  {n:"Thưa: xử theo lẽ phải, việc sau tính sau",c:{danh:-2},w:{duc:3},wx:"giữ được lẽ thẳng",lx:"{mis} thấy ngươi để nàng gánh một mình, người ta chê ngươi, tiếng sút",rt:"{mis} cười buồn: “Lẽ phải không có ai gánh hộ.”"},
  {n:"Khuyên xử nhẹ cho êm",c:{duc:-2},w:{tamco:2},f:"soft",wx:"cung {mis} yên",lx:"Xuân Đào không được rửa hẳn, lòng ngươi áy náy",rt:"{mis} gật đầu, như trút được gánh."}]},
 x1:{h:"Lời phân xử",w:"mis",t:"{mis} cầm bút. Trên bàn là sổ cầm đồ, lời khai của Phúc An và vết roi trên tay Xuân Đào.",o:[
  {n:"Xin {mis} xử theo chứng cứ",c:{suc:-4},o:A=>40+(A.f.bond?10:0)+S.duc/6,lx:"hỏng thì {mis} che Thu Cúc, Thu Cúc thành kẻ thù",e:["win","lose"],rt:"{mis} viết: Thu Cúc đuổi về Tân Giả khố, Xuân Đào rửa oan.",rf:"{mis} buông bút: “Ta không xử được người tám năm.”"},
  {n:"Xin xử nhẹ cả hai, giữ êm cung",c:{duc:-2},w:{tamco:1},e:"mid",lx:"Xuân Đào chưa được rửa sạch, lòng ngươi áy náy; vụ chỉ dừng ở giữa",rt:"Thu Cúc bị phạt bổng, Xuân Đào được về phòng cũ."},
  {n:"Dâng chứng cứ thẳng lên Nội vụ phủ, bỏ qua {mis}",c:{suc:-3},o:A=>40+S.danh/4,lx:"{mis} mất mặt, không bao giờ quên ngươi vượt đầu nàng",e:["out","lose"],rt:"Nội vụ phủ xử Thu Cúc theo phép.",rf:"Nội vụ phủ trả hồ sơ về cho {mis}."}]}},
 E:{win:{k:1,tag:"Chủ xử theo lẽ phải",w:"mis",t:"Thu Cúc bị đuổi về Tân Giả khố. Xuân Đào được rửa oan trước cả cung. {mis} nói với ngươi: “Ngươi làm ta mất một người, nhưng trả lại cho ta chữ tín.”",fx:{danh:4,duc:2},go:()=>{BAN_MIS(10);return e67merit(5)}},
  mid:{k:0,tag:"Xử cho êm",t:"Cả hai bị phạt nhẹ, không ai được rửa hẳn. Cung {mis} yên, nhưng chỉ là yên mặt nước.",fx:{tamco:1}},
  out:{k:0,tag:"Vượt mặt chủ",w:"eun",t:"Nội vụ phủ xử đúng, nhưng {mis} không bao giờ quên ngươi đã đi qua đầu nàng.",fx:{danh:4},go:()=>BAN_MIS(-10)},
  lose:{k:-1,tag:"Chủ che Thu Cúc",w:"mis",t:"{mis} không nỡ xử Thu Cúc. Xuân Đào vẫn mang tiếng, còn Thu Cúc nhìn ngươi bằng ánh mắt của kẻ được tha.",fx:{danh:-3},go:()=>BAN_MIS(-5)}}});

rdDef("cnv_ban",10,{t:"Trả lại sự thật",w:"eun",sj:"cuốn sổ đồ ra cửa sau",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Sổ đồ ra cửa sau của Phúc An đã đến bàn {eun}. Trong sổ có tên Thu Cúc, tên cung {v}, và tên mấy thái giám của chính Nội vụ phủ. Sự thật được trả lại, hay bị chôn để giữ yên cả một phủ?",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sổ trên bàn {eun}",w:"eun",if:RDW(1),t:"Thu Cúc đã bị xử. Nhưng trước khi đi Tân Giả khố, nàng khai ra cuốn sổ của Phúc An. Cuốn sổ nay nằm trên bàn {eun}.",o:[
  {n:"Xin {eun} cho xem sổ",c:{suc:-2},o:()=>40+S.danh/4,w:{mat:1},sc:1,wx:"biết trong sổ có những ai",l:{danh:-1},lx:"{eun} ghi nhớ ngươi là kẻ lắm chuyện, tiếng sút; ngươi mệt mà vô ích",rt:"Ngươi đọc thấy tên cung {v} bảy lần.",rf:"{eun} gập sổ: “Việc của phủ.”"},
  {n:"Chép trước một bản",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:2},sc:1,wx:"có bản sao phòng khi sổ mất",l:{danh:-2},lx:"bị bắt là trộm hồ sơ, tiếng ngươi sút; bạc mất trắng",rt:"Một thư lại chép cho ngươi nửa cuốn.",rf:"Thư lại bị bắt, khai ra ngươi."},
  {n:"Chờ {eun} tự xử",c:{danh:-2},w:{duc:1},wx:"không đắc tội Nội vụ phủ",lx:"sổ có thể biến mất, người ta bảo ngươi buông tay, tiếng sút",rt:"Ngươi chờ."}]},
 s2:{h:"Sổ suýt mất",w:"eun",if:RDW(0),t:"Vụ án dở dang. Nghe đồn cuốn sổ của Phúc An sắp bị đốt trong lò của Nội vụ phủ trước Tết.",o:[
  {n:"Tìm cách giữ cuốn sổ",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"book",wx:"cuốn sổ còn",l:{danh:-2},lx:"bị nghi lấy trộm, tiếng ngươi sút; bạc mất trắng",rt:"Một thư lại giấu cuốn sổ vào kho cũ.",rf:"Cuốn sổ đã bị dời đi."},
  {n:"Báo cho {mis} biết",if:CNV_MOK,c:{duc:-2},w:{tamco:1},wx:"{mis} cùng giữ",lx:"{mis} không muốn dính thêm, ngươi áy náy vì kéo nàng vào",go:()=>BAN_MIS(3),rt:"{mis} nói: “Để ta nhờ người.”"},
  {n:"Để mặc",c:{danh:-2},w:{suc:2},wx:"không dính thêm",lx:"sự thật có thể thành tro, người ta bảo ngươi buông tay, tiếng sút",rt:"Ngươi không đi."}]},
 c1:{h:"Phúc An mất tích",w:"me",t:"Phúc An không còn ở cửa sau. Người ta nói hắn bị điều ra Hoàng lăng.",o:[
  {n:"Cho người ra Hoàng lăng tìm",c:{bac:-40},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"fence",wx:"Phúc An còn sống để khai",l:{duc:-1},lx:"người đi tìm về tay không, ngươi áy náy vì sai người đi xa vô ích; bạc mất trắng",rt:"Phúc An còn sống, run rẩy nhận sẽ khai nếu được về kinh.",rf:"Ở Hoàng lăng không ai tên Phúc An."},
  {n:"Tìm người thay hắn coi xe",c:{},o:()=>45+S.tamco/4,w:{tamco:1},sc:1,wx:"biết đường đồ vẫn chảy",l:{duc:-2},lx:"kẻ mới cũng là người của cung {v}, lòng ngươi áy náy vì cài người",rt:"Kẻ mới vẫn chở bọc lụa ra mỗi tối.",rf:"Kẻ mới không nói gì."},
  {n:"Thôi, đủ chứng rồi",c:{danh:-2},w:{duc:1},wx:"không gây thêm",lx:"mất một nhân chứng, người ta bảo ngươi bỏ cuộc, tiếng sút",rt:"Ngươi không tìm nữa."}]},
 c2:{h:"Xuân Đào muốn về quê",w:"maid",t:"Xuân Đào xin ngươi giúp nàng xin xuất cung sớm: “Muội sợ rồi, tỷ ạ. Muội muốn về làng.”",o:[
  {n:"Hứa giúp nàng về quê",c:{bac:-20},w:{duc:3},f:"home",wx:"Xuân Đào yên lòng",lx:"tốn bạc lo đường; sắp mất người cùng quê",rt:"Xuân Đào ôm ngươi khóc."},
  {n:"Khuyên nàng ở lại đến khi rửa sạch tiếng",c:{},o:()=>40+S.duc/4,w:{tamco:1},sc:1,f:"stay",wx:"Xuân Đào ở lại",l:{duc:-2},lx:"nàng giận ngươi, lòng ngươi áy náy",rt:"Xuân Đào gật đầu: “Vì tỷ.”",rf:"Xuân Đào im lặng, quay đi."},
  {n:"Xin {mis} cho Xuân Đào về cùng phòng",need:["srv"],if:CNV_MCUR,c:{},o:()=>40+(S.tin||0)/4,w:{duc:1},sc:1,f:"keep",wx:"hai chị em ở gần nhau",l:{tin:-4},lx:"{mis} cho là ngươi đòi hỏi, Chủ tin sút",rt:"{mis} gật đầu.",rf:"{mis} nói: “Người đã đi thì đừng gọi về.”"},
  {n:"Xin Nội vụ phủ cho Xuân Đào về hầu cung mình",need:["nsrv"],c:{bac:-30},w:{duc:2},f:"keep",wx:"Xuân Đào ở trong tay ngươi",lx:"tốn bạc lo lót; cung {v} thấy ngươi giữ nhân chứng",rt:"Nội vụ phủ phân Xuân Đào về cung ngươi."}]},
 t1:{h:"{eun} mặc cả",w:"eun",t:"{eun} nói: “Ta khép sổ. Thu Cúc chịu tội một mình, cung {v} không dính. Đổi lại Xuân Đào được trắng án, người của ta cũng yên.”",o:[
  {n:"Nhận lời",c:{danh:-2},w:{duc:1},f:"deal",wx:"Xuân Đào chắc được trắng án",lx:"cung {v} không bị chạm đến, người ta bảo ngươi bán lẽ phải, tiếng sút",rt:"{eun} gật đầu, cất sổ vào ngăn kéo."},
  {n:"Đòi đưa cả sổ lên",c:{suc:-3},o:()=>35+S.danh/4,w:{danh:2},sc:1,f:"truth",wx:"{eun} không dám ém",l:{danh:-2},lx:"{eun} thành kẻ thù, tiếng ngươi sút; ngươi mệt rã",rt:"{eun} nhíu mày: “Gan đấy. Được.”",rf:"{eun} nói: “Vậy thì không ai được gì.”"},
  {n:"Xin thêm bạc lộ phí cho Xuân Đào về quê",c:{duc:-2},o:()=>45+S.tamco/4,w:{bac:30},sc:1,f:"deal",wx:"Xuân Đào có vốn về làng",l:{danh:-1},lx:"bị coi là mặc cả sự thật, lòng ngươi áy náy; hỏng thì bị chê tham, tiếng sút",rt:"{eun} cười, đẩy sang một túi bạc.",rf:"{eun} nói: “Đừng được voi đòi tiên.”"}]},
 x1:{h:"Cuốn sổ",w:"eun",t:"Cuốn sổ nằm giữa bàn. Sự thật được trả lại hay bị chôn, đêm nay quyết.",o:[
  {n:"Dâng cả cuốn sổ lên Hoàng thượng",c:{suc:-5},o:A=>30+S.danh/5+(A.f.fence?10:0)+(A.f.truth?10:0)+BAN_E()/8,lx:"dâng sổ đến kiệt sức; hỏng thì đắc tội cả Nội vụ phủ, cuốn sổ bị đốt",e:["win","lose"],go:(A,ok)=>ok?BAN_NT(8):"",rt:"Hoàng thượng đọc sổ, cho gọi {eun} đến.",rf:"Cuốn sổ không đến được ngự án."},
  {n:"Nhận cuộc mặc cả của {eun}",c:{duc:-2},w:{tamco:2},e:"mid",lx:"cung {v} không bị đụng đến, ngươi đổi lẽ phải lấy yên ổn, lòng áy náy; vụ chỉ dừng ở giữa",rt:"{eun} khép sổ. Xuân Đào trắng án."},
  {n:"Đưa sổ cho {mis}, để nàng dùng",if:CNV_MOK,c:{},o:A=>45+S.tamco/5,lx:"sự thật thành lá bài của người khác, vụ chỉ dừng ở giữa",e:["mid","lose"],go:()=>BAN_MIS(5),rt:"{mis} cất sổ, nói sẽ dùng khi cần.",rf:"{mis} sợ, đốt cuốn sổ."}]}},
 E:{win:{k:1,tag:"Sự thật ra ánh sáng",w:"emp",t:"Hoàng thượng đọc sổ. Phúc An và mấy thái giám bị xử, cung {v} bị phạt bổng và cấm túc. Tên Xuân Đào được trả lại sạch.",fx:{danh:5},go:A=>{rdOan(A,"v",12);return e67merit(5)}},
  mid:{k:0,tag:"Sự thật bị chôn một nửa",t:"Xuân Đào trắng án, nhưng cuốn sổ nằm im trong ngăn kéo. Cung {v} biết ngươi đã thả nó.",fx:{tamco:1},go:A=>{rdOan(A,"v",3)}},
  lose:{k:-1,tag:"Cuốn sổ bị đốt",w:"eun",t:"Cuốn sổ bị đốt trong lò Nội vụ phủ. Không còn gì chứng minh Xuân Đào vô tội ngoài lời ngươi.",fx:{danh:-3},go:A=>{rdOan(A,"v",4)}}}});

rdDef("cnv_ban",11,{t:"Đồng hương",w:"maid",sj:"số phận của Xuân Đào",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"])},
 g:"Chuyện chiếc vòng ngọc đi đến hồi cuối. Xuân Đào được trả lại tên sạch, được về quê hay mất hẳn, tùy những gì ngươi làm bây giờ. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Túi thơm hoa đào",w:"maid",if:RDW(1),t:BAN_T("Sổ đã lên ngự án. Tối ấy Xuân Đào ngồi bên cửa sổ phòng kẻ hầu, khâu cho ngươi chiếc túi thơm thêu hoa đào quê nhà.","Sổ đã lên ngự án. Tối ấy Xuân Đào sang cung ngươi, khâu cho ngươi chiếc túi thơm thêu hoa đào quê nhà."),o:[
  {n:"Ngồi khâu cùng nàng",c:{danh:-2},w:{duc:2},f:"stay",wx:"hai chị em gần nhau như thuở mới vào",lx:"một đêm không làm gì khác, người ta bảo ngươi lơ là, tiếng sút",rt:"Hai chị em hát khẽ bài hát làng."},
  {n:"Hỏi nàng muốn gì sau này",c:{duc:-2},w:{tamco:1},wx:"biết lòng nàng",lx:"câu trả lời làm ngươi buồn, lòng nặng trĩu",rt:"Xuân Đào cười: “Muội chưa dám nghĩ.”"},
  {n:"Tặng nàng một món bạc",c:{bac:-20},w:{duc:2},f:"home",wx:"nàng có vốn phòng thân",lx:"bạc trong hộp vơi đi một khoản",rt:"Xuân Đào không nhận, ngươi phải nhét vào tay nàng."}]},
 s2:{h:"Xuân Đào gầy đi",w:"maid",if:RDW(0),t:"Sự thật chưa ra ánh sáng. Xuân Đào gầy đi từng ngày, còn cung {v} vẫn sai người đi qua cửa phòng nàng mỗi tối.",o:[
  {n:"Đổi chỗ ngủ cho nàng",c:{suc:-2},w:{duc:2},wx:"nàng ngủ yên hơn",lx:"lo dời chỗ đến rã người; người của {v} sẽ tìm ra",rt:"Xuân Đào ngủ được một đêm trọn."},
  {n:"Đến cung {v} cảnh cáo",need:["v"],c:{suc:-3},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"{v} lùi một bước",l:{danh:-2},lx:"{v} thêm oán, tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?8:6)},rt:"{v} cười nhạt, nhưng người đi qua cửa không còn nữa.",rf:"{v} cho người tiễn ngươi ra cửa."},
  {n:"Nhờ {mis} che chở nàng",if:CNV_MOK,c:{},o:()=>40+S.duc/4,w:{tamco:1},sc:1,wx:"có người trên bảo vệ nàng",l:{duc:-2},lx:"{mis} không muốn dính, lòng ngươi áy náy vì làm phiền chủ",go:(A,ok)=>{if(ok)BAN_MIS(2)},rt:"{mis} cho Xuân Đào về hầu gần phòng mình.",rf:"{mis} nói: “Ta đã làm đủ rồi.”"}]},
 c1:{h:"Thư từ làng",w:"maid",t:"Mẹ Xuân Đào gửi thư vào cung: nhà có người hỏi cưới, mong con được xuất cung trước Tết.",o:[
  {n:"Góp bạc lo đường xuất cung",c:{bac:-40},w:{duc:2},f:"home",wx:"Xuân Đào có đường về",lx:"bạc trong hộp vơi đi một khoản lớn",rt:"Người của Nội vụ phủ nhận bạc, ghi tên Xuân Đào vào danh sách xuất cung."},
  {n:"Giữ thư lại, chờ xong việc",c:{duc:-2},w:{tamco:1},f:"stay",wx:"Xuân Đào không bị phân lòng",lx:"giấu thư của mẹ người ta, lòng ngươi áy náy",rt:"Ngươi cất thư vào hộp."},
  {n:"Đọc thư cùng Xuân Đào",c:{danh:-2},w:{duc:2},wx:"nàng tự chọn",lx:"nàng khóc cả đêm, người ta bảo ngươi khơi chuyện nhà, tiếng sút",rt:"Xuân Đào đọc thư, khóc rồi cười."}]},
 c2:{h:"Thu Cúc ở Tân Giả khố",w:"me",t:"Thu Cúc nay giặt áo ở Tân Giả khố, gầy rộc. Nàng nhờ người nhắn muốn gặp ngươi.",o:[
  {n:"Đến gặp Thu Cúc",c:{suc:-2},o:A=>40+S.duc/4+(A.f.mercy?15:0),w:{mat:1},sc:1,f:"confess",wx:"Thu Cúc nói điều chưa ai biết",l:{danh:-2},lx:"bị cho là thông đồng với kẻ tội, tiếng ngươi sút",rt:"Thu Cúc nói: “Ta sẽ khai hết. Ta không muốn chết với cái tên của cung {v}.”",rf:"Thu Cúc chỉ khóc, không nói được gì."},
  {n:"Gửi thuốc, không gặp",c:{bac:-10},w:{duc:2},wx:"Thu Cúc biết ngươi không thù",lx:"tốn bạc mua thuốc; bỏ lỡ điều nàng muốn nói",rt:"Thu Cúc nhận thuốc, nhờ người gửi lại một chữ: «Tạ»."},
  {n:"Không đến",c:{danh:-2},w:{suc:2},wx:"không dây thêm",lx:"lời Thu Cúc chôn theo nàng, người ta bảo ngươi lạnh lòng, tiếng sút",rt:"Ngươi không đi."}]},
 t1:{h:"Xuân Đào hỏi",w:"maid",t:"Xuân Đào hỏi: “Tỷ muốn muội ở lại hay về?”",o:[
  {n:"Ở lại cùng tỷ",c:{duc:-2},w:{tamco:1},f:"stay",wx:"có người một lòng bên cạnh",lx:"giữ nàng trong nơi nguy hiểm, lòng ngươi áy náy",rt:"Xuân Đào gật đầu, nắm chặt tay ngươi."},
  {n:"Về đi, sống cho mình",c:{danh:-2},w:{duc:3},f:"home",wx:"nàng được tự do",lx:"ngươi ở lại một mình, mất người canh lưng, tiếng sút",rt:"Xuân Đào ôm ngươi rất lâu."},
  {n:"Tùy muội",c:{danh:-2},w:{duc:1},wx:"nàng tự quyết",lx:"nàng thấy ngươi lạnh, người ta chê ngươi, tiếng sút",rt:"Xuân Đào im lặng một lúc: “Để muội nghĩ.”"}]},
 x1:{h:"Ngày tuyên án vòng ngọc",w:"maid",t:BAN_T("Nội vụ phủ tuyên án vụ vòng ngọc. Xuân Đào quỳ giữa sân, như ngày đầu bị trói ở sân sau.","Nội vụ phủ tuyên án vụ vòng ngọc. Xuân Đào quỳ giữa sân, như ngày đầu bị trói ở sân sau. Ngươi là tiểu chủ, không xuống sân được: lời ngươi đi qua tờ đóng dấu cung và thái giám cung ngươi."),o:[
  {n:"Đưa Xuân Đào ra trước Nội vụ phủ đòi minh oan",need:["srv"],c:{suc:-5},o:A=>35+(A.f.stay?10:0)+(A.f.confess?10:0)+S.danh/6,lx:"thua là cả hai cùng mất",e:["win","lose"],rt:"Nội vụ phủ đọc to: Xuân Đào vô tội.",rf:"Nội vụ phủ giữ nguyên án cũ."},
  {n:"Sai thái giám cung mình mang tờ đòi minh oan cho Xuân Đào",need:["nsrv"],c:{suc:-5},o:A=>35+(A.f.stay?10:0)+(A.f.confess?10:0)+S.danh/6,lx:"viết tờ đến kiệt sức; thua là cả hai cùng mất",e:["win","lose"],rt:"Thái giám cung ngươi đọc tờ ấy giữa sân. Nội vụ phủ đọc to: Xuân Đào vô tội.",rf:"Nội vụ phủ nhận tờ, rồi giữ nguyên án cũ."},
  {n:"Xin cho Xuân Đào xuất cung với tên sạch",c:{bac:-30},o:A=>45+S.duc/5+(A.f.home?15:0),lx:"bạc lo đường đã bỏ ra; mất người cùng quê bên cạnh, hỏng thì mất hẳn Xuân Đào",e:["mid","lose"],rt:"Tên Xuân Đào được xóa khỏi sổ tội, ghi vào sổ xuất cung.",rf:"Nội vụ phủ không cho xuất cung người còn mang án."},
  {n:"Nhận một phần tội về mình để nàng sạch",need:["srv"],c:{danh:-5},w:{duc:3},e:"mid",lx:"tên ngươi vào sổ tội, tiếng sút nặng",rt:"Ngươi bước ra quỳ cạnh Xuân Đào."},
  {n:"Viết tờ nhận một phần lỗi về cung mình để nàng sạch",need:["nsrv"],c:{danh:-4,bac:-20},w:{duc:3},e:"mid",lx:"tên ngươi vào sổ lỗi, tiếng sút; nộp bạc chuộc lỗi thay nàng",rt:"Thái giám cung ngươi đọc tờ ấy giữa sân. Tên ngươi vào sổ lỗi, tên Xuân Đào được xóa."}]}},
 E:{win:{k:1,tag:"Xuân Đào rửa oan, một lòng theo ngươi",w:"maid",t:BAN_T("Xuân Đào được minh oan trước cả Nội vụ phủ. Nàng ở lại trong cung, làm cánh tay của ngươi: đi đâu ngươi có người canh lưng, nói gì ngươi có người tin.","Xuân Đào được minh oan trước cả Nội vụ phủ. Nàng xin về hầu cung ngươi, và từ đó cung ngươi có một người không bao giờ phản."),fx:{danh:6,duc:3},go:A=>{rdOan(A,"v",6);return [BAN_NT(10),e67srvUp(6)].filter(Boolean).join(" ")}},
  mid:{k:0,tag:"Rửa oan, về quê",w:"maid",t:"Xuân Đào được xóa tên khỏi sổ tội và xuất cung về làng trước Tết. Mỗi mùa đào nở, nàng gửi vào cho ngươi một chiếc khăn thêu.",fx:{duc:4}},
  lose:{k:-1,tag:"Mất Xuân Đào",w:"maid",t:"Án giữ nguyên. Xuân Đào bị đưa ra Hoàng lăng coi mộ, xa kinh thành ba ngày đường. Ngươi ở lại, mang theo chiếc túi thơm hoa đào nàng khâu dở.",fx:{danh:-4,duc:-2},go:()=>BAN_MIS(-4)}}});
RD97L.push({a:"cnv_ban_11",tag:"Thu Cúc tự thú, hai chị em cùng lên",w:"maid",p:.12,n:"Đưa Thu Cúc đến trước Nội vụ phủ tự thú",c:{suc:-4},
 path:["Đến gặp Thu Cúc","Gửi thuốc, không gặp","Ở lại cùng tỷ","Đọc thư cùng Xuân Đào","Ngồi khâu cùng nàng","Nhờ {mis} che chở nàng"],np:2,bad:["Không đến","Giữ thư lại, chờ xong việc","Tùy muội"],sc:2,x:[()=>S.duc>=35||S.mat>=2,"Đức từ 35 hoặc Tai mắt từ 2"],
 t:"Thu Cúc bước vào sân Nội vụ phủ, quỳ cạnh Xuân Đào, khai từng món đồ, từng nén bạc, từng lần cung {v} sai. Cả sân lặng đi. {eun} không ém được nữa. Xuân Đào được minh oan, còn được thưởng vì chịu oan mà không cắn ai; ngươi được ghi công vì đã không bỏ tỷ muội. Từ ngày ấy, hai chị em cùng quê cùng bước lên, và trong cung người ta gọi hai người là «đôi hoa đào».",
 fx:{danh:10,duc:4},go:A=>{try{rdOan(A,"v",10)}catch(e){}return [BAN_NT(12),e67srvUp(8)].filter(Boolean).join(" ")},rw:"nt_nhuy",ti:"Đôi hoa đào cùng quê"});
CNV_QFIX("cnv_ban");

/* ---------- cnv_mat · Ánh mắt nơi hành lang ---------- */
/* BAL.road keys needed: none (the .8 rise reads the game's own BAL.ntRise.at; everything else is inline per option like the pilot).
   Two states (ROAD_MAP §8.4): she may still be a maid (isSrv) or already raised (S.srv.risen). Texts are functions that read the state;
   options split with need:["srv"] (still a maid) / need:["nsrv"] (raised); maid-only effects (tin, nt, e67merit) only through matSrv.
   {mis} = her (former) mistress, kept once in S.st.f14.act.mis (CNV_MC, _hd_cnv.js; never the woman j42 reassigns her to). The road is
   the bond with her, so .5–.9 need her alive (cast false when she is gone, told once); .10/.11 run on, her options carry if:MATM.
   Sủng is 0 while she serves (j42), so every option that pays or costs Sủng is split by MAT2: the consort keeps Sủng (need nsrv), the maid
   twin pays or costs «Hoàng thượng để ý» (need srv, j42/j67 convention).
   The road: the Emperor's gaze (.4) → the mistress's jealousy (.5) → meet him or hide (.6) → the Kính sự phòng register (.7) →
   the first night, the only chapter that may raise her (.8) → facing the mistress as a near equal (.9) → {v}'s seduction rumour (.10) →
   what the gaze becomes (.11). {v} = the consort who wanted to buy her in .4, cast once and kept (never the mistress). */
const MATR=()=>!!(S.srv&&S.srv.risen);
const MATT=(m,c)=>A=>{const x=MATR()?c:m;return typeof x==="function"?x(A):x};
const MATM=()=>CNV_MOK();/* the road's mistress is alive and in her palace */
const matMis=(n,o)=>{const m=CNV_MIS();if(!m||!m.alive)return;if(n)relAdd(S,m,n);if(o)oanAdd(m,S,o)};
/* maid-only effects; Chủ tin only while the road's mistress is still the one she serves */
const matSrv=o=>{if(!S.srv||S.srv.risen)return"";if(o&&"tin" in o&&!CNV_MCUR()){o=Object.assign({},o);delete o.tin}ap67(o);try{return fmt(o)}catch(e){return""}};
const matCon=o=>{if(!MATR())return"";ap67(o);try{return fmt(o)}catch(e){return""}};
const MATV={v:x=>x.id!==CNV_MID()&&x.id!==(S.srv&&S.srv.mid)};
/* one option, two states (review road-b3-r1 item 3): consort version on Sủng (need nsrv), maid twin with the overrides m on «Hoàng thượng để ý» (need srv) */
const MAT2=(o,m)=>[Object.assign({},o,{need:(o.need||[]).concat("nsrv")}),Object.assign({},o,{need:(o.need||[]).concat("srv")},m)];

rdDef("cnv_mat",5,{t:"Chủ nhân ghen",w:"mis",sj:"cơn ghen của {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"],MATV)},
 g:MATT("Từ đêm Trung thu, {mis} nhìn ngươi như nhìn cái gai trong mắt. Nàng đày ngươi làm việc nặng, chờ ngươi tự ngã. Chịu đựng, né tránh, hay tìm chỗ dựa khác.",
  "Ngươi nay là tiểu chủ, nhưng {mis} vẫn coi ngươi là nô tỳ cũ của nàng. Trước mặt cả hậu cung, nàng muốn ngươi cúi đầu như xưa. Cúi, ngẩng, hay tìm chỗ dựa khác."),
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sau lời hỏi xin",w:"mis",if:()=>rdK()>0&&rdPrev()!=="win2",t:MATT("Hoàng thượng đã hỏi xin ngươi, nhưng thánh chỉ chưa xuống. Trong lúc chờ, {mis} sai ngươi ra hậu viện giặt áo giữa tháng rét: “Muốn lên cao thì tập quen đất lạnh trước.”",
   "Thánh chỉ đã xuống, ngươi dọn khỏi dãy nhà cung nữ. Sáng hôm sau thỉnh an, {mis} nói đủ cho cả điện nghe: “Nô tỳ của ta, mặc áo mới vẫn là nô tỳ của ta.”"),o:[
  {n:"Cắn răng giặt áo",need:["srv"],c:{suc:-6},w:{tin:5},f:"bear",wx:"chủ thấy ngươi biết phận",lx:"tay nứt nẻ, ngươi kiệt sức, mà Hoàng thượng chẳng thấy ngươi",rt:"Mười ngày sau, {mis} cho ngươi về hầu trà. Nàng không nói gì, nhưng thôi lườm."},
  {n:"Nhờ tiểu thái giám truyền tin cho Hoàng thượng",need:["srv"],c:{bac:-8},o:()=>40+S.nt/4,w:{nt:8},sc:1,f:"bold",wx:"ngài biết ngươi bị đày",l:{tin:-10},lx:"chủ biết ngươi mách, Chủ tin sút; bạc mua miệng mất trắng",rt:"Hoàng thượng sai người mang lò sưởi tay ra hậu viện. Cả cung im phắc.",rf:"Tiểu thái giám nhận bạc rồi đem chuyện kể cho {mis}."},
  {n:"Cúi đầu đáp lễ như xưa",need:["nsrv"],c:{danh:-3},w:{duc:3},f:"bear",wx:"người ta thấy ngươi không quên gốc",lx:"bị cười là còn nô tính, tiếng ngươi sút",go:()=>matMis(4),rt:"Ngươi cúi đầu. {mis} sững lại, rồi quay đi không nói nữa."},
  {n:"Đáp: nay thiếp cùng hầu Hoàng thượng như tỷ",need:["nsrv"],c:{suc:-2},o:()=>40+S.tai/4+S.danh/5,w:{danh:3},sc:1,f:"bold",wx:"cả điện nể ngươi",l:{sung:-2},lx:()=>`thành chuyện cãi nhau trước ${CNV_QM()==="emp"?"cả điện":"Hoàng hậu"}, Hoàng thượng phiền, Sủng sút; {mis} thêm oán`,go:(A,ok)=>matMis(0,ok?8:4),rt:"Câu đáp vừa đủ lễ vừa đủ cứng. {mis} đỏ mặt, không cãi được.",rf:"Hoàng hậu nhíu mày: “Mới lên đã học cãi.”"},
  {n:"Lặng lẽ tìm {v} xin chỗ dựa",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người che chở",l:{danh:-2},lx:"{v} trở mặt, đồn ngươi đi cầu cạnh, tiếng sút; lòng ngươi áy náy vì tìm kẻ thù của chủ cũ",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} mỉm cười: “Người ta không thương ngươi, ta thương.”",rf:"{v} chỉ hứa suông, rồi đem chuyện ra làm trò cười."}]},
 s2:{h:"Chủ tiến cử rồi hối",w:"mis",if:()=>rdPrev()==="win2",t:MATT("Chính {mis} tự tay tiến cử ngươi. Nhưng từ đó Hoàng thượng đến cung chỉ hỏi “con bé pha trà đâu”. Đêm qua nàng ngồi một mình rất lâu, sáng nay sai ngươi trực đêm suốt một tháng.",
   "Chính {mis} tiến cử ngươi lên. Nay ngài đến cung ngươi nhiều hơn đến cung nàng. Nàng gửi sang một hộp bánh, kèm một lời: “Đừng quên ai đã mở cửa cho ngươi.”"),o:[
  {n:"Trực đêm không than",need:["srv"],c:{suc:-5},w:{tin:6},f:"bear",wx:"chủ nguôi dần",lx:"thức trắng, sức tàn",rt:"Đến đêm thứ hai mươi, {mis} khoác cho ngươi tấm áo bông của nàng."},
  {n:"Thưa thật với chủ: nô tỳ không dám quên ơn",need:["srv"],c:{},o:()=>45+S.tin/4,w:{tin:8},sc:1,f:"bear",wx:"chủ tin lời ngươi",l:{tin:-6},lx:"chủ cho là ngươi khéo miệng, Chủ tin sút",go:(A,ok)=>matMis(ok?6:-3),rt:"{mis} thở dài: “Ta biết. Chỉ là ta sợ.”",rf:"{mis} cười nhạt: “Miệng ngươi ngọt thật.”"},
  {n:"Đáp lễ hậu hơn",need:["nsrv"],c:{bac:-30},w:{duc:3},f:"bear",wx:"nàng thấy ngươi nhớ ơn",lx:"tốn bạc, nàng vẫn ghen",go:()=>matMis(6),rt:"Ngươi gửi lại một bộ trâm. {mis} cầm lên ngắm rất lâu."},
  {n:"Khuyên Hoàng thượng đến cung {mis}",need:["nsrv"],c:{sung:-3},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"bear",wx:"{mis} biết ngươi nhường",l:{sung:-2},lx:"đẩy ngài đi là mất ơn, Sủng sút; hỏng thì ngài phật ý, sút thêm",go:(A,ok)=>matMis(ok?10:2),rt:"Đêm ấy ngài ngự cung {mis}. Sáng ra nàng sai người mang sang một đĩa mứt.",rf:"Ngài cau mày: “Trẫm đi đâu, không cần nàng xếp.”"},
  {n:"Gặp {v} hỏi chuyện cung {mis}",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"biết nàng sắp làm gì",l:{danh:-2},lx:"{v} khoe khắp nơi ngươi đến tìm, tiếng sút; lòng ngươi áy náy",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} kể: {mis} đã hỏi Kính sự phòng tên ngươi.",rf:"{v} đem chuyện kể lại cho {mis}."}]},
 s3:{h:"Bị đày việc nặng",w:"mis",if:RDW(0),t:MATT("Sau đêm Trung thu, {mis} đẩy ngươi xuống bếp sau, ngày gánh nước, đêm canh lò. Ai nhắc tên ngươi trước mặt nàng đều bị phạt.",
   "Ngươi đã được phong, nhưng {mis} đi khắp các cung kể chuyện ngươi từng làm vỡ chén, từng ăn vụng, từng bị phạt quỳ. Chuyện cũ thành trò cười mới."),o:[
  {n:"Gánh nước, không nói một lời",need:["srv"],c:{suc:-6},w:{duc:3,tin:3},f:"bear",wx:"cả bếp thương ngươi",lx:"gánh nước đến kiệt sức, Hoàng thượng không thấy ngươi nữa",rt:"Lão thái giám bếp lén cho ngươi bát cháo nóng."},
  {n:"Hát khẽ bài dân ca bên giếng",need:["srv"],c:{},o:()=>35+S.sac/4,w:{nt:10},sc:1,f:"bold",wx:"có người đứng nghe",l:{tin:-8},lx:"chủ cho là ngươi cố ý, Chủ tin sút",rt:"Sáng hôm sau, ngự thiện phòng nhận lệnh: “Ai hát bên giếng, cho về hầu trà.”",rf:"Người nghe là chưởng sự, mách lại với {mis}."},
  {n:"Cười mà nhận hết",need:["nsrv"],c:{danh:-3},w:{duc:4},f:"bear",wx:"người ta thấy ngươi rộng lượng",lx:"chuyện cũ càng lan, tiếng ngươi sút",rt:"Ngươi cười: “Đúng là thiếp từng làm vỡ chén của tỷ.” Câu chuyện tự nhạt."},
  {n:"Kể lại một chuyện cũ của {mis}",need:["nsrv"],c:{duc:-3},o:()=>40+S.tamco/4,w:{danh:2},sc:1,f:"bold",wx:"nàng biết ngươi cũng có chuyện để nói",l:{danh:-3},lx:"thành ra hai người cùng mất mặt, tiếng sút; lòng ngươi áy náy, {mis} thêm oán",go:()=>matMis(0,6),rt:"{mis} im bặt. Từ đó nàng thôi kể.",rf:"Cả hậu cung bàn tán cả hai."},
  {n:"Lặng lẽ tìm {v} xin chỗ dựa",c:{duc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người che chở",l:{danh:-2},lx:"{v} trở mặt, đồn ngươi đi cầu cạnh, tiếng sút; lòng ngươi áy náy vì tìm kẻ thù của chủ cũ",go:(A,ok)=>{rdRel(A,"v",ok?6:-3)},rt:"{v} cho người đến xin ngươi sang giúp việc vài hôm.",rf:"{v} cười, bảo ngươi tự lo."}]},
 c1:{h:"Một chén trà bị đổ",w:"mis",t:MATT("Hoàng thượng ghé cung. {mis} cố ý gọi ngươi dâng trà, rồi hất tay áo cho chén trà đổ lên long bào.",
   "Yến nhỏ ở cung Hoàng hậu. {mis} cố ý gọi ngươi rót trà như thuở còn hầu nàng, rồi hất tay áo cho chén trà đổ lên vạt áo Hoàng thượng."),o:[
  {n:"Quỳ nhận lỗi về mình",c:{suc:-4},w:{duc:4},f:"bear",wx:"không ai bị kéo vào",lx:"quỳ đến rã gối, bị phạt oan",go:()=>{matMis(4);return matSrv({tin:4})},rt:"Hoàng thượng phẩy tay: “Thôi.” Ngài nhìn {mis} lâu hơn một chút."},
  ...MAT2({n:"Lau áo cho ngài, nói khẽ một câu",c:{},o:()=>40+S.sac/4+S.tai/6,w:{sung:2},sc:1,f:"bold",wx:"ngài cười",l:{danh:-3},lx:"bị nói là lẳng lơ trước mặt chủ, tiếng sút; {mis} thêm oán",go:(A,ok)=>{matMis(0,ok?6:3)},rt:"Ngài bật cười, quên cả chén trà.",rf:"Ngài lạnh mặt đứng dậy."},{w:{nt:6}}),
  {n:"Lặng lẽ cho người thấy tay {mis} hất",c:{},o:()=>35+S.tamco/3,w:{tamco:2},sc:1,wx:"có người làm chứng",l:{duc:-2},lx:"{mis} biết ngươi đề phòng nàng, thêm oán; lòng ngươi áy náy",go:(A,ok)=>matMis(0,ok?8:4),rt:"Một tiểu thái giám thấy rõ. Chuyện đến tai ngài.",rf:"Không ai dám nói đã thấy."}]},
 c2:{h:"{v} đưa tay",w:"v",t:MATT("{v} lại sai người đến: nếu ngươi chịu sang hầu nàng, nàng sẽ xin Nội vụ phủ đổi người. Nàng chỉ cần ngươi kể chuyện cung {mis}.",
   "{v} mời ngươi đến thưởng hoa, nói nhỏ: “Nàng ta ghen, ai cũng thấy. Ngươi đứng với ta, ta che cho ngươi.” Cái giá là những chuyện ngươi biết về cung {mis}."),o:[
  {n:"Nhận lời {v}",c:{duc:-4},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"v",wx:"có người đứng sau",l:{danh:-3},lx:"thành kẻ phản chủ cũ, lòng ngươi cắn rứt, {mis} bớt tin; hỏng thì tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?10:-4);matMis(-6);return matSrv({tin:-8})},rt:"{v} nắm tay ngươi: “Từ nay là người nhà.”",rf:"{v} lấy được tin rồi trở mặt."},
  {n:"Từ chối, báo {mis}",if:MATM,c:{danh:-1},w:{duc:3},wx:"người cũ biết ngươi giữ lòng",lx:"{v} phật ý, thêm oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",6);matMis(6);return matSrv({tin:6})},rt:"{mis} nghe xong, im rất lâu."},
  {n:"Đưa {v} tin vặt, giữ lại tin thật",c:{},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,wx:"cả hai bên đều tưởng ngươi theo mình",l:{danh:-3},lx:"lộ thì cả hai cùng ghét, {v} thêm oán, tiếng ngươi sút",go:(A,ok)=>{if(!ok)rdOan(A,"v",8)},rt:"{v} hài lòng với mấy chuyện vặt.",rf:"{v} nhận ra ngươi đùa nàng."}]},
 t1:{h:"Chủ ra lệnh cuối",w:"mis",if:MATM,t:MATT("{mis} gọi ngươi vào: “Ta cho ngươi chọn: ở lại hầu ta trọn đời, ta tiến cử ngươi lên Đại cung nữ. Hoặc đi, và đừng mong ai ở cung này nhắc tên ngươi.”",
   "{mis} hẹn ngươi ở đình sau: “Ngươi muốn yên, thì mỗi lần ngài đến cung ngươi, ngươi khuyên ngài sang ta một đêm. Không thì ta kể hết chuyện ngươi hầu ta năm xưa.”"),o:[
  ...MAT2({n:"Hứa với {mis}",c:{sung:-3},w:{duc:3},f:"bear",wx:"người cũ yên lòng",lx:"buộc mình vào lời hứa, phải lùi trước Hoàng thượng, Sủng sút",go:()=>{matMis(8);return matSrv({tin:8})},rt:"{mis} gật đầu: “Nhớ lấy.”"},{c:{nt:-5},lx:"buộc mình vào lời hứa hầu trọn đời, Hoàng thượng để ý sút"}),
  {n:"Xin {mis} cho ngươi tự đi đường mình",c:{suc:-3},o:()=>40+S.duc/4,w:{danh:2},sc:1,f:"bold",wx:"không còn nợ ai",l:{danh:-2},lx:"{mis} giận, thêm oán; tiếng sút; ngươi mệt rã",go:(A,ok)=>{if(!ok)matMis(-6,6)},rt:"{mis} quay mặt: “Đi đi.” Giọng nàng không còn giận.",rf:"{mis} đập vỡ chén: “Rồi ngươi xem.”"},
  {n:"Im lặng lui ra",c:{danh:-2},w:{tamco:2},wx:"không hứa gì",lx:"{mis} hiểu là ngươi từ chối, bớt thương; người ta bảo ngươi lạnh, tiếng sút",go:()=>matMis(-3),rt:"Ngươi lui ra. Sau lưng, nàng gọi mãi tên ngươi."}]},
 x1:{h:"Trước mặt Hoàng thượng",w:"emp",t:MATT("Hoàng thượng thấy tay ngươi nứt nẻ, hỏi: “Ai bắt ngươi làm việc này?” {mis} đứng ngay đó, mặt trắng bệch.",
   "Hoàng thượng nghe lời đồn ở cung {mis}, hỏi ngươi: “Nàng ta làm khó nàng?” {mis} đứng ngay đó, mặt trắng bệch."),o:[
  {n:"Thưa: là phận sự, không ai bắt",c:{suc:-3},o:A=>40+(A.f.bear?15:0)+S.duc/5,e:["win","mid"],rt:"Ngài nhìn ngươi, rồi nhìn {mis}: “Người của nàng biết giữ thể diện cho nàng.”",rf:"Ngài gật đầu, không nói thêm."},
  {n:"Thưa thật, xin ngài xét",c:{duc:-2},o:A=>35+(A.f.bold?15:0)+S.sac/5,e:["win","lose"],rt:"Ngài phạt {mis} cấm túc nửa tháng, ban cho ngươi một bình thuốc mỡ.",rf:"Ngài cho là ngươi mách lẻo, quay đi."},
  {n:"Nhìn sang {v} cầu cứu",c:{},o:A=>40+(A.f.v?15:0)+S.tamco/5,e:["mid","lose"],lx:"nợ {v} một lần; hỏng thì {v} trở mặt",go:(A,ok)=>{rdRel(A,"v",ok?4:-4)},rt:"{v} nói giúp một câu, chuyện êm.",rf:"{v} lảng mắt đi chỗ khác."}]}},
 E:{win:{k:1,tag:"Cơn ghen lắng xuống",w:"emp",t:MATT("Hoàng thượng nói một câu, cả cung hiểu: người ngài nhìn thì đừng ai đày đọa. {mis} thôi làm khó ngươi, dù trong mắt nàng vẫn còn gai.",
   "Hoàng thượng nói một câu, cả hậu cung hiểu: tiểu chủ mới không phải nô tỳ của ai nữa. {mis} thôi kể chuyện cũ, dù trong mắt nàng vẫn còn gai."),fx:{danh:4},go:A=>{matMis(4);return [matSrv({nt:8,tin:4}),matCon({sung:3})].join(" ")}},
  mid:{k:0,tag:"Ghen ngầm",t:"Không ai bị phạt. {mis} thôi ra mặt, nhưng ngươi biết nàng chỉ đang chờ.",fx:{duc:2},go:()=>matSrv({nt:3})},
  lose:{k:-1,tag:"Chủ cũ thành kẻ thù",w:"mis",t:MATT("{mis} thắng ván này. Ngươi bị đẩy xuống bếp sau, Hoàng thượng ít thấy ngươi hơn, và cả cung biết nàng ghét ngươi.",
   "{mis} thắng ván này. Hậu cung cười chuyện cũ của ngươi, Hoàng thượng ngại đến cung ngươi, và nàng không giấu nữa: nàng ghét ngươi."),fx:{danh:-3},go:()=>{matMis(-8,10);return [matSrv({tin:-10,nt:-3}),matCon({sung:-3})].join(" ")}}}});

rdDef("cnv_mat",6,{t:"Tránh hay gặp",w:"emp",sj:"những lần Hoàng thượng tìm ngươi",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"],MATV)},
 g:MATT("Hoàng thượng bắt đầu tìm cớ gặp ngươi: một lời gọi qua tiểu thái giám, một lần đi lạc vào hậu viện. Gặp thì {mis} biết, tránh thì ngài quên.",
  "Từ ngày sắc phong, ngài chưa một lần lật thẻ của ngươi, nhưng hễ gặp là nhìn. Ngài đang chờ ngươi bước tới, hay chờ ngươi giữ mình. Đi tìm ngài, hay chờ."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một lời gọi",w:"eun",if:RDW(1),t:MATT("Một tiểu thái giám của Dưỡng Tâm điện lén dúi vào tay ngươi mảnh giấy: “Giờ Tuất, rừng mai sau Ngự hoa viên.” Không có chữ ký, nhưng ai cũng biết là của ai.",
   "Tiểu thái giám Dưỡng Tâm điện mang đến một cành mai: “Hoàng thượng bảo, mai ở rừng sau Ngự hoa viên đã nở.” Đêm nay ngài không lật thẻ ai."),o:[
  ...MAT2({n:"Giờ Tuất đến rừng mai",c:{suc:-2},o:()=>40+S.sac/4,w:{sung:2},sc:1,f:"meet",wx:"ngài thấy ngươi đến",l:{danh:-3},lx:"có người thấy ngươi ra khỏi cung ban đêm, tiếng sút; {mis} thêm oán",go:(A,ok)=>{if(!ok)matMis(0,4)},rt:"Ngài đứng dưới gốc mai, không nói gì, chỉ khoác áo choàng lên vai ngươi.",rf:"Người của {mis} thấy ngươi đi."},{w:{nt:10}}),
  {n:"Gửi lại cành mai, không đến",c:{danh:-2},w:{duc:3},f:"hide",wx:"giữ được thân",lx:"ngài chờ một mình, người ta bảo ngươi phụ ơn trên, tiếng sút",go:()=>matSrv({tin:4}),rt:"Ngươi cắm cành mai vào bình, đứng nhìn rất lâu."},
  {n:"Hỏi tiểu thái giám ai sai",c:{bac:-5},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,wx:"không bị lừa",l:{danh:-2},lx:"tiểu thái giám mách lại, tiếng ngươi sút; bạc mất trắng",rt:"Đúng là lời ngài. Ngươi biết đây không phải bẫy.",rf:"Tiểu thái giám nói dối, rồi kể khắp nơi ngươi đa nghi."}]},
 s2:{h:"Ngài không còn ghé",w:"emp",if:RDW(0),t:MATT("Đã một tháng Hoàng thượng không ghé cung {mis}. Ngươi nghe nói ngài thường dạo một mình ở hồ sen lúc chạng vạng.",
   "Đã một tháng ngài không đến cung ngươi. Ngươi nghe nói ngài thường dạo một mình ở hồ sen lúc chạng vạng, và đêm nào {mis} cũng sai người đứng chờ ở đó."),o:[
  ...MAT2({n:"Đi qua hồ sen như tình cờ",c:{suc:-2},o:()=>35+S.sac/4,w:{sung:2},sc:1,f:"meet",wx:"ngài thấy ngươi",l:{danh:-2},lx:"bị nói là rình rập, tiếng ngươi sút",rt:"Ngài dừng bước: “Lại là nàng.” Giọng ngài vui.",rf:"Ngài đi lối khác. Người của {mis} thì thấy ngươi."},{w:{nt:10}}),
  {n:"Ở yên trong cung, thêu một chiếc túi thơm",c:{bac:-5},w:{duc:2},f:"hide",wx:"lòng yên",lx:"tốn bạc mua chỉ; ngài không biết ngươi chờ",rt:"Ngươi thêu cánh sen đến khuya."},
  ...MAT2({n:"Nhờ người dâng ngài một bình trà",c:{bac:-10},o:()=>40+S.tai/4,w:{sung:2},sc:1,wx:"ngài nhớ vị trà",l:{danh:-2},lx:"Ngự trà phòng biết ngươi nhờ vả, tiếng sút; bạc mất trắng",rt:"Ngài uống một ngụm, hỏi: “Ai pha?”",rf:"Bình trà bị Ngự trà phòng giữ lại."},{w:{nt:6}})]},
 c1:{h:"{mis} canh đường",w:"mis",if:MATM,t:"{mis} cho người canh mọi lối ra vào, ghi lại mỗi lần ngươi rời cung. Sổ ấy sẽ đến tay Hoàng hậu nếu ngươi sơ sẩy.",o:[
  {n:"Đi lối Ngự thiện phòng",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"meet",wx:"không ai ghi tên ngươi",l:{danh:-2},lx:"bị bắt gặp đi đường vòng, tiếng sút; bạc mất trắng",rt:"Lão thái giám bếp mở cửa sau cho ngươi.",rf:"Người canh ghi: “đi lối bếp, giờ Tuất.”"},
  {n:"Đến gặp {mis}, nói thẳng",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"nàng thôi canh",l:{danh:-2},lx:"nàng biết ngươi có chuyện giấu, bớt thương; tiếng sút",go:(A,ok)=>matMis(ok?6:-4),rt:"{mis} cười buồn: “Ngươi tưởng ta muốn canh sao?” Người canh rút đi.",rf:"{mis} canh chặt hơn."},
  {n:"Không đi đâu cả",c:{danh:-2},w:{duc:2},f:"hide",wx:"sổ trắng trơn",lx:"lỡ những lần ngài tìm, người ta bảo ngươi kiêu, tiếng sút",go:()=>matSrv({nt:-3}),rt:"Cả tháng ngươi không bước ra khỏi cổng."}]},
 c2:{h:"{v} mở cửa",w:"v",t:"{v} nhắn: Hoàng thượng hay ghé cung nàng sau giờ ngọ, ngươi cứ đến “giúp nàng cắm hoa”. Nàng cần ngươi nợ nàng.",o:[
  ...MAT2({n:"Đến cung {v}",c:{duc:-2},o:()=>45+S.sac/5,w:{sung:2},sc:1,f:"meet",wx:"gặp ngài ở chỗ không ai canh",l:{danh:-2},lx:"nợ {v}, lòng ngươi áy náy; hỏng thì tiếng sút",go:A=>{rdRel(A,"v",4)},rt:"Ngài thấy ngươi bên bình hoa, ngồi lại lâu hơn mọi khi.",rf:"Ngài không đến. {v} vẫn ghi ngươi một món nợ."},{w:{nt:8}}),
  {n:"Cảm ơn mà từ chối",c:{danh:-1},w:{duc:2},f:"hide",wx:"không nợ ai",lx:"{v} phật ý, thêm oán; tiếng sút",go:A=>{rdOan(A,"v",4)},rt:"{v} cười nhạt: “Rồi ngươi sẽ cần ta.”"},
  {n:"Báo cho {mis} biết {v} đang dụ ngươi",if:MATM,c:{},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,wx:"{mis} thấy ngươi không phản",l:{danh:-2},lx:"{v} biết ngươi mách, oán nặng; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?6:8);if(ok)matMis(6)},rt:"{mis} nghe, mắt dịu đi một chút.",rf:"{mis} không tin, {v} thì biết."}]},
 t1:{h:"Ngài hỏi thẳng",w:"emp",t:MATT("Lần gặp sau, Hoàng thượng hỏi khẽ: “Trẫm gọi, sao nàng không đến? Sợ chủ, hay không muốn?”",
   "Lần gặp sau, Hoàng thượng hỏi khẽ: “Trẫm phong nàng, mà nàng chưa một lần tìm trẫm. Sợ, hay không muốn?”"),o:[
  {n:"Thưa: sợ làm khó người cũ",c:{danh:-2},w:{duc:3},f:"hide",wx:"ngài thấy ngươi có tình nghĩa",lx:"ngài chờ thêm, người ta bảo ngươi nhát, tiếng sút",go:()=>matMis(4),rt:"Ngài gật đầu: “Trẫm hiểu.”"},
  ...MAT2({n:"Thưa: muốn, nhưng không dám",c:{},o:()=>40+S.sac/4+S.tai/6,w:{sung:3},sc:1,f:"meet",wx:"ngài cười",l:{danh:-2},lx:"lời ấy lọt ra ngoài, tiếng ngươi sút",rt:"Ngài cười, cài lại cây trâm lệch trên tóc ngươi.",rf:"Có tiếng chân sau hòn non bộ."},{w:{nt:8}}),
  {n:"Im lặng cúi đầu",c:{danh:-2},w:{tamco:2},wx:"không để lộ lòng",lx:"ngài không biết ngươi nghĩ gì, người ta bảo ngươi nhạt, tiếng sút",rt:"Ngài thở dài, bỏ đi trước."}]},
 x1:{h:"Đêm hội đèn",w:"emp",t:"Đêm hội đèn Nguyên tiêu, cả hậu cung ra Ngự hoa viên. Hoàng thượng đi giữa đám đèn, mắt tìm một người.",o:[
  {n:"Đứng chỗ đèn sáng nhất",c:{suc:-3},o:A=>35+(A.f.meet?15:0)+S.sac/5,e:["win","lose"],rt:"Ngài dừng trước mặt ngươi, chọn một chiếc đèn cá chép, đặt vào tay ngươi.",rf:"Ngài thấy ngươi cùng lúc với {mis}. Nàng kéo ngài đi."},
  {n:"Đứng sau, để ngài tự tìm",c:{danh:-2},o:A=>40+(A.f.hide?15:0)+S.duc/5,e:["win","mid"],lx:"đứng khuất sau đám đông, người ta bảo ngươi làm cao, tiếng sút; có thể ngài không tìm thấy, chuyện chỉ dừng ở giữa",rt:"Ngài vòng qua ba dãy đèn để đến chỗ ngươi.",rf:"Ngài nhìn quanh, rồi thôi."},
  {n:"Cáo ốm ở lại",c:{danh:-2},w:{duc:2},e:"mid",lx:"lỡ một đêm hội, chuyện chỉ dừng ở giữa",rt:"Ngươi ngồi bên cửa sổ nhìn đèn trôi."}]}},
 E:{win:{k:1,tag:"Gặp nhau dưới đèn",w:"emp",t:MATT("Chiếc đèn cá chép treo trên đầu giường ngươi. Cả cung biết: Hoàng thượng không còn nhìn trộm nữa, ngài nhìn thẳng.",
   "Chiếc đèn cá chép treo trước cửa cung ngươi. Cả hậu cung biết: ngài đã tìm đến người ngài phong."),fx:{danh:3},go:()=>{matMis(0,4);return [matSrv({nt:12}),matCon({sung:4})].join(" ")}},
  mid:{k:0,tag:"Lỡ một lần",t:"Ngài vẫn nhớ, ngươi vẫn giữ mình. Giữa hai người chỉ còn một khoảng hành lang.",fx:{duc:2},go:()=>matSrv({nt:3})},
  lose:{k:-1,tag:"{mis} chen giữa",w:"mis",t:"{mis} đứng giữa ngươi và ngài suốt đêm hội. Ngài đi với nàng, còn ngươi bị người ta nhìn thấy đứng chờ.",fx:{danh:-3},go:()=>{matMis(-4,6);return [matSrv({tin:-6}),matCon({sung:-2})].join(" ")}}}});

rdDef("cnv_mat",7,{t:"Kính sự phòng ghi tên",w:"eun",sj:"tên ngươi trong sổ Kính sự phòng",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"],MATV)},
 g:MATT("Hoàng thượng truyền Kính sự phòng ghi tên một cung nữ vào sổ. Từ khi tên ấy vào sổ đến đêm lật thẻ còn mười ngày: đủ để {mis} xin gạch, đủ để {v} mua chuộc.",
  "Thẻ xanh mang tên ngươi đã nằm trên khay Kính sự phòng, nhưng luôn ở dưới cùng. Trước kỳ lật thẻ tới, phải đưa thẻ lên, hoặc chấp nhận chờ."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tên đã vào sổ",w:"eun",if:RDW(1),t:MATT("Sáng nay, thái giám Kính sự phòng đến cung {mis}, đọc to tên ngươi. Cả cung quỳ nghe. {mis} cười, mà tay bóp nát cánh hoa.",
   "Thái giám Kính sự phòng đến tận cửa: “Hoàng thượng hỏi thẻ của tiểu chủ. Nô tài sẽ đặt lên trên, chỉ là… khay nặng lắm.” Hắn chờ bạc."),o:[
  {n:"Quỳ tạ, rồi tạ {mis}",need:["srv"],c:{danh:-2},w:{tin:6},wx:"chủ không thể nói ngươi vô ơn",lx:"phải cúi thêm một lần, người ta cười, tiếng sút",go:()=>matMis(4),rt:"{mis} đỡ ngươi dậy trước mặt mọi người."},
  {n:"Lặng lẽ nhận, không nói gì",need:["srv"],c:{tin:-3},w:{tamco:2},wx:"không để ai bắt lời",lx:"chủ cho là ngươi kiêu, Chủ tin sút",go:()=>matMis(-3),rt:"Ngươi về phòng, đóng cửa."},
  {n:"Đưa bạc cho thái giám, trước kỳ lật thẻ",need:["nsrv"],c:{bac:-40},w:{sung:2},wx:"thẻ lên trên",lx:"bạc trong hộp vơi một khoản, thành lệ, lần sau hắn lại đòi",rt:"Thái giám cúi gập người: “Tiểu chủ yên tâm.”"},
  {n:"Không đưa, chờ ngài tự lật",need:["nsrv"],c:{},o:()=>35+S.sung/3,w:{duc:3},sc:1,wx:"tay sạch",l:{sung:-2},lx:"thẻ nằm dưới thêm một tháng, Sủng sút",rt:"Ngài lật thẻ ngươi giữa một khay đầy.",rf:"Cả tháng thẻ ngươi không được lật."}]},
 s2:{h:"Ngài nói mà chưa ghi",w:"eun",if:RDW(0),t:MATT("Ngươi nghe nói Hoàng thượng đã bảo Kính sự phòng “nhớ lấy con bé ở cung {mis}”. Nhưng mười ngày qua, sổ vẫn chưa có tên ngươi.",
   "Thẻ của ngươi nằm dưới đáy khay đã hai tháng. Có người nói, mỗi lần khay dâng lên, thẻ ấy lại bị rút ra."),o:[
  {n:"Nhờ người dò ai giữ lại",c:{bac:-10},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"biết kẻ cản",l:{danh:-2},lx:"Kính sự phòng biết ngươi dò, tiếng sút; bạc mất trắng",rt:"Kẻ rút thẻ là một tiểu thái giám ăn bạc của {v}.",rf:"Người dò bị đuổi về."},
  {n:"Chờ, không hỏi",c:{danh:-2},w:{duc:3},wx:"giữ thể diện",lx:"tên ngươi càng xa sổ, người ta bảo ngươi thất thế, tiếng sút",go:()=>matSrv({nt:-2}),rt:"Ngươi tiếp tục ngày của mình."},
  {n:"Dâng ngài một chiếc túi thơm",need:["srv"],c:{bac:-5},o:()=>40+S.nt/4,w:{nt:8},sc:1,wx:"ngài nhớ lại",l:{tin:-8},lx:"chủ biết, Chủ tin sút; tốn bạc mua chỉ",rt:"Ngài đeo túi thơm suốt buổi chầu.",rf:"Túi thơm đến tay {mis} trước."},
  {n:"Gửi ngài một bài thơ",need:["nsrv"],c:{suc:-2},o:()=>35+S.tai/3,w:{sung:3},sc:1,wx:"ngài nhớ chữ ngươi",l:{danh:-2},lx:"bài thơ bị truyền tay, tiếng ngươi sút; ngươi thức khuya mệt rã",rt:"Ngài phê một chữ “Được” bên lề.",rf:"Bài thơ đến tay {v} trước, nàng chép ra cười."}]},
 c1:{h:"{v} mua thái giám",w:"v",t:"Ngươi biết chắc: {v} trả bạc cho một tiểu thái giám Kính sự phòng để tên ngươi lần nào cũng nằm dưới cùng.",o:[
  ...MAT2({n:"Trả bạc cao hơn {v}",c:{bac:-15},o:()=>45+S.mat*4,w:{sung:2},sc:1,wx:"tiểu thái giám đổi phe",l:{danh:-3},lx:"thành kẻ đi mua thẻ, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Tiểu thái giám nhận cả hai bên, nhưng đặt thẻ ngươi lên trên.",rf:"Hắn ăn cả hai, chẳng làm gì."},{w:{nt:4}}),
  {n:"Báo Tổng quản thái giám",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"clean",wx:"kẻ ăn bạc bị đuổi",l:{danh:-2},lx:"{v} biết ngươi tố, thêm oán; hỏng thì tiếng sút",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{eun} cho đánh tiểu thái giám hai mươi trượng.",rf:"{eun} ậm ừ, không xử ai."},
  {n:"Gặp {v} hỏi thẳng",c:{},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"{v} thôi tay",l:{danh:-2},lx:"{v} chối, càng hận; tiếng ngươi sút",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} cười gượng: “Đùa thôi mà.” Từ đó thẻ ngươi yên.",rf:"{v} nói: “Ngươi có chứng cứ không?”"}]},
 c2:{h:"{mis} xin gạch tên",w:"mis",if:MATM,t:MATT("{mis} đến Kính sự phòng, nói ngươi “thân thể yếu, chưa hợp hầu giá”, xin gạch tên. Hoàng hậu sẽ xét trước kỳ lật thẻ.",
   "{mis} tâu với Hoàng hậu rằng ngươi “mới lên, chưa thuộc phép thị tẩm”, xin cho ngươi học thêm một năm. Hoàng hậu sẽ xét trước kỳ lật thẻ."),o:[
  {n:"Xin thái y bắt mạch làm chứng",c:{bac:-10},o:()=>50+S.suc/10,w:{danh:2},sc:1,wx:"lời {mis} hóa vô căn",l:{danh:-2},lx:"thái y nói lấp lửng, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)matMis(0,4)},rt:"Thái y viết: “Khí huyết đầy đủ.” Hoàng hậu gật đầu.",rf:"Thái y viết: “Hơi hư nhược.” Ngươi phải chờ."},
  {n:"Xin {mis} rút lại",c:{suc:-3},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"không làm to chuyện",l:{danh:-2},lx:"phải cầu xin người cũ, nàng bớt thương; tiếng sút; ngươi mệt rã",go:(A,ok)=>matMis(ok?6:-4),rt:"{mis} im lâu, rồi rút đơn.",rf:"{mis} bảo: “Đã muộn.”"},
  {n:"Để Hoàng hậu xét",c:{hh:-2},w:{duc:2},wx:"không ai nói ngươi tranh",lx:"phó mặc cho người khác, Hoàng hậu thấy phiền",rt:"Hoàng hậu giữ đơn lại, chưa phê."}]},
 t1:{h:"Ngày lật thẻ gần kề",w:"eun",t:"Còn ba ngày đến kỳ lật thẻ. Thái giám Kính sự phòng nói nhỏ: “Thẻ có thể lên, có thể xuống. Tùy người.”",o:[
  {n:"Tặng thái giám một vật cũ",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"buy",wx:"có người giúp",l:{danh:-2},lx:"lộ thì mang tiếng mua thẻ, tiếng sút; mất món đồ",rt:"Hắn nhận chiếc trâm bạc, gật đầu.",rf:"Hắn nhận rồi nói với {v}."},
  {n:"Không cho gì",c:{suc:-2},w:{duc:3},f:"clean",wx:"tay sạch",lx:"thẻ tùy may rủi, ngươi thấp thỏm đến mệt rã",rt:"Ngươi chỉ cảm ơn rồi về."},
  ...MAT2({n:"Nhờ người thân cận ngài nhắc tên",c:{suc:-2},o:()=>35+S.sac/5+S.danh/5,w:{sung:2},sc:1,wx:"ngài tự hỏi",l:{danh:-2},lx:"người ta bảo ngươi cầu cạnh, tiếng sút; ngươi mệt rã",rt:"Ngài hỏi: “Thẻ người ấy đâu?”",rf:"Người được nhờ quên mất."},{w:{nt:6}})]},
 x1:{h:"Đêm lật thẻ",w:"emp",t:"Khay thẻ dâng lên Dưỡng Tâm điện. Hoàng thượng đưa tay lướt qua hàng thẻ xanh.",o:[
  {n:"Tin vào lời ngài đã nói",c:{suc:-2},o:A=>40+(A.f.clean?15:0)+S.sac/6+S.duc/6,e:["win","mid"],lx:"thấp thỏm chờ suốt đêm lật thẻ, ngươi mệt rã; hỏng thì chuyện chỉ dừng ở giữa",rt:"Ngài lật thẻ ngươi, không do dự.",rf:"Ngài lật thẻ người khác. Thẻ ngươi vẫn ở đó."},
  {n:"Để người đã mua đặt thẻ lên trên",c:{bac:-10},o:A=>40+(A.f.buy?20:0)+(A.f.know?10:0),e:["win","lose"],rt:"Thẻ ngươi nằm trên cùng. Ngài lật.",rf:"Tổng quản bắt quả tang tiểu thái giám đổi khay."},
  {n:"Xin rút thẻ một kỳ",c:{danh:-2},w:{duc:3},e:"mid",lx:"chờ thêm, chuyện chỉ dừng ở giữa",go:()=>matMis(3),rt:"Ngươi xin nghỉ một kỳ, {mis} yên lòng."}]}},
 E:{win:{k:1,tag:"Thẻ được lật",w:"emp",t:MATT("Thánh dụ truyền xuống: ngày mai cung nữ ở cung {mis} hầu giá. Cả cung chạy tới chạy lui. Lần đầu tiên, tên ngươi đứng trên một tờ giấy vàng.",
   "Thẻ xanh mang tên ngươi được lật. Đêm mai, kiệu Kính sự phòng sẽ đến cửa cung ngươi."),fx:{danh:3},go:A=>{rdOan(A,"v",4);return [matSrv({nt:10}),matCon({sung:3})].join(" ")}},
  mid:{k:0,tag:"Tên còn chờ",t:"Tên ngươi vẫn ở đó, không lên không xuống. Kỳ sau, hay kỳ sau nữa.",fx:{duc:2},go:()=>matSrv({nt:3})},
  lose:{k:-1,tag:"Mang tiếng mua thẻ",t:"Chuyện đổi khay lộ ra. Không ai chứng được ngươi sai khiến, nhưng ai cũng nói. Kính sự phòng ghi chú bên tên ngươi một dấu đỏ.",fx:{danh:-5},go:()=>[matSrv({nt:-4,tin:-5}),matCon({sung:-3})].join(" ")}}});

rdDef("cnv_mat",8,{t:"Đêm đầu",w:"emp",sj:"đêm đầu tiên bên Hoàng thượng",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"],MATV)},
 g:MATT("Hoàng thượng gọi ngươi đến hầu đêm. Một cung nữ chưa có phẩm vị mà được gọi, thì hoặc sáng ra thành tiểu chủ, hoặc bị trả về như chưa từng có. Trước khi trời sáng, mọi chuyện sẽ ngã ngũ.",
  "Đêm đầu tiên ngài ngự ở cung ngươi. Một đêm có thể khiến ngài nhớ mãi, hoặc khiến ngài không quay lại. Và cả hậu cung đang thức để nghe."),
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Kiệu đến cửa",w:"eun",if:RDW(1),t:MATT("Kiệu Kính sự phòng dừng trước cung {mis}. Ma ma tắm gội cho ngươi bằng nước hoa bưởi. {mis} đứng ở cửa, không vào, cũng không đi.",
   "Kiệu Kính sự phòng dừng trước cửa cung ngươi. Cả dãy cung đèn tắt mà không ai ngủ."),o:[
  {n:"Ra chào {mis} trước khi đi",need:["srv"],c:{suc:-2},o:()=>40+S.tin/3,w:{tin:6},sc:1,f:"mis",wx:"chủ không thể nói ngươi vô ơn",l:{tin:-6},lx:"chủ quay lưng, Chủ tin sút; ngươi mệt rã",go:(A,ok)=>matMis(ok?8:-2),rt:"{mis} sửa lại cổ áo cho ngươi: “Đi đi.”",rf:"{mis} đóng cửa trước mặt ngươi."},
  {n:"Lên kiệu, không ngoái lại",need:["srv"],c:{tin:-4},w:{tamco:2},wx:"lòng không vướng",lx:"chủ ghi nhớ, Chủ tin sút",go:()=>matMis(-4),rt:"Kiệu đi. Sau lưng ngươi, một cánh cửa đóng lại."},
  {n:"Sửa sang cung, dặn người hầu kín miệng",need:["nsrv"],c:{bac:-20},w:{mat:1},f:"mis",wx:"chuyện đêm nay không lọt ra",lx:"bạc trong hộp vơi đi một khoản",rt:"Người hầu của ngươi gật đầu, khép hết cửa sổ."},
  {n:"Sai người báo {mis} một tiếng",need:["nsrv"],c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"mis",wx:"người cũ biết ngươi không giấu",l:{danh:-2},lx:"bị cười là còn sợ chủ cũ, tiếng sút",go:(A,ok)=>matMis(ok?6:-2),rt:"{mis} gửi lại một câu: “Chúc tiểu chủ bình an.”",rf:"{mis} không đáp."}]},
 s2:{h:"Lời gọi bất ngờ",w:"emp",if:RDW(0),t:MATT("Không qua sổ, không qua thẻ, Hoàng thượng sai người gọi thẳng “cung nữ hầu trà ở cung {mis}” đến Dưỡng Tâm điện giữa đêm mưa. Kính sự phòng chưa kịp biết.",
   "Không lật thẻ, Hoàng thượng đi bộ một mình đến cung ngươi giữa đêm mưa. Người hầu của ngươi hoảng hốt thắp đèn."),o:[
  ...MAT2({n:"Đi ngay, không kịp sửa soạn",c:{},o:()=>40+S.sac/4,w:{sung:2},sc:1,f:"plain",wx:"ngài thấy ngươi đúng như ngươi",l:{danh:-2},lx:"bị cười là quê mùa, tiếng sút",rt:"Ngài nhìn tóc ngươi còn ướt, bật cười.",rf:"Thái giám Dưỡng Tâm điện lắc đầu khi thấy ngươi."},{w:{nt:5}}),
  {n:"Xin một khắc để sửa soạn",c:{suc:-2},w:{danh:2},wx:"giữ được thể diện",lx:"để ngài chờ, ngươi cuống đến mệt rã",rt:"Ngươi búi tóc, cài một cây trâm bạc."},
  ...MAT2({n:"Xin ngài theo đúng phép",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"rule",wx:"không ai bắt lỗi được",l:{sung:-2},lx:"ngài mất hứng, Sủng sút",rt:"Ngài cười: “Được, trẫm theo phép.” Ngài cho người báo Kính sự phòng.",rf:"Ngài phẩy tay bỏ về."},{l:{nt:-3},lx:"ngài mất hứng, Hoàng thượng để ý sút"})]},
 c1:{h:"{v} cho người chặn",w:"v",need:["srv"],t:"Nửa đường, một cung nữ của {v} đâm sầm vào ngươi, đánh đổ hộp hương. Nàng ta khóc lóc, kéo dài thời gian.",o:[
  {n:"Bỏ hộp hương, đi tiếp",c:{bac:-5},w:{tamco:2},wx:"không trễ giờ",lx:"mất hộp hương mua bằng bạc; {v} thêm oán",go:A=>{rdOan(A,"v",3)},rt:"Ngươi đến đúng giờ, tay không."},
  {n:"Đỡ nàng ta dậy, hỏi ai sai",c:{suc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"có lời khai",l:{danh:-2},lx:"trễ giờ, bị chê, tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Nàng ta run run khai tên {v}.",rf:"Nàng ta chạy mất."},
  {n:"Gọi thị vệ đến",c:{},o:()=>45+S.danh/5,w:{danh:2},sc:1,wx:"có người làm chứng",l:{danh:-2},lx:"ồn ào cả hành lang, tiếng sút; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Thị vệ ghi lại tên cung nữ ấy.",rf:"Thị vệ bảo đó chỉ là va chạm."}]},
 /* raised twin of c1 (review road-b3-r1 item 4): the Emperor comes to her palace, nobody stops her on the way */
 c3:{h:"{v} cho người phá",w:"v",need:["nsrv"],t:"Chiều ấy, một cung nữ của {v} sang cung ngươi “mượn hương”, rồi đánh đổ cả hộp hương ngài thích. Nàng ta khóc lóc, không chịu về.",o:[
  {n:"Bỏ hộp hương, sai người đi mua hương khác",c:{bac:-5},w:{tamco:2},wx:"kịp trước giờ ngài đến",lx:"mất hộp hương mua bằng bạc; {v} thêm oán",go:A=>{rdOan(A,"v",3)},rt:"Hương mới đến kịp trước khi kiệu ngài dừng ở cửa."},
  {n:"Đỡ nàng ta dậy, hỏi ai sai",c:{suc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"có lời khai",l:{danh:-2},lx:"cả buổi chiều rối ren, tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Nàng ta run run khai tên {v}.",rf:"Nàng ta chạy mất."},
  {n:"Gọi thái giám cung mình giữ nàng ta lại",c:{},o:()=>45+S.danh/5,w:{danh:2},sc:1,wx:"có người làm chứng",l:{danh:-2},lx:"ồn ào cả dãy cung, tiếng sút; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Thái giám cung ngươi ghi lại tên cung nữ ấy, báo Nội vụ phủ.",rf:"Nội vụ phủ bảo đó chỉ là va chạm."}]},
 c2:{h:"Lời dặn của ma ma",w:"maid",t:"Ma ma Kính sự phòng dặn: “Đừng nói nhiều, đừng hỏi gì, đừng xin gì. Đêm đầu mà xin là đêm cuối.”",o:[
  {n:"Ghi nhớ từng lời",c:{tai:-1},w:{duc:2},f:"rule",wx:"không phạm phép",lx:"học thuộc phép mà quên mình, tài mọn không dùng tới; ngươi sẽ chỉ là một người như mọi người",rt:"Ngươi gật đầu."},
  {n:"Hỏi ma ma ngài thích gì",c:{bac:-8},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"biết ý ngài",l:{danh:-2},lx:"ma ma kể lại với người khác, tiếng sút; bạc mất trắng",rt:"Ma ma nói nhỏ: “Ngài thích người kể chuyện quê.”",rf:"Ma ma nói thứ ai cũng biết."},
  {n:"Tự nghĩ cách riêng",c:{suc:-2},w:{tai:1},f:"plain",wx:"không giống ai",lx:"nghĩ đến khuya mệt rã; có thể sai phép",rt:"Ngươi nhẩm lại bài dân ca quê nhà."}]},
 t1:{h:"Ngài hỏi chuyện quê",w:"emp",t:"Đèn đã tắt một nửa. Hoàng thượng hỏi: “Quê nàng có gì?”",o:[
  ...MAT2({n:"Kể chuyện mùa gặt",c:{},o:()=>40+S.tai/4,w:{sung:2},sc:1,f:"plain",wx:"ngài nghe say",l:{danh:-1},lx:"ngài ngủ quên, chuyện lọt ra thành trò cười, tiếng sút",rt:"Ngài nghe đến tận canh ba.",rf:"Ngài ngủ trước khi chuyện hết."},{w:{nt:5}}),
  ...MAT2({n:"Hát bài dân ca bên giếng",c:{suc:-2},o:()=>35+S.sac/5+S.tai/5,w:{sung:3},sc:1,f:"plain",wx:"ngài nhớ giọng ngươi",l:{danh:-2},lx:"tiếng hát lọt ra ngoài, tiếng sút; hát đến khản giọng",rt:"Ngài nhắm mắt: “Bài này trẫm đã nghe một lần, sau cửa hậu viện.”",rf:"Thái giám gác cửa kể lại cho cả cung."},{w:{nt:6}}),
  {n:"Thưa: không dám nói",c:{danh:-2},w:{duc:2},f:"rule",wx:"giữ phép",lx:"ngài thấy ngươi nhạt, người ta bảo ngươi vô vị, tiếng sút",rt:"Ngài gật đầu, thôi hỏi."}]},
 x1:{h:"Gần sáng",w:"emp",t:MATT("Trời gần sáng. Thái giám Kính sự phòng đứng ngoài rèm hỏi: “Giữ hay không giữ?” Hoàng thượng quay sang nhìn ngươi.",
   "Trời gần sáng. Hoàng thượng ngồi dậy, khoác áo, nhìn ngươi rất lâu, như đang quyết định có quay lại hay không."),o:[
  {n:"Không xin gì, chỉ cúi đầu",c:{danh:-2},o:A=>40+(A.f.rule?15:0)+S.duc/5,e:["win","mid"],lx:"để mặc ngài quyết, người ta bảo ngươi nhạt, tiếng sút; hỏng thì chỉ dừng ở giữa",rt:"Ngài nói: “Giữ.”",rf:"Ngài im lặng bước ra."},
  {n:"Nói một câu thật lòng",c:{suc:-2},o:A=>35+(A.f.plain?15:0)+(A.f.know?5:0)+S.sac/5,e:["win","lose"],rt:"Ngài bật cười, rồi nắm tay ngươi rất lâu.",rf:"Ngài nhíu mày: “Nàng nói nhiều quá.”"},
  ...MAT2({n:"Xin ngài nhớ đến {mis}",if:MATM,c:{sung:-3},o:A=>50+(A.f.mis?15:0),e:["mid","lose"],go:()=>matMis(6),lx:"nhường ơn cho người cũ, Sủng sút",rt:"Ngài ngạc nhiên, rồi gật đầu.",rf:"Ngài cho là ngươi đang diễn."},{c:{nt:-4},lx:"nhường ơn cho chủ, Hoàng thượng để ý sút"})]}},
 E:{win:{k:1,tag:"Ngài giữ ngươi lại",w:"emp",t:A=>A.f.up?`Sáng ra, thánh chỉ đến trước cả nắng: cung nữ hầu trà được phong ${RANKS[S.rank].n}. {mis} quỳ nghe chỉ cùng cả cung, rồi đứng dậy trước.`
   :MATR()?"Ngài ở lại đến khi trời sáng hẳn, và trước khi đi, dặn Kính sự phòng: “Thẻ này, đặt trên cùng.”"
   :"Ngài muốn giữ ngươi, nhưng Kính sự phòng tâu: cung nữ chưa đủ danh, chưa thể phong. Ngài chỉ nói: “Trẫm nhớ rồi.” Ngươi được đưa về cung {mis} trước khi trời sáng.",
   fx:{danh:4},go:A=>{if(S.srv&&!S.srv.risen&&S.nt>=BAL.ntRise.at&&typeof srvRise==="function"){A.f.up=1;srvRise("Hoàng thượng giữ ngươi lại Dưỡng Tâm điện");return ""}
    return [matSrv({nt:14}),matCon({sung:5})].join(" ")}},
  mid:{k:0,tag:"Một đêm lặng lẽ",t:MATT("Ngươi được đưa về trước khi trời sáng, không giữ, không trả. Kính sự phòng ghi: “Hầu trà.” Ngài vẫn nhớ, nhưng chưa quyết.",
   "Ngài đi lúc trời chưa sáng. Không có ban thưởng, cũng không có lời trách. Một đêm như mọi đêm."),fx:{duc:2},go:()=>[matSrv({nt:6}),matCon({sung:1})].join(" ")},
  lose:{k:-1,tag:"Lời gọi bị trả về",w:"mis",t:MATT("Kính sự phòng đưa ngươi về giữa đêm, như trả một món đồ. Sáng ra cả cung biết. {mis} không nói gì, chỉ sai ngươi trở lại bếp sau.",
   "Ngài đi giữa đêm. Sáng ra cả hậu cung biết. {v} sai người mang sang một hộp bánh “an ủi”."),fx:{danh:-4},go:A=>{rdOan(A,"v",3);return [matSrv({tin:-5,nt:-4}),matCon({sung:-4})].join(" ")}}}});

rdDef("cnv_mat",9,{t:"Từ tớ thành chủ",w:"mis",sj:"ngươi và {mis}",cast(A){return CNV_MC(A,1)&&rdCast(A,["v"],MATV)},
 g:MATT("Hoàng thượng đã gọi tên ngươi, mà ngươi vẫn mặc áo cung nữ, vẫn hầu {mis}. Cả cung không biết gọi ngươi là gì. {mis} cũng không biết.",
  "Ngươi nay ngồi ngang hàng với người ngươi từng quỳ hầu. Người hầu cũ của {mis} phải cúi chào ngươi. Đứng thế nào cho phải, là việc của chương này."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chỗ ngồi",w:"hh",if:RDW(1),t:MATT(()=>CNV_QM()==="emp"?"Hoàng thượng mở yến. {mis} được mời, còn ngươi được gọi theo hầu. Giữa yến, ngài sai đặt thêm một chiếc ghế đẩu cạnh ngự tọa “cho con bé hầu trà”.":"Hoàng hậu mở yến. {mis} được mời, còn ngươi được gọi theo hầu. Nhưng Hoàng thượng sai đặt thêm một chiếc ghế đẩu cạnh ngự tọa “cho con bé hầu trà”.",
   "Yến thưởng cúc ở cung Hoàng hậu. Ghế của ngươi được đặt ngay trên ghế {mis}: ngài vừa ban ngươi thêm ân sủng, phép cung xếp theo ơn."),o:[
  ...MAT2({n:"Xin ngồi sau {mis}",c:{sung:-2},w:{duc:4},f:"low",wx:"người cũ được giữ thể diện",lx:"ngài thấy ngươi từ chối ơn, Sủng sút",go:()=>{matMis(8);return matSrv({tin:6})},rt:"{mis} nhìn ngươi, mắt hơi đỏ."},{c:{nt:-3},lx:"ngài thấy ngươi từ chối ơn, Hoàng thượng để ý sút"}),
  {n:"Ngồi đúng chỗ được xếp",c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"high",wx:"cả điện biết vị trí của ngươi",l:{danh:-2},lx:"{mis} mất mặt, thêm oán; tiếng ngươi sút",go:(A,ok)=>matMis(0,ok?6:4),rt:"Ngươi ngồi, thẳng lưng. Không ai dám cười.",rf:"Có người cười khẽ: “Mới hôm qua còn bưng khay.”"},
  {n:"Đổi chỗ với {mis} mà không nói",c:{suc:-2},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,f:"low",wx:"cả hai cùng có mặt mũi",l:{danh:-2},lx:"Hoàng hậu thấy loạn phép, tiếng sút",go:(A,ok)=>matMis(ok?6:0),rt:"Ngươi khéo đứng dậy rót trà, rồi ngồi xuống ghế dưới. {mis} hiểu.",rf:"Hoàng hậu nhắc: “Ai ngồi chỗ nấy.”"}]},
 s2:{h:"Người cũ không cúi",w:"mis",if:RDW(0),t:MATT("Từ đêm ấy, {mis} không sai ngươi việc gì nữa, cũng không cho ngươi đi. Ngươi ở trong cung nàng như một cái bóng.",
   "Người hầu cũ của {mis}, những người từng ngủ cùng phòng với ngươi, nay gặp ngươi không cúi chào. {mis} để mặc."),o:[
  {n:"Tự tìm việc mà làm",need:["srv"],c:{suc:-3},w:{tin:5},f:"low",wx:"không ai nói ngươi ăn không",lx:"làm đến mệt rã, vẫn là bóng",rt:"Ngươi lau lại từng ô cửa. {mis} nhìn mà không nói."},
  {n:"Xin {mis} cho một chỗ rõ ràng",need:["srv"],c:{},o:()=>40+S.tin/3,w:{tin:5},sc:1,wx:"có chỗ đứng",l:{tin:-6},lx:"chủ cho là ngươi đòi, Chủ tin sút",go:(A,ok)=>matMis(ok?6:-3),rt:"{mis} cho ngươi trông phòng trà riêng.",rf:"{mis} bảo: “Ngươi tự biết.”"},
  {n:"Cười cho qua",need:["nsrv"],c:{danh:-2},w:{duc:3},f:"low",wx:"không thành chuyện",lx:"phép cung bị coi nhẹ, tiếng ngươi sút",rt:"Ngươi chỉ gật đầu chào trước họ."},
  {n:"Gọi họ lại, dạy phép",need:["nsrv"],c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"high",wx:"phép cung được giữ",l:{danh:-2},lx:"bị nói là quên gốc, tiếng sút; {mis} thêm oán",go:(A,ok)=>matMis(0,ok?4:6),rt:"Họ quỳ xuống. Một người khóc.",rf:"Họ quỳ, rồi chạy về mách {mis}."}]},
 c1:{h:"Người cùng phòng năm xưa",w:"maid",t:MATT("Mấy cung nữ ngủ cùng phòng với ngươi bỗng xa cách. Một người lén hỏi: “Sau này tỷ có nhớ bọn muội không?”",
   "Một cung nữ từng ngủ cùng phòng với ngươi xin chuyển sang hầu cung ngươi. {mis} chưa cho."),o:[
  {n:"Hứa sẽ nhớ",c:{bac:-5},w:{duc:3},wx:"có người thật lòng",lx:"tốn bạc quà; lời hứa nặng",rt:"Nàng ta ôm ngươi khóc."},
  {n:"Rủ họ cùng làm việc như xưa",need:["srv"],c:{suc:-2},w:{tin:3,duc:1},wx:"tình cũ còn",lx:"mệt thêm một ca",rt:"Cả phòng cười như năm đầu vào cung."},
  {n:"Xin {mis} cho người ấy theo ngươi",need:["nsrv"],c:{suc:-2},o:()=>35+S.tamco/4,w:{mat:1},sc:1,wx:"có người tin cẩn",l:{danh:-2},lx:"{mis} cho là ngươi lấy người của nàng, bớt thương; tiếng sút",go:(A,ok)=>matMis(ok?2:-4),rt:"{mis} gật đầu: “Đem đi.”",rf:"{mis} từ chối, còn phạt nàng kia."},
  {n:"Giữ khoảng cách",c:{duc:-1},w:{tamco:2},wx:"không ai nắm được ngươi",lx:"người cũ buồn, lòng ngươi áy náy",rt:"Ngươi chỉ cười, không hứa."}]},
 c2:{h:"{v} khích",w:"v",t:"{v} nói nhỏ với ngươi: “{mis} nắm cả quá khứ của ngươi. Không đẩy nàng xuống, nàng sẽ kéo ngươi xuống.”",o:[
  {n:"Bắt tay {v} chèn {mis}",c:{duc:-5},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,f:"high",wx:"{mis} yếu đi",l:{danh:-3},lx:"thành kẻ phản chủ cũ, lòng ngươi cắn rứt, {mis} thêm oán; hỏng thì tiếng sút",go:(A,ok)=>{rdRel(A,"v",6);matMis(-8,ok?12:6)},rt:"Một tháng sau, {mis} bị cắt bổng vì “quản người không nghiêm”.",rf:"{mis} biết ngươi bắt tay {v}."},
  {n:"Từ chối, báo {mis}",c:{danh:-1},w:{duc:3},f:"low",wx:"người cũ thấy ngươi giữ nghĩa",lx:"{v} phật ý, thêm oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",8);matMis(8)},rt:"{mis} nghe xong, lần đầu gọi ngươi là “muội”."},
  {n:"Gật đầu cho {v} yên, không làm gì",c:{duc:-2},w:{tamco:2},wx:"không ai biết ý ngươi",lx:"{v} sẽ đòi, thêm oán; lòng ngươi áy náy",go:A=>{rdOan(A,"v",3)},rt:"{v} tưởng ngươi đã theo nàng."}]},
 t1:{h:"Chuyện cũ trong tay {mis}",w:"mis",if:MATM,t:"{mis} cầm một tờ giấy: sổ phạt ngày ngươi làm vỡ ngự trản năm đầu vào cung. Một tờ giấy nhỏ, đủ để người ta nói ngươi gian dối.",o:[
  {n:"Xin {mis} đốt đi",c:{suc:-3},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"low",wx:"chuyện cũ khép lại",l:{danh:-2},lx:"phải hạ mình, tiếng sút; ngươi mệt rã",go:(A,ok)=>matMis(ok?8:-4),rt:"{mis} thả tờ giấy vào lò.",rf:"{mis} cất tờ giấy vào tay áo."},
  ...MAT2({n:"Tự kể với Hoàng thượng trước",c:{sung:-2},o:()=>40+S.sac/5+S.duc/5,w:{danh:2},sc:1,f:"high",wx:"tờ giấy hết giá",l:{danh:-2},lx:"ngài biết thêm một lỗi cũ, Sủng sút; hỏng thì tiếng sút",rt:"Ngài cười: “Ngự trản ấy trẫm cũng chẳng thích.”",rf:"Ngài nhíu mày, nhưng không hỏi thêm."},{c:{nt:-3},lx:"ngài biết thêm một lỗi cũ, Hoàng thượng để ý sút; hỏng thì tiếng sút"}),
  {n:"Đổi lấy một lời hứa",c:{danh:-1},w:{tamco:2},wx:"cả hai giữ thóp nhau",lx:"không ai tin ai, người ta bảo ngươi mặc cả, tiếng sút",go:()=>matMis(2),rt:"Ngươi hứa không bao giờ nói xấu nàng trước mặt ngài. Nàng giữ tờ giấy, nhưng không dùng."}]},
 x1:{h:"Một lời của {mis}",w:"mis",t:MATT("Hoàng thượng hỏi {mis} trước mặt ngươi: “Người này, nàng thấy thế nào?” Một lời của nàng có thể mở cửa hay khóa cửa.",
   ()=>({hh:"Hoàng hậu hỏi {mis} trước mặt cả điện: “Người hầu cũ của muội, nay là tiểu chủ. Muội thấy thế nào?”",th:"Thái hậu hỏi {mis} trước mặt cả điện: “Người hầu cũ của ngươi, nay là tiểu chủ. Ngươi thấy thế nào?”",emp:"Hoàng thượng hỏi {mis} trước mặt cả điện: “Người hầu cũ của ái phi, nay là tiểu chủ. Ái phi thấy thế nào?”"})[CNV_QM()]),o:[
  {n:"Nhìn {mis}, không nói gì",c:{danh:-2},o:A=>40+(A.f.low?20:0)+S.duc/6,e:["win","mid"],lx:"phó mặc cho người cũ, người ta bảo ngươi vẫn nép sau chủ cũ, tiếng sút; hỏng thì chỉ dừng ở giữa",rt:"{mis} nói: “Là người tốt.” Câu ấy, cả cung nghe.",rf:MATT("{mis} chỉ nói: “Tùy bệ hạ.”","{mis} chỉ nói: “Thiếp không dám nói.”")},
  {n:"Tự trả lời trước",c:{suc:-2},o:A=>35+(A.f.high?15:0)+S.tai/5,e:["win","lose"],rt:"Ngươi nói: “Nếu không có tỷ, không có hôm nay.” {mis} ngẩn ra.",rf:"Ngươi nói hớ một câu, {mis} cười lạnh."},
  {n:"Cúi đầu lui",c:{danh:-2},w:{duc:2},e:"mid",lx:"không ai biết lòng ngươi, chuyện chỉ dừng ở giữa",rt:"Ngươi lui ra. Câu hỏi treo lơ lửng."}]}},
 E:{win:{k:1,tag:"Ngang hàng mà còn nghĩa",w:"mis",t:MATT("{mis} xin Hoàng thượng cho ngươi thôi hầu nàng, “để nó chờ chỉ dụ cho đàng hoàng”. Ngươi vẫn ở cung nàng, nhưng không còn là nô tỳ của ai.",
   "{mis} gọi ngươi là “muội” trước mặt cả điện. Từ đó không ai còn dám nhắc ngươi từng hầu nàng."),fx:{danh:4,duc:2},go:()=>{matMis(10);return [matSrv({tin:8,nt:6}),matCon({sung:2})].join(" ")}},
  mid:{k:0,tag:"Không thân không thù",t:"Ngươi và {mis} gặp nhau thì chào, xong thì thôi. Giữa hai người còn một tờ giấy chưa đốt.",fx:{duc:2}},
  lose:{k:-1,tag:"{mis} thành kẻ thù công khai",w:"mis",t:MATT("{mis} nói trước mặt ngài: “Nó hầu ta ba năm, ta biết nó.” Câu ấy đủ để ngài lưỡng lự. Từ đó nàng không giấu lòng ghét nữa.",
   "{mis} nói trước cả điện: “Hầu ta ba năm, ta biết nó là người thế nào.” Từ đó nàng không giấu lòng ghét nữa."),fx:{danh:-4},go:()=>{matMis(-8,10);return [matSrv({tin:-10,nt:-3}),matCon({sung:-3})].join(" ")}}}});

rdDef("cnv_mat",10,{t:"Lời đồn quyến rũ",w:"v",sj:"lời đồn ngươi quyến rũ Hoàng thượng",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"],MATV)},
 g:MATT(()=>`Khắp hậu cung truyền nhau: cung nữ ${CNV_MOK()?"ở cung {mis}":"hầu trà năm xưa của {mis}"} dùng bùa mê dụ dỗ thánh thượng. Với một cung nữ, đó là tội đày Tân Giả khố. Kẻ tung tin là {v}. ${CNV_QM()==="emp"?"Thận hình ty đã được lệnh tra.":"Hoàng hậu đã cho người tra."}`,
  ()=>`Khắp hậu cung truyền nhau: tiểu chủ xuất thân cung nữ dùng bùa mê dụ dỗ thánh thượng. Kẻ tung tin là {v}. ${({hh:S.thDead?"Hoàng hậu đã cho người tra.":"Hoàng hậu đã cho người tra, và Thái hậu đã nghe.",th:"Thái hậu đã cho người tra.",emp:"Thận hình ty đã được lệnh tra."})[CNV_QM()]}`),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Gói bùa trong gối",w:"v",if:RDW(1),t:()=>`Một sáng, ${CNV_QM()==="emp"?"thái giám Thận hình ty":"thái giám Hoàng hậu"} đến khám phòng ngươi. Trong gối có một gói vải đỏ thêu chữ lạ. Ngươi chưa thấy nó bao giờ.`,o:[
  {n:"Xin khám luôn phòng người khác",c:{suc:-3},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"fight",wx:"lộ ra ai từng vào phòng",l:{danh:-3},lx:"bị coi là cãi lệnh, tiếng sút nặng; ngươi mệt rã",rt:"Trong phòng một cung nữ của {v} còn nửa cuộn chỉ đỏ cùng màu.",rf:"Thái giám không nghe."},
  {n:"Nhận là không biết, xin tra",c:{danh:-3},w:{duc:3},f:"calm",wx:"bình tĩnh",lx:"chưa ai tin, tiếng ngươi sút",rt:"Ngươi quỳ, giọng không run."},
  {n:"Đốt ngay trước mặt mọi người",c:{danh:-3},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,wx:"vật chứng mất",l:{danh:-3},lx:"bị cho là phi tang, tiếng sút nặng",rt:"Gói vải cháy, chỉ còn lời nói.",rf:"Thái giám giật lại, ghi thêm tội."}]},
 s2:{h:"Lời đồn đã thành án",w:"hh",if:RDW(0),t:"Lời đồn đến tai Hoàng hậu trước khi đến tai ngươi. Hoàng hậu cho gọi ngươi đến hỏi, có cả {v} ngồi bên.",o:[
  {n:"Quỳ nghe, không cãi",c:{danh:-3},w:{duc:3},f:"calm",wx:"Hoàng hậu thấy ngươi biết phép",lx:"lời đồn chưa được bác, tiếng ngươi sút",rt:"Hoàng hậu gật đầu, cho ngươi lui."},
  {n:"Hỏi {v} có thấy tận mắt không",c:{suc:-2},o:()=>40+S.tai/4+S.danh/5,w:{danh:3},sc:1,f:"fight",wx:"{v} lúng túng",l:{hh:-3},lx:"Hoàng hậu thấy ngươi hỗn, không vui; {v} thêm oán",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"{v} đỏ mặt: “Người ta nói thế.”",rf:"{v} đáp: “Ta không thấy, nhưng ai cũng nói.”"},
  {n:"Xin thái y khám người",c:{bac:-10},o:()=>50+S.duc/6,w:{danh:2},sc:1,wx:"không có bùa, không có thuốc",l:{danh:-2},lx:"chịu nhục, tiếng sút; bạc mất trắng",rt:"Thái y tâu: không có gì lạ.",rf:"Thái y ngập ngừng, không dám nói chắc."}]},
 c1:{h:"Người tung tin",w:"maid",t:"Một cung nữ đồng hương nói nhỏ: người kể đầu tiên là a hoàn của {v}, kể ở giếng nước, ngay chiều hôm Hoàng thượng gọi ngươi.",o:[
  {n:"Tìm a hoàn ấy hỏi",c:{bac:-10},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"wit",wx:"có người khai",l:{danh:-2},lx:"{v} biết ngươi dò, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"A hoàn khóc: “Chủ bắt nô tỳ nói.”",rf:"A hoàn đã bị đưa ra khỏi cung."},
  {n:"Nhờ người đồng hương làm chứng",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"wit",wx:"có nhân chứng",l:{danh:-2},lx:"nàng ấy bị liên lụy, tiếng ngươi sút",rt:"Nàng gật đầu, run run.",rf:"Nàng sợ, rút lời."},
  {n:"Giữ kín, chờ thời",c:{danh:-2},w:{tamco:2},wx:"chưa lộ bài",lx:"lời đồn cứ lan, tiếng ngươi sút",rt:"Ngươi ghi nhớ cái tên."}]},
 c2:{h:"{mis} đứng đâu",w:"mis",if:MATM,t:MATT("Người ta đến hỏi {mis}: người hầu của nàng có thật dùng bùa? Một lời của nàng nặng hơn mười lời đồn.",
   "Người ta hỏi {mis}: người hầu cũ của nàng có thật dùng bùa? Một lời của chủ cũ nặng hơn mười lời đồn."),o:[
  {n:"Đến xin {mis} nói giúp",c:{suc:-3},o:()=>35+S.duc/4+(MATR()?0:S.tin/5),w:{duc:2},sc:1,f:"mis",wx:"có người đứng ra",l:{danh:-2},lx:"phải cầu người cũ, nàng bớt thương; tiếng sút; ngươi mệt rã",go:(A,ok)=>matMis(ok?8:-3),rt:"{mis} nói: “Nó hầu ta ba năm, chưa từng có thứ ấy.”",rf:"{mis} nói: “Ta không biết.”"},
  {n:"Không cầu, để {mis} tự chọn",c:{danh:-2},w:{duc:2},wx:"không nợ ai",lx:"có thể nàng im, người ta bảo ngươi kiêu, tiếng sút",rt:"Ngươi không đến. {mis} cũng không đến."},
  {n:"Cho {mis} biết {v} cũng định kéo nàng vào",c:{},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"mis",wx:"{mis} cùng chống {v}",l:{danh:-2},lx:"{mis} thấy bị lợi dụng, bớt thương; tiếng sút",go:(A,ok)=>{if(ok){matMis(6);rdOan(A,"v",4)}else matMis(-3)},rt:"{mis} nheo mắt: “Nó dám?”",rf:"{mis} không tin."}]},
 t1:{h:"Thái hậu hỏi",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi đến Đức Thọ cung: “Người ta nói ngươi dùng bùa. Ngươi dùng gì?”",o:[
  {n:"Thưa: dùng trà và lòng thành",c:{},o:()=>40+S.tai/4+S.duc/6,w:{th:4},sc:1,f:"calm",wx:"Thái hậu bật cười",l:{th:-3},lx:"Thái hậu cho là ngươi lẻo mép, không vui",rt:"Thái hậu cười: “Trà ngươi pha, ta muốn nếm.”",rf:"Thái hậu không cười."},
  {n:"Quỳ xin Thái hậu cho tra đến cùng",c:{suc:-2},w:{duc:3},f:"fight",wx:"tỏ ra không sợ",lx:"quỳ đến rã gối; chuyện thành lớn",rt:"Thái hậu gật đầu: “Được, tra.”"},
  {n:"Dâng Thái hậu một chén trà tự pha",c:{suc:-2},o:()=>45+S.tai/5,w:{th:3},sc:1,wx:"Thái hậu nhớ tay ngươi",l:{th:-2},lx:"chén trà bị nghi, Thái hậu không vui; ngươi mệt rã",rt:"Thái hậu uống hết chén.",rf:"Ma ma Đức Thọ cung đổ chén trà đi."}]},
 x1:{h:"Phiên tra gói vải đỏ",w:"hh",t:()=>({hh:"Hoàng hậu ngồi trên, {v} ngồi bên, gói vải đỏ đặt trên khay. Phiên tra để nghe cho rõ; xử thế nào, Hoàng hậu sẽ tâu lên Hoàng thượng. Ngài chưa đến.",th:"Thái hậu ngồi trên, {v} ngồi bên, gói vải đỏ đặt trên khay. Phiên tra để nghe cho rõ; xử thế nào, Thái hậu sẽ nói với Hoàng thượng. Ngài chưa đến.",emp:"{eun} ngồi trên theo khẩu dụ Hoàng thượng, {v} ngồi bên, gói vải đỏ đặt trên khay. Phiên tra để nghe cho rõ; xử thế nào, Hoàng thượng phán. Ngài chưa đến."})[CNV_QM()],o:[
  {n:"Đưa nhân chứng ra",c:{suc:-3},o:A=>35+(A.f.wit?20:0)+(A.f.fight?5:0)+S.tamco/6,e:["win","lose"],go:(A,ok)=>{rdOan(A,"v",ok?12:4)},rt:"A hoàn của {v} khai ra tất cả. {v} tái mặt.",rf:"Nhân chứng rút lời giữa chừng."},
  {n:"Chờ Hoàng thượng đến",c:{danh:-2},o:A=>40+(A.f.calm?15:0)+S.sac/6,e:["win","mid"],lx:"phó mặc cho một lời, người ta bảo ngươi trốn sau lưng ngài, tiếng sút; hỏng thì án gác lại",rt:"Ngài đến, nhìn gói vải, nói: “Trẫm không cần bùa để nhìn ai.”",rf:"Ngài không đến. Án treo đó."},
  {n:"Xin {mis} đứng ra",if:MATM,c:{},o:A=>40+(A.f.mis?20:0),e:["mid","lose"],lx:"nợ người cũ một lần; hỏng thì {mis} bớt thương",go:(A,ok)=>matMis(ok?6:-2),rt:()=>({hh:"{mis} đứng ra nói một câu. Hoàng hậu tâu xin gác án, Hoàng thượng chuẩn.",th:"{mis} đứng ra nói một câu. Thái hậu nói với Hoàng thượng cho gác án.",emp:"{mis} đứng ra nói một câu. {eun} tâu xin gác án, Hoàng thượng chuẩn."})[CNV_QM()],rf:"{mis} không đến."}]}},
 E:{win:{k:1,tag:"Lời đồn đổ ngược",w:"emp",t:"Gói vải đỏ được đem đốt trước Càn Ninh cung. Hoàng thượng phê cho {v} cấm túc, còn tên ngươi từ nay không ai dám đem ra đùa.",fx:{danh:5},go:A=>{rdOan(A,"v",6);return [matSrv({nt:8,tin:4}),matCon({sung:4})].join(" ")}},
  mid:{k:0,tag:"Án gác lại",t:"Không ai bị phạt. Lời đồn lặn xuống, nhưng còn đó, như than dưới tro.",fx:{duc:2,danh:-1}},
  lose:{k:-1,tag:"Mang tiếng hồ mị",t:MATT("Ngươi bị phạt quỳ ba ngày trước Càn Ninh cung, suýt bị đày Tân Giả khố. Từ đó, mỗi lần Hoàng thượng nhìn ngươi, có người ghi lại.",
   "Hoàng thượng phê cấm túc ngươi một tháng. Ngài không nói thêm gì, nhưng từ đó ngài đến cung ngươi ít hẳn."),fx:{danh:-5},go:()=>[matSrv({tin:-8,nt:-5}),matCon({sung:-5})].join(" ")}}});

rdDef("cnv_mat",11,{t:"Ánh mắt ấy",w:"emp",sj:"điều ánh mắt ấy trở thành",cast(A){return CNV_MC(A,0)&&rdCast(A,["v"],MATV)},
 g:MATT("Từ chiếc ô dưới mưa đến hôm nay, ánh mắt của Hoàng thượng đã đi một quãng dài. Giờ ngài hỏi ngươi muốn gì. Đây là kết cục truyện xuất thân của ngươi.",
  "Từ chiếc ô dưới mưa đến chiếc ghế ngươi đang ngồi, ánh mắt của Hoàng thượng đã đi một quãng dài. Giờ phải biết nó là ân tình, hay chỉ là một lần nhìn. Đây là kết cục truyện xuất thân của ngươi."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chiếc ô cũ",w:"emp",if:RDW(1),t:"Hoàng thượng sai người mang đến chiếc ô năm xưa, cán ô đã khắc thêm một chữ. Ngài hẹn gặp ngươi dưới đúng mái hiên ấy, chiều mưa tới.",o:[
  ...MAT2({n:"Đến dưới hiên, mang theo ô",c:{suc:-2},o:()=>45+S.sac/5,w:{sung:2},sc:1,f:"love",wx:"ngài nhớ ngày đầu",l:{danh:-2},lx:"có người thấy, tiếng sút; đội mưa mệt rã",rt:"Ngài đứng đó, tay không. Ngươi che ô cho ngài như năm xưa.",rf:"Trời không mưa. Người ta thấy ngươi đứng chờ một mình."},{w:{nt:8}}),
  {n:"Gửi lại ô, kèm một lời",c:{danh:-2},w:{duc:3},f:"calm",wx:"giữ được thể diện",lx:"ngài có thể buồn, người ta bảo ngươi phụ ơn, tiếng sút",rt:"Ngài đọc lời ngươi, cất ô vào Dưỡng Tâm điện."},
  {n:"Hỏi chữ khắc là chữ gì",c:{},o:()=>40+S.tai/4,w:{tai:1},sc:1,f:"love",wx:"biết lòng ngài",l:{danh:-1},lx:"bị cho là tò mò, tiếng sút",rt:"Thái giám thưa: chữ “Niệm”.",rf:"Thái giám không dám nói."}]},
 s2:{h:"Ánh mắt nhạt dần",w:"emp",if:RDW(0),t:MATT(()=>`Đã lâu Hoàng thượng không ghé hậu viện. Ngươi vẫn hầu trà ${CNV_MOK()?"ở cung {mis}":"ở cung chủ mới"}, vẫn đứng dưới mái hiên cũ, mà chẳng ai dừng lại.`,
   "Đã lâu Hoàng thượng không lật thẻ ngươi. Cung ngươi vắng đến mức người hầu bắt đầu xin đi."),o:[
  ...MAT2({n:"Đứng chờ dưới mái hiên cũ",c:{suc:-2},o:()=>35+S.sac/4,w:{sung:2},sc:1,f:"love",wx:"ngài dừng lại",l:{danh:-2},lx:"bị cười là ngóng, tiếng sút; đứng đến mỏi rã",rt:"Một chiều mưa, ngài dừng lại. Không nói gì, chỉ đứng cạnh ngươi.",rf:"Ngài đi qua, không ngoảnh lại."},{n:"Đứng hầu dưới mái hiên cũ",w:{nt:8}}),
  {n:"Thôi ngóng, sống ngày của mình",c:{danh:-3},w:{duc:4},f:"calm",wx:"lòng nhẹ",lx:"ngài có thể quên thật, người ta bảo ngươi thất sủng, tiếng sút",rt:"Ngươi trồng một chậu lan trước cửa."},
  ...MAT2({n:"Nhờ {v} nói giúp một câu",c:{bac:-10},o:()=>35+S.tamco/4,w:{sung:2},sc:1,wx:"có người nhắc tên",l:{danh:-2},lx:"nợ {v}, hỏng thì {v} trở mặt; tiếng sút; bạc mất trắng",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} nhắc tên ngươi trong bữa ngự thiện.",rf:"{v} nhận bạc, quên lời."},{w:{nt:5}})]},
 c1:{h:"{mis} lần cuối",w:"mis",if:MATM,t:MATT("{mis} gọi ngươi vào, lần đầu bảo ngươi ngồi: “Ta già rồi. Ngươi muốn đi, ta không giữ nữa.”",
   "{mis} sang cung ngươi, lần đầu không cần ngươi ra đón: “Ta và ngươi, rốt cuộc là gì của nhau?”"),o:[
  {n:"Quỳ lạy {mis} một lạy",c:{danh:-2},w:{duc:4},f:"mis",wx:"nghĩa cũ được trả",lx:"có người cười ngươi hạ mình, tiếng sút",go:()=>{matMis(10);return matSrv({tin:8})},rt:"{mis} đỡ ngươi dậy. Hai người không nói gì nữa."},
  {n:"Thưa: là tỷ muội",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,f:"mis",wx:"có một người chị",l:{danh:-1},lx:"nàng chưa sẵn lòng, bớt thương; tiếng sút",go:(A,ok)=>matMis(ok?10:-2),rt:"{mis} cười, mắt đỏ hoe.",rf:"{mis} lắc đầu: “Chưa đâu.”"},
  {n:"Thưa: là người từng hầu và người từng được hầu",c:{duc:-1},w:{tamco:2},wx:"rạch ròi",lx:"nàng buồn, bớt thương; lòng ngươi áy náy",go:()=>matMis(-3),rt:"{mis} gật đầu, đứng dậy về."}]},
 c2:{h:"{v} nước cuối",w:"v",t:()=>({hh:S.thDead?"{v} tâu với Hoàng hậu xin đưa ngươi ra hành cung coi việc hương khói, “cho xa lời đồn”. Đi rồi thì khó về.":"{v} tâu với Hoàng hậu xin đưa ngươi đi hầu Thái hậu ở hành cung, “cho xa lời đồn”. Đi rồi thì khó về.",th:"{v} tâu với Thái hậu xin đưa ngươi ra hành cung coi việc hương khói, “cho xa lời đồn”. Đi rồi thì khó về.",emp:"{v} tâu với Hoàng thượng xin đưa ngươi ra hành cung coi việc hương khói, “cho xa lời đồn”. Đi rồi thì khó về."})[CNV_QM()],o:[
  {n:"Xin Hoàng hậu cho ở lại",c:{hh:-3},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"calm",wx:"ở lại",l:{danh:-2},lx:"Hoàng hậu thấy ngươi bám víu, không vui; hỏng thì tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng hậu bác đơn của {v}.",rf:"Hoàng hậu chưa phê."},
  {n:"Đem chuyện gói bùa ra nói lại",c:{suc:-2},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,wx:"{v} phải lui",l:{danh:-3},lx:"khơi lại chuyện cũ, tiếng sút; {v} thêm oán; ngươi mệt rã",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{v} rút đơn ngay chiều ấy.",rf:"Chuyện cũ khơi lên, dính cả ngươi."},
  {n:"Gặp {v}, xin hòa",c:{bac:-10},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"bớt một kẻ thù",l:{danh:-2},lx:"{v} thấy ngươi yếu, hỏng thì trở mặt; tiếng sút; quà mất trắng",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} thở dài: “Ta chỉ sợ ngài quên ta.”",rf:"{v} nhận bạc, cười."}]},
 t1:{h:"Ngài hỏi điều ngươi muốn",w:"emp",t:"Hoàng thượng hỏi: “Từ ngày ấy, nàng chưa xin trẫm điều gì. Hôm nay xin đi.”",o:[
  ...MAT2({n:"Xin ngài đừng quên chiều mưa ấy",c:{},o:()=>40+S.sac/5+S.tai/5,w:{sung:3},sc:1,f:"love",wx:"ngài cười",l:{danh:-1},lx:"lời xin nhẹ quá, người ta cười, tiếng sút",rt:"Ngài nói: “Trẫm chưa từng quên.”",rf:"Ngài chỉ gật đầu."},{w:{nt:8}}),
  ...MAT2({n:"Xin ơn cho {mis}",if:MATM,c:{sung:-2},w:{duc:4},f:"mis",wx:"người cũ được ơn",lx:"không xin cho mình, nhường ơn đi, Sủng sút",go:()=>matMis(8),rt:"Ngài nhướng mày, rồi ban cho {mis} một xấp gấm."},{c:{nt:-3},lx:"không xin cho mình, nhường ơn đi, Hoàng thượng để ý sút"}),
  {n:"Không xin gì",c:{danh:-1},w:{duc:3},f:"calm",wx:"ngài nể",lx:"không được gì ngay, người ta bảo ngươi khờ, tiếng sút",rt:"Ngài nhìn ngươi lâu: “Lạ thật.”"}]},
 x1:{h:"Dưới mái hiên",w:"emp",t:"Chiều mưa. Cùng mái hiên năm ấy. Hoàng thượng đứng đó, như đang chờ ngươi nói câu cuối cùng.",o:[
  {n:"Bước đến che ô cho ngài",c:{suc:-3},o:A=>35+(A.f.love?15:0)+S.sac/6,e:["win","lose"],rt:"Ngài nắm tay ngươi dưới ô: “Năm ấy trẫm cũng muốn làm thế này.”",rf:"Ngài nhận ô, nhưng mắt nhìn đi nơi khác."},
  {n:"Đứng yên, để ngài bước đến",c:{duc:-1},o:A=>40+(A.f.calm?15:0)+S.duc/6,e:["win","mid"],lx:"để ngài phải bước trước, lòng ngươi áy náy; có thể ngài không bước, chuyện chỉ dừng ở giữa",rt:"Ngài bước đến, đứng cạnh ngươi đến khi tạnh mưa.",rf:"Ngài đứng đó, ngươi đứng đây. Mưa tạnh."},
  {n:"Cúi đầu, lui vào trong",c:{danh:-2},w:{duc:3},e:"mid",lx:"khép lại một ánh nhìn, chuyện chỉ dừng ở giữa",rt:"Ngươi lui. Ngài không gọi."}]}},
 E:{win:{k:1,tag:"Ánh mắt thành ân tình",w:"emp",t:MATT("Hoàng thượng nói với Kính sự phòng: “Người này, đừng ai làm khó.” Ngươi vẫn chưa có phẩm vị, nhưng cả hậu cung biết ngài đã chọn. Ngày sắc phong chỉ còn là chuyện thời gian.",
   "Ngài ban cho cung ngươi một tấm biển tự tay đề chữ “Niệm”. Cả hậu cung hiểu: ngươi được phong vì một ánh mắt, và được giữ vì một tấm lòng."),fx:{danh:8,duc:2},go:()=>[matSrv({nt:20,tin:5}),matCon({sung:6})].join(" ")},
  mid:{k:0,tag:"Được nhìn mà bị ghét",t:MATT("Hoàng thượng vẫn nhìn ngươi, nhưng ánh nhìn ấy kéo theo bao cặp mắt ghen. Ngươi vẫn là cung nữ, chờ một ngày ngài nhớ lại.",
   "Ngươi là tiểu chủ, được ngài nhớ, mà hậu cung không ai quên ngươi từng là nô tỳ. Có ân sủng, không có tri kỷ."),fx:{danh:2},go:A=>{rdOan(A,"v",4);return [matSrv({nt:6}),matCon({sung:2})].join(" ")}},
  lose:{k:-1,tag:"Ánh mắt khép lại",t:MATT("Ngài thôi nhìn về phía hậu viện. Ngươi vẫn là cung nữ, vẫn pha trà, vẫn sống. Con đường còn dài, chỉ không còn chiếc ô năm ấy.",
   "Ngài thôi đến. Ngươi vẫn là tiểu chủ, vẫn có cung riêng, chỉ không còn ai nhìn ngươi như chiều mưa năm ấy."),fx:{danh:-3},go:()=>[matSrv({nt:-6}),matCon({sung:-4})].join(" ")}}});
RD97L.push({a:"cnv_mat_11",tag:"Chủ cũ thành tỷ muội",w:"mis",p:.12,n:"Xin {mis} cùng đứng dưới mái hiên",c:{suc:-4},
 path:["Quỳ lạy {mis}","Thưa: là tỷ muội","Xin ơn cho {mis}","Gặp {v}, xin hòa","Thôi ngóng"],np:2,bad:["Thưa: là người từng hầu","Đem chuyện gói bùa"],sc:2,x:[()=>{const m=CNV_MIS();return !!(m&&m.alive&&!m.out&&(m.rel||0)>=20)},"Chủ cũ thương ngươi (quan hệ từ 20)"],
 t:"Ngươi sai người mời {mis} ra mái hiên. Hoàng thượng thấy hai người đứng chung một chiếc ô, bật cười: “Hóa ra người trẫm nhìn năm ấy, là người nàng dạy ra.” Từ đó, cung {mis} và cung ngươi đi chung một đường, ai động đến người này là động đến cả hai.",
 fx:{danh:10,duc:4},go:()=>{matMis(20);return [matSrv({nt:15,tin:15}),matCon({sung:5})].join(" ")},rw:"nt_nhuy",ti:"Chủ tớ thành tỷ muội"});
CNV_QFIX("cnv_mat");

/* ---------- cnv_ma · Ma ma dạy việc ---------- */
/* BAL.road keys needed:
     cnvMaRk: 3   // cnv_ma .11 win (still a maid): the servant rank she is given, printed as SRK.maid[BAL.road.cnvMaRk] (index 3 today)
   Two states (ROAD_MAP §8.4): still a maid (isSrv) or already raised (S.srv.risen). Texts are functions of the state; options split with
   need:["srv"] / need:["nsrv"]; maid-only effects (tin, nt, e67merit, e67srvUp, the servant rank) only through lmmSrv / lmmRk.
   The road: Lưu ma ma's first real task (.5) → a missing sum in the Nội vụ phủ books (.6) → Phùng cô cô accuses ma ma of it (.7) →
   defending the teacher (.8) → the exam / the maid selection (.9) → ma ma falls ill, her box of names (.10) → who takes ma ma's place (.11).
   As a maid she climbs the Nội vụ phủ ladder under ma ma; as a tiểu chủ she protects her old teacher and uses (or shields) the network of
   maids and eunuchs ma ma trained across the palaces. {v} = the consort whose palace (and family silk shop) eats the missing sum: real hostile.
   Story-only NPCs: Lưu ma ma (ROAD_MAP §5.4), Phùng cô cô (NEW: Nội vụ phủ chưởng sự, ma ma's former pupil turned rival, {v}'s hand inside
   Nội vụ phủ; face = mama pool). Same two names in every chapter.
   Beats a tiểu chủ cannot play (handing out the six palaces' coal, stealing a ledger …) have a raised twin (need srv / nsrv); odds that read
   the inner palace's favour use CNV_QV (Hoàng hậu, Thái hậu for an empty seat, the Emperor when both are gone, _hd_cnv.js). */
const LMMR=()=>!!(S.srv&&S.srv.risen);
const LMMT=(m,c)=>A=>{const x=LMMR()?c:m;return typeof x==="function"?x(A):x};
const lmmSrv=o=>{if(!S.srv||S.srv.risen)return"";ap67(o);try{return fmt(o)}catch(e){return""}};
const lmmCon=o=>{if(!LMMR())return"";ap67(o);try{return fmt(o)}catch(e){return""}};
/* ma ma's state after .8: cleared ("win"), freed without her post ("mid"), condemned to Tân Giả khố ("lose") */
const LMMF=()=>rdEnd(8)||"win";
/* the box of names (.10) is whole for the rare finale: .10 ended win or mid, and she did not burn it (flag set by the burn option) */
const LMMBOX=()=>{const e=rdEnd(10);let b="";try{b=S.st.f14.lmmBox||""}catch(x){}return (e==="win"||e==="mid")&&b!=="burn"};
/* the servant rank a chapter ending gives at once (cap: the top servant rank); consort: nothing */
function lmmRk(n){try{if(S.srv&&!S.srv.risen){const old=S.srv.rk||0,to=Math.min(n,SRK.maid.length-1);if(to>old){S.srv.rk=to;S.srv.mp=0;S.srv.ex={};
  try{if(typeof exSrvDrop==="function")exSrvDrop()}catch(e){}log(`<b class="g">Được giao chức ${SRK.maid[to]}</b>.`);return `Được giao chức ${SRK.maid[to]}.`}
  return e67merit(8)}}catch(e){console.error(e)}return""}

rdDef("cnv_ma",5,{t:"Bài học thứ nhất",w:"maid",sj:"việc đầu tiên Lưu ma ma giao",cast(A){return rdCast(A,["v"])},
 g:LMMT("Lưu ma ma giao ngươi việc thật đầu tiên: chia áo rét và than sưởi cho sáu cung trước ngày sương giá đầu mùa. Thiếu một tấm, cung nào cũng có người kêu; thừa một tấm, sổ Nội vụ phủ không khớp.",
  "Than sưởi mùa đông của cung ngươi bị Nội vụ phủ cắt mất ba phần. Lưu ma ma, người thầy cũ, xin vào thỉnh an: bà muốn dạy ngươi bài học đầu tiên của một tiểu chủ, đòi đúng phần lệ mà không gây thù, trước ngày sương giá."),
 p:[["s1","s2"],["c1","c2","c3","c4"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Việc thật đầu tiên",w:"maid",if:RDW(1),t:LMMT("Từ ngày ngươi đỗ kỳ khảo, Lưu ma ma không gọi ngươi là “con bé” nữa. Bà đặt trước mặt ngươi sổ áo rét sáu cung: “Mười ngày nữa sương xuống. Làm đi, ta chỉ xem.”",
   "Lưu ma ma quỳ trước ngươi theo phép, rồi đứng dậy nói như năm xưa: “Tiểu chủ mới lên, người ta thử. Than cắt hôm nay, mai cắt gấm, mốt cắt người.”"),o:[
  {n:"Tự tay kiểm từng tấm",need:["srv"],c:{suc:-6},w:{tin:4},f:"hard",wx:"ma ma gật đầu",lx:"thức trắng mấy đêm, kiệt sức",rt:"Ngươi đếm đến tấm áo cuối cùng khi gà gáy."},
  {n:"Chia việc cho các cung nữ khác",need:["srv"],c:{},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"lead",wx:"việc nhanh",l:{tin:-5},lx:"có đứa làm ẩu, ma ma trách, Chủ tin sút",rt:"Ba ngày đã xong hai cung.",rf:"Một đứa đếm nhầm, áo cung Hoàng hậu thiếu hai tấm."},
  {n:"Xin ma ma dạy phép đòi lệ",need:["nsrv"],c:{suc:-2},w:{duc:2,tamco:1},f:"hard",wx:"biết luật của Nội vụ phủ",lx:"phải học như học trò đến mệt rã",rt:"Ma ma giở sổ lệ: phần than của ngươi ghi rõ từng cân."},
  {n:"Sai người đến thẳng Nội vụ phủ đòi",need:["nsrv"],c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"lead",wx:"than về đủ",l:{danh:-2},lx:"Nội vụ phủ ghi oán, đồn cung ngươi hống hách, tiếng sút",rt:"Than về trước giờ ngọ.",rf:"Người của ngươi bị đuổi về tay không."}]},
 s2:{h:"Lần thứ hai",w:"maid",if:RDW(0),t:LMMT("Ngươi chưa đỗ, vẫn về giặt áo. Nhưng một sáng, Lưu ma ma đứng ở cửa giặt: “Còn một việc. Làm được, ta xin cho ngươi khảo lại.” Việc là chia áo rét sáu cung trước sương giá.",
   "Ngươi đã lên làm tiểu chủ mà chưa từng đỗ kỳ khảo của ma ma. Bà vẫn đến, giọng vẫn nghiêm: “Than cung tiểu chủ bị cắt. Làm chủ mà không giữ nổi phần mình, thì cũng như năm xưa trượt khảo.”"),o:[
  {n:"Nhận việc, không hỏi điều kiện",need:["srv"],c:{suc:-5},w:{tin:5},f:"hard",wx:"ma ma thấy ngươi chịu khó",lx:"vừa giặt vừa làm, sức cạn",rt:"Ngươi giặt ban ngày, đếm áo ban đêm."},
  {n:"Xin ma ma một người phụ",need:["srv"],c:{},o:()=>40+S.tin/4,w:{tamco:2},sc:1,f:"lead",wx:"có người đỡ việc",l:{tin:-5},lx:"ma ma cho là ngươi lười, Chủ tin sút",rt:"Ma ma cho một cung nữ nhỏ theo ngươi.",rf:"Ma ma lạnh lùng: “Ta chọn ngươi, không chọn hai người.”"},
  {n:"Mời ma ma ngồi, xin dạy lại từ đầu",need:["nsrv"],c:{danh:-2},w:{duc:3},f:"hard",wx:"ma ma nguôi giận",lx:"hạ mình trước người hầu cũ, bị cười, tiếng sút",rt:"Ma ma ngồi xuống, lần đầu tiên trước mặt ngươi."},
  {n:"Bảo ma ma đây là việc của cung ngươi",need:["nsrv"],c:{},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"lead",wx:"tỏ ra tự lo được",l:{danh:-2},lx:"mất người thầy, người ta bảo ngươi quên ơn, tiếng sút",rt:"Ma ma cười: “Thế thì tiểu chủ làm cho ta xem.”",rf:"Ma ma lui ra, không quay lại."}]},
 c1:{h:"Phùng cô cô",w:"maid",need:["srv"],t:"Phùng cô cô, chưởng sự của Nội vụ phủ, từng là học trò của Lưu ma ma, đưa ngươi một cuốn sổ khác: “Chép theo sổ này cho nhanh. Sổ cũ của bà ấy rối lắm.”",o:[
  {n:"Cảm ơn, nhưng chép theo sổ cũ",c:{suc:-3},w:{duc:3},f:"honest",wx:"không dính vào sổ lạ",lx:"chép lại cả quyển đến mệt rã; Phùng cô cô phật ý",rt:"Phùng cô cô cười: “Học trò bà ấy, cứng y như bà.”"},
  {n:"Nhận sổ, lén đối chiếu",c:{suc:-2},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"thấy sổ mới thiếu hai mươi tấm gấm",l:{danh:-2},lx:"Phùng cô cô biết ngươi soi, đồn ngươi đa nghi, tiếng sút; ngươi mệt rã",rt:"Sổ mới ít hơn sổ cũ đúng hai mươi tấm gấm Tô Châu.",rf:"Phùng cô cô lấy lại sổ trước khi ngươi so xong."},
  {n:"Chép theo sổ mới",c:{duc:-2},w:{suc:3},wx:"nhẹ việc",lx:"che một chỗ thiếu mà không biết, lòng ngươi áy náy về sau",rt:"Việc xong sớm hai ngày."}]},
 c2:{h:"Cung {v} đòi thêm",w:"v",need:["srv"],t:"Người của cung {v} đến đòi thêm than và áo bông: “Chủ ta sợ lạnh.” Phần ấy không có trong lệ, và nếu đưa, cung khác sẽ thiếu.",o:[
  {n:"Đưa đúng lệ, không thêm",c:{danh:-1},w:{duc:3},f:"honest",wx:"sổ khớp",lx:"{v} ghi oán; mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",4)},rt:"Người của {v} bỏ về, đá đổ một sọt than."},
  {n:"Đưa thêm, ghi vào sổ là “hao hụt”",c:{duc:-3},o:()=>45+S.tamco/4,w:{tamco:1},sc:1,wx:"{v} hài lòng",l:{danh:-3},lx:"làm sổ gian, lòng ngươi áy náy; hỏng thì sổ có vết, tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?6:2)},rt:"{v} sai người mang sang một hộp mứt cảm ơn.",rf:"Ma ma thấy chữ “hao hụt”, nhíu mày."},
  {n:"Bảo người của {v} đến gặp ma ma",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"không phải mình gánh",l:{danh:-2},lx:"bị cho là đùn đẩy, tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",3)},rt:"Ma ma chỉ nói một câu, người kia cúi đầu lui.",rf:"Người kia về kể {v} là ngươi khinh nàng."}]},
 /* raised twins of c1/c2/t1/x1 (review road-b3-r1 item 4): a tiểu chủ does not hand out the six palaces' coal; her own share was cut */
 c3:{h:"Phùng cô cô",w:"maid",need:["nsrv"],t:"Phùng cô cô, chưởng sự của Nội vụ phủ, từng là học trò của Lưu ma ma, đích thân mang sổ lệ đến cung ngươi: “Lệ mới, than mỗi cung bớt ba phần. Sổ cũ của bà ấy, bỏ rồi.”",o:[
  {n:"Đòi theo sổ cũ của ma ma",c:{suc:-2},w:{duc:3},f:"honest",wx:"không nhận lệ không có chiếu",lx:"đối chiếu từng trang đến mệt rã; Phùng cô cô phật ý",rt:"Phùng cô cô cười: “Học trò bà ấy, cứng y như bà.”"},
  {n:"Nhận sổ lệ mới, lén đối chiếu",c:{suc:-2},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"know",wx:"thấy lệ mới hụt đúng hai mươi tấm gấm",l:{danh:-2},lx:"Phùng cô cô biết ngươi soi, đồn cung ngươi đa nghi, tiếng sút; ngươi mệt rã",rt:"Sổ lệ mới ít hơn sổ cũ đúng hai mươi tấm gấm Tô Châu, phần ấy không về cung nào.",rf:"Phùng cô cô cho người lấy lại sổ trước khi ngươi so xong."},
  {n:"Nhận lệ mới cho yên",c:{duc:-2},w:{suc:3},wx:"nhẹ việc",lx:"cung ngươi chịu thiếu, che một chỗ hở mà không biết, lòng áy náy về sau",rt:"Than về đúng bảy phần. Ngươi cho người khâu thêm chăn."}]},
 c4:{h:"Than cung ngươi ở đâu",w:"v",need:["nsrv"],t:"Người của cung {v} đến cung ngươi: “Chủ ta sợ lạnh. Phần than cung tiểu chủ bị cắt, nghe nói đã chuyển sang cung ta. Tiểu chủ muốn đòi thì cứ đến.”",o:[
  {n:"Sai người đến Nội vụ phủ đòi đúng lệ",c:{suc:-2},o:()=>45+S.danh/4,w:{danh:2},sc:1,f:"honest",wx:"than về đủ",l:{danh:-2},lx:"Nội vụ phủ đùn sang cung {v}, {v} ghi oán; hỏng thì tiếng sút",go:(A,ok)=>{rdOan(A,"v",ok?4:2)},rt:"Nội vụ phủ trả lại hai phần than trước giờ ngọ.",rf:"Nội vụ phủ bảo: “Than đã phát, hỏi cung {v}.”"},
  {n:"Nhường cung {v} một phần, đổi lấy một lời hứa",c:{duc:-2},o:()=>45+S.tamco/4,w:{tamco:1},sc:1,wx:"{v} nợ ngươi một lần",l:{danh:-2},lx:"nhường của mình cho kẻ ăn bớt, lòng ngươi áy náy; hỏng thì {v} nhận mà không nhớ, tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?6:2)},rt:"{v} sai người mang sang một hộp mứt cảm ơn.",rf:"{v} nhận than, rồi kể khắp nơi cung ngươi sợ nàng."},
  {n:"Mời ma ma ra nói với người của {v}",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"không phải mình gánh",l:{danh:-2},lx:"bị cho là núp sau người thầy, tiếng sút",go:(A,ok)=>{if(ok)rdOan(A,"v",3)},rt:"Ma ma chỉ nói một câu, người kia cúi đầu lui.",rf:"Người kia về kể {v} là ngươi khinh nàng."}]},
 t1:{h:"Thiếu hai mươi tấm",w:"maid",need:["srv"],t:"Đếm lại lần cuối: kho thiếu hai mươi tấm gấm Tô Châu, đúng phần của cung Hoàng hậu. Sương giá còn ba ngày.",o:[
  {n:"Báo ngay với ma ma",c:{danh:-2},w:{duc:2},f:"honest",wx:"ma ma biết sớm",lx:"việc của ngươi thành việc của bà, người ta bảo ngươi non tay, tiếng sút",rt:"Ma ma nhìn sổ, mặt tái đi: “Ta biết ai rồi.”"},
  {n:"Xin đổi gấm thường cho đủ số",need:["srv"],c:{bac:-5},o:()=>45+S.tamco/4,w:{tamco:1},sc:1,wx:"số khớp",l:{tin:-6},lx:"Càn Ninh cung biết gấm khác, ma ma trách, Chủ tin sút; bạc mất trắng",rt:"Không ai để ý.",rf:"Ma ma Càn Ninh cung sờ một cái là biết."},
  {n:"Chép riêng một bản sổ để giữ",c:{suc:-2},w:{mat:1},f:"know",wx:"giữ chứng cứ",lx:"chép đến khuya mệt rã; giữ sổ riêng là phạm luật",rt:"Ngươi giấu bản chép trong gối."}]},
 t2:{h:"Thiếu hai mươi tấm",w:"maid",need:["nsrv"],t:"Lưu ma ma giở sổ lệ cùng ngươi đến khuya: than cung ngươi bị cắt, mà kho còn thiếu cả hai mươi tấm gấm Tô Châu, đúng phần của cung Hoàng hậu. Sương giá còn ba ngày.",o:[
  {n:"Tự bù bằng gấm của cung mình",c:{bac:-40},w:{hh:3},wx:"Hoàng hậu không thiếu",lx:"tốn bạc, che kẻ gian",rt:"Gấm cung ngươi đến Càn Ninh cung đúng hẹn."},
  {n:"Để ma ma báo lên Tổng quản",c:{danh:-2},w:{duc:2},f:"honest",wx:"chuyện lên đúng chỗ",lx:"cung ngươi dính vào sổ sách Nội vụ phủ, người ta bảo ngươi lắm chuyện, tiếng sút",rt:"Ma ma chống gậy đi ngay trong đêm: “Ta biết ai rồi.”"},
  {n:"Chép riêng một bản sổ lệ để giữ",c:{suc:-2},w:{mat:1},f:"know",wx:"giữ chứng cứ",lx:"chép đến khuya mệt rã; giữ sổ riêng của Nội vụ phủ là phạm luật",rt:"Ngươi khóa bản chép trong hộp trang sức."}]},
 x1:{h:"Ngày sương giá",w:"maid",need:["srv"],t:"Sương xuống. Sáu cung chờ áo rét và than. Phùng cô cô đứng ở cửa kho, tay cầm sổ.",o:[
  {n:"Giao đủ sáu cung, ghi thiếu đúng chỗ thiếu",c:{suc:-4},o:A=>40+(A.f.honest?15:0)+(A.f.hard?10:0)+S.duc/6,e:["win","lose"],rt:"Sáu cung đủ áo. Trong sổ, dòng thiếu ghi rõ: “chờ Nội vụ phủ tra.”",rf:"Phùng cô cô tâu lên rằng ngươi làm mất gấm."},
  {n:"Giao đủ, lặng lẽ khép sổ",c:{duc:-2},o:A=>45+(A.f.lead?15:0)+S.tamco/6,e:["win","mid"],lx:"che chỗ thiếu trong sổ, lòng ngươi áy náy; hỏng thì chỉ dừng ở giữa",rt:"Sáu cung đủ áo, không ai kêu.",rf:"Có một cung kêu, nhưng nhỏ."},
  {n:"Xin ma ma đứng ra giao",c:{danh:-2},w:{duc:2},e:"mid",lx:"việc đầu không phải của ngươi, chuyện chỉ dừng ở giữa",rt:"Ma ma đứng ra, ngươi đứng sau."}]},
 x2:{h:"Ngày sương giá",w:"maid",need:["nsrv"],t:"Sương xuống. Than cung ngươi vẫn thiếu ba phần. Phùng cô cô đến thỉnh an, tay cầm sổ lệ mới, chờ ngươi nói một lời.",o:[
  {n:"Đòi đủ phần than theo sổ cũ, chỉ rõ chỗ thiếu",c:{suc:-4},o:A=>40+(A.f.honest?15:0)+(A.f.hard?10:0)+S.duc/6,e:["win","lose"],rt:"Phùng cô cô cúi đầu. Than về đủ trước tối; dòng thiếu trong sổ ghi: “chờ Nội vụ phủ tra.”",rf:"Phùng cô cô tâu lên rằng cung ngươi đòi quá lệ."},
  {n:"Nhận than lệ mới, lặng lẽ cho người mua thêm",c:{bac:-20},o:A=>45+(A.f.lead?15:0)+S.tamco/6,e:["win","mid"],lx:"tốn bạc bù chỗ thiếu, chỗ hở trong sổ vẫn bị che; hỏng thì chỉ dừng ở giữa",rt:"Cung ngươi đủ ấm, không ai kêu.",rf:"Than mua ngoài ít hơn ngươi tưởng."},
  {n:"Mời ma ma đứng ra nói",c:{danh:-2},w:{duc:2},e:"mid",lx:"việc đầu không phải của ngươi, chuyện chỉ dừng ở giữa",rt:"Ma ma đứng ra, ngươi ngồi sau."}]}},
 E:{win:{k:1,tag:"Việc đầu trót lọt",w:"maid",t:LMMT("Sáu cung đủ áo rét trước sương giá. Lưu ma ma vỗ vai ngươi: “Được.” Cả Nội vụ phủ biết bà có một học trò làm được việc.",
   "Than về đủ, không ai bị mắng. Lưu ma ma cúi chào ngươi theo phép tiểu chủ, nhưng khi lui ra, bà khẽ nói: “Học trò của ta.”"),fx:{danh:4},go:()=>[lmmSrv({tin:6}),e67merit(5),lmmCon({tamco:2})].join(" ")},
  mid:{k:0,tag:"Xong việc, còn nợ một câu hỏi",t:"Việc xong, nhưng hai mươi tấm gấm vẫn chưa ai trả lời. Ma ma không nhắc, ngươi cũng không quên.",fx:{duc:2},go:()=>e67merit(2)},
  lose:{k:-1,tag:"Mang tiếng làm mất gấm",t:LMMT("Phùng cô cô tâu rằng ngươi làm mất gấm. Ngươi bị phạt bổng ba tháng. Lưu ma ma không nói gì, chỉ cầm bản sổ của ngươi đi.",
   "Nội vụ phủ tâu rằng cung ngươi “đòi quá lệ”. Hoàng hậu nhắc một câu trước cả điện. Lưu ma ma cúi đầu nhận lỗi thay ngươi."),fx:{danh:-4},go:()=>[lmmSrv({tin:-6}),lmmCon({[CNV_QK()]:-3})].join(" ")}}});

rdDef("cnv_ma",6,{t:"Sổ sách Nội vụ phủ",w:"eun",sj:"khoản thiếu trong sổ Nội vụ phủ",cast(A){return rdCast(A,["v"])},
 g:"Hai mươi tấm gấm chỉ là đầu mối. Lật sổ ba năm, Nội vụ phủ hụt gần ba trăm lạng bạc gấm vóc. Dấu ấn trên các phiếu xuất là của Phùng cô cô; hàng đi về phía cung {v}. Phải có chứng cứ trước kỳ khóa sổ cuối năm, sau đó sổ niêm phong, không ai lật được nữa.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ma ma giao chìa khóa",w:"maid",if:RDW(1),t:LMMT("Lưu ma ma đưa ngươi chìa khóa phòng sổ: “Ban đêm, không ai lên đó. Ta già, mắt kém. Ngươi đọc cho ta.”",
   "Lưu ma ma xin vào cung ngươi lúc chiều tối, trong tay áo là ba cuốn sổ cũ: “Tiểu chủ có người, có đèn, có chỗ kín. Ta xin mượn.”"),o:[
  {n:"Đọc sổ suốt đêm",c:{suc:-5},w:{mat:1},f:"proof",wx:"tìm ra dòng sai",lx:"kiệt sức",rt:"Đến canh tư, ngươi tìm ra mười hai phiếu cùng một nét chữ."},
  {n:"Chỉ chép những trang có dấu Phùng cô cô",c:{suc:-2},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,f:"proof",wx:"nhanh và gọn",l:{danh:-2},lx:"bỏ sót, bị chê làm ẩu, tiếng sút; ngươi mệt rã",rt:"Mười hai phiếu, cùng một dấu, cùng một nơi nhận.",rf:"Ngươi chép sai một trang, phải làm lại."},
  {n:"Khuyên ma ma đừng lật nữa",c:{mat:-1},w:{duc:2},f:"safe",wx:"ma ma được yên",lx:"kẻ gian còn đó, mất một đầu mối",rt:"Ma ma nhìn ngươi lâu, rồi cất sổ: “Ngươi cũng sợ.”"}]},
 s2:{h:"Ma ma bị khóa cửa",w:"maid",if:RDW(0),t:"Sau chuyện áo rét, Phùng cô cô đổi khóa phòng sổ. Lưu ma ma không vào được nữa. Bà chỉ còn bản chép tay ngươi giữ.",o:[
  {n:"Đưa bản chép cho ma ma",c:{mat:-1},w:{duc:2},f:"proof",wx:"ma ma có đầu mối",lx:"bản chép rời tay ngươi, mất một đầu mối",rt:"Ma ma đọc dưới đèn, tay run."},
  {n:"Nhờ tiểu thái giám giữ kho mở cửa",c:{bac:-10},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"vào được phòng sổ",l:{danh:-2},lx:"tiểu thái giám khai ra, tiếng sút; bạc mất trắng",rt:"Tiểu thái giám mở cửa nửa canh giờ.",rf:"Tiểu thái giám nhận bạc rồi báo Phùng cô cô."},
  {n:"Giữ bản chép, chờ thời",c:{danh:-1},w:{tamco:2},f:"safe",wx:"chứng cứ còn trong tay",lx:"kỳ khóa sổ đến gần, người ta bảo ngươi chần chừ, tiếng sút",rt:"Ngươi khâu bản chép vào lót áo."}]},
 c1:{h:"Tiệm lụa ngoài cung",w:"v",t:"Phiếu xuất ghi nơi nhận là cung {v}. Nhưng gấm không ở cung nàng: nó được đem ra bán ở một tiệm lụa ngoài kinh thành, tiệm của nhà ngoại {v}.",o:[
  {n:"Nhờ người ngoài cung mua lại một tấm làm chứng",c:{bac:-10},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"tấm gấm còn dấu Nội vụ phủ",l:{danh:-2},lx:"người ngoài biết chuyện, tiếng sút; bạc mất trắng",go:(A,ok)=>{if(ok)rdOan(A,"v",4)},rt:"Tấm gấm về, mép còn dấu son Nội vụ phủ.",rf:"Tiệm đã cắt mép dấu."},
  {n:"Ghi lại, chưa động",c:{danh:-1},w:{tamco:2},wx:"không lộ",lx:"chưa có vật chứng, người ta bảo ngươi nhát, tiếng sút",rt:"Ngươi ghi tên tiệm vào sổ riêng."},
  {n:"Cho {v} biết là ngươi đã biết",c:{},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"{v} phải dè chừng",l:{danh:-3},lx:"{v} ra tay trước, oán nặng; tiếng ngươi sút",go:(A,ok)=>{rdOan(A,"v",ok?6:10)},rt:"{v} ngừng nhận gấm từ Nội vụ phủ.",rf:"{v} cười: “Ngươi là gì mà dám?”"}]},
 c2:{h:"Phùng cô cô thăm dò",w:"maid",t:LMMT("Phùng cô cô gọi ngươi vào phòng riêng, rót trà: “Ngươi thông minh. Bà già ấy sắp về quê rồi. Theo ta, năm sau ngươi có ghế.”",
   "Phùng cô cô xin vào thỉnh an cung ngươi, mang lễ hậu: “Tiểu chủ mới lên, cần người trong Nội vụ phủ. Bà Lưu già rồi. Có nô tỳ, cung tiểu chủ không bao giờ thiếu than.”"),o:[
  {n:"Nhận lời ngoài mặt",c:{duc:-3},o:()=>45+S.tamco/4,w:{tamco:3},sc:1,f:"two",wx:"được vào sâu hơn",l:{danh:-3},lx:"lòng ngươi áy náy vì nói dối; hỏng thì ma ma nghe được, tiếng sút",rt:"Phùng cô cô tin ngươi, cho ngươi xem sổ riêng của bà ta.",rf:"Lưu ma ma thấy ngươi ra khỏi phòng Phùng cô cô."},
  {n:"Từ chối thẳng",c:{danh:-2},w:{duc:3},f:"safe",wx:"giữ nghĩa thầy trò",lx:"kẻ bị từ chối ghi oán, mất lòng người, tiếng sút",rt:"Phùng cô cô đặt chén trà xuống: “Tiếc.”"},
  {n:"Nhận lễ, kể lại cho ma ma",need:["nsrv"],c:{duc:-2},w:{bac:30},wx:"có thêm bạc",lx:"nhận lễ rồi phản, lòng ngươi áy náy; Phùng cô cô sẽ đòi",rt:"Ma ma nghe xong, cười khan: “Nó vẫn thế.”"},
  {n:"Hỏi Phùng cô cô sao lại phản thầy",need:["srv"],c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,wx:"nghe được một nửa sự thật",l:{tin:-4},lx:"Phùng cô cô giận, mách ma ma ngươi hỗn, Chủ tin sút",rt:"Phùng cô cô im lâu: “Bà ấy chưa từng tiến cử ta.”",rf:"Phùng cô cô quát ngươi ra ngoài."}]},
 t1:{h:"Kỳ khóa sổ còn năm ngày",w:"eun",t:"Còn năm ngày đến kỳ khóa sổ. Một tiểu thái giám kho thì thầm: Phùng cô cô đang cho người chép lại sổ ba năm, “cho sạch”.",o:[
  {n:"Lấy trộm một cuốn sổ gốc",need:["srv"],c:{suc:-3},o:()=>35+S.mat*5+S.tamco/6,w:{mat:2},sc:2,f:"proof",wx:"có sổ gốc",l:{danh:-4},lx:"trộm sổ là tội nặng, tiếng sút nặng; ngươi mệt rã",rt:"Ngươi ôm cuốn sổ gốc qua ba dãy hành lang mà không ai hỏi.",rf:"Thị vệ thấy bóng người, khóa cổng kho."},
  {n:"Sai người thân tín lấy một cuốn sổ gốc",need:["nsrv"],c:{bac:-20},o:()=>35+S.mat*5+S.tamco/6,w:{mat:2},sc:2,f:"proof",wx:"có sổ gốc",l:{danh:-4},lx:"người của ngươi bị bắt là cả cung mang tiếng trộm sổ, tiếng sút nặng; bạc mất trắng",rt:"Người của ngươi ôm cuốn sổ gốc qua ba dãy hành lang mà không ai hỏi.",rf:"Thị vệ thấy bóng người, khóa cổng kho."},
  {n:"Báo Tổng quản thái giám",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"có người trên biết",l:{danh:-2},lx:"Tổng quản đứng về phía kia, đồn ngươi tố bừa, tiếng sút",rt:"{eun} cho niêm phong kho ngay đêm ấy.",rf:"{eun} gật đầu, rồi không làm gì."},
  {n:"Không làm gì, giữ những gì đã có",c:{mat:-1},w:{duc:2},f:"safe",wx:"không phạm luật",lx:"sổ gốc sẽ bị chép lại, mất một đầu mối",rt:"Ngươi chờ."}]},
 x1:{h:"Đêm khóa sổ",w:"eun",t:"Đêm khóa sổ, Nội vụ phủ đèn đuốc sáng trưng. Ai có chứng cứ thì đưa ra đêm nay, mai sổ đã niêm.",o:[
  {n:"Dâng chứng cứ lên Tổng quản",c:{suc:-4},o:A=>35+(A.f.proof?15:0),e:["win","lose"],rt:"{eun} lật từng trang, rồi cho giữ Phùng cô cô lại.",rf:"{eun} bảo: “Chứng cứ mỏng quá.” Phùng cô cô nhìn ngươi."},
  {n:"Đưa chứng cứ cho ma ma tự xử",c:{mat:-1},o:A=>45+(A.f.safe?10:0)+(A.f.two?10:0),e:["win","mid"],lx:"chứng cứ rời tay ngươi, mất một đầu mối; hỏng thì chỉ dừng ở giữa",rt:"Ma ma cầm sổ đến thẳng Tổng quản, đòi tra.",rf:"Ma ma cất sổ đi: “Chưa phải lúc.”"},
  {n:"Đốt bản chép, giữ mình",c:{danh:-2},w:{duc:1},e:"mid",lx:"đầu mối mất, chuyện chỉ dừng ở giữa",rt:"Ngọn lửa nhỏ trong lò, ngươi nhìn đến khi tắt."}]}},
 E:{win:{k:1,tag:"Sổ gốc đã ra ánh sáng",w:"eun",t:"Kho Nội vụ phủ bị niêm, Phùng cô cô bị giữ lại hỏi. Nhưng ngươi biết: người như bà ta không ngã một lần là xong.",fx:{danh:5,mat:1},go:A=>{rdOan(A,"v",6);return [lmmSrv({tin:5}),e67merit(4),lmmCon({tamco:2})].join(" ")}},
  mid:{k:0,tag:"Sổ đã niêm",t:"Sổ niêm phong. Chứng cứ còn trong tay ai đó, chưa ai dùng. Phùng cô cô bình yên, nhưng đã biết có người lật sổ.",fx:{duc:2}},
  lose:{k:-1,tag:"Chứng cứ mỏng",t:"Tổng quản gác lại. Phùng cô cô bình yên, và đã biết ai lật sổ. Lưu ma ma bảo ngươi: “Từ giờ, ngủ đừng sâu.”",fx:{danh:-3},go:()=>lmmSrv({tin:-4})}}});

rdDef("cnv_ma",7,{t:"Ma ma bị tố",w:"eun",sj:"lời tố Lưu ma ma",cast(A){return rdCast(A,["v"])},
 g:"Phùng cô cô ra tay trước: bà ta tố chính Lưu ma ma là kẻ ăn bớt gấm vóc ba năm, dấu ấn trên phiếu là “bà ấy mượn dấu của ta”. Thận hình ty đã đến giải ma ma đi. Bảy ngày nữa tra.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Giải đi giữa ngày",w:"eun",if:RDW(1),t:LMMT("Giữa trưa, người Thận hình ty đến Nội vụ phủ, trói Lưu ma ma trước mặt cả đám học trò. Bà không kêu, chỉ nhìn ngươi một cái.",
   "Tin đến cung ngươi giữa trưa: Lưu ma ma bị Thận hình ty giải đi. Người hầu của ngươi, vốn là học trò của bà, quỳ khóc ngoài sân."),o:[
  {n:"Sai người mang áo ấm theo",if:LMMR,c:{suc:-2},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"heart",wx:"ma ma biết ngươi không bỏ",l:{danh:-2},lx:"người ngươi sai bị đuổi về, cung ngươi bị ghi là che người có tội, tiếng sút",rt:"Người Thận hình ty nhận áo, cho bà khoác thêm.",rf:"Người Thận hình ty đuổi người ngươi sai về, ném áo xuống đất."},
  {n:"Chạy theo, xin cho mang áo ấm",if:()=>!LMMR(),c:{suc:-2},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"heart",wx:"ma ma biết ngươi không bỏ",l:{danh:-2},lx:"bị ghi là đồng bọn, tiếng sút; chạy theo đến rã người",rt:"Người Thận hình ty cho bà khoác thêm áo.",rf:"Người Thận hình ty đẩy ngươi ngã."},
  {n:"Đứng yên, ghi nhớ từng người",c:{duc:-2},w:{tamco:2},f:"cold",wx:"biết ai vui ai buồn",lx:"ma ma đi một mình, lòng ngươi cắn rứt",rt:"Phùng cô cô đứng ở hành lang, khóe miệng cong lên."},
  {n:"Sai người mang bạc lo lót trong ngục",need:["nsrv"],c:{bac:-30},w:{duc:2},wx:"ma ma không bị đánh",lx:"tốn bạc, lộ là ngươi che",rt:"Ma ma được ở phòng có cửa sổ."}]},
 s2:{h:"Ma ma đã nhận tội?",w:"eun",if:RDW(0),t:"Ngươi nghe tin: Lưu ma ma bị giải đi, và có người nói bà đã điểm chỉ một tờ nhận tội. Ngươi không tin.",o:[
  {n:"Sai người tin cẩn vào ngục gặp bà",if:LMMR,c:{bac:-10},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"heart",wx:"biết sự thật",l:{danh:-2},lx:"tên cung ngươi vào sổ thăm tù, tiếng sút; bạc mất trắng",rt:"Người ngươi sai về kể: ma ma lắc đầu, “Ta chưa điểm chỉ gì cả.”",rf:"Lính ngục không cho vào."},
  {n:"Xin vào ngục gặp bà",if:()=>!LMMR(),c:{bac:-10},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"heart",wx:"biết sự thật",l:{danh:-2},lx:"tên ngươi vào sổ thăm tù, tiếng sút; bạc mất trắng",rt:"Ma ma lắc đầu: “Ta chưa điểm chỉ gì cả.”",rf:"Lính ngục không cho vào."},
  {n:"Dò xem tờ nhận tội ở đâu",c:{suc:-2},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"biết tờ ấy giả",l:{danh:-2},lx:"Thận hình ty biết ngươi dò, tiếng sút; ngươi mệt rã",rt:"Tờ nhận tội điểm chỉ ngón trái. Ma ma thuận tay trái đã cụt một đốt từ năm xưa.",rf:"Không ai cho xem."},
  {n:"Lặng lẽ giữ khoảng cách",c:{danh:-2},w:{duc:1},f:"cold",wx:"không bị kéo vào",lx:"ma ma tưởng ngươi bỏ bà, người ta bảo ngươi bạc, tiếng sút",rt:"Ngươi không đến."}]},
 c1:{h:"Học trò của ma ma",w:"maid",t:LMMT("Mấy cung nữ cùng được ma ma dạy rủ nhau ký đơn xin tha. Nếu đơn bị bác, ai ký cũng bị ghi tên.",
   "Học trò của Lưu ma ma đang hầu ở các cung tìm đến ngươi: họ muốn ký đơn xin tha, nhưng cần một tiểu chủ đứng tên đầu."),o:[
  {n:"Ký tên đầu",c:{danh:-2},o:()=>40+S.danh/4,w:{duc:3},sc:1,f:"heart",wx:"cả mạng lưới của ma ma đứng sau ngươi",l:{danh:-2},lx:"ký là mang tiếng bênh người có tội; hỏng thì đơn bị bác, tiếng sút thêm",rt:"Hai mươi ba cái tên, tên ngươi ở đầu.",rf:"Đơn bị giữ lại ở cửa Thận hình ty."},
  {n:"Bảo họ chưa ký, chờ chứng cứ",c:{danh:-1},w:{tamco:2},f:"cold",wx:"không ai bị ghi tên oan",lx:"họ cho là ngươi nhát, tiếng sút",rt:"Họ gật đầu, nhưng có người bỏ về."},
  {n:"Ghi tên từng người, giữ lại cho sau",c:{suc:-2},w:{mat:1},wx:"biết ai còn trung với ma ma",lx:"chép đến mệt rã; giữ danh sách là việc nguy",rt:"Ngươi chép hai mươi ba cái tên vào lót áo."}]},
 c2:{h:"{v} đứng sau",w:"v",t:"Có tin: chính {v} đã xin Hoàng hậu cho Thận hình ty “tra cho nghiêm”. Nàng muốn vụ án khép nhanh, trước khi ai hỏi đến tiệm lụa nhà ngoại nàng.",o:[
  {n:"Tìm gặp {v}",c:{suc:-2},o:()=>35+S.duc/4+S.danh/6,w:{duc:2},sc:1,wx:"{v} nới tay",l:{danh:-2},lx:"{v} biết ngươi biết, trở mặt; tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} khẽ nói: “Ta chỉ cần án khép. Ai chịu tội, ta không quan tâm.”",rf:"{v} quay đi."},
  {n:"Gửi lời đến Hoàng hậu trước {v}",c:{},o:()=>35+CNV_QV()/4+S.danh/5,w:{hh:2},sc:1,wx:"Hoàng hậu không nghe một phía",l:{hh:-3},lx:"Hoàng hậu thấy phiền, không vui",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng hậu dặn Thận hình ty: “Tra cho rõ, đừng vội.”",rf:"Hoàng hậu không tiếp."},
  {n:"Im lặng, không động đến {v}",c:{danh:-2},w:{duc:1},wx:"không thêm kẻ thù",lx:"{v} rảnh tay, người ta bảo ngươi sợ, tiếng sút",rt:"Ngươi để {v} yên."}]},
 t1:{h:"Phùng cô cô gặp riêng",w:"maid",t:LMMT("Phùng cô cô chặn ngươi ở hành lang: “Đưa ta bản chép sổ, ta rút lời tố. Bà ấy về quê dưỡng già, ngươi có ghế. Ai cũng yên.”","Phùng cô cô xin gặp riêng: “Tiểu chủ đưa nô tỳ bản chép sổ, nô tỳ rút lời tố. Bà ấy về quê dưỡng già, cung tiểu chủ không bao giờ thiếu than. Ai cũng yên.”"),o:[
  {n:"Đưa bản chép",c:{duc:-4},w:{suc:3},f:"deal",wx:"ma ma có thể về yên",lx:"chứng cứ mất, lòng ngươi cắn rứt",rt:"Phùng cô cô cầm bản chép, đốt ngay trước mặt ngươi."},
  {n:"Đưa bản chép giả",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,f:"proof",wx:"bà ta tưởng đã thắng",l:{danh:-3},lx:"lộ thì thành thù sống chết, tiếng sút; ngươi mệt rã",rt:"Phùng cô cô đốt bản giả, cười.",rf:"Phùng cô cô lật hai trang là biết."},
  {n:"Từ chối",c:{suc:-2},w:{duc:3},f:"heart",wx:"giữ được chứng cứ",lx:"Phùng cô cô càng ra tay nặng, ngươi giữ thế đến mệt rã",rt:"Phùng cô cô bỏ đi, không nói."}]},
 x1:{h:"Ngày đầu tra",w:"eun",t:LMMT("Ngày đầu tra hỏi. Thận hình ty gọi người làm chứng. Tên ngươi có trong danh sách.","Ngày đầu tra hỏi. Ngươi nay là tiểu chủ, Thận hình ty không được gọi ngươi đến tận nơi; {eun} sai người đến cung ngươi lấy lời chứng, viết thành tờ đóng dấu cung."),o:[
  {n:"Khai đúng những gì đã thấy trong sổ",c:{suc:-3},o:A=>35+(A.f.proof?15:0),e:["win","lose"],rt:"Lời ngươi khớp với sổ gốc. Thận hình ty cho hoãn án, gọi Phùng cô cô.",rf:"Lời ngươi không có vật chứng, bị gạt đi."},
  {n:"Khai ít, chỉ nói ma ma là người tốt",c:{},o:A=>45+(A.f.heart?15:0),e:["mid","lose"],lx:"lời tốt không thay được chứng cứ, hỏng thì ma ma bị xử nặng",rt:"Thận hình ty ghi: “Có người bảo lãnh.” Án hoãn.",rf:"Thận hình ty cho là ngươi bênh thầy."},
  {n:"Cáo bệnh, không làm chứng",c:{duc:-3},w:{suc:3},e:"mid",lx:"ma ma không có ai nói giúp, lòng ngươi cắn rứt; án chỉ treo lại",rt:LMMT("Ngươi nằm trong phòng, nghe tiếng trống tra vọng lại.","Ngươi cáo bệnh, không viết tờ chứng nào. Chiều ấy tiếng trống tra vọng đến tận cung ngươi.")}]}},
 E:{win:{k:1,tag:"Án hoãn, Phùng cô cô bị gọi",w:"eun",t:"Thận hình ty hoãn án Lưu ma ma, gọi Phùng cô cô đến hỏi. Lần đầu tiên, bà ta phải quỳ.",fx:{danh:4},go:A=>{rdOan(A,"v",4);return lmmSrv({tin:4})}},
  mid:{k:0,tag:"Án treo",t:"Án treo. Ma ma vẫn trong ngục, nhưng chưa bị xử. Còn ít ngày để tìm cách.",fx:{duc:1}},
  lose:{k:-1,tag:"Ma ma bị xử nặng",t:"Thận hình ty nghiêng về lời tố. Ma ma bị đánh hai mươi trượng, chờ xử chung thẩm. Phùng cô cô được giao giữ sổ.",fx:{danh:-3},go:()=>lmmSrv({tin:-5})}}});

rdDef("cnv_ma",8,{t:"Bảo vệ thầy",w:"maid",sj:"Lưu ma ma trước ngày chung thẩm",cast(A){return rdCast(A,["v"])},
 g:"Ba ngày nữa Thận hình ty xử chung thẩm. Muốn cứu Lưu ma ma phải có một trong ba thứ trước ngày ấy: sổ gốc, người làm chứng, hoặc một lời của người trên. Mỗi thứ đều có giá.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Phùng cô cô run tay",w:"maid",if:RDW(1),t:"Phùng cô cô bị gọi tra, về Nội vụ phủ thì đóng cửa ba ngày. Người của bà ta chạy ra vào cung {v} liên tục.",o:[
  {n:"Cho người canh cửa cung {v}",c:{bac:-10},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"biết họ bàn gì",l:{danh:-2},lx:"{v} phát hiện, thêm oán; tiếng sút; bạc mất trắng",go:(A,ok)=>{if(!ok)rdOan(A,"v",6)},rt:"Người canh thấy Phùng cô cô mang một rương gỗ vào cung {v}.",rf:"Người canh bị bắt, khai tên ngươi."},
  {n:"Thừa thắng, xin Tổng quản xét nhanh",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"high",wx:"án đi nhanh",l:{danh:-2},lx:"bị nói là nóng vội, tiếng sút; ngươi mệt rã",rt:"{eun} hứa xét ngay ngày chung thẩm.",rf:"{eun} bảo: “Đừng dạy ta làm việc.”"},
  {n:"Báo tin vui vào ngục",c:{bac:-5},w:{duc:2},wx:"ma ma có sức chờ",lx:"tốn chút bạc lo cửa ngục; lộ đường đi của ngươi",rt:LMMT("Ma ma nắm tay ngươi qua song sắt.","Người ngươi sai về kể: ma ma nghe tin, cười lần đầu từ ngày bị giải đi.")}]},
 s2:{h:"Ma ma yếu đi",w:"doc",if:RDW(0),t:"Sau trận đòn, Lưu ma ma sốt cao trong ngục. Nếu bà không gượng nổi đến ngày chung thẩm, án sẽ khép theo lời tố.",o:[
  {n:"Lo thuốc vào ngục",c:{bac:-10},w:{duc:3},f:"heart",wx:"ma ma qua cơn sốt",lx:"tốn bạc, có người thấy",rt:"Ma ma uống thuốc, đêm ấy hạ sốt."},
  {n:"Xin thái y vào khám",c:{suc:-2},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"high",wx:"có thái y làm chứng vết đòn",l:{danh:-2},lx:"Thái y viện ngại dính vào, đồn ngươi làm to chuyện, tiếng sút",rt:"Thái y ghi vết đòn vào sổ.",rf:"Thái y không dám đến."},
  {n:"Viết lại lời khai của ma ma",c:{suc:-2},w:{mat:1},f:"proof",wx:"có lời khai trước khi muộn",lx:"chép đến đèn cạn, ngươi mệt rã",rt:LMMT("Ma ma đọc, ngươi chép, đến khi đèn cạn.","Ma ma đọc, người ngươi sai vào ngục chép, đến khi đèn cạn.")}]},
 c1:{h:"Tiểu thái giám giữ kho",w:"eun",t:"Tiểu thái giám giữ kho từng thấy Phùng cô cô tự đóng dấu phiếu xuất. Hắn sợ: làm chứng thì mất mạng nghề, không làm thì lương tâm cắn.",o:[
  {n:"Hứa che chở cho hắn",c:{suc:-2},o:()=>40+S.danh/4+(LMMR()?10:0),w:{duc:2},sc:1,f:"wit",wx:"có nhân chứng",l:{danh:-2},lx:"hắn bỏ trốn, người ta bảo ngươi hứa suông, tiếng sút; ngươi mệt rã",rt:"Hắn gật đầu: “Nô tài nói.”",rf:"Hắn bỏ trốn khỏi kinh thành."},
  {n:"Cho hắn bạc về quê sau khi khai",c:{bac:-20},o:()=>50+S.mat*4,w:{mat:1},sc:1,f:"wit",wx:"nhân chứng chắc",l:{danh:-3},lx:"mang tiếng mua chứng, tiếng sút; bạc mất trắng",rt:"Hắn nhận bạc, hứa khai.",rf:"Hắn nhận bạc rồi đổi lời."},
  {n:"Để hắn tự quyết",c:{mat:-1},w:{duc:2},wx:"không ép ai",lx:"có thể không có nhân chứng, mất một đầu mối",rt:"Hắn cúi đầu, không hứa."}]},
 c2:{h:"Người trên",w:"hh",if:CNV_QON,t:LMMT("Lưu ma ma từng dạy ma ma thân cận của Hoàng hậu. Nếu ngươi đến xin, một cung nữ nhỏ có thể bị đuổi ra, cũng có thể được nghe một câu.",
   "Lưu ma ma từng dạy ma ma thân cận của Hoàng hậu. Một tiểu chủ đến xin, Hoàng hậu sẽ nghe, nhưng sẽ nhớ ngươi nợ bà một lần."),o:[
  {n:"Đến Càn Ninh cung xin",c:{hh:-2},o:()=>35+S.danh/4+CNV_QV()/5,w:{danh:2},sc:1,f:"high",wx:"Hoàng hậu nhắc Thận hình ty",l:{hh:-3},lx:"nợ Hoàng hậu một lần; hỏng thì bà thấy ngươi lắm chuyện, không vui thêm",rt:"Hoàng hậu nói: “Tra cho công bằng.” Câu ấy đến Thận hình ty trước khi trời tối.",rf:"Hoàng hậu không tiếp."},
  {n:"Nhờ ma ma Càn Ninh cung nói giúp",c:{bac:-10},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"có lời bên tai Hoàng hậu",l:{danh:-2},lx:"nợ một ân tình, hỏng thì đồn ra, tiếng sút; bạc mất trắng",rt:"Ma ma Càn Ninh cung gật đầu: “Thầy ta cũng là thầy ngươi.”",rf:"Bà ấy sợ, từ chối."},
  {n:"Không cầu người trên",c:{danh:-2},w:{duc:2},wx:"không nợ ai",lx:"không có ai đỡ, người ta bảo ngươi kiêu, tiếng sút",rt:"Ngươi tự lo."}]},
 t1:{h:"Đêm trước chung thẩm",w:"maid",t:"Đêm trước chung thẩm, Phùng cô cô gửi lời: “Bà ấy nhận một nửa, ta nhận một nửa. Không ai chết, không ai thắng.”",o:[
  {n:"Chuyển lời cho ma ma",c:{tamco:-1},w:{duc:2},f:"deal",wx:"ma ma tự quyết",lx:"lời ấy là cái bẫy, ngươi bớt sắc sảo",rt:"Ma ma nghe, im rất lâu: “Để ta nghĩ.”"},
  {n:"Từ chối thay ma ma",c:{suc:-2},w:{tamco:2},f:"high",wx:"không lùi một bước",lx:"có thể mất cả; ngươi giữ thế đến mệt rã",rt:"Ngươi gửi lại một chữ: “Không.”"},
  {n:"Đòi Phùng cô cô nhận cả",c:{},o:()=>35+S.tamco/4,w:{tamco:2},sc:1,f:"high",wx:"bà ta lung lay",l:{danh:-2},lx:"bà ta liều, đồn ngươi ép người, tiếng sút",rt:"Người đưa tin của bà ta run run lui ra.",rf:"Phùng cô cô cười lạnh."}]},
 x1:{h:"Chung thẩm",w:"eun",t:LMMT("Thận hình ty mở án chung thẩm. Lưu ma ma quỳ một bên, Phùng cô cô quỳ một bên. Tổng quản thái giám ngồi trên.","Thận hình ty mở án chung thẩm. Lưu ma ma quỳ một bên, Phùng cô cô quỳ một bên. Tổng quản thái giám ngồi trên. Ngươi là tiểu chủ, không ngồi ở đó được: thái giám cung ngươi mang sổ và lời ngươi đến thay."),o:[
  {n:"Đưa nhân chứng và sổ ra",c:{suc:-4},o:A=>35+(A.f.wit?15:0)+(A.f.proof?10:0),e:["win","lose"],rt:"Tiểu thái giám khai, sổ gốc khớp từng dòng. Phùng cô cô cúi rạp.",rf:"Nhân chứng run rẩy đổi lời. Sổ không đủ."},
  {n:"Xin Tổng quản xét lòng ma ma ba mươi năm",c:{danh:-2},o:A=>40+(A.f.high?15:0)+(A.f.heart?10:0)+S.danh/6,e:["win","mid"],lx:"đem tình riêng ra xin, người ta bảo ngươi bênh thầy, tiếng sút; không bắt được kẻ gian, hỏng thì ma ma mất chức",rt:"{eun} gật đầu: “Ba mươi năm không một vết.” Ma ma được tha.",rf:"Ma ma được tha tội, nhưng mất chức."},
  {n:"Chấp nhận mỗi bên nhận một nửa",c:{duc:-3},w:{suc:2},e:"mid",lx:"ma ma mang một nửa tội không phải của bà, lòng ngươi cắn rứt",rt:"Hai người cùng bị phạt bổng. Không ai thắng."}]}},
 E:{win:{k:1,tag:"Thầy được minh oan",w:"maid",t:"Lưu ma ma được tha, trở về Nội vụ phủ. Phùng cô cô bị cắt bổng, giáng xuống giữ kho. Bà ta nhìn ngươi khi đi ngang: chưa xong đâu.",fx:{danh:6,duc:2},go:A=>{rdOan(A,"v",6);return [lmmSrv({tin:8}),e67merit(5),lmmCon({mat:1})].join(" ")}},
  mid:{k:0,tag:"Thầy được tha mà mất chức",t:"Lưu ma ma được tha, nhưng mất chức chưởng quản. Bà dọn về một gian nhà nhỏ cuối Nội vụ phủ. Phùng cô cô vẫn ngồi chỗ cũ.",fx:{duc:2},go:()=>e67merit(2)},
  lose:{k:-1,tag:"Thầy bị đày Tân Giả khố",t:"Lưu ma ma bị xử đày Tân Giả khố. Ba mươi năm dạy người, cuối cùng về giặt áo. Phùng cô cô lên ngồi ghế của bà.",fx:{danh:-4},go:A=>{rdOan(A,"v",3);return lmmSrv({tin:-6})}}}});

rdDef("cnv_ma",9,{t:"Kỳ sát hạch",w:"eun",sj:"kỳ sát hạch của Nội vụ phủ",cast(A){return rdCast(A,["v"])},
 g:LMMT("Kỳ sát hạch cuối năm của Nội vụ phủ: ai qua được thì lên chưởng sự. Ba bài: bày yến, giữ sổ, dạy người. Người chấm năm nay có cả Phùng cô cô.",
  "Kỳ tuyển cung nữ cuối năm: mỗi tiểu chủ được chọn người về hầu. Phùng cô cô lo danh sách, và trong danh sách có tai mắt của {v}. Học trò của Lưu ma ma cũng đứng đó."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ma ma ngồi ghế chấm",w:"maid",if:()=>LMMF()==="win",t:LMMT("Lưu ma ma đã về ghế cũ, ngồi chấm cạnh Phùng cô cô. Bà dặn ngươi: “Ta không nâng ngươi. Ngươi tự qua.”",
   "Lưu ma ma đã về ghế cũ, lặng lẽ đưa ngươi một mảnh giấy: tên bảy cung nữ bà dạy, và tên ba người “đừng nhận”."),o:[
  {n:"Ôn lại từng bài như năm đầu",need:["srv"],c:{suc:-5},w:{tai:2},f:"hard",wx:"tay nghề chắc",lx:"không còn sức cho việc khác",rt:"Ngươi bưng khay trà qua sân sỏi, không sóng một giọt."},
  {n:"Dò bài Phùng cô cô sẽ ra",need:["srv"],c:{bac:-8},o:()=>40+S.mat*5,w:{tamco:2},sc:1,f:"know",wx:"biết trước bẫy",l:{tin:-5},lx:"ma ma biết ngươi dò bài, Chủ tin sút; bạc mất trắng",rt:"Bài giữ sổ có một trang sai cố ý.",rf:"Người dò bài bán tin cho Phùng cô cô."},
  {n:"Nhận danh sách của ma ma",need:["nsrv"],c:{danh:-2},w:{mat:1},f:"know",wx:"biết chọn ai",lx:"chọn theo danh sách là đắc tội Phùng cô cô, bị chê thiên vị, tiếng sút",rt:"Ngươi gấp mảnh giấy vào tay áo."},
  {n:"Tự xem người, không cần danh sách",need:["nsrv"],c:{suc:-2},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"hard",wx:"mắt của mình",l:{danh:-1},lx:"có thể nhận nhầm, tiếng sút; ngươi mệt rã",rt:"Ngươi nhìn ra một cung nữ đếm sai cố ý.",rf:"Ngươi chọn trúng một người của {v}."}]},
 s2:{h:"Không còn thầy bên cạnh",w:"maid",if:()=>LMMF()!=="win",t:LMMT("Lưu ma ma không còn ghế chấm. Phùng cô cô ngồi giữa, nhìn ngươi như nhìn một bài đã chấm trượt sẵn.",
   "Lưu ma ma không còn ghế trong Nội vụ phủ. Phùng cô cô lo cả danh sách tuyển, và người nào bà ta đưa đến cung ngươi, ngươi biết là tai mắt của ai."),o:[
  {n:"Đến hỏi ma ma một lời",c:{bac:-5},w:{tamco:2},f:"know",wx:"ma ma vẫn dạy",lx:"tốn bạc lo cửa; bị thấy đi gặp người có tội",rt:"Ma ma chỉ nói: “Bài thứ ba, đừng sợ.”"},
  {n:"Làm như không có gì",c:{suc:-2},w:{duc:2},f:"hard",wx:"không ai bắt bẻ",lx:"đi một mình, gồng đến mệt rã",rt:"Ngươi bước vào như mọi người."},
  {n:"Xin đổi người chấm",c:{suc:-2},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"bớt một bàn tay",l:{danh:-2},lx:"Phùng cô cô càng ghét, đồn ngươi sợ thi, tiếng sút; ngươi mệt rã",rt:"{eun} cho thêm một người chấm ngoài.",rf:"{eun} bảo: “Ai chấm cũng là chấm.”"}]},
 c1:{h:"Hoàng thượng đi qua",w:"emp",t:LMMT("Giữa bài bày yến, có tiếng hô giá. Hoàng thượng đi tắt qua sân Nội vụ phủ, dừng lại nhìn bàn yến của ngươi.",
   "Hoàng thượng ghé qua kỳ tuyển, ngồi cạnh ngươi xem một lúc: “Nàng chọn người kiểu gì?”"),o:[
  {n:"Cúi đầu làm tiếp",need:["srv"],c:{tai:-1},w:{nt:5,duc:2},wx:"ngài thấy ngươi chăm chú",lx:"không dám ngẩng lên, tài mọn không được thấy",rt:"Ngài nhìn lâu rồi đi, không nói gì."},
  {n:"Dâng ngài một chén trà",need:["srv"],c:{suc:-2},o:()=>40+S.sac/4,w:{nt:12},sc:1,wx:"ngài nhớ mặt ngươi",l:{tin:-5},lx:"Phùng cô cô ghi là rời bài, ma ma trách, Chủ tin sút",rt:"Ngài uống, hỏi: “Học ai?” Ngươi thưa: Lưu ma ma.",rf:"Phùng cô cô bị chấm hạ vì rời bàn."},
  {n:"Thưa: chọn người như ma ma đã dạy",need:["nsrv"],c:{},o:()=>40+S.tai/4,w:{sung:2},sc:1,wx:"ngài nhớ tên Lưu ma ma",l:{danh:-2},lx:"Phùng cô cô nghe, đồn ngươi kết bè, tiếng sút",rt:"Ngài gật đầu: “Bà ấy dạy được người.”",rf:"Ngài chỉ ừ một tiếng."},
  {n:"Mời ngài cùng chọn",need:["nsrv"],c:{suc:-2},w:{sung:2},wx:"ngài vui",lx:"chọn đến mệt rã; người ngài chọn có thể là tai mắt",rt:"Ngài chỉ một cung nữ đứng cuối hàng."}]},
 c2:{h:"Tai mắt của {v}",w:"v",t:LMMT("Một thí sinh cùng kỳ là người cung {v}: nàng ta được báo bài trước, và được dặn làm ngươi trượt bài bày yến.",
   "Ba người trong hàng tuyển là tai mắt {v} gửi qua Phùng cô cô. Nhận thì cung ngươi có thêm tai mắt người ngoài; không nhận thì Phùng cô cô sẽ hỏi vì sao."),o:[
  {n:"Đề phòng mà không làm ầm",c:{suc:-2},w:{tamco:2},f:"know",wx:"không bị gài",lx:"đề phòng đến mệt rã; kẻ gài vẫn còn",rt:"Ngươi giữ mắt trên bàn yến của mình."},
  {n:"Tố với người chấm ngoài",c:{},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"kẻ gài bị loại",l:{danh:-2},lx:"{v} biết, thêm oán; hỏng thì tiếng sút",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Người chấm ngoài cho kẻ ấy ra khỏi hàng.",rf:"Không ai tin."},
  {n:"Nhận một người, để dùng ngược",need:["nsrv"],c:{},o:()=>40+S.tamco/3,w:{mat:2},sc:1,wx:"có đường đưa tin giả cho {v}",l:{danh:-2},lx:"tai mắt ở ngay trong cung, hỏng thì tiếng sút, {v} thêm oán",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"Người ấy về cung ngươi, mang theo đúng những gì ngươi muốn {v} biết.",rf:"Người ấy biết bị dùng, báo lại {v}."}]},
 t1:{h:"Bài thứ ba: dạy người",w:"maid",t:LMMT("Bài cuối: dạy một cung nữ mới trong một nén nhang. Phùng cô cô chọn cho ngươi đứa vụng nhất.",
   "Bài cuối của kỳ tuyển: mỗi tiểu chủ nói vì sao chọn người mình chọn. Phùng cô cô hỏi ngươi trước mặt mọi người."),o:[
  {n:"Dạy như ma ma đã dạy",need:["srv"],c:{suc:-3},o:()=>40+S.tai/4+S.duc/6,w:{danh:2},sc:1,f:"hard",wx:"cách của Lưu ma ma được nhắc lại",l:{danh:-2},lx:"Phùng cô cô bắt bẻ, tiếng sút; ngươi mệt rã",rt:"Đứa vụng bưng khay qua sân, chỉ sóng một giọt.",rf:"Đứa vụng làm đổ khay."},
  {n:"Kể vì sao chọn từng người, như ma ma đã dạy",need:["nsrv"],c:{suc:-3},o:()=>40+S.tai/4+S.duc/6,w:{danh:2},sc:1,f:"hard",wx:"cách của Lưu ma ma được nhắc lại",l:{danh:-2},lx:"Phùng cô cô bắt bẻ, tiếng sút; ngươi mệt rã",rt:"Ngươi kể từng người ngươi chọn và vì sao. Phùng cô cô không bắt được chỗ nào.",rf:"Ngươi nói vấp một chỗ, Phùng cô cô bắt bẻ ngay."},
  {n:"Nói thẳng về sổ sách năm xưa",c:{},o:()=>35+S.danh/4,w:{danh:3},sc:1,wx:"Phùng cô cô mất mặt",l:{danh:-3},lx:LMMT("khơi chuyện cũ giữa kỳ thi, tiếng sút","khơi chuyện cũ giữa kỳ tuyển, tiếng sút"),rt:"Phùng cô cô đỏ mặt, ngồi im.",rf:LMMT("Tổng quản gạt đi: “Đây là kỳ thi.”","Tổng quản gạt đi: “Đây là kỳ tuyển.”")},
  {n:"Nói ít, làm gọn",c:{danh:-1},w:{duc:2},wx:"không bị bắt bẻ",lx:"không ai nhớ, tiếng ngươi nhạt đi",rt:"Ngươi xong trước nén nhang."}]},
 x1:{h:"Ngày công bố",w:"eun",t:LMMT("Tổng quản đọc danh sách người lên chưởng sự. Phùng cô cô cầm bút, chờ ghi.",
   "Danh sách tuyển công bố. Người về cung nào là người của cung ấy cả đời."),o:[
  {n:"Đứng thẳng chờ",c:{danh:-2},o:A=>40+(A.f.hard?15:0)+S.duc/6,e:["win","mid"],lx:"phó mặc cho người chấm, người ta bảo ngươi không dám nói, tiếng sút; hỏng thì chỉ dừng ở giữa",rt:LMMT("Tên ngươi được đọc đầu tiên.","Người ngươi chọn được đọc tên đầu tiên."),rf:LMMT("Tên ngươi được đọc, nhưng ở cuối.","Người ngươi chọn được đọc tên, nhưng kèm một tai mắt.")},
  {n:"Nhắc Tổng quản những gì đã thấy",c:{suc:-3},o:A=>35+(A.f.know?15:0)+S.danh/5,e:["win","lose"],rt:LMMT("{eun} gạch một cái tên của Phùng cô cô, ghi tên ngươi vào.","{eun} gạch ba cái tên Phùng cô cô cài vào, đưa người ngươi chọn về cung ngươi."),rf:"{eun} cho là ngươi tranh."},
  {n:"Nhường chỗ cho học trò khác của ma ma",c:{danh:-2},w:{duc:3},e:"mid",lx:"chờ thêm một kỳ, chuyện chỉ dừng ở giữa",rt:LMMT("Ngươi lùi một bước. Một người khác của ma ma được đọc tên.","Ngươi nhường người giỏi nhất cho một cung khác. Một học trò của ma ma được đọc tên ở đó.")}]}},
 E:{win:{k:1,tag:"Qua kỳ sát hạch",w:"eun",t:LMMT("Ngươi qua cả ba bài. Tên ngươi vào danh sách chờ ghế chưởng sự. Phùng cô cô ghi tên ngươi bằng nét bút rất mạnh.",
   "Cung ngươi nhận đúng những người ngươi muốn. Bảy học trò của Lưu ma ma về các cung, và cả bảy đều biết ai đã đứng ra."),fx:{danh:5},go:A=>{rdOan(A,"v",4);return [lmmSrv({tin:4}),e67merit(6),lmmCon({mat:2})].join(" ")}},
  mid:{k:0,tag:"Qua mà chưa có ghế",t:LMMT("Ngươi qua, nhưng xếp cuối. Năm nay chưa có ghế cho ngươi.","Ngươi nhận được người, nhưng cũng nhận một tai mắt. Phùng cô cô vẫn giữ danh sách."),fx:{duc:2},go:()=>e67merit(3)},
  lose:{k:-1,tag:"Bị đánh trượt",t:LMMT("Phùng cô cô chấm ngươi trượt bài giữ sổ “vì sửa sổ cũ”. Ngươi chờ thêm một năm.",
   "Phùng cô cô đổi danh sách vào giờ chót: ba người về cung ngươi đều là người của {v}."),fx:{danh:-3},go:()=>[lmmSrv({tin:-4}),lmmCon({mat:-1})].join(" ")}}});

rdDef("cnv_ma",10,{t:"Ma ma lâm bệnh",w:"doc",sj:"bệnh của Lưu ma ma",cast(A){return rdCast(A,["v"])},
 g:LMMT("Sau bao năm và một trận tra, Lưu ma ma ngã bệnh. Bà gọi ngươi đến, chỉ vào một chiếc hộp gỗ dưới giường: trong đó là tên mọi cung nữ, thái giám bà từng dạy, ở khắp các cung. Phùng cô cô cũng biết chiếc hộp ấy có thật.",
  "Lưu ma ma ngã bệnh. Bà xin vào cung ngươi một lần cuối, mang theo chiếc hộp gỗ: tên mọi cung nữ, thái giám bà từng dạy, ở khắp các cung. “Trao cho tiểu chủ, hay đốt đi, ta chưa quyết.”"),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bệnh từ lúc nào",w:"doc",if:RDW(1),t:()=>`${LMMF()==="lose"?"Từ Tân Giả khố, tin báo ra: Lưu ma ma ho ra máu, nằm trên đống áo bẩn.":"Lưu ma ma đang ngồi chấm sổ thì gục xuống."} Thái y nói: phải có nhân sâm trước khi trăng tròn, không thì khó qua.`,o:[
  {n:"Lo nhân sâm",c:{bac:-15},w:{duc:3},f:"heart",wx:"ma ma qua cơn",lx:"bạc trong hộp vơi đi một khoản",rt:"Nhân sâm đến kịp. Ma ma mở mắt."},
  {n:"Xin Thái y viện cấp thuốc theo lệ",c:{suc:-2},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"rule",wx:"không tốn bạc riêng",l:{danh:-2},lx:"Thái y viện chậm, đồn ngươi lắm chuyện, tiếng sút; ngươi mệt rã",rt:"Thái y viện cấp thuốc trong ba ngày.",rf:"Thái y viện bảo: “Ma ma không có lệ sâm.”"},
  {n:"Tự sắc thuốc thức đêm",c:{suc:-6},w:{duc:3},f:"heart",wx:"ma ma biết ai ở bên",lx:"sức ngươi cạn",rt:"Ma ma nắm tay ngươi: “Như mẹ ta ngày xưa.”"}]},
 s2:{h:"Bệnh trong lúc đen đủi",w:"doc",if:RDW(0),t:()=>`${LMMF()==="lose"?"Ở Tân Giả khố, Lưu ma ma không còn ai chăm. Người ta để bà nằm cạnh lò hấp áo.":"Không có ghế, không có lương, Lưu ma ma ngã bệnh trong gian nhà nhỏ cuối Nội vụ phủ."} Phải có thuốc trước khi trăng tròn.`,o:[
  {n:"Đưa thuốc lén vào",c:{bac:-10},o:()=>45+S.mat*4,w:{duc:3},sc:1,f:"heart",wx:"ma ma có thuốc",l:{danh:-2},lx:"bị bắt mang đồ cho người có tội, tiếng sút; bạc mất trắng",rt:"Thuốc đến tay ma ma đúng đêm sốt nặng nhất.",rf:"Người canh tịch thu thuốc."},
  {n:"Xin Tổng quản cho bà ra chỗ ấm",c:{suc:-2},o:()=>35+S.danh/4,w:{danh:2},sc:1,f:"rule",wx:"bà có chỗ nằm",l:{danh:-2},lx:"Tổng quản ghi ngươi nợ, đồn ra, tiếng sút; ngươi mệt rã",rt:"{eun} cho bà về phòng có lò sưởi.",rf:"{eun} không trả lời."},
  {n:"Gửi lời, không dám đến",c:{duc:-3},w:{suc:2},wx:"giữ mình",lx:"ma ma một mình, lòng ngươi cắn rứt",rt:"Lời gửi đi. Ma ma đọc xong, cười buồn."}]},
 c1:{h:"Phùng cô cô đến thăm",w:"maid",t:"Phùng cô cô mang theo một hộp bánh đến thăm Lưu ma ma. Bà ta ngồi bên giường lâu, mắt không rời gầm giường.",o:[
  {n:"Ngồi lại đến khi bà ta về",c:{suc:-3},w:{tamco:2},f:"guard",wx:"hộp gỗ không rời mắt ngươi",lx:"mất cả buổi, ngồi đến mỏi rã",rt:"Phùng cô cô ngồi đến tối, rồi về tay không."},
  {n:"Mời bà ta ra, nói thẳng",c:{},o:()=>35+S.danh/4,w:{danh:2},sc:1,wx:"bà ta biết đã bị nhìn thấu",l:{danh:-2},lx:"bà ta liều hơn, đồn ngươi gây sự, tiếng sút",rt:"Phùng cô cô bỏ về, để quên cả hộp bánh.",rf:"Phùng cô cô bảo: “Ta thăm thầy ta, ngươi là gì?”"},
  {n:"Để hai thầy trò cũ nói chuyện",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"peace",wx:"có thể hòa",l:{mat:-1},lx:"hộp gỗ có thể mất, mất một đầu mối",rt:"Ngươi nghe tiếng Phùng cô cô khóc sau cửa.",rf:"Sáng ra, hộp gỗ đã bị lục."}]},
 c2:{h:"{v} muốn chiếc hộp",w:"v",t:"{v} sai người đến hỏi mua chiếc hộp gỗ, trả một giá rất cao. Có tên trong hộp, nàng sẽ biết ai trong các cung có thể mua chuộc.",o:[
  {n:"Từ chối thẳng",c:{danh:-2},w:{duc:3},f:"guard",wx:"giữ được mạng lưới",lx:"kẻ bị từ chối ghi oán, mất lòng người, tiếng sút",go:A=>{rdOan(A,"v",6)},rt:"Người của {v} về, mặt hằm hằm."},
  {n:"Bán một bản chép giả",c:{duc:-3},o:()=>40+S.tamco/3,w:{bac:40},sc:1,wx:"bạc vào, {v} mua phải tên sai",l:{danh:-3},lx:"lừa người, lòng ngươi áy náy; lộ thì thành thù sống chết, tiếng sút",go:(A,ok)=>{rdOan(A,"v",ok?4:12)},rt:"{v} trả bạc cho một danh sách toàn người đã xuất cung.",rf:"{v} nhận ra, sai người đến đòi bạc lại."},
  {n:"Báo Hoàng hậu {v} dòm ngó người các cung",c:{},o:()=>35+CNV_QV()/4+S.danh/5,w:{hh:2},sc:1,wx:"{v} bị nhắc",l:{hh:-2},lx:"Hoàng hậu hỏi chiếc hộp có gì, không vui",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Hoàng hậu nhắc {v} “đừng nhúng tay vào việc Nội vụ phủ”.",rf:"Hoàng hậu hỏi ngược: “Hộp gì?”"}]},
 t1:{h:"Ma ma kể chuyện cũ",w:"maid",t:"Đêm ấy ma ma tỉnh, kể: năm xưa bà từng che cho một chưởng sự ăn bớt, vì người ấy có mẹ già. Người ấy là Phùng cô cô. Bà chưa từng tiến cử nàng, vì sợ nàng lại tham.",o:[
  {n:"Khuyên ma ma nói với Phùng cô cô",c:{},o:()=>35+S.duc/4,w:{duc:3},sc:1,f:"peace",wx:"có thể gỡ nút thắt",l:{danh:-1},lx:"Phùng cô cô không nghe, đồn ra, tiếng sút",rt:"Ma ma gật đầu: “Mai gọi nó đến.”",rf:"Ma ma lắc đầu: “Muộn rồi.”"},
  {n:"Ghi lại lời ma ma làm chứng",c:{suc:-2},w:{mat:1},f:"guard",wx:"thêm một lá bài",lx:"chép đến mệt rã; lấy lời người bệnh làm vũ khí",rt:"Ngươi chép, ma ma điểm chỉ."},
  {n:"Bảo ma ma nghỉ, đừng nghĩ nữa",c:{mat:-1},w:{duc:2},wx:"ma ma yên giấc",lx:"chuyện cũ chôn theo, mất một đầu mối",rt:"Ma ma ngủ, tay vẫn nắm tay ngươi."}]},
 x1:{h:"Chiếc hộp gỗ",w:"maid",t:LMMT("Ma ma mở hộp, đặt tay lên những cuốn sổ nhỏ: “Trao cho ngươi, ngươi sẽ có cả Nội vụ phủ, và cả kẻ thù của ta. Đốt đi, mọi người được yên.”",
   "Ma ma đặt chiếc hộp lên bàn cung ngươi: “Một tiểu chủ có mạng lưới này, sẽ không ai dám động. Nhưng người trong ấy là người của ta, không phải quân của ai.”"),o:[
  {n:"Nhận hộp, hứa giữ người trong ấy",c:{suc:-3},o:A=>35+(A.f.guard?15:0),e:["win","lose"],rt:"Ma ma đặt hộp vào tay ngươi, nhắm mắt nhẹ nhõm.",rf:"Đêm ấy, có người lẻn vào lấy mất nửa hộp."},
  {n:"Xin ma ma tự giữ đến khi khỏe",c:{bac:-15},o:A=>45+(A.f.heart?15:0)+(A.f.peace?10:0),e:["win","mid"],lx:"lo thuốc thang để ma ma tự giữ hộp, tốn bạc; hộp chưa về tay ngươi, hỏng thì chỉ dừng ở giữa",rt:"Ma ma cười: “Thế thì ta phải khỏe.” Đêm ấy bà hạ sốt.",rf:"Ma ma giữ hộp, bệnh không thêm không bớt."},
  {n:"Đốt hộp cùng ma ma",c:{mat:-1},w:{duc:4},e:"mid",go:()=>{try{S.st.f14.lmmBox="burn"}catch(e){}return""},lx:"mạng lưới tan, mất một đầu mối",rt:"Hai người ngồi nhìn lửa đến khi chỉ còn tro."}]}},
 E:{win:{k:1,tag:"Ma ma qua cơn bệnh",w:"maid",t:"Lưu ma ma qua cơn bệnh. Chiếc hộp gỗ ở chỗ an toàn, và Phùng cô cô biết bà ta không lấy được nữa.",fx:{danh:3,duc:2},go:()=>[lmmSrv({tin:5}),lmmCon({mat:1})].join(" ")},
  mid:{k:0,tag:"Ma ma yếu dần",t:"Ma ma qua được đợt này, nhưng yếu đi nhiều. Bà nói đã đến lúc xin về quê.",fx:{duc:2}},
  lose:{k:-1,tag:"Nửa hộp gỗ bị lấy",t:"Nửa chiếc hộp gỗ biến mất trong đêm. Mấy ngày sau, ba cung nữ có tên trong ấy bị đổi đi cung {v}.",fx:{danh:-3,mat:-1},go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("cnv_ma",11,{t:"Chưởng sự",w:"maid",sj:"ghế của Lưu ma ma",cast(A){return rdCast(A,["v"])},
 g:LMMT("Lưu ma ma xin xuất cung về quê. Ghế chưởng sự của bà còn trống, và Phùng cô cô đã ngồi gần nhất. Ai ngồi ghế ấy, người ấy giữ cả lớp cung nữ mới. Đây là kết cục truyện xuất thân của ngươi.",
  "Lưu ma ma xin xuất cung về quê. Ghế của bà ở Nội vụ phủ còn trống, và Phùng cô cô đã ngồi gần nhất. Ai ngồi ghế ấy, người ấy giữ than, gấm và người của cả hậu cung. Đây là kết cục truyện xuất thân của ngươi."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ma ma tiến cử",w:"maid",if:RDW(1),t:LMMT("Trước khi đi, Lưu ma ma viết một tờ tiến cử, đặt tên ngươi lên đầu. Tờ ấy phải đến tay Tổng quản trước ngày bà xuất cung.",
   "Trước khi đi, Lưu ma ma hỏi ngươi: “Ghế của ta, tiểu chủ muốn ai ngồi?” Bà sẽ viết tên ấy vào tờ tiến cử, trước ngày xuất cung."),o:[
  {n:"Tự mang tờ tiến cử đến Tổng quản",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"seat",wx:"tờ tiến cử đến tay",l:{danh:-2},lx:"bị nói là tự tiến cử, tiếng sút; ngươi mệt rã",rt:"{eun} đọc, gật đầu: “Bà Lưu chưa từng tiến cử ai.”",rf:"{eun} bảo để đó."},
  {n:"Xin ma ma viết tên học trò khác",c:{danh:-2},w:{duc:3},f:"give",wx:"không ai nói ngươi tham",lx:"ghế không về tay ngươi, người ta bảo ngươi nhún quá, tiếng sút",rt:"Ma ma nhìn ngươi, rồi viết một tên khác, nét bút chậm."},
  {n:"Xin ma ma đừng tiến cử ai",c:{danh:-2},w:{tamco:2},f:"wait",wx:"không ai thành bia",lx:"để ghế cho người mạnh nhất, tiếng ngươi sút",rt:"Ma ma gấp giấy lại: “Cũng được.”"}]},
 s2:{h:"Ma ma ra đi lặng lẽ",w:"maid",if:RDW(0),t:"Lưu ma ma xin xuất cung, không ai tiễn. Bà đi qua cổng Thần Vũ với một tay nải nhỏ. Ghế của bà, Phùng cô cô đã dọn vào trước khi bà ra khỏi cổng.",o:[
  {n:"Ra cổng Thần Vũ tiễn bà",c:{suc:-2},w:{duc:4},f:"give",wx:"nghĩa thầy trò trọn",lx:"đi bộ ra cổng đến mỏi rã; bị thấy đi tiễn người có tội",rt:"Ma ma quay lại, cúi đầu chào ngươi một lần."},
  {n:"Tặng bà bạc lộ phí",c:{bac:-10},w:{duc:3},wx:"bà về quê đỡ khổ",lx:"bạc trong hộp vơi đi một khoản",rt:"Ma ma nhận, gói vào khăn."},
  {n:"Đứng xa nhìn theo",c:{duc:-2},w:{tamco:2},f:"wait",wx:"không ai ghi tên ngươi",lx:"bà không biết ngươi đến, lòng ngươi áy náy",rt:"Ngươi đứng trên lầu, nhìn đến khi bà khuất."}]},
 c1:{h:"Phùng cô cô ngả giá",w:"maid",t:LMMT("Phùng cô cô gọi ngươi: “Ghế ấy ta ngồi. Ngươi làm phó, ta không đụng đến ngươi.”",
   "Phùng cô cô xin vào cung ngươi, quỳ rất thấp: “Nô tỳ ngồi ghế ấy, cung tiểu chủ năm nào cũng đủ than đủ gấm. Còn chuyện cũ, nô tỳ không nhắc.”"),o:[
  {n:"Từ chối",c:{suc:-2},w:{duc:3},f:"seat",wx:"không bán nghĩa thầy",lx:"Phùng cô cô càng ra tay nặng, ngươi giữ thế đến mệt rã",rt:"Phùng cô cô đứng dậy, phủi gối: “Rồi xem.”"},
  {n:"Nhận lời, giữ lại tờ lời khai của ma ma",c:{duc:-3},w:{tamco:3},f:"wait",wx:"yên, mà vẫn cầm thóp",lx:"bắt tay kẻ phản thầy, lòng ngươi cắn rứt; Nội vụ phủ trong tay Phùng cô cô",rt:"Phùng cô cô biết ngươi cầm thứ gì. Bà ta cúi đầu sâu hơn."},
  {n:"Bảo bà ta đi gặp ma ma trước",c:{},o:()=>35+S.duc/4,w:{duc:2},sc:1,f:"give",wx:"có thể hòa",l:{danh:-1},lx:"bà ta không đi, đồn ngươi dạy đời, tiếng sút",rt:"Phùng cô cô ra cổng Thần Vũ, quỳ trước tay nải của thầy.",rf:"Phùng cô cô cười: “Gặp để làm gì?”"}]},
 c2:{h:"{v} chen vào",w:"v",t:"{v} xin Hoàng hậu cho một ma ma của cung nàng ngồi ghế ấy, “người già dặn”. Có ghế ấy, gấm vóc Nội vụ phủ lại chảy về tiệm lụa nhà nàng.",o:[
  {n:"Dâng lên Hoàng hậu chuyện tiệm lụa",c:{suc:-2},o:()=>35+S.mat*5+S.danh/6,w:{danh:3},sc:1,f:"seat",wx:"{v} phải rút",l:{hh:-2},lx:"Hoàng hậu thấy phiền, không vui; {v} thêm oán; ngươi mệt rã",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"Hoàng hậu bác người của {v}.",rf:"Hoàng hậu bảo: “Chuyện cũ, đừng nhắc.”"},
  {n:"Gặp {v} chia phần",c:{duc:-3},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,wx:"{v} lui",l:{danh:-2},lx:"chia phần với kẻ gian, lòng ngươi áy náy; hỏng thì {v} trở mặt, tiếng sút",go:(A,ok)=>{rdRel(A,"v",ok?10:-4)},rt:"{v} rút người, đổi lấy một phần gấm mỗi năm.",rf:"{v} nhận lời rồi vẫn tiến cử."},
  {n:"Để Hoàng hậu tự xét",c:{danh:-2},w:{duc:2},wx:"không gây thù",lx:"{v} có thể thắng, người ta bảo ngươi buông tay, tiếng sút",rt:"Ngươi không nói gì."}]},
 t1:{h:"Học trò của ma ma",w:"maid",t:"Hai mươi ba học trò của Lưu ma ma ở các cung gửi tin: họ chờ một lời của ngươi. Một lời, họ cùng ký tên xin cho người ngươi chọn.",o:[
  {n:"Xin họ cùng ký",c:{suc:-2},o:()=>40+S.mat*4+S.danh/6,w:{mat:1},sc:1,f:"seat",wx:"cả mạng lưới đứng ra",l:{danh:-2},lx:"lộ ra ngươi có cả một mạng lưới, tiếng sút; ngươi mệt rã",rt:"Hai mươi ba cái tên, mực còn ướt.",rf:"Mấy người sợ, rút tên."},
  {n:"Bảo họ đứng ngoài, giữ mình",c:{mat:-1},w:{duc:3},f:"give",wx:"không ai bị liên lụy",lx:"mất một sức mạnh, mất một đầu mối",rt:"Họ nhận lời, nhưng ai cũng gửi kèm một chữ “Chờ”."},
  {n:"Chỉ nhờ ba người thân nhất",c:{danh:-1},w:{tamco:2},f:"wait",wx:"kín mà chắc",lx:"ít tiếng nói, tiếng ngươi nhỏ đi",rt:"Ba người, ba lời, đến tai Tổng quản vào ba lúc khác nhau."}]},
 x1:{h:"Tổng quản chọn người",w:"eun",t:LMMT("Tổng quản gọi ba người vào: ngươi, Phùng cô cô và một ma ma già. “Ghế này, ai ngồi được?”",
   "Tổng quản đến cung ngươi: “Hoàng hậu giao việc chọn người cho nô tài. Nô tài muốn nghe một lời của tiểu chủ.”"),o:[
  {n:"Nói: ghế ấy phải về người của Lưu ma ma",c:{suc:-4},o:A=>35+(A.f.seat?15:0)+S.danh/6,e:["win","lose"],rt:"{eun} gật đầu chậm: “Người của bà Lưu, thì sổ sẽ sạch.”",rf:"{eun} lắc đầu: “Ai cũng nói thế.”"},
  {n:"Nói: ai ngồi cũng được, miễn sổ sạch",c:{mat:-1},o:A=>45+(A.f.give?15:0)+S.duc/6,e:["win","mid"],lx:"không đòi ghế cho người của ma ma, mạng lưới lỏng ra; hỏng thì chỉ dừng ở giữa",rt:"{eun} cười: “Câu ấy, bà Lưu cũng nói.”",rf:"{eun} chọn người già nhất."},
  {n:"Không nói gì",c:{danh:-2},w:{duc:2},e:"mid",lx:"để ghế cho người khác quyết, chuyện chỉ dừng ở giữa",rt:"Ngươi chỉ cúi đầu."}]}},
 E:{win:{k:1,tag:"Người nối nghiệp Lưu ma ma",w:"maid",t:LMMT(`Ngươi ngồi ghế của Lưu ma ma. Ngày nhận chức, ngươi bưng khay trà đầy đi qua sân sỏi Nội vụ phủ, không sóng một giọt. Cả lớp cung nữ mới đứng nhìn.`,
   "Ghế của Lưu ma ma về tay học trò bà, người do ngươi chọn. Than, gấm và người của Nội vụ phủ, từ nay đi qua tay người của ngươi. Ma ma gửi về một lá thư: “Giữ lấy họ.”"),fx:{danh:8},go:A=>{rdOan(A,"v",4);return [lmmRk(BAL.road.cnvMaRk),lmmCon({mat:2,tamco:2})].join(" ")}},
  mid:{k:0,tag:"Ghế về tay người khác",t:LMMT("Ghế về tay một ma ma già, không phe ai. Ngươi được ghi tên chờ kỳ sau. Lưu ma ma về quê, mang theo nụ cười yên lòng.",
   "Ghế về tay một ma ma già, không phe ai. Nội vụ phủ không thuộc về ngươi, nhưng cũng không còn rò. Lưu ma ma về quê yên lòng."),fx:{duc:3,danh:2},go:()=>e67merit(6)},
  lose:{k:-1,tag:"Nội vụ phủ về tay Phùng cô cô",t:LMMT("Phùng cô cô ngồi ghế. Việc đầu tiên bà ta làm là đẩy ngươi về giặt áo. Đường còn dài, chỉ là từ chỗ thấp nhất.",
   "Phùng cô cô ngồi ghế. Mùa đông năm ấy, than cung ngươi lại thiếu ba phần, và học trò của Lưu ma ma bị đổi đi từng người một."),fx:{danh:-4},go:A=>{rdOan(A,"v",4);return [lmmSrv({tin:-8}),lmmCon({mat:-1})].join(" ")}}}});
RD97L.push({a:"cnv_ma_11",tag:"Lưu ma ma trao lại cả Nội vụ phủ",w:"maid",p:.12,n:"Mời Lưu ma ma và Phùng cô cô cùng ngồi một bàn",c:{suc:-4},
 path:["Bảo bà ta đi gặp ma ma","Ra cổng Thần Vũ tiễn bà","Xin họ cùng ký","Từ chối","chuyện tiệm lụa","Tự mang tờ tiến cử"],np:2,bad:["Nhận lời, giữ lại tờ lời khai","Gặp {v} chia phần"],sc:2,x:[()=>S.duc>=35&&LMMBOX(),"Đức từ 35, chiếc hộp gỗ còn nguyên"],
 t:"Ngươi mời Lưu ma ma và Phùng cô cô ngồi chung một bàn, đặt chiếc hộp gỗ ở giữa. Ma ma mở hộp, nói với Phùng cô cô điều bà giấu ba mươi năm. Phùng cô cô khóc, tự dâng sổ riêng lên Tổng quản. Trước khi xuất cung, ma ma trao chiếc hộp cho ngươi: từ Càn Ninh cung đến Tân Giả khố, ở đâu cũng có người gọi ngươi là “học trò của Lưu ma ma”.",
 fx:{danh:10,mat:2,duc:3},go:()=>[lmmRk(BAL.road.cnvMaRk),lmmCon({tamco:3})].join(" "),rw:"nt_haiduong",ti:"Học trò của Lưu ma ma"});
CNV_QFIX("cnv_ma");
