import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara';
import Nora from '@primevue/themes/nora';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Menu from "primevue/menu";
import Button from "primevue/button";
import Panel from 'primevue/panel';
import Select from 'primevue/select';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Drawer from 'primevue/drawer';
import Dialog from 'primevue/dialog';
import FocusTrap from 'primevue/focustrap';
import Tooltip from 'primevue/tooltip';
import Breadcrumb from 'primevue/breadcrumb';
import SelectButton from 'primevue/selectbutton';
import Textarea from 'primevue/textarea';

import "primeicons/primeicons.css"
import '@/assets/tailwind.css';

const app = createApp(App);

app.use(router);
const customPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50:  '#e8f1fb',
            100: '#cddff7',
            200: '#a6c6ef',
            300: '#7ca9e5',
            400: '#4d89d7',
            500: '#1a508e',
            600: '#16467f',
            700: '#123b6e',
            800: '#0e2f5a',
            900: '#0a2347',
            950: '#071837'
        }
    }
});

app.use(PrimeVue, {
    theme: {
        preset: customPreset
    }
});

app.use(ToastService);

app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Tag", Tag);
app.component("Menu", Menu);
app.component("Button", Button);
app.component("Panel", Panel);
app.component("Select", Select);
app.component("Toast", Toast);
app.component("InputText", InputText);
app.component("Message", Message);
app.component("Drawer", Drawer);
app.component("Dialog", Dialog);
app.component("Textarea", Textarea);

app.component("Breadcrumb", Breadcrumb);
app.component("SelectButton", SelectButton);
app.directive('focustrap', FocusTrap);
app.directive('tooltip', Tooltip);

app.mount('#app')
