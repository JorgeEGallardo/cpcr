<template>
  <v-container>
    <v-card class="color center">
      <v-card-title
        class="text primary center color"
        color="white"
      />
      <div class="my-6">
        <area-chart
          prefix="$"
          thousands=","
          :data="datos"
          min="3000000"
        />
      </div>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    props: {
      datos: { type: Array, default: null },
    },
  }
</script>

<style scoped>
.color {
  color: white;
}
</style>
