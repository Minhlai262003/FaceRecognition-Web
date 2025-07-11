import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import Ecommerce from '../views/Ecommerce.vue'
import UserManagementView from '../views/UserManagementView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/ecommerce',
      name: 'ecommerce',
      component: Ecommerce,
    },
    {
      path: '/user-management',
      name: 'user-management',
      component: UserManagementView,
    },
  ],
})

export default router
