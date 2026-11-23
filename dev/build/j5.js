
/* mini-games for art lessons */
const HOA=[["Mai",""],["Lan",""],["Cúc",""],["Trúc",""],["Núi",""],["Sông",""],["Hạc",""],["Thuyền",""]];
const VU=[["↑","Giơ tay áo"],["←","Xoay trái"],["→","Xoay phải"],["↓","Cúi mình"]];
const shuf=a=>a.slice().sort(()=>Math.random()-.5);
let mgStop=null,mgDone=true;
const MG={
 cam:["Cầm: tấu khúc",`Nốt rơi xuống bốn dây Cung, Thương, Giốc, Chủy. Chạm đúng dây khi nốt chạm vạch đỏ${typeof matchMedia==="function"&&matchMedia("(pointer:coarse)").matches?"":" (phím D F J K)"}.`,gCam],
 ky:["Kỳ: đấu cờ","Bàn 7×7. Ngươi cầm quân đen đi trước; năm quân liền một hàng là thắng.",gKy],
 hoa:["Họa: nhớ nét bút","Lật hai ô một lượt, tìm đủ các cặp giống nhau trong số lượt cho phép.",gHoa],
 vu:["Vũ: theo bước múa","Xem các bước sáng lên rồi múa lại đúng thứ tự. 5 lượt, mỗi lượt dài thêm một bước.",gVu]};
/* review/mg-train (owner 16/11 07:20Z no word games): thi + y lessons and their banks (DOI, YQ) + quiz() removed; the openMG wrapper (j82) puts KG82_MGL thi / y (calli, blend) in MG before every open */
function openMG(k,lv,cb){const [t,h,fn]=MG[k];$("mgt").textContent=t;$("mgh").textContent=h;$("ov").hidden=false;mgDone=false;
 const sk=$("mgskip");sk.hidden=false;sk.innerHTML=`Để trời định<small>${kitQuickSub({win:"tiến bộ một phần",lose:"không tiến bộ"})}</small>`;sk.classList.add("kquick");sk.classList.remove("ka","kcard","kdis");delete sk.dataset.ka;
 const fin=(pts,skip)=>{if(mgDone)return;mgDone=true;if(mgStop)mgStop();mgStop=null;sk.hidden=true;const g=pts*(S.master?2:1);
  $("mgb").innerHTML=`<p class="mgres">${skip?(pts?"May mắn":"Không vào"):["","Tạm được","Khá","Xuất sắc"][pts]}</p><p style="text-align:center">Tiến bộ +${g}${S.master&&pts?" (danh sư dạy, gấp đôi)":""}</p><div style="display:flex;justify-content:center"><button class="main" id="mgok">Xong</button></div>`;
  $("mgok").onclick=()=>{$("ov").hidden=true;$("mgb").innerHTML="";cb(g)};/* the used result button is removed: no stale "Xong" with an old callback stays in #ov */$("mgok").focus()};
 sk.onclick=()=>fin(kitQuickRoll()?1:0,true);
 /* KIT §13.7 (mg-ready-guide, owner OD 20/11 ~00:20Z): the lesson board starts only on «Sẵn sàng» (rules read first, no clock); this j5 path is the
    fallback (j83 routes every lesson with S.mg to playArt, which has the full rules screen + «Hướng dẫn»); its old engines have no hint hook, so no guided round here */
 const mb=$("mgb"),run=()=>{mb.innerHTML="";mgStop=fn(mb,lv,p=>fin(p,false))};
 if(typeof kgReady!=="function"){run();return}
 mb.innerHTML=`<div class="kg82act"><button type="button" class="kbtn" id="mgready">Bắt đầu</button></div>`;kgReady(mb,{n:String(t).split(":")[0],t:String(t).split(":").slice(1).join(":").trim(),how:h,go:"#mgready",pic:""});
 $("mgready").onclick=run}
