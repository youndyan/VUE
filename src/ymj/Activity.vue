<template>
  <div class="activity">
    <h1>hahaha</h1>
  </div>
</template>

<script>
import { activity } from "../services/auth";

export default {
  data() {
    return {
      products: "",
    };
  },
  async created() {
    const res = await activity();
    log(res);
  },
};
</script>

<style></style>
