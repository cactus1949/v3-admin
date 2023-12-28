import { generateStatusMap } from "@/utils";

/**
 * 当日运营状态 下拉选项
 */
export const statusList: OptionType[] = [
  {
    label: "待租赁",
    value: 0,
  },
  {
    label: "租赁中",
    value: 1,
  },
  {
    label: "已下架",
    value: 2,
  },
  {
    label: "已预约",
    value: 3,
  },
];

/**
 * 当日运营状态 Map
 */
export const statusMap = generateStatusMap(statusList);

/**
 * 厢式 optinos
 */
export const boxTypeOptions: OptionType[] = [
  {
    label: "两厢",
    value: "两厢",
  },
  {
    label: "三厢",
    value: "三厢",
  },
  {
    label: "SUV",
    value: "SUV",
  },
  {
    label: "商务车",
    value: "商务车",
  },
  {
    label: "跑车",
    value: "跑车",
  },
  {
    label: "客车",
    value: "客车",
  },
  {
    label: "旅行车",
    value: "旅行车",
  },
];

/**
 * 排挡 optinos
 */
export const gearTypeOptions: OptionType[] = [
  {
    label: "自动",
    value: "自动",
  },
  {
    label: "手动",
    value: "手动",
  },
];

/**
 * 上架状态 options
 */
export const onSaleOptions: OptionType[] = [
  {
    label: "上架",
    value: 0,
  },
  {
    label: "下架",
    value: 1,
  },
];
