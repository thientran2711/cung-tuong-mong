/* ================= DEATH IS PART OF THE GAME: readable deaths, the reincarnation loop, Sổ luân hồi ================= */
/* childbirth: dangerous per birth, lowered by her own physician, Y thuật and a loyal midwife; raised if a rival bribed the midwife */
function birthRisk(p){const me=p===S;const ag=p.age||20;let r=9+(p.suc<40?4:0)+Math.max(0,Math.min(ag,35)-30)*.5+Math.max(0,ag-35)*3;const why=[];
 if(p.doctor){r-=5}else why.push("không có thái y tâm phúc");if(p.arts&&p.arts.y>=2)r-=3;else if(me)why.push("Y thuật dưới bậc 2");if(p.anthai)r-=2;if(me&&S.maid&&S.maid.loyal>=70)r-=2;
 if(p.midBribe){r+=10;why.push("bà đỡ bị mua chuộc")}if(p.suc<40)why.push(`Sức chỉ ${p.suc}`);if(ag>35)why.push(`đã ${ag} tuổi`);if(me)S.birthWhy=why;return cl(r,1.5,60)}
/* a hostile rival may bribe the midwife in the last month (same rule for everyone) */
(function(){const p0=pregMonth;pregMonth=function(){try{for(const p of consorts()){const pr=p===S?S.preg:p.preg;if(pr>=8&&!p.midChk){p.midChk=1;const f=others(p).filter(x=>x!==p&&bandOf(danger(x,p))>=3&&(x===S?false:x.bac>=40));if(f.length&&roll(25)){const x=pick(f);ap(x,{bac:-40});p.midBribe=key(x);persCount(x,"midwife")}}if(!pr){p.midChk=0;p.midBribe=null}}}catch(e){}return p0.apply(this,arguments)}})();
/* every death card names the cause and the chain: who, what, how it could have been prevented */
function deathChain(fate){const L=[];const f=String(fate||"");
 if(/Khó sinh/.test(f)){const w=S.birthWhy||[];L.push(`Mỗi lần sinh nở đều nguy đến tính mạng. Lần này: ${w.length?w.join(", "):"vận rủi"}.`);if(S.midBribe){const x=byKey(S.midBribe);L.push(`Bà đỡ đã nhận bạc của ${x?x.name:"kẻ giấu mặt"}.`)}L.push("Phòng được: thái y tâm phúc, học Y thuật bậc 2, giữ Sức trên 40, cung nữ trung thành đỡ đẻ.")}
 else if(/độc/.test(f)){const by=S.framedBy&&byKey(S.framedBy);L.push(by?`Kẻ ra tay: ${by.name}.`:"Kẻ ra tay chưa rõ.");L.push("Phòng được: người thử món, thuốc giải trong rương, thái y tâm phúc, cung nữ trung thành canh bếp.")}
 else if(/lãnh cung|Chết rét/.test(f)){L.push(`Vào lãnh cung vì: ${S.coldWhy||"bị phế"}.`);L.push("Phòng được: giữ chứng cứ gỡ tội, nhờ người đưa thư kêu oan, giữ Sức trước mùa đông.")}
 else if(/Ban chết/.test(f)){L.push("Mưu kế bại lộ trước Hoàng thượng.");L.push("Phòng được: sai người tin cẩn, bớt dấu vết, đợi thêm chứng cứ.")}
 else if(/Bệnh|Sức 0/.test(f)){L.push("Sức cạn dần mà không chữa.");L.push("Phòng được: mời thái y sớm, nghỉ ngơi, bớt việc nặng.")}
 else if(/tiên đế băng|Tuẫn táng|Thái phi/.test(f)){L.push("Hoàng thượng băng hà; số phận theo con trai và ngôi vị lúc ấy.")}
 const foes=liveRivals(true).filter(v=>oan(v,S)>=40||bandOf(danger(v,S))>=2).map(v=>v.name);if(foes.length)L.push(`Kẻ thù còn sống: ${foes.slice(0,4).join(", ")}.`);return L}
function lifeLog(){const p=store.get("cung-luanhoi")||[];return p}
function lifeSave(fate){const p=lifeLog();const kids=S.kids.filter(k=>k.alive).length;const maxR=Math.max(S.rank,S.maxRank||0);p.unshift({n:S.name,o:S.origin.n,r:maxR>=7?"Hoàng hậu":RANKS[maxR].n,age:S.age,y:S.year,kids,fc:S.fc||"",f:fate,foes:liveRivals(true).filter(v=>oan(v,S)>=40).map(v=>v.name).slice(0,3)});store.set("cung-luanhoi",p.slice(0,40))}
/* over(h,t,fate[,alive]): the end card. "Chết vì" only when she died; a living ending (thoái vị, xuất cung, xuất gia…) says "Kết cục".
   Callers may pass alive=true/false; otherwise it is read from the fate wording (kit owner #2, group fix for every ending). */
