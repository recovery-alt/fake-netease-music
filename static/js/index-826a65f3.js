var I=Object.defineProperty;var c=Object.getOwnPropertySymbols;var l=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var p=(e,t,r)=>t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,x=(e,t)=>{for(var r in t||(t={}))l.call(t,r)&&p(e,r,t[r]);if(c)for(var r of c(t))m.call(t,r)&&p(e,r,t[r]);return e};var v=(e,t)=>{var r={};for(var s in e)l.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(e!=null&&c)for(var s of c(e))t.indexOf(s)<0&&m.call(e,s)&&(r[s]=e[s]);return r};import{c as j}from"./index-a8385452.js";import{k as w}from"./vendor-441fcb21.js";import{r as o,R as A}from"./react-69194784.js";var _={"infinity-scroll":"_infinity-scroll_7g1w6_1"};const N=o.exports.forwardRef((g,s)=>{var u=g,{cb:e,className:t}=u,r=v(u,["cb","className"]);const R=j("infinity-scroll",_),n=o.exports.useRef(null),[d,a]=o.exports.useState(""),f=o.exports.useRef(!0);function y(i){f.current=i}return o.exports.useImperativeHandle(s,()=>y,[]),o.exports.useEffect(()=>{if(!n.current)return;const i=new IntersectionObserver(E=>{E[0].intersectionRatio<=0||(f?(a("\u52A0\u8F7D\u4E2D..."),e==null||e()):a("\u6CA1\u6709\u66F4\u591A\u4E86~"))});return i.observe(n.current),()=>{n.current&&i.unobserve(n.current),i.disconnect()}},[]),A.createElement("footer",x({ref:n,className:w(R(),t)},r),d)});export{N as I};