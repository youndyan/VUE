<template>
  <div class="app-container">
    <el-table stripe border data="list">
      <el-table-column type="index" label="序号" width="80" />

       <el-table-column type="index" label="名字" width="180" prop="name" />

        <el-table-column type="index" label="分类" width="120">
          <template slot-scope="scope">
            <span>
               {{scope.row.category?scope.row.category.name:'暂无'}}
            </span>
          </template>
        </el-table-column>

      <el-table-column type="index" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.coverImage" style="max-width:120px;max-height:120px" alt="" />
          </template>

          <el-table-column type="index" label="价格" width="180" prop="price" />
          <el-table-column type="index" label="名字" width="180" prop="amount" />
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { loadProductsApi } from '@/api/products'
export default {
  name: 'ProductList',
  data() {
    return{
      list:[]
    }
  },
  created(){
    //
  },
  methods:{
    loadData(){
      async loadData(){
        const res = await loadProductsApi()
        this.list=data.data
      }
    }
  }
}
</script>

<style>

</style>