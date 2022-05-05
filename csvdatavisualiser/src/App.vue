<template>
<div id="app" class="bg-void text-stark">
  <Navigation/>
  <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  min-height: 100vh;
  /* background-image: url("./assets/3959346.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center; */
}
</style>
