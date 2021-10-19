<template>
  <div class="wrap">
    <h3></h3>
    <!-- <van-icon name="like-o" /> -->
    <ul>
      <li>
        <textarea
          rows="8"
          cols="46"
          v-model="name"
          type="text"
          placeholder="请输入评论"
        />
      </li>
      <li><button @click="con">评论</button></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
// import { pinglun } from "../services/auth";
export default {
  data() {
    return {
      forums: [],
      forum: "",
      name: "",
    };
  },
  components: {},
  created() {
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
  },
  methods: {
    // 评论
    con() {
      // const res = await pinglun();
      // console.log(res);
      axios
        .post(
          "http://192.168.14.83:1337/api/v1/comments/" + this.$route.query.id,
          {
            content: this.name,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.wrap {
  background: url("../assets/333.png") no-repeat;
  /* opacity: 0.5; */
}
li {
  margin: 1rem auto;
}
select {
  widows: 80px;
  height: 20px;
}
textarea {
  border: none;
}
</style>
