import cacheUtils from './components/commen/cacheUtils'
import Ajax from './components/commen/httpUtil'
import Api from './api'
import Vue from 'vue'
import consts from './components/commen/consts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/base.css'

import FormGroup from './components/FormGroup'
import TableList from './components/TableList'
import vMenu from './components/bizCommen/menu'
import Bus from 'vue-bus'
import vBack from './components/bizCommen/back'

Vue.use(ElementUI)
Vue.use(Bus)
Vue.prototype.$Api = Api
Vue.prototype.$cacheUtils = cacheUtils
Vue.prototype.$Ajax = Ajax
Vue.prototype.$Consts = consts

Vue.component(FormGroup.name, FormGroup)
Vue.component(vMenu.name, vMenu)
Vue.component(vBack.name, vBack)
Vue.component(TableList.name, TableList)
