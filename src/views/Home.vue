<template>
  <div class="home">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :height="150"
    >
      <van-swipe-item
        ><img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/63bab54049c48fa65494c16f7e2d60e4.png?w=2452&h=920"
          alt=""
      /></van-swipe-item>
      <van-swipe-item
        ><img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/933683565f5273b4591403daab09212c.jpg?thumb=1&w=1839&h=690&f=webp&q=90"
          alt=""
        />
      </van-swipe-item>
      <van-swipe-item
        ><img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5e896d87c53a449509c14701673098bb.jpg?thumb=1&w=1839&h=690&f=webp&q=90"
          alt=""
      /></van-swipe-item>
      <van-swipe-item
        ><img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1c3e97686468231f3f78048d7f2b7fdc.jpg?thumb=1&w=1839&h=690&f=webp&q=90"
          alt=""
      /></van-swipe-item>
    </van-swipe>

    <van-grid square>
      <van-grid-item icon="photo-o" text="热点" :to="{ name: 'Hot' }" />
      <van-grid-item
        icon="photo-o"
        text="活动分类"
        :to="{ name: 'Activity' }"
      />
      <van-grid-item icon="photo-o" text="活动列表" :to="{ name: 'Listact' }" />
      <van-grid-item icon="photo-o" text="活动报名" :to="{ name: 'Logact' }" />
    </van-grid>
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="近日，市区及相关部门来咱们镇明察暗访清洁空气工作。提醒各社区像对待污染空气那样，每天有巡查、每天有记录，有情况及时上报给李明。"
    />
    <van-cell class="share" title="点击立即分享" @click="showShare = true" />
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <p>社区比赛报名信息</p>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="120"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="address" label="类别"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Home",
  data() {
    return {
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      tableData: [
        {
          date: "2021-07-15",
          name: "王一虎",
          address: "篮球",
        },
        {
          date: "2021-07-20",
          name: "王二虎",
          address: "足球",
        },
        {
          date: "2021-08-01",
          name: "王三虎",
          address: "网球",
        },
      ],
    };
  },
  methods: {
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
img {
  width: 100%;
  height: 100%;
}
p {
  text-align: center;
  font-size: 20px;
}
.share {
  text-align: right;
  background-color: #eee;
}
</style>
