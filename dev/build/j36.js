/* ================= VOICES: short human sounds on cards, by speaker and moment; one at a time, 6 s cooldown per key ================= */
const VOK=["f-laugh","f-softlaugh","f-cry","f-angry","f-gasp","f-sigh","old-hmph","m-chuckle","m-grunt","m-sigh","baby-cry","child-giggle","gossip","crowd-gasp"];
let VOX={};/* key -> [files]; from audio/VOICES.json when present, else audio/vo-<key>-1.mp3 / -2.mp3 */
(function(){try{fetch("audio/VOICES.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(!j)return;const L=Array.isArray(j)?j:j.voices||j.files||null;
 if(L){for(const x of L){const f=x.file||x.src;const k=x.key||x.id||x.name;if(f&&k)(VOX[k]=VOX[k]||[]).push(f)}}else for(const k in j){const v=j[k];if(Array.isArray(v))VOX[k]=v.map(x=>typeof x==="string"?x:x.file||x.src).filter(Boolean);else if(v&&(v.files||v.variants))VOX[k]=(v.files||v.variants)}}).catch(()=>{})}catch(e){}})();
const VOALIAS={"f-softlaugh":"f-laugh-soft","old-hmph":"old-f-hmph","m-chuckle":"m-laugh","m-grunt":"m-angry","child-giggle":"child-laugh","gossip":"crowd-gossip"};
function voFiles(k){k=VOX[k]?k:(VOALIAS[k]||k);const L=VOX[k];if(L&&L.length)return L.map(f=>/^audio\//.test(f)?f:"audio/"+f);return [1,2].map(n=>`audio/vo-${k}-${n}.mp3`)}
const VO={cur:null,last:{}};
function voice(k,force){try{if(!auOk()&&!force)return;if(!force&&Date.now()-(VO.last[k]||0)<6000)return;VO.last[k]=Date.now();const vol=OPT.vo==null?.7:OPT.vo;if(!vol)return;
 if(VO.cur){try{VO.cur.pause()}catch(e){}}const a=new Audio(pick(voFiles(k)));a.volume=vol;VO.cur=a;a.addEventListener("error",()=>{if(VO.cur===a)VO.cur=null});
 AU.duck=.6;if(AU.cur)AU.cur.volume=musVol();a.addEventListener("ended",()=>{AU.duck=1;if(AU.cur)AU.cur.volume=musVol();if(VO.cur===a)VO.cur=null});const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}}
/* which voice a card calls for: the speaker (sex, age) and the moment */
function voKind(m){const w=m.who||{};const k=(w.w||[])[0];const txt=String((m.t||"")+" "+(m.h||"")).replace(/<[^>]+>/g," ");
 const emp=k==="e"||/Hoàng thượng/.test(m.t||"");const th=w.rk==="th"||/Thái hậu/.test(m.t||"");
 if(/chào đời|hạ sinh|sinh hạ|Sinh hoàng|sinh công chúa/.test(txt))return"baby-cry";
 if(/các con|hoàng tử nhỏ|công chúa nhỏ/.test(txt)&&/chơi|sang|vui/.test(txt))return"child-giggle";
 if(/băng hà|ban chết|bại lộ|có độc|trúng độc|sảy|chết/.test(txt))return/trước mặt|cả hậu cung|yến/.test(txt)?"crowd-gasp":"f-gasp";
 if(/tin đồn|đồn rằng|rỉ tai|buôn chuyện/.test(txt))return"gossip";
 if(emp){if(/phật ý|cau mày|nổi giận|quở|trách|đuổi/.test(txt))return"m-grunt";if(/vui|cười|ban thưởng|hài lòng|khen/.test(txt))return"m-chuckle";if(/thở dài|buồn|lo/.test(txt))return"m-sigh";return null}
 if(th){if(/không vui|phật ý|trách|chau mày|lạnh lùng/.test(txt))return"old-hmph";return null}
 if(/bị phạt|giáng|quỳ|đánh|trách phạt|lãnh cung|khóc/.test(txt))return"f-cry";
 if(/mỉa mai|khiêu khích|hạ nhục|giận/.test(txt))return"f-angry";
 if(/tặng|nhận lời|tươi cười|vui lòng|cảm tạ|kết làm chị em/.test(txt))return /e lệ|khẽ/.test(txt)?"f-softlaugh":"f-laugh";
 if(/thở dài|buồn|ốm/.test(txt))return"f-sigh";return null}
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0];if(m&&m!==VO.lastCard){VO.lastCard=m;const k=voKind(m);if(k)voice(k)}}catch(e){}return r}})();
