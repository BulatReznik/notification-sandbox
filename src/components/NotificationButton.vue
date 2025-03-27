<template>
    <div class="notification-container">
        <button @click="subscribeToNotifications">🔔 Подписаться на уведомления</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getFirebaseToken } from '../services/pushNotificationService'
import { subscribeToPushNotifications } from '../api/subscribe'

export default defineComponent({
    props: {
        isSubscribed: {
            type: Boolean,
            default: false
        },
        updateSubscriptionStatus: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const subscribeToNotifications = async () => {
            const token = await getFirebaseToken()
            if (token) {
                try {
                    await subscribeToPushNotifications(token)
                    // Обновляем родительский компонент через событие
                    props.updateSubscriptionStatus(true)
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
