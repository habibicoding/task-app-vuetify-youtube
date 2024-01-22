// Composables
import {createRouter, createWebHistory} from 'vue-router'
import TasksOverviewPage from "@/pages/TasksOverviewPage.vue";
import {HOME_VIEW, TASK_CREATE_VIEW} from "@/constants/appConstants";
import TaskCreatePage from "@/pages/TaskCreatePage.vue";

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
      {
        path: 'create-task',
        name: TASK_CREATE_VIEW,
        component: TaskCreatePage,
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
