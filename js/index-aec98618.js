import{r as t,h as C,F as R,j as s,u as b}from"./react-d9689425.js";import{b as G,am as A,an as D,ao as P,c as T,D as w,ap as F}from"./index-c34386fa.js";import{N as M}from"./index-32624bd0.js";import{L as S}from"./index-e699ccf4.js";import{P as j}from"./index-51519b48.js";import{ad as I,k as y}from"./vendor-448858a9.js";import"./lodash-87ac67d6.js";import"./react-router-dom-94468eab.js";import"./react-redux-ace978cf.js";function H(e){const[m,f]=t.exports.useState([]),r=t.exports.useMemo(()=>{const c=m.find(a=>a.id===e);return c?c.name:"\u5168\u90E8\u89C6\u9891"},[e]),i=C(R,{children:[r," ",s(I,{})]});async function v(){const c=await A();f(c.data)}return t.exports.useEffect(()=>{v()},[]),{videoGroupList:m,buttonContext:i}}function O(e){const[m,f]=t.exports.useReducer(L,[]),[r,i]=t.exports.useState(""),[v,c]=t.exports.useState(!0),a=t.exports.useRef(null);let h=0;const g=8;async function x(o=0){const u=e?await D(e,o):await P(o);c(u.hasmore);const p=u.datas.filter(d=>d.data.creator).map(d=>{const{vid:N,coverUrl:l,title:V,creator:k}=d.data,{nickname:E}=k;return{id:N,imgUrl:l,description:V,author:E}});f(o===0?{payload:p}:{type:"add",payload:p})}function L(o,{type:u="reset",payload:p}){return u==="add"?[...o,...p]:p}return t.exports.useEffect(()=>(x(),G),[e]),t.exports.useEffect(()=>{if(!a.current)return;const o=new IntersectionObserver(u=>{u[0].intersectionRatio<=0||(v?(i("\u52A0\u8F7D\u4E2D..."),h+=g,x(h)):i("\u6CA1\u6709\u66F4\u591A\u4E86~"))});return o.observe(a.current),()=>{a.current&&o.unobserve(a.current),o.disconnect()}},[]),{moreText:r,videoList:m,footerRef:a}}const Y=()=>{const e=T("video"),[m,f]=t.exports.useState([]),[r,i]=t.exports.useState(0),{push:v}=b(),{buttonContext:c,videoGroupList:a}=H(r),{moreText:h,videoList:g,footerRef:x}=O(r);function L(n){v(w.playVideo(n))}function o(n){i(n)}async function u(){const n=await F();f(n.data.map(d=>({name:d.name,id:d.id})))}function p(n){function d(l){i(l),n(!1)}function N(){i(0),n(!1)}return C("div",{className:e("popover"),children:[s("header",{className:e("popover-header"),children:s("button",{className:y({["--active"]:!r}),onClick:N,children:"\u5168\u90E8\u89C6\u9891"})}),s("div",{className:e("popover-main"),children:a.map(l=>s("div",{children:s("span",{className:y({"--active":l.id===r}),onClick:()=>d(l.id),children:l.name})},l.id))})]})}return t.exports.useEffect(()=>{u()},[]),C("div",{className:e(),children:[C("header",{className:e("header"),children:[s(j,{context:c,functionChildren:p}),s(M,{id:r,data:m,onNavClick:o})]}),s(S,{data:g,onItemClick:L}),s("footer",{ref:x,className:e("footer"),children:h})]})};export{Y as default};