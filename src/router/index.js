import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from "@/views/Auth";
import Home from "@/views/Home";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Auth,
        name: 'Auth'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
