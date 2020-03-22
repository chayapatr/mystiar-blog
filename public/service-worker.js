try{self["workbox:core:5.1.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.1"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const r=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class c{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let r,c=i&&i.handler;if(!c&&this.s&&(c=this.s),c){try{r=c.handle({url:s,request:e,event:t,params:n})}catch(e){r=Promise.reject(e)}return r instanceof Promise&&this.i&&(r=r.catch(n=>this.i.handle({url:s,request:e,event:t}))),r}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const r=i.match({url:e,request:t,event:s});if(r)return n=r,(Array.isArray(r)&&0===r.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"==typeof r)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let a;const o=()=>(a||(a=new c,a.addFetchListener(),a.addCacheListener()),a);const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[f.prefix,e,f.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||u(f.precache),l=e=>e||u(f.runtime),d=new Set;const w=(e,t)=>e.filter(e=>t in e),p=async({request:e,mode:t,plugins:s=[]})=>{const n=w(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},g=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const r=await self.caches.open(e),c=await p({plugins:i,request:t,mode:"read"});let a=await r.match(c,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;a=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:a,request:c})}return a},y=async({cacheName:e,request:s,response:n,event:i,plugins:c=[],matchOptions:a})=>{const o=await p({plugins:c,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:r(o.url)});const f=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,r=!1;for(const t of n)if("cacheWillUpdate"in t){r=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return r||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:c,response:n,request:o});if(!f)return;const u=await self.caches.open(e),h=w(c,"cacheDidUpdate"),l=h.length>0?await g({cacheName:e,matchOptions:a,request:o}):null;try{await u.put(o,f)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:l,newResponse:f,request:o})},m=g,b=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=w(i,"fetchDidFail"),c=r.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const a=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:a,response:t}));return t}catch(e){for(const t of r)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:a.clone()});throw e}};try{self["workbox:strategies:5.1.1"]&&_()}catch(e){}let v;async function R(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,r=function(){if(void 0===v){const e=new Response("");if("body"in e)try{new Response(e.body),v=!0}catch(e){v=!1}v=!1}return v}()?s.body:await s.blob();return new Response(r,i)}try{self["workbox:precaching:5.1.1"]&&_()}catch(e){}function q(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:r.href}}class x{constructor(e){this.o=h(e),this.u=new Map,this.h=new Map,this.l=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=q(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.u.has(i)&&this.u.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.u.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.l.has(e)&&this.l.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.l.set(e,n.integrity)}if(this.u.set(i,e),this.h.set(i,r),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.o),r=await i.keys(),c=new Set(r.map(e=>e.url));for(const[e,t]of this.u)c.has(t)?n.push(e):s.push({cacheKey:t,url:e});const a=s.map(({cacheKey:s,url:n})=>{const i=this.l.get(s),r=this.h.get(n);return this.p({cacheKey:s,cacheMode:r,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(a),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.o),t=await e.keys(),s=new Set(this.u.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async p({cacheKey:e,url:s,cacheMode:n,event:i,plugins:r,integrity:c}){const a=new Request(s,{integrity:c,cache:n,credentials:"same-origin"});let o,f=await b({event:i,plugins:r,request:a});for(const e of r||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:a,response:f}):f.status<400))throw new t("bad-precaching-response",{url:s,status:f.status});f.redirected&&(f=await R(f)),await y({event:i,plugins:r,response:f,request:e===s?a:new Request(e),cacheName:this.o,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.u}getCachedURLs(){return[...this.u.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.u.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.o)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.o,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let U;const L=()=>(U||(U=new x),U);const j=(e,t)=>{const s=L().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:r});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let K=!1;function N(e){K||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=h();self.addEventListener("fetch",r=>{const c=j(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return;let a=self.caches.open(i).then(e=>e.match(c)).then(e=>e||fetch(c));r.respondWith(a)})})(e),K=!0)}const B=[],M={get:()=>B,add(e){B.push(...e)}},k=e=>{const t=L(),s=M.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},W=e=>{const t=L();e.waitUntil(t.activate())};var E;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),E={},function(e){L().addToCacheList(e),e.length>0&&(self.addEventListener("install",k),self.addEventListener("activate",W))}([{url:"_next/static/Kt94BggcG5BVW8eD7bsmo/_buildManifest.js",revision:"fb96ae7926f5104f50f0cf1b3a23a9b5"},{url:"_next/static/Kt94BggcG5BVW8eD7bsmo/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/Kt94BggcG5BVW8eD7bsmo/pages/_app.js",revision:"0af5ba8fddbf2e42245ab560cbc877b4"},{url:"_next/static/Kt94BggcG5BVW8eD7bsmo/pages/_error.js",revision:"15857e9702f9d41d3d0661a51adfec89"},{url:"_next/static/Kt94BggcG5BVW8eD7bsmo/pages/content/[content].js",revision:"a5aff683f59f5a2e64fc8af05af8dd68"},{url:"_next/static/Kt94BggcG5BVW8eD7bsmo/pages/index.js",revision:"1bf6e1b2030650e89ee920bb4207a283"},{url:"_next/static/chunks/11.ee01fb53ef610faaa25b.js",revision:"3fdae0119d57ae8c36752371c1fb4bad"},{url:"_next/static/chunks/12.cf4ed994456cf303fd91.js",revision:"7cdd00d1323858c7d1cd4f1d2be3fd2a"},{url:"_next/static/chunks/4.00cb29ab3a5aab3300dd.js",revision:"e606da1b0f9a702df785875513b40856"},{url:"_next/static/chunks/a5f09a77f884d9cef45cad8571197458ce538791.9630ceaf4c96d7f135c1.js",revision:"d1f35892e09368274c07a9a36c99658e"},{url:"_next/static/chunks/framework.fd33418168b04f669a8c.js",revision:"a45ee72b9fb97f6fc88f2e3a7805d452"},{url:"_next/static/chunks/styles.125332fc63c92047cb6a.js",revision:"3a38dd2cd511a8b45d755ea12419cee0"},{url:"_next/static/css/styles.511a0392.chunk.css",revision:"6ef5933c3e16b289fef30066a3a60b7d"},{url:"_next/static/runtime/main-a3f6d89c03d51598d1c8.js",revision:"d3fa07b851c799002867a1fce60fd09e"},{url:"_next/static/runtime/polyfills-288c49f9638081e1c632.js",revision:"9dcfffefe18f3ca6ff54e3f3521dbf1f"},{url:"_next/static/runtime/webpack-4a7b200201f8784652a9.js",revision:"fa9572ac6ee739139ed3c5108b5b51b5"}]),N(E),function(e,s,r){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new n(({url:e})=>e.href===t.href,s,r)}else if(e instanceof RegExp)c=new i(e,s,r);else if("function"==typeof e)c=new n(e,s,r);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}o().registerRoute(c)}(/.js$|.ttf$|.otf$|.css$|.svg$|.jpg$|.png$/,new class{constructor(e={}){this.o=l(e.cacheName),this.g=e.plugins||[],this.m=e.fetchOptions,this.v=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,i=await m({cacheName:this.o,request:s,event:e,matchOptions:this.v,plugins:this.g});if(!i)try{i=await this.R(s,e)}catch(e){n=e}if(!i)throw new t("no-response",{url:s.url,error:n});return i}async R(e,t){const s=await b({request:e,event:t,fetchOptions:this.m,plugins:this.g}),n=s.clone(),i=y({cacheName:this.o,request:e,response:n,event:t,plugins:this.g});if(t)try{t.waitUntil(i)}catch(e){}return s}},"GET");
