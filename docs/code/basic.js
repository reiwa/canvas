!function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var e={};t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="/code/",t(t.s=3)}({3:function(n,t){var e=function(n){var t=n.canvas,e=t.width,r=t.height;return{color:"#0091EA",size:20,pos:new Int16Array([e/2,r/2])}},r=function(n,t){return t},o=function(n,t){n.fillStyle=t.color,n.beginPath(),n.arc(t.pos[0],t.pos[1],t.size,0,2*Math.PI),n.fill()},i=function n(t,e,r){var i=t.canvas,a=i.width,c=i.height;t.clearRect(0,0,a,c);var u=r(t,e);o(t,u),requestAnimationFrame(n.bind(null,t,u,r))},a=function(){var n=document.querySelector(".canvas"),t=n.getContext("2d"),o=e(t);i(t,o,r)};window.addEventListener("load",a)}});