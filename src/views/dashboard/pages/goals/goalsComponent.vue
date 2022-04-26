<template>
  <v-container tag="section">
    <v-expansion-panels popout>
      <v-expansion-panel>
        <v-expansion-panel-header
          color="primary"
          class="d-flex justify-Aleft text-h3 white"
        >
          {{ info.id }}
          <template v-slot:actions>
            <v-icon color="primary">
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col class="Aleft">
                Captación
              </v-col>
              <v-col class="Aright">
                {{ info.captacion }}
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col class="Aleft">
                Cobranza
              </v-col>
              <v-col class="Aright">
                {{ info.cobranza }}
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col class="Aleft">
                Llamadas
              </v-col>
              <v-col class="Aright">
                {{ info.llamadas }}
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col class="Aleft">
                Recuperación
              </v-col>
              <v-col class="Aright">
                {{ info.recuperacion }}
              </v-col>
            </v-row>
            <v-divider />
          </v-container>
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
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        expanded: [],
        singleExpand: true,
        search: '',
        sucursal: '',
      }
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
.Aleft {
  text-align: Aleft;
  font-size: 1.5em;
}
.Aright {
  text-align: right;
  font-size: 1.5em;
}
</style>
