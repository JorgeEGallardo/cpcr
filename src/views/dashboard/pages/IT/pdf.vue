<template>
  <span style="margin:0px">
    <div>
      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        @click="pdfPrint"
      >
        GENERAR PDF
        <v-icon
          right
          dark
        >
          mdi-cloud-upload
        </v-icon>
      </v-btn>
    </div>
  </span>
</template>

<script>
  import pdfMake from 'pdfmake/build/pdfmake'
  import { mapGetters } from 'vuex'
  import { imgReq } from '@/assets/request.js'
  export default {
    name: 'Pdfgen',
    props: {
      request: { type: String, default: null },
    },
    data () {
      return {
        count: 0,
        body: { type: Array, default: () => [] },
        date: new Date(),
        clients: false,
      }
    },
    computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        user: 'user',
      }),
    },
    created () {
      const today = new Date()
      const date =
        today.getDate() +
        '-' +
        ('0' + (today.getMonth() + 1)).slice(-2) +
        '-' +
        today.getFullYear()
      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      this.date = dateTime
    },
    methods: {
      pdfPrint: async function () {
        console.log(this.user)
        var cont = []
        cont = await this.simpleTxtPrint()
        if (pdfMake.vfs === undefined) {
          var pdfFonts = require('pdfmake/build/vfs_fonts.js')
          pdfMake.vfs = pdfFonts.pdfMake.vfs
        }
        var docDefinition = {
          content: cont,
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10],
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5],
            },
            tableExample: {
              margin: [0, 5, 0, 15],
            },
            tableOpacityExample: {
              margin: [0, 5, 0, 15],
              fillColor: 'blue',
              fillOpacity: 0.3,
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
              color: 'black',
            },
          },
          defaultStyle: {
          // alignment: 'justify'
          },
        }
        pdfMake.createPdf(docDefinition).download(this.date + '.pdf')
      },
      simpleTxtPrint: async function () {
        console.log(this.user.data.displayName, 'awa')
        var cont = [
          {
            image: imgReq,
            width: 700,
            absolutePosition: { x: 0, y: 0 },
          },
          { text: this.txt, style: 'header' },
          {
            text: 'Petición para el área de sistemas: [225645]',
            absolutePosition: { x: 10, y: 100 },
            fontSize: 15,
            alignment: 'center',
            italics: true,
          },
          {
            text: 'Fecha:',
            absolutePosition: { y: 130 },
            fontSize: 13,
            italics: true,
            alignment: 'right',
          },
          {
            text: '1.Información del socio o datos de referencía',
            absolutePosition: { x: 30, y: 150 },
            fontSize: 13,
            italics: true,
          },
          {
            text: '1asdasda',
            absolutePosition: { x: 50, y: 170 },
            fontSize: 13,
            italics: true,
          },
          {
            text: '2.Tipo de solicitud:',
            absolutePosition: { x: 30, y: 260 },
            fontSize: 13,
            italics: true,
          },
          {
            text: '1asdasda',
            absolutePosition: { x: 50, y: 280 },
            fontSize: 13,
            italics: true,
          },
          {
            text: '3. Motivo o descripción de la solicitud',
            absolutePosition: { x: 30, y: 330 },
            fontSize: 13,
            italics: true,
          },
          {
            text:
              'loresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloresloreslores',
            absolutePosition: { x: 50, y: 350 },
            fontSize: 13,
            italics: true,
          },
          {
            text: '4. Cantidad',
            absolutePosition: { x: 30, y: 470 },
            fontSize: 13,
            italics: true,
          },
          {
            text: '1asdasda',
            absolutePosition: { x: 150, y: 490 },
            fontSize: 13,
            italics: true,
          },
          {
            text: this.user.data.displayName,
            absolutePosition: { x: 260, y: 630 },
            fontSize: 13,
            italics: true,
          },
        ]
        return cont
      },
    },
  }
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
