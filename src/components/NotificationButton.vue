<template>
    <div class="notification-container">
        <button @click="subscribeToNotifications">🔔 Подписаться на уведомления</button>
    </div>
</template>

<script setup lang="ts">
import { getFirebaseToken } from '../services/pushNotificationService'
import { subscribeToPushNotifications } from '../api/subscribe'

// Пропсы
const props = defineProps<{
    isSubscribed: boolean
    updateSubscriptionStatus: (status: boolean) => void
}>()

// Логика подписки
const subscribeToNotifications = async () => {
    const token = await getFirebaseToken()
    if (token) {
        try {
            await subscribeToPushNotifications(token)
            // Обновляем родительский компонент через пропс
            props.updateSubscriptionStatus(true)
            console.log('✅ Подписка на уведомления успешна, токен:', token)
        } catch (error) {
            console.error('❌ Ошибка при подписке на уведомления:', error)
        }
    } else {
        console.error('❌ Не удалось получить токен для уведомлений.')
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