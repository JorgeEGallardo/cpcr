<template>
  <v-container>
    <v-card class="justify-center">
      <v-card-title
        class="d-flex text-h4 primary justify-center white--text"
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
  }
</script>