function gCam(b,lv,end){const L=["Cung","Thương","Giốc","Chủy"],N=16,fall=Math.max(1100,2200-lv*220),gap=Math.max(450,800-lv*60);
 b.innerHTML=`<div class="lanes" id="lanes">${L.map((n,i)=>`<div class="lane" data-l="${i}"></div>`).join("")}<div class="hitline" id="hitl"></div></div><div class="lbtns">${L.map((n,i)=>`<button data-l="${i}">${n}</button>`).join("")}</div><p class="mgsc" id="mgsc">Trúng 0/${N}</p>`;
 const H=$("lanes").clientHeight,HIT=Math.round(H*.83);$("hitl").style.top=HIT+"px";
 const notes=[];for(let i=0;i<N;i++)notes.push({l:R(4),t:1200+i*gap,el:null,gone:false});
 const lanes=b.querySelectorAll(".lane");const t0=performance.now();let hits=0,raf=0,done=false;
 function frame(now){if(done)return;const t=now-t0;
  for(const n of notes){if(n.gone)continue;const y=(t-(n.t-fall))/fall*HIT;
   if(!n.el&&y>-20){n.el=document.createElement("i");lanes[n.l].appendChild(n.el)}
   if(n.el){n.el.style.transform=`translateY(${y}px)`;if(y>H+10){n.el.remove();n.el=null;n.gone=true}}}
  if(t>notes[N-1].t+fall*0.3+500){done=true;return end(hits>=BAL.cut.rhythm[1]?3:hits>=BAL.cut.rhythm[0]?2:1)}
  raf=requestAnimationFrame(frame)}
 raf=requestAnimationFrame(frame);
 function tap(l){if(done)return;const t=performance.now()-t0;const n=notes.find(x=>!x.gone&&x.l===l&&Math.abs(x.t-t)<180);
  const btn=b.querySelector(`.lbtns button[data-l="${l}"]`);
  if(n){n.gone=true;hits++;if(n.el){n.el.remove();n.el=null}btn.classList.add("ok")}else btn.classList.add("miss");
  setTimeout(()=>btn.classList.remove("ok","miss"),150);$("mgsc").textContent=`Trúng ${hits}/${N}`}
 b.querySelectorAll("[data-l]").forEach(e=>{e.onpointerdown=ev=>{ev.preventDefault();tap(+e.dataset.l)};e.onclick=ev=>{if(ev.detail===0)tap(+e.dataset.l)}});
 const keys={d:0,f:1,j:2,k:3,"1":0,"2":1,"3":2,"4":3};const kd=e=>{if(e.key in keys){e.preventDefault();tap(keys[e.key])}};document.addEventListener("keydown",kd);
 return()=>{done=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd)}}
function gKy(b,lv,end){const n=7,B=Array(n*n).fill(0);let over=false,maxRun=0;
 b.innerHTML=`<div class="goban">${B.map((_,i)=>`<button data-i="${i}" aria-label="Hàng ${Math.floor(i/n)+1}, cột ${i%n+1}"></button>`).join("")}</div><p class="mgsc" id="mgsc">Đến lượt ngươi.</p>`;
 const cells=b.querySelectorAll(".goban button"),D=[[0,1],[1,0],[1,1],[1,-1]],W=BAL.pm.ky.ai.w;/* one core (law 4): the run weights live in BAL (jbal2 BAL.pm.ky.ai.w, shared with the jpma 7×7 Cờ) */
 const run=(i,p)=>{const r=Math.floor(i/n),c=i%n;let best=0;for(const[dr,dc]of D){let k=1;for(const s of[1,-1]){let rr=r+dr*s,cc=c+dc*s;while(rr>=0&&rr<n&&cc>=0&&cc<n&&B[rr*n+cc]===p){k++;rr+=dr*s;cc+=dc*s}}best=Math.max(best,k)}return best};
 const val=i=>{B[i]=2;const a=run(i,2);B[i]=1;const d=run(i,1);B[i]=0;const r=Math.floor(i/n),c=i%n;return W[Math.min(a,5)]*1.1+W[Math.min(d,5)]+(6-Math.abs(r-3)-Math.abs(c-3))};
 const ai=()=>{let best=-1,bi=-1;const noise=(5-lv)*35+10;for(let i=0;i<B.length;i++)if(!B[i]){const s=val(i)+Math.random()*noise;if(s>best){best=s;bi=i}}return bi};
 const put=(i,p)=>{B[i]=p;cells[i].textContent=p===1?"●":"○";cells[i].classList.add(p===1?"bk":"wh");cells[i].disabled=true;return run(i,p)};
 cells.forEach(c=>c.onclick=()=>{if(over)return;const i=+c.dataset.i;if(B[i])return;const r=put(i,1);maxRun=Math.max(maxRun,r);
  if(r>=5){over=true;$("mgsc").textContent="Ngươi thắng!";return setTimeout(()=>end(3),600)}
  if(B.every(x=>x)){over=true;$("mgsc").textContent="Hòa cờ.";return setTimeout(()=>end(2),600)}
  if(put(ai(),2)>=5){over=true;$("mgsc").textContent="Quân trắng thắng.";return setTimeout(()=>end(maxRun>=4?2:1),800)}
  if(B.every(x=>x)){over=true;$("mgsc").textContent="Hòa cờ.";setTimeout(()=>end(2),600)}});
 cells[24].focus();return()=>{over=true}}
