/**
 * 车辆查询对象类型
 */
export interface CarQuery extends PageQuery {
  carName?: string;
  operateStatus?: number;
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
  id?: number;
  /**
   * 年款
   */
  modelYear?: string;
  /**
   * 运营状态：（0：待租赁，1：租赁中，2：已下架，3：已预约）
   */
  operateStatus?: number;
  /**
   * 图片链接
   */
  pictureList?: string[];
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
}
