/*
 * @Author: sjp
 * @Date: 2021-07-15 09:33:28
 * @LastEditTime: 2021-07-22 18:49:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\types\glob.d.ts
 */
declare interface ApiBaseUrlType {
  [pre: string]: string;
  [ebs: string]: string;
  [prod: string]: string;
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

declare interface BtnStateTypes {
  type: string
  text: string
  url: string
  isOpen?: boolean
  event?: (...args: any[]) => any
}

declare interface StateTypes {
  img?: any
  icon?: string
  text: string
  color?: string
  reason?: string[]
  btn?: string
  url?: string
  isOpen?: boolean
  state?: {
    step: number | boolean
    show: number | boolean
  }
  btns?: BtnStateTypes[]
  event?: (...args: any[]) => any
}

declare interface StateObjTypes {
  [key: string]: StateTypes
}

declare interface StepsItemType {
  entrySteps: number;
  title: string;
}