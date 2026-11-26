/* SELSCENE-2 MOCK timeline (in-page). Staged run on the REAL build with KIT §93 parts only (kitScene, Sc.fig, kitDlgBox, Sc.pair,
   kitNameTagBox, kitBareOpts, kitResultCard, kitNewsRankRow/List, kitEdict fromWord) + kitKnow/kitKnowMany (§42.3) + real greetName (jgreet)
   + real k61Know (j61) + the real Đàn mini-game frame (entExam). Mock-only overlays: the tap ring and the bottom caption (row numbers of the
   owner checklist). Nothing here is product code. */
(function(){
const w=ms=>new Promise(r=>setTimeout(r,ms));const U=k=>typeof IMG_U==="function"?IMG_U("img/"+k):"https://ctm-img.victoria-tntt.workers.dev/img/"+k;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const SS={};window.SS2=SS;
/* mock-only: caption of the checklist rows shown (bottom, over the tab bar) + a tap ring */
SS.cap=t=>{let c=document.getElementById("ss2cap");if(!c){c=document.createElement("div");c.id="ss2cap";c.style.cssText="position:fixed;left:6px;right:6px;bottom:4px;z-index:99999;background:#1d120cdd;color:#f6e7c8;font:600 13px/1.25 system-ui,sans-serif;padding:5px 9px;border-radius:8px;pointer-events:none;text-align:center";document.body.appendChild(c)}c.textContent=t;c.style.display=t?"block":"none"};
SS.tap=async el=>{if(!el)return;const r=el.getBoundingClientRect();const d=document.createElement("div");d.style.cssText=`position:fixed;z-index:99998;left:${r.left+r.width*.5-22}px;top:${r.top+Math.min(r.height*.5,40)-22}px;width:44px;height:44px;border-radius:50%;border:3px solid #fff;background:#ffffff55;box-shadow:0 0 0 3px #b8901f;pointer-events:none`;document.body.appendChild(d);
 d.animate([{transform:"scale(.4)",opacity:0},{transform:"scale(1)",opacity:1},{transform:"scale(1.25)",opacity:0}],{duration:650});await w(420);try{el.click()}catch(e){}setTimeout(()=>d.remove(),400)};
/* kc (khuê các / tú nữ) dress for a girl in the yard: the -kc- variant of her own figure (no huadian: she is not a consort yet) */
SS.kc=p=>{let f=figFor(p);return /fig-consort-c\d+-/.test(f)?f.replace(/(fig-consort-c\d+)-[a-z0-9]+-(a\d+)/,"$1-kc-$2"):f};
SS.cue=c=>String(c||"").replace(/Thái hậu|Hoàng thượng|Hoàng hậu/g,"Bề trên");
SS.story=(...ps)=>`<div class="kpmain">${ps.map(p=>`<p>${p}</p>`).join("")}</div>`;
SS.narr=()=>{try{elderInit()}catch(e){}const st=elderBy("gt");return st?{st,name:st.call,fig:figFor(st)}:{name:"Ma ma",fig:U("fig-mama-k01-a51.webp")}};
SS.eun=()=>U("fig-eunuch-u01-r2-a36.webp");
/* wait until an option is picked */
SS.pick=(list)=>new Promise(res=>{const o=kitBareOpts(list,x=>res(x));SS.lastOpts=o;res.node=o;SS._o=o});
SS.opts=(list)=>{let done;const p=new Promise(r=>done=r);const o=kitBareOpts(list,x=>done(x));return{node:o,p}};
SS.choose=async(O,i)=>{await w(900);const b=O.node.querySelectorAll("button.ka")[i];if(b)b.scrollIntoView({block:"nearest"});await w(250);await SS.tap(b);return O.p};
SS.res=(title,duoc,mat,ok,note)=>kitResultCard({title,ok:ok==null?null:ok,rows:[{k:"duoc",label:"Được",items:duoc||[]},{k:"mat",label:"Mất",items:mat||[]},{k:"note",label:"Ghi chú",items:note||[]}]});
SS.closeRes=()=>{const t=document.getElementById("rtoast");if(t)t.classList.remove("on")};
SS.close=()=>new Promise(r=>{try{kitScene.close(false,r)}catch(e){r()}});
SS.khac=n=>{try{used=BAL.time.khac-n;render()}catch(e){}};
SS.girls=()=>{const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.queen);return L.filter(v=>/fig-consort-c\d+-/.test(figFor(v))).concat(L.filter(v=>!/fig-consort-c\d+-/.test(figFor(v))))};
SS.tnOn=G=>{G.forEach(v=>v.__tn=1);if(!SS._rk){SS._rk=1;const r0=rkName;rkName=function(p){return p&&p.__tn?"Tú nữ":r0.apply(this,arguments)};window.rkName=rkName;const t0=kitTitle;kitTitle=function(p){return p&&p.__tn?"":t0.apply(this,arguments)};window.kitTitle=kitTitle}};
SS.mkCast=()=>{const G=SS.girls();SS.tnOn(G);const gv=v=>{try{return grNet(v)}catch(e){return 1}};const A=G.find(v=>gv(v))||G[0],B=G.find(v=>v!==A&&!gv(v))||G.find(v=>v!==A);const rest=G.filter(v=>v!==A&&v!==B);const bully=rest.find(v=>/Kiêu ngạo|Nóng nảy|Thù dai/.test((netOf(v)||[]).join()))||rest[0];const victim=rest.find(v=>v!==bully);const others=G.filter(v=>![A,B,bully,victim].includes(v));return{A,B,bully,victim,others,G}};
SS.unknowAll=L=>{for(const v of L){try{S.known[kOf61(v)]=0;if(S.met)delete S.met[v.id]}catch(e){}}};
SS.st=v=>{try{return k61St(v)}catch(e){return 0}};
/* a row of yard girls on the scene layer (full body, never clipped), each with her kit name tag at the stage she is known */
SS.line=async(Sc,L,o={})=>{const g=Sc.L.g,ip=document.documentElement.classList.contains("kv2");const n=L.length;const fh=Math.round(g.H*(o.fh||(ip?.62:.52)));const top=o.top!=null?o.top:g.H-fh-6;
 const x0=o.x0!=null?o.x0:.10,x1=o.x1!=null?o.x1:.90;const figs=[];
 for(let i=0;i<n;i++){const v=L[i];const cx=g.w*(x0+(x1-x0)*(n===1?.5:i/(n-1)));const im=await Sc.fig(v===S?SS.kc(S):(v.src||SS.kc(v)),{cx,top:top+(i%2?10:0),fh,z:2+(i%2)});figs.push(im);if(o.free)im.style.left=(cx-parseFloat(im.style.width)/2)+"px";
  if(o.tags!==false&&v!==S){const t=document.createElement("div");t.style.cssText=`position:absolute;z-index:3;left:${cx}px;top:${top+(i%2?10:0)-30}px;transform:translateX(-50%)`;t.innerHTML=SS.tagH(v);Sc.L.appendChild(t);(Sc.L.tags=Sc.L.tags||[]).push([v,t])}
  if(v===S&&o.me!==false){const t=document.createElement("div");t.style.cssText=`position:absolute;z-index:3;left:${cx}px;top:${top+(i%2?10:0)-30}px;transform:translateX(-50%)`;t.innerHTML=`<span class="kscn-tag"><span class="j59t">Ta</span><span class="j59n">${esc(S.name)}</span></span>`;Sc.L.appendChild(t)}}
 return figs};
SS.tagH=v=>{const st=v.__st!=null?v.__st:SS.st(v);return kitNameTagBox(v,{stage:1,title:"Tú nữ",ph:st>=2?v.name:st>=1?(v.__ph||"Chưa rõ tên"):"Người lạ"})};
SS.retag=(Sc)=>{for(const [v,t] of (Sc.L.tags||[]))t.innerHTML=SS.tagH(v)};
SS.tn=h=>String(h||"").replace(new RegExp("(một phi tần áo bậc |phi tần )?("+RANKS.map(r=>r.n).sort((a,b)=>b.length-a.length).join("|")+")","g"),"tú nữ");
SS.know=(v,how,st)=>{try{k61Know(v,how,false,st||2)}catch(e){console.error(e)}};
/* =========================================================== C1 SÂN CHỜ =========================================================== */
SS.c1=async()=>{const N=SS.narr();const C0=SS.mkCast();const {A,B,bully,victim,others,G}=C0;SS.unknowAll(G);SS.cast=C0;
 SS.khac(4);SS.cap("Kiếp thứ … ở góc trên · Cảnh mở: nền rõ rồi mờ (hàng 4, 8, 13)");
 /* 1. arrival at the gate: picture clear first, then blurred, then the ma ma narrator + her */
 let Sc=kitScene.open({bg:U("bg-origin-cnv.webp"),intro:1600});
 let O=SS.opts([{n:"Theo ma ma vào sân chờ"}]);
 await Sc.pair({msgr:N.fig,me:SS.kc(S),storyTitle:`${N.name} · Giáo tập ma ma`,story:[SS.story("Năm ấy kỳ tuyển tú mở ở Thần Vũ môn. Xe ngựa các nhà đưa tú nữ tới từ lúc sáng sớm.",`${esc(S.name)}, ${esc(S.origin.n.toLowerCase())}, cũng ở trong số đó.`,"«Các tiểu chủ vào sân chờ. Bề trên gọi đến lượt ai, người ấy mới được vào điện.»")],choiceTitle:S.name,choice:[O.node]});
 Sc.show();await w(5200);SS.cap("Hàng 18: người dẫn chuyện = ma ma · hàng 1, 3, 5: người bên trái, toàn thân, không cắt");await SS.choose(O,0);await SS.close();
 /* 2. the yard: 12 tú nữ chatting; ONE buổi of 4 khắc (normal khắc counter in the top bar, no seconds) */
 SS.cap("Hàng 14, 24, 31: sân chờ 12 tú nữ · một buổi = 4 khắc (xem chấm khắc ở thanh trên), không đếm giây");
 Sc=kitScene.open({bg:U("ev-q72-tu-nu.webp"),intro:1300});SS.Sc=Sc;
 const row1=[A,B,S,victim,bully].filter(Boolean);await SS.line(Sc,row1,{x0:.09,x1:.91});
 const ip=document.documentElement.classList.contains("kv2"),g=Sc.L.g;const bx={x:Math.round(g.w*.04),y:8,w:Math.round(g.w*.92)};
 const box=Sc.box(`${N.name} · Giáo tập ma ma`,[SS.story("Tú nữ đứng thành từng tốp, khẽ trò chuyện dưới hiên. Còn <b>một buổi</b> — bốn khắc — nữa mới đến giờ gọi vào điện.","Tiểu chủ muốn làm gì thì làm, mỗi việc tốn một khắc.")],{...bx},null,{kind:"story"});
 Sc.show();await w(5600);
 /* pan the yard: the line slides to show the other girls at full size (never shrunk) */
 SS.cap("Hàng 24: sân chờ trượt ngang, người giữ nguyên cỡ (không thu nhỏ)");
 const shift=g.w*.9;const slide=(els,d)=>els.forEach(e=>{const l=parseFloat(e.style.left)||0;e.animate([{left:l+"px"},{left:(l+d)+"px"}],{duration:1400,fill:"forwards",easing:"ease-in-out"})});
 const all0=[...Sc.L.figs,...(Sc.L.tags||[]).map(x=>x[1])];const row2=others.slice(0,4);const f2=await SS.line(Sc,row2,{x0:1.05,x1:1.85,free:1});const all2=[...f2,...(Sc.L.tags||[]).slice(-row2.length).map(x=>x[1])];
 const both=[...all0,...all2];slide(both,-shift);await w(4200);both.forEach(e=>e.getAnimations().forEach(a=>a.cancel()));
 both.forEach(e=>{const l=parseFloat(e.style.left)||0;e.animate([{left:(l-shift)+"px"},{left:l+"px"}],{duration:1400,fill:"forwards",easing:"ease-in-out"})});await w(1700);
 box.remove();Sc.L.boxes=Sc.L.boxes.filter(b=>b!==box);
 /* the act menu (bare kit option cards: no odds, no gain/loss lines — selection scene only) */
 const menu=async(title,story,list,pickI)=>{const O=SS.opts(list);const b=Sc.box(title,[story,O.node],{x:Math.round(g.w*(ip?.50:.36)),y:8,w:Math.round(g.w*(ip?.47:.61)),h:Math.round(g.H*(ip?.62:.55))},null,{kind:"choice"});b.animate([{opacity:0,transform:"translateX(30px)"},{opacity:1,transform:"none"}],{duration:320,fill:"both"});
  const r=await SS.choose(O,pickI);await w(200);b.remove();Sc.L.boxes=Sc.L.boxes.filter(x=>x!==b);return r};
 const acts=k=>[{n:"Chào hỏi một tú nữ"},{n:"Hỏi danh tính"},{n:"Dò hỏi về các vị trên điện"},{n:"Chỉnh lại xiêm y"},{n:"Đứng yên quan sát"}];
 /* khắc 1: Dò hỏi (skill, not luck: learn Thái hậu's value before the hall) */
 SS.cap("Hàng 41, 38: «Dò hỏi» 1 khắc — biết trước điều bề trên trọng · thẻ lựa chọn trần, không độ chắc, không được/mất");
 await menu(`${S.name} · còn 4 khắc`,SS.story("Ngươi định làm gì?"),acts(),2);
 const TH=S.thO;const val=({phat:"chữ Nhân — lòng thương kẻ dưới",tuai:"chữ Hiếu",nghiem:"chữ Lễ",danghi:"chữ Tín",quyen:"chữ Trung"})[(TH&&(TH.arch||TH.trait))||"phat"]||"chữ Nhân";
 let O2=SS.opts([{n:"Kính cẩn cảm tạ ma ma"}]);
 const bm=Sc.box(`${N.name} · Giáo tập ma ma`,[SS.story(`Ngươi khẽ hỏi: «Ma ma, Thái hậu nương nương trọng điều gì?»`,`Ma ma liếc quanh, hạ giọng: «Thái hậu một lòng hướng Phật, trọng ${val}. Ai thương kẻ dưới, người quý.»`),O2.node],{x:Math.round(g.w*(ip?.50:.36)),y:8,w:Math.round(g.w*(ip?.47:.61))},null,{kind:"story"});
 SS.khac(3);try{kitKnow({key:"th-val",text:`Thái hậu trọng ${val}.`,pri:2})}catch(e){}
 SS.res("Dò hỏi ma ma",[`Biết: Thái hậu trọng ${val}`,"Ma ma: có thiện cảm với ta hơn"],["Khắc −1"],true);
 await w(4200);await SS.choose(O2,0);bm.remove();Sc.L.boxes=Sc.L.boxes.filter(x=>x!==bm);SS.closeRes();
 /* an NPC greets HER (two-way law): equals exchange names unless proud/cold — the ONE greeting rule (jgreet greetName) */
 SS.cap("Hàng 21 (hai chiều): một tú nữ tự đến chào ta — ngang hàng thì xưng tên, trừ người kiêu/lạnh (luật chào hỏi có sẵn)");
 const sv=[];const eq=(...L)=>{for(const v of L){sv.push([v,v.rank]);v.rank=S.rank}};const back=()=>{for(const [v,r] of sv)v.rank=r;sv.length=0};
 eq(A);let G1;try{G1=greetName(A,S)}finally{back()}SS.retag(Sc);
 let O3=SS.opts([{n:"Đáp lễ"}]);
 const ba=Sc.box(`Tú nữ áo ${["hồng","xanh","vàng"][0]}`,[SS.story(`Một tú nữ bước tới, khẽ nhún chào: «Muội họ ${esc(A.name.split(" ")[0])}, tên ${esc(A.name.split(" ").slice(1).join(" "))}, xin hỏi tỷ tỷ quý tính?»`,SS.tn(G1.line)),O3.node],{x:Math.round(g.w*(ip?.50:.36)),y:8,w:Math.round(g.w*(ip?.47:.61))},null,{kind:"story"});
 await w(5200);await SS.choose(O3,0);ba.remove();Sc.L.boxes=Sc.L.boxes.filter(x=>x!==ba);
 SS.res("Tú nữ chào hỏi",[`Biết mặt, biết tên: ${esc(A.name)}`,`${esc(A.name)}: biết tên ta`],["Không tốn khắc (nàng đến chào)"],true);await w(3000);SS.closeRes();
 /* khắc 2: greet the proud girl → face only (her nết) */
 SS.cap("Hàng 21: chào người kiêu kỳ → chỉ biết mặt, không biết tên · dòng «Vì sao» nói lý do");
 await menu(`${S.name} · còn 3 khắc`,SS.story("Phía bên kia, một tú nữ đứng riêng, cằm hơi ngẩng."),acts(),0);
 eq(B);let G2;try{G2=greetName(S,B)}finally{back()}SS.khac(2);SS.retag(Sc);
 let O4=SS.opts([{n:"Lui về chỗ"}]);const bb=Sc.box("Tú nữ",[SS.story(SS.tn(G2.line)||"Nàng chỉ khẽ gật đầu."),O4.node],{x:Math.round(g.w*(ip?.50:.36)),y:8,w:Math.round(g.w*(ip?.47:.61))},null,{kind:"story"});
 SS.res("Chào hỏi",[`Biết mặt: ${esc(kitUnkName(B,{ph:"tú nữ đứng riêng"}))}`],["Khắc −1","Chưa biết tên nàng"],null);await w(5400);SS.closeRes();await SS.choose(O4,0);bb.remove();Sc.L.boxes=Sc.L.boxes.filter(x=>x!==bb);
 /* khắc 3: «Hỏi danh tính» (the existing second step, normal khắc cost) */
 SS.cap("Hàng 29: «Hỏi danh tính» = bước có sẵn của game, tốn 1 khắc như thường");
 await menu(`${S.name} · còn 2 khắc`,SS.story("Phía bậc thềm có tiếng xôn xao, nhưng ngươi vẫn muốn biết danh tính tú nữ kiêu kỳ kia."),acts(),1);
 SS.know(B,"Ngươi kính cẩn hỏi danh tính, nàng nhíu mày rồi xưng danh.",2);SS.khac(1);SS.retag(Sc);
 SS.res("Hỏi danh tính",[`Biết tên: ${esc(B.name)}`],["Khắc −1"],true);await w(3600);SS.closeRes();
 /* the yard drama has grown while khắc passed (yd-001 chén trà; actors = real girls of this life by nết) */
 SS.cap("Hàng 22, 23: drama sân chờ (mỗi kiếp khác nhau: kho ≥60 tình huống × người thật theo nết) · người xung quanh tự phản ứng theo nết");
 const tag=(v,role)=>`<b>${esc(v.name.split(" ").pop())}</b>`;
 const btxt=`Tiểu thái giám bưng khay trà đi ngang; tú nữ áo đỏ «vô ý» xô khuỷu tay, chén trà đổ ướt cả tà xiêm của tú nữ áo nhạt. Chưa đến giờ vào sảnh, mà xiêm áo đã loang một mảng.`;
 const react=[`Một tú nữ hiền lành rút khăn: «Muội đừng sợ, tỷ có khăn đây.»`,`Một tú nữ khác rón rén chạy đi tìm ma ma.`,`${esc(A.name)} cúi đầu, không dám nhìn.`];
 const O5=SS.opts([{n:"Ta chỉ thẳng tú nữ áo đỏ: «Tỷ cố ý, ta thấy rõ.»"},{n:"Ta cười nhạt theo: «Xiêm áo vụng giữ thì hỏng thôi.»"},{n:"Ta nhường khăn choàng, nhẹ lời: «Việc nhỏ, đừng làm ồn.»"},{n:"Ta lùi một bước, quay sang chuyện trò với người khác."}]);
 const bd=Sc.box("Sân chờ · bậc thềm trước sảnh",[SS.story(btxt,react.join("<br>")),O5.node],{x:Math.round(g.w*(ip?.50:.36)),y:8,w:Math.round(g.w*(ip?.47:.61)),h:Math.round(g.H*(ip?.70:.62))},null,{kind:"choice"});
 const r5=await SS.choose(O5,0);bd.remove();Sc.L.boxes=Sc.L.boxes.filter(x=>x!==bd);SS.khac(0);
 /* she stepped in → faces of everyone in the drama (and they know hers); the defended girl gives her name in thanks; the proud bully throws her family */
 SS.know(victim,"Nàng nắm tay ngươi, xưng danh cảm tạ.",2);SS.know(bully,"",false,1);bully.__st=1;bully.__ph="Con gái Đô thống";try{npcLearn(victim,S);npcLearn(bully,S)}catch(e){}SS.retag(Sc);
 SS.cap("Hàng 28: bênh người → biết mặt mọi người trong chuyện, họ cũng biết ta; người được bênh xưng tên cảm tạ; kẻ kiêu chỉ quăng gia thế");
 const O6=SS.opts([{n:"Tiếp tục"}]);
 const be=Sc.box(`${N.name} · Giáo tập ma ma`,[SS.story(`Tú nữ áo đỏ tái mặt: «Ngươi biết cha ta là Đô thống chăng?» Tú nữ áo nhạt mắt đỏ hoe: «Muội là ${esc(victim.name)}, đa tạ tỷ tỷ.»`,"Tiếng cãi lọt đến tai ma ma. Ma ma thở dài: «Xiêm áo có thể thay, lòng người một lần dơ khó rửa.»"),O6.node],{x:Math.round(g.w*(ip?.50:.36)),y:8,w:Math.round(g.w*(ip?.47:.61))},null,{kind:"story"});
 SS.res("Bênh vực tú nữ bị đổ trà",[`${esc(victim.name)}: có thiện cảm với ta hơn`,"Đức: được tiếng có nghĩa",`Biết tên: ${esc(victim.name)}`],["Tú nữ áo đỏ (con gái Đô thống): oán ta","Ma ma: chê ta làm ồn","Khắc −1"],null);
 await w(6200);SS.closeRes();await SS.choose(O6,0);be.remove();Sc.L.boxes=Sc.L.boxes.filter(x=>x!==be);
 SS.cap("Hàng 31: hết 4 khắc → bề trên gọi vào điện");
 const O7=SS.opts([{n:"Vào điện"}]);Sc.box(`${N.name} · Giáo tập ma ma`,[SS.story("Bốn khắc đã hết. Tiếng thái giám vọng ra: «Lượt thứ nhất — vào điện!»"),O7.node],{x:Math.round(g.w*(ip?.50:.36)),y:8,w:Math.round(g.w*(ip?.47:.61))},null,{kind:"story"});
 await SS.choose(O7,0);await SS.close();SS.cap("");};
/* =========================================================== C2 ĐIỆN TUYỂN =========================================================== */
SS.c2=async(fast)=>{const N=SS.narr();const C=SS.cast||SS.mkCast();
 if(!SS.cast){SS.cast=C;SS.unknowAll(C.G);SS.know(C.A,"",2);SS.know(C.B,"",2);SS.know(C.victim,"",2);SS.know(C.bully,"",1);C.bully.__st=1;C.bully.__ph="Con gái Đô thống"}
 const ip=()=>document.documentElement.classList.contains("kv2");
 /* rounds 1–2: she watches; real girls; known ones by face (+ name), the rest «một tú nữ» */
 SS.cap("Hàng 16, 17: lượt 1–2 ta chỉ đứng xem · người quen hiện mặt + tên, người lạ là «một tú nữ» · chỉ biết giữ thẻ / ban hoa, không biết phẩm");
 let Sc=kitScene.open({bg:U("ev-tuyen-tu.webp"),intro:1300});let g=Sc.L.g;
 const r1=[C.A,C.others[0],C.bully,C.others[1]],r2=[C.B,C.others[2]];
 const R=(v,kept)=>kitNewsRankRow(v,{rank:kept?"Giữ thẻ bài":"Ban hoa",how:SS.st(v)>=1?"quen ở sân chờ":"",ph:"một tú nữ"});
 let O=SS.opts([{n:"Đợi đến lượt mình"}]);
 await Sc.pair({msgr:SS.narr().fig,me:SS.kc(S),storyTitle:`${N.name} · Giáo tập ma ma`,story:[SS.story("Lượt thứ nhất trở ra:"),kitNewsRankList([R(r1[0],1),R(r1[1],0),R(r1[2],1),R(r1[3],0)]),SS.story("Lượt thứ hai trở ra:"),kitNewsRankList([R(r2[0],1),R(r2[1],0)])],choiceTitle:S.name,choice:[O.node]});
 Sc.show();await w(fast?5000:8000);await SS.choose(O,0);await SS.close();
 /* round 3 (hers): the presenting eunuch reads each girl's name + father's office → names of round-mates known */
 SS.cap("Hàng 25: lượt của ta — thái giám đọc tên + chức cha từng người → biết mặt, biết tên người cùng lượt");
 const pool=[...C.others].reverse();const mates=[C.victim,pool[0],pool[1]];
 Sc=kitScene.open({bg:U("ev-tuyen-tu.webp"),intro:900});g=Sc.L.g;await SS.line(Sc,[mates[0],S,mates[1],mates[2]],{x0:.12,x1:.88,fh:ip()?.60:.50});
 const offs=["Thị lang bộ Lễ","Tri phủ Tô Châu","Tham tướng Cẩm y vệ"];
 const O2=SS.opts([{n:"Cúi đầu theo hàng vào điện"}]);
 Sc.show();await w(3200);for(const v of mates)SS.know(v,"Thái giám xướng danh từng người cùng lượt.",2);SS.retag(Sc);
 Sc.box("Thái giám xướng danh",[SS.story(`«Lượt thứ ba: ${mates.map((v,i)=>`${esc(v.name)}, con gái ${offs[i]||"Thông phán"}`).join("; ")}; ${esc(S.name)}, ${esc(S.origin.n.toLowerCase())}.»`),O2.node],{x:Math.round(g.w*.04),y:8,w:Math.round(g.w*.92)},null,{kind:"story"});await w(4500);await SS.choose(O2,0);await SS.close();
 /* the hall: royals ALREADY seated, no announcements, no name labels; narration gives cues only */
 SS.cap("Hàng 19: vào điện — bề trên đã ngồi sẵn, không xướng «giá đáo», không thẻ tên; ta tự đoán ai là ai (lời kể gợi ý)");
 Sc=kitScene.open({bg:U("ev-trieu-chinh.webp"),intro:1600});g=Sc.L.g;
 const emp=S.emp,th=S.thO,qn=rivals.find(v=>v.queen);const sfh=Math.round(g.H*(ip()?.50:.40));
 await Sc.fig(figFor(th),{cx:g.w*.24,top:Math.round(g.H*.04),fh:sfh,z:2});await Sc.fig(figFor(emp),{cx:g.w*.5,top:Math.round(g.H*.02),fh:sfh+10,z:2});await Sc.fig(figFor(qn),{cx:g.w*.76,top:Math.round(g.H*.04),fh:sfh,z:2});
 await SS.line(Sc,[mates[0],S,mates[1],mates[2]],{x0:.10,x1:.90,fh:ip()?.52:.44,me:true});
 const O3=SS.opts([{n:"Quỳ xuống hành lễ"}]);
 Sc.box(`${N.name} · Giáo tập ma ma`,[SS.story("Trên điện, người ngồi chính giữa mặc long bào vàng, mắt lướt qua từng người.","Bên trái một vị phu nhân tóc điểm bạc, tay lần tràng hạt. Bên phải một vị nương nương đoan trang, nét cười không chạm tới mắt.","Không ai xướng tên. Ngươi phải tự đoán ai là ai."),O3.node],{x:Math.round(g.w*.04),y:Math.round(g.H*(ip()?.50:.44)),w:Math.round(g.w*.92)},null,{kind:"story"});
 Sc.show();await w(fast?6500:9000);await SS.choose(O3,0);await SS.close();
 /* TEST 1 — Thái hậu: ĐỐI ĐÁP (her value: Nhân), bare options, no hints; result card after */
 SS.cap("Hàng 20, 26, 36, 37: Thái hậu hỏi trước — ĐỐI ĐÁP, chọn theo điều bà trọng (đời này: chữ Nhân) · 4 câu đều hiền, không gợi ý");
 Sc=kitScene.open({bg:U("ev-trieu-chinh.webp")});const dd=SS.DD.find(d=>d.id==="dd-020")||SS.DD[0];
 let O4=SS.opts(dd.options.map(o=>({n:o.text})));const iN=dd.options.findIndex(o=>o.values.includes("Nhân"));
 await Sc.pair({msgr:figFor(th),me:SS.kc(S),storyTitle:"Vị phu nhân tóc điểm bạc",story:[SS.story(dd.prompt,`<i>${esc(SS.cue(dd.cue))}</i>`)],choiceTitle:S.name,choice:[O4.node]});Sc.show();
 await w(fast?5000:7000);await SS.choose(O4,iN<0?0:iN);
 SS.cap("Hàng 39: THẺ KẾT QUẢ ngay sau khi chọn — được/mất hiện SAU, không hiện trước");
 SS.res("Thái hậu hỏi chuyện",["Thái hậu: quý ngươi hơn (thiện cảm +3)","Phần tuyển: Khá"],["Hoàng hậu: thấy ngươi được lòng Thái hậu, để ý ngươi"],true);
 try{kitKnow({key:"th-who",text:"Vị phu nhân tóc điểm bạc là Thái hậu.",pri:1})}catch(e){}await w(5500);SS.closeRes();await SS.close();
 /* TEST 2 — Hoàng thượng: MINI-GAME from HIS like this life (music → Đàn) */
 const mus=(emp.likes&&emp.likes.music)||"đàn";
 SS.cap(`Hàng 12, 36: Hoàng thượng ra MINI-GAME theo sở thích đời này (thích ${mus}) → thi Đàn`);
 Sc=kitScene.open({bg:U("ev-trieu-chinh.webp")});let O5=SS.opts([{n:"Vâng mệnh, dâng một khúc"}]);
 await Sc.pair({msgr:figFor(emp),me:SS.kc(S),storyTitle:"Người mặc long bào",story:[SS.story(`«Ngẩng đầu lên. Trẫm nghe ${esc(mus)} đã nhiều, ngươi đàn cho trẫm nghe một khúc.»`)],choiceTitle:S.name,choice:[O5.node]});Sc.show();await w(fast?3500:5000);await SS.choose(O5,0);await SS.close();
 let fin=null;try{entExam({art:"cam"},(raw)=>{fin=raw})}catch(e){console.error(e)}await w(900);
 /* selection scene: the board intro shows NO odds line (rows 38/40) — the build drops the road row here */
 const strip=()=>document.querySelectorAll("#kg82 *").forEach(e=>{if(e.children.length<=3&&/^\s*(Lên tới|Được để mắt|Về hầu)/.test(e.textContent)){const r=e.closest("tr,li,.kgrow,.kmrow,p,div");(r||e).remove()}});
 strip();const mo=new MutationObserver(strip);const kg=document.getElementById("kg82");if(kg)mo.observe(kg,{childList:true,subtree:true});
 await w(3000);const st=[...document.querySelectorAll("#kg82 button")].find(b=>/Sẵn sàng|Bắt đầu/.test(b.textContent));if(st)await SS.tap(st);await w(fast?8000:10000);mo.disconnect();
 Sc=kitScene.open({bg:U("ev-trieu-chinh.webp")});await Sc.pair({msgr:figFor(emp),me:SS.kc(S),storyTitle:"Người mặc long bào",story:[SS.story("«Khúc này êm tai. Được.»")]});Sc.show();
 try{kg82Close&&kg82Close()}catch(e){}document.querySelectorAll("#kg82").forEach(e=>e.hidden=true);await w(600);
 SS.res("Hoàng thượng nghe đàn",["Hoàng thượng: quý ngươi hơn (thiện cảm +4)","Phần tuyển: Giỏi (môn thi nặng nhất)"],[],true);try{kitKnow({key:"emp-who",text:"Người mặc long bào là Hoàng thượng.",pri:1})}catch(e){}await w(5000);SS.closeRes();await SS.close();
 /* TEST 3 — Hoàng hậu: HÀNH XỬ (cat thrown at her feet) */
 SS.cap("Hàng 26: Hoàng hậu ra đề HÀNH XỬ — chuyện bất ngờ (con mèo bị ném tới chân) → chọn cách xử");
 Sc=kitScene.open({bg:U("ev-trieu-chinh.webp")});const hx=SS.HX.find(d=>d.id==="hx-001")||SS.HX[0];let O6=SS.opts(hx.options.map(o=>({n:o.text})));
 await Sc.pair({msgr:figFor(qn),me:SS.kc(S),storyTitle:"Vị nương nương đoan trang",story:[SS.story(hx.incident,`<i>${esc(SS.cue(hx.cue))}</i>`)],choiceTitle:S.name,choice:[O6.node]});Sc.show();
 await w(fast?5000:7000);await SS.choose(O6,1);
 SS.res("Hoàng hậu thử cách xử",["Ma ma: khen ngươi giữ lễ","Phần tuyển: Khá"],["Hoàng hậu: chưa tỏ ý, khó đoán lòng"],null);await w(5000);SS.closeRes();await SS.close();
 /* result of the ceremony: KEPT or BAN HOA only — no rank for anyone */
 SS.cap("Hàng 30: cuối buổi chỉ biết GIỮ THẺ BÀI hay BAN HOA — chưa ai biết phẩm, đợi thánh chỉ mấy ngày sau");
 Sc=kitScene.open({bg:U("ev-trieu-chinh.webp")});let O7=SS.opts([{n:"Tạ ơn, lui ra"}]);
 await Sc.pair({msgr:SS.eun(),me:SS.kc(S),storyTitle:"Thái giám tuyên",story:[SS.story(`«${esc(S.name)} — giữ thẻ bài. ${esc(mates[0].name)} — giữ thẻ bài.»`,`«${esc(mates[1].name)}, ${esc(mates[2].name)} — ban hoa.»`,"Phẩm vị chưa định. Các tiểu chủ về Trữ Tú cung chờ thánh chỉ.")],choiceTitle:S.name,choice:[O7.node]});Sc.show();
 await w(6500);await SS.choose(O7,0);await SS.close();SS.mates=mates;SS.cap("")};
/* =========================================================== C3 SẮC PHONG =========================================================== */
SS.c3=async()=>{const C=SS.cast;const mates=SS.mates||[C.victim,C.others[0],C.others[1]];const N=SS.narr();
 const r0=(S.origin&&S.origin.r)||0,cap=3;const to=Math.min(r0+1,cap);
 SS.cap("Hàng 30, 34: ba ngày sau — thánh chỉ đến chỗ ở · phẩm = thân phận ±1 (tốt → +1), trần Tần");
 let Sc=kitScene.open({bg:U("info-tuyen-tu.webp"),intro:1600});const O=SS.opts([{n:"Quỳ xuống tiếp chỉ"}]);
 await Sc.pair({msgr:SS.eun(),me:SS.kc(S),storyTitle:"Thái giám truyền chỉ",story:[SS.story("Ba ngày sau, ở Trữ Tú cung.",`«${esc(S.name)} tiếp chỉ!»`,`Thân phận ${esc(S.origin.n.toLowerCase())} vốn vào cung là ${RANKS[r0].n}. Ba phần thi đều tốt, được thêm một bậc.`)],choiceTitle:S.name,choice:[O.node]});
 Sc.show();await w(7000);await SS.choose(O,0);await SS.close();
 try{kmFree=()=>true}catch(e){}try{kitEdict({to,from:-1,fromWord:"Tú nữ"})}catch(e){console.error(e)}await w(6500);
 document.querySelectorAll(".kmend").forEach(b=>b.click());await w(800);try{kmReset()}catch(e){}document.querySelectorAll(".kmstage").forEach(e=>e.remove());
 /* SẮC PHONG NEWS screen: one kit row per girl she knows (round-mates + yard contacts) */
 SS.cap("Hàng 32: MÀN TIN SẮC PHONG — mỗi người ta biết: mặt + tên + phẩm mới + biết qua đâu · thông báo «Ta biết thêm …» ở ô «!»");
 Sc=kitScene.open({bg:U("info-tuyen-tu.webp")});const rk=v=>Math.max(0,Math.min(3,(v.__r!=null?v.__r:Math.max(0,(v.rank||1)-2))));
 const rows=[kitNewsRankRow(mates[0],{rank:rk(mates[0]),how:"cùng lượt"}),kitNewsRankRow(C.A,{rank:rk(C.A),how:"quen ở sân chờ"}),kitNewsRankRow(C.B,{rank:rk(C.B),how:"quen ở sân chờ"}),kitNewsRankRow(C.bully,{rank:rk(C.bully),how:"gặp ở sân chờ",ph:"Con gái Đô thống"})];
 if(C.victim!==mates[0])rows.splice(1,0,kitNewsRankRow(C.victim,{rank:rk(C.victim),how:"quen ở sân chờ"}));
 const O2=SS.opts([{n:"Vào cung"}]);
 await Sc.pair({me:S,storyTitle:"Tin sắc phong",story:[SS.story("Tin sắc phong truyền khắp Trữ Tú cung:"),kitNewsRankList(rows),SS.story("Những người khác, gặp rồi mới biết.")],choice:[O2.node]});Sc.show();
 try{kitKnowMany([mates[0],C.A,C.B,C.victim].filter(Boolean).map(v=>({key:"rk-"+v.id,text:`${v.name} được phong ${kmRankName(rk(v))}.`,pri:2})))}catch(e){console.error(e)}
 await w(9500);const box=document.querySelector(".kbtn.knbox, #knbox, .knotice-box, [data-notice-box]");if(box)await SS.tap(box);await w(2500);
 await SS.choose(O2,0);await SS.close();SS.cap("Vào cung — chơi bình thường");await w(2500);SS.cap("")};
/* =========================================================== C4 BIẾN THỂ =========================================================== */
SS.c4cnv=async()=>{const N=SS.narr();const mates=(S.srv&&S.srv.met||[]).slice(0,3);
 SS.cap("Hàng 42: CUNG NỮ ĐƯỢC SỦNG HẠNH — không sân chờ, không thi; phẩm theo luật thăng có sẵn → thánh chỉ đọc ở dãy phòng cung nữ");
 let Sc=kitScene.open({bg:U("nvp-v4-xuan-sang.webp"),intro:1600});const g=Sc.L.g;const ip=document.documentElement.classList.contains("kv2");
 const mf=[U("fig-maid-m32-a18.webp"),U("fig-maid-m47-a18.webp"),U("fig-maid-m12-a18.webp")];const sfh=Math.round(g.H*(ip?.52:.42));
 for(let i=0;i<3;i++)await Sc.fig(mf[i],{cx:g.w*(.56+i*.17),top:g.H-sfh-6,fh:sfh,z:2});
 const O=SS.opts([{n:"Quỳ xuống tiếp chỉ"}]);
 await Sc.pair({msgr:SS.eun(),me:figFor(S),storyTitle:"Thái giám truyền chỉ",story:[SS.story("Sáng hôm sau đêm thị tẩm, ở dãy phòng cung nữ.",`«Cung nữ ${esc(S.name)} tiếp chỉ!»`)],choiceTitle:S.name,choice:[O.node]});Sc.show();
 await w(6500);await SS.choose(O,0);try{kmFree=()=>true}catch(e){}try{kitEdict({to:0,from:-1})}catch(e){}await w(6000);document.querySelectorAll(".kmend").forEach(b=>b.click());try{kmReset()}catch(e){}document.querySelectorAll(".kmstage").forEach(e=>e.remove());
 SS.cap("Hàng 42: các cung nữ phản ứng theo nết (mừng / ganh / sợ) + thông báo biết thêm");
 const O2=SS.opts([{n:"Theo thái giám về chỗ ở mới"}]);
 const b=Sc.box(`${N.name} · Quản sự ma ma`,[SS.story("Một cung nữ cùng phòng ôm lấy tay ngươi, mừng rơi nước mắt.","Một người khác đứng nép sau cột, môi mím chặt, mắt không rời tờ chiếu.","Một tiểu cung nữ cúi gằm, sợ ngươi nhớ những lần nàng sai vặt ngươi."),O2.node],{x:Math.round(g.w*.04),y:8,w:Math.round(g.w*.92)},null,{kind:"story"});
 try{kitKnowMany([{key:"cnv1",text:"Cả dãy phòng cung nữ đã biết ngươi được phong Đáp ứng.",pri:1}])}catch(e){}
 await w(7000);await SS.choose(O2,0);await SS.close();SS.cap("")};
SS.c4nc=async()=>{const N=SS.narr();
 SS.cap("Hàng 42: CÔNG CHÚA HÒA THÂN — không tuyển tú: đoàn sứ đến, TRIỀU KIẾN trên điện, cùng 3 kiểu thi");
 let Sc=kitScene.open({bg:U("bg-origin-nc.webp"),intro:1600});const O=SS.opts([{n:"Theo sứ thần vào điện"}]);
 await Sc.pair({msgr:SS.eun(),me:figFor(S),storyTitle:"Lễ bộ thị lang",story:[SS.story("Đoàn sứ thần đưa công chúa vào kinh, cờ lọng rợp đường.","Không qua tuyển tú: công chúa vào điện triều kiến ngay.")],choiceTitle:S.name,choice:[O.node]});Sc.show();await w(6000);await SS.choose(O,0);await SS.close();
 Sc=kitScene.open({bg:U("ev-e68-envoygift.webp"),intro:1300});const g=Sc.L.g,ip=document.documentElement.classList.contains("kv2");const sfh=Math.round(g.H*(ip?.50:.40));
 const qn=rivals.find(v=>v.queen);await Sc.fig(figFor(S.thO),{cx:g.w*.24,top:8,fh:sfh});await Sc.fig(figFor(S.emp),{cx:g.w*.5,top:4,fh:sfh+10});if(qn)await Sc.fig(figFor(qn),{cx:g.w*.76,top:8,fh:sfh});
 const dd=SS.DD.find(d=>d.id==="dd-018")||SS.DD[1];const O2=SS.opts(dd.options.map(o=>({n:o.text})));
 Sc.box("Vị phu nhân tóc điểm bạc · tiệc tiếp sứ",[SS.story(dd.prompt),O2.node],{x:Math.round(g.w*.04),y:Math.round(g.H*(ip?.50:.44)),w:Math.round(g.w*.92),h:Math.round(g.H*(ip?.48:.54))},null,{kind:"choice"});
 Sc.show();SS.cap("Hàng 42, 38: cùng 3 kiểu thi như tuyển tú (đây: đối đáp trong tiệc tiếp sứ), thẻ trần, kết quả sau");await w(6000);await SS.choose(O2,0);
 SS.res("Thái hậu hỏi chuyện",["Thái hậu: quý ngươi hơn (thiện cảm +3)","Phần ra mắt: Giỏi"],[],true);await w(5000);SS.closeRes();await SS.close();
 const r0=(S.origin&&S.origin.r)||3;const to=Math.min(r0+1,4);
 SS.cap(`Hàng 35: hòa thân ±1 trần PHI — thi tốt VÀ Sắc cao («vua thấy đẹp») → ${RANKS[r0].n} lên ${RANKS[to].n}`);
 Sc=kitScene.open({bg:U("info-tuyen-tu.webp"),intro:1200});const O3=SS.opts([{n:"Tạ ân"}]);
 await Sc.pair({msgr:SS.eun(),me:figFor(S),storyTitle:"Thái giám truyền chỉ",story:[SS.story("Mấy ngày sau, ở hành cung của đoàn sứ.",`Công chúa vốn vào cung là ${RANKS[r0].n}. Phần ra mắt đều tốt, dung mạo khiến Hoàng thượng ngẩn người: được thêm một bậc.`)],choiceTitle:S.name,choice:[O3.node]});Sc.show();
 await w(6000);await SS.choose(O3,0);await SS.close();try{kmFree=()=>true}catch(e){}try{kitEdict({to,from:r0})}catch(e){}await w(6500);document.querySelectorAll(".kmend").forEach(b=>b.click());try{kmReset()}catch(e){}document.querySelectorAll(".kmstage").forEach(e=>e.remove());SS.cap("")};
})();
