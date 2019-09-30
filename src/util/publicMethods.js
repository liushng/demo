import {
  CONSOLE
} from "./publicParams";
/**
 * console.log使用log打印
 * @param  {...any} arg 
 */
export const log = (...arg) => {
  if (CONSOLE) {
    return console.log(...arg)
  } else {
    return false
  }
}
import localforage from "localforage"
// vuex持久化低配版
// export function vuexLsPersistent(store) {
//   localforage.getItem('vuex').then(res => {
//     if (res && typeof res == 'object') {
//       store.replaceState(res);
//     }
//   });
//   store.subscribe((mutation, state) => {
//     localforage.setItem('vuex', state).then(res => {});
//   })
// }
/**
 * vuex持久化升级版
 * @export 
 * @param {*} param
 * @returns
 */
export function vuexLsPersistent(param) {
  let pathArr = (param || {}).paths;
  return function (store) {
    localforage.getItem(param.keyName).then(res => {
      if (res && typeof res == 'object') {
        // 合并数据（其他状态保持的和未保持的）
        let obj = Object.assign(store.state, res);
        store.replaceState(obj);
      }
    });
    store.subscribe((mutation, state) => {
      pathArr.forEach(item => {
        if (mutation.type.startsWith(item)) {
          let obj = deepCopy(state)
          localforage.setItem(param.keyName, {
            [item]: obj[item]
          }).then(res => {});
        }
      });
    })
  }
}
/**
 * 获取路径参数
 * @param key
 * @returns {any}
 */
export function queryParam(key) {
  let obj = getUrlParam();
  return obj[key];
}

function getUrlParam() {
  let url = location.search; //获取url中"?"符后的字符串包括‘？’ ，window.location.href获取的是url完整的字符串
  let theParam = new Object();
  if (url.indexOf("?") != -1) { //确保‘？’不是最后一个字符串，即携带的参数不为空
    let str = url.substr(1); //substr是字符串的用法之一，抽取指定字符的数目，这里抽取？后的所有字符
    let strs = str.split("&"); //将获取到的字符串从&分割，输出参数数组，即输出[参数1=xx,参数2=xx,参数3=xx,...]的数组形式
    for (let i = 0; i < strs.length; i++) { //遍历参数数组
      theParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]); //这里意思是抽取每个参数等号后面的值，unescape是解码的意思
    }
  }
  return theParam; //返回参数值
}
/** 
 * 身份证验证
 * */
export function IdentityCodeValid(code, showToast = true) {
  let city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  let tip = "";
  let pass = true;

  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      // var last = parity[sum % 11];
      let last = code[17];
      if (last == 'x') {
        last = "X";
      }
      if (parity[sum % 11] != last) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  if (!pass && showToast) Toast(tip);
  return pass;
}
/**
 * 判断系统(android/ios)
 * @returns {string}
 */
export const system = () => {
  const u = navigator.userAgent;

  let name;
  if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
    name = 'android';
  } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    name = 'ios';
  } else {
    name = 'unknown';
  }

  return name;
};
//判断是否是微信浏览器的函数
export function isWeiXin() {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  let ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

// 转换成汉字数字
export function CNNumber(number) {
  //                 0          1         2        3         4          5         6         7         8         9
  const cnNums = ['\u96f6', '\u58f9', '\u8d30', '\u53c1', '\u8086', '\u4f0d', '\u9646', '\u67d2', '\u634c', '\u7396']

  //                          拾        佰         仟
  const shiBaiQian = ['', '\u62fe', '\u4f70', '\u4edf']

  //                          万        亿       兆 
  const wanYiZhao = ['', '\u4e07', '\u4ebf', '\u5146']

  //                     角 \u89d2 分 \u5206 毫 \u6beb 厘 \u5398
  const jiaoFenHaoLi = ['\u89d2', '\u5206', '\u6beb', '\u5398']
  const zheng = '\u6574' // 整 \u6574
  const yuan = '\u5143' // 元 \u5143

  const fu = '\u8d1f' // 负

  // 最大数字
  const maxNum = 999999999999999.9999
  let negative
  // 整数部分
  let integerNum
  // 小数部分
  let decimalNum
  // 汉字数字
  let capitalStr = ''

  let parts

  if (number === '') {
    return ''
  }

  number = parseFloat(number)

  if (number < 0) {
    negative = true
    number = Math.abs(number)
  }

  if (number >= maxNum) {
    return ''
  }

  if (number === 0) {
    capitalStr = cnNums[0] + yuan + zheng
    return capitalStr
  }

  // 转成字符串
  number += ''

  if (number.indexOf('.') === -1) {
    integerNum = number
    decimalNum = ''
  } else {
    parts = number.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }

  // 整数部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    for (let i = 0, IntLen = integerNum.length; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          capitalStr += cnNums[0]
        }
        zeroCount = 0
        capitalStr += cnNums[parseInt(n)] + shiBaiQian[m]
      }
      if (m === 0 && zeroCount < 4) {
        capitalStr += wanYiZhao[q]
      }
    }
    capitalStr += yuan
  }

  // 小数部分转换
  if (decimalNum !== '') {
    for (let i = 0, decLen = decimalNum.length; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        capitalStr += cnNums[Number(n)] + jiaoFenHaoLi[i]
      }
    }
  }

  if (capitalStr === '') {
    capitalStr += cnNums[0] + yuan + zheng
  } else if (decimalNum === '') {
    capitalStr += zheng
  }

  if (negative) {
    capitalStr = `${fu}${capitalStr}`
  }
  return capitalStr
}
// 判断类型
export function type(target) {
  let s = Object.prototype.toString.call(target);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}
['Null',
  'Undefined',
  'Object',
  'Array',
  'String',
  'Number',
  'Boolean',
  'Function',
  'RegExp'
].forEach(function (t) {
  type['is' + t] = function (target) {
    return type(target) === t.toLowerCase();
  };
});
// 广度优先深拷贝
export function deepCopy(jsonObj) {
  if (!type.isArray(jsonObj) && !type.isObject(jsonObj)) return jsonObj;
  let copy = {};
  let queue = [];
  let visited = {};
  queue.push({
    key: 'root',
    value: jsonObj,
    parent: copy // 根节点parent就是copy
  });

  while (queue.length != 0) {
    const first = queue.shift();
    const parent = first.parent;
    if (visited[first.key] === first.value) {
      continue; // 如果已将访问过则不处理
    };
    if ((type.isArray(first.value) || type.isObject(first.value))) {
      for (let [key, value] of Object.entries(first.value)) {
        if (type.isArray(value) || type.isObject(value)) {
          let childParent;
          if (type.isObject(value)) {
            childParent = {};
          } else if (type.isArray(value)) {
            childParent = [];
          }
          queue.push({
            key: key,
            value: value,
            parent: childParent // 重新声明一个parent
          });
          parent[key] = childParent; // 连接新的parent和旧的parent
        } else {
          queue.push({
            key: key,
            value: value,
            parent: parent
          });
        }
      }
    } else {
      parent[first.key] = first.value;
    }
    visited[first.key] = first.value;
  }
  return copy;

}