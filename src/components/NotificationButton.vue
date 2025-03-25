<template>
    <div class="notification-container">
        <button @click="subscribeToNotifications">🔔 Подписаться на уведомления</button>

        <div v-if="isSubscribed">
            <input v-model="notificationMessage" type="text" placeholder="Введите сообщение..." />
            <button @click="sendNotification">🚀 Отправить</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getFirebaseToken } from '../firebase'
import { sendPushNotification } from '../api/notification'

export default defineComponent({
    setup() {
        const isSubscribed = ref(false) // Флаг подписки
        const notificationMessage = ref('') // Сообщение для отправки
        let token: string | null = null

        const subscribeToNotifications = async () => {
            token = await getFirebaseToken()
            if (token) {
                isSubscribed.value = true
                console.log('✅ Получен токен:', token)
            } else {
                console.error('❌ Не удалось получить токен для уведомлений.')
            }
        }

        const sendNotification = async () => {
            if (!token) {
                console.error('🚨 Нет токена, сначала подпишитесь на уведомления!')
                return
            }

            try {
                const title = 'Новое уведомление'
                const body = notificationMessage.value || 'Нет текста'
                await sendPushNotification(token, title, body)
                console.log('📩 Уведомление отправлено:', body)
            } catch (error) {
                console.error('❌ Ошибка при отправке уведомления:', error)
            }
        }

        return {
            isSubscribed,
            notificationMessage,
            subscribeToNotifications,
            sendNotification
        }
    }
})
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

.notification-container input {
    padding: 10px;
    font-size: 16px;
    width: 300px;
    margin-right: 10px;
}
</style>