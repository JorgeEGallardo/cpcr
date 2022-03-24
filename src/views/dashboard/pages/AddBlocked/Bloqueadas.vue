<!--
Componente para traer las personas que coincidan con la busqueda y se encuentren en la base de personas bloqueadas
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
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
          color="primary"
          @click="search2"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <pdf :find="search" />
      </template>
    </v-text-field>
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
              Nombre
            </th>
            <th class="primary--text">
              Folio
            </th>
            <th class="primary--text">
              RFC
            </th>
            <th class="text-right primary--text">
              CURP
            </th>
            <th class="text-right primary--text">
              Editar
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in info"
            :key="item.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.nombre }}</td>
            <td v-if="item.folio!=-1">
              {{ item.folio }}
            </td>
            <td v-else>
              {{ ' ' }}
            </td>
            <td v-if="item.rfc!=-1">
              {{ item.rfc }}
            </td>
            <td v-else>
              {{ ' ' }}
            </td>
            <td v-if="item.curp!=-1">
              {{ item.curp }}
            </td>
            <td v-else>
              {{ ' ' }}
            </td>
            <td>
              <v-btn
                color="primary"
                dark
                @click="edit(item.id)"
              >
                Editar
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
    <base-v-component />
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="Legal first name*"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="Legal middle name"
                      hint="example of helper text only on focus"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="Legal last name*"
                      hint="example of persistent helper text"
                      persistent-hint
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      type="password"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      :items="['0-17', '18-29', '30-54', '54+']"
                      label="Age*"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-autocomplete
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                      label="Interests"
                      multiple
                    />
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>

    <script>
  import axios from 'axios'
  export default {
    components: { pdf: () => import('./pdf.vue') },
    data: () => ({
      dialog: false,
      info: null,
      search: '',
    }),
    methods: {
      edit (id) {
        this.dialog = true
        const api = id
        axios
          .get('http://10.35.1.106:8000/api/blocked/one/' + api)
          .then(response => {
            const resp = response.data
            alert(resp)
            // //console.log(response.data)
          })
          .catch(function (error) {
            alert(error)
          })
      },
      search2 () {
        const api = this.search.toUpperCase()
        axios
          .get('http://10.35.1.106:8000/api/blocked/' + api)
          .then(response => {
            this.info = response.data
            // //console.log(response.data)
          })
          .catch(function (error) {
            alert(error)
          })
      },
    },
  }
    </script>
