<template>
  <v-container>
    <v-card class="color center">
      <v-card-title
        class="text-h4 primary center white--text"
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
