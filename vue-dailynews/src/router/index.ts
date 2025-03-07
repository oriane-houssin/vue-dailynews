import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormulaireFluxView from "@/views/FormulaireFluxView.vue";
import FluxListView from "@/views/FluxListView.vue";
import FluxFavoritesView from "@/views/FluxFavoritesView.vue";
import FluxNewsView from "@/views/FluxNewsView.vue";
import NewsFavoritesView from "@/views/NewsFavoritesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/flux-list',
      name: 'flux-list',
      component: FluxListView,
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: FluxFavoritesView,
    },
    {
      path: '/flux/:id',
      name: 'flux',
      component: FluxNewsView,
      props: true,
    },
    {
      path: '/news-favoris',
      name: 'news-favoris',
      component: NewsFavoritesView,
    },
  ],
})

export default router
