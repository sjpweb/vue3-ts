/*
 * @Author: sjp
 * @Date: 2021-07-15 15:48:47
 * @LastEditTime: 2021-07-15 16:16:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\store\interface.ts
 */

export interface RootStateTypes {
  homeFlag: boolean
  serviceFlag: boolean
}

export interface UserInfoStateTypes {
  companyName: string
  jdPin: string
  userType: string
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