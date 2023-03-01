(()=>{"use strict";const t="object"==typeof HTMLElement,e="undefined"!=typeof ShadowRoot;function s(s){return!!(e&&s instanceof ShadowRoot)||(t?s instanceof HTMLElement:s&&"object"==typeof s&&null!==s&&1===s.nodeType&&"string"==typeof s.nodeName)}function i(t,e){e.forEach((function(e){t.classList.add(e)}))}function n(t,e){e.forEach((function(e){t.classList.remove(e)}))}function o(){throw new Error("Missing parameter")}const l="undefined"!=typeof document&&"animation"in document.createElement("div").style;class r{constructor(t={}){this._sizeImgWrapperEl=this._sizeImgWrapperEl.bind(this),this.showNext=this.showNext.bind(this),this.showPrevious=this.showPrevious.bind(this),this._completeOpen=this._completeOpen.bind(this),this._completeClose=this._completeClose.bind(this),this._handleKeydown=this._handleKeydown.bind(this),this._handleClose=this._handleClose.bind(this);const{namespace:e=null,parentEl:i=o(),triggerEl:n=o(),sourceAttribute:l=o(),caption:r=null,includeImgixJSClass:h=!1,_gallery:a=null,_arrowNavigation:g=null,closeButtonEnabled:c=!0,closeTrigger:d="click"}=t;if(this.settings={namespace:e,parentEl:i,triggerEl:n,sourceAttribute:l,caption:r,includeImgixJSClass:h,_gallery:a,_arrowNavigation:g,closeButtonEnabled:c,onClose:t.onClose,closeTrigger:d},!s(this.settings.parentEl))throw new TypeError("`new Lightbox` requires a DOM element passed as `parentEl`.");this.currentTrigger=this.settings.triggerEl,this.openClasses=this._buildClasses("open"),this.openingClasses=this._buildClasses("opening"),this.closingClasses=this._buildClasses("closing"),this.hasBeenLoaded=!1,this.elementBuilt=!1}_handleClose(t){t&&"function"==typeof t.preventDefault&&t.preventDefault();const e=this.settings.onClose;e&&"function"==typeof e&&e()}_bindEventListeners(){this.el.addEventListener(this.settings.closeTrigger,this._handleClose),this.closeButtonEl&&this.closeButtonEl.addEventListener("click",this._handleClose)}_buildClasses(t){const e=[`lum-${t}`],s=this.settings.namespace;return s&&e.push(`${s}-${t}`),e}_buildElement(){this.el=document.createElement("div"),i(this.el,this._buildClasses("lightbox")),this.innerEl=document.createElement("div"),i(this.innerEl,this._buildClasses("lightbox-inner")),this.el.appendChild(this.innerEl);const t=document.createElement("div");i(t,this._buildClasses("lightbox-loader")),this.innerEl.appendChild(t),this.imgWrapperEl=document.createElement("div"),i(this.imgWrapperEl,this._buildClasses("lightbox-image-wrapper")),this.innerEl.appendChild(this.imgWrapperEl);const e=document.createElement("span");i(e,this._buildClasses("lightbox-position-helper")),this.imgWrapperEl.appendChild(e),this.imgEl=document.createElement("img"),i(this.imgEl,this._buildClasses("img")),e.appendChild(this.imgEl),this.captionEl=document.createElement("p"),i(this.captionEl,this._buildClasses("lightbox-caption")),e.appendChild(this.captionEl),this.settings.closeButtonEnabled&&(this.closeButtonEl=document.createElement("button"),this.closeButtonEl.type="button",i(this.closeButtonEl,this._buildClasses("close-button")),this.el.appendChild(this.closeButtonEl)),this.settings._gallery&&this._setUpGalleryElements(),this.settings.parentEl.appendChild(this.el),this._updateImgSrc(),this._updateCaption(),this.settings.includeImgixJSClass&&this.imgEl.classList.add("imgix-fluid")}_setUpGalleryElements(){this._buildGalleryButton("previous",this.showPrevious),this._buildGalleryButton("next",this.showNext)}_buildGalleryButton(t,e){const s=document.createElement("button");this[`${t}Button`]=s,s.innerText=t,i(s,this._buildClasses(`${t}-button`)),i(s,this._buildClasses("gallery-button")),this.innerEl.appendChild(s),s.addEventListener("click",(t=>{t.stopPropagation(),e()}),!1)}_sizeImgWrapperEl(){const t=this.imgWrapperEl.style;t.width=`${this.innerEl.clientWidth}px`,t.maxWidth=`${this.innerEl.clientWidth}px`,t.height=this.innerEl.clientHeight-this.captionEl.clientHeight+"px",t.maxHeight=this.innerEl.clientHeight-this.captionEl.clientHeight+"px"}_updateCaption(){const t=typeof this.settings.caption;let e="";"string"===t?e=this.settings.caption:"function"===t&&(e=this.settings.caption(this.currentTrigger)),this.captionEl.innerHTML=e}_updateImgSrc(){const t=this.currentTrigger.getAttribute(this.settings.sourceAttribute);if(!t)throw new Error(`No image URL was found in the ${this.settings.sourceAttribute} attribute of the trigger.`);const e=this._buildClasses("loading");this.hasBeenLoaded||i(this.el,e),this.imgEl.onload=()=>{n(this.el,e),this.hasBeenLoaded=!0},this.imgEl.setAttribute("src",t)}_handleKeydown(t){37==t.keyCode?this.showPrevious():39==t.keyCode&&this.showNext()}showNext(){this.settings._gallery&&(this.currentTrigger=this.settings._gallery.nextTrigger(this.currentTrigger),this._updateImgSrc(),this._updateCaption(),this._sizeImgWrapperEl(),this.settings._gallery.onChange({imgEl:this.imgEl}))}showPrevious(){this.settings._gallery&&(this.currentTrigger=this.settings._gallery.previousTrigger(this.currentTrigger),this._updateImgSrc(),this._updateCaption(),this._sizeImgWrapperEl(),this.settings._gallery.onChange({imgEl:this.imgEl}))}open(){this.elementBuilt||(this._buildElement(),this._bindEventListeners(),this.elementBuilt=!0),this.currentTrigger=this.settings.triggerEl,this._updateImgSrc(),this._updateCaption(),i(this.el,this.openClasses),this._sizeImgWrapperEl(),window.addEventListener("resize",this._sizeImgWrapperEl,!1),this.settings._arrowNavigation&&window.addEventListener("keydown",this._handleKeydown,!1),l&&(this.el.addEventListener("animationend",this._completeOpen,!1),i(this.el,this.openingClasses))}close(){window.removeEventListener("resize",this._sizeImgWrapperEl,!1),this.settings._arrowNavigation&&window.removeEventListener("keydown",this._handleKeydown,!1),l?(this.el.addEventListener("animationend",this._completeClose,!1),i(this.el,this.closingClasses)):n(this.el,this.openClasses)}_completeOpen(){this.el.removeEventListener("animationend",this._completeOpen,!1),n(this.el,this.openingClasses)}_completeClose(){this.el.removeEventListener("animationend",this._completeClose,!1),n(this.el,this.openClasses),n(this.el,this.closingClasses)}destroy(){this.el&&this.settings.parentEl.removeChild(this.el)}}class h{constructor(t,e={}){if(this.VERSION="2.4.0",this.destroy=this.destroy.bind(this),this.open=this.open.bind(this),this.close=this.close.bind(this),this._handleKeyup=this._handleKeyup.bind(this),this.isOpen=!1,this.trigger=t,!s(this.trigger))throw new TypeError("`new Luminous` requires a DOM element as its first argument.");let i=document;"getRootNode"in this.trigger&&(i=this.trigger.getRootNode());const n=e.namespace||null,o=e.sourceAttribute||"href",l=e.caption||null,r=e.openTrigger||"click",h=e.closeTrigger||"click",a=!("closeWithEscape"in e)||!!e.closeWithEscape,g=e.closeOnScroll||!1,c=null==e.showCloseButton||e.showCloseButton,d=e.appendToNode||(i===document?document.body:i),p=e.appendToSelector||null,u=e.onOpen||null,m=e.onClose||null,E=e.includeImgixJSClass||!1,y=!("injectBaseStyles"in e)||!!e.injectBaseStyles,b=e._gallery||null,_=e._arrowNavigation||null;this.settings={namespace:n,sourceAttribute:o,caption:l,openTrigger:r,closeTrigger:h,closeWithEscape:a,closeOnScroll:g,closeButtonEnabled:c,appendToNode:d,appendToSelector:p,onOpen:u,onClose:m,includeImgixJSClass:E,injectBaseStyles:y,_gallery:b,_arrowNavigation:_};let C=document.body;d&&"getRootNode"in d&&(C=d.getRootNode()),this.settings.injectBaseStyles&&function(t){if(t&&t!==document||(t=document.head),t.querySelector(".lum-base-styles"))return;const e=document.createElement("style");e.type="text/css",e.classList.add("lum-base-styles"),e.appendChild(document.createTextNode("@keyframes lum-noop{0%{zoom:1}}.lum-lightbox{position:fixed;display:none;top:0;right:0;bottom:0;left:0}.lum-lightbox.lum-open{display:block}.lum-lightbox.lum-closing,.lum-lightbox.lum-opening{animation:lum-noop 1ms}.lum-lightbox-inner{position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden}.lum-lightbox-loader{display:none}.lum-lightbox-inner img{max-width:100%;max-height:100%}.lum-lightbox-image-wrapper{vertical-align:middle;display:table-cell;text-align:center}")),t.insertBefore(e,t.firstChild)}(C),this._buildLightbox(),this._bindEventListeners()}open(t){t&&"function"==typeof t.preventDefault&&t.preventDefault(),this.lightbox.open(),this.settings.closeOnScroll&&window.addEventListener("scroll",this.close,!1);const e=this.settings.onOpen;e&&"function"==typeof e&&e(),this.isOpen=!0}close(t){this.settings.closeOnScroll&&window.removeEventListener("scroll",this.close,!1),this.lightbox.close();const e=this.settings.onClose;e&&"function"==typeof e&&e(),this.isOpen=!1}_buildLightbox(){let t=this.settings.appendToNode;this.settings.appendToSelector&&(t=document.querySelector(this.settings.appendToSelector)),this.lightbox=new r({namespace:this.settings.namespace,parentEl:t,triggerEl:this.trigger,sourceAttribute:this.settings.sourceAttribute,caption:this.settings.caption,includeImgixJSClass:this.settings.includeImgixJSClass,closeButtonEnabled:this.settings.closeButtonEnabled,_gallery:this.settings._gallery,_arrowNavigation:this.settings._arrowNavigation,closeTrigger:this.settings.closeTrigger,onClose:this.close})}_bindEventListeners(){this.trigger.addEventListener(this.settings.openTrigger,this.open,!1),this.settings.closeWithEscape&&window.addEventListener("keyup",this._handleKeyup,!1)}_unbindEvents(){this.trigger.removeEventListener(this.settings.openTrigger,this.open,!1),this.lightbox.el&&this.lightbox.el.removeEventListener(this.settings.closeTrigger,this.close,!1),this.settings.closeWithEscape&&window.removeEventListener("keyup",this._handleKeyup,!1)}_handleKeyup(t){this.isOpen&&27===t.keyCode&&this.close()}destroy(){this._unbindEvents(),this.lightbox.destroy()}}h.prototype.open=h.prototype.open,h.prototype.close=h.prototype.close,h.prototype.destroy=h.prototype.destroy;class a{constructor(t,e={},s={}){this.settings=Object.assign({},{arrowNavigation:!0,onChange:null},e),this.triggers=t,this.luminousOpts=s,this.luminousOpts._gallery=this,this.luminousOpts._arrowNavigation=this.settings.arrowNavigation,this._constructLuminousInstances()}_constructLuminousInstances(){this.luminousInstances=[];const t=this.triggers.length;for(let e=0;e<t;e++){const t=this.triggers[e],s=new h(t,this.luminousOpts);this.luminousInstances.push(s)}}nextTrigger(t){const e=Array.prototype.indexOf.call(this.triggers,t)+1;return e>=this.triggers.length?this.triggers[0]:this.triggers[e]}previousTrigger(t){const e=Array.prototype.indexOf.call(this.triggers,t)-1;return e<0?this.triggers[this.triggers.length-1]:this.triggers[e]}onChange({imgEl:t}){const e=this.settings.onChange;e&&"function"==typeof e&&e({imgEl:t})}destroy(){this.luminousInstances.forEach((t=>t.destroy()))}}a.prototype.destroy=a.prototype.destroy,function(){const t=t=>{t?document.body.classList.remove("js-navbar-open"):document.body.classList.remove("js-navbar-close")},e=window.matchMedia("(min-width: 960px)");e.addEventListener("change",(e=>{t(e.matches)})),t(e.matches),document.querySelector(".toggle-navbar").addEventListener("click",(()=>{e.matches?document.body.classList.toggle("js-navbar-close"):document.body.classList.toggle("js-navbar-open")}))}(),function(){const t=document.querySelectorAll(".uig-gallery");t.length>0&&[].slice.call(t).forEach((t=>{const e=t.querySelectorAll(".uig-gallery__thumb > a"),s=t.querySelectorAll(".uig-gallery__image");[].slice.call(s).forEach(((t,s)=>{const i=t.querySelector("img");if(i){const t=i.cloneNode();e[s].appendChild(t)}else e[s].prepend(s+1)}))}))}();const g=document.querySelectorAll(".popup-img"),c={caption:function(t){return t.querySelector("img").getAttribute("alt")}};null!==g&&(g.length>1?new a(g,{},c):new h(g[0],c))})();