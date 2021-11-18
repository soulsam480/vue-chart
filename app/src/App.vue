<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DoughnutChart } from '@soulsam480/vue-chart';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

const dataValues = ref([30, 40, 60, 70, 5]);

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
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}));

const chartRef = ref<Chart<'doughnut'> | null>(null);

const assignRef = () => chartRef;

watch(chartRef, (val) => {
  console.log('From chart ref', val?.data.datasets);
});

function handleChartEvents(instance?: Chart<'doughnut'>) {
  console.log('From chart event handler', instance);
}
</script>

<template>
  <div class="home">
    <div class="home heading">ChartJS 3 on Vue 3</div>

    <a href="https://github.com/soulsam480/vue-chart-3">Repo</a>

    <doughnut-chart
      class="someclass"
      :chart-ref="assignRef"
      :chart-data="testData"
      :options="options"
      chart-id="some-chart"
      @chart-render="handleChartEvents"
      @chart-update="handleChartEvents"
      @chart-destroy="handleChartEvents"
      @labels-update="handleChartEvents"
    />
  </div>
</template>

<style>
.home {
  margin: 0 auto;
  width: 700px;
  text-align: center;
}

.home .heading {
  font-size: 50px;
}
</style>
