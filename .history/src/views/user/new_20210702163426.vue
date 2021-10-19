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
        <el-input v-model="ruleForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="主图">
        <el-upload
          class="avatar-uploader"
          name="file"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl | dalImg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    // 表示图片上传成功之后的处理函数
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = res.data
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 判断url中是否有id,有就是修改，没有就是新增
          if (this.$route.query.id) {
            await editOneApi(this.$route.query.id, {
              userName: this.ruleForm.userName,
              nickName: this.ruleForm.nickName
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
