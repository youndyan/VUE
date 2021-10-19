<template>
 <div class="app-container">
    <el-table stripe border :data="list" style="width:100%">
      <el-table-column type="index" label="序号" width="80" />

       <el-table-column label="用户名" prop="name" />

        <el-table-column label="昵称" width="120">
          <template slot-scope="scope">
            <span>
               {{scope.row.category?scope.row.category.name:'暂无'}}
            </span>
          </template>
        </el-table-column>
      <el-table-column label="头像" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.coverImage | dalImg" style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;" alt="" />
          </template>
          </el-table-column>
          <el-table-column label="性别" prop="" />
          <el-table-column label="地址" width="180" prop="" />
          <el-table-column label="积分" width="180" prop="" />
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
export default {

}
</script>

<style>

</style>