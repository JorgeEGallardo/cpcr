<template>
  <v-container>
    <v-card class="color center">
      <v-card-title
        class="text primary center color"
        color="white"
      >
        {{ titulo }}
      </v-card-title>
      <div class="my-6">
        <chartist
          ratio=""
          type="Bar"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    props: {
      chartTitle: { type: String, default: 'DEFAULT' },
      chartData: {
        type: String,
        default: `labels: ['Estos', 'Son', 'Datos', 'Default'],
      series: [25, 25, 55, 25]`,
      },
      chartOptions: {
        type: String,
        default: `chartpadding: 30, labelOffset: 50,
    labelDirectuion: 'explode`,
      },
    },
    data () {
      return {
      // chartData: {
      //   labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      //   series: [
      //     [1, 2, 3, 4, 5, 6, 7, 8, 9],
      //     [9, 8, 7, 6, 5, 4, 3, 2, 1],
      //     [5, 4, 3, 2, 1, 9, 8, 7, 6],
      //     [5, 6, 7, 8, 9, 1, 2, 3, 4],
      //   ],
      // },
      // chartOptions: {
      //   high: 10,
      //   fullWidth: true,
      //   axisY: {
      //     onlyInteger: true,
      //     offset: 20,
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
.ct-series-a .ct-bar {
  stroke: lightblue;
  stroke-width: 20px;
  stroke-dasharray: 20px;
  stroke-linecap: round;
}
</style>
