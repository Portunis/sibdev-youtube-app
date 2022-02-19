import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/index'
import searchPage from "@/views/searchPage";
import Favorite from "@/views/favorite";
const routes = [

  {
    path: '/auth',
    name: 'Index',
    component: Index
  },
  {
    path: '/',
    name: 'searchPage',
    component: searchPage,
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
