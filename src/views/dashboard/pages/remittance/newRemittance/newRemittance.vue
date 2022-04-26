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
          Añadir remesa a la bitacora
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Bitacora de remesas
        </div>
      </template>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
                v-model="formData.numeroSocio"
                label="Numero de socio"
                hint="Formato: x-xx-xxxx"
              />
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="formData.nombreSocio"
                label="Nombre del socio"
                hint="Nombre A.paterno A.materno"
              />
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="formData.NoCuentaTransferencia"
                label="Numero de cuenta transferencia"
              />
            </v-col>

            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
                v-model="formData.cantidad"
                label="Cantidad depositada"
              />
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
              <v-select
                v-model="formData.sucursal"
                :items="['Maestro', 'Centro', 'Salto', 'Sombrerete']"
                label="Sucursal"
              />
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
              <v-select
                v-model="formData.efectivo"
                :items="['Si', 'No']"
                label="Transferencia en efectivo"
              />
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="formData.producto"
                label="Destino del recurso"
              />
            </v-col>
            <v-col
              cols="12"
              md="3"
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
                    v-model="formData.fechaRem"
                    label="Fecha de deposito"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="formData.fechaRem"
                  @input="menu22 = false"
                />
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
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
                    v-model="formData.fechaMov"
                    label="Movimiento en caja"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="formData.fechaMov"
                  @input="menu = false"
                />
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="formData.descripcion"
                label="Donde se va a aplicar"
              />
            </v-col>
            <v-col
              cols="12"
              md="md"
            >
              <v-btn
                color="primary"
                @click="newRemittance"
              >
                Añadir
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
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
          numeroSocio: '',
          nombreSocio: '',
          NoCuentaTransferencia: '',
          cantidad: '',
          sucursal: '',
          efectivo: '',
          producto: '',
          fechaRem: new Date(Date.now()).toISOString().substr(0, 10),
          fechaMov: new Date(Date.now()).toISOString().substr(0, 10),
          fechaReal: firebase.firestore.Timestamp.fromDate(new Date()),
          descripcion: '',
        },
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    methods: {
      newRemittance () {
        try {
          var data = this.formData
          db.collection('remittanceList')
            .add(data)
            .then(res => {
              this.$toast.success('Se ha añadido: ' + this.formData.nombreSocio, {
                position: 'bottom-right',
              })
              this.$refs.form.reset()
            })
        } catch (error) {
          this.$toast.error('Hubo un error', {
            position: 'bottom-right',
          })
        }
      },
    },
  }
</script>
