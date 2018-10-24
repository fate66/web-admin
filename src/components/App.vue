<template>
  <div class="app-box">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  created () {
  }
}
</script>

<style scoped>
  .app-box {
    height: 100%;
  }
</style>
