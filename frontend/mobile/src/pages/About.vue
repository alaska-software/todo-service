<template>
    <q-page padding>
        <p class="q-my-md">
            <strong>MyTodoEditor</strong> is a sample mobile app that demonstrates CRUD operations against a REST backend (<strong><a class="font-bold" href="https://github.com/alaska-software/todo-service/blob/main/backend/readme.md" target="_blank">TodoService</a></strong>).
            The frontend is built with Quasar 2 (Vite + Vue 3) and communicates with the
            <strong><a class="font-bold" href="https://github.com/alaska-software/todo-service/blob/main/backend/readme.md" target="_blank">TodoService</a></strong> backend — a REST microservice built with the Alaska Software MSA framework for Xbase++.
        </p>

        <q-list bordered separator class="q-mb-md rounded-borders">
            <q-item-label header>Features</q-item-label>
            <q-item v-for="feature in features" :key="feature.label">
                <q-item-section avatar>
                    <q-icon :name="feature.icon" color="primary"/>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ feature.label }}</q-item-label>
                    <q-item-label caption>{{ feature.description }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>

        <q-banner rounded class="bg-grey-3">
            <template v-slot:avatar>
                <q-icon name="info" color="orange-10"/>
            </template>
            Please make sure that the backend (TodoService) is running and you can access it, before you start this app.
        </q-banner>
    </q-page>
</template>

<script setup>
/**
 * About page
 * Shows information about the app MyTodoEditor
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */

const features = [
    { icon: 'edit_note', label: 'CRUD Operations', description: 'Create, Read, Update, Delete todo items' },
    { icon: 'palette', label: 'Modern UI', description: 'Quasar components with Material Design' },
    { icon: 'check_circle', label: 'Form Validation', description: 'Input validation before saving' },
    { icon: 'error_outline', label: 'Error Handling', description: 'User-friendly error messages' },
    { icon: 'print', label: 'Print Support', description: 'Print todo items via Cordova printer plugin' },
]
</script>

