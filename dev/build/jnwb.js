/* ================= jnwb — NO TEXT IN MINI-GAME PLAY, group b (owner OD 20/11 ~05:10Z: "không có một cái mini game nào mà có chữ hết trơn") =================
   The ONE small icon set + helpers that the play areas of the group-b kinds use instead of words (rules screen «Luật chơi» / «Hướng dẫn» text is untouched):
   td_cong td_dung td_ngon td_hanh chai le tc xa thq hoadien duho kinh may doi tho. Numbers / score / clock chips stay.
   Icons are plain inline SVG (stroke = currentColor) until the painted ones exist: see dev/kit/KIT_REQUESTS.md «mg-noword-b». Pips = CSS dots (no glyph).
   Used: NWB.btn(id, icon, {alt, cls, label}) -> an icon-only button (label = aria-label / tooltip only, never a visible text node);
         NWB.ic(name) -> svg string; NWB.pips(n, on) -> row of dots; NWB.POP = symbol pops (✓ ✗ ★) for canvas feedback. */
const NWB={
 P:{
  hint:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  voice:'<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  cross:'<path d="M6 6l12 12M18 6L6 18"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7"/>',
  bowl:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 21h8"/><path d="M9 6c-1-1.2 1-2 0-3.2M13 6c-1-1.2 1-2 0-3.2"/>',
  adult:'<circle cx="12" cy="8" r="3.6"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7z"/>',
  elder:'<circle cx="12" cy="9" r="3.4"/><circle cx="12" cy="4.2" r="1.4"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7z"/><path d="M20 13v8"/>',
  child:'<circle cx="12" cy="12.5" r="3"/><path d="M7 21c0-3 2.2-5.5 5-5.5s5 2.5 5 5.5z"/>',
  sick:'<circle cx="11" cy="9" r="3.4"/><path d="M4 21c0-4 3-7 7-7s7 3 7 7z"/><path d="M19 4.5c1.4 1.8 1.4 3 0 3.6-1.4-.6-1.4-1.8 0-3.6z"/>',
  rotl:'<path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/>',rotr:'<path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M20 4v5h-5"/>',
  left:'<path d="M15 5l-7 7 7 7"/>',right:'<path d="M9 5l7 7-7 7"/>',
  up:'<path d="M5 15l7-7 7 7"/>',down:'<path d="M5 9l7 7 7-7"/>'},
 ic(k,cls){return `<svg class="nwb-i${cls?" "+cls:""}" viewBox="0 0 24 24" aria-hidden="true">${NWB.P[k]||""}</svg>`},
 /* the hint / done buttons are the SAME signs as group a (j91 k91Btns): «?» and «✓» on .kgbtn, the word only in the tooltip (mg-noword-a); other signs are the svg icons */
 btn(id,k,o){o=o||{};const lab=o.label||"",inner=k==="hint"?"?":k==="check"?"✓":NWB.ic(k);return `<button type="button" class="${o.cls||"kgbtn"} nwb-btn" id="${id}" aria-label="${lab}" title="${lab}">${inner}</button>`},
 pips(n,on,cls){let s="";for(let i=0;i<n;i++)s+=`<i class="nwb-pip${i<on?" on":""}"></i>`;return `<span class="nwb-pips${cls?" "+cls:""}" aria-hidden="true">${s}</span>`},
 who(name){return/già|lão|góa|cao|ma ma/i.test(name)?"elder":/nhỏ|tiểu|mới|còn nhỏ/i.test(name)?"child":/ốm|yếu|đói/i.test(name)?"sick":"adult"},
 POP:{ok:"✓",bad:"✗",s3:"★★★",s2:"★★",s1:"★"}};
