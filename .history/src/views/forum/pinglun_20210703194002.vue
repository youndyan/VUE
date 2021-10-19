<template>
  <div class="app-container">
    <el-table stripe border :data="list" style="width:100%">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="用户名" prop="user.userName" />
       <el-table-column label="用户头像">
        <template slot-scope="scope">
          <img width="80px" :src="scope.row.user.avatar | dalImg" style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;" alt="" />
          </template>
          </el-table-column>
        <el-table-column label="帖子内容"  width="130" prop="post.name"> </el-table-column>
       <el-table-column label="评论内容" prop="content" />

        <!-- <el-table-column label="分类" width="120">
          <template slot-scope="scope">
            <span>
               {{scope.row.category?scope.row.category.name:'暂无'}}
            </span>
          </template>
        </el-table-column> -->

     

          <!-- <el-table-column label="价格" width="180" prop="price" />
          <el-table-column label="名字" width="180" prop="amount" /> -->
        </el-table-column>
 
        <el-table-column  label="操作" width="200">
          <template slot-scope="scope">
            <el-button class="aaa" icon="el-icon-edit" size="small" type="primary" @click="editOne(scope.row)"><span class="bbb">没有接口</span>修改</el-button>
            
                
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
import { loadPinglunsApi, deleteOneApi } from '@/api/pinglun'
export default {
  name: 'PinglunList',
  data() {
    return {
      list: [],
      pages: 1,
      avatar: []
    }
  },
   created() {
    //
    this.loadData()
    // const data = await loadPinglunsApi(this.postId)
    //   console.log(data)
  },
  methods: {
    async loadData(page = 1) {
      const data = await loadPinglunsApi(this.$route.query.id)
      console.log(data)
      this.list = data
      this.pages = data.pages
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