<template>
  <v-app>
    <div class="bg">
      <headerv />
      <v-container class="top">
        <v-row>
          <v-col>
            <v-img
              v-if="visible"
              align="center"
              align-self="center"
              class="center"
              lazy-src="image"
              max-width="250"
              :src="image"
            />
            <v-img
              v-if="easter"
              align="center"
              class="center"
              lazy-src="image2"
              max-height="350"
              max-width="300"
              :src="image2"
            />
          </v-col>
          <v-col class="text-center ">
            <h1 class="text-center high center">
              404
            </h1>
            <h2 class="text-center tb">
              Oops no hemos podido encontrar la página que estas buscando. Llama
              a sistemas o regresa al inicio con el siguiente botón.
            </h2>
            <v-btn
              class="ma-2 center high tt"
              color="success"
              @click="inicio"
            >
              Ir al inicio
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
  import headerv from '../components/core/HeaderV.vue'
  export default {
    components: { headerv },
    data () {
      return {
        image: require('@/assets/riven.png'),
        image2: require('@/assets/5a9435e345c35.gif'),
        visible: true,
        easter: false,
      }
    },
    created () {
      this.easteregg()
    },
    methods: {
      inicio () {
        this.$router.replace({ name: 'Sesion' })
      },
      easteregg () {
        const espec = new Date('11/28/1999')
        const today = new Date()
        if (
          espec.getMonth() === today.getMonth() &&
          today.getDate() === espec.getDate()
        ) {
          this.visible = false
          this.easter = true
        }
      },
    },
  }
</script>

<style>
.center {
  margin: auto;
  margin-top: 8rem;
}
.top {
  margin-top: 6rem;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  margin: auto;
  min-height: 80vh;
}
.high {
  font-size: 5rem;
}
.bg {
  min-height: 100vh;
  background-color: #0093e9;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  color: white;
}
.tb {
  margin-bottom: 6rem;
}
</style>
