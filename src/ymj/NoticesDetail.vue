<template>
  <div class="detail">
    <h1>{{ product.name }}</h1>
    <img :src="product.coverImage | imgDal" alt="" />
    <div v-html="content"></div>
  </div>
</template>

<script>
import { loadNotices } from "../services/auth";
export default {
  data() {
    return {
      product: "",
      content: "",
    };
  },
  async created() {
    const res = await loadNotices(this.$route.query.id);
    this.product = res.data;
    this.content = this.product.content;
  },
};
</script>

<style>
.detail img {
  width: 100%;
}
</style>
