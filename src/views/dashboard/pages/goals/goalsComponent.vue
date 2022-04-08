<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <v-card outlined>
      <v-card-title class="text-h4 primary justify-center white">
        {{ info.titulo }}
      </v-card-title>
    </v-card>
    <v-container>
      <v-col
        cols="2"
        sm="6"
        md="4"
      >
        <v-card-text>cap</v-card-text>
        <v-card-text>{{ info.captacion }}</v-card-text>
      </v-col>
      <v-col
        cols="2"
        sm="6"
        md="4"
      >
        <v-card-text>cob</v-card-text>
        <v-card-text>{{ info.cobranza }}</v-card-text>
      </v-col>
      <v-col
        cols="3"
        sm="6"
        md="4"
      >
        <v-card-text>llamadas</v-card-text>
        <v-card-text>{{ info.llamadas }}</v-card-text>
      </v-col>
      <v-col
        cols="2"
        sm="6"
        md="4"
      >
        <v-card-text>recuperacion</v-card-text>
        <v-card-text>{{ info.recuperacion }}</v-card-text>
      </v-col>
    </v-container>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  // import { db } from '@/main'
  export default {
    props: {
      info: {
        type: Array,
        default: null,
      },
    },
    data () {
      return {}
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
  }
</script>
<style scoped>
.white {
  color: white;
}
</style>
