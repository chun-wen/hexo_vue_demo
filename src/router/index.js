import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/login'
import Dashboard from '@/components/dashboard'
import Products from '@/components/pages/products'


Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
      // component:Login,
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        }
      ]
    }
  ]
})
