import{s as m}from"./index-a9f76cdf.js";import{d,r as p,K as h,c as f,D as c}from"./index-c34386fa.js";import{j as g,n as C}from"./vendor-448858a9.js";import{u as D,a as v}from"./react-redux-ace978cf.js";import{u as N,j as r,h as o}from"./react-d9689425.js";import"./react-router-dom-94468eab.js";import"./lodash-87ac67d6.js";const b=({data:t,isAlbum:e})=>{const a=f("card",m),l=D(),{push:i}=N(),u=v(s=>!!s.user.cookie);function n(s){!s||(e?i(c.list(s,"album")):u?i(c.list(s)):C.error("\u9700\u8981\u767B\u5F55\uFF0C\u624D\u80FD\u67E5\u770B\u4ED6\u4EBA\u6B4C\u5355\u4FE1\u606F>_<"))}return r("div",{className:a(),children:t.map(s=>o("div",{className:a("item"),children:[r("div",{className:a("img-wrapper"),children:r(d,{src:p(s.picUrl,150),className:a("img"),icon:{size:"big",hoverDisplay:!0},onClick:()=>n(s.id),onIconClick:()=>l(h({id:s.id,isAlbum:e}))})}),o("div",{className:a("description"),children:[r("div",{className:a("title"),children:s.name}),r("div",{className:a("subtitle"),children:g(s.publishTime).format("YYYY-MM-DD")})]})]},s.id))})};export{b as default};