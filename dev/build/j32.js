/* ================= DEATH IS PART OF THE GAME: readable deaths, the reincarnation loop, Sổ luân hồi ================= */
/* childbirth: dangerous per birth, lowered by her own physician, Y thuật and a loyal midwife; raised if a rival bribed the midwife */
function birthRisk(p){const me=p===S;const ag=p.age||20;let r=9+(p.suc<40?4:0)+Math.max(0,Math.min(ag,35)-30)*.5+Math.max(0,ag-35)*3;const why=[];
 if(p.doctor){r-=5}else why.push("không có thái y tâm phúc");if(p.arts&&p.arts.y>=yCareT())r-=3;else if(me)why.push(`Y thuật dưới bậc ${yCareT()}`);if(p.anthai)r-=2;if(me&&S.maid&&S.maid.loyal>=BAL.loy.trust)r-=2;
 if(p.midBribe){r+=10;why.push("bà đỡ bị mua chuộc")}if(p.suc<40)why.push(`Sức chỉ ${p.suc}`);if(ag>35)why.push(`đã ${ag} tuổi`);if(me)S.birthWhy=why;return cl(r,1.5,60)}
/* a hostile rival may bribe the midwife in the last month (same rule for everyone) */
(function(){const p0=pregMonth;pregMonth=function(){try{for(const p of consorts()){const pr=p===S?S.preg:p.preg;if(pr>=8&&!p.midChk){p.midChk=1;const f=others(p).filter(x=>x!==p&&bandVT(x,p)>=3&&(x===S?false:x.bac>=BAL.bacFee.midwife));const o=f.length?npcWhy("midBribe",{p,f},()=>roll(BAL.ag.why.midBribe.p)):null;/* npc-purpose G2: the rival whose grudge pushes her most bribes the midwife; the old 25 = the success */if(o){const x=o.who;ap(x,{bac:-BAL.bacFee.midwife});p.midBribe=key(x);persCount(x,"midwife")}}if(!pr){p.midChk=0;p.midBribe=null}}}catch(e){}return p0.apply(this,arguments)}})();
/* every death card names the cause and the chain: who, what, how it could have been prevented */
function deathChain(fate){const L=[];const f=String(fate||"");
 if(/Khó sinh/.test(f)){const w=S.birthWhy||[];L.push(`Mỗi lần sinh nở đều nguy đến tính mạng. Lần này: ${w.length?w.join(", "):"vận rủi"}.`);if(S.midBribe){const x=byKey(S.midBribe);L.push(`Bà đỡ đã nhận bạc của ${x?x.name:"kẻ giấu mặt"}.`)}L.push(`Phòng được: thái y tâm phúc, học Y thuật bậc ${yCareT()}, giữ Sức trên 40, cung nữ trung thành đỡ đẻ.`)}
 else if(/độc/.test(f)){const by=S.framedBy&&byKey(S.framedBy);L.push(by?`Kẻ ra tay: ${by.name}.`:"Kẻ ra tay chưa rõ.");L.push("Phòng được: người thử món, thuốc giải trong rương, thái y tâm phúc, cung nữ trung thành canh bếp.")}
 else if(/lãnh cung|Chết rét/.test(f)){L.push(`Vào lãnh cung vì: ${S.coldWhy||"bị phế"}.`);L.push("Phòng được: giữ chứng cứ gỡ tội, nhờ người đưa thư kêu oan, giữ Sức trước mùa đông.")}
 else if(/Ban chết/.test(f)){L.push("Mưu kế bại lộ trước Hoàng thượng.");L.push("Phòng được: sai người tin cẩn, bớt dấu vết, đợi thêm chứng cứ.")}
 else if(/Bệnh|Sức 0/.test(f)){L.push("Sức cạn dần mà không chữa.");L.push("Phòng được: mời thái y sớm, nghỉ ngơi, bớt việc nặng.")}
 else if(/tiên đế băng|Tuẫn táng|Thái phi/.test(f)){L.push("Hoàng thượng băng hà; số phận theo con trai và ngôi vị lúc ấy.")}
 /* D-SELX-FAIR (law 7, whole family of trials that end the life): the ban hoa ending names her place, score and the cut line (jselx selxCut, ONE record) */
 else if(/ban hoa/i.test(f)&&S.selx2&&S.selx2.cut&&typeof selxCutRow==="function"){L.push(`Điện tuyển: ${selxCutRow(S.selx2.cut)}`);L.push("Phòng được: dò hỏi các vị chí tôn trọng chữ gì, tập kỹ ở Tiền sảnh, dâng môn sở trường và chơi hết sức.")}
 const foes=liveRivals(true).filter(v=>oan(v,S)>=netTh(v,"thu")||bandVT(v,S)>=2).map(v=>v.name);if(foes.length)L.push(`Kẻ thù còn sống: ${foes.slice(0,4).join(", ")}.`);return L}
