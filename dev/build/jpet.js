/* ================= jpet: THÚ NUÔI có PHẨM BẬC + XA XỈ (sếp 15/11 07:35Z, review/pets) =================
   22 con, 5 phẩm như đồ (KIT_GRADE): Thường · Tinh phẩm · Trân phẩm · Tuyệt phẩm · Ngự tứ (= thần thú). Mỗi con: Xa xỉ N (cộng vào luxOf như đồ
   đang mang: con theo hầu tính đủ, con ở tẩm cung tính nửa; mức cho phép ẩn — người chơi biết qua hậu quả), +1 một Tư chất khi theo
   hầu, MỘT công dụng thật theo luật có sẵn, và mặt trái thật (bạc nuôi mỗi tháng, khắc chăm, dị ứng, ồn, cắn, cần ao, lời đồn…).
   Nguồn thật: nhờ thái giám mua (chỉ Thường/Quý/vài con Hiếm, cơ may theo Tai mắt), Hoàng thượng ban (theo Sủng), Thái hậu ban,
   Hoàng hậu ban, nam nhân tặng, Thu săn (tháng chín), cống phẩm nước ngoài (tháng giêng). Thần thú chỉ qua nguồn hiếm.
   Thần thú ĐỠ MỘT MẠNG: một lần khi chủ gặp nạn chết người (Sức cạn vì bị hại/bệnh, bệnh nguy kịch, khó sinh) — con thú chịu thay
   rồi mất; thẻ kết quả trang trọng. NPC cùng luật (nhận thú, nuôi, mất, xa xỉ, đỡ mạng, đánh hơi, canh cung, bị hại thú).
   Lưu: p.pets=[{t,from,src,care,at,sn}] (sổ cũ meo/cho/hoami/tho vẫn hợp lệ; con đã bỏ → PET_OLD, cùng phẩm), p.petOn (chỉ số con theo hầu), p.petB (khóa +1). ============ */
/* owner 10:10Z: the SAME grade scale as items/equipment (KIT_GRADE names, colours, islot frames) */
const PET_TIER=["Thường","Tinh phẩm","Trân phẩm","Tuyệt phẩm","Ngự tứ"],PET_LUX=[10,18,30,46,66];
const PET_SN={sac:"Sắc",tai:"Tài",tamco:"Tâm cơ",duc:"Đức",danh:"Danh"};
/* tr bậc · st +1 khi theo hầu · pr giá mua qua thái giám (0 = không mua được) · up bạc nuôi/tháng · dc khí lực giảm mỗi tuần
   công dụng: sniff (đánh hơi đồ ăn lạ), guard (canh cung), beast (đuổi thú dữ), sungN (Sủng khi Hoàng thượng ngự), anN (Ân tình),
   omen [cơ may/tháng, Danh] (điềm lành), th (Thái hậu +1/tháng), suc (Sức +N/tuần), spy (nghe lén/tháng), soft (bớt oán/tháng), sacX, rescue
   mặt trái: al (dị ứng với người hen), noise, bite, pond (cần ao: dưới Tần khó nuôi), fox (lời đồn hồ ly), leak (nhại lời), weak (yếu rét), easy (dễ bị hại) */
/* sếp 15/11: Thường + Tinh phẩm = thú thật; Trân phẩm trở lên = linh vật/thần thú nhỏ (không sư tử, hổ, cáo thường) */
const PET={
 meomuop:{n:"Mèo mướp",tr:0,st:"sac",pr:40,up:1,dc:8,sniff:35,al:1,use:"đánh hơi đồ ăn lạ, đôi khi báo trước được một lần bị hại qua đồ ăn",bad:"rụng lông: chủ có bệnh hen thì Sức -2 mỗi tuần",d:"mèo mướp béo tròn, đeo dây đỏ chuông vàng"},
 cho:{n:"Chó nhỏ lông xù",tr:0,st:"tamco",pr:40,up:1,dc:8,guard:10,noise:1,use:"canh cửa cung: kẻ lạ khó lẻn vào cài đồ, thả thú dữ, phóng hỏa",bad:"sủa đêm: người ở chung cung dễ oán",d:"chó nhỏ lông trắng xù, đeo nơ đỏ chuông vàng"},
 hoami:{n:"Chim họa mi",tr:0,st:"tai",pr:40,up:1,dc:10,sungN:1,easy:1,use:"hót khi Hoàng thượng ngự: {sungN} mỗi đêm thị tẩm",bad:"dễ sổ lồng: kẻ xấu dễ thả đi",d:"họa mi trong lồng tre, hót trong trẻo"},
 tho:{n:"Thỏ ngọc",tr:0,st:"duc",pr:30,up:1,dc:12,soft:2,weak:1,get use(){return `ai thấy cũng mềm lòng: mỗi tháng người oán nàng nhất bớt oán ${balAb(this.soft)}`},bad:"yếu: mùa đông dễ ốm, phải chăm luôn",d:"thỏ trắng tai hồng, hiền lành"},
 cavang:{n:"Cá vàng chậu sứ",tr:0,st:"tai",pr:30,up:0,dc:4,suc:1,easy:1,use:"ngắm cá khuây khỏa: Sức +1 mỗi tuần",bad:"kẻ xấu dễ bỏ thuốc vào chậu",d:"đôi cá vàng trong chậu sứ lam"},
 meo:{n:"Mèo tuyết",tr:1,st:"sac",pr:120,up:3,dc:9,sniff:55,al:1,use:"đánh hơi đồ ăn lạ: khá tinh, báo trước một lần bị hại qua đồ ăn",bad:"rụng lông: chủ có bệnh hen thì Sức -2 mỗi tuần",d:"mèo lông trắng dài, mắt xanh"},
 sao:{n:"Sáo nói",tr:1,st:"tamco",pr:110,up:2,dc:9,guard:6,leak:8,use:"kêu khi có kẻ lạ: canh cung nhẹ",bad:"nhại lời chủ trước khách: đôi khi Danh -1",d:"sáo đen mỏ vàng, học tiếng người"},
 uyenuong:{n:"Đôi uyên ương",tr:1,st:"sac",pr:100,up:2,dc:9,anN:2,pond:1,use:"điềm phu thê: Ân tình +2 mỗi đêm thị tẩm",bad:"cần ao: chưa có cung riêng (dưới Tần) thì khó nuôi",d:"đôi uyên ương nép bên nhau"},
 cachep:{n:"Cá chép gấm",tr:1,st:"danh",pr:140,up:2,dc:7,omen:[12,1],pond:1,use:"điềm cá vượt vũ môn: mỗi tháng có khi Danh +1",bad:"cần ao: chưa có cung riêng (dưới Tần) thì khó nuôi",d:"đôi cá chép gấm trong bồn men ngọc"},
 vet:{n:"Vẹt ngũ sắc",tr:1,st:"tamco",pr:160,up:3,dc:9,spy:15,leak:10,/* previews: petMonthOf */get use(){return `nhại lời khách ghé cung: có khi nắm được ${balAb(BAL.eff.jpet.evPetMonthOf)} chứng cứ của kẻ thù`},bad:"cũng nhại lời nàng: nàng từng bày mưu thì kẻ thù có khi nắm chứng cứ",d:"vẹt đỏ lục lam trên giá mạ vàng"},
 sutu:{n:"Chó sư tử lông vàng",tr:1,st:"danh",pr:0,up:3,dc:8,guard:12,noise:1,bite:1,use:"canh cung chặt: kẻ lạ khó lẻn vào",bad:`sủa đêm (người ở chung cung dễ oán) · hay cắn kẻ hầu (Thiện cảm -${balAb(BAL.eff.jpet.loyalPetMonthOf)})`/* previews: petMonthOf */,d:"chó sư tử nhỏ lông vàng óng, vòng tua đỏ"},
 hac:{n:"Hạc đỉnh hồng",tr:2,st:"duc",pr:0,up:2,dc:6,th:1,use:"điềm thọ, Thái hậu ưa: Thái hậu quý nàng +1 mỗi tháng",bad:"Thái hậu ban: để chết hay bị hại thì Thái hậu quý nàng -8",d:"hạc trắng đỉnh đầu đỏ, dáng thanh nhã"},
 linhmieu:{n:"Linh miêu mắt ngọc",tr:2,st:"sac",pr:260,up:5,dc:9,sniff:75,al:1,use:"đánh hơi đồ ăn lạ rất tinh: báo trước một lần bị hại qua đồ ăn",bad:"rụng lông (hen: Sức -2/tuần) · quý giá nên dễ bị ghen",d:"mèo linh lông bạc, mắt xanh ngọc, đuôi tỏa ánh nhẹ"},
 camke:{n:"Cẩm kê",tr:2,st:"danh",pr:0,up:4,dc:8,guard:15,beast:20,noise:1,use:"gáy vang khi có kẻ lạ: canh cung chặt, thú dữ khó lọt vào",bad:"gáy sớm: người ở chung cung dễ oán",d:"gà gấm lông ngũ sắc, đuôi dài như phượng"},
 lyngu:{n:"Long lý vảy vàng",tr:2,st:"tai",pr:0,up:4,dc:7,suc:2,omen:[10,1],easy:1,use:"cá chép sắp hóa rồng: ngắm khuây khỏa Sức +2 mỗi tuần, có khi điềm Danh +1",bad:"kẻ xấu dễ bỏ thuốc vào bồn",d:"cá chép vảy vàng, râu rồng, vây như mây, trong bồn men ngọc"},
 cuuvi:{n:"Cửu vĩ hồ",tr:3,st:"sac",pr:0,up:5,dc:9,sacX:1,fox:1,use:"đẹp lạ thường: theo hầu được Sắc +2 (con khác chỉ +1)",bad:"lời đồn hồ ly tinh: Thái hậu không vừa ý, có khi Danh -1",d:"hồ ly trắng nhỏ, chín đuôi bồng như mây"},
 thienma:{n:"Thiên mã",tr:3,st:"danh",pr:0,up:8,dc:8,guard:18,beast:25,omen:[10,1],use:"ngựa trời giữ cung: kẻ lạ, thú dữ khó lọt vào; có khi Danh +1",bad:"ăn cỏ linh chi quý: Bạc -8 mỗi tháng",d:"ngựa trời non trắng tuyết, bờm như mây, vó tỏa mây sáng"},
 ngoctho:{n:"Ngọc thố",tr:3,st:"duc",pr:0,up:5,dc:10,sniff:88,soft:2,weak:1,get use(){return `thỏ cung trăng biết mùi thuốc: đánh hơi độc cực tinh; ai thấy cũng mềm lòng (người oán nàng nhất bớt oán ${balAb(this.soft)} mỗi tháng)`},bad:"yếu rét: mùa đông dễ ốm",d:"thỏ ngọc trắng muốt, tỏa ánh trăng dịu"},
 phuong:{n:"Phượng hoàng non",tr:3,st:"sac",pr:0,up:8,dc:9,sungN:2,noise:1,use:"múa khi Hoàng thượng ngự: {sungN} mỗi đêm thị tẩm",bad:"kêu vang: người ở chung cung dễ oán · Bạc -8 mỗi tháng",d:"phượng non lông đỏ vàng, đuôi dài rực mà dịu"},
 bachloc:{n:"Bạch lộc",tr:4,st:"duc",pr:0,up:0,dc:6,omen:[15,2],rescue:1,use:"thần thú: khi đã thành Linh thú thì ĐỠ MỘT MẠNG lúc nàng gặp nạn chết người; điềm lành Danh",bad:"ai cũng thèm muốn: rất dễ bị ghen, bị nhắm hại",d:"hươu thần trắng như ngọc, tỏa ánh bạc"},
 kylan:{n:"Kỳ lân",tr:4,st:"duc",pr:0,up:0,dc:6,th:1,rescue:1,use:"thần thú: khi đã thành Linh thú thì ĐỠ MỘT MẠNG lúc nàng gặp nạn chết người; điềm nhân đức, Thái hậu quý nàng +1/tháng",bad:"Thái hậu ban: để mất thì Thái hậu quý nàng -8 · dễ bị ghen",d:"kỳ lân vảy ngọc lục, bờm vàng như mây"},
 thanhlong:{n:"Thanh long con",tr:4,st:"danh",pr:0,up:0,dc:7,sungN:2,rescue:1,use:"thần thú: khi đã thành Linh thú thì ĐỠ MỘT MẠNG lúc nàng gặp nạn chết người; bay lượn khi Hoàng thượng ngự ({sungN})",bad:"rồng là tượng thiên tử: rất dễ bị ghen, bị nhắm hại",d:"rồng xanh nhỏ vảy lam ngọc, hào quang dịu"}};
