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
import { reactive } from "vue";
import qs from "qs";
import { useRouter } from 'vue-router';
export default {
  // name: "Jielong",
  // components: {},
  setup() {
    const Form = reactive({
      username: "admin",
      password: "123456",
    });
    const router = useRouter();
    function goto(){
      router.push("/jie");
    }
 
    const login = () => {
      //表单提交
      axios.post("/session/token.php", qs.stringify(Form)).then((res) => {
        const data = res.data;
        if(data.code === '200'){
            localStorage.token = data.token;
            goto();


          
        }else{
            alert('错误');
        }
      });


    
 
    };

    return {
      login,
      Form,
      goto
    };
  },
};
</script>