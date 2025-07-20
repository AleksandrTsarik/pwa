import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../pages/index.vue')
  },
  {
    path: '/sign-in',
    component: () => import('../pages/auth/siugn-in.vue')
  },
  {
    path: '/log-in',
    component: () => import('../pages/auth/log-in.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 