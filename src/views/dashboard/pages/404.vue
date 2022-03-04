<template>
  <v-app>
    <div class="bg">
      <headerv />
      <v-container
        class="top"
      >
        <v-row>
          <v-col>
            <v-img
              align="center"
              class="center"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-width="250"
              :src="image"
            />
          </v-col>
          <v-col class="text-center ">
            <h1 class="text-center high center">
              404
            </h1>
            <h2 class="text-center tb">
              Oops no hemos podido encontrar la página que estas buscando. Llama a sistemas o regresa al inicio con el siguiente botón.
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
      }
    },
    methods: {
      inicio () {
        this.$router.replace({ name: 'Sesion' })
      },
    },
  }
</script>

<style>
.center{
    margin: auto;
    margin-top: 8rem;
}
.top{
    margin-top: 6rem;
     box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    margin:auto;
    min-height: 80vh;
}
.high{
    font-size: 5rem;
}
.bg{
     min-height: 100vh;
     background-color: #0093E9;
     background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
     color: white;
}
.tb{
    margin-bottom: 6rem;
}
</style>
