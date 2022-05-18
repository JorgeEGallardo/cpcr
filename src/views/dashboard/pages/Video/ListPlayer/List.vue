<template>
  <v-hover v-slot="{ hover }">
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
      >
        <v-fade-transition>
          <v-overlay
            v-if="hover"
            :absolute="absolute"
            color="primary"
            :value="overlay"
            class="d-flex transition-fast-in-fast-out v-card--reveal text-h1 white--text justify-center"
            style="height: 100%;"
          >
            <v-icon x-large>
              mdi-play-circle
            </v-icon>
          </v-overlay>
        </v-fade-transition>
      </v-img>
      <v-card-title class="d-flex text-h4 justify-center primary white--text">
        {{ videoTitulo }}
      </v-card-title>
    </v-card>
  </v-hover>
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
        absolute: true,
        overrlay: false,
        opacity: 0.5,
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
            this.$toast.error('Hubo un error', error, {
              position: 'bottom-right',
            })
          })
      },
    },
  }
</script>
