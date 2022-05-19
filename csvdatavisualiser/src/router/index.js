import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BarChart from '../views/BarChart.vue'
import GroupedBarChart from '../views/GroupedBarChart.vue'
import ScatterChart from '../views/ScatterChart.vue'
import PieChart from '../views/PieChart.vue'
import LineChart from '../views/LineChart.vue'
import DonutChart from '../views/DonutChart.vue'
import MultipleLineChart from '../views/MultipleLineChart.vue'
import Charts from '../views/Charts.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title: 'Home',
    }
  },
  {
    path: '/barchart',
    name: 'BarChart',
    component: BarChart,
    meta:{
      title: 'Bar Chart',
    }
  },
  {
    path: '/groupedbarchart',
    name: 'GroupedBarChart',
    component: GroupedBarChart,
    meta:{
      title: 'Grouped Bar Chart',
    }
  },
  {
    path: '/scatterchart',
    name: 'ScatterChart',
    component: ScatterChart,
    meta:{
      title: 'Scatter Chart',
    }
  },
  {
    path: '/piechart',
    name: 'PieChart',
    component: PieChart,
    meta:{
      title: 'Pie Chart',
    }
  },
  {
    path: '/donutchart',
    name: 'DonutChart',
    component: DonutChart,
    meta:{
      title: 'Donut Chart',
    }
  },
  {
    path: '/linechart',
    name: 'LineChart',
    component: LineChart,
    meta:{
      title: 'Line Chart',
    }
  },
  {
    path: '/multiplelinechart',
    name: 'MultipleLineChart',
    component: MultipleLineChart,
    meta:{
      title: 'MultipleLineChart',
    }
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
