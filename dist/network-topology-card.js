var tr=Object.defineProperty;var rr=Object.getOwnPropertyDescriptor;var B=(s,e,t,r)=>{for(var i=r>1?void 0:r?rr(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=(r?n(e,t,i):n(i))||i);return r&&i&&tr(e,t,i),i};var ae=globalThis,ce=ae.ShadowRoot&&(ae.ShadyCSS===void 0||ae.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ke=Symbol(),ze=new WeakMap,Q=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ce&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=ze.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&ze.set(t,e))}return e}toString(){return this.cssText}},Fe=s=>new Q(typeof s=="string"?s:s+"",void 0,ke),$e=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((r,i,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[o+1],s[0]);return new Q(t,s,ke)},Ye=(s,e)=>{if(ce)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),i=ae.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,s.appendChild(r)}},_e=ce?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return Fe(t)})(s):s;var{is:sr,defineProperty:ir,getOwnPropertyDescriptor:or,getOwnPropertyNames:nr,getOwnPropertySymbols:lr,getPrototypeOf:ar}=Object,de=globalThis,qe=de.trustedTypes,cr=qe?qe.emptyScript:"",dr=de.reactiveElementPolyfillSupport,W=(s,e)=>s,K={toAttribute(s,e){switch(e){case Boolean:s=s?cr:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},he=(s,e)=>!sr(s,e),Xe={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:he};Symbol.metadata??=Symbol("metadata"),de.litPropertyMetadata??=new WeakMap;var G=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Xe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&ir(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){let{get:i,set:o}=or(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){let l=i?.call(this);o?.call(this,n),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Xe}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let e=ar(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let t=this.properties,r=[...nr(t),...lr(t)];for(let i of r)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let i of r)t.unshift(_e(i))}else e!==void 0&&t.push(_e(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ye(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:K).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){let r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let o=r.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:K;this._$Em=i;let l=n.fromAttribute(t,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(e,t,r,i=!1,o){if(e!==void 0){let n=this.constructor;if(i===!1&&(o=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??he)(o,t)||r.useDefault&&r.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:o},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,o]of r){let{wrapped:n}=o,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[W("elementProperties")]=new Map,G[W("finalized")]=new Map,dr?.({ReactiveElement:G}),(de.reactiveElementVersions??=[]).push("2.1.2");var Ce=globalThis,Qe=s=>s,pe=Ce.trustedTypes,We=pe?pe.createPolicy("lit-html",{createHTML:s=>s}):void 0,rt="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+A,hr=`<${st}>`,D=document,J=()=>D.createComment(""),ee=s=>s===null||typeof s!="object"&&typeof s!="function",Me=Array.isArray,pr=s=>Me(s)||typeof s?.[Symbol.iterator]=="function",Ge=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ke=/-->/g,Ze=/>/g,R=RegExp(`>|${Ge}(?:([^\\s"'>=/]+)(${Ge}*=${Ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Je=/'/g,et=/"/g,it=/^(?:script|style|textarea|title)$/i,Re=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),P=Re(1),g=Re(2),ys=Re(3),E=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),tt=new WeakMap,L=D.createTreeWalker(D,129);function ot(s,e){if(!Me(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return We!==void 0?We.createHTML(e):e}var fr=(s,e)=>{let t=s.length-1,r=[],i,o=e===2?"<svg>":e===3?"<math>":"",n=Z;for(let l=0;l<t;l++){let a=s[l],h,f,d=-1,y=0;for(;y<a.length&&(n.lastIndex=y,f=n.exec(a),f!==null);)y=n.lastIndex,n===Z?f[1]==="!--"?n=Ke:f[1]!==void 0?n=Ze:f[2]!==void 0?(it.test(f[2])&&(i=RegExp("</"+f[2],"g")),n=R):f[3]!==void 0&&(n=R):n===R?f[0]===">"?(n=i??Z,d=-1):f[1]===void 0?d=-2:(d=n.lastIndex-f[2].length,h=f[1],n=f[3]===void 0?R:f[3]==='"'?et:Je):n===et||n===Je?n=R:n===Ke||n===Ze?n=Z:(n=R,i=void 0);let c=n===R&&s[l+1].startsWith("/>")?" ":"";o+=n===Z?a+hr:d>=0?(r.push(h),a.slice(0,d)+rt+a.slice(d)+A+c):a+A+(d===-2?l:c)}return[ot(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},te=class s{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let o=0,n=0,l=e.length-1,a=this.parts,[h,f]=fr(e,t);if(this.el=s.createElement(h,r),L.currentNode=this.el.content,t===2||t===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=L.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(rt)){let y=f[n++],c=i.getAttribute(d).split(A),u=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:u[2],strings:c,ctor:u[1]==="."?Se:u[1]==="?"?Ae:u[1]==="@"?Pe:U}),i.removeAttribute(d)}else d.startsWith(A)&&(a.push({type:6,index:o}),i.removeAttribute(d));if(it.test(i.tagName)){let d=i.textContent.split(A),y=d.length-1;if(y>0){i.textContent=pe?pe.emptyScript:"";for(let c=0;c<y;c++)i.append(d[c],J()),L.nextNode(),a.push({type:2,index:++o});i.append(d[y],J())}}}else if(i.nodeType===8)if(i.data===st)a.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf(A,d+1))!==-1;)a.push({type:7,index:o}),d+=A.length-1}o++}}static createElement(e,t){let r=D.createElement("template");return r.innerHTML=e,r}};function I(s,e,t=s,r){if(e===E)return e;let i=r!==void 0?t._$Co?.[r]:t._$Cl,o=ee(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(s),i._$AT(s,t,r)),r!==void 0?(t._$Co??=[])[r]=i:t._$Cl=i),i!==void 0&&(e=I(s,i._$AS(s,e.values),i,r)),e}var Ee=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??D).importNode(t,!0);L.currentNode=i;let o=L.nextNode(),n=0,l=0,a=r[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new re(o,o.nextSibling,this,e):a.type===1?h=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(h=new Te(o,this,e)),this._$AV.push(h),a=r[++l]}n!==a?.index&&(o=L.nextNode(),n++)}return L.currentNode=D,i}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},re=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=I(this,e,t),ee(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):pr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&ee(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=te.createElement(ot(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{let o=new Ee(i,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=tt.get(e.strings);return t===void 0&&tt.set(e.strings,t=new te(e)),t}k(e){Me(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,i=0;for(let o of e)i===t.length?t.push(r=new s(this.O(J()),this.O(J()),this,this.options)):r=t[i],r._$AI(o),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=Qe(e).nextSibling;Qe(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,o){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=x}_$AI(e,t=this,r,i){let o=this.strings,n=!1;if(o===void 0)e=I(this,e,t,0),n=!ee(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{let l=e,a,h;for(e=o[0],a=0;a<o.length-1;a++)h=I(this,l[r+a],t,a),h===E&&(h=this._$AH[a]),n||=!ee(h)||h!==this._$AH[a],h===x?e=x:e!==x&&(e+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!i&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Se=class extends U{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}},Ae=class extends U{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}},Pe=class extends U{constructor(e,t,r,i,o){super(e,t,r,i,o),this.type=5}_$AI(e,t=this){if((e=I(this,e,t,0)??x)===E)return;let r=this._$AH,i=e===x&&r!==x||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==x&&(r===x||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Te=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}};var yr=Ce.litHtmlPolyfillSupport;yr?.(te,re),(Ce.litHtmlVersions??=[]).push("3.3.3");var nt=(s,e,t)=>{let r=t?.renderBefore??e,i=r._$litPart$;if(i===void 0){let o=t?.renderBefore??null;r._$litPart$=i=new re(e.insertBefore(J(),o),o,void 0,t??{})}return i._$AI(s),i};var Le=globalThis,T=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=nt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};T._$litElement$=!0,T.finalized=!0,Le.litElementHydrateSupport?.({LitElement:T});var xr=Le.litElementPolyfillSupport;xr?.({LitElement:T});(Le.litElementVersions??=[]).push("4.2.2");var lt=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};var ur={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:he},gr=(s=ur,e,t)=>{let{kind:r,metadata:i}=t,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),r==="accessor"){let{name:n}=t;return{set(l){let a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,s,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,s,l),l}}}if(r==="setter"){let{name:n}=t;return function(l){let a=this[n];e.call(this,l),this.requestUpdate(n,a,s,!0,l)}}throw Error("Unsupported decorator location: "+r)};function fe(s){return(e,t)=>typeof t=="object"?gr(s,e,t):((r,i,o)=>{let n=i.hasOwnProperty(o);return i.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(i,o):void 0})(s,e,t)}function ye(s){return fe({...s,state:!0,attribute:!1})}var at={id:"cisco-4500x",label:"Cisco Catalyst 4500-X",width:1e3,height:130,chassis:"cisco-4500x",ports:[{id:"1",label:"Te1/1",type:"sfp+",speed:"10G",x:250,y:52,w:44,h:24},{id:"2",label:"Te1/2",type:"sfp+",speed:"10G",x:250,y:86,w:44,h:24},{id:"3",label:"Te1/3",type:"sfp+",speed:"10G",x:310,y:52,w:44,h:24},{id:"4",label:"Te1/4",type:"sfp+",speed:"10G",x:310,y:86,w:44,h:24},{id:"5",label:"Te1/5",type:"sfp+",speed:"10G",x:370,y:52,w:44,h:24},{id:"6",label:"Te1/6",type:"sfp+",speed:"10G",x:370,y:86,w:44,h:24},{id:"7",label:"Te1/7",type:"sfp+",speed:"10G",x:430,y:52,w:44,h:24},{id:"8",label:"Te1/8",type:"sfp+",speed:"10G",x:430,y:86,w:44,h:24},{id:"9",label:"Te1/9",type:"sfp+",speed:"10G",x:490,y:52,w:44,h:24},{id:"10",label:"Te1/10",type:"sfp+",speed:"10G",x:490,y:86,w:44,h:24},{id:"11",label:"Te1/11",type:"sfp+",speed:"10G",x:550,y:52,w:44,h:24},{id:"12",label:"Te1/12",type:"sfp+",speed:"10G",x:550,y:86,w:44,h:24},{id:"13",label:"Te1/13",type:"sfp+",speed:"10G",x:610,y:52,w:44,h:24},{id:"14",label:"Te1/14",type:"sfp+",speed:"10G",x:610,y:86,w:44,h:24},{id:"15",label:"Te1/15",type:"sfp+",speed:"10G",x:670,y:52,w:44,h:24},{id:"16",label:"Te1/16",type:"sfp+",speed:"10G",x:670,y:86,w:44,h:24}]};var ct={id:"hp-5700",label:"HP FlexFabric 5700",width:1120,height:130,chassis:"hp-5700",ports:[{id:"1",label:"GE1",type:"rj45",speed:"1G",x:102,y:50,w:24,h:22},{id:"2",label:"GE2",type:"rj45",speed:"1G",x:102,y:84,w:24,h:22},{id:"3",label:"GE3",type:"rj45",speed:"1G",x:130,y:50,w:24,h:22},{id:"4",label:"GE4",type:"rj45",speed:"1G",x:130,y:84,w:24,h:22},{id:"5",label:"GE5",type:"rj45",speed:"1G",x:158,y:50,w:24,h:22},{id:"6",label:"GE6",type:"rj45",speed:"1G",x:158,y:84,w:24,h:22},{id:"7",label:"GE7",type:"rj45",speed:"1G",x:186,y:50,w:24,h:22},{id:"8",label:"GE8",type:"rj45",speed:"1G",x:186,y:84,w:24,h:22},{id:"9",label:"GE9",type:"rj45",speed:"1G",x:214,y:50,w:24,h:22},{id:"10",label:"GE10",type:"rj45",speed:"1G",x:214,y:84,w:24,h:22},{id:"11",label:"GE11",type:"rj45",speed:"1G",x:242,y:50,w:24,h:22},{id:"12",label:"GE12",type:"rj45",speed:"1G",x:242,y:84,w:24,h:22},{id:"13",label:"GE13",type:"rj45",speed:"1G",x:270,y:50,w:24,h:22},{id:"14",label:"GE14",type:"rj45",speed:"1G",x:270,y:84,w:24,h:22},{id:"15",label:"GE15",type:"rj45",speed:"1G",x:298,y:50,w:24,h:22},{id:"16",label:"GE16",type:"rj45",speed:"1G",x:298,y:84,w:24,h:22},{id:"17",label:"GE17",type:"rj45",speed:"1G",x:356,y:50,w:24,h:22},{id:"18",label:"GE18",type:"rj45",speed:"1G",x:356,y:84,w:24,h:22},{id:"19",label:"GE19",type:"rj45",speed:"1G",x:384,y:50,w:24,h:22},{id:"20",label:"GE20",type:"rj45",speed:"1G",x:384,y:84,w:24,h:22},{id:"21",label:"GE21",type:"rj45",speed:"1G",x:412,y:50,w:24,h:22},{id:"22",label:"GE22",type:"rj45",speed:"1G",x:412,y:84,w:24,h:22},{id:"23",label:"GE23",type:"rj45",speed:"1G",x:440,y:50,w:24,h:22},{id:"24",label:"GE24",type:"rj45",speed:"1G",x:440,y:84,w:24,h:22},{id:"25",label:"GE25",type:"rj45",speed:"1G",x:468,y:50,w:24,h:22},{id:"26",label:"GE26",type:"rj45",speed:"1G",x:468,y:84,w:24,h:22},{id:"27",label:"GE27",type:"rj45",speed:"1G",x:496,y:50,w:24,h:22},{id:"28",label:"GE28",type:"rj45",speed:"1G",x:496,y:84,w:24,h:22},{id:"29",label:"GE29",type:"rj45",speed:"1G",x:524,y:50,w:24,h:22},{id:"30",label:"GE30",type:"rj45",speed:"1G",x:524,y:84,w:24,h:22},{id:"31",label:"GE31",type:"rj45",speed:"1G",x:552,y:50,w:24,h:22},{id:"32",label:"GE32",type:"rj45",speed:"1G",x:552,y:84,w:24,h:22},{id:"33",label:"GE33",type:"rj45",speed:"1G",x:610,y:50,w:24,h:22},{id:"34",label:"GE34",type:"rj45",speed:"1G",x:610,y:84,w:24,h:22},{id:"35",label:"GE35",type:"rj45",speed:"1G",x:638,y:50,w:24,h:22},{id:"36",label:"GE36",type:"rj45",speed:"1G",x:638,y:84,w:24,h:22},{id:"37",label:"GE37",type:"rj45",speed:"1G",x:666,y:50,w:24,h:22},{id:"38",label:"GE38",type:"rj45",speed:"1G",x:666,y:84,w:24,h:22},{id:"39",label:"GE39",type:"rj45",speed:"1G",x:694,y:50,w:24,h:22},{id:"40",label:"GE40",type:"rj45",speed:"1G",x:694,y:84,w:24,h:22},{id:"41",label:"GE41",type:"rj45",speed:"1G",x:722,y:50,w:24,h:22},{id:"42",label:"GE42",type:"rj45",speed:"1G",x:722,y:84,w:24,h:22},{id:"43",label:"GE43",type:"rj45",speed:"1G",x:750,y:50,w:24,h:22},{id:"44",label:"GE44",type:"rj45",speed:"1G",x:750,y:84,w:24,h:22},{id:"45",label:"GE45",type:"rj45",speed:"1G",x:778,y:50,w:24,h:22},{id:"46",label:"GE46",type:"rj45",speed:"1G",x:778,y:84,w:24,h:22},{id:"47",label:"GE47",type:"rj45",speed:"1G",x:806,y:50,w:24,h:22},{id:"48",label:"GE48",type:"rj45",speed:"1G",x:806,y:84,w:24,h:22},{id:"49",label:"XGE49",type:"sfp+",speed:"10G",x:866,y:50,w:40,h:22},{id:"50",label:"XGE50",type:"sfp+",speed:"10G",x:866,y:84,w:40,h:22},{id:"51",label:"XGE51",type:"sfp+",speed:"10G",x:914,y:50,w:40,h:22},{id:"52",label:"XGE52",type:"sfp+",speed:"10G",x:914,y:84,w:40,h:22},{id:"53",label:"FGE53",type:"qsfp+",speed:"40G",x:982,y:49,w:52,h:28},{id:"54",label:"FGE54",type:"qsfp+",speed:"40G",x:982,y:89,w:52,h:28}]};var dt={id:"nuc-n150",label:"Intel NUC N150",width:620,height:230,chassis:"nuc-n150",ports:[{id:"ETH0",label:"ETH0",type:"rj45",speed:"1G",x:150,y:145,w:42,h:38},{id:"ETH1",label:"ETH1",type:"rj45",speed:"1G",x:212,y:145,w:42,h:38},{id:"ETH2",label:"ETH2",type:"rj45",speed:"1G",x:274,y:145,w:42,h:38},{id:"SFP0",label:"SFP0",type:"sfp+",speed:"10G",x:362,y:145,w:44,h:24},{id:"SFP1",label:"SFP1",type:"sfp+",speed:"10G",x:432,y:145,w:44,h:24}]};var ht={id:"generic-small-1eth",label:"Generic Small Device",width:420,height:200,chassis:"generic-small",ports:[{id:"ETH0",label:"ETH0",type:"rj45",speed:"1G",x:210,y:150,w:46,h:40}]};var pt={id:"generic-1u-2sfp-1eth-mgmt",label:"Generic 1U Server",width:1e3,height:130,chassis:"generic-1u",ports:[{id:"SFP0",label:"SFP0",type:"sfp+",speed:"10G",x:335,y:66,w:50,h:27},{id:"SFP1",label:"SFP1",type:"sfp+",speed:"10G",x:445,y:66,w:50,h:27},{id:"ETH0",label:"ETH0",type:"rj45",speed:"1G",x:555,y:66,w:46,h:40},{id:"MGMT",label:"MGMT",type:"rj45",speed:"1G",x:665,y:66,w:46,h:40}]};var ft={id:"generic-1u-4eth-mgmt",label:"Generic 1U Server",width:1e3,height:130,chassis:"generic-1u",ports:[{id:"ETH0",label:"ETH0",type:"rj45",speed:"1G",x:300,y:66,w:46,h:40},{id:"ETH1",label:"ETH1",type:"rj45",speed:"1G",x:400,y:66,w:46,h:40},{id:"ETH2",label:"ETH2",type:"rj45",speed:"1G",x:500,y:66,w:46,h:40},{id:"ETH3",label:"ETH3",type:"rj45",speed:"1G",x:600,y:66,w:46,h:40},{id:"MGMT",label:"MGMT",type:"rj45",speed:"1G",x:700,y:66,w:46,h:40}]};var yt={id:"generic-2u-2sfp-1qsfp-mgmt",label:"Generic 2U Server",width:1e3,height:260,chassis:"generic-2u",ports:[{id:"SFP0",label:"SFP0",type:"sfp+",speed:"10G",x:320,y:208,w:50,h:27},{id:"SFP1",label:"SFP1",type:"sfp+",speed:"10G",x:440,y:208,w:50,h:27},{id:"QSFP0",label:"QSFP0",type:"qsfp+",speed:"40G",x:560,y:208,w:58,h:32},{id:"MGMT",label:"MGMT",type:"rj45",speed:"1G",x:680,y:208,w:46,h:40}]};var xt={id:"generic-2u-4eth-mgmt",label:"Generic 2U Server",width:1e3,height:260,chassis:"generic-2u",ports:[{id:"ETH1",label:"ETH1",type:"rj45",speed:"1G",x:300,y:208,w:46,h:40},{id:"ETH2",label:"ETH2",type:"rj45",speed:"1G",x:400,y:208,w:46,h:40},{id:"ETH3",label:"ETH3",type:"rj45",speed:"1G",x:500,y:208,w:46,h:40},{id:"ETH4",label:"ETH4",type:"rj45",speed:"1G",x:600,y:208,w:46,h:40},{id:"MGMT",label:"MGMT",type:"rj45",speed:"1G",x:700,y:208,w:46,h:40}]};var ut={id:"generic-4u-4eth-2sfp-mgmt",label:"Generic 4U Server",width:1e3,height:520,chassis:"generic-4u",ports:[{id:"ETH0",label:"ETH0",type:"rj45",speed:"1G",x:230,y:454,w:46,h:40},{id:"ETH1",label:"ETH1",type:"rj45",speed:"1G",x:320,y:454,w:46,h:40},{id:"ETH2",label:"ETH2",type:"rj45",speed:"1G",x:410,y:454,w:46,h:40},{id:"ETH3",label:"ETH3",type:"rj45",speed:"1G",x:500,y:454,w:46,h:40},{id:"SFP0",label:"SFP0",type:"sfp+",speed:"10G",x:590,y:454,w:50,h:27},{id:"SFP1",label:"SFP1",type:"sfp+",speed:"10G",x:680,y:454,w:50,h:27},{id:"MGMT",label:"MGMT",type:"rj45",speed:"1G",x:770,y:454,w:46,h:40}]};var gt={id:"generic-4u-2sfp-1qsfp-mgmt",label:"Generic 4U Server",width:1e3,height:520,chassis:"generic-4u",ports:[{id:"SFP0",label:"SFP0",type:"sfp+",speed:"10G",x:320,y:454,w:50,h:27},{id:"SFP1",label:"SFP1",type:"sfp+",speed:"10G",x:440,y:454,w:50,h:27},{id:"QSFP0",label:"QSFP0",type:"qsfp+",speed:"40G",x:560,y:454,w:58,h:32},{id:"MGMT",label:"MGMT",type:"rj45",speed:"1G",x:680,y:454,w:46,h:40}]};var mt=[at,ct,dt,ht,pt,ft,yt,xt,ut,gt];function wt(s=[]){let e=new Map;for(let t of mt)e.set(t.id,t);for(let t of s)e.set(t.id,t);return e}var bi=mt.map(s=>s.id);function bt(s,e,t=1){let r=[];for(let i of s){let o=e.get(i.template);if(!o)throw new Error(`Unknown device template "${i.template}" for device "${i.id}". Known templates: ${[...e.keys()].join(", ")}`);let n=i.scale??t,l=new Map;for(let a of o.ports)l.set(String(a.id),a);r.push({instance:i,template:o,x:i.x,y:i.y,scale:n,width:o.width*n,height:o.height*n,ports:l})}return r}function se(s,e){let t=s.ports.get(String(e));if(t)return{x:s.x+t.x*s.scale,y:s.y+t.y*s.scale}}function vt(s,e){let t=s.ports.get(String(e));if(t)return{x:t.w*s.scale,y:t.h*s.scale}}function kt(s){let e={minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};for(let t of s)e.minX=Math.min(e.minX,t.x),e.minY=Math.min(e.minY,t.y),e.maxX=Math.max(e.maxX,t.x+t.width),e.maxY=Math.max(e.maxY,t.y+t.height);return isFinite(e.minX)?e:{minX:0,minY:0,maxX:1e3,maxY:600}}function $t(s){if(s==null)return"unknown";let e=s.toLowerCase();return["on","up","connected","active","linked","online","home"].includes(e)?"up":["off","down","disconnected","inactive","offline","not_connected"].includes(e)?"down":["disabled","unavailable","admin_down","shutdown"].includes(e)?"disabled":["flapping","flap","bouncing"].includes(e)?"flapping":"unknown"}function Ar(s){switch((s??"").toLowerCase()){case"connected":case"up":return"up";case"disconnected":case"down":return"down";case"disabled":return"disabled";case"flapping":return"flapping";default:return"unknown"}}function _t(s,e,t){let r=s.telemetry_entity;if(!r||!t?.states?.[r])return;let i=s.port_map?.[e];if(!i)return;let o=t.states[r].attributes?.ports;if(!o)return;let n=Array.isArray(i)?i:[i],l=[];for(let a of n){let h=o[a];h&&l.push(Ar(h.status))}if(l.length!==0)return N(l)}function N(s){let e=["down","flapping","disabled","up","unknown"];for(let t of e)if(s.includes(t))return t;return"unknown"}function Gt(s,e){return s.entity&&e?.states?.[s.entity]?$t(e.states[s.entity].state):s.state??"up"}function De(s,e,t,r){let i=s.members?.[e];return i?.entity&&r?.states?.[i.entity]?$t(r.states[i.entity].state):i?.state?i.state:t}function j(s){return`state-${s}`}var ge="#9aa3ad",Pr=(s,e)=>`${s}:${e}`,Tr=64,ue=90,Et=26,Cr=13,Mr=20;function Rr(s){return s.map(e=>({x0:e.x,y0:e.y,x1:e.x+e.width,y1:e.y+e.height}))}function Lr(s,e){let t=s.filter((o,n)=>n===0||Math.hypot(o.x-s[n-1].x,o.y-s[n-1].y)>.5);if(t.length<2)return"";if(t.length===2)return`M ${t[0].x} ${t[0].y} L ${t[1].x} ${t[1].y}`;let r=`M ${t[0].x} ${t[0].y}`;for(let o=1;o<t.length-1;o++){let n=t[o-1],l=t[o],a=t[o+1],h=Math.hypot(n.x-l.x,n.y-l.y),f=Math.hypot(a.x-l.x,a.y-l.y),d=Math.min(e,h/2,f/2),y={x:l.x+(n.x-l.x)/h*d,y:l.y+(n.y-l.y)/h*d},c={x:l.x+(a.x-l.x)/f*d,y:l.y+(a.y-l.y)/f*d};r+=` L ${y.x} ${y.y} Q ${l.x} ${l.y} ${c.x} ${c.y}`}let i=t[t.length-1];return r+=` L ${i.x} ${i.y}`,r}function Dr(s,e,t,r){return t>=r.y0&&t<=r.y1&&r.x0<e&&r.x1>s}function jr(s,e,t,r,i,o){let n=o.filter(y=>y!==s&&y!==e),l=[],a=s.y1<=e.y1?s:e,h=a===s?e:s;h.y0-a.y1>=Tr&&l.push((a.y1+h.y0)/2),l.push(Math.min(s.y0,e.y0)-ue),l.push(Math.max(s.y1,e.y1)+ue);for(let y of n)y.x1>t&&y.x0<r&&(l.push(y.y0-ue),l.push(y.y1+ue));let f=l[0],d=1/0;for(let y of l){let c=0;for(let w of n)Dr(t,r,y,w)&&c++;let u=c*1e5+Math.abs(y-i);u<d&&(d=u,f=y)}return f}function Hr(s){let e=[...s].sort((r,i)=>r.channelY-i.channelY),t=[];for(let r of e){let i=r.channelY,o=!0,n=0;for(;o&&n++<200;){o=!1;for(let l of t)r.minX<l.maxX&&l.minX<r.maxX&&Math.abs(i-l.channelY)<Et&&(i=l.channelY+Et,o=!0)}r.channelY=i,t.push(r)}}function Or(s,e){return Lr([s.a,{x:s.a.x,y:e},{x:s.b.x,y:e},s.b],Mr)}function Br(s,e){for(let t=0;t<=1;t=t+1){let r=s.endpoints[t],i=e.get(r.device);if(!i)continue;let o=r.ports.length>=1&&r.ports.every(n=>i.ports.get(String(n))?.type==="qsfp+");if(r.ports.length===1&&o)return t}return s.endpoints[0].ports.length<=s.endpoints[1].ports.length?0:1}function At(s,e,t=.45,r,i,o){let n=new Map(e.map(c=>[c.instance.id,c])),l=Rr(e),a=new Map(e.map((c,u)=>[c.instance.id,l[u]])),h=new Map,f=(c,u,w)=>{h.set(Pr(c,u),w)},d=[];for(let c of s){let u=Gt(c,r),w=c.fanout==="qsfp40g-to-4x10g",p=[];if(w){let m=Br(c,n),b=m===0?1:0,k=c.endpoints[m],$=c.endpoints[b],_=n.get(k.device),le=n.get($.device),v=k.ports[0],C=_&&se(_,v),z=_&&vt(_,v);if(!_||!le||!C||!z){console.warn(`[network-topology-card] cannot route fan-out link "${c.id}"`);continue}let F=o?.(k.device,v);f(k.device,v,F??u);let M=$.ports.slice(0,4),Y=z.x*.72/Math.max(M.length-1,1),q=C.x-Y*(M.length-1)/2;if(M.forEach((X,Be)=>{let Ie=se(le,X);if(!Ie)return;let Ue=o?.($.device,X),Ne=[F,Ue].filter(er=>er!==void 0),Ve=Ne.length?N(Ne):De(c,Be,u,r);f($.device,X,Ue??Ve),p.push({a:{x:M.length===1?C.x:q+Y*Be,y:C.y},b:Ie,state:Ve,fanoutLane:!0})}),p.length===0)continue;let ve=N(p.map(X=>X.state));d.push(St(c,ve,!0,p,a.get(k.device),a.get($.device)))}else{let[m,b]=c.endpoints,k=n.get(m.device),$=n.get(b.device);if(!k||!$){console.warn(`[network-topology-card] unknown device in link "${c.id}"`);continue}let _=Math.min(m.ports.length,b.ports.length);for(let v=0;v<_;v++){let C=se(k,m.ports[v]),z=se($,b.ports[v]);if(!C||!z){console.warn(`[network-topology-card] link "${c.id}" member ${v} references a missing port`);continue}let F=o?.(m.device,m.ports[v]),M=o?.(b.device,b.ports[v]),Y=[F,M].filter(ve=>ve!==void 0),q=Y.length?N(Y):De(c,v,u,r);f(m.device,m.ports[v],F??q),f(b.device,b.ports[v],M??q),p.push({a:C,b:z,state:q,fanoutLane:!1})}if(p.length===0)continue;let le=N(p.map(v=>v.state));d.push(St(c,le,!1,p,a.get(m.device),a.get(b.device)))}}for(let c of d){let u=[];for(let p of c.members)u.push(p.a.y,p.b.y);let w=u.reduce((p,m)=>p+m,0)/u.length;c.channelY=jr(c.devA,c.devB,c.minX,c.maxX,w,l)}return Hr(d),{renders:d.map(c=>{let u=i?i(c.link):{color:ge},w=u.color,p=u.stripes,m=c.members.length,b=c.members.map((k,$)=>{let _=c.channelY+($-(m-1)/2)*Cr;return{linkId:c.link.id,memberIndex:$,d:Or(k,_),state:k.state,fanoutLane:k.fanoutLane}});return{id:c.link.id,name:c.link.name??c.link.id,type:c.link.type,state:c.state,fanout:c.fanout,cables:b,labelPos:{x:(c.minX+c.maxX)/2,y:c.channelY},color:w,stripes:p}}),portStates:h}}function St(s,e,t,r,i,o){let n=1/0,l=-1/0;for(let a of r)n=Math.min(n,a.a.x,a.b.x),l=Math.max(l,a.a.x,a.b.x);return{link:s,state:e,fanout:t,members:r,devA:i,devB:o,minX:n,maxX:l,channelY:0}}var Ir="#7a828c",ie=class{constructor(e=[]){this.byId=new Map;this.vlans=e;for(let t of e)this.byId.set(String(t.id),t)}color(e){return this.byId.get(String(e))?.color??Ir}resolve(e){return e==null?{kind:"none",colors:[],ids:[]}:e==="trunk"?{kind:"trunk",colors:this.vlans.map(t=>t.color),ids:this.vlans.map(t=>t.id)}:Array.isArray(e)?{kind:"trunk",colors:e.map(t=>this.color(t)),ids:e.slice()}:{kind:"access",color:this.color(e),colors:[this.color(e)],ids:[e]}}};var Pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},we=s=>(...e)=>({_$litDirective$:s,values:e}),me=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var H=class extends me{constructor(e){if(super(e),this.it=x,e.type!==Pt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===x||e==null)return this._t=void 0,this.it=e;if(e===E)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};H.directiveName="unsafeHTML",H.resultType=1;var Ci=we(H);var oe=class extends H{};oe.directiveName="unsafeSVG",oe.resultType=2;var be=we(oe);var Tt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 130">
  <defs>
    <linearGradient id="c4500x-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dcdee0"/>
      <stop offset="0.12" stop-color="#cfd2d5"/>
      <stop offset="0.5" stop-color="#bcc0c3"/>
      <stop offset="0.9" stop-color="#aeb2b5"/>
      <stop offset="1" stop-color="#9b9fa2"/>
    </linearGradient>
    <linearGradient id="c4500x-ear" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c4c7ca"/>
      <stop offset="1" stop-color="#94989b"/>
    </linearGradient>
    <linearGradient id="c4500x-recess" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#121416"/>
      <stop offset="0.5" stop-color="#1b1e21"/>
      <stop offset="1" stop-color="#0c0e10"/>
    </linearGradient>
    <linearGradient id="c4500x-module" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c7cacd"/>
      <stop offset="1" stop-color="#a4a8ab"/>
    </linearGradient>
  </defs>

  <g class="chassis chassis-cisco-4500x">
    <!-- mounting ears -->
    <rect x="0" y="6" width="26" height="118" rx="3" fill="url(#c4500x-ear)" stroke="#7e8285" stroke-width="1"/>
    <rect x="974" y="6" width="26" height="118" rx="3" fill="url(#c4500x-ear)" stroke="#7e8285" stroke-width="1"/>
    <circle cx="13" cy="22" r="4" fill="#6f7376" stroke="#54585b" stroke-width="0.8"/>
    <circle cx="13" cy="108" r="4" fill="#6f7376" stroke="#54585b" stroke-width="0.8"/>
    <circle cx="987" cy="22" r="4" fill="#6f7376" stroke="#54585b" stroke-width="0.8"/>
    <circle cx="987" cy="108" r="4" fill="#6f7376" stroke="#54585b" stroke-width="0.8"/>

    <!-- main chassis body -->
    <rect x="22" y="2" width="956" height="126" rx="5" fill="url(#c4500x-body)" stroke="#7c8083" stroke-width="1.2"/>
    <!-- top + bottom bezel highlight lines -->
    <line x1="26" y1="6.5" x2="974" y2="6.5" stroke="#eef0f1" stroke-width="1" opacity="0.7"/>
    <line x1="26" y1="123.5" x2="974" y2="123.5" stroke="#85898c" stroke-width="1" opacity="0.7"/>

    <!-- ===== LEFT ZONE: branding + mgmt/console + status LEDs ===== -->
    <text x="34" y="40" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="bold" letter-spacing="1.5" fill="#2f3438">CISCO</text>
    <text x="34" y="55" font-family="Arial, Helvetica, sans-serif" font-size="9" fill="#4a4f53">Catalyst 4500-X Series</text>

    <!-- mgmt RJ45 + console cluster (decoration only) -->
    <rect x="86" y="62" width="26" height="22" rx="2" fill="#2b2f33" stroke="#16191b" stroke-width="1"/>
    <rect x="90" y="66" width="18" height="11" rx="1" fill="#0c0e10"/>
    <rect x="118" y="64" width="16" height="9" rx="1.5" fill="#1c1f22" stroke="#0c0e10" stroke-width="0.8"/>
    <rect x="118" y="76" width="16" height="9" rx="1.5" fill="#1c1f22" stroke="#0c0e10" stroke-width="0.8"/>
    <text x="86" y="96" font-family="Arial, Helvetica, sans-serif" font-size="6.5" fill="#55595d">MGMT  CONSOLE</text>

    <!-- status LEDs -->
    <g>
      <circle cx="40" cy="78" r="3.2" fill="#3a7d3a"/>
      <circle cx="52" cy="78" r="3.2" fill="#7d7a3a"/>
      <circle cx="64" cy="78" r="3.2" fill="#3a3f44"/>
      <text x="34" y="96" font-family="Arial, Helvetica, sans-serif" font-size="6.5" fill="#55595d">SYS  STAT  ACT</text>
    </g>

    <!-- ===== CENTER PORT BAY recessed panel (16x SFP+) ===== -->
    <rect x="214" y="32" width="494" height="68" rx="3" fill="url(#c4500x-recess)" stroke="#06080a" stroke-width="1.4"/>
    <rect x="216.5" y="34.5" width="489" height="63" rx="2" fill="none" stroke="#33383c" stroke-width="0.7" opacity="0.5"/>

    <!-- ===== RIGHT ZONE: blank uplink module bay + 2 thumbscrews ===== -->
    <rect x="742" y="20" width="224" height="90" rx="3" fill="url(#c4500x-module)" stroke="#83878a" stroke-width="1.2"/>
    <rect x="748" y="26" width="212" height="78" rx="2" fill="none" stroke="#9b9fa2" stroke-width="0.8" opacity="0.7"/>
    <!-- ventilation slots in module -->
    <g fill="#8d9194">
      <rect x="800" y="44" width="3" height="42" rx="1.5"/>
      <rect x="810" y="44" width="3" height="42" rx="1.5"/>
      <rect x="820" y="44" width="3" height="42" rx="1.5"/>
      <rect x="830" y="44" width="3" height="42" rx="1.5"/>
      <rect x="840" y="44" width="3" height="42" rx="1.5"/>
      <rect x="850" y="44" width="3" height="42" rx="1.5"/>
      <rect x="860" y="44" width="3" height="42" rx="1.5"/>
      <rect x="870" y="44" width="3" height="42" rx="1.5"/>
    </g>
    <!-- thumbscrews -->
    <circle cx="760" cy="65" r="9" fill="#b6babd" stroke="#7c8083" stroke-width="1.2"/>
    <circle cx="760" cy="65" r="4.5" fill="#9a9ea1" stroke="#7c8083" stroke-width="0.8"/>
    <circle cx="948" cy="65" r="9" fill="#b6babd" stroke="#7c8083" stroke-width="1.2"/>
    <circle cx="948" cy="65" r="4.5" fill="#9a9ea1" stroke="#7c8083" stroke-width="0.8"/>

    <!-- subtle vents between left zone and bay -->
    <g fill="#a7abae">
      <rect x="160" y="40" width="3" height="50" rx="1.5"/>
      <rect x="170" y="40" width="3" height="50" rx="1.5"/>
      <rect x="180" y="40" width="3" height="50" rx="1.5"/>
      <rect x="190" y="40" width="3" height="50" rx="1.5"/>
    </g>
  </g>
</svg>
`;var Ct=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 130">
  <defs>
    <linearGradient id="hp5700-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a3d40"/>
      <stop offset="0.1" stop-color="#2c2f31"/>
      <stop offset="0.5" stop-color="#212325"/>
      <stop offset="0.9" stop-color="#1a1c1d"/>
      <stop offset="1" stop-color="#101112"/>
    </linearGradient>
    <linearGradient id="hp5700-ear" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34373a"/>
      <stop offset="1" stop-color="#16181a"/>
    </linearGradient>
    <linearGradient id="hp5700-recess" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070809"/>
      <stop offset="0.5" stop-color="#101214"/>
      <stop offset="1" stop-color="#040506"/>
    </linearGradient>
  </defs>

  <g class="chassis chassis-hp-5700">
    <!-- mounting ears -->
    <rect x="0" y="6" width="24" height="118" rx="3" fill="url(#hp5700-ear)" stroke="#0c0d0e" stroke-width="1"/>
    <rect x="1096" y="6" width="24" height="118" rx="3" fill="url(#hp5700-ear)" stroke="#0c0d0e" stroke-width="1"/>
    <circle cx="12" cy="22" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="12" cy="108" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="1108" cy="22" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="1108" cy="108" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>

    <!-- main chassis body -->
    <rect x="20" y="2" width="1080" height="126" rx="5" fill="url(#hp5700-body)" stroke="#0a0b0c" stroke-width="1.2"/>
    <line x1="24" y1="6.5" x2="1096" y2="6.5" stroke="#4a4d50" stroke-width="1" opacity="0.6"/>
    <line x1="24" y1="123.5" x2="1096" y2="123.5" stroke="#000000" stroke-width="1" opacity="0.6"/>

    <!-- product label strip -->
    <text x="90" y="20" font-family="Arial, Helvetica, sans-serif" font-size="8" fill="#9aa0a4">FlexFabric 5700-48G-4XG-2QSFP+</text>
    <text x="752" y="20" font-family="Arial, Helvetica, sans-serif" font-size="7" fill="#6d7276">48x GbE  /  4x 10GbE SFP+  /  2x 40GbE QSFP+</text>

    <!-- ===== left mgmt / console cluster (decoration) ===== -->
    <rect x="30" y="44" width="50" height="44" rx="3" fill="url(#hp5700-recess)" stroke="#000000" stroke-width="1"/>
    <rect x="38" y="52" width="16" height="13" rx="1.5" fill="#0a0b0c" stroke="#2a2d30" stroke-width="0.8"/>
    <rect x="58" y="52" width="14" height="13" rx="1.5" fill="#0a0b0c" stroke="#2a2d30" stroke-width="0.8"/>
    <circle cx="42" cy="76" r="2.2" fill="#2f6f3a"/>
    <circle cx="52" cy="76" r="2.2" fill="#b9a13a"/>
    <circle cx="62" cy="76" r="2.2" fill="#2a2d30"/>
    <text x="55" y="98" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="6" fill="#5a5e62">MGMT</text>

    <!-- ===== RJ45 group 1 (1..16) ===== -->
    <rect x="86" y="35" width="228" height="64" rx="3" fill="url(#hp5700-recess)" stroke="#000000" stroke-width="1.4"/>
    <rect x="88.5" y="37.5" width="223" height="59" rx="2" fill="none" stroke="#2a2d30" stroke-width="0.7" opacity="0.5"/>

    <!-- ===== RJ45 group 2 (17..32) ===== -->
    <rect x="340" y="35" width="228" height="64" rx="3" fill="url(#hp5700-recess)" stroke="#000000" stroke-width="1.4"/>
    <rect x="342.5" y="37.5" width="223" height="59" rx="2" fill="none" stroke="#2a2d30" stroke-width="0.7" opacity="0.5"/>

    <!-- ===== RJ45 group 3 (33..48) ===== -->
    <rect x="594" y="35" width="228" height="64" rx="3" fill="url(#hp5700-recess)" stroke="#000000" stroke-width="1.4"/>
    <rect x="596.5" y="37.5" width="223" height="59" rx="2" fill="none" stroke="#2a2d30" stroke-width="0.7" opacity="0.5"/>

    <!-- ===== SFP+ panel (49..52, 2x2) ===== -->
    <rect x="840" y="35" width="104" height="64" rx="3" fill="url(#hp5700-recess)" stroke="#000000" stroke-width="1.4"/>
    <rect x="842.5" y="37.5" width="99" height="59" rx="2" fill="none" stroke="#2a2d30" stroke-width="0.7" opacity="0.5"/>

    <!-- ===== QSFP+ panel (53..54, stacked) ===== -->
    <rect x="950" y="30" width="66" height="74" rx="3" fill="url(#hp5700-recess)" stroke="#000000" stroke-width="1.4"/>
    <rect x="952.5" y="32.5" width="61" height="69" rx="2" fill="none" stroke="#2a2d30" stroke-width="0.7" opacity="0.5"/>

    <!-- ===== HP logo block (right) ===== -->
    <rect x="1030" y="40" width="58" height="50" rx="4" fill="#1c1e20" stroke="#000000" stroke-width="1"/>
    <circle cx="1059" cy="65" r="21" fill="none" stroke="#5a5e62" stroke-width="1.2" opacity="0.5"/>
    <text x="1059" y="74" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="bold" font-style="italic" fill="#e8eaec">hp</text>
  </g>
</svg>
`;var Mt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 230">
  <defs>
    <linearGradient id="nuc-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a2c2e"/>
      <stop offset="0.5" stop-color="#1c1e20"/>
      <stop offset="1" stop-color="#0e0f10"/>
    </linearGradient>
    <linearGradient id="nuc-cap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34373a"/>
      <stop offset="0.5" stop-color="#222426"/>
      <stop offset="1" stop-color="#121314"/>
    </linearGradient>
    <linearGradient id="nuc-panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a0b0c"/>
      <stop offset="0.5" stop-color="#141618"/>
      <stop offset="1" stop-color="#050606"/>
    </linearGradient>
  </defs>

  <g class="chassis chassis-nuc-n150">
    <!-- outer case body (flattened front face) -->
    <rect x="20" y="28" width="580" height="176" rx="18" fill="url(#nuc-body)" stroke="#050606" stroke-width="2"/>
    <!-- rounded end caps (smooth, vs finned middle) -->
    <rect x="20" y="28" width="56" height="176" rx="18" fill="url(#nuc-cap)" stroke="#050606" stroke-width="1.5"/>
    <rect x="544" y="28" width="56" height="176" rx="18" fill="url(#nuc-cap)" stroke="#050606" stroke-width="1.5"/>

    <!-- top cooling-fin vent hint -->
    <g stroke="#3a3d40" stroke-width="2" opacity="0.4">
      <line x1="86" y1="42" x2="534" y2="42"/>
      <line x1="86" y1="50" x2="534" y2="50"/>
      <line x1="86" y1="58" x2="534" y2="58"/>
      <line x1="86" y1="66" x2="534" y2="66"/>
    </g>

    <!-- ===== I/O PANEL recessed plate ===== -->
    <rect x="70" y="92" width="480" height="104" rx="6" fill="url(#nuc-panel)" stroke="#000000" stroke-width="2"/>
    <rect x="73" y="95" width="474" height="98" rx="5" fill="none" stroke="#34383b" stroke-width="0.8" opacity="0.6"/>
    <!-- panel corner screws -->
    <circle cx="84" cy="104" r="4.5" fill="#2a2d30" stroke="#0a0b0c" stroke-width="1"/>
    <circle cx="536" cy="104" r="4.5" fill="#2a2d30" stroke="#0a0b0c" stroke-width="1"/>
    <circle cx="84" cy="184" r="4.5" fill="#2a2d30" stroke="#0a0b0c" stroke-width="1"/>
    <circle cx="536" cy="184" r="4.5" fill="#2a2d30" stroke="#0a0b0c" stroke-width="1"/>

    <!-- silkscreen port labels (decoration) -->
    <g font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#c7cbce" text-anchor="middle">
      <text x="150" y="116">ETH0</text>
      <text x="212" y="116">ETH1</text>
      <text x="274" y="116">ETH2</text>
      <text x="362" y="116">SFP0</text>
      <text x="432" y="116">SFP1</text>
    </g>

    <!-- decoration: ground / wifi-antenna / clear-CMOS holes (NOT in ports list) -->
    <circle cx="500" cy="138" r="6" fill="#0a0b0c" stroke="#34383b" stroke-width="1"/>
    <circle cx="500" cy="138" r="2.5" fill="#1c1e20"/>
    <circle cx="520" cy="156" r="4" fill="#0a0b0c" stroke="#34383b" stroke-width="0.8"/>
    <path d="M490 168 q6 -6 12 0" fill="none" stroke="#6d7276" stroke-width="1.2"/>
    <path d="M493 171 q3 -3 6 0" fill="none" stroke="#6d7276" stroke-width="1"/>

    <!-- brand silkscreen -->
    <text x="310" y="220" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10" letter-spacing="2" fill="#5a5e62">N150  MINI-PC</text>
  </g>
</svg>
`;var Rt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 200">
  <defs>
    <linearGradient id="gs-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#33373b"/>
      <stop offset="0.5" stop-color="#22262a"/>
      <stop offset="1" stop-color="#121417"/>
    </linearGradient>
    <linearGradient id="gs-panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a0b0c"/>
      <stop offset="0.5" stop-color="#15171a"/>
      <stop offset="1" stop-color="#050606"/>
    </linearGradient>
  </defs>

  <g class="chassis chassis-generic-small">
    <!-- body -->
    <rect x="10" y="20" width="400" height="160" rx="16" fill="url(#gs-body)" stroke="#050606" stroke-width="2"/>
    <rect x="14" y="24" width="392" height="3" rx="1.5" fill="#4a4f54" opacity="0.5"/>

    <!-- top vent slots -->
    <g fill="#0c0e10" stroke="#3a3f44" stroke-width="0.6" opacity="0.8">
      <rect x="150" y="36" width="120" height="5" rx="2.5"/>
      <rect x="150" y="48" width="120" height="5" rx="2.5"/>
      <rect x="150" y="60" width="120" height="5" rx="2.5"/>
    </g>

    <!-- power LED + button (decoration) -->
    <circle cx="48" cy="46" r="6" fill="#15171a" stroke="#0a0b0c" stroke-width="1"/>
    <circle cx="48" cy="46" r="2.6" fill="#2f8f4a"/>
    <circle cx="48" cy="150" r="9" fill="#1c1f22" stroke="#0a0b0c" stroke-width="1.2"/>
    <circle cx="48" cy="150" r="4" fill="#0e1012"/>

    <!-- I/O panel recess -->
    <rect x="78" y="118" width="284" height="64" rx="6" fill="url(#gs-panel)" stroke="#000000" stroke-width="2"/>
    <rect x="81" y="121" width="278" height="58" rx="5" fill="none" stroke="#34383b" stroke-width="0.8" opacity="0.6"/>

    <!-- brand silkscreen -->
    <text x="210" y="100" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" letter-spacing="2" fill="#5a5e62">DEVICE</text>
  </g>
</svg>
`;var Lt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 130">
  <defs>
    <linearGradient id="g1u-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34383c"/>
      <stop offset="0.5" stop-color="#23272b"/>
      <stop offset="1" stop-color="#131518"/>
    </linearGradient>
    <linearGradient id="g1u-ear" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34373a"/>
      <stop offset="1" stop-color="#16181a"/>
    </linearGradient>
    <linearGradient id="g1u-panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a0b0c"/>
      <stop offset="0.5" stop-color="#15171a"/>
      <stop offset="1" stop-color="#050606"/>
    </linearGradient>
  </defs>

  <g class="chassis chassis-generic-1u">
    <!-- mounting ears -->
    <rect x="0" y="6" width="24" height="118" rx="3" fill="url(#g1u-ear)" stroke="#0c0d0e" stroke-width="1"/>
    <rect x="976" y="6" width="24" height="118" rx="3" fill="url(#g1u-ear)" stroke="#0c0d0e" stroke-width="1"/>
    <circle cx="12" cy="22" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="12" cy="108" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="988" cy="22" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="988" cy="108" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>

    <!-- body -->
    <rect x="20" y="2" width="960" height="126" rx="5" fill="url(#g1u-body)" stroke="#0a0b0c" stroke-width="1.2"/>
    <line x1="24" y1="6.5" x2="976" y2="6.5" stroke="#4a4d50" stroke-width="1" opacity="0.5"/>

    <!-- left vent grille -->
    <g fill="#0c0e10" stroke="#3a3f44" stroke-width="0.5" opacity="0.8">
      <rect x="40"  y="30" width="8" height="70" rx="3"/>
      <rect x="56"  y="30" width="8" height="70" rx="3"/>
      <rect x="72"  y="30" width="8" height="70" rx="3"/>
      <rect x="88"  y="30" width="8" height="70" rx="3"/>
      <rect x="104" y="30" width="8" height="70" rx="3"/>
      <rect x="120" y="30" width="8" height="70" rx="3"/>
    </g>

    <!-- power button + status LEDs -->
    <circle cx="160" cy="48" r="9" fill="#1c1f22" stroke="#0a0b0c" stroke-width="1.2"/>
    <circle cx="160" cy="48" r="4" fill="#0e1012"/>
    <circle cx="156" cy="92" r="3" fill="#2f8f4a"/>
    <circle cx="168" cy="92" r="3" fill="#b9a13a"/>

    <!-- I/O panel recess (ports placed here) -->
    <rect x="260" y="33" width="480" height="66" rx="4" fill="url(#g1u-panel)" stroke="#000000" stroke-width="1.6"/>
    <rect x="262.5" y="35.5" width="475" height="61" rx="3" fill="none" stroke="#2a2d30" stroke-width="0.7" opacity="0.5"/>

    <!-- right label -->
    <text x="870" y="68" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="11" letter-spacing="2" fill="#5a5e62">1U SERVER</text>
  </g>
</svg>
`;var Dt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 260">
  <defs>
    <linearGradient id="g2u-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34383c"/>
      <stop offset="0.5" stop-color="#23272b"/>
      <stop offset="1" stop-color="#131518"/>
    </linearGradient>
    <linearGradient id="g2u-ear" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34373a"/>
      <stop offset="1" stop-color="#16181a"/>
    </linearGradient>
    <linearGradient id="g2u-panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a0b0c"/>
      <stop offset="0.5" stop-color="#15171a"/>
      <stop offset="1" stop-color="#050606"/>
    </linearGradient>
    <linearGradient id="g2u-sled" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2c3034"/>
      <stop offset="1" stop-color="#171a1d"/>
    </linearGradient>
  </defs>

  <g class="chassis chassis-generic-2u">
    <!-- mounting ears -->
    <rect x="0" y="6" width="24" height="248" rx="3" fill="url(#g2u-ear)" stroke="#0c0d0e" stroke-width="1"/>
    <rect x="976" y="6" width="24" height="248" rx="3" fill="url(#g2u-ear)" stroke="#0c0d0e" stroke-width="1"/>
    <circle cx="12" cy="24" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="12" cy="236" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="988" cy="24" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="988" cy="236" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>

    <!-- body -->
    <rect x="20" y="2" width="960" height="256" rx="6" fill="url(#g2u-body)" stroke="#0a0b0c" stroke-width="1.2"/>
    <line x1="24" y1="6.5" x2="976" y2="6.5" stroke="#4a4d50" stroke-width="1" opacity="0.5"/>

    <!-- front drive bays (single row of 12 sleds) -->
    <g>
      <rect x="40"  y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="110" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="180" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="250" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="320" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="390" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="460" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="530" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="600" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="670" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="740" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="810" y="22" width="62" height="128" rx="3" fill="url(#g2u-sled)" stroke="#0a0b0c" stroke-width="1"/>
    </g>
    <!-- sled handle slots + activity LEDs -->
    <g fill="#0c0e10">
      <rect x="46"  y="30" width="8" height="112" rx="2"/>
      <rect x="116" y="30" width="8" height="112" rx="2"/>
      <rect x="186" y="30" width="8" height="112" rx="2"/>
      <rect x="256" y="30" width="8" height="112" rx="2"/>
      <rect x="326" y="30" width="8" height="112" rx="2"/>
      <rect x="396" y="30" width="8" height="112" rx="2"/>
      <rect x="466" y="30" width="8" height="112" rx="2"/>
      <rect x="536" y="30" width="8" height="112" rx="2"/>
      <rect x="606" y="30" width="8" height="112" rx="2"/>
      <rect x="676" y="30" width="8" height="112" rx="2"/>
      <rect x="746" y="30" width="8" height="112" rx="2"/>
      <rect x="816" y="30" width="8" height="112" rx="2"/>
    </g>

    <!-- I/O panel recess (ports placed here) -->
    <rect x="260" y="175" width="480" height="66" rx="4" fill="url(#g2u-panel)" stroke="#000000" stroke-width="1.6"/>
    <rect x="262.5" y="177.5" width="475" height="61" rx="3" fill="none" stroke="#2a2d30" stroke-width="0.7" opacity="0.5"/>

    <!-- power button + LEDs -->
    <circle cx="900" cy="190" r="10" fill="#1c1f22" stroke="#0a0b0c" stroke-width="1.2"/>
    <circle cx="900" cy="190" r="4.5" fill="#0e1012"/>
    <circle cx="894" cy="222" r="3.4" fill="#2f8f4a"/>
    <circle cx="908" cy="222" r="3.4" fill="#b9a13a"/>
    <text x="150" y="210" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="12" letter-spacing="2" fill="#5a5e62">2U SERVER</text>
  </g>
</svg>
`;var jt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520">
  <defs>
    <linearGradient id="g4u-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34383c"/>
      <stop offset="0.5" stop-color="#23272b"/>
      <stop offset="1" stop-color="#131518"/>
    </linearGradient>
    <linearGradient id="g4u-ear" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#34373a"/>
      <stop offset="1" stop-color="#16181a"/>
    </linearGradient>
    <linearGradient id="g4u-panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a0b0c"/>
      <stop offset="0.5" stop-color="#15171a"/>
      <stop offset="1" stop-color="#050606"/>
    </linearGradient>
    <linearGradient id="g4u-sled" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2c3034"/>
      <stop offset="1" stop-color="#171a1d"/>
    </linearGradient>
    <pattern id="g4u-drives" width="80" height="86" patternUnits="userSpaceOnUse">
      <rect x="3" y="3" width="74" height="80" rx="3" fill="url(#g4u-sled)" stroke="#0a0b0c" stroke-width="1"/>
      <rect x="9" y="11" width="9" height="64" rx="2" fill="#0c0e10"/>
      <circle cx="68" cy="16" r="2.6" fill="#2f8f4a"/>
    </pattern>
  </defs>

  <g class="chassis chassis-generic-4u">
    <!-- mounting ears -->
    <rect x="0" y="6" width="24" height="508" rx="3" fill="url(#g4u-ear)" stroke="#0c0d0e" stroke-width="1"/>
    <rect x="976" y="6" width="24" height="508" rx="3" fill="url(#g4u-ear)" stroke="#0c0d0e" stroke-width="1"/>
    <circle cx="12" cy="26" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="12" cy="494" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="988" cy="26" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>
    <circle cx="988" cy="494" r="4" fill="#15171a" stroke="#0a0b0c" stroke-width="0.8"/>

    <!-- body -->
    <rect x="20" y="2" width="960" height="516" rx="6" fill="url(#g4u-body)" stroke="#0a0b0c" stroke-width="1.2"/>
    <line x1="24" y1="6.5" x2="976" y2="6.5" stroke="#4a4d50" stroke-width="1" opacity="0.5"/>

    <!-- front drive-bay grid -->
    <rect x="40" y="22" width="800" height="344" rx="4" fill="#0a0b0c" stroke="#000000" stroke-width="1.4"/>
    <rect x="42" y="24" width="800" height="344" fill="url(#g4u-drives)"/>

    <!-- power button + LEDs (right column) -->
    <circle cx="908" cy="60" r="11" fill="#1c1f22" stroke="#0a0b0c" stroke-width="1.2"/>
    <circle cx="908" cy="60" r="5" fill="#0e1012"/>
    <circle cx="908" cy="100" r="3.6" fill="#2f8f4a"/>
    <circle cx="908" cy="118" r="3.6" fill="#b9a13a"/>

    <!-- divider above I/O panel -->
    <line x1="40" y1="392" x2="960" y2="392" stroke="#000000" stroke-width="1" opacity="0.6"/>

    <!-- I/O panel recess (ports placed here) -->
    <rect x="260" y="418" width="480" height="72" rx="4" fill="url(#g4u-panel)" stroke="#000000" stroke-width="1.6"/>
    <rect x="262.5" y="420.5" width="475" height="67" rx="3" fill="none" stroke="#2a2d30" stroke-width="0.7" opacity="0.5"/>

    <text x="150" y="456" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" letter-spacing="2" fill="#5a5e62">4U SERVER</text>
  </g>
</svg>
`;function O(s){let e=s.match(/viewBox\s*=\s*["']([^"']+)["']/i),t=e?e[1]:"0 0 1000 130",r=s.replace(/^[\s\S]*?<svg\b[^>]*>/i,"").replace(/<\/svg\s*>\s*$/i,"").trim();return{viewBox:t,inner:r}}var Xr={"cisco-4500x":O(Tt),"hp-5700":O(Ct),"nuc-n150":O(Mt),"generic-small":O(Rt),"generic-1u":O(Lt),"generic-2u":O(Dt),"generic-4u":O(jt)};function Ht(s){return Xr[s]}var Ot=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 42">
  <defs>
    <linearGradient id="rj45-metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b7bdc3"/>
      <stop offset="0.5" stop-color="#8b9197"/>
      <stop offset="1" stop-color="#5d636a"/>
    </linearGradient>
    <linearGradient id="rj45-face" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a4046"/>
      <stop offset="1" stop-color="#23282d"/>
    </linearGradient>
    <linearGradient id="rj45-cavity" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0c0e10"/>
      <stop offset="1" stop-color="#202529"/>
    </linearGradient>
  </defs>

  <g class="port port-rj45">
    <!-- outer metal cage / shielding can -->
    <rect class="cage" x="2" y="2" width="44" height="38" rx="3" ry="3"
          fill="url(#rj45-metal)" stroke="#41464b" stroke-width="1"/>
    <!-- inner bevel highlight -->
    <rect x="3.4" y="3.4" width="41.2" height="35.2" rx="2.2" ry="2.2"
          fill="none" stroke="#d8dde1" stroke-width="0.7" opacity="0.5"/>

    <!-- dark plastic faceplate -->
    <rect x="5" y="5" width="38" height="32" rx="2" ry="2" fill="url(#rj45-face)"/>

    <!-- status LEDs (top corners) - recolored by the card via CSS -->
    <rect class="led led-link" x="7.5" y="7.5" width="6" height="3.6" rx="0.8" ry="0.8"
          fill="#3a3f44" stroke="#15181b" stroke-width="0.5"/>
    <rect class="led led-act"  x="34.5" y="7.5" width="6" height="3.6" rx="0.8" ry="0.8"
          fill="#3a3f44" stroke="#15181b" stroke-width="0.5"/>

    <!-- recessed keystone opening (dark interior) with top latch notch -->
    <path class="port-opening"
          d="M9 17 L19 17 L19 13 L29 13 L29 17 L39 17 L39 33 Q39 34 38 34 L10 34 Q9 34 9 33 Z"
          fill="url(#rj45-cavity)" stroke="#101315" stroke-width="0.8"/>
    <!-- inner shadow lip of the cavity -->
    <path d="M10.5 18.4 L19.9 18.4 L19.9 14.4 L28.1 14.4 L28.1 18.4 L37.5 18.4 L37.5 32.4 L10.5 32.4 Z"
          fill="none" stroke="#000000" stroke-width="0.6" opacity="0.6"/>

    <!-- gold contact fingers along the top inner wall -->
    <g fill="#d8b24a">
      <rect x="12.2" y="18.6" width="1.2" height="6.4" rx="0.4"/>
      <rect x="14.9" y="18.6" width="1.2" height="6.4" rx="0.4"/>
      <rect x="17.6" y="18.6" width="1.2" height="6.4" rx="0.4"/>
      <rect x="20.3" y="18.6" width="1.2" height="6.4" rx="0.4"/>
      <rect x="23.0" y="18.6" width="1.2" height="6.4" rx="0.4"/>
      <rect x="25.7" y="18.6" width="1.2" height="6.4" rx="0.4"/>
      <rect x="28.4" y="18.6" width="1.2" height="6.4" rx="0.4"/>
      <rect x="31.1" y="18.6" width="1.2" height="6.4" rx="0.4"/>
    </g>

    <!-- plug guide ridge / floor of the jack -->
    <rect x="14" y="30.5" width="20" height="2.6" rx="0.6" fill="#2c3236" opacity="0.8"/>
  </g>
</svg>
`;var Bt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 30">
  <defs>
    <linearGradient id="sfpCage" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6a7079"/>
      <stop offset="0.5" stop-color="#464b51"/>
      <stop offset="1" stop-color="#2b2f34"/>
    </linearGradient>
    <linearGradient id="sfpBezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3d4147"/>
      <stop offset="1" stop-color="#23262a"/>
    </linearGradient>
    <linearGradient id="sfpOpen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b0c0e"/>
      <stop offset="1" stop-color="#1d2024"/>
    </linearGradient>
  </defs>
  <g class="port port-sfp">
    <rect class="cage" x="2" y="2" width="52" height="26" rx="2.2" fill="url(#sfpCage)" stroke="#191c1f" stroke-width="0.8"/>
    <rect x="3.2" y="2.9" width="49.6" height="1.3" rx="0.65" fill="#8a9099" opacity="0.5"/>
    <rect class="cage" x="4" y="4" width="48" height="22" rx="1.6" fill="url(#sfpBezel)"/>
    <rect class="port-opening" x="6" y="9" width="44" height="12" rx="1.2" fill="url(#sfpOpen)" stroke="#070809" stroke-width="0.6"/>
    <rect x="7.4" y="10" width="1" height="10" rx="0.4" fill="#33373c" opacity="0.8"/>
    <rect x="47.6" y="10" width="1" height="10" rx="0.4" fill="#33373c" opacity="0.8"/>
    <rect x="14" y="17.4" width="28" height="2.6" rx="0.6" fill="#3a3f45"/>
    <g fill="#2a2e33">
      <rect x="11" y="9.6" width="1.1" height="1.4"/>
      <rect x="16" y="9.6" width="1.1" height="1.4"/>
      <rect x="21" y="9.6" width="1.1" height="1.4"/>
      <rect x="26" y="9.6" width="1.1" height="1.4"/>
      <rect x="31" y="9.6" width="1.1" height="1.4"/>
      <rect x="36" y="9.6" width="1.1" height="1.4"/>
      <rect x="41" y="9.6" width="1.1" height="1.4"/>
    </g>
    <rect class="led led-link" x="6" y="5" width="6" height="2.6" rx="1.2" fill="#3a3f44"/>
  </g>
</svg>
`;var It=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 36">
  <defs>
    <linearGradient id="qsfpCage" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6a7079"/>
      <stop offset="0.5" stop-color="#464b51"/>
      <stop offset="1" stop-color="#2b2f34"/>
    </linearGradient>
    <linearGradient id="qsfpBezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3d4147"/>
      <stop offset="1" stop-color="#23262a"/>
    </linearGradient>
    <linearGradient id="qsfpOpen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b0c0e"/>
      <stop offset="1" stop-color="#1d2024"/>
    </linearGradient>
  </defs>
  <g class="port port-qsfp">
    <rect class="cage" x="2" y="2" width="60" height="32" rx="2.6" fill="url(#qsfpCage)" stroke="#191c1f" stroke-width="0.9"/>
    <rect x="3.4" y="2.9" width="57.2" height="1.4" rx="0.7" fill="#8a9099" opacity="0.5"/>
    <rect class="cage" x="4" y="4" width="56" height="28" rx="2" fill="url(#qsfpBezel)"/>
    <rect class="port-opening" x="8" y="9" width="48" height="14" rx="1.4" fill="url(#qsfpOpen)" stroke="#070809" stroke-width="0.7"/>
    <rect x="9.6" y="10.2" width="1.1" height="11.6" rx="0.4" fill="#33373c" opacity="0.8"/>
    <rect x="53.3" y="10.2" width="1.1" height="11.6" rx="0.4" fill="#33373c" opacity="0.8"/>
    <rect x="17" y="19" width="30" height="2.8" rx="0.6" fill="#3a3f45"/>
    <g fill="#2a2e33">
      <rect x="14" y="9.7" width="1.2" height="1.5"/>
      <rect x="20" y="9.7" width="1.2" height="1.5"/>
      <rect x="26" y="9.7" width="1.2" height="1.5"/>
      <rect x="32" y="9.7" width="1.2" height="1.5"/>
      <rect x="38" y="9.7" width="1.2" height="1.5"/>
      <rect x="44" y="9.7" width="1.2" height="1.5"/>
      <rect x="50" y="9.7" width="1.2" height="1.5"/>
    </g>
    <rect class="led led-link" x="8" y="5" width="6.4" height="2.7" rx="1.3" fill="#3a3f44"/>
    <rect class="led lane lane-1" x="14.9" y="26.4" width="4.2" height="3.2" rx="0.8" fill="#3a3f44"/>
    <rect class="led lane lane-2" x="25.9" y="26.4" width="4.2" height="3.2" rx="0.8" fill="#3a3f44"/>
    <rect class="led lane lane-3" x="36.9" y="26.4" width="4.2" height="3.2" rx="0.8" fill="#3a3f44"/>
    <rect class="led lane lane-4" x="47.9" y="26.4" width="4.2" height="3.2" rx="0.8" fill="#3a3f44"/>
  </g>
</svg>
`;function je(s,e){let t=s.match(/viewBox\s*=\s*["']([^"']+)["']/i),r=t?t[1]:e,i=s.replace(/^[\s\S]*?<svg\b[^>]*>/i,"").replace(/<\/svg\s*>\s*$/i,"").trim();return{viewBox:r,inner:i}}var Zr={rj45:je(Ot,"0 0 48 42"),"sfp+":je(Bt,"0 0 56 30"),"qsfp+":je(It,"0 0 64 36")};function Ut(s){let e=Zr[s.type],t=s.cx-s.w/2,r=s.cy-s.h/2;return g`<svg
    class="port-instance port-${s.type.replace("+","p")} ${j(s.state)}"
    x=${t}
    y=${r}
    width=${s.w}
    height=${s.h}
    viewBox=${e.viewBox}
    preserveAspectRatio="xMidYMid meet"
    overflow="visible"
  >${be(e.inner)}</svg>`}var Jr=14,Nt=22,V=6,Vt=2,es=4,ts=13;function zt(s,e){return s<e/2}function He(s,e,t){return t?s-e/2-Vt-V:s+e/2+Vt}function rs(s,e,t,r,i,o){let n=s-t/2,l=He(e,r,o);if(i.kind==="access"&&i.color)return g`<rect class="vlan-band access" x=${n} y=${l} width=${t} height=${V} rx="1.5" fill=${i.color} />`;let a=i.colors.length?i.colors:["#7a828c"],h=t/a.length;return g`<g class="vlan-band trunk">
    <clipPath id=${`clip-${n.toFixed(1)}-${l.toFixed(1)}`}>
      <rect x=${n} y=${l} width=${t} height=${V} rx="1.5" />
    </clipPath>
    <g clip-path=${`url(#clip-${n.toFixed(1)}-${l.toFixed(1)})`}>
      ${a.map((f,d)=>g`<rect x=${n+d*h} y=${l} width=${h+.5} height=${V} fill=${f} />`)}
    </g>
    <rect x=${n} y=${l} width=${t} height=${V} rx="1.5" fill="none" class="vlan-band-outline" />
  </g>`}function Ft(s,e,t){let{instance:r,template:i,width:o,height:n,scale:l}=s,a=Ht(i.chassis??i.id),h=a?g`<svg
        class="chassis-art"
        x="0"
        y="0"
        width=${o}
        height=${n}
        viewBox=${a.viewBox}
        preserveAspectRatio="xMidYMid meet"
      >${be(a.inner)}</svg>`:g`<rect class="chassis-fallback" x="0" y="0" width=${o} height=${n} rx="8" />`,f=i.ports.map(d=>{let y=e.get(`${r.id}:${d.id}`)??"unknown",c=d.x*l,u=d.y*l,w=d.w*l,p=d.h*l,m=e.has(`${r.id}:${d.id}`),b=t.get(`${r.id}:${d.id}`),k=zt(u,n);return g`<g class="port-group ${m?"linked":"idle"}">
      ${m?g`<rect
            class="port-highlight ${j(y)}"
            x=${c-w/2-3}
            y=${u-p/2-3}
            width=${w+6}
            height=${p+6}
            rx="4"
          />`:x}
      ${Ut({type:d.type,cx:c,cy:u,w,h:p,state:y})}
      ${b&&b.kind!=="none"?rs(c,u,w,p,b,k):x}
    </g>`});return g`<g
    class="device device-${i.id}"
    transform="translate(${s.x} ${s.y})"
    data-device=${r.id}
  >
    ${h}
    ${f}
  </g>`}function Yt(s,e){let{instance:t,template:r,width:i,height:o,scale:n}=s,l=c=>c.length*7.6/2,a=15,h=[];for(let c of r.ports){if(!e.has(`${t.id}:${c.id}`)||!c.label)continue;let u=c.x*n,w=c.y*n,p=c.h*n,m=zt(w,o),b=m?He(w,p,!0)-es:He(w,p,!1)+V+ts;h.push({label:c.label,cx:u,half:l(c.label),baseY:b,above:m,y:b})}for(let c of[!0,!1]){let u=h.filter(p=>p.above===c).sort((p,m)=>p.cx-m.cx),w=[];for(let p of u){let m=0;for(;(w[m]??-1/0)>p.cx-p.half-6;)m++;p.y=p.baseY+(c?-1:1)*m*a,w[m]=p.cx+p.half}}let f=h.map(c=>g`<text
      class="port-label ${c.above?"above":"below"}"
      x=${c.cx}
      y=${c.y}
      text-anchor="middle"
    >${c.label}</text>`),d=t.name??r.label,y=g`<text
      class="device-caption"
      x=${i/2}
      y=${o+Jr+Nt}
      text-anchor="middle"
      font-size=${Nt}
    >${d}${t.mgmt_ip?g`<tspan class="device-ip" dx="10">${t.mgmt_ip}</tspan>`:x}</text>`;return g`<g
    class="device-text device-text-${r.id}"
    transform="translate(${s.x} ${s.y})"
    data-device-text=${t.id}
  >
    ${f}
    ${y}
  </g>`}var ne=18;function ss(s){return s.fanout?"QSFP+ 40G \u2192 4\xD710G":s.type==="lagg"?"LAGG":s.type==="trunk"?"TRUNK":""}var Oe=16;function qt(s){let e=[];for(let t of s){let r=t.stripes&&t.stripes.length>1;for(let i of t.cables){let o=i.fanoutLane?"lane":"bundle";if(e.push(g`<path class="cable-casing ${o}" d=${i.d} fill="none" />`),i.state==="up"&&r){e.push(g`<path class="cable ${o}" style=${`stroke:${t.color}`} d=${i.d} fill="none" />`);let n=t.stripes.length,l=`${Oe} ${Oe*(n-1)}`;t.stripes.forEach((a,h)=>{e.push(g`<path
            class="cable ${o}"
            style=${`stroke:${a};stroke-dasharray:${l};stroke-dashoffset:${-h*Oe};stroke-linecap:butt`}
            d=${i.d}
            fill="none"
          />`)})}else{let n=i.state==="up"?`stroke:${t.color}`:"";e.push(g`<path
          class="cable ${j(i.state)} ${o}"
          style=${n}
          d=${i.d}
          fill="none"
        />`)}}}return e}function is(s){return s.fanout||s.type==="lagg"||s.type==="trunk"}function Xt(s){let e=s.filter(is).map(r=>{let i=ss(r),o=Math.max(r.name.length,i.length)*ne*.62+28,n=i?ne*2.6:ne*1.8;return{r,sub:i,w:o,h:n,x:r.labelPos.x-o/2,y:r.labelPos.y-n/2}}),t=[];for(let r of[...e].sort((i,o)=>i.y-o.y)){let i=!0,o=0;for(;i&&o++<200;){i=!1;for(let n of t){let l=r.x<n.x+n.w+6&&n.x<r.x+r.w+6,a=r.y<n.y+n.h+4&&n.y<r.y+r.h+4;l&&a&&(r.y=n.y+n.h+6,i=!0)}}t.push(r)}return t.map(({r,sub:i,w:o,h:n,x:l,y:a})=>g`<g class="link-label ${j(r.state)}" transform="translate(${l} ${a})">
      <rect class="link-label-bg" x="0" y="0" width=${o} height=${n} rx="7" />
      <rect class="link-label-accent" x="0" y="0" width="6" height=${n} rx="3" style=${r.state==="up"?`fill:${r.color}`:""} />
      <text class="link-label-name" x=${o/2} y=${i?n*.42:n*.62} text-anchor="middle" font-size=${ne}>${r.name}</text>
      ${i?g`<text class="link-label-sub" x=${o/2} y=${n*.78} text-anchor="middle" font-size=${ne*.72}>${i}</text>`:g``}
    </g>`)}function Qt(s,e){if(e?.show===!1)return x;if(!s.vlans.length)return x;let t=e?.position??"top-right",r=e?.title??"VLANs",i=s.vlans.map(n=>n.color),o=`repeating-linear-gradient(90deg, ${i.map((n,l)=>`${n} ${l*(100/i.length)}%, ${n} ${(l+1)*(100/i.length)}%`).join(", ")})`;return P`
    <div class="ntc-legend ntc-legend-${t}">
      <div class="ntc-legend-title">${r}</div>
      ${s.vlans.map(n=>P`<div class="ntc-legend-row">
          <span class="ntc-legend-swatch" style=${`background:${n.color}`}></span>
          <span class="ntc-legend-id">VLAN ${n.id}</span>
          ${n.name?P`<span class="ntc-legend-name">${n.name}</span>`:x}
        </div>`)}
      <div class="ntc-legend-row">
        <span class="ntc-legend-swatch" style=${`background:${o}`}></span>
        <span class="ntc-legend-id">Trunk</span>
        <span class="ntc-legend-name">all / tagged</span>
      </div>
    </div>
  `}var Wt=60,Kt=70,os=80,Zt=28,ns="#22c55e";function ls(s,e){let t=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s.trim());if(!t)return s;let r=t[1];r.length===3&&(r=r.split("").map(a=>a+a).join(""));let i=parseInt(r,16),o=i>>16&255,n=i>>8&255,l=i&255;return`rgba(${o}, ${n}, ${l}, ${e})`}function Jt(s,e,t){let r=new Map(e.map(o=>[o.instance.id,o])),i=[];for(let o of s){let n=o.devices.map(p=>r.get(p)).filter(p=>!!p);if(n.length===0)continue;let l=1/0,a=1/0,h=-1/0,f=-1/0;for(let p of n)l=Math.min(l,p.x),a=Math.min(a,p.y),h=Math.max(h,p.x+p.width),f=Math.max(f,p.y+p.height);let d=o.color??(o.vlan!=null?t.color(o.vlan):ns),y=l-Wt,c=a-Kt,u=h-l+Wt*2,w=f-a+Kt+os;i.push(g`<g class="ntc-group" data-group=${o.id}>
      <rect
        class="ntc-group-box"
        x=${y}
        y=${c}
        width=${u}
        height=${w}
        rx="20"
        fill=${ls(d,.1)}
        stroke=${d}
      />
      ${o.name?g`<text
            class="ntc-group-title"
            x=${y+26}
            y=${c+Zt+8}
            font-size=${Zt}
            fill=${d}
          >${o.name}</text>`:x}
    </g>`)}return i}var as="0.1.2",S=class extends T{constructor(){super(...arguments);this._view={scale:1,tx:0,ty:0};this._devices=[];this._route={renders:[],portStates:new Map};this._vlanCtx=new ie([]);this._vlanStates=new Map;this._viewBox="0 0 1000 600";this._dragging=!1;this._lastPointer=null;this._resetView=()=>{this._view={scale:1,tx:0,ty:0}};this._onWheel=t=>{t.preventDefault();let r=t.deltaY<0?1.12:1/1.12,i=Math.min(6,Math.max(.3,this._view.scale*r)),n=t.currentTarget.getBoundingClientRect(),l=t.clientX-n.left,a=t.clientY-n.top,h=i/this._view.scale;this._view={scale:i,tx:l-(l-this._view.tx)*h,ty:a-(a-this._view.ty)*h}};this._onPointerDown=t=>{this._dragging=!0,this._lastPointer={x:t.clientX,y:t.clientY},t.currentTarget.setPointerCapture?.(t.pointerId),this.requestUpdate()};this._onPointerMove=t=>{if(!this._dragging||!this._lastPointer)return;let r=t.clientX-this._lastPointer.x,i=t.clientY-this._lastPointer.y;this._lastPointer={x:t.clientX,y:t.clientY},this._view={...this._view,tx:this._view.tx+r,ty:this._view.ty+i}};this._onPointerUp=t=>{this._dragging=!1,this._lastPointer=null,t.currentTarget.releasePointerCapture?.(t.pointerId),this.requestUpdate()}}setConfig(t){if(!t||!Array.isArray(t.devices)||t.devices.length===0)throw new Error("network-topology-card: `devices` must be a non-empty list");for(let r of t.devices)if(!r.id||!r.template)throw new Error("network-topology-card: each device needs an `id` and a `template`");this._config=t,this._error=void 0,this._compute()}_compute(){if(this._config)try{let t=wt(this._config.templates??[]),r=this._config.layout??{};this._devices=bt(this._config.devices,t,r.device_scale??1),this._vlanCtx=new ie(this._config.vlans??[]),this._vlanStates=new Map;for(let d of this._config.devices)if(d.vlans)for(let[y,c]of Object.entries(d.vlans))this._vlanStates.set(`${d.id}:${y}`,this._vlanCtx.resolve(c));this._computeRoute();let i=kt(this._devices),o=r.padding??90,n=70,l=i.minX-o,a=i.minY-o,h=i.maxX-i.minX+o*2,f=i.maxY-i.minY+o*2+n;this._viewBox=`${l} ${a} ${h} ${f}`,this._error=void 0}catch(t){this._error=t instanceof Error?t.message:String(t)}}willUpdate(t){t.has("hass")&&this._config&&this._computeRoute()}_computeRoute(){this._config&&(this._route=At(this._config.links??[],this._devices,this._config.layout?.link_curvature??.45,this.hass,t=>this._linkColor(t),(t,r)=>this._portState(t,r)))}_portState(t,r){let i=this._config?.devices.find(o=>o.id===t);if(i)return _t(i,r,this.hass)}_linkColor(t){let r=[];for(let l of t.endpoints)for(let a of l.ports){let h=this._vlanStates.get(`${l.device}:${String(a)}`);h&&h.kind!=="none"&&r.push(h)}if(r.length===0)return{color:ge};let i=r.every(l=>l.kind==="access"),o=new Set;for(let l of r)for(let a of l.ids)o.add(String(a));if(i&&o.size===1)return{color:this._vlanCtx.color([...o][0])};let n=[...o].map(l=>this._vlanCtx.color(l));return{color:ge,stripes:n}}render(){if(this._error)return P`<ha-card class="ntc-card"><div class="ntc-error">network-topology-card error:\n${this._error}</div></ha-card>`;if(!this._config)return x;let t=Jt(this._config.groups??[],this._devices,this._vlanCtx),r=qt(this._route.renders),i=this._devices.map(f=>Ft(f,this._route.portStates,this._vlanStates)),o=this._devices.map(f=>Yt(f,this._route.portStates)),n=Xt(this._route.renders),{scale:l,tx:a,ty:h}=this._view;return P`
      <ha-card class="ntc-card">
        ${this._config.title?P`<div class="ntc-header">
              <span>${this._config.title}</span>
              <span class="ntc-tools">
                <button title="Reset view" @click=${this._resetView}>\u2302</button>
              </span>
            </div>`:x}
        <div class="ntc-stage">
          <svg
            class="ntc-canvas ${this._dragging?"dragging":""}"
            viewBox=${this._viewBox}
            @wheel=${this._onWheel}
            @pointerdown=${this._onPointerDown}
            @pointermove=${this._onPointerMove}
            @pointerup=${this._onPointerUp}
            @pointercancel=${this._onPointerUp}
          >
            <g transform="translate(${a} ${h}) scale(${l})">
              ${g`${t}`} ${g`${i}`} ${g`${r}`}
              ${g`${o}`} ${g`${n}`}
            </g>
          </svg>
          ${Qt(this._vlanCtx,this._config.legend)}
        </div>
      </ha-card>
    `}getCardSize(){return 8}getGridOptions(){return{rows:8,columns:12,min_rows:4}}};S.styles=$e`
    :host {
      --ntc-up: #36d17a;
      --ntc-down: #f0464a;
      --ntc-disabled: #7a828c;
      --ntc-flap: #facc15;
      --ntc-idle: #3a3f44;
      --ntc-act: #f2b53a;
      --ntc-cable-casing: rgba(0, 0, 0, 0.6);
      --ntc-label-bg: rgba(28, 32, 38, 0.92);
      --ntc-label-fg: #f4f6f8;
      --ntc-caption: var(--primary-text-color, #e7eaee);
      --ntc-ip: var(--secondary-text-color, #9aa3ad);
      --ntc-text-halo: var(--ha-card-background, var(--card-background-color, #1c2026));
      display: block;
    }
    ha-card,
    .ntc-card {
      display: block;
      height: 100%;
      overflow: hidden;
      background: var(--ha-card-background, var(--card-background-color, #1c2026));
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .ntc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px 4px;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--ntc-caption);
    }
    .ntc-tools {
      display: flex;
      gap: 6px;
    }
    .ntc-tools button {
      cursor: pointer;
      border: none;
      border-radius: 6px;
      width: 26px;
      height: 26px;
      font-size: 15px;
      line-height: 1;
      background: rgba(255, 255, 255, 0.08);
      color: var(--ntc-caption);
    }
    .ntc-tools button:hover {
      background: rgba(255, 255, 255, 0.18);
    }
    .ntc-stage {
      position: relative;
    }
    .ntc-canvas {
      width: 100%;
      display: block;
      touch-action: none;
      cursor: grab;
      background:
        radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.04), transparent 70%),
        var(--ha-card-background, var(--card-background-color, #1c2026));
    }
    .ntc-canvas.dragging {
      cursor: grabbing;
    }
    .ntc-error {
      padding: 16px;
      color: var(--error-color, #f0464a);
      font-family: monospace;
      white-space: pre-wrap;
    }

    .chassis-fallback {
      fill: #2a2f36;
      stroke: #444b54;
      stroke-width: 2;
    }

    /* Port status LEDs (overridden by class on the nested port <svg>). */
    .port-instance .led-link,
    .port-instance .led-act,
    .port-instance .lane {
      transition: fill 0.2s ease;
    }
    .port-instance.state-up .led-link,
    .port-instance.state-up .lane {
      fill: var(--ntc-up);
    }
    .port-instance.state-down .led-link {
      fill: var(--ntc-down);
    }
    .port-instance.state-disabled .led-link {
      fill: var(--ntc-disabled);
    }
    .port-instance.state-flapping .led-link {
      fill: var(--ntc-flap);
      animation: ntc-flap-pulse 1s ease-in-out infinite;
    }
    .port-instance.state-unknown .led-link,
    .port-instance .lane {
      fill: var(--ntc-idle);
    }
    .port-instance.state-up .led-act {
      fill: var(--ntc-act);
    }
    .port-instance .led-act {
      fill: var(--ntc-idle);
    }

    .port-highlight {
      fill: none;
      stroke-width: 2;
      opacity: 0.85;
    }
    .port-highlight.state-up {
      stroke: var(--ntc-up);
    }
    .port-highlight.state-down {
      stroke: var(--ntc-down);
    }
    .port-highlight.state-disabled {
      stroke: var(--ntc-disabled);
    }
    .port-highlight.state-flapping {
      stroke: var(--ntc-flap);
      animation: ntc-flap-pulse 1s ease-in-out infinite;
    }
    .port-highlight.state-unknown {
      stroke: var(--ntc-idle);
    }
    @keyframes ntc-flap-pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }
    .port-label {
      fill: var(--ntc-caption);
      font-size: 13px;
      font-weight: 600;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      paint-order: stroke fill;
      stroke: var(--ntc-text-halo);
      stroke-width: 3.5px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    .device-caption {
      fill: var(--ntc-caption);
      font-weight: 600;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      paint-order: stroke fill;
      stroke: var(--ntc-text-halo);
      stroke-width: 4px;
      stroke-linejoin: round;
    }
    .device-ip {
      fill: var(--ntc-ip);
      font-weight: 400;
      stroke: none;
    }

    .cable {
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .cable.bundle {
      stroke-width: 7;
    }
    .cable.lane {
      stroke-width: 4;
    }
    .cable.state-up {
      stroke: var(--ntc-up);
    }
    .cable.state-down {
      stroke: var(--ntc-down);
    }
    .cable.state-disabled {
      stroke: var(--ntc-disabled);
    }
    .cable.state-flapping {
      stroke: var(--ntc-flap);
      animation: ntc-flap-pulse 1.1s ease-in-out infinite;
    }
    .cable.state-unknown {
      stroke: var(--ntc-idle);
    }
    .cable-casing {
      stroke: var(--ntc-cable-casing);
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .cable-casing.bundle {
      stroke-width: 11;
    }
    .cable-casing.lane {
      stroke-width: 7;
    }

    .link-label-bg {
      fill: var(--ntc-label-bg);
      stroke: rgba(255, 255, 255, 0.12);
      stroke-width: 1;
    }
    .link-label-name {
      fill: var(--ntc-label-fg);
      font-weight: 700;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .link-label-sub {
      fill: var(--ntc-ip);
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .link-label.state-up .link-label-accent {
      fill: var(--ntc-up);
    }
    .link-label.state-down .link-label-accent {
      fill: var(--ntc-down);
    }
    .link-label.state-disabled .link-label-accent {
      fill: var(--ntc-disabled);
    }
    .link-label.state-flapping .link-label-accent {
      fill: var(--ntc-flap);
    }
    .link-label.state-unknown .link-label-accent {
      fill: var(--ntc-idle);
    }

    .vlan-band-outline {
      stroke: rgba(0, 0, 0, 0.55);
      stroke-width: 0.6;
    }

    /* Group/zone boxes drawn behind the devices. */
    .ntc-group-box {
      stroke-width: 3;
      stroke-dasharray: 14 10;
      stroke-linejoin: round;
    }
    .ntc-group-title {
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      opacity: 0.95;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }

    /* VLAN legend overlay (pinned to a canvas corner, ignores pan/zoom). */
    .ntc-legend {
      position: absolute;
      z-index: 2;
      min-width: 132px;
      padding: 8px 10px;
      border-radius: 9px;
      background: var(--ntc-label-bg);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--ntc-label-fg);
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      font-size: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(2px);
    }
    .ntc-legend-top-right {
      top: 12px;
      right: 12px;
    }
    .ntc-legend-top-left {
      top: 12px;
      left: 12px;
    }
    .ntc-legend-bottom-right {
      bottom: 12px;
      right: 12px;
    }
    .ntc-legend-bottom-left {
      bottom: 12px;
      left: 12px;
    }
    .ntc-legend-title {
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 6px;
      opacity: 0.85;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
    .ntc-legend-row {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 2px 0;
      line-height: 1.3;
    }
    .ntc-legend-swatch {
      flex: 0 0 auto;
      width: 16px;
      height: 10px;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
    .ntc-legend-id {
      font-weight: 600;
      white-space: nowrap;
    }
    .ntc-legend-name {
      color: var(--ntc-ip);
      white-space: nowrap;
    }
  `,B([fe({attribute:!1})],S.prototype,"hass",2),B([ye()],S.prototype,"_config",2),B([ye()],S.prototype,"_error",2),B([ye()],S.prototype,"_view",2),S=B([lt("network-topology-card")],S);window.customCards=window.customCards||[];window.customCards.push({type:"network-topology-card",name:"Network Topology Card",preview:!1,description:"Renders a network topology with composited SVG device chassis, per-port status, and auto-drawn LAGG/trunk/QSFP+ fan-out links.",documentationURL:"https://github.com/biscuitWizard/network-topology-card"});console.info(`%c network-topology-card %c v${as} `,"color:#fff;background:#2b6cb0;border-radius:3px 0 0 3px;padding:2px 4px","color:#2b6cb0;background:#e2e8f0;border-radius:0 3px 3px 0;padding:2px 4px");export{S as NetworkTopologyCard};
//# sourceMappingURL=network-topology-card.js.map
