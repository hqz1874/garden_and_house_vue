// // 引入路由
import { createRouter, createWebHashHistory } from "vue-router";
// // 路由配置
let routes = [
    {path: '/' , component: () => import('../view/home.vue')},
    {path: '/huayuan' , component: () => import('../view/huayuan.vue')},
    {path: '/UserBag' , component: () => import('../view/UserBag.vue')},
    {path: '/panel' , component: () => import('../view/Panel.vue')},
    {path: '/Collection' , component: () => import('../view/Collection.vue')},
    // {
    //     path: "/dashboard", component: () => import("../views/dashboard/Dashboard.vue"), children: [
    //         { path: "/dashboard/category", component: () => import("../views/dashboard/Category.vue") },
    //         { path: "/dashboard/article", component: () => import("../views/dashboard/Article.vue") },
    //     ]
    // },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router, routes };