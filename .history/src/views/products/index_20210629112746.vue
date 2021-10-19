<template>
  <div class="app-container">
    <el-table stripe border data-"list">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return{
      list:[]
    }
  },
  created(){
    //
  },
  methods:{
    loadData(){
      //
    }
  }
}
</script>

<style>

</style>