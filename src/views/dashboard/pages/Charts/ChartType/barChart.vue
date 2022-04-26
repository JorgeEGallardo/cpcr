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
          :data="datos"
          :min="null"
          prefix="$"
          thousands=","
        />
      </div>
      <v-btn @click="test">
        a
      </v-btn>
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
    props: {
      datos: {
        type: Array,
        default: null,
      },
    },
    data () {
      return {
        reorder: [],
      }
    },
    methods: {
      // test () {
      //   for (let i = 0; i < this.datos.length; i++) {
      //     this.reorder.push(this.datos[i])
      //   }
      //   console.log(this.reorder)
      // },
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
