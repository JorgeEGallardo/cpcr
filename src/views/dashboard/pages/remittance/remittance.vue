<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          Remesas
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Lista de las remesas
        </div>
      </template>
      <cpcr-remittancelist />
    </base-material-card>
  </v-container>
</template>

<script>
  import CpcrRemittancelist from './remittanceList.vue'

  export default {
    components: { CpcrRemittancelist },
  }
</script>
