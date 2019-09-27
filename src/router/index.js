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

// router.beforeEach((to, from, next) => {
//   console.log('to:', to, 'from:', from, 'next', next) //要使用`next`方法，否則hook不會被resolved
//   if (to.meta.requiresAuth) {
//     // console.log('需要驗證')
//     const api = `${process.env.APIPATH}/api/user/check`;
//     axios.post(api).then(response => {
//       console.log(response.data);
//       if (response.data.success) {
//         next();
//       }
//       else{
//         next({
//           path:'/login'
//         })
//       }
//     });
//   } else {
//     next();
//   }
// })