<script setup>
import {useRoute} from "vue-router";

const route = useRoute();
const emit = defineEmits(['close']);

const items = [
    {label: 'Todo Items', icon: 'pi pi-list', route: '/'},
    {label: 'About', icon: 'pi pi-info-circle', route: '/about'},
];
</script>

<template>
    <Menu :model="items" class="w-full border-0 shadow-none">
        <template #item="{item, props}">
            <router-link v-slot="{href, navigate}" :to="item.route" custom>
                <a :href="href" v-bind="props.action"
                   :class="route.path === item.route ? 'font-bold' : ''"
                   @click="navigate(); emit('close')">
                    <span :class="item.icon"/>
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </router-link>
        </template>
    </Menu>
</template>

