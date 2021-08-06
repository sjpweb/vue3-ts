/*
 * @Author: sjp
 * @Date: 2021-04-16 18:40:45
 * @LastEditTime: 2021-08-05 18:29:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\utils\validate.ts
 */

export const checkName = (
  rule: never,
  value: string,
  callback: (...age: any) => void
) => {
  const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
  if (!value) {
    callback(new Error("姓名不能为空"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("姓名不可使用特殊字符"));
  }
};

export const checkPhone = (
  rule: never,
  value: string,
  callback: (...age: any) => void
) => {
  const reg = /^[1][23457689][0-9]{9}$/;
  if (!value) {
    callback(new Error("手机号码不能为空"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机号码格式有误"));
  }
};

// export const phoneCode = (rule, value, callback) => {
//   // const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
//   if (!value) {
//     callback(new Error('请输入手机验证码'))
//     return
//   }
//   callback(new Error('手机验证码错误'))
// }

export const checkEmail = (
  rule: never,
  value: string,
  callback: (...age: any) => void
) => {
  const reg = /^.+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
  if (!value) {
    callback(new Error("邮箱不能为空"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱格式有误"));
  }
};

export const checkNumber = (
  rule: never,
  value: string,
  callback: (...age: any) => void
) => {
  const reg = /^(\d{1,2}(\.\d{1,2})?|100|100(\.\d{1,2}))$/;
  if (!value) {
    callback(new Error("预约及时率不能为空"));
  }
  if (Number(value) > 100) {
    callback(new Error("数值不能大于100"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("仅支持小数点后两位数字"));
  }
};
export const checkNumber1 = (
  rule: never,
  value: string,
  callback: (...age: any) => void
) => {
  const reg = /^(\d{1,2}(\.\d{1,2})?|100|100(\.\d{1,2}))$/;
  if (!value) {
    callback(new Error("准时完工率不能为空"));
  }
  if (Number(value) > 100) {
    callback(new Error("数值不能大于100"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("仅支持小数点后两位数字"));
  }
};
export const checkNumber2 = (
  rule: never,
  value: string,
  callback: (...age: any) => void
) => {
  const reg = /^(\d{1,2}(\.\d{1,2})?|100|100(\.\d{1,2}))$/;
  if (!value) {
    callback(new Error("差评率不能为空"));
  }
  if (Number(value) > 100) {
    callback(new Error("数值不能大于100"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("仅支持小数点后两位数字"));
  }
};

export const checkDate = (
  rule: never,
  value: any,
  callback: (...age: any) => void
) => {
  const time1 =  value[0].getTime()
  const time2 = value[1].getTime()
  const nDays = (time2 - time1) / 1000 / 3600 / 24;
  if (!value) {
    callback(new Error("合同有效期不能为空"));
  }
  if (nDays >= 180) {
    callback();
  } else {
    callback(new Error("合同有效期必须大于180天"));
  }
};