/* sổ cũ: con đã bỏ khỏi danh sách → con gần nhất CÙNG PHẨM (vet, sutu giữ khóa, nay là Tinh phẩm) */
const PET_OLD={batu:"linhmieu",tekhuyen:"camke",rua:"hac",bachquy:"hac",linhquy:"kylan",ngua:"lyngu",khongtuoc:"phuong",bachac:"thienma",caotuyet:"cuuvi",tuyetdieu:"ngoctho",bachkt:"thanhlong"};
function petK(k){return PET[k]?k:PET_OLD[k]||k}
const PETK=Object.keys(PET);
/* r2 sg-card: «{sungN}» in a pet's use text = its sungN as applied each night (nightFx → apply → sg), read when shown (was typed twice) */
PETK.forEach(k=>{const t=PET[k],u=t&&t.use;if(typeof u==="string"&&u.includes("{sungN}"))Object.defineProperty(t,"use",{get:()=>u.replace("{sungN}",typeof S==="object"&&S&&S.emp?sgStat(t.sungN):statTxt("sung",t.sungN)),enumerable:true,configurable:true})});
/* sổ cũ: con đã bỏ → PET_OLD (cùng phẩm); khóa lạ hẳn → coi như mèo mướp */
function petT(P){return PET[petK(P&&P.t)]||PET.meomuop}
function petLux(k){const T=PET[petK(k)]||PET.meomuop;return PET_LUX[T.tr]+Math.round((T.pr||T.up*20)/40)}
function petSrc(k,big,sfx){k=petK(k);sfx=sfx||"";return big?`img/pet512/pet-${k}${sfx}.webp`:`img/pet-${k}${sfx}.webp`}
/* the picture of HER pet at its growth stage (jpetcare: -non / -tn / grown / -lt, all on the CDN); a newly got pet is Non */
function petPSrc(P,big){try{if(P&&typeof petcStageSrc==="function"){if(typeof petcInit==="function")petcInit(P);return petcStageSrc(P,big).src}}catch(e){}return petSrc(P&&P.t,big)}
function petMax(p){return [1,1,2,2,3,3,4,4][Math.max(0,Math.min(7,rkOf(p)|0))]}
function tsbPets(p){const L=(p&&p.pets)||[];for(const P of L)if(P&&!PET[P.t]&&PET_OLD[P.t])P.t=PET_OLD[P.t];return L}
function tsbPetOn(p){const L=tsbPets(p);const i=p?p.petOn:-1;return i!=null&&i>=0&&L[i]?L[i]:null}
function petOk(P){return !!P&&(P.care||0)>=30}
function petBest(p,f){let b=0;for(const P of tsbPets(p))if(petOk(P)){const v=petT(P)[f]||0;if(v>b)b=v}return b}
function petGuard(t,beast){try{return petBest(t,"guard")+(beast?petBest(t,"beast"):0)}catch(e){return 0}}
window.PETSTAT=window.PETSTAT||{got:[0,0,0,0,0],rescue:0,rescueNpc:0,sniff:0,lost:0};
function petBonus(p,on){/* the +1 (or +2) of the following pet: applied once, removed when it stops following */const P=tsbPetOn(p);
 if(p.petB){const k=p.petB,n=p.petBn==null?1:p.petBn;/* fix-kframe-heir: 0 added at the cap → 0 taken off */if(p===S)S[k]=Math.max(0,(S[k]||0)-n);else p[k]=Math.max(0,(p[k]||0)-n);p.petB=null;p.petBn=0}
 if(on&&P){const T=petT(P),k=T.st,n=1+(T.sacX||0);const q=p===S?S:p,b0=q[k]||0;statSet(q,k,b0+n);/* fix-kframe-heir: clamped (was 100 + n = 101); the amount really added is what comes off */p.petB=k;p.petBn=(q[k]||0)-b0}}
const tsbPetBonus=petBonus;
function petAdd(p,t,from,src){t=petK(t);const T=PET[t];if(!T)return null;p.pets=p.pets||[];if(p.pets.length>=petMax(p))return null;
 const P={t,from,src:src||"",care:80,at:tsbWk()};p.pets.push(P);try{PETSTAT.got[T.tr]++}catch(e){}
 if(!tsbPetOn(p)||T.tr>petT(tsbPetOn(p)).tr){petBonus(p,false);p.petOn=p.pets.length-1;petBonus(p,true)}
 if(p===S&&!S.petTip&&!tsbBot()){S.petTip=1;setTimeout(petTipShow,60)}return P}
