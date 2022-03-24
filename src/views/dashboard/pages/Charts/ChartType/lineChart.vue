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
        <column-chart
          :data="datos"
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
        // ? prueba a intentar llenar el objeto con un ciclo usando datosLinea[i].value y datosLinea[i].nombre
        //* no entiendo como usar la informacion que traigo de la base de datos
        datos: [
          { name: 'Usage', data: /* this.datosLinea[0].value */ { Tula: 1 } },
        ],
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
            console.table(this.datosLinea)
            console.table(this.datosLinea[0].text)
            console.table(this.datosLinea[0].value)
          })
        })
    },
  }
// vue.runtime.esm.js?2b0e:619 [Vue warn]: Error in data(): "TypeError: Cannot read properties of undefined (reading '0')"
// Vue warn]: Property or method "datos" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.
// lineChart.vue?b502:81 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'push')
// CombinedVueInstance<Vue, {
//     datosLinea: any[];
//     datos: {
//         name: string;
//         data: {
//             Tula: number;
//         };
//     }[];
// }, unknown, unknown, Readonly<Record<never, any>>>
</script>

<style scoped>
.color {
  color: white;
}
</style>
