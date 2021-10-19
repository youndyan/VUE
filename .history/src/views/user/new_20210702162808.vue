<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="nickName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-table-column label="头像" width="130">
        <template slot-scope="scope">
          <img
            :src="scope.row.avatar | dalImg"
            style="max-width:120px;max-height:120px;diaplay:block;magin:0 auto;"
            alt=""
          />
        </template>
      </el-table-column>
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
import { insertUsersApi, getOneByIdApi, editOneApi } from '@/api/users'
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
    if (this.$route.query.id) {
      const data = await getOneByIdApi(this.$route.query.id)
      this.ruleForm = data
      console.log(data)
    }
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 判断url中是否有id,有就是修改，没有就是新增
          if (this.$route.query.id) {
            await editOneApi(this.$route.query.id, {
              userName: this.ruleForm.userName
            })
          } else {
            await insertUsersApi(this.ruleForm)
          }
          this.$message.success('保存成功')
          this.$router.push({
            name: 'UserList'
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
