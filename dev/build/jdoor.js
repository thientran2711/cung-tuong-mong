/* ================= jdoor: ONE FEATURE = ONE BUTTON on a person (act-merge J1, owner OD 26/11 ~07:25Z + ~07:32Z) =================
   Plan: dev/handover/reports/act-merge.md §2 G1–G11 (handover branch); dup-report doors P2/P3/P4 (review/dup-report HANHSU_MERGE §3.1).
   Owner (verbatim, ~07:32Z): "Tức là không phải là cái hành động nào cũng bắt buộc phải gộp đâu nha. Những cái nào mà cần phải để riêng đó, để cho game
   mình nó hay là bắt buộc phải để riêng thì vẫn cứ để riêng" → ONLY true duplicates fold into a door; every act the plan keeps (ĐỂ RIÊNG) stays a button.
   HOW (no act is rewritten, no number typed — law 4):
   (1) talkOpts (the outermost wrapper; loaded right after jdf) folds the options of ONE feature into ONE door option {door:k, open} placed where its first
       member stood. A door needs ≥ 2 members on that person today; a lone member stays a plain button. The raw list stays reachable by NEGATIVE keys:
       talkOpts(p)[-1-j] === raw[j] (array properties, not indexes: map / forEach / length never see them), so talk(-1-j) runs member j through the SAME
       talk() path (price, lock, roll, result card, co-op intent «talk» with a number, log sync) as the old button did.
   (2) a door tap opens the standard choice card (pushDil + PEND «door»: saveable, kit option rows via dilLine, ✕ = Thôi): one row per member with the
       member's own line (optLine: odds word · tốn · thành · hỏng) and its own lock / bạc / khắc reason. Opening costs nothing; the member pays as before.
   (3) the focus view (jdf/jdfv, BAL.df.on): a picked member plays the SAME on-figure game its button played (dfEng / DF_RULE / dfGame / dfStep), then runs.
   (4) two-way law (law 1): NPCs keep their own keys and button names (AGC3BTN unchanged); DOOR.of(name) maps any act name — hers or an NPC's — to the
       same door, and AGC3DOOR[key] = the door an NPC act sits in (role-parity / ag-par3 scans read the same names as before).
   Other jobs (J2 harm doors, J3 Hành sự) may add rows with DOOR.add({k,n,kinds,re,h}); ONE engine for every door. ===================================== */
const DOOR={raw:0,T:[]};window.DOOR=DOOR;
DOOR.add=function(r){if(r&&r.k&&r.re&&!DOOR.T.some(x=>x.k===r.k))DOOR.T.push(r);return DOOR};
/* the doors of the talk side (J1). n = the button; h = the line on top of the choice card; rep = the member whose picture / category the door shows */
[{k:"talk",n:"Trò chuyện",kinds:["rival","hh"],rep:"Hỏi han sức khỏe",h:"Chọn chuyện để nói với nàng.",
  re:/^(Hỏi han sức khỏe|Khen tài nghệ nàng|Bàn tán về |Chia sẻ bí mật|Thử lòng|Cảnh báo nàng|Rỉ tai chuyện trong cung|Nương theo|Tạ lỗi|Nhún nhường|Nhắc lại ân xưa)/},
 {k:"gh",n:"Giao hảo",kinds:["rival","hh"],rep:"Tặng quà",h:"Chọn cách kết thân với nàng.",
  re:/^(Kết giao|Tặng quà|Giúp đỡ nàng|Giúp chăm thú nuôi của nàng|Nhờ giúp đỡ|Mượn son phấn|Ghé chơi)/},
 {k:"play",n:"Cùng chơi / Thách đấu",kinds:["rival","hh"],rep:"Cùng chơi",h:"Chơi cho vui, hay đặt cược ngang giá.",re:/^(Cùng chơi|Thách đấu)/},
 {k:"hau",n:"Hầu chuyện",kinds:["emp"],rep:"Tâng bốc",h:"Chọn lời thưa với Hoàng thượng.",re:/^(Tâng bốc|Nói thật lòng|Bàn chuyện triều chính)$/},
 {k:"pho",n:"Phô tài",kinds:["emp"],rep:null,h:"Chọn môn để phô tài trước Hoàng thượng.",re:/^Phô tài/},
 {k:"so",n:"Xem sổ Kính sự phòng",kinds:["ksp"],rep:"Xem sổ thị tẩm",h:"Chọn sổ muốn xem, và cách xem.",re:/^(Xem sổ thị tẩm|Xem sổ nguyệt sự|Hầu chuyện, xem lén sổ nguyệt sự)/},
 {k:"dola",n:"Dò la tin tức",kinds:["serv","maid"],rep:"Sai đi dò la",h:"Nghe ngóng chung trong cung, hay sai đi dò la một người.",re:/^(Nghe ngóng chung|Sai đi dò la)$/}
].forEach(DOOR.add);
const doorTxt=h=>String(h==null?"":h).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
/* the door of one act name (her button or an NPC's AGC3BTN label), for a person kind (kind omitted = any) */
DOOR.of=function(n,kind){const t=doorTxt(n);if(!t)return null;for(const r of DOOR.T)if((!kind||r.kinds.includes(kind))&&r.re.test(t))return r;return null};
DOOR.byK=k=>DOOR.T.find(r=>r.k===k)||null;
DOOR.names=new Set();DOOR.T.forEach(r=>DOOR.names.add(r.n));
/* the raw option list of a person (every member as its own option), the one the fold reads */
function doorRaw(p){DOOR.raw++;try{return talkOpts(p)}finally{DOOR.raw--}}
window.doorRaw=doorRaw;
function doorFold(p,A){if(!p||!Array.isArray(A)||!A.length)return A;
 const R=A.map(a=>a&&!a.k61&&!a.door?DOOR.of(a.n,p.kind):null);const cnt={};R.forEach(r=>{if(r)cnt[r.k]=(cnt[r.k]||0)+1});
 const out=[],made={};
 A.forEach((a,j)=>{const r=R[j];if(!r||cnt[r.k]<2){out.push(a);return}
  if(!made[r.k]){const M=A.filter((x,i)=>R[i]===r);const free=M.filter(x=>!x.lock);
   const d={n:r.n,door:r.k,o:100,fix:1,act:M.every(x=>x&&x.act)?1:0,x:`chọn một trong ${M.length} việc: ${M.map(x=>doorTxt(x.n)).join(", ")}`,
    open:()=>doorOpen(p,r.k)};
   if(!free.length){d.lock=true;d.t=M[0].t||"chưa làm được"}
   made[r.k]=d;out.push(d)}});
 A.forEach((a,j)=>{out[-1-j]=a});return out}
