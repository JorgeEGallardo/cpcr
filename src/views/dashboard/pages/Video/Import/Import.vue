<template>
  <v-container
    id="addRequestIT"
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          Añadir un video nuevo
        </div>

        <div class="text-subtitle-1 font-weight-light">
          llene el formato para añadir un video a la lista
        </div>
      </template>
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="md"
            >
              <v-text-field
                id="titulo"
                v-model="formData.titulo"
                class="purple-input"
                outlined
                label="titulo"
              />
            </v-col>
            <v-col
              cols="12"
              md="md"
            >
              <v-text-field
                id="url"
                v-model="formData.url"
                class="purple-input"
                outlined
                label="url id"
              />
            </v-col>
            <v-col
              cols="12"
              md="md"
            >
              <v-select
                id="nivel"
                v-model="formData.nivel"
                class="purple-input"
                outlined
                label="nivel"
                :items="items"
              />
            </v-col>

            <v-col
              cols="12"
              md="md"
            >
              <v-btn
                color="primary"
                @click="addVideo"
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
  export default {
    data () {
      return {
        items: [
          'Nivel 1',
          'Nivel 2',
          'Nivel 3',
          'Nivel 4',
          'Nivel 5',
          'Nivel 6',
          'Nivel 7',
        ],
        formData: {
          titulo: '',
          url: '',
          nivel: '',
        },
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    methods: {
      addVideo () {
        var data = this.formData
        db.collection('videoList')
          .add(data)
          .then(res => {
            alert('se ha añadido: ' + this.formData.titulo + this.formData.url + this.formData.nivel)
          })
          .catch(error => {
            alert('No se pudo actualizar el registro' + error)
          })
      },
    },
  }
</script>
