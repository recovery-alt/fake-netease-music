import{r as a,j as e,g as n}from"./react-db2799b6.js";import{b as l,c as d,aC as p}from"./index-2448f94e.js";import"./lodash-536b9069.js";import"./vendor-da34c035.js";import"./react-redux-a59d985d.js";import"./react-router-dom-66f75ae1.js";const m="_detail_hzoqt_1",u={detail:m},D=({id:r})=>{const o=d("detail",u),[s,i]=a.exports.useState();async function c(){const t=await p(r);i(t)}return a.exports.useEffect(()=>(c(),l),[r]),e("div",{className:o(),children:s==null?void 0:s.introduction.map(t=>n("div",{children:[e("h2",{children:t.ti}),e("p",{children:t.txt})]},t.ti))})};export{D as default};