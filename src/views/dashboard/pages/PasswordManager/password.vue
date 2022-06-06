<template>
  <v-form ref="form">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="formData.user"
          label="Usuario"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="formData.pass"
          label="Contraseña"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="formData.site"
          label="Lugar"
        />
      </v-col>

      <v-btn @click="addPassword()">
        añadir
      </v-btn>
      <v-btn @click="dummyText()">
        dummy
      </v-btn>
    </v-row>
  </v-form>
</template>
<script>
  import { db } from '../../../../main'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        formData: {
          user: '',
          pass: '',
          uid: this.$store.state.user.data.uid,
          displayname: this.$store.state.user.data.displayName,
          decryptedPass: '',
          icon: 'mdi-eye',
          bullet: '',
        },
        show: false,
        fetchData: [],
        decryptedText: '',
        site: '',
        dataFinal: [],
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    methods: {
      test () {
        alert('Ouch!')
      },
      async addPassword () {
        this.dummyText()
        const hash = this.$CryptoJS.AES.encrypt(
          this.formData.pass,
          'Secret Passphrase',
        ).toString()
        this.formData.pass = hash
        var data = this.formData
        await db
          .collection('password')
          .doc(this.formData.uid)
          .get()
          .then(res => {
            const dataToUpdate = res.data()
            this.dataFinal = { ...dataToUpdate, [this.formData.site]: data }
          })
        await db
          .collection('password')
          .doc(this.formData.uid)
          .set(this.dataFinal)
        this.$refs.form.reset()
      },
      async dummyText () {
        var bullet2 = ''
        const length = this.formData.pass.length
        for (let i = 0; i < length; i++) {
          bullet2 += '•'
        }
        this.formData.bullet = bullet2
      },
    },
  }

//   db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
</script>
