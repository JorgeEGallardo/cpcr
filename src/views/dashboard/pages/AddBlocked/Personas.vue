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
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Personas bloqueadas
            </div>
            <div class="text-subtitle-1 font-weight-light">
              Agregar nueva persona bloqueada
            </div>
          </template>
          <v-form ref="form">
            <v-container class="py-0">
              <v-row>
                <v-overlay
                  :value="overlay"
                  opacity="0.25"
                  absolute
                  z-index="0"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="100"
                    width="10"
                  />
                </v-overlay>
                <v-col
                  cols="12"
                  md="7"
                >
                  <v-text-field
                    id="nombre"
                    v-model="formData.nombre"
                    class="purple-input"
                    label="Nombre completo"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="5"
                >
                  <v-text-field
                    id="rfc"
                    v-model="formData.rfc"
                    label="RFC"
                    class="purple-input"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    id="instruccion"
                    v-model="formData.instruccion"
                    label="Instrucción"
                    class="purple-input"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    id="curp"
                    v-model="formData.curp"
                    label="curp"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    id="folio"
                    v-model="formData.folio"
                    label="folio"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="4"
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
                        v-model="formData.fechafolio"
                        label="Fecha limite de instrucción"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="formData.fechafolio"
                      @input="menu22 = false"
                    />
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
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
                        v-model="formData.fechanac"
                        label="Fecha de nacimiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="formData.fechanac"
                      @input="menu = false"
                    />
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-btn
                    :disabled="overlay"
                    color="primary"
                    class="d-flex center"
                    @click="createPost();overlay = !overlay"
                  >
                    Agregar persona bloqueada
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
  import axios from 'axios'
  export default {
    name: 'Personas',
    data () {
      return {
        menu22: false,
        menu: false,
        formData: {
          nombre: '',
          rfc: '',
          actualizacion: new Date(Date.now()).toISOString().substr(0, 10),
          instruccion: '',
          curp: '',
          folio: '',
          fechanac: new Date(Date.now()).toISOString().substr(0, 10),
          is_active: true,
          fechafolio: new Date(Date.now()).toISOString().substr(0, 10),
        },
        overlay: false,
      }
    },
    methods: {
      createPost () {
        // //console.log(this.formData)
        axios
          .post('http://10.35.1.106:8000/api/blocked', this.formData)
          .then(response => {
            this.overlay = false
            // //console.log(response)
            this.$toast.success(this.formData.nombre + ' registrado con éxito.', {
              position: 'bottom-right',
            })
            this.$refs.form.reset()
          })
          .catch(error => {
            this.overlay = false
            this.$toast.error('Algo anda mal ' + error, {
              position: 'bottom-right',
            })
          })
      },
    },
  }
</script>
