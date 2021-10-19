<template>
  <div class="app-container">
    <el-table stripe border :data="list" style="width:100%">
      <el-table-column type="index" label="序号" width="80" />

      <el-table-column label="商品名" prop="product.name" />
       <el-table-column label="价格" prop="price" />
       <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.product?scope.row.product.coverImage:'' | dalImg"
            style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;"
            alt=""
          />
        </template>
      </el-table-column>
      
       <el-table-column label="库存" prop="product.amount" />
       <el-table-column label="浏览量" prop="product.views" />
    </el-table>
</el-popover>
    <!-- 页码 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-count="pages"
      @current-change="loadData"
    >
    </el-pagination>
  </div>
</template>

<script>
import { loadDingdanApi, deleteOneApi } from '@/api/dingdan'
export default {
  name: 'DingdanList',
  data() {
    return {
      list: [],
      pages: 1,
      gridData: []
    }
  },
  created() {
    //
    this.loadData()
  },
  methods: {
    async loadData(page = 1) {
     
      const data = await loadDingdanApi(this.$route.query.id)
      // const res = await CloadUsersApi(4)
      // console.log(id)
      console.log(data)
      this.list = data
      this.pages = data.pages
      // this.gridData = res.data
    },
    // async ddddd(page = 1) {
    //   const res = await DloadUsersApi(page)
    //   this.gridData = res.data
    //   console.log(res)
    // },
    // async dingdan(user) {
    //   const res = await DloadUsersApi(user.id)
    //   this.gridData = res.data
    //   console.log(res)
    // },
    // async xiugai(user) {
    //   const res = await CloadUsersApi(user.id)
    //   this.$router.push({
    //     name: 'UserNew',
    //     query: {
    //       id: user.id
    //     }
    //   })
    //   this.gridData = res.data
    //   console.log(res)
    // },
    // editOne(item) {
    //   this.$router.push({
    //     name: 'DingdanNew',
    //     query: {
    //       id: item.id
    //     }
    //   })
    // },
    async delOne(item) {
      await deleteOneApi(item.id)
      this.loadData()
    }
  }
}
</script>

<style scoped>

</style>
