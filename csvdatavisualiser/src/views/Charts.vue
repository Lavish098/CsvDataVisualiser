<template>
<div class="home pt-5">
 <div class="flex flex-wrap mt-5">
       <router-link class="chart" :to="{name: 'BarChart'}">
         <img src="../assets/images(2).png" alt="Bar Chart">
        </router-link>
  <router-link class="chart" :to="{name: 'ScatterChart'}">
             <img src="../assets/images(3).png" alt="Scatter Chart">
  </router-link>
  <router-link class="chart"  :to="{name: 'PieChart'}">
             <img src="../assets/images(6).png" alt="Pie Chart">
  </router-link>
  <router-link class="chart" :to="{name: 'LineChart'}">
             <img src="../assets/images(4).png" alt="Line Chart">
  </router-link>
  <router-link class="chart" :to="{name: 'MultipleLineChart'}">
             <img src="../assets/images(5).png" alt="Multiple Line Chart">
  </router-link>
  <router-link class="chart" id="chart" :to="{name: 'DonutChart'}">
             <img src="../assets/images(7).png" alt="Donut Chart">
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