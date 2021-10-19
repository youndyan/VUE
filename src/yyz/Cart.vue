<template>
  <div class="cart">
    <div class="content">
      <van-swipe-cell v-for="item in cartsList" :key="item.id">
        <van-card
          route
          :fixed="false"
          :num="item.amount"
          :price="item.price.toFixed(2)"
          desc="描述信息"
          :title="item.product.name"
          :thumb="item.product.coverImage"
        >
          <template #tag>
            <van-checkbox v-model="item.checked"></van-checkbox>
          </template>
          <template #footer>
            <van-stepper
              v-model="item.amount"
              @plus="plusHandle(item.product.id, item.product.price)"
              @minus="minusHandle(item.product.id, item.product.price)"
            />
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            @click="delCarts(item.id)"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>

      <van-submit-bar
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import {
  loadCartsList,
  delCartsList,
  submitOrder,
  addCartsList,
} from "../services/productList";
import { Toast } from "vant";

export default {
  data() {
    return {
      cartsList: [],
      // checked: false,
    };
  },
  async created() {
    this.loadCartsData();
  },
  methods: {
    async loadCartsData() {
      //加载vuex中的购物车数据
      this.$store.dispatch("loadCarts");
      const res = await loadCartsList();

      this.cartsList = res.data.map((item) => {
        return {
          ...item,
          checked: false,
        };
      });
    },
    // 订单提交
    async onSubmit() {
      const products = [];
      this.cartsList.forEach((item) => {
        if (item.checked) {
          const obj = {};
          obj.product = item.product.id;
          obj.amount = item.amount;
          products.push(obj);
        }
      });
      await submitOrder(products, "7单元502", "yyz");
      Toast.success("提交订单成功");
      this.loadCartsData();
    },
    async delCarts(id) {
      const res = await delCartsList(id);
      console.log(res);
      this.loadCartsData();
    },
    //步进器调用接口，
    plusHandle(id, price) {
      addCartsList(id, 1, price);
    },
    minusHandle(id, price) {
      addCartsList(id, -1, price);
    },
  },
  computed: {
    checked: {
      set(v) {
        this.cartsList.forEach((item) => (item.checked = v));
      },
      get() {
        return this.cartsList.every((item) => item.checked);
      },
    },
    totalPrice() {
      return (
        this.cartsList
          .filter((item) => item.checked)
          .reduce((pre, cur) => pre + cur.price * cur.amount, 0) * 100
      );
    },
  },
};
</script>

<style>
.goods-card {
  margin: 0;
  /* background-color: red; */
}

.delete-button {
  height: 100%;
}
</style>
