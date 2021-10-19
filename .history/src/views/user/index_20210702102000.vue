<template>
  <div class="app-container">
    <el-table stripe border :data="list" style="width:100%">
      <el-table-column type="index" label="序号" width="80" />

      <el-table-column label="用户名" prop="userName" />

      <el-table-column label="昵称" width="120" prop="nickName">
        <template slot-scope="scope">
          <span>
            {{ scope.row.nickName ? scope.row.nickName : '暂无' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="130">
        <template slot-scope="scope">
          <img
            :src="scope.row.avatar | dalImg"
            style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender">
        <template slot-scope="scope">
          <span>
            {{ scope.row.gender ? scope.row.gender : '未知' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="180" prop="address">
        <template slot-scope="scope">
          <span>
            {{ scope.row.address ? scope.row.address : '未填写地址' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="积分" width="180" prop="score"> </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope" class="button">
        

          <!-- 删除图标 -->
          <el-popconfirm
            title="确认删除此用户？"
            @onConfirm="delOne(scope.row)"
          >
            <el-button
              class="button"
              type="danger"
              slot="reference"
              icon="el-icon-delete"
              size="small"
              circle
            ></el-button>
          </el-popconfirm>
          <!-- 购物车数据 -->
          <el-popover placement="right" width="800" trigger="click">
            <el-table :data="gridData">
              <el-table-column
                width="150"
                property="date"
                label="序号"
                type="index"
              ></el-table-column>
              <el-table-column
                width="150"
                property="price"
                label="价格"
              ></el-table-column>
              <el-table-column
                width="100"
                property="product.name"
                label="姓名"
              ></el-table-column>
              <el-table-column
                width="100"
                property="amount"
                label="数量"
              ></el-table-column>
              <el-table-column
                width="100"
                property="product.amount"
                label="库存"
              ></el-table-column>
              <el-table-column label="图片" width="130">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.product.coverImage | dalImg"
                    style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;"
                    alt=""
                  />
                </template>
              </el-table-column>
            </el-table>
            <!-- 购物车图标 -->
            <el-button
              @click="ddddd(scope.row)"
              class="button"
              type="danger"
              slot="reference"
              icon="el-icon-shopping-cart-1"
              size="small"
              circle
              style="background:deeppink"
            ></el-button>
          </el-popover>
          <!-- 积分图标 -->
           <el-popover placement="right" width="800" trigger="click">
            <el-table :data="gridData">
              <el-table-column
                width="150"
                property="date"
                label="序号"
                type="index"
              ></el-table-column>
              <el-table-column
                width="150"
                property="price"
                label="价格"
              ></el-table-column>
              <el-table-column
                width="100"
                property="product.name"
                label="姓名"
              ></el-table-column>
              <el-table-column
                width="100"
                property="amount"
                label="数量"
              ></el-table-column>
              <el-table-column
                width="100"
                property="product.amount"
                label="库存"
              ></el-table-column>
              <el-table-column label="图片" width="130">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.product.coverImage | dalImg"
                    style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;"
                    alt=""
                  />
                </template>
              </el-table-column>
            </el-table>
          <el-button
            class="button"
            type="warning"
            slot="reference"
            icon="el-icon-present
"
            size="small"
            circle
          ></el-button>
           </el-popover>
          <hr>
            <!-- 修改图标 -->
          <el-button
            class="button1"
            icon="el-icon-edit"
            size="small"
            type="primary"
            circle
            @click="xiugai(scope.row)"
          >用户信息修改</el-button>
          <hr>
          <!-- 订单图标 -->
           <el-button
              @click="ddddd(scope.row)"
              class="button1"
              type="danger"
              slot="reference"
              icon="el-icon-shopping-cart-1"
              size="small"
              circle
              style="background:deeppink"
            >用户订单管理</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

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
import { loadUsersApi, deleteOneApi, CloadUsersApi } from '@/api/users'
export default {
  name: 'UserList',
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
    async loadData(page = 1, id) {
      const data = await loadUsersApi(page)
      // const res = await CloadUsersApi(4)
      // console.log(id)
      // console.log(res)
      console.log(data)
      this.list = data.data
      this.pages = data.pages
      // this.gridData = res.data
    },
    async ddddd(user) {
      const res = await CloadUsersApi(user.id)
      this.gridData = res.data
      console.log(res)
    },
    async xiugai(user) {
      const res = await CloadUsersApi(user.id)
      this.$router.push({
        name: 'UserNew',
        query: {
          id: user.id
        }
      })
      this.gridData = res.data
      console.log(res)
    },
    // editOne(item) {
    //   this.$router.push({
    //     name: 'UserNew',
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
.button {
  margin-left: 10px;
}
.button1{
  border-radius: 10px;
  margin-left: 15px;
}
</style>
