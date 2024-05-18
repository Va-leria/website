!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.anime=e()}(this,function(){"use strict";var n={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},e={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],t={CSS:{},springs:{}};function a(n,e,r){return Math.min(Math.max(n,e),r)}function o(n,e){return n.indexOf(e)>-1}function u(n,e){return n.apply(null,e)}var i={arr:function(n){return Array.isArray(n)},obj:function(n){return o(Object.prototype.toString.call(n),"Object")},pth:function(n){return i.obj(n)&&n.hasOwnProperty("totalLength")},svg:function(n){return n instanceof SVGElement},inp:function(n){return n instanceof HTMLInputElement},dom:function(n){return n.nodeType||i.svg(n)},str:function(n){return"string"==typeof n},fnc:function(n){return"function"==typeof n},und:function(n){return void 0===n},hex:function(n){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)},rgb:function(n){return/^rgb/.test(n)},hsl:function(n){return/^hsl/.test(n)},col:function(n){return i.hex(n)||i.rgb(n)||i.hsl(n)},key:function(r){return!n.hasOwnProperty(r)&&!e.hasOwnProperty(r)&&"targets"!==r&&"keyframes"!==r}};function c(n){var e=/\(([^)]+)\)/.exec(n);return e?e[1].split(",").map(function(n){return parseFloat(n)}):[]}function s(n,e){var r=c(n),o=a(i.und(r[0])?1:r[0],.1,100),u=a(i.und(r[1])?100:r[1],.1,100),s=a(i.und(r[2])?10:r[2],.1,100),f=a(i.und(r[3])?0:r[3],.1,100),l=Math.sqrt(u/o),d=s/(2*Math.sqrt(u*o)),p=d<1?l*Math.sqrt(1-d*d):0,h=1,v=d<1?(d*l-f)/p:-f+l;function g(n){var r=e?e*n/1e3:n;return r=d<1?Math.exp(-r*d*l)*(h*Math.cos(p*r)+v*Math.sin(p*r)):(h+v*r)*Math.exp(-r*l),0===n||1===n?n:1-r}return e?g:function(){var e=t.springs[n];if(e)return e;for(var r=0,a=0;;)if(1===g(r+=1/6)){if(++a>=16)break}else a=0;var o=r*(1/6)*1e3;return t.springs[n]=o,o}}function f(n){return void 0===n&&(n=10),function(e){return Math.ceil(a(e,1e-6,1)*n)*(1/n)}}var l,d,p=function(){var n=11,e=1/(n-1);function r(n,e){return 1-3*e+3*n}function t(n,e){return 3*e-6*n}function a(n){return 3*n}function o(n,e,o){return((r(e,o)*n+t(e,o))*n+a(e))*n}function u(n,e,o){return 3*r(e,o)*n*n+2*t(e,o)*n+a(e)}return function(r,t,a,i){if(0<=r&&r<=1&&0<=a&&a<=1){var c=new Float32Array(n);if(r!==t||a!==i)for(var s=0;s<n;++s)c[s]=o(s*e,r,a);return function(n){return r===t&&a===i?n:0===n||1===n?n:o(f(n),t,i)}}function f(t){for(var i=0,s=1,f=n-1;s!==f&&c[s]<=t;++s)i+=e;var l=i+(t-c[--s])/(c[s+1]-c[s])*e,d=u(l,r,a);return d>=.001?function(n,e,r,t){for(var a=0;a<4;++a){var i=u(e,r,t);if(0===i)return e;e-=(o(e,r,t)-n)/i}return e}(t,l,r,a):0===d?l:function(n,e,r,t,a){for(var u,i,c=0;(u=o(i=e+(r-e)/2,t,a)-n)>0?r=i:e=i,Math.abs(u)>1e-7&&++c<10;);return i}(t,i,i+e,r,a)}}}(),h=(l={linear:function(){return function(n){return n}}},d={Sine:function(){return function(n){return 1-Math.cos(n*Math.PI/2)}},Circ:function(){return function(n){return 1-Math.sqrt(1-n*n)}},Back:function(){return function(n){return n*n*(3*n-2)}},Bounce:function(){return function(n){for(var e,r=4;n<((e=Math.pow(2,--r))-1)/11;);return 1/Math.pow(4,3-r)-7.5625*Math.pow((3*e-2)/22-n,2)}},Elastic:function(n,e){void 0===n&&(n=1),void 0===e&&(e=.5);var r=a(n,1,10),t=a(e,.1,2);return function(n){return 0===n||1===n?n:-r*Math.pow(2,10*(n-1))*Math.sin((n-1-t/(2*Math.PI)*Math.asin(1/r))*(2*Math.PI)/t)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach(function(n,e){d[n]=function(){return function(n){return Math.pow(n,e+2)}}}),Object.keys(d).forEach(function(n){var e=d[n];l["easeIn"+n]=e,l["easeOut"+n]=function(n,r){return function(t){return 1-e(n,r)(1-t)}},l["easeInOut"+n]=function(n,r){return function(t){return t<.5?e(n,r)(2*t)/2:1-e(n,r)(-2*t+2)/2}}}),l);function v(n,e){if(i.fnc(n))return n;var r=n.split("(")[0],t=h[r],a=c(n);switch(r){case"spring":return s(n,e);case"cubicBezier":return u(p,a);case"steps":return u(f,a);default:return u(t,a)}}function g(n){try{return document.querySelectorAll(n)}catch(n){return}}function m(n,e){for(var r=n.length,t=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<r;o++)if(o in n){var u=n[o];e.call(t,u,o,n)&&a.push(u)}return a}function y(n){return n.reduce(function(n,e){return n.concat(i.arr(e)?y(e):e)},[])}function b(n){return i.arr(n)?n:(i.str(n)&&(n=g(n)||n),n instanceof NodeList||n instanceof HTMLCollection?[].slice.call(n):[n])}function x(n,e){return n.some(function(n){return n===e})}function M(n){var e={};for(var r in n)e[r]=n[r];return e}function w(n,e){var r=M(n);for(var t in n)r[t]=e.hasOwnProperty(t)?e[t]:n[t];return r}function k(n,e){var r=M(n);for(var t in e)r[t]=i.und(n[t])?e[t]:n[t];return r}function O(n){return i.rgb(n)?(r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e=n))?"rgba("+r[1]+",1)":e:i.hex(n)?(t=n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(n,e,r,t){return e+e+r+r+t+t}),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),"rgba("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):i.hsl(n)?function(n){var e,r,t,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),o=parseInt(a[1],10)/360,u=parseInt(a[2],10)/100,i=parseInt(a[3],10)/100,c=a[4]||1;function s(n,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?n+6*(e-n)*r:r<.5?e:r<2/3?n+(e-n)*(2/3-r)*6:n}if(0==u)e=r=t=i;else{var f=i<.5?i*(1+u):i+u-i*u,l=2*i-f;e=s(l,f,o+1/3),r=s(l,f,o),t=s(l,f,o-1/3)}return"rgba("+255*e+","+255*r+","+255*t+","+c+")"}(n):void 0;var e,r,t,a}function C(n){var e=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n);if(e)return e[1]}function B(n,e){return i.fnc(n)?n(e.target,e.id,e.total):n}function P(n,e){return n.getAttribute(e)}function I(n,e,r){if(x([r,"deg","rad","turn"],C(e)))return e;var a=t.CSS[e+r];if(!i.und(a))return a;var o=document.createElement(n.tagName),u=n.parentNode&&n.parentNode!==document?n.parentNode:document.body;u.appendChild(o),o.style.position="absolute",o.style.width=100+r;var c=100/o.offsetWidth;u.removeChild(o);var s=c*parseFloat(e);return t.CSS[e+r]=s,s}function T(n,e,r){if(e in n.style){var t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=n.style[e]||getComputedStyle(n).getPropertyValue(t)||"0";return r?I(n,a,r):a}}function D(n,e){return i.dom(n)&&!i.inp(n)&&(P(n,e)||i.svg(n)&&n[e])?"attribute":i.dom(n)&&x(r,e)?"transform":i.dom(n)&&"transform"!==e&&T(n,e)?"css":null!=n[e]?"object":void 0}function E(n){if(i.dom(n)){for(var e,r=n.style.transform||"",t=/(\w+)\(([^)]*)\)/g,a=new Map;e=t.exec(r);)a.set(e[1],e[2]);return a}}function F(n,e,r,t){var a,u=o(e,"scale")?1:0+(o(a=e,"translate")||"perspective"===a?"px":o(a,"rotate")||o(a,"skew")?"deg":void 0),i=E(n).get(e)||u;return r&&(r.transforms.list.set(e,i),r.transforms.last=e),t?I(n,i,t):i}function N(n,e,r,t){switch(D(n,e)){case"transform":return F(n,e,t,r);case"css":return T(n,e,r);case"attribute":return P(n,e);default:return n[e]||0}}function A(n,e){var r=/^(\*=|\+=|-=)/.exec(n);if(!r)return n;var t=C(n)||0,a=parseFloat(e),o=parseFloat(n.replace(r[0],""));switch(r[0][0]){case"+":return a+o+t;case"-":return a-o+t;case"*":return a*o+t}}function L(n,e){if(i.col(n))return O(n);if(/\s/g.test(n))return n;var r=C(n),t=r?n.substr(0,n.length-r.length):n;return e?t+e:t}function j(n,e){return Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2))}function S(n){for(var e,r=n.points,t=0,a=0;a<r.numberOfItems;a++){var o=r.getItem(a);a>0&&(t+=j(e,o)),e=o}return t}function q(n){if(n.getTotalLength)return n.getTotalLength();switch(n.tagName.toLowerCase()){case"circle":return o=n,2*Math.PI*P(o,"r");case"rect":return 2*P(a=n,"width")+2*P(a,"height");case"line":return j({x:P(t=n,"x1"),y:P(t,"y1")},{x:P(t,"x2"),y:P(t,"y2")});case"polyline":return S(n);case"polygon":return r=(e=n).points,S(e)+j(r.getItem(r.numberOfItems-1),r.getItem(0))}var e,r,t,a,o}function $(n,e){var r=e||{},t=r.el||function(n){for(var e=n.parentNode;i.svg(e)&&i.svg(e.parentNode);)e=e.parentNode;return e}(n),a=t.getBoundingClientRect(),o=P(t,"viewBox"),u=a.width,c=a.height,s=r.viewBox||(o?o.split(" "):[0,0,u,c]);return{el:t,viewBox:s,x:s[0]/1,y:s[1]/1,w:u/s[2],h:c/s[3]}}function X(n,e){function r(r){void 0===r&&(r=0);var t=e+r>=1?e+r:0;return n.el.getPointAtLength(t)}var t=$(n.el,n.svg),a=r(),o=r(-1),u=r(1);switch(n.property){case"x":return(a.x-t.x)*t.w;case"y":return(a.y-t.y)*t.h;case"angle":return 180*Math.atan2(u.y-o.y,u.x-o.x)/Math.PI}}function Y(n,e){var r=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,t=L(i.pth(n)?n.totalLength:n,e)+"";return{original:t,numbers:t.match(r)?t.match(r).map(Number):[0],strings:i.str(n)||e?t.split(r):[]}}function Z(n){return m(n?y(i.arr(n)?n.map(b):b(n)):[],function(n,e,r){return r.indexOf(n)===e})}function Q(n){var e=Z(n);return e.map(function(n,r){return{target:n,id:r,total:e.length,transforms:{list:E(n)}}})}function V(n,e){var r=M(e);if(/^spring/.test(r.easing)&&(r.duration=s(r.easing)),i.arr(n)){var t=n.length;2===t&&!i.obj(n[0])?n={value:n}:i.fnc(e.duration)||(r.duration=e.duration/t)}var a=i.arr(n)?n:[n];return a.map(function(n,r){var t=i.obj(n)&&!i.pth(n)?n:{value:n};return i.und(t.delay)&&(t.delay=r?0:e.delay),i.und(t.endDelay)&&(t.endDelay=r===a.length-1?e.endDelay:0),t}).map(function(n){return k(n,r)})}function z(n,e){var r=[],t=e.keyframes;for(var a in t&&(e=k(function(n){for(var e=m(y(n.map(function(n){return Object.keys(n)})),function(n){return i.key(n)}).reduce(function(n,e){return n.indexOf(e)<0&&n.push(e),n},[]),r={},t=function(t){var a=e[t];r[a]=n.map(function(n){var e={};for(var r in n)i.key(r)?r==a&&(e.value=n[r]):e[r]=n[r];return e})},a=0;a<e.length;a++)t(a);return r}(t),e)),e)i.key(a)&&r.push({name:a,tweens:V(e[a],n)});return r}function H(n,e){var r;return n.tweens.map(function(t){var a=function(n,e){var r={};for(var t in n){var a=B(n[t],e);i.arr(a)&&1===(a=a.map(function(n){return B(n,e)})).length&&(a=a[0]),r[t]=a}return r.duration=parseFloat(r.duration),r.delay=parseFloat(r.delay),r}(t,e),o=a.value,u=i.arr(o)?o[1]:o,c=C(u),s=N(e.target,n.name,c,e),f=r?r.to.original:s,l=i.arr(o)?o[0]:f,d=C(l)||C(s),p=c||d;return i.und(u)&&(u=f),a.from=Y(l,p),a.to=Y(A(u,l),p),a.start=r?r.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=v(a.easing,a.duration),a.isPath=i.pth(o),a.isColor=i.col(a.from.original),a.isColor&&(a.round=1),r=a,a})}var G={css:function(n,e,r){return n.style[e]=r},attribute:function(n,e,r){return n.setAttribute(e,r)},object:function(n,e,r){return n[e]=r},transform:function(n,e,r,t,a){if(t.list.set(e,r),e===t.last||a){var o="";t.list.forEach(function(n,e){o+=e+"("+n+") "}),n.style.transform=o}}};function R(n,e){Q(n).forEach(function(n){for(var r in e){var t=B(e[r],n),a=n.target,o=C(t),u=N(a,r,o,n),i=A(L(t,o||C(u)),u),c=D(a,r);G[c](a,r,i,n.transforms,!0)}})}function W(n,e){return m(y(n.map(function(n){return e.map(function(e){return function(n,e){var r=D(n.target,e.name);if(r){var t=H(e,n),a=t[t.length-1];return{type:r,property:e.name,animatable:n,tweens:t,duration:a.end,delay:t[0].delay,endDelay:a.endDelay}}}(n,e)})})),function(n){return!i.und(n)})}function J(n,e){var r=n.length,t=function(n){return n.timelineOffset?n.timelineOffset:0},a={};return a.duration=r?Math.max.apply(Math,n.map(function(n){return t(n)+n.duration})):e.duration,a.delay=r?Math.min.apply(Math,n.map(function(n){return t(n)+n.delay})):e.delay,a.endDelay=r?a.duration-Math.max.apply(Math,n.map(function(n){return t(n)+n.duration-n.endDelay})):e.endDelay,a}var K=0;var U,_=[],nn=[],en=function(){function n(){U=requestAnimationFrame(e)}function e(e){var r=_.length;if(r){for(var t=0;t<r;){var a=_[t];if(a.paused){var o=_.indexOf(a);o>-1&&(_.splice(o,1),r=_.length)}else a.tick(e);t++}n()}else U=cancelAnimationFrame(U)}return n}();function rn(r){void 0===r&&(r={});var t,o=0,u=0,i=0,c=0,s=null;function f(n){var e=window.Promise&&new Promise(function(n){return s=n});return n.finished=e,e}var l,d,p,h,v,g,y,b,x=(d=w(n,l=r),p=w(e,l),h=z(p,l),v=Q(l.targets),g=W(v,h),y=J(g,p),b=K,K++,k(d,{id:b,children:[],animatables:v,animations:g,duration:y.duration,delay:y.delay,endDelay:y.endDelay}));f(x);function M(){var n=x.direction;"alternate"!==n&&(x.direction="normal"!==n?"normal":"reverse"),x.reversed=!x.reversed,t.forEach(function(n){return n.reversed=x.reversed})}function O(n){return x.reversed?x.duration-n:n}function C(){o=0,u=O(x.currentTime)*(1/rn.speed)}function B(n,e){e&&e.seek(n-e.timelineOffset)}function P(n){for(var e=0,r=x.animations,t=r.length;e<t;){var o=r[e],u=o.animatable,i=o.tweens,c=i.length-1,s=i[c];c&&(s=m(i,function(e){return n<e.end})[0]||s);for(var f=a(n-s.start-s.delay,0,s.duration)/s.duration,l=isNaN(f)?1:s.easing(f),d=s.to.strings,p=s.round,h=[],v=s.to.numbers.length,g=void 0,y=0;y<v;y++){var b=void 0,M=s.to.numbers[y],w=s.from.numbers[y]||0;b=s.isPath?X(s.value,l*M):w+l*(M-w),p&&(s.isColor&&y>2||(b=Math.round(b*p)/p)),h.push(b)}var k=d.length;if(k){g=d[0];for(var O=0;O<k;O++){d[O];var C=d[O+1],B=h[O];isNaN(B)||(g+=C?B+C:B+" ")}}else g=h[0];G[o.type](u.target,o.property,g,u.transforms),o.currentValue=g,e++}}function I(n){x[n]&&!x.passThrough&&x[n](x)}function T(n){var e=x.duration,r=x.delay,l=e-x.endDelay,d=O(n);x.progress=a(d/e*100,0,100),x.reversePlayback=d<x.currentTime,t&&function(n){if(x.reversePlayback)for(var e=c;e--;)B(n,t[e]);else for(var r=0;r<c;r++)B(n,t[r])}(d),!x.began&&x.currentTime>0&&(x.began=!0,I("begin")),!x.loopBegan&&x.currentTime>0&&(x.loopBegan=!0,I("loopBegin")),d<=r&&0!==x.currentTime&&P(0),(d>=l&&x.currentTime!==e||!e)&&P(e),d>r&&d<l?(x.changeBegan||(x.changeBegan=!0,x.changeCompleted=!1,I("changeBegin")),I("change"),P(d)):x.changeBegan&&(x.changeCompleted=!0,x.changeBegan=!1,I("changeComplete")),x.currentTime=a(d,0,e),x.began&&I("update"),n>=e&&(u=0,x.remaining&&!0!==x.remaining&&x.remaining--,x.remaining?(o=i,I("loopComplete"),x.loopBegan=!1,"alternate"===x.direction&&M()):(x.paused=!0,x.completed||(x.completed=!0,I("loopComplete"),I("complete"),!x.passThrough&&"Promise"in window&&(s(),f(x)))))}return x.reset=function(){var n=x.direction;x.passThrough=!1,x.currentTime=0,x.progress=0,x.paused=!0,x.began=!1,x.loopBegan=!1,x.changeBegan=!1,x.completed=!1,x.changeCompleted=!1,x.reversePlayback=!1,x.reversed="reverse"===n,x.remaining=x.loop,t=x.children;for(var e=c=t.length;e--;)x.children[e].reset();(x.reversed&&!0!==x.loop||"alternate"===n&&1===x.loop)&&x.remaining++,P(x.reversed?x.duration:0)},x.set=function(n,e){return R(n,e),x},x.tick=function(n){i=n,o||(o=i),T((i+(u-o))*rn.speed)},x.seek=function(n){T(O(n))},x.pause=function(){x.paused=!0,C()},x.play=function(){x.paused&&(x.completed&&x.reset(),x.paused=!1,_.push(x),C(),U||en())},x.reverse=function(){M(),x.completed=!x.reversed,C()},x.restart=function(){x.reset(),x.play()},x.reset(),x.autoplay&&x.play(),x}function tn(n,e){for(var r=e.length;r--;)x(n,e[r].animatable.target)&&e.splice(r,1)}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",function(){document.hidden?(_.forEach(function(n){return n.pause()}),nn=_.slice(0),rn.running=_=[]):nn.forEach(function(n){return n.play()})}),rn.version="3.2.0",rn.speed=1,rn.running=_,rn.remove=function(n){for(var e=Z(n),r=_.length;r--;){var t=_[r],a=t.animations,o=t.children;tn(e,a);for(var u=o.length;u--;){var i=o[u],c=i.animations;tn(e,c),c.length||i.children.length||o.splice(u,1)}a.length||o.length||t.pause()}},rn.get=N,rn.set=R,rn.convertPx=I,rn.path=function(n,e){var r=i.str(n)?g(n)[0]:n,t=e||100;return function(n){return{property:n,el:r,svg:$(r),totalLength:q(r)*(t/100)}}},rn.setDashoffset=function(n){var e=q(n);return n.setAttribute("stroke-dasharray",e),e},rn.stagger=function(n,e){void 0===e&&(e={});var r=e.direction||"normal",t=e.easing?v(e.easing):null,a=e.grid,o=e.axis,u=e.from||0,c="first"===u,s="center"===u,f="last"===u,l=i.arr(n),d=l?parseFloat(n[0]):parseFloat(n),p=l?parseFloat(n[1]):0,h=C(l?n[1]:n)||0,g=e.start||0+(l?d:0),m=[],y=0;return function(n,e,i){if(c&&(u=0),s&&(u=(i-1)/2),f&&(u=i-1),!m.length){for(var v=0;v<i;v++){if(a){var b=s?(a[0]-1)/2:u%a[0],x=s?(a[1]-1)/2:Math.floor(u/a[0]),M=b-v%a[0],w=x-Math.floor(v/a[0]),k=Math.sqrt(M*M+w*w);"x"===o&&(k=-M),"y"===o&&(k=-w),m.push(k)}else m.push(Math.abs(u-v));y=Math.max.apply(Math,m)}t&&(m=m.map(function(n){return t(n/y)*y})),"reverse"===r&&(m=m.map(function(n){return o?n<0?-1*n:-n:Math.abs(y-n)}))}return g+(l?(p-d)/y:d)*(Math.round(100*m[e])/100)+h}},rn.timeline=function(n){void 0===n&&(n={});var r=rn(n);return r.duration=0,r.add=function(t,a){var o=_.indexOf(r),u=r.children;function c(n){n.passThrough=!0}o>-1&&_.splice(o,1);for(var s=0;s<u.length;s++)c(u[s]);var f=k(t,w(e,n));f.targets=f.targets||n.targets;var l=r.duration;f.autoplay=!1,f.direction=r.direction,f.timelineOffset=i.und(a)?l:A(a,l),c(r),r.seek(f.timelineOffset);var d=rn(f);c(d),u.push(d);var p=J(u,n);return r.delay=p.delay,r.endDelay=p.endDelay,r.duration=p.duration,r.seek(0),r.reset(),r.autoplay&&r.play(),r},r},rn.easing=v,rn.penner=h,rn.random=function(n,e){return Math.floor(Math.random()*(e-n+1))+n},rn});
const dao = [
  {
    name: "collectionIndex",
    label: "Collection Index",
    type: "number",
    default: 0,
    private: true,
    save: true
  },

  {
    name: "stageIndex",
    label: "Stage Index",
    type: "number",
    default: 0,
    private: true,
    save: true
  },

  {
    name: "stageScore",
    label: "Stage Score",
    type: "array",
    default: [],
    private: true,
    save: true
  },

  {
    name: "stageComparing",
    label: "Stage Comparing",
    type: "boolean",
    default: false,
    private: true,
    save: true
  },
  {
    name: "darkmode",
    label: "Dark Mode",
    type: "boolean",
    default: true,
    private: true,
    save: true
  },
  {
    name: "visited",
    label: "Visited",
    type: "boolean",
    default: true,
    private: true,
    save: true
  },
];

