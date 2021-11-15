<script lang="ts">
export default {
  name: 'PolarAreaChart',
};
</script>

<script setup lang="ts">
import { ChartProps } from 'src/types/index';
import BaseChart from './BaseChart.vue';

withDefaults(defineProps<ChartProps<'polarArea'>>(), { chartType: 'polarArea' });
</script>
<template>
  <base-chart v-bind="{ ...$props, chartData, chartId, chartType: 'polarArea', ref: undefined }" />
</template>
