<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <img
      src="//bpic.588ku.com/back_list_pic/21/05/26/423f33c524285c7a61316b5401dc055f.jpg!/fw/720/quality/90/unsharp/true/compress/true"
      alt=""
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
