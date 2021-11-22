<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      align-with-title
      dark
    >
      <v-tabs-slider color="yellow" />

      <v-tab
        v-for="item in items"
        :key="item.txt + 1"
      >
        {{ item.txt }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.txt"
      >
        <component :is="item.component" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import bloqueadas from './Bloqueadas'
  import OfRequest from './OfRequest'
  import masive from './Masive'
  export default {
    data () {
      return {
        tab: null,
        items: [
          { txt: 'Solicitud', component: OfRequest }, { txt: 'Consultas', component: bloqueadas }, { txt: 'Masivo', component: masive },
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>

<style>

</style>
