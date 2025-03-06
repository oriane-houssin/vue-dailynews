import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormulaireFluxView from "@/views/FormulaireFluxView.vue";
import FluxListView from "@/views/FluxListView.vue";

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
    {
      path: '/flux-list',
      name: 'flux-list',
      component: FluxListView,
    },
  ],
})

export default router
