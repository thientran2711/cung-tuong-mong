/* jagwhyg2d: NPC-PURPOSE G2 kinds, part d (registrations only; the ONE helper is jagwhy.js; numbers in jbal2 "// G2d" block) */
/* Each kind: who(ctx) = the people who could act, why(p, ctx) = {s, t, r} from her real state or null (no reason → nothing happens).
   Numbers: BAL.ag.why (jbal2 "// G2d" block). Report: dev/handover/reports/npc-purpose.md §G2 (handover branch). */
/* ---- jcycle: foes read / forge the cycle book (grudge = hostility ≥ BAL.cyc.foeHost; access = her informants) ---- */
function g2dCyWho(c){return (c.F||[]).filter(v=>v&&v!==c.t&&hostility(v,c.t)>=BAL.cyc.foeHost)}
function g2dCyWhy(v,c){const W=npwB().cyRead;return{s:hostility(v,c.t)*W.host+eyes(v)*W.eye,t:c.t,r:"oán "+npwNm(c.t)}}
npwReg("cyRead",{grp:"G2",each:true,who:g2dCyWho,why:g2dCyWhy});
npwReg("cyLie",{grp:"G2",who:g2dCyWho,why:g2dCyWhy});
npwReg("cyForge",{grp:"G2",who:c=>g2dCyWho(c).filter(v=>(v.bac||0)>=BAL.cyc.forgeBac),
 why:(v,c)=>({s:hostility(v,c.t)*mindW(v,"scheme")*npwB().cyRead.forge,t:c.t,r:"oán "+npwNm(c.t)+", đút lót Kính sự phòng"})});
/* ---- jdh2: the Emperor confiscates / bestows from his own favour; the seal taker = jlost's loTake rules ---- */
npwReg("dhConf",{grp:"G2",who:()=>S.emp?[S.emp]:[],why:(e,c)=>{const W=npwB().dhConf;const P=((BAL.dh.conf.p||{})[c.kind]||[])[c.i]||0;if(!c.p||P<=0)return null;
 return{s:W.base+P*W.sev-Math.max(0,c.p.sung||0)*W.sung,t:c.p,r:"giận "+npwNm(c.p)+" phạm lỗi, thu lại ân điển"}}});
npwReg("dhTake",{grp:"G2",who:c=>NPW.reg.loTake?NPW.reg.loTake.who(c):[],why:(v,c)=>NPW.reg.loTake.why(v,c)});
npwReg("dhHieu",{grp:"G2",who:()=>S.emp?[S.emp]:[],why:(e,c)=>{const W=npwB().dhHieu;if(!c.p)return null;
 return{s:W.base+Math.max(0,c.p.sung||0)*W.sung+Math.max(0,c.p.danh||0)*W.danh,t:c.p,r:"sủng ái "+npwNm(c.p)+", ban hiệu"}}});
/* ---- jaudit: the mistress raises the trusted servant she values most ---- */
npwReg("dbPromo",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>{const W=npwB().dbPromo,T=BAL.loy.trust;const s=npwPick(c.L||[],x=>1+(x.loyal||0)-T);if(!s)return null;
 return{s:W.base+((s.loyal||0)-T)*W.loy,t:s,r:"tin dùng "+(s.name||"người hầu")+", muốn cất nhắc"}}});
/* ---- jeitem: a servant pilfers from greed, a spy's errand or a grudge against her mistress (ch = her inclination from eitPilWho) ---- */
npwReg("eitPil",{grp:"G2",each:true,who:c=>(c.C||[]).map(x=>x.s),why:(s,c)=>{const W=npwB().eitPil;const x=(c.C||[]).find(y=>y.s===s);if(!x)return null;const g=netQ(s,"greed");
 if(s.spyFor!=null)return{s:x.ch+W.spy,t:c.p,r:"làm tai mắt cho người ngoài, lấy đồ của chủ"};
 if(g>0)return{s:x.ch+g*W.greed,t:c.p,r:"tham của, lấy bớt đồ chủ được ban"};
 if((s.loyal|0)<BAL.eit.pil.loyal)return{s:npwB().min+x.ch+((s.loyal|0)<W.sour?W.sourS:0),t:c.p,r:"bất mãn với chủ, lấy bớt đồ"};return null}});/* G1 #12: a servant under the old candidacy gate (eit.pil.loyal) has her reason from why.min (was only < sour, x.ch + sourS: servants at 20–44 lòng lost it, pilfering fell to 0.4 of LIVE) */
