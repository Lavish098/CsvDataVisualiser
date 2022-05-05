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
            CDV makes it simple to create data chart from data in your csv files
            and it provides a wide range of charts to choose from.
          </p>
          <!-- <div class="flex justify-center md:justify-start">
            <a
              href="#"
              class="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              >Get Started</a
            >
          </div> -->
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
          <a
            href="#"
            class="p-3 px-6 pt-2 text-brightRed bg-white rounded-full shadow-2xl baseline hover:bg-gray-900"
            >Get Started</a
          >
        </div> -->
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-veryDarkBlue">
      <!-- Flex Container -->
      <div
        class="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0"
      >
        <!-- Logo and social links container -->
        <div
          class="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start"
        >
          <div class="mx-auto my-6 text-center text-white md:hidden">
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
        <div class="flex flex-col justify-between">
          <div class="hidden text-white md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
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
</style>