<template>
  <v-card
    outlined
    hover
    class="center primary"
    width="250px"
    height="275px"
    @click="updateVideo"
  >
    <v-img
      class="center"
      contain
      :src="srcImg"
      :lazy-src="srcImg"
    />
    <v-card-title class="d-flex text-h4 justify-center primary white--text">
      {{ videoTitulo }}
    </v-card-title>
  </v-card>
</template>

<script>
  import { db } from '../../../../../main'
  import { mapState } from 'vuex'
  export default {
    props: {
      //! Aqui tienen que estar todos los campos de la base de datos
      videoid: { type: String, default: 'DqJRiQBGZ6c' },
      videoTitulo: { type: String, default: 'titulo' },
    },
    data () {
      return {
        srcImg: `https://img.youtube.com/vi/${this.videoid}/0.jpg`,
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    methods: {
      updateVideo: async function () {
        await db
          .collection('videos')
          .doc(this.user.data.uid)
          .set({ videoId: this.videoid })
          .catch(error => {
            alert('No se pudo actualizar el registro' + error)
          })
      },
    },
  }
</script>
