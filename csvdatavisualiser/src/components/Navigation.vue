<template>
  <div>
       <!-- Navbar -->
    <nav class="relative container mx-auto p-6">
      <!-- Flex container -->
      <div class="flex items-center mt-4 justify-between">
        <!-- Logo -->
        <div class="pt-2">
          <router-link class="header" :to="{name: 'Home'}">
                  <h2 id="sav" class="text-stark">C.D.V</h2> 
                  </router-link>  
        </div>
        <!-- Menu Items -->
        <div class="hidden space-x-6 md:flex" v-show="!mobile">
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
          <ul class="mobile-nav"  v-show="mobileNav">
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

/* nav {
    background: rgb(0, 0, 0);
    display: flex;
    padding: 25px 0;
    position: absolute;
    overflow: hidden;
    z-index: 99;
    box-shadow: 0 0 10px 0 rgb(158, 158, 158);
    @apply w-full lg:w-9/12 lg:rounded-20px lg:top-8 lg:left-28 
}
.link{
    font-weight: bold;
    font-size: 30px;
    transition: .3s color ease;
    text-decoration: none;
    margin-left: 20px;
}

nav .branding{
    display: flex;
    
}
.header{
    margin-left: 20px;
    font-weight: bold;
    text-decoration: none;
}
.sav{
    width: 50px;
}

#sav{
    font-size: 35px;
    margin-top: 5px;
    margin-left: 20px;
}
.nav-link{
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
    
}*/

.mobile-nav{
    z-index: 99;
    padding: 20px;
    width: 70%;
    text-transform: uppercase;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 20%;
    background-color: #080808;
    top: 80px;
    right: 0;
}
.mobile-nav .link{
    padding: 15px 0;
    color: #fff;
}
.mobile-nav-enter-active{
    transition: all 1s ease;
}
.mobile-nav-leave-active{
    transition: all 1s ease;
} 
.mobile-nav-enter{
    transform: translateX(350px);
}
.mobile-nav-leave{
    transform: translateX(0);
}
.mobile-nav-enter-to{
    transform: translateX(0);
}
.mobile-nav-leave-to{
    transform: translateX(350px);
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
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
}
  .bar{
      width: 28px;
      height: 4px;
      margin-bottom: 8px;
      color: white;
      background: whitesmoke;
    transition: all ease-in-out 0.5s;
  } 
</style>