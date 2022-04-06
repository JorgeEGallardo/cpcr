<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="coleccion"
          :items="['ChartSucursales', 'charts']"
          label="Colección"
          @change="test"
        />
      </v-col>
      <v-col>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="fecha"
              label="Fecha"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="fecha"
            @input="datepick = false"
          />
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field
          v-model="cantidad"
          label="Cantidad"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="categoria"
          :items="documento"
          label="Categoria"
        />
      </v-col>
    </v-row>
    <v-btn
      class="primary"
      @click="update(categoria)"
    >
      enviar
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        menu: false,
        categoria: '',
        fecha: new Date(Date.now()).toISOString().substr(0, 10),
        cantidad: '',
        temporal: [],
        temporal2: [],
        opciones: '',
        documento: [],
        coleccion: '',
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created () {
      this.test()
    },
    methods: {
},
  }
</script>
