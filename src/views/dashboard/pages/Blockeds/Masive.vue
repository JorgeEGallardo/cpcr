<!--/**
* !Componente para traer las personas que coincidan con la busqueda y se encuentren en la base de personas bloqueadas
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
    <v-container
      id="addPersona"
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
                Busqueda masiva
              </div>

              <div class="text-subtitle-1 font-weight-light">
                Generar proceso masivo para buscar socios en las listas bloqueadas.
              </div>
            </template>
            <pdf
              fancy
              masive
              detail
            />
          </base-material-card>
        </v-col>
      </v-row>
    </v-container>

    <base-v-component />
    <v-container
      id="addPersona"
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
                Análisis de la busqueda masiva.
              </div>

              <div class="text-subtitle-1 font-weight-light">
                Generar reporte sobre analisis de coincidencias.
              </div>
            </template>
            <v-textarea
              v-model="txtA"
              solo
              name="input-60-4"
              label="Análisis"
              counter
            />
            <pdf
              detail
              simple
              :txtp="txtA"
            />
          </base-material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

    <script>
  export default {
    components: { pdf: () => import('./pdf.vue') },
    data: () => ({
      info: [],
      txtA: '',
      clients: false,
      color: ['background-color:#607D8B; color:white;', 'background-color:#009688; color:white;', 'background-color:#FF5722; color:white;'],
    }),
    computed: {
      // a computed getter
      table: function () {
        const table = this.info.filter((element) => { return (element.state === 1 || (element.state === 2) === this.done || (element.state === 3) === this.deleted) })
        return table
      },
    },
  }
    </script>
