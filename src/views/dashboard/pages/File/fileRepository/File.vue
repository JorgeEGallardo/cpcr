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
          <v-icon>mdi-file-search</v-icon> Buscador
        </div>

        <div class="text-subtitle-1 font-weight-light">
          haga click para abrir el enlace en una nueva pestaña
        </div>
      </template>
      <v-text-field
        v-model="search"
        label="Busqueda"
        outlined
      />
      <v-container>
        <v-row
          v-for="f in filteredList"
          :key="f"
          class="pb-2"
        >
          <cpcr-filelist
            :file-title="f.titulo"
            :file-url="f.url"
          />
        </v-row>
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '@/main'

  import CpcrFilelist from './FileList.vue'

  export default {
    components: { CpcrFilelist },
    data () {
      return {
        archivos: [],
        search: '',
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
      filteredList () {
        return this.archivos.filter(post => {
          return post.titulo.toLowerCase().includes(this.search.toLowerCase())
        })
      },
    },
    created () {
      db.collection('fileList').orderBy('date_cap', 'desc')
        .get()
        .then(res => {
          res
            .forEach(doc => {
              this.archivos.push(doc.data())
            })
            .catch(error => {
              alert('Error getting document:', error)
            })
        })
    },
  }
</script>
