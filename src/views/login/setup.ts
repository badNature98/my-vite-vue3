
import './style.scss'
import router from '@/router';
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { isEmail ,isPhone } from '@/utils/validate'
import useStore from "@/store";
const { user } = useStore();
import { useRoute } from 'vue-router';

export const login = async function(parm:{
  loginType:string;
  username:string;
  password:string;
},route:any){
  const res = await user.login({
    username: parm.username,
    password: parm.password || 'null',
    grant_type: parm.loginType,
    code: "string",
    uuid: "string",
  })
  router.push({path:route.query.redirect || '/' , query:{...route.query,redirect:undefined}})
  console.log('跳转')
}      
export const rules = reactive<FormRules>({
  username:[
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password:[
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 30, message: '密码长度必须是5~30位', trigger: 'blur' }
  ],
  email:[
    { validator: (rule:any, value:string, callback:Function) => {
      if (isEmail(value)) {
        return callback();
      } else {
        callback(new Error("请输入正确邮箱"));
      }
    }, trigger: "blur" },
  ],
  phone:[
    { validator: (rule:any, value:string, callback:Function) => {
      if (isPhone(value)) {
        return callback();
      } else {
        callback(new Error("请输入正确号码"));
      }
    }, trigger: "blur" },
  ],
  
})
