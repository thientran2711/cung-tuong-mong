/* jagwhyg2c: NPC-PURPOSE G2 kinds, part c (registrations only; the ONE helper is jagwhy.js; numbers in jbal2 "// G2c" block) */
/* ---- jface: harm to servants, a slap answered ---- */
npwReg("fxSrvHarm",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(s,c)=>{const B=BAL.ag.why.fxSrv;const lo=s.loyal!=null&&s.loyal<BAL.loy.out;if(!s.grudge&&!lo)return null;
 const t=npwPick(c.mates||[],x=>1+Math.max(0,(x.loyal||0)-(s.loyal||0)));if(!t)return null;
 return {s:(s.grudge?B.grudge:0)+(lo?npwB().min+(BAL.loy.out-s.loyal)*B.loyW:0)+Math.max(0,netQ(s,"spite"))*B.spite,t,r:s.grudge?"mang oán trong lòng, trút lên bạn hầu":"ghen ghét bạn hầu được chủ tin hơn"}}});
npwReg("fxRivSrv",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(v,c)=>{const B=BAL.ag.why.fxSrv,h=hostility(v,S);if(h<B.hot)return null;
 const t=npwPick((S.staff||[]).concat(S.maid&&typeof S.maid==="object"?[S.maid]:[]),x=>KIT_FACEFX.live(x)?1+Math.max(0,x.loyal||0):0);if(!t)return null;
 return {s:h*mindW(v,"scheme"),t,r:"oán ngươi, ra tay với người hầu của ngươi"}}});
npwReg("fxRivSrv2",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(v,c)=>{const B=BAL.ag.why.fxSrv;const t=npwPick(liveRivals(true).filter(x=>x!==v&&(x.staff||[]).length),x=>hostility(v,x)-B.hot2);if(!t)return null;
 return {s:hostility(v,t)*mindW(v,"scheme"),t,r:"oán "+npwNm(t)}}});
npwReg("fxSlapBack",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(m,c)=>{const B=BAL.ag.why.fxSrv;let a=0;try{a=Math.max(0,-aff(m,S))}catch(e){}
 const s=B.slapBase+Math.max(0,netQ(m,"spite"))*B.spite+a-Math.max(0,netQ(m,"timid"))*B.timidSl;return s>0?{s,t:S,r:"giận vì bị cãi lại"}:null}});
/* ---- jemo: a child's glad mood needs a real cause ---- */
npwReg("emoKid",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(k,c)=>{const B=BAL.ag.why.emo,m=c.m;if(!m)return null;const e=emoGet(m);
 const sib=(m===S?(S.kids||[]):(m.kids||[])).filter(x=>x!==k&&x.alive).length;let pets=0;try{pets=tsbPets(m).length}catch(x){}
 const x=npwPick([{s:e.w===c.W&&e.k==="vui"?e.v:0,r:"mẫu thân vui vẻ, chơi đùa cùng con"},{s:sib*B.kidSib,r:"được chơi cùng anh chị em"},{s:pets*B.kidPet,r:"được chơi với thú nuôi trong cung"}],y=>y.s);
 return x?{s:x.s,r:x.r}:null}});
