/* SFX test (dev/audio/SFX_PLAN.md): triggers every moment of the plan in the real game and checks the sound(s) it calls (KSFX.log),
   0 page errors, 0 HTTP ≥400 (audio files included), the 3-voice cap, the Tiếng switch, the UI/event layers.
   usage: node dev/test/sfx.js <site url> <W>x<H>@dpr <out.json>
   Chromium runs with --autoplay-policy=no-user-gesture-required so the <audio> elements really play (no speakers needed). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[],bad=[],audio=new Set();
 p.on('pageerror',e=>errs.push((e.stack||e.message).slice(0,400)));const ONLY=process.env.ONLY?new RegExp(process.env.ONLY):null;
 p.on('response',r=>{const u=r.url();if(/\/audio\//.test(u))audio.add(u.replace(/^.*\/audio\//,'')+' '+r.status());if(r.status()>=400)bad.push(r.status()+' '+u.slice(0,140))});
 p.on('requestfailed',r=>{const u=r.url(),f=r.failure();if(/\/audio\//.test(u)&&!/ABORTED/.test(f&&f.errorText||''))bad.push('failed '+(f&&f.errorText)+' '+u.slice(0,140))});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitSfx==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}
  const s=document.createElement("style");s.textContent=".kroul{display:none!important}";document.head.appendChild(s)});
 for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;start()}return s});if(!srv)break}
 await p.evaluate(()=>{document.querySelectorAll(".kroul,#kroul").forEach(e=>e.remove());Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;tab="go";render()});
 /* sound on, as after the first tap with "Tiếng" on */
 await p.mouse.click(5,5);await p.evaluate(()=>{OPT.snd=true;OPT.mute=false;OPT.sfx=.7;OPT.fxon=true;AU.unlocked=true;window.__bot=false});
 await p.waitForTimeout(800);
 const clean=async()=>p.evaluate(()=>{document.querySelectorAll(".kmov,[id^=\"kroul\"],.kroul-ov,#kpodov").forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;
  const dw=document.getElementById("dawn");if(dw)dw.remove();try{kitPodiumClose(true)}catch(e){}KSFX.last={};KSFX.rs=-1e9;KSFX.live.forEach(v=>{try{v.a.pause()}catch(e){}});KSFX.live=[]}).then(()=>p.waitForTimeout(250));
 const R=[];await p.evaluate(()=>new Promise(r=>setTimeout(r,1500)));
 /* (cards titled "Có người đến" go through the j68 event scheduler, at most one optional card per buổi: the visitor test uses another title) */
 /* step: name, expected files (all must appear), the code to run, wait ms, optional clicks */
 const step=async(name,want,fn,wait,after)=>{if(ONLY&&!ONLY.test(name))return;console.error(new Date().toISOString().slice(11,19),name);await clean();const n0=await p.evaluate(()=>KSFX.log.length);let e=null;
  try{await p.evaluate(fn)}catch(x){e=String(x.message||x).slice(0,160)}
  await p.evaluate(ms=>new Promise(r=>setTimeout(r,ms)),wait||1800);if(after){try{await after()}catch(x){e=(e||"")+" after:"+String(x.message||x).slice(0,120)}}
  const got=await p.evaluate(n0=>KSFX.log.slice(n0).map(x=>x.n),n0);const miss=want.filter(w=>!got.includes(w));const drop=miss.length?await p.evaluate(()=>KSFX.drop.slice(-8)):undefined;R.push({name,want,got,ok:!miss.length&&!e,miss,err:e,drop});try{fs.writeFileSync(OUT+'.partial',JSON.stringify({steps:R.length,pass:R.filter(x=>x.ok).length,fail:R.filter(x=>!x.ok),errs},null,1))}catch(x){}};
 const tapOv=async(sel)=>{const el=await p.$(sel);if(el){await el.click({force:true})}};
 await step("chạm nút",["sfx-tap"],`(()=>{const b=document.createElement("button");b.id="tt";b.textContent="x";document.body.appendChild(b);b.click();b.remove()})()`,400);
 await step("chuyển tab",["sfx-page"],`(()=>{const b=document.querySelector("#tabs button,#tabs [data-tab]");if(b)b.click();else throw "no tab"})()`,500);
 await step("nút bị khóa",["sfx-lock"],`(()=>{const b=document.createElement("button");b.disabled=true;b.textContent="khóa";b.style.cssText="position:fixed;left:10px;top:200px;z-index:99999";document.body.appendChild(b);b.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true}));b.remove()})()`,400);
 await step("mở thẻ / đóng thẻ",["sfx-open","sfx-close"],`(()=>{Q.push({t:"Thử",h:"<p>Một lá thư.</p>",btn:"Đã rõ"});showModal();setTimeout(()=>closeModal(),300)})()`,900);
 await step("mua đồ (+ hiện ra: kitGain)",["sfx-buy","sfx-item-pop"],`(()=>{S.bac=9999;const k=Object.keys(IT).find(k=>IT[k].pr>0&&IT[k].pr<200&&typeof ITIMG==="object"&&ITIMG[k]);if(!buy(S,k))throw "buy";render()})()`,1400);
 await step("bán đồ",["sfx-sell","sfx-coin"],`(()=>{const ix=S.inv.findIndex(e=>!e.h&&IT[e.k]&&IT[e.k].pr>=2);if(ix<0)throw "noinv";if(!sellItem(S,ix))throw "sell"})()`,900);
 await step("tặng đồ cho người",["sfx-item-fly"],`(()=>{S.inv.push({k:Object.keys(IT).find(k=>IT[k].pr>0)});const r=liveRivals(false).find(v=>v.alive);if(!giveTo(S,r,S.inv.length-1))throw "give"})()`,900);
 /* KIT §54.2 kitLose: the sound follows WHY the item left (merged main 15/11) */
 for(const [nm,o,f] of [["mất đồ",{why:"lose",title:"Mất đồ"},"sfx-item-lose"],["bị tịch thu",{why:"lose",title:"Bị tịch thu"},"sfx-confiscate"],["bị soát phòng",{why:"lose",title:"Bị soát phòng"},"sfx-search"],["bị cướp",{why:"lose",title:"Bị cướp"},"sfx-item-lose"],["dùng hết (fade)",{why:"fade"},"sfx-close"]])
  await step("kitLose: "+nm,[f],`(()=>{const k=Object.keys(IT).find(k=>IT[k].pr>0);kitLose({k},${JSON.stringify(o)})})()`,900);
 await step("bạc ra (kitCoins out)",["sfx-buy"],`kitCoins("out",5)`,700);
 await step("kitGain: món hiện ra rồi bay vào Tư trang",["sfx-item-pop","sfx-item-fly"],`(()=>{kitGain({k:Object.keys(IT).find(k=>IT[k].pr>0&&IT[k].pr<30)});setTimeout(()=>{const b=document.querySelector(".kfgain .krevok");if(b)b.click()},1500)})()`,2400);
 const reward=async(name,code,want)=>step(name,want,code,1500,async()=>{await tapOv('#kmrew .kmrew');await p.evaluate(()=>new Promise(r=>setTimeout(r,2400)));await tapOv('#kmrew .kmrew');await p.evaluate(()=>new Promise(r=>setTimeout(r,700)));await tapOv('#kmrew .kmtake');await p.evaluate(()=>new Promise(r=>setTimeout(r,400)))});
 await reward("thưởng đêm: mâm sơn son",`bestow(S,"night")`,["sfx-decree","sfx-chest-rattle","sfx-tray-open","sfx-item-pop","sfx-reward-take"]);
 await reward("thưởng lớn: rương gỗ",`(()=>{S.bac=50;bestow(S,"contest")})()`,["sfx-decree","sfx-chest-rattle","sfx-chest-open","sfx-reward-take"]);
 await reward("ngự tứ: rương rồng phượng",`bestow(S,"son")`,["sfx-decree","sfx-chest-rattle","sfx-chest-royal","sfx-reward-take"]);
 await reward("quà người tặng: hộp gấm",`(()=>{const r=liveRivals(false).find(v=>v.alive);S.inv.push({k:Object.keys(IT).find(k=>IT[k].pr>0),from:r.id});render()})()`,["sfx-notice","sfx-chest-rattle","sfx-gift-open","sfx-item-pop","sfx-reward-take"]);
 await reward("Thái hậu ban: mâm",`(()=>{S.inv.push({k:Object.keys(IT).find(k=>IT[k].pr>0),from:"th"});render()})()`,["sfx-tray-open","sfx-reward-take"]);
 await reward("nhặt được: bọc vải",`kitReward({kind:"pouch",title:"Bọc vải",from:"Nhặt được",items:[{n:"Khăn",img:"",tier:0}]})`,["sfx-notice","sfx-chest-rattle","sfx-tray-open","sfx-item-pop","sfx-reward-take"]);
 await reward("bổng lộc bị cắt xén",`kitReward({kind:"chest",title:"Bổng lộc tháng Giêng",from:"Nội vụ phủ phát · bị cắt xén",items:[{n:"Lụa",img:"",tier:1}]})`,["sfx-chest-open","sfx-item-lose","sfx-reward-take"]);
 await step("thăng phẩm: thánh chỉ",["sfx-edict-unroll","sfx-item-pop"],`(()=>{S.rank=Math.min(6,S.rank+1);render()})()`,2200);
 await step("giáng phẩm",["sfx-gloom"],`(()=>{S.rank=Math.max(0,S.rank-1);render()})()`,1500);
 await step("cấm túc",["sfx-door-shut"],`(()=>{S.confined=2;render()})()`,800);
 await step("vào lãnh cung",["sfx-gloom"],`(()=>{S.confined=0;S.out=true;render()})()`,2200);
 await step("ra lãnh cung (phục vị)",["sfx-decree"],`(()=>{S.out=false;feedback("decree");render()})()`,800);
 await step("quỳ phạt (thẻ)",["sfx-kneel"],`(()=>{Q.push({t:"Bị phạt",h:"<p>Ngươi bị phạt quỳ ngoài sân hai canh giờ.</p>",btn:"Đã rõ"});showModal()})()`,900);
 await step("đánh trượng (thẻ)",["sfx-cane"],`(()=>{Q.push({t:"Chịu phạt",h:"<p>Cung nữ của ngươi bị đánh hai mươi trượng.</p>",btn:"Đã rõ"});showModal()})()`,900);
 await step("yến tiệc (thẻ)",["sfx-banquet"],`(()=>{Q.push({t:"Gia yến",h:"<p>Hoàng thượng mở yến tiệc ở Ngự hoa viên.</p>",btn:"Đã rõ"});showModal()})()`,900);
 await step("người đến thăm (thẻ)",["sfx-visitor"],`(()=>{const v=liveRivals(false).find(v=>v.alive);Q.push({t:"Khách đến cung",who:pv(v),h:"<p>"+v.name+" sang thăm.</p>",btn:"Đã rõ"});showModal()})()`,900);
 await step("nguy hiểm tìm đến",["sfx-alarm"],`kitAlarm()`,600);
 await step("lật thẻ thị tẩm (thẻ của nàng)",["sfx-tablet-shuffle","sfx-tablet-flip"],`kitFlipTablet(S,{me:true})`,1600);
 await step("lật thẻ người khác (dòng báo)",["sfx-notice"],`kitFlipNote(liveRivals(false).find(v=>v.alive))`,800);
 await step("quẻ xăm: lắc ống, que rơi, chữ quẻ",["sfx-xam-shake","sfx-xam-drop"],`(()=>{const d=document.createElement("div");d.style.cssText="position:fixed;left:0;top:0;z-index:99999";document.body.appendChild(d);S.lot=S.lot||{lv:0,dom:"Cát"};kitXamPlay(d,S.lot);setTimeout(()=>d.remove(),2600)})()`,2400);
 await step("quẻ tốt",["sfx-lot-good"],`(()=>{const d=document.createElement("div");d.innerHTML=kitXamHTML({lv:0,dom:"Cát"});const x=d.firstElementChild;x.classList.add("km-skip");document.body.appendChild(x);ksfxXam(x,{lv:0,dom:"Cát"});setTimeout(()=>x.remove(),500)})()`,700);
 await step("quẻ xấu",["sfx-lot-bad"],`(()=>{const d=document.createElement("div");d.innerHTML=kitXamHTML({lv:4,dom:"Hung"});const x=d.firstElementChild;x.classList.add("km-skip");document.body.appendChild(x);ksfxXam(x,{lv:4,dom:"Hung"});setTimeout(()=>x.remove(),500)})()`,700);
 await step("thẻ kết quả THÀNH",["sfx-seal-stamp","sfx-win"],`(()=>{const bf=Object.fromEntries(RKEYS.map(([k])=>[k,S[k]||0]));S.sung=(S.sung||0)+5;resultShow("Dâng trà",bf,true)})()`,1300);
 await step("thẻ kết quả BẠI",["sfx-seal-stamp","sfx-fail"],`(()=>{const bf=Object.fromEntries(RKEYS.map(([k])=>[k,S[k]||0]));S.danh=Math.max(0,(S.danh||0)-5);resultShow("Bày mưu",bf,false)})()`,1300);
 await step("thẻ kết quả: bị phát giác",["sfx-seal-stamp","sfx-expose"],`(()=>{const bf=Object.fromEntries(RKEYS.map(([k])=>[k,S[k]||0]));S.sung=(S.sung||0)+1;resultShow("Bỏ độc bị phát giác",bf,false)})()`,1300);
 await step("thẻ kết quả: mưu hạ độc thành (không phát âm thắng sáng)",["sfx-seal-stamp","sfx-scheme"],`(()=>{const bf=Object.fromEntries(RKEYS.map(([k])=>[k,S[k]||0]));S.tamco=(S.tamco||0)+1;S.sung=(S.sung||0)+2;resultShow("Hạ độc",bf,true)})()`,1300);
 await step("khảo hạch tấn phong: trượt",["sfx-fail"],`exDone(S,{pass:false,total:20,P:{bar:60}})`,800);
 await step("khảo hạch tấn phong: đỗ",["sfx-rank-new"],`exDone(S,{pass:true,total:90,P:{bar:60}})`,1200);
 await step("điểm trang: tên khóa cũ sfx(\"learn-good\") nay kêu",["sfx-learn-good"],`sfx("learn-good")`,500);
 await step("trò nhỏ: lời chấm theo màu (Lem son = hụt)",["sfx-mg-miss"],`kg82Pop([],10,10,"Lem son",kg82Col("--red","#c23b22"))`,500);
 for(const [nm,h,f] of [["kim bạc hóa đen (có độc)","Kim bạc thử vào bát canh liền hóa đen: canh có độc!","sfx-expose"],["trả lại quà","{A} sai người trả lại quà ngươi tặng, nhắn 'không dám nhận'.","sfx-close"],["dâng hương (lễ)","Ngươi theo Thái hậu dâng hương ở Phật đường.","sfx-rite"],["bị tịch thu (thẻ)","Nội vụ phủ tịch thu đồ cấm trong phòng ngươi.","sfx-confiscate"]])
  await step("chữ trên thẻ: "+nm,[f],`(()=>{const bf=Object.fromEntries(RKEYS.map(([k])=>[k,S[k]||0]));S.sung=(S.sung||0)+1;resultShow(${JSON.stringify(h)},bf,false)})()`,1400);
 await step("qua buổi (chuông khánh)",["sfx-buoi-bell"],`(()=>{S.buoi=1;buoiShift()})()`,800);
 await step("sang buổi tối (mõ canh)",["sfx-night-watch"],`(()=>{S.buoi=B4L;buoiShift()})()`,800);
 await step("qua tuần (trống + lật lịch + quẻ tốt trong Sổ tuần)",["sfx-week-drum","sfx-page","sfx-lot-good"],`(()=>{S.buoi=0;S.lot={lv:1,dom:"Cát",i:0};dawn()})()`,3200);
 await step("có thai",["sfx-bloom"],`(()=>{S.preg={wk:1,by:"emp"};render()})()`,1200);
 await step("sảy thai",["sfx-wither"],`(()=>{S.preg=null;render()})()`,900);
 await step("sinh con",["sfx-birth","sfx-bloom"],`(()=>{feedback("birth");kitBloom({title:"Hạ sinh hoàng tử"})})()`,1200);
 await step("lâm bệnh",["sfx-sick"],`(()=>{S.ill={k:"phonghan"};render()})()`,900);
 await step("khỏi bệnh",["sfx-heal"],`(()=>{S.ill=null;S.sick=0;render()})()`,900);
 await step("trúng độc",["sfx-poison"],`feedback("poison")`,500);
 await step("bị phát giác, định tội",["sfx-expose"],`feedback("expose")`,500);
 await step("được bạc",["sfx-coin"],`apply({bac:20})`,600);
 await step("thời tiết đổi: mưa",["sfx-rain"],`(()=>{S.wx={n:"mưa rào thử",k:"rain",f:1};render()})()`,1500);
 await step("thời tiết đổi: gió",["sfx-wind"],`(()=>{S.wx={n:"gió heo may thử",k:"wind",f:0};render()})()`,1500);
 await step("thời tiết đổi: tuyết",["sfx-snow"],`(()=>{S.wx={n:"tuyết rơi thử",k:"snow",f:1};render()})()`,1500);
 await step("thời tiết đổi: giông",["sfx-thunder"],`(()=>{S.wx={n:"giông thử",k:"storm",f:1};render()})()`,1500);
 for(const [n,k,f] of [["ve kêu râm ran","sun","sfx-wx-cicada"],["đom đóm","dust","sfx-wx-crickets"],["trời quang","dust","sfx-wx-birds"],["hoa đào bay","petal","sfx-wind"]])
  await step("thời tiết đổi: "+n,[f],`(()=>{const b0=S.buoi;if("${n}"==="đom đóm")S.buoi=B4L;S.wx={n:"x",k:"rain",f:0};render();S.wx={n:"${n}",k:"${k}",f:0};render();S.buoi=b0})()`,1500);
 await step("thời tiết đổi: giông (chip)",["sfx-thunder"],`(()=>{S.wx={n:"giông tố",k:"storm",f:3};render()})()`,1500);
 await step("chạm chip thời tiết",["sfx-thunder"],`(()=>{const c=document.querySelector(".kmwx");if(!c)throw "nochip";c.click()})()`,500);
 await step("Tết: pháo",["sfx-firecracker"],`(()=>{S.month=12;S.tuan=2;render();S.month=1;S.tuan=0;render()})()`,2200);
 await step("Đoan ngọ: trống hội",["sfx-festival"],`(()=>{S.month=4;S.tuan=2;render();S.month=5;S.tuan=0;render()})()`,2200);
 await step("Thanh minh: lễ",["sfx-rite"],`(()=>{S.month=2;S.tuan=2;render();S.month=3;S.tuan=0;render()})()`,2200);
 await step("thắng bục vinh danh (hạng mới)",["sfx-podium","sfx-rank-new"],`(()=>{const r=liveRivals(false).filter(v=>v.alive);kitPodiumShow([{who:S,score:9,place:1},{who:r[0],score:6,place:2},{who:r[1],score:4,place:3}],{title:"Hội thi"})})()`,1900);
 await step("trò nhỏ: đàn (dây đúng / hụt)",["sfx-mg-pluck","sfx-mg-miss"],`(()=>{kg82Pluck(2,true);setTimeout(()=>kg82Pluck(0,false),150)})()`,500);
 await step("trò nhỏ: lời chấm (Tuyệt / Trượt)",["sfx-item-pop","sfx-mg-miss"],`(()=>{const L=[];kg82Pop(L,10,10,"Tuyệt!","#0a0");setTimeout(()=>{KSFX.last={};kg82Pop(L,10,10,"Trượt","#a00")},200)})()`,600);
 for(const [kind,f,ev] of [["co","sfx-mg-stone","pointerdown"],["theu","sfx-mg-needle","pointerdown"],["ve","sfx-mg-brush","pointerdown"],["dauho","sfx-mg-throw","pointerup"],["ban","sfx-mg-arrow","pointerdown"],["banh","sfx-mg-fire","pointerdown"]])
  await step("trò nhỏ: thao tác "+kind,[f],`(()=>{KSFX.mg="${kind}";const b=document.createElement("div");b.className="kgbox";const c=document.createElement("canvas");b.appendChild(c);document.body.appendChild(b);c.dispatchEvent(new PointerEvent("${ev}",{bubbles:true}));b.remove();KSFX.mg=""})()`,400);
 await step("trò nhỏ: thắng / thua (học)",["sfx-learn-good","sfx-learn-bad"],`(()=>{feedback("good");setTimeout(()=>feedback("bad"),200)})()`,600);
 for(const [pk,f] of [["meo","sfx-pet-cat"],["cho","sfx-pet-dog"],["hoami","sfx-pet-bird"],["sao","sfx-pet-myna"],["vet","sfx-pet-parrot"],["tho","sfx-pet-rabbit"],["cavang","sfx-pet-fish"],["uyenuong","sfx-pet-duck"],["rua","sfx-pet-turtle"],["ngua","sfx-pet-horse"],["khongtuoc","sfx-pet-peacock"],["bachac","sfx-pet-crane"],["caotuyet","sfx-pet-fox"],["tuyetdieu","sfx-pet-weasel"],["bachloc","sfx-pet-deer"]])
  await step("thú nuôi: "+pk,[f],`(()=>{const d=document.createElement("div");d.dataset.pet="${pk}";document.body.appendChild(d);d.click();d.remove()})()`,300);
 await step("hảo hữu vào phòng",["sfx-join"],`(()=>{if(typeof COOP==="undefined")throw "nocoop";const o0=COOP.other,s0=COOP.state.seats;COOP.other=()=>"B";COOP.state.seats={B:{online:false}};setTimeout(()=>{COOP.state.seats={B:{online:true}}},1600);setTimeout(()=>{COOP.other=o0;COOP.state.seats=s0},4200)})()`,4500);
 /* voices follow the card's MEANING (owner 11/15: a returned gift played a laugh) — j36 voKind on real card texts */
 const VC=[["Có người đến","{A} sai người trả lại quà ngươi tặng, nhắn 'không dám nhận'.",{},null],
  ["Có người đến","Lệ phi sầm sập kéo đến, buộc tội ngươi cài người vào cung nàng.",{},"f-angry"],
  ["Có người đến","Lệ quý nhân sang thăm, ngồi uống trà.",{},null],["Quà","Tô quý nhân tươi cười nhận quà ngươi tặng.",{},"f-laugh"],
  ["Quà","Tô quý nhân nhận lời, cảm tạ ngươi.",{},"f-softlaugh"],["Lời qua tiếng lại","Hiền phi mỉa mai: muội muội thật khéo.",{},"f-angry"],
  ["Lời qua tiếng lại","“Phấn son của muội hôm nay… đậm đà thật đấy.” Nàng ta che miệng cười khúc khích.",{},"f-angry"],["Hoàng thượng","Hoàng thượng cảm kích, ban thưởng · kèm: con sang Bắc Địch, không về thăm.",{w:["e"]},"m-sigh"],
  ["Hoàng thượng","Hoàng thượng không vui vì ngươi đến muộn.",{w:["e"]},"m-grunt"],["Hoàng thượng","Hoàng thượng hài lòng, ban thưởng.",{w:["e"]},"m-chuckle"],
  ["Thái hậu","Thái hậu lạnh lùng không nhận lễ.",{rk:"th"},"old-hmph"],["Bị phạt","Ngươi bị phạt quỳ ngoài sân.",{},"f-cry"],["Tin","Có tin đồn rằng ngươi thất sủng.",{},"gossip"]];
 const vr=await p.evaluate(VC=>VC.map(([t,h,w,want])=>{const got=voKind({t,h,who:w});return{h,tone:voTone(t+" "+h),want,got,ok:got===want}}),VC);
 R.push({name:"giọng người theo nghĩa thẻ (không cười khi trả quà)",ok:vr.every(x=>x.ok),detail:vr});
 /* the mixer rules */
 const cap=await p.evaluate(async()=>{KSFX.last={};KSFX.live=[];const n0=KSFX.log.length;["death","gloom","bloom","firecracker","banquet","podium"].forEach(m=>kitSfx(m));const busy=ksfxBusy();
  const played=KSFX.log.slice(n0).length;KSFX.live.forEach(v=>{try{v.a.pause()}catch(e){}});KSFX.live=[];KSFX.last={};
  const n1=KSFX.log.length;kitSfx("tap");kitSfx("open");kitSfx("close");kitSfx("death");const ui3=KSFX.log.slice(n1).map(x=>x.n);KSFX.live.forEach(v=>{try{v.a.pause()}catch(e){}});KSFX.live=[];KSFX.last={};
  const vols=["sfx-tap","sfx-death-bell"].map(n=>{const L=SFXL[n]||{};return +(OPT.sfx*(L.ui?.5:1)*(L.g||1)).toFixed(3)});
  OPT.snd=false;const off=kitSfx("death");OPT.snd=true;OPT.mute=true;const mute=kitSfx("death");OPT.mute=false;
  return{six:played,busy,uiThenEvent:ui3,volUiVsEvent:vols,offPlays:off,mutePlays:mute}});
 R.push({name:"tối đa 3 âm cùng lúc",ok:cap.six<=3&&cap.busy<=3,detail:cap});
 R.push({name:"âm UI nhỏ hơn âm sự kiện",ok:cap.volUiVsEvent[0]<cap.volUiVsEvent[1],detail:cap.volUiVsEvent});
 R.push({name:"công tắc Tiếng tắt / im tiếng: không kêu",ok:cap.offPlays===false&&cap.mutePlays===false});
 R.push({name:"âm sự kiện thứ 4 đẩy âm UI ra",ok:cap.uiThenEvent.includes("sfx-death-bell")});
 const files=await p.evaluate(()=>[...new Set(Object.values(SFXN))]);
 const dump=()=>{const res={size:SZ,steps:R.length,pass:R.filter(x=>x.ok).length,fail:R.filter(x=>!x.ok),pageErrors:errs,http4xx:bad,audioFetched:[...audio].sort(),tableFiles:files.length,results:R};
  fs.writeFileSync(OUT,JSON.stringify(res,null,1));console.log(JSON.stringify({size:SZ,steps:res.steps,pass:res.pass,fail:res.fail.map(x=>[x.name,x.miss,x.err,x.got,x.drop]),errs,bad:bad.slice(0,10)}))};
 /* death last (the Kiếp này panel is heavy: the log is read by a short poll, never waiting on the page) */
 console.error("chết");await clean();const nd=await p.evaluate(()=>KSFX.log.length);await p.evaluate(()=>{setTimeout(()=>over("Thử chết"),10)});
 let got=[];for(let i=0;i<20;i++){await p.waitForTimeout(500);try{got=await Promise.race([p.evaluate(n=>KSFX.log.slice(n).map(x=>x.n),nd),new Promise(r=>setTimeout(()=>r(null),3000))])||got}catch(e){}if(got.includes("sfx-death-bell"))break}
 R.push({name:"chết: chuông chùa",want:["sfx-death-bell"],got,ok:got.includes("sfx-death-bell")});
 dump();process.exit(0);
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
