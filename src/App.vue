<template>
  <div id="app">
    <van-nav-bar
      title="综合"
      left-text="返回"
      right-text="首页"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <router-view class="container"></router-view>
    <van-tabbar route :fixed="false" v-show="showNav">
      <van-tabbar-item icon="home-o" :to="{ name: 'Home' }"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" :to="{ name: 'Shop' }"
        >商城</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" :to="{ name: 'Bbs' }"
        >论坛</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" :to="{ name: 'User' }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNav: true,
    };
  },
  watch: {
    // 使用watch监听路由的变化
    $route() {
      if (
        this.$route.name === "Home" ||
        this.$route.name === "User" ||
        this.$route.name === "Bbs"
      ) {
        this.showNav = true;
      } else {
        this.showNav = false;
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
<style>
html,
body,
#app {
  width: 100vw;
  height: 100vh;
}
#app {
  display: flex;
  flex-direction: column;
}
.container {
  flex: 1;
  overflow: auto;
}
</style>
