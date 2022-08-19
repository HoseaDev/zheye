import {createRouter, createWebHistory} from "vue-router";
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import ColumnDetail from '@/views/Column/ColumnDetail.vue'
import CreatePost from '@/views/Column/CreatePost.vue'
import store from "@/store";
import Register from '@/views/Login/Register.vue'
import axios from "axios";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {redirectAlreadyLogin: true}
    }, {
        path: '/register',
        name: 'register',
        component: Register,
    }, {
        path: '/column/:id',
        name: 'column',
        component: ColumnDetail,

    }, {
        path: '/column/create',
        name: 'CreatePost',
        component: CreatePost,
        meta: {
            requiredLogin: true
        }
    },

    ]
})

router.beforeEach((to, from, next) => {
    const {isLogin} = store.state.user
    const {token} = store.state
    const {requiredLogin, redirectAlreadyLogin} = to.meta
    if (isLogin) {
        if (redirectAlreadyLogin) {
            next('/')
        } else {
            next()
        }

    } else {
        if (token) {
            axios.defaults.headers.common['Authorization'] = token
            store.dispatch('getUserInfo').then(data => {
                if (redirectAlreadyLogin) {
                    next('/')
                } else {
                    next()
                }
            }).catch(e => {
                store.commit('logout')
                next('/login')
            })

        } else {
            if (requiredLogin) {
                next('/login')
            } else {
                next()
            }

        }


    }


    if (to.meta.requiredLogin && !store.state.user.isLogin) {
        next('/login')
    } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
        next('/')
    } else {
        next()
    }


})
export default router
