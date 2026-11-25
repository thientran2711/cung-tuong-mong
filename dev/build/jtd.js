/* ================= jtd · TỨ ĐỨC MINI-GAMES (owner 15/11, review/tuduc-mg, C41) =================
   "Mini game học tứ đức đâu? Không thấy."  Công / Dung / Ngôn / Hạnh study (j85 lessonVir) now plays one easy mini-game each, in the SHARED mini-game
   frame (j82 kg82Open / kitGameFrame, KIT §13): the same engine contract as j82 / j91 — eng(box, env) -> stop(), env.hud, env.end(raw 0..10), KG82.peek.
   Own file (after j91 + j85, before j83): nothing in j82 / j91 is edited, so review/mg-easy cannot conflict.
   | course            | game                | how (every rule is on screen before and during play)                                            |
   | Công · Nữ công    | Thêu theo nét       | (owner 21/11) the craft stitch board: tap the spool of the lit band's shade, then tap the hoop as the needle dips on the beat |
   | Dung · Dung nghi  | Đi đứng giữ bát     | hold LEFT / RIGHT half of the board to keep the bowl upright; each floor mark shows which way the next step leans it |
   | Ngôn · Lời nói    | Nói đúng lúc        | (mg-balance-2, no words) wait for the speaker (and an upset one to calm), then HOLD «Thưa» and let go in the voice band of that listener |
   | Hạnh · Đức hạnh   | Làm phúc            | share the portions among the waiting people (+ / −) so that everyone gets enough of what they need  |
   Level (S.vir[k] 0..5) only makes it EASIER (wider band, fewer wrong choices, no shortage), never harder; "Để trời định" = the ONE quick roll (KIT §13.6, BAL.skip): won = the progress of a BAL.skip.raw play, lost = none.
   Progress: raw → lesson points (self: 1 or 2; teacher: 2 or 3, the same 1..3 span as before); Công practice also lifts the quality of handmade goods (0..2, S.vpf).
   Boards: the existing painted study rooms (theu / mua / tho / ve -bg-hoc) + existing sprites; dedicated mg-td* paintings are listed in dev/PROGRESS_tuduc-mg.md. */
const TD_BG={td_cong:"theu-bg-hoc",td_dung:"mua-bg-hoc",td_ngon:"tho-bg-hoc",td_hanh:"ve-bg-hoc"};
const TD_OF={cong:"td_cong",dung:"td_dung",ngon:"td_ngon",hanh:"td_hanh"};
Object.assign(KG82_KIND,{
 td_cong:{e:"stitch",n:"Công",t:"Thêu theo nét",how:""},/* engine, rules text: j91 KG82_CRAFT.td_cong (crReg below) */
 td_dung:{e:"tdwalk",n:"Dung",t:"Đội bát đi đứng",how:"Đội bát đi qua sảnh. Bát nghiêng bên nào, giữ nửa khung bên kia để đỡ. Kim ở dải xanh là vững."},
 td_ngon:{e:"tdtalk",n:"Ngôn",t:"Nói đúng lúc, vừa tiếng",how:"Chờ người nói xong, vòng xanh sáng thì giữ nút Thưa; buông khi tiếng nói vào dải xanh."},
 td_hanh:{e:"tdalms",n:"Hạnh",t:"Làm phúc",how:"Chạm + hoặc − chia phần cho đủ số chấm của mỗi người, rồi chạm ✓. Ba lượt."}});
Object.assign(KG82_SPR,{td_cong:["kim-needle","theu-cloud"],td_dung:["mua-mat","banh-pot"],td_ngon:[],td_hanh:[]});
(function(){const b0=kg82BgName;kg82BgName=function(kind){return TD_BG[kind]||b0.apply(this,arguments)}})();
const TD_RULES={/* owner OD 20/11 ~06:45Z: a few words only; the «Hướng dẫn» round teaches the move */
 cong:[["1","Chạm cuộn chỉ cùng sắc với dải sáng trong mẫu."],["2","Chạm khung đúng lúc kim chúc xuống chấm sáng."]],
 dung:[["1","Bát đặt trên đầu, mỗi bước chân làm bát nghiêng."],["2","Dấu ◀ ▶ trên sàn báo bát sắp nghiêng về bên nào."],["3","Giữ nửa khung bên kia để đỡ; kim ở dải xanh là vững."]],
 ngon:[["1","Chờ người nói xong, vòng xanh sáng thì giữ nút Thưa."],["2","Buông khi tiếng nói vào dải xanh."]],
 hanh:[["1","Chạm + hoặc − để chia phần cho đủ số chấm."],["2","Xong thì chạm ✓, trước khi hết giờ."]]};
const TD_GOAL={cong:"Đường kim đều và đúng màu chỉ",dung:"Bát vững trên đầu suốt buổi đi",ngon:"Nói đúng lúc, vừa tiếng người nghe",hanh:"Ai cũng được đủ phần cần"};
function tdEase(lv){return cl(Math.round(lv||0),0,5)}

/* ---------- 1. Công: Thêu theo nét ---------- */
/* owner 21/11 ~01:05Z ("Ủa đâu cái trò mà nhớ ô hoa … Cái trò đó hay nha, không bỏ nha"): Thêu keeps the j82 memory game «Nhớ mẫu thêu»; the craft
   stitch board of review/mg-craft (jcraft_theu crtStitch: shade order + stitch on the beat) serves Công «Thêu theo nét» instead of the old dotted-line
   trace (kgTdThread, review/mg-snap; removed: no caller left). Levers BAL.mgTier.lev.td_cong (board ease from the tier, harder with rank: law 5). */

