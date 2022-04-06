<template>
  <v-container>
    <v-card class="color center">
      <v-card-title
        class="text primary center color"
        color="white"
      >
        {{ datos[0].name }}
      </v-card-title>
      <div class="my-6">
        <line-chart
          :data="datos"
          prefix="$"
          thousands=","
          empty="No data"
          loading="Cargando"
          :min="null"
          :curve="this.datos[0].curve"
        />
        <v-btn @click="test">
          test
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    props: {
      datos: {
        type: Array,
        default: null,
      },
    },
    data () {
      return {}
    },
    methods: {
      // minimo () {
      //   var temp = Object.values(this.datos[0].data).map(num => {
      //     return Number(num)
      //   })
      //   var min = Math.min(...temp)
      //   return Math.ceil(min - min * 0.005)
      // },
      test () {
        // console.log(this.datos[0].curve)
      },
    },
  }
</script>

<style scoped>
.color {
  color: white;
}
</style>
