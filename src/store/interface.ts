/*
 * @Author: sjp
 * @Date: 2021-07-15 15:48:47
 * @LastEditTime: 2021-07-16 09:39:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\interface.ts
 */

export interface RootStateTypes {}

type UserInfo =  {
  companyName: string
  jdPin: string
  userType: number
  popFlag: number
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

export interface AllStateTypes extends RootStateTypes {
  user: UserInfoStateTypes
  enterUrl: EnterUrlStateTypes
}