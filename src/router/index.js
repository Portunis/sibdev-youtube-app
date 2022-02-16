import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/index'
import Main from "@/views/main";
import Favorite from "@/views/favorite";
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/auth',
    name: 'Index',
    component: Index
  },
  {
    path: '/search',
    name: 'Main',
    component: Main
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
