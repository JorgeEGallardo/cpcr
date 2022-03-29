<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <div class="center">
      <youtube
        :video-id="videoId"
        :player-vars="playerVars"
        resize
        @playing="playing"
      />
    </div>
  </v-container>
</template>

<script>
/*
 ? El video se tiene que tomar de la base datos en tiempo real
 ! users_videos
 ! -------------
 * id_user
 * actual_video
*/
// ? Cuando das click en una tarjeta se actualiza en la bd el video actual del usuario
// ? Este componente debe obtener el actual_video del id del usuario logueado
  import { db } from '../../../../../main'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        videoId: '',
        playerVars: {
          autoplay: 0,
        },
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created () {
      db.collection('videos')
        .doc(this.user.data.uid)
        .onSnapshot(doc => {
          this.videoId = doc.data().videoId
          this.visibilidad = true
        })
        .catch(error => {
          alert('Error getting document:', error)
        })
    },
    methods: {},
  }
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
