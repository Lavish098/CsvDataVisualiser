import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BarChart from '../views/BarChart.vue'
import ScatterChart from '../views/ScatterChart.vue'
import PieChart from '../views/PieChart.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
   
  },
  {
    path: '/barchart',
    name: 'BarChart',
    component: BarChart,
   
  },
  {
    path: '/scatterchart',
    name: 'ScatterChart',
    component: ScatterChart,
   
  },
  {
    path: '/piechart',
    name: 'PieChart',
    component: PieChart,
   
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
