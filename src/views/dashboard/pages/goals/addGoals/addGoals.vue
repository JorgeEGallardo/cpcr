<template>
    <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card
      color="primary"
    >
      <!-- Header -->
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          <v-icon>mdi-chart-donut-variant</v-icon> Gráficos
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Vista grafíca
        </div>
      </template>
    </base-material-card>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  // import { db } from '@/main'
  export default {
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
  }
</script>