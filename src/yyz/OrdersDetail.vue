<template>
  <div>
    <van-card
      v-for="item in orderD"
      :key="item.id"
      :num="item.amount"
      :price="item.price"
      :title="item.name"
      :thumb="item.coverImage"
    />
  </div>
</template>

<script>
import { ordersListDetail } from "../services/productList";
export default {
  data() {
    return {
      ordersDetail: [],
      orderD: [],
    };
  },
  async created() {
    const res = await ordersListDetail(this.$route.query.id);
    console.log(res.data.details);
    this.ordersDetail = res.data.details;
    this.ordersDetail.forEach((item) => {
      console.log(item.product.name);
      const obj = {};
      obj.name = item.product.name;
      obj.id = item.product.id;
      obj.price = item.product.price;
      obj.amount = item.amount;
      obj.coverImage = item.product.coverImage;
      this.orderD.push(obj);
    });
  },
};
</script>

<style></style>
