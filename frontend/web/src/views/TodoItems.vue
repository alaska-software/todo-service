<template>
    <Panel header="My Todo Items">
        <template #icons>
            <Button icon="pi pi-plus" label="New" class="mr-2" v-tooltip.top="'Add new todo item'"
                    @click="openNewDialog"/>
            <Button icon="pi pi-file-excel" v-tooltip.top="'Export to CSV'" outlined @click="exportCSV"/>
        </template>
        <Message severity="error" class="w-full mt-0" v-if="errorMessage" :closable="true" @close="errorMessage = ''">
            {{ errorMessage }}
        </Message>
        <DataTable :value="todoItems" dataKey="id"
                   class="p-datatable-sm" ref="todoItemsRef"
                   sort-field="id" :sort-order="-1" removable-sort
                   scrollable scroll-height="fixed"
                   :export-filename="'todo-items-' + new Date().toISOString()"
                   :loading="loading"
                   paginator :rows="10" :rowsPerPageOptions="[5, 10, 25, 50]"
                   filterDisplay="row" v-model:filters="filters">
            <template #empty>
                <span>{{ UI_MESSAGES.NO_TODO_ITEMS }}</span>
            </template>
            <template #loading>
                {{ UI_MESSAGES.LOADING_TODO_ITEMS }}
            </template>
            <Column field="id" header="ID" sortable>
                <template #body="{data}">
                    <span :class="{'line-through': isDone(data)}">{{ data.id }}</span>
                </template>
            </Column>
            <Column field="state" header="State"
                    sortable sort-field="state"
                    filter-field="state" :show-filter-menu="false">
                <template #body="{data}">
                    <span :class="{'line-through': isDone(data)}">
                        <StatusTag :dictionary="stateDictionary" :value="data.state" :options="states" rounded />
                    </span>
                </template>
                <template #filter="{filterModel, filterCallback}">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="states"
                            :show-clear="true" option-value="id"
                            placeholder="Any" class="min-w-48">
                        <template #option="slotProps">
                            <StatusTag :dictionary="stateDictionary" :value="slotProps.option.id" :options="states" rounded />
                        </template>
                        <template #value="slotProps">
                            <span v-if="slotProps.value != null">{{ states.find(s => s.id === slotProps.value)?.name }}</span>
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                    </Select>
                </template>
            </Column>
            <Column field="created" header="Created" sortable>
                <template #body="{data}">
                    <span :class="{'line-through': isDone(data)}">{{ data.created.toLocaleString() }}</span>
                </template>
            </Column>
            <Column field="text" header="Description" sortable :show-filter-menu="false" class="w-[30%]">
                <template #body="{data}">
                    <span :class="{'line-through': isDone(data)}">{{ data.text }}</span>
                </template>
                <template #filter="{filterModel, filterCallback}">
                    <InputText type="text" v-model="filterModel.value" @input="filterCallback()"
                               placeholder="Search by description" class="w-full" />
                </template>
            </Column>
            <Column field="priority" header="Priority" sortable sort-field="priority"
                    filter-field="priority" :show-filter-menu="false">
                <template #body="{data}">
                    <span :class="{'line-through': isDone(data)}">
                        <StatusTag :dictionary="priorityDictionary" :value="data.priority" :options="priorities" />
                    </span>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="priorities"
                            option-value="id" :show-clear="true"
                            placeholder="Any" class="min-w-40">
                        <template #option="slotProps">
                            <StatusTag :dictionary="priorityDictionary" :value="slotProps.option.id" :options="priorities" />
                        </template>
                        <template #value="slotProps">
                            <span v-if="slotProps.value != null">{{ priorities.find(p => p.id === slotProps.value)?.name }}</span>
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                    </Select>
                </template>
            </Column>
            <Column field="changed" header="Changed" sortable>
                <template #body="{data}">
                    <span v-if="data.changed"
                          :class="{'line-through': isDone(data)}">{{ new Date(data.changed).toLocaleString() }}</span>
                </template>
            </Column>
            <Column>
                <template #body="{data}">
                    <div class="flex justify-end">
                        <Button icon="pi pi-pencil" text rounded v-tooltip.top="'Edit #' + data.id"
                                @click="openEditDialog(data)"/>
                        <Button icon="pi pi-trash" severity="danger" text rounded v-tooltip.top="'Delete'"
                                @click="deleteTodoItem(data)"/>
                    </div>
                </template>
            </Column>
        </DataTable>
    </Panel>

    <TodoItemDialog v-model:visible="itemDialogVisible" :item="editingItem"
                    :states="states" :priorities="priorities" @save="saveItem"/>

    <ConfirmDeleteDialog v-model:visible="deleteDialogVisible" :item="itemToDelete"
                         @confirm="confirmDelete" @cancel="deleteDialogVisible = false"/>

    <Toast/>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import TodoItemDialog from '@/components/TodoItemDialog.vue';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import StatusTag from '@/components/StatusTag.vue';
