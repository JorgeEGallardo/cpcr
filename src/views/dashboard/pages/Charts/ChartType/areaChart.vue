<template>
  <v-container>
    <v-card class="color center">
      <v-card-title
        class="text-h4 primary center color"
        color="white"
      >
        {{ datos[0].titulo }}
      </v-card-title>
      <div class="my-6">
        <area-chart
          :data="datos"
          prefix="$"
          thousands=","
          empty="No data"
          loading="Cargando"
          :min="null"
          :curve="this.datos[0].curve"
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
    props: {
      datos: {
        type: Array,
        default: null,
      },
    },
    data () {
      return {
        datos2: [],
        datos3: [],
        A: { a: 1, b: 2, c: 3 },
      }
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
        // this.datos.forEach(element => {
        //   this.datos2[element] = element.data
        //   this.datos3 = Object.keys(this.datos2[element])
        // })
        // console.table(this.datos[0].data)
        // console.table(this.datos2)
        // //
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
