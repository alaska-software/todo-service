<template>
    <q-layout view="hHh Lpr lff">
        <q-header elevated>
            <q-toolbar class="bg-blue-10">
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />
                <q-toolbar-title>
                    {{ $route.meta.title }}
                </q-toolbar-title>
                MyTodoEditor
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            overlay
            class="bg-blue-9">
            <main-menu/>
        </q-drawer>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script setup>
/**
 * Main layout
 * Consists of a header, that has a button opening a drawer with the main menu, and a slot for a wrapped page.
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */
import {ref} from 'vue'
import MainMenu from 'src/components/MainMenu.vue';

const leftDrawerOpen = ref(false);
</script>
