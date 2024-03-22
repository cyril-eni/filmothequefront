import './assets/main.css'

import { createApp } from 'vue'
// on référence notre layout App.vue
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