const tsbPetAdd=(p,t,from)=>petAdd(p,t,from);
function petLose(p,i,why){const L=tsbPets(p);const P=L[i];if(!P)return"";const was=p.petOn===i;if(was)petBonus(p,false);L.splice(i,1);
 if(was)p.petOn=-1;else if(p.petOn>i)p.petOn--;if(was&&L.length){let j=0;L.forEach((x,k)=>{if(petT(x).tr>petT(L[j]).tr)j=k});p.petOn=j;petBonus(p,true)}
 const T=petT(P);try{PETSTAT.lost++}catch(e){}
 /* a gift of the Thái hậu that is lost: she minds */
 if(P.src==="th"&&!/đỡ mạng/.test(why||"")){if(p===S)apply({th:-8});else p.th=(p.th||0)-8}
 if(p===S)tsbLedger({what:T.n,how:why});return T.n}
const tsbPetLose=petLose;
function petFollow(p,i){if(!tsbPets(p)[i])return;petBonus(p,false);p.petOn=i;petBonus(p,true)}
/* luxury: same axis as worn items (jinv luxOf) — the following pet counts in full, pets kept in her palace count half */
function petLuxOf(p){let s=0;tsbPets(p).forEach((P,i)=>{const v=petLux(P.t);s+=p.petOn===i?v:Math.round(v/2)});return s}
if(typeof luxOf==="function"){const lx0=luxOf;luxOf=function(p){const x=lx0.apply(this,arguments);try{const add=petLuxOf(p);if(!add)return x;const sc=x.sc+add,bud=x.bud;
 const lv=sc===0?0:sc<=bud?1:sc<=bud*1.5?2:3;return{lv,sc,bud,name:LUX_N[lv][0],cls:LUX_N[lv][1]}}catch(e){return x}}}

/* ---------------- công dụng ---------------- */
/* sniff: food harm (poison, slow poison, poisoned food for her child) — the best healthy sniffer may warn ONCE, then needs 8 weeks */
function petSniffO(t){let b=0,P0=null;for(const P of tsbPets(t)){const T=petT(P);if(!T.sniff||!petOk(P)||(P.sn||-99)>tsbWk()-8)continue;const o=Math.round(T.sniff*(P.care>=60?1:.7));if(o>b){b=o;P0=P}}return[b,P0]}
function petSniff(a,t){if(!t)return"";const [o,P]=petSniffO(t);if(!P||!roll(o))return"";P.sn=tsbWk();try{PETSTAT.sniff++}catch(e){}const T=petT(P);
 return `<span class="${t===S?"g":"n"}">Món ăn dâng lên cho ${NM(t)} vừa đặt xuống, ${T.n.replace(/^./,c=>c.toLowerCase())} đánh hơi rồi xù lông, nhất định không chịu lại gần; ${t===S?"ngươi":NM(t)} sinh nghi, sai đổ đi. Mưu hại qua đồ ăn không thành.</span> `}
function petWrapAct(k,cost){try{const A0=ACT[k];if(!A0||A0.__pet)return;const f0=A0.f;A0.f=function(a,t){try{const m=petSniff(a,t);if(m){cost(a);return m}}catch(e){}return f0.apply(this,arguments)};A0.__pet=1}catch(e){}}
petWrapAct("poison",a=>{a.schemes=(a.schemes||0)+1;ap(a,{duc:-10})});
petWrapAct("slowpoison",a=>{a.schemes=(a.schemes||0)+1;ap(a,{bac:-40})});
petWrapAct("kpoison",a=>{a.schemes=(a.schemes||0)+1;ap(a,{duc:-20})});
/* guard: sneaking into her palace (plant items, musk) is harder with a watchdog (thathu/phonghoa read it through tsbGuard) */
["plant","musk"].forEach(k=>{try{const A0=ACT[k];if(!A0||A0.__petg)return;const o0=A0.o;A0.o=function(a,t){const o=o0.apply(this,arguments);try{const g=petGuard(t);if(g)return oddsCl(Math.round(o-g*.8))}catch(e){}return o};A0.__petg=1}catch(e){}});
/* the wild-beast act: a hunting dog keeps beasts out */
(function(){try{const A0=ACT.thathu;if(!A0||A0.__petb)return;const o0=A0.o;A0.o=function(a,t){const o=o0.apply(this,arguments);try{const b=petBest(t,"beast");if(b)return oddsCl(o-b)}catch(e){}return o};A0.__petb=1}catch(e){}})();
/* night with the Emperor: songbird / peacock sing and spread their tails; mandarin ducks bring closeness */
if(typeof nightFx==="function"){const nf0=nightFx;nightFx=function(){const r=nf0.apply(this,arguments);try{const s=petBest(S,"sungN"),an=petBest(S,"anN");
 if(s){apply({sung:s});log(`<span class="g">Thú nuôi trong cung đón giá (${sgStat(s)}).</span>`)}if(an){S.an=cl((S.an||0)+an,0,100);log(`<span class="g">Đôi uyên ương trước điện, Hoàng thượng thêm tình (Ân tình +${an}).</span>`)}}catch(e){}return r}}

/* ---------------- ĐỠ MỘT MẠNG (thần thú) ---------------- */
function petRescuer(p){const L=tsbPets(p);let j=-1;L.forEach((P,i)=>{if(petT(P).rescue&&(P.care||0)>0&&(j<0||i===p.petOn))j=i});return j}
const PET_DEADLY=/Bệnh nặng|nguy kịch|Khó sinh|băng huyết mà chết/;
function petSave(p,cause){const i=petRescuer(p);if(i<0)return false;const P=tsbPets(p)[i],T=petT(P);petLose(p,i,`đỡ mạng cho chủ (${cause})`);
 if(p===S){S.suc=Math.max(S.suc||0,30);if(/nguy kịch|Bệnh/.test(cause))S.ill=null;try{PETSTAT.rescue++}catch(e){}S.petSaved=(S.petSaved||0)+1;
  log(`<span class="g">${T.n} chịu thay ngươi một kiếp nạn (${cause}), rồi lặng lẽ ra đi. Ngươi qua cơn nguy.</span>`);
  if(!tsbBot())setTimeout(()=>petSavedShow(T,P,cause),80)}
 else{p.suc=Math.max(p.suc||0,30);if(/nguy kịch|Bệnh/.test(cause))p.ill=null;try{PETSTAT.rescueNpc++}catch(e){}log(`${NM(p)} qua cơn nguy kịch; người ta đồn ${T.n.replace(/^./,c=>c.toLowerCase())} của nàng đã chịu thay một mạng.`)}
 return true}
function petSavedShow(T,P,cause){try{kitModal({kind:"notice",title:"Linh thú đỡ mạng",sub:typeof when==="function"?String(when()).replace(/<[^>]+>/g,""):"",
 itemPic:petPicK(P.t).itemPic,
 facts:[`Ngươi gặp nạn: ${cause.toLowerCase()}. Thái y đã lắc đầu.`,`Canh ba, ${T.n.replace(/^./,c=>c.toLowerCase())} nằm phục bên giường ngươi không rời.`,`Sáng ra ngươi tỉnh lại, hơi thở đều. ${T.n} đã lặng lẽ ra đi.`,"Người trong cung đều nói: linh thú chịu thay chủ một kiếp.","Sức hồi lại 30. Mỗi linh thú chỉ đỡ được một lần."],btn:"Lĩnh ân"})}catch(e){}}
/* deaths that go through die(): illness at its worst, Sức gone (poison, harm, sickness) */
if(typeof die==="function"){const d0=die;die=function(why){try{if(S&&!S.dead&&PET_DEADLY.test(String(why||""))&&!/phá thai/.test(String(why))&&petSave(S,String(why).split(",")[0]))return}catch(e){}return d0.apply(this,arguments)}}
/* Sức 0 at the end of the week (endTurn checks right after rivalsTurn): the pet takes it first, so the week goes on normally */
if(typeof rivalsTurn==="function"){const rt0=rivalsTurn;rivalsTurn=function(){const r=rt0.apply(this,arguments);try{if(S&&!S.dead&&S.suc<=0)petSave(S,"Bệnh nặng, Sức cạn kiệt")}catch(e){}return r}}
/* NPC: Sức gone */
if(typeof dieIf==="function"){const di0=dieIf;dieIf=function(p,why){try{if(p&&p!==S&&p.alive&&p.suc<=0&&petRescuer(p)>=0)petSave(p,"Sức cạn kiệt")}catch(e){}return di0.apply(this,arguments)}}
/* childbirth: roll the same risk once; a sacred pet takes the death and the child is born as usual */
if(typeof birthP==="function"){const bp0=birthP;birthP=function(p,fake){try{if(!fake&&p&&petRescuer(p)>=0){const br0=birthRisk;const dead=roll(br0(p));birthRisk=()=>0;let r;
  try{if(dead)petSave(p,"Khó sinh, băng huyết");r=bp0.apply(this,arguments)}finally{birthRisk=br0}return r}}catch(e){console.error("petBirth",e)}return bp0.apply(this,arguments)}}

