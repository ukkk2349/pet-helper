import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage';
import LogIn from '@/views/account/LogIn';
import SignUp from '@/views/account/SignUp';
import SettingList from '@/views/setting/SettingList';
import PetSetting from '@/views/setting/PetSetting';
import PetForm from '@/views/setting/PetForm';

import PetDetail from '@/views/shop/PetDetail';

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/sign-in',
        component: LogIn,
        meta: {
            title: 'Đăng nhập'
        }
    },
    {
        path: '/sign-up',   
        component: SignUp,
        meta: {
            title: 'Đăng ký'
        }
    },
    {
        path: '/setting',   
        component: SettingList,
        meta: {
            title: 'Thiết lập'
        }
    },
    {
        path: '/setting/pet',   
        component: PetSetting,
        meta: {
            title: 'Thiết lập thú cưng'
        }
    },
    {
        path: '/setting/pet/add',   
        component: PetForm,
        meta: {
            title: 'Thiết lập thú cưng'
        }
    },
    {
        path: '/setting/pet/update',   
        component: PetForm,
        meta: {
            title: 'Thiết lập thú cưng'
        }
    },
    {
        path: '/pet/detail',   
        component: PetDetail,
        meta: {
            title: 'Chi tiết thú cưng'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
    document.title = to.meta?.title ?? 'MiniPaw'
})
  

export default router