(function(){const st=document.createElement("style");st.id="nwb-css";st.textContent=`
/* the frame's «Cách chơi» sentence is the RULES: it goes while the game runs (kg-run is put on #kg82 by kg82Play), every kind */
#kg82.kg-run .kghow,#kg82.kg-ready .kghow{display:none}/* the rules block (.kgr) holds the same sentence: no duplicate */
.nwb-i{width:1.5em;height:1.5em;vertical-align:middle;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.nwb-btn{display:inline-flex;align-items:center;justify-content:center;min-width:56px;min-height:48px}.nwb-btn .nwb-i{width:1.8em;height:1.8em}
.nwb-pips{display:inline-flex;gap:5px;align-items:center;vertical-align:middle}.nwb-pip{width:13px;height:13px;border-radius:50%;border:2px solid var(--k-hair,#b59a6a);box-sizing:border-box;background:transparent}
.nwb-pip.on{background:var(--gold,#d99a1e);border-color:var(--gold,#d99a1e)}
.nwb-row{display:flex;gap:10px;align-items:center;justify-content:space-between;margin:6px 0}.nwb-row .nwb-mid{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px}
.nwb-row .nwb-who .nwb-i{width:2.2em;height:2.2em}
.nwb-pool{display:flex;gap:4px;justify-content:center;align-items:center;margin:4px 0;flex-wrap:wrap}.nwb-pool .nwb-i{width:1.6em;height:1.6em}
`;document.head.appendChild(st)})();

/* ================= rules screen: the move shown by PICTURE (owner OD 20/11 ~06:20Z td_dung «tôi không hiểu cách chơi», ~06:45Z td_* too much text) =================
   kgReady (j82) draws NWB_DEMO[engine]() in place of the generic dot demo when it exists. Wordless, looping CSS animation (still under Cảnh động off):
   tdwalk: the floor arrow says which way the bowl leans, the bowl tips, a hand HOLDS the opposite half, the bowl stands again.
   tdalms: a hand taps «+», the pips of that person fill, ✓. tdtalk: dots, green ring, a hand HOLDS the voice button, the bar rises into the green band, release, ✓.
   tdthread: sample colour, a hand taps the same thread, then the needle draws the dotted line. */
