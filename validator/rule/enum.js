import { isEmpty } from "../utils.js";

/**
 * 判断值是否在枚举中
 * @param value {*} 值
 * @param enums {Array} 枚举
 * @return {boolean}
 */
export default function(value, { enums }) {
  if (isEmpty(value) || !Array.isArray(enums)) {
    return true;
  }
  return enums.includes(value);
}
