<template>
  <v-data-table
    :headers="headers"
    :items="transferencia2"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :items-per-page="30"
    show-expand
    :search="search"
    :footer-props="{
      showFirstLastPage: true,
      itemsPerPageOptions: [30, -1],
    }"
    dense
  >
    <template v-slot:top>
      <v-text-field
        v-model="search"
        label="Busqueda por fecha (Formato: AAAA-MM-DD)"
      />
    </template>
    <template v-slot:[`body.append`]>
      <tr>
        <td />
        <td>
          <v-select
            v-model="sucursal"
            :items="['Matriz', 'Centro', 'Salto', 'Sombrerete', '']"
            label="Sucursal"
          />
        </td>
        <td colspan="4" />
      </tr>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        color="red"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        aaaaa {{ item.descripcion }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
  import { mapState } from 'vuex'
  import { db } from '@/main'

  export default {
    data () {
      return {
        expanded: [],
        singleExpand: true,
        search: '',
        transferencia2: [],
        transferencia: [],
        sucursal: '',
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
      headers () {
        return [
          {
            text: 'Numero de socio',
            align: 'start',
            sortable: false,
            value: 'numeroSocio',
          },
          {
            text: 'Sucursal',
            value: 'sucursal',
            filter: value => {
              if (!this.sucursal) return true

              return value === this.sucursal
            },
          },
          { text: 'Nombre', value: 'nombreSocio', sortable: false },
          { text: 'Cantidad', value: 'cantidad', sortable: false },
          { text: 'Producto', value: 'producto', sortable: false },
          { text: 'Fecha Transacción', value: 'fechaTra' },
          { text: 'Eliminar', value: 'actions', sortable: false, align: 'center' },
          { text: 'Id', value: 'id', align: ' d-none', sortable: false },
          { text: 'Descripcion', value: 'descripcion', align: ' d-none', sortable: false },
          { text: 'Mostrar descripcion', value: 'data-table-expand' },
        ]
      },
    },
    created () {
      db.collection('transfList')
        .get()
        .then(res => {
          res.forEach(doc => {
            this.transferencia2.push({ id: doc.id, ...doc.data() })
          })
        })
    },
    methods: {
      async refTable () {
        try {
          await db
            .collection('transfList')
            .get()
            .then(res => {
              res.forEach(doc => {
                this.transferencia2.push({ id: doc.id, ...doc.data() })
              })
            })
        } catch (error) {
          alert('Hubó un error')
        }
      },
      async deleteItem (item) {
        try {
          await db
            .collection('transfList')
            .doc(item.id)
            .delete()
          this.transferencia2 = []
          this.refTable()
        } catch (error) {
          alert('Hubo un error')
        }
      },
    },
  }
</script>
<style scoped>
.center {
  text-align: center;
}
</style>
