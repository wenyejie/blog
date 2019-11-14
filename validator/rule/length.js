import { isEmpty } from "../utils.js";

/**
 * 判断值是否符合长度校验
 * @param value {*} 值
 * @param length {number} 长度
 * @return {boolean}
 */
export default function(value, { length }) {
  if (isEmpty(value) || isEmpty(length)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === length;
  }
  return `${value}`.length === length;
}
