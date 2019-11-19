import { isEmpty, isNumber } from "../utils.js";

/**
 * 判断值是否不小于min值
 * @param value {*} 值
 * @param max {number} 长度
 * @return {boolean}
 */
export default function(value, { max }) {
  if (isEmpty(value) || !isNumber(max)) {
    return true;
  }
  return value <= max;
}