/* ---- jil: the item market (buy back, buy, ask back) ---- */
npwReg("ilBack",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(o,c)=>{const W=BAL.ag.why.g2il;return {s:W.back+ilVal(c.x.e)/W.valDiv,r:"muốn chuộc lại "+ilNm(c.x.e)}}});
npwReg("ilBuy",{grp:"G2c",who:c=>liveRivals(true).filter(v=>v!==c.o&&!v.coop/* E44g T5 (law 6c): the co-op friend is a player seat, never an NPC buyer (the piece landed on the host's copy of her entry, no op) */),why:(v,c)=>{const s=ilWant(v,c.x,c.o);return s>0?{s,r:"muốn có "+ilNm(c.x.e)}:null}});
npwReg("ilConf",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(o,c)=>{const W=BAL.ag.why.g2il;const s=W.conf+ilVal(c.x.e)/W.valDiv-Math.max(0,netQ(o,"timid"))*W.timid;return s>0?{s,r:"muốn xin lại "+ilNm(c.x.e)}:null}});
/* ---- j83: her handmade work, poison seeking ---- */
npwReg("wkUse",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(v,c)=>{let b=0;for(const o of wkUseOpts(v,c.w))b=Math.max(b,o.s);return b>0?{s:b,r:"dùng đồ tự làm cho việc riêng"}:null}});
/* (illSeek removed: an NPC consort seeks đồ cấm only as a day-plan choice now — role-parity part 2, jagacts4 cx4:ill<route> + IROUTE / illBuy) */
/* ---- jrcp: allergy accusation, maid's gossip, a friend's pattern, Thái hậu's sutra ---- */
npwReg("rcpAcc",{grp:"G2c",cd:"rcpAcc",who:c=>c.p?[c.p]:[],why:(q,c)=>{const B=BAL.ag.why.g2rcp;if(q===c.v)return {s:B.acc+Math.max(0,hostility(q,c.a)),t:c.a,r:"phát bệnh vì đồ "+npwNm(c.a)+" dâng"};
 if(q.queen)return {s:B.acc,t:c.a,r:"giữ phép lục cung"};const h=hostility(q,c.a);return h>=netThK(q,"host","hostLo")?{s:h,t:c.a,r:"oán "+npwNm(c.a)+", nhân cớ tố cáo"}:null}});
npwReg("rcpGos",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(m,c)=>{const B=BAL.ag.why.g2rcp,l=(m.loyal||0)-BAL.loy.mid;return l>0?{s:B.gos+l,r:"lo cho chủ, dò hỏi khẩu vị người trên"}:null}});
npwReg("rcpGift",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(v,c)=>{const r=rel(v,S)||0;return r>=netTh(v,"than")?{s:BAL.ag.why.g2rcp.gift+r,t:S,r:"thân với ngươi, chép mẫu gửi tặng"}:null}});
npwReg("rcpTh",{grp:"G2c",who:c=>S.thDead?[]:[S.thO||(S.thO={})],why:(p,c)=>{const B=BAL.ag.why.g2rcp,v=(S.th||0)-netTh("th","than2");return v>=0?{s:B.thBase+v,t:S,r:"thương ngươi hiếu thuận"}:null}});
/* ---- jpet: Hoàng hậu's and a man's pet gifts ---- */
npwReg("petHh",{grp:"G2c",who:c=>{const q=queenP();return q?[q]:[]},why:(q,c)=>{const B=BAL.ag.why.g2pet,v=(c.p.hh||0)-B.hhMin;return v>=0?{s:B.base+v,t:c.p,r:"ưng ý "+npwNm(c.p)+", ban thú nuôi"}:null}});
npwReg("petMan",{grp:"G2c",who:c=>(S.men||[]).filter(m=>m.alive),why:(m,c)=>(m.tinh||0)>=BAL.ag.why.g2pet.manTinh?{s:m.tinh,t:S,r:"tình sâu với ngươi, gửi lén thú nhỏ"}:null});
/* ---- jthaiy: the physician leaks the mạch án; a rival buys the physician ---- */
npwReg("thyLeak",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(d,c)=>{const B=BAL.ag.why.g2thy,a=d.af||{};const s=B.leak+(a[c.by.id]||0)-Math.max(0,a.me||0);return s>0?{s,t:c.by,r:"nhận bạc của "+npwNm(c.by)+", lén báo mạch án"}:null}});
npwReg("thyTell",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(d,c)=>({s:BAL.ag.why.g2thy.tell+c.me,t:S,r:"quý ngươi, hạ giọng kể mạch án"})});
npwReg("thyBribe",{grp:"G2c",who:c=>c.p?[c.p]:[],why:(v,c)=>{const t=npwPick(c.tg||[],x=>hostility(v,x));if(!t)return null;return {s:hostility(v,t)*mindW(v,"scheme"),t,r:"oán "+npwNm(t)+", mua chuộc thái y"}}});