function lifeLog(){const p=store.get("cung-luanhoi")||[];return p}
/* ONE CORE «best rank held» (D-ENDRANK, law 4 + law 11): the highest standing she ACTUALLY held this life — never the origin's ceiling (OD:L1250: the
   origin rank is only the HIGHEST she can get, by passing the selection) nor an entry default. Every place that prints a life's best rank reads lifeTopRank:
   the end card «Phẩm cao nhất», Sổ luân hồi (cung-luanhoi / cung-kiep), the Bảng xếp hạng life (jrank), the abandoned-life line (jkiep), the HUD / portrait word
   of a tú nữ (jselxsc). rankStage(s): "home" = still at home (kc / kc2 prelude, never entered) · "tunu" = a tú nữ whose selection is not settled (the 3 days,
   the one-card selection before its answer, ban hoa = sent home) · "srv" = a cung nữ who never rose · "rank" = she holds a consort rank. */
function rankStage(s){s=s||(typeof S!=="undefined"?S:null);if(!s)return"";if(s.kc&&!s.kc.inPal)return"home";if(s.srv&&!s.srv.risen)return"srv";
 const X=s.selx,Z=s.selx2;if(X&&Z&&!(s.origin&&s.origin.k==="cnv")&&!Z.done&&(Z.ban||Z.days||!(X.kept===true||(X.done&&X.tier!=null))))return"tunu";return"rank"}
function rankHeld(s){return rankStage(s)==="rank"}
/* {r: RANKS index held (-1 = none), n: the word}; a maid shows the highest maid post she held (S.srv.rk / the board trail S.rk.sr, SRK.maid) */
function lifeTopRank(s){s=s||S;const st=rankStage(s);if(st==="home"||st==="tunu"){const W=(typeof BAL!=="undefined"&&BAL.rank&&BAL.rank.preN)||{home:"Chưa vào cung",tunu:"Tú nữ"};return{r:-1,n:W[st],st}}/* words: BAL.rank.preN (rank/worker/src/score.js, the board reads the same) */
 if(st==="srv"){const v=s.srv;const b=Math.max(v.rk|0,s.rk&&s.rk.sr!=null?s.rk.sr|0:-1);const n=v.mama?"Ma ma":b>(v.rk|0)&&SRK.maid[b]?SRK.maid[b]:v.lau>0?"Cung nữ Tân Giả khố":SRK.maid[v.rk|0]||"Cung nữ";return{r:-1,n,st}}
 const r=Math.max(0,Math.min(7,Math.max(s.rank|0,s.maxRank|0,s.queen?7:0)));return{r,n:RANKS[r].n,st}}
