<template>
  <v-container>
    <v-card class="color center">
      <v-card-title class="text primary center color">
        {{ chartTitle }}
      </v-card-title>
      <div class="my-6">
        <chartist
          ratio="ct-chart"
          type="Pie"
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
      }
    },
  }
</script>

<style scoped>
.color {
  color: white;
}
</style>
