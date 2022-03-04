<template>
  <v-app>
    <div class="bg">
      <headerv />
      <v-row class="text-center ">
        <v-col>
          <v-img
            align="center"
            class="center"
            :lazy-src="image"
            max-width="450"
            :src="image"
          />
          <h3 class="text-center high center">
            Cargando...
          </h3>
          <h4 v-if="elementVisible">
            ¿Ya ha tardado demasiado?
          </h4>
          <v-btn
            v-if="elementVisible"
            class="ma-2 center high tt"
            color="primary"
            @click="redirect"
          >
            {{ txt }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
  import headerv from '../components/core/HeaderV.vue'
  export default {
    components: { headerv },
    props: {
      redir: { default: false, type: Boolean },
    },
    data () {
      return {
        image: require('@/assets/loading.svg'),
        elementVisible: false,
        txt: 'Ir al inicio',
      }
    },
    created () {
      setTimeout(function (scope) {
        scope.elementVisible = true
      }, 3000, this)
      if (this.redir) {
        this.txt = 'Ir a la página principal'
      }
    },
    methods: {
      redirect () {
        if (this.redir) {
          this.$router.replace({ name: 'Dashboard' })
        }
        this.$router.replace({ name: 'Sesion' })
      },
    },
  }
</script>

<style>
.center{
    margin: auto;
    margin-top: 0;
}
.top{
    margin-top: 2rem;
     box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    margin:auto;
    min-height: 80vh;
}
.high{
    font-size: 3rem;
}
.bg{
     min-height: 100vh;
  background: #0F2027;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

     color: white;
}
.tb{
    margin-bottom: 6rem;
}
</style>
