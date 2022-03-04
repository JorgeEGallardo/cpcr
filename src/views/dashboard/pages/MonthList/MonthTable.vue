<template>
  <v-container
    id=""
    fluid
    tag="section"
  >
    <base-material-card color="primary">
      <template v-slot:heading>
        <div class="text-h3 font-weight-light">
          Regulatorios
        </div>

        <div class="text-subtitle-1 font-weight-light">
          to do list
        </div>
      </template>
      <v-btn
        color="primary"
        class="mr-2"
        @click="showAll(listShow)"
      >
        Mostrar todos
      </v-btn>
      <v-btn
        color="primary"
        class="mx-auto"
        @click="resetAll(estilo)"
      >
        Reiniciar todos
      </v-btn>
      <v-simple-table
        fixed-header
        height="my-auto"
        dense
      >
        <template>
          <thead>
            <tr>
              <th class="text-left primary--text">
                Estado
              </th>
              <th class="text-center primary--text">
                Regulatorio
              </th>
              <th class="text-center primary--text">
                Reporte
              </th>
              <th class="text-center primary--text">
                Carga
              </th>
              <th class="text-center primary--text">
                Periodo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in regus"
              v-show="listShow[r.id]"
              :key="r"
              :style="estilo[r.id]"
            >
              <td class="mt-1 center">
                <v-btn
                  height="50"
                  small
                  depressed
                  outlined
                  class="px-2 py-2 mr-2 circulo borderB"
                  @click="colorEstilo(1, r.id)"
                >
                  <v-icon>mdi-file-outline</v-icon>
                </v-btn>
                <v-btn
                  height="50"
                  small
                  depressed
                  outlined
                  class="px-2 py-2 mr-2 circulo borderG"
                  @click="colorEstilo(2, r.id)"
                >
                  <v-icon>mdi-file-upload-outline</v-icon>
                </v-btn>
                <v-btn
                  height="50"
                  small
                  depressed
                  outlined
                  class="pa-2 py-2 mr-2 circulo borderP"
                  @click="colHide(r.id)"
                >
                  <v-icon>mdi-file-send-outline</v-icon>
                </v-btn>
              </td>
              <td class="center">
                {{ r.regulatorio }}
              </td>
              <td class="sides center">
                {{ r.reporte }}
              </td>
              <td class="center">
                {{ r.carga }}
              </td>
              <td class="center">
                {{ r.periodo }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        // de aqui se toman los valores pera cambiar de color las filas
        color: [
          'background-color:#64B5F6; color:#1976D2;',
          'background-color:#81C784; color:#1B5E20;',
        ],
        // para establecer el color de fondo y texto predeterminado para las filas
        estilo: [
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
          'background-color:#C5CAE9; color:#1A237E;',
        ],
        // Para establecer la visiblidad de la columna
        listShow: [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],

        // Informacion hardcodeada para rellenar la tabla
        regus: [
          {
            regulatorio: 'R01-A0111',
            reporte: 'CATALOGO MINIMO (291130)',
            carga: '*CARGA Y VALIDADO',
            periodo: 'MENSUAL',
            contabilidad: 'C',
            id: 0,
          },
          {
            regulatorio: 'R20-A 2011',
            reporte: 'DESAGREGADO COEFICIENTE DE LIQUIDEZ (292011)',
            carga: '*CARGA Y VALIDADO',
            periodo: 'MENSUAL',
            contabilidad: 'C',
            id: 1,
          },
          {
            regulatorio: 'R21-A 2112',
            reporte:
              'DESAGREGADO REQUERIMIENTOS DE CAPITAL POR RIESGOS (2921122)',
            carga: '*CARGA Y VALIDADO',
            periodo: 'MENSUAL',
            contabilidad: 'C',
            id: 2,
          },
          {
            regulatorio: 'R03-I 391',
            reporte:
              'DESAGREGADO DE TÍTULOS EN INVERSIONES VALORES Y REPORTO (1131)',
            carga: 'CARGA Y VALIDADO',
            periodo: 'MENSUAL',
            contabilidad: 'C',
            id: 3,
          },
          {
            regulatorio: 'R09-C 922',
            reporte: 'DESAGREGADO GASTOS DE OPERACIÓN PROMOCIÓN EACP (1108',
            carga: 'CARGA Y VALIDADO',
            periodo: 'TRIMESTRAL',
            contabilidad: 'C',
            id: 4,
          },
          {
            regulatorio: 'R04-A',
            reporte: 'CARTERA POR TIPO DE CRÉDITO 417 (290417)',
            carga: 'CARGA Y VALIDADO',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 5,
          },
          {
            regulatorio: 'R04-A',
            reporte: 'CARTERA POR TIPO DE CRÉDITO 419 (290419)',
            carga: 'CARGA Y VALIDADO',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 6,
          },
          {
            regulatorio: 'R24-D 2441',
            reporte:
              'INFORMACIÓN GENERAL SOBRE EL USO DE SERVICIOS FINANCIEROS (1774)',
            carga: 'CARGA Y VALIDADO',
            periodo: 'TRIMESTRAL',
            contabilidad: '',
            id: 7,
          },
          {
            regulatorio: 'R24-D 2442',
            reporte:
              'INFORMACIÓN DE FRECUENCIA DE USO DE SERVICIOS FINANCIEROS (1775)',
            carga: 'CARGA Y VALIDADO',
            periodo: 'TRIMESTRAL',
            contabilidad: '',
            id: 8,
          },
          {
            regulatorio: 'R24-D 2443',
            reporte:
              'INFORMACIÓN DE UBICACIÓN DE LOS PUNTOS DE TRANSACCIONES DE SERVICIOS FINANCIEROS (1882)',
            carga: 'CARGA Y VALIDADO',
            periodo: 'TRIMESTRAL',
            contabilidad: '',
            id: 9,
          },
          {
            regulatorio: 'R08-D 841',
            reporte: 'DESAGREGADO DE DEPÓSITOS DE SOCIOS (29084101)',
            carga: 'CARGA Y VALIDADO',
            periodo: 'TRIMESTRAL',
            id: 10,
          },
          {
            regulatorio: 'R24-B 2422',
            reporte: '',
            carga: 'CARGA Y VALIDADO',
            periodo: 'TRIMESTRAL',
            contabilidad: '',
            id: 11,
          },
          {
            regulatorio: 'R04-C 451',
            reporte:
              'DESAGREGADO DE CREDITOS AL CONSUMO, VIVIENDA Y COMERCIAL (29045101)',
            carga: 'CARGA Y VALIDADO',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 12,
          },
          {
            regulatorio: 'R17',
            reporte: 'DESIGNACIONES Y BAJA DE PERSONAL',
            carga: ' ',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 13,
          },
          {
            regulatorio: 'R04-I 453',
            reporte: 'DESAGREGADO DE CARTERA DE CREDITO CASTIGADA (1161)',
            carga: 'CARGA Y VALIDADO (blanco)',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 14,
          },
          {
            regulatorio: 'R08-D 8422',
            reporte:
              'DESAGREGADO DE PRESTAMOS BANCARIOS Y DE OTROS ORGANISMOS (1117)',
            carga: 'CARGA Y VALIDADO (blanco)',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 15,
          },
          {
            regulatorio: 'R26-A 2610',
            reporte: 'ALTAS Y BAJAS ADMINISTRADORES (1643)',
            carga: 'CARGA Y VALIDADO (blanco)',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 16,
          },
          {
            regulatorio: 'R26-A 2611',
            reporte: 'ALTAS Y BAJAS COMISIONISTAS (1644)',
            carga: 'CARGA Y VALIDADO (blanco)',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 17,
          },
          {
            regulatorio: 'R26-B 2612',
            reporte: 'ALTAS Y BAJAS MÓDULOS (1645)',
            carga: 'CARGA Y VALIDADO (blanco)',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 18,
          },
          {
            regulatorio: 'R26-C 2613',
            reporte: 'DESAGREGADO OPERACIONES COMISIONISTAS (1646)',
            carga: 'CARGA Y VALIDADO (blanco)',
            periodo: 'MENSUAL',
            contabilidad: '',
            id: 19,
          },
          {
            regulatorio: '',
            reporte: 'Reporte detallado COVID',
            carga: '*Carga Y validado',
            periodo: 'MENSUAL',
            contabilidad: 'C',
            id: 20,
          },
        ],
      }
    },
    methods: {
      // Reinicia la tabla al estado inicial
      resetAll (element) {
        for (let i = 0; i < element.length; i++) {
          element[i] = 'background-color:#C5CAE9; color:#1A237E;'
        }
        const temp = this.regus
        this.regus = {}
        this.regus = temp
      },
      // Muestra las todas las filas ocultas
      showAll (element) {
        for (let i = 0; i < element.length; i++) {
          element[i] = true
        }
        const temp = this.regus
        this.regus = {}
        this.regus = temp
      },
      // Oculta una fila seleccionada
      colHide (visibilidad) {
        this.listShow[visibilidad] = false
        const temp = this.regus
        this.regus = {}
        this.regus = temp
      },
      // cambia el color de fondo de una fila seleccionada
      colorEstilo (posicion, estilo) {
        this.estilo[estilo] = this.color[posicion - 1]
        const temp = this.regus
        this.regus = {}
        this.regus = temp
      },
    },
  }
</script>
<style scoped>
.sides {
  width: 20%;
}
.center {
  text-align: center;
}
.circulo {
  border-radius: 100%;
}
.borderB {
  background-color: #64b5f6;
  border: 2px solid #0288d1;
}
.borderG {
  background-color: #81c784;
  border: 2px solid #388e3c;
}
.borderP {
  background-color: #4db6ac;
  border: 2px solid #00796b;
}
</style>
