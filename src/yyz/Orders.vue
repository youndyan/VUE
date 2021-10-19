<template>
  <div class="orders">
    <van-card
      :num="item.details.length"
      :price="item.price"
      :title="item.details[0].product.name"
      :thumb="item.details[0].product.coverImage"
      v-for="item in products"
      :key="item.id"
    >
      <template #tags>
        <van-tag plain type="danger">收货人：{{ item.address }}</van-tag
        ><br />
        <van-tag plain type="danger">收货地址：{{ item.receiver }}</van-tag
        ><br />
        <van-tag plain type="danger"
          >支付状态：{{ item.orderStatus ? "未提交" : "已提交" }}</van-tag
        ><br />
        <van-tag plain type="danger"
          >支付状态：{{ item.payStatus ? "已支付" : "未支付" }}</van-tag
        >
      </template>
      <template #footer>
        <van-button size="mini">提交</van-button>
        <van-button size="mini" @click="item.payStatus = 1">支付</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import { ordersListData } from "../services/productList";
export default {
  data() {
    return {
      orderList: [],
      per: 10,
      page: 1,
      products: [],
    };
  },
  async created() {
    const res = await ordersListData(this.page, this.per);
    console.log(res.data);
    this.products = res.data;
  },
  methods: {
    toOrderDetail(id) {
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

<style></style>
