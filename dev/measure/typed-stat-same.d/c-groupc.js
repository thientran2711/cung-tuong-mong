function gCx(R,T,J){
 /* GROUP C (jpet jpetcare jtsb jts jtabs jrcp jstip jtoil jecon jface jkc jlost jopic jtruth jkitpage): rule numbers read from the live tables / a stubbed call */
 const tr=(k,f)=>{try{T[k]=f()}catch(e){T[k]='ERR '+String(e).slice(0,60)}},rr=(k,f)=>{try{R[k]=J(f())}catch(e){R[k]='ERR '+String(e).slice(0,60)}};
 rr('C.FXF.penQuy',()=>FXF.penQuy);
 for(const k of ['meomuop','meo','linhmieu','cavang','sao','cachep','lyngu','cuuvi','thienma','phuong']){rr('C.PET.'+k,()=>({suc:PET[k].suc,omen:PET[k].omen,up:PET[k].up,sacX:PET[k].sacX,al:PET[k].al}));tr('C.PET.'+k,()=>[PET[k].use,PET[k].bad])}
 for(const k of ['ngocboikc','vongbackc','vaibong','aolong','thanbac','thanden']){rr('C.IT.'+k,()=>({w:IT[k].w,dr:IT[k].dr,heat:IT[k].heat}));tr('C.IT.'+k,()=>IT[k].d)}
 /* stubbed calls: what the rule hands to apply / ap */
 const cap=(fn)=>{const L=[],a0=window.apply,p0=window.ap;window.apply=o=>{L.push(J(o))};window.ap=(p,o)=>{L.push(J(o))};try{fn()}catch(e){L.push('ERR '+String(e).slice(0,40))}finally{window.apply=a0;window.ap=p0}return L};
 rr('C.toilBack',()=>[cap(()=>toilBack('emp',2,null)),cap(()=>toilBack('emp',-2,null)),cap(()=>toilBack('emp',2,{name:'x'})),cap(()=>toilBack('emp',-2,{name:'x'}))]);
 rr('C.petStealCost',()=>[BAL.pet.stealSuc,BAL.pet.stealCaughtDanh]);
 for(const k of ['phatquy','spyk','petsteal','batnat'])tr('C.AOUT.'+k,()=>AOUT[k]);
 for(const k of ['phatquy','spyk','petsteal'])tr('C.ACT.'+k,()=>ACT[k].x);
 tr('C.gloss.chuong',()=>KIT_GLOSS['Luật chương']);
 tr('C.kitPgEvOpts',()=>typeof kitPgEvOpts==='function'?kitPgEvOpts().replace(/<[^>]+>/g,' ').replace(/\s+/g,' '):null);
 tr('C.petStage0',()=>{const X=petcStageT(PET.cavang,0,'cavang');return [X.suc,X.use]});
 rr('C.petStage0',()=>[petcStageT(PET.cavang,0,'cavang').suc,petcStageT(PET.lyngu,0,'lyngu').suc]);
}
