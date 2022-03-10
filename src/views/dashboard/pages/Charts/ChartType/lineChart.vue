<template>
  <v-container>
    <v-card class="color center">
      <v-card-title
        class="text primary center color"
        color="white"
      >
        {{ Titulo }}
      </v-card-title>
      <div class="my-6">
        <chartist
          ratio=""
          type="Line"
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
      //   chartData: {
      //     labels: ['A', 'B', 'C'],
      //     series: [
      //       [0, 6, 0],
      //       [4, 0, 6],
      //       [12, 6, 12],
      //       [6, 12, 6],
      //     ],
      //   },
      //   chartOptions: {
      //     showPoint: false,
      //     fullWidth: true,
      //    // lineSmooth: false,
      //     chartPadding: {
      //       right: 40,
      //     },
      //     axisX: {
      //       showGrid: false,
      //     },
      }
    },
  }
</script>

<style scoped>
.color {
  color: white;
}
</style>
