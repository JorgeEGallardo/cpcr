<template>
  <v-container
    id="addPersona"
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
              Solicitar la búsqueda de un socio de nuevo ingreso
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Solicita la búsqueda de un socio, la información se enviara a la oficial de cumplimiento.
            </div>
          </template>

          <v-form ref="form">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="nombre"
                    v-model="formData.nombre"
                    class="purple-input"
                    outlined
                    label="Nombre completo"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="rfc"
                    v-model="formData.rfc"
                    label="RFC"
                    outlined
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="curp"
                    v-model="formData.curp"
                    label="curp"
                    outlined
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="primary"
                    class="mr-0"
                    @click="createPost"
                  >
                    Solicitar busqueda
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
        menu22: false,
        menu: false,
        formData: {
          nombre: '',
          rfc: '',
          actualizacion: (new Date(Date.now())).toISOString().substr(0, 10),
          instruccion: '',
          curp: '',
          folio: '',
          fechanac: (new Date(Date.now())).toISOString().substr(0, 10),
          is_active: true,
          fechafolio: (new Date(Date.now())).toISOString().substr(0, 10),
        },
      }
    },
    methods: {
      createPost () {
        var data = {
          name: this.formData.nombre,
          rfc: this.formData.rfc,
          curp: this.formData.curp,
          date_cap: firebase.firestore.Timestamp.fromDate(new Date()),
          state: 1,
          user: this.$store.state.user.data.displayName,
        }
        db.collection('requests').add(data).then((ans) => {
          alert('Se ha solicitado la busqueda de: ' + data.name)
        }).catch(error => {
          alert(error)
        })
      },
    },
  }
</script>