/* ---------------- nguồn ---------------- */
function petPool(min,max){return PETK.filter(k=>PET[k].tr>=min&&PET[k].tr<=max&&!PET[k].rescue)}
function petHasFree(p){return tsbPets(p).length<petMax(p)}
function petWorst(p){const L=tsbPets(p);let j=-1;L.forEach((P,i)=>{if(PET[P.t]&&PET[P.t].rescue)return;if(j<0||petT(P).tr<petT(L[j]).tr)j=i});return j}
/* NPC takes a pet by the same rule (full: the lowest one goes back to Ngự thú viên when the new one is better) */
function petGive(p,t,from,src){if(petHasFree(p))return petAdd(p,t,from,src);const j=petWorst(p);if(j>=0&&petT(tsbPets(p)[j]).tr<PET[t].tr){petLose(p,j,"gửi về Ngự thú viên");return petAdd(p,t,from,src)}return null}
function petCardQ(pid){return Q.some(m=>m.pid===pid)}
const PET_SRCN={emp:"Hoàng thượng ban",th:"Thái hậu ban",hh:"Hoàng hậu ban",man:"",hunt:"Thu săn, Hoàng thượng ban",trib:"Cống phẩm, Hoàng thượng ban",buy:"Nhờ thái giám mua"};
/* co-op (review/coop-pets): NPC pets are part of the shared world, rolled once on the host; the guest runs only her own (else the merge adds the NPC decay / costs twice) */
function petNpcs(){try{if(window.COOPW&&COOPW.on&&COOPW.seat!=="a")return []}catch(e){}return liveRivals(true)}
function petLack(p,k){return tsbPets(p).some(P=>P.t===k)?0:1}
function petThW(p,k){const B=BAL.ag.why.g2pet;if(k==="hac")return B.hac;return (p.th||0)>=B.kyTh&&rkOf(p)>=B.kyRk?(p.th||0)-B.kyTh+B.ky:0}
function petMonth(){if(!S||S.dead)return;const on=tsbOn()&&!(typeof isSrv==="function"&&isSrv())&&!S.out,me=[S].concat(petNpcs());
 const empPick=sg=>sg>=80?pick(["phuong","ngoctho","thienma"]):sg>=65?pick(["linhmieu","lyngu","vet","meo"]):pick(["meo","sao","uyenuong","cachep","hoami"]);
 for(const p of me){if(p.out)continue;const card=p===S;if(card&&(!on||Q.length>2))continue;
  if((p.sung||0)>=55&&empGive(p,4,"pet")){const t=empPick(p.sung||0);if(card){if(!petCardQ("tsbPetGift"))petCard("tsbPetGift",{src:"emp",t},"Ngự ban")}else petGive(p,t,PET_SRCN.emp,"emp");continue}
  if((p.th||0)>=60&&thGive(p,2.5,"pet")){const t=npwPick(["kylan","hac"],k=>petThW(p,k))||"hac";/* npc-purpose G2c: the rarer beast for the one she holds dearest */if(tsbPets(p).some(P=>P.t===t))continue;if(card){if(!petCardQ("tsbPetGift"))petCard("tsbPetGift",{src:"th",t},"Thái hậu ban")}else petGive(p,t,PET_SRCN.th,"th");continue}
  if(!p.queen&&rkOf(p)<7&&(p.hh||0)>=60&&queenP()&&queenP()!==p&&npcWhy("petHh",{p},()=>roll(BAL.ag.why.g2pet.hhP))){const t=npwPick(["sutu","linhmieu"],k=>petLack(p,k))||"sutu";/* npc-purpose G2c: Hoàng hậu rewards one in her good graces, with a pet she lacks */if(card){if(!petCardQ("tsbPetGift"))petCard("tsbPetGift",{src:"hh",t},"Hoàng hậu ban")}else petGive(p,t,PET_SRCN.hh,"hh");continue}}
 /* a man who cares for her sends a small animal (her only) */
 const mw=on&&!petCardQ("tsbPetGift")?npcWhy("petMan",{},()=>roll(BAL.ag.why.g2pet.manP)):null;if(mw){const m=mw.who;petCard("tsbPetGift",{src:"man",m:m.id,t:npwPick(["hoami","uyenuong","meo","sao","tho"],k=>petLack(S,k))||"meo"},"Quà gửi lén")}/* npc-purpose G2c: the man whose tình runs deepest sends what she lacks */
 /* autumn hunt (tháng chín, once a year): the Emperor brings back animals for the consorts who rode with him (Sủng ≥ 50) */
 if(S.month===9&&S.petHunt!==S.year){S.petHunt=S.year;const L=me.filter(p=>!p.out&&(p.sung||0)>=50).sort((x,y)=>(y.sung||0)-(x.sung||0)).slice(0,2);
  for(const p of L){const rare=(p.sung||0)>=75&&roll(5);const ts=rare?["bachloc"]:[pick(["camke","sutu"]),pick(["cuuvi","camke","ngoctho"])].filter((x,i,a)=>a.indexOf(x)===i);
   if(p===S){if(on&&!petCardQ("tsbPetHunt"))petCard("tsbPetHunt",{ts},"Thu săn")}else petGive(p,ts[0],PET_SRCN.hunt,"hunt")}}
 /* foreign tribute (tháng giêng, once a year, one time in two): the most favoured consort gets a rare animal */
 if(S.month===1&&S.petTrib!==S.year){S.petTrib=S.year;if(roll(50)){const p=me.filter(p=>!p.out).sort((x,y)=>(y.sung||0)-(x.sung||0))[0];
  if(p){const t=(p.sung||0)>=75&&roll(7)?"thanhlong":pick(["linhmieu","lyngu","camke","cuuvi","thienma","phuong"]);if(p===S){if(on&&!petCardQ("tsbPetGift"))petCard("tsbPetGift",{src:"trib",t},"Cống phẩm")}else petGive(p,t,PET_SRCN.trib,"trib")}}}
 /* NPC buys a common pet through the eunuchs when she has silver to spare */
 for(const v of petNpcs())if(!(typeof p3On==="function"&&p3On())&&!tsbPets(v).length&&(v.bac||0)>=150&&roll(3)){const t=pick(petPool(0,1).filter(k=>PET[k].pr));if(roll(70)){ap(v,{bac:-PET[t].pr});petAdd(v,t,PET_SRCN.buy,"buy")}}
 /* monthly effects + upkeep, same rule for everyone */
 for(const p of me)petMonthOf(p)}
function petMonthOf(p){const L=tsbPets(p);if(!L.length)return;const me=p===S;let up=0;
 L.forEach((P,i)=>{const T=petT(P);up+=T.up||0;if(!petOk(P))return;
  if(T.th){if(me)apply({th:T.th});else p.th=(p.th||0)+T.th}
  if(T.omen&&roll(T.omen[0])){if(me){apply({danh:T.omen[1]});if(T.tr>=3)apply({th:1});log(`<span class="g">${T.n} trong cung ngươi được xem là điềm lành (Danh +${T.omen[1]}).</span>`)}else ap(p,{danh:T.omen[1]})}
  if(T.soft){const v=liveRivals(true).filter(x=>x!==p&&oan(x,p)>0).sort((x,y)=>oan(y,p)-oan(x,p))[0];if(v)oanAdd(v,p,-T.soft)}
  if(T.spy&&roll(T.spy)){const v=liveRivals(true).filter(x=>x!==p&&bandOf(danger(x,p))>=1).sort((x,y)=>danger(y,p)-danger(x,p))[0];if(v&&evA(p,v,BAL.eff.jpet.evPetMonthOf)){if(me)log(`<span class="g">${T.n} nhại lại câu ${v.name} lỡ nói khi ghé cung: ngươi nắm thêm ${balAb(BAL.eff.jpet.evPetMonthOf)} chứng cứ của nàng.</span>`)}}
  if(T.leak&&roll(T.leak)){if(T.spy&&(p.schemes||0)>0){const v=liveRivals(true).filter(x=>x!==p&&bandOf(danger(x,p))>=1)[0];if(v){/*evok: schemes>0*/evA(v,p,BAL.eff.jpet.evPetMonthOf_2);if(me)log(`<span class="r">${T.n} nhại lời ngươi trước mặt người của ${v.name}: nàng nắm ${balAb(BAL.eff.jpet.evPetMonthOf_2)} chứng cứ của ngươi.</span>`)}}
   else if(!T.spy){if(me){apply({danh:BAL.eff.jpet.danhPetMonthOf});log(`${T.n} nhại lời ngươi trước khách, thành chuyện cười (Danh ${balSg(BAL.eff.jpet.danhPetMonthOf)}).`)}else ap(p,{danh:-1})}}
  if(T.noise&&roll(40)){const hk=typeof houseOf==="function"?houseOf(p):null;const v=liveRivals(true).find(x=>x!==p&&hk&&houseOf(x)===hk);if(v)oanAdd(v,p,BAL.eff.jpet.petMonthOf)}
  if(T.bite&&roll(40)){if(me)tsbLoyal(-BAL.eff.jpet.loyalPetMonthOf);else if(p.maid)p.maid.loyal=cl((p.maid.loyal||0)-BAL.eff.jpet.loyalPetMonthOf,0,100)}
  if(T.fox){if(roll(40)){if(me)apply({th:-1});else p.th=(p.th||0)-1}if(roll(15)){if(me){apply({danh:BAL.eff.jpet.danhPetMonthOf_2});log(`Lời đồn ngươi nuôi hồ ly trong cung lan ra (Danh ${balSg(BAL.eff.jpet.danhPetMonthOf_2)}).`)}else ap(p,{danh:-1})}}});
 if(up){const has=me?S.bac:(p.bac||0);if(has>=up){if(me)apply({bac:-up});else ap(p,{bac:-up})}else{L.forEach(P=>{P.care=(P.care||0)-25;/* the care numbers (jpetcare) are the truth: hunger shows on No */if(P.full!=null){P.full=Math.max(0,P.full-25);P.joy=Math.max(0,(P.joy||0)-10);P.care=Math.round((P.full+(P.clean||0)+P.joy)/3)}});if(me)log(`<span class="r">Không đủ bạc nuôi thú (cần ${up} lượng): thú nuôi đói kém.</span>`)}}}
