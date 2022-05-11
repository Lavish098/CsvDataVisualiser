import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/input.css"
import VuePapaParse from 'vue-papa-parse'
// import VueHtmlToPaper from './VueHtmlToPaper'


createApp(App).use(router).use(VuePapaParse).mount('#app')