window.doorFold=doorFold;
/* (1) the outermost talkOpts wrapper */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(DOOR.raw>0)return A;try{return doorFold(p,A)}catch(e){console.error("jdoor fold",e);return A}}})();
/* lists built BY NAME from the raw options (Hành sự cards from the pop-up: directActs, adMaidCards) keep reading the raw list */
["directActs","adMaidCards"].forEach(f=>{if(typeof window[f]!=="function")return;const f0=window[f];window[f]=function(){DOOR.raw++;try{return f0.apply(this,arguments)}finally{DOOR.raw--}}});
/* (2) the door tap: opens the choice card, costs nothing (each member pays its own khắc / bạc when it runs) */
function doorWho(p){try{const v=p&&p.ref;if((p.kind==="rival"||p.kind==="hh")&&v&&v.id!=null)return["r",v.id];if(p.kind==="emp")return["e"];if(p.kind==="th")return["t"];if(p.kind==="maid")return["m"];if(p.kind==="ty")return["d"]}catch(e){}return null}
function doorOpen(p,k){const i=curPeople().indexOf(p);const pi=i>=0?i:popIdx;if(pi==null)return;const r=DOOR.byK(k);pushDil(mkP("door",{i:pi,k}),r?r.n:"Chọn việc");/* the card shows at once (render shows a queued card only on its own redraw path; the focus scene takes it in-scene, jdfv) *//* a door is HER tap inside the person view (jdayq (c): «a card she opens from inside the activity still shows»; the hidden pop-up button jdf clicks is not inside .kfoc, so the tap is marked as hers, as jdayq's own kitModal wrapper does) */
 try{const M=document.getElementById("modal");if(Q.length===1&&M&&M.hidden){const dq=typeof DQ==="object"&&DQ?DQ:null;if(dq)dq.user=(dq.user||0)+1;try{showModal()}finally{if(dq)dq.user--}}}catch(e){}}
window.doorOpen=doorOpen;
(function(){const t0=talk;talk=function(oi){try{if(typeof oi==="number"&&oi>=0&&popIdx!=null&&S&&S.visit&&!S.dead&&!Q.length){const p=curPeople()[popIdx];const a=p&&talkOpts(p)[oi];
  if(a&&a.door){if(a.lock||(S.visit.tk||{})[popIdx]||S.visit.talked===true)return;a.open();render();return}}}catch(e){console.error("jdoor talk",e)}return t0.apply(this,arguments)}})();
