import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Dashboard from '@/components/dashboard'
import Products from '@/components/dashboardPages/products'
import Coupon from "@/components/dashboardPages/coupon";
import Order from "@/components/dashboardPages/order";
import CustomOrder from "@/components/dashboardPages/CustomOrder"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
      // component:Login,
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
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        },
        {
          path: 'order',
          name: 'Order',
          component: Order,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },   
    {
      path: '/',
      name: 'custom_dashboard',
      component: Dashboard,
      children: [
        {
          path: 'custom_order',
          name: 'CustomOrder',
          component: CustomOrder,
        },
      ]
    }
  ]
})