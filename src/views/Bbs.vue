<template>
  <div class="about">
    <button class="fabu" @click="fabu()"><van-icon name="plus" /></button>

    <div
      class="tz"
      v-for="item in list"
      :key="item.id"
      @click="toBbsdet(item.id)"
    >
      <div class="fjr">
        发帖人： 【{{ item.user.userName }}】
        {{ time | formatDate }}
      </div>
      <div class="bt">
        <img :src="item.coverImage | imgDal" alt="" />
        <h3>{{ item.name }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { infoApi, checkInApi } from "../services/auth";
export default {
  name: "BbS",
  data() {
    return {
      list: [],
      page: 1,
      info: {},
      time: Date.now(),
      pl: [],
      isshow: false,
      show: false,
      active: 2,
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
  },
  async created() {
    //获取数据
    axios
      .get("http://192.168.14.83:1337/api/v1/posts", {
        parmas: {
          forum: this.$route.query.fid,
        },
      })
      .then((res) => {
        this.list = res.data.data;
      });
    const res = await infoApi();
    this.info = res.data;
    console.log(this.list);
  },
  methods: {
    async check() {
      await checkInApi();
      this.loadUser();
    },
    async loadUser() {
      const res = await infoApi();
      // console.log(res);
      this.info = res.data;
      console.log(this.info);
    },
    //跳转帖子详情

    toBbsdet(id) {
      axios.get("http://192.168.14.83:1337/api/v1/posts/" + id).then((res) => {
        console.log(res);
      });
      this.$router.push({
        name: "Bbsdetail",
        query: {
          id: id,
        },
      });
    },

    // 删除帖子
    del(id) {
      this.list = this.list.filter((item) => item.id != id);
    },
    //评论
    pinglun(id) {
      this.$router.push({
        name: "PingLun",
        query: {
          id,
        },
      });
    },
    fabu() {
      console.log(111);
      this.$router.push({
        name: "NewPost",
      });
    },
    // 看评论
    chakan(id) {
      axios
        .get("http://192.168.14.83:1337/api/v1/comments/" + id, {})

        .then((res) => {
          console.log(res.data.data);
          this.pl = res.data.data;
          this.isshow = !this.isshow;
        });
    },
    // 最新帖子
    onehandle() {
      axios
        .get("http://192.168.14.83:1337/api/v1/posts/fresh", {})

        .then((res) => {
          this.list = res.data.data;
          console.log(res.data);
        });
    },
    // 热门帖子
    twohandle() {
      axios
        .get("http://192.168.14.83:1337/api/v1/posts/hot", {})
        .then((res) => {
          this.list = res.data.data;
          console.log(res);
        });
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.dt {
  float: left;
  width: 150px;
  position: relative;
}

.qd {
  float: left;
  position: relative;
  right: -50px;
  top: 30px;
}
h3 {
  margin-left: 8vw;
  margin-top: 5vw;
  font-weight: 600;
}
.qiandao {
  margin-left: 5px;
}
img {
  width: 100%;
}
.tz {
  margin-bottom: 5vw;
}
.bt {
  display: flex;
}
.bt img {
  width: 30vw;
}

html,
body,
.about {
  width: 100vw;
  height: 100vh;
}
.about {
  display: flex;
  flex-direction: column;
  background: url("../assets/fb.png") no-repeat;
}
.fabu {
  /* width: 2rem;
  height: 2rem; */
  display: inline-block;
  width: 50px;
  height: 50px;
  border: none;
  background-color: rgb(0, 153, 255);
  border-radius: 50%;
  position: fixed;
  bottom: 150px;
  right: 30px;
  z-index: 1000;
}
</style>
