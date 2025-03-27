// main.ts

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

console.log('Main Loaded')  // Проверка, что main.ts загружается

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Регистрация сервис-воркера как модуля
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js', { type: 'module' })
      .then((registration) => {
          console.log('Service Worker зарегистрирован:', registration);
      })
      .catch((error) => {
          console.error('Ошибка при регистрации Service Worker:', error);
      });
}