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
      <cpcr-piechart :data-line="datosLinea" />
      <cpcr-barchart />
      <cpcr-linechart />
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
        datosLinea: [
          {
            name: 'Workout',
            data: {
              20170101: 3,
              '2017-01-02': 3,
              '2017-01-03': 1,
              '2017-01-04': 4,
              '2017-01-05': 3,
              '2017-01-06': 2,
              '2017-01-07': 3,
            },
          },
          {
            name: 'Call parents',
            data: {
              '2017-01-01': 5,
              '2017-01-02': 3,
              '2017-01-03': 2,
              '2017-01-04': 0,
              '2017-01-05': 0,
              '2017-01-06': 1,
              '2017-01-07': 1,
            },
          },
        ],
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
