<template>
  <v-app v-if="user.loggedIn">
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </v-app>
  <v-app v-else>
    <not-found />
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import firebase from 'firebase'
  const authListener = firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      // not logged in

      this.$router.replace({ name: 'Sesion' })
    } else {

    }
  })
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('./components/core/View'),
      NotFound: () => import('./pages/Loading'),
    },
    data: () => ({
      expandOnHover: false,
      useru: '',
    }),
    computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        user: 'user',
      }),
    },
    updated () {
      this.useru = this.$store.getters.user.loggedIn
    },
    created () {
      authListener()
    },
    mounted () {
      authListener()
    },
    methods: {
      sout () {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({
              name: 'Sesion',
            })
          })
      },
    },
  }
</script>
