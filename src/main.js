import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router' // 路由 1
import router from './router' // 路由 2
import axios from 'axios';
import VueAxios from 'vue-axios'


// 关闭 Vue 的生产提示
Vue.config.productionTip = false

// 使用插件
Vue.use(ElementUI)
Vue.use(VueRouter) // 路由 3
Vue.use(VueAxios, axios)

// 创建 Vue 实例对象
new Vue({
  render: h => h(App),
  router // 路由 4
}).$mount('#app')