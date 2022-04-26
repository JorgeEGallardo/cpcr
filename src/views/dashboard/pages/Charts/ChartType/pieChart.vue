<template>
  <v-container>
    <v-card class="color center">
      <v-card-title class="text primary center color">
        Dona
      </v-card-title>
      <div>
        <pie-chart
          :data="datos"
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
    props: {
      datos: {
        type: Array,
        default: null,
      },
    },
    data () {
      return {
        data: [],
      }
    },
    created () {},
    methods: {
      test () {
      // console.log(this.datos[0])
      // console.table(this.datos)
      },
    },
  }
</script>

<style scoped>
.color {
  color: white;
}
</style>
