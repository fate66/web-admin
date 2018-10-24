<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :router=true
      :unique-opened=true
      active-text-color="#ffd04b">
      <template v-if="menuList.length">
        <el-submenu :index="item.index" v-for="(item, index) in menuList" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(sub, i) in item.children" :route="{name: sub.name}" :index="sub.index" :key="i">
              {{sub.title}}
            </el-menu-item>
          </el-menu-item-group>
          <!--<el-submenu index="1-4">-->
          <!--<template slot="title">选项5</template>-->
          <!--<el-menu-item index="1-4-1">-->
          <!--dd-->
          <!--</el-menu-item>-->
          <!--</el-submenu>-->
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import router from '@/router'

export default {
  name: 'v-menu',
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.addMenu()
  },
  methods: {
    addMenu () {
      this.getMenu().forEach(item => {
        item.children.forEach((mainItem, mainIndex) => {
          console.log(mainItem, 'mainItem--')
          mainItem.children.forEach((appItem, appIndex) => {
            let obj = {}
            obj = {title: appItem.meta.title, icon: appItem.meta.icon, index: `${mainIndex}-${appIndex}`}
            let children = []
            appItem.children.forEach((bizItem, bizIndex) => {
              if (bizItem.meta.menu) {
                children.push({name: bizItem.name, title: bizItem.meta.title, index: `${mainIndex}-${appIndex}-${bizIndex}`})
              }
            })
            obj.children = children
            this.menuList.push(obj)
          })
        })
      })
      console.log(this.menuList, 'menuList')
    },
    getMenu () {
      return router.options.routes.filter(item => {
        if (item.meta && item.meta.menu) {
          return true
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .el-menu-vertical-demo{
    text-align: left;
  }
</style>
