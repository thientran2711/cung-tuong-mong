# NAMING APPLIED — owner final names (11/15), branch review/naming

How: fixed terms are replaced in the source (text only; label pairs that code compares, e.g. the Sang buổi / Qua ngày button in j6 + jcoopworld, are changed together). "ngươi" → "ta" is applied ON SCREEN by j84 (VĂN PHONG table, one regex rule): every text node / title / aria-label outside “…” quotes; NPC speech in “…” keeps "ngươi". The source keeps "ngươi" because code matches it in log text (j18/j19 filters, j52 /xong: Ngươi/) and old saves hold it in their logs. Tools: dev/tools/naming.py (grep + classification), dev/test/naming.js (on-screen check: 0 "ngươi" outside quotes on 12 tabs).

## 1. Fixed terms (source)

| owner rule | done |
|---|---|
| Chơi cùng bạn / Mời bạn | Cùng hảo hữu / Mời hảo hữu |
| bạn (co-op friend, jcoop*) | hảo hữu |
| Sổ tuần | Tuần lục |
| Qua buổi | Sang buổi |
| Qua đêm / Đợi sáng mai (Qua đêm) | Qua ngày |
| Đợi buổi sau (Qua buổi) | Sang buổi |
| Mã phòng / Nhập mã / gửi mã | Ám hiệu / Nhập ám hiệu / gửi ám hiệu |
| Đang mang | Bên mình |
| Bảng vinh danh | Bảng vàng |
| Hoàng thượng · Thái hậu / Thánh thượng (tab) | Chí tôn |
| Cơ may | kept |

