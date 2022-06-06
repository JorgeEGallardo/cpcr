<template>
  <v-data-table
    :headers="headers"
    :items="propertyNames"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        class="mr-2"
        @click="openAuth(item)"
      >
        {{ item.icon }}
      </v-icon>
      <v-icon
        class="mr-2"
        color="red"
        @click="deleteItem(item)"
      >
        mdi-delete
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
  </v-data-table>
</template>
<script>
  import firebase from 'firebase'
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
        eyeState: true,
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
          { text: 'Contraseña', value: 'bullet' },
          {
            text: 'Acciones',
            value: 'actions',
            sortable: false,
            align: 'center',
          },
          { text: 'Id', value: 'pass', align: ' d-none', sortable: false },
          { text: 'icono', value: 'icon', align: ' d-none', sorteable: false },
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
          .onSnapshot(doc => {
            this.fetchData = doc.data()
            this.propertyNames = Object.values(this.fetchData)
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
      async openAuth (item) {
        if (item.icon === 'mdi-eye') {
          item.icon = 'mdi-eye-off'
          this.VisiblidadHash = !this.VisiblidadHash
          this.VisibiidadPass = !this.VisiblidadPass
          console.log(item)
          this.decrypted = this.$CryptoJS.AES.decrypt(
            item.pass,
            'Secret Passphrase',
          ).toString(this.CryptoJS.enc.Utf8)
          item.decryptedPass = this.decrypted
          item.bullet = item.decryptedPass
        } else if (item.icon === 'mdi-eye-off') {
          item.icon = 'mdi-eye'
          item.decryptedPass = ''
          var bullet2 = ''
          const length = item.bullet.length
          for (let i = 0; i < length; i++) {
            bullet2 += '•'
          }
          item.bullet = bullet2
        }
      },
      async deleteItem (item) {
        try {
          await db
            .collection('password')
            .doc(this.$store.state.user.data.uid)
            .get()
            .then(doc => {
              doc.ref.update({ [item.site]: firebase.firestore.FieldValue.delete() })
            })
        } catch (error) {
          this.$toast.error('Hubo un error ' + error, {
            position: 'bottom-right',
          })
        }
      },
    },
  }
</script>
