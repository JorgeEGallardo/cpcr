<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          Actualizar grafico
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Pushear mas informacion
        </div>
      </template>
      <v-card
        class="mb-4"
        outlined
      >
        <v-card-title
          class="text-h3 primary justify-center color"
        >
          Añadir a globales
        </v-card-title>
        <cpcr-general />
      </v-card>
      <v-card class="mb-4">
        <v-card-title
          class="text-h3 primary justify-center color"
        >
          Añadir a Quad
        </v-card-title>
        <cpcr-quad />
      </v-card>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'

  import CpcrGeneral from './updateChartGeneral.vue'
  import CpcrQuad from './updateQuadChart.vue'

  export default {
    components: { CpcrGeneral, CpcrQuad },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
  }
</script>
<style scoped>
  .color{
    color: white;
  }
</style>
