<script lang="ts">
export default {
  name: 'DoughnutChart',
};
</script>

<script setup lang="ts">
import { ChartProps } from '../types/index';
import BaseChart from './BaseChart.vue';

withDefaults(defineProps<ChartProps<'doughnut'>>(), { chartType: 'doughnut' });
</script>
<template>
  <base-chart v-bind="{ ...$props, chartData, chartId, chartType: 'doughnut', ref: undefined }" />
</template>
