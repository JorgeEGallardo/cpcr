<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <!-- Header -->
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          <v-icon>mdi-file-chart</v-icon> Metas (?)
        </div>

        <div class="text-subtitle-1 font-weight-light">
          cobranza, recuperacion, captacion y llamadas de cortesia
        </div>
      </template>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="6"
        >
          <cpcr-goals :info="metas.Matriz" />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <cpcr-goals :info="metas.Centro" />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <cpcr-goals :info="metas.Salto" />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <cpcr-goals :info="metas.Sombrerete" />
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>
<script>
  import CpcrGoals from './goalsComponent.vue'
  import { mapState } from 'vuex'
  import { db } from '@/main'
  export default {
    components: { CpcrGoals },
    data () {
      return {
        metas: [],
        visible: false,
      }
    },
    computed: {
      ...mapState(['barColor', 'barImage', 'user']),
    },
    created () {
      this.refTable()
    },
    methods: {
      async refTable () {
        await db
          .collection('Goals')
          .doc('sucursales')
          .get()
          .then(res => {
            this.metas = res.data()
          })
      },
    },
  }
</script>
