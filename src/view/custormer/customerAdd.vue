<template>
  <div>
    <div class="editForm">
      <form-group :data="loginFrom" :dataBut="dataBut" @save="save"></form-group>
      <v-back></v-back>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginFrom: {
        from: [{
          value: '',
          label: '客户名：',
          prop: 'name',
          prefixIcon: 'el-icon-service',
          placeholder: '请输入客户名字',
          labelWidth: '100px',
          rules: {required: true, message: '请输入内容', trigger: 'blur'}
        }, {
          value: '',
          label: '手机号：',
          prop: 'phone',
          prefixIcon: 'el-icon-mobile-phone',
          placeholder: '请输入手机号',
          type: 'number',
          labelWidth: '100px',
          rules: {required: true, message: '请输入手机号', trigger: 'blur'}
        }, {
          value: '',
          label: '地址：',
          prop: 'address',
          placeholder: '请输入地址',
          prefixIcon: 'el-icon-view',
          labelWidth: '100px',
          rules: {required: true, message: '请输入内容', trigger: 'blur'}
        }, {
          value: '',
          label: '传真：',
          prop: 'postalCode',
          placeholder: '请输入传真',
          prefixIcon: 'el-icon-view',
          labelWidth: '100px'
        }]
      },
      dataBut: [{
        text: '确定',
        type: 'primary',
        key: 'save'
      }],
      id: ''
    }
  },
  created () {
    this.id = this.$route.params.id
    if (this.id) {
      this.customerDetail()
    }
  },
  methods: {
    customerDetail () {
      this.$Ajax.get(this.$Api.customer.customerDetail, {id: this.id}, res => {
        if (res.customer) {
          this.setV(0, res.customer.name)
          this.setV(1, res.customer.phone)
          this.setV(2, res.customer.address)
          this.setV(3, res.customer.postalCode)
        }
      })
    },
    setV (i, val) {
      this.loginFrom.from[i].value = val
    },
    save (data) {
      data.id = this.id
      console.log(data, '---')
      this.$Ajax.post(this.$Api.customer.customerAdd, {customer: data}, res => {
        if (res.customer) {
          this.$message('保存成功')
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .editForm {
    margin-top: 50px;
    width: 70%;
  }
</style>
