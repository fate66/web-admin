<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <div class="title">CRM管理系统（先注册-->后登陆）或使用以下账号</div>
        <div>用户名：张三</div>
        <div>手机号：15736885432</div>
        <div>密码：123456</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <form-group :data="loginFrom" :dataBut="dataBut" @commit="login" @regist="regist"></form-group>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginFrom: {
        from: [{
          value: '',
          label: '用户名：',
          prop: 'userName',
          prefixIcon: 'el-icon-service',
          placeholder: '请输入用户名',
          labelWidth: '80px',
          rules: {required: true, message: '请输入用户名', trigger: 'blur'}
        }, {
          value: '',
          label: '手机号：',
          prop: 'phone',
          prefixIcon: 'el-icon-mobile-phone',
          placeholder: '请输入手机号',
          type: 'number',
          labelWidth: '80px',
          rules: {required: true, message: '请输入手机号', trigger: 'blur'}
        }, {
          value: '',
          label: '密码：',
          prop: 'passWord',
          placeholder: '请输入密码',
          prefixIcon: 'el-icon-view',
          labelWidth: '80px',
          type: 'password',
          rules: {required: true, message: '请输入密码', trigger: 'blur'}
        }]
      },
      dataBut: [{
        text: '登陆',
        type: 'primary',
        key: 'commit'
      },
      {
        text: '注册',
        type: 'primary',
        key: 'regist'
      }]
    }
  },
  created () {
    // if (!this.$cacheUtils.localStorage('uuid').get('uuid')) {
    this.getUUID()
    // }
  },
  methods: {
    login (data) {
      console.log(data, '---')
      this.$Ajax.post(this.$Api.user.login, data, res => {
        if (res.user) {
          this.$cacheUtils.localStorage('user').setObject('user', res.user)
          this.$router.push({name: 'home'})
        } else {
          this.$message('登陆失败')
        }
      })
    },
    getUUID () {
      this.$Ajax.get(this.$Api.user.uuid, (res) => {
        if (res.uuid) {
          this.$cacheUtils.localStorage('uuid').set('uuid', res.uuid)
        }
      })
    },
    regist (data) {
      data.uuid = this.$cacheUtils.localStorage('uuid').get('uuid')
      this.$Ajax.post(this.$Api.user.regist, data, res => {
        if (!res.user) {
          this.$message('该账号已注册，请登录')
        } else {
          this.$message('注册成功，请直接登录')
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .title {
    text-align: center;
    margin-bottom: 50px;
    font-size: 25px;
  }

  .login {
    padding-top: 100px;
  }

  .dataBut {
    .el-form-item__content {
      text-align: center;
      margin-top: 80px;
    }
  }
</style>