function petWeek(){for(const p of [S].concat(petNpcs())){const L=tsbPets(p);if(!L.length)continue;const me=p===S;
  if(p.out){for(let i=L.length-1;i>=0;i--)petLose(p,i,"Nội vụ phủ thu lại khi vào lãnh cung");if(me)log(`<span class="r">Vào lãnh cung, thú nuôi của ngươi bị Nội vụ phủ thu lại hết.</span>`);continue}
  const winter=S.month>=10;
  for(let i=L.length-1;i>=0;i--){const P=L[i],T=petT(P);let dc=T.dc||8;if(T.pond&&rkOf(p)<3)dc+=5;if(T.weak&&winter)dc+=6;
   if(me){P.care=(P.care||0)-(tsbMaid(S)?Math.ceil(dc/2):dc)}else{P.care=cl((P.care||0)-dc+((p.bac||0)>=(T.up||0)?dc+2:0)-(roll(4)?30:0),0,100)}
   if(petOk(P)){if(T.suc){if(me)S.suc=cl(S.suc+T.suc,0,sucCap(S));else p.suc=cl((p.suc||0)+T.suc,0,sucCap(p))}}
   if(T.al&&p.asthma){if(me)S.suc=cl(S.suc-2,0,sucCap(S));else p.suc=cl((p.suc||0)-2,0,sucCap(p))}
   if(me&&P.care<30&&!P.warn){P.warn=1;if(tsbOn()&&!petCardQ("tsbPetW"))petCard("tsbPetW",{i},"Thú nuôi biếng ăn")}
   if(P.care<=0){const n=petLose(p,i,/hoami|sao|vet|uyenuong|camke|phuong|thanhlong|hac|thienma/.test(P.t)?"bỏ đi mất vì bỏ bê":"yếu dần vì bỏ bê");if(me&&n)log(`<span class="r">${tsbCap(n)} của ngươi bị bỏ bê lâu ngày, không còn nữa.</span>`)}}}}
function tsbPetWeek(){return petWeek()}function tsbPetMonth(){return petMonth()}

/* ---------------- thẻ sự kiện ---------------- */
function petLine(t,acc){t=petK(t);const T=PET[t];const sw=petHasFree(S)?"":(()=>{const j=petWorst(S);return j>=0?` · Mất: ${petT(tsbPets(S)[j]).n} phải gửi về Ngự thú viên (đủ ô)`:""})();
 return `thành: có ${T.n} (${PET_TIER[T.tr]}) · ${PET_SN[T.st]} +${1+(T.sacX||0)} khi theo hầu · ${T.use}${sw} · kèm: Xa xỉ +${petLux(t)} · ${T.up?`Bạc -${T.up} mỗi tháng · `:""}${T.bad}${acc||""} · (mỗi tuần phải chăm)`}
function petTake(t,from,src){if(!petHasFree(S)){const j=petWorst(S);if(j<0)return null;petLose(S,j,"gửi về Ngự thú viên")}return petAdd(S,t,from,src)}
/* review/ev-art-fit (owner 15/11): pet events showed the ROOM she stands in; now the picture of what happens — a pet given (gift group),
   the autumn hunt (Đi săn group), caring for a pet (act-cham-thu-nuoi) */
function petArtOf(t,label,g){try{if(g){const id="cat:"+g;const src=typeof evArtOf==="function"?evArtOf(id,0):"";if(src)return{src,label:typeof evArtTitle==="function"?evArtTitle(id):""}}
 return{src:"img/act-cham-thu-nuoi.webp",label:label||"Thú nuôi"}}catch(e){return undefined}}
function petPicK(t,lead){t=petK(t);const T=PET[t];return{facts:lead?[String(lead).replace(/<[^>]+>/g,"")]:undefined,itemPic:kitItem({src:petSrc(t,1,typeof petcStageSrc==="function"?"-non":""),name:"",grade:T.tr,gname:PET_TIER[T.tr],size:"lg",lux:petLux(t)}).replace('<span class="kitn"></span>','')}}
function petCard(pid,pp,title){const d=mkP(pid,pp);if(!d)return false;if(d.kit&&!d.kit.facts)d.kit.facts=[String(d.t||"").replace(/<[^>]+>/g,"")];Q.push({t:title||d.title,h:d.t,opts:d.o,headArt:d.headArt,kit:d.kit,optLayout:"rows",showOut:true,pid:d.pid,pp:d.pp});tsbShow();return true}
(function(){const d0=deserQ;deserQ=function(L){const out=d0.apply(this,arguments);try{out.forEach(q=>{if(q.pid&&/^tsbPet/.test(q.pid)){const d=mkP(q.pid,q.pp);if(d){q.kit=d.kit;if(q.kit&&!q.kit.facts)q.kit.facts=[String(d.t||"").replace(/<[^>]+>/g,"")];q.stage=undefined}}})}catch(e){}return out}})();
PEND.tsbPetGift=pp=>{if(!S)return null;pp.t=petK(pp.t);const T=PET[pp.t];if(!T)return null;const O=[];
 if(pp.src==="man"){const m=typeof manById==="function"?manById(pp.m):null;if(!m)return null;const risk=typeof lộRisk==="function"?lộRisk("home"):25;
  O.push({n:"Nhận",fx:{},x:`${word(100-risk)} · ${petLine(pp.t)} · hắn vui, tình ý +5 · hỏng: có người dò ra nguồn quà, Danh ${balSg(BAL.eff.jpet.danhGo)}, một phi tần nắm ${balAb(BAL.eff.jpet.evGo)} chứng cứ của ngươi`,go:()=>{deedAdd(S,"mangift",null,1,`lén nhận quà của ${m.name}`);petTake(pp.t,`${m.name} gửi tặng`,"man");m.tinh=cl((m.tinh||0)+5,0,100);if(!roll(BAL.odb.jpet.rbGo-risk)){apply({danh:BAL.eff.jpet.danhGo});const v=liveRivals(true).sort((x,y)=>(y.mat||0)-(x.mat||0))[0];if(v)/*evok: mangift deed*/evA(v,S,BAL.eff.jpet.evGo);log(`<span class="r">Có người dò ra ${T.n.replace(/^./,c=>c.toLowerCase())} là quà ${m.name} gửi; lời ra tiếng vào.</span>`)}else log(`Ngươi lặng lẽ nhận ${T.n.replace(/^./,c=>c.toLowerCase())} ${m.name} gửi tặng.`)}});
  O.push({n:"Trả lại",fx:{},x:`thành: giữ mình trong sạch, không ai dò được gì · Mất: hắn buồn, tình ý -5`,go:()=>{m.tinh=cl((m.tinh||0)-5,0,100);log(`Ngươi trả lại món quà của ${m.name}.`)}});
  return{t:`<p>Một thái giám quen việc lén đưa đến cung ngươi ${T.n.replace(/^./,c=>c.toLowerCase())} (${T.d}); kèm mảnh giấy ghi tên ${m.name}.</p>`,o:O,headArt:petArtOf(pp.t,"","qua-tang"),kit:petPicK(pp.t),title:"Quà gửi lén"}}
 const who={emp:"Hoàng thượng",th:"Thái hậu",hh:"Hoàng hậu",trib:"Hoàng thượng"}[pp.src]||"Hoàng thượng";
 const decl={emp:[sgStat(BAL.eff.jpet.sungEmp),{sung:BAL.eff.jpet.sungEmp}],trib:[sgStat(BAL.eff.jpet.sungTrib),{sung:BAL.eff.jpet.sungTrib}],th:["Thái hậu quý ngươi -3",{th:-3}],hh:["Hoàng hậu quý ngươi -3",{hh:-3}]}[pp.src]||[sgStat(BAL.eff.jpet.sungDecl),{sung:BAL.eff.jpet.sungDecl}];
 const gain=pp.src==="trib"?" · Hoàng hậu quý ngươi +2 (không tranh cống phẩm)":pp.src==="emp"?"":"";
 O.push({n:"Tạ ơn, nhận nuôi",fx:{},x:`${petLine(pp.t)}${pp.src==="emp"||pp.src==="trib"?" · ba phi tần ghen ngươi nhất ghen +3":""}`,go:()=>{petTake(pp.t,PET_SRCN[pp.src],pp.src);if(pp.src==="emp"||pp.src==="trib")liveRivals(true).sort((x,y)=>(y.ghen||0)-(x.ghen||0)).slice(0,3).forEach(v=>ghenUp(v,3,"thấy ngươi được ban thú quý",S));log(`<span class="g">Ngươi tạ ơn, nhận ${T.n} ${who} ban.</span>`)}});
 O.push({n:"Khiêm nhường xin gửi Ngự thú viên",fx:{},x:`thành: không thêm Xa xỉ, không ai ghen, không tốn bạc nuôi${gain} · Mất: ${who} hơi phật ý, ${decl[0]}`,go:()=>{apply(Object.assign({},decl[1],pp.src==="trib"?{hh:2}:{}));log(`Ngươi xin gửi ${T.n.replace(/^./,c=>c.toLowerCase())} lại Ngự thú viên; ${who} hơi phật ý.`)}});
 const lead={emp:`Hoàng thượng nhớ lời ngươi từng khen, sai thái giám đem đến ${T.n.replace(/^./,c=>c.toLowerCase())} (${T.d}), ban cho ngươi nuôi.`,th:`Thái hậu thương ngươi hiếu thuận, ban cho ${T.n.replace(/^./,c=>c.toLowerCase())} (${T.d}) để giữ điềm thọ.`,hh:`Hoàng hậu sai người đem đến ${T.n.replace(/^./,c=>c.toLowerCase())} (${T.d}), nói là để ngươi có bạn khuây khỏa.`,trib:`Sứ thần nước ngoài dâng cống. Hoàng thượng chọn ${T.n.replace(/^./,c=>c.toLowerCase())} (${T.d}) ban riêng cho ngươi.`}[pp.src]||"";
 return{t:`<p>${lead}</p>`,o:O,headArt:petArtOf(pp.t,"","qua-tang"),kit:petPicK(pp.t),title:{emp:"Ngự ban",th:"Thái hậu ban",hh:"Hoàng hậu ban",trib:"Cống phẩm"}[pp.src]}};
