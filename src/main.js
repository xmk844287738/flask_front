// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import VueToasted  from 'vue-toasted'   // 注册 vue-toasted 组件
import axios from './http'    // 导入配置了全局拦截器后的 axios
import moment from 'moment'   // 导入 moment.js 用来格式化 UTC 时间为本地时间

// 图标
import './assets/icon-line/css/simple-line-icons.css'
import './assets/icon-material/material-icons.css'

Vue.use(VueToasted, {
  theme: 'bubble',    // 主题样式 primary/outline/bubble
  position: 'top-center',   // 显示在页面哪个位置
  duration: 3000,   // 显示多久时间（毫秒）
  // 支持哪个图标集合
  iconPack : 'material', // set your iconPack, defaults to material. material|fontawesome|custom-class

  action: {   // 可以执行哪些动作
    text: 'Cancel',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  },
});

Vue.config.productionTip = false

// 将 $axios 挂载到 prototype 上，在组件中可以直接使用 this.$axios 访问
Vue.prototype.$axios = axios

// 将 $moment 挂载到 prototype 上，在组件中可以直接使用 this.$moment 访问
Vue.prototype.$moment = moment


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
