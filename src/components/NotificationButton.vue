<template>
    <div class="notification-container">
        <button @click="subscribeToNotifications">🔔 Подписаться на уведомления</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { subscribeToPushNotifications } from '../api/subscribe'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Конфигурация Firebase
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDexofb-Kh-l-PTYnbHOcLKsXnCsEoWcV8",
    authDomain: "push-sandbox-8f4c0.firebaseapp.com",
    projectId: "push-sandbox-8f4c0",
    storageBucket: "push-sandbox-8f4c0.firebasestorage.app",
    messagingSenderId: "827152435346",
    appId: "1:827152435346:web:67c68775016e2f55a0fe4b"
});

const messaging = getMessaging(firebaseApp)

// Слушаем входящие сообщения, когда приложение активно
onMessage(messaging, (payload) => {
    console.log('FCM: Получено сообщение:', payload)
    // Здесь можно добавить обработку полученного сообщения
})

export default defineComponent({
    setup() {
        const isSubscribed = ref(false) // Флаг подписки
        let token: string | null = null

        const subscribeToNotifications = async () => {
            token = await getFirebaseToken()
            if (token) {
                try {
                    await subscribeToPushNotifications(token)
                    isSubscribed.value = true
                    console.log('✅ Подписка на уведомления успешна, токен:', token)
                } catch (error) {
                    console.error('❌ Ошибка при подписке на уведомления:', error)
                }
            } else {
                console.error('❌ Не удалось получить токен для уведомлений.')
            }
        }

        return {
            subscribeToNotifications
        }
    }
})

// Получение токена Firebase
export const getFirebaseToken = async (): Promise<string | null> => {
    try {

        // Получаем FCM токен без использования сервис-воркера
        const token = await getToken(messaging, {
            vapidKey: 'BKhQ61MgnYwdpKf9XhL_nm6IS87N71f525d4yXNYltV10cil6v5O2lzfIdr4InYUC_q1KOIYpjM5wmXngVHxrB4'
        })

        if (token) {
            console.log('firebase.ts Firebase token:', token)
            return token
        } else {
            console.error('Не удалось получить токен')
            return null
        }
    } catch (error) {
        console.error('Ошибка при получении Firebase токена:', error)
        return null
    }
}
</script>

<style scoped>
.notification-container {
    margin-top: 20px;
}

.notification-container button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 10px;
}
</style>
