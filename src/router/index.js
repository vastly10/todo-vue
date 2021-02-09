import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {path: "/", redirect: "/hello"},
    {path: "/hello", component: () => import('../components/HelloWorld')},
    {path: "/main/:name", component: () => import('../components/Main')},
    {path: "*", component: () => import("../components/NotFound")}
];

export default new VueRouter({
    mode: 'history',
    routes
});
