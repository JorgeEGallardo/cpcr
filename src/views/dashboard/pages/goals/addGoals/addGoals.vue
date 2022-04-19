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
          <v-icon>mdi-chart-donut-variant</v-icon> Añadir
        </div>

        <div class="text-subtitle-1 font-weight-light">
          añade
        </div>
      </template>
      <v-row>
        <v-col>
          <v-select
            v-model="sucursal"
            :items="sucursales"
            label="Sucursal"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="captacion"
            label="captacion"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="cobranza"
            label="cobranza"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="llamadas"
            label="llamadas"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="recuperacion"
            label="recuperacion"
          />
        </v-col>
      </v-row>
      <v-btn @click="updateData">
        Soy un botón
      </v-btn>
    </base-material-card>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'
  import { db } from '@/main'
  export default {
    data () {
      return {
        temporal: [],
        sucursales: ['Centro', 'Matriz', 'Salto', 'Sombrerete'],
        documento: [],
        sucursal: 'Matriz',
        captacion: '',
        cobranza: '',
        llamadas: '',
        recuperacion: '',
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'usllamadaser']),
    },
    created () {},
    methods: {
      async updateData () {
        await db
          .collection('Goals')
          .doc('sucursales')
          .get()
          .then(res => {
            const dataToUpdate = res.data()
            const dataFinal = {
              ...dataToUpdate.data,
              [this.sucursal]: {
                captacion: this.captacion,
                cobranza: this.cobranza,
                llamadas: this.llamadas,
                recuperacion: this.recuperacion,
                id: this.sucursal,
              },
            }
            this.temporal = dataFinal
          })
        await db
          .collection('Goals')
          .doc('sucursales')
          .update(this.temporal)
        this.$toast.success('Completado', {
          position: 'bottom-right',
        })
      },
    },
  }
</script>
