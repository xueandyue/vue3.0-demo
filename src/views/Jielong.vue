<template>
  <div id="main" style="text-align: left">
    <h2>查找未打卡接龙的人</h2>
    <p>请将软件开发部微信群的打卡接龙复制粘贴到下面的输入框</p>
    <form id="form1">
      <textarea
        name="comment"
        id="comment"
        style="width: 100%; height: 300px; overflow: scroll"
        v-model="Form.comment"
      ></textarea>

      <button
        id="six"
        type="button"
        style="margin-left: 40%; margin-top: 20px"
        @click="send"
      >
        提交
      </button>
    </form>
  </div>
  <div id="main2" style="text-align: left;" v-show="Mingdan.showRentPrise">
    <h2>未打卡接龙的人员名单</h2>
    <form>
      <textarea
        name="mingdan" v-model="Mingdan.mingdan"
        id="mingdan"
        style="width: 100%; height: 300px; overflow: scroll"
      ></textarea>

      <button
        id="fanhui"
        type="button"
        style="margin-left: 40%; margin-top: 20px"
      >
        返回
      </button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import { reactive } from "vue";

export default {
  // name: "Jielong",
  // components: {},
  setup() {
    const Form = reactive({
      comment: "",
    });

    const Mingdan = reactive({
      showRentPrise: false,
      mingdan: ""
    });

    const send = () => {
    var comment=Form.comment.trim();
            if(comment=="")
            {
                alert("输入不能为空");
                return false;
            }
    const url="/jielong?comment="+Form.comment;
      
      axios.get(url).then(res => {
        if(res.status==200)
        {
          Mingdan.mingdan=res.data;
          Mingdan.showRentPrise=true;
          

        }else{
          alert('服务器错误');

        }
      });
    }
    return {
      send,
      Form,
      Mingdan
    };
  },
};
</script>
<style lang="scss">
</style>
 <style>
body {
  font-size: 14px;
}
#six {
  cursor: pointer;
  width: 104px;
  height: 40px;
  line-height: 38px;
  padding: 0;
  background: 0 0;
  background-color: #38f;
  font-size: 16px;
  color: #fff;
  box-shadow: none;
  font-weight: 400;
  border: 1px solid #38f;
  border-bottom: 1px solid #2e7ae5;
}
#fanhui {
  cursor: pointer;
  width: 104px;
  height: 40px;
  line-height: 38px;
  padding: 0;
  background: 0 0;
  background-color: #38f;
  font-size: 16px;
  color: #fff;
  box-shadow: none;
  font-weight: 400;
  border: 1px solid #38f;
  border-bottom: 1px solid #2e7ae5;
}
</style>