/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})

router.beforeEach(async (to, from) => {
  let isAuthenticated = false
  if (localStorage.getItem('isLogin') || to.name=='/register') isAuthenticated=true
  if (
    // 检查用户是否已登录
    !isAuthenticated &&
    // ❗️ 避免无限重定向
    to.name !== '/login'
  ) {
    console.log('aaa')
    // 将用户重定向到登录页面
    return { name: '/login' }
  }
})

export default router
