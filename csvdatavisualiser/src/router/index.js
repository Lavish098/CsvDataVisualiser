import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BarChart from '../views/BarChart.vue'
import ScatterChart from '../views/ScatterChart.vue'
import PieChart from '../views/PieChart.vue'
import LineChart from '../views/LineChart.vue'
import DonutChart from '../views/DonutChart.vue'
import Charts from '../views/Charts.vue'


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
  {
    path: '/linechart',
    name: 'LineChart',
    component: LineChart,
   
  },
  {
    path: '/donutchart',
    name: 'DonutChart',
    component: DonutChart,
   
  },
 
  {
    path: '/charts',
    name: 'Charts',
    component: Charts,
   
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
