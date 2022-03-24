<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          Transferencias
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Lista de las transferencias
        </div>
      </template>
      <cpcr-transferlist />
    </base-material-card>
  </v-container>
</template>

<script>
  import CpcrTransferlist from './transferList.vue'

  export default {
    components: { CpcrTransferlist },
  }
</script>
