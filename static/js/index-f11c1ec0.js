import{b as C,D,c as b,U as N,V as h}from"./index-a8385452.js";import{o as v,r as s,u as H,R as t}from"./react-69194784.js";import{I as J}from"./index-826a65f3.js";import"./react-router-dom-fbac4128.js";import"./vendor-441fcb21.js";import"./lodash-16b1923a.js";import"./react-redux-9f5c3214.js";const P=()=>{const a=b("zone"),i=v(),n=s.exports.useMemo(()=>Number(i.type),[i.type]),[u,f]=s.exports.useState([]),[y,E]=s.exports.useReducer(g,[]),R=s.exports.useMemo(()=>{var e;return(e=u.find(o=>o.id===n))==null?void 0:e.name},[u,n]),l=s.exports.useRef(0),r=s.exports.useRef(null),d=20,{push:j}=H();async function m(){var c;const e=await N(n,l.current,d),o=l.current===0?"reset":"add";E({type:o,payload:e.djRadios}),l.current+=d,(c=r.current)==null||c.call(r,e.hasMore)}async function x(){const e=await h();f(e.categories)}function g(e,o){const{type:c,payload:p}=o;return c==="reset"?p:[...e,...p]}return s.exports.useEffect(()=>{x(),m()},[]),t.createElement("div",{className:a()},t.createElement("h2",{className:a("title")},R),t.createElement("section",{className:a("cards")},y.map(e=>t.createElement("div",{key:e.id,className:a("card")},t.createElement(C,{className:a("img"),src:e.picUrl,onClick:()=>j(D.radioList(e.id))}),t.createElement("div",{className:a("right")},t.createElement("h3",null,e.name),t.createElement("div",null,e.desc),t.createElement("small",null,"\u8282\u76EE:",e.programCount,"\uFF0C\u8BA2\u9605:",e.subCount))))),t.createElement(J,{ref:r,cb:m}))};export{P as default};