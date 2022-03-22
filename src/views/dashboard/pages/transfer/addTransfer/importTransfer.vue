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
          Añadir Transferencia a la bitacora
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Bitacora de transferencias
        </div>
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formData.numeroSocio"
              label="Numero de socio"
              hint="Formato: x-xx-xxxx"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formData.nombreSocio"
              label="Nombre del socio"
              hint="Nombre A.paterno A.materno"
            />
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <v-text-field
              v-model="formData.cantidad"
              label="Cantidad"
            />
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <v-select
              v-model="formData.sucursal"
              :items="['1', '2', '3', '4']"
              label="Sucursal"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="formData.producto"
              label="Producto"
            />
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <v-menu
              v-model="menu22"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formData.fechaTra"
                  label="Fecha de la transferencia"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="formData.fechaTra"
                @input="menu22 = false"
              />
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-textarea
              v-model="formData.descripcion"
              label="Descripcion"
            />
          </v-col>
          <v-col
            cols="12"
            md="md"
          >
            <v-btn
              color="primary"
              @click="addTransfer"
            >
              Añadir
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '../../../../../main'
  import firebase from 'firebase'

  export default {
    data () {
      return {
        menu22: false,
        menu: false,
        formData: {
          descripcion: '',
          numeroSocio: '',
          nombreSocio: '',
          cantidad: '',
          producto: '',
          fechaTra: new Date(Date.now()).toISOString().substr(0, 10),
          sucursal: '',
          fechaReal: firebase.firestore.Timestamp.fromDate(new Date()),
        },
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    methods: {
      addTransfer () {
        var data = this.formData
        db.collection('transfList')
          .add(data)
          .then(res => {
            this.$toast.success('Se ha añadido: ' + data.nombreSocio, {
              position: 'bottom-right',
            })
          })
      },
    },
  }
</script>