PEND.tsbPetHunt=pp=>{if(!S||!pp.ts||!pp.ts.length)return null;pp.ts=pp.ts.map(petK);const O=pp.ts.map(t=>({n:`Xin ${PET[t].n}`,fx:{},x:""+petLine(t),go:()=>{petTake(t,PET_SRCN.hunt,"hunt");log(`<span class="g">Hoàng thượng ban ngươi ${PET[t].n.replace(/^./,c=>c.toLowerCase())} săn được mùa thu.</span>`)}}));
 O.push({n:"Không xin gì, chỉ chúc mừng",fx:{},x:`thành: Hoàng thượng khen hiểu chuyện, Sủng ${balSg(BAL.eff.jpet.sungGo)} · không thêm Xa xỉ, không tốn bạc nuôi`,go:()=>{apply({sung:BAL.eff.jpet.sungGo});log("Ngươi chỉ chúc mừng Hoàng thượng thắng lợi trong cuộc săn.")}});
 const T=PET[pp.ts[0]];return{t:`<p>Thu săn ở bãi săn hoàng gia. Hoàng thượng thắng lớn, cho gọi các phi tần đi theo đến chọn thú săn được còn sống để nuôi.${T.rescue?" Trong đoàn có một con hươu trắng tỏa ánh bạc, ai cũng nói là thần thú.":""}</p>`,o:O,headArt:petArtOf(pp.ts[0],"","di-san"),kit:petPicK(pp.ts[0]),title:"Thu săn"}};
PEND.tsbPetW=pp=>{const P=tsbPets(S)[pp.i];if(!P)return null;const T=petT(P);const mm=tsbMaid(S);const O=[];
 O.push({n:"Tự tay chăm",fx:{},x:`tốn: 1 khắc · thành: ${T.n} khỏe lại · Sức ${balSg(BAL.eff.jpet.sucGo)} (khuây khỏa)`,need:[tsbNeedKhac(1)],go:()=>{tsbKh(1);P.care=90;P.warn=0;apply({suc:BAL.eff.jpet.sucGo});log(`Ngươi tự tay chăm ${T.n.replace(/^./,c=>c.toLowerCase())}; nó khỏe lại.`)}});
 if(mm)O.push({n:`Giao ${mm.name} chăm`,fx:{},x:`${word(oddsCl(mm.loyal))} · thành: ${T.n} khỏe lại · hỏng: kẻ hầu chăm qua loa, chỉ đỡ đôi chút · (thành hay bại tùy Lòng của ${mm.name})`,go:()=>{if(roll(mm.loyal)){P.care=80;P.warn=0;log(`${mm.name} chăm ${T.n.replace(/^./,c=>c.toLowerCase())} chu đáo.`)}else{P.care+=15;log(`${mm.name} chăm qua loa.`)}}});
 O.push({n:"Để sau",fx:{},x:`thành: giữ khắc buổi này · Mất: bỏ bê thêm vài tuần thì mất ${T.n.replace(/^./,c=>c.toLowerCase())}`});
 return{t:`<p>Mấy hôm nay ${T.n.replace(/^./,c=>c.toLowerCase())} của ngươi biếng ăn, ${/hoami|sao|vet|camke|phuong|hac/.test(P.t)?"không hót nữa":/cavang|cachep|lyngu/.test(P.t)?"nằm lờ đờ đáy bồn":/thanhlong/.test(P.t)?"vảy xỉn màu":"lông xơ xác"}.</p>`,o:O,headArt:petArtOf(P.t),kit:petPicK(P.t),title:"Thú nuôi biếng ăn"}};

/* ---------------- kẻ thù hại thú (Hại nhỏ) ---------------- */
function petTarget(t){const L=tsbPets(t);if(!L.length)return -1;let j=0;L.forEach((P,i)=>{if(petT(P).tr>petT(L[j]).tr)j=i});return j}
function petHarmO(a,t){const j=petTarget(t);const P=tsbPets(t)[j];const T=petT(P);return oddsCl(Math.min(Math.round(odA(a,50+(a.tamco||0)/5+(T.easy?15:0)-T.tr*4)-tsbGuard(t)),90))}
A("thaopet","Hại thú nuôi của nàng",{c:{bac:-BAL.actBac.thaopet},ok:(a,t)=>(a.bac||0)>=BAL.actBac.thaopet&&tsbPets(t).length>0,o:(a,t)=>petHarmO(a,t),x:"nàng mất con thú quý nhất (thả đi hay làm hại)",
 f:(a,t)=>{const j=petTarget(t);const P=tsbPets(t)[j];if(!P)return actNone(a);/* fix-kframe-heir: no pet left → no cost */ap(a,{bac:-BAL.actBac.thaopet});const T=petT(P);const c=caught(a,t,false,`sai người hại ${T.n.replace(/^./,c=>c.toLowerCase())} của ${NM(t)}`);if(c)return c;const o=petHarmO(a,t);
  if(!aRoll(o,a)){const e=roll(40);if(e)/*evok: pet harm act (runAct deed)*/evA(t,a,BAL.eff.jpet.evF);return `Kẻ lạ lảng vảng bên chuồng thú của ${NM(t)} bị kẻ hầu chặn lại${e?`; hắn khai là người của ${NM(a)} (chứng cứ ${balSg(BAL.eff.jpet.evF)})`:""}. `}
  const fly=/hoami|sao|vet|uyenuong|camke|phuong|thanhlong|bachloc|kylan|cuuvi|hac|thienma/.test(P.t);const n=petLose(t,j,fly?"bị thả đi (chưa rõ ai làm)":"bị hại (chưa rõ ai làm)");
  if(T.tr>=3&&roll(25)){/* a rare animal the court knows: the loss is noticed */if(t===S)apply({danh:-1})}
  return `<span class="r">${tsbCap(n)} của ${NM(t)} ${fly?"sổ lồng bay mất, tìm không thấy":"bỗng lăn ra bỏ ăn rồi chết, không rõ vì sao"}.</span> `}});
