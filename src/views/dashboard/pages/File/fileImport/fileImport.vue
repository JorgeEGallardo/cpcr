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
          Añadir nuevo enlace a drive
        </div>

        <div class="text-subtitle-1 font-weight-light">
          se añadira un nuevo enlace de drive a la lista de drive
        </div>
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="md"
          >
            <v-text-field
              v-model="formData.titulo"
              label="Titulo"
              outlined
              hint="Titulo para mostrar"
            />
          </v-col>
          <v-col
            cols="12"
            md="md"
          >
            <v-text-field
              v-model="formData.url"
              label="Enlace"
              outlined
              hint="Enlace de dirve"
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
              hint="Nivel de acceso"
            />
          </v-col>
          <v-col
            cols="12"
            md="md"
          >
            <v-btn
              color="primary"
              @click="addFile"
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
      addFile () {
        var data = this.formData
        db.collection('fileList')
          .add(data)
          .then(res => {
            alert(
              'se ha añadido: ' +
                this.formData.titulo +
                this.formData.url +
                this.formData.nivel,
            )
          })
          .catch(error => {
            alert('No se pudo actualizar el registro' + error)
          })
      },
    },
  }
</script>
