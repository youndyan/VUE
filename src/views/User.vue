<template>
  <div class="user">
    <img class="avatar" :src="info.avatar | imgDal" alt="" />
    <h3>{{ info.nickName ? info.nickName : "匿名" }}</h3>
    <van-grid :gutter="30">
      <van-grid-item
        icon="balance-list-o"
        :to="{ name: 'Orders' }"
        text="订单"
      />
      <van-grid-item icon="fire-o" text="活动" />
      <van-grid-item
        icon="records"
        :to="{
          name: 'Amend',
          params: {
            nickName: info.nickName,
            avatar: info.avatar,
          },
        }"
        text="修改"
      />
      <van-grid-item icon="delete-o" @click="remove" text="退出" />
    </van-grid>
  </div>
</template>

<script>
import { infoApi } from "../services/auth";
import { removeToken } from "../utils/tools";
import { Toast } from "vant";
export default {
  data() {
    return {
      info: {},
    };
  },
  async created() {
    const res = await infoApi();
    // console.log(res);
    this.info = res.data;
  },
  methods: {
    remove() {
      removeToken();
      Toast.fail("退出成功");
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
}
</style>
