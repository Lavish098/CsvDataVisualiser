<template>
  <header>
      <nav class="container">
          <div class="branding">
              <router-link class="header" :to="{name: 'Home'}">
                  <h2 id="sav" class="text-stark">C.D.V</h2> 
                  </router-link>
              <div class="nav-links">
                  <ul>
                      <router-link class="link" :to="{name: 'Home'}">HOME</router-link>
                  </ul>
              </div>
          </div>
      </nav>
      <!-- <div @click="toggleMobileNav" v-show="mobile" class="menu-icon" :class="{'btn-home':mobileNav}" >
        <div class="bar" ></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <transition name="mobile-nav" >
          <ul class="mobile-nav"  v-show="mobileNav">
                      <router-link @click="toggleMobileNav" class="link" :to="{name: 'Home'}">Home</router-link>
                      
                  </ul>
      </transition> -->
  </header>
</template>

<script>


export default {
name: 'Navigation',
components:{
},
data(){
    return{
        // mobile: null,
        // mobileNav: null,
        // windowWidth: null,
        // profileMenu:null,
    };
},
// created(){
//     window.addEventListener('resize', this.checkScreen);
//     this.checkScreen();
// },
// methods:{
//     checkScreen(){
//         this.windowWidth = window.innerWidth;
//         if(this.windowWidth <= 750){
//             this.mobile = true;
//             return;
//         }
//         this.mobile = false;
//         this.mobileNav = false;
//         return;
//     },
//     toggleMobileNav(){
//         this.mobileNav = !this.mobileNav;
//     },
// },

}
</script>

<style scoped>
.container {
  margin: 0 auto;
}
header{
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(255, 247, 247, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.86);
    z-index: 99;
}
.link{
    font-weight: bold;
    font-size: 30px;
    transition: .3s color ease;
    text-decoration: none;
}

.link:hover{
    color: #1eb8b8;
}
nav{
    background: #1eb8b8;
    position: fixed;
    display: flex;
    padding: 15px 0;
    z-index: 99;
    margin-left: 20px;
}
nav .branding{
    display: flex;
    align-items: center;
    width:100%;
}
.header{
    display: flex;
    font-weight: 600;
    font-size: 24px;
    color: #000;
    text-decoration: none;
}
.sav{
    width: 50px;
}
@media screen and (min-width: 500px) {
    .sav{
        margin-left: 0;
    }
}
#sav{
    font-size: 30px;
    margin-top: 5px;
}
.branding .nav-links{
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    margin-right: 10px;
    
}

/* .mobile-nav{
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
}
.mobile-nav .link{
    padding: 15px 0;
    color: #fff;
}
.mobile-nav-enter-active,
.mobile-nav-leave-active{
    transition: all 1s ease;
}
.mobile-nav-enter{
    transform: translateX(-250px);
}
.mobile-nav-leave{
    transform: translateX(0);
}
.mobile-nav-enter-to{
    transform: translateX(0);
}
.mobile-nav-leave-to{
    transform: translateX(-250px);
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
    background: black;
    ;
  }
  .bar{
      width: 28px;
      height: 4px;
      margin-bottom: 8px;
      background: black;
    transition: all ease-in-out 0.5s;
  } */
</style>