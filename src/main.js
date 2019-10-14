// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from 'jquery'
window.$ = $;
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';



//自定義組件
import App from './App'
import router from './router'
import './bus'
import currency from './filter/currencyFilter'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;
Vue.use(VeeValidate, {
  events: 'input|blur',
});
VeeValidate.Validator.localize('zh_TW', zhTWValidate)


Vue.component('Loading', Loading);
Vue.filter('currency', currency); //自定義 元件
// Vue.filter('timestampToData',timestamp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  console.log('to:', to, 'from:', from, 'next', next) //要使用`next`方法，否則hook不會被resolved
  if (to.meta.requiresAuth) {
    // console.log('需要驗證')
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      }
      else{
        next({
          path:'/login'
        })
      }
    });
  } else {
    next();
  }
})
