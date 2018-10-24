import axios from 'axios'
import axiosUtils from 'axios/lib/utils'
import Vue from 'vue'
import router from '@/router'

// import base from 'base'

function setContentTypeIfUnset (headers, value) {
  if (!axiosUtils.isUndefined(headers) && axiosUtils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value
  }
}

axios.defaults.timeout = 100000
axios.defaults.transformRequest = [function (data, headers) {
  if (axiosUtils.isObject(data)) {
    setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8')
    for (let key in data) {
      if (axiosUtils.isObject(data[key])) {
        data[key] = JSON.stringify(data[key])
      }
    }
    let keys2 = Object.keys(data)
    /* 这里就是把json变成url形式，并进行encode */
    return encodeURI(keys2.map(name => `${name}=${data[name]}`).join('&'))
  }
}]
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? base.productionHost : base.developtionHost

// http request 拦截器
axios.interceptors.request.use((config) => {
  let user = Vue.prototype.$cacheUtils.localStorage('user').getObject('user')
  config.headers['token'] = user && user.token ? user.token : ''
  config.headers['userId'] = user && user.id ? user.id : ''
  return config
})

// http response 拦截器
axios.interceptors.response.use((res) => {
  return res
})
let loading = ''
export default {
  // 默认参数为空配置
  _default (url, params, callback) {
    let options = {}
    options.url = url
    options.params = typeof params === 'function' ? {} : params
    options.callback = typeof params === 'function' ? params : callback
    return options
  },
  // 错误日志
  _errorLog (error) {
    setTimeout(() => {
      Vue.prototype.$message({
        showClose: true,
        message: '网络出错，请稍后再试~',
        type: 'error'
      })
    }, 1000)
    this._removeLoading()
    console.log(error)
  },
  // _interceptLogin (res) {
  //   if (res.data.code === '40001') {
  //     if (base.loginPath === 'login') {
  //       router.app.$router.push({name: base.loginPath})
  //     } else {
  //       location.href = base.loginPath
  //     }
  //   }
  // },
  _addLoading () {
    loading = Vue.prototype.$loading({
      lock: true,
      text: '请求数据中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  _removeLoading (FN) {
    setTimeout(() => {
      loading.close()
      FN && typeof FN === 'function' && FN()
    }, 500)
  },
  _formatRES (res, options) {
    this._removeLoading(() => {
      console.log(res.data.status.status_code, 'res')
      if (res.data.status.status_code === Vue.prototype.$Consts.STATE_CODE.LOGIIN) {
        router.app.$router.push({name: 'login'})
        return
      }
      options.callback && options.callback(res.data.result)
    })
  },
  get (url, params, callback) {
    this._addLoading()
    let options = this._default(url, params, callback)
    axios.get(options.url, {params: options.params})
      .then(res => {
        // if (JSON.stringify(res.data) !== '{}') {
        //   this._interceptLogin(res)
        //   options.cb(res)
        // }
        this._formatRES(res, options)
      })
      .catch(error => {
        this._errorLog(error)
      })
  },
  post (url, params, callback) {
    this._addLoading()
    let options = this._default(url, params, callback)
    axios.post(options.url, options.params)
      .then(res => {
        // if (JSON.stringify(res.data) !== '{}') {
        //   this._interceptLogin(res)
        //   options.cb(res)
        // }
        this._formatRES(res, options)
      })
      .catch(error => {
        this._errorLog(error)
      })
  }
}
