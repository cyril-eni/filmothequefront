import { createRouter, createWebHistory } from 'vue-router'

/**
 * C'est dans ce fichier que je fais la correspondance entre mes urls
 * Et mes composants VueJS
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Accueil.vue')
    },
    {
      path: '/films',
      component: () => import('@/views/ListerFilms.vue')
    },
    {
      path: '/genres',
      component: () => import('@/views/Genres.vue')
    },
    {
      path: '/participants',
      component: () => import('@/views/Participants.vue')
    }
  ]
})

export default router
