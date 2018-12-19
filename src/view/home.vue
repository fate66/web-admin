<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <div class="title">CRM后台管理系统</div>
        <div>前后端分离项目，前端VUE、后端nodejs</div>
        <div class="git">
          <a href="https://github.com/fate66/admin-server">后端项目源码</a>
          <a href="https://github.com/fate66/web-admin">前端项目源码</a>
          <a href="https://github.com/fate66/admin-on-line">自动化上线源码</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .title {
    text-align: center;
    margin-bottom: 50px;
    font-size: 25px;
  }

  .login {
    padding-top: 100px;
  }
  .git{
    margin-top: 30px;
    & >a{
      margin-left: 10px;
    }
  }
</style>
