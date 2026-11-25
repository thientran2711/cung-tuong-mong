# NB-a (law 11): j70 «Ra tay ngay» = the act's own full line (same as the act card: thành / hỏng / bị phát giác / kèm); «Bày mưu» = the same act runs at the end (exec70 → runAct) → its thành / hỏng lines + what a discovery costs. Idempotent.
D='/home/user/wt/ng/dev/build/j70.js'
s=open(D).read()
o1='if(o0==null)now.x=`thành: ${G70(A.x||A.n)} · kèm: ${R70("dễ bị lộ")}${A.c&&Object.keys(A.c).length?", "+R70(fmt(A.c)):""}`;O.push(now);'
n1='if(o0==null)now.x=`thành: ${G70(A.x||A.n)} · kèm: ${R70("dễ bị lộ")}${A.c&&Object.keys(A.c).length?", "+R70(fmt(A.c)):""}`;/* NB-a: the act card\'s own line (jsgame sgLine → actLineRaw, target v): every thành / hỏng / bị phát giác number it applies */try{if(typeof sgLine==="function"&&o0!=null)now.x=sgLine(v,k,word(o0),fmt(A.c)||"không tốn bạc")}catch(e){}O.push(now);\n const AO=(()=>{const pv=J78.cardV;J78.cardV=v;try{const L=AOUT[k];return L?[L[0]||"",L[1]||""]:["",""]}catch(e){return["",""]}finally{J78.cardV=pv}})();'
if n1 not in s:
  assert s.count(o1)==1; s=s.replace(o1,n1)
o2='G70(o1!=null?`lúc ra tay: ${word(o1)}`:"dễ thành hơn")],k:[R70(`dấu vết: ${r.tl[0].replace(/nạn nhân/g,v.name)}`),R70(`${v.name} có thể phát hiện`)]'
n2='G70(o1!=null?`lúc ra tay: ${word(o1)}`:"dễ thành hơn")].concat(AO[0]?[G70(`thành: ${AO[0]}`)]:[]),k:(AO[1]?[R70(`ra tay mà hỏng: ${AO[1]}`)]:[]).concat([R70(`dấu vết: ${r.tl[0].replace(/nạn nhân/g,v.name)}`),R70(`${v.name} có thể phát hiện: mưu khó thành hơn, có khi nàng nắm ${balAb(BAL.eff.j70.evTop)} chứng cứ`)])'
if n2 not in s:
  assert s.count(o2)==1; s=s.replace(o2,n2)
open(D,'w').write(s);print('ok')
