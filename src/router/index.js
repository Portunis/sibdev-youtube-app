import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/index'
import Main from "@/views/main";
import Favorite from "@/views/favorite";
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'Index',
    component: Index
  },
  {
    path: '/search',
    name: 'Main',
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite,
    meta: {
      requiresAuth: true
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('access_token') == null) {
      next({
        path: '/auth',
        params: {nextUrl: to.fullPath}
      })
    }else {
      next()
    }
  }else {
    next()
  }
})

export default router
