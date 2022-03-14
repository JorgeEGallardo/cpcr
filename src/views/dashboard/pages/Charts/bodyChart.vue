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
      <cpcr-piechart />
      <cpcr-barchart />
      <cpcr-linechart :data-line="realDatosLinea" />
    </base-material-card>
  </v-container>
</template>

<script>
  import { db } from '@/main'
  import CpcrPiechart from './ChartType/pieChart.vue'
  import CpcrBarchart from './ChartType/barChart.vue'
  import CpcrLinechart from './ChartType/lineChart.vue'
  import { mapState } from 'vuex'
  export default {
    components: { CpcrPiechart, CpcrBarchart, CpcrLinechart },
    data () {
      return {
        realDatosLinea: [
          { name: 'Si', data: this.datosLinea[0].value },
        ],
        datosLinea: [],
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created () {
      db.collection('charts')
        .where('cat', '==', 'Bar')
        .get()
        .then(doc => {
          this.datosLinea.push(doc.data())
          alert(this.datosLinea[0].title)
        })
    },
  }
</script>
<style scoped>
.color {
  color: white;
}
</style>
