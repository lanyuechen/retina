var ge=Object.defineProperty,Se=Object.defineProperties;var ye=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var re=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable;var W=(i,e,r)=>e in i?ge(i,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[e]=r,p=(i,e)=>{for(var r in e||(e={}))re.call(e,r)&&W(i,r,e[r]);if(P)for(var r of P(e))ne.call(e,r)&&W(i,r,e[r]);return i},S=(i,e)=>Se(i,ye(e));var I=(i,e)=>{var r={};for(var n in i)re.call(i,n)&&e.indexOf(n)<0&&(r[n]=i[n]);if(i!=null&&P)for(var n of P(i))e.indexOf(n)<0&&ne.call(i,n)&&(r[n]=i[n]);return r};var f=(i,e,r)=>(W(i,typeof e!="symbol"?e+"":e,r),r);import{j as t,O as Ce,r as m,a as o,F as G,R as z,P as we,M as j,b as y,L as C,c as g,T as ke,I as x,A as Q,C as Ee,u as _e,d as Ae,e as xe,D as De,f as be,g as Ie,h as ae,i as Fe,B as F,k as Be,S as B,l as Re,m as Te,n as ie,o as oe,p as Me,q as Ne,s as se,t as ce,G as w,v as $e,w as X,x as de,y as Le,z as Ve,E as Y,H as Oe,J as Pe,K as ze,N as je,Q as le,U as qe,V as Je,W as He,X as Ue,Y as R}from"./vendor.ab52343d.js";const Ke=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}};Ke();const We=()=>t(Ce,{}),Ge="_aspectCard_5a288_1";var Qe={aspectCard:Ge},ue=i=>{const{children:e,width:r}=i;return t("div",{className:Qe.aspectCard,style:{width:r},children:t("div",{children:e})})},Xe=i=>{const a=i,{src:e}=a,r=I(a,["src"]),n=m.exports.useRef(null);return m.exports.useEffect(()=>{n.current&&(n.current.srcObject=e)},[e]),t("video",p({ref:n,autoPlay:!0,playsInline:!0},r))},Ye=i=>{const a=i,{src:e}=a,r=I(a,["src"]),n=m.exports.useRef(null);return m.exports.useEffect(()=>{n.current&&(n.current.srcObject=e)},[e]),t("audio",p({ref:n,autoPlay:!0},r))};const Ze="_icon_9rcfs_1";var et={icon:Ze},c=i=>{const{type:e,className:r="",rotate:n,danger:a}=i;return t("span",{className:`${et.icon} ${r}`,children:t("svg",{"aria-hidden":"true",style:{transform:`rotate(${n}deg)`,color:a?"#ef5350":void 0},children:t("use",{xlinkHref:`#icon-${e}`})})})};const T=({active:i})=>i?t(c,{type:"mic"}):t(c,{type:"mic-off",danger:!0}),q=({active:i})=>i?t(c,{type:"camera"}):t(c,{type:"camera-off",danger:!0}),tt=({active:i})=>i?t(c,{type:"pin"}):t(c,{type:"pin"});var J=i=>{const{overlay:e,children:r}=i,[n,a]=m.exports.useState(null),s=l=>{a(l.currentTarget)},d=()=>{a(null)},u=!!n;return o(G,{children:[z.Children.map(r,l=>z.cloneElement(l,S(p({},l.props),{onClick:s}))),t(we,{open:u,anchorEl:n,onClose:d,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:e})]})},rt=i=>{const{peer:e}=i;return o(j,{children:[o(y,{children:[t(C,{children:t(q,{active:!e.video})}),t(g,{children:e.video?"\u5173\u95ED\u89C6\u9891":"\u5F00\u542F\u89C6\u9891"})]},"toggle-video"),o(y,{children:[t(C,{children:t(tt,{active:!e.pinned})}),t(g,{children:e.pinned?"\u53D6\u6D88\u56FA\u5B9A":"\u56FA\u5B9A\u89C6\u9891"})]},"toggle-pin"),o(y,{children:[t(C,{children:t(c,{type:"user"})}),t(g,{children:"\u8BBE\u4E3A\u4E3B\u6301\u4EBA"})]},"set-host"),o(y,{children:[t(C,{children:t(c,{type:"user"})}),t(g,{children:"\u8BBE\u4E3A\u8054\u5E2D\u4E3B\u6301\u4EBA"})]},"set-uion-host"),o(y,{children:[t(C,{children:t(c,{type:"user-delete",danger:!0})}),t(g,{children:"\u4ECE\u4F1A\u8BAE\u4E2D\u79FB\u9664"})]},"remove")]})};const nt="_tool_uf95f_1";var at={tool:nt},it=i=>{const{peer:e,className:r,onAction:n=()=>{}}=i;return o("div",{className:`${at.tool} ${r||""}`,children:[t(ke,{title:"\u9759\u97F3",children:t(x,{size:"small",onClick:()=>n("toggle-audio"),children:t(T,{active:e.audio})})}),t(J,{overlay:t(rt,{peer:e,onClick:({key:a})=>n(a)}),children:t(x,{size:"small",children:t(c,{type:"more",rotate:90})})})]})};const ot="_videoCard_14702_1",st="_video_14702_1",ct="_icon_14702_12",dt="_tag_14702_22";var M={videoCard:ot,video:st,icon:ct,tag:dt},N=i=>{var a;const{peer:e,showTag:r=!0,showTool:n=!0}=i;return t(ue,{children:o("div",{className:M.videoCard,children:[t(Xe,{className:M.video,src:e.videoStream}),t(Ye,{src:e.audioStream}),!e.videoStream&&t("div",{className:M.icon,children:t(Q,{children:(a=e.nickname)==null?void 0:a[0]})}),r&&t(Ee,{size:"small",className:M.tag,icon:t(T,{active:Boolean(e.audioStream)}),label:`${e.nickname}${e.isMe?"(\u6211)":""}`}),n&&t(it,{className:M.tool,peer:e})]})})},lt=()=>o("div",{style:{width:200},children:["hello world",t(ue,{width:"100px",children:t("div",{style:{width:"100%",height:"100%",border:"1px solid #000",boxSizing:"border-box"},children:"test"})}),t(N,{peer:{nickname:"test"}})]});class Z{constructor(){f(this,"videoStream",null);f(this,"shareStream",null);f(this,"audioStream",null);f(this,"isVideoOn",!1)}async init(e){if(e.video||e.audio){const r=await navigator.mediaDevices.getUserMedia(e),n=r.getVideoTracks();n.length&&(this.videoStream=new MediaStream(n));const a=r.getAudioTracks();a.length&&(this.audioStream=new MediaStream(a))}}async toggleRemoteVideoStream(e,r){return this.videoStream?this.endRemoteVideoStream(e):this.startRemoteVideoStream(e,r)}async startRemoteVideoStream(e,r){const n=await this.startVideoStream(r);return n.getTracks().forEach(a=>{e.forEach(s=>{s.addTrack(a)})}),n}async endRemoteVideoStream(e){return e.forEach(r=>{r.getSenders().forEach(n=>{var a;((a=n.track)==null?void 0:a.kind)==="video"&&r.removeTrack(n)})}),this.endVideoStream()}async toggleVideoStream(e){return this.videoStream?this.endVideoStream():this.startVideoStream(e)}async startVideoStream(e){return this.videoStream||(this.videoStream=await navigator.mediaDevices.getUserMedia({video:e||!0})),this.videoStream}async endVideoStream(){return this.videoStream&&(this.videoStream.getTracks().forEach(e=>e.stop()),this.videoStream=null),null}async toggleRemoteShareStream(e,r){return this.shareStream?(this.isVideoOn&&await this.startRemoteVideoStream(e,r),this.endRemoteShareStream(e)):(this.isVideoOn=!!this.videoStream,this.isVideoOn&&await this.endRemoteVideoStream(e),this.startRemoteShareStream(e,r))}async startRemoteShareStream(e,r){const n=await this.startShareStream(r);return n.getTracks().forEach(a=>{e.forEach(s=>{s.addTrack(a)})}),n}async endRemoteShareStream(e){return e.forEach(r=>{r.getSenders().forEach(n=>{var a;((a=n.track)==null?void 0:a.kind)==="video"&&r.removeTrack(n)})}),this.endShareStream()}async startShareStream(e){return this.shareStream||(this.shareStream=await navigator.mediaDevices.getDisplayMedia({video:e})),this.shareStream}async endShareStream(){return this.shareStream&&(this.shareStream.getTracks().forEach(e=>e.stop()),this.shareStream=null),null}async toggleRemoteAudioStream(e){return this.audioStream?this.endRemoteAudioStream(e):this.startRemoteAudioStream(e)}async startRemoteAudioStream(e){const r=await this.startAudioStream();return r.getTracks().forEach(n=>{e.forEach(a=>{a.addTrack(n)})}),r}async endRemoteAudioStream(e){return e.forEach(r=>{r.getSenders().forEach(n=>{var a;((a=n.track)==null?void 0:a.kind)==="audio"&&r.removeTrack(n)})}),this.endAudioStream()}async toggleAudioStream(e){return this.audioStream?this.endAudioStream():this.startAudioStream(e)}async startAudioStream(e){return this.audioStream||(this.audioStream=await navigator.mediaDevices.getUserMedia({audio:e||!0})),this.audioStream}async endAudioStream(){return this.audioStream&&(this.audioStream.getTracks().forEach(e=>e.stop()),this.audioStream=null),null}addTrack(e){e.kind==="video"?(this.videoStream||(this.videoStream=new MediaStream),this.videoStream.addTrack(e)):e.kind==="audio"&&(this.audioStream||(this.audioStream=new MediaStream),this.audioStream.addTrack(e))}addRemoteTrack(e){this.videoStream&&this.videoStream.getTracks().forEach(r=>{e.addTrack(r)}),this.audioStream&&this.audioStream.getTracks().forEach(r=>{e.addTrack(r)})}destroy(){this.endVideoStream(),this.endAudioStream()}}var ut=m.exports.forwardRef((i,e)=>{const{children:r,defaultValues:n,rules:a}=i,{control:s,handleSubmit:d,getValues:u,setValue:l}=_e({defaultValues:n});return m.exports.useImperativeHandle(e,()=>({submit:v=>d(v)(),getValues:u,setValue:l}),[]),z.Children.map(r,v=>t(Ae,{name:v.props.name,control:s,rules:a[v.props.name],render:({field:_,fieldState:h})=>{var A,V;return z.cloneElement(v,S(p(p({},v.props),_),{required:!!((A=a[v.props.name])==null?void 0:A.required),error:h.invalid,helperText:h.invalid?(V=h.error)==null?void 0:V.message:void 0}))}}))}),ht=i=>{const{visible:e,onCancel:r}=i,[n,a]=m.exports.useState({nickname:"\u6211",isMe:!0,videoStream:null,audioStream:null}),s=m.exports.useRef(),d=xe(),u=m.exports.useMemo(()=>new Z,[]);m.exports.useEffect(()=>(u.init({audio:!1,video:!0}).then(()=>{a(S(p({},n),{videoStream:u.videoStream}))}),()=>{u.destroy()}),[]);const l=async()=>{var h;(h=s.current)==null||h.submit(A=>{d({pathname:`/room/${A.roomId}`,search:`?${Be({u:A.username,a:n.audioStream?"on":"off",v:n.videoStream?"on":"off"})}`})})},v=async()=>{const h=await u.toggleAudioStream();a(S(p({},n),{audioStream:h}))},_=async()=>{const h=await u.toggleVideoStream();a(S(p({},n),{videoStream:h}))};return o(De,{open:e,onClose:r,children:[t(be,{children:"\u52A0\u5165\u4F1A\u8BAE"}),o(Ie,{children:[o(ut,{ref:s,defaultValues:{roomId:"",username:""},rules:{roomId:{required:"\u623F\u95F4ID\u4E0D\u80FD\u4E3A\u7A7A"}},children:[t(ae,{name:"roomId",label:"\u623F\u95F4ID",variant:"standard",autoFocus:!0,fullWidth:!0}),t(ae,{name:"username",label:"\u7528\u6237\u540D",margin:"normal",variant:"standard",fullWidth:!0})]}),n&&t(N,{peer:n,showTag:!1,showTool:!1})]}),o(Fe,{children:[o("div",{style:{position:"absolute",left:8},children:[t(x,{onClick:v,children:t(T,{active:Boolean(n.audioStream)})}),t(x,{onClick:_,children:t(q,{active:Boolean(n.videoStream)})})]}),t(F,{onClick:r,children:"\u53D6\u6D88"}),t(F,{onClick:l,children:"\u786E\u5B9A"})]})]})};const mt="_container_yzcmt_1",pt="_button_yzcmt_9",ft="_icon_yzcmt_12",vt="_title_yzcmt_29";var H={container:mt,button:pt,icon:ft,title:vt};const he=i=>{const a=i,{children:e,icon:r}=a,n=I(a,["children","icon"]);return o("div",S(p({className:H.button},n),{children:[t("div",{className:H.icon,children:r}),t("div",{className:H.title,children:e})]}))};var gt=()=>{const[i,e]=m.exports.useState(!1);return o("div",{className:H.container,children:[o(B,{direction:"row",spacing:4,children:[t(he,{icon:t(c,{type:"camera"}),onClick:()=>e(!0),children:"\u65B0\u4F1A\u8BAE"}),t(he,{icon:t(c,{type:"plus-square"}),onClick:()=>e(!0),children:"\u52A0\u5165\u4F1A\u8BAE"})]}),i&&t(ht,{visible:i,onCancel:()=>e(!1)})]})};const St="_chat_1l4m1_1",yt="_message_1l4m1_7",Ct="_input_1l4m1_31",wt="_prefix_1l4m1_31",kt="_suffix_1l4m1_32";var $={chat:St,message:yt,input:Ct,prefix:wt,suffix:kt},Et=()=>{const[i,e]=m.exports.useState([]),r=n=>{n.keyCode===13&&(e([...i,{id:Math.random()+"",content:n.target.value,user:{peerName:"L"}}]),n.target.value="")};return o("div",{className:$.chat,children:[t("ul",{className:$.message,children:i.map(n=>o("li",{children:[t(Q,{children:n.user.peerName&&n.user.peerName[0].toUpperCase()}),n.content]},n.id))}),o("div",{className:$.input,children:[t("input",{type:"text",placeholder:"\u8BF4\u4E9B\u4EC0\u4E48",onKeyUp:r}),t("span",{className:$.prefix,children:t(c,{type:"right"})}),t("span",{className:$.suffix,children:t(c,{type:"like"})})]})]})};function _t(){return[...new URLSearchParams(Re().search).entries()].reduce((e,r)=>S(p({},e),{[r[0]]:r[1]}),{})}function E(i,...e){const r=(window.performance.now()/1e3).toFixed(3);console.log(`%c ${r} %c ${i} %c`,"background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff","background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff","background:transparent",...e)}function At(){}function me(i,e){return[i,e].sort().join("-")}class pe{constructor({socket:e,localStream:r,peerInfo:n,onChange:a}){f(this,"peerInfo");f(this,"socket");f(this,"peerConnection");f(this,"dataChannel");f(this,"remoteStream");f(this,"onChange");this.socket=e,this.peerInfo=n,this.onChange=a||At;const s=void 0;this.peerConnection=new RTCPeerConnection(s),this.peerConnection.addEventListener("icecandidate",this.handleIceCandidate.bind(this)),this.peerConnection.addEventListener("iceconnectionstatechange",this.handleConnectionChange.bind(this)),this.peerConnection.addEventListener("track",this.handleRemoteTrack.bind(this)),this.dataChannel=this.peerConnection.createDataChannel("datachannel",{negotiated:!0,id:0}),this.dataChannel.addEventListener("open",this.handleDataChannelChange.bind(this)),this.dataChannel.addEventListener("close",this.handleDataChannelChange.bind(this)),this.dataChannel.addEventListener("message",this.handleDataChannelMessage.bind(this)),this.socket.on("message",this.handleMessage.bind(this)),this.remoteStream=new Z,r.addRemoteTrack(this.peerConnection)}handleIceCandidate(e){e.candidate&&this.sendMessage({type:"candidate",id:this.peerInfo.id,candidate:{type:"candidate",sdpMLineIndex:e.candidate.sdpMLineIndex,candidate:e.candidate.candidate}})}handleConnectionChange(e){const r=e.target;E(`ICE state: ${r.iceConnectionState}.`)}handleRemoteTrack(e){E("remote track",e),this.remoteStream.endVideoStream(),this.remoteStream.endAudioStream(),e.streams&&e.streams[0]?e.streams[0].getTracks().forEach(r=>{this.remoteStream.addTrack(r)}):this.remoteStream.addTrack(e.track),this.onChange()}handleDataChannelChange(){E(`dataChannel state: ${this.dataChannel.readyState}`)}handleDataChannelMessage(e){const r=JSON.parse(e.data);E("Receive message by data channel",r),r.type==="datachannel"?this.dataChannel=r.channel:r.type==="state"&&(Object.assign(this,r.state),this.onChange())}handleMessage(e){this.peerInfo.id===e.id&&(E("\u6536\u5230\u6D88\u606F",e),e.type==="offer"?(this.setRemoteDescription(new RTCSessionDescription(e.description)),this.createAnswer()):e.type==="answer"?this.setRemoteDescription(new RTCSessionDescription(e.description)):e.type==="candidate"&&this.addIceCandidate(new RTCIceCandidate(e.candidate)))}sendMessage(e){var r;(r=this.socket)==null||r.emit("message",e)}sendMessageByDataChannel(e){this.dataChannel.send(JSON.stringify(e))}addIceCandidate(e){this.peerConnection.addIceCandidate(e)}async createOffer(){E("\u53D1\u9001offser");const e=await this.peerConnection.createOffer();await this.peerConnection.setLocalDescription(e),this.sendMessage({type:e.type,id:this.peerInfo.id,description:e})}async createAnswer(){E("\u53D1\u9001answer");const e=await this.peerConnection.createAnswer();await this.peerConnection.setLocalDescription(e),this.sendMessage({type:e.type,id:this.peerInfo.id,description:e})}setRemoteDescription(e){E("setRemoteDescription",e),this.peerConnection.setRemoteDescription(e)}destroy(){this.peerConnection.close()}}const U="__ROOM__";class ee{constructor(e){f(this,"roomId");f(this,"peers");f(this,"me",null);f(this,"localStream");f(this,"socket");this.roomId=e,this.peers=[],this.localStream=new Z}static getInstance(e){return window[U]||(window[U]=new ee(e)),window[U]}async toggleVideo(){await this.localStream.toggleRemoteVideoStream(this.peers.map(e=>e.peerConnection)),this.peers.forEach(e=>e.createOffer()),this.emit("change",this.peers)}async toggleAudio(){await this.localStream.toggleRemoteAudioStream(this.peers.map(e=>e.peerConnection)),this.peers.forEach(e=>e.createOffer()),this.emit("change",this.peers)}async toggleShare(){await this.localStream.toggleRemoteShareStream(this.peers.map(e=>e.peerConnection)),this.peers.forEach(e=>e.createOffer())}async join(e,r){var n;this.connect(),await this.localStream.init(r),(n=this.socket)==null||n.emit("joinRoom",this.roomId,e)}connect(){this.socket=Te(localStorage.serverAddr),this.socket.on("joined-room",this.handleJoinedRoom.bind(this)),this.socket.on("peer-join-room",this.handlePeerJoinRoom.bind(this)),this.socket.on("peer-leave-room",this.handlePeerLeaveRoom.bind(this))}async handleJoinedRoom({peer:e,peers:r,roomId:n}){E(`${e.nickname}\uFF08\u672C\u4EBA\uFF09\u52A0\u5165\u623F\u95F4\u201C${n}\u201D`),this.me=e,this.peers=r.map(a=>new pe({socket:this.socket,localStream:this.localStream,peerInfo:S(p({},a),{id:me(a.clientId,e.clientId)}),onChange:()=>this.emit("change",this.peers)})),this.emit("change",this.peers)}handlePeerJoinRoom({peer:e,roomId:r}){E(`${e.nickname} \u52A0\u5165\u623F\u95F4\u201C${r}\u201D`);const n=new pe({socket:this.socket,localStream:this.localStream,peerInfo:S(p({},e),{id:me(this.me.clientId,e.clientId)}),onChange:()=>this.emit("change",this.peers)});n.createOffer(),this.peers=[...this.peers,n],this.emit("change",this.peers)}handlePeerLeaveRoom(e){const r=this.peers.find(n=>n.peerInfo.clientId===e);r==null||r.destroy(),this.peers=this.peers.filter(n=>n.peerInfo.clientId!==e),this.emit("change",this.peers)}hangup(){var e;E("\u6302\u65AD"),(e=this.socket)==null||e.disconnect()}on(e,r){addEventListener(`custom_${e}`,n=>{r(...n.detail)})}emit(e,...r){const n=new CustomEvent(`custom_${e}`,{detail:r});dispatchEvent(n)}async getDevices(e){const r=await navigator.mediaDevices.enumerateDevices();return e?r.filter(n=>n.deviceId&&n.kind===e):r}destroy(){this.localStream.destroy(),this.hangup(),window[U]=null}}var xt=()=>{const{id:i}=ie();return m.exports.useMemo(()=>ee.getInstance(i),[])},Dt=()=>{const[i,e]=m.exports.useState("00:00"),r=m.exports.useRef({start:Date.now(),end:Date.now(),stop:!1});m.exports.useEffect(()=>(n(),()=>{r.current.stop=!0}),[]);const n=()=>{if(r.current.stop)return;requestAnimationFrame(()=>{n()});const a=[];if(Date.now()-r.current.end<1e3)return;r.current.end=Date.now();let s=Math.floor((r.current.end-r.current.start)/1e3);if(s>=3600){const d=Math.floor(s/3600);a.push(d>9?d:`0${d}`),s=s%3600}if(s>=60){const d=Math.floor(s/60);a.push(d>9?d:`0${d}`),s=s%60}else a.push("00");a.push(s>9?s:`0${s}`),e(a.join(":"))};return t("span",{children:i})};const K=(i="info")=>e=>{const r=document.createElement("div");document.body.appendChild(r);const n=()=>{var s,d;(d=(s=r.parentNode)==null?void 0:s.removeChild)==null||d.call(s,r)},a=t(Me,{open:!0,autoHideDuration:2e3,onClose:n,children:t(Ne,{onClose:n,severity:i,variant:"filled",sx:{width:"100%"},children:e})});return oe.render(a,r),{close:n}};var bt={success:K("success"),error:K("error"),warning:K("warning"),info:K("info")};const It="_container_qyco3_1",Ft="_layoutCard_qyco3_4",Bt="_icon_qyco3_8",Rt="_active_qyco3_24",Tt="_dropdown_qyco3_27";var b={container:It,layoutCard:Ft,icon:Bt,active:Rt,dropdown:Tt};const fe=[{name:"gallery",title:"\u5BAB\u683C\u89C6\u56FE",icon:"layout-grid"},{name:"speaker",title:"\u6F14\u8BB2\u8005\u89C6\u56FE",icon:"layout-speaker"}];var Mt=i=>{var d;const{layout:e,onLayoutChange:r}=i,{id:n}=ie();var a=o(se,{sx:{width:320},children:[o(ce,{children:[t(de,{gutterBottom:!0,variant:"h6",children:"nickname"}),o(w,{container:!0,rowSpacing:1,children:[t(w,{item:!0,xs:3,children:"\u4F1A\u8BAEID"}),t(w,{item:!0,xs:9,children:n}),t(w,{item:!0,xs:3,children:"\u4F1A\u8BAE\u94FE\u63A5"}),t(w,{item:!0,xs:9,children:"http://localhost:3000/conf"}),t(w,{item:!0,xs:3,children:"\u7535\u8BDD\u62E8\u5165"}),o(w,{item:!0,xs:9,children:["+86 10 8888 8888(\u4E2D\u56FD\u5927\u9646) ",t("br",{}),t("a",{children:"\u66F4\u591A\u7535\u8BDD\u53F7\u7801"})]})]})]}),o(Le,{children:[t(Ve.CopyToClipboard,{text:`\u4F1A\u8BAEID: ${n}
\u4F1A\u8BAE\u94FE\u63A5: http://localhost:3000/conf
\u7535\u8BDD\u62E8\u5165: +86 10 8888 8888(\u4E2D\u56FD\u5927\u9646)`,onCopy:()=>bt.success("\u590D\u5236\u6210\u529F"),children:t(F,{size:"small",children:"\u590D\u5236\u5165\u4F1A\u4FE1\u606F"})}),t(F,{size:"small",children:"\u5206\u4EAB\u81F3\u4F1A\u8BDD"})]})]}),s=t(se,{children:t(ce,{children:t(B,{direction:"row",spacing:2,children:fe.map(u=>o("div",{onClick:()=>r(u.name),className:`${b.layoutCard} ${e===u.name?b.active:""}`,children:[t("div",{className:b.icon,"data-type":u.name,children:t(c,{type:u.icon})}),u.title]},u.name))})})});return o(w,{container:!0,className:b.container,children:[t(w,{item:!0,xs:8,children:o($e,{sx:{display:"flex",alignItems:"center",width:"fit-content","& hr":{mx:.5}},children:[t(J,{overlay:a,children:o("span",{className:b.dropdown,children:["ID: ",n," ",t(c,{type:"down"})]})}),t(X,{orientation:"vertical",variant:"middle",flexItem:!0}),t(Dt,{})]})}),t(w,{item:!0,xs:4,children:t(J,{overlay:s,children:o("span",{className:b.dropdown,style:{float:"right"},children:[t(c,{type:"appstore"}),"\xA0",(d=fe.find(u=>u.name===e))==null?void 0:d.title," ",t(c,{type:"down"})]})})})]})},Nt=i=>{const{peers:e}=i,r=Math.ceil(Math.sqrt(e.length));return t(B,{justifyContent:"center",sx:{height:"100%"},children:t(w,{container:!0,alignItems:"center",spacing:2,children:e.map((n,a)=>t(w,{item:!0,xs:12/r,children:t(N,{peer:n})},a))})})};const $t="_main_unpzo_1",Lt="_sub_unpzo_5";var ve={main:$t,sub:Lt},Vt=i=>{const{peers:e}=i,r=e[1];return o(G,{children:[r&&t("div",{className:ve.main,children:t(N,{peer:r,cover:!0,showTool:!1})}),t("div",{className:ve.sub,children:t(N,{peer:e[0]})})]})},Ot=i=>{const n=i,{layout:e}=n,r=I(n,["layout"]);return e==="speaker"?t(Vt,p({},r)):t(Nt,p({},r))};const Pt="_dropdown_17q1w_1",zt="_extra_17q1w_4";var te={dropdown:Pt,extra:zt},D=i=>{const{dropdown:e,badge:r,children:n,onClick:a}=i;return o("span",{className:te.dropdown,children:[t(F,{variant:"text",onClick:a,style:{flexDirection:"column"},children:n}),!!r&&t("span",{className:te.extra,children:r}),e&&t(J,{overlay:e,children:t("span",{className:te.extra,children:t(c,{type:"up"})})})]})},jt=i=>{const{peers:e,devices:r,onAction:n}=i,a=e[0],s=o(j,{children:[o(y,{children:[t(C,{children:t(c,{type:"cc"})}),t(g,{children:"\u6253\u5F00\u5B57\u5E55"})]}),o(y,{children:[t(C,{children:t(c,{type:"live"})}),t(g,{children:"\u8F6C\u64AD\u753B\u9762"})]}),o(y,{children:[t(C,{children:t(c,{type:"effect"})}),t(g,{children:"\u7279\u6548"})]}),o(y,{children:[t(C,{children:t(c,{type:"setting"})}),t(g,{children:"\u8BBE\u7F6E"})]})]}),d=t(j,{children:r.filter(l=>l.kind==="videoinput").map(l=>o(y,{children:[t(C,{children:t(Y,{})}),o(g,{children:[t(c,{type:"camera"})," ",l.label]})]},l.deviceId))}),u=o(j,{children:[r.filter(l=>l.kind==="audioinput").map(l=>o(y,{children:[t(C,{children:t(Y,{})}),o(g,{children:[t(c,{type:"mic"})," ",l.label]})]},l.deviceId)),t(X,{}),r.filter(l=>l.kind==="audioinput").map(l=>o(y,{children:[t(C,{children:t(Y,{})}),o(g,{children:[t(c,{type:"mic"})," ",l.label]})]},l.deviceId))]});return o(B,{direction:"row",alignItems:"center",style:{height:"100%"},children:[o(D,{onClick:()=>n("toggle-audio"),dropdown:u,children:[t(T,{active:!a.audioStream}),t("small",{style:{fontSize:"10px"},children:"\u9EA6\u514B\u98CE"})]}),o(D,{onClick:()=>n("toggle-video"),dropdown:d,children:[t(q,{active:!a.videoStream}),t("small",{style:{fontSize:"10px"},children:"\u6444\u50CF\u5934"})]}),o(D,{onClick:()=>n("show-peers"),badge:e.length,children:[t(c,{type:"user"}),t("small",{style:{fontSize:"10px"},children:"\u53C2\u4F1A\u4EBA"})]}),o(D,{onClick:()=>n("share"),children:[t(c,{type:"share-screen",style:{color:"rgb(52, 199, 58)"}}),t("small",{style:{fontSize:"10px"},children:"\u5171\u4EAB"})]}),o(D,{onClick:()=>n("share"),children:[t(c,{type:"recording"}),t("small",{style:{fontSize:"10px"},children:"\u5F00\u59CB\u5F55\u5236"})]}),o(D,{dropdown:s,children:[t(c,{type:"more",rotate:90}),t("small",{style:{fontSize:"10px"},children:"\u66F4\u591A"})]}),o(D,{onClick:()=>n("leave"),children:[t(c,{type:"phone",danger:!0}),t("small",{style:{fontSize:"10px"},children:"\u79BB\u5F00"})]})]})},qt=()=>t("div",{children:"nothing"}),Jt=i=>{const{peer:e}=i,r=o(G,{children:[t(x,{children:t(T,{active:e.audio})}),t(x,{children:t(q,{active:e.video})})]});return t(Oe,{disablePadding:!0,secondaryAction:r,children:o(Pe,{children:[t(ze,{children:t(Q,{children:e.nickname[0]})}),t(g,{primary:`${e.nickname}${e.isMe?"(\u6211)":""}`,secondary:"\u4E3B\u6301\u4EBA"})]})})},Ht=i=>{const{peers:e}=i,[r,n]=m.exports.useState(0);return o("div",{style:{width:320},children:[o(je,{value:r,onChange:(a,s)=>n(s),variant:"fullWidth",children:[t(le,{value:0,label:`\u5168\u90E8(${e.length})`}),t(le,{value:1,label:"\u5EFA\u8BAE(0)"})]}),r===0&&t(qe,{children:e.map((a,s)=>t(Jt,{peer:a},s))}),r===1&&t(qt,{})]})};const Ut="_room_19dbp_1",Kt="_left_19dbp_4",Wt="_header_19dbp_13",Gt="_content_19dbp_16",Qt="_footer_19dbp_21",Xt="_drawer_19dbp_26";var L={room:Ut,left:Kt,header:Wt,content:Gt,footer:Qt,drawer:Xt},Yt=()=>{const{u:i,v:e,a:r}=_t(),[n,a]=m.exports.useState([]),[s,d]=m.exports.useState([]),[u,l]=m.exports.useState("gallery"),[v,_]=m.exports.useState(!1),h=xt();m.exports.useEffect(()=>(h.getDevices().then(k=>{d(k)}),h.join({nickname:i},{video:e,audio:r}),h.on("change",k=>{a([S(p({},h.me),{isMe:!0,videoStream:h.localStream.shareStream||h.localStream.videoStream,audioStream:h.localStream.audioStream}),...k.map(O=>S(p({},O.peerInfo),{videoStream:O.remoteStream.videoStream,audioStream:O.remoteStream.audioStream,pc:O}))])}),()=>{h.destroy()}),[]);const A=k=>{l(k)},V=k=>{k==="show-peers"?_(!v):k==="toggle-video"?h.toggleVideo():k==="toggle-audio"?h.toggleAudio():k==="share"?h.toggleShare():k==="leave"&&h.hangup()};return o("div",{className:L.room,children:[o("div",{className:L.left,style:{paddingRight:v?320:0},children:[t("div",{className:L.header,children:t(Mt,{layout:u,onLayoutChange:A})}),t("div",{className:L.content,children:t(Ot,{layout:u,peers:n})}),n[0]&&t("div",{className:L.footer,children:t(jt,{peers:n,devices:s,onAction:V})})]}),o(Je,{variant:"persistent",open:v,anchor:"right",ModalProps:{keepMounted:!0},hideBackdrop:!0,elevation:1,onClose:()=>_(!1),children:[o(B,{direction:"row",alignItems:"center",children:[t(x,{onClick:()=>_(!1),children:t(c,{type:"left"})}),t(de,{variant:"h6",children:"\u53C2\u4F1A\u4EBA"})]}),t(X,{}),t(Ht,{peers:n})]}),t(Et,{})]})};const Zt=()=>t("div",{style:{fontSize:"128px",textAlign:"center"},children:"404"});const er=()=>t(He,{children:t(Ue,{children:o(R,{path:"/",element:t(We,{}),children:[t(R,{index:!0,element:t(lt,{})}),t(R,{path:"/entry",element:t(gt,{})}),t(R,{path:"/room/:id",element:t(Yt,{})}),t(R,{path:"*",element:t(Zt,{})})]})})});oe.render(t(er,{}),document.getElementById("root"));
