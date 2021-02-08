import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
    {path: "/hello", component: () => import('@/components/HelloWorld')},
    {path: "/main/:name", component: () => import('@/components/Main')}
];
const router = new VueRouter({
    routes
})

export default router;