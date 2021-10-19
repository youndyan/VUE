<template>
  <div class="app-container">
    <el-table stripe border :data="list" style="width:100%">
      <el-table-column type="index" label="序号" width="80" />

       <el-table-column label="名字" prop="name" />

        <el-table-column label="分类" width="120">
          <template slot-scope="scope">
            <span>
               {{scope.row.category?scope.row.category.name:'暂无'}}
            </span>
          </template>
        </el-table-column>

      <el-table-column label="图片" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.coverImage" style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;" alt="" />
          </template>
          </el-table-column>

          <el-table-column label="价格" width="180" prop="price" />
          <el-table-column label="名字" width="180" prop="amount" />
        </el-table-column>

        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="editOne(scope.row)">修改</el-button>
            <el-button @click="delOne(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :page-count="pages"
  @current-change="loadData">
</el-pagination>
  </div>
</template>

<script>
import { loadProductsApi } from '@/api/products'
export default {
  name: 'ProductList',
  data() {
    return {
      list: [],
      pages: 1
    }
  },
  created() {
    //
    this.loadData()
  },
  methods: {
    async loadData(page = 1) {
      const data = await loadProductsApi(page)
      // console.log(data)
      this.list = data.data
      this.pages = data.pages
    }
  }
}
</script>

<style>

</style>