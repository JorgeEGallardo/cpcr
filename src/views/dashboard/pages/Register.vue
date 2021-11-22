<template>
  <v-app v-if="user.loggedIn">
    <div
      id="register"
      :style="registercss"
    >
      <headerv />
      <div class="row justify-content-center main-content">
        <login
          id="login"
          :register="true"
          :colorbtn="rand"
        />
      </div>
    </div>
  </v-app>
  <v-app v-else>
    <not-found />
  </v-app>
</template>

<script>
  import headerv from '../components/core/HeaderV.vue'
  import login from '../component/LoginForm.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: { headerv, login, NotFound: () => import('../pages/Loading') },
    data () {
      return {
        form: {
          name: '',
          email: '',
          password: '',
        },
        registercss: '',
        error: null,
        rand: 0,
        useru: '',
      }
    },
    computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        user: 'user',
      }),
    },
    updated () {
      this.useru = this.$store.getters.user.loggedIn
    },
    mounted () {
      const csspos = [`background: #43C6AC;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to bottom, #F8FFAE, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to bottom, #F8FFAE, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      min-height: 100vh;`,
                      `background-color: #0093E9;
      background-image:
      linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
      min-height: 100vh;`,
                      `background: #4568DC;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to bottom, #B06AB3, #4568DC);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to bottom, #B06AB3, #4568DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      min-height: 100vh;`,
      ]
      this.rand = Math.floor(Math.random() * (3 - 0)) + 0
      this.registercss = csspos[this.rand]
    },

  }
</script>
<style scoped>
  #register{
    min-height: 100vh;
    background-color: #0093E9;
    background-image:
    linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  }
  .main-content{
    overflow-y: hidden;
    padding: 1em 2em 6em;
    min-height:36%;
  }
  #login{
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    margin:auto;
  }
</style>
