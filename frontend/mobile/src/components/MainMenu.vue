<template>
    <q-list separator class="bg-blue-9">
        <q-item v-for="item in items"
                class="text-white"
                :disable="selectedItemName === item.name"
                :to="{name: item.name}" @click="setSelectedItemName(item.name)"
                :key="item.name">
            <q-item-section avatar>
                <q-icon color="white" :name="item.meta.icon"/>
            </q-item-section>
            <q-item-section>
                <q-item-label>{{ item.meta.title }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

const items = ref([]);
const selectedItemName = ref();

const setSelectedItemName = (name) => {
    selectedItemName.value = name;
}

onMounted(() => {
    items.value = router.options.routes.find(x => x.path === '/').children;
    selectedItemName.value = router.currentRoute.value.name;
})

</script>
