import {createRouter, createWebHistory} from 'vue-router'
import TodoItems from '../views/TodoItems.vue'
import Layout from "@/layout/Layout.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '/',
                    name: 'todo-items',
                    meta: {
                        breadcrumb: ['Todo Items']
                    },
                    component: () => import('@/views/TodoItems.vue')
                },
                {
                    path: '/about',
                    name: 'about',
                    meta: {
                        breadcrumb: ['About']
                    },
                    component: () => import('@/views/About.vue')
                },
                {
                    path: '/:pathMatch(.*)*',
                    name: 'not-found',
                    meta: {
                        breadcrumb: ['Not Found']
                    },
                    component: () => import('@/views/Error.vue'),
                    props: {
                        title: 'Page Not Found',
                        message: 'The page you are looking for does not exist.'
                    }
                }
            ]
        },
    ]
})

export default router
