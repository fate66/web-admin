import Vue from 'vue'
import Router from 'vue-router'

const App = resolve => require(['@/components/App'], resolve)
const login = resolve => require(['@/view/user/login'], resolve)
const main = resolve => require(['@/components/bizCommen/main'], resolve)
const supplierList = resolve => require(['@/view/supplier/supplierList'], resolve)
const supplierEdit = resolve => require(['@/view/supplier/supplierEdit'], resolve)
const storeHouseAdd = resolve => require(['@/view/storeHouse/storeHouseAdd'], resolve)
const storeHouseList = resolve => require(['@/view/storeHouse/storeHouseList'], resolve)
const customerAdd = resolve => require(['@/view/custormer/customerAdd'], resolve)
const customerList = resolve => require(['@/view/custormer/customerList'], resolve)
const uploadFile = resolve => require(['@/view/features/uploadFile'], resolve)

const home = resolve => require(['@/view/home'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: App,
      meta: {
        menu: true
      },
      children: [
        {
          path: '',
          component: main,
          children: [
            {
              path: '',
              component: App,
              meta: {
                title: '首页',
                icon: 'el-icon-menu'
              },
              children: [{
                path: '',
                name: 'home',
                component: home,
                meta: {
                  menu: true,
                  title: '欢迎'
                }
              }]
            },
            {
              path: 'supplier',
              component: App,
              meta: {
                title: '供应商管理',
                icon: 'el-icon-menu'
              },
              children: [{
                path: 'supplierList',
                name: 'supplierList',
                component: supplierList,
                meta: {
                  menu: true,
                  title: '供应商列表'
                }
              }, {
                path: 'supplierEdit:/id',
                name: 'supplierEdit',
                component: supplierEdit,
                meta: {
                  menu: false,
                  title: '编辑供应商'
                }
              }]
            },
            {
              path: 'storeHouse',
              component: App,
              meta: {
                title: '仓库管理',
                icon: 'el-icon-menu'
              },
              children: [{
                path: 'storeHouseAdd:/id',
                name: 'storeHouseAdd',
                component: storeHouseAdd,
                meta: {
                  menu: false,
                  title: '编辑仓库'
                }
              }, {
                path: 'storeHouseList',
                name: 'storeHouseList',
                component: storeHouseList,
                meta: {
                  menu: true,
                  title: '仓库管理'
                }
              }]
            }, {
              path: 'customer',
              component: App,
              meta: {
                title: '客户管理',
                icon: 'el-icon-menu'
              },
              children: [{
                path: 'customerList',
                name: 'customerList',
                component: customerList,
                meta: {
                  menu: true,
                  title: '客户列表'
                }
              }, {
                path: 'customerAdd:/id',
                name: 'customerAdd',
                component: customerAdd,
                meta: {
                  menu: false,
                  title: '编辑客户'
                }
              }]
            }, {
              path: 'features',
              component: App,
              meta: {
                title: '小功能',
                icon: 'el-icon-menu'
              },
              children: [{
                path: 'uploadFile',
                name: 'uploadFile',
                component: uploadFile,
                meta: {
                  menu: true,
                  title: '上传文件'
                }
              }]
            }]
        }]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '*',
      redirect: {name: 'login'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = Vue.prototype.$cacheUtils.localStorage('user').getObject('user')
  if (to.name === 'login' || (user && user.token && user.id)) {
    next()
  } else {
    next({
      name: 'login'
    })
  }
})
export default router