/* ---------- 2. Dung: Đi đứng giữ bát ---------- */
function kgTdWalk(box,env){const C=kg82Canvas(box,1,440),{g,W,H}=C;const lv=tdEase(env.lv),BAND=mgLev(env,"td_dung","band"),KICK=mgLev(env,"td_dung","kick"),SPL=mgLev(env,"td_dung","spill"),DUR=20,STEP=1.6,KN=12;/* mg-balance-2: safe band + step sway by ease (BAL.mgTier.lev.td_dung) */
 const kicks=Array.from({length:KN},(_,k)=>({t:2.4+k*STEP,d:k%3===2?(Math.random()<.5?-1:1):(k%2?-1:1)*(Math.random()<.35?-1:1),m:(.9+.4*Math.random())*KICK}));
 let x=0,v=0,t=0,inB=0,spill=0,stag=0,dir=0,dirAt=0,pend=0,ki=0,stop=false,raf=0,last=performance.now();const ptr=new Map(),pops=[];
 const good=kg82Col("--good","#2d7a52"),red=kg82Col("--red","#c23b22");
 /* owner 21/11 ~00:50Z «Cái game Dung tao vẫn không hiểu là đang chơi cái gì»: the scene is HER standing with a bowl balanced on her head (td-dung-clear).
    Same physics / BAL knobs as before (x, v, kicks, BAND, KICK, SPL untouched): only what she sees changes. Words in play = the short guiding words (OD 21/11 ~00:50Z). */
 const FEET=H*.74,LAND=H*.84,FIGH=H*.45,figSrc=(()=>{try{return kitFigOf(S)}catch(e){return ""}})(),fig=new Image();if(figSrc){fig.crossOrigin="anonymous";fig.src=figSrc}
 let fb=null;try{if(figSrc)fb=kitFigBody(figSrc,()=>{try{fb=kitFigBody(figSrc)}catch(e){}})}catch(e){}
 const BAD="#c23b22",FONT=kg82Col("--body","sans-serif");
 function pill(t,cx,cy,tone,sz){kg82Guide(g,t,cx,cy,tone,sz,W-16)}/* the ONE kit guiding line (KIT §13.7.2) */
 function bowlAt(cx,cy,w,ang,hot){/* a porcelain bowl of water, drawn about its foot (cx,cy) */g.save();g.translate(cx,cy);g.rotate(ang);const h=w*.42;
  g.beginPath();g.moveTo(-w/2,-h);g.bezierCurveTo(-w/2,-h*.1,-w*.28,0,0,0);g.bezierCurveTo(w*.28,0,w/2,-h*.1,w/2,-h);g.closePath();const gr=g.createLinearGradient(-w/2,0,w/2,0);gr.addColorStop(0,"#d9cfb8");gr.addColorStop(.35,"#fbf6e8");gr.addColorStop(1,"#cfc3a8");g.fillStyle=gr;g.fill();g.strokeStyle="#3b62a0";g.lineWidth=2;g.stroke();
  g.fillStyle="#3b62a0";g.fillRect(-w*.42,-h*.62,w*.84,3);g.beginPath();g.ellipse(0,-h,w/2,w*.1,0,0,Math.PI*2);g.fillStyle="#7fb6d8";g.fill();g.strokeStyle="#3b62a0";g.stroke();
  g.beginPath();g.ellipse(-w*.1,-h-1,w*.16,w*.035,0,0,Math.PI*2);g.strokeStyle="rgba(255,255,255,.8)";g.lineWidth=1.5;g.stroke();g.restore()}
 function draw(now){kg82Bg(g,W,H,"td_dung",.06,.6);g.textAlign="center";g.textBaseline="alphabetic";
  const inBand=Math.abs(x)<BAND,col=stag>0?BAD:inBand?good:BAD,nxt=kicks[ki],soon=nxt&&nxt.t-t<1.3?nxt.d:0;
  /* the balance bar: green = steady, red ends = spilled; the needle is the lean of the bowl */
  const mx=W*.1,mw=W*.8,my=H*.075,bh=22;g.fillStyle="rgba(194,59,34,.3)";g.fillRect(mx,my-bh/2,mw,bh);g.fillStyle="rgba(76,160,110,.8)";g.fillRect(mx+mw/2*(1-BAND),my-bh/2,mw*BAND,bh);g.strokeStyle="#5a3a1a";g.lineWidth=2;g.strokeRect(mx,my-bh/2,mw,bh);
  g.fillStyle="#fff6dc";g.font=`700 12px ${FONT}`;g.textBaseline="middle";g.fillText("Vững",W/2,my+1);g.textAlign="left";g.fillStyle="#7a1f10";g.fillText("Đổ",mx+6,my+1);g.textAlign="right";g.fillText("Đổ",mx+mw-6,my+1);g.textAlign="center";g.textBaseline="alphabetic";
  const nx=mx+mw/2+Math.max(-1,Math.min(1,x))*mw/2;g.fillStyle=col;g.strokeStyle="#fff6dc";g.lineWidth=1.5;g.beginPath();g.moveTo(nx,my+bh/2+1);g.lineTo(nx-8,my+bh/2+14);g.lineTo(nx+8,my+bh/2+14);g.closePath();g.fill();g.stroke();
  /* the guiding word: which way the bowl leans (or is about to) and which half to hold */
  const lean=Math.abs(x)>BAND*.5?Math.sign(x):soon;
  if(t<2.3)pill("Mỗi bước chân làm bát nghiêng. Giữ nửa khung bên kia để đỡ.",W/2,H*.165,"wait",Math.max(11,Math.min(14,W/38)));
  else if(lean)pill(lean<0?"Bát nghiêng trái · giữ bên phải ▶":"◀ Bát nghiêng phải · giữ bên trái",W/2,H*.165,"bad",Math.max(12,Math.min(15,W/34)));
  else pill("Bát đang thẳng · giữ vững",W/2,H*.165,"go",Math.max(12,Math.min(15,W/34)));
  /* the path: step marks leave her feet and come down to the landing line; the arrow = the way that step leans the bowl */
  g.save();g.strokeStyle="rgba(143,95,12,.8)";g.lineWidth=3;g.beginPath();g.moveTo(W*.22,LAND);g.lineTo(W*.78,LAND);g.stroke();g.restore();
  for(let k=ki-1;k<KN;k++){if(k<0)continue;const kk=kicks[k],dtm=kk.t-t;if(dtm<-.4||dtm>2.4)continue;const u=1-dtm/2.4,y=FEET+H*.03+u*(LAND-FEET-H*.03),sc=.5+.5*u;kg82Spr(g,"mua-mat",W/2,y,W*.13*sc,null,{alpha:.92});
   g.fillStyle="#fff3d6";g.font=`700 ${Math.round(14*sc+6)}px ${FONT}`;g.save();g.shadowColor="#5a1208";g.shadowBlur=6;g.fillText(kk.d<0?"◀":"▶",W/2,y+5);g.restore()}
  /* her, with the bowl on her head: she and the bowl lean by x */
  const ang=Math.max(-1.2,Math.min(1.2,x))*.45,fh=FIGH,fw=fh*(fb&&fb.ar||.451);
  if(fig.complete&&fig.naturalWidth){g.save();g.translate(W/2,FEET);g.rotate(ang*.12);g.drawImage(fig,-fw/2,-fh,fw,fh);g.restore()}
  const hx=W/2+((fb&&fb.hx!=null?fb.hx:.5)-.5)*fw+ang*.1*fh*.9,hy=FEET-fh*(1-(fb&&fb.ht||.03))+ang*.1*fh*.15+fh*.05;
  g.save();if(inBand&&stag<=0){g.shadowColor="rgba(60,170,110,.9)";g.shadowBlur=14}else{g.shadowColor="rgba(194,59,34,.9)";g.shadowBlur=stag>0?22:12}
  bowlAt(hx+Math.sin(ang)*W*.015,hy+3,W*.115*(dir?kg82FxPop(dirAt,now):1),ang,0);g.restore();
  padL.classList.toggle("ksel",lean>0);padR.classList.toggle("ksel",lean<0);
  if(dir)kg82FxRing(g,hx,hy-W*.04,W*.12,dirAt,now);/* touch feedback = the kit pop/glow on the bowl only (mg-visual), no half-screen yellow box */
  kg82DrawPops(g,pops,now)}
 function step(dt){t+=dt;
  while(ki<KN&&t>=kicks[ki].t){v+=kicks[ki].d*kicks[ki].m*1.1;ki++}
  const eff=dir||pend;/* a tap shorter than one frame still counts for that frame */v+=(.55*x+eff*3.2)*dt;v*=Math.exp(-1.4*dt);x+=v*dt;
  if(Math.abs(x)>=1){spill++;x=0;v=0;stag=1;inB=Math.max(0,inB-SPL);/* review/mg-snap: a spill costs (it used to re-centre the bowl inside the band for free) */kg82Pluck(0,false);kg82Pop(pops,W/2,H*.5,NWB.POP.bad,red)}
  if(stag>0)stag-=dt;else if(Math.abs(x)<BAND)inB+=dt}
 /* real-time clock: a slow frame (down to ~4 fps) is run as several small steps, so a laggy phone gets the same 20 s as everyone, never a clock that crawls past the shared 97 s guard */
 function frame(now){if(stop)return;const dl=Math.min(.6,Math.max(0,(now-last)/1000));last=now;const n=Math.max(1,Math.ceil(dl/.034));for(let q=0;q<n&&t<DUR+1;q++)step(dl/n);pend=0;
  env.hud({score:10*Math.min(1,(inB+Math.max(0,DUR-Math.max(0,t)))/DUR),round:`Bước ${Math.min(ki+1,KN)}/${KN}`,time:`${Math.max(0,Math.ceil(DUR+1-t))} giây`});
  draw(now);if(t>=DUR+1){stop=true;KG82.tdwalkStat={ok:Math.min(DUR,Math.round(inB)),dur:DUR,spill};/* the result says why: seconds steady + spills (td-dung-clear) */return setTimeout(()=>env.end(Math.min(10,inB/DUR*10)),300)/* review/mg-score-same: the float (kg82Play grades once; a rounded raw here made the board and the result differ) */}raf=requestAnimationFrame(frame)}
 const setDir=()=>{let d=0;ptr.forEach(s=>d+=s);d=Math.max(-1,Math.min(1,d));if(d!==dir)dirAt=performance.now();dir=d;padL.classList.toggle("on",dir<0);padR.classList.toggle("on",dir>0)};
 /* the two pads are kit buttons (.kgbtn.nwb-btn in .kg82act, same part as td_ngon «Thưa»); the canvas halves still work too */
 const pb=document.createElement("div");pb.className="kg82act";pb.style.cssText="display:flex;gap:10px;justify-content:center";pb.innerHTML=`<button type="button" class="kgbtn nwb-btn" id="tdhl" style="flex:1" aria-label="Đỡ bên trái" title="Đỡ bên trái">${NWB.ic("left")}</button><button type="button" class="kgbtn nwb-btn" id="tdhr" style="flex:1" aria-label="Đỡ bên phải" title="Đỡ bên phải">${NWB.ic("right")}</button>`;box.appendChild(pb);
 const padL=pb.querySelector("#tdhl"),padR=pb.querySelector("#tdhr");
 for(const [bn,sd] of [[padL,-1],[padR,1]]){bn.addEventListener("pointerdown",e=>{e.preventDefault();ptr.set(e.pointerId,sd);pend=sd;try{bn.setPointerCapture(e.pointerId)}catch(_){}setDir()});bn.addEventListener("pointerup",e=>{ptr.delete(e.pointerId);setDir()});bn.addEventListener("pointercancel",e=>{ptr.delete(e.pointerId);setDir()})}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();const [px]=C.at(e);ptr.set(e.pointerId,px<W/2?-1:1);pend=px<W/2?-1:1;try{C.cv.setPointerCapture(e.pointerId)}catch(_){}setDir()});
 const up=e=>{ptr.delete(e.pointerId);setDir()};C.cv.addEventListener("pointerup",up);C.cv.addEventListener("pointercancel",up);
 KG82.dbg=()=>({x,v,t,dir,inB,spill,ki,stag,n:ptr.size});KG82.peek=()=>{/* a player reads the floor mark: lean against the coming step just before it lands */const kk=kicks[ki],pre=kk&&kk.t-t<.3&&kk.t-t>0?kk.d*kk.m*1.1*.6:0;const f=x+.4*(v+pre);if(Math.abs(f)<BAND*.15)return{hold:false};const want=-Math.sign(f);const c=C.client(want<0?W*.25:W*.75,H*.5);return{hold:true,x:c.x,y:c.y}};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf)}}

