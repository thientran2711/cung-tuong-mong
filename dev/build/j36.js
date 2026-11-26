/* ================= VOICES: short human sounds on cards, by speaker and moment; one at a time, 6 s cooldown per key ================= */
const VOK=["f-laugh","f-softlaugh","f-cry","f-angry","f-gasp","f-sigh","old-hmph","m-chuckle","m-grunt","m-sigh","baby-cry","child-giggle","gossip","crowd-gasp"];
let VOX={};/* key -> [files]; from audio/VOICES.json when present, else audio/vo-<key>-1.mp3 / -2.mp3 */
(function(){try{fetch("audio/VOICES.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(!j)return;const L=Array.isArray(j)?j:j.voices||j.files||null;
 if(L){for(const x of L){const f=x.file||x.src;const k=x.key||x.id||x.name;if(f&&k)(VOX[k]=VOX[k]||[]).push(f)}}else for(const k in j){const v=j[k];if(Array.isArray(v))VOX[k]=v.map(x=>typeof x==="string"?x:x.file||x.src).filter(Boolean);else if(v&&(v.files||v.variants))VOX[k]=(v.files||v.variants)}}).catch(()=>{})}catch(e){}})();
const VOALIAS={"f-softlaugh":"f-laugh-soft","old-hmph":"old-f-hmph","m-chuckle":"m-laugh","m-grunt":"m-angry","child-giggle":"child-laugh","gossip":"crowd-gossip"};
function voFiles(k){k=VOX[k]?k:(VOALIAS[k]||k);const L=VOX[k];if(L&&L.length)return L.map(f=>/^audio\//.test(f)?f:"audio/"+f);return [1,2].map(n=>`audio/vo-${k}-${n}.mp3`)}
const VO={cur:null,last:{}};
function voice(k,force){try{if(!auOk()&&!force)return;if(!force&&Date.now()-(VO.last[k]||0)<6000)return;VO.last[k]=Date.now();const vol=OPT.vo==null?.7:OPT.vo;if(!vol)return;
 if(VO.cur){try{VO.cur.pause()}catch(e){}}const a=typeof auSrc==="function"?auSrc(new Audio(),pick(voFiles(k))):new Audio(pick(voFiles(k)));a.volume=vol;VO.cur=a;a.addEventListener("error",()=>{if(VO.cur===a)VO.cur=null});
 AU.duck=.6;if(AU.cur)AU.cur.volume=musVol();a.addEventListener("ended",()=>{AU.duck=1;if(AU.cur)AU.cur.volume=musVol();if(VO.cur===a)VO.cur=null});const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}}
/* which voice a card calls for: the MEANING of the card first (tone), then the speaker (sex, age).
   Owner 11/15 ("Có người đến": a consort sends back my gift, 'không dám nhận', played a laugh): a word like "tặng" says nothing about the
   mood. Tones: shock · gossip · hostile · mocking · sad · cold (polite refusal, distance) · joyful (only real joy words, never negated) ·
   neutral. A laugh only for mocking (f) or joyful; cold / neutral = no voice (the card keeps its soft open chime). */
const VOT={
 shock:/băng hà|ban chết|bại lộ|có độc|trúng độc|sảy thai|sảy|chết|kinh hãi|thất kinh/,
 gossip:/tin đồn|đồn rằng|rỉ tai|buôn chuyện|xì xào|bàn tán/,
 hostile:/buộc tội|chất vấn|sầm sập|quát|mắng|nổi giận|giận dữ|phẫn nộ|đe dọa|hăm dọa|trừng mắt|quở|trách|vu cáo|tố cáo|vạch mặt|phật ý|cau mày|chau mày|sa sầm|nổi trận|đuổi/,
 mocking:/che miệng cười|bụm miệng cười|cười như không cười|mỉa mai|chế giễu|cười nhạo|cười khẩy|cười mỉa|khinh khỉnh|giễu cợt|châm chọc|hạ nhục|khiêu khích|bĩu môi/,
 sadStrong:/khóc|rơi lệ|nghẹn ngào|nức nở|bị phạt|phạt quỳ|giáng|lãnh cung|bị đánh|đánh đòn|trượng|tang lễ|qua đời|mất con/,
 sad:/thở dài|buồn|chia ly|biệt ly|hòa thân|không (được )?về thăm|khách chê|bị chê|chê bai|chê cười|ủ rũ|đau lòng|ốm|lâm bệnh|tủi/,
 cold:/không dám nhận|trả lại|gửi trả|từ chối|khước từ|cáo lui|lạnh nhạt|lạnh lùng|né tránh|xa cách|không tiếp|đóng cửa không|làm ngơ/,
 joy:/vui mừng|mừng rỡ|hớn hở|tươi cười|cười tươi|rạng rỡ|vui vẻ|kết làm chị em|kết nghĩa|cười khúc khích|reo lên|hoan hỉ|đắc ý cười/,
 warm:/nhận lời|cảm tạ|vui lòng|cảm kích|mỉm cười|e lệ|hài lòng|khen|ban thưởng/,
 neg:/không (hề |còn |mấy )?(vui|mừng|hài lòng|cười|khen)|chẳng (vui|mừng|cười)|chưa (vui|hài lòng)|kém vui|mất vui/};
function voTone(txt){const t=String(txt||"");
 if(VOT.shock.test(t))return"shock";if(VOT.gossip.test(t))return"gossip";if(VOT.hostile.test(t)||VOT.neg.test(t))return"hostile";
 if(VOT.mocking.test(t))return"mocking";if(VOT.sadStrong.test(t))return"sadStrong";if(VOT.cold.test(t))return"cold";if(VOT.sad.test(t))return"sad";
 if(VOT.joy.test(t))return"joy";if(VOT.warm.test(t))return"warm";return"neutral"}
/* tone × speaker → voice key (null = no voice) */
const VOMAP={
 emp:{hostile:"m-grunt",mocking:"m-grunt",sadStrong:"m-sigh",sad:"m-sigh",joy:"m-chuckle",warm:"m-chuckle"},
 th:{hostile:"old-hmph",mocking:"old-hmph",cold:"old-hmph"},
 f:{hostile:"f-angry",mocking:"f-angry",sadStrong:"f-cry",sad:"f-sigh",joy:"f-laugh",warm:"f-softlaugh"}};
function voKind(m){const w=m.who||{};const k=(w.w||[])[0];const txt=String((m.t||"")+" "+(m.h||"")).replace(/<[^>]+>/g," ");
 const emp=k==="e"||/Hoàng thượng/.test(m.t||"");const th=w.rk==="th"||/Thái hậu/.test(m.t||"");
 if(/chào đời|hạ sinh|sinh hạ|Sinh hoàng|sinh công chúa/.test(txt))return"baby-cry";
 const tone=voTone(txt);
 if(/các con|hoàng tử nhỏ|công chúa nhỏ/.test(txt)&&/chơi|sang|vui/.test(txt)&&(tone==="joy"||tone==="warm"||tone==="neutral"))return"child-giggle";
 if(tone==="shock")return/trước mặt|cả hậu cung|yến/.test(txt)?"crowd-gasp":"f-gasp";
 if(tone==="gossip")return"gossip";
 const M=emp?VOMAP.emp:th?VOMAP.th:VOMAP.f;return M[tone]||null}
window.voTone=voTone;window.VOT=VOT;window.VOMAP=VOMAP;
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0];if(m&&m!==VO.lastCard){VO.lastCard=m;const k=voKind(m);if(k)voice(k)}}catch(e){}return r}})();
