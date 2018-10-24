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
          label: '供应商名：',
          prop: 'name',
          prefixIcon: 'el-icon-service',
          placeholder: '请输入供应商姓名',
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
      this.supplierDetail()
    }
  },
  methods: {
    supplierDetail () {
      this.$Ajax.get(this.$Api.supplier.supplierDetail, {id: this.id}, res => {
        if (res.supplier) {
          this.setV(0, res.supplier.name)
          this.setV(1, res.supplier.phone)
          this.setV(2, res.supplier.address)
          this.setV(3, res.supplier.postalCode)
        }
      })
    },
    setV (i, val) {
      this.loginFrom.from[i].value = val
    },
    save (data) {
      data.id = this.id
      console.log(data, '---')
      this.$Ajax.post(this.$Api.supplier.editSupplier, {supplier: data}, res => {
        if (res.supplier) {
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
