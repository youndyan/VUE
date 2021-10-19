<template>
  <div class="login">
    <img class="logo" src="../assets/hua.png.webp" alt="" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repassword"
        type="password"
        name="repassword"
        label="确认密码"
        placeholder="再一次输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <router-link class="reg-link" :to="{ name: 'Login' }"
      >已有账号，我要登录</router-link
    >
  </div>
</template>

<script>
import { regApi } from "../services/auth";
import { setToken } from "../utils/tools";
export default {
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    async onSubmit(values) {
      // console.log("submit", values);
      const res = await regApi(values);
      console.log(res);
      if (res.code === 1) {
        setToken(res.data);
        //加载vuex中的购物车数据
        this.$store.dispatch("loadCart");
        this.$router.push({
          name: "User",
        });
      }
    },
  },
};
</script>

<style scoped>
.logo {
  display: block;
  margin: 2rem auto;
  border-radius: 20px;
  width: 150px;
}
.reg-link {
  color: skyblue;
  font-size: 0.8rem;
  display: block;
  float: right;
  margin-right: 3rem;
}
</style>
