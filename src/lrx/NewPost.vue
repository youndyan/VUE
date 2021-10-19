<template>
  <div class="wrap">
    <h3>要发动态啦~~~</h3>
    <ul>
      <!-- <li>
        <select v-model="forum">
          <option v-for="item in forums" :key="item.id" :value="item.id">{{
            item.name
          }}</option>
        </select>
      </li> -->
      <van-uploader v-model="imgs" :after-read="afterRead" max-count="1" />
      <li>标题：<input type="text" v-model="name" /></li>
      <li>
        <textarea
          rows="8"
          cols="46"
          v-model="content"
          type="text"
          placeholder="请输入内容"
        />
      </li>
      <li><button @click="sendHandle">发布</button></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { serverUploadUrl } from "../utils/tools";
export default {
  data() {
    return {
      imgs: [],
      forums: [],
      forum: "",
      name: "",
      nickName: "",
      avatar: "",
      content: "",
    };
  },
  components: {},
  created() {
    axios.get("http://192.168.14.83:1337/api/v1/forums").then((res) => {
      this.forums = res.data.data;
    });
  },
  methods: {
    afterRead(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      axios.post(serverUploadUrl, formData).then((res) => {
        this.avatar = res.data.data;
        console.log(this.avatar);
      });
    },
    async sendHandle() {
      //发帖
      await axios
        .post(
          "http://192.168.14.83:1337/api/v1/posts",
          {
            name: this.name,
            // desc: this.forum,
            content: this.content,
            coverImage: this.avatar,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.wrap {
  background: url("../assets/bg.png") no-repeat;
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
