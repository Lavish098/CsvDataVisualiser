<template>
<div class="home pt-20">
 <div class="flex flex-wrap mt-5">
       <router-link class="chart" :to="{name: 'BarChart'}">
         <img src="../assets/barchart.png" alt="">
         <h1>Bars chart</h1> </router-link>
  <router-link class="chart" :to="{name: 'ScatterChart'}">
             <img src="../assets/scatterplot.png" alt="">
    <h1>Scatter chart</h1></router-link>
  <router-link class="chart" :to="{name: 'PieChart'}">
             <img src="../assets/piechart.jpg" alt="">
    <h1>Pie chart</h1></router-link>
  
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
    background-color: #1eb8b8;
    min-height: 220px;
    margin: 10px 20px;
    /* padding-bottom: 40px; */
    transition: .5s ease all;
    width: 100%;
    @apply md:w-5/12
}
.chart img{
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 100px;
    object-fit: cover;
}
h1{
  font-size: 50px;
  padding: 10px 0;
}
.header{
    @apply w-1/5 h-full right-0
}
.datainput{
    @apply py-52
}
.datainput input{
    @apply w-11/12 h-8 rounded-30px
}
.datainput button{
    @apply mt-4 w-1/3 rounded-20px h-8 
}
</style>