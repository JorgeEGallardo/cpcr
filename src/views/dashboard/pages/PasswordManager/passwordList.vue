<template>
  <v-data-table
    :headers="headers"
    :items="propertyNames"
    :single-expand="true"
    :expanded.sync="expanded"
    show-expand
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="openAuth(item)"
      >
        mdi-eye
      </v-icon>
    </template>
    <template v-slot:top>
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        persistent
        max-width="500px"
        :retain-focus="false"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            <span class="text-h5">{{}}</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="decryptPassword()">
              a
            </v-btn>
          </v-card-actions>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:expanded-item="{ item }">
      <td
        v-if="VisiblidadHash"
        :colspan="headers.length"
      >
        {{ item.pass }}
      </td>
      <td
        v-if="VisibiidadPass"
        :colspan="headers.length"
      >
        {{ item.decryptedPass }}
      </td>
    </template>
  </v-data-table>
</template>
<script>
  import { db } from '../../../../main'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        expanded: [],
        decrypted: '',
        fetchData: {},
        propertyNames: [],
        dialog: false,
        cardTitle: '',
        VisiblidadHash: true,
        VisibiidadPass: false,
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
      headers () {
        return [
          {
            text: 'Servicio',
            align: 'start',
            sortable: false,
            value: 'site',
          },
          { text: 'Usuario', value: 'user' },
          { text: 'Contraseña', value: 'pass' },
          {
            text: 'Mostrar contraseña',
            value: 'actions',
            sortable: false,
            align: 'center',
          },
          { text: 'Mostrar descripcion', value: 'data-table-expand' },
          { text: 'Id', value: 'pass', align: ' d-none', sortable: false },
          { text: 'decryptedPass', value: 'decryptedPass', align: ' d-none', sortable: false },
        ]
      },
    },
    created () {
      this.fetchPassword()
    },
    methods: {
      test (item) {
        console.log(item)
      },
      cerrarDialogo () {
        this.dialog = false
      },
      mostrarDialogo (item) {
        console.log(item)
        this.dialog = true
      },
      async fetchPassword () {
        console.log('traer de la db')
        await db
          .collection('password')
          .doc(this.$store.state.user.data.uid)
          .get()
          .then(doc => {
            this.fetchData = doc.data()
            console.log(this.fetchData)
            this.propertyNames = Object.values(this.fetchData)
            console.log(this.propertyNames)
          })
      // console.log('Encriptada')
      // console.log(this.fetchData.OpenFin.pass)
      // this.decryptedText = this.$CryptoJS.AES.decrypt(
      // this.fetchData.OpenFin.pass,
      // 'Secret Passphrase',
      // ).toString(this.CryptoJS.enc.Utf8)
      // console.log('Desencriptada')
      // console.log(this.decryptedText)
      },
      decryptPassword (pass) {
        this.decrypted = ''
        console.log(pass)
        this.dialog = false
        console.log('Encriptada')
        this.decrypted = this.$CryptoJS.AES.decrypt(
          pass,
          'Secret Passphrase',
        ).toString(this.CryptoJS.enc.Utf8)
        console.log('Desencriptada')
        console.log(this.decrypted)
        pass = ''
      },
      async openAuth (pass) {
        this.VisiblidadHash = !this.VisiblidadHash
        this.VisibiidadPass = !this.VisiblidadPass
        console.log(pass)
        this.decrypted = this.$CryptoJS.AES.decrypt(
          pass.pass,
          'Secret Passphrase',
        ).toString(this.CryptoJS.enc.Utf8)
        console.log('Desencriptada')
        this.propertyNames.decryptedPass = this.decrypted
        alert(this.decrypted)
      },
    },
  }
</script>