/* ---------- 3. Ngôn: Nói đúng lúc, vừa tiếng (mg-balance-2, owner 16/11 07:20Z "no word games": replaces the old Ứng đối reply-picking quiz) ----------
   Five turns. Someone speaks (bubble with moving dots, no sentence to read). Wait until the talk ends; an upset speaker needs a moment to calm
   (grey ring); when the ring turns GREEN it is her turn. She HOLDS «Thưa» to speak: her voice bar rises; she lets go inside the green band.
   The band sits by who listens: bề trên → nhỏ nhẹ (low), kẻ dưới → ôn tồn (middle), ngang hàng → vui vẻ (higher). Everything is shown on the board.
   Score per turn = BAL-free shape: 30 % timing (not cutting in, not too late) + 70 % voice (inside the band = full, fading outside).
   Ease levers (BAL.mgTier.lev.td_ngon via mgLev): band half-width, reply window ms, voice rise per second. */
const TD_SPK=[["Thái hậu","up"],["Hoàng thượng","up"],["Hoàng hậu","up"],["Lệ phi","peer"],["Hòa tần","peer"],["Cẩn quý nhân","peer"],["Dung thường tại","peer"],
 ["Tiểu cung nữ","down"],["Ma ma","down"],["Cung nhân","down"],["Tiểu thái giám","down"]];
