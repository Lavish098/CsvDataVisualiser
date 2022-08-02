<template>
  <div>
       <!-- Navbar -->
    <nav class="relative w-full p-4">
      <!-- Flex container -->
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="pt-2">
          <router-link class="header" :to="{name: 'Home'}">
                  <h2 id="sav" class="text-stark">CHARTIFY</h2> 
                  </router-link>  
        </div>
        <!-- Menu Items -->
        <div class="hidden text-stark space-x-6 md:flex" v-show="!mobile">
                <router-link class="link" :to="{name: 'Home'}">HOME</router-link>
                <router-link class="link" :to="{name: 'Charts'}">CHARTS</router-link>
           
         </div>
        <!-- Button -->
        <!-- <router-link
          class="hidden p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight md:block"
          >Get Started</router-link
        > -->

      <div @click="toggleMobileNav" v-show="mobile" class="menu-icon" :class="{'btn-home':mobileNav}" >
        <div class="bar" ></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <transition name="mobile-nav" >
          <ul class="mobile-nav bg-void"  v-show="mobileNav">
                      <router-link @click="toggleMobileNav" class="link" :to="{name: 'Home'}">Home</router-link>
                      <router-link @click="toggleMobileNav" class="link" :to="{name: 'Charts'}">Charts</router-link>
                      
                  </ul>
      </transition>
          </div>
      </nav>
  </div>
</template>

<script>


export default {
name: 'Navigation',
components:{
},
data(){
    return{
        mobile: null,
        mobileNav: null,
        windowWidth: null,
    };
},
created(){
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
},
methods:{
    checkScreen(){
        this.windowWidth = window.innerWidth;
        if(this.windowWidth <= 750){
            this.mobile = true;
            return;
        }
        this.mobile = false;
        this.mobileNav = false;
        return;
    },
    toggleMobileNav(){
        this.mobileNav = !this.mobileNav;
    },
},

}
</script>

<style scoped>
nav{
    background: rgb(84, 3, 116)
}
#sav{
    font-weight: bold;
    font-size: 20px;
    margin-top: 1px;
    margin-left: 2px;
}
.mobile-nav{
    background: rgb(84, 3, 116);
    z-index: 99;
    padding: 10px;
    width: 100%;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    height: 10%;
    top: 72px;
    right: 0;
    border-radius: 0 0 10px 10px;
}
.mobile-nav .link{
    font-weight: bold;
    border-radius: 10px;
    padding: 10px;
    color: rgb(84, 3, 116);
    @apply bg-stark
}
.mobile-nav .link:hover{
    transition: all 1s ease;
}
.mobile-nav .link:nth-child(1){
    margin-right: 20px;
}
.mobile-nav-enter-active{
    transition: all 1s ease;
}
.mobile-nav-leave-active{
    transition: all 1s ease;
} 
.mobile-nav-enter{
    transform: translateX(450px);
}
.mobile-nav-leave{
    transform: translateX(0);
}
.mobile-nav-enter-to{
    transform: translateX(0);
}
.mobile-nav-leave-to{
    transform: translateX(450px);
}
.btn-home .bar:nth-child(2) {
    opacity: 0;
  }
  .btn-home .bar:nth-child(1) {
    width: 2.25rem;
    height: 5px;
    transform: translateY(13px) rotate(45deg);
  }
  .btn-home .bar:nth-child(3) {
    width: 2.25rem;
    height: 5px;
    transform: translateY(-13px) rotate(-45deg);
  }
  .btn-home .bar{
    background: whitesmoke;
  }
  .menu-icon{
    cursor: pointer;
    position: absolute;
    top: 25px;
    right: 25px;
    height: 25px;
    width: auto;
}
  .bar{
      width: 28px;
      height: 4px;
      margin-bottom: 8px;
      color: white;
    transition: all ease-in-out 0.5s;
    @apply bg-stark
  } 
</style>