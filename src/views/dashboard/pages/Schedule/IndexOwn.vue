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
              Calendario corporativo
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Calendario para planear tareas del corporativo
            </div>
          </template>
          <calendar></calendar>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import calendar from './CalendarOwn.vue'

  export default {
    name: 'App',
    components: {
      calendar,
    },
    data: () => ({
      //
    }),
  }
</script>
