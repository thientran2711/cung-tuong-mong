// In-page outside-route policy (jkc): window.__kcRun(pol) plays the home road from kcInit to the palace entry or an ending.
// pol 'sens' = sensible bot, 'rand' = random bot. Used by kcbot.js (outside outcomes) and kchh.js (HH both paths).
window.__kcLesson=function(k){const l=S.arts[k],cost=5+l*5;if(!can(2)||l>=5||S.bac<cost)return;apply({suc:-10,bac:-cost});spend(2);addArt(k,2+R(2))};
window.__kcRun=function(pol){const lesson=window.__kcLesson;const sens=pol==='sens';let guard=0;

   const bad=/tự vẫn|Thắt cổ|Cắt tóc|bến sông|Đến bến|Nhận lời nhà|Cãi lại|Dùng thử|Im lặng$|Mặc nàng|Xin cha lo cho được miễn|Cáo bệnh|mở lớp/i;
   function choose(m){const O=m.opts.map((c,i)=>[c,i]).filter(([c])=>!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));if(!O.length){Q.shift();return}
    if(!sens){const [c,i]=O[Math.floor(Math.random()*O.length)];chooseM(i);return}
    const rare=O.find(([c])=>c.r97);if(rare&&Math.random()<.5){chooseM(rare[1]);return}
    let L=O.filter(([c])=>!bad.test(c.n)&&!c.r97);if(m.t==="Trả thẻ bài"||/Lên kiệu|Gả cho|Vâng lời cha/.test(O.map(x=>x[0].n).join("|"))&&!L.length)L=O.filter(([c])=>/Gả cho|Lên kiệu|Vâng lời/.test(c.n));
    if(/Sơ tuyển/.test(m.t)){const br=O.find(([c])=>/Dúi bạc/.test(c.n));if(br&&S.bac>=120){chooseM(br[1]);return}}
    if(m.t==="Trả thẻ bài"){const g=O.find(([c])=>/^Gả cho/.test(c.n));if(g){chooseM(g[1]);return}}
    if(!L.length)L=O;const [c,i]=L[Math.random()<.6?0:Math.floor(Math.random()*L.length)];chooseM(i)}
   function cardBy(re){return deck.map((a,i)=>[a,i]).find(([a])=>re.test(a.n)&&!a.done&&!a.lock&&can(cardCost(a))&&canPay(a))}
   function goPlace(k){if(S.place!==k&&!kcGoWhy(k)){kcGo(k);return true}return false}
   const _act=act;const actX=i=>{window.__mv=0;_act(i)};
   function step(){if(S.dead||!isKc())return false;if(Q.length){const m=Q[0];if(m.opts&&m.opts.length)choose(m);else Q.shift();return true}
    if(!sens){if(Math.random()<.15){const ks=Object.keys(KCPL).filter(k=>!kcGoWhy(k));if(ks.length){kcGo(ks[Math.floor(Math.random()*ks.length)]);return true}}
     const L=deck.map((a,i)=>[a,i]).filter(([a])=>!a.done&&!a.lock&&can(cardCost(a))&&canPay(a));if(L.length&&Math.random()<.7){act(L[Math.floor(Math.random()*L.length)][1]);return true}
     if(Math.random()<.3&&can(2)){const k=ARTS[Math.floor(Math.random()*5)].k;const u0=used;lesson(k);if(used!==u0)return true}
     nextBuoi();return true}
    /* sensible: rest when tired, learn arts and etiquette, keep the elders' favour, write letters, fend off matches */
    if(used>=4||(window.__mv=(window.__mv||0)+1)>6){window.__mv=0;nextBuoi();return true}
    if(S.suc<35){if(goPlace("kc_khue"))return true;const a=cardBy(/^Nghỉ ngơi/);if(a){actX(a[1]);return true}nextBuoi();return true}
    if(S.kc.suit.length&&S.kap>=55){if(goPlace("kc_sanh"))return true;const a=cardBy(/^Khéo từ chối/)||cardBy(/^Giả bệnh/);if(a){actX(a[1]);return true}}
    const one=[/^Viết thư vào cung/,/^Xin cha tiền riêng/,/^Gửi quà vào cung/];for(const re of one){const a=cardBy(re);if(a&&(!/Gửi quà/.test(a[0].n)||S.bac>120)){actX(a[1]);return true}}
    const cha=kcR("cha"),to=kcR("to");
    if(cha&&S.kc.at[cha.id]===S.place){const a=cardBy(/^Hầu cha/)||cardBy(/^Thỉnh an phụ/);if(a){actX(a[1]);return true}}
    if(to&&S.kc.at[to.id]===S.place){const a=cardBy(/^Thỉnh an tổ/);if(a){actX(a[1]);return true}}
    const best=kcBestArt(),lv=S.arts[best]||0;const u0=used;
    if(lv<4&&can(2)&&S.bac>=5+lv*5+20){lesson(best);if(used!==u0)return true}
    if(S.kc.le<5&&S.bac>=40&&can(3)){if(goPlace("kc_hoc"))return true;const a=cardBy(/^Học lễ nghi/);if(a){actX(a[1]);return true}}
    if(cha&&S.kc.at[cha.id]&&cha.af<70&&Math.random()<.5){if(goPlace(S.kc.at[cha.id]))return true}
    if(Math.random()<.15){if(goPlace("kc_chua"))return true;const a=cardBy(/^Đi lễ chùa/);if(a){actX(a[1]);return true}}
    const k2=ARTS.filter(a=>a.k!==best&&a.k!=="y").sort((a,b)=>(S.arts[b.k]||0)-(S.arts[a.k]||0))[0];if(k2&&(S.arts[k2.k]||0)<3&&can(2)&&S.bac>=40){lesson(k2.k);if(used!==u0)return true}
    if(goPlace("kc_khue"))return true;const a=cardBy(/^Đọc sách/)||cardBy(/^Nghỉ ngơi/);if(a){actX(a[1]);return true}
    nextBuoi();return true}
   const ring=[];const st0=step;const stepR=()=>{const k=Q.length?('Q:'+Q[0].t+':'+(Q[0].pid||'')+(Q[0].pp?JSON.stringify(Q[0].pp):'')):(S.place+'/'+S.buoi+'/'+used+'/'+S.suc);ring.push(k);if(ring.length>8)ring.shift();return st0()};
   while(guard++<6000&&stepR()){}
 return {guard,ring:guard>=6000?ring:null}};
