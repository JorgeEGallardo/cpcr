<template>
  <v-container
    id="regular-tablesS"
    fluid
    tag="section"
  >
    <base-v-component
      link="components/simple-tables"
    />
    <v-text-field
      v-model="search"
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 555px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <pdf :find="search" />
      </template>
    </v-text-field>
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
              CURP
            </th>
            <th class="primary--text">
              RFC
            </th>
            <th class="primary--text">
              Fecha
            </th>
            <th class="primary--text">
              Operariosss
            </th>
            <th class="primary--text text-right ">
              Accionessss
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item) in table"
            :key="item.id"
            :style="color[item.state-1]"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.curp }}</td>
            <td>{{ item.rfc }}</td>
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
                :person="item.name"
                :rfc="item.rfc"
                :curp="item.curp"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
    <base-v-component />
  </v-container>
</template>

    <script>
  import axios from 'axios'
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
      db.collection('requests').orderBy('state').onSnapshot(dataSnapshot => {
        dataSnapshot.forEach(element => {
          const today = element.data().date_cap.toDate()
          const date = today.getDate() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear()
          const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
          const dateTime = date + ' ' + time
          this.date = dateTime
          const tmp = {
            name: element.data().name,
            curp: element.data().curp,
            rfc: element.data().rfc,
            date_cap: dateTime,
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
        await db.collection('requests').doc(id).update({ state: newState }).then(res => {}).catch(error => { alert('No se pudo actualizar el registro' + error) })
      },
      deleteState: async function (state, id) {
        if (state !== 3) { this.info = [] }
        await db.collection('requests').doc(id).update({ state: 3 }).then(res => {}).catch(error => { alert('No se pudo actualizar el registro' + error) })
      },
      search2 () {
        const api = this.search.toUpperCase()
        axios
          .get('http://192.168.0.99:8000/api/blocked/' + api)
          .then(response => {
            this.info = response.data
          })
          .catch(function (error) {
            alert(error)
          })
      },
      pdfPrint () {
        const api = this.search.toUpperCase()
        axios
          .get('http://192.168.0.99:800/api/blocked/' + api)
          .then(response => {
            this.info = response.data
          })
          .catch(function (error) {
            alert(error)
          })
      },
    },
  }
    </script>