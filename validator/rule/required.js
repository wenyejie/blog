import { isEmpty } from "../utils.js";

/**
 * 判断值是否符合必填校验
 * @param value {*} 值
 * @param required {boolean} 必填
 * @return {boolean}
 */
export default function(value, { required }) {
  if (!required) {
    return false;
  }
  return !isEmpty(value);
}
