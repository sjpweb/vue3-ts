/*
 * @Author: sjp
 * @Date: 2021-04-19 17:49:57
 * @LastEditTime: 2021-07-16 14:52:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\api\common.ts
 */

import Api from './request'
export default {
    // 获取用户信息
    getUserInfo: async (param?: any) => {
      return await Api.post('/api/b/login', param, true)
    },
      // 入驻时选角色接口
  setUserRole: async (param: any) => {
    return await Api.postForm('/api/b/entry/chooseUserType', param)
  },
  // // 上传图片
  // upload: async param:any => {
  //   return await Api.post('/api/b/common/file/upload', param)
  // },
  // // 获取省份
  // getProvinceList: async param => {
  //   return await Api.get('/api/b/market/area/province', param)
  // },
  // // 获取下级地区
  // getAreaList: async param => {
  //   return await Api.get('/api/b/market/area/next', param)
  // },
  // // 获取用户状态
  // getUserState: async param => {
  //   return await Api.get('/api/b/common/getUserInfo', param)
  // },
  // // 获取实名认证地址
  // getRealNameUrl: async param => {
  //   return await Api.postForm('/api/b/entry/realNameAuth', param)
  // },
  // // 网点实名成功后  修改状态
  // updateEntrySteps: async param => {
  //   return await Api.postForm('/api/b/entry/updateEntrySteps', param)
  // },
  // // 上一步
  // updateLastEntrySteps: async param => {
  //   return await Api.post('/api/b/entry/updateLastEntrySteps', param)
  // },
  // // 获取钱包状态
  // openWalletStatus: async param => {
  //   return await Api.post('/webportal/wallet/getWalletOpenStatus.jhtml', param)
  // },
  // // 开通钱包
  // openWallet: async param => {
  //   return await Api.postForm('/api/b/entry/openWallet', param)
  // },
  // // 获取手机验证码
  // getPhoneCode: async param => {
  //   return await Api.postForm('/api/b/entry/sendContactsSms', param)
  // },
  // // 获取邮箱验证码
  // getEmailCode: async param => {
  //   return await Api.postForm('/api/b/entry/sendContactsEmail', param)
  // },
  // // 提交联系方式
  // updateUserMessage: async param => {
  //   return await Api.post('/api/b/entry/maintainContacts', param)
  // },
  // // 获取联系方式
  // queryPhoneInfoByUserId: async param => {
  //   return await Api.get('/api/b/entry/getContactsInfo', param)
  // },
  // //获取授权品牌
  // getAllBrand: async param => {
  //   return await Api.get('/api/b/entry/getBrandInfo', param)
  // },
  // //提报服务能力
  // insertProvider: async param => {
  //   return await Api.post('/api/b/entry/maintainServiceCapability', param)
  // },
  // // 获取服务能力
  // queryProviderByUserId: async param => {
  //   return await Api.get('/api/b/entry/getServiceCapabilityInfo', param)
  // },
  // // 获取驳回信息
  // getRejectInfo: async param => {
  //   return await Api.get('/api/b/entry/getRejectInfo', param)
  // },
  // // 获取合同
  // getContract: async param => {
  //   return await Api.get('/api/b/entry/getAgreementInfo', param)
  // },
  // // 获取签署协议短信验证码
  // getAuthCode: async param => {
  //   return await Api.postForm('/api/b/entry/sendMaintainSignerSms', param)
  // },
  // // 签署协议-二次验证码
  // getSecondAuthCode: async param => {
  //   return await Api.postForm('/api/b/entry/sendSignAgreementSms', param)
  // },
  // // 提交盖章人信息
  // upUser: async param => {
  //   return await Api.post('/api/b/entry/maintainSignerInfo', param)
  // },
  // // 签署合同
  // signContract: async param => {
  //   return await Api.post('/api/b/entry/signAgreement', param)
  // },
  // // 网点是否被服务商录入
  // isMatchingService: async param => {
  //   return await Api.postForm('/api/b/entry/matchingServiceProvider', param)
  // },
  // // 服务商列表
  // getProviderList: async param => {
  //   return await Api.get('/api/b/entry/getServiceProviderInfo', param)
  // },
  // // 选择服务商
  // isCheckProvices: async param => {
  //   return await Api.postForm('/api/b/entry/signServiceProvider', param)
  // }
}
