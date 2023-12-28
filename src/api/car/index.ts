import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  CarForm,
  CarInfo,
  CarPageVO,
  CarQuery,
  CarRentForm,
  ReturnCarInfo,
} from "./types";

/**
 * 获取车辆分页列表
 *
 * @param queryParams
 */
export function getCarPage(
  data: CarQuery
): AxiosPromise<PageResult<CarPageVO[]>> {
  return request({
    url: "/carInformation/getPageList",
    method: "post",
    data: data,
  });
}

/**
 * 修改车辆
 *
 * @param data
 */
export function updateCar(data: CarForm) {
  return request({
    url: "/carInformation/update",
    method: "post",
    data: data,
  });
}

/**
 * 添加车辆
 *
 * @param data
 */
export function addCar(data: CarForm) {
  return request({
    url: "/carInformation/add",
    method: "post",
    data: data,
  });
}

/**
 * 根据id获取车辆
 *
 * @param id
 */
export function getCarInfoById(id: string): AxiosPromise<ReturnCarInfo> {
  return request({
    url: `/carInformation/info/${id}`,
    method: "get",
  });
}

/**
 * 删除车辆
 *
 * @param id
 */
export function deleteCar(id: string) {
  return request({
    url: `/carInformation/delete/${id}`,
    method: "post",
  });
}

/**
 * 设置押金 优化价
 *
 * @param data
 */
export function setCarRent(data: CarRentForm) {
  return request({
    url: "/carRent/add",
    method: "post",
    data: data,
  });
}

/**
 * 获取 租金日历
 */
export function getCarRentById(id: string) {
  return request({
    url: `/carRent/info/${id}`,
    method: "get",
  });
}

/**
 * 设置运营状态
 *
 * @param data
 */
export function setCarStatus(data: CarRentForm) {
  return request({
    url: "/carOperateStatus/add",
    method: "post",
    data: data,
  });
}

/**
 * 获取 状态日历
 */
export function getCarStatusById(id: string) {
  return request({
    url: `/carOperateStatus/info/${id}`,
    method: "get",
  });
}

/**
 * 修改车辆上架状态
 */
export function updateCarStatus(data: { id: string; status: number }) {
  return request({
    url: "/carInformation/resetStatus",
    method: "post",
    data: data,
  });
}
