<template>
  <div>
    <div class="form">
      <el-form :inline=true ref="search">
        <el-form-item label="供应商名称：" prop="keyword">
          <el-input v-model="form.keyword" placeholder="供应商名字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <table-list :dataColumn="dataColumn" :data="tableData">
      <template slot-scope="scope" slot="operate">
        <el-button type="text" @click="edit(scope.row)">编辑</el-button>
        <el-button type="text" @click="del(scope.row)">删除</el-button>
      </template>
    </table-list>
  </div>
</template>
<script>

export default {
  data () {
    return {
      dataColumn: [{
        prop: 'id',
        label: 'id'
      }, {
        prop: 'name',
        label: '供应商名字'
      }, {
        prop: 'phone',
        label: '电话'
      }, {
        prop: 'address',
        label: '地址'
      }, {
        prop: 'postalCode',
        label: '传真'
      }, {
        slot: 'operate',
        label: '操作'
      }],
      tableData: {
        url: this.$Api.supplier.supplierList,
        key: 'supplierList',
        params: {}
      },
      total: 0,
      form: {
        keyword: ''
      }
    }
  },
  created () {
  },
  components: {},
  methods: {
    add () {
      this.$router.push({name: 'supplierEdit'})
    },
    search () {
      this.tableData.params.keyword = this.form.keyword
      this.$bus.emit('table-list-date')
    },
    edit (row) {
      this.$router.push({name: 'supplierEdit', params: {id: row.id}})
    },
    del (row) {
      this.$Ajax.post(this.$Api.supplier.supplierDel, {id: row.id}, res => {
        if (res.supplier) {
          this.$message('删除成功')
          this.$bus.emit('table-list-date')
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .form {
    margin-top: 60px;
    margin-bottom: 30px;
  }

  .page {
    margin-top: 30px;
    text-align: right;
    margin-right: 40px;
  }
</style>
