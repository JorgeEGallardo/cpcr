<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card
      v-if="loaded"
      color="primary"
    >
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
      <cpcr-areachart :datos="arrayT[0]" />
      <cpcr-areachart :datos="arrayT[1]" />
      <cpcr-linechart :datos="arrayT[2]" />
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '@/main'

  import CpcrPiechart from './ChartType/pieChart.vue'
  import CpcrBarchart from './ChartType/barChart.vue'
  import CpcrLinechart from './ChartType/lineChart.vue'
  import CpcrAreachart from './ChartType/areaChart.vue'

  export default {
    components: { CpcrPiechart, CpcrBarchart, CpcrLinechart, CpcrAreachart },
    data () {
      return {
        arrayT: [],
        loaded: false,
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created () {
      this.refTable(0, 'estimacion')
      this.refTable(1, 'carteraVencida')
      this.refTable(2, 'scatterVencida')
      this.loaded = true
    },
    methods: {
      async refTable (arrayIndex, categoria) {
        try {
          await db
          if (categoria !== 'scatterVencida') {
            db.collection('charts')
              .where('cat', '==', categoria)
              .get()
              .then(snap => {
                const arrayData = []
                snap.forEach(doc => {
                  arrayData.push(doc.data())
                })
                this.$set(this.arrayT, arrayIndex, arrayData)
              })
          } else {
            db.collection('ChartSucursales')
              .get()
              .then(snap => {
                const arrayData = []
                snap.forEach(doc => {
                  arrayData.push(doc.data())
                })
                this.$set(this.arrayT, arrayIndex, arrayData)
              })
          }
        } catch (error) {
          alert('Hubó un error')
        }
      },
    },
  }
</script>
<style scoped>
.color {
  color: white;
}
</style>
