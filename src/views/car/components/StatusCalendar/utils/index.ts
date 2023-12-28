import { statusMap } from "@/views/car/car.data";

export function createCalendarMappings(
  calendarData: any,
  { dateName = "dateList", statusName = "status" }
) {
  console.log(calendarData, dateName, statusName);
  const dateStatusMap = new Map<string, string>();
  const disabledDatesSet = new Set<string>();

  calendarData.forEach((item: any) => {
    const start = new Date(item[dateName][0]);
    const end = new Date(item[dateName][1]);
    console.log(start, end);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];

      dateStatusMap.set(dateStr, item[statusName]);

      // 标记特定状态的日期为禁用
      disabledDatesSet.add(dateStr);
    }
  });
  console.log(dateStatusMap, disabledDatesSet);

  return { dateStatusMap, disabledDatesSet };
}

export function isDateDisabled(
  date: Date,
  disabledDatesSet: Set<string>
): boolean {
  const currentDateStr = date.toISOString().split("T")[0];
  const todayStr = new Date().toISOString().split("T")[0];

  // 禁用今天之前的日期
  if (currentDateStr < todayStr) {
    return true;
  }

  // 检查是否在禁用的日期集合中
  return disabledDatesSet.has(currentDateStr);
}

export function getStatusByDate(
  date: Date,
  dateStatusMap: Map<string, string>
): string {
  return dateStatusMap.get(date.toISOString().split("T")[0]) || "";
}
