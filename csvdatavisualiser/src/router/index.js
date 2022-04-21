import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BarChart from '../views/BarChart.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
   
  },
  {
    path: '/',
    name: 'BarChart',
    component: BarChart,
   
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
