!function(n){function r(t){if(e[t])return e[t].exports;var o=e[t]={i:t,l:!1,exports:{}};return n[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var e={};r.m=n,r.c=e,r.d=function(n,e,t){r.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:t})},r.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},r.p="/code/",r(r.s=18)}({18:function(n,r){var e=function(n){var r=n.canvas,e=r.width,t=r.height;return s(100,function(){return{color:"#0091EA",size:2+4*Math.random(),vel:new Int16Array([2+2*Math.random(),2+2*Math.random()]),pos:new Int16Array([Math.random()*e,Math.random()*t])}})},t=function(n,r){var e=n.canvas,t=e.width,o=e.height;return r.map(function(n){return n.pos[0]<0-n.size||n.pos[0]>t+n.size?n.pos[0]=0-n.size:n.pos[0]=n.pos[0]+1*n.vel[0],n.pos[0]=n.pos[0]+1*n.vel[0],n.pos[1]>o+n.size?n.pos[1]=0-n.size:n.pos[1]=n.pos[1]+1*n.vel[1],n.pos[1]=n.pos[1]+1*n.vel[1],n})},o=function(n,r){r.forEach(function(r){n.fillStyle=r.color,n.beginPath(),n.arc(r.pos[0],r.pos[1],r.size,0,2*Math.PI),n.fill()})},a=function n(r,e,t){var a=r.canvas,i=a.width,s=a.height;r.clearRect(0,0,i,s);var u=t(r,e);o(r,u),requestAnimationFrame(n.bind(null,r,u,t))},i=function(){var n=document.querySelector(".canvas"),r=n.getContext("2d"),o=e(r);a(r,o,t)};window.addEventListener("load",i);var s=function(n,r){var e=[];if(r)for(var t=0;t<n;++t)e.push(r(t));else for(var o=0;o<n;++o)e.push(null);return e}}});