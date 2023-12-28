import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { UserForm, UserInfo, UserPageVO, UserQuery } from "./types";

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfoApi(): AxiosPromise<UserInfo> {
  return request({
    url: "/api/v1/users/me",
    method: "get",
  });
}

/**
 * 获取用户分页列表
 *
 * @param queryParams
 */
export function getUserPage(
  data: UserQuery
): AxiosPromise<PageResult<UserPageVO[]>> {
  return request({
    url: "/sysUser/getPageList",
    method: "post",
    data,
  });
}

/**
 * 获取用户表单详情
 *
 * @param userId
 */
export function getUserForm(userId: number): AxiosPromise<UserForm> {
  return request({
    url: "/api/v1/users/" + userId + "/form",
    method: "get",
  });
}

/**
 * 添加用户
 *
 * @param data
 */
export function addUser(data: UserForm) {
  return request({
    url: "/sysUser/add",
    method: "post",
    data: data,
  });
}

/**
 * 修改用户
 *
 * @param data
 */
export function updateUser(data: UserForm) {
  return request({
    url: "/sysUser/update",
    method: "post",
    data: data,
  });
}

/**
 * 修改用户密码
 *
 * @param id
 * @param password
 */
export function updateUserPassword(id: number, password: string) {
  return request({
    url: "/api/v1/users/" + id + "/password",
    method: "patch",
    params: { password: password },
  });
}

/**
 * 重置用户密码
 * @param id
 * @returns
 */
export function resetUserPassword(id: string) {
  return request({
    url: `/sysUser/resetPassword/${id}`,
    method: "get",
  });
}

/**
 * 删除用户
 *
 * @param id
 */
export function deleteUsers(id: string) {
  return request({
    url: `/sysUser/delete/${id}`,
    method: "post",
  });
}

/**
 * 下载用户导入模板
 *
 * @returns
 */
export function downloadTemplateApi() {
  return request({
    url: "/api/v1/users/template",
    method: "get",
    responseType: "arraybuffer",
  });
}

/**
 * 导出用户
 *
 * @param queryParams
 * @returns
 */
export function exportUser(queryParams: UserQuery) {
  return request({
    url: "/api/v1/users/_export",
    method: "get",
    params: queryParams,
    responseType: "arraybuffer",
  });
}

/**
 * 导入用户
 *
 * @param file
 */
export function importUser(deptId: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/api/v1/users/_import",
    method: "post",
    params: { deptId: deptId },
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
