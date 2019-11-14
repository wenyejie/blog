import { isEmpty, isNumber } from "../utils.js";

/**
 * 判断值是否不小于min值
 * @param value {*} 值
 * @param min {number} 长度
 * @return {boolean}
 */
export default function(value, { min }) {
  if (isEmpty(value) || !isNumber(min)) {
    return true;
  }
  return value >= min;
}
