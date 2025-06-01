import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'leaflet/dist/leaflet.css'   // Needed for the map later

createApp(App)
  .use(router)
  .use(Toast)
  .mount('#app')
