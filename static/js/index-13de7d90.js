import{r as o,R as e}from"./react-69194784.js";import{i as m,T as i,c as d,F as A,j as E}from"./index-a8385452.js";import{C as p}from"./index-87c26849.js";import{a as b,u as f}from"./react-redux-9f5c3214.js";import{$ as U}from"./vendor-441fcb21.js";import"./lodash-16b1923a.js";import"./react-router-dom-fbac4128.js";var F="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAyVBMVEUAAADw0c7IVEjDRjrERzv46Ob46Ob46Ofw0c746Ofajob46ObXgXn45+bTdmzVfXTOZlzJWEzUeG/Wf3f46OXFSj7dlI3QbmTouLTVfnXSc2rqvbnTdm346ObTd27HUkbPbGLms63w0M7FSz/ESj7MZFrPbWPUenHTeXDUeG/36Obw0c7DRjrDRzrqvrrMYlfFTEDJWE3HUUbpu7bJWU3ESDzemZLvzcnWgHfVfnXLXVLsxMDoubTkrKbSc2ntyMTfmpTNZFripJ/OGaU+AAAAK3RSTlMAZjOZZjo3Nsw0KSFuFeng4ODaXD0z4N8f69aEUzsp/dvWzJmZhXBSKSkM2uFpygAAAl5JREFUWMPtmemO2jAUhWkhIezLsMzeffU5NGUI+zLT93+ouipWbA9BGuGossqHYri+yqcrY9/8SOHMS7hYtqsZqWp7eXGK+iNYykiViA+nqItAphoonqQ+VjVfoK717iphEMirV5bjd1V17U9cDsvloBeWg0BeNaVuVGRcCe6CMKyE5bB2UFtvjgkJoeirquUICQmCAIiiWpAStRtIjJt1W3//Nga4/0gI6uq/09wnoKmhQwBvhveG+WuHAMcm76KoCQ6i6Gpsc/U+GhDNKBpYiYRA55tmbrSBeL5ZPxjMhFgQUyFWDzYrIabAQoidOb/ezGOw3dBOBhH/kqZnLCDVh1DqZ8ym0q2dpS4xF4dY8IiaSm2650Q3VU+AtTjEHHzMUD8mGeWswUmqTsCZOMTmaTvKUI+2T5uDiRmYpGqQGYLVTmSxW2UkAOhqCFfYajA/NTxR08eqmd8OIejhgsComhi5w1b/VEzUMFHxxIxVoLDjifE3Ekeg9ZtZeaovQ038cAesHfLKHaChZsEdpHFkXKrtfu2yakON/KoGXKrzq9ru134sCPPcIcxLDbM9OVWbVXuiZo4LYqjpiZpgbkeGupqedD5a6v++8/lZNU21N/1aV5/7takmvHk26mpf9jUI7/s1z53PUzX973y+VE1dnRANZ+YGkKTRErhxpr4BlmnUArquzJddoJWGt2T8+dKN+VPM5FabGBLxdb3/+lT69esYGBrvyjqQJPGpJATRqRYM9xbpC5k9ZkyQAKhSVHkTJltpNqm3lom6CabEjglosboIIFm2vhTOnPnn/AapHpBa3timAAAAAABJRU5ErkJggg==";const G=()=>{const a=d("daily-recommend"),[s,n]=o.exports.useState([]),c=b(t=>!!t.user.cookie),u=f();async function l(){if(!c)return;const t=await A();n(t.data.dailySongs)}function r(t=0){u(E({tracks:s,current:t,fm:[]}))}return o.exports.useEffect(()=>{l()},[]),e.createElement("div",{className:a()},e.createElement("header",{className:a("header")},e.createElement("div",{className:a("top")},e.createElement("div",{className:a("calendar")},e.createElement("img",{src:F,alt:"\u65E5\u5386"}),e.createElement("strong",null,"17")),e.createElement("div",{className:a("title")},e.createElement("h2",null,"\u6BCF\u65E5\u6B4C\u66F2\u63A8\u8350"),e.createElement("div",null,"\u6839\u636E\u4F60\u7684\u97F3\u4E50\u53E3\u5473\u751F\u6210\uFF0C\u6BCF\u59296:00\u66F4\u65B0"))),e.createElement("div",{className:a("bottom")},e.createElement(m,{compose:!0,onClick:()=>r()}),e.createElement(m,{className:a("button")},e.createElement(U,null),"\u6536\u85CF\u5168\u90E8"))),e.createElement(i,{data:s,columns:p,onDoubleClick:r}))};export{G as default};