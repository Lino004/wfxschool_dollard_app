import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/error-page'
  },
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/ChildHome/Home.vue')
      },
      {
        path: '/offres',
        name: 'Offres',
        component: () => import('../views/ChildHome/Offres.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/ResetPassword.vue')
  },
  {
    path: '/reset-password/:pass/:id',
    name: 'ResetPasswordConfirme',
    component: () => import('../views/ResetPassword.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/register/:id',
    name: 'RegisterConfirme',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/vente-dollar',
    name: 'VenteDollar',
    component: () => import('../views/VenteDollar.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/back-office',
    component: () => import('../views/BackOffice.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Resume',
        component: () => import('../views/ChildBackOffice/Resume.vue')
      },
      {
        path: 'liste-filleules',
        name: 'Filleules',
        component: () => import('../views/ChildBackOffice/Filleules.vue')
      },
      {
        path: 'liste-achats',
        name: 'Achats',
        component: () => import('../views/ChildBackOffice/Achats.vue')
      },
      {
        path: 'parametre',
        name: 'Setting',
        component: () => import('../views/ChildBackOffice/Setting.vue')
      }
    ]
  },
  {
    path: '/error-page',
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isconnect) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
