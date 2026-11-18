/* balance-2 (D8): event-choice player for the inpage6 sens bot (INP2=...,inevpick.js; window.__evmode = hint | rand | same).
   The PICK block below is generated from dev/measure/evbot.js (same hint reader: Gợi ý line + risk tag + Tốn row, never hidden numbers);
   the wrapper at the end routes the sens bot's event picks (chooseM on pid/pp/kit choice dialogs) through window.__evpick. */
(function(){
const W=[[/được lòng bề trên/i,1.1],[/hạ được đối thủ|thất sủng/i,.8],[/có phúc con cái|giữ được long thai/i,1.4],[/có lợi cho con/i,1],[/được lòng kẻ hầu|một lòng theo ta/i,.5],[/thêm tình ý|thêm tình riêng/i,.2],[/có thiện cảm/i,.7],[/ân sủng|để mắt|thị tẩm/i,1.6],[/thể diện/i,1.2],[/tiếng hiền|hiền đức/i,1.3],[/người trên hài lòng|Thái hậu hài lòng|Hoàng hậu hài lòng/i,1.1],
 [/tình nghĩa/i,1],[/thất thế/i,.8],[/nắm thêm thóp/i,1],[/được lòng|ưa ngươi hơn|nguôi giận/i,.7],[/con được thương|thương con/i,1],[/được tin|thêm tin/i,1],
 [/bản thân khá lên/i,.6],[/thân thể được giữ/i,1],[/có thêm bạc/i,.4],[/dưỡng sức/i,.3]];
const L=[[/mất mạng/i,9],[/mất lòng bề trên/i,1.1],[/lỡ phúc con cái|không thể có thai/i,1.2],[/mất thiện cảm/i,.6],[/mất lòng kẻ hầu|kẻ hầu sinh oán/i,.5],[/ghen ghét|sinh oán|kết thêm oán/i,.9],[/thất đức|mang tiếng ác/i,2.2],[/sinh nghi|trách phạt|bị nghi|bị phạt/i,2.2],[/lạt lẽo/i,1.6],[/mất thể diện/i,1.2],[/thân thể bị hại/i,2.4],[/con thiệt|con bị lạnh nhạt/i,1.2],
 [/kết oán|sẽ thù/i,.9],[/phật ý|để bụng/i,1],[/mất lòng|không ưa/i,.6],[/lộ sơ hở/i,1],[/sứt mẻ/i,1],[/được lợi/i,.6],[/bản thân sút/i,.6],[/hao bạc/i,.3],[/hao sức/i,.3],[/có cái giá/i,.8],[/có hại/i,.8]];
function sc(txt,T){let s=0;for(const part of String(txt).split(/[,;]/)){for(const [re,w] of T)if(re.test(part)){s+=w*(/nhiều/.test(part)?1.6:/chút ít/.test(part)?.4:1);break}}return s}
window.__hintScore=function(h,risk,ton){h=String(h||"");const i=h.search(/;\s*nhưng|,\s*nhưng/);const g=i<0?h:h.slice(0,i),l=i<0?"":h.slice(i);
 let s=sc(g,W)-sc(l,L);if(/có lợi về/.test(g)&&!sc(g,W))s+=.5*(g.split(",").length);if(/chẳng được gì|không được gì/.test(g))s-=.2;
 s+=risk==="liều"?-1.6:risk==="có rủi ro"?-.5:0;const b=+(String(ton||"").match(/Bạc\s*[−-]\s*(\d+)/)||[])[1]||0,su=+(String(ton||"").match(/Sức\s*[−-]\s*(\d+)/)||[])[1]||0;
 s-=b*(S.bac<60?.02:.008)+su*(S.suc<45?.06:.02);return s};
window.__evpick=function(m,okIdx){const mode=window.__evmode;if(!mode||!m||!(m.pid||m.pp||(m.kit&&m.kit.kind==="choice")))return null;
 const ok=okIdx.filter(([o])=>!(typeof o.lk==="function"&&o.lk()));if(!ok.length)return null;
 if(mode==="same"){window.__evLast(m,ok[0][1]);return ok[0][1]}if(mode==="rand"){const r=ok[Math.floor(Math.random()*ok.length)][1];window.__evLast(m,r);return r}
 let best=-1e9,bi=ok[0][1];
 /* review/opt-render 54f3814: kitHint(o,m,lv) is a pure function of the option data at her current clarity level = exactly what the player reads */
 try{if(typeof evbDedup==='function')evbDedup(m)}catch(e){}
 for(const [o,i] of ok){let H={hint:'',risk:''};try{H=kitHint(o,m)}catch(e){}const h=H.hint,r=H.risk;const f=o.fx||{};const t=(f.bac<0?'Bạc '+f.bac+' ':'')+(f.suc<0?'Sức '+f.suc:'');const v=window.__hintScore(h,r,t)+Math.random()*.01;if(v>best){best=v;bi=i}}
 window.__hintSeen=(window.__hintSeen||0)+1;window.__evLast(m,bi);return bi};
/* the last event picks of this life (balance-pass: what she chose, and what the hint said, before a death) */
window.__evTrail=[];window.__evLast=function(m,i){try{const o=m.opts[i];let H={hint:'',risk:''};try{H=kitHint(o,m)}catch(e){}window.__evTrail.push([String(m.t||m.pid||'').replace(/<[^>]+>/g,'').slice(0,40),String(o.n||'').slice(0,40),H.hint.slice(0,80),H.risk,(S.turn*3+S.tuan)]);if(window.__evTrail.length>5)window.__evTrail.shift()}catch(e){}};
/* outcome counters for this life (reset by over) */
window.__pun=0;window.__dem=0;window.__deathWhy="";
{const p0=punish;punish=function(p,why,sev){if(p===S||p==="me")window.__pun++;return p0.apply(this,arguments)}}
{const o0=over;over=function(h,t,fate){try{const r=window.__res;setTimeout(()=>{},0)}catch(e){}window.__lastEnd={pun:window.__pun,dem:window.__dem};window.__pun=0;window.__dem=0;return o0.apply(this,arguments)}}
})();
(function(){const c0=window.chooseM;window.chooseM=function(i){try{const m=Q[0];if(window.__evmode&&m&&m.opts){const ok=m.opts.map((c,j)=>[c,j]).filter(([c])=>c&&!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));const ep=window.__evpick(m,ok);if(ep!=null){i=ep;(window.__acts=window.__acts||{})["ev_"+window.__evmode]=((window.__acts||{})["ev_"+window.__evmode]||0)+1}}}catch(e){}return c0.call(this,i)}})();
