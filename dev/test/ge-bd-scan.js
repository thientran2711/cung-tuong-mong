/* ge-bd-scan: family scan (law 6a/6b/6c, LUẬT SỬA CẢ NHÓM) of the 16 Ba Tư grand endings (jgedata_bd.js).
   Lists every object / evidence word and every person who can die on the bd roads (bdKill) in cw/t/a/ht/ha/ft, with the ending's fo,
   so each hit can be checked against the bdO / RD_FL states. Usage: node dev/test/ge-bd-scan.js [file] (default dev/build/jgedata_bd.js). */
const fs=require("fs");const f=process.argv[2]||__dirname+"/../build/jgedata_bd.js";
global.GE_DATA={};eval(fs.readFileSync(f,"utf8"));
const OBJ={nhẫn:"da",["khúc ca"]:"khuc",["thư"]:"thuluc",["chén"]:"chen",["sợi đai"]:"dai",["con dao"]:"daocat",["sổ"]:"so",["bản đồ"]:"bando",["gói tro"]:"co",["lệnh bài"]:"lenhbai",["ngựa ô"]:"nguao",["con ô"]:"nguao",["linh cữu"]:"(ch11 s3 timing)",["chứng cứ"]:"(evidence)",["Kim Quang môn"]:"nguatay"};
const DIE={"Mật Hồ Đạt":"phong (bd_hen .10 lose)","Nê Niết Sư":"olac (bd_soi .11 lose)","Đạt Lỗ":"thatmoc (bd_soi .7)","A La Hám":"asnc (bd_tuyet .6 lose)"};
const F=["cw","t","a","ht","ha","ft"];let n=0;
for(const b of Object.keys(GE_DATA))GE_DATA[b].e.forEach((e,i)=>{const fo=JSON.stringify(e.fo||[]),cond=JSON.stringify(e.cond||[]);
 F.forEach(k=>{const s=e[k]||"";for(const w in OBJ)if(new RegExp("(^|[^\\p{L}])"+w+"(?![\\p{L}])","u").test(s)){n++;console.log([b+"_"+(i+1),k,"OBJ",w,OBJ[w],"cond "+cond,"fo "+fo].join(" | "))}
  for(const p in DIE)if(s.includes(p)){n++;console.log([b+"_"+(i+1),k,"PERSON",p,DIE[p],"cond "+cond,"fo "+fo].join(" | "))}})});
console.log("hits",n);
