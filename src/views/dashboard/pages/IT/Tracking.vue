<!--
Componente para mostrar las peticiones hechas por este usuario
--->
<template>
  <v-container
    id="regular-tablesS"
    fluid
    tag="section"
  >
    <base-v-component
      link="components/simple-tables"
    />
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
              ID
            </th>
            <th class="primary--text">
              Socio
            </th>
            <th class="primary--text">
              Motivo
            </th>
            <th class="primary--text">
              Estado
            </th>
            <th class=" primary--text">
              Fecha
            </th>
            <th class=" primary--text">
              Ver
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item) in info"
            :key="item.id"
          >
            <td>{{ item.id.substring(0,6) }}</td>
            <td>
              {{ item.socio }}
            </td>
            <td>
              {{ item.reason }}
            </td>
            <td>
              {{ item.state }}
            </td>
            <td>
              {{ item.date_cap }}
            </td>
            <td>
              <pdf :request="item.id" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
    <base-v-component />
  </v-container>
</template>

    <script>
  import { db } from '@/main'
  export default {
    components: { pdf: () => import('./pdf') },
    data: () => ({
      user: '',
      dialog: false,
      info: [],
      search: '',
      states: ['Solicitada', 'Proceso', 'Completada', 'Rechazada'],
    }),
    created () {
      this.user = this.$store.state.user.data.displayName
      db.collection('IT').where('user', '==', this.user).orderBy('state').onSnapshot(dataSnapshot => {
        dataSnapshot.forEach(element => {
          const today = element.data().date_cap.toDate()
          const date = today.getDate() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear()
          const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
          const dateTime = date + ' ' + time
          this.date = dateTime
          const tmp = {
            socio: element.data().socio,
            reason: element.data().reason,
            quantity: element.data().quantity,
            date_cap: dateTime,
            user: element.data().user,
            state: this.states[element.data().state],
            id: element.id,
          }
          this.info.push(tmp)
        })
      })
    },
    methods: {
    },
  }
    </script>
