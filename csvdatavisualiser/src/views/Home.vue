<template>
<div>
  <!-- Hero Section -->
    <section id="hero">
      <!-- Flex Container -->
      <div
        class="container flex flex-col items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row"
      >
        <!-- Left item -->
        <div class="flex flex-col mb-11 space-y-12 md:w-1/2">
          <h1
            class="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left"
          >
            Develop a nice data chart from your csv data
          </h1>
          <p class="max-w-sm text-center text-darkGrayishBlue md:text-left">
            Chartify makes it simple to create data chart from data in your csv files
            and it provides a wide range of charts to choose from.
          </p>
          <div class="flex flex-col md:flex-row items-center">
          <router-link :to="{name: 'Charts'}"
            class=" p-3 px-6 pt-3 rounded-full shadow-2xl button"
            >Get Started</router-link
          >
        </div>
        </div>
        <div class="md:w-1/2">
          <img src="../assets/image.png" alt="" class="rounded-20px mb-14 md:mb-0 md:-mt-12"/>
        </div>
      </div>
          </section>

          <section id="cta">
      <!-- Flex Container -->
      <div
        class="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0"
      >
        <!-- Heading -->
        <h2
          class="text-5xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-xl md:text-left"
        >
          Simplify your work today
        </h2>
        <!-- Button -->
        <!-- <div>
          <router-link :to="{name: 'Charts'}"
            class="p-4 px-6 pt-3 rounded-full shadow-2xl baseline button"
            >Get Started</router-link
          >
        </div> -->
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-veryDarkBlue">
      <!-- Flex Container -->
      <div
        class="container flex flex-col-reverse justify-between px-6 py-2 mx-auto space-y-8"
      >
        <!-- Logo and social links container -->
        <div
          class="flex flex-col-reverse items-center justify-between space-y-12"
        >
          <div class="mx-auto my-6 text-center text-white">
            Copyright &copy; 2022, All Rights Reserved
          </div>
  
        <!-- List Container -->
        <div class="flex justify-around">
          <div class="flex text-white">
            <router-link class="mr-4" :to="{name: 'Home'}">HOME</router-link>
            <router-link class="link" :to="{name: 'Charts'}">CHARTS</router-link>
           </div>
        </div>
        </div>

        <!-- Input Container -->
        <!-- <div class="flex flex-col justify-between">
          <div class="hidden text-white md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div> -->
      </div>
    </footer>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#cta{
  background: rgb(84, 3, 116);
}
.button{
  background: rgb(84, 3, 116);
  border-radius: 20px;
}
/* @media screen and (max-width: 320px){
  .button{
    margin-left: 70px;
  }
}
@media screen and (max-width: 375px){
  .button{
    margin-left: 100px;
  }
} */
</style>