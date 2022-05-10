<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          <v-icon>mdi-poll</v-icon>Actualizar grafico
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Actualizar con informacion mas reciente
        </div>
      </template>
      <v-form>
        <v-row>
          <v-col>
            <v-select
              v-model="coleccion"
              :items="['ChartSucursales', 'charts']"
              label="Colección"
              @change="updateCat"
            />
          </v-col>
          <v-col>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fecha"
                  label="Fecha"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="fecha"
                @input="datepick = false"
              />
            </v-menu>
          </v-col>
          <v-col>
            <v-text-field
              v-model="cantidad"
              label="Cantidad"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="categoria"
              :items="documento"
              label="Categoria"
            />
          </v-col>
        </v-row>
        <v-btn
          class="primary"
          @click="update(categoria)"
        >
          enviar
        </v-btn>
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
        menu: false,
        categoria: '',
        fecha: new Date(Date.now()).toISOString().substr(0, 10),
        cantidad: '',
        temporal: [],
        temporal2: [],
        opciones: '',
        documento: [],
        coleccion: 'charts',
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created () {
      this.updateCat()
    },
    methods: {
      async updateCat () {
        await db
          .collection(this.coleccion)
          .get()
          .then(res => {
            this.documento = []
            res.forEach(doc => {
              this.documento.push(doc.id)
            })
          })
      },
      async update () {
        await db
          .collection(this.coleccion)
          .doc(this.categoria)
          .get()
          .then(res => {
            const dataToUpdate = res.data()
            const newDate =
              this.categoria === 'scatterVencida'
                ? this.fecha.substring(0, 4) +
                  this.fecha.substring(5, 7) +
                  this.fecha.substring(8, 10)
                : this.fecha
            const dataFinal = {
              data: { ...dataToUpdate.data, [newDate]: this.cantidad },
            }
            this.temporal2 = dataFinal
          })
        await db
          .collection(this.coleccion)
          .doc(this.categoria)
          .update(this.temporal2)
        this.$toast.success('actualizado, Fecha: ' + this.fecha + ' Cantidad:' + this.cantidad, {
          position: 'bottom-right',
        })
      },
    },
  }
</script>
