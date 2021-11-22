import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/registro',
      name: 'Register',
      component: () => import('@/views/dashboard/pages/Register'),
      meta: {
        requiresAuth: true,
      },
  },
  {
    path: '/inicio',
    name: 'Sesion',
    component: () => import('@/views/dashboard/pages/Login'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/out',
    name: 'Out',
    component: () => import('@/views/dashboard/component/Out'),
  },
  { path: '/404', component: () => import('@/views/dashboard/pages/404') },
  { path: '*', redirect: '/404' },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          requiresAuth: true,
        },
        {
          name: 'Consulta de listas bloqueadas',
          path: '/pages/bloqueadas',
          component: () => import('@/views/dashboard/pages/Blockeds/Request'),
          requiresAuth: true,
        },
        {
          name: 'Solicitud a sistemas',
          path: '/SolicitudTI',
          component: () => import('@/views/dashboard/pages/IT/Request'),
          requiresAuth: true,
        },
        {
          name: 'Mis solicitudes',
          path: '/Seguimiento',
          component: () => import('@/views/dashboard/pages/IT/Tracking'),
          requiresAuth: true,
        },
        {
          name: 'Solicitar la busqueda de un socio',
          path: '/solicitud',
          component: () => import('@/views/dashboard/pages/AddBlocked/CapRequest'),
          requiresAuth: true,
        },
        {
          name: 'Agregar una nueva persona bloqueada',
          path: '/pages/personas',
          component: () => import('@/views/dashboard/pages/AddBlocked/Personas'),
          requiresAuth: true,
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      // Console.log('awa')
      next()
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      // Console.log('ewe')
      next()
    } else {
      // Console.log('ewe123')
      next()
    }
  } else {
    // Console.log('ewe345')
    next()
  }
})

export default router
