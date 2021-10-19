<template>
  <div class="logact">
    <van-dropdown-menu>
      <van-dropdown-item v-model="state.value" :options="option" />
    </van-dropdown-menu>
    <van-cell-group inset>
      <!-- 输入任意文本 -->
      <van-field v-model="name" label="文本" />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="tel" type="tel" label="手机号" />
    </van-cell-group>
    <van-button type="primary" @click="upactivity">提交</van-button>
  </div>
</template>

<script>
import { logact } from "../services/auth";

export default {
  data() {
    return {
      name: "",
      tel: "",
      state: { value: 0 },
      option: [
        { text: "游泳", value: 0 },
        { text: "篮球", value: 1 },
        { text: "足球", value: 2 },
      ],
    };
  },
  methods: {
    upactivity() {
      const res = logact({
        activity: this.option[this.state.value].text,
        name: this.name,
        remarks: this.tel,
      });
      console.log(res);
    },
  },
};
</script>

<style></style>
