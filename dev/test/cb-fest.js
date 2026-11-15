/* SCAN 6 — every festival × contest variant (FV7 kind C): the invitation title must name what the variant really asks for.
   before = "<festival full name> · Lời mời thi <contest label>" ; after = "<festival> · Lời mời: <FT7 title>".
   A title FAILS when its words do not match the variant's own text (the label "thêu" for "may áo bông", "hát" for "tụng kinh", ...),
   or it carries a festival theme in brackets that is not this contest (Hội Phượng "(thi cưỡi ngựa bắn cung)" over a thêu contest).
   usage: node dev/test/cb-fest.js [before]  (reads dev/build/j71.js + j31.js) */
const fs=require('fs');const src=fs.readFileSync(__dirname+'/../build/j71.js','utf8');const j31=fs.readFileSync(__dirname+'/../build/j31.js','utf8');
const grab=(a,b)=>src.slice(src.indexOf(a),src.indexOf(b,src.indexOf(a)));
eval(grab('const FV7=','const FBIG7').replace('const FV7','global.FV7'));
const ft=src.indexOf('const FT7=');if(ft>=0)eval(src.slice(ft,src.indexOf('\n',ft)).replace('const FT7','global.FT7'));
const SC={};for(const m of grab('SC7={','/* j85').matchAll(/ (\w+):\{n:"([^"]+)"/g))SC[m[1]]=m[2];
const FEST={};for(const m of j31.matchAll(/"(\w+)": \{"name": "([^"]+)"/g))FEST[m[1]]=m[2];FEST.thanhtho="Thánh thọ Thái hậu";FEST.vulan=FEST.vulan||"Lễ Vu Lan";FEST.vantho=FEST.vantho||"Tiết Vạn thọ";FEST.lapbat=FEST.lapbat||"Ngày Lạp bát";
const KW={doden:/đố|đoán/,tho:/thơ/,doi:/đối/,dan:/đàn/,mua:/múa/,hat:/hát|tụng/,theu:/thêu|may/,kim:/kim|cắt|kết|gấp|tết/,hoa:/hoa|chậu|bồn|mâm|cắm/,ve:/vẽ|tranh/,co:/cờ/,banh:/bánh|cháo|cỗ|sủi cảo|nấu|gói/,ban:/bắn/,dauho:/đầu hồ/,huong:/hương|rượu|trầm|thù du/};
const rows=[];let fb=0,fa=0;
for(const k in FV7)FV7[k].forEach((v,i)=>{if(v[0]!=="C")return;const sub=v[1],txt=v[2].toLowerCase(),lab=SC[sub];const full=FEST[k]||k,short=full.replace(/\s*\([^)]*\)\s*$/,"");
 const theme=(full.match(/\(([^)]*)\)/)||[])[1]||"";
 const before=`${full} · Lời mời thi ${lab}`;const t=(global.FT7||{})[k+":"+i];const after=t?`${short} · Lời mời: ${t}`:"(không có tên riêng)";
 const labInText=txt.includes(lab.split(" ")[0].toLowerCase());const badB=(!!theme&&!theme.includes(lab))||!labInText;
 const badA=!t||!KW[sub].test(t.toLowerCase())||!t.split(/\s+/).slice(1).some(w=>w.length>2&&txt.includes(w.toLowerCase().replace(/[“”,]/g,"")));
 if(badB)fb++;if(badA)fa++;rows.push([k,i,sub,before,badB?"SAI":"",after,badA?"SAI":""])});
console.log(`festival contest variants: ${rows.length} · title wrong before: ${fb} · after: ${fa}`);
console.log("| hội:biến thể | thi | trước | | sau | |\n|---|---|---|---|---|---|");for(const r of rows)console.log(`| ${r[0]}:${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} | ${r[5]} | ${r[6]} |`);
