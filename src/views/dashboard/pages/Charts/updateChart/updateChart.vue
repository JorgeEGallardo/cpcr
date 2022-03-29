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
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="formData.fecha"
              label="Fecha"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="formData.cantidad"
              label="Cantidad"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="categoria"
              :items="['carteraVencida', 'estimacion']"
              label="Categoria"
            />
          </v-col>
        </v-row>
        <v-btn
          class="primary"
          @click="updateChart"
        >
          Enviar
        </v-btn>
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '@/main'
  export default {
    data () {
      return {
        categoria: '',
        // data: { 'formData.fecha': 'formData.cantidad' },
        formData: {
          fecha: '',
          cantidad: '',
        },
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    methods: {
      updateChart () {
        console.log(db)
      },
    },
  }
</script>
