// Composables
import {createRouter, createWebHistory} from 'vue-router'
import TasksOverviewPage from "@/pages/TasksOverviewPage.vue";
import {HOME_VIEW} from "@/constants/appConstants";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '',
        name: HOME_VIEW,
        component: TasksOverviewPage,
        props: true
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
