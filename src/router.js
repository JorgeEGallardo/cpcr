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
          path: '/ofc/bloqueadas',
          component: () => import('@/views/dashboard/pages/Blockeds/Request'),
          requiresAuth: true,
        },
        {
          name: 'Solicitud a sistemas',
          path: '/SolicitudSistemas',
          component: () => import('@/views/dashboard/pages/IT/Request'),
          requiresAuth: true,
        },
        {
          name: 'Solicitudes a sistemas',
          path: '/SolicitudesIT',
          component: () => import('@/views/dashboard/pages/IT/Requests'),
          requiresAuth: true,
        },
        {
          name: 'Permisos',
          path: '/AdminPermisos',
          component: () => import('@/views/dashboard/pages/root/Index'),
          requiresAuth: true,
        },
        {
          name: 'Mis solicitudes',
          path: '/Seguimiento',
          component: () => import('@/views/dashboard/pages/IT/Tracking'),
          requiresAuth: true,
        },
        {
          name: 'Calendario',
          path: '/Calendario',
          component: () => import('@/views/dashboard/pages/Schedule/Index'),
          requiresAuth: true,
        },
        {
          name: 'Agenda',
          path: '/agenda',
          component: () => import('@/views/dashboard/pages/Schedule/IndexOwn'),
          requiresAuth: true,
        },
        {
          name: 'Solicitar la busqueda de un socio',
          path: '/solicitud',
          component: () =>
            import('@/views/dashboard/pages/AddBlocked/CapRequest'),
          requiresAuth: true,
        },
        {
          name: 'Agregar una nueva persona bloqueada',
          path: '/bloqueadas',
          component: () =>
            import('@/views/dashboard/pages/AddBlocked/Personas'),
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
        {
          name: 'Regulatorios',
          path: '/MonthList',
          component: () =>
            import('@/views/dashboard/pages/MonthList/MonthTable'),
        },
        {
          name: 'Reproductor de videos',
          path: '/VideoPlayer',
          component: () =>
            import('@/views/dashboard/pages/Video/ListPlayer/BodyVideoPlayer'),
        },
        {
          name: 'Añadir Video',
          path: '/VideoImport',
          component: () =>
            import('@/views/dashboard/pages/Video/Import/Import.vue'),
        },
        {
          name: 'Gestor de archivos',
          path: '/fileRepository',
          component: () =>
            import('@/views/dashboard/pages/File/fileRepository/File.vue'),
        },
        {
          name: 'añadir enlace',
          path: '/fileImport',
          component: () =>
            import('@/views/dashboard/pages/File/fileImport/fileImport.vue'),
        },
        {
          name: 'CHART-TEST',
          path: '/TestChart',
          component: () =>
            import('@/views/dashboard/pages/Charts/bodyChart.vue'),
        },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      // //console.log('awa')
      next()
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      // //console.log('ewe')
      next()
    } else {
      // //console.log('ewe123')
      next()
    }
  } else {
    // //console.log('ewe345')
    next()
  }
})

export default router
