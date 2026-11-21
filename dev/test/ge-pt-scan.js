/* ge-pt-scan: family scan (law 6a/6b/6c, LUẬT SỬA CẢ NHÓM) of the 16 Phù Tang grand endings (jgedata_pt.js) — ge-bd-scan shape, made strict:
   every PERSON of the PFP book who can die or move on the pt roads, and every OBJECT word of the PFO book, found in cw/t/a/ht/ha/fail/ft,
   must be in the ALLOW table below with the reason it is true in every state the ending can meet (its cond / fo); anything else is a FAULT.
   Usage: node dev/test/ge-pt-scan.js [file] (default dev/build/jgedata_pt.js). Exit 1 on a fault. */
const fs=require("fs");const f=process.argv[2]||__dirname+"/../build/jgedata_pt.js";
global.GE_DATA={};eval(fs.readFileSync(f,"utf8"));
/* people who die or move (jrd_pt.js / jrd_pt2.js pfKill / pfMove) */
const PEOPLE={"Tiểu Ngọc":"tieungoc dies pt_hai .8 lose","Thân Lão":"thanlao dies pt_hai .6 mid","Nham Lão":"namlao sails home pt_hai .11","Ô Cửu":"ocuu dies pt_hai .11 c2 / pt_dang .10 mid",
 "Kim Thành":"kimthanh sails home at .11","Trọng Lữ":"trongla sails home unless made an official","Tịnh Viên":"tinhvien nguc / hb / kinh / cang","Trí Viễn":"trivien kinh ⇄ cang, hb at pt_tang .11 win",
 "Kim Hựu Thành":"huuthanh cang / kinh (never dies)"};
/* object words of the PFO book */
const OBJ=["hải đồ","rương","niêm phong","gương đồng","ngọc","nhật ký","danh sách","quốc thư","hồi thư","tờ lệnh","lệnh giả","đao","hộp kinh","xá lợi","độ điệp","hạt giống","sổ","thư","đan","quạt","bút","lụa","giấy"];
/* the checked hits: "<ending>|<word>" → why it is true in every state the ending can meet */
const ALLOW={
 "pt_hai_1|sổ":"the roll in red ink is written by the ending itself (.11 x1 roll / her own book), not a PFO object",
 "pt_hai_1|rương":"«ai mở rương» = a question in the ác text, no holder claimed",
 "pt_hai_2|hải đồ":"«một hải đồ mới» is made by the success text itself; a / ft claim no chart she holds (haido can be ta / kho / 0)",
 "pt_hai_2|thư":"none (word «thương» / «thuyền» false hit guard)",
 "pt_hai_3|sổ":"Hồng Lư tự's own register (a standing office book), not a PFO object",
 "pt_hai_3|niêm phong":"named as lost to the sea in her own lie (ác), no holder claimed",
 "pt_hai_3|thư":"«thư về Phù Tang» = the letter of this ending",
 "pt_hai_4|hồi thư":"the Đại Hy answer of THIS crossing, given by the ending",
 "pt_hai_4|thư":"«hồi thư» of this crossing (same hit as hồi thư)",
 "pt_hai_4|lụa":"gift silk given by the ending",
 "pt_su_1|thư":"letters between the courts from now on (made by the ending)",
 "pt_su_1|hồi thư":"«Hồi thư của Đại Hy đi mà không qua tay ngươi» = the next answer letter, no PFO holder claimed",
 "pt_su_2|quốc thư":"state letters to come (the office the ending gives)",
 "pt_su_2|thư":"same (án thư = desk; quốc thư to come)",
 "pt_su_3|tờ lệnh":"the forged order existed in every life (.10 premise); texts follow the PEOPLE who carried / wrote it, never the paper (lenh can be chay = burnt)",
 "pt_su_3|lệnh giả":"same",
 "pt_su_3|hồi thư":"«đủ hồi thư» = the embassy's answer of this ending",
 "pt_su_3|thư":"same",
 "pt_su_4|hồi thư":"she writes a new last line of THE reply in this ending and carries it (made by the ending)",
 "pt_su_4|thư":"the blood letter = made by the ending",
 "pt_tang_1|độ điệp":"the register of ordination papers to come (the ending's office), not Tịnh Viên's paper",
 "pt_tang_1|sổ":"same register",
 "pt_tang_2|thư":"none",
 "pt_tang_3|đan":"the Thái Thanh quán elixir — the .8 premise (the quán's gift box); the ending tests / finds it, no holder of a PFO object claimed",
 "pt_tang_3|xá lợi":"«Kinh sách và xá lợi từ đó là việc của cung ngươi» = the court matter, not the urn's holder",
 "pt_tang_3|độ điệp":"Từ bộ checks papers by law (general)",
 "pt_tang_3|sổ":"none",
 "pt_dang_1|sổ":"the harbour book given by the ending (sổ bến), not sothibac",
 "pt_dang_1|thư":"none",
 "pt_dang_3|sổ":"t: she asks the Emperor to CALL the true book to the throne — true whoever holds sothibac (ta / kho / tbs); a / ft name no book and no pirate testimony (it can be burnt at .10 c2)",
 "pt_dang_3|giấy":"the papers sold to the pirates (the .9 premise), no holder claimed",
 "pt_dang_3|thư":"none",
 "pt_dang_4|thư":"none"};
const GUARD={/* person named → the rule that makes it true */
 "pt_dang_2|Ô Cửu":["cond e10 win (pardoned, at the port)","fo e10 mid (beheaded) → ft names no one"],
 "pt_tang_2|Trí Viễn":["fo e11 win (only .11 win sails him: PFSAIL)","else he is at Pháp Vân (.6/.7 bring him back to kinh)"],
 "pt_tang_4|Trí Viễn":["cond e11 win (he crosses)","fo e11 win2|mid|lose → ft names him not"],
 "pt_dang_1|Kim Hựu Thành":["never dies (no pfKill)","named as the guild's name-holder given by the ending, no place claimed"]};
const F=["cw","t","a","ht","ha","fail","ft"];let hits=0;const fault=[];
const wre=w=>new RegExp("(^|[^\\p{L}])"+w+"(?![\\p{L}])","iu");
for(const b of Object.keys(GE_DATA))GE_DATA[b].e.forEach((e,i)=>{const id=b+"_"+(i+1),cond=JSON.stringify(e.cond||[]),fo=JSON.stringify(e.fo||[]);
 const seenO=new Set(),seenP=new Set();
 F.forEach(k=>{const s=e[k]||"";
  for(const p in PEOPLE)if(s.includes(p)&&!(p==="Kim Thành"&&s.includes("Kim Hựu Thành"))){hits++;seenP.add(p);console.log([id,k,"PERSON",p,PEOPLE[p],"cond "+cond,"fo "+fo].join(" | "))}
  for(const w of OBJ)if(wre(w).test(s)){hits++;seenO.add(w)}});
 for(const p of seenP)if(!GUARD[id+"|"+p])fault.push(`${id}: names ${p} (${PEOPLE[p]}) with no guard`);
 for(const w of seenO){const r=ALLOW[id+"|"+w];console.log([id,"OBJ",w,r||"— NOT CHECKED"].join(" | "));if(!r)fault.push(`${id}: object word «${w}» not checked`)}});
console.log("hits",hits,"faults",fault.length);for(const x of fault)console.log("FAULT",x);process.exit(fault.length?1:0);
