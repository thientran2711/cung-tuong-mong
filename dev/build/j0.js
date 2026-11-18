/* ===================== ONE UI KIT (every screen builds from these pieces only) =====================
   portrait frame ...... pcPort(f,col,status) / pframe(f) / pframeArt(src)   rank ground by f.rk (rk-c0..c7, th, emp, sv0-4, eu0-3, off, kid, cold)
   face + name chip .... mdH(face,"xs|sm|big")  (small round avatar, also rank ground)
   person card ......... pcard({f,name,rank,lines,chips,note,groups})  + pager(key,items,mk) face strip
   labelled bar ........ ghenBar(n) / fbar(v,lo,hi,good)  (always beside label + number)
   odds chip ........... oddsChip(word)  ladder word or 'Chắc chắn'
   effect line ......... eff(token) / effList(tokens,default) / kitParse('word · tốn: … · thành: … · hỏng: …')
   act card ............ cardH(a,i)  title, khắc, text, odds chip, Tốn / Thành / Hỏng rows, disabled reason
   button .............. pbtn(attrs,name,line,whyDisabled)  name + price + gain/loss, reason when disabled
   result card ......... resultShow(title,before,ok)  THÀNH / HỎNG seal + coloured deltas + why
   dialog .............. showModal()  speaker portrait frame or place art, options through dilLine()
   Defined in j15 (cards, pager, bars), j17 (lines), j19 (kit core), j21 (relations). */
