<script setup>
</script>
<template>
    <Panel header="About" class="w-full">
        <p>
            <strong>MyTodoEditor</strong> is a sample enterprise web app demonstrating CRUD operations
            against a REST backend (<a class="font-bold" href="https://github.com/alaska-software/todo-service/blob/main/backend/readme.md" target="_blank">TodoService</a>).
        </p>
        <ul class="list-disc pl-6">
            <li>Sortable, filterable, and paginated data table with CSV export</li>
            <li>Create, edit, and delete todo items with form validation</li>
            <li>User-friendly error handling via toast notifications</li>
        </ul>
        <p>
            Built with Vue 3 and PrimeVue. Communicates with the
            <a class="font-bold" href="https://github.com/alaska-software/todo-service/blob/main/backend/readme.md" target="_blank">TodoService</a>
            backend (Xbase++ / Alaska Software MSA framework).
        </p>
        <p class="mt-3"><strong>Note: </strong>Please make sure that the backend (TodoService) is running and you can access it, before you start this app.</p>
    </Panel>
</template>