const TD_CLS={up:"bề trên",peer:"ngang hàng",down:"kẻ dưới"};
/* voice band centre by listener (0 = khẽ, 1 = lớn) and its word; calm-down pause (s) by mood */
const TD_VOICE={up:[.3,"nhỏ nhẹ"],down:[.48,"ôn tồn"],peer:[.64,"vui vẻ"]};const TD_MOOD={vui:0,lo:.6,"buồn":.9,"giận":1.3};
function kgTdTalk(box,env){const C=kg82Canvas(box,.78,400),{g,W,H}=C;const BH=mgLev(env,"td_ngon","band"),WIN=mgLev(env,"td_ngon","win"),RATE=mgLev(env,"td_ngon","rate"),FADE=mgLev(env,"td_ngon","fade");
 const cls=kg82Shuf(["up","peer","down","up","peer"]),Q=cls.map(c=>{const L=TD_SPK.filter(s=>s[1]===c);const s=L[Math.floor(Math.random()*L.length)];const m=kg82Shuf(Object.keys(TD_MOOD))[0];return{who:s[0],c,m,talk:1200+Math.random()*1300}});
 const bt=document.createElement("div");bt.className="kg82act";bt.innerHTML=NWB.btn("tdsay","voice",{alt:false,label:"Thưa: giữ để nói, buông khi vào dải xanh"});box.appendChild(bt);const sb=bt.querySelector("#tdsay");sb.innerHTML=NWB.ic("voice")+" Thưa";sb.dataset.kgkeep=1;/* labelled button (mg-5s-clear) */
 let r=-1,okN=0,cutN=0,lateN=0,loudN=0,pts=0,phase="",t0=0,lvl=0,held=false,cut=false,done=false,res=null;const pops=[];const good=K91C.good(),red=K91C.red(),gold=K91C.gold();
 const dm=k91DemoCard(box,"td_ngon-demo",{title:"Nói đúng lúc, vừa tiếng",lines:["Chờ người nói dứt lời; người đang giận, buồn hay lo cần một lúc nguôi (vòng xám).","Vòng sáng xanh là tới lúc thưa: giữ nút Thưa, tiếng nói dâng lên trong thanh.","Buông tay khi tiếng nói nằm trong dải xanh: bề trên thì nhỏ nhẹ, kẻ dưới thì ôn tồn, ngang hàng thì vui vẻ."],art:(g,W,H,now)=>{/* a small moving example: dots → green ring → the voice rises into the band */const y0=44,h=Math.min(H*.36,150),cx=W*.38,k=(now%4200)/4200;
  g.save();k91RR(g,cx-70,y0+h*.2,140,h*.5,14);g.fillStyle="#fffdf6";g.fill();g.strokeStyle=K91C.hair;g.lineWidth=2;g.stroke();
  if(k<.35){for(let i=0;i<3;i++){g.globalAlpha=.35+.65*Math.max(0,Math.sin(now/170-i*.9));g.fillStyle=K91C.ink;g.beginPath();g.arc(cx-20+i*20,y0+h*.45,5,0,Math.PI*2);g.fill()}g.globalAlpha=1}
  else{g.strokeStyle=K91C.good();g.lineWidth=5;g.beginPath();g.arc(cx+80,y0+h*.2,16,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-Math.min(1,(k-.35)/.65)));g.stroke()}
  const vx=W*.68,vw=24,lv=k<.45?0:Math.min(.4,(k-.45)*1.2);g.fillStyle="#fffdf6";g.fillRect(vx,y0,vw,h);g.strokeStyle=K91C.hair;g.strokeRect(vx,y0,vw,h);kg82FxLane.zone(g,vx,y0+h*(1-.38),vw,h*.16);
  g.fillStyle="#c23b22";g.fillRect(vx+3,y0+h*(1-lv),vw-6,h*lv);g.restore();return y0+h+22},done:()=>{bt.hidden=false;next()}});
 if(dm)bt.hidden=true;
 function next(){r++;if(r>=Q.length){done=true;KG82.why=`Vừa tiếng ${okN}/${Q.length} lượt`+(cutN?` · cắt lời ${cutN} lần`:"")+(lateN?` · lỡ lượt ${lateN}`:"")+(loudN?` · nói quá to ${loudN}`:"");return setTimeout(()=>env.end(pts),400)}const q=Q[r];lvl=0;held=false;cut=false;res=null;phase="talk";t0=performance.now();
}
 const band=()=>{const c=TD_VOICE[Q[r].c][0];return[c-BH,c+BH]};
 function judge(why){if(phase==="judge")return;const q=Q[r],[a,b]=band();let tm=why==="late"?0:cut?.4:1,vo=0;
  if(why==="say"){const d=lvl<a?a-lvl:lvl>b?lvl-b:0;vo=d<=0?1:Math.max(0,1-d/FADE)}else if(why==="loud")vo=0;
  const got=2*(.3*tm+.7*vo);pts+=got;if(why==="late")lateN++;else if(why==="loud")loudN++;else if(vo>=1)okN++;phase="judge";held=false;sb.classList.remove("on");
  res=[NWB.POP.bad,red];if(why!=="late"&&why!=="loud"){if(vo>=1)res=[cut?NWB.POP.s2:NWB.POP.s3,cut?gold:good];else if(vo>0)res=[NWB.POP.s1,gold]}
  kg82Pluck(vo>=1?3:0,vo>=1);kg82Pop(pops,W/2,H*.5,res[0],res[1]);setTimeout(next,1300)}
 const down=e=>{e.preventDefault();if(done||(dm&&dm.on))return;if(phase==="talk"||phase==="calm"){if(!cut){cut=true;cutN++;kg82Pop(pops,W/2,H*.5,NWB.POP.bad,red);kg82Pluck(0,false)}return}
  if(phase==="win"){phase="say";held=true;sb.classList.add("on")}};
 const up=()=>{if(phase==="say"&&held){held=false;judge("say")}};
 sb.addEventListener("pointerdown",down);["pointerup","pointercancel","pointerleave"].forEach(ev=>sb.addEventListener(ev,up));sb.addEventListener("contextmenu",e=>e.preventDefault());
 let last=performance.now();
 const stop=k91Loop(now=>{const dt=Math.min(50,now-last)/1000;last=now;kg82Bg(g,W,H,"td_ngon",.1,.6);
  if(dm&&dm.on){dm.draw(g,W,H,now);return}
  if(r<0||r>=Q.length){kg82DrawPops(g,pops,now);return}const q=Q[r],k=now-t0,calm=TD_MOOD[q.m]*1000;
  if(phase==="talk"&&k>=q.talk){phase=calm?"calm":"win";t0=now}
  else if(phase==="calm"&&k>=calm){phase="win";t0=now}
  else if(phase==="win"&&k>=WIN)judge("late");
  if(phase==="say"){lvl+=RATE*dt;if(lvl>=1){lvl=1;judge("loud")}}
  /* who speaks (on the board, so a short landscape screen keeps it in view) */
  g.textAlign="left";g.textBaseline="top";{const n=q.c==="up"?3:q.c==="peer"?2:1;g.fillStyle=q.m==="vui"?good:q.m==="giận"?red:K91C.lab;for(let i=0;i<3;i++){g.globalAlpha=i<n?1:.2;g.beginPath();g.arc(20+i*20,22,7,0,Math.PI*2);g.fill()}g.globalAlpha=1}
  /* the speaker's bubble and the turn ring */
  const bx=W*.36,by=H*.46,bw=Math.min(W*.5,260),bh=H*.3;g.save();k91RR(g,bx-bw/2,by-bh/2,bw,bh,bh*.3);g.fillStyle="rgba(255,250,236,.95)";g.fill();g.strokeStyle=K91C.hair;g.lineWidth=2;g.stroke();
  g.beginPath();g.moveTo(bx-bw*.18,by+bh/2-2);g.lineTo(bx-bw*.3,by+bh/2+18);g.lineTo(bx-bw*.02,by+bh/2-2);g.fill();g.restore();
  {/* owner 21/11 ~00:50Z (mg-5s-clear): WHO speaks is drawn (head + shoulders under the bubble tail, named) + one state-driven guiding line */
   const sx=bx-bw*.28,sy=by+bh/2+Math.max(26,H*.1),hr=Math.max(10,H*.05);g.save();g.fillStyle="#e9d8b8";g.strokeStyle="#5a3a1a";g.lineWidth=2;g.beginPath();g.arc(sx,sy,hr,0,Math.PI*2);g.fill();g.stroke();
   g.beginPath();g.moveTo(sx-hr*1.7,sy+hr*2.1);g.quadraticCurveTo(sx-hr*1.6,sy+hr*1.05,sx,sy+hr*1.05);g.quadraticCurveTo(sx+hr*1.6,sy+hr*1.05,sx+hr*1.7,sy+hr*2.1);g.closePath();g.fillStyle=q.m==="giận"?"#c9806a":"#b79a62";g.fill();g.stroke();g.restore();
   g.font=`700 ${Math.max(11,Math.min(14,W/28))}px ${kg82Col("--body","sans-serif")}`;g.textAlign="left";g.textBaseline="alphabetic";g.fillStyle=K91C.ink;kg82Lbl(g,`${q.who} · ${TD_CLS[q.c]}`,sx+hr*1.9,sy+4,W*.78-(sx+hr*1.9));
   if(phase!=="judge"){const bd=band(),inb=phase==="say"&&lvl>=bd[0]&&lvl<=bd[1];kg82Guide(g,phase==="talk"?`${q.who} đang nói · chờ nói xong`:phase==="calm"?`Người còn ${q.m} · chờ nguôi`:phase==="win"?"Tới lượt ngươi · giữ nút Thưa":`Buông khi tiếng vào dải xanh (${TD_VOICE[q.c][1]})`,W*.4,H*.945,phase==="win"||inb?good:"wait",13,W*.76)}}
  if(phase==="talk"){for(let i=0;i<3;i++){const a=.35+.65*Math.max(0,Math.sin(now/170-i*.9));g.globalAlpha=a;g.fillStyle=K91C.ink;g.beginPath();g.arc(bx-24+i*24,by,6,0,Math.PI*2);g.fill()}g.globalAlpha=1}
  const rg=Math.min(bw,bh)*.62,rx=bx+bw/2+rg*.2,ry=by-bh/2+4;
  const ring=(col,f)=>{g.save();g.lineWidth=7;g.strokeStyle="rgba(58,26,12,.15)";g.beginPath();g.arc(rx,ry,rg*.45,0,Math.PI*2);g.stroke();g.strokeStyle=col;g.beginPath();g.arc(rx,ry,rg*.45,-Math.PI/2,-Math.PI/2+Math.PI*2*f);g.stroke();g.restore()};
  if(phase==="calm")ring("#8a7350",Math.min(1,k/calm));if(phase==="win"){ring(good,1-Math.min(1,k/WIN));g.save();g.globalAlpha=.5+.5*Math.sin(now/120);g.fillStyle=good;g.beginPath();g.arc(rx,ry,rg*.2,0,Math.PI*2);g.fill();g.restore()}
  /* her voice bar: green band by who listens (same gauge colours as the Nấu ăn fire gauge, j91 kgCook) */
  const vx=W*.8,vw=Math.max(26,W*.07),vy=H*.1,vh=H*.74,[a,b]=band();g.fillStyle="#fffdf6";g.fillRect(vx,vy,vw,vh);g.strokeStyle=K91C.hair;g.lineWidth=2;g.strokeRect(vx,vy,vw,vh);
  kg82FxLane.zone(g,vx,vy+vh*(1-b),vw,vh*(b-a));/* mg-play2 law 11: was .27 green */const ly=vy+vh*(1-lvl);const gr=g.createLinearGradient(0,vy+vh,0,vy);gr.addColorStop(0,"#f0b040");gr.addColorStop(1,"#c23b22");g.fillStyle=gr;g.fillRect(vx+4,ly,vw-8,vy+vh-ly);
  g.fillStyle=lvl>=a&&lvl<=b?good:K91C.ink;g.beginPath();g.moveTo(vx-3,ly);g.lineTo(vx-13,ly-6);g.lineTo(vx-13,ly+6);g.fill();
  g.fillStyle=K91C.ink;g.font=k91F(700,13,1);g.textAlign="center";g.textBaseline="middle";g.fillText("▲",vx+vw/2,vy-10);g.fillText("▼",vx+vw/2,vy+vh+10);
  kg82DrawPops(g,pops,now);
  env.hud({score:mgReach(pts,cl(r+(phase==="judge"?1:0),0,Q.length),Q.length),round:`Lượt ${Math.min(r+1,5)}/5`,time:phase==="win"?`${Math.max(0,Math.ceil((WIN-k)/1000))} giây`:"–"})});
 /* oracle: hold from the green ring until the voice is a little under the band centre (it keeps rising for a human's reaction time) */
 KG82.peek=()=>{if(done)return null;if(dm&&dm.on)return{sel:"#k91demo"};if(r<0)return null;const p=C.client(0,0),rc=sb.getBoundingClientRect(),o={hsel:"#tdsay",x:rc.left+rc.width/2,y:rc.top+rc.height/2};
  if(phase==="win")return Object.assign(o,{hold:true});if(phase==="say"){const [a,b]=band();return Object.assign(o,{hold:lvl<(a+b)/2-RATE*.04})}return Object.assign(o,{hold:false})};
 if(!dm)next();return()=>{done=true;stop()}}

