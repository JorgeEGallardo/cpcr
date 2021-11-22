<template>
  <v-main>
    <router-view style="min-height:83vh; padding:2%" />
    <dashboard-core-footer />
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
