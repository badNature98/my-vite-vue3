import{bp as r,by as e,bz as s,bo as a}from"./app-0eb71c43.js";import{V as i}from"./runtime-core.esm-bundler-0bec55ea.js";const{user:o}=r(),t=async function(r,e){await o.login({username:r.username,password:r.password||"null",grant_type:r.loginType,code:"string",uuid:"string"}),a.push({path:e.query.redirect||"/",query:{...e.query,redirect:void 0}}),console.log("跳转")},u=i({username:[{required:!0,message:"请输入账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:5,max:30,message:"密码长度必须是5~30位",trigger:"blur"}],email:[{validator:(r,s,a)=>{if(e(s))return a();a(new Error("请输入正确邮箱"))},trigger:"blur"}],phone:[{validator:(r,e,a)=>{if(s(e))return a();a(new Error("请输入正确号码"))},trigger:"blur"}]});export{t as l,u as r};
