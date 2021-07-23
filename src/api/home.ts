/*
 * @Author: sjp
 * @Date: 2021-04-15 17:04:22
 * @LastEditTime: 2021-07-19 17:05:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\api\home.ts
 */
import Api from './request'
export default {
  productCheck: async (param?: any) => {
    return await Api.get('/api/b/index/user/warnings', param)
  },
  getData: async (param?: any) => {
    return await Api.get('/api/b/index/data/statistics/user', param)
  },
  getProviderSign: async (param?: any) => {
    return await Api.get('/api/b/market/contract/getContract', param)
  },
  updateContractState: async (param?: any) => {
    return await Api.get('/api/b/market/contract/update/showState', param)
  }
}
