<template>
    <div v-if="message" class="notification">
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const message = ref<string | null>(null)
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