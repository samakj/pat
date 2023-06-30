(()=>{var e,t,n,r={4744:(e,t,n)=>{"use strict";var r,o=n(9268),i=n.n(o),a=n(7147),s=n.n(a),d=n(1017),l=n.n(d),c=n(367),u=n(5709),f=n(9550),h=n(5998),m=n(9895),p=f.ZP.div.withConfig({displayName:"elements__ModalRootElement",componentId:"sc-1fiflu9-0"})(["height:0;width:0;"]),v=(f.ZP.div.withConfig({displayName:"elements__ModalBackgroundElement",componentId:"sc-1fiflu9-1"})(["background-color:",";position:fixed;top:0;left:0;height:100vh;width:100vw;"],(function(e){var t=e.theme;return(0,m.DZ)(.2,t.colours.background)})),f.ZP.div.withConfig({displayName:"elements__ModalContainerElement",componentId:"sc-1fiflu9-2"})(["background-color:",";box-shadow:0 0 1rem 0 ",";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"],(function(e){return e.theme.colours.background}),(function(e){var t=e.theme;return(0,m.DZ)(.7,t.colours.foreground)})),f.ZP.div.withConfig({displayName:"elements__ModalContentElement",componentId:"sc-1fiflu9-3"})(["padding:1rem;"]),f.ZP.h2.withConfig({displayName:"elements__ModalTitleElement",componentId:"sc-1fiflu9-4"})(["margin:0 0 2rem;font-size:1.25rem;"]),f.ZP.div.withConfig({displayName:"elements__ModalBodyElement",componentId:"sc-1fiflu9-5"})(["margin-bottom:1rem;"]),f.ZP.div.withConfig({displayName:"elements__ModalActionsElement",componentId:"sc-1fiflu9-6"})(["*{margin-right:0.25rem;&:last-child{margin-right:0;}}"]),n(6173)),g=function(){return(0,v.tZ)(p,{id:"_modal_root_"})},b=n(9655),Z=n(9250),y=n(9886),w=n(885),I=n(4098),_={"/":{path:"/",icon:(0,v.tZ)(I.SHD,{}),name:"Home"}},k=f.ZP.ul.withConfig({displayName:"elements__NavListElement",componentId:"sc-hrvj4e-0"})(["list-style:none;padding:0;margin:0;"]),C=f.ZP.li.withConfig({displayName:"elements__NavItemElement",componentId:"sc-hrvj4e-1"})(["transition:background-color 300ms;border-bottom:1px solid ",";&:hover{background-color:",";}"],(function(e){return e.theme.colours.border.light}),(function(e){var t=e.theme;return(0,m.DZ)(.7,t.colours.white)})),N=(0,f.ZP)(b.Link).withConfig({displayName:"elements__NavLinkElement",componentId:"sc-hrvj4e-2"})(["padding:1rem 2rem;text-decoration:none;display:grid;grid-template-columns:auto 1fr;grid-gap:0.5rem;align-items:center;color:inherit;border-bottom:none;"]),M=f.ZP.span.withConfig({displayName:"elements__NavLinkText",componentId:"sc-hrvj4e-3"})([""]),x=function(){return(0,v.tZ)("nav",{children:(0,v.tZ)(k,{children:Object.entries(_).map((function(e){var t=(0,w.Z)(e,2),n=t[0],r=t[1];return(0,v.tZ)(C,{children:(0,v.BX)(N,{to:r.path,children:[r.icon,(0,v.tZ)(M,{children:r.name})]})},n)}))})})},E=f.ZP.div.withConfig({displayName:"elements__PageStructureElement",componentId:"sc-l3ldph-0"})(["display:grid;height:100vh;width:100vw;grid-template-rows:auto 1fr;grid-template-columns:auto 1fr;grid-template-areas:'header header' 'aside main';"]),P=f.ZP.header.withConfig({displayName:"elements__PageHeaderElement",componentId:"sc-l3ldph-1"})(["grid-area:header;display:flex;justify-content:space-between;border-bottom:1px solid ",";"],(function(e){return e.theme.colours.border.light})),S=f.ZP.aside.withConfig({displayName:"elements__PageAsideElement",componentId:"sc-l3ldph-2"})(["grid-area:aside;border-right:1px solid ",";"],(function(e){return e.theme.colours.border.light})),O=f.ZP.main.withConfig({displayName:"elements__PageMainElement",componentId:"sc-l3ldph-3"})(["grid-area:main;padding:1rem;overflow:auto;height:100%;width:100%;"]),A=f.ZP.h1.withConfig({displayName:"elements__HeaderElement",componentId:"sc-l3ldph-4"})(["width:",";text-align:center;margin:0.5rem 0;"],(function(e){return e.theme.dimensions.sidebar.width})),T=f.ZP.div.withConfig({displayName:"elements__AsideContentElement",componentId:"sc-l3ldph-5"})(["width:",";"],(function(e){return e.theme.dimensions.sidebar.width})),B=function(){return(0,v.tZ)(S,{children:(0,v.tZ)(T,{children:(0,v.tZ)(x,{})})})},q=function(){return(0,v.tZ)(P,{children:(0,v.tZ)(A,{children:"Pat"})})},D=function(e){var t=e.children;return(0,v.BX)(E,{children:[(0,v.tZ)(q,{}),(0,v.tZ)(B,{}),(0,v.tZ)(O,{children:t})]})},j=n(1413),X=n(2982),L=n(7762),R=n(3144),H=n(5671),V=n(4942),W=n(1032),U=function e(t,n){t.data=t.data||{},Array.isArray(n.payload)?n.payload.forEach((function(n){return e(t,{payload:n})})):t.data[n.payload.arbitration_id]=n.payload},F=function(e,t){t.payload&&(e.websocket=(0,j.Z)((0,j.Z)({},e.websocket||{}),{},{startTime:t.payload}))},z=function(e,t){t.payload&&(e.websocket=(0,j.Z)((0,j.Z)({},e.websocket||{}),{},{lastMessage:t.payload}))},G=function(e,t){t.payload&&(e.websocket=(0,j.Z)((0,j.Z)({},e.websocket||{}),{},{messageCount:t.payload}))},Q=function(e,t){t.payload&&(e.websocket=(0,j.Z)((0,j.Z)({},e.websocket||{}),{},{windowedMessageCount:t.payload}))},J=(0,W.oM)({name:"can",initialState:{requests:{},data:void 0,websocket:void 0},reducers:{setCANData:U,setStartTime:F,setLastMessage:z,setMessageCount:G,setWindowedMessageCount:Q,setCANWebsocketData:function(e,t){t.payload&&(U(e,{payload:t.payload.data}),F(e,{payload:t.payload.startTime}),z(e,{payload:t.payload.lastMessage}),G(e,{payload:t.payload.messageCount}),Q(e,{payload:t.payload.windowedMessageCount}))}}}),Y=(0,W.xC)({reducer:(0,V.Z)({},J.name,J.reducer),preloadedState:{}}),K=function(e,t){return"undefined"!=typeof window&&window.document?(0,h.v9)(e,t):e(Y.getState())},$=n(1002);!function(e){e.GREATER_THAN="gt",e.GREATER_THAN_OR_EQUAL="gte",e.EQUALS="eq",e.LESS_THAN_OR_EQUAL="lte",e.LESS_THAN="lt"}(r||(r={}));var ee=function(){function e(t){var n=this;(0,H.Z)(this,e),this.template=void 0,this.buildPath=function(t){if(null==t)return n.template;var r=n.template;return Object.entries(t).forEach((function(t){var n=(0,w.Z)(t,2),o=n[0],i=n[1],a=e.buildParamValue(i);null!=a&&(r=r.replace(":".concat(o),a))})),r.endsWith("/")&&(r=r.slice(0,-1)),r},this.template=t}return(0,R.Z)(e,[{key:"build",value:function(t,n){var r=e.buildParams(n||t),o="";return Array.from(r).length&&(o="?".concat(r)),"".concat(this.buildPath(t)).concat(o.replace(/%3A/g,":"))}}]),e}();ee.serialiseValue=function(e){var t;return e instanceof Date&&(e=e.toISOString()),null===(t=e)||void 0===t?void 0:t.toString()},ee.buildParamValue=function(e){if(null!=e)return function(e){return"object"===(0,$.Z)(e)&&!(e instanceof Date)}(e)?"".concat(e.operator,":").concat(ee.serialiseValue(e.value)):ee.serialiseValue(e)},ee.buildArrayParamValue=function(e){if(null!=e)return e.map(ee.buildParamValue)},ee.addParam=function(e,t,n){if(null==n)return e;if(function(e){return Array.isArray(e)}(n)){var r=ee.buildArrayParamValue(n);null==r||r.forEach((function(n){null!=n&&e.append(t,n)}))}else{var o=ee.buildParamValue(n);o&&e.append(t,o)}return e},ee.buildParams=function(e){var t=new URLSearchParams;return null==e||Object.entries(e).forEach((function(e){var n=(0,w.Z)(e,2),r=n[0],o=n[1];ee.addParam(t,r,o)})),t};var te=new ee("/v0/can/ws"),ne=(0,R.Z)((function e(t){var n=this;(0,H.Z)(this,e),this.dispatch=void 0,this.socket=void 0,this.startTime=void 0,this.lastMessage=void 0,this.messageCount=void 0,this.windowedMessages=void 0,this.onOpen=void 0,this.onMessage=void 0,this.onError=void 0,this.onClose=void 0,this.buffer=void 0,this.bufferClearInterval=void 0,this.connect=function(){n.socket=new WebSocket("ws://".concat(location.hostname,":9000").concat(te.build())),n.socket.onopen=function(e){var t,r=new Date;n.startTime=r,n.lastMessage=r,n.messageCount=0,n.windowedMessages=[],null===(t=n.onOpen)||void 0===t||t.call(n,e,n.socket)},n.socket.onerror=function(e){var t;return null===(t=n.onError)||void 0===t?void 0:t.call(n,e,n.socket)},n.socket.onclose=function(e){var t;return null===(t=n.onClose)||void 0===t?void 0:t.call(n,e,n.socket)},n.socket.onmessage=function(e){var t,r,o=new Date;n.messageCount=(n.messageCount||0)+1,n.lastMessage=o;var i,a=JSON.parse(e.data),s=0,d=(0,L.Z)(n.windowedMessages||[]);try{for(d.s();!(i=d.n()).done;){var l=i.value;if(+new Date-+new Date(l.timestamp)<1e3)break;s+=1}}catch(e){d.e(e)}finally{d.f()}n.windowedMessages=[].concat((0,X.Z)((null===(t=n.windowedMessages)||void 0===t?void 0:t.slice(s))||[]),[a]),n.buffer.push(a),null===(r=n.onMessage)||void 0===r||r.call(n,e,a,n.socket)},n.bufferClearInterval=setInterval(n.clearBuffer,100)},this.clearBuffer=function(){n.dispatch(J.actions.setCANWebsocketData({data:n.buffer,startTime:n.startTime.toISOString(),lastMessage:n.lastMessage.toISOString(),messageCount:n.messageCount,windowedMessageCount:n.windowedMessages.length}))},this.disconnect=function(){n.socket&&(n.socket.close(),n.socket=void 0),clearInterval(n.bufferClearInterval)},this.startTime=new Date,this.lastMessage=new Date,this.messageCount=0,this.windowedMessages=[],this.dispatch=t.dispatch,this.onOpen=t.onOpen,this.onMessage=t.onMessage,this.onError=t.onError,this.onClose=t.onClose,this.buffer=[]})),re=[],oe={},ie=function(){var e=K((function(e){var t;return null===(t=e.can.websocket)||void 0===t?void 0:t.startTime}));return(0,v.BX)("div",{children:["Start Time: ",e||"-"]})},ae=function(){var e=K((function(e){var t;return null===(t=e.can.websocket)||void 0===t?void 0:t.lastMessage}));return(0,v.BX)("div",{children:["Last Message: ",e||"-"]})},se=function(){var e=K((function(e){var t;return(null===(t=e.can.websocket)||void 0===t?void 0:t.messageCount)||0}));return(0,v.BX)("div",{children:["Message Count: ",e||"-"]})},de=function(){var e=K((function(e){var t;return(null===(t=e.can.websocket)||void 0===t?void 0:t.windowedMessageCount)||0}));return(0,v.BX)("div",{children:["Message Count: ",e,"/s"]})},le=function(e){var t=e.name;return(0,v.tZ)("td",{children:t})},ce=function(e){var t=e.arbitrationId;return(0,v.tZ)("td",{children:t})},ue=function(e){var t=e.arbitrationId,n=K((function(e){var n,r;return null===(n=e.can.data)||void 0===n||null===(r=n[t])||void 0===r?void 0:r.timestamp}));return(0,v.tZ)("td",{children:n?new Date(n).toISOString():"-"})},fe=function(e){var t=e.arbitrationId,n=e.bitNo,r=e.checkIgnored,o=(0,c.useRef)(),i=(0,c.useMemo)((function(){var e;return!r&&(null===(e=oe[t])||void 0===e?void 0:e.find((function(e){var t=e.minBit,r=e.maxBit;return n>=t&&n<r})))}),[r,n]),a=K((function(e){var r,o;return i?"-":null===(r=e.can.data)||void 0===r||null===(o=r[t])||void 0===o?void 0:o.data[n]})),s=(0,c.useState)({}),d=(0,w.Z)(s,2),l=d[0],u=d[1];return(0,c.useEffect)((function(){if(a!==o.current){o.current=a,u({color:"red",fontWeight:"bold"});var e=setTimeout((function(){return u({})}),100);return function(){clearTimeout(e)}}}),[a,u]),a?(0,v.tZ)("span",{style:l,children:a}):null},he=function(e){var t=e.arbitrationId,n=e.byteNo;return(0,v.BX)("td",{children:[(0,v.tZ)(fe,{arbitrationId:t,bitNo:8*n+0,checkIgnored:!0}),(0,v.tZ)(fe,{arbitrationId:t,bitNo:8*n+1,checkIgnored:!0}),(0,v.tZ)(fe,{arbitrationId:t,bitNo:8*n+2,checkIgnored:!0}),(0,v.tZ)(fe,{arbitrationId:t,bitNo:8*n+3,checkIgnored:!0}),(0,v.tZ)(fe,{arbitrationId:t,bitNo:8*n+4,checkIgnored:!0}),(0,v.tZ)(fe,{arbitrationId:t,bitNo:8*n+5,checkIgnored:!0}),(0,v.tZ)(fe,{arbitrationId:t,bitNo:8*n+6,checkIgnored:!0}),(0,v.tZ)(fe,{arbitrationId:t,bitNo:8*n+7,checkIgnored:!0})]})},me=function(e){var t=e.arbitrationId;return(0,v.BX)("tr",{children:[(0,v.tZ)(ce,{arbitrationId:t}),(0,v.tZ)(ue,{arbitrationId:t}),(0,v.tZ)(he,{arbitrationId:t,byteNo:0}),(0,v.tZ)(he,{arbitrationId:t,byteNo:1}),(0,v.tZ)(he,{arbitrationId:t,byteNo:2}),(0,v.tZ)(he,{arbitrationId:t,byteNo:3}),(0,v.tZ)(he,{arbitrationId:t,byteNo:4}),(0,v.tZ)(he,{arbitrationId:t,byteNo:5}),(0,v.tZ)(he,{arbitrationId:t,byteNo:6}),(0,v.tZ)(he,{arbitrationId:t,byteNo:7})]})},pe=function(e){var t=e.name,n=e.arbitrationId,r=e.minBit,o=e.maxBit;return(0,v.BX)("tr",{children:[(0,v.tZ)(le,{name:t}),(0,v.tZ)("td",{children:Array(o-r).fill(null).map((function(e,t){return(0,v.tZ)(fe,{arbitrationId:n,bitNo:t+r},t)}))})]})},ve=function(){var e,t,n;e={},t=(0,h.I0)(),n=(0,c.useRef)(),(0,c.useEffect)((function(){return n.current=new ne({dispatch:t,onOpen:e.onOpen,onMessage:e.onMessage,onError:e.onError,onClose:e.onClose}),n.current.connect(),function(){var e;return null===(e=n.current)||void 0===e?void 0:e.disconnect()}}),[t,e.onOpen,e.onMessage,e.onError,e.onClose]);var r=K((function(e){return Object.values(e.can.data||{}).sort((function(e,t){return e.arbitration_id<t.arbitration_id?-1:e.arbitration_id>t.arbitration_id?1:0})).map((function(e){return e.arbitration_id}))}),(function(e,t){if(e.length!=t.length)return!1;for(var n in e)if(e[n]!=t[n])return!1;return!0}));return(0,v.BX)("div",{children:[(0,v.tZ)(ie,{}),(0,v.tZ)(ae,{}),(0,v.tZ)(se,{}),(0,v.tZ)(de,{}),(0,v.tZ)("hr",{}),(0,v.BX)("table",{children:[(0,v.tZ)("thead",{children:(0,v.BX)("tr",{children:[(0,v.tZ)("th",{children:"Name"}),(0,v.tZ)("th",{colSpan:8,children:"Data"})]})}),(0,v.tZ)("tbody",{style:{fontFamily:"monospace"},children:re.map((function(e,t){return(0,v.tZ)(pe,(0,j.Z)({},e),t)}))})]}),(0,v.tZ)("hr",{}),(0,v.BX)("table",{children:[(0,v.tZ)("thead",{children:(0,v.BX)("tr",{children:[(0,v.tZ)("th",{children:"Arbitation Id"}),(0,v.tZ)("th",{children:"Timestamp"}),(0,v.tZ)("th",{colSpan:8,children:"Data"})]})}),(0,v.tZ)("tbody",{style:{fontFamily:"monospace"},children:r.map((function(e){return(0,v.tZ)(me,{arbitrationId:e},e)}))})]})]})},ge=function(){return(0,v.tZ)(D,{children:(0,v.BX)(Z.Z5,{children:[(0,v.tZ)(Z.AW,{path:"/",element:(0,v.tZ)(ve,{})}),(0,v.tZ)(Z.AW,{path:"*",element:(0,v.tZ)(Z.Fg,{to:"/",replace:!0})})]})})},be=function(e){var t=e.location;return t?(0,v.tZ)(y.gx,{location:t,children:(0,v.tZ)(ge,{})}):(0,v.tZ)(b.BrowserRouter,{children:(0,v.tZ)(ge,{})})},Ze=(0,f.vJ)(["body{margin:0;padding:0;background-color:",";color:",";font-family:'Roboto',sans-serif;overflow:hidden;*{box-sizing:border-box;}a{color:inherit;text-decoration:none;padding-bottom:0.125rem;border-bottom:1px dashed ","}button{font-family:'Roboto',sans-serif;cursor:pointer;appearance:none;border:none;background:none;padding:0;margin:0;&:disabled{cursor:auto;}input{font-family:'Roboto',sans-serif;}}}"],(function(e){return e.theme.colours.background}),(function(e){return e.theme.colours.foreground}),(function(e){return e.theme.colours.foreground})),ye={colours:{black:"#000",white:"#fff",red:"#f00"},dimensions:{sidebar:{width:"16rem"}}};ye.colours.foreground=ye.colours.white,ye.colours.background=ye.colours.black,ye.colours.border={light:(0,m.DZ)(.9,ye.colours.foreground)},ye.colours.placeholder={light:(0,m.DZ)(.9,ye.colours.foreground)};var we=[[48,64],[160,320]],Ie=[40,70];ye.colours.chartLines=function(e,t){for(var n=(Ie[1]-Ie[0])/2,r=Math.ceil(8),o=we.reduce((function(e,t){return e+t[1]-t[0]}),0)/r,i=[],a=0;a<3;a+=1)for(var s=0;s<r;s+=1){var d,l=we[0][0],c=s*o,u=(0,L.Z)(we);try{for(u.s();!(d=u.n()).done;){var f=d.value;if((l=f[0]+c)<f[1])break;c=l-f[1]}}catch(e){u.e(e)}finally{u.f()}i.push("hsl(\n          ".concat(l+o*a/3,"deg, \n          100%, \n          ").concat(Ie[0]+a*n,"%\n        )").replace(/\s/g,""))}return i}();var _e=function(e){return(0,v.tZ)(h.zt,{store:Y,children:(0,v.BX)(f.f6,{theme:ye,children:[(0,v.tZ)(Ze,{}),(0,v.tZ)(be,{location:e.location}),(0,v.tZ)(g,{})]})})};const ke=require("os");var Ce=l().resolve(__dirname,".."),Ne=i()();Ne.use(i().static(Ce)),Ne.use("*",(function(e,t){var n=new f.qH,r=(0,u.D)(n.collectStyles((0,v.tZ)(_e,{location:e.originalUrl}))),o=n.getStyleTags();n.seal();var i=s().readFileSync(l().resolve(Ce,"index.html"),{encoding:"utf8"}).replace('<div id="root"></div>','<div id="root">'.concat(r,"</div>")).replace("\x3c!-- SSR_STYLE_TAGS --\x3e",o);return t.contentType("text/html"),t.status(200),t.send(i)}));var Me=(0,ke.networkInterfaces)();Ne.listen(8085,"0.0.0.0",(function(){var e,t;return console.log("Express server started at http://".concat((null==Me||null===(e=Me.wlan0)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.address)||"0.0.0.0",":").concat(8085))}))},8967:e=>{function t(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=8967,e.exports=t},852:e=>{"use strict";e.exports=require("async_hooks")},4300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},1808:e=>{"use strict";e.exports=require("net")},1017:e=>{"use strict";e.exports=require("path")},3477:e=>{"use strict";e.exports=require("querystring")},2781:e=>{"use strict";e.exports=require("stream")},1576:e=>{"use strict";e.exports=require("string_decoder")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={id:e,loaded:!1,exports:{}};return r[e].call(n.exports,n,n.exports,i),n.loaded=!0,n.exports}i.m=r,i.x=()=>{var e=i.O(void 0,[216],(()=>i(4744)));return i.O(e)},e=[],i.O=(t,n,r,o)=>{if(!n){var a=1/0;for(c=0;c<e.length;c++){for(var[n,r,o]=e[c],s=!0,d=0;d<n.length;d++)(!1&o||a>=o)&&Object.keys(i.O).every((e=>i.O[e](n[d])))?n.splice(d--,1):(s=!1,o<a&&(a=o));if(s){e.splice(c--,1);var l=r();void 0!==l&&(t=l)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[n,r,o]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,n)=>(i.f[n](e,t),t)),[])),i.u=e=>"server/vendors.js",i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),n={179:1},i.O.require=e=>n[e],i.f.require=(e,t)=>{n[e]||(e=>{var t=e.modules,r=e.ids,o=e.runtime;for(var a in t)i.o(t,a)&&(i.m[a]=t[a]);o&&o(i);for(var s=0;s<r.length;s++)n[r[s]]=1;i.O()})(require("../"+i.u(e)))},t=i.x,i.x=()=>(i.e(216),t()),i.x()})();