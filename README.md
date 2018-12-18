# web-admin

项目介绍：
   一个后台管理系统，前后端分离，vue做前端，node写后台。
   一个后台管理系统，前后端分离，vue做前端，node写后台。这个项目是前端项目，使用的技术是vue + vue-router + vuex + element-ui
   后台服务地址： https://github.com/fate66/admin-server
   前端自动化上线项目地址：https://github.com/fate66/admin-on-line

   注册账号时，使用了事物（Transaction），注册账号同时生成token，若有一个失败，事物会自动进行回滚。
   同时生成token可以实现前端在注册成功后自动登录，不需要用户再次登录。

   本项目做了单点登陆。
   一个账号同时只能在一台设备上登陆，用的方法是token认证。

   token生成规则：设备的唯一标示+用户ID+当前时间进行MD5以及base64加密

   单点登陆流程：
   在前端每次请求的时候都会在拦截器中校验账号是否登陆或者
   账号是否过期。如果过期或未登录，后台与前端约定了一种规则，后台会将未登录结果返回给前端同时拦截本次请求。

   前端项目在ajax请求以及路由跳转时也做了全局拦截。
   ajax接收到结果时，若接收到未登录或登录失效的信息时，前端项目自动跳转到登录页。
   在路由跳转时，项目也会去检测是否登录，未登录则跳转到登录页

   项目上线：
   node上线需要手动上线，前端项目上线时，我写了一个自动化上线系统，只需浏览器中访问 http://101.201.70.134:8081/v1/features/onLine
   这个接口即可

   文件上传与下载：
   项目做了文件上传与下载功能，上传的文件存储在static目录下，上传文件不能大于2 * 1024 * 1024。上传成功后，后台会将下载的URL直接返回给
   前端，后台不会进行存储。

   项目访问网址： http://101.201.70.134

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
