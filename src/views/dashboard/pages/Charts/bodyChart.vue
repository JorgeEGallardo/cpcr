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
      <v-row
        v-show="loaded"
        no-gutters
      >
        <v-col
          cols="12"
          md="6"
        >
          <cpcr-areachart :datos="arrayT[0]" />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <cpcr-areachart :datos="arrayT[1]" />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <cpcr-linechart :datos="arrayT[2]" />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <cpcr-barchart :datos="arrayT[2]" />
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '@/main'

  import CpcrBarchart from './ChartType/barChart.vue'
  import CpcrLinechart from './ChartType/lineChart.vue'
  import CpcrAreachart from './ChartType/areaChart.vue'

  export default {
    components: { CpcrBarchart, CpcrLinechart, CpcrAreachart },
    data () {
      return {
        arrayT: [],
        loaded: false,
        arraySlice: [],
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
                const ordered = Object.keys(arrayData[0].data)
                  .sort()
                  .reduce((obj, key) => {
                    obj[key] = arrayData[0].data[key]
                    return obj
                  }, {})
                this.arraySlice = ordered
                const sliced = Object.fromEntries(
                  Object.entries(this.arraySlice).slice(-20),
                )
                arrayData[0].data = sliced
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
                // console.log(arrayData)
                var ordered = []
                for (let i = 0; i < arrayData.length; i++) {
                  ordered = Object.keys(arrayData[i].data)
                    .sort()
                    .reduce((obj, key) => {
                      obj[key] = arrayData[i].data[key]
                      return obj
                    }, {})
                  this.arraySlice = ordered
                  const sliced = Object.fromEntries(
                    Object.entries(this.arraySlice).slice(-20),
                  )
                  arrayData[i].data = sliced
                }
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