/* ---- jexam: the grown Emperor remembers the quyền thần only when his favour for her is low ---- */
npwReg("psStrike",{grp:"G2",who:()=>S.emp?[S.emp]:[],why:()=>{const W=npwB().psStrike;const g=W.top-(S.sung||0);if(g<=0)return null;
 return{s:W.base+g*W.sung,t:S,r:"không còn sủng ngươi, nhớ chuyện cũ nhà quyền thần"}}});
/* ---- jkh: the false birth-date accuser = a schemer with a grudge (khMotive + evidence already checked by the caller) ---- */
npwReg("khAcc",{grp:"G2",who:c=>c.L||[],why:(v,c)=>{const W=npwB().khAcc;return{s:W.base+danger(v,c.m)*mindW(v,"scheme")*W.k,t:c.m,r:"oán "+npwNm(c.m)}}});
/* ---- jty: the plotter / the one who hires robbers = an enemy (tyEnemies) with a grudge ---- */
function g2dTyWhy(tag){return (v,c)=>{const W=npwB().tyPlot;return{s:W.base+danger(v,c.t)*mindW(v,"scheme")*W.k,t:c.t,r:"oán "+npwNm(c.t)+", "+tag}}}
npwReg("tyPlot",{grp:"G2",who:c=>c.t?tyEnemies(c.t):[],why:g2dTyWhy("sai người dò giờ ra vào")});
npwReg("tyRob",{grp:"G2",who:c=>c.t?tyEnemies(c.t):[],why:g2dTyWhy("thuê người giật y phục")});
/* ---- jtruth / jwd92b: framing and planting from malice at a real target ---- */
npwReg("tFrame",{grp:"G2",who:c=>c.A||[],why:(a,c)=>{const W=npwB().tFrame;const t=npwPick(tFrameV(a,c.L||[]),x=>W.env+Math.max(0,(x.sung||0)-(a.sung||0))*W.gap+Math.max(0,hostility(a,x))*W.host);if(!t)return null;
 return{s:(a.malice||0)*W.mal+Math.max(0,hostility(a,t))*W.host,t,r:"ghen ghét "+npwNm(t)+", vu oan nàng"}}});
npwReg("wdFrame",{grp:"G2",who:c=>c.v?[c.v]:[],why:(v,c)=>{const W=npwB().tFrame;const t=npwPick(c.L||[],x=>hostility(v,x));if(!t)return null;
 return{s:hostility(v,t)*W.host+(v.malice||0)*W.mal,t,r:"oán "+npwNm(t)+", gài hàng cấm vào rương"}}});
/* ---- jveil: a friend sends a veil to the scarred one she cares for ---- */
npwReg("vlGift",{grp:"G2",who:c=>c.F||[],why:(v,c)=>({s:aff(v,c.t)*npwB().vlGet.aff,t:c.t,r:"thương "+npwNm(c.t)+" mang sẹo, gửi mạng che mặt"})});
/* ---- jtds: she makes a workshop piece when her craft plan calls for one ---- */
npwReg("tdsMake",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>{const W=npwB().tdsMake;const lv=typeof wkLv==="function"?wkLv(p,c.k):0;const poor=(p.bac||0)<W.poor;
 let fr=false;try{fr=liveRivals(true).some(x=>x!==p&&aff(p,x)>=netTh(p,"than"))}catch(e){}
 return{s:W.base+lv*W.lv+(poor?W.sell:0)+(fr?W.gift:0),r:poor?"thiếu bạc, làm đồ đem bán":fr?"làm quà tặng người thân":"luyện tay nghề"}}});
/* ---- j13: a physician really bribed (thyBribedBy) worsens her illness for the briber ---- */
npwReg("thyHarm",{grp:"G2",who:c=>c.b?[c.b]:[],why:(b,c)=>{const W=npwB().thyHarm;const h=hostility(b,c.p);return h>0?{s:W.base+h*W.host,t:c.p,r:"oán "+npwNm(c.p)+", đã đút lót thái y"}:null}});
/* ---- j28: she spends her week on someone she feels strongly about ---- */
npwReg("socDeed",{grp:"G2",who:c=>c.v?[c.v]:[],why:(v)=>{const W=npwB().socDeed;let m=0;try{for(const x of others(v)){const f=Math.abs(aff(v,x))*W.aff+oan(v,x)*W.oan;if(f>m)m=f}}catch(e){}
 return{s:W.base+m,r:"để tâm đến người trong cung"}}});
/* ---- j32: the rival with the worst grudge bribes the midwife ---- */
npwReg("midBribe",{grp:"G2",who:c=>c.f||[],why:(x,c)=>({s:danger(x,c.p)*mindW(x,"bribe")*npwB().midBribe.k,t:c.p,r:"oán "+npwNm(c.p)+", đút lót bà đỡ"})});
