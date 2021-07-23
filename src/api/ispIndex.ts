/*
 * @Author: sjp
 * @Date: 2021-04-15 17:04:22
 * @LastEditTime: 2021-07-19 17:06:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\api\ispIndex.ts
 */
import Api from "./request";
export default {
  isFacilitator: async (param?: any) => {
    return await Api.get("/webportal/servedmarket/isFacilitator.jhtml", param);
  },
  serviceItem: async (param?: any) => {
    return await Api.get("/api/b/market/searchConditionData", param);
  },
  searchSU: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/su", param);
  },
  facilitatorData: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/introduce", param);
  },
  // 更多属性
  findProductAttribute: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/su/attribute", param);
  },
  getChildByList: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/su/area/details", param);
  },
  findAreas: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/su/area/group", param);
  },
  findServiceType: async (param?: any) => {
    return await Api.get("/api/b/market/condition/serviceType", param);
  },
  findItemCat: async (param?: any) => {
    return await Api.get("/api/b/market/condition/itemCat", param);
  },
};
