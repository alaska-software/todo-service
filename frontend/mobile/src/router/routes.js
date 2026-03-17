const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('pages/Index.vue'),
                meta: {title: 'My Todo Items', icon: "checklist"}
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('pages/About.vue'),
                meta: {title: 'About', icon: "info"}
            },
        ]
    },
    {
        path: '/todo-item/:id(\\d+)',
        name: "todo-item",
        component: () => import('pages/TodoItem.vue'),
        props: (route) => ({ id: Number(route.params.id) })
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes
