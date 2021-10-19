<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  insertModelApi,
  getOneByIdApi,
  editOneApi
} from '@/api/product-categories'
export default {
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    // 如果id参数存在表示修改
    if (this.$route.query.id) {
      const data = await getOneByIdApi(this.$route.query.id) // 根据id获取当前数据
      this.ruleForm = data
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert('submit!')
          // 判断url中是否有id参数，如果有便是修改，否则表示新增
          if (this.$route.query.id) {
            await editOneApi(this.$route.query.id, {
              name: this.ruleForm.name
            })
          } else {
            await insertModelApi(this.ruleForm)
          }

          this.$message.success('保存成功')
          this.$router.push({
            name: 'ProductCategoryList'
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

<style></style>
