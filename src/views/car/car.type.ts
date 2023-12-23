/**
 * 车辆管理 车辆信息
 */
export interface CarInfo {
  id?: string;
  /**
   * 上架状态
   */
  name1: boolean;
  /**
   * 品牌
   */
  name2: string;
  /**
   * 款式
   */
  name3: string;
  /**
   * 年款
   */
  name4?: string;
  /**
   * 厢式
   */
  name5?: string;
  /**
   * 座位数
   */
  name6?: string;
  /**
   * 排量
   */
  name7?: string;
  /**
   * 排挡
   */
  name8?: string;
  /**
   * 备注
   */
  name9?: string;
  /**
   * 车辆图片
   */
  name10?: string[];
}
