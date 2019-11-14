import { isEmpty } from "../utils.js";

/**
 * 判断值是否符合最小长度校验
 * @param value {*} 值
 * @param minlength {number} 必填
 * @return {boolean}
 */
export default function(value, { minlength }) {
  if (isEmpty(value) || isEmpty(minlength)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length >= minlength;
  }
  return `${value}`.length >= minlength;
}
