// main.ts

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { getFirebaseToken, setupFirebaseMessaging } from './firebase'

console.log('Main Loaded')  // Проверка, что main.ts загружается

const app = createApp(App)

// Инициализация Firebase
const setupFirebase = async () => {
    const token = await getFirebaseToken()
    if (token) {
      console.log('Firebase Token:', token)
    }
    setupFirebaseMessaging()
  }  

setupFirebase()
app.use(createPinia())
app.use(router)

app.mount('#app')
