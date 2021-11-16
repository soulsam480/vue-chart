# 📊 Chart.js 3 for Vue 3

Fork of https://github.com/victorgarciaesgi/vue-chart-3

### Why ?
- only vue 3
- fully tree shaked
- proper types and volar support
- written with \<script setup\> instead of render functions

### Caveats
- no hooks (may add later if I have time)

![npm](https://img.shields.io/npm/v/@soulsam480/vue-chart) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@soulsam480/vue-chart) ![GitHub](https://img.shields.io/github/license/soulsam480/vue-chart-3) ![npm](https://img.shields.io/npm/dm/@soulsam480/vue-chart)

### Installation

```bash
npm i @soulsam480/vue-chart
#or
yarn add @soulsam480/vue-chart
#or
pnpm i @soulsam480/vue-chart
```


### Docs

__https://vue-chart-3.netlify.app/__

As this is just a rewrite of https://github.com/victorgarciaesgi/vue-chart-3, the docs should be the same mostly, leaving `hooks`.

__Passing refs__

Due to the `design decisions` of this approach, passing refs to `chart components` is a bit different. Normally you'd pass a `ref` prop, but here you need to pass a function which returns the ref.
e.g.
```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DoughnutChart } from '@soulsam480/vue-chart';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

const dataValues = ref([30, 40, 60, 70, 5]);
const toggleLegend = ref(true);

const testData = computed<ChartData<'doughnut'>>(() => ({
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}));

const options = computed<ChartOptions<'doughnut'>>(() => ({
  scales: {
    myScale: {
      type: 'logarithmic',
      position: toggleLegend.value ? 'left' : 'right',
    },
  },
  plugins: {
    legend: {
      position: toggleLegend.value ? 'top' : 'bottom',
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart',
    },
  },
}));

const chartRef = ref<Chart<'doughnut'> | null>(null);

// will be available only after first render
// use nextTick() or add a check to see if it's been assigned or not
const assignRef = () => chartRef;

watch(chartRef, (val) => {
  console.log(val?.data.datasets);
});
</script>

<template>
  <div class="home">
    <doughnut-chart :chart-ref="assignRef" :chart-data="testData" :options="options" chart-id="some-chart" />
  </div>
</template>
```

What this does essentially is, during rendering the chart, it'll assign the chart instance to the ref (which is being returned by the function)

### Example

https://stackblitz.com/edit/vitejs-vite-wtfvpx?embed=1&file=src/App.vue
