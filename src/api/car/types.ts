import { returnPictureItem } from "../file/types";

/**
 * 车辆查询对象类型
 */
export interface CarQuery extends PageQuery {
  carName?: string;
}

/**
 * 运营状态item
 */
export interface operateStatusItem {
  dateList: string[];
  operateStatus: number;
}

/**
 * 用户分页对象
 */
export interface CarPageVO {
  /**
   * 厢式
   */
  boxType?: string;
  /**
   * 品牌
   */
  brand?: string;
  /**
   * 车辆名称
   */
  carName?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 排量
   */
  displacement?: string;
  /**
   * 排挡（0：自动 1：手动）
   */
  gear?: number;
  /**
   * 主键
   */
  id?: string;
  /**
   * 年款
   */
  modelYear?: string;
  /**
   * 运营状态：（0：待租赁，1：租赁中，2：已下架，3：已预约）
   */
  operateStatus?: number;
  /**
   * 运营状态列表
   */
  operateStatusList?: operateStatusItem[];
  /**
   * 图片链接
   */
  // pictureList?: string[];
  /**
   * 座位数
   */
  seats?: number;
  /**
   * 上架状态（0：已上架 1：未上架）
   */
  status?: number;
  /**
   * 款式
   */
  style?: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 车辆表单类型
 */
export interface CarForm extends CarPageVO {
  /**
   * 备注
   */
  remark?: string;
  /**
   * 图片列表
   */
  pictureList?: string[];
}

export interface CarInfo extends CarPageVO {
  /**
   * 主键
   */
  id: string;
  /**
   * 备注
   */
  remark?: string;
}

export interface ReturnCarInfo extends CarPageVO {
  /**
   * 图片列表
   */
  pictureList?: returnPictureItem[];
}

/**
 * 租金日历
 */
export interface carRentTimeItem {
  dateList: any; // TODO: string[]
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 优惠价
   */
  preferentialPrice: string | number;
}

/**
 * 租金form
 */
export interface CarRentForm {
  carRentTimeList: carRentTimeItem[];
  /**
   * 押金
   */
  deposit: string | number;
  /**
   * 租金
   */
  rent: string | number;
  /**
   * 汽车id
   */
  informationId: string;
}

/**
 * 状态日历
 */
export interface carStatusItem {
  /**
   * 状态
   */
  operateStatus: number;
  /**
   * 开始时间
   */
  operateStartTime: string;
  /**
   * 结束时间
   */
  operateEndTime: string;
}

/**
 * 状态form
 */
export interface CarStatusForm {
  carRentTimeList: carRentTimeItem[];
  /**
   * 押金
   */
  deposit: string | number;
  /**
   * 租金
   */
  rent: string | number;
  /**
   * 汽车id
   */
  informationId: string;
}
