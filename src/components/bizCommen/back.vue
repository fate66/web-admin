<template>
  <div class="back">
    <el-button type="primary" @click="back">返回上一页</el-button>
  </div>
</template>

<script>
export default {
  name: 'v-back',
  data () {
    return {}
  },
  components: {},
  created () {
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss'>

  .back {
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }
</style>