/* ---------- 4. Hạnh: Làm phúc ---------- */
const TD_ALMS=[
 {pool:5,list:[["Lão cung nhân","già yếu, lưng còng",2],["Tiểu cung nữ","mới vào cung",1],["Cung nhân ốm","vừa khỏi bệnh",2]]},
 {pool:8,list:[["Lão ma ma","đói lả",3],["Hai mẹ con nghèo","xin ăn ở cổng",2],["Tiểu thái giám","làm việc nặng",1],["Cung nhân góa","tuổi cao",2]]},
 {pool:7,list:[["Cung nữ giặt áo","tay nứt nẻ",2],["Lão thái giám","ốm yếu",3],["Tiểu cung nhân","còn nhỏ",2]]}];
function tdAlmsScore(need,give,pool){const n=need.length,r=need.map((d,i)=>Math.min(1,give[i]/d)),over=need.reduce((a,d,i)=>a+Math.max(0,give[i]-d),0),left=pool-give.reduce((a,b)=>a+b,0);
 return Math.max(0,.5*Math.min(...r)+.5*r.reduce((a,b)=>a+b,0)/n-.12*over-.1*Math.max(0,left))}
function tdAlmsBest(need,pool){let best=0;const give=need.map(()=>0);(function rec(i,left){if(i===need.length){best=Math.max(best,tdAlmsScore(need,give,pool));return}for(let a=0;a<=left;a++){give[i]=a;rec(i+1,left-a)}give[i]=0})(0,pool);return best||1}
function kgTdAlms(box,env){const lv=tdEase(env.lv);const wrap=document.createElement("div");wrap.className="kg82quiz";box.appendChild(wrap);
 /* mg-balance-2: at low ease the portions run short in more rounds and each round has a time (the people cannot wait): BAL.mgTier.lev.td_hanh */
 const SH=Math.round(mgLev(env,"td_hanh","short")),LIM=Math.round(mgLev(env,"td_hanh","lim"));
 const MP=mgpc1("td_hanh");/* ORDER THIN P1c: the people of the three rounds come from a pooled item (jmgpool_c td_hanh): same number of people, same needs, same pools */
 const rounds=(MP?MP.rounds:TD_ALMS).map((q,k)=>({list:q.list,need:q.list.map(x=>x[2]),pool:q.pool-(k===2&&lv<3?1:0)-(k<2?Math.min(SH,k+1):0)}));let r=0,pts=0,stop=false,give=[],lock=false,t0=performance.now(),tm=0;
 function left(){return rounds[r].pool-give.reduce((a,b)=>a+b,0)}
 function render(){if(stop)return;const R=rounds[r];
  wrap.innerHTML=`<div class="nwb-pool">${NWB.ic("bowl")}${NWB.pips(R.pool,left())}<span class="nwb-cap">còn ${left()} phần để chia</span></div>`+
   R.list.map((x,i)=>`<div class="nwb-row"><button class="kgbtn" data-p="${i}" data-d="-1" aria-label="Bớt một phần cho ${x[0]}">−</button><div class="nwb-mid"><span class="nwb-who">${NWB.ic(NWB.who(x[0]+" "+x[1]))}</span>${NWB.pips(Math.max(x[2],give[i]),give[i])}<span class="nwb-cap">${x[0]} · cần ${x[2]} phần · nhận ${give[i]}</span></div><button class="kgbtn" data-p="${i}" data-d="1" aria-label="Thêm một phần cho ${x[0]}">+</button></div>`).join("")+
   `<div class="kg82act">${NWB.btn("tdadone","check",{alt:false,label:"Phát xong"})}</div>`;
  wrap.querySelectorAll("button[data-p]").forEach(b=>b.onclick=()=>{if(lock)return;const i=+b.dataset.p,d=+b.dataset.d;if(d>0&&left()<=0)return;if(d<0&&give[i]<=0)return;give[i]+=d;kg82Pluck(1,true);render()});
  wrap.querySelector("#tdadone").onclick=done;hud()}
 const hud=()=>env.hud({score:mgReach(pts,r,3),round:`Lượt ${Math.min(r+1,3)}/3`,time:`${Math.max(0,Math.ceil((LIM-(performance.now()-t0))/1000))} giây`});
 tm=setInterval(()=>{if(stop||lock)return;hud();if(performance.now()-t0>=LIM)done()},250);
 function done(){if(lock||stop)return;lock=true;const R=rounds[r],s=tdAlmsScore(R.need,give,R.pool)/tdAlmsBest(R.need,R.pool),got=Math.min(1,s)*10/3;pts+=got;
  const ok=s>=.95;kg82Pluck(ok?3:0,ok);wrap.insertAdjacentHTML("beforeend",`<div class="nwb-pool ${ok?"g":s>=.6?"n":"r"}">${NWB.ic(ok||s>=.6?"check":"cross")}</div>`);
  r++;hud();/* review/mg-score-same: the mark in hand drops the moment the round is judged (the 250 ms tick sleeps while locked) */setTimeout(()=>{if(r>=3){stop=true;clearInterval(tm);env.end((pts))}else{give=rounds[r].need.map(()=>0);lock=false;t0=performance.now();render()}},1400)}
 give=rounds[0].need.map(()=>0);
 KG82.peek=()=>{if(lock||stop)return null;const R=rounds[r];let i=R.need.findIndex((d,k)=>give[k]<tdAlmsBestGive(R)[k]);/* think: the first share of a round is the decision (more people / short portions = longer to work out) */const th=give.every(x=>!x)?1000+500*R.need.length+(R.pool<R.need.reduce((a,b)=>a+b,0)?2500:0):0;
  if(i<0||left()<=0)return{sel:"#tdadone",thinkMs:th};return{sel:`#${box.id||"kg82box"} button[data-p="${i}"][data-d="1"]`,thinkMs:th}};
 render();return()=>{stop=true;clearInterval(tm)}}
