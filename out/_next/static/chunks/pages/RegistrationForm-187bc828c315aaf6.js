(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[286],{3716:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/RegistrationForm",function(){return n(6349)}])},6349:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var o=n(5893),r=n(7294);function s(){let[e,t]=(0,r.useState)(""),[n,s]=(0,r.useState)(""),a=async t=>{let o;t.preventDefault(),console.log("Email:",e),console.log("Password:",n);let r=await fetch("/api/auth/register",{method:"POST",body:JSON.stringify({email:e,password:n}),headers:{"Content-Type":"application/json"}}),s=await r.text();console.log("Response Text:",s);try{o=JSON.parse(s)}catch(e){console.error("Failed to parse JSON:",e);return}console.log(o)};return(0,o.jsxs)("form",{onSubmit:a,children:[(0,o.jsxs)("label",{children:["Email",(0,o.jsx)("input",{type:"email",value:e,onChange:e=>t(e.target.value),required:!0})]}),(0,o.jsxs)("label",{children:["Password",(0,o.jsx)("input",{type:"password",value:n,onChange:e=>s(e.target.value),required:!0})]}),(0,o.jsx)("button",{type:"submit",children:"Register"})]})}}},function(e){e.O(0,[888,774,179],function(){return e(e.s=3716)}),_N_E=e.O()}]);