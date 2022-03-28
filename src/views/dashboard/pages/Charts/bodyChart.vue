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
      <cpcr-linechart :datos="arrayT[0]" />
      <cpcr-linechart :datos="arrayT[1]" />
      <v-btn @click="test()">
        test
      </v-btn>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '@/main'

  import CpcrPiechart from './ChartType/pieChart.vue'
  import CpcrBarchart from './ChartType/barChart.vue'
  import CpcrLinechart from './ChartType/lineChart.vue'

  export default {
    components: { CpcrPiechart, CpcrBarchart, CpcrLinechart },
    data () {
      return {
        arrayT: [],
        estima: [],
        carteraVencida: [],
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created () {
      this.refTable(0, 'estimacion')
      this.refTable(1, 'carteraVencida')
    },
    methods: {
      test () {
        console.table(this.arrayT)
      },
      async refTable (arrayIndex, categoria) {
        try {
          await db
          db.collection('charts')
            .where('cat', '==', categoria)
            .get()
            .then(snap => {
              const arrayData = []
              snap.forEach(doc => {
                arrayData.push(doc.data())
              })
              this.arrayT[arrayIndex] = arrayData
              console.table(this.arrayT[arrayIndex])
            })
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