dao.forEach(thing => {
  thing.clean = function(value){
     if (thing.type === "number") return isNaN(value) ? 0 : parseInt(value, 10);
     if (thing.type === "string") return value  || "";
     if (thing.type === "boolean") return value === true || value === "true" ? true : false;
     if (thing.type === "url") return value || "";
     if (thing.type === "id") return value || 0;
     if (thing.type === "array") return typeof value === "object" ? value : typeof value === "string" ? value.split(",") : [];
     else throw "type " + thing.type + " does not exist";
  }
});

function State(){

  const _self = this

  this.set = set;
  this.get = get;
  this.clean = clean;
  this.refresh = refresh;
  this.data = _loadData();
  this.resetKGData = resetKGData;
  
  dao.forEach(thing => {
    this[thing.name] = eval(thing.name);
  });

  const tenThousandThings = dao.map(thing => thing.name);
  const saveableKeys = dao.filter(thing => thing.save).map(thing => thing.name);

  function refresh(){
   dao.forEach(thing => {
    this[thing.name](this.get(thing.name));
    });
  }

  function stageIndex(index) {
    game.loadStage(index);
  }

  function stageScore(index) {
    // noop
  }

  function collectionIndex(index) {
    game.loadCollection(index);
  }

  function stageTitle(title){
    game.setTitle(stageTitle);
  }

  function stageComparing(bool){
    if (bool) stage.compare();
    else stage.play();
  }

  function stagePositions(arr){
    stage.compare(bool);
  }

  function darkmode(bool){
    game.darkmode(bool);
  }


  function visited(){
    //noop
  }

  function set(key, val){
    key = key.split("-")[0] || key;
    if (tenThousandThings.indexOf(key) === -1) return console.warn( key + " not implemented");

    const archetype = dao.find(thing => thing.name === key);
     _self.data[key] = archetype.clean(val);
    if (~saveableKeys.indexOf(key)) _save(key, val);
    _self[key](val);
  }

  function get(key){
    return _self.data[key];
  }

  function clean(warn = true) {
    if (warn) {
      const confirmed = confirm("Deletes all configuration and text, are you sure?");
      if (!confirmed) return;
    }

    Object.keys(localStorage).forEach(key => localStorage.removeItem(key));
    game.reload();
  }

  // INNER UTILS

  function _save(key, val){

    if (val === undefined || val === null) throw "wont save nuthin, " + key + " " + val;
    localStorage.setItem("type" + "-" + key, val.toString());
  }

  function _loadData() {

    const data = dao.map(thing => {
      return {
        [thing.name]: getValue(thing.name, thing.default)
      }
    });
    return Object.assign({}, ...data);
  };

  function resetKGData(){
    const confirm = window.confirm("You will lose your current progress in the game, are you sure?");
    if (!confirm) return;
    state.set("stageScore", []);
    state.set("stageIndex", 0);
    game.load();
    window.location.reload();
  }

  function getValue(key, def) {
    const item = localStorage.getItem("type-" + key) || def;
    const archetype = dao.find(thing => thing.name === key.split("-")[0]);
    if (archetype) return archetype.clean(item);
    else throw "Unkown archetype";
  }



}
let dom = {
  create: function(attr = {}, parent) {
    const el = attr.el
      ? document.createElement(attr.el)
      : document.createElement("div");
    
    for (let key in attr) {
      var isAttr = key !== 'el' && key !== 'html';
      if (isAttr) el.setAttribute(key, attr[key]);
    }

    if (attr.html) el.innerHTML = attr.html;

    if (parent) parent.appendChild(el);

    return el;
  },
  createNS: function(attr = {}, parent) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", attr.el);
    
    for (let key in attr) {
      var isAttr = key !== 'el' && key !== 'html';
      if (isAttr) el.setAttribute(key, attr[key]);
    }

    if (attr.html) el.textNode(attr.html) ;

    if (parent) parent.appendChild(el);

    return el;
  },
  empty: function(el){
    el.innerHTML = "";
    return el;
  },
  emptyNS: function(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  },
  qs: function(selector, ctx){
    const el = ctx 
      ? ctx.querySelector(selector)
      : document.querySelector(selector);
    return el;
  },
  qsa: function(selector, ctx){
    const els = ctx 
      ? Array.from(ctx.querySelectorAll(selector))
      : Array.from(document.querySelectorAll(selector));
    return els;
  },
  gid: function(id) {
    return document.getElementById(id);
  },
  update: function(type, value) {
    var els = Array.from(document.querySelectorAll(`[data-type=${type}]`));
    els.forEach(el => el.innerHTML = value);
  },
  body: document.body,
  root: document.getElementById("root")
}

const utils = {};
utils.elementsAt = function( x, y ){
    var elements = [], current = document.elementFromPoint( x, y );
    // dom.create({class: "circle", style: `left: ${x}px; top: ${y}px; `}, document.body)
    // at least one element was found and it's inside a ViewportElement
    // otherwise it would traverse up to the <html> root of jsfiddle webiste.
    while( current &&  current.nearestViewportElement ){
        elements.push( current );
        // hide the element and look again
        current.style.display = "none";
        current = document.elementFromPoint( x, y );
    }
    // restore the display
    elements.forEach( function( elm ){
       elm.style.display = ''; 
    });
    return elements;
}

utils.transformPoint = function(x, y, m) {
  return { x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f};
};

// Calculate the bounding box of an element with respect to its parent element
utils.bbox = function(el){
  var bb  = el.getBBox(),
      svg = el.ownerSVGElement,
      m = svg.getScreenCTM().inverse().multiply(svg.getScreenCTM())

  // Create an array of all four points for the original bounding box
  var pts = [
    svg.createSVGPoint(), svg.createSVGPoint(),
    svg.createSVGPoint(), svg.createSVGPoint()
  ];
  pts[0].x=bb.x;          pts[0].y=bb.y;
  pts[1].x=bb.x+bb.width; pts[1].y=bb.y;
  pts[2].x=bb.x+bb.width; pts[2].y=bb.y+bb.height;
  pts[3].x=bb.x;          pts[3].y=bb.y+bb.height;

  // Transform each into the space of the parent,
  // and calculate the min/max points from that.    
  var xMin=Infinity,xMax=-Infinity,yMin=Infinity,yMax=-Infinity;
  pts.forEach(function(pt){
    pt = pt.matrixTransform(m);
    xMin = Math.min(xMin,pt.x);
    xMax = Math.max(xMax,pt.x);
    yMin = Math.min(yMin,pt.y);
    yMax = Math.max(yMax,pt.y);
  });

  // Update the bounding box with the new values
  bb.x = xMin; bb.width  = xMax-xMin;
  bb.y = yMin; bb.height = yMax-yMin;
  return bb;
}

utils.paint = function(bbox){

  const attr = Object.assign(bbox, {
    el: "rect",
    fill: "none",
    stroke: "red"
  })
  dom.createNS(attr, dom.gid("root"))
}

