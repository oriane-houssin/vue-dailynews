import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormulaireFluxView from "@/views/FormulaireFluxView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register-flux',
      name: 'register-flux',
      component: FormulaireFluxView,
    },
  ],
})

export default router
