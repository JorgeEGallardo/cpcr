<template>
  <v-container>
    <v-card class="color center">
      <v-card-title
        class="text primary center color"
        color="white"
      >
        Lineas
      </v-card-title>
      <div class="my-6">
        <line-chart
          :data="[[datosLinea[0].title, datosLinea[0].value]]"
          download="GraficoLineas"
        />
      </div>
    </v-card>
  </v-container>
</template>
<script>
  import { db } from '@/main'

  export default {
    data () {
      return {
        datosLinea: [],
      // data: [
      //   {
      //     name: 'Workout',
      //     data: {
      //       20170101: 3,
      //       '2017-01-02': 3,
      //       '2017-01-03': 1,
      //       '2017-01-04': 4,
      //       '2017-01-05': 3,
      //       '2017-01-06': 2,
      //       '2017-01-07': 3,
      //     },
      //   },
      //   {
      //     name: 'Call parents',
      //     data: {
      //       '2017-01-01': 5,
      //       '2017-01-02': 3,
      //       '2017-01-03': 2,
      //       '2017-01-04': 0,
      //       '2017-01-05': 0,
      //       '2017-01-06': 1,
      //       '2017-01-07': 1,
      //     },
      //   },
      // ],
      // data: {
      //   labels: ['A', 'B', 'C'],
      //   series: [
      //     [0, 6, 0],
      //     [4, 0, 6],
      //     [12, 6, 12],
      //     [6, 12, 6],
      //   ],
      // },
      // options: {
      //   showPoint: false,
      //   fullWidth: true,
      //   lineSmooth: false,
      //   chartPadding: {
      //     right: 40,
      //   },
      //   axisX: {
      //     showGrid: false,
      //   },
      // },
      }
    },
    created () {
      db.collection('charts')
        .where('cat', '==', 'Bar')
        .get()
        .then(snap => {
          snap.forEach(doc => {
            this.datosLinea.push(doc.data())
          // console.table(this.datosLinea)
          // console.log(this.datosLinea[0].title)
          // console.log(this.datosLinea[0].value)
          })
        })
    },
  }
</script>

<style scoped>
.color {
  color: white;
}
</style>
