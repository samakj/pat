(()=>{"use strict";var e,t={583:(e,t,n)=>{n(432);var r,o=n(748),i=n(998),a=n(788),l=n(895),d=a.ZP.div.withConfig({displayName:"elements__ModalRootElement",componentId:"sc-1fiflu9-0"})(["height:0;width:0;"]),c=(a.ZP.div.withConfig({displayName:"elements__ModalBackgroundElement",componentId:"sc-1fiflu9-1"})(["background-color:",";position:fixed;top:0;left:0;height:100vh;width:100vw;"],(function(e){var t=e.theme;return(0,l.DZ)(.2,t.colours.background)})),a.ZP.div.withConfig({displayName:"elements__ModalContainerElement",componentId:"sc-1fiflu9-2"})(["background-color:",";box-shadow:0 0 1rem 0 ",";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"],(function(e){return e.theme.colours.background}),(function(e){var t=e.theme;return(0,l.DZ)(.7,t.colours.foreground)})),a.ZP.div.withConfig({displayName:"elements__ModalContentElement",componentId:"sc-1fiflu9-3"})(["padding:1rem;"]),a.ZP.h2.withConfig({displayName:"elements__ModalTitleElement",componentId:"sc-1fiflu9-4"})(["margin:0 0 2rem;font-size:1.25rem;"]),a.ZP.div.withConfig({displayName:"elements__ModalBodyElement",componentId:"sc-1fiflu9-5"})(["margin-bottom:1rem;"]),a.ZP.div.withConfig({displayName:"elements__ModalActionsElement",componentId:"sc-1fiflu9-6"})(["*{margin-right:0.25rem;&:last-child{margin-right:0;}}"]),n(311)),u=function(){return(0,c.tZ)(d,{id:"_modal_root_"})},s=n(655),m=n(335),f=n(886),h=n(885),p=n(98),g={"/":{path:"/",icon:(0,c.tZ)(p.SHD,{}),name:"Home"}},v=a.ZP.ul.withConfig({displayName:"elements__NavListElement",componentId:"sc-hrvj4e-0"})(["list-style:none;padding:0;margin:0;"]),b=a.ZP.li.withConfig({displayName:"elements__NavItemElement",componentId:"sc-hrvj4e-1"})(["transition:background-color 300ms;border-bottom:1px solid ",";&:hover{background-color:",";}"],(function(e){return e.theme.colours.border.light}),(function(e){var t=e.theme;return(0,l.DZ)(.7,t.colours.white)})),Z=(0,a.ZP)(s.Link).withConfig({displayName:"elements__NavLinkElement",componentId:"sc-hrvj4e-2"})(["padding:1rem 2rem;text-decoration:none;display:grid;grid-template-columns:auto 1fr;grid-gap:0.5rem;align-items:center;color:inherit;border-bottom:none;"]),w=a.ZP.span.withConfig({displayName:"elements__NavLinkText",componentId:"sc-hrvj4e-3"})([""]),y=function(){return(0,c.tZ)("nav",{children:(0,c.tZ)(v,{children:Object.entries(g).map((function(e){var t=(0,h.Z)(e,2),n=t[0],r=t[1];return(0,c.tZ)(b,{children:(0,c.BX)(Z,{to:r.path,children:[r.icon,(0,c.tZ)(w,{children:r.name})]})},n)}))})})},_=a.ZP.div.withConfig({displayName:"elements__PageStructureElement",componentId:"sc-l3ldph-0"})(["display:grid;height:100vh;width:100vw;grid-template-rows:auto 1fr;grid-template-columns:auto 1fr;grid-template-areas:'header header' 'aside main';"]),P=a.ZP.header.withConfig({displayName:"elements__PageHeaderElement",componentId:"sc-l3ldph-1"})(["grid-area:header;display:flex;justify-content:space-between;border-bottom:1px solid ",";"],(function(e){return e.theme.colours.border.light})),E=a.ZP.aside.withConfig({displayName:"elements__PageAsideElement",componentId:"sc-l3ldph-2"})(["grid-area:aside;border-right:1px solid ",";"],(function(e){return e.theme.colours.border.light})),C=a.ZP.main.withConfig({displayName:"elements__PageMainElement",componentId:"sc-l3ldph-3"})(["grid-area:main;padding:1rem;overflow:auto;height:100%;width:100%;"]),N=a.ZP.h1.withConfig({displayName:"elements__HeaderElement",componentId:"sc-l3ldph-4"})(["width:",";text-align:center;margin:0.5rem 0;"],(function(e){return e.theme.dimensions.sidebar.width})),k=a.ZP.div.withConfig({displayName:"elements__AsideContentElement",componentId:"sc-l3ldph-5"})(["width:",";"],(function(e){return e.theme.dimensions.sidebar.width})),I=function(){return(0,c.tZ)(E,{children:(0,c.tZ)(k,{children:(0,c.tZ)(y,{})})})},A=function(){return(0,c.tZ)(P,{children:(0,c.tZ)(N,{children:"Pat"})})},M=function(e){var t=e.children;return(0,c.BX)(_,{children:[(0,c.tZ)(A,{}),(0,c.tZ)(I,{}),(0,c.tZ)(C,{children:t})]})},S=n(982),O=n(762),x=n(575),D=n(942),R=function e(t,n){t.data=t.data||{},Array.isArray(n.payload)?n.payload.forEach((function(n){return e(t,{payload:n})})):t.data[n.payload.arbitration_id]=n.payload},j=(0,x.oM)({name:"can",initialState:{requests:{},data:void 0},reducers:{setCANData:R},extraReducers:function(e){e.addCase(U,R)}}),B=(0,x.xC)({reducer:(0,D.Z)({},j.name,j.reducer),preloadedState:{}}),T=n(671),L=n(144),X=n(2);!function(e){e.GREATER_THAN="gt",e.GREATER_THAN_OR_EQUAL="gte",e.EQUALS="eq",e.LESS_THAN_OR_EQUAL="lte",e.LESS_THAN="lt"}(r||(r={}));var H=function(){function e(t){var n=this;(0,T.Z)(this,e),this.template=void 0,this.buildPath=function(t){if(null==t)return n.template;var r=n.template;return Object.entries(t).forEach((function(t){var n=(0,h.Z)(t,2),o=n[0],i=n[1],a=e.buildParamValue(i);null!=a&&(r=r.replace(":".concat(o),a))})),r.endsWith("/")&&(r=r.slice(0,-1)),r},this.template=t}return(0,L.Z)(e,[{key:"build",value:function(t,n){var r=e.buildParams(n||t),o="";return Array.from(r).length&&(o="?".concat(r)),"".concat(this.buildPath(t)).concat(o.replace(/%3A/g,":"))}}]),e}();H.serialiseValue=function(e){var t;return e instanceof Date&&(e=e.toISOString()),null===(t=e)||void 0===t?void 0:t.toString()},H.buildParamValue=function(e){if(null!=e)return function(e){return"object"===(0,X.Z)(e)&&!(e instanceof Date)}(e)?"".concat(e.operator,":").concat(H.serialiseValue(e.value)):H.serialiseValue(e)},H.buildArrayParamValue=function(e){if(null!=e)return e.map(H.buildParamValue)},H.addParam=function(e,t,n){if(null==n)return e;if(function(e){return Array.isArray(e)}(n)){var r=H.buildArrayParamValue(n);null==r||r.forEach((function(n){null!=n&&e.append(t,n)}))}else{var o=H.buildParamValue(n);o&&e.append(t,o)}return e},H.buildParams=function(e){var t=new URLSearchParams;return null==e||Object.entries(e).forEach((function(e){var n=(0,h.Z)(e,2),r=n[0],o=n[1];H.addParam(t,r,o)})),t};var V=new H("/v0/can/ws"),U=(0,x.PH)("createDevice/received"),W=function(){var e,t,n=(0,o.useState)(+new Date),r=(0,h.Z)(n,2)[1],a=function(e){var t=e.onOpen,n=e.onMessage,r=e.onClose,a=e.onError,l=(0,i.I0)(),d=(0,o.useRef)(null),c=(0,o.useRef)({}),u=(0,o.useRef)([]);return(0,o.useEffect)((function(){return d.current=new WebSocket("ws://".concat(location.hostname,":9000").concat(V.build())),d.current.onopen=function(e){var n=new Date;c.current.startTime=n,c.current.lastMessage=n,c.current.messageCount=0,c.current.windowedMessages=[],null==t||t(e,d.current)},d.current.onerror=function(e){return null==a?void 0:a(e,d.current)},d.current.onclose=function(e){return null==r?void 0:r(e,d.current)},d.current.onmessage=function(e){var t,r=new Date;c.current.messageCount=(c.current.messageCount||0)+1,c.current.lastMessage=r;var o,i=JSON.parse(e.data),a=0,l=(0,O.Z)(c.current.windowedMessages||[]);try{for(l.s();!(o=l.n()).done;){var u=o.value;if(+new Date-+new Date(u.timestamp)>1e3)break;a+=1}}catch(e){l.e(e)}finally{l.f()}c.current.windowedMessages=[].concat((0,S.Z)((null===(t=c.current.windowedMessages)||void 0===t?void 0:t.slice(a))||[]),[i]),null==n||n(e,i,d.current)},function(){var e;return null===(e=d.current)||void 0===e?void 0:e.close()}}),[l,t,n,a,r]),(0,o.useEffect)((function(){var e=setInterval((function(){u.current.length&&l(U(u.current)),u.current=[]}),100);return function(){clearInterval(e)}}),[l]),{websocket:d,meta:c.current}}({}).meta,l=(t=function(e){return e.can.data},"undefined"!=typeof window&&window.document?(0,i.v9)(t,undefined):t(B.getState()));return(0,o.useEffect)((function(){var e=setInterval((function(){return r(+new Date)}),100);return function(){clearInterval(e)}}),[r]),(0,c.BX)("div",{children:[(0,c.BX)("div",{children:["Start Time: ",a.startTime]}),(0,c.BX)("div",{children:["Last Message: ",a.lastMessage]}),(0,c.BX)("div",{children:["Message Count: ",a.messageCount]}),(0,c.BX)("div",{children:["Rate:"," ",((a.windowedMessages||[]).length/1e3).toLocaleString(void 0,{maximumFractionDigits:0}),"/s"]}),(0,c.BX)("table",{children:[(0,c.tZ)("thead",{children:(0,c.BX)("tr",{children:[(0,c.tZ)("th",{children:"Arbitation Id"}),(0,c.tZ)("th",{children:"Timestamp"}),(0,c.tZ)("th",{children:"Data"})]})}),(0,c.tZ)("tbody",{children:null===(e=Object.values(l||{}))||void 0===e?void 0:e.sort((function(e,t){return e.arbitration_id<t.arbitration_id?-1:e.arbitration_id>t.arbitration_id?1:0})).map((function(e){return(0,c.BX)("tr",{children:[(0,c.tZ)("td",{children:e.arbitration_id}),(0,c.tZ)("td",{children:e.timestamp}),(0,c.tZ)("td",{children:e.data})]},e.arbitration_id)}))})]})]})},z=function(){return(0,c.tZ)(M,{children:(0,c.BX)(m.Z5,{children:[(0,c.tZ)(m.AW,{path:"/",element:(0,c.tZ)(W,{})}),(0,c.tZ)(m.AW,{path:"*",element:(0,c.tZ)(m.Fg,{to:"/",replace:!0})})]})})},Q=function(e){var t=e.location;return t?(0,c.tZ)(f.gx,{location:t,children:(0,c.tZ)(z,{})}):(0,c.tZ)(s.BrowserRouter,{children:(0,c.tZ)(z,{})})},q=(0,a.vJ)(["body{margin:0;padding:0;background-color:",";color:",";font-family:'Roboto',sans-serif;overflow:hidden;*{box-sizing:border-box;}a{color:inherit;text-decoration:none;padding-bottom:0.125rem;border-bottom:1px dashed ","}button{font-family:'Roboto',sans-serif;cursor:pointer;appearance:none;border:none;background:none;padding:0;margin:0;&:disabled{cursor:auto;}input{font-family:'Roboto',sans-serif;}}}"],(function(e){return e.theme.colours.background}),(function(e){return e.theme.colours.foreground}),(function(e){return e.theme.colours.foreground})),F={colours:{black:"#000",white:"#fff",red:"#f00"},dimensions:{sidebar:{width:"16rem"}}};F.colours.foreground=F.colours.white,F.colours.background=F.colours.black,F.colours.border={light:(0,l.DZ)(.9,F.colours.foreground)},F.colours.placeholder={light:(0,l.DZ)(.9,F.colours.foreground)};var G=[[48,64],[160,320]],J=[40,70];F.colours.chartLines=function(e,t){for(var n=(J[1]-J[0])/2,r=Math.ceil(8),o=G.reduce((function(e,t){return e+t[1]-t[0]}),0)/r,i=[],a=0;a<3;a+=1)for(var l=0;l<r;l+=1){var d,c=G[0][0],u=l*o,s=(0,O.Z)(G);try{for(s.s();!(d=s.n()).done;){var m=d.value;if((c=m[0]+u)<m[1])break;u=c-m[1]}}catch(e){s.e(e)}finally{s.f()}i.push("hsl(\n          ".concat(c+o*a/3,"deg, \n          100%, \n          ").concat(J[0]+a*n,"%\n        )").replace(/\s/g,""))}return i}(),o.default.hydrate((0,c.tZ)((function(e){return(0,c.tZ)(i.zt,{store:B,children:(0,c.BX)(a.f6,{theme:F,children:[(0,c.tZ)(q,{}),(0,c.tZ)(Q,{location:e.location}),(0,c.tZ)(u,{})]})})}),{}),document.getElementById("root"))}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,o,i)=>{if(!n){var a=1/0;for(u=0;u<e.length;u++){for(var[n,o,i]=e[u],l=!0,d=0;d<n.length;d++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](n[d])))?n.splice(d--,1):(l=!1,i<a&&(a=i));if(l){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,o,i]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[a,l,d]=n,c=0;if(a.some((t=>0!==e[t]))){for(o in l)r.o(l,o)&&(r.m[o]=l[o]);if(d)var u=d(r)}for(t&&t(n);c<a.length;c++)i=a[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(u)},n=self.webpackChunkui=self.webpackChunkui||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[216],(()=>r(583)));o=r.O(o)})();