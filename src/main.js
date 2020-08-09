import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import FastClick from 'fastclick'
import LazyLoad from "vue-lazyload"

//**使用自定义插件**步骤1：：导入toast文件中index文件，这个导入精确到文件夹就行了
import toast from "./components/common/toast"

//**使用自定义插件**步骤2：：安装toast插件
Vue.use(toast)

//解决移动端固有的默认300ms延迟
FastClick.attach(document.body)

//使用图片懒加载
Vue.use(LazyLoad)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
