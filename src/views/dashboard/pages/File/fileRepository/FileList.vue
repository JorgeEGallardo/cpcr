<template>
  <v-card
    outlined
    hover
    class="center overflow-auto color"
    height="140px"
    width="1000"
    @click="popUp"
  >
    <v-card-title
      class="text primary"
      color="white"
    >
      {{ fileTitle }}
    </v-card-title>
    <v-divider />
    <v-card-text
      class="subtexto"
      coloe="black"
    >
      {{ fileUrl }}
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

<style scoped>
.text {
  font-size: 20px;
}
.color {
  color: white;
}
.subtexto {
  font-size: 12px;
}
</style>
