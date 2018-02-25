import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import login from '@/components/login/login'
import addBook from '@/components/addBook/addBook'
import panel from '@/components/panel/panel'
import offers from '@/components/offers/offers'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: login
        },
        {
            path: '/panel/addBook',
            name: 'addBook',
            component: addBook
        },
        {
            path: '/panel',
            name: 'panel',
            component: panel
        },
        {
            path: '/panel/offers',
            name: 'offers',
            component: offers
        }
    ]
})
