<template>
    <Panel header="Error" class="w-full">
        <div class="flex flex-col items-center gap-4 py-8 text-center">
            <i class="pi pi-exclamation-circle text-red-500 text-6xl" />
            <h2 class="text-2xl font-bold">{{ title }}</h2>
            <p class="text-muted-color">{{ message }}</p>
            <Button label="Go to Home" icon="pi pi-home" @click="router.push('/')" />
        </div>
    </Panel>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    title: {
        type: String,
        default: 'Something went wrong'
    },
    message: {
        type: String,
        default: 'An unexpected error occurred. Please try again.'
    }
})
</script>
