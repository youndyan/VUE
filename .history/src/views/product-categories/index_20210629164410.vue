<template>
  <div class="app-container">
    <el-table stripe border :data="list" style="width:100%">
      <el-table-column type="index" label="序号" width="80" />

       <el-table-column label="名字" prop="name" />

      <el-table-column label="图片" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.coverImage | dalImg" style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;" alt="" />
          </template>
          </el-table-column>


        </el-table-column>
 
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="small" type="primary" @click="editOne(scope.row)">修改</el-button>
            
                
<el-popconfirm
  title="确认删除此项？" @onConfirm="delOne(scope.row)"
>
  <el-button slot="reference" icon="el-icon-delete" size="small" >删除</el-button>
</el-popconfirm>

            
            
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
import { loadModelsApi, deleteOneApi } from '@/api/product-categorys'
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
      const data = await loadModelsApi(page)
      // console.log(data)
      this.list = data.data
      this.pages = data.pages
    },
    editOne(item){
      this.$router.push({
        name:'ProductCategoryNew',
        query:{
          id:item.id
        }
      })
    },
   async delOne(item){
         await deleteOneApi(item.id)
         this.loadData()
    }
  }
}
</script>

<style>

</style>