(function(){
 const H=()=>typeof KG82_HAND==="string"?KG82_HAND:"";
 const hand=(c)=>`<span class="nd-hand ${c}">${H()}<b class="kgr-ring"></b></span>`;
 const wrap=(c,inner)=>`<div class="kgr-demo nwb-demo" aria-hidden="true"><div class="kgr-st nwb-st ${c}">${inner}</div></div>`;
 const bowl='<svg viewBox="0 0 60 40"><path d="M4 12h52c0 16-12 26-26 26S4 28 4 12z" fill="#b07a3a" stroke="#5a3a0c" stroke-width="2"/><ellipse cx="30" cy="12" rx="26" ry="5" fill="#d9a85a" stroke="#5a3a0c" stroke-width="2"/></svg>';
 window.NWB_DEMO={
  tdwalk:()=>{let f="";try{f=kitFigOf(S)}catch(e){}return wrap("nd-dung",`<i class="nd-half l"></i><i class="nd-half r"></i>${f?`<img class="nd-fig" src="${f}" alt="">`:""}<b class="nd-mark m1">◀</b><b class="nd-mark m2">▶</b><span class="nd-bowl">${bowl}</span><span class="nd-gauge"><i class="nd-gz"></i><i class="nd-needle"></i></span><b class="nd-ok">✓</b>${hand("h1")}${hand("h2")}`)},/* td-dung-clear: HER with the bowl on her head, the floor arrow, the held half, the bowl stands again (✓) */
  tdalms:()=>wrap("nd-hanh",`<span class="nd-pool">${NWB.ic("bowl")}</span><span class="nd-btn">−</span><span class="nd-who">${NWB.ic("elder")}</span><span class="nd-need"><i class="nwb-pip"></i><i class="nwb-pip"></i><i class="nwb-pip on nd-f1"></i><i class="nwb-pip on nd-f2"></i></span><span class="nd-btn nd-plus">+</span>${hand("h1")}<b class="nd-ok">✓</b>`),
  tdtalk:()=>wrap("nd-ngon",`<span class="nd-bub"><i></i><i></i><i></i></span><span class="nd-ring"></span><span class="nd-say">${NWB.ic("voice")}</span><span class="nd-bar"><i class="nd-band"></i><i class="nd-fill"></i></span>${hand("h1")}<b class="nd-ok">✓</b>`),
  groom:()=>wrap("nd-groom",`<span class="nd-zb"><i class="z1"></i><i class="z2"></i><i class="z3"></i><b class="nd-nd">▼</b></span>${hand("h1")}<b class="nd-ok">✓</b>`),
  tdthread:()=>wrap("nd-cong",`<span class="nd-sample"></span><b class="nd-arrow">▼</b><span class="nd-sw s1"></span><span class="nd-sw s2"></span><span class="nd-sw s3"></span><svg class="nd-line" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M2 12 C 25 0, 45 22, 70 8 S 92 10 98 6" fill="none" stroke="#5a3a0c" stroke-width="2.5" stroke-dasharray="2 5" stroke-linecap="round"/><path class="nd-ink" d="M2 12 C 25 0, 45 22, 70 8 S 92 10 98 6" fill="none" stroke="#c23b22" stroke-width="3.5" stroke-linecap="round" pathLength="1"/></svg>${hand("h1")}`)
 };
 const st=document.createElement("style");st.id="nwb-demo-css";st.textContent=`
.nwb-st{height:118px;position:relative;overflow:hidden}.nwb-st::before{display:none}
.nwb-st>*{position:absolute;display:block}
.nwb-st .nd-hand{width:38px;height:44px;opacity:0;filter:drop-shadow(0 2px 3px rgba(60,30,10,.35))}.nwb-st .nd-hand svg{width:100%;height:100%;display:block}.nwb-st .nd-hand .kgr-ring{left:36%;top:6%}
.nwb-st .nd-ok{right:7%;top:8%;font-size:30px;color:var(--good,#2d7a52);opacity:0}
/* td_dung (td-dung-clear): she stands, the bowl sits on her head; mark ◀ = it leans left; the hand holds the OTHER half; the bowl stands again */
.nwb-st.nd-dung{height:168px}
.nd-dung .nd-half{top:34px;bottom:4px;width:30%;border:2px dashed #b8935588;border-radius:10px;opacity:0}.nd-dung .nd-half.l{left:2%}.nd-dung .nd-half.r{right:2%}
.nd-dung .nd-fig{left:50%;bottom:2px;height:112px;width:auto;margin-left:-26px;transform-origin:50% 100%;animation:ndFig 8s infinite}
.nd-dung .nd-bowl{left:50%;bottom:112px;width:44px;margin-left:-22px;margin-bottom:-2px;transform-origin:50% 100%;animation:ndBowl 8s infinite}
.nd-dung .nd-mark{left:50%;bottom:4px;margin-left:-60px;font-size:22px;color:#fff3d6;background:var(--red,#c23b22);border-radius:12px;padding:0 10px;opacity:0}
.nd-dung .nd-mark.m2{margin-left:36px}
.nd-dung .nd-gauge{left:10%;right:10%;top:6px;height:12px;border:2px solid #5a3a1a;border-radius:3px;background:rgba(194,59,34,.3);overflow:visible}
.nd-dung .nd-gz{position:absolute;left:35%;right:35%;top:0;bottom:0;background:rgba(76,160,110,.85)}
.nd-dung .nd-needle{position:absolute;top:10px;left:50%;margin-left:-6px;border:6px solid transparent;border-bottom:9px solid var(--good,#2d7a52);border-top:0;animation:ndNeedle 8s infinite}
.nd-dung .nd-ok{right:6%;top:30px;animation:ndOk2 8s infinite}
.nd-dung .nd-hand.h1{right:12%;top:90px;animation:ndH1 8s infinite}.nd-dung .nd-hand.h2{left:12%;top:90px;animation:ndH2 8s infinite}
.nd-dung .m1{animation:ndM1 8s infinite}.nd-dung .m2{animation:ndM2 8s infinite}.nd-dung .nd-half.r{animation:ndH1 8s infinite}.nd-dung .nd-half.l{animation:ndH2 8s infinite}
@keyframes ndBowl{0%,8%{transform:rotate(0)}20%,30%{transform:translateX(-5px) rotate(-26deg)}45%,55%{transform:rotate(0)}62%,72%{transform:translateX(5px) rotate(26deg)}90%,100%{transform:rotate(0)}}
@keyframes ndFig{0%,8%{transform:rotate(0)}20%,30%{transform:rotate(-3deg)}45%,55%{transform:rotate(0)}62%,72%{transform:rotate(3deg)}90%,100%{transform:rotate(0)}}
@keyframes ndNeedle{0%,8%{margin-left:-6px;border-bottom-color:var(--good,#2d7a52)}20%,30%{margin-left:-62px;border-bottom-color:var(--red,#c23b22)}45%,55%{margin-left:-6px;border-bottom-color:var(--good,#2d7a52)}62%,72%{margin-left:50px;border-bottom-color:var(--red,#c23b22)}90%,100%{margin-left:-6px;border-bottom-color:var(--good,#2d7a52)}}
@keyframes ndOk2{0%,40%{opacity:0}46%,56%{opacity:1}60%,90%{opacity:0}92%,100%{opacity:0}}
@keyframes ndM1{0%,4%{opacity:0}8%,30%{opacity:1}36%,100%{opacity:0}}@keyframes ndM2{0%,54%{opacity:0}58%,80%{opacity:1}86%,100%{opacity:0}}
@keyframes ndH1{0%,24%{opacity:0}28%,46%{opacity:1}52%,100%{opacity:0}}@keyframes ndH2{0%,72%{opacity:0}76%,94%{opacity:1}98%,100%{opacity:0}}
/* td_hanh */
.nd-hanh .nd-pool{left:5%;top:10%;color:var(--gold,#d99a1e)}.nd-hanh .nd-pool .nwb-i{width:2em;height:2em}
.nd-hanh .nd-btn{top:38%;width:38px;height:38px;border:1.5px solid var(--k-hair,#b59a6a);border-radius:8px;text-align:center;line-height:34px;font-size:22px;background:#fffdf6}.nd-hanh .nd-btn:first-of-type{left:12%}.nd-hanh .nd-plus{right:12%}
.nd-hanh .nd-who{left:50%;top:14%;margin-left:-22px}.nd-hanh .nd-who .nwb-i{width:2.6em;height:2.6em}
.nd-hanh .nd-need{left:50%;top:62%;transform:translateX(-50%);display:flex;gap:7px}.nd-hanh .nd-need .nwb-pip{width:16px;height:16px}
.nd-hanh .nd-need .nwb-pip.on{opacity:0}.nd-hanh .nd-f1{animation:ndF1 6s infinite}.nd-hanh .nd-f2{animation:ndF2 6s infinite}
.nd-hanh .nd-need .nwb-pip:nth-child(3){margin-left:-46px}.nd-hanh .nd-need .nwb-pip:nth-child(4){margin-left:0}
.nd-hanh .nd-hand.h1{right:7%;top:44%;animation:ndTap 6s infinite}.nd-hanh .nd-ok{animation:ndOk 6s infinite}
@keyframes ndF1{0%,18%{opacity:0}22%,100%{opacity:1}}@keyframes ndF2{0%,42%{opacity:0}46%,100%{opacity:1}}
@keyframes ndTap{0%,8%{opacity:0;transform:translateY(8px)}12%,70%{opacity:1;transform:translateY(0)}18%{transform:translateY(6px)}40%{transform:translateY(0)}44%{transform:translateY(6px)}50%{transform:translateY(0)}78%,100%{opacity:0}}
@keyframes ndOk{0%,60%{opacity:0}68%,92%{opacity:1}100%{opacity:0}}
/* td_ngon */
.nd-ngon .nd-bub{left:6%;top:12%;width:92px;height:48px;border:2px solid var(--k-hair,#b59a6a);border-radius:20px;background:#fffdf6;display:flex;gap:7px;align-items:center;justify-content:center;animation:ndBub 8s infinite}
.nd-ngon .nd-bub i{width:9px;height:9px;border-radius:50%;background:#3a1a0c;animation:ndDot 1s infinite}.nd-ngon .nd-bub i:nth-child(2){animation-delay:.2s}.nd-ngon .nd-bub i:nth-child(3){animation-delay:.4s}
.nd-ngon .nd-ring{left:102px;top:10px;width:30px;height:30px;border-radius:50%;border:6px solid #8a735055;animation:ndRing 8s infinite}
.nd-ngon .nd-say{left:42%;top:56%;width:54px;height:40px;border:1.5px solid var(--k-hair,#b59a6a);border-radius:10px;background:#fffdf6;text-align:center;line-height:40px}.nd-ngon .nd-say .nwb-i{width:1.7em;height:1.7em}
.nd-ngon .nd-bar{right:20%;top:10%;bottom:10%;width:22px;border:2px solid var(--k-hair,#b59a6a);background:#fffdf6}.nd-ngon .nd-band{position:absolute;left:0;right:0;bottom:30%;height:16%;background:#2d7a5255}
.nd-ngon .nd-fill{position:absolute;left:3px;right:3px;bottom:0;background:linear-gradient(#c23b22,#f0b040);height:0;animation:ndFill 8s infinite}
.nd-ngon .nd-hand.h1{left:44%;top:56%;animation:ndHold 8s infinite}.nd-ngon .nd-ok{animation:ndOk8 8s infinite}
@keyframes ndBub{0%,24%{opacity:1}30%,100%{opacity:.25}}@keyframes ndDot{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes ndRing{0%,24%{border-color:#8a735055}30%,100%{border-color:var(--good,#2d7a52)}}
@keyframes ndHold{0%,32%{opacity:0}36%,70%{opacity:1}76%,100%{opacity:0}}@keyframes ndFill{0%,34%{height:0}70%,76%{height:46%}84%,100%{height:0}}
@keyframes ndOk8{0%,72%{opacity:0}78%,94%{opacity:1}100%{opacity:0}}
/* chai */
.nd-groom .nd-zb{left:8%;right:8%;top:46%;height:26px;border:2px solid #6e4d0e;display:flex}.nd-groom .nd-zb i{display:block;height:100%}.nd-groom .z1{width:30%;background:#cdbf9f}.nd-groom .z2{width:40%;background:var(--good,#2d7a52)}.nd-groom .z3{width:30%;background:var(--red,#c23b22)}
.nd-groom .nd-nd{top:-24px;left:0;font-size:22px;color:#8a2a1e;animation:ndNeedle 4s infinite}
.nd-groom .nd-hand.h1{left:50%;top:6%;animation:ndHold4 4s infinite}.nd-groom .nd-ok{animation:ndOk4 4s infinite}
@keyframes ndNeedle{0%{left:0}40%{left:46%}50%,62%{left:46%}100%{left:94%}}
@keyframes ndHold4{0%,38%{opacity:0}42%,60%{opacity:1;transform:translateY(8px)}66%,100%{opacity:0}}@keyframes ndOk4{0%,50%{opacity:0}56%,90%{opacity:1}100%{opacity:0}}
/* td_cong */
.nd-cong .nd-sample{left:50%;top:6%;width:34px;height:34px;margin-left:-17px;border-radius:50%;background:#c23b22;border:3px solid #fff6dc}
.nd-cong .nd-arrow{left:50%;top:38%;margin-left:-9px;font-size:16px;color:#3a1a0c}
.nd-cong .nd-sw{top:56%;width:28px;height:28px;border-radius:50%;border:3px solid #fff6dc}.nd-cong .s1{left:28%;background:#c23b22;animation:ndSw 7s infinite}.nd-cong .s2{left:45%;background:#d99a1e}.nd-cong .s3{left:62%;background:#6a4ca8}
.nd-cong .nd-line{left:6%;right:6%;top:78%;width:88%;height:30px;opacity:0;animation:ndLine 7s infinite}.nd-cong .nd-ink{stroke-dasharray:1;stroke-dashoffset:1;animation:ndInk 7s infinite}
.nd-cong .nd-hand.h1{left:26%;top:60%;animation:ndCong 7s infinite}
@keyframes ndSw{0%,18%{transform:scale(1)}24%{transform:scale(1.3)}30%,100%{transform:scale(1)}}
@keyframes ndLine{0%,34%{opacity:0}40%,92%{opacity:1}100%{opacity:0}}@keyframes ndInk{0%,44%{stroke-dashoffset:1}84%,100%{stroke-dashoffset:0}}
@keyframes ndCong{0%,10%{opacity:0;transform:translate(0,0)}16%,28%{opacity:1;transform:translate(0,0)}36%{opacity:1;transform:translate(-4%,50%)}46%{opacity:1;transform:translate(-4%,50%)}84%{opacity:1;transform:translate(220px,40%)}92%,100%{opacity:0;transform:translate(220px,40%)}}
.kgr-still~*,.kgr-still *{animation:none!important}
@media (prefers-reduced-motion:reduce){.nwb-st *{animation:none!important}.nwb-st .nd-hand,.nwb-st .nd-ok,.nwb-st .nd-mark.m1{opacity:1!important}}
`;document.head.appendChild(st)})();
/* ================= rules-screen demos of mg-5s-clear (owner OD 21/11 ~00:50Z «tôi không hiểu đang chơi cái gì»): ban, tat/ne, banh, duho, doi, hoadien =================
   Same pattern as the td demos above: wordless-ish looping CSS pictures (a short label only), still under Cảnh động off. Every one shows: the object, the move (a hand), the ✓. */
