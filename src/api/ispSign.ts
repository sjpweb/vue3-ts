/*
 * @Author: sjp
 * @Date: 2021-04-20 15:12:54
 * @LastEditTime: 2021-07-19 17:07:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\api\ispSign.ts
 */
import Api from "./request";
export default {
  getChildByList: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/su/area/details", param);
  },
  findAreas: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/su/area/group", param);
  },
  facilitatorData: async (param?: any) => {
    return await Api.get("/webportal/servedmarket/facilitatorData.jhtm", param);
  },
  getInfodata: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/introduce", param);
  },
  getSign: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/su/data", param);
  },
  insert: async (param?: any) => {
    return await Api.post("/api/b/market/contract/save", param);
  },
  // 签署合同轮训结果
  insertResult: async (param?: any) => {
    return await Api.get("/api/b/market/contract/save/result", param);
  },
  viewContractPdf: async (param?: any) => {
    return await Api.get("/api/b/market/ele/contract/pdf", param);
  },
  buyerEleSign: async (param?: any) => {
    return await Api.postForm("/api/b/market/ele/contract/buyer/sign", param);
  },
  providerEleSign: async (param?: any) => {
    return await Api.postForm("/api/b/market/ele/contract/provider/sign", param);
  },
  findProductAttribute: async (param?: any) => {
    return await Api.get("/api/b/market/facilitator/su/attribute", param);
  },
  //签合同时获取发票信息接口
  getInvoiceInfo: async (param?: any) => {
    return await Api.get("/api/b/market/contract/getInvoiceInfo", param);
  },
};
