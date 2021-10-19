<template>
  <div class="home">
    <div class="item" v-for="item in forums" :key="item.id">
      <router-link
        :to="{
          name: 'Bbs',
          query: {
            fid: item.id,
          },
        }"
        ><img class="tp" :src="item.coverImage | imgDal" :alt="item.name" />
      </router-link>
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      forums: [],
    };
  },
  components: {},
  created() {
    axios.get("http://192.168.14.83:1337/api/v1/forums").then((res) => {
      this.forums = res.data.data;
      console.log(this.forums);
    });
    // axios
    //   .get("http://192.168.14.83:1337/api/v1/posts", {
    //     name: this.name,
    //     forum: this.forum,
    //   })
    //   .then((res) => {
    //     // this.forum = res.forums.item.fid;
    //     console.log(res);
    //   });
  },
};
</script>
<style>
.tp {
  width: 15rem;
  margin: 0.1rem 3.5rem;
}
p {
  text-align: center;
}
</style>
