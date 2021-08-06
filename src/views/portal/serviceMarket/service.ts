/*
 * @Author: sjp
 * @Date: 2021-08-04 15:27:01
 * @LastEditTime: 2021-08-06 16:04:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\serviceMarket\service.ts
 */
export interface ServiceTypes {
  serviceTypeName: string;
  serviceTypeId: number;
}
export interface CatTypes {
  itemCatName: string;
  itemCatId: number;
}
export interface TypeList {
  name: string;
  id: number;
}
export interface ServiceType {
  activeIdList: number[];
  activeId: string;
  activeNmaeList: string[];
  identity: string;
}
export interface AllServiceTypes {
  [key: string]: ServiceType;
}
export interface AllService {
  avtiveName: string;
  title: string;
}
export interface AreaType {
  jdAreaId: number;
  name?: string;
  label?: string;
  children?: AreaType[];
}
export interface FacilitatorType {
  facilitatorImg: string | null;
  facilitatorName: string;
  itemCat: string[];
  itemCatIds: string[];
  userCode: string;
  siteEngineerNum: number;
  site: number;
  brandCount: number;
  order: number;
  completionOrderRate: string;
  diffNumberRate: string;
  onTimeOrderRate: string;
  popFlag: number;
  serviceType: string[];
}

export interface UpDataType {
  userCode: string | null;
  serverTypeId?: string;
  itemCatId?: string;
  suName?: string;
  areaId?: string;
}
export interface FacilitatorIdentityType {
  facilitatorName: string;
  popFlag: number;
}
export interface FacilitatorInfoType extends FacilitatorIdentityType {
  order: number;
  site: number;
  siteEngineer: number;
  buyer: number;
  installTimelyAppointRate: number;
  installOntimeCompleteRate: number;
  installPoorEvaluationRate: number;
  facilitatorSettleInfo: string;
}

export interface serviceTypes {
  suName: string
  suId: number
  suImg: string | null
  suPrice: number
  skuAreaDtoList: AreaType[]
  suOrderNum: number | null
  suRemark:string | null
  wholeNation: boolean
}

export interface ProductAttributeType {
  attributeName: string
  attributeValueNames: string[]
}
export interface FormType {
  date: Date[]
  invoiceHeader: string
  taxNo: string
  invoiceType: string
  taxPoint: string
  settlementType?: number
}
export interface FacilitatorInfoType {
  facilitatorName: string;
  popFlag: number;
}
export interface allStoreType {
  [key: string]: AreaType[];
}
export interface SuJsonType {
  suId: number
  areas: number[]
}
