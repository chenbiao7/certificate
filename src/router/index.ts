import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('@/components/Home.vue')
    },
    {
      path: '/aws/das',
      name: 'das',
      component: ()=> import('@/components/AWS/DAS/index.vue')
    },
    {
      path: '/aws/das/browse',
      name: 'das_browse',
      component: ()=> import('@/components/AWS/BrowseBoard.vue')
    },
    {
      path: '/aws/das/answer',
      name: 'das_answer',
      component: ()=> import('@/components/AWS/AnswerBoard.vue')
    }
    
  ]
})

export default router
