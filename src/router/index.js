import Vue from 'vue'
import Router from 'vue-router'
import Ping from '@/components/Ping'
import Home from '@/components/Home'  //从components文件夹下的Home文件导入Home组件
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import store from '../store'
import EditProfile from '@/components/EditProfile'



Vue.use(Router)

  const router = new Router({
    routes: [
      {
        path: '/',    //根目录
        name: 'Home',
        component: Home
      },
      {
        path: '/login', //登录页
        name: 'Login',
        component: Login
      },
      {
        path: '/register',  //注册页
        name: 'Register',
        component: Register
      },
      {
        path: '/user/:id', //个人主页
        name: 'Profile',
        component: Profile,
        meta: {
          requiresAuth: true
        }
      },
      {
      // 用户修改自己的个人信息
      path: '/edit-profile',
      name: 'EditProfile',
      component: EditProfile,
      meta: {
        requiresAuth: true
      }
      },

      {
        path: '/ping',
        name: 'Ping',
        component: Ping
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    const token = window.localStorage.getItem('blog-token')
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null))
    {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    else if (token && to.name == 'Login') {
        // 用户已登录，但又去访问登录页面时不让他过去
        next({
          path: from.fullPath
        })
    }
    else if (to.matched.length === 0) {  // 要前往的路由不存在时
        console.log('here')
        console.log(to.matched)
        Vue.toasted.error('404: NOT FOUND', { icon: 'fingerprint' })
        if (from.name) {
          next({
            name: from.name
          })
        }
        else {
          next({
            path: '/'
          })
        }
      }
    else {
      next()
    }
  })


  export default router
