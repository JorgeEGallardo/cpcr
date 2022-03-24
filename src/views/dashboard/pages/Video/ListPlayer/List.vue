<template>
  <v-card
    outlined
    hover
    class="center centro py-2"
    width="250px"
    @click="updateVideo"
  >
    <v-img
      class="center"
      contain
      :src="srcImg"
      :lazy-src="srcImg"
    />
    <v-divider />
    <v-card-title class="text">
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
          .then(res => {})
          .catch(error => {
            alert('No se pudo actualizar el registro' + error)
          })
      },
    },
  }
</script>

<style scoped>
.centro {
  text-align: center;
}
.text {
  font-size: 12px;
}
</style>