utils.limit = function(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}

utils.lerp = function (value1, value2, amount) {
  //amount = amount < 0 ? 0 : amount;
  //amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

utils.scale = function (value) {
  var value = Math.abs(value);
  if (value > 15) return value * 3 // out of bounds
  if (value > 10) return value * 1.5 // out of bounds
  if (value < 2) return 0
  if (value < 3) return 1
  if (value < 4) return 2
  if (value < 6) return 3  
  if (value < 9) return 7
  if (value < 11) return 9
}

utils.viewBox = {x: 0, y: 0, width: 0, height: 0}
path = {};

path.paramLengths = {
  M: 2,
  m: 2,
  L: 2,
  l: 2,
  H: 1,
  h: 1,
  V: 1,
  v: 1,
  C: 6,
  c: 6,
  S: 4,
  s: 4,
  Q: 4,
  q: 4,
  T: 2,
  t: 2,
  A: 7,
  a: 7
};


path.getBBox = pathString => path.getBBoxObj(path.parse(pathString));

path.getX = ({ type, values }) => {
  switch (type) {
    case "A":
    case "a":
      return [values[5] - values[0], values[5] + values[0]];
    case "H":
      return values;
    case "V":
      return [];
    case "L":
    case "l":
      return values.filter((_, i) => !(i % 2));
    case "C":
    case "c":
      return values.filter((_, i) => i % 6 === 4);
    case "Q":
    case "q":
      return values.filter((_, i) => i % 4 === 2);
    default:
      return values.filter((_, i) => !(i % 2));
  }
};

path.getY = ({ type, values }) => {
  switch (type) {
    case "A":
    case "a":
      return [values[6] - values[1], values[6] + values[1]];
    case "H":
      return [];
    case "V":
      return values;
    case "L":
    case "l":
      return values.filter((_, i) => i % 2);
    case "C":
    case "c":
      return values.filter((_, i) => i % 6 === 5);
    case "Q":
    case "q":
      return values.filter((_, i) => i % 4 === 3);
    default:
      return values.filter((_, i) => i % 2);
  }
};


path.getBBoxObj = pathObject => {
  if (pathObject.some(path.isRelative)) pathObject = toAbsoluteObj(pathObject);
  const x = [].concat(...pathObject.map(path.getX));
  const x0 = Math.min(...x);
  const x1 = Math.max(...x);
  const y = [].concat(...pathObject.map(path.getY));
  const y0 = Math.min(...y);
  const y1 = Math.max(...y);
  return {
    x: x0,
    y: y0,
    width: x1 - x0,
    height: y1 - y0
  };
};

path.isRelative = d => d.type === d.type.toLowerCase();


path.applyXY = (x, y, rx, ry) => ({ type, values }) => {
  switch (type) {
    case "A":
    case "a":
      return values.map((d, i) => {
        switch (i % path.paramLengths[type]) {
          case 0:
            return rx ? rx(d) : d;
          case 1:
            return ry ? ry(d) : d;
          case 5:
            return x(d);
          case 6:
            return y(d);
          default:
            return d;
        }
      });
    case "H":
    case "h":
      return values.map(x);
    case "V":
    case "v":
      return values.map(y);
    default:
      return values.map((d, i) => (i % 2 ? y(d) : x(d)));
  }
};

path.getEndPoint = (
  { type, values },
  [x = 0, y = 0],
  [x0 = 0, y0 = 0]
) => {
  switch (type) {
    case "A":
    case "C":
    case "L":
    case "M":
    case "Q":
    case "S":
    case "T":
      return values.slice(values.length - 2);
    case "H":
      return [values[values.length - 1], y];
    case "V":
      return [x, values[values.length - 1]];
    case "a":
    case "c":
    case "l":
    case "m":
    case "q":
    case "s":
    case "t":
      const [dx, dy] = values.slice(values.length - 2);
      return [x + dx, y + dy];
    case "h":
      return [x + values[values.length - 1], y];
    case "v":
      return [x, y + values[values.length - 1]];
    case "Z":
    case "z":
      return [x0, y0];
    default:
      return [x, y];
  }
};

path.isRelative = d => d.type === d.type.toLowerCase();

normalizeImplicitCommandsObj = pathObject =>
  [].concat(
    ...pathObject.map(({ type, values }) => {
      if (!values.length)
        return {
          type,
          values
        };
      const chunks = [];
      for (let i = 0; i < values.length; i += path.paramLengths[type]) {
        chunks.push(values.slice(i, i + path.paramLengths[type]));
      }
      return chunks.map((chunk, i) => {
        let newType = type === "M" ? "L" : type === "m" ? "l" : type;
        return {
          type: i ? newType : type,
          values: chunk
        };
      });
    })
  );

path.normalizeImplicitCommands = pathString =>
  path.stringify(path.normalizeImplicitCommandsObj(path.parse(pathString)));

path.toAbsoluteObj = function(pathObject, last = [0, 0], initial = [0, 0]) {
  if (!pathObject.length) return [];
  const [first, ...rest] = normalizeImplicitCommandsObj(pathObject);
  const newFirst = {
    type: first.type.toUpperCase(),
    values: path.isRelative(first)
      ? path.applyXY(
          x => x + last[0],
          y => y + last[1]
        )(first)
      : first.values
  };
  last = path.getEndPoint(newFirst, last, initial);
  if (newFirst.type === "M") initial = last;
  return [newFirst, ...path.toAbsoluteObj(rest, last, initial)];
}

path.translateObj = (x, y) => pathObject =>
  path.toAbsoluteObj(pathObject).map(({ type, values }) => ({
    type,
    values: path.applyXY(
      d => d + x,
      d => d + y
    )({
      type,
      values
    })
  }));

path.replaceRecursive = function(str, regex, newThing) {
  return regex.test(str)
    ? path.replaceRecursive(str.replace(regex, newThing), regex, newThing)
    : str;
}

path.stringify = pathObject =>
  pathObject.map(d => d.type + d.values.join(" ")).join("");

path.parse = d =>
  d
    .trim()
    .split(/(?=[MmLlHhVvCcSsAaQqTtZz])/)
    .map(d => ({
      type: d.charAt(0),
      values: path.replaceRecursive(d.substr(1), /([0-9]*\.[0-9]*)\./, "$1 .")
        .replace(/([0-9.])-/g, "$1 -")
        .split(/[\n\s,]/)
        .filter(d => d.length)
        .map(d => +d)
    }));

path.translate = (x, y) => pathString =>
  path.stringify(path.translateObj(x, y)(path.parse(pathString)));



const composer = {};


composer.lines = function(lines){
  var viewBox = dom.root.viewBox.baseVal || utils.viewBox;
  var scene = dom.qs("g.scene") || dom.createNS({el: "g", class: "scene"});
  dom.emptyNS(scene);

  lines
    .map((line, i) => {
      const padding = viewBox.width/2;
      return dom.createNS({
        el: "line",
        x1: viewBox.x-padding,
        x2: viewBox.width+padding,
        y1: line,
        y2: line
      }, scene);
    })
    .forEach((line, i) => {
      const startOrEnds = i===0 || i === lines.length-1;
      line.classList.toggle("baseline", startOrEnds);
    });

  dom.root.insertBefore(scene, dom.root.firstChild);

  return this;
}
function Menu(){
	const button = dom.qs(".app-menu-button");
	const restart = dom.qs("#menu-restart");
	const overlay = dom.qs("#menu-overlay");
	const menuItems = dom.qsa(".menu .menu-item");
	const app = dom.qs("#app");
	
	button.addEventListener("click", function(){
		dom.body.classList.toggle("app-menu-open");
	});

	restart.addEventListener("click", function(e){
		e.preventDefault();
		state.resetKGData();
	});

	overlay.addEventListener("click", function(){
		dom.body.classList.remove("app-menu-open");
	});

	menuItems.forEach(function(item){
		item.addEventListener("click", function(){
			dom.body.classList.remove("app-menu-open");
		});
	})


}

new Menu();
const stages = [

  {
    word: "WAVE",
    // typeface: "Gotham Black",
    typefaceUrl: "https://www.typography.com/fonts/gotham/styles",
    // creator: "Tobias Frere-Jones",
    creatorUrl: "https://en.wikipedia.org/wiki/Tobias_Frere-Jones",
    year: 2000,
    letters: {
      W: "M 54.26 164.14 L 93.13 164.14 L 125.33 71.46 L 157.76 164.14 L 196.63 164.14 L 250.45 2.00 L 204.22 2.00 L 176.16 95.15 L 145.11 1.54 L 106.70 1.54 L 75.65 95.15 L 47.59 2.00 L 0.44 2.00 L 54.26 164.14 L 54.26 164.14 Z",
      A: "M 1.47 163 L 48.39 163 L 59.89 134.25 L 121.99 134.25 L 133.72 163 L 181.56 163 L 113.02 0.85 L 70.01 0.85 L 1.47 163 L 1.47 163 ZM 73.00 99.52 L 91.17 53.75 L 109.11 99.52 L 73.00 99.52 L 73.00 99.52 Z",
      V: "M 67.89 164.14 L 109.29 164.14 L 174.61 2.00 L 125.62 2.00 L 89.05 103.89 L 52.48 2.00 L 2.57 2.00 L 67.89 164.14 L 67.89 164.14 Z", 
      E: "M 1.55 163 L 132.19 163 L 132.19 125.05 L 45.71 125.05 L 45.71 99.52 L 122.99 99.52 L 122.99 64.33 L 45.71 64.33 L 45.71 39.95 L 131.04 39.95 L 131.04 2.00 L 1.55 2.00 L 1.55 163 L 1.55 163 Z"
    },
    start: [0, 230, 420, 600],
    solution: [0, 3, -25, 0],
    lines: [1, 163]
  },

  {
    word: "Type",
    // typeface: "Garamond",
    typefaceUrl: "https://fonts.adobe.com/fonts/adobe-garamond",
    // creator: "Claude Garamond",
    creatorUrl: "http://en.wikipedia.org/wiki/Claude_Garamond",
    year: 'c. 1540',
    letters: {
      T: "M 83.92 22.86 C 83.92 15.23 83.69 15.00 90.56 15.00 L 106.80 15.00 C 119.38 15.00 128.08 16.85 133.34 20.78 C 136.77 23.32 138.37 31.88 139.06 37.66 C 140.19 39.05 144.03 39.05 144.93 37.20 C 144.25 30.26 145.85 11.67 148.38 2.37 C 147.92 1.45 145.39 1.22 144.25 1.68 C 140.87 7.66 138.83 8.12 126.48 8.12 L 33.56 8.12 C 22.98 8.12 15.39 8.34 14.01 0.99 C 13.32 0.30 10.33 0.53 9.64 0.99 C 8.03 10.12 4.58 24.71 0.90 35.12 C 1.82 36.97 5.04 38.12 6.88 36.74 C 9.41 30.95 11.71 25.87 17.23 20.78 C 22.98 15.46 35.63 15.00 45.52 15.00 L 58.17 15.00 C 65.07 15.00 65.07 15.23 65.07 22.40 L 65.07 125.76 C 65.07 150.04 63.92 153.51 50.81 154.66 L 42.53 155.34 C 40.69 156.45 41.15 160.22 42.53 160.89 C 57.25 160.44 65.29 160.10 74.49 160.10 C 83.69 160.10 91.47 160.44 104.51 160.89 C 105.89 160.22 106.34 156.23 104.97 155.34 L 97.65 154.66 C 84.38 153.51 83.92 150.04 83.92 125.76 L 83.92 22.86 L 83.92 22.86 Z",
      y: "M 16.40 216.93 C 21.67 216.93 27.16 214.89 31.06 206.24 C 42.28 181.16 61.05 140.88 68.61 125.37 L 82.36 98.75 C 90.17 82.31 94.30 75.60 101.88 74.21 L 105.78 73.56 C 107.39 72.28 107.16 69.07 105.32 68.22 C 98.89 68.65 93.61 68.77 87.87 68.77 C 81.90 68.77 75.01 68.65 67.66 68.22 C 65.82 68.86 65.58 72.49 67.21 73.56 L 74.32 74.67 C 78.46 75.37 79.84 76.99 79.84 78.61 C 79.84 81.15 76.85 89.72 71.80 101.76 L 63.90 120.04 C 59.59 129.54 55.76 136.71 55.04 137.18 C 54.08 136.71 49.53 124.44 48.09 120.74 L 40.67 99.44 C 39.29 95.51 34.03 80.46 34.03 77.68 C 34.03 76.06 35.86 75.37 39.06 74.67 L 44.79 73.56 C 46.41 72.49 46.17 68.86 44.33 68.22 C 37.00 68.65 30.59 68.77 24.41 68.77 C 16.86 68.77 9.99 68.65 2.66 68.22 C 0.83 68.86 0.60 72.49 1.97 73.56 L 7.70 74.67 C 15.71 76.29 17.31 81.85 21.21 92.73 L 39.06 142.27 C 42.04 150.83 42.96 153.61 42.96 158.24 C 42.96 161.48 41.35 166.34 40.67 168.20 C 38.61 173.75 34.03 183.47 27.39 193.89 C 25.78 196.44 23.50 198.06 19.83 198.06 L 15.48 198.06 C 10.44 198.06 6.32 201.01 6.32 207.15 C 6.32 212.84 9.76 216.93 16.40 216.93 L 16.40 216.93 Z",
      p: "M 15.06 193.34 C 15.06 210.25 14.83 212.60 6.32 213.78 L 1.49 214.43 C 0 215.50 0.34 219.13 1.95 219.77 C 8.39 219.34 15.29 219.22 23.5 219.22 L 31.48 219.22 C 31.48 219.22 38.12 219.34 49.11 219.77 C 50.71 219.13 51.17 215.50 49.57 214.43 L 40.64 213.31 C 32.39 212.13 31.93 210.02 31.93 193.34 L 31.93 168.53 C 31.93 163.58 33.08 162.40 35.14 161.93 C 37.20 162.58 43.61 163.04 47.73 163.04 C 80.26 163.04 103.92 139.95 103.92 107.99 C 103.92 84.77 88.79 66.08 65.60 66.08 C 50.94 66.08 36.51 75.37 33.54 76.73 C 31.93 76.73 31.48 75.37 31.48 73.78 C 31.48 70.84 31.93 67.44 32.39 63.32 C 31.93 62.17 31.02 61.71 29.65 61.71 C 23.72 66.08 12.99 71.52 7.01 74.01 C 5.86 74.69 5.86 77.18 6.78 78.10 L 8.85 79.48 C 15.06 83.62 15.06 84.77 15.06 93.74 L 15.06 193.34 L 15.06 193.34 ZM 31.93 96.96 C 31.93 89.37 32.62 85.92 34.68 83.39 C 37.20 80.63 44.30 76.95 54.15 76.95 C 74.76 76.95 85.07 95.58 85.07 113.97 C 85.07 137.88 74.07 155.36 55.29 155.36 C 50.48 155.36 43.38 153.75 38.80 150.30 C 34.22 146.62 31.93 143.86 31.93 136.50 L 31.93 96.96 L 31.93 96.96 Z",
      e: "M 65.94 100.93 C 75.27 100.93 78.38 100.70 79.04 99.33 C 79.49 98.41 79.93 96.58 79.93 93.37 C 79.93 79.56 67.50 66.01 47.73 66.01 C 19.86 66.01 1.15 89.68 1.15 117.94 C 1.15 128.05 3.92 138.86 10.84 147.82 C 17.54 156.56 29.38 162.99 44.48 162.99 C 56.55 162.99 72.83 157.25 80.16 141.61 C 79.93 139.54 78.38 138.17 76.16 138.86 C 69.27 147.82 63.06 150.12 55.39 150.12 C 30.54 150.12 16.84 130.35 16.84 107.14 C 16.84 101.39 17.07 100.93 23.11 100.93 L 65.94 100.93 L 65.94 100.93 ZM 21.02 94.06 C 19.39 94.06 19.39 93.37 19.39 92.91 C 19.63 85.31 31.47 72.88 45.17 72.88 C 58.64 72.88 63.06 80.94 63.06 87.38 C 63.06 90.37 62.36 91.30 61.66 91.76 C 59.81 93.14 54.70 94.06 37.51 94.06 L 21.02 94.06 L 21.02 94.06 Z"
    },
    start: [0, 160, 270, 380],
    solution: [0, -17, -8, 0],
    lines: [1, 220, 68, 161]
  },

  {
    word: 'Yves',
    // typeface: "Sabon Small Caps",
    typefaceUrl: "http://www.linotype.com/en/53159/SabonNext-family.html",
    // creator: "Jan Tschichold",
    creatorUrl: "http://en.wikipedia.org/wiki/Jan_Tschichold",
    year: '1966',
    letters: {
      Y: "M 80.84 68.59 L 118.55 16.70 C 122.89 10.66 126.64 5.23 134.93 5.03 L 134.93 0.16 L 96.04 0.16 L 96.04 5.03 C 106.11 5.03 110.06 5.03 110.06 10.86 C 110.06 15.49 104.73 21.92 102.36 25.34 L 76.42 61.35 L 48.35 21.72 C 44.55 16.29 41.75 11.67 41.75 9.25 C 41.75 5.03 49.75 5.03 52.95 5.03 L 52.95 0.16 L 0.75 0.16 L 0.75 5.03 C 12.55 6.04 13.55 5.63 19.35 13.88 L 61.15 71.80 L 61.15 120.48 C 61.15 134.56 53.55 134.76 42.95 134.96 L 42.95 139.83 L 98.80 139.83 L 98.80 134.96 C 88.34 134.76 80.84 134.56 80.84 120.48 L 80.84 68.59 L 80.84 68.59 Z",
      v: "M 49.59 141.83 L 56.60 141.83 L 92.00 59.42 C 97.22 47.03 99.42 47.03 105.84 47.03 L 105.84 42.16 L 71.15 42.16 L 71.15 47.03 C 78.17 47.03 84.38 47.03 84.38 52.23 C 84.38 54.83 83.58 57.83 82.18 61.02 L 58.36 120.77 L 32.41 57.03 C 31.82 55.43 31.02 53.43 31.02 51.83 C 31.02 48.23 33.60 47.03 38.17 47.03 L 42.93 47.03 L 42.93 42.16 L 0.06 42.16 L 0.06 47.03 C 9.39 47.03 10.58 49.03 13.56 56.43 L 49.59 141.83 L 49.59 141.83 Z",
      e: "M 88.53 117.70 L 83.53 117.70 C 75.73 131.20 74.33 133.86 54.42 133.86 C 37.75 133.86 32.93 130.59 32.93 121.79 L 32.93 91.93 L 49.60 91.93 C 61.45 91.93 64.06 93.16 64.06 104.41 L 68.93 104.41 L 68.93 72.01 L 64.06 72.01 C 64.06 85.86 59.64 86.06 49.60 86.06 L 32.93 86.06 L 32.93 48.13 L 47.79 48.13 C 68.18 48.13 71.65 49.34 74.15 62.98 L 78.44 62.98 L 77.22 42.26 L 1.26 42.26 L 1.26 47.03 C 10.66 47.03 16.06 48.13 16.06 55.76 L 16.06 125.99 C 16.06 133.73 10.66 134.96 1.26 134.96 L 1.26 139.73 L 82.33 139.73 L 88.53 117.70 L 88.53 117.70 Z",
      s: "M 3.45 136.76 C 10.86 140.15 18.78 141.83 28.14 141.83 C 49.10 141.83 63.89 130.79 63.89 114.87 C 63.89 102.34 59.89 93.98 38.51 83.63 C 18.98 74.28 15.93 70.50 15.93 60.95 C 15.93 51.80 23.05 45.03 33.63 45.03 C 47.06 45.03 51.50 53.39 53.70 61.35 L 57.89 61.43 L 56.10 42.06 C 49.50 41.84 39.94 40.16 32.21 40.16 C 14.57 40.16 3.06 52.19 3.06 65.72 C 3.06 81.24 8.71 88.81 30.78 100.15 C 44.41 107.11 49.10 112.28 49.10 120.44 C 49.10 126.61 45.43 136.96 29.77 136.96 C 14.96 136.96 8.91 129.60 5.01 115.67 L 0.46 115.67 L 3.45 136.76 L 3.45 136.76 Z"
    },
    start: [0, 150, 250, 350],
    solution: [0, -17, 0, 0],
    lines: [0, 42, 140]
  },


  {
    word: "holly",
    // typeface: "FF Zine",
    typefaceUrl: "https://www.fontshop.com/superfamilies/ff-zine",
    // creator: "Ole SchГ¤fer",
    creatorUrl: "http://de.wikipedia.org/wiki/Ole_Sch%C3%A4fer",
    year: '2001',
    letters: {
      h: "M 117.79 107.89 C 115.99 108.69 113.19 109.89 110.99 109.89 C 108.59 109.89 107.59 108.09 108.19 104.88 L 113.59 74.40 C 116.99 55.55 110.79 43.06 94.19 43.06 C 76.79 43.06 68.59 55.95 63.39 63.37 L 74.59 0.06 L 25.59 0.06 L 20.99 25.78 L 30.99 25.78 L 15.59 113.10 L 5.59 113.10 L 0.99 138.83 L 49.99 138.83 L 53.79 117.51 C 57.99 94.05 65.59 79.01 69.99 79.01 C 73.39 79.01 73.39 81.82 72.59 86.03 L 68.39 109.69 C 67.99 112.50 67.19 117.31 67.19 120.32 C 67.19 134.35 76.79 140.83 89.79 140.83 C 100.59 140.83 109.19 137.88 112.79 136.36 L 117.79 107.89 L 117.79 107.89 Z",
      o: "M 108.59 84.09 C 108.59 57.01 89.99 43.26 60.99 43.26 C 26.39 43.26 1.99 62.51 1.99 99.90 C 1.99 127.77 20.59 140.73 49.59 140.73 C 83.59 140.73 108.59 121.48 108.59 84.09 L 108.59 84.09 ZM 68.19 87.33 C 68.19 97.67 64.19 111.86 52.79 111.86 C 45.99 111.86 42.39 105.57 42.39 96.66 C 42.39 86.32 46.19 72.13 57.79 72.13 C 64.79 72.13 68.19 78.42 68.19 87.33 L 68.19 87.33 Z",
      l: "M 61.59 0.06 L 12.59 0.06 L 7.79 26.90 L 17.79 26.90 L 3.19 109.79 C 2.79 112.59 1.99 117.38 1.99 120.38 C 1.99 134.36 11.59 140.83 24.59 140.83 C 35.39 140.83 43.99 137.88 47.59 136.36 L 52.59 108.00 C 50.79 108.79 47.99 109.99 45.79 109.99 C 43.39 109.99 42.39 108.20 42.99 105.00 L 61.59 0.06 L 61.59 0.06 Z",
      y: "M 119.19 45.06 L 75.59 45.06 L 59.19 85.48 L 56.99 45.06 L 15.59 45.06 L 10.99 70.93 L 20.79 70.93 L 30.99 130.12 L 28.79 133.71 C 23.79 141.88 11.99 148.66 -0.20 152.44 L 3.79 180.83 C 41.79 175.76 61.39 161.61 77.19 128.53 L 104.79 70.93 L 114.59 70.93 L 119.19 45.06 L 119.19 45.06 Z"
    },
    start:    [0, 120, 230, 330, 370],
    solution: [0, 8, 13, -17, 0],
    lines: [0, 180, 45, 139]
  },

  {
    word: 'Await',
    // typeface: "Rotis Semi Serif",
    typefaceUrl: "https://en.wikipedia.org/wiki/Rotis",
    // creator: "Otl Aicher",
    creatorUrl: "http://en.wikipedia.org/wiki/Otl_Aicher",
    year: '1988',
    letters: {
      A: "M 138.00 165 L 76.08 3.06 L 34.80 3.06 L 34.80 7.15 C 40.56 8.60 53.28 10.52 53.28 18.47 C 53.28 22.57 51.12 27.63 49.68 31.48 L 0 165 L 15.12 165 L 34.08 110.93 L 94.56 110.93 L 114.72 165 L 138.00 165 L 138.00 165 ZM 91.92 102.06 L 37.44 102.06 L 64.80 28.59 L 91.92 102.06 L 91.92 102.06 Z",
      w: "M 160.00 52.06 L 147.76 52.06 L 125.68 138.52 L 125.20 138.52 L 97.12 52.06 L 83.92 52.06 L 58.24 137.80 L 57.76 137.80 L 33.28 52.06 L 2.31 52.06 L 2.31 56.16 C 17.68 58.34 18.64 62.44 22.72 76.69 L 48.64 167 L 60.16 167 L 88.24 75.97 L 88.72 75.97 L 118.48 167 L 130.24 167 L 160.00 52.06 L 160.00 52.06 Z",
      a: "M 81.93 164.35 L 81.93 88.30 C 81.93 61.04 72.41 49.24 44.32 49.24 C 23.61 49.24 3.86 56.29 2.46 79.53 L 23.37 79.53 C 24.10 66.63 29.46 58.11 43.59 58.11 C 64.52 58.11 64.06 76.86 64.06 92.68 L 64.06 102.17 C 40.18 102.90 1.06 106.31 1.06 138.44 C 1.06 155.71 12.75 167 29.46 167 C 44.81 167 54.55 160.03 64.06 148.91 L 64.06 164.35 L 81.93 164.35 L 81.93 164.35 ZM 64.06 124.08 C 64.06 137.71 55.04 155.23 39.45 155.23 C 27.75 155.23 20.93 146.23 20.93 135.28 C 20.93 113.61 47.49 109.96 64.06 109.72 L 64.06 124.08 L 64.06 124.08 Z",
      i: "M 41.29 13.44 C 41.29 6.24 35.15 0.00 28.18 0.00 C 20.99 0.00 14.78 5.76 14.78 13.44 C 14.78 21.11 20.99 26.87 28.18 26.87 C 35.38 26.87 41.29 20.87 41.29 13.44 L 41.29 13.44 ZM 37.93 165 L 37.93 50.06 L 2.06 55.85 L 2.06 59.96 C 12.38 60.93 20.06 63.58 20.06 75.90 L 20.06 165 L 37.93 165 L 37.93 165 Z",
      t: "M 68.45 165.39 L 68.45 156.91 C 65.33 157.39 62.45 157.88 59.33 157.88 C 46.85 157.88 38.93 154.23 38.93 140.15 L 38.93 60.01 L 68.45 60.01 L 68.45 52.14 L 38.70 52.14 L 38.70 15.66 L 21.06 31.74 L 21.06 52.14 L 2.58 52.14 L 2.58 60.01 L 21.06 60.01 L 21.06 133.11 C 21.06 160.15 27.09 166.75 54.77 166.75 C 59.33 166.75 63.89 166.30 68.45 165.39 L 68.45 165.39 Z"
     },
    start: [0, 140, 330, 420, 480],
    solution: [0, -10, -18, -4, 0],
    lines: [3, 51, 165]
  },

  {
    word: 'Roissy',
    // typeface: "Frutiger 55",
    typefaceUrl: "https://en.wikipedia.org/wiki/Frutiger_(typeface)",
    // creator: "Adrian Frutiger",
    creatorUrl: "http://en.wikipedia.org/wiki/Adrian_Frutiger",
    year: '1975',
    letters: {
      R: "M 27.93 29.93 L 37.21 29.93 C 51.33 29.93 67.06 31.35 67.06 48.39 C 67.06 66.03 51.13 68.06 37.21 68.06 L 27.93 68.06 L 27.93 29.93 L 27.93 29.93 ZM 0.06 147.83 L 27.93 147.83 L 27.93 89.93 L 37.01 89.93 C 48.91 89.93 52.54 93.95 56.57 104.39 L 73.39 147.83 L 104.33 147.83 L 82.09 93.35 C 79.32 87.15 74.97 79.59 67.45 78.99 L 67.45 78.60 C 85.05 76.21 95.93 62.58 95.93 45.95 C 95.93 7.06 60.40 8.06 30.15 8.06 L 0.06 8.06 L 0.06 147.83 L 0.06 147.83 Z",
      o: "M 1.06 97.19 C 1.06 126.43 20.77 150 54.89 150 C 89.22 150 108.93 126.43 108.93 97.19 C 108.93 63.59 85.64 43 54.89 43 C 24.35 43 1.06 63.59 1.06 97.19 L 1.06 97.19 ZM 28.93 94.02 C 28.93 78.81 37.38 63.79 54.89 63.79 C 72.60 63.79 81.06 78.42 81.06 94.02 C 81.06 111.02 75.62 129.20 54.89 129.20 C 34.37 129.20 28.93 110.82 28.93 94.02 L 28.93 94.02 Z",
      i: "M 0.10 147.83 L 26.89 147.83 L 26.89 45.06 L 0.10 45.06 L 0.10 147.83 L 0.10 147.83 ZM 0.10 25.84 L 26.89 25.84 L 26.89 0.15 L 0.10 0.15 L 0.10 25.84 L 0.10 25.84 Z",
      s: "M 70.96 46.77 C 62.59 44.96 54.43 42.95 41.68 42.95 C 20.37 42.95 1.06 52.79 1.06 74.88 C 1.06 111.60 48.06 97.97 48.06 117.91 C 48.06 127.78 36.95 130.35 29.96 130.35 C 20.77 130.35 12.01 127.78 3.65 123.64 L 2.05 145.62 C 11.81 148.23 22.16 150.04 32.43 150.04 C 54.63 150.04 75.93 140.40 75.93 116.53 C 75.93 79.81 28.93 90.08 28.93 73.89 C 28.93 65.20 37.78 62.64 45.18 62.64 C 55.03 62.64 61.00 64.22 69.16 66.98 L 70.96 46.77 L 70.96 46.77 Z",
      y: "M 29.70 45.06 L 0.10 45.06 L 39.50 152.85 C 39.50 163.82 32.90 171.20 22.10 171.20 C 15.50 171.20 11.70 170.60 8.30 169.40 L 6.50 189.20 C 12.70 191 19.10 192 25.50 192 C 53.5 192 59.69 169.60 68.29 146.86 L 106.89 45.06 L 79.69 45.06 L 54.89 119.94 L 54.5 119.94 L 29.70 45.06 L 29.70 45.06 Z"    
    },
    start: [0, 110, 240, 280, 420, 500],
    solution: [0, 8, 12, 25, -15, 0],
    lines: [0, 192, 44, 147]
  },

  {
    word: 'Quijote',
    // typeface: "Baskerville Italic",
    typefaceUrl: "https://en.wikipedia.org/wiki/Baskerville",
    creator: "John Baskerville",
    creatorUrl: "http://en.wikipedia.org/wiki/John_Baskerville",
    year: '1757',
    letters: {
       Q: "M 40.13 123.06 C 38.36 123.06 36.92 123.21 34.50 123.53 C 38.20 121.49 41.26 119.93 44.32 118.20 C 46.73 116.80 56.22 111.92 64.91 104.27 C 71.02 98.85 74.56 94.38 76.49 91.83 C 91.06 71.75 91.86 50.23 91.86 44.33 C 91.86 30.46 88.34 22.49 84.82 16.43 C 83.54 14.20 82.74 12.93 80.98 10.85 C 79.21 8.94 77.45 7.35 76.65 6.71 C 68.93 0.16 60.89 -0.00 58.64 -0.00 C 48.66 -0.00 40.45 4.40 36.75 6.71 C 29.51 10.85 23.08 17.71 20.99 20.10 C 14.55 27.75 2.58 45.60 0.47 66.81 C 0.31 68.88 0.15 71.11 0.15 73.18 C 0.15 84.66 3.39 93.59 5.65 98.05 C 10.18 106.66 16.48 110.96 19.06 112.55 C 28.23 117.89 35.63 116.95 37.24 116.95 C 35.95 117.74 34.82 118.52 33.54 119.30 C 30.96 121.02 28.55 123.21 23.24 124.79 C 21.95 125.26 20.67 125.42 19.38 125.73 C 16.00 126.36 13.57 126.52 11.15 130.13 C 10.18 131.65 9.85 133.01 9.85 133.51 C 9.85 135.20 11.47 138.42 15.68 138.42 C 20.18 138.42 23.56 133.18 24.85 131.48 C 26.62 129.45 28.07 128.95 31.77 128.44 C 34.66 128.10 37.56 127.93 40.45 127.93 C 54.29 127.93 65.39 134.53 70.22 137.74 C 74.08 140.11 78.73 143.49 82.58 146.52 C 87.06 149.67 99.70 160.71 115.54 160.87 C 123.06 160.87 128.98 158.51 131.86 156.77 C 132.98 156.14 134.74 154.88 137.30 152.20 C 141.94 147.31 143.22 143.32 144.02 141.29 C 144.18 140.45 145.62 137.06 145.62 132.33 C 145.62 130.98 145.62 126.36 143.54 126.20 C 142.74 126.20 142.26 127.78 141.30 129.29 C 136.82 136.90 132.82 141.29 125.94 143.15 C 122.74 143.83 119.86 144.00 118.74 144.00 C 111.86 144.00 108.02 142.31 100.98 139.60 C 97.14 138.08 93.30 136.73 89.46 135.20 C 76.17 130.30 56.87 123.06 43.35 123.06 L 40.13 123.06 L 40.13 123.06 ZM 57.35 5.76 C 59.76 5.76 63.78 6.23 66.20 7.51 C 69.25 9.26 72.79 12.93 74.88 19.46 C 77.13 26.79 77.13 34.45 77.13 36.84 C 77.13 59.95 67.16 83.22 63.46 90.24 C 62.98 91.04 58.64 99.48 53.49 104.43 C 52.20 105.70 50.59 106.98 48.98 107.93 C 43.19 111.92 39.65 112.08 37.08 112.08 C 33.21 112.08 29.03 111.28 25.17 107.93 C 21.79 104.90 20.02 101.56 19.38 100.12 C 15.84 92.47 15.84 79.40 15.84 78.76 C 15.84 62.82 20.67 50.23 23.08 44.17 C 26.94 33.81 29.03 30.30 32.57 24.72 C 33.38 23.29 38.52 14.52 46.09 9.58 C 50.91 6.39 55.90 5.91 57.35 5.76 L 57.35 5.76 Z",
       u: "M 3.10 69.81 C 4.06 70.13 4.36 70.13 4.81 69.16 C 7.65 62.70 9.89 58.98 12.59 56.07 C 14.48 53.81 16.86 52.68 18.32 52.68 C 19.60 52.68 21.06 53.00 21.06 55.26 C 21.06 59.30 18.13 65.28 17.95 65.93 C 17.04 67.87 16.31 70.13 15.39 72.39 C 13.04 78.37 10.49 84.19 8.25 89.84 C 6.45 94.85 4.06 100.99 4.06 106.00 C 4.06 111.76 7.80 114.72 10.19 115.97 C 11.99 116.76 13.63 116.91 14.48 116.91 C 21.06 116.91 26.95 113.01 37.50 100.18 C 40.21 97.11 42.16 94.04 44.12 91.13 C 42.46 95.66 41.11 100.50 40.21 105.19 C 40.06 106.16 40.06 107.29 40.06 108.26 C 40.06 112.69 42.01 114.88 44.27 115.97 C 45.62 116.60 46.53 116.60 47.13 116.60 C 51.81 116.60 56.93 113.47 63.01 103.57 C 63.81 102.28 64.61 100.83 65.41 99.37 C 66.05 97.76 65.57 97.92 64.13 96.79 C 63.97 96.63 63.49 96.14 63.01 96.14 C 62.69 96.14 62.37 96.47 62.21 96.79 C 59.65 101.31 58.85 102.93 55.65 106.48 C 53.73 108.74 52.77 109.39 51.49 109.39 C 49.57 109.39 48.93 107.61 48.93 106.16 C 48.93 99.37 54.21 84.02 61.57 65.44 C 62.85 62.05 64.29 58.66 65.73 55.26 C 66.85 52.35 67.81 50.06 67.81 48.92 C 67.97 47.44 66.37 47.12 65.89 46.95 C 65.25 46.79 64.29 46.79 63.17 46.79 C 58.53 46.79 57.25 47.77 56.13 50.55 C 54.53 53.97 53.73 57.20 52.61 60.43 C 51.65 63.50 50.69 66.41 49.57 69.32 C 47.88 73.84 44.42 85.80 33.30 98.89 C 31.85 100.18 30.78 101.47 29.61 102.77 C 28.43 104.06 24.01 110.04 18.87 110.04 C 16.67 110.04 13.93 108.58 13.93 104.87 C 13.93 100.02 16.86 94.69 19.05 89.84 C 21.94 83.22 24.59 76.43 26.81 69.81 C 29.46 61.73 30.78 56.88 30.78 53.32 C 30.78 46.95 26.95 45.16 24.45 45.16 C 22.38 45.16 16.86 45.81 11.09 51.21 C 6.45 56.07 4.36 60.60 1.34 67.06 C 0.86 67.70 0.86 67.87 0.86 68.35 C 0.86 68.67 1.02 68.84 1.66 69.16 L 3.10 69.81 L 3.10 69.81 Z",
       i: "M 35.04 100.99 C 35.04 100.83 35.52 100.02 35.52 99.70 C 35.52 99.22 34.88 98.57 34.72 98.57 C 34.08 97.92 33.76 97.44 32.96 97.28 C 32.64 97.28 32.64 97.44 32.16 97.76 C 29.28 101.32 26.24 105.36 22.39 107.78 C 20.95 108.91 19.98 109.07 19.14 109.07 C 16.10 109.07 15.93 106.16 15.93 105.68 C 15.93 99.86 23.03 82.73 28.64 64.96 C 30.56 59.14 31.84 54.46 31.84 52.19 C 31.84 48.52 29.12 45.46 23.83 45.46 C 20.63 45.46 17.79 46.69 16.78 47.14 C 12.72 48.98 8.73 52.19 2.98 60.76 C 2.66 61.24 2.34 61.73 2.34 62.05 C 2.34 62.54 2.50 62.86 3.46 63.50 C 4.10 63.83 4.74 64.31 5.21 64.31 C 5.67 64.31 6.13 63.50 6.28 63.34 C 8.89 59.63 10.72 56.72 14.40 53.81 C 16.10 52.52 16.95 52.03 18.13 52.03 C 19.81 52.03 20.15 53.49 20.15 54.94 C 20.15 59.95 15.78 70.94 15.01 73.20 C 13.33 78.37 11.64 83.70 9.96 89.04 C 8.43 93.72 6.90 98.41 5.67 103.26 C 5.21 105.52 5.06 107.46 5.06 108.43 C 5.06 112.11 7.05 115.15 8.73 116.11 C 10.57 117.08 12.56 117.08 13.02 117.08 C 15.17 117.08 20.95 116.11 27.20 110.03 C 30.08 107.30 32.64 103.90 35.04 100.99 L 35.04 100.99 ZM 30.08 15.33 C 30.72 15.98 32.64 17.60 35.52 17.60 C 39.68 17.60 43.20 14.36 43.20 9.84 C 43.20 5.63 39.84 2.23 35.52 2.07 C 31.36 2.07 27.84 5.47 27.84 9.84 C 27.84 12.75 29.44 14.69 30.08 15.33 L 30.08 15.33 Z",
       j: "M 48.19 64.94 C 48.67 64.13 51.71 57.84 55.87 54.29 C 56.19 53.97 57.63 52.68 59.23 52.68 C 61.15 52.68 61.15 55.10 61.15 55.58 C 61.15 57.84 60.35 60.10 59.87 61.71 C 57.95 69.13 55.39 76.72 53.15 84.14 C 48.83 97.20 44.67 110.43 40.35 123.66 C 39.07 127.37 37.95 131.08 36.67 134.80 C 34.91 140.12 33.15 146.73 27.87 150.12 C 25.31 151.73 21.15 151.90 20.67 151.90 C 17.63 151.90 15.87 150.93 14.59 149.64 C 13.95 148.99 12.83 147.54 12.19 145.28 C 11.87 144.47 11.71 141.57 8.83 140.28 C 8.51 140.12 7.55 139.64 6.59 139.64 C 2.75 139.80 1.31 143.18 1.31 144.64 C 1.31 149.31 6.27 152.37 7.23 152.99 C 12.51 155.78 17.47 155.93 19.23 155.93 C 20.03 155.93 34.27 156.09 42.11 144.96 C 46.43 138.67 50.59 124.95 50.75 124.47 C 52.99 117.69 54.75 112.53 56.51 107.05 C 58.75 100.43 60.83 93.49 62.94 86.56 C 67.32 72.52 72.68 55.74 72.68 51.47 C 72.84 45.59 66.67 44.99 65.53 44.99 C 63.26 44.99 61.15 45.74 60.19 46.05 C 55.71 47.86 51.55 50.87 46.43 59.61 C 45.95 60.26 44.19 63.16 44.19 64.29 C 44.19 65.10 44.83 65.42 45.15 65.42 C 46.11 65.91 46.43 66.07 46.91 66.07 C 47.39 66.07 47.87 65.58 48.19 64.94 L 48.19 64.94 ZM 71.86 17.36 C 73.96 19.44 76.68 19.76 77.64 19.76 C 82.28 19.76 85.80 16.24 85.96 11.60 C 85.96 6.96 82.44 3.43 77.80 3.27 C 73.32 3.27 69.59 6.80 69.59 11.44 C 69.59 12.56 69.75 15.12 71.86 17.36 L 71.86 17.36 Z",
       o: "M 36.55 45.71 C 26.10 45.99 17.75 55.03 14.54 58.93 C 11.29 63.15 9.64 66.41 8.89 68.03 C 6.65 72.58 3.06 80.38 3.06 91.28 C 3.06 103.79 7.55 111.76 13.58 115.07 C 16.95 116.78 19.52 116.93 20.80 116.93 C 24.02 116.93 27.23 115.85 28.19 115.54 C 36.55 112.41 42.65 105.09 45.20 101.52 C 46.24 99.89 47.56 97.78 49.33 94.04 C 54.64 82.99 54.93 74.70 54.93 70.31 C 54.93 61.69 52.57 55.51 50.36 52.26 C 45.50 45.57 38.31 45.71 36.55 45.71 L 36.55 45.71 ZM 36.06 49.17 C 42.01 48.76 45.06 55.84 45.06 65.10 C 45.06 67.87 44.74 70.79 44.42 73.72 C 42.81 83.64 39.60 91.28 37.99 95.18 C 35.74 100.38 33.33 105.74 28.03 110.13 C 25.14 112.73 22.89 113.06 21.77 113.06 C 20.32 113.06 17.27 112.24 15.34 108.51 C 12.78 103.95 12.78 97.78 12.78 96.80 C 12.78 80.22 21.61 62.99 24.98 57.95 C 25.78 56.81 28.35 53.08 32.21 50.64 C 33.01 50.15 34.30 49.34 36.06 49.17 L 36.06 49.17 Z",
       t: "M 46.64 46.14 C 46.80 45.04 46.64 44.88 45.52 44.88 C 40.72 45.19 35.44 45.19 32.40 45.19 C 34.80 37.68 37.04 31.44 39.92 22.64 C 40.24 21.20 39.76 20.56 39.12 20.40 C 38.48 20.08 33.04 19.92 32.24 19.92 C 30.00 19.92 29.68 21.36 29.36 22.16 C 26.64 31.28 24.88 36.56 22.16 45.19 L 11.76 45.19 C 10.80 45.35 10.48 45.04 10.16 46.61 L 9.52 49.13 C 9.52 49.44 9.36 50.40 10.48 50.24 L 20.40 50.24 C 16.88 61.40 13.52 71.90 10.48 80.59 C 9.04 85.03 7.76 89.13 6.15 93.72 C 3.75 101.11 2.15 105.37 2.15 109.46 C 2.15 113.98 5.99 115.94 7.92 116.55 C 9.04 116.85 10.80 117.00 10.96 117.00 C 12.08 117.00 13.52 116.85 15.76 116.24 C 18.80 115.34 23.44 113.08 29.20 105.54 C 30.96 103.08 32.72 100.45 34.32 97.82 C 34.96 96.51 34.80 96.18 33.68 95.36 C 33.52 95.36 32.56 94.71 31.92 94.71 C 31.28 94.71 30.96 95.20 30.80 95.53 C 29.04 98.32 24.24 105.70 20.88 108.16 C 19.44 109.15 18.16 109.31 17.68 109.31 C 16.56 109.31 15.76 108.98 15.28 108.65 C 13.68 107.67 13.84 105.70 13.84 105.37 C 13.84 101.93 17.84 90.28 18.96 86.83 C 22.48 76.33 26.48 63.37 30.64 50.40 L 43.92 49.91 C 45.20 49.91 45.52 49.76 46.00 48.65 L 46.64 46.14 L 46.64 46.14 Z",
       e: "M 16.76 81.14 C 18.85 80.66 20.94 80.17 23.19 79.68 C 34.60 76.75 42.64 72.52 47.39 67.97 C 48.33 66.99 49.11 66.18 49.88 65.20 C 53.47 60.49 53.78 57.39 53.78 55.44 C 53.78 51.54 52.22 45.94 43.29 45.94 C 37.18 45.94 30.75 49.63 28.98 50.89 C 24.15 54.14 17.56 60.32 13.54 65.69 C 11.77 67.97 10.50 70.08 9.07 72.36 C 6.68 76.75 2.06 85.70 2.06 96.92 C 2.06 103.75 4.13 108.63 6.20 111.38 C 6.52 111.83 7.95 113.45 9.38 114.34 C 12.74 116.70 16.27 117 17.56 117 C 19.97 117 23.19 116.26 25.60 115.22 C 30.26 113.30 34.60 109.93 38.62 104.73 C 40.88 101.64 41.52 100.34 42.64 98.38 C 42.97 97.73 43.13 97.41 42.81 97.08 C 42.48 96.43 40.23 95.46 39.91 95.46 C 39.43 95.46 39.27 95.62 38.79 96.43 C 37.50 98.55 36.86 99.85 35.25 101.80 C 33.64 103.92 27.69 111.23 20.62 111.23 C 16.11 111.23 11.77 107.49 11.77 99.69 C 11.77 92.20 15.95 82.93 16.76 81.14 L 16.76 81.14 ZM 18.20 76.43 C 19.49 73.82 20.62 71.22 22.06 68.46 C 23.35 66.02 25.12 63.25 26.73 60.81 C 32.03 52.84 36.05 50.24 39.75 50.07 C 43.13 50.07 45.06 52.52 45.06 55.44 C 45.06 58.05 43.29 64.23 35.41 69.92 C 28.01 75.12 20.45 75.94 18.20 76.43 L 18.20 76.43 Z",
    },
    //swap: [[2,3]],
    start: [0, 130, 200, 200, 280, 325, 358],
    solution: [0, -23, -19, -16, -23, -12, 0],
    lines: [2, 156, 46, 117]
  },

  {
    word: 'gargantuan',
    typeface: "FF Meta Black",
    typefaceUrl: "https://www.fontshop.com/families/ff-meta",
    creator: "Erik Spiekermann",
    creatorUrl: "http://en.wikipedia.org/wiki/Erik_Spiekermann",
    year: 1991,
    letters: {
      g: "M 61.97 27.81 C 59.28 27.81 57.86 27.50 52.01 26.09 C 46.11 24.53 41.96 24.06 37.34 24.06 C 16.50 24.06 3.06 34.70 3.06 51.31 C 3.06 63.37 8.75 70.73 20.45 73.70 C 15.71 74.80 10.49 77.15 8.12 79.96 C 6.38 82.00 5.59 84.70 5.59 87.78 C 5.59 90.28 6.22 92.48 7.17 94.36 C 8.28 96.08 9.86 97.49 11.76 98.27 C 15.55 99.68 21.72 100.62 31.27 100.78 C 36.22 100.78 39.25 100.93 40.37 100.93 C 46.27 101.26 49.30 102.22 51.53 103.35 C 53.75 104.65 55.33 107.55 55.33 110.78 C 55.33 114.01 53.27 117.24 50.26 119.18 C 47.39 121.12 42.76 121.93 36.70 121.93 C 26.80 121.93 21.40 118.37 21.40 111.75 C 21.40 108.85 21.72 108.20 22.35 106.42 L 2.74 106.42 C 1.94 108.04 0.82 110.30 0.82 114.82 C 0.82 120.47 3.06 125.25 7.49 129.32 C 14.76 136.05 26.65 137.93 38.29 137.93 C 51.06 137.93 63.23 135.11 70.35 127.60 C 74.81 122.90 76.89 117.57 76.89 110.62 C 76.89 103.19 74.65 97.64 69.88 93.26 C 64.18 88.09 57.70 86.21 45.31 86.06 L 33.83 85.89 C 31.59 85.89 30.31 85.04 30.31 83.86 C 30.31 81.49 33.35 79.46 38.77 76.84 C 40.37 76.99 41.01 76.99 41.96 76.99 C 59.28 76.99 71.93 66.97 71.93 53.06 C 71.93 47.66 70.35 43.53 67.19 39.73 C 69.88 40.04 70.67 40.20 72.73 40.20 C 78.65 40.20 83.13 38.46 87.77 34.23 L 78.81 20.86 C 73.85 25.31 67.82 27.81 61.97 27.81 L 61.97 27.81 ZM 50.10 51.47 C 50.10 58.93 45.47 63.06 37.02 63.06 C 29.52 63.06 24.41 59.72 24.41 51.47 C 24.41 43.85 29.04 39.41 37.18 39.41 C 45.31 39.41 50.10 43.85 50.10 51.47 L 50.10 51.47 Z",
      a: "M 12.71 49.88 C 21.57 43.86 29.61 40.46 36.51 40.46 C 44.37 40.46 46.13 43.54 46.13 52.80 L 46.13 56.21 C 43.89 56.06 42.93 56.06 41.32 56.06 C 15.13 56.06 1.75 64.83 1.75 84.32 C 1.75 100.85 11.74 109.93 30.09 109.93 C 36.83 109.93 42.61 108.37 46.61 105.55 C 48.19 104.45 48.50 104.14 51.51 101.32 C 53.56 105.39 57.99 108.99 62.90 111.05 L 74.21 98.19 C 67.97 93.57 66.53 90.10 66.53 81.01 L 66.53 79.53 L 67.01 51.99 C 67.01 43.05 66.69 40.46 65.58 37.14 C 62.42 28.12 53.09 23.06 39.40 23.06 C 31.86 23.06 24.95 24.48 16.90 27.80 C 11.10 30.02 8.84 31.12 3.52 34.45 L 12.71 49.88 L 12.71 49.88 ZM 45.50 88.78 C 42.29 92.41 38.28 94.56 34.26 94.56 C 28.81 94.56 24.79 90.10 24.79 83.49 C 24.79 73.41 29.93 70.62 44.85 70.62 L 45.82 70.62 L 45.50 88.78 L 45.50 88.78 Z",
      r: "M 5.26 52.07 L 5.26 106.89 L 26.45 106.89 L 26.45 48.84 C 30.45 44.16 34.77 41.90 39.57 41.90 C 41.97 41.90 43.73 42.38 45.81 43.51 L 51.73 24.80 C 48.37 23.37 46.93 23.06 43.73 23.06 C 41.33 23.06 38.45 23.53 36.69 24.32 C 32.69 26.22 27.57 30.49 24.55 34.60 C 24.23 30.02 23.13 26.38 21.23 23.06 L 2.22 28.12 C 3.98 32.71 5.26 40.93 5.26 52.07 L 5.26 52.07 Z",
      n: "M 4.06 47.84 L 4.06 106.89 L 25.25 106.89 L 25.25 49.28 C 30.15 44.81 35.68 41.93 39.95 41.93 C 45.48 41.93 47.06 44.65 47.06 53.90 L 47.06 106.89 L 67.93 106.89 L 67.93 47.36 C 67.93 42.25 67.46 38.77 66.35 35.76 C 63.82 28.80 55.91 24.06 46.90 24.06 C 42.16 24.06 36.63 25.32 32.36 27.54 C 28.88 29.44 27.94 30.07 23.03 33.55 C 23.03 30.23 21.93 26.75 20.03 23.42 L 1.18 28.80 C 3.10 34.18 4.06 40.83 4.06 47.84 L 4.06 47.84 Z",
      t: "M 30.69 25.06 C 30.69 16.74 31.17 7.94 31.97 0.42 L 10.45 5.86 C 9.66 11.94 9.66 17.38 9.66 25.37 L 1.50 25.37 L 1.50 38.99 L 9.66 38.99 L 9.66 84.44 C 9.66 92.02 9.82 93.63 11.08 97.09 C 13.45 104.13 22.15 108.83 32.93 108.83 C 38.53 108.83 44.13 107.74 50.37 105.23 L 47.65 92.67 C 43.81 93.80 41.89 94.27 39.97 94.27 C 32.61 94.27 30.69 91.54 30.69 81.06 L 30.69 38.99 L 44.45 38.99 L 49.89 25.06 L 30.69 25.06 L 30.69 25.06  Z",
      u: "M 0.26 79.66 C 0.26 87.98 0.73 92.30 2.00 95.94 C 4.69 103.61 14.49 108.93 25.98 108.93 C 34.70 108.93 42.45 106.27 47.69 101.26 C 49.11 104.55 51.32 107.21 54.01 109.09 L 69.09 100.63 C 65.89 96.88 64.13 91.34 64.13 85.90 L 64.13 23.34 L 43.89 27.66 L 43.89 85.26 C 42.29 89.26 35.83 93.10 30.50 93.10 C 27.27 93.10 24.04 91.50 22.91 89.26 C 21.62 87.02 21.13 83.18 21.13 75.82 L 21.13 23.18 L 0.26 27.18 L 0.26 79.66 L 0.26 79.66 Z"
     },
    start: [0, 80, 160, 240, 320, 400, 480, 540, 620, 690],
    solution: [0, 11, 11, -14, -3, -3, -8, -8, -12, 0],
    lines: [0, 138, 24, 107,]
  },

  {
    word: 'Toronto',
    typeface: "Didot",
    typefaceUrl: "http://new.myfonts.com/fonts/linotype/didot/",
    creator: "Firmin Didot",
    creatorUrl: "http://en.wikipedia.org/wiki/Firmin_Didot",
    year: '1784',
    letters: {
      T: "M 26.90 135 L 88.07 135 L 88.07 132.35 L 67 132.35 L 67 2.89 L 78.01 2.89 C 80.54 2.89 83.39 3.12 86.56 3.56 C 89.71 4 92.92 5.23 96.15 7.265 C 99.37 9.29 102.48 12.5 105.46 16.87 C 108.43 21.25 111.01 27.28 113.17 35 L 115.25 35 L 115.25 0 L -0.26 0 L -0.26 35 L 1.82 35 C 3.98 27.28 6.54 21.25 9.51 16.87 C 12.48 12.5 15.59 9.29 18.82 7.26 C 22.04 5.23 25.25 4 28.42 3.56 C 31.57 3.12 34.43 2.89 36.96 2.89 L 48 2.89 L 48 132.35 L 26.90 132.35 L 26.90 135 L 26.90 135 Z",
      o: "M 21.65 75.48 C 22.65 70.37 24.18 66.20 26.25 62.98 C 28.31 59.76 30.92 57.46 34.06 56.07 C 37.18 54.70 40.89 54 45.15 54 C 49.40 54 53.11 54.70 56.25 56.07 C 59.37 57.46 61.98 59.76 64.04 62.98 C 66.11 66.20 67.65 70.37 68.65 75.48 C 69.65 80.59 70.15 86.93 70.15 94.5 C 70.15 103.46 69.45 110.59 68.08 115.89 C 66.70 121.18 64.87 125.25 62.62 128.09 C 60.37 130.93 57.73 132.79 54.73 133.67 C 51.73 134.56 48.53 135 45.15 135 C 41.76 135 38.56 134.56 35.56 133.67 C 32.56 132.79 29.92 130.93 27.67 128.09 C 25.42 125.25 23.59 121.18 22.22 115.89 C 20.84 110.59 20.15 103.46 20.15 94.5 C 20.15 86.93 20.65 80.59 21.65 75.48 L 21.65 75.48 ZM 4.92 111.39 C 7.43 116.67 10.75 121.28 14.84 125.21 C 18.93 129.15 23.62 132.28 28.90 134.56 C 34.18 136.84 39.61 138 45.15 138 C 50.68 138 56.11 136.84 61.39 134.56 C 66.67 132.28 71.37 129.15 75.47 125.21 C 79.56 121.28 82.86 116.67 85.37 111.39 C 87.89 106.10 89.15 100.48 89.15 94.5 C 89.15 88.28 87.79 82.48 85.09 77.14 C 82.37 71.79 78.92 67.18 74.70 63.31 C 70.48 59.43 65.76 56.40 60.54 54.25 C 55.31 52.09 50.18 51 45.15 51 C 40.12 51 34.98 52.09 29.76 54.25 C 24.53 56.40 19.81 59.43 15.59 63.31 C 11.37 67.18 7.92 71.79 5.22 77.14 C 2.50 82.48 1.15 88.28 1.15 94.5 C 1.15 100.48 2.40 106.10 4.92 111.39 L 4.92 111.39 Z",
      r: "M 2.35 135 L 49.52 135 L 49.52 132.32 L 32.99 132.32 L 32.99 88.71 C 32.99 83.39 33.63 78.65 34.95 74.53 C 36.26 70.40 37.88 66.87 39.82 63.95 C 41.76 61.04 43.84 58.82 46.09 57.29 C 48.32 55.76 50.45 55 52.45 55 C 56.81 55 58.99 57.01 58.99 61.04 C 58.99 62.68 58.85 63.95 58.60 64.82 C 58.35 65.70 58.06 66.5 57.74 67.18 C 57.43 67.87 57.15 68.57 56.90 69.26 C 56.65 69.95 56.52 70.87 56.52 72 C 56.52 75.34 59.38 77 65.12 77 C 67.74 77 70.06 76.31 72.02 74.93 C 73.99 73.56 74.99 70.79 74.99 66.64 C 74.99 64.76 74.67 62.87 74.04 60.98 C 73.40 59.10 72.38 57.43 70.98 56 C 69.57 54.56 67.79 53.35 65.63 52.42 C 63.48 51.48 60.93 51 58.01 51 C 53.93 51 50.46 51.76 47.60 53.26 C 44.73 54.76 42.27 56.62 40.24 58.81 C 38.21 61.01 36.62 63.31 35.48 65.68 C 34.32 68.07 33.49 70.21 32.99 72.09 L 32.99 73 L 32.99 53 L 2.35 53 L 2.35 56 L 16.99 56 L 16.99 132.32 L 2.35 132.32 L 2.35 135 L 2.35 135 Z",
      n: "M 3.74 135 L 48.99 135 L 48.99 132.34 L 34.36 132.34 L 34.36 89.35 C 34.36 84.29 35.16 79.60 36.75 75.29 C 38.35 70.98 40.55 67.25 43.36 64.07 C 46.18 60.92 49.43 58.45 53.13 56.67 C 56.82 54.89 60.72 54 64.82 54 C 69.78 54 73.46 55.59 75.82 58.75 C 78.18 61.92 79.36 65.98 79.36 70.92 L 79.36 132.34 L 64.72 132.34 L 64.72 135 L 110.00 135 L 110.00 132.32 L 95.36 132.32 L 95.36 76.57 C 95.36 67.67 92.72 61.18 87.47 57.10 C 82.22 53.04 75.41 51 67.05 51 C 61.60 51 56.97 51.85 53.18 53.57 C 49.36 55.29 46.21 57.37 43.68 59.78 C 41.14 62.20 39.14 64.68 37.69 67.23 C 36.22 69.78 35.11 71.87 34.36 73.53 L 34.36 74 L 34.36 53 L 3.74 53 L 3.74 56 L 18.36 56 L 18.36 132.32 L 3.74 132.32 L 3.74 135 L 3.74 135 Z",
      t: "M 0.03 56 L 14.65 56 L 14.65 116.78 C 14.65 123.53 16.48 128.76 20.14 132.45 C 23.79 136.14 30.34 138 39.76 138 C 43.56 138 46.73 137.32 49.26 136.03 C 51.79 134.71 53.85 133.14 55.45 131.29 C 57.03 129.46 58.20 127.53 58.96 125.5 C 59.71 123.46 60.29 121.64 60.67 119.98 L 58.01 119.04 C 57.25 123.23 55.5 126.93 52.78 130.15 C 50.06 133.39 46.48 135 42.04 135 C 40.78 135 39.48 134.81 38.15 134.43 C 36.81 134.06 35.57 133.26 34.45 132.04 C 33.31 130.84 32.39 129.12 31.70 126.90 C 31 124.68 30.65 121.81 30.65 118.25 L 30.65 56 L 57.64 56 L 57.64 53 L 30.65 53 L 30.65 27 C 29.40 28.03 28.10 28.76 26.75 29.20 C 25.37 29.64 23.76 29.85 21.90 29.85 C 19.79 29.85 18.31 29.73 17.43 29.48 C 16.56 29.23 15.64 28.90 14.65 28.53 L 14.65 53 L 0.03 53 L 0.03 56 L 0.03 56 Z"
    },
    start: [0, 131, 226, 312, 392, 500, 570],
    solution: [0, -20, -20, -22, -9, -5, 0],
    lines: [0, 53, 135]
  },

 {
    word: 'Xylophone',
    typeface: "Syntax",
    typefaceUrl: "http://www.linotype.com/en/54897/LinotypeSyntax-family.html",
    creator: "Hans Eduard Meier",
    creatorUrl: "https://www.typotheque.com/articles/hans_eduard_meier_a_life_dedicated_to_letter_design",
    year: '2000',
    letters: {
      X: "M 19.00 129.05 L 48.92 83.96 L 77.14 129.05 L 96.86 118.75 L 61.84 67.16 L 96.52 17.60 L 77.65 7.26 L 49.60 50.36 L 22.06 7.26 L 2.17 17.60 L 36.34 66.82 L 0.13 118.75 L 19.00 129.05 L 19.00 129.05 Z",
      y: "M 3.22 168.01 L 7.14 168.01 C 29.26 168.01 37.94 157.45 45.94 137.55 L 83.04 44.68 L 63.30 39.26 L 41.00 100.98 L 40.66 100.98 L 22.11 39.26 L 1.35 44.68 L 30.28 126.83 L 24.16 139.93 C 18.88 150.98 9.52 151.32 6.29 151.32 L 3.22 151.32 L 3.22 168.01 L 3.22 168.01 Z",
      l: "M 0.02 127.05 L 20.75 127.05 L 21.77 0.26 L 1.04 0.26 L 0.02 127.05 L 0.02 127.05 Z",
      o: "M 0.73 83.99 C 0.73 108.11 13.81 129.01 41.59 129.01 C 67.34 129.01 82.46 108.11 82.46 83.99 C 82.46 58.87 68.70 38.98 41.59 38.98 C 16.53 38.98 0.73 61.57 0.73 83.99 L 0.73 83.99 ZM 21.46 84.67 C 21.46 72.87 26.20 55.67 41.59 55.67 C 55.47 55.67 61.73 66.97 61.73 84.67 C 61.73 96.47 56.48 112.32 41.59 112.32 C 26.20 112.32 21.46 94.95 21.46 84.67 L 21.46 84.67 Z",
      p: "M 0.76 168.05 L 21.49 168.05 L 22.00 120.84 L 22.33 120.84 C 26.99 126.96 34.47 129.00 41.29 129.00 C 65.41 129.00 78.66 106.05 78.66 82.98 C 78.66 57.19 63.71 38.99 42.62 38.99 C 33.81 38.99 25.66 43.92 21.49 50.39 L 21.15 50.39 L 21.15 41.21 L 1.27 41.21 L 0.76 168.05 L 0.76 168.05 ZM 22.33 70.08 C 23.49 62.79 28.82 56.68 37.30 56.68 C 49.44 56.68 57.93 67.88 57.93 84.00 C 57.93 101.13 47.11 111.31 36.80 111.31 C 29.48 111.31 25.16 107.07 22.33 103.51 L 22.33 70.08 L 22.33 70.08 Z",
      h: "M 0.79 127.05 L 21.86 127.05 L 22.20 68.89 C 27.44 63.80 34.54 57.69 40.97 57.69 C 49.59 57.69 52.13 62.62 52.13 69.23 C 52.13 76.02 51.96 92.31 51.79 105.55 L 51.62 127.05 L 72.35 127.05 L 72.86 84.00 C 72.86 78.57 73.03 73.31 73.03 64.82 C 73.03 51.57 68.27 39.00 50.27 39.00 C 38.94 39.00 29.30 44.26 22.71 51.74 L 22.37 51.74 L 22.71 0.26 L 1.65 0.26 L 0.79 127.05 L 0.79 127.05 Z",
      n: "M 2.19 127.05 L 23.26 127.05 L 23.60 68.89 C 28.84 63.80 35.94 57.69 42.37 57.69 C 50.99 57.69 53.53 61.43 53.53 71.95 C 53.53 82.13 53.36 92.31 53.19 105.55 L 53.02 127.05 L 73.75 127.05 L 74.26 84.00 C 74.26 78.57 74.43 73.31 74.43 64.82 C 74.43 51.57 69.67 39.00 51.67 39.00 C 40.34 39.00 30.70 44.26 24.11 51.74 L 23.77 51.74 L 23.77 41.22 L 3.05 41.22 L 2.19 127.05 L 2.19 127.05 Z",
      e: "M 75.45 86.84 C 75.45 56.87 64.23 38.96 39.97 38.96 C 14.83 38.96 0.73 61.80 0.73 84.62 C 0.73 110.99 16.36 129.01 38.26 129.01 C 52.31 129.01 64.23 122.20 73.24 112.15 L 61.35 101.50 C 56.08 106.99 49.57 112.32 41.34 112.32 C 26.95 112.32 21.64 98.33 21.46 86.84 L 75.45 86.84 L 75.45 86.84 ZM 22.49 72.15 C 23.35 63.66 30.55 53.65 39.97 53.65 C 50.94 53.65 55.22 62.98 55.74 72.15 L 22.49 72.15 L 22.49 72.15 Z"
    },
    start: [0, 90, 200, 230, 340, 420, 520, 610, 690],
    solution: [0, 10, -2, 4, -11, 2, -11, -10, 0],
    lines: [0, 168, 40, 127]
  },

];

stages.forEach((stage, i) => {
  const max = Math.max(...stage.start);
  stage.pct = stage.solution.map((x, i) => {
    return x/max * 100;
  });
  stage.scene = function(stageObj){
    composer.lines(this.lines);
    stageObj.letters[0].lock();
    stageObj.letters[stageObj.letters.length-1].lock();
  }
  stage.index = i;
})
function draggable(node) {
  const root_sctm = dom.root.getScreenCTM().inverse();
  var zoom = 1;
  var touched = false;
  var x;
  var y;

  node.addEventListener('touchstart', handleMousedown);
  node.addEventListener('mousedown', handleMousedown);

  function handleMousedown(e) {
    e.preventDefault();

    touched =  e.touches ? e.touches.length : false;
    if (touched) e = e.touches[0];
    const pt = utils.transformPoint( e.screenX, e.screenY, root_sctm );

    zoom = dom.root.viewBox.baseVal.width/window.innerWidth;

    x = pt.x * zoom;
    y = pt.y * zoom;
    
    const els = utils.elementsAt(e.pageX, e.pageY);
    const l = els.find((el)=> el.nodeName === "path");
    node = l ? l.parentNode : node;
    node.dispatchEvent(new CustomEvent('dragstart', {
      detail: { x, y }
    }));

    window.addEventListener(touched ? 'touchmove' : 'mousemove', handleMousemove, {passive: false});
    window.addEventListener(touched ? 'touchend' : 'mouseup', handleMouseup);
  }

  function handleMousemove(e) {
    e.preventDefault();
    if (touched) e = e.touches[0];
    var pt = utils.transformPoint( e.screenX, e.screenY, root_sctm );
    if (touched) zoom = 1;
    const dx = (pt.x * zoom - x);
    const dy = (pt.y * zoom - y);
    x = pt.x * zoom,
    y = pt.y * zoom;


    node.dispatchEvent(new CustomEvent('dragmove', {
      detail: { x, y, dx, dy }
    }));
  }

  function handleMouseup(e) {
    //e.preventDefault();
    if (touched) e = e.changedTouches[0];
    var pt = utils.transformPoint( e.screenX, e.screenY, root_sctm ),
    x = pt.x * zoom,
    y = pt.y * zoom;


    node.dispatchEvent(new CustomEvent('dragend', {
      detail: { x, y }
    }));

    window.removeEventListener(touched ? 'touchmove' : 'mousemove', handleMousemove);
    window.removeEventListener(touched ? 'touchend' : 'mouseup', handleMouseup);
  }

  return {
    destroy() {
      node.removeEventListener('touchstart', handleMousedown);
      node.removeEventListener('mousedown', handleMousedown);
    }
  };
}
window.addEventListener("keydown", function(e){
  
  const key = e.key;
  const command = navigator.platform.toUpperCase().indexOf('MAC')>=0 ? e.metaKey : e.ctrlKey;
  const shift = e.shiftKey;

  if (key === "k") {
    e.preventDefault();
    drawer.toggle();
  }

  if (key === "Tab") {
    e.preventDefault();
    stage[shift ? "selectPrev" : "selectNext"]();
  }

  if (key === "ArrowRight") {
    e.preventDefault();
    stage.nudgeSelected(shift ? 10 : 1)
  }

  if (key === "ArrowLeft") {
    e.preventDefault();
    stage.nudgeSelected(shift ? -10 : -1)
  }

  if (key === "Enter") {
    e.preventDefault();
    const comparing = state.get("stageComparing");

    if (comparing) {
      if (shift) game.load()
      else game.nextStage()
    }
    else {
      if (shift) game.prevStage()
      else state.set("stageComparing", true);
    }
  }

});

dom.qsa(".metaKey").forEach(function(metaKey){
  metaKey.innerHTML = utils.metaKey();
});
function Table(selector){
  const el = dom.qs(selector);
  function hide(){
    el.style.display = "none";
  }

  function show(){
    el.style.display = "";
  }
  function render(data){
    dom.empty(el);
    const table = dom.create({el: "table"});

    const t_tr = dom.create({el: "tr"}, table);
    // const t_th = dom.create({el: "th", html: "Typeface"}, t_tr);
    const t_td = dom.create({el: "td"}, t_tr);
    const t_a = dom.create({el: "a", 
          target: "_blank", 
          href: data.typefaceUrl,
        //   html: data.typeface
        }, t_td);

    const c_tr = dom.create({el: "tr"}, table);
    // const c_th = dom.create({el: "th", html: "Creator"}, c_tr);
    const c_td = dom.create({el: "td"}, c_tr);
    const c_a = dom.create({el: "a", 
          target: "_blank", 
          href: data.creatorUrl,
        //   html: data.creator
        }, c_td);

    // const y_tr = dom.create({el: "tr", class: 'desk-only'}, table);
    // const y_th = dom.create({el: "th", html: "Year"}, y_tr);
    // const y_td = dom.create({el: "td", html: data.year}, y_tr);


    el.appendChild(table);
    this.show();
  }

  this.render = render;
  this.show = show;
  this.hide = hide;
}
function Drawer(selector) {
  const el = dom.qs(selector);

  function toggle(){ el.classList.toggle("open") }
  function open()  { el.classList.add("open")    }
  function close() { el.classList.remove("open") }

  el.addEventListener("click", function(e){
    e.stopPropagation();
    el.classList.toggle("open")
  });

  this.toggle = toggle;
  this.open = open;
  this.close = close;
}
function Letter(d, x) {
  d = path.translate(x, 0)(d);
  const _self = this;
  const svg = dom.qs(".stage svg");
  const letters = dom.qs(".letters", svg);
  const root_sctm = svg.getScreenCTM().inverse();

  let dx = 0,
      g = dom.createNS({el: "g", class: "draggable letter"}),
      rect,
      pathEl;

  draggable(g);

  function renderLetter(d) {
    const bbox = path.getBBox(d);
    const pt = utils.transformPoint(0,0, root_sctm);
    const pt2 = utils.transformPoint(0,window.innerHeight, root_sctm);
    const lines = stages[state.get("stageIndex")].lines;
    rect = dom.createNS({
      el: "rect",
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
      fill: "rgba(0,0,0,0)",
      class: "dragarea"
    }, g)
    pathEl = dom.createNS({ el: "path", d: d}, g);
    
  }

  function lock(){
    g.classList.remove("draggable");
    g.classList.add("locked");
    this.isLocked = true;
  }

  function unlock(){
    g.classList.add("draggable");
    g.classList.remove("locked");
    this.isLocked = false;
  }
  
  function dragstart(e){
    drawer.close();
    if (_self.isLocked) {
      message.show("Letter is fixed")
    }
    else {
      _self.path.classList.add("dragging");
      letters.classList.add("dragging");
    }
  }

  function dragmove(e){
    if (_self.isLocked) return;
    dx += e.detail.dx;
    if (dx > 30) dx -= e.detail.dx;
    if (dx < -30) dx -= e.detail.dx;
    g.setAttribute("transform", `translate(${dx},0)`);
  }

  function dragend(e){
    if (dx) stage.reposition(dx);
    _self.path.classList.remove("dragging");
    letters.classList.remove("dragging");
  }

  function select(){
    g.classList.add("selected");
  }

  function deselect(){
    g.classList.remove("selected");
  }

  function toggle(bool = true){
    if (!bool) g.setAttribute("visibility", "hidden");
    else g.removeAttribute("visibility");
  }

  function nudge(amount){
    const transform = g.getAttribute("transform");
    const x = transform ? parseInt(transform.split("(")[1].split(",")[0]) : 0;
    g.setAttribute("transform", `translate(${x + amount}, 0)`)
  }

  function fadeOut(){
    anime({
      targets: g,
      duration: 500,
      easing: "easeInOutCubic",
      opacity: 0,
      complete: function(anim){
        g.setAttribute("visibility", "hidden");
        g.style.opacity = 1;
      }
    })
  }

  function remove(){
    g.removeEventListener("dragstart", dragstart);
    g.removeEventListener("dragmove", dragmove);
    g.removeEventListener("dragend", dragend);
    g.parentNode.removeChild(g);
  }

  function getOffset(){
    const transform = g.getAttribute("transform");
    if (!transform) return 0;
    const value = parseInt(
      transform
        .split("(")[1]
        .split(",")[0], 
    10);
    return isNaN(value) ? 0 : value;
  }

  function getDistance(x){
    return _self.getOffset() - x;
  }

  function slide(pos){
    anime({
      targets: g,
      duration: 1000,
      easing: "cubicBezier(0.000, .800, 0.485, .800)",
      transform: [`translate(${_self.getOffset()}, 0)`, `translate(${pos}, 0)`]
    })
  }

  function moveTo(x) {
    g.setAttribute("transform", `translate(${x}, 0)`);
  }

  function overlaps(letter) {
    const selfBBox = _self.path.getBBox() + _self.getOffset();
  }

  g.addEventListener("dragstart", dragstart);
  g.addEventListener("dragmove", dragmove);
  g.addEventListener("dragend", dragend);

  renderLetter(d);

  this.select = select;
  this.deselect = deselect;
  this.nudge = nudge;
  this.remove = remove;
  this.getOffset = getOffset;
  this.g = g;
  this.rect = rect;
  this.path = pathEl;
  this.lock = lock;
  this.unlock = unlock;
  this.isLocked = false;
  this.toggleVisibility = toggle;
  this.moveTo = moveTo;
  this.slide = slide;
  this.fadeOut = fadeOut;
  this.getDistance = getDistance;

  return this;

}

function Radio(selector, items){
  
  const el = dom.qs(selector);
  const g = dom.qs("svg g");

  items.forEach((obj, i) => {
    const radio = dom.create({el: 'a', "data-index": i, href: '#', html: obj.name, class: !i ? 'selected': ''}, el);
    radio.addEventListener("click", (e)=>{
      const index = parseInt(e.target.getAttribute("data-index"), 10);
      select(index);
      obj.fn(true);
    })
  });

  function hide(){
    el.style.display = "none";
  }

  function show(){
    el.style.display = "";
  }

  function select(index) {
    const items = dom.qsa("a", el);
    items.forEach(radio => radio.classList.remove("selected"));
    items[index].classList.add("selected");
  }

  this.show = show;
  this.hide = hide;
  this.select = select;

}
function Tutorial(){

  const el = dom.create({class: "tutorial"}, dom.body);
  const finger = dom.create({class: "finger"}, el);
  const tip = dom.create({class: "tip"}, finger);
  var isPlaying = false;

   var tl = anime.timeline({
      easing: 'easeOutQuint',
      duration: 400
    });

   el.addEventListener("click", stop);
   
   function play(){
     isPlaying = true;
     el.style.display = "block";
     const viewBox = dom.root.viewBox.baseVal ? dom.root.viewBox.baseVal : utils.viewBox;
     const letter = stage.letters[2];
     const zoom = viewBox.width/window.innerWidth;
     const ratio = window.innerWidth/window.innerWidth;
     var bbox = letter.path.getBoundingClientRect();

     finger.style.transform = `translate(0,${bbox.y + bbox.height/2}px)`



     

     tl.add({
       targets: finger,
       translateX: bbox.x + bbox.width/2,
       duration: 800,
       delay: 800
     })

     tl.add({
       targets: tip,
       scale: 1.5,
     });

     tl.add({
       targets: letter.rect,
       fill: ["rgba(49, 49, 58, 0.3)", "rgba(181, 230, 253, 0.1)"],
     }, 1600)


     tl.add({
       targets: finger,
       translateX: "-=30",
       easing: "cubicBezier(0.000, .800, 0.485, .800)",
       duration: 800,
       begin: function(anim){
         letter.slide(-30);
       }

     })

     tl.add({
       targets: tip,
       scale: 1,
     });

     tl.add({
       targets: finger,
       opacity: 0
     });

     tl.add({
       targets: letter.rect,
       fill: "rgba(181, 230, 253, 0)",
       delay: 400,
       complete: stop,
     }, 2800)


   }

   function stop(){
     el.style.display = "none";
     if (!isPlaying) return;
     isPlaying = false;
     tl.restart();
     tl.pause();
     const letter = stage.letters[2];
     letter.rect.style.fill = "rgba(0,0,0,0)";
     letter.slide(0);





   }

   this.stop = stop;

   this.play = play;
}
function Message(selector){
  const el = dom.qs(selector);
  if (!el) throw "Node could not be found"
  
  function show(message, type, duration = 2000){
    el.classList.remove("hidden")
    if (duration) { 
      setTimeout(function(){
        el.classList.add("hidden")
      }, duration)
    }
  }
  
  function hide(message, type){
    el.classList.remove("hidden")
  }
  
  this.show = show;
}
function Stage(selector){
  const el = dom.qs(selector);
  const gShadow = dom.createNS({el: "g"}, dom.root)
  const g = dom.createNS({el: "g", class: "letters"}, dom.root);
  const _self = this;
  var selectedIndex = false;
  var letters = [];
  var shadowLetters = [];

  const compareButton = dom.gid("compare");
  const nextButton = dom.gid("next");
  const scoreWidget = dom.gid("scoreWidget");
  const tryAgainButton = dom.qs("a", scoreWidget);
  compareButton.addEventListener("click", function(){state.set("stageComparing", true)});
  nextButton.addEventListener("click", game.nextStage);
  tryAgainButton.addEventListener("click", tryAgain);


  function renderLetters(data) {
    _self.letters.forEach(letter => letter.remove());
    const word = data.word.split("");
    _self.letters = word.map((d, i) => {
      return new Letter(data.letters[d], data.start[i]);
    }); 

    _self.letters.forEach(letter => {
      g.appendChild(letter.g);
    });

    reposition();
  }

  function tryAgain(){
    game.loadStage(state.get("stageIndex"));
  }

  function renderShadow() {
    const data = getStage();
    shadowLetters.forEach(letter => letter.remove());
    // locked = true
    shadowLetters = data.word.split("").map((d, i) => new Letter(data.letters[d], data.start[i], true));
    shadowLetters.forEach(letter => {
      letter.toggleVisibility(false);
      gShadow.appendChild(letter.g);
    })
  }

  function load(data) {
    el.classList.remove("comparing");
    renderShadow(data);
    renderLetters(data);
    const rs = renderScene.bind(_self);
    rs(data);
    table.render(data);
    radio.hide();
    nextButton.classList.add("hidden");
    compareButton.classList.remove("hidden");
    scoreWidget.classList.add("hidden");
  }

  function renderScene(data){
    if (!data.scene) return;
    else data.scene(this);
  }

  function selectNext() {
    if (!_self.letters.length) return;
    _self.letters.forEach(letter => letter.deselect());
    if (_self.selectedIndex === false) {
      _self.selectedIndex = 0;
    }
    else {
      _self.selectedIndex += 1;
      if (_self.selectedIndex >= _self.letters.length) _self.selectedIndex = 0;
    }

    const selectedLetter = _self.letters[_self.selectedIndex];
    selectedLetter.select();
    if (selectedLetter.isLocked)
      selectNext();
    else
      selectedLetter.select();
      
  }

  function selectPrev() {
    if (!_self.letters.length) return;
    _self.letters.forEach(letter => letter.deselect());
    if (_self.selectedIndex === false) {
      _self.selectedIndex = _self.letters.length-1;
    }
     else {
      _self.selectedIndex -= 1;
      if (_self.selectedIndex < 0) _self.selectedIndex = _self.letters.length-1;
    }
     const selectedLetter = _self.letters[_self.selectedIndex];
     selectedLetter.select();
    if (selectedLetter.isLocked)
      selectPrev();
    else
      selectedLetter.select();
  }

  function nudgeSelected(amount) {
    if (_self.selectedIndex === false) return;
    _self.letters[_self.selectedIndex].nudge(amount);
    reposition(); 
  }

  function getStage(){
    const index = state.get("stageIndex");
    const stage = stages[index];
    return stage;
  }

  function play(){
    el.classList.remove("comparing");
  }

  function compare(){
    const stage = getStage();
    // reposition all letters so they lie at zero
    const letters = _self.letters;
    const offsetStart = letters[0].getOffset();
    const offsetEnd = letters[letters.length-1].getOffset();
    const scale = g.getBBox().width / gShadow.getBBox().width;
    radio.select(0);

    _self.letters.forEach((letter, i) => {
      letter.lock();
      letter.position = letter.getOffset();
      shadowLetters[i].moveTo(letter.position);
      shadowLetters[i].lock();
      letter.deselect();
    });

    table.hide();
    radio.show();
    el.classList.add("comparing");
    nextButton.classList.remove("hidden");
    compareButton.classList.add("hidden");
    scoreWidget.classList.remove("hidden");
    score();
    compareBoth();
  }

  function score(){
    const stage = getStage();
    const letters = _self.letters;
    const currentPositions = _self.letters.map(letter => letter.position);
    const difference = currentPositions
      .map((position, i) => {
        const value = stage.solution[i] - position;
        return utils.scale(value);
      })
      .reduce((a, b) => Math.abs(a) + Math.abs(b));

    
    const score = difference > letters.length ? Math.max(0, 5*(20 - difference/letters.length-2)) : 100;
    const scores = state.get("stageScore").filter(score => score);
    scores[stage.index] = score;
    state.set("stageScore", scores);
    const scoreEl = dom.gid("score");
    //scoreEl.textContent = 100;
    anime({
      targets: scoreEl,
      duration: 1000,
      round: 1,
      innerHTML: [0, score],
      easing: "cubicBezier(0.000, .800, 0.485, .800)",
    })
  }

  function compareBoth(){
    const stage = getStage();
    
    _self.letters.forEach(letter => {
      letter.slide(letter.position);
    });

    shadowLetters.forEach((letter, i) => {
        letter.select();
        letter.moveTo(_self.letters[i].position);
        letter.toggleVisibility(true);
        letter.slide(stage.solution[i]);
      }
    );
  }

  function compareSolution(){
    const stage = getStage();
    
    shadowLetters.forEach(letter => {
      letter.fadeOut();
    })

    _self.letters.forEach((letter, i) => {
        letter.deselect();
        letter.slide(stage.solution[i]);
      }
    );
  }

  function compareYour(){
    const stage = getStage();

    shadowLetters.forEach(letter => {
      letter.fadeOut();
    })

    _self.letters.forEach((letter, i) => {
        letter.deselect();
        letter.slide(letter.position);
      }
    );
  }

  function getPositions(){
    return _self.letters.map(letter => letter.getOffset());
  }

  function getPositionsPct(){
    
  }


  function reposition(dx){

    const wordBBox = g.getBBox();

    const coords = _self.letters
      .map((letter, i) => {
        const rect = dom.qs(".dragarea", letter.g);
        //rect.setAttribute("fill", `hsla(${30 * i}deg, 100%, 50%, 0.3)`)
        //letter.path.style.fill = `hsla(${30 * i}deg, 100%, 50%, 1)`;
        const x = parseInt(rect.getAttribute("x"), 10);
        const w = parseInt(rect.getAttribute("width"));
        const x1 = x + letter.getOffset();
        const x2 = x1 + w;
        return [x1, x2];
      });

    const gaps = coords
      .map((coord, i) => {
        const leftGap = !i ? 0 : (coord[0] - coords[i-1][1])/2;
        const rightGap = i >= coords.length -1 ? 0 : (coords[i+1][0] - coord[1])/2;
        return [-leftGap, rightGap]
      })
      .forEach((gap, i) => {
        coords[i][0] += gap[0];
        coords[i][1] += gap[1];
        coords[i][1] -= coords[i][0]; // pure width
      });


    _self.letters.forEach((letter, i) => {
      const rect = dom.qs("rect", letter.g);
      rect.setAttribute("x", coords[i][0]-letter.getOffset())
      rect.setAttribute("width", Math.max(coords[i][1], 30));
      rect.setAttribute("y", wordBBox.y)
      rect.setAttribute("height", wordBBox.height);

      const bbox = letter.path.getBBox();
      const prevLetter =  _self.letters[i-1];
      const nextLetter =  _self.letters[i+1];
      const bboxPrev = prevLetter ? prevLetter.path.getBBox() : false;
      const bboxNext = _self.letters[i+1] ? nextLetter.path.getBBox() : false;
      const maxOffset = letter.path.getBBox().width/2;
    });

    const stage = getStage();

    const gBBox = _self.g.getBBox();
    
    const width = gBBox.width;
    const height = Math.max(...stage.lines) - Math.min(...stage.lines);

    var viewBox = {};
    viewBox.x = -window.innerWidth/20;
    viewBox.y = 0;
    viewBox.width = width+window.innerWidth/10;
    viewBox.height = height;
    _self.width = width;
    _self.height = height;

    const zoom = viewBox.width / window.innerWidth;

    dom.root.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`)

  }


  this.load = load;
  this.getPositions = getPositions;
  this.selectNext = selectNext;
  this.selectPrev = selectPrev;
  this.nudgeSelected = nudgeSelected;
  this.compare = compare;
  this.play = play;
  this.compareSolution = compareSolution;
  this.compareYour = compareYour;
  this.compareBoth = compareBoth;
  this.letters = letters;
  this.selectedIndex = false;
  this.reposition = reposition;
  this.tryAgain = tryAgain;
  this.g = g;

}
function Game(){

  document.body.addEventListener("click", function(){
    drawer.close();
    stage.letters.forEach(letter => letter.deselect())
  });

  dom.gid("tryagain").addEventListener("click", function(e){
    e.preventDefault();
    dom.gid("overlay").classList.remove("show");
    reload();
  })

  function load(){
    const index = state.get("stageIndex");
    const isDark = state.get("darkmode");
    const hasVisited = state.get("visited");
    loadStage(index);
    darkmode(isDark);
    if (!index) tutorial.play();
  }

  function loadCollection(index){
    // tbi
  }

  function loadStage(index){
    if (!stages[index]) state.set("stageIndex", 0);
    const scores = state.get("stageScore");
    stage.load(stages[index]);
    this.currentStage = stages[index];
    state.set("stageComparing", false);
    if (scores.length >= 10) return finish();
  }

  function nextStage(){
    var currentIndex = state.get("stageIndex");
    if (currentIndex >= stages.length-1)
      state.set("stageIndex", 0);
    else 
      state.set("stageIndex", currentIndex + 1);
  }

  function prevStage(){
    var currentIndex = state.get("stageIndex");
    if (currentIndex <= 0)
      state.set("stageIndex", stages.length-1);
    else 
      state.set("stageIndex", currentIndex + 1);
  }

  function reload(){
    state.resetKGData();
    load();
  }
  function setPageTitle(stageTitle){
    document.title = stageTitle ? stageTitle + " вЂ“ KernType" : "KernType";
  }

  function darkmode(bool){
    document.body.classList.toggle("inverted", !bool);
  };

  function finish(){

    dom.gid("overlay").classList.add("show");
    const scores = state.get("stageScore");
    state.set("stageScore", []);
    const finalScore = Math.ceil(scores.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10))/10)
    anime({
      targets: "#finaltotalscore",
      duration: 2000,
      round: 1,
      innerHTML: [0, finalScore],
      easing: "cubicBezier(0.000, .800, 0.485, .800)",
    });



    const text = encodeURI(`I got ${score}/100 on KernType, a letter spacing game.`);
    const url = encodeURI("https://type.method.ac");
    const intent = "https://twitter.com/intent/tweet";
    const hashtags = "KernType";

    dom.gid("twitter").setAttribute("href", `${intent}?text=${text}&url=${url}&hashtags=${hashtags}`);


  }

  this.loadStage = loadStage;
  this.load = load;
  this.nextStage = nextStage;
  this.prevStage = prevStage;
  this.reload = reload;
  this.darkmode = darkmode;
  this.loadColletion = loadCollection;
  this.finish = finish;

}

window.onresize = function() {
    document.body.height = window.innerHeight;
}

window.onresize(); // called to initially set the height.

var drawer = new Drawer(".drawer");
var game = new Game();
var stage = new Stage(".stage");
var state = new State();
var table = new Table("#tabular");
var message = new Message("#message");
var tutorial = new Tutorial();
var radio = new Radio("#radio", [
  {
    name: "Both",
    fn: stage.compareBoth,
  }, 
  {
    name: "Solution",
    fn: stage.compareSolution,
  }, 
  {
    name: "Your spacing",
    fn: stage.compareYour,
  }, 
]);

game.load();




