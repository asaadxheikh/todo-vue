import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)
const app = createApp(App)
 
const options = {
  // You can set your default options here
};

app.use(Toast, options);
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
