<template>
  <div class="app-container">
    <!-- <hr>
     <el-button icon="el-icon-edit" size="small" type="primary" @click="isShow = true">新增</el-button> -->
    <el-table stripe border :data="list" style="width:100%">
      <el-table-column type="index" label="序号" width="80" />

       <el-table-column label="名字" prop="name" />

        <!-- <el-table-column label="分类" width="120">
          <template slot-scope="scope">
            <span>
               {{scope.row.category?scope.row.category.name:'暂无'}}
            </span>
          </template>
        </el-table-column> -->

      <el-table-column label="主图">
        <template slot-scope="scope">
          <img :src="scope.row.coverImage | dalImg" style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;" alt="" />
          </template>
          </el-table-column>

          <el-table-column label="描述" prop="price" />
        </el-table-column>
 
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="small" type="primary" @click="isShow = true">修改</el-button>
            
                
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

     <!-- <el-dialog title="编辑" :visible="isShow" @close = "isShow = false">

       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名字" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="描述" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form> -->

     </el-dialog>
  </div>
</template>

<script>
import { loadForumApi, deleteOneApi } from '@/api/forum'
export default {
  name: 'ForumList',
  data() {
    return {
      isShow : false
      list: [],
      pages: 1,
       ruleForm: {
          name: '',
          desc: ''
        },
         rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    }
  },
  created() {
    //
    this.loadData()
  },
  methods: {
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    async loadData(page = 1) {
      const data = await loadForumApi(page)
      console.log(data)
      this.list = data.data
      this.pages = data.pages
    },
    editOne(item)
       {
      this.$router.push({
        name: 'ForumNew',
        query: {
          id: item.id
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