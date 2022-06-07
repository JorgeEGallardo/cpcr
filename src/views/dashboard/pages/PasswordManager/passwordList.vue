<template>
  <v-data-table
    :headers="headers"
    :items="propertyNames"
    dense
    fixed-header
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        v-if="item.icon === 'mdi-eye-off'"
        class="mr-2"
        color="primary"
        @click="copyToClipboard(item)"
      >
        mdi-clipboard-file-outline
      </v-icon>
      <v-icon
        class="mr-2"
        @click="openAuth(item)"
      >
        {{ item.icon }}
      </v-icon>
      <v-icon
        class="mr-2"
        color="red darken-1"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <!-- <template v-slot:top>
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
    </template> -->
  </v-data-table>
</template>
<script>
  import firebase from 'firebase'
  import { db } from '../../../../main'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
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
          { text: 'Usuario', value: 'user', sortable: false },
          { text: 'Contraseña', value: 'bullet', sortable: false },
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
      async fetchPassword () {
        await db
          .collection('password')
          .doc(this.$store.state.user.data.uid)
          .onSnapshot(doc => {
            this.fetchData = doc.data()
            this.propertyNames = Object.values(this.fetchData)
          })
      },
      decryptPassword (pass) {
        this.dialog = false
        this.decrypted = this.$CryptoJS.AES.decrypt(
          pass,
          this.$store.state.user.data.uid,
        ).toString(this.CryptoJS.enc.Utf8)
        pass = ''
      },
      async openAuth (item) {
        if (item.icon === 'mdi-eye') {
          item.icon = 'mdi-eye-off'
          this.VisiblidadHash = !this.VisiblidadHash
          this.VisibiidadPass = !this.VisiblidadPass
          this.decrypted = this.$CryptoJS.AES.decrypt(
            item.pass,
            this.$store.state.user.data.uid,
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
              doc.ref.update({
                [item.site]: firebase.firestore.FieldValue.delete(),
              })
            })
        } catch (error) {
          this.$toast.error('Hubo un error ' + error, {
            position: 'bottom-right',
          })
        }
      },
      copyToClipboard (item) {
        if (typeof navigator.clipboard === 'undefined') {
          var textArea = document.createElement('textarea')
          textArea.value = item.bullet
          textArea.style.position = 'fixed' // avoid scrolling to bottom
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          try {
            var successful = document.execCommand('copy')
            var msg = successful
              ? 'Contraseña copiada al portapapeles'
              : 'No se copio la contraseña'
            this.$toast.success(msg, {
              position: 'bottom-right',
              timeout: 3016,
              closeOnClick: false,
              pauseOnFocusLoss: false,
              pauseOnHover: true,
              draggable: false,
              closeButton: '',
              hideProgressBar: true,
              rtl: false,
            })
          } catch (err) {
            this.$toast.error('La contraseña no pudo ser copiada', err, {
              possition: 'bottom-right',
            })
          }

          document.body.removeChild(textArea)
          return
        }
        navigator.clipboard.writeText(item.bullet).then(
          this.$toast.success('La contraseña fue copiada al portapapeles', {
            position: 'bottom-right',
            timeout: 3016,
            closeOnClick: false,
            pauseOnFocusLoss: false,
            pauseOnHover: true,
            draggable: false,
            closeButton: '',
            hideProgressBar: true,
            rtl: false,
          }),
          function (err) {
            alert('la contraseña no se ha copiado', err)
          },
        )
      },
    },
  }
</script>
