<template>
  <div class="bbsdetail">
    <div class="bbsdetail">
      <h1>{{ info.name }}</h1>
      <img :src="info.coverImage | imgDal" alt="" />
      <p>{{ info.content }}</p>
    </div>
    <hr />
    <div class="pl">
      <van-field v-model="sms" center clearable placeholder="请输入你的神评">
        <template #button>
          <van-button size="small" type="primary" @click="con">发送</van-button>
        </template>
      </van-field>
    </div>
    <div class="xs">
      <p v-for="item in list" :key="item.id">
        {{ item.user.userName }} : {{ item.content }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: [],
      sms: "",
      list: {},
    };
  },
  async created() {
    await axios
      .get("http://192.168.14.83:1337/api/v1/posts/" + this.$route.query.id)
      .then((res) => {
        this.info = res.data.data;
      });

    await axios
      .get("http://192.168.14.83:1337/api/v1/comments/" + this.$route.query.id)
      .then((res) => {
        this.list = res.data.data;
      });
  },
  methods: {
    async con() {
      await axios
        .post(
          "http://192.168.14.83:1337/api/v1/comments/" + this.$route.query.id,
          {
            content: this.sms,
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
      this.shuaxin();
    },
    async shuaxin() {
      await axios
        .get(
          "http://192.168.14.83:1337/api/v1/comments/" + this.$route.query.id
        )
        .then((res) => {
          this.list = res.data.data;
        });
    },
  },
};
</script>

<style>
.bbsdetail {
  display: flex;
  flex-direction: column;
}
img {
  width: 70%;
  margin: 5px auto;
}

.xs {
  flex: 1;
}
.pl {
  /* position: absolute; */
  bottom: 0;
  width: 100vw;
  background-color: rgb(214, 206, 206);
  /* margin: 10px auto; */
}
</style>
