<template>
  <el-calendar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split("-").slice(1).join("-") }}
      </p>
      <el-tag v-if="computedGetStatusByDate(data.date)">
        {{ computedGetStatusByDate(data.date) }}
      </el-tag>
    </template>
  </el-calendar>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { createCalendarMappings, getStatusByDate } from "./utils/index";

defineOptions({
  name: "StatusCalendar",
});

interface calendarDataProps {
  date: string[];
  status: number;
}

const props = withDefaults(
  defineProps<{
    calendarData: calendarDataProps[];
  }>(),
  {
    calendarData: () => [],
  }
);

const { dateStatusMap } = createCalendarMappings(props.calendarData);

const computedGetStatusByDate = computed(() => {
  return (date: Date) => getStatusByDate(date, dateStatusMap);
});
</script>
