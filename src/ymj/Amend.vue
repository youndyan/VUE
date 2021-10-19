<template>
  <div class="u-info">
    <van-uploader v-model="imgs" :after-read="afterRead" max-count="1" />
    <van-cell-group>
      <van-field v-model="nickName" label="昵称" placeholder="请输入昵称" />
      <span v-show="isshow">
        <van-field
          :type="checked ? 'text' : 'password'"
          v-model="oldPassword"
          label="旧密码"
          placeholder="请输入旧密码"
        />
        <van-field
          :type="checked ? 'text' : 'password'"
          v-model="password"
          label="新密码"
          placeholder="请输入新密码"
        /><van-checkbox class="show" v-model="checked">{{
          checked ? "隐藏密码" : "显示密码"
        }}</van-checkbox>
      </span>
    </van-cell-group>
    <van-button type="info" @click="isshow = !isshow">修改密码</van-button>

    <van-button type="primary" size="large" @click="saveHandle()"
      >保存</van-button
    >
  </div>
</template>

<script>
import axios from "axios";
import { serverUploadUrl } from "../utils/tools";
import { amend, amendPD } from "../services/auth";
import { Toast } from "vant";
export default {
  data() {
    return {
      imgs: [],
      nickName: "",
      oldPassword: "",
      password: "",
      avatar: "",
      checked: false,
      isshow: false,
    };
  },
  setup() {
    const checked = ref(true);

    return { checked };
  },
  created() {
    this.nickName = this.$route.params.nickName;
    this.avatar = this.$route.params.avatar;
  },
  methods: {
    afterRead(file) {
      // console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);
      axios.post(serverUploadUrl, formData).then((res) => {
        console.log(res.data);
        this.avatar = res.data.data;
        // this.imgs.push({
        //   url: serverUrl + res.data.data,
        // });
      });
    },
    async saveHandle() {
      const res = await amend({
        avatar: this.avatar,
        nickName: this.nickName,
      });
      const res1 = await amendPD({
        password: this.password,
        oldPassword: this.oldPassword,
      });
      if (res.code) {
        Toast.fail("修改个人信息成功");

        this.$router.push({
          name: "User",
        });
      } else {
        Toast.fail(res.msg);
      }
      if (isshow) {
        if (res1.code) {
          Toast.fail("修改密码成功");
          this.$router.push({
            name: "User",
          });
        } else {
        }
      }
    },
  },
};
</script>

<style scoped>
.u-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.show {
}
</style>
