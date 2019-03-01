import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import index from '../views/demo/index'
import login from '../views/demo/login'
import register from '../views/demo/register'
import home from '../views/demo/home'
import bbs_share from '../views/demo/bbs_share'
import schoolmate from '../views/demo/schoolmate'
import schoolmate_info from '../views/demo/schoolmate_info'
import user from '../views/demo/user'
import achievement from '../views/demo/achievement'
import bbs from '../views/demo/bbs'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path:'/',
      name:'',
      redirect:'/index'
    },
    {
      path:'/index',
      name:'index',
      component:index
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/home',
      name:'home',
      component:home,
      children:[
        {
          path:'/home',
          name:'bbs',
          redirect:'/home/bbs'
        },
        {
          path:'bbs',
          name:'bbs',
          component:bbs
        },
        {
          path:'bbs_share',
          name:'bbs_share',
          component:bbs_share
        },
        {
          path:'schoolmate',
          name:'schoolmate',
          component:schoolmate
        },
        {
          path:'schoolmate_info',
          name:'schoolmate_info',
          component:schoolmate_info
        },
        {
          path:'achievement',
          name:'achievement',
          component:achievement
        },
        {
          path:'user',
          name:'user',
          component:user
        }
      ]
    }
  ],
  linkActiveClass:'van-tabbar-item--active'
})
