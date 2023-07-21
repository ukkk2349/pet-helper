import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage';
import About from '@/views/About';
import LogIn from '@/views/account/Login';
import SignUp from '@/views/account/SignUp';
import SettingList from '@/views/setting/SettingList';
import PetSetting from '@/views/setting/PetSetting';
import PetForm from '@/views/setting/PetForm';
import AppointmentSetting from '@/views/setting/AppointmentSetting';

import PetDetail from '@/views/shop/PetDetail';
import ProductDetail from '@/views/shop/ProductDetail';

import ProductSetting from '@/views/setting/ProductSetting';
import ProductForm from '@/views/setting/ProductForm';

import PetList from '@/views/shop/PetList';
import ProductList from '@/views/shop/ProductList';

// đặt hàng
import Cart from '@/views/order/Cart';

// lịch hẹn
import AppointmentForm from '@/views/appointment/AppointmentForm';

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/about',
        component: About,
        metat: {
            title: "Giới thiệu"
        }
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
    },
    {
        path: '/product/detail',   
        component: ProductDetail,
        meta: {
            title: 'Chi tiết sản phẩm'
        }
    },
    {
        path: '/setting/product',   
        component: ProductSetting,
        meta: {
            title: 'Thiết lập sản phẩm'
        }
    },
    {
        path: '/setting/product/add',   
        component: ProductForm,
        meta: {
            title: 'Thiết lập thú cưng'
        }
    },
    {
        path: '/setting/appointment-manager',   
        component: AppointmentSetting,
        meta: {
            title: 'Đăng ký nhận nuôi'
        }
    },
    {
        path: '/pet',   
        component: PetList,
        meta: {
            title: 'Thú cưng'
        }
    },
    {
        path: '/product',   
        component: ProductList,
        meta: {
            title: 'Sản phẩm'
        }
    },
    {
        path: '/appointment',
        component: AppointmentForm,
        meta: {
            title: 'Đăng ký đặt lịch hẹn nhận nuôi'
        }
    },
    {
        path: '/cart',
        component: Cart,
        meta: {
            title: 'Giỏ hàng'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
    document.title = to.meta?.title ? to.meta?.title + ' | MiniPaw' : 'MiniPaw'
})
  

export default router

