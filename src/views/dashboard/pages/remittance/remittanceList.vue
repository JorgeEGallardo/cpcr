<template>
  <v-data-table
    :headers="headers"
    :items="remesas"
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
        @click="deleteItem(item)"
        color="red"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        {{ item.descripcion }}
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
        remesas: [],
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
          { text: 'Efectivo', value: 'efectivo', sortable: false },
          { text: 'Producto', value: 'producto', sortable: false },
          { text: 'Fecha deposito', value: 'fechaRem' },
          { text: 'Movimiento en caja', value: 'fechaMov' },
          { text: 'Eliminar', value: 'actions', sortable: false, align: 'center' },
          { text: 'Id', value: 'id', align: ' d-none', sortable: false },
          { text: 'Descripcion', value: 'descripcion', align: ' d-none', sortable: false },
          { text: 'Mostrar descripcion', value: 'data-table-expand' },
        ]
      },
    },
    created () {
      db.collection('remittanceList').orderBy('fechaMov', 'desc')
        .get()
        .then(res => {
          res.forEach(doc => {
            this.remesas.push({ id: doc.id, ...doc.data() })
          })
        })
    },
    methods: {
      async refTable () {
        try {
          await db
            .collection('remittanceList')
            .get()
            .then(res => {
              res.forEach(doc => {
                this.remesas.push({ id: doc.id, ...doc.data() })
              })
            })
        } catch (error) {
          alert('Hubó un error')
        }
      },
      async deleteItem (item) {
        try {
          await db
            .collection('remittanceList')
            .doc(item.id)
            .delete()
          this.remesas = []
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
