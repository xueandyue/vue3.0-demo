import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
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
    path: '/jie',
    name: 'test',
    meta: {
      title: '查找打卡接龙缺的人'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "test" */ '../views/Jielong.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
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
