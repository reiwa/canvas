!function(r){function t(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return r[e].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=r,t.c=n,t.d=function(r,n,e){t.o(r,n)||Object.defineProperty(r,n,{configurable:!1,enumerable:!0,get:e})},t.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(n,"a",n),n},t.o=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},t.p="/code/",t(t.s=21)}({21:function(r,t){var n=function(r){return{color:"#0091EA",size:.5,yOff:Math.random(10)}},e=function(r,t){return t.yOff+=.005,t},o=function(r,t){var n=r.canvas,e=n.width,o=n.height;r.strokeStyle=t.color;var a=1;r.save(),r.translate(e/2,o/2);for(var i=e/-2;i<=e/2;i+=1){var u=c(a,t.yOff);r.beginPath(),r.arc(i,100*u,t.size,0,2*Math.PI),r.stroke(),a+=.01}r.restore()},a=function r(t,n,e){var a=t.canvas,i=a.width,c=a.height;t.clearRect(0,0,i,c);var u=e(t,n);o(t,u),requestAnimationFrame(r.bind(null,t,u,e))},i=function(){var r=document.querySelector(".canvas"),t=r.getContext("2d"),o=n();a(t,o,e)};window.addEventListener("load",i);for(var c=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;r<0&&(r=-r),t<0&&(t=-t),n<0&&(n=-n);for(var e=parseInt(r),o=parseInt(t),a=parseInt(n),i=r-e,c=t-o,f=n-a,l=0,s=0,d=0,h=.5,p=void 0,g=void 0,y=void 0,m=u.length-1,b=0;b<4;++b){var w=e+(o<<4)+(a<<8);l=v(i),s=v(c),p=u[w&m],p+=l*(u[w+1&m]-p),g=u[w+16&m],g+=l*(u[w+16+1&m]-g),p+=s*(g-p),w+=256,g=u[w&m],g+=l*(u[w+1&m]-g),y=u[w+16&m],y+=l*(u[w+16+1&m]-y),g+=s*(y-g),p+=v(f)*(g-p),d+=p*h,h*=.5,e<<=1,i*=2,o<<=1,c*=2,a<<=1,f*=2,i>=1&&(e+=1,i-=1),c>=1&&(o+=1,c-=1),f>=1&&(a+=1,f-=1)}return d},u=new Float32Array(4096),f=0;f<u.length;f++)u[f]=Math.random();var v=function(r){return.5*(1-Math.cos(r*Math.PI))}}});