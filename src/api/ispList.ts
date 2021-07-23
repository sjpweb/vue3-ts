/*
 * @Author: sjp
 * @Date: 2021-04-15 17:04:22
 * @LastEditTime: 2021-05-05 10:40:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static\src\api\ispList.js
 */
import Api from "./request";
export default {
  searchConditionData: async (param?: any) => {
    return await Api.get("/api/b/market/searchConditionData", param);
  },
  // 排序
  searchFacilitator: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator", param);
  },
  // 总页
  allFacilitator: async (param?: any) => {
    return await Api.get("/webportal/servedmarket/allFacilitator.jhtml", param);
  },
  findItemCat: async (param?: any) => {
    return await Api.get("/api/b/market/condition/itemCat", param);
  },
  // 服务类型
  findServiceType: async (param?: any) => {
    return await Api.get("/api/b/market/condition/serviceType", param);
  },
};