function overAlive(fate,a){if(a===true||a===false)return a;return /thoái vị|xuất cung|ra khỏi cung|xuất gia|về quê|ẩn cư|an hưởng|còn sống|trốn khỏi cung|tự do|nhường ngôi/i.test(String(fate||""))&&!/chết|qua đời|tự vẫn|băng hà|ban chết|xử tử/i.test(String(fate||""))}
/* owner 16/11 (Q12, D32): every ending card shows the fitting ALREADY-APPROVED event picture (no new art); ev-quoc-tang ONLY when the Emperor's death is what ends the life.
   First match wins; h = card title, fate = the record line. Crowning endings (Hoàng thái hậu / Mẫu hậu) = the edict, not the mourning. */
const END_ART=[[/^(Hoàng thái hậu|Mẫu hậu|Mẫu nghi)/,"tan-phong"],[/^Thái phi|tuẫn táng|Tiên đế băng|Hoàng thượng băng hà|Quốc tang|băng hà/,"quoc-tang"],
 [/độc/,"dau-doc"],[/hỏa hoạn|cháy|lửa/,"hoa-hoan"],[/ban chết|tư thông|đánh đòn|xử trảm|thắt cổ|bạch lăng/,"hinh-phat"],
 [/^Phế|đuổi|lãnh cung|Lãnh cung|điên dại|Tuổi xuân/,"lanh-cung"],[/^(Xuất giá|Được ban hôn|Thành thân|Vào vương phủ|Được Vương gia)/,"hoa-than"],[/xuất gia|Xuất gia/,"te-le"],
 [/^Cao chạy/,"nhap-cung"],[/^(Xuất cung|Ma ma|Một đời an nhiên)/,"le-xuan"]];
function endArt(h,t,fate,live){const s=String(h||""),f=String(fate||""),x=String(t||"");let k="";
 for(const [re,id] of END_ART){if(re.test(s)||re.test(f)||(id==="quoc-tang"&&re.test(x))){k=id;break}}
 if(!k)k=live?"le-xuan":"tang-le";return `img/ev-${k}.webp`}
window.endArt=endArt;
function over(h,t,fate,alive){if(S.dead)return"";const live=overAlive(fate,alive);S.dead=true;S.fate=fate;record(fate);lifeSave(fate);const ms=mySons().length,md=myDaus().length;const ch=deathChain(fate);
 Q=[{t:"Kiếp này",cls:"end",art:endArt(h,t,fate,live),who:pMe(),h:`<h3>${h}</h3><p>${t}</p>${ch.length?`<div class="pcb rows">${ch.map(x=>`<div class="pcrow"><span>${x}</span></div>`).join("")}</div>`:""}
  ${kitRows([["Thân phận",`${S.name} · ${S.origin.n}`,"t"],["Sống trong cung",`${S.year} năm · ${S.age} tuổi`,"t"],["Phẩm cao nhất",Math.max(S.rank,S.maxRank||0)>=7?"Hoàng hậu":RANKS[Math.max(S.rank,S.maxRank||0)].n,"t"],["Con cái",`${ms} hoàng tử, ${md} công chúa`,"t"],[live?"Kết cục":"Chết vì",fate,"t"]])}
  <p class="past">${live?"Kiếp này khép lại.":"Chết là hết."} Kiếp sau bắt đầu lại từ đầu, chỉ còn tên trong Sổ luân hồi.</p>`,btn:"Chuyển kiếp",onClose:start}];
 showModal();render();return""}
/* the highest rank this life reached */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S)S.maxRank=Math.max(S.maxRank||0,S.rank)}catch(e){}return r}})();
/* Sổ luân hồi on the title screen and in the log */
function pastHTML(){const p=lifeLog();if(!p.length){const o=store.get("cung-kiep")||[];return o.length?`<h3>Sổ luân hồi</h3><div class="past">`+o.map((k,i)=>`Kiếp ${o.length-i}: ${k.n}, ${k.o}, ${k.r}, ${k.age} tuổi. ${k.f}.`).join("<br>")+`</div>`:""}
 return `<h3>Sổ luân hồi</h3>${kitRows(p.slice(0,12).map((k,i)=>[`<span class="md xs" style="--c:#b08a5a">${k.fc?`<img src="${fsrc(k.fc,"")}" alt="" onerror="this.remove()">`:""}</span>Kiếp ${p.length-i}: ${k.n}`,`${k.o} · ${k.r} · ${k.y} năm · ${k.kids} con · ${k.f}`,"n"]))}`}
