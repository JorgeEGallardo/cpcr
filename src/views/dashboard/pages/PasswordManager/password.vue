<template>
  <v-form action="">
    <v-text-field
      v-model="formData.site"
      label="Lugar"
    />
    <v-text-field
      v-model="formData.user"
      label="Usuario"
    />
    <v-text-field
      v-model="formData.pass"
      label="Contraseña"
      type="password"
    />
    <v-btn @click="addPassword()">
      añadir
    </v-btn>
    <v-btn @click="fetchPassword()">
      fetch
    </v-btn>
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
        },
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
      },
      async fetchPassword () {
        console.log('traer de la db')
        await db
          .collection('password')
          .doc(this.formData.uid)
          .get()
          .then(doc => {
            this.fetchData = doc.data()
            console.log(this.fetchData)
          })
        console.log('Encriptada')
        console.log(this.fetchData.OpenFin.pass)
        this.decryptedText = this.$CryptoJS.AES.decrypt(
          this.fetchData.OpenFin.pass,
          'Secret Passphrase',
        ).toString(this.CryptoJS.enc.Utf8)
        console.log('Desencriptada')
        console.log(this.decryptedText)
      },
    },
  }

//   db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
</script>
