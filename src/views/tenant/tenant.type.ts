/**
 * 租户管理 租户信息
 */
export interface TenantInfo {
  id?: number;
  /**
   * 承租人
   */
  name: string;
  /**
   * 承租人电话
   */
  phone: string;
  /**
   * 承租次数
   */
  count: number;
  /**
   * 完成订单资金总额
   */
  total: number;
  /**
   * 完成订单
   */
  orders?: string[];
  /**
   * 异常订单
   */
  abnormalOrders?: string[];
}