function tdAlmsBestGive(R){let best=-1,bg=null;const give=R.need.map(()=>0);(function rec(i,left){if(i===R.need.length){const s=tdAlmsScore(R.need,give,R.pool);if(s>best){best=s;bg=give.slice()}return}for(let a=0;a<=left;a++){give[i]=a;rec(i+1,left-a)}give[i]=0})(0,R.pool);return bg}
/* ---------- easy-rules layer (same pattern as review/mg-easy): Gợi ý button, quiet idle hint, first-time example card ---------- */
const TD_HINT={stitch:"Viền vàng chỉ cuộn chỉ đúng sắc, hoặc chỗ chạm khung khi kim chúc xuống.",tdwalk:"Viền vàng ở nửa khung nên giữ lúc này.",tdtalk:"Viền vàng ở nút Thưa: giữ khi vòng xanh sáng, buông khi tiếng nói vào dải xanh.",tdalms:"Viền vàng ở nút cần chạm tiếp (hoặc nút Phát xong)."};
const TD_EX={cong:"Dải sáng ở mép cánh hoa là sắc đậm nhất trong mẫu: chạm cuộn chỉ đậm ấy, rồi chạm khung mỗi lần kim chúc xuống chấm sáng.",dung:"Dấu sàn ghi “◀” thì bát sắp nghiêng trái: giữ nửa phải để đỡ lại.",ngon:"Thái hậu vui (bề trên): chờ bà nói xong, vòng xanh sáng thì giữ Thưa, tiếng nói vừa tới dải xanh thấp (nhỏ nhẹ) thì buông.",hanh:`Người ghi cần ${BAL.td.exNeed} phần: chạm + hai lần cho người ấy, rồi làm vậy với mọi người, chạm Phát xong.`};
function tdIdle(lv){lv=+lv||0;return lv<=1?6500:lv<=3?10500:0}
function tdSeen(k,set){try{if(KG82.noDemo||!S)return true;const m=S.mgSeen||(S.mgSeen={});if(set){m["td_"+k]=1;return true}return !!m["td_"+k]}catch(e){return true}}
function tdRing(pt,ms){const r=document.createElement("div");r.className="tdring ksel";r.style.cssText=`position:fixed;left:${pt.x-26}px;top:${pt.y-26}px;width:52px;height:52px;border-radius:50%;pointer-events:none;z-index:99999`;document.body.appendChild(r);setTimeout(()=>r.remove(),ms||2600);return r}
function tdWrap(eng,ek){return function(box,env){let hints=0,last=performance.now(),dead=false;const tipId="tdtip",IDLE=tdIdle(env.lv),end0=env.end;
 const act=document.createElement("div");act.className="kg82act";act.innerHTML=NWB.btn("tdhint","hint",{label:"Gợi ý: chỉ chỗ đúng, bớt một ít phần"});
 const tip=document.createElement("div");tip.id=tipId;const say=()=>{}/* no text in play: the gold ring / glow is the hint */;box.appendChild(act);box.appendChild(tip);
 const show=auto=>{if(dead||!KG82.peek)return;const p=KG82.peek();if(!p)return;hints+=auto?.3:.7;last=performance.now();let pt=p.x!=null?p:p.drag&&p.drag[0]?{x:p.drag[0][0],y:p.drag[0][1]}:null;
  if(p.sel){const e=document.querySelector(p.sel);if(e){e.classList.add("ksel");setTimeout(()=>e.classList.remove("ksel"),2600);pt=null}}
  say();if(pt)tdRing(pt);if(p.drag&&p.drag.length>1){const q=p.drag[Math.min(p.drag.length-1,3)];tdRing({x:q[0],y:q[1]})}};
 act.querySelector("button").onclick=()=>show(false);
 const act0=()=>{last=performance.now()};box.addEventListener("pointerdown",act0);box.addEventListener("pointermove",act0);
 const iv=IDLE?setInterval(()=>{if(dead)return;if(performance.now()-last>IDLE)show(true)},800):0;
 env.end=raw=>end0(Math.max(0,raw-Math.min(2,hints)));/* review/mg-balance-2-r1: keep the float (kg82Play grades it with mgGrade); rounding here made the 4 Tứ đức grades jump 9→10 */
 /* review/mg-score-same: the four Tứ đức engines give the board a FLOAT (the raw reachable); the mark in hand = the ONE grade of it minus the hints taken so far, as env.end above */
 const hud0=env.hud;env.hud=o=>{if(o&&typeof o.score==="number")o=Object.assign({},o,{score:mgLive(env,Math.max(0,o.score-Math.min(2,hints)))});hud0(o)};
 env.hintCut=()=>Math.min(2,hints);/* crHud (jcraft, the stitch board) takes the hints off before it grades */const stop=eng(box,env);return()=>{dead=true;clearInterval(iv);document.querySelectorAll(".tdring").forEach(e=>e.remove());if(stop)stop()}}}
