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
            :items="documento"
            label="Sucursal"
            @change="updateSuc"
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
        sucursales: [],
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
    created () {
      this.updateSuc()
    },
    methods: {
      async updateSuc () {
        await db
          .collection('Goals')
          .get()
          .then(res => {
            this.documento = []
            res.forEach(doc => {
              this.documento.push(doc.id)
            })
          })
      },
      async updateData () {
        await db
          .collection('Goals')
          .doc('sucursales')
          .get()
          .then(res => {
            const dataFinal = {
              [this.sucursales]: {
                captacion: this.captacion,
                cobranza: this.cobranza,
                llamadas: this.llamadas,
                recuperacion: this.recuperacion,
              },
            }
            this.temporal = dataFinal
          })
        console.log(this.temporal)
        await db
          .collection('Goals')
          .doc('sucursales')
          .update(this.temporal)
      },
    },
  }
</script>
