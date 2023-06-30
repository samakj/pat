(()=>{"use strict";var e,t={583:(e,t,n)=>{n(432);var o,r=n(748),a=n(998),i=n(788),s=n(895),l=i.ZP.div.withConfig({displayName:"elements__ModalRootElement",componentId:"sc-1fiflu9-0"})(["height:0;width:0;"]),d=(i.ZP.div.withConfig({displayName:"elements__ModalBackgroundElement",componentId:"sc-1fiflu9-1"})(["background-color:",";position:fixed;top:0;left:0;height:100vh;width:100vw;"],(function(e){var t=e.theme;return(0,s.DZ)(.2,t.colours.background)})),i.ZP.div.withConfig({displayName:"elements__ModalContainerElement",componentId:"sc-1fiflu9-2"})(["background-color:",";box-shadow:0 0 1rem 0 ",";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"],(function(e){return e.theme.colours.background}),(function(e){var t=e.theme;return(0,s.DZ)(.7,t.colours.foreground)})),i.ZP.div.withConfig({displayName:"elements__ModalContentElement",componentId:"sc-1fiflu9-3"})(["padding:1rem;"]),i.ZP.h2.withConfig({displayName:"elements__ModalTitleElement",componentId:"sc-1fiflu9-4"})(["margin:0 0 2rem;font-size:1.25rem;"]),i.ZP.div.withConfig({displayName:"elements__ModalBodyElement",componentId:"sc-1fiflu9-5"})(["margin-bottom:1rem;"]),i.ZP.div.withConfig({displayName:"elements__ModalActionsElement",componentId:"sc-1fiflu9-6"})(["*{margin-right:0.25rem;&:last-child{margin-right:0;}}"]),n(311)),c=function(){return(0,d.tZ)(l,{id:"_modal_root_"})},u=n(655),m=n(335),f=n(886),h=n(885),p=n(98),g={"/":{path:"/",icon:(0,d.tZ)(p.SHD,{}),name:"Home"}},v=i.ZP.ul.withConfig({displayName:"elements__NavListElement",componentId:"sc-hrvj4e-0"})(["list-style:none;padding:0;margin:0;"]),b=i.ZP.li.withConfig({displayName:"elements__NavItemElement",componentId:"sc-hrvj4e-1"})(["transition:background-color 300ms;border-bottom:1px solid ",";&:hover{background-color:",";}"],(function(e){return e.theme.colours.border.light}),(function(e){var t=e.theme;return(0,s.DZ)(.7,t.colours.white)})),w=(0,i.ZP)(u.Link).withConfig({displayName:"elements__NavLinkElement",componentId:"sc-hrvj4e-2"})(["padding:1rem 2rem;text-decoration:none;display:grid;grid-template-columns:auto 1fr;grid-gap:0.5rem;align-items:center;color:inherit;border-bottom:none;"]),y=i.ZP.span.withConfig({displayName:"elements__NavLinkText",componentId:"sc-hrvj4e-3"})([""]),Z=function(){return(0,d.tZ)("nav",{children:(0,d.tZ)(v,{children:Object.entries(g).map((function(e){var t=(0,h.Z)(e,2),n=t[0],o=t[1];return(0,d.tZ)(b,{children:(0,d.BX)(w,{to:o.path,children:[o.icon,(0,d.tZ)(y,{children:o.name})]})},n)}))})})},_=i.ZP.div.withConfig({displayName:"elements__PageStructureElement",componentId:"sc-l3ldph-0"})(["display:grid;height:100vh;width:100vw;grid-template-rows:auto 1fr;grid-template-columns:auto 1fr;grid-template-areas:'header header' 'aside main';"]),C=i.ZP.header.withConfig({displayName:"elements__PageHeaderElement",componentId:"sc-l3ldph-1"})(["grid-area:header;display:flex;justify-content:space-between;border-bottom:1px solid ",";"],(function(e){return e.theme.colours.border.light})),k=i.ZP.aside.withConfig({displayName:"elements__PageAsideElement",componentId:"sc-l3ldph-2"})(["grid-area:aside;border-right:1px solid ",";"],(function(e){return e.theme.colours.border.light})),M=i.ZP.main.withConfig({displayName:"elements__PageMainElement",componentId:"sc-l3ldph-3"})(["grid-area:main;padding:1rem;overflow:auto;height:100%;width:100%;"]),E=i.ZP.h1.withConfig({displayName:"elements__HeaderElement",componentId:"sc-l3ldph-4"})(["width:",";text-align:center;margin:0.5rem 0;"],(function(e){return e.theme.dimensions.sidebar.width})),P=i.ZP.div.withConfig({displayName:"elements__AsideContentElement",componentId:"sc-l3ldph-5"})(["width:",";"],(function(e){return e.theme.dimensions.sidebar.width})),O=function(){return(0,d.tZ)(k,{children:(0,d.tZ)(P,{children:(0,d.tZ)(Z,{})})})},I=function(){return(0,d.tZ)(C,{children:(0,d.tZ)(E,{children:"Pat"})})},N=function(e){var t=e.children;return(0,d.BX)(_,{children:[(0,d.tZ)(I,{}),(0,d.tZ)(O,{}),(0,d.tZ)(M,{children:t})]})},S=n(982),A=n(762),T=n(144),x=n(671),D=n(942),B=n(32),j=n(413),L=function e(t,n){t.data=t.data||{},Array.isArray(n.payload)?n.payload.forEach((function(n){return e(t,{payload:n})})):t.data[n.payload.arbitration_id]=n.payload},R=function(e,t){t.payload&&(e.websocket=(0,j.Z)((0,j.Z)({},e.websocket||{}),{},{startTime:t.payload}))},X=function(e,t){t.payload&&(e.websocket=(0,j.Z)((0,j.Z)({},e.websocket||{}),{},{lastMessage:t.payload}))},V=function(e,t){t.payload&&(e.websocket=(0,j.Z)((0,j.Z)({},e.websocket||{}),{},{messageCount:t.payload}))},H=function(e,t){t.payload&&(e.websocket=(0,j.Z)((0,j.Z)({},e.websocket||{}),{},{windowedMessageCount:t.payload}))},W=(0,B.oM)({name:"can",initialState:{requests:{},data:void 0,websocket:void 0},reducers:{setCANData:L,setStartTime:R,setLastMessage:X,setMessageCount:V,setWindowedMessageCount:H,setCANWebsocketData:function(e,t){t.payload&&(L(e,{payload:t.payload.data}),R(e,{payload:t.payload.startTime}),X(e,{payload:t.payload.lastMessage}),V(e,{payload:t.payload.messageCount}),H(e,{payload:t.payload.windowedMessageCount}))}}}),U=(0,B.xC)({reducer:(0,D.Z)({},W.name,W.reducer),preloadedState:{}}),z=function(e,t){return"undefined"!=typeof window&&window.document?(0,a.v9)(e,t):e(U.getState())},F=n(2);!function(e){e.GREATER_THAN="gt",e.GREATER_THAN_OR_EQUAL="gte",e.EQUALS="eq",e.LESS_THAN_OR_EQUAL="lte",e.LESS_THAN="lt"}(o||(o={}));var Q=function(){function e(t){var n=this;(0,x.Z)(this,e),this.template=void 0,this.buildPath=function(t){if(null==t)return n.template;var o=n.template;return Object.entries(t).forEach((function(t){var n=(0,h.Z)(t,2),r=n[0],a=n[1],i=e.buildParamValue(a);null!=i&&(o=o.replace(":".concat(r),i))})),o.endsWith("/")&&(o=o.slice(0,-1)),o},this.template=t}return(0,T.Z)(e,[{key:"build",value:function(t,n){var o=e.buildParams(n||t),r="";return Array.from(o).length&&(r="?".concat(o)),"".concat(this.buildPath(t)).concat(r.replace(/%3A/g,":"))}}]),e}();Q.serialiseValue=function(e){var t;return e instanceof Date&&(e=e.toISOString()),null===(t=e)||void 0===t?void 0:t.toString()},Q.buildParamValue=function(e){if(null!=e)return function(e){return"object"===(0,F.Z)(e)&&!(e instanceof Date)}(e)?"".concat(e.operator,":").concat(Q.serialiseValue(e.value)):Q.serialiseValue(e)},Q.buildArrayParamValue=function(e){if(null!=e)return e.map(Q.buildParamValue)},Q.addParam=function(e,t,n){if(null==n)return e;if(function(e){return Array.isArray(e)}(n)){var o=Q.buildArrayParamValue(n);null==o||o.forEach((function(n){null!=n&&e.append(t,n)}))}else{var r=Q.buildParamValue(n);r&&e.append(t,r)}return e},Q.buildParams=function(e){var t=new URLSearchParams;return null==e||Object.entries(e).forEach((function(e){var n=(0,h.Z)(e,2),o=n[0],r=n[1];Q.addParam(t,o,r)})),t};var q=new Q("/v0/can/ws"),G=(0,T.Z)((function e(t){var n=this;(0,x.Z)(this,e),this.dispatch=void 0,this.socket=void 0,this.startTime=void 0,this.lastMessage=void 0,this.messageCount=void 0,this.windowedMessages=void 0,this.onOpen=void 0,this.onMessage=void 0,this.onError=void 0,this.onClose=void 0,this.buffer=void 0,this.bufferClearInterval=void 0,this.connect=function(){n.socket=new WebSocket("ws://".concat(location.hostname,":9000").concat(q.build())),n.socket.onopen=function(e){var t,o=new Date;n.startTime=o,n.lastMessage=o,n.messageCount=0,n.windowedMessages=[],null===(t=n.onOpen)||void 0===t||t.call(n,e,n.socket)},n.socket.onerror=function(e){var t;return null===(t=n.onError)||void 0===t?void 0:t.call(n,e,n.socket)},n.socket.onclose=function(e){var t;return null===(t=n.onClose)||void 0===t?void 0:t.call(n,e,n.socket)},n.socket.onmessage=function(e){var t,o,r=new Date;n.messageCount=(n.messageCount||0)+1,n.lastMessage=r;var a,i=JSON.parse(e.data),s=0,l=(0,A.Z)(n.windowedMessages||[]);try{for(l.s();!(a=l.n()).done;){var d=a.value;if(+new Date-+new Date(d.timestamp)<1e3)break;s+=1}}catch(e){l.e(e)}finally{l.f()}n.windowedMessages=[].concat((0,S.Z)((null===(t=n.windowedMessages)||void 0===t?void 0:t.slice(s))||[]),[i]),n.buffer.push(i),null===(o=n.onMessage)||void 0===o||o.call(n,e,i,n.socket)},n.bufferClearInterval=setInterval(n.clearBuffer,100)},this.clearBuffer=function(){n.dispatch(W.actions.setCANWebsocketData({data:n.buffer,startTime:n.startTime.toISOString(),lastMessage:n.lastMessage.toISOString(),messageCount:n.messageCount,windowedMessageCount:n.windowedMessages.length}))},this.disconnect=function(){n.socket&&(n.socket.close(),n.socket=void 0),clearInterval(n.bufferClearInterval)},this.startTime=new Date,this.lastMessage=new Date,this.messageCount=0,this.windowedMessages=[],this.dispatch=t.dispatch,this.onOpen=t.onOpen,this.onMessage=t.onMessage,this.onError=t.onError,this.onClose=t.onClose,this.buffer=[]})),J=function(){var e,t;!function(e){var t=(0,a.I0)(),n=(0,r.useRef)();(0,r.useEffect)((function(){return n.current=new G({dispatch:t,onOpen:e.onOpen,onMessage:e.onMessage,onError:e.onError,onClose:e.onClose}),n.current.connect(),function(){var e;return null===(e=n.current)||void 0===e?void 0:e.disconnect()}}),[t,e.onOpen,e.onMessage,e.onError,e.onClose])}({});var n=z((function(e){return e.can.data})),o=z((function(e){return e.can.websocket}));return(0,d.BX)("div",{children:[(0,d.BX)("div",{children:["Start Time: ",(null==o?void 0:o.startTime)||"-"]}),(0,d.BX)("div",{children:["Last Message: ",(null==o?void 0:o.lastMessage)||"-"]}),(0,d.BX)("div",{children:["Message Count: ",(null==o?void 0:o.messageCount)||0]}),(0,d.BX)("div",{children:["Rate:"," ",(null==o||null===(e=o.windowedMessageCount)||void 0===e?void 0:e.toLocaleString(void 0,{maximumFractionDigits:0}))||0,"/s"]}),(0,d.BX)("table",{children:[(0,d.tZ)("thead",{children:(0,d.BX)("tr",{children:[(0,d.tZ)("th",{children:"Arbitation Id"}),(0,d.tZ)("th",{children:"Timestamp"}),(0,d.tZ)("th",{children:"Data"})]})}),(0,d.tZ)("tbody",{style:{fontFamily:"monospace"},children:null===(t=Object.values(n||{"-":{arbitration_id:"--------",timestamp:"------------------",data:"----------------------------------------------------------------"}}))||void 0===t?void 0:t.sort((function(e,t){return e.arbitration_id<t.arbitration_id?-1:e.arbitration_id>t.arbitration_id?1:0})).map((function(e){return(0,d.BX)("tr",{children:[(0,d.tZ)("td",{children:e.arbitration_id}),(0,d.tZ)("td",{children:e.timestamp}),(0,d.tZ)("td",{children:e.data})]},e.arbitration_id)}))})]})]})},K=function(){return(0,d.tZ)(N,{children:(0,d.BX)(m.Z5,{children:[(0,d.tZ)(m.AW,{path:"/",element:(0,d.tZ)(J,{})}),(0,d.tZ)(m.AW,{path:"*",element:(0,d.tZ)(m.Fg,{to:"/",replace:!0})})]})})},Y=function(e){var t=e.location;return t?(0,d.tZ)(f.gx,{location:t,children:(0,d.tZ)(K,{})}):(0,d.tZ)(u.BrowserRouter,{children:(0,d.tZ)(K,{})})},$=(0,i.vJ)(["body{margin:0;padding:0;background-color:",";color:",";font-family:'Roboto',sans-serif;overflow:hidden;*{box-sizing:border-box;}a{color:inherit;text-decoration:none;padding-bottom:0.125rem;border-bottom:1px dashed ","}button{font-family:'Roboto',sans-serif;cursor:pointer;appearance:none;border:none;background:none;padding:0;margin:0;&:disabled{cursor:auto;}input{font-family:'Roboto',sans-serif;}}}"],(function(e){return e.theme.colours.background}),(function(e){return e.theme.colours.foreground}),(function(e){return e.theme.colours.foreground})),ee={colours:{black:"#000",white:"#fff",red:"#f00"},dimensions:{sidebar:{width:"16rem"}}};ee.colours.foreground=ee.colours.white,ee.colours.background=ee.colours.black,ee.colours.border={light:(0,s.DZ)(.9,ee.colours.foreground)},ee.colours.placeholder={light:(0,s.DZ)(.9,ee.colours.foreground)};var te=[[48,64],[160,320]],ne=[40,70];ee.colours.chartLines=function(e,t){for(var n=(ne[1]-ne[0])/2,o=Math.ceil(8),r=te.reduce((function(e,t){return e+t[1]-t[0]}),0)/o,a=[],i=0;i<3;i+=1)for(var s=0;s<o;s+=1){var l,d=te[0][0],c=s*r,u=(0,A.Z)(te);try{for(u.s();!(l=u.n()).done;){var m=l.value;if((d=m[0]+c)<m[1])break;c=d-m[1]}}catch(e){u.e(e)}finally{u.f()}a.push("hsl(\n          ".concat(d+r*i/3,"deg, \n          100%, \n          ").concat(ne[0]+i*n,"%\n        )").replace(/\s/g,""))}return a}(),r.default.hydrate((0,d.tZ)((function(e){return(0,d.tZ)(a.zt,{store:U,children:(0,d.BX)(i.f6,{theme:ee,children:[(0,d.tZ)($,{}),(0,d.tZ)(Y,{location:e.location}),(0,d.tZ)(c,{})]})})}),{}),document.getElementById("root"))}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var a=n[e]={exports:{}};return t[e](a,a.exports,o),a.exports}o.m=t,e=[],o.O=(t,n,r,a)=>{if(!n){var i=1/0;for(c=0;c<e.length;c++){for(var[n,r,a]=e[c],s=!0,l=0;l<n.length;l++)(!1&a||i>=a)&&Object.keys(o.O).every((e=>o.O[e](n[l])))?n.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(c--,1);var d=r();void 0!==d&&(t=d)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,r,a]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,a,[i,s,l]=n,d=0;if(i.some((t=>0!==e[t]))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(l)var c=l(o)}for(t&&t(n);d<i.length;d++)a=i[d],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(c)},n=self.webpackChunkui=self.webpackChunkui||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[216],(()=>o(583)));r=o.O(r)})();