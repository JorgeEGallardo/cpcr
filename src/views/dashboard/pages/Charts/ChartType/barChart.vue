<template>
  <v-container>
    <v-card class="color center">
      <v-card-title
        class="text primary center color"
        color="white"
      >
        barras
      </v-card-title>
      <div class="my-6">
        <column-chart
          :data="data"
        />
      </div>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    // props: {
    //   chartTitle: { type: String, default: 'DEFAULT' },
    //   chartData: {
    //     type: String,
    //     default: `labels: ['Estos', 'Son', 'Datos', 'Default'],
    //   series: [25, 25, 55, 25]`,
    //   },
    //   chartOptions: {
    //     type: String,
    //     default: `chartpadding: 30, labelOffset: 50,
    // labelDirectuion: 'explode`,
    //   },
    // },
    data () {
      return {
        data: [
          ['Sun', 32],
          ['Mon', 46],
          ['Tue', 28],
          ['Wed', 21],
          ['Thu', 20],
          ['Fri', 13],
          ['Sat', 27],
        ],
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