import * as dataService from '@/services/dataService';
import * as stateDictionary from '@/dictionaries/states.js';
import * as priorityDictionary from '@/dictionaries/priorities.js';
import {FilterMatchMode} from '@primevue/core/api';
import {useToastNotifications} from '@/composables/useToastNotifications.js';
import {UI_MESSAGES} from '@/constants/messages.js';

const todoItems = ref([]);
const loading = ref(false);

const isDone = (data) => data.state === 'DO';

const errorMessage = ref();

const itemDialogVisible = ref(false);
const editingItem = ref({id: null, text: '', state: null, priority: null});

const deleteDialogVisible = ref(false);
const itemToDelete = ref(null);

//Dictionaries
const states = ref([]);
const priorities = ref([]);

const filters = ref({
    'state': {value: null, matchMode: FilterMatchMode.EQUALS},
    'text': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'priority': {value: null, matchMode: FilterMatchMode.EQUALS}
});

const todoItemsRef = ref();

const openNewDialog = () => {
    editingItem.value = {id: 0, text: '', state: null, priority: null};
    itemDialogVisible.value = true;
};

const openEditDialog = (data) => {
    editingItem.value = {...data};
    itemDialogVisible.value = true;
};

const {showError, showSuccess, showInfo} = useToastNotifications();

const updateItem = async () => {
    editingItem.value.changed = new Date();
    const { result, error } = await dataService.updateTodoItem(editingItem.value);
    if (error) {
        showError(error);
    } else {
        const index = todoItems.value.findIndex(x => x.id === editingItem.value.id);
        todoItems.value[index] = adaptTodoItemToView(result);
        showInfo(UI_MESSAGES.TOAST_SUMMARY_SAVED, result.text);
        itemDialogVisible.value = false;
    }
};

const createItem = async () => {
    const { result, error } = await dataService.createTodoItem({
        ...editingItem.value,
        id: 0,
        created: new Date(),
        changed: null
    });
    if (error) {
        showError(error);
    } else {
        todoItems.value.push(adaptTodoItemToView(result));
        showSuccess(UI_MESSAGES.TOAST_SUMMARY_CREATED, result.text);
        itemDialogVisible.value = false;
    }
};

const saveItem = async () => {
    if (editingItem.value.id > 0) {
        await updateItem();
    } else {
        await createItem();
    }
};

/**
 * Loads todo items over DataService, fills out dictionaries
 */
const loadTodoItems = async () => {
    loading.value = true;
    const { result, error } = await dataService.getTodoItems();
    errorMessage.value = error || "";
    if (result) {
        todoItems.value = result.data.map(adaptTodoItemToView);
        states.value = result.dictionaries.states;
        priorities.value = result.dictionaries.priorities;
    }
    loading.value = false;
};


/**
 * Opens the delete confirmation dialog for a todo item
 * @param data
 */
const deleteTodoItem = (data) => {
    itemToDelete.value = data;
    deleteDialogVisible.value = true;
}

/**
 * Executes the actual deletion after confirmation
 */
const confirmDelete = async () => {
    const { error } = await dataService.deleteTodoItemById(itemToDelete.value.id);
    if (error) {
        showError(error);
    } else {
        todoItems.value = todoItems.value.filter(x => x.id !== itemToDelete.value.id);
        showSuccess(UI_MESSAGES.TOAST_SUMMARY_DELETED, itemToDelete.value.text);
    }
    deleteDialogVisible.value = false;
    itemToDelete.value = null;
}

/**
 * Converts date-time data to a Date object in a todo item
 */
const adaptTodoItemToView = (item) => ({
    ...item,
    created: new Date(item.created),
    changed: item.changed ? new Date(item.changed) : null
});

/**
 * Exports todo items to CSV
 */
const exportCSV = () => {
    const todoItemsPlain = todoItems.value.map(item => ({
        ...item,
        state: states.value.find(s => s.id === item.state)?.name || item.state,
        priority: priorities.value.find(p => p.id === item.priority)?.name || item.priority,
        created: item.created.toISOString(),
        changed: item.changed ? item.changed.toISOString() : null
    }));
    todoItemsRef.value.exportCSV([], todoItemsPlain);
};

onMounted(async () => {
    await loadTodoItems();
});
</script>
