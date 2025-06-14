import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { isAuthenticated } from '@/utils/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 需要登录的路由
    const isAuth = await isAuthenticated()
    if (!isAuth) {
      // 未登录或 token 无效，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 保存原本要去的路径
      })
    } else {
      next()  // 已登录且 token 有效，允许访问
    }
  } else {
    next()  // 不需要登录的路由，直接访问
  }
})

// 判断是否有token
function checkToken(){
  return !!localStorage.token
}

function setTitle(title){
  document.title = title;
}

// 不需要登录的页面
const whileList = ['login'];

router.beforeEach((to,from, next)=>{
  if(whileList.includes(to.name)){
    setTitle(to.meta.title)
    next();
    return;
  }else{
    const hasToken = checkToken();
    console.log(hasToken)
    if(hasToken){
      setTitle(to.meta.title)
       next()
       return;
    }else{
      setTitle('登录')
      // 没有token的话，跳转登录
      next({
        name: 'login',
        replace: true
      })
      return;
    }
  }
  
})

export default router
