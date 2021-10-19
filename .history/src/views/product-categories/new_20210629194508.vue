<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>

  <el-form-item label="主图">
    <el-upload
  class="avatar-uploader"
  :action="uploadUrl"
  :show-file-list="false"
  :on-success="handleAvatarSuccess">
  <img v-if="imageUrl" :src="imageUrl | dalImg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { insertproductsApi, getOneByIdApi, editOneApi } from "@/api/products";
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
          { required: true, message: '请输入名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    if (this.$route.query.id) {
      const data = await getOneByIdApi(this.$route.query.id)
      this.ruleForm = {
        name: data.name,
        category: data.actegory?.id
      }
      this.imageUrl = data.coverImage
    }
    const cData = await loadModelsApi()
    this.categories = cData.data
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 判断url中是否有id,有就是修改，没有就是新增
          if (this.$route.query.id) {
            await editOneApi(this.$route.query.id, {
              name: this.ruleForm.name,
              category: this.ruleForm.category,
              coverImage: this.imageUrl
            })
          } else {
            await insertproductsApi({
              name: this.ruleForm.name,
              category: this.ruleForm.category,
              coverImage: this.imageUrl
            })
          }
          this.$message.success('保存成功')
          this.$router.push({
            name: 'ProductsCategoryList'
          })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>

</style>