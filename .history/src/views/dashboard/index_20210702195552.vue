<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎来到 {{ name }}</div>
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
.dashboard-text {
  color: #ffffff;
  background-image: url('//bpic.588ku.com/video_listen/588ku_pic/21/05/06/bff7c95bb78cd0e4562127e1c28f8bcc.jpg!/both/342x192/force/true');
  background-size: 300px;
}
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
