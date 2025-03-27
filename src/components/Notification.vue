<template>
    <div class="notification">
        <p style="color: green;" v-if="props.isSubscribed">Вы подписаны на уведомления!</p>
        <p style="color: red;" v-if="!props.isSubscribed">Вы не подписаны на уведомления.</p>
        <p v-if="message">Новое уведомление: {{ message }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { listenForMessages } from '../services/pushNotificationService'

// Пропс для подписки
const props = defineProps<{
    isSubscribed: boolean
}>()

const message = ref<string | null>(null)

// Подключаем слушатель для входящих сообщений
listenForMessages((payload) => {
    message.value = payload.notification?.title || 'Новое сообщение'
})
</script>

<style scoped>
.notification {
    padding: 15px;
    background-color: #f0f0f0;
    border-radius: 5px;
}
</style>