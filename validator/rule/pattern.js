import { isEmpty } from "../utils.js";

/**
 * 判断值是否符合正则校验
 * @param value {*} 值
 * @param pattern {RegExp} 正则
 * @return {boolean}
 */
export default function(value, { pattern }) {
  if (isEmpty(value) || isEmpty(pattern)) {
    return true;
  }
  return pattern.test(value);
}