| file:line | before | after |
|---|---|---|
| j6.js:13 | ¦0)>=2?"Qua đêm":"Qua buổi";if(!S | ¦0)>=2?"Qua ngày":"Sang buổi";if(!S |
| j77.js:63 | h({n:night?"Đợi sáng mai (Qua đêm)":"Đợi buổi sau (Qua buổi)",fx:{},x:st | h({n:night?"Qua ngày":"Sang buổi",fx:{},x:st |
| j84.js:53 | c Phận sự:"] | c Phận sự:"], |
| j84.js:59 |  số¦[Tt]rống/; |  số¦[Tt]rống¦[Nn]gươi/; |
| j84.js:81 | n"],court:["Hoàng thượng · Thái hậu","Thánh thượng"],men:["Nam | n"],court:["Chí tôn","Chí tôn"],men:["Nam |
| j87.js:37 | pec.label¦¦"Sổ tuần"); | pec.label¦¦"Tuần lục"); |
| j87.js:47 | g(p.title¦¦"Sổ tuần").split(" " | g(p.title¦¦"Tuần lục").split(" " |
| j87.js:233 | ver",title:"Sổ tuần",sub:date,n | ver",title:"Tuần lục",sub:date,n |
| j87.js:248 | ges:P,head:`Sổ tuần · ${date}`} | ges:P,head:`Tuần lục · ${date}`} |
| j87.js:256 | st:w,label:"Sổ tuần",onClose:() | st:w,label:"Tuần lục",onClose:() |
| j90.js:39 | tle¦¦"Bảng vinh danh",o.sub¦¦"") | tle¦¦"Bảng vàng",o.sub¦¦"") |
| j90.js:106 | {sub:"Bảng vinh danh"})} | {sub:"Bảng vàng"})} |
| jcooplobby.js:4 | oom) · Nhập mã (join) · ‹  | oom) · Nhập ám hiệu (join) · ‹  |
| jcooplobby.js:38 | ="make">Mời bạn<small>lập phòng, gửi mã cho bạn</small></button><button class="kbtn alt k1" data-coop="join">Nhập mã<small>bạn đã gửi mã hay đường d | ="make">Mời hảo hữu<small>lập phòng, gửi ám hiệu cho hảo hữu</small></button><button class="kbtn alt k1" data-coop="join">Nhập ám hiệu<small>hảo hữu đã gửi ám hiệu hay đường d |
| jcooplobby.js:40 | {kitRows([["Mã phòng",esc(c),"t"],["Bạn",pw[0],pw[1 | {kitRows([["Ám hiệu",esc(c),"t"],["Hảo hữu",pw[0],pw[1 |
| jcooplobby.js:42 | ờng dẫn cho bạn<small>qua Z | ờng dẫn cho hảo hữu<small>qua Z |
| jcooplobby.js:43 | s==="open"?"Bạn chạm vào đường dẫn (hay chọn Chơi cùng bạn, Nhập mã, gõ mã) là vào phòng. Giữ màn này mở: bạn vào là cuộc | s==="open"?"Hảo hữu chạm vào đường dẫn (hay chọn Cùng hảo hữu, Nhập ám hiệu, gõ ám hiệu) là vào phòng. Giữ màn này mở: hảo hữu vào là cuộc |
| jcooplobby.js:44 | ode",label:"Mã phòng",value:CODE,placeholder:"bốn chữ bạn gửi"})+ | ode",label:"Ám hiệu",value:CODE,placeholder:"bốn chữ hảo hữu gửi"})+ |
| jcooplobby.js:45 | ss="kpnote">Mã phòng là bốn chữ hay số bạn gửi, ví dụ  | ss="kpnote">Ám hiệu là bốn chữ hay số hảo hữu gửi, ví dụ  |
| jcooplobby.js:47 | {kitRows([["Mã phòng",esc(c),"t"],["Bạn","đang chọn | {kitRows([["Ám hiệu",esc(c),"t"],["Hảo hữu","đang chọn |
| jcooplobby.js:48 | ss="kpnote">Bạn mở phòng nên chọn thân phận trước, hậu cung dựng theo kiếp của bạn. Bạn chọn xong,  | ss="kpnote">Hảo hữu mở phòng nên chọn thân phận trước, hậu cung dựng theo kiếp của hảo hữu. Hảo hữu chọn xong,  |
| jcooplobby.js:50 | {pick:["Đợi bạn chọn thân phận","Hai người đã ở trong phòng."],co:["Chơi cùng bạn","Hai người chung một hậu cung. Cả hai phải cùng ở trong cuộc."],wait:["Mời bạn","Gửi mã hay đường dẫn cho bạn."],join:["Nhập mã","Gõ mã phòng bạn gửi."],err: | {pick:["Đợi hảo hữu chọn thân phận","Hai người đã ở trong phòng."],co:["Cùng hảo hữu","Hai người chung một hậu cung. Cả hai phải cùng ở trong cuộc."],wait:["Mời hảo hữu","Gửi ám hiệu hay đường dẫn cho hảo hữu."],join:["Nhập ám hiệu","Gõ ám hiệu hảo hữu gửi."],err: |
| jcooplobby.js:65 | ast("Hãy gõ mã phòng.");return} | ast("Hãy gõ ám hiệu.");return} |
| jcooplobby.js:69 |  Xem lại mã bạn gửi."; |  Xem lại mã hảo hữu gửi."; |
| jcooplobby.js:78 | ng cùng ta. Mã phòng "+c,url:u}).catch(()=>{});else copy(u,b,"Đã chép đường dẫn, dán gửi cho bạn");return}}, | ng cùng ta. Ám hiệu "+c,url:u}).catch(()=>{});else copy(u,b,"Đã chép đường dẫn, dán gửi cho hảo hữu");return}}, |
| jcooplobby.js:90 | innerHTML="Chơi cùng bạn<small>Mời bạn · Nhập mã</small>";co | innerHTML="Cùng hảo hữu<small>Mời hảo hữu · Nhập ám hiệu</small>";co |
| jcooplobby.js:99 | T={me:["Đợi bạn trở lại","Đường mạng của ngươi vừa đứt. Đang nối lại."],peer:["Đợi bạn trở lại","Bạn đã rời cuộc. Hậu cung dừng lại cho đến khi bạn trở lại."], | T={me:["Đợi hảo hữu trở lại","Đường mạng của ngươi vừa đứt. Đang nối lại."],peer:["Đợi hảo hữu trở lại","Hảo hữu đã rời cuộc. Hậu cung dừng lại cho đến khi hảo hữu trở lại."], |
| jcooplobby.js:100 |  week:["Đợi bạn xong tuần","Ngươi đã qua đêm. Khi bạn cũng xong t |  week:["Đợi hảo hữu xong tuần","Ngươi đã qua đêm. Khi hảo hữu cũng xong t |
| jcooplobby.js:104 | {kitRows([["Mã phòng",esc(COOP.state.room¦¦""),"t"],["Bạn",why==="week"?"chưa xong tuần":pw[0],why==="week"?"n":pw[1]],["Ngươi",COOP.state.status==="open"?"đang ở trong cuộc":"đang nối lại",COOP.state.status==="open"?"g":"r"]])}</div>${why==="peer"?`<div class="kpnote" style="margin:4px 12px 0">Gửi lại đường dẫn cho bạn: bạn chạm vào là | {kitRows([["Ám hiệu",esc(COOP.state.room¦¦""),"t"],["Hảo hữu",why==="week"?"chưa xong tuần":pw[0],why==="week"?"n":pw[1]],["Ngươi",COOP.state.status==="open"?"đang ở trong cuộc":"đang nối lại",COOP.state.status==="open"?"g":"r"]])}</div>${why==="peer"?`<div class="kpnote" style="margin:4px 12px 0">Gửi lại đường dẫn cho hảo hữu: hảo hữu chạm vào là |
| jcooplobby.js:113 |  open "Nhập mã" with the c |  open "Nhập ám hiệu" with the c |
| jcoopworld.js:57 | },kn:1,imp:"bạn chơi cùng",org:"bạn chơi cùng"} | },kn:1,imp:"hảo hữu chơi cùng",org:"hảo hữu chơi cùng"} |
| jcoopworld.js:154 | W.bend?"Đợi bạn xong buổi":"Đợi bạn"):null;if(t | W.bend?"Đợi hảo hữu xong buổi":"Đợi hảo hữu"):null;if(t |
| jcoopworld.js:156 | ¦0)>=2?"Qua đêm":"Qua buổi";if(n. | ¦0)>=2?"Qua ngày":"Sang buổi";if(n. |
| jcoopworld.js:229 | shModal({t:"Bạn tìm đến",h: | shModal({t:"Hảo hữu tìm đến",h: |
| jcoopworld.js:230 | n",fx:{},x:"bạn tiếp tục vi | n",fx:{},x:"hảo hữu tiếp tục vi |
| jcoopworld.js:242 | ==="named"?"Bạn ra tay":"Bi | ==="named"?"Hảo hữu ra tay":"Bi |
| jcoopworld.js:244 | shModal({t:"Bạn từ chối",h: | shModal({t:"Hảo hữu từ chối",h: |
| jcoopworld.js:246 | shModal({t:"Bạn nhận lời",h:`<p>${r¦¦"Bạn đã nhận."}< | shModal({t:"Hảo hữu nhận lời",h:`<p>${r¦¦"Hảo hữu đã nhận."}< |
| jcoopworld.js:257 | P.S.name)¦¦"bạn"):"bạn"} | P.S.name)¦¦"hảo hữu"):"hảo hữu"} |
| jcoopworld.js:275 | shModal({t:"Bạn vào cung",h:`<p>Bạn ngươi ${old | shModal({t:"Hảo hữu vào cung",h:`<p>Hảo hữu ngươi ${old |
| jhc.js:78 | .dataset.s="Thánh thượng";b.setAttribute("role","tab");b.textContent="Hoàng thượng · Thái hậu";b.dataset. | .dataset.s="Chí tôn";b.setAttribute("role","tab");b.textContent="Chí tôn";b.dataset. |
| jhc.js:86 | bs,{court:["Hoàng thượng · Thái hậu","Thánh thượng"],men:["Nam | bs,{court:["Chí tôn","Chí tôn"],men:["Nam |
| jhc.js:89 | HTML=w<640?"Thánh thượng":"Hoàng thượng · Thái hậu";b.title="Hoàng thượng · Thái hậu"} | HTML=w<640?"Chí tôn":"Chí tôn";b.title="Chí tôn"} |
| jinv.js:128 | ${o.title¦¦"Đang mang"}</h4><div  | ${o.title¦¦"Bên mình"}</h4><div  |
| jinv.js:228 | ang",title:"Đang mang",slots,sum, | ang",title:"Bên mình",slots,sum, |

## 2. "ngươi" in the source (898): on screen 839 · regex (code matches log text) 26 · NPC quote “…” 4 · comment 29

| file:line | result | context |
|---|---|---|
| j1.js:8 | on screen → ta | ,art:{cam:1},t:"Nhà quyền thế. Hoàng hậu coi ngươi là mối lo."}, |
| j1.js:13 | on screen → Ta | h:0,art:{thi:1},ally:1,t:"Cả nhà bị xử trảm. Ngươi vào cung để báo thù."}, |
| j1.js:26 | on screen → ta | ạc",suc:"Sức",mat:"Tai mắt",th:"Thái hậu quý ngươi",hh:"Hoàng hậu quý ngươi",sac |
| j1.js:26 | on screen → ta | t",th:"Thái hậu quý ngươi",hh:"Hoàng hậu quý ngươi",sac:"Sắc",tai:"Tài",tamco:"T |
| j1.js:33 | on screen → ta |  nhantu:["Nhân từ","Hay khoan thứ; Đức của ngươi được coi trọng."], |
| j1.js:49 | on screen → ta | y đến canh tư. Sáng ra, Hoàng thượng ban cho ngươi một cây trâm ngọc.", |
| j1.js:98 | on screen → Ta | n class="r">${k.name} ${why}.</span>${mine?" Ngươi đau đớn khôn nguôi.":""}${was |
| j1.js:113 | on screen → Ta |  log(`<span class="g">Ngươi biết được: Hoàng thượng thích |
| j2.js:13 | on screen → ta | ${v.name} là người quen cũ, sẵn lòng che chở ngươi.`)}} |
| j2.js:18 | on screen → ta | name}, ${S.age} tuổi, ${o.n}. ${o.t} Hôm nay ngươi được đưa vào cung, phong <b>$ |
| j2.js:18 | on screen → ta | ank].n}</b>. Cung nữ ${S.maid.name} theo hầu ngươi từ nhà.</p> |
| j2.js:20 | on screen → ta | }.</b> ${s.goal}${o.k==="td"?` Kẻ vu cho cha ngươi là ${S.foeDad}; con gái hắn,  |
| j2.js:36 | on screen → ta |  {n:"Làm thơ dâng lên",t:S.tai>=70?"Thơ ngươi đã truyền khắp cung, danh tiế |
| j2.js:54 | on screen → ta | i của ${v.name} được lật. Sai cung nữ giả cớ ngươi đau tim, mời Hoàng thượng san |
| j2.js:62 | on screen → ta | Chữa bệnh cho con",t:`${sick.name} đang yếu, ngươi tự bốc thuốc.`,c:{suc:-10},o: |
| j2.js:63 | on screen → Ta | S.arts.y>=4?{n:"Tự bào chế thuốc an thai",t:"Ngươi tự sắc thuốc, không ai nhúng  |
| j2.js:65 | on screen → ta | 5},x:"kèm: mọi phi tần ghen +6, ai cũng biết ngươi mang thai",go:()=>{S.hidden=f |
| j2.js:97 | on screen → ta | Of(k){if(k==="home")return{k,n:"Tẩm cung của ngươi",d:"Cung nữ và các con ở đây. |
| j2.js:97 | regex (code matches log text): unchanged | "}catch(e){}const v=RV(+k.slice(1));if(!nm¦¦/ngươi/.test(nm))nm=v?`Cung của ${v. |
| j2.js:97 | on screen → ta | ,n:nm,d:"",sc:"rv"}}return{k,n:"Tẩm cung của ngươi",d:"",sc:"home"}} |
| j2.js:98 | on screen → ta | g hậu":RANKS[v.rank].n} · ${trChip(v)} · Với ngươi: Thiện cảm ${aff(v,S)} · Oán  |
| j2.js:104 | on screen → Ta | sh(emp);apply({sung:S.emp.mood<=1?3:1});msg="Ngươi tình cờ gặp Hoàng thượng đang |
| j2.js:104 | on screen → ta | àng thượng đang dạo bước. Ngài dừng lại nhìn ngươi."}else msg="Hoa nở rộ. Hoàng  |
| j2.js:105 | on screen → Ta | g thượng cau mày: “Trẫm đang bận việc nước.” Ngươi phải lui ra."};log("Đến Cần C |
| j2.js:106 | on screen → ta | g thượng đang phê tấu chương, ngẩng lên nhìn ngươi."}else msg="Ngài không có ở t |
| j2.js:107 | on screen → ta | cung.”"+(empHere?" Hoàng thượng ở bên trong, ngươi không được gặp.":"");else if( |
| j2.js:107 | on screen → ta | l.push(emp);msg="Hoàng thượng đang nghỉ, cho ngươi vào hầu."}else msg="Hoàng thư |
| j2.js:127 | on screen → Ta | iữ quẻ tốt hơn",run:()=>{reLot(true);return "Ngươi thắp hương, xin một quẻ mới." |
| j2.js:133 | on screen → ta | +S.hh/3),w:{hh:3},x:"2 tháng phi tần khó hại ngươi",l:{hh:-5},go:()=>S.shield=2} |
| j2.js:149 | on screen → ta | =>`${x.name} ${x.nights} lần`).join(", ")+`; ngươi ${S.nights} lần.`)});return A |
| j3.js:45 | on screen → ta | lass="g">Hoàng thượng lập ${k.name}, con của ngươi, làm Thái tử.</b> Danh +10. ` |
| j3.js:55 | on screen → ta | c:-30,duc:5},x:v?`${v.name} nghe chuyện, mến ngươi hơn`:"",go:()=>{if(v)v.rel+=2 |
| j3.js:58 | on screen → ta | tuyen=()=>({who:pEmp(),t:"Hoàng thượng hỏi ý ngươi: năm nay nên tuyển thêm tú nữ |
| j3.js:63 | on screen → ta | class="r">Hoàng thượng cho là thư giả, trách ngươi gây chuyện.</span> Danh -8.`) |
| j3.js:96 | on screen → ta | n(n,drawFace());rivals.push(n);ev+=`Theo lời ngươi tâu, cung tuyển thêm tú nữ: $ |
| j3.js:102 | on screen → Ta | heir.v&&S.heir.k.alive){apply({danh:5});ev+="Ngươi là mẹ Thái tử, danh vọng thêm |
| j3.js:103 | on screen → ta | 25){S.sac=Math.max(10,S.sac-2);ev+=`Năm mới, ngươi ${S.age} tuổi; nhan sắc phai  |
| j3.js:116 | on screen → Ta |  có hoàng tử nối ngôi, thân vương vào kế vị. Ngươi được tôn làm Thái phi, sống n |
| j3.js:117 | on screen → ta |  over("Hoàng thái hậu",pre+`${h.k.name}, con ngươi, lên ngôi. Ngươi được tôn làm |
| j3.js:117 | on screen → Ta |  hậu",pre+`${h.k.name}, con ngươi, lên ngôi. Ngươi được tôn làm Hoàng thái hậu,  |
| j3.js:119 | on screen → Ta | e+`${h.k.name}, con của ${v.name}, lên ngôi. Ngươi là đích mẫu, được tôn làm Mẫu |
| j3.js:119 | on screen → ta | hưng ${v.name} cũng được tôn Thánh mẫu, cùng ngươi chia đôi hậu cung`:""}.`,"Thà |
| j3.js:120 | on screen → Ta | ế đã không còn, không ai truy cứu chuyện cũ. Ngươi thành Thái phi.`,"Thành Thái  |
| j3.js:122 | on screen → ta | i chuyện cũ (cơ may: ${word(o)}) rồi tha cho ngươi, cho dời đến Thọ Khang cung.` |
| j3.js:123 | on screen → ta | n cũ (cơ may: ${word(o)}), ban lụa trắng, ép ngươi tuẫn táng theo tiên đế`)} |
| j4.js:7 | on screen → ta | tt:{t:"Quân cờ của Tể tướng",n:3,goal:"Cha ngươi dùng ngươi làm tai mắt trong  |
| j4.js:7 | on screen → ta | ân cờ của Tể tướng",n:3,goal:"Cha ngươi dùng ngươi làm tai mắt trong cung. Đi đế |
| j4.js:9 | on screen → ta |  đang ngầm điều binh (từ năm thứ 4, hoặc khi ngươi có hoàng tử)"][S.st.step]¦¦"" |
| j4.js:16 | on screen → ta | tq:{t:"Trung thần nơi biên ải",n:3,goal:"Cha ngươi trấn giữ biên cương; thắng bạ |
| j4.js:16 | on screen → ta | n cương; thắng bại ngoài ải là vinh nhục của ngươi. Khi có kẻ vu cha mưu phản, p |
| j4.js:20 | on screen → ta | pan class="g">Tin thắng trận từ biên ải: cha ngươi phá tan quân giặc.</span> Dan |
| j4.js:20 | on screen → ta | g:-3});S.emp.mood=2;ev+=`<span class="r">Cha ngươi thua một trận ở Nhạn Môn quan |
| j4.js:22 | on screen → ta | ");ev+=`<span class="r">Hết hạn tra xét. Cha ngươi bị xử trảm, ngươi bị giáng xu |
| j4.js:22 | on screen → ta | s="r">Hết hạn tra xét. Cha ngươi bị xử trảm, ngươi bị giáng xuống ${RANKS[S.rank |
| j4.js:25 | on screen → ta | ");log(`<b class="g">Chứng cứ trình lên: cha ngươi trong sạch.</b> Danh +8.`);if |
| j4.js:31 | on screen → ta | ị bắt buôn lậu lần thứ hai. Cả cung khinh rẻ ngươi.</span>`)}}}]; |
| j4.js:35 | on screen → ta | ừ nô tỳ thành chủ tử",n:3,goal:"Chủ cũ khinh ngươi, một mối tình cũ đe dọa hủy n |
| j4.js:35 | on screen → ta | ủ cũ khinh ngươi, một mối tình cũ đe dọa hủy ngươi. Lên tới bậc Phi để rửa sạch  |
| j4.js:37 | on screen → ta |  hint:()=>["Chủ cũ sắp làm khó ngươi","Chuyện cũ sắp bị khơi lại", |
| j4.js:39 | on screen → ta | thị vệ");return `<span class="r">Thư cũ giữa ngươi và ${st.guard} lọt đến tay Ho |
| j4.js:42 | on screen → Ta | ạch thân phận cung nữ");return `<b class="g">Ngươi đã là ${RANKS[S.rank].n}. Khô |
| j4.js:42 | on screen → ta |  là ${RANKS[S.rank].n}. Không ai còn dám gọi ngươi là nô tỳ.</b> Danh +5. `} |
| j4.js:44 | on screen → ta | Hòa thân",n:3,goal:"Phụ vương Nam Chiếu muốn ngươi làm tai mắt. Chọn cố quốc hay |
| j4.js:50 | on screen → ta | n `<b class="g">Nam Chiếu thắng trận nhờ tin ngươi gửi về. Đại Hy cầu hòa, cố qu |
| j4.js:51 | on screen → ta | class="r">Nam Chiếu thua trận. Cả triều nghi ngươi, nhưng không bắt được chứng c |
| j4.js:52 | on screen → ta | thSentence("Nam Chiếu thua trận, thư mật của ngươi bị tìm thấy");return""} |
| j4.js:53 | on screen → Ta | urn `<b class="g">Chiến tranh với Nam Chiếu. Ngươi đứng hẳn về phía Đại Hy, cả t |
| j4.js:54 | on screen → ta | ">Chiến tranh với Nam Chiếu. Triều thần nghi ngươi hai lòng.</span> Sủng -10 · D |
| j4.js:58 | on screen → ta | bắt");deathSentence("Mật thư bị chặn, tra ra ngươi làm gián điệp cho Nam Chiếu") |
| j4.js:58 | on screen → ta | )}else log("Mật thư bị chặn, may chưa tra ra ngươi.")}}]; |
| j4.js:59 | on screen → ta | :"Giúp Lễ bộ hiểu cố quốc, để triều đình tin ngươi.",c:{suc:-5},o:od(70),w:{danh |
| j4.js:60 | on screen → ta | td:{t:"Báo thù cho nhà",n:5,goal:"Cả nhà ngươi bị vu mưu phản. Gom 3 chứng c |
| j4.js:65 | on screen → Ta | ${S.foeDad} sai người đốt kho hồ sơ Hình bộ. Ngươi chặn kịp và nắm 2 chứng cứ vớ |
| j4.js:70 | on screen → ta | my);log(`<b class="g">Án cũ được lật. Cả nhà ngươi được rửa oan, truy phong. ${S |
| j4.js:71 | on screen → ta | og(`<span class="r">Hoàng thượng nổi giận vì ngươi lật án của tiên đế. Chứng cứ  |
| j4.js:73 | on screen → ta | Quân cờ của Thái hậu",n:3,goal:"Thái hậu đưa ngươi vào cung để thay Hoàng hậu. M |
| j4.js:80 | on screen → Ta | i hậu mất");return `<b>Thái hậu băng hà.</b> Ngươi đã là ${RANKS[S.rank].n}, đứn |
| j4.js:80 | on screen → ta | KS[S.rank].n}, đứng vững được. Hoàng hậu hận ngươi hơn. Hoàng hậu -20. `} |
| j4.js:85 | on screen → ta | thd:{t:"Tài nữ nhà nho",n:3,goal:"Thơ ngươi sẽ làm rạng danh cha. Được ph |
| j4.js:85 | on screen → ta | ồi xin khắc in sách của cha. Coi chừng kẻ vu ngươi đạo thơ.", |
| j4.js:89 | on screen → ta | >=60)){st.step=1;apply({danh:3});return `Thơ ngươi truyền ra ngoài cung. ${st.st |
| j4.js:89 | on screen → ta | ra ngoài cung. ${st.stu}, học trò cũ của cha ngươi, đem bình khắp kinh thành. Da |
| j4.js:100 | on screen → ta | t1=p=>{const st=S.st;return {t:"Thư nhà: cha ngươi đòi ngươi tâu xin cho môn sin |
| j4.js:100 | on screen → ta | st st=S.st;return {t:"Thư nhà: cha ngươi đòi ngươi tâu xin cho môn sinh của ông  |
| j4.js:103 | on screen → ta | :"Họ ngoại của Hoàng hậu dâng sớ hặc tội cha ngươi kết bè kéo cánh.",o:[ |
| j4.js:105 | on screen → ta | ữ mình",fx:{danh:2},x:"cha bị phạt bổng, hận ngươi",go:()=>{st.step=2}}]}}; |
| j4.js:106 | on screen → ta | f(p.son&&!son)return null;return {t:son?`Cha ngươi ngầm điều cấm quân, định ép H |
| j4.js:106 | on screen → ta | ng thượng lập ${son.name} làm Thái tử.`:"Cha ngươi ngầm điều cấm quân, định ép H |
| j4.js:106 | on screen → ta | uân, định ép Hoàng thượng phế Hoàng hậu, lập ngươi thay.",o:[ |
| j4.js:108 | on screen → ta | 8,th:10,sung:-5},x:"đại nghĩa diệt thân, nhà ngươi sa sút",go:()=>{st.step=3;stE |
| j4.js:109 | on screen → ta | l;return {who:pv(m),t:`${m.name}, chủ cũ của ngươi, bắt ngươi quỳ dâng trà trước |
| j4.js:109 | on screen → ta | ho:pv(m),t:`${m.name}, chủ cũ của ngươi, bắt ngươi quỳ dâng trà trước mặt các ph |
| j4.js:109 | on screen → ta | ươi quỳ dâng trà trước mặt các phi tần, nhắc ngươi từng là nô tỳ.`,o:[ |
| j4.js:110 | on screen → ta | áp trả sắc sảo",fx:{danh:2},x:`${m.name} thù ngươi hơn`,go:()=>{m.rel-=20;st.ste |
| j4.js:111 | on screen → ta | turn {t:`${st.guard}, người từng hẹn ước với ngươi thuở còn làm cung nữ, nay gác |
| j4.js:111 | on screen → ta | ngươi thuở còn làm cung nữ, nay gác cửa cung ngươi. Thái giám của ${m.name} đã đ |
| j4.js:115 | on screen → ta | ật sứ Nam Chiếu trao thư của phụ vương: muốn ngươi dò bố phòng biên ải Đại Hy.", |
| j4.js:118 | on screen → ta |  họ Vương, nhân chứng còn sống của vụ án nhà ngươi, đang bị người của ${S.foeDad |
| j4.js:121 | on screen → ta | =rivals[0];return {who:pTH(),t:'Thái hậu gọi ngươi vào Đức Thọ cung: “Hoàng hậu  |
| j4.js:121 | NPC quote “…”: keeps ngươi |  ngươi vào Đức Thọ cung: “Hoàng hậu bất tài. Ngươi phải thay nàng. Trước hết, dò |
| j4.js:123 | on screen → ta | .o;return {who:pTH(),t:'Thái hậu dúi vào tay ngươi một gói thuốc: “Bỏ vào trà củ |
| j4.js:126 | on screen → Ta | e){st.title=0;st.step=1;log(`<span class="r">Ngươi bị tước danh hiệu Tài nữ.</sp |
| j4.js:126 | on screen → ta | g đạo thơ");log(`<span class="r">Cả cung tin ngươi đạo thơ.</span> Danh -15.`)}; |
| j4.js:126 | on screen → Ta | ply({danh:5});v.rel-=10;log(`<span class="g">Ngươi rửa được tiếng oan, ${v.name} |
| j4.js:126 | on screen → ta | </span>`)};return {who:pv(v),t:`${v.name} tố ngươi chép thơ người xưa rồi nhận l |
| j5.js:26 | on screen → Ta |  ky:["Kỳ: đấu cờ","Bàn 7×7. Ngươi cầm quân đen đi trước; năm qu |
| j5.js:65 | on screen → ta | "")}</div><p class="mgsc" id="mgsc">Đến lượt ngươi.</p>`; |
| j5.js:72 | on screen → Ta |  if(r>=5){over=true;$("mgsc").textContent="Ngươi thắng!";return setTimeout(()= |
| j7.js:17 | on screen → ta | id.name} hớt hải quỳ xuống: dưới gốc quế sân ngươi có hình nhân vải ghi ngày sin |
| j7.js:22 | on screen → ta |  t:`Hộp điểm tâm đề tên ngươi gửi sang cung ${v.name}; cung |
| j7.js:22 | on screen → ta |  thử liền thổ huyết.<br>Cả hậu cung xôn xao: ngươi hạ độc.`,o:[ |
| j7.js:23 | on screen → ta | a ra tiểu thái giám đưa quà đã bị mua chuộc; ngươi được minh oan.")}else{apply({ |
| j7.js:24 | on screen → ta | th:-12},x:"Thái hậu ém chuyện; nàng vẫn nghi ngươi",go:()=>{v.rel-=15}}, |
| j7.js:28 | on screen → ta | cung: đêm đêm có thị vệ lẻn vào tẩm cung của ngươi.<br>Hoàng thượng chưa nói gì, |
| j7.js:28 | on screen → ta | chưa nói gì, nhưng đã hai tuần không lật thẻ ngươi.",o:[ |
| j7.js:33 | on screen → ta | qua có bóng áo trắng khóc bên giếng sau cung ngươi.<br>Ba cung nữ xin đổi đi nơi |
| j7.js:39 | on screen → ta |  t:`${v.name} hẹn ngươi ở đình Thiên Thu: “Hoàng hậu  |
| j7.js:46 | on screen → ta | <span class="r">Tiểu Đức Tử mang chuyện cung ngươi đi bán.</span>')}}}, |
| j7.js:50 | on screen → ta |  trước. Hoàng thượng đứng ngoài rèm cửa cung ngươi.<br>“Trẫm không ngủ được.”",o |
| j7.js:72 | on screen → ta | vào cung, phong ${RANKS[n.rank].n}; nàng mến ngươi.`)}}, |
| j7.js:88 | on screen → ta | iữ cha mẹ nàng, bắt nàng lấy trộm thư từ của ngươi.`,o:[ |
| j7.js:93 | on screen → ta |  t:"Thái y tâm phúc của ngươi lén báo: có kẻ biết ông từng  |
| j7.js:99 | on screen → ta | Khâm Thiên giám tâu: âm khí xung từ cung của ngươi.",o:[ |
| j7.js:106 | on screen → ta | một người mệnh phượng hoàng, và chỉ vào cung ngươi.",o:[ |
| j7.js:115 | on screen → ta | )=>{if(roll(50)){apply({bac:60});log("Thuyền ngươi cược về nhất.")}}}]})); |
| j7.js:143 | on screen → ta | hép tội trộm, sắp bị đánh chết. Nàng gào tên ngươi khi bị lôi qua cửa.",o:[ |
| j7.js:148 | on screen → ta | cửa lãnh cung. ${f.name} gầy rộc, níu tay áo ngươi: “Ta biết những chuyện họ muố |
| j7.js:154 | on screen → ta |  t:"Tiểu thái giám nếm canh ngự ban cho ngươi bỗng ôm bụng ngã gục, môi tím |
| j7.js:156 | on screen → ta | yện",fx:{bac:-30},x:"2 tháng phi tần khó hại ngươi",go:()=>{S.shield=Math.max(S. |
| j7.js:159 | on screen → ta | a":"mẹ già"} lâm bệnh nặng, chỉ mong gặp mặt ngươi lần cuối.`,o:[ |
| j7.js:170 | on screen → Ta |  t:`Ngươi nghe lén sau hòn non bộ: ${a. |
| j7.js:185 | on screen → ta | a ${b.name}. Tổng quản thái giám đánh tiếng: ngươi muốn chen một chân không?`,o: |
| j8.js:5 | on screen → ta | function NM(p){return p===S?"ngươi":p.name} |
| j8.js:6 | on screen → Ta | function NMc(p){return p===S?"Ngươi":p.name} |
| j8.js:65 | on screen → Ta | confined¦¦0,3);log(`<span class="r">${p===S?"Ngươi":p.name}: ${why.replace(/^Bị  |
| j8.js:66 | on screen → ta | why}. Hoàng thượng nhân từ tha tội chết, đày ngươi vào lãnh cung`);return die(wh |
| j8.js:70 | on screen → Ta | amedBy=key(ACTX.a);if(S.rank>=5¦¦R(2)){cold(`Ngươi ${why}`);return}S.rank=Math.m |
| j8.js:70 | on screen → Ta | nk-2);apply({sung:-15});log(`<span class="r">Ngươi ${why}, bị giáng xuống ${RANK |
| j8.js:78 | on screen → Ta | t===S)return `${ps&&(S.doctor¦¦S.arts.y>=2)?"Ngươi nhận ra điều lạ":"Tai mắt báo |
| j8.js:78 | on screen → Ta |  lạ":"Tai mắt báo"}: ${a.name} định ${desc}. Ngươi chặn kịp và nắm 2 chứng cứ. ` |
| j8.js:80 | on screen → ta | hượng":queenP()&&queenP()!==t?(queenP()===S?"ngươi (Hoàng hậu)":"Hoàng hậu"):"Ho |
| j8.js:93 | on screen → Ta | ==S){apply({suc:-d});return `<span class="r">Ngươi trúng độc, nôn ra máu.</span> |
| j8.js:121 | on screen → Ta | urn `<span class="${t===S?"r":"g"}">${a===S?"Ngươi":(a.queen?"Hoàng hậu":a.name) |
| j8.js:137 | on screen → Ta | tion judge(q,p){const n=evG(q,p),r=`${q===S?"Ngươi, ngôi Hoàng hậu,":"Hoàng hậu  |
| j8.js:209 | on screen → ta |  `${a.name} sai người mang ${it.n} sang tặng ngươi. `} |
| j8.js:222 | on screen → Ta | >e.t&&e.by!=="me")&&roll(oSee(S,true)/5))r+=`Ngươi thấy trong người khó chịu từ  |
| j8.js:244 | on screen → ta | giám tuyên khẩu dụ ${BWHY[why]¦¦""}: ban cho ngươi <b>${IT[k].n}</b>.</p><p clas |
| j8.js:250 | on screen → ta | n=true;log(`<span class="g">Thái y bắt mạch: ngươi đã có thai.</span> Ngươi được |
| j8.js:250 | on screen → Ta | g">Thái y bắt mạch: ngươi đã có thai.</span> Ngươi được giấu thai đến hết tháng  |
| j8.js:252 | on screen → ta | ),t:"<p>Tối nay Hoàng thượng lật thẻ bài của ngươi.</p>",o:[{n:"Tắm gội chờ giá" |
| j8.js:253 | on screen → ta | )}, rồi ${S.maid.loyal>=60?"vẫn là người của ngươi":"trở mặt với ngươi"}`:"không |
| j8.js:253 | on screen → ta | al>=60?"vẫn là người của ngươi":"trở mặt với ngươi"}`:"không còn ghế để phong: n |
| j8.js:263 | on screen → ta | thái giám Kính sự phòng cởi xiêm ngoài, cuộn ngươi trong tấm chăn gấm thêu phượn |
| j8.js:263 | on screen → ta | ch xuống${E.mood>=2?", vẻ mệt mỏi":""}, nhìn ngươi.</p>`,o:[ |
| j8.js:274 | on screen → ta |  const txt=s>=6?"Ngài khẽ cười, kéo ngươi lại gần. Tấm rèm thêu uyên ươ |
| j8.js:274 | on screen → ta | gói.":s>=3?"Hương trầm vấn vít. Ngài nắm tay ngươi rất lâu, rồi màn the khép lại |
| j8.js:278 | on screen → ta | 0${DG()?" · hỏng: ngài đa nghi, quay ra nghi ngươi":""}`,go:go(()=>{if(roll(o2)) |
| j8.js:281 | on screen → Ta | >${txt}</p><p class="past">Gối đầu, nửa đêm. Ngươi muốn nói gì?</p>`,o:O}}; |
| j8.js:290 | on screen → ta | ai mắt nghe được: gối đầu, ${v.name} nói xấu ngươi. Sủng -4. `}else if(DG()){ap( |
| j8.js:304 | on screen → ta | )ghenAll(6);ev+=me?"Bụng đã lộ, cả cung biết ngươi có thai. ":`${p.name} có thai |
| j8.js:306 | on screen → Ta | alse;ap(p,{suc:-20});ev+=me?`<span class="r">Ngươi động thai, sảy mất đứa bé.</s |
| j8.js:315 | on screen → ta | o hài nhi bằng một con mèo lột da. Người của ngươi bắt quả tang: thêm 2 chứng cứ |
| j8.js:316 | on screen → Ta | a yêu vật",2);return ev+(me?`<span class="r">Ngươi tỉnh lại thì bên cạnh là một  |
| j8.js:316 | on screen → ta | cạnh là một con mèo chết lột da. Cả cung đồn ngươi sinh ra yêu vật.</span> Danh  |
| j8.js:319 | on screen → Ta |  if(k.sex==="m"){ev+=me?`<b class="g">Ngươi sinh hạ ${k.name}.</b> `:`${p |
| j8.js:320 | on screen → Ta |  else{ev+=me?`Ngươi sinh hạ ${k.name}. `:`${p.nam |
| j8.js:339 | on screen → ta |  chỉ: lập ${w.name} làm Hoàng hậu</b>${me?"; ngươi lỡ ngôi trung cung":""}. `}}} |
| j8.js:348 | on screen → ta | ${m.name} bị ${a.name} mua chuộc, đem chuyện ngươi bày mưu hại người kể ra ngoài |
| j8.js:349 | on screen → ta | .name} mua chuộc, lấy trộm hộp trang sức của ngươi rồi bỏ trốn.</span> Bạc -30.  |
| j8.js:402 | on screen → Ta | cung lập làm Hoàng hậu.</b>${C.includes(S)?" Ngươi lỡ ngôi trung cung.":""} `}el |
| j8.js:403 | on screen → Ta |  hậu, chủ trì lục cung.</b>${C.includes(S)?" Ngươi lỡ ngôi trung cung.":""} `}}} |
| j8.js:414 | on screen → ta | ss="r">Hoàng hậu sai người tịch thu ${n} của ngươi, trách ngươi xa xỉ.</span> `: |
| j8.js:414 | on screen → ta | hậu sai người tịch thu ${n} của ngươi, trách ngươi xa xỉ.</span> `:"";if(p!==S)l |
| j8.js:415 | on screen → ta | ,from:"hh"});if(p===S)ev+=`Hoàng hậu ban cho ngươi ${IT[k].n}. `} |
| j8.js:421 | on screen → ta | return `<span class="g">${title}: ${lbl} của ngươi át cả hậu cung, Hoàng thượng  |
| j8.js:422 | on screen → ta | ">${title}: ${w.name} chiếm hết phong quang, ngươi lu mờ.</span> Danh -2. `} |
| j8.js:430 | on screen → Ta | y=1;v.cutBy="Hoàng hậu";relAdd(S,v,-15);log(`Ngươi sai Nội vụ phủ khất bổng lộc  |
| j8.js:432 | on screen → Ta | .inv.splice(j,1);relAdd(S,v,-20);v.hh-=15;r=`Ngươi tịch thu ${n} của ${v.name}.` |
| j8.js:433 | on screen → Ta | });relAdd(S,v,20);v.hh+=10;ap(v,{danh:3});r=`Ngươi ban thưởng cho ${v.name}.`} |
| j8.js:434 | on screen → Ta | .confined=0;relAdd(S,v,30);apply({duc:2});r=`Ngươi ân xá cho ${v.name}.`} |
| j8.js:448 | on screen → ta | ame} sai người mang <b>${it.n}</b> sang tặng ngươi.</p><p class="past">${it.d}</ |
| j8.js:482 | on screen → ta | )Q.push({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng ${s}</p>`} |
| j9.js:17 | on screen → ta | byKey(houseOf(p));return h===S?"tẩm cung của ngươi":h===p?"cung riêng":"cung "+h |
| j9.js:40 | on screen → ta | &k!=="accuse")return a===S?"Người cùng cung, ngươi không thể ra tay hay lấy lòng |
| j9.js:54 | on screen → ta | )}.`}affAdd(v,S,-2);return `${v.name} cho là ngươi giả lả. Thiện cảm -2.`}}); |
| j9.js:55 | on screen → ta | oanAdd(third,S,10);return `${v.name} đem lời ngươi kể lại với ${third.name}. ${t |
| j9.js:55 | on screen → ta |  kể lại với ${third.name}. ${third.name} oán ngươi +10.`}return `${v.name} lảng  |
| j9.js:56 | on screen → ta | g(10)}${v.malice>50?" · nàng có thể nắm thóp ngươi":""}`,run:()=>{chatMark(v);af |
| j9.js:57 | on screen → ta | giúp đỡ",o:100,x:aff(v,S)>=30?"nàng thân với ngươi":"cần thiện cảm 30",run:()=>{ |
| j9.js:57 | on screen → ta | :-30});apply({bac:30});return `${v.name} cho ngươi mượn 30 lượng.`}const x=liveR |
| j9.js:57 | on screen → ta | 0];if(x){evA(S,x,1);return `${v.name} kể cho ngươi một chuyện về ${x.name}: chứn |
| j9.js:59 | on screen → Ta | ){affAdd(v,S,g(10));oanAdd(v,foe,10);return `Ngươi nhắc ${v.name} coi chừng ${fo |
| j9.js:59 | on screen → ta | 10)}.`}affAdd(v,S,-2);return `${v.name} nghi ngươi gây chia rẽ. Thiện cảm -2.`}} |
| j9.js:60 | on screen → Ta | run:()=>{oanAdd(v,S,-15);chatMark(v);return `Ngươi hạ mình tạ lỗi. ${v.name} oán |
| j9.js:61 | on screen → Ta | dd(v,S,-8);affAdd(v,S,2);chatMark(v);return `Ngươi nhún nhường trước ${v.name}.  |
| j9.js:62 | on screen → Ta | d(S,v,10);oanAdd(v,S,-5);chatMark(v);return `Ngươi giúp ${v.name} việc khó. Thiệ |
| j9.js:76 | on screen → Ta | dd(a,t,-10);return (t===S?"<span class=\"r\">Ngươi bị đẩy xuống hồ sen</span>":` |
| j9.js:80 | on screen → Ta | ;if(roll(od(40+S.mat*6))){evA(S,v,1);return `Ngươi nghe lén ${v.name} nói chuyện |
| j9.js:93 | on screen → Ta |  let h=`<div class="reltab">`+[["me","Ngươi"]].concat(liveRivals(true).ma |
| j9.js:95 | on screen → Ta | g</b>","<b>Ân tình</b>")+P.map(p=>row(p===S?"Ngươi":p.name,p.sung,p.an¦¦0)).join |
| j9.js:96 | on screen → Ta | Thái hậu thương</b>","")+P.map(p=>row(p===S?"Ngươi":p.name,p.th,"")).join("");re |
| j9.js:97 | on screen → Ta | b>")+P.filter(p=>p!==sel).map(p=>row((p===S?"Ngươi":p.name)+(sameHouse(sel,p)?"  |
| j10.js:51 | on screen → ta | ap(x=>`${x.name} ${x.nights}`).join(", ")+`; ngươi ${S.nights}.`;else r=`${c.nam |
| j10.js:55 | on screen → ta | For==="me"?" · <span class=\"g\">tai mắt của ngươi</span>":""}</span></div><div  |
| j10.js:64 | on screen → ta | PEND.plantsv=()=>({t:"<p>Cài người hầu của ngươi vào cung ai?</p>",o:liveRival |
| j10.js:80 | on screen → Ta | (a)*3)))return joinFac(a,f);return `${l===S?"Ngươi":l.name} chưa nhận ${NM(a)} v |
| j10.js:82 | on screen → ta | ${M.map(NM).join(", ")} dâng lên ${q?(q===S?"ngươi":"Hoàng hậu"):"Hoàng thượng"} |
| j10.js:83 | on screen → ta | d(y,x,-15);let r=`${NMc(a)} ly gián ${x===S?"ngươi":x.name} và ${y===S?"ngươi":y |
| j10.js:83 | on screen → ta |  ly gián ${x===S?"ngươi":x.name} và ${y===S?"ngươi":y.name}. `;if(roll(50))r+=le |
| j10.js:100 | on screen → ta | i mời vào phe",who:pv(l),h:`<p>${l.name} mời ngươi vào ${f.name}. Vào thì cùng c |
| j10.js:103 | on screen → Ta | acs¦¦[];let h=`<div class="ph"><span>${mine?`Ngươi thuộc <b>${mine.name}</b>`:"N |
| j10.js:103 | on screen → Ta | an>${mine?`Ngươi thuộc <b>${mine.name}</b>`:"Ngươi chưa vào phe nào"}</span><spa |
| j10.js:104 | on screen → ta | n class="past">Cần một phi tần thiện cảm với ngươi từ 30 để lập phe.</span>`}</d |
| j10.js:107 | on screen → ta |  đầu: ${mdH(l===S?pMe():pv(l),"xs")}${l===S?"ngươi":l.name} · thế lực ${facStr(f |
| j10.js:107 | on screen → Ta | chip(`${mdH(m===S?pMe():pv(m),"xs")}${m===S?"Ngươi":m.name}`)).join("")}${me?"": |
| j10.js:107 | on screen → ta | Ngươi":m.name}`)).join("")}${me?"":chip(`Với ngươi: ${st>=20?"thân":st<=-20?"thù |
| j6.js:28 | on screen → ta | rn `<p class="past">Cùng ${houseName(v)} với ngươi: không thể lấy lòng hay ra ta |
| j6.js:28 | on screen → ta | đi (khó hơn; việc hại: kẻ đi bị bắt, khai ra ngươi: ${word(confessRisk(bestSent( |
| j6.js:31 | on screen → ta | innerHTML=`<p class="past">Mục này đang lỗi, ngươi chọn mục khác.</p>`}} |
| j6.js:37 | on screen → ta |  của ${S.heir.v.name}.`:`<span class="g">Con ngươi, ${S.heir.k.name}, là Thái tử |
| j6.js:43 | on screen → Ta |  h+=S.rank>=7?`<div class="req"><h3>Ngươi là Hoàng hậu</h3>Đưa con mình |
| j13.js:9 | on screen → Ta | 1,known:p===S};return p===S?`<span class="r">Ngươi mắc ${ILL[k].n.toLowerCase()} |
| j13.js:19 | on screen → Ta | ;if(d.scar)ap(p,{sac:d.scar});return ev+(me?`Ngươi khỏi ${d.n.toLowerCase()}${d. |
| j13.js:30 | on screen → ta | S)ev+=`<span class="r">Thái y khác bắt mạch: ngươi giả bệnh.</span> `}} |
| j13.js:63 | on screen → ta | turn l.lv>=3?"Tuần này phi tần dễ ra tay hại ngươi hơn (gấp rưỡi). Nên giữ mình, |
| j14.js:4 | on screen → Ta |  log(`<span class="r">${why}. Ngươi bị đưa vào lãnh cung.</span>` |
| j14.js:7 | on screen → Ta |  log(`<b class="g">${why}. Ngươi được rời lãnh cung, phục vị $ |
| j14.js:7 | on screen → Ta | ung",cls:"end",who:pMe(),h:`<p>${why}.</p><p>Ngươi được phục vị <b>${RANKS[S.ran |
| j14.js:11 | on screen → ta | 1;if(S.coldEv>=2){restore(true,"Án được lật, ngươi được minh oan");if(b&&(b===S¦ |
| j14.js:19 | on screen → Ta | h"&&S.ill.st>=3&&roll(30)){over("Lãnh cung","Ngươi u uất thành điên dại, sống nố |
| j15.js:37 | on screen → ta | [st?"":chip(together(S,v)?`Đang cùng chỗ với ngươi`:locKnown(v)?`Thấy ở ${placeN |
| j15.js:37 | on screen → ta | `:"Nơi ở: không rõ","loc"),"",chip(host?"Thù ngươi":v.rel>20?"Thân với ngươi":"B |
| j15.js:37 | on screen → ta | ,"",chip(host?"Thù ngươi":v.rel>20?"Thân với ngươi":"Bình thường",host?"hot":v.r |
| j15.js:37 | on screen → Ta | ,host?"hot":v.rel>20?"ok":""),v.pg>=20?chip(`Ngươi ghen ${v.pg}`,"hot"):"",v.ev? |
| j15.js:37 | on screen → ta | ,evG(v,S)?chip(`Nắm ${evG(v,S)} chứng cứ của ngươi`,"hot"):"",v.preg&&!v.hidden? |
| j15.js:37 | on screen → ta | n(", ")}`,"hot"):"",v.enemy?chip("Kẻ thù nhà ngươi","hot"):"",v.oldmis?chip("Chủ |
| j15.js:37 | on screen → ta | à ngươi","hot"):"",v.oldmis?chip("Chủ cũ của ngươi","hot"):"",facOf(v)?chip(`Phe |
| j15.js:40 | on screen → ta | ote=sameHouse(S,v)?`Cùng ${houseName(v)} với ngươi: không thể lấy lòng hay ra ta |
| j15.js:54 | on screen → ta | f:pMaid(),name:shortN(S.maid.name),sep:"Cung ngươi"}); |
| j15.js:59 | on screen → ta | ,"hot"):"",s.spyFor==="me"?chip("tai mắt của ngươi","ok"):""]; |
| j15.js:64 | on screen → ta | servSellO(S,s)>0?` · kèm: hắn đem chuyện của ngươi bán cho kẻ thù (kẻ ấy nắm thê |
| j15.js:67 | on screen → ta | s.spyFor==="me"?"Người này đã là tai mắt của ngươi.":"", |
| j15.js:76 | on screen → ta | : <b>${MOODS[S.emp.mood][0]}</b>`,`Ngài sủng ngươi <b>${S.sung}</b>`]} |
| j15.js:77 | on screen → ta | i hậu";lines=[tuoi(S.thAge),`Thái hậu thương ngươi <b>${S.th}</b>`]} |
| j15.js:85 | on screen → ta | rạng: <b>${MOODS[E.mood][0]}</b>`,`Ngài sủng ngươi <b>${S.sung}</b> · Ân tình <b |
| j18.js:11 | on screen → ta |  ["Kẻ nhắm vào ngươi",pick(/ngươi.*(bị¦trúng)¦định |
| j18.js:11 | regex (code matches log text): unchanged |  ["Kẻ nhắm vào ngươi",pick(/ngươi.*(bị¦trúng)¦định .*(ngươi¦của |
| j18.js:11 | regex (code matches log text): unchanged | m vào ngươi",pick(/ngươi.*(bị¦trúng)¦định .*(ngươi¦của ngươi)¦tố giác ngươi¦vu . |
| j18.js:11 | regex (code matches log text): unchanged | i",pick(/ngươi.*(bị¦trúng)¦định .*(ngươi¦của ngươi)¦tố giác ngươi¦vu .*ngươi¦nhắ |
| j18.js:11 | regex (code matches log text): unchanged | *(bị¦trúng)¦định .*(ngươi¦của ngươi)¦tố giác ngươi¦vu .*ngươi¦nhắm vào ngươi/i,3 |
| j18.js:11 | regex (code matches log text): unchanged | ¦định .*(ngươi¦của ngươi)¦tố giác ngươi¦vu .*ngươi¦nhắm vào ngươi/i,3)],["Ban th |
| j18.js:11 | regex (code matches log text): unchanged | của ngươi)¦tố giác ngươi¦vu .*ngươi¦nhắm vào ngươi/i,3)],["Ban thưởng, đồ vật",p |
| j19.js:3 | regex (code matches log text): unchanged | T=/(thù¦oán¦ghen¦nàng nắm¦nắm .*chứng cứ của ngươi¦nhắm vào thai¦nghi ngươi¦bị đ |
| j19.js:3 | regex (code matches log text): unchanged | ¦nắm .*chứng cứ của ngươi¦nhắm vào thai¦nghi ngươi¦bị đuổi)/i; |
| j19.js:36 | on screen → ta | ac","Bạc"],["duc","Đức"],["th","Thái hậu với ngươi"],["hh","Hoàng hậu với ngươi" |
| j19.js:36 | on screen → ta | ","Thái hậu với ngươi"],["hh","Hoàng hậu với ngươi"],["sac","Sắc"],["tai","Tài"] |
| j19.js:65 | on screen → ta |  xem chú giải Đức).",mat:"Tai mắt: người của ngươi khắp cung. Giúp biết tin, phá |
| j19.js:65 | on screen → ta | ết tin, phát giác mưu hại.",th:"Thái hậu với ngươi: lòng thương của Thái hậu.",h |
| j19.js:65 | on screen → ta | lòng thương của Thái hậu.",hh:"Hoàng hậu với ngươi: chính là thiện cảm của Hoàng |
| j19.js:65 | on screen → ta |  ngươi: chính là thiện cảm của Hoàng hậu với ngươi (một con số duy nhất).",maid: |
| j19.js:71 | on screen → ta | ắt",S.mat,"","tai-mat")+c("th","Thái hậu với ngươi",S.th,"","thai-hau")+(queenP( |
| j19.js:71 | on screen → ta | queenP()&&queenP()!==S?c("hh","Hoàng hậu với ngươi",S.hh,S.hh<-20?"hot":S.hh>20? |
| j20.js:12 | on screen → ta | u ${q.name} sai Nội vụ phủ khất bổng lộc của ngươi tháng tới.</span>`)}}} |
| j20.js:14 | on screen → ta | if(w===S)log(`Hoàng hậu ${q.name} ban thưởng ngươi 20 bạc vì hiền thục. Bạc +20. |
| j20.js:15 | on screen → ta | chỉ 5 bạc. Cấm túc: nửa bổng. Hoàng hậu ghét ngươi (thiện cảm dưới -30): mỗi thá |
| j20.js:19 | on screen → ta | úa ra đời";BWHY.sinhthan="nhân sinh thần của ngươi";BWHY.nurse="vì hầu thuốc chu |
| j20.js:24 | on screen → ta | được sủng nhất)","birthday"],["Sinh thần của ngươi (Sủng từ 50)","sinhthan"],["H |
| j20.js:32 | on screen → Ta | "Hầu thuốc Hoàng thượng",t:"Long thể bất an. Ngươi sang Dưỡng Hòa điện sắc thuốc |
| j21.js:9 | on screen → Ta | w">${mdH(p===S?pMe():pv(p),"xs")}<b>${p===S?"Ngươi":p.name}</b><span class="past |
| j21.js:10 | on screen → ta | ="past">Lần lật thẻ gần nhất: ${last[0]===S?"ngươi":last[0].name} (${agoW(last[1 |
| j21.js:25 | on screen → Ta | tion relLines(v){return [`<span class="rlab">Ngươi với ${pron(v)}:</span> ${feel |
| j21.js:25 | on screen → ta | on(v)[0].toUpperCase()+pron(v).slice(1)} với ngươi:</span> ${knows(v)?feel(aff(v |
| j21.js:30 | on screen → Ta |  const chips=[["me","Ngươi",pMe()]].concat(liveRivals(tr |
| j21.js:33 | on screen → ta | g thượng",empName(),[`<span class="rlab">Với ngươi:</span> <span class="ef g">Sủ |
| j21.js:34 | on screen → ta | "Thái hậu","",[`<span class="rlab">Người với ngươi:</span> <span class="ef ${S.t |
| j21.js:35 | on screen → ta | àng thượng","",[`<span class="rlab">Ngài với ngươi:</span> <span class="ef g">Sủ |
| j21.js:35 | on screen → ta | "Thái hậu","",[`<span class="rlab">Người với ngươi:</span> <span class="ef ${S.t |
| j21.js:36 | on screen → Ta |  if(!knows(sel))return h+`<p class="past">Ngươi chưa gặp ${sel.name}, chưa rõ |
| j21.js:37 | on screen → Ta | p!==sel).map(p=>row(p===S?pMe():pv(p),p===S?"Ngươi":p.name,rkName(p),[`<span cla |
| j21.js:37 | on screen → ta | `<span class="rlab">${sel.name} với ${p===S?"ngươi":"nàng"}:</span> ${feel(aff(s |
| j21.js:56 | on screen → ta | tốn: 1 khắc · thành: buổi sau nàng sang cung ngươi · hỏng: nàng từ chối, thân -3 |
| j21.js:56 | on screen → ta | ổi sau":whyTime(1)¦¦(aff(v,S)<-30?"nàng ghét ngươi, sẽ không đến":""))} |
| j21.js:58 | on screen → Ta | o:od(40+aff(v,S)/2+(S.rank-rkOf(v))*5)};log(`Ngươi sai người mời ${v.name} buổi  |
| j21.js:61 | on screen → ta | v,"home");log(`${v.name} nhận lời, sang cung ngươi buổi này.`)}else{relAdd(S,v,- |
| j21.js:62 | on screen → ta | ]=k;seeLoc(v,k);log(`${v.name} sai người mời ngươi sang cung nàng chơi buổi này. |
| j21.js:70 | on screen → ta | 1;S.visit.msg=`${v.name} cáo bệnh không tiếp ngươi (nàng ghét ngươi).`}else{popI |
| j21.js:70 | on screen → ta | v.name} cáo bệnh không tiếp ngươi (nàng ghét ngươi).`}else{popIdx=i;popMsg=""}} |
| j21.js:76 | on screen → ta | e";seeLoc(v,"home");log(`${v.name} sang cung ngươi thăm hỏi.`)}else if(S.maid){l |
| j21.js:76 | on screen → ta | d){log(S.maid.loyal>=50?`${v.name} sang cung ngươi thăm, ngươi đi vắng; ${S.maid |
| j21.js:76 | on screen → ta | d.loyal>=50?`${v.name} sang cung ngươi thăm, ngươi đi vắng; ${S.maid.name} không |
| j21.js:76 | on screen → ta | hăm, ngươi đi vắng; ${S.maid.name} không nói ngươi đi đâu.`:`${v.name} sang cung |
| j21.js:76 | on screen → ta | hông nói ngươi đi đâu.`:`${v.name} sang cung ngươi thăm, ngươi đi vắng; ${S.maid |
| j21.js:76 | on screen → ta | ơi đi đâu.`:`${v.name} sang cung ngươi thăm, ngươi đi vắng; ${S.maid.name} lỡ mi |
| j21.js:76 | on screen → ta | , ngươi đi vắng; ${S.maid.name} lỡ miệng nói ngươi ở ${placeName(S.place)}.`)}}c |
| j22.js:13 | on screen → ta | function tinhW(t){return t>=70?"si mê ngươi":t>=50?"thầm thương ngươi":t> |
| j22.js:13 | on screen → ta | eturn t>=70?"si mê ngươi":t>=50?"thầm thương ngươi":t>=30?"để ý ngươi":t>=10?"có |
| j22.js:13 | on screen → ta | ngươi":t>=50?"thầm thương ngươi":t>=30?"để ý ngươi":t>=10?"có thiện cảm":"chưa đ |
| j22.js:22 | on screen → ta | vals(true));if(v){evA(v,S,1);log(`Có kẻ thấy ngươi liếc mắt với ${m.name}.`)}}}} |
| j22.js:23 | on screen → ta | ",o:od(60+S.tamco/5),x:`hắn giữ khăn tay của ngươi (là tang vật nếu bị lục) · tì |
| j22.js:28 | on screen → ta | a kín đáo. Sức +12. ${m.name} nguyện che chở ngươi. Người dễ biết chuyện: ${whoM |
| j22.js:29 | on screen → ta | )<=1);S.pregMismatch=!ok;r+=ok?" Mấy hôm sau ngươi biết mình có thai; ngày tháng |
| j22.js:29 | on screen → Ta | gày tháng trùng đêm thị tẩm.":` <b class="r">Ngươi có thai, mà sổ Kính sự phòng  |
| j22.js:33 | on screen → ta | ết bị nghi · hỏng: Tổng quản biết chuyện của ngươi",dom:"Mưu kế",go:()=>{S.pregM |
| j22.js:38 | on screen → ta | o.name} cho người tra sổ Kính sự phòng: ngày ngươi có thai không khớp đêm thị tẩ |
| j22.js:39 | on screen → ta | t báo: ${v.name} có vẻ biết chuyện riêng của ngươi. `}} |
| j22.js:48 | on screen → ta | m.trait}</b>`,m.tinh>=10¦¦m.letters?`Hắn quý ngươi: <span class="ef ${m.tinh>=50 |
| j22.js:48 | on screen → ta | ?"r":"g"}">${tinhW(m.tinh)}</span>`:`Hắn quý ngươi: <span class="ef n">chưa rõ</ |
| j22.js:48 | on screen → Ta | ý ngươi: <span class="ef n">chưa rõ</span>`,`Ngươi quý hắn: <span class="ef ${m. |
| j22.js:49 | on screen → ta | m.id&&S.preg?"Cha thật của đứa bé trong bụng ngươi":""].filter(Boolean); |
| j22.js:50 | on screen → ta | ot"):""],note:tt.length?`<b>Tư tình</b> (chỉ ngươi biết): ${tt.join(" · ")}`:"Gặ |
| j22.js:50 | on screen → ta | s="past">Khi bắt gặp hắn làm điều khuất tất, ngươi sẽ được chọn: báo thị vệ, báo |
| j24.js:15 | on screen → ta | wn[v.id];if(!k&&!knows(v))return `Có thể hại ngươi: <span class="ef n">chưa rõ</ |
| j24.js:15 | on screen → ta | v.id])S.dKnown[v.id]=wk()}return `Có thể hại ngươi: <span class="ef ${b>=2?"r":b |
| j24.js:16 | on screen → Ta |  mỗi mức, càng gần mức trên càng hay ra tay. Ngươi hại ai thì Oán của họ tăng; O |
| j24.js:27 | on screen → ta | ến",who:pv(v),h:`<p>${v.name} mang sang tặng ngươi <b>${IT[k].n}</b>.</p><p>${ki |
| j24.js:28 | on screen → ta | {v.name} đến tận cửa cung, buông lời mỉa mai ngươi trước mặt cung nhân.</p>`,opt |
| j24.js:28 | on screen → ta | áp trả sắc sảo",fx:{danh:1},x:"nàng oán +10, ngươi được tiếng cứng cỏi",go:()=>r |
| j24.js:30 | on screen → ta | h:`<p>Không báo trước, Hoàng thượng ghé cung ngươi uống chén trà.</p><p>${kitPar |
| j24.js:31 | on screen → ta | :pTH(),h:"<p>Đức Thọ cung cho người sang mời ngươi qua hầu chuyện.</p>",opts:[{n |
| j24.js:33 | on screen → ta | eAdd(v.id,`${S.maid.name} báo: nàng có ý hại ngươi (mức ${BANDS[bandOf(danger(v, |
| j24.js:33 | on screen → ta | (`Chắc chắn · thành: biết ${v.name} có ý hại ngươi, mức ${BANDS[bandOf(danger(v, |
| j24.js:35 | on screen → ta |  nữ bên cung ${v.name}, lén tìm đến xin theo ngươi.</p>`,opts:[{n:"Thu làm tai m |
| j24.js:42 | on screen → ta | :8});extra.push("Lúc bị ghẻ lạnh, đêm ấy cho ngươi chỗ dựa: Sức thêm +8")} |
| j24.js:43 | on screen → ta | push("thị vệ canh chừng: hai tuần tới kẻ hại ngươi khó ra tay hơn")}if(m.rw==="t |
| j24.js:43 | on screen → ta | .doctor=1;extra.push("thái y thành người của ngươi: dễ nhận ra độc")} |
| j24.js:51 | on screen → ta | g hà. ${m.name} đứng ra giữ triều chính, đưa ngươi ra khỏi cung, sống nốt đời dư |
| j24.js:56 | on screen → ta | ${def.length?` <span class="g">(Phòng bị của ngươi: ${def.join(", ")}.)</span>`: |
| j24.js:75 | on screen → ta | );log(`<span class="r">${g.name}, kẻ từng bị ngươi phạt oan, lén bán tin cho ${v |
| j24.js:91 | on screen → ta | nd==="emp"){const sw=S.sung>=70?"rất sủng ái ngươi":S.sung>=45?"thương ngươi":S. |
| j24.js:91 | on screen → ta | g>=70?"rất sủng ái ngươi":S.sung>=45?"thương ngươi":S.sung>=25?"còn nhớ đến ngươ |
| j24.js:91 | on screen → ta | g>=45?"thương ngươi":S.sung>=25?"còn nhớ đến ngươi":"chưa để tâm đến ngươi";lear |
| j24.js:91 | on screen → ta | ung>=25?"còn nhớ đến ngươi":"chưa để tâm đến ngươi";learn=`Ngài lúc này: ${MOODS |
| j24.js:92 | on screen → ta | !=="man"){const v=p.ref;learn=`${v.name} với ngươi: ${knows(v)?affW(aff(v,S)).to |
| j25.js:4 | on screen → ta |  thai: có thể động thai)","bị thấy: nàng oán ngươi"];AOUT.pushp=["nàng rơi xuống |
| j25.js:10 | on screen → ta | h lại, ${a.n.replace(/^Bàn tán về /,"")} oán ngươi +10: ${word(50)}`} |
| j25.js:11 | regex (code matches log text): unchanged | ")){a.x=a.x.replace(/ · nàng có thể nắm thóp ngươi/,"");a.risk=`nàng nắm 1 chứng |
| j25.js:11 | on screen → ta | p ngươi/,"");a.risk=`nàng nắm 1 chứng cứ của ngươi: ${word(50)}`} |
| j25.js:23 | on screen → ta | ¦¦`${r==="emp"?"Sủng":r==="th"?"Thái hậu với ngươi":"thiện cảm nàng"} +${g}`}}}) |
| j25.js:29 | on screen → ta |  if(a!==b.a)d.push([`${nm} với ngươi (thiện cảm)`,a-b.a,a]);if(m!= |
| j25.js:29 | on screen → Ta | i (thiện cảm)`,a-b.a,a]);if(m!==b.m)d.push([`Ngươi với ${nm}`,m-b.m,m]);if(e!==b |
| j25.js:29 | on screen → ta | -b.g),g,true]);if(o!==b.o)d.push([`${nm} oán ngươi`,-(o-b.o),o,true])} |
| j25.js:51 | on screen → ta |  2 khắc, Bạc -20 · thành: 2 tháng kẻ hại con ngươi dễ bị chặn (1 trong 2 lần)`,t |
| j25.js:56 | on screen → Ta | {spend(2);apply({bac:-20});S.kidGuard=2;log("Ngươi cắt người canh giữ các con 2  |
| j25.js:59 | on screen → ta |  `<b>[${ACT[k].n} · hỏng]</b> Người canh con ngươi chặn được kẻ lạ, khai ra ngườ |
| j25.js:62 | on screen → ta | sk:t=>!t.preg¦¦t.hidden?"nàng không có thai (ngươi biết)":"",catswap:t=>!(t.preg |
| j25.js:62 | on screen → ta | ẩm":"",plant:()=>!S.inv.some(e=>!e.h)?"rương ngươi trống":"",gift:()=>!S.inv.som |
| j25.js:62 | on screen → ta | ống":"",gift:()=>!S.inv.some(e=>!e.h)?"rương ngươi trống":"",block:t=>t.block?"t |
| j25.js:67 | on screen → ta | ng ¦hắn )?thù -(\d+)/g,(m,p,n)=>`${p¦¦""}oán ngươi +${n}`).replace(/thân -(\d+)/ |
| j25.js:68 | regex (code matches log text): unchanged | m\s*-¦lòng\s*-¦Sủng\s*-¦Danh\s*-¦Đức\s*-¦oán ngươi \+¦ghen \+/i.test(s)&&!/\bnàn |
| j25.js:68 | regex (code matches log text): unchanged | .test(s)&&!/\bnàng\b.*-/.test(s.replace(/oán ngươi.*/,"")))return"r";return k0(t |
| j25.js:84 | on screen → ta | `<p>${l.name}, người đứng đầu ${f.name}, mời ngươi vào phe.</p>`,opts:[{n:"Nhận  |
| j25.js:84 | on screen → ta | },x:`nàng thiện cảm +10 · kẻ thù của phe oán ngươi`,go:()=>{f.m.push(key(S));rel |
| j25.js:106 | on screen → ta | hẩm vị: ai đang ở đâu, ai sắp lên (theo điều ngươi biết).</p>${L.map(p=>{const m |
| j25.js:108 | on screen → Ta | w2">${mdH(me?pMe():pv(p),"sm")}<div><b>${me?"Ngươi":p.name}</b> <span class="pas |
| j27.js:14 | on screen → Ta |  if(S.pal!=null&&!palHeadOK(S)){log(`Ngươi dời khỏi ${PALN[S.pal]}.`);S. |
| j27.js:33 | on screen → ta |  palFn(k){if(k==="home")return "tẩm cung của ngươi";if(PLNAME[k])return PLNAME[k |
| j27.js:40 | on screen → ta | "home"):`thiên điện ${palName("home")} (cung ngươi)`):hd===p?palName(k):`thiên đ |
| j27.js:46 | on screen → ta | ;return{k,n:palName("home"),fn:"tẩm cung của ngươi",d:`Cung nữ và các con ở đây. |
| j27.js:61 | on screen → ta | HOMEN:palName(k),fn:k==="home"?"tẩm cung của ngươi":palFn(k),res:k==="home"¦¦k== |
| j27.js:74 | on screen → ta | }${s.res.length?" · ở: "+s.res.map(p=>p===S?"ngươi":p.name).join(", "):""}" styl |
| j28.js:75 | on screen → ta | );noteAdd(x.id,`${v.name} báo: nàng có ý hại ngươi`)}else{t.shield=Math.max(t.sh |
| j28.js:76 | on screen → ta | ${v.name} đứng ra hòa giải giữa ${t.name} và ngươi`}}, |
| j29.js:47 | on screen → ta | >2?1:0));leak=f===S?` ${s.name} tìm đến cung ngươi, kể chuyện của ${p.name}: chứ |
| j29.js:47 | on screen → ta | ng cứ +1.`:me?" Có tin hắn đã bán chuyện của ngươi cho người khác.":""}} |
| j29.js:58 | on screen → ta | ev+=`${s.name} lỡ miệng kể chuyện trong cung ngươi ra ngoài. Danh -1. `}}if(roll |
| j30.js:15 | on screen → Ta | ;S.lastPromo=S.turn;const t=`<span class="r">Ngươi ${why}, bị giáng xuống ${RANK |
| j30.js:24 | on screen → ta | /6),x:"thành: nàng Sủng -10 · hỏng: lộ, Sủng ngươi -4",f:(a,t)=>{ap(a,{bac:-20}) |
| j30.js:27 | on screen → ta |  nàng bị ban chết hoặc vào lãnh cung · hỏng: ngươi bị tội vu khống",f:(a,t)=>{co |
| j30.js:27 | on screen → Ta | uyện tư tình bị phơi bày trước Hoàng thượng. Ngươi bị ban chết.","Ban chết: tư t |
| j30.js:27 | on screen → Ta | hết.","Ban chết: tư thông bại lộ")¦¦"";cold("Ngươi tư thông bị phát giác");retur |
| j31.js:16 | on screen → ta | cung nghỉ ngơi",fx:{suc:10},x:"không ai để ý ngươi"}]}), |
| j31.js:20 | on screen → ta | }},{n:"Ngủ sớm",fx:{suc:10},x:"không ai để ý ngươi"}]}), |
| j34.js:10 | on screen → ta | log(`<b>${t}</b> Ứng viên: ${C.map(p=>p===S?"ngươi":p.name).join(", ")}.`); |
| j34.js:11 | on screen → ta |  trước Thái hậu, <b>Thế lực</b> (ai đứng sau ngươi).${has("trongtai")?" Ngài trọ |
| j34.js:11 | on screen → Ta | span>${mdH(p===S?pMe():pv(p),"xs")} ${p===S?"Ngươi":p.name}</span><b>${p===S?RAN |
| j34.js:15 | on screen → Ta | chén ngọc của Thái hậu rồi đổ cho người kia. Ngươi xử thế nào?",[["nhan","Tha cả |
| j34.js:16 | on screen → ta |  ["Một phi tần ốm nặng mà Hoàng thượng triệu ngươi thị tẩm. Ngươi làm gì?",[["nh |
| j34.js:16 | on screen → Ta | ốm nặng mà Hoàng thượng triệu ngươi thị tẩm. Ngươi làm gì?",[["nhan","Xin nhường |
| j34.js:17 | on screen → ta |  ["Nhà mẹ đẻ xin ngươi nói giúp một chức quan. Ngươi |
| j34.js:17 | on screen → Ta | "Nhà mẹ đẻ xin ngươi nói giúp một chức quan. Ngươi đáp sao?",[["le","Từ chối, hậ |
| j34.js:28 | on screen → ta | =(c.sab[key(t)]¦¦0)+1;const m=t===S?`Đàn của ngươi bị cắt dây trước buổi diễn (v |
| j34.js:28 | on screen → Ta | ây trước buổi diễn (vòng sau -2).`:`${a===S?"Ngươi":a.name} phá ${t.name}: vòng  |
| j34.js:29 | on screen → Ta | ));ap(a,{danh:-6,sung:-8});const m=`${a===S?"Ngươi":a.name} ra tay với ${NM(t)}  |
| j34.js:29 | on screen → Ta | , Sủng -8.`;log(m);return m}return `${a===S?"Ngươi":a.name} định ra tay nhưng kh |
| j34.js:31 | on screen → Ta | vòng",who:pMe(),h:`<p>Còn ${3-c.round} vòng. Ngươi dùng mấy ngày này thế nào?</p |
| j34.js:33 | on screen → ta | !ct().hint){ct().hint=1;log(`Qua chuyện trò, ngươi đoán được ${p.kind==="emp"?"H |
| j34.js:34 | on screen → Ta | span>${mdH(p===S?pMe():pv(p),"xs")} ${p===S?"Ngươi":p.name}${c.dq.includes(key(p |
| j34.js:38 | on screen → ta | i nghệ",who:pEmp(),h:`<p>Trước Hoàng thượng, ngươi trình diễn môn nào?</p>`,opts |
| j34.js:38 | on screen → ta | Score(S,a,Math.min(3,g));log(`Vòng Tài nghệ: ngươi được ${s[0]}/10.`);};if(windo |
| j34.js:39 | on screen → Ta | DILEMMAS);const hint=c.hint?`<p class="past">Ngươi đoán người xét trọng ${({nhan |
| j34.js:40 | on screen → ta | go:()=>{s[1]=dScore(S,v);log(`Vòng Đức hạnh: ngươi được ${s[1]}/10.`)}}))})} |
| j34.js:41 | on screen → ta | {backers(S).join(", ")¦¦"không ai"} đứng sau ngươi: ${s[2]}/10.`)}} |
| j34.js:45 | on screen → Ta | .unshift(w)}w.lastPromo=S.turn;res=`${w===S?"Ngươi":w.name} được lập làm Hoàng h |
| j34.js:45 | on screen → Ta | e{w.rank++;w.lastPromo=S.turn}}res=`${w===S?"Ngươi":w.name} được phong ${RANKS[M |
| j40.js:30 | on screen → ta | Log(v,"_clue");if(t===S)r+=`(Để lại dấu vết: ngươi nắm thêm 1 chứng cứ về ${v.na |
| j40.js:37 | on screen → ta | ¦¦0)*8))noteAdd(t.id,`Nghe nói ${t.name} ngờ ngươi đứng sau chuyện ${ACT[k]?ACT[ |
| j40.js:37 | on screen → ta | k].n.toLowerCase():"vừa rồi"}, dù không phải ngươi`)} |
| j40.js:56 | on screen → ta | ¦"có động tĩnh lạ"}${t===S?" (có lẽ nhắm vào ngươi)":` (có lẽ nhắm vào ${NM(t)}) |
| j40.js:57 | on screen → ta | h:`<p>${txt}.</p><p>Có lẽ nàng đang nhắm vào ngươi. Ngươi đã đề phòng: vài buổi  |
| j40.js:57 | on screen → Ta | {txt}.</p><p>Có lẽ nàng đang nhắm vào ngươi. Ngươi đã đề phòng: vài buổi tới mưu |
| j41.js:54 | on screen → ta | push({t:"Bị bắt",h:`<p>Thị vệ ${nm} bắt được ngươi ở cửa hông. Chuyện truyền khắ |
| j41.js:56 | on screen → ta | ?"Thái giám truyền khẩu dụ: Hoàng thượng cho ngươi vào.":"Cung nữ ra cửa mời ngư |
| j41.js:56 | on screen → ta | g thượng cho ngươi vào.":"Cung nữ ra cửa mời ngươi vào."}</p><p class="g">Được v |
| j41.js:72 | on screen → ta | visit.msg?S.visit.msg+" ":"")+"Có người thấy ngươi ở lãnh cung: Danh -2."}}catch |
| j41.js:78 | on screen → ta | =b+1&&S.place!==k&&S.visit){const why=S.out?"ngươi bị đày vào lãnh cung":S.confi |
| j41.js:78 | on screen → ta | out?"ngươi bị đày vào lãnh cung":S.confined?"ngươi đang bị cấm túc":""; |
| j41.js:115 | on screen → ta |  <p>${R("Cung phi tần khác")}: phẩm ngươi không thấp hơn chủ cung quá m |
| j41.js:118 | on screen → ta |  <p>${R("Cung của ngươi")}: luôn vào được.</p> |
| j43.js:36 | on screen → ta | ¦¦0)*8))noteAdd(t.id,`Nghe nói ${t.name} ngờ ngươi đứng sau chuyện ${ACT[k]?ACT[ |
| j43.js:36 | on screen → ta | k].n.toLowerCase():"vừa rồi"}, dù không phải ngươi`)}; |
| j43.js:59 | on screen → ta |  mắt"} báo: ${what}${t===S?" (có lẽ nhắm vào ngươi)":` (có lẽ nhắm vào ${NM(t)}) |
| j43.js:60 | on screen → ta | h:`<p>${txt}.</p><p>Có lẽ nàng đang nhắm vào ngươi. Ngươi đã đề phòng: vài buổi  |
| j43.js:60 | on screen → Ta | {txt}.</p><p>Có lẽ nàng đang nhắm vào ngươi. Ngươi đã đề phòng: vài buổi tới mưu |
| j42.js:9 | on screen → Ta | ng dân, qua kỳ tuyển cung nữ của Nội vụ phủ. Ngươi vào cung làm kẻ hầu, dưới cả  |
| j42.js:12 | on screen → ta | (HX,{tin:"Chủ tin: lòng tin của chủ nhân với ngươi (0-100). Cao thì được thưởng, |
| j42.js:12 | on screen → ta | khố.",nt:"Hoàng thượng để ý: ngài có nhớ mặt ngươi không. Từ 45 trở lên, mỗi lần |
| j42.js:12 | on screen → ta | mặt ngươi không. Từ 45 trở lên, mỗi lần để ý ngươi ngài hỏi tên và phong Đáp ứng |
| j42.js:12 | on screen → ta | ầu chủ mới.",sec:"Số chuyện mờ ám của chủ mà ngươi biết. Có thể mật báo để lấy t |
| j42.js:12 | on screen → Ta | ể lấy thưởng, nhưng chủ biết thì nguy.",spy:"Ngươi nhận bạc làm tai mắt cho ngườ |
| j42.js:14 | on screen → Ta | RY.cnv={t:"Từ cung nữ lên phi tần",n:3,goal:"Ngươi vào cung làm cung nữ. Được Ho |
| j42.js:17 | on screen → ta |  Tần");return `<b class="g">Từ thân cung nữ, ngươi đã lên Tần.</b> `}return ""}} |
| j42.js:46 | on screen → ta | g dân. Qua kỳ tuyển cung nữ, Nội vụ phủ chia ngươi về hầu <b>${rkName(m)} ${m.na |
| j42.js:47 | on screen → ta | it}${m.trait2?", "+m.trait2:""}</b>. Chủ tin ngươi: <b>${S.tin}</b>. Lương tháng |
| j42.js:50 | on screen → Ta |  log(`Ngươi vào cung làm cung nữ, hầu ${r |
| j42.js:80 | on screen → ta | ],info:`${rkName(v)}${v===m?" · chủ nhân của ngươi":""} · ${v.trait}`}); |
| j42.js:113 | on screen → ta | ,8);return ok?"Ngài nhận chén trà, liếc nhìn ngươi.":"Tay run, trà sóng ra khay. |
| j42.js:117 | on screen → ta | id};return `${v.name} lặng nghe, dúi vào tay ngươi một túi bạc.`},{lock:!(S.srv. |
| j42.js:117 | on screen → ta | &&hostile),t:S.srv.sec>0?"Nàng không thù chủ ngươi":"Chưa biết chuyện gì của chủ |
| j42.js:118 | on screen → ta | :3,bac:30},{suc:-20},`${m.name} bị xét tội · ngươi về hầu Hoàng hậu`,ok=>{if(ok) |
| j42.js:118 | on screen → ta | finally{ACTX.a=a0}srvReassign("Hoàng hậu giữ ngươi lại làm chứng.",v);return `${ |
| j42.js:127 | on screen → ta | "errand",6);r+=" Hoàng thượng ngẩng lên nhìn ngươi."} |
| j42.js:128 | on screen → ta | apply({danh:1});r+=" Ma ma Đức Thọ cung khen ngươi lễ phép."} |
| j42.js:132 | on screen → ta | n class="r">${m.name} thấy Hoàng thượng nhìn ngươi, sa sầm nét mặt.</span> Chủ t |
| j42.js:150 | on screen → Ta | u chủ",t:`${m.name} đang ở ${placeOf(mw).n}. Ngươi theo hầu.`,k:1,c:{},o:100,w:{ |
| j42.js:163 | on screen → Ta | nay Hoàng thượng ngự giá đến cung ${m.name}. Ngươi bưng khay trà vào điện.`,b:2, |
| j42.js:165 | on screen → ta | chuyện trong cung chủ cho người đã mua chuộc ngươi.",k:1,c:{},o:od(70+S.tamco/5) |
| j42.js:165 | on screen → ta | =>{if(roll(40))srvLaundry(`${m.name} bắt gặp ngươi lén lút với người của ${v.nam |
| j42.js:168 | on screen → ta | ;log("Tiểu thái giám Nội vụ phủ bắt nạt, bắt ngươi xách thêm hai gánh nước. Sức  |
| j42.js:169 | on screen → ta | met.push(s.sid);srvAf(s,5);log(`Ở Nội vụ phủ ngươi quen ${s.name}, ${srkName(s). |
| j42.js:196 | on screen → ta | ng bậc",who:pMe(),h:`<p>Nội vụ phủ ghi công: ngươi được thăng <b>${SRK.maid[S.sr |
| j42.js:199 | on screen → ta | ac:-40});srvReassign(`${big.name} bỏ bạc mua ngươi về cung mình.`,big)}} |
| j42.js:200 | on screen → Ta | chemes¦¦0;if(d>0&&roll(60)){S.srv.sec++;log(`Ngươi để ý thấy ${mm2.name} đang bà |
| j42.js:202 | on screen → ta | ;return ev}srvLaundry(`${mm2.name} phát hiện ngươi làm tai mắt cho ${v.name}.`,1 |
| j42.js:203 | on screen → ta | tray=null;if(roll(30)){die(`${mm2.name} biết ngươi phản chủ, sai người dìm ngươi |
| j42.js:203 | on screen → ta | mm2.name} biết ngươi phản chủ, sai người dìm ngươi xuống giếng sau Ngự hoa viên` |
| j42.js:203 | on screen → ta | iên`);return ev}srvLaundry(`${mm2.name} biết ngươi mật báo chuyện của nàng.`,12) |
| j42.js:210 | on screen → Ta | } 30 tuổi, Nội vụ phủ cho xuất cung theo lệ. Ngươi rời cung với ${S.bac} lạng bạ |
| j42.js:220 | on screen → Ta | home";S.visit=srvVisitOf("home");log(`${why} Ngươi về hầu ${rkName(n)} ${n.name} |
| j42.js:221 | on screen → ta | Đổi chủ",who:pv(n),h:`<p>${why}</p><p>Từ nay ngươi là <b>${srvTitle()}</b>. Tính |
| j42.js:223 | on screen → Ta |  log(`<span class="r">${why} Ngươi bị đày xuống Tân Giả khố ${we |
| j42.js:224 | on screen → Ta |  khố",cls:"end",who:pMe(),h:`<p>${why}</p><p>Ngươi bị đày xuống <b>Tân Giả khố</ |
| j42.js:227 | on screen → ta | ac:g,tin:1});log(`${m.name} vui lòng, thưởng ngươi ${g} lạng bạc.`);Q.push({t:"C |
| j42.js:227 | on screen → ta | ",who:pv(m),h:`<p>${m.name} vui lòng, thưởng ngươi ${g} lạng bạc.</p><p class="g |
| j42.js:228 | on screen → ta | if(S.tin<10){srvLaundry(`${m.name} chán ghét ngươi, sai người giải xuống Nội vụ  |
| j42.js:229 | on screen → ta | <span class="r">${m.name} sai thái giám đánh ngươi hai mươi trượng.</span> Sức - |
| j42.js:230 | on screen → ta | h:`<p>${m.name} nổi giận, sai thái giám đánh ngươi hai mươi trượng.</p><p class= |
| j42.js:236 | on screen → Ta | evA(m,t,1);apply({tin:4,bac:3,tamco:1});log(`Ngươi dò la được chuyện của ${t.nam |
| j42.js:242 | on screen → ta | A(t,m,2);relAdd(m,t,-10);srvLaundry(`Bị bắt, ngươi khai ra ${m.name}. ${t.name}  |
| j42.js:242 | on screen → ta | ${m.name}. ${t.name} nắm 2 chứng cứ; chủ hận ngươi.`,10);S.tin=5;return} |
| j42.js:243 | on screen → ta | ly({suc:-20,tin:3});log("Bị bắt và tra khảo, ngươi cắn răng không khai. Sức -20. |
| j42.js:247 | on screen → ta | v.intel.push(v.id);log(`${s.name} kể nhỏ với ngươi chuyện trong cung ${v.name}.  |
| j42.js:247 | on screen → Ta | ể nhỏ với ngươi chuyện trong cung ${v.name}. Ngươi có tin để bẩm chủ.`)}else{app |
| j42.js:247 | on screen → ta | }else{apply({bac:2});log(`${s.name} chia cho ngươi ít bánh trái và 2 lạng bạc.`) |
| j42.js:251 | on screen → ta |  ngạo"?"chê trà nguội, hắt cả chén vào người ngươi":m.trait==="Đa nghi"?"nghi ng |
| j42.js:251 | on screen → ta | n vào người ngươi":m.trait==="Đa nghi"?"nghi ngươi lén lút ra ngoài, gọi vào tra |
| j42.js:251 | on screen → ta | ơi lén lút ra ngoài, gọi vào tra hỏi":"trách ngươi làm việc chậm chạp"}.</p>`,wh |
| j42.js:259 | on screen → ta |  return{t:`<p>${m.name} gọi ngươi vào phòng trong, đóng cửa: “N |
| j42.js:259 | NPC quote “…”: keeps ngươi | .name} gọi ngươi vào phòng trong, đóng cửa: “Ngươi đi ${desc}.”</p><p class="pas |
| j42.js:261 | on screen → ta | ply({suc:-20});log(`${m.name} sai người phạt ngươi quỳ trên đá vụn. Sức -20.`);i |
| j42.js:262 | on screen → ta |  nắm 2 chứng cứ của ${m.name} · chủ biết thì ngươi bị đánh chết hoặc đày Tân Giả |
| j42.js:262 | on screen → Ta | >{evA(who,m,2);S.srv.betray={by:who.id};log(`Ngươi lén báo cho ${who.name} mưu c |
| j42.js:264 | on screen → ta | eturn{t:`<p>Một thái giám của ${v.name} chặn ngươi ở hành lang, dúi vào tay ngươ |
| j42.js:264 | on screen → ta | {v.name} chặn ngươi ở hành lang, dúi vào tay ngươi một túi bạc: “Chủ tử nhà ta m |
| j42.js:269 | on screen → ta | .name} (${srkName(s)}) tố với ${m.name} rằng ngươi lấy trộm ${item}.</p>${fr?`<p |
| j42.js:269 | on screen → ta | lass="past">${fr} người bạn sẽ làm chứng cho ngươi.</p>`:""}`,who:pServ(s),o:[ |
| j42.js:270 | on screen → Ta | rouble=wk();srvAf(s,-20);apply({tin:2});log(`Ngươi thanh minh được; ${s.name} bị |
| j42.js:270 | on screen → ta | ({tin:-12,suc:-15});log(`${m.name} không tin ngươi, sai đánh đòn.`);if(S.suc<=0) |
| j42.js:270 | on screen → ta | se if(S.tin<8)srvLaundry(`${m.name} cho rằng ngươi là kẻ cắp.`,6)}}}, |
| j42.js:274 | NPC quote “…”: keeps ngươi | nọ.":"Hoàng thượng đặt chén trà xuống, hỏi: “Ngươi tên gì? Hầu ở cung nào?”"}</p |
| j42.js:274 | on screen → ta | <p class="r">${m.name} hiểm độc lại chẳng ưa ngươi: nàng ra tay trước ngày sắc p |
| j42.js:275 | on screen → ta | phong ${RANKS[0].n}${risky?`, nhưng chủ giết ngươi trước ngày sắc phong: ${word( |
| j42.js:275 | on screen → ta | rước ngày sắc phong, ${m.name} sai người đẩy ngươi xuống giếng`);return}srvRise( |
| j42.js:275 | on screen → ta | vRise(pp.src==="month"?"Hoàng thượng nhớ đến ngươi":"Hoàng thượng để mắt đến cun |
| j42.js:275 | on screen → ta | :-15});if(m)log(`${m.name} biết chuyện, giận ngươi lả lơi. Chủ tin -15.`)}}}, |
| j42.js:278 | on screen → ta | ả một cung nữ hiền thục. Nội vụ phủ dâng tên ngươi.</p>`,who:pEmp(),o:[ |
| j42.js:279 | on screen → ta | w}, rời cung bằng kiệu hoa. Từ thân cung nữ, ngươi thành chính thất một nhà, sốn |
| j42.js:282 | on screen → ta | ${S.bac} lạng bạc. ${hi?"Là chưởng sự cô cô, ngươi được ban thêm bạc và một mảnh |
| j42.js:282 | on screen → Ta | ban thêm bạc và một mảnh ruộng.":S.bac>=100?"Ngươi mở một tiệm thêu nhỏ ở kinh t |
| j42.js:282 | on screen → Ta | ?"Ngươi mở một tiệm thêu nhỏ ở kinh thành.":"Ngươi về quê, sống đời bình dị."}`, |
| j42.js:283 | on screen → Ta | , dạy cung nữ mới",go:()=>{S.srv.mama=1;log("Ngươi ở lại cung làm ma ma.")}}); |
| j42.js:284 | on screen → ta | srvM()?srvM().name:"Chủ"} xin Nội vụ phủ giữ ngươi lại.`)}); |
| j42.js:286 | on screen → ta |  return{t:`<p>Năm nay ngươi ${S.age} tuổi, đến tuổi cung  |
| j42.js:288 | on screen → Ta | Thái Hòa điện":"Tiệc Thất tịch bên hồ sen"}. Ngươi theo hầu ${m?m.name:"chủ"}.</ |
| j42.js:297 | on screen → ta |  log(`<b class="g">${why}: ngươi được phong ${RANKS[0].n}.</b> |
| j42.js:298 | on screen → ta | ")}.</p><p>${m?`${m.name} ${tin>=60?"vẫn coi ngươi như người nhà.":"nhìn ngươi b |
| j42.js:298 | on screen → ta | tin>=60?"vẫn coi ngươi như người nhà.":"nhìn ngươi bằng ánh mắt lạnh như băng."} |
| j42.js:298 | on screen → ta | h như băng."}`:""}</p><p class="past">Từ nay ngươi theo luật của phi tần: Sủng,  |
| j42.js:333 | on screen → ta | ợng để ý",`${S.nt}/100 · từ 45, mỗi lần để ý ngươi ngài hỏi tên, phong ${RANKS[0 |
| j42.js:337 | on screen → Ta | n phận cung nữ</h3><p style="margin:0 0 4px">Ngươi là ${srvTitle()}${m?` (${rkNa |
| j42.js:339 | on screen → ta | h3><p class="past">Kẻ hầu cùng cung và người ngươi đã quen. Bạn (thiện cảm 30+)  |
| j42.js:339 | on screen → ta | i đã quen. Bạn (thiện cảm 30+) làm chứng khi ngươi bị vu, mách tin; kẻ ghét ngươ |
| j42.js:339 | on screen → ta | làm chứng khi ngươi bị vu, mách tin; kẻ ghét ngươi (dưới 0) tìm dịp vu cáo.</p>` |
| j42.js:348 | on screen → ta | S.srv.intel.push(v.id);log(`${s.name} kể cho ngươi chuyện trong cung ${v.name}:  |
| j42.js:350 | on screen → Ta | uble=wk();srvAf(s,-40);apply({tin:3});let r=`Ngươi tố ${s.name} lười nhác; ${m.n |
| j42.js:351 | on screen → Ta |  srvAf(s,-30);apply({tin:-5});log(`Ngươi tố ${s.name} nhưng ${m.name}  |
| j42.js:351 | on screen → ta | s.name} nhưng ${m.name} không tin, còn trách ngươi gây chuyện.`);return false} |
| j42.js:374 | on screen → ta | 0)){S.srv.leak=pick(L).id}log(`Có người thấy ngươi với ${m.name}. Lời ra tiếng v |
| j42.js:379 | on screen → ta | ;if(roll(50)){die(`${pre} Bụng mang dạ chửa, ngươi bị đánh chết ở Thận Hình ti`) |
| j42.js:379 | on screen → ta | "Bị đuổi khỏi cung",`${pre} Mang thai hoang, ngươi bị đánh đòn rồi đuổi ra khỏi  |
| j42.js:380 | on screen → ta | die(`${pre} Chuyện dính vào mưu của phi tần, ngươi bị diệt khẩu`);return} |
| j42.js:381 | on screen → Ta | );if(r<.25){over("Bị đuổi khỏi cung",`${pre} Ngươi bị tước tên khỏi sổ cung nữ,  |
| j42.js:382 | on screen → Ta | 10);apply({suc:-d});if(S.suc<=0){die(`${pre} Ngươi chết dưới đòn roi`);return}sr |
| j42.js:382 | on screen → Ta | hết dưới đòn roi`);return}srvLaundry(`${pre} Ngươi bị đánh ${d>25?"ba mươi":"hai |
| j42.js:385 | on screen → Ta | id)&&roll(40)){S.srv.knowAff.push(v.id);log(`Ngươi bắt gặp ${v.name} lén trao đổ |
| j42.js:394 | on screen → ta | bị đuổi`,ok=>{if(!ok){srvAffairCaught(m,`Đêm ngươi hẹn ${m.name} bị bắt gặp.`);r |
| j42.js:395 | on screen → ta | {fr[0].name} canh ngoài hiên. Trời chưa sáng ngươi đã lẻn về.`;if(!S.srv.preg&&r |
| j42.js:395 | on screen → ta | ;S.srv.pregM=0;r+=` <b class="r">Mấy hôm sau ngươi biết mình có thai.</b>`}retur |
| j42.js:396 | on screen → ta | n ước trăm năm",od(45+m.tinh/3),"hắn hứa chờ ngươi xuất cung · mở đường thành th |
| j42.js:396 | on screen → ta | {S.srv.vow=m.id;return `${m.name} thề sẽ chờ ngươi.`}return "Hắn ngập ngừng, chư |
| j42.js:397 | on screen → Ta | l;if(S.srv.vow===m.id)S.srv.vow=null;return "Ngươi trả lại khăn tay."})} |
| j42.js:399 | on screen → ta | d(45+S.tamco/3),`Bạc +30 · nàng phải che chở ngươi · hỏng: nàng oán ngươi, tìm c |
| j42.js:399 | on screen → ta | 0 · nàng phải che chở ngươi · hỏng: nàng oán ngươi, tìm cách hại ngươi`,ok=>{S.s |
| j42.js:399 | on screen → ta | ở ngươi · hỏng: nàng oán ngươi, tìm cách hại ngươi`,ok=>{S.srv.knowAff=S.srv.kno |
| j42.js:399 | on screen → ta | d;return `${v.name} tái mặt, dúi bạc vào tay ngươi: “Câm miệng.”`}oanAdd(v,S,40) |
| j42.js:399 | on screen → ta | ))srvLaundry(`${v.name} ra tay trước, vu cho ngươi ăn cắp.`,8);return `${v.name} |
| j42.js:411 | on screen → ta | rv.lover)¦¦srvBond();srvAffairCaught(m,"Bụng ngươi lộ rõ, cung nhân xì xào.");re |
| j42.js:427 | on screen → ta |  return{t:`<p>Thái giám của ${v.name} chặn ngươi sau hòn non bộ: “Chuyện ngươi |
| j42.js:427 | NPC quote “…”: keeps ngươi | ${v.name} chặn ngươi sau hòn non bộ: “Chuyện ngươi với nam nhân bên ngoài, chủ t |
| j42.js:430 | on screen → ta | `${v.name} sai người mách chuyện tư tình của ngươi.`)}else S.srv.leak=null}}]}}; |
| j42.js:432 | on screen → ta |  return{t:`<p>${by} khen ngươi hầu hạ chu đáo, muốn ban gả n |
| j42.js:432 | on screen → ta | ${by} khen ngươi hầu hạ chu đáo, muốn ban gả ngươi cho <b>${w}</b>${m?`, người n |
| j42.js:432 | on screen → ta | uốn ban gả ngươi cho <b>${w}</b>${m?`, người ngươi ${tinhW(m.tinh).replace("ngươ |
| j42.js:432 | on screen → ta | >${m?`, người ngươi ${tinhW(m.tinh).replace("ngươi","")}`:""}.</p>`,who:pp.by=== |
| j42.js:433 | on screen → Ta | c ban hôn",`${by} ban gả ${S.name} cho ${w}. Ngươi rời cung có của hồi môn${m?", |
| j42.js:437 | on screen → ta | ề phủ ${m.name} làm thiếp. Từ phòng cung nữ, ngươi bước vào một hậu viện khác.`, |
| j42.js:441 | on screen → ta | nd();if(b){h="Thành thân";t+=` ${b.name} chờ ngươi ngoài cửa cung; hai người thà |
| j51.js:10 | on screen → ta | function kvMomName(v){return v?v.name:"ngươi"} |
| j51.js:65 | on screen → ta | e}, đích tử của ${d.v?"Hoàng hậu "+d.v.name:"ngươi (Hoàng hậu)"}, thay Thái tử $ |
| j51.js:74 | on screen → ta | ss="g">Hoàng thượng lập ${x.k.name}, con của ngươi, làm Thái tử</b> (${why}). Da |
| j51.js:83 | on screen → ta | e} tuổi · con ${x.v?x.v.name:"<b class=\"g\">ngươi</b>"}${x.v&&(!x.v.alive¦¦x.v. |
| j52.js:71 | regex (code matches log text): unchanged | s,arguments);try{if(S&&!S.dead&&!NLP&&/xong: Ngươi/.test(String(r¦¦"")))pdAdd(PD |
| j53.js:90 | on screen → ta | · ${v?"con "+v.name:"<strong class=\"g\">con ngươi</strong>"}</span></span><b>${ |
| j53.js:112 | on screen → ta | x.v?"con "+x.v.name:"<strong class=\"g\">con ngươi</strong>"}</span></span><b cl |
| j53.js:119 | on screen → ta | }: ${best.k.name}, con ${best.v?best.v.name:"ngươi"}, đứng đầu, được Hoàng thượn |
| j53.js:157 | on screen → ta |  +${ktG(g)}. ${roll(25)?ktReveal(k,"Dạy con, ngươi thấy"):""}`)} |
| j53.js:182 | on screen → ta | } tuổi · con ${v?v.name:"<strong class=\"g\">ngươi</strong>"}</span></span><b>${ |
| j54.js:19 | on screen → ta | function h54MomN(p){return p===S?"ngươi":p.name} |
| j54.js:55 | on screen → ta |  txt=`${h54Name(k)}${me?", con ngươi,":` (con ${p.name})`} được hứ |
| j54.js:55 | on screen → ta |  trai ${s.off}${b?`; nhà ấy chống lưng ${me?"ngươi":p.name} (+${b})`:""}.`; |
| j54.js:64 | on screen → ta |  return `${h54Name(k)}${me?", con ngươi,":` (con ${p.name})`} theo sứ |
| j54.js:64 | on screen → ta | hân. Hoàng thượng cảm kích, ban thưởng ${me?"ngươi":p.name}.`} |
| j54.js:69 | on screen → Ta |  ${H54T[t]} (${why}).${h54Live(p)?` ${p===S?"Ngươi":p.name} Danh +${d}.`:""} `;i |
| j54.js:135 | on screen → ta | uốn thuận mối này và chọn ${h54Name(k)}, con ngươi, ${k.age} tuổi.<br>Ngài hỏi ý |
| j54.js:135 | on screen → ta | k)}, con ngươi, ${k.age} tuổi.<br>Ngài hỏi ý ngươi.`,o:[ |
| j54.js:137 | on screen → ta | ành: ngài gả một tông nữ thay, con ở lại bên ngươi (Mẫu tử +10) · hỏng: Sủng -10 |
| j54.js:138 | on screen → ta | nh:-2},x:`${word(o2)} · thành: con ở lại bên ngươi (Mẫu tử +5) · hỏng: ngài khôn |
| j54.js:138 | on screen → ta | ) · hỏng: ngài không đổi ý, con vẫn phải đi; ngươi được Thái hậu +8, Sủng +6 vì  |
| j54.js:138 | on screen → ta | .hEnvY=S.turn;log(`Hoàng thượng nhận tông nữ ngươi tiến cử; ${h54Name(k)} ở lại. |
| j54.js:142 | on screen → Ta | :()=>{k.hMet=s.id;k.hM=cl(k.hM+6,0,100);log(`Ngươi để ${h54Name(k)} thư từ với $ |
| j54.js:143 | on screen → Ta |  thương`,go:()=>{k.hM=cl(k.hM-10,0,100);log(`Ngươi cấm ${h54Name(k)} gặp lại ${s |
| j54.js:146 | on screen → ta | who:kidFace(k),t:`${h54Name(k)} về cung thăm ngươi, khóc kể phò mã ${W.s.name} l |
| j54.js:148 | on screen → ta | x:`giữ êm thể diện, nhà chồng vẫn chống lưng ngươi · kèm: Mẫu tử -8, con buồn`,g |
| j54.js:148 | on screen → Ta | con buồn`,go:()=>{k.hM=cl(k.hM-8,0,100);log(`Ngươi khuyên ${h54Name(k)} nhẫn nhị |
| j54.js:154 | on screen → ta | k.hT¦¦0),bac:-d},x:[`nhà ${s.off} chống lưng ngươi +${b} (cộng vào thế lực phe v |
| j54.js:155 | on screen → ta | ức +3, Danh +2, nhà chàng biết ơn chống lưng ngươi +${H54.love}, con sống vui, k |
| j54.js:155 | on screen → ta | ện về sau · hỏng: ngài không chuẩn (con biết ngươi đã xin: Mẫu tử +5)`,go:()=>{i |
| j54.js:155 | on screen → ta | cho ${h54Name(k)} lấy ${love.name}. Con biết ngươi đã xin: Mẫu tử +5.`)}}})} |
| j54.js:157 | on screen → ta | h({n:"Chưa bàn vội",fx:{},x:`con được ở cạnh ngươi thêm: Mẫu tử +3 · kèm: mỗi th |
| j54.js:157 | on screen → Ta | word(8)}`,go:()=>{k.hM=cl(k.hM+3,0,100);log(`Ngươi chưa vội bàn hôn sự cho ${h54 |
| j54.js:158 | on screen → ta | Các mối hỏi được (tùy tước hiệu con, phẩm vị ngươi, lòng thương của Hoàng thượng |
| j54.js:185 | on screen → ta | {h54Name(x.k)} · ${x.p===S?'<b class="g">con ngươi</b>':"con "+x.p.name}${x.a?`  |
| j54.js:193 | on screen → ta |  · ${k.age} tuổi · ${p===S?'<b class="g">con ngươi</b>':"con "+p.name}</span><b> |
| j54.js:198 | on screen → ta | ">${V.join(", ")} về cung dự yến, nói đỡ cho ngươi trước Hoàng thượng.</span> Sủ |
| j54.js:208 | on screen → ta | me}"`,"Tự dạy con tài nghệ","",`nghệ nào của ngươi cũng không hơn con`)); |
| j54.js:215 | on screen → Ta | hTt=S.turn;title=`Dạy con ${H54N[art]}`;log(`Ngươi tự tay dạy ${h54Name(k)} ${H5 |
| j54.js:218 | on screen → Ta | ¦¦50)+3,0,100);title="Gửi thư thăm con";log(`Ngươi gửi thư và quà cho ${h54Name( |
| j54.js:220 | on screen → ta | uỳ xin cho mẹ; Hoàng thượng giảm cấm túc của ngươi một tháng. Mẫu tử -4.`)}else{ |
| j54.js:220 | on screen → ta | ng hầu chuyện Hoàng thượng, khéo nói tốt cho ngươi. Mẫu tử -4.`)}} |
| j54.js:230 | on screen → ta | "} ở nhà chồng${k.hW.b?` · nhà ấy chống lưng ngươi +${k.hW.b}`:""}`);return L} |
| j54.js:238 | on screen → ta |  · ${k.age} tuổi · con ${p===S?'<b class="g">ngươi</b>':p.name}</span><b>${h54St |
| j54.js:241 | on screen → ta | <p class="past">Nhà chồng các con chống lưng ngươi: <b>${S.hon¦¦0}</b> (cộng vào |
| j55.js:2 | comment: not shown |  cứ tham ô). Một luật cho mọi phi tần, kể cả ngươi. ================= */ |
| j55.js:28 | on screen → ta | function tdName(p){return p===S?"ngươi":p.name} |
| j55.js:44 | on screen → ta | }): cấm túc 1–3 tháng, Thái hậu với ${a===S?"ngươi":"nàng"} -8, Hoàng hậu với ${ |
| j55.js:44 | on screen → ta | S?"ngươi":"nàng"} -8, Hoàng hậu với ${a===S?"ngươi":"nàng"} -5`} |
| j55.js:47 | on screen → ta | `Ngự sử hặc ${tdName(a)} can chính; ${a===S?"ngươi":"nàng"} bị cấm túc.`);return |
| j55.js:56 | on screen → ta | m +20${tdBacks(h,a)?`, nay đứng sau ${a===S?"ngươi":"nàng"}`:""}. `} |
| j55.js:68 | on screen → Ta | )){relAdd(a,t,-8);oanAdd(t,a,8);r+=`${t===S?"Ngươi":t.name} biết chuyện ${tdName |
| j55.js:72 | on screen → ta | ách chức.</b> Nhà ${cT} thế lực -6; ${t===S?"ngươi mất chỗ dựa: nhà mẹ đẻ -15, D |
| j55.js:74 | on screen → ta |  ra người đứng sau là ${tdName(a)}: ${t===S?"ngươi":t.name} oán +25, ${h?`${TDOF |
| j55.js:115 | on screen → ta | m lây.`);if(M.includes(S))tdPop("Sớ khen nhà ngươi",h,`<p>Triều thần dâng sớ ca  |
| j55.js:115 | on screen → Ta | .name}. Nhà ${c} thế lực +3.</p><p class="g">Ngươi là người nhà ${c}, được thơm  |
| j55.js:126 | on screen → Ta | (p)} nhiều lần nhờ cậy ngoại triều. ${p===S?"Ngươi":p.name} bị cấm túc; Thái hậu |
| j55.js:126 | on screen → ta |  túc; Thái hậu -8, Hoàng hậu -5 với ${p===S?"ngươi":"nàng"}.</span> `;tdNews(`Ng |
| j55.js:135 | on screen → ta |  ev=pre+`Tra xét có thật, cha ${t===S?"ngươi":"nàng"} bị cách chức (cơ may |
| j55.js:135 | on screen → ta |  ${word(o)}). Nhà ${cT} thế lực -6; ${t===S?"ngươi mất chỗ dựa: nhà mẹ đẻ -15, D |
| j55.js:136 | on screen → ta | "chưa đủ chứng":`không thấy gì: cha ${t===S?"ngươi":"nàng"} thanh liêm`}; Hoàng  |
| j55.js:137 | on screen → ta |  if(t===S)tdPop("Sớ hặc cha ngươi",hA,`<p>${ev}</p>`);return ev |
| j55.js:153 | regex (code matches log text): unchanged |  if(r){const pub=/Ngự sử¦bị cách chức¦bị bác¦Ngươi biết chuyện/.test(r);ev+=pub? |
| j55.js:171 | on screen → Ta |  h+=`<div class="ph"><span>${myC?`Ngươi là người nhà <b>${myC}</b>${m |
| j55.js:171 | on screen → ta |  <b>${myC}</b>${myH&&myH.dadOf==="me"?" (cha ngươi đứng đầu)":""}`:"Nhà mẹ đẻ ng |
| j55.js:171 | on screen → ta | "me"?" (cha ngươi đứng đầu)":""}`:"Nhà mẹ đẻ ngươi không thuộc năm nhà quyền thầ |
| j55.js:172 | on screen → ta |  const askWhy=!myC?"nhà ngươi không có người ở triều":busy¦ |
| j55.js:176 | on screen → ta | a, Danh -4 · hỏng: Chứng cứ -1 · kèm: tra ra ngươi thì nàng oán +25 · kèm: ${ccL |
| j55.js:177 | on screen → ta | c (cần 40)":c===myC&&hd.dadOf==="me"?"là cha ngươi":""); |
| j55.js:179 | on screen → ta | TDOFF[c]} ${hd.name}${hd.dadOf==="me"?" (cha ngươi)":""} · ${hd.age} tuổi · ${hd |
| j55.js:180 | on screen → ta | l")}${hd.dadOf==="me"?"":sbar("Thiện cảm với ngươi",af,"tdaf")}</div> |
| j55.js:181 | on screen → Ta | chip(`${mdH(p===S?pMe():pv(p),"xs")}${p===S?"Ngươi":p.name}${p!==S&&trS().clean[ |
| j55.js:181 | on screen → ta | ("")}${tdBacks(hd,S)&&c!==myC?chip("Đứng sau ngươi","ok"):""}</div> |
| j55.js:182 | on screen → ta | 0 · thành: thiện cảm +20; từ 40 ông đứng sau ngươi (tranh ghế +${Math.round(hd.p |
| j55.js:185 | regex (code matches log text): unchanged | des(r.name));if(v)return mdH(pv(v),"xs");if(/ngươi/.test(t))return mdH(pMe(),"xs |
| j55.js:187 | on screen → ta | ôn, tùy nhà) · thành: đầu nhà chồng đứng sau ngươi (thiện cảm +25), nhà chồng ch |
| j55.js:187 | on screen → ta |  ngươi (thiện cảm +25), nhà chồng chống lưng ngươi khi tranh ghế · kèm: con khôn |
| j55.js:191 | on screen → ta | s}; ${TDOFF[hs]} ${h.name} đứng sau ${p===S?"ngươi":"nàng"}.`);if(p===S)ev+=`${T |
| j55.js:191 | on screen → ta | s]} ${h.name} thành thông gia: thiện cảm với ngươi +${n}. `} |
| j55.js:204 | on screen → ta | 5, Danh -4 · hỏng: Chứng cứ -1 · kèm: tra ra ngươi: nàng oán +25 · kèm: ${ccLine |
| j60.js:15 | on screen → Ta | const KIT_ROLES={player:{n:"Ngươi",sex:"f",metal:null},consort: |
| j61.js:10 | comment: not shown |  report, scouting. Logged once: "Ngươi đã biết: đó là …". |
| j61.js:59 | on screen → Ta | if(!quiet){if(nm.length)log(`<span class="g">Ngươi đã biết: đó là ${nm.map(k61Ti |
| j61.js:59 | on screen → Ta | +how:""}`);else if(pubSeen.length&&st<3)log(`Ngươi đã được thấy mặt ${pubSeen.ma |
| j61.js:59 | on screen → Ta | ${how?" "+how:""}`);else if(desc.length)log(`Ngươi đã thấy mặt ${desc.join(", ") |
| j61.js:59 | on screen → Ta | ow:""}`);else if(st===3)log(`<span class="g">Ngươi đã quen biết ${L.map(k61Title |
| j61.js:122 | on screen → ta | phận theo y phục${riv?" · nàng cũng biết mặt ngươi":""} · chưa biết tên`} |
| j61.js:123 | on screen → ta | :`biết tên người này${riv?" · nàng cũng biết ngươi":""}`}; |
| j61.js:127 | on screen → Ta |  if(a.k61==="greet"){k61Meet(e,"",1);popMsg=`Ngươi đã thấy mặt ${k61Desc(e)}; ch |
| j61.js:128 | on screen → ta | mp"?"Nam nhân áo vàng chính là Hoàng thượng; ngươi vội quỳ xuống.":"Người ấy xưn |
| j61.js:128 | on screen → Ta | ời ấy xưng danh.",2);popMsg=`<span class="g">Ngươi đã biết: đó là ${k61Title(e)} |
| j61.js:129 | on screen → ta | .tk¦¦{})[popIdx])k61Know(e,"Trò chuyện thêm, ngươi hiểu người ấy hơn.",false,3); |
| j61.js:143 | on screen → ta | eturn h+(n?`<p class="past">Còn ${n} phi tần ngươi chưa quen biết: chưa xem được |
| j61.js:147 | on screen → ta | 1Meet(e,"Người ấy đến tận nơi nói chuyện với ngươi.") |
| j61.js:148 | on screen → ta | hượng/.test(m.h¦¦""))k61Meet(e,"Ngài cho gọi ngươi đến hầu chuyện.")}}catch(e){} |
| j61.js:151 | on screen → ta | .thO=S.thO¦¦{};k61Know(S.thO,"Buổi thỉnh an, ngươi được dẫn đến trước mặt Thái h |
| j61.js:157 | on screen → ta | 61St(S.emp)<3)k61Know(S.emp,"Đêm ấy, lần đầu ngươi được nhìn rõ long nhan.",fals |
| j61.js:159 | on screen → ta | (v)){k61Know(v,"Tai mắt chỉ mặt, nói tên cho ngươi.");render()}}catch(e){}return |
| j61.js:164 | on screen → ta | wn&&!k61Named(v)){k61Know(v,"Nàng tự đến gặp ngươi.",true);npcLearn(v,S)}}catch( |
| j61.js:166 | on screen → ta | own&&!k61Named(a))k61Know(a,"Nàng tự tìm đến ngươi.",true)}catch(e){}return r0.a |
| j64.js:3 | on screen → ta |  tuần, khả năng Hoàng thượng lật thẻ bài của ngươi. Tăng nhờ Sủng, Sắc; bằng 0 k |
| j77.js:42 | on screen → ta | push({t:"Bị bắt",h:`<p>Thị vệ ${nm} bắt được ngươi ở cửa hông. Chuyện truyền khắ |
| j77.js:68 | on screen → Ta | {n} bóng người ở đó.</p>`:""}<p class="past">Ngươi ở lại đó: buổi sau bắt đầu ng |
| j77.js:142 | on screen → ta | ời thì khỏi)":""}${C.mode==="required"?"":"; ngươi vẫn có thể đi thẳng đến chỗ n |
| j77.js:142 | on screen → ta | ":"; ngươi vẫn có thể đi thẳng đến chỗ người ngươi thăm"}.</p>`]; |
| j77.js:146 | on screen → ta | i thì không cần bái kiến: mời nàng sang cung ngươi, hoặc chờ được mời.</p>`); |
| j77.js:150 | on screen → Ta | eturn;spend(C.khac);relAdd(S,h,C.okAff);log(`Ngươi cúi chào, bái kiến ${accRkNam |
| j77.js:197 | on screen → ta | ional")return"";return ` Chủ vị phẩm cao hơn ngươi đang ở cung: theo lệ ${C.mode |
| j77.js:203 | on screen → ta |  <p>${R("Cung của ngươi")}: luôn vào được.</p> |
| j77.js:213 | comment: not shown | the new buổi, with one line "Sang buổi tối · ngươi vẫn ở Kính sự phòng" */ |
| j77.js:216 | on screen → ta | Sang ${String(BUOI[S.buoi]).toLowerCase()} · ngươi vẫn ở ${nm}.`;if(!(S.visit.ms |
| j63.js:17 | on screen → ta | ng ¦hắn )?thù -(\d+)/g,(m,p,n)=>`${p¦¦""}oán ngươi +${n}`).replace(/thân -(\d+)/ |
| j63.js:42 | on screen → ta | ng ¦hắn )?thù -(\d+)/g,(m,p,n)=>`${p¦¦""}oán ngươi +${n}`).replace(/thân -(\d+)/ |
| j63.js:180 | on screen → ta |  if(da)(da>0?gp:bp).push(`${da>0?"quý ngươi hơn":"ghét ngươi hơn"} (${lo} |
| j63.js:180 | on screen → ta | >0?gp:bp).push(`${da>0?"quý ngươi hơn":"ghét ngươi hơn"} (${lo}→${hi}, ${kaN(da) |
| j63.js:180 | on screen → ta | (da)})`);else if(m!==b.m)(m>b.m?gp:bp).push(`ngươi ${m>b.m?"quý nàng hơn":"bớt ư |
| j63.js:186 | on screen → ta | aWho(q):"Hoàng hậu");per.push([who,d>0?[`quý ngươi hơn (${before[k]}→${now}, ${k |
| j63.js:186 | on screen → ta | efore[k]}→${now}, ${kaN(d)})`]:[],d<0?[`ghét ngươi hơn (${before[k]}→${now}, ${k |
| j63.js:195 | regex (code matches log text): unchanged | ¦không thành¦hỏng¦từ chối¦không ai tin¦trách ngươi¦quở¦bị phạt¦mắng¦thư giả¦vu k |
| j78.js:13 | on screen → ta | ion j78who(p){if(!p)return"";if(p===S)return"ngươi";if(p.alive===undefined&&p.na |
| j78.js:33 | on screen → Ta | nGuard¦¦{};S.onGuard[v.id]=v.plan.k;return " Ngươi đã đề phòng: lúc nàng ra tay, |
| j78.js:34 | on screen → ta | ,pri:90,txt:`${W} đang nắm ${me} chứng cứ về ngươi${me>=accNeed(S)?", đủ để tố g |
| j78.js:34 | on screen → ta | cứ về ngươi${me>=accNeed(S)?", đủ để tố giác ngươi":""}.`}); |
| j78.js:74 | on screen → ta | .legacy?"":j78when(),how:c.how¦¦"Tai mắt của ngươi",proves:p.proves,ref:p.ref,ai |
| j78.js:78 | on screen → ta | ng cứ về"));c={how:ln?plain(ln):"Tai mắt của ngươi"}} |
| j78.js:85 | on screen → ta |  if(c&&c.a===t&&c.t===S)ctx={how:`Người của ngươi bắt quả tang ${j78who(t)}`,pr |
| j78.js:86 | on screen → Ta |  else if(c&&c.a===S&&c.t===t)ctx={how:`Ngươi ${j78act(c.k,t)}`}; |
| j78.js:87 | on screen → ta | &c.a!==S&&c.t&&c.t!==S)ctx={how:`Tai mắt của ngươi thấy ${j78who(t)} ra tay`}; |
| j78.js:90 | on screen → ta | const prev=J78.ctx;J78.ctx={how:"Tai mắt của ngươi thấy tận mắt",proves:plain(tx |
| j78.js:105 | on screen → ta | iệc nguy hiểm: lòng -5. ${j78Who(x)} đoán ra ngươi sai người dò mình: oán ngươi  |
| j78.js:105 | on screen → ta | Who(x)} đoán ra ngươi sai người dò mình: oán ngươi +5.`)} |
| j78.js:110 | on screen → ta |  thì sợ hãi (lòng -5) · ${j78who(x)} đoán ra ngươi: oán ngươi +5`,go:j78maidSpy, |
| j78.js:110 | on screen → ta |  (lòng -5) · ${j78who(x)} đoán ra ngươi: oán ngươi +5`,go:j78maidSpy,fail:j78mai |
| j78.js:118 | on screen → Ta | 0+S.mat*6))){const facts=intelLearn(v,1,{by:"Ngươi",how:"Nghe lén câu chuyện"}); |
| j78.js:118 | on screen → Ta | i",how:"Nghe lén câu chuyện"});J78.ctx={how:"Ngươi nghe lén câu chuyện"};evA(S,v |
| j78.js:118 | on screen → Ta | câu chuyện"};evA(S,v,1);J78.ctx=null;return `Ngươi nghe lén ${j78who(v)} nói chu |
| j78.js:120 | on screen → Ta | 0=v.ev¦¦0;const n0=S.logSeq¦¦0;J78.ctx={how:"Ngươi sai người dò la"};let r;try{r |
| j78.js:123 | on screen → ta |  bắt gặp kẻ rình rập: nàng thiện cảm -8, oán ngươi +5.) `;return r}})(); |
| j78.js:124 | on screen → ta | {j78who(v)} bắt gặp: nàng thiện cảm -15, oán ngươi +9, ngươi bị cấm túc vì lục l |
| j78.js:124 | on screen → ta | } bắt gặp: nàng thiện cảm -15, oán ngươi +9, ngươi bị cấm túc vì lục lọi cung ph |
| j78.js:124 | on screen → ta | .test(r)?`Cung nhân của ${j78who(v)} bắt gặp ngươi lục rương: nàng thiện cảm -15 |
| j78.js:124 | on screen → ta | gặp ngươi lục rương: nàng thiện cảm -15, oán ngươi +9; ngươi bị phạt vì lục lọi  |
| j78.js:124 | on screen → ta | lục rương: nàng thiện cảm -15, oán ngươi +9; ngươi bị phạt vì lục lọi cung phi t |
| j78.js:152 | on screen → ta | rinhth")return[`${W} Sủng -10 · Thái hậu với ngươi +2`,"Thái hậu với ngươi -4"]; |
| j78.js:152 | on screen → ta | g -10 · Thái hậu với ngươi +2`,"Thái hậu với ngươi -4"]; |
| j78.js:154 | on screen → ta | eturn[`Bạc +${t?j78pay(t):0} · kèm: ${W} oán ngươi +10`,`Danh -3 · ${W} oán ngươ |
| j78.js:154 | on screen → ta | kèm: ${W} oán ngươi +10`,`Danh -3 · ${W} oán ngươi +15`]; |
| j78.js:155 | on screen → ta | và nắm ${n} chứng cứ về ${W} · kèm: ${W} oán ngươi +5`,""]} |
| j78.js:156 | on screen → ta | W} thiện cảm +${Math.min(30,8*n)} · ${W} oán ngươi -${Math.min(30,10*n)} · Đức + |
| j78.js:179 | on screen → ta | ng":sameHouse(S,p)?`cùng ${houseName(p)} với ngươi`:t2¦¦""; |
| j78.js:181 | on screen → ta | il:["Danh -8",`${W} thiện cảm -20`,`${W} oán ngươi +12`].concat(tr>=7?["phạm thư |
| j78.js:183 | on screen → ta | ${W} bị ban chết hoặc vào lãnh cung`],fail:["ngươi bị tội vu khống: vào lãnh cun |
| j78.js:184 | on screen → ta |  cứ -1"],gain:[`${W} Sủng -10`,"Thái hậu với ngươi +2"],fail:["Thái hậu với ngươ |
| j78.js:184 | on screen → ta | "Thái hậu với ngươi +2"],fail:["Thái hậu với ngươi -4"],risk:[`${W} thiện cảm -1 |
| j78.js:185 | on screen → ta | ",why:busy()¦¦(!q?"chưa có Hoàng hậu":q===S?"ngươi là Hoàng hậu: dùng Xử tội":q= |
| j78.js:186 | on screen → ta | gain:[`Bạc +${g}`],fail:["Danh -3",`${W} oán ngươi +15`],risk:[`${W} oán ngươi + |
| j78.js:186 | on screen → ta | nh -3",`${W} oán ngươi +15`],risk:[`${W} oán ngươi +10`].concat(together(S,p)?[] |
| j78.js:186 | on screen → ta | ,p)?[]:[`sai người đi: kẻ đi bị bắt, khai ra ngươi (${W} nắm 1 chứng cứ): ${word |
| j78.js:187 | on screen → ta |  ${n} chứng cứ về ${W}`]:[]),risk:[`${W} oán ngươi +5`],buyer:b?j78Ref(b):null}} |
| j78.js:188 | on screen → ta | W} thiện cảm +${Math.min(30,8*n)}`,`${W} oán ngươi -${Math.min(30,10*n)}`,"Đức + |
| j78.js:189 | on screen → ta | fail:[],risk:[`${W} thiện cảm -10`,`${W} oán ngươi +6`],go:()=>evidenceDo(p.id," |
| j79.js:16 | on screen → Ta | me" style="--rc:${kitPersonCol(S)}">${o.cap?"Ngươi":"ngươi"}</b>`; |
| j79.js:16 | on screen → ta | e="--rc:${kitPersonCol(S)}">${o.cap?"Ngươi":"ngươi"}</b>`; |
| j79.js:66 | regex (code matches log text): unchanged |  if(!who.length&&/(^¦\s)(ngươi¦Ngươi)(\s¦[.,!?]¦$)/.test(pla |
| j79.js:66 | regex (code matches log text): unchanged |  if(!who.length&&/(^¦\s)(ngươi¦Ngươi)(\s¦[.,!?]¦$)/.test(plain))wh |
| j79.js:76 | comment: not shown |  {group:true¦false, title}) -> rows; groups (Ngươi / Người trong cung / Triều đì |
| j79.js:84 | on screen → Ta | .length>=4&&kinds.length>=2){const G=[["me","Ngươi"],["person","Người trong cung |
| j79.js:116 | on screen → ta |  "Sủng":"Hoàng thượng thương ngươi bao nhiêu (0–100). Cao thì ha |
| j79.js:117 | on screen → ta |  "Danh":"Tiếng tăm của ngươi trong cung. Cần để thăng bậc; |
| j79.js:122 | on screen → ta |  "Tai mắt":"Số người ngầm báo tin cho ngươi khắp cung. Nhiều thì biết trư |
| j79.js:123 | on screen → ta | tình":"Tình nghĩa riêng giữa Hoàng thượng và ngươi, tích qua những đêm hầu hạ. G |
| j79.js:125 | on screen → ta |  "Bạc":"Tiền riêng của ngươi: bổng lộc hằng tháng, ban thư |
| j79.js:126 | on screen → ta |  "Chủ tin":"Chủ nhân tin ngươi bao nhiêu (0–100). Cao thì đư |
| j79.js:127 | on screen → ta |  "Lòng":"Kẻ hầu trung thành với ngươi bao nhiêu (0–100). Dưới 45 dễ |
| j79.js:128 | on screen → ta |  "Ghen":"Người ấy ghen với ngươi bao nhiêu. Ghen cao thì dễ ra |
| j79.js:128 | on screen → ta |  ngươi bao nhiêu. Ghen cao thì dễ ra tay hại ngươi.", |
| j79.js:129 | on screen → ta |  "Oán":"Người ấy oán hận ngươi bao nhiêu (vì ngươi từng hại  |
| j79.js:129 | on screen → ta |  "Oán":"Người ấy oán hận ngươi bao nhiêu (vì ngươi từng hại họ). Oán cao thì dễ  |
| j79.js:130 | on screen → ta |  "Thù":"Như Oán: người ấy thù ghét ngươi bao nhiêu. Cao thì dễ trả thù |
| j79.js:131 | on screen → ta |  "Thiện cảm":"Người ấy quý ngươi bao nhiêu (âm là ghét). Cao t |
| j79.js:131 | on screen → ta | nhiêu (âm là ghét). Cao thì giúp đỡ, che chở ngươi.", |
| j79.js:132 | on screen → ta |  "Chứng cứ":"Số bằng chứng ngươi đang giữ về lỗi của người ấy. |
| j79.js:139 | on screen → ta |  lật thẻ bài để chọn người hầu đêm. Khả năng ngươi được chọn mỗi tuần.", |
| j79.js:143 | on screen → ta |  "Ân thưởng":"Những lần ngươi được Hoàng thượng, Thái hậu b |
| j79.js:146 | on screen → ta |  quan trong triều. Thế lực nhà ngoại cao thì ngươi được nể.", |
| j79.js:170 | on screen → ta | ỗi tuần, cơ hội Hoàng thượng lật thẻ bài của ngươi (thang 7 bậc). Tăng nhờ Sủng, |
| j79.js:322 | on screen → Ta | ỗi mức, càng gần mức trên càng hay ra tay.","Ngươi hại ai thì Oán của người đó t |
| j79.js:517 | on screen → ta | cứ về nàng (có ${h})`:rkOf(t)>=7&&rkOf(S)<3?"ngươi từ Tần trở lên mới tố được Ho |
| j79.js:520 | on screen → ta |  takeaway:t=>rkOf(S)<=rkOf(t)?"phẩm ngươi cao hơn nàng":rkOf(t)>=4?"nàn |
| j79.js:522 | on screen → ta |  tocao:t=>!realCrime(t)?"nàng có tội thật (ngươi biết)":evG(S,t)<1?`1 chứng cứ |
| j79.js:523 | on screen → ta | e:t=>!hasScandal(t)?"nàng có chuyện tư tình (ngươi biết)":evG(S,t)<2?`2 chứng cứ |
| j79.js:524 | on screen → ta | ac(30)¦¦(!q¦¦q===S?"có Hoàng hậu (không phải ngươi)":q===t?"nàng không phải Hoàn |
| j79.js:524 | on screen → ta | g phải Hoàng hậu":aff(q,S)<40?`Hoàng hậu quý ngươi ≥40 (có ${aff(q,S)})`:rkOf(t) |
| j79.js:525 | on screen → ta |  pushp:t=>whereOf(S)!=="vuon"?"ngươi đang ở Ngự hoa viên":!togethe |
| j79.js:525 | on screen → ta | oa viên":!together(S,t)?"nàng ở cùng chỗ với ngươi":"",trip:t=>together(S,t)?"": |
| j79.js:525 | on screen → ta | rip:t=>together(S,t)?"":"nàng ở cùng chỗ với ngươi"})} |
| j79.js:530 | on screen → Ta | when:e.when})).join(""):`<div class="kpnote">Ngươi chưa giữ chứng cứ nào về nàng |
| j79.js:536 | on screen → Ta | ject:v,sections:[{html:kitIntel(list,{empty:"Ngươi chưa biết gì thêm về nàng. Dò |
| j79.js:624 | on screen → Ta | erCase()+gl.slice(1),"t"]]}].concat(now?[{h:"Ngươi đang có",html:`<div class="kp |
| j79.js:790 | on screen → ta | ộ đủ số phần đạt trong trò học, Thái hậu với ngươi +3`,t2¦¦(S.th<40?"cần Thái hậ |
| j87.js:200 | comment: not shown | hậu":"Nàng";/* owner 11/15 05:25Z: "Nàng quý ngươi", never the bare "Thiện cảm"  |
| j87.js:201 | on screen → ta |  if(o){[[sj+" quý ngươi",(p.rel¦¦0)-o[0]],["Ghen",(p. |
| j87.js:201 | on screen → ta | 0)-o[0]],["Ghen",(p.ghen¦¦0)-o[1]],[sj+" oán ngươi",(p.oan¦¦0)-o[2]]].forEach(([ |
| j87.js:202 | on screen → ta | ss="ef n kbk-pair">${kitGloss("Quý",sj+" quý ngươi")} ${p.rel¦¦0}</span>`,`<span |
| j87.js:202 | on screen → ta | ss="ef n kbk-pair">${kitGloss("Oán",sj+" oán ngươi")} ${p.oan¦¦0}</span>`,`<span |
| j87.js:236 | on screen → Ta |  b.push({h:"Ngươi tuần qua"});b.push({chips:d.D |
| j87.js:240 | on screen → ta |  if(d.me.length){b.push({h:"Việc của ngươi"});b.push({facts:kbkArt(d.me. |
| j65.js:6 | comment: not shown | er own stats: HUD + status panel -> Quan hệ "Ngươi" drops the Hoàng thượng / Thá |
| j65.js:8 | comment: not shown |  - consort card: "Nàng với ngươi: <label> · n" line -> chip "T |
| j65.js:8 | comment: not shown | ng với ngươi: <label> · n" line -> chip "Thù ngươi / Thân với ngươi / Bình thườn |
| j65.js:8 | comment: not shown | bel> · n" line -> chip "Thù ngươi / Thân với ngươi / Bình thường" dropped |
| j65.js:17 | comment: not shown | te shown once per run of same-date entries; "Ngươi tố giác X …: thành." dropped  |
| j65.js:33 | comment: not shown | rt card: relation chip repeats the "Nàng với ngươi" line ---- */ |
| j65.js:34 | on screen → ta | h.replace(/<span class="chip (hot¦ok¦)">(Thù ngươi¦Thân với ngươi¦Bình thường)<\ |
| j65.js:34 | on screen → ta | n class="chip (hot¦ok¦)">(Thù ngươi¦Thân với ngươi¦Bình thường)<\/span>/,"")}}ca |
| j65.js:86 | regex (code matches log text): unchanged | \d+ tuổi · con .+$/);if(m&&inKv(m[1])&&!/con ngươi$/.test(T(s.textContent)))s.te |
| j65.js:90 | on screen → Ta | >{if(T(r.querySelector("b")?.textContent)!=="Ngươi")return;const l=r.querySelect |
| j65.js:97 | regex (code matches log text): unchanged | /.test(T(b.textContent))&&/^(Ngài¦Người) với ngươi/.test(T(r.querySelector(".rl" |
| j65.js:103 | regex (code matches log text): unchanged | .forEach(r=>{const m=T(r.textContent).match(/Ngươi tố giác (.+?) trước .*: thành |
| j65.js:214 | regex (code matches log text): unchanged | t FACT=h=>String(h).replace(/nàng có thể hại ngươi \(/g,"nàng muốn hại ngươi (") |
| j65.js:214 | on screen → ta | e(/nàng có thể hại ngươi \(/g,"nàng muốn hại ngươi (").replace(/Có thể hại ngươi |
| j65.js:214 | regex (code matches log text): unchanged | "nàng muốn hại ngươi (").replace(/Có thể hại ngươi:/g,"Muốn hại ngươi:"); |
| j65.js:214 | on screen → ta | i (").replace(/Có thể hại ngươi:/g,"Muốn hại ngươi:"); |
| j65.js:218 | regex (code matches log text): unchanged | · ").filter(x=>!/báo: nàng (có thể¦muốn) hại ngươi/.test(x));h=it.length?m[1]+it |
| j82.js:77 | on screen → Ta | urn kitName(p,{cap:true});if(p===S)return"<b>Ngươi</b>";if(p&&p.name)return `<b> |
| j82.js:367 | on screen → ta | ro";box.innerHTML=`<h4 class="kpst">Phần của ngươi</h4>`+kg82Rows([["Màn thi",`t |
| j82.js:388 | on screen → ta | nst html=(kitRes¦¦`<h4 class="kpst">Phần của ngươi</h4>${kg82Rows(sRows)}<h4 cla |
| j91.js:391 | on screen → ta | ẫu");smoke(W*.73,H*.12,R,mc.join(","),"Hương ngươi pha"); |
| j90.js:32 | on screen → Ta | ==S¦¦x.mine?`<span class="kpod-you">${p===S?"Ngươi":"Con ngươi"}</span>`:""}</di |
| j90.js:32 | on screen → ta | `<span class="kpod-you">${p===S?"Ngươi":"Con ngươi"}</span>`:""}</div>`+ |
| j90.js:37 | on screen → Ta | v class="kpod-mine">${kitFaceH(S,"xs")}<span>Ngươi đứng thứ ${me.place} trong ${ |
| j90.js:105 | regex (code matches log text): unchanged | st.push({who:k,place:list.length+1,mine:/con ngươi/.test(txt),sub:sw.replace(/^Đ |
| j93.js:60 | on screen → ta | >${kmFace(p,"big")}<div><b>${me?"Thẻ bài của ngươi được lật":"Tối nay: "+kmEsc(n |
| j93.js:60 | on screen → ta | ối nay: "+kmEsc(nm)}</b><small>${me?"Tối nay ngươi hầu giá.":`${kmEsc(rk)} được  |
| j93.js:188 | on screen → ta | om({title:"Có tin vui",sub:"Thái y bắt mạch: ngươi đã mang long thai."}); |
| jk2b.js:154 | on screen → ta | mall>Tâm trạng</small>${v(r.mood)}<small>Với ngươi</small>${v(r.att)}</span></bu |
| jk2b.js:356 | comment: not shown | l, name, rank, the relation/stat BARS (Ghen, Ngươi với nàng · thiện cảm, Oán, |
| jk2b.js:357 | comment: not shown |  Nàng với ngươi, Sủng). Right column: the oth |
| jk2b.js:620 | on screen → Ta |  x.label?`Ngươi đã biết: ${x.label}.`:"Đúng p |
| jk2b.js:632 | on screen → ta | Odds())} · tốn: 0 khắc · thành: thay ngay bộ ngươi cho là hợp phẩm · kèm: có thể |
| jk2b.js:722 | comment: not shown | sticky block on top = the info lines (Ghen · Ngươi với nàng + bar · Oán + bar ·  |
| jk2b.js:723 | comment: not shown |  ngươi · Sủng) + the note + the act- |
| jk2b.js:872 | comment: not shown |  Nàng với ngươi · Ghen) · stats (Sủng · Danh  |
| jk2b.js:872 | comment: not shown | ơ) · small facts (Tuổi · Tính nết · Muốn hại ngươi · status chips). |
| jk2b.js:886 | comment: not shown |  05:25Z: subject + verb + object — "Nàng quý ngươi: Bình thường · -5", "Nàng oán |
| jk2b.js:886 | comment: not shown | Nàng quý ngươi: Bình thường · -5", "Nàng oán ngươi: 0", "Ngươi quý nàng …", "Ngư |
| jk2b.js:886 | comment: not shown | ơi: Bình thường · -5", "Nàng oán ngươi: 0", "Ngươi quý nàng …", "Ngươi oán nàng  |
| jk2b.js:886 | comment: not shown | ", "Nàng oán ngươi: 0", "Ngươi quý nàng …", "Ngươi oán nàng …" */ |
| jk2b.js:888 | on screen → Ta |  rowA.push(chip(RG("Quý","Ngươi quý "+OB),nums.length?QV(nums |
| jk2b.js:888 | on screen → Ta | Ngươi quý "+OB),nums.length?QV(nums[0]):"?","Ngươi quý "+OB+": "+(nums.length?QV |
| jk2b.js:889 | on screen → Ta |  rowA.push(chip(RG("Oán","Ngươi oán "+OB),nums.length>1?Strin |
| jk2b.js:889 | on screen → Ta | oán "+OB),nums.length>1?String(nums[1]):"?","Ngươi oán "+OB+": "+(nums.length>1? |
| jk2b.js:890 | regex (code matches log text): unchanged |  if(/^Nàng với ngươi/.test(t)){const fb=[...r.quer |
| jk2b.js:891 | on screen → ta |  rowA.push(chip(RG("Quý",SJ+" quý ngươi"),nums.length?QV(nums[0]):"?" |
| jk2b.js:891 | on screen → ta | ngươi"),nums.length?QV(nums[0]):"?",SJ+" quý ngươi: "+(nums.length?QV(nums[0]):" |
| jk2b.js:892 | on screen → ta |  rowA.push(chip(RG("Oán",SJ+" oán ngươi"),nums.length>1?String(nums[1 |
| jk2b.js:892 | on screen → ta | ),nums.length>1?String(nums[1]):"?",SJ+" oán ngươi: "+(nums.length>1?nums[1]:"ch |
| jk2b.js:903 | on screen → ta |  [[SJ+" quý ngươi","Quý"],[SJ+" oán ngươi","Oán |
| jk2b.js:903 | on screen → ta |  [[SJ+" quý ngươi","Quý"],[SJ+" oán ngươi","Oán"],["Ngươi quý "+OB,"Quý |
| jk2b.js:903 | on screen → Ta |  quý ngươi","Quý"],[SJ+" oán ngươi","Oán"],["Ngươi quý "+OB,"Quý"],["Ngươi oán " |
| jk2b.js:903 | on screen → Ta |  oán ngươi","Oán"],["Ngươi quý "+OB,"Quý"],["Ngươi oán "+OB,"Oán"],["Ghen","Ghen |
| jk2b.js:904 | on screen → ta |  const ORD=[SJ+" quý ngươi",SJ+" oán ngươi","Ngươi quý " |
| jk2b.js:904 | on screen → ta |  const ORD=[SJ+" quý ngươi",SJ+" oán ngươi","Ngươi quý "+OB,"Ngươi oán " |
| jk2b.js:904 | on screen → Ta |  const ORD=[SJ+" quý ngươi",SJ+" oán ngươi","Ngươi quý "+OB,"Ngươi oán "+OB,"Ghe |
| jk2b.js:904 | on screen → Ta |  quý ngươi",SJ+" oán ngươi","Ngươi quý "+OB,"Ngươi oán "+OB,"Ghen"],oi=c=>{const |
| jk3.js:48 | on screen → ta |  if(known)att=`<span class="k3v"><small>với ngươi</small> <span class="ef ${n>0 |
| jinv.js:109 | on screen → Ta | ng rương: ${g.n} món.`);if(g.w)F.push(it.sl?"Ngươi đang đeo.":"Ngươi đang dùng." |
| jinv.js:109 | on screen → Ta | ón.`);if(g.w)F.push(it.sl?"Ngươi đang đeo.":"Ngươi đang dùng."); |
| jinv.js:181 | on screen → ta |  if(me&&x.lv===3)r+="Hậu cung xì xào ngươi ăn mặc quá xa xỉ, nhiều người |
| jinv.js:182 | on screen → ta | 50))){if(me){apply({th:-3});r+="Thái hậu chê ngươi phô trương. Thái hậu -3. "}el |
| jinv.js:183 | on screen → ta | oll(25)){if(me){apply({danh:-1});r+="Lời đồn ngươi phung phí lan khắp cung. Danh |
| jinv.js:184 | on screen → Ta | f(p)>=3&&roll(25)){if(me){apply({duc:1});r+="Ngươi ăn mặc giản dị, được khen có  |
| jinv.js:205 | on screen → ta | {if(p===S){apply({danh:-1});r+="Có kẻ xì xào ngươi che mặt để giấu điều gì. Danh |
| jk4.js:166 | on screen → ta | >${R.mood[0]}</b>`:"",known?`Thái hậu thương ngươi <b>${S.th¦0}</b>`:"Thái hậu t |
| jk4.js:166 | on screen → ta | ơng ngươi <b>${S.th¦0}</b>`:"Thái hậu thương ngươi: <b>chưa rõ</b>"].filter(Bool |
| jmen.js:21 | on screen → ta | tion menVT(v){if(!v)return"";if(v===S)return"ngươi";try{return k61Named(v)?`${rk |
| jmen.js:133 | on screen → ta | &y.r==="tryst")return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đứng  |
| jmen.js:134 | on screen → ta |  if(v)return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đứng  |
| jmen.js:135 | on screen → ta |  if(y.hv!=null)return `${menCap(t)} ở ${at}, ngươi thoáng thấy ${menNmFull(m)} đ |
| jmen.js:135 | on screen → ta | ơn; hình như có bóng áo phi tần vừa lánh đi, ngươi không nhìn rõ là ai.`; |
| jmen.js:136 | on screen → ta |  return `${menCap(t)} ở ${at}, ngươi bắt gặp ${menNmFull(m)} đi lạ |
| jmen.js:156 | on screen → ta | ỏng: nàng chối được, Danh -2 · kèm: nàng oán ngươi +30 · phe nàng tìm cách trả t |
| jmen.js:157 | on screen → ta |  nên nàng chối được, Danh -2 · kèm: nàng oán ngươi +30 · phe nàng tìm cách trả t |
| jmen.js:159 | on screen → ta |  tốn: 1 khắc · thành: Danh +3 · Thái hậu với ngươi +2 · nàng mất tự do, cấm túc  |
| jmen.js:159 | on screen → ta | trượng, đuổi ra ngoại triều) · kèm: nàng oán ngươi +22${sg}`}); |
| jmen.js:160 | on screen → ta |  tốn: 2 khắc · thành: Danh +3 · Thái hậu với ngươi +2 · nàng sa sút, có khi gián |
| jmen.js:160 | on screen → ta | mang tiếng vu khống, Danh -5 · kèm: nàng oán ngươi +22${sg}`})} |
| jmen.js:161 | on screen → ta |  tốn: 1 khắc · thành: Danh +2 · Thái hậu với ngươi +1 · (hắn bị đánh trượng, đuổ |
| jmen.js:162 | on screen → ta |  tốn: 2 khắc · thành: Danh +3 · Thái hậu với ngươi +1 · (hắn bị cấm vào cung một |
| jmen.js:165 | on screen → ta | ản đi, hắn thiện cảm -5${v?" · kèm: nàng oán ngươi +15":""}`})} |
| jmen.js:166 | on screen → ta | hông dính vào chuyện · kèm: nếu về sau lộ ra ngươi thấy mà không báo, dễ bị liên |
| jmen.js:176 | on screen → ta | eName(y.k);const nm=m.name;const byT=by===S?"ngươi":`${rkName(by)} ${by.name}`;m |
| jmen.js:180 | on screen → ta |  ti":"thị vệ"}: bắt được ${nm} cùng ${c===S?"ngươi":`${rkName(c)} ${c.name}`} ở  |
| jmen.js:182 | on screen → ta | Chính ti":"thị vệ"} chuyện ở ${at}; ${c===S?"ngươi":`${rkName(c)} ${c.name}`} ch |
| jmen.js:184 | on screen → ta | "Cung Chính ti":"thị vệ"}: ${nm} và ${c===S?"ngươi":`${rkName(c)} ${c.name}`} gặ |
| jmen.js:187 | on screen → ta | uyện ở ${at}, nhưng không đủ chứng: ${c===S?"ngươi":`${rkName(c)} ${c.name}`} vô |
| jmen.js:193 | on screen → Ta | ){const prev=J78.ctx;if(by===S)J78.ctx={how:"Ngươi giấu giúp, nên biết rõ chuyện |
| jmen.js:202 | on screen → Ta | ¦m.trait==="cẩn trọng")m.af=(m.af¦¦0)+3;log(`Ngươi làm như không thấy ${menNmFul |
| jmen.js:204 | on screen → Ta |  if(ok)log(`<span class="g">Ngươi sai người dẫn ${m.name} ra cử |
| jmen.js:204 | on screen → ta | cho ${rkName(v)} ${v.name}`:""}. Hắn mang ơn ngươi; chuyện này thành bí mật tron |
| jmen.js:204 | on screen → ta |  ơn ngươi; chuyện này thành bí mật trong tay ngươi.</span>`); |
| jmen.js:205 | on screen → Ta |  else log(`<span class="r">Ngươi giấu ${m.name}, nhưng bị ngườ |
| jmen.js:207 | on screen → Ta | if(roll(o)){menStat("hearOk");try{k61Know(m,"Ngươi nghe được tên hắn.",true,2);i |
| jmen.js:208 | on screen → ta |  log(`Núp sau hòn giả sơn, ngươi nghe rõ: ${menTrue(m,v,y)}`); |
| jmen.js:210 | on screen → Ta |  if(v){const prev=J78.ctx;J78.ctx={how:"Ngươi núp nghe lén",proves:menTrue( |
| jmen.js:214 | on screen → Ta | (v,S,15);affAdd(v,S,-8)}log(`<span class="r">Ngươi giẫm phải cành khô; ${menNmFu |
| jmen.js:214 | on screen → ta | T(v):""} giật mình tản đi. ${v?"Nàng đã thấy ngươi nghe lén.":"Hắn đã thấy mặt n |
| jmen.js:214 | on screen → ta | ng đã thấy ngươi nghe lén.":"Hắn đã thấy mặt ngươi."}</span>`);delete (S.menWhy¦ |
| jmen.js:232 | on screen → ta | `<span class="r">${rkName(w)} ${w.name} thấy ngươi nói chuyện riêng với ${m.name |
| jmen.js:241 | on screen → ta | )-10;return "Hắn run sợ, nộp 40 lạng bạc xin ngươi giữ kín. Bạc +40."} |
| jmen.js:242 | on screen → ta | eturn "Hắn cứng cổ không chịu, từ nay ôm hận ngươi."}})}}}catch(e){console.error |
| jmen.js:244 | on screen → ta | span class="r">Trong cung rộ lời đồn ác ý về ngươi; nghe nói phát ra từ đám ${m. |
| jmen.js:244 | on screen → ta | thị vệ"?"thị vệ":"người ngoài cung"} từng bị ngươi làm khó. Danh -3.</span> `}}} |
| jcooplobby.js:47 | on screen → Ta | "t"],["Hảo hữu","đang chọn thân phận","n"],["Ngươi","đã vào phòng","g"]])}</div> |
| jcooplobby.js:48 | on screen → ta | u. Hảo hữu chọn xong, màn chọn thân phận của ngươi tự hiện ra. Không cần bấm gì. |
| jcooplobby.js:99 | on screen → ta | T={me:["Đợi hảo hữu trở lại","Đường mạng của ngươi vừa đứt. Đang nối lại."],peer |
| jcooplobby.js:100 | on screen → Ta |  week:["Đợi hảo hữu xong tuần","Ngươi đã qua đêm. Khi hảo hữu cũng  |
| jcooplobby.js:104 | on screen → Ta | a xong tuần":pw[0],why==="week"?"n":pw[1]],["Ngươi",COOP.state.status==="open"?" |
| jcoopworld.js:224 | on screen → Ta | .inv[extra]?iname(S.inv[extra]):""});return `Ngươi ngỏ ý ${((ACT[k]¦¦{}).n¦¦k).t |
| jcoopworld.js:228 | on screen → ta |  const what=m.k==="gift"?`muốn tặng ngươi ${esc(m.item¦¦"một món quà")} |
| jcoopworld.js:228 | on screen → ta | (m.item¦¦"một món quà")}`:`muốn kết giao với ngươi`; |
| jcoopworld.js:238 | on screen → ta | >: ${esc(m.n)}.`:"Có kẻ ngấm ngầm ra tay với ngươi."; |
| jcoopworld.js:255 | on screen → ta | bên ${esc(friendName())} và trong cung khiến ngươi: <b>${L.join(", ")}</b>.</p>` |
| jcoopworld.js:275 | on screen → ta | ushModal({t:"Hảo hữu vào cung",h:`<p>Hảo hữu ngươi ${old?"đã đầu thai, ":"đã chọ |
| jhc.js:7 | comment: not shown |  3. Relation words (owner 05:25Z): "Nàng quý ngươi: <mức> · n", "Nàng oán ngươi: |
| jhc.js:7 | comment: not shown | 25Z): "Nàng quý ngươi: <mức> · n", "Nàng oán ngươi: n", "Ngươi quý nàng …", "Ngư |
| jhc.js:7 | comment: not shown | quý ngươi: <mức> · n", "Nàng oán ngươi: n", "Ngươi quý nàng …", "Ngươi oán nàng  |
| jhc.js:7 | comment: not shown | ", "Nàng oán ngươi: n", "Ngươi quý nàng …", "Ngươi oán nàng …" (role names where |
| jhc.js:18 | on screen → Ta |  "Quen biết":"Ngươi biết người này đến đâu: Người |
| jhc.js:19 | on screen → ta |  "Người chạy việc":"Khi ngươi sai người dò la, đưa thư, mua |
| jhc.js:19 | on screen → ta | i. Game chọn kẻ hầu có Lòng và tài cao nhất; ngươi có thể đổi người."})}catch(e) |
| jhc.js:55 | on screen → Ta |  const chips=[["me","Ngươi",pMe()]].concat(liveRivals(tr |
| jhc.js:57 | on screen → ta | b"><span class="kr3k">${gl("Sủng","Ngài sủng ngươi")}</span><span class="kr3v">< |
| jhc.js:59 | on screen → ta | ss="kr3b"><span class="kr3k">Thái hậu thương ngươi</span><span class="kr3v"><spa |
| jhc.js:62 | on screen → ta |  const mid=relBar("quý",sj,"ngươi",k?aff(v,S):null)+relBar("oán |
| jhc.js:62 | on screen → ta | sj,"ngươi",k?aff(v,S):null)+relBar("oán",sj,"ngươi",k?oan(v,S):null)+relBar("quý |
| jhc.js:62 | on screen → Ta | n",sj,"ngươi",k?oan(v,S):null)+relBar("quý","Ngươi",ob,aff(S,v))+relBar("oán","N |
| jhc.js:62 | on screen → Ta | Bar("quý","Ngươi",ob,aff(S,v))+relBar("oán","Ngươi",ob,oan(S,v))+ |
| jhc.js:63 | on screen → ta | `<p class="kr3note">Cùng ${houseName(v)} với ngươi.</p>`:""); |
| jhc.js:65 | on screen → Ta |  if(!knows(sel))return h+`<p class="past">Ngươi chưa gặp ${sel.name}, chưa rõ |
| jhc.js:67 | on screen → ta | me=p===S;const f=me?pMe():pv(p);const ob=me?"ngươi":objOf(p);const kp=me¦¦knows( |
| jhc.js:68 | on screen → Ta | Bar("oán",sn,ob,oan(sel,p))+relBar("quý",me?"Ngươi":subjOf(p),sn,kp?aff(p,sel):n |
| jhc.js:68 | on screen → Ta | f(p),sn,kp?aff(p,sel):null)+relBar("oán",me?"Ngươi":subjOf(p),sn,kp?oan(p,sel):n |
| jhc.js:69 | on screen → Ta | out?"Phế phi":RANKS[S.rank].n):rkName(p),me?"Ngươi":p.name,fcol(f),mid,me?`<div  |
| jhc.js:72 | on screen → ta | eturn h+(n?`<p class="past">Còn ${n} phi tần ngươi chưa quen biết: chưa xem được |
| jhc.js:95 | on screen → ta | hAge?tuoi(S.thAge):"",known?`Thái hậu thương ngươi: <b>${S.th¦0}</b>`:"Thái hậu  |
| jhc.js:95 | on screen → ta | ng ngươi: <b>${S.th¦0}</b>`:"Thái hậu thương ngươi: <b>chưa rõ</b>"].filter(Bool |
| jhc.js:100 | on screen → ta | rạng: <b>${MOODS[E.mood][0]}</b>`,`Ngài sủng ngươi <b>${S.sung}</b> · Ân tình <b |
| jhc.js:118 | on screen → Ta | <div class="pgwrap"><p class="past kr3empty">Ngươi chưa gặp nam nhân nào ngoài H |
| jhc.js:118 | on screen → ta |  vương gia, nhạc sư…) chỉ hiện ở đây sau khi ngươi gặp mặt họ ở nơi họ hay lui t |
| jhc.js:132 | on screen → ta | nner=()=>({t:"<p>Ai làm người chạy việc? Khi ngươi sai người dò la, đưa thư, mua |
| jhc.js:132 | on screen → ta | …, người này đi. Lòng cao thì ít khi khai ra ngươi.</p>", |
| jhc.js:133 | on screen → ta | s.sid;log(`Từ nay ${s.name} lo chạy việc cho ngươi.`)}})).concat(S.runner!=null? |
| jload.js:67 | on screen → ta | total-KLOAD.fig.have)} MB) thỉnh dần sau khi ngươi đã vào cung.</div>`:"")+ |
| j84.js:20 | on screen → ta | ;const x=p[0],y=p[1];return `«${x}» nhắm vào ngươi${y?` (việc ${y.toLowerCase()} |
| j84.js:48 | on screen → ta |  ["Đến lượt ngươi","Tới phiên ngươi"],["Lật hai |
| j84.js:48 | on screen → ta |  ["Đến lượt ngươi","Tới phiên ngươi"],["Lật hai ô một lượt, tìm đ |
| j84.js:52 | comment: not shown |  the player's own acts: narration calls her "ngươi" */ |
| j84.js:54 | comment: not shown | text names the player in the FIRST person — "ngươi" → "ta" ("Con của ta", "Hoàng |
| j84.js:55 | comment: not shown | ới ta", "Ta với Quý phi"). NPC speech keeps "ngươi": anything inside “…” (also a |
| j84.js:56 | comment: not shown | pplied on screen only, so code that matches "ngươi" in logs (and old saves) is u |
| j84.js:89 | on screen → ta | HX==="object"){HX.hh="Lòng Hoàng hậu đối với ngươi. Càng cao càng được che chở;  |
