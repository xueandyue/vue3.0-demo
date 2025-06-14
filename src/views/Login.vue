<template>
<form>
  <div>
    <input type="text" name="username" id="username" v-model="Form.username" />
    <input
      type="password"
      name="password"
      id="password"
      v-model="Form.password"
    />
    <div id="go" @click="login">点击登录</div>
  </div>
  </form>
</template>
<script>
// @ is an alias to /src

import axios from "axios";
import { reactive, onMounted } from "vue";
import qs from "qs";
import { useRouter } from 'vue-router';
import { setToken, isAuthenticated } from '@/utils/auth';

export default {
  // name: "Jielong",
  // components: {},
  setup() {
    const Form = reactive({
      username: "admin",
      password: "123456",
    });
    const router = useRouter();

    // 检查是否已登录
    onMounted(async () => {
      if (await isAuthenticated()) {
        goto();
      }
    });

    function goto(){
      router.push("/jie");
    }
 
    const login = async () => {
      try {
        //表单提交
        const res = await axios.post("/login.php", qs.stringify(Form));
        const data = res.data;
        if(data.code === '200'){
            setToken(data.token);  // 使用工具函数设置 token
            goto();
        }else{
            alert('登录失败：' + (data.message || '未知错误'));
        }
      } catch (error) {
        alert('登录失败：' + (error.message || '网络错误'));
      }
    };

    return {
      login,
      Form,
      goto
    };
  },
};
</script>