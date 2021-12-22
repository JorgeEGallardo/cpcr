<template>
  <v-container
    id="addRequestIT"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card
          color="primary"
        >
          <template v-slot:heading>
            <div
              class="text-h3 font-weight-light"
            >
              Hacer una solicitud a sistemas
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Crea un formato de solicitud para el área de sistemas.
            </div>
          </template>

          <v-form ref="form">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    id="nombre"
                    v-model="formData.socio"
                    class="purple-input"
                    outlined
                    label="Datos de referencia del socio, equipo o formato"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-select
                    v-model="formData.reason"
                    :items="items"
                    label="Motivo de la solicitud"
                    outlined
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-textarea
                    v-model="formData.description"
                    outlined
                    name="input-7-4"
                    label="Descripción o mótivo"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    id="nombre"
                    v-model="formData.quantity"
                    class="purple-input"
                    outlined
                    label="Cantidad $ (En caso de que apliqué)"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    id="nombre"
                    v-model="keytext"
                    class="purple-input"
                    outlined
                    :label="confirm"
                    text="primary"
                    @input="confirmKeyword"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-btn
                    color="primary"
                    class="mr-0"
                    :disabled="button"
                    @click="createSol"
                  >
                    Crear solicitud
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import { db } from '@/main'
  export default {
    name: 'Personas',
    data () {
      return {
        keyword: '',
        confirm: '',
        keytext: '',
        button: true,
        keywords: ['adelante', 'entendido', 'confirmo', 'correcto', 'seguir'],
        items: [
          'Liberación de ahorro',
          'Habilitacion de Fechas anteriores',
          'Cancelación de póliza',
          'Cancelación Movimiento',
          'Cambio en el formato',
          'Condonación Moratorio',
          'Condonación Ordinario',
          'Cambio de equipo',
          'Modificación de un prestamo',
          'Usuario Nuevo',
          'Otro',
        ],
        formData: {
          socio: '',
          reason: '',
          description: '',
          quantity: '',
          user: this.$store.state.user.data.displayName,
          date_cap: firebase.firestore.Timestamp.fromDate(new Date()),
          state: 1,
        },
      }
    },
    created: function () {
      this.randomKey()
    },
    methods: {
      randomKey () {
        const rand = Math.floor(Math.random() * (5 - 0)) + 0
        this.keyword = this.keywords[rand]
        this.confirm = 'He verificado los datos y confirmo que todo esta correcto. Deseo continuar con la petición: (Escriba: ' + this.keyword + ' )'
      },
      confirmKeyword () {
        if (this.keytext === this.keyword) {
          this.button = false
        } else {
          this.button = true
        }
      },
      createSol () {
        var data = this.formData
        db.collection('IT').add(data).then((ans) => {
          alert('Se ha solicitado : ' + data.reason)
          this.$refs.form.reset()
          this.randomKey()
        }).catch(error => {
          alert(error)
        })
      },
    },
  }
</script>
