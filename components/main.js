(()=>{"use strict";var e,t,r={582:function(e,t,r){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Value=t.Link=t.Button=void 0;var i=a(r(90)),u=r(755);t.Button=function(e){var t=o(e,[]);return i.default.createElement("button",n({},t))},t.Link=function(e){var t=o(e,[]);return i.default.createElement("a",n({},t))},t.Value=function(e){return o(e,[]),i.default.createElement("span",null,"[",u.NAME,"]")}}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={exports:{}};return r[e].call(a.exports,a,a.exports,o),a.exports}o.m=r,o.c=n,o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,r)=>(o.f[r](e,t),t)),[])),o.u=e=>e+".js",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="@mofed/components:",o.l=(r,n,a,i)=>{if(e[r])e[r].push(n);else{var u,l;if(void 0!==a)for(var f=document.getElementsByTagName("script"),c=0;c<f.length;c++){var s=f[c];if(s.getAttribute("src")==r||s.getAttribute("data-webpack")==t+a){u=s;break}}u||(l=!0,(u=document.createElement("script")).charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.setAttribute("data-webpack",t+a),u.src=r),e[r]=[n];var p=(t,n)=>{u.onerror=u.onload=null,clearTimeout(h);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((e=>e(n))),t)return t(n)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=p.bind(null,u.onerror),u.onload=p.bind(null,u.onload),l&&document.head.appendChild(u)}},(()=>{o.S={};var e={},t={};o.I=(r,n)=>{n||(n=[]);var a=t[r];if(a||(a=t[r]={}),!(n.indexOf(a)>=0)){if(n.push(a),e[r])return e[r];o.o(o.S,r)||(o.S[r]={});var i=o.S[r],u="@mofed/components",l=(e,t,r,n)=>{var o=i[e]=i[e]||{},a=o[t];(!a||!a.loaded&&(!n!=!a.eager?n:u>a.from))&&(o[t]={get:r,from:u,eager:!!n})},f=[];switch(r){case"default":l("@mofed/config","1.0.0",(()=>o.e(550).then((()=>()=>o(550))))),l("react","17.0.2",(()=>o.e(784).then((()=>()=>o(784)))))}return e[r]=f.length?Promise.all(f).then((()=>e[r]=1)):1}}})(),(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{var e=e=>{var t=e=>e.split(".").map((e=>+e==e?+e:e)),r=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=r[1]?t(r[1]):[];return r[2]&&(n.length++,n.push.apply(n,t(r[2]))),r[3]&&(n.push([]),n.push.apply(n,t(r[3]))),n},t=(r,n)=>{if(0 in r){n=e(n);var o=r[0],a=o<0;a&&(o=-o-1);for(var i=0,u=1,l=!0;;u++,i++){var f,c,s=u<r.length?(typeof r[u])[0]:"";if(i>=n.length||"o"==(c=(typeof(f=n[i]))[0]))return!l||("u"==s?u>o&&!a:""==s!=a);if("u"==c){if(!l||"u"!=s)return!1}else if(l)if(s==c)if(u<=o){if(f!=r[u])return!1}else{if(a?f>r[u]:f<r[u])return!1;f!=r[u]&&(l=!1)}else if("s"!=s&&"n"!=s){if(a||u<=o)return!1;l=!1,u--}else{if(u<=o||c<s!=a)return!1;l=!1}else"s"!=s&&"n"!=s&&(l=!1,u--)}}var p=[],h=p.pop.bind(p);for(i=1;i<r.length;i++){var d=r[i];p.push(1==d?h()|h():2==d?h()&h():d?t(d,n):!h())}return!!h()},r=(r,n,o)=>{var a=r[n];return(n=Object.keys(a).reduce(((r,n)=>!t(o,n)||r&&!((t,r)=>{t=e(t),r=e(r);for(var n=0;;){if(n>=t.length)return n<r.length&&"u"!=(typeof r[n])[0];var o=t[n],a=(typeof o)[0];if(n>=r.length)return"u"==a;var i=r[n],u=(typeof i)[0];if(a!=u)return"o"==a&&"n"==u||"s"==u||"u"==a;if("o"!=a&&"u"!=a&&o!=i)return o<i;n++}})(r,n)?r:n),0))&&a[n]},n=(e=>function(t,r,n,a){var i=o.I(t);return i&&i.then?i.then(e.bind(e,t,o.S[t],r,n,a)):e(0,o.S[t],r,n,a)})(((e,t,n,a,i)=>{var u=t&&o.o(t,n)&&r(t,n,a);return u?(e=>(e.loaded=1,e.get()))(u):i()})),a={},i={90:()=>n("default","react",[1,17,0,2],(()=>o.e(784).then((()=>()=>o(784))))),755:()=>n("default","@mofed/config",[1,1,0,0],(()=>o.e(550).then((()=>()=>o(550)))))};[90,755].forEach((e=>{o.m[e]=t=>{a[e]=0,delete o.c[e];var r=i[e]();if("function"!=typeof r)throw new Error("Shared module is not available for eager consumption: "+e);t.exports=r()}}));var u={};o.f.consumes=(e,t)=>{o.o(u,e)&&u[e].forEach((e=>{if(o.o(a,e))return t.push(a[e]);var r=t=>{a[e]=0,o.m[e]=r=>{delete o.c[e],r.exports=t()}},n=t=>{delete a[e],o.m[e]=r=>{throw delete o.c[e],t}};try{var u=i[e]();u.then?t.push(a[e]=u.then(r).catch(n)):r(u)}catch(e){n(e)}}))}})(),(()=>{var e={179:0,582:0};o.f.j=(t,r)=>{var n=o.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var a=new Promise(((r,o)=>n=e[t]=[r,o]));r.push(n[2]=a);var i=o.p+o.u(t),u=new Error;o.l(i,(r=>{if(o.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,n[1](u)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,a,[i,u,l]=r,f=0;for(n in u)o.o(u,n)&&(o.m[n]=u[n]);for(l&&l(o),t&&t(r);f<i.length;f++)a=i[f],o.o(e,a)&&e[a]&&e[a][0](),e[i[f]]=0},r=self.webpackChunk_mofed_components=self.webpackChunk_mofed_components||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),o(582)})();