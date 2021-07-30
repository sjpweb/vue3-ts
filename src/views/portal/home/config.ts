/*
 * @Author: sjp
 * @Date: 2021-07-28 09:23:26
 * @LastEditTime: 2021-07-28 09:28:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\views\portal\home\config.ts
 */
export interface ProductListType {
  name: string;
  imgUrl: string;
  code: number;
}
export const HouseholdAppliances: ProductListType[] = [
  {
    name: "空调",
    imgUrl: require("@/assets/images/001.png"),
    code: 870,
  },
  {
    name: "冰箱",
    imgUrl: require("@/assets/images/02.png"),
    code: 878,
  },
  {
    name: "洗衣机",
    imgUrl: require("@/assets/images/003.png"),
    code: 880,
  },
  {
    name: "电视",
    imgUrl: require("@/assets/images/004.png"),
    code: 798,
  },
  {
    name: "冷柜",
    imgUrl: require("@/assets/images/005.png"),
    code: 12392,
  },
  {
    name: "酒柜",
    imgUrl: require("@/assets/images/006.png"),
    code: 12401,
  },
]
export const kitchenAppliances:ProductListType[] = [
  {
    name: "电热水器",
    imgUrl: require("@/assets/images/007.png"),
    code: 13690,
  },
  {
    name: "油烟机",
    imgUrl: require("@/assets/images/008.png"),
    code: 1300,
  },
  {
    name: "燃气灶",
    imgUrl: require("@/assets/images/009.png"),
    code: 13298,
  },
  {
    name: "洗碗机",
    imgUrl: require("@/assets/images/010.png"),
    code: 13117,
  },
  {
    name: "燃气热水器",
    imgUrl: require("@/assets/images/011.png"),
    code: 13691,
  },
  {
    name: "消毒柜",
    imgUrl: require("@/assets/images/012.png"),
    code: 1301,
  },
  {
    name: "集成烹饪",
    imgUrl: require("@/assets/images/013.png"),
    code: 13881,
  },
  {
    name: "集成净洗",
    imgUrl: require("@/assets/images/014.png"),
    code: 23048,
  },
]
export const intelligenceAppliances:ProductListType[] =[
  {
    name: "打印机",
    imgUrl: require("@/assets/images/019.png"),
    code: 717,
  },
  {
    name: "商用大屏",
    imgUrl: require("@/assets/images/020.png"),
    code: 7375,
  },
  {
    name: "投影配件",
    imgUrl: require("@/assets/images/021.png"),
    code: 5010,
  },
  {
    name: "笔记本",
    imgUrl: require("@/assets/images/022.png"),
    code: 672,
  },
]
export const DailyAppliances:ProductListType[] = [
  {
    name: "钢琴",
    imgUrl: require("@/assets/images/015.png"),
    code: 18686,
  },
  {
    name: "净水器",
    imgUrl: require("@/assets/images/016.png"),
    code: 898,
  },
  {
    name: "新风系统",
    imgUrl: require("@/assets/images/017.png"),
    code: 21653,
  },
  {
    name: "空气净化器",
    imgUrl: require("@/assets/images/018.png"),
    code: 749,
  },
]