/* the choice card: one row per member, its own line and its own reason when it cannot be done now */
PEND.door=pp=>{const p=curPeople()[pp.i];const r=DOOR.byK(pp.k);if(!p||!r||!S.visit)return null;let A;try{A=doorRaw(p)}catch(e){return null}
 const o=[];A.forEach((a,j)=>{if(!a||a.k61||a.door||DOOR.of(a.n,p.kind)!==r)return;const tc=talkK(a);const poor=!!(a.c&&a.c.bac&&S.bac+a.c.bac<0);
  const why=a.lock?doorTxt(a.t)||"chưa làm được":poor?"không đủ bạc":!can(tc)?(doorTxt(typeof whyTime==="function"?whyTime(tc):"")||"hết khắc buổi này"):"";
  let x="";try{x=optLine(a)}catch(e){}
  const row={n:a.n,x:x||"chọn rồi xem kết quả ở bước sau",ton:tc?{khac:-tc}:null,go:()=>doorPick(pp.i,j)};if(why)row.off={why};o.push(row)});
 if(!o.length)return null;o.push({n:"Thôi"});
 const nm=(typeof k61Named!=="function"||!p.ref||k61Named(p.ref))?(p.name||""):"";
 const w=doorWho(p);let who=null;try{who=w&&typeof WHO==="function"?WHO(w):null}catch(e){}
 return{t:`${r.h}${nm?` <b>${nm}</b>`:""}`,o,who}};
/* (3) a picked member: the same road as its old button (talk with the raw key), through the focus game when the focus view is up */
function doorPick(i,j){if(popIdx==null)popIdx=i;const oi=-1-j;
 try{if(typeof DF==="object"&&DF&&DF.F&&typeof dfViewOn==="function"&&dfViewOn()&&doorFocus(i,j))return}catch(e){console.error("jdoor focus",e)}
 talk(oi)}
window.doorPick=doorPick;
function doorFocus(i,j){const F=DF.F;if(!F||DF.play||typeof dfGame!=="function"||typeof dfPlay!=="function")return false;const p=curPeople()[i];if(!p)return false;
 let a=null;try{a=doorRaw(p)[j]}catch(e){}if(!a)return false;const cls=typeof dfCls==="function"?dfCls(a):"C";const eng=typeof dfEng==="function"?dfEng(a.n):"words";
 const nm=doorTxt(a.n);const fake={n:nm,cls,eng};
 const run=res=>{const k=typeof dfHere==="function"?dfHere():i;if(k<0)return;popIdx=k;DF.step=typeof dfStep==="function"?dfStep(res):0;try{talk(-1-j)}finally{DF.step=0}try{dfAfter(fake,res)}catch(e){}};
 if(cls!=="A"){run();return true}/* sure / delegated / own-flow acts: no game, as on their old button */
 const layer=dfPlay(F,()=>{if(DF.play)DF.play.skip()},()=>{const h=DF.play;DF.play=null;if(h)h.destroy()});if(!layer){run();return true}
 const go=()=>{DF.play=dfGame(eng,{box:layer,fig:dfFigBox(F,layer),rank:typeof rkOf==="function"?rkOf(S):S.rank,at:/Ngáng chân/.test(nm)?"feet":null,hud:o=>dfHud(F,o),
  onDone:res=>{DF.play=null;dfUnplay(F);run(res)}});if(!DF.play){dfUnplay(F);run()}};
 DF.play={skip(){DF.play=null;dfUnplay(F);run({raw:null,skipped:true})},destroy(){}};
 const R=(typeof DF_RULE==="object"&&(DF_RULE[eng]||DF_RULE.words))||null;
 if(!R||!F.intro({title:R[0],rows:[["Việc",nm,"t"],["Chạm",R[1],"t"],["Được",R[2],"t"]],go:"Sẵn sàng",sub:"bắt đầu chơi",onGo:()=>{DF.play=null;go()}})){DF.play=null;go()}
 return true}
/* the door's picture + category = its representative member's (one picture per feature; same rule as jact's shared-door twins) */
function doorRep(n){const t=doorTxt(n);const r=DOOR.T.find(x=>x.n===t);return r?(r.rep||null):null}
if(typeof kitActArt==="function"){const k0=kitActArt;kitActArt=function(name){try{const m=doorRep(name);if(m)return k0.call(this,m)}catch(e){}return k0.apply(this,arguments)};window.kitActArt=kitActArt}
if(typeof kitActCat==="function"){const k0=kitActCat;kitActCat=function(name){try{const m=doorRep(name);if(m)return k0.call(this,m)}catch(e){}return k0.apply(this,arguments)};window.kitActCat=kitActCat}
/* (4) two-way: the door an NPC act key sits in (her label of that key → DOOR.of) */
const AGC3DOOR={};try{for(const k in (window.AGC3BTN||{})){const r=DOOR.of(AGC3BTN[k]);if(r)AGC3DOOR[k]=r.n}}catch(e){}
window.AGC3DOOR=AGC3DOOR;