function gHoa(b,lv,end){const P=lv>=3?8:6,limit=P+5+(lv>=3?2:0);const tiles=shuf(HOA.slice(0,P).flatMap(x=>[x,x]));let open=[],found=0,moves=0,lock=false,stop=false;
 b.innerHTML=`<p class="mgsc" id="mgsc"></p><div class="memo">${tiles.map((t,i)=>`<button data-i="${i}" aria-label="Ô ${i+1}">❖</button>`).join("")}</div>`;
 const bs=[...b.querySelectorAll(".memo button")];const upd=()=>$("mgsc").textContent=`Cặp ${found}/${P} · lượt ${moves}/${limit}`;upd();
 bs.forEach(btn=>btn.onclick=()=>{if(lock||stop)return;const i=+btn.dataset.i;if(open.includes(i)||btn.classList.contains("ok"))return;
  btn.innerHTML=`${tiles[i][0]}<small>${tiles[i][1]}</small>`;open.push(i);
  if(open.length===2){moves++;const [a,c]=open;open=[];
   if(tiles[a][1]===tiles[c][1]){bs[a].classList.add("ok");bs[c].classList.add("ok");bs[a].disabled=bs[c].disabled=true;found++;upd();if(found===P){stop=true;return setTimeout(()=>end(moves<=P+3?3:2),600)}}
   else{lock=true;setTimeout(()=>{bs[a].textContent="❖";bs[c].textContent="❖";lock=false},700)}
   upd();if(moves>=limit&&found<P){stop=true;setTimeout(()=>end(1),800)}}});
 bs[0].focus();return()=>{stop=true}}
function gVu(b,lv,end){let len=3,round=0,seq=[],inp=0,showing=true,stop=false;const sp=Math.max(320,650-lv*60);
 b.innerHTML=`<p class="mgsc" id="mgsc"></p><div class="simon">${VU.map((v,i)=>`<button data-i="${i}">${v[0]}<small>${v[1]}</small></button>`).join("")}</div>`;
 const bs=b.querySelectorAll(".simon button");
 function next(){if(stop)return;if(round>=5){stop=true;return end(3)}seq=Array.from({length:len},()=>R(4));inp=0;showing=true;$("mgsc").textContent=`Lượt ${round+1}/5: xem kỹ ${len} bước`;
  seq.forEach((s,k)=>setTimeout(()=>{if(stop)return;bs[s].classList.add("lit");setTimeout(()=>bs[s].classList.remove("lit"),sp*.6)},500+k*sp));
  setTimeout(()=>{if(stop)return;showing=false;$("mgsc").textContent=`Lượt ${round+1}/5: múa lại ${len} bước`},500+len*sp)}
 bs.forEach(bt=>bt.onclick=()=>{if(showing||stop)return;const i=+bt.dataset.i;bt.classList.add("lit");setTimeout(()=>bt.classList.remove("lit"),150);
  if(i!==seq[inp]){stop=true;$("mgsc").textContent="Sai bước.";return setTimeout(()=>end(round>=3?2:1),700)}
  inp++;if(inp===seq.length){round++;len++;setTimeout(next,600)}});
 next();return()=>{stop=true}}
