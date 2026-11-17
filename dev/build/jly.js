/* owner 16:40Z: "Phế phi họ Lý" (the cold-palace stand-in shown while no rival has fallen) had an empty frame — no ref, so figRoles gave
   no role. She is now ONE persistent person (S.lyF, saved; same face every visit) drawn from the cold-palace consort art (tier cold:
   plain clothes, no jewellery, no forehead mark), with the matching round portrait in the talk panel.
   Loaded right after j88 (its tier-aware picker gives consort-rank dress only to the player and rivals: f88Wear). */
/* B-answers art (D50): Phế phi họ Lý, Quản sự Tân Giả khố and Thầy dạy Thượng thư phòng have their OWN identities (FIGURES-others.json roles
   fallen/steward/tutor, 4 age bands each, same manifest format). Until the manifest lists them, Lý keeps the cold-palace consort art. */
const NPCFIX={tgk:{name:"Quản sự Tân Giả khố",age:BAL.ly.npcAge.tgk,role:"steward"},ttp:{name:"Thầy dạy Thượng thư phòng",age:BAL.ly.npcAge.ttp,role:"tutor"}};
function lyArt(){try{return !!(FIGIX&&FIGIX.fallen)}catch(e){return false}}
function npcFixOf(p){if(!p||p.kind!=="npc"||p.sid)return null;const k=Object.keys(NPCFIX).find(k=>NPCFIX[k].name===p.name);if(!k||!(FIGIX&&FIGIX[NPCFIX[k].role]))return null;S.npcFix=S.npcFix||{};if(!S.npcFix[k])S.npcFix[k]={name:NPCFIX[k].name,age:NPCFIX[k].age,npcFix:k};return S.npcFix[k]}
function lyFallen(){if(!S.lyF)S.lyF={name:"Phế phi họ Lý",age:34,lyF:1};return S.lyF}
(function(){const w0=figWho;figWho=function(p){try{if(p&&p.kind==="fallen"&&!p.ref){const o=lyFallen();if(lyArt()&&o.fid&&!/^fallen:/.test(o.fid)){delete o.fid}return o}const n=npcFixOf(p);if(n)return n}catch(e){}return w0.apply(this,arguments)};
 const r0=figRoles;figRoles=function(who){if(who&&who.lyF)return lyArt()?["fallen"]:["consort"];if(who&&who.npcFix)return[NPCFIX[who.npcFix].role];return r0.apply(this,arguments)};
 const t0=figTierOf;figTierOf=function(who){if(who&&who.lyF)return -1;return t0.apply(this,arguments)};
 if(typeof f88Wear==="function"){const e0=f88Wear;f88Wear=function(who){if(who&&(who.lyF||who.npcFix))return true;return e0.apply(this,arguments)}}
 if(typeof pFaceOf==="function"){const f0=pFaceOf;pFaceOf=function(p){const r=f0.apply(this,arguments);try{if(p&&((p.kind==="fallen"&&!p.ref)||npcFixOf(p))){const src=figFor(p,"por");if(src)return Object.assign({},r,{src,hue:0})}}catch(e){}return r}}})();
