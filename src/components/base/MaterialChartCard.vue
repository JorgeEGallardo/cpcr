<template>
  <base-material-card
    class="v-card--material-chart"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:heading>
      <chartist
        ratio="ct-chart"
        type="Pie"
        :data="chartData"
        :options="chartOptions"
      />
    </template>

    <slot
      slot="reveal-actions"
      name="reveal-actions"
    />

    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </base-material-card>
</template>

<script>
  export default {
    name: 'MaterialChartCard',
    inheritAttrs: false,
    data: function () {
      return {
        chartData: {
          labels: ['A', 'B', 'C'],
          series: [46, 72, 84],
        },
        chartOptions: {
          donut: true,
          donutWidth: 30,
          startAngle: 270,
          total: 400,
          chartpadding: 30,
          labelOffset: 50,
          labelDirectuion: 'explode',
          labelInterpolationFnc: function (value) {
            return value[0]
          },
        },
      }
    },
  // props: {
  //   data: {
  //     type: Object,
  //     default: () => ({}),
  //   },
  //   eventHandlers: {
  //     type: Array,
  //     default: () => [],
  //   },
  //   options: {
  //     type: Object,
  //     default: () => ({}),
  //   },
  //   ratio: {
  //     type: String,
  //     default: undefined,
  //   },
  //   responsiveOptions: {
  //     type: Array,
  //     default: () => [],
  //   },
  //   type: {
  //     type: String,
  //     required: true,
  //     validator: v => ['Bar', 'Line', 'Pie'].includes(v),
  //   },
  // },
  // data: function () {
  //   return [1, 2, 3]
  // },
  }
</script>

<style lang="sass">
.v-card--material-chart
  p
    color: #999

  .v-card--material__heading
    max-height: 185px

    .ct-label
      color: inherit
      opacity: .7
      font-size: 0.975rem
      font-weight: 100

    .ct-grid
      stroke: rgba(255, 255, 255, 0.2)

    .ct-series-a .ct-point,
    .ct-series-a .ct-line,
    .ct-series-a .ct-bar,
    .ct-series-a .ct-slice-donut
        stroke: rgba(255,255,255,.8)

    .ct-series-a .ct-slice-pie,
    .ct-series-a .ct-area
        fill: rgba(255,255,255,.4)
</style>
