/*
 * @Author: sjp
 * @Date: 2021-07-15 15:48:47
 * @LastEditTime: 2021-07-28 14:03:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\interface.ts
 */


export type UserInfo =  {
  companyName: string
  jdPin: string
  userType: number
  popFlag: number
  odoUrl: string
  userCode?: string
  rnAuthIsOverdue: boolean
}
export interface UserInfoStateTypes {
  userInfo: UserInfo
  homeFlag: boolean
  serviceFlag: boolean
}

export interface EnterUrlStateTypes {
  realNameUrl: string
  tempRealNameUrl: string
  openWalletUrl: string
  tempWalletUrl: string
}

export interface RootStateTypes {
  user: UserInfoStateTypes
  enterUrl: EnterUrlStateTypes
}
