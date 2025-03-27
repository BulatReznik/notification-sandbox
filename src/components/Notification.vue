<template>
    <div class="notification">
        <p v-if="isSubscribed">Вы подписаны на уведомления!</p>
        <p v-else>Вы не подписаны на уведомления.</p>
        <p v-if="message">Новое уведомление: {{ message }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { listenForMessages } from '../services/pushNotificationService'

export default defineComponent({
    setup() {
        const isSubscribed = ref(false)  // Флаг подписки
        const message = ref<string | null>(null)

        // Подключаем слушатель для входящих сообщений
        listenForMessages((payload) => {
            message.value = payload.notification?.title || 'Новое сообщение'
        })

        return {
            isSubscribed,
            message
        }
    }
})
</script>

<style scoped>
.notification {
    padding: 15px;
    background-color: #f0f0f0;
    border-radius: 5px;
}
</style>