Object.assign(KG82_ENG,{tdwalk:tdWrap(kgTdWalk,"tdwalk"),tdtalk:tdWrap(kgTdTalk,"tdtalk"),tdalms:tdWrap(kgTdAlms,"tdalms")});
crReg("td_cong","stitch",tdWrap(crtStitch,"stitch"));/* the stitch board inside the Tứ đức wrapper (hint button + idle hints, like Dung / Ngôn / Hạnh) */

/* ---------- layout only (colours and chrome come from the kit) ---------- */
(function(){const st=document.createElement("style");st.id="td-css";st.textContent=`
.kg82ar{display:flex;gap:8px;align-items:center;justify-content:space-between;margin:6px 0}.kg82ar>span{flex:1;text-align:center;font-size:.92rem}.kg82ar>button{flex:none;min-width:52px;min-height:48px}
.kg82opts button b{display:inline-block;margin-bottom:2px}.kg82opts button{height:auto;white-space:normal;line-height:1.35}
`;document.head.appendChild(st)})();

/* ---------- the study acts (j85 lessonVir): intro (rules) -> game -> result -> progress ---------- */
const TD_MODE={self:"Tự học",master:"Học với ma ma"};
function tdPoints(mode,raw){return mode==="self"?(raw>=9?2:1):(raw>=7?3:2)}
/* mg-skip-all: a quick lesson ("Để trời định", KIT §13.6) won = the progress of a BAL.skip.raw play (tiến bộ một phần), lost = no progress; TDS.q = that roll (null = played / bot) */
function tdGain(mode,raw,skipped){return skipped&&TDS.q===false?0:tdPoints(mode,raw)}
function tdQuality(p){try{const a=(p&&p.vpf&&p.vpf.cong)||[];return a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length/10*2):0}catch(e){return 0}}
(function(){const v0=virtueBonus;virtueBonus=function(p,k){const b=v0.apply(this,arguments);try{if(k==="cong"&&b&&b.q!=null&&p===S)b.q+=tdQuality(p)}catch(e){}return b};window.virtueBonus=virtueBonus})();
const TDS={busy:false};window.TDS=TDS;
function tdPlay(k,mode){if(!S||S.dead||Q.length||S.mg||TDS.busy)return;vNorm(S);const l=S.vir[k],cost=virCost(l),V=VIR.find(x=>x.k===k);if(!V||l>=5)return;
 if(mode==="self"){if(!can(BAL.td.k)||S.suc<BAL.td.selfMin)return}else if(!can(BAL.td.k)||S.bac<cost)return;
 const kind=TD_OF[k],K=KG82_KIND[kind];if(window.__bot||typeof kg82Open!=="function"){tdFinish(k,mode,5,true);return}
 TDS.busy=true;KG82.ctx="hoc";kg82Preload(kind);mgSet(kind,{occ:"hoc",lv:l});/* mg-balance: board ease from the tier (jmgt) */
 const d=kg82Open({art:`${V.n} · ${V.full}`,title:`${TD_MODE[mode]||"Học"} · ${K.t}`,how:K.how,round:K.e==="stitch"?"Hồi":K.e==="tdwalk"?"Bước":K.e==="tdalms"?"Lượt":"Câu",roundV:"–",pic:kg82Pic(kind)});
 if(!d){TDS.busy=false;tdFinish(k,mode,5,true);return}const box=kg82Box();
 const cancel=()=>{kg82Close();TDS.busy=false};
 const result=(raw,skipped,qok)=>{KG82.phase="result";TDS.q=skipped?!!qok:null;const gain=tdGain(mode,raw,skipped),q=k==="cong"?Math.round(raw/10*2):0;
  kg82ShowRes(kg82Rows([skipped?["Để trời định",qok?"thành: tiến bộ một phần":"hỏng: không tiến bộ","t"]:["Màn chơi",`${raw}/10 · ${kg82Word(raw)}`,"t"],["Mục đích",TD_GOAL[k],"n"],].concat(k==="dung"&&!skipped&&KG82.tdwalkStat?[["Vì sao",`Bát vững ${KG82.tdwalkStat.ok}/${KG82.tdwalkStat.dur} giây · đổ ${KG82.tdwalkStat.spill} lần`,"n"]]:[]).concat([["Tiến bộ",kg82Chip(`${V.n} tiến bộ`,gain,"g")]]).concat(k==="cong"?[["Đồ thủ công",`phẩm +${q} (luyện tay ${raw>=5?"khéo":"còn vụng"})`,"n"]]:[]))+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`,raw>=5);/* merge-train-4: result sound like j82 lessons (raw>=5 = win) */
  kg82Set("score",`${raw}/10`);kg82Set("time","đã hết");KG82.last={raw,skipped,gain};
  $("kg82ok").onclick=()=>{kg82Close();TDS.busy=false;tdFinish(k,mode,raw,skipped)}};
 KG82.phase="intro";const HOWL=["Chơi dễ: ở bậc thấp có Gợi ý và chỉ dẫn hiện sẵn; bậc càng cao càng rộng tay."];
 /* KIT §13.7 (mg-ready-guide): the step rules + example now sit in the shared rules block EVERY time (was: first time only), «Sẵn sàng» / «Hướng dẫn» */
 box.innerHTML=`<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu</button>${kitQuick({n:"Để trời định",win:"tiến bộ một phần",lose:"không tiến bộ"})}<button class="${kg82Btn(true)}" id="tdcancel">Thôi, để lúc khác<small>không tốn gì</small></button></div>`;
 kgReady(box,{kind,steps:TD_RULES[k].map(([n,t])=>[`Bước ${n}`,t,"t"])});

 KG82.backPre=cancel;/* KIT §13.9: ✕ before «Sẵn sàng» = its own free «Thôi, để lúc khác» (nothing is charged before tdFinish) */
 $("kg82go").onclick=()=>{tdSeen(k,1);kg82Play(kind,raw=>result(raw,false))};$("kg82skip").onclick=()=>{const ok=kitQuickRoll();result(ok?BAL.skip.raw:0,true,ok)};$("tdcancel").onclick=cancel}
function tdFinish(k,mode,raw,skipped){if(!S||S.dead)return;vNorm(S);const l=S.vir[k],cost=virCost(l),V=VIR.find(x=>x.k===k);if(!V||l>=5)return;
 if(mode==="self"){if(!can(BAL.td.k)||S.suc<BAL.td.selfMin)return}else if(!can(BAL.td.k)||S.bac<cost)return;
 const b=typeof rsnap==="function"?rsnap():null,g=tdGain(mode,raw,skipped);TDS.q=null;
 if(mode==="self"){apply({suc:-BAL.td.selfSuc});spend(BAL.td.k);addVir(S,k,g);log(skipped&&!window.__bot?`Tự học ${V.n} (để trời định). Tiến bộ +${g}.`:`Tự học ${V.n} (${kg82Word(raw)} ${raw}/10). Tiến bộ +${g}.`)}
 else{apply({suc:-BAL.td.mSuc,bac:-cost});spend(BAL.td.k);addVir(S,k,g);log(skipped&&!window.__bot?`Học ${V.n} với ma ma giáo tập (để trời định). Tiến bộ +${g}.`:`Học ${V.n} với ma ma giáo tập (${kg82Word(raw)} ${raw}/10). Tiến bộ +${g}.`)}
 if(k==="cong"){S.vpf=S.vpf||{};S.vpf.cong=(S.vpf.cong||[]).concat(raw).slice(-3)}
 save();render();try{if(b&&typeof resultShow==="function")resultShow(`${mode==="self"?"Tự học":"Học"} ${V.n}`,b,null)}catch(e){}}
window.lessonVir=tdPlay;window.tdPlay=tdPlay;
