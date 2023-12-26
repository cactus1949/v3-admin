import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { CarForm, CarPageVO, CarQuery } from "./types";

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
