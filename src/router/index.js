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
  },
  {
    path: '/password',
    component: () => import('../pages/auth/password.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const publicPaths = ['/log-in', '/recovery', '/password'];
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // Разрешаем доступ к публичным страницам для неавторизованных
  if (!auth.token && !publicPaths.includes(to.path)) {
    return next('/log-in');
  }

  // Если авторизован и пытается попасть на логин или recovery — редирект на главную
  if (auth.token && (to.path === '/log-in' || to.path === '/recovery')) {
    return next('/');
  }

  next();
});

export default router 