AOUT.thaopet=["nàng mất con thú quý nhất",`kẻ hầu bắt gặp: nàng có thể nắm ${balAb(BAL.eff.jpet.evF)} chứng cứ`];
try{ACTDOM.thaopet="Mưu kế"}catch(e){}
/* jealousy aims at precious animals: the weight of the act grows with the pet's rank */
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(Array.isArray(O)){const j=petTarget(t);if(j>=0){const tr=petT(tsbPets(t)[j]).tr;O.forEach(x=>{if(x[0]==="thaopet")x[1]*=1+tr*.5})}}}catch(e){}return O}})();

/* ---------------- Tư trang: ô thú nuôi (kitEquipSlots, cùng kit với Đang mang) ---------------- */
function petTile(P,i,big){const T=petT(P);const h=kitItem({src:petPSrc(P,big),name:big?"":T.n,grade:T.tr,gname:PET_TIER[T.tr],lux:petLux(P.t),size:big?"lg":"slot",on:!big&&S.petOn===i,onText:"Theo hầu",tip:`${T.n} · ${PET_TIER[T.tr]} · Xa xỉ ${petLux(P.t)}`});
 /* same tile as items: grade frame + colour, Ngự seal on Ngự tứ; the chip on the frame reads the pet tier (gname) */
 return h}
function petCareW(P){const c=P.care||0;return c>=BAL.pet.life.careOk?["Khỏe","g"]:c>=BAL.pet.life.careLow?["Cần chăm","n"]:["Biếng ăn","r"]}
/* LEFT COLUMN pet box (owner 16/11 16:55Z): directly under Y phục, same column width, slot = wear-slot size; name / age / effect as small lines.
   Shows the pet that follows her (else the first); 0 pets = one empty slot + "Chưa nuôi con nào". Tap = the Thú cưng sub-tab of Tư trang. */
function petStageTxt(P){return typeof petStage==="function"&&BAL.pet&&BAL.pet.stages?BAL.pet.stages[petStage(P)]:""}
function petAgeTxt(P){const w=Math.max(0,tsbWk()-(P.at||0));return (w>=48?Math.floor(w/48)+" tuổi":Math.floor(w/4)+" tháng tuổi")}
function petSideHTML(){const sv=typeof isSrv==="function"&&isSrv();if(!S||!(tsbOn()||sv))return"";/* the cung nữ road too: the same (empty) pet slot (maid-8tabs) */const L=sv?[]:tsbPets(S);const i=Math.max(0,L.findIndex((P,j)=>j===S.petOn)),P=L[i];let slot;
 if(P){const T=petT(P),cw=petCareW(P);slot={k:"p"+i,label:T.n,lc:KIT_GRADE[T.tr].c,i,item:{src:petPSrc(P),name:T.n,grade:T.tr,lux:petLux(P.t),tip:`${T.n} · ${PET_TIER[T.tr]} · chạm để mở Thú cưng`},
   info:`<span>${petAgeTxt(P)}</span>${S.petOn===i?kitChip(PET_SN[T.st],1+(T.sacX||0)):"<span>ở tẩm cung</span>"}${L.length>1?`<span>+${L.length-1} con nữa</span>`:""}`}}
 else slot={k:"e0",label:"Chưa nuôi con nào",i:0,item:null,ghost:petSrc("cho")};
 return kitEquipSlots({key:"pets",title:"Thú cưng",slots:[slot],onPick:()=>{KINV_SUB="thu";try{localStorage.setItem("hclh-inv-sub","thu")}catch(e){}try{renderPanel()}catch(e){render()}},col:true})}
/* Tư trang › Thú cưng sub-tab: every pet as a kit card (kitSkillCard) + Chăm (jpetcare) / Cho theo hầu / Gửi về, and the shop button */
function petPanelHTML(){if(!S||S.dead)return"";/* maid-8tabs (owner 21/11 ~03:15Z): the cung nữ sees the same Tư trang sub-tabs; no pets yet = the kit empty card, never a missing tab */if(typeof isSrv==="function"&&isSrv())return kitEmpty("Thú cưng","Phận cung nữ chưa được nuôi thú cưng; được phong phi tần mới nuôi được.");if(!tsbOn())return"";const L=tsbPets(S),free=petMax(S)-L.length;
 const shop=pbtn(`data-petshop="1"`,"Nhờ thái giám tìm thú nuôi",free>0?`tốn: 1 khắc, Bạc · thành: một con thú nhỏ về tẩm cung (còn ${free} ô)`:"",free>0?(typeof whyTime==="function"?whyTime(1):""):"hết ô nuôi");
 const cards=L.map((P,i)=>{const T=petT(P),cw=petCareW(P),cur=tsbPetOn(S),B=[];
  B.push(pbtn(`data-pet="care" data-i="${i}"`,`Chăm ${T.n.replace(/^./,c=>c.toLowerCase())}`,`thành: cho ăn, tắm chải, chơi (mỗi việc ${BAL.pet.khac} khắc) · No, Sạch, Vui, Tình cảm tăng`,""));
  if(S.petOn!==i)B.push(pbtn(`data-pet="follow" data-i="${i}"`,"Cho theo hầu",`thành: ${PET_SN[T.st]} +${1+(T.sacX||0)} · Xa xỉ của nó tính đủ${cur?` · Mất: ${petT(cur).n} về tẩm cung, ${PET_SN[petT(cur).st]} -${1+(petT(cur).sacX||0)}`:""}`,""));
  const fromHi=/emp|hunt|trib/.test(P.src||"")||P.from==="Hoàng thượng ban",fromTh=P.src==="th";
  B.push(pbtn(`data-pet="free" data-i="${i}"`,"Gửi về Ngự thú viên",`thành: bớt Xa xỉ ${S.petOn===i?petLux(P.t):Math.round(petLux(P.t)/2)}${T.up?` · thôi tốn Bạc ${T.up} mỗi tháng`:""} · Mất: ${T.n}${fromHi?` · Hoàng thượng phật ý, ${sgStat(-BAL.pet.freeHiSung)}`:fromTh?" · Thái hậu quý ngươi -8":P.src==="hh"?" · Hoàng hậu quý ngươi -3":""}`,""));
  return kitSkillCard({kind:"pet",k:String(i),name:T.n,kicker:`${PET_TIER[T.tr]} · ${petStageTxt(P)} · ${petAgeTxt(P)} · ${S.petOn===i?"theo hầu":"ở tẩm cung"}`,max:0,img:petPSrc(P),
   desc:`<span class="kchip ${cw[1]}">${cw[0]}</span> ${kitRows(petRowsL(P,i))}`,acts:B,can:true})}).join("");
 const PETRARE="Con quý hiếm không mua được: Hoàng thượng, Thái hậu, Hoàng hậu ban, Thu săn tháng chín, cống phẩm tháng giêng.";
 return `<div class="kskills kpetcards">${cards||kitEmpty("Ta chưa nuôi con thú nào",["Nhờ thái giám Nội vụ phủ tìm một con thú nhỏ về nuôi (nút ở dưới).",PETRARE],{art:petSrc("cho")})}${kitSkillCard({kind:"petshop",name:`Thú nuôi (${L.length}/${petMax(S)})`,max:0,img:"",desc:cards?PETRARE:"",acts:[shop],can:true})}</div>`}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-petshop]");if(!b||b.disabled)return;ev.stopPropagation();petShop()},true);
/* one kit table (KIT §51): petRowsL = the rows, wrappers (jpetcare) add rows to the SAME table, never a 2nd kitRows */
function petRows(P,i){return kitRows(petRowsL(P,i))}
function petRowsL(P,i){const T=petT(P);const D=[`${PET_SN[T.st]} +${1+(T.sacX||0)} khi theo hầu`,T.use];const M=[T.bad];if(T.up)M.push(`Bạc -${T.up} mỗi tháng`);M.push("bỏ bê tới kiệt thì mất");
 const G=[`Xa xỉ ${petLux(P.t)} (theo hầu tính đủ, ở tẩm cung tính nửa)`,P.from?P.from:""].filter(Boolean);/* no "khí lực": the care numbers are the Chăm row (jpetcare) */if(T.rescue)G.push("chỉ đỡ được một lần");
 return [["Phẩm",`<span class="ef n" style="color:${KIT_GRADE[T.tr].c};font-weight:700">${PET_TIER[T.tr]}</span>`],["Được",D,"g"],["Mất",M,"r"],["Ghi chú",G.filter(Boolean),"n"]]}
