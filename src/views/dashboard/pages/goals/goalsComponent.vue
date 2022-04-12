<template>
  <v-container
    id=""
    tag="section"
  >
    <v-expansion-panels popout>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h4 primary justify-center white">
          {{ info.titulo }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="info"
          />

          <v-container>
            <v-row>
              <v-col>
                <v-row>captación</v-row>
                <v-row>cobranza</v-row>
                <v-row>llamadas</v-row>
                <v-row>recuperación</v-row>
              </v-col>
              <v-col>
                <v-row>{{ info.captacion }}</v-row>
                <v-row>{{ info.cobranza }}</v-row>
                <v-row>{{ info.llamadas }}</v-row>
                <v-row>{{ info.recuperacion }}</v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-btn @click="test">
            a
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      info: {
        type: Array,
        default: null,
      },
    },
    data () {
      return {
        expanded: [],
        singleExpand: true,
        search: '',
        metas: [],
        sucursal: '',
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created () {
      console.log(this.info)
    },
    methods: {
      test () {
        console.log(this.info)
      },
    },
  }
</script>
<style scoped>
.white {
  color: white;
}
</style>
