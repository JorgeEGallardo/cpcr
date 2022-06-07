<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <!-- Header -->
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          <v-icon>mdi-lock-check</v-icon> Contraseñas
        </div>
        <div class="text-subtitle-1 font-weight-light">
          Gestor de contraseñas
        </div>
      </template>
      <!-- /Header -->
      <!-- Body -->
      <!-- Componente para añadir -->
      <cpcr-password class="mt-2" />
      <p />
      <hr>
      <!-- Componente para visualizar -->
      <cpcr-passwordlist class="mt-2" />
      <!-- /Body -->
    </base-material-card>
  </v-container>
</template>
<script>
  import CpcrPassword from './password.vue'
  import CpcrPasswordlist from './passwordList.vue'
  import { mapState } from 'vuex'

  export default {
    components: { CpcrPassword, CpcrPasswordlist },
    data () {
      return {}
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
  }
</script>
