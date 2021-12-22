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
              Sistemas
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Control de permisos de usuario
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
                    v-model="formData.icon"
                    class="purple-input"
                    outlined
                    label="icono"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="rfc"
                    v-model="formData.title"
                    label="titulo"
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
                    v-model="formData.to"
                    label="to"
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
                    @click="createPerm"
                  >
                    Crear permiso
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-btn
            color="primary"
            class="mr-0"
            @click="restartPerm"
          >
            Reiniciar permisos
          </v-btn>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { db } from '@/main'
  export default {
    name: 'App',
    components: {
    },
    data: () => ({
      links: {
      },
      formData: {
        to: '',
        icon: '',
        title: '',
      },
    }),
    created () {

    },
    methods: {
      perm (icon, title, to) {
        const temp = {
          icon: icon,
          title: title,
          to: to,
        }
        return temp
      },
      createPerm: async function () {
        const data = this.formData
        db.collection('permissions').add({ ...data })
      },
      restartPerm: async function () {
        await db.collection('users').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              permissions: [],
            })
          })
        })
      },
    },
  }
</script>
