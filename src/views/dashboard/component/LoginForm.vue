<template>
  <div
    id="login"
    class="v-application--wrap---login"
  >
    <v-card
      class="card-login"
    >
      <h1 class="titulo">
        {{ register ? 'Registro' : 'Iniciar sesión' }}
      </h1>
      <v-form
        ref="form"
        dark
      >
        <v-text-field
          v-if="register"
          id="name"
          v-model="form.name"
          type="name"
          name="name"
          value
          required
          :counter="30"
          color="white"
          label="Nombre"
          dark
        />
        <v-text-field
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          :counter="40"
          color="white"
          label="Correo"
          dark
          required
          autofocus
        />
        <v-text-field
          id="password"
          v-model="form.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="password"
          counter
          :class="!register ? 'margin' : ' '"
          color="white"
          label="Contraseña"
          dark
          required
          @click:append="show1 = !show1"
          @keypress.enter="submit"
        />
        <v-btn
          :color="btncolor[colorbtn]"
          class="mr-4 margin"
          dark
          @click="submit"
        >
          {{ register ? 'Registrar' : 'Iniciar sesión' }}
        </v-btn>
      </v-form>
    </v-card>
    <v-hover>
      <v-alert
        v-if="alert.show"
        class="mr-4 ml-4"
        rounded
        :color="alert.color"
        dark
        @click="alert.show = !alert.show"
      >
        {{ alert.alerttxt }}
      </v-alert>
    </v-hover>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import { db } from '../../../main'
  export default {
    props: {
      register: Boolean,
      colorbtn: { type: Number, default: 1 },
    },
    data () {
      return {
        form: {
          name: '',
          email: '',
          password: '',
        },
        alert: {
          show: false,
          alerttxt: 'Ejemplo',
          color: 'success',
        },
        btncolor: ['cyan darken-3', 'light-blue darken-3', 'deep-purple darken-3'],
        show1: false,
        error: null,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
      }
    },
    methods: {
      submit: async function () {
        if (this.register) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then(async data => {
              data.user
                .updateProfile({
                  displayName: this.form.name,
                })
                .then(async () => {
                  this.alert.alerttxt = 'Usuario registrado ' + data.user.displayName
                  this.alert.show = true
                  this.alert.color = 'success'
                  await db.collection('users').doc(data.user.uid).set({
                    name: this.form.name,
                    email: this.form.email,
                    uid: data.user.uid,
                    permissions: [],
                  })
                  this.$refs.form.reset()
                })
            })
            .catch(err => {
              this.alert.alerttxt = 'Usuario no registrado ' + err
              this.alert.show = true
              this.alert.color = 'red'
            })
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.form.email, this.form.password)
            .then(data => {
              this.$router.replace({ name: 'Dashboard' })
            })
            .catch(err => {
              this.alert.alerttxt = 'Imposible iniciar sesión revise sus datos por favor.'
              alert(err)
              this.alert.show = true
              this.alert.color = 'red'
            })
        }
      },
    },
  }
</script>

<style scoped>
.form{
    border:3px solid white;
    border-radius: 10%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 40px 0 rgba(0, 0, 0, 0.5);
    background-color: transparent;
}
#login {
    min-height: 0rem!;
    background-color: transparent;
    border:3px solid white;
    border-radius: 10%;
}
.v-application--wrap---login{
    min-height: 80vh;
}
.card-login {
    background-color: red;
    padding: 6rem 6rem 1rem 6rem;
    background-color: transparent !important;
    border: none;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    min-width: 600px;
}
.titulo{
    @import url('https://fonts.googleapis.com/css2?family=Lato:ital@1&display=swap');
    font-family: 'Lato', sans-serif;
    color: white;
    margin-bottom: 5rem;
}
.margin{
    margin-top: 4rem;
}
</style>
