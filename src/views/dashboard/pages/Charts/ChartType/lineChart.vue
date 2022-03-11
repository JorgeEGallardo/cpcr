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
          :data="data"
          download="GraficoLineas"
        />
      </div>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    //   props: {
    //     chartTitle: { type: String, default: 'DEFAULT' },
    //     chartData: {
    //       type: String,
    //       default: `labels: ['Estos', 'Son', 'Datos', 'Default'],
    //   series: [25, 25, 55, 25]`,
    //     },
    //     chartOptions: {
    //       type: String,
    //       default: `chartpadding: 30, labelOffset: 50,
    // labelDirectuion: 'explode`,
    //     },
    //   },
    data () {
      return {
        data: [
          {
            name: 'Workout',
            data: {
              '2017-01-01 00:00:00 -0800': 3,
              '2017-01-02 00:00:00 -0800': 3,
              '2017-01-03 00:00:00 -0800': 1,
              '2017-01-04 00:00:00 -0800': 4,
              '2017-01-05 00:00:00 -0800': 3,
              '2017-01-06 00:00:00 -0800': 2,
              '2017-01-07 00:00:00 -0800': 3,
            },
          },
          {
            name: 'Call parents',
            data: {
              '2017-01-01 00:00:00 -0800': 5,
              '2017-01-02 00:00:00 -0800': 3,
              '2017-01-03 00:00:00 -0800': 2,
              '2017-01-04 00:00:00 -0800': 0,
              '2017-01-05 00:00:00 -0800': 0,
              '2017-01-06 00:00:00 -0800': 1,
              '2017-01-07 00:00:00 -0800': 1,
            },
          },
        ],
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
  }
</script>

<style scoped>
.color {
  color: white;
}
</style>
