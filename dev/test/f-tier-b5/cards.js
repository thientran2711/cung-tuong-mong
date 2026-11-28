/* F-TIER-B5: the batch-5 exit-mixed sets the probe can build on the page (og = origin to start; build = page code that queues ONE card) */
const KC=(e,t,pre)=>({id:'kc-'+e,og:'tt',shot:/^(tmtron|dinhhon2|trave)$/.test(e),build:`${pre||''};if(!S.kc.suit.length)S.kc.suit.push(kcSuitor());pushDil(mkP("kcE",{e:"${e}",s:S.kc.suit[0]}),"${t}")`});
const TM=`if(!S.tm96){const m=mkMan96(S.origin.k);if(!m)return "no man";S.tm96={k:S.origin.k,mid:m.id,h:95,sus:0,ev:0,rise:1,tok:1,v:1}}`;
const KC3=(a,b,og,pre)=>({id:'kc3-'+a+'-'+b,og,shot:a==='tm96z',build:`${pre||''};S.kc.c3=1;S.kc.kd=0;const A=kc3Thread("${a}");if(!A)return "no thread";A.cur="${b}";A.i=A.seq.length-1;S.kc.ar={plan:["${a}"],i:0,A};
 if(!S.kc.suit.length)S.kc.suit.push(kcSuitor());const bt=kc3Beat(A,"${b}");const O=kc3Opts(A,bt);pushDil(mkP("kc3",{a:A.a,b:"${b}",o:O.map(o=>kc3Od(A,o,bt))}),KCA[A.a].t)`});
module.exports=[
 KC('doc','Chén canh lạ'),KC('tmtron','Lời rủ trốn đi',TM),KC('moi','Bà mối đến nhà','S.kap=99'),KC('dinhhon','Cha định hôn'),KC('dinhhon2','Cha định hôn'),
 KC('chieu','Chiếu tuyển tú','S.kap=99;S.bac=999'),KC('trave','Trả thẻ bài','S.tai=30'),{...KC('trave','Trả thẻ bài','S.tai=80'),id:'kc-trave-tai80',shot:false},
 {id:'kc2-d_xd',og:'nc',build:`pushDil(mkP("kcE",{e:"d_xd"}),"Xuân Đào")`},
 {id:'kc2-n_c1',og:'nc',shot:true,build:`pushDil(mkP("kcE",{e:"n_c1"}),"Hòa ước")`},
 {id:'kc2Sel',og:'tt',build:`S.selx=S.selx||{};S.selx.done=0;const d=mkP("kc2Sel",{});if(!d)return "no kc2Sel";pushDil(d,"Lễ ra mắt")`},
 KC('vhtrieu','Thánh chỉ'),KC('thtrieu','Thái hậu triệu'),
 KC3('kc_hon','x1','tt'),KC3('tm96z','x1','tt',TM),
 {id:'rt-npcEsc',og:'',build:`const v=rivals.find(x=>x.alive);if(!v)return "no rival";v.rtEsc={t:S.turn};S.rt=S.rt||{};const d=mkP("rtNpcEsc",{v:v.id});if(!d)return "null";rtPush("rtNpcEsc",{v:v.id})`},
 {id:'rt-an',og:'',build:`S.rt=S.rt||{};S.rt.ad={since:S.turn-60};rtPush("rtAn",{})`},
 {id:'j4-tt3',og:'',build:`S.st=Object.assign(S.st||{},{});pushDil(mkP("tt3",{o:60}),"Mưu đại sự")`},
 {id:'j4-cn2',og:'',build:`S.st=Object.assign(S.st||{},{mis:rivals[0],guard:"Lâm thị vệ"});pushDil(mkP("cn2",{o:60}),"Chuyện cũ")`},
 {id:'j4-nc1',og:'',build:`S.st=Object.assign(S.st||{},{});pushDil(mkP("nc1",{}),"Mật sứ")`},
 {id:'j4-ch2',og:'',build:`S.st=Object.assign(S.st||{},{});pushDil(mkP("ch2",{o:50}),"Gói thuốc")`},
 {id:'rt-ng2',og:'',shot:true,build:`S.rt=S.rt||{};S.kids=S.kids||[];let k=S.kids.find(x=>x.alive);if(!k){k={name:"Tiểu Bảo",alive:true,age:3,sex:"m",fond:50};S.kids.push(k)}S.rt.ng={acc:rivals[0]&&rivals[0].id,k:k.name};if(!rtNgKid())return "rtNgKid null";rtPush("rtNg2",{})`},
 {id:'cm-td',og:'',build:`pushDil(mkP("cmTd",{}),"Bà lão")`},
];
