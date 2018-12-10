<template>
  <div class="main-box">
      <el-header>CRM管理系统</el-header>
    <div class="aside">
        <v-menu></v-menu>
    </div>
    <div class="main">
      <router-view/>
    </div>
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
<style lang="scss">
  .main-box{
    height: 100%;
  }
  .el-header {
    background-color: #545c64;
    color: white;
    text-align: center;
    line-height: 60px;
  }

  .aside {
    color: #333;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    width: 250px;
    background: #D3DCE6;
  }
  .el-menu{
    border: none;
  }
  .main {
    color: #333;
    position: absolute;
    right: 0;
    top: 60px;
    bottom: 0;
    left: 250px;
    padding-left: 50px;
  }

</style>
