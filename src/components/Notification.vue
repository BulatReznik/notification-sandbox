<template>
    <div v-if="message" class="notification">
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { setupFirebaseMessaging } from '../firebase'

export default defineComponent({
    setup() {
        const message = ref<string | null>(null)

        // Настроим обработку сообщений Firebase
        onMounted(() => {
            // Убедимся, что передаем функцию как коллбек
            setupFirebaseMessaging((payload) => {
                message.value = payload.notification?.body || 'Новое уведомление'
            })
        })

        return {
            message
        }
    }
})
</script>

<style scoped>
.notification {
    padding: 15px;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
}
</style>