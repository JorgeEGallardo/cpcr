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
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Sistemas
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Control de permisos de usuario
            </div>
          </template>
          <v-form ref="form">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="nombre"
                    v-model="formData.icon"
                    class="purple-input"
                    outlined
                    label="icono"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="rfc"
                    v-model="formData.title"
                    label="titulo"
                    outlined
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    id="curp"
                    v-model="formData.to"
                    label="to"
                    outlined
                    class="purple-input"
                  />
                  <v-text-field
                    id="curp"
                    v-model="formData.prio"
                    label="to"
                    outlined
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="primary"
                    class="mr-0"
                    @click="createPerm"
                  >
                    Crear permiso
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-container class="py-0">
            <v-btn
              color="primary"
              class="mr-0"
              @click="restartPerm"
            >
              Reiniciar permisos
            </v-btn>
            <v-btn
              color="primary"
              class="mr-0"
              @click="getUsers()"
            >
              Usuarios
            </v-btn>
            <hr>
            <v-select
              v-model="userPerm"
              :items="allUsers"
              label="Standard"
              @change="getUser()"
            />
            <v-form>
              <v-simple-table>
                <thead>
                  <tr>
                    <th />
                    <th class="subheading font-weight-light text-center">
                      Free
                    </th>
                    <th class="subheading font-weight-light text-center">
                      PRO
                    </th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr
                    v-for="item in perm"
                    :key="item"
                  >
                    <td>{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.to }}</td>
                    <td>
                      <v-checkbox
                        v-model="item.inArray"
                        :label="item.inArray"
                        color="primary"
                        value="true"
                        hide-details
                      />
                    </td>
                  </tr>
                  <v-btn @click="updatePerm">
                    Actualizar
                  </v-btn>
                </tbody>
              </v-simple-table>
            </v-form>
          </v-container>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { db } from '@/main'
  export default {
    name: 'App',
    components: {},
    data: () => ({
      links: {},
      userPerm: '',
      allUsers: [],
      perm: [],
      permArray: [],
      formData: {
        to: '',
        icon: '',
        title: '',
        prio: 3,
      },
    }),
    created () {
      this.getUsers()
    },
    methods: {
      perm (icon, title, to) {
        const temp = {
          icon: icon,
          title: title,
          to: to,
        }
        return temp
      },
      createPerm: async function () {
        const data = this.formData
        db.collection('permissions').add({ ...data })
        this.addAllPerm()
      },
      addAllPerm: async function () {
        db.collection('permissions')
          .get()
          .then(snapshot => {
            const perm = []
            snapshot.forEach(doc => {
              perm.push(doc.id)
            })
            alert('Hubo un error')
            db.collection('users')
              .doc('A0LFHdIWxSQoPznjWwwYIKWcnRr1')
              .update({ permissions: perm })
          })
      },
      updatePerm: async function () {
        await db
          .collection('users')
          .where('email', '==', this.userPerm)
          .get()
          .then(snapshot => {
            snapshot.forEach(async doc => {
              try {
                const permToUpdate = []
                this.perm.forEach(elem => {
                  if (elem.inArray === 'true') {
                    if (elem.prio === 1) {
                      permToUpdate.unshift(elem.id)
                    } else {
                      permToUpdate.push(elem.id)
                    }
                  }
                })
                db.collection('users')
                  .doc(doc.id)
                  .update({ permissions: permToUpdate })
              } catch (error) {
                alert(error)
              } finally {
                alert('Registro actualizado con exito')
              }
            })
          })
      },
      getUser: async function () {
        await db
          .collection('users')
          .where('email', '==', this.userPerm)
          .get()
          .then(snapshot => {
            snapshot.forEach(async doc => {
              this.permArray = doc.data().permissions
              this.perm = []
              await db
                .collection('permissions')
                .get()
                .then(snapshot => {
                  snapshot.forEach(element => {
                    if (this.permArray.includes(element.id)) {
                      this.perm.push({
                        ...element.data(),
                        inArray: true,
                        id: element.id,
                      })
                    } else {
                      this.perm.push({
                        ...element.data(),
                        inArray: false,
                        id: element.id,
                      })
                    }
                  })
                })
            })
          })
      },
      getUsers: async function () {
        db.collection('users')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.allUsers.push(doc.data().email)
            })
          })
      },
      restartPerm: async function () {
        await db
          .collection('users')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              const unaffected = [
                'A0LFHdIWxSQoPznjWwwYIKWcnRr1',
                'L0yV9YXWmeb5LlotHX8xW0Qt8uv1',
                'PXhNsledHeTxWWzyOkSkKfDl1Bs1',
                'yi2ArMWGjBRjkSfcXnJlW0hfWQm2',
              ]
              let isUnaffected = false
              for (let i = 0; i < unaffected.length; i++) {
                if (doc.data().uid === unaffected[i]) {
                  isUnaffected = true
                }
              }
              if (!isUnaffected) {
                doc.ref.update({
                  permissions: [
                    'RU2tX44HGpClAr9btgdX',
                    '34SzhwzcB9jMudbZMadF',
                    'UHBm2SuTR71t5SvII6RS',
                    'bQ4NyLYwjeT0QSa1lfDM',
                    't1givUG8hR7SkX1zyLim',
                    'TjL5r1U8ZALNGxA99BLy',
                    'iHlLwYALXc1LEjeTPnXt',
                  ],
                })
              }
            })
          })
      },
    },
  }
</script>
