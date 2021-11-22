<template>
  <v-footer
    id="dashboard-core-footer"
  >
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
        <v-col>
          <v-btn
            color="primary"
            @click="sOut"
          >
            Salir
          </v-btn>
        </v-col>
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <a
            :href="link.href"
            class="mr-0 grey--text text--darken-3"
            rel="noopener"
            target="_blank"
            v-text="link.text"
          />
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col
          cols="12"
          md="auto"
        >
          <div class="text-body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; 2021, hecho con
            <v-icon size="18">
              mdi-heart
            </v-icon>
            por<a href="https://github.com/JorgeEGallardo">Jorge Gallardo</a>. para Caja Popular Cristo Rey.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({
      links: [
      ],
    }),
    methods: {
      sOut () {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({
              name: 'Sesion',
            })
          })
      },
    },
  }
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase
</style>
