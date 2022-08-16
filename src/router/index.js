import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '../components/UserList.vue'
import UserDatail from '../components/UserDetail.vue'
import Music from '../components/music.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/users' },
        { path: '/users', component: UserList },
        { path: '/users/:id', component: UserDatail, props: true },
        { path: '/music', component: Music },
    ],
})
export default router