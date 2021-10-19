<template>
 <div class="app-container">
    <el-table stripe border :data="list" style="width:100%">
      <el-table-column type="index" label="序号" width="80" />

       <el-table-column label="用户名" prop="userName" />

        <el-table-column label="昵称" width="120" prop="nickName">
          <template slot-scope="scope">
            <span>
               {{scope.row.nickName?scope.row.nickName:'暂无'}}
            </span>
          </template>
        </el-table-column>
      <el-table-column label="头像" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.coverImage | dalImg" style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;" alt="" />
          </template>
          </el-table-column>
          <el-table-column label="性别" prop="gender">
            <template slot-scope="scope">
            <span>
               {{scope.row.gender?scope.row.gender:'未知'}}
            </span>
          </template>
        </el-table-column>
          <el-table-column label="地址" width="180" prop="address">
            <template slot-scope="scope">
            <span>
               {{scope.row.address?scope.row.address:'未填写地址'}}
            </span>
          </template>
        </el-table-column>
          <el-table-column label="积分" width="180" prop="">
            <template slot-scope="scope">
            <span>
               {{scope.row.address?scope.row.address:'0'}}
            </span>
          </template>
        </el-table-column>
 
        <el-table-column label="操作" width="200">
          <template slot-scope="scope" class="button">
            <el-button class="button" icon="el-icon-lock" size="small" type="primary" circle></el-button>      
<el-popconfirm
  title="确认删除此用户？" @onConfirm="delOne(scope.row)"
>
  <el-button class="button" type="danger" slot="reference" icon="el-icon-delete" size="small" circle ></el-button>
</el-popconfirm>

            <el-popover
  placement="right"
  width="800"
  trigger="click">
  <el-table :data="gridData">
    <el-table-column width="150" property="date" label="序号" type="index"></el-table-column>
    <el-table-column width="150" property="price" label="价格"></el-table-column>
    <el-table-column width="100" property="name" label="姓名"></el-table-column>
    <el-table-column width="300" property="amount" label="数量"></el-table-column>
  </el-table>
  <el-button class="button" type="danger" slot="reference" icon="el-icon-shopping-cart-1
" size="small" circle style="background:deeppink"></el-button>
</el-popover>

           <el-button class="button" type="warning" slot="reference" icon="el-icon-present
" size="small" circle></el-button> 

          </template>
        </el-table-column>

    </el-table>

    <!-- 页码 -->
    <el-pagination
  background
  layout="prev, pager, next"
  :page-count="pages"
  @current-change="loadData">
</el-pagination>

<!-- 购物车数据 -->

  </div>
</template>

<script>
import { loadUsersApi, deleteOneApi, CloadUsersApi } from '@/api/users'
export default {
  name: 'UserList',
  data() {
    return {
      list: [],
      pages: 1,
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },]
      };
    },
  created() {
    //
    this.loadData()
  },
  methods: {
    async loadData(page = 1, user) {
      const data = await loadUsersApi(page)
      const res = await CloadUsersApi(user)
      console.log(res)
      console.log(data)
      this.list = data.data
      this.pages = data.pages
    },
    editOne(item){
      this.$router.push({
        name:'UserNew',
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

<style scoped>
  .button{
    margin-left: 10px;
  }
</style>
