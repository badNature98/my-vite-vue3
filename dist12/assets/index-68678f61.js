import{l as e,r as l}from"./setup-459032a1.js";import{u as a}from"./vue-router-96d163cf.js";import{x as u,r as o,a7 as s,y as r,z as n,P as d,I as t,F as m,a0 as p,M as i,H as v,L as c,A as f,u as b}from"./runtime-core.esm-bundler-0bec55ea.js";import"./app-0eb71c43.js";import"./preload-helper-706a0e5c.js";const y={class:"login-page"},V={class:"checkeds"},g=u({__name:"index",setup(u){const g=a(),_=o([{value:"visitor",label:"游客",description:"游客身份访问有限制。"},{value:"login",label:"用户",description:"登录已经注册的账号进行访问。"}]),w=o({loginType:"visitor",remember:!1,username:"",password:""}),k=o();return(a,u)=>{const o=s("el-option"),h=s("el-select"),j=s("el-form-item"),U=s("Icon"),x=s("el-input"),T=s("el-button"),I=s("el-checkbox"),z=s("el-link"),A=s("el-form");return r(),n("div",y,[d(A,{model:w.value,rules:b(l),ref_key:"loginView",ref:k},{default:t((()=>[d(j,{label:"登录方式"},{default:t((()=>[d(h,{modelValue:w.value.loginType,"onUpdate:modelValue":u[0]||(u[0]=e=>w.value.loginType=e),placeholder:"选择登录方式"},{default:t((()=>[(r(!0),n(m,null,p(_.value,(e=>(r(),v(o,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),d(j,{prop:"username"},{label:t((()=>[i("账号"),d(U,{name:"def-User"})])),default:t((()=>[d(x,{modelValue:w.value.username,"onUpdate:modelValue":u[1]||(u[1]=e=>w.value.username=e)},null,8,["modelValue"])])),_:1}),["login"].includes(w.value.loginType)?(r(),v(j,{key:0,prop:"password"},{label:t((()=>[i("密码"),d(U,{name:"def-Key"})])),default:t((()=>[d(x,{type:"password",modelValue:w.value.password,"onUpdate:modelValue":u[2]||(u[2]=e=>w.value.password=e)},null,8,["modelValue"])])),_:1})):c("",!0),d(j,null,{default:t((()=>[d(T,{onClick:u[3]||(u[3]=l=>(async l=>{l&&await l.validate((async(l,a)=>{l?e(w.value,g):console.log("error submit!",a)}))})(k.value)),type:"primary"},{default:t((()=>[i("登录")])),_:1}),f("div",V,[d(I,{modelValue:w.value.remember,"onUpdate:modelValue":u[4]||(u[4]=e=>w.value.remember=e),label:"记住密码"},null,8,["modelValue"]),d(z,{href:"/#/signup",type:"primary"},{default:t((()=>[i("注册账号")])),_:1})])])),_:1})])),_:1},8,["model","rules"])])}}});export{g as default};