<template>
  <div class="upload-box">
    <el-upload
      :action="action"
      :limit="5"
      :on-success="suc"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">上传文件不要太大</div>
    </el-upload>
    <div v-for="(item, i) in fileList" :key="i" style="line-height: 30px;font-size: 16px;color: #666666;">{{item}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      action: this.$Api.features.featuresUpload,
      fileList: []
    }
  },
  components: {},
  created () {
  },
  methods: {
    suc (res, file, fileList) {
      this.fileList.push(res.result)
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
  .upload-box {
    padding-top: 50px;
    padding-left: 70px;
  }
</style>
