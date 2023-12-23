export const statusMap: Record<number, string> = {
  1: "状态1",
  2: "状态2",
  3: "状态3",
  4: "状态4",
};

export function createCalendarMappings(calendarData: any) {
  const dateStatusMap = new Map<string, string>();
  const disabledDatesSet = new Set<string>();

  calendarData.forEach((item: any) => {
    const start = new Date(item.date[0]);
    const end = new Date(item.date[1]);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];

      dateStatusMap.set(dateStr, statusMap[item.status]);

      // 标记特定状态的日期为禁用
      disabledDatesSet.add(dateStr);
    }
  });

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
