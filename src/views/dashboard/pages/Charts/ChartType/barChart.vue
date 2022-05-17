<template>
  <v-container>
    <v-card class="justify-center">
      <v-card-title
        class="d-flex text-h4 primary white--text"
      >
        {{ datos[0].titulo }} (barras)
      </v-card-title>
      <div class="my-6">
        <column-chart
          :data="datos"
          :min="null"
          prefix="$"
          thousands=","
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
<style scoped>
.ct-series-a .ct-bar {
  stroke: lightblue;
  stroke-width: 20px;
  stroke-dasharray: 20px;
  stroke-linecap: round;
}
</style>
