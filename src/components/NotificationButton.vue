<template>
    <div class="notification-container">
        <button @click="subscribeToNotifications">🔔 Подписаться на уведомления</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getFirebaseToken } from '../firebase'
import { subscribeToPushNotifications } from '../api/subscribe'

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
