<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <!-- Header -->
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          <v-icon>mdi-chart-donut-variant</v-icon> Gráficos
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Vista grafíca
        </div>
      </template>
      <cpcr-piechart
        :chart-title="titulo"
        :chart-data="pieDatos"
        :chart-options="options"
      />
      <cpcr-barchart
        :chart-title="titulo"
        :chart-data="datos"
        :chart-options="options"
      />
      <cpcr-linechart
        :chart-title="titulo"
        :chart-data="datos"
        :chart-options="options"
      />
    </base-material-card>
  </v-container>
</template>

<script>
  import CpcrPiechart from './ChartType/pieChart.vue'
  import CpcrBarchart from './ChartType/barChart.vue'
  import CpcrLinechart from './ChartType/lineChart.vue'
  import { mapState } from 'vuex'
  export default {
    components: { CpcrPiechart, CpcrBarchart, CpcrLinechart },
    data () {
      return {
        titulo: 'pie',
        datos: {
          labels: ['A', 'B', 'C'],
          series: [25, 25, 50],
        },
        options: {
          chartpadding: 30,
          labelOffset: 50,
          labelDirectuion: 'explode',
        },
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
  }
</script>
<style scoped>
.color {
  color: white;
}
</style>
