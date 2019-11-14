import { isEmpty } from "../utils.js";

/**
 * 判断值是否符合最大长度校验
 * @param value {*} 值
 * @param maxlength {number} 最大长度
 * @return {boolean}
 */
export default function(value, { maxlength }) {
  if (isEmpty(value) || isEmpty(maxlength)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length <= maxlength;
  }
  return `${value}`.length <= maxlength;
}
