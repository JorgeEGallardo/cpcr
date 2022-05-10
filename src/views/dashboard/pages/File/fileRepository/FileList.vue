<template>
  <v-card
    outlined
    hover
    class="center overflow-auto white--text"
    height="140px"
    width="1000"
    @click="popUp"
  >
    <v-card-title
      class="text-h3 primary"
    >
      {{ fileTitle }}
    </v-card-title>
    <v-divider />
    <v-card-text
      class="text-h4"
    >
      Enlace: " {{ fileUrl }} "
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    props: {
      fileTitle: { type: String, default: 'a' },
      fileUrl: { type: String, default: 'a' },
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    methods: {
      popUp () {
        window.open(this.fileUrl)
      },
    },
  }
</script>
