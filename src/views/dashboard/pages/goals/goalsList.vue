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
      <cpcr-goals :info="metas[0]" />
      <cpcr-goals :info="metas[1]" />
      <cpcr-goals :info="metas[2]" />
      <cpcr-goals :info="metas[3]" />
      <v-btn @click="test">
        ñ
      </v-btn>
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
        db.collection('Goals')
          .doc('sucursales')
          .get()
          .then(res => {
            console.log(res)
            // res.forEach(doc => {
            //   console.log(doc.data)
            // })
          })
      },
    },
  }
</script>
