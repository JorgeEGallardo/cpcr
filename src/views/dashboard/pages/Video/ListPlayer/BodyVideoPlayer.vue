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
          <v-icon>mdi-play-box</v-icon> Reproductor
        </div>

        <div class="text-subtitle-1 font-weight-light">
          Seleccione un video de la lista para empezar a reproducirlo
        </div>
      </template>
      <!-- Reproductor -->
      <cpcr-player />
      <v-text-field
        v-model="search"
        label="búsqueda"
        outlined
        hint="búsqueda por título"
      />
      <!-- Lista -->
      <v-container>
        <v-row dense>
          <v-col
            v-for="v in filteredList"
            :key="v"
            cols="12"
            md="3"
          >
            <cpcr-list
              :videoid="v.url"
              :video-titulo="v.titulo"
            />
          </v-col>
        </v-row>
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '@/main'

  import CpcrPlayer from './Player.vue'
  import CpcrList from './List.vue'

  export default {
    components: { CpcrPlayer, CpcrList },
    data () {
      return {
        //! Esto se tiene que llenar desde la bd de datos

        videos: [],
        search: '',
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
      filteredList () {
        return this.videos.filter(post => {
          return post.titulo.toLowerCase().includes(this.search.toLowerCase())
        })
      },
    },

    created () {
      db.collection('videoList')
        .get()
        .then(res => {
          res
            .forEach(doc => {
              this.videos.push(doc.data())
            })
            .catch(error => {
              alert('Error getting document:', error)
            })
        })
    },
    methods: {},
  }
</script>
