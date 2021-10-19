<template>
  <div class="mq">
    <div class="content"><h1>米圈</h1></div>

    <van-tabbar route :fixed="false" v-show="true">
      <van-tabbar-item icon="home-o" :to="{ name: 'Shop' }"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="bars" :to="{ name: 'List' }">分类</van-tabbar-item>
      <van-tabbar-item icon="audio" :to="{ name: 'Mq' }">米圈</van-tabbar-item>
      <van-tabbar-item
        icon="shopping-cart"
        :badge="amounts"
        :to="{ name: 'Cart' }"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="manager" :to="{ name: 'Mine' }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { loadCartsList } from "../services/productList";
export default {
  data() {
    return {
      amounts: "",
    };
  },
  async created() {
    const res1 = await loadCartsList();
    this.amounts = res1.data.reduce((pre, cur) => pre + cur.amount, 0);
  },
};
</script>

<style scoped>
html,
body,
.mq {
  width: 100vw;
  height: 100vh;
}
.mq {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
}
</style>
