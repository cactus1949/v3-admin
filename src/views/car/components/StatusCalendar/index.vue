<template>
  <el-calendar>
    <template #date-cell="{ data }">
      <div
        class="calendar-cell"
        :class="'status-' + (computedGetStatusByDate(data.date) || 0)"
      >
        <p :class="data.isSelected ? 'is-selected' : ''" class="m-0">
          {{ dayjs(data.day).format("D") }}
        </p>
        <el-tag
          :class="'statusTag-' + (computedGetStatusByDate(data.date) || 0)"
        >
          {{ statusMap[computedGetStatusByDate(data.date)] || "待租赁" }}
        </el-tag>
        <div class="price">
          ¥{{ computedGetPriceByDate(data.date) || priceCalendar?.rent }}/天
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { createCalendarMappings, getStatusByDate } from "./utils/index";
import { carRentTimeItem, operateStatusItem } from "@/api/car/types";
import { dayjs } from "element-plus";
import { statusMap } from "../../car.data";

defineOptions({
  name: "StatusCalendar",
});

const props = withDefaults(
  defineProps<{
    calendarData: operateStatusItem[];
    priceCalendar?: {
      rent: number | string;
      carRentTimeList: carRentTimeItem[];
    };
  }>(),
  {
    calendarData: () => [],
    priceCalendar: () => {
      return {
        rent: 0,
        carRentTimeList: [],
      };
    },
  }
);
const state = reactive({
  dateStatusMap: new Map<string, string>(),
  disabledDatesSet: new Set<string>(),
  datePriceMap: new Map<string, string>(),
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

watchEffect(() => {
  if (!props.priceCalendar?.carRentTimeList?.length) {
    return;
  }
  const mappings = createCalendarMappings(props.priceCalendar.carRentTimeList, {
    dateName: "dateList",
    statusName: "preferentialPrice",
  });
  state.datePriceMap = mappings.dateStatusMap;
});

const computedGetPriceByDate = (date: Date) => {
  return getStatusByDate(date, state.datePriceMap);
};
</script>

<style lang="scss" scoped>
.price {
  margin-top: 5px;
  font-size: 16px;
  color: #fa7434;
}
</style>
