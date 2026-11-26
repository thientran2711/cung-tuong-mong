/* jagwhyg2a: NPC-PURPOSE G2 kinds, part a (registrations only; the ONE helper is jagwhy.js; numbers in jbal2 "// G2a" block)
   Owner (OD 18/11 ~04:08Z): every NPC deed has a goal that fits her life aim; no luck. who(ctx) = people who could act, why(p, ctx) = {s, t, r} from
   her real state or null. Files: j29 (servant nết events), j42 (the cung nữ road), jcmaid (her close maid), jagknow (news sellers, a refusing servant),
   jagacts3 (gossip carried, a secret grabbed), jstip (no kind: npwPick there). */
/* ---- j29: a servant's nết acts (s = a servant of a consort) ---- */
npwReg("svSteal",{grp:"G2a",who:c=>c.s?[c.s]:[],why:s=>{const B=npwB().sv,q=netQ(s,"greed");if(q<BAL.net.qOn)return null;
 return {s:q*B.greed+(100-(s.loyal||0))*B.loy,r:"tham bạc, lòng chưa gắn với chủ"}}});
npwReg("svMarket",{grp:"G2a",who:c=>c.s?[c.s]:[],why:s=>{const B=npwB().sv,q=netQ(s,"greed");if(q<BAL.net.qOn)return null;return {s:q*B.market,r:"tham lời, lén mang hàng chợ đen"}}});
npwReg("svSpy",{grp:"G2a",who:c=>c.s?[c.s]:[],why:s=>{const B=npwB().sv,q=netQ(s,"sharp");if(q<BAL.net.qOn)return null;return {s:q*B.spy+(s.loyal||0)*B.spyLoy,r:"lanh lợi, muốn lập công với chủ"}}});
npwReg("svLeave",{grp:"G2a",who:c=>c.s?[c.s]:[],why:s=>{const B=npwB().sv;const st=(S.turn||0)-(S.lastPromo||0);
 return {s:Math.max(0,B.leaveLoy-(s.loyal||0))*B.leaveW+st*B.leaveStall,r:"chán cảnh cung chủ mãi không lên phẩm"}}});
npwReg("svTalk",{grp:"G2a",who:c=>c.s?[c.s]:[],why:s=>{const B=npwB().sv,q=netQ(s,"talk");if(q<BAL.net.qOn)return null;return {s:q*B.talk,r:"lắm lời, thích kể chuyện"}}});
/* ---- j42: the cung nữ road (the player serves m = srvM()) ---- */
npwReg("srvCard",{grp:"G2a",cdOf:p=>{const B=npwB().srvWk;return p===srvM()?B.cdM:rivals.includes(p)?B.cdR:B.cdC},who:c=>{const m=c.m;if(!m)return[];const B=BAL.srvx;let L=[m];
  try{const W=BAL.ag.why.srvWk;L=L.concat(liveRivals(true).filter(v=>v!==m&&hostility(v,m)>=netThK(v,"host","hostLo")&&(v.bac||0)>=W.bac))}catch(e){}
  try{L=L.concat(srvColleagues().filter(s=>{const a=S.srv.af[s.sid]||0;return a<0||a>=B.friendAf}))}catch(e){}return L},
 why:(p,c)=>{const B=npwB().srvWk,m=c.m;
  if(p===m){const mo=srvCardW(m,"mood"),or=srvCardW(m,"order");return mo>=or?{s:mo,t:S,r:(S.tin||0)>=B.mid?"vui lòng với ngươi":"chán ghét ngươi"}:{s:or,r:"lòng dạ hiểm, muốn hại người"}}
  if(rivals.includes(p))return {s:hostility(p,m)*B.bribe,t:m,r:"oán "+npwNm(m)+", muốn mua tai mắt trong cung nàng"};
  const a=S.srv.af[p.sid]||0;return a<0?{s:-a*B.frame,t:S,r:"ghét ngươi"}:{s:a*B.tip,t:S,r:"thân với ngươi"}}});
npwReg("srvBuy",{grp:"G2a",who:c=>{const m=c.m;if(!m)return[];const B=BAL.ag.why.srv.buy;try{return liveRivals(true).filter(x=>x!==m&&rkOf(x)>rkOf(m)+B.gap&&(x.bac||0)>=B.bac)}catch(e){return[]}},
 why:(x,c)=>{const B=npwB().srv.buy;const sk=(S.srv.rk||0)*B.rk+(S.tai||0)*B.tai,h=Math.max(0,hostility(x,c.m))*B.host;
  return {s:sk+h,t:c.m,r:h>sk?"oán "+npwNm(c.m)+", muốn lấy người hầu của nàng":"muốn có người hầu giỏi"}}});
