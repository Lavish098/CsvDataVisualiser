<template>
<div class="home">
  <h1>CSV DATA VISUALISER</h1>
  <router-link :to="{name: 'BarChart'}">bar chart</router-link>
  <div>
      
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
.home{
    @apply flex
}
.header{
    @apply w-1/5 h-full bg-#2c3e50 right-0
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