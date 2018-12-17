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
          label: '仓库名：',
          prop: 'storeName',
          prefixIcon: 'el-icon-service',
          placeholder: '请输入仓库名',
          labelWidth: '100px',
          rules: {required: true, message: '请输入内容', trigger: 'blur'}
        }, {
          value: '',
          label: '地址：',
          prop: 'storeAddress',
          placeholder: '请输入仓库所在地',
          prefixIcon: 'el-icon-view',
          labelWidth: '100px',
          rules: {required: true, message: '请输入内容', trigger: 'blur'}
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
      this.$Ajax.get(this.$Api.storeHouse.storeHouseDetail, {id: this.id}, res => {
        if (res.storeHouse) {
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
      this.$Ajax.post(this.$Api.storeHouse.storeHouseAdd, {storeHouse: data}, res => {
        if (res.storeHouse) {
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