(function(){
 const H=()=>typeof KG82_HAND==="string"?KG82_HAND:"";
 const hand=()=>`<span class="nd-hand">${H()}<b class="kgr-ring"></b></span>`;
 const wrap=(c,inner)=>`<div class="kgr-demo nwb-demo" aria-hidden="true"><div class="kgr-st nwb-st nd5 ${c}">${inner}</div></div>`;
 const cap=t=>`<b class="nd-cap">${t}</b>`;
 Object.assign(window.NWB_DEMO,{
  aim:()=>wrap("nd-ban",`<i class="nd-rail"><i class="nd-zn"></i></i><b class="nd-mk">▼<i></i></b><span class="nd-tg"></span>${cap("Chạm khi mũi ngắm ở giữa")}${hand()}<b class="nd-ok">✓</b>`),
  slapbar:(s)=>{const ne=s&&s.kind==="ne";return wrap(ne?"nd-ne":"nd-tat",`<i class="nd-rail"><i class="nd-zn z1"></i><i class="nd-zn z2"></i></i><b class="nd-mk">▼</b>${cap(ne?"Chạm khi kim vào vùng xanh":"Chạm khi kim qua giữa vùng đỏ")}${hand()}<b class="nd-ok">✓</b>`)},
  cook:()=>wrap("nd-banh",`<span class="nd-gg"><i class="nd-zn"></i><i class="nd-fl"></i></span><span class="nd-pot"></span><span class="nd-slip">gạo</span><span class="nd-fan">quạt</span>${cap("Giữ quạt cho lửa vừa, kéo nguyên liệu vào nồi")}${hand()}<b class="nd-ok">✓</b>`),
  tspluck:()=>wrap("nd-duho",`<i class="nd-lane"><u>vùng hái</u></i><span class="nd-lotus"></span>${cap("Chạm sen khi nó vào vùng sáng")}${hand()}<b class="nd-ok">✓</b>`),
  doiline:()=>wrap("nd-doi",`<span class="nd-sc l"><svg viewBox="0 0 40 40"><path d="M10 8 L28 32" stroke="#2a1a12" stroke-width="4" stroke-linecap="round"/></svg></span><i class="nd-axis"></i><span class="nd-sc r"></span><span class="nd-tl"><svg viewBox="0 0 40 40"><path d="M30 8 L12 32" stroke="#2a1a12" stroke-width="4" stroke-linecap="round"/></svg></span>${cap("Nét bên phải là hình lật gương của nét bên trái")}${hand()}<b class="nd-ok">✓</b>`),
  hoadien:()=>wrap("nd-hd",`<span class="nd-face"><i class="nd-br l"></i><i class="nd-br r"></i><i class="nd-spot"></i></span><span class="nd-fl2">❀</span>${cap("Đặt hoa điền vào giữa hai đầu mày")}${hand()}<b class="nd-ok">✓</b>`)});
 const st=document.createElement("style");st.id="nwb-demo5-css";st.textContent=`
.nd5{height:128px}.nd5 .nd-cap{left:4%;right:4%;bottom:4px;text-align:center;font:700 12.5px var(--body,sans-serif);color:#5a3a1a}
.nd5 .nd-hand{animation:ndx5H 8s infinite}.nd5 .nd-ok{right:6%;top:6px;animation:ndOk 8s infinite}
@keyframes ndx5H{0%,46%{opacity:0;transform:scale(1.15)}50%{opacity:1;transform:scale(1)}58%{opacity:1;transform:scale(.92)}66%,100%{opacity:0}}
.nd5 .nd-rail{left:10%;right:10%;top:36px;height:14px;border-radius:3px;background:rgba(120,86,40,.2);border:2px solid #8a6a30}
.nd5 .nd-zn{position:absolute;top:0;bottom:0}
.nd5 .nd-mk{top:22px;left:50%;margin-left:-8px;color:#8a2a1e;font-size:18px;line-height:14px;animation:ndx5M 8s infinite}
@keyframes ndx5M{0%{left:12%}22%{left:88%}46%,92%{left:50%}100%{left:12%}}
.nd5 .nd-hand{left:52%;top:40px}
/* ban */
.nd-ban .nd-rail{top:12px}.nd-ban .nd-mk{top:0}.nd-ban .nd-zn{left:44%;width:12%;background:var(--good,#2d7a52)}
.nd-ban .nd-mk i{position:absolute;left:7px;top:18px;height:50px;border-left:2px dashed #8a2a1e99}
.nd-ban .nd-tg{left:50%;top:50px;width:52px;height:52px;margin-left:-26px;border-radius:50%;border:2px solid #6e4d0e;background:radial-gradient(circle,#f0d070 0 14%,#c23b22 14% 34%,#6a8aa0 34% 56%,#2a1a12 56% 78%,#fffaf0 78%)}
.nd-ban .nd-hand{left:56%;top:12px}
/* tat / ne */
.nd-tat .nd-zn.z1{left:30%;width:40%;background:rgba(184,135,42,.6)}.nd-tat .nd-zn.z2{left:44%;width:12%;background:var(--red,#c23b22)}
.nd-ne .nd-zn.z1{left:62%;width:14%;background:var(--good,#2d7a52)}.nd-ne .nd-zn.z2{display:none}
.nd-ne .nd-mk{animation:ndx5N 8s infinite}@keyframes ndx5N{0%{left:12%}22%{left:88%}46%,92%{left:69%}100%{left:12%}}.nd-ne .nd-hand{left:71%}
/* banh */
.nd-banh .nd-gg{left:8%;top:8px;width:22px;height:84px;border:2px solid #8a6a30;border-radius:3px;background:#fffdf6;overflow:hidden}
.nd-banh .nd-zn{left:0;right:0;top:28%;height:26%;background:rgba(76,160,110,.75)}
.nd-banh .nd-fl{position:absolute;left:3px;right:3px;bottom:0;height:12%;background:linear-gradient(#c23b22,#f0b040);animation:ndx5F 8s infinite}
@keyframes ndx5F{0%,10%{height:12%}34%,92%{height:48%}100%{height:12%}}
.nd-banh .nd-pot{left:50%;top:26px;width:62px;height:46px;margin-left:-31px;border-radius:8px 8px 26px 26px;background:#4a3326;border:2px solid #2a1a12}
.nd-banh .nd-slip{left:62%;top:10px;padding:2px 10px;background:#fffdf6;border:1.5px solid #b59a6a;border-radius:6px;font:700 13px var(--body,sans-serif);animation:ndx5S 8s infinite}
@keyframes ndx5S{0%,40%{left:70%;top:14px;opacity:1}58%,64%{left:50%;margin-left:-16px;top:34px;opacity:1}70%,100%{left:50%;margin-left:-16px;top:34px;opacity:0}}
.nd5.nd-banh{height:140px}.nd-banh .nd-fan{left:22%;top:64px;padding:2px 8px;background:#f2d3a4;border:1.5px solid #8a5a2a;border-radius:8px;font:700 12px var(--body,sans-serif)}
.nd-banh .nd-hand{left:30%;top:72px;animation:ndx5F2 8s infinite}@keyframes ndx5F2{0%,8%{opacity:0}12%,34%{opacity:1;transform:scale(.92)}40%,100%{opacity:0}}
/* duho */
.nd-duho{background:linear-gradient(#bfe3d8,#8fc7b3)}.nd-duho .nd-lane{left:30%;right:30%;top:6px;height:74px;border:2px dashed rgba(184,135,42,.9);border-radius:10px;background:rgba(255,226,140,.38)}
.nd-duho .nd-lane u{position:absolute;left:0;right:0;top:-1px;text-align:center;text-decoration:none;font:700 11px var(--body,sans-serif);color:#6b4a1c}
.nd-duho .nd-lotus{top:40px;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle,#fff0f4 0 20%,#e48aa4 22% 70%,#c9617f 72%);border:2px solid #fff;animation:ndx5L 8s infinite}
@keyframes ndx5L{0%{left:94%}46%,56%{left:48%}100%{left:-8%}}.nd-duho .nd-hand{left:50%;top:44px}
/* doi */
.nd-doi .nd-sc{top:8px;width:56px;height:70px;border:1.5px solid #b59a6a;border-radius:8px;background:rgba(255,252,242,.7)}.nd-doi .nd-sc.l{left:22%}.nd-doi .nd-sc.r{right:22%;border-style:dashed}
.nd-doi .nd-sc svg{width:100%;height:100%}.nd-doi .nd-axis{left:50%;top:6px;height:74px;border-left:2px dashed rgba(194,59,34,.6)}
.nd-doi .nd-tl{width:56px;height:56px;border:1.5px solid #b59a6a;border-radius:8px;background:#fffdf6;animation:ndx5T 8s infinite}.nd-doi .nd-tl svg{width:100%;height:100%}
@keyframes ndx5T{0%,40%{left:calc(50% - 28px);top:72px}58%,92%{right:auto;left:calc(78% - 56px);top:14px}100%{left:calc(50% - 28px);top:72px}}
.nd-doi .nd-hand{left:calc(50% - 6px);top:86px;animation:ndx5D 8s infinite}@keyframes ndx5D{0%,38%{opacity:0;left:calc(50% - 6px);top:86px}42%{opacity:1}58%,64%{opacity:1;left:calc(78% - 34px);top:28px}70%,100%{opacity:0}}
/* hoadien */
.nd-hd .nd-face{left:50%;top:4px;width:78px;height:84px;margin-left:-39px;border-radius:50% 50% 46% 46%;background:#f1dfc3;border:2px solid #8a6a30}
.nd-hd .nd-br{position:absolute;top:34px;width:26px;height:5px;border-radius:5px;background:#3a2412}.nd-hd .nd-br.l{left:8px;transform:rotate(-8deg)}.nd-hd .nd-br.r{right:8px;transform:rotate(8deg)}
.nd-hd .nd-spot{position:absolute;left:50%;top:26px;width:16px;height:16px;margin-left:-8px;border-radius:50%;border:2px dashed #c23b22}
.nd-hd .nd-fl2{left:70%;top:68px;font-size:22px;color:#c23b22;animation:ndx5H2 8s infinite}
@keyframes ndx5H2{0%,40%{left:72%;top:64px}58%,92%{left:calc(50% - 11px);top:26px}100%{left:72%;top:64px}}
.nd-hd .nd-hand{left:calc(72% + 4px);top:70px;animation:ndx5D2 8s infinite}@keyframes ndx5D2{0%,38%{opacity:0;left:calc(72% + 4px);top:70px}42%{opacity:1}58%,64%{opacity:1;left:calc(50% - 6px);top:32px}70%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.nd5 .nd-hand,.nd5 .nd-ok{opacity:1!important}}
`;document.head.appendChild(st)})();