try{window.rankStage=rankStage;window.rankHeld=rankHeld;window.lifeTopRank=lifeTopRank}catch(e){}
function lifeSave(fate){const p=lifeLog();const kids=S.kids.filter(k=>k.alive).length;p.unshift({n:S.name,o:S.origin.n,r:lifeTopRank(S).n,age:S.age,y:S.year,kids,fc:S.fc||"",f:fate,nm:S.kend||"",foes:liveRivals(true).filter(v=>oan(v,S)>=netTh(v,"thu")).map(v=>v.name).slice(0,3)});store.set("cung-luanhoi",p.slice(0,40))}
/* over(h,t,fate[,alive]): the end card. "Mệnh tận" only when she died; a living ending (thoái vị, xuất cung, xuất gia…) says "Kết cục".
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
function over(h,t,fate,alive){if(S.dead)return"";const live=overAlive(fate,alive);S.dead=true;S.fate=fate;
 /* the poetic name of this ending (jend KIT_END.names, one table): the card title, the ink caption, the Sổ luân hồi line */
 const nm=typeof endName==="function"?endName(h,t,fate,live):String(h||"");S.kend=nm;const NC=(window.KIT_END&&KIT_END.names&&KIT_END.names.close)||null;record(fate);lifeSave(fate);const ms=mySons().length,md=myDaus().length;const ch=deathChain(fate);
 /* kit sections + kit rows (KIT 9: h4.kpst + kitRows), no boxed panels (owner 15/11). Chain lines "Nhãn: lời" become labelled rows. */
 const chR=ch.map(x=>{const m=String(x).match(/^([^:.]{2,26}):\s*(.+)$/);return m?[m[1],m[2],"t"]:["Nguyên do",x,"t"]});
 const TR=lifeTopRank(S);/* ONE CORE: the rank she really held */
 /* LEAVE-THE-PALACE = ENDING (owner OD 24/11 ~06:05Z, jleave.js): a life that leaves the palace gets its «Về sau» — his nết × her state × how she left */
 let ep=null;try{ep=typeof lpvEpiFor==="function"?lpvEpiFor(h,t,fate,live):null}catch(e){console.error("lv",e)}
 /* a life that ended at home before she ever entered (jkc tiểu thư road): no «Sống trong cung / Phẩm cao nhất / Con cái» rows — she had none of them */
 const pre=!!(S.kc&&!S.kc.inPal);
 const epH=ep?`<div class="kpsec kend-after"><p><b>Về sau · ${ep.ti}.</b> ${ep.txt}</p></div>`:"";/* rows go into «Kiếp này» below (iPad 1180x820: the card must fit with no clip) */
 Q=[{t:nm||"Kiếp này",kend:1,endH:h,cls:"end",art:endArt(h,t,fate,live),who:pMe(),h:`${String(h||"").replace(/<[^>]+>/g,"").trim()!==nm?`<h3>${h}</h3>`:""}<p>${t}</p>${epH}${chR.length?`<div class="kpsec kend-why">${kitRows(chR)}</div>`:""}
  <div class="kpsec kend-life"><h4 class="kpst">Một kiếp nhìn lại</h4>${kitRows((pre?[["Thân phận",`${S.name} · ${S.origin.n}`,"t"]]:[["Thân phận",`${S.name} · ${S.origin.n}`,"t"],["Năm tháng",`${S.year} năm · ${S.age} tuổi`,"t"],["Phẩm cao nhất",TR.n,"t"],["Con cái",TR.st!=="rank"&&!ms&&!md?"không":`${ms} hoàng tử, ${md} công chúa`,"t"]]).concat([[live?"Kết cục":"Mệnh tận",fate,"t"]]).concat(ep?lpvRows(ep):[]))}</div>
  <p class="past kend-close">${NC?`${NC[live?"live":"dead"]} ${NC.tail}`:""}</p>`,btn:"Chuyển kiếp",onClose:start}];
 showModal();render();return""}
/* the highest rank this life reached — only while she HOLDS a rank (not the origin ceiling at home / during the selection, not a maid's 0) */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&rankHeld(S))S.maxRank=Math.max(S.maxRank||0,S.rank)}catch(e){}return r}})();
/* Sổ luân hồi on the title screen and in the log */
function pastHTML(){const p=lifeLog();if(!p.length){const o=store.get("cung-kiep")||[];return o.length?`<h3>Sổ luân hồi</h3><div class="past">`+o.map((k,i)=>`Kiếp ${o.length-i}: ${k.n}, ${k.o}, ${k.r}, ${k.age} tuổi. ${k.f}.`).join("<br>")+`</div>`:""}
 return `<h3>Sổ luân hồi</h3>${kitRows(p.slice(0,12).map((k,i)=>[`<span class="md xs" style="--c:#b08a5a">${k.fc?`<img src="${fsrc(k.fc,"")}" alt="" onerror="this.remove()">`:""}</span>${typeof kpLife==="function"?kpLife(p.length-i):`Kiếp ${p.length-i}`}: ${k.n}`,`${k.nm?`«${k.nm}» · `:""}${k.o} · ${k.r} · ${k.y} năm · ${k.kids} con · ${k.f}`,"n"]))}`}
