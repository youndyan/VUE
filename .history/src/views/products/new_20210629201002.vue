<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

   <el-form-item label="商品价格" prop="price">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

   <el-form-item label="商品数量" prop="amount">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="主图">
    <el-upload
  class="avatar-uploader"
  name="file"
  :action="uploadUrl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  >
  <img v-if="imageUrl" :src="imageUrl | dalImg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
<el-form-item label="分类" prop="category">
    <el-select v-model="ruleForm.category" placeholder="请选择类别">
      <el-option :key="item.id" v-for="item in categories" :value="item.id" :label="item.name">

      </el-option>

    </el-select>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { insertProductsApi, getOneByIdApi, editOneApi } from "@/api/products";
import { loadModelsApi } from "@/api/product-categories";
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        category: ''
      },
      imageUrl: '',
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/v1/common/upload_file',
      categories: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
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
              category: this.ruleForm.category,
              coverImage: this.imageUrl
            })
          } else {
            await insertProductsApi({
              name: this.ruleForm.name,
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;}
</style>