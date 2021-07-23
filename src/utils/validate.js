/*
 * @Author: sjp
 * @Date: 2021-04-16 18:40:45
 * @LastEditTime: 2021-07-22 11:36:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jzyf-static3\src\utils\validate.js
 */

export const checkName = (rule, value, callback) => {
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

export const checkPhone = (rule, value, callback) => {
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

export const checkEmail = (rule, value, callback) => {
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

export const checkNumber = (rule, value, callback) => {
  const reg = /^(\d{1,2}(\.\d{1,2})?|100|100(\.\d{1,2}))$/;
  if (!value) {
    callback(new Error("预约及时率不能为空"));
  }
  if (value > 100) {
    callback(new Error("数值不能大于100"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("仅支持小数点后两位数字"));
  }
};
export const checkNumber1 = (rule, value, callback) => {
  const reg = /^(\d{1,2}(\.\d{1,2})?|100|100(\.\d{1,2}))$/;
  if (!value) {
    callback(new Error("准时完工率不能为空"));
  }
  if (value > 100) {
    callback(new Error("数值不能大于100"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("仅支持小数点后两位数字"));
  }
};
export const checkNumber2 = (rule, value, callback) => {
  const reg = /^(\d{1,2}(\.\d{1,2})?|100|100(\.\d{1,2}))$/;
  if (!value) {
    callback(new Error("差评率不能为空"));
  }
  if (value > 100) {
    callback(new Error("数值不能大于100"));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("仅支持小数点后两位数字"));
  }
};

export const checkDate = (rule, value, callback) => {
  var time1 = Date.parse(value[0]);
  var time2 = Date.parse(value[1]);
  var nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
  if (!value) {
    callback(new Error("合同有效期不能为空"));
  }
  if (nDays >= 180) {
    callback();
  } else {
    callback(new Error("合同有效期必须大于180天"));
  }
};
