// 此文件专门负责项目的路由

import VueRouter from "vue-router"

// 引入组件
import Login from '../views/login/Login'
import Register from '../views/register/Register'
import Home from '../views/home/Home'
import Change from '../views/change/Change'
import { Message } from "element-ui"

// 创建并暴露一个路由器
const router = new VueRouter({
    mode: 'hash',    // 路由模式，该模式不会在地址中显示井号#
    routes: [
        {
            path: '/',          // 路径
            redirect: '/home'  // 重定向
        },
        {
            path: '/login',     // 路径
            component: Login    // 跳转到的组件
        },
        {
            path: '/register',  //路径
            component: Register //跳转到的组件
        },
        {
            path: '/home',     // 路径
            component: Home    // 跳转到的组件
        },
        {
            path: '/change',
            component: Change
        }
    ]
})

router.beforeEach((to, from, next) => {
    //let isAuthenticated = !!sessionStorage.getItem('userInfo')
    if (to.path !== '/home' && to.path !== '/register' && to.path!== '/change') {
        next({ path: '/home' })
        Message({
            message: '非法界面！',
            type: "warning",
        });
    } else next()
})

export default router;