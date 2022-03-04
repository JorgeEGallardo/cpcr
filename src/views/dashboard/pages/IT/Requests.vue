<template>
  <v-container
    id="addRequestIT"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card
          color="primary"
        >
          <template v-slot:heading>
            <div
              class="text-h3 font-weight-light"
            >
              Hacer una solicitud a sistemas
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Crea un formato de solicitud para el área de sistemas.
            </div>
          </template>
          <base-v-component
            link="components/simple-tables"
          />
          <v-row class="dark--text">
            <v-col cols="6">
              <v-switch
                v-model="done"
                label="Completados"
                @click="tableChange"
              />
            </v-col>
            <v-col cols="6">
              <v-switch
                v-model="deleted"
                label="Eliminados"
                @click="tableChange"
              />
            </v-col>
          </v-row>
          <base-material-card
            icon="mdi-clipboard-text"
            class="px-5 py-3"
            :title="search"
            color="primary"
            style="margin-top:5rem"
          >
            <v-simple-table>
              <thead>
                <tr>
                  <th class="primary--text">
                    Nombre
                  </th>
                  <th class=" primary--text">
                    Descripción
                  </th>
                  <th class="primary--text">
                    Cantidad
                  </th>
                  <th class="primary--text">
                    Razon
                  </th>
                  <th class="primary--text">
                    Fecha
                  </th>
                  <th class="primary--text">
                    Operario
                  </th>
                  <th class="primary--text text-right ">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(item) in table"
                  :key="item.id"
                  :style="color[item.state-1]"
                >
                  <td>{{ item.socio }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.reason }}</td>
                  <td>{{ item.date_cap }}</td>
                  <td>{{ item.user }}</td>
                  <td style="max-width:7rem">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="red"
                      @click="deleteState(item.state, item.id)"
                    >
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                    <v-btn
                      class="ml-2"
                      fab
                      dark
                      small
                      :color="item.state === 1 ? 'success': 'amber'"
                      @click="updateState(item.state, item.id)"
                    >
                      <v-icon
                        dark
                      >
                        {{ item.state === 1 ? 'mdi-check-circle': 'mdi-reload' }}
                      </v-icon>
                    </v-btn>
                    <pdf
                      :request="item.id"
                      only
                    />
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </base-material-card>
          <base-v-component />
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

    <script>
  import { db } from '@/main'
  export default {
    components: { pdf: () => import('./pdf') },
    data: () => ({
      info: [],
      search: '',
      done: false,
      deleted: false,
      color: ['background-color:#607D8B; color:white;', 'background-color:#009688; color:white;', 'background-color:#FF5722; color:white;'],
    }),
    computed: {
      // a computed getter
      table: function () {
        const table = this.info.filter((element) => {
          return (element.state === 1 || ((element.state === 2) && this.done) || ((element.state === 3) && this.deleted))
        })

        return table
      },
    },
    created () {
      db.collection('IT').orderBy('state').onSnapshot(dataSnapshot => {
        dataSnapshot.forEach(element => {
          const tmp = {
            description: element.data().description,
            socio: element.data().socio,
            quantity: element.data().quantity,
            reason: element.data().reason,
            date_cap: element.data().date_cap.toDate().toLocaleDateString('es-MX'),
            user: element.data().user,
            state: element.data().state,
            id: element.id,
          }
          this.info.push(tmp)
        })
      })
    },
    updated () {
    },
    methods: {
      tableChange () {
        // this.table = this.info.filter((element) => { return (element.state === 1 || (element.state === 2) === this.done) })
      },
      updateState: async function (state, id) {
        const newState = state === 1 ? 2 : 1
        this.info = []
        await db.collection('IT').doc(id).update({ state: newState }).then(res => {}).catch(error => { alert('No se pudo actualizar el registro' + error) })
      },
      deleteState: async function (state, id) {
        if (state !== 3) { this.info = [] }
        await db.collection('IT').doc(id).update({ state: 3 }).then(res => {}).catch(error => { alert('No se pudo actualizar el registro' + error) })
      },
    },
  }
    </script>
