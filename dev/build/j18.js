/* ================= DAY TRANSITIONS: a light sky shift between buổi; night -> dawn curtain with the week's summary at a new tuần ================= */
window.__dawnOn=true;
function wkKey(){return `${S.year}-${S.month}-${S.tuan}`}
function wkSnap(){return{sung:S.sung,danh:S.danh,suc:S.suc,bac:S.bac,rank:S.rank,kids:S.kids.length,seq:S.logSeq||0,key:wkKey()}}
const plain=h=>String(h).replace(/<span class="ld">[^<]*<\/span>/,"").replace(/<\/(div|p|b|span)>/g," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").replace(/ ([.,:;])/g,"$1").trim();
/* the week's summary, rebuilt from the saved snapshot and the saved log */
function wkSummary(){const s=S.wkSnap||wkSnap();const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-(s.seq||0)));const L=S.logs.slice(0,n).map(plain).filter(x=>x&&!/^Xin xăm|^Gieo lại|^Đến /.test(x));
 const pick=(re,max)=>L.filter(x=>re.test(x)).slice(0,max);
 const D=[["Sủng",S.sung-s.sung],["Danh",S.danh-s.danh],["Sức",S.suc-s.suc],["Bạc",S.bac-s.bac]];
 const groups=[["Thăng giáng",pick(/tấn phong|sắc phong|lập .* Hoàng hậu|bị giáng|bị phế|lãnh cung|cấm túc/i,3)],["Sinh tử",pick(/sinh hạ|sinh đôi|băng hà|qua đời|chết|sảy thai|khó sinh/i,3)],
  ["Kẻ nhắm vào ngươi",pick(/ngươi.*(bị|trúng)|định .*(ngươi|của ngươi)|tố giác ngươi|vu .*ngươi|nhắm vào ngươi/i,3)],["Ban thưởng, đồ vật",pick(/ban thưởng|ban cho|nhận được|được tặng|mua /i,2)]];
 const used=new Set(groups.flatMap(g=>g[1]));const other=L.filter(x=>!used.has(x)).slice(0,3);if(other.length)groups.push(["Chuyện khác",other]);
 return{D,groups,rank:S.rank!==s.rank?(S.rank>s.rank?"Được thăng ":"Bị giáng xuống ")+(S.rank>=7?"Hoàng hậu":RANKS[S.rank].n):"",kids:S.kids.length-s.kids}}
function bell(){if(typeof auOk!=="function"||!auOk())return;try{const C=window.__bellCtx||(window.__bellCtx=new (window.AudioContext||window.webkitAudioContext)());const t=C.currentTime;
 [[392,.22,4.5],[784,.08,3],[1176,.05,2],[523,.06,3.5]].forEach(([f,g,d])=>{const o=C.createOscillator(),v=C.createGain();o.type="sine";o.frequency.value=f;v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(g*OPT.sfx,t+.02);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v).connect(C.destination);o.start(t);o.stop(t+d+.1)})}catch(e){}}
function reducedMotion(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)}catch(e){return false}}
function curtain(){if(!S)return;if((S.buoi||0)===0&&S.lastWk!==wkKey()){S.lastWk=wkKey();dawn();return}buoiShift()}
function buoiShift(){const c=$("curtain");if(!c)return;c.className="curtain shift b"+(S.buoi||0);c.innerHTML=`<span>${BUOI[S.buoi||0]}</span>`;void c.offsetWidth;c.classList.add("on");setTimeout(()=>{c.classList.remove("on")},reducedMotion()?150:1000)}
function dawn(){const sum=wkSummary();S.wkSnap=wkSnap();let w=$("dawn");if(!w){w=document.createElement("div");w.id="dawn";w.className="dawn";document.body.appendChild(w)}
 const d=sum.D.filter(([,v])=>v).map(([k,v])=>`<span class="${v>0?"g":"r"}">${k} ${v>0?"+":""}${v}</span>`).join("")||`<span class="past">Không đổi</span>`;
 const lot=S.lot?`<div class="dlot"><b>Quẻ ${LV[S.lot.lv]}</b> · ${S.lot.dom}<small>${(LOTS[S.lot.i]||[])[2]||""}</small><span class="ef ${LVB[S.lot.lv]<0||(S.lot.dom==="Hung"&&S.lot.lv>=3)?"r":LVB[S.lot.lv]>0?"g":"n"}">${lotEffect(S.lot)}</span></div>`:"";
 const G=sum.groups.filter(g=>g[1].length).map(([h,L])=>`<h5>${h}</h5>${L.map(x=>{const v=rivals.find(r=>x.includes(r.name));return `<p>${v?mdH(pv(v),"xs"):/Hoàng thượng/.test(x)?mdH(pEmp(),"xs"):""}${x.length>110?x.slice(0,108)+"…":x}</p>`}).join("")}`).join("");
 w.innerHTML=`<div class="dsky"><i class="lan l1"></i><i class="lan l2"></i><i class="lan l3"></i><i class="sun"></i></div><div class="dbox"><p class="dsea">${SEASON[S.month-1]} · ${S.wx?S.wx.n:""}</p><h2>Năm ${S.year} · Tháng ${S.month} · ${TUAN[S.tuan][0].toUpperCase()+TUAN[S.tuan].slice(1)}</h2>${lot}
  <div class="dcard"><h4>Tuần qua</h4><div class="ddelta">${d}</div>${sum.rank?`<p class="g"><b>${sum.rank}</b></p>`:""}${sum.kids>0?`<p class="g">Thêm ${sum.kids} con</p>`:""}${G||'<p class="past">Một tuần yên ả.</p>'}</div>
  <button class="main" id="dawn-go">Vào ngày mới</button></div>`;
 w.hidden=false;w.classList.toggle("rm",reducedMotion());void w.offsetWidth;w.classList.add("on");setTimeout(bell,reducedMotion()?0:kitPace(1400));
 const close=()=>{w.classList.remove("on");setTimeout(()=>{w.hidden=true},reducedMotion()?0:350);w.onclick=null};w.onclick=close;const b=$("dawn-go");if(b)b.focus({preventScroll:true})}
