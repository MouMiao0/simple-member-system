import HelloWorld from '../components/HelloWorld.vue'
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path :'/hello_world',
        name :'hello_world',
        component: HelloWorld
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})