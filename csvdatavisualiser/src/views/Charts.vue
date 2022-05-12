<template>
<div class="home pt-5">
 <div class="flex flex-wrap mt-5">
       <router-link class="chart" :to="{name: 'BarChart'}">
         <img src="../assets/newBarChart.jpg" alt="Bar Chart">
        </router-link>
  <router-link class="chart" :to="{name: 'ScatterChart'}">
             <img src="../assets/newScatterChart.jpg" alt="Scatter Chart">
  </router-link>
  <router-link class="chart" :to="{name: 'PieChart'}">
             <img src="../assets/newPieChart.jpg" alt="Pie Chart">
  </router-link>
  <!-- <router-link class="chart" :to="{name: 'LineChart'}">
             <img src="" alt="Line Chart">
  </router-link> -->
  <router-link class="chart" :to="{name: 'DonutChart'}">
             <img src="../assets/newDonutChart.jpg" alt="Donut Chart">
  </router-link>
  
  </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};

</script>

<style scoped>
.chart{
  position: relative;
    cursor: pointer;
    border-radius: 8px;
    min-height: 220px;
    margin: 30px 40px;
    /* padding-bottom: 40px; */
    transition: .5s ease all;
    width: 90%;
    @apply md:w-5/12 md:mx-6 lg:mx-3 lg:ml-16 lg:w-64
}
@media screen and (min-width:1440px) {
  .chart{
    margin-left: 30px;
    width: 20%;
  }
}
.chart:hover{
  transform: rotateZ(-1deg) scale(1.01);
}
.chart img{
    display: block;
    border-radius: 8px;
    z-index: 1;
    width: 100%;
    min-height: 100px;
    object-fit: cover;
}
h1{
  font-size: 50px;
  padding: 10px 0;
}
</style>