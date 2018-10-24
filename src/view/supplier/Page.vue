<template>
  <div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    dataColumn: {
      type: Array,
      default: () => []
    },
    data: {
      url: String,
      params: {
        type: Object,
        default: () => {
        }
      },
      pageSize: {
        type: Number,
        default: 10
      }
    }
  },
  data () {
    return {
      tableData: [],
      total: 0,
      page: 1
    }
  },
  created () {
    this.getData(0)
  },
  components: {},
  methods: {
    getData (page) {
      if (!this.data.url) {
        console.log('URL不能为空')
        return
      }
      this.$Ajax.get(this.data.url, {pageSize: 10, page: page}, res => {
        if (res.supplierList) {
          this.tableData = res.supplierList.rows
          this.total = res.supplierList.total
        }
      })
    },
    currentChange (index) {
      this.getData(index)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
  .page {
    margin-top: 30px;
    text-align: right;
    margin-right: 40px;
  }
</style>
