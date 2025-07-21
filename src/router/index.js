import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/',
    component: () => import('../pages/index.vue')
  },
  {
    path: '/log-in',
    component: () => import('../pages/auth/log-in.vue')
  },
  {
    path: '/recovery',
    component: () => import('../pages/auth/recovery.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // Если неавторизован
  if (!auth.token && to.path !== '/log-in' && to.path !== '/recovery') {
    return next('/log-in');
  }

  // Если авторизован
  if (auth.token && (to.path === '/log-in' || to.path === '/recovery')) {
    return next('/');
  }

  next();
});

export default router 