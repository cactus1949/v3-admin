/**
 * 当日运营状态 下拉选项
 */
export const statusList: OptionType[] = [
  {
    label: "全部",
    value: "",
  },
  {
    label: "待租赁",
    value: "1",
  },
  {
    label: "租赁中",
    value: "2",
  },
  {
    label: "已下架",
    value: "3",
  },
  {
    label: "已预约",
    value: "4",
  },
];

/**
 * 当日运营状态 Map
 */
export const statusMap: Record<string, string> = {
  "1": "待租赁",
  "2": "租赁中",
  "3": "已下架",
  "4": "已预约",
};
