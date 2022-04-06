<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="coleccion"
          :items="['ChartSucursales', 'charts']"
          label="Colección"
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
    <v-btn
      class="error"
      @click="test()"
    >
      ᵇʳᵒᵐᶦᵗᵃ
    </v-btn>
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
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created: {
      async test () {
        await db
          .collection(this.collection)
          .get()
          .then(res => {
            res.forEach(doc => {
              this.documento.push(doc.id)
            })
          })
        console.log(this.documento)
      },
    },
    methods: {
      async test () {
        await db
          .collection('ChartSucursales')
          .get()
          .then(res => {
            res.forEach(doc => {
              this.documento.push(doc.id)
            })
          })
        console.log(this.documento)
      },
      async update () {
        alert(
          ' Categoria: ' +
            this.categoria +
            ' Fecha: ' +
            this.fecha +
            ' Cantidad: ' +
            this.cantidad,
        )
        // console.log(this.categoria)
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
      },
    },
  }
</script>
