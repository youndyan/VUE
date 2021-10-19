<template>
  <div class="list">
    <div class="content">
      <van-search
        shape="round"
        background="#FFFFFF"
        placeholder="搜索商品名称"
      />
      <!-- 商品分类 -->
      <van-tabs v-model="active" sticky animated>
        <van-tab title="塑料手办" @click="loadData(item.id, item.id)">
          <van-list
            v-model="loading"
            :finished="true"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 商品列表 -->
            <van-card
              v-for="items in productsList"
              :key="items.id"
              :num="items.amount"
              :price="items.price.toFixed(2)"
              :title="items.name"
              :thumb="items.coverImage"
              @click="toDetail(items.id)"
            />
          </van-list>
        </van-tab>
        <van-tab title="毛绒玩偶" @click="loadData(2)">
          <van-list
            v-model="loading"
            :finished="true"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 商品列表 -->
            <van-card
              v-for="items in productsList2"
              :key="items.id"
              :num="items.amount"
              :price="items.price.toFixed(2)"
              :title="items.name"
              :thumb="items.coverImage"
              @click="toDetail(items.id)"
            /> </van-list
        ></van-tab>
        <van-tab title="男女服饰" @click="loadData(3)"
          ><van-list
            v-model="loading"
            :finished="true"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 商品列表 -->
            <van-card
              v-for="items in productsList3"
              :key="items.id"
              :num="items.amount"
              :price="items.price.toFixed(2)"
              :title="items.name"
              :thumb="items.coverImage"
              @click="toDetail(items.id)"
            /> </van-list
        ></van-tab>
        <van-tab title="生活周边" @click="loadData(4)">
          <van-list
            v-model="loading"
            :finished="true"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 商品列表 -->
            <van-card
              v-for="items in productsList4"
              :key="items.id"
              :num="items.amount"
              :price="items.price.toFixed(2)"
              :title="items.name"
              :thumb="items.coverImage"
              @click="toDetail(items.id)"
            /> </van-list
        ></van-tab>
      </van-tabs>
      <!-- 加载更多 -->
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
import { loadProductsList, productsCategories } from "../services/productList";
import { loadCartsList } from "../services/productList";

export default {
  data() {
    return {
      productsList: [],
      productsList2: [],
      productsList3: [],
      productsList4: [],
      pcategories: [],
      loading: true,
      finished: false,
      page: 1,
      pages: 1,
      amounts: "",
      active: 0,
    };
  },
  // 商品分类
  async created() {
    const res = await productsCategories();
    this.pcategories = res.data;
    const res1 = await loadCartsList();
    this.amounts = res1.data.reduce((pre, cur) => pre + cur.amount, 0);
    const ress = await loadProductsList(1, 30, 1);
    this.productsList = ress.data;
    const ress1 = await loadProductsList(1, 30, 2);
    this.productsList2 = ress1.data;
    const ress2 = await loadProductsList(1, 30, 3);
    this.productsList3 = ress2.data;
    const ress3 = await loadProductsList(1, 30, 4);
    this.productsList4 = ress3.data;
  },
  // 商品列表加载以后加载更多
  methods: {
    async loadData(per, category) {
      const res = await loadProductsList(1, per, category);
      this.productsList = res.data; //[...this.productsList, ...res.data];
    },
    onLoad() {
      this.loadData();
    },

    // 跳到详情页面
    async toDetail(id) {
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
.category {
  width: 100%;
  min-height: 5rem;
  background: #f5f5f5;
  display: flex;
  flex-flow: wrap;
  padding-bottom: 0.5rem;
}
.category img {
  width: 100%;
  height: 100%;
}
.category li {
  width: 25%;
  height: 100%;
}
html,
body,
.list {
  width: 100vw;
  height: 100vh;
}
.list {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
}
</style>
