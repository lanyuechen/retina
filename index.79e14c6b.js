var Se=Object.defineProperty,ye=Object.defineProperties;var Ce=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var ne=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var W=(i,e,n)=>e in i?Se(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n,p=(i,e)=>{for(var n in e||(e={}))ne.call(e,n)&&W(i,n,e[n]);if(P)for(var n of P(e))re.call(e,n)&&W(i,n,e[n]);return i},S=(i,e)=>ye(i,Ce(e));var B=(i,e)=>{var n={};for(var r in i)ne.call(i,r)&&e.indexOf(r)<0&&(n[r]=i[r]);if(i!=null&&P)for(var r of P(i))e.indexOf(r)<0&&re.call(i,r)&&(n[r]=i[r]);return n};var f=(i,e,n)=>(W(i,typeof e!="symbol"?e+"":e,n),n);import{j as t,O as Ae,r as m,a as o,F as G,R as q,P as we,M as j,b as y,L as C,c as g,T as _e,I as D,A as Q,C as Ee,u as ke,d as De,e as xe,D as Fe,f as be,g as Be,h as ae,i as Ie,B as I,k as Re,l as Te,m as ie,n as oe,S as Ne,o as Me,p as se,q as ce,s as z,G as A,t as $e,v as X,w as de,x as Le,y as Ve,z as Y,E as Oe,H as Pe,J as qe,K as je,N as le,Q as ze,U as Je,V as He,W as Ue,X as R}from"./vendor.6afb8127.js";const Ke=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}};Ke();const We=()=>t(Ae,{}),Ge="_aspectCard_5a288_1";var Qe={aspectCard:Ge},ue=i=>{const{children:e,width:n}=i;return t("div",{className:Qe.aspectCard,style:{width:n},children:t("div",{children:e})})},Xe=i=>{const a=i,{src:e}=a,n=B(a,["src"]),r=m.exports.useRef(null);return m.exports.useEffect(()=>{r.current&&(r.current.srcObject=e)},[e]),t("video",p({ref:r,autoPlay:!0,playsInline:!0},n))},Ye=i=>{const a=i,{src:e}=a,n=B(a,["src"]),r=m.exports.useRef(null);return m.exports.useEffect(()=>{r.current&&(r.current.srcObject=e)},[e]),t("audio",p({ref:r,autoPlay:!0},n))};const Ze="_icon_9rcfs_1";var et={icon:Ze},c=i=>{const{type:e,className:n="",rotate:r,danger:a}=i;return t("span",{className:`${et.icon} ${n}`,children:t("svg",{"aria-hidden":"true",style:{transform:`rotate(${r}deg)`,color:a?"#ef5350":void 0},children:t("use",{xlinkHref:`#icon-${e}`})})})};const T=({active:i})=>i?t(c,{type:"mic"}):t(c,{type:"mic-off",danger:!0}),J=({active:i})=>i?t(c,{type:"camera"}):t(c,{type:"camera-off",danger:!0}),tt=({active:i})=>i?t(c,{type:"pin"}):t(c,{type:"pin"});var H=i=>{const{overlay:e,children:n}=i,[r,a]=m.exports.useState(null),s=l=>{a(l.currentTarget)},d=()=>{a(null)},u=!!r;return o(G,{children:[q.Children.map(n,l=>q.cloneElement(l,S(p({},l.props),{onClick:s}))),t(we,{open:u,anchorEl:r,onClose:d,anchorOrigin:{vertical:"bottom",horizontal:"left"},children:e})]})},nt=i=>{const{peer:e}=i;return o(j,{children:[o(y,{children:[t(C,{children:t(J,{active:!e.video})}),t(g,{children:e.video?"\u5173\u95ED\u89C6\u9891":"\u5F00\u542F\u89C6\u9891"})]},"toggle-video"),o(y,{children:[t(C,{children:t(tt,{active:!e.pinned})}),t(g,{children:e.pinned?"\u53D6\u6D88\u56FA\u5B9A":"\u56FA\u5B9A\u89C6\u9891"})]},"toggle-pin"),o(y,{children:[t(C,{children:t(c,{type:"user"})}),t(g,{children:"\u8BBE\u4E3A\u4E3B\u6301\u4EBA"})]},"set-host"),o(y,{children:[t(C,{children:t(c,{type:"user"})}),t(g,{children:"\u8BBE\u4E3A\u8054\u5E2D\u4E3B\u6301\u4EBA"})]},"set-uion-host"),o(y,{children:[t(C,{children:t(c,{type:"user-delete",danger:!0})}),t(g,{children:"\u4ECE\u4F1A\u8BAE\u4E2D\u79FB\u9664"})]},"remove")]})};const rt="_tool_uf95f_1";var at={tool:rt},it=i=>{const{peer:e,className:n,onAction:r=()=>{}}=i;return o("div",{className:`${at.tool} ${n||""}`,children:[t(_e,{title:"\u9759\u97F3",children:t(D,{size:"small",onClick:()=>r("toggle-audio"),children:t(T,{active:e.audio})})}),t(H,{overlay:t(nt,{peer:e,onClick:({key:a})=>r(a)}),children:t(D,{size:"small",children:t(c,{type:"more",rotate:90})})})]})};const ot="_videoCard_14702_1",st="_video_14702_1",ct="_icon_14702_12",dt="_tag_14702_22";var N={videoCard:ot,video:st,icon:ct,tag:dt},M=i=>{var a;const{peer:e,showTag:n=!0,showTool:r=!0}=i;return t(ue,{children:o("div",{className:N.videoCard,children:[t(Xe,{className:N.video,src:e.videoStream}),t(Ye,{src:e.audioStream}),!e.videoStream&&t("div",{className:N.icon,children:t(Q,{children:(a=e.nickname)==null?void 0:a[0]})}),n&&t(Ee,{size:"small",className:N.tag,icon:t(T,{active:Boolean(e.audioStream)}),label:`${e.nickname}${e.isMe?"(\u6211)":""}`}),r&&t(it,{className:N.tool,peer:e})]})})},lt=()=>o("div",{style:{width:200},children:["hello world",t(ue,{width:"100px",children:t("div",{style:{width:"100%",height:"100%",border:"1px solid #000",boxSizing:"border-box"},children:"test"})}),t(M,{peer:{nickname:"test"}})]});class Z{constructor(){f(this,"videoStream",null);f(this,"shareStream",null);f(this,"audioStream",null);f(this,"isVideoOn",!1)}async init(e){if(e.video||e.audio){const n=await navigator.mediaDevices.getUserMedia(e),r=n.getVideoTracks();r.length&&(this.videoStream=new MediaStream(r));const a=n.getAudioTracks();a.length&&(this.audioStream=new MediaStream(a))}}async toggleRemoteVideoStream(e,n){return this.videoStream?this.endRemoteVideoStream(e):this.startRemoteVideoStream(e,n)}async startRemoteVideoStream(e,n){const r=await this.startVideoStream(n);return r.getTracks().forEach(a=>{e.forEach(s=>{s.addTrack(a)})}),r}async endRemoteVideoStream(e){return e.forEach(n=>{n.getSenders().forEach(r=>{var a;((a=r.track)==null?void 0:a.kind)==="video"&&n.removeTrack(r)})}),this.endVideoStream()}async toggleVideoStream(e){return this.videoStream?this.endVideoStream():this.startVideoStream(e)}async startVideoStream(e){return this.videoStream||(this.videoStream=await navigator.mediaDevices.getUserMedia({video:e||!0})),this.videoStream}async endVideoStream(){return this.videoStream&&(this.videoStream.getTracks().forEach(e=>e.stop()),this.videoStream=null),null}async toggleRemoteShareStream(e,n){return this.shareStream?(this.isVideoOn&&await this.startRemoteVideoStream(e,n),this.endRemoteShareStream(e)):(this.isVideoOn=!!this.videoStream,this.isVideoOn&&await this.endRemoteVideoStream(e),this.startRemoteShareStream(e,n))}async startRemoteShareStream(e,n){const r=await this.startShareStream(n);return r.getTracks().forEach(a=>{e.forEach(s=>{s.addTrack(a)})}),r}async endRemoteShareStream(e){return e.forEach(n=>{n.getSenders().forEach(r=>{var a;((a=r.track)==null?void 0:a.kind)==="video"&&n.removeTrack(r)})}),this.endShareStream()}async startShareStream(e){return this.shareStream||(this.shareStream=await navigator.mediaDevices.getDisplayMedia({video:e})),this.shareStream}async endShareStream(){return this.shareStream&&(this.shareStream.getTracks().forEach(e=>e.stop()),this.shareStream=null),null}async toggleRemoteAudioStream(e){return this.audioStream?this.endRemoteAudioStream(e):this.startRemoteAudioStream(e)}async startRemoteAudioStream(e){const n=await this.startAudioStream();return n.getTracks().forEach(r=>{e.forEach(a=>{a.addTrack(r)})}),n}async endRemoteAudioStream(e){return e.forEach(n=>{n.getSenders().forEach(r=>{var a;((a=r.track)==null?void 0:a.kind)==="audio"&&n.removeTrack(r)})}),this.endAudioStream()}async toggleAudioStream(e){return this.audioStream?this.endAudioStream():this.startAudioStream(e)}async startAudioStream(e){return this.audioStream||(this.audioStream=await navigator.mediaDevices.getUserMedia({audio:e||!0})),this.audioStream}async endAudioStream(){return this.audioStream&&(this.audioStream.getTracks().forEach(e=>e.stop()),this.audioStream=null),null}addTrack(e){e.kind==="video"?(this.videoStream||(this.videoStream=new MediaStream),this.videoStream.addTrack(e)):e.kind==="audio"&&(this.audioStream||(this.audioStream=new MediaStream),this.audioStream.addTrack(e))}addRemoteTrack(e){this.videoStream&&this.videoStream.getTracks().forEach(n=>{e.addTrack(n)}),this.audioStream&&this.audioStream.getTracks().forEach(n=>{e.addTrack(n)})}destroy(){this.endVideoStream(),this.endAudioStream()}}var ut=m.exports.forwardRef((i,e)=>{const{children:n,defaultValues:r,rules:a}=i,{control:s,handleSubmit:d,getValues:u,setValue:l}=ke({defaultValues:r});return m.exports.useImperativeHandle(e,()=>({submit:v=>d(v)(),getValues:u,setValue:l}),[]),q.Children.map(n,v=>t(De,{name:v.props.name,control:s,rules:a[v.props.name],render:({field:E,fieldState:h})=>{var k,V;return q.cloneElement(v,S(p(p({},v.props),E),{required:!!((k=a[v.props.name])==null?void 0:k.required),error:h.invalid,helperText:h.invalid?(V=h.error)==null?void 0:V.message:void 0}))}}))}),ht=i=>{const{visible:e,onCancel:n}=i,[r,a]=m.exports.useState({nickname:"\u6211",isMe:!0,videoStream:null,audioStream:null}),s=m.exports.useRef(),d=xe(),u=m.exports.useMemo(()=>new Z,[]);m.exports.useEffect(()=>(u.init({audio:!1,video:!0}).then(()=>{a(S(p({},r),{videoStream:u.videoStream}))}),()=>{u.destroy()}),[]);const l=async()=>{var h;(h=s.current)==null||h.submit(k=>{d(`/room/${k.roomId}`,{state:{query:{u:k.username,a:r.audioStream?"on":"off",v:r.videoStream?"on":"off"}}})})},v=async()=>{const h=await u.toggleAudioStream();a(S(p({},r),{audioStream:h}))},E=async()=>{const h=await u.toggleVideoStream();a(S(p({},r),{videoStream:h}))};return o(Fe,{open:e,onClose:n,children:[t(be,{children:"\u52A0\u5165\u4F1A\u8BAE"}),o(Be,{children:[o(ut,{ref:s,defaultValues:{roomId:"",username:""},rules:{roomId:{required:"\u623F\u95F4ID\u4E0D\u80FD\u4E3A\u7A7A"}},children:[t(ae,{name:"roomId",label:"\u623F\u95F4ID",variant:"standard",autoFocus:!0,fullWidth:!0}),t(ae,{name:"username",label:"\u7528\u6237\u540D",margin:"normal",variant:"standard",fullWidth:!0})]}),r&&t(M,{peer:r,showTag:!1,showTool:!1})]}),o(Ie,{children:[o("div",{style:{position:"absolute",left:8},children:[t(D,{onClick:v,children:t(T,{active:Boolean(r.audioStream)})}),t(D,{onClick:E,children:t(J,{active:Boolean(r.videoStream)})})]}),t(I,{onClick:n,children:"\u53D6\u6D88"}),t(I,{onClick:l,children:"\u786E\u5B9A"})]})]})};const mt="_container_1scpn_1",pt="_content_1scpn_9",ft="_iconContainer_1scpn_12",vt="_info_1scpn_20",gt="_button_1scpn_30",St="_icon_1scpn_12",yt="_title_1scpn_50";var x={container:mt,content:pt,iconContainer:ft,info:vt,button:gt,icon:St,title:yt};const he=i=>{const a=i,{children:e,icon:n}=a,r=B(a,["children","icon"]);return o("div",S(p({className:x.button},r),{children:[t("div",{className:x.icon,children:n}),t("div",{className:x.title,children:e})]}))};var Ct=()=>{const[i,e]=m.exports.useState(!1);return o("div",{className:x.container,children:[o("div",{className:x.content,children:[o("div",{className:x.iconContainer,children:[t(he,{icon:t(c,{type:"camera"}),onClick:()=>e(!0),children:"\u65B0\u4F1A\u8BAE"}),t(he,{icon:t(c,{type:"plus-square"}),onClick:()=>e(!0),children:"\u52A0\u5165\u4F1A\u8BAE"})]}),o("div",{className:x.info,children:[t("h2",{children:"\u6D41\u7545\u53EF\u534F\u540C\u7684\u97F3\u89C6\u9891\u4F1A\u8BAE"}),o("ul",{children:[t("li",{children:"\u70B9\u51FB\u201C\u65B0\u4F1A\u8BAE\u201D\uFF0C\u7ACB\u5373\u53D1\u8D77\u4F1A\u8BAE"}),t("li",{children:"\u70B9\u51FB\u201C\u52A0\u5165\u4F1A\u8BAE\u201D\uFF0C\u8F93\u5165\u623F\u95F4ID\u53CA\u7528\u6237\u540D\u5FEB\u901F\u52A0\u5165\u4F1A\u8BAE"})]})]})]}),i&&t(ht,{visible:i,onCancel:()=>e(!1)})]})};const At="_chat_1l4m1_1",wt="_message_1l4m1_7",_t="_input_1l4m1_31",Et="_prefix_1l4m1_31",kt="_suffix_1l4m1_32";var $={chat:At,message:wt,input:_t,prefix:Et,suffix:kt},Dt=()=>{const[i,e]=m.exports.useState([]),n=r=>{r.keyCode===13&&(e([...i,{id:Math.random()+"",content:r.target.value,user:{peerName:"L"}}]),r.target.value="")};return o("div",{className:$.chat,children:[t("ul",{className:$.message,children:i.map(r=>o("li",{children:[t(Q,{children:r.user.peerName&&r.user.peerName[0].toUpperCase()}),r.content]},r.id))}),o("div",{className:$.input,children:[t("input",{type:"text",placeholder:"\u8BF4\u4E9B\u4EC0\u4E48",onKeyUp:n}),t("span",{className:$.prefix,children:t(c,{type:"right"})}),t("span",{className:$.suffix,children:t(c,{type:"like"})})]})]})};function xt(){return[...new URLSearchParams(Re().search).entries()].reduce((e,n)=>S(p({},e),{[n[0]]:n[1]}),{})}function _(i,...e){const n=(window.performance.now()/1e3).toFixed(3);console.log(`%c ${n} %c ${i} %c`,"background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff","background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff","background:transparent",...e)}function Ft(){}function me(i,e){return[i,e].sort().join("-")}class pe{constructor({socket:e,localStream:n,peerInfo:r,onChange:a}){f(this,"peerInfo");f(this,"socket");f(this,"peerConnection");f(this,"dataChannel");f(this,"remoteStream");f(this,"onChange");this.socket=e,this.peerInfo=r,this.onChange=a||Ft;const s=void 0;this.peerConnection=new RTCPeerConnection(s),this.peerConnection.addEventListener("icecandidate",this.handleIceCandidate.bind(this)),this.peerConnection.addEventListener("iceconnectionstatechange",this.handleConnectionChange.bind(this)),this.peerConnection.addEventListener("track",this.handleRemoteTrack.bind(this)),this.dataChannel=this.peerConnection.createDataChannel("datachannel",{negotiated:!0,id:0}),this.dataChannel.addEventListener("open",this.handleDataChannelChange.bind(this)),this.dataChannel.addEventListener("close",this.handleDataChannelChange.bind(this)),this.dataChannel.addEventListener("message",this.handleDataChannelMessage.bind(this)),this.socket.on("message",this.handleMessage.bind(this)),this.remoteStream=new Z,n.addRemoteTrack(this.peerConnection)}handleIceCandidate(e){e.candidate&&this.sendMessage({type:"candidate",id:this.peerInfo.id,candidate:{type:"candidate",sdpMLineIndex:e.candidate.sdpMLineIndex,candidate:e.candidate.candidate}})}handleConnectionChange(e){const n=e.target;_(`ICE state: ${n.iceConnectionState}.`)}handleRemoteTrack(e){_("remote track",e),this.remoteStream.endVideoStream(),this.remoteStream.endAudioStream(),e.streams&&e.streams[0]?e.streams[0].getTracks().forEach(n=>{this.remoteStream.addTrack(n)}):this.remoteStream.addTrack(e.track),this.onChange()}handleDataChannelChange(){_(`dataChannel state: ${this.dataChannel.readyState}`)}handleDataChannelMessage(e){const n=JSON.parse(e.data);_("Receive message by data channel",n),n.type==="datachannel"?this.dataChannel=n.channel:n.type==="state"&&(Object.assign(this,n.state),this.onChange())}handleMessage(e){this.peerInfo.id===e.id&&(_("\u6536\u5230\u6D88\u606F",e),e.type==="offer"?(this.setRemoteDescription(new RTCSessionDescription(e.description)),this.createAnswer()):e.type==="answer"?this.setRemoteDescription(new RTCSessionDescription(e.description)):e.type==="candidate"&&this.addIceCandidate(new RTCIceCandidate(e.candidate)))}sendMessage(e){var n;(n=this.socket)==null||n.emit("message",e)}sendMessageByDataChannel(e){this.dataChannel.send(JSON.stringify(e))}addIceCandidate(e){this.peerConnection.addIceCandidate(e)}async createOffer(){_("\u53D1\u9001offser");const e=await this.peerConnection.createOffer();await this.peerConnection.setLocalDescription(e),this.sendMessage({type:e.type,id:this.peerInfo.id,description:e})}async createAnswer(){_("\u53D1\u9001answer");const e=await this.peerConnection.createAnswer();await this.peerConnection.setLocalDescription(e),this.sendMessage({type:e.type,id:this.peerInfo.id,description:e})}setRemoteDescription(e){_("setRemoteDescription",e),this.peerConnection.setRemoteDescription(e)}destroy(){this.peerConnection.close()}}const U="__ROOM__";class ee{constructor(e){f(this,"roomId");f(this,"peers");f(this,"me",null);f(this,"localStream");f(this,"socket");this.roomId=e,this.peers=[],this.localStream=new Z}static getInstance(e){return window[U]||(window[U]=new ee(e)),window[U]}async toggleVideo(){await this.localStream.toggleRemoteVideoStream(this.peers.map(e=>e.peerConnection)),this.peers.forEach(e=>e.createOffer()),this.emit("change",this.peers)}async toggleAudio(){await this.localStream.toggleRemoteAudioStream(this.peers.map(e=>e.peerConnection)),this.peers.forEach(e=>e.createOffer()),this.emit("change",this.peers)}async toggleShare(){await this.localStream.toggleRemoteShareStream(this.peers.map(e=>e.peerConnection)),this.peers.forEach(e=>e.createOffer())}async join(e,n){var r;this.connect(),await this.localStream.init(n),(r=this.socket)==null||r.emit("joinRoom",this.roomId,e)}connect(){this.socket=Te(localStorage.serverAddr),this.socket.on("joined-room",this.handleJoinedRoom.bind(this)),this.socket.on("peer-join-room",this.handlePeerJoinRoom.bind(this)),this.socket.on("peer-leave-room",this.handlePeerLeaveRoom.bind(this))}async handleJoinedRoom({peer:e,peers:n,roomId:r}){_(`${e.nickname}\uFF08\u672C\u4EBA\uFF09\u52A0\u5165\u623F\u95F4\u201C${r}\u201D`),this.me=e,this.peers=n.map(a=>new pe({socket:this.socket,localStream:this.localStream,peerInfo:S(p({},a),{id:me(a.clientId,e.clientId)}),onChange:()=>this.emit("change",this.peers)})),this.emit("change",this.peers)}handlePeerJoinRoom({peer:e,roomId:n}){_(`${e.nickname} \u52A0\u5165\u623F\u95F4\u201C${n}\u201D`);const r=new pe({socket:this.socket,localStream:this.localStream,peerInfo:S(p({},e),{id:me(this.me.clientId,e.clientId)}),onChange:()=>this.emit("change",this.peers)});r.createOffer(),this.peers=[...this.peers,r],this.emit("change",this.peers)}handlePeerLeaveRoom(e){const n=this.peers.find(r=>r.peerInfo.clientId===e);n==null||n.destroy(),this.peers=this.peers.filter(r=>r.peerInfo.clientId!==e),this.emit("change",this.peers)}hangup(){var e;_("\u6302\u65AD"),(e=this.socket)==null||e.disconnect()}on(e,n){addEventListener(`custom_${e}`,r=>{n(...r.detail)})}emit(e,...n){const r=new CustomEvent(`custom_${e}`,{detail:n});dispatchEvent(r)}async getDevices(e){const n=await navigator.mediaDevices.enumerateDevices();return e?n.filter(r=>r.deviceId&&r.kind===e):n}destroy(){this.localStream.destroy(),this.hangup(),window[U]=null}}var bt=()=>{const{id:i}=ie();return m.exports.useMemo(()=>ee.getInstance(i),[])},Bt=()=>{const[i,e]=m.exports.useState("00:00"),n=m.exports.useRef({start:Date.now(),end:Date.now(),stop:!1});m.exports.useEffect(()=>(r(),()=>{n.current.stop=!0}),[]);const r=()=>{if(n.current.stop)return;requestAnimationFrame(()=>{r()});const a=[];if(Date.now()-n.current.end<1e3)return;n.current.end=Date.now();let s=Math.floor((n.current.end-n.current.start)/1e3);if(s>=3600){const d=Math.floor(s/3600);a.push(d>9?d:`0${d}`),s=s%3600}if(s>=60){const d=Math.floor(s/60);a.push(d>9?d:`0${d}`),s=s%60}else a.push("00");a.push(s>9?s:`0${s}`),e(a.join(":"))};return t("span",{children:i})};const K=(i="info")=>e=>{const n=document.createElement("div");document.body.appendChild(n);const r=()=>{var s,d;(d=(s=n.parentNode)==null?void 0:s.removeChild)==null||d.call(s,n)},a=t(Ne,{open:!0,autoHideDuration:2e3,onClose:r,children:t(Me,{onClose:r,severity:i,variant:"filled",sx:{width:"100%"},children:e})});return oe.render(a,n),{close:r}};var It={success:K("success"),error:K("error"),warning:K("warning"),info:K("info")};const Rt="_container_qyco3_1",Tt="_layoutCard_qyco3_4",Nt="_icon_qyco3_8",Mt="_active_qyco3_24",$t="_dropdown_qyco3_27";var b={container:Rt,layoutCard:Tt,icon:Nt,active:Mt,dropdown:$t};const fe=[{name:"gallery",title:"\u5BAB\u683C\u89C6\u56FE",icon:"layout-grid"},{name:"speaker",title:"\u6F14\u8BB2\u8005\u89C6\u56FE",icon:"layout-speaker"}];var Lt=i=>{var d;const{layout:e,onLayoutChange:n}=i,{id:r}=ie();var a=o(se,{sx:{width:320},children:[o(ce,{children:[t(de,{gutterBottom:!0,variant:"h6",children:"nickname"}),o(A,{container:!0,rowSpacing:1,children:[t(A,{item:!0,xs:3,children:"\u4F1A\u8BAEID"}),t(A,{item:!0,xs:9,children:r}),t(A,{item:!0,xs:3,children:"\u4F1A\u8BAE\u94FE\u63A5"}),t(A,{item:!0,xs:9,children:"http://localhost:3000/conf"}),t(A,{item:!0,xs:3,children:"\u7535\u8BDD\u62E8\u5165"}),o(A,{item:!0,xs:9,children:["+86 10 8888 8888(\u4E2D\u56FD\u5927\u9646) ",t("br",{}),t("a",{children:"\u66F4\u591A\u7535\u8BDD\u53F7\u7801"})]})]})]}),o(Le,{children:[t(Ve.CopyToClipboard,{text:`\u4F1A\u8BAEID: ${r}
\u4F1A\u8BAE\u94FE\u63A5: http://localhost:3000/conf
\u7535\u8BDD\u62E8\u5165: +86 10 8888 8888(\u4E2D\u56FD\u5927\u9646)`,onCopy:()=>It.success("\u590D\u5236\u6210\u529F"),children:t(I,{size:"small",children:"\u590D\u5236\u5165\u4F1A\u4FE1\u606F"})}),t(I,{size:"small",children:"\u5206\u4EAB\u81F3\u4F1A\u8BDD"})]})]}),s=t(se,{children:t(ce,{children:t(z,{direction:"row",spacing:2,children:fe.map(u=>o("div",{onClick:()=>n(u.name),className:`${b.layoutCard} ${e===u.name?b.active:""}`,children:[t("div",{className:b.icon,"data-type":u.name,children:t(c,{type:u.icon})}),u.title]},u.name))})})});return o(A,{container:!0,className:b.container,children:[t(A,{item:!0,xs:8,children:o($e,{sx:{display:"flex",alignItems:"center",width:"fit-content","& hr":{mx:.5}},children:[t(H,{overlay:a,children:o("span",{className:b.dropdown,children:["ID: ",r," ",t(c,{type:"down"})]})}),t(X,{orientation:"vertical",variant:"middle",flexItem:!0}),t(Bt,{})]})}),t(A,{item:!0,xs:4,children:t(H,{overlay:s,children:o("span",{className:b.dropdown,style:{float:"right"},children:[t(c,{type:"appstore"}),"\xA0",(d=fe.find(u=>u.name===e))==null?void 0:d.title," ",t(c,{type:"down"})]})})})]})},Vt=i=>{const{peers:e}=i,n=Math.ceil(Math.sqrt(e.length));return t(z,{justifyContent:"center",sx:{height:"100%"},children:t(A,{container:!0,alignItems:"center",spacing:2,children:e.map((r,a)=>t(A,{item:!0,xs:12/n,children:t(M,{peer:r})},a))})})};const Ot="_main_unpzo_1",Pt="_sub_unpzo_5";var ve={main:Ot,sub:Pt},qt=i=>{const{peers:e}=i,n=e[1];return o(G,{children:[n&&t("div",{className:ve.main,children:t(M,{peer:n,cover:!0,showTool:!1})}),t("div",{className:ve.sub,children:t(M,{peer:e[0]})})]})},jt=i=>{const r=i,{layout:e}=r,n=B(r,["layout"]);return e==="speaker"?t(qt,p({},n)):t(Vt,p({},n))};const zt="_dropdown_17q1w_1",Jt="_extra_17q1w_4";var te={dropdown:zt,extra:Jt},F=i=>{const{dropdown:e,badge:n,children:r,onClick:a}=i;return o("span",{className:te.dropdown,children:[t(I,{variant:"text",onClick:a,style:{flexDirection:"column"},children:r}),!!n&&t("span",{className:te.extra,children:n}),e&&t(H,{overlay:e,children:t("span",{className:te.extra,children:t(c,{type:"up"})})})]})},Ht=i=>{const{peers:e,devices:n,onAction:r}=i,a=e[0],s=o(j,{children:[o(y,{children:[t(C,{children:t(c,{type:"cc"})}),t(g,{children:"\u6253\u5F00\u5B57\u5E55"})]}),o(y,{children:[t(C,{children:t(c,{type:"live"})}),t(g,{children:"\u8F6C\u64AD\u753B\u9762"})]}),o(y,{children:[t(C,{children:t(c,{type:"effect"})}),t(g,{children:"\u7279\u6548"})]}),o(y,{children:[t(C,{children:t(c,{type:"setting"})}),t(g,{children:"\u8BBE\u7F6E"})]})]}),d=t(j,{children:n.filter(l=>l.kind==="videoinput").map(l=>o(y,{children:[t(C,{children:t(Y,{})}),o(g,{children:[t(c,{type:"camera"})," ",l.label]})]},l.deviceId))}),u=o(j,{children:[n.filter(l=>l.kind==="audioinput").map(l=>o(y,{children:[t(C,{children:t(Y,{})}),o(g,{children:[t(c,{type:"mic"})," ",l.label]})]},l.deviceId)),t(X,{}),n.filter(l=>l.kind==="audioinput").map(l=>o(y,{children:[t(C,{children:t(Y,{})}),o(g,{children:[t(c,{type:"mic"})," ",l.label]})]},l.deviceId))]});return o(z,{direction:"row",alignItems:"center",style:{height:"100%"},children:[o(F,{onClick:()=>r("toggle-audio"),dropdown:u,children:[t(T,{active:!a.audioStream}),t("small",{style:{fontSize:"10px"},children:"\u9EA6\u514B\u98CE"})]}),o(F,{onClick:()=>r("toggle-video"),dropdown:d,children:[t(J,{active:!a.videoStream}),t("small",{style:{fontSize:"10px"},children:"\u6444\u50CF\u5934"})]}),o(F,{onClick:()=>r("show-peers"),badge:e.length,children:[t(c,{type:"user"}),t("small",{style:{fontSize:"10px"},children:"\u53C2\u4F1A\u4EBA"})]}),o(F,{onClick:()=>r("share"),children:[t(c,{type:"share-screen",style:{color:"rgb(52, 199, 58)"}}),t("small",{style:{fontSize:"10px"},children:"\u5171\u4EAB"})]}),o(F,{onClick:()=>r("share"),children:[t(c,{type:"recording"}),t("small",{style:{fontSize:"10px"},children:"\u5F00\u59CB\u5F55\u5236"})]}),o(F,{dropdown:s,children:[t(c,{type:"more",rotate:90}),t("small",{style:{fontSize:"10px"},children:"\u66F4\u591A"})]}),o(F,{onClick:()=>r("leave"),children:[t(c,{type:"phone",danger:!0}),t("small",{style:{fontSize:"10px"},children:"\u79BB\u5F00"})]})]})},Ut=()=>t("div",{children:"nothing"}),Kt=i=>{const{peer:e}=i,n=o(G,{children:[t(D,{children:t(T,{active:e.audio})}),t(D,{children:t(J,{active:e.video})})]});return t(Oe,{disablePadding:!0,secondaryAction:n,children:o(Pe,{children:[t(qe,{children:t(Q,{children:e.nickname[0]})}),t(g,{primary:`${e.nickname}${e.isMe?"(\u6211)":""}`,secondary:"\u4E3B\u6301\u4EBA"})]})})},Wt=i=>{const{peers:e}=i,[n,r]=m.exports.useState(0);return o("div",{style:{width:320},children:[o(je,{value:n,onChange:(a,s)=>r(s),variant:"fullWidth",children:[t(le,{value:0,label:`\u5168\u90E8(${e.length})`}),t(le,{value:1,label:"\u5EFA\u8BAE(0)"})]}),n===0&&t(ze,{children:e.map((a,s)=>t(Kt,{peer:a},s))}),n===1&&t(Ut,{})]})};const Gt="_room_19dbp_1",Qt="_left_19dbp_4",Xt="_header_19dbp_13",Yt="_content_19dbp_16",Zt="_footer_19dbp_21",en="_drawer_19dbp_26";var L={room:Gt,left:Qt,header:Xt,content:Yt,footer:Zt,drawer:en},ge=()=>{const{u:i,v:e,a:n}=xt(),[r,a]=m.exports.useState([]),[s,d]=m.exports.useState([]),[u,l]=m.exports.useState("gallery"),[v,E]=m.exports.useState(!1),h=bt();m.exports.useEffect(()=>(h.getDevices().then(w=>{d(w)}),h.join({nickname:i},{video:e,audio:n}),h.on("change",w=>{a([S(p({},h.me),{isMe:!0,videoStream:h.localStream.shareStream||h.localStream.videoStream,audioStream:h.localStream.audioStream}),...w.map(O=>S(p({},O.peerInfo),{videoStream:O.remoteStream.videoStream,audioStream:O.remoteStream.audioStream,pc:O}))])}),()=>{h.destroy()}),[]);const k=w=>{l(w)},V=w=>{w==="show-peers"?E(!v):w==="toggle-video"?h.toggleVideo():w==="toggle-audio"?h.toggleAudio():w==="share"?h.toggleShare():w==="leave"&&h.hangup()};return o("div",{className:L.room,children:[o("div",{className:L.left,style:{paddingRight:v?320:0},children:[t("div",{className:L.header,children:t(Lt,{layout:u,onLayoutChange:k})}),t("div",{className:L.content,children:t(jt,{layout:u,peers:r})}),r[0]&&t("div",{className:L.footer,children:t(Ht,{peers:r,devices:s,onAction:V})})]}),o(Je,{variant:"persistent",open:v,anchor:"right",ModalProps:{keepMounted:!0},hideBackdrop:!0,elevation:1,onClose:()=>E(!1),children:[o(z,{direction:"row",alignItems:"center",children:[t(D,{onClick:()=>E(!1),children:t(c,{type:"left"})}),t(de,{variant:"h6",children:"\u53C2\u4F1A\u4EBA"})]}),t(X,{}),t(Wt,{peers:r})]}),t(Dt,{})]})};const tn=()=>t(He,{children:t(Ue,{children:o(R,{path:"/",element:t(We,{}),children:[t(R,{path:"/",element:t(lt,{})}),t(R,{path:"/entry",element:t(Ct,{})}),t(R,{path:"/room/:id",element:t(ge,{})}),t(R,{path:"/entry",element:t(ge,{})})]})})});oe.render(t(tn,{}),document.getElementById("root"));
