/**
 * 登录用户信息
 */
export interface UserInfo {
  userId?: number;
  username?: string;
  nickname?: string;
  avatar?: string;
  roles: string[];
  perms: string[];
}

/**
 * 用户查询对象类型
 */
export interface UserQuery extends PageQuery {
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户昵称
   */
  name: string;
  /**
   * 手机号
   */
  mobile: string;
}

/**
 * 用户分页对象
 */
export interface UserPageVO {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 性别
   */
  gender?: number;
  /**
   * 主键
   */
  id?: number;
  /**
   * 手机号码
   */
  mobile?: string;
  /**
   * 昵称
   */
  name?: string;
  /**
   * 密码
   */
  password?: string;
  /**
   * 角色类型
   */
  roleId?: number;
  /**
   * 盐值
   */
  salt?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 修改时间
   */
  updateTime?: string;
  /**
   * 用户名
   */
  username?: string;
}

/**
 * 用户表单类型
 */
export interface UserForm {
  createTime?: string;
  /**
   * 性别
   * 0：女，1：男，2: 其他 ,
   */
  gender?: number;
  id?: number;
  mobile?: string;
  name?: string;
  password?: string;
  roleId?: number;
  salt?: string;
  /**
   * 状态
   * 0：禁用，1：启用，2：锁定 ,
   */
  status?: number;
  updateTime?: string;
  username?: string;
}
