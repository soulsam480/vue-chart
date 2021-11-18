<script lang="ts">
export default {
  name: 'PieChart',
};
</script>

<script setup lang="ts">
import { ChartProps } from '../types/index';
import BaseChart from './BaseChart.vue';

withDefaults(defineProps<ChartProps<'pie'>>(), { chartType: 'pie' });
</script>
<template>
  <base-chart v-bind="{ ...$props, chartData, chartId, chartType: 'pie', ref: undefined }" />
</template>
