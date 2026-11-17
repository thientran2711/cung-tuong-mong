/* unit test: Công danh rule table (rank/worker/src/score.js) — node rank/worker/test/score.test.mjs */
import "../src/score.js";
const R=globalThis.CTM_RANK;let fail=0;
const eq=(a,b,m)=>{if(a!==b){fail++;console.log("FAIL",m,"got",a,"want",b)}else console.log("ok  ",m)};
const base={mr:0,sr:-1,y:0,age:16,age0:16,sons:0,daus:0,tz:0,danh:0,duc:0,tg:0,endk:"Hồng nhan bạc mệnh"};
const L=o=>Object.assign({},base,o);
/* parts */
eq(R.score(L({})).score,50,"Đáp ứng dies in the first year = (100) ×0.5 dở dang");
eq(R.score(L({})).partial,true,"under 1 year below Quý nhân = dở dang");
eq(R.score(L({mr:2})).partial,false,"Quý nhân is a full life even in year 0");
eq(R.score(L({mr:7,y:5,age:21})).score,2200+5*40,"Hoàng hậu, 5 years");
eq(R.score(L({mr:7,y:10,age:26,sons:2,daus:1,tz:1,danh:80,duc:60,endk:"Hoàng thái hậu"})).score,2200+2500+400+2*120+80+500+80*3+60*3,"Hoàng thái hậu full");
eq(R.score(L({mr:3,y:2,age:18,danh:150,duc:-20})).score,550+80+300,"Danh capped at 100, Đức floored at 0");
eq(R.score(L({mr:4,y:50,age:66})).score,800+40*40,"years capped at 40");
eq(R.score(L({mr:4,y:20,age:36,sons:10,daus:10})).score,800+800+10*120+2*80,"12 children at most, sons first");
eq(R.score(L({mr:-1,sr:4,y:3,age:19,endk:"Ma ma",mama:true})).score,160+150+120,"servant: Nữ quan + Ma ma ending");
eq(R.score(L({mr:5,y:3,age:19,rare:true,endk:"Được Vương gia che chở"})).score,1100+600+600+120,"rare ending bonus");
eq(R.score(L({mr:6,y:4,age:20,tg:9})).score,1500+160+500,"Tranh ghế capped at 5");
/* ordering: a better ending outranks a longer plain life */
const a=R.score(L({mr:7,y:6,age:22,sons:1,endk:"Hoàng thái hậu"})).score,b=R.score(L({mr:7,y:30,age:46})).score;eq(a>b,true,"Hoàng thái hậu > long Hoàng hậu life");
const c=R.score(L({mr:2,y:1,age:17})).score,d=R.score(L({mr:1,y:1,age:17})).score;eq(c>d,true,"higher rank, same time = higher score");
/* check: refused summaries */
eq(R.check(L({mr:8})),"mr","rank above Hoàng hậu refused");
eq(R.check(L({y:5,age:16})),"age vs years","age must follow the years");
eq(R.check(L({y:1,age:17,sons:5})),"kids vs years","too many children for the years");
eq(R.check(L({y:3,age:19,sons:1,tz:2})),"tz","more Thái tử than sons");
eq(R.check(L({mr:3,y:3,age:19,endk:"Mẫu hậu Hoàng thái hậu"})),"ending needs Hoàng hậu","Mẫu hậu needs Hoàng hậu");
eq(R.check(L({mr:3,y:3,age:19,endk:"Hoàng thái hậu"})),"ending needs a son","Hoàng thái hậu needs a son");
eq(R.check(L({mr:2,y:2,age:18,trail:[[0,3,"r",1],[1,2,"r",3]]})),"trail rank","trail rank above the claimed maximum");
eq(R.check(L({mr:2,y:2,age:18,trail:[[1,3,"r",1],[0,2,"r",2]]})),"trail order","trail out of order");
eq(R.check(L({mr:2,y:2,age:18,daus:1,trail:[[0,3,"r",1],[1,2,"r",2],[1,5,"k",0]]})),null,"a sane summary passes");
eq(R.check(L({mr:-1,sr:-1})),"no standing","no rank at all refused");
eq(R.phamName(L({mr:-1,sr:2})),"Đại cung nữ","servant title");eq(R.phamName(L({mr:6})),"Hoàng quý phi","consort title");
/* the most a life can score stays under the ceiling */
const top=R.score(L({mr:7,y:40,age:56,sons:12,daus:0,tz:3,danh:100,duc:100,tg:5,rare:true,endk:"Nữ đế"})).score;eq(top<=R.RULES.max,true,`best possible life ${top} ≤ ${R.RULES.max}`);
console.log(fail?`${fail} FAILED`:"ALL OK");process.exit(fail?1:0);
