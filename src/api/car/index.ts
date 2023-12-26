import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { CarPageVO, CarQuery } from "./types";

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
