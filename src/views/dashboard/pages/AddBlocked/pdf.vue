<template>
  <span style="margin:0px">
    <v-btn
      v-if="!detail"
      class="mt-n2 ml-4"
      elevation="1"
      fab
      small
      color="primary"
      @click="pdfPrint"
    >
      <v-icon> mdi-cloud-download</v-icon>
    </v-btn>
    <div v-if="detail">
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
      <v-switch
        v-if="masive"
        v-model="clients"
        label="Agregar socios consultados"
      />
    </div>
  </span>
</template>

<script>
  import pdfMake from 'pdfmake/build/pdfmake'
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import { testImageDataUrl } from '@/assets/fondo.js'
  export default {
    name: 'Pdfgen',
    props: {
      find: { type: String, default: null },
      msg: { type: String, default: 'none' },
      txt: { type: String, default: 'Personas bloqueadas' },
      txtp: { type: String, default: 'Personas bloqueadas' },
      person: { type: String, default: null },
      curp: { type: String, default: null },
      rfc: { type: String, default: null },
      simple: { type: Boolean, default: false },
      masive: { type: Boolean, default: false },
      detail: { type: Boolean, default: false },
    },
    data () {
      return {
        count: 0,
        body: { type: Array, default: () => [] },
        date: new Date(),
        clients: false,
        title: this.date + this.find + this.person + '.pdf',
      }
    },
    computed: {
      // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
        user: 'user',
      }),
    },
    watch: {
      // This would be called anytime the value of title changes
      find (newValue) {
        this.find = newValue
      },
      txtp (newValue) {
        this.find = newValue
      },
    },
    created () {
      const today = new Date()
      const date = today.getDate() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      this.date = dateTime
    },
    methods: {
      pdfPrint: async function () {
        var api = ''
        if (this.person != null || this.curp != null || this.rfc != null) {
          this.person = this.person == null ? 'SN nombre' : this.person
          this.curp = this.curp == null || this.curp === '-1' ? 'SN curp' : this.curp
          this.rfc = this.rfc == null || this.rfc === '-1' ? 'SN rfc' : this.rfc
          api = this.person + '/' + this.rfc + '/' + this.curp
        } else {
          api = this.find
        }
        var info = ''
        var route = this.masive ? 'http://10.35.1.106:8000/api/masive/' : 'http://10.35.1.106:8000/api/blocked/' + api
        var cont = []
        if (this.masive) {
          cont = await this.masivePrint(route, info, cont)
        } else if (this.simple) {
          cont = await this.simpleTxtPrint()
        } else {
          cont = await this.simpleSearchPrint(route, info, cont)
        }
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
        pdfMake.createPdf(docDefinition).download(this.title)
      },
      masivePrint: async function (route, info, cont) {
        alert('Calculado datos')
        cont = await axios
          .get(route)
          .then(response => {
            alert('Calculo de coincidencias completado')
            info = response.data[0]
            this.body = []
            this.coincidencias = 0
            this.body.push([{ text: 'Nombre completo', style: 'tableHeader' }, { text: 'RFC', style: 'tableHeader' }, { text: 'CURP', style: 'tableHeader' }, { text: 'Nombre B', style: 'tableHeader' }, { text: 'RFC B', style: 'tableHeader' }, { text: 'CURP B', style: 'tableHeader' }])

            info.forEach(element => {
              var tmp = [{ text: element.nombre }, { text: element.rfc }, { text: element.curp_rfc }, { text: element.bnombre }, { text: element.brfc }, { text: element.bcurp }]
              this.body.push(tmp)
              this.count++
            })

            info = response.data[1]
            this.bodyAD = []
            this.bodyAD.push([{ text: 'Nombre completo', style: 'tableHeader' }, { text: 'RFC', style: 'tableHeader' }, { text: 'CURP', style: 'tableHeader' }])
            if (this.clients === true) {
              info.forEach(element => {
                var tmp = [{ text: element.nombre }, { text: element.rfc }, { text: element.curp_rfc }]
                this.bodyAD.push(tmp)
              })
            }
            var cont = [
              {
                image: testImageDataUrl,
                width: 700,
                absolutePosition: { x: 0, y: 0 },
              },
              { text: this.user.data.displayName + this.date, fontSize: 15, alignment: 'right' },
              ' \n\n\n\n\n\n\n\n\n\n',
              { text: this.txt, style: 'header' },
              { text: 'Coincidencias: ' + (this.count === 0 ? 'Sin coincidencias' : this.count), fontSize: 12, italics: true, margin: [0, 20, 0, 8] },
              {
                style: 'tableExample',
                table: {
                  headerRows: 1,
                  body: this.body,
                },
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1
                  },
                  vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1
                  },
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray'
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'
                  },
                },
              },
              {
                image: testImageDataUrl,
                width: 700,
                absolutePosition: { x: 0, y: 0 },
              },
              { text: this.user.data.displayName + ' ' + this.date, fontSize: 15, alignment: 'right' },
              ' \n\n\n\n\n\n\n\n\n\n',
              { text: this.txt, style: 'header' },
              { text: 'Personas buscadas: ', fontSize: 12, italics: true },
              {
                style: 'tableExample',
                table: {
                  headerRows: 1,
                  body: this.bodyAD,
                },
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1
                  },
                  vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1
                  },
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray'
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'
                  },
                },
              },
            ]
            return cont
          }).catch(function (error) {
            alert(error, 'wew')
          })
        return cont
      },
      simpleSearchPrint: async function (route, info, cont) {
        cont = await axios
          .get(route)
          .then(response => {
            info = response.data
            this.body = []
            this.coincidencias = 0
            this.body.push([{ text: 'Nombre completo', style: 'tableHeader' }, { text: 'RFC', style: 'tableHeader' }, { text: 'CURP', style: 'tableHeader' }])

            info.forEach(element => {
              var tmp = [{ text: element.nombre }, { text: element.rfc }, { text: element.curp }]
              this.body.push(tmp)
              this.count++
            })

            var cont = [
              {
                image: testImageDataUrl,
                width: 700,
                absolutePosition: { x: 0, y: 0 },
              },
              { text: this.user.data.displayName + ' ' + this.date, fontSize: 15, alignment: 'right' },
              ' \n\n\n\n\n\n\n\n\n\n',
              { text: this.txt, style: 'header' },
              { text: 'Persona buscada: ' + (this.person ??= this.find ??= ''), fontSize: 12, italics: true },
              { text: 'Coincidencias: ' + (this.count === 0 ? 'Sin coincidencias' : this.count), fontSize: 12, italics: true, margin: [0, 20, 0, 8] },
              {
                style: 'tableExample',
                table: {
                  headerRows: 1,
                  body: this.body,
                },
                layout: {
                  hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1
                  },
                  vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1
                  },
                  hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray'
                  },
                  vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'
                  },
                },
              },
            ]
            return cont
          }).catch(function (error) {
            alert(error)
          })
        return cont
      },
      simpleTxtPrint: async function () {
        var cont = [
          {
            image: testImageDataUrl,
            width: 700,
            absolutePosition: { x: 0, y: 0 },
          },
          { text: this.user.data.displayName + ' ' + this.date, fontSize: 15, alignment: 'right' },
          ' \n\n\n\n\n\n\n\n\n\n',
          { text: this.txt, style: 'header' },
          { text: 'Análisis de coincidencias: ', fontSize: 12, italics: true },
          { text: this.txtp, fontSize: 12, margin: [0, 20, 0, 8] },
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
