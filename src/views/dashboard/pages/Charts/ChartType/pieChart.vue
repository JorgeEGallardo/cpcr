<template>
  <v-container>
    <v-card class="color center">
      <v-card-title class="text primary center color">
        Pie
      </v-card-title>
      <div>
        <pie-chart
          :data="data"
          :donut="true"
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
    //       series: [25, 25, 55, 25]`,
    //   },
    //   chartOptions: {
    //     type: String,
    //     default: `chartpadding: 30, labelOffset: 50,
    //     labelDirectuion: 'explode`,
    //   },
    // },
    data () {
      return {
        data: [
          ['Blueberry', 44],
          ['Strawberry', 23],
          ['Banana', 22],
          ['Apple', 21],
          ['Grape', 13],
          ['Mango', 100],
        ],
      }
    },
  }
</script>

<style scoped>
.color {
  color: white;
}
</style>
