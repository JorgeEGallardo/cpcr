<template>
  <v-data-table
    :headers="headers"
    :items="propertyNames"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-dialog
        transition="dialog-bottom-transition"
        persistent
        v-model="dialog"
        max-width="500px"
        :retain-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            small
            class="mr-2"
            v-bind="attrs"
            v-on="on"
          >
            mdi-eye
          </v-icon>
        </template>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            <span class="text-h5">{{ item.displayname }}</span>
          </v-card-title>
          <v-card-text>
          Hola soy un dialogo
          </v-card-text>
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
  </v-data-table>
</template>
<script>
  import { db } from '../../../../main'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        fetchData: {},
        propertyNames: [],
        headers: [
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
        ],
        dialog: false,
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
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
    },
  }
</script>