/* bag-inline-3 F2: the old petPick pop-up (a pet tile opened kitModal info) was dead code, never wired to a tile (the side pet tile opens the Thú cưng sub-tab; the pet cards there are kit cards with their acts inline) — removed; the pet SHOP (petShop, kitShop) is an act dialog and stays. */
/* ONE buy rule for her shop and an NPC consort (AG-ALL-2e3 cx3:petBuy): the price, the odds petBuyO (her / the buyer's Tai mắt), a sick one = silver lost */
function petBuyOne(t,p){const T=PET[t];if(p&&p!==S){if(!T||!T.pr||(p.bac||0)<T.pr||!petHasFree(p))return false;ap(p,{bac:-T.pr});if(roll(petBuyO(t,p))){petAdd(p,t,PET_SRCN.buy,"buy");return true}return false}
 if(!T||!T.pr||!can(1)||S.bac<T.pr||!petHasFree(S))return false;const o=petBuyO(t);/* the odds on the card, read before the spend (shown-odds r2-rv) */spend(1);apply({bac:-T.pr});
 if(roll(o)){petAdd(S,t,PET_SRCN.buy,"buy");log(`<span class="g">Thái giám Nội vụ phủ tìm về cho ngươi ${T.n.replace(/^./,c=>c.toLowerCase())}.</span>`)}
 else log(`<span class="r">Thái giám mua phải con ốm, không nuôi được; mất ${T.pr} lượng.</span>`);return true}
function petShopItems(){const sfx=typeof petcStageSrc==="function"?"-non":"";
 return PETK.filter(k=>PET[k].pr).map(k=>{const T=PET[k],o=petBuyO(k),t1=whyTime(1);
  const rows=kitRows([["Phẩm",`<span class="ef n" style="color:${KIT_GRADE[T.tr].c};font-weight:700">${PET_TIER[T.tr]}</span>`],["Cơ may",`${word(o)} (tùy Tai mắt của ngươi${T.tr?"; con càng quý càng khó tìm":""}) · tốn 1 khắc`],
   ["Được",[`${PET_SN[T.st]} +${1+(T.sacX||0)} khi theo hầu`,T.use],"g"],["Mất",[T.bad].concat(T.up?[`Bạc -${T.up} mỗi tháng`]:[],["hỏng: mua phải con ốm, mất bạc"]),"r"],["Ghi chú",[`Xa xỉ ${petLux(k)}`,`về tay còn Non, nuôi mới lớn`],"n"]]);
  return{k,src:petSrc(k,0,sfx),src512:petSrc(k,1,sfx),name:T.n,sub:`${PET_TIER[T.tr]} · Xa xỉ ${petLux(k)}`,grade:T.tr,lux:petLux(k),price:T.pr,
   eff:`${PET_SN[T.st]} +${1+(T.sacX||0)}`/* shop-panel-r2: ONE short gain row; odds + use are on the item card */,rows,stock:1,have:()=>0,why:t1?"Hết khắc":(tsbPets(S).some(P=>P.t===k)?"Đã có":""),
   onBuy:(x,q)=>{for(let i=0;i<q;i++)if(!petBuyOne(k))break}}})}
function petShop(){const c=S.court&&S.court.ped;let nm=c&&c.name?c.name:"";try{if(nm&&typeof k61Named==="function"&&!k61Named(c))nm="???"}catch(e){}/* same seller + naming as kitShopNvp */
 return kitShop({key:"pet",title:"Nhờ thái giám tìm thú nuôi",carry:Math.max(0,petMax(S)-tsbPets(S).length),
  info:`<p>Thái giám Nội vụ phủ khom lưng: “Thú nhỏ ngoài cung, nô tài tìm được mấy loài này, xin ${kSay({srv:"m"},S,"{goi}")} chọn.” Còn ${petMax(S)-tsbPets(S).length} ô; con quý hiếm không mua được: Hoàng thượng, Thái hậu, Hoàng hậu ban, Thu săn tháng chín, cống phẩm tháng giêng.</p>`,
  stage:[{__fig:"img/fig-eunuch-ndp-tray.webp",__cap:nm,__role:"Thái giám Nội vụ phủ",age:28,sex:"m"}],items:petShopItems(),money:()=>S.bac})}
function petBuyO(k,p){const T=PET[k];return oddsCl(Math.round([78,62,38][T.tr]+eyes(p||S)*[3,4,5][T.tr]))}
function petDo(k,b){if(!S||S.dead||Q.length)return;const i=+b.dataset.i;
 if(k==="care"){const P=tsbPets(S)[i];if(!P||!can(1))return;spend(1);P.care=95;P.warn=0;apply({suc:2});log(`Ngươi tự tay chăm ${petT(P).n.replace(/^./,c=>c.toLowerCase())}.`)}
 else if(k==="follow"){if(!tsbPets(S)[i])return;petFollow(S,i);log(`${petT(tsbPets(S)[i]).n} theo hầu ngươi.`)}
 else if(k==="free"){const P=tsbPets(S)[i];if(!P)return;const T=petT(P);const hi=/emp|hunt|trib/.test(P.src||"")||P.from==="Hoàng thượng ban";if(P.src==="th")apply({th:-8});else if(P.src==="hh")apply({hh:-3});if(hi)apply({sung:-BAL.pet.freeHiSung});
  P.src=P.src==="th"?"th-free":P.src;petLose(S,i,"gửi về Ngự thú viên");log(`Ngươi gửi ${T.n.replace(/^./,c=>c.toLowerCase())} về Ngự thú viên.${hi?" Hoàng thượng hơi phật ý.":""}`)}
 else if(k==="buy"){if(!petBuyOne(b.dataset.k))return}
 render()}
window.petDo=petDo;if(typeof wrapR==="function")wrapR("petDo",k=>({care:"Chăm thú nuôi",follow:"Cho theo hầu",free:"Gửi về Ngự thú viên",buy:"Nhờ thái giám tìm thú nuôi"})[k]||"");
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-pet]");if(!b||b.disabled)return;ev.stopPropagation();try{closeModal()}catch(e){}window.petDo(b.dataset.pet,b)},true);
/* Tư trang = bag + Đang mang (jinv) + Thú nuôi + Sổ đồ mất */
(function(){if(typeof invHTML!=="function")return;const i0=invHTML;invHTML=function(){const h=i0.apply(this,arguments);try{const x=tsbPetHTML();if(!x)return h;return h+x}catch(e){console.error("tsbPetHTML",e);return h}}})();
/* the first-time tip: once per life, when she gets her first animal */
function petTipShow(){try{kitModal({kind:"rule",title:"Thú nuôi",sub:"lời dặn lần đầu",itemPic:kitItem({src:petSrc("meomuop",1),name:"",grade:0,size:"lg"}).replace('<span class="kitn"></span>',''),facts:[
 "Mỗi con có phẩm như đồ (Thường, Tinh phẩm, Trân phẩm, Tuyệt phẩm, Ngự tứ: thần thú) và Xa xỉ N. Thú nuôi tính vào Xa xỉ như đồ đang mang: con theo hầu tính đủ, con ở tẩm cung tính nửa.",
 "Nuôi thứ quá xa xỉ so với thân phận: hậu cung ghen ghét, bề trên không vừa ý. Mức vừa phải không ai nói ra, chỉ biết qua chuyện xảy đến.",
 "Một con theo hầu: thêm 1 Tư chất. Con nào cũng có công dụng riêng và mặt trái riêng; chạm vào ô để xem.",
 "Thú lớn dần: Non → Thiếu niên → Trưởng thành → Linh thú; càng lớn công dụng càng mạnh. Lớn nhờ thời gian nuôi và Tình cảm.",
 "Mỗi tuần thú đói, bẩn, buồn dần (No, Sạch, Vui, Tình cảm). Chạm vào thú → Chăm: cho ăn, tắm, chơi, mỗi việc 1 khắc; có kẻ hầu tin cẩn thì giao được. Bỏ bê lâu: biếng ăn, ốm, rồi bỏ đi. Có con tốn bạc nuôi mỗi tháng.",
 "Thần thú Ngự tứ rất hiếm, chỉ khi đã thành Linh thú mới đỡ được một mạng cho chủ, một lần."],btn:"Đã hiểu"})}catch(e){}}
/* the clock: jtsb's endTurn wrapper calls tsbPetWeek / tsbPetMonth */
