<template>
  <div class="app-container">
    <hr>
     <el-button icon="el-icon-edit" size="small" type="primary" @click="isShow = true">新增</el-button>
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

     <el-dialog title="编辑" :visible="isShow" @close = "isShow = false">

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
</el-form>

     </el-dialog>
  </div>
</template>

<script>
import { insertProductApi, getOneByIdApi, editOneApi } from '@/api/products'
import { loadModelsApi } from '@/api/product-categories'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        price: '',
        amount: '',
        category: ''
      },
      imageUrl: '',
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/v1/common/upload_file',
      categories: [],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        category: [{ required: true, message: '请选择分类', trigger: 'blur' }]
      }
    }
  },
  async created() {
    // 如果id参数存在表示修改
    if (this.$route.query.id) {
      const data = await getOneByIdApi(this.$route.query.id) // 根据id获取当前数据
      this.ruleForm = {
        name: data.name,
        price: data.price,
        amount: data.amount,
        category: data.category?.id
      }
      this.imageUrl = data.coverImage // 此处需要把图片路径取出来单独存储
    }
    const cData = await loadModelsApi()
    this.categories = cData.data
  },
  methods: {
    // 表示图片上传成功之后的处理函数
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = res.data
    },
     submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert('submit!')
          // 判断url中是否有id参数，如果有便是修改，否则表示新增
          if (this.$route.query.id) {
            await editOneApi(this.$route.query.id, {
              name: this.ruleForm.name,
              amount: this.ruleForm.amount,
              price: this.ruleForm.price,
              category: this.ruleForm.category,
              coverImage: this.imageUrl
            })
          } else {
            await insertProductApi({
              name: this.ruleForm.name,
              amount: this.ruleForm.amount,
              price: this.ruleForm.price,
              category: this.ruleForm.category,
              coverImage: this.imageUrl
            })
          }

          this.$message.success('保存成功')
          this.$router.push({
            name: 'ProductsList'
          })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate(async valid => {
    //     if (valid) {
    //       // alert('submit!')
    //       // 判断url中是否有id参数，如果有便是修改，否则表示新增
    //       if (this.$route.query.id) {
    //         await editOneApi(this.$route.query.id, {
    //           name: this.ruleForm.name,
    //           price: this.ruleForm.price,
    //           amount: this.ruleForm.amount,
    //           category: this.ruleForm.category,
    //           coverImage: this.imageUrl
    //         })
    //       } else {
    //         await insertProductApi({
    //           name: this.ruleForm.name,
    //           price: this.ruleForm.price,
    //           amount: this.ruleForm.amount,
    //           category: this.ruleForm.category,
    //           coverImage: this.imageUrl
    //         })
    //       }

    //       this.$message.success('保存成功')
    //       this.$router.push({
    //         name: 'ProductsList'
    //       })
    //     } else {
    //       this.$message.error('error submit!!')
    //       return false
    //     }
    //   })
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>

</style>