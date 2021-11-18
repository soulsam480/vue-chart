<script lang="ts">
export default {
  name: 'LineChart',
};
</script>

<script setup lang="ts">
import { ChartProps } from '../types/index';
import BaseChart from './BaseChart.vue';

withDefaults(defineProps<ChartProps<'line'>>(), { chartType: 'line' });
</script>
<template>
  <base-chart v-bind="{ ...$props, chartData, chartId, chartType: 'line', ref: undefined }" />
</template>
