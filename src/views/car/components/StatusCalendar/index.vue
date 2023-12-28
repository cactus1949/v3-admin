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
import { operateStatusItem } from "@/api/car/types";

defineOptions({
  name: "StatusCalendar",
});

const props = withDefaults(
  defineProps<{
    calendarData: operateStatusItem[];
  }>(),
  {
    calendarData: () => [],
  }
);
const state = reactive({
  dateStatusMap: new Map<string, string>(),
  disabledDatesSet: new Set<string>(),
});

// 监听 calendarData 的变化，并更新 dateStatusMap 和 disabledDatesSet
watchEffect(() => {
  const mappings = createCalendarMappings(props.calendarData, {
    dateName: "dateList",
    statusName: "operateStatus",
  });
  state.dateStatusMap = mappings.dateStatusMap;
  state.disabledDatesSet = mappings.disabledDatesSet;
});

const computedGetStatusByDate = (date: Date) => {
  return getStatusByDate(date, state.dateStatusMap);
};
</script>
