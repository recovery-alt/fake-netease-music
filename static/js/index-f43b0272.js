import{r,u as l,R as t}from"./react-69194784.js";import{D as _,b as n,c as p,aB as d}from"./index-a8385452.js";import"./vendor-441fcb21.js";import"./lodash-16b1923a.js";import"./react-router-dom-fbac4128.js";import"./react-redux-9f5c3214.js";const j="_similar_i8ijj_1",u="_similar__item_i8ijj_6",f="_similar__img_i8ijj_9",g="_similar__description_i8ijj_14";var v={similar:j,similar__item:u,similar__img:f,similar__description:g};const N=({id:a})=>{const s=p("similar",v),[e,m]=r.exports.useState([]),{push:c}=l();async function o(){const i=await d(a);m(i.artists)}return r.exports.useEffect(()=>{o()},[a]),t.createElement("div",{className:s()},e.map(i=>t.createElement("div",{key:i.id,className:s("item"),onClick:()=>c(_.singer(i.id))},t.createElement(n,{src:i.picUrl,className:s("img")}),t.createElement("div",{className:s("description")},i.name))))};export{N as default};