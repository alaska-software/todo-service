<script setup>
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import Menu from "@/layout/Menu.vue";

const drawerVisible = ref(false);
const route = useRoute();

const breadcrumbItems = computed(() =>
    (route.meta.breadcrumb || []).map(label => ({label}))
);
const breadcrumbHome = {icon: 'pi pi-home', url: '/'};
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <div class="flex items-center gap-3 px-4 py-2 bg-primary text-white shadow-md">
            <Button icon="pi pi-bars" text plain class="text-white" @click="drawerVisible = !drawerVisible"/>
            <span class="text-lg font-semibold">My Todo Editor</span>
        </div>
        <Drawer v-model:visible="drawerVisible" position="left" :showCloseIcon="false">
            <Menu @close="drawerVisible = false"/>
        </Drawer>
        <div class="flex-1 p-4 bg-gray-100">
            <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="border-none bg-transparent"/>
            <RouterView/>
        </div>
        <!-- TODO: Update footer links -->
        <div class="flex items-center justify-between px-4 py-2 bg-primary text-white text-sm">
            <span>Copyright &copy;2023-{{ new Date().getFullYear() }} Alaska Software</span>
            <div class="flex gap-4">
                <a href="https://doc.alaska-software.com" target="_blank">Xbase++ Documentation</a>
                <a href="https://ilx.alaska-software.com" target="_blank">ILX Articles/Forums</a>
                <a href="https://www.youtube.com/channel/UCJV2NCN0Mj-uhE-6WZKsuJA" target="_blank">All-About-Code</a>
                <a href="https://portal.alaska-software.com/" target="_blank">ASI-Portal</a>
                <a href="https://www.alaska-software.com/company/imprint.cxp" target="_blank">Imprint</a>
            </div>
        </div>
    </div>
</template>
