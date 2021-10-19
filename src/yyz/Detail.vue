<template>
  <div class="detail">
    <div class="content">
      <div class="xiangqing">
        <img class="coverImage" :src="DetailList.coverImage" alt="" />
        <div class="bg">
          <h3>{{ DetailList.name }}</h3>
          <h2>￥{{ DetailList.price }}</h2>
        </div>
      </div>

      <div class="det" v-html="DetailList.content"></div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="home-o" text="首页" @click="toMain" />
      <van-goods-action-icon icon="service-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="amounts"
        @click="toCart"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="buyHandle"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { loadProductsDetail } from "../services/productList";
import { addCartsList } from "../services/productList";
import { loadCartsList } from "../services/productList";
import { Toast } from "vant";
export default {
  data() {
    return {
      DetailList: {},
      amounts: "",
    };
  },

  async created() {
    const res1 = await loadCartsList();
    this.amounts = res1.data.reduce((pre, cur) => pre + cur.amount, 0);
    const res = await loadProductsDetail(this.$route.query.id);
    this.DetailList = res.data;
    console.log(this.DetailList);
  },
  methods: {
    async buyHandle() {
      await addCartsList(this.DetailList.id, 1, this.DetailList.price);
      const res1 = await loadCartsList();
      this.amounts = res1.data.reduce((pre, cur) => pre + cur.amount, 0);
      Toast.fail("加入购物车成功");
      // this.$router.push({
      //   name: "Cart",
      // });
    },
    //首页图标跳转主页
    toMain() {
      this.$router.push({
        name: "Shop",
      });
    },
    toCart() {
      this.$router.push({
        name: "Cart",
      });
    },
  },
};
</script>

<style>
.coverImage {
  width: 100%;
}
.bg {
  background-image: url(../img/time-bg.png);
  background-size: 150% 120%;
  background-position-x: 80%;
  height: 12vh;
  background-repeat: no-repeat;
  margin-top: -5px;
}

h3 {
  float: left;
  font-size: 16px;
  line-height: 50px;
  color: white;
}
h2 {
  float: right;
  font-size: 45px;
  line-height: 15px;
  margin-right: 15px;
  color: rgb(88, 83, 80);
}
.det p img {
  max-width: 100%;
}
</style>
