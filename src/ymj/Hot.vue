<template>
  <div class="hot">
    <h1 class="gg">热点新闻</h1>
    <el-row class="kp">
      <el-col :span="12" v-for="item in products" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src="item.coverImage | imgDal"
            class="image"
            @click="toDetail(item.id)"
          />
          <div style="padding: 14px;">
            <span>{{ item.name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Notices } from "../services/auth";
export default {
  data() {
    return {
      products: "",
    };
  },
  async created() {
    const res = await Notices();
    this.products = res.data;
    console.log();
  },

  components: {},
  methods: {
    toDetail(id) {
      this.$router.push({
        name: "NoticesDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
.gg {
  text-align: center;
}

.time {
  font-size: 13px;
  color: #999;
}

.image {
  height: 30vh;
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