npwReg("srvWatch",{grp:"G2a",who:c=>c.m?[c.m]:[],why:m=>{const B=npwB().srv.watch;return {s:(100-(S.tin||0))*B.tin+(hasT(m,"Kín đáo")?B.close:0),t:S,r:"không tin ngươi, sai người để mắt"}}});
npwReg("srvWed",{grp:"G2a",who:c=>c.m?[c.m]:[],why:()=>({s:(S.tin||0)*npwB().srv.wed,t:S,r:"tin cậy ngươi, muốn ban gả cho tử tế"})});
npwReg("srvBlack",{grp:"G2a",who:c=>c.v?[c.v]:[],why:(v,c)=>{const B=npwB().srv.black;const h=c.mis?Math.max(0,hostility(v,c.mis)):0;
 return {s:h*B.mis+Math.max(0,hostility(v,S))*B.me+(v.malice||0)*B.mal,t:S,r:h>0?"oán "+npwNm(c.mis)+", muốn có tai mắt trong cung nàng":"ác tâm, muốn nắm thóp ngươi"}}});
npwReg("srvSearch",{grp:"G2a",who:c=>c.mis?[c.mis]:[],why:m=>{const B=npwB().srv.search;
 return {s:(S.srv.rumor||0)*B.rum+(100-(S.tin||0))*B.tin+Math.max(0,nv(m,"affairRumor"))*B.nv,t:S,r:"nghe lời đồn, nghi ngươi"}}});
npwReg("srvPrince",{grp:"G2a",who:c=>c.pr?[c.pr]:[],why:pr=>({s:(pr.tinh||0)*npwB().srv.prince,t:S,r:"đem lòng thương ngươi"})});
/* ---- jcmaid: her close maid (m = S.maid) and the houses around her ---- */
npwReg("cmSpy",{grp:"G2a",who:c=>c.p?[c.p]:[],why:m=>({s:(m.loyal||0)*npwB().cm.spy,t:S,r:"trung với ngươi, nghe ngóng giúp chủ"})});
npwReg("cmLeak",{grp:"G2a",who:c=>c.p?[c.p]:[],why:(m,c)=>{const B=npwB().cm;const k=c.s&&c.s.k;
 return {s:(100-(m.loyal||0))*B.leak+(k==="debt"?B.debt:k==="family"?B.home:k==="spy"?B.spyBy:0),r:k==="debt"?"nợ nần, túng quẫn":k==="family"?"nhớ nhà, lòng xao động":"đã nhận bạc của người khác"}}});
npwReg("cmConf",{grp:"G2a",who:c=>c.p?[c.p]:[],why:m=>({s:(m.loyal||0)*npwB().cm.conf,t:S,r:"tin ngươi, muốn thú thật"})});
npwReg("cmTt",{grp:"G2a",who:c=>c.p?[c.p]:[],why:()=>({s:npwB().cm.ttB+(S.sung||0)*npwB().cm.tt,t:S,r:"Tể tướng phủ muốn dò ý Hoàng thượng qua ngươi"})});
npwReg("cmBrawl",{grp:"G2a",who:c=>c.p?[c.p]:[],why:m=>{const v=cmFoe();if(!v)return null;const B=npwB().cm;
 return {s:Math.max(0,hostility(v,S))*B.brawl+(m.loyal||0)*B.brLoy,t:v,r:"nóng tính, bênh ngươi trước người của "+v.name}}});
npwReg("cmScorn",{grp:"G2a",who:()=>{try{return liveRivals(true).filter(v=>v!==S&&!v.coop)}catch(e){return[]}},why:v=>({s:Math.max(0,hostility(v,S))*npwB().cm.scorn,t:S,r:"oán ngươi, cho người bới lỗi cung nữ của ngươi"})});
npwReg("cmLand",{grp:"G2a",who:()=>{try{return liveRivals(true).filter(v=>v!==S&&!v.coop&&eyes(v)>0)}catch(e){return[]}},why:v=>({s:Math.max(0,hostility(v,S))*npwB().cm.land,t:S,r:"oán ngươi, mách Cung Chính ti"})});
npwReg("cmTh",{grp:"G2a",who:c=>c.p?[c.p]:[],why:m=>({s:(m.loyal||0)*npwB().cm.th,t:S,r:"trung với ngươi, nói tốt với Thái hậu"})});
/* ---- jagknow: a news seller; a servant who refused a bribe tells her master ---- */
npwReg("knSell",{grp:"G2a",lim:()=>knSB().try,who:c=>c.x?knSellCands(c.x):[],why:(s,c)=>{const B=npwB().kn,w=knSellW(s),nd=knSellNeed(s);if(nd<=0&&netQ(s,"greed")<BAL.net.qOn)return null;
 if(!knSellNews(c.x,s).length)return null;return {s:B.base+w*B.will+nd*B.need,t:c.x,r:nd>0?"túng bạc, có tin trong tay":"tham bạc, có tin trong tay"}}});
npwReg("tmTell",{grp:"G2a",who:c=>c.s?[c.s]:[],why:(s,c)=>(s.loyal||0)<BAL.loy.mid?null:{s:(s.loyal||0)*npwB().kn.tell,t:c.o,r:"trung với chủ"}});
/* ---- jagacts3: a malicious listener keeps a shared secret against the teller ---- */
npwReg("p3Grab",{grp:"G2a",who:c=>c.v?[c.v]:[],why:(v,c)=>{const B=npwB().p3;const h=Math.max(0,hostility(v,c.p));
 return {s:h*B.host+Math.max(0,(v.malice||0)-BAL.talk.secretMal)*B.mal,t:c.p,r:"ác tâm, ghi nhớ để nắm thóp"}}});
