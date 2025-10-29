import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import horizontalWheel from './directives/horizontalWheel'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('horizontalWheel', horizontalWheel)
app.mount('#app')
