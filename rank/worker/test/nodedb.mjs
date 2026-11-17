/* node:sqlite adapter with the same {all, run} shape as the Durable Object SQL wrapper (tests + local server only) */
import {DatabaseSync} from "node:sqlite";
export function nodeDb(file){const d=new DatabaseSync(file||":memory:");const st=new Map();
 const p=q=>{let s=st.get(q);if(!s){s=d.prepare(q);st.set(q,s)}return s};
 return{all:(q,...a)=>/^\s*(CREATE|DROP)/i.test(q)?(d.exec(q),[]):p(q).all(...a).map(r=>Object.assign({},r)),
  run:(q,...a)=>{if(/^\s*(CREATE|DROP)/i.test(q))d.exec(q);else p(q).run(...a)}}}
