<template>
  <div class="shop">
    <!-- 主内容部分 -->
    <div class="content">
      <div class="top">
        <van-tabs class="t-nav">
          <van-tab title="推荐">内容 1</van-tab>
          <van-tab title="手机">内容 2</van-tab>
          <van-tab title="智能">内容 3</van-tab>
          <van-tab title="电视">内容 4</van-tab>
          <van-tab title="家电">内容 2</van-tab>
        </van-tabs>
      </div>
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
        <van-swipe-item
          ><img
            src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c630d092e6c6591a4e6fb35d76b9c1f3.jpg?thumb=1&w=720&h=360"
            alt=""
        /></van-swipe-item>
        <van-swipe-item
          ><img
            src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4d4b647a13a94fe28d28eff375d64050.jpg?thumb=1&w=720&h=360"
            alt=""
        /></van-swipe-item>
      </van-swipe>
      <!-- 分类 -->
      <!-- <ul class="cateory">
        <li v-for="item in pcategories" :key="item.id" @click="toList(item.id)">
          <img :src="item.coverImage" alt="" />
        </li>
      </ul> -->
      <!-- 两栏图片布局 -->
      <div class="include">
        <div class="left">
          <img
            src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/29b39579739d82269d18f0e7c8f6c9da.jpg?f=webp&w=537&h=762&bg=57524C"
            alt=""
          />
        </div>
        <ul class="right">
          <li>
            <img
              src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5b9af94e5c05bb2b4849cbb113eddb9d.jpg?f=webp&w=537&h=378&bg=EBF8FF"
              alt=""
            />
          </li>
          <li>
            <img
              src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a12873ff30a6da401d74728878625c37.jpg?f=webp&w=537&h=378&bg=D2EDFF"
              alt=""
            />
          </li>
        </ul>
      </div>
      <!-- 一张图 -->
      <div class="one">
        <img
          src="http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5b2fff7f7b8de6d371601caf3a827eed.jpg?f=webp&w=1080&h=660&bg=F5F5F5"
          alt=""
        />
      </div>
      <!-- 商品列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="pList">
          <li v-for="(item, index) in products" :key="index">
            <img :src="item.coverImage" alt="" />
            <div class="p">
              <span>{{ item.name }}</span
              ><br />
              <i>￥{{ item.price }}</i
              ><br />
              <van-button
                class="button"
                type="danger"
                @click="buyHandle(item.id)"
                >立即购买</van-button
              >
            </div>
          </li>
        </ul>
      </van-list>
    </div>

    <!-- 底部导航 -->
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
import {
  loadCartsList,
  loadProductsList,
  productsCategories,
} from "../services/productList";
export default {
  data() {
    return {
      products: [],
      page: 1,
      pages: 1,
      loading: true,
      finished: false,
      amounts: "",
    };
  },
  async created() {
    const res1 = await loadCartsList();
    this.amounts = res1.data.reduce((pre, cur) => pre + cur.amount, 0);
    this.loadData();
  },
  methods: {
    async loadData() {
      const res = await loadProductsList(this.page, this.$route.query.cid);
      // this.products = res.data;
      this.pages = res.pages;
      if (this.page > this.pages) {
        this.finished = true;
      }
      this.page++;
      this.loading = false;
      this.products = [...this.products, ...res.data];
    },
    onLoad() {
      this.loadData();
    },
    buyHandle(id) {
      this.$router.push({
        name: "Detail",
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style scoped>
html,
body,
.shop {
  width: 100vw;
  height: 100vh;
}
.shop {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
}
.nav {
  width: 100%;
  height: 3.2rem;
  background: skyblue;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;
}
.t-nav {
  width: 100%;
  height: 27px;
}

.top {
  width: 100%;
  height: 44px;
  background: #f2f2f2;
}
.my-swipe {
  width: 100%;
  min-height: 50px;
  /* background: chocolate; */
}
.my-swipe img {
  max-width: 100%;
  /* height: 187px; */
}
.cateory {
  width: 100%;
  min-height: 5rem;
  background: #f5f5f5;
  display: flex;
  flex-flow: wrap;
  padding-bottom: 0.5rem;
}
.cateory img {
  width: 100%;
  height: 100%;
}
.cateory li {
  width: 25%;
  height: 100%;
}
.include {
  width: 100%;
  height: 265px;
  display: flex;
  padding-bottom: 0.5rem;
  background: #f5f5f5;
}
.include .left img {
  width: 100%;
  height: 100%;
}
.include .right img {
  width: 100%;
  height: 100%;
}
.include .left {
  width: 50%;
  height: 100%;
}
.include .right {
  width: 50%;
  height: 100%;
}
.include .right li {
  width: 100%;
  height: 50%;
}
.one {
  width: 100%;
  height: 230px;
}
.one img {
  width: 100%;
  height: 100%;
}
.pList {
  width: 100%;
  min-height: 20rem;
  background: cornflowerblue;
  display: flex;
  flex-flow: wrap;
  background: #ffffff;
  justify-content: space-around;
  font-size: 0.8rem;
}
.pList .button {
  width: 100px;
  height: 30px;
}
.pList li {
  width: 48%;
  height: 250px;
  background: #f2f2f2;
}
.pList li img {
  width: 100%;
  height: 67%;
}
.pList li .p {
  width: 100%;
  height: 33%;
  text-align: center;
}

.pList li .p span {
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}
.pList li .p i {
  color: red;
}
</style>
