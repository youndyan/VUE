<template>
  <div class="mine">
    <div class="content">
      <div class="user">
        <img class="avatar" :src="info.avatar | imgDal" :alt="info.nickName" />
        <p>昵称 : {{ info.nickName ? info.nickName : "匿名" }}</p>
      </div>
      <div class="three">
        <van-grid :column-num="3">
          <van-grid-item
            v-for="value in 1"
            :key="value.id"
            icon="shop-collect-o"
            @click="toOrders"
            text="我的订单"
          />
          <van-grid-item
            v-for="value in 1"
            :key="value.id"
            icon="logistics"
            text="待收货"
          />
          <van-grid-item
            v-for="value in 1"
            :key="value.id"
            icon="phone-o"
            text="退换修"
          />
        </van-grid>
      </div>
      <ul class="static">
        <li><img src="../assets/mine.png" alt="" /></li>
      </ul>
    </div>

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
import { infoApi } from "../services/auth";
import { loadCartsList } from "../services/productList";

export default {
  data() {
    return {
      amounts: "",
      info: {},
    };
  },

  async created() {
    const res = await infoApi();
    // console.log(res);
    this.info = res.data;
    const res1 = await loadCartsList();
    this.amounts = res1.data.reduce((pre, cur) => pre + cur.amount, 0);
  },
  methods: {
    toOrders() {
      this.$router.push({
        name: "Orders",
      });
    },
  },
};
</script>

<style scoped>
.mine {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
}
.user {
  width: 100%;
  height: 10rem;
  background: url(http://m.mi.com/static/img/bg.63c8e19851.png) center 0 #f37d0f;
  background-size: auto 100%;
  display: flex;
}
.user img {
  width: 35vw;
  height: 35vw;
  margin: 20px 0 20px 20px;
  border-radius: 50%;
}
.user p {
  margin-top: 55px;
  margin-left: 25px;
  font-size: 24px;
  color: white;
}
.order {
  width: 100%;
  height: 42px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-style: normal;
  font-size: 1rem;
}

.three {
  width: 100%;
  height: 90px;
  background: #f5f5f5;
  padding-bottom: 0.5rem;
  border-top: 1px solid f5f5f5;
}
.static {
  width: 100%;
  height: 385px;
  background: darkkhaki;
}
</style>
