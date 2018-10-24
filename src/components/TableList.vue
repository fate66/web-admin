<template>
  <div>
    <el-table :data="tableData" border>
      <template v-for="(item, index) in dataColumn">
        <el-table-column
          v-if="!item.slot"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align?item.align:'center'">
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align?item.align:'center'">
          <template slot-scope="scope">
            <slot :row="scope.row" :index="scope.$index" :name="item.slot"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :currentPage.sync="currentPage"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  name: 'table-list',
  props: {
    dataColumn: {
      type: Array,
      default: () => []
    },
    data: {
      url: String,
      key: String,
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
      page: 1,
      currentPage: 1
    }
  },
  created () {
    this.getData()
  },
  components: {},
  methods: {
    getData () {
      if (!this.data.url || !this.data.key) {
        console.log('URL或者KEY不能为空')
        return
      }
      let key = this.data.key
      let params = Object.assign({page: this.page, pageSize: this.data.pageSize}, this.data.params)
      this.$Ajax.get(this.data.url, params, res => {
        if (res[key]) {
          this.tableData = res[key].rows
          this.total = res[key].count
        }
      })
    },
    currentChange (index) {
      this.page = index
      this.getData()
    }
  },
  mounted () {
    this.$bus.on('table-list-date', () => {
      this.currentPage = 1
      this.page = 1
      this.getData()
    })
  },
  destroyed () {
    this.$bus.off('table-list-date')
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
