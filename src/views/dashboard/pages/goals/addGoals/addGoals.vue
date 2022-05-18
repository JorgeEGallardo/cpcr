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
          <v-icon>mdi-tooltip-plus</v-icon> Actualizar progreso
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Actualiza el progreso de tu sucursal
        </div>
      </template>
      <v-form ref="form">
        <v-contaner>
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
                label="Captación"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="cobranza"
                label="Cobranza"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="llamadas"
                label="Llamadas"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="recuperacion"
                label="Recuperación"
              />
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                @click="updateData"
              >
                Actualizar datos
              </v-btn>
            </v-col>
          </v-row>
        </v-contaner>
      </v-form>
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
        sucursales: ['Centro', 'Maestro', 'Salto', 'Sombrerete'],
        documento: [],
        sucursal: 'Maestro',
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
        this.$refs.form.reset()
      },
    },
  }
</script>
