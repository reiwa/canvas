!function(t){function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var n={};r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},r.p="/code/",r(r.s=25)}({25:function(t,r){var n=function(t){return u(100,function(){var t=100+200*Math.random(),r=2*Math.PI*Math.random();return{color:"#0091EA",size:2+4*Math.random(),vel:new Int16Array([(1+1*Math.random())*(Math.random()<.5?1:-1),(1+1*Math.random())*(Math.random()<.5?1:-1)]),pos:new Float32Array([t*Math.sin(r),t*Math.cos(r)])}})},e=function(t,r){return r.map(function(t){var r=c(t.pos);return(r<-400+t.size||r>400-t.size)&&(t.vel[0]=-1*t.vel[0]),t.pos[0]=t.pos[0]+1*t.vel[0],(r<-400+t.size||r>400-t.size)&&(t.vel[1]=-1*t.vel[1]),t.pos[1]=t.pos[1]+1*t.vel[1],t})},o=function(t,r){var n=t.canvas,e=n.width,o=n.height;t.save(),t.translate(e/2,o/2),r.forEach(function(r){t.strokeStyle=r.color,t.fillStyle=r.color,t.beginPath(),t.arc(r.pos[0],r.pos[1],r.size,0,2*Math.PI),t.fill()}),t.beginPath(),t.arc(0,0,400,0,2*Math.PI),t.stroke(),t.restore()},a=function t(r,n,e){var a=r.canvas,i=a.width,u=a.height;r.clearRect(0,0,i,u);var c=e(r,n);o(r,c),requestAnimationFrame(t.bind(null,r,c,e))},i=function(){var t=document.querySelector(".canvas"),r=t.getContext("2d"),o=n();a(r,o,e)};window.addEventListener("load",i);var u=function(t,r){var n=[];if(r)for(var e=0;e<t;++e)n.push(r(e));else for(var o=0;o<t;++o)n.push(null);return n},c=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2))}}});