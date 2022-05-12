<template>
  <v-container>
    <v-card class="justify-center">
      <v-card-title
        class="d-flex text-h4 primary justify-center white--text"
      >
        {{ datos[0].titulo }}
      </v-card-title>
      <div class="my-6">
        <line-chart
          :data="datos"
          prefix="$"
          thousands=","
          empty="No data"
          loading="Cargando"
          :min="null"
          :curve="datos[0].curve"
          :download="{background: '#FFFFFF'}"
        />
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
    },
  }
</script>
