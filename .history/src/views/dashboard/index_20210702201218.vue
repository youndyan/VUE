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
  height: 500px;
  color: #ffffff;
  background-image: url('https://img0.baidu.com/it/u=2151332499,3381579319&fm=26&fmt=auto&gp=0.jpg');
  background-size: 100%;
  line-height: 500px;
  text-align: center;